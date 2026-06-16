// 1. Mock Data (Sample Cart Items)
const products = [
    { productId: 1, price: 100, quantity: 2 },
    { productId: 2, price: 50, quantity: 1 }
];

// 2. Pure Functions for Business Logic

// A) Calculate Subtotal (Ara Toplam)
const calculateSubtotal = (items) => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
};

// B) Calculate Tax (KDV - default %20)
const calculateTax = (amount, taxRate = 0.20) => {
    return amount * taxRate;
};

// C) Calculate Discount (İndirim)
const calculateDiscount = (amount, discountRate) => {
    return amount * discountRate;
};

// D) Check Free Shipping Eligibility (Ücretsiz Kargo Sınırı Kontrolü)
const checkFreeShipping = (totalAmount, threshold) => {
    return totalAmount >= threshold;
};

// 3. Main Orchestration Function (Nihai Faturayı Hesaplayan Ana Fonksiyon)
const generateCartSummary = (items, discountRate = 0, shippingThreshold = 500) => {
    const subtotal = calculateSubtotal(items);
    const discount = calculateDiscount(subtotal, discountRate);
    const afterDiscount = subtotal - discount;
    const tax = calculateTax(afterDiscount, 0.20); // %20 KDV
    const grandTotal = afterDiscount + tax;
    const isFreeShipping = checkFreeShipping(grandTotal, shippingThreshold);

    // Handling decimal rounding edge cases (Küsürat yuvarlama kontrolü)
    return {
        subtotal: Number(subtotal.toFixed(2)),
        discount: Number(discount.toFixed(2)),
        tax: Number(tax.toFixed(2)),
        grandTotal: Number(grandTotal.toFixed(2)),
        isFreeShipping
    };
};

// 4. Test Scenarios (Verification Outputs)

console.log("=== SCENARIO 1: Standard Cart (No Discount, Shipping Charged) ===");
const cart1 = [
    { productId: 1, price: 100, quantity: 2 },
    { productId: 2, price: 50, quantity: 1 }
];
console.log(generateCartSummary(cart1, 0, 500));

console.log("\n=== SCENARIO 2: Large Cart (10% Discount, Free Shipping Eligible) ===");
const cart2 = [
    { productId: 1, price: 200, quantity: 3 },
    { productId: 3, price: 150, quantity: 2 }
];
console.log(generateCartSummary(cart2, 0.10, 500));
