import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../shared/model/user-model';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SuspendDialogComponent } from './suspend-dialog/suspend-dialog.component';

type UserInTable = User & { currentRides: number, index: number };

@Component({
	selector: 'app-users-page',
	templateUrl: './users-page.component.html',
	styleUrls: ['./users-page.component.scss'],
})
export class UsersPageComponent implements OnInit {
	isLoading = false;
	tableData: UserInTable[] = [];
	tableColumns = ["index", "email", "username", "registeredAt", "totalRides"];

	constructor(private userService: UserService, private dialogService: MatDialog) {}

	ngOnInit(): void {
		this.loadData();
	}

	async loadData() {
		this.isLoading = true;
		this.tableData = (await this.userService.getAll()) as UserInTable[];
		this.tableData.sort((a, b) => b.registeredAt.localeCompare(a.registeredAt));
		this.tableData = this.tableData.map((user, index) => ({
			...user,
			index: index + 1,
		}));
		this.isLoading = false;
	}

	onViewLicenseClick(user: User) {
		this.dialogService.open(SuspendDialogComponent, {
			data: { user }
		});
	}
}
