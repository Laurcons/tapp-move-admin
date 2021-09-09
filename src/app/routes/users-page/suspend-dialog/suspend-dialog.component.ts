import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../../shared/model/user-model';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatRadioGroup } from '@angular/material/radio';
import { MatInput } from '@angular/material/input';

@Component({
	selector: 'app-suspend-dialog',
	templateUrl: './suspend-dialog.component.html',
	styleUrls: ['./suspend-dialog.component.scss'],
})
export class SuspendDialogComponent implements OnInit {
	user: User;
	predefinedReasons = [
		"Driver's license is invalid",
		'Username is obscene',
		'Scooter abuse',
		'Unpaid rides',
	];
	option!: string;
	customOption!: string;

	constructor(
		public dialogRef: MatDialogRef<SuspendDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: { user: User },
		private userService: UserService,
		private snackbarService: MatSnackBar
	) {
		this.user = data.user;
	}

	ngOnInit(): void {}

	handleSubmit() {
		const radioValue = this.option;
		const reason = (() => {
			if (radioValue === 'other') return this.customOption;
			return this.predefinedReasons[parseInt(radioValue)];
		})();
		this.userService
			.suspend(this.user._id, reason)
			.then((newUser) => {
				this.snackbarService.open('User has been suspended');
				this.dialogRef.close({ success: true, newUser });
			})
			.catch(() => {
				this.snackbarService.open("Couldn't suspend user");
			});
	}
}
