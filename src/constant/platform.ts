/* eslint-disable max-len */

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
