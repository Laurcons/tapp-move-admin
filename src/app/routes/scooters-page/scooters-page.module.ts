import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScootersPageRoutingModule } from './scooters-page-routing.module';
import { ScootersPageComponent } from './scooters-page.component';
import { DetailsPageComponent } from './details-page/details-page.component';

import { GoogleMapsModule } from '@angular/google-maps';

import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DisableDialogComponent } from './disable-dialog/disable-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { NewScooterPageComponent } from './new-scooter-page/new-scooter-page.component';

@NgModule({
	declarations: [
		ScootersPageComponent,
		DetailsPageComponent,
		DisableDialogComponent,
		NewScooterPageComponent,
	],
	imports: [
		CommonModule,
		SharedModule,
		ScootersPageRoutingModule,
		MatTableModule,
		GoogleMapsModule,
		MatCardModule,
		MatInputModule,
		MatFormFieldModule,
		MatButtonModule,
		MatDialogModule,
		MatIconModule,
		ReactiveFormsModule,
		MatCheckboxModule,
		MatTooltipModule,
		MatMenuModule,
	],
})
export class ScootersPageModule {}
