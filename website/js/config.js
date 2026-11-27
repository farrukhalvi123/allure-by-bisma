/* =====================================================================
   Allure By Bisma — business details
   ---------------------------------------------------------------------
   This is the ONE file to edit for contact details, hours and booking.
   Everything marked TODO is a placeholder and must be replaced before
   the site goes live.
   ===================================================================== */
window.ALLURE_CONFIG = {
  name: "Allure By Bisma",
  tagline: "Hair · Makeup · Bridal · Skin · Nails",

  /* WhatsApp number in international format, digits only — no +, spaces or leading 0.
     Example for a Pakistani mobile 0300 1234567  ->  "923001234567"
     TODO: add the salon's WhatsApp number. While it is empty, booking still works:
     WhatsApp opens and asks the visitor which chat to send the message to. */
  whatsappNumber: "",

  phoneDisplay: "+92 300 0000000",                    // TODO: number as shown on the page
  email: "arfayousafzai040@gmail.com",                                           // TODO: optional, e.g. "hello@allurebybisma.com"
  address: "Salon address, Street, City",              // TODO
  mapEmbedUrl: "",                                     // TODO: optional Google Maps "Embed a map" src URL
  mapLinkUrl: "",                                      // TODO: optional Google Maps share link

  instagram: "",                                       // TODO: full URL, e.g. "https://instagram.com/allurebybisma"
  facebook: "",                                        // TODO: full URL
  tiktok: "",                                          // TODO: full URL (optional)

  currency: "Rs.",                                     // shown before every price
  hours: [                                             // TODO: opening hours
    { days: "Monday – Saturday", time: "11:00 AM – 8:00 PM" },
    { days: "Sunday",            time: "By appointment" }
  ],

  /* Time slots offered in the booking form (24-hour clock) */
  booking: {
    firstSlot: "11:00",
    lastSlot:  "19:00",
    stepMinutes: 60,
    minDaysAhead: 0,                                   // 1 = earliest booking is tomorrow
    autoOpenWhatsApp: true                             // false = show a "Send on WhatsApp" button instead
  },

  /* Backend switch — see README.md, "Adding a backend later".
     "static": everything runs in the browser, bookings go straight to WhatsApp.
     "api":    content is loaded from, and bookings are saved to, your server first. */
  backend: {
    mode: "static",
    baseUrl: "/api",
    openWhatsAppAfterSaving: true
  }
};
