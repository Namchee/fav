import { createArchive, triggerDownload } from './archive';

import { URL_EXPIRE } from './../constant/file';

describe('createArchive', () => {
  it('should generate an archive', () => {
    const result = [];
    const fileMock = jest.fn().mockImplementation(
      (_: string, file: File) => {
        result.push(file);
      },
    );
    const archiveMock = jest.fn().mockImplementation(() => {
      return new Blob(['']);
    });

    jest.mock('jszip', () => {
      return jest.fn().mockImplementation(() => {
        return {
          file: fileMock,
          generateAsync: archiveMock,
        };
      });
    });

    const files = [
      new File([''], 'foo.svg'),
      new File([''], 'foo.png'),
    ];

    createArchive(files).then((blob) => {
      expect(fileMock).toHaveBeenCalledTimes(files.length);
      expect(archiveMock).toHaveBeenCalledTimes(1);
      expect(result.length).toBe(2);
      expect(blob).toBeInstanceOf(Blob);
    });
  });
});

describe('triggerDownload', () => {
  jest.useFakeTimers();

  it('should trigger an archive download', () => {
    const link = {
      style: {
        display: '',
      },
      href: '',
      download: '',
      click: jest.fn(),
    };

    const creator = jest.fn(() => 'bar');
    const revoker = jest.fn(() => '');

    global.URL.createObjectURL = creator;
    global.URL.revokeObjectURL = revoker;

    jest.spyOn(document, 'createElement')
      .mockImplementation(() => link as unknown as HTMLElement);
    jest.spyOn(global, 'setTimeout');

    const blob = new Blob(['']);

    triggerDownload(blob, 'foo');
    expect(link.style.display).toBe('none');
    expect(link.href).toBe('bar');
    expect(link.download)
      .toMatch(/\d+-foo.zip/);
    expect(link.click).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), URL_EXPIRE);

    jest.runOnlyPendingTimers();

    expect(revoker).toHaveBeenCalledTimes(1);
    expect(revoker).toHaveBeenCalledWith('bar');
  });
});

