/**
 * CampusConnect - Lost & Found Controller
 */

let allItems = [];
let currentTab = 'lost'; // 'lost' | 'found'

document.addEventListener('DOMContentLoaded', async () => {
  allItems = await CampusData.getLostFound();
  renderLostFoundItems();
  initTabs();
  initSearch();
  initReportForm();

  if (window.location.hash === '#report') {
    setTimeout(() => openReportModal('lost'), 100);
  }
});

function renderLostFoundItems(itemsToRender = null) {
  const container = document.getElementById('lostFoundGrid');
  if (!container) return;

  const items = (itemsToRender || allItems).filter(item => item.type === currentTab);

  if (items.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <div class="empty-state-icon">${currentTab === 'lost' ? '🔍' : '🎒'}</div>
        <div class="empty-state-title">No ${currentTab} items currently reported</div>
        <p>Everything seems accounted for! Click 'Report Item' above if you need help finding something.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = items.map(item => `
    <div class="card" style="display:flex;flex-direction:column;overflow:hidden;">
      <div style="height:190px;position:relative;background:#E2E8F0;overflow:hidden;">
        <img src="${item.image || 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=400&q=80'}" alt="${item.itemName}" style="width:100%;height:100%;object-fit:cover;">
        <span class="badge ${item.type === 'lost' ? 'badge-danger' : 'badge-success'}" style="position:absolute;top:12px;left:12px;">
          ${item.type.toUpperCase()}
        </span>
        <span class="badge ${item.status === 'resolved' ? 'badge-neutral' : 'badge-warning'}" style="position:absolute;top:12px;right:12px;">
          ${item.status === 'resolved' ? 'Resolved ✓' : 'Active'}
        </span>
      </div>

      <div style="padding:1.25rem;flex:1;display:flex;flex-direction:column;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.4rem;">
          <h3 style="font-size:1.15rem;font-weight:700;">${item.itemName}</h3>
          <span class="badge badge-neutral">${item.category}</span>
        </div>

        <p style="font-size:0.88rem;color:var(--text-secondary);margin-bottom:1rem;line-height:1.5;">
          ${item.description}
        </p>

        <div style="background:var(--bg-hover);padding:0.85rem;border-radius:var(--radius-md);font-size:0.82rem;display:flex;flex-direction:column;gap:0.35rem;margin-bottom:1.25rem;">
          <div style="display:flex;align-items:center;gap:0.5rem;">
            <svg class="icon-svg" style="color:var(--secondary);width:15px;height:15px;" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            <span><strong>Location:</strong> ${item.location}</span>
          </div>
          <div style="display:flex;align-items:center;gap:0.5rem;">
            <svg class="icon-svg" style="color:var(--primary);width:15px;height:15px;" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line></svg>
            <span><strong>Date:</strong> ${item.date}</span>
          </div>
          <div style="display:flex;align-items:center;gap:0.5rem;">
            <svg class="icon-svg" style="color:var(--text-muted);width:15px;height:15px;" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            <span><strong>Reported by:</strong> ${item.reportedBy}</span>
          </div>
        </div>

        <div style="display:flex;gap:0.5rem;margin-top:auto;">
          <button class="btn btn-outline btn-sm" style="flex:1;" onclick="openContactModal('${item.id}')">
            Contact
          </button>
          <button class="btn ${item.status === 'resolved' ? 'btn-secondary' : 'btn-success'} btn-sm" style="flex:1;" onclick="toggleResolved('${item.id}', this)">
            ${item.status === 'resolved' ? 'Reopen' : 'Mark Found'}
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function initTabs() {
  const tabs = document.querySelectorAll('.lost-found-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentTab = tab.getAttribute('data-tab');
      renderLostFoundItems();
    });
  });
}

function initSearch() {
  const searchInput = document.getElementById('lostFoundSearch');
  if (!searchInput) return;

  searchInput.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();
    const filtered = allItems.filter(item => 
      item.itemName.toLowerCase().includes(q) ||
      item.location.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q)
    );
    renderLostFoundItems(filtered);
  });
}

// Mark as Found / Resolved
window.toggleResolved = function(id, btn) {
  const data = CampusData.getAll();
  const item = data.lostFound.find(i => i.id === id);
  if (!item) return;

  item.status = item.status === 'resolved' ? 'active' : 'resolved';
  CampusData.save(data);

  const inMem = allItems.find(i => i.id === id);
  if (inMem) inMem.status = item.status;

  renderLostFoundItems();
  showToast(item.status === 'resolved' ? "Item marked as resolved! 🎉" : "Item status reopened", "success");
};

// Contact Owner Modal
window.openContactModal = function(id) {
  const item = allItems.find(i => i.id === id);
  if (!item) return;

  const modal = document.getElementById('contactModal');
  const body = document.getElementById('contactModalBody');
  if (!modal || !body) return;

  body.innerHTML = `
    <div style="text-align:center;margin-bottom:1.25rem;">
      <div class="empty-state-icon" style="font-size:2.5rem;margin-bottom:0.5rem;">📞</div>
      <h3 style="font-size:1.2rem;">Contact for "${item.itemName}"</h3>
      <p style="font-size:0.9rem;color:var(--text-secondary);">Connect with the student or department holding this item.</p>
    </div>

    <div style="background:var(--bg-hover);padding:1.25rem;border-radius:var(--radius-md);display:flex;flex-direction:column;gap:0.75rem;">
      <div><strong>Reported By:</strong> ${item.reportedBy}</div>
      <div><strong>Contact Email / Phone:</strong> <a href="mailto:${item.contact}" style="color:var(--primary);font-weight:600;">${item.contact || 'campus.security@edu.in'}</a></div>
      <div><strong>Location Identified:</strong> ${item.location}</div>
    </div>
  `;

  modal.classList.add('active');
};

// Report Modal Handling
function initReportForm() {
  const form = document.getElementById('reportItemForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const type = document.getElementById('reportType').value;
    const itemName = document.getElementById('reportItemName').value.trim();
    const category = document.getElementById('reportCategory').value;
    const location = document.getElementById('reportLocation').value.trim();
    const date = document.getElementById('reportDate').value.trim() || "Today";
    const description = document.getElementById('reportDesc').value.trim();
    const contact = document.getElementById('reportContact').value.trim();
    const user = CampusData.getCurrentUser();

    if (!itemName || !location || !description) {
      showToast("Please provide item name, location, and description.", "warning");
      return;
    }

    const newItem = {
      type,
      itemName,
      category,
      location,
      date,
      description,
      reportedBy: `${user.name} (${user.branch || 'Student'})`,
      contact: contact || user.email,
      status: "active",
      image: "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=400&q=80"
    };

    await CampusData.addLostFound(newItem);
    allItems.unshift(newItem);
    renderLostFoundItems();
    closeModal('reportItemModal');
    form.reset();
    showToast(`${type === 'lost' ? 'Lost' : 'Found'} report submitted! 📣`, "success");
  });
}

window.openReportModal = function(defaultType = 'lost') {
  const modal = document.getElementById('reportItemModal');
  const typeSelect = document.getElementById('reportType');
  if (typeSelect) typeSelect.value = defaultType;
  if (modal) modal.classList.add('active');
};
