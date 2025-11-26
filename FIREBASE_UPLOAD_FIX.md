# Firebase Image Upload Fix

## Most Common Issue: Storage Rules

Your Firebase Storage likely has restrictive rules that are blocking uploads.

## SOLUTION - Update Firebase Storage Rules:

### Step 1: Go to Firebase Console
1. Visit: https://console.firebase.google.com/
2. Select your project: **rettungsanker-freiburg-d07e6**

### Step 2: Navigate to Storage Rules
1. Click **"Build"** in the left sidebar
2. Click **"Storage"**
3. If Storage isn't initialized yet, click **"Get Started"** and choose a location
4. Click the **"Rules"** tab at the top

### Step 3: Update the Rules

Replace the existing rules with this (for testing):

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if true;
    }
  }
}
```

Click **"Publish"** to save the changes.

### Step 4: Test Upload
1. Go to: http://localhost:3001/dashboard/create-post
2. Select an image
3. Click "Upload Image"
4. Open browser console (F12) to see detailed logs

## What the Error Messages Mean:

| Error in Console | Meaning | Solution |
|------------------|---------|----------|
| `storage/unauthorized` | Firebase Storage rules deny access | Update rules (see above) |
| `storage/quota-exceeded` | Free tier limit reached (5GB) | Delete old files or upgrade |
| `storage/unauthenticated` | No authentication | Allow anonymous uploads in rules |
| `Failed to fetch` | Firebase not initialized | Initialize Storage in Firebase Console |

## For Production (After Testing):

Once it works, update rules to require authentication:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Alternative: Use Cloudinary or Uploadthing

If Firebase continues to have issues, consider these alternatives:

### Cloudinary (Free tier: 25GB/month)
- Easy to set up
- Good free tier
- Next.js integration available

### Uploadthing (Free tier: 2GB/month)
- Built specifically for Next.js
- Simple API
- Good documentation

## Debug Steps:

1. Open browser console (F12)
2. Try to upload an image
3. Look for error messages with "Upload error:" or "Error code:"
4. Share the error code with me if still not working

## Current Status:

✅ Environment variables are set correctly
✅ Firebase is initialized
❓ Waiting to see error message from console
