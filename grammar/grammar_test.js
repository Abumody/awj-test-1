document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     CONFIG
  =============================== */
  const TEST_ID = "grammar1_test1";
  const TOTAL_QUESTIONS = 15;
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
  let attempts = Number(localStorage.getItem(ATTEMPT_KEY)) || 0;

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

    const inputs = document.querySelectorAll("input[type='text']");

    // Remove any existing wrong-answer and correct-answer classes
    inputs.forEach(input => {
      input.classList.remove('wrong-answer', 'correct-answer');
    });

    inputs.forEach(input => {

      const questionNumber = input.name.replace("q", "");
      const studentAnswer = input.value.trim().toLowerCase();
      const correctAnswer = ANSWERS[questionNumber];

      if (studentAnswer === correctAnswer) {
        score++;
        input.classList.add('correct-answer');
      } else {
        input.classList.add('wrong-answer');
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

    /* Save global result (dashboard compatible) */
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

    if (score >= 13) {
      message = "🌟 Excellent work!";
    } else if (score >= 9) {
      message = "👏 Good job!";
    } else {
      message = "📘 Keep practicing!";
    }

    resultBox.innerHTML = `
      ${message} <br><br>
      🎯 Score: ${score} / ${TOTAL_QUESTIONS} <br>
      🔁 Attempt: ${attempts} / ${MAX_ATTEMPTS}
    `;

    disableTest();
  }

  /* ===============================
     DISABLE TEST
  =============================== */
  function disableTest() {
    document.querySelectorAll("input, #submitBtn").forEach(el => {
      el.disabled = true;
    });
  }

});