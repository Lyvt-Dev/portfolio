(function () {
  const root = document.documentElement;
  const langToggleBtn = document.getElementById('langToggle');
  const DEFAULT_LANG = 'en';
  const savedLang = localStorage.getItem('lang') || DEFAULT_LANG;
  const i18n = {
    en: {
      'nav.about': 'About',
      'nav.skills': 'Skills',
      'nav.projects': 'Projects',
      'nav.contact': 'Contact',
      'nav.lang_btn': 'EN',

      'hero.eyebrow': 'Hi, I’m <span class="accent">Lyvt</span> <span class="sparkle" aria-hidden="true">✨</span>',
      'hero.headline': 'I build cozy, modern experiences on the web',
      'hero.subtitle': 'Focus: Web Dev • Backend • Game Dev • AI things — translating ideas into delightful products.',
      'hero.cta_projects': '<i class="fa-solid fa-rocket"></i> See Projects',
      'hero.cta_contact': '<i class="fa-solid fa-envelope"></i> Contact',
      'hero.badge_1': '<i class="fa-solid fa-star"></i> 3+ years building stuff',
      'hero.badge_2': '<i class="fa-brands fa-github"></i> Open-source friendly',
      'hero.badge_3': '<i class="fa-solid fa-heart"></i> love for VTuber <3, comfy UIs',

      'about.title': 'About Me',
      'about.subtitle': 'Short and sweet.',
      'about.p1': 'I’m a developer who loves crafting playful, high-quality experiences. My current focus is <strong>Web Development</strong> and <strong>Backend</strong>, with occasional adventures in <strong>Game Dev</strong> and <strong>AI</strong> tinkering. I enjoy systems that feel <em>comfy</em> and accessible.',
      'about.p2': 'Outside of code: coffee, synthwave playlists, and VTuber streams in the background.',
      'about.fact_1': '<i class="fa-solid fa-location-dot"></i> Based in Germany',
      'about.fact_2': '<i class="fa-solid fa-briefcase"></i> Open to requests & collabs',
      'about.fact_3': '<i class="fa-solid fa-graduation-cap"></i> Self-taught, always learning',
      'about.fact_4': '<i class="fa-solid fa-cake-candles"></i> Age: <span id="ageValue">18</span>',

      'skills.title': 'Skills & Tech',
      'skills.subtitle': 'A little badge wall of tools I love using.',

      'projects.title': 'Projects',
      'projects.subtitle': 'Highlights with a bit of story.',
      'projects.card_1.title': 'LunixVT Homepage',
      'projects.card_1.desc': 'A custom website built for the streamer LunixVT as a central hub for their online presence. The site works as a stylish linktree, featuring animated backgrounds, background music, and a clean UI that connects fans to Twitch, YouTube, TikTok, Twitter, and more.',
      'projects.card_1.demo': 'Live Demo',
      'projects.card_1.github': '<i class="fa-brands fa-github"></i> GitHub',
      'projects.card_2.title': 'PaperLocked',
      'projects.card_2.desc': 'A lightweight Windows tool that allows users to change their desktop wallpaper on systems with restricted personalization settings. Built with simplicity in mind, LockedPaper features a clean interface, quick image selection, and one-click application for a seamless wallpaper experience.',
      'projects.card_2.demo': 'Live Demo',
      'projects.card_2.github': '<i class="fa-brands fa-github"></i> GitHub',

      'contact.title': 'Contact',
      'contact.subtitle': 'Let’s build something together.',
      'contact.intro': 'My inbox is always open — whether you have a question, a project idea, or just want to say hi.',
      'contact.write_email': 'Write Email',
      'contact.copy': '<i class="fa-solid fa-copy"></i> Copy',
      'contact.github': '<i class="fa-brands fa-github"></i> GitHub',
      'contact.twitter': '<i class="fa-brands fa-x-twitter"></i> Twitter',
      'contact.discord': '<i class="fa-brands fa-discord"></i> Discord',

      'modal.discord_title': 'Discord',
      'modal.discord_subtitle': 'Connect with me on Discord',
      'modal.username': 'Username',
      'modal.user_id': 'User ID',
      'modal.copy': '<i class="fa-solid fa-copy"></i> Copy',
      'modal.open_profile': '<i class="fa-brands fa-discord"></i> Open Profile',

      'footer.text': 'Made with <i class="fa-solid fa-heart"></i> by Lyvt',

      'common.copied': '<i class="fa-solid fa-check"></i> Copied!',
      'common.copy_prompt': 'Copy value:',
      'common.copy_email_prompt': 'Copy email address:'
    },
    de: {
      'nav.about': 'Über mich',
      'nav.skills': 'Fähigkeiten',
      'nav.projects': 'Projekte',
      'nav.contact': 'Kontakt',
      'nav.lang_btn': 'DE',

      'hero.eyebrow': 'Hi, ich bin <span class="accent">Lyvt</span> <span class="sparkle" aria-hidden="true">✨</span>',
      'hero.headline': 'Ich baue gemütliche, moderne Web-Erlebnisse',
      'hero.subtitle': 'Fokus: Web Dev • Backend • Game Dev • KI — Ideen in angenehme Produkte verwandeln.',
      'hero.cta_projects': '<i class="fa-solid fa-rocket"></i> Projekte ansehen',
      'hero.cta_contact': '<i class="fa-solid fa-envelope"></i> Kontakt',
      'hero.badge_1': '<i class="fa-solid fa-star"></i> 3+ Jahre Erfahrung',
      'hero.badge_2': '<i class="fa-brands fa-github"></i> Open-Source freundlich',
      'hero.badge_3': '<i class="fa-solid fa-heart"></i> liebe für VTuber <3, gemütliche UI',

      'about.title': 'Über mich',
      'about.subtitle': 'Kurz und knackig.',
      'about.p1': 'Ich bin Entwickler und liebe es, verspielte, hochwertige Erlebnisse zu schaffen. Mein aktueller Fokus liegt auf <strong>Webentwicklung</strong> und <strong>Backend</strong>, mit gelegentlichen Abstechern in <strong>Game Dev</strong> und <strong>KI</strong>. Ich mag Systeme, die sich <em>gemütlich</em> und zugänglich anfühlen.',
      'about.p2': 'Abseits vom Code: Kaffee, Synthwave-Playlists und VTuber-Streams im Hintergrund.',
      'about.fact_1': '<i class="fa-solid fa-location-dot"></i> Sitz in Deutschland',
      'about.fact_2': '<i class="fa-solid fa-briefcase"></i> Offen für Anfragen & Kollabs',
      'about.fact_3': '<i class="fa-solid fa-graduation-cap"></i> Autodidakt, stets am Lernen',
      'about.fact_4': '<i class="fa-solid fa-cake-candles"></i> Alter: <span id="ageValue">18</span>',

      'skills.title': 'Fähigkeiten & Tech',
      'skills.subtitle': 'Eine kleine Abzeichenwand von Tools, die ich gerne nutze.',

      'projects.title': 'Projekte',
      'projects.subtitle': 'Highlights mit ein wenig Geschichte.',
      'projects.card_1.title': 'LunixVT Startseite',
      'projects.card_1.desc': 'Eine individuelle Webseite für den Streamer LunixVT als zentrale Anlaufstelle. Die Seite funktioniert wie ein stilvolles Linktree mit animierten Hintergründen, Musik und einer klaren UI, die Fans mit Twitch, YouTube, TikTok, Twitter und mehr verbindet.',
      'projects.card_1.demo': 'Live-Demo',
      'projects.card_1.github': '<i class="fa-brands fa-github"></i> GitHub',
      'projects.card_2.title': 'PaperLocked',
      'projects.card_2.desc': 'Ein leichtgewichtiges Windows-Tool, das es Benutzern ermöglicht, ihr Desktop-Hintergrundbild auf Systemen mit eingeschränkten Personalisierungseinstellungen zu ändern. Mit Fokus auf Einfachheit bietet LockedPaper eine saubere Benutzeroberfläche, schnelle Bildauswahl und Ein-Klick-Anwendung für ein nahtloses Hintergrundbild-Erlebnis.',
      'projects.card_2.demo': 'Live-Demo',
      'projects.card_2.github': '<i class="fa-brands fa-github"></i> GitHub',

      'contact.title': 'Kontakt',
      'contact.subtitle': 'Lass uns gemeinsam etwas aufbauen.',
      'contact.intro': 'Mein Postfach ist immer offen — ob Frage, Projektidee oder einfach nur Hallo sagen.',
      'contact.write_email': 'E-Mail schreiben',
      'contact.copy': '<i class="fa-solid fa-copy"></i> Kopieren',
      'contact.github': '<i class="fa-brands fa-github"></i> GitHub',
      'contact.twitter': '<i class="fa-brands fa-x-twitter"></i> Twitter',
      'contact.discord': '<i class="fa-brands fa-discord"></i> Discord',

      'modal.discord_title': 'Discord',
      'modal.discord_subtitle': 'Verbinde dich mit mir auf Discord',
      'modal.username': 'Benutzername',
      'modal.user_id': 'Benutzer-ID',
      'modal.copy': '<i class="fa-solid fa-copy"></i> Kopieren',
      'modal.open_profile': '<i class="fa-brands fa-discord"></i> Profil öffnen',

      'footer.text': 'Gemacht mit <i class="fa-solid fa-heart"></i> bei Lyvt',

      'common.copied': '<i class="fa-solid fa-check"></i> Kopiert!',
      'common.copy_prompt': 'Wert kopieren:',
      'common.copy_email_prompt': 'E-Mail-Adresse kopieren:'
    }
  };

  function t(key, lang) {
    const L = lang || currentLang;
    return (i18n[L] && i18n[L][key]) || (i18n.en && i18n.en[key]) || '';
  }

  function applyTranslations(lang) {
    document.documentElement.setAttribute('lang', lang);
    const nodes = document.querySelectorAll('[data-i18n]');
    nodes.forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const val = t(key, lang);
      if (val) {
        el.innerHTML = val;
      }
    });
    updateLangButton(lang);
  }

  function updateLangButton(lang) {
    if (langToggleBtn) {
      langToggleBtn.innerHTML = t('nav.lang_btn', lang);
      langToggleBtn.setAttribute('aria-label', lang === 'de' ? 'Sprache ändern' : 'Change language');
    }
  }

  let currentLang = savedLang;
  applyTranslations(currentLang);
  localStorage.setItem('lang', currentLang);
  const navToggle = document.querySelector('.nav__toggle');
  const navLinks = document.querySelector('.nav__links');
  const themeToggle = document.getElementById('themeToggle');
  const heroAvatar = document.querySelector('.hero__avatar');
  const avatarImg = document.getElementById('avatarImg');
  if (avatarImg) {
    avatarImg.addEventListener('error', () => {
      if (!avatarImg.dataset.fallback) {
        avatarImg.dataset.fallback = '1';
        avatarImg.src = 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=640&auto=format&fit=crop';
      }
    });
  }


  const copyBtn = document.getElementById('copyEmailBtn');
  const emailTextEl = document.getElementById('emailText');
  if (copyBtn && emailTextEl) {
    copyBtn.addEventListener('click', async () => {
      try {
        const email = emailTextEl.textContent.trim();
        if (!email) return;
        await navigator.clipboard.writeText(email);
        const original = copyBtn.innerHTML;
        copyBtn.innerHTML = t('common.copied');
        copyBtn.disabled = true;
        setTimeout(() => {
          copyBtn.innerHTML = original;
          copyBtn.disabled = false;
        }, 1400);
      } catch (e) {
        console.warn('Clipboard failed, falling back to prompt');
        const email = emailTextEl.textContent.trim();
        window.prompt(t('common.copy_email_prompt'), email);
      }
    });
  }

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const ageEl = document.getElementById('ageValue');
  const birthAttr = document.body && document.body.dataset ? document.body.dataset.birthdate : null;
  if (ageEl && birthAttr) {
    const birth = new Date(birthAttr);
    if (!isNaN(birth)) {
      const today = new Date();
      let age = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
      }
      if (age >= 0 && age < 140) {
        ageEl.textContent = String(age);
      }
    }
  }

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    root.classList.add('light');
    if (themeToggle) themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
  }

  function toggleTheme() {
    const isLight = root.classList.toggle('light');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    if (themeToggle) themeToggle.innerHTML = isLight ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
  }

  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);

  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      currentLang = currentLang === 'en' ? 'de' : 'en';
      localStorage.setItem('lang', currentLang);
      applyTranslations(currentLang);
    });
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });

    
    navLinks.addEventListener('click', (e) => {
      const target = e.target;
      if (target.tagName === 'A') {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }


  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach((el) => io.observe(el));
  } else {

    revealEls.forEach((el) => el.classList.add('visible'));
  }


  async function loadDiscordProfile() {
    try {
      if (!heroAvatar || !avatarImg) return;
      const id = heroAvatar.getAttribute('data-discord-id');
      if (!id || id === 'YOUR_DISCORD_USER_ID') return;

      const res = await fetch(`https://api.lanyard.rest/v1/users/${id}`);
      if (!res.ok) throw new Error('Failed to fetch Lanyard');
      const json = await res.json();
      if (!json || !json.data) return;

      const data = json.data;
      const user = data.discord_user || {};
      const presence = data.discord_status || 'offline';


      let avatarURL = avatarImg.src;
      if (user && user.id) {
        if (user.avatar) {
          const isGif = user.avatar.startsWith('a_');
          const ext = isGif ? 'gif' : 'png';
          avatarURL = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ext}?size=512`;
        } else {

          const disc = parseInt(user.discriminator || '0', 10);
          const index = Number.isFinite(disc) ? disc % 5 : 0;
          avatarURL = `https://cdn.discordapp.com/embed/avatars/${index}.png`;
        }
      }


      avatarImg.src = avatarURL;
      avatarImg.alt = user.global_name || user.username || 'Discord Avatar';


      const dot = heroAvatar.querySelector('.status-dot');
      if (dot) {
        dot.classList.remove('online', 'idle', 'dnd', 'offline');
        const valid = ['online', 'idle', 'dnd', 'offline'];
        dot.classList.add(valid.includes(presence) ? presence : 'offline');
        dot.title = `Status: ${presence}`;
      }
    } catch (e) {

      console.warn('[Lanyard] Could not load Discord profile:', e);
    }
  }

  loadDiscordProfile();


  const discordBtn = document.getElementById('discordContactBtn');
  const discordModal = document.getElementById('discordModal');
  const discordAvatar = document.getElementById('discordModalAvatar');
  const discordUsername = document.getElementById('discordUsername');
  const discordUserId = document.getElementById('discordUserId');
  const openDiscordProfile = document.getElementById('openDiscordProfile');
  const copyDiscordUsername = document.getElementById('copyDiscordUsername');
  const copyDiscordId = document.getElementById('copyDiscordId');

  function openModal(modal) {
    if (!modal) return;
    modal.hidden = false;
    modal.classList.add('open');

    const closeBtn = modal.querySelector('.modal__close');
    if (closeBtn) closeBtn.focus();
    document.addEventListener('keydown', onEscClose);
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('open');
    modal.hidden = true;
    document.removeEventListener('keydown', onEscClose);
  }

  function onEscClose(e) {
    if (e.key === 'Escape') closeModal(discordModal);
  }

  async function populateDiscordModal() {
    if (!discordModal) return;
    const id = discordModal.getAttribute('data-discord-id');
    const uname = discordModal.getAttribute('data-discord-username');
    if (discordUsername && uname) discordUsername.textContent = uname;
    if (discordUserId && id) discordUserId.textContent = id;
    if (openDiscordProfile && id) openDiscordProfile.href = `https://discord.com/users/${id}`;

    try {
      if (!id) return;
      const res = await fetch(`https://api.lanyard.rest/v1/users/${id}`);
      if (!res.ok) throw new Error('Failed to fetch Lanyard');
      const json = await res.json();
      const user = json?.data?.discord_user;
      if (user) {
        let url = discordAvatar?.src;
        if (user.avatar) {
          const isGif = user.avatar.startsWith('a_');
          const ext = isGif ? 'gif' : 'png';
          url = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ext}?size=512`;
        } else {
          const disc = parseInt(user.discriminator || '0', 10);
          const index = Number.isFinite(disc) ? disc % 5 : 0;
          url = `https://cdn.discordapp.com/embed/avatars/${index}.png`;
        }
        if (discordAvatar) {
          discordAvatar.src = url;
          discordAvatar.alt = user.global_name || user.username || 'Discord avatar';
        }
      }
    } catch (e) {
      console.warn('[Discord Modal] Avatar fetch failed', e);
    }
  }

  if (discordBtn && discordModal) {
    discordBtn.addEventListener('click', () => {
      openModal(discordModal);
      populateDiscordModal();
    });

    discordModal.addEventListener('click', (e) => {
      const target = e.target;
      if (target && target.closest && target.closest('[data-close]')) {
        closeModal(discordModal);
      }
    });
  }

  async function copyToClipboardBtn(btn, getText) {
    if (!btn) return;
    btn.addEventListener('click', async () => {
      try {
        const text = getText();
        await navigator.clipboard.writeText(text);
        const original = btn.innerHTML;
        btn.innerHTML = t('common.copied');
        btn.disabled = true;
        setTimeout(() => { btn.innerHTML = original; btn.disabled = false; }, 1400);
      } catch (e) {
        window.prompt(t('common.copy_prompt'), getText());
      }
    });
  }

  copyToClipboardBtn(copyDiscordUsername, () => (discordUsername ? discordUsername.textContent.trim() : ''));
  copyToClipboardBtn(copyDiscordId, () => (discordUserId ? discordUserId.textContent.trim() : ''));
})();
