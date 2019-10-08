const Transform = require('readable-stream').Transform

class Separator extends Transform {
  constructor () {
    super({ objectMode: true })
  }

  _transform (chunk, encoding, callback) {
    for(const item of chunk) { 
		console.log(item);
		this.push(item) 
	}

    callback()
  }

  static create () {
    return new Separator()
  }
}

module.exports = Separator.create