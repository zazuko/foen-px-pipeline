const rdf = require('rdf-ext')
const { Transform } = require('readable-stream')

const ns = {
  first: rdf.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#first'),
  nil: rdf.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#nil'),
  rest: rdf.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#rest')
}

class ToList extends Transform {
  constructor ({ datatype, property, separator, targetProperty, termType }) {
    super({ objectMode: true })

    this.datatype = datatype && datatype.term
    this.property = property.term
    this.separator = separator
    this.targetProperty = (targetProperty && targetProperty.term) || (property && property.term)
    this.termType = termType
  }

  _transform (quad, encoding, callback) {
    if (!quad.predicate.equals(this.property)) {
      callback(null, quad)

      return
    }

    const values = quad.object.value.split(this.separator)
    const nodes = values.map(() => rdf.blankNode())

    this.push(rdf.quad(quad.subject, this.targetProperty, nodes[0] || ns.nil, quad.graph))

    for (let index = 0; index < nodes.length; index++) {
      this.push(rdf.quad(nodes[index], ns.first, this.createTerm(values[index]), quad.graph))
      this.push(rdf.quad(nodes[index], ns.rest, nodes[index + 1] || ns.nil, quad.graph))
    }

    callback()
  }

  createTerm (value) {
    if (this.termType === 'Literal') {
      return rdf.literal(value, this.datatype)
    }

    if (this.termType === 'NamedNode') {
      return rdf.namedNode(value)
    }
  }
}

function literal ({ datatype, property, separator = ' ', targetProperty}) {
  return new ToList({ datatype, property, separator, targetProperty, termType: 'Literal'})
}

function namedNode ({ property, separator = ' ', targetProperty}) {
  return new ToList({ property, separator, targetProperty, termType: 'NamedNode'})
}

module.exports = {
  literal,
  namedNode
}
