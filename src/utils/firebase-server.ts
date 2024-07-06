// Code is basically same as the client version, except we need to use the firebase-admin sdk
// import { initializeApp } from "firebase-admin";
// import { getApp, getApps } from "firebase-admin/app";
// import { getAuth } from "firebase-admin/auth";
// import { getFirestore } from "firebase-admin/firestore";
// import { credential } from "firebase-admin";
import * as admin from "firebase-admin";

// Initialize Firebase
// const serviceAccount = require("@/leetcode-ai-d4de1-firebase-adminsdk-m0mqj-dff053b8ce.json"); // eventually convert this to base64 and put as an environment variable
const serviceAccount = process.env.FIREBASE_PRIVATE_KEY;
if (!serviceAccount) {
    throw Error("API KEY DOESN'T EXIST");
}
const serviceAccountJSON = JSON.parse(serviceAccount);

let app: admin.app.App;


if (admin.apps.length === 0 || !admin.apps[0]) {
// Initialize a new app instance
    app = admin.initializeApp({
        credential: admin.credential.cert(serviceAccountJSON),
    });
} else {
// Retrieve an existing app instance
    app = admin.apps[0];
}

const auth = admin.auth(app); // stores info about currentUser --> you can access tokens through getTokenID which is a JWT identifier token, so we would include this with API calls for example to verify user is logged in
const firestore = admin.firestore(app);

export { auth, firestore, app };