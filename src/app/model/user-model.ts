
export interface User {
	email: string;
	username: string;
	password: string;
	lastLoginAt: string;
	registeredAt: string;
	totalRides: number;
	forgotPasswordToken?: string;
	driversLicenseKey?: string;
}
