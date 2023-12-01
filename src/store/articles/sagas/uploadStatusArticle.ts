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

function* handleSocketEvents(eventData: { articleId: number; uploadProgress: number; }) {
  try {
    const { articleId, uploadProgress } = eventData;
    const articles: ArticlesState['myArticles'] = yield select(
      articlesSelectors.getProp('myArticles'),
    );

    const articleToUpdate = articles.find((article) => article.id === articleId);

    if (articleToUpdate && articleToUpdate.uploadProgress !== uploadProgress) {
      const updatedArticles = articles.map((article) => {
        if (article.id === articleId) {
          return {
            ...article,
            uploadProgress: uploadProgress === 99 ? 100 : uploadProgress,
            uploadStatus: uploadProgress === 99 ?
              UploadFileStatus.COMPLETE : UploadFileStatus.PROCESSING,
          };
        }
        return article;
      });

      yield put(articlesSetState({ myArticles: updatedArticles }));
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
    }) => {
      emit({
        ...data,
        event: SocketUploadArticleEvent.GET_UPLOAD_STATUS, 
      });
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
