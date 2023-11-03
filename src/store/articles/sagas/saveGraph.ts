import { call, put } from 'redux-saga/effects';

import { sagaExceptionHandler } from 'utils';
import { RequestStatus } from 'types';
import { ApiEndpoint } from 'appConstants';
import { callApi } from 'api';
import { 
  articlesGetOneArticle, articlesSaveGraph, articlesSetStatus,
} from 'store/articles/actionCreators';

export function* articlesSaveGraphSaga({
  type,
  payload,
}: ReturnType<typeof articlesSaveGraph>) {
  try {
    yield put(articlesSetStatus({ type, status: RequestStatus.REQUEST }));
    
    yield call(callApi, {
      method: 'PUT',
      endpoint: ApiEndpoint.GraphSave,
      payload: {
        id: payload.articleId,
        graph: payload.data, 
      },
    });
    
    yield put(articlesGetOneArticle({
      articleId: payload.articleId,
    }));
    
    if(payload.callback) payload.callback();

    yield put(articlesSetStatus({ type, status: RequestStatus.SUCCESS }));
  } catch (e) {
    sagaExceptionHandler(e);
    yield put(articlesSetStatus({ type, status: RequestStatus.ERROR }));
  }
}
