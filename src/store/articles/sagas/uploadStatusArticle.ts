import {
  call,
  put,
  select,
  spawn,
  takeLatest,
} from 'redux-saga/effects';
import { Socket } from 'socket.io-client';
import { EventChannel, eventChannel } from 'redux-saga';

import { socketConnect } from 'api';
import { sagaExceptionHandler } from 'utils';
import {
  ArticlesState,
  EmitedSocketUploadEvent,
  SocketUploadArticleEvent,
  UploadFileStatus,
} from 'types';
import { articlesSelectors } from '../selectors';
import { articlesSetState } from '../actionCreators';

let socket: Socket;
let uploadChannel: EventChannel<EmitedSocketUploadEvent>;

const getStatusUpload = (uploadProgress: number) => {
  switch (uploadProgress) {
    case 99:
      return UploadFileStatus.COMPLETE;
    case -1:
      return UploadFileStatus.ERROR;
    default:
      return UploadFileStatus.PROCESSING;
  }
};

function* handleSocketEvents(eventData: { articleId: number; uploadProgress: number; }) {
  try {
    const { articleId, uploadProgress } = eventData;
    const articles: ArticlesState['uploadArticles'] = yield select(
      articlesSelectors.getProp('uploadArticles'),
    );

    const articleToUpdate = articles.find((article) => article.id === articleId);

    if (articleToUpdate && articleToUpdate.uploadProgress !== uploadProgress) {
      const updatedArticles = articles.map((article) => {
        if (article.id === articleId) {
          return {
            ...article,
            uploadProgress: uploadProgress === 99 ? 100 : uploadProgress,
            uploadStatus: getStatusUpload(uploadProgress),
          };
        }
        return article;
      });

      yield put(articlesSetState({ uploadArticles: updatedArticles }));
    }
  } catch (err) {
    sagaExceptionHandler(err);
  }
}

function createUploadChannel() {
  return eventChannel<EmitedSocketUploadEvent>((emit) => {
    const updateUploadPercent = (data: {
      articleId: number,
      uploadProgress: number
    } | string) => {
      if (typeof data !== 'string') {
        emit({
          ...data,
          event: SocketUploadArticleEvent.GET_UPLOAD_STATUS, 
        });
      } else {
        emit(JSON.parse(data));
      }
    };

    socket.on(SocketUploadArticleEvent.GET_UPLOAD_STATUS, updateUploadPercent);

    return () => {
      socket.off(SocketUploadArticleEvent.GET_UPLOAD_STATUS, updateUploadPercent);
    };
  });
}

function* watchUploadChannel() {
  try {
    uploadChannel = yield call(createUploadChannel);
    yield takeLatest(uploadChannel, handleSocketEvents);
  } catch (error) {
    sagaExceptionHandler(error);
  }
}

export function* articlesSocketUploadStatusSaga() {
  try {
    if (!socket) {
      socket = yield call(socketConnect);
    }

    yield spawn(watchUploadChannel);
  } catch (exception) {
    sagaExceptionHandler(exception);
  }
}
