import {interval, repeat} from "rxjs";
import {Howl, Howler} from 'howler';

var newsound = new Howl({
  src: ['./assets/samples/Hard_Kick.mp3', './assets/samples/808.mp3'],
  sprite: {
    kick: [0, 1000],
    bass: [1, 1000]
  }
})

var kick = new Howl({
  src: ['./assets/samples/Hard_Kick.mp3'],
  sprite: {
    kick: [0, 1000],
  }
});

var bass = new Howl({
  src: [ './assets/samples/808.mp3' ],
  sprite: {
    bass: [0, 1000],
  }
});

var hihat = new Howl({
  src: ['./assets/samples/Hihat.mp3'],
  sprite: {
    hihat: [0, 1000],
  }
});

var ride = new Howl({
  src: ['./assets/samples/Ride.mp3'],
  sprite: {
    ride: [0, 1000],
  }
});

var snare = new Howl({
  src: ['./assets/samples/Snare__Claps.mp3'],
  sprite: {
    snare: [0, 1000],
  }
});

let soundBank = [];




export function demoNode(x)
{
  switch (x)
  {
    case x="A":
      kick.play('kick', false)
     break;
    case x="B":
      bass.play('bass', false)
      break;
    case x="C":
      hihat.play('hihat', false)
      break;
    case x="D":
      ride.play('ride', false)
      break;
    case x="E":
      snare.play('snare', false)
      break;
  }
}


function generateNote(note, bpm)
{
  console.log(note)
  let time =  Number(generateTime(note, bpm))
  let s
  let snum = Number(note.charAt(1))
  if (isNaN(snum))
  {
    s = note.charAt(1)
  }
  else
    s = note.charAt(2);

  let source;
  switch (s)
  {
    case "A":
        source = './assets/samples/Hard_Kick.mp3'
      break;
    case "B":
        source = './assets/samples/808.mp3'
      break;
    case "C":
        source = './assets/samples/Hihat.mp3'
      break;
    case "D":
        source = './assets/samples/Ride.mp3'
      break;
    case "E":
        source = './assets/samples/Snare__Claps.mp3'
      break;
  }
  let sound = new Howl(
    {
      src: [source],
      sprite: {
        sound: [0, 1000]
      }})
  let node = {time : time, howl : sound}
  soundBank.push(node)
}

function generateTime(note, bpm)
{
  let posR;
  let bps;
  let result = Number;
  bps = bpm / 60

  let splitNote;
  splitNote = note.charAt(1)
  let splitnum = Number(splitNote);

  if (isNaN(splitnum)){
    splitNote = note.charAt(0)
  }
  else{
    splitNote = note.substring(0, 2)
  }

  let posNum;
  posNum = Number(splitNote)

  posR = 1 / bps
  result = posR * posNum * 1000
  return result
}

function getInterval(bpm)
{
  let result = [];
  let bps = bpm / 60
  let interval = 1/ bps
  for (let i = 0; i < 16; i++) {
    let it = interval * i
    result.push(it)
  }
  return result
}

let beating = false;
let intervalId = []

export function startBeating(Seq, bpm){
  soundBank = []

  let gap = getInterval(bpm)

  if (beating)
  {
    beating =  false
  }
  else (beating = true)

  if (beating) {
    for (let note in Seq) {
      generateNote(Seq[note], bpm)
    }
    for (let i = 0; i < soundBank.length; i++) {
      let j = 0;

      intervalId.push(setInterval(track, (gap[1] * 1000)));

      function track() {
        if (soundBank[i].time === gap[j] * 1000) {
          console.log(soundBank[i].time + " : " + gap[j] + "")
          soundBank[i].howl.play("sound", false);
        }
        if (j === gap.length -1 || !gap) {
          j = 0
        } else {
          j++;
        }
      }
    }
  }
  else
  {
    beating = false;
    for (let i = 0; i < intervalId.length; i++) {
      clearInterval(intervalId[i])
    }
  }
}

