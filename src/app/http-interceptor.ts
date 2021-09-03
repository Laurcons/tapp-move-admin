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
		const headers = req.headers;
		const token = this.tokenService.getToken();
		if (token) {
			headers.set("Authorization", `Bearer ${token}`);
		}
		const newReq = req.clone({
			url: `${environment.apiBase}${url}`,
			headers
		});
		return next.handle(newReq);
	}
}
