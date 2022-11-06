// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//     authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
//     projectId: process.env.NEXT_PUBLIC_PROJ_ID,
//     storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
//     messagingSenderId: process.env.NEXT_PUBLIC_MSGING_SENDER_ID,
//     appId: process.env.NEXT_PUBLIC_APP_ID,
// };

const firebaseConfig = {
    apiKey: "AIzaSyBDn69Bz4h_wkinh6qjNf-gOzi2mlt0Y_s",
    authDomain: "primax-685eb.firebaseapp.com",
    projectId: "primax-685eb",
    storageBucket: "primax-685eb.appspot.com",
    messagingSenderId: "169060467940",
    appId: "1:169060467940:web:5630460447f6a28f9298f1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
