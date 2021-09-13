import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { interval, Subscription } from 'rxjs';
import { RideWithInfo, RideService } from 'src/app/services/ride.service';

type RideWithIndex = RideWithInfo & {
	index: number;
};

@Component({
	selector: 'app-rides-page',
	templateUrl: './rides-page.component.html',
	styleUrls: ['./rides-page.component.scss'],
})
export class RidesPageComponent implements OnInit, OnDestroy {
	tableColumns = [
		'index',
		'status',
		'startedAt',
		'endedAt',
		'duration',
		'distance',
		'scooter',
		'user',
		'options',
	];
	rides: RideWithInfo[] = [];
	subs: Subscription[] = [];
	entriesPerPage = 20;
	currentPage = 0;
	totalRides = 0;

	constructor(private rideService: RideService) {}

	ngOnInit(): void {
		this.loadData();
		this.subs.push(
			interval(5000).subscribe(() => this.loadData())
		);
	}

	ngOnDestroy() {
		this.subs.forEach(s => s.unsubscribe());
	}

	async loadData() {
		const result = await this.rideService.getAllRides(this.currentPage * this.entriesPerPage, this.entriesPerPage);
		this.rides = result.rides.map((r, i) => ({
			...r,
			index: i+1
		}));
		this.totalRides = result.total;
	}

	handlePage(event: PageEvent) {
		this.currentPage = event.pageIndex;
		this.loadData();
	}
}
