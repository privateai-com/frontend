import { ArticlesState, ActionFn } from 'types';
import { ArticlesActionTypes } from './actionTypes';
import {
  articleSetFetchingStatus,
  articlesSetState,
  articlesSetStatus,
  articlesSetStatusUpload,
} from './actionCreators';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ArticlesStateActionFn<F extends (...args: any) => any> =
  ActionFn<ArticlesState, ReturnType<F>>;

const setState: ArticlesStateActionFn<typeof articlesSetState> = (
  state,
  { payload },
) => ({
  ...state,
  ...payload,
});

const setStatus: ArticlesStateActionFn<typeof articlesSetStatus> = (
  state,
  { payload },
) => ({
  ...state,
  ui: {
    ...state.ui,
    [payload.type]: payload.status,
  },
});

const setStatusUpload: ArticlesStateActionFn<typeof articlesSetStatusUpload> = (
  state,
  { payload },
) => ({
  ...state,
  upload: {
    ...state.upload,
    [payload.id]: {
      ...state.upload[payload.id],
      ...payload, 
    },
  },
});

const setFetchingStatus: ArticlesStateActionFn<typeof articleSetFetchingStatus> = (
  state,
  { payload },
) => ({
  ...state,
  isFetching: payload.status,
});

export const articlesHandlers = {
  [ArticlesActionTypes.SetState]: setState,
  [ArticlesActionTypes.SetStatus]: setStatus,
  [ArticlesActionTypes.SetStatusUpload]: setStatusUpload,
  [ArticlesActionTypes.SetFetchingStatus]: setFetchingStatus,
};
