import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { AuthService } from '../services/authentication/auth.service';
import { ProfileService } from '../services/profile/profile.service';
import { RecipesService } from '../services/recipes/recipes.service';
import { UserPopOverComponent } from '../user-pop-over/user-pop-over.component';

@Component({
    selector: 'app-recipe',
    templateUrl: './recipe.page.html',
    styleUrls: ['./recipe.page.scss'],
})
export class RecipePage implements OnInit {
    
    recipe = {

    };
    name = "";

    constructor(public popoverController: PopoverController, public authService: AuthService, public profileService: ProfileService, public router: Router, public recipeService: RecipesService, private route: ActivatedRoute) {

        profileService.getProfileData().pipe().subscribe(result => {
            this.name = result.data.data.firstName + " " + result.data.data.lastName;
        });

        recipeService.getRecipeById(route.snapshot.paramMap.get('id')).pipe().subscribe(result => {
            this.recipe = result.data.recipe;
            console.log(this.recipe);
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

    goToCreatorRecipes(id: string) {
        this.router.navigate(['/user-recipes/' + id]);
    }

    goToLogin() {
        this.router.navigate(['/login']);
    }

    goToPage(page: string) {
        this.router.navigate(['' + page + '']);
    }
}
