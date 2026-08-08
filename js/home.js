/* ============================================
   HOME.JS - Planetary Nexus Dashboard (17 Planets)
   ============================================ */

(function() {
  'use strict';

  // ============================================
  // 17 PLANETS DATA
  // ============================================
  const planets = [
    { id: 'mercury', name: 'Mercury', icon: '☿', system: 'Solar System', color: '#b8b8b8' },
    { id: 'venus', name: 'Venus', icon: '♀', system: 'Solar System', color: '#ffcc66' },
    { id: 'earth', name: 'Earth', icon: '🌍', system: 'Solar System', color: '#4a9eff' },
    { id: 'mars', name: 'Mars', icon: '♂', system: 'Solar System', color: '#ff6b35' },
    { id: 'jupiter', name: 'Jupiter', icon: '♃', system: 'Solar System', color: '#ffb866' },
    { id: 'saturn', name: 'Saturn', icon: '♄', system: 'Solar System', color: '#f5d98a' },
    { id: 'uranus', name: 'Uranus', icon: '⛢', system: 'Solar System', color: '#6ed4ff' },
    { id: 'neptune', name: 'Neptune', icon: '♆', system: 'Solar System', color: '#4a7aff' },
    { id: 'pluto', name: 'Pluto', icon: '♇', system: 'Solar System', color: '#c4a8d4' },
    { id: 'proxima', name: 'Proxima b', icon: '🌟', system: 'Proxima Centauri', color: '#ff6b6b' },
    { id: 'kepler452', name: 'Kepler-452b', icon: '🌟', system: 'Kepler-452', color: '#4ade80' },
    { id: 'trappist', name: 'Trappist-1e', icon: '🌟', system: 'Trappist-1', color: '#60a5fa' },
    { id: 'gliese581', name: 'Gliese 581g', icon: '🌟', system: 'Gliese 581', color: '#c084fc' },
    { id: 'hd40307', name: 'HD 40307g', icon: '🌟', system: 'HD 40307', color: '#fbbf24' },
    { id: 'kepler442', name: 'Kepler-442b', icon: '🌟', system: 'Kepler-442', color: '#34d399' },
    { id: 'luyten', name: 'Luyten b', icon: '🌟', system: 'Luyten\'s Star', color: '#f472b6' },
    { id: 'teegarden', name: 'Teegarden b', icon: '🌟', system: 'Teegarden\'s Star', color: '#fbbf24' }
  ];

  // ============================================
  // DOM REFERENCES
  // ============================================
  const grid = document.getElementById('planetGrid');
  const totalExams = planets.length;

  // ============================================
  // GET COMPLETED EXAMS
  // ============================================
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

  // ============================================
  // UPDATE PROGRESS
  // ============================================
  function updateProgress() {
    const completed = getCompletedExams();
    const count = completed.length;
    document.getElementById('progressCount').textContent = count;
    document.getElementById('progressFill').style.width = (count / totalExams * 100) + '%';
  }

  // ============================================
  // BUILD PLANET CARDS
  // ============================================
  function buildPlanetCards() {
    if (!grid) return;

    planets.forEach((planet, index) => {
      const card = document.createElement('div');
      card.className = 'planet-card';
      card.id = `planet-${planet.id}`;
      
      const link = `${planet.id}/${planet.id}_Dashboard.html`;
      
      card.innerHTML = `
        <span class="planet-icon">${planet.icon}</span>
        <div class="planet-name">
          ${planet.name}
          <span class="check-mark">✓</span>
        </div>
        <div class="planet-system">${planet.system}</div>
        <div class="planet-color-bar bar-${planet.id}"></div>
        <button class="btn-enter" data-link="${link}">
          <span class="arrow">⟶</span> enter
        </button>
      `;
      
      grid.appendChild(card);
    });
  }

  // ============================================
  // UPDATE PLANET STATUS
  // ============================================
  function updatePlanetStatus() {
    const completed = getCompletedExams();
    
    // Map exam keys to planet ids
    const planetMap = {
      'exam1': 'mercury',
      'exam2': 'venus',
      'exam3': 'earth',
      'exam4': 'mars',
      'exam5': 'jupiter',
      'exam6': 'saturn',
      'exam7': 'uranus',
      'exam8': 'neptune',
      'exam9': 'pluto',
      'exam10': 'proxima',
      'exam11': 'kepler452',
      'exam12': 'trappist',
      'exam13': 'gliese581',
      'exam14': 'hd40307',
      'exam15': 'kepler442',
      'exam16': 'luyten',
      'exam17': 'teegarden'
    };
    
    completed.forEach(examKey => {
      const planetId = planetMap[examKey];
      if (planetId) {
        const card = document.getElementById(`planet-${planetId}`);
        if (card) {
          card.classList.add('completed');
        }
      }
    });
    updateProgress();
  }

  // ============================================
  // CREATE COSMIC PARTICLES
  // ============================================
  function createParticles() {
    const bg = document.getElementById('cosmicBg');
    if (!bg) return;

    for (let i = 0; i < 40; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 4 + 2;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.left = Math.random() * 100 + '%';
      p.style.animationDuration = (Math.random() * 18 + 10) + 's';
      p.style.animationDelay = (Math.random() * 10) + 's';
      p.style.opacity = Math.random() * 0.3 + 0.05;
      bg.appendChild(p);
    }

    // Rings
    const rings = [
      { w: 450, h: 450, t: '8%', l: '-8%', d: '0s' },
      { w: 650, h: 650, b: '8%', r: '-10%', d: '3s' },
      { w: 350, h: 350, t: '50%', l: '50%', d: '6s' }
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
  }

  // ============================================
  // SETUP DATA-LINK HANDLERS
  // ============================================
  function setupDataLinkHandlers() {
    document.querySelectorAll('[data-link]').forEach(el => {
      el.addEventListener('click', function(e) {
        e.stopPropagation();
        const link = this.dataset.link;
        if (!link) return;
        document.body.style.transition = 'opacity 0.3s ease';
        document.body.style.opacity = '0';
        setTimeout(() => {
          window.location.href = link;
        }, 300);
      });
    });
  }

  // ============================================
  // LOGOUT
  // ============================================
  window.logout = function() {
    document.body.style.transition = 'opacity 0.3s ease';
    document.body.style.opacity = '0';
    setTimeout(() => {
      localStorage.removeItem('currentStudent');
      window.location.href = 'index.html';
    }, 300);
  };

  // ============================================
  // STUDENT CHECK
  // ============================================
  function checkStudent() {
    const student = localStorage.getItem('currentStudent');
    const nameBox = document.getElementById('studentName');
    if (!student) {
      window.location.href = 'index.html';
    } else if (nameBox) {
      nameBox.textContent = student;
    }
  }

  // ============================================
  // INIT
  // ============================================
  function init() {
    checkStudent();
    createParticles();
    buildPlanetCards();
    updatePlanetStatus();
    setupDataLinkHandlers();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();