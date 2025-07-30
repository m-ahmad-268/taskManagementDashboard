import { Component, OnInit } from '@angular/core';
import { CommonService } from './services/common.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastServiceService } from './services/toast-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'projectTaskManagement';
  loadingSpinner: Observable<boolean>;

  constructor(
    private commonService: CommonService,
    private router: Router
  ) {
    this.loadingSpinner = this.commonService.isLoader$;

  }


  ngOnInit(): void {
    this.commonService.showLoader();
    // show loader till we have rendered all our data
    setTimeout(() => {
      this.commonService.hideLoader();
    }, 1000);
    const authToken = localStorage.getItem('isLoggedIn');
    if (authToken && authToken == 'true') {
      this.commonService.signIn();
    }

    this.commonService.isloggedIn$.subscribe(data => {
      if (data)
        this.router.navigate(['']);


    });

  }
}
