const { sendEmail } = require("./mailer");

async function testEmail() {
  try {
    await sendEmail(
      "chiruchary1@gmail.com",  // Replace with the email where you want to receive the test
      "Test Email",
      "<h1>This is a test email</h1><p>If you receive this, the email configuration is working!</p>"
    );
    console.log("Test email sent successfully!");
  } catch (error) {
    console.error("Error sending test email:", error);
  }
}

testEmail();
