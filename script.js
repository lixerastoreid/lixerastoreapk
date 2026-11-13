// ==========================================
// LIXERA STORE - DATABASE PRODUK
// ==========================================

const products = [

    {
        id: "alightmotion",
        name: "Alight Motion",
        image: "alightmotion.jpg",
        price: 7000,
        stock: 87,
        duration: "1 Tahun",
        category: "Kreativitas",
        description: "Aplikasi editing video dan animasi untuk kebutuhan kreatif."
    },

    {
        id: "capcut",
        name: "CapCut",
        image: "capcut.jpg",
        price: 25000,
        stock: null,
        duration: "1 Bulan",
        category: "Kreativitas",
        description: "Aplikasi editing video dengan berbagai fitur kreatif."
    },

    {
        id: "canva",
        name: "Canva",
        image: "canva.jpg",
        price: 10000,
        stock: null,
        duration: "1 Tahun",
        category: "Kreativitas",
        description: "Aplikasi desain grafis untuk berbagai kebutuhan."
    },

    {
        id: "wink",
        name: "Wink",
        image: "wink.jpg",
        price: 25000,
        stock: null,
        duration: "Tanya Admin",
        category: "Kreativitas",
        description: "Aplikasi pengeditan foto dan video."
    },

    {
        id: "youtube",
        name: "YouTube",
        image: "youtube.jpg",
        price: 15000,
        stock: null,
        duration: "Tanya Admin",
        category: "Hiburan",
        description: "Layanan video dan hiburan digital."
    },

    {
        id: "netflix",
        name: "Netflix",
        image: "netflix.jpg",
        price: 50000,
        stock: null,
        duration: "Tanya Admin",
        category: "Hiburan",
        description: "Layanan streaming film dan serial."
    },

    {
        id: "vn",
        name: "VN",
        image: "vn.jpg",
        price: 35000,
        stock: null,
        duration: "Tanya Admin",
        category: "Kreativitas",
        description: "Aplikasi editing video."
    },

    {
        id: "vidio",
        name: "Vidio",
        image: "vidio.jpg",
        price: 40000,
        stock: null,
        duration: "Tanya Admin",
        category: "Hiburan",
        description: "Platform streaming hiburan dan olahraga."
    },

    {
        id: "chatgpt",
        name: "ChatGPT",
        image: "chatgpt.jpg",
        price: 80000,
        stock: 71,
        duration: "Tanya Admin",
        category: "AI",
        description: "Asisten kecerdasan buatan untuk membantu berbagai pekerjaan."
    },

    {
        id: "iqiyi",
        name: "iQIYI",
        image: "",
        price: 45000,
        stock: null,
        duration: "Tanya Admin",
        category: "Hiburan",
        description: "Platform streaming drama dan film."
    },

    {
        id: "gemini",
        name: "Gemini",
        image: "gemini.jpg",
        price: 50000,
        stock: null,
        duration: "Tanya Admin",
        category: "AI",
        description: "Asisten AI untuk membantu produktivitas."
    },

    {
        id: "disney",
        name: "Disney+ Hotstar",
        image: "disney.jpg",
        price: 30000,
        stock: null,
        duration: "Tanya Admin",
        category: "Hiburan",
        description: "Platform streaming film dan serial."
    },

    {
        id: "picsart",
        name: "Picsart",
        image: "",
        price: 35000,
        stock: null,
        duration: "Tanya Admin",
        category: "Kreativitas",
        description: "Aplikasi desain dan editing foto."
    },

    {
        id: "spotify",
        name: "Spotify",
        image: "spotify.jpg",
        price: 30000,
        stock: null,
        duration: "Tanya Admin",
        category: "Hiburan",
        description: "Platform streaming musik dan podcast."
    }

];


// ==========================================
// ELEMENT HTML
// ==========================================

const homePage =
    document.getElementById("homePage");

const detailPage =
    document.getElementById("detailPage");

const orderPage =
    document.getElementById("orderPage");

const adminPage =
    document.getElementById("adminPage");

const productGrid =
    document.getElementById("productGrid");

const productSelect =
    document.getElementById("productSelect");

const searchProduct =
    document.getElementById("searchProduct");

let activeCategory = "Semua";

let selectedProductId = null;

let appliedPromo = null;

let currentOrder = null;


// ==========================================
// FORMAT HARGA
// ==========================================

function rupiah(number) {

    return new Intl.NumberFormat("id-ID", {

        style: "currency",

        currency: "IDR",

        maximumFractionDigits: 0

    }).format(number);

}


// ==========================================
// PENYIMPANAN STOK
// ==========================================

function loadStock() {

    const savedStock = JSON.parse(

        localStorage.getItem("lixeraStock") || "{}"

    );

    products.forEach(product => {

        if (
            Object.prototype.hasOwnProperty.call(
                savedStock,
                product.id
            )
        ) {

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


// ==========================================
// GAMBAR PRODUK
// ==========================================

function productImage(product) {

    if (product.image) {

        return `

            <img
                class="product-image"
                src="${product.image}"
                alt="${product.name}"
                onerror="this.outerHTML='<div class=&quot;product-placeholder&quot;>${product.name.charAt(0)}</div>'"
            >

        `;

    }

    return `

        <div class="product-placeholder">
            ${product.name.charAt(0)}
        </div>

    `;

}


// ==========================================
// INFORMASI STOK
// ==========================================

function stockInformation(product) {

    if (product.stock === null) {

        return "Cek stok ke admin";

    }

    if (product.stock === 0) {

        return "STOK HABIS";

    }

    return `Stok tersedia: ${product.stock}`;

}


// ==========================================
// RENDER KATALOG
// ==========================================

function renderProducts() {

    const keyword =
        searchProduct.value.toLowerCase().trim();

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

        const card = document.createElement("div");

        card.className = "product-card";

        const soldOut = product.stock === 0;

        card.innerHTML = `

            ${productImage(product)}

            <h3>${product.name}</h3>

            <div class="product-price">
                ${rupiah(product.price)}
            </div>

            <div class="product-stock ${
                soldOut ? "stock-empty" : "stock-available"
            }">
                ${stockInformation(product)}
            </div>

            <button
                class="product-order-btn"
                data-id="${product.id}"
                ${soldOut ? "disabled" : ""}
            >
                ${soldOut ? "STOK HABIS" : "LIHAT DETAIL"}
            </button>

        `;

        productGrid.appendChild(card);

    });

    if (!filtered.length) {

        productGrid.innerHTML =
            "<p>Produk tidak ditemukan.</p>";

    }

}


// ==========================================
// DROPDOWN PRODUK
// ==========================================

function fillProductSelect() {

    productSelect.innerHTML =
        '<option value="">Pilih produk</option>';

    products.forEach(product => {

        const option =
            document.createElement("option");

        option.value = product.id;

        option.textContent =
            `${product.name} - ${rupiah(product.price)}`;

        productSelect.appendChild(option);

    });

}


// ==========================================
// NAVIGASI HALAMAN INTERNAL
// ==========================================

function showPage(page) {

    homePage.classList.add("hidden");

    detailPage.classList.add("hidden");

    orderPage.classList.add("hidden");

    adminPage.classList.add("hidden");

    if (page === "home" || page === "produk") {

        homePage.classList.remove("hidden");

    }

    if (page === "detail") {

        detailPage.classList.remove("hidden");

    }

    if (page === "pemesanan") {

        orderPage.classList.remove("hidden");

    }

    if (page === "admin") {

        adminPage.classList.remove("hidden");

    }

    document.getElementById("navigation")
        .classList.remove("show");

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


// ==========================================
// BUKA DETAIL PRODUK
// ==========================================

function openProductDetail(id) {

    const product = products.find(item =>

        item.id === id

    );

    if (!product) return;

    if (product.stock === 0) {

        alert("Maaf, produk sedang habis.");

        return;

    }

    selectedProductId = id;

    document.getElementById("detailImage").innerHTML =
        productImage(product);

    document.getElementById("detailName").textContent =
        product.name;

    document.getElementById("detailDescription").textContent =
        product.description;

    document.getElementById("detailPrice").textContent =
        rupiah(product.price);

    document.getElementById("detailStock").textContent =
        stockInformation(product);

    document.getElementById("detailDuration").textContent =
        "Durasi: " + product.duration;

    showPage("detail");

}


// ==========================================
// TOMBOL KATALOG
// ==========================================

productGrid.addEventListener("click", function(event) {

    const button =
        event.target.closest(".product-order-btn");

    if (!button) return;

    openProductDetail(button.dataset.id);

});


document.getElementById("exploreBtn")
    .addEventListener("click", function() {

        showPage("produk");

        document.getElementById("produk")
            .scrollIntoView();

    });


document.getElementById("backToProducts")
    .addEventListener("click", function() {

        showPage("produk");

        document.getElementById("produk")
            .scrollIntoView();

    });


// ==========================================
// KLIK PESAN DARI DETAIL
// ==========================================

document.getElementById("detailOrderBtn")
    .addEventListener("click", function() {

        productSelect.value = selectedProductId;

        document.getElementById("packageInput").value = "";

        appliedPromo = null;

        document.getElementById("promoInput").value = "";

        document.getElementById("promoMessage").textContent =
            "Gunakan kode promo untuk diskon Rp5.000.";

        updatePrice();

        showPage("pemesanan");

    });


// ==========================================
// PENCARIAN DAN FILTER
// ==========================================

searchProduct.addEventListener("input", renderProducts);


document.querySelectorAll(".filter-btn")
    .forEach(button => {

        button.addEventListener("click", function() {

            document.querySelectorAll(".filter-btn")
                .forEach(item => item.classList.remove("active"));

            this.classList.add("active");

            activeCategory = this.dataset.category;

            renderProducts();

        });

    });


// ==========================================
// NAVBAR
// ==========================================

document.getElementById("menuToggle")
    .addEventListener("click", function() {

        document.getElementById("navigation")
            .classList.toggle("show");

    });


document.querySelectorAll(".nav-link")
    .forEach(link => {

        link.addEventListener("click", function(event) {

            event.preventDefault();

            const page = this.dataset.page;

            if (page === "pemesanan") {

                showPage("pemesanan");

            } else {

                showPage(page);

            }

            document.querySelectorAll(".nav-link")
                .forEach(item => item.classList.remove("active"));

            this.classList.add("active");

        });

    });


// ==========================================
// KEMBALI DARI FORMULIR
// ==========================================

document.getElementById("backToDetail")
    .addEventListener("click", function() {

        showPage("detail");

    });
// ==========================================
// PROMO LIXERA
// ==========================================

const promoCodes = [

    "lixapkstore",

    "seanpremium",

    "zikganteng",

    "taratampan",

    "aressicoll"

];

const PROMO_DISCOUNT = 5000;

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


// ==========================================
// AMBIL PRODUK TERPILIH
// ==========================================

function getSelectedProduct() {

    return products.find(product =>

        product.id === productSelect.value

    );

}


// ==========================================
// CEK PROMO YANG SUDAH DIGUNAKAN
// ==========================================

function getUsedPromos() {

    return JSON.parse(

        localStorage.getItem("lixeraUsedPromos") || "[]"

    );

}


// ==========================================
// TERAPKAN KODE PROMO
// ==========================================

function applyPromoCode() {

    const code =
        promoInput.value.trim().toLowerCase();

    const product = getSelectedProduct();

    if (!product) {

        promoMessage.textContent =
            "Pilih produk terlebih dahulu.";

        return;

    }

    if (!code) {

        promoMessage.textContent =
            "Masukkan kode promo.";

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

    if (getUsedPromos().includes(code)) {

        promoMessage.textContent =
            "Kode promo sudah digunakan.";

        promoMessage.style.color = "#fb7185";

        appliedPromo = null;

        updatePrice();

        return;

    }

    appliedPromo = code;

    promoMessage.textContent =
        "Berhasil! Kamu mendapatkan diskon Rp5.000.";

    promoMessage.style.color = "#4ade80";

    updatePrice();

}


document.getElementById("applyPromo")
    .addEventListener("click", applyPromoCode);


// ==========================================
// HITUNG HARGA
// ==========================================

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


// ==========================================
// SAAT PRODUK BERUBAH
// ==========================================

productSelect.addEventListener("change", function() {

    appliedPromo = null;

    promoInput.value = "";

    promoMessage.textContent =
        "Gunakan kode promo untuk diskon Rp5.000.";

    promoMessage.style.color = "";

    updatePrice();

});


// ==========================================
// DATABASE PESANAN LOKAL
// ==========================================

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


// ==========================================
// NOMOR TRANSAKSI
// ==========================================

function generateOrderId() {

    return "LXR-" +

        Date.now().toString().slice(-9);

}


// ==========================================
// SUBMIT PEMESANAN
// ==========================================

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

            alert("Pilih produk terlebih dahulu.");

            return;

        }

        if (product.stock === 0) {

            alert("Produk sedang habis.");

            return;

        }

        if (!/^(\+62|62|0)[0-9]{8,13}$/.test(phone)) {

            alert("Nomor WhatsApp tidak valid.");

            return;

        }

        if (
            appliedPromo &&
            getUsedPromos().includes(appliedPromo)
        ) {

            alert("Kode promo sudah digunakan.");

            appliedPromo = null;

            updatePrice();

            return;

        }

        const discount = appliedPromo
            ? Math.min(PROMO_DISCOUNT, product.price)
            : 0;

        const total = product.price - discount;

        currentOrder = {

            id: generateOrderId(),

            name: name,

            phone: phone,

            productId: product.id,

            productName: product.name,

            package: packageName || product.duration,

            price: product.price,

            discount: discount,

            promo: appliedPromo,

            total: total,

            status: "MENUNGGU PEMBAYARAN",

            createdAt: new Date().toISOString()

        };


        // SIMPAN PESANAN

        const orders = getOrders();

        orders.push(currentOrder);

        saveOrders(orders);


        // TAMPILKAN NOMINAL QR

        document.getElementById("paymentAmount")
            .textContent = rupiah(total);


        document.getElementById("paymentOrderInfo")
            .innerHTML = `

                ID Pesanan: <b>${currentOrder.id}</b><br>

                Produk: <b>${currentOrder.productName}</b><br>

                Paket: <b>${currentOrder.package}</b>

            `;


        // TAMPILKAN POPUP

        document.getElementById("paymentModal")
            .classList.add("show");

    });


// ==========================================
// TUTUP POPUP PEMBAYARAN
// ==========================================

document.getElementById("closePayment")
    .addEventListener("click", function() {

        document.getElementById("paymentModal")
            .classList.remove("show");

    });


// ==========================================
// KONFIRMASI WHATSAPP
// ==========================================

document.getElementById("confirmWhatsApp")
    .addEventListener("click", function() {

        if (!currentOrder) {

            alert("Data pesanan tidak ditemukan.");

            return;

        }

        const message = `

HALO ADMIN LIXERA!

Saya ingin konfirmasi pembayaran.

ID Pesanan: ${currentOrder.id}

Nama: ${currentOrder.name}

Nomor WhatsApp: ${currentOrder.phone}

Produk: ${currentOrder.productName}

Paket: ${currentOrder.package}

Harga: ${rupiah(currentOrder.price)}

Kode Promo: ${currentOrder.promo || "Tidak ada"}

Diskon: ${rupiah(currentOrder.discount)}

TOTAL BAYAR: ${rupiah(currentOrder.total)}

Saya sudah melakukan pembayaran melalui QRIS.

Saya akan mengirimkan bukti pembayaran.

Terima kasih.

        `;

        const whatsappURL =

            "https://wa.me/628818238236?text=" +

            encodeURIComponent(message);

        window.open(whatsappURL, "_blank");

    });


// ==========================================
// TUTUP MODAL KETIKA KLIK LUAR
// ==========================================

document.getElementById("paymentModal")
    .addEventListener("click", function(event) {

        if (event.target === this) {

            this.classList.remove("show");

        }

    });
// ==========================================
// LIXERA ADMIN SYSTEM
// ==========================================

// PASSWORD ADMIN SEMENTARA
// GANTI SEBELUM WEBSITE DIPAKAI

const ADMIN_PASSWORD = "LIXERA2026";


// ==========================================
// LOGIN ADMIN
// ==========================================

document.getElementById("openAdmin")
    .addEventListener("click", function() {

        showPage("admin");

    });


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


// ==========================================
// LOGOUT ADMIN
// ==========================================

document.getElementById("adminLogout")
    .addEventListener("click", function() {

        document.getElementById("adminLogin")
            .classList.remove("hidden");

        document.getElementById("adminDashboard")
            .classList.add("hidden");

        document.getElementById("adminPassword").value = "";

        showPage("home");

    });


// ==========================================
// TAMPILKAN DAFTAR PESANAN
// ==========================================

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

        const element = document.createElement("div");

        element.className = "admin-order";

        const paid = order.status === "LUNAS";

        element.innerHTML = `

            <h4>${order.productName}</h4>

            <p>ID Pesanan: ${order.id}</p>

            <p>Nama: ${order.name}</p>

            <p>WhatsApp: ${order.phone}</p>

            <p>Paket: ${order.package}</p>

            <p>Harga: ${rupiah(order.price)}</p>

            <p>Promo: ${order.promo || "-"}</p>

            <p>Diskon: ${rupiah(order.discount)}</p>

            <p>Total: ${rupiah(order.total)}</p>

            <p>Status: <b>${order.status}</b></p>

            <button
                data-order-id="${order.id}"
                ${paid ? "disabled" : ""}
            >
                ${paid ? "SUDAH LUNAS" : "KONFIRMASI LUNAS"}
            </button>

        `;

        container.appendChild(element);

    });

}


// ==========================================
// KONFIRMASI PEMBAYARAN
// ==========================================

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


        // CEK STOK SEBELUM LUNAS

        if (
            product.stock !== null &&
            product.stock <= 0
        ) {

            alert("Stok produk sudah habis.");

            return;

        }


        // KONFIRMASI ADMIN

        const confirmation = confirm(

            "PASTIKAN PEMBAYARAN SUDAH DITERIMA!\n\n" +

            "ID: " + order.id + "\n" +

            "Produk: " + order.productName + "\n" +

            "Total: " + rupiah(order.total) + "\n\n" +

            "Konfirmasi pembayaran lunas?"

        );

        if (!confirmation) return;


        // KURANGI STOK SETELAH ADMIN KONFIRMASI

        if (product.stock !== null) {

            product.stock--;

        }


        // SIMPAN STOK

        saveStock();


        // TANDAI PROMO SUDAH DIPAKAI

        if (order.promo) {

            const usedPromos = getUsedPromos();

            if (!usedPromos.includes(order.promo)) {

                usedPromos.push(order.promo);

            }

            localStorage.setItem(

                "lixeraUsedPromos",

                JSON.stringify(usedPromos)

            );

        }


        // UBAH STATUS PESANAN

        order.status = "LUNAS";

        order.paidAt = new Date().toISOString();

        saveOrders(orders);


        // REFRESH DASHBOARD

        renderAdminOrders();

        renderProducts();

        fillProductSelect();


        alert(

            "PEMBAYARAN BERHASIL DIKONFIRMASI!\n\n" +

            "Stok produk sudah diperbarui."

        );

    });


// ==========================================
// INISIALISASI WEBSITE
// ==========================================

loadStock();

renderProducts();

fillProductSelect();

updatePrice();

showPage("home");


// ==========================================
// SELESAI - LIXERA STORE
// ==========================================
