import { ArticlesActionTypes } from 'store/articles/actionTypes';
import { GraphResponseType, PartialRecord, RequestStatus } from 'types';

export interface ArticlesState {
  articles: Article[];
  article?: Article,
  total: number;
  pagination?: {
    limit: number,
    offset: number,
    sortingDirection: 'ASC' | 'DESC',
    sortingField: string,
  };
  ui: PartialRecord<ArticlesActionTypes, RequestStatus>;
}

export type Article = {
  id: number;
  owner: {};
  title: string;
  articleUrl: string;
  graph: GraphResponseType[];
  graphDraft: GraphResponseType[];
  isGraphUpdated: boolean;
  buyers: string[];
  additionalData: {};
  isPublic: boolean;
  downloads: number;
  uploadStatus: string;
};
