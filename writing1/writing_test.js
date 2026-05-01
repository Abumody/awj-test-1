document.addEventListener("DOMContentLoaded", () => {

/* ===============================
   CONFIG
================================ */
const pageName = window.location.pathname.split("/").pop();
const TEST_ID = pageName.replace(".html", "");
const MAX_ATTEMPTS = 2;

/* ===============================
   STUDENT CHECK
================================ */
const student = localStorage.getItem("currentStudent");

if (!student) {
  window.location.href = "../index.html";
  return;
}

/* ===============================
   ATTEMPTS
================================ */
const ATTEMPT_KEY = `${student}_${TEST_ID}_attempts`;
let attempts = Number(localStorage.getItem(ATTEMPT_KEY)) || 0;

if (attempts >= MAX_ATTEMPTS) {
  alert("No attempts left for this test.");
  document.getElementById("submitBtn").disabled = true;
}

/* ===============================
   WORD COUNTER
================================ */
const box = document.getElementById("writingBox");
const counter = document.getElementById("wordCount");

box.addEventListener("input", () => {
  const words = box.value.trim().split(/\s+/).filter(w => w);
  counter.textContent = `Words: ${words.length}`;
});

/* ===============================
   HIGHLIGHT FUNCTION
================================ */
function highlightErrors(text) {

  let words = text.split(/\s+/);
  let wordCountMap = {};

  words.forEach(w => {
    let clean = w.toLowerCase().replace(/[^\w]/g,"");
    wordCountMap[clean] = (wordCountMap[clean] || 0) + 1;
  });

  let processed = words.map((word, index) => {

    let clean = word.toLowerCase().replace(/[^\w]/g,"");

    // i → I
    if (clean === "i") {
      return `<span class="error" data-tip="Use capital 'I'">${word}</span>`;
    }

    // grammar
    if (clean === "help" && words[index-1]?.toLowerCase() === "it") {
      return `<span class="error" data-tip="Use 'helps' with 'it'">${word}</span>`;
    }

    if (clean === "is" && words[index-1]?.toLowerCase() === "smartphones") {
      return `<span class="error" data-tip="'smartphones' is plural → use 'are'">${word}</span>`;
    }

    // repeated
    if (wordCountMap[clean] > 5 && clean.length > 3) {
      return `<span class="repeat" data-tip="Repeated word too many times">${word}</span>`;
    }

    return word;
  });

  let joined = processed.join(" ");

  let sentences = joined.split(/([.!?])/);

  for (let i = 0; i < sentences.length; i += 2) {

    let sentence = sentences[i];
    if (!sentence) continue;

    let trimmed = sentence.trim();
    if (!trimmed) continue;

    // capital
    if (trimmed[0] === trimmed[0].toLowerCase()) {
      sentences[i] = sentence.replace(
        trimmed[0],
        `<span class="capital" data-tip="Sentence should start with capital letter">${trimmed[0]}</span>`
      );
    }

    // long sentence
    let wc = trimmed.split(/\s+/).length;
    if (wc > 25) {
      sentences[i] = `<span class="long-sentence" data-tip="This sentence is too long">${sentences[i]}</span>`;
    }
  }

  return sentences.join("");
}

/* ===============================
   ANALYZE FUNCTION
================================ */
function analyze(text) {

  let feedback = [];
  const words = text.trim().split(/\s+/).filter(w => w);

  if (words.length < 85) {
    feedback.push("^ → Less than 85 words");
  }

  if (!/[.!?]/.test(text)) {
    feedback.push("P → No punctuation used");
  }

  if (text.match(/\.[A-Za-z]/)) {
    feedback.push("P → Missing space after punctuation");
  }

  if (text.includes("i ")) {
    feedback.push("CL → 'I' should be capital");
  }

  if (text.includes("it help")) {
    feedback.push("T → 'it help' should be 'it helps'");
  }

  if (text.includes("smartphones is")) {
    feedback.push("T → 'smartphones is' should be 'smartphones are'");
  }

  return feedback;
}

/* ===============================
   SUBMIT
================================ */
document.getElementById("submitBtn").addEventListener("click", () => {

  const text = box.value.trim();
  const words = text.split(/\s+/).filter(w => w);

  if (words.length < 85) {
    alert("You must write at least 85 words.");
    return;
  }

  attempts++;
  localStorage.setItem(ATTEMPT_KEY, attempts);

  const feedback = analyze(text);
  const highlightedText = highlightErrors(text);

  /* ===============================
     SCORE
  =============================== */
  let errorCount = feedback.length;
  let score = 5;

  if (errorCount >= 1) score--;
  if (errorCount >= 3) score--;
  if (errorCount >= 5) score--;
  if (errorCount >= 7) score--;

  if (score < 1) score = 1;

  /* ===============================
     SAVE RESULT (🔥 مهم)
  =============================== */

  localStorage.setItem(
    `${TEST_ID}_result`,
    JSON.stringify({
      student: student,
      score: score,
      total: 5,
      attempt: attempts,
      date: new Date().toISOString()
    })
  );

  const allResults =
    JSON.parse(localStorage.getItem("examResults")) || [];

  allResults.push({
    student: student,
    testId: TEST_ID,
    score: `${score}/5`,
    date: new Date().toLocaleDateString()
  });

  localStorage.setItem("examResults", JSON.stringify(allResults));

  /* ===============================
     RESULT DISPLAY
  =============================== */

  const resultBox = document.getElementById("result");

  resultBox.innerHTML = `
    <h3>✍️ Your Writing</h3>
    <p>${highlightedText}</p>

    <hr>

    <h3>Feedback</h3>
    ${feedback.map(f => `<p>${f}</p>`).join("")}

    <h3>🎯 Score: ${score} / 5</h3>

    <br>
    🔁 Attempt: ${attempts} / ${MAX_ATTEMPTS}
  `;

});
});