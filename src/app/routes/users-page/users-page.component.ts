import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user-model';
import { Component, OnInit } from '@angular/core';

type UserWithCurrentRides = User & {currentRides: number};

@Component({
	selector: 'app-users-page',
	templateUrl: './users-page.component.html',
	styleUrls: ['./users-page.component.scss'],
})
export class UsersPageComponent implements OnInit {
	isLoading = false;
	tableData: UserWithCurrentRides[] = [];
	tableColumns = ["email", "username", "registeredAt"];

	constructor(private userService: UserService) {}

	ngOnInit(): void {
		this.loadData();
	}

	async loadData() {
		this.isLoading = true;
		this.tableData = await this.userService.getAll();
		this.tableData.sort((a, b) => b.registeredAt.localeCompare(a.registeredAt));
		this.isLoading = false;
	}
}
