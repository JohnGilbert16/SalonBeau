import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserSalonServicesPageRoutingModule } from './user-salon-services-routing.module';

import { UserSalonServicesPage } from './user-salon-services.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserSalonServicesPageRoutingModule
  ],
  declarations: [UserSalonServicesPage]
})
export class UserSalonServicesPageModule {}
