// Конструктор рациона для кота - Расширенная версия
// С экспортом, рекомендациями, историей, аналогами и чат-ботом

// ===== БАЗА ДАННЫХ ПРОДУКТОВ =====
const products = [
    // МЯСО И МЫШЕЧНЫЕ ОРГАНЫ (80%)
    { id: 1, name: 'Куриная грудка/бедро', emoji: '🐔', category: 'meat', minWeight: 30, protein: 23, price: 350, alternatives: [3, 4, 11] },
    { id: 2, name: 'Говяжье сердце', emoji: '❤️', category: 'meat', minWeight: 25, protein: 17, price: 450, alternatives: [11, 12, 13] },
    { id: 3, name: 'Индейка (филе)', emoji: '🦃', category: 'meat', minWeight: 30, protein: 21, price: 500, alternatives: [1, 4, 11] },
    { id: 4, name: 'Кролик (мясо)', emoji: '🐰', category: 'meat', minWeight: 25, protein: 20, price: 800, alternatives: [1, 3, 11] },
    { id: 11, name: 'Говядина (пашина/вырезка)', emoji: '🥩', category: 'meat', minWeight: 30, protein: 19, price: 600, alternatives: [1, 3, 4] },
    { id: 12, name: 'Куриные желудки', emoji: '🍗', category: 'meat', minWeight: 30, protein: 18, price: 250, alternatives: [2, 13] },
    { id: 13, name: 'Свиное сердце', emoji: '🧡', category: 'meat', minWeight: 25, protein: 16, price: 300, alternatives: [2, 12] },

    // МЯСОКОСТНЫЕ (10-20%)
    { id: 8, name: 'Куриные шейки', emoji: '🦴', category: 'bone', minWeight: 40, protein: 18, price: 150, alternatives: [14, 15, 16] },
    { id: 14, name: 'Куриные головы', emoji: '💀', category: 'bone', minWeight: 30, protein: 15, price: 120, alternatives: [8, 15] },
    { id: 15, name: 'Утиные шейки', emoji: '🦢', category: 'bone', minWeight: 40, protein: 17, price: 200, alternatives: [8, 14, 16] },
    { id: 16, name: 'Каркас перепела', emoji: '🐦', category: 'bone', minWeight: 35, protein: 19, price: 300, alternatives: [8, 15] },

    // СУБПРОДУКТЫ (10%)
    { id: 5, name: 'Куриная печень', emoji: '🍖', category: 'organ', minWeight: 20, protein: 19, price: 200, alternatives: [10, 17, 18] },
    { id: 10, name: 'Говяжья печень', emoji: '🫀', category: 'organ', minWeight: 20, protein: 20, price: 250, alternatives: [5, 17, 18] },
    { id: 17, name: 'Почки говяжьи', emoji: '💧', category: 'organ', minWeight: 20, protein: 16, price: 180, alternatives: [5, 10, 18] },
    { id: 18, name: 'Селезенка', emoji: '🩹', category: 'organ', minWeight: 15, protein: 17, price: 150, alternatives: [5, 10, 17] },

    // ДОБАВКИ И РЫБА
    { id: 9, name: 'Морская рыба', emoji: '🐟', category: 'fish', minWeight: 30, protein: 20, price: 400, alternatives: [19] },
    { id: 19, name: 'Сардины', emoji: '🥫', category: 'fish', minWeight: 20, protein: 18, price: 300, alternatives: [9] },
    { id: 7, name: 'Перепелиные яйца', emoji: '🥚', category: 'supplement', minWeight: 15, protein: 13, price: 10, alternatives: [] },
];

// ===== БАЗА БАДОВ =====
const supplements = [
    { id: 'taurine', name: 'Таурин', emoji: '🧪', description: 'Критически важен для сердца и зрения' },
    { id: 'omega3', name: 'Омега-3 (Лососевое масло)', emoji: '💧', description: 'Для шерсти и иммунитета' },
    { id: 'calcium', name: 'Кальций (Яичная скорлупа)', emoji: '🐚', description: 'Если в рационе мало костей' },
    { id: 'vitE', name: 'Витамин E', emoji: '💊', description: 'Антиоксидант' },
    { id: 'kelp', name: 'Ламинария (Йод)', emoji: '🌿', description: 'Для щитовидной железы' }
];

// ===== СОСТОЯНИЕ ПРИЛОЖЕНИЯ =====
let catWeight = 4.5;
let portionPercent = 0.05;
let healthCondition = 'healthy';
let currentWeek = 1;
let monthPlan = {
    1: { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [] },
    2: { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [] },
    3: { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [] },
    4: { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [] }
};
let chosenSupplements = [];
let history = [];

// ===== РЕКОМЕНДАЦИИ ПО ЗАБОЛЕВАНИЯМ =====
const healthRecommendations = {
    healthy: {
        title: 'Здоровый кот',
        recommendations: [
            'Суточная норма: 2-5% от веса кота (в среднем 5% для взрослых)',
            '🥩 80% - Мясо и мышечные органы (включая сердце, желудки)',
            '🦴 10% - Мясокостные составляющие (шейки, головы, только СЫРЫЕ)',
            '🫀 10% - Секретирующие органы (печень 5%, почки/селезенка 5%)',
            '🥚 Добавки: яйца 1-2 раза в неделю, омега-3',
            '🐟 Морская рыба: 1-2 раза в неделю (речную сырую НЕЛЬЗЯ)',
            '⚖️ Баланс: 80-10-10 - золотое правило BARF'
        ],
        warnings: [
            '⚠️ НИКОГДА не давайте вареные кости - они смертельно опасны!',
            '⚠️ Мясо должно быть сырым (заморозка 3+ дня убивает паразитов)'
        ]
    },
    urolithiasis: {
        title: 'Мочекаменная болезнь (МКБ)',
        recommendations: [
            '💧 Ключевой фактор: ВЛАЖНОСТЬ пищи (сырое мясо содержит 70% воды)',
            '🍖 Мясной рацион закисляет мочу - это ХОРОШО при МКБ',
            'Избегайте рыбы (высокое содержание фосфора и магния)',
            'Ограничьте субпродукты до 5%',
            'Предпочтительно: курица, индейка, кролик, говядина',
            'Обеспечьте постоянный доступ к свежей воде',
            'Суточная норма: 2-5% от веса'
        ],
        warnings: [
            '⚠️ Полностью исключите рыбу и морепродукты',
            '⚠️ Минимизируйте субпродукты',
            '⚠️ Влажность пищи критически важна',
            '⚠️ Обязательна консультация ветеринара'
        ]
    },
    kidney: {
        title: 'Хроническая почечная недостаточность (ХПН)',
        recommendations: [
            '🔬 ВАЖНО: Контролируйте ФОСФОР, а не белок!',
            '🥚 Яичная скорлупа как источник кальция (фосфор-биндер)',
            '💧 Максимальная гидратация - критически важна',
            'Избегайте субпродуктов (высокое содержание фосфора)',
            'Предпочтительно: куриная грудка, индейка, кролик',
            'Исключите: рыбу, печень, почки',
            'Суточная норма: 2-4% от веса (индивидуально)'
        ],
        warnings: [
            '⚠️ Контроль фосфора важнее контроля белка',
            '⚠️ Регулярные анализы крови обязательны',
            '⚠️ Обеспечьте максимальное потребление воды',
            '⚠️ Обязательна консультация ветеринара-нефролога'
        ]
    },
    diabetes: {
        title: 'Сахарный диабет',
        recommendations: [
            '🥩 Высокобелковая диета (мясо 80-90%)',
            '🚫 Менее 10% калорий из углеводов (полный отказ от злаков и крахмала)',
            'НИКАКИХ каш, картофеля, кукурузы',
            'Частые небольшие порции (2-3 раза в день)',
            'Предпочтительно: мясо, субпродукты, яйца',
            'Контроль веса обязателен',
            'Суточная норма: 2-5% от веса'
        ],
        warnings: [
            '⚠️ ПОЛНЫЙ отказ от углеводов (каши, картофель, злаки)',
            '⚠️ Менее 10% калорий из углеводов',
            '⚠️ Регулярный контроль глюкозы',
            '⚠️ Обязательна консультация ветеринара-эндокринолога'
        ]
    },
    obesity: {
        title: 'Ожирение',
        recommendations: [
            'Снизьте суточную норму до 3-4% от веса',
            'Увеличьте долю нежирного мяса',
            'Предпочтительно: куриная грудка, индейка, кролик',
            'Ограничьте жирные субпродукты',
            'Регулярные взвешивания'
        ],
        warnings: [
            '⚠️ Постепенное снижение веса (не более 1-2% в неделю)',
            '⚠️ Увеличьте физическую активность'
        ]
    },
    allergies: {
        title: 'Аллергии',
        recommendations: [
            'Монопротеиновая диета (один вид мяса)',
            'Исключите курицу (частый аллерген)',
            'Предпочтительно: кролик, индейка, оленина',
            'Вводите новые продукты постепенно',
            'Ведите пищевой дневник'
        ],
        warnings: [
            '⚠️ Исключите курицу и говядину',
            '⚠️ Новый продукт - не чаще раза в 2 недели',
            '⚠️ Обязательна консультация ветеринара'
        ]
    },
    digestive: {
        title: 'Проблемы ЖКТ',
        recommendations: [
            'Легкоусвояемое мясо: курица, индейка',
            'Избегайте жирных субпродуктов',
            'Небольшие порции 3-4 раза в день',
            'Исключите кости на время обострения',
            'Предпочтительно: грудка, филе'
        ],
        warnings: [
            '⚠️ При диарее - только вареное мясо',
            '⚠️ Обязательна консультация ветеринара'
        ]
    }
};

// ===== БАЗА ЗНАНИЙ ДЛЯ ЧАТ-БОТА =====
// Обновлено по информации с catnutrition.ru
const chatbotKnowledge = {
    'сколько': 'Взрослые кошки должны получать 2-5% от своего веса в день (в среднем 5%). Котята, беременные/кормящие и высокоактивные кошки - 5-10%. Для кота весом 4.5 кг это около 225 граммов сырого мяса в день.',
    'норма': 'Суточная норма: взрослые кошки 2-5% от веса, котята и активные кошки 5-10%. Корректируйте индивидуально: если кошка худеет - увеличивайте, полнеет - уменьшайте.',
    'пирамида': 'Пирамида питания: 60% мясо и мышечные органы, 20-40% мясокостные составляющие (только СЫРЫЕ!), 10-15% субпродукты (печень 5-10%), ~10% добавки (яйца, овощи до 2%).',
    'запрещенные': 'Котам НЕЛЬЗЯ: вареные кости (смертельно опасны!), речная рыба сырая, крахмалистые продукты (каши, картофель, кукуруза), лук, чеснок, виноград, изюм, шоколад, кофеин, алкоголь, авокадо, ксилит.',
    'частота': 'Рекомендуется кормить взрослых кошек 1-2 раза в день. Есть исследования о пользе кормления 1 раз в день для лучшего контроля аппетита и насыщения. Котят до 6 месяцев - 3-4 раза.',
    'вода': 'Кот должен пить 40-60 мл воды на 1 кг веса в день. При натуральном питании потребность ниже, так как сырое мясо содержит ~70% влаги. Влажность пищи критически важна при МКБ и ХПН.',
    'рыба': 'Морскую рыбу можно давать 1-2 раза в неделю. НИКОГДА не давайте сырую речную рыбу - риск паразитов! При МКБ и ХПН рыбу полностью исключают из-за высокого содержания фосфора и магния.',
    'печень': 'Печень - ценный субпродукт, но строго 5-10% рациона. Избыток вызывает гипервитаминоз А. При ХПН печень исключают из-за высокого содержания фосфора.',
    'кости': 'ВАЖНО: Только СЫРЫЕ мягкие кости (куриные шейки, крылья, спинки)! Вареные кости СМЕРТЕЛЬНО ОПАСНЫ - они становятся хрупкими и могут травмировать ЖКТ. Костная составляющая должна быть 20-40% рациона.',
    'витамины': 'При сбалансированном натуральном питании дополнительные витамины обычно не нужны. Исключение - таурин (критически важен для кошек), омега-3. Баланс достигается не в одной миске, а на протяжении времени.',
    'переход': 'Переход на натуральное питание должен быть постепенным, в течение 7-14 дней. Начинайте с 25% нового корма, увеличивая долю каждые 2-3 дня. Не смешивайте натуралку с сухим кормом в одно кормление.',
    'хранение': 'Сырое мясо храните в морозилке порционно. Заморозка 3+ дня убивает паразитов. Перед кормлением размораживайте в холодильнике. Не храните размороженное мясо более 24 часов.',
    'хпн': 'При ХПН контролируйте ФОСФОР, а не белок! Используйте яичную скорлупу как источник кальция (фосфор-биндер). Максимальная гидратация критически важна. Исключите субпродукты, рыбу, печень.',
    'диабет': 'При диабете: высокобелковая диета (80-90% мясо), менее 10% калорий из углеводов. НИКАКИХ каш, картофеля, кукурузы, злаков! Кормите 2-3 раза в день небольшими порциями.',
    'баланс': 'Главный принцип: баланс не в одной миске, а на протяжении времени. Чередуйте разные виды мяса, субпродуктов и костей в течение недели для получения всех необходимых питательных веществ.'
};

// ===== ИНИЦИАЛИЗАЦИЯ =====
document.addEventListener('DOMContentLoaded', () => {
    initializeProducts();
    initializeDragAndDrop();
    initializeCatWeight();
    initializePortionPercent();
    initializeHealthCondition();
    initializeSupplements();
    loadFromLocalStorage();
    updateAllDayStats();
    console.log('🐱 Месячный конструктор рациона загружен!');
});

// ===== СОЗДАНИЕ КАРТОЧЕК ПРОДУКТОВ =====
function initializeProducts(filter = 'all') {
    const productsGrid = document.querySelector('.products-grid');
    productsGrid.innerHTML = ''; // Очистить перед рендером

    const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);

    filtered.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.draggable = true;
        productCard.dataset.productId = product.id;
        productCard.dataset.category = product.category;

        productCard.innerHTML = `
            <div class="product-card-emoji">${product.emoji}</div>
            <div class="product-card-info">
                <div class="product-card-name">${product.name}</div>
                <div class="product-card-weight">Мин: ${product.minWeight}г | Белок: ${product.protein}%</div>
            </div>
        `;

        productCard.addEventListener('click', (e) => {
            if (!e.target.closest('.dragging')) {
                showAlternatives(product.id);
            }
        });

        productCard.addEventListener('dragstart', handleDragStart);
        productCard.addEventListener('dragend', handleDragEnd);

        productsGrid.appendChild(productCard);
    });
}

function filterProducts(category) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('onclick').includes(category));
    });
    initializeProducts(category);
}

// ===== ДОБАВКИ =====
function initializeSupplements() {
    const container = document.getElementById('supplements-chips');
    container.innerHTML = supplements.map(s => `
        <div class="supplement-chip ${chosenSupplements.includes(s.id) ? 'active' : ''}" 
             onclick="toggleSupplement('${s.id}')" title="${s.description}">
            <span>${s.emoji}</span>
            <span>${s.name}</span>
        </div>
    `).join('');
}

function toggleSupplement(id) {
    const index = chosenSupplements.indexOf(id);
    if (index === -1) {
        chosenSupplements.push(id);
        addToHistory('supplement', `Добавлена добавка: ${supplements.find(s => s.id === id).name}`);
    } else {
        chosenSupplements.splice(index, 1);
        addToHistory('supplement', `Удалена добавка: ${supplements.find(s => s.id === id).name}`);
    }
    initializeSupplements();
    saveToLocalStorage();
}

// ===== УПРАВЛЕНИЕ НЕДЕЛЯМИ =====
function changeWeek(weekNum) {
    currentWeek = weekNum;
    document.querySelectorAll('.week-btn').forEach((btn, idx) => {
        btn.classList.toggle('active', idx + 1 === weekNum);
    });

    // Перерисовываем все дни текущей недели
    for (let day = 1; day <= 7; day++) {
        renderDay(day);
        updateDayStats(day);
    }
}

// ===== DRAG AND DROP =====
function initializeDragAndDrop() {
    const dayProducts = document.querySelectorAll('.day-products');
    dayProducts.forEach(zone => {
        zone.addEventListener('dragover', handleDragOver);
        zone.addEventListener('dragleave', handleDragLeave);
        zone.addEventListener('drop', handleDrop);
    });
}

function handleDragStart(e) {
    e.currentTarget.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('productId', e.currentTarget.dataset.productId);
}

function handleDragEnd(e) {
    e.currentTarget.classList.remove('dragging');
}

function handleDragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
    e.dataTransfer.dropEffect = 'copy';
}

function handleDragLeave(e) {
    e.currentTarget.classList.remove('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    const productId = parseInt(e.dataTransfer.getData('productId'));
    const dayNumber = parseInt(e.currentTarget.dataset.day);
    addProductToDay(productId, dayNumber);
}

// ===== УПРАВЛЕНИЕ ПРОДУКТАМИ =====
function addProductToDay(productId, dayNumber) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const itemId = Date.now() + Math.random();
    const dayItem = {
        id: itemId,
        productId: product.id,
        name: product.name,
        emoji: product.emoji,
        weight: product.minWeight,
        category: product.category
    };

    monthPlan[currentWeek][dayNumber].push(dayItem);
    renderDay(dayNumber);
    updateDayStats(dayNumber);
    addToHistory('add', `Добавлен ${product.name} в ${getDayName(dayNumber)} (Неделя ${currentWeek})`);
    saveToLocalStorage();
}

function renderDay(dayNumber) {
    const dayProducts = document.querySelector(`.day-products[data-day="${dayNumber}"]`);
    const items = monthPlan[currentWeek][dayNumber];

    if (items.length === 0) {
        dayProducts.innerHTML = '<p class="empty-message">Перетащите продукты сюда</p>';
        return;
    }

    let html = `
        <div class="day-controls-mini">
            <button class="auto-balance-btn" onclick="autoBalanceDay(${dayNumber})" title="Автоматически сбалансировать порции">⚖️ Сбалансировать</button>
        </div>
    `;

    html += items.map(item => `
        <div class="day-product-item" data-item-id="${item.id}" data-category="${item.category}">
            <div class="product-info">
                <span class="product-emoji">${item.emoji}</span>
                <div class="product-details">
                    <div class="product-name">${item.name}</div>
                </div>
            </div>
            <div class="product-weight-control">
                <input 
                    type="number" 
                    value="${item.weight}" 
                    min="${products.find(p => p.id === item.productId).minWeight}"
                    step="5"
                    onchange="updateProductWeight(${dayNumber}, ${item.id}, this.value)"
                />
                <span>г</span>
            </div>
            <button class="remove-btn" onclick="removeProduct(${dayNumber}, ${item.id})">✕</button>
        </div>
    `).join('');

    dayProducts.innerHTML = html;
}

function autoBalanceDay(dayNumber) {
    const items = monthPlan[currentWeek][dayNumber];
    if (items.length === 0) return;

    const targetWeight = catWeight * 1000 * portionPercent;

    // Цели: Мясо 80%, Кости 10%, Органы 10%
    const targetMeat = targetWeight * 0.8;
    const targetBone = targetWeight * 0.1;
    const targetOrgan = targetWeight * 0.1;

    const categories = {
        meat: items.filter(i => i.category === 'meat' || i.category === 'fish'),
        bone: items.filter(i => i.category === 'bone'),
        organ: items.filter(i => i.category === 'organ')
    };

    const balanceCategory = (catItems, target) => {
        if (catItems.length === 0) return;
        const weightPerItem = Math.round((target / catItems.length) / 5) * 5;
        catItems.forEach(item => {
            const product = products.find(p => p.id === item.productId);
            item.weight = Math.max(weightPerItem, product.minWeight);
        });
    };

    balanceCategory(categories.meat, targetMeat);
    balanceCategory(categories.bone, targetBone);
    balanceCategory(categories.organ, targetOrgan);

    renderDay(dayNumber);
    updateDayStats(dayNumber);
    addToHistory('balance', `Автобалансировка дня ${dayNumber} (Неделя ${currentWeek})`);
    saveToLocalStorage();
}

function updateProductWeight(dayNumber, itemId, newWeight) {
    const item = monthPlan[currentWeek][dayNumber].find(i => i.id === itemId);
    if (item) {
        const product = products.find(p => p.id === item.productId);
        const oldWeight = item.weight;
        item.weight = Math.max(parseInt(newWeight), product.minWeight);
        updateDayStats(dayNumber);
        addToHistory('update', `Изменен вес ${item.name}: ${oldWeight}г → ${item.weight}г (Неделя ${currentWeek})`);
        saveToLocalStorage();
    }
}

function removeProduct(dayNumber, itemId) {
    const item = monthPlan[currentWeek][dayNumber].find(i => i.id === itemId);
    if (item) {
        monthPlan[currentWeek][dayNumber] = monthPlan[currentWeek][dayNumber].filter(i => i.id !== itemId);
        renderDay(dayNumber);
        updateDayStats(dayNumber);
        addToHistory('remove', `Удален ${item.name} из ${getDayName(dayNumber)} (Неделя ${currentWeek})`);
        saveToLocalStorage();
    }
}

// ===== СТАТИСТИКА И БАЛАНС =====
function updateDayStats(dayNumber) {
    const items = monthPlan[currentWeek][dayNumber];
    const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
    const targetWeight = catWeight * 1000 * portionPercent;

    const dayCard = document.querySelector(`.day-card[data-day="${dayNumber}"]`);
    const totalWeightSpan = dayCard.querySelector('.total-weight');
    const statusSpan = dayCard.querySelector('.weight-status');

    totalWeightSpan.textContent = `${totalWeight} г / ${targetWeight.toFixed(0)} г`;

    // Расчет баланса 80:10:10
    let meatWeight = 0;
    let boneWeight = 0;
    let organWeight = 0;

    items.forEach(item => {
        if (item.category === 'meat' || item.category === 'fish') meatWeight += item.weight;
        else if (item.category === 'bone') boneWeight += item.weight;
        else if (item.category === 'organ') organWeight += item.weight;
    });

    const meatPct = totalWeight > 0 ? (meatWeight / totalWeight * 100).toFixed(0) : 0;
    const bonePct = totalWeight > 0 ? (boneWeight / totalWeight * 100).toFixed(0) : 0;
    const organPct = totalWeight > 0 ? (organWeight / totalWeight * 100).toFixed(0) : 0;

    // Обновление индикаторов баланса
    const barMeat = dayCard.querySelector('.bar-part.meat');
    const barBone = dayCard.querySelector('.bar-part.bone');
    const barOrgan = dayCard.querySelector('.bar-part.organ');

    barMeat.style.width = `${meatPct}%`;
    barBone.style.width = `${bonePct}%`;
    barOrgan.style.width = `${organPct}%`;

    dayCard.querySelector('.meat-pct').textContent = `${meatPct}% М`;
    dayCard.querySelector('.bone-pct').textContent = `${bonePct}% К`;
    dayCard.querySelector('.organ-pct').textContent = `${organPct}% О`;

    if (totalWeight === 0) {
        statusSpan.textContent = '○';
        statusSpan.className = 'weight-status';
    } else {
        const weightDiff = Math.abs(totalWeight - targetWeight);
        const isBalanced = meatPct >= 75 && meatPct <= 85 && bonePct >= 5 && bonePct <= 15 && organPct >= 5 && organPct <= 15;

        if (weightDiff <= 15 && isBalanced) {
            statusSpan.textContent = '✓';
            statusSpan.className = 'weight-status ok';
        } else if (weightDiff > 50) {
            statusSpan.textContent = '⚠️';
            statusSpan.className = 'weight-status danger';
        } else {
            statusSpan.textContent = '⚖️';
            statusSpan.className = 'weight-status warning';
        }
    }
}

function updateAllDayStats() {
    for (let day = 1; day <= 7; day++) {
        updateDayStats(day);
    }
}

// ===== НАСТРОЙКИ =====
function initializeCatWeight() {
    const weightInput = document.getElementById('cat-weight');
    weightInput.value = catWeight;
    weightInput.addEventListener('input', (e) => {
        catWeight = parseFloat(e.target.value) || 4.5;
        updateAllDayStats();
        saveToLocalStorage();
    });
}

function initializePortionPercent() {
    const percentSelect = document.getElementById('portion-percent');
    percentSelect.value = portionPercent;
    percentSelect.addEventListener('change', (e) => {
        portionPercent = parseFloat(e.target.value);
        updateAllDayStats();
        addToHistory('update', `Изменена целевая норма на ${(portionPercent * 100).toFixed(0)}%`);
        saveToLocalStorage();
    });
}

function initializeHealthCondition() {
    const healthSelect = document.getElementById('health-condition');
    healthSelect.value = healthCondition;
    healthSelect.addEventListener('change', (e) => {
        healthCondition = e.target.value;
        addToHistory('health', `Изменено состояние здоровья: ${healthRecommendations[healthCondition].title}`);
        saveToLocalStorage();
    });
}


// ===== РЕКОМЕНДАЦИИ =====
function showRecommendations() {
    const modal = document.getElementById('recommendations-modal');
    const content = document.getElementById('recommendations-content');
    const rec = healthRecommendations[healthCondition];

    let html = `
        <div class="recommendation-card">
            <h4>📋 Состояние: ${rec.title}</h4>
            <p>Вес кота: ${catWeight} кг | Целевой процент: ${(portionPercent * 100).toFixed(0)}%</p>
            <p>Расчетная суточная норма: <strong>${(catWeight * 1000 * portionPercent).toFixed(0)} г</strong></p>
        </div>
        
        <h3>✅ Рекомендации:</h3>
        <ul>
            ${rec.recommendations.map(r => `<li>${r}</li>`).join('')}
        </ul>
    `;

    if (rec.warnings.length > 0) {
        html += `
            <div class="recommendation-card warning">
                <h4>⚠️ Важные предупреждения:</h4>
                <ul>
                    ${rec.warnings.map(w => `<li>${w}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    // Общие рекомендации
    html += `
        <h3>📚 Общие принципы видотипичного питания (по catnutrition.ru):</h3>
        <ul>
            <li>🥩 <strong>Пирамида питания:</strong> 60% мясо, 20-40% кости (СЫРЫЕ!), 10-15% субпродукты, ~10% добавки</li>
            <li>⚖️ <strong>Баланс не в одной миске, а на протяжении времени</strong> - чередуйте продукты в течение недели</li>
            <li>❄️ Мясо должно быть сырым (заморозка 3+ дня убивает паразитов)</li>
            <li>🚫 <strong>НИКОГДА вареные кости</strong> - они смертельно опасны!</li>
            <li>💧 Всегда свежая вода в доступе (сырое мясо содержит ~70% влаги)</li>
            <li>🕐 Кормите 1-2 раза в день в одно и то же время</li>
            <li>🔄 Не смешивайте натуралку с сухим кормом в одно кормление</li>
            <li>📊 Корректируйте порции индивидуально: худеет - увеличивайте, полнеет - уменьшайте</li>
        </ul>
    `;

    content.innerHTML = html;
    modal.classList.add('show');
}

// ===== ИСТОРИЯ =====
function addToHistory(action, details) {
    const historyItem = {
        timestamp: new Date().toISOString(),
        action: action,
        details: details
    };
    history.unshift(historyItem);
    if (history.length > 50) history = history.slice(0, 50);
    saveToLocalStorage();
}

function showHistory() {
    const modal = document.getElementById('history-modal');
    const content = document.getElementById('history-content');

    if (history.length === 0) {
        content.innerHTML = '<p style="text-align: center; color: #a0aec0;">История пуста</p>';
    } else {
        content.innerHTML = history.map(item => {
            const date = new Date(item.timestamp);
            const actionLabels = {
                'add': '➕ Добавление',
                'remove': '➖ Удаление',
                'update': '✏️ Изменение',
                'health': '🏥 Здоровье',
                'export': '📤 Экспорт'
            };

            return `
                <div class="history-item">
                    <div class="history-item-header">
                        <span class="history-date">${date.toLocaleString('ru-RU')}</span>
                        <span class="history-action">${actionLabels[item.action] || item.action}</span>
                    </div>
                    <div class="history-details">${item.details}</div>
                </div>
            `;
        }).join('');
    }

    modal.classList.add('show');
}

function clearHistory() {
    if (confirm('Вы уверены, что хотите очистить всю историю?')) {
        history = [];
        saveToLocalStorage();
        showHistory();
    }
}

// ===== АНАЛОГИ ПРОДУКТОВ =====
function showAlternatives(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById('alternatives-modal');
    const content = document.getElementById('alternatives-content');

    const alternatives = product.alternatives.map(altId => products.find(p => p.id === altId));

    let html = `
        <p style="margin-bottom: 1rem; color: #4a5568;">
            Выбран: <strong>${product.emoji} ${product.name}</strong>
        </p>
        <p style="margin-bottom: 1rem; color: #718096;">
            Похожие продукты для замены:
        </p>
        <div class="alternatives-grid">
    `;

    alternatives.forEach(alt => {
        html += `
            <div class="alternative-card" onclick="closeModal('alternatives-modal')">
                <div class="alternative-emoji">${alt.emoji}</div>
                <div class="alternative-name">${alt.name}</div>
                <div class="alternative-info">Мин: ${alt.minWeight}г</div>
                <div class="alternative-info">Белок: ${alt.protein}%</div>
            </div>
        `;
    });

    html += '</div>';
    content.innerHTML = html;
    modal.classList.add('show');
}

// ===== ЭКСПОРТ =====
function exportToPDF() {
    let content = `РАЦИОН ДЛЯ КОТА (Месячный план)\n`;
    content += `Вес: ${catWeight} кг | Норма: ${(portionPercent * 100).toFixed(0)}% | Состояние: ${healthRecommendations[healthCondition].title}\n`;
    content += `Дата создания: ${new Date().toLocaleDateString('ru-RU')}\n`;
    content += `Добавки: ${chosenSupplements.length > 0 ? chosenSupplements.map(id => supplements.find(s => s.id === id).name).join(', ') : 'Нет'}\n\n`;
    content += `${'='.repeat(50)}\n\n`;

    for (let week = 1; week <= 4; week++) {
        content += `НЕДЕЛЯ ${week}\n`;
        content += `${'#'.repeat(20)}\n\n`;

        for (let day = 1; day <= 7; day++) {
            const dayName = getDayName(day);
            const items = monthPlan[week][day];
            const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);

            content += `  ${dayName.toUpperCase()}\n`;
            content += `  ${'-'.repeat(15)}\n`;

            if (items.length === 0) {
                content += `    Не запланировано\n`;
            } else {
                items.forEach(item => {
                    content += `    ${item.emoji} ${item.name}: ${item.weight}г\n`;
                });
                content += `    ИТОГО: ${totalWeight}г\n`;
            }
            content += `\n`;
        }
        content += `\n`;
    }

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cat-month-diet-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);

    addToHistory('export', 'Экспорт месячного рациона в текстовый файл');
    alert('✅ Месячный рацион экспортирован!');
}



// ===== ЧАТ-БОТ =====
function toggleChatbot() {
    const chatbot = document.getElementById('chatbot-container');
    if (chatbot.style.display === 'none' || !chatbot.style.display) {
        chatbot.style.display = 'flex';
    } else {
        chatbot.style.display = 'none';
    }
}

function askQuestion(question) {
    addChatMessage(question, 'user');
    setTimeout(() => {
        const answer = getChatbotAnswer(question);
        addChatMessage(answer, 'bot');
    }, 500);
}

function sendChatMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();
    if (!message) return;

    addChatMessage(message, 'user');
    input.value = '';

    setTimeout(() => {
        const answer = getChatbotAnswer(message);
        addChatMessage(answer, 'bot');
    }, 500);
}

function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        sendChatMessage();
    }
}

function addChatMessage(text, sender) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message ${sender}`;
    messageDiv.innerHTML = `<div class="message-content">${text}</div>`;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function getChatbotAnswer(question) {
    const lowerQuestion = question.toLowerCase();

    for (const [keyword, answer] of Object.entries(chatbotKnowledge)) {
        if (lowerQuestion.includes(keyword)) {
            return answer;
        }
    }

    const defaultAnswers = [
        'Интересный вопрос! Для точного ответа рекомендую проконсультироваться с ветеринаром.',
        'Я могу помочь с общими вопросами о питании. Попробуйте спросить о количестве корма, частоте кормления или запрещенных продуктах.',
        'Для получения подробной информации используйте кнопку "Рекомендации" выше.'
    ];

    return defaultAnswers[Math.floor(Math.random() * defaultAnswers.length)];
}

// ===== МОДАЛЬНЫЕ ОКНА =====
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('show');
}

function showAbout() {
    const modal = document.getElementById('about-modal');
    modal.classList.add('show');
}

window.onclick = function (event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('show');
    }
}

// ===== ЛОКАЛЬНОЕ ХРАНИЛИЩЕ =====
function saveToLocalStorage() {
    const data = {
        catWeight,
        portionPercent,
        healthCondition,
        monthPlan,
        chosenSupplements,
        currentWeek,
        history
    };
    localStorage.setItem('catDietPlanV3', JSON.stringify(data));
}

function loadFromLocalStorage() {
    const saved = localStorage.getItem('catDietPlanV3');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            catWeight = data.catWeight || 4.5;
            portionPercent = data.portionPercent || 0.05;
            healthCondition = data.healthCondition || 'healthy';
            monthPlan = data.monthPlan || monthPlan;
            chosenSupplements = data.chosenSupplements || [];
            currentWeek = data.currentWeek || 1;
            history = data.history || [];

            // Обновляем UI
            document.getElementById('cat-weight').value = catWeight;
            document.getElementById('portion-percent').value = portionPercent;
            document.getElementById('health-condition').value = healthCondition;

            initializeSupplements();
            changeWeek(currentWeek);

            console.log('✅ Данные загружены из localStorage V3');
        } catch (e) {
            console.error('Ошибка загрузки данных:', e);
        }
    }
}

// ===== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =====
function getDayName(dayNumber) {
    const days = ['', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
    return days[dayNumber];
}

// Экспорт функций
window.autoBalanceDay = autoBalanceDay;
window.updateProductWeight = updateProductWeight;
window.removeProduct = removeProduct;
window.showRecommendations = showRecommendations;
window.showHistory = showHistory;
window.clearHistory = clearHistory;
window.exportToPDF = exportToPDF;

window.toggleChatbot = toggleChatbot;
window.askQuestion = askQuestion;
window.sendChatMessage = sendChatMessage;
window.handleChatKeyPress = handleChatKeyPress;
window.closeModal = closeModal;
window.showAlternatives = showAlternatives;
window.showAbout = showAbout;
window.changeWeek = changeWeek;
window.toggleSupplement = toggleSupplement;
window.filterProducts = filterProducts;

console.log('🚀 Все функции обновлены и готовы к месячному планированию!');

