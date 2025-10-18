# Firestore Setup Guide

## Current Status
✅ **Firestore is now ENABLED** in the code! You now have document history tracking feature.

⚠️ **IMPORTANT**: You must enable Firestore in Firebase Console for the app to work properly.

## What's New?
The app now includes a **Document History** feature that stores:
- ✅ All uploaded documents with full content
- ✅ AI-generated summaries for each document
- ✅ Upload timestamps (when you uploaded each document)
- ✅ Document type and metadata
- ✅ User profile data (email, name, authentication providers)
- ✅ Account linking information

### Features Added:
1. **Document History Sidebar** - See all your past documents on the main clarity page
2. **View Previous Summaries** - Click on any document to reload its summary
3. **Delete Documents** - Remove unwanted documents from your history
4. **Timestamps** - See when you uploaded each document (e.g., "2 hours ago")
5. **User Data Storage** - Your profile is automatically saved on sign-up

## How to Enable Firestore

### Step 1: Enable in Firebase Console
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project: **studio-7017020464-c9344**
3. Click **Firestore Database** in the left sidebar
4. Click **Create Database** button
5. Choose a location (select closest to your users):
   - `us-central1` (Iowa) - Good for USA
   - `europe-west1` (Belgium) - Good for Europe
   - `asia-southeast1` (Singapore) - Good for Asia
6. Select security rules mode:
   - **Test mode** (for development) - Allows all reads/writes for 30 days
   - **Production mode** (for production) - Denies all by default
7. Click **Enable**

### Step 2: Configure Security Rules
After enabling Firestore, deploy the security rules from `firestore.rules`:

**Option A: Using Firebase Console (Easiest)**
1. Go to Firebase Console → Firestore Database → Rules tab
2. Copy the contents of `firestore.rules` file from your project
3. Paste into the rules editor
4. Click **Publish**

**Option B: Using Firebase CLI**
```bash
# Install Firebase CLI (if not already installed)
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init firestore

# Deploy rules
firebase deploy --only firestore:rules
```

The rules ensure:
- ✅ Users can only access their own documents
- ✅ Users can only read/write their own profile data
- ✅ All operations require authentication
- ✅ Nobody can access other users' data

### Step 3: Test
1. Restart your development server: `npm run dev`
2. Sign up or sign in
3. Upload and process a document
4. Check the **Document History** sidebar on the right
5. Verify in Firebase Console → Firestore Database:
   - `users` collection - Your user profile
   - `documentHistory` collection - Your uploaded documents

## What Happens Without Firestore?
If you don't enable Firestore, you'll see 400 errors in the console:
- ❌ Document history won't work
- ❌ User profile data won't be saved
- ❌ Can't view past documents
- ✅ Document processing still works (but not saved)
- ✅ Authentication still works

## Common Issues

### "Missing or insufficient permissions"
- Update Firestore security rules to allow authenticated users to write their data
- Make sure you're signed in when testing

### "Quota exceeded"
- Free tier has limits: 50,000 reads and 20,000 writes per day
- Consider upgrading to Blaze (pay-as-you-go) plan if needed

### Still getting 400 errors
- Make sure Firestore is fully enabled and initialized
- Check Firebase Console for any error messages
- Verify your Firebase project settings are correct

## Need Help?
Check the [Firebase Firestore documentation](https://firebase.google.com/docs/firestore) for more details.
