import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators';
import { Observable, of } from 'rxjs';
import { QuizModel } from '../models/quiz-response.model';
import { HttpService } from 'src/app/common/http/http-service';
import { Quiz } from '../models/quiz.model';
import { IUser } from 'src/app/shared/services/user/models/user-interface';

const ASSEST_URL = "assets/database.json";

@Injectable({
  providedIn: "root"
})
export class QuizService {

  constructor(private http: HttpClient, private httpService: HttpService) { }

  loadQuestion(): Observable<QuizModel> {
    const httpOptions = this.httpService.buildHTTPRequestOptions();
    return this.http.get(ASSEST_URL, httpOptions).pipe(
      map((data: any) => {
        return this.validateData(data) ? data : of({} as any)
      })
    );
  }

  validateData(data) {
    return !!data && !!data.modules && data.modules
  }

  getTeamModule(modules: Quiz[], user: IUser): Quiz[] {
    let teamModules = [] as Quiz[]; 
    teamModules = modules.filter((module: Quiz) => {
      if((!!user.profile['teamName'] && !!module && (user.profile['teamName'] === module.teamID)) || (!!module && module.isDefault === true)){
        return module;
      }
    })
    return teamModules;
  }
}
