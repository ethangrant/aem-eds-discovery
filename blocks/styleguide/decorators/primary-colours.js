export default function decoratePrimaryColours(fragment) {
  const colourLists = fragment.querySelectorAll('ul');
  const cols = [];

  colourLists.forEach(colourList => {
    const colours = [];
    [...colourList.children].forEach((item) => {
      colours.push(getColourObject(item));
    });

    cols.push(colours);
    colourList.remove();
  });

  const domElement = generateDom(cols);
  fragment.firstElementChild.firstElementChild.append(domElement);
}

/**
 * Process each colour in the list and produce and object we can use to render the colours markup.
 * @param {HTMLUListElement} listItem 
 * @returns {}
 */
function getColourObject(listItem) {
  const value = listItem.innerText;
  let colour = value.split('-');
  colour = colour.map(part => part.trim());

  return {
    colourLabel: colour[0],
    class: colour[0].toLowerCase().replaceAll(' ', '-') + '-bg',
    hexCode: colour[1]
  }
}

/**
 * @param {Array} columns 
 * @returns {HTMLUListElement}
 */
function generateDom(columns) {
  const container = document.createElement('div');
  container.className = "primary-colours"

  columns.forEach((col, index) => {
    const ulElement = document.createElement('ul');
    ulElement.className = "col-" + (index + 1);

    col.forEach((colour) => {
      const liElement = document.createElement('li');
      const colourLabel = document.createElement('p');
      const colourBox = document.createElement('div');
      const hexLabel = document.createElement('p');
      const opacities = [80, 60, 40, 20];

      colourLabel.innerText = colour.colourLabel;
      hexLabel.innerText = colour.hexCode;
      colourBox.className = colour.class + " colour-box";

      const elements = [colourLabel, colourBox, hexLabel];
      elements.forEach(element => liElement.append(element))

      // only show opacities for the first column.
      if (index === 0) {
        const opacityContainer = document.createElement('div');
        opacityContainer.classList = 'opacity-container';
        opacities.forEach((opacity) => {
          const colourBoxSmall = document.createElement('div');
          colourBoxSmall.className = colour.class + " colour-box-small op-" + opacity;

          opacityContainer.append(colourBoxSmall);
        });

        liElement.append(opacityContainer);
      }

      ulElement.append(liElement);
    })

    container.append(ulElement);
  });

  return container;
}