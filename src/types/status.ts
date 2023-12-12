export type Status =
  | 'Open sourced'
  | 'Access granted'
  | 'Permission needed'
  | 'Access request pending'
  | 'Access denied';

export enum UploadFileStatus {
  CREATED = 'created',
  UPLOADED = 'uploaded',
  PROCESSING = 'processing',
  COMPLETE = 'complete',
  PUBLISHED = 'published',
  QUEUE = 'queue',
  ERROR = 'error',
}
