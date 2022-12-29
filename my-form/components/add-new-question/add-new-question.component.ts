import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionType } from 'src/app/constants/question-type';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-new-question',
  templateUrl: './add-new-question.component.html',
  styleUrls: ['./add-new-question.component.scss']
})
export class AddNewQuestionComponent implements OnInit {

  dialogRef = inject(MatDialogRef<AddNewQuestionComponent>);
  readonly listQuestionType: { label: string, value: number}[] = [
    {
      label: 'Paragraph',
      value: QuestionType.paragraph
    },
    {
      label: 'Checkbox List',
      value: QuestionType.checkbox
    }
  ];
  readonly QuestionType = QuestionType;
  formNewQuestion: FormGroup<{
    id: FormControl<string>,
    formType: FormControl<number>,
    formName: FormControl<string>,
    formAnswers: FormArray<FormControl>,
    allowSpecify: FormControl<boolean>,
    requiredQuestion: FormControl<boolean>,
  }> = new FormGroup<any>({
    id: new FormControl(Date.now()),
    formType: new FormControl(QuestionType.paragraph),
    formName: new FormControl('', [Validators.required]),
    formAnswers: new FormArray([]),
    allowSpecify: new FormControl(false),
    requiredQuestion: new FormControl(false),
  })

  constructor() {
    this.formNewQuestion.controls.formType.valueChanges.subscribe(value => {
      if (value === QuestionType.paragraph) {
        this.formNewQuestion.controls.formAnswers.reset([]);
      }
      if (value === QuestionType.checkbox) {
        this.addNewAnswer();
      }
    })
  }

  ngOnInit(): void {
  }

  submitForm() {
    if (this.formNewQuestion.invalid) return;
    this.dialogRef.close(this.formNewQuestion.value);
  }

  addNewAnswer() {
    this.formNewQuestion.controls.formAnswers.push(new FormControl<string>('', [Validators.required]));
  }

}
