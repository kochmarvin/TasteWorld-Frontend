import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { AuthService } from './services/authentication/auth.service';
import { ProfileService } from './services/profile/profile.service';
import { UserPopOverComponent } from './user-pop-over/user-pop-over.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public name: string = "";

  constructor(private router: Router, private popoverController: PopoverController, private profileService: ProfileService, public authService: AuthService) {
    profileService.getProfileData().pipe().subscribe(result => {
      console.log(result.data.data);
      this.name = result.data.data.firstName + " " + result.data.data.lastName;
    });
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
