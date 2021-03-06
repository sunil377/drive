import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
});

export const provider = new firebase.auth.GoogleAuthProvider();

export const Auth = app.auth();

const firestore = app.firestore();

firestore.enablePersistence().catch((err) => console.log(err));

export const database = {
    folders: firestore.collection("folders"),
    files: firestore.collection("files"),
    getCurrentTimeStamp: firebase.firestore.FieldValue.serverTimestamp,
};

export const storage = app.storage();
export type upLoadTask = firebase.storage.UploadTask;
export type userType = firebase.User;
export type userCredentialType = firebase.auth.UserCredential;

export default app;
