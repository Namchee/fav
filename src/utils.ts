function getFilename(str: string): string {
  const dot = str.lastIndexOf('.');

  return dot === -1 ? str : str.slice(0, dot);
}

export function triggerDownload(archive: Blob | File, filename: string): void {
  const name = `${new Date().getTime()}-${getFilename(filename)}.zip`;

  const link = document.createElement('a');
  link.style.display = 'none';
  link.download = name;

  const url = URL.createObjectURL(archive);

  link.href = url;
  link.click();

  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 200);
}
