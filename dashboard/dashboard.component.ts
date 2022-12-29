import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FORMS_BUILDER_ROUTE, FORMS_ROUTE } from '../constants/strings';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(private router: Router) { }

  goToForm() {
   this.router.navigate(['/', FORMS_ROUTE, FORMS_BUILDER_ROUTE]);
  }

}
