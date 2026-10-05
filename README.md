# BrightSmile Dental Studio - static website

Plain HTML + CSS + JavaScript. No Node, no npm, no build step.
Double-click `index.html` to preview it, or upload the folder contents to GitHub Pages.

## Quick edit guide
- Text: open the `.html` file for that page and edit the words between the tags.
- Colors / fonts: top of `style.css` (the `:root { ... }` block).
- Images: replace files in `images/` (keep the same file names) or change the `src="images/..."` in the HTML.
- Phone / email / address / WhatsApp: these appear in every page's header, footer and `contact.html`. Use your editor's Find & Replace across all files:
  `(212) 555-0188`, `+12125550188`, `12125550188`, `hello@brightsmile-demo.com`, `123 Madison Avenue, New York, NY 10016`
- Navigation: the `<header>` and `<footer>` blocks are repeated on every page - edit them in each file.
- JavaScript (`script.js`): mobile menu, hiding broken photos, appointment form checking.

## The appointment form
Frontend-only. It validates the fields and shows a success message, but sends and stores nothing.
To receive real requests you need an outside service (Formspree, Netlify Forms, a mailto: link, etc.).
