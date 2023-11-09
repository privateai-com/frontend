import { ArticlesActionTypes } from 'store/articles/actionTypes';
import {
  AccountInfo,
  GraphResponseType,
  PartialRecord,
  RequestStatus,
  Pagination,
} from 'types';

export interface ArticlesState {
  articles: Article[];
  article?: Article,
  total: number;
  pagination?: Pagination;
  ui: PartialRecord<ArticlesActionTypes, RequestStatus>;
  upload: Record<string, { 
    id: string,
    status: RequestStatus, 
    fileName: string, 
    size: number,
    percentUpload: number,
    idArticle?: string,
  }>;
}

export type ArticleOwner = {
  id: number;
  username: null | string;
  fullName: null | string;
};

export type ArticleAccess = {
  id: number;
  article: Article;
  requester?: AccountInfo;
  approve: boolean;
  isOwnerViewed?: boolean;
  isRequesterViewed?: boolean;
};

export type Article = {
  id: number;
  createdAt: string;
  updatedAt: string;
  owner: ArticleOwner;
  title: string;
  field: string;
  articleUrl: string;
  graph: GraphResponseType[];
  graphDraft: GraphResponseType[];
  isGraphUpdated: boolean;
  buyers: string[];
  additionalData: {};
  isPublic: boolean;
  downloads: number;
  uploadStatus: string;
  uploadProgress: number;
  requests: ArticleAccess[];
  status?: string;
  core: string;
};
