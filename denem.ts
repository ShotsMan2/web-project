// 1. Ürün Tipini (Interface) Tanımlayalım
interface Product {
    id: number;
    name: string;
    price: number;
    inStock: boolean;
    category: string;
}

// 2. Test Datası (Mock Data)
const products: Product[] = [
    { id: 1, name: "Laptop", price: 25000, inStock: true, category: "Elektronik" },
    { id: 2, name: "Kahve Makinesi", price: 3500, inStock: false, category: "Mutfak" },
    { id: 3, name: "Kablosuz Fare", price: 450, inStock: true, category: "Elektronik" },
    { id: 4, name: "Çalışma Masası", price: 4200, inStock: true, category: "Mobilya" },
    { id: 5, name: "Mekanik Klavye", price: 1200, inStock: false, category: "Elektronik" },
    { id: 6, name: "Ofis Sandalyesi", price: 2100, inStock: true, category: "Mobilya" }
];

// 3. İstenen Fonksiyonlar

// A) Fiyata göre sırala (Artan Sıralama)
function sortByPrice(productList: Product[]): Product[] {
    // Orijinal diziyi değiştirmemek (mutate etmemek) için spread operator [...] ile kopyalıyoruz
    return [...productList].sort((a, b) => a.price - b.price);
}

// B) Stokta olanları filtrele
function filterInStock(productList: Product[]): Product[] {
    return productList.filter(product => product.inStock === true);
}

// C) Kategoriye göre grupla (Reduce kullanımı)
function groupByCategory(productList: Product[]): Record<string, Product[]> {
    return productList.reduce((acc, product) => {
        // Eğer bu kategori objede (acc) henüz yoksa, boş bir dizi oluştur
        if (!acc[product.category]) {
            acc[product.category] = [];
        }
        // Ürünü ilgili kategorinin dizisine ekle
        acc[product.category].push(product);
        return acc;
    }, {} as Record<string, Product[]>);
}

// D) En pahalı ve en ucuz ürünü bul
function findMinMaxPrice(productList: Product[]) {
    if (productList.length === 0) return null;

    // Fiyata göre sıralayıp ilk ve son elemanı da alabiliriz, 
    // ancak reduce kullanmak performansı artırır (diziyi sadece bir kez döneriz).
    return productList.reduce(
        (acc, product) => {
            return {
                cheapest: product.price < acc.cheapest.price ? product : acc.cheapest,
                mostExpensive: product.price > acc.mostExpensive.price ? product : acc.mostExpensive
            };
        },
        { cheapest: productList[0], mostExpensive: productList[0] }
    );
}

// 4. Konsol Çıktıları (Çalışan ekran çıktısı gösterme kuralı için)
console.log("--- Fiyata Göre Sıralı ---");
console.log(sortByPrice(products));

console.log("\n--- Sadece Stokta Olanlar ---");
console.log(filterInStock(products));

console.log("\n--- Kategoriye Göre Gruplanmış ---");
console.log(groupByCategory(products));

console.log("\n--- En Ucuz ve En Pahalı Ürün ---");
console.log(findMinMaxPrice(products));