const RECIPE_DB = [
    // 朝食
    { name: '卵かけご飯', tags: ['single', 'speed', 'budget', 'B', 'jp'], reason: 'シンプルかつ栄養価が高い定番です。' },
    { name: 'トーストと目玉焼き', tags: ['single', 'couple', 'speed', 'B', 'western'], reason: '手早く作れて満足感があります。' },
    { name: '鮭の塩焼きと味噌汁', tags: ['senior', 'health', 'low-salt', 'B', 'D', 'jp'], reason: '良質なタンパク質が摂れる健康的な献立です。' },
    { name: '納豆と豆腐の味噌汁', tags: ['senior', 'health', 'soft', 'B', 'jp'], reason: '消化に良く、発酵食品で免疫力アップ。' },
    { name: 'シリアルとバナナ', tags: ['single', 'speed', 'B', 'western'], reason: '忙しい朝でも火を使わずに準備完了。' },
    { name: 'おにぎりと即席スープ', tags: ['single', 'speed', 'B', 'L', 'jp'], reason: '片手で食べられて、使い切りにも便利。' },
    { name: 'ほうれん草のお浸しとご飯', tags: ['senior', 'health', 'low-salt', 'B', 'jp'], reason: '鉄分とビタミンを補給できる副菜メイン。' },
    
    // 昼食
    { name: 'ワンパンパスタ', tags: ['single', 'speed', 'L', 'western'], reason: '洗い物が少なく、一人暮らしに最適です。' },
    { name: '親子丼', tags: ['single', 'couple', 'budget', 'L', 'D', 'jp'], reason: '鶏肉と卵でコスパ良く、満足度も高い一品。' },
    { name: '冷やしうどん', tags: ['single', 'senior', 'speed', 'soft', 'L', 'jp'], reason: '喉越しが良く、食欲がない時にも。' },
    { name: 'サバ缶の炊き込みご飯', tags: ['single', 'couple', 'budget', 'L', 'D', 'jp'], reason: '缶詰活用で栄養満点、手間いらずです。' },
    { name: '野菜炒め定食', tags: ['couple', 'health', 'L', 'D', 'jp'], reason: '冷蔵庫の余り野菜を一掃できます。' },
    { name: 'チャーハン', tags: ['single', 'speed', 'budget', 'L', 'chinese'], reason: '高火力でサッと作れる節約メニュー。' },
    { name: 'サンドイッチ', tags: ['single', 'couple', 'speed', 'L', 'western'], reason: '具材のアレンジがしやすく、軽めな昼食に。' },
    
    // 夕食
    { name: '豆腐ハンバーグ', tags: ['senior', 'health', 'soft', 'D', 'jp'], reason: 'ヘルシーで柔らかく、体に優しい。' },
    { name: '煮込みうどん', tags: ['senior', 'soft', 'health', 'D', 'jp'], reason: '野菜たっぷりで芯から温まります。' },
    { name: '豚の生姜焼き', tags: ['couple', 'speed', 'D', 'jp'], reason: 'スタミナ補給に。ご飯が進みます。' },
    { name: '鶏の照り焼き', tags: ['couple', 'budget', 'D', 'jp'], reason: '定番の味付けで家族に喜ばれます。' },
    { name: '白身魚の蒸し物', tags: ['senior', 'health', 'low-salt', 'soft', 'D', 'jp'], reason: '蒸し料理で油を控え、素材の味を。' },
    { name: '具だくさんポトフ', tags: ['couple', 'health', 'budget', 'D', 'western'], reason: '煮込むだけで野菜の旨みが凝縮。' },
    { name: '肉じゃが', tags: ['couple', 'senior', 'health', 'D', 'jp'], reason: 'ほっこりする家庭の味。常備菜にも。' },
    { name: 'カレーライス', tags: ['single', 'couple', 'budget', 'D', 'western'], reason: '作り置きができる、みんな大好きメニュー。' },
    { name: '湯豆腐', tags: ['senior', 'health', 'soft', 'low-salt', 'D', 'jp'], reason: '究極のシンプル健康食。' },
    { name: '厚揚げの煮物', tags: ['senior', 'budget', 'soft', 'D', 'jp'], reason: '安価な厚揚げを美味しくボリュームアップ。' },
    { name: '麻婆豆腐', tags: ['single', 'couple', 'speed', 'D', 'chinese'], reason: '豆腐メインでヘルシーかつご飯に合う。' },
    { name: 'アジの開き', tags: ['senior', 'health', 'low-salt', 'D', 'jp'], reason: '魚の栄養を丸ごと摂れる和の朝食。' },
    { name: 'ポークビーンズ', tags: ['couple', 'health', 'budget', 'D', 'western'], reason: '豆類と豚肉で栄養バランスが抜群。' }
];

const AI_ADVICE_TEMPLATES = {
    speed: '今週は忙しそうですね。手間のかからない「時短メニュー」を中心に、洗い物が少なくて済むよう構成しました。無理せず自炊を続けましょう！',
    health: '健康を第一に考え、野菜を多く摂取できる「栄養バランス重視」の献立にしました。シニアの方にも優しい、薄味でも満足できる内容です。',
    budget: '今週は家計に優しい「節約・使い切りメニュー」で構成しました。サバ缶や豆腐などのコスパ食材を上手に活用して、美味しく節約しましょう。',
    general: 'あなたの生活スタイルに合わせて、和食・洋食をバランスよく取り入れた献立を作成しました。楽しい食事の時間を！'
};

const WEEKDAYS = ['月', '火', '水', '木', '金', '土', '日'];
const MEAL_TYPES = { B: '朝食', L: '昼食', D: '夕食' };

// 状態管理
const DEFAULT_STATE = {
    profile: {
        household: 'single',
        priority: 'speed',
        diet: 'none'
    },
    currentWeek: {
        startDate: '',
        meals: {},
        aiAdvice: ''
    },
    history: []
};

let state = JSON.parse(JSON.stringify(DEFAULT_STATE));

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    try {
        loadFromLocalStorage();
        if (!state.currentWeek.startDate || Object.keys(state.currentWeek.meals).length === 0) {
            initNewWeek();
        }
        syncProfileUI();
        renderAll();
        setupEventListeners();
    } catch (e) {
        console.error('Initialization failed:', e);
        if (confirm('アプリの起動に失敗しました。データをリセットして初期化しますか？')) {
            localStorage.removeItem('mealPlannerData');
            location.reload();
        }
    }
});

function syncProfileUI() {
    try {
        const h = document.getElementById('profile-household');
        const p = document.getElementById('profile-priority');
        const d = document.getElementById('profile-diet');
        if (h) h.value = state.profile.household;
        if (p) p.value = state.profile.priority;
        if (d) d.value = state.profile.diet;
    } catch (e) {
        console.warn('Profile UI sync failed', e);
    }
}

function generateMenu() {
    try {
        const { household, priority, diet } = state.profile;
        const dates = Object.keys(state.currentWeek.meals);
        if (dates.length === 0) {
            initNewWeek();
            return generateMenu();
        }

        const usedRecipes = new Set();
        const genres = ['jp', 'western', 'chinese'];
        let lastGenre = '';
        
        dates.forEach(date => {
            if (!state.currentWeek.meals[date] || typeof state.currentWeek.meals[date] !== 'object') {
                state.currentWeek.meals[date] = { B: '', L: '', D: '' };
            }
            state.currentWeek.meals[date].reasons = {};
            
            ['B', 'L', 'D'].forEach(type => {
                let candidates = RECIPE_DB.filter(r => r.tags.includes(type));
                
                let filtered = candidates.filter(r => 
                    (r.tags.includes(household) || r.tags.includes(priority) || (diet !== 'none' && r.tags.includes(diet))) &&
                    !usedRecipes.has(r.name) &&
                    r.tags.filter(t => genres.includes(t))[0] !== lastGenre
                );
                
                if (filtered.length === 0) {
                    filtered = candidates.filter(r => !usedRecipes.has(r.name));
                }
                if (filtered.length === 0) filtered = candidates;
                
                const picked = filtered[Math.floor(Math.random() * filtered.length)];
                state.currentWeek.meals[date][type] = picked.name;
                state.currentWeek.meals[date].reasons[type] = picked.reason;
                usedRecipes.add(picked.name);
                lastGenre = picked.tags.filter(t => genres.includes(t))[0] || '';
            });
        });
        
        state.currentWeek.aiAdvice = AI_ADVICE_TEMPLATES[priority] || AI_ADVICE_TEMPLATES.general;
        saveToLocalStorage();
    } catch (e) {
        console.error('Menu generation failed:', e);
        alert('献立の生成中にエラーが発生しました。');
    }
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
        state.currentWeek.meals[formatDate(d)] = { B: '', L: '', D: '', reasons: {} };
    }
    saveToLocalStorage();
}

function loadFromLocalStorage() {
    try {
        const data = localStorage.getItem('mealPlannerData');
        if (data) {
            const savedState = JSON.parse(data);
            state.profile = Object.assign({}, DEFAULT_STATE.profile, savedState.profile);
            state.currentWeek = Object.assign({}, DEFAULT_STATE.currentWeek, savedState.currentWeek);
            state.history = savedState.history || [];
            
            if (state.currentWeek.meals) {
                Object.keys(state.currentWeek.meals).forEach(date => {
                    if (typeof state.currentWeek.meals[date] !== 'object') {
                        state.currentWeek.meals[date] = { B: '', L: '', D: '', reasons: {} };
                    }
                });
            }
        }
    } catch (e) {
        console.warn('LocalStorage load failed');
        state = JSON.parse(JSON.stringify(DEFAULT_STATE));
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
    renderAIAdvice();
    if (window.lucide) lucide.createIcons();
}

function renderAIAdvice() {
    const section = document.getElementById('ai-advice-section');
    const text = document.getElementById('ai-advice-text');
    if (state.currentWeek.aiAdvice) {
        text.textContent = state.currentWeek.aiAdvice;
        section.style.display = 'block';
    } else {
        section.style.display = 'none';
    }
}

function renderGrid() {
    const grid = document.getElementById('meal-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const sortedDates = Object.keys(state.currentWeek.meals).sort();
    
    sortedDates.forEach((dateStr, index) => {
        const dayName = WEEKDAYS[index];
        const meals = state.currentWeek.meals[dateStr];
        const reasons = meals.reasons || {};

        const card = document.createElement('div');
        card.className = 'day-card';
        card.innerHTML = `
            <h3>
                <span class="weekday">${dayName}曜日</span>
                <span class="date">${dateStr.replace(/-/g, '/')}</span>
            </h3>
            ${['B', 'L', 'D'].map(type => `
                <div class="meal-input-group">
                    <label>${MEAL_TYPES[type]}</label>
                    <input type="text" data-date="${dateStr}" data-type="${type}" value="${meals[type] || ''}" placeholder="例: パスタ">
                    ${reasons[type] ? `<div class="meal-reason">AI: ${reasons[type]}</div>` : ''}
                </div>
            `).join('')}
        `;
        grid.appendChild(card);
    });

    grid.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', (e) => {
            const { date, type } = e.target.dataset;
            state.currentWeek.meals[date][type] = e.target.value;
            if (state.currentWeek.meals[date].reasons) {
                delete state.currentWeek.meals[date].reasons[type];
            }
            saveToLocalStorage();
        });
    });
}

function renderHistory() {
    const list = document.getElementById('history-list');
    if (!list) return;
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
    ['profile-household', 'profile-priority', 'profile-diet'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('change', (e) => {
                const key = id.replace('profile-', '');
                state.profile[key] = e.target.value;
                saveToLocalStorage();
            });
        }
    });

    const genBtn = document.getElementById('generate-menu');
    if (genBtn) {
        genBtn.addEventListener('click', () => {
            if (confirm('現在の入力を上書きして、AIに献立を相談しますか？')) {
                const loading = document.getElementById('ai-loading');
                const grid = document.getElementById('meal-grid');
                
                if (loading) loading.style.display = 'block';
                if (grid) grid.style.opacity = '0.3';
                
                setTimeout(() => {
                    generateMenu();
                    renderAll();
                    if (loading) loading.style.display = 'none';
                    if (grid) grid.style.opacity = '1';
                }, 1500);
            }
        });
    }

    const saveBtn = document.getElementById('save-week');
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            if (confirm('今週の献立を履歴に保存して、新しい週を開始しますか？')) {
                state.history.push(JSON.parse(JSON.stringify(state.currentWeek)));
                initNewWeek();
                renderAll();
                alert('履歴に保存しました！');
            }
        });
    }

    const clearBtn = document.getElementById('clear-week');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (confirm('今週の入力をすべて消去しますか？')) {
                Object.keys(state.currentWeek.meals).forEach(date => {
                    state.currentWeek.meals[date] = { B: '', L: '', D: '', reasons: {} };
                });
                saveToLocalStorage();
                renderGrid();
            }
        });
    }
}
