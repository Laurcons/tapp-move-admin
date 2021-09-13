import { BreadcrumbService } from 'xng-breadcrumb';
import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RideService, RideWithInfo } from 'src/app/services/ride.service';
import { interval, Subscription } from 'rxjs';

type AdaptedRide = RideWithInfo & {
	adaptedRoute: google.maps.LatLngLiteral[];
}

@Component({
	selector: 'app-details-page',
	templateUrl: './details-page.component.html',
	styleUrls: ['./details-page.component.scss'],
})
export class DetailsPageComponent implements OnInit, OnDestroy {
	ride?: AdaptedRide;
	subs: Subscription[] = [];
	mapCenter: google.maps.LatLngLiteral | null = null;
	isLoading = false;

	constructor(
		private rideService: RideService,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.loadData();
		this.subs.push(interval(5000).subscribe(() => this.loadData()));
	}

	ngOnDestroy() {
		this.subs.forEach((s) => s.unsubscribe());
	}

	async loadData() {
		this.isLoading = true;
		const id = this.route.snapshot.paramMap.get('id');
		if (!id) return;
		const ride = await this.rideService.getRide(id);
		this.ride = {
			...ride,
			adaptedRoute: ride.route.map((tuple) => ({
				lat: tuple[0],
				lng: tuple[1],
			})),
		};
		if (!this.mapCenter) {
			const count = this.ride.adaptedRoute.length;
			const latSum = this.ride.adaptedRoute
				.map((c) => c.lat)
				.reduce((a, c) => a + c, 0);
			const lngSum = this.ride.adaptedRoute
				.map((c) => c.lng)
				.reduce((a, c) => a + c, 0);
			const latAvg = latSum / count;
			const lngAvg = lngSum / count;
			this.mapCenter = {
				lat: latAvg,
				lng: lngAvg
			};
		}
		this.isLoading = false;
	}
}
