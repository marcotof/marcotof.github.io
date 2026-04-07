function setNavbarStyles() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    const isDarkMode = document.body.classList.contains('dark-mode');
    const navbarBg = getComputedStyle(document.body).getPropertyValue('--navbar-bg').trim();
    navbar.style.background = navbarBg;
    navbar.style.boxShadow = window.scrollY > 100
        ? (isDarkMode ? '0 2px 20px rgba(0,0,0,0.3)' : '0 2px 20px rgba(0,0,0,0.1)')
        : 'none';
}

// Initial navbar sync
setNavbarStyles();

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open', navMenu.classList.contains('active'));
    });

    // Close menu when clicking on a nav link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

function initDesktopScrollspyDots() {
    if (document.querySelector('.scrollspy-dots')) return;

    const sectionEntries = getMainSectionEntries();

    if (!sectionEntries.length) return;

    const dotsNav = document.createElement('nav');
    dotsNav.className = 'scrollspy-dots';
    dotsNav.setAttribute('aria-label', 'Section navigation');

    const dotsList = document.createElement('ul');

    sectionEntries.forEach(({ targetId, label }) => {
        const item = document.createElement('li');
        const dot = document.createElement('a');

        dot.className = 'scrollspy-dot';
        dot.href = targetId;
        dot.dataset.target = targetId;
        dot.setAttribute('aria-label', label);
        dot.setAttribute('title', label);

        item.appendChild(dot);
        dotsList.appendChild(item);
    });

    dotsNav.appendChild(dotsList);
    document.body.appendChild(dotsNav);

    const dotLinks = Array.from(dotsNav.querySelectorAll('.scrollspy-dot'));
    const desktopMq = window.matchMedia('(min-width: 1024px)');

    const setActiveDot = (activeTargetId) => {
        dotLinks.forEach((dot) => {
            const isActive = dot.dataset.target === activeTargetId;
            dot.classList.toggle('is-active', isActive);

            if (isActive) {
                dot.setAttribute('aria-current', 'location');
            } else {
                dot.removeAttribute('aria-current');
            }
        });
    };

    const resolveActiveTarget = () => {
        const sectionOffset = window.scrollY + Math.round(window.innerHeight * 0.35);
        let activeTargetId = sectionEntries[0].targetId;

        sectionEntries.forEach(({ targetId, sectionEl }) => {
            if (sectionEl.offsetTop <= sectionOffset) {
                activeTargetId = targetId;
            }
        });

        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
            activeTargetId = sectionEntries[sectionEntries.length - 1].targetId;
        }

        return activeTargetId;
    };

    const updateActiveDot = () => {
        if (!desktopMq.matches) {
            setActiveDot('');
            return;
        }

        setActiveDot(resolveActiveTarget());
    };

    let scrollTicking = false;
    const onScroll = () => {
        if (scrollTicking) return;

        scrollTicking = true;
        window.requestAnimationFrame(() => {
            updateActiveDot();
            scrollTicking = false;
        });
    };

    dotLinks.forEach((dot) => {
        dot.addEventListener('click', (event) => {
            const targetSelector = dot.dataset.target;
            const targetElement = targetSelector ? document.querySelector(targetSelector) : null;
            if (!targetElement) return;

            event.preventDefault();
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            targetElement.scrollIntoView({
                behavior: prefersReducedMotion ? 'auto' : 'smooth',
                block: 'start'
            });
        });
    });

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    if (typeof desktopMq.addEventListener === 'function') {
        desktopMq.addEventListener('change', updateActiveDot);
    } else if (typeof desktopMq.addListener === 'function') {
        desktopMq.addListener(updateActiveDot);
    }

    updateActiveDot();
}

function getMainSectionEntries() {
    const navAnchors = Array.from(document.querySelectorAll('.nav-menu > li > a[href^="#"]'));

    return navAnchors
        .map((anchor) => {
            const targetId = anchor.getAttribute('href');
            if (!targetId || targetId === '#') return null;

            const sectionEl = document.querySelector(targetId);
            if (!sectionEl) return null;

            const label = (anchor.textContent || '').trim() || targetId.replace('#', '');
            return { targetId, sectionEl, label };
        })
        .filter(Boolean);
}

function initMobileSectionArrows() {
    if (document.querySelector('.mobile-section-arrows')) return;

    const sectionEntries = getMainSectionEntries();
    if (sectionEntries.length < 2) return;

    const mobileNav = document.createElement('nav');
    mobileNav.className = 'mobile-section-arrows';
    mobileNav.setAttribute('aria-label', 'Section navigation controls');

    const upButton = document.createElement('button');
    upButton.type = 'button';
    upButton.className = 'mobile-section-arrow mobile-section-arrow-up';
    upButton.innerHTML = '<span aria-hidden="true">&#8593;</span>';

    const downButton = document.createElement('button');
    downButton.type = 'button';
    downButton.className = 'mobile-section-arrow mobile-section-arrow-down';
    downButton.innerHTML = '<span aria-hidden="true">&#8595;</span>';

    mobileNav.appendChild(upButton);
    mobileNav.appendChild(downButton);
    document.body.appendChild(mobileNav);

    const mobileMq = window.matchMedia('(max-width: 1023px)');

    const resolveActiveIndex = () => {
        const sectionOffset = window.scrollY + Math.round(window.innerHeight * 0.35);
        let activeIndex = 0;

        sectionEntries.forEach(({ sectionEl }, index) => {
            if (sectionEl.offsetTop <= sectionOffset) {
                activeIndex = index;
            }
        });

        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
            activeIndex = sectionEntries.length - 1;
        }

        return activeIndex;
    };

    const scrollToIndex = (index) => {
        const clampedIndex = Math.max(0, Math.min(index, sectionEntries.length - 1));
        const targetSection = sectionEntries[clampedIndex]?.sectionEl;
        if (!targetSection) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        targetSection.scrollIntoView({
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
            block: 'start'
        });
    };

    const updateArrowState = () => {
        if (!mobileMq.matches) {
            mobileNav.classList.remove('is-visible');
            upButton.classList.add('is-hidden');
            downButton.classList.add('is-hidden');
            return;
        }

        const activeIndex = resolveActiveIndex();
        const nearTop = window.scrollY <= Math.max(8, Math.round(window.innerHeight * 0.05));
        const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 6;

        const canGoUp = activeIndex > 0 && !nearTop;
        const canGoDown = activeIndex < sectionEntries.length - 1 && !nearBottom;

        mobileNav.classList.toggle('is-visible', canGoUp || canGoDown);

        upButton.classList.toggle('is-hidden', !canGoUp);
        upButton.disabled = !canGoUp;
        if (canGoUp) {
            const prevSectionLabel = sectionEntries[activeIndex - 1].label;
            upButton.setAttribute('aria-label', `Scroll to ${prevSectionLabel}`);
            upButton.setAttribute('title', prevSectionLabel);
        } else {
            upButton.setAttribute('aria-label', 'Already at top section');
            upButton.removeAttribute('title');
        }

        downButton.classList.toggle('is-hidden', !canGoDown);
        downButton.disabled = !canGoDown;
        if (canGoDown) {
            const nextSectionLabel = sectionEntries[activeIndex + 1].label;
            downButton.setAttribute('aria-label', `Scroll to ${nextSectionLabel}`);
            downButton.setAttribute('title', nextSectionLabel);
        } else {
            downButton.setAttribute('aria-label', 'Already at bottom section');
            downButton.removeAttribute('title');
        }
    };

    upButton.addEventListener('click', () => {
        const activeIndex = resolveActiveIndex();
        scrollToIndex(activeIndex - 1);
    });

    downButton.addEventListener('click', () => {
        const activeIndex = resolveActiveIndex();
        scrollToIndex(activeIndex + 1);
    });

    let scrollTicking = false;
    const onScroll = () => {
        if (scrollTicking) return;

        scrollTicking = true;
        window.requestAnimationFrame(() => {
            updateArrowState();
            scrollTicking = false;
        });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    if (typeof mobileMq.addEventListener === 'function') {
        mobileMq.addEventListener('change', updateArrowState);
    } else if (typeof mobileMq.addListener === 'function') {
        mobileMq.addListener(updateArrowState);
    }

    updateArrowState();
}

// Simple client-side i18n loader (supports en, it, es)
// Uses embedded locales from locales.js to avoid CORS issues on GitHub Pages
const supportedLangs = ['en', 'it', 'es'];

function loadLocale(lang) {
    if (!supportedLangs.includes(lang)) lang = 'en';
    if (!locales[lang]) {
        console.warn('Locale not found for', lang);
        lang = 'en';
    }
    const data = locales[lang];
    window.currentLocaleData = data;
    applyTranslations(data);
    return data;
}

function applyTranslations(t) {
    if (!t) return;
    if (t['meta.title']) {
        document.title = t['meta.title'];
    }
    if (t['meta.ogTitle']) {
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute('content', t['meta.ogTitle']);
    }
    if (t['meta.ogDescription']) {
        const ogDescription = document.querySelector('meta[property="og:description"]');
        if (ogDescription) ogDescription.setAttribute('content', t['meta.ogDescription']);
    }
    if (t['meta.twitterTitle']) {
        const twitterTitle = document.querySelector('meta[name="twitter:title"]');
        if (twitterTitle) twitterTitle.setAttribute('content', t['meta.twitterTitle']);
    }
    if (t['meta.twitterDescription']) {
        const twitterDescription = document.querySelector('meta[name="twitter:description"]');
        if (twitterDescription) twitterDescription.setAttribute('content', t['meta.twitterDescription']);
    }
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        const val = t[key];
        if (val === undefined) return;
        const tag = el.tagName.toLowerCase();
        if (tag === 'input' || tag === 'textarea') {
            el.placeholder = val;
        } else {
            // For elements with child nodes (like labels with icons or spans), replace only text nodes
            let textNodeFound = false;
            for (let node of el.childNodes) {
                if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0) {
                    node.textContent = val;
                    textNodeFound = true;
                    break;
                }
            }
            // If no significant text node found, set textContent directly
            if (!textNodeFound) {
                el.textContent = val;
            }
        }
    });
    // Force re-translation of form labels with nested elements
    updateFormLabels(t);
    // Trigger modal form validation state update if modal is open
    const contactModal = document.getElementById('contact-modal');
    if (contactModal && contactModal.style.display === 'block') {
        // Force validation display refresh for any fields with errors
        document.querySelectorAll('.form-group.has-error').forEach(group => {
            const errorSpan = group.querySelector('.error-message');
            if (errorSpan && errorSpan.textContent) {
                // Error message will be re-generated on next validation
                group.classList.remove('has-error');
                errorSpan.textContent = '';
            }
        });
    }
}

function updateFormLabels(t) {
    if (!t) return;
    // Update form labels with their base translation + char-count
    const nameLabel = document.querySelector('label[for="name"]');
    if (nameLabel) {
        const baseText = t['contact.name'] || 'Name';
        const charCount = t['contact.minChars3'] || '(min 3 characters)';
        nameLabel.innerHTML = `${baseText} <span class="char-count" data-i18n="contact.minChars3">${charCount}</span>`;
    }

    const emailLabel = document.querySelector('label[for="email"]');
    if (emailLabel) {
        const emailText = t['contact.emailField'] || 'Email';
        emailLabel.textContent = emailText;
    }

    const messageLabel = document.querySelector('label[for="message"]');
    if (messageLabel) {
        const baseText = t['contact.message'] || 'Message';
        const charCount = t['contact.minChars10'] || '(min 10 characters)';
        messageLabel.innerHTML = `${baseText} <span class="char-count" data-i18n="contact.minChars10">${charCount}</span>`;
    }

    // Re-translate error messages for fields that currently have errors
    document.querySelectorAll('.form-group.has-error').forEach(group => {
        const field = group.querySelector('input, textarea');
        if (field) {
            const fieldId = field.id;
            const minLength = field.minLength || 0;
            // Re-validate to update error message in new language
            if (fieldId === 'name') validateField('name', 3);
            else if (fieldId === 'email') validateField('email', 0);
            else if (fieldId === 'message') validateField('message', 10);
        }
    });
}

function setActiveLanguagePill(lang) {
    document.querySelectorAll('.lang-pill').forEach(button => {
        const isActive = button.dataset.lang === lang;
        button.classList.toggle('active', isActive);
        button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
}

function getLangFromPath(pathname) {
    const cleanPath = (pathname || '').replace(/\\/g, '/');
    const segments = cleanPath.split('/').filter(Boolean);
    if (segments.length === 0) return 'en';

    const last = segments[segments.length - 1].toLowerCase();
    const prev = segments.length > 1 ? segments[segments.length - 2].toLowerCase() : '';

    if (last === 'it' || last === 'es') return last;
    if (last === 'index.html' && (prev === 'it' || prev === 'es')) return prev;
    return 'en';
}

function buildLanguagePath(lang) {
    const isFile = window.location.protocol === 'file:';
    const cleanPath = window.location.pathname.replace(/\\/g, '/');
    const segments = cleanPath.split('/').filter(Boolean);
    let baseSegments = segments.slice();
    let fileName = 'index.html';

    if (isFile) {
        if (baseSegments.length > 0) {
            const lastSegment = baseSegments[baseSegments.length - 1];
            if (lastSegment.toLowerCase().endsWith('.html')) {
                fileName = lastSegment;
                baseSegments = baseSegments.slice(0, -1);
            }
        }
    } else if (baseSegments.length > 0 && baseSegments[baseSegments.length - 1].toLowerCase() === 'index.html') {
        baseSegments = baseSegments.slice(0, -1);
    }

    if (baseSegments.length > 0) {
        const lastFolder = baseSegments[baseSegments.length - 1].toLowerCase();
        if (lastFolder === 'it' || lastFolder === 'es') {
            baseSegments = baseSegments.slice(0, -1);
        }
    }

    if (lang !== 'en') {
        baseSegments.push(lang);
    }

    let newPath = '/' + baseSegments.join('/');
    if (!newPath.endsWith('/')) newPath += '/';
    if (isFile) newPath += fileName;
    return newPath;
}

function navigateToLanguage(lang) {
    const newPath = buildLanguagePath(lang);
    const hash = window.location.hash || '';

    if (window.location.protocol === 'file:') {
        window.location.href = `file://${newPath}${hash}`;
    } else {
        window.location.href = `${newPath}${hash}`;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    let lang = getLangFromPath(window.location.pathname);
    if (!supportedLangs.includes(lang)) lang = 'en';

    // Load locale first
    loadLocale(lang);
    initDesktopScrollspyDots();
    initMobileSectionArrows();

    setActiveLanguagePill(lang);
    document.querySelectorAll('.lang-pill').forEach(button => {
        button.addEventListener('click', () => {
            const chosen = button.dataset.lang;
            if (!supportedLangs.includes(chosen)) return;
            navigateToLanguage(chosen);
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.nav-menu');
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });

});

function initProjectFilters() {
    const filterBar = document.querySelector('.project-filters');
    if (!filterBar) return;

    const buttons = Array.from(filterBar.querySelectorAll('.filter-chip'));
    const cards = Array.from(document.querySelectorAll('.projects-grid .project-card'));
    if (!buttons.length || !cards.length) return;

    const normalizeTags = (value) => (value || '')
        .toLowerCase()
        .split(/[\s,]+/)
        .filter(Boolean);

    const setActive = (filter) => {
        buttons.forEach((btn) => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
    };

    const applyFilter = (filter) => {
        cards.forEach((card) => {
            const tags = normalizeTags(card.dataset.tech);
            const shouldShow = filter === 'all' || tags.includes(filter);
            card.classList.toggle('is-hidden', !shouldShow);
        });
        setActive(filter);
    };

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter || 'all';
            applyFilter(filter);
        });
    });

    applyFilter('all');
}

document.addEventListener('DOMContentLoaded', function () {
    initProjectFilters();
    initArchitectureMap();
});

function initArchitectureMap() {
    const section = document.getElementById('architecture');
    if (!section) return;

    const svg = section.querySelector('.architecture-svg');
    const linksLayer = section.querySelector('.architecture-links');
    const nodesLayer = section.querySelector('.architecture-nodes');
    const panelTitle = document.getElementById('architecture-title');
    const panelSummary = document.getElementById('architecture-summary');
    const tagsList = document.getElementById('architecture-tags');

    if (!svg || !linksLayer || !nodesLayer || !panelTitle || !panelSummary || !tagsList) return;

    const t = window.currentLocaleData || locales.en;
    const text = (key, fallback) => t[key] || fallback;

    const nodes = [
        {
            id: 'redelivery-hub',
            type: 'project',
            x: 280,
            y: 220,
            r: 28,
            labelKey: 'architecture.nodes.redelivery-hub',
            summaryKey: 'architecture.summary.redelivery-hub',
            tags: ['architecture.tags.projects', 'architecture.tags.operations', 'architecture.tags.impact']
        },
        {
            id: 'lqa-extension',
            type: 'project',
            x: 190,
            y: 380,
            r: 22,
            labelKey: 'architecture.nodes.lqa-extension',
            summaryKey: 'architecture.summary.lqa-extension',
            tags: ['architecture.tags.frontend', 'architecture.tags.localization', 'architecture.tags.automation']
        },
        {
            id: 'redelivery-agent',
            type: 'project',
            x: 430,
            y: 370,
            r: 23,
            labelKey: 'architecture.nodes.redelivery-agent',
            summaryKey: 'architecture.summary.redelivery-agent',
            tags: ['architecture.tags.frontend', 'architecture.tags.operations', 'architecture.tags.reliability']
        },
        {
            id: 'filemaster',
            type: 'project',
            x: 520,
            y: 210,
            r: 20,
            labelKey: 'architecture.nodes.filemaster',
            summaryKey: 'architecture.summary.filemaster',
            tags: ['architecture.tags.automation', 'architecture.tags.reliability']
        },
        {
            id: 'proxy-generation',
            type: 'project',
            x: 610,
            y: 390,
            r: 19,
            labelKey: 'architecture.nodes.proxy-generation',
            summaryKey: 'architecture.summary.proxy-generation',
            tags: ['architecture.tags.operations', 'architecture.tags.localization']
        },
        {
            id: 'python',
            type: 'skill',
            x: 760,
            y: 165,
            r: 18,
            labelKey: 'architecture.nodes.python',
            summaryKey: 'architecture.summary.python',
            tags: ['architecture.tags.backend', 'architecture.tags.automation']
        },
        {
            id: 'flask',
            type: 'skill',
            x: 860,
            y: 270,
            r: 17,
            labelKey: 'architecture.nodes.flask',
            summaryKey: 'architecture.summary.flask',
            tags: ['architecture.tags.backend', 'architecture.tags.operations']
        },
        {
            id: 'selenium',
            type: 'skill',
            x: 742,
            y: 306,
            r: 18,
            labelKey: 'architecture.nodes.selenium',
            summaryKey: 'architecture.summary.selenium',
            tags: ['architecture.tags.automation', 'architecture.tags.performance']
        },
        {
            id: 'javascript',
            type: 'skill',
            x: 826,
            y: 424,
            r: 17,
            labelKey: 'architecture.nodes.javascript',
            summaryKey: 'architecture.summary.javascript',
            tags: ['architecture.tags.frontend', 'architecture.tags.reliability']
        },
        {
            id: 'localization',
            type: 'skill',
            x: 704,
            y: 516,
            r: 18,
            labelKey: 'architecture.nodes.localization',
            summaryKey: 'architecture.summary.localization',
            tags: ['architecture.tags.localization', 'architecture.tags.quality']
        },
        {
            id: 'speed',
            type: 'impact',
            x: 500,
            y: 92,
            r: 16,
            labelKey: 'architecture.nodes.speed',
            summaryKey: 'architecture.summary.speed',
            tags: ['architecture.tags.impact', 'architecture.tags.performance']
        },
        {
            id: 'quality',
            type: 'impact',
            x: 520,
            y: 536,
            r: 16,
            labelKey: 'architecture.nodes.quality',
            summaryKey: 'architecture.summary.quality',
            tags: ['architecture.tags.impact', 'architecture.tags.reliability']
        },
        {
            id: 'scale',
            type: 'impact',
            x: 326,
            y: 520,
            r: 16,
            labelKey: 'architecture.nodes.scale',
            summaryKey: 'architecture.summary.scale',
            tags: ['architecture.tags.impact', 'architecture.tags.operations']
        }
    ];

    const edges = [
        ['redelivery-hub', 'python'],
        ['redelivery-hub', 'flask'],
        ['redelivery-hub', 'selenium'],
        ['redelivery-hub', 'speed'],
        ['redelivery-hub', 'quality'],
        ['lqa-extension', 'javascript'],
        ['lqa-extension', 'localization'],
        ['lqa-extension', 'quality'],
        ['redelivery-agent', 'javascript'],
        ['redelivery-agent', 'scale'],
        ['redelivery-agent', 'quality'],
        ['filemaster', 'python'],
        ['filemaster', 'speed'],
        ['proxy-generation', 'localization'],
        ['proxy-generation', 'scale'],
        ['selenium', 'speed'],
        ['flask', 'scale']
    ];

    // Small feature switches so these extras can be disabled quickly if needed.
    const featureFlags = {
        pulseTrails: true,
        legendFilters: true
    };

    const idToNode = new Map(nodes.map(node => [node.id, node]));
    const linkEls = [];
    const pulseEls = [];
    const nodeEls = new Map();
    const labelEls = new Map();
    const hiddenTypes = new Set();
    const activeTagFilters = new Set();
    let activeId = 'redelivery-hub';
    let raf = null;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const panel = section.querySelector('.architecture-panel');

    let legendButtons = [];
    if (featureFlags.legendFilters && panel) {
        const controls = document.createElement('div');
        controls.className = 'architecture-controls';

        const title = document.createElement('h4');
        title.className = 'architecture-controls-title';
        title.textContent = text('architecture.legendTitle', 'Node Layers');

        const legend = document.createElement('div');
        legend.className = 'architecture-legend';

        const legendItems = [
            { type: 'project', key: 'architecture.legend.projects', fallback: 'Projects' },
            { type: 'skill', key: 'architecture.legend.skills', fallback: 'Skills' },
            { type: 'impact', key: 'architecture.legend.impacts', fallback: 'Outcomes' }
        ];

        legendItems.forEach((item) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'architecture-legend-btn is-active';
            button.dataset.type = item.type;
            button.textContent = text(item.key, item.fallback);
            button.setAttribute('aria-pressed', 'true');
            legend.appendChild(button);
        });

        controls.appendChild(title);
        controls.appendChild(legend);
        panel.insertBefore(controls, panel.querySelector('.architecture-meta'));
        legendButtons = Array.from(legend.querySelectorAll('.architecture-legend-btn'));
    }

    const pulsesLayer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    pulsesLayer.classList.add('architecture-pulses');
    if (featureFlags.pulseTrails) {
        svg.appendChild(pulsesLayer);
    }

    const shortLabel = (label) => {
        if (label.length <= 14) return label;
        const split = label.split(' ');
        return split.length > 1 ? split[0] : `${label.slice(0, 12)}...`;
    };

    const positionFor = (node, time) => {
        if (reducedMotion) {
            return { x: node.x, y: node.y };
        }

        const driftA = node.type === 'project' ? 8 : node.type === 'skill' ? 6 : 5;
        const driftB = node.type === 'project' ? 5 : node.type === 'skill' ? 4 : 3;
        const seed = node.id.length * 0.47;
        const x = node.x + Math.sin(time * 0.001 + seed) * driftA;
        const y = node.y + Math.cos(time * 0.0014 + seed) * driftB;
        return { x, y };
    };

    const renderTagChips = (node) => {
        if (!node) {
            tagsList.innerHTML = '';
            return;
        }

        tagsList.innerHTML = node.tags
            .map((tagKey) => {
                const label = text(tagKey, tagKey);
                const active = activeTagFilters.has(tagKey);
                return `<li><button type="button" class="architecture-tag-btn${active ? ' is-active' : ''}" data-tag="${tagKey}" aria-pressed="${active ? 'true' : 'false'}">${label}</button></li>`;
            })
            .join('');
    };

    const setFocus = (nodeId) => {
        const node = idToNode.get(nodeId);
        if (!node) return;

        if (hiddenTypes.has(node.type)) return;

        activeId = nodeId;
        panelTitle.textContent = text(node.labelKey, node.id);
        panelSummary.textContent = text(node.summaryKey, '');
        renderTagChips(node);

        nodeEls.forEach((el, id) => {
            el.classList.toggle('is-active', id === nodeId);
            el.setAttribute('aria-pressed', id === nodeId ? 'true' : 'false');
        });

        linkEls.forEach(({ el, source, target }) => {
            const active = source === nodeId || target === nodeId;
            el.classList.toggle('is-active', active);
        });
    };

    const isNodeVisible = (nodeId) => {
        const node = idToNode.get(nodeId);
        if (!node) return false;
        if (hiddenTypes.has(node.type)) return false;
        if (!activeTagFilters.size) return true;
        return node.tags.some(tag => activeTagFilters.has(tag));
    };

    const resolveVisibleFocus = () => {
        if (isNodeVisible(activeId)) return activeId;
        return nodes.find((node) => isNodeVisible(node.id))?.id || activeId;
    };

    const applyTypeFilters = () => {
        nodeEls.forEach((el, nodeId) => {
            const node = idToNode.get(nodeId);
            const hidden = node ? hiddenTypes.has(node.type) : false;
            el.classList.toggle('is-hidden', hidden);
        });

        linkEls.forEach(({ el, source, target }) => {
            const hidden = !isNodeVisible(source) || !isNodeVisible(target);
            el.classList.toggle('is-hidden', hidden);
        });

        const nextFocus = resolveVisibleFocus();
        if (nextFocus !== activeId) {
            setFocus(nextFocus);
        }
    };

    edges.forEach(([sourceId, targetId]) => {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.classList.add('architecture-link');
        linksLayer.appendChild(line);
        const sourceNode = idToNode.get(sourceId);
        const targetNode = idToNode.get(targetId);

        let pulse = null;
        if (featureFlags.pulseTrails) {
            pulse = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            pulse.classList.add('architecture-pulse');
            pulse.setAttribute('r', '3.6');
            pulsesLayer.appendChild(pulse);
            pulseEls.push(pulse);
        }

        linkEls.push({
            el: line,
            pulse,
            source: sourceId,
            target: targetId,
            sourceType: sourceNode ? sourceNode.type : '',
            targetType: targetNode ? targetNode.type : ''
        });
    });

    nodes.forEach((node) => {
        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        group.classList.add('architecture-node', `is-${node.type}`);
        group.setAttribute('tabindex', '0');
        group.setAttribute('role', 'button');
        group.setAttribute('aria-label', text(node.labelKey, node.id));
        group.dataset.id = node.id;

        const ring = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        ring.setAttribute('r', String(node.r + 8));
        ring.classList.add('architecture-ring');

        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('r', String(node.r));

        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label.textContent = shortLabel(text(node.labelKey, node.id));

        group.appendChild(ring);
        group.appendChild(circle);
        group.appendChild(label);
        nodesLayer.appendChild(group);
        nodeEls.set(node.id, group);
        labelEls.set(node.id, label);

        group.addEventListener('click', () => {
            setFocus(node.id);
        });
        group.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                setFocus(node.id);
            }
        });
    });

    legendButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const type = button.dataset.type;
            if (!type) return;

            const currentlyActive = !hiddenTypes.has(type);
            const activeCount = ['project', 'skill', 'impact'].filter((nodeType) => !hiddenTypes.has(nodeType)).length;
            if (currentlyActive && activeCount === 1) {
                return;
            }

            if (currentlyActive) {
                hiddenTypes.add(type);
                button.classList.remove('is-active');
                button.setAttribute('aria-pressed', 'false');
            } else {
                hiddenTypes.delete(type);
                button.classList.add('is-active');
                button.setAttribute('aria-pressed', 'true');
            }

            applyTypeFilters();
        });
    });

    tagsList.addEventListener('click', (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;

        const button = target.closest('.architecture-tag-btn');
        if (!(button instanceof HTMLButtonElement)) return;

        const tag = button.dataset.tag;
        if (!tag) return;

        if (activeTagFilters.has(tag)) {
            activeTagFilters.delete(tag);
        } else {
            activeTagFilters.add(tag);
        }
        applyTypeFilters();
        if (isNodeVisible(activeId)) {
            setFocus(activeId);
        }
    });

    const tick = (time) => {
        const positions = new Map();
        nodes.forEach((node) => {
            positions.set(node.id, positionFor(node, time));
        });

        linkEls.forEach(({ el, pulse, source, target }) => {
            const a = positions.get(source);
            const b = positions.get(target);
            if (!a || !b) return;

            const hidden = !isNodeVisible(source) || !isNodeVisible(target);
            if (hidden) {
                el.classList.add('is-hidden');
                if (pulse) pulse.classList.add('is-hidden');
                return;
            }

            el.classList.remove('is-hidden');
            el.setAttribute('x1', String(a.x));
            el.setAttribute('y1', String(a.y));
            el.setAttribute('x2', String(b.x));
            el.setAttribute('y2', String(b.y));

            if (pulse) {
                const edgeIsActive = source === activeId || target === activeId;
                if (!edgeIsActive) {
                    pulse.classList.add('is-hidden');
                } else {
                    const phase = (time * 0.00022 + (source.length + target.length) * 0.061) % 1;
                    pulse.classList.remove('is-hidden');
                    pulse.setAttribute('cx', String(a.x + (b.x - a.x) * phase));
                    pulse.setAttribute('cy', String(a.y + (b.y - a.y) * phase));
                }
            }
        });

        nodes.forEach((node) => {
            const group = nodeEls.get(node.id);
            const pos = positions.get(node.id);
            if (!group || !pos) return;

            if (!isNodeVisible(node.id)) {
                group.classList.add('is-hidden');
                return;
            }

            group.classList.remove('is-hidden');
            group.setAttribute('transform', `translate(${pos.x} ${pos.y})`);

            const label = labelEls.get(node.id);
            if (label) {
                const dy = node.type === 'project' ? node.r + 16 : node.r + 13;
                label.setAttribute('y', String(dy));
            }
        });

        raf = window.requestAnimationFrame(tick);
    };

    setFocus(activeId);
    applyTypeFilters();
    raf = window.requestAnimationFrame(tick);

    document.addEventListener('visibilitychange', () => {
        if (document.hidden && raf) {
            window.cancelAnimationFrame(raf);
            raf = null;
            return;
        }

        if (!document.hidden && !raf) {
            raf = window.requestAnimationFrame(tick);
        }
    });
}

// Project details data
const projectDetails = {
    'redelivery-hub': {
        title: 'Redelivery Hub',
        description: 'A comprehensive automation platform that streamlines redelivery workflows through intelligent automation and real-time monitoring.',
        features: [
            'Multi-tool automation platform with unified interface',
            'Automated ticket creation with Selenium WebDriver',
            'Real-time status tracking and progress monitoring',
            'File processing and validation systems',
            'FileHunter for automated file discovery and copying',
            'Redelivery Validator for quality assurance',
            'TicketEye for bulk ticket management',
            'Integrated SOP documentation system'
        ],
        technologies: ['Python', 'Flask', 'Selenium WebDriver', 'HTML/CSS', 'JavaScript', 'Pandas', 'PyAutoGUI'],
        impact: [
            'Reduced manual ticket creation time by 90%',
            'Automated file processing for 100+ jobs weekly',
            'Eliminated human errors in repetitive tasks',
            'Centralized multiple tools into single platform'
        ],
        architecture: 'Flask web application with threaded background processes, real-time WebSocket communication, and modular tool integration.'
    },
    'lqa-extension': {
        title: 'LQA Tool Extension',
        description: 'Chrome extension that enhances the LQA Tool workflow with convenient comment selection and improved user experience.',
        features: [
            'Select Comment button for quick comment insertion',
            'Blurb selection popup for improved workflow efficiency',
            'Seamless integration with existing LQA Tool interface',
            'Localization support for es-419 language codes',
            'Enhanced user interface elements'
        ],
        technologies: ['JavaScript', 'Chrome Extension API', 'HTML/CSS', 'JSON'],
        impact: [
            'Improved QA workflow efficiency by 40%',
            'Reduced comment selection time',
            'Enhanced user experience for quality assurance team'
        ],
        architecture: 'Manifest V3 Chrome extension with content scripts and web accessible resources for seamless integration.'
    },
    'redelivery-agent': {
        title: 'Redelivery Agent',
        description: 'Web-based tool for processing redelivery Excel files with clean separation of UI and business logic.',
        features: [
            'Excel file processing with XLSX.js library',
            'Multiple file upload and processing',
            'Clean separation of UI and business logic',
            'Modular JavaScript architecture',
            'Export functionality for processed data',
            'Requestor alias and intake source management'
        ],
        technologies: ['JavaScript', 'HTML/CSS', 'XLSX.js', 'File API'],
        impact: [
            'Streamlined redelivery file processing',
            'Reduced manual data entry errors',
            'Improved data consistency across workflows'
        ],
        architecture: 'Client-side web application with modular JavaScript design and Excel processing capabilities.'
    },
    'filemaster': {
        title: 'FileMaster',
        description: 'Python utility for advanced file management and processing operations, streamlining file organization tasks.',
        features: [
            'Advanced file management operations',
            'Batch processing capabilities',
            'File organization and sorting',
            'Automated file operations',
            'Error handling and logging'
        ],
        technologies: ['Python', 'File System APIs', 'OS Module'],
        impact: [
            'Automated repetitive file operations',
            'Improved file organization efficiency',
            'Reduced manual file management tasks'
        ],
        architecture: 'Python script with modular functions for various file operations and comprehensive error handling.'
    },
    'timestamps-converter': {
        title: 'TimeStamps Converter',
        description: 'Specialized tool for converting and processing timestamp formats in media files, essential for subtitle workflows.',
        features: [
            'Multiple timestamp format support',
            'Batch conversion capabilities',
            'Media file timestamp processing',
            'Format validation and error checking',
            'Subtitle synchronization support'
        ],
        technologies: ['Python', 'Regular Expressions', 'File I/O'],
        impact: [
            'Automated timestamp conversion processes',
            'Improved subtitle synchronization accuracy',
            'Reduced manual timestamp editing time'
        ],
        architecture: 'Python utility with regex-based parsing and conversion algorithms for various timestamp formats.'
    },
    'proxy-generation': {
        title: 'Proxy Generation Tool',
        description: 'Template for proxy generation processes, including SOPs and Excel template.',
        features: [
            'Excel template for partner support',
            'Standard Operating Procedures (SOPs)',
            'Partner support workflow template',
            'Process standardization tool'
        ],
        technologies: ['Microsoft Excel', 'Microsoft Word'],
        impact: [
            'Standardized proxy generation processes',
            'Improved partner support efficiency',
            'Reduced process variation and errors'
        ],
        architecture: 'System based on standardized template and comprehensive process documentation.'
    }
};

// Show localization projects
function showLocalizationProjects() {
    const t = window.currentLocaleData || locales.en;
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <h2>${t['modal.localization.title'] || 'Localization Projects Portfolio'}</h2>
        <p class="project-description">${t['modal.localization.description'] || '40+ video game localization projects translated to Italian (it-IT)'}</p>
        
        <h3>${t['modal.localization.vipProjectsTitle'] || 'VIP Projects'}</h3>
        <div class="localization-projects">
            <div class="project-item vip-project">
                <h4>Dragon's Dogma II</h4>
                <p><strong>${t['modal.localization.client'] || 'Client'}:</strong> Capcom</p>
                <p><strong>${t['modal.localization.genre'] || 'Genre'}:</strong> ${t['modal.localization.dragons.genre'] || 'Fantasy RPG'}</p>
                <p><strong>${t['modal.localization.scope'] || 'Scope'}:</strong> ${t['modal.localization.dragons.scope'] || 'Full game localization including dialogue, UI, and narrative elements'}</p>
            </div>
            <div class="project-item vip-project">
                <h4>Super Mario Party Jamboree</h4>
                <p><strong>${t['modal.localization.client'] || 'Client'}:</strong> Nintendo</p>
                <p><strong>${t['modal.localization.genre'] || 'Genre'}:</strong> ${t['modal.localization.mario.genre'] || 'Party Game'}</p>
                <p><strong>${t['modal.localization.scope'] || 'Scope'}:</strong> ${t['modal.localization.mario.scope'] || 'Complete localization with focus on family-friendly content and accessibility'}</p>
            </div>
        </div>
        
        <h3>${t['modal.localization.additionalTitle'] || 'Additional Projects'}</h3>
        <p>${t['modal.localization.additionalText'] || '38+ other video game localization projects across various genres including:'}</p>
        <ul class="genre-list">
            <li>${t['modal.localization.genre1'] || 'Action/Adventure Games'}</li>
            <li>${t['modal.localization.genre2'] || 'Role-Playing Games (RPGs)'}</li>
            <li>${t['modal.localization.genre3'] || 'Strategy Games'}</li>
            <li>${t['modal.localization.genre4'] || 'Casual/Family Games'}</li>
            <li>${t['modal.localization.genre5'] || 'Mobile Games'}</li>
        </ul>
        
        <h3>${t['modal.localization.specializationsTitle'] || 'Specializations'}</h3>
        <div class="specializations">
            <span class="spec-tag">${t['modal.localization.spec1'] || 'Video Game Localization'}</span>
            <span class="spec-tag">${t['modal.localization.spec2'] || 'Cultural Adaptation'}</span>
            <span class="spec-tag">${t['modal.localization.spec3'] || 'UI/UX Translation'}</span>
            <span class="spec-tag">${t['modal.localization.spec4'] || 'Character Dialogue'}</span>
            <span class="spec-tag">${t['modal.localization.spec5'] || 'Quality Assurance'}</span>
        </div>
    `;

    const projectModal = document.getElementById('project-modal');
    projectModal.classList.add('modal-group-3');
    projectModal.classList.remove('modal-group-1');
    projectModal.style.display = 'block';
}

// Show project details in modal
function showProjectDetails(projectId) {
    const project = projectDetails[projectId];
    if (!project) return;

    // Helper function to get translation with fallback
    const t = (key, fallback) => {
        return (window.currentLocaleData && window.currentLocaleData[key]) || fallback;
    };

    const title = t(`projects.${projectId}.title`, project.title);
    const description = t(`projects.${projectId}.description`, project.description);
    const features = t(`projects.${projectId}.features`, project.features) || [];
    const technologies = t(`projects.${projectId}.technologies`, project.technologies) || [];
    const impact = t(`projects.${projectId}.impact`, project.impact) || [];
    const architecture = t(`projects.${projectId}.architecture`, project.architecture) || '';

    const keyFeaturesHeading = t(`projects.${projectId}.keyFeaturesHeading`, 'Key Features');
    const technologiesHeading = t(`projects.${projectId}.technologiesHeading`, 'Technologies Used');
    const impactHeading = t(`projects.${projectId}.impactHeading`, 'Impact & Results');
    const architectureHeading = t(`projects.${projectId}.architectureHeading`, 'Architecture');

    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <h2>${title}</h2>
        <p class="project-description">${description}</p>
        
        <h3>${keyFeaturesHeading}</h3>
        <ul class="feature-list">
            ${features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
        
        <h3>${technologiesHeading}</h3>
        <div class="tech-tags">
            ${technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
        
        <h3>${impactHeading}</h3>
        <ul class="impact-list">
            ${impact.map(i => `<li>${i}</li>`).join('')}
        </ul>
        
        <h3>${architectureHeading}</h3>
        <p class="architecture-description">${architecture}</p>
    `;

    const projectModal = document.getElementById('project-modal');
    projectModal.classList.add('modal-group-1');
    projectModal.classList.remove('modal-group-3');
    projectModal.style.display = 'block';
    document.body.classList.add('modal-open');
    document.documentElement.classList.add('modal-open');
}

// Close modal functionality
document.querySelector('.close').addEventListener('click', function () {
    const projectModal = document.getElementById('project-modal');
    projectModal.classList.remove('modal-group-1', 'modal-group-3');
    projectModal.style.display = 'none';
    document.body.classList.remove('modal-open');
    document.documentElement.classList.remove('modal-open');
});

window.addEventListener('click', function (event) {
    const modal = document.getElementById('project-modal');
    if (event.target === modal) {
        modal.classList.remove('modal-group-1', 'modal-group-3');
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
        document.documentElement.classList.remove('modal-open');
    }
});

// Add some dynamic styling for modal content
const style = document.createElement('style');
style.textContent = `
    .project-description {
        font-size: 1.1rem;
        color: var(--text-light);
        margin-bottom: 2rem;
        line-height: 1.6;
    }
    
    .modal-content h2 {
        color: var(--text-secondary);
        margin-bottom: 1rem;
        font-size: 2rem;
    }
    
    .modal-content h3 {
        color: var(--text-secondary);
        margin: 2rem 0 1rem 0;
        font-size: 1.3rem;
    }
    
    .feature-list, .impact-list {
        margin-bottom: 1.5rem;
        padding-left: 1.5rem;
    }
    
    .feature-list li, .impact-list li {
        margin-bottom: 0.5rem;
        color: var(--text-primary);
        line-height: 1.5;
    }
    
    .tech-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 1.5rem;
    }
    
    .tech-tag {
        background: var(--chip-bg) !important;
        color: var(--chip-text) !important;
        border: 1px solid var(--chip-border) !important;
        padding: 6px 12px;
        border-radius: 15px;
        font-size: 0.9rem;
        font-weight: 500;
    }
    
    .architecture-description {
        color: var(--text-light);
        line-height: 1.6;
        font-style: italic;
    }
    
    .localization-projects {
        margin-bottom: 2rem;
    }
    
    .project-item {
        background: var(--card-bg);
        padding: 1.5rem;
        border-radius: 10px;
        margin-bottom: 1rem;
        border-left: 4px solid var(--accent-color);
    }
    
    .project-item h4 {
        color: var(--text-secondary);
        margin-bottom: 0.75rem;
        font-size: 1.2rem;
    }
    
    .project-item p {
        margin-bottom: 0.5rem;
        color: var(--text-primary);
    }
    
    .genre-list {
        margin-bottom: 2rem;
        padding-left: 1.5rem;
    }
    
    .genre-list li {
        margin-bottom: 0.5rem;
        color: var(--text-primary);
    }
    
    .specializations {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }
    
    .spec-tag {
        background: var(--chip-bg) !important;
        color: var(--chip-text) !important;
        border: 1px solid var(--chip-border) !important;
        padding: 6px 12px;
        border-radius: 15px;
        font-size: 0.9rem;
        font-weight: 500;
    }
`;
document.head.appendChild(style);

// Add scroll effect to navbar
window.addEventListener('scroll', function () {
    setNavbarStyles();
});

// Profile picture toggle functionality
document.addEventListener('DOMContentLoaded', function () {
    const profileImg = document.querySelector('.profile-picture img');
    if (profileImg) {
        let isColored = false;
        profileImg.addEventListener('click', function () {
            isColored = !isColored;
            this.style.filter = isColored ? 'grayscale(0%)' : 'grayscale(100%)';
        });
    }
});

// Add animation on scroll for project cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe project cards when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Contact form modal functionality
document.addEventListener('DOMContentLoaded', function () {
    const contactFormBtn = document.getElementById('contact-form-btn');
    const contactModal = document.getElementById('contact-modal');
    const contactModalClose = document.querySelector('.contact-modal-close');
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    function getToastContainer() {
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            container.setAttribute('aria-live', 'polite');
            container.setAttribute('aria-atomic', 'true');
            document.body.appendChild(container);
        }
        return container;
    }

    function showToast(message, type) {
        const container = getToastContainer();
        const toast = document.createElement('div');
        const toastType = type === 'error' ? 'error' : 'success';
        const iconText = toastType === 'error' ? '!' : 'OK';

        toast.className = `toast toast-${toastType}`;
        toast.setAttribute('role', toastType === 'error' ? 'alert' : 'status');
        toast.innerHTML = `
            <span class="toast-icon" aria-hidden="true">${iconText}</span>
            <span class="toast-message">${message}</span>
            <button class="toast-close" type="button" aria-label="Dismiss notification">x</button>
        `;

        container.appendChild(toast);
        requestAnimationFrame(() => toast.classList.add('is-visible'));

        const closeBtn = toast.querySelector('.toast-close');
        const removeToast = () => {
            toast.classList.remove('is-visible');
            toast.addEventListener('transitionend', () => toast.remove(), { once: true });
        };

        const timer = setTimeout(removeToast, 4500);
        closeBtn.addEventListener('click', () => {
            clearTimeout(timer);
            removeToast();
        });
    }

    // Open contact modal
    if (contactFormBtn) {
        contactFormBtn.addEventListener('click', function () {
            contactModal.style.display = 'block';
            document.body.classList.add('modal-open');
            document.documentElement.classList.add('modal-open');
        });
    }

    // Function to reset form and clear error states
    function resetContactForm() {
        contactForm.reset();
        formStatus.innerHTML = '';
        // Clear all error states
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('has-error');
        });
        document.querySelectorAll('.error-message').forEach(error => {
            error.textContent = '';
        });
    }

    // Close contact modal
    if (contactModalClose) {
        contactModalClose.addEventListener('click', function () {
            resetContactForm();
            contactModal.style.display = 'none';
            document.body.classList.remove('modal-open');
            document.documentElement.classList.remove('modal-open');
        });
    }

    // Close contact modal when clicking outside
    window.addEventListener('click', function (event) {
        if (event.target === contactModal) {
            resetContactForm();
            contactModal.style.display = 'none';
        }
    });

    // Form validation functions
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validateField(fieldId, minLength) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(fieldId + 'Error');
        const formGroup = field.closest('.form-group');
        const t = window.currentLocaleData || locales.en;
        let isValid = true;
        let errorMsg = '';

        if (fieldId === 'email') {
            if (!field.value.trim()) {
                isValid = false;
                errorMsg = t['contact.validation.emailRequired'] || 'Email is required';
            } else if (!validateEmail(field.value)) {
                isValid = false;
                errorMsg = t['contact.validation.email'] || 'Please enter a valid email address.';
            }
        } else {
            if (!field.value.trim()) {
                isValid = false;
                errorMsg = t[`contact.validation.${fieldId}Required`] || `${fieldId.charAt(0).toUpperCase() + fieldId.slice(1)} is required`;
            } else if (field.value.length < minLength) {
                isValid = false;
                errorMsg = t[`contact.validation.${fieldId}`] || `${fieldId.charAt(0).toUpperCase() + fieldId.slice(1)} must be at least ${minLength} characters`;
            }
        }

        if (isValid) {
            formGroup.classList.remove('has-error');
            errorElement.textContent = '';
        } else {
            formGroup.classList.add('has-error');
            errorElement.textContent = errorMsg;
        }

        return isValid;
    }

    // Real-time validation
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const messageField = document.getElementById('message');

    if (nameField) {
        nameField.addEventListener('blur', () => validateField('name', 3));
        nameField.addEventListener('input', () => {
            if (nameField.closest('.form-group').classList.contains('has-error')) {
                validateField('name', 3);
            }
        });
    }

    if (emailField) {
        emailField.addEventListener('blur', () => validateField('email', 0));
        emailField.addEventListener('input', () => {
            if (emailField.closest('.form-group').classList.contains('has-error')) {
                validateField('email', 0);
            }
        });
    }

    if (messageField) {
        messageField.addEventListener('blur', () => validateField('message', 10));
        messageField.addEventListener('input', () => {
            if (messageField.closest('.form-group').classList.contains('has-error')) {
                validateField('message', 10);
            }
        });
    }

    // Privacy modal logic
    const privacyLink = document.getElementById('privacy-link');
    const privacyModal = document.getElementById('privacy-modal');
    const privacyModalCloses = document.querySelectorAll('.privacy-modal-close');

    if (privacyLink && privacyModal) {
        privacyLink.addEventListener('click', function (e) {
            e.preventDefault();
            privacyModal.style.display = 'block';
            document.body.classList.add('modal-open');
            document.documentElement.classList.add('modal-open');
        });
    }

    if (privacyModalCloses) {
        privacyModalCloses.forEach(close => {
            close.addEventListener('click', function () {
                privacyModal.style.display = 'none';
                document.body.classList.remove('modal-open');
                document.documentElement.classList.remove('modal-open');
            });
        });
    }

    // Close privacy modal when clicking outside
    window.addEventListener('click', function (event) {
        if (event.target === privacyModal) {
            privacyModal.style.display = 'none';
            document.body.classList.remove('modal-open');
            document.documentElement.classList.remove('modal-open');
        }
    });

    // Handle form submission
    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            // Validate all fields before submission
            const isNameValid = validateField('name', 3);
            const isEmailValid = validateField('email', 0);
            const isMessageValid = validateField('message', 10);

            // If any field is invalid, stop submission
            if (!isNameValid || !isEmailValid || !isMessageValid) {
                return;
            }

            // Get form data
            const formData = new FormData(contactForm);
            const t = window.currentLocaleData || locales.en;

            // Show loading state
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;

            // Get localized loading text
            const loadingText = t['contact.sending'] || 'Sending...';
            submitBtn.textContent = loadingText;
            formStatus.innerHTML = '';

            try {
                // Submit to Formspree
                const response = await fetch('https://formspree.io/f/xovgkbvw', {
                    method: 'POST',
                    body: formData,
                    mode: 'no-cors'
                });

                // With no-cors mode, if fetch completes without error, the form was submitted
                // Formspree processes it server-side regardless of visible response
                // Success message (localized)
                const successMsg = t['contact.successMessage'] || 'Message sent successfully! I\'ll get back to you soon.';
                showToast(successMsg, 'success');

                contactForm.reset();
                // Clear any error states
                document.querySelectorAll('.form-group').forEach(group => {
                    group.classList.remove('has-error');
                });
                document.querySelectorAll('.error-message').forEach(error => {
                    error.textContent = '';
                });

                // Close modal after a short delay
                setTimeout(() => {
                    contactModal.style.display = 'none';
                }, 3000);
            } catch (error) {
                console.error('Error:', error);
                const errorMsg = t['contact.errorMessage'] || t['contact.generalError'] || 'An error occurred. Please try again.';
                showToast(errorMsg, 'error');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        });
    }
});