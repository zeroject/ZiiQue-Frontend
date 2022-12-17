import { Injectable } from '@angular/core';
import { User } from '../User';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  _user: User = {
    email: "",
    username_Email: "",
  };
  _isUpdating: boolean = false;

  _id: number = 0;
  _title: string = "";
  _summary: string = "";
  _beatString: string = "";


  /// All functions in this class are primarily used for parsing data between components and a re all getters and setters.
  constructor() { }

  setBeatString(beatString_: string) {
    this._beatString = beatString_;
  }

  getBeatString() {
    return this._beatString;
  }

  setUser(user_: User) {
    this._user = user_;
  }

  getUser() {
    return this._user;
  }

  setUpdating(isUpdating_: boolean) {
    this._isUpdating = isUpdating_;
  }

  getUpdating() {
    return this._isUpdating;
  }

  getId() {
    return this._id;
  }

  setId(id_: number) {
    this._id = id_
  }

  setTitle(title_: string) {
    this._title = title_;
  }

  getTitle() {
    return this._title;
  }

  setSummary(summary_: string) {
    this._summary = summary_;
  }

  getSummary() {
    return this._summary;
  }
}
