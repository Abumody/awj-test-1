// ============================================
// GENERATE HTML - SOFTER BACKGROUND + LARGER TEXT
// ============================================
function generateHTML(planet, instructions, audioDataURL, questions) {
  const planetName = planet.name;
  const planetId = planet.id;
  const icon = planet.icon;
  const color = planet.color;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AWJ · ${planetName} Listening 1</title>
  <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Inter', 'Segoe UI', sans-serif;
      color: #1a1a2e;
      min-height: 100vh;
      padding: 20px 28px 50px;
      position: relative;
      transition: opacity 0.3s ease;
      /* SOFT WARM GRADIENT - EYE FRIENDLY */
      background: linear-gradient(160deg, #f7f3ee 0%, #efe8e0 30%, #e8dfd6 60%, #dfd5cc 100%);
    }

    /* Subtle warm decorative glow */
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      z-index: 0;
      background: 
        radial-gradient(ellipse at 20% 30%, rgba(200, 180, 160, 0.08), transparent 50%),
        radial-gradient(ellipse at 80% 70%, rgba(180, 160, 140, 0.06), transparent 50%);
      pointer-events: none;
    }

    .container {
      max-width: 1100px;
      margin: 0 auto;
      position: relative;
      z-index: 1;
    }

    /* ============================================
       HEADER - Soft Glass
       ============================================ */
    .top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 36px;
      background: rgba(255, 248, 242, 0.7);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-radius: 60px;
      border: 1px solid rgba(255, 248, 242, 0.5);
      box-shadow: 0 8px 32px rgba(120, 100, 80, 0.06);
      position: relative;
      z-index: 10;
      margin-bottom: 30px;
    }

    .brand {
      font-family: 'Orbitron', monospace;
      font-size: 26px;
      font-weight: 900;
      letter-spacing: 2px;
      display: flex;
      align-items: center;
      gap: 14px;
      color: #2c3e6b;
    }

    .brand .logo-icon {
      width: 44px;
      height: 44px;
      border: 2px solid #4a6fa5;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      background: rgba(74, 111, 165, 0.05);
      color: #4a6fa5;
    }

    .brand .glow {
      color: #2c3e6b;
    }

    .student-area {
      display: flex;
      align-items: center;
      gap: 18px;
    }

    .student-greeting {
      padding: 10px 28px;
      border-radius: 40px;
      border: 1px solid rgba(44, 62, 107, 0.06);
      background: rgba(44, 62, 107, 0.02);
      font-weight: 600;
      font-size: 1rem;
      color: #4a6fa5;
      font-family: 'Orbitron', monospace;
      letter-spacing: 0.5px;
    }

    .student-greeting .highlight {
      color: #2c3e6b;
      font-weight: 700;
    }

    .back-btn {
      background: rgba(44, 62, 107, 0.04);
      border: 1px solid rgba(44, 62, 107, 0.06);
      color: #2c3e6b;
      padding: 10px 26px;
      border-radius: 40px;
      font-weight: 700;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.3s ease;
      font-family: 'Orbitron', monospace;
      letter-spacing: 0.5px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .back-btn:hover {
      background: rgba(44, 62, 107, 0.08);
      border-color: rgba(44, 62, 107, 0.1);
      transform: scale(1.04);
    }

    .logout-btn {
      background: rgba(200, 60, 80, 0.04);
      border: 1px solid rgba(200, 60, 80, 0.06);
      color: #b84a5a;
      padding: 10px 26px;
      border-radius: 40px;
      font-weight: 700;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.3s ease;
      font-family: 'Orbitron', monospace;
      letter-spacing: 0.5px;
    }

    .logout-btn:hover {
      background: rgba(200, 60, 80, 0.08);
      border-color: rgba(200, 60, 80, 0.1);
      transform: scale(1.04);
    }

    /* ============================================
       HERO - Larger
       ============================================ */
    .hero {
      margin-bottom: 30px;
      padding: 25px 0 15px;
      text-align: center;
    }

    .hero .exam-badge {
      font-family: 'Orbitron', monospace;
      font-size: 0.8rem;
      letter-spacing: 3px;
      color: '${color}';
      padding: 8px 28px;
      border: 1px solid ${color}33;
      border-radius: 40px;
      display: inline-block;
      margin-bottom: 12px;
      background: ${color}11;
      font-weight: 700;
    }

    .hero h1 {
      font-family: 'Orbitron', monospace;
      font-size: 3.2rem;
      font-weight: 900;
      letter-spacing: 4px;
      margin-bottom: 8px;
      color: #1a1a2e;
    }

    .hero .subtitle {
      color: #5a6a8a;
      font-size: 1.2rem;
      letter-spacing: 2px;
      font-weight: 500;
    }

    .hero .subtitle .icon {
      font-size: 1.4rem;
    }

    /* ============================================
       INSTRUCTIONS - Larger
       ============================================ */
    .instructions-box {
      background: rgba(255, 248, 242, 0.6);
      border-radius: 18px;
      padding: 28px 32px;
      border: 1px solid rgba(255, 248, 242, 0.5);
      margin-bottom: 30px;
      box-shadow: 0 4px 24px rgba(120, 100, 80, 0.04);
    }

    .instructions-box h3 {
      font-family: 'Orbitron', monospace;
      font-size: 0.9rem;
      letter-spacing: 2px;
      color: '${color}';
      margin-bottom: 12px;
    }

    .instructions-box p {
      color: #2a3a5a;
      font-size: 1.1rem;
      line-height: 1.9;
      font-weight: 500;
    }

    /* ============================================
       AUDIO PLAYER - Larger
       ============================================ */
    .audio-player {
      background: rgba(255, 248, 242, 0.6);
      border-radius: 18px;
      padding: 24px 28px;
      border: 1px solid rgba(255, 248, 242, 0.5);
      margin-bottom: 30px;
      box-shadow: 0 4px 24px rgba(120, 100, 80, 0.04);
    }

    .audio-player h3 {
      font-family: 'Orbitron', monospace;
      font-size: 0.85rem;
      letter-spacing: 2px;
      color: #5a6a8a;
      margin-bottom: 14px;
    }

    .audio-player audio {
      width: 100%;
      height: 52px;
      border-radius: 10px;
    }

    audio::-webkit-media-controls-panel {
      background: rgba(255, 248, 242, 0.7);
    }

    audio::-webkit-media-controls-current-time-display,
    audio::-webkit-media-controls-time-remaining-display {
      color: #2c3e6b;
      font-weight: 600;
    }

    /* ============================================
       QUESTIONS - Larger & Bolder
       ============================================ */
    .questions-section {
      margin-bottom: 30px;
    }

    .question-card {
      background: rgba(255, 248, 242, 0.6);
      border-radius: 18px;
      padding: 26px 30px;
      border: 1px solid rgba(255, 248, 242, 0.5);
      margin-bottom: 18px;
      box-shadow: 0 4px 24px rgba(120, 100, 80, 0.04);
      transition: border-color 0.3s ease;
    }

    .question-card:hover {
      border-color: ${color}44;
    }

    .question-card .q-header {
      display: flex;
      gap: 16px;
      margin-bottom: 16px;
    }

    .question-card .q-number {
      font-family: 'Orbitron', monospace;
      font-size: 0.8rem;
      color: '${color}';
      letter-spacing: 1px;
      min-width: 30px;
      padding-top: 2px;
      font-weight: 700;
    }

    .question-card .q-text {
      color: #1a1a2e;
      font-size: 1.15rem;
      font-weight: 700;
      line-height: 1.5;
    }

    .question-card .options {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 14px;
      padding-left: 46px;
    }

    .question-card .options .option {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 18px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 12px;
      border: 1px solid rgba(44, 62, 107, 0.04);
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .question-card .options .option:hover {
      background: rgba(255, 255, 255, 0.8);
      border-color: ${color}33;
    }

    .question-card .options .option input[type="radio"] {
      appearance: none;
      width: 20px;
      height: 20px;
      border: 2.5px solid rgba(44, 62, 107, 0.15);
      border-radius: 50%;
      flex-shrink: 0;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
    }

    .question-card .options .option input[type="radio"]:checked {
      border-color: '${color}';
      background: '${color}';
      box-shadow: 0 0 24px ${color}22;
    }

    .question-card .options .option input[type="radio"]:checked::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #ffffff;
    }

    .question-card .options .option label {
      color: #1a1a2e;
      font-size: 1rem;
      cursor: pointer;
      flex: 1;
      font-weight: 600;
    }

    .question-card .options .option .letter {
      color: #8a9aaa;
      font-family: 'Orbitron', monospace;
      font-size: 0.75rem;
      letter-spacing: 1px;
      min-width: 20px;
      font-weight: 700;
    }

    .question-card .options .option.selected {
      border-color: '${color}';
      background: ${color}11;
    }

    .question-card .options .option.selected label {
      color: #1a1a2e;
      font-weight: 700;
    }

    .question-card .options .option.selected .letter {
      color: '${color}';
    }

    .question-card .options .option.correct-show {
      border-color: #4ade80;
      background: rgba(74, 222, 128, 0.08);
    }

    .question-card .options .option.correct-show label {
      color: #1a6a3a;
      font-weight: 700;
    }

    .question-card .options .option.wrong-show {
      border-color: #ef4444;
      background: rgba(239, 68, 68, 0.08);
    }

    .question-card .options .option.wrong-show label {
      color: #8a2a2a;
      font-weight: 700;
    }

    .question-card .feedback {
      padding-left: 46px;
      margin-top: 14px;
      font-size: 1rem;
      font-weight: 600;
      display: none;
    }

    .question-card .feedback.show {
      display: block;
    }

    .question-card .feedback.correct {
      color: #1a6a3a;
    }

    .question-card .feedback.wrong {
      color: #8a2a2a;
    }

    .question-card .feedback .answer-reveal {
      color: #5a6a8a;
      margin-top: 4px;
      font-weight: 500;
    }

    /* ============================================
       ACTIONS - Larger
       ============================================ */
    .actions {
      display: flex;
      gap: 18px;
      margin-top: 10px;
      flex-wrap: wrap;
    }

    .submit-btn {
      padding: 18px 48px;
      border: none;
      border-radius: 40px;
      font-family: 'Orbitron', monospace;
      font-size: 0.9rem;
      letter-spacing: 2px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      background: linear-gradient(135deg, '${color}', '#4a7aff');
      color: #ffffff;
      box-shadow: 0 4px 24px ${color}33;
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .submit-btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 36px ${color}44;
    }

    .reset-btn {
      padding: 18px 36px;
      border: 1px solid rgba(44, 62, 107, 0.06);
      border-radius: 40px;
      background: rgba(255, 255, 255, 0.4);
      color: #4a5a7a;
      font-family: 'Orbitron', monospace;
      font-size: 0.85rem;
      letter-spacing: 1px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .reset-btn:hover {
      background: rgba(255, 255, 255, 0.6);
      border-color: rgba(44, 62, 107, 0.1);
      color: #1a1a2e;
    }

    /* ============================================
       RESULTS - Larger
       ============================================ */
    .result-box {
      margin-top: 24px;
      padding: 28px 32px;
      border-radius: 18px;
      background: rgba(255, 248, 242, 0.6);
      border: 1px solid rgba(255, 248, 242, 0.5);
      display: none;
      box-shadow: 0 4px 24px rgba(120, 100, 80, 0.04);
    }

    .result-box.show {
      display: block;
      animation: slideUp 0.6s ease;
    }

    .result-box .score {
      font-family: 'Orbitron', monospace;
      font-size: 2.8rem;
      font-weight: 900;
      color: '${color}';
    }

    .result-box .score-detail {
      color: #4a5a7a;
      font-size: 1.1rem;
      font-weight: 500;
      margin-top: 4px;
    }

    .result-box .score-feedback {
      margin-top: 14px;
      padding: 16px 20px;
      border-radius: 12px;
      font-size: 1.05rem;
      font-weight: 600;
    }

    .result-box .score-feedback.pass {
      background: rgba(74, 222, 128, 0.08);
      border: 1px solid rgba(74, 222, 128, 0.1);
      color: #1a6a3a;
    }

    .result-box .score-feedback.fail {
      background: rgba(239, 68, 68, 0.08);
      border: 1px solid rgba(239, 68, 68, 0.1);
      color: #8a2a2a;
    }

    /* ============================================
       RESPONSIVE
       ============================================ */
    @media (max-width: 768px) {
      body { padding: 14px; }
      .top-bar { flex-direction: column; gap: 14px; padding: 16px 20px; border-radius: 40px; }
      .student-area { flex-wrap: wrap; justify-content: center; }
      .hero h1 { font-size: 2.2rem; }
      .hero .subtitle { font-size: 1rem; }
      .question-card .options { grid-template-columns: 1fr; padding-left: 0; }
      .question-card .q-header { flex-direction: column; gap: 6px; }
      .question-card .feedback { padding-left: 0; }
      .actions { flex-direction: column; }
      .submit-btn, .reset-btn { width: 100%; justify-content: center; }
      .instructions-box { padding: 18px 20px; }
      .instructions-box p { font-size: 1rem; }
      .audio-player { padding: 16px 18px; }
      .question-card .q-text { font-size: 1rem; }
      .question-card .options .option label { font-size: 0.9rem; }
    }

    @media (max-width: 480px) {
      .hero h1 { font-size: 1.8rem; }
      .question-card { padding: 18px 16px; }
      .result-box .score { font-size: 2rem; }
    }

    @keyframes slideUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: rgba(200, 180, 160, 0.15); }
    ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, '${color}', '#4a7aff'); border-radius: 12px; }
  </style>
</head>
<body>

  <div class="container">

    <!-- HEADER -->
    <header class="top-bar">
      <div class="brand">
        <div class="logo-icon">✦</div>
        <span class="glow">AWJ</span>
      </div>
      <div class="student-area">
        <span class="student-greeting">
          ◆ <span class="highlight" id="studentName">Student</span>
        </span>
        <button class="back-btn" onclick="goBack()">
          <span>◀</span> BACK
        </button>
        <button class="logout-btn" onclick="logout()">⌘ EXIT</button>
      </div>
    </header>

    <!-- HERO -->
    <div class="hero">
      <div class="exam-badge">✦ ${planetName} LISTENING 1</div>
      <h1>LISTENING TEST</h1>
      <div class="subtitle">
        <span class="icon">${icon}</span> ${planetName} · Listening Comprehension
      </div>
    </div>

    <!-- INSTRUCTIONS -->
    <div class="instructions-box">
      <h3>📋 INSTRUCTIONS</h3>
      <p>${instructions}</p>
    </div>

    <!-- AUDIO PLAYER -->
    <div class="audio-player">
      <h3>🎵 AUDIO</h3>
      <audio controls id="audioPlayer">
        <source src="${audioDataURL}" type="audio/mpeg">
        Your browser does not support the audio element.
      </audio>
    </div>

    <!-- QUESTIONS -->
    <div class="questions-section" id="questionsSection">
      ${questions.map((q, index) => `
      <div class="question-card" data-q="${q.number}">
        <div class="q-header">
          <span class="q-number">Q${q.number}</span>
          <span class="q-text">${q.text}</span>
        </div>
        <div class="options" data-q="${q.number}">
          ${['A', 'B', 'C'].map(letter => `
          <div class="option" data-letter="${letter}" data-q="${q.number}">
            <input type="radio" name="q${q.number}" value="${letter}" id="q${q.number}${letter}">
            <span class="letter">${letter}</span>
            <label for="q${q.number}${letter}">${q.options[letter]}</label>
          </div>
          `).join('')}
        </div>
        <div class="feedback" id="feedback${q.number}">
          <span class="feedback-text"></span>
          <div class="answer-reveal">Correct answer: ${q.correct}</div>
        </div>
      </div>
      `).join('')}
    </div>

    <!-- ACTIONS -->
    <div class="actions">
      <button class="submit-btn" onclick="submitTest()">
        <span>✓</span> SUBMIT TEST
      </button>
      <button class="reset-btn" onclick="resetTest()">
        <span>⟳</span> RESET
      </button>
    </div>

    <!-- RESULTS -->
    <div class="result-box" id="resultBox">
      <div class="score" id="resultScore">0/7</div>
      <div class="score-detail" id="resultDetail">You answered 0 out of 7 questions correctly.</div>
      <div class="score-feedback" id="resultFeedback"></div>
    </div>

  </div>

  <script>
    // ============================================
    // CORRECT ANSWERS
    // ============================================
    const correctAnswers = {
      ${questions.map(q => `${q.number}: '${q.correct}'`).join(',\n      ')}
    };

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
    // SUBMIT TEST
    // ============================================
    let submitted = false;

    function submitTest() {
      if (submitted) {
        alert('You have already submitted this test!');
        return;
      }

      let correct = 0;
      const total = 7;

      for (let i = 1; i <= total; i++) {
        const selected = document.querySelector(\`input[name="q\${i}"]:checked\`);
        const feedback = document.getElementById(\`feedback\${i}\`);
        const feedbackText = feedback.querySelector('.feedback-text');
        const options = document.querySelectorAll(\`.options[data-q="\${i}"] .option\`);

        // Remove previous highlights
        options.forEach(opt => {
          opt.classList.remove('correct-show', 'wrong-show', 'selected');
        });

        if (selected) {
          const value = selected.value;
          const parent = selected.closest('.option');
          
          if (value === correctAnswers[i]) {
            correct++;
            parent.classList.add('correct-show');
            feedbackText.textContent = '✅ Correct!';
            feedback.className = 'feedback show correct';
          } else {
            parent.classList.add('wrong-show');
            options.forEach(opt => {
              if (opt.dataset.letter === correctAnswers[i]) {
                opt.classList.add('correct-show');
              }
            });
            feedbackText.textContent = '❌ Incorrect.';
            feedback.className = 'feedback show wrong';
          }
        } else {
          feedbackText.textContent = '⚠️ No answer selected.';
          feedback.className = 'feedback show wrong';
          options.forEach(opt => {
            if (opt.dataset.letter === correctAnswers[i]) {
              opt.classList.add('correct-show');
            }
          });
        }
      }

      submitted = true;

      // Show results
      const resultBox = document.getElementById('resultBox');
      resultBox.classList.add('show');
      document.getElementById('resultScore').textContent = \`\${correct}/\${total}\`;
      document.getElementById('resultDetail').textContent = \`You answered \${correct} out of \${total} questions correctly.\`;

      const feedback = document.getElementById('resultFeedback');
      const percentage = (correct / total) * 100;
      if (percentage >= 70) {
        feedback.className = 'score-feedback pass';
        feedback.textContent = '🎉 Excellent! You passed the test!';
      } else if (percentage >= 50) {
        feedback.className = 'score-feedback pass';
        feedback.textContent = '👍 Good effort! Keep practicing!';
      } else {
        feedback.className = 'score-feedback fail';
        feedback.textContent = '💪 Keep practicing! Review the material and try again.';
      }

      // Save score to localStorage
      const examKey = '${planetId}_listening1';
      const students = JSON.parse(localStorage.getItem('students')) || {};
      if (students[student]) {
        if (!students[student].tests) students[student].tests = {};
        if (!students[student].tests['exam1']) students[student].tests['exam1'] = {};
        students[student].tests['exam1'][examKey] = correct;
        localStorage.setItem('students', JSON.stringify(students));
      }

      resultBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // ============================================
    // RESET TEST
    // ============================================
    function resetTest() {
      if (!confirm('Are you sure you want to reset the test?')) return;

      submitted = false;

      document.querySelectorAll('input[type="radio"]').forEach(input => {
        input.checked = false;
      });

      document.querySelectorAll('.feedback').forEach(fb => {
        fb.className = 'feedback';
      });

      document.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('correct-show', 'wrong-show', 'selected');
      });

      document.getElementById('resultBox').classList.remove('show');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // ============================================
    // BACK TO DASHBOARD
    // ============================================
    window.goBack = function() {
      document.body.style.transition = 'opacity 0.3s ease';
      document.body.style.opacity = '0';
      setTimeout(() => {
        window.location.href = '../exam1/index.html';
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

    // ============================================
    // OPTION CLICK HANDLER
    // ============================================
    document.querySelectorAll('.option').forEach(opt => {
      opt.addEventListener('click', function() {
        if (submitted) return;
        const radio = this.querySelector('input[type="radio"]');
        if (radio) {
          radio.checked = true;
          this.parentElement.querySelectorAll('.option').forEach(o => {
            o.classList.remove('selected');
          });
          this.classList.add('selected');
        }
      });
    });

    // Audio player event
    document.getElementById('audioPlayer').addEventListener('play', function() {
      if (submitted) {
        this.pause();
        alert('Test has been submitted. Please reset to listen again.');
      }
    });
  </script>
</body>
</html>`;
}