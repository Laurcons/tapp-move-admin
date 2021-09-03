import { TokenService } from './services/token.service';
import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';
import {
	MatSnackBar,
	MatSnackBarRef,
	TextOnlySnackBar,
} from '@angular/material/snack-bar';
import {
	RouteConfigLoadEnd,
	RouteConfigLoadStart,
	Router,
} from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	isSidebarOpen = false;
	isLazyLoading = false;
	isLoggedIn = false;
	private lazyloadingSnackRef: MatSnackBarRef<TextOnlySnackBar> | null = null;

	constructor(
		private router: Router,
		private snackbarService: MatSnackBar,
		private authService: AuthService,
		private tokenService: TokenService
	) {
		tokenService.tokenChanged$.subscribe(token => {
			this.isLoggedIn = !!token;
		});
	}

	ngOnInit() {
		this.router.events.subscribe((event) => {
			if (event instanceof RouteConfigLoadStart) {
				this.isLazyLoading = true;
				setTimeout(() => {
					if (this.isLazyLoading)
						this.lazyloadingSnackRef =
							this.snackbarService.open('Please wait');
				}, 500);
			} else if (event instanceof RouteConfigLoadEnd) {
				this.isLazyLoading = false;
				this.lazyloadingSnackRef?.dismiss();
			}
		});
	}

	async onLogoutClick() {
		const ref = this.snackbarService.open('Please wait');
		await this.authService.logout();
		ref.dismiss();
		this.router.navigate(["/auth"]);
	}
}
