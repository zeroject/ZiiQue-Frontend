import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpService } from '../../../services/http.service';
import { BeatMakerPageComponent } from '../beat-maker-page.component';
import { BeatDTO } from '../profile-page/BeatDTO';

@Component({
  selector: 'app-save-beat-page',
  templateUrl: './save-beat-page.component.html',
  styleUrls: ['./save-beat-page.component.css']
})
export class SaveBeatPageComponent implements OnInit {
  title: string = "";
  summary: string = "";
  

  constructor(private http: HttpService, private beatmaker: BeatMakerPageComponent, private snackbar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  async saveBeat() {
    if (!this.title) {
      this.snackbar.open("Remember to enter a title for your beat", "Ok")
    }
    let beatDTO: BeatDTO = {
      title: this.title,
      summary: this.summary,
      beatstring: this.beatmaker.convertNodeToSeqStr().toString() + ":",
      userEmail: this.http.email
    };
    localStorage.getItem('token');
    await this.http.createBeat(beatDTO);
  }

}
