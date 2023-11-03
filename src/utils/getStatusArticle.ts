import { Article, StatusArticle } from 'types';

export const getStatusArticle = (article: Article): StatusArticle => {
  if (article.isPublic) return StatusArticle.OpenSource;
  if (article.status === 'Access granted') return StatusArticle.AccessGranted;
  if (article.status === 'Access request pending') return StatusArticle.AccessRequestPending;
  return StatusArticle.PermissionNeeded;
};
