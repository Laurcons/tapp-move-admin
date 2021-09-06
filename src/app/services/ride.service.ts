import { Ride } from './../model/ride-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export type RideWithInfo = Ride & {
	duration: number;
	linearDistance: number;
	pathDistance: number;
};

@Injectable({
	providedIn: 'root',
})
export class RideService {
	constructor(
		private http: HttpClient
	) {}

	async getRidesForUser(userId: string) {
		return this.http
			.get<{ rides: RideWithInfo[] }>(`/users/${userId}/rides`)
			.toPromise()
			.then(r => r.rides);
	}
}
