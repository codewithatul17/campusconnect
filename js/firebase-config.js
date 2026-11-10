/**
 * CampusConnect - Firebase Configuration & Initialization
 * 
 * Instructions:
 * 1. Go to Firebase Console (https://console.firebase.google.com/)
 * 2. Create a project and add a Web App.
 * 3. Replace the values in firebaseConfig below with your project credentials.
 * 4. Enable Authentication (Email/Password & Google), Cloud Firestore, and Firebase Storage.
 */

const firebaseConfig = {
  apiKey: "AIzaSyAYEtiQ03liUfbUB2ECgmpW8YdKsUDlxZA",
  authDomain: "campusconnect-bc747.firebaseapp.com",
  projectId: "campusconnect-bc747",
  storageBucket: "campusconnect-bc747.firebasestorage.app",
  messagingSenderId: "889383693505",
  appId: "1:889383693505:web:40615ce06b3e30ccf7f840"
};

// Check if valid Firebase credentials have been configured
function isFirebaseConfigured() {
  return (
    firebaseConfig.apiKey !== "YOUR_API_KEY_HERE" &&
    firebaseConfig.projectId !== "YOUR_PROJECT_ID" &&
    typeof firebase !== 'undefined'
  );
}

// Global Firebase references
let firebaseApp = null;
let auth = null;
let db = null;
let storage = null;
let isFirebaseReady = false;

try {
  if (typeof firebase !== 'undefined' && isFirebaseConfigured()) {
    firebaseApp = firebase.initializeApp(firebaseConfig);
    auth = firebase.auth();
    db = firebase.firestore();
    storage = firebase.storage();
    isFirebaseReady = true;
    console.log("%c[CampusConnect] Firebase initialized successfully! 🚀", "color: #10B981; font-weight: bold;");
  } else {
    console.warn("%c[CampusConnect] Running in Offline/Sample Data Mode. (To connect Firebase, add credentials in js/firebase-config.js)", "color: #F59E0B; font-weight: bold;");
  }
} catch (error) {
  console.error("[CampusConnect] Error initializing Firebase:", error);
}

// Expose on window object
window.CampusConnectFirebase = {
  config: firebaseConfig,
  isConfigured: isFirebaseConfigured,
  isReady: isFirebaseReady,
  app: firebaseApp,
  auth: auth,
  db: db,
  storage: storage
};
