import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from './../../../model/user-model';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
	selector: 'app-details-page',
	templateUrl: './details-page.component.html',
	styleUrls: ['./details-page.component.scss'],
})
export class DetailsPageComponent implements OnInit {
	isLoading = false;
	user: User | null = null;

	constructor(
		private userService: UserService,
		private route: ActivatedRoute,
		private snackbarService: MatSnackBar,
		private breadcrumbService: BreadcrumbService
	) {}

	ngOnInit(): void {
		// don't await
		this.loadData();
	}

	async loadData() {
		const id = this.route.snapshot.paramMap.get("id");
		if (!id) {
			this.snackbarService.open("Invalid id");
			return;
		}
		this.isLoading = true;
		this.user = await this.userService.getOne(id);
		this.breadcrumbService.set("/users/:id", `Details for ${this.user.email}`)
		this.isLoading = false;
	}
}
