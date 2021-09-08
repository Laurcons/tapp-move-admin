import { TokenService } from './../../services/token.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { Admin } from '../../shared/model/admin-model';

@Component({
	selector: 'app-auth-page',
	templateUrl: './auth-page.component.html',
	styleUrls: ['./auth-page.component.scss'],
})
export class AuthPageComponent implements OnInit {
	admin: Admin | null = null;
	email = new FormControl("", [ Validators.required, Validators.email ]);
	password = new FormControl("", [ Validators.required, Validators.minLength(4) ]);
	isLoading = false;

	constructor(
		private authService: AuthService,
		private tokenService: TokenService,
		private snackBar: MatSnackBar,
		private router: Router
	) {
	}

	ngOnInit(): void {
		this.tokenService.unsetToken();
	}

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
			this.router.navigate(['/users']);
			this.password.setValue("");
		} catch (_) {
			this.snackBar.open("Couldn't perform login!");
		} finally {
			this.isLoading = false;
		}
	}
}
