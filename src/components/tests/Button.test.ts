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
    expect(wrapper.attributes('aria-label')).toBe('Test');
    expect(wrapper.classes()).toContain('bg-primary');
    expect(wrapper.classes()).toContain('text-content-white');
  });

  it('should render a disabled button', () => {
    const wrapper = mount(Button, {
      props: {
        theme: 'primary',
        label: 'Test',
        disabled: true,
      },
      slots: {
        default: 'Button',
      },
    });

    expect(wrapper.text()).toBe('Button');
    expect(wrapper.attributes('aria-label')).toBe('Test');
    expect(wrapper.attributes()).toHaveProperty('disabled');
    expect(wrapper.classes()).toContain('bg-primary-light');
    expect(wrapper.classes()).toContain('text-content-white');
  });

  it('should render a loading button', () => {
    const wrapper = mount(Button, {
      props: {
        theme: 'primary',
        label: 'Test',
        loading: true,
      },
      slots: {
        default: 'Button',
      },
    });

    expect(wrapper.text()).not.toBe('Button');
    expect(wrapper.attributes('aria-label')).toBe('Test');
    expect(wrapper.attributes()).toHaveProperty('disabled');
    expect(wrapper.classes()).toContain('bg-primary-light');
    expect(wrapper.classes()).toContain('text-content-white');
  });
});
