// reading1-test.js
document.addEventListener("DOMContentLoaded", () => {
  // ========== الإعدادات الثابتة ==========
  const TEST_ID = window.location.pathname
    .split("/")
    .pop()
    .replace(".html", "");

  const TOTAL_QUESTIONS = 7;        // لدينا 7 أسئلة كما في الصور
  const MAX_ATTEMPTS = 2;

  // التحقق من تسجيل الدخول
  const student = localStorage.getItem("currentStudent");
  if (!student) {
    window.location.href = "../../index.html";
    return;
  }

  // ========== الإجابات النموذجية (من الصور) ==========
  const ANSWERS = {
    1: "three",
    2: "his own",
    3: "summer club",
    4: "2016",
    5: "patient",
    6: "fixing vehicles",
    7: "Scotland"
  };

  // ========== إدارة المحاولات ==========
  const ATTEMPT_KEY = `${student}_${TEST_ID}_attempts`;
  let attempts = parseInt(localStorage.getItem(ATTEMPT_KEY)) || 0;

  if (attempts >= MAX_ATTEMPTS) {
    alert("No attempts left for this test.");
    disableTest();
    return;
  }

  // كائن لتخزين إجابات الطالب
  const selectedAnswers = {};

  // ========== تفعيل الأزرار (اختيار الإجابة) ==========
  document.querySelectorAll(".tf-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      const parent = this.closest(".reading-item");
      if (!parent) return;
      const q = parent.dataset.q;

      // إزالة التحديد عن جميع أزرار نفس السؤال
      parent.querySelectorAll(".tf-btn").forEach(b =>
        b.classList.remove("selected")
      );

      // تحديد الزر الحالي
      this.classList.add("selected");
      selectedAnswers[q] = this.dataset.value;
    });
  });

  // ========== زر الإرسال ==========
  document.getElementById("submitBtn").addEventListener("click", submitTest);

  function submitTest() {
    let score = 0;

    // تصحيح جميع العناصر
    document.querySelectorAll(".reading-item").forEach(item => {
      const q = item.dataset.q;
      const correct = ANSWERS[q];
      const selected = selectedAnswers[q];

      // إزالة أي ألوان سابقة
      item.querySelectorAll(".tf-btn").forEach(btn => {
        btn.classList.remove("correct-answer", "wrong-answer");
      });

      if (selected) {
        item.querySelectorAll(".tf-btn").forEach(btn => {
          // إظهار الإجابة الصحيحة دائمًا
          if (btn.dataset.value === correct) {
            btn.classList.add("correct-answer");
          }

          // إذا كانت الإجابة المحددة خاطئة، علّم الزر الخطأ
          if (btn.dataset.value === selected && selected !== correct) {
            btn.classList.add("wrong-answer");
          }
        });

        if (selected === correct) score++;
      }
    });

    // تحديث عدد المحاولات
    attempts++;
    localStorage.setItem(ATTEMPT_KEY, attempts);

    // تخزين نتيجة هذا الاختبار بشكل منفصل
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

    // إضافة نتيجة إلى سجل النتائج العام (examResults)
    const allResults = JSON.parse(localStorage.getItem("examResults")) || [];
    allResults.push({
      student,
      testId: TEST_ID,
      score: `${score}/${TOTAL_QUESTIONS}`,
      date: new Date().toLocaleDateString()
    });
    localStorage.setItem("examResults", JSON.stringify(allResults));

    // عرض النتيجة مع رسالة تحفيزية
    const resultBox = document.getElementById("result");
    let message = score >= 7 ? "👏 Good job!" : "📘 Keep practicing!";
    resultBox.innerHTML = `
      ${message}<br><br>
      🎯 Score: ${score}/${TOTAL_QUESTIONS}<br>
      🔁 Attempt: ${attempts}/${MAX_ATTEMPTS}
    `;

    // تعطيل الاختبار بعد التصحيح (لا يمكن تغيير الإجابات)
    disableTest();
  }

  function disableTest() {
    document.querySelectorAll(".tf-btn, #submitBtn").forEach(el => {
      el.disabled = true;
    });
  }
});