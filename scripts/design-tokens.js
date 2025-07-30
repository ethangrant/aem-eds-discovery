/**
 * Extract design tokens from a block configuration.
 * @param {HTMLElement} block - The block element to extract tokens from.
 * @returns {Array<string>} - The extracted design tokens.
 */
export function extractDesignTokens(block) {
  const designTokens = [...block.children].find((div) => div.textContent.includes('--tokens--'));

  if (!designTokens) {
    return [];
  }

  const regex = /--([\w-]+):\s*([^;]+);/g;
  const tokens = [];
  let match;

  while ((match = regex.exec(designTokens.innerText)) !== null) {
    const [, key, value] = match;
    tokens.push(`--${key}: ${value.trim()}`);
  }

  designTokens.remove();

  return tokens;
}

/**
 * Apply design tokens to a block element.
 * @param {HTMLElement} block - The block element to style.
 * @param {Array<string>} designTokens - The design tokens to apply.
 */
export function applyDesignTokens(block, designTokens) {
  designTokens.forEach((token) => {
    const [property, value] = token.split(':');
    block.style.setProperty(property.trim(), value.trim());
  });
}
