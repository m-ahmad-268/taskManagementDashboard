import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { ToastServiceService } from 'src/app/services/toast-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  user: any = {
    username: '',
    pass: '',
  };

  constructor(
    private commonService: CommonService,
    private ToastService: ToastServiceService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.commonService.isloggedIn$.subscribe(data => {
      if (data)
        this.router.navigate(['']);

    })

  }

  handleSubmit(form: NgForm) {
    if (form.form.valid) {
      this.commonService.showLoader();
      setTimeout(() => {
        if (this.user.username == 'test' && this.user.pass == 'root') {
          localStorage.setItem('isLoggedIn', 'true');
          this.commonService.hideLoader();
          this.commonService.signIn();
          this.ToastService.showToast('success', 'Success', 'User Logged in Succesfully');
          // this.router.navigate(['']);
        } else {
          this.commonService.hideLoader();
          this.ToastService.showToast('error', 'Failure', 'Invalid credential, Try again..!');
          this.commonService.signOut();
        }
      }, 1000);
    }
  }



}
