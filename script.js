
// ===================================
// LIXERA STORE - MAIN SCRIPT
// ===================================

// NOMOR WHATSAPP ADMIN
const ADMIN_WA = "628818238236";

// DATA PRODUK
let selectedProduct = "";
let selectedPrice = 0;
let orderData = null;

// FORMAT RUPIAH
function formatRupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(number);
}

// NAVIGASI HALAMAN
function showPage(pageId, clickedButton) {
  const pages = document.querySelectorAll(".page");

  pages.forEach(page => {
    page.classList.remove("active");
  });

  const target = document.getElementById(pageId);

  if (!target) return;

  target.classList.add("active");

  document.querySelectorAll(".nav-item").forEach(btn => {
    btn.classList.remove("active");
  });

  if (clickedButton) {
    clickedButton.classList.add("active");
  } else {
    const navMap = {
      homePage: 0,
      catalogPage: 1,
      howPage: 2,
      contactPage: 3
    };

    const navIndex = navMap[pageId];

    if (navIndex !== undefined) {
      document.querySelectorAll(".nav-item")[navIndex]
        .classList.add("active");
    }
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// MENU FILTER PRODUK
function filterProducts(status, button) {
  const cards = document.querySelectorAll(".product-card");

  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.classList.remove("active");
  });

  button.classList.add("active");

  cards.forEach(card => {
    if (
      status === "all" ||
      card.dataset.status === status
    ) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });
}

// PILIH PRODUK
function selectProduct(name, price) {
  selectedProduct = name;
  selectedPrice = Number(price);

  if (!selectedPrice || selectedPrice <= 0) {
    alert("Harga produk belum tersedia.");
    return;
  }

  document.getElementById("selectedName").textContent =
    selectedProduct;

  document.getElementById("selectedPrice").textContent =
    formatRupiah(selectedPrice);

  document.getElementById("orderForm").reset();

  showPage("orderPage");
}

// TANYA KETERSEDIAAN ADMIN
function askAdmin(product) {
  const message =
    "Halo Min, saya ingin bertanya apakah " +
    product +
    " masih tersedia? Mohon info harga dan paketnya. Terima kasih.";

  const url =
    "https://wa.me/" +
    ADMIN_WA +
    "?text=" +
    encodeURIComponent(message);

  window.open(url, "_blank", "noopener");
}

// KONTAK ADMIN
function contactAdmin() {
  const message =
    "Halo Admin LIXERA STORE, saya ingin bertanya tentang aplikasi premium.";

  window.open(
    "https://wa.me/" + ADMIN_WA +
    "?text=" + encodeURIComponent(message),
    "_blank",
    "noopener"
  );
}

// FORM PEMESANAN
document.getElementById("orderForm")
  .addEventListener("submit", function(event) {
    event.preventDefault();

    const name =
      document.getElementById("customerName").value.trim();

    const phone =
      document.getElementById("customerWA").value.trim();

    const email =
      document.getElementById("customerEmail").value.trim();

    const note =
      document.getElementById("customerNote").value.trim();

    if (!name || !phone) {
      alert("Nama dan nomor WhatsApp wajib diisi.");
      return;
    }

    if (!/^[0-9+\-\s]{8,18}$/.test(phone)) {
      alert("Periksa kembali nomor WhatsApp kamu.");
      return;
    }

    if (!selectedProduct || selectedPrice <= 0) {
      alert("Silakan pilih produk terlebih dahulu.");
      return;
    }

    orderData = {
      name,
      phone,
      email,
      note,
      product: selectedProduct,
      price: selectedPrice
    };

    openPayment();
  });

// ===================================
// SISTEM POP-UP PEMBAYARAN
// ===================================

function openPayment() {
  if (!orderData) {
    alert("Data pesanan belum lengkap.");
    return;
  }

  document.getElementById("paymentProduct").textContent =
    orderData.product;

  document.getElementById("paymentPrice").textContent =
    formatRupiah(orderData.price);

  const modal = document.getElementById("paymentModal");

  modal.classList.add("show");

  document.body.style.overflow = "hidden";
}

// TUTUP POP-UP
function closePayment() {
  document.getElementById("paymentModal")
    .classList.remove("show");

  document.body.style.overflow = "";
}

// KLIK DI LUAR POP-UP
document.getElementById("paymentModal")
  .addEventListener("click", function(event) {
    if (event.target === this) {
      closePayment();
    }
  });

// TOMBOL ESCAPE
document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    closePayment();
  }
});

// ===================================
// KONFIRMASI WHATSAPP
// ===================================

function sendOrderWhatsApp() {
  if (!orderData) {
    alert("Data pesanan tidak ditemukan.");
    return;
  }

  const message =
`Min, saya udah order APK Premium. Tolong konfirmasi.

DETAIL PESANAN
Nama: ${orderData.name}
Nomor WA: ${orderData.phone}
Produk: ${orderData.product}
Harga: ${formatRupiah(orderData.price)}
${orderData.email ? "Email: " + orderData.email : ""}
${orderData.note ? "Catatan: " + orderData.note : ""}

Saya sudah melakukan pembayaran melalui QRIS.
Mohon dicek dan dikonfirmasi.

Terima kasih.
LIXERA STORE 🇮🇩`;

  const whatsappURL =
    "https://wa.me/" +
    ADMIN_WA +
    "?text=" +
    encodeURIComponent(message);

  window.open(whatsappURL, "_blank", "noopener");
}

// ===================================
// AKHIR SCRIPT
// ===================================

// HALAMAN AWAL
document.addEventListener("DOMContentLoaded", function() {
  showPage("homePage");
});

// ===================================
// IMAGE HANDLING & FALLBACK
// ===================================

// GAMBAR PRODUK
document.querySelectorAll(".product-image img")
  .forEach(img => {
    img.loading = "lazy";

    img.addEventListener("error", function() {
      const parent = this.parentElement;

      this.style.display = "none";

      parent.style.display = "flex";
      parent.style.alignItems = "center";
      parent.style.justifyContent = "center";
      parent.style.background =
        "linear-gradient(135deg,#102c50,#071225)";

      const fallback = document.createElement("span");
      fallback.textContent = this.alt;
      fallback.style.color = "#58c5ff";
      fallback.style.fontSize = "12px";
      fallback.style.fontWeight = "800";
      fallback.style.textAlign = "center";
      fallback.style.padding = "12px";

      parent.appendChild(fallback);
    });
  });

// QRIS FALLBACK
const qrImage = document.querySelector(".qr-container img");

qrImage.addEventListener("error", function() {
  this.style.display = "none";

  const message = document.createElement("p");
  message.textContent = "GAMBAR QRIS BELUM TERSEDIA";
  message.style.color = "#071225";
  message.style.fontWeight = "900";
  message.style.fontSize = "12px";
  message.style.padding = "35px 10px";

  this.parentElement.appendChild(message);
});

// ===================================
// SELESAI - LIXERA STORE
// ===================================

