import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { AuthService } from '../services/authentication/auth.service';
import { ProfileService } from '../services/profile/profile.service';
import { RecipesService } from '../services/recipes/recipes.service';
import { UserPopOverComponent } from '../user-pop-over/user-pop-over.component';

@Component({
  selector: 'app-user-recipes',
  templateUrl: './user-recipes.page.html',
  styleUrls: ['./user-recipes.page.scss'],
})
export class UserRecipesPage implements OnInit {

  recipes = [];

  constructor(public popoverController: PopoverController, public authService: AuthService, public profileService: ProfileService, public router: Router, public recipeService: RecipesService, public route: ActivatedRoute) {
    this.recipeService.getRecipesOfUser(route.snapshot.paramMap.get('id')).pipe().subscribe(result => {
      console.log(result);
      this.recipes = result.data.recipes;
    });
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
