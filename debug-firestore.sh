#!/bin/bash

# Firestore Debug Script
# This script helps debug Firestore authentication and permission issues

echo "=== Firestore Authentication Debug ==="
echo ""

echo "1. Checking Firebase configuration..."
if [ -f ".env.local" ]; then
    echo "✓ .env.local exists"
    echo ""
    echo "Checking for required Firebase environment variables:"
    grep -q "NEXT_PUBLIC_FIREBASE_API_KEY" .env.local && echo "✓ NEXT_PUBLIC_FIREBASE_API_KEY is set" || echo "✗ NEXT_PUBLIC_FIREBASE_API_KEY is missing"
    grep -q "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN" .env.local && echo "✓ NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN is set" || echo "✗ NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN is missing"
    grep -q "NEXT_PUBLIC_FIREBASE_PROJECT_ID" .env.local && echo "✓ NEXT_PUBLIC_FIREBASE_PROJECT_ID is set" || echo "✗ NEXT_PUBLIC_FIREBASE_PROJECT_ID is missing"
    grep -q "NEXT_PUBLIC_FIREBASE_APP_ID" .env.local && echo "✓ NEXT_PUBLIC_FIREBASE_APP_ID is set" || echo "✗ NEXT_PUBLIC_FIREBASE_APP_ID is missing"
else
    echo "✗ .env.local file not found!"
    echo "  Create it from .env.example and add your Firebase credentials"
fi

echo ""
echo "2. Checking Firestore rules..."
if [ -f "firestore.rules" ]; then
    echo "✓ firestore.rules exists"
else
    echo "✗ firestore.rules not found"
fi

echo ""
echo "3. Checking Firestore indexes..."
if [ -f "firestore.indexes.json" ]; then
    echo "✓ firestore.indexes.json exists"
else
    echo "✗ firestore.indexes.json not found"
fi

echo ""
echo "4. Checking if Firebase CLI is installed..."
if command -v firebase &> /dev/null; then
    echo "✓ Firebase CLI is installed ($(firebase --version))"
    echo ""
    echo "5. Checking Firebase project..."
    if [ -f ".firebaserc" ]; then
        echo "✓ .firebaserc exists"
        PROJECT_ID=$(grep -o '"default": "[^"]*' .firebaserc | sed 's/"default": "//')
        echo "  Project ID: $PROJECT_ID"
    else
        echo "✗ .firebaserc not found - run 'firebase init' to set up"
    fi
else
    echo "✗ Firebase CLI is not installed"
    echo "  Install it with: npm install -g firebase-tools"
fi

echo ""
echo "=== Next Steps ==="
echo ""
echo "If you see permission errors, try:"
echo "1. Deploy Firestore rules: firebase deploy --only firestore:rules"
echo "2. Deploy Firestore indexes: firebase deploy --only firestore:indexes"
echo "3. Check Firebase Console → Authentication → Users (verify user exists)"
echo "4. Check Firebase Console → Firestore → Rules (verify rules are deployed)"
echo "5. Clear browser cache and localStorage, then sign in again"
echo ""
echo "If errors persist, check the browser console for:"
echo "  - 'Auth state changed' logs (should show User: <uid>)"
echo "  - 'Fetching document history for userId' logs"
echo "  - Any Firebase SDK initialization errors"
echo ""
