import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyFormComponent } from './my-form.component';
import { MyFormRoutingModule } from './my-form-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilderComponent } from './pages/form-builder/form-builder.component';
import { FormAnswersComponent } from './pages/form-answers/form-answers.component';
import { AddNewQuestionComponent } from './components/add-new-question/add-new-question.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    MyFormComponent,
    FormBuilderComponent,
    FormAnswersComponent,
    AddNewQuestionComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MyFormRoutingModule,
    MatSelectModule,
    MatDialogModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
  ]
})
export class MyFormModule { }
