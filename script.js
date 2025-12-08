// Dark mode toggle
const darkModeToggle = document.querySelector('.dark-mode-toggle');
const darkModeIcon = darkModeToggle?.querySelector('i');

// Check for saved dark mode preference or default to light mode
const currentMode = localStorage.getItem('darkMode');
if (currentMode === 'enabled') {
    document.body.classList.add('dark-mode');
    if (darkModeIcon) darkModeIcon.classList.replace('fa-moon', 'fa-sun');
}

darkModeToggle?.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    // Update icon
    if (document.body.classList.contains('dark-mode')) {
        darkModeIcon?.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('darkMode', 'enabled');
    } else {
        darkModeIcon?.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('darkMode', 'disabled');
    }
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a nav link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
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
            // For elements with child nodes (like links with icons), replace only text nodes
            let textNodeFound = false;
            for (let node of el.childNodes) {
                if (node.nodeType === Node.TEXT_NODE) {
                    node.textContent = val;
                    textNodeFound = true;
                    break;
                }
            }
            // If no text node found, set textContent directly
            if (!textNodeFound) {
                el.textContent = val;
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    let lang = localStorage.getItem('lang');
    
    // Always default to English if no preference is saved
    if (!lang || !supportedLangs.includes(lang)) {
        lang = 'en';
    }

    // Load locale first
    loadLocale(lang);

    const select = document.getElementById('lang-select');
    if (select) {
        // set select to current language
        select.value = lang;
        select.addEventListener('change', function() {
            const chosen = this.value;
            if (!supportedLangs.includes(chosen)) return;
            localStorage.setItem('lang', chosen);
            loadLocale(chosen);
        });
    }
});

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
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <h2>Localization Projects Portfolio</h2>
        <p class="project-description">40+ video game localization projects translated to Italian (it-IT)</p>
        
        <h3>VIP Projects</h3>
        <div class="localization-projects">
            <div class="project-item">
                <h4>Dragon's Dogma II</h4>
                <p><strong>Client:</strong> Capcom</p>
                <p><strong>Genre:</strong> Fantasy RPG</p>
                <p><strong>Scope:</strong> Full game localization including dialogue, UI, and narrative elements</p>
            </div>
            <div class="project-item">
                <h4>Super Mario Party Jamboree</h4>
                <p><strong>Client:</strong> Nintendo</p>
                <p><strong>Genre:</strong> Party Game</p>
                <p><strong>Scope:</strong> Complete localization with focus on family-friendly content and accessibility</p>
            </div>
        </div>
        
        <h3>Additional Projects</h3>
        <p>38+ other video game localization projects across various genres including:</p>
        <ul class="genre-list">
            <li>Action/Adventure Games</li>
            <li>Role-Playing Games (RPGs)</li>
            <li>Strategy Games</li>
            <li>Casual/Family Games</li>
            <li>Mobile Games</li>
        </ul>
        
        <h3>Specializations</h3>
        <div class="specializations">
            <span class="spec-tag">Video Game Localization</span>
            <span class="spec-tag">Cultural Adaptation</span>
            <span class="spec-tag">UI/UX Translation</span>
            <span class="spec-tag">Character Dialogue</span>
            <span class="spec-tag">Quality Assurance</span>
        </div>
    `;
    
    document.getElementById('project-modal').style.display = 'block';
}

// Show project details in modal
function showProjectDetails(projectId) {
    const project = projectDetails[projectId];
    if (!project) return;

    // Prefer localized project content when available
    const localized = (window.currentLocaleData && window.currentLocaleData.projects && window.currentLocaleData.projects[projectId]) || {};

    const title = localized.title || project.title;
    const description = localized.description || project.description;
    const features = localized.features || project.features || [];
    const technologies = localized.technologies || project.technologies || [];
    const impact = localized.impact || project.impact || [];
    const architecture = localized.architecture || project.architecture || '';

    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <h2>${title}</h2>
        <p class="project-description">${description}</p>
        
        <h3>${(localized.keyFeaturesHeading || 'Key Features')}</h3>
        <ul class="feature-list">
            ${features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
        
        <h3>${(localized.technologiesHeading || 'Technologies Used')}</h3>
        <div class="tech-tags">
            ${technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
        
        <h3>${(localized.impactHeading || 'Impact & Results')}</h3>
        <ul class="impact-list">
            ${impact.map(i => `<li>${i}</li>`).join('')}
        </ul>
        
        <h3>${(localized.architectureHeading || 'Architecture')}</h3>
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
        background: #374151;
        color: white;
        padding: 6px 12px;
        border-radius: 15px;
        font-size: 0.9rem;
        font-weight: 500;
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
        background: #374151;
        color: white;
        padding: 6px 12px;
        border-radius: 15px;
        font-size: 0.9rem;
        font-weight: 500;
    }
`;
document.head.appendChild(style);

// Add scroll effect to navbar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    if (window.scrollY > 100) {
        navbar.style.background = isDarkMode ? 'rgba(26, 26, 26, 0.98)' : 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = isDarkMode ? '0 2px 20px rgba(0,0,0,0.3)' : '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = isDarkMode ? 'rgba(26, 26, 26, 0.95)' : 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
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