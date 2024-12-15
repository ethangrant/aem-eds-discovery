/**
 * Create search item element.
 * @param {string} title
 * @param {string} path
 * @param {string} desc
 * @returns {HTMLLIElement}
 */
export function searchResultItem(title, path, desc) {
  const itemElement = document.createElement('li');
  const link = document.createElement('a');
  const description = document.createElement('p');

  link.href = path;
  link.innerText = title;
  description.innerText = desc;

  itemElement.append(link, description);

  return itemElement;
}

/**
 * Create search result list.
 * @param {array} items
 * @returns {HTMLElement}
 */
export function searchResultListing(items) {
  const container = document.createElement('ul');
  container.classList = 'listing';

  items.forEach((searchItem) => {
    container.append(searchResultItem(searchItem.title, searchItem.path, searchItem.description));
  });

  return container;
}

/**
 * Creates container element for SRLP.
 * @param {string} containerTag
 * @returns {HTMLElement}
 */
export function searchResultsPageContainer(containerTag = 'section') {
  const searchContiner = document.createElement(containerTag);
  searchContiner.classList = 'search-results-container';

  return searchContiner;
}

/**
 * Takes current page URL and added the page number query.
 * @param {int} pageNumber
 * @returns {string}
 */
function getPageUrl(pageNumber) {
  const url = new URL(window.location.href);
  url.searchParams.set('p', pageNumber);

  return url.toString();
}

/**
 * Creates pagination element for SRLP.
 * @param {int} currentPage
 * @param {int} totalItems
 * @return {HTMLElement}
 */
export function pagination(totalPages, currentPage, totalItems) {
  const paginationContainer = document.createElement('div');
  const nextPageElement = document.createElement('a');
  const previousPageElement = document.createElement('a');
  const itemCountElement = document.createElement('span');

  if (totalPages > 1 && currentPage !== totalPages) {
    nextPageElement.href = getPageUrl(currentPage + 1);
    nextPageElement.classList = 'next';
    nextPageElement.innerText = 'Next';
  }

  previousPageElement.style = 'display:none';
  if (currentPage > 1) {
    previousPageElement.style = '';
    previousPageElement.href = getPageUrl(currentPage - 1);
    previousPageElement.classList = 'previous';
    previousPageElement.innerText = 'Previous';
  }

  // @TODO populate this.
  itemCountElement.innerText = '';

  paginationContainer.append(previousPageElement, itemCountElement, nextPageElement);

  return paginationContainer;
}

/**
 * Create filter item element.
 * @param {string} label
 * @param {int} count
 * @returns {HTMLLIElement}
 */
export function filterItem(label, count) {
  const itemElement = document.createElement('li');
  const labelElement = document.createElement('p');
  const countElement = document.createElement('p');

  labelElement.innerText = label;
  countElement.innerText = `(${count})`;
  itemElement.append(labelElement, countElement);

  return itemElement;
}

/**
 * Creates filter element for use on SRLP.
 * @param {array} filters
 * @returns {HTMLElement}
 */
export function searchFilters(filters) {
  const filtersContainer = document.createElement('div');
  filtersContainer.classList = 'filters-container';

  filters.forEach((item) => {
    filtersContainer.append(filterItem(item.label, item.count));
  });

  return filtersContainer;
}

/**
 * Builds SRLP and appends to selected element on the page.
 * @param {string} appendTo
 * @param {object} searchResult
 * @returns {void}
 */
export function buildSearchResults(searchResult, appendTo = 'main') {
  if (!searchResult) {
    return;
  }

  const appendToElement = document.querySelector(appendTo);
  const container = searchResultsPageContainer();
  const listing = searchResultListing(searchResult.items);
  const paging = pagination(
    searchResult.pageCount,
    searchResult.currentPage,
    searchResult.itemCount,
  );
  const filters = searchFilters(searchResult.filters);
  const containerClass = container.classList;

  if (document.querySelector(`.${containerClass}`)) {
    return;
  }

  container.append(listing, paging, filters);

  if (appendToElement) {
    appendToElement.append(container);
  }
}
