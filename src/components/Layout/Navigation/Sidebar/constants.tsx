import { routes } from 'appConstants';
import {
  KnowledgeIcon,
  MyProfileIcon,
  RequestsIcon,
  SecurityIcon,
  StorageIcon,
  UploadActivityIcon,
} from 'assets';

export const navPathName = [
  {
    href: routes.knowledge.root,
    title: routes.knowledge.title,
    icon: <KnowledgeIcon />,
  },
  {
    href: routes.profile.root,
    title: 'My profile',
    icon: <MyProfileIcon />,
  },
  {
    href: routes.storage.root,
    title: routes.storage.title,
    icon: <StorageIcon />,
  },
  {
    href: routes.uploadActivity.root,
    title: routes.uploadActivity.title,
    icon: <UploadActivityIcon />,
  },
  {
    href: routes.requests.root,
    title: routes.requests.title,
    icon: <RequestsIcon />,
  },
  {
    href: routes.security.root,
    title: routes.security.title,
    icon: <SecurityIcon />,
  },
];
