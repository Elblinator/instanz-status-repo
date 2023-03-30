
export interface User {
	id: number,
	user: string;
	password: string;
}
export interface Instance {
	id: number;
	name: string;
	running: boolean;
	services: Status[];
}
export interface Status {
	name: string;
	status: string;
}
export interface InstanceServiceArr {
	online: InstanceService[];
	slow: InstanceService[];
	error: InstanceService[];
	offline: InstanceService[];
}
export interface InstanceService {
	instance: string;
	service: string;
	status: string;
}
export interface DialogData {
	instances: string[];
	services: string[];
}
export interface Warning {
	service: string;
	warn: string;
}
export function isStatus(name: Status[] | Instance[]): name is Status[] {
	return (name as Status[]) !== undefined;
}
