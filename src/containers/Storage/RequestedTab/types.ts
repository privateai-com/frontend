import { Status } from 'types';

export interface RequestedDataType {
  id: string;
  name: string;
  core: string;
  owner: string;
  status: Status;
}
