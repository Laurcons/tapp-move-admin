import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ScooterService } from 'src/app/services/scooter.service';
import { Scooter } from 'src/app/shared/model/scooter-model';
import { BreadcrumbService } from 'xng-breadcrumb';
import { DisableDialogComponent } from '../disable-dialog/disable-dialog.component';

@Component({
	selector: 'app-details-page',
	templateUrl: './details-page.component.html',
	styleUrls: ['./details-page.component.scss'],
})
export class DetailsPageComponent implements OnInit, OnDestroy {
	scooter: Scooter | null = null;
	isDestroyed = false;

	constructor(
		private breadcrumbService: BreadcrumbService,
		private scooterService: ScooterService,
		private route: ActivatedRoute,
		private dialogService: MatDialog
	) {}

	ngOnInit(): void {
		this.loadData();
	}

	ngOnDestroy() {
		this.isDestroyed = true;
	}

	async loadData() {
		if (this.isDestroyed)
			return;
		const id = this.route.snapshot.paramMap.get("id") as string;
		this.scooter = await this.scooterService.getOne(id);
		this.breadcrumbService.set("/scooters/:id", `Details for #${this.scooter.code}`);
		setTimeout(() => this.loadData(), 10 * 1000);
	}

	handleToggleDisabled() {
		this.dialogService.open(DisableDialogComponent).afterClosed().subscribe(async res => {
			if (res === true && this.scooter) {
				this.scooter = await this.scooterService.toggleDisabled(this.scooter._id);
			}
		});
	}
}
