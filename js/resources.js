/**
 * CampusConnect - Study Resources Controller
 */

let allResources = [];
let currentSubject = 'all';
let currentType = 'all';

document.addEventListener('DOMContentLoaded', async () => {
  allResources = await CampusData.getResources();
  renderResources();
  initResourceFilters();
  initResourceSearch();
  initUploadResourceForm();

  if (window.location.hash === '#upload') {
    setTimeout(() => openModal('uploadResourceModal'), 100);
  }
});

function renderResources(itemsToRender = null) {
  const container = document.getElementById('resourcesGrid');
  if (!container) return;

  const items = itemsToRender || allResources;

  if (items.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column:1 / -1;">
        <div class="empty-state-icon">📚</div>
        <div class="empty-state-title">No study resources found</div>
        <p>No materials match your subject or type filters. Be the first to upload!</p>
      </div>
    `;
    return;
  }

  container.innerHTML = items.map(res => `
    <div class="card" style="display:flex;flex-direction:column;padding:1.25rem;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.75rem;">
        <span class="badge badge-primary">${res.subject}</span>
        <span class="badge badge-neutral">${res.type}</span>
      </div>

      <h3 style="font-size:1.15rem;margin-bottom:0.5rem;line-height:1.3;">${res.title}</h3>
      <p style="font-size:0.88rem;color:var(--text-secondary);margin-bottom:1rem;flex:1;line-height:1.5;">
        ${res.description}
      </p>

      <div style="background:var(--bg-hover);padding:0.75rem;border-radius:var(--radius-md);font-size:0.82rem;color:var(--text-secondary);margin-bottom:1rem;">
        <div>Uploaded by: <strong>${res.uploadedBy}</strong></div>
        <div style="display:flex;justify-content:space-between;margin-top:0.25rem;color:var(--text-muted);">
          <span>${res.date}</span>
          <span>${res.fileSize || 'PDF Document'}</span>
        </div>
      </div>

      <div style="display:flex;gap:0.65rem;margin-top:auto;">
        <button class="btn btn-outline btn-sm" style="flex:1;" onclick="openResourcePreview('${res.id}')">
          <svg class="icon-svg" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
          Open
        </button>
        <button class="btn btn-primary btn-sm" style="flex:1;" onclick="downloadResource('${res.id}')">
          <svg class="icon-svg" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          Download
        </button>
      </div>
    </div>
  `).join('');
}

function initResourceFilters() {
  const subjectPills = document.querySelectorAll('.filter-pill[data-subject]');
  subjectPills.forEach(pill => {
    pill.addEventListener('click', () => {
      subjectPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentSubject = pill.getAttribute('data-subject');
      applyResourceFilters();
    });
  });

  const typeFilter = document.getElementById('resourceTypeFilter');
  if (typeFilter) {
    typeFilter.addEventListener('change', () => {
      currentType = typeFilter.value;
      applyResourceFilters();
    });
  }
}

function initResourceSearch() {
  const searchInput = document.getElementById('resourceSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', applyResourceFilters);
  }
}

function applyResourceFilters() {
  const searchInput = document.getElementById('resourceSearchInput');
  const query = searchInput ? searchInput.value.trim().toLowerCase() : '';

  let filtered = allResources;

  if (currentSubject !== 'all') {
    filtered = filtered.filter(r => r.subject.toLowerCase() === currentSubject.toLowerCase());
  }

  if (currentType !== 'all') {
    filtered = filtered.filter(r => r.type.toLowerCase() === currentType.toLowerCase());
  }

  if (query) {
    filtered = filtered.filter(r => 
      r.title.toLowerCase().includes(query) ||
      r.description.toLowerCase().includes(query) ||
      r.subject.toLowerCase().includes(query) ||
      r.uploadedBy.toLowerCase().includes(query)
    );
  }

  renderResources(filtered);
}

// Upload Resource Form
function initUploadResourceForm() {
  const uploadForm = document.getElementById('uploadResourceForm');
  if (!uploadForm) return;

  uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('resourceTitle').value.trim();
    const subject = document.getElementById('resourceSubject').value;
    const type = document.getElementById('resourceType').value;
    const description = document.getElementById('resourceDesc').value.trim();
    const currentUser = CampusData.getCurrentUser();

    if (!title || !subject || !type || !description) {
      showToast("Please fill in all resource details.", "warning");
      return;
    }

    const newRes = {
      title,
      subject,
      type,
      uploadedBy: currentUser.name,
      date: "Just now",
      downloads: 1,
      fileSize: "2.4 MB",
      description
    };

    await CampusData.addResource(newRes);
    allResources.unshift(newRes);
    renderResources();
    closeModal('uploadResourceModal');
    uploadForm.reset();
    showToast("Resource uploaded successfully! 📁", "success");
  });
}

// Copy Full Content to Clipboard
window.copyResourceContent = function(id) {
  const res = allResources.find(r => r.id === id);
  if (!res || !res.fullContent) return;
  navigator.clipboard.writeText(res.fullContent).then(() => {
    showToast("Full study notes copied to clipboard! ??", "success");
  }).catch(() => {
    showToast("Unable to copy to clipboard", "warning");
  });
};

// Print or Save as Official PDF
window.printResourceDocument = function(id) {
  const res = allResources.find(r => r.id === id);
  if (!res) return;
  const printWin = window.open('', '_blank');
  if (!printWin) {
    showToast("Please allow popups to print/save PDF", "warning");
    return;
  }
  const formattedContent = (res.fullContent || res.description || "No content available.")
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  printWin.document.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>${res.title} - Bennett University</title>
      <style>
        @page { size: A4; margin: 15mm; }
        body {
          font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
          color: #111827;
          line-height: 1.6;
          margin: 0;
          padding: 2rem;
          background: #FFFFFF;
        }
        .header {
          border-bottom: 3px solid #FF634A;
          padding-bottom: 1rem;
          margin-bottom: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }
        .univ-name {
          font-size: 1.35rem;
          font-weight: 800;
          color: #111827;
        }
        .univ-sub {
          font-size: 0.85rem;
          color: #6B7280;
        }
        .doc-title {
          font-size: 1.5rem;
          font-weight: 800;
          color: #FF634A;
          margin: 0 0 0.5rem 0;
        }
        .meta-strip {
          background: #F4F4F6;
          padding: 0.75rem 1rem;
          border-radius: 6px;
          font-size: 0.85rem;
          margin-bottom: 1.5rem;
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
        }
        pre {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 8px;
          padding: 1.25rem;
          font-family: 'Consolas', 'Courier New', monospace;
          font-size: 0.86rem;
          white-space: pre-wrap;
          word-break: break-word;
          line-height: 1.55;
        }
        .footer {
          margin-top: 2rem;
          border-top: 1px solid #E5E7EB;
          padding-top: 1rem;
          font-size: 0.8rem;
          color: #9CA3AF;
          text-align: center;
        }
        @media print {
          body { padding: 0; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <div class="univ-name">Bennett University</div>
          <div class="univ-sub">Times of India Group ? Learning Resource Centre & SCSET Academic Repository</div>
        </div>
        <div style="text-align:right;">
          <span style="background:#FFF1EE;color:#FF634A;padding:0.25rem 0.6rem;border-radius:4px;font-weight:700;font-size:0.8rem;">${res.subject}</span>
        </div>
      </div>
      <h1 class="doc-title">${res.title}</h1>
      <div class="meta-strip">
        <div><strong>Uploaded By:</strong> ${res.uploadedBy}</div>
        <div><strong>Date:</strong> ${res.date}</div>
        <div><strong>Format:</strong> ${res.type}</div>
        <div><strong>Status:</strong> Verified Academic Material</div>
      </div>
      <pre>${formattedContent}</pre>
      <div class="footer">
        Bennett University CampusConnect Study Repository ? Plot Nos 8-11, TechZone II, Greater Noida, UP 201310
      </div>
      <script>
        window.onload = function() {
          setTimeout(function() { window.print(); }, 250);
        };
      </script>
    </body>
    </html>
  `);
  printWin.document.close();
};

// Preview Modal with Full In-Depth Study Document Viewer
window.openResourcePreview = function(id) {
  const res = allResources.find(r => r.id === id);
  if (!res) return;

  const modal = document.getElementById('resourcePreviewModal');
  const body = document.getElementById('resourcePreviewModalBody');
  const dlBtn = document.getElementById('resourcePreviewDownloadBtn');
  const printBtn = document.getElementById('resourcePreviewPrintBtn');
  if (!modal || !body) return;

  const safeContent = (res.fullContent || res.description || "No full document text available.")
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  body.innerHTML = `
    <!-- Top Meta Strip -->
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:0.75rem;margin-bottom:1rem;padding-bottom:0.75rem;border-bottom:1px solid var(--border-color);">
      <div style="display:flex;align-items:center;gap:0.5rem;">
        <span class="badge badge-primary">${res.subject}</span>
        <span class="badge badge-neutral">${res.type}</span>
        <span style="font-size:0.82rem;color:var(--text-muted);">? ${res.fileSize || 'PDF'}</span>
      </div>
      <div style="display:flex;gap:0.5rem;">
        <button class="btn btn-outline btn-sm" onclick="copyResourceContent('${res.id}')" title="Copy text to clipboard">
          <svg class="icon-svg" viewBox="0 0 24 24" style="width:14px;height:14px;"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          Copy Notes
        </button>
        <button class="btn btn-outline btn-sm" onclick="printResourceDocument('${res.id}')" title="Print or save as clean PDF">
          <svg class="icon-svg" viewBox="0 0 24 24" style="width:14px;height:14px;"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
          Print / Save PDF
        </button>
      </div>
    </div>

    <!-- Title & Description -->
    <h2 style="font-size:1.35rem;font-weight:800;color:var(--text-primary);margin-bottom:0.4rem;line-height:1.3;">${res.title}</h2>
    <p style="font-size:0.9rem;color:var(--text-secondary);margin-bottom:1rem;line-height:1.5;">${res.description}</p>
    
    <!-- Verified Badge & Stats Strip -->
    <div style="background:var(--bg-hover);padding:0.85rem 1rem;border-radius:var(--radius-md);display:grid;grid-template-columns:repeat(auto-fit, minmax(140px, 1fr));gap:0.75rem;font-size:0.82rem;margin-bottom:1.25rem;">
      <div><strong>Uploaded by:</strong><br><span style="color:var(--text-secondary);">${res.uploadedBy}</span></div>
      <div><strong>Date:</strong><br><span style="color:var(--text-secondary);">${res.date}</span></div>
      <div><strong>Department:</strong><br><span style="color:var(--text-secondary);">SCSET / LRC Bennett</span></div>
      <div><strong>Downloads:</strong><br><span id="previewDlCount" style="color:var(--primary);font-weight:700;">${res.downloads || 1}</span></div>
    </div>

    <!-- Real Content Study Viewer -->
    <div style="margin-bottom:0.75rem;display:flex;align-items:center;justify-content:space-between;">
      <span style="font-size:0.88rem;font-weight:700;color:var(--text-primary);">?? Verified Study Notes & Topic Material:</span>
      <span style="font-size:0.78rem;color:var(--text-muted);">Scroll down to read complete material</span>
    </div>

    <div style="border:1px solid var(--border-color);border-radius:var(--radius-md);background:var(--palette-bg);max-height:380px;overflow-y:auto;padding:1.25rem;box-shadow:inset 0 2px 4px rgba(0,0,0,0.05);">
      <pre style="margin:0;font-family:'Consolas','Monaco','Courier New',monospace;font-size:0.85rem;color:var(--text-primary);white-space:pre-wrap;word-break:break-word;line-height:1.6;">${safeContent}</pre>
    </div>
  `;

  if (dlBtn) {
    dlBtn.onclick = () => {
      downloadResource(res.id);
    };
  }
  if (printBtn) {
    printBtn.onclick = () => {
      printResourceDocument(res.id);
    };
  }

  modal.classList.add('active');
};

// Download Simulation with genuine file creation (Full Real Topic Content)
window.downloadResource = function(id) {
  const res = allResources.find(r => r.id === id);
  if (!res) return;
  res.downloads = (res.downloads || 0) + 1;
  const countEl = document.getElementById('previewDlCount');
  if (countEl) countEl.textContent = res.downloads;

  // Real full academic content
  const fileContent = res.fullContent || `===========================================================
BENNETT UNIVERSITY - STUDY RESOURCE
===========================================================

TITLE: ${res.title}
SUBJECT: ${res.subject}
TYPE: ${res.type}
UPLOADED BY: ${res.uploadedBy}
DATE: ${res.date}

${res.description}
===========================================================`;

  const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${res.title.replace(/[^a-zA-Z0-9_-]/g, '_')}_Bennett_CompleteNotes.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast(`Downloaded complete "${res.title}" study material! ??`, "success");
};
