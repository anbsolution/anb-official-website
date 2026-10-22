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
  const emptyState = document.getElementById('search-empty-state');
  const emptyClear = document.getElementById('empty-clear-search');
  const clearSearch = document.getElementById('search-clear');
  const suggestions = document.getElementById('project-suggestions');
  const normalize = (value) => (value || '').toLocaleLowerCase().trim();
  const aliases = new Map([
    ['arrow puzzle ultra pro', 'puzzle game arrows web game'],
    ['smart enhancer ultra 4k', 'image ai photo enhance upscale image editor'],
    ['anb ai camera', 'camera android photo video ai'],
    ['anb chat', 'chat messaging communication privacy'],
    ['anb os', 'operating system android os system software']
  ]);
  const getCardTitle = (card) => card.querySelector('h3')?.textContent.trim() || 'ANB project';
  const hideSuggestions = () => { if (suggestions) { suggestions.hidden = true; suggestions.replaceChildren(); } };
  const renderSuggestions = () => {
    if (!suggestions || !searchInput) return;
    const query = normalize(searchInput.value);
    if (!query) { hideSuggestions(); return; }
    const matches = projectCards.filter((card) => {
      const title = getCardTitle(card);
      const alias = aliases.get(title.toLocaleLowerCase()) || '';
      return normalize(`${title} ${card.textContent} ${alias}`).includes(query) || query.split(/\s+/).every((part) => normalize(`${title} ${card.textContent} ${alias}`).includes(part));
    }).slice(0, 5);
    suggestions.replaceChildren();
    matches.forEach((card) => {
      const option = document.createElement('button');
      option.type = 'button'; option.className = 'project-suggestion'; option.setAttribute('role', 'option');
      const title = document.createElement('span'); title.className = 'suggestion-title'; title.textContent = getCardTitle(card);
      const category = document.createElement('small'); category.textContent = card.querySelector('.project-type')?.textContent.trim() || 'PROJECT';
      option.append(title, category);
      option.addEventListener('keydown', (event) => {
        const options = Array.from(suggestions.querySelectorAll('.project-suggestion'));
        const currentIndex = options.indexOf(option);
        if (event.key === 'ArrowDown') {
          event.preventDefault();
          options[(currentIndex + 1) % options.length]?.focus();
        } else if (event.key === 'ArrowUp') {
          event.preventDefault();
          if (currentIndex === 0) searchInput.focus();
          else options[currentIndex - 1]?.focus();
        } else if (event.key === 'Escape') {
          event.preventDefault();
          hideSuggestions();
          searchInput.focus();
        }
      });
      option.addEventListener('click', () => {
        const slug = card.getAttribute('data-project');
        if (slug) {
          window.location.href = `project-details.html?project=${encodeURIComponent(slug)}`;
          return;
        }
        searchInput.value = getCardTitle(card); applyProjectSearch(); hideSuggestions();
      });
      suggestions.appendChild(option);
    });
    suggestions.hidden = matches.length === 0;
  };
  const applyProjectSearch = () => {
    const query = normalize(searchInput ? searchInput.value : '');
    let shown = 0;
    projectCards.forEach((card) => {
      const title = getCardTitle(card);
      const alias = aliases.get(title.toLocaleLowerCase()) || '';
      const searchableText = normalize(`${title} ${card.textContent} ${alias}`);
      const visible = !query || query.split(/\s+/).every((part) => searchableText.includes(part));
      card.hidden = !visible;
      if (visible) shown += 1;
    });
    if (resultsLabel) {
      resultsLabel.hidden = false;
      resultsLabel.textContent = query
        ? (shown ? `${shown} project${shown === 1 ? '' : 's'} found for “${searchInput.value.trim()}”.` : `No projects found for “${searchInput.value.trim()}”.`)
        : `Showing all ${shown} projects.`;
    }
    if (emptyState) emptyState.hidden = !query || shown > 0;
    if (clearSearch) clearSearch.hidden = !query;
  };
  if (projectGrid && projectCards.length) {
    if (searchInput) searchInput.addEventListener('input', () => { applyProjectSearch(); renderSuggestions(); });
    if (clearSearch) clearSearch.addEventListener('click', () => { searchInput.value = ''; applyProjectSearch(); hideSuggestions(); searchInput.focus(); });
    if (emptyClear) emptyClear.addEventListener('click', () => { searchInput.value = ''; applyProjectSearch(); hideSuggestions(); searchInput?.focus(); });
    document.querySelectorAll('[data-search-example]').forEach((button) => button.addEventListener('click', () => { if (!searchInput) return; searchInput.value = button.getAttribute('data-search-example') || ''; applyProjectSearch(); renderSuggestions(); searchInput.focus(); }));
    if (searchInput) searchInput.addEventListener('focus', renderSuggestions);
    document.addEventListener('click', (event) => { if (suggestions && !suggestions.contains(event.target) && event.target !== searchInput) hideSuggestions(); });
    if (searchInput) searchInput.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowDown' && suggestions && !suggestions.hidden) {
        const first = suggestions.querySelector('.project-suggestion');
        if (first) { event.preventDefault(); first.focus(); }
        return;
      }
      if (event.key === 'Escape') {
        if (suggestions && !suggestions.hidden) { hideSuggestions(); event.preventDefault(); return; }
        searchInput.value = ''; applyProjectSearch(); hideSuggestions(); searchInput.blur();
      }
      if (event.key === 'Enter' && searchInput.value.trim()) {
        const first = suggestions?.querySelector('.project-suggestion');
        if (first && !suggestions.hidden) { event.preventDefault(); first.click(); }
        else document.getElementById('projects')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      }
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === '/' && !event.ctrlKey && !event.metaKey && !event.altKey && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName || '')) {
        event.preventDefault();
        searchInput?.focus();
      }
    });

    // v12: open a dedicated detail page when a project card is selected.
    const openProject = (card) => {
      const slug = card.getAttribute('data-project');
      if (slug) window.location.href = `project-details.html?project=${encodeURIComponent(slug)}`;
    };
    projectCards.forEach((card) => {
      const slug = card.getAttribute('data-project');
      if (!slug) return;
      card.classList.add('project-card-clickable');
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'link');
      card.setAttribute('aria-label', `View full details for ${getCardTitle(card)}`);
      card.addEventListener('click', (event) => {
        if (event.target.closest('button, input, select, textarea')) return;
        if (event.target.closest('a')) event.preventDefault();
        openProject(card);
      });
      card.addEventListener('keydown', (event) => {
        if ((event.key === 'Enter' || event.key === ' ') && !event.target.closest('button, input, select, textarea')) {
          event.preventDefault();
          openProject(card);
        }
      });
      const content = card.querySelector('.project-content');
      if (content && !content.querySelector('.details-button')) {
        const detailLink = document.createElement('a');
        detailLink.className = 'details-button';
        detailLink.href = `project-details.html?project=${encodeURIComponent(slug)}`;
        detailLink.textContent = 'View full details →';
        detailLink.addEventListener('click', (event) => event.stopPropagation());
        content.appendChild(detailLink);
      }
    });
    applyProjectSearch();
  }


  // v15: manual Facebook sharing helpers for update cards.
  document.querySelectorAll('.copy-update').forEach((button) => {
    button.addEventListener('click', async () => {
      const card = button.closest('[data-share-text]');
      const text = card?.getAttribute('data-share-text');
      if (!text) return;
      const original = button.textContent;
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
        } else {
          const field = document.createElement('textarea');
          field.value = text;
          field.setAttribute('readonly', '');
          field.style.position = 'fixed';
          field.style.opacity = '0';
          document.body.appendChild(field);
          field.select();
          const copied = document.execCommand('copy');
          field.remove();
          if (!copied) throw new Error('Copy not available');
        }
        button.textContent = 'Copied ✓';
      } catch {
        window.prompt('Copy this update text:', text);
        button.textContent = 'Text shown';
      }
      window.setTimeout(() => { button.textContent = original; }, 2200);
    });
  });

})();
