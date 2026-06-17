// 1. STATE MANAGEMENT (Uygulamanın o anki durumu)
let products = []; // Başlangıçta boş dizi, veriler API'den gelecek

const state = {
    searchQuery: "",
    category: "all",
    sortBy: "default",
    inStockOnly: false,
    isLoading: true, // Başlangıçta yükleniyor modunda
    error: null      // Başlangıçta hata yok
};

// 2. HTML ELEMENTLERİNİ SEÇME
const productListContainer = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortFilter = document.getElementById("sortFilter");
const inStockFilter = document.getElementById("inStockFilter");

// 3. API'DEN VERİ ÇEKME FONKSİYONU (Fetch / Async İşlem)
const fetchProducts = async () => {
    state.isLoading = true;
    state.error = null;
    render(); // Ekranı "Loading" durumuna geçir

    try {
        // Backend API'ımıza GET isteği atıyoruz
        const response = await fetch('http://localhost:3000/products');
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        
        // Backend'den gelen veri modeli: { success: true, data: [...] }
        if (result.success) {
            products = result.data;
        } else {
            throw new Error(result.message || "Failed to fetch data");
        }

    } catch (error) {
        console.error("API Error:", error);
        state.error = "Could not connect to the server. Please check if the backend is running.";
    } finally {
        state.isLoading = false; // İşlem bitti (başarılı veya başarısız), yükleniyor simgesini kaldır
        render(); // Ekranı son duruma göre tekrar çiz
    }
};

// 4. EVENT LISTENERS
searchInput.addEventListener("input", (e) => { state.searchQuery = e.target.value.toLowerCase(); render(); });
categoryFilter.addEventListener("change", (e) => { state.category = e.target.value; render(); });
sortFilter.addEventListener("change", (e) => { state.sortBy = e.target.value; render(); });
inStockFilter.addEventListener("change", (e) => { state.inStockOnly = e.target.checked; render(); });

// Hata durumunda tekrar deneme butonu için global fonksiyon (HTML içinden çağrılacak)
window.retryFetch = () => {
    fetchProducts();
};

// 5. PRODUCT CARD OLUŞTURUCU
const createProductCard = (product) => {
    const isStockAvailable = product.stock > 0;
    const stockStatusText = isStockAvailable ? `In Stock (${product.stock})` : "Out of Stock";
    const buttonClass = isStockAvailable ? "btn btn-add" : "btn btn-disabled";
    
    return `
        <div class="product-card">
            <div class="product-category">${product.category}</div>
            <h3 class="product-name">${product.name}</h3>
            <div class="price">${product.price} TL</div>
            <p style="font-size:0.8rem; margin-bottom:10px; color:${isStockAvailable ? '#27ae60' : '#e74c3c'}">${stockStatusText}</p>
            <button class="${buttonClass}" ${!isStockAvailable ? 'disabled' : ''} onclick="alert('${product.name} added to cart!')">
                ${isStockAvailable ? 'Add to Cart' : 'Unavailable'}
            </button>
        </div>
    `;
};

// 6. RENDER FONKSİYONU (Ekrana Çizme Mantığı)
const render = () => {
    // STATE 1: LOADING (Yükleniyor Ekranı)
    if (state.isLoading) {
        productListContainer.innerHTML = `
            <div class="status-container">
                <h2 class="loading-text">Loading Products...</h2>
                <p>Fetching data from backend API</p>
            </div>`;
        return;
    }

    // STATE 2: ERROR (Hata Ekranı ve Retry Butonu)
    if (state.error) {
        productListContainer.innerHTML = `
            <div class="status-container">
                <h2 class="error-text">Oops! Something went wrong.</h2>
                <p>${state.error}</p>
                <button class="btn btn-retry" onclick="retryFetch()">Retry Connection</button>
            </div>`;
        return;
    }

    // Filtreleme işlemleri
    let filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(state.searchQuery);
        const matchesCategory = state.category === "all" || product.category === state.category;
        const matchesStock = state.inStockOnly ? product.stock > 0 : true;
        return matchesSearch && matchesCategory && matchesStock;
    });

    // Sıralama işlemleri
    if (state.sortBy === "price-asc") filteredProducts.sort((a, b) => a.price - b.price);
    if (state.sortBy === "price-desc") filteredProducts.sort((a, b) => b.price - a.price);

    // STATE 3: EMPTY (Boş Sonuç Ekranı)
    if (filteredProducts.length === 0) {
        productListContainer.innerHTML = `
            <div class="status-container">
                <h2>No products found!</h2>
                <p>There are no products matching your filters.</p>
            </div>`;
        return;
    }

    // STATE 4: SUCCESS (Ürünleri Ekrana Bas)
    productListContainer.innerHTML = filteredProducts.map(createProductCard).join('');
};

// 7. UYGULAMAYI BAŞLAT (Sayfa yüklenince API'ye istek at)
fetchProducts();