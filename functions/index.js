/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */


require('dotenv').config();

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
      const jsonData = req.body


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
      const jsonData = req.body


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
      const jsonData = req.body


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
      const jsonData = req.body


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
      const test = { "seconds": today.seconds, "nanoseconds": today.nanoseconds };
      // Get bookings from Firestore
      const snapshot = await db.collection("bookingData")
        .where("date", ">=", test) // Filter by date
        .get();

      if (snapshot.empty) {
        return res.status(200).json({ success: true, bookings: [], message: "No bookings found." });
      }
      const bookings = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        if (data.status === "approved") { // Manually filter
          bookings.push({ id: doc.id, ...data });
        }
      });

      res.status(200).json({ bookings });
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
      const test = { "seconds": today.seconds, "nanoseconds": today.nanoseconds };
      // Get bookings from Firestore
      const snapshot = await db.collection("bookingData")
        .where("date", ">=", test) // Filter by date
        .get();

      if (snapshot.empty) {
        return res.status(200).json({ success: true, bookings: [], message: "No bookings found." });
      }
      const bookings = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        if (data.status === "pending") { // Manually filter
          bookings.push({ id: doc.id, ...data });
        }
      });

      res.status(200).json({ bookings });
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
        const original = uuidList.find(u => u.uuid === userRecord.uid);

        return {
          id: original?.id || null,
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


exports.getUserDataUUID = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const id = req.query.UUID;
      if (!id) {
        return res.status(400).send("Missing User UID");
      }

      const querySnapshot = await db.collection("userData").where("UUID", "==", id).get();

      if (querySnapshot.empty) {
        return res.status(404).send("No User found.");
      }
      const doc = querySnapshot.docs[0];
      res.json({ id: doc.id, ...doc.data() });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error fetching data");
    }
  });
});

exports.sendEmailNotification = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {

    const sgMail = require('@sendgrid/mail');
    
    console.log(process.env);

    if (process.env.FUNCTIONS_EMULATOR === 'true') {
      require('dotenv').config();  // Only load this locally
    }

    const sendgridKey = process.env.SENDGRID_API_KEY;

    console.log("SendGrid Key: ", sendgridKey);
    sgMail.setApiKey(sendgridKey);

    const sendEmail = async (to, subject, text, html) => {
      const msg = {
        to,
        from: 'joweppelman@gmail.com', // Must be verified in SendGrid
        subject,
        text,
        html,
      };

      try {
        await sgMail.send(msg);
        console.log(`Email sent to ${to}`);
      } catch (error) {
        console.error(`Error sending email to ${to}:`, error);
      }
    };

    try {
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

      const getUsersResult = await admin.auth().getUsers(
        uuidList.map(userData => ({ uid: userData.uuid }))
      );

      const enrichedUsers = getUsersResult.users.map((userRecord) => {
        const original = uuidList.find(u => u.uuid === userRecord.uid);

        return {
          id: original?.id || null,
          uid: userRecord.uid,
          email: userRecord.email,
          displayName: userRecord.displayName,
          photoURL: userRecord.photoURL
        };
      });

      console.log("User Data: ", enrichedUsers);
      userData = enrichedUsers;

      const queryBookingSnapshot = await db.collection("bookingData").get();
      const bookingData = [];
      queryBookingSnapshot.forEach((doc) => {
        bookingData.push({ id: doc.id, ...doc.data() });
      });
      console.log("Booking Data: ", bookingData);

      const toDate = (firestoreTimestamp) => new Date(firestoreTimestamp.seconds * 1000);

      const now = new Date();
      const threeDaysFromNow = new Date();
      threeDaysFromNow.setDate(now.getDate() + 3);

      const upcomingBookings = bookingData.filter(booking => {
        const bookingDate = toDate(booking.date);
        return bookingDate >= now && bookingDate <= threeDaysFromNow;
      });

      const bookingsByUID = {};
      for (const booking of upcomingBookings) {
        if (!bookingsByUID[booking.UID]) {
          bookingsByUID[booking.UID] = [];
        }
        bookingsByUID[booking.UID].push(booking);
      }

      // Step 3: Create the final grouped result
      const groupedUsersWithBookings = userData
        .filter(user => bookingsByUID[user.uid])
        .map(user => ({
          user,
          bookings: bookingsByUID[user.uid]
        }));

      console.dir(groupedUsersWithBookings, { depth: null });

      for (const { user, bookings } of groupedUsersWithBookings) {
        const subject = `Upcoming Bookings Reminder`;
        const text = `Hi ${user.displayName},\n\nYou have upcoming bookings:\n` +
          bookings.map(b => `- ${b.venueID} on ${new Date(b.date.seconds * 1000).toLocaleString()}`).join('\n');

        const html = `
          <p>Hi ${user.displayName},</p>
          <p>You have upcoming bookings:</p>
          <ul>
            ${bookings.map(b => `<li>${b.venueID} on ${new Date(b.date.seconds * 1000).toLocaleString()}</li>`).join('')}
          </ul>
        `;
        console.log(`Preparing to send email to ${user.email}`);
        await sendEmail(user.email, subject, text, html);
      }



      res.status(200).json({ success: true });
    } catch (error) {
      console.error(`Error sending email to ${to}:`, error);
      if (error.response && error.response.body) {
        console.error("SendGrid error response:", error.response.body);
      }
    }
  });
});

exports.sendEmailMaintenanceNotification = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    const sgMail = require('@sendgrid/mail');

    console.log(process.env);

    if (process.env.FUNCTIONS_EMULATOR === 'true') {
      require('dotenv').config();  // Only load this locally
    }

    const sendgridKey = process.env.SENDGRID_API_KEY;

    console.log("SendGrid Key: ", sendgridKey);
    sgMail.setApiKey(sendgridKey);

    const sendEmail = async (to, subject, text, html) => {
      const msg = {
        to,
        from: 'joweppelman@gmail.com', // Must be verified in SendGrid
        subject,
        text,
        html,
      };
      try {
        await sgMail.send(msg);
        console.log(`Email sent to ${to}`);
      } catch (error) {
        console.error(`Error sending email to ${to}:`, error);
      }
    }

    try {
      const { id } = req.body;
      if (!id) {
        return res.status(400).send("Missing issues ID");
      }

      const docRef = db.collection("issuesData").doc(id);
      const doc = await docRef.get();

      if (!doc.exists) {
        return res.status(404).send("No Issue Data found.");
      }
      const data = { id: doc.id, ...doc.data() };

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

      const getUsersResult = await admin.auth().getUsers(
        uuidList.map(userData => ({ uid: userData.uuid }))
      );

      const enrichedUsers = getUsersResult.users.map((userRecord) => {
        const original = uuidList.find(u => u.uuid === userRecord.uid);

        return {
          id: original?.id || null,
          uid: userRecord.uid,
          email: userRecord.email,
          displayName: userRecord.displayName,
          photoURL: userRecord.photoURL
        };
      });

      console.log("User Data: ", enrichedUsers);
      emailList = enrichedUsers;

      // Compose the email content
      const reportedDate = new Date(data.dateReported.seconds * 1000).toLocaleString();

      const subject = `Maintenance Issue Reported: ${data.facility}`;
      const text = `Hello,

                    A new maintenance issue has been reported.

                    Details:
                    - Facility: ${data.facility}
                    - Type: ${data.type}
                    - Description: ${data.description}
                    - Date Reported: ${reportedDate}
                    - Feedback: ${data.feedback || "N/A"}
                    - Status: ${data.status}
                    - Date Resolved: ${data.dateResolved || "Not resolved yet"}

                    Please check the issue tracking system for more details.

                    Regards,
                    Facility Management System`;

      const html = `
                      <h2>New Maintenance Issue Reported</h2>
                      <ul>
                        <li><strong>Facility:</strong> ${data.facility}</li>
                        <li><strong>Type:</strong> ${data.type}</li>
                        <li><strong>Description:</strong> ${data.description}</li>
                        <li><strong>Date Reported:</strong> ${reportedDate}</li>
                        <li><strong>Feedback:</strong> ${data.feedback || "N/A"}</li>
                        <li><strong>Status:</strong> ${data.status}</li>
                        <li><strong>Date Resolved:</strong> ${data.dateResolved || "Not resolved yet"}</li>
                      </ul>
                      <p>Please check the issue tracking system for more details.</p>
                      <p>Regards,<br>Facility Management System</p>
                    `;

      // Send email to each user
      for (const email of emailList) {
        await sendEmail(email, subject, text, html);
        console.log(`Email sent to ${email}`);
      }

      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error fetching data");
    }






  });
});

