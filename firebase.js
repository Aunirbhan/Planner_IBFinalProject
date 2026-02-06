// Import Firebase modules from official CDN (replaces deprecated Skypack CDN)
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAGaBk_Q-Dsq2LiH-5xPMwO1qFdKuXQ1pY",
    authDomain: "iatodolist.firebaseapp.com",
    projectId: "iatodolist",
    storageBucket: "iatodolist.appspot.com",
    messagingSenderId: "450824410690",
    appId: "1:450824410690:web:52459fd81bc0b0a08e3fdb",
    measurementId: "G-P0VCQRTC06"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication
const auth = getAuth(app);

// Function to handle Google sign-in using popup (works reliably on GitHub Pages)
function handleGoogleSignIn() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            console.log("Sign-in successful:", result.user.displayName);
            // onAuthStateChanged will handle the redirect to index.html
        })
        .catch((error) => {
            console.error("Sign-in error:", error);
        });
}

// Function to handle sign-out
function handleSignOut() {
    signOut(auth).then(() => {
        console.log("User signed out successfully");
        window.location.href = "signin.html";
    }).catch((error) => {
        console.error("Sign out error:", error);
    });
}

// Handling the auth state change to provide access to the project which is located at index.html
// Uses endsWith() for GitHub Pages compatibility (path includes repo name prefix)
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User is signed in:", user.displayName);
        const welcomeStatement = document.getElementById("welcome");
        if (welcomeStatement) {
            welcomeStatement.textContent = `Welcome ${user.displayName}!`;
        }
        // If on signin page, redirect to index
        if (window.location.pathname.endsWith('/signin.html')) {
            window.location.href = "index.html";
        }
    } else {
        console.log("No user is signed in.");
        // Redirect to sign-in page if not already on it
        if (!window.location.pathname.endsWith('/signin.html')) {
            window.location.href = "signin.html";
        }
    }
});

// Expose the sign-in and sign-out functions to be called from HTML
window.handleGoogleSignIn = handleGoogleSignIn;
window.handleSignOut = handleSignOut;
