/**
 * CampusConnect - Clubs Page Controller
 * Displays verified Bennett University student clubs and handles membership toggling.
 */

let allClubs = [];
let currentCategory = 'all';

document.addEventListener('DOMContentLoaded', async () => {
  allClubs = await CampusData.getClubs();
  renderClubs();
  initClubFilters();
  initClubSearch();
});

function renderClubs(clubsToRender = null) {
  const container = document.getElementById('clubsGrid');
  if (!container) return;

  const clubs = clubsToRender || allClubs;

  if (clubs.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <div class="empty-state-icon">🏛️</div>
        <div class="empty-state-title">No clubs found</div>
        <p>Try searching for a different keyword or selecting another category.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = clubs.map(cl => `
    <div class="card club-card" id="club-${cl.id}">
      <div class="club-avatar">
        <img src="${cl.logo}" alt="${cl.name}" loading="lazy">
      </div>
      <h3 class="club-name">${cl.name}</h3>
      <span class="badge badge-primary" style="margin-bottom:0.75rem;">${cl.category}</span>
      <p class="club-desc">${cl.description}</p>
      
      <div class="club-meta-strip" style="width:100%;margin-top:auto;padding-top:1rem;border-top:1px solid var(--border-light);display:flex;justify-content:space-between;align-items:center;">
        <div style="text-align:left;">
          <div style="font-size:0.85rem;font-weight:700;">${cl.members} Members</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">Lead: ${cl.lead}</div>
        </div>
        <div style="display:flex;gap:0.5rem;">
          <button class="btn btn-outline btn-sm" onclick="openClubModal('${cl.id}')">About Club</button>
          <button class="btn btn-sm ${cl.isJoined ? 'btn-secondary' : 'btn-primary'}" onclick="toggleClubJoin('${cl.id}', this)">
            ${cl.isJoined ? 'Joined ✓' : 'Join Club'}
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function initClubFilters() {
  const pills = document.querySelectorAll('.filter-pill[data-category]');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentCategory = pill.getAttribute('data-category');
      applyClubFilters();
    });
  });
}

function initClubSearch() {
  const searchInput = document.getElementById('clubSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', applyClubFilters);
  }
}

function applyClubFilters() {
  const searchInput = document.getElementById('clubSearchInput');
  const query = searchInput ? searchInput.value.trim().toLowerCase() : '';

  let filtered = allClubs;

  if (currentCategory !== 'all') {
    const cat = currentCategory.toLowerCase();
    filtered = filtered.filter(cl => {
      const cCat = cl.category.toLowerCase();
      if (cat === 'coding') return cCat === 'coding' || cCat === 'robotics';
      if (cat === 'cultural') return cCat === 'cultural' || cCat === 'lifestyle';
      if (cat === 'media') return cCat === 'media' || cCat === 'art';
      if (cat === 'gaming') return cCat === 'gaming' || cCat === 'adventure' || cCat === 'science';
      return cCat === cat;
    });
  }

  if (query) {
    filtered = filtered.filter(cl => 
      cl.name.toLowerCase().includes(query) ||
      cl.lead.toLowerCase().includes(query) ||
      cl.description.toLowerCase().includes(query)
    );
  }

  renderClubs(filtered);
}

// Toggle Join / Leave
window.toggleClubJoin = function(clubId, btn) {
  const data = CampusData.getAll();
  const cl = data.clubs.find(c => c.id === clubId);
  if (!cl) return;

  cl.isJoined = !cl.isJoined;
  if (cl.isJoined) {
    cl.members += 1;
    data.currentUser.stats.clubsJoined += 1;
    btn.className = "btn btn-sm btn-secondary";
    btn.textContent = "Joined ✓";
    showToast(`Welcome to ${cl.name}! 🎉`, 'success');
  } else {
    cl.members = Math.max(0, cl.members - 1);
    data.currentUser.stats.clubsJoined = Math.max(0, data.currentUser.stats.clubsJoined - 1);
    btn.className = "btn btn-sm btn-primary";
    btn.textContent = "Join Club";
    showToast(`You have left ${cl.name}`, 'info');
  }

  CampusData.save(data);
  const inMem = allClubs.find(c => c.id === clubId);
  if (inMem) {
    inMem.isJoined = cl.isJoined;
    inMem.members = cl.members;
  }
  renderClubs();
};

// Club Details Modal
window.openClubModal = function(clubId) {
  const cl = allClubs.find(c => c.id === clubId);
  if (!cl) return;

  const modalOverlay = document.getElementById('clubModal');
  const modalBody = document.getElementById('clubModalBody');
  const joinModalBtn = document.getElementById('clubModalJoinBtn');

  if (!modalOverlay || !modalBody) return;

  modalBody.innerHTML = `
    <div style="display:flex;align-items:center;gap:1.25rem;margin-bottom:1.25rem;">
      <div class="club-avatar" style="width:64px;height:64px;margin:0;">
        <img src="${cl.logo}" alt="${cl.name}">
      </div>
      <div>
        <h2 style="font-size:1.35rem;margin-bottom:0.25rem;color:var(--text-primary);">${cl.name}</h2>
        <span class="badge badge-primary">${cl.category}</span>
      </div>
    </div>
    
    <p style="font-size:0.95rem;line-height:1.6;color:var(--text-secondary);margin-bottom:1.25rem;">
      ${cl.description}
    </p>

    <div style="background:var(--bg-hover);padding:1.15rem;border-radius:var(--radius-md);display:grid;grid-template-columns:1fr 1fr;gap:0.85rem;font-size:0.88rem;margin-bottom:1rem;">
      <div><strong>Student Coordinator / Lead:</strong><br>${cl.lead}</div>
      <div><strong>Active Members:</strong><br>${cl.members} Students</div>
      <div><strong>Department Affiliation:</strong><br>Student Affairs & Deans Council</div>
      <div><strong>Campus Meeting Ground:</strong><br>Auditorium, LRC & Amphitheatre</div>
    </div>

    <div style="border-left:3px solid var(--primary);padding:0.75rem 1rem;background:var(--primary-light);border-radius:var(--radius-sm);font-size:0.85rem;color:var(--text-primary);">
      💡 <strong>How to participate:</strong> Joining this club adds you to official event notifications, internal workshop channels, and project teams.
    </div>
  `;

  if (joinModalBtn) {
    joinModalBtn.textContent = cl.isJoined ? "Leave Club" : "Join Club";
    joinModalBtn.className = cl.isJoined ? "btn btn-secondary" : "btn btn-primary";
    joinModalBtn.onclick = () => {
      toggleClubJoin(cl.id, joinModalBtn);
      closeModal('clubModal');
    };
  }

  modalOverlay.classList.add('active');
};

window.closeModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
};
