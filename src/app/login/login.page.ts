import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/authentication/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	loginForm: FormGroup;

	constructor(private authService: AuthService, private fb: FormBuilder, private router: Router, public toastController: ToastController) {
		this.authService.checkAuthenticated().pipe().subscribe(result => {
			if (result.data) {
				router.navigate(['/home']);
			}
		});

		this.loginForm = fb.group({
			email: ['', Validators.required],
			password: ['', Validators.required],
		});

	}

	ngOnInit() {
	}

	async login(value: any) {
		this.authService
			.login(
				this.loginForm.controls.email.value,
				this.loginForm.controls.password.value
			)
			.pipe()
			.subscribe(async (data) => {
				// @ts-ignore
				if (data.data) {
					// @ts-ignore
					localStorage.setItem('id_token', data.data.token);
					this.authService.isAuthorized = true;
					this.router.navigate(['/profile']);
				} else {
					const toast = await this.toastController.create({
						message: data.error.error_message,
						duration: 2000
					});
					toast.present();
				}
			});
	}
}
