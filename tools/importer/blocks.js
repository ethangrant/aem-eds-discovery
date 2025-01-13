
export function createBannerBlock(variant, desktopImage, mobileImage, desktopImageAlt, mobileImageAlt, title, description, buttons) {
  const cells = [
    [getBlockNameWithVariant('banner', variant)],
    [[desktopImage, mobileImage]],
    [[title, description, buttons]],
  ];

  return WebImporter.DOMUtils.createTable(cells, document);
}

export function createHeroTitleBlock(variant = 'rsm-green-bg', title = '', secondaryText = '') {
  const cells = [
    [getBlockNameWithVariant('hero-heading', variant)],
    [title],
    [secondaryText],
  ];

  return WebImporter.DOMUtils.createTable(cells, document);
}

function getBlockNameWithVariant(blockName = '', variant = '') {
  if (variant) {
    return `${blockName} (${variant})`;
  }

  return blockName;
}