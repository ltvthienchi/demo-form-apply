import { RouterModule, Routes } from '@angular/router';
import { MyFormComponent } from './my-form.component';
import { NgModule } from '@angular/core';
import { FormBuilderComponent } from './pages/form-builder/form-builder.component';
import { FormAnswersComponent } from './pages/form-answers/form-answers.component';
import { FORMS_ANSWERS_ROUTE, FORMS_BUILDER_ROUTE } from '../constants/strings';

const routes: Routes = [
  {
    path: '',
    component: MyFormComponent,
    children: [
      {
        path: FORMS_BUILDER_ROUTE,
        component: FormBuilderComponent,
      },
      {
        path: FORMS_ANSWERS_ROUTE,
        component: FormAnswersComponent,
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyFormRoutingModule {

}
