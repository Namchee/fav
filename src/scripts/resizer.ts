import { PLATFORM_ICONS } from '@/constant/platform';

import type { Favicon, IconKey, ImageBlob } from '@/types';

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
  width?: number,
  aspectRatio?: boolean,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    let imgWidth = width || image.width;
    let imgHeight = aspectRatio ?
      imgWidth * (image.height / image.width) :
      width || image.height;

    if (image.width < image.height) {
      imgHeight = width || image.height;
      imgWidth = aspectRatio ?
        imgHeight * (image.width / image.height) :
        width || image.width;
    }

    canvas.width = width || Math.max(image.width, image.height);
    canvas.height = canvas.width;

    ctx?.drawImage(
      image,
      canvas.width / 2 - imgWidth / 2,
      canvas.height / 2 - imgHeight / 2,
      imgWidth,
      imgHeight,
    );
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      }

      reject(new Error('Blob is `null`'));
    });
  });
}

export async function createImageBlobs(
  baseFile: File,
  platforms: IconKey[],
  aspectRatio = true,
): Promise<ImageBlob[]> {
  const ibs: Promise<ImageBlob>[] = [];

  const img = await fileToImage(baseFile);

  const basePlatforms = JSON.parse(
    JSON.stringify(PLATFORM_ICONS),
  ) as Record<IconKey, Favicon[]>;

  const isSvg = baseFile.type === 'image/svg+xml';

  const modernSet: Favicon = {
    name: `icon.${isSvg ? 'svg' : 'png'}`,
    mime: `image/${isSvg ? 'svg+xml' : 'png'}`,
  };

  if (!isSvg) {
    modernSet.size = 32;
  }

  basePlatforms.modern.push(modernSet);

  for (const platform of platforms) {
    const favicons = basePlatforms[platform];
    const promises: Promise<ImageBlob>[] = favicons.map((favicon) => {
      return new Promise((resolve) => {
        getResizedImage(img, favicon.size, aspectRatio)
          .then((blob) => resolve({ name: favicon.name, blob }));
      });
    });

    ibs.push(...promises);
  }

  return Promise.all(ibs);
}
