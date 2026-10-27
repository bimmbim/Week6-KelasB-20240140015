const API_URL = "https://dummyjson.com/products";

const statusEl = document.getElementById("status");
const gridEl = document.getElementById("productGrid");
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const chipsEl = document.getElementById("categoryChips");
const countEl = document.getElementById("resultCount");

let allProducts = [];

let activeCategory = "";

function formatPrice(usd) {
  return `$${usd.toFixed(2)}`;
}

function showStatus(message, isError) {
  statusEl.textContent = message;
  statusEl.classList.toggle("error", isError);
  statusEl.style.display = "block";
}

function hideStatus() {
  statusEl.style.display = "none";
}

function showSkeleton() {
  gridEl.innerHTML = "";

  for (let i = 0; i < 8; i++) {
    const card = document.createElement("div");
    card.className = "card skeleton";

    const thumb = document.createElement("div");
    thumb.className = "thumb-wrap";

    const body = document.createElement("div");
    body.className = "body";

    const line1 = document.createElement("div");
    line1.className = "line";
    const line2 = document.createElement("div");
    line2.className = "line short";

    body.append(line1, line2);
    card.append(thumb, body);
    gridEl.appendChild(card);
  }
}

function createCard(product) {
  const card = document.createElement("div");
  card.className = "card";

  const thumbWrap = document.createElement("div");
  thumbWrap.className = "thumb-wrap";

  const img = document.createElement("img");
  img.src = product.thumbnail;
  img.alt = product.title;
  img.loading = "lazy";
  thumbWrap.appendChild(img);

  const discount = Math.round(product.discountPercentage);
  if (discount > 0) {
    const badge = document.createElement("span");
    badge.className = "discount-badge";
    badge.textContent = `-${discount}%`;
    thumbWrap.appendChild(badge);
  }

  const body = document.createElement("div");
  body.className = "body";

  const category = document.createElement("div");
  category.className = "category";
  category.textContent = product.category.replace(/-/g, " ");

  const title = document.createElement("h3");
  title.textContent = product.title;

  const price = document.createElement("div");
  price.className = "price-tag";
  price.textContent = formatPrice(product.price);

  const meta = document.createElement("div");
  meta.className = "meta";
  const rating = document.createElement("span");
  rating.textContent = `★ ${product.rating.toFixed(1)}`;
  const stock = document.createElement("span");
  stock.textContent = `Stok: ${product.stock}`;
  meta.append(rating, stock);

  body.append(category, title, price, meta);
  card.append(thumbWrap, body);
  return card;
}

function renderProducts(products) {
  gridEl.innerHTML = "";
  countEl.textContent = `Menampilkan ${products.length} dari ${allProducts.length} produk`;

  if (products.length === 0) {
    showStatus(
      "Produk tidak ditemukan. Coba kata kunci atau kategori lain.",
      false,
    );
    return;
  }

  hideStatus();

  const fragment = document.createDocumentFragment();
  products.forEach((product) => fragment.appendChild(createCard(product)));
  gridEl.appendChild(fragment);
}

function createChip(label, value) {
  const chip = document.createElement("button");
  chip.type = "button";
  chip.className = "chip";
  chip.textContent = label;
  chip.dataset.category = value;

  if (value === activeCategory) {
    chip.classList.add("active");
  }

  chip.addEventListener("click", () => {
    activeCategory = value;
    document.querySelectorAll(".chip").forEach((el) => {
      el.classList.toggle("active", el.dataset.category === value);
    });
    applyFilters();
  });

  return chip;
}

function renderCategories(products) {
  const categories = [...new Set(products.map((p) => p.category))].sort();

  chipsEl.innerHTML = "";
  chipsEl.appendChild(createChip("Semua", ""));
  categories.forEach((cat) => {
    chipsEl.appendChild(createChip(cat.replace(/-/g, " "), cat));
  });
}

function applyFilters() {
  if (allProducts.length === 0) return;

  const keyword = searchInput.value.trim().toLowerCase();

  const filtered = allProducts.filter((product) => {
    const matchKeyword =
      product.title.toLowerCase().includes(keyword) ||
      product.category.toLowerCase().includes(keyword);
    const matchCategory = activeCategory
      ? product.category === activeCategory
      : true;
    return matchKeyword && matchCategory;
  });

  renderProducts(filtered);
}

async function fetchProducts() {
  try {
    showStatus("Memuat produk...", false);
    showSkeleton();
    countEl.textContent = "";

    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Request gagal dengan status ${response.status}`);
    }

    const data = await response.json();
    allProducts = data.products;

    renderCategories(allProducts);
    renderProducts(allProducts);
  } catch (error) {
    gridEl.innerHTML = "";
    countEl.textContent = "";
    showStatus(`Gagal memuat data: ${error.message}`, true);
    console.error("Fetch error:", error);
  }
}

searchInput.addEventListener("input", applyFilters);
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  applyFilters();
});

document.addEventListener("DOMContentLoaded", fetchProducts);
