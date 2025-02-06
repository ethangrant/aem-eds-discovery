import Transformer from '../transformer.js';

export default class BannerTransformer extends Transformer {
  transform(element) {
    const data = BannerTransformer.parse(element);
    return this.createBannerBlock(
      '',
      data.desktopImage,
      data.mobileImage,
      data.title,
      '',
      '',
    );
  }

  static parse(element) {
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
  }

  createBannerBlock(
    variant,
    desktopImage,
    mobileImage,
    title,
    description,
    buttons,
  ) {
    const cells = [
      [Transformer.getBlockNameWithVariant('banner', variant)],
      [[desktopImage, mobileImage]],
      [[title, description, buttons]],
    ];

    return this.domUtils.createTable(cells, document);
  }
}
