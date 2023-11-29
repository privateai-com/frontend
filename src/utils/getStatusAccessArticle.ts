import { Article, StatusAccessArticle } from 'types';

export const getStatusAccessArticle = (article: Article): StatusAccessArticle => {
  if (article.isPublic) return StatusAccessArticle.OpenSource;
  if (article.status === 'Access granted') return StatusAccessArticle.AccessGranted;
  if (article.status === 'Access denied') return StatusAccessArticle.AccessDenied;
  if (article.status === 'Access request pending') return StatusAccessArticle.AccessRequestPending;
  return StatusAccessArticle.PermissionNeeded;
};
