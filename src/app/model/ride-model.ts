
export interface Ride {
	status: 'ongoing' | 'payment-pending' | 'completed';
	route: [[number, number]];
	startLocation: [number, number];
	endLocation: [number, number];
	startedAt: string;
	endedAt?: string;
	scooterId: string;
	userId: string;
}
