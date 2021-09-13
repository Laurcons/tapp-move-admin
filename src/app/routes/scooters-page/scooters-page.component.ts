import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { ScooterService } from 'src/app/services/scooter.service';
import { Scooter } from 'src/app/shared/model/scooter-model';

type ScooterWithHighlighting = Scooter & { isHighlighted: boolean };

@Component({
	selector: 'app-scooters-page',
	templateUrl: './scooters-page.component.html',
	styleUrls: ['./scooters-page.component.scss'],
})
export class ScootersPageComponent implements OnInit, OnDestroy {
	map = {
		center: { lat: 46.770532, lng: 23.625386 },
	};
	scooters: ScooterWithHighlighting[] = [];
	tableColumns = [
		'code',
		'status',
		'batteryLevel',
		'isUnlocked',
		'isCharging',
		'lockId',
	];
	updateSubscription?: Subscription;
	isDestroyed = false;
	isLoading = false;

	constructor(
		private scooterService: ScooterService,
		private _router: Router
	) {}

	get router() { return this._router; }

	ngOnInit(): void {
		this.loadData(true);
	}

	ngOnDestroy(): void {
		// this.updateSubscription?.unsubscribe();
		this.isDestroyed = true;
	}

	async loadData(withTimer = false) {
		if (this.isDestroyed) return;
		this.isLoading = true;
		const scooters = await this.scooterService.getAll();
		this.scooters = scooters.map((s) => ({
			...s,
			isHighlighted: false,
		}));
		// if (withTimer)
			// timer(10 * 1000).subscribe(() => this.loadData(true));
		this.isLoading = false;
	}

	highlightScooter(id: string) {
		const index = this.scooters.findIndex((s) => s._id === id);
		this.scooters[index].isHighlighted = true;
	}

	unhighlightScooter(id: string) {
		const index = this.scooters.findIndex((s) => s._id === id);
		this.scooters[index].isHighlighted = false;
	}

	centerOnScooter(id: string) {
		const scooter = this.scooters.find((s) => s._id === id);
		if (!scooter) throw 'Scooter Not Found';
		this.map.center = {
			lat: scooter.location[0],
			lng: scooter.location[1],
		};
	}
}
