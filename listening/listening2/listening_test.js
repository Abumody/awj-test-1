document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     AUTO TEST ID (NO HARDCODE)
     from file name: listening2_test1.html
  ================================ */
  const pageName = window.location.pathname.split("/").pop();
  const match = pageName.match(/(listening\d+_test\d+)/);

  if (!match) {
    alert("Invalid test file name");
    return;
  }

  const TEST_ID = match[1]; // listening2_test1

  const TOTAL_QUESTIONS = 8;
  const MAX_ATTEMPTS = 2;

  /* ===============================
     SESSION GUARD
  ================================ */
  if (!localStorage.getItem("currentStudent")) {
    localStorage.setItem("currentStudent", "student_temp");
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
     ATTEMPTS
  ================================ */
  let attempts =
    Number(localStorage.getItem(TEST_ID + "_attempts")) || 0;

  if (attempts >= MAX_ATTEMPTS) {
    alert("No attempts left for this test");
    disableTest();
  }

  /* ===============================
     TIMER (10 min)
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

  function submitTest(auto) {
    clearInterval(timer);

    let score = 0;

    /* Short answers */
    document.querySelectorAll(".short-answer").forEach(input => {
      const q = input.dataset.q;
      const user = input.value.trim().toLowerCase();
      if (ANSWERS[q]?.includes(user)) score++;
    });

    /* MCQ */
    document.querySelectorAll(".options input:checked").forEach(input => {
      const q = input.name.replace("q", "");
      if (ANSWERS[q] === input.value) score++;
    });

    attempts++;
    localStorage.setItem(TEST_ID + "_attempts", attempts);

    const resultData = {
      score,
      total: TOTAL_QUESTIONS,
      attempts,
      finishedAt: new Date().toISOString()
    };

    /* ===============================
       SAVE RESULT
    ================================ */
    localStorage.setItem(
      TEST_ID + "_result",
      JSON.stringify(resultData)
    );

    /* ===============================
       🔥 LINK WITH EXISTING RESULTS PAGE
    ================================ */
    localStorage.setItem("currentTest", TEST_ID);

    const resultBox = document.getElementById("result");
    if (resultBox) {
      resultBox.innerHTML = `
        Score: ${score}/${TOTAL_QUESTIONS}<br>
        Attempt: ${attempts}/${MAX_ATTEMPTS}<br><br>
        <a href="results.html" class="back-link">View Results</a>
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
