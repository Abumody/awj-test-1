document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     AUTO TEST ID
     vocabulary_test1.html → vocabulary_test1
  ================================ */
  const pageName = window.location.pathname.split("/").pop();
  const match = pageName.match(/(vocabulary\d+_test\d+)/);

  if (!match) {
    alert("Invalid test file name");
    return;
  }

  const TEST_ID = match[1];
  const TOTAL_QUESTIONS = 5;
  const MAX_ATTEMPTS = 2;

  /* ===============================
     STUDENT CHECK
  ================================ */
  const student = localStorage.getItem("currentStudent");
  if (!student) {
    window.location.href = "../../index.html";
    return;
  }

  /* ===============================
     LOAD ANSWERS FROM HTML
  ================================ */
  if (!window.ANSWERS) {
    alert("Answers not loaded");
    return;
  }
  const ANSWERS = window.ANSWERS;

  /* ===============================
     ATTEMPTS (Dashboard compatible)
  ================================ */
  const ATTEMPT_KEY = `${student}_${TEST_ID}_attempts`;
  let attempts = Number(localStorage.getItem(ATTEMPT_KEY)) || 0;

  if (attempts >= MAX_ATTEMPTS) {
    alert("No attempts left for this test");
    disableTest();
  }

  /* ===============================
     SUBMIT
  ================================ */
  const submitBtn = document.getElementById("submitBtn");
  if (submitBtn) {
    submitBtn.addEventListener("click", submitTest);
  }

  function submitTest() {

    let score = 0;

    // Remove any existing wrong-answer and correct-answer classes from selects
    document.querySelectorAll("select").forEach(select => {
      select.classList.remove('wrong-answer', 'correct-answer');
    });

    /* ===== Dropdown Answers ===== */
    document.querySelectorAll("select").forEach(select => {
      const q = select.name.replace("q", "");
      if (ANSWERS[q] === select.value) {
        score++;
        select.classList.add('correct-answer');
      } else {
        select.classList.add('wrong-answer');
      }
    });

    /* ===============================
       SAVE ATTEMPTS
    ================================ */
    attempts++;
    localStorage.setItem(ATTEMPT_KEY, attempts);

    /* ===============================
       SAVE RESULT (Test specific)
    ================================ */
    localStorage.setItem(
      `${TEST_ID}_result`,
      JSON.stringify({
        score,
        total: TOTAL_QUESTIONS,
        attempts,
        finishedAt: new Date().toISOString()
      })
    );

    /* ===============================
       SAVE RESULT (Global – results.js compatible)
       🔴 IMPORTANT: Same structure as Listening
    ================================ */
    const allResults =
      JSON.parse(localStorage.getItem("examResults")) || [];

    allResults.push({
      student: student,
      testId: TEST_ID.toLowerCase(),
      score: `${score}/${TOTAL_QUESTIONS}`,
      date: new Date().toLocaleDateString()
    });

    localStorage.setItem("examResults", JSON.stringify(allResults));

    /* ===============================
       SHOW RESULT
    ================================ */
    const resultBox = document.getElementById("result");
    if (resultBox) {
      resultBox.innerHTML = `
        <strong>Test:</strong> ${TEST_ID}<br>
        <strong>Score:</strong> ${score} / ${TOTAL_QUESTIONS}<br>
        <strong>Attempt:</strong> ${attempts} / ${MAX_ATTEMPTS}
      `;
    }

    disableTest();
  }

  /* ===============================
     DISABLE TEST
  ================================ */
  function disableTest() {
    document.querySelectorAll("select, #submitBtn").forEach(el => {
      el.disabled = true;
    });
  }

});