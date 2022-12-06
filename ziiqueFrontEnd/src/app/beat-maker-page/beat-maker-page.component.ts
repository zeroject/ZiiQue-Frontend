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
  demoNode: Note[] = [];
  sequenceA: Note[] = [];
  sequenceB: Note[] = [];
  sequenceC: Note[] = [];
  sequenceD: Note[] = [];
  sequenceE: Note[] = [];
  bpm: number = 120;




  constructor() {

  }

  ngOnInit(): void {
    this.createInstruments()
    this.createDemoIns()

  }

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

  createDemoIns() {
    for (let i = 0; i < names.length; i++) {
      let node: Note = {position: 0, sound: names[i], isToggled: false}
      this.demoNode.push(node)
    }
  }

  addNote(note: Note) {
    console.log(this.sequenceA[0])
    if (!note.isToggled) {
      switch (note.sound) {
        case "A":
          this.sequenceA.push(note);
          break;
        case "B":
          this.sequenceB.push(note);
          break;
        case "C":
          this.sequenceC.push(note);
          break;
        case "D":
          this.sequenceD.push(note);
          break;
        case "E":
          this.sequenceE.push(note);
          break;
      }
      note.isToggled = true;
    } else {
      note.isToggled = false;
      switch (note.sound) {
        case "A":
          this.sequenceA = this.sequenceA.filter(b => b.position !== note.position);
          break;
        case "B":
          this.sequenceB = this.sequenceB.filter(b => b.position !== note.position);
          break;
        case "C":
          this.sequenceC = this.sequenceC.filter(b => b.position !== note.position);
          break;
        case "D":
          this.sequenceD = this.sequenceD.filter(b => b.position !== note.position);
          break;
        case "E":
          this.sequenceE = this.sequenceE.filter(b => b.position !== note.position);
          break;
      }
    }
  }

  playDemo(note: Note) {
    sound.demoNode(note.sound)
  }

  sortSeq() {
    let allSeq = [this.sequenceA, this.sequenceB, this.sequenceC, this.sequenceD, this.sequenceE];

    for (let i = 0; i < allSeq.length; i++) {
      allSeq[i] = allSeq[i].sort((a, b) => (a.position < b.position ? -1 : 1))
    }
  }




  convertNodeToSeqStr() : string[]
  {
    let result : string[] = []
    this.sortSeq()
    let allSeq = [this.sequenceA, this.sequenceB, this.sequenceC, this.sequenceD, this.sequenceE];
    for (let i = 0; i < allSeq.length; i++) {
      for (let j = 0; j < allSeq[i].length; j++) {
        result.push(allSeq[i][j].position + allSeq[i][j].sound)
      }
    }
    for (let i = 0; i < result.length; i++) {
      console.log("convert "+ result[i])
    }
    return result;
    }


  play() {
  sound.startBeating(this.convertNodeToSeqStr(), this.bpm)
  }
}

