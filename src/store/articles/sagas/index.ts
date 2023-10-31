import { takeLatest } from 'redux-saga/effects';
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

export default function* articlesSaga() {
  yield takeLatest(ArticlesActionTypes.CreateArticle, articlesCreateSaga);
  yield takeLatest(ArticlesActionTypes.GetArticles, articlesGetAllSaga);
  yield takeLatest(ArticlesActionTypes.GetMyArticles, articlesGetMySaga);
  yield takeLatest(ArticlesActionTypes.GetOneArticle, articlesGetOneArticleSaga);
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
}
