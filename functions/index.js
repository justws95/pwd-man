/*
const functions = require("firebase-functions");

// Declare all characters
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const generateRandString = (length) => {
  let result = "";
  const charactersLength = chars.length;
  for (let i = 0; i < length; i++ ) {
    result += chars.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};


exports.scheduledFunction = functions
    .pubsub
    .schedule("every 1 minutes")
    .onRun((context) => {
      console.log("This will be run every 1 minutes!");
      return null;
    });


exports.createUser = functions.firestore
    .document("users/{userId}")
    .onCreate((snap, context) => {
      return snap.ref.set({
        secret: generateRandString(44),
      });
    });
*/
