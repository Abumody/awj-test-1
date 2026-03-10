document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     CONFIG
  ================================ */
  const TOTAL_QUESTIONS = 8;
  const MAX_ATTEMPTS = 2;
  const TEST_ID = "listening_test_01";

  /* ===============================
     LOAD ANSWERS
  ================================ */
  if (!window.ANSWERS) {
    alert("Answers are not loaded.");
    return;
  }
  const ANSWERS = window.ANSWERS;

  /* ===============================
     ATTEMPTS
  ================================ */
  let attempts = Number(localStorage.getItem(TEST_ID + "_attempts")) || 0;

  if (attempts >= MAX_ATTEMPTS) {
    alert("No attempts left.");
    disableTest();
    return;
  }

  /* ===============================
     TIMER (10 min)
  ================================ */
  let timeLeft = 10 * 60;
  const timerBox = document.createElement("div");
  timerBox.style.textAlign = "center";
  timerBox.style.fontWeight = "700";
  timerBox.style.marginBottom = "20px";
  timerBox.textContent = "⏱ Time Left: 10:00";

  document.querySelector(".audio-box").after(timerBox);

  const timer = setInterval(() => {
    const min = Math.floor(timeLeft / 60);
    const sec = timeLeft % 60;
    timerBox.textContent = `⏱ Time Left: ${min}:${sec.toString().padStart(2, "0")}`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      submitTest(true);
    }
    timeLeft--;
  }, 1000);

  /* ===============================
     BUTTONS
  ================================ */
  document.getElementById("submitBtn").addEventListener("click", () => submitTest(false));
  document.getElementById("backBtn").addEventListener("click", () => history.back());

  function submitTest(auto) {
    clearInterval(timer);

    let score = 0;

    document.querySelectorAll(".short-answer").forEach(input => {
      const q = input.dataset.q;
      const user = input.value.trim().toLowerCase();
      if (ANSWERS[q]?.includes(user)) score++;
    });

    document.querySelectorAll(".options input:checked").forEach(input => {
      const q = input.name.replace("q", "");
      if (ANSWERS[q] === input.value) score++;
    });

    attempts++;
    localStorage.setItem(TEST_ID + "_attempts", attempts);

    localStorage.setItem(
      TEST_ID + "_result",
      JSON.stringify({ score, total: TOTAL_QUESTIONS })
    );

    document.getElementById("result").innerHTML =
      `Your Score: ${score} / ${TOTAL_QUESTIONS}<br>Attempt: ${attempts} / ${MAX_ATTEMPTS}`;

    disableTest();
  }

  function disableTest() {
    document.querySelectorAll("input, button").forEach(el => el.disabled = true);
  }

});
