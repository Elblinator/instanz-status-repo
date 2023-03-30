import { Instanz } from './instanzen';

export const INSTANZ: Instanz[] = [
	{
		"id": 1,
		"name": "Testintern",
		"running": true,
		"services": [{
			"name": "client",
			"status": "online"
		}, {
			"name": "backend-action",
			"status": "online"
		}, {
			"name": "backend-presenter",
			"status": "slow"
		}, {
			"name": "autoupdate",
			"status": "slow"
		}, {
			"name": "vote",
			"status": "online"
		}, {
			"name": "auth",
			"status": "online"
		}, {
			"name": "datastore-reader",
			"status": "slow"
		}, {
			"name": "datastore-writer",
			"status": "online"
		}, {
			"name": "icc",
			"status": "slow"
		}, {
			"name": "media",
			"status": "online"
		}]
	},
	{
		"id": 2,
		"name": "Demo",
		"running": true,
		"services": [{
			"name": "client",
			"status": "online"
		}, {
			"name": "backend-action",
			"status": "online"
		}, {
			"name": "backend-presenter",
			"status": "error"
		}, {
			"name": "autoupdate",
			"status": "slow"
		}, {
			"name": "vote",
			"status": "online"
		}, {
			"name": "auth",
			"status": "online"
		}, {
			"name": "datastore-reader",
			"status": "error"
		}, {
			"name": "datastore-writer",
			"status": "online"
		}, {
			"name": "icc",
			"status": "slow"
		}, {
			"name": "media",
			"status": "online"
		}]
	},
	{
		"id": 1,
		"name": "Test",
		"running": true,
		"services": [{
			"name": "client",
			"status": "online"
		}, {
			"name": "backend-action",
			"status": "online"
		}, {
			"name": "backend-presenter",
			"status": "online"
		}, {
			"name": "autoupdate",
			"status": "online"
		}, {
			"name": "vote",
			"status": "online"
		}, {
			"name": "auth",
			"status": "online"
		}, {
			"name": "datastore-reader",
			"status": "online"
		}, {
			"name": "datastore-writer",
			"status": "online"
		}, {
			"name": "icc",
			"status": "online"
		}, {
			"name": "media",
			"status": "online"
		}]
	},
	{
		"id": 2,
		"name": "Demonstration",
		"running": false,
		"services": [{
			"name": "client",
			"status": "offline"
		}, {
			"name": "backend-action",
			"status": "offline"
		}, {
			"name": "backend-presenter",
			"status": "offline"
		}, {
			"name": "autoupdate",
			"status": "offline"
		}, {
			"name": "vote",
			"status": "offline"
		}, {
			"name": "auth",
			"status": "offline"
		}, {
			"name": "datastore-reader",
			"status": "offline"
		}, {
			"name": "datastore-writer",
			"status": "offline"
		}, {
			"name": "icc",
			"status": "offline"
		}, {
			"name": "media",
			"status": "offline"
		}]
	}
]
// import example-data.json
// push imported data into status format