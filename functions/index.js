/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const { beforeUserCreated, HttpsError } = require("firebase-functions/v2/identity")

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.allowRDSRVXUsersOnly = onRequest((request, response) => {

// //   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


exports.restrictunAuthUsers = beforeUserCreated(event => {
    let user = event.data;
    if (!user.email?.includes('@revox.io')) {
        throw new HttpsError('invalid-argument', 'Unauhorized email');
    }
});
