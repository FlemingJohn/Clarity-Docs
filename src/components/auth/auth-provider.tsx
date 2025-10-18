'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  onAuthStateChanged,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import {
  auth,
  googleProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  linkWithCredential,
  fetchSignInMethodsForEmail,
  EmailAuthProvider,
  browserLocalPersistence,
  type User,
  type AuthCredential,
} from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signInWithGoogle: () => Promise<any>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const saveUserToDB = async (user: User, newProvider?: string) => {
    try {
      const providers = [
        ...new Set([
          ...user.providerData.map((p) => p.providerId.replace('.com', '')),
          ...(newProvider ? [newProvider] : []),
        ]),
      ];

      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        providers,
        updatedAt: new Date().toISOString(),
        ...(userSnap.exists() ? {} : { createdAt: new Date().toISOString() }),
      }, { merge: true });
    } catch (error) {
      console.error('Error saving user to database:', error);
      // Don't throw error - allow auth to continue even if DB save fails
    }
  };

  const handleAccountConflict = async (error: any): Promise<User> => {
    const email: string = error.customData?.email;
    const pendingCred: AuthCredential = error.credential;

    if (!email || !pendingCred) {
      throw new Error('Missing email or credential for account conflict.');
    }

    const methods = await fetchSignInMethodsForEmail(auth, email);

    if (methods.includes(EmailAuthProvider.PROVIDER_ID)) {
      const password = prompt(`An account with ${email} already exists. Enter your password to link accounts:`);

      if (!password) throw new Error('Password is required to link accounts.');

      const result = await signInWithEmailAndPassword(auth, email, password);
      await linkWithCredential(result.user, pendingCred);
      await saveUserToDB(result.user, 'google');
      return result.user;
    } else {
      throw new Error(
        'Account exists with a different authentication method. Please use the correct sign-in method.'
      );
    }
  };
  
  const signOut = async () => {
    await firebaseSignOut(auth);
    router.push('/');
  };

  const signInWithGoogle = async () => {
    if (!isMounted) return;
    
    try {
      await auth.setPersistence(browserLocalPersistence);
      const result = await signInWithPopup(auth, googleProvider);

      if (result.user) {
        await saveUserToDB(result.user, 'google');
        return result;
      }
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      
      // Handle account conflict (email already exists with different method)
      if (error.code === 'auth/account-exists-with-different-credential') {
        const user = await handleAccountConflict(error);
        return { user };
      }
      
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    await auth.setPersistence(browserLocalPersistence);
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await saveUserToDB(result.user);
    return result;
  };

  const signIn = async (email: string, password: string) => {
    await auth.setPersistence(browserLocalPersistence);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
