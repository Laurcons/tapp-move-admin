import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from '../shared/model/admin-model';
import { TokenService } from './token.service';
import { MatSnackBar } from '@angular/material/snack-bar';

type GetAccountsMeResponse = { status: string; admin?: Admin; code?: string };

@Injectable({
	providedIn: 'root',
})
export class AuthService {

	constructor(
		private tokenService: TokenService,
		private http: HttpClient,
		private snackbarService: MatSnackBar
	) {
		// don't await
		this.tryStartupLogin();
	}

	private async tryStartupLogin() {
		const atoken = localStorage.getItem('AUTH_TOKEN');
		if (atoken)
			this.tokenService.setToken(atoken);
	}

	async login(email: string, password: string) {
		const result = await this.http
			.post<{ admin: Admin; token: string }>('/auth/login', {
				email,
				password,
			})
			.toPromise();
		const { admin, token } = result;
		this.tokenService.setToken(token);
		localStorage.setItem('AUTH_TOKEN', token);
		return admin;
	}

	async logout() {
		await this.http.post("/auth/logout", {}).toPromise();
		this.tokenService.unsetToken();
	}
}
