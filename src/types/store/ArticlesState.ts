import { ArticlesActionTypes } from 'store/articles/actionTypes';
import { PartialRecord, RequestStatus } from 'types';

export interface ArticlesState {
  articles: Article[]
  ui: PartialRecord<ArticlesActionTypes, RequestStatus>;
}

export type Article = {
  id: number;
  owner: {};
  title: string;
  articleUrl: string;
  graph: {};
  isGraphUpdated: boolean;
  buyers: string[];
  additionalData: {};
  isPublic: boolean;
  downloads: number;
  uploadStatus: {};
};
