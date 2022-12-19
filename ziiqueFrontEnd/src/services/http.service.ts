import { Injectable } from '@angular/core';
import axios from "axios";
import * as https from "https";
import jwtDecode from "jwt-decode";
import { LoginDTO, User, UserDTO } from "../User"
import {environment} from "../environments/environment";
import {Router} from "@angular/router";
import { HelperService } from './helper.service';
import { BeatDTO } from '../BeatDTO';


export const customAxios = axios.create(
  {
    baseURL: 'https://localhost:7003/api',
    headers: {
      Authorization: `bearer ${localStorage.getItem('token')}`
    }
  }
)

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  _username: string = "";
  _email: string = "";


  constructor(private router_: Router, private helper_: HelperService) {

  }

  ///Login function which takes a loginDTO as a parameter, aswell as sets the token from the api in the localstorage to use for authorization
  async login(dto_: LoginDTO) {
    const httpResult = await customAxios.post('Login/login', dto_);
    localStorage.setItem('token', httpResult.data);
    let t = jwtDecode(httpResult.data) as User;
    this.helper_.setUser(t);
    this._username = t.username_Email;
    this._email = t.email;
    await this.router_.navigate(['./BeatMaker'])
  }

  /// http request to create a user which takes a userDTO as a parameter and gives back a status
  async createUser(Dto_: UserDTO) {
    const httpResult = await customAxios.post("User/createUser", Dto_).then()
    {
      return httpResult.status
    }
  }

  /// http request to delete user
  async deleteUser() {
    await customAxios.delete("User/deleteUser/" + this.helper_.getUser().username_Email);
    await this.router_.navigate(['./Login'])
  }

  /// http request to update password which takes a string as a parameter
  async updatePassword(pass_: string) {
    let user: UserDTO = { email: this.helper_.getUser().username_Email, username: this._username, password: pass_ }
    const httpResult = await customAxios.put("User/updatePassword", user).then()
    {
      await this.router_.navigate(['./Login'])
      return httpResult.status
    }
  }

  /// http request to get beats assigned to a user
  async getBeats() {
    let userEmail_: string = this.helper_.getUser().username_Email;
    const httpResult = await customAxios.get('Beat/getBeats/' + userEmail_);
    return httpResult.data
  }

  /// http request to create a beat in the database which takes a BeatDTO as a parameter
  async createBeat(beatDTO_: BeatDTO) {
    beatDTO_.userEmail = this.helper_.getUser().username_Email;;
    console.log(beatDTO_);
    const httpResult = await customAxios.post('Beat/createBeat', beatDTO_ );
    return httpResult.data
  }

  /// http request to update a beat in the database which takes a BeatDTO as a parameter
  async updateBeat(beatDTO_: BeatDTO) {
    beatDTO_.userEmail = this.helper_.getUser().username_Email;;
    const httpResult = await customAxios.put('Beat/updateBeat', beatDTO_);
    return httpResult.data
  }

  /// http request to delete a beat from the database which takes a beatDTO as a parameter
  async deleteBeat(beatDTO_: BeatDTO) {
    beatDTO_.userEmail = this.helper_.getUser().username_Email;;
    const httpResult = await customAxios.delete('Beat/deleteBeat', { data: beatDTO_ });
    return httpResult.data
  }
}
