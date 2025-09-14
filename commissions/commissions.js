(function () {
  // Theme toggle functionality (inherited from main.js)
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const langToggle = document.getElementById('langToggle');
  const navToggle = document.querySelector('.nav__toggle');
  const navLinks = document.querySelector('.nav__links');
  
  // Language functionality
  const DEFAULT_LANG = 'en';
  const savedLang = localStorage.getItem('lang') || DEFAULT_LANG;
  let currentLang = savedLang;

  // Load saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    root.classList.add('light');
    if (themeToggle) themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
  }

  // Theme toggle function
  function toggleTheme() {
    const isLight = root.classList.toggle('light');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    if (themeToggle) themeToggle.innerHTML = isLight ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
  }

  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);

  // Language toggle functionality
  function updateLangButton(lang) {
    if (langToggle) {
      langToggle.innerHTML = lang === 'en' ? 'EN' : 'DE';
      langToggle.setAttribute('aria-label', lang === 'de' ? 'Sprache ändern' : 'Change language');
    }
  }

  // Initialize language button
  updateLangButton(currentLang);

  if (langToggle) {
    langToggle.addEventListener('click', () => {
      currentLang = currentLang === 'en' ? 'de' : 'en';
      localStorage.setItem('lang', currentLang);
      updateLangButton(currentLang);
      // Redirect to main page with language preference
      window.location.href = `../index.html?lang=${currentLang}`;
    });
  }

  // Mobile navigation
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

  // Reveal animations
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

  // Dynamic contact details field
  const contactMethod = document.getElementById('contactMethod');
  const contactDetailsGroup = document.getElementById('contactDetailsGroup');
  const contactDetailsLabel = document.getElementById('contactDetailsLabel');
  const contactDetailsInput = document.getElementById('contactDetails');

  if (contactMethod && contactDetailsGroup) {
    contactMethod.addEventListener('change', (e) => {
      const selectedMethod = e.target.value;
      
      if (selectedMethod) {
        contactDetailsGroup.style.display = 'block';
        contactDetailsInput.required = true;
        
        switch (selectedMethod) {
          case 'email':
            contactDetailsLabel.textContent = 'Email Address';
            contactDetailsInput.placeholder = 'your.email@example.com';
            contactDetailsInput.type = 'email';
            break;
          case 'discord':
            contactDetailsLabel.textContent = 'Discord Username';
            contactDetailsInput.placeholder = 'username#1234 or @username';
            contactDetailsInput.type = 'text';
            break;
          case 'twitter':
            contactDetailsLabel.textContent = 'Twitter Handle';
            contactDetailsInput.placeholder = '@yourusername';
            contactDetailsInput.type = 'text';
            break;
        }
      } else {
        contactDetailsGroup.style.display = 'none';
        contactDetailsInput.required = false;
      }
    });
  }

  // Commission form handling with real email backend
  const commissionForm = document.getElementById('commissionForm');
  if (commissionForm) {
    commissionForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(commissionForm);
      
      // Show loading state
      const submitBtn = commissionForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';
      submitBtn.disabled = true;
      
      try {
        // Submit to Formspree
        const response = await fetch(commissionForm.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (response.ok) {
          // Show success message
          submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Request Sent!';
          submitBtn.classList.remove('primary');
          submitBtn.classList.add('ghost');
          
          // Reset form after delay
          setTimeout(() => {
            commissionForm.reset();
            contactDetailsGroup.style.display = 'none';
            contactDetailsInput.required = false;
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.add('primary');
            submitBtn.classList.remove('ghost');
          }, 2000);
          
          showNotification('Commission request submitted successfully! I\'ll get back to you within 24 hours.', 'success');
        } else {
          throw new Error('Form submission failed');
        }
        
      } catch (error) {
        console.error('Form submission error:', error);
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        showNotification('There was an error submitting your request. Please try again or contact me directly.', 'error');
      }
    });
  }

  // Notification system
  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fa-solid ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-triangle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
      </div>
      <button class="notification-close" aria-label="Close notification">
        <i class="fa-solid fa-times"></i>
      </button>
    `;
    
    // Add notification styles if not already present
    if (!document.querySelector('#notification-styles')) {
      const styles = document.createElement('style');
      styles.id = 'notification-styles';
      styles.textContent = `
        .notification {
          position: fixed;
          top: 2rem;
          right: 2rem;
          max-width: 400px;
          padding: 1rem 1.5rem;
          border-radius: 12px;
          background: var(--surface);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: var(--shadow);
          z-index: 1000;
          display: flex;
          align-items: center;
          gap: 1rem;
          animation: slideIn 0.3s ease;
        }
        
        .notification.success {
          border-color: rgba(34, 197, 94, 0.3);
          background: rgba(34, 197, 94, 0.1);
        }
        
        .notification.error {
          border-color: rgba(239, 68, 68, 0.3);
          background: rgba(239, 68, 68, 0.1);
        }
        
        .notification-content {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex: 1;
          color: var(--text);
          font-size: 0.9rem;
        }
        
        .notification-close {
          background: none;
          border: none;
          color: var(--muted);
          cursor: pointer;
          padding: 0.2rem;
          border-radius: 4px;
        }
        
        .notification-close:hover {
          color: var(--text);
          background: rgba(255, 255, 255, 0.1);
        }
        
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes slideOut {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
        
        @media (max-width: 480px) {
          .notification {
            top: 1rem;
            right: 1rem;
            left: 1rem;
            max-width: none;
          }
        }
      `;
      document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
          if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
          }
        }, 300);
      }
    }, 5000);
  }

  // Commission card interactions
  const commissionCards = document.querySelectorAll('.commission-card');
  commissionCards.forEach(card => {
    const buttons = card.querySelectorAll('.btn');
    buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const action = button.textContent.trim();
        
        if (action.includes('Message') || action.includes('Follow Up')) {
          showNotification('Opening messaging interface...', 'info');
        } else if (action.includes('View Details') || action.includes('View Brief')) {
          showNotification('Loading project details...', 'info');
        } else if (action.includes('Preview Site')) {
          showNotification('Opening site preview...', 'info');
        } else if (action.includes('Schedule Call')) {
          showNotification('Opening calendar scheduler...', 'info');
        }
      });
    });
  });

  // Update commission stats dynamically
  function updateCommissionStats() {
    const completedCount = document.getElementById('completed-count');
    const activeCount = document.getElementById('active-count');
    
    if (completedCount && activeCount) {
      // These would normally come from an API
      const stats = {
        completed: 1,
        active: 1
      };
      
      completedCount.textContent = stats.completed;
      activeCount.textContent = stats.active;
    }
  }

  // Smooth progress bar animations
  function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
      const width = bar.style.width;
      bar.style.width = '0%';
      setTimeout(() => {
        bar.style.width = width;
      }, 500);
    });
  }

  // Initialize
  updateCommissionStats();
  
  // Animate progress bars when they come into view
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBar = entry.target.querySelector('.progress-fill');
        if (progressBar) {
          const width = progressBar.style.width;
          progressBar.style.width = '0%';
          setTimeout(() => {
            progressBar.style.width = width;
          }, 200);
        }
        progressObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.commission-progress, .commission-preview').forEach(el => {
    progressObserver.observe(el);
  });

})();
