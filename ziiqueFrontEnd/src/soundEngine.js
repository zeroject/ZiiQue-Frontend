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
  let time =  generateTime(note, bpm)
  let s = note.charAt(1)
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
  let node = {krono : time, howl : sound}
  soundBank.push(node)
}

function generateTime(note, bpm)
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
  return result
}

export function timer(bpm)
{
  let totalLength = ((bpm / 60) * 16) / 1000
  let startTime;
  let elapsed = 0;
  let run = false;
  let loopBool = true;

  function start()
  {
    if (!run)
    {
      startTime = Date.now();
      run = true;
    }
    else run = false
  }

  function loop()
  {
    if (!loopBool)
    {
      loopBool = true;
    }
    else loopBool = false
  }

  if (loopBool)
  {
    if (elapsed > totalLength)
    {
      startTime = Date.now()
    }
  }
  else
  {
    run = false
  }

  while (run)
  {
    elapsed = Date.now() - startTime
    return elapsed
  }

}

let beating = false;

export function startBeating(Seq, bpm){

  if (!beating) {
    for (let note in Seq) {
      generateNote(Seq[note], bpm)
    }
    let i = 0;
    if (soundBank[i+1].krono === soundBank[i].krono)
    {
      if (soundBank[i+2].krono === soundBank[i+1].krono)
      {
        if (soundBank[i+3].krono === soundBank[i+2].krono)
        {
          if (soundBank[i+4].krono === soundBank[i+3].krono)
          {
            if (soundBank[i+5].krono === soundBank[i+4].krono)
            {

            }
          }
        }
      }
    }
    else {
      soundBank[i].howl.play('sound', false)
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
