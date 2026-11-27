# Allure By Bisma — website

A one-page portfolio site for the salon. It shows services, packages, a portfolio, an about section and contact details. Bookings are sent to the salon on WhatsApp.

It is a static site: plain HTML, CSS and JavaScript, with no build step and no server code. Any static host can serve it, for example Netlify, Vercel, GitHub Pages, Cloudflare Pages or ordinary cPanel hosting. You can also open `index.html` straight from disk.

```
website/
  index.html          page structure
  css/styles.css      design (brand colours are at the top)
  js/config.js        business details: WhatsApp number, address, hours, socials, booking times
  js/content.js       services, packages, portfolio photos, about text
  js/api.js           data layer: the only place that loads content or sends bookings
  js/app.js           page behaviour (rendering, booking form, menu, filters)
  assets/img/         logo artwork, favicons and share image
  assets/gallery/     put portfolio photos here
```

## Before going live

1. **`js/config.js`**
   - Set `whatsappNumber` in international format with digits only, e.g. `923001234567`.
   - Set `phoneDisplay`, `address`, `hours` and the social links.
   - Optionally set `mapEmbedUrl`. In Google Maps choose Share, then "Embed a map", and copy the `src` URL.
2. **`js/content.js`**: replace the sample prices. Use `price: null` to show "On consultation".
3. **Portfolio**: copy photos into `assets/gallery/`, then set each item's `src`, e.g. `"assets/gallery/bride-01.jpg"`.
   - Portrait photos (4:5) look best.
   - Keep each photo under about 400 KB.
   - Tiles with no photo show a placeholder.
4. **About**: rewrite the paragraphs and highlights in Bisma's own words.

## How booking works today

1. The visitor picks a service or package, a date and a time, and presses **Send booking on WhatsApp**.
2. WhatsApp opens with a ready-made message, for example:
   ```
   *Booking request — Allure By Bisma*
   Name: …
   Phone: …
   Service: Engagement Glam package (Party) — Rs. 25,000
   Preferred date: Wed, 2 Dec 2026
   Preferred time: 2:00 PM
   ```
3. The salon confirms the booking by replying on WhatsApp.

Every "Book" button and service row on the page pre-selects that item in the form.

## Adding a backend later

The page never touches data directly. Everything goes through `js/api.js`, so adding a server is a config change, not a rewrite.

1. Build two endpoints. Any stack works: Node/Express, Laravel, Django, Supabase, Firebase Functions and so on.

   | Method | Path | Request | Response |
   |---|---|---|---|
   | `GET` | `/api/content` | — | Same JSON shape as `window.ALLURE_CONTENT` in `content.js` |
   | `POST` | `/api/bookings` | Booking JSON, shown below | `201 { "id": "BK-1042", "status": "pending" }` |

   Booking JSON that the site sends:
   ```json
   {
     "name": "Ayesha Khan",
     "phone": "0300 1234567",
     "service": { "type": "package", "id": "engagement-glam", "name": "Engagement Glam package", "category": "Party", "price": 25000 },
     "serviceLabel": "Engagement Glam package (Party) — Rs. 25,000",
     "date": "2026-12-02",
     "dateLabel": "Wed, 2 Dec 2026",
     "time": "2:00 PM",
     "guests": 1,
     "notes": "",
     "source": "website",
     "createdAt": "2026-11-28T10:15:00.000Z"
   }
   ```
2. In `config.js`, set `backend.mode` to `"api"`. Set `baseUrl` too if the API is not served at `/api` on the same domain.
3. What changes in `"api"` mode:
   - Content is loaded from the server. If the server is unreachable, the site falls back to `content.js`.
   - Each booking is saved first. WhatsApp then opens with the booking reference included.
   - To skip WhatsApp, set `openWhatsAppAfterSaving: false`.

Natural next steps once there is a backend:
- an admin page to edit prices and packages
- a list of bookings with confirm and decline
- availability checks so customers can't double-book a slot
- a deposit payment

## Preview locally

Opening `index.html` directly works. To preview it as it will look when hosted, run this from the `website` folder:

```
python -m http.server 8765
```

Then open http://localhost:8765.
