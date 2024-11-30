const express = require('express');
const bodyParser = require('body-parser');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');


// Initialize Firebase Admin SDK
// const serviceAccount = require('./byard-adc-samimhassan-firebase-adminsdk-z3t04-dae97a433c.json');

initializeApp({
  credential: cert(process.env.GOOGLE_APPLICATION_CREDENTIALS),
});


const db = getFirestore();

const app = express();
app.use(bodyParser.json());

// API Endpoint to Submit Event Data
app.post('/submit-event', async (req, res) => {
  try {
    const { eventTitle, eventType, organizationName, contactEmail, startsAt, endsAt } = req.body;

    if (!eventTitle || !eventType || !organizationName || !contactEmail || !startsAt || !endsAt) {
      return res.status(400).send({ message: 'All fields are required' });
    }

    // Save the data to Firestore
    const eventRef = db.collection('samim_hassan_events').doc();
    await eventRef.set({
      event_title,
      event_type,
      organization_name,
      contact_email,
      e_start_date,
      e_end_date,
      created_at: new Date(),
    });

    res.status(200).send({ message: 'Event submitted successfully!' });
  } catch (error) {
    console.error('Error saving event:', error);
    res.status(500).send({ message: 'Error saving event data' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
