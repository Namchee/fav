export interface Favicon {
  name: string;
  mime: string;
  size?: number;
}

export type IconKey = 'legacy' | 'modern' | 'android' | 'apple';

export interface ImageBlob {
  name: string;
  blob: Blob;
}

export const PLATFORM_ICONS: Record<IconKey, Favicon[]> = {
  legacy: [
    {
      name: 'favicon.ico',
      mime: 'image/x-icon',
      size: 32,
    },
  ],
  modern: [
    {
      name: 'icon.svg',
      mime: 'image/svg+xml',
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
