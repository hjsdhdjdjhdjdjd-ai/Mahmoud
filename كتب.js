// 1. كود زرار الدارك مود مع حفظ الحالة عند إعادة تحميل الصفحة
const themeToggleBtn = document.getElementById('theme-toggle');

// التحقق من الوضع المحفوظ سابقاً
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    if (themeToggleBtn) themeToggleBtn.textContent = '☀️ الوضع الفاتح';
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            themeToggleBtn.textContent = '☀️ الوضع الفاتح';
            localStorage.setItem('theme', 'dark'); // حفظ الاختيار
        } else {
            themeToggleBtn.textContent = '🌑 الوضع الليلي';
            localStorage.setItem('theme', 'light');
        }
    });
}

// 2. كود غلق الخانات الأخرى عند فتح خانة جديدة (Accordion)
const allDetails = document.querySelectorAll('.stages-container > details');

allDetails.forEach(targetDetails => {
    targetDetails.addEventListener('toggle', () => {
        if (targetDetails.open) {
            allDetails.forEach(details => {
                if (details !== targetDetails) {
                    details.open = false; // إغلاق أي مرحلة تانية مفتوحة
                }
            });
        }
    });
});