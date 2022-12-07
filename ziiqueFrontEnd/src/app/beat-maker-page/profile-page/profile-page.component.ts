import { Component, OnInit } from '@angular/core';
import { HttpService } from "../../services/http.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  email: any;
  username: any;
  twofa: any;


  constructor(private http: HttpService) {
    this.username = http.username_Email;
    this.email = http.email;
    this.twofa = http.twoFA === 'True';
  }

  ngOnInit(): void {
  }

  deleteUser(){
    this.http.deleteUser(this.email);
  }

  updateUser(){
    this.http.updateUser(this.username, this.email, this.twofa);
  }

  onChange(){
      this.twofa = !this.twofa;
  }

}
