import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/internal/operators';
import { Observable, of } from 'rxjs';
import { HttpService } from 'src/app/common/http/http-service';
import { Teams } from '../models/teams-model';

const GET_TEAMS_API = "/api/QuizDetails/teams/getTeams";
const DUPLICATE_CHECK = "/api/QuizDetails/signUp/duplicateCheck";
const REGISTER_API = "/api/QuizDetails/signUp/Create";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  
  constructor(private http: HttpClient, private httpService: HttpService) {}

  loadTeams(): Observable<Teams[]>{
    const httpOptions = this.httpService.buildHTTPRequestOptions();
    return this.http.get(GET_TEAMS_API, httpOptions).pipe(
      map((data: any) => {
          return !!data && data.length > 0 ? data : of({} as Teams[]);
      })
    );
  }

  duplicateCheck(userDetail): Observable<any> {
    const httpParams = new HttpParams().set('tcsUserId', userDetail);
    const httpOptions = this.httpService.buildHTTPRequestOptions(
      httpParams
    );
    return this.http.get(DUPLICATE_CHECK, httpOptions).pipe(
      map((data: any) => {
          return !!data && data ? data : of({});
      })
    ); 
  }

  onRegister(userDetails): Observable<Teams[]>{
    const httpOptions = this.httpService.buildHTTPRequestOptions();
    return this.http.post(REGISTER_API, userDetails, httpOptions).pipe(
      map((data: any) => {
          return !!data && data ? data : of({});
      })
    );
  }
}