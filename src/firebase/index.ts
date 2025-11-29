// This file is the main entry point for all Firebase-related functionality.
// It initializes Firebase and exports the necessary services and providers.

import { initializeApp, getApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

// Your web app's Firebase configuration will be populated here.
const firebaseConfig = {
  "projectId": "studio-3552309693-2b3cc",
  "appId": "1:69532037092:web:bfc601a42c8961f4fda1f1",
  "apiKey": "AIzaSyCunEH21hpPBW20ibMwci5oLC9U-5vnKYs",
  "authDomain": "studio-3552309693-2b3cc.firebaseapp.com",
  "storageBucket": "studio-3552309693-2b3cc.appspot.com",
  "messagingSenderId": "69532037092"
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