import { takeLatest } from 'redux-saga/effects';
import { ArticlesActionTypes } from '../actionTypes';
import { articlesCreateArticleSaga } from './createArticleSaga';

export default function* articlesSaga() {
  yield takeLatest(ArticlesActionTypes.CreateArticle, articlesCreateArticleSaga);
}
