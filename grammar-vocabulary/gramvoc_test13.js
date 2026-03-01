document.addEventListener("DOMContentLoaded", () => {

/* ===============================
   CONFIG
================================ */

const TEST_ID = window.location.pathname
  .split("/")
  .pop()
  .replace(".html", "");

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

if (!window.ANSWERS) {
  alert("Answers not found.");
  return;
}

const ANSWERS = window.ANSWERS;

/* ===============================
   ATTEMPTS
================================ */

const ATTEMPT_KEY = `${student}_${TEST_ID}_attempts`;
let attempts = parseInt(localStorage.getItem(ATTEMPT_KEY)) || 0;

if (attempts >= MAX_ATTEMPTS) {
  alert("No attempts left for this test.");
  disableTest();
  return;
}

document
  .getElementById("submitBtn")
  .addEventListener("click", submitTest);

/* ===============================
   SUBMIT
================================ */

function submitTest() {

  let score = 0;
  const selects = document.querySelectorAll("select");

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

  attempts++;
  localStorage.setItem(ATTEMPT_KEY, attempts);

  localStorage.setItem(
    `${TEST_ID}_result`,
    JSON.stringify({
      student,
      score,
      total: TOTAL_QUESTIONS,
      attempt: attempts,
      date: new Date().toISOString()
    })
  );

  const allResults =
    JSON.parse(localStorage.getItem("examResults")) || [];

  allResults.push({
    student,
    testId: TEST_ID,
    score: `${score}/${TOTAL_QUESTIONS}`,
    date: new Date().toLocaleDateString()
  });

  localStorage.setItem("examResults", JSON.stringify(allResults));

  const resultBox = document.getElementById("result");

  let message = "";

  if (score === 5) message = "🌟 Excellent!";
  else if (score >= 3) message = "👏 Good job!";
  else message = "📘 Keep practicing!";

  resultBox.innerHTML = `
    ${message}<br><br>
    🎯 Score: ${score}/${TOTAL_QUESTIONS}<br>
    🔁 Attempt: ${attempts}/${MAX_ATTEMPTS}
  `;

  disableTest();
}

/* ===============================
   DISABLE
================================ */

function disableTest() {
  document
    .querySelectorAll("select, #submitBtn")
    .forEach(el => el.disabled = true);
}

});