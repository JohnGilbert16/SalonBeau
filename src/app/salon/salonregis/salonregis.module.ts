import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalonregisPageRoutingModule } from './salonregis-routing.module';

import { SalonregisPage } from './salonregis.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalonregisPageRoutingModule,
  ],
  declarations: [SalonregisPage],
})
export class SalonregisPageModule {}
