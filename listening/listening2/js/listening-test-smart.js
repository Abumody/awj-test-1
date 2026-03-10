/* ===============================
   SMART LISTENING TEST ENGINE
   (Shared – Clean & Stable)
================================ */

/* ===============================
   Identify Test from File Name
================================ */
const pageName = window.location.pathname.split("/").pop();
const match = pageName.match(/(listening\d+)_test(\d+)/);

if (!match) {
  alert("Invalid test file name");
  throw new Error("Invalid test naming");
}

const LISTENING_ID = match[1];
const TEST_NUMBER = match[2];
const TEST_ID = `${LISTENING_ID}_test${TEST_NUMBER}`;

/* ===============================
   Student Check
================================ */
const student = localStorage.getItem("currentStudent");
if (!student) {
  window.location.href = "../../index.html";
}

/* ===============================
   Answers Check
================================ */
if (!window.ANSWERS) {
  alert("Answers file not loaded!");
  throw new Error("ANSWERS is undefined");
}

/* ===============================
   Attempts Control
================================ */
const MAX_ATTEMPTS = 2;
const ATTEMPT_KEY = `${student}_${TEST_ID}_attempts`;
let usedAttempts = Number(localStorage.getItem(ATTEMPT_KEY)) || 0;

if (usedAttempts >= MAX_ATTEMPTS) {
  alert("No attempts left for this test.");
  window.location.href = "listening2_dashboard.html";
}

/* ===============================
   Submit Test
================================ */
function submitTest() {

  let score = 0;
  const answers = window.ANSWERS;
  const total = Object.keys(answers).length;

  Object.keys(answers).forEach(qNum => {

    /* ===== SHORT ANSWER ===== */
    const input = document.querySelector(`input[data-q="${qNum}"]`);
    if (input) {
      const user = input.value.trim().toLowerCase();
      const correctList = answers[qNum].map(a => a.toLowerCase());
      if (correctList.includes(user)) score++;
      return;
    }

    /* ===== MCQ ===== */
    const selected = document.querySelector(`input[name="q${qNum}"]:checked`);
    if (selected) {
      const user = selected.value.trim().toLowerCase();
      const correct = answers[qNum].trim().toLowerCase();
      if (user === correct) score++;
    }
  });

  /* ===== Save Attempt ===== */
  localStorage.setItem(ATTEMPT_KEY, usedAttempts + 1);

  /* ===== Save Result ===== */
  const resultData = {
    listening: LISTENING_ID,
    test: TEST_NUMBER,
    score,
    total,
    attempt: usedAttempts + 1,
    date: new Date().toISOString()
  };

  localStorage.setItem(
    `${student}_${TEST_ID}_result`,
    JSON.stringify(resultData)
  );

  /* ===== Show Result ===== */
  const resultBox = document.getElementById("result");
  if (resultBox) {
    resultBox.innerHTML = `
      <h3>Your Score</h3>
      <p>${score} / ${total}</p>
      <p>Attempt ${usedAttempts + 1} of ${MAX_ATTEMPTS}</p>
    `;
  }

  document.getElementById("submitBtn").disabled = true;
}
