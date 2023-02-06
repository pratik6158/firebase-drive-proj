import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// import dotenv from "dotenv";

// dotenv.config();

const app = firebase.initializeApp({
    apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env
        .VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_REACT_APP_FIREBASE_APP_ID,
});

export const auth = app.auth();
export const firestore = app.firestore(); //too much access for the user
export const database = {
    folders: firestore.collection("folders"),
    files: firestore.collection("files"),
    formatDoc: (doc) => {
        return { id: doc.id, ...doc.data() };
    },
    getCurrentTimeStamp: firebase.firestore.FieldValue.serverTimestamp,
};
export const storage = app.storage();

export default app;
