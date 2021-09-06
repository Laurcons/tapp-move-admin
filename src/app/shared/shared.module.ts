import { FirstCasePipe } from './first-case.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DurationPipe } from './duration.pipe';
import { RonPipe } from './ron.pipe';

@NgModule({
	exports: [FirstCasePipe, DurationPipe, RonPipe],
	declarations: [FirstCasePipe, DurationPipe, RonPipe],
	imports: [CommonModule]
})
export class SharedModule {}
