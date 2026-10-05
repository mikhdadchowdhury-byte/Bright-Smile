/* ==========================================================================
   BrightSmile Dental Studio - script.js
   Plain JavaScript. Three small jobs:
     1. Open/close the mobile menu
     2. Hide team photos that fail to load
     3. Check the appointment form and show the success message
   ========================================================================== */

/* ---------- 1. MOBILE MENU ---------- */
var header = document.getElementById("site-header");
var menuButton = document.getElementById("menu-toggle");

function setMenu(open) {
  if (!header || !menuButton) return;
  header.classList.toggle("menu-open", open);            // CSS shows/hides the menu using this class
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  document.body.style.overflow = open ? "hidden" : "";   // stop the page scrolling behind the menu
}

if (menuButton) {
  menuButton.addEventListener("click", function () {
    setMenu(!header.classList.contains("menu-open"));
  });
  // Close with the Escape key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") setMenu(false);
  });
  // Close automatically if the window becomes wide (desktop menu takes over)
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 1024) setMenu(false);
  });
}

/* ---------- 2. BROKEN IMAGES ---------- */
// If a team photo is missing, hide it instead of showing a broken-image icon.
document.querySelectorAll(".dentist-card img").forEach(function (img) {
  img.addEventListener("error", function () { img.style.display = "none"; });
});

/* ---------- 3. APPOINTMENT FORM (contact.html only) ---------- */
var form = document.getElementById("appointment-form");
var successBox = document.getElementById("form-success");
var sendAnother = document.getElementById("send-another");

if (form && successBox) {
  // The fields we check, with the message shown when each one is wrong.
  var checks = {
    name:    { message: "Please enter your full name.",        valid: function (v) { return v.trim() !== ""; } },
    email:   { message: "Please enter a valid email.",         valid: function (v) { return /^\S+@\S+\.\S+$/.test(v); } },
    phone:   { message: "Please enter a valid phone number.",  valid: function (v) { return v.replace(/\D/g, "").length >= 7; } },
    date:    { message: "Please choose a preferred date.",     valid: function (v) { return v !== ""; } },
    time:    { message: "Please choose a preferred time.",     valid: function (v) { return v !== ""; } },
    service: { message: "Please choose a service.",            valid: function (v) { return v !== ""; } }
  };

  form.addEventListener("submit", function (event) {
    event.preventDefault();           // stop the browser from reloading the page
    var allGood = true;

    Object.keys(checks).forEach(function (name) {
      var field = form.elements[name];
      var errorEl = document.getElementById(name + "-error");
      var ok = checks[name].valid(field.value);
      field.setAttribute("aria-invalid", String(!ok));
      errorEl.textContent = ok ? "" : checks[name].message;
      errorEl.hidden = ok;
      if (!ok) allGood = false;
    });

    if (allGood) {
      // Nothing is sent anywhere - this is a demo. See README.md to connect a real service.
      form.reset();
      form.style.display = "none";
      successBox.classList.add("show");
    }
  });

  // "Send another request" brings the form back
  sendAnother.addEventListener("click", function () {
    successBox.classList.remove("show");
    form.style.display = "";
  });
}
