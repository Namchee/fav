import { mount } from '@vue/test-utils';

import UploadBox from '@/components/UploadBox.vue';

describe('<UploadBox>', () => {
  it('should display an upload file box', () => {
    const wrapper = mount(UploadBox);

    const input = wrapper.find('input[type=file]');
    const label = wrapper.find('label[for=image-file]');

    expect(input.exists()).toBe(true);
    expect(label.exists()).toBe(true);

    expect(label.find('svg').exists()).toBe(true);
  });

  // TODO: add more test if it's possible to mock FileTransfer API
});
