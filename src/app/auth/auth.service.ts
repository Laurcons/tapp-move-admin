import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from '../model/admin-model';
import { TokenService } from './token.service';
import { MatSnackBar } from '@angular/material/snack-bar';

type GetAccountsMeResponse = { status: string; admin?: Admin; code?: string };

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	// private _admin: Admin | null = null;
	private _adminSubject = new BehaviorSubject<Admin | null>(null);
	adminChanged$ = this._adminSubject.asObservable();

	private _startupLoginFinished = new BehaviorSubject<boolean>(false);
	startupLoginFinished$ = this._startupLoginFinished.asObservable();

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
		if (atoken) {
			const headers = new HttpHeaders({
				Authorization: `Bearer ${atoken}`
			});
			const { status, admin } = await this.http
				.get<GetAccountsMeResponse>('/accounts/me', { headers })
				.toPromise()
				.catch((err) => err.error as GetAccountsMeResponse);
			// these will always be together: make ts shut up about admin undefined
			if (status === 'success' && admin) {
				// we're logged in
				this.tokenService.setToken(atoken);
				this._adminSubject.next(admin);
				this.snackbarService.open("Session restored", "Dismiss");
			}
		}
		this._startupLoginFinished.next(true);
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
		// this._admin = admin;
		this._adminSubject.next(admin);
		return admin;
	}

	async logout() {
		const result = await this.http.post("/auth/logout", {}).toPromise();
		this._adminSubject.next(null);
		this.tokenService.unsetToken();
	}
}
