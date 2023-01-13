import { render } from './helper';
import { SmartGalleyCartFrontend } from '../src/smart-galley-cart-frontend';

describe('smart-galley-cart-frontend', () => {
  it('should render message', async () => {
    const node = (await render('<smart-galley-cart-frontend></smart-galley-cart-frontend>', SmartGalleyCartFrontend)).firstElementChild;
    const text =  node.textContent;
    expect(text.trim()).toBe('The doors are currently');
  });
});
