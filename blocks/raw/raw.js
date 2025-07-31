import { readBlockConfig } from '../../scripts/aem.js';

// DOMPurify must be installed via npm then copied into the scripts directory.
// This must be regularly updated https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html
import DOMPurify from '../../scripts/purify.es.mjs';

export default function decorate(block) {
  const config = readBlockConfig(block);
  let html = config['raw-richtext'] ?? [];
  html = html.join('');
  block.innerHTML = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'b', 'i', 'em', 'strong', 'u',
      'p', 'br', 'ul', 'ol', 'li',
      'a', 'span', 'div', 'blockquote',
      'code', 'pre',
    ],
    ALLOWED_ATTR: [
      'href', 'title', 'target', 'rel',
    ],
  });
}
