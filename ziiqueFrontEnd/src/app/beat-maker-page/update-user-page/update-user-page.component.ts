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
  password: string = "";
  cpassword: string = "";
  strengthvalue: number = 0;


  constructor(private snackbar: MatSnackBar, private http: HttpService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  strength(event: any) {
    this.strengthvalue = event
  }

  async updatePassword() {
    if (this.strengthvalue >= 2) {
      if (this.password == this.cpassword) {
        this.dialog.closeAll();
        this.http.updatePassword(this.password);
      }
      else {
        this.snackbar.open("Your passwords dont match", "Ok")
      }
    }
    else {
      this.snackbar.open("Your passwords is not strong enough", "Ok")
    }

  }
}
