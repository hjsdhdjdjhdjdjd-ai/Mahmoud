    // قاعدة بيانات تجريبية تحتوي على أكواد الطلاب
    const database = {
      "102030": {
        name: "أحمد محمود",
        books: "5 من 8",
        hours: "12 ساعة",
        score: "ممتاز (92%)"
      },
      "405060": {
        name: "سارة محمود",
        books: "7 من 8",
        hours: "20 ساعة",
        score: "ممتاز جداً (98%)"
      }
    };

    // قراءة الكود المخزن من صفحة تسجيل الدخول
    const savedCode = localStorage.getItem('selectedChildCode');
    const student = database[savedCode] || {
      name: "طالب غير مسجل",
      books: "0",
      hours: "0",
      score: "لا يوجد بيانات"
    };

    // عرض البيانات المتغيرة في الصفحة
    document.getElementById('student-code').textContent = savedCode || "غير محدد";
    document.getElementById('student-name').textContent = student.name;
    document.getElementById('stat-books').textContent = student.books;
    document.getElementById('stat-hours').textContent = student.hours;
    document.getElementById('stat-score').textContent = student.score;
