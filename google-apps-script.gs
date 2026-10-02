function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const name = payload.name || 'Unknown';
    const email = payload.email || 'No email provided';
    const subject = payload.subject || 'New enquiry from website';
    const message = payload.message || 'No message provided';

    GmailApp.sendEmail(
      'zainduah55@gmail.com',
      subject,
      `Name: ${name}\nEmail: ${email}\n\n${message}`,
      {
        from: 'zainduah55@gmail.com',
        replyTo: email,
        name: 'ZINICH Contact Form'
      }
    );

    return ContentService.createTextOutput(JSON.stringify({ status: 'success' })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: error.toString() })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput('ZINICH contact form endpoint is active.');
}
