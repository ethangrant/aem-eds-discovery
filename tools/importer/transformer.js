/**
 * Base class for all transformers. Can't use interfaces in vanilla js
 * So implementation of the transform method is forced through throwing an error.
 */
export default class Transformer {
  constructor(domUtils) {
    this.domUtils = domUtils;
  }

  static transform(element) {
    throw new Error('Transformer should implement a transform method');
  }

  static getBlockNameWithVariant(blockName = '', variant = '') {
    if (variant) {
      return `${blockName} (${variant})`;
    }
    return blockName;
  }
}
