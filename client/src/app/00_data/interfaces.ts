
export interface User {
	id: number,
	user: string;
	password: string;
}
export interface SimpleInstance {
	status: string;
	instances_part: number;
}
export interface RealInstance {
	name: string;
	status: string;
	services: Status[];
}
export interface Status {
	name: string;
	status: string;
}
export interface InstanceServiceArr {
	fast: InstanceService[];
	slow: InstanceService[];
	error: InstanceService[];
	offline: InstanceService[];
}
export interface InstanceService {
	instance: string;
	service: string;
	status: string;
}
export interface ServiceService {
	instance: string;
	service: string;
}
export interface DialogData {
	instances: string[];
	services: string[];
}
export interface Warning {
	service: string;
	warn: string;
	hint: string;
}
export interface Info {
	group: string;
	members: string[];
}
export interface Timer {
	key: string;
	time: Counter;
	running: boolean;
}
export interface Counter {
	min: number;
	sec: number;
}
export function isStatus(name: Status[]): name is Status[] {
	return (name as Status[]) !== undefined;
}
