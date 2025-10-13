const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -60px 0px'
});

document.querySelectorAll('.reveal').forEach(section => {
    observer.observe(section);
});

const header = document.querySelector('.site-header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const current = window.pageYOffset;
    if (current > lastScroll && current > 120) {
        header.classList.add('hide');
    } else {
        header.classList.remove('hide');
    }
    lastScroll = current;
});

const focusableSelectors = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
let activeModal = null;
let lastFocusedElement = null;

const openModal = modal => {
    if (!modal || modal === activeModal) return;
    lastFocusedElement = document.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    activeModal = modal;

    const focusTarget = modal.querySelector('[data-modal-close]') || modal.querySelector(focusableSelectors);
    if (focusTarget) {
        focusTarget.focus({ preventScroll: true });
    }
};

const closeModal = () => {
    if (!activeModal) return;
    activeModal.classList.remove('is-open');
    activeModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');

    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
        lastFocusedElement.focus({ preventScroll: true });
    }

    activeModal = null;
    lastFocusedElement = null;
};

document.querySelectorAll('[data-modal-open]').forEach(trigger => {
    trigger.addEventListener('click', event => {
        event.preventDefault();
        const modalId = trigger.getAttribute('data-modal-open');
        const modal = document.getElementById(modalId);
        openModal(modal);
    });
});

document.querySelectorAll('[data-modal-close]').forEach(closeEl => {
    closeEl.addEventListener('click', event => {
        event.preventDefault();
        closeModal();
    });
});

window.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
        closeModal();
    }
});
