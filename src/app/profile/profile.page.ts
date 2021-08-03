import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PopoverController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/authentication/auth.service';
import { ProfileService } from '../services/profile/profile.service';
import { UserPopOverComponent } from '../user-pop-over/user-pop-over.component';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.page.html',
	styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

	personalInformationForm: FormGroup;
	selectedFile = null;
	selectedFileURL = null;
	name = "";
	picture = "";

	constructor(public popoverController: PopoverController, public authService: AuthService, public profileService: ProfileService, public router: Router, private fb: FormBuilder, public toastController: ToastController) {

		profileService.getProfileData().pipe().subscribe(result => {
			console.log(result.data.data);
			this.name = result.data.data.firstName + " " + result.data.data.lastName;
			this.picture = result.data.data.picturePath;
			this.personalInformationForm.controls.firstname.setValue(result.data.data.firstName);
			this.personalInformationForm.controls.lastname.setValue(result.data.data.lastName);
			this.personalInformationForm.controls.email.setValue(result.data.data.email);
		});

		this.personalInformationForm = fb.group({
			firstname: ["", Validators.required],
			lastname: ["", Validators.required],
			email: ["", Validators.required],
		});

	}

	ngOnInit() {

	}

	onFileSelected(event: any) {
		this.selectedFile = event.target.files[0];
		this.selectedFileURL = URL.createObjectURL(event.target.files[0]);
	}

	async popclick(event: any) {
		const popover = await this.popoverController.create({
			component: UserPopOverComponent,
			event
		});
		return await popover.present();
	}

	
	saveData(value: any) {
		this.profileService.updatePersonalInformationData(
			this.personalInformationForm.controls.firstname.value,
			this.personalInformationForm.controls.lastname.value,
			this.personalInformationForm.controls.email.value,
			this.selectedFile
			).pipe().subscribe(async result => {
				if (!result.error) {
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
		
	goToLogin() {
		this.router.navigate(['/login']);
	}
	
	goToPage(page: string) {
		this.router.navigate([''+ page + '']);
	}

}
