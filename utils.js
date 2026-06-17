// utils.js

// 1. formatPrice: Converts a number to Turkish currency format (e.g., 1250 -> 1.250,00 TL)
const formatPrice = (price) => {
    const formatted = new Intl.NumberFormat('tr-TR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(price);

    return `${formatted} TL`;
};

// 2. slugify: Converts text to a URL-friendly format (e.g., Kırmızı Ayakkabı -> kirmizi-ayakkabi)
const slugify = (text) => {
    const trMap = {
        'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u',
        'Ç': 'c', 'Ğ': 'g', 'İ': 'i', 'Ö': 'o', 'Ş': 's', 'Ü': 'u'
    };

    return text
        .replace(/[çğışöüÇĞİÖŞÜ]/g, match => trMap[match]) // 1. Replace Turkish characters
        .toLowerCase() // 2. Convert to lowercase
        .trim() // 3. Trim whitespace from both ends
        .replace(/[\s\W-]+/g, '-') // 4. Replace spaces and special chars with hyphens
        .replace(/^-+|-+$/g, ''); // 5. Remove leading/trailing hyphens
};

// 3. truncateText: Shortens long text and appends "..." if it exceeds max length
const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
        return text;
    }
    return text.slice(0, maxLength) + '...';
};

// 4. isValidEmail: Validates an email format using a Regular Expression
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// 5. calculateDiscountRate: Calculates the discount percentage between old and new prices
const calculateDiscountRate = (oldPrice, newPrice) => {
    if (oldPrice <= 0 || newPrice >= oldPrice) return 0; // Edge case handling
    const rate = ((oldPrice - newPrice) / oldPrice) * 100;
    return Math.round(rate); // Rounds to the nearest whole number
};


// ==========================================
// TEST SCENARIOS (Verification Outputs)
// ==========================================

console.log("--- 1. Format Price ---");
console.log(formatPrice(1250)); // Expected: 1.250,00 TL

console.log("\n--- 2. Slugify ---");
console.log(slugify("Kırmızı Spor Ayakkabı!")); // Expected: kirmizi-spor-ayakkabi

console.log("\n--- 3. Truncate Text ---");
console.log(truncateText("This is a very long product description that needs to be truncated.", 20)); // Expected: This is a very long...
console.log(truncateText("Short text", 20)); // Expected: Short text

console.log("\n--- 4. Valid Email ---");
console.log(isValidEmail("test@example.com")); // Expected: true
console.log(isValidEmail("invalid-email.com")); // Expected: false

console.log("\n--- 5. Calculate Discount ---");
console.log(`Discount Rate: %${calculateDiscountRate(1000, 800)}`); // Expected: %20