import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-update-user-page',
  templateUrl: './update-user-page.component.html',
  styleUrls: ['./update-user-page.component.css']
})
export class UpdateUserPageComponent implements OnInit {
  _password: string = "";
  _cpassword: string = "";
  _strengthvalue: number = 0;


  constructor(private snackbar_: MatSnackBar, private http_: HttpService, private dialog_: MatDialog) { }

  ngOnInit(): void {
  }

  /// functtion that updates the strength meter each time a change is made in the input for a new password
  strength(event: any) {
    this._strengthvalue = event
  }

  /// function to update the password which checks if the inputs are filled out and if the strength of the pasword is good enough
  async updatePassword() {
    if (this._strengthvalue >= 2) {
      if (this._password == this._cpassword) {
        this.dialog_.closeAll();
        this.http_.updatePassword(this._password);
      }
      else {
        this.snackbar_.open("Your passwords dont match", "Ok")
      }
    }
    else {
      this.snackbar_.open("Your passwords is not strong enough", "Ok")
    }

  }
}
