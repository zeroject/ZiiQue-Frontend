import { Injectable } from '@angular/core';
import axios from "axios";
import * as https from "https";
import jwtDecode from "jwt-decode";
import { User } from "../User"
import {environment} from "../environments/environment";
import {Router} from "@angular/router";
import { BeatDTO } from '../app/beat-maker-page/profile-page/BeatDTO';
import { HelperService } from './helper.service';


export const customAxios = axios.create(
  {
    baseURL: 'https://ziique-beatmaker-api.azurewebsites.net/api',
    headers: {
      Authorization: `bearer ${localStorage.getItem('token')}`
    }
  }
)

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  username_Email: any;
  email: any;


  constructor(private router: Router, private helper: HelperService) {

  }

  //Login Function
  async login(dto: any) {
    const httpResult = await customAxios.post('Login/login', dto);
    localStorage.setItem('token', httpResult.data);
    let t = jwtDecode(httpResult.data) as User;
    this.helper.setUser(t);
    this.username_Email = t.username_Email;
    this.email = t.email;
    await this.router.navigate(['./BeatMaker'])
  }

  // User Functions
  async createUser(Dto: { username: any, password: any, email: any }) {
    const httpResult = await customAxios.post("User/createUser", Dto).then()
    {
      return httpResult.status
    }
  }

  async deleteUser(email: any) {
    const httpResult = await customAxios.delete("User/deleteUser", email);
  }

  async updateUser(username: any, email: any) {
    let user: User = { email: email, username_Email: username }
    const httpResult = await customAxios.put("User/updateUser", user).then()
    {
      return httpResult.status;
    }
  }

  // Beat Functions
  async getBeats() {
    let userEmail_: string = this.helper.getUser().username_Email;
    const httpResult = await customAxios.get('Beat/getBeats/' + userEmail_);
    return httpResult.data
  }

  async createBeat(beatDTO: BeatDTO) {
    beatDTO.userEmail = this.email;
    const httpResult = await customAxios.post('Beat/createBeat', beatDTO );
    return httpResult.data
  }

  async updateBeat(beatDTO: BeatDTO) {
    beatDTO.userEmail = this.email;
    const httpResult = await customAxios.put('Beat/updateBeat', beatDTO);
    return httpResult.data
  }

  async deleteBeat(beatDTO: BeatDTO) {
    beatDTO.userEmail = this.email;
    const httpResult = await customAxios.delete('Beat/deleteBeat', { data: beatDTO });
    return httpResult.data
  }
}
