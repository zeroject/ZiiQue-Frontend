import { Component, OnInit } from '@angular/core';
import { HttpService } from "../../services/http.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import * as EmailValidator from "email-validator";
import {Router} from "@angular/router";
import {empty} from "rxjs";


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  password: any;
  username: any;
  cpassword: any;
  strengthvalue: any;
  isEmailTrue: any;
  email: any;
  HttpStatus: number;
  x: any;
  y: any;
  z: any;

  strength(event: any) {
    this.strengthvalue = event
  }


  constructor(private http: HttpService, private snackbar: MatSnackBar, private router: Router) {
    this.HttpStatus = 0
  }

  ngOnInit(): void {
  }

  async Submit() {
    var loading = document.getElementById("loading-img");
    if (!this.username) {
      this.snackbar.open("Remember to enter either your email or username", "Ok")
    }
    else if (!this.password) {
      this.snackbar.open("Remember to enter your password", "Ok")
    } else{
      let dto = {
        username: this.username,
        password: this.password

      }
      // @ts-ignore
      loading.style.opacity = "100";
      var token = await this.http.login(dto).catch(reason =>{
        // @ts-ignore
        loading.style.opacity = "0";
      })
      // @ts-ignore
      localStorage.setItem('token', token)
    }
  }

  async createUser() {
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
            this.snackbar.open("User Created", "Ok")
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

  SwitchLogin(){
    console.log('ijliji')
    var x = document.getElementById("login");
    var y = document.getElementById("register");
    var z = document.getElementById("btn");
    var b = document.getElementById("btn-login");
    var bt = document.getElementById("btn-register");
    // @ts-ignore
    x.style.left = "50px";
    // @ts-ignore
    y.style.left = "450px";
    // @ts-ignore
    z.style.left = "0";
    // @ts-ignore
    b.style.color = "white";
    // @ts-ignore
    bt.style.color = "black";
  }

  SwitchRegister() {
    console.log('jhgfdhy')
    var x = document.getElementById("login");
    var y = document.getElementById("register");
    var z = document.getElementById("btn");
    var b = document.getElementById("btn-login");
    var bt = document.getElementById("btn-register");
    // @ts-ignore
    x.style.left = "-400px";
    // @ts-ignore
    y.style.left = "50px";
    // @ts-ignore
    z.style.left = "110px";
    // @ts-ignore
    b.style.color = "black";
    // @ts-ignore
    bt.style.color = "white";
  }
}
