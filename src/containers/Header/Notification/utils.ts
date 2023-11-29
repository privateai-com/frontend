import { NotificationArticle, NotificationType } from 'types';

export const timeAgo = (createdAt: string): string => {
  const dateCreated = new Date(createdAt);
  const now = new Date();
  const diffMs = now.getTime() - dateCreated.getTime();
  const diffSeconds = Math.round(diffMs / 1000);

  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;

  if (diffSeconds < minute) {
    return '~ a few seconds ago';
  } if (diffSeconds < hour) {
    const minutes = Math.round(diffSeconds / minute);
    return `~ ${minutes} min ago`;
  } if (diffSeconds < day) {
    const hours = Math.round(diffSeconds / hour);
    return `~ ${hours} hour${hours > 1 ? 's' : ''} ago`;
  }
  const days = Math.round(diffSeconds / day);
  return `~ ${days} day${days > 1 ? 's' : ''} ago`;
};

export const generateNotificationText = (
  type: NotificationType,
  article: NotificationArticle,
  isOwner: boolean,
): string => {
  switch (type) {
    case NotificationType.YouGrantedAccess:
    case NotificationType.AccessWasGranted:
      return `Access was granted for "${article.title}" document`;
    case NotificationType.GrantAccess:
    case NotificationType.PendingAccess:
      return `${isOwner ? 'New access request' : 'Pending access'} for "${article.title}" document.`;
    case NotificationType.YouRejectedAccess:
    case NotificationType.AccessWasRejected:
      return `Access was rejected for "${article.title}" document`;
    default:
      return article.title;
  }
};
