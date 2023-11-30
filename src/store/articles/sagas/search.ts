import { call, put, select } from 'redux-saga/effects';

import { sagaExceptionHandler } from 'utils';
import { Article, ArticlesState, RequestStatus } from 'types';
import { ApiEndpoint } from 'appConstants';
import { callApi, getApiQueries } from 'api';  
import {
  articlesSearch,
  articlesSetState,
  articlesSetStatus,
} from '../actionCreators';
import { articlesSelectors } from '../selectors';

export function* articlesSearchSaga({
  type,
  payload,
}: ReturnType<typeof articlesSearch>) {
  try {
    yield put(articlesSetStatus({ type, status: RequestStatus.REQUEST }));

    const { data }: { data: [Article[], number] } = yield call(callApi, {
      method: 'GET',
      endpoint: ApiEndpoint.ArticlesSearch + getApiQueries({
        ...payload,
        sortingField: 'rank',
        sortingDirection: 'ASC',
        searchField: undefined,
      }),
    });
    
    const articles: ArticlesState['articlesAll'] = payload.offset !== 0 ? yield select(
      articlesSelectors.getProp('articlesAll'),
    ) : [];

    yield put(articlesSetState({ 
      articlesAll: [...articles, ...data[0]],
      total: data[1], 
      pagination: {
        ...payload,
        sortingField: 'id',
        sortingDirection: 'DESC',
      },
    }));

    yield put(articlesSetStatus({ type, status: RequestStatus.SUCCESS }));
  } catch (e) {
    sagaExceptionHandler(e);
    yield put(articlesSetStatus({ type, status: RequestStatus.ERROR }));
  }
}
