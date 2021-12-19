import { getFilenameWithoutExtension } from '@/utils';

describe('getFilenameWithoutExtension', () => {
  it('should return a filename without its extension', () => {
    const input = 'foo.zip';
    const output = getFilenameWithoutExtension(input);

    expect(output).toBe('foo');
  });

  it('should do nothing on name without extension', () => {
    const input = 'foo';
    const output = getFilenameWithoutExtension(input);

    expect(output).toEqual(input);
  });
});
