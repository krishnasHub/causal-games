// Captures README screenshots by letting the autopilot play real runs in Chrome.
// Usage: npm i playwright-core   then   node tests/screenshot.cjs [path-to-chrome]
const path=require('path'),fs=require('fs');
const {chromium}=require('playwright-core');

const CHROME=process.argv[2]||'C:/Program Files/Google/Chrome/Application/chrome.exe';
const root=path.join(__dirname,'..'),out=path.join(root,'screenshots');
const SHOTS=[
  // level index, which solution list to play, which entry, the run to stop in, and the clock time to freeze at
  {file:'lockstep-causal-diamond.png',level:6,source:'CDSolutions',index:6,run:3,at:2.6},
  {file:'paradox-shutter.png',level:3,source:'CDTraps',index:1,run:3,at:5.2}
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
      const E=window.CDEngine,G=window.CausalDiamond,entry=window[s.source][s.index];
      document.getElementById('intro').close();
      G.loadLevel(s.level);
      G.setDriver(window.CDAutopilot.makePilot(E,E.parseLevel(E.LEVELS[s.level]),entry.runs));
      G.setSpeed(3);
    },s);
    await page.waitForFunction(s=>{
      const st=window.CausalDiamond.status();
      if(st.run===s.run&&st.mode==='run'&&st.tick>=s.at*60){window.CausalDiamond.setSpeed(0);return true;}
      return false;
    },s,{polling:'raf',timeout:60000});
    await page.waitForTimeout(300);
    await page.locator('.wrap').screenshot({path:path.join(out,s.file)});
    console.log('saved',s.file);
  }
  await browser.close();
})().catch(e=>{console.error(e);process.exit(1);});
