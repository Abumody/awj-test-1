/* ============================================
   SCRIPT.JS - Exam Dashboard Creator (17 Planets)
   ============================================ */

// ============================================
// 17 PLANETS & EXOPLANETS DATA
// ============================================
const planets = [
  // ===== SOLAR SYSTEM =====
  {
    id: 'mercury',
    name: 'Mercury',
    icon: '☿',
    system: 'Solar System',
    color: '#b8b8b8',
    bgColor: 'rgba(180, 180, 180, 0.25)',
    borderColor: 'rgba(180, 180, 180, 0.2)',
    hoverColor: 'rgba(180, 180, 180, 0.4)',
    desc: 'The Swift Planet',
    buttonGrad: 'linear-gradient(135deg, #8a8a8a, #b8b8b8)'
  },
  {
    id: 'venus',
    name: 'Venus',
    icon: '♀',
    system: 'Solar System',
    color: '#ffcc66',
    bgColor: 'rgba(255, 200, 100, 0.25)',
    borderColor: 'rgba(255, 200, 100, 0.2)',
    hoverColor: 'rgba(255, 200, 100, 0.4)',
    desc: 'The Evening Star',
    buttonGrad: 'linear-gradient(135deg, #e8a040, #ffcc66)'
  },
  {
    id: 'earth',
    name: 'Earth',
    icon: '🌍',
    system: 'Solar System',
    color: '#4a9eff',
    bgColor: 'rgba(60, 180, 255, 0.25)',
    borderColor: 'rgba(60, 180, 255, 0.2)',
    hoverColor: 'rgba(60, 180, 255, 0.4)',
    desc: 'The Blue Marble',
    buttonGrad: 'linear-gradient(135deg, #2ecc71, #4a9eff)'
  },
  {
    id: 'mars',
    name: 'Mars',
    icon: '♂',
    system: 'Solar System',
    color: '#ff6b35',
    bgColor: 'rgba(255, 80, 40, 0.25)',
    borderColor: 'rgba(255, 80, 40, 0.2)',
    hoverColor: 'rgba(255, 80, 40, 0.4)',
    desc: 'The Red Planet',
    buttonGrad: 'linear-gradient(135deg, #e84a1a, #ff6b35)'
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    icon: '♃',
    system: 'Solar System',
    color: '#ffb866',
    bgColor: 'rgba(255, 180, 80, 0.25)',
    borderColor: 'rgba(255, 180, 80, 0.2)',
    hoverColor: 'rgba(255, 180, 80, 0.4)',
    desc: 'The Gas Giant',
    buttonGrad: 'linear-gradient(135deg, #d4874a, #ffb866)'
  },
  {
    id: 'saturn',
    name: 'Saturn',
    icon: '♄',
    system: 'Solar System',
    color: '#f5d98a',
    bgColor: 'rgba(255, 220, 150, 0.25)',
    borderColor: 'rgba(255, 220, 150, 0.2)',
    hoverColor: 'rgba(255, 220, 150, 0.4)',
    desc: 'The Ringed Planet',
    buttonGrad: 'linear-gradient(135deg, #c4a86a, #f5d98a)'
  },
  {
    id: 'uranus',
    name: 'Uranus',
    icon: '⛢',
    system: 'Solar System',
    color: '#6ed4ff',
    bgColor: 'rgba(100, 220, 255, 0.25)',
    borderColor: 'rgba(100, 220, 255, 0.2)',
    hoverColor: 'rgba(100, 220, 255, 0.4)',
    desc: 'The Ice Giant',
    buttonGrad: 'linear-gradient(135deg, #3ab0d4, #6ed4ff)'
  },
  {
    id: 'neptune',
    name: 'Neptune',
    icon: '♆',
    system: 'Solar System',
    color: '#4a7aff',
    bgColor: 'rgba(50, 100, 255, 0.25)',
    borderColor: 'rgba(50, 100, 255, 0.2)',
    hoverColor: 'rgba(50, 100, 255, 0.4)',
    desc: 'The Blue Giant',
    buttonGrad: 'linear-gradient(135deg, #1a4ab0, #4a7aff)'
  },
  {
    id: 'pluto',
    name: 'Pluto',
    icon: '♇',
    system: 'Solar System',
    color: '#c4a8d4',
    bgColor: 'rgba(180, 150, 220, 0.25)',
    borderColor: 'rgba(180, 150, 220, 0.2)',
    hoverColor: 'rgba(180, 150, 220, 0.4)',
    desc: 'The Dwarf Planet',
    buttonGrad: 'linear-gradient(135deg, #8a6a9a, #c4a8d4)'
  },

  // ===== EXOPLANETS =====
  {
    id: 'proxima-b',
    name: 'Proxima b',
    icon: '🌟',
    system: 'Proxima Centauri',
    color: '#ff6b6b',
    bgColor: 'rgba(255, 80, 80, 0.25)',
    borderColor: 'rgba(255, 80, 80, 0.2)',
    hoverColor: 'rgba(255, 80, 80, 0.4)',
    desc: 'Closest Exoplanet',
    buttonGrad: 'linear-gradient(135deg, #e84a4a, #ff6b6b)'
  },
  {
    id: 'kepler-452b',
    name: 'Kepler-452b',
    icon: '🌟',
    system: 'Kepler-452',
    color: '#4ade80',
    bgColor: 'rgba(74, 222, 128, 0.25)',
    borderColor: 'rgba(74, 222, 128, 0.2)',
    hoverColor: 'rgba(74, 222, 128, 0.4)',
    desc: 'Earth\'s Cousin',
    buttonGrad: 'linear-gradient(135deg, #22c55e, #4ade80)'
  },
  {
    id: 'trappist-1e',
    name: 'Trappist-1e',
    icon: '🌟',
    system: 'Trappist-1',
    color: '#60a5fa',
    bgColor: 'rgba(96, 165, 250, 0.25)',
    borderColor: 'rgba(96, 165, 250, 0.2)',
    hoverColor: 'rgba(96, 165, 250, 0.4)',
    desc: 'Seven Earth-sized',
    buttonGrad: 'linear-gradient(135deg, #3b82f6, #60a5fa)'
  },
  {
    id: 'gliese-581g',
    name: 'Gliese 581g',
    icon: '🌟',
    system: 'Gliese 581',
    color: '#c084fc',
    bgColor: 'rgba(192, 132, 252, 0.25)',
    borderColor: 'rgba(192, 132, 252, 0.2)',
    hoverColor: 'rgba(192, 132, 252, 0.4)',
    desc: 'The Goldilocks Zone',
    buttonGrad: 'linear-gradient(135deg, #8b5cf6, #c084fc)'
  },
  {
    id: 'hd-40307g',
    name: 'HD 40307g',
    icon: '🌟',
    system: 'HD 40307',
    color: '#fbbf24',
    bgColor: 'rgba(251, 191, 36, 0.25)',
    borderColor: 'rgba(251, 191, 36, 0.2)',
    hoverColor: 'rgba(251, 191, 36, 0.4)',
    desc: 'Super-Earth',
    buttonGrad: 'linear-gradient(135deg, #f59e0b, #fbbf24)'
  },
  {
    id: 'kepler-442b',
    name: 'Kepler-442b',
    icon: '🌟',
    system: 'Kepler-442',
    color: '#34d399',
    bgColor: 'rgba(52, 211, 153, 0.25)',
    borderColor: 'rgba(52, 211, 153, 0.2)',
    hoverColor: 'rgba(52, 211, 153, 0.4)',
    desc: 'Most Habitable',
    buttonGrad: 'linear-gradient(135deg, #10b981, #34d399)'
  },
  {
    id: 'luyten-b',
    name: 'Luyten b',
    icon: '🌟',
    system: 'Luyten\'s Star',
    color: '#f472b6',
    bgColor: 'rgba(244, 114, 182, 0.25)',
    borderColor: 'rgba(244, 114, 182, 0.2)',
    hoverColor: 'rgba(244, 114, 182, 0.4)',
    desc: 'Nearby Exoplanet',
    buttonGrad: 'linear-gradient(135deg, #ec4899, #f472b6)'
  },
  {
    id: 'teegarden-b',
    name: 'Teegarden b',
    icon: '🌟',
    system: 'Teegarden\'s Star',
    color: '#fbbf24',
    bgColor: 'rgba(251, 191, 36, 0.25)',
    borderColor: 'rgba(251, 191, 36, 0.2)',
    hoverColor: 'rgba(251, 191, 36, 0.4)',
    desc: 'Earth-like World',
    buttonGrad: 'linear-gradient(135deg, #f59e0b, #fbbf24)'
  }
];

// ============================================
// CREATE PLANET CARDS
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  const grid = document.getElementById('planetGrid');
  
  if (!grid) {
    console.error('Planet grid not found!');
    return;
  }

  planets.forEach(planet => {
    const card = document.createElement('div');
    card.className = `planet-card ${planet.id}`;
    card.innerHTML = `
      <span class="planet-icon">${planet.icon}</span>
      <div class="planet-name">${planet.name}</div>
      <div class="planet-system">${planet.system}</div>
      <div class="planet-desc">${planet.desc}</div>
      <div class="planet-color" style="background: ${planet.color};"></div>
    `;
    card.addEventListener('click', function() {
      generateDashboard(planet);
    });
    grid.appendChild(card);
  });

  // ============================================
  // CREATE STARS FOR BACKGROUND
  // ============================================
  function createBackgroundStars() {
    const container = document.getElementById('starContainer');
    if (!container) return;
    for (let i = 0; i < 100; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      const size = Math.random() * 2 + 1;
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
  createBackgroundStars();
});

// ============================================
// GENERATE DASHBOARD
// ============================================
function generateDashboard(planet) {
  const outputSection = document.getElementById('outputSection');
  if (!outputSection) {
    console.error('Output section not found!');
    return;
  }
  
  outputSection.style.display = 'block';

  const outputName = document.getElementById('outputPlanetName');
  if (outputName) {
    outputName.textContent = `${planet.name} Dashboard`;
  }

  const code = generateHTML(planet);
  const outputCode = document.getElementById('outputCode');
  if (outputCode) {
    outputCode.textContent = code;
  }

  // Smooth scroll to output
  outputSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ============================================
// GENERATE HTML CODE
// ============================================
function generateHTML(planet) {
  const planetName = planet.name;
  const planetId = planet.id;
  const icon = planet.icon;
  const color = planet.color;
  const bgColor = planet.bgColor;
  const borderColor = planet.borderColor;
  const hoverColor = planet.hoverColor;
  const buttonGrad = planet.buttonGrad;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AWJ · ${planetName} Exam</title>
  <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Inter', 'Segoe UI', sans-serif;
      color: #ffffff;
      min-height: 100vh;
      padding: 20px 28px 50px;
      position: relative;
      overflow-x: hidden;
      transition: opacity 0.3s ease;
      background: #050510;
    }

    .cosmic-bg {
      position: fixed;
      inset: 0;
      z-index: 0;
      background: 
        radial-gradient(ellipse at 20% 30%, #0a0a2e, transparent 60%),
        radial-gradient(ellipse at 80% 70%, #0e0518, transparent 50%),
        radial-gradient(ellipse at 50% 50%, #050510, #000000 100%);
      overflow: hidden;
    }

    .nebula {
      position: absolute;
      border-radius: 50%;
      filter: blur(120px);
      pointer-events: none;
      animation: nebulaFloat 30s ease-in-out infinite alternate;
    }

    .nebula-1 {
      width: 600px;
      height: 600px;
      background: rgba(100, 50, 200, 0.06);
      top: -200px;
      right: -100px;
      animation-duration: 35s;
    }

    .nebula-2 {
      width: 500px;
      height: 500px;
      background: rgba(50, 100, 200, 0.05);
      bottom: -150px;
      left: -100px;
      animation-duration: 40s;
      animation-delay: 5s;
    }

    .nebula-3 {
      width: 400px;
      height: 400px;
      background: rgba(200, 50, 150, 0.04);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      animation-duration: 45s;
      animation-delay: 10s;
    }

    @keyframes nebulaFloat {
      0% { transform: translate(0, 0) scale(1); }
      33% { transform: translate(60px, -40px) scale(1.1); }
      66% { transform: translate(-40px, 60px) scale(0.9); }
      100% { transform: translate(40px, -30px) scale(1.05); }
    }

    .star {
      position: absolute;
      border-radius: 50%;
      pointer-events: none;
      background: #ffffff;
      animation: twinkle var(--duration) ease-in-out infinite alternate;
    }

    @keyframes twinkle {
      0%, 100% { opacity: var(--min-opacity); transform: scale(1); }
      50% { opacity: var(--max-opacity); transform: scale(1.3); }
    }

    .container {
      max-width: 1100px;
      margin: 0 auto;
      position: relative;
      z-index: 5;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .container > * {
      width: 100%;
      max-width: 1000px;
    }

    .top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 14px 32px;
      background: rgba(5, 5, 20, 0.6);
      backdrop-filter: blur(30px);
      border-radius: 60px;
      border: 1px solid rgba(255, 255, 255, 0.04);
      box-shadow: 0 8px 40px rgba(0, 0, 0, 0.5);
      position: relative;
      z-index: 10;
      margin-bottom: 30px;
      width: 100%;
      max-width: 1000px;
    }

    .brand {
      font-family: 'Orbitron', monospace;
      font-size: 24px;
      font-weight: 900;
      letter-spacing: 2px;
      display: flex;
      align-items: center;
      gap: 14px;
      color: #ffffff;
    }

    .brand .logo-icon {
      width: 40px;
      height: 40px;
      border: 2px solid rgba(100, 200, 255, 0.15);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      background: rgba(100, 200, 255, 0.03);
      color: #64c8ff;
    }

    .brand .glow {
      background: linear-gradient(135deg, #64c8ff, #a78bfa);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    .student-area {
      display: flex;
      align-items: center;
      gap: 18px;
    }

    .student-greeting {
      padding: 8px 24px;
      border-radius: 40px;
      border: 1px solid rgba(255, 255, 255, 0.04);
      background: rgba(255, 255, 255, 0.02);
      font-weight: 500;
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.6);
      font-family: 'Orbitron', monospace;
      letter-spacing: 0.5px;
    }

    .student-greeting .highlight {
      background: linear-gradient(135deg, #64c8ff, #a78bfa);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      font-weight: 700;
    }

    .back-btn {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.04);
      color: rgba(255, 255, 255, 0.7);
      padding: 8px 24px;
      border-radius: 40px;
      font-weight: 600;
      font-size: 0.85rem;
      cursor: pointer;
      transition: all 0.3s ease;
      font-family: 'Orbitron', monospace;
      letter-spacing: 0.5px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .back-btn:hover {
      background: rgba(100, 200, 255, 0.05);
      border-color: rgba(100, 200, 255, 0.1);
      transform: scale(1.04);
    }

    .logout-btn {
      background: rgba(255, 50, 100, 0.03);
      border: 1px solid rgba(255, 50, 100, 0.06);
      color: #ff6b8a;
      padding: 8px 24px;
      border-radius: 40px;
      font-weight: 600;
      font-size: 0.85rem;
      cursor: pointer;
      transition: all 0.3s ease;
      font-family: 'Orbitron', monospace;
      letter-spacing: 0.5px;
    }

    .logout-btn:hover {
      background: rgba(255, 50, 100, 0.06);
      border-color: rgba(255, 50, 100, 0.1);
      color: #ff8aa0;
      transform: scale(1.04);
    }

    .hero {
      margin-bottom: 30px;
      padding: 30px 0 20px;
      position: relative;
      text-align: center;
      width: 100%;
      max-width: 1000px;
    }

    .hero-content {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .hero .exam-badge {
      font-family: 'Orbitron', monospace;
      font-size: 0.7rem;
      letter-spacing: 3px;
      color: '${color}';
      padding: 6px 24px;
      border: 1px solid ${borderColor};
      border-radius: 40px;
      display: inline-block;
      margin-bottom: 10px;
      background: ${bgColor};
    }

    .hero h1 {
      font-family: 'Orbitron', monospace;
      font-size: 3.2rem;
      font-weight: 900;
      letter-spacing: 4px;
      margin-bottom: 6px;
      background: linear-gradient(135deg, #ffffff 0%, '${color}' 100%);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    .hero .subtitle {
      color: rgba(255, 255, 255, 0.3);
      font-size: 1.05rem;
      letter-spacing: 2px;
      font-weight: 300;
      margin-bottom: 16px;
    }

    .hero-score {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 12px 28px;
      background: rgba(5, 5, 20, 0.4);
      border-radius: 60px;
      border: 1px solid ${borderColor};
      backdrop-filter: blur(20px);
    }

    .hero-score .overall-score {
      font-family: 'Orbitron', monospace;
      font-size: 0.7rem;
      color: rgba(255, 255, 255, 0.2);
      letter-spacing: 2px;
    }

    .hero-score .score-number {
      font-family: 'Orbitron', monospace;
      font-size: 2.2rem;
      font-weight: 900;
      color: '${color}';
      line-height: 1;
    }

    .hero-score .score-label {
      font-size: 0.7rem;
      color: rgba(255, 255, 255, 0.15);
      letter-spacing: 2px;
      font-weight: 300;
    }

    .section-title {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 18px;
      margin: 35px 0 24px;
      font-family: 'Orbitron', monospace;
      font-size: 1.1rem;
      font-weight: 700;
      color: rgba(255, 255, 255, 0.5);
      letter-spacing: 3px;
      text-transform: uppercase;
      width: 100%;
      max-width: 1000px;
    }

    .section-title .neon-line {
      flex: 1;
      max-width: 120px;
      height: 1px;
      background: linear-gradient(90deg, ${borderColor}, transparent);
    }

    .section-title .neon-line:first-of-type {
      background: linear-gradient(270deg, ${borderColor}, transparent);
    }

    .section-title .dimension-icon {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid ${borderColor};
      border-radius: 12px;
      background: ${bgColor};
      color: '${color}';
      font-size: 1.2rem;
      flex-shrink: 0;
    }

    .section-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 20px;
      margin-bottom: 10px;
      width: 100%;
      max-width: 1000px;
    }

    .section-card {
      background: ${bgColor};
      backdrop-filter: blur(30px);
      border-radius: 20px;
      padding: 24px 20px 20px;
      border: 1px solid ${borderColor};
      box-shadow: 0 8px 40px rgba(0, 0, 0, 0.3);
      transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
      position: relative;
      overflow: hidden;
    }

    .section-card::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, ${bgColor}, transparent);
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.5s ease;
    }

    .section-card:hover::before {
      opacity: 1;
    }

    .section-card::after {
      content: '';
      position: absolute;
      top: -50%;
      right: -50%;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle, ${bgColor}, transparent 70%);
      pointer-events: none;
      border-radius: 50%;
      transition: all 0.8s ease;
    }

    .section-card:hover::after {
      transform: scale(1.5);
    }

    .section-card:hover {
      transform: translateY(-8px) scale(1.01);
      border-color: ${hoverColor};
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
    }

    .section-card .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
    }

    .section-card .card-header h3 {
      font-family: 'Orbitron', monospace;
      font-size: 0.9rem;
      font-weight: 700;
      letter-spacing: 1px;
      color: '${color}';
    }

    .section-card .card-header .section-icon {
      font-size: 1.4rem;
      opacity: 0.3;
      transition: opacity 0.3s ease;
    }

    .section-card:hover .card-header .section-icon {
      opacity: 0.6;
    }

    .section-card .card-desc {
      color: rgba(255, 255, 255, 0.4);
      font-size: 0.8rem;
      margin-bottom: 14px;
      font-weight: 300;
    }

    .section-card .score-display {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 14px;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 12px;
      border: 1px solid ${borderColor};
      margin-bottom: 14px;
    }

    .section-card .score-display .score-label {
      font-size: 0.7rem;
      color: rgba(255, 255, 255, 0.15);
      letter-spacing: 1px;
      text-transform: uppercase;
      font-weight: 300;
    }

    .section-card .score-display .score-value {
      font-family: 'Orbitron', monospace;
      font-size: 1.4rem;
      font-weight: 700;
      color: '${color}';
    }

    .section-card .score-display .score-value.completed {
      color: #4ade80;
    }

    .section-card .score-display .score-value.pending {
      color: rgba(255, 255, 255, 0.15);
    }

    .section-card .btn-start {
      width: 100%;
      padding: 12px 16px;
      border: none;
      border-radius: 40px;
      font-family: 'Orbitron', monospace;
      font-weight: 700;
      font-size: 0.65rem;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #fff;
      cursor: pointer;
      transition: all 0.4s ease;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      background: ${buttonGrad};
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    }

    .section-card .btn-start .arrow {
      display: inline-block;
      transition: transform 0.4s ease;
    }

    .section-card .btn-start:hover {
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
    }

    .section-card .btn-start:hover .arrow {
      transform: translateX(8px) scale(1.2);
    }

    .results-section {
      margin-top: 40px;
      padding: 28px 32px;
      background: rgba(5, 5, 20, 0.3);
      backdrop-filter: blur(30px);
      border-radius: 24px;
      border: 1px solid ${borderColor};
      box-shadow: 0 8px 40px rgba(0, 0, 0, 0.3);
      width: 100%;
      max-width: 1000px;
    }

    .results-section .results-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
      margin-bottom: 16px;
    }

    .results-section .results-header h2 {
      font-family: 'Orbitron', monospace;
      font-size: 1.2rem;
      letter-spacing: 2px;
      color: '${color}';
    }

    .results-section .results-header .total-score {
      font-family: 'Orbitron', monospace;
      font-size: 1.8rem;
      font-weight: 900;
      color: '${color}';
    }

    .results-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 12px;
    }

    .result-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 16px;
      background: rgba(0, 0, 0, 0.15);
      border-radius: 12px;
      border: 1px solid ${borderColor};
      transition: all 0.3s ease;
    }

    .result-item:hover {
      background: rgba(0, 0, 0, 0.25);
      border-color: ${hoverColor};
    }

    .result-item .result-name {
      font-size: 0.8rem;
      color: rgba(255, 255, 255, 0.3);
      font-weight: 300;
    }

    .result-item .result-score {
      font-family: 'Orbitron', monospace;
      font-size: 0.9rem;
      font-weight: 700;
      color: '${color}';
    }

    .result-item .result-score.pending {
      color: rgba(255, 255, 255, 0.1);
    }

    @media (max-width: 768px) {
      body { padding: 14px; }
      .top-bar { flex-direction: column; gap: 14px; padding: 16px 20px; border-radius: 40px; }
      .student-area { flex-wrap: wrap; justify-content: center; }
      .hero h1 { font-size: 2.2rem; }
      .hero-score { flex-wrap: wrap; justify-content: center; gap: 10px; padding: 12px 20px; }
      .hero-score .score-number { font-size: 1.8rem; }
      .section-grid { grid-template-columns: 1fr; }
      .results-grid { grid-template-columns: 1fr 1fr; }
      .section-title .neon-line { max-width: 40px; }
    }

    @media (max-width: 480px) {
      .results-grid { grid-template-columns: 1fr; }
      .results-section { padding: 20px 16px; }
      .section-card { padding: 18px 16px; }
      .hero h1 { font-size: 1.8rem; }
    }

    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.3); }
    ::-webkit-scrollbar-thumb { background: ${buttonGrad}; border-radius: 12px; }
  </style>
</head>
<body>
  <div class="cosmic-bg">
    <div class="nebula nebula-1"></div>
    <div class="nebula nebula-2"></div>
    <div class="nebula nebula-3"></div>
    <div id="starContainer"></div>
  </div>

  <header class="top-bar">
    <div class="brand">
      <div class="logo-icon">✦</div>
      <span class="glow">AWJ</span>
    </div>
    <div class="student-area">
      <span class="student-greeting">
        ◆ <span class="highlight" id="studentName">Student</span>
      </span>
      <button class="back-btn" onclick="goHome()">
        <span>◀</span> BACK
      </button>
      <button class="logout-btn" onclick="logout()">⌘ EXIT</button>
    </div>
  </header>

  <main class="container">
    <div class="hero">
      <div class="hero-content">
        <div class="exam-badge">✦ ${planetName} EXAM</div>
        <h1>${planetName.toUpperCase()} NEXUS</h1>
        <div class="subtitle">${icon} complete all sections to unlock mastery</div>
        <div class="hero-score">
          <span class="overall-score">OVERALL SCORE</span>
          <span class="score-number" id="overallScore">0</span>
          <span class="score-label">/ 800 total points</span>
        </div>
      </div>
    </div>

    <div class="section-title">
      <span class="dimension-icon">◈</span>
      Listening
      <span class="neon-line"></span>
    </div>
    <div class="section-grid">
      <div class="section-card listening" id="listening1">
        <div class="card-header">
          <h3>Listening 1</h3>
          <span class="section-icon">🎧</span>
        </div>
        <div class="card-desc">Basic listening comprehension</div>
        <div class="score-display">
          <span class="score-label">Score</span>
          <span class="score-value pending" id="listening1Score">—</span>
        </div>
        <button class="btn-start" data-link="listening1/index.html">
          <span class="arrow">⟶</span> start
        </button>
      </div>
      <div class="section-card listening" id="listening2">
        <div class="card-header">
          <h3>Listening 2</h3>
          <span class="section-icon">🔊</span>
        </div>
        <div class="card-desc">Advanced listening tasks</div>
        <div class="score-display">
          <span class="score-label">Score</span>
          <span class="score-value pending" id="listening2Score">—</span>
        </div>
        <button class="btn-start" data-link="listening2/index.html">
          <span class="arrow">⟶</span> start
        </button>
      </div>
    </div>

    <div class="section-title">
      <span class="dimension-icon">◈</span>
      Language Use
      <span class="neon-line"></span>
    </div>
    <div class="section-grid">
      <div class="section-card vocabulary" id="vocabulary">
        <div class="card-header">
          <h3>Vocabulary</h3>
          <span class="section-icon">📚</span>
        </div>
        <div class="card-desc">Word meaning and usage</div>
        <div class="score-display">
          <span class="score-label">Score</span>
          <span class="score-value pending" id="vocabularyScore">—</span>
        </div>
        <button class="btn-start" data-link="vocabulary/index.html">
          <span class="arrow">⟶</span> start
        </button>
      </div>
      <div class="section-card grammar" id="grammar">
        <div class="card-header">
          <h3>Grammar</h3>
          <span class="section-icon">📝</span>
        </div>
        <div class="card-desc">Sentence structure and accuracy</div>
        <div class="score-display">
          <span class="score-label">Score</span>
          <span class="score-value pending" id="grammarScore">—</span>
        </div>
        <button class="btn-start" data-link="grammar/index.html">
          <span class="arrow">⟶</span> start
        </button>
      </div>
      <div class="section-card mixed" id="mixed">
        <div class="card-header">
          <h3>Grammar &amp; Vocabulary</h3>
          <span class="section-icon">🧩</span>
        </div>
        <div class="card-desc">Mixed language questions</div>
        <div class="score-display">
          <span class="score-label">Score</span>
          <span class="score-value pending" id="mixedScore">—</span>
        </div>
        <button class="btn-start" data-link="grammar-vocabulary/index.html">
          <span class="arrow">⟶</span> start
        </button>
      </div>
    </div>

    <div class="section-title">
      <span class="dimension-icon">◈</span>
      Reading
      <span class="neon-line"></span>
    </div>
    <div class="section-grid">
      <div class="section-card reading" id="reading1">
        <div class="card-header">
          <h3>Reading 1</h3>
          <span class="section-icon">📖</span>
        </div>
        <div class="card-desc">Basic reading comprehension</div>
        <div class="score-display">
          <span class="score-label">Score</span>
          <span class="score-value pending" id="reading1Score">—</span>
        </div>
        <button class="btn-start" data-link="reading1/index.html">
          <span class="arrow">⟶</span> start
        </button>
      </div>
      <div class="section-card reading" id="reading2">
        <div class="card-header">
          <h3>Reading 2</h3>
          <span class="section-icon">📰</span>
        </div>
        <div class="card-desc">Critical reading and analysis</div>
        <div class="score-display">
          <span class="score-label">Score</span>
          <span class="score-value pending" id="reading2Score">—</span>
        </div>
        <button class="btn-start" data-link="reading2/index.html">
          <span class="arrow">⟶</span> start
        </button>
      </div>
      <div class="section-card reading" id="reading3">
        <div class="card-header">
          <h3>Reading 3</h3>
          <span class="section-icon">📑</span>
        </div>
        <div class="card-desc">Advanced passage analysis</div>
        <div class="score-display">
          <span class="score-label">Score</span>
          <span class="score-value pending" id="reading3Score">—</span>
        </div>
        <button class="btn-start" data-link="reading3/index.html">
          <span class="arrow">⟶</span> start
        </button>
      </div>
    </div>

    <div class="section-title">
      <span class="dimension-icon">◈</span>
      Writing
      <span class="neon-line"></span>
    </div>
    <div class="section-grid">
      <div class="section-card writing" id="writing1">
        <div class="card-header">
          <h3>Writing 1</h3>
          <span class="section-icon">✍️</span>
        </div>
        <div class="card-desc">Structured written response</div>
        <div class="score-display">
          <span class="score-label">Score</span>
          <span class="score-value pending" id="writing1Score">—</span>
        </div>
        <button class="btn-start" data-link="writing1/index.html">
          <span class="arrow">⟶</span> start
        </button>
      </div>
      <div class="section-card writing" id="writing2">
        <div class="card-header">
          <h3>Writing 2</h3>
          <span class="section-icon">📝</span>
        </div>
        <div class="card-desc">Essay and argument writing</div>
        <div class="score-display">
          <span class="score-label">Score</span>
          <span class="score-value pending" id="writing2Score">—</span>
        </div>
        <button class="btn-start" data-link="writing2/index.html">
          <span class="arrow">⟶</span> start
        </button>
      </div>
    </div>

    <div class="results-section">
      <div class="results-header">
        <h2>✦ Results Overview</h2>
        <span class="total-score" id="totalScore">0 / 800</span>
      </div>
      <div class="results-grid" id="resultsGrid">
        <div class="result-item">
          <span class="result-name">Listening 1</span>
          <span class="result-score pending" id="rListening1">—</span>
        </div>
        <div class="result-item">
          <span class="result-name">Listening 2</span>
          <span class="result-score pending" id="rListening2">—</span>
        </div>
        <div class="result-item">
          <span class="result-name">Vocabulary</span>
          <span class="result-score pending" id="rVocabulary">—</span>
        </div>
        <div class="result-item">
          <span class="result-name">Grammar</span>
          <span class="result-score pending" id="rGrammar">—</span>
        </div>
        <div class="result-item">
          <span class="result-name">Grammar &amp; Vocab</span>
          <span class="result-score pending" id="rMixed">—</span>
        </div>
        <div class="result-item">
          <span class="result-name">Reading 1</span>
          <span class="result-score pending" id="rReading1">—</span>
        </div>
        <div class="result-item">
          <span class="result-name">Reading 2</span>
          <span class="result-score pending" id="rReading2">—</span>
        </div>
        <div class="result-item">
          <span class="result-name">Reading 3</span>
          <span class="result-score pending" id="rReading3">—</span>
        </div>
        <div class="result-item">
          <span class="result-name">Writing 1</span>
          <span class="result-score pending" id="rWriting1">—</span>
        </div>
        <div class="result-item">
          <span class="result-name">Writing 2</span>
          <span class="result-score pending" id="rWriting2">—</span>
        </div>
      </div>
    </div>
  </main>

  <script>
    function createStars() {
      const container = document.getElementById('starContainer');
      if (!container) return;
      for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 3 + 1;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 4 + 2;
        const minOpacity = Math.random() * 0.2 + 0.1;
        const maxOpacity = Math.random() * 0.6 + 0.4;
        star.style.cssText = \`
          width: \${size}px;
          height: \${size}px;
          left: \${x}%;
          top: \${y}%;
          --duration: \${duration}s;
          --min-opacity: \${minOpacity};
          --max-opacity: \${maxOpacity};
          animation-delay: \${Math.random() * 4}s;
        \`;
        container.appendChild(star);
      }
    }
    createStars();

    const SECTION_KEYS = ['listening1','listening2','vocabulary','grammar','mixed','reading1','reading2','reading3','writing1','writing2'];
    const MAX_SCORES = {listening1:40,listening2:40,vocabulary:80,grammar:80,mixed:80,reading1:80,reading2:80,reading3:80,writing1:120,writing2:120};

    function getScores() {
      const student = localStorage.getItem('currentStudent');
      if (!student) return {};
      const students = JSON.parse(localStorage.getItem('students')) || {};
      const studentData = students[student];
      if (!studentData || !studentData.tests) return {};
      return studentData.tests['${planetId}'] || {};
    }

    function saveScores(scores) {
      const student = localStorage.getItem('currentStudent');
      if (!student) return;
      const students = JSON.parse(localStorage.getItem('students')) || {};
      if (!students[student]) students[student] = { createdAt: new Date().toISOString(), tests: {} };
      if (!students[student].tests) students[student].tests = {};
      students[student].tests['${planetId}'] = scores;
      localStorage.setItem('students', JSON.stringify(students));
    }

    function updateUI() {
      const scores = getScores();
      let total = 0, totalMax = 0;
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
          students[student].tests['${planetId}_completed'] = true;
          localStorage.setItem('students', JSON.stringify(students));
        }
      }
    }

    document.querySelectorAll('[data-link]').forEach(el => {
      el.addEventListener('click', function(e) {
        const link = this.dataset.link;
        if (!link) return;
        document.body.style.transition = 'opacity 0.3s ease';
        document.body.style.opacity = '0';
        setTimeout(() => { window.location.href = link; }, 300);
      });
    });

    window.goHome = function() {
      document.body.style.transition = 'opacity 0.3s ease';
      document.body.style.opacity = '0';
      setTimeout(() => { window.location.href = '../home.html'; }, 300);
    };

    window.logout = function() {
      document.body.style.transition = 'opacity 0.3s ease';
      document.body.style.opacity = '0';
      setTimeout(() => {
        localStorage.removeItem('currentStudent');
        window.location.href = '../index.html';
      }, 300);
    };

    window.saveSectionScore = function(sectionKey, score) {
      const scores = getScores();
      scores[sectionKey] = score;
      saveScores(scores);
      updateUI();
    };

    const student = localStorage.getItem('currentStudent');
    const nameBox = document.getElementById('studentName');
    if (!student) {
      window.location.href = '../index.html';
    } else if (nameBox) {
      nameBox.textContent = student;
    }
    updateUI();
  </script>
</body>
</html>`;
}

// ============================================
// COPY CODE
// ============================================
window.copyCode = function() {
  const code = document.getElementById('outputCode');
  if (!code) return;
  navigator.clipboard.writeText(code.textContent).then(() => {
    const btn = document.querySelector('.copy-btn');
    if (btn) {
      btn.innerHTML = '<span>✓</span> COPIED!';
      setTimeout(() => {
        btn.innerHTML = '<span>📋</span> COPY CODE';
      }, 2000);
    }
  }).catch(() => {
    // Fallback
    const textArea = document.createElement('textarea');
    textArea.value = code.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    const btn = document.querySelector('.copy-btn');
    if (btn) {
      btn.innerHTML = '<span>✓</span> COPIED!';
      setTimeout(() => {
        btn.innerHTML = '<span>📋</span> COPY CODE';
      }, 2000);
    }
  });
};

// ============================================
// DOWNLOAD CODE
// ============================================
window.downloadCode = function() {
  const code = document.getElementById('outputCode');
  if (!code) return;
  const planetName = document.getElementById('outputPlanetName');
  const name = planetName ? planetName.textContent.replace(' Dashboard', '') : 'exam';
  const blob = new Blob([code.textContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `exam-${name.toLowerCase().replace(/\s/g, '-')}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// ============================================
// PREVIEW CODE
// ============================================
window.previewCode = function() {
  const code = document.getElementById('outputCode');
  if (!code) return;
  const blob = new Blob([code.textContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  window.open(url, '_blank');
  setTimeout(() => URL.revokeObjectURL(url), 5000);
};

// ============================================
// BACK TO HOME
// ============================================
window.goHome = function() {
  document.body.style.transition = 'opacity 0.3s ease';
  document.body.style.opacity = '0';
  setTimeout(() => {
    window.location.href = '../home.html';
  }, 300);
};

// ============================================
// LOGOUT
// ============================================
window.logout = function() {
  document.body.style.transition = 'opacity 0.3s ease';
  document.body.style.opacity = '0';
  setTimeout(() => {
    localStorage.removeItem('currentStudent');
    window.location.href = '../index.html';
  }, 300);
};