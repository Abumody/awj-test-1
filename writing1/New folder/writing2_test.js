document.addEventListener("DOMContentLoaded", () => {

/* CONFIG */
const pageName = window.location.pathname.split("/").pop();
const TEST_ID = pageName.replace(".html", "");
const MAX_ATTEMPTS = 2;

const student = localStorage.getItem("currentStudent");
if (!student) {
  window.location.href = "../index.html";
  return;
}

/* ATTEMPTS */
const ATTEMPT_KEY = `${student}_${TEST_ID}_attempts`;
let attempts = Number(localStorage.getItem(ATTEMPT_KEY)) || 0;

if (attempts >= MAX_ATTEMPTS) {
  alert("No attempts left");
  document.getElementById("submitBtn").disabled = true;
}

/* WORD COUNT */
const box = document.getElementById("writingBox");
const counter = document.getElementById("wordCount");

box.addEventListener("input", () => {
  const words = box.value.trim().split(/\s+/).filter(w => w);
  counter.textContent = `Words: ${words.length}`;
});

/* HIGHLIGHT */
function highlightErrors(text) {

  let tokens = text.split(/(\s+)/);
  let map = {};

  tokens.forEach(t=>{
    let c=t.toLowerCase().replace(/[^\w]/g,"");
    if(c) map[c]=(map[c]||0)+1;
  });

  let processed = tokens.map((t,i)=>{

    if(t.trim()==="") return t;

    let c=t.toLowerCase().replace(/[^\w]/g,"");

    if(c==="i"){
      return `<span class="error" data-tip="Use capital I">${t}</span>`;
    }

    if(c==="help" && tokens[i-1]?.toLowerCase().includes("it")){
      return `<span class="error" data-tip="Use helps">${t}</span>`;
    }

    if(map[c]>5 && c.length>3){
      return `<span class="repeat" data-tip="Repeated word">${t}</span>`;
    }

    return t;
  });

  return processed.join("");
}

/* ANALYZE */
function analyze(text){

  let f=[];
  let words=text.split(/\s+/).filter(w=>w);

  if(words.length<100){
    f.push("^ Less than 100 words");
  }

  if(!/[.!?]/.test(text)){
    f.push("P Missing punctuation");
  }

  if(text.includes("i ")){
    f.push("CL 'I' should be capital");
  }

  return f;
}

/* SUBMIT */
document.getElementById("submitBtn").addEventListener("click",()=>{

  const text=box.value.trim();
  const words=text.split(/\s+/).filter(w=>w);

  if(words.length<100){
    alert("Write at least 100 words");
    return;
  }

  attempts++;
  localStorage.setItem(ATTEMPT_KEY,attempts);

  const feedback=analyze(text);
  const highlighted=highlightErrors(text);

  /* SCORE /10 */
  let score=10;
  let e=feedback.length;

  if(e>=1) score-=2;
  if(e>=3) score-=2;
  if(e>=5) score-=2;
  if(e>=7) score-=2;

  if(score<2) score=2;

  /* SAVE */
  const allResults=
    JSON.parse(localStorage.getItem("examResults"))||[];

  allResults.push({
    student,
    testId:TEST_ID,
    score:`${score}/10`,
    date:new Date().toLocaleDateString()
  });

  localStorage.setItem("examResults",JSON.stringify(allResults));

  /* DISPLAY */
  document.getElementById("result").innerHTML=`
    <h3>Your Writing</h3>
    <p>${highlighted}</p>

    <hr>

    ${feedback.map(x=>`<p>${x}</p>`).join("")}

    <h3>Score: ${score} / 10</h3>
    Attempt: ${attempts}/2
  `;
});

});