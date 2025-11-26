# 📸 Visual Guide - Enable Cloudinary Unsigned Uploads

## EXACT STEPS WITH DESCRIPTIONS:

---

## Step 1: Login to Cloudinary
🔗 https://console.cloudinary.com/

---

## Step 2: Open Settings
Click the ⚙️ **Settings** icon in the bottom left corner

---

## Step 3: Click Upload Tab
In the settings menu, click on **"Upload"** tab at the top

---

## Step 4: Scroll to "Upload presets"
Scroll down the page until you see the section titled:
**"Upload presets"**

---

## Step 5: Click "Add upload preset"
Click the link that says **"Add upload preset"**

---

## Step 6: Configure the Preset

### IMPORTANT SETTINGS:

**Upload preset name:**
```
ml_default
```
(Must be exactly this, or tell me if you use a different name)

**Signing Mode:** (THIS IS THE KEY!)
```
○ Signed
● Unsigned  ← SELECT THIS ONE!
```

**Other Settings (Optional but Recommended):**

- **Folder:** `blog-posts` (keeps images organized)
- **Unique filename:** ✅ Checked (prevents name conflicts)
- **Use filename:** ✅ Checked (keeps original names)
- **Overwrite:** ⬜ Unchecked

---

## Step 7: Save
Click the **"Save"** button at the bottom

---

## Step 8: Verify
You should now see your preset in the list:

```
Upload presets
─────────────────────────────────────
ml_default (Unsigned)
```

---

## ✅ Done! Now Test:

1. Go to: http://localhost:3001/dashboard/create-post
2. Select an image
3. Click "Upload Image"
4. Watch it upload successfully! 🎉

---

## Common Mistakes:

❌ **Wrong:** Signing Mode = "Signed"  
✅ **Correct:** Signing Mode = "Unsigned"

❌ **Wrong:** Preset name = "default"  
✅ **Correct:** Preset name = "ml_default"

---

## Alternative: Check Existing Presets

Before creating a new one, check if you already have an **unsigned** preset:

1. Look in the "Upload presets" list
2. See if any show "Unsigned" mode
3. If yes, note the name and tell me - I'll update the code!

---

## Need Help?

If you're stuck, tell me:
1. What preset name you created
2. Whether you selected "Unsigned" mode
3. Any error messages you see

And I'll help you fix it! 🚀
