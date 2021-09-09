import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScootersPageRoutingModule } from './scooters-page-routing.module';
import { ScootersPageComponent } from './scooters-page.component';

import { MatTableModule } from '@angular/material/table';

import { GoogleMapsModule } from '@angular/google-maps';
import { DetailsPageComponent } from './details-page/details-page.component';


@NgModule({
	declarations: [ScootersPageComponent, DetailsPageComponent],
	imports: [
		CommonModule,
		ScootersPageRoutingModule,
		MatTableModule,
		GoogleMapsModule,
	],
})
export class ScootersPageModule {}
