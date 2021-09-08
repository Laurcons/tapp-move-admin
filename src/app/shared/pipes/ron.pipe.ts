import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'ron',
})
export class RonPipe implements PipeTransform {
	transform(value: number): string {
		const str = value.toString();
		let integer = str.slice(0, -2);
		if (integer === "")
			integer = "0";
		let decimal = str.slice(-2);
		if (decimal.length === 1)
			decimal = "0" + decimal;
		return `${integer}.${decimal} RON`;
	}
}
