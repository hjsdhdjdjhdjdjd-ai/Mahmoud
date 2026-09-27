  // جلب قاعدة البيانات المحدثة من الـ localStorage
  const storedData = localStorage.getItem('app_students');
  const database = storedData ? JSON.parse(storedData) : {};

  // جلب كود الابن المترسل من صفحة الدخول
  const savedCode = localStorage.getItem('selectedChildCode');

  if (database[savedCode]) {
    const student = database[savedCode];
    document.getElementById('student-name').textContent = student.name;
    document.getElementById('student-code').textContent = savedCode;
    // عرض بقية البيانات...
  } else {
    alert('لم يتم العثور على بيانات لهذا الطالب!');
  }
