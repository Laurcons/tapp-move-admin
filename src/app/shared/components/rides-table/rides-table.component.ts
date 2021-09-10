import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { RideService, RideWithInfo } from 'src/app/services/ride.service';
import { UserService } from 'src/app/services/user.service';
import { BreadcrumbService } from 'xng-breadcrumb';

type PromiseType<T> = T extends PromiseLike<infer U> ? U : T;

@Component({
	selector: 'app-rides-table',
	templateUrl: './rides-table.component.html',
	styleUrls: ['./rides-table.component.scss'],
})
export class RidesTableComponent implements OnInit {
	@Input() of!: 'user' | 'scooter';
	@Input() id!: string;

	rides: RideWithInfo[] | null = null;
	rideColumns = [
		'status',
		'started',
		'ended',
		'duration',
		'route',
		'price',
		'secondary',
		'options'
	];
	ridesPage = 0;
	entriesPerPage = 10;
	totalRides = 0;
	isDestroyed = false;
	rideSubscription?: Subscription;

	constructor(private rideService: RideService) {}

	ngOnDestroy(): void {
		this.isDestroyed = true;
		this.rideSubscription?.unsubscribe();
	}

	ngOnInit(): void {
		this.loadRides(true);
	}

	async loadRides(withTimer = false) {
		let response: PromiseType<
			ReturnType<typeof RideService['prototype']['getRidesForScooter']>
		>;
		if (this.of === 'user') {
			response = await this.rideService.getRidesForUser(
				this.id,
				this.ridesPage * this.entriesPerPage,
				this.entriesPerPage
			);
		} else if (this.of === 'scooter') {
			response = await this.rideService.getRidesForScooter(
				this.id,
				this.ridesPage * this.entriesPerPage,
				this.entriesPerPage
			);
		} else throw 'Invalid type';
		this.rides = response.rides;
		this.totalRides = response.total;
		this.entriesPerPage = response.count;
		this.rideSubscription = timer(10 * 1000).subscribe(() =>
			this.loadRides(true)
		);
	}

	onPageUpdate(event: PageEvent) {
		this.ridesPage = event.pageIndex;
		this.loadRides();
	}
}
