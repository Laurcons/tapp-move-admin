
export interface Ride {
	_id: string;
	status: 'ongoing' | 'payment-pending' | 'payment-initiated' | 'completed';
	route: [[number, number]];
	startLocation: [number, number];
	endLocation: [number, number];
	startedAt: string;
	endedAt?: string;
	scooterId: string;
	userId: string;
}
