document.addEventListener('DOMContentLoaded', function() {

    // ===== ОПОВЕЩЕНИЯ =====
    const riskCheckbox = document.getElementById('riskCheckbox');
    const alertsCard = document.getElementById('alertsCard');

    if (riskCheckbox && alertsCard) {
        riskCheckbox.checked = true;
        function toggleAlerts() {
            alertsCard.style.display = riskCheckbox.checked ? 'block' : 'none';
        }
        riskCheckbox.addEventListener('change', toggleAlerts);
        toggleAlerts();
    }

    // ===== КНОПКИ МЕНЮ И ВЫХОД =====
    const menuBtn = document.getElementById('menuBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    if (menuBtn) menuBtn.addEventListener('click', () => alert('Меню'));
    if (logoutBtn) logoutBtn.addEventListener('click', () => alert('Выход'));

    // ===== РАСКРАСКА ПРОЦЕНТОВ =====
    function colorizePercentCells() {
        const cells = document.querySelectorAll('.percent-cell');
        cells.forEach(cell => {
            const percent = parseInt(cell.innerText, 10);
            if (percent < 30) cell.style.color = '#EB4343';
            else if (percent > 150) cell.style.color = '#EB7E43';
            else cell.style.color = '#1A2C3E';
        });
    }

    // ===== ПОДСЧЁТ СУММЫ "Подано заявлений" =====
    function updateTotalApplications() {
        // Находим все строки таблицы
        const rows = document.querySelectorAll('.data-table tbody tr');
        let total = 0;

        rows.forEach(row => {
            // Берём вторую ячейку в строке (индекс 1) — "Подано заявлений"
            const cell = row.cells[1];
            if (cell) {
                const value = parseInt(cell.innerText, 10);
                if (!isNaN(value)) {
                    total += value;
                }
            }
        });

        // Обновляем блок с общей суммой
        const totalElement = document.querySelector('.total-number');
        if (totalElement) {
            totalElement.textContent = total;
        }
    }

    // ===== ВЫЗЫВАЕМ ФУНКЦИИ ПРИ ЗАГРУЗКЕ =====
    colorizePercentCells();
    updateTotalApplications();

    // ===== ОВЕРЛЕЙ ОШИБКИ =====
    const errorOverlay = document.getElementById('errorOverlay');
    const retryBtn = document.getElementById('retryBtn');
    const reloadBtn = document.getElementById('reloadBtn');
    const demoErrorBtn = document.getElementById('demoErrorBtn');

    function showError() {
        if (errorOverlay) {
            errorOverlay.style.display = 'flex';
        }
    }

    function hideError() {
        if (errorOverlay) {
            errorOverlay.style.display = 'none';
        }
    }

    if (retryBtn) retryBtn.addEventListener('click', hideError);
    if (reloadBtn) reloadBtn.addEventListener('click', () => location.reload());
    if (demoErrorBtn) demoErrorBtn.addEventListener('click', showError);

});