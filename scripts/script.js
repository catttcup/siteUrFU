document.addEventListener('DOMContentLoaded', function() {

    // ===== ОПОВЕЩЕНИЯ =====
    const riskCheckbox = document.getElementById('riskCheckbox');
    const alertsCard = document.getElementById('alertsCard');
    const alertsContainer = document.querySelector('#alertsCard .alerts-list');
    
    function updateAlertsList() {
        const rows = document.querySelectorAll('.data-table tbody tr');
        const riskyItems = [];
        
        rows.forEach(row => {
            const directionName = row.cells[0]?.innerText || '';
            const percentCell = row.cells[3];
            if (!percentCell) return;
            
            const percentText = percentCell.innerText.replace('%', '');
            const percent = parseInt(percentText, 10);
            
            if (percent < 30) {
                riskyItems.push({ name: directionName, percent: percent, type: 'red', status: 'недобор' });
            } else if (percent > 150) {
                riskyItems.push({ name: directionName, percent: percent, type: 'orange', status: 'перебор' });
            }
        });
        
        if (alertsContainer) alertsContainer.innerHTML = '';
        
        if (riskCheckbox && riskCheckbox.checked && riskyItems.length > 0) {
            if (alertsCard) alertsCard.style.display = 'block';
            
            riskyItems.forEach(item => {
                const alertItem = document.createElement('div');
                alertItem.className = 'alert-item';
                
                const badge = document.createElement('span');
                badge.className = `alert-badge alert-${item.type === 'red' ? 'red' : 'orange'}`;
                
                const text = document.createElement('span');
                text.className = 'alert-text';
                text.innerText = `${item.name} - ${item.percent}% (${item.status})`;
                
                alertItem.appendChild(badge);
                alertItem.appendChild(text);
                alertsContainer.appendChild(alertItem);
            });
        } else {
            if (alertsCard) alertsCard.style.display = 'none';
        }
    }
    
    // ===== РАСКРАСКА ПРОЦЕНТОВ =====
    function colorizePercentCells() {
        const cells = document.querySelectorAll('.percent-cell');
        cells.forEach(cell => {
            const percentText = cell.innerText.replace('%', '');
            const percent = parseInt(percentText, 10);
            
            if (isNaN(percent)) {
                cell.innerHTML = '<span class="percent-value">—</span>';
                return;
            }
            
            let badgeColor = '';
            if (percent < 30) badgeColor = 'percent-badge-red';
            else if (percent > 150) badgeColor = 'percent-badge-orange';
            else badgeColor = 'percent-badge-green';
            
            cell.innerHTML = `
                <div class="percent-content">
                    <span class="percent-value">${percent}%</span>
                    <span class="percent-badge ${badgeColor}"></span>
                </div>
            `;
        });
    }
    
    // ===== ПОДСЧЁТ СУММЫ =====
    function updateTotalApplications() {
        const rows = document.querySelectorAll('.data-table tbody tr');
        let total = 0;
        
        rows.forEach(row => {
            const cell = row.cells[1];
            if (cell) {
                const value = parseInt(cell.innerText, 10);
                if (!isNaN(value)) total += value;
            }
        });
        
        const totalElement = document.querySelector('.total-number');
        if (totalElement) totalElement.textContent = total;
    }
    
    // ===== ЧЕКБОКС =====
    if (riskCheckbox && alertsCard) {
        riskCheckbox.checked = true;
        riskCheckbox.addEventListener('change', () => updateAlertsList());
    }
    
    // ===== КНОПКИ МЕНЮ =====
    const menuBtn = document.getElementById('menuBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    if (menuBtn) menuBtn.addEventListener('click', () => alert('Меню'));
    if (logoutBtn) logoutBtn.addEventListener('click', () => alert('Выход'));
    
    // ===== СОСТОЯНИЯ =====
    const loadingState = document.getElementById('loadingState');
    const errorOverlay = document.getElementById('errorOverlay');
    const normalState = document.getElementById('normalState');
    const retryBtn = document.getElementById('retryBtn');
    const reloadBtn = document.getElementById('reloadBtn');
    
    function showLoading() {
        if (loadingState) loadingState.style.display = 'flex';
        if (errorOverlay) errorOverlay.style.display = 'none';
        if (normalState) normalState.style.display = 'none';
    }
    
    function showErrorState() {
        if (loadingState) loadingState.style.display = 'none';
        if (errorOverlay) errorOverlay.style.display = 'flex';
        if (normalState) normalState.style.display = 'flex';
    }
    
    function showData() {
        if (loadingState) loadingState.style.display = 'none';
        if (errorOverlay) errorOverlay.style.display = 'none';
        if (normalState) normalState.style.display = 'flex';
        
        colorizePercentCells();
        updateTotalApplications();
        updateAlertsList();
    }
    
    function loadData() {
        showLoading();
        
        setTimeout(() => {
            const success = Math.random() > 0.3;
            if (success) {
                showData();
            } else {
                showErrorState();
            }
        }, 1500);
    }
    
    if (retryBtn) {
        retryBtn.addEventListener('click', () => {
            showLoading();
            loadData();
        });
    }
    if (reloadBtn) reloadBtn.addEventListener('click', () => location.reload());
    
    // ===== ДЕМО-КНОПКИ =====
    const demoErrorBtn = document.getElementById('demoErrorBtn');
    const demoLoadingBtn = document.getElementById('demoLoadingBtn');
    
    if (demoErrorBtn) demoErrorBtn.addEventListener('click', () => showErrorState());
    if (demoLoadingBtn) demoLoadingBtn.addEventListener('click', () => loadData());
    
    // СТАРТ
    loadData();
    
});