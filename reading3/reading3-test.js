document.addEventListener("DOMContentLoaded", () => {

  const TEST_ID = "reading3_test1";
  const MAX_ATTEMPTS = 2;

  const student = localStorage.getItem("currentStudent");
  if (!student) {
    window.location.href = "../index.html";
    return;
  }

  if (!window.ANSWERS) {
    console.error("ANSWERS not found.");
    return;
  }

  const ANSWERS = window.ANSWERS;
  const TOTAL_QUESTIONS = Object.keys(ANSWERS).length;

  const ATTEMPT_KEY = `${student}_${TEST_ID}_attempts`;
  let attempts = parseInt(localStorage.getItem(ATTEMPT_KEY)) || 0;

  if (attempts >= MAX_ATTEMPTS) {
    alert("No attempts left for this test.");
    disableTest();
    return;
  }

  const selectedAnswers = {};

  /* ===============================
     NORMALIZE FUNCTION
  ================================ */
  function normalize(text){
    return text
      .toLowerCase()
      .replace(/\bthe\b/g,"")
      .replace(/s\b/g,"")
      .replace(/\s+/g," ")
      .trim();
  }

  /* ===============================
     MCQ CLICK
  ================================ */
  document.querySelectorAll(".tf-btn").forEach(btn => {
    btn.addEventListener("click", function () {

      const parent = this.closest(".reading-item");
      const q = parent.dataset.q;

      parent.querySelectorAll(".tf-btn").forEach(b =>
        b.classList.remove("selected")
      );

      this.classList.add("selected");
      selectedAnswers[q] = this.dataset.value;
    });
  });

  /* ===============================
     SUBMIT
  ================================ */
  document.getElementById("submitBtn").addEventListener("click", submitTest);

  function submitTest(){

    let score = 0;

    document.querySelectorAll(".reading-item").forEach(item => {

      const q = item.dataset.q;
      const correct = ANSWERS[q];

      /* ===== SHORT ANSWER ===== */
      const input = item.querySelector(".short-answer");

      if(input){

        const value = normalize(input.value);

        let isCorrect = false;

        if(Array.isArray(correct)){
          isCorrect = correct.some(ans =>
            normalize(ans) === value
          );
        } else {
          isCorrect = normalize(correct) === value;
        }

        if(isCorrect){
          score++;
          input.style.borderColor = "#16a34a";
        } else {
          input.style.borderColor = "#dc2626";
        }

        return;
      }

      /* ===== MULTIPLE CHOICE ===== */
      const selected = selectedAnswers[q];

      item.querySelectorAll(".tf-btn").forEach(btn => {
        btn.classList.remove("correct-answer","wrong-answer");

        if(btn.dataset.value === correct){
          btn.classList.add("correct-answer");
        }

        if(btn.dataset.value === selected && selected !== correct){
          btn.classList.add("wrong-answer");
        }
      });

      if(selected === correct) score++;
    });

    attempts++;
    localStorage.setItem(ATTEMPT_KEY, attempts);

    /* ===============================
       SAVE RESULT
    ================================ */
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

    const allResults = JSON.parse(localStorage.getItem("examResults")) || [];
    allResults.push({
      student,
      testId: TEST_ID,
      score: `${score}/${TOTAL_QUESTIONS}`,
      date: new Date().toLocaleDateString()
    });
    localStorage.setItem("examResults", JSON.stringify(allResults));

    /* ===============================
       RESULT DISPLAY
    ================================ */
    const resultBox = document.getElementById("result");

    let message = score >= 6
      ? "👏 Excellent work!"
      : "📘 Keep practicing!";

    resultBox.innerHTML = `
      ${message}<br><br>
      🎯 Score: ${score}/${TOTAL_QUESTIONS}<br>
      🔁 Attempt: ${attempts}/${MAX_ATTEMPTS}
    `;

    disableTest();
  }

  /* ===============================
     DISABLE AFTER SUBMIT
  ================================ */
  function disableTest(){
    document.querySelectorAll(".tf-btn, #submitBtn, .short-answer")
      .forEach(el => el.disabled = true);
  }

});