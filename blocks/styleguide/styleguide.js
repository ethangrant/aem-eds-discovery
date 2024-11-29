import { loadFragment } from '../fragment/fragment.js';
import decoratePrimaryColours from './decorators/primary-colours.js';

export default async function decorate(block) {
  const primaryColours = await loadFragment('/style-guide/primary-colours');

  decoratePrimaryColours(primaryColours);

  block.append(primaryColours);

  // each section of the style guide would be its own fragement.
  // in this file we load each fragment then pass it through its own decorate method for styling
}
