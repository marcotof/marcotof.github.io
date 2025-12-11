# Marco Tofani - Portfolio Website

A modern, responsive portfolio website showcasing automation tools and full-stack development projects created for Prime Video workflows.

🌐 **Live Site**: [https://marcotof.github.io/](https://marcotof.github.io/)

## Features

- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices with hamburger menu
- **Dark Mode**: Toggle between light and dark themes with persistent preference
- **Multi-language Support**: English, Italian, and Spanish with embedded translations
- **Interactive Project Showcase**: Detailed project modals with features, technologies, and impact metrics
- **Contact Form Modal**: Localized contact form integrated with Formspree for direct email submissions
- **Downloadable Resume**: Direct download link for Marco Tofani's resume
- **Modern UI/UX**: Clean design with smooth animations and transitions
- **Professional Presentation**: Optimized for recruiters and technical managers

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
- **Dark Mode**: CSS variables with localStorage persistence
- **Internationalization**: Embedded JSON translations in JavaScript
- **Icons**: Font Awesome 6
- **Fonts**: Inter (Google Fonts)
- **Responsive**: Mobile-first design with hamburger navigation

## File Structure

```
portfolio-website/
├── index.html                    # Main HTML structure
├── styles.css                    # CSS styling with dark mode variables
├── script.js                     # JavaScript functionality (dark mode, mobile menu, i18n)
├── locales.js                    # Embedded translations (en, it, es)
├── Marco Tofani_Resume.pdf       # Downloadable resume
├── profile-picture.jpg           # Profile image
├── dragons-dogma-2.jpg           # VIP project image
├── super-mario-party-jamboree.jpg # VIP project image
└── README.md                     # This file
```

## Setup Instructions

1. **Local Development**:
   - Open `index.html` in any modern web browser
   - No build process required - pure HTML/CSS/JS

2. **Deployment Options**:
   - **GitHub Pages**: Push to GitHub and enable Pages
   - **Netlify**: Drag and drop the folder to Netlify
   - **Personal Domain**: Upload files to web hosting service

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

## Recent Updates (December 2025)

- ✅ **Dark Mode Toggle**: Persistent theme switching with CSS variables
- ✅ **Mobile Optimization**: Hamburger menu and responsive layouts with fixed timeline
- ✅ **Downloadable Resume**: Direct PDF download functionality
- ✅ **Embedded Translations**: Migrated from JSON files to JavaScript for CORS-free deployment
- ✅ **Complete Localization**: All sections fully translated (English, Italian, Spanish)
- ✅ **Project Modal Translations**: Features, technologies, and impact metrics translated
- ✅ **Technical Skills Translation**: Category headers and language proficiencies localized
- ✅ **Contact Form Modal**: Interactive contact form with Formspree integration for email submissions
- ✅ **Localized Form**: Contact form fully translated (English, Italian, Spanish) with localized feedback messages

## Contact Form

### Features
- **Modal Dialog**: Non-intrusive contact form that opens in a modal when clicking the email button
- **Formspree Integration**: Direct email delivery to tofanimarco16@gmail.com using Formspree
- **Full Localization**: Form labels, placeholders, and feedback messages in English, Italian, and Spanish
- **Client-side Validation**: Required field validation before submission
- **User Feedback**: Loading states, success/error messages all localized
- **Responsive Design**: Works seamlessly on all devices

### How to Use
1. Click the email button in the contact section
2. Fill in your name, email, and message
3. Click "Send Message" to submit
4. Receive confirmation message in the selected language

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
- Elements to translate are marked with `data-i18n="key"` attributes in `index.html`
- The language selector is located in the contact section with flag emojis (🇬🇧 English, 🇮🇹 Italiano, 🇪🇸 Español)
- Default language: English
- Current language is saved to `localStorage` for persistence across visits

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

**Testing:**
- Simply open `index.html` in any browser - no server required!
- Use the language selector in the contact section to test translations
- Check browser console for any missing translation keys

**Notes:**
- Embedded approach eliminates CORS issues with GitHub Pages
- For complex pluralization or interpolation, consider libraries like `i18next`
- For SEO optimization, consider pre-rendering separate language pages with `hreflang` tags