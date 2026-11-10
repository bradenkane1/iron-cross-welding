# Iron Cross Welding & Fabrication

Single-page marketing site for a welding and fabrication business in Orange County, CA. Vite, React 19, and TypeScript. There is no backend.

## Commands

- `npm run dev -- --host 127.0.0.1 --port 5173` starts the site the owner uses
- `npm run check` runs `tsc --noEmit`
- `npm run build` typechecks and builds

Do not start a second dev server if one is already serving this project. After UI changes, check the affected section in the browser.

## Business facts

Use only these. Do not invent an address, hours, certifications, or prices.

- Phone and text: (949) 329-3012
- Email: theironcrosswelding@gmail.com
- Area: Orange County, CA and surrounding areas. No street address.
- Shop hours: Monday to Saturday, 7:00 AM to 6:00 PM
- 24/7 emergency mobile dispatch
- LA City certified and AWS D1.1 structural steel certified
- Christian-based business
- Title: Iron Cross Welding & Fabrication | Orange County, CA

## Quote form

The form builds a `mailto:` draft. It does not send mail and does not store submissions. The file input cannot attach photos. `mailto` only carries the subject and body, so chosen files are listed by name in the draft. The visitor attaches them in their email app.

## Site behavior

- One page, with `#work`, `#services`, `#about`, and `#quote`
- Headings are uppercase in CSS. Leave the source text in sentence case.
- Recent work shows two full rows first. Load more adds two rows. The count follows the current column count so those rows stay full.
- Do not stretch a short last row. An empty cell after Load more is acceptable.
- The owner photo is the only element with rounded corners. Everything else stays square.
- Header, hero, What we weld, Get a quote, and the footer share `--bg-deep`. The quote form panel stays `--bg-alt`.
- White text uses `--text` (`#efefef`).

## Files

- `src/App.tsx` is the page
- `src/styles.css` holds the design tokens and layout
- `public/llms.txt`, `public/llms-full.txt`, and `public/agents.md` are served with the site. Update them when business facts or section copy change. This file stays in the repo for code changes.
- Work photos are `public/work/01.webp` through `20.webp`
- The logo is `public/logo.png`. The owner photo is `public/owner.jpg`.
