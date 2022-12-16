import { Injectable } from '@angular/core';
import { User } from '../User';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  user: User = {
    email: "",
    username_Email: "",
  };
  isUpdating: boolean = false;

  id: number = 1;
  title: string = "";
  summary: string = "";
  beatString: string = "";



  constructor() { }

  setBeatString(beatString: string) {
    this.beatString = beatString;
  }

  getBeatString() {
    return this.beatString;
  }

  setUser(user: User) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }

  setUpdating(isUpdating: boolean) {
    this.isUpdating = isUpdating;
  }

  getUpdating() {
    return this.isUpdating;
  }

  getId() {
    return this.id;
  }

  setId(id: number) {
    this.id = id
  }

  setTitle(title: string) {
    this.title = title;
  }

  getTitle() {
    return this.title;
  }

  setSummary(summary: string) {
    this.summary = summary;
  }

  getSummary() {
    return this.summary;
  }
}
