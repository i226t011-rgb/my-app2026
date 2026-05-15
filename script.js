// 状態管理
let state = {
    profile: {
        household: 'single',
        priority: 'speed',
        diet: 'none'
    },
    currentWeek: {
        startDate: '',
        meals: {} // { '2026-05-11': { B: '', L: '', D: '' }, ... }
    },
    history: []
};

const RECIPE_DB = [
    { name: '卵かけご飯', tags: ['single', 'speed', 'budget', 'B'] },
    { name: 'トーストと目玉焼き', tags: ['single', 'couple', 'speed', 'B'] },
    { name: '鮭の塩焼きと味噌汁', tags: ['senior', 'health', 'low-salt', 'B', 'D'] },
    { name: '納豆と豆腐の味噌汁', tags: ['senior', 'health', 'soft', 'B'] },
    { name: 'おにぎりと即席スープ', tags: ['single', 'speed', 'B', 'L'] },
    
    { name: 'ワンパンパスタ', tags: ['single', 'speed', 'L'] },
    { name: '親子丼', tags: ['single', 'couple', 'budget', 'L', 'D'] },
    { name: '冷やしうどん', tags: ['single', 'senior', 'speed', 'soft', 'L'] },
    { name: 'サバ缶の炊き込みご飯', tags: ['single', 'couple', 'budget', 'L', 'D'] },
    { name: '野菜炒め定食', tags: ['couple', 'health', 'L', 'D'] },
    
    { name: '豆腐ハンバーグ', tags: ['senior', 'health', 'soft', 'D'] },
    { name: '煮込みうどん', tags: ['senior', 'soft', 'health', 'D'] },
    { name: '豚の生姜焼き', tags: ['couple', 'speed', 'D'] },
    { name: '鶏の照り焼き', tags: ['couple', 'budget', 'D'] },
    { name: '白身魚の蒸し物', tags: ['senior', 'health', 'low-salt', 'soft', 'D'] },
    { name: '具だくさんポトフ', tags: ['couple', 'health', 'budget', 'D'] },
    { name: '肉じゃが', tags: ['couple', 'senior', 'health', 'D'] },
    { name: 'カレーライス', tags: ['single', 'couple', 'budget', 'D'] },
    { name: '湯豆腐', tags: ['senior', 'health', 'soft', 'low-salt', 'D'] },
    { name: '厚揚げの煮物', tags: ['senior', 'budget', 'soft', 'D'] }
];

const WEEKDAYS = ['月', '火', '水', '木', '金', '土', '日'];
const MEAL_TYPES = { B: '朝食', L: '昼食', D: '夕食' };

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage();
    if (!state.currentWeek.startDate) {
        initNewWeek();
    }
    syncProfileUI();
    renderAll();
    setupEventListeners();
});

function syncProfileUI() {
    document.getElementById('profile-household').value = state.profile.household;
    document.getElementById('profile-priority').value = state.profile.priority;
    document.getElementById('profile-diet').value = state.profile.diet;
}

function generateMenu() {
    const { household, priority, diet } = state.profile;
    const dates = Object.keys(state.currentWeek.meals);
    
    dates.forEach(date => {
        ['B', 'L', 'D'].forEach(type => {
            // 条件に合うレシピをフィルタリング
            let candidates = RECIPE_DB.filter(r => r.tags.includes(type));
            
            // 属性による重み付け（簡易的にフィルタリング）
            let filtered = candidates.filter(r => 
                r.tags.includes(household) || r.tags.includes(priority) || (diet !== 'none' && r.tags.includes(diet))
            );
            
            // 候補がなければ広めに取る
            if (filtered.length === 0) filtered = candidates;
            
            const picked = filtered[Math.floor(Math.random() * filtered.length)];
            state.currentWeek.meals[date][type] = picked.name;
        });
    });
    
    saveToLocalStorage();
    renderGrid();
}

function initNewWeek() {
    const today = new Date();
    const day = today.getDay(); // 0(日) to 6(土)
    const diff = today.getDate() - day + (day === 0 ? -6 : 1); // 月曜日を取得
    const monday = new Date(today.setDate(diff));
    
    state.currentWeek.startDate = formatDate(monday);
    state.currentWeek.meals = {};
    
    for (let i = 0; i < 7; i++) {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        state.currentWeek.meals[formatDate(d)] = { B: '', L: '', D: '' };
    }
    saveToLocalStorage();
}

function loadFromLocalStorage() {
    const data = localStorage.getItem('mealPlannerData');
    if (data) {
        state = JSON.parse(data);
    }
}

function saveToLocalStorage() {
    localStorage.setItem('mealPlannerData', JSON.stringify(state));
}

function formatDate(date) {
    return date.toISOString().split('T')[0];
}

function renderAll() {
    renderGrid();
    renderHistory();
    if (window.lucide) lucide.createIcons();
}

function renderGrid() {
    const grid = document.getElementById('meal-grid');
    grid.innerHTML = '';

    const sortedDates = Object.keys(state.currentWeek.meals).sort();
    
    sortedDates.forEach((dateStr, index) => {
        const dateObj = new Date(dateStr);
        const dayName = WEEKDAYS[index];
        const meals = state.currentWeek.meals[dateStr];

        const card = document.createElement('div');
        card.className = 'day-card';
        card.innerHTML = `
            <h3>
                <span class="weekday">${dayName}曜日</span>
                <span class="date">${dateStr.replace(/-/g, '/')}</span>
            </h3>
            <div class="meal-input-group">
                <label>${MEAL_TYPES.B}</label>
                <input type="text" data-date="${dateStr}" data-type="B" value="${meals.B}" placeholder="例: トースト、卵">
            </div>
            <div class="meal-input-group">
                <label>${MEAL_TYPES.L}</label>
                <input type="text" data-date="${dateStr}" data-type="L" value="${meals.L}" placeholder="例: パスタ">
            </div>
            <div class="meal-input-group">
                <label>${MEAL_TYPES.D}</label>
                <input type="text" data-date="${dateStr}" data-type="D" value="${meals.D}" placeholder="例: 焼き魚、味噌汁">
            </div>
        `;
        grid.appendChild(card);
    });

    // 入力イベントの監視
    grid.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', (e) => {
            const { date, type } = e.target.dataset;
            state.currentWeek.meals[date][type] = e.target.value;
            saveToLocalStorage();
        });
    });
}

function renderHistory() {
    const list = document.getElementById('history-list');
    if (state.history.length === 0) {
        list.innerHTML = '<p class="empty-state">履歴はまだありません。</p>';
        return;
    }

    list.innerHTML = '';
    state.history.slice().reverse().forEach((item, index) => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
            <div class="history-info">
                <span class="date-range">${item.startDate} 〜 の週</span>
            </div>
            <div class="history-actions">
                <button class="btn btn-outline btn-sm delete-history" data-index="${state.history.length - 1 - index}">
                    <i data-lucide="trash-2"></i> 削除
                </button>
            </div>
        `;
        list.appendChild(historyItem);
    });

    // 削除ボタンのイベント
    list.querySelectorAll('.delete-history').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.currentTarget.dataset.index;
            if (confirm('この履歴を削除しますか？')) {
                state.history.splice(index, 1);
                saveToLocalStorage();
                renderHistory();
                if (window.lucide) lucide.createIcons();
            }
        });
    });
}

function setupEventListeners() {
    // プロフィール変更の監視
    ['profile-household', 'profile-priority', 'profile-diet'].forEach(id => {
        document.getElementById(id).addEventListener('change', (e) => {
            const key = id.replace('profile-', '');
            state.profile[key] = e.target.value;
            saveToLocalStorage();
        });
    });

    // 献立生成
    document.getElementById('generate-menu').addEventListener('click', () => {
        if (confirm('現在の入力を上書きして、あなたのプロフィールに合わせた献立を提案しますか？')) {
            generateMenu();
        }
    });

    document.getElementById('save-week').addEventListener('click', () => {
        if (confirm('今週の献立を履歴に保存して、新しい週を開始しますか？')) {
            // 現在の週を履歴に追加
            state.history.push(JSON.parse(JSON.stringify(state.currentWeek)));
            // 新しい週を初期化
            initNewWeek();
            renderAll();
            alert('履歴に保存しました！');
        }
    });

    document.getElementById('clear-week').addEventListener('click', () => {
        if (confirm('今週の入力をすべて消去しますか？')) {
            Object.keys(state.currentWeek.meals).forEach(date => {
                state.currentWeek.meals[date] = { B: '', L: '', D: '' };
            });
            saveToLocalStorage();
            renderGrid();
        }
    });
}
