import { DateTime } from 'luxon';
import { RideService, RideWithInfo } from './../../../services/ride.service';
import { Ride } from './../../../model/ride-model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from './../../../model/user-model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { interval, Subscription } from 'rxjs';

@Component({
	selector: 'app-details-page',
	templateUrl: './details-page.component.html',
	styleUrls: ['./details-page.component.scss'],
})
export class DetailsPageComponent implements OnInit, OnDestroy {
	isLoading = false;
	user: User | null = null;
	rides: RideWithInfo[] | null = null;
	rideColumns = ['status', 'duration', 'route', 'price', 'scooter'];
	rideInterval!: Subscription;

	constructor(
		private userService: UserService,
		private rideService: RideService,
		private route: ActivatedRoute,
		private snackbarService: MatSnackBar,
		private breadcrumbService: BreadcrumbService
	) {}

	ngOnInit(): void {
		// don't await
		this.loadData();
		this.rideInterval = interval(5 * 1000).subscribe(async () => {
			this.isLoading = true;
			await this.loadRides();
			this.isLoading = false;
		});
	}

	ngOnDestroy(): void {
		this.rideInterval.unsubscribe();
	}

	async loadData() {
		const id = this.route.snapshot.paramMap.get('id');
		if (!id) {
			this.snackbarService.open('Invalid id');
			return;
		}
		this.isLoading = true;
		this.user = await this.userService.getOne(id);
		this.breadcrumbService.set(
			'/users/:id',
			`Details for ${this.user.email}`
		);
		await this.loadRides();
		this.isLoading = false;
	}

	async loadRides() {
		if (this.user)
			this.rides = await this.rideService.getRidesForUser(this.user._id);
	}
}
