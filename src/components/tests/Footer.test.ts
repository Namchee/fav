import { mount } from '@vue/test-utils';

import Footer from '@/components/Footer.vue';

describe('<Footer>', () => {
  it('should render a footer', () => {
    const wrapper = mount(Footer);
    const links = wrapper.findAll('a');

    expect(wrapper.find('footer').exists()).toBe(true);
    expect(links.length).toBe(3);
    expect(links[0].text()).toBe('this blogpost');
    expect(links[1].text()).toBe('Evil Martians');
    expect(links[2].text()).toBe('Namchee');
    expect(
      links.every((l) => l.attributes('rel') === 'noreferrer noopener'),
    ).toBe(true);
  });
});
