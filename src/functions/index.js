// functions/index.js

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const sgMail = require('@sendgrid/mail');

admin.initializeApp();

const SENDGRID_API_KEY = 'YOUR_SENDGRID_API_KEY'; // Replace with your SendGrid API key

sgMail.setApiKey(SENDGRID_API_KEY);

exports.sendPinEmail = functions.https.onRequest(async (req, res) => {
  const { email } = req.body;
  const pin = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit PIN

  try {
    const msg = {
      to: email,
      from: 'noreply@example.com', // Replace with your verified sender
      subject: 'Your PIN for Login',
      text: `Your PIN for login is: ${pin}`,
    };

    await sgMail.send(msg);

    // Store the pin in Firestore (optional)
    const userRef = admin.firestore().collection('users').doc(email);
    await userRef.set({ pin }, { merge: true });

    res.status(200).send('PIN sent to email successfully.');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Failed to send PIN. Please try again later.');
  }
});
