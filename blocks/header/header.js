import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

// media query match that indicates mobile/tablet width
const isDesktop = window.matchMedia('(min-width: 900px)');

function closeOnEscape(e) {
  if (e.code === 'Escape') {
    const nav = document.getElementById('nav');
    const navSections = nav.querySelector('.nav-sections');
    const navSectionExpanded = navSections.querySelector('[aria-expanded="true"]');
    if (navSectionExpanded && isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleAllNavSections(navSections);
      navSectionExpanded.focus();
    } else if (!isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleMenu(nav, navSections);
      nav.querySelector('button').focus();
    }
  }
}

function closeOnFocusLost(e) {
  const nav = e.currentTarget;
  if (!nav.contains(e.relatedTarget)) {
    const navSections = nav.querySelector('.nav-sections');
    const navSectionExpanded = navSections.querySelector('[aria-expanded="true"]');
    if (navSectionExpanded && isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleAllNavSections(navSections, false);
    } else if (!isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleMenu(nav, navSections, false);
    }
  }
}

function openOnKeydown(e) {
  const focused = document.activeElement;
  const isNavDrop = focused.className === 'nav-drop';
  if (isNavDrop && (e.code === 'Enter' || e.code === 'Space')) {
    const dropExpanded = focused.getAttribute('aria-expanded') === 'true';
    // eslint-disable-next-line no-use-before-define
    toggleAllNavSections(focused.closest('.nav-sections'));
    focused.setAttribute('aria-expanded', dropExpanded ? 'false' : 'true');
  }
}

function focusNavSection() {
  document.activeElement.addEventListener('keydown', openOnKeydown);
}

/**
 * Toggles all nav sections
 * @param {Element} sections The container element
 * @param {Boolean} expanded Whether the element should be expanded or collapsed
 */
function toggleAllNavSections(sections, expanded = false) {
  sections.querySelectorAll('.nav-sections .default-content-wrapper > ul > li').forEach((section) => {
    section.setAttribute('aria-expanded', expanded);
  });
}

/**
 * Toggles the entire nav
 * @param {Element} nav The container element
 * @param {Element} navSections The nav sections within the container element
 * @param {*} forceExpanded Optional param to force nav expand behavior when not null
 */
function toggleMenu(nav, navSections, forceExpanded = null) {
  const expanded = forceExpanded !== null ? !forceExpanded : nav.getAttribute('aria-expanded') === 'true';
  const button = nav.querySelector('.nav-hamburger button');
  document.body.style.overflowY = (expanded || isDesktop.matches) ? '' : 'hidden';
  nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  toggleAllNavSections(navSections, expanded || isDesktop.matches ? 'false' : 'true');
  button.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  // enable nav dropdown keyboard accessibility
  const navDrops = navSections.querySelectorAll('.nav-drop');
  if (isDesktop.matches) {
    navDrops.forEach((drop) => {
      if (!drop.hasAttribute('tabindex')) {
        drop.setAttribute('tabindex', 0);
        drop.addEventListener('focus', focusNavSection);
      }
    });
  } else {
    navDrops.forEach((drop) => {
      drop.removeAttribute('tabindex');
      drop.removeEventListener('focus', focusNavSection);
    });
  }

  // enable menu collapse on escape keypress
  if (!expanded || isDesktop.matches) {
    // collapse menu on escape press
    window.addEventListener('keydown', closeOnEscape);
    // collapse menu on focus lost
    nav.addEventListener('focusout', closeOnFocusLost);
  } else {
    window.removeEventListener('keydown', closeOnEscape);
    nav.removeEventListener('focusout', closeOnFocusLost);
  }
}

/**
 * loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // load nav as fragment
  const navMeta = getMetadata('nav');
  // const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const menuPath = navMeta ? new URL(navMeta, window.location).pathname : '/menu-block-test';
  // const fragment = await loadFragment(navPath);
  const menuFragment = await loadFragment(menuPath);
  const nav = document.createElement('nav');
  const navbar = document.createElement('ul');
  nav.id = 'nav';
  navbar.classList = ['navbar-nav'];

  const menuBlockChildren = menuFragment.querySelectorAll('.menu.block > div');

  // Remove default EDS button markup.
  const menuButtons = menuFragment.querySelectorAll('p > a, strong > a');
  menuButtons.forEach((anchor) => {
    anchor.classList = '';
    const parent = anchor.parentElement;
    parent.replaceWith(anchor);
  });

  menuBlockChildren.forEach((menuItem) => {
    const navItem = document.createElement('li');
    const topLevelLink = menuItem.firstElementChild.querySelector('a');

    navItem.classList = 'nav-item dropdown';
    menuItem.classList = 'dropdown-menu';
    menuItem.children[0].classList = 'hidden';
    menuItem.children[1].classList = 'dropdown-tab-nav';
    menuItem.children[2].classList = 'dropdown-tab-content';
    menuItem.children[3].classList = 'dropdown-tab-card';

    const subCategories = menuItem.querySelectorAll('.dropdown-tab-nav > ul > li');

    subCategories.forEach((categories) => {
      const levelTwoLink = categories.firstElementChild;

      // used to map which third level categories should be visible
      const mapId = levelTwoLink.innerText.replaceAll(' ', '-').toLowerCase();

      // move third level cats into content section
      const thirdLevelCats = categories.querySelector('ul');
      thirdLevelCats.id = `dropdown-tab-${mapId}`;
      menuItem.querySelector('.dropdown-tab-content').append(thirdLevelCats);
    });

    navItem.append(topLevelLink);
    navItem.append(menuItem);
    navbar.append(navItem);
  });

  // Find all li tags and apply appropriate level class
  // navbar.append(menuFragment);
  // test comment
  nav.append(navbar);

  block.append(nav);
}
