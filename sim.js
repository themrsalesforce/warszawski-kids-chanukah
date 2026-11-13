const D=require('./draw.js');const seed=require('./seed.json');let fails=0,N=3000;const recvCount={};
for(let t=0;t<N;t++){const st={kids:seed.kids,exclusions:seed.exclusions,assign:{}};
 const order=st.kids.map(k=>k.id).sort(()=>Math.random()-.5);
 for(const g of order){const r=D.pick(st,g);if(!r){fails++;break}st.assign[g]=r}
 const vals=Object.values(st.assign);const ok=Object.keys(st.assign).length===17&&new Set(vals).size===17&&Object.entries(st.assign).every(([g,r])=>!D.isEx(st,g,r));
 if(!ok)fails++;else{const k='abie>'+st.assign.abie;recvCount[k]=(recvCount[k]||0)+1}}
// also stress: random extra exclusion groups
let hard=0;for(let t=0;t<2000;t++){const ids=seed.kids.map(k=>k.id).sort(()=>Math.random()-.5);const ex=[ids.slice(0,4),ids.slice(4,7),ids.slice(7,10),ids.slice(10,12)];const st={kids:seed.kids,exclusions:ex,assign:{}};
 if(!D.feasible(st))continue;for(const g of [...ids].sort(()=>Math.random()-.5)){const r=D.pick(st,g);if(!r){hard++;break}st.assign[g]=r}
 const vals=Object.values(st.assign);if(Object.keys(st.assign).length!==17||new Set(vals).size!==17||Object.entries(st.assign).some(([g,r])=>D.isEx(st,g,r)))hard++}
console.log(`real rules: ${N} full draw sequences, failures=${fails}`);console.log('stress (extra random sibling groups): failures='+hard);console.log('Abie recipient spread:',recvCount)
