// 1. MOCK DATA
const products = [
    { id: 1, name: "Gaming Laptop", price: 35000, category: "Electronics", inStock: true },
    { id: 2, name: "Wireless Mouse", price: 850, category: "Accessories", inStock: false },
    { id: 3, name: "Mechanical Keyboard", price: 2100, category: "Accessories", inStock: true },
    { id: 4, name: "Office Chair", price: 4500, category: "Furniture", inStock: true },
    { id: 5, name: "4K Monitor", price: 8900, category: "Electronics", inStock: true },
    { id: 6, name: "USB-C Hub", price: 400, category: "Accessories", inStock: false }
];

// 2. STATE MANAGEMENT (Uygulamanın o anki durumu)
const state = {
    searchQuery: "",
    category: "all",
    sortBy: "default",
    inStockOnly: false
};

// 3. HTML ELEMENTLERİNİ SEÇME
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortFilter = document.getElementById("sortFilter");
const inStockFilter = document.getElementById("inStockFilter");
const productListContainer = document.getElementById("productList");

// 4. EVENT LISTENERS (Kullanıcı etkileşimlerini dinleme)
searchInput.addEventListener("input", (e) => {
    state.searchQuery = e.target.value.toLowerCase();
    render(); // State değişti, ekranı güncelle!
});

categoryFilter.addEventListener("change", (e) => {
    state.category = e.target.value;
    render();
});

sortFilter.addEventListener("change", (e) => {
    state.sortBy = e.target.value;
    render();
});

inStockFilter.addEventListener("change", (e) => {
    state.inStockOnly = e.target.checked;
    render();
});

// 5. PRODUCT CARD COMPONENT (Tek bir ürün kartının HTML'ini üretir)
const createProductCard = (product) => {
    const stockStatusText = product.inStock ? "In Stock" : "Out of Stock";
    const buttonClass = product.inStock ? "btn btn-add" : "btn btn-disabled";
    const buttonDisabledAttr = product.inStock ? "" : "disabled";

    return `
        <div class="product-card">
            <div class="product-category">${product.category}</div>
            <h3 class="product-name">${product.name}</h3>
            <div class="price">${product.price} TL</div>
            <p style="font-size:0.8rem; margin-bottom:10px; color:${product.inStock ? '#27ae60' : '#e74c3c'}">${stockStatusText}</p>
            <button class="${buttonClass}" ${buttonDisabledAttr}>
                ${product.inStock ? 'Add to Cart' : 'Unavailable'}
            </button>
        </div>
    `;
};

// 6. RENDER FONKSİYONU (Filtreleme, Sıralama ve Ekrana Çizme Mantığı)
const render = () => {
    // A) Veriyi Filtrele
    let filteredProducts = products.filter(product => {
        // Arama filtresi
        const matchesSearch = product.name.toLowerCase().includes(state.searchQuery);
        // Kategori filtresi
        const matchesCategory = state.category === "all" || product.category === state.category;
        // Stok filtresi
        const matchesStock = state.inStockOnly ? product.inStock === true : true;

        return matchesSearch && matchesCategory && matchesStock;
    });

    // B) Veriyi Sırala
    if (state.sortBy === "price-asc") {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (state.sortBy === "price-desc") {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    // C) Ekrana Çizdirme (UI / UX Kararları)

    // EMPTY STATE: Eğer filtreden geçen ürün kalmadıysa "Boş Sonuç Ekranı" göster
    if (filteredProducts.length === 0) {
        productListContainer.innerHTML = `
            <div class="empty-state">
                <h2>No products found!</h2>
                <p>Try adjusting your filters or search query.</p>
            </div>
        `;
        return; // Fonksiyondan çık
    }

    // Ürünleri HTML'e çevir ve ekrana bas
    const productsHTML = filteredProducts.map(createProductCard).join('');
    productListContainer.innerHTML = productsHTML;
};

// Sayfa yüklendiğinde ilk çizimi yap (Uygulamayı başlat)
render();