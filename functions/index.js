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

// The Cloud Functions for Firebase SDK to set up triggers and logging.
const { onSchedule } = require("firebase-functions/v2/scheduler");
const nodemailer = require('nodemailer');

// The Firebase Admin SDK to delete inactive users.
const admin = require("firebase-admin");
admin.initializeApp();

// The es6-promise-pool to limit the concurrency of promises.
const PromisePool = require("es6-promise-pool").default;
// Maximum concurrent account deletions.
const MAX_CONCURRENT = 3;



// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.allowRDSRVXUsersOnly = onRequest((request, response) => {

// //   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'john@revox.io',
        pass: '*ADragonWorksHappy28!*'
    }
});

var mailOptions = {
    from: 'john@revox.io',
    to: 'nishal.john24@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};



exports.restrictunAuthUsers = beforeUserCreated(event => {
    let user = event.data;
    if (!user.email?.includes('@revox.io') || !user.email?.includes('@rundownstudios.com')) {
        throw new HttpsError('invalid-argument', 'Unauhorized email');
    }
});


// exports.birthdayReminder = onSchedule("every day 00:00", async (event) => {
//     // // Fetch all user details.
//     // const inactiveUsers = await getInactiveUsers();

//     // // Use a pool so that we delete maximum `MAX_CONCURRENT` users in parallel.
//     // const promisePool = new PromisePool(
//     //     () => deleteInactiveUser(inactiveUsers),
//     //     MAX_CONCURRENT,
//     // );
//     // await promisePool.start();

//     transporter.sendMail(mailOptions, function (error, info) {
//         if (error) {
//             console.log(error);
//         } else {
//             console.log('Email sent: ' + info.response);
//         }
//     });

//     logger.log("User cleanup finished");
// });

exports.scheduledFunctionCrontab = onSchedule("*/30 * * * *", async (event) => {
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
});
