# Firestore Authentication Error Fix

## Problem
You were encountering the error:
```
Error fetching document history: FirebaseError: Missing or insufficient permissions.
```

## Root Cause
The Firestore security rules require an authenticated user (`request.auth.uid`), but the component was trying to query Firestore before Firebase authentication was fully initialized, or when the user wasn't signed in.

## Solution Applied

### 1. **Added Authentication State Checking**
Modified `document-history.tsx` to:
- Wait for Firebase auth to be ready before attempting queries
- Check if user is authenticated before loading history
- Show appropriate message when user isn't signed in

### 2. **Key Changes Made**

**Added auth listener:**
```typescript
const [isAuthReady, setIsAuthReady] = useState(false);

useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged((user) => {
    setIsAuthReady(true);
    if (!user) {
      console.warn('No authenticated user found');
      setIsLoading(false);
    }
  });
  return () => unsubscribe();
}, []);
```

**Updated loadHistory function:**
```typescript
const loadHistory = async () => {
  // Don't attempt to load if auth isn't ready or user isn't authenticated
  if (!isAuthReady || !auth.currentUser) {
    console.warn('Cannot load history: User not authenticated');
    setIsLoading(false);
    return;
  }
  // ... rest of the code
};
```

**Updated useEffect to wait for auth:**
```typescript
useEffect(() => {
  if (isAuthReady) {
    loadHistory();
  }
}, [userId, isAuthReady]);
```

**Added unauthenticated state UI:**
Shows a message when user isn't signed in instead of throwing errors.

## Verification Steps

1. **Check if user is signed in:**
   - Open browser DevTools → Application → Local Storage
   - Look for Firebase auth tokens
   - Or check the Network tab for auth headers

2. **Verify Firebase config:**
   - Ensure `.env.local` exists with all Firebase credentials
   - Check that credentials match your Firebase project

3. **Test the flow:**
   ```
   a. Sign out (if signed in)
   b. Navigate to history page → Should show "Please sign in" message
   c. Sign in
   d. History should load without permission errors
   ```

## Additional Checks

### If errors persist, verify:

1. **Firebase Configuration (.env.local)**
   ```bash
   NEXT_PUBLIC_FIREBASE_API_KEY=your_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

2. **Firestore Rules are deployed:**
   ```bash
   firebase deploy --only firestore:rules
   ```

3. **Check Firebase Console:**
   - Go to Firebase Console → Authentication
   - Verify email/password and Google auth are enabled
   - Check if test users exist

4. **Browser Console:**
   - Look for auth initialization logs
   - Check for Firebase SDK errors

## Your Firestore Rules (Current)
```javascript
match /documentHistory/{documentId} {
  allow read: if isAuthenticated() && resource.data.userId == request.auth.uid;
  allow create: if isAuthenticated() && request.resource.data.userId == request.auth.uid;
  allow update, delete: if isAuthenticated() && resource.data.userId == request.auth.uid;
}
```

These rules require:
- User must be authenticated (have a valid auth token)
- User can only access documents where `userId` matches their `uid`

## Next Steps

1. **Test the application** - Refresh the page and check if errors are gone
2. **Verify authentication flow** - Make sure users can sign in/up successfully  
3. **Monitor console logs** - Check for any remaining auth-related warnings
4. **Deploy Firestore rules** - If you haven't already: `firebase deploy --only firestore:rules`

## Common Issues

### "User is null" warnings
- Normal on first load before auth initializes
- Should resolve once `onAuthStateChanged` fires

### Still getting permission errors after sign-in
- Clear browser cache and localStorage
- Sign out and sign in again
- Check Firebase Console → Authentication to verify user exists

### Rules not working
- Redeploy rules: `firebase deploy --only firestore:rules`
- Check Firebase Console → Firestore → Rules for active rules
- Verify rules timestamp shows recent deployment
