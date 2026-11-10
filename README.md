# CampusConnect 🎓 (Bennett University Edition)
> **Bennett University. Your Community. Connected.**
> A modern, polished college community and student collaboration platform tailored specifically for Bennett University (The Times Group), Greater Noida.

---

## 1. What CampusConnect Is

**CampusConnect** is a centralized, SaaS-grade student community platform customized for **Bennett University (BU)**. It connects students across all schools (School of Computer Science Engineering and Technology - SCSET, School of Engineering and Applied Sciences - SEAS, School of Management - SOM, School of Law - SOL, and Times School of Media - TSOM) with a unified digital ecosystem:

- **Discover Bennett Campus Events:** Flagship cultural fest **Uphoria**, **HackBennett 36H** at The Hatchery, **Sportikon**, **TEDxBennettUniversity**, and competitive coding leagues with live RSVPs and seat counts.
- **Join Bennett Clubs & Societies:** Connect with **ACM Bennett Chapter**, **The Bennett Hatchery & E-Cell**, **Advaita Dance Society**, **Pulse Music Society**, **Focus**, **Alexis Debating Society**, and **Rotaract BU**.
- **Official University Announcements:** Real-time bulletins from the Controller of Examinations, Centre for Career Services (CCS), and Campus Transport (shuttle schedules).
- **LRC Study Repository:** Access handwritten lecture notes, past exam question papers, and cheat-sheets aligned with the Bennett University engineering & management curriculum.
- **Smart Lost & Found:** Location-tagged reporting across the Learning Resource Centre (LRC), Block C Cafeteria, Sports Complex, and Shuttle points.
- **Interactive Community Feed:** Form hackathon squads for the Hatchery, discuss campus activities, share notes, and engage via likes & comments.
- **Student Profile Management:** Track course (B.Tech, BCA, MCA, BBA, MBA, Law, Media), specializations, technical skills, and registered activities.
- **Dark & Light Mode:** Seamless theme toggle with preferences persisted in `localStorage`.

---

## 2. Technologies Used

CampusConnect adheres to strict, modern, lightweight web standards with **zero build tools**:

- **HTML5:** Clean semantic tags (`<nav>`, `<header>`, `<main>`, `<aside>`, `<section>`, `<article>`, `<footer>`).
- **CSS3:** Custom design system using CSS variables, modern flexbox/grid layouts, smooth micro-interactions, responsive media queries, and dark/light mode tokens.
- **Vanilla JavaScript (ES6+):** Modular, clean, maintainable logic without heavy frontend frameworks or bundlers.
- **Firebase Web SDK (CDN Compat v10.8):** Browser-compatible CDN imports for Authentication, Cloud Firestore, and Firebase Storage.
- **Zero Build Tools / Zero Node.js:** Works right out of the box by opening `index.html` directly in any web browser, or via static web hosting.

---

## 3. Folder Structure

```
campusconnect/
│
├── index.html              # Modern Landing Page (Hero, Features, How It Works, CTA)
├── login.html              # Split-screen Auth Login
├── signup.html             # Academic Registration (Course, Year, Branch)
├── dashboard.html          # Main Application Hub & Analytics
├── events.html             # Events Explorer & Details Modal
├── clubs.html              # Campus Clubs Directory & Join Toggle
├── announcements.html      # Official Campus Notice Board
├── resources.html          # Study Materials Repository & Upload Modal
├── lost-found.html         # Dual-tab Lost & Found System
├── create-post.html        # Community Post Publisher
├── profile.html            # Student Profile & Edit Modal
├── firestore.rules         # Production-ready Security Rules for Firestore
├── README.md               # Complete Project Documentation
│
├── css/
│   ├── style.css           # Core Design Tokens, Variables & Components
│   ├── auth.css            # Specialized Split-screen Auth Styles
│   └── responsive.css      # Breakpoints: 1920px, 1440px, 1024px, 768px, 480px, 375px
│
├── js/
│   ├── firebase-config.js  # Firebase Credentials & Offline/Online Auto-detection
│   ├── app.js              # Theme Engine, Toasts, Global Search, Data Layer
│   ├── auth.js             # Email/Password & Google Authentication
│   ├── dashboard.js        # Dashboard Stats, Feed, & Widget Controllers
│   ├── events.js           # Event Filters, Registration & Modals
│   ├── clubs.js            # Club Directories & Membership Toggles
│   ├── announcements.js    # University Notices & Priority Badges
│   ├── resources.js        # Academic Repo & Upload Handler
│   ├── lost-found.js       # Lost/Found Tab Controller & Report Forms
│   ├── profile.js          # Profile Details & Edit Modal Form
│   └── posts.js            # Post Creation & Live Preview
│
└── assets/
    ├── images/             # Local Brand & Media Assets
    └── icons/              # Scalable SVG Icons
```

---

## 4. How to Run Locally

You **do NOT need Node.js or npm**. Simply run the project using any of the following simple methods:

### Method A: Direct File Open
Double-click `index.html` in your file explorer. It will open in Google Chrome, Microsoft Edge, Firefox, or Safari and function completely with its rich built-in sample data and local storage persistence!

### Method B: VS Code Live Server
1. Open the `campusconnect` folder in VS Code.
2. Right-click `index.html` and select **"Open with Live Server"**.
3. The site opens at `http://127.0.0.1:5500/index.html`.

### Method C: Python One-Line Static Server
Open a terminal in the `campusconnect` directory:
```bash
python -m http.server 8000
```
Then navigate to `http://localhost:8000` in your browser.

---

## 5. How to Add Firebase Configuration

When you are ready to connect a real Firebase backend:

1. Visit the [Firebase Console](https://console.firebase.google.com/).
2. Click **Add Project** and give it a name (e.g., `campusconnect-prod`).
3. Under **Project Overview**, click the **Web icon (`</>`)** to register a web application.
4. Copy the `firebaseConfig` object provided by Firebase.
5. Open `js/firebase-config.js` in your text editor and replace the placeholder object:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyD-YourActualApiKeyHere",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

*Note: If credentials are not yet configured, CampusConnect automatically runs in **Offline Demo Mode**, providing a fully populated, interactive experience.*

---

## 6. How to Enable Firebase Authentication

1. In your Firebase Console, navigate to **Build > Authentication**.
2. Click **Get Started**.
3. Under the **Sign-in method** tab:
   - Click **Email/Password** and enable it.
   - Click **Google**, enable it, and select your support email.
4. Under **Settings > Authorized domains**, add your hosting domain (such as `localhost` or `<username>.github.io`).

---

## 7. How to Connect Cloud Firestore

1. In your Firebase Console, navigate to **Build > Firestore Database**.
2. Click **Create Database**.
3. Select your preferred Cloud region and start in **Production mode**.
4. Go to the **Rules** tab in Firestore, copy the contents of `firestore.rules` from this project, and click **Publish**.
5. The collections (`users`, `events`, `clubs`, `announcements`, `resources`, `posts`, `lost_found`) will automatically be queried and populated as you and your students use the app.

---

## 8. How to Deploy Using GitHub Pages (Free)

1. Create a new repository on [GitHub](https://github.com/) named `campusconnect`.
2. Push your files to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of CampusConnect platform"
   git branch -M main
   git remote add origin https://github.com/<your-username>/campusconnect.git
   git push -u origin main
   ```
3. In your GitHub repository, go to **Settings > Pages**.
4. Under **Branch**, select `main` and root folder `/`, then click **Save**.
5. In 1–2 minutes, your website will be live at `https://<your-username>.github.io/campusconnect/`!

---

## 9. How to Deploy Using Firebase Hosting

1. If you have the Firebase CLI installed on your machine, navigate to the project directory:
   ```bash
   firebase login
   firebase init hosting
   ```
   - Select your Firebase project.
   - Specify `.` (the current directory) as your public directory.
   - Configure as a single-page app? **No**.
   - Set up automatic builds? **No**.
2. Deploy the files:
   ```bash
   firebase deploy --only hosting
   ```
3. Your application is live at `https://your-project-id.web.app`!

---

## 10. Student Midterm Evaluation Checklist

| Feature | Status | Verification Detail |
|---|---|---|
| **Responsive Design** | ✅ Verified | Tested across 1920px, 1024px, 768px, 480px, 375px with mobile drawer and bottom navigation. |
| **Dark & Light Mode** | ✅ Verified | Persists across refreshes using `localStorage`. |
| **Global Instant Search** | ✅ Verified | Live index across Events, Clubs, Bulletins, and Notes. |
| **Toast System** | ✅ Verified | Instant visual feedback on join, register, post, and copy actions. |
| **Lost & Found** | ✅ Verified | Dual-tab filtering, report modal, contact dialog, and resolution toggle. |
| **Study Resources** | ✅ Verified | Subject filter pills, format dropdown, and resource upload modal. |
| **Interactive Feed** | ✅ Verified | Live like increments, comment popups, and link sharing. |
| **Zero Node.js / Zero npm** | ✅ Verified | Runs seamlessly without bundlers or package managers. |
