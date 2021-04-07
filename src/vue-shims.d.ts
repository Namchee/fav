declare module '*.vue' {
  import { defineComponent } from '@nuxtjs/composition-api';
  const Component: ReturnType<typeof defineComponent>;

  export default Component;
}

declare module '*.svg?inline' {
  const content: any;

  export default content;
}
