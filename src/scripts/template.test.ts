import { IconKey } from '@/types';
import { generateHTMLTemplate } from './template';

describe('Template generator', () => {
  it('should generate compact HTML template', () => {
    const platforms: IconKey[] = ['legacy', 'modern', 'apple'];

    const template = generateHTMLTemplate(platforms);

    expect(template)
      .toMatch(/<link rel="icon" href="\/icon.svg" type="image\/svg\+xml">/g);
    expect(template)
      .toMatch(/<link rel="apple-touch-icon" href="\/apple-touch-icon.png">/);
    expect(template)
      .toMatch(/<link rel="icon" href="\/favicon.ico" sizes="any">/);
    expect(template)
      .not.toMatch(/<icon-tag>/);
    expect(template)
      .not.toMatch(/<link rel="manifest" href="\/manifest.webmanifest">/);
  });
});
