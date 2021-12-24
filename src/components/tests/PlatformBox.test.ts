import { mount } from '@vue/test-utils';

import PlatformBox from '@/components/PlatformBox.vue';

describe('<PlatformBox>', () => {
  it('should render a fancy checkbox', () => {
    const wrapper = mount(PlatformBox, {
      props: {
        title: 'Title',
        description: 'Description',
        platforms: [],
        value: 'foo',
      },
    });

    const input = wrapper.find('input[id=foo]');
    const label = wrapper.find('label[for=foo]');

    expect(input.exists()).toBe(true);
    expect(label.exists()).toBe(true);

    const texts = wrapper.findAll('p');

    expect(texts[0].text()).toBe('Title');
    expect(texts[1].text()).toBe('Description');
    expect(texts[0].classes()).not.toContain('text-primary-dark');
    expect(texts[1].classes()).not.toContain('text-primary-light');
  });

  it('should render a checked checkbox', () => {
    const wrapper = mount(PlatformBox, {
      props: {
        title: 'Title',
        description: 'Description',
        platforms: ['foo'],
        value: 'foo',
      },
    });

    const input = wrapper.find('input[id=foo]');
    const label = wrapper.find('label[for=foo]');

    expect(input.exists()).toBe(true);
    expect(label.exists()).toBe(true);

    const texts = wrapper.findAll('p');

    expect(texts[0].text()).toBe('Title');
    expect(texts[1].text()).toBe('Description');
    expect(texts[0].classes()).toContain('text-primary-dark');
    expect(texts[1].classes()).toContain('text-primary-light');
  });

  it('should render a disabled checkbox', () => {
    const wrapper = mount(PlatformBox, {
      props: {
        title: 'Title',
        description: 'Description',
        platforms: ['foo'],
        disabled: true,
        value: 'foo',
      },
    });

    const input = wrapper.find('input[id=foo]');
    const label = wrapper.find('label[for=foo]');

    expect(input.exists()).toBe(true);
    expect(label.exists()).toBe(true);

    const texts = wrapper.findAll('p');

    expect(texts[0].text()).toBe('Title');
    expect(texts[1].text()).toBe('Description');
    expect(texts[0].classes()).toContain('text-primary-dark');
    expect(texts[1].classes()).toContain('text-primary-light');

    expect(input.classes()).toContain('text-primary-light');
  });

  it('should handle uncheck to check behavior', async () => {
    const wrapper = mount(PlatformBox, {
      props: {
        title: 'Title',
        description: 'Description',
        platforms: [],
        value: 'foo',
      },
    });

    const input = wrapper.find('input[id=foo]');
    const label = wrapper.find('label[for=foo]');

    expect(input.exists()).toBe(true);
    expect(label.exists()).toBe(true);

    const texts = wrapper.findAll('p');

    expect(texts[0].text()).toBe('Title');
    expect(texts[1].text()).toBe('Description');
    expect(texts[0].classes()).not.toContain('text-primary-dark');
    expect(texts[1].classes()).not.toContain('text-primary-light');

    await input.setValue(true);

    expect(wrapper.emitted()).toHaveProperty('update:platforms');
    expect(wrapper.emitted()['update:platforms'].flat(2)).toContain('foo');
  });

  it('should handle check to uncheck behavior', async () => {
    const wrapper = mount(PlatformBox, {
      props: {
        title: 'Title',
        description: 'Description',
        platforms: ['foo'],
        value: 'foo',
      },
    });

    const input = wrapper.find('input[id=foo]');
    const label = wrapper.find('label[for=foo]');

    expect(input.exists()).toBe(true);
    expect(label.exists()).toBe(true);

    const texts = wrapper.findAll('p');

    expect(texts[0].text()).toBe('Title');
    expect(texts[1].text()).toBe('Description');
    expect(texts[0].classes()).toContain('text-primary-dark');
    expect(texts[1].classes()).toContain('text-primary-light');

    await input.setValue(false);

    expect(wrapper.emitted()).toHaveProperty('update:platforms');
    expect(wrapper.emitted()['update:platforms'].flat(2)).toHaveLength(0);
  });
});
