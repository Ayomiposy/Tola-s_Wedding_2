# Google Forms Setup for RSVP

## Quick Setup Guide

### Step 1: Create Google Form
1. Go to [forms.google.com](https://forms.google.com)
2. Click "Blank" to create a new form
3. Add these questions exactly as shown:

**Question 1:**
- Type: Short answer
- Question: "Full Name"
- Required: Yes

**Question 2:**
- Type: Short answer  
- Question: "Email Address"
- Required: Yes

**Question 3:**
- Type: Multiple choice
- Question: "Will you attend?"
- Options:
  - Yes, I'll be there!
  - Sorry, can't make it
  - Maybe
- Required: Yes

### Step 2: Get Form ID
1. Look at your form URL: `https://docs.google.com/forms/d/FORM_ID_HERE/edit`
2. Copy the FORM_ID_HERE part (it's a long string of letters/numbers)

### Step 3: Get Entry IDs
1. Right-click on your Google Form
2. Select "View Page Source"
3. Press Ctrl+F and search for "entry."
4. You'll find 3 entries like `entry.123456789`
5. Note down all 3 entry IDs

### Step 4: Update JavaScript
In `script.js`, replace:
- `YOUR_FORM_ID` with your actual form ID
- `entry.123456789` with your name field entry ID
- `entry.987654321` with your email field entry ID  
- `entry.456789123` with your attendance field entry ID

### Step 5: Connect to Google Sheets
1. In your Google Form, go to "Responses" tab
2. Click the Google Sheets icon (green spreadsheet icon)
3. Choose "Create a new spreadsheet"
4. This will automatically store all responses in a Google Sheet

### Step 6: Test
1. Fill out the form on your website
2. Check your Google Form responses
3. Verify data appears in the linked Google Sheet

## Example JavaScript Update

Replace this line in `script.js`:
```javascript
const googleFormUrl = 'https://docs.google.com/forms/d/YOUR_FORM_ID/formResponse';
```

With your actual form ID:
```javascript
const googleFormUrl = 'https://docs.google.com/forms/d/1ABC123DEF456GHI789JKL/formResponse';
```

And replace the entry IDs:
```javascript
googleFormData.append('entry.123456789', formData.name);     // Your actual name entry ID
googleFormData.append('entry.987654321', formData.email);    // Your actual email entry ID  
googleFormData.append('entry.456789123', formData.attendance); // Your actual attendance entry ID
```

## Benefits
✅ Automatic data storage in Google Sheets
✅ No server required
✅ Easy to export to Excel
✅ Real-time responses
✅ Secure and reliable
✅ Free to use 