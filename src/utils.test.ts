import { URL_EXPIRE } from './constant/file';
import { triggerDownload } from './utils';

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
