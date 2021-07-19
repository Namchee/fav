import { Favicon, IconKey, ImageBlob, PLATFORM_ICONS } from './types';

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
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const imgWidth = width || image.width;

    canvas.width = imgWidth;
    canvas.height = imgWidth;

    ctx?.drawImage(
      image,
      0,
      0,
      canvas.width,
      canvas.width * (image.height / image.width),
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
): Promise<ImageBlob[]> {
  const ibs: Promise<ImageBlob>[] = [];

  const img = await fileToImage(baseFile);

  const basePlatforms = JSON.parse(
    JSON.stringify(PLATFORM_ICONS),
  ) as Record<IconKey, Favicon[]>;

  const isSvg = baseFile.type === 'image/svg+xml';

  basePlatforms.modern.push({
    name: `icon.${isSvg ? 'svg' : 'png'}`,
    mime: `image/${isSvg ? 'svg+xml' : 'png'}`,
  });

  for (const platform of platforms) {
    const favicons = basePlatforms[platform];
    const promises: Promise<ImageBlob>[] = favicons.map((favicon) => {
      return new Promise((resolve) => {
        getResizedImage(img, favicon.size)
          .then((blob) => resolve({ name: favicon.name, blob }));
      });
    });

    ibs.push(...promises);
  }

  return Promise.all(ibs);
}
