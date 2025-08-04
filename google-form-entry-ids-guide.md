# Finding Google Form Entry IDs - Simple Method

## Method 1: Use Google Forms "Get pre-filled link" Feature

### Step 1: Set up your Google Form
1. Go to your Google Form: `https://docs.google.com/forms/d/1tajn59wio6e5B59-J4cyuelg_SpxaCGKo8_8F6zl8t4/edit`
2. Make sure you have these questions:
   - Full Name (Short answer)
   - Email Address (Short answer)
   - Will you attend? (Multiple choice)

### Step 2: Get Pre-filled Link
1. In your Google Form, click the **"Send"** button (top right)
2. Click the **link icon** (chain icon)
3. Click **"Get pre-filled link"**
4. Fill in some test data:
   - Name: "Test Name"
   - Email: "test@example.com"
   - Attendance: "Yes, I'll be there!"
5. Click **"Get link"**
6. Copy the generated URL

### Step 3: Extract Entry IDs from the URL
The pre-filled URL will look like this:
```
https://docs.google.com/forms/d/1tajn59wio6e5B59-J4cyuelg_SpxaCGKo8_8F6zl8t4/viewform?usp=pp_url&entry.123456789=Test+Name&entry.987654321=test%40example.com&entry.456789123=Yes%2C+I%27ll+be+there!&submit=Submit
```

From this URL, extract the entry IDs:
- `entry.123456789` (for Name)
- `entry.987654321` (for Email)
- `entry.456789123` (for Attendance)

### Step 4: Update Your JavaScript
Replace the entry IDs in `script.js`:

```javascript
const preFilledUrl = `${baseFormUrl}?usp=pp_url&entry.YOUR_NAME_ID=${encodeURIComponent(formData.name)}&entry.YOUR_EMAIL_ID=${encodeURIComponent(formData.email)}&entry.YOUR_ATTENDANCE_ID=${encodeURIComponent(formData.attendance)}&submit=Submit`;
```

## Method 2: Use Browser Developer Tools

### Step 1: Open Developer Tools
1. Open your Google Form in a browser
2. Press **F12** to open Developer Tools
3. Go to the **"Network"** tab

### Step 2: Submit the Form
1. Fill out your Google Form with test data
2. Click **"Submit"**
3. Look for the form submission in the Network tab
4. Click on the submission and check the **"Payload"** or **"Form Data"** section
5. You'll see the entry IDs there

## Method 3: Check Form Source (Alternative Search)

### Step 1: View Page Source
1. Open your Google Form
2. Right-click and select **"View Page Source"**
3. Press **Ctrl+F** and search for these terms:
   - `"entry.` (with quotes)
   - `entry.` (without quotes)
   - `name="entry.`
   - `id="entry.`

### Step 2: Look for Entry IDs
Entry IDs are usually 9-digit numbers like:
- `entry.123456789`
- `entry.987654321`
- `entry.456789123`

## Testing Your Setup

1. **Update the entry IDs** in your `script.js`
2. **Test the form** on your website
3. **Check your Google Form responses**
4. **Verify data appears** in the linked Google Sheet

## Troubleshooting

- **If entry IDs don't work**: Try the pre-filled link method (Method 1)
- **If form doesn't open**: Check that your form URL is correct
- **If data doesn't appear**: Make sure your Google Form is connected to a Google Sheet

## Benefits of This Method

✅ **No complex setup required**
✅ **Uses Google Forms infrastructure**
✅ **Automatic data storage in Google Sheets**
✅ **Easy to manage responses**
✅ **Can export to Excel** 