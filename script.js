// ==========================
// Hamburger toggle
// ==========================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
  const isActive = hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');

  // Reset staff submenu when nav is fully closed
  if (!isActive && staffSubmenu) {
    staffSubmenu.classList.remove('active');
  }
});

// ==========================
// Mobile Staff submenu
// ==========================
const staffLink = document.querySelector('#nav-menu a[data-card="staff"]');
const staffSubmenu = document.getElementById('staff-submenu');

staffLink.addEventListener('click', e => {
  if (window.innerWidth <= 768) {
    e.preventDefault(); // prevent opening staff card
    staffSubmenu.classList.toggle('active');
  } else {
    // Desktop behavior: open staff card
    e.preventDefault();
    document.querySelectorAll(".card-overlay").forEach(c => c.classList.remove("active"));
    const target = document.getElementById("staff");
    if (target) target.classList.add("active");
  }
});


// ==========================
// Nav Links -> Open Card (excluding Staff on mobile)
// ==========================
document.querySelectorAll('#nav-menu a').forEach(link => {
  link.addEventListener('click', e => {
    const targetId = link.getAttribute("data-card");

    // On mobile, skip Staff main link
    if (window.innerWidth <= 768 && targetId === "staff") return;

    e.preventDefault();
    document.querySelectorAll(".card-overlay").forEach(c => c.classList.remove("active"));
    const target = document.getElementById(targetId);
    if (target) target.classList.add("active");

    // Close mobile nav after click (except for staff submenu)
    if (targetId !== "staff" && !link.closest('#staff-submenu')) {
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");

      // Reset staff submenu
      if (staffSubmenu) staffSubmenu.classList.remove('active');
    }
  });
});

// ==========================
// Staff Submenu -> Open Profile (Mobile)
// ==========================
staffSubmenu.querySelectorAll('a').forEach(subLink => {
  subLink.addEventListener('click', e => {
    e.preventDefault();
    const profileId = subLink.getAttribute("data-card");

    // Keep nav menu and submenu visible on mobile
    document.querySelectorAll(".card-overlay").forEach(c => c.classList.remove("active"));
    const profileCard = document.getElementById(profileId);
    if (profileCard) profileCard.classList.add("active");
  });
});

// ==========================
// Close Buttons
// ==========================
document.querySelectorAll(".close").forEach(btn => {
  btn.addEventListener("click", () => {
    const overlay = btn.closest(".card-overlay");
    overlay.classList.remove("active");

    // Mobile: if it's a staff profile, show the submenu instead of grid
    if (overlay.classList.contains("profile") && window.innerWidth <= 768) {
      staffSubmenu.classList.add('active'); // show submenu in mobile
    }
    
    // Desktop: if it's a profile, go back to staff grid
    else if (overlay.classList.contains("profile")) {
      document.getElementById("staff").classList.add("active");
    }
  });
});

// ==========================
// Staff Grid Thumbnails -> Open Profile
// ==========================
document.querySelectorAll(".staff-thumb").forEach(thumb => {
  thumb.addEventListener("click", () => {
    const profileId = thumb.getAttribute("data-profile");

    if (window.innerWidth > 768) {
      document.getElementById("staff").classList.remove("active"); // hide grid on desktop
    }

    const profileCard = document.getElementById(profileId);
    if (profileCard) profileCard.classList.add("active");
  });
});

// ==========================
// Click Outside Card to Close Overlay (Mobile Only)
// ==========================
function enableMobileOverlayClick() {
  if (window.innerWidth <= 768) {
    document.querySelectorAll(".card-overlay").forEach(overlay => {
      overlay.addEventListener("click", overlayClickHandler);
    });
  } else {
    document.querySelectorAll(".card-overlay").forEach(overlay => {
      overlay.removeEventListener("click", overlayClickHandler);
    });
  }
}

function overlayClickHandler(e) {
  if (e.target === e.currentTarget) {
    e.currentTarget.classList.remove("active");
    if (e.currentTarget.classList.contains("profile")) {
      if (window.innerWidth <= 768) {
        staffSubmenu.classList.add('active'); // show submenu on mobile
      } else {
        document.getElementById("staff").classList.add("active"); // show grid on desktop
      }
    }
  }
}

// Run on load and resize
window.addEventListener("load", enableMobileOverlayClick);
window.addEventListener("resize", enableMobileOverlayClick);