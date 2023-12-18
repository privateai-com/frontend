import { call, put, select } from 'redux-saga/effects';

import { sagaExceptionHandler } from 'utils';
import { Article, RequestStatus } from 'types';
import { ApiEndpoint } from 'appConstants';
import { callApi, getApiQueries } from 'api';  
import {
  articleSetFetchingStatus,
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

    const storeName = payload.doneStatus ? 'myArticles' : 'uploadArticles';
    
    const articles: Article[] = payload.offset !== 0 ? yield select(
      articlesSelectors.getProp(storeName),
    ) : [];
    
    yield put(articlesSetState({ 
      [storeName]: [...articles, ...data[0].map((item) => ({
        ...item,
        fileSize: (item.fileSize ?? 0) * 1_048_576,
      }))],
      total: data[1], 
      pagination: payload,
    }));

    yield put(articlesSetStatus({ type, status: RequestStatus.SUCCESS }));
    yield put(articleSetFetchingStatus({ status: false }));
  } catch (e) {
    sagaExceptionHandler(e);
    
    yield put(articlesSetStatus({ type, status: RequestStatus.ERROR }));
    yield put(articleSetFetchingStatus({ status: false }));
  }
}
