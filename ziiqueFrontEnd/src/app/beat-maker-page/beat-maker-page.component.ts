import { Component, OnInit } from '@angular/core';
import {Instruments} from "./instruments";
import {Note} from "./note";
import * as sound from "../../soundEngine";

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
  sequence: Note[] = [];



  constructor() {

  }

  ngOnInit(): void {
    this.createInstruments()
    this.createDemoIns()

  }

  startBeating() {

  }

  createInstruments()
  {
    for (let i = 0; i < names.length; i++) {
        let instrument : Instruments = {notes: [], nameN: names[i]}
        this.instrumentList.push(instrument)
    }
    for (let i = 0; i < this.instrumentList.length; i++) {
      for (let pos = 1; pos < NumberOfBars+1; pos++) {
        let node:Note = {position: pos+"" + this.instrumentList[i].nameN, sound: this.instrumentList[i].nameN, isToggled: false}
        this.instrumentList[i].notes.push(node)
      }
    }
  }

  createDemoIns()
  {
    for (let i = 0; i < names.length; i++) {
      let node : Note = {position: 0+ names[i], sound: names[i], isToggled: false}
      this.demoNode.push(node)
      console.log(this.demoNode[i].position.includes("A", 1))
    }
  }

  addNote(note: Note) {
    console.log(note.position, note.isToggled)
    if (note.isToggled)
    {
      note.isToggled = false;
       this.sequence = this.sequence.filter(n => n.position !== note.position)
    }
    else{
      note.isToggled = true;
      this.sequence.push(note)
    }

  }

  playDemo(note: Note) {
    sound.demoNode(note.sound)
  }
}
