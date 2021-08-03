import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/authentication/auth.service';
import { CartService } from '../services/cart/cart.service';
import { ProfileService } from '../services/profile/profile.service';
import { UserPopOverComponent } from '../user-pop-over/user-pop-over.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  name = "";
  cart = [];

  constructor(public popoverController: PopoverController, public authService: AuthService, public profileService: ProfileService, public router: Router, public cartService: CartService, private toastController: ToastController) {
    
    profileService.getProfileData().pipe().subscribe(result => {
      console.log(result.data.data);
      this.name = result.data.data.firstName + " " + result.data.data.lastName;
    });

    this.cartService.getCart().pipe().subscribe(result => {
      this.cart = result.data.cart;
    });
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

  goToPage(page: string) {
		this.router.navigate([''+ page + '']);
	}

  remove(item: any, i: number) {
    this.cart.splice(i, 1);
    let a = [];
    a.push(item);
    this.cartService.deleteItem(a).pipe().subscribe(async result => {
      if (result.data) {
        const toast = await this.toastController.create({
            message: 'Zutat wurde gelöscht',
            duration: 2000
        });
        toast.present();
    }else {
        const toast = await this.toastController.create({
            message: 'Ein Fehler ist aufgetreten beim löschen der Zutaten',
            duration: 2000
          });
          toast.present();
    }
    }); 
  }

}
