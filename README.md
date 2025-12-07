# Marco Tofani - Portfolio Website

A modern, responsive portfolio website showcasing automation tools and full-stack development projects created for Prime Video workflows.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Interactive Project Showcase**: Detailed project modals with features, technologies, and impact metrics
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

- **Frontend**: HTML5, CSS3, JavaScript
- **Styling**: Modern CSS Grid/Flexbox, Custom animations
- **Icons**: Font Awesome
- **Fonts**: Inter (Google Fonts)
- **Responsive**: Mobile-first design approach

## File Structure

```
portfolio-website/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and animations
├── script.js           # JavaScript functionality
└── README.md          # This file
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

## Future Enhancements

- [ ] Add dark mode toggle
- [ ] Include project screenshots/demos
- [ ] Add blog section for technical articles
- [ ] Implement contact form with backend
- [ ] Add project filtering by technology
- [ ] Include downloadable resume

## Contact

For questions about this portfolio or collaboration opportunities:
- **Email**: tofanimarco16@gmail.com
- **LinkedIn**: [linkedin.com/in/marco-tofani](https://www.linkedin.com/in/marco-tofani/)

---

*Built with ❤️ for showcasing automation engineering excellence at Prime Video*

## Localization (i18n)

This site includes a simple client-side localization system using one JSON file per language stored in the `locales/` folder. Current languages: English (`en`), Italian (`it`) and Spanish (`es`).

How it works:
- Translation files: `locales/en.json`, `locales/it.json`, `locales/es.json`.
- Elements to translate are marked with `data-i18n="key"` attributes in `index.html`.
- The language selector is a dropdown (`#lang-select`) in the navbar displaying flag emojis (🇬🇧 English, 🇮🇹 Italiano, 🇪🇸 Español).
- The current language is saved to `localStorage` so the choice persists across visits.
- Project modal contents are localized via keys under the `projects` object in each locale file.

Adding/updating translations:
1. Open `locales/en.json` to see the structure and keys used on the site.
2. Add or update the same key in `locales/it.json` and `locales/es.json` with the translated string or array.
   - Project modal entries are nested under `projects.<projectId>` and can include `title`, `description`, `features` (array), `technologies` (array), `impact` (array), and `architecture`.
3. If you add new translatable text to `index.html`, add a `data-i18n` attribute (e.g. `data-i18n="nav.newKey"`) and include the key in each locale file.

Testing locally (recommended to serve files so fetch works correctly):
```powershell
# from the project folder
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

Notes & next steps:
- For complex pluralization or interpolation consider integrating a library such as `i18next`.
- For SEO-sensitive localized pages, consider pre-rendering separate language pages and adding `hreflang` tags.