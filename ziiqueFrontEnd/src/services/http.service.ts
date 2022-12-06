import { Injectable } from '@angular/core';
import axios from "axios";
import * as https from "https";
import jwtDecode from "jwt-decode";
import { User } from "../User"
import {environment} from "../environments/environment";
import {Router} from "@angular/router";


export const customAxios = axios.create(
  {
    baseURL: 'https:/localhost:7003/api',
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
  twoFA: any;


  constructor(private router: Router) {

  }

async login(dto: any)
{
  const httpResult = await customAxios.post('Login/login', dto);
    localStorage.setItem('token', httpResult.data);
    let t = jwtDecode(httpResult.data)as User;
    this.username_Email = t.username_Email;
    this.email = t.email;
    this.twoFA = t.twoFA.valueOf();
    await this.router.navigate(['./BeatMaker'])

}

async createUser(Dto: {username: any, password: any, email: any, is2FA: any}){
    const httpResult = await customAxios.post("User/createUser", Dto).then()
  {
    return httpResult.status}
  }
  async deleteUser(email: any){
    const httpResult = await customAxios.delete("User/deleteUser", email);
  }
  async updateUser(username: any, email: any, twoFA: any){
    let user : User = {email : email, twoFA: twoFA, username_Email: username}
    const httpResult = await customAxios.put("User/updateUser", user).then()
    {
      return httpResult.status;
    }
  }

}
