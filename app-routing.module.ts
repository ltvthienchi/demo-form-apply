import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FORMS_ROUTE } from './constants/strings';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./dashboard/dashboard.module').then(module => module.DashboardModule),
  },
  {
    path: FORMS_ROUTE,
    loadChildren: () => import('./my-form/my-form.module').then(module => module.MyFormModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
