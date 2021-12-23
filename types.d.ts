/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />

declare module '*.vue' {
  import { defineComponent } from 'vue';
  const Component: ReturnType<typeof defineComponent>;
  export default Component;
}

declare module 'imagetracerjs' {
  export function getImgdata(canvas: HTMLCanvasElement): ImageData;
  export function imagedataToSVG(data: ImageData): string;
}

declare module 'svgo/dist/svgo.browser.js' {
  export interface OptimizeResult {
    data: string;
    info: {
      width: number;
      height: number;
    }
  }
  export function optimize(svg: string): OptimizeResult;
}
