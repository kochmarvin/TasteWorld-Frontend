import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/authentication/auth.service';
import { CartService } from '../services/cart/cart.service';
import { ProfileService } from '../services/profile/profile.service';
import { RecipesService } from '../services/recipes/recipes.service';
import { UserPopOverComponent } from '../user-pop-over/user-pop-over.component';

@Component({
    selector: 'app-search-by-ingredient',
    templateUrl: './search-by-ingredient.page.html',
    styleUrls: ['./search-by-ingredient.page.scss'],
})
export class SearchByIngredientPage implements OnInit {

    ing = '';
    amount = 0;

    ingredients = [];
    recipes = [];

    constructor(public router: Router, public authService: AuthService, public profileService: ProfileService, public recipeService: RecipesService, public cartService: CartService, public toastController: ToastController) {
    }

    ngOnInit(): void {
    }

    addItem() {
        this.ingredients.push({
            name: this.ing,
            amount: this.amount.toString(),
            unit: 'g'
        });
        this.ing = '';
        this.amount = 0;
    }

    remove(i: number) {
        this.ingredients.splice(i, 1);
    }

    search() {
        this.recipeService.getRecipesByIngredients(this.ingredients).pipe().subscribe(result => {
            this.recipes = result.data.recipes;
            console.log(this.recipes);
        });
    }

    addToCart(items: any) {
        this.cartService.addToCart(items).pipe().subscribe(async result => {
            if (result.data) {
                const toast = await this.toastController.create({
                    message: 'Fehlende Zutaten wurden in den Warenkorb gegeben',
                    duration: 2000
                });
                toast.present();
            }else {
                const toast = await this.toastController.create({
                    message: 'Ein Fehler ist aufgetreten beim hinzufügen der Zutaten',
                    duration: 2000
                  });
                  toast.present();
            }
        });
    }

    goToCreatorRecipes(id: string) {
        this.router.navigate(['/user-recipes/' + id]);
    }
}
