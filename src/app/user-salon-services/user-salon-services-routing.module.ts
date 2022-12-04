import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserSalonServicesPage } from './user-salon-services.page';

const routes: Routes = [
  {
    path: '',
    component: UserSalonServicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserSalonServicesPageRoutingModule {}
