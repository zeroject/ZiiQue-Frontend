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
  Username_Email: any;
  cpassword: any;
  strengthvalue: any;
  isEmailTrue: any;
  email: any;
  HttpStatus: number | void;
  x: any;
  y: any;
  z: any;
  formbox: any;
  loading: any;

  strength(event: any) {
    this.strengthvalue = event
  }


  constructor(private http: HttpService, private snackbar: MatSnackBar, private router: Router) {
    this.HttpStatus = 0
  }

  ngOnInit(): void {
    this.loading = document.getElementById("loading");
    this.formbox = document.getElementById("form-box");
  }

  async Submit() {
    if (!this.Username_Email) {
      this.snackbar.open("Remember to enter either your email or username", "Ok")
    }
    else if (!this.password) {
      this.snackbar.open("Remember to enter your password", "Ok")
    } else{
      let dto = {
        Username_Email: this.Username_Email,

        password: this.password

      }
      // @ts-ignore
      this.loading.style.opacity = "100";
      // @ts-ignore
      this.formbox.style.webkitFilter = "blur(1rem)"
      this.loading.style.zIndex = "10";
      await this.http.login(dto).then(() => {
      }).catch(() =>{
        // @ts-ignore
        this.loading.style.opacity = "0";
        // @ts-ignore
        this.formbox.style.webkitFilter = "blur(0rem)"
        this.loading.style.zIndex = "-10";
        this.snackbar.open("Username/Email or Password was incorrect", "Ok")
      })
 
      
    }
  }

  async createUser() {
    if(this.strengthvalue >= 2){
      if(this.password == this.cpassword){
        if(EmailValidator.validate(this.email)){
          let dto = {
            username: this.Username_Email,
            email: this.email,
            password: this.password,
            is2FA: false
          }
          // @ts-ignore
          this.loading.style.opacity = "100";
          // @ts-ignore
          this.formbox.style.webkitFilter = "blur(1rem)"
          this.loading.style.zIndex = "10";
          this.HttpStatus = await this.http.createUser(dto).catch(reason => {
            // @ts-ignore
            this.loading.style.opacity = "0";
            // @ts-ignore
            this.formbox.style.webkitFilter = "blur(0rem)"
            this.loading.style.zIndex = "-10";
          })
          if(this.HttpStatus == 201)
          {
            this.snackbar.open("User Created", "Ok")
            // @ts-ignore
            this.loading.style.opacity = "0";
            // @ts-ignore
            this.formbox.style.webkitFilter = "blur(0rem)"
            this.loading.style.zIndex = "-10";
            this.SwitchLogin();
          }
          else {
            this.snackbar.open("Username or Email is already taken", "Ok")
            // @ts-ignore
            this.loading.style.opacity = "0";
            // @ts-ignore
            this.formbox.style.webkitFilter = "blur(0rem)"
            this.loading.style.zIndex = "-10";
          }
        }
        else {
          this.snackbar.open("Your email is not valid", "Ok")
          // @ts-ignore
          this.loading.style.opacity = "0";
          // @ts-ignore
          this.formbox.style.webkitFilter = "blur(0rem)"
          this.loading.style.zIndex = "-10";
        }
      }
      else {
        this.snackbar.open("Your passwords dont match", "Ok")
        // @ts-ignore
        this.loading.style.opacity = "0";
        // @ts-ignore
        this.formbox.style.webkitFilter = "blur(0rem)"
        this.loading.style.zIndex = "-10";
      }
    }
    else {
      this.snackbar.open("Your passwords is not strong enough", "Ok")
      // @ts-ignore
      this.loading.style.opacity = "0";
      // @ts-ignore
      this.formbox.style.webkitFilter = "blur(0rem)"
      this.loading.style.zIndex = "-10";
    }

  }

  SwitchLogin(){
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
