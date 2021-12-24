import { blobToFile, fileToImage, getFilename } from './utils';

jest.useRealTimers();

describe('blobToFile', () => {
  it('should convert blob to file', () => {
    const blob = new Blob(['']);
    const file = blobToFile(blob, 'foo.zip', 'application/zip');

    expect(file.name).toBe('foo.zip');
    expect(file.type).toBe('application/zip');
  });
});

describe('fileToImage', () => {
  it('should create an image element', () => {
    const file = new File(['data:image/png;base64, foobar'], 'foo.jpg');

    const creator = jest.fn(() => 'data:image/png;base64, foobar');
    global.URL.createObjectURL = creator;

    fileToImage(file).then((image) => {
      expect(image).toBeInstanceOf(HTMLImageElement);
      expect(creator).toHaveBeenCalledTimes(1);
      expect(creator).toHaveBeenCalledWith('data:image/png;base64, foobar');
      expect(image.src).toBe('data:image/png;base64, foobar');
    });
  });
});

describe('getFilename', () => {
  it('should get filename without extension', () => {
    const file = 'foo.zip';
    const name = getFilename(file);

    expect(name).toBe('foo');
  });

  it('should ignore extensionless filename', () => {
    const file = 'foo';
    const name = getFilename(file);

    expect(name).toBe('foo');
  });
});
