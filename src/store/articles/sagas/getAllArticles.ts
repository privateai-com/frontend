import { call, put, select } from 'redux-saga/effects';

import { sagaExceptionHandler } from 'utils';
import { Article, ArticlesState, RequestStatus } from 'types';
import { ApiEndpoint } from 'appConstants';
import { callApi, getApiQueries } from 'api';  
import {
  articlesGetAll,
  articlesSetState,
  articlesSetStatus,
} from '../actionCreators';
import { articlesSelectors } from '../selectors';

export function* articlesGetAllSaga({
  type,
  payload,
}: ReturnType<typeof articlesGetAll>) {
  try {
    yield put(articlesSetStatus({ type, status: RequestStatus.REQUEST }));

    const { data }: { data: Article[] } = yield call(callApi, {
      method: 'GET',
      endpoint: ApiEndpoint.ArticlesGetArticles + getApiQueries(payload),
    });
    
    const articles: ArticlesState['articles'] = yield select(
      articlesSelectors.getProp('articles'),
    );
    yield put(articlesSetState({ articles: [...articles, ...data] }));

    yield put(articlesSetStatus({ type, status: RequestStatus.SUCCESS }));
  } catch (e) {
    sagaExceptionHandler(e);
    yield put(articlesSetStatus({ type, status: RequestStatus.ERROR }));
  }
}
