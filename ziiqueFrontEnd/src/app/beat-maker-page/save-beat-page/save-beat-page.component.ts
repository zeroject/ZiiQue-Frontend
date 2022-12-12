import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HelperService } from '../../../services/helper.service';
import { HttpService } from '../../../services/http.service';
import { BeatDTO } from '../profile-page/BeatDTO';

@Component({
  selector: 'app-save-beat-page',
  templateUrl: './save-beat-page.component.html',
  styleUrls: ['./save-beat-page.component.css']
})
export class SaveBeatPageComponent implements OnInit {
  title: string = "";
  summary: string = "";

  constructor(private http: HttpService, private snackbar: MatSnackBar, private helper: HelperService) {
  }

  ngOnInit(): void {
  }

  async saveBeat() {
    if (!this.title) {
      this.snackbar.open("Remember to enter a title for your beat", "Ok")
    }
    let beatDTO: BeatDTO = {
      Title: this.title,
      Summary: this.summary,
      BeatString: this.helper.getBeatString(),
      UserEmail: this.http.email
    };
    await this.http.createBeat(beatDTO);
  }

}
