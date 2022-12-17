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


let _names = ["A","B","C","D","E"]
let _NumberOfBars = 15;

@Component({
  selector: 'app-beat-maker-page',
  templateUrl: './beat-maker-page.component.html',
  styleUrls: ['./beat-maker-page.component.css']
})

export class BeatMakerPageComponent implements OnInit {
  _instrumentList: Instruments[] = [];
  _sortAllSeq: Note[] = [];
  _demoNode: Note[] = []
  _bpm: number = 120;
  _imgPath: string = "assets/play.png"
  _isPlaying: boolean = false;
  _isOpen: boolean = false;
  _beatString: string = "";

  _beats: BeatDTO[] = []
  _user: User = {
    email: "",
    username_Email: "",
  };


  constructor(private dialog_: MatDialog, private helper_: HelperService, private http_: HttpService) {
  }

  ngOnInit() {
    this.createInstruments()
    this.createDemoIns()
    this.setUser();
    this.loadBeats();
  }


  //loads beats from the database
  async loadBeats() {
    this._beats = await this.http_.getBeats()
  }

  //opens the profile menu
  onClick() {
    if (!this._isOpen) {
      // @ts-ignore
      document.getElementById("burgerDivMaster").style.zIndex = "100";
      this._isOpen = true;
    }
    else {
      // @ts-ignore
      document.getElementById("burgerDivMaster").style.zIndex = "-100";
      this._isOpen = false;
    }
  }

  //Opens a popup for changing a users password
  updatePassword() {
    this.dialog_.open(UpdateUserPageComponent, {
      height: '280px',
      width: '25%',
    });
  }

  //opens a popup for saving beats and sends the beatstring to the helper service
  saveBeat() {
    this.helper_.setBeatString(this.convertNodeToSeqStr().toString().replace(/,/g, ""));
    this.helper_.setTitle("");
    this.helper_.setSummary("");
    this.helper_.setUpdating(false);

    this.dialog_.open(SaveBeatPageComponent, {
      height: '240px',
      width: '25%',
    });
  }

  //updates beats in the database
  async updateBeat(beatDTO: BeatDTO) {
    this.helper_.setBeatString(this.convertNodeToSeqStr().toString().replace(/,/g, ""));
    this.helper_.setId(beatDTO.id)
    this.helper_.setTitle(beatDTO.title);
    this.helper_.setSummary(beatDTO.summary);
    this.helper_.setUpdating(true);

    this.dialog_.open(SaveBeatPageComponent, {
      height: '240px',
      width: '25%',
    });
  }

  //deleltes a beat from the database
  async deleteBeat(beatDTO: BeatDTO) {
    await this.http_.deleteBeat(beatDTO);
    this.loadBeats();
  }

  //loads beats from the database
  loadBeat(beatDTO: BeatDTO) {
    // @ts-ignore
    document.getElementById("burgerDivMaster").style.zIndex = "-100";
    this._isOpen = false;
    this.loadSavedNotes(beatDTO.beatString)
  }

  //sets the current logged in user
  setUser() {
    // @ts-ignore
    this._user = jwtDecode(localStorage.getItem('token')) as User;
    this.helper_.setUser(this._user);
    this.goToProfile();
  }

  //Opens the delete profile popup
  deletePopUp() {
    this.dialog_.open(DeleteProfilePopupComponent, {
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
    for (let i = 0; i < _names.length; i++) {
      let instrument: Instruments = {notes: [], nameN: _names[i]}
      this._instrumentList.push(instrument)
    }
    let id =0;
    for (let i = 0; i < this._instrumentList.length; i++) {
      for (let pos = 0; pos < _NumberOfBars + 1; pos++) {
        let node: Note = {
          position: pos,
          sound: this._instrumentList[i].nameN,
          isToggled: false,
          id: id
        }
        id++
        this._instrumentList[i].notes.push(node)
      }
    }
    }

  //creates the demo notes to be shown in the gui.
  createDemoIns() {
    for (let i = 0; i < _names.length; i++) {
      let node: Note = {position: 0, sound: _names[i], isToggled: false, id: i}
      this._demoNode.push(node)
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
      this._sortAllSeq.push(note)
      }
     else {
      note.isToggled = false;
          this._sortAllSeq =  this._sortAllSeq.filter(b => b.id !== note.id);
          console.log(this._sortAllSeq.length)
      }
    }



  //sorts an array of notes by the position. from first position to last.
  sortSeq(allSeq_ : Note[]) {
    return  allSeq_ = allSeq_.sort((a, b) => (a.position < b.position ? -1 : 1))
  }

  loadSavedNotes(stringOfNodes_: string) {
    console.log(stringOfNodes_)

    let strNodes: string[] = []
    this._sortAllSeq = [];
    strNodes = stringOfNodes_.split(";")
    strNodes.pop()
    let spos;
    let ssou;
    for (let i = 0; i < this._instrumentList.length; i++) {
      for (let j = 0; j < this._instrumentList[i].notes.length; j++) {
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
          if (this._instrumentList[i].notes[j].sound === ssou && this._instrumentList[i].notes[j].position === spos) {
            this._instrumentList[i].notes[j].isToggled = true;
            this._sortAllSeq.push(this._instrumentList[i].notes[j])
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
    let sorted : Note[] = this.sortSeq(this._sortAllSeq)
    for (let i = 0; i < sorted.length; i++) {
        result.push("" + sorted[i].position + sorted[i].sound + ";")
      for (let j = 0; j < sorted.length; j++) {
      }
    }
    return result;
    }

//(click) plays the sequence
  play() {
    sound.startBeating(this.convertNodeToSeqStr(), this._bpm)
    if (!this._isPlaying) {
      this._isPlaying = true;
      this._imgPath = "assets/pause.png"
    }
    else {
      this._isPlaying = false;
      this._imgPath = "assets/play.png"
    }
  }
}

