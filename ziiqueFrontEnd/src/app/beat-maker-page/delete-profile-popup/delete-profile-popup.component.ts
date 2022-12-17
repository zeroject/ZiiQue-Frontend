import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-delete-profile-popup',
  templateUrl: './delete-profile-popup.component.html',
  styleUrls: ['./delete-profile-popup.component.css']
})
export class DeleteProfilePopupComponent implements OnInit {

  constructor(public dialog_: MatDialog, private http_: HttpService) { }

  ngOnInit(): void {
  }

  /// function which requsts a function in http service to delete a user
  deleteProfile() {
    this.http_.deleteUser()
    this.dialog_.closeAll();
  }

  /// function which closes the popup
  goBack() {
    this.dialog_.closeAll();
  }

}
