
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

@NgModule({
	declarations: [
		ScootersPageComponent,
		DetailsPageComponent,
		DisableDialogComponent,
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
	],
})
export class ScootersPageModule {}
