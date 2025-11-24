// Функция для загрузки HTML компонентов
function loadComponent(id, file) {
    fetch(file)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById(id).innerHTML = data;
            
            // После загрузки компонента, инициализируем необходимые скрипты
            if (file.includes('header')) {
                initializeHeader();
            }
            if (file.includes('footer')) {
                initializeFooter();
            }
        })
        .catch(error => {
            console.error('Error loading component:', error);
            document.getElementById(id).innerHTML = `<div class="error-message" style="padding: 20px; text-align: center; color: #e60a0f; border: 1px solid #ffcccc; border-radius: 8px; margin: 10px 0;">
                <strong>Ошибка загрузки компонента:</strong> ${error.message}<br>
                Попробуйте обновить страницу или свяжитесь с техподдержкой.
            </div>`;
        });
}

// Инициализация шапки
function initializeHeader() {
    // Мобильное меню
    const submenuItems = document.querySelectorAll('.has-submenu');
    submenuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const submenu = this.querySelector('.submenu');
                if (submenu) {
                    submenu.classList.toggle('active');
                    this.classList.toggle('active');
                }
            }
        });
    });
    
    // Закрытие меню при клике вне его
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            submenuItems.forEach(item => {
                if (!item.contains(e.target)) {
                    const submenu = item.querySelector('.submenu');
                    if (submenu) {
                        submenu.classList.remove('active');
                        item.classList.remove('active');
                    }
                }
            });
        }
    });
    
    // Смена цитат
    const businessQuotes = [
        "Ваш успех определяется вашей настойчивостью",
        "Лидерство — это не титул, это действие и пример",
        "Инвестируйте в знания — это приносит наибольшие дивиденды",
        "Успех — это движение от неудачи к неудаче без потери энтузиазма",
        "Единственный способ сделать великую работу — любить то, что вы делаете",
        "Не ждите подходящего момента — создавайте его",
        "Ваше время ограничено, не тратьте его, живя чужой жизнью",
        "Инновации отличают лидера от догоняющего",
        "Самый большой риск — не рисковать вообще",
        "Мечты не работают, пока не работаешь ты",
        "Успех — это 10% вдохновения и 90% пота",
        "Каждая сложная ситуация содержит в себе возможности",
        "Ваша сеть контактов — это ваш чистый капитал",
        "Лучшее время посадить дерево было 20 лет назад. Следующий лучший момент — сейчас",
        "Качество — это не случайность, это результат умственных усилий"
    ];

    function rotateQuotes() {
        const quoteElement = document.querySelector('.quote-text');
        if (!quoteElement) return;
        
        let currentIndex = 0;
        quoteElement.textContent = businessQuotes[currentIndex];
        quoteElement.style.opacity = '1';
        
        setInterval(() => {
            currentIndex = (currentIndex + 1) % businessQuotes.length;
            
            // Анимация смены
            quoteElement.style.opacity = '0';
            quoteElement.style.transform = 'translateY(-10px)';
            
            setTimeout(() => {
                quoteElement.textContent = businessQuotes[currentIndex];
                quoteElement.style.opacity = '1';
                quoteElement.style.transform = 'translateY(0)';
            }, 300);
        }, 5000);
    }
    
    rotateQuotes();
}

// Инициализация подвала
function initializeFooter() {
    // Здесь можно добавить скрипты для футера при необходимости
}

// Стандартные страницы и их стили
const PAGE_STYLES = {
    'business-system.html': `
        .main-content {
            padding: 40px 0;
        }
        header.page-header {
            background-color: var(--primary-color);
            color: white;
            padding: 15px;
            text-align: center;
            border-radius: 10px;
            margin: 0;
        }
        main {
            max-width: 100%;
            margin: 10px auto;
            padding: 15px;
            background-color: white;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
        }
        .section {
            margin-bottom: 20px;
            padding: 15px;
            background-color: #eef7ff;
            border: 1px solid #d3eafb;
            border-radius: 8px;
            transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        }
        .section:hover {
            transform: scale(1.02);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        }
    `,
    'business-processes.html': `
        .business-processes {
            font-family: 'Open Sans', sans-serif;
            line-height: 1.6;
            background: linear-gradient(135deg, #e8f5ff 0%, #ffffff 100%);
            margin: 0;
            padding: 20px 0;
            min-height: 100vh;
        }
        .business-processes .page-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            box-sizing: border-box;
        }
        .business-processes header {
            background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-color) 100%);
            color: white;
            border-radius: 15px;
            padding: 30px;
            text-align: center;
            box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
            margin-bottom: 30px;
        }
        .business-processes h1 {
            font-size: 2.5em;
            margin: 0;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
    `,
    'training.html': `
        .main-content {
            padding: 40px 0;
        }
        .videos-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 25px;
            margin-top: 20px;
        }
        .video-card {
            background: white;
            border-radius: var(--border-radius);
            overflow: hidden;
            box-shadow: var(--shadow);
            border: 1px solid var(--gray-40);
            transition: transform 0.3s ease;
        }
        .video-card:hover {
            transform: translateY(-5px);
        }
    `,
    'services.html': `
        .calculator-container {
            background: var(--gray-20);
            padding: 25px;
            border-radius: var(--border-radius);
            margin-top: 20px;
        }
        .input-group {
            margin-bottom: 20px;
        }
        .buttons-group {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 10px;
        }
        .btn-small {
            padding: 8px 15px;
            font-size: 13px;
            border-radius: 20px;
        }
    `,
    'instructions.html': `
        .instructions-container {
            display: flex;
            flex-direction: column;
            gap: 25px;
        }
        .rules-card,
        .links-card,
        .payments-card {
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            border: 1px solid var(--gray-40);
            overflow: hidden;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .rules-card:hover,
        .links-card:hover,
        .payments-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }
    `,
    'office-organization.html': `
        .business-processes .section {
            background: white;
            border-radius: 12px;
            padding: 25px;
            margin-bottom: 25px;
            box-shadow: 0 2px 10px rgba(0, 123, 255, 0.15);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .business-processes .section:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 20px rgba(0, 123, 255, 0.25);
        }
    `,
    'agents.html': `
        .business-processes {
            font-family: 'Open Sans', sans-serif;
            line-height: 1.6;
            background: linear-gradient(135deg, #e8f5ff 0%, #ffffff 100%);
            margin: 0;
            padding: 20px 0;
            min-height: 100vh;
        }
    `
};

// Применение стилей для конкретной страницы
function applyPageStyles() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    if (PAGE_STYLES[currentPage]) {
        const style = document.createElement('style');
        style.innerHTML = PAGE_STYLES[currentPage];
        document.head.appendChild(style);
    }
    
    // Динамическое обновление активного пункта меню
    updateActiveNavigation(currentPage);
}

// Обновление активного пункта меню
function updateActiveNavigation(currentPage) {
    const navItems = document.querySelectorAll('.nav-item');
    
    // Удаляем класс active у всех пунктов
    navItems.forEach(item => {
        item.classList.remove('active');
        
        // Проверяем, является ли этот пункт текущей страницей
        const href = item.getAttribute('href');
        if ((currentPage === 'index.html' && href === 'index.html') || 
            (href && href === currentPage)) {
            item.classList.add('active');
        }
        
        // Проверяем, относится ли страница к франшизной папке
        if (['business-system.html', 'business-processes.html', 'office-organization.html', 'agents.html'].includes(currentPage)) {
            const franchiseMenu = document.querySelector('.nav-item.has-submenu');
            if (franchiseMenu) {
                franchiseMenu.classList.add('active');
            }
        }
    });
}

// Загрузка всех компонентов при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Загрузка компонентов
    if (document.getElementById('header-container')) {
        loadComponent('header-container', 'header.html');
    }
    
    if (document.getElementById('footer-container')) {
        loadComponent('footer-container', 'footer.html');
    }
    
    // Инициализация специфичных скриптов для страниц
    initializePageSpecificFeatures();
    
    // Применение стилей для текущей страницы
    applyPageStyles();
    
    // Инициализация поиска для офисов
    initOfficesSearch();
});

// Инициализация поиска для офисов
function initOfficesSearch() {
    const searchInput = document.getElementById('search');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        const tables = ['active-table', 'orlov-table'];
        
        tables.forEach(tableId => {
            const table = document.getElementById(tableId);
            if (!table) return;
            
            const rows = table.querySelectorAll('tbody tr');
            let visibleCount = 0;
            
            rows.forEach(row => {
                const text = row.dataset.search;
                if (text.includes(query)) {
                    row.style.display = '';
                    visibleCount++;
                } else {
                    row.style.display = 'none';
                }
            });
            
            // Обновление счетчика
            const filterCountEl = document.getElementById(`${tableId.split('-')[0]}-filter-count`);
            if (filterCountEl) {
                filterCountEl.textContent = visibleCount;
            }
        });
    });
}

// Стандартные данные офисов
const OFFICES_DATA = {
    active: [
        { id: 1, name: "Квартал", address: "г. Аксай, ул. Толпинского 130, офис 4", phone: "+7-953-609-11-22", owner: "Алиева Зухра" },
        { id: 2, name: "Домиан Добровольского", address: "г. Ростов-на-Дону, ул. Добровольского 13", phone: "+7-909-410-10-40", owner: "Баев Денис" },
        // ... остальные офисы
    ],
    orlov: [
        { id: 70, name: "Красный Верес", address: "г. Ростов-на-Дону, ул. Вересаева 101/3, стр. 2", phone: "8 (863) 300-00-06", owner: "ИП Орлов Павел Викторович" },
        { id: 71, name: "Центр 1", address: "г. Ростов-на-Дону, ул. Красноармейская 121, 2 этаж", phone: "8 (863) 300-00-06", owner: "ИП Орлов Павел Викторович" },
        // ... остальные офисы
    ]
};

// Функция для отрисовки таблиц с офисами
function renderOfficesTables() {
    if (!document.getElementById('active-table') || !document.getElementById('orlov-table')) return;
    
    const renderTable = (data, tableBodyId) => {
        const tbody = document.querySelector(`#${tableBodyId} tbody`);
        if (!tbody) return;
        
        tbody.innerHTML = '';
        
        data.forEach(item => {
            const row = tbody.insertRow();
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.name || '—'}</td>
                <td>${item.owner || '—'}</td>
                <td>${item.phone || '—'}</td>
                <td>${item.address || '—'}</td>
            `;
            row.dataset.search = `${item.id} ${item.name} ${item.owner} ${item.phone} ${item.address}`.toLowerCase();
        });
        
        // Возвращаем количество строк
        return data.length;
    };
    
    // Рендерим таблицы
    const activeCount = renderTable(OFFICES_DATA.active, 'active-table');
    const orlovCount = renderTable(OFFICES_DATA.orlov, 'orlov-table');
    
    // Обновляем счетчики
    document.getElementById('active-count')?.textContent = activeCount;
    document.getElementById('orlov-count')?.textContent = orlovCount;
    document.getElementById('active-filter-count')?.textContent = activeCount;
    document.getElementById('orlov-filter-count')?.textContent = orlovCount;
}

// Инициализация скриптов для конкретных страниц
function initializePageSpecificFeatures() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Инициализация для главной страницы
    if (currentPage === 'index.html' || currentPage === '') {
        // Инициализация таблиц с офисами
        renderOfficesTables();
        
        // Закрытие меню при клике вне его
        document.addEventListener('click', function(e) {
            const submenuItems = document.querySelectorAll('.has-submenu');
            if (window.innerWidth <= 768) {
                submenuItems.forEach(item => {
                    if (!item.contains(e.target)) {
                        const submenu = item.querySelector('.submenu');
                        if (submenu) {
                            submenu.classList.remove('active');
                            item.classList.remove('active');
                        }
                    }
                });
            }
        });
    }
    
    // Инициализация для калькулятора
    if (currentPage === 'services.html') {
        // Форматирование чисел
        const formatNumber = (input) => {
            let value = input.value.replace(/\D/g, '');
            input.value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
        };
        
        const formatPercent = (input) => {
            let value = input.value.replace(/[^0-9.]/g, '');
            if (value.includes('.')) {
                const parts = value.split('.');
                parts[1] = parts[1].slice(0, 2);
                value = parts.join('.');
            }
            input.value = value;
        };
        
        // Установка процента взноса
        window.setPercent = (percent) => {
            const cost = parseInt(document.getElementById('summa').value.replace(/\D/g, ''));
            document.getElementById('vznos').value = (cost * percent / 100).toLocaleString('ru-RU');
            calculate();
        };
        
        // Установка срока
        window.setTerm = (years) => {
            document.getElementById('term').value = years;
            calculate();
        };
        
        // Установка ставки
        window.setRate = (rate) => {
            document.getElementById('percent').value = rate;
            calculate();
        };
        
        // Основной расчёт
        window.calculate = () => {
            const cost = parseInt(document.getElementById('summa').value.replace(/\D/g, ''));
            const downPayment = parseInt(document.getElementById('vznos').value.replace(/\D/g, ''));
            const termYears = parseInt(document.getElementById('term').value);
            const rate = parseFloat(document.getElementById('percent').value);
            
            if (isNaN(cost) || isNaN(downPayment) || isNaN(termYears) || isNaN(rate)) return;
            
            const loanAmount = cost - downPayment;
            if (loanAmount <= 0) {
                alert("Первоначальный взнос не может быть больше стоимости недвижимости.");
                return;
            }
            
            const termMonths = termYears * 12;
            const monthlyRate = rate / 100 / 12;
            
            // Аннуитетная формула
            const monthlyPayment = loanAmount * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -termMonths)));
            const totalPayment = monthlyPayment * termMonths;
            const interestPayment = totalPayment - loanAmount;
            const requiredIncome = monthlyPayment * 1.6667;
            
            // Форматирование вывода
            document.getElementById('monthPay').textContent = formatCurrency(monthlyPayment);
            document.getElementById('creditSum').textContent = formatCurrency(loanAmount);
            document.getElementById('percentSum').textContent = formatCurrency(interestPayment);
            document.getElementById('totalSum').textContent = formatCurrency(totalPayment);
            document.getElementById('income').textContent = formatCurrency(requiredIncome);
        };
        
        // Форматирование валюты
        const formatCurrency = (value) => {
            return new Intl.NumberFormat('ru-RU').format(Math.round(value)) + ' ₽';
        };
        
        // Инициализация калькулятора
        document.addEventListener('DOMContentLoaded', function() {
            calculate();
        });
    }
    
    // Инициализация для видео
    if (currentPage === 'training.html') {
        // Открытие модального окна с видео
        window.openVideoModal = (videoData) => {
            const modal = document.getElementById('videoModal');
            const modalTitle = document.getElementById('modalTitle');
            const modalDescription = document.getElementById('modalDescription');
            const videoContainer = document.getElementById('videoContainer');
            const modalClose = document.getElementById('modalClose');
            
            modalTitle.textContent = videoData.title;
            modalDescription.textContent = videoData.fullDescription;
            videoContainer.innerHTML = videoData.vkEmbedCode;
            
            // Адаптируем iframe под размеры контейнера
            const iframe = videoContainer.querySelector('iframe');
            if (iframe) {
                iframe.style.width = '100%';
                iframe.style.height = '100%';
            }
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Закрытие по клику на кнопку
            modalClose.onclick = closeVideoModal;
            
            // Закрытие по клику вне модального окна
            modal.onclick = (e) => {
                if (e.target === modal) {
                    closeVideoModal();
                }
            };
            
            // Закрытие по нажатию ESC
            document.onkeydown = (e) => {
                if (e.key === 'Escape') closeVideoModal();
            };
        };
        
        // Закрытие модального окна
        window.closeVideoModal = () => {
            const modal = document.getElementById('videoModal');
            const videoContainer = document.getElementById('videoContainer');
            
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            // Очищаем iframe чтобы остановить видео
            setTimeout(() => {
                if (videoContainer) {
                    videoContainer.innerHTML = '';
                }
            }, 300);
        };
    }
}

// Функция для добавления обработчиков событий ко всем страницам
function addGlobalEventListeners() {
    // Закрытие всех выпадающих меню при клике вне их
    document.addEventListener('click', function(e) {
        const dropdowns = document.querySelectorAll('.submenu');
        dropdowns.forEach(dropdown => {
            const parent = dropdown.parentElement;
            if (parent && !parent.contains(e.target)) {
                dropdown.classList.remove('active');
                parent.classList.remove('active');
            }
        });
    });
    
    // Адаптивное меню для мобильных устройств
    window.addEventListener('resize', function() {
        const submenuItems = document.querySelectorAll('.has-submenu');
        submenuItems.forEach(item => {
            const submenu = item.querySelector('.submenu');
            if (submenu) {
                submenu.classList.remove('active');
                item.classList.remove('active');
            }
        });
    });
}

// Добавляем глобальные обработчики событий
document.addEventListener('DOMContentLoaded', addGlobalEventListeners);
