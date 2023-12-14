export const getStatusArticle = (uploadStatus: string) => {
  if (uploadStatus === 'published') return 'Published';
  if (uploadStatus === 'processing') return 'Processing';
  if (uploadStatus === 'queue') return 'Queue';
  return 'Uploaded';
};
