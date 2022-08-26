import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginFacadeService } from './facades/login.facade.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  subscriptions: Subscription[] = [];
  invalidUserId: boolean = false;
  invalidPassword: boolean = false;
  userDetails: any;
  isValidUserAuth: boolean = true;
  userDetailObj: any;
  fieldTextType: boolean = false;


  constructor(
    public fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private loginFacadeService: LoginFacadeService) {}

  ngOnInit() {
    this.subscriptions.push(this.loginFacadeService.userDetails$.subscribe((data) => {
      console.log('dataGot', data);
      this.isValidUserAuth = !!data && !!data.isValidUserId;
    }))
    
    this.loginForm = this.fb.group({
      userId: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  OnRegister() {
    this.router.navigate(['register'], { relativeTo: this.route});
  }

  onUserChange() {
    this.isValidUserAuth = true;
  }

  onTeamsAdd() {
    const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');
    this.userDetailObj = { "userName": "roshan", "password": "12345", "userId": "1630974" };
    this.http.post('/api/QuizDetails/teams/createTeam', JSON.stringify(this.userDetailObj), {
      headers: headers
    })
      .subscribe(signUpRes => {
        console.log("signUpRes", signUpRes)
      });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.userDetailObj = {
        "userId": this.loginForm.get('userId').value,
        "password": this.loginForm.get('password').value
      };

      this.loginFacadeService.authenticateUser(this.userDetailObj);

    } else {
      if (this.loginForm.get('userId').value === "" || this.loginForm.get('userId').value === null)
        this.invalidUserId = true;

      if (this.loginForm.get('password').value === "" || this.loginForm.get('password').value === null)
        this.invalidPassword = true;
    }
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
