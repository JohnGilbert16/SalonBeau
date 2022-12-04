import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SlashcreenPage } from './slashcreen.page';

const routes: Routes = [
  {
    path: '',
    component: SlashcreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SlashcreenPageRoutingModule {}
