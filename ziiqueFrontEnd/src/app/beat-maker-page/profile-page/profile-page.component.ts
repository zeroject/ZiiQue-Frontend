import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { Beat } from './Beat';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  beats: Beat[] = [];

  constructor(private http: HttpService) { }

  async ngOnInit() {
    this.beats = await this.http.getBeats();
  }

  async updateBeat(beat: Beat) {
    await this.http.updateBeat(beat);
  }
  /*
  async deleteBeat(beat: Beat) {
    await this.http.deleteBeat(beat);
  }*/

  goToProfile() {
    // @ts-ignore
    document.getElementById("profileDiv").style.zIndex = "100";
    // @ts-ignore
    document.getElementById("beatsDiv").style.zIndex = "99";
    // @ts-ignore
    document.getElementById("settingsDiv").style.zIndex = "99";
  }

  goToBeats() {
    // @ts-ignore
    document.getElementById("profileDiv").style.zIndex = "99";
    // @ts-ignore
    document.getElementById("beatsDiv").style.zIndex = "100";
    // @ts-ignore
    document.getElementById("settingsDiv").style.zIndex = "99";
  }

  goToSettings() {
    // @ts-ignore
    document.getElementById("profileDiv").style.zIndex = "99";
    // @ts-ignore
    document.getElementById("beatsDiv").style.zIndex = "99";
    // @ts-ignore
    document.getElementById("settingsDiv").style.zIndex = "100";
  }

}
