import { takeEvery, takeLatest, takeLeading } from 'redux-saga/effects';
import { ArticlesActionTypes } from '../actionTypes';
import { articlesGetAllSaga } from './getAllArticles';
import { articlesGetMySaga } from './getMyArticles';
import { articlesDeleteArticleSaga } from './deleteArticle';
import { articlesChangeArticleAccessSaga } from './changeArticleAccess';
import { articlesCreateSaga } from './createArticle';
import { articlesGetOneArticleSaga } from './getOneArticle';
import { articlesPublishSaga } from './publish';
import { articlesUpdateSaga } from './update';
import { articlesSaveGraphSaga } from './saveGraph';
import { articlesSocketUploadStatusSaga } from './uploadStatusArticle';
import { articlesSearchSaga } from './search';
import { articlesCancelUploadSaga } from './cancelUpload';

export default function* articlesSaga() {
  yield takeEvery(ArticlesActionTypes.CreateArticle, articlesCreateSaga);
  yield takeLatest(ArticlesActionTypes.GetArticles, articlesGetAllSaga);
  yield takeLatest(ArticlesActionTypes.GetMyArticles, articlesGetMySaga);
  yield takeLeading(ArticlesActionTypes.GetOneArticle, articlesGetOneArticleSaga);
  yield takeLatest(
    ArticlesActionTypes.DeleteArticle,
    articlesDeleteArticleSaga,
  );
  yield takeLatest(
    ArticlesActionTypes.ChangeArticleAccess,
    articlesChangeArticleAccessSaga,
  );
  yield takeLatest(ArticlesActionTypes.PublishArticle, articlesPublishSaga);
  yield takeLatest(ArticlesActionTypes.UpdateArticle, articlesUpdateSaga);
  yield takeLatest(ArticlesActionTypes.SaveGraph, articlesSaveGraphSaga);
  yield takeEvery(ArticlesActionTypes.GetArticleUploadStatus, articlesSocketUploadStatusSaga);
  yield takeEvery(ArticlesActionTypes.SearchArticles, articlesSearchSaga);
  yield takeEvery(ArticlesActionTypes.CancelUpload, articlesCancelUploadSaga);
}
