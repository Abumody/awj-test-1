// التأكد من وجود طالب مسجل
const student = localStorage.getItem("currentStudent");

if (!student) {
  window.location.href = "index.html";
}

// عرض اسم الطالب
const nameBox = document.getElementById("studentName");
if (nameBox) {
  nameBox.textContent = student;
}

// تفعيل جميع الأزرار التي تحتوي data-link
document.querySelectorAll("[data-link]").forEach(element => {
  element.addEventListener("click", () => {
    const link = element.dataset.link;

    // تأثير الانتقال
    document.body.style.transition = "opacity 0.3s ease";
    document.body.style.opacity = "0";

    setTimeout(() => {
      window.location.href = link;
    }, 300);
  });
});

// تسجيل الخروج
function logout() {
  document.body.style.transition = "opacity 0.3s ease";
  document.body.style.opacity = "0";

  setTimeout(() => {
    localStorage.removeItem("currentStudent");
    window.location.href = "index.html";
  }, 300);
}
