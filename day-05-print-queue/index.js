//@ts-check

class OrderRule {
  constructor() {
    this.comesBefore = new Set()
  }
}

/**
 * Creates Ordering Table from array of order rules
 * 
 * @param {Array} rules - list of page ordering rules
 * 
 * @returns {Object} - ordering table
 */
const createOrderingTable = rules => {
  const orderingTable = {};

  for (const rule of rules) {
    const X = rule[0];
    const Y = rule[1];
    if (!orderingTable[X])
      orderingTable[X] = new OrderRule();
    if (!orderingTable[Y])
      orderingTable[Y] = new OrderRule();
    orderingTable[X].comesBefore.add(Y);
  }

  return orderingTable;
}

/**
 * Check if update is in correct order
 * 
 * @param {number[]} update 
 * @param {Object} orderingTable 
 * 
 * @returns {boolean} - whether update is in right order or not
 */
const isUpdateInRightOrder = (update, orderingTable) => {
  let orderedPages = new Set();
  let isCorrectOrder = true;

  for (const page of update) {
    const validOrderedPages = orderingTable[page].comesBefore.isDisjointFrom(orderedPages);
    if (!validOrderedPages) {
      isCorrectOrder = false;
      break;
    }
    orderedPages.add(Number(page));
  }

  return isCorrectOrder;
}

/**
   * Gets the middle page number of an update
   * 
   * @param {number[]} pages - an update
   * 
   * @returns {number} - the middle page number
   */
const getMiddlePageNumber = pages => {
  const middleIndex = Math.floor(pages.length/2);
  return pages[middleIndex];
}

/**
 * Sum up middle pages for valid updates
 * 
 * @param {number[][]} updates - list of updates
 * @param {number[][]} orderingRules - list of ordering rules
 * 
 * @returns {number} - sum of valid middle pages
 */
const getSumPrintedMiddlePages = (updates, orderingRules) => {
  const orderingTable = createOrderingTable(orderingRules);
  let sumValidMiddlePages = 0;
  updates.forEach(update => {
    const isValid = isUpdateInRightOrder(update, orderingTable);
    if (isValid) {
      sumValidMiddlePages += getMiddlePageNumber(update);
    };
  });
  return sumValidMiddlePages;
};

/**
 * Fix update if it's not in correct order
 * 
 * @param {number[]} update - list of pages
 * @param {Object} orderingTable - ordering table
 * 
 * @returns {number[]} - update in correct order
 */
const getUpdateCorrectOrder = (update, orderingTable) => {
  let orderedPages = new Set();

  for (const page of update) {
    const outOfOrder = orderingTable[page].comesBefore.intersection(orderedPages);
    let organised = new Set();
    if(outOfOrder.size !== 0) {
      // @ts-ignore
      orderedPages = orderedPages.difference(outOfOrder).add(page);
      for (const outOfOrderPage of outOfOrder.values()) {
        const disOrganised = orderingTable[outOfOrderPage].comesBefore.intersection(organised);
        if (disOrganised.size !== 0) {
          // @ts-ignore
          organised = organised.difference(disOrganised).add(outOfOrderPage).union(disOrganised);
        } else {
          organised.add(outOfOrderPage);
        }
      }
      // @ts-ignore
      orderedPages = orderedPages.union(organised);
    } else {
      orderedPages.add(page);
    }  
  }
  return [...orderedPages];
}

/**
 * Sum up all the middle numbers of the wrongly ordered
 * updates after ordering them correctly
 * 
 * @param {number[][]} updates - list of updates
 * @param {number[][]} orderingRules - list of ordering rules
 * @returns {number} - sum of corrected middle pages
 */
const getSumCorrectedMiddlePages = (updates, orderingRules) => {
  const orderingTable = createOrderingTable(orderingRules);

  let sumCorrectedMiddlePages = 0;
  for (const update of updates) {
    const isValidUpdate = isUpdateInRightOrder(update, orderingTable);
    if (isValidUpdate) continue;
    const correctedUpdate = getUpdateCorrectOrder(update, orderingTable);
    sumCorrectedMiddlePages += getMiddlePageNumber(correctedUpdate);
  }
  return sumCorrectedMiddlePages;
}

module.exports = {
  createOrderingTable,
  isUpdateInRightOrder,
  getMiddlePageNumber,
  getSumPrintedMiddlePages,
  getUpdateCorrectOrder,
  getSumCorrectedMiddlePages
}
