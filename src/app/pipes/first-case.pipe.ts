import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'firstCase',
})
export class FirstCasePipe implements PipeTransform {
	transform(value: string): string {
		return value.charAt(0).toUpperCase() + value.slice(1);
	}
}
