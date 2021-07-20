import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { AuthService } from '../services/authentication/auth.service';
import { ProfileService } from '../services/profile/profile.service';
import { RecipesService } from '../services/recipes/recipes.service';
import { UserPopOverComponent } from '../user-pop-over/user-pop-over.component';

@Component({
  selector: 'app-search-by-ingredient',
  templateUrl: './search-by-ingredient.page.html',
  styleUrls: ['./search-by-ingredient.page.scss'],
})
export class SearchByIngredientPage implements OnInit {

  name = "";
  recipes = [];

  constructor(public popoverController: PopoverController, public authService: AuthService, public profileService: ProfileService, public router: Router, public recipeService: RecipesService) {
    
    profileService.getProfileData().pipe().subscribe(result => {
      console.log(result.data.data);
      this.name = result.data.data.firstName + " " + result.data.data.lastName;
    });
  }
  ngOnInit(): void {
  }

  async popclick(event: any) {
    const popover = await this.popoverController.create({
      component: UserPopOverComponent,
      event
    });
    return await popover.present();
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  getRecipes(event: any) {
    this.recipeService.getRecipesByName(event.detail.value).pipe().subscribe(result => {
      this.recipes =  result.data.recipes;
      console.log(this.recipes);
    });
  }

  goToCreatorRecipes(id: string) {
    this.recipeService.getRecipesOfUser(id).pipe().subscribe(result => {
      console.log(result);
    });
  }

  goToName() {
    this.router.navigate(['/search-by-ingredient']);
  }

  goToStart() {
    this.router.navigate(['/home']);
  }
}
