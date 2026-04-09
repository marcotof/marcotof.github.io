# Marco Tofani - Portfolio Website

A modern, responsive portfolio website showcasing automation tools and full-stack development projects created for Prime Video workflows.

**Live Site**: [https://marcotof.github.io/](https://marcotof.github.io/)

## Features

- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices with hamburger menu
- **Permanent Dark Mode**: Always-on dark theme for consistent visuals
- **Hamburger-only Navigation**: iOS-inspired open/close animation across devices
- **Desktop Scrollspy Dots**: Section-aware side navigation on larger screens for fast page traversal
- **Mobile Section Arrows**: Minimal up/down floating controls for quick section jumps on phones
- **Multi-language Support**: English, Italian, and Spanish controlled by URL paths
  - **Desktop & Mobile**: Full language names (English, Italiano, Español)
- **URL-based Language Routing**: `/` for English, `/it/` for Italian, `/es/` for Spanish
- **Interactive Project Showcase**: Detailed project modals with features, technologies, and impact metrics
- **Interactive Architecture Map**: Animated node graph with focus panel, layer filters, and outcome-based filtering
- **Professional Timeline**: Career journey with current role highlighted
- **Contact Form Modal**: Localized contact form integrated with Formspree for direct email submissions, with client-side validation and localized success/error notifications
- **Streamlined Hero CTAs**: Two action buttons in Home card (`Download Resume`, `Get In Touch`)
- **Touch-friendly Button States**: Hover effects scoped to hover-capable pointers to prevent sticky touch highlights
- **Downloadable Resume**: Direct download link for Marco Tofani's resume
- **Modern UI/UX**: Tech-inspired layout with a four-group card system and smooth animations
- **Professional Presentation**: Optimized for recruiters and technical managers
- **SEO Optimization**: Open Graph/Twitter image metadata, Schema.org JSON-LD structured data for search engines, sitemap.xml, and robots.txt for improved discoverability
- **Brand Assets**: Favicon package + branded social preview image configured across EN/IT/ES pages
- **Legal Compliance**: Localized footer with copyright notice and integrated Privacy Policy modal across all versions.

## Featured Demos

Three production automation tools with live video demonstrations:

### Video Demonstrations
- **Redelivery Hub**: Comprehensive automation platform (90% reduction in manual work)
- **LQA Tool Extension**: Chrome extension for workflow enhancement (40% QA efficiency improvement)
- **Redelivery Agent**: Web-based Excel processing tool (eliminates manual data entry errors)

All demo videos are embedded in the "Demos" section of the portfolio with full responsive support.

## Projects Highlighted

### Redelivery Hub (Featured)
Comprehensive automation platform for Prime Video redelivery workflows with:
- Multi-tool automation platform
- Selenium WebDriver automation
- Real-time status tracking
- File processing and validation

### LQA Tool Extension
Chrome extension enhancing LQA Tool workflow efficiency

### Redelivery Agent
Web-based Excel file processing tool with modular architecture

### FileMaster & TimeStamps Converter
Python utilities for file management and timestamp processing

### Proxy Generation Tools
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
├── favicon/                         # Brand icons + social preview assets
│   ├── favicon-96x96.png
│   ├── favicon.ico
│   ├── favicon.svg
│   └── og-image.png
├── Marco Tofani_Resume.pdf          # Downloadable resume
├── profile-picture-v2.jpg           # Profile image
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

## SEO & Discoverability

This portfolio includes comprehensive SEO optimizations to improve visibility in recruiter searches and social media sharing:

### Open Graph Meta Tags
- Professional previews when shared on LinkedIn, Twitter, and other social platforms
- Uses branded preview image (`favicon/og-image.png`) across EN/IT/ES pages
- Enhances click-through rates from social sharing

### Schema.org Structured Data (JSON-LD)
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

## Current Professional Info

- **Home CTA Structure**: Home card uses two secondary buttons: `Download Resume`, `Get In Touch`.
- **Current Role in Timeline**: Timeline highlights the current position: **Marketplace Operations Junior Specialist** at **Fever**.
- **Localization Consistency**: Role labels and timeline strings are updated across all languages (EN/IT/ES).
- **UI Micro-Polish**: Improved CTA readability on small screens and touch interaction behavior.

## Recent Updates

### v1.7 - Interactive Architecture Map (April 7, 2026)

#### New Architecture Card
- **Architecture Map Section**: Added a new "Project Architecture Map" card across EN/IT/ES pages with SVG-based interactive nodes and links.
- **Focus Details Panel**: Selecting a node updates localized title, summary, and connected outcomes.
- **Node Highlight UX**: Replaced broad rectangular focus feel with a dedicated circular ring around the selected node.

#### Filtering & Interaction
- **Node Layers Filters**: Projects, Skills, and Outcomes chips can be toggled to filter visible layers.
- **Connected Outcomes Filters**: Outcome chips are clickable and now support multi-selection.
- **Combined Filtering Logic**: Outcome filters work together with Node Layers filters for intersection-based results.
- **Manual Focus Control**: Removed auto-focus cycling so navigation is fully user-driven.

#### Visual Group Alignment
- **Group Assignment Update**: Architecture card now follows Group 2 styling (About + Timeline), while Technical Skills now follows Group 3 styling (Awards + Localization).
- **Filter Chip Theming**: Architecture filter chips were updated to a group-consistent green palette with clear selected states.

### v1.6 - Navigation, CTA Simplification & Brand Assets (March 6, 2026)

#### Navigation & Interaction
- **Desktop Scrollspy Navigation**: Added section-aware dot nav on desktop (`min-width: 1024px`).
- **Mobile Arrow Navigation**: Added contextual up/down controls on mobile (`max-width: 1023px`) with touch-friendly targets and accessible labels.
- **Touch Hover Fix**: Scoped hero hover effects to hover-capable pointers to prevent sticky white states on touch devices.

#### Home Card UX
- **CTA Simplification**: Reduced Home card buttons to two actions.
- **Button Order**: `Download Resume` -> `Get In Touch`.
- **Equal Visual Weight**: All Home card CTA buttons now use secondary styling.
- **Small-screen Readability**: Updated mobile CTA wrapping/padding for long localized labels (Italian/Spanish).

#### Branding & Metadata
- **Favicon Suite Integrated**: Added favicon, SVG icon, and social preview metadata across all language pages.
- **Install Hooks Removed**: Removed `apple-touch-icon` and `manifest` links from HTML heads to avoid app-install behavior on Android/iOS.
- **Social Preview Update**: `og:image` and `twitter:image` now point to `https://marcotof.github.io/favicon/og-image.png`.

### v1.5 - Privacy, UX & SEO Polish (February 21, 2026)

#### Legal & Privacy
- **Localized Footer**: Added a consistent footer with copyright and privacy links across all language versions (/it/, /es/, and root).
- **Privacy Policy**: Integrated a dedicated Privacy Policy modal to comply with GDPR-style standards for contact form data.

#### UX & Compatibility
- **Double Scrollbar Fix**: Refactored modal CSS to centralize scrolling on the overlay, eliminating the nested scrollbox issue.
- **Cross-Browser Scroll Locking**: Updated JS to lock both `html` and `body` overflow, ensuring a stable background experience across all mobile and desktop browsers (iOS Safari, Android Chrome, etc.).

#### SEO
- **Image Cache Busting**: Renamed profile image to `profile-picture-v2.jpg` and updated all meta/schema tags to force a refresh on Google Search results.
- **Sitemap Update**: Refreshed `lastmod` dates to trigger re-indexing.

### v1.4 - Filters + Contact Toasts (February 8, 2026)

#### UX Improvements
- **Project Filters**: Added Python and JavaScript filter chips for faster browsing
- **Contact Feedback**: Toast notifications for form success/error in all languages

### v1.3 - URL-based i18n + Visual System Refresh (February 7, 2026)

#### UI Improvements
- **Permanent Dark Mode**: Removed the toggle and enforced a consistent dark theme
- **Hamburger-only Header**: Single navigation pattern across desktop and mobile
- **Hero Layout**: Centered hero content with a 4-button desktop row and 2x2 mobile grid
- **Card System**: Four color groups applied across sections for consistent hierarchy
  - Group 1: Home + Contact
  - Group 2: About + Timeline + Skills
  - Group 3: Awards + Localization
  - Group 4: Projects + Demos
- **Contact UX**: Stronger button styling and cleaner contact modal presentation

#### Localization Updates
- **URL-based Language Routing Only**: No browser auto-detect or stored preference
- **Menu Language Selector**: Full language names in pill buttons

#### SEO
- **Hreflang Tags**: Explicit alternates for EN/IT/ES
- **Sitemap + Robots**: Confirmed and up to date

## Completed Improvements (February 8, 2026)

- [x] Added Python and JavaScript project filter chips
- [x] Added toast notifications for Formspree contact submissions
- [x] Localized contact success/error toasts in EN/IT/ES
- [x] Removed Excel tag from FileMaster project card
- [x] Removed Excel tag and "Excel Processing" from TimeStamps Converter card
- [x] Removed Excel tag and "Excel Processing" from Redelivery Agent card
- [x] Updated Proxy Generation Tool architecture copy across locales

## Contact Form

### Features
- **Modal Dialog**: Non-intrusive contact form that opens in a modal when clicking the email button
- **Formspree Integration**: Direct email delivery to tofanimarco16@gmail.com using Formspree
- **Full Localization**: Form labels, placeholders, and feedback messages in English, Italian, and Spanish
- **Client-side Validation**: Required field validation before submission
- **User Feedback**: Loading states plus toast success/error notifications (localized)
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

## Future Enhancements

- [ ] Include project screenshots/demos
- [ ] Add blog section for technical articles
- [ ] Additional language support

## Contact

For questions about this portfolio or collaboration opportunities:
- **Email**: tofanimarco16@gmail.com
- **LinkedIn**: [linkedin.com/in/marco-tofani](https://www.linkedin.com/in/marco-tofani/)

---


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