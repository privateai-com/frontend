import { call, put, select } from 'redux-saga/effects';

import { sagaExceptionHandler } from 'utils';
import { Pagination, RequestStatus } from 'types';
import { ApiEndpoint } from 'appConstants';
import { callApi } from 'api';
import { articlesDelete, articlesSetStatus, articlesGetMy } from 'store/articles/actionCreators';
import { articlesSelectors } from 'store/articles/selectors';

export function* articlesDeleteArticleSaga({
  type,
  payload,
}: ReturnType<typeof articlesDelete>) {
  try {
    yield put(articlesSetStatus({ type, status: RequestStatus.REQUEST }));

    yield call(callApi, {
      method: 'DELETE',
      endpoint: ApiEndpoint.ArticlesDeleteArticle,
      payload,
    });

    const pagination: Pagination = yield select(articlesSelectors.getProp('pagination'));
    if (pagination) {
      yield put(articlesGetMy({
        ...pagination,
        limit: +pagination.offset + +pagination.limit,
        offset: 0,
      }));
    }

    if (payload.callback) payload.callback();

    yield put(articlesSetStatus({ type, status: RequestStatus.SUCCESS }));
  } catch (e) {
    sagaExceptionHandler(e);
    yield put(articlesSetStatus({ type, status: RequestStatus.ERROR }));
  }
}
