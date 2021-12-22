/* eslint-disable max-len */

import { IconKey, Favicon } from '@/types';

export const PLATFORM_LIST = [
  {
    name: 'Legacy',
    description: `Enable legacy favicon format that is supported by all browsers for maximum compatibility`,
    value: 'legacy',
  },
  {
    name: 'Modern',
    description: `Enable modern favicon features that are supported by major modern browsers`,
    value: 'modern',
  },
  {
    name: 'Android',
    description: 'Enable favicon support for Android-based devices, webmanifest included',
    value: 'android',
  },
  {
    name: 'Apple',
    description:
      `Enable favicon support for all Apple-based devices, no exceptions`,
    value: 'apple',
  },
];

export const PLATFORM_ICONS: Record<IconKey, Favicon[]> = {
  legacy: [
    {
      name: 'favicon.ico',
      mime: 'image/x-icon',
      size: 32,
    },
  ],
  modern: [],
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
