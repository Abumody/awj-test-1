let attempts = 2;

function submitTest() {

    const testId = location.pathname.split("/").pop().replace(".html", "");
    const results = JSON.parse(localStorage.getItem("examResults")) || {};

    if (results[testId] && results[testId].attempts <= 0) {
        alert("No attempts left.");
        return;
    }

    const questions = document.querySelectorAll(".question");
    let score = 0;

    questions.forEach(question => {
        const correctAnswer = question.dataset.answer;
        const selected = question.querySelector("input:checked");

        if (selected && selected.value === correctAnswer) {
            score++;
        }
    });

    const total = questions.length;

    const remainingAttempts = results[testId]
        ? results[testId].attempts - 1
        : attempts - 1;

    results[testId] = {
        section: "Vocabulary",
        score: score,
        total: total,
        attempts: remainingAttempts
    };

    localStorage.setItem("examResults", JSON.stringify(results));

    alert(`Your Score: ${score}/${total}\nRemaining Attempts: ${remainingAttempts}`);

    if (remainingAttempts <= 0) {
        document.querySelector("button").disabled = true;
    }
}
