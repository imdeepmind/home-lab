/**
 * Home Lab & Personal Startpage Application Logic
 * home.imdeepmind.com
 */

(function () {
  'use strict';

  // Language colors for GitHub Projects
  const LANG_COLORS = {
    'TypeScript': '#3178c6',
    'JavaScript': '#f7df1e',
    'Python': '#3572A5',
    'Go': '#00ADD8',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'Shell': '#89e051',
    'C++': '#f34b7d',
    'C': '#555555',
    'Rust': '#dea584',
    'Dart': '#00B4AB',
    'Jupyter Notebook': '#DA5B0B'
  };

  // State
  let services = [];
  let gitHubProjects = [];
  let currentCategory = 'all';
  let searchQuery = '';
  let viewMode = localStorage.getItem('hl_view_mode') || 'grid'; // 'grid' | 'list'
  let activeTheme = localStorage.getItem('hl_theme') || 'dark';

  // DOM Elements
  const htmlEl = document.documentElement;
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const searchInput = document.getElementById('searchInput');
  const searchClearBtn = document.getElementById('searchClearBtn');
  const categoriesContainer = document.getElementById('categoriesContainer');
  const pinnedSection = document.getElementById('pinnedSection');
  const pinnedGrid = document.getElementById('pinnedGrid');
  const servicesGrid = document.getElementById('servicesGrid');
  const servicesList = document.getElementById('servicesList');
  const servicesTableBody = document.getElementById('servicesTableBody');
  const projectsSection = document.getElementById('projectsSection');
  const projectsGrid = document.getElementById('projectsGrid');
  const refreshProjectsBtn = document.getElementById('refreshProjectsBtn');
  const projectsCountEl = document.getElementById('projectsCount');
  const emptyState = document.getElementById('emptyState');
  const gridViewBtn = document.getElementById('gridViewBtn');
  const listViewBtn = document.getElementById('listViewBtn');
  const toastContainer = document.getElementById('toastContainer');
  const ddgForm = document.getElementById('ddgForm');
  const ddgInput = document.getElementById('ddgInput');
  const currentDateEl = document.getElementById('currentDate');

  // 1. Theme Management
  function initTheme() {
    htmlEl.setAttribute('data-theme', activeTheme);
    updateThemeIcon();
  }

  function toggleTheme() {
    activeTheme = activeTheme === 'dark' ? 'light' : 'dark';
    htmlEl.setAttribute('data-theme', activeTheme);
    localStorage.setItem('hl_theme', activeTheme);
    updateThemeIcon();
    showToast(`Switched to ${activeTheme === 'dark' ? 'Dark' : 'Light'} theme`);
  }

  function updateThemeIcon() {
    if (!themeIcon) return;
    if (activeTheme === 'dark') {
      themeIcon.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      `;
      themeToggleBtn.setAttribute('title', 'Switch to Light Theme');
    } else {
      themeIcon.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `;
      themeToggleBtn.setAttribute('title', 'Switch to Dark Theme');
    }
  }

  // 2. Data Initialization
  function initData() {
    const saved = localStorage.getItem('hl_services_v2');
    if (saved) {
      try {
        services = JSON.parse(saved);
      } catch (e) {
        services = [...DEFAULT_SERVICES];
      }
    } else {
      services = [...DEFAULT_SERVICES];
    }
  }

  function saveServices() {
    localStorage.setItem('hl_services_v2', JSON.stringify(services));
  }

  // 3. GitHub Projects Integration
  async function loadGitHubProjects(forceRefresh = false) {
    const CACHE_KEY = 'hl_gh_projects_v2';
    const CACHE_TIME_KEY = 'hl_gh_projects_time';
    const ONE_HOUR = 60 * 60 * 1000;

    const cached = localStorage.getItem(CACHE_KEY);
    const cachedTime = localStorage.getItem(CACHE_TIME_KEY);
    const isCacheValid = cached && cachedTime && (Date.now() - parseInt(cachedTime, 10) < ONE_HOUR);

    if (!forceRefresh && isCacheValid) {
      try {
        gitHubProjects = JSON.parse(cached);
        renderGitHubProjects();
        renderCategories();
        return;
      } catch (e) {
        // Fall back to fetch
      }
    }

    if (refreshProjectsBtn) {
      refreshProjectsBtn.style.animation = 'spin 1s linear infinite';
    }

    try {
      const res = await fetch('https://api.github.com/users/imdeepmind/repos?per_page=100&sort=updated');
      if (!res.ok) throw new Error('GitHub API rate limit or error');
      const data = await res.json();
      
      // Filter out archived repos
      gitHubProjects = data
        .filter(repo => !repo.archived)
        .map(repo => ({
          id: 'gh-' + repo.id,
          name: repo.name,
          description: repo.description || 'No description provided.',
          url: repo.html_url,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          language: repo.language || 'Code',
          updatedAt: repo.updated_at,
          favorite: false
        }));

      localStorage.setItem(CACHE_KEY, JSON.stringify(gitHubProjects));
      localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
      if (forceRefresh) showToast(`Fetched ${gitHubProjects.length} GitHub repositories!`);
    } catch (err) {
      console.warn('Could not fetch from GitHub API:', err);
      if (cached) {
        gitHubProjects = JSON.parse(cached);
      } else {
        // Fallback initial repos snapshot
        gitHubProjects = [
          { name: 'rocket', description: 'Configuration-driven API framework to build backend APIs rapidly.', url: 'https://github.com/imdeepmind/rocket', language: 'TypeScript', stars: 12 },
          { name: 'ayo', description: 'Open-source, end-to-end encrypted multi-cloud storage platform.', url: 'https://github.com/imdeepmind/ayo', language: 'Go', stars: 8 },
          { name: 'NeuralPy', description: 'A Keras-like deep learning library that works on top of PyTorch.', url: 'https://github.com/imdeepmind/NeuralPy', language: 'Python', stars: 78 },
          { name: 'todo', description: 'Minimalist TODO application with sleek design and keyboard shortcuts.', url: 'https://github.com/imdeepmind/todo', language: 'JavaScript', stars: 4 },
          { name: 'portfolio-tracker', description: 'NextJS application to manage and track personal investment portfolio.', url: 'https://github.com/imdeepmind/portfolio-tracker', language: 'TypeScript', stars: 3 },
          { name: 'utility-tools', description: 'A collection of simple yet powerful utility tools for developers.', url: 'https://github.com/imdeepmind/utility-tools', language: 'TypeScript', stars: 2 },
          { name: 'home-lab', description: 'Personal homepage and service catalog website.', url: 'https://github.com/imdeepmind/home-lab', language: 'HTML', stars: 1 }
        ];
      }
    } finally {
      if (refreshProjectsBtn) {
        refreshProjectsBtn.style.animation = 'none';
      }
      renderGitHubProjects();
      renderCategories();
    }
  }

  // 4. Render Categories
  function renderCategories() {
    if (!categoriesContainer) return;
    categoriesContainer.innerHTML = DEFAULT_CATEGORIES.map(cat => {
      let count = 0;
      if (cat.id === 'all') {
        count = services.length + gitHubProjects.length;
      } else if (cat.id === 'projects') {
        count = gitHubProjects.length;
      } else {
        count = services.filter(s => s.category === cat.id).length;
      }

      return `
        <button class="category-pill ${cat.id === currentCategory ? 'active' : ''}" data-category="${cat.id}">
          <span>${cat.label}</span>
          <span class="category-count">${count}</span>
        </button>
      `;
    }).join('');

    categoriesContainer.querySelectorAll('.category-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        currentCategory = btn.getAttribute('data-category');
        renderCategories();
        renderServices();
        renderGitHubProjects();
      });
    });
  }

  // 5. Filter Services
  function getFilteredServices() {
    if (currentCategory === 'projects') return [];

    return services.filter(s => {
      const matchCategory = currentCategory === 'all' || s.category === currentCategory;
      if (!matchCategory) return false;

      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase().trim();
      const matchName = s.name.toLowerCase().includes(q);
      const matchDesc = s.description.toLowerCase().includes(q);
      const matchTags = s.tags && s.tags.some(t => t.toLowerCase().includes(q));
      const matchUrl = s.url.toLowerCase().includes(q);

      return matchName || matchDesc || matchTags || matchUrl;
    });
  }

  function getFilteredProjects() {
    if (currentCategory !== 'all' && currentCategory !== 'projects') return [];

    return gitHubProjects.filter(p => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase().trim();
      return p.name.toLowerCase().includes(q) ||
             p.description.toLowerCase().includes(q) ||
             (p.language && p.language.toLowerCase().includes(q));
    });
  }

  // 6. Card Template Builders
  function createServiceCardHtml(s) {
    const tagsHtml = (s.tags || []).slice(0, 3).map(t => `<span class="tag-chip">${escapeHtml(t)}</span>`).join('');
    const isPinned = s.favorite;

    return `
      <div class="service-card" data-id="${s.id}">
        <div class="card-top">
          <div class="service-badge" style="background-color: ${s.iconBg || 'var(--color-primary)'}">
            ${escapeHtml(s.iconText || s.name.slice(0, 2).toUpperCase())}
          </div>
          <div class="card-actions">
            <button class="btn-card-action pin-toggle ${isPinned ? 'pinned' : ''}" title="${isPinned ? 'Unpin from Top' : 'Pin to Top'}" data-id="${s.id}">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="${isPinned ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </button>
            <button class="btn-card-action copy-link" title="Copy URL" data-url="${escapeHtml(s.url)}">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            </button>
          </div>
        </div>
        <div class="service-info">
          <div class="service-name-row">
            <h3 class="service-name">${escapeHtml(s.name)}</h3>
          </div>
          <p class="service-desc">${escapeHtml(s.description)}</p>
        </div>
        <div class="service-tags">
          ${tagsHtml}
        </div>
        <div class="card-bottom">
          <span class="service-category-tag">${escapeHtml(s.category)}</span>
          <a href="${escapeHtml(s.url)}" target="_blank" rel="noopener noreferrer" class="btn-open-service">
            <span>Open</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        </div>
      </div>
    `;
  }

  function createProjectCardHtml(p) {
    const langColor = LANG_COLORS[p.language] || '#d9083c';

    return `
      <a href="${escapeHtml(p.url)}" target="_blank" rel="noopener noreferrer" class="project-card">
        <div class="project-top">
          <div class="project-title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--color-primary-light);">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
            <span>${escapeHtml(p.name)}</span>
          </div>
          ${p.stars ? `
            <div class="project-stars">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <span>${p.stars}</span>
            </div>
          ` : ''}
        </div>
        <p class="project-desc">${escapeHtml(p.description)}</p>
        <div class="project-bottom">
          <div class="lang-pill">
            <span class="lang-dot" style="background-color: ${langColor};"></span>
            <span>${escapeHtml(p.language || 'Code')}</span>
          </div>
          <span class="btn-open-service">
            <span>GitHub</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          </span>
        </div>
      </a>
    `;
  }

  function createServiceTableRowHtml(s) {
    const isPinned = s.favorite;

    return `
      <tr>
        <td>
          <button class="btn-card-action pin-toggle ${isPinned ? 'pinned' : ''}" title="${isPinned ? 'Unpin' : 'Pin'}" data-id="${s.id}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="${isPinned ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </button>
        </td>
        <td>
          <div class="list-service-main">
            <div class="service-badge" style="width: 32px; height: 32px; font-size: 0.8rem; background-color: ${s.iconBg || 'var(--color-primary)'}">
              ${escapeHtml(s.iconText || s.name.slice(0, 2).toUpperCase())}
            </div>
            <div>
              <div class="list-service-name">${escapeHtml(s.name)}</div>
              <div style="font-size: 0.78rem; color: var(--text-dim);">${escapeHtml(s.description.slice(0, 50))}...</div>
            </div>
          </div>
        </td>
        <td><span class="category-pill" style="padding: 0.15rem 0.6rem; font-size: 0.75rem;">${escapeHtml(s.category)}</span></td>
        <td><span class="tag-chip">${escapeHtml(s.tags ? s.tags.join(', ') : '-')}</span></td>
        <td style="text-align: right;">
          <div style="display: inline-flex; gap: 0.5rem; align-items: center;">
            <button class="btn-card-action copy-link" title="Copy URL" data-url="${escapeHtml(s.url)}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            </button>
            <a href="${escapeHtml(s.url)}" target="_blank" rel="noopener noreferrer" class="btn-open-service">Open</a>
          </div>
        </td>
      </tr>
    `;
  }

  // 7. Render Services
  function renderServices() {
    const filtered = getFilteredServices();
    const pinned = services.filter(s => s.favorite);

    // Pinned section
    if (pinned.length > 0 && currentCategory === 'all' && !searchQuery) {
      pinnedSection.style.display = 'block';
      pinnedGrid.innerHTML = pinned.map(createServiceCardHtml).join('');
    } else {
      pinnedSection.style.display = 'none';
    }

    // View Mode handling
    if (filtered.length === 0 && currentCategory !== 'projects') {
      servicesGrid.style.display = 'none';
      servicesList.style.display = 'none';
    } else if (currentCategory === 'projects') {
      servicesGrid.style.display = 'none';
      servicesList.style.display = 'none';
    } else {
      if (viewMode === 'grid') {
        servicesGrid.style.display = 'grid';
        servicesList.style.display = 'none';
        servicesGrid.innerHTML = filtered.map(createServiceCardHtml).join('');
      } else {
        servicesGrid.style.display = 'none';
        servicesList.style.display = 'block';
        servicesTableBody.innerHTML = filtered.map(createServiceTableRowHtml).join('');
      }
    }

    attachCardEventListeners();
    updateEmptyState();
  }

  // 8. Render GitHub Projects
  function renderGitHubProjects() {
    const filteredProjects = getFilteredProjects();

    if (projectsCountEl) {
      projectsCountEl.textContent = `${filteredProjects.length} Repos`;
    }

    if (filteredProjects.length > 0) {
      projectsSection.style.display = 'block';
      projectsGrid.innerHTML = filteredProjects.map(createProjectCardHtml).join('');
    } else {
      projectsSection.style.display = 'none';
    }

    updateEmptyState();
  }

  function updateEmptyState() {
    const servicesCount = getFilteredServices().length;
    const projectsCount = getFilteredProjects().length;

    if (servicesCount === 0 && projectsCount === 0) {
      emptyState.style.display = 'block';
    } else {
      emptyState.style.display = 'none';
    }
  }

  // 9. Card Event Listeners
  function attachCardEventListeners() {
    document.querySelectorAll('.pin-toggle').forEach(btn => {
      btn.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        const id = this.getAttribute('data-id');
        const s = services.find(item => item.id === id);
        if (s) {
          s.favorite = !s.favorite;
          saveServices();
          renderServices();
          showToast(s.favorite ? `Pinned "${s.name}" to favorites` : `Unpinned "${s.name}"`);
        }
      };
    });

    document.querySelectorAll('.copy-link').forEach(btn => {
      btn.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        const url = this.getAttribute('data-url');
        if (navigator.clipboard) {
          navigator.clipboard.writeText(url).then(() => {
            showToast(`Copied: ${url}`);
          }).catch(() => {
            showToast(`URL: ${url}`);
          });
        } else {
          showToast(`URL: ${url}`);
        }
      };
    });
  }

  // 10. Toast Notification
  function showToast(message) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--color-primary-light); flex-shrink: 0;">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>
      <span>${escapeHtml(message)}</span>
    `;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.25s ease';
      setTimeout(() => toast.remove(), 250);
    }, 2800);
  }

  // 11. Helper: Escape HTML
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // 12. Date Update
  function updateDate() {
    if (!currentDateEl) return;
    const now = new Date();
    const options = { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    currentDateEl.textContent = now.toLocaleDateString('en-US', options);
  }

  // 13. Event Setup
  function setupEvents() {
    // Theme toggle
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', toggleTheme);
    }

    // DuckDuckGo Search Form
    if (ddgForm && ddgInput) {
      ddgForm.addEventListener('submit', (e) => {
        const query = ddgInput.value.trim();
        if (!query) {
          e.preventDefault();
          return;
        }
        // If it looks like a direct URL, go there directly!
        if (query.startsWith('http://') || query.startsWith('https://')) {
          e.preventDefault();
          window.location.href = query;
        }
      });

      // Bang chips
      document.querySelectorAll('.bang-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          const bang = chip.getAttribute('data-bang');
          ddgInput.value = bang + ' ' + ddgInput.value.replace(/^!\S+\s*/, '');
          ddgInput.focus();
        });
      });
    }

    // Catalog Search bar input
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        if (searchClearBtn) {
          searchClearBtn.style.display = searchQuery ? 'flex' : 'none';
        }
        renderServices();
        renderGitHubProjects();
      });

      if (searchClearBtn) {
        searchClearBtn.addEventListener('click', () => {
          searchInput.value = '';
          searchQuery = '';
          searchClearBtn.style.display = 'none';
          searchInput.focus();
          renderServices();
          renderGitHubProjects();
        });
      }
    }

    // Refresh GitHub Projects Button
    if (refreshProjectsBtn) {
      refreshProjectsBtn.addEventListener('click', () => {
        loadGitHubProjects(true);
      });
    }

    // Keyboard Shortcuts (Cmd+K, Ctrl+K, '/')
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (ddgInput) ddgInput.focus();
      } else if (e.key === '/' && document.activeElement !== searchInput && document.activeElement !== ddgInput) {
        e.preventDefault();
        if (searchInput) searchInput.focus();
      } else if (e.key === 'Escape') {
        if (searchInput && document.activeElement === searchInput) {
          searchInput.blur();
        } else if (ddgInput && document.activeElement === ddgInput) {
          ddgInput.blur();
        }
      }
    });

    // View Mode Toggle
    if (gridViewBtn && listViewBtn) {
      gridViewBtn.addEventListener('click', () => {
        viewMode = 'grid';
        localStorage.setItem('hl_view_mode', 'grid');
        gridViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
        renderServices();
      });

      listViewBtn.addEventListener('click', () => {
        viewMode = 'list';
        localStorage.setItem('hl_view_mode', 'list');
        listViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
        renderServices();
      });

      if (viewMode === 'list') {
        listViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
      } else {
        gridViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
      }
    }
  }

  // Initialization
  function init() {
    initTheme();
    initData();
    updateDate();
    setInterval(updateDate, 30000);
    renderCategories();
    renderServices();
    loadGitHubProjects(false);
    setupEvents();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
