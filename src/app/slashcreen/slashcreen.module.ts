import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SlashcreenPageRoutingModule } from './slashcreen-routing.module';

import { SlashcreenPage } from './slashcreen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SlashcreenPageRoutingModule
  ],
  declarations: [SlashcreenPage]
})
export class SlashcreenPageModule {}
