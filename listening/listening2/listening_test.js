document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     AUTO TEST ID (from file name)
     listening2_test1.html → listening2_test1
  ================================ */
  const pageName = window.location.pathname.split("/").pop();
  const match = pageName.match(/(listening\d+_test\d+)/);

  if (!match) {
    alert("Invalid test file name");
    return;
  }

  const TEST_ID = match[1];

  const TOTAL_QUESTIONS = 8;
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
     LOAD ANSWERS (FROM HTML)
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
     TIMER (10 minutes)
  ================================ */
  let timeLeft = 10 * 60;
  const timerBox = document.createElement("div");
  timerBox.style.textAlign = "center";
  timerBox.style.fontWeight = "700";
  timerBox.style.marginBottom = "20px";

  const audioBox = document.querySelector(".audio-box");
  if (audioBox) audioBox.after(timerBox);

  const timer = setInterval(() => {
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    timerBox.textContent = `⏱ ${m}:${s.toString().padStart(2, "0")}`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      submitTest(true);
    }
    timeLeft--;
  }, 1000);

  /* ===============================
     SUBMIT
  ================================ */
  const submitBtn = document.getElementById("submitBtn");
  if (submitBtn) {
    submitBtn.addEventListener("click", () => submitTest(false));
  }

  function submitTest(autoSubmit) {
    clearInterval(timer);

    let score = 0;

    /* ===== Short Answers ===== */
    document.querySelectorAll(".short-answer").forEach(input => {
      const q = input.dataset.q;
      const user = input.value.trim().toLowerCase();
      if (ANSWERS[q]?.includes(user)) score++;
    });

    /* ===== MCQ ===== */
    document.querySelectorAll(".options input:checked").forEach(input => {
      const q = input.name.replace("q", "");
      if (ANSWERS[q] === input.value) score++;
    });

    /* ===============================
       SAVE ATTEMPTS (Dashboard)
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
       SAVE RESULT (Global – results.js)
    ================================ */
    const allResults =
      JSON.parse(localStorage.getItem("examResults")) || [];

    allResults.push({
      student: student,
      testId: TEST_ID,
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
    document.querySelectorAll("input, #submitBtn").forEach(el => {
      el.disabled = true;
    });
  }

});
