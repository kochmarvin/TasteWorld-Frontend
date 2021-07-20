import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchByIngredientPageRoutingModule } from './search-by-ingredient-routing.module';

import { SearchByIngredientPage } from './search-by-ingredient.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchByIngredientPageRoutingModule
  ],
  declarations: [SearchByIngredientPage]
})
export class SearchByIngredientPageModule {}
