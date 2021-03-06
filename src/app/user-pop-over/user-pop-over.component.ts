import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, PopoverController } from '@ionic/angular';
import { AuthService } from '../services/authentication/auth.service';
import { ProfileService } from '../services/profile/profile.service';

@Component({
  selector: 'app-user-pop-over',
  templateUrl: './user-pop-over.component.html',
  styleUrls: ['./user-pop-over.component.scss'],
})
export class UserPopOverComponent implements OnInit {

  id = '';

  constructor(public popOverController: PopoverController, public router: Router,
    private nav: NavController, public profileService: ProfileService, public authService: AuthService) { }

  ngOnInit() {
    this.profileService.getProfileData().pipe().subscribe(result => {
      this.id = result.data.data._id;
    });
  }

  close() {
    this.popOverController.dismiss();
  }

  goToPage(page: string) {
    this.router.navigate([''+ page + '']);
    this.popOverController.dismiss();
  }

  myRecipes() {
    this.router.navigate(['user-recipes/' + this.id]);
    this.popOverController.dismiss();
  }

  logout() {
    localStorage.removeItem('id_token');
    this.authService.isAuthorized = false;
    this.router.navigate(['search-by-name']);
    this.popOverController.dismiss();
  }

}
