import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddNewQuestionComponent } from '../../components/add-new-question/add-new-question.component';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { QuestionModel } from '../../models/form-builder.model';
import { QuestionType } from '../../../constants/question-type';
import { BroadcastService } from '../../../services/broadcast.service';
import { Router } from '@angular/router';
import { FORMS_ANSWERS_ROUTE, FORMS_ROUTE } from '../../../constants/strings';
import { Subscription, take } from 'rxjs';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit, OnDestroy {

  dialog = inject(MatDialog);
  broadcastService = inject(BroadcastService);
  routerService = inject(Router);

  subs = new Subscription();

  dataQuestion: QuestionModel[] = [];
  readonly QuestionType = QuestionType;
  formAnswers: FormGroup<{
    answers: any
  }> = new FormGroup({
    answers: new FormArray([])
  });
  isOther: boolean = false;

  constructor() {

  }

  ngOnInit(): void {
    this.subs.add(
      this.broadcastService.getDataQuestion().pipe(take(1)).subscribe(data => {
        if (data) {
          this.dataQuestion = data;
          this.dataQuestion.forEach((item: QuestionModel) => {
            this.updateForm(item);
          });
        }
      })
    );
    this.subs.add(
      this.broadcastService.getDataAnswers().subscribe(data => {
        this.formAnswers.patchValue(data);
      })
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  openModalAddNewQuestion() {
    const dialogRef = this.dialog.open(AddNewQuestionComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe((result: QuestionModel) => {
      if (result) {
        this.dataQuestion.push(result);
        this.updateForm(result);
        this.broadcastService.dataQuestionSet(this.dataQuestion);
      }
    });
  }

  updateForm(result: QuestionModel) {
    const formData: FormGroup<{
      title: FormControl<string | null>,
      type: FormControl<number | null>,
      listAnswers: any,
      isOther: FormControl<any>,
      otherCheckBox: FormControl<any>,
    }> = new FormGroup({
      title: new FormControl(result.formName),
      type: new FormControl(result.formType),
      listAnswers: new FormArray([]),
      isOther: new FormControl(false),
      otherCheckBox: new FormControl(false),
    })
    if (result.formType === QuestionType.paragraph) {
      formData.controls.listAnswers.push(new FormControl(''));
    } else {
      result.formAnswers.map((item: string) => {
        formData.controls.listAnswers.push(new FormControl(''));
      });
      if (result.allowSpecify) {
        formData.controls.isOther.setValue(true);
        formData.controls.listAnswers.push(new FormControl(''));
      }
    }
    this.formAnswers.controls.answers.push(formData);
  }

  reviewAnswers() {
    console.log(this.formAnswers.value);
    this.broadcastService.dataAnswersSet(this.formAnswers.value);
    this.routerService.navigate(['/', FORMS_ROUTE, FORMS_ANSWERS_ROUTE]);
  }
}
