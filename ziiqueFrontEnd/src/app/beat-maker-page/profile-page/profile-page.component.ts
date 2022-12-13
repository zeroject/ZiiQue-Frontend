import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import jwtDecode from 'jwt-decode';
import { HelperService } from '../../../services/helper.service';
import { HttpService } from '../../../services/http.service';
import { User } from '../../../User';
import { BeatMakerPageComponent } from '../beat-maker-page.component';
import { BeatDTO } from './BeatDTO';
import { DeleteProfilePopupComponent } from './delete-profile-popup/delete-profile-popup.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  beats: BeatDTO[] = [];
  user: User = {
    email: "",
    username_Email: "",
  };


  constructor(private http: HttpService, private helper: HelperService, private dialog: MatDialog, private comp: BeatMakerPageComponent) { }

  async ngOnInit() {
    this.setUser();
    this.beats = await this.http.getBeats();
  }

  async updateBeat(beatDTO: BeatDTO) {
    await this.http.updateBeat(beatDTO);
  }
  
  async deleteBeat(beatDTO: BeatDTO) {
    await this.http.deleteBeat(beatDTO);
  }

  loadBeat(beatDTO: BeatDTO) {
    this.comp.loadSavedNotes(beatDTO.BeatString);
  }

  setUser() {
    this.user = this.helper.getUser();
    this.goToProfile();
  }

  deletePopUp() {
    this.dialog.open(DeleteProfilePopupComponent, {
      height: 'fit-content',
      width: 'fit-content',
    });
  }

  goToProfile() {
    // @ts-ignore
    document.getElementById("profileDiv").style.zIndex = "100";
    // @ts-ignore
    document.getElementById("beatsDiv").style.zIndex = "99";
  }

  goToBeats() {
    // @ts-ignore
    document.getElementById("profileDiv").style.zIndex = "99";
    // @ts-ignore
    document.getElementById("beatsDiv").style.zIndex = "100";
  }

}
