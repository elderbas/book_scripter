"use strict";
let expect = require('chai').expect;
let indexHtmlInjector = require('../src/indexHtmlInjector.js');
let Stream = require('../src/classes/Stream.js');

let typesOfStreams = ['speech', 'narration', 'parseError'];
describe('indexHtmlInjector', () => {
  it('exists as a function', function () {
    expect(typeof indexHtmlInjector).to.equal('function');
  });

  // any iterating over the stream types here would probably be best fit for testing the
  // outputForStreamChars function inside indexHtmlInjector but it seems unnecessary to add that right now
  it(`defaults as span tags and applies class '<type>-simple'`, function () {
    typesOfStreams.forEach(streamType => {
      let output = `<span class="simple ${streamType}-simple">Abc</span>`;
      expect(indexHtmlInjector('Abc', [new Stream(0, 2, streamType)])).to.deep.equal(output);
    });
  });

  it(`spaces around`, function () {
    typesOfStreams.forEach(streamType => {
      let output = ` <span class="simple ${streamType}-simple">Abc</span> `;
      expect(indexHtmlInjector(' Abc ', [new Stream(1, 3, streamType)])).to.deep.equal(output);
    });
  });

  it(`new line chars`, function () {
    typesOfStreams.forEach(streamType => {
      let output = `\n<span class="simple ${streamType}-simple">Abc</span>\n`;
      expect(indexHtmlInjector('\nAbc\n', [new Stream(1, 3, streamType)])).to.deep.equal(output);
    });
  });

  it(`multiple streams`, function () {
    let output1 = `<span class="simple narration-simple">A</span>`;
    let output2 = `<span class="simple speech-simple">“B”</span>`;
    // mind the space in the middle
    expect(indexHtmlInjector('A “B”', [
      new Stream(0, 0, 'narration'),
      new Stream(2, 4, 'speech')
    ])).to.deep.equal(`${output1} ${output2}`);
  });



});//end describe('bookStorageFormat'
































