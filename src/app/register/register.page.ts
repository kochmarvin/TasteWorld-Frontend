import { Component, OnInit } from '@angular/core';
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

  name = "";
  
  constructor(public router: Router, public authService: AuthService, public profileService: ProfileService, public recipeService: RecipesService, public cartService: CartService, public toastController: ToastController, public popoverController: PopoverController) {
    profileService.getProfileData().pipe().subscribe(result => {
      console.log(result.data.data);
      this.name = result.data.data.firstName + " " + result.data.data.lastName;
    });
  }

  ngOnInit(): void {
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToPage(page: string) {
    this.router.navigate(['' + page + '']);
  }

  async popclick(event: any) {
    const popover = await this.popoverController.create({
      component: UserPopOverComponent,
      event
    });
    return await popover.present();
  }
}
