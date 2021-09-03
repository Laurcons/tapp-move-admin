import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { Admin } from '../../model/admin-model';

@Component({
	selector: 'app-auth-page',
	templateUrl: './auth-page.component.html',
	styleUrls: ['./auth-page.component.scss'],
})
export class AuthPageComponent implements OnInit {
	admin: Admin | null = null;
	email = new FormControl("", [ Validators.required, Validators.email ]);
	password = new FormControl("", [ Validators.required, Validators.minLength(4) ]);
	isLoading = true;

	constructor(
		private authService: AuthService,
		private snackBar: MatSnackBar
	) {
		authService.adminChanged$.subscribe(val => {
			this.admin = val;
		});
		authService.startupLoginFinished$.subscribe(isFinished => {
			this.isLoading = !isFinished;
		});
	}

	ngOnInit(): void {}

	async loginClick(event: Event) {
		event.preventDefault();
		this.email.updateValueAndValidity();
		if (!this.email.valid ||
			!this.password.valid)
			return;
		this.isLoading = true;
		try {
			await this.authService.login(
				this.email.value,
				this.password.value
			);
			this.password.setValue("");
		} catch (_) {
			this.snackBar.open("Couldn't perform login!");
		} finally {
			this.isLoading = false;
		}
	}

	logoutClick() {
		this.isLoading = true;
		this.authService
			.logout()
			.finally(() => this.isLoading = false);
		// setTimeout(() => this.isLoading = false, 2000);
	}
}
