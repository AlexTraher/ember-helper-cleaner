const assert = require('assert');
const { describe, it } = require('mocha');
const emberHelperCleaner = require('../index');
const path = require('path');

describe('Finding unused Helpers', function() {
  
  it('should get a list of unused helpers from the app', function() {
    const helperCount = emberHelperCleaner(path.resolve(__dirname, 'dummy'));
    
    assert.deepStrictEqual(helperCount, {
      used: 2,
      unused: 0,
      usedInComponent: 1,
      nestHelper: 1,
    });
  });
});
