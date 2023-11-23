import { call, put } from 'redux-saga/effects';

import { sagaExceptionHandler } from 'utils';
import { RequestStatus } from 'types';
import { ApiEndpoint } from 'appConstants';
import { callApi } from 'api';
import { store } from 'store/configureStore';
import { articlesCreate, articlesSetStatusUpload } from '../actionCreators';

export function* articlesCreateSaga({
  payload,
}: ReturnType<typeof articlesCreate>) {
  const idFile = crypto.randomUUID(); 
  try {
    yield put(articlesSetStatusUpload({ 
      id: idFile, 
      status: RequestStatus.REQUEST,
      percentUpload: 0,
      fileName: payload.file.name,
      size: payload.file.size,
    }));

    const formData = new FormData();

    const data = {
      num_return_sequences: '10',
      max_length: '216',
      length_penalty: '0',
      num_beams: '10',
      span_length: '128',
      file: payload.file,
    };

    Object.entries(data).forEach(([key, value]) =>
      formData.append(key, value));

    const handleSetStatusUpload = (percentUpload: number) => {
      store.dispatch(
        articlesSetStatusUpload({ 
          id: idFile, 
          percentUpload,
        }), 
      );
    };

    const res: {
      data: {
        data: {
          id: number,
        }
      }
    } = yield call(callApi, {
      method: 'POST',
      endpoint: ApiEndpoint.ArticlesCreateArticle,
      payload: formData,
      callbackUploadStatus: handleSetStatusUpload,
    });

    // yield call(callApi, {
    //   method: 'PUT',
    //   endpoint: ApiEndpoint.GraphSave,
    //   payload: {
    //     id: res.data.data.id,
    //     graph: graphData,
    //   },
    // });
    
    if(payload.callback) payload.callback();

    yield put(articlesSetStatusUpload({ 
      id: idFile, 
      status: RequestStatus.SUCCESS,
      percentUpload: 100,
      idArticle: res.data.data.id, 
    }));  
  } catch (e) {
    sagaExceptionHandler(e);
    yield put(articlesSetStatusUpload({ 
      id: idFile, 
      status: RequestStatus.ERROR,
    }));
  }
}
