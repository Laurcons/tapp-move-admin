import { FirstCasePipe } from './pipes/first-case.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DurationPipe } from './pipes/duration.pipe';
import { RonPipe } from './pipes/ron.pipe';
import { RidesTableComponent } from './components/rides-table/rides-table.component';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TimeagoModule } from 'ngx-timeago';

@NgModule({
	exports: [FirstCasePipe, DurationPipe, RonPipe, RidesTableComponent],
	declarations: [FirstCasePipe, DurationPipe, RonPipe, RidesTableComponent],
	imports: [CommonModule, MatTableModule, MatPaginatorModule, TimeagoModule],
})
export class SharedModule {}
