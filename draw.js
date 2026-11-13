// Pure draw engine (shared by the site and the test harness)
(function(root){
function isEx(st,a,b){return a===b||(st.exclusions||[]).some(g=>g.includes(a)&&g.includes(b))}
function ids(st){return st.kids.map(k=>k.id)}
function takenSet(st){const s=new Set();for(const g of ids(st)){const r=st.assign[g];if(r)s.add(r)}return s}
function undrawn(st){return ids(st).filter(g=>!st.assign[g]||!ids(st).includes(st.assign[g]))}
// can the givers in `givers` be matched one-to-one to `recips` honoring rules? (Kuhn's bipartite matching)
function canComplete(st,givers,recips){if(givers.length!==recips.length)return false;const match={};
 function tryG(g,seen){for(const r of recips){if(isEx(st,g,r)||seen.has(r))continue;seen.add(r);if(match[r]===undefined||tryG(match[r],seen)){match[r]=g;return true}}return false}
 for(const g of givers)if(!tryG(g,new Set()))return false;return true}
function eligible(st,g){const t=takenSet(st);return ids(st).filter(r=>!t.has(r)&&!isEx(st,g,r))}
function safeOptions(st,g){const t=takenSet(st);const giversLeft=undrawn(st).filter(x=>x!==g);
 return eligible(st,g).filter(r=>{const recipsLeft=ids(st).filter(x=>!t.has(x)&&x!==r);return canComplete(st,giversLeft,recipsLeft)})}
function randInt(n){if(typeof crypto!=='undefined'&&crypto.getRandomValues){const a=new Uint32Array(1);crypto.getRandomValues(a);return a[0]%n}return Math.floor(Math.random()*n)}
function pick(st,g){const o=safeOptions(st,g);return o.length?o[randInt(o.length)]:null}
function feasible(st){const t=takenSet(st);return canComplete(st,undrawn(st),ids(st).filter(x=>!t.has(x)))}
const api={isEx,eligible,safeOptions,pick,undrawn,feasible,canComplete};
if(typeof module!=='undefined')module.exports=api;else root.Draw=api})(this);
