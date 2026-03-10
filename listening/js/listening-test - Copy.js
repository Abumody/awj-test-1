/* ===============================
   STUDENT CHECK
================================ */
const student = localStorage.getItem("currentStudent");
if (!student) {
  window.location.href = "../../index.html";
}

/* ===============================
   AUTO TEST ID
================================ */
const TEST_ID = location.pathname
  .split("/")
  .pop()
  .replace(".html", "")
  .toLowerCase();

const ATTEMPT_KEY = `${student}_${TEST_ID}_attempts`;

/* ===============================
   CONFIG
================================ */
const TOTAL_TIME = 600; // 10 minutes
const MAX_ATTEMPTS = 2;

/* ===============================
   ELEMENTS
================================ */
const timerEl = document.getElementById("timer");
const resultBox = document.getElementById("result");
const submitBtn = document.querySelector("button");

/* ===============================
   ATTEMPTS
================================ */
let attempts = Number(localStorage.getItem(ATTEMPT_KEY)) || 0;
if (attempts >= MAX_ATTEMPTS) lockTest();

/* ===============================
   TIMER
================================ */
let timeLeft = TOTAL_TIME;
const timer = setInterval(() => {
  const min = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const sec = String(timeLeft % 60).padStart(2, "0");
  timerEl.textContent = `${min}:${sec}`;
  timeLeft--;

  if (timeLeft < 0) submitTest();
}, 1000);

/* ===============================
   OPTIONS
================================ */
document.querySelectorAll(".option").forEach(option => {
  option.addEventListener("click", () => {
    if (submitBtn.disabled) return;
    const group = option.closest(".options");
    group.querySelectorAll(".option").forEach(o => o.classList.remove("selected"));
    option.classList.add("selected");
  });
});

/* ===============================
   SUBMIT
================================ */
function submitTest() {
  if (submitBtn.disabled) return;

  clearInterval(timer);
  submitBtn.disabled = true;

  attempts++;
  localStorage.setItem(ATTEMPT_KEY, attempts);

  let score = 0;

  document.querySelectorAll(".question").forEach((q, i) => {
    const correct = ANSWERS[i + 1];
    const selected = q.querySelector(".option.selected");

    q.querySelectorAll(".option").forEach(o =>
      o.classList.remove("correct", "wrong")
    );

    if (selected) {
      if (selected.dataset.value === correct) {
        selected.classList.add("correct");
        score++;
      } else {
        selected.classList.add("wrong");
        q.querySelectorAll(".option").forEach(o => {
          if (o.dataset.value === correct) o.classList.add("correct");
        });
      }
    }
  });

  resultBox.textContent = `Your score: ${score} / 7`;

  saveResult(score);

  if (attempts >= MAX_ATTEMPTS) lockTest();
}

/* ===============================
   LOCK
================================ */
function lockTest() {
  clearInterval(timer);
  submitBtn.disabled = true;
  submitBtn.textContent = "No attempts left";
  document.querySelectorAll(".option").forEach(o => {
    o.style.pointerEvents = "none";
    o.style.opacity = "0.6";
  });
  if (timerEl) timerEl.textContent = "00:00";
}

/* ===============================
   SAVE RESULT
================================ */
function saveResult(score) {
  const results = JSON.parse(localStorage.getItem("results")) || [];
  results.push({
    student,
    test: TEST_ID,
    score,
    date: new Date().toLocaleString()
  });
  localStorage.setItem("results", JSON.stringify(results));
}
