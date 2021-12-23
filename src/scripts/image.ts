import Optimizer from './worker?worker';
import rasterCompressor from 'browser-image-compression';

import type { IconKey, ImageProcessor } from '@/types';

const processor: Record<IconKey, ImageProcessor> = {
  legacy: async (file: File, ratio?: boolean) => {
    const img = await fileToImage(file);
    const blob = await getResizedImage(img, 32, ratio);

    return [new File([blob], 'favicon.ico', { type: 'image/x-icon' })];
  },
  modern: async (file: File) => {
    const isSvg = file.type === 'image/svg+xml';
    const name = 'icon.svg';
    const mime = { type: 'image/svg+xml' };

    return isSvg ?
      [new File([file], name, mime)] :
      [new File([await getVector(file)], name, mime)];
  },
  android: async (file: File, ratio?: boolean) => {
    const img = await fileToImage(file);

    const mime = { type: 'image/png' };
    const sizes = [192, 512];

    const results = sizes.map(async (s) => {
      const resized = await getResizedImage(img, s, ratio);
      const resizedFile = new File([resized], `${s}.png`, mime);

      return compressPng(resizedFile);
    });

    return Promise.all(results);
  },
  apple: async (file: File, ratio?: boolean) => {
    const img = await fileToImage(file);
    const blob = await getResizedImage(img, 180, ratio);

    const result = new File(
      [blob],
      'apple-touch-icon.png',
      { type: 'image/png' },
    );

    const compressed = await compressPng(result);

    return [compressed];
  },
};

function getBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      }

      reject(new Error('Blob is `null`'));
    });
  });
}

async function getVector(file: File): Promise<Blob> {
  const img = await fileToImage(file);

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  canvas.width = img.width;
  canvas.height = img.height;

  ctx.drawImage(
    img,
    canvas.width / 2 - img.width / 2,
    canvas.height / 2 - img.height / 2,
    img.width,
    img.height,
  );

  const imgData = ctx.getImageData(0, 0, img.width, img.height);

  const optz = new Optimizer();

  return new Promise((resolve) => {
    optz.postMessage({
      img: imgData,
    });

    optz.onmessage = (event) => {
      resolve(new Blob([event.data.result], { type: 'image/svg+xml' }));
    };
  });
}

function compressPng(file: File): Promise<File> {
  return rasterCompressor(file, {
    maxSizeMB: 0.5,
    useWebWorker: true,
  });
}

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
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

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

  ctx.drawImage(
    image,
    canvas.width / 2 - imgWidth / 2,
    canvas.height / 2 - imgHeight / 2,
    imgWidth,
    imgHeight,
  );

  return getBlob(canvas);
}

export async function createImageFiles(
  file: File,
  platforms: IconKey[],
  aspectRatio = true,
): Promise<File[]> {
  const promises: Promise<File[]>[] = [];

  for (const platform of platforms) {
    promises.push(processor[platform](file, aspectRatio));
  }

  const files = await Promise.all(promises);

  return files.flat(1);
}
