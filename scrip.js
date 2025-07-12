// Swiper JS (Pastikan Swiper JS CDN dimuat di HTML sebelum script ini)
// Link: https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js
var swiper = new Swiper(".testimonials-container", {
  loop: true,
  spaceBetween: 24,
  slidesPerView: "auto",
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

// MixItUp JS (Pastikan MixItUp CDN dimuat di HTML sebelum script ini)
// Link: https://cdnjs.cloudflare.com/ajax/libs/mixitup/3.3.1/mixitup.min.js
document.addEventListener("DOMContentLoaded", function () {
  let mixerMenu = mixitup(".menu-container", {
    selectors: {
      target: ".menu-card",
    },
    animation: {
      duration: 300,
    },
  });

  // Tambahkan class aktif ke tombol filter dan panggil fungsi filter MixItUp
  const linkMenu = document.querySelectorAll(".menu-item-filter");

  function activeMenu() {
    // Hapus class aktif dari semua tombol filter
    linkMenu.forEach((l) => l.classList.remove("active-menu-filter"));
    // Tambahkan class aktif ke tombol yang diklik
    this.classList.add("active-menu-filter");

    // Panggil MixItUp untuk memfilter item berdasarkan data-filter
    const filterValue = this.getAttribute("data-filter");
    mixerMenu.filter(filterValue);
  }

  // Tambahkan event listener klik ke setiap tombol filter
  linkMenu.forEach((l) => l.addEventListener("click", activeMenu));
});

// Smooth scrolling untuk tautan anchor
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
    // Tutup menu mobile setelah mengklik tautan (jika terbuka)
    const navMenuWrapper = document.getElementById("nav-menu-wrapper");
    if (
      navMenuWrapper &&
      navMenuWrapper.classList.contains("show-mobile-menu")
    ) {
      navMenuWrapper.classList.remove("show-mobile-menu");
    }
  });
});

// Mobile Menu Toggle Logic (New simplified logic)
const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
const navMenuWrapper = document.getElementById("nav-menu-wrapper");

if (mobileMenuToggle && navMenuWrapper) {
  mobileMenuToggle.addEventListener("click", () => {
    navMenuWrapper.classList.toggle("show-mobile-menu");
  });
}

// Close mobile menu when clicking outside (optional, but good UX)
document.addEventListener("click", (event) => {
  if (
    navMenuWrapper &&
    mobileMenuToggle &&
    !navMenuWrapper.contains(event.target) &&
    !mobileMenuToggle.contains(event.target)
  ) {
    navMenuWrapper.classList.remove("show-mobile-menu");
  }
});

// Share Button and Social Media Popup Logic
const shareToggleButton = document.getElementById("share-toggle-button");
const shareSocialLinks = document.getElementById("share-social-links");

if (shareToggleButton) {
  shareToggleButton.addEventListener("click", (event) => {
    event.stopPropagation(); // Mencegah klik menyebar dan segera menutup popup
    shareSocialLinks.classList.toggle("show");
  });
}

// Tutup tautan share saat mengklik di luar popup
document.addEventListener("click", (event) => {
  if (
    shareSocialLinks &&
    !shareSocialLinks.contains(event.target) &&
    !shareToggleButton.contains(event.target)
  ) {
    shareSocialLinks.classList.remove("show");
  }
});

// Logika Formulir Kontak ke WhatsApp
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Mencegah pengiriman formulir default

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    // Nomor WhatsApp Admin (ganti dengan nomor WhatsApp Anda, termasuk kode negara tanpa '+')
    // Contoh: 6281234567890 untuk nomor Indonesia
    const adminWhatsAppNumber = "6281262947782"; // Ganti dengan nomor WhatsApp admin Anda

    // Buat pesan WhatsApp
    const whatsappMessage = `Halo Admin Kebab Frozen, saya ingin bertanya:\n\nNama: ${name}\nEmail: ${email}\nSubjek: ${subject}\nPesan: ${message}\n\nTerima kasih!`;

    // Encode pesan untuk URL
    const encodedMessage = encodeURIComponent(whatsappMessage);

    // Buat URL API WhatsApp
    const whatsappURL = `https://wa.me/${adminWhatsAppNumber}?text=${encodedMessage}`;

    // Buka URL di tab baru
    window.open(whatsappURL, "_blank");

    // Opsional: Reset formulir setelah pengiriman
    contactForm.reset();

    /*
     * Catatan Penting Mengenai Notifikasi WhatsApp:
     * Metode ini AKAN membuka aplikasi WhatsApp (atau web WhatsApp) di perangkat pengguna
     * dengan pesan yang sudah terisi otomatis.
     *
     * Namun, ini TIDAK akan secara otomatis MENGIRIM pesan tersebut atau
     * memberikan notifikasi langsung ke WhatsApp admin TANPA pengguna menekan tombol 'Kirim'
     * secara manual di dalam aplikasi WhatsApp mereka.
     *
     * Mengirim pesan secara otomatis atau memberikan notifikasi langsung dari website
     * ke WhatsApp tanpa interaksi pengguna TIDAK dimungkinkan melalui JavaScript sisi klien
     * karena alasan keamanan dan privasi. Ini hanya bisa dilakukan menggunakan
     * WhatsApp Business API, yang memerlukan pengaturan backend dan persetujuan dari WhatsApp.
     * Solusi ini berada di luar cakupan website HTML/CSS/JS sederhana.
     */
  });
}
