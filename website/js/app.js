/* =====================================================================
   Allure By Bisma — page behaviour
   Renders content from AllureAPI.getContent() and handles booking.
   You should not need to edit this file to change text or prices:
   use config.js and content.js instead.
   ===================================================================== */
(function () {
  "use strict";
  var config = window.ALLURE_CONFIG;
  var api = window.AllureAPI;
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  document.documentElement.classList.add("js");

  /* Escape text before putting it into HTML */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function icon(name) { return '<svg aria-hidden="true"><use href="#i-' + name + '"/></svg>'; }
  var CATEGORY_LABEL = { everyday: "Everyday", party: "Party", bridal: "Bridal" };

  /* Every bookable thing, keyed by the value used in the booking form's <select> */
  var catalogue = {};

  /* ---------------------------------------------------------------- render */
  function renderServices(services) {
    $("#servicesGrid").innerHTML = services.map(function (s) {
      var rows = s.items.map(function (item, i) {
        var key = "svc:" + s.id + ":" + i;
        catalogue[key] = { type: "service", id: key, name: item.name, category: s.title, price: item.price };
        return '<li><button class="menu-row" type="button" data-preselect="' + key + '" title="Book ' + esc(item.name) + '">' +
          '<span class="name">' + esc(item.name) + '</span><span class="dots"></span>' +
          '<span class="price">' + esc(api.formatPrice(item.price)) + '</span></button></li>';
      }).join("");
      return '<article class="service-card reveal">' +
        '<div class="service-icon">' + icon(s.icon) + '</div>' +
        '<h3>' + esc(s.title) + '</h3><p>' + esc(s.blurb) + '</p>' +
        '<ul class="menu">' + rows + '</ul></article>';
    }).join("");
  }

  function renderPackages(packages) {
    $("#packagesGrid").innerHTML = packages.map(function (p) {
      var key = "pkg:" + p.id;
      catalogue[key] = { type: "package", id: p.id, name: p.name + " package", category: CATEGORY_LABEL[p.category] || p.category, price: p.price };
      var isPrice = p.price !== null && p.price !== undefined;
      return '<article class="package reveal' + (p.featured ? " featured" : "") + '" data-category="' + esc(p.category) + '">' +
        (p.featured ? '<span class="badge">Signature</span>' : "") +
        '<span class="package-cat">' + esc(CATEGORY_LABEL[p.category] || p.category) + '</span>' +
        '<h3>' + esc(p.name) + '</h3>' +
        '<p class="package-summary">' + esc(p.summary) + '</p>' +
        '<p class="package-price"><span class="gold-text">' + esc(api.formatPrice(p.price)) + '</span>' +
          '<small>' + (isPrice ? "Package price" : "Priced after consultation") + (p.duration ? " · " + esc(p.duration) : "") + '</small></p>' +
        '<ul>' + p.includes.map(function (i) { return "<li>" + icon("check") + "<span>" + esc(i) + "</span></li>"; }).join("") + '</ul>' +
        '<a class="btn ' + (p.featured ? "btn-gold" : "btn-outline") + '" href="#book" data-preselect="' + key + '">Book this package</a>' +
        '</article>';
    }).join("");
  }

  function renderGallery(items) {
    $("#gallery").innerHTML = items.map(function (g) {
      var has = !!g.src;
      return '<figure class="tile reveal ' + (has ? "has-photo" : "placeholder") + '" style="margin:0"' +
        (has ? ' tabindex="0" role="button" aria-label="View ' + esc(g.caption) + '" data-src="' + esc(g.src) + '" data-caption="' + esc(g.caption) + '"' : "") + '>' +
        (has ? '<img src="' + esc(g.src) + '" alt="' + esc(g.caption) + '" loading="lazy">' : "") +
        '<figcaption><span class="cat">' + esc(g.category) + '</span><span class="cap">' + esc(g.caption) + '</span>' +
        (has ? "" : '<span class="soon">Photo coming soon</span>') + '</figcaption></figure>';
    }).join("");
    if (config.instagram) {
      var more = $("#galleryMore");
      more.hidden = false;
      $("a", more).href = config.instagram;
    }
  }

  function renderAbout(about) {
    $("#aboutHeading").textContent = about.heading;
    $("#aboutText").innerHTML = about.paragraphs.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
    $("#highlights").innerHTML = about.highlights.map(function (h) {
      return "<li><b>" + esc(h.title) + "</b><span>" + esc(h.text) + "</span></li>";
    }).join("");
  }

  function renderContact() {
    $$("[data-config]").forEach(function (el) { el.textContent = config[el.getAttribute("data-config")] || ""; });
    $("#hours").innerHTML = config.hours.map(function (h) {
      return "<div><dt>" + esc(h.days) + "</dt><dd>" + esc(h.time) + "</dd></div>";
    }).join("");

    var phone = $("#phoneLink");
    phone.textContent = config.phoneDisplay;
    phone.href = "tel:" + String(config.phoneDisplay).replace(/[^\d+]/g, "");
    if (config.email) { $("#emailWrap").hidden = false; $("#emailLink").textContent = config.email; $("#emailLink").href = "mailto:" + config.email; }
    if (config.mapLinkUrl) { $("#mapLink").hidden = false; $("#mapLink").href = config.mapLinkUrl; }
    if (config.mapEmbedUrl) {
      var wrap = $("#mapWrap");
      wrap.hidden = false;
      wrap.innerHTML = '<iframe src="' + esc(config.mapEmbedUrl) + '" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Map to the studio"></iframe>';
    }

    var socials = [["whatsapp", api.whatsappUrl("Hello " + config.name + "!"), "WhatsApp"],
                   ["instagram", config.instagram, "Instagram"], ["facebook", config.facebook, "Facebook"], ["tiktok", config.tiktok, "TikTok"]];
    $("#socials").innerHTML = socials.filter(function (s) { return s[1]; }).map(function (s) {
      return '<a href="' + esc(s[1]) + '" target="_blank" rel="noopener" aria-label="' + s[2] + '">' + icon(s[0]) + "</a>";
    }).join("");

    var hello = api.whatsappUrl("Hello " + config.name + "! I have a question.");
    $("#waFloat").href = hello;
    $("#chatLink").href = hello;
    $("#year").textContent = new Date().getFullYear();
    if (!config.whatsappNumber) console.warn("[Allure] whatsappNumber is empty in js/config.js — WhatsApp will ask visitors which chat to use.");
  }

  /* Search engines: describe the business (filled from config.js) */
  function addStructuredData() {
    var data = {
      "@context": "https://schema.org", "@type": "BeautySalon",
      name: config.name, description: config.tagline, url: location.origin + location.pathname,
      image: new URL("assets/img/og-image.jpg", location.href).href,
      telephone: config.phoneDisplay, address: config.address, priceRange: config.currency,
      openingHours: config.hours.map(function (h) { return h.days + " " + h.time; }),
      sameAs: [config.instagram, config.facebook, config.tiktok].filter(Boolean)
    };
    var s = document.createElement("script");
    s.type = "application/ld+json";
    s.textContent = JSON.stringify(data);
    document.head.appendChild(s);
  }

  /* --------------------------------------------------------------- booking */
  var form = $("#bookingForm");
  var serviceSelect = $("#f-service");

  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function isoDate(d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function toMinutes(hhmm) { var p = hhmm.split(":"); return +p[0] * 60 + +p[1]; }
  function timeLabel(mins) {
    var h = Math.floor(mins / 60), m = mins % 60, ap = h >= 12 ? "PM" : "AM";
    return ((h % 12) || 12) + ":" + pad(m) + " " + ap;
  }

  function fillBookingOptions(content) {
    var html = '<option value="">Select…</option>';
    ["bridal", "party", "everyday"].forEach(function (cat) {
      var list = content.packages.filter(function (p) { return p.category === cat; });
      if (!list.length) return;
      html += '<optgroup label="' + esc(CATEGORY_LABEL[cat]) + ' packages">' + list.map(function (p) {
        return '<option value="pkg:' + esc(p.id) + '">' + esc(p.name) + " — " + esc(api.formatPrice(p.price)) + "</option>";
      }).join("") + "</optgroup>";
    });
    content.services.forEach(function (s) {
      html += '<optgroup label="' + esc(s.title) + '">' + s.items.map(function (item, i) {
        return '<option value="svc:' + esc(s.id) + ":" + i + '">' + esc(item.name) + " — " + esc(api.formatPrice(item.price)) + "</option>";
      }).join("") + "</optgroup>";
    });
    html += '<option value="consultation">Not sure yet — I\'d like a consultation</option>';
    serviceSelect.innerHTML = html;
    catalogue.consultation = { type: "consultation", id: "consultation", name: "Consultation", category: "General", price: null };

    var b = config.booking, times = '<option value="">Select…</option>';
    for (var t = toMinutes(b.firstSlot); t <= toMinutes(b.lastSlot); t += b.stepMinutes) {
      times += "<option>" + timeLabel(t) + "</option>";
    }
    $("#f-time").innerHTML = times;

    var guests = "";
    for (var g = 1; g <= 10; g++) guests += '<option value="' + g + '">' + (g === 1 ? "Just me" : g + " people") + "</option>";
    $("#f-guests").innerHTML = guests;

    var min = new Date(); min.setDate(min.getDate() + (b.minDaysAhead || 0));
    $("#f-date").min = isoDate(min);
  }

  function setInvalid(name, bad) {
    var field = form.elements[name].closest(".field");
    field.classList.toggle("invalid", bad);
    form.elements[name].setAttribute("aria-invalid", bad ? "true" : "false");
  }

  function validate() {
    var f = form.elements, ok = true, first = null;
    function check(name, good) { setInvalid(name, !good); if (!good) { ok = false; first = first || f[name]; } }
    check("name", f.name.value.trim().length >= 2);
    var digits = f.phone.value.replace(/\D/g, "");
    check("phone", digits.length >= 7 && digits.length <= 15);
    check("service", !!f.service.value);
    check("date", !!f.date.value && f.date.value >= f.date.min);
    check("time", !!f.time.value);
    if (first) first.focus();
    return ok;
  }

  /* The booking object — this is exactly what a future backend receives */
  function buildBooking() {
    var f = form.elements, item = catalogue[f.service.value];
    var parts = f.date.value.split("-"), d = new Date(+parts[0], +parts[1] - 1, +parts[2]);
    var label = item.type === "package"
      ? item.name + " (" + item.category + ") — " + api.formatPrice(item.price)
      : item.type === "consultation" ? "Consultation — not sure yet"
      : item.category + ": " + item.name + " — " + api.formatPrice(item.price);
    return {
      name: f.name.value.trim(),
      phone: f.phone.value.trim(),
      service: { type: item.type, id: item.id, name: item.name, category: item.category, price: item.price },
      serviceLabel: label,
      date: f.date.value,
      dateLabel: d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" }),
      time: f.time.value,
      guests: +f.guests.value || 1,
      notes: f.notes.value.trim(),
      source: "website",
      createdAt: new Date().toISOString()
    };
  }

  function openWhatsApp(url) {
    var win = window.open(url, "_blank");
    if (win) win.opener = null;
    else location.href = url;           // pop-up blocked: open WhatsApp in this tab instead
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    if (!validate()) return;
    var btn = $("#submitBtn"), note = $(".form-note"), link = $("#successLink"), text = $(".form-success p");
    btn.disabled = true;
    note.classList.remove("form-error");
    note.textContent = "Your appointment is confirmed once we reply on WhatsApp.";
    try {
      var result = await api.createBooking(buildBooking());
      if (result.whatsappUrl) {
        link.href = result.whatsappUrl;
        link.hidden = false;
        if (config.booking.autoOpenWhatsApp !== false) {
          link.lastChild.textContent = " Open WhatsApp again";
          text.textContent = "WhatsApp should have opened with your booking details. Just press send.";
          openWhatsApp(result.whatsappUrl);
        } else {
          link.lastChild.textContent = " Send on WhatsApp";
          text.textContent = "Your booking message is ready. Tap below to open it in WhatsApp, then press send.";
        }
      } else {
        link.hidden = true;
        text.textContent = "Thank you! We have your request and will contact you on WhatsApp to confirm.";
      }
      $("#formSuccess").hidden = false;
    } catch (err) {
      console.error(err);
      note.classList.add("form-error");
      note.textContent = "Your booking couldn't be sent. Please check your connection and try again, or message us on WhatsApp.";
    } finally {
      btn.disabled = false;
    }
  });

  form.addEventListener("input", function (e) {
    var field = e.target.closest(".field");
    if (field && field.classList.contains("invalid")) setInvalid(e.target.name, false);
  });
  form.addEventListener("change", function (e) {
    var field = e.target.closest(".field");
    if (field && field.classList.contains("invalid")) setInvalid(e.target.name, false);
  });

  $("#newBooking").addEventListener("click", function () {
    form.reset();
    $("#formSuccess").hidden = true;
    form.elements.name.focus();
  });

  /* "Book" buttons anywhere on the page pre-select the service in the form */
  document.addEventListener("click", function (e) {
    var trigger = e.target.closest("[data-preselect]");
    if (!trigger) return;
    e.preventDefault();
    var value = trigger.getAttribute("data-preselect");
    if (serviceSelect.querySelector('option[value="' + value + '"]')) {
      serviceSelect.value = value;
      setInvalid("service", false);
    }
    $("#formSuccess").hidden = true;
    $("#book").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    setTimeout(function () { form.elements.name.focus({ preventScroll: true }); }, 700);
  });

  /* ------------------------------------------------------------ page chrome */
  var header = $(".site-header");
  function onScroll() { header.classList.toggle("scrolled", window.scrollY > 20); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var toggle = $("#menuToggle");
  function setMenu(open) {
    document.body.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  toggle.addEventListener("click", function () { setMenu(!document.body.classList.contains("menu-open")); });
  $$("#nav a").forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

  /* Package filter tabs */
  $("#packageTabs").addEventListener("click", function (e) {
    var tab = e.target.closest("button[data-filter]");
    if (!tab) return;
    var filter = tab.getAttribute("data-filter");
    $$("#packageTabs button").forEach(function (b) { b.setAttribute("aria-selected", b === tab ? "true" : "false"); });
    $$("#packagesGrid .package").forEach(function (p) {
      p.hidden = filter !== "all" && p.getAttribute("data-category") !== filter;
    });
  });

  /* Lightbox for real portfolio photos */
  var lightbox = $("#lightbox");
  function openPhoto(tile) {
    $("img", lightbox).src = tile.getAttribute("data-src");
    $("img", lightbox).alt = tile.getAttribute("data-caption");
    $(".lightbox-caption", lightbox).textContent = tile.getAttribute("data-caption");
    lightbox.showModal();
  }
  $("#gallery").addEventListener("click", function (e) { var t = e.target.closest(".has-photo"); if (t) openPhoto(t); });
  $("#gallery").addEventListener("keydown", function (e) {
    var t = e.target.closest(".has-photo");
    if (t && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); openPhoto(t); }
  });
  $(".lightbox-close").addEventListener("click", function () { lightbox.close(); });
  lightbox.addEventListener("click", function (e) { if (e.target === lightbox) lightbox.close(); });

  /* Reveal-on-scroll, active nav link, hide the floating button near the form */
  function observe() {
    if (!("IntersectionObserver" in window)) { $$(".reveal").forEach(function (el) { el.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    $$(".reveal").forEach(function (el) { io.observe(el); });

    var links = $$("#nav a:not(.btn)");
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    $$("main section[id]").forEach(function (s) { spy.observe(s); });

    var fab = $("#waFloat");
    new IntersectionObserver(function (entries) {
      fab.classList.toggle("hide", entries[0].isIntersecting);
    }, { threshold: 0.25 }).observe($("#book"));
  }

  /* ------------------------------------------------------------------ start */
  api.getContent().then(function (content) {
    renderServices(content.services);
    renderPackages(content.packages);
    renderGallery(content.gallery);
    renderAbout(content.about);
    renderContact();
    fillBookingOptions(content);
    addStructuredData();
    observe();
  });
})();
