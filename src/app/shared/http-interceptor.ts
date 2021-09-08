import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
	HttpEvent,
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
	HttpErrorResponse,
	HttpResponse,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { TokenService } from '../services/token.service';
import { BackgroundWorkService } from '../services/background-work.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MainHttpInterceptor implements HttpInterceptor {
	constructor(
		private tokenService: TokenService,
		private router: Router,
		private snackbarService: MatSnackBar,
		private backgroundWorkService: BackgroundWorkService
	) {}

	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		const url = req.url;
		const headers: Record<string, string> = {};
		const token = this.tokenService.getToken();
		const taskId = "http-" + uuidv4();
		if (token) {
			headers.Authorization = `Bearer ${token}`;
		}
		const newReq = req.clone({
			url: `${environment.apiBase}${url}`,
			setHeaders: headers,
		});
		this.backgroundWorkService.addTask(taskId);
		return next.handle(newReq).pipe(
			tap(
				(event) => {
					if (event instanceof HttpResponse)
						this.backgroundWorkService.endTask(taskId);
				},
				(event) => {
					if (event instanceof HttpErrorResponse) {
						this.backgroundWorkService.endTask(taskId);
						// check if status is invalid token
						if (
							event.error.status === 'error' &&
							event.error.code === 'invalid-token'
						) {
							this.router.navigate(['/auth']);
							this.tokenService.unsetToken();
							this.snackbarService.open('Session expired');
						}
					}
				}
			)
		);
	}
}
