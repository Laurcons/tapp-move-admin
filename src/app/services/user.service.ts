import { User } from '../shared/model/user-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	constructor(private http: HttpClient) {}

	async getAll() {
		return await this.http
			.get<{
				users: (User & {
					currentRides: number;
				})[];
			}>('/users/')
			.toPromise()
			.then(res => res.users);
	}

	async getOne(id: string) {
		return await this.http
			.get<{ user: User }>(`/users/${id}`)
			.toPromise()
			.then(res => res.user);
	}

	async suspend(id: string, reason: string) {
		return await this.http
			.post<{ user: User }>(`/users/${id}/suspend`, {
				reason
			})
			.toPromise()
			.then(res => res.user);
	}
}
