import * as sound from 'SoundJS'

function playSound(){
  var soundid = "Kick"
  createjs.Sound.registerSound("./assets/samples/Hard_Kick.mp3", soundid)
  createjs.Sound.play('/assets/samples/Hard_Kick.mp3', soundid)
}

