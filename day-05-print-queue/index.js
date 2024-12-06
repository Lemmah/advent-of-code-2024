//@ts-check

class OrderRule {
  constructor() {
    this.comesBefore = new Set()
    this.comesAfter = new Set()
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
    if (!orderingTable[X]) {
      orderingTable[X] = new OrderRule();
    }
    if (!orderingTable[Y]) {
      orderingTable[Y] = new OrderRule();
    }
    orderingTable[X].comesBefore.add(Y);
    orderingTable[Y].comesAfter.add(X);
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
    const pagesOutOfOrder = orderingTable[page].comesBefore.intersection(orderedPages);
    if (pagesOutOfOrder.size !== 0) {
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

module.exports = {
  createOrderingTable,
  isUpdateInRightOrder,
  getMiddlePageNumber,
  getSumPrintedMiddlePages
}
