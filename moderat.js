//Heizd
//Key: F Major

setcpm(110) // bpm @ 110

//arpeggiator sections for bed
let arp1 = note("c4 f4 a4").sound("saw") 
  .decay(0.0).sustain(3).lpf(300);

let arp2 = note("c4 f4 b4").sound("saw") 
  .room(0.5).lpf(800);

let arp3= note("c4 f4 c5").sound("saw") 
  .room(0.5).lpf(800);

let arp4= note("c4 e4 a4").sound("saw") 
  .gain(0.5).lpf(800);

//continuous arpeggiator stack (constant through)
let arpStack = arrange(
  [6, arp1],            // CFA x6 F major
  [2, arp2],     // CFB x2
  [8, arp3],     // CFC x8
  [8, arp1],     // CFA x8
  [8, arp4]     // CEA x8
  ).room(1.5)._punchcard().color("green");

//MAIN melody high - harmony
const arpLead = arrange(
  [8, "a4*3 c5*3"],            
  [4, "f4*3 c5*3"],     
  [2, "e4*3 a4*3"],
  [1, "a5*3 c6*3"],
  [1, "f5*3 e5*3"])
  .note().sound("supersaw").attack(0.25).decay(0.004).release(0)
  .slow(2).gain(0.25).lpf(slider(2414,2000,8000)).lpq(5)
  ._punchcard().color("green");

//swelling
let highpad = note("e4 f4 a4 c5")
  .sound("sawtooth").slow(3).gain(0.25).lpf(1000).clip(1).phaser(1);

//Bass
let bass = arrange(
  [4, "f2*3"],
  [4, "a2*3"],
  [4, "d2*3"],
  [4, "e2*3"])
  .note().sound("supersaw").attack(0.05).room(0.3).gain(0.5)
  .phaser(2).phasersweep("<800 1000 700 1000>")
  //.lpf(slider(1796,200,4000)).lpq(2)
  ._punchcard().color("white");

//bass drums
let bassdrum = s("bd").bank("RolandTR808").slow(2).room(2).delay(0.2).gain(0.5)

//drums with claps
let drums = s("bd cp").bank("RolandTR808").slow(2).delay(0.01)._scope()
//FINAL ARRANGEMENT

arrange(  
  [4, stack(arpStack, bass,drums,bassdrum,arpLead)], 
);
