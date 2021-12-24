import { imagedataToSVG } from 'imagetracerjs';
import { optimize } from 'svgo/dist/svgo.browser.js';

self.addEventListener('message', (event) => {
  const imgData = event.data.img;

  const svg = imagedataToSVG(imgData);
  const { data } = optimize(svg);

  self.postMessage({
    result: data,
  });
});
