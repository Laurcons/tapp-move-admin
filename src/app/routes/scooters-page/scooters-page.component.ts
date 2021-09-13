import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subscription, timer } from 'rxjs';
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
		center: { lat: 46.771071, lng: 23.59714 },
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
	subs: Subscription[] = [];

	constructor(
		private scooterService: ScooterService,
		private _router: Router
	) {}

	get router() { return this._router; }

	ngOnInit(): void {
		this.loadData();
		this.subs.push(
			interval(5000).subscribe(() => this.loadData())
		);
	}

	ngOnDestroy(): void {
		this.subs.forEach(s => s.unsubscribe());
	}

	async loadData() {
		if (this.isDestroyed) return;
		this.isLoading = true;
		const scooters = await this.scooterService.getAll();
		this.scooters = scooters.map((s) => ({
			...s,
			isHighlighted: false,
		}));
		// this.scooters = this.scooters.concat(
		// 	Array(50)
		// 		.fill(0)
		// 		.map((_, index) => ({
		// 			_id: 'BWABWA' + index,
		// 			batteryLevel: 420,
		// 			code: 'CJ' + index.toString().padStart(2, 'X'),
		// 			isCharging: true,
		// 			isDummy: true,
		// 			isHighlighted: false,
		// 			isUnlocked: true,
		// 			location: [
		// 				46.771071 - 0.05 + Math.random() * 0.1,
		// 				23.59714 - 0.05 + Math.random() * 0.1,
		// 			],
		// 			status: 'disabled',
		// 			lockId: '',
		// 		}))
		// );
		this.isLoading = false;
	}

	highlightScooter(id: string, fromMap = false) {
		const index = this.scooters.findIndex((s) => s._id === id);
		if (fromMap) {
			document.querySelector(`#scooter-${id}`)?.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
			});
		}
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
