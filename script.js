// Dark mode toggle
const darkModeToggle = document.querySelector('.dark-mode-toggle');

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

// Check for saved dark mode preference or default to light mode
const currentMode = localStorage.getItem('darkMode');
if (currentMode === 'enabled') {
    document.body.classList.add('dark-mode');
}

// Initial navbar sync
setNavbarStyles();

darkModeToggle?.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    // Update localStorage
    if (isDarkMode) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }
    
    // Update navbar background immediately
    setNavbarStyles();
});

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

document.addEventListener('DOMContentLoaded', function() {
    let lang = localStorage.getItem('lang');
    
    // If no language is saved, detect browser language
    if (!lang) {
        const browserLang = navigator.language || navigator.userLanguage;
        // Extract the base language code (e.g., 'en' from 'en-US', 'it' from 'it-IT')
        const langCode = browserLang.split('-')[0].toLowerCase();
        
        // Use browser language if supported, otherwise default to English
        lang = supportedLangs.includes(langCode) ? langCode : 'en';
    } else if (!supportedLangs.includes(lang)) {
        // If saved language is not supported, default to English
        lang = 'en';
    }

    // Load locale first
    loadLocale(lang);

    const select = document.getElementById('lang-select');
    if (select) {
        // set select to current language
        select.value = lang;
        
        // Update language selector options based on screen size
        updateLanguageSelectorText();
        
        // Update on window resize
        window.addEventListener('resize', updateLanguageSelectorText);
        
        select.addEventListener('change', function() {
            const chosen = this.value;
            if (!supportedLangs.includes(chosen)) return;
            localStorage.setItem('lang', chosen);
            loadLocale(chosen);
            syncLanguageSelectorFlag();
        });
    }

    // Check and reveal future timeline items based on date
    checkFutureRoleReveal();
});

// Function to update language selector text based on screen width
function updateLanguageSelectorText() {
    const select = document.getElementById('lang-select');
    if (!select) return;
    
    const isMobile = window.innerWidth <= 800;
    const options = select.querySelectorAll('option');
    
    // Language code mapping for desktop
    const langCodes = {
        'en': 'EN',
        'it': 'IT',
        'es': 'ES'
    };
    
    options.forEach(option => {
        const langValue = option.value;
        const langName = option.dataset.langName;
        const flag = option.dataset.flag;
        
        if (isMobile) {
            // Mobile: show flag + language name in dropdown options
            // The selected value will show only the flag due to CSS overflow: hidden
            option.textContent = flag + ' ' + langName;
        } else {
            // Desktop: show language code (e.g., "EN", "IT", "ES")
            option.textContent = langCodes[langValue] || langValue.toUpperCase();
        }
    });

    syncLanguageSelectorFlag();
}

// Keep the closed selector showing only the selected flag
function syncLanguageSelectorFlag() {
    const select = document.getElementById('lang-select');
    if (!select) return;
    const wrapper = select.closest('.language-selector');
    const selected = select.options[select.selectedIndex];
    if (wrapper && selected) {
        wrapper.dataset.selectedFlag = selected.dataset.flag || '';
    }
}

// Function to check and reveal future timeline items
function checkFutureRoleReveal() {
    const futureItems = document.querySelectorAll('.timeline-item.future-role');
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to midnight for accurate date comparison
    
    futureItems.forEach(item => {
        const revealDateStr = item.dataset.revealDate;
        if (revealDateStr) {
            const revealDate = new Date(revealDateStr);
            revealDate.setHours(0, 0, 0, 0);
            
            // If today is on or after the reveal date, reveal the item
            if (today >= revealDate) {
                item.classList.add('revealed');
                item.classList.add('current');
                
                // Remove 'current' class from all other timeline items
                document.querySelectorAll('.timeline-item').forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('current');
                    }
                });
            } else {
                // Before reveal date, make the previous role (Prime Video) current
                const primeVideoItem = document.querySelector('.timeline-item:nth-last-child(2)');
                if (primeVideoItem && !primeVideoItem.classList.contains('future-role')) {
                    primeVideoItem.classList.add('current');
                }
            }
        }
    });
}

// Project details data
const projectDetails = {
    'redelivery-hub': {
        title: 'Redelivery Hub',
        description: 'A comprehensive automation platform that revolutionizes Prime Video redelivery workflows through intelligent automation and real-time monitoring.',
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
        title: 'Proxy Generation Tools',
        description: 'Documentation and templates for proxy generation processes, including SOPs and Excel templates.',
        features: [
            'Comprehensive process documentation',
            'Excel templates for partner support',
            'Standard Operating Procedures (SOPs)',
            'Partner support workflow templates',
            'Process standardization tools'
        ],
        technologies: ['Microsoft Excel', 'Microsoft Word', 'Process Documentation'],
        impact: [
            'Standardized proxy generation processes',
            'Improved partner support efficiency',
            'Reduced process variation and errors'
        ],
        architecture: 'Document-based system with standardized templates and comprehensive process documentation.'
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
            <div class="project-item">
                <h4>Dragon's Dogma II</h4>
                <p><strong>${t['modal.localization.client'] || 'Client'}:</strong> Capcom</p>
                <p><strong>${t['modal.localization.genre'] || 'Genre'}:</strong> ${t['modal.localization.dragons.genre'] || 'Fantasy RPG'}</p>
                <p><strong>${t['modal.localization.scope'] || 'Scope'}:</strong> ${t['modal.localization.dragons.scope'] || 'Full game localization including dialogue, UI, and narrative elements'}</p>
            </div>
            <div class="project-item">
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
    
    document.getElementById('project-modal').style.display = 'block';
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

    document.getElementById('project-modal').style.display = 'block';
}

// Close modal functionality
document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('project-modal').style.display = 'none';
});

window.addEventListener('click', function(event) {
    const modal = document.getElementById('project-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Add some dynamic styling for modal content
const style = document.createElement('style');
style.textContent = `
    .project-description {
        font-size: 1.1rem;
        color: #64748b;
        margin-bottom: 2rem;
        line-height: 1.6;
    }
    
    .modal-content h2 {
        color: #1e293b;
        margin-bottom: 1rem;
        font-size: 2rem;
    }
    
    .modal-content h3 {
        color: #374151;
        margin: 2rem 0 1rem 0;
        font-size: 1.3rem;
    }
    
    .feature-list, .impact-list {
        margin-bottom: 1.5rem;
        padding-left: 1.5rem;
    }
    
    .feature-list li, .impact-list li {
        margin-bottom: 0.5rem;
        color: #475569;
        line-height: 1.5;
    }
    
    .tech-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 1.5rem;
    }
    
    .tech-tag {
        background: #374151 !important;
        color: white !important;
        padding: 6px 12px;
        border-radius: 15px;
        font-size: 0.9rem;
        font-weight: 500;
    }
    
    body:not(.dark-mode) .tech-tag {
        background: #1e293b !important;
        color: white !important;
    }
    
    .architecture-description {
        color: #64748b;
        line-height: 1.6;
        font-style: italic;
    }
    
    .localization-projects {
        margin-bottom: 2rem;
    }
    
    .project-item {
        background: #f8fafc;
        padding: 1.5rem;
        border-radius: 10px;
        margin-bottom: 1rem;
        border-left: 4px solid #374151;
    }
    
    body:not(.dark-mode) .project-item {
        background: #cbd5e1 !important;
        border-left: 4px solid #1e293b !important;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    
    .project-item h4 {
        color: #1e293b;
        margin-bottom: 0.75rem;
        font-size: 1.2rem;
    }
    
    .project-item p {
        margin-bottom: 0.5rem;
        color: #475569;
    }
    
    .genre-list {
        margin-bottom: 2rem;
        padding-left: 1.5rem;
    }
    
    .genre-list li {
        margin-bottom: 0.5rem;
        color: #475569;
    }
    
    .specializations {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }
    
    .spec-tag {
        background: #374151 !important;
        color: white !important;
        padding: 6px 12px;
        border-radius: 15px;
        font-size: 0.9rem;
        font-weight: 500;
    }
    
    body:not(.dark-mode) .spec-tag {
        background: #1e293b !important;
        color: white !important;
    }
`;
document.head.appendChild(style);

// Add scroll effect to navbar
window.addEventListener('scroll', function() {
    setNavbarStyles();
});

// Profile picture toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const profileImg = document.querySelector('.profile-picture img');
    if (profileImg) {
        let isColored = false;
        profileImg.addEventListener('click', function() {
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

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe project cards when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Contact form modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactFormBtn = document.getElementById('contact-form-btn');
    const contactModal = document.getElementById('contact-modal');
    const contactModalClose = document.querySelector('.contact-modal-close');
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    // Open contact modal
    if (contactFormBtn) {
        contactFormBtn.addEventListener('click', function() {
            contactModal.style.display = 'block';
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
        contactModalClose.addEventListener('click', function() {
            resetContactForm();
            contactModal.style.display = 'none';
        });
    }

    // Close contact modal when clicking outside
    window.addEventListener('click', function(event) {
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

    // Handle form submission
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
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
                formStatus.innerHTML = `<p class="success-message">${successMsg}</p>`;
                
                // Scroll to success message on mobile
                formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                
                contactForm.reset();
                // Clear any error states
                document.querySelectorAll('.form-group').forEach(group => {
                    group.classList.remove('has-error');
                });
                document.querySelectorAll('.error-message').forEach(error => {
                    error.textContent = '';
                });
                
                // Keep success message visible and close modal after 3 seconds
                setTimeout(() => {
                    contactModal.style.display = 'none';
                }, 3000);
            } catch (error) {
                console.error('Error:', error);
                const errorMsg = t['contact.generalError'] || 'An error occurred. Please try again.';
                formStatus.innerHTML = `<p class="error-message">${errorMsg}</p>`;
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        });
    }
});