import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";
import { QuizFacadeService } from './facades/quiz.facade.service';
import { Observable } from 'rxjs';
import { Quiz } from './models/quiz.model';
import { UserFacadeService } from '../shared/services/user/facades/user-facade-service';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  @Output() hideHelp = new EventEmitter<any>();
  start_Quiz: boolean = true;
  optionSelect: boolean;
  showToast: any = false;
  scoredPercentage: any;
  user: any;
  sendObject: any;
  responseFromDb: any;
  quizQuery: any;
  questions: any = [
    { "id": 2, "q_name": "Does do did am is are was were has have shall should can could may might should must ouaght Does d", "q_options": [{ val: "ok" }, { val: 1 }, { val: "ss" }, { val: "fasda" }], "q_answer": "ok", "q_checked": null },
    { "id": 3, "q_name": "json-server2", "q_options": [{ val: "yes" }, { val: "No" }, { val: "not" }, { val: "do" }], "q_answer": "yes", "q_checked": null },
    { "id": 4, "q_name": "json-server23", "q_options": [{ val: "was" }, { val: "are" }, { val: "is" }, { val: "am" }], "q_answer": "are", "q_checked": null },
    { "id": 5, "q_name": "json-server23", "q_options": [{ val: "was" }, { val: "are" }, { val: "is" }, { val: "am" }], "q_answer": "is", "q_checked": null }

  ];

  loadedQuestions: any = [];
  totalQuestions: any = [];
  displayQuestion: any = 0;
  answersArray: any = [];
  // currentQuestionAnswer : any = {questionNo : null, questionAnswer : null, questionId:null};
  currentQuestionAnswer: any = [];
  displaySaveNext: boolean;


  ///For Timer Results...
  totalTime: any = 15; ////Minutes..
  moduleSubmission: any = [];
  loadedModule: any;
  storeData: any = [];
  entireQuizModule: any = [];
  filteredQuizModule: any = [];
  loadedJsonModules: any = [];
  userDetails: any;
  thisAttemptObj: any;
  thisAttemptArray: any = [];
  selectModLength: any;
  empQuery: any;
  empDetailObj: any;
  selectedModule$: Observable<Quiz[]>;

  constructor(private http: HttpClient, private route: ActivatedRoute, private quizFacadeService: QuizFacadeService, private userFacadeService: UserFacadeService) {
    this.route.queryParams.subscribe(params => {
      this.userDetails = params;
      this.empQuizDetails(this.userDetails);
    });
    this.selectedModule$ = this.quizFacadeService.selectedModule$;
  }

  startQuiz(event: any, module_Obj: any) {
    this.selectModLength = module_Obj.questions.length;
    this.showToast = false;
    this.hideHelp.emit("help");
    this.loadedModule = module_Obj;
    this.questions = this.shuffleArray(module_Obj.questions);
    this.totalQuestions = this.questions;
    this.loadedQuestions = this.questions[this.displayQuestion];
    this.start_Quiz = !this.start_Quiz;
  }

  ngOnInit() {
    this.userFacadeService.fetchUserDetails();
    this.quizFacadeService.loadQuestions();
  }

  actionChange(action: any) {
    switch (action) {
      case 'next':
        this.loadedQuestions = this.questions[++this.displayQuestion];
        this.displaySaveNext = false;
        break;
      case 'previous':
        this.loadedQuestions = this.questions[--this.displayQuestion];
        this.displaySaveNext = false;
        break;
      case 'savenext':
        //this.saveAnswers();
        this.submitTotalQuiz("submit");
        break;
      default:
        break;
    }
  }

  saveAnswers() {
    let value = this.answersArray.find((each, index) => {
      if (each.questionId === this.loadedQuestions.id) {
        each.questionNo = this.displayQuestion;
        each.questionId = this.currentQuestionAnswer.questionId;
        each.questionAnswer = this.currentQuestionAnswer.questionAnswer;
        if (this.currentQuestionAnswer.questionAnswer === this.currentQuestionAnswer.actualAnswer) {
          each.isCorrect = true;
        }
        else {
          each.isCorrect = false;
        }
        return each;
      }
    })

    if (value !== undefined) {
    } else {
      if (this.currentQuestionAnswer.questionAnswer === this.currentQuestionAnswer.actualAnswer) {
        this.currentQuestionAnswer.isCorrect = true;
      }
      else {
        this.currentQuestionAnswer.isCorrect = false;
      }
      this.answersArray.push(this.currentQuestionAnswer);
    }
  }

  optionSelected(option: any, questionId: any, actualAnswer: any) {
    this.displaySaveNext = true;
    this.currentQuestionAnswer = {};
    this.currentQuestionAnswer.questionNo = this.displayQuestion;
    this.currentQuestionAnswer.questionId = questionId;
    this.currentQuestionAnswer.questionAnswer = option.val;
    this.currentQuestionAnswer.actualAnswer = actualAnswer;
    this.saveAnswers();
  }

  checkedSatus(questionId: any = null, optionValue: any = null) {
    if (this.answersArray !== undefined && this.answersArray.length > 0) {
      let value = this.answersArray.find((each, index) => {
        return each.questionId === questionId && each.questionAnswer === optionValue;
      })
      if (value !== undefined) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  empQuizDetails(usIdNo) {
    const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');
    this.quizQuery = usIdNo;
    this.http.post('/api/QuizDetails/getData/getQuizData', JSON.stringify(this.quizQuery), {
      headers: headers
    })
      .subscribe(data => {
        this.responseFromDb = data;
        if (this.responseFromDb.length > 0) {
          this.moduleSubmission = this.responseFromDb;
        }
      });
  }

  submitQuiz() {
    var result = this.answersArray.filter((each, index) => {
      return each.isCorrect === true;
    }).length;
    this.storeData = {};
    this.storeData.module_id = this.loadedModule.module_id;
    this.storeData.answersArray = this.answersArray;
    this.storeData.result = result;
    this.displayQuestion = 0;
    this.start_Quiz = !this.start_Quiz;
    this.answersArray = [];
    this.showToast = true;
    this.user = this.storeData;
    const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');
    this.sendObject = {};
    this.sendObject = this.storeData;
    this.sendObject.employeeID = this.quizQuery.empID;
    this.sendObject.percentage = this.percentageCalculation2(this.sendObject.result, this.selectModLength);
    this.sendObject.totalQuestionNum = this.selectModLength;
    this.thisAttemptObj = {};
    if (this.thisAttemptArray.length > 0) {
      this.thisAttemptObj = { attemptNumber: this.thisAttemptArray.length + 1, totalQuestionNum: this.sendObject.totalQuestionNum, correctAnswered: this.sendObject.result, percentage: this.sendObject.percentage }
      this.thisAttemptArray.push(this.thisAttemptObj);
      this.sendObject.attemptsArray = this.thisAttemptArray;
    } else {
      this.thisAttemptObj = { attemptNumber: "1", totalQuestionNum: this.sendObject.totalQuestionNum, correctAnswered: this.sendObject.result, percentage: this.sendObject.percentage }
      this.thisAttemptArray = [this.thisAttemptObj]
      this.sendObject.attemptsArray = this.thisAttemptArray;
    }

    this.http.post('/api/QuizDetails/save/QuizData', JSON.stringify(this.sendObject), {
      headers: headers
    })
      .subscribe(data => {
        this.responseFromDb = data;
        if (this.responseFromDb.length > 0) {
          this.moduleSubmission = this.responseFromDb;
        }
      });
  }

  verifyModuleCompletion(moduleData: any) {
    let completed = this.moduleSubmission.find((each, index) => {
      return each.module_id === moduleData.module_id;
    })
    if (completed !== undefined && completed) {
      return false;
    } else {
      return true;
    }
  }

  finalResultDisplay(moduleId: any) {
    let resultData = this.moduleSubmission.find((each, index) => {
      return each.module_id === moduleId;
    })
    if (resultData !== undefined && resultData) {
      return resultData.result;
    } else {
      return 0;
    }
  }

  submitTotalQuiz(value: any) {
    if (value === 'time-submit') {
      this.hideHelp.emit("time-submit");
    } else {
      this.hideHelp.emit("submit");
    }
  }

  percentageCalculation(marksGot: any, totalMarks: any) {
    this.scoredPercentage = (Number(marksGot) / Number(totalMarks)) * 100;
    return this.scoredPercentage;
  }

  percentageCalculation2(marksGot: any, totalMarks: any) {
    this.scoredPercentage = (Number(marksGot) / Number(totalMarks)) * 100;
    return this.scoredPercentage;
  }

  retakeExam(event: any, module_obj: any) {
    //Retake the exam......
    this.answersArray = [];
    this.displayQuestion = 0;
    this.selectModLength = module_obj.questions.length;
    let previModDetail = this.moduleSubmission.find((each, index) => {
      return each.module_id === module_obj.module_id;
    });

    if (previModDetail.attemptsArray) {
      this.thisAttemptArray = previModDetail.attemptsArray;
    } else {
      this.thisAttemptArray = [];
    }

    let indexPosition = this.moduleSubmission.findIndex((each, index) => {
      return each.module_id === module_obj.module_id;
    });

    this.moduleSubmission.splice(indexPosition, 1);
    this.startQuiz(event, module_obj);
  }

  shuffleArray(arr, n = 10) {
    n = (n < arr.length) ? arr.length : n;
    var result = new Array(n),
      len = arr.length,
      taken = new Array(len);

    if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }
}
