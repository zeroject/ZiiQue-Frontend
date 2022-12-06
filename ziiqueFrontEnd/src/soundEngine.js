import * as Tone from 'tone'
import {Context, now, Time, Transport} from 'tone'
import {repeat} from "rxjs";

const multplayer = new Tone.Players({
  urls: {
    kick: './assets/samples/Hard_Kick.mp3',
    bass: './assets/samples/808.mp3',
    hihat: './assets/samples/Hihat.mp3',
    ride: './assets/samples/Ride.mp3',
    snare: './assets/samples/Snare__Claps.mp3',
  }
}).toDestination();




export function demoNode(x)
{
  console.log(multplayer.loaded);
  switch (x)
  {
    case x="A":
      multplayer.player('kick').start(now());
     break;
    case x="B":
      multplayer.player('bass').start(now());
      break;
    case x="C":
      multplayer.player('hihat').start(now());
      break;
    case x="D":
      multplayer.player('ride').start(now());
      break;
    case x="E":
      multplayer.player('snare').start(now());
      break;
  }
}

function generateNote(note, bpm)
{
  let s =note.charAt(1)
  switch (s)
  {
    case "A":
      multplayer.player('kick').start( now() +generateTime(bpm, note)).sync();
      console.log('CheckA')
      break;
    case "B":
      multplayer.player('bass').start(now() +generateTime(bpm, note)).sync();
      break;
    case "C":
      multplayer.player('hihat').start(now() + generateTime(bpm, note)).sync();
      break;
    case "D":
      multplayer.player('ride').start(now() +generateTime(bpm, note)).sync();
      break;
    case "E":
      multplayer.player('snare').start(now() +generateTime(bpm, note)).sync();
      break;
  }
}

export function generateTime(bpm, note)
{
  console.log("note: "+  note)
  let posR;
  let bps;
  let result;
  bps = bpm / 60

  for (let i = 1; i < 16; i++) {
    posR = (1 / bps)
    result = posR * i
  }

  posR = (1 / bps)
  result = posR * posNum
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
  for (let i = 1; i < 16; i++) {

    let res = generateTime(120, i + "A")
    console.log("TimeTest: " + res  +" iteration: " + i)
  }


  if (!beating && Tone.loaded())
  {
  for (let note in Seq) {
    generateNote(Seq[note], bpm)
    console.log("startBeating: " + Seq[note])
    Tone.Transport.start(now())
    beating = true;
  }
  }

  else {
    Tone.Transport.stop(now())
    console.log(multplayer.state)
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
