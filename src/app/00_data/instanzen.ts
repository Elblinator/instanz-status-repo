import { Status } from './status';


export interface Instanz {
    id: number;
    name: string;
    running: boolean;
    services: Status[]
  }
  