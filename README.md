# Tola's Wedding Website - RSVP Setup Guide

## Current RSVP Implementation

The current RSVP form is set up to submit to a Google Form, which will automatically store responses in a Google Sheet.

## Option 1: Google Forms (Recommended)

### Setup Steps:

1. **Create a Google Form:**
   - Go to [forms.google.com](https://forms.google.com)
   - Create a new form with these questions:
     - Full Name (Short answer)
     - Email Address (Short answer)
     - Will you attend? (Multiple choice: Yes/No/Maybe)

2. **Connect to Google Sheets:**
   - In your Google Form, go to the "Responses" tab
   - Click the Google Sheets icon to create a linked spreadsheet
   - This will automatically store all responses in a Google Sheet

3. **Get the Form URL and Entry IDs:**
   - Right-click on your Google Form and "View Page Source"
   - Search for "entry." to find the entry IDs for each field
   - Copy the form action URL

4. **Update the JavaScript:**
   - Replace `YOUR_FORM_ID` in `script.js` with your actual form ID
   - Replace the entry IDs (123456789, 987654321, 456789123) with your actual entry IDs

## Option 2: Google Sheets API (Advanced)

For more control, you can use Google Sheets API directly:

```javascript
// Alternative implementation using Google Sheets API
function submitToGoogleSheets(formData) {
    const scriptURL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
    
    fetch(scriptURL, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        showSuccessModal(formData.name);
        document.getElementById('rsvp-form').reset();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error submitting your RSVP. Please try again.');
    });
}
```

## Option 3: Local Storage (Temporary)

For testing purposes, you can store data locally:

```javascript
function submitToLocalStorage(formData) {
    // Get existing RSVPs
    let rsvps = JSON.parse(localStorage.getItem('weddingRSVPs') || '[]');
    
    // Add new RSVP
    rsvps.push({
        ...formData,
        timestamp: new Date().toISOString()
    });
    
    // Save back to localStorage
    localStorage.setItem('weddingRSVPs', JSON.stringify(rsvps));
    
    showSuccessModal(formData.name);
    document.getElementById('rsvp-form').reset();
}
```

## Option 4: Email Service (Simple)

You can also send RSVPs directly to your email:

```javascript
function submitViaEmail(formData) {
    const mailtoLink = `mailto:your-email@example.com?subject=Wedding RSVP - ${formData.name}&body=Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0AAttendance: ${formData.attendance}`;
    
    window.location.href = mailtoLink;
    showSuccessModal(formData.name);
    document.getElementById('rsvp-form').reset();
}
```

## Recommended Setup

1. **Use Google Forms** for the easiest setup
2. **Google Sheets** will automatically store all responses
3. **No server required** - everything works client-side
4. **Easy to manage** - view responses in Google Sheets
5. **Export data** to Excel or CSV when needed

## Testing

To test your RSVP form:
1. Fill out the form on your website
2. Check your Google Form responses
3. Verify data appears in the linked Google Sheet

## Security Notes

- Google Forms are secure and reliable
- No sensitive data handling required
- Automatic backup in Google Drive
- Easy to share with wedding planners/helpers 