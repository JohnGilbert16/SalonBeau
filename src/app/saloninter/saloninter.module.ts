import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SaloninterPageRoutingModule } from './saloninter-routing.module';

import { SaloninterPage } from './saloninter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SaloninterPageRoutingModule
  ],
  declarations: [SaloninterPage]
})
export class SaloninterPageModule {}
