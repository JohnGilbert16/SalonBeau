import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApptschedPage } from './apptsched.page';

const routes: Routes = [
  {
    path: '',
    component: ApptschedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApptschedPageRoutingModule {}
