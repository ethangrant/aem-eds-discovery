import { buildBlock, decorateBlock, loadBlock } from "./aem.js";

export async function loadStyleGuide(doc) {
  const styleGuideBlock = buildBlock('styleguide', '');
  document.querySelector('main').append(styleGuideBlock);
  decorateBlock(styleGuideBlock);

  return loadBlock(styleGuideBlock);
}