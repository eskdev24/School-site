import { initializeApp, getApps, getApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

// Read configuration from environment variables (.env / import.meta.env)
const env = import.meta.env;

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || "AIzaSyDHhZqhTq3GKr2pzvxDSs5XLJecS6swPQk",
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || "samaths-solutions.firebaseapp.com",
  projectId: env.VITE_FIREBASE_PROJECT_ID || "samaths-solutions",
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || "samaths-solutions.firebasestorage.app",
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1089027024930",
  appId: env.VITE_FIREBASE_APP_ID || "1:1089027024930:web:991673ae9d46b82f66427b",
  measurementId: env.VITE_FIREBASE_MEASUREMENT_ID || "G-V4PH7MNFH2",
  databaseURL: env.VITE_FIREBASE_DATABASE_URL || "https://samaths-solutions-default-rtdb.firebaseio.com/",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Connect directly to the Realtime Database using the configured databaseURL
export const rtdb = getDatabase(app, firebaseConfig.databaseURL);
export const auth = getAuth(app);
export default app;


