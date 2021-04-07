import * as Pica from 'pica';
import * as JSZip from 'jszip';

const manifest = `{
  "icons": [
    { "src": "/192.png", "type": "image/png", "sizes": "192x192" },
    { "src": "/512.png", "type": "image/png", "sizes": "512x512" }
  ]
}`;

interface Favicon {
  name: string;
  mime: string;
  size: number;
}

interface ImageBlob {
  name: string;
  blob: Blob;
}

const platformIcons: Record<string, Favicon[]> = {
  legacy: [
    {
      name: 'favicon.ico',
      mime: 'image/x-icon',
      size: 32,
    },
  ],
  android: [
    {
      name: '192.png',
      mime: 'image/png',
      size: 192,
    },
    {
      name: '512.png',
      mime: 'image/png',
      size: 512,
    },
  ],
  apple: [
    {
      name: 'apple-touch-icon.png',
      mime: 'image/png',
      size: 180,
    },
  ],
};

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

function fileToImage(src: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(src);

    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
  });
}

export function getFilenameWithoutExtension(str: string): string {
  return str.slice(0, str.lastIndexOf('.'));
}

export async function generateFavicons(
  image: File,
  platforms: string[],
): Promise<Blob> {
  const resizer = new Pica();
  const ibs: ImageBlob[] = [];

  const img = await fileToImage(image);

  for (const platform of platforms) {
    if (platform === 'modern') {
      continue;
    }

    const favicons = platformIcons[platform];

    if (favicons) {
      for (const favicon of favicons) {
        const canvas = document.createElement('canvas');
        canvas.width = favicon.size;
        canvas.height = favicon.size;

        const resizerCanvas = await resizer.resize(img, canvas, {
          unsharpRadius: 50,
          alpha: true,
        });

        const blob = await resizer.toBlob(resizerCanvas, favicon.mime);
        ibs.push({ name: favicon.name, blob });
      }
    } else {
      throw new Error(`Illegal platform: ${platform}`);
    }
  }

  const files = ibs.map(({ name, blob }: ImageBlob) => {
    return blobToFile(blob, new Date(), name);
  });

  if (platforms.includes('android')) {
    const blob = new Blob([manifest]);

    files.push(
      blobToFile(blob, new Date(), 'manifest.webmanifest'),
    );
  }

  const archiver = new JSZip();
  files.forEach((file) => archiver.file(file.name, file));
  archiver.file('icon.svg', image);

  return archiver.generateAsync({ type: 'blob', mimeType: 'application/zip' });
}
