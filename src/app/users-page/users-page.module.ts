import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersPageRoutingModule } from './users-page-routing.module';
import { UsersPageComponent } from './users-page.component';

import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { TimeagoModule } from 'ngx-timeago';

@NgModule({
	declarations: [UsersPageComponent],
	imports: [
		CommonModule,
		UsersPageRoutingModule,
		MatTableModule,
		MatProgressBarModule,
		TimeagoModule.forChild(),
	],
})
export class UsersPageModule {}
