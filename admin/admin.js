const API_URL = 'http://localhost:3000/products';

// Elementleri Seçme
const productForm = document.getElementById('productForm');
const tableBody = document.getElementById('tableBody');
const notification = document.getElementById('notification');
const formTitle = document.getElementById('formTitle');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');

let editingProductId = null;

// Bildirim (Toast) Fonksiyonu
const showNotification = (message, isSuccess = true) => {
    notification.textContent = message;
    notification.className = isSuccess ? 'notify-success show-notify' : 'notify-error show-notify';
    setTimeout(() => { notification.classList.remove('show-notify'); }, 3000);
};

// Ürünleri Getirme (GET)
const fetchProducts = async () => {
    try {
        const response = await fetch(API_URL);
        const result = await response.json();
        if (result.success) renderTable(result.data);
    } catch (error) {
        showNotification("Failed to fetch products from server.", false);
    }
};

// Tabloyu Çizme
const renderTable = (products) => {
    tableBody.innerHTML = ''; 
    if (products.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center;">No products available.</td></tr>`;
        return;
    }
    products.forEach(product => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>#${product.id}</td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${product.price} TL</td>
            <td>${product.stock}</td>
            <td>
                <button class="action-btn btn-edit" onclick="editProduct(${product.id})">Edit</button>
                <button class="action-btn btn-delete" onclick="deleteProduct(${product.id})">Delete</button>
            </td>
        `;
        tableBody.appendChild(tr);
    });
};

// Ürün Ekleme / Güncelleme (POST/PUT)
productForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const productData = {
        name: document.getElementById('name').value,
        price: Number(document.getElementById('price').value),
        stock: Number(document.getElementById('stock').value),
        category: document.getElementById('category').value
    };

    try {
        const method = editingProductId ? 'PUT' : 'POST';
        const url = editingProductId ? `${API_URL}/${editingProductId}` : API_URL;

        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData)
        });

        const result = await response.json();

        if (response.ok && result.success) {
            showNotification(result.message, true);
            resetForm();
            fetchProducts();
        } else {
            showNotification(result.message || "Operation failed", false);
        }
    } catch (error) {
        showNotification("Server error. Check connection.", false);
    }
});

// Düzenleme Moduna Geçiş
window.editProduct = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        const result = await response.json();

        if (result.success) {
            const product = result.data;
            document.getElementById('productId').value = product.id;
            document.getElementById('name').value = product.name;
            document.getElementById('price').value = product.price;
            document.getElementById('stock').value = product.stock;
            document.getElementById('category').value = product.category;

            editingProductId = product.id;
            formTitle.textContent = "Edit Product";
            submitBtn.textContent = "Update Product";
            cancelBtn.style.display = "block";
        }
    } catch (error) {
        showNotification("Failed to load product details.", false);
    }
};

// Formu Sıfırlama
window.resetForm = () => {
    productForm.reset();
    editingProductId = null;
    formTitle.textContent = "Add New Product";
    submitBtn.textContent = "Save Product";
    cancelBtn.style.display = "none";
};

// Ürün Silme (DELETE)
window.deleteProduct = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        const result = await response.json();
        if (response.ok && result.success) {
            showNotification(result.message, true);
            fetchProducts();
        } else {
            showNotification(result.message, false);
        }
    } catch (error) {
        showNotification("Failed to delete product.", false);
    }
};

// Başlangıç
fetchProducts();