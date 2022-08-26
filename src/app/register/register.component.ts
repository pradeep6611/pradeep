import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationExtras, ActivatedRoute } from "@angular/router";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpService } from '../common/http/http-service';
import { RegisterService } from './services/register-service';
import { Teams } from './models/teams-model';
import { RegisterFacadeService } from './facades/register.facade.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  invalidUserId: boolean = false;
  invalidPassword: boolean = false;
  invalidEmailId: boolean = false;
  invalidTeamName: boolean = false;
  invalidCPassword: boolean = false;
  passwordValidation: boolean = false;
  duplicateTcsId: false;

  ///Sample Date for the Teams Names :
  teamsArray$: Observable<Teams[]>;
  duplicateckObject: any;
  fieldTextType: boolean = false;


  constructor(
    public fb: FormBuilder,
    public router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private registerService: RegisterService,
    @Inject(RegisterFacadeService) private registerFacadeService: RegisterFacadeService) {
      this.teamsArray$ = this.registerFacadeService.teams$
  }

  ngOnInit() {
    this.registerFacadeService.loadTeams();
    this.registerForm = this.fb.group({
      userId: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^(0|[1-9][0-9]*)$')
      ])
      ],
      emailId: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')
      ])
      ],
      teamName: ['', Validators.required],
      password: ['', Validators.required],
      c_password: ['', Validators.required],
    });
  }

  backToLogin() {
    this.router.navigate(["login"], { relativeTo: this.route });
  }

  duplicateCheck() {
    this.duplicateTcsId = false;
    const userDetail = this.registerForm.get('userId').value;
    this.registerService.duplicateCheck(userDetail).subscribe(duplicatecheck => {
      this.duplicateckObject = duplicatecheck
      this.duplicateTcsId = this.duplicateckObject.duplicateCheck;
    });
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  onRegister() {
    if (this.registerForm.get('userId').value === "" || this.registerForm.get('userId').value === null)
      this.invalidUserId = true;

    if (this.registerForm.get('emailId').value === "" || this.registerForm.get('emailId').value === null)
      this.invalidEmailId = true;

    if (this.registerForm.get('teamName').value === "" || this.registerForm.get('teamName').value === null)
      this.invalidTeamName = true;

    if (this.registerForm.get('password').value === "" || this.registerForm.get('password').value === null)
      this.invalidPassword = true;

    if (this.registerForm.get('c_password').value === "" || this.registerForm.get('c_password').value === null)
      this.invalidCPassword = true;

    if (this.registerForm.status === 'VALID' && this.duplicateTcsId === false) {
      const userDetails = {
        "tcsUserId": this.registerForm.get('userId').value,
        "password": this.registerForm.get('password').value,
        "emailId": this.registerForm.get('emailId').value,
        "teamName": this.registerForm.get('teamName').value
      };
      this.registerService.onRegister(userDetails).subscribe(signUpRes => {
        this.router.navigate(['login'], { relativeTo: this.route });
      });
    }
  }
}
