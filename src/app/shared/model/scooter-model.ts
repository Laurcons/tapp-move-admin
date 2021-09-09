export interface Scooter {
	_id: string;
	status: 'unavailable' | 'booked' | 'disabled' | 'available';
	code: string; // a 4-character code
	isDummy: boolean;
	lockId: string;
	location: [number, number];
	batteryLevel: number;
	isCharging: boolean;
	isUnlocked: boolean;
}
