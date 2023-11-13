export interface RequestsType {
  id: number;
  articleId: number;
  ownerId: number;
  requesterId: number;
  title: string;
  date: string;
  requester: string;
  isOwnerViewed: boolean;
  approve: boolean;
}
