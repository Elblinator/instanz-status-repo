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
    "id": 2,
    "name": "Demo",
    "running":true,
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
    }]  }
  ]
// import example-data.json
// push imported data into status format