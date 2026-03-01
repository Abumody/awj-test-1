function enterPlatform() {
  const name = document.getElementById("studentName").value.trim();

  if (!name) {
    alert("Please enter your full name.");
    return;
  }

  localStorage.setItem("currentStudent", name);

  let students = JSON.parse(localStorage.getItem("students")) || {};

  if (!students[name]) {
    students[name] = {
      createdAt: new Date().toISOString(),
      tests: {}
    };
    localStorage.setItem("students", JSON.stringify(students));
  }

  window.location.href = "home.html"; 
}
