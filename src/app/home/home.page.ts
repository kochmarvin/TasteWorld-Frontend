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

    cart = [];

    constructor(private router: Router, private cartService: CartService, private toastController: ToastController) {
        this.cartService.getCart().pipe().subscribe(result => {
            this.cart = result.data.cart;
        });
    }

    remove(item: any, i: number) {
        this.cart.splice(i, 1);
        const a = [];
        a.push(item);
        this.cartService.deleteItem(a).pipe().subscribe(async result => {
            if (result.data) {
                const toast = await this.toastController.create({
                    message: 'Zutat wurde gelöscht',
                    duration: 2000
                });
                toast.present();
            } else {
                const toast = await this.toastController.create({
                    message: 'Ein Fehler ist aufgetreten beim löschen der Zutaten',
                    duration: 2000
                });
                toast.present();
            }
        });
    }

}
