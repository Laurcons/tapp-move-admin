import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class TokenService {
	private _token: string | null = null;
	// private _tokenSubject = new BehaviorSubject<string | null>(this._token);
	// tokenChanged$ = this._tokenSubject.asObservable();

	constructor() {}

	setToken(token: string) {
		this._token = token;
		// this._tokenSubject.next(token);
	}
	unsetToken() {
		this._token = null;
		// this._tokenSubject.next(null);
	}
	getToken() {
		return this._token;
	}
	hasToken() {
		return this._token !== null;
	}
}
