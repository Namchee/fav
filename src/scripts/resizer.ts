import * as Pica from 'pica';
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

export async function generateFavicons(
  image: File,
  platforms: IconKey[],
): Promise<ImageBlob[]> {
  const resizer = new Pica();
  const ibs: ImageBlob[] = [];

  const img = await fileToImage(image);

  for (const platform of platforms) {
    const favicons = PLATFORM_ICONS[platform];

    for (const favicon of favicons) {
      const canvas = document.createElement('canvas');
      if (favicon.size) {
        canvas.width = favicon.size;
        canvas.height = favicon.size;

        const resizerCanvas = await resizer.resize(img, canvas, {
          unsharpRadius: 100,
          alpha: true,
        });

        const blob = await resizer.toBlob(resizerCanvas, favicon.mime);
        ibs.push({ name: favicon.name, blob });
      } else if (image.type !== 'image/svg+xml') { // it's an svg
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
