const express = require('express');
const app = express();
const PORT = 3000;

// Middleware: Gelen isteklerdeki JSON verilerini okuyabilmek için çok kritiktir
app.use(express.json());

// IN-MEMORY DATABASE (Geçici Veri Seti)
let products = [
    { id: 1, name: "Laptop", price: 25000, category: "Electronics", inStock: true },
    { id: 2, name: "Wireless Mouse", price: 450, category: "Electronics", inStock: true }
];

// ==========================================
// REST API ENDPOINTS
// ==========================================

// 1. GET /products (Tüm ürünleri listele)
app.get('/products', (req, res) => {
    res.status(200).json(products);
});

// 2. GET /products/:id (Belirli bir ürünü getir)
app.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
});

// 3. POST /products (Yeni ürün ekle)
app.post('/products', (req, res) => {
    const newProduct = req.body; // Kullanıcının gönderdiği JSON verisi

    // Basit bir ID oluşturma mantığı (Mevcut en büyük ID'yi bul ve 1 ekle)
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    newProduct.id = newId;

    products.push(newProduct);
    res.status(201).json({ message: "Product created successfully", product: newProduct });
});

// 4. PUT /products/:id (Mevcut bir ürünü güncelle)
app.put('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === productId);

    if (index === -1) {
        return res.status(404).json({ message: "Product not found" });
    }

    // Ürünün mevcut id'sini koruyarak diğer alanları güncelle
    products[index] = { ...products[index], ...req.body, id: productId };
    res.status(200).json({ message: "Product updated successfully", product: products[index] });
});

// 5. DELETE /products/:id (Bir ürünü sil)
app.delete('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === productId);

    if (index === -1) {
        return res.status(404).json({ message: "Product not found" });
    }

    products.splice(index, 1); // Ürünü diziden çıkar
    res.status(200).json({ message: `Product with ID ${productId} deleted successfully` });
});

// ==========================================
// SUNUCUYU BAŞLAT
// ==========================================
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log("Test endpoints using Thunder Client or Postman.");
});