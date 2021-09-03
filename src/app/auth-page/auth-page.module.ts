import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthPageRoutingModule } from './auth-page-routing.module';
import { AuthPageComponent } from './auth-page.component';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
	declarations: [AuthPageComponent],
	imports: [
		CommonModule,
		AuthPageRoutingModule,
		MatCardModule,
		MatInputModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatProgressBarModule,
		MatSnackBarModule,
		MatProgressSpinnerModule,
	],
})
export class AuthPageModule {}
