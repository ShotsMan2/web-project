// 1. Elementleri Seçme
const form = document.getElementById('registrationForm');
const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');

// 2. Hata Gösterme (UX Feedback)
const showError = (input, message) => {
    const formGroup = input.parentElement;
    formGroup.className = 'form-group error';
    const small = formGroup.querySelector('small');
    small.innerText = message;
};

// 3. Başarı Gösterme (UX Feedback)
const showSuccess = (input) => {
    const formGroup = input.parentElement;
    formGroup.className = 'form-group success';
};

// 4. E-posta Format Kontrolü (Regex)
const isValidEmail = (emailStr) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(emailStr.toLowerCase());
};

// 5. Ana Validasyon Fonksiyonu
const validateForm = () => {
    let isFormValid = true;

    // Ad Soyad Kontrolü (Boş geçilemez)
    if (fullName.value.trim() === '') {
        showError(fullName, 'Full name is required');
        isFormValid = false;
    } else {
        showSuccess(fullName);
    }

    // E-posta Kontrolü (Boş geçilemez ve geçerli olmalı)
    if (email.value.trim() === '') {
        showError(email, 'Email is required');
        isFormValid = false;
    } else if (!isValidEmail(email.value.trim())) {
        showError(email, 'Email is not valid');
        isFormValid = false;
    } else {
        showSuccess(email);
    }

    // Telefon Kontrolü (Boş geçilemez)
    if (phone.value.trim() === '') {
        showError(phone, 'Phone number is required');
        isFormValid = false;
    } else {
        showSuccess(phone);
    }

    // Şifre Kontrolü (Min 6 karakter)
    if (password.value.trim() === '') {
        showError(password, 'Password is required');
        isFormValid = false;
    } else if (password.value.trim().length < 6) {
        showError(password, 'Password must be at least 6 characters');
        isFormValid = false;
    } else {
        showSuccess(password);
    }

    // Şifre Eşleşme Kontrolü
    if (confirmPassword.value.trim() === '') {
        showError(confirmPassword, 'Please confirm your password');
        isFormValid = false;
    } else if (password.value !== confirmPassword.value) {
        showError(confirmPassword, 'Passwords do not match');
        isFormValid = false;
    } else {
        showSuccess(confirmPassword);
    }

    return isFormValid;
};

// 6. Form Gönderim (Submit) Olayını Dinleme
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Sayfanın yenilenmesini durdur

    const isFormValid = validateForm();

    if (isFormValid) {
        alert('Registration successful! Form data is ready to be sent to the backend.');
        form.reset(); // Formu temizle

        // Success class'larını kaldır (görsel temizlik)
        document.querySelectorAll('.form-group').forEach(group => {
            group.className = 'form-group';
        });
    }
});