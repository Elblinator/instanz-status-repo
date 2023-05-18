import { Injectable } from '@angular/core';
import { INFO, WARNING } from './00_data/warn-text';

@Injectable({
	providedIn: 'root'
})
export class WarnService {
	private service = "";
	private warn = "";
	private hint = "";
	private group = "";
	private groupMembers: string[] = [];


	/* gets called with a service, 
	*  this.service is being updated
	*  the corresponding warning (this.warn) is updated too
	*/
	public setServiceAndMsg(service: string): void {
		this.service = service;
		const hi = WARNING.find(element => element.service === service);
		if (hi) {
			this.hint = hi.hint;
			this.warn = hi.warn;
		} else {
			console.log("ups I do not know this this service: ", service)
		}
	}
	/* 
	  return the service and warning which were set earlier
	*/
	public getServiceAndMsg(): string[] {
		return ([this.service, this.warn, this.hint]);
	}

	public setInfo(group: string): void {
		this.group = group;
		const hi = INFO.find(element => element.group === group)
		if (hi) {
			this.groupMembers = hi.members;
		}
	}
	public getInfo(): [string, string[]] {
		return [this.group, this.groupMembers]
	}
}

