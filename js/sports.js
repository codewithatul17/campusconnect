/**
 * CampusConnect - Sports & Athletics Page Controller
 * Handles varsity team trials, tournaments, campus facilities, and Bennett house standings.
 */

let sportsData = null;
let currentSportsTab = 'all';

document.addEventListener('DOMContentLoaded', async () => {
  sportsData = await CampusData.getSports();
  renderAllSportsSections();
  initSportsTabs();
  initSportsSearch();
  initTrialForm();
});

function renderAllSportsSections() {
  if (!sportsData) return;
  renderTrials(sportsData.trials);
  renderCompetitions(sportsData.competitions);
  renderFacilities(sportsData.facilities);
  renderHouses(sportsData.houses);
}

function renderTrials(trials) {
  const container = document.getElementById('trialsGrid');
  if (!container) return;

  if (!trials || trials.length === 0) {
    container.innerHTML = `<p style="grid-column:1/-1;color:var(--text-muted);">No trials matching your filter.</p>`;
    return;
  }

  container.innerHTML = trials.map(tr => `
    <div class="card" style="padding:1.4rem;display:flex;flex-direction:column;border-left:4px solid var(--warning);position:relative;">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:0.75rem;">
        <span class="badge badge-warning" style="font-weight:700;">${tr.sport}</span>
        <span style="font-size:0.78rem;font-weight:700;color:${tr.isRegistered ? 'var(--success)' : 'var(--text-muted)'};">
          ${tr.isRegistered ? 'Registered ✓' : tr.status}
        </span>
      </div>

      <h3 style="font-size:1.1rem;font-weight:800;color:var(--text-primary);margin-bottom:0.6rem;">${tr.title}</h3>

      <div style="display:flex;flex-direction:column;gap:0.4rem;font-size:0.85rem;color:var(--text-secondary);margin-bottom:1.15rem;">
        <div style="display:flex;align-items:center;gap:0.5rem;">
          <span>📅</span> <strong>Date:</strong> <span>${tr.date}</span>
        </div>
        <div style="display:flex;align-items:center;gap:0.5rem;">
          <span>⏰</span> <strong>Time:</strong> <span>${tr.time}</span>
        </div>
        <div style="display:flex;align-items:center;gap:0.5rem;">
          <span>📍</span> <strong>Venue:</strong> <span>${tr.venue}</span>
        </div>
        <div style="display:flex;align-items:center;gap:0.5rem;">
          <span>👤</span> <strong>Coach:</strong> <span>${tr.coach}</span>
        </div>
        <div style="display:flex;align-items:flex-start;gap:0.5rem;">
          <span>👟</span> <div><strong>Kit:</strong> ${tr.kitRequired}</div>
        </div>
      </div>

      <div style="margin-top:auto;padding-top:0.85rem;border-top:1px solid var(--border-light);display:flex;justify-content:space-between;align-items:center;">
        <span style="font-size:0.78rem;color:var(--text-muted);">Official BU Varsity Squad</span>
        <button class="btn btn-sm ${tr.isRegistered ? 'btn-secondary' : 'btn-primary'}" 
                onclick="handleTrialBtnClick('${tr.id}', ${tr.isRegistered})">
          ${tr.isRegistered ? 'Registered ✓' : 'Register for Trials 🎯'}
        </button>
      </div>
    </div>
  `).join('');
}

function renderCompetitions(competitions) {
  const container = document.getElementById('competitionsGrid');
  if (!container) return;

  if (!competitions || competitions.length === 0) {
    container.innerHTML = `<p style="grid-column:1/-1;color:var(--text-muted);">No competitions found.</p>`;
    return;
  }

  container.innerHTML = competitions.map(comp => `
    <div class="card" style="padding:1.4rem;display:flex;flex-direction:column;border-left:4px solid var(--primary);">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
        <span class="badge badge-primary">${comp.badge}</span>
        <span class="badge badge-neutral" style="font-size:0.75rem;">${comp.sport}</span>
      </div>

      <h3 style="font-size:1.15rem;font-weight:800;color:var(--text-primary);margin-bottom:0.5rem;">${comp.title}</h3>
      <p style="font-size:0.88rem;color:var(--text-secondary);line-height:1.55;margin-bottom:1rem;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;">
        ${comp.description}
      </p>

      <div style="background:var(--bg-hover);padding:0.85rem 1rem;border-radius:var(--radius-md);display:grid;grid-template-columns:1fr 1fr;gap:0.5rem;font-size:0.82rem;margin-bottom:1.15rem;">
        <div><strong>Dates:</strong><br>${comp.date}</div>
        <div><strong>Venue:</strong><br>${comp.venue}</div>
        <div><strong>Participation:</strong><br>${comp.teamsCount}</div>
        <div><strong>Prize Pool:</strong><br><span style="color:var(--primary);font-weight:700;">${comp.prizePool}</span></div>
      </div>

      <div style="margin-top:auto;display:flex;justify-content:space-between;align-items:center;">
        <span class="badge badge-success" style="font-size:0.75rem;">${comp.status}</span>
        <button class="btn btn-outline btn-sm" onclick="showToast('Fixtures and live match updates available on BU Sports desk!', 'info')">View Fixtures</button>
      </div>
    </div>
  `).join('');
}

function renderFacilities(facilities) {
  const container = document.getElementById('facilitiesGrid');
  if (!container) return;

  if (!facilities || facilities.length === 0) {
    container.innerHTML = `<p style="grid-column:1/-1;color:var(--text-muted);">No facilities found.</p>`;
    return;
  }

  container.innerHTML = facilities.map(fac => `
    <div class="card" style="display:flex;flex-direction:column;overflow:hidden;">
      <div style="height:170px;overflow:hidden;position:relative;">
        <img src="${fac.image}" alt="${fac.name}" style="width:100%;height:100%;object-fit:cover;">
        <span class="badge badge-primary" style="position:absolute;top:10px;left:10px;background:rgba(15,23,42,0.85);color:#FFF;">
          📍 ${fac.location}
        </span>
      </div>
      <div style="padding:1.25rem;flex:1;display:flex;flex-direction:column;">
        <h3 style="font-size:1.1rem;font-weight:700;color:var(--text-primary);margin-bottom:0.4rem;">${fac.name}</h3>
        <p style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:0.75rem;line-height:1.5;">${fac.description}</p>
        
        <div style="font-size:0.82rem;color:var(--text-muted);margin-bottom:0.5rem;">
          ⏰ <strong>Operating Hours:</strong> ${fac.timing}
        </div>
        <div style="font-size:0.82rem;color:var(--text-secondary);background:var(--bg-hover);padding:0.5rem 0.75rem;border-radius:var(--radius-sm);margin-top:auto;">
          🏸 <strong>Gear Issued:</strong> ${fac.equipmentAvailable}
        </div>
      </div>
    </div>
  `).join('');
}

function renderHouses(houses) {
  const container = document.getElementById('housesGrid');
  if (!container) return;

  container.innerHTML = houses.map(h => `
    <div class="card" style="padding:1.5rem;text-align:center;display:flex;flex-direction:column;align-items:center;border-top:4px solid ${h.color};">
      <div style="font-size:2.8rem;margin-bottom:0.5rem;">${h.emblem}</div>
      <h3 style="font-size:1.3rem;font-weight:800;color:var(--text-primary);">${h.name}</h3>
      <p style="font-size:0.8rem;font-style:italic;color:var(--text-muted);margin-bottom:1rem;">"${h.moto}"</p>
      
      <div style="background:var(--bg-hover);width:100%;padding:0.75rem;border-radius:var(--radius-md);margin-bottom:0.75rem;">
        <div style="font-size:1.5rem;font-weight:800;color:${h.color};">${h.points} pts</div>
        <div style="font-size:0.75rem;color:var(--text-muted);text-transform:uppercase;font-weight:700;">Rank #${h.rank} on Leaderboard</div>
      </div>
      <span class="badge" style="background:${h.color}15;color:${h.color};font-weight:700;font-size:0.78rem;">
        Annual Trophy Contender
      </span>
    </div>
  `).join('');
}

function initSportsTabs() {
  const pills = document.querySelectorAll('#sportsTabPills .filter-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const tab = pill.getAttribute('data-tab');
      currentSportsTab = tab;

      const secTrials = document.getElementById('trialsSection');
      const secComp = document.getElementById('competitionsSection');
      const secFac = document.getElementById('facilitiesSection');
      const secHouses = document.getElementById('housesSection');

      if (tab === 'all') {
        if (secTrials) secTrials.style.display = 'block';
        if (secComp) secComp.style.display = 'block';
        if (secFac) secFac.style.display = 'block';
        if (secHouses) secHouses.style.display = 'block';
      } else {
        if (secTrials) secTrials.style.display = tab === 'trials' ? 'block' : 'none';
        if (secComp) secComp.style.display = tab === 'competitions' ? 'block' : 'none';
        if (secFac) secFac.style.display = tab === 'facilities' ? 'block' : 'none';
        if (secHouses) secHouses.style.display = tab === 'houses' ? 'block' : 'none';
      }
    });
  });
}

function initSportsSearch() {
  const searchInput = document.getElementById('sportsSearchInput');
  if (!searchInput) return;

  searchInput.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();
    if (!sportsData) return;

    if (!q) {
      renderAllSportsSections();
      return;
    }

    const filteredTrials = sportsData.trials.filter(t => 
      t.sport.toLowerCase().includes(q) ||
      t.title.toLowerCase().includes(q) ||
      t.venue.toLowerCase().includes(q) ||
      t.coach.toLowerCase().includes(q)
    );

    const filteredComp = sportsData.competitions.filter(c => 
      c.title.toLowerCase().includes(q) ||
      c.sport.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q)
    );

    const filteredFac = sportsData.facilities.filter(f => 
      f.name.toLowerCase().includes(q) ||
      f.description.toLowerCase().includes(q) ||
      f.location.toLowerCase().includes(q)
    );

    renderTrials(filteredTrials);
    renderCompetitions(filteredComp);
    renderFacilities(filteredFac);
  });
}

window.scrollToSection = function(sectionId) {
  const sec = document.getElementById(sectionId);
  if (sec) {
    sec.style.display = 'block';
    sec.scrollIntoView({ behavior: 'smooth' });
  }
};

window.handleTrialBtnClick = function(trialId, isAlreadyRegistered) {
  if (isAlreadyRegistered) {
    showToast('You are already registered for this varsity trial! Check your email for reporting details.', 'info');
    return;
  }
  openTrialModal(trialId);
};

window.openTrialModal = function(trialId) {
  if (!sportsData) return;
  const tr = sportsData.trials.find(t => t.id === trialId);
  if (!tr) return;

  const modal = document.getElementById('trialModal');
  const title = document.getElementById('trialModalTitle');
  const info = document.getElementById('trialModalInfo');
  const idInput = document.getElementById('trialModalId');

  if (title) title.textContent = `Register: ${tr.sport} Varsity Trials`;
  if (idInput) idInput.value = tr.id;
  if (info) {
    info.innerHTML = `
      <div><strong>Trial:</strong> ${tr.title}</div>
      <div><strong>Date & Time:</strong> ${tr.date} (${tr.time})</div>
      <div><strong>Location:</strong> ${tr.venue}</div>
      <div><strong>Coach In-Charge:</strong> ${tr.coach}</div>
    `;
  }

  if (modal) modal.classList.add('active');
};

function initTrialForm() {
  const form = document.getElementById('trialRegisterForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const trialId = document.getElementById('trialModalId').value;
    const name = document.getElementById('trialName').value.trim();
    const roll = document.getElementById('trialRoll').value.trim();
    const branch = document.getElementById('trialBranch').value.trim();
    const position = document.getElementById('trialPosition').value.trim();
    const experience = document.getElementById('trialExperience').value.trim();

    const success = CampusData.registerForTrial(trialId, { name, roll, branch, position, experience });
    if (success) {
      // Update local memory
      const tr = sportsData.trials.find(t => t.id === trialId);
      if (tr) tr.isRegistered = true;
      renderTrials(sportsData.trials);
      closeModal('trialModal');
      showToast(`Registration confirmed for ${tr.sport} Trials! Good luck! 🎯`, 'success');
    }
  });
}

window.closeModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
};
