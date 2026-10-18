/* Reference solutions, one per level (spoilers!). Each inner list is one run; every run but the last ends in the portal.
   Coordinates are map tiles (column, row). The `solo` run is a naive single attempt that must NOT win. */
(function(root){
root.CDSolutions=[
 {name:'Hold the Door',runs:[
   [['go',3,3],['wait',4],['go',3,6]],
   [['go',17,3]]]},
 {name:'Grandfather',runs:[
   [['go',3,1],['wait',3.5],['go',8,9]],
   [['go',14,6],['until',6.5],['go',15,9]]]},
 {name:'Two of Me',runs:[
   [['go',3,2],['wait',8],['go',2,8]],
   [['go',11,7],['wait',8],['go',2,8]],
   [['go',16,8]]]},
 {name:'Shutter',runs:[
   [['go',3,2],['wait',1.5],['go',4,9]],
   [['go',6,6],['until',3.6],['go',6,7],['wait',4],['go',4,9]],
   [['go',13,7]]]},
 {name:'Lockstep',runs:[
   [['go',1,1],['wait',8],['go',2,8]],
   [['go',8,6],['wait',4],['go',2,8]],
   [['go',16,4]]]},
 {name:'Race the Light',runs:[
   [['go',5,10],['wait',3],['go',1,10]],
   [['go',15,2],['until',5.3],['go',15,11]]]},
 {name:'Causal Diamond',runs:[
   [['go',1,1],['until',6],['go',4,9]],
   [['go',8,6],['until',4],['go',4,9]],
   [['go',19,2],['until',6.5],['go',16,8]]]},
 {name:'Relay',runs:[
   [['go',3,2],['wait',12],['go',1,6]],
   [['go',15,3],['wait',5],['go',1,6]],
   [['go',19,3]]]},
 {name:'Fuse',runs:[
   [['go',3,2],['wait',4],['go',8,5]],
   [['go',1,7],['until',6],['go',8,5]],
   [['go',13,1],['until',6.9],['go',14,5]]]},
 {name:'Event Horizon',runs:[
   [['go',3,1],['until',6.5],['go',1,6]],
   [['go',9,1],['until',6],['go',1,6]],
   [['go',19,3],['until',6.5],['go',13,7]]]}
];
// Traps: the obvious mistake on a level. Each must leave an earlier self stranded (a paradox).
root.CDTraps=[
 {level:1,name:'rush the kill switch',runs:[
   [['go',3,1],['wait',3.5],['go',8,9]],
   [['go',15,9]]]},
 {level:3,name:'hold purple while echo 1 is heading home',runs:[
   [['go',3,2],['wait',1.5],['go',4,9]],
   [['go',6,7],['wait',4],['go',4,9]],
   [['go',13,7]]]},
 {level:4,name:'release gold before purple',runs:[
   [['go',1,1],['wait',1],['go',2,8]],
   [['go',8,6],['wait',6],['go',2,8]]]},
 {level:5,name:'hit the switch before the echo is home',runs:[
   [['go',5,10],['wait',3],['go',1,10]],
   [['go',15,2],['until',3],['go',15,11]]]},
 {level:7,name:'let go of gold before echo 2 is back',runs:[
   [['go',3,2],['wait',5],['go',1,6]],
   [['go',15,3],['wait',5],['go',1,6]],
   [['go',19,3]]]},
 {level:8,name:'hold purple until you are through',runs:[
   [['go',3,2],['wait',4],['go',8,5]],
   [['go',1,7],['until',10],['go',8,5]],
   [['go',13,1],['until',9.5],['go',14,5]]]},
 {level:8,name:'hit the switch straight away',runs:[
   [['go',3,2],['wait',4],['go',8,5]],
   [['go',1,7],['until',6],['go',8,5]],
   [['go',14,5]]]},
 {level:9,name:'leave gold when purple does',runs:[
   [['go',3,1],['until',6],['go',1,6]],
   [['go',9,1],['until',6],['go',1,6]],
   [['go',19,3],['until',6.5],['go',13,7]]]},
 {level:9,name:'hit the switch straight away',runs:[
   [['go',3,1],['until',6.5],['go',1,6]],
   [['go',9,1],['until',6],['go',1,6]],
   [['go',13,7]]]}
];
})(typeof window!=='undefined'?window:globalThis);
