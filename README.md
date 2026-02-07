# Marco Tofani - Portfolio Website

A modern, responsive portfolio website showcasing automation tools and full-stack development projects created for Prime Video workflows.

🌐 **Live Site**: [https://marcotof.github.io/](https://marcotof.github.io/)

## Features

- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices with hamburger menu
- **Permanent Dark Mode**: Always-on dark theme for consistent visuals
- **Hamburger-only Navigation**: iOS-inspired open/close animation across devices
- **Multi-language Support**: English, Italian, and Spanish controlled by URL paths
  - **Desktop & Mobile**: Full language names (English, Italiano, Espanol)
- **URL-based Language Routing**: `/` for English, `/it/` for Italian, `/es/` for Spanish
- **Interactive Project Showcase**: Detailed project modals with features, technologies, and impact metrics
- **Professional Timeline**: Career journey with current role highlighted
- **Contact Form Modal**: Localized contact form integrated with Formspree for direct email submissions, with comprehensive client-side validation (email format, character requirements) and localized error messages in all supported languages
- **Downloadable Resume**: Direct download link for Marco Tofani's resume
- **Modern UI/UX**: Tech-inspired layout with a four-group card system and smooth animations
- **Professional Presentation**: Optimized for recruiters and technical managers
- **SEO Optimization**: Open Graph meta tags for social media sharing, Schema.json structured data for search engines, sitemap.xml, and robots.txt for improved discoverability

## Featured Demos

Three production automation tools with live video demonstrations:

### 🎬 Video Demonstrations
- **Redelivery Hub**: Comprehensive automation platform (90% reduction in manual work)
- **LQA Tool Extension**: Chrome extension for workflow enhancement (40% QA efficiency improvement)
- **Redelivery Agent**: Web-based Excel processing tool (eliminates manual data entry errors)

All demo videos are embedded in the "Demos" section of the portfolio with full responsive support.

## Projects Highlighted

### 🏆 Redelivery Hub (Featured)
Comprehensive automation platform for Prime Video redelivery workflows with:
- Multi-tool automation platform
- Selenium WebDriver automation
- Real-time status tracking
- File processing and validation

### 🔧 LQA Tool Extension
Chrome extension enhancing LQA Tool workflow efficiency

### 📊 Redelivery Agent
Web-based Excel file processing tool with modular architecture

### 🛠️ FileMaster & TimeStamps Converter
Python utilities for file management and timestamp processing

### 📋 Proxy Generation Tools
Documentation and templates for partner support workflows

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Styling**: CSS Variables for theming, Modern CSS Grid/Flexbox, Custom animations
- **Dark Mode**: Always-on theme using CSS variables
- **Internationalization**: Embedded translations in JavaScript
- **Icons**: Font Awesome 6
- **Fonts**: Space Grotesk + IBM Plex Mono (Google Fonts)
- **Responsive**: Mobile-first design with centered hero layout

## File Structure

```
portfolio-website/
├── index.html                       # Main HTML structure
├── styles.css                       # CSS styling with dark mode variables
├── script.js                        # JavaScript functionality (dark mode, mobile menu, URL-based i18n)
├── locales.js                       # Embedded translations (en, it, es)
├── it/                              # Italian page (URL: /it/)
│   └── index.html
├── es/                              # Spanish page (URL: /es/)
│   └── index.html
├── Marco Tofani_Resume.pdf          # Downloadable resume
├── profile-picture.jpg              # Profile image
├── dragons-dogma-2.jpg              # VIP project image
├── super-mario-party-jamboree.jpg   # VIP project image
├── poster-redelivery-hub.png        # Poster image for Redelivery Hub demo
├── poster-lqa-extension.png         # Poster image for LQA Tool Extension demo
├── poster-redelivery-agent.png      # Poster image for Redelivery Agent demo
├── demo-redelivery-hub.mp4          # Redelivery Hub video demo
├── demo-lqa-extension.mp4           # LQA Tool Extension video demo
├── demo-redelivery-agent.mp4        # Redelivery Agent video demo
├── sitemap.xml                      # XML sitemap for search engine crawling
├── robots.txt                       # Search engine crawler instructions
└── README.md                        # This file
```

## Setup Instructions

1. **Local Development**:
   - Open `index.html` in any modern web browser
   - No build process required - pure HTML/CSS/JS

2. **Deployment Options**:
   - **GitHub Pages**: Push to GitHub and enable Pages
   - **Netlify**: Drag and drop the folder to Netlify
   - **Personal Domain**: Upload files to web hosting service

## SEO & Discoverability

This portfolio includes comprehensive SEO optimizations to improve visibility in recruiter searches and social media sharing:

### Open Graph Meta Tags
- Professional previews when shared on LinkedIn, Twitter, and other social platforms
- Displays your name, description, and profile picture thumbnail
- Enhances click-through rates from social sharing

### Schema.json Structured Data
- Machine-readable profile information using Schema.org Person schema
- Tells search engines and recruiter automation systems:
  - Your name, email, job title, and location
  - Languages you know (Italian, English, Spanish)
  - Core skills and expertise areas
  - LinkedIn and GitHub profiles

### Sitemap.xml
- Helps search engines discover and index all portfolio sections
- Lists priority levels for different pages (homepage highest priority)
- Enables efficient crawling of your entire site

### Robots.txt
- Guides search engine crawlers on what to index
- Links search engines to your sitemap
- Allows all bots to crawl your portfolio

### Hreflang
- Declares language alternates for EN/IT/ES
- Helps search engines show the correct language version

### Impact on Discovery
These optimizations improve:
- **Search Visibility**: Rank higher for searches like "localization automation developer", "game localization specialist", "polyglot developer"
- **Social Credibility**: Professional appearance when shared on LinkedIn and Twitter
- **Recruiter Automation**: Better matching in automated recruiter systems and ATS platforms
- **Search Engine Indexing**: Faster and more complete indexing of your portfolio

## Customization

### Adding New Projects
1. Add project card HTML in the `projects-grid` section
2. Add project details to the `projectDetails` object in `script.js`
3. Update skills section if new technologies are used

### Updating Contact Information
- Modify the contact links in the contact section
- Update email and profile URLs as needed

### Styling Changes
- Colors: Update CSS custom properties in `styles.css`
- Fonts: Change Google Fonts import and font-family declarations
- Layout: Modify grid and flexbox properties

## Performance Features

- **Optimized Loading**: Minimal external dependencies
- **Smooth Animations**: CSS transitions and JavaScript scroll effects
- **Mobile Responsive**: Optimized for all device sizes
- **Fast Loading**: Lightweight codebase with efficient CSS

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Responsive design optimized

## Deployment

### GitHub Pages (Recommended)
1. Create new repository: `your-username.github.io`
2. Upload all files to the repository
3. Enable GitHub Pages in repository settings
4. Access at: `https://your-username.github.io`

### Netlify
1. Visit [netlify.com](https://netlify.com)
2. Drag and drop the portfolio-website folder
3. Get instant deployment with custom domain options

### Custom Domain
1. Purchase domain from registrar
2. Upload files to web hosting service
3. Configure DNS settings

## Recent Updates

### v1.3 - URL-based i18n + Visual System Refresh (February 7, 2026)

#### 🎨 UI Improvements
- **Permanent Dark Mode**: Removed the toggle and enforced a consistent dark theme
- **Hamburger-only Header**: Single navigation pattern across desktop and mobile
- **Hero Layout**: Centered hero content with a 4-button desktop row and 2x2 mobile grid
- **Card System**: Four color groups applied across sections for consistent hierarchy
  - Group 1: Home + Contact
  - Group 2: About + Timeline + Skills
  - Group 3: Awards + Localization
  - Group 4: Projects + Demos
- **Contact UX**: Stronger button styling and cleaner contact modal presentation

#### 🌍 Localization Updates
- **URL-based Language Routing Only**: No browser auto-detect or stored preference
- **Menu Language Selector**: Full language names in pill buttons

#### 🔍 SEO
- **Hreflang Tags**: Explicit alternates for EN/IT/ES
- **Sitemap + Robots**: Confirmed and up to date

## Contact Form

### Features
- **Modal Dialog**: Non-intrusive contact form that opens in a modal when clicking the email button
- **Formspree Integration**: Direct email delivery to tofanimarco16@gmail.com using Formspree
- **Full Localization**: Form labels, placeholders, and feedback messages in English, Italian, and Spanish
- **Client-side Validation**: Required field validation before submission
- **User Feedback**: Loading states, success/error messages all localized
- **Responsive Design**: Works seamlessly on all devices

### Validation Rules
- **Name**: Minimum 3 characters required
- **Email**: Must be a valid email format (user@domain.com)
- **Message**: Minimum 10 characters required

### How to Use
1. Click the email button in the contact section
2. Fill in your name, email, and message
3. Real-time validation provides immediate feedback as you type
4. Error messages appear below fields for invalid inputs
5. Click "Send Message" to submit (only enabled when all fields are valid)
6. Receive localized validation feedback and confirmation message in the selected language

### Customization
To use a different Formspree endpoint:
1. Create a new form at [formspree.io](https://formspree.io)
2. Update the endpoint URL in `script.js` (line with `fetch('https://formspree.io/f/...')`)

## Future Enhancements

- [ ] Include project screenshots/demos
- [ ] Add blog section for technical articles
- [ ] Add project filtering by technology
- [ ] Additional language support
- [ ] Form submission notifications/confirmations

## Contact

For questions about this portfolio or collaboration opportunities:
- **Email**: tofanimarco16@gmail.com
- **LinkedIn**: [linkedin.com/in/marco-tofani](https://www.linkedin.com/in/marco-tofani/)

---

*Built with ❤️ for showcasing automation engineering excellence at Prime Video*

## Localization (i18n)

This site includes a client-side localization system with translations embedded directly in JavaScript. Current languages: English (`en`), Italian (`it`), and Spanish (`es`).

**How it works:**
- All translations are embedded in `locales.js` to avoid CORS issues on GitHub Pages
- `locales.js` is organized with clear section comments for each language (English, Italian, Spanish)
- Elements to translate are marked with `data-i18n="key"` attributes in `index.html`
- **URL-based Routing Only**: Language is determined by `/`, `/it/`, `/es/`
- The language selector lives in the hamburger menu and uses full language names
- No browser auto-detection or `localStorage` persistence

**Adding/updating translations:**
1. Open `locales.js` to see the `locales` object structure
2. Add or update keys in all three language objects (`en`, `it`, `es`)
3. For new translatable elements in `index.html`, add a `data-i18n` attribute (e.g., `data-i18n="section.newKey"`)
4. Add the corresponding key-value pairs to all language objects in `locales.js`

**Contact Form Translation Keys:**
- `contact.formTitle` - Form heading
- `contact.formSubtitle` - Form description
- `contact.name` - Name field label
- `contact.emailField` - Email field label
- `contact.message` - Message field label
- `contact.send` - Submit button text
- `contact.sending` - Loading state text
- `contact.successMessage` - Success notification
- `contact.errorMessage` - Submission error message
- `contact.generalError` - General error message

**Form Validation Translation Keys:**
- `contact.validation.name` - Name field error (min 3 characters)
- `contact.validation.email` - Email format validation error
- `contact.validation.emailRequired` - Email required error
- `contact.validation.message` - Message field error (min 10 characters)

**Testing:**
- Simply open `index.html` in any browser - no server required!
- Use the language selector in the hamburger menu to test translations
- Check browser console for any missing translation keys

**Notes:**
- Embedded approach eliminates CORS issues with GitHub Pages
- For complex pluralization or interpolation, consider libraries like `i18next`
- Language alternates are declared via `hreflang` tags