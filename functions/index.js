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
const { user } = require('firebase-functions/v1/auth');
const cors = require('cors')({ origin: true });


admin.initializeApp(); 

const db = admin.firestore();

exports.getBookingDataFull = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
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
});

exports.getBookingDataVal = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
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
});

exports.getUserDataFull = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
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
  }
  );
});

exports.getUserDataVal = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
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
  }
  );
});

exports.getissuesDataFull = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
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
});

exports.getIssueDataVal = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
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
  }
  );
});

exports.getVenueDataFull = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
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
  }
  );
});

exports.getVenueDataVal = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
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
  }
  );
});

exports.addUserData = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
  try {
    const docRef = await db.collection("userData").add(req.body);

    res.status(200).json({ success: true, id: docRef.id });
  } catch (error) {
    console.error("Error adding document: ", error);
    res.status(500).json({ success: false, error: error.message });
  }
  }
  );
});

exports.addBookingData = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
  try {
    const docRef = await db.collection("bookingData").add(req.body);

    res.status(200).json({ success: true, id: docRef.id });
  } catch (error) {
    console.error("Error adding document: ", error);
    res.status(500).json({ success: false, error: error.message });
  }
  }
  );
});

exports.addIssueData = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
  try {
    const docRef = await db.collection("issuesData").add(req.body);

    res.status(200).json({ success: true, id: docRef.id });
  } catch (error) {
    console.error("Error adding document: ", error);
    res.status(500).json({ success: false, error: error.message });
  }
  }
  );
});

exports.addvenueData = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
  try {
    const docRef = await db.collection("venueData").add(req.body);

    res.status(200).json({ success: true, id: docRef.id });
  } catch (error) {
    console.error("Error adding document: ", error);
    res.status(500).json({ success: false, error: error.message });
  }
  }
  );
});


exports.getResolved3Days = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
  try {
    const querySnapshot = await db.collection("issuesData").get();
    const data = [];


    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });

    const unresolvedData = [];



    data.forEach(data => {
      if (data.dateResolved === "" || isOlderThanThreeDays(data.dateResolved)) {
        unresolvedData.push(data);
      }
    });

    
    res.json(unresolvedData); 
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  }
  }
  );
});

exports.updateUserData = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const jsonData =req.body 


      console.log("Request Body: ", jsonData);

      const id = jsonData.id;

      const otherFields = {};
      for (const key in jsonData) {
        if (key !== "id") {
          otherFields[key] = jsonData[key];
        }
      }

      console.log("ID: ", id);

      if (!id) {
        return res.status(400).json({ success: false, message: "Missing 'id' in request body." });
      }

      const docRef = db.collection("userData").doc(id);

      await docRef.update(otherFields); // Now update with the other fields

      res.status(200).json({ success: true, message: "Document updated successfully." });
    } catch (error) {
      console.error("Error updating document: ", error);
      res.status(500).json({ success: false, error: error.message });
    }
  });
});

exports.updateVenueData = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const jsonData =req.body 


      console.log("Request Body: ", jsonData);

      const id = jsonData.id;

      const otherFields = {};
      for (const key in jsonData) {
        if (key !== "id") {
          otherFields[key] = jsonData[key];
        }
      }

      console.log("ID: ", id);

      if (!id) {
        return res.status(400).json({ success: false, message: "Missing 'id' in request body." });
      }

      const docRef = db.collection("venueData").doc(id);

      await docRef.update(otherFields); // Now update with the other fields

      res.status(200).json({ success: true, message: "Document updated successfully." });
    } catch (error) {
      console.error("Error updating document: ", error);
      res.status(500).json({ success: false, error: error.message });
    }
  });
});

exports.updateBookingData = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const jsonData =req.body 


      console.log("Request Body: ", jsonData);

      const id = jsonData.id;

      const otherFields = {};
      for (const key in jsonData) {
        if (key !== "id") {
          otherFields[key] = jsonData[key];
        }
      }

      console.log("ID: ", id);

      if (!id) {
        return res.status(400).json({ success: false, message: "Missing 'id' in request body." });
      }

      const docRef = db.collection("bookingData").doc(id);

      await docRef.update(otherFields); // Now update with the other fields

      res.status(200).json({ success: true, message: "Document updated successfully." });
    } catch (error) {
      console.error("Error updating document: ", error);
      res.status(500).json({ success: false, error: error.message });
    }
  });
});

exports.updateIssuesData = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const jsonData =req.body 


      console.log("Request Body: ", jsonData);

      const id = jsonData.id;

      const otherFields = {};
      for (const key in jsonData) {
        if (key !== "id") {
          otherFields[key] = jsonData[key];
        }
      }

      console.log("ID: ", id);

      if (!id) {
        return res.status(400).json({ success: false, message: "Missing 'id' in request body." });
      }

      const docRef = db.collection("issuesData").doc(id);

      await docRef.update(otherFields); // Now update with the other fields

      res.status(200).json({ success: true, message: "Document updated successfully." });
    } catch (error) {
      console.error("Error updating document: ", error);
      res.status(500).json({ success: false, error: error.message });
    }
  });
});


function isOlderThanThreeDays(dateStr) {
  const currentDate = new Date();
  const dateResolved = new Date(dateStr);
  const diffTime = currentDate - dateResolved;
  const diffDays = diffTime / (1000 * 3600 * 24); // Convert milliseconds to days
  return diffDays < 3;
}


