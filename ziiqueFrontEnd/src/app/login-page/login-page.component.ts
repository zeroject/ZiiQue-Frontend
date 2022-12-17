import { Component, OnInit } from '@angular/core';
import { HttpService } from "../../services/http.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import * as EmailValidator from "email-validator";
import {Router} from "@angular/router";
import {empty} from "rxjs";
import { LoginDTO, UserDTO } from '../../User';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  _password: string = "";
  _Username_Email: string = "";
  _cpassword: string = "";
  _strengthvalue: number = 0;
  _isEmailTrue: boolean = false;
  _email: string = "";
  _HttpStatus: number | void;
  _formbox: any;
  _loading: any;

  strength(event_: any) {
    this._strengthvalue = event_
  }


  constructor(private http_: HttpService, private snackbar_: MatSnackBar, private router_: Router) {
    this._HttpStatus = 0
  }

  ngOnInit(): void {
    this._loading = document.getElementById("loading");
    this._formbox = document.getElementById("form-box");
  }

  /// function which a user triggers when pressing the login button,
  ///the function also checks if all inputs are filled out and then sends a request in http service if they are
  async Submit() {
    if (!this._Username_Email) {
      this.snackbar_.open("Remember to enter either your email or username", "Ok")
    }
    else if (!this._password) {
      this.snackbar_.open("Remember to enter your password", "Ok")
    } else {
      let dto: LoginDTO = {
        username_Email: this._Username_Email,
        password: this._password

      }
      // @ts-ignore
      this._loading.style.opacity = "100";
      // @ts-ignore
      this._formbox.style.webkitFilter = "blur(1rem)"
      this._loading.style.zIndex = "10";
      await this.http_.login(dto).then(() => {
      }).catch(() =>{
        // @ts-ignore
        this._loading.style.opacity = "0";
        // @ts-ignore
        this._formbox.style.webkitFilter = "blur(0rem)"
        this._loading.style.zIndex = "-10";
        this.snackbar_.open("Username/Email or Password was incorrect", "Ok")
      })
 
      
    }
  }

  ///function to create user which checks if the user has filled out all input and the email is a valid email format and then sends the request to http service
  async createUser() {
    if(this._strengthvalue >= 2){
      if(this._password == this._cpassword){
        if (EmailValidator.validate(this._email)) {
          let dto: UserDTO = {
            username: this._Username_Email,
            email: this._email,
            password: this._password,
          }
          // @ts-ignore
          this.loading.style.opacity = "100";
          // @ts-ignore
          this._formbox.style.webkitFilter = "blur(1rem)"
          this._loading.style.zIndex = "10";
          this._HttpStatus = await this.http_.createUser(dto).catch(reason => {
            // @ts-ignore
            this._loading.style.opacity = "0";
            // @ts-ignore
            this._formbox.style.webkitFilter = "blur(0rem)"
            this._loading.style.zIndex = "-10";
          })
          if(this._HttpStatus == 201)
          {
            this.snackbar_.open("User Created", "Ok")
            // @ts-ignore
            this._loading.style.opacity = "0";
            // @ts-ignore
            this._formbox.style.webkitFilter = "blur(0rem)"
            this._loading.style.zIndex = "-10";
            this.SwitchLogin();
          }
          else {
            this.snackbar_.open("Username or Email is already taken", "Ok")
            // @ts-ignore
            this._loading.style.opacity = "0";
            // @ts-ignore
            this._formbox.style.webkitFilter = "blur(0rem)"
            this._loading.style.zIndex = "-10";
          }
        }
        else {
          this.snackbar_.open("Your email is not valid", "Ok")
          // @ts-ignore
          this._loading.style.opacity = "0";
          // @ts-ignore
          this._formbox.style.webkitFilter = "blur(0rem)"
          this._loading.style.zIndex = "-10";
        }
      }
      else {
        this.snackbar_.open("Your passwords dont match", "Ok")
        // @ts-ignore
        this._loading.style.opacity = "0";
        // @ts-ignore
        this._formbox.style.webkitFilter = "blur(0rem)"
        this._loading.style.zIndex = "-10";
      }
    }
    else {
      this.snackbar_.open("Your passwords is not strong enough", "Ok")
      // @ts-ignore
      this._loading.style.opacity = "0";
      // @ts-ignore
      this._formbox.style.webkitFilter = "blur(0rem)"
      this._loading.style.zIndex = "-10";
    }

  }

  /// changes from register to login page
  SwitchLogin(){
    let x = document.getElementById("login");
    let y = document.getElementById("register");
    let z = document.getElementById("btn");
    let b = document.getElementById("btn-login");
    let bt = document.getElementById("btn-register");
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

  /// changes from login to register page
  SwitchRegister() {
    let x = document.getElementById("login");
    let y = document.getElementById("register");
    let z = document.getElementById("btn");
    let b = document.getElementById("btn-login");
    let bt = document.getElementById("btn-register");
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
