import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SaloninterPage } from './saloninter.page';

const routes: Routes = [
  {
    path: '',
    component: SaloninterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SaloninterPageRoutingModule {}
