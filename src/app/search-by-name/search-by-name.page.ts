import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { AuthService } from '../services/authentication/auth.service';
import { ProfileService } from '../services/profile/profile.service';
import { RecipesService } from '../services/recipes/recipes.service';
import { UserPopOverComponent } from '../user-pop-over/user-pop-over.component';

@Component({
  selector: 'app-search-by-name',
  templateUrl: './search-by-name.page.html',
  styleUrls: ['./search-by-name.page.scss'],
})
export class SearchByNamePage implements OnInit {

  recipes = [];

  constructor(public popoverController: PopoverController, public authService: AuthService, public profileService: ProfileService, public router: Router, public recipeService: RecipesService) {
  }

  ngOnInit(): void {
  }
  
  getRecipes(event: any) {
    this.recipeService.getRecipesByName(event.detail.value).pipe().subscribe(result => {
      this.recipes =  result.data.recipes;
      console.log(this.recipes);
    });
  }
  
  goToCreatorRecipes(id: string) {
    this.router.navigate(['/user-recipes/' + id]);
  }
}
