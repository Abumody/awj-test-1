document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  var testTitle = document.getElementById('testTitle');
  var testDesc = document.getElementById('testDesc');
  var questionCount = document.getElementById('questionCount');
  var pointsPerQuestion = document.getElementById('pointsPerQuestion');
  var totalScore = document.getElementById('totalScore');
  var maxAttempts = document.getElementById('maxAttempts');
  var bgColor = document.getElementById('bgColor');
  var sectionCount = document.getElementById('sectionCount');
  var sectionsContainer = document.getElementById('sectionsContainer');
  var questionsContainer = document.getElementById('questionsContainer');
  var syncQuestionsBtn = document.getElementById('syncQuestionsBtn');
  var generateBtn = document.getElementById('generateBtn');
  var previewBtn = document.getElementById('previewBtn');
  var previewSection = document.getElementById('previewSection');
  var previewFrame = document.getElementById('previewFrame');
  var refreshPreviewBtn = document.getElementById('refreshPreviewBtn');
  var newBtn = document.getElementById('newBtn');
  var saveBtn = document.getElementById('saveBtn');
  var loadBtn = document.getElementById('loadBtn');
  var editBtn = document.getElementById('editBtn');
  var loadModal = document.getElementById('loadModal');
  var closeLoadModal = document.getElementById('closeLoadModal');
  var savedExamsList = document.getElementById('savedExamsList');

  var currentExamId = null;
  var isEditMode = false;
  var previewHTML = null;

  // Update total score
  function updateTotalScore() {
    var qCount = parseInt(questionCount.value) || 0;
    var points = parseFloat(pointsPerQuestion.value) || 0;
    var total = (qCount * points).toFixed(1);
    totalScore.value = total;
    return total;
  }

  questionCount.addEventListener('input', updateTotalScore);
  pointsPerQuestion.addEventListener('input', updateTotalScore);

  // Update section titles
  function updateSectionTitles() {
    var count = parseInt(sectionCount.value) || 1;
    sectionsContainer.innerHTML = '';
    
    for (var i = 1; i <= count; i++) {
      var div = document.createElement('div');
      div.className = 'section-title-field';
      div.innerHTML = '<label>Section ' + i + ' Title</label><input type="text" class="section-title" data-section="' + i + '" value="Section ' + i + '">';
      sectionsContainer.appendChild(div);
    }
  }

  sectionCount.addEventListener('change', updateSectionTitles);

  function getSectionTitles() {
    var titles = [];
    var inputs = document.querySelectorAll('.section-title');
    for (var i = 0; i < inputs.length; i++) {
      titles.push(inputs[i].value.trim() || 'Untitled Section');
    }
    return titles;
  }

  // Add question card
  function addQuestionCard(questionData, index) {
    var card = document.createElement('div');
    card.className = 'question-card';
    var questionNum = document.querySelectorAll('.question-card').length + 1;
    
    card.innerHTML = '<div class="question-header">' +
      '<span class="question-number">Q' + questionNum + '</span>' +
      '<button type="button" class="delete-question">✗ Delete</button>' +
      '</div>' +
      '<div class="question-text-input">' +
      '<input type="text" class="question-text" placeholder="Example: This is a nice place. _____ don\'t we camp here?">' +
      '</div>' +
      '<div class="answer-row">' +
      '<input type="text" class="correct-answer" placeholder="Correct answer (e.g., why)">' +
      '<span class="correct-badge">✓ Correct Answer</span>' +
      '</div>';
    
    if (questionData) {
      card.querySelector('.question-text').value = questionData.text || '';
      card.querySelector('.correct-answer').value = questionData.answer || '';
    }
    
    card.querySelector('.delete-question').addEventListener('click', function() {
      card.remove();
      renumberQuestions();
      updateTotalScore();
      validateForm();
    });
    
    card.querySelector('.question-text').addEventListener('input', function() { validateCard(card); validateForm(); });
    card.querySelector('.correct-answer').addEventListener('input', function() { validateCard(card); validateForm(); });
    
    questionsContainer.appendChild(card);
    validateCard(card);
    return card;
  }

  function syncQuestions() {
    var count = parseInt(questionCount.value) || 0;
    var currentCards = document.querySelectorAll('.question-card');
    var currentCount = currentCards.length;
    
    if (count > currentCount) {
      for (var i = currentCount; i < count; i++) {
        addQuestionCard(null, i);
      }
    } else if (count < currentCount) {
      for (var i = currentCount - 1; i >= count; i--) {
        if (currentCards[i]) currentCards[i].remove();
      }
      renumberQuestions();
    }
    
    updateTotalScore();
    validateForm();
  }

  function renumberQuestions() {
    var cards = document.querySelectorAll('.question-card');
    for (var i = 0; i < cards.length; i++) {
      var numberSpan = cards[i].querySelector('.question-number');
      if (numberSpan) numberSpan.textContent = 'Q' + (i + 1);
    }
  }

  function validateCard(card) {
    var text = card.querySelector('.question-text').value.trim();
    var answer = card.querySelector('.correct-answer').value.trim();
    var isValid = text !== '' && answer !== '';
    if (isValid) {
      card.classList.remove('invalid');
      card.classList.add('valid');
    } else {
      card.classList.remove('valid');
      card.classList.add('invalid');
    }
    return isValid;
  }

  function validateForm() {
    var title = testTitle.value.trim();
    var desc = testDesc.value.trim();
    var cards = document.querySelectorAll('.question-card');
    
    var allValid = title !== '' && desc !== '';
    
    for (var i = 0; i < cards.length; i++) {
      var text = cards[i].querySelector('.question-text').value.trim();
      var answer = cards[i].querySelector('.correct-answer').value.trim();
      if (text === '' || answer === '') allValid = false;
    }
    
    var hasQuestions = cards.length > 0;
    
    generateBtn.disabled = !allValid || !hasQuestions;
    previewBtn.disabled = !allValid || !hasQuestions;
    saveBtn.disabled = !allValid || !hasQuestions;
    
    return allValid && hasQuestions;
  }

  function collectExamData() {
    var title = testTitle.value.trim();
    var description = testDesc.value.trim();
    var points = parseFloat(pointsPerQuestion.value);
    var attempts = parseInt(maxAttempts.value);
    var bg = bgColor.value;
    var sectionTitles = getSectionTitles();
    var secCount = parseInt(sectionCount.value);
    
    var questions = [];
    var cards = document.querySelectorAll('.question-card');
    for (var i = 0; i < cards.length; i++) {
      var text = cards[i].querySelector('.question-text').value.trim();
      var answer = cards[i].querySelector('.correct-answer').value.trim().toLowerCase();
      if (text && answer) {
        questions.push({ id: i + 1, text: text, answer: answer });
      }
    }
    
    if (questions.length === 0) return null;
    
    return {
      title: title,
      description: description,
      pointsPerQuestion: points,
      maxAttempts: attempts,
      bgColor: bg,
      sectionTitles: sectionTitles,
      sectionCount: secCount,
      questions: questions
    };
  }

  // Replace _____ with input field
  function replaceBlankWithInput(questionText, questionId) {
    var pattern = /_{3,}/g;
    var inputHtml = '<input type="text" name="q' + questionId + '" class="answer-input" placeholder="______" autocomplete="off">';
    return questionText.replace(pattern, inputHtml);
  }

  // Build questions HTML
  function buildQuestionsHTML(exam) {
    var questionsPerSection = Math.ceil(exam.questions.length / exam.sectionCount);
    var sectionsHTML = '';
    var answersObj = {};
    
    for (var s = 0; s < exam.sectionCount; s++) {
      var startIdx = s * questionsPerSection;
      var endIdx = Math.min(startIdx + questionsPerSection, exam.questions.length);
      var sectionQuestions = exam.questions.slice(startIdx, endIdx);
      
      if (sectionQuestions.length === 0) continue;
      
      var questionsHTML = '';
      for (var qIdx = 0; qIdx < sectionQuestions.length; qIdx++) {
        var q = sectionQuestions[qIdx];
        var sentenceWithInput = replaceBlankWithInput(q.text, q.id);
        
        questionsHTML += '<div class="question-item" data-qid="' + q.id + '">' +
          '<div class="question-number-badge">' + q.id + '</div>' +
          '<div class="question-sentence">' + sentenceWithInput + '</div>' +
          '</div>';
        
        answersObj[q.id] = q.answer;
      }
      
      var sectionTitle = exam.sectionTitles[s] || 'Section ' + (s + 1);
      sectionsHTML += '<div class="section-block">' +
        '<div class="section-title-block">' +
        '<h3>' + escapeHtml(sectionTitle) + '</h3>' +
        '<div class="title-underline"></div>' +
        '</div>' +
        '<div class="questions-list">' +
        questionsHTML +
        '</div>' +
        '</div>';
    }
    
    return { sectionsHTML: sectionsHTML, answersScript: JSON.stringify(answersObj, null, 2) };
  }

  // Build final test file
  function buildTestFile(exam, questionsHTML, answersScript) {
    var totalQuestionsCount = exam.questions.length;
    
    return '<!DOCTYPE html>\n' +
'<html lang="en">\n' +
'<head>\n' +
'<meta charset="UTF-8">\n' +
'<meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
'<title>' + escapeHtml(exam.title) + '</title>\n' +
'<style>\n' +
'* { margin: 0; padding: 0; box-sizing: border-box; }\n' +
'body { font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif; background: ' + exam.bgColor + '; min-height: 100vh; padding: 40px 20px; }\n' +
'.test-wrapper { max-width: 1000px; margin: 0 auto; }\n' +
'.test-card { background: white; border-radius: 24px; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1); overflow: hidden; }\n' +
'.test-header { text-align: center; padding: 40px; background: linear-gradient(135deg, #f0fdf4, #dcfce7); border-bottom: 1px solid #bbf7d0; }\n' +
'.test-header h1 { font-size: 2.5rem; color: #166534; margin-bottom: 10px; }\n' +
'.test-header p { color: #4b5563; font-size: 1.1rem; }\n' +
'.progress-area { padding: 20px 40px; background: #f9fafb; border-bottom: 1px solid #e5e7eb; }\n' +
'.progress-info { display: flex; justify-content: space-between; margin-bottom: 10px; font-weight: 600; color: #166534; }\n' +
'.progress-bar { height: 8px; background: #e5e7eb; border-radius: 10px; overflow: hidden; }\n' +
'.progress-fill { height: 100%; background: linear-gradient(90deg, #16a34a, #22c55e); border-radius: 10px; width: 0%; transition: width 0.3s ease; }\n' +
'.section-block { padding: 30px 40px; border-bottom: 1px solid #f0fdf4; }\n' +
'.section-title-block h3 { font-size: 1.5rem; color: #166534; margin-bottom: 10px; }\n' +
'.title-underline { width: 60px; height: 3px; background: linear-gradient(90deg, #16a34a, #22c55e); border-radius: 3px; margin-bottom: 25px; }\n' +
'.questions-list { display: flex; flex-direction: column; gap: 20px; }\n' +
'.question-item { background: #f9fafb; border-radius: 16px; padding: 20px; border: 1px solid #e5e7eb; transition: all 0.3s ease; }\n' +
'.question-item:hover { border-color: #bbf7d0; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); }\n' +
'.question-number-badge { display: inline-block; background: linear-gradient(135deg, #16a34a, #22c55e); color: white; padding: 4px 12px; border-radius: 20px; font-size: 0.85rem; font-weight: bold; margin-bottom: 12px; }\n' +
'.question-sentence { font-size: 1.05rem; line-height: 1.7; color: #1f2937; }\n' +
'.answer-input { padding: 8px 14px; border-radius: 10px; border: 2px solid #cbd5e1; font-size: 0.95rem; transition: all 0.2s ease; width: 160px; margin: 0 5px; font-family: inherit; background: white; text-align: center; }\n' +
'.answer-input:focus { outline: none; border-color: #16a34a; box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.15); }\n' +
'.answer-input.correct { border-color: #16a34a; background: #f0fdf4; color: #166534; }\n' +
'.answer-input.wrong { border-color: #dc2626; background: #fef2f2; color: #991b1b; }\n' +
'.actions-area { padding: 30px 40px; background: #f9fafb; display: flex; gap: 15px; flex-wrap: wrap; border-top: 1px solid #e5e7eb; }\n' +
'.btn { flex: 1; min-width: 180px; padding: 14px 24px; border: none; border-radius: 40px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease; font-family: inherit; }\n' +
'.btn-primary { background: linear-gradient(135deg, #16a34a, #22c55e); color: white; }\n' +
'.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(22, 163, 74, 0.3); }\n' +
'.btn-secondary { background: #e5e7eb; color: #374151; }\n' +
'.btn-secondary:hover { background: #d1d5db; }\n' +
'.result-area { margin: 20px 40px 40px; padding: 25px; border-radius: 20px; background: #f0fdf4; text-align: center; border: 2px solid #bbf7d0; }\n' +
'.modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.8); display: flex; align-items: center; justify-content: center; z-index: 1000; opacity: 0; visibility: hidden; transition: all 0.3s ease; }\n' +
'.modal-overlay.show { opacity: 1; visibility: visible; }\n' +
'.modal-container { background: white; border-radius: 24px; max-width: 500px; width: 90%; max-height: 80vh; overflow-y: auto; padding: 30px; }\n' +
'@media (max-width: 768px) { body { padding: 20px; } .test-header h1 { font-size: 1.8rem; } .section-block { padding: 20px; } .question-sentence { font-size: 0.95rem; } .answer-input { width: 120px; } .actions-area { flex-direction: column; } .btn { width: 100%; } }\n' +
'</style>\n' +
'</head>\n' +
'<body>\n' +
'<div class="test-wrapper">\n' +
'  <div class="test-card">\n' +
'    <div class="test-header">\n' +
'      <h1>📝 ' + escapeHtml(exam.title) + '</h1>\n' +
'      <p>' + escapeHtml(exam.description) + '</p>\n' +
'    </div>\n' +
'    <div class="progress-area">\n' +
'      <div class="progress-info">\n' +
'        <span>📊 Progress</span>\n' +
'        <span id="progressCount">0/' + totalQuestionsCount + '</span>\n' +
'      </div>\n' +
'      <div class="progress-bar">\n' +
'        <div class="progress-fill" id="progressFill"></div>\n' +
'      </div>\n' +
'    </div>\n' +
'    <div id="questionsContainerArea">\n' +
'      ' + questionsHTML + '\n' +
'    </div>\n' +
'    <div class="actions-area">\n' +
'      <button id="submitBtn" class="btn btn-primary">✓ Submit Answers</button>\n' +
'      <button id="clearBtn" class="btn btn-secondary">🔄 Clear All Answers</button>\n' +
'      <button id="backBtn" class="btn btn-secondary">← Back to Dashboard</button>\n' +
'    </div>\n' +
'    <div id="resultArea"></div>\n' +
'  </div>\n' +
'</div>\n' +
'\n' +
'<div id="resultModal" class="modal-overlay">\n' +
'  <div class="modal-container">\n' +
'    <div id="modalContent"></div>\n' +
'    <button id="closeModalBtn" class="btn btn-secondary" style="width:100%; margin-top:20px;">Close</button>\n' +
'  </div>\n' +
'</div>\n' +
'\n' +
'<script>\n' +
'var ANSWERS = ' + answersScript + ';\n' +
'var TOTAL_QUESTIONS = ' + totalQuestionsCount + ';\n' +
'var MAX_ATTEMPTS = ' + exam.maxAttempts + ';\n' +
'var POINTS_PER_QUESTION = ' + exam.pointsPerQuestion + ';\n' +
'var TEST_ID = window.location.pathname.split("/").pop().replace(".html", "");\n' +
'var student = localStorage.getItem("currentStudent");\n' +
'if (!student) { window.location.href = "../../index.html"; }\n' +
'var ATTEMPT_KEY = student + "_" + TEST_ID + "_attempts";\n' +
'var attempts = Number(localStorage.getItem(ATTEMPT_KEY)) || 0;\n' +
'if (attempts >= MAX_ATTEMPTS) { alert("No attempts left for this test."); disableTest(); }\n' +
'\n' +
'function updateProgress() {\n' +
'  var inputs = document.querySelectorAll(".answer-input");\n' +
'  var answered = 0;\n' +
'  for (var i = 0; i < inputs.length; i++) {\n' +
'    if (inputs[i].value.trim() !== "") answered++;\n' +
'  }\n' +
'  var percent = (answered / TOTAL_QUESTIONS) * 100;\n' +
'  var fillBar = document.getElementById("progressFill");\n' +
'  if (fillBar) fillBar.style.width = percent + "%";\n' +
'  var countSpan = document.getElementById("progressCount");\n' +
'  if (countSpan) countSpan.innerHTML = answered + "/" + TOTAL_QUESTIONS;\n' +
'}\n' +
'\n' +
'function submitTest() {\n' +
'  var score = 0;\n' +
'  var results = [];\n' +
'  var inputs = document.querySelectorAll(".answer-input");\n' +
'  for (var i = 0; i < inputs.length; i++) { inputs[i].classList.remove("correct", "wrong"); }\n' +
'  for (var i = 0; i < inputs.length; i++) {\n' +
'    var questionNumber = inputs[i].name.replace("q", "");\n' +
'    var studentAnswer = inputs[i].value.trim().toLowerCase();\n' +
'    var correctAnswer = ANSWERS[questionNumber];\n' +
'    if (studentAnswer === correctAnswer) {\n' +
'      score++;\n' +
'      inputs[i].classList.add("correct");\n' +
'      results.push({ num: questionNumber, status: "correct", user: studentAnswer, correct: correctAnswer });\n' +
'    } else if (studentAnswer !== "") {\n' +
'      inputs[i].classList.add("wrong");\n' +
'      results.push({ num: questionNumber, status: "incorrect", user: studentAnswer, correct: correctAnswer });\n' +
'    } else {\n' +
'      results.push({ num: questionNumber, status: "unanswered", user: "—", correct: correctAnswer });\n' +
'    }\n' +
'  }\n' +
'  var finalScore = (score * POINTS_PER_QUESTION).toFixed(1);\n' +
'  var maxScore = (TOTAL_QUESTIONS * POINTS_PER_QUESTION).toFixed(1);\n' +
'  attempts++;\n' +
'  localStorage.setItem(ATTEMPT_KEY, attempts);\n' +
'  localStorage.setItem(TEST_ID + "_result", JSON.stringify({ student: student, score: finalScore, total: maxScore, attempt: attempts, date: new Date().toISOString() }));\n' +
'  var allResults = JSON.parse(localStorage.getItem("examResults") || "[]");\n' +
'  allResults.push({ student: student, testId: TEST_ID, score: finalScore + "/" + maxScore, date: new Date().toLocaleDateString() });\n' +
'  localStorage.setItem("examResults", JSON.stringify(allResults));\n' +
'  var percentage = (score / TOTAL_QUESTIONS) * 100;\n' +
'  var emoji = "", message = "";\n' +
'  if (percentage >= 85) { emoji = "🌟"; message = "Excellent work!"; }\n' +
'  else if (percentage >= 60) { emoji = "👏"; message = "Good job!"; }\n' +
'  else { emoji = "📘"; message = "Keep practicing!"; }\n' +
'  var modalHTML = \'<div style="text-align:center">\' + \'<div style="font-size:3rem">\' + emoji + \'</div>\' + \'<h2 style="color:#166534;margin:10px 0">\' + message + \'</h2>\' + \'<div style="font-size:2rem;font-weight:bold;color:#16a34a">\' + finalScore + \' / \' + maxScore + \'</div>\' + \'<p>✅ Correct: \' + score + \' / \' + TOTAL_QUESTIONS + \'</p>\' + \'<p>🔄 Attempt: \' + attempts + \' / \' + MAX_ATTEMPTS + \'</p>\' + \'<hr style="margin:20px 0">\' + \'<h3>📋 Answer Details</h3>\';\n' +
'  for (var r = 0; r < results.length; r++) {\n' +
'    var icon = results[r].status === "correct" ? "✅" : (results[r].status === "incorrect" ? "❌" : "⭕");\n' +
'    var color = results[r].status === "correct" ? "#16a34a" : (results[r].status === "incorrect" ? "#dc2626" : "#f59e0b");\n' +
'    modalHTML += \'<div style="text-align:left;padding:10px;margin:8px 0;background:#f9fafb;border-radius:12px">\' + \'<span style="display:inline-block;width:30px">\' + icon + \'</span>\' + \'<strong>Question \' + results[r].num + \':</strong><br>\' + \'<span style="margin-left:30px">Your answer: <span style="color:\' + color + \'">\' + results[r].user + \'</span></span><br>\' + \'<span style="margin-left:30px;font-size:0.85rem">Correct: \' + results[r].correct + \'</span>\' + \'</div>\';\n' +
'  }\n' +
'  modalHTML += \'</div>\';\n' +
'  document.getElementById("modalContent").innerHTML = modalHTML;\n' +
'  document.getElementById("resultModal").classList.add("show");\n' +
'  disableTest();\n' +
'}\n' +
'\n' +
'function clearAllAnswers() {\n' +
'  var inputs = document.querySelectorAll(".answer-input");\n' +
'  for (var i = 0; i < inputs.length; i++) {\n' +
'    inputs[i].value = "";\n' +
'    inputs[i].classList.remove("correct", "wrong");\n' +
'  }\n' +
'  updateProgress();\n' +
'}\n' +
'\n' +
'function goBack() {\n' +
'  window.location.href = "grammar_dashboard.html";\n' +
'}\n' +
'\n' +
'function disableTest() {\n' +
'  var elements = document.querySelectorAll(".answer-input, #submitBtn, #clearBtn, #backBtn");\n' +
'  for (var i = 0; i < elements.length; i++) { elements[i].disabled = true; }\n' +
'}\n' +
'\n' +
'function closeModal() { document.getElementById("resultModal").classList.remove("show"); }\n' +
'\n' +
'document.getElementById("submitBtn").addEventListener("click", submitTest);\n' +
'document.getElementById("clearBtn").addEventListener("click", clearAllAnswers);\n' +
'document.getElementById("backBtn").addEventListener("click", goBack);\n' +
'document.getElementById("closeModalBtn").addEventListener("click", closeModal);\n' +
'\n' +
'var allInputs = document.querySelectorAll(".answer-input");\n' +
'for (var i = 0; i < allInputs.length; i++) { allInputs[i].addEventListener("input", updateProgress); }\n' +
'\n' +
'updateProgress();\n' +
'<\/script>\n' +
'</body>\n' +
'</html>';
  }

  // Preview functions
  function refreshPreview() {
    var exam = collectExamData();
    if (!exam) {
      showToast('Please complete all fields first', 'info');
      return;
    }
    
    var htmlData = buildQuestionsHTML(exam);
    previewHTML = buildTestFile(exam, htmlData.sectionsHTML, htmlData.answersScript);
    previewFrame.srcdoc = previewHTML;
    showToast('Preview updated', 'success');
  }

  function togglePreview() {
    if (!validateForm()) {
      showToast('Please complete all fields first', 'info');
      return;
    }
    
    if (previewSection.style.display === 'none') {
      refreshPreview();
      previewSection.style.display = 'block';
      previewBtn.textContent = '🙈 Hide Preview';
      previewSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      previewSection.style.display = 'none';
      previewBtn.textContent = '👁️ Preview';
    }
  }

  function generateAndDownload() {
    if (!validateForm()) {
      showToast('Please complete all fields first', 'info');
      return;
    }
    
    var exam = collectExamData();
    if (!exam) return;
    
    var htmlData = buildQuestionsHTML(exam);
    var outputHTML = buildTestFile(exam, htmlData.sectionsHTML, htmlData.answersScript);
    
    var fileName = exam.title.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.html';
    var blob = new Blob([outputHTML], { type: 'text/html' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast('Test downloaded successfully! 🎉', 'success');
  }

  function saveExam() {
    var exam = collectExamData();
    if (!exam) {
      showToast('Please complete all fields first', 'info');
      return;
    }
    
    var questionsData = [];
    var cards = document.querySelectorAll('.question-card');
    for (var i = 0; i < cards.length; i++) {
      questionsData.push({
        text: cards[i].querySelector('.question-text').value.trim(),
        answer: cards[i].querySelector('.correct-answer').value.trim()
      });
    }
    
    var examId = currentExamId || 'grammar_test_' + Date.now();
    var saved = JSON.parse(localStorage.getItem('grammarTests') || '{}');
    
    saved[examId] = {
      title: exam.title,
      description: exam.description,
      pointsPerQuestion: exam.pointsPerQuestion,
      maxAttempts: exam.maxAttempts,
      bgColor: exam.bgColor,
      sectionTitles: exam.sectionTitles,
      sectionCount: exam.sectionCount,
      questions: questionsData,
      lastModified: new Date().toISOString()
    };
    
    localStorage.setItem('grammarTests', JSON.stringify(saved));
    currentExamId = examId;
    updateWorkflowButtons();
    loadSavedExamsList();
    showToast('Test saved successfully', 'success');
  }

  function loadSavedExamsList() {
    var saved = JSON.parse(localStorage.getItem('grammarTests') || '{}');
    var ids = Object.keys(saved).sort(function(a, b) {
      return new Date(saved[b].lastModified) - new Date(saved[a].lastModified);
    });
    
    if (ids.length === 0) {
      savedExamsList.innerHTML = '<p style="text-align:center">No saved tests found</p>';
      return;
    }
    
    savedExamsList.innerHTML = '';
    for (var i = 0; i < ids.length; i++) {
      var id = ids[i];
      var exam = saved[id];
      var date = new Date(exam.lastModified).toLocaleString();
      var div = document.createElement('div');
      div.className = 'saved-exam-item';
      div.setAttribute('data-id', id);
      div.innerHTML = '<h4>' + escapeHtml(exam.title) + '</h4>' +
        '<p>' + exam.questions.length + ' questions • ' + date + '</p>' +
        '<div style="display:flex; gap:0.5rem; margin-top:0.5rem;">' +
        '<button class="load-action" style="padding:4px 12px;">Load</button>' +
        '<button class="delete-action" style="padding:4px 12px; color:#dc2626;">Delete</button>' +
        '</div>';
      
      div.querySelector('.load-action').addEventListener('click', (function(id) { return function() { loadExam(id); }; })(id));
      div.querySelector('.delete-action').addEventListener('click', (function(id) { return function(e) { e.stopPropagation(); deleteExam(id); }; })(id));
      
      savedExamsList.appendChild(div);
    }
  }

  function loadExam(id) {
    var saved = JSON.parse(localStorage.getItem('grammarTests') || '{}');
    var exam = saved[id];
    if (!exam) return;
    
    testTitle.value = exam.title;
    testDesc.value = exam.description;
    pointsPerQuestion.value = exam.pointsPerQuestion;
    maxAttempts.value = exam.maxAttempts;
    bgColor.value = exam.bgColor;
    sectionCount.value = exam.sectionCount;
    
    updateSectionTitles();
    
    setTimeout(function() {
      var titleInputs = document.querySelectorAll('.section-title');
      for (var i = 0; i < exam.sectionTitles.length; i++) {
        if (titleInputs[i]) titleInputs[i].value = exam.sectionTitles[i];
      }
    }, 50);
    
    questionCount.value = exam.questions.length;
    syncQuestions();
    
    setTimeout(function() {
      var cards = document.querySelectorAll('.question-card');
      for (var i = 0; i < exam.questions.length; i++) {
        if (cards[i]) {
          cards[i].querySelector('.question-text').value = exam.questions[i].text;
          cards[i].querySelector('.correct-answer').value = exam.questions[i].answer;
          validateCard(cards[i]);
        }
      }
      updateTotalScore();
      validateForm();
    }, 50);
    
    currentExamId = id;
    isEditMode = false;
    previewSection.style.display = 'none';
    previewBtn.textContent = '👁️ Preview';
    
    loadModal.classList.remove('show');
    updateWorkflowButtons();
    showToast('Test loaded successfully', 'success');
  }

  function deleteExam(id) {
    if (!confirm('Delete this test permanently?')) return;
    var saved = JSON.parse(localStorage.getItem('grammarTests') || '{}');
    delete saved[id];
    localStorage.setItem('grammarTests', JSON.stringify(saved));
    if (currentExamId === id) {
      currentExamId = null;
      isEditMode = false;
      updateWorkflowButtons();
    }
    loadSavedExamsList();
    showToast('Test deleted', 'success');
  }

  function newExam() {
    var cards = document.querySelectorAll('.question-card');
    if (cards.length > 0 && !confirm('Discard current changes and create a new test?')) return;
    
    testTitle.value = 'Grammar Mega Test';
    testDesc.value = 'Complete each sentence with ONE word only';
    questionCount.value = '3';
    pointsPerQuestion.value = '0.5';
    maxAttempts.value = '2';
    bgColor.value = 'linear-gradient(135deg,#d1fae5,#e0f2fe)';
    sectionCount.value = '1';
    
    updateSectionTitles();
    setTimeout(function() {
      var titleInput = document.querySelector('.section-title');
      if (titleInput) titleInput.value = 'Grammar Test';
    }, 50);
    
    questionsContainer.innerHTML = '';
    for (var i = 0; i < 3; i++) {
      addQuestionCard(null, i);
    }
    
    currentExamId = null;
    isEditMode = false;
    previewSection.style.display = 'none';
    previewBtn.textContent = '👁️ Preview';
    
    updateTotalScore();
    validateForm();
    updateWorkflowButtons();
    showToast('New test created - all data cleared', 'success');
  }

  function enableEditMode() {
    if (!currentExamId) {
      showToast('Save the test first', 'info');
      return;
    }
    isEditMode = true;
    updateWorkflowButtons();
    showToast('Edit mode: make changes and click Save', 'info');
  }

  function showLoadModal() {
    loadSavedExamsList();
    loadModal.classList.add('show');
  }

  function updateWorkflowButtons() {
    editBtn.disabled = !currentExamId || isEditMode;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
      if (m === '&') return '&amp;';
      if (m === '<') return '&lt;';
      if (m === '>') return '&gt;';
      return m;
    });
  }

  function showToast(message, type) {
    var existing = document.querySelector('.toast-notification');
    if (existing) existing.remove();
    
    var toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = '<span>' + (type === 'success' ? '✅' : 'ℹ️') + '</span><span>' + escapeHtml(message) + '</span>';
    document.body.appendChild(toast);
    setTimeout(function() { toast.remove(); }, 3000);
  }

  // Event listeners
  syncQuestionsBtn.addEventListener('click', syncQuestions);
  generateBtn.addEventListener('click', generateAndDownload);
  previewBtn.addEventListener('click', togglePreview);
  refreshPreviewBtn.addEventListener('click', refreshPreview);
  newBtn.addEventListener('click', newExam);
  saveBtn.addEventListener('click', saveExam);
  loadBtn.addEventListener('click', showLoadModal);
  editBtn.addEventListener('click', enableEditMode);
  closeLoadModal.addEventListener('click', function() { loadModal.classList.remove('show'); });
  loadModal.addEventListener('click', function(e) {
    if (e.target === loadModal) loadModal.classList.remove('show');
  });

  // Initialize
  updateSectionTitles();
  for (var i = 0; i < 3; i++) {
    addQuestionCard(null, i);
  }
  updateTotalScore();
  validateForm();
  loadSavedExamsList();
});