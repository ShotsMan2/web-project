const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// IN-MEMORY DATABASE
let products = [
    { id: 1, name: "Gaming Laptop", price: 35000, category: "Electronics", stock: 15 },
    { id: 2, name: "Wireless Mouse", price: 850, category: "Accessories", stock: 50 }
];

// ==========================================
// MIDDLEWARE: VALIDASYON KURALLARI
// ==========================================
const validateProduct = (req, res, next) => {
    const { name, price, stock, category } = req.body;

    // 1. Ürün adı boş olamaz
    if (!name || name.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Product name cannot be empty"
        });
    }

    // 2. Fiyat 0'dan büyük olmalı
    if (price === undefined || typeof price !== 'number' || price <= 0) {
        return res.status(400).json({
            success: false,
            message: "Product price must be greater than 0"
        });
    }

    // 3. Stok negatif olamaz
    if (stock === undefined || typeof stock !== 'number' || stock < 0) {
        return res.status(400).json({
            success: false,
            message: "Stock cannot be negative"
        });
    }

    // 4. Kategori zorunlu olmalı
    if (!category || category.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Category is mandatory"
        });
    }

    // Eğer hiçbir hata yoksa, isteği asıl endpoint'e (yönlendirmeye) aktar
    next();
};

// ==========================================
// REST API ENDPOINTS
// ==========================================

// GET /products
app.get('/products', (req, res) => {
    res.status(200).json({ success: true, data: products });
});

// GET /products/:id
app.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);

    if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: product });
});

// POST /products (VALIDASYON MIDDLEWARE EKLENDİ)
app.post('/products', validateProduct, (req, res) => {
    const newProduct = req.body;

    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    newProduct.id = newId;

    products.push(newProduct);
    res.status(201).json({ success: true, message: "Product created successfully", data: newProduct });
});

// PUT /products/:id (VALIDASYON MIDDLEWARE EKLENDİ)
app.put('/products/:id', validateProduct, (req, res) => {
    const productId = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === productId);

    if (index === -1) {
        return res.status(404).json({ success: false, message: "Product not found" });
    }

    products[index] = { ...products[index], ...req.body, id: productId };
    res.status(200).json({ success: true, message: "Product updated successfully", data: products[index] });
});

// DELETE /products/:id
app.delete('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === productId);

    if (index === -1) {
        return res.status(404).json({ success: false, message: "Product not found" });
    }

    products.splice(index, 1);
    res.status(200).json({ success: true, message: `Product with ID ${productId} deleted successfully` });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});