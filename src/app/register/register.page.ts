import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController, PopoverController } from '@ionic/angular';
import { AuthService } from '../services/authentication/auth.service';
import { CartService } from '../services/cart/cart.service';
import { ProfileService } from '../services/profile/profile.service';
import { RecipesService } from '../services/recipes/recipes.service';
import { UserPopOverComponent } from '../user-pop-over/user-pop-over.component';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

    name = '';
    registerForm: FormGroup;
    passwordCheck: string;

    constructor(private fb: FormBuilder, public router: Router, public authService: AuthService, public profileService: ProfileService, public recipeService: RecipesService, public cartService: CartService, public toastController: ToastController, public popoverController: PopoverController) {
        this.registerForm = fb.group({
            email: ['', Validators.required],
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            password: ['', Validators.required],
            passwordCheck: ['', [Validators.required, this.matchValues('password')]]
        });
    }

    public matchValues(
        matchTo: string // name of the control to match to
    ): (AbstractControl) => ValidationErrors | null {
        return (control: AbstractControl): ValidationErrors | null => !!control.parent &&
            !!control.parent.value &&
            control.value === control.parent.controls[matchTo].value
            ? null
            : { isMatching: false };
    }

    register(event: any) {
        this.authService.register(this.registerForm.controls.email.value, this.registerForm.controls.firstname.value, this.registerForm.controls.lastname.value, this.registerForm.controls.password.value).pipe().subscribe(async result => {
            // @ts-ignore
            if (!result.data) {
                const toast = await this.toastController.create({
                    // @ts-ignore
                    message: result.error.error_message,
                    duration: 2000
                });
                toast.present();
            } else {
                const toast = await this.toastController.create({
                    // @ts-ignore
                    message: result.data.message,
                    duration: 2000
                });
                toast.present();
            }
        });
    }

    ngOnInit(): void {
    }


}
