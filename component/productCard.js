// 1. Component Fonksiyonu (Props alır, HTML döndürür)
const ProductCard = (props) => {
    // Props ayrıştırma (Destructuring)
    const { imageUrl, name, price, discountedPrice, inStock } = props;

    // CONDITIONAL RENDERING 1: Fiyat Durumu
    // Eğer indirimli fiyat varsa üstü çizili eski fiyatı ve yenisini göster, yoksa sadece normal fiyatı göster.
    let priceHtml = `<span class="regular-price">${price} TL</span>`;
    if (discountedPrice) {
        priceHtml = `
            <span class="old-price">${price} TL</span>
            <span class="discounted-price">${discountedPrice} TL</span>
        `;
    }

    // CONDITIONAL RENDERING 2: Stok Durumu ve Buton
    // Eğer stoktaysa yeşil yazı ve aktif buton, stokta yoksa kırmızı yazı ve inaktif (disabled) buton.
    const stockHtml = inStock 
        ? `<div class="stock-status in-stock">In Stock</div>` 
        : `<div class="stock-status out-of-stock">Out of Stock</div>`;

    const buttonHtml = inStock
        ? `<button class="add-to-cart-btn" onclick="alert('${name} added to cart!')">Add to Cart</button>`
        : `<button class="add-to-cart-btn" disabled>Out of Stock</button>`;

    // Sonucu HTML bloğu olarak döndür
    return `
        <div class="product-card">
            <img src="${imageUrl}" alt="${name}" class="product-image" />
            <h3 class="product-name">${name}</h3>
            <div class="price-container">
                ${priceHtml}
            </div>
            ${stockHtml}
            ${buttonHtml}
        </div>
    `;
};

// 2. Test Datası (Farklı senaryoları görmek için 2 farklı ürün)
const mockProducts = [
    {
        imageUrl: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300",
        name: "Gaming Laptop",
        price: 35000,
        discountedPrice: 32000, // İndirimli
        inStock: true           // Stokta var
    },
    {
        imageUrl: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300",
        name: "Wireless Mouse",
        price: 850,
        discountedPrice: null,  // İndirim yok
        inStock: false          // Stokta yok
    }
];

// 3. Ekrana Çizdirme (Render)
const rootElement = document.getElementById("root");

// Dizideki her ürün için ProductCard fonksiyonunu çağırıp HTML'e ekliyoruz
rootElement.innerHTML = mockProducts.map(product => ProductCard(product)).join('');