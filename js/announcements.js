/**
 * CampusConnect - Announcements Page Controller
 */

let allAnnouncements = [];
let currentCategory = 'all';

document.addEventListener('DOMContentLoaded', async () => {
  allAnnouncements = await CampusData.getAnnouncements();
  renderAnnouncements();
  initAnnouncementFilters();
  initAnnouncementSearch();
});

function renderAnnouncements(itemsToRender = null) {
  const container = document.getElementById('announcementsList');
  if (!container) return;

  const items = itemsToRender || allAnnouncements;

  if (items.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📢</div>
        <div class="empty-state-title">No announcements found</div>
        <p>No notices matching your filter criteria.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = items.map(an => `
    <div class="card announcement-card ${an.important ? 'important' : ''}" style="margin-bottom:1.25rem;">
      <div class="announcement-header">
        <div style="display:flex;align-items:center;gap:0.75rem;">
          <span class="badge ${an.important ? 'badge-danger' : 'badge-primary'}">${an.category}</span>
          ${an.important ? '<span class="badge badge-warning">⚡ High Priority</span>' : ''}
        </div>
        <span class="announcement-date">
          <svg class="icon-svg" style="width:14px;height:14px;margin-right:4px;" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          ${an.date}
        </span>
      </div>
      <h3 class="announcement-title" style="margin-top:0.35rem;font-size:1.15rem;">${an.title}</h3>
      <div style="font-size:0.8rem;color:var(--text-muted);margin:0.25rem 0 0.65rem;">
        Issued by: <strong>${an.department || 'Office of Dean Academics'}</strong>
      </div>
      <p style="font-size:0.92rem;color:var(--text-secondary);margin-bottom:1rem;line-height:1.6;">
        ${an.description}
      </p>
      <button class="btn btn-outline btn-sm" onclick="openAnnouncementModal('${an.id}')">
        Read Notice & Details &rarr;
      </button>
    </div>
  `).join('');
}

function initAnnouncementFilters() {
  const pills = document.querySelectorAll('.filter-pill[data-category]');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentCategory = pill.getAttribute('data-category');
      applyAnnouncementFilters();
    });
  });
}

function initAnnouncementSearch() {
  const searchInput = document.getElementById('announcementSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', applyAnnouncementFilters);
  }
}

function applyAnnouncementFilters() {
  const searchInput = document.getElementById('announcementSearchInput');
  const query = searchInput ? searchInput.value.trim().toLowerCase() : '';

  let filtered = allAnnouncements;

  if (currentCategory !== 'all') {
    filtered = filtered.filter(an => an.category.toLowerCase() === currentCategory.toLowerCase());
  }

  if (query) {
    filtered = filtered.filter(an => 
      an.title.toLowerCase().includes(query) ||
      an.description.toLowerCase().includes(query) ||
      (an.department && an.department.toLowerCase().includes(query))
    );
  }

  renderAnnouncements(filtered);
}

// Modal View
window.openAnnouncementModal = function(id) {
  const an = allAnnouncements.find(a => a.id === id);
  if (!an) return;

  const modal = document.getElementById('announcementModal');
  const body = document.getElementById('announcementModalBody');
  if (!modal || !body) return;

  body.innerHTML = `
    <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1rem;">
      <span class="badge ${an.important ? 'badge-danger' : 'badge-primary'}">${an.category}</span>
      <span style="font-size:0.85rem;color:var(--text-muted);">${an.date}</span>
    </div>
    <h2 style="font-size:1.35rem;margin-bottom:0.75rem;line-height:1.3;">${an.title}</h2>
    <div style="background:var(--bg-hover);padding:0.75rem 1rem;border-radius:var(--radius-md);font-size:0.85rem;margin-bottom:1.25rem;">
      <strong>Issuing Authority:</strong> ${an.department || 'University Administration'}
    </div>
    <div style="font-size:0.95rem;line-height:1.7;color:var(--text-secondary);white-space:pre-line;">
      ${an.description}
      
      <strong>Key Instructions for Students:</strong>
      1. Keep student ID card ready for physical inspection.
      2. Contact the department administration desk in Block A for any queries.
      3. Bookmark this notice for future reference during the semester.
    </div>
  `;

  modal.classList.add('active');
};
