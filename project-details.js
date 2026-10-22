(() => {
  const projects = {
    'arrow-puzzle-ultra-pro': {
      title: 'Arrow Puzzle ULTRA Pro',
      type: 'PUZZLE / GAME',
      category: 'Mobile puzzle game',
      platform: 'Web · Android planned',
      availability: 'Web version available',
      status: 'WEB GAME',
      symbol: '↗ ↑ ←',
      summary: 'A direction-based puzzle game built around planning moves, solving arrow layouts and progressing through increasingly challenging levels.',
      about: 'Arrow Puzzle ULTRA Pro is a puzzle-game project focused on readable boards, thoughtful level design and comfortable play on mobile screens. The web version is available through the official project website. Android availability should be treated as pending unless an official release is published.',
      features: ['Direction-based puzzle gameplay', 'Responsive mobile-friendly web experience', 'Level progression and puzzle challenges', 'Planned quality-of-life features and visual improvements', 'Official web version linked from this page'],
      development: 'The web version is linked below. Additional game features and Android release status should be updated here only when they are actually implemented and verified.',
      link: 'https://anbsolution.github.io/Arrow-puzzle/', linkLabel: 'Play web version ↗'
    },
    'smart-enhancer-ultra-4k': {
      title: 'Smart Enhancer Ultra 4K',
      type: 'IMAGE / AI',
      category: 'Image enhancement tool',
      platform: 'Android project',
      availability: 'In development',
      status: 'IN DEVELOPMENT',
      symbol: '4K',
      summary: 'An image-enhancement project exploring upload, before-and-after comparison and image upscaling workflows.',
      about: 'Smart Enhancer Ultra 4K is intended to provide a clean workflow for selecting an image, comparing the original with an enhanced result and exporting an improved image. Enhancement quality depends on the implementation and processing method; this page does not claim every AI feature or 4K output is already available.',
      features: ['Image selection and upload workflow', 'Before-and-after preview', 'Planned 2× and 4× upscale options', 'JPG, PNG and WebP export targets', 'Fast and AI-based processing modes planned'],
      development: 'The project is under development. Check the repository for the current code and verified release status before expecting an installable build.',
      link: 'https://github.com/anbsolution/Smart-Enhancer-Ultra-4K', linkLabel: 'View repository ↗'
    },
    'anb-ai-camera': {
      title: 'ANB AI Camera',
      type: 'ANDROID / CAMERA',
      category: 'Camera application',
      platform: 'Android',
      availability: 'In development',
      status: 'IN DEVELOPMENT',
      symbol: '◉',
      summary: 'A camera-first Android app concept combining capture controls with optional AI-assisted image enhancement.',
      about: 'ANB AI Camera is planned as a practical camera application rather than a generic AI dashboard. Its design direction prioritizes camera preview, photo and video capture, device-compatible controls and a clear path to reviewing or exporting media. Advanced modes depend on device hardware and the final implementation.',
      features: ['Live camera preview and capture workflow planned', 'Photo and video capture planned', 'Device-compatible camera controls', 'AI enhancement and before/after review planned', 'Permission handling and export workflow'],
      development: 'The app is in development and no public release link is currently listed. Feature availability may vary by device and must be confirmed in a published build.',
      link: '', linkLabel: ''
    },
    'anb-chat': {
      title: 'ANB Chat',
      type: 'COMMUNICATION',
      category: 'Messaging application',
      platform: 'Android · Web planned',
      availability: 'In development',
      status: 'EXPERIMENT',
      symbol: '⌘',
      summary: 'A messaging-app project focused on account access, conversations and privacy-conscious communication.',
      about: 'ANB Chat is a developing communication project. The intended direction includes account creation and login, messaging and media-sharing workflows. Security-sensitive capabilities such as end-to-end encryption, calls and account verification must be considered implemented only after their protocols and production behavior have been tested.',
      features: ['Manual account creation and login planned', 'Conversation and message interface planned', 'Image, video and file sharing planned', 'Email OTP verification planned', 'Privacy and encryption work requires careful verification'],
      development: 'This project remains an experiment. There is no public install link on the website yet; do not treat planned security features as production-ready until verified.',
      link: '', linkLabel: ''
    },
    'anb-ai': {
      title: 'ANB AI',
      type: 'PERSONAL AI / ANDROID',
      category: 'Personal AI assistant',
      platform: 'Android · Cloud + on-device AI planned',
      availability: 'In development',
      status: 'IN DEVELOPMENT',
      symbol: 'AI',
      summary: 'A personal assistant concept for Hindi/Hinglish conversations, voice replies and hybrid cloud-plus-local AI.',
      about: 'ANB AI is planned as a practical Android assistant with a mobile-first interface, voice input, spoken replies and a hybrid architecture. Cloud services may handle tasks that benefit from larger models, while suitable tasks may run locally when configured on-device. Actual features depend on implementation, device resources and secure service integration.',
      features: ['Hindi and Hinglish text/voice interaction planned', 'Voice replies and conversational interface planned', 'Hybrid cloud and on-device AI architecture', 'Secure API integration with secrets kept out of client code', 'Mobile-first Android workflow and staged testing'],
      development: 'The project is in development. Voice, offline/local inference and cloud features remain planned until verified in a published build. No public installer is listed here.',
      link: 'https://github.com/anbsolution', linkLabel: 'Visit ANB GitHub'
    },
    'anb-os': {
      title: 'ANB OS',
      type: 'SYSTEM SOFTWARE',
      category: 'Android-based operating-system project',
      platform: 'Android / AOSP exploration',
      availability: 'Long-term project',
      status: 'LONG-TERM PROJECT',
      symbol: 'OS',
      summary: 'A long-term project exploring a customized Android-based operating-system experience with a distinctive interface.',
      about: 'ANB OS is a long-term system-software effort exploring an Android Open Source Project-based operating-system direction. A real OS build requires compatible source code, device targets, drivers, build infrastructure and extensive testing. The website describes the project direction, not a claim that a complete operating system is ready.',
      features: ['Android/AOSP-based exploration', 'Distinctive visual interface direction', 'Device-target and build-system research', 'GitHub Actions build workflow exploration', 'Release and compatibility details to be published when verified'],
      development: 'The project is at a long-term development stage. Build status and supported devices should be confirmed from actual CI results and release artifacts.',
      link: 'https://github.com/anbsolution', linkLabel: 'Visit ANB GitHub ↗'
    }
  };
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('project');
  const project = projects[slug];
  const setText = (id, value) => { const el = document.getElementById(id); if (el) el.textContent = value || ''; };
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
  const homeFallback = () => {
    document.title = 'Project Not Found — ANB';
    setText('detail-type', 'PROJECT NOT FOUND');
    setText('detail-title', 'We could not find that project.');
    setText('detail-summary', 'The project link may be invalid or outdated. Return to the home page to choose a project.');
    setText('detail-about', 'Choose a project from the main ANB website to see its overview, planned features and official links.');
    setText('detail-development', 'This project identifier is not recognized by the current website.');
    setText('detail-category', '—'); setText('detail-platform', '—'); setText('detail-fact-platform', '—'); setText('detail-status', 'NOT FOUND'); setText('detail-availability', 'Not available');
    document.getElementById('detail-features')?.replaceChildren();
    const action = document.createElement('a'); action.className = 'button button-primary'; action.href = 'projects.html'; action.textContent = 'Back to projects';
    document.getElementById('detail-actions')?.appendChild(action);
  };
  if (!project) { homeFallback(); return; }
  document.title = `${project.title} — ANB Project Details`;
  setText('detail-type', project.type); setText('detail-title', project.title); setText('detail-summary', project.summary);
  setText('detail-status', project.status); setText('detail-platform', project.platform); setText('detail-about', project.about);
  setText('detail-development', project.development); setText('detail-category', project.category); setText('detail-fact-platform', project.platform); setText('detail-availability', project.availability);
  setText('detail-symbol', project.symbol);
  const list = document.getElementById('detail-features');
  project.features.forEach((feature) => { const li = document.createElement('li'); li.textContent = feature; list.appendChild(li); });
  const actions = document.getElementById('detail-actions');
  if (project.link) { const link = document.createElement('a'); link.className = 'button button-primary'; link.href = project.link; link.textContent = project.linkLabel || 'Open official link ↗'; if (project.link.startsWith('http')) { link.target = '_blank'; link.rel = 'noopener noreferrer'; } actions.appendChild(link); }
  const back = document.createElement('a'); back.className = 'button button-ghost'; back.href = 'projects.html'; back.textContent = '← Back to all projects'; actions.appendChild(back);
})();