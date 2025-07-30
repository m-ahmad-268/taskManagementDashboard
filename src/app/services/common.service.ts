import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private isloggedIn = new BehaviorSubject<boolean>(false);
  isloggedIn$ = this.isloggedIn.asObservable();
  private isLoader = new BehaviorSubject<boolean>(false);
  isLoader$ = this.isLoader.asObservable();
  invalidInput = 'Invalid Input'

  constructor() { }


  signIn() {
    this.isloggedIn.next(true);
  }

  signOut() {
    this.isloggedIn.next(false);
  }

  showLoader() {
    this.isLoader.next(true);
  }

  hideLoader() {
    this.isLoader.next(false);
  }

  getAuthRole(): boolean {
    // const value: boolean = localStorage.getItem('isLoggedIn') == 'true' ? true : false;
    return this.isloggedIn.getValue();
  }


}
