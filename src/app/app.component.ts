import { BackgroundWorkService } from './services/background-work.service';
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
	sidenavStatus: "open" | "closed" | "hidden" = "hidden";
	isLazyLoading = false;
	isDoingTask = false;
	isLoggedIn = false;
	private lazyloadingSnackRef: MatSnackBarRef<TextOnlySnackBar> | null = null;

	constructor(
		private router: Router,
		private snackbarService: MatSnackBar,
		private authService: AuthService,
		private tokenService: TokenService,
		private backgroundWorkService: BackgroundWorkService
	) {}

	ngOnInit() {
		this.router.events.subscribe((event) => {
			if (event instanceof RouteConfigLoadStart) {
				this.isLazyLoading = true;
				setTimeout(() => {
					if (this.isLazyLoading)
						this.lazyloadingSnackRef =
							this.snackbarService.open('Please wait', undefined, { duration: 100 * 60 * 1000 });
				}, 500);
			} else if (event instanceof RouteConfigLoadEnd) {
				this.isLazyLoading = false;
				this.lazyloadingSnackRef?.dismiss();
			}
		});
		this.tokenService.tokenChanged$.subscribe((token) => {
			setTimeout(() => {
				this.isLoggedIn = !!token;
				if (this.isLoggedIn)
					this.sidenavStatus = "closed";
				else this.sidenavStatus = "hidden";
			}, 0);
		});
		this.backgroundWorkService.taskList$.subscribe((list) => {
			setTimeout(() => (this.isDoingTask = list.length !== 0), 0);
		});
	}

	async onLogoutClick() {
		const ref = this.snackbarService.open('Please wait');
		await this.authService.logout();
		ref.dismiss();
		this.router.navigate(['/auth']);
	}

	async sidenavMouseEnter() {
		// setTimeout(() => {
		// 	if (this.sidenavStatus === 'closed')
				this.sidenavStatus = 'open';
		// }, 750);
	}
}
