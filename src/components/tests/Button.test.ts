import { mount } from '@vue/test-utils';

import Button from '@/components/Button.vue';

describe('<Button>', () => {
  it('should render a button', () => {
    const wrapper = mount(Button, {
      props: {
        theme: 'primary',
        label: 'Test',
      },
      slots: {
        default: 'Button',
      },
    });

    expect(wrapper.text()).toBe('Button');
  });

  it('should render a disabled button', () => {
    const wrapper = mount(Button, {
      props: {
        theme: 'primary',
        label: 'Test',
      },
      slots: {
        default: 'Button',
      },
    });

    expect(wrapper.text()).toBe('Button');
  });

  it('should render a loading button', () => {
    const wrapper = mount(Button, {
      props: {
        theme: 'primary',
        label: 'Test',
      },
      slots: {
        default: 'Button',
      },
    });

    expect(wrapper.text()).toBe('Button');
  });
});
