import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'initialism',
})
export class InitialismPipe implements PipeTransform {
	transform(value: string, ...args: never[]): string {
		return value
			.split(/[-_ ]/)
			.filter(part => part.length !== 0)
			.map(part => part[0].toUpperCase())
			.join('');
	}
}
