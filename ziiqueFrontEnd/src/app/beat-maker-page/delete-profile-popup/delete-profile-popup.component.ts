import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-delete-profile-popup',
  templateUrl: './delete-profile-popup.component.html',
  styleUrls: ['./delete-profile-popup.component.css']
})
export class DeleteProfilePopupComponent implements OnInit {

  constructor(public dialog: MatDialog, private http: HttpService) { }

  ngOnInit(): void {
  }

  deleteProfile() {
    this.http.deleteUser()
    this.dialog.closeAll();
  }

  goBack() {
    this.dialog.closeAll();
  }

}
