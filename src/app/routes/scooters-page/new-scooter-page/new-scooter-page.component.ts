import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ScooterService } from 'src/app/services/scooter.service';

@Component({
	selector: 'app-new-scooter-page',
	templateUrl: './new-scooter-page.component.html',
	styleUrls: ['./new-scooter-page.component.scss'],
})
export class NewScooterPageComponent implements OnInit, OnDestroy {
	lockIdValidators = [ Validators.pattern(/^[0-9]{15}$/), Validators.required ];
	form = new FormGroup({
		code: new FormControl('XYZT', [
			Validators.pattern(/^[A-Z0-9]{4}$/),
			Validators.required,
		]),
		isDummy: new FormControl(true),
		lockId: new FormControl('', this.lockIdValidators),
		locationLat: new FormControl(46.76919502052316, [Validators.required]),
		locationLon: new FormControl(23.609169904203604, [Validators.required]),
		batteryLevel: new FormControl(98, [
			Validators.max(100),
			Validators.min(0),
			Validators.required,
		]),
		isCharging: new FormControl(false),
		isUnlocked: new FormControl(true),
	});
	mapCenter: google.maps.LatLng | google.maps.LatLngLiteral = {
		lat: 46.76919502052316,
		lng: 23.609169904203604,
	};
	subs: Subscription[] = [];

	constructor(
		private scooterService: ScooterService,
		private router: Router,
		private snackbarService: MatSnackBar
	) {}

	ngOnInit(): void {
		const locationHandler = (of: 'lat' | 'lng') => (val: any) => {
			const copy = Object.assign({}, this.mapCenter);
			copy[of] = parseFloat(val);
			this.mapCenter = copy;
		};
		this.updateDummyRelatedControls(true);
		locationHandler('lat');
		locationHandler('lng');
		this.subs.push(
			this.form.controls.isDummy.valueChanges.subscribe((val: any) =>
				this.updateDummyRelatedControls(val)
			),
			this.form.controls.locationLat.valueChanges.subscribe(
				locationHandler('lat')
			),
			this.form.controls.locationLon.valueChanges.subscribe(
				locationHandler('lng')
			)
		);
	}

	ngOnDestroy() {
		this.subs.forEach((sub) => sub.unsubscribe());
	}

	private updateDummyRelatedControls(isDummy: boolean) {
		console.log("updating dummy-related. dummy is", isDummy);
		if (isDummy) {
			this.form.controls.lockId.disable();
			this.form.controls.locationLat.enable();
			this.form.controls.locationLon.enable();
			this.form.controls.batteryLevel.enable();
			this.form.controls.isCharging.enable();
			this.form.controls.isUnlocked.enable();
			((lockId) => {
				lockId.clearValidators();
				lockId.reset();
			})(this.form.controls.lockId);
		} else {
			this.form.controls.lockId.enable();
			this.form.controls.locationLat.disable();
			this.form.controls.locationLon.disable();
			this.form.controls.batteryLevel.disable();
			this.form.controls.isCharging.disable();
			this.form.controls.isUnlocked.disable();
			this.form.controls.locationLat.setValue(46.77214763432526);
			this.form.controls.locationLon.setValue(23.583465761177074);
			((lockId) => {
				lockId.setValidators(this.lockIdValidators);
				lockId.updateValueAndValidity();
			})(this.form.controls.lockId);
		}
	}

	handleSubmit(event: any) {
		event.preventDefault();
		const controls = this.form.controls;
		const data = {
			code: controls.code.value,
			isDummy: controls.isDummy.value,
			lockId: controls.lockId.value ?? undefined,
			location: [
				parseFloat(controls.locationLat.value),
				parseFloat(controls.locationLon.value)
			] as [number, number],
			batteryLevel: parseInt(controls.batteryLevel.value),
			isCharging: controls.isCharging.value,
			isUnlocked: controls.isUnlocked.value
		};
		this.scooterService.addNewScooter(data)
		.then((scooter) => {
			this.router.navigate([`/scooters/${scooter._id}`]);
			this.snackbarService.open("Scooter added");
		})
		.catch(() => {
			this.snackbarService.open("Couldn't add");
		});
	}

	handleMapClick(event: google.maps.MapMouseEvent | google.maps.IconMouseEvent) {
		this.form.controls.locationLat.setValue(event.latLng.lat());
		this.form.controls.locationLon.setValue(event.latLng.lng());
	}
}
