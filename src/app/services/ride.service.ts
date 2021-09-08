import { Ride } from '../shared/model/ride-model';
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

	async getRidesForUser(userId: string, start?: number, count?: number) {
		let query = [];
		if (start)
			query.push(`start=${start}`);
		if (count)
			query.push(`count=${count}`);
		const queryStr = "?" + query.join("&");
		return this.http
			.get<{ rides: RideWithInfo[], start: number; count: number; total: number; }>(`/users/${userId}/rides${queryStr}`)
			.toPromise();
	}
}
