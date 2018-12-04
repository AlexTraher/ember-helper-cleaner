const assert = require('assert');
const { describe, it } = require('mocha');
const { 
  getHelpers,
  getUnusedHelpers,
  processMustacheOrSubStatement,
} = require('../dist/index');
const path = require('path');

describe('Finding unused Helpers', function() {
  
  const pathName = path.resolve(__dirname, 'dummy');

  it('should get a list of unused helpers from the app', function() {
    const helperCount = getUnusedHelpers(pathName);
    
    assert.deepStrictEqual(helperCount, {
      used: 2,
      unused: 0,
      usedInComponent: 1,
      nestHelper: 1,
    });
  });

  it('should generate a list of helpers from a file path', function() {
    const helperCountShell = getHelpers(pathName);

    assert.deepStrictEqual(helperCountShell, {
      used: 0,
      unused: 0,
      usedInComponent: 0,
      nestHelper: 0,
    });
  });

  [
    { original: 'not-found-helper', shouldFind: false, expectedHelperCount: { foundHelper: 0 } },
    { original: 'found-helper', shouldFind: true, expectedHelperCount: { foundHelper: 1 } },
  ].forEach(({ original, shouldFind, expectedHelperCount }) => {
    it(`should ${shouldFind ? '' : 'not '}find ${original} helper`, function() {
      const nodeStub = { path: { original } };

      const helperCountStub = {
        foundHelper: 0,
      }

      processMustacheOrSubStatement(nodeStub, helperCountStub);

      assert.deepStrictEqual(helperCountStub, expectedHelperCount);
    });
  });

  

});
