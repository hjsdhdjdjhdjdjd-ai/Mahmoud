// دالة لجلب كل الطلاب المخزنين أو إنشاء قائمة افتراضية لو مفيش
function getStoredStudents() {
  const data = localStorage.getItem('app_students');
  return data ? JSON.parse(data) : {
    "102030": { name: "أحمد محمود", pass: "123456", books: "5 من 8", hours: "12 ساعة", score: "ممتاز (92%)" },
    "405060": { name: "سارة محمود", pass: "123456", books: "7 من 8", hours: "20 ساعة", score: "ممتاز جداً (98%)" }
  };
}

// التبديل بين نموذج الطالب وولي الأمر
function selectRole(role) {
  const studentForm = document.getElementById('student-form');
  const parentForm = document.getElementById('parent-form');
  const buttons = document.querySelectorAll('.role-btn');

  buttons.forEach(btn => btn.classList.remove('active'));

  if (role === 'student') {
    studentForm.classList.remove('hidden');
    parentForm.classList.add('hidden');
    buttons[0].classList.add('active');
  } else {
    parentForm.classList.remove('hidden');
    studentForm.classList.add('hidden');
    buttons[1].classList.add('active');
  }
}

// عناصر واجهة المستخدم الخاصة بالطالب
const studentIdInput = document.getElementById('student-id');
const nameGroup = document.getElementById('student-name-group');
const studentNameInput = document.getElementById('student-name');
const studentMsg = document.getElementById('student-msg');
const studentSubmitBtn = document.getElementById('student-submit-btn');

// فحص الكود أثناء الكتابة للتعرف على نوع المستخدم (قديم أم جديد)
if (studentIdInput) {
  studentIdInput.addEventListener('input', function() {
    const code = this.value.trim();
    const students = getStoredStudents();

    if (code.length > 0) {
      if (students[code]) {
        // مستخدم قديم
        if (nameGroup) nameGroup.style.display = 'none';
        if (studentNameInput) studentNameInput.removeAttribute('required');
        if (studentMsg) {
          studentMsg.style.display = 'block';
          studentMsg.style.color = '#28a745';
          studentMsg.textContent = `مرحباً بعودتك يا ${students[code].name}! أدخل كلمة المرور للدخول.`;
        }
        if (studentSubmitBtn) studentSubmitBtn.textContent = 'تسجيل الدخول';
      } else {
        // مستخدم جديد
        if (nameGroup) nameGroup.style.display = 'block';
        if (studentNameInput) studentNameInput.setAttribute('required', 'true');
        if (studentMsg) {
          studentMsg.style.display = 'block';
          studentMsg.style.color = '#007bff';
          studentMsg.textContent = 'كود جديد! يرجى كتابة اسمك الرباعي وإنشاء كلمة مرور للحساب.';
        }
        if (studentSubmitBtn) studentSubmitBtn.textContent = 'إنشاء حساب ودخول';
      }
    } else {
      if (nameGroup) nameGroup.style.display = 'none';
      if (studentMsg) studentMsg.style.display = 'none';
      if (studentSubmitBtn) studentSubmitBtn.textContent = 'دخول الطالب';
    }
  });
}

// معالجة نموذج الطالب عند إرسال البيانات
document.getElementById('student-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const code = studentIdInput.value.trim();
  const pass = document.getElementById('student-pass').value.trim();
  const students = getStoredStudents();

  if (students[code]) {
    // التحقق للمستخدم القديم
    if (students[code].pass && students[code].pass !== pass) {
      if (studentMsg) {
        studentMsg.style.display = 'block';
        studentMsg.style.color = 'red';
        studentMsg.textContent = 'كلمة المرور غير صحيحة!';
      }
      return;
    }

    localStorage.setItem('currentUserCode', code);
    window.location.href = 'index.html';
  } else {
    // إنشاء حساب جديد
    const name = studentNameInput ? studentNameInput.value.trim() : "طالب جديد";

    students[code] = {
      name: name,
      pass: pass,
      books: "0 من 8",
      hours: "0 ساعة",
      score: "طالب جديد"
    };

    localStorage.setItem('app_students', JSON.stringify(students));
    localStorage.setItem('currentUserCode', code);

    window.location.href = 'index.html';
  }
});

// حفظ كود الطالب المطلوب متابعته عند دخول ولي الأمر
document.getElementById('parent-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const childCode = document.getElementById('child-id').value.trim();
  const parentMsg = document.getElementById('parent-msg');
  const students = getStoredStudents();

  if (students[childCode]) {
    localStorage.setItem('selectedChildCode', childCode);
    window.location.href = 'parent-dashboard.html';
  } else {
    if (parentMsg) {
      parentMsg.style.display = 'block';
      parentMsg.textContent = 'كود الطالب غير موجود بالنظام، يرجى التأكد منه!';
    } else {
      alert('كود الطالب غير موجود بالنظام، يرجى التأكد منه!');
    }
  }
});