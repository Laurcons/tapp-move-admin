import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersPageRoutingModule } from './users-page-routing.module';
import { UsersPageComponent } from './users-page.component';

import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';
import { MatBadgeModule } from '@angular/material/badge';

import { TimeagoModule } from 'ngx-timeago';
import { BreadcrumbModule } from 'xng-breadcrumb';

import { SuspendDialogComponent } from './suspend-dialog/suspend-dialog.component';
import { DetailsPageComponent } from './details-page/details-page.component';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		UsersPageComponent,
		SuspendDialogComponent,
		DetailsPageComponent,
	],
	imports: [
		CommonModule,
		SharedModule,
		FormsModule,
		UsersPageRoutingModule,
		MatTableModule,
		MatProgressBarModule,
		MatButtonModule,
		MatDialogModule,
		TimeagoModule.forChild(),
		BreadcrumbModule,
		MatCardModule,
		MatGridListModule,
		MatPaginatorModule,
		MatInputModule,
		MatFormFieldModule,
		MatTooltipModule,
		MatRadioModule,
		MatBadgeModule,
		MatIconModule
	],
})
export class UsersPageModule {}
