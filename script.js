// ======================================
// LIXERA STORE - PRODUCT DATABASE
// ======================================

const products = [

    {
        id: "alightmotion",
        name: "Alight Motion",
        image: "alightmotion.jpg",
        price: 7000,
        stock: 87,
        duration: "1 Tahun",
        category: "Kreativitas"
    },

    {
        id: "capcut",
        name: "CapCut",
        image: "capcut.jpg",
        price: 25000,
        stock: null,
        duration: "1 Bulan",
        category: "Kreativitas"
    },

    {
        id: "canva",
        name: "Canva",
        image: "canva.jpg",
        price: 10000,
        stock: null,
        duration: "1 Tahun",
        category: "Kreativitas"
    },

    {
        id: "wink",
        name: "Wink",
        image: "wink.jpg",
        price: 25000,
        stock: null,
        duration: "Tanya Admin",
        category: "Kreativitas"
    },

    {
        id: "youtube",
        name: "YouTube",
        image: "youtube.jpg",
        price: 15000,
        stock: null,
        duration: "Tanya Admin",
        category: "Hiburan"
    },

    {
        id: "netflix",
        name: "Netflix",
        image: "netflix.jpg",
        price: 50000,
        stock: null,
        duration: "Tanya Admin",
        category: "Hiburan"
    },

    {
        id: "vn",
        name: "VN",
        image: "vn.jpg",
        price: 35000,
        stock: null,
        duration: "Tanya Admin",
        category: "Kreativitas"
    },

    {
        id: "vidio",
        name: "Vidio",
        image: "vidio.jpg",
        price: 40000,
        stock: null,
        duration: "Tanya Admin",
        category: "Hiburan"
    },

    {
        id: "chatgpt",
        name: "ChatGPT",
        image: "chatgpt.jpg",
        price: 80000,
        stock: 71,
        duration: "Tanya Admin",
        category: "AI"
    },

    {
        id: "iqiyi",
        name: "iQIYI",
        image: "",
        price: 45000,
        stock: null,
        duration: "Tanya Admin",
        category: "Hiburan"
    },

    {
        id: "gemini",
        name: "Gemini",
        image: "gemini.jpg",
        price: 50000,
        stock: null,
        duration: "Tanya Admin",
        category: "AI"
    },

    {
        id: "disney",
        name: "Disney+ Hotstar",
        image: "disney.jpg",
        price: 30000,
        stock: null,
        duration: "Tanya Admin",
        category: "Hiburan"
    },

    {
        id: "picsart",
        name: "Picsart",
        image: "",
        price: 35000,
        stock: null,
        duration: "Tanya Admin",
        category: "Kreativitas"
    },

    {
        id: "spotify",
        name: "Spotify",
        image: "spotify.jpg",
        price: 30000,
        stock: null,
        duration: "Tanya Admin",
        category: "Hiburan"
    }

];


// ======================================
// ELEMENT
// ======================================

const productGrid =
    document.getElementById("productGrid");

const productSelect =
    document.getElementById("productSelect");

const searchProduct =
    document.getElementById("searchProduct");

let activeCategory = "Semua";


// ======================================
// FORMAT RUPIAH
// ======================================

function rupiah(number) {

    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(number);

}


// ======================================
// TAMPILKAN PRODUK
// ======================================

function renderProducts() {

    const keyword =
        searchProduct.value.toLowerCase();

    const filtered = products.filter(product => {

        const matchName =
            product.name.toLowerCase().includes(keyword);

        const matchCategory =
            activeCategory === "Semua" ||
            product.category === activeCategory;

        return matchName && matchCategory;

    });

    productGrid.innerHTML = "";

    filtered.forEach(product => {

        const stockText =
            product.stock === null
                ? "Cek stok ke admin"
                : product.stock > 0
                    ? `Stok tersedia: ${product.stock}`
                    : "STOK HABIS";

        const stockClass =
            product.stock === null
                ? ""
                : product.stock > 0
                    ? "stock-available"
                    : "stock-empty";

        const isSoldOut = product.stock === 0;

        const imageContent = product.image
            ? `<img class="product-image"
                   src="${product.image}"
                   alt="${product.name}"
                   onerror="this.outerHTML='<div class=&quot;product-placeholder&quot;>${product.name.charAt(0)}</div>'">`
            : `<div class="product-placeholder">${product.name.charAt(0)}</div>`;

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `

            ${imageContent}

            <h3>${product.name}</h3>

            <div class="product-price">
                ${rupiah(product.price)}
            </div>

            <div class="product-stock ${stockClass}">
                ${stockText}
            </div>

            <button
                class="product-order-btn"
                data-id="${product.id}"
                ${isSoldOut ? "disabled" : ""}
            >
                ${isSoldOut ? "STOK HABIS" : "PESAN SEKARANG"}
            </button>

        `;

        productGrid.appendChild(card);

    });

    if (filtered.length === 0) {

        productGrid.innerHTML =
            "<p>Produk tidak ditemukan.</p>";

    }

}


// ======================================
// PILIH PRODUK UNTUK ORDER
// ======================================

function fillProductSelect() {

    productSelect.innerHTML =
        '<option value="">-- Pilih Produk --</option>';

    products.forEach(product => {

        const option =
            document.createElement("option");

        option.value = product.id;

        option.textContent =
            `${product.name} - ${rupiah(product.price)}`;

        productSelect.appendChild(option);

    });

}


// ======================================
// EVENT PRODUK
// ======================================

productGrid.addEventListener("click", function(event) {

    const button =
        event.target.closest(".product-order-btn");

    if (!button) return;

    const id = button.dataset.id;

    const product =
        products.find(item => item.id === id);

    if (!product || product.stock === 0) return;

    productSelect.value = id;

    updatePrice();

    document.getElementById("pemesanan")
        .scrollIntoView({ behavior: "smooth" });

});

searchProduct.addEventListener("input", renderProducts);


document.querySelectorAll(".filter-btn")
    .forEach(button => {

        button.addEventListener("click", function() {

            document.querySelectorAll(".filter-btn")
                .forEach(btn => btn.classList.remove("active"));

            this.classList.add("active");

            activeCategory = this.dataset.category;

            renderProducts();

        });

    });


// ======================================
// NAVIGASI MOBILE
// ======================================

document.getElementById("menuToggle")
    .addEventListener("click", function() {

        const nav =
            document.getElementById("navigation");

        nav.classList.toggle("show");

    });

document.querySelectorAll(".nav-link")
    .forEach(link => {

        link.addEventListener("click", function() {

            document.querySelectorAll(".nav-link")
                .forEach(item => item.classList.remove("active"));

            this.classList.add("active");

            document.getElementById("navigation")
                .classList.remove("show");

        });

    });


// ======================================
// INISIALISASI
// ======================================

renderProducts();
fillProductSelect();
// ======================================
// LIXERA - PROMO SYSTEM
// ======================================

const promoCodes = [
    "lixapkstore",
    "seanpremium",
    "zikganteng",
    "taratampan",
    "aressicoll"
];

const PROMO_DISCOUNT = 5000;

let appliedPromo = null;
let currentOrder = null;

const promoInput =
    document.getElementById("promoInput");

const promoMessage =
    document.getElementById("promoMessage");

const productPrice =
    document.getElementById("productPrice");

const discountPrice =
    document.getElementById("discountPrice");

const totalPrice =
    document.getElementById("totalPrice");


// ======================================
// DATA HARGA
// ======================================

function getSelectedProduct() {

    return products.find(product =>
        product.id === productSelect.value
    );

}


// ======================================
// CEK PROMO
// ======================================

function applyPromoCode() {

    const code =
        promoInput.value.trim().toLowerCase();

    if (!code) {

        promoMessage.textContent =
            "Masukkan kode promo terlebih dahulu.";

        appliedPromo = null;
        updatePrice();
        return;

    }

    if (!promoCodes.includes(code)) {

        promoMessage.textContent =
            "Kode promo tidak valid.";

        promoMessage.style.color = "#fb7185";

        appliedPromo = null;
        updatePrice();
        return;

    }

    const usedPromos =
        JSON.parse(localStorage.getItem("lixeraUsedPromos") || "[]");

    if (usedPromos.includes(code)) {

        promoMessage.textContent =
            "Kode promo ini sudah pernah digunakan.";

        promoMessage.style.color = "#fb7185";

        appliedPromo = null;
        updatePrice();
        return;

    }

    appliedPromo = code;

    promoMessage.textContent =
        "Promo berhasil dipasang! Diskon Rp5.000.";

    promoMessage.style.color = "#4ade80";

    updatePrice();

}


document.getElementById("applyPromo")
    .addEventListener("click", applyPromoCode);


// ======================================
// HITUNG TOTAL HARGA
// ======================================

function updatePrice() {

    const product = getSelectedProduct();

    if (!product) {

        productPrice.textContent = "-";
        discountPrice.textContent = "Rp0";
        totalPrice.textContent = "-";

        return;

    }

    let discount = appliedPromo
        ? PROMO_DISCOUNT
        : 0;

    discount = Math.min(discount, product.price);

    const total = product.price - discount;

    productPrice.textContent =
        rupiah(product.price);

    discountPrice.textContent =
        rupiah(discount);

    totalPrice.textContent =
        rupiah(total);

}

productSelect.addEventListener("change", function() {

    appliedPromo = null;

    promoInput.value = "";

    promoMessage.textContent =
        "Gunakan kode promo untuk diskon Rp5.000.";

    promoMessage.style.color = "";

    updatePrice();

});


// ======================================
// PENYIMPANAN PESANAN
// ======================================

function getOrders() {

    return JSON.parse(
        localStorage.getItem("lixeraOrders") || "[]"
    );

}

function saveOrders(orders) {

    localStorage.setItem(
        "lixeraOrders",
        JSON.stringify(orders)
    );

}


// ======================================
// BUAT PESANAN
// ======================================

document.getElementById("orderForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const name =
            document.getElementById("customerName")
                .value.trim();

        const phone =
            document.getElementById("customerPhone")
                .value.trim();

        const packageName =
            document.getElementById("packageInput")
                .value.trim();

        const product = getSelectedProduct();

        if (!product) {

            alert("Silakan pilih produk terlebih dahulu.");

            return;

        }

        if (product.stock === 0) {

            alert("Maaf, produk sedang habis.");

            return;

        }

        if (!/^(\+62|62|0)[0-9]{8,13}$/.test(phone)) {

            alert("Nomor WhatsApp tidak valid.");

            return;

        }

        const discount = appliedPromo
            ? Math.min(PROMO_DISCOUNT, product.price)
            : 0;

        const total = product.price - discount;

        const orderId =
            "LXR-" + Date.now().toString().slice(-9);

        currentOrder = {

            id: orderId,

            name: name,

            phone: phone,

            productId: product.id,

            productName: product.name,

            package: packageName || product.duration,

            price: product.price,

            discount: discount,

            promo: appliedPromo,

            total: total,

            status: "Menunggu Pembayaran",

            createdAt: new Date().toISOString()

        };

        const orders = getOrders();

        orders.push(currentOrder);

        saveOrders(orders);

        document.getElementById("paymentAmount")
            .textContent = rupiah(total);

        document.getElementById("paymentModal")
            .classList.add("show");

    });


// ======================================
// TUTUP POPUP
// ======================================

document.getElementById("closePayment")
    .addEventListener("click", function() {

        document.getElementById("paymentModal")
            .classList.remove("show");

    });


// ======================================
// WHATSAPP KONFIRMASI
// ======================================

document.getElementById("confirmWhatsApp")
    .addEventListener("click", function() {

        if (!currentOrder) {

            alert("Pesanan tidak ditemukan.");

            return;

        }

        const message =

`HALO ADMIN LIXERA!

Saya ingin konfirmasi pesanan.

ID Pesanan: ${currentOrder.id}

Nama: ${currentOrder.name}

Nomor WhatsApp: ${currentOrder.phone}

Produk: ${currentOrder.productName}

Paket: ${currentOrder.package}

Harga: ${rupiah(currentOrder.price)}

Promo: ${currentOrder.promo || "Tidak menggunakan promo"}

Diskon: ${rupiah(currentOrder.discount)}

TOTAL: ${rupiah(currentOrder.total)}

Saya sudah melakukan pembayaran.
Berikutnya saya akan mengirimkan bukti pembayaran.

Terima kasih!`;

        const whatsappURL =
            "https://wa.me/628818238236?text=" +
            encodeURIComponent(message);

        window.open(whatsappURL, "_blank");

    });
// ======================================
// LIXERA - ADMIN SYSTEM
// ======================================

// GANTI PASSWORD INI SEBELUM WEBSITE ONLINE
const ADMIN_PASSWORD = "LIXERA2026";


// ======================================
// AMBIL DATA STOK TERSIMPAN
// ======================================

function loadStock() {

    const savedStock = JSON.parse(
        localStorage.getItem("lixeraStock") || "{}"
    );

    products.forEach(product => {

        if (Object.prototype.hasOwnProperty.call(
            savedStock,
            product.id
        )) {

            product.stock = savedStock[product.id];

        }

    });

}

function saveStock() {

    const stockData = {};

    products.forEach(product => {

        stockData[product.id] = product.stock;

    });

    localStorage.setItem(
        "lixeraStock",
        JSON.stringify(stockData)
    );

}


// ======================================
// LOGIN ADMIN
// ======================================

document.getElementById("adminLoginBtn")
    .addEventListener("click", function() {

        const password =
            document.getElementById("adminPassword").value;

        if (password !== ADMIN_PASSWORD) {

            alert("Password admin salah!");

            return;

        }

        document.getElementById("adminLogin")
            .classList.add("hidden");

        document.getElementById("adminDashboard")
            .classList.remove("hidden");

        renderAdminOrders();

    });


// ======================================
// TAMPILKAN PESANAN ADMIN
// ======================================

function renderAdminOrders() {

    const container =
        document.getElementById("adminOrders");

    const orders = getOrders();

    container.innerHTML = "";

    if (orders.length === 0) {

        container.innerHTML =
            "<p>Belum ada pesanan.</p>";

        return;

    }

    [...orders].reverse().forEach(order => {

        const orderElement =
            document.createElement("div");

        orderElement.className = "admin-order";

        const isPaid =
            order.status === "LUNAS";

        orderElement.innerHTML = `

            <h4>${order.productName}</h4>

            <p>ID: ${order.id}</p>

            <p>Nama: ${order.name}</p>

            <p>WhatsApp: ${order.phone}</p>

            <p>Paket: ${order.package}</p>

            <p>Total: ${rupiah(order.total)}</p>

            <p>Promo: ${order.promo || "-"}</p>

            <p>Status: ${order.status}</p>

            <button
                data-order-id="${order.id}"
                ${isPaid ? "disabled" : ""}
            >
                ${isPaid ? "SUDAH LUNAS" : "KONFIRMASI LUNAS"}
            </button>

        `;

        container.appendChild(orderElement);

    });

}


// ======================================
// KONFIRMASI PEMBAYARAN ADMIN
// ======================================

document.getElementById("adminOrders")
    .addEventListener("click", function(event) {

        const button =
            event.target.closest("button[data-order-id]");

        if (!button) return;

        const orderId = button.dataset.orderId;

        const orders = getOrders();

        const order = orders.find(item =>
            item.id === orderId
        );

        if (!order || order.status === "LUNAS") {

            return;

        }

        const product = products.find(item =>
            item.id === order.productId
        );

        if (!product) {

            alert("Produk tidak ditemukan.");

            return;

        }

        if (
            product.stock !== null &&
            product.stock <= 0
        ) {

            alert("Stok produk sudah habis. Pesanan tidak bisa dilunasi.");

            return;

        }

        const confirmation = confirm(

            `Pastikan pembayaran ${order.id} sudah diterima.\n\n` +
            `Produk: ${order.productName}\n` +
            `Total: ${rupiah(order.total)}\n\n` +
            `Konfirmasi pembayaran lunas?`

        );

        if (!confirmation) return;


        // STOK BERKURANG SETELAH ADMIN KONFIRMASI

        if (product.stock !== null) {

            product.stock--;

        }


        // PROMO DITANDAI TERPAKAI

        if (order.promo) {

            const usedPromos = JSON.parse(

                localStorage.getItem("lixeraUsedPromos") || "[]"

            );

            if (!usedPromos.includes(order.promo)) {

                usedPromos.push(order.promo);

            }

            localStorage.setItem(
                "lixeraUsedPromos",
                JSON.stringify(usedPromos)
            );

        }


        // UPDATE STATUS PESANAN

        order.status = "LUNAS";

        order.paidAt = new Date().toISOString();

        saveOrders(orders);

        saveStock();

        renderAdminOrders();

        renderProducts();

        alert(
            "Pembayaran berhasil dikonfirmasi!\nStok produk telah diperbarui."
        );

    });


// ======================================
// UPDATE AWAL WEBSITE
// ======================================

loadStock();

renderProducts();

fillProductSelect();

updatePrice();
