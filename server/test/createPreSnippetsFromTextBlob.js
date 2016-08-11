
'use strict';
const expect = require('chai').expect;
let PreSnippet = require('../src/classes/PreSnippet.js');
let createPreSnippetsFromTextBlob = require('../src/createPreSnippetsFromTextBlob');
let cpsftb = createPreSnippetsFromTextBlob;
describe('!--createPreSnippetsFromTextBlob--!', () => {
  it('exists as a function', function () {
    expect(typeof cpsftb).to.equal('function');
  });

  // each alone
  // surrounded by single spaces
  // surrounded by new lines
  // surrounded by double new lines
  // one new line, one single space
  // all of above with speech follow
  // all above of speech with narration follow

  // describe(`narration definition -->`, () => {
  //   it(`alphanumeric values any case`, function () {
  //     let inp = `aBc1`;
  //     let out = [ new PreSnippet('aBc1', 'narration') ];
  //     expect(cpsftb(inp)).to.deep.equal(out);
  //   });
  //
  //   it(`can have spaces on the insides`, function () {
  //     let inp = `ABC 123`;
  //     let out = [ new PreSnippet('ABC 123', 'narration') ];
  //     expect(cpsftb(inp)).to.deep.equal(out);
  //   });
  //
  //   it(`can include any punctuation except for speech quotes`, function () {
  //     let inp = `A-' .,?! “Hi”`;
  //     let out = [
  //       new PreSnippet(`A-'.,?!`, 'narration'),
  //       new PreSnippet(` `, 'whitespace'),
  //       new PreSnippet(`“Hi”`, 'speech'),
  //     ];
  //     expect(cpsftb(inp)).to.deep.equal(out);
  //   });
  // });//end narration definition -->

  // describe(`speech definition -->`, () => {
  //   it(`alphanumeric values any case`, function () {
  //     let inp = `“aBc1”`;
  //     let out = [ new PreSnippet('“aBc1”', 'speech') ];
  //     expect(cpsftb(inp)).to.deep.equal(out);
  //   });
  //
  //   it(`can have spaces on the insides`, function () {
  //     let inp = `“ABC 123 Z”`;
  //     let out = [ new PreSnippet('“ABC 123 Z”', 'speech') ];
  //     expect(cpsftb(inp)).to.deep.equal(out);
  //   });
  //
  //   it(`open quote then open quote (and keep single space for quote)`, function () {
  //     let inp = `“What “the”`;
  //     let out = [
  //       new PreSnippet(`“What `, 'parseError'),
  //       new PreSnippet(`“the”`, 'speech'),
  //     ];
  //     expect(cpsftb(inp)).to.deep.equal(out);
  //   });
  //
  //   it(`can't have new lines inside 1`, function () {
  //     let inp = `“What\nthe”`;
  //     let out = [
  //       new PreSnippet(`“What`, 'parseError'),
  //       new PreSnippet(`\n`, 'whitespace'),
  //       new PreSnippet(`the”`, 'parseError'),
  //     ];
  //     expect(cpsftb(inp)).to.deep.equal(out);
  //   });
  //   // console.log('cpsftb(inp)', cpsftb(inp));
  //
  //
  //   it(`can't have new lines inside 2`, function () {
  //     let inp = `“What\n“the”`;
  //     let out = [
  //       new PreSnippet(`“What`, 'parseError'),
  //       new PreSnippet(`\n`, 'whitespace'),
  //       new PreSnippet(`“the”`, 'speech'),
  //     ];
  //     expect(cpsftb(inp)).to.deep.equal(out);
  //   });
  //
  //   it(`can include any NON-speech quotes punctuation inside`, function () {
  //     let inp = `“HiA-' .,?!”`;
  //     let out = [
  //       new PreSnippet(`“HiA-' .,?!”`, 'speech'),
  //     ];
  //     expect(cpsftb(inp)).to.deep.equal(out);
  //   });
  //
  //   it(`can't have speech quotes inside 1`, function () {
  //     let inp = `“ABC “”`;
  //     let out = [
  //       new PreSnippet(`“ABC `, 'parseError'),
  //       new PreSnippet(`“”`, 'speech'),
  //     ];
  //     expect(cpsftb(inp)).to.deep.equal(out);
  //   });
  // });//end speech definition -->

  // describe(`white space definition -->`, () => {
  //   it(`single space`, function () {
  //     let inp = ` `;
  //     let out = [ new PreSnippet(` `, 'whitespace') ];
  //     expect(cpsftb(inp)).to.deep.equal(out);
  //   });
  //
  //   it(`double single space`, function () {
  //     let inp = `  `;
  //     let out = [ new PreSnippet(`  `, 'whitespace') ];
  //     expect(cpsftb(inp)).to.deep.equal(out);
  //   });
  //
  //   it(`single newline`, function () {
  //     let inp = `\n`;
  //     let out = [ new PreSnippet(`\n`, 'whitespace') ];
  //     expect(cpsftb(inp)).to.deep.equal(out);
  //   });
  //
  //   it(`double newline`, function () {
  //     let inp = `\n\n`;
  //     let out = [ new PreSnippet(`\n\n`, 'whitespace') ];
  //     expect(cpsftb(inp)).to.deep.equal(out);
  //   });
  //
  //   it(`x > 2 newline`, function () {
  //     let inp = `\n\n\n\n`;
  //     let out = [ new PreSnippet(`\n\n\n\n`, 'whitespace') ];
  //     expect(cpsftb(inp)).to.deep.equal(out);
  //   });
  //
  //   it(`x > 2 single white spaces`, function () {
  //     let inp = `    `;
  //     let out = [ new PreSnippet(`    `, 'whitespace') ];
  //     expect(cpsftb(inp)).to.deep.equal(out);
  //   });
  // });//end white space definition -->
  //
  describe(`newline before -->`, () => {
    it(`narration`, function () {
      let inp = `\nAbc`;
      let out = [
        new PreSnippet('\n', 'whitespace'),
        new PreSnippet('Abc', 'narration'),
      ];
      expect(cpsftb(inp)).to.deep.equal(out);
    });
    // it(`speech`, function () {
    //   let inp = '\n“ABC”';
    //   let out = [
    //     new PreSnippet('\n', 'whitespace'),
    //     new PreSnippet('“ABC”', 'speech'),
    //   ];
    //   expect(cpsftb(inp)).to.deep.equal(out);
    // });
    // it(`whitespace space - single`, function () {
    //   let inp = '\n ';
    //   let out = [ new PreSnippet('\n ', 'whitespace') ];
    //   expect(cpsftb(inp)).to.deep.equal(out);
    // });
    // it(`whitespace space - 1 < X`, function () {
    //   let inp = '\n  ';
    //   let out = [ new PreSnippet('\n  ', 'whitespace') ];
    //   expect(cpsftb(inp)).to.deep.equal(out);
    // });
  });//end newline before
  //
  // describe(`surrounded by newline -->`, () => {
  //   it(`narration`, function () {
  //     let inp = `\nAbc\n`;
  //     let out = [
  //       new PreSnippet('\n', 'whitespace'),
  //       new PreSnippet('Abc', 'narration'),
  //       new PreSnippet('\n', 'whitespace'),
  //     ];
  //     expect(cpsftb(inp)).to.deep.equal(out);
  //   });
  //   it(`speech`, function () {
  //     let inp = '\n“ABC”\n';
  //     let out = [
  //       new PreSnippet('\n', 'whitespace'),
  //       new PreSnippet('“ABC”', 'speech'),
  //       new PreSnippet('\n', 'whitespace'),
  //     ];
  //     expect(cpsftb(inp)).to.deep.equal(out);
  //   });
  //   it(`whitespace space - single`, function () {
  //     let inp = '\n \n';
  //     let out = [ new PreSnippet('\n \n', 'whitespace') ];
  //     expect(cpsftb(inp)).to.deep.equal(out);
  //   });
  //   it(`whitespace space - 1 < X`, function () {
  //     let inp = '\n  \n';
  //     let out = [ new PreSnippet('\n  \n', 'whitespace') ];
  //     expect(cpsftb(inp)).to.deep.equal(out);
  //   });
  // });//end surrounded by newline
  //
  // describe(`followed by 'speech' -->`, () => {
  //   it(`narration`, function () {
  //     let inp = `ABC “XYZ”`;
  //     let out = [
  //       new PreSnippet('\n', 'whitespace'),
  //       new PreSnippet('Abc', 'narration'),
  //       new PreSnippet('\n', 'whitespace'),
  //     ];
  //     expect(cpsftb(inp)).to.deep.equal(out);
  //   });
  //   it(`speech`, function () {
  //     let inp = '\n“ABC”\n';
  //     let out = [
  //       new PreSnippet('\n', 'whitespace'),
  //       new PreSnippet('“ABC”', 'speech'),
  //       new PreSnippet('\n', 'whitespace'),
  //     ];
  //     expect(cpsftb(inp)).to.deep.equal(out);
  //   });
  //   it(`whitespace space - single`, function () {
  //     let inp = '\n \n';
  //     let out = [ new PreSnippet('\n \n', 'whitespace') ];
  //     expect(cpsftb(inp)).to.deep.equal(out);
  //   });
  //   it(`whitespace space - 1 < X`, function () {
  //     let inp = '\n  \n';
  //     let out = [ new PreSnippet('\n  \n', 'whitespace') ];
  //     expect(cpsftb(inp)).to.deep.equal(out);
  //   });
  // });//end followed by 'speech' -->
  //
  //
  //
  // it(`new line char opening`, function () {
  //   let inp = '\nAbc';
  //   let out = [
  //     new PreSnippet('\n', 'whitespace'),
  //     new PreSnippet('Abc', 'narration'),
  //   ];
  //   expect(cpsftb(inp)).to.deep.equal(out);
  // });
  //
  // it(`narration opening final narration char numb with double newline follow`, function () {
  //   let inp = 'Chapter 1\n\n';
  //   let out = [
  //     new PreSnippet('Chapter 1', 'narration'),
  //     new PreSnippet('\n\n', 'whitespace'),
  //   ];
  //   expect(cpsftb(inp)).to.deep.equal(out);
  // });







});//end describe('createPreSnippetsFromTextBlob'




































