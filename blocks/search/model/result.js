/**
 * Calculate total number of pages.
 * @param {int} pageSize
 * @param {int} itemCount
 * @returns {int}
 */
function getPageCount(itemCount, pageSize = 10) {
  return Math.ceil(itemCount / pageSize);
}

/**
 * Slice item array based on current page & page size.
 * @param {array} items
 * @param {int} currentPage
 * @param {int} pageSize
 * @returns {array}
 */
function paginateItems(items, currentPage, pageSize) {
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return items.slice(startIndex, endIndex);
}

/**
 * Returns a result object to pass to rendering.
 * @param {Array} data
 * @param {int} currentPageNumber
 * @param {int} pageSize
 * @returns {object}
 */
export default function getSearchResult(data, currentPageNumber, pageSize = 10) {
  const slicedItems = paginateItems(data, currentPageNumber, pageSize);
  return {
    items: slicedItems,
    itemCount: data.length,
    currentPage: currentPageNumber,
    pageCount: getPageCount(data.length, pageSize),
    filters: [
      {
        label: 'test filter',
        count: 5,
      },
    ],
  };
}
