import { call, put } from 'redux-saga/effects';

import { sagaExceptionHandler } from 'utils';
import { RequestStatus } from 'types';
import { ApiEndpoint } from 'appConstants';
import { callApi } from 'api';
import {
  articlesChangeAccess,
  articlesSetStatus,
} from '../actionCreators';

export function* articlesChangeArticleAccessSaga({
  type,
  payload,
}: ReturnType<typeof articlesChangeAccess>) {
  try {
    yield put(articlesSetStatus({ type, status: RequestStatus.REQUEST }));

    yield call(callApi, {
      method: 'PUT',
      endpoint: ApiEndpoint.ArticlesChangeArticleAccess,
      payload,
    });

    yield put(articlesSetStatus({ type, status: RequestStatus.SUCCESS }));
  } catch (e) {
    sagaExceptionHandler(e);
    yield put(articlesSetStatus({ type, status: RequestStatus.ERROR }));
  }
}
