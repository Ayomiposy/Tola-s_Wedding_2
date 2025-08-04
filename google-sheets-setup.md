# Google Sheets API Setup for RSVP

## Step-by-Step Setup

### 1. Create a Google Sheet
1. Go to [sheets.google.com](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Wedding RSVPs"
4. Add these headers in row 1:
   - A1: Timestamp
   - B1: Name
   - C1: Email
   - D1: Attendance

### 2. Create Google Apps Script
1. In your Google Sheet, go to Extensions > Apps Script
2. Replace the default code with this:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  
  const timestamp = new Date();
  const name = data.name;
  const email = data.email;
  const attendance = data.attendance;
  
  sheet.appendRow([timestamp, name, email, attendance]);
  
  return ContentService
    .createTextOutput(JSON.stringify({ 'result': 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

### 3. Deploy the Script
1. Click "Deploy" > "New deployment"
2. Choose "Web app"
3. Set "Execute as" to "Me"
4. Set "Who has access" to "Anyone"
5. Click "Deploy"
6. Copy the Web App URL

### 4. Update Your JavaScript
Replace the `submitToGoogleForm` function in `script.js` with:

```javascript
function submitToGoogleSheets(formData) {
    const scriptURL = 'YOUR_WEB_APP_URL_HERE'; // Replace with your actual URL
    
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

## Alternative: Simple Email Solution

If you prefer a simpler approach, you can modify the form to send emails directly:

```javascript
function submitViaEmail(formData) {
    const subject = encodeURIComponent(`Wedding RSVP - ${formData.name}`);
    const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}
Attendance: ${formData.attendance}
    `);
    
    const mailtoLink = `mailto:your-email@example.com?subject=${subject}&body=${body}`;
    
    window.location.href = mailtoLink;
    showSuccessModal(formData.name);
    document.getElementById('rsvp-form').reset();
}
```

## Testing Your Setup

1. **For Google Forms:**
   - Fill out your website form
   - Check your Google Form responses
   - Verify data in the linked Google Sheet

2. **For Google Sheets API:**
   - Fill out your website form
   - Check your Google Sheet for new rows
   - Verify all data is captured correctly

3. **For Email:**
   - Fill out your website form
   - Check your email for the RSVP notification

## Data Management

### Exporting Data
- **Google Sheets:** File > Download > Microsoft Excel
- **Google Forms:** Responses tab > Google Sheets icon > Export

### Viewing Responses
- **Google Sheets:** Real-time updates in your spreadsheet
- **Google Forms:** Responses tab with summary and individual responses

## Security Considerations

- Google Forms/Sheets are secure and reliable
- No sensitive data handling on your server
- Automatic backup in Google Drive
- Easy to share access with wedding planners 