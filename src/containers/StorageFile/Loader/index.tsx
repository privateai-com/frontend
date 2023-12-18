import React from 'react';
import ContentLoader, { IContentLoaderProps } from 'react-content-loader';

import styles from './styles.module.scss';

export const FileInformationLoader = (props: JSX.IntrinsicAttributes & IContentLoaderProps) => (
  <ContentLoader
    width="100%"
    height="100%"
    viewBox="0 0 450 400"
    backgroundColor="#f0f0f0"
    foregroundColor="#dedede"
    className={styles.loader_container}
    {...props}
  >
    <rect x="4%" y="0" rx="4" ry="4" width="92%" height="10" />
    <rect x="4%" y="20" rx="3" ry="3" width="92%" height="10" />
    <rect x="4%" y="40" rx="3" ry="3" width="92%" height="10" />
    <rect x="4%" y="60" rx="10" ry="10" width="92%" height="80%" />
  </ContentLoader>
);

export const GraphLoader = (props: JSX.IntrinsicAttributes & IContentLoaderProps) => (
  <ContentLoader
    width="100%"
    height="100%"
    viewBox="0 0 450 400"
    backgroundColor="#f0f0f0"
    foregroundColor="#dedede"
    className={styles.loader_container}
    {...props}
  >
    <rect x="4%" y="0" rx="10" ry="10" width="92%" height="86%" />
    <rect x="4%" y="88%" rx="0" ry="0" width="60" height="20" />
    <rect x="35%" y="88%" rx="0" ry="0" width="60" height="20" />
    <rect x="70%" y="88%" rx="0" ry="0" width="100" height="20" />
  </ContentLoader>
);

export const ButtonsLoader = (props: JSX.IntrinsicAttributes & IContentLoaderProps) => (
  <ContentLoader
    width="100%"
    height="100%"
    // viewBox="0 0 450 400"
    backgroundColor="#f0f0f0"
    foregroundColor="#dedede"
    // className={styles.loader_container}
    {...props}
  >
    <rect x="0" y="0" rx="8" ry="8" width="48.8%" height="100%" />
    <rect x="51.2%" y="0" rx="8" ry="8" width="48.8%" height="100%" />
  </ContentLoader>
);
