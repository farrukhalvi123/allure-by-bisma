/* =====================================================================
   Allure By Bisma — site content (services, packages, gallery, about)
   ---------------------------------------------------------------------
   TODO: every price below is a SAMPLE. Replace them with the salon's
   real prices before going live. Use  price: null  to show
   "On consultation" instead of a number.

   When a backend is added, the server returns exactly this shape from
   GET /api/content, and this file becomes the offline fallback.
   ===================================================================== */
window.ALLURE_CONTENT = {

  /* ---- Services menu (icon: hair | makeup | bridal | skin | nails | lashes) ---- */
  services: [
    {
      id: "hair", icon: "hair", title: "Hair",
      blurb: "Cuts, colour and styling that suit your face and your life.",
      items: [
        { name: "Haircut & blow-dry",          price: 2500 },
        { name: "Blow-dry / curls / waves",    price: 1800 },
        { name: "Global colour",               price: 7000 },
        { name: "Highlights / balayage",       price: 12000 },
        { name: "Keratin / protein treatment", price: 15000 },
        { name: "Party updo",                  price: 3500 }
      ]
    },
    {
      id: "makeup", icon: "makeup", title: "Makeup",
      blurb: "From a soft day look to full evening glam.",
      items: [
        { name: "Soft / natural makeup", price: 5000 },
        { name: "Party makeup",          price: 8000 },
        { name: "Engagement / Nikkah makeup", price: 18000 },
        { name: "Eye makeup only",       price: 3000 },
        { name: "Saree / dupatta draping", price: 1500 }
      ]
    },
    {
      id: "bridal", icon: "bridal", title: "Bridal",
      blurb: "Your day, your look — planned with you, perfected on the day.",
      items: [
        { name: "Bridal makeup & hairstyling", price: 45000 },
        { name: "Bridal trial session",        price: 10000 },
        { name: "Pre-bridal skin course",      price: 20000 },
        { name: "Bridesmaid / family makeup",  price: 8000 }
      ]
    },
    {
      id: "skin", icon: "skin", title: "Skin",
      blurb: "Facials and treatments for calm, glowing skin.",
      items: [
        { name: "Deep-cleansing facial", price: 4500 },
        { name: "Whitening / glow facial", price: 6000 },
        { name: "Hydra facial",          price: 8000 },
        { name: "Full-body waxing",      price: 5000 },
        { name: "Threading (brows & face)", price: 600 }
      ]
    },
    {
      id: "nails", icon: "nails", title: "Nails",
      blurb: "Neat, long-lasting nails, hands and feet.",
      items: [
        { name: "Manicure",          price: 2000 },
        { name: "Pedicure",          price: 2500 },
        { name: "Gel polish",        price: 2500 },
        { name: "Acrylic extensions", price: 6000 },
        { name: "Nail art (per set)", price: 1500 }
      ]
    },
    {
      id: "lashes", icon: "lashes", title: "Brows & Lashes",
      blurb: "Frame your eyes with shape and definition.",
      items: [
        { name: "Brow shaping & tint", price: 1500 },
        { name: "Lash lift & tint",    price: 4500 },
        { name: "Lash extensions",     price: 7000 },
        { name: "Strip lashes (applied)", price: 1000 }
      ]
    }
  ],

  /* ---- Packages (category: everyday | party | bridal) ---- */
  packages: [
    {
      id: "glow-up", category: "everyday", name: "Glow Up",
      price: 7500, duration: "2 hours",
      summary: "A full refresh for skin, hands and hair.",
      includes: ["Deep-cleansing facial", "Manicure", "Threading", "Blow-dry"]
    },
    {
      id: "pamper-day", category: "everyday", name: "Pamper Day",
      price: 12000, duration: "3½ hours",
      summary: "An unhurried afternoon of complete care.",
      includes: ["Glow facial", "Manicure & pedicure", "Hair protein treatment", "Threading"]
    },
    {
      id: "party-ready", category: "party", name: "Party Ready",
      price: 10000, duration: "1½ hours",
      summary: "Camera-ready glam for any evening out.",
      includes: ["Party makeup", "Hairstyling", "Strip lashes", "Dupatta setting"]
    },
    {
      id: "engagement-glam", category: "party", name: "Engagement Glam",
      price: 25000, duration: "3 hours", featured: true,
      summary: "Soft, luminous makeup for your engagement or Nikkah.",
      includes: ["Engagement makeup", "Hairstyling", "Lashes", "Dupatta setting", "Touch-up kit"]
    },
    {
      id: "signature-bride", category: "bridal", name: "Signature Bride",
      price: 55000, duration: "Full session", featured: true,
      summary: "Our complete look for the main event, planned with you.",
      includes: ["Bridal makeup", "Bridal hairstyling", "Jewellery & dupatta setting", "Lashes", "Free trial session"]
    },
    {
      id: "bridal-trio", category: "bridal", name: "Bridal Trio",
      price: null, duration: "3 events",
      summary: "One consistent look across all three of your wedding events.",
      includes: ["Three bridal looks", "Hairstyling for each event", "Pre-bridal facial", "Manicure & pedicure", "Free trial session"]
    }
  ],

  /* ---- Portfolio photos ----
     Put photos in assets/gallery/ and set "src", e.g. "assets/gallery/bride-01.jpg".
     Tiles with an empty src show an elegant placeholder until a photo is added. */
  gallery: [
    { src: "", category: "Bridal", caption: "Bridal look" },
    { src: "", category: "Makeup", caption: "Party glam" },
    { src: "", category: "Hair",   caption: "Soft waves" },
    { src: "", category: "Bridal", caption: "Engagement look" },
    { src: "", category: "Nails",  caption: "Nail art" },
    { src: "", category: "Hair",   caption: "Balayage" }
  ],

  /* ---- About ---- TODO: replace with Bisma's own words */
  about: {
    heading: "Meet Bisma",
    paragraphs: [
      "Allure By Bisma is a beauty studio built around one simple idea: every woman should leave feeling like the most confident version of herself.",
      "From a quick blow-dry to a full bridal look, each appointment starts with listening — to your style, your skin and the occasion — so the result feels like you, only more radiant."
    ],
    highlights: [
      { title: "Personal consultations", text: "Every look is planned with you first." },
      { title: "Quality products",       text: "Trusted brands, chosen for your skin type." },
      { title: "Hygiene first",          text: "Clean tools and fresh disposables for every client." },
      { title: "Bridal trials",          text: "See and refine your look before the big day." }
    ]
  }
};
