import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BeatDTO } from '../../../BeatDTO';
import { HelperService } from '../../../services/helper.service';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-save-beat-page',
  templateUrl: './save-beat-page.component.html',
  styleUrls: ['./save-beat-page.component.css']
})
export class SaveBeatPageComponent implements OnInit {
  id: number = 1;
  title: string = "";
  summary: string = "";
  isUpdating: boolean = false;
  saveState: string = "";


  constructor(private http: HttpService, private snackbar: MatSnackBar, private helper: HelperService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.setupPopup();
  }

  setupPopup() {
    this.id = this.helper.getId();
    this.title = this.helper.getTitle();
    this.summary = this.helper.getSummary();
    this.isUpdating = this.helper.getUpdating();

    if (this.isUpdating === true) {
      this.saveState = "Update";
    }
    else {
      this.saveState = "Save";
    }
  }

  //function that saves the beat you made to the database
  async saveBeat() {
    if (!this.title) {
      this.snackbar.open("Remember to enter a title for your beat", "Ok")
    }
    let beatDTO: BeatDTO = {
      id: this.id,
      title: this.title,
      summary: this.summary,
      beatString: this.helper.getBeatString(),
      userEmail: this.helper.getUser().email
    };
    if (this.isUpdating === true) {
      this.dialog.closeAll();
      await this.http.updateBeat(beatDTO);
    }
    else {
      this.dialog.closeAll();
      await this.http.createBeat(beatDTO);
    }
    
  }

}
