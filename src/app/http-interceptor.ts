import { Injectable } from '@angular/core';
import {
	HttpEvent,
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
	HttpHeaders,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from "../environments/environment";
import { TokenService } from './auth/token.service';

@Injectable()
export class MainHttpInterceptor implements HttpInterceptor {

	constructor(private tokenService: TokenService) {}

	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		const url = req.url;
		const headers: Record<string, string> = {};
		const token = this.tokenService.getToken();
		console.log({token});
		if (token) {
			headers.Authorization = `Bearer ${token}`;
		}
		const newReq = req.clone({
			url: `${environment.apiBase}${url}`,
			setHeaders: headers
		});
		return next.handle(newReq);
	}
}
