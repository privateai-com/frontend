import { Status } from 'types';

export interface RequestedDataType {
  id: number;
  articleId: number;
  title: string;
  date: string;
  requester: string;
  isOwnerViewed: boolean;
  approve: boolean;
  status: Status;
  core: string;
  owner: string;
}
