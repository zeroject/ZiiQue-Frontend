import { Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { HelperService } from '../../../services/helper.service';
import { HttpService } from '../../../services/http.service';
import { User } from '../../../User';
import { BeatDTO } from './BeatDTO';

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
    twoFA: false
  };


  constructor(private http: HttpService, private helper: HelperService) { }

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

  setUser() {
    this.user = this.helper.getUser();
    this.goToProfile();
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
