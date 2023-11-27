export const getStatusArticle = (uploadStatus: string) => {
  if (uploadStatus === 'published') return 'Published';
  if (uploadStatus === 'processing') return 'Processing';
  return 'Uploaded';
};
