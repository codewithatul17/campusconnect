/**
 * CampusConnect - Authentication Logic (Login, Signup, Password Reset)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Password Visibility Toggle
  const togglePassBtns = document.querySelectorAll('.toggle-password-btn');
  togglePassBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const input = document.getElementById(targetId);
      if (input) {
        const isPassword = input.getAttribute('type') === 'password';
        input.setAttribute('type', isPassword ? 'text' : 'password');
        btn.innerHTML = isPassword 
          ? `<svg class="icon-svg" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`
          : `<svg class="icon-svg" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
      }
    });
  });

  // Login Form Submission
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPassword').value.trim();
      const submitBtn = document.getElementById('loginSubmitBtn');
      const alertBox = document.getElementById('authAlert');

      if (!email || !password) {
        showAuthAlert(alertBox, "Please provide both email and password.", "error");
        return;
      }

      setButtonLoading(submitBtn, true, "Signing in...");
      clearAuthAlert(alertBox);

      // Check if Firebase is active
      if (window.CampusConnectFirebase && window.CampusConnectFirebase.isReady) {
        try {
          const userCredential = await window.CampusConnectFirebase.auth.signInWithEmailAndPassword(email, password);
          showAuthAlert(alertBox, "Login successful! Redirecting to campus...", "success");
          
          // Fetch user document from Firestore if exists
          try {
            const userDoc = await window.CampusConnectFirebase.db.collection('users').doc(userCredential.user.uid).get();
            if (userDoc.exists) {
              const profile = userDoc.data();
              CampusData.updateCurrentUser(profile);
            }
          } catch (docErr) {
            console.warn("Could not fetch user document:", docErr);
          }

          setTimeout(() => window.location.href = "dashboard.html", 800);
        } catch (error) {
          setButtonLoading(submitBtn, false, "Sign In");
          showAuthAlert(alertBox, formatAuthError(error.code), "error");
        }
      } else {
        // Offline / Demo Mode Login
        setTimeout(() => {
          const user = CampusData.getCurrentUser();
          user.email = email;
          CampusData.updateCurrentUser(user);
          showAuthAlert(alertBox, "Welcome back! Redirecting...", "success");
          setTimeout(() => window.location.href = "dashboard.html", 600);
        }, 800);
      }
    });
  }

  // Signup Form Submission
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('signupName').value.trim();
      const email = document.getElementById('signupEmail').value.trim();
      const password = document.getElementById('signupPassword').value;
      const confirmPassword = document.getElementById('signupConfirmPassword').value;
      const course = document.getElementById('signupCourse').value;
      const year = document.getElementById('signupYear').value;
      const branch = document.getElementById('signupBranch').value.trim();

      const submitBtn = document.getElementById('signupSubmitBtn');
      const alertBox = document.getElementById('authAlert');

      // Validation
      if (!name || !email || !password || !confirmPassword || !course || !year || !branch) {
        showAuthAlert(alertBox, "Please fill in all the required academic fields.", "error");
        return;
      }

      if (password.length < 6) {
        showAuthAlert(alertBox, "Password must be at least 6 characters long.", "error");
        return;
      }

      if (password !== confirmPassword) {
        showAuthAlert(alertBox, "Passwords do not match.", "error");
        return;
      }

      setButtonLoading(submitBtn, true, "Creating Account...");
      clearAuthAlert(alertBox);

      // Firebase Registration
      if (window.CampusConnectFirebase && window.CampusConnectFirebase.isReady) {
        try {
          const cred = await window.CampusConnectFirebase.auth.createUserWithEmailAndPassword(email, password);
          await cred.user.updateProfile({ displayName: name });

          // Save User Document to Firestore
          const userData = {
            name: name,
            email: email,
            course: course,
            branch: branch,
            year: year,
            college: "Bennett University, Greater Noida (The Times Group)",
            bio: `Student of ${course} (${branch}) at Bennett University`,
            interests: [],
            skills: [],
            photoURL: "",
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
          };

          await window.CampusConnectFirebase.db.collection('users').doc(cred.user.uid).set(userData);
          CampusData.updateCurrentUser(userData);

          showAuthAlert(alertBox, "Account created successfully! Welcome to CampusConnect BU.", "success");
          setTimeout(() => window.location.href = "dashboard.html", 800);
        } catch (error) {
          setButtonLoading(submitBtn, false, "Create Account");
          showAuthAlert(alertBox, formatAuthError(error.code), "error");
        }
      } else {
        // Offline / Demo Signup
        setTimeout(() => {
          CampusData.updateCurrentUser({
            name: name,
            email: email,
            course: course,
            branch: branch,
            year: year,
            college: "Bennett University, Greater Noida (The Times Group)"
          });
          showAuthAlert(alertBox, "Account created successfully! Welcome to Bennett University CampusConnect.", "success");
          setTimeout(() => window.location.href = "dashboard.html", 700);
        }, 800);
      }
    });
  }

  // Google Sign-in Handler
  const googleBtns = document.querySelectorAll('.btn-google-auth');
  googleBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
      if (window.CampusConnectFirebase && window.CampusConnectFirebase.isReady) {
        try {
          const provider = new firebase.auth.GoogleAuthProvider();
          const result = await window.CampusConnectFirebase.auth.signInWithPopup(provider);
          
          // Upsert User in Firestore
          const userDoc = await window.CampusConnectFirebase.db.collection('users').doc(result.user.uid).get();
          if (!userDoc.exists) {
            await window.CampusConnectFirebase.db.collection('users').doc(result.user.uid).set({
              name: result.user.displayName || "Bennett Student",
              email: result.user.email,
              course: "B.Tech",
              branch: "Computer Science & Engineering",
              year: "2nd Year",
              college: "Bennett University, Greater Noida (The Times Group)",
              photoURL: result.user.photoURL || "",
              createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
          }
          
          showToast("Signed in with Google! Welcome to Bennett CampusConnect", "success");
          setTimeout(() => window.location.href = "dashboard.html", 600);
        } catch (error) {
          console.error("Google auth error:", error);
          showToast(error.message || "Failed to sign in with Google", "danger");
        }
      } else {
        // Demo Mode
        showToast("Demo Mode: Signed in with Google account!", "info");
        setTimeout(() => window.location.href = "dashboard.html", 600);
      }
    });
  });

  // Forgot Password Modal
  const forgotPassLink = document.getElementById('forgotPasswordLink');
  if (forgotPassLink) {
    forgotPassLink.addEventListener('click', (e) => {
      e.preventDefault();
      const email = prompt("Enter your registered college email for password reset:");
      if (email) {
        if (window.CampusConnectFirebase && window.CampusConnectFirebase.isReady) {
          window.CampusConnectFirebase.auth.sendPasswordResetEmail(email)
            .then(() => showToast(`Password reset link sent to ${email}`, "success"))
            .catch(err => showToast(err.message, "danger"));
        } else {
          showToast(`Demo: Password reset instructions sent to ${email}`, "info");
        }
      }
    });
  }
});

function setButtonLoading(btn, isLoading, text) {
  if (!btn) return;
  if (isLoading) {
    btn.disabled = true;
    btn.innerHTML = `<span class="spinner" style="width:16px;height:16px;border-width:2px;display:inline-block;vertical-align:middle;margin-right:6px;"></span> ${text}`;
  } else {
    btn.disabled = false;
    btn.textContent = text;
  }
}

function showAuthAlert(el, message, type) {
  if (!el) return;
  el.className = `auth-alert show ${type}`;
  el.textContent = message;
}

function clearAuthAlert(el) {
  if (!el) return;
  el.className = 'auth-alert';
  el.textContent = '';
}

function formatAuthError(code) {
  switch (code) {
    case 'auth/invalid-email':
      return 'The email address format is invalid.';
    case 'auth/user-disabled':
      return 'This user account has been disabled.';
    case 'auth/user-not-found':
      return 'No account found with this email.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists.';
    case 'auth/weak-password':
      return 'The password is too weak. Please use at least 6 characters.';
    case 'auth/network-request-failed':
      return 'Network connection error. Check your internet connection.';
    default:
      return 'Authentication failed. Please check your credentials and try again.';
  }
}
