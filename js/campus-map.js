// ==========================================================================
// CampusConnect - Bennett University Campus Map Controller
// Interactive Navigation, Directory, and Floor Plan Viewer
// ==========================================================================

const BENNETT_CAMPUS_LOCATIONS = [
  {
    id: "blockA",
    name: "Block A - University Headquarters & Administration",
    category: "academic",
    icon: "🏛️",
    tagline: "Central leadership, administrative offices, and executive lecture spaces.",
    description: "Block A is the administrative core of Bennett University. It houses the Vice Chancellor's Secretariat, Registrar's Office, Dean of Academic Affairs, and central admissions reception.",
    hours: "08:30 AM - 05:30 PM (Mon-Fri)",
    landmark: "Directly opposite Gate 1 Security Plaza",
    floors: [
      { floor: "Ground Floor", details: "Central Reception, Visitor Lounge, Security Helpdesk, Cash Section" },
      { floor: "1st Floor", details: "Office of the Vice Chancellor, Registrar, Dean of Academic Affairs" },
      { floor: "2nd Floor", details: "Office of the Controller of Examinations (COE), Student Records Cell" },
      { floor: "3rd & 4th Floors", details: "Faculty Offices, Executive Classrooms, Boardrooms & Meeting Pods" }
    ]
  },
  {
    id: "blockP",
    name: "Block P - SCSET High-Tech Engineering & Computing Labs",
    category: "academic",
    icon: "💻",
    tagline: "Advanced computing, AI research clusters, and high-tech software labs.",
    description: "Block P is the flagship engineering complex for the School of Computer Science Engineering & Technology (SCSET). Equipped with Apple Mac studios, NVIDIA GPU supercomputing clusters, and robotics experimentation zones.",
    hours: "08:00 AM - 09:00 PM (Daily)",
    landmark: "East Academic Quad, connected via Atrium corridor",
    floors: [
      { floor: "Ground Floor", details: "Physics Lab, Electrical Circuits Lab, Robotics Testing Arena" },
      { floor: "1st Floor", details: "Apple iMac Multimedia Lab, NVIDIA GPU AI & Deep Learning Research Center" },
      { floor: "2nd Floor", details: "Data Structures & Algorithms Lab, Cloud Computing & Network Sandbox" },
      { floor: "3rd Floor", details: "Full-Stack Software Engineering Labs, Capstone Project Studios" },
      { floor: "4th Floor", details: "Cybersecurity War Room, IoT Hardware Testing Bay, Seminar Rooms" }
    ]
  },
  {
    id: "atrium",
    name: "The Central Atrium & 2-Story Learning Resource Centre (LRC)",
    category: "center",
    icon: "📚",
    tagline: "Iconic glass-canopy central hub and state-of-the-art 24/7 digital library.",
    description: "The architectural centerpiece of Bennett University. The Atrium is the buzzing heartbeat of campus life where student fests, hackathons, and exhibitions unfold. Adjacent to it is the 2-storey LRC containing over 50,000 volumes, IEEE digital access, and quiet discussion pods.",
    hours: "LRC: 08:00 AM - 11:00 PM (24x7 during Mid-Sem & End-Sem exams)",
    landmark: "Central Core of Campus",
    floors: [
      { floor: "Atrium Ground", details: "Central Meeting Concourse, Exhibition Stage, Fest Gathering Hub" },
      { floor: "LRC Ground", details: "Circulation Desk, Book Issue Kiosks, Fiction & Reference Stacks" },
      { floor: "LRC 1st Floor", details: "Digital Media Lab, IEEE/ACM Database Pods, Silent Study Cubicles" },
      { floor: "Law Library", details: "Supreme Court Reporter archives, School of Law Moot Court replica" }
    ]
  },
  {
    id: "blockB",
    name: "Block B - Times School of Media & School of Management",
    category: "academic",
    icon: "🎙️",
    tagline: "Professional TV studios, sound booths, and executive management lecture halls.",
    description: "Dedicated to the Times School of Media and School of Management. Houses multi-camera television broadcast sets, sound mixing booths, screening rooms, and Harvard-style tiered management case discussion amphitheaters.",
    hours: "08:30 AM - 08:00 PM",
    landmark: "West Quad, next to Block A",
    floors: [
      { floor: "Ground Floor", details: "Admissions Center, Career Services Centre (CCS Placement Cells)" },
      { floor: "1st Floor", details: "High-definition Multi-Camera TV Broadcast Studio, Chroma-Key Newsroom" },
      { floor: "2nd Floor", details: "Radio & Podcasting Booths, Post-Production Final Cut Pro suites" },
      { floor: "3rd & 4th Floors", details: "School of Management Case Study Theatres, Finance & Bloomberg Lab" }
    ]
  },
  {
    id: "hatchery",
    name: "The Bennett Hatchery & Incubation Centre",
    category: "center",
    icon: "🚀",
    tagline: "Times Group-backed startup accelerator and student entrepreneurship hub.",
    description: "A premier on-campus startup incubator providing up to ₹10 Lakhs in seed grants, legal advisory, Times Group media visibility, and venture mentorship for student-founded ventures.",
    hours: "09:00 AM - 08:00 PM",
    landmark: "Adjacent to Central Amphitheatre",
    floors: [
      { floor: "Level 1", details: "Co-Working Hot Desks, Startup Ideation Pods, Pitch Presentation Deck" },
      { floor: "Level 2", details: "Hardware 3D Printing & Prototyping Lab, Investor Boardroom" }
    ]
  },
  {
    id: "sportsComplex",
    name: "Indoor AC Sports Complex & Olympic Aquatic Centre",
    category: "sports",
    icon: "🏊",
    tagline: "50m Olympic pool, badminton courts, squash courts, and fitness arena.",
    description: "A world-class indoor athletic complex featuring a 50-meter temperature-regulated swimming pool, 4 AC badminton courts, glass-back squash arenas, table tennis stations, and a modern gymnasium.",
    hours: "06:00 AM - 09:30 AM & 04:30 PM - 09:30 PM",
    landmark: "South Campus, behind Hostels Block",
    floors: [
      { floor: "Aquatic Wing", details: "50m 8-Lane Olympic Swimming Pool, Diving Platforms, Shower Pavilions" },
      { floor: "Ground Arena", details: "4 AC Wooden Badminton Courts, 2 Squash Courts, Table Tennis Tables" },
      { floor: "1st Floor", details: "LifeFitness Cardio Center, Olympic Free Weights, Squat Racks & Trainers" }
    ]
  },
  {
    id: "turf",
    name: "FIFA-Standard Football Turf & 400m Athletic Track",
    category: "sports",
    icon: "⚽",
    tagline: "Floodlit synthetic turf, cricket practice nets, and running circuit.",
    description: "Bennett University's outdoor sports centerpiece. The floodlit synthetic football turf hosts the annual national Sportikon fest, alongside the 8-lane athletic running track and dedicated cricket nets.",
    hours: "06:00 AM - 10:00 PM (Floodlights operate in evening)",
    landmark: "South-East Athletic Grounds",
    floors: [
      { floor: "Main Pitch", details: "FIFA-Standard Artificial Turf with Spectator Stands & Match Scoring Box" },
      { floor: "Perimeter", details: "400m 8-Lane All-Weather Synthetic Athletic Running Track" },
      { floor: "Cricket Arena", details: "4 Practice Turf Nets with Automated Bowling Machines (Bennett Lions)" }
    ]
  },
  {
    id: "dining",
    name: "Central Dining Hall (Student Mess) & Food Kiosks",
    category: "living",
    icon: "🍽️",
    tagline: "Multi-cuisine student dining mess, Quench Cafeteria, Subway, and evening spots.",
    description: "Bennett's primary culinary zone. Serving 4 nutritious meals daily (Breakfast, Lunch, High Tea, Dinner) to over 3,000 resident students, complemented by Quench, Subway, and Kathi Junction.",
    hours: "Breakfast: 7:30-9:30 AM | Lunch: 12:00-2:30 PM | Dinner: 7:30-10:00 PM",
    landmark: "Central Residential Zone, behind Block C",
    floors: [
      { floor: "Ground Floor", details: "Central Dining Hall (Mess) Multi-Cuisine Buffets" },
      { floor: "Outdoor Plaza", details: "Quench Cafeteria, Subway Counter, Kathi Junction, Nescafe Kiosk" },
      { floor: "Night Canteen", details: "Late night snack counter (Open till 01:30 AM for exam revision)" }
    ]
  },
  {
    id: "hostels",
    name: "Student Residential Hostels (Boys & Girls Blocks)",
    category: "living",
    icon: "🏢",
    tagline: "Air-conditioned residential towers with 24/7 Wi-Fi and student lounges.",
    description: "Modern high-rise residential hostels for undergraduate and postgraduate students. Fully air-conditioned rooms with high-speed Wi-Fi, common entertainment rooms, laundromat, and 24/7 biometric security.",
    hours: "24/7 Access (Hostel In-Time: 10:30 PM)",
    landmark: "South-West Residential Sector",
    floors: [
      { floor: "Boys Towers", details: "Blocks 1, 2, 3 & 4 with TV Lounges and Study Rooms" },
      { floor: "Girls Towers", details: "Dedicated secure towers with indoor badminton and study lounges" },
      { floor: "Basement", details: "Automated Commercial Laundromat and Ironing Facility" }
    ]
  },
  {
    id: "medical",
    name: "24x7 Campus Medical Centre & Ambulance Station",
    category: "medical",
    icon: "🏥",
    tagline: "Round-the-clock emergency medical infirmary, resident doctors, and ambulance.",
    description: "Fully equipped campus health centre staffed with experienced medical officers and nursing professionals. Offers emergency triage, observation beds, essential medicines pharmacy, and an on-campus ambulance.",
    hours: "24 Hours / 7 Days a week",
    landmark: "Near Gate 1, Ground Floor Block A Extension",
    floors: [
      { floor: "Ground Floor", details: "Doctor Consultation Rooms, Emergency Treatment Ward, 24x7 Ambulance Bay" }
    ]
  },
  {
    id: "gate1",
    name: "Gate 1 - Main Entrance, Security & Shuttle Transit Bay",
    category: "medical",
    icon: "🚌",
    tagline: "Primary university entrance, campus shuttle pickup, and visitor security.",
    description: "The main access gateway to Bennett University. Features the 24/7 security reception, student ID turnstiles, and the official pickup and drop bay for university shuttle buses.",
    hours: "24 Hours (Shuttles operate every 30 mins during peak hours)",
    landmark: "TechZone II Main Boulevard Entrance",
    floors: [
      { floor: "Entrance Plaza", details: "Shuttle bus stops for Botanical Garden Metro & Pari Chowk" },
      { floor: "Security Station", details: "Visitor Passes, Student Biometrics, Lost & Found drop box" }
    ]
  },
  {
    id: "hangar",
    name: "German Hangar Multi-Purpose Pavilion",
    category: "center",
    icon: "🎪",
    tagline: "Large-scale indoor pavilion for university convocations, major hackathons, and cultural fests.",
    description: "The German Hangar is Bennett University's iconic climate-controlled mega-structure situated in the central plaza. It hosts the annual university convocation ceremony, HackBennett, national symposiums, model UN conferences, and celebrity musical concerts.",
    hours: "Open during scheduled university events, ceremonies & fests",
    landmark: "Central Courtyard between Block N and Block P",
    floors: [
      { floor: "Main Arena", details: "3,000+ capacity auditorium seating, main proscenium stage, broadcast audiovisual control desk" },
      { floor: "Green Rooms", details: "Backstage guest suites, VIP holding lounge, performer green rooms" }
    ]
  },
  {
    id: "blockM",
    name: "Block M - Faculty Chambers & Academic Offices",
    category: "academic",
    icon: "🏢",
    tagline: "Dedicated faculty block with consultation suites, research cubicles, and meeting pods.",
    description: "Block M houses faculty offices, department heads, PhD research scholars, and academic advisory rooms. Students visit Block M for one-on-one mentor consultations, research guidance, and project evaluations.",
    hours: "08:30 AM - 06:00 PM (Mon-Fri)",
    landmark: "North of Central Quad, adjacent to Block N",
    floors: [
      { floor: "Ground Floor", details: "Faculty Lounge, Departmental Administrator Desks, Visitor Waiting Room" },
      { floor: "1st & 2nd Floors", details: "SCSET Computer Science & Engineering Faculty Cabins" },
      { floor: "3rd Floor", details: "School of Management & Times School of Media Faculty Chambers" },
      { floor: "4th Floor", details: "School of Law Faculty Cabins, Dean Conference Suite" }
    ]
  },
  {
    id: "blockN",
    name: "Block N - Academic Complex & Lecture Theatres",
    category: "academic",
    icon: "🎓",
    tagline: "Tiered lecture theatres, state-of-the-art smart classrooms, and tutorial rooms.",
    description: "A primary academic wing featuring tiered amphitheatre-style lecture halls equipped with acoustic paneling, smart digital podiums, dual-projector systems, and interactive lecture capture cameras.",
    hours: "08:00 AM - 08:00 PM",
    landmark: "North Academic Wing overlooking the German Hangar",
    floors: [
      { floor: "Ground Floor", details: "Lecture Theatres LT-101 to LT-106 (Capacity: 120 students each)" },
      { floor: "1st Floor", details: "Lecture Theatres LT-201 to LT-206, Tutorial Breakout Classrooms" },
      { floor: "2nd Floor", details: "Smart Hybrid Classrooms with interactive digital displays" },
      { floor: "3rd & 4th Floors", details: "Examination Halls, Department Seminar Halls" }
    ]
  },
  {
    id: "blockQ",
    name: "Block Q - Applied Research & Faculty Block",
    category: "academic",
    icon: "🔬",
    tagline: "Specialized biotechnology, physics, chemistry, and interdisciplinary research labs.",
    description: "Block Q is dedicated to hands-on sciences and faculty research. Houses advanced biotechnology culture labs, bioinformatics workstations, nanomaterials characterization setups, and academic faculty suites.",
    hours: "08:30 AM - 07:30 PM",
    landmark: "Adjacent to Central Plaza and Block L",
    floors: [
      { floor: "Ground Floor", details: "General Chemistry & Physics Teaching Labs, Instrument Room" },
      { floor: "1st Floor", details: "Biotechnology & Microbiology Cell Culture Lab, Cold Storage" },
      { floor: "2nd Floor", details: "Bioinformatics Computational Cluster, Molecular Biology Lab" },
      { floor: "3rd Floor", details: "Faculty Research Cabins, Department Meeting Room" }
    ]
  },
  {
    id: "blockL",
    name: "Block L - Executive Faculty & Research Centre",
    category: "academic",
    icon: "🏛️",
    tagline: "Faculty chambers, visiting professor suites, and doctoral research workspace.",
    description: "Block L provides workspace for senior professors, visiting international scholars, and funded research projects. Includes collaborative discussion spaces and video-conferencing suites.",
    hours: "08:30 AM - 06:00 PM (Mon-Fri)",
    landmark: "South Academic Corridor, near Block A",
    floors: [
      { floor: "Ground Floor", details: "Reception, Visiting Faculty Lounge, Conference Room" },
      { floor: "1st to 3rd Floors", details: "Professor Cabins, Research Project Offices, Seminar Rooms" }
    ]
  },
  {
    id: "cafeBlockE",
    name: "Cafe Block E & Gobble Cafeteria",
    category: "living",
    icon: "🍔",
    tagline: "Food street hub featuring Gobble, multi-cuisine outlets, and student hangout lounges.",
    description: "The primary food court and casual dining complex on campus. Features Gobble cafeteria, South Indian tiffin counters, Chinese and Italian kiosks, healthy juice bars, and lively indoor and outdoor seating.",
    hours: "08:00 AM - 11:30 PM daily",
    landmark: "West Campus Plaza, between Boys & Girls Hostels",
    floors: [
      { floor: "Ground Floor", details: "Gobble Food Court, Multi-Brand Food Street Counters, Coffee Lounge" },
      { floor: "Mezzanine & Terrace", details: "Open-Air Shaded Deck Seating, Event Jamming Corner" }
    ]
  },
  {
    id: "girlsHostels",
    name: "Girls Hostel Towers (Blocks D1 - D6)",
    category: "living",
    icon: "🌸",
    tagline: "Secure, fully air-conditioned residence towers with biometric access and dedicated gym.",
    description: "Dedicated residential sector for female students featuring blocks D1 through D6. Offers air-conditioned rooms, 24/7 security with biometric turnstiles, private courtyard gardens, dedicated indoor girls' gym, study rooms, and common lounges.",
    hours: "24/7 Access (Hostel Entry In-Time: 10:30 PM)",
    landmark: "North-West Residential Sector",
    floors: [
      { floor: "Blocks D1 - D6", details: "AC Double and Triple Occupancy Rooms, Study Lounges, TV Rooms" },
      { floor: "Recreation Hub", details: "Exclusive Girls Gymnasium, Table Tennis, Indoor Badminton Court" },
      { floor: "Facility Desk", details: "Warden Office, 24/7 Lady Security Guard Desk, First Aid Room" }
    ]
  },
  {
    id: "boysHostels",
    name: "Boys Hostel Towers (Blocks C1 - C12)",
    category: "living",
    icon: "🏢",
    tagline: "Spacious residence blocks with high-speed Wi-Fi, recreation rooms, and laundry hubs.",
    description: "Large-scale student residential towers comprising blocks C1 through C12. Fully air-conditioned living spaces with high-speed campus fiber Wi-Fi, common entertainment rooms, laundry services, and outdoor courtyards.",
    hours: "24/7 Access (Hostel Entry In-Time: 10:30 PM)",
    landmark: "West Residential Sector, bordering Approach Road",
    floors: [
      { floor: "Blocks C1 - C6", details: "Junior & Sophomore Residential Wings with Central Courtyard" },
      { floor: "Blocks C7 - C12", details: "Senior & Postgraduate Residential Wings" },
      { floor: "Service Area", details: "Central Campus Laundromat, Tuck Shop (BU Basiks), Barber Shop" }
    ]
  },
  {
    id: "outdoorSports",
    name: "Outdoor Sports Arena & Courts Complex",
    category: "sports",
    icon: "🎾",
    tagline: "Floodlit Tennis, Basketball, Badminton, Volleyball, Padel Ball, and Pickleball courts.",
    description: "Comprehensive outdoor athletic courts complex located in the north-west zone. Includes synthetic tennis courts, multiple basketball courts, floodlit volleyball court, specialized padel ball and pickleball courts, and open-air gymnasium.",
    hours: "06:00 AM - 10:00 PM (Floodlit evening sessions)",
    landmark: "North-West Sports Quad, next to Gate 3",
    floors: [
      { floor: "Court Zone 1", details: "2 Synthetic Tennis Courts, 2 Pickleball Courts, 1 Padel Ball Court" },
      { floor: "Court Zone 2", details: "2 Full-Sized Basketball Courts, 2 Outdoor Badminton Courts" },
      { floor: "Court Zone 3", details: "Volleyball Court, Open-Air Crossfit Gymnasium" }
    ]
  },
  {
    id: "gate3",
    name: "Gate 3 - West Entrance & Sports Complex Access",
    category: "medical",
    icon: "🚪",
    tagline: "West campus gateway providing direct access to sports courts and service areas.",
    description: "Secondary security gateway providing convenient access to the outdoor tennis and basketball courts, laundry hub, and hostel parking zones.",
    hours: "06:00 AM - 10:00 PM daily",
    landmark: "West Perimeter along Sports Complex",
    floors: [
      { floor: "Gate 3 Plaza", details: "Security Checkpoint, Student Pedestrian Turnstile, Two-Wheeler Parking" }
    ]
  }
];

// Controller State
let currentCategoryFilter = "all";
let currentSearchTerm = "";

// Initialize Page
document.addEventListener('DOMContentLoaded', () => {
  renderDirectoryCards();
  initMapFilters();
  initMapSearch();
  updateSyncTimeDisplay();

  // Listen to live sync events from app.js
  window.addEventListener('campusdata:synced', () => {
    updateSyncTimeDisplay();
  });
});

// Update the last sync time display
function updateSyncTimeDisplay() {
  const syncTimeEl = document.getElementById('lastSyncTime');
  if (syncTimeEl) {
    const now = new Date();
    syncTimeEl.textContent = `Synced: ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }
}

// Render Directory Cards
function renderDirectoryCards() {
  const container = document.getElementById('directoryCardsGrid');
  if (!container) return;

  const filtered = BENNETT_CAMPUS_LOCATIONS.filter(loc => {
    const matchesCategory = currentCategoryFilter === "all" || loc.category === currentCategoryFilter;
    const matchesSearch = currentSearchTerm === "" || 
      loc.name.toLowerCase().includes(currentSearchTerm) ||
      loc.description.toLowerCase().includes(currentSearchTerm) ||
      loc.landmark.toLowerCase().includes(currentSearchTerm) ||
      loc.floors.some(f => f.details.toLowerCase().includes(currentSearchTerm));
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; background: var(--bg-card); border-radius: var(--radius-lg); border: 1px dashed var(--border-color);">
        <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🔍</div>
        <h4 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.35rem;">No campus locations match "${currentSearchTerm}"</h4>
        <p style="font-size: 0.88rem; color: var(--text-secondary);">Try searching for "Block P", "LRC", "Turf", "Gym", "Mess", or "Pool".</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(loc => {
    const floorsPreview = loc.floors.slice(0, 2).map(f => `
      <div class="dir-floor-item">
        <span class="dir-floor-label">${f.floor}:</span>
        <span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${f.details}</span>
      </div>
    `).join('');

    return `
      <div class="dir-card" data-location-id="${loc.id}">
        <div>
          <div class="dir-top">
            <div class="dir-icon">${loc.icon}</div>
            <span class="badge ${getCategoryBadgeClass(loc.category)}">${loc.category.toUpperCase()}</span>
          </div>
          <h4 class="dir-title">${loc.name}</h4>
          <p class="dir-tagline">${loc.tagline}</p>
          
          <div class="dir-floors-list">
            ${floorsPreview}
            ${loc.floors.length > 2 ? `<div style="font-size:0.75rem; color:var(--primary); font-weight:600; margin-top:0.3rem;">+ ${loc.floors.length - 2} more levels...</div>` : ''}
          </div>
        </div>

        <div class="dir-meta-row">
          <span>📍 ${loc.landmark}</span>
          <button class="btn-view-details" onclick="openLocationModal('${loc.id}')">
            <span>View Details</span>
            <svg class="icon-svg" viewBox="0 0 24 24" style="width:14px;height:14px;"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// Map Category Filter Class
function getCategoryBadgeClass(cat) {
  switch (cat) {
    case 'academic': return 'badge-primary';
    case 'sports': return 'badge-success';
    case 'living': return 'badge-warning';
    case 'center': return 'badge-danger';
    case 'medical': return 'badge-secondary';
    default: return 'badge-primary';
  }
}

// Category Filters Click Handling
function initMapFilters() {
  const filterButtons = document.querySelectorAll('#mapCategoryFilters .map-pill');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategoryFilter = btn.getAttribute('data-category');
      renderDirectoryCards();
    });
  });
}

// Search Handling
function initMapSearch() {
  const searchInput = document.getElementById('mapSearchInput');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    currentSearchTerm = e.target.value.trim().toLowerCase();
    renderDirectoryCards();
  });
}

// Select Zone from Architectural Blueprint
function selectZone(locationId) {
  openLocationModal(locationId);
}

// Open Location Detail Modal
function openLocationModal(locationId) {
  const loc = BENNETT_CAMPUS_LOCATIONS.find(l => l.id === locationId);
  if (!loc) return;

  const modalCategory = document.getElementById('modalLocCategory');
  const modalTitle = document.getElementById('modalLocTitle');
  const modalDesc = document.getElementById('modalLocDescription');
  const modalFloors = document.getElementById('modalLocFloors');
  const modalHours = document.getElementById('modalLocHours');
  const modalLandmark = document.getElementById('modalLocLandmark');
  const modalMapLink = document.getElementById('modalLocMapLink');

  if (modalCategory) {
    modalCategory.textContent = loc.category.toUpperCase();
    modalCategory.className = `badge ${getCategoryBadgeClass(loc.category)}`;
  }
  if (modalTitle) modalTitle.textContent = loc.name;
  if (modalDesc) modalDesc.textContent = loc.description;
  if (modalHours) modalHours.textContent = loc.hours;
  if (modalLandmark) modalLandmark.textContent = loc.landmark;

  if (modalFloors) {
    modalFloors.innerHTML = loc.floors.map(f => `
      <div style="display:flex; margin-bottom:0.5rem; gap:0.6rem; line-height:1.4;">
        <span style="font-weight:700; color:var(--text-primary); min-width:85px;">${f.floor}:</span>
        <span style="color:var(--text-secondary);">${f.details}</span>
      </div>
    `).join('');
  }

  if (modalMapLink) {
    modalMapLink.href = `https://maps.google.com/?q=Bennett+University+${encodeURIComponent(loc.name)}`;
  }

  if (typeof window.openModal === 'function') {
    window.openModal('locationDetailModal');
  } else {
    document.getElementById('locationDetailModal').classList.add('active');
  }
}

// Expose globals
window.selectZone = selectZone;
window.openLocationModal = openLocationModal;
