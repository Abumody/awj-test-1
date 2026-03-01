document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     CONFIG
  =============================== */

  // TEST_ID ديناميكي من اسم الصفحة
  const TEST_ID = window.location.pathname
    .split("/")
    .pop()
    .replace(".html", "");

  const TOTAL_QUESTIONS = 10;
  const MAX_ATTEMPTS = 2;

  /* ===============================
     STUDENT CHECK
  =============================== */

  const student = localStorage.getItem("currentStudent");
  if (!student) {
    window.location.href = "../../index.html";
    return;
  }

  if (!window.ANSWERS) {
    alert("Answers not found.");
    return;
  }

  const ANSWERS = window.ANSWERS;

  /* ===============================
     ATTEMPTS
  =============================== */

  const ATTEMPT_KEY = `${student}_${TEST_ID}_attempts`;
  let attempts = parseInt(localStorage.getItem(ATTEMPT_KEY)) || 0;

  if (attempts >= MAX_ATTEMPTS) {
    alert("No attempts left for this test.");
    disableTest();
    return;
  }

  const submitBtn = document.getElementById("submitBtn");
  submitBtn.addEventListener("click", submitTest);

  /* ===============================
     SUBMIT FUNCTION
  =============================== */

  function submitTest() {

    let score = 0;
    const selects = document.querySelectorAll("select");

    // Remove previous colors
    selects.forEach(sel => {
      sel.classList.remove("correct-answer", "wrong-answer");
    });

    selects.forEach(sel => {

      const qNumber = sel.name.replace("q", "");
      const studentAnswer = sel.value;
      const correctAnswer = ANSWERS[qNumber];

      if (studentAnswer === correctAnswer) {
        score++;
        sel.classList.add("correct-answer");
      } else {
        sel.classList.add("wrong-answer");
      }

    });

    /* Save attempt */
    attempts++;
    localStorage.setItem(ATTEMPT_KEY, attempts);

    /* Save detailed result */
    localStorage.setItem(
      `${TEST_ID}_result`,
      JSON.stringify({
        student: student,
        score: score,
        total: TOTAL_QUESTIONS,
        attempt: attempts,
        date: new Date().toISOString()
      })
    );

    /* Save global result (Results page compatible) */
    const allResults =
      JSON.parse(localStorage.getItem("examResults")) || [];

    allResults.push({
      student: student,
      testId: TEST_ID,
      score: `${score}/${TOTAL_QUESTIONS}`,
      date: new Date().toLocaleDateString()
    });

    localStorage.setItem("examResults", JSON.stringify(allResults));

    /* Show result */
    const resultBox = document.getElementById("result");

    let message = "";

    if (score >= 9) {
      message = "🌟 Excellent work!";
    } else if (score >= 6) {
      message = "👏 Good job!";
    } else {
      message = "📘 Keep practicing!";
    }

    resultBox.innerHTML = `
      ${message}<br><br>
      🎯 Score: ${score}/${TOTAL_QUESTIONS}<br>
      🔁 Attempt: ${attempts}/${MAX_ATTEMPTS}
    `;

    disableTest();
  }

  /* ===============================
     DISABLE TEST
  =============================== */

  function disableTest() {
    document.querySelectorAll("select, #submitBtn")
      .forEach(el => el.disabled = true);
  }

});