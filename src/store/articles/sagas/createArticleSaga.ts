import { call, put } from 'redux-saga/effects';

import { sagaExceptionHandler } from 'utils';
import { RequestStatus } from 'types';
import { ApiEndpoint, graphData } from 'appConstants';
import { callApi } from 'api';
import { articlesCreateArticle, articlesSetStatus } from '../actionCreators';

export function* articlesCreateArticleSaga({
  type,
  payload,
}: ReturnType<typeof articlesCreateArticle>) {
  try {
    yield put(articlesSetStatus({ type, status: RequestStatus.REQUEST }));

    const formData = new FormData();

    const data = {
      num_return_sequences: '0',
      max_length: '0',
      length_penalty: '0',
      num_beams: '0',
      span_length: '0',
      file: payload.file,
    };

    Object.entries(data).forEach(([key, value]) =>
      formData.append(key, value));

    const res: {
      data: {
        id: string,
      }
    } = yield call(callApi, {
      method: 'POST',
      endpoint: ApiEndpoint.ArticlesCreateArticle,
      payload: formData,
    });

    yield call(callApi, {
      method: 'PUT',
      endpoint: ApiEndpoint.GraphSave,
      payload: {
        id: res.data.id,
        graph: graphData,
      },
    });
    
    if(payload.callback) payload.callback();

    yield put(articlesSetStatus({ type, status: RequestStatus.SUCCESS }));
  } catch (e) {
    sagaExceptionHandler(e);
    yield put(articlesSetStatus({ type, status: RequestStatus.ERROR }));
  }
}
