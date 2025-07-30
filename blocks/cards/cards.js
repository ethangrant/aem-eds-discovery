import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function extractDesignTokens(block) {
  const designTokens = [...block.children].find((div) => div.textContent.includes('--tokens--'));

  if (!designTokens) {
    return [];
  }
  console.log(designTokens);

  const regex = /--([\w-]+):\s*([^;]+);/g;
  const tokens = [];
  let match;

  while ((match = regex.exec(designTokens.innerText)) !== null) {
    const [_, key, value] = match;
    tokens.push(`--${key}: ${value.trim()}`);
  }

  designTokens.remove();

  return tokens;
}

export default function decorate(block) {
  const designTokens = extractDesignTokens(block);
  debugger;
  designTokens.forEach((token) => {
    const [property, value] = token.split(':');
    block.style.setProperty(property.trim(), value.trim());
  });
  /* change to ul, li */
  const ul = document.createElement('ul');
  ul.className = 'card-container grid-row';
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.className = 'card col-span-4 md-col-span-3';
    moveInstrumentation(row, li);
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'card__image';
      else div.className = 'card__body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
  block.textContent = '';
  block.append(ul);
}
