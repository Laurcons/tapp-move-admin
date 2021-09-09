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
export class DetailsPageComponent implements OnInit {
	isLoading = false;
	user: User | null = null;

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
