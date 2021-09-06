import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersPageRoutingModule } from './users-page-routing.module';
import { UsersPageComponent } from './users-page.component';

import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';

import { TimeagoModule } from 'ngx-timeago';
import { BreadcrumbModule } from 'xng-breadcrumb';

import { LicenseDialogComponent } from './license-dialog/license-dialog.component';
import { DetailsPageComponent } from './details-page/details-page.component';

@NgModule({
	declarations: [
		UsersPageComponent,
		LicenseDialogComponent,
		DetailsPageComponent,
	],
	imports: [
		CommonModule,
		UsersPageRoutingModule,
		MatTableModule,
		MatProgressBarModule,
		MatButtonModule,
		MatDialogModule,
		TimeagoModule.forChild(),
		BreadcrumbModule,
		MatCardModule,
	],
})
export class UsersPageModule {}
