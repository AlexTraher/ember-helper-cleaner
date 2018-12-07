import assert from 'assert';
import { describe, it } from 'mocha';
import { 
  getHelpers,
  getUnusedHelpers,
  processMustacheOrSubStatement,
} from '../src/helper-finder';
import path from 'path';

describe('Finding unused Helpers', function() {
  
  const pathName = path.resolve(__dirname, 'dummy');

  it('should get a list of unused helpers from the app', function() {
    const helperCount = getUnusedHelpers(pathName, false);
    
    assert.deepStrictEqual(helperCount, {
      addonUnused: 0,
      addonUsed: 1,
      appUsed: 1,
      used: 2,
      unused: 0,
      usedInComponent: 1,
      nestHelper: 1,
    });
  });

  it('should generate a list of helpers from a file path', function() {
    const helperCountShell = getHelpers(pathName);

    assert.deepStrictEqual(helperCountShell, {
      addonUnused: 0,
      addonUsed: 0,
      appUsed: 0,
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

  it('should find helpers in in-repo-addons successfully', function() {
    const helperCount = getUnusedHelpers(pathName, false);

    assert.strictEqual(helperCount.addonUnused, 0);
    assert.strictEqual(helperCount.addonUsed, 1);
    assert.strictEqual(helperCount.appUsed, 1);
  });

});
