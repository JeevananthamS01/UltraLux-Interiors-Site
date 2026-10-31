# UltraLux Interiors

A modern, responsive business website for **UltraLux Interiors**, showcasing residential interior design services, company information, project highlights, customer testimonials, and enquiry options.

## Project Overview

UltraLux Interiors focuses on transforming houses into thoughtfully designed homes through customized interior solutions that balance aesthetics, comfort, and functionality.

The website provides visitors with an overview of the company's services, design approach, experience, and contact information. It features a dark visual theme, premium typography, interactive service cards, scroll-based animations, and responsive navigation.

## Website Sections

- **Home:** Hero section introducing the brand and its interior design approach.
- **About Us:** Company introduction, design philosophy, and key strengths.
- **Experience Counters:** Animated statistics highlighting company experience and achievements.
- **Our Services:** Overview of the interior design services offered.
- **Who We Are:** Design principles, personalized interiors, and company strengths.
- **Testimonials:** Customer feedback displayed in an interactive carousel.
- **Contact Us:** Enquiry form for customers interested in interior design services.
- **Footer:** Quick navigation, service links, business contact details, and social links.

## Services

- Home Interiors
- Modular Kitchen
- Wardrobes
- TV Units
- Wall Panelling
- False Ceiling
- Pooja Units

## Key Features

- Responsive desktop, tablet, and mobile layouts.
- Desktop navigation and interactive mobile menu.
- Hero section with background imagery and call-to-action links.
- Scroll-triggered text and section animations.
- Character, word, and line-based text animations.
- Animated numerical counters.
- Interactive service cards with hover effects.
- Sticky services content on larger screens.
- Swiper-powered testimonial carousel.
- Continuously moving contact ticker.
- Smooth anchor navigation and scroll-to-top control.
- Dynamic background images using HTML data attributes.
- Contact form with client-side validation.
- Floating WhatsApp contact link.
- Reduced-motion preference support for text animations.

## Technologies Used

### Core
- HTML5
- CSS3
- JavaScript

### Libraries and Plugins
- **GSAP 3.11.5:** Animation and motion effects.
- **GSAP ScrollTrigger 3.11.5:** Scroll-based animations, pinned content, and counter triggers.
- **SplitType 0.3.4:** Splitting text into characters, words, and lines for animation.
- **Swiper 7.2.0:** Testimonial carousel.
- **Odometer 0.4.8:** Animated numerical counters.
- **jQuery 3.7.1:** JavaScript utility library.
- **jQuery Nice Select:** Custom select dropdown styling.
- **Font Awesome 6:** Icon library.
- **Three.js:** Included as a project dependency.

## Design and Styling

The website uses a dark, premium visual direction with warm accent colours, large typography, image-led sections, and animated transitions.

### Brand Colour Palette

| Colour | Hex Code |
|---|---|
| Primary | `#B83F01` |
| Primary Dark | `#8A2E00` |
| Primary Light | `#D4693A` |
| Secondary | `#1D2527` |
| Secondary Light | `#4A5558` |
| Accent | `#8B6914` |
| Accent Light | `#C4A35A` |
| Body Background | `#FCF9F6` |
| Card Background | `#FFFFFF` |
| Beige Background | `#F7F3EF` |

### Typography

- **Involve Bold:** Primary website typography and headings.
- **Switzer Regular:** Paragraph text.

## Contact Form

The contact form collects:

- Full Name
- Phone Number
- Email Address
- Service Selection
- Message

Client-side validation checks required fields and validates the name, phone number, email address, selected service, and message length.

The JavaScript submits form data to a configured Google Apps Script web app endpoint using `fetch()` and processes the JSON response. Successful submissions display a confirmation message and reset the form.

The Google Apps Script endpoint is configured in `main.js`. Its backend implementation and data storage configuration are not included in this repository's uploaded source files.

## Business Contact

**UltraLux Interiors**

Email: ultraluxindia@gmail.com


## Project Structure

The HTML and JavaScript reference the following asset organization. Keep the files in the corresponding locations when setting up the project.

```text
UltraLux-Interiors/
│
├── index.html
│
└── assets/
    ├── css/
    │   ├── style.css
    │   ├── fontawesome.min.css
    │   └── odometer.min.css
    │
    ├── js/
    │   ├── main.js
    │   └── vendor/
    │       ├── jquary-3.7.1.min.js
    │       ├── odometer.min.js
    │       ├── swiper.min.js
    │       ├── split-type.min.js
    │       ├── gsap.min.js
    │       ├── scroll-trigger.min.js
    │       ├── nice-select.js
    │       └── three.min.js
    │
    ├── fonts/
    │   ├── Involve/
    │   └── switzer/
    │
    └── img/
        ├── favicon.png
        └── home/
            ├── logo-1.png
            ├── logo.png
            ├── hero-bg.jpg
            ├── about-us.jpg
            ├── services/
            ├── who/
            └── testimonials/
```

## Getting Started

1. Clone or download the repository.
2. Ensure the CSS, JavaScript, font, and image assets are placed in the paths referenced by `index.html` and `style.css`.
3. Check that the Google Apps Script endpoint in `main.js` is configured and deployed for form submissions.
4. Open `index.html` in a browser or run the project using a local development server.

No frontend package installation or build command is required for the supplied static website files.

## Implementation Notes

- The website is implemented as a static HTML, CSS, and JavaScript project.
- The contact form depends on an external Google Apps Script endpoint.
- The Google Apps Script backend is not included in the supplied frontend files.
- Social media links should be updated with the official business profiles before deployment.
- The HTML references image and asset directories that must be present for the complete website to render correctly.
- The displayed business statistics and testimonials are website content and should be verified before being used as factual business claims.
- ScrollSmoother and Three.js files are included in the uploaded assets, but their use in the supplied `main.js` is not established.

## Credits

Website design and development: [Dazzle Tech Solutions](https://dazzletechsolutions.com/)

---

© 2026 UltraLux Interiors. All Rights Reserved.
