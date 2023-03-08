
export interface Instanz {
    id: number;
    name: string;
    running: boolean;
    services: Status[]
  }
  export interface InstanzService {
    instanz: string;
    service: string
    status: string;
  }
  export interface InstanzServiceArr {
    online: InstanzService[];
    slow: InstanzService[]
    error:  InstanzService[];
    offline: InstanzService[]
  }
  export interface Status {
    name: string;
    status: string;
  }
  