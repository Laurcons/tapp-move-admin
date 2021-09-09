import { MatDialog } from '@angular/material/dialog';
import { DateTime } from 'luxon';
import { RideService, RideWithInfo } from './../../../services/ride.service';
import { Ride } from '../../../shared/model/ride-model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../../shared/model/user-model';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { interval, Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { SuspendDialogComponent } from '../suspend-dialog/suspend-dialog.component';

@Component({
	selector: 'app-details-page',
	templateUrl: './details-page.component.html',
	styleUrls: ['./details-page.component.scss'],
})
export class DetailsPageComponent implements OnInit, OnDestroy {
	isLoading = false;
	user: User | null = null;
	rides: RideWithInfo[] | null = null;
	rideColumns = [
		'status',
		'started',
		'ended',
		'duration',
		'route',
		'price',
		'scooter',
	];
	ridesPage = 0;
	entriesPerPage = 10;
	totalRides = 0;
	isDestroyed = false;

	constructor(
		private userService: UserService,
		private rideService: RideService,
		private route: ActivatedRoute,
		private snackbarService: MatSnackBar,
		private breadcrumbService: BreadcrumbService,
		private dialogService: MatDialog
	) {}

	ngOnInit(): void {
		// don't await
		this.loadData();
	}

	ngOnDestroy(): void {
		this.isDestroyed = true;
	}

	async loadData() {
		const id = this.route.snapshot.paramMap.get('id');
		if (!id) {
			this.snackbarService.open('Invalid id');
			return;
		}
		this.user = await this.userService.getOne(id);
		this.breadcrumbService.set(
			'/users/:id',
			`Details for ${this.user.email}`
		);
		await this.loadRides();
	}

	async loadRides() {
		if (this.isDestroyed) return;
		try {
			if (this.user) {
				const response = await this.rideService.getRidesForUser(
					this.user._id,
					this.ridesPage * this.entriesPerPage,
					this.entriesPerPage
				);
				this.rides = response.rides;
				this.totalRides = response.total;
				this.entriesPerPage = response.count;
			}
		} catch (_) {
		} finally {
			setTimeout(() => this.loadRides(), 5 * 1000);
		}
	}

	onPageUpdate(event: PageEvent) {
		this.ridesPage = event.pageIndex;
		this.loadRides();
	}

	handleSuspend() {
		this.dialogService.open(SuspendDialogComponent, {
			data: { user: this.user }
		}).afterClosed().subscribe((result) => {
			if (result.success) {
				if (this.user)
					this.user.suspendedReason = result.newUser.suspendedReason;
			}
		});
	}
}
