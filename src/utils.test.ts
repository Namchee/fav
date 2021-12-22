import { getFilename } from '@/utils';

describe('getFilename', () => {
  it('should return a filename without its extension', () => {
    const input = 'foo.zip';
    const output = getFilename(input);

    expect(output).toBe('foo');
  });

  it('should do nothing on name without extension', () => {
    const input = 'foo';
    const output = getFilename(input);

    expect(output).toEqual(input);
  });
});
