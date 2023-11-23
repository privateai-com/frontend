export function downloadUrlFile(uri: string, name: string) {
  const link = document.createElement('a');
  link.download = name;
  link.href = uri;
  link.target = '_blank';
  link.click();
}
