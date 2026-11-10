/**
 * CampusConnect - Events & Academic Calendar Controller
 * Handles date-wise sorting, Bennett exam timeline, university holidays, and event registrations.
 */

let allEvents = [];
let currentCategory = 'all';

document.addEventListener('DOMContentLoaded', async () => {
  allEvents = await CampusData.getEvents();
  renderEvents();
  initEventFilters();
  initEventSearch();
});

function getCategoryBadge(category) {
  switch (category) {
    case 'Exam':
      return `<span class="badge badge-danger event-category-tag" style="background:#EF4444;color:#FFF;font-weight:700;">🎓 Examination</span>`;
    case 'Holiday':
      return `<span class="badge badge-success event-category-tag" style="background:#10B981;color:#FFF;font-weight:700;">🏖️ University Holiday</span>`;
    case 'Sports':
      return `<span class="badge badge-warning event-category-tag" style="background:#F59E0B;color:#FFF;font-weight:700;">🏆 Sports Fest</span>`;
    case 'Hackathon':
      return `<span class="badge badge-primary event-category-tag" style="background:#FF634A;color:#FFF;font-weight:700;">⚡ Hackathon</span>`;
    case 'Cultural':
      return `<span class="badge event-category-tag" style="background:#8B5CF6;color:#FFF;font-weight:700;">🎭 Cultural Fest</span>`;
    case 'Workshop':
      return `<span class="badge event-category-tag" style="background:#06B6D4;color:#FFF;font-weight:700;">💡 Workshop</span>`;
    default:
      return `<span class="badge badge-primary event-category-tag">${category}</span>`;
  }
}

function renderEvents(eventsToRender = null) {
  const container = document.getElementById('eventsGrid');
  if (!container) return;

  let events = eventsToRender || allEvents;
  // Always maintain strict chronological date order
  events.sort((a, b) => CampusData.parseEventDate(a.date) - CampusData.parseEventDate(b.date));

  if (events.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <div class="empty-state-icon">📅</div>
        <div class="empty-state-title">No events found</div>
        <p>Try adjusting your search query or selecting a different category filter.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = events.map(ev => {
    const isExam = ev.category === 'Exam';
    const isHoliday = ev.category === 'Holiday';

    let actionButtonText = ev.isRegistered ? 'Registered ✓' : 'Register Now';
    let actionBtnClass = ev.isRegistered ? 'btn-secondary' : 'btn-primary';

    if (isExam) {
      actionButtonText = ev.isRegistered ? 'Added to Timetable ✓' : 'Add to Prep Calendar';
      actionBtnClass = ev.isRegistered ? 'btn-secondary' : 'btn-primary';
    } else if (isHoliday) {
      actionButtonText = ev.isRegistered ? 'Holiday Noted ✓' : 'Mark on Calendar';
      actionBtnClass = ev.isRegistered ? 'btn-secondary' : 'btn-outline';
    }

    const cardBorderHighlight = isExam ? 'border-left: 4px solid var(--danger);' : 
                               (isHoliday ? 'border-left: 4px solid var(--success);' : 
                               (ev.category === 'Sports' ? 'border-left: 4px solid var(--warning);' : ''));

    return `
      <div class="card event-card" id="card-${ev.id}" style="${cardBorderHighlight}">
        <div class="event-image-wrapper">
          <img class="event-img" src="${ev.image}" alt="${ev.title}" loading="lazy">
          ${getCategoryBadge(ev.category)}
          <span class="event-date-chip">
            <svg class="icon-svg" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            ${ev.date}
          </span>
        </div>
        <div class="event-details">
          <h3 class="event-title">${ev.title}</h3>
          <p style="font-size:0.88rem;color:var(--text-secondary);margin-bottom:1rem;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">
            ${ev.description}
          </p>
          <div class="event-meta">
            <div class="event-meta-item">
              <svg class="icon-svg" style="color:var(--primary)" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              <span>${ev.time}</span>
            </div>
            <div class="event-meta-item">
              <svg class="icon-svg" style="color:var(--secondary)" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              <span>${ev.location}</span>
            </div>
            <div class="event-meta-item">
              <svg class="icon-svg" style="color:var(--text-muted)" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
              <span>Organizer: <strong>${ev.organizer}</strong></span>
            </div>
            ${!isHoliday ? `
            <div class="event-meta-item">
              <svg class="icon-svg" style="color:var(--warning)" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              <span>${ev.registeredCount} / ${ev.seats} ${isExam ? 'Students Scheduled' : 'Attending'}</span>
            </div>
            ` : `
            <div class="event-meta-item">
              <svg class="icon-svg" style="color:var(--success)" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              <span style="color:var(--success);font-weight:600;">Campus Non-Instructional Day</span>
            </div>
            `}
          </div>
          <div class="event-footer-action">
            <button class="btn btn-outline btn-sm" onclick="openEventDetails('${ev.id}')">View Details</button>
            <button class="btn btn-sm ${actionBtnClass}" onclick="toggleEventRegistration('${ev.id}', this)">
              ${actionButtonText}
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function initEventFilters() {
  const pills = document.querySelectorAll('.filter-pill[data-category]');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentCategory = pill.getAttribute('data-category');
      applyFilters();
    });
  });

  const locationFilter = document.getElementById('locationFilter');
  if (locationFilter) {
    locationFilter.addEventListener('change', applyFilters);
  }
}

function initEventSearch() {
  const searchInput = document.getElementById('eventSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }
}

function applyFilters() {
  const searchInput = document.getElementById('eventSearchInput');
  const locationFilter = document.getElementById('locationFilter');

  const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
  const locVal = locationFilter ? locationFilter.value : '';

  let filtered = [...allEvents];

  if (currentCategory !== 'all') {
    filtered = filtered.filter(ev => ev.category.toLowerCase() === currentCategory.toLowerCase());
  }

  if (query) {
    filtered = filtered.filter(ev => 
      ev.title.toLowerCase().includes(query) ||
      ev.organizer.toLowerCase().includes(query) ||
      ev.description.toLowerCase().includes(query) ||
      ev.location.toLowerCase().includes(query)
    );
  }

  if (locVal) {
    filtered = filtered.filter(ev => ev.location.toLowerCase().includes(locVal.toLowerCase()));
  }

  renderEvents(filtered);
}

// Toggle Registration
window.toggleEventRegistration = function(eventId, btn) {
  const data = CampusData.getAll();
  const ev = data.events.find(e => e.id === eventId);
  if (!ev) return;

  ev.isRegistered = !ev.isRegistered;
  const isExam = ev.category === 'Exam';
  const isHoliday = ev.category === 'Holiday';

  if (ev.isRegistered) {
    ev.registeredCount += 1;
    data.currentUser.stats.eventsJoined += 1;
    btn.className = "btn btn-sm btn-secondary";
    if (isExam) {
      btn.textContent = "Added to Timetable ✓";
      showToast(`Added ${ev.title} to your personal exam schedule! 🎓`, 'success');
    } else if (isHoliday) {
      btn.textContent = "Holiday Noted ✓";
      showToast(`Noted: ${ev.title} on your calendar 🏖️`, 'info');
    } else {
      btn.textContent = "Registered ✓";
      showToast(`You have registered for ${ev.title}! 🎟️`, 'success');
    }
  } else {
    ev.registeredCount = Math.max(0, ev.registeredCount - 1);
    data.currentUser.stats.eventsJoined = Math.max(0, data.currentUser.stats.eventsJoined - 1);
    btn.className = isHoliday ? "btn btn-sm btn-outline" : "btn btn-sm btn-primary";
    btn.textContent = isExam ? "Add to Prep Calendar" : (isHoliday ? "Mark on Calendar" : "Register Now");
    showToast(`Removed registration for ${ev.title}`, 'info');
  }

  CampusData.save(data);
  const inMem = allEvents.find(e => e.id === eventId);
  if (inMem) {
    inMem.isRegistered = ev.isRegistered;
    inMem.registeredCount = ev.registeredCount;
  }

  renderEvents();
};

// View Details Modal
window.openEventDetails = function(eventId) {
  const ev = allEvents.find(e => e.id === eventId);
  if (!ev) return;

  const modalOverlay = document.getElementById('eventDetailsModal');
  const modalBody = document.getElementById('eventModalBody');
  const registerModalBtn = document.getElementById('modalRegisterBtn');

  if (!modalOverlay || !modalBody) return;

  const isExam = ev.category === 'Exam';
  const isHoliday = ev.category === 'Holiday';

  modalBody.innerHTML = `
    <img src="${ev.image}" alt="${ev.title}" style="width:100%;height:220px;object-fit:cover;border-radius:var(--radius-md);margin-bottom:1.25rem;">
    <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:0.75rem;flex-wrap:wrap;">
      ${getCategoryBadge(ev.category)}
      <span style="font-size:0.85rem;color:var(--text-muted);font-weight:600;">Issued by ${ev.organizer}</span>
    </div>
    <h2 style="font-size:1.35rem;margin-bottom:0.75rem;color:var(--text-primary);">${ev.title}</h2>
    <p style="font-size:0.95rem;line-height:1.65;margin-bottom:1.25rem;color:var(--text-secondary);">${ev.description}</p>
    
    <div style="background:var(--bg-hover);padding:1.15rem;border-radius:var(--radius-md);display:grid;grid-template-columns:1fr 1fr;gap:0.85rem;font-size:0.9rem;">
      <div><strong>📅 Date / Window:</strong> ${ev.date}</div>
      <div><strong>⏰ Timings:</strong> ${ev.time}</div>
      <div><strong>📍 Campus Location:</strong> ${ev.location}</div>
      <div><strong>👥 Capacity:</strong> ${ev.registeredCount} / ${ev.seats}</div>
    </div>
  `;

  if (registerModalBtn) {
    let btnText = ev.isRegistered ? "Registered ✓" : "Register For Event";
    if (isExam) btnText = ev.isRegistered ? "Added to Exam Calendar ✓" : "Add to Exam Prep Calendar";
    if (isHoliday) btnText = ev.isRegistered ? "Holiday Noted ✓" : "Mark Holiday on Calendar";

    registerModalBtn.textContent = btnText;
    registerModalBtn.className = ev.isRegistered ? "btn btn-secondary" : "btn btn-primary";
    registerModalBtn.onclick = () => {
      toggleEventRegistration(ev.id, registerModalBtn);
      closeModal('eventDetailsModal');
    };
  }

  modalOverlay.classList.add('active');
};

window.closeModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
};
