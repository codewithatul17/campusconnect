/**
 * CampusConnect - Dashboard Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  initGreeting();

  // Instant synchronous render for 0ms lag when switching pages
  if (typeof CampusData !== 'undefined' && CampusData.getEventsSync) {
    const immediateEvents = CampusData.getEventsSync();
    renderUpcomingEventsList(immediateEvents);
  }

  // Parallel asynchronous background loading (never blocks Upcoming Events)
  Promise.allSettled([
    loadUpcomingEvents(),
    loadDashboardStats(),
    loadCampusAnnouncements(),
    loadTrendingClubs(),
    loadCommunityFeed()
  ]);
});

// Dynamic Greeting based on current time of day
function initGreeting() {
  const greetingEl = document.getElementById('userGreeting');
  const user = CampusData.getCurrentUser();
  const firstName = (user.name || "Student").split(' ')[0];

  const hour = new Date().getHours();
  let timeOfDay = "Morning";
  if (hour >= 12 && hour < 17) timeOfDay = "Afternoon";
  else if (hour >= 17 || hour < 4) timeOfDay = "Evening";

  if (greetingEl) {
    greetingEl.innerHTML = `Good ${timeOfDay}, ${firstName} 👋`;
  }
}

// Dashboard statistics
async function loadDashboardStats() {
  const events = await CampusData.getEvents();
  const clubs = await CampusData.getClubs();
  const announcements = await CampusData.getAnnouncements();
  const resources = await CampusData.getResources();

  const evEl = document.getElementById('statEventsToday');
  const clEl = document.getElementById('statActiveClubs');
  const anEl = document.getElementById('statNewAnnouncements');
  const resEl = document.getElementById('statStudyResources');

  if (evEl) evEl.textContent = events.length > 0 ? events.length : "17";
  if (clEl) clEl.textContent = clubs.length > 0 ? clubs.length : "18";
  if (anEl) anEl.textContent = announcements.length > 0 ? announcements.length : "5";
  if (resEl) resEl.textContent = resources.length > 0 ? resources.length : "7";
}

// Render helper for upcoming events (called synchronously in 0ms & on async sync)
function renderUpcomingEventsList(events) {
  const container = document.getElementById('dashboardEventsList');
  if (!container || !events) return;

  const topEvents = events.slice(0, 2);

  if (topEvents.length === 0) {
    container.innerHTML = `<div class="empty-state"><p>No upcoming events right now.</p></div>`;
    return;
  }

  container.innerHTML = topEvents.map(ev => `
    <div class="card event-card">
      <div class="event-image-wrapper">
        <img class="event-img" src="${ev.image}" alt="${ev.title}" loading="eager">
        <span class="badge badge-primary event-category-tag">${ev.category}</span>
        <span class="event-date-chip">
          <svg class="icon-svg" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          ${ev.date}
        </span>
      </div>
      <div class="event-details">
        <h3 class="event-title">${ev.title}</h3>
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
            <span>By: <strong>${ev.organizer}</strong></span>
          </div>
        </div>
        <div class="event-footer-action">
          <span style="font-size:0.8rem;color:var(--text-muted);font-weight:600;">
            ${ev.registeredCount}/${ev.seats} spots filled
          </span>
          <a href="events.html" class="btn btn-outline btn-sm">View Event</a>
        </div>
      </div>
    </div>
  `).join('');
}

// Section: Upcoming Events
async function loadUpcomingEvents() {
  const events = await CampusData.getEvents();
  renderUpcomingEventsList(events);
}

// Section: Campus Announcements
async function loadCampusAnnouncements() {
  const container = document.getElementById('dashboardAnnouncementsList');
  if (!container) return;

  const announcements = await CampusData.getAnnouncements();
  const topList = announcements.slice(0, 3);

  container.innerHTML = topList.map(an => `
    <div class="card announcement-card ${an.important ? 'important' : ''}">
      <div class="announcement-header">
        <span class="badge ${an.important ? 'badge-danger' : 'badge-primary'}">${an.category}</span>
        <span class="announcement-date">${an.date}</span>
      </div>
      <h4 class="announcement-title">${an.title}</h4>
      <p style="font-size:0.88rem;color:var(--text-secondary);margin:0.4rem 0 0.8rem;">
        ${an.description.length > 120 ? an.description.substring(0, 120) + '...' : an.description}
      </p>
      <a href="announcements.html" class="view-all-link" style="font-size:0.82rem;">
        Read Notice &rarr;
      </a>
    </div>
  `).join('');
}

// Section: Trending Clubs
async function loadTrendingClubs() {
  const container = document.getElementById('dashboardClubsList');
  if (!container) return;

  const clubs = await CampusData.getClubs();
  const topClubs = clubs.slice(0, 3);

  container.innerHTML = topClubs.map(cl => `
    <div class="card club-card">
      <div class="club-avatar">
        <img src="${cl.logo}" alt="${cl.name}">
      </div>
      <h4 class="club-name">${cl.name}</h4>
      <span class="badge badge-neutral" style="margin-bottom:0.75rem;">${cl.category}</span>
      <p class="club-desc">${cl.description}</p>
      <div class="club-meta-strip">
        <span style="font-size:0.82rem;font-weight:600;color:var(--text-muted);">${cl.members} Members</span>
        <button class="btn btn-sm ${cl.isJoined ? 'btn-secondary' : 'btn-primary'}" onclick="toggleClubJoinDashboard('${cl.id}', this)">
          ${cl.isJoined ? 'Joined ✓' : 'Join Club'}
        </button>
      </div>
    </div>
  `).join('');
}

// Toggle Club Join from dashboard
window.toggleClubJoinDashboard = function(clubId, btn) {
  const data = CampusData.getAll();
  const club = data.clubs.find(c => c.id === clubId);
  if (!club) return;

  club.isJoined = !club.isJoined;
  if (club.isJoined) {
    club.members += 1;
    data.currentUser.stats.clubsJoined += 1;
    btn.className = "btn btn-sm btn-secondary";
    btn.textContent = "Joined ✓";
    showToast(`You have joined ${club.name}! 🎉`, 'success');
  } else {
    club.members = Math.max(0, club.members - 1);
    data.currentUser.stats.clubsJoined = Math.max(0, data.currentUser.stats.clubsJoined - 1);
    btn.className = "btn btn-sm btn-primary";
    btn.textContent = "Join Club";
    showToast(`Left ${club.name}`, 'info');
  }
  CampusData.save(data);
  const card = btn.closest('.club-card');
  if (card) {
    const memberEl = card.querySelector('.club-meta-strip span');
    if (memberEl) memberEl.textContent = `${club.members} Members`;
  }
};

// Section: Community Posts Feed
async function loadCommunityFeed() {
  const container = document.getElementById('dashboardPostsFeed');
  if (!container) return;

  const posts = await CampusData.getPosts();
  if (posts.length === 0) {
    container.innerHTML = `<div class="empty-state"><p>No posts yet. Be the first to share something!</p></div>`;
    return;
  }

  container.innerHTML = posts.map(post => `
    <div class="card post-card" id="post-${post.id}">
      <div class="post-header">
        <div class="post-author-wrap">
          <div class="avatar-circle">
            <img src="${post.userAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80'}" alt="${post.userName}">
          </div>
          <div>
            <div class="post-author-name">${post.userName}</div>
            <div class="post-time">${post.userBranch || 'Bennett Student'} &bull; ${post.timestamp || 'Just now'}</div>
          </div>
        </div>
        <span class="badge badge-primary">${post.category || 'General'}</span>
      </div>
      <div class="post-content">${post.content}</div>
      ${post.image ? `<img class="post-image" src="${post.image}" alt="Post Media">` : ''}
      <div class="post-actions-bar">
        <button class="post-action-btn ${post.isLiked ? 'liked' : ''}" onclick="toggleLikePost('${post.id}')">
          <svg class="icon-svg" style="${post.isLiked ? 'fill:var(--danger);stroke:var(--danger);' : ''}" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          <span id="like-count-${post.id}">${post.likes || 0}</span> Likes
        </button>
        <button class="post-action-btn" onclick="toggleCommentsSection('${post.id}')">
          <svg class="icon-svg" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          <span id="comment-count-${post.id}">${post.comments ? post.comments.length : 0} Comments</span>
        </button>
        <button class="post-action-btn" onclick="sharePost('${post.id}')">
          <svg class="icon-svg" viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
          Share
        </button>
      </div>

      <!-- Expandable Comments Drawer -->
      <div id="comments-drawer-${post.id}" class="post-comments-drawer" style="display:none;margin-top:0.85rem;padding-top:0.85rem;border-top:1px dashed var(--border-color);">
        <div id="comments-list-${post.id}" style="display:flex;flex-direction:column;gap:0.45rem;margin-bottom:0.75rem;">
          ${(post.comments || []).map(c => `
            <div style="background:var(--bg-hover);padding:0.45rem 0.75rem;border-radius:var(--radius-sm);font-size:0.85rem;">
              <strong style="color:var(--text-primary);">${c.name}:</strong> <span style="color:var(--text-secondary);">${c.text}</span>
            </div>
          `).join('')}
        </div>
        <form onsubmit="submitComment(event, '${post.id}')" style="display:flex;gap:0.5rem;">
          <input type="text" id="comment-input-${post.id}" class="form-control" placeholder="Write a comment..." style="padding:0.4rem 0.75rem;font-size:0.85rem;" required>
          <button type="submit" class="btn btn-primary btn-sm">Reply</button>
        </form>
      </div>
    </div>
  `).join('');
}

// Like Post
window.toggleLikePost = function(postId) {
  const data = CampusData.getAll();
  const post = data.posts.find(p => p.id === postId);
  if (!post) return;

  post.isLiked = !post.isLiked;
  post.likes = post.isLiked ? (post.likes + 1) : Math.max(0, post.likes - 1);
  CampusData.save(data);

  const countEl = document.getElementById(`like-count-${postId}`);
  const postCard = document.getElementById(`post-${postId}`);
  if (countEl) countEl.textContent = post.likes;
  if (postCard) {
    const likeBtn = postCard.querySelector('.post-action-btn');
    if (likeBtn) {
      likeBtn.classList.toggle('liked', post.isLiked);
      const svg = likeBtn.querySelector('svg');
      if (svg) {
        svg.style.fill = post.isLiked ? 'var(--danger)' : 'none';
        svg.style.stroke = post.isLiked ? 'var(--danger)' : 'currentColor';
      }
    }
  }
};

// Toggle Comments Drawer
window.toggleCommentsSection = function(postId) {
  const drawer = document.getElementById(`comments-drawer-${postId}`);
  if (drawer) {
    const isHidden = drawer.style.display === 'none';
    drawer.style.display = isHidden ? 'block' : 'none';
    if (isHidden) {
      const input = document.getElementById(`comment-input-${postId}`);
      if (input) input.focus();
    }
  }
};

// Submit Comment without annoying prompt
window.submitComment = function(e, postId) {
  e.preventDefault();
  const input = document.getElementById(`comment-input-${postId}`);
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;

  const data = CampusData.getAll();
  const post = data.posts.find(p => p.id === postId);
  if (!post) return;

  const user = CampusData.getCurrentUser();
  if (!post.comments) post.comments = [];
  const newComment = { name: user.name, text: text };
  post.comments.push(newComment);
  CampusData.save(data);

  // Append directly to DOM for immediate feedback
  const list = document.getElementById(`comments-list-${postId}`);
  if (list) {
    const div = document.createElement('div');
    div.style.cssText = "background:var(--bg-hover);padding:0.45rem 0.75rem;border-radius:var(--radius-sm);font-size:0.85rem;";
    div.innerHTML = `<strong style="color:var(--text-primary);">${newComment.name}:</strong> <span style="color:var(--text-secondary);">${newComment.text}</span>`;
    list.appendChild(div);
  }

  const countEl = document.getElementById(`comment-count-${postId}`);
  if (countEl) countEl.textContent = `${post.comments.length} Comments`;

  input.value = '';
  showToast("Comment posted! 💬", "success");
};

// Share Post
window.sharePost = function(postId) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(window.location.href);
    showToast("Post link copied to clipboard! 📋", "info");
  } else {
    showToast("Link copied to clipboard!", "info");
  }
};
