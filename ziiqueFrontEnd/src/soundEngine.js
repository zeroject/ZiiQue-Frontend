import {repeat} from "rxjs";
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
      newsound.play('kick', false)
     break;
    case x="B":
      newsound.play('bass', false)
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
  let s =note.charAt(1)
  switch (s)
  {
    case "A":
      var sound = new Howl({
        src: ['./assets/samples/Hard_Kick.mp3'],
        sprite: {
          sound: [500, generateTime(bpm, note)]
        }
      });
      soundBank.push(sound)
      break;
    case "B":
      var sound = new Howl({
        src: [ './assets/samples/808.mp3' ],
      });

      soundBank.push(sound)
      break;
    case "C":
      break;
    case "D":
      break;
    case "E":
      break;
  }
}

function generateTime(bpm, note)
{
  let posR;
  let bps;
  let result;
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
  console.log(result)
  return result
}

export function time(bpm)
{
  let totalLength = ((bpm / 60) * 16) / 1000
  let startTime = Date.now();
  let elapsed = 0;
  let run = false;

  function start()
  {
    if (!run)
    {
      run = true;
    }
    else run = false
  }

  while (run)
  {
    elapsed = Date.now() - startTime
  }

  if (elapsed === totalLength)
  {
    startTime = Date.now()
  }
  return elapsed
}

let beating = false;

export function startBeating(Seq, bpm){

  if (!beating)
  {
  for (let note in Seq) {
    generateNote(Seq[note], bpm)
    for (let i = 0; i < soundBank.length; i++) {
      console.log(soundBank[i])
      soundBank[i].play('sound')
    }
    console.log("startBeating: " + Seq[note])
    beating = true;
  }
  }

  else {

  beating = false}
}
/*
new play method()
start timer.
max lenght / 16. check if any node needs to play. *1 *2 *3 to check if anything needs to play.
play from right player with .not

case "B"
foreach (node : array)
if (generateTime(notePos, bpm) = timer)
{
multplayer.player('bass').start(now())
}

play apropiate sound .now
 */
