import { call, put } from 'redux-saga/effects';

import { sagaExceptionHandler } from 'utils';
import { RequestStatus } from 'types';
import { ApiEndpoint } from 'appConstants';
import { callApi } from 'api';
import { 
  articlesCancelUpload, articlesSetStatus,
} from 'store/articles/actionCreators';

export function* articlesCancelUploadSaga({
  type,
  payload,
}: ReturnType<typeof articlesCancelUpload>) {
  try {
    yield put(articlesSetStatus({ type, status: RequestStatus.REQUEST }));
    
    yield call(callApi, {
      method: 'POST',
      endpoint: ApiEndpoint.ArticlesCancelUpload,
      payload: {
        articleId: payload.articleId,
        isHidden: payload.isHidden, 
      },
    });
    
    if(payload.callback) payload.callback();

    yield put(articlesSetStatus({ type, status: RequestStatus.SUCCESS }));
  } catch (e) {
    sagaExceptionHandler(e);
    yield put(articlesSetStatus({ type, status: RequestStatus.ERROR }));
  }
}
