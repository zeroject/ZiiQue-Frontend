import * as Tone from 'tone'

const synth = new Tone.Synth().toDestination();
const FMS = new Tone.FMSynth(Tone.Synth).toDestination();


export function demoNode(x)
{
  switch (x)
  {
    case x="A":
      FMS.triggerAttackRelease("G5","16n");
      break;
    case x="B":
      FMS.triggerAttackRelease("C4", "16n");
      break;
    case x="C":
      FMS.triggerAttackRelease("E#4","16n");
      break;
    case x="D":
      FMS.triggerAttackRelease("F#2","16n");
      break;
    case x="E":
      FMS.triggerAttackRelease("D8", "16n");
      break;
  }

}
