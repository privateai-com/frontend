import { Article, UploadFileStatus } from 'types';

export const defaultArticle: Article = {
  id: 0,
  createdAt: '',
  updatedAt: '',
  owner: {
    id: 0,
    username: '',
    fullName: '',
  },
  title: '',
  field: '',
  articleUrl: '',
  graph: [],
  graphDraft: [],
  isGraphUpdated: false,
  buyers: [],
  additionalData: {},
  isPublic: false,
  downloads: 0,
  uploadStatus: UploadFileStatus.CREATED,
  uploadProgress: 0,
  requests: [],
};
