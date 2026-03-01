/* ===============================
   STUDENT CHECK
================================ */
const student = localStorage.getItem("currentStudent");
if (!student) {
  window.location.href = "index.html";
}

/* ===============================
   SHOW STUDENT NAME
================================ */
const nameBox = document.getElementById("studentName");
if (nameBox) {
  nameBox.textContent = student;
}

/* ===============================
   ELEMENTS
================================ */
const resultsBody = document.getElementById("resultsBody");
const summaryBox = document.getElementById("summary");
const skillFilter = document.getElementById("skillFilter");

/* ===============================
   LOAD RESULTS
================================ */
const allResults =
  JSON.parse(localStorage.getItem("examResults")) || [];

/* ===============================
   FILTER BY STUDENT
================================ */
const studentResults = allResults.filter(
  r => r.student === student
);

/* ===============================
   NO RESULTS CASE
================================ */
if (studentResults.length === 0) {
  summaryBox.textContent = "No results available yet.";
} else {
  summaryBox.textContent = `Total tests taken: ${studentResults.length}`;
}

/* ===============================
   BUILD SKILL FILTER
================================ */
const skills = new Set();

studentResults.forEach(r => {
  const skill = getSkillFromTestId(r.testId);
  skills.add(skill);
});

skills.forEach(skill => {
  const opt = document.createElement("option");
  opt.value = skill;
  opt.textContent = skill;
  skillFilter.appendChild(opt);
});

/* ===============================
   RENDER TABLE
================================ */
function renderResults(filter = "all") {

  resultsBody.innerHTML = "";

  const filtered = studentResults.filter(r => {
    if (filter === "all") return true;
    return getSkillFromTestId(r.testId) === filter;
  });

  filtered.forEach(r => {

    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${r.date}</td>
      <td>${getSkillFromTestId(r.testId)}</td>
      <td>${getSectionFromTestId(r.testId)}</td>
      <td>${r.testId.toUpperCase()}</td>
      <td>${r.score}</td>
    `;

    resultsBody.appendChild(tr);
  });
}

/* ===============================
   FILTER HANDLER
================================ */
skillFilter.addEventListener("change", e => {
  renderResults(e.target.value);
});

/* ===============================
   HELPERS
================================ */

function getSkillFromTestId(testId) {

  if (!testId) return "Other";

  if (/^listening/i.test(testId)) return "Listening";
  if (/^reading/i.test(testId)) return "Reading";
  if (/^writing/i.test(testId)) return "Writing";
  if (/^vocabulary/i.test(testId)) return "Vocabulary";
  if (/^grammar/i.test(testId)) return "Grammar";
  if (/^gramvoc/i.test(testId)) return "Grammar/Vocabulary";

  return "Other";
}

function getSectionFromTestId(testId) {

  if (!testId) return "Unknown";

  let match;

  // Listening
  match = testId.match(/^listening(\d+)_?test(\d+)$/i);
  if (match)
    return `Listening ${match[1]} - Test ${match[2]}`;

  // Reading
  match = testId.match(/^reading(\d+)_?test(\d+)$/i);
  if (match)
    return `Reading ${match[1]} - Test ${match[2]}`;

  // Writing
  match = testId.match(/^writing(\d+)_?test(\d+)$/i);
  if (match)
    return `Writing ${match[1]} - Test ${match[2]}`;

  // Vocabulary
  match = testId.match(/^vocabulary(\d+)_?test(\d+)$/i);
  if (match)
    return `Vocabulary ${match[1]} - Test ${match[2]}`;

  // Grammar
  match = testId.match(/^grammar(\d+)_?test(\d+)$/i);
  if (match)
    return `Grammar ${match[1]} - Test ${match[2]}`;

  // Grammar/Vocabulary
  match = testId.match(/^gramvoc[_-]?test?(\d+)$/i);
  if (match)
    return `Grammar/Vocabulary - Test ${match[1]}`;

  return "Unknown";
}

/* ===============================
   NAVIGATION
================================ */
function goHome() {
  window.location.href = "home.html";
}

/* ===============================
   INIT
================================ */
renderResults();