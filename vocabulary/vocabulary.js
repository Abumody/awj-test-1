function goHome() {
  window.location.href = "../home.html";
}

/* ===============================
   Student Check
================================ */
const student = localStorage.getItem("currentStudent");
if (!student) {
  window.location.href = "../../home.html";
}

/* ===============================
   Show Student Name
================================ */
const nameBox = document.getElementById("studentName");
if (nameBox) {
  nameBox.textContent = student;
}

/* ===============================
   Config
================================ */
const TOTAL_TESTS = 12;
const MAX_ATTEMPTS = 2;
const grid = document.getElementById("testsGrid");

/* ===============================
   Generate Test Cards
================================ */
for (let i = 1; i <= TOTAL_TESTS; i++) {

  const TEST_ID = `vocabulary1_test${i}`;
  const ATTEMPT_KEY = `${student}_${TEST_ID}_attempts`;

  const used = Number(localStorage.getItem(ATTEMPT_KEY)) || 0;
  const left = MAX_ATTEMPTS - used;

  const card = document.createElement("div");
  card.className = "test-card";

  const title = document.createElement("h3");
  title.textContent = `Vocabulary1 Test ${i}`;

  const attempts = document.createElement("p");
  attempts.className = "attempts";

  const button = document.createElement("button");

  if (left <= 0) {
    attempts.textContent = "Locked – No attempts left";
    button.textContent = "Locked";
    button.disabled = true;
  } else {
    attempts.textContent = `Attempts left: ${left}`;
    button.textContent = "Start";
    button.onclick = () => {
      window.location.href = `vocabulary1_test${i}.html`;
    };
  }

  card.appendChild(title);
  card.appendChild(attempts);
  card.appendChild(button);

  grid.appendChild(card);
}
