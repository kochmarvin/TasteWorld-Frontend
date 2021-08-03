import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchByNamePageRoutingModule } from './search-by-name-routing.module';

import { SearchByNamePage } from './search-by-name.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchByNamePageRoutingModule
  ],
  declarations: [SearchByNamePage]
})
export class SearchByNamePageModule {}
