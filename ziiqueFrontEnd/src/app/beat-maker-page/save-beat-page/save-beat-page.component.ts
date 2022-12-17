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
  _id: number = 1;
  _title: string = "";
  _summary: string = "";
  _isUpdating: boolean = false;
  _saveState: string = "";


  constructor(private http_: HttpService, private snackbar_: MatSnackBar, private helper_: HelperService, private dialog_: MatDialog) {
  }

  ngOnInit(): void {
    this.setupPopup();
  }

  /// function that setups the popup window for either saving or updating a beat
  setupPopup() {
    this._id = this.helper_.getId();
    this._title = this.helper_.getTitle();
    this._summary = this.helper_.getSummary();
    this._isUpdating = this.helper_.getUpdating();

    if (this._isUpdating === true) {
      this._saveState = "Update";
    }
    else {
      this._saveState = "Save";
    }
  }

  /// function that saves the beat you made to the database
  async saveBeat() {
    if (!this._title) {
      this.snackbar_.open("Remember to enter a title for your beat", "Ok")
    }
    let beatDTO: BeatDTO = {
      id: this._id,
      title: this._title,
      summary: this._summary,
      beatString: this.helper_.getBeatString(),
      userEmail: this.helper_.getUser().email
    };
    if (this._isUpdating === true) {
      this.dialog_.closeAll();
      await this.http_.updateBeat(beatDTO);
    }
    else {
      this.dialog_.closeAll();
      await this.http_.createBeat(beatDTO);
    }
    
  }

}
