import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalonregisPage } from './salonregis.page';

const routes: Routes = [
  {
    path: '',
    component: SalonregisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalonregisPageRoutingModule {}
