/*
 * Copyright 2023 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* global WebImporter */
/* eslint-disable no-console, class-methods-use-this */

export default {

  preprocess: async ({ document, url, html, params }) => {
    // Dynamic import is used as static import in this file breaks the custom import process.
    if (!WebImporter.BlockUtils) {
      WebImporter.BlockUtils = await import('./blocks.js');
    }
  },

  /**
   * Apply DOM operations to the provided document and return
   * the root element to be then transformed to Markdown.
   * @param {HTMLDocument} document The document
   * @param {string} url The url of the page imported
   * @param {string} html The raw html (the document is cleaned up during preprocessing)
   * @param {object} params Object containing some parameters given by the import process.
   * @returns {HTMLElement} The root element to be transformed
   */
  transformDOM: ({
    // eslint-disable-next-line no-unused-vars
    document, url, html, params,
  }) => {
    // define the main element: the one that will be transformed to Markdown
    const main = document.body;

    // attempt to remove non-content elements
    WebImporter.DOMUtils.remove(main, [
      'header',
      '.header',
      'nav',
      '.nav',
      'footer',
      '.footer',
      'iframe',
      'noscript',
    ]);

    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
    WebImporter.rules.convertIcons(main, document);

    // function getBlockNameWithVariant(blockName = '', variant = '') {
    //   if (variant) {
    //     return `${blockName} (${variant})`;
    //   }
    //
    //   return blockName;
    // }
    //
    // function createBannerBlock(variant, desktopImage, mobileImage, desktopImageAlt, mobileImageAlt, title, description, buttons) {
    //   const cells = [
    //     [getBlockNameWithVariant('banner', variant)],
    //     [[desktopImage, mobileImage]],
    //     [[title, description, buttons]],
    //   ];
    //
    //   return WebImporter.DOMUtils.createTable(cells, document);
    // }

    let bannerEl = main.querySelector('.hero-landing');
    let bannerTitle = '';
    let bannerImage = '';
    let mobileImage = '';

    bannerImage = bannerEl.querySelector('picture img');
    bannerImage.alt = 'test';

    bannerTitle = bannerEl.querySelector('.hero-title h1');

    mobileImage = bannerImage.cloneNode(true);
    mobileImage.alt = 'mobile image';

    let block = WebImporter.BlockUtils.createBannerBlock(
      '',
      bannerImage,
      '',
      'test alt',
      'test alt',
      bannerTitle,
      '',
      ''
    );

    main.prepend(block);
    //
    // const cells = [
    //   ['hero-heading (rsm-green-bg)'],
    //   ["<h1>this is a test title</h1>"],
    //   ["secondary text"],
    // ];
    //
    // const table = WebImporter.DOMUtils.createTable(cells, document);
    // main.append(table);

    return main;
  },

  /**
   * Return a path that describes the document being transformed (file name, nesting...).
   * The path is then used to create the corresponding Word document.
   * @param {HTMLDocument} document The document
   * @param {string} url The url of the page imported
   * @param {string} html The raw html (the document is cleaned up during preprocessing)
   * @param {object} params Object containing some parameters given by the import process.
   * @return {string} The path
   */
  generateDocumentPath: ({
    // eslint-disable-next-line no-unused-vars
    document, url, html, params,
  }) => {
    let p = new URL(url).pathname;
    if (p.endsWith('/')) {
      p = `${p}index`;
    }
    return decodeURIComponent(p)
      .toLowerCase()
      .replace(/\.html$/, '')
      .replace(/[^a-z0-9/]/gm, '-');
  },
};
