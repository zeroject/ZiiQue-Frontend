import { Component, OnInit } from '@angular/core';
import {Instruments} from "./instruments";
import {Note} from "./note";
import * as sound from "../../soundEngine";
import { MatDialog } from '@angular/material/dialog';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { SaveBeatPageComponent } from './save-beat-page/save-beat-page.component';
import { HelperService } from '../../services/helper.service';


let names = ["A","B","C","D","E"]
let NumberOfBars = 15;

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
  imgPath: string = "assets/play.png"
  isPlaying: boolean = false;
  beatString: string = "";


  constructor(private dialog: MatDialog, private helper: HelperService) {

  }

  ngOnInit(): void {
    this.createInstruments()
    this.createDemoIns()

  }

  onClick() {
    this.dialog.open(ProfilePageComponent, {
      height: '100%',
      width: '30%',
      position: { right: "0" },
    });
  }

  saveBeat() {
    this.helper.setBeatString(this.convertNodeToSeqStr().toString().replace(/,/g, ""));

    this.dialog.open(SaveBeatPageComponent, {
      height: '240px',
      width: '25%',


    });
  }


  //creates instruments according to the names array. and the amount of nodes per instrument. set by the NumberOfBars.
  createInstruments() {
    for (let i = 0; i < names.length; i++) {
      let instrument: Instruments = {notes: [], nameN: names[i]}
      this.instrumentList.push(instrument)
    }
    let id =0;
    for (let i = 0; i < this.instrumentList.length; i++) {
      for (let pos = 0; pos < NumberOfBars + 1; pos++) {
        let node: Note = {
          position: pos,
          sound: this.instrumentList[i].nameN,
          isToggled: false,
          id: id
        }
        id++
        this.instrumentList[i].notes.push(node)
      }
    }
    }

  //creates the demo notes to be shown in the gui.
  createDemoIns() {
    for (let i = 0; i < names.length; i++) {
      let node: Note = {position: 0, sound: names[i], isToggled: false, id: i}
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
          this.sortAllSeq =  this.sortAllSeq.filter(b => b.id !== note.id);
          console.log(this.sortAllSeq.length)
      }
    }



  //sorts an array of notes by the position. from first position to last.
  sortSeq(allSeq : Note[]) {
    return  allSeq = allSeq.sort((a, b) => (a.position < b.position ? -1 : 1))
    }


    loadSavedNotes(stringOfNodes : string) {
      let strNodes
      strNodes = stringOfNodes.split(";")
      strNodes.pop()
      let spos;
      let ssou;
      for (let i = 0; i < this.instrumentList.length; i++) {
        for (let j = 0; j < this.instrumentList[i].notes.length; j++) {
          for (let k = 0; k < strNodes.length; k++) {
            let snum = Number(strNodes[k].charAt(1))
            if (isNaN(snum))
            {
               ssou = strNodes[k].charAt(1)
              spos = strNodes[k].charAt(0)
            }
            else {
              ssou = strNodes[k].charAt(2)
              spos =  Number(strNodes[k].substring(0, 2))
            }
            if (this.instrumentList[i].notes[j].sound === ssou && this.instrumentList[i].notes[j].position === spos)
            {
              this.instrumentList[i].notes[j].isToggled = true;
              this.sortAllSeq.push(this.instrumentList[i].notes[j])
            }
          }
        }
      }
    }


//converts all nodes applied and sorts them into a single array of Notes, from first position to last position
  convertNodeToSeqStr() : string[]
  {
    let result : string[] = []
    let sorted : Note[] = this.sortSeq(this.sortAllSeq)
    for (let i = 0; i < sorted.length; i++) {
        result.push("" + sorted[i].position + sorted[i].sound + ";")
      for (let j = 0; j < sorted.length; j++) {
      }
    }
    return result;
    }

//(click) plays the sequence
  play() {
    sound.startBeating(this.convertNodeToSeqStr(), this.bpm)
    if (!this.isPlaying) {
      this.isPlaying = true;
      this.imgPath = "assets/pause.png"
    }
    else {
      this.isPlaying = false;
      this.imgPath = "assets/play.png"
    }
  }

  startBeating() {

  }
}

