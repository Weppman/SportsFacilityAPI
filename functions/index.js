/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */



const admin = require('firebase-admin');
const functions = require("firebase-functions");
//const serviceAccount = require('./sportsfacility-ce031-firebase-adminsdk-fbsvc-a593c506df.json');

//admin.initializeApp({
  //credential: admin.credential.cert(serviceAccount)
//});

admin.initializeApp();

const db = admin.firestore();




exports.helloWorld = functions.https.onRequest((req, res) => {
  res.send("Hello from Firebase v1!");
});

exports.getBookingDataFull = functions.https.onRequest(async (req, res) => {
  try {
    const querySnapshot = await db.collection("bookingData").get();
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  }
});

exports.getBookingDataVal = functions.https.onRequest(async (req, res) => {
  try {
    const id = req.query.id;
    if (!id) {
      return res.status(400).send("Missing booking ID");
    }

    const docRef = db.collection("bookingData").doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).send("No booking found.");
    }

    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  }
});

exports.getUserDataFull = functions.https.onRequest(async (req, res) => {
  try {
    const querySnapshot = await db.collection("userData").get();
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    res.json(data); 
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  }
});

exports.getUserDataVal = functions.https.onRequest(async (req, res) => {
  try {
    const id = req.query.id;
    if (!id) {
      return res.status(400).send("Missing User ID");
    }

    const docRef = db.collection("userData").doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).send("No User found.");
    }

    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  }
});

exports.getissuesDataFull = functions.https.onRequest(async (req, res) => {
  try {
    const querySnapshot = await db.collection("issuesData").get();
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    res.json(data); 
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  }
});

exports.getIssueDataVal = functions.https.onRequest(async (req, res) => {
  try {
    const id = req.query.id;
    if (!id) {
      return res.status(400).send("Missing issues ID");
    }

    const docRef = db.collection("issuesData").doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).send("No Issue Data found.");
    }

    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  }
});

exports.getVenueDataFull = functions.https.onRequest(async (req, res) => {
  try {
    const querySnapshot = await db.collection("venueData").get();
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    res.json(data); 
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  }
});

exports.getVenueDataVal = functions.https.onRequest(async (req, res) => {
  try {
    const id = req.query.id;
    if (!id) {
      return res.status(400).send("Missing Venue ID");
    }

    const docRef = db.collection("venueData").doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).send("No Venue Data found.");
    }

    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  }
});

exports.addUserData = functions.https.onRequest(async (req, res) => {
  try {
    const docRef = await db.collection("userData").add(req.body);

    res.status(200).json({ success: true, id: docRef.id });
  } catch (error) {
    console.error("Error adding document: ", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

exports.addBookingData = functions.https.onRequest(async (req, res) => {
  try {
    const docRef = await db.collection("bookingData").add(req.body);

    res.status(200).json({ success: true, id: docRef.id });
  } catch (error) {
    console.error("Error adding document: ", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

exports.addIssueData = functions.https.onRequest(async (req, res) => {
  try {
    const docRef = await db.collection("issuesData").add(req.body);

    res.status(200).json({ success: true, id: docRef.id });
  } catch (error) {
    console.error("Error adding document: ", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

exports.addvenueData = functions.https.onRequest(async (req, res) => {
  try {
    const docRef = await db.collection("venueData").add(req.body);

    res.status(200).json({ success: true, id: docRef.id });
  } catch (error) {
    console.error("Error adding document: ", error);
    res.status(500).json({ success: false, error: error.message });
  }
});



