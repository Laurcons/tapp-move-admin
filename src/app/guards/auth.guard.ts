import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
	UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	constructor(
		private tokenService: TokenService,
		private router: Router,
		private snackbarService: MatSnackBar,
		private authService: AuthService
	) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	):
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree>
		| boolean
		| UrlTree {

		return new Promise<boolean>((resolve) => {
			const subscription = this.authService.startupLoginFinished$.subscribe(isFinished => {
				if (isFinished) {
					if (this.tokenService.hasToken()) {
						resolve(true);
					} else {
						this.router.navigate(["/"]);
						this.snackbarService.open("Please login!");
						resolve(false);
					}
					subscription.unsubscribe();
				}
			});
		});
	}
}
