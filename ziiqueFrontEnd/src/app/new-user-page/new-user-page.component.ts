import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import * as EmailValidator from 'email-validator';
import { HttpService } from "../../services/http.service";


@Component({
  selector: 'app-new-user-page',
  templateUrl: './new-user-page.component.html',
  styleUrls: ['./new-user-page.component.css']
})
export class NewUserPageComponent implements OnInit {
  username: any;
  email: any;
  password: any;
  cpassword: any;
  strengthvalue: any;
  isEmailTrue: any;
  HttpStatus: number;

  strength(event: any) {
    this.strengthvalue = event
  }


  constructor(private router: Router, private snackbar: MatSnackBar, private http: HttpService)
  {
    this.HttpStatus = 0
  }


  ngOnInit(): void {

  }

  emailfailed(message: string, action:string){
    this.snackbar.open(message, action, {duration: 4000})
  }

  async submit() {
    if(this.strengthvalue >= 2){
      if(this.password == this.cpassword){
        if(EmailValidator.validate(this.email)){
          let dto = {
            username: this.username,
            email: this.email,
            password: this.password,
            is2FA: false
          }
          this.HttpStatus = await this.http.createUser(dto)
          if(this.HttpStatus == 201)
          {
            await this.router.navigate(['/Login'])
          }
          else {
            this.snackbar.open("Username or Email is already taken", "Ok")
          }
        }
        else {
          this.snackbar.open("Your email is not valid", "Ok")
        }
      }
      else {
        this.snackbar.open("Your passwords dont match", "Ok")
      }
    }
    else {
      this.snackbar.open("Your passwords is not strong enough", "Ok")
    }

  }

  cancel() {
    this.router.navigate(['./Login']);
  }
}
