const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// IN-MEMORY DATABASE (inStock yerine stock geldi!)
let products = [
    { id: 1, name: "Gaming Laptop", price: 35000, category: "Electronics", stock: 15 },
    { id: 2, name: "Wireless Mouse", price: 850, category: "Accessories", stock: 50 }
];

// MIDDLEWARE: VALIDASYON
const validateProduct = (req, res, next) => {
    const { name, price, stock, category } = req.body;
    if (!name || name.trim() === "") return res.status(400).json({ success: false, message: "Product name cannot be empty" });
    if (price === undefined || typeof price !== 'number' || price <= 0) return res.status(400).json({ success: false, message: "Product price must be greater than 0" });
    if (stock === undefined || typeof stock !== 'number' || stock < 0) return res.status(400).json({ success: false, message: "Stock cannot be negative" });
    if (!category || category.trim() === "") return res.status(400).json({ success: false, message: "Category is mandatory" });
    next();
};

// GET /products
app.get('/products', (req, res) => {
    res.status(200).json({ success: true, data: products });
});

// GET /products/:id
app.get('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    res.status(200).json({ success: true, data: product });
});

// POST /products (Yeni ürün ekle)
app.post('/products', validateProduct, (req, res) => {
    const newProduct = req.body;
    newProduct.id = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    products.push(newProduct);
    res.status(201).json({ success: true, message: "Product created successfully", data: newProduct });
});

// PUT /products/:id (Ürün güncelle)
app.put('/products/:id', validateProduct, (req, res) => {
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ success: false, message: "Product not found" });
    products[index] = { ...products[index], ...req.body, id: parseInt(req.params.id) };
    res.status(200).json({ success: true, message: "Product updated successfully", data: products[index] });
});

// DELETE /products/:id (Ürün sil)
app.delete('/products/:id', (req, res) => {
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ success: false, message: "Product not found" });
    products.splice(index, 1);
    res.status(200).json({ success: true, message: `Product with ID ${req.params.id} deleted successfully` });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});