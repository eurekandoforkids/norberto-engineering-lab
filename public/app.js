const LABELS = {impact:'Impacto',urgency:'Urgência',confidence:'Confiança',effort:'Esforço',risk:'Risco'};
const KEYS = Object.keys(LABELS);
let initiatives = [];
const editor = document.getElementById('editor');
const results = document.getElementById('results');
const error = document.getElementById('error');
const health = document.getElementById('health');
const counter = document.getElementById('counter');
let inFlight = 0;

function node(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = String(text);
  return element;
}

function buildEditors() {
  editor.replaceChildren();
  initiatives.forEach((item, index) => {
    const article = node('article', 'initiative');
    const head = node('div', 'item-head');
    const headings = node('div');
    headings.append(node('strong', '', item.title), node('small', '', `Iniciativa ${index+1} · dados fictícios`));
    head.append(headings,node('span', 'item-id',String(index+1).padStart(2,'0')));
    article.append(head);
    KEYS.forEach(key => {
      const line = node('div','scale-line');
      const id = `${item.id}-${key}`;
      const label = node('label','',LABELS[key]);
      label.htmlFor=id;
      const input = node('input');
      input.id=id;input.type='range';input.min='0';input.max='5';input.step='1';input.value=String(item.scores[key]);
      const out = node('output','',item.scores[key]);
      out.htmlFor=id;
      input.addEventListener('input',() => {
        item.scores[key] = Number(input.value);
        out.textContent=input.value;
        void calculate();
      });
      line.append(label,input,out);
      article.append(line);
    });
    article.append(node('div','hint','Escala 0–5. Para esforço e risco, menor é melhor.'));
    editor.append(article);
  });
}

function buildResults(records) {
  results.replaceChildren();
  counter.textContent = `${records.length} iniciativas`;
  records.forEach((r,index) => {
    const card = node('article','result-card');
    const title = node('div','result-title');
    title.append(node('span','rank',String(index+1).padStart(2,'0')),node('strong','',r.title));
    const score = node('div','result-score');
    score.append(node('strong','',r.score.toFixed(1)),node('small','','/ 100 pontos'));
    const meter=node('div','meter');
    const progress=node('span');progress.style.width=`${Math.max(0,Math.min(100,r.score))}%`;
    meter.append(progress);
    card.append(title,score,node('div','tier',r.tier),meter,node('div','explain',r.explanation));
    results.append(card);
  });
}

async function calculate() {
  const requestId = ++inFlight;
  try {
    const response = await fetch('/api/evaluate',{
      method:'POST',headers:{'content-type':'application/json'},
      body:JSON.stringify({initiatives}),
    });
    if(!response.ok) throw new Error('Não foi possível calcular as iniciativas.');
    const data=await response.json();
    if(requestId!==inFlight) return;
    buildResults(data.results);
    error.hidden=true;
  } catch (cause) {
    if(requestId!==inFlight)return;
    error.textContent=cause instanceof Error?cause.message:'Falha temporária';
    error.hidden=false;
  }
}

(async()=>{
  try {
    const r=await fetch('/api/examples',{cache:'no-store'});
    if(!r.ok)throw new Error('API indisponível.');
    const data=await r.json();
    initiatives=data.initiatives;
    buildEditors();
    await calculate();
    health.textContent='API online · cálculo local ao servidor';
  } catch(cause) {
    health.textContent='API indisponível';
    error.hidden=false;
    error.textContent=cause instanceof Error?cause.message:'Falha de conexão';
  }
})();
