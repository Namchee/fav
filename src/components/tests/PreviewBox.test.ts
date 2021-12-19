import { mount } from '@vue/test-utils';

import PreviewBox from '@/components/PreviewBox.vue';

describe('<PreviewBox>', () => {
  it('should render placeholder content', () => {
    const wrapper = mount(PreviewBox, {
      props: {
        value: '',
      },
    });

    expect(wrapper.find('img').exists()).toBe(false);
  });

  it('should render preview image', () => {
    const wrapper = mount(PreviewBox, {
      props: {
        value: 'asdas',
      },
    });

    expect(wrapper.find('img').exists()).toBe(true);
  });
});
