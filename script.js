document.addEventListener('DOMContentLoaded', function() {
    // Прелоадер
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });

    // Плавная прокрутка для якорей
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Обработка кнопок
    const buyButtons = document.querySelectorAll('#buyButton, .ticket-button');
    
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Здесь можно добавить модальное окно или перенаправление
            alert('Вы будете перенаправлены на страницу покупки билетов');
            // window.location.href = 'https://tickets.example.com';
        });
    });

    // Анимация при скролле
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.info-card, .ticket-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Инициализация анимаций
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Запустить при загрузке
});
// Обработка страницы покупки
if (window.location.pathname.includes('tickets.html')) {
    // Получаем тип билета из URL
    const urlParams = new URLSearchParams(window.location.search);
    const ticketType = urlParams.get('type');
    
    if (ticketType) {
        const typeElement = document.getElementById('ticketType');
        const priceElement = document.getElementById('ticketPrice');
        const totalElement = document.getElementById('totalAmount');
        
        if (ticketType === 'vip') {
            typeElement.textContent = 'VIP билет';
            priceElement.textContent = '8 900 ₽';
            totalElement.textContent = '8 900 ₽';
        } else {
            typeElement.textContent = 'Стандарт билет';
            priceElement.textContent = '3 500 ₽';
            totalElement.textContent = '3 500 ₽';
        }
    }
    
    // Обработка формы
    document.querySelector('.ticket-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Билет успешно оформлен! На вашу почту отправлено подтверждение.');
        // Здесь можно добавить отправку данных на сервер
    });
}
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('payment-form');
    const successMessage = document.getElementById('success-message');
    const ticketCodeElement = document.getElementById('ticket-code');
    const userEmailElement = document.getElementById('user-email');
    const qrCodeElement = document.getElementById('qr-code');

    // Генерация случайного кода билета
    function generateTicketCode() {
        const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
        const numbers = '0123456789';
        let code = 'GD-';
        
        for (let i = 0; i < 3; i++) {
            code += letters.charAt(Math.floor(Math.random() * letters.length));
        }
        
        for (let i = 0; i < 3; i++) {
            code += numbers.charAt(Math.floor(Math.random() * numbers.length));
        }
        
        return code;
    }

    // Валидация данных карты
    function validateCard() {
        // Простая валидация - проверяем, что все поля заполнены
        const inputs = document.querySelectorAll('.card-simulation input');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value) {
                input.style.border = '1px solid red';
                isValid = false;
            } else {
                input.style.border = 'none';
            }
        });
        
        return isValid;
    }

    // Обработка формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateCard()) {
            alert('Пожалуйста, заполните все данные карты правильно');
            return;
        }
        
        // Показываем "загрузку"
        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="spinner"></span> Обработка...';
        
        // Симуляция обработки платежа (3 секунды)
        setTimeout(() => {
            // Генерируем билет
            const ticketCode = generateTicketCode();
            const email = document.getElementById('email').value;
            
            // Показываем успешное сообщение
            form.classList.add('hidden');
            successMessage.classList.remove('hidden');
            ticketCodeElement.textContent = ticketCode;
            userEmailElement.textContent = email;
            
            // Генерируем QR-код
            new QRCode(qrCodeElement, {
                text: ticketCode,
                width: 150,
                height: 150,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });
            
            // "Отправляем" письмо (в консоль)
            console.log(`Отправка билета на ${email}`);
            console.log(`Текст письма:
Уважаемый(ая) ${document.getElementById('name').value},

Ваш билет на концерт GrobwskiDimka успешно оформлен!

Номер вашего билета: ${ticketCode}
QR-код для входа прикреплен к письму.

Пожалуйста, покажите этот QR-код на входе.

Дата: 15 декабря 2024
Место: Москва, Крокус Сити Холл
Время: 19:00

Спасибо за покупку!
            `);
        }, 3000);
    });
    
    // Автозаполнение даты карты
    const expiryInput = document.querySelector('.expiry-cvv input');
    expiryInput.addEventListener('input', function(e) {
        if (this.value.length === 2 && !this.value.includes('/')) {
            this.value += '/';
        }
    });
    
    // Получаем тип билета из URL
    const urlParams = new URLSearchParams(window.location.search);
    const ticketType = urlParams.get('type');
    
    if (ticketType) {
        const typeElement = document.getElementById('ticketType');
        const priceElement = document.getElementById('ticketPrice');
        
        if (ticketType === 'vip') {
            typeElement.textContent = 'VIP билет';
            priceElement.textContent = '8 900 ₽';
        } else {
            typeElement.textContent = 'Стандарт билет';
            priceElement.textContent = '3 500 ₽';
        }
    }
});
