import { call, put } from 'redux-saga/effects';

import { sagaExceptionHandler } from 'utils';
import { Article, RequestStatus } from 'types';
import { ApiEndpoint } from 'appConstants';
import { callApi, getApiQueries } from 'api';  
import {
  articlesGetBonusPoints,
  articlesSetState,
  articlesSetStatus,
} from '../actionCreators';

const payload = {
  limit: 100,
  offset: 0,
  sortingDirection: 'DESC' as const,
  sortingField: 'isPublished',
  doneStatus: true,
};

export function* articlesGetBonusPointsSaga({
  type,
}: ReturnType<typeof articlesGetBonusPoints>) {
  try {
    yield put(articlesSetStatus({ type, status: RequestStatus.REQUEST }));

    const { data }: { data: [Article[], number] } = yield call(callApi, {
      method: 'GET',
      endpoint: ApiEndpoint.ArticlesGetMyArticles + getApiQueries(payload),
    });

    if (data[0]?.length > 0) {
      let ratingPoints = 0;
      let docsCount = 0;
      data[0].forEach(({ isPublished }) => {
        if(isPublished) { 
          ratingPoints += 100; 
          docsCount += 1; 
        }
      });

      yield put(articlesSetState({
        ratingPoints,
        docsCount,
      }));
    }

    yield put(articlesSetStatus({ type, status: RequestStatus.SUCCESS }));
  } catch (e) {
    sagaExceptionHandler(e);
    yield put(articlesSetStatus({ type, status: RequestStatus.ERROR }));
  }
}
