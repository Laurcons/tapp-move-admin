import { FirstCasePipe } from './pipes/first-case.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DurationPipe } from './pipes/duration.pipe';
import { RonPipe } from './pipes/ron.pipe';

@NgModule({
	exports: [FirstCasePipe, DurationPipe, RonPipe],
	declarations: [FirstCasePipe, DurationPipe, RonPipe],
	imports: [CommonModule]
})
export class SharedModule {}
