/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();

const cors = require('cors')({ origin: true });
const { Timestamp } = require("firebase-admin/firestore");
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
      console.log("Data: ", data);
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


function isOlderThanThreeDays(dateResolvedObj) {
  const currentDate = new Date();
  const timestamp = new Timestamp(dateResolvedObj.seconds, dateResolvedObj.nanoseconds);
  const dateResolved = timestamp.toDate(); // Convert Firestore Timestamp to Date object
  const diffTime = currentDate - dateResolved;
  const diffDays = diffTime / (1000 * 3600 * 24); // Convert milliseconds to days
  return diffDays < 3; // also fix the comparison, you want "older than 3 days"
}

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


exports.getAcceptedFutureBookings = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {

      // Get today's date in YYYY-MM-DD format
      const todayDate = new Date();
      todayDate.setHours(0, 0, 0, 0); // Set time to midnight
      const today = Timestamp.fromDate(todayDate);
      console.log("Today: ", today);
      const test = {"seconds": today.seconds, "nanoseconds": today.nanoseconds};
      // Get bookings from Firestore
      const snapshot = await db.collection("bookingData")
        .where("date", ">=", test) // Filter by date
        .get();

      if (snapshot.empty) {
        return res.status(200).json({ success: true, bookings: [] , message: "No bookings found."});
      }
      const bookings = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        if (data.status === "approved") { // Manually filter
          bookings.push({ id: doc.id, ...data });
        }
      });

      res.status(200).json({bookings });
    } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  });
});

exports.getPendingFutureBookings = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {

      // Get today's date in YYYY-MM-DD format
      const todayDate = new Date();
      todayDate.setHours(0, 0, 0, 0); // Set time to midnight
      const today = Timestamp.fromDate(todayDate);
      console.log("Today: ", today);
      const test = {"seconds": today.seconds, "nanoseconds": today.nanoseconds};
      // Get bookings from Firestore
      const snapshot = await db.collection("bookingData")
        .where("date", ">=", test) // Filter by date
        .get();

      if (snapshot.empty) {
        return res.status(200).json({ success: true, bookings: [] , message: "No bookings found."});
      }
      const bookings = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        if (data.status === "pending") { // Manually filter
          bookings.push({ id: doc.id, ...data });
        }
      });

      res.status(200).json({bookings });
    } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  });
});


exports.getEnrichedUserAuthData = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      // Step 1: Get UUIDs from Firestore `userData`
      const querySnapshot = await db.collection("userData").get();
      const uuidList = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.UUID) {
          uuidList.push({ id: doc.id, uuid: data.UUID });
        }
      });

      if (uuidList.length === 0) {
        return res.status(404).json({ success: false, message: "No UUIDs found in userData." });
      }

      // Step 2: Fetch Firebase Auth user data for each UUID
      const getUsersResult = await admin.auth().getUsers(
        uuidList.map(user => ({ uid: user.uuid }))
      );

      const enrichedUsers = getUsersResult.users.map((userRecord) => {
        return {
          uid: userRecord.uid,
          email: userRecord.email,
          displayName: userRecord.displayName,
          photoURL: userRecord.photoURL
        };
      });

      res.status(200).json({ success: true, users: enrichedUsers });
    } catch (error) {
      console.error("Error enriching user data: ", error);
      res.status(500).json({ success: false, error: error.message });
    }
  });
});




