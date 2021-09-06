import { User } from './../model/user-model';
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
}
