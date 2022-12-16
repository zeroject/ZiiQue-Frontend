import { Component, HostListener, OnInit } from '@angular/core';
import {Instruments} from "./instruments";
import {Note} from "./note";
import * as sound from "../../soundEngine";
import { MatDialog } from '@angular/material/dialog';
import { SaveBeatPageComponent } from './save-beat-page/save-beat-page.component';
import { HelperService } from '../../services/helper.service';
import { BeatDTO } from '../../BeatDTO';
import { User } from '../../User';
import { HttpService } from '../../services/http.service';
import { DeleteProfilePopupComponent } from './delete-profile-popup/delete-profile-popup.component';
import { UpdateUserPageComponent } from './update-user-page/update-user-page.component';
import jwtDecode from 'jwt-decode';


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
  isOpen: boolean = false;
  beatString: string = "";

  beats: BeatDTO[] = []
  user: User = {
    email: "",
    username_Email: "",
  };


  constructor(private dialog: MatDialog, private helper: HelperService, private http: HttpService) {
  }

  ngOnInit() {
    this.createInstruments()
    this.createDemoIns()
    this.setUser();
    this.loadBeats();
  }


  //loads beats from the database
  async loadBeats() {
    this.beats = await this.http.getBeats()
  }

  //opens the profile menu
  onClick() {
    if (!this.isOpen) {
      // @ts-ignore
      document.getElementById("burgerDivMaster").style.zIndex = "100";
      this.isOpen = true;
    }
    else {
      // @ts-ignore
      document.getElementById("burgerDivMaster").style.zIndex = "-100";
      this.isOpen = false;
    }
  }

  //Opens a popup for changing a users password
  updatePassword() {
    this.dialog.open(UpdateUserPageComponent, {
      height: '280px',
      width: '25%',
    });
  }

  //opens a popup for saving beats and sends the beatstring to the helper service
  saveBeat() {
    this.helper.setBeatString(this.convertNodeToSeqStr().toString().replace(/,/g, ""));
    this.helper.setTitle("");
    this.helper.setSummary("");
    this.helper.setUpdating(false);

    this.dialog.open(SaveBeatPageComponent, {
      height: '240px',
      width: '25%',
    });
  }

  //updates beats in the database
  async updateBeat(beatDTO: BeatDTO) {
    this.helper.setBeatString(this.convertNodeToSeqStr().toString().replace(/,/g, ""));
    this.helper.setId(beatDTO.id)
    this.helper.setTitle(beatDTO.title);
    this.helper.setSummary(beatDTO.summary);
    this.helper.setUpdating(true);

    this.dialog.open(SaveBeatPageComponent, {
      height: '240px',
      width: '25%',
    });
  }

  //deleltes a beat from the database
  async deleteBeat(beatDTO: BeatDTO) {
    await this.http.deleteBeat(beatDTO);
    this.loadBeats();
  }

  //loads beats from the database
  loadBeat(beatDTO: BeatDTO) {
    // @ts-ignore
    document.getElementById("burgerDivMaster").style.zIndex = "-100";
    this.isOpen = false;
    this.loadSavedNotes(beatDTO.beatString)
  }

  //sets the current logged in user
  setUser() {
    // @ts-ignore
    this.user = jwtDecode(localStorage.getItem('token')) as User;
    this.helper.setUser(this.user);
    this.goToProfile();
  }

  //Opens the delete profile popup
  deletePopUp() {
    this.dialog.open(DeleteProfilePopupComponent, {
      height: 'fit-content',
      width: 'fit-content',
    });
  }

  //Changes z index to show a diffrent Div
  goToProfile() {
    // @ts-ignore
    document.getElementById("profilePage").style.zIndex = "100";
    // @ts-ignore
    document.getElementById("beatsPage").style.zIndex = "99";
  }

  //Changes z index to show a diffrent Div
  goToBeats() {
    // @ts-ignore
    document.getElementById("profilePage").style.zIndex = "99";
    // @ts-ignore
    document.getElementById("beatsPage").style.zIndex = "100";
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

  loadSavedNotes(stringOfNodes: string) {
    console.log(stringOfNodes)

    let strNodes: string[] = []
    this.sortAllSeq = [];
    strNodes = stringOfNodes.split(";")
    strNodes.pop()
    let spos;
    let ssou;
    for (let i = 0; i < this.instrumentList.length; i++) {
      for (let j = 0; j < this.instrumentList[i].notes.length; j++) {
        for (let k = 0; k < strNodes.length; k++) {
          let snum = Number(strNodes[k].charAt(1))
          if (isNaN(snum)) {
            ssou = strNodes[k].charAt(1)
            spos = Number(strNodes[k].charAt(0))
          }
          else {
            ssou = strNodes[k].charAt(2)
            spos = Number(strNodes[k].substring(0, 2))
          }
          console.log(ssou + " " + spos)
          if (this.instrumentList[i].notes[j].sound === ssou && this.instrumentList[i].notes[j].position === spos) {
            this.instrumentList[i].notes[j].isToggled = true;
            this.sortAllSeq.push(this.instrumentList[i].notes[j])
          } else {
            console.log('gg')
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
}

