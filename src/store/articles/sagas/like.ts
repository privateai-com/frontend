import { call, put, select } from 'redux-saga/effects';

import { sagaExceptionHandler } from 'utils';
import { ArticleCommunityResponse, ArticlesState, RequestStatus } from 'types';
import { ApiEndpoint } from 'appConstants';
import { callApi } from 'api';
import { 
  articlesLike, articlesSetState, articlesSetStatus,
} from 'store/articles/actionCreators';
import { articlesSelectors } from '../selectors';

export function* articlesLikeSaga({
  type,
  payload,
}: ReturnType<typeof articlesLike>) {
  try {
    yield put(articlesSetStatus({ type, status: RequestStatus.REQUEST }));
    
    const { data }: { data: ArticleCommunityResponse } = yield call(callApi, {
      method: 'PATCH',
      endpoint: payload.isDislike ? ApiEndpoint.ArticlesDislike : ApiEndpoint.ArticlesLike,
      payload: {
        articleId: payload.id,
      },
    });

    const {
      articleId,
      likesCount,
      dislikesCount,
      liked,
      disliked,
    } = data;

    if (payload.isKnowledgeBase) {
      const articles: ArticlesState['articlesAll'] = yield select(
        articlesSelectors.getProp('articlesAll'),
      );

      const updatedArticles = articles.map((article) => {
        if (article.id === articleId) {
          return {
            ...article,
            likesCount,
            dislikesCount,
            liked,
            disliked,
          };
        }
        return article;
      });

      yield put(articlesSetState({ 
        articlesAll: updatedArticles,
      }));
      yield put(articlesSetStatus({ type, status: RequestStatus.SUCCESS }));
      return;
    }

    const article: ArticlesState['article'] = yield select(
      articlesSelectors.getProp('article'),
    );

    if (article) {
      yield put(articlesSetState({ 
        article: {
          ...article,
          likesCount,
          dislikesCount,
          liked,
          disliked,
        },
      }));
    }

    yield put(articlesSetStatus({ type, status: RequestStatus.SUCCESS }));
  } catch (e) {
    sagaExceptionHandler(e);
    yield put(articlesSetStatus({ type, status: RequestStatus.ERROR }));
  }
}
