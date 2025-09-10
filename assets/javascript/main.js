// Main UI interactions for the portfolio
(function () {
  const root = document.documentElement;
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
        copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
        copyBtn.disabled = true;
        setTimeout(() => {
          copyBtn.innerHTML = original;
          copyBtn.disabled = false;
        }, 1400);
      } catch (e) {
        console.warn('Clipboard failed, falling back to prompt');
        const email = emailTextEl.textContent.trim();
        window.prompt('Copy email address:', email);
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
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
        btn.disabled = true;
        setTimeout(() => { btn.innerHTML = original; btn.disabled = false; }, 1400);
      } catch (e) {
        window.prompt('Copy value:', getText());
      }
    });
  }

  copyToClipboardBtn(copyDiscordUsername, () => (discordUsername ? discordUsername.textContent.trim() : ''));
  copyToClipboardBtn(copyDiscordId, () => (discordUserId ? discordUserId.textContent.trim() : ''));
})();
