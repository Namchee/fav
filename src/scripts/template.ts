import { IconKey } from '../types';

export function generateHTMLTemplate(
  platforms: IconKey[],
  isSvg = true,
): string {
  const TAG_MAP: Record<IconKey, string> = {
    legacy: '<link rel="icon" href="/favicon.ico" size="any">',
    modern: isSvg ?
      '<link rel="icon" href="/icon.svg" type="image/svg+xml">' :
      '<link rel="icon" href="/icon.png" type="image/png" sizes="32x32">',
    apple: '<link rel="apple-touch-icon" href="/apple-touch-icon.png">',
    android: '<link rel="manifest" href="/manifest.webmanifest">',
  };

  const TEMPLATE = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sample Project</title>
    <icon-tag>
  </head>
  <body>
      
  </body>
</html>`;

  const iconTag = platforms.map((platform: IconKey) => {
    return TAG_MAP[platform];
  });

  // use space for consistency
  return TEMPLATE.replace(
    '<icon-tag>',
    iconTag.join('\n    '),
  );
}
