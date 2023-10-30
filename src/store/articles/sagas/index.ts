import { takeLatest } from 'redux-saga/effects';
import { ArticlesActionTypes } from '../actionTypes';
import { articlesGetAllSaga } from './getAllArticles';
import { articlesGetMySaga } from './getMyArticles';
import { articlesDeleteArticleSaga } from './deleteArticle';
import { articlesChangeArticleAccessSaga } from './changeArticleAccess';
import { articlesCreateSaga } from './createArticle';

export default function* articlesSaga() {
  yield takeLatest(ArticlesActionTypes.CreateArticle, articlesCreateSaga);
  yield takeLatest(ArticlesActionTypes.GetArticles, articlesGetAllSaga);
  yield takeLatest(ArticlesActionTypes.GetMyArticles, articlesGetMySaga);
  yield takeLatest(
    ArticlesActionTypes.DeleteArticle,
    articlesDeleteArticleSaga,
  );
  yield takeLatest(
    ArticlesActionTypes.ChangeArticleAccess,
    articlesChangeArticleAccessSaga,
  );
}
