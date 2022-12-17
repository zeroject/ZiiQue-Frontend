import { Component, OnInit } from '@angular/core';
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
  username!: string;
  email!: string;
  twoFA!: boolean;

  constructor(private http: HttpService) { }

  async ngOnInit() {
    this.beats = await this.http.getBeats();
    this.username = this.http.username_Email;
    this.email = this.http.email;
    this.twoFA = this.http.twoFA;
  }

  async updateBeat(beatDTO: BeatDTO) {
    await this.http.updateBeat(beatDTO);
  }
  
  async deleteBeat(beatDTO: BeatDTO) {
    await this.http.deleteBeat(beatDTO);
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
