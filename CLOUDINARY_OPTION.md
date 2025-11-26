# Switch to Cloudinary - No CORS Issues!

## Why Cloudinary?
- ✅ No CORS issues
- ✅ Easier to set up than Firebase
- ✅ Better free tier (25GB storage, 25GB bandwidth/month)
- ✅ Automatic image optimization
- ✅ Works out of the box

## Setup (5 minutes):

### 1. Create Free Cloudinary Account
1. Go to: https://cloudinary.com/users/register_free
2. Sign up with email
3. Verify your email

### 2. Get Your Credentials
After signing up, you'll see your dashboard with:
- **Cloud Name**
- **API Key**
- **API Secret**

### 3. Add to .env.local
Add these lines to your `.env.local` file:

```bash
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4. I'll Update the Upload Code

Once you add the Cloudinary credentials, I'll update the upload functionality to use Cloudinary instead of Firebase.

---

## OR: Just Fix Firebase Rules (Easier!)

**Honestly, just updating the Firebase Storage Rules is easier:**

1. Go to: https://console.firebase.google.com/project/rettungsanker-freiburg-d07e6/storage/rules
2. Update rules to:
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
3. Click Publish
4. Try uploading again

**This should fix the CORS error!**

The CORS error happens because Firebase Storage blocks requests by default. Updating the rules allows your app to upload.

---

## Which Do You Prefer?

1. **Update Firebase Rules** (2 minutes, keeps current setup)
2. **Switch to Cloudinary** (5 minutes, more reliable)

Let me know which you'd like to do!
