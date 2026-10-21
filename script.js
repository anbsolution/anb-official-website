(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  const setMenuOpen = (open) => {
    if (!menuButton || !nav) return;
    nav.classList.toggle('open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    menuButton.textContent = open ? '✕' : '☰';
  };

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true');
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setMenuOpen(false));
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    });

    document.addEventListener('click', (event) => {
      if (nav.classList.contains('open') &&
          !nav.contains(event.target) &&
          !menuButton.contains(event.target)) {
        setMenuOpen(false);
      }
    });

    window.addEventListener('resize', () => {
      if (window.matchMedia('(min-width: 601px)').matches) setMenuOpen(false);
    });
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    const updateBackToTop = () => backToTop.classList.toggle('is-visible', window.scrollY > 500);
    updateBackToTop();
    window.addEventListener('scroll', updateBackToTop, { passive: true });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }));
  }

  const items = document.querySelectorAll('.reveal');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reducedMotion) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach((item) => observer.observe(item));
  } else {
    items.forEach((item) => item.classList.add('is-visible'));
  }

  // v5: centered header search filters project cards by text only (no category filters).
  const projectGrid = document.querySelector('.project-grid');
  const searchInput = document.getElementById('project-search');
  const projectCards = Array.from(document.querySelectorAll('.project-card'));
  const resultsLabel = document.getElementById('project-results');
  const normalize = (value) => (value || '').toLocaleLowerCase().trim();
  const applyProjectSearch = () => {
    const query = normalize(searchInput ? searchInput.value : '');
    let shown = 0;
    projectCards.forEach((card) => {
      const visible = !query || normalize(card.textContent).includes(query);
      card.hidden = !visible;
      if (visible) shown += 1;
    });
    if (resultsLabel) {
      resultsLabel.hidden = !query;
      resultsLabel.textContent = query
        ? (shown ? `${shown} project${shown === 1 ? '' : 's'} found for “${searchInput.value.trim()}”.` : `No projects found for “${searchInput.value.trim()}”.`)
        : '';
    }
  };
  if (projectGrid && projectCards.length) {
    if (searchInput) searchInput.addEventListener('input', applyProjectSearch);
    if (searchInput) searchInput.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        searchInput.value = '';
        applyProjectSearch();
        searchInput.blur();
      }
      if (event.key === 'Enter' && searchInput.value.trim()) {
        document.getElementById('projects')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      }
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === '/' && !event.ctrlKey && !event.metaKey && !event.altKey && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName || '')) {
        event.preventDefault();
        searchInput?.focus();
      }
    });

    // Accessible project detail dialog, populated from each existing project card.
    const dialog = document.createElement('dialog');
    dialog.className = 'project-dialog';
    dialog.setAttribute('aria-labelledby', 'project-dialog-title');
    dialog.innerHTML = `<div class="dialog-inner"><div class="dialog-top"><div><div class="dialog-kicker">ANB / PROJECT DETAILS</div><h3 class="dialog-title" id="project-dialog-title"></h3></div><button class="dialog-close" type="button" aria-label="Close project details">×</button></div><div class="dialog-status"></div><p class="dialog-description"></p><div class="dialog-actions"></div><p class="dialog-note">Availability is shown as listed on this website. Only use release links when a verified release is available.</p></div>`;
    document.body.appendChild(dialog);
    const closeDialog = dialog.querySelector('.dialog-close');
    const close = () => { if (dialog.open) dialog.close(); };
    closeDialog.addEventListener('click', close);
    dialog.addEventListener('click', (event) => { if (event.target === dialog) close(); });
    dialog.addEventListener('close', () => { const prior = document.activeElement; if (prior && prior.classList && prior.classList.contains('details-button')) prior.focus(); });
    projectCards.forEach((card) => {
      const content = card.querySelector('.project-content');
      if (!content) return;
      const title = content.querySelector('h3');
      const description = content.querySelector('p');
      const status = card.querySelector('.project-state');
      const link = content.querySelector('a[href]');
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'details-button';
      button.textContent = 'Project details +';
      button.setAttribute('aria-haspopup', 'dialog');
      content.appendChild(button);
      button.addEventListener('click', () => {
        dialog.querySelector('#project-dialog-title').textContent = title ? title.textContent.trim() : 'ANB project';
        dialog.querySelector('.dialog-description').textContent = description ? description.textContent.trim() : 'Project information will be updated as development progresses.';
        dialog.querySelector('.dialog-status').textContent = status ? status.textContent.trim() : (content.querySelector('.muted-link') ? content.querySelector('.muted-link').textContent.trim() : 'Project information');
        const actions = dialog.querySelector('.dialog-actions');
        actions.replaceChildren();
        if (link) {
          const action = document.createElement('a');
          action.className = 'button button-primary';
          action.href = link.href;
          action.textContent = link.textContent.trim().replace(/\s*[↗↘+]\s*$/, '') || 'Open project';
          if (link.target === '_blank') { action.target = '_blank'; action.rel = 'noopener noreferrer'; }
          actions.appendChild(action);
        } else {
          const note = document.createElement('span');
          note.className = 'dialog-note';
          note.textContent = 'A public project or release link has not been published yet.';
          actions.appendChild(note);
        }
        if (typeof dialog.showModal === 'function') dialog.showModal();
        else window.alert(`${title ? title.textContent : 'Project'}\n\n${description ? description.textContent : ''}`);
      });
    });
    applyProjectSearch();
  }

})();
