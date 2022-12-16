import { Injectable } from '@angular/core';
import axios from "axios";
import * as https from "https";
import jwtDecode from "jwt-decode";
import { User, UserDTO } from "../User"
import {environment} from "../environments/environment";
import {Router} from "@angular/router";
import { HelperService } from './helper.service';
import { BeatDTO } from '../BeatDTO';


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
  username: string = "";
  email: string = "";


  constructor(private router: Router, private helper: HelperService) {

  }

  //Login Function
  async login(dto: any) {
    const httpResult = await customAxios.post('Login/login', dto);
    localStorage.setItem('token', httpResult.data);
    let t = jwtDecode(httpResult.data) as User;
    this.helper.setUser(t);
    this.username = t.username_Email;
    this.email = t.email;
    await this.router.navigate(['./BeatMaker'])
  }

  // User Functions
  async createUser(Dto: { username: string, password: string, email: string }) {
    const httpResult = await customAxios.post("User/createUser", Dto).then()
    {
      return httpResult.status
    }
  }

  async deleteUser() {
    await customAxios.delete("User/deleteUser/" + this.email);
    await this.router.navigate(['./Login'])
  }

  async updatePassword(pass: string) {
    let user: UserDTO = { email: this.email, username: this.username, password: pass }
    const httpResult = await customAxios.put("User/updatePassword", user).then()
    {
      await this.router.navigate(['./Login'])
      return httpResult.status
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
