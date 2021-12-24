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
  ratio: boolean;
}

export interface GeneratorConfig {
  ratio?: boolean;
  template?: boolean;
}

export type ImageProcessor = (file: File, ratio?: boolean) => Promise<File[]>;
