const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.string = '';
  }

  _transform(chunk, encoding, callback) {
    chunk = this.string + chunk.toString();
    const split = chunk.split(os.EOL);

    this.string = split.pop();

    // eslint-disable-next-line arrow-parens
    split.forEach(elm => this.push(elm));

    callback();
  }

  _flush(callback) {
    this.push(this.string);
    callback();
  }
}

module.exports = LineSplitStream;
