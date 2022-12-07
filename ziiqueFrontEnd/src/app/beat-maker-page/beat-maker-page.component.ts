import { Component, OnInit } from '@angular/core';
import {Instruments} from "./instruments";
import {Note} from "./note";
import * as sound from "../../soundEngine";
import {Tone} from "tone/build/esm/core/Tone";
import {now, Transport} from "tone";


let names = ["A","B","C","D","E"]
let NumberOfBars = 16;

@Component({
  selector: 'app-beat-maker-page',
  templateUrl: './beat-maker-page.component.html',
  styleUrls: ['./beat-maker-page.component.css']
})

export class BeatMakerPageComponent implements OnInit {
  instrumentList: Instruments[] = [];
  sortAllSeq: Note[] = [];
  demoNode: Note[] = []
  bpm: number = 120;




  constructor() {

  }

  ngOnInit(): void {
    this.createInstruments()
    this.createDemoIns()

  }


  //creates instruments according to the names array. and the amount of nodes per instrument. set by the NumberOfBars.
  createInstruments() {
    for (let i = 0; i < names.length; i++) {
      let instrument: Instruments = {notes: [], nameN: names[i]}
      this.instrumentList.push(instrument)
    }
    for (let i = 0; i < this.instrumentList.length; i++) {
      for (let pos = 1; pos < NumberOfBars + 1; pos++) {
        let node: Note = {
          position: pos,
          sound: this.instrumentList[i].nameN,
          isToggled: false
        }
        this.instrumentList[i].notes.push(node)
      }
    }
  }

  //creates the demo notes to be shown in the gui.
  createDemoIns() {
    for (let i = 0; i < names.length; i++) {
      let node: Note = {position: 0, sound: names[i], isToggled: false}
      this.demoNode.push(node)
    }
  }
//plays the note pressed in the gui
  playDemo(note: Note) {
    sound.demoNode(note.sound)
  }

  //(click) adds the note pressed to the total sequence
  addNote(note: Note) {
    if (!note.isToggled) {
      note.isToggled = true;
      this.sortAllSeq.push(note)
      }
     else {
      note.isToggled = false;
          this.sortAllSeq.filter(b => b.position !== note.position);
      }
    }



  //sorts an array of notes by the position. from first position to last.
  sortSeq(allSeq : Note[]) {
    return  allSeq = allSeq.sort((a, b) => (a.position < b.position ? -1 : 1))
    }



//converts all nodes applied and sorts them into a single array of Notes, from first position to last position
  convertNodeToSeqStr() : string[]
  {
    let result : string[] = []
    let sorted : Note[] = this.sortSeq(this.sortAllSeq)
    for (let i = 0; i < sorted.length; i++) {
        result.push(sorted[i].position + sorted[i].sound)
      }
    return result;
    }


  play() {
  sound.startBeating(this.convertNodeToSeqStr(), this.bpm)
  }

  startBeating() {

  }
}

