'use strict';
const expect = require('chai').expect;
const grabExtendingPreSnippets = require('../src/grabExtendingPreSnippets');

describe('grabExtendingPreSnippets', () => {
  it('exists as a function', function () {
    expect(typeof grabExtendingPreSnippets).to.equal('function');
  });

  it(`returns the pre snippet selected + extending snippets`, function () {
    let mockSnippetList = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
    let output = [['a', 'b', 'c'], ['e', 'f', 'g']];
    let indexSelected = 3;
    expect(grabExtendingPreSnippets(mockSnippetList, indexSelected)).to.deep.equal(output);
  });

  it(`returns none on left if at beginning`, function () {
    let mockSnippetList = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
    let output = [[], ['b', 'c', 'd']];
    let indexSelected = 0;
    expect(grabExtendingPreSnippets(mockSnippetList, indexSelected)).to.deep.equal(output);
  });

  it(`returns none on right if at end`, function () {
    let mockSnippetList = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
    let output = [['f', 'g', 'h'], []];
    let indexSelected = mockSnippetList.length - 1;
    expect(grabExtendingPreSnippets(mockSnippetList, indexSelected)).to.deep.equal(output);
  });

  it(`custom # to grab up to on sides (left side falls short)`, function () {
    let mockSnippetList = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
    let output = [['a'], ['c', 'd', 'e', 'f', 'g']];
    let indexSelected = 1;
    let quantityToGrabOnSides = 5;
    expect(grabExtendingPreSnippets(mockSnippetList, indexSelected, quantityToGrabOnSides)).to.deep.equal(output);
  });

  it(`custom # to grab up to on sides (right side falls short)`, function () {
    let mockSnippetList = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
    let output = [['a', 'b', 'c', 'd', 'e'], ['g', 'h', 'i']];
    let indexSelected = 5;
    let quantityToGrabOnSides = 5;
    expect(grabExtendingPreSnippets(mockSnippetList, indexSelected, quantityToGrabOnSides)).to.deep.equal(output);
  });


});//end describe('grabExtendingPreSnippets'