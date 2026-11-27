/* =====================================================================
   Allure By Bisma — data layer
   ---------------------------------------------------------------------
   The page never reads content or sends bookings directly; it always
   goes through these two functions. Today they work fully offline
   (backend.mode = "static"). Switching backend.mode to "api" in
   config.js makes them talk to a server instead — no page changes needed.

   API contract (for whoever builds the backend):
     GET  {baseUrl}/content    -> same JSON shape as window.ALLURE_CONTENT
     POST {baseUrl}/bookings   <- Booking JSON (see buildBooking in app.js)
                               -> 201 { "id": "...", "status": "pending" }
   ===================================================================== */
(function () {
  var config = window.ALLURE_CONFIG;

  function whatsappUrl(text) {
    var number = String(config.whatsappNumber || "").replace(/\D/g, "");
    return "https://wa.me/" + number + "?text=" + encodeURIComponent(text);
  }

  function formatPrice(price) {
    if (price === null || price === undefined || price === "") return "On consultation";
    return config.currency + " " + Number(price).toLocaleString("en-US");
  }

  /* Turns a booking into the WhatsApp message the salon receives. */
  function bookingMessage(b) {
    var lines = [
      "*Booking request — " + config.name + "*",
      "",
      "Name: " + b.name,
      "Phone: " + b.phone,
      "Service: " + b.serviceLabel,
      "Preferred date: " + b.dateLabel,
      "Preferred time: " + b.time
    ];
    if (b.guests > 1) lines.push("Number of people: " + b.guests);
    if (b.notes) lines.push("Notes: " + b.notes);
    if (b.reference) lines.push("", "Reference: " + b.reference);
    return lines.join("\n");
  }

  async function getContent() {
    if (config.backend.mode === "api") {
      try {
        var res = await fetch(config.backend.baseUrl + "/content", { headers: { Accept: "application/json" } });
        if (res.ok) return await res.json();
        console.warn("Content API returned " + res.status + "; using the built-in content instead.");
      } catch (err) {
        console.warn("Content API unreachable; using the built-in content instead.", err);
      }
    }
    return window.ALLURE_CONTENT;
  }

  /* Returns { whatsappUrl, reference } — the page opens the WhatsApp link. */
  async function createBooking(booking) {
    var reference = null;
    if (config.backend.mode === "api") {
      var res = await fetch(config.backend.baseUrl + "/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(booking)
      });
      if (!res.ok) throw new Error("Booking could not be saved (" + res.status + ")");
      var saved = await res.json();
      reference = saved.id || null;
      if (!config.backend.openWhatsAppAfterSaving) return { whatsappUrl: null, reference: reference };
    }
    var message = bookingMessage(Object.assign({}, booking, { reference: reference }));
    return { whatsappUrl: whatsappUrl(message), reference: reference };
  }

  window.AllureAPI = {
    getContent: getContent,
    createBooking: createBooking,
    whatsappUrl: whatsappUrl,
    formatPrice: formatPrice
  };
})();
