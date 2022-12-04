import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApptschedPageRoutingModule } from './apptsched-routing.module';

import { ApptschedPage } from './apptsched.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApptschedPageRoutingModule
  ],
  declarations: [ApptschedPage]
})
export class ApptschedPageModule {}
