import { call, put } from 'redux-saga/effects';

import { sagaExceptionHandler } from 'utils';
import { RequestStatus, UploadFileStatus } from 'types';
import { ApiEndpoint } from 'appConstants';
import { callApi } from 'api';
import { store } from 'store/configureStore';
import { articlesCreate, articlesSetStatusUpload } from '../actionCreators';

function generateNumericId(): number {
  const idFile = crypto.randomUUID();
  const parts = idFile.split('-');
  const numericId = parseInt(parts[0] + parts[1], 16);
  return numericId;
}

export function* articlesCreateSaga({
  payload,
}: ReturnType<typeof articlesCreate>) {
  const idFile = generateNumericId(); 
  try {
    yield put(articlesSetStatusUpload({ 
      id: idFile, 
      status: RequestStatus.REQUEST,
      percentUpload: 0,
      fileName: payload.file.name,
      size: payload.file.size / 1_000_000,
      uploadStatus: UploadFileStatus.CREATED,
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
      if (percentUpload >= 100) {
        if(payload.callback) payload.callback(); 
        store.dispatch(
          articlesSetStatusUpload({ 
            id: idFile, 
            percentUpload,
            status: RequestStatus.SUCCESS,
            // percentUpload: 100,
            uploadStatus: UploadFileStatus.PROCESSING, 
          }), 
        );
      }
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
      // percentUpload: 100,
      idArticle: res.data.data.id,
      uploadStatus: UploadFileStatus.PROCESSING,
    }));  
  } catch (e) {
    sagaExceptionHandler(e);
    yield put(articlesSetStatusUpload({ 
      id: idFile, 
      status: RequestStatus.ERROR,
    }));
  }
}
