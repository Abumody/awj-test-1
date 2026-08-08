// ============================================
// STORAGE.JS - AWJ Exam Nexus
// Handles login, student data, and cosmic effects
// ============================================

// ---------- ENTER PLATFORM ----------
function enterPlatform() {
  const nameInput = document.getElementById("studentName");
  const name = nameInput.value.trim();

  if (!name) {
    // Shake animation for empty input
    nameInput.style.borderColor = "rgba(255, 0, 100, 0.4)";
    nameInput.style.boxShadow = "0 0 40px rgba(255, 0, 100, 0.1)";
    nameInput.style.animation = "shake 0.4s ease";
    setTimeout(() => {
      nameInput.style.borderColor = "rgba(0, 255, 255, 0.1)";
      nameInput.style.boxShadow = "none";
      nameInput.style.animation = "";
    }, 500);
    return;
  }

  // Save current student
  localStorage.setItem("currentStudent", name);

  // Initialize or update student data
  let students = JSON.parse(localStorage.getItem("students")) || {};

  if (!students[name]) {
    students[name] = {
      createdAt: new Date().toISOString(),
      tests: {}
    };
    localStorage.setItem("students", JSON.stringify(students));
  }

  // Portal transition effect
  document.body.style.transition = "opacity 0.4s ease";
  document.body.style.opacity = "0";

  setTimeout(() => {
    window.location.href = "home.html";
  }, 500);
}

// ---------- SHAKE ANIMATION ----------
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-6px); }
    20%, 40%, 60%, 80% { transform: translateX(6px); }
  }
`;
document.head.appendChild(style);

// ---------- COSMIC BACKGROUND PARTICLES ----------
document.addEventListener('DOMContentLoaded', function() {
  const bg = document.getElementById('cosmicBg');
  if (!bg) return;

  // Floating particles
  for (let i = 0; i < 35; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 2;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (Math.random() * 15 + 10) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    p.style.opacity = Math.random() * 0.3 + 0.05;
    bg.appendChild(p);
  }

  // Floating rings
  const rings = [
    { w: 300, h: 300, t: '10%', l: '-5%', d: '0s' },
    { w: 500, h: 500, b: '10%', r: '-8%', d: '2s' },
    { w: 200, h: 200, t: '50%', l: '50%', d: '4s' }
  ];

  rings.forEach((r) => {
    const ring = document.createElement('div');
    ring.className = 'ring';
    ring.style.width = r.w + 'px';
    ring.style.height = r.h + 'px';
    if (r.t) ring.style.top = r.t;
    if (r.l) ring.style.left = r.l;
    if (r.b) ring.style.bottom = r.b;
    if (r.r) ring.style.right = r.r;
    ring.style.animationDelay = r.d;
    bg.appendChild(ring);
  });
});

// ---------- HELPER FUNCTIONS FOR EXAMS ----------
// Call this function from exam pages to mark completion
function completeExam(examNumber) {
  const student = localStorage.getItem('currentStudent');
  if (!student) return false;
  
  const students = JSON.parse(localStorage.getItem('students')) || {};
  if (!students[student]) {
    students[student] = { createdAt: new Date().toISOString(), tests: {} };
  }
  
  if (!students[student].tests) {
    students[student].tests = {};
  }
  
  students[student].tests[`exam${examNumber}`] = { 
    completed: true,
    completedAt: new Date().toISOString()
  };
  
  localStorage.setItem('students', JSON.stringify(students));
  return true;
}

// Get completed exams for the current student
function getCompletedExams() {
  const student = localStorage.getItem('currentStudent');
  if (!student) return [];
  
  const students = JSON.parse(localStorage.getItem('students')) || {};
  const studentData = students[student];
  if (!studentData || !studentData.tests) return [];
  
  return Object.keys(studentData.tests).filter(key => 
    studentData.tests[key] && studentData.tests[key].completed
  );
}

// Check if a specific exam is completed
function isExamCompleted(examNumber) {
  const completed = getCompletedExams();
  return completed.includes(`exam${examNumber}`);
}

// Get exam progress (number completed out of total)
function getExamProgress(totalExams = 17) {
  const completed = getCompletedExams();
  return {
    completed: completed.length,
    total: totalExams,
    percentage: Math.round((completed.length / totalExams) * 100)
  };
}