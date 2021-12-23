import JSZip from 'jszip';

import { generateHTMLTemplate } from '@/scripts/template';

import type { IconKey } from '@/types';

const MANIFEST = `{
  "icons": [
    { "src": "/192.png", "type": "image/png", "sizes": "192x192" },
    { "src": "/512.png", "type": "image/png", "sizes": "512x512" }
  ]
}`;

function blobToFile(
  blob: Blob,
  name: string,
  mime: string,
): File {
  return new File([blob], name, { type: mime });
}

export function createArchive(
  platforms: IconKey[],
  imageFiles: File[],
  includeTemplate = false,
): Promise<Blob> {
  const files = imageFiles;

  const hasAndroid = platforms.includes('android');

  if (hasAndroid) {
    files.push(
      blobToFile(
        new Blob([MANIFEST]),
        'manifest.webmanifest',
        'application/manifest+json',
      ),
    );
  }

  if (includeTemplate) {
    const template = generateHTMLTemplate(platforms);

    files.push(
      blobToFile(new Blob([template]), 'index.html', 'text/html'),
    );
  }

  const archiver = new JSZip();
  files.forEach((file) => archiver.file(file.name, file));

  return archiver.generateAsync({ type: 'blob', mimeType: 'application/zip' });
}
