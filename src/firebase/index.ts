// This file is the main entry point for all Firebase-related functionality.
// It initializes Firebase and exports the necessary services and providers.

import { initializeApp, getApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

// Your web app's Firebase configuration will be populated here.
const firebaseConfig = {
  "projectId": "heat-treatment-28136645-e6858",
  "appId": "1:990510434436:web:132a2d04941377797d9ad1",
  "apiKey": "AIzaSyAHKNzRBXWKX-XKe08DcKCPtWxHavA8JjM",
  "authDomain": "heat-treatment-28136645-e6858.firebaseapp.com",
  "storageBucket": "heat-treatment-28136645-e6858.appspot.com",
  "messagingSenderId": "990510434436"
};

type FirebaseServices = {
  firebaseApp: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
};

// We export a function to initialize Firebase, which will be called on the client-side.
export function initializeFirebase(): FirebaseServices {
  const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  const auth = getAuth(firebaseApp);
  const firestore = getFirestore(firebaseApp);
  return { firebaseApp, auth, firestore };
}

// We also export the providers that will make Firebase available throughout the app.
export { FirebaseClientProvider } from './client-provider';
export { FirebaseProvider, useFirebase } from './provider';