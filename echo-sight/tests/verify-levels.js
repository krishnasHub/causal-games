// Checks that every level is winnable with its reference solution, can't be won by walking straight to the exit,
// and that each trap (the obvious mistake) is blocked.  Usage: node tests/verify-levels.js
const fs=require('fs'),path=require('path'),vm=require('vm');
const dir=__dirname,html=fs.readFileSync(path.join(dir,'..','index.html'),'utf8');
const engine=html.match(/<script id="engine">([\s\S]*?)<\/script>/)[1];
const ctx=vm.createContext({Math});
vm.runInContext(engine,ctx);
vm.runInContext(fs.readFileSync(path.join(dir,'autopilot.js'),'utf8'),ctx);
vm.runInContext(fs.readFileSync(path.join(dir,'solutions.js'),'utf8'),ctx);
const E=ctx.ESEngine,P=ctx.ESAutopilot;

let failed=0;
const show=log=>log.forEach(r=>console.log(`       run ${r.run}: ${r.outcome} at ${r.time.toFixed(2)}s${r.paradoxes.length?'  paradox: '+r.paradoxes.join(', '):''}`));
E.LEVELS.forEach((L,i)=>{
  const rows=L.map,bad=rows.findIndex(r=>r.length!==rows[0].length);
  if(bad>=0){console.log(`FAIL ${i+1}. ${L.name}: row ${bad} has width ${rows[bad].length}, expected ${rows[0].length}`);failed++;return;}
  const sol=ctx.ESSolutions[i],log=P.playSolution(E,i,sol.runs),last=log[log.length-1];
  const ok=log.length===sol.runs.length&&last.outcome==='won'&&log.every(r=>!r.paradoxes.length);
  const lv=E.parseLevel(L);
  let soloBlocked=true; // no route at all from the start also counts as blocked
  try{soloBlocked=P.playSolution(E,i,[[['go',lv.exit.x,lv.exit.y]]])[0].outcome!=='won';}catch(e){}
  if(!ok||!soloBlocked)failed++;
  console.log(`${ok&&soloBlocked?'PASS':'FAIL'} ${i+1}. ${L.name}`);show(log);
  if(!soloBlocked)console.log('       solo run reached the exit, so the level is too easy');
});
for(const t of ctx.ESTraps){
  const log=P.playSolution(E,t.level,t.runs),caught=!log.some(r=>r.outcome==='won');
  if(!caught)failed++;
  console.log(`${caught?'PASS':'FAIL'} trap on level ${t.level+1} (${t.name})`);show(log);
}
console.log(failed?`\n${failed} check(s) failed`:'\nAll levels verified');
process.exit(failed?1:0);
