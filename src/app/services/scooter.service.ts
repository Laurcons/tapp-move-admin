import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Scooter } from '../shared/model/scooter-model';

@Injectable({
	providedIn: 'root',
})
export class ScooterService {
	constructor(
		private http: HttpClient
	) {}

	async getAll() {
		return this.http
			.get<{ scooters: Scooter[] }>("/scooters/")
			.toPromise()
			.then(res => res.scooters);
	}
}
