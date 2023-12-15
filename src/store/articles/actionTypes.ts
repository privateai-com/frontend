export enum ArticlesActionTypes {
  SetState = 'ARTICLES.SET_STATE',
  SetStatus = 'ARTICLES.SET_STATUS',
  SetStatusUpload = 'ARTICLES.SET_STATUS_UPLOAD',

  GetOneArticle = 'ARTICLES.GET_ONE_ARTICLE',
  GetArticles = 'ARTICLES.GET_ARTICLES',
  GetMyArticles = 'ARTICLES.GET_MY_ARTICLES',
  SearchArticles = 'ARTICLES.SEARCH_ARTICLES',

  GetMyRequestedArticles = 'ARTICLES.GET_MY_REQUESTED_ARTICLES',

  CreateArticle = 'ARTICLES.CREATE_ARTICLE',
  CancelUpload = 'ARTICLES.CANCEL_UPLOAD_ARTICLE',
  CancelUploadFetch = 'ARTICLES.CANCEL_UPLOAD_FETCH_ARTICLE',
  ChangeArticleAccess = 'ARTICLES.CHANGE_ARTICLE_ACCESS',
  DeleteArticle = 'ARTICLES.DELETE_ARTICLE',
  UpdateArticle = 'ARTICLES.UPDATE_ARTICLE',

  PublishArticle = 'ARTICLES.PUBLISH_ARTICLE',
  
  SaveGraph = 'ARTICLES.SAVE_GRAPH',

  GetArticleUploadStatus = 'ARTICLES.GET_ARTICLE_UPLOAD_STATUS',
}
