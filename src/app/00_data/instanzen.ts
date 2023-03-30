
export interface Instanz {
	id: number;
	name: string;
	running: boolean;
	services: Status[];
}
export interface Status {
	name: string;
	status: string;
}
export interface InstanzServiceArr {
	online: InstanzService[];
	slow: InstanzService[];
	error: InstanzService[];
	offline: InstanzService[];
}
export interface InstanzService {
	instanz: string;
	service: string;
	status: string;
}
export interface DialogData {
	instances: string[];
	services: string[];
}
export interface Warnung {
	service: string;
	warn: string;
}
export function isStatus(name: Status[] | Instanz[]): name is Status[] {
	return (name as Status[]) !== undefined
}
