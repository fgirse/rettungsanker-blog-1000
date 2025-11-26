# 🔧 Fix: "Upload preset must be whitelisted for unsigned uploads"

## This is Easy to Fix! Follow These Steps:

---

## Step-by-Step Guide:

### 1. Go to Cloudinary Upload Settings
Visit: https://console.cloudinary.com/settings/upload

Or:
1. Login to Cloudinary: https://console.cloudinary.com/
2. Click **"Settings"** (gear icon) in bottom left
3. Click **"Upload"** tab

---

### 2. Find "Upload presets" Section
Scroll down until you see **"Upload presets"**

---

### 3. Create New Unsigned Preset
Click the **"Add upload preset"** link

Fill in:
- **Preset name**: `ml_default`
- **Signing Mode**: Select **"Unsigned"** ⚠️ (This is crucial!)
- **Folder** (optional): `blog-posts` or leave empty
- **Unique filename**: ✅ Check this box (recommended)
- **Overwrite**: Leave unchecked

Click **"Save"**

---

## Alternative: Use a Different Preset Name

If you want to use a different name:

### Option A: Create preset with different name (e.g., `blog_upload`)
Then update the code to use that name.

### Option B: Check if you already have an unsigned preset
Look in the "Upload presets" list - you might already have one!

If you see a preset with "Unsigned" mode, note its name and I'll update the code to use it.

---

## Screenshot Guide:

When you're on the Upload settings page, you should see:

```
Upload presets
─────────────────────────────────────────
[Add upload preset]

List of presets:
┌─────────────────────────────────────┐
│ Preset name: ml_default             │
│ Signing mode: Unsigned              │
│ Folder: blog-posts                  │
│ Actions: [Edit] [Delete]            │
└─────────────────────────────────────┘
```

---

## After Creating the Preset:

1. Go back to: http://localhost:3001/dashboard/create-post
2. Select an image
3. Click "Upload Image"
4. ✅ It should work now!

---

## Still Getting Error?

If you created a preset with a different name (not `ml_default`), tell me the name and I'll update the code to use it!

Example:
- If your preset is named `blog_upload`
- Or `unsigned_preset`
- Or anything else

Just tell me and I'll fix the code! 🔧
