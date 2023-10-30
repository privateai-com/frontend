import { ArticlesState, ActionFn } from 'types';
import { ArticlesActionTypes } from './actionTypes';
import {
  articlesSetState,
  articlesSetStatus,
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

export const articlesHandlers = {
  [ArticlesActionTypes.SetState]: setState,
  [ArticlesActionTypes.SetStatus]: setStatus,
};
