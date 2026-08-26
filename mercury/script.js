/* ============================================
   SCRIPT.JS - Exam 1 Dashboard
   ============================================ */

(function() {
  'use strict';

  // ============================================
  // STUDENT CHECK
  // ============================================
  const student = localStorage.getItem('currentStudent');
  const nameBox = document.getElementById('studentName');
  if (!student) {
    window.location.href = '../index.html';
  } else if (nameBox) {
    nameBox.textContent = student;
  }

  // ============================================
  // SCORE MANAGEMENT
  // ============================================
  const SECTION_KEYS = [
    'listening1', 'listening2', 'grammar', 'vocabulary', 'grammarVocab', 'reading1', 'reading2', 'reading3', 'writing1', 'writing2'
  ];

  const MAX_SCORES = {
    listening1: 7,
    listening2: 8,
    grammar: 5,
    vocabulary: 5,
    grammarVocab: 5,
    reading1: 7,
    reading2: 8,
    reading3: 10,
    writing1: 10,
    writing2: 10
  };

  function getScores() {
    const student = localStorage.getItem('currentStudent');
    if (!student) return {};
    const students = JSON.parse(localStorage.getItem('students')) || {};
    const studentData = students[student];
    if (!studentData || !studentData.tests) return {};
    return studentData.tests['exam1'] || {};
  }

  function saveScores(scores) {
    const student = localStorage.getItem('currentStudent');
    if (!student) return;
    const students = JSON.parse(localStorage.getItem('students')) || {};
    if (!students[student]) {
      students[student] = { createdAt: new Date().toISOString(), tests: {} };
    }
    if (!students[student].tests) {
      students[student].tests = {};
    }
    students[student].tests['exam1'] = scores;
    localStorage.setItem('students', JSON.stringify(students));
  }

  function updateUI() {
    const scores = getScores();
    let total = 0;
    let totalMax = 0;

    SECTION_KEYS.forEach(key => {
      const score = scores[key] || null;
      const maxScore = MAX_SCORES[key] || 100;
      totalMax += maxScore;

      const scoreElement = document.getElementById(key + 'Score');
      if (scoreElement) {
        if (score !== null && score !== undefined) {
          scoreElement.textContent = score + '/' + maxScore;
          scoreElement.className = 'score-value completed';
          total += score;
        } else {
          scoreElement.textContent = '—';
          scoreElement.className = 'score-value pending';
        }
      }

      const resultElement = document.getElementById('r' + key.charAt(0).toUpperCase() + key.slice(1));
      if (resultElement) {
        if (score !== null && score !== undefined) {
          resultElement.textContent = score + '/' + maxScore;
          resultElement.className = 'result-score';
        } else {
          resultElement.textContent = '—';
          resultElement.className = 'result-score pending';
        }
      }
    });

    document.getElementById('overallScore').textContent = total;
    document.getElementById('totalScore').textContent = total + ' / ' + totalMax;

    const allCompleted = SECTION_KEYS.every(key => scores[key] !== null && scores[key] !== undefined);
    if (allCompleted && total > 0) {
      const students = JSON.parse(localStorage.getItem('students')) || {};
      if (students[student]) {
        if (!students[student].tests) students[student].tests = {};
        students[student].tests['exam1_completed'] = true;
        students[student].tests['exam1_completedAt'] =
          students[student].tests['exam1_completedAt'] || new Date().toISOString();
        localStorage.setItem('students', JSON.stringify(students));
      }
    }
  }

  // ============================================
  // CREATE STARS
  // ============================================
  function createStars() {
    const container = document.getElementById('starContainer');
    const starCount = 200;
    
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      
      const size = Math.random() * 3 + 1;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = Math.random() * 4 + 2;
      const minOpacity = Math.random() * 0.2 + 0.1;
      const maxOpacity = Math.random() * 0.6 + 0.4;
      
      star.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x}%;
        top: ${y}%;
        --duration: ${duration}s;
        --min-opacity: ${minOpacity};
        --max-opacity: ${maxOpacity};
        animation-delay: ${Math.random() * 4}s;
      `;
      
      container.appendChild(star);
    }
  }

  // ============================================
  // CREATE SHOOTING STARS
  // ============================================
  function createShootingStar() {
    const container = document.getElementById('starContainer');
    const star = document.createElement('div');
    star.className = 'shooting-star';
    
    const x = Math.random() * 80 + 10;
    const y = Math.random() * 40 + 5;
    const angle = Math.random() * 60 + 20;
    const duration = Math.random() * 2 + 1.5;
    
    star.style.cssText = `
      left: ${x}%;
      top: ${y}%;
      transform: rotate(${angle}deg);
      animation-duration: ${duration}s;
    `;
    
    container.appendChild(star);
    
    setTimeout(() => {
      star.remove();
    }, duration * 1000);
  }

  function startShootingStars() {
    for (let i = 0; i < 3; i++) {
      setTimeout(() => createShootingStar(), i * 1000);
    }
    
    setInterval(() => {
      if (Math.random() < 0.3) {
        createShootingStar();
        if (Math.random() < 0.3) {
          setTimeout(createShootingStar, 500);
        }
      }
    }, 4000);
  }

  // ============================================
  // MOUSE PARALLAX
  // ============================================
  document.addEventListener('mousemove', function(e) {
    const holes = document.querySelectorAll('.black-hole');
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    
    holes.forEach((hole, index) => {
      const speed = (index + 1) * 0.5;
      hole.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
  });

  // ============================================
  // DATA-LINK HANDLER
  // ============================================
  document.querySelectorAll('[data-link]').forEach(el => {
    el.addEventListener('click', function(e) {
      const link = this.dataset.link;
      if (!link) return;
      document.body.style.transition = 'opacity 0.4s ease';
      document.body.style.opacity = '0';
      setTimeout(() => {
        window.location.href = link;
      }, 400);
    });
  });

  // ============================================
  // NAVIGATION
  // ============================================
  window.goHome = function() {
    document.body.style.transition = 'opacity 0.4s ease';
    document.body.style.opacity = '0';
    setTimeout(() => {
      window.location.href = '../home.html';
    }, 400);
  };

  window.logout = function() {
    document.body.style.transition = 'opacity 0.4s ease';
    document.body.style.opacity = '0';
    setTimeout(() => {
      localStorage.removeItem('currentStudent');
      window.location.href = '../index.html';
    }, 400);
  };

  // ============================================
  // EXPOSE FOR EXAM PAGES
  // ============================================
  window.saveSectionScore = function(sectionKey, score) {
    const scores = getScores();
    scores[sectionKey] = score;
    saveScores(scores);
    updateUI();
  };

  // ============================================
  // INIT
  // ============================================
  createStars();
  startShootingStars();
  updateUI();

})();