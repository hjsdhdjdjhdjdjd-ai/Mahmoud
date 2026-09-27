// التبديل بين نموذج الطالب وولي الأمر
function selectRole(role) {
  const studentForm = document.getElementById('student-form');
  const parentForm = document.getElementById('parent-form');
  const buttons = document.querySelectorAll('.role-btn');

  if (role === 'student') {
    studentForm.classList.remove('hidden');
    parentForm.classList.add('hidden');
    buttons[0].classList.add('active');
    buttons[1].classList.remove('active');
  } else {
    parentForm.classList.remove('hidden');
    studentForm.classList.add('hidden');
    buttons[1].classList.add('active');
    buttons[0].classList.remove('active');
  }
}

// حفظ كود الطالب عند ضغط ولي الأمر على دخول والتوجيه لصفحة المتابعة
document.getElementById('parent-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const childCode = document.getElementById('child-id').value;
  localStorage.setItem('selectedChildCode', childCode);
  
  window.location.href = 'parent-dashboard.html';
});