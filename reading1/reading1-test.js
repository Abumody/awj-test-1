document.addEventListener("DOMContentLoaded", () => {

  const TEST_ID = window.location.pathname
    .split("/")
    .pop()
    .replace(".html", "");

  const TOTAL_QUESTIONS = 5;
  const MAX_ATTEMPTS = 2;

  const student = localStorage.getItem("currentStudent");
  if (!student) {
    window.location.href = "../../index.html";
    return;
  }

  const ANSWERS = window.ANSWERS;

  const ATTEMPT_KEY = `${student}_${TEST_ID}_attempts`;
  let attempts = parseInt(localStorage.getItem(ATTEMPT_KEY)) || 0;

  if (attempts >= MAX_ATTEMPTS) {
    alert("No attempts left for this test.");
    disableTest();
    return;
  }

  const selectedAnswers = {};

  // Handle button selection
  document.querySelectorAll(".tf-btn").forEach(btn => {
    btn.addEventListener("click", function() {

      const parent = this.closest(".reading-item");
      const q = parent.dataset.q;

      parent.querySelectorAll(".tf-btn").forEach(b =>
        b.classList.remove("selected")
      );

      this.classList.add("selected");
      selectedAnswers[q] = this.dataset.value;
    });
  });

  document.getElementById("submitBtn")
    .addEventListener("click", submitTest);

  function submitTest() {

    let score = 0;

    document.querySelectorAll(".reading-item")
      .forEach(item => {

        const q = item.dataset.q;
        const correct = ANSWERS[q];
        const selected = selectedAnswers[q];

        item.querySelectorAll(".tf-btn")
          .forEach(btn => {
            btn.classList.remove("correct-answer","wrong-answer");
          });

        if (selected) {

          item.querySelectorAll(".tf-btn")
            .forEach(btn => {

              if (btn.dataset.value === correct) {
                btn.classList.add("correct-answer");
              }

              if (btn.dataset.value === selected &&
                  selected !== correct) {
                btn.classList.add("wrong-answer");
              }

            });

          if (selected === correct) score++;
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

    localStorage.setItem("examResults",
      JSON.stringify(allResults));

    const resultBox = document.getElementById("result");

    let message = score >= 4 ?
      "👏 Good job!" :
      "📘 Keep practicing!";

    resultBox.innerHTML = `
      ${message}<br><br>
      🎯 Score: ${score}/${TOTAL_QUESTIONS}<br>
      🔁 Attempt: ${attempts}/${MAX_ATTEMPTS}
    `;

    disableTest();
  }

  function disableTest() {
    document.querySelectorAll(".tf-btn, #submitBtn")
      .forEach(el => el.disabled = true);
  }

});