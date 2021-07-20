import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchByIngredientPage } from './search-by-ingredient.page';

const routes: Routes = [
  {
    path: '',
    component: SearchByIngredientPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchByIngredientPageRoutingModule {}
