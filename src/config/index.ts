/**
 * Server API URL to send HTTP requests
 */
export const API_URL: string = process.env.REACT_APP_API_URL || 'http://localhost:5000';

/**
 * Configuration to set up Firebase Authentication
 */
export const FIREBASE_CONFIG: Record<string, string | undefined> = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH,
  databaseURL: process.env.REACT_APP_FIREBASE_DB,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};
