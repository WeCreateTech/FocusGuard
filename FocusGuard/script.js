const activities = [
  { app: 'Google Classroom', user: 'Alex', time: 'Active now', type: 'educational', icon: 'fa-chalkboard-user' },
  { app: 'Khan Academy', user: 'Sam', time: 'Active now', type: 'educational', icon: 'fa-graduation-cap' },
  { app: 'YouTube', user: 'Alex', time: '10 mins ago', type: 'entertainment', icon: 'fa-youtube' },
  { app: 'Roblox', user: 'Sam', time: '2 hours ago', type: 'entertainment', icon: 'fa-gamepad' }
];

const profiles = [
  { name: 'Alex', age: 10, status: 'Studying', device: 'iPad Pro', icon: 'fa-child', time: '3h 15m' },
  { name: 'Sam', age: 14, status: 'Free Time', device: 'Gaming PC', icon: 'fa-user-astronaut', time: '2h 45m' }
];

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. SPCA Navigation Logic ---
  const navItems = document.querySelectorAll('.nav-links li');
  const views = document.querySelectorAll('.view');

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Update active nav class
      navItems.forEach(nav => nav.classList.remove('active'));
      item.classList.add('active');

      // Hide all standard views
      views.forEach(view => {
        view.classList.remove('active');
      });

      // Show target view
      const targetId = item.getAttribute('data-target');
      document.getElementById(targetId).classList.add('active');
    });
  });

  // --- 2. Render Dashboard Activities ---
  const activityList = document.getElementById('activityList');
  function renderActivities() {
    if(!activityList) return;
    activityList.innerHTML = '';
    activities.forEach((act, index) => {
      setTimeout(() => {
        const li = document.createElement('li');
        li.className = 'activity-item';
        li.style.opacity = '0';
        li.style.transform = 'translateY(15px)';
        li.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)'; // Bouncy effect
        
        const statusClass = act.type === 'educational' ? 'status-educational' : 'status-entertainment';
        const statusText = act.type === 'educational' ? 'Focus' : 'Distraction';

        li.innerHTML = `
          <div class="app-info">
            <div class="app-icon"><i class="fa-solid ${act.icon}"></i></div>
            <div class="app-details">
              <strong>${act.app}</strong>
              <span>${act.user} • ${act.time}</span>
            </div>
          </div>
          <div class="status-badge ${statusClass}">
            ${statusText}
          </div>
        `;
        activityList.appendChild(li);
        
        setTimeout(() => {
          li.style.opacity = '1';
          li.style.transform = 'translateY(0)';
        }, 50);
        
      }, index * 120);
    });
  }

  // --- 3. Render Profiles Page ---
  const profilesList = document.getElementById('profilesList');
  function renderProfiles() {
    if(!profilesList) return;
    profilesList.innerHTML = '';
    profiles.forEach(profile => {
      const card = document.createElement('div');
      card.className = 'profile-card glass';
      card.innerHTML = `
        <div class="avatar-large"><i class="fa-solid ${profile.icon}"></i></div>
        <h3>${profile.name}</h3>
        <p>${profile.device}</p>
        <div class="quick-stats">
          <span class="mini-badge"><i class="fa-solid fa-clock"></i> ${profile.time} today</span>
          <span class="mini-badge"><i class="fa-solid fa-flag"></i> ${profile.status}</span>
        </div>
        <button class="btn-small" style="margin-top: 1.5rem; width: 100%; font-size: 1rem; padding: 0.8rem;">Manage Rules</button>
      `;
      profilesList.appendChild(card);
    });
  }

  // --- 4. Limits Range Sliders Event Listeners ---
  const sliders = [
    { id: 'gameLimit', valId: 'gameLimitVal', suffix: ' hrs' },
    { id: 'socialLimit', valId: 'socialLimitVal', suffix: ' hrs' }
  ];

  sliders.forEach(sliderInfo => {
    const el = document.getElementById(sliderInfo.id);
    const valEl = document.getElementById(sliderInfo.valId);
    if(el && valEl) {
      el.addEventListener('input', (e) => {
        valEl.textContent = e.target.value + sliderInfo.suffix;
      });
    }
  });

  // Init Data Rendering
  renderActivities();
  renderProfiles();
});
