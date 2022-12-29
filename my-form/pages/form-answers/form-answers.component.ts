import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { BroadcastService } from '../../../services/broadcast.service';
import { DATA_FORM_KEY } from '../../../constants/broadcast-key';
import { Router } from '@angular/router';
import { FORMS_BUILDER_ROUTE, FORMS_ROUTE } from '../../../constants/strings';
import { QuestionType } from '../../../constants/question-type';
import { zip } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-answers',
  templateUrl: './form-answers.component.html',
  styleUrls: ['./form-answers.component.scss']
})
export class FormAnswersComponent implements OnInit, OnDestroy {
  broadcastService = inject(BroadcastService);
  data: any[] = [];
  private dataAnswers$;
  constructor(private router: Router, private cdf: ChangeDetectorRef) {
    this.dataAnswers$ = zip([
      this.broadcastService.getDataAnswers(),
      this.broadcastService.getDataQuestion()
    ]).subscribe(([dataAnswers, dataQuestion]) => {
      const dataParse = dataAnswers.answers.map((item: {
        title: string
        type: number
        listAnswers: [],
        isOther?: boolean,
        otherCheckBox?: boolean,
      }, formAnswersIndex: number) => {
        let data: {
          title: string,
          listAnswers: string[]
        } = {
          title: item.title,
          listAnswers: [],
        };
        if (item.type === QuestionType.paragraph) {
          data.listAnswers = item.listAnswers;
        } else {
          item.listAnswers.map((itemAnswers: string | boolean, idx) => {
            if (itemAnswers) {
              if (!item.otherCheckBox || (item.otherCheckBox && idx < item.listAnswers.length - 1)) {
                data.listAnswers.push(dataQuestion[formAnswersIndex].formAnswers[idx]);
              }
              if (item.otherCheckBox && idx === item.listAnswers.length - 1) {
                data.listAnswers.push('Other - ' + itemAnswers);
              }
            }
          });
        }
        return data;
      });
      this.data = dataParse;
    });
  }

  ngOnDestroy() {
    this.dataAnswers$.unsubscribe();
  }

  ngOnInit(): void {
  }

  backToBuilder() {
    this.router.navigate(['/', FORMS_ROUTE, FORMS_BUILDER_ROUTE]);
  }
}
