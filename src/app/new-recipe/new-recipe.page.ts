import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { RecipesService } from '../services/recipes/recipes.service';

@Component({
    selector: 'app-new-recipe',
    templateUrl: './new-recipe.page.html',
    styleUrls: ['./new-recipe.page.scss'],
})
export class NewRecipePage implements OnInit {

    recipeForm: FormGroup;
    ing = '';
    amount = 0;

    ingredients = [];

    constructor(private fb: FormBuilder, private recipeService: RecipesService, private toastController: ToastController) {
        this.recipeForm = fb.group({
            name: ['', Validators.required],
            preperation: ['', Validators.required],
            persons: [1, Validators.required],
            duration: ['', Validators.required],
        });
    }

    ngOnInit() {
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

    create(event: any) {
        this.recipeService.createRecipe(
            this.recipeForm.controls.name.value, 
            this.recipeForm.controls.preperation.value, 
            this.ingredients, 
            this.recipeForm.controls.persons.value, 
            this.recipeForm.controls.duration.value, 
            undefined).pipe().subscribe(async result => {
                // @ts-ignore
				if (result.data) {
                    const toast = await this.toastController.create({
						message: result.data.message,
						duration: 2000
					});
					toast.present();
				} else {
					const toast = await this.toastController.create({
						message: result.error.error_message,
						duration: 2000
					});
					toast.present();
				}
            });
    }
}
