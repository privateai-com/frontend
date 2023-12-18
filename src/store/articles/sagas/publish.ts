import { call, put } from 'redux-saga/effects';

import { sagaExceptionHandler } from 'utils';
import { RequestStatus } from 'types';
import { ApiEndpoint } from 'appConstants';
import { callApi } from 'api';
import { 
  articlesPublish, articlesSetStatus, articleSetFetchingStatus, articlesGetOneArticle,
} from 'store/articles/actionCreators';

export function* articlesPublishSaga({
  type,
  payload,
}: ReturnType<typeof articlesPublish>) {
  try {
    yield put(articlesSetStatus({ type, status: RequestStatus.REQUEST }));
    
    yield call(callApi, {
      method: 'PUT',
      endpoint: ApiEndpoint.ArticlesPublishArticle,
      payload: {
        articleId: payload.articleId,
        isPublished: payload.isPublished, 
      },
    });
    
    yield put(articlesGetOneArticle({
      articleId: payload.articleId,
    }));
    
    if(payload.callback) payload.callback();

    yield put(articlesSetStatus({ type, status: RequestStatus.SUCCESS }));
    yield put(articleSetFetchingStatus({ status: false }));
  } catch (e) {
    sagaExceptionHandler(e);
    yield put(articlesSetStatus({ type, status: RequestStatus.ERROR }));
    yield put(articleSetFetchingStatus({ status: false }));
  }
}
