/**
 * CampusConnect - Profile Page Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  renderProfile();
  initEditProfileModal();
});

function renderProfile() {
  const user = CampusData.getCurrentUser();
  const data = CampusData.getAll();

  // Populate Header
  const nameEl = document.getElementById('profileFullName');
  const detailsEl = document.getElementById('profileDetails');
  const collegeEl = document.getElementById('profileCollege');
  const avatarEl = document.getElementById('profileAvatar');
  const bioEl = document.getElementById('profileBio');

  if (nameEl) nameEl.textContent = user.name;
  if (detailsEl) detailsEl.textContent = `${user.course} in ${user.branch} • ${user.year}`;
  if (collegeEl) collegeEl.textContent = user.college || "Institute of Engineering & Technology";
  if (bioEl) bioEl.textContent = user.bio || "No bio added yet.";

  if (avatarEl) {
    if (user.photoURL) {
      avatarEl.innerHTML = `<img src="${user.photoURL}" alt="${user.name}">`;
    } else {
      avatarEl.textContent = (user.name || "S").charAt(0).toUpperCase();
    }
  }

  // Populate Stats
  const statPosts = document.getElementById('userStatPosts');
  const statEvents = document.getElementById('userStatEvents');
  const statClubs = document.getElementById('userStatClubs');
  const statResources = document.getElementById('userStatResources');

  const myPosts = data.posts.filter(p => p.userId === user.uid || p.userName === user.name);
  const myEvents = data.events.filter(e => e.isRegistered);
  const myClubs = data.clubs.filter(c => c.isJoined);
  const myResources = data.resources.filter(r => r.uploadedBy === user.name);

  if (statPosts) statPosts.textContent = myPosts.length;
  if (statEvents) statEvents.textContent = myEvents.length;
  if (statClubs) statClubs.textContent = myClubs.length;
  if (statResources) statResources.textContent = myResources.length;

  // Populate Interests & Skills
  const interestsWrap = document.getElementById('profileInterests');
  if (interestsWrap) {
    interestsWrap.innerHTML = (user.interests && user.interests.length > 0)
      ? user.interests.map(i => `<span class="badge badge-primary">${i}</span>`).join('')
      : `<span class="text-muted">No interests listed.</span>`;
  }

  const skillsWrap = document.getElementById('profileSkills');
  if (skillsWrap) {
    skillsWrap.innerHTML = (user.skills && user.skills.length > 0)
      ? user.skills.map(s => `<span class="badge badge-neutral">${s}</span>`).join('')
      : `<span class="text-muted">No skills listed.</span>`;
  }

  // Populate Clubs List
  const clubsWrap = document.getElementById('profileClubsList');
  if (clubsWrap) {
    if (myClubs.length === 0) {
      clubsWrap.innerHTML = `<p class="text-muted" style="font-size:0.9rem;">You haven't joined any clubs yet. <a href="clubs.html" class="auth-link">Explore clubs</a></p>`;
    } else {
      clubsWrap.innerHTML = myClubs.map(cl => `
        <div style="display:flex;align-items:center;gap:0.75rem;padding:0.75rem;background:var(--bg-hover);border-radius:var(--radius-md);margin-bottom:0.5rem;">
          <div style="width:36px;height:36px;border-radius:var(--radius-full);overflow:hidden;flex-shrink:0;">
            <img src="${cl.logo}" alt="${cl.name}" style="width:100%;height:100%;object-fit:cover;">
          </div>
          <div style="flex:1;">
            <div style="font-size:0.9rem;font-weight:600;">${cl.name}</div>
            <div style="font-size:0.75rem;color:var(--text-muted);">${cl.category} &bull; ${cl.members} Members</div>
          </div>
        </div>
      `).join('');
    }
  }

  // Recent Activity Feed
  const activityWrap = document.getElementById('profileActivityList');
  if (activityWrap) {
    if (myPosts.length === 0) {
      activityWrap.innerHTML = `<p class="text-muted" style="font-size:0.9rem;">No recent posts shared. <a href="create-post.html" class="auth-link">Create a post</a></p>`;
    } else {
      activityWrap.innerHTML = myPosts.map(p => `
        <div class="card" style="padding:1rem;margin-bottom:0.75rem;">
          <div style="display:flex;justify-content:space-between;margin-bottom:0.5rem;">
            <span class="badge badge-primary">${p.category}</span>
            <span style="font-size:0.75rem;color:var(--text-muted);">${p.timestamp}</span>
          </div>
          <p style="font-size:0.9rem;color:var(--text-primary);">${p.content}</p>
        </div>
      `).join('');
    }
  }
}

function initEditProfileModal() {
  const editBtn = document.getElementById('editProfileBtn');
  const modal = document.getElementById('editProfileModal');
  const form = document.getElementById('editProfileForm');

  if (!editBtn || !modal || !form) return;

  editBtn.addEventListener('click', () => {
    const user = CampusData.getCurrentUser();
    document.getElementById('editName').value = user.name || '';
    document.getElementById('editCourse').value = user.course || 'B.Tech';
    document.getElementById('editBranch').value = user.branch || '';
    document.getElementById('editYear').value = user.year || '2nd Year';
    document.getElementById('editBio').value = user.bio || '';
    document.getElementById('editInterests').value = (user.interests || []).join(', ');
    document.getElementById('editSkills').value = (user.skills || []).join(', ');
    document.getElementById('editPhotoUrl').value = user.photoURL || '';
    modal.classList.add('active');
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const updated = {
      name: document.getElementById('editName').value.trim(),
      course: document.getElementById('editCourse').value.trim(),
      branch: document.getElementById('editBranch').value.trim(),
      year: document.getElementById('editYear').value.trim(),
      bio: document.getElementById('editBio').value.trim(),
      photoURL: document.getElementById('editPhotoUrl').value.trim(),
      interests: document.getElementById('editInterests').value.split(',').map(s => s.trim()).filter(Boolean),
      skills: document.getElementById('editSkills').value.split(',').map(s => s.trim()).filter(Boolean)
    };

    CampusData.updateCurrentUser(updated);

    // Save to Firestore if active
    if (window.CampusConnectFirebase && window.CampusConnectFirebase.isReady && window.CampusConnectFirebase.auth.currentUser) {
      try {
        await window.CampusConnectFirebase.db.collection('users')
          .doc(window.CampusConnectFirebase.auth.currentUser.uid)
          .set(updated, { merge: true });
      } catch (err) {
        console.warn("Could not sync profile to Firestore:", err);
      }
    }

    renderProfile();
    syncUserUI();
    closeModal('editProfileModal');
    showToast("Profile updated successfully! ✨", "success");
  });
}
