import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-user-pop-over',
  templateUrl: './user-pop-over.component.html',
  styleUrls: ['./user-pop-over.component.scss'],
})
export class UserPopOverComponent implements OnInit {

  constructor(public popOverController: PopoverController, public router: Router,
    private nav: NavController ) { }

  ngOnInit() {}

  close() {
    this.popOverController.dismiss();
  }

  goToPage(page: string) {
    this.router.navigate([`${page}`]);
  }

}
