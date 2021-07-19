import * as ImageTracer from 'imagetracerjs';

import { IconKey, ImageBlob, PLATFORM_ICONS } from './types';

function fileToImage(src: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(src);

    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
  });
}

function getResizedImage(
  image: HTMLImageElement,
  width: number,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = width;
    canvas.height = canvas.width * (image.height / image.width);

    ctx?.drawImage(image, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      }

      reject(new Error('Blob is `null`'));
    });
  });
}

export async function generateFavicons(
  baseFile: File,
  platforms: IconKey[],
): Promise<ImageBlob[]> {
  // const resizer = new Pica();
  const ibs: ImageBlob[] = [];

  const img = await fileToImage(baseFile);

  for (const platform of platforms) {
    const favicons = PLATFORM_ICONS[platform];

    for (const favicon of favicons) {
      const canvas = document.createElement('canvas');

      if (favicon.size) {
        const blob = await getResizedImage(img, favicon.size);

        ibs.push({ name: favicon.name, blob });
      } else if (baseFile.type !== 'image/svg+xml') { // it's an svg
        canvas.height = img.height;
        canvas.width = img.width;

        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);

        const imgData = ImageTracer.getImgdata(canvas);
        const svgString = ImageTracer.imagedataToSVG(imgData);

        const blob = new Blob([svgString], { type: favicon.mime });
        ibs.push({ name: favicon.name, blob });
      }
    }
  }

  return ibs;
}
