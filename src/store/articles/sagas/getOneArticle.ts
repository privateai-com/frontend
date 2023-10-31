import { call, put } from 'redux-saga/effects';

import { sagaExceptionHandler } from 'utils';
import { Article, RequestStatus } from 'types';
import { ApiEndpoint } from 'appConstants';
import { callApi } from 'api';  
import {
  articlesGetOneArticle,
  articlesSetState,
  articlesSetStatus,
} from '../actionCreators';

export function* articlesGetOneArticleSaga({
  type,
  payload,
}: ReturnType<typeof articlesGetOneArticle>) {
  try {
    yield put(articlesSetStatus({ type, status: RequestStatus.REQUEST }));

    const { data }: { data: Article } = yield call(callApi, {
      method: 'GET',
      endpoint: `${ApiEndpoint.ArticlesGetOneArticle}?articleId=${payload.articleId}`,
    });
    
    yield put(articlesSetState({ article: data }));

    yield put(articlesSetStatus({ type, status: RequestStatus.SUCCESS }));
  } catch (e) {
    sagaExceptionHandler(e);
    yield put(articlesSetStatus({ type, status: RequestStatus.ERROR }));
  }
}
