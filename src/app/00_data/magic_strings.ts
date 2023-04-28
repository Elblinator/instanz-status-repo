
export enum OFFLINE_LIST {
	ONLINE = 'online',
	OFFLINE = 'offline'
}
export enum ONLINE_LIST {
	FAST = 'fast',
	SLOW = 'slow',
	ERROR = 'error'
}
export enum STATUS_LIST {
	ERROR = 'error',
	OFFLINE = 'offline',
	SLOW = 'slow',
	FAST = 'fast'
}
export enum GREEN {
	RUNNING = 'running',
	NORMAL = 'normal'
}
export enum YELLOW {
	NEW = 'new',
	PENDING = 'pending',
	ASSIGNED = 'assigned',
	ACCEPTED = 'accepted',
	READY = 'ready',
	PREPARING = 'preparing',
	STARTING = 'starting',
	UNKNOWN = 'unknown'
}
export enum RED {
	RUNNING = 'complete',
	FAILED = 'failed',
	SHUTDOWN = 'shutdown',
	REJECTED = 'rejected',
	ORPHANED = 'orphaned',
	REMOVE = 'remove'	
}
export enum BLACK {
	STOPPED = 'stopped'
}