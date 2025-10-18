/**
 * Firebase Auth Debug Helper
 * 
 * Run this in your browser console to diagnose auth issues:
 * 
 * 1. Open DevTools (F12 or Cmd+Option+I)
 * 2. Go to Console tab
 * 3. Copy and paste this entire file
 * 4. Check the output
 */

// Get the Firebase auth instance from window
const checkAuth = () => {
  console.log('=== FIREBASE AUTH DEBUG ===\n');
  
  // Check if Firebase is loaded
  if (typeof firebase === 'undefined' && typeof window.firebase === 'undefined') {
    console.log('⚠️  Firebase SDK not found in window object');
    console.log('This is normal for modular SDK v9+\n');
  }
  
  // Check localStorage for auth tokens
  console.log('1. Checking localStorage for Firebase auth tokens...');
  const authKeys = Object.keys(localStorage).filter(key => 
    key.includes('firebase') || key.includes('auth')
  );
  
  if (authKeys.length > 0) {
    console.log('✅ Found Firebase auth data in localStorage:');
    authKeys.forEach(key => {
      const value = localStorage.getItem(key);
      if (value) {
        try {
          const parsed = JSON.parse(value);
          if (parsed.stsTokenManager) {
            console.log(`   - ${key}:`);
            console.log(`     User ID: ${parsed.uid || 'N/A'}`);
            console.log(`     Email: ${parsed.email || 'N/A'}`);
            console.log(`     Token expires: ${new Date(parsed.stsTokenManager.expirationTime).toLocaleString()}`);
          }
        } catch (e) {
          console.log(`   - ${key}: (exists but not JSON)`);
        }
      }
    });
  } else {
    console.log('❌ No Firebase auth data found in localStorage');
    console.log('   → You may not be signed in');
  }
  
  console.log('\n2. Checking sessionStorage...');
  const sessionAuthKeys = Object.keys(sessionStorage).filter(key => 
    key.includes('firebase') || key.includes('auth')
  );
  
  if (sessionAuthKeys.length > 0) {
    console.log('✅ Found Firebase auth data in sessionStorage');
  } else {
    console.log('ℹ️  No Firebase auth data in sessionStorage (using localStorage persistence)');
  }
  
  console.log('\n3. Checking for environment variables...');
  console.log('   NEXT_PUBLIC_FIREBASE_PROJECT_ID:', 
    process?.env?.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 
    import.meta?.env?.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 
    '❌ Not accessible from browser console'
  );
  
  console.log('\n4. Next steps:');
  console.log('   a) If NO auth data: Sign in at /sign-in');
  console.log('   b) If auth data EXISTS but getting permission errors:');
  console.log('      → Firestore rules not deployed!');
  console.log('      → Go to: https://console.firebase.google.com');
  console.log('      → Deploy rules from DEPLOY_FIRESTORE_RULES_NOW.md');
  
  console.log('\n=== END DEBUG ===');
};

// Run the check
checkAuth();

// Export for repeated use
if (typeof window !== 'undefined') {
  window.checkFirebaseAuth = checkAuth;
  console.log('\n💡 Run window.checkFirebaseAuth() anytime to recheck');
}
