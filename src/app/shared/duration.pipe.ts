import { Pipe, PipeTransform } from '@angular/core';
import * as humanizeDuration from 'humanize-duration';
import { DateTime } from 'luxon';

@Pipe({
	name: 'duration',
})
export class DurationPipe implements PipeTransform {
	transform(ms: number): string {
		return humanizeDuration(ms);
	}
}
