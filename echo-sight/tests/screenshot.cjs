// Captures README screenshots by letting the autopilot play real runs in Chrome.
// Usage: npm i playwright-core   then   node tests/screenshot.cjs [path-to-chrome]
const path=require('path'),fs=require('fs');
const {chromium}=require('playwright-core');

const CHROME=process.argv[2]||'C:/Program Files/Google/Chrome/Application/chrome.exe';
const root=path.join(__dirname,'..'),out=path.join(root,'screenshots');
const SHOTS=[
  // level index, which solution list to play, which entry, the run to stop in, the clock time to freeze at, Echo Sight on/off
  {file:'two-watchers-sneaking.png',level:2,source:'ESSolutions',index:2,run:3,at:5.0,sight:true},
  {file:'blind-spot-spotted.png',level:0,source:'ESTraps',index:0,run:2,at:1.97,sight:true},
  {file:'the-figure-first-run.png',level:1,runs:[[['go',7,3],['look',-10],['wait',5]]],run:1,at:2.6,sight:false}
];

(async()=>{
  fs.mkdirSync(out,{recursive:true});
  const browser=await chromium.launch({executablePath:CHROME});
  const page=await browser.newPage({viewport:{width:1280,height:860},deviceScaleFactor:2});
  for(const s of SHOTS){
    await page.goto('file://'+path.join(root,'index.html').replace(/\\/g,'/'));
    await page.addScriptTag({path:path.join(__dirname,'autopilot.js')});
    await page.addScriptTag({path:path.join(__dirname,'solutions.js')});
    await page.evaluate(()=>document.fonts.ready.then(()=>0));
    await page.evaluate(s=>{
      const E=window.ESEngine,G=window.EchoSight,entry=s.runs?{runs:s.runs}:window[s.source][s.index];
      G.loadLevel(s.level);
      G.setDriver(window.ESAutopilot.makePilot(E,E.parseLevel(E.LEVELS[s.level]),entry.runs));
      G.setSpeed(3);G.setSight(s.sight);
    },s);
    await page.waitForFunction(s=>{
      const st=window.EchoSight.status();
      if(st.run===s.run&&st.mode==='run'&&st.tick>=s.at*60){window.EchoSight.setSpeed(0);return true;}
      return false;
    },s,{polling:'raf',timeout:60000});
    await page.waitForTimeout(300);
    await page.locator('.wrap').screenshot({path:path.join(out,s.file)});
    console.log('saved',s.file);
  }
  await browser.close();
})().catch(e=>{console.error(e);process.exit(1);});
