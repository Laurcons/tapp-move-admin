import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Scooter } from '../shared/model/scooter-model';

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

@Injectable({
	providedIn: 'root',
})
export class ScooterService {
	constructor(private http: HttpClient) {}

	async getAll() {
		return this.http
			.get<{ scooters: Scooter[] }>('/scooters/')
			.toPromise()
			.then((res) => res.scooters);
	}

	async getOne(id: string) {
		return this.http
			.get<{ scooter: Scooter }>(`/scooters/${id}`)
			.toPromise()
			.then((res) => res.scooter);
	}

	async toggleDisabled(id: string) {
		return this.http
			.post<{ scooter: Scooter }>(`/scooters/${id}/toggleDisabled`, {})
			.toPromise()
			.then((res) => res.scooter);
	}

	async addNewScooter(
		data: PartialBy<
			// don't ask. please
			Pick<
				Scooter,
				| 'code'
				| 'lockId'
				| 'batteryLevel'
				| 'isCharging'
				| 'isDummy'
				| 'isUnlocked'
				| 'location'
			>,
			'lockId'
		>
	) {
		return this.http
			.post<{ scooter: Scooter }>(`/scooters/`, {...data})
			.toPromise()
			.then(res => res.scooter);
	}
}
