(function(){
'use strict';

const planets = [
  ['exam1','Mercury','☿'],
  ['exam2','Venus','♀'],
  ['exam3','Earth','🌍'],
  ['exam4','Mars','♂'],
  ['exam5','Jupiter','♃'],
  ['exam6','Saturn','♄'],
  ['exam7','Uranus','⛢'],
  ['exam8','Neptune','♆'],
  ['exam9','Pluto','♇'],
  ['exam10','Proxima b','🌟'],
  ['exam11','Kepler-452b','🌟'],
  ['exam12','Trappist-1e','🌟'],
  ['exam13','Gliese 581g','🌟'],
  ['exam14','HD 40307g','🌟'],
  ['exam15','Kepler-442b','🌟'],
  ['exam16','Luyten b','🌟'],
  ['exam17','Teegarden b','🌟']
];

const max = {
  listening1:7, listening2:8, grammar:5, vocabulary:5, grammarVocab:5,
  reading1:7, reading2:8, reading3:10, writing1:10, writing2:10
};

const student = localStorage.getItem('currentStudent');

if(!student){
  location.href='index.html';
  return;
}

document.getElementById('studentName').textContent = student;

function total(exam){
  return Object.keys(max).reduce((sum,key)=>sum + (Number(exam[key]) || 0),0);
}

function formatDate(value){
  if(!value) return 'Date not available';
  const d = new Date(value);
  if(isNaN(d.getTime())) return value;
  return d.toLocaleDateString(undefined,{
    day:'2-digit',
    month:'short',
    year:'numeric'
  });
}

function render(){
  const students = JSON.parse(localStorage.getItem('students')) || {};
  const tests = students[student]?.tests || {};
  const container = document.getElementById('resultsContainer');

  const completed = planets.filter(([key]) => tests[key + '_completed'] === true);

  if(!completed.length){
    container.innerHTML = '<div class="empty-results">No completed exams yet.</div>';
    return;
  }

  container.innerHTML = completed.map(([key,name,icon])=>{
    const exam = tests[key] || {};
    const score = total(exam);
    const date = formatDate(tests[key + '_completedAt']);

    return `
      <article class="result-card">
        <div class="planet-orb">${icon}</div>
        <h2>${name}</h2>
        <div class="final-label">Final Score</div>
        <div class="final-score">${score} / 75</div>
        <div class="result-date"><span>📅</span>${date}</div>
      </article>
    `;
  }).join('');
}

window.goHome = function(){
  location.href='home.html';
};

window.logout = function(){
  localStorage.removeItem('currentStudent');
  location.href='index.html';
};

render();
})();