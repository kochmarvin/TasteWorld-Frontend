import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchByNamePage } from './search-by-name.page';

const routes: Routes = [
  {
    path: '',
    component: SearchByNamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchByNamePageRoutingModule {}
