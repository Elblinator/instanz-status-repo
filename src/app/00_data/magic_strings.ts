
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
export enum SERVICE {
	AUTH = 'auth',
	AUTOUPDATE = 'autoupdate',
	BACKENDACTION = 'backendAction',
	BACKENDMANAGE = 'backendManage',
	BACKENDPRESENTER = 'backendPresenter',
	CLIENT = 'client',
	DATASTOREREADER = 'datastoreReader',
	DATASTOREWRITER = 'datastoreWriter',
	ICC = 'icc',
	MANAGE = 'manage',
	MEDIA = 'media',
	PROXY = 'proxy',
	REDIS = 'redis',
	VOTE = 'vote'
}
export enum GREEN {
	RUNNING = 'running',
	NORMAL = 'normal',
	FAST = 'fast'
}
export enum YELLOW {
	NEW = 'new',
	PENDING = 'pending',
	ASSIGNED = 'assigned',
	ACCEPTED = 'accepted',
	READY = 'ready',
	PREPARING = 'preparing',
	SLOW = 'slow',
	STARTING = 'starting',
	UNKNOWN = 'unknown'
}
export enum RED {
	RUNNING = 'complete',
	ERROR = 'error',
	FAILED = 'failed',
	SHUTDOWN = 'shutdown',
	REJECTED = 'rejected',
	ORPHANED = 'orphaned',
	REMOVE = 'remove'
}
export enum BLACK {
	STOPPED = 'stopped',
	OFFLINE = 'offline'
}
