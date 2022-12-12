import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  beatString: string = "";


  constructor() { }

  setBeatString(beatString: string) {
    this.beatString = beatString;
  }

  getBeatString() {
    return this.beatString;
  }
}
