# 🐛 Firestore Error: "Failed to fetch document history"

## Error Message
```
Error loading document history: Error: Failed to fetch document history
Failed to load resource: the server responded with a status of 500 (Internal Server Error)
```

## Root Cause
❌ **Firestore is not enabled in your Firebase project**

The code is trying to access Firestore, but the database hasn't been created yet in Firebase Console.

---

## ✅ Solution (5 minutes)

### Step 1: Enable Firestore
1. Open [Firebase Console](https://console.firebase.google.com)
2. Select your project: **studio-7017020464-c9344**
3. Click **"Firestore Database"** in the left sidebar (under "Build")
4. Click **"Create database"** button

### Step 2: Choose Location
- Select a location closest to your users
- Recommended: **us-central1 (Iowa)** for USA
- Note: Location cannot be changed later!

### Step 3: Choose Security Mode
Select **"Start in test mode"** for development:
```
Test mode: Allows all reads/writes for 30 days
Good for: Development and testing
```

Or **"Start in production mode"** if you want secure rules from start:
```
Production mode: Denies all reads/writes by default
Good for: Production (requires setting up rules immediately)
```

### Step 4: Click "Enable"
Wait 30-60 seconds for Firestore to be created.

### Step 5: Set Security Rules (Important!)

#### For Test Mode (Development):
The default test mode rules will work for 30 days. After that, update to:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to access their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /documentHistory/{docId} {
      allow create: if request.auth != null;
      allow read, update, delete: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
  }
}
```

#### For Production Mode:
Copy the rules above immediately after enabling Firestore:

1. Click **"Rules"** tab in Firestore
2. Paste the rules above
3. Click **"Publish"**

### Step 6: Refresh Your App
1. Refresh your browser page (or restart dev server if needed)
2. The error should be gone!
3. Upload a document to test

---

## 🧪 Verify It Works

After enabling Firestore:

### Check 1: No More Errors
- ✅ Browser console should be clean (no 500 errors)
- ✅ Document history sidebar should load without errors

### Check 2: Test Upload
1. Upload and process a document
2. Check Firebase Console → Firestore Database
3. You should see:
   - `documentHistory` collection
   - Your document data inside

### Check 3: Test History
1. The document should appear in the history sidebar
2. Click "View Summary" - should work
3. Click "Delete" - should remove it

---

## 🔍 Still Getting Errors?

### Error: "Missing or insufficient permissions"
**Cause**: Security rules are too strict
**Fix**: 
1. Go to Firestore → Rules tab
2. Use the rules provided above
3. Click "Publish"

### Error: "PERMISSION_DENIED"
**Cause**: User not signed in or rules misconfigured
**Fix**:
1. Make sure you're signed in
2. Check rules allow `request.auth.uid == userId`

### Error: "FirebaseError: 7 PERMISSION_DENIED"
**Cause**: Trying to access another user's data
**Fix**: This is correct behavior! Users should only see their own documents.

### Error: Still getting 500 errors
**Cause**: Firestore might not be fully enabled
**Fix**:
1. Wait 1-2 minutes after enabling
2. Refresh Firebase Console
3. Verify "Firestore Database" shows data tab (not "Create database" button)
4. Clear browser cache
5. Restart dev server: `npm run dev`

---

## 📊 What Firestore Looks Like When Enabled

### Firebase Console → Firestore Database:

```
Collections:
├── users
│   └── [your-uid]
│       ├── email: "your@email.com"
│       ├── displayName: "Your Name"
│       └── createdAt: "2025-10-18..."
│
└── documentHistory
    └── [document-id-1]
        ├── userId: "[your-uid]"
        ├── documentName: "Document - 10/18/2025..."
        ├── content: "Full document text..."
        ├── summary: { ... }
        └── uploadedAt: October 18, 2025 at 5:00:00 PM
```

---

## 💡 Quick Test

Run this in your browser console after enabling Firestore:

```javascript
// Check if Firestore is accessible
import { db } from './src/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

getDocs(collection(db, 'users'))
  .then(() => console.log('✅ Firestore is working!'))
  .catch(err => console.error('❌ Firestore error:', err));
```

---

## 🎯 Summary

1. ✅ **Fixed code** - Changed from 'use server' to 'use client'
2. ⚠️ **You must enable Firestore** - Go to Firebase Console NOW
3. ✅ **Set security rules** - Use the rules provided above
4. ✅ **Test** - Upload a document and check history

**Time needed**: 5 minutes
**Difficulty**: Easy
**Cost**: Free (Spark plan: 50K reads, 20K writes per day)

---

## 📞 Need Help?

If you're still stuck:
1. Share a screenshot of Firebase Console → Firestore Database page
2. Share the exact error from browser console (with full stack trace)
3. Confirm you completed all steps above

**The fix is simple - just enable Firestore in Firebase Console!** 🚀
