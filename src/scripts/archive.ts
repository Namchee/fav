import JSZip from 'jszip';

import { getFilename } from '@/utils';
import { URL_EXPIRE } from '@/constant/file';

export async function createArchive(files: File[]): Promise<Blob> {
  const archiver = new JSZip();
  files.forEach((file) => archiver.file(file.name, file));

  return archiver.generateAsync({ type: 'blob', mimeType: 'application/zip' });
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
  }, URL_EXPIRE);
}
