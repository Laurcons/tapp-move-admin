import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TimeagoModule } from 'ngx-timeago';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RidesPageRoutingModule } from './rides-page-routing.module';
import { RidesPageComponent } from './rides-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetailsPageComponent } from './details-page/details-page.component';

@NgModule({
	declarations: [RidesPageComponent, DetailsPageComponent],
	imports: [
		CommonModule,
		SharedModule,
		RidesPageRoutingModule,
		TimeagoModule,
		MatTableModule,
		MatButtonModule,
		MatIconModule,
		MatTooltipModule,
		MatCardModule,
		GoogleMapsModule,
		MatFormFieldModule,
		MatInputModule,
	],
})
export class RidesPageModule {}