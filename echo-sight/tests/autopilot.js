/* Autopilot: plays scripted solutions through the engine. Works in Node (verify-levels.js) and in the page (screenshot.cjs).
   A run is a list of commands:
     ['go', x, y]    walk to tile (x, y) along a shortest path, waiting at any closed door on the way
     ['wait', s]     stand still for s seconds
     ['until', s]    stand still until the loop clock reads s seconds
     ['look', deg]   keep facing deg degrees (0 = east, 90 = south, -90 = north) even while walking;
                     ['look', null] goes back to facing the direction of travel
   Paths avoid plates, the portal and the exit unless one of them is the destination. */
(function(root){
const DIRS=[[1,0],[-1,0],[0,1],[0,-1]];

function special(lv,x,y){
  const at=t=>t&&t.x===x&&t.y===y;
  return at(lv.portal)||at(lv.exit)||Object.values(lv.plates).some(at);
}
function bfs(lv,from,to,avoidSpecial){
  const key=(x,y)=>y*lv.W+x,prev=new Map([[key(from.x,from.y),null]]),q=[from];
  while(q.length){
    const c=q.shift();
    if(c.x===to.x&&c.y===to.y){const path=[];let k=key(c.x,c.y);
      while(k!==key(from.x,from.y)){path.unshift({x:k%lv.W,y:Math.floor(k/lv.W)});k=prev.get(k);}return path;}
    for(const [dx,dy] of DIRS){const x=c.x+dx,y=c.y+dy,k=key(x,y);
      if(x<0||y<0||x>=lv.W||y>=lv.H||lv.grid[y][x]===1||prev.has(k))continue;
      if(avoidSpecial&&special(lv,x,y)&&!(x===to.x&&y===to.y))continue;
      prev.set(k,key(c.x,c.y));q.push({x,y});}
  }
  return null;
}
function findPath(lv,from,to){
  const p=bfs(lv,from,to,true)||bfs(lv,from,to,false);
  if(!p)throw new Error(`No path from ${from.x},${from.y} to ${to.x},${to.y}`);
  return p;
}

// Returns driver(sim, selfIndex) -> {c: move code, a: facing angle}, following runs[selfIndex].
function makePilot(E,lv,runs){
  let run=-1,lastTick=-1,cmds=[],ci=0,path=null,waitEnd=null,look=null,ang=0;
  function out(c){
    if(look!==null)ang=look;
    else if(c!==4)ang=Math.atan2(c%3-1,Math.floor(c/3)-1);
    return{c,a:ang};
  }
  return function(sim,i){
    const n=sim.tick;
    if(i!==run||n<lastTick){run=i;cmds=runs[i]||[];ci=0;path=null;waitEnd=null;look=null;ang=0;}
    lastTick=n;
    const e=sim.ents[i];
    while(ci<cmds.length){
      const c=cmds[ci];
      if(c[0]==='look'){look=c[1]===null?null:c[1]*Math.PI/180;ci++;continue;}
      if(c[0]==='wait'){if(waitEnd===null)waitEnd=n+Math.round(c[1]*E.TPS);if(n<waitEnd)return out(4);waitEnd=null;ci++;continue;}
      if(c[0]==='until'){if(n<Math.round(c[1]*E.TPS))return out(4);ci++;continue;}
      if(c[0]==='go'){
        if(!path)path=findPath(lv,{x:Math.floor(e.x),y:Math.floor(e.y)},{x:c[1],y:c[2]});
        if(!path.length){path=null;ci++;continue;}
        const t=path[0],di=lv.doorAt[t.y*lv.W+t.x];
        if(di!==undefined&&!E.doorOpen(lv,sim,lv.doors[di],n))return out(4);
        const dx=t.x+.5-e.x,dy=t.y+.5-e.y,eps=.04;
        if(Math.abs(dx)<eps&&Math.abs(dy)<eps){path.shift();continue;}
        const ix=Math.abs(dx)<eps?0:Math.sign(dx),iy=Math.abs(dy)<eps?0:Math.sign(dy);
        return out((ix+1)*3+(iy+1));
      }
      throw new Error('Unknown command '+c[0]);
    }
    return out(4);
  };
}

// Plays every run of a solution headlessly, the same way the page's tick() does.
function playSolution(E,levelIndex,runs){
  const lv=E.parseLevel(E.LEVELS[levelIndex]),pilot=makePilot(E,lv,runs),selves=[],log=[];
  for(let r=0;r<runs.length;r++){
    const start=selves.length?lv.arrival:lv.spawn,cur={start,inputs:[],rec:[{x:start.x,y:start.y}],mem:[],end:null};
    const rs=[...selves,cur],sim=E.makeSim(lv,rs),ci=rs.length-1;
    let outcome='timeout';
    while(sim.tick<lv.T*E.TPS){
      const n=sim.tick;cur.inputs[n]=pilot(sim,ci);E.step(lv,sim,rs);
      const e=sim.ents[ci];cur.rec[n+1]={x:e.x,y:e.y};
      if(E.onTile(e,lv.portal)){cur.end=n;selves.push(cur);outcome='travelled';break;}
      if(E.onTile(e,lv.exit)){
        const ok=E.existence(ci,sim.ents)>=1&&!E.strandedAfterExit(lv,sim,rs,ci);
        outcome=ok?'won':'exit-in-paradox';if(ok)break;}
    }
    const paradoxes=sim.ents.map((en,j)=>en.div?`echo ${j+1} (${en.why} at ${(en.divTick/E.TPS).toFixed(2)}s)`:'').filter(Boolean);
    log.push({run:r+1,outcome,time:sim.tick/E.TPS,paradoxes});
    if(outcome!=='travelled')break;
  }
  return log;
}

root.ESAutopilot={makePilot,playSolution,findPath};
})(typeof window!=='undefined'?window:globalThis);
