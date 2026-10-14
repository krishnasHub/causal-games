/* Reference solutions, one per level (spoilers!). Each inner list is one run; every run but the last ends in the portal.
   Coordinates are map tiles (column, row); angles are degrees (0 = east, 90 = south, -90 = north, 180 = west). */
(function(root){
root.ESSolutions=[
 {name:'Blind Spot',runs:[
   [['go',3,3],['look',180],['wait',4],['look',null],['go',3,6]],
   [['go',15,3]]]},
 {name:'The Figure',runs:[
   [['go',15,6],['wait',4],['go',17,7]],
   [['go',11,2],['until',8],['go',17,1]]]},
 {name:'Two Watchers',runs:[
   [['go',4,3],['look',-90],['until',8],['go',4,8]],
   [['until',1.5],['go',6,6],['look',90],['until',9.5],['go',4,8]],
   [['until',3.5],['go',3,5],['go',7,5],['go',7,3],['go',17,3]]]},
 {name:'Retrace',runs:[
   [['go',17,3],['look',0],['until',11],['look',null],['go',18,10]],
   [['go',11,2],['until',8],['go',11,6]]]}
];
// Traps: the obvious mistake on a level. Each must end without a win.
root.ESTraps=[
 {level:0,name:'watch the door while holding the plate',runs:[
   [['go',3,3],['look',0],['wait',4],['look',null],['go',3,6]],
   [['go',15,3]]]},
 {level:1,name:'skip the figure and head for the exit',runs:[
   [['go',15,6],['wait',4],['go',17,7]],
   [['go',17,1]]]},
 {level:1,name:'leave the plate while your past self is still watching',runs:[
   [['go',15,6],['wait',4],['go',17,7]],
   [['go',11,2],['until',1.5],['go',17,1]]]},
 {level:2,name:'first self watches the room instead of the wall',runs:[
   [['go',4,3],['until',8],['go',4,8]],
   [['until',1.5],['go',6,6],['look',90],['until',9.5],['go',4,8]]]},
 {level:3,name:'watch the booth from the purple plate',runs:[
   [['go',17,3],['look',180],['until',11],['look',null],['go',18,10]],
   [['go',11,2],['until',8],['go',11,6]]]},
 {level:3,name:'hold the gold plate too long',runs:[
   [['go',17,3],['look',0],['until',11],['look',null],['go',18,10]],
   [['go',11,2],['until',12.5],['go',11,6]]]}
];
})(typeof window!=='undefined'?window:globalThis);
