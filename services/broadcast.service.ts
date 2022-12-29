import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BroadcastService {
  constructor() {}

  private dataAnswers$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  dataAnswersSet(data: any) {
    this.dataAnswers$.next(data);
  }
  getDataAnswers() {
    return this.dataAnswers$;
  }

  private dataQuestion$: BehaviorSubject<any> = new BehaviorSubject(null);
  dataQuestionSet(data: any) {
    this.dataQuestion$.next(data);
  }
  getDataQuestion() {
    return this.dataQuestion$;
  }
}
