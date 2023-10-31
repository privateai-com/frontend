import { call, put } from 'redux-saga/effects';

import { sagaExceptionHandler } from 'utils';
import { RequestStatus } from 'types';
import { ApiEndpoint } from 'appConstants';
import { callApi } from 'api';
import { 
  articlesUpdate, articlesSetStatus, articlesGetOneArticle,
} from 'store/articles/actionCreators';

export function* articlesUpdateSaga({
  type,
  payload,
}: ReturnType<typeof articlesUpdate>) {
  try {
    yield put(articlesSetStatus({ type, status: RequestStatus.REQUEST }));
    
    yield call(callApi, {
      method: 'PUT',
      endpoint: ApiEndpoint.ArticlesUpdateArticle,
      payload: {
        articleId: payload.articleId,
        title: payload.title, 
        field: payload.field, 
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
