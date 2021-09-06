import { User } from './../../../model/user-model';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'app-license-dialog',
	templateUrl: './license-dialog.component.html',
	styleUrls: ['./license-dialog.component.scss'],
})
export class LicenseDialogComponent implements OnInit {
	public user: User;

	constructor(
		public dialogRef: MatDialogRef<LicenseDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: { user: User }
	) {
		this.user = data.user;
	}

	ngOnInit(): void {}
}
