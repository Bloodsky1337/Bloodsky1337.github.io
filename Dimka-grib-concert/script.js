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