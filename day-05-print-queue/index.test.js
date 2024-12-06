//@ts-check

const {
  createOrderingTable,
  isUpdateInRightOrder,
  getMiddlePageNumber,
  getSumPrintedMiddlePages
} = require('./index.js');

describe('createOrderingTable', () => {
  it('creates ordering table', () => {
    const rules = [[1,2], [3,4]];
    const orderingTable = createOrderingTable(rules);
    expect(orderingTable['1']).not.toBe(undefined);
    expect(orderingTable['1'].comesBefore.has(2));
    expect(orderingTable['4'].comesAfter.has(3));
  });
});

describe('isUpdateInRightOrder', () => {
  let orderingRules;
  let orderingTable;
  beforeEach(() => {
    orderingRules = [
      [ 47, 53 ], [ 97, 13 ],
      [ 97, 61 ], [ 97, 47 ],
      [ 75, 29 ], [ 61, 13 ],
      [ 75, 53 ], [ 29, 13 ],
      [ 97, 29 ], [ 53, 29 ],
      [ 61, 53 ], [ 97, 53 ],
      [ 61, 29 ], [ 47, 13 ],
      [ 75, 47 ], [ 97, 75 ],
      [ 47, 61 ], [ 75, 61 ],
      [ 47, 29 ], [ 75, 13 ],
      [ 53, 13 ]
    ];
    orderingTable = createOrderingTable(orderingRules);
  });

  it('returns true if update is in right order - #1', () => {
    const update = [75,47,61,53,29];
    const validUpdate = isUpdateInRightOrder(update, orderingTable);
    expect(validUpdate).toBe(true);
  });
  it('returns true if update is in right order - #2', () => {
    const update = [97,61,53,29,13];
    const validUpdate = isUpdateInRightOrder(update, orderingTable);
    expect(validUpdate).toBe(true);
  });
  it('returns true if update is in right order - #3', () => {
    const update = [75,29,13];
    const validUpdate = isUpdateInRightOrder(update, orderingTable);
    expect(validUpdate).toBe(true);
  });
  it('returns false if update is not in right order - #1', () => {
    const update = [75,97,47,61,53];
    const validUpdate = isUpdateInRightOrder(update, orderingTable);
    expect(validUpdate).toBe(false);
  });
  it('returns false if update is not in right order - #1', () => {
    const update = [61,13,29];
    const validUpdate = isUpdateInRightOrder(update, orderingTable);
    expect(validUpdate).toBe(false);
  });
  it('returns false if update is not in right order - #1', () => {
    const update = [97,13,75,29,47];
    const validUpdate = isUpdateInRightOrder(update, orderingTable);
    expect(validUpdate).toBe(false);
  });
});

describe('getMiddlePageNumber', () => {
  it('should return middle page number of odd pages', () => {
    const pages = [75,47,61,53,29]
    const middlePageNumber = getMiddlePageNumber(pages);
    expect(middlePageNumber).toBe(61);
  });
});

describe('getSumPrintedMiddlePages', () => {
  let orderingRules;
  beforeEach(() => {
    orderingRules = [
      [ 47, 53 ], [ 97, 13 ],
      [ 97, 61 ], [ 97, 47 ],
      [ 75, 29 ], [ 61, 13 ],
      [ 75, 53 ], [ 29, 13 ],
      [ 97, 29 ], [ 53, 29 ],
      [ 61, 53 ], [ 97, 53 ],
      [ 61, 29 ], [ 47, 13 ],
      [ 75, 47 ], [ 97, 75 ],
      [ 47, 61 ], [ 75, 61 ],
      [ 47, 29 ], [ 75, 13 ],
      [ 53, 13 ]
    ];
  });

  it('should return correct sum for provided example', () => {
    const updates = [
      [ 75, 47, 61, 53, 29 ],
      [ 97, 61, 53, 29, 13 ],
      [ 75, 29, 13 ],
      [ 75, 97, 47, 61, 53 ],
      [ 61, 13, 29 ],
      [ 97, 13, 75, 29, 47 ]
    ];
    const sumPrintedMiddlePages = getSumPrintedMiddlePages(updates,orderingRules);
    expect(sumPrintedMiddlePages).toBe(143);
  });
});
