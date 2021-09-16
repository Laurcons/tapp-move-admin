import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { interval, Subscription } from 'rxjs';
import { RideService } from 'src/app/services/ride.service';
import { Ride } from 'src/app/shared/model/ride-model';

@Component({
	selector: 'app-payment-dialog',
	templateUrl: './payment-dialog.component.html',
	styleUrls: ['./payment-dialog.component.scss'],
})
export class PaymentDialogComponent implements OnInit, OnDestroy {
	ride?: Ride;
	isLoading = true;
	message = "";
	sub?: Subscription;

	constructor(
		@Inject(MAT_DIALOG_DATA) private data: { rideId: string; },
		private rideService: RideService
	) {}

	ngOnInit(): void {
		this.loadData();
	}

	ngOnDestroy() {
		this.sub?.unsubscribe();
	}

	async loadData(followThrough = true) {
		const ride = await this.rideService.getRide(this.data.rideId);
		this.ride = ride;
		if (followThrough)
			this.initPayment();
	}

	async initPayment() {
		this.message = "Beginning payment";
		const url = await this.rideService.beginPayment(this.data.rideId);
		this.redirectAndBeginWaiting(url);
	}

	redirectAndBeginWaiting(url: string) {
		this.message = "Waiting for you";
		const elem = document.createElement("a");
		elem.href = url;
		elem.target = "_blank";
		console.log(elem);
		elem.click();
		this.sub = interval(5000).subscribe(async () => {
			await this.loadData(false);
			if (this.ride?.status !== 'payment-initiated') {
				this.sub?.unsubscribe();
				this.isLoading = false;
			}
		});
	}
}
