
export interface User {
	_id: string;
	email: string;
	username: string;
	password: string;
	lastLoginAt: string;
	registeredAt: string;
	totalRides: number;
	forgotPasswordToken?: string;
	driversLicenseKey?: string;
	driversLicense?: string;
	suspendedReason?: string;
}
