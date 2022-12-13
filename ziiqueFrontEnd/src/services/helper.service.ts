import { Injectable } from '@angular/core';
import { User } from '../User';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  beatString: string = "";
  user: User = {
    email: "",
    username_Email: "",
  };

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
}
