import { call, put, select } from 'redux-saga/effects';

import { sagaExceptionHandler } from 'utils';
import { Article, ArticlesState, RequestStatus } from 'types';
import { ApiEndpoint } from 'appConstants';
import { callApi, getApiQueries } from 'api';  
import {
  articlesGetMy,
  articlesSetState,
  articlesSetStatus,
} from '../actionCreators';
import { articlesSelectors } from '../selectors';

export function* articlesGetMySaga({
  type,
  payload,
}: ReturnType<typeof articlesGetMy>) {
  try {
    yield put(articlesSetStatus({ type, status: RequestStatus.REQUEST }));

    const { data }: { data: [Article[], number] } = yield call(callApi, {
      method: 'GET',
      endpoint: ApiEndpoint.ArticlesGetMyArticles + getApiQueries(payload),
    });
    
    const articles: ArticlesState['myArticles'] = payload.offset !== 0 ? yield select(
      articlesSelectors.getProp('myArticles'),
    ) : [];
    
    yield put(articlesSetState({ 
      myArticles: [...articles, ...data[0]],
      total: data[1], 
      pagination: payload,
    }));

    yield put(articlesSetStatus({ type, status: RequestStatus.SUCCESS }));
  } catch (e) {
    sagaExceptionHandler(e);
    yield put(articlesSetStatus({ type, status: RequestStatus.ERROR }));
  }
}
