import * as JSZip from 'jszip';

import { generateHTMLTemplate } from './template';
import { IconKey, ImageBlob } from './types';

const MANIFEST = `{
  "icons": [
    { "src": "/192.png", "type": "image/png", "sizes": "192x192" },
    { "src": "/512.png", "type": "image/png", "sizes": "512x512" }
  ]
}`;

function blobToFile(
  blob: Blob,
  lastModified: Date,
  name: string,
): File {
  const obj: any = blob;

  obj.lastModified = lastModified;
  obj.name = name;

  return obj as File;
}

export function getFilenameWithoutExtension(str: string): string {
  return str.slice(0, str.lastIndexOf('.'));
}

export function createArchive(
  platforms: IconKey[],
  imageBlobs: ImageBlob[],
  includeTemplate: boolean = false,
): Promise<Blob> {
  const files = imageBlobs.map(({ name, blob }: ImageBlob) => {
    return blobToFile(blob, new Date(), name);
  });

  const hasAndroid = platforms.includes('android');

  if (hasAndroid) {
    const manifestBlob = new Blob([MANIFEST]);

    files.push(
      blobToFile(manifestBlob, new Date(), 'manifest.webmanifest'),
    );
  }

  if (includeTemplate) {
    const hasSvg = imageBlobs.some(({ name }) => name.endsWith('svg'));

    const template = generateHTMLTemplate(platforms, hasSvg);
    const templateBlob = new Blob([template]);

    files.push(
      blobToFile(templateBlob, new Date(), 'index.html'),
    );
  }

  const archiver = new JSZip();
  files.forEach((file) => archiver.file(file.name, file));

  return archiver.generateAsync({ type: 'blob', mimeType: 'application/zip' });
}
