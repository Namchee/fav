export interface Favicon {
  name: string;
  mime: string;
  size?: number;
}

export type IconKey = 'legacy' | 'modern' | 'android' | 'apple';

export interface FormValue {
  file: File | null;
  platforms: IconKey[];
  template: boolean;
  aspectRatio: boolean;
}

export type ImageProcessor = (file: File, ratio?: boolean) => Promise<File[]>;
