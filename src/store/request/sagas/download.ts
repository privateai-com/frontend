import { call, put } from 'redux-saga/effects';
import { sagaExceptionHandler, downloadUrlFile } from 'utils';
import {
  Article,
  RequestStatus,
} from 'types';
import { callApi } from 'api';
import { ApiEndpoint } from 'appConstants';
import { 
  requestSetStatus, requestDownload,
} from 'store/request/actionCreators';

export function* requestDownloadSaga({ type, payload }: ReturnType<typeof requestDownload>) {
  try{
    yield put(requestSetStatus({ type, status: RequestStatus.REQUEST }));

    const { data }: { data: Article } = yield call(callApi, {
      method: 'GET',
      endpoint: `${ApiEndpoint.ArticlesGetOneArticle}?articleId=${payload.articleId}`,
    });

    downloadUrlFile(data.articleUrl, data.title);

    yield put(requestSetStatus({ type, status: RequestStatus.SUCCESS }));
  } catch (e) {
    sagaExceptionHandler(e);
    yield put(requestSetStatus({ type, status: RequestStatus.ERROR }));
  }
}
