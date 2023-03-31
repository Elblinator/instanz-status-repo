import { Instance } from './interfaces';

export const INSTANCE: Instance[] = [
	{
		"id": 1,
		"name": "Testintern",
		"running": true,
		"services": [{
			"name": "client",
			"status": "fast"
		}, {
			"name": "backend-action",
			"status": "fast"
		}, {
			"name": "backend-presenter",
			"status": "slow"
		}, {
			"name": "autoupdate",
			"status": "slow"
		}, {
			"name": "vote",
			"status": "fast"
		}, {
			"name": "auth",
			"status": "fast"
		}, {
			"name": "datastore-reader",
			"status": "slow"
		}, {
			"name": "datastore-writer",
			"status": "fast"
		}, {
			"name": "icc",
			"status": "slow"
		}, {
			"name": "media",
			"status": "fast"
		}]
	},
	{
		"id": 2,
		"name": "Demo",
		"running": true,
		"services": [{
			"name": "client",
			"status": "fast"
		}, {
			"name": "backend-action",
			"status": "fast"
		}, {
			"name": "backend-presenter",
			"status": "error"
		}, {
			"name": "autoupdate",
			"status": "slow"
		}, {
			"name": "vote",
			"status": "fast"
		}, {
			"name": "auth",
			"status": "fast"
		}, {
			"name": "datastore-reader",
			"status": "error"
		}, {
			"name": "datastore-writer",
			"status": "fast"
		}, {
			"name": "icc",
			"status": "slow"
		}, {
			"name": "media",
			"status": "fast"
		}]
	},
	{
		"id": 1,
		"name": "Test",
		"running": true,
		"services": [{
			"name": "client",
			"status": "fast"
		}, {
			"name": "backend-action",
			"status": "fast"
		}, {
			"name": "backend-presenter",
			"status": "fast"
		}, {
			"name": "autoupdate",
			"status": "fast"
		}, {
			"name": "vote",
			"status": "fast"
		}, {
			"name": "auth",
			"status": "fast"
		}, {
			"name": "datastore-reader",
			"status": "fast"
		}, {
			"name": "datastore-writer",
			"status": "fast"
		}, {
			"name": "icc",
			"status": "fast"
		}, {
			"name": "media",
			"status": "fast"
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