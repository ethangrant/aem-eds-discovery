function getBlockNameWithVariant(blockName = '', variant = '') {
  if (variant) {
    return `${blockName} (${variant})`;
  }

  return blockName;
}

export function createBannerBlock(
  variant,
  desktopImage,
  mobileImage,
  title,
  description,
  buttons,
) {
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

const transformer = {
  transform: (element) => {

  },

  parse: (element) => {
    let bannerTitle = '';
    let bannerImage = '';
    let mobileBannerImage = '';

    bannerImage = element.querySelector('picture img');
    bannerImage.alt = 'test';

    bannerTitle = element.querySelector('.hero-title h1');

    mobileBannerImage = bannerImage.cloneNode(true);
    mobileBannerImage.alt = 'mobile image';

    return {
      desktopImage: bannerImage,
      mobileImage: mobileBannerImage,
      title: bannerTitle,
    };
  },

  createBannerBlock: (
    variant,
    desktopImage,
    mobileImage,
    title,
    description,
    buttons,
  ) => {
    const cells = [
      [getBlockNameWithVariant('banner', variant)],
      [[desktopImage, mobileImage]],
      [[title, description, buttons]],
    ];

    return WebImporter.DOMUtils.createTable(cells, document);
  }
}