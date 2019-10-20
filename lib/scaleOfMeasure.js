quad => {
    const rdf = require('rdf-ext')
    const temporal = ['http://www.w3.org/2001/XMLSchema#date', 'http://www.w3.org/2001/XMLSchema#dateTime', 'http://www.w3.org/2001/XMLSchema#gDay', 'http://www.w3.org/2001/XMLSchema#gMonth', 'http://www.w3.org/2001/XMLSchema#gMonthDay', 'http://www.w3.org/2001/XMLSchema#gYear', 'http://www.w3.org/2001/XMLSchema#gYearMonth']
    const continuous = ['http://www.w3.org/2001/XMLSchema#double','http://www.w3.org/2001/XMLSchema#float','http://www.w3.org/2001/XMLSchema#decimal' ]

    if (quad.predicate.value === 'http://www.w3.org/ns/shacl#datatype') {

        if ( temporal.includes(quad.object.value)) {
            return [quad, rdf.quad(quad.subject, rdf.namedNode('http://ns.bergnet.org/cube/scale/scaleOfMeasure>'), rdf.namedNode('http://ns.bergnet.org/cube/scale/Temporal'))]
        }

        if ( continuous.includes(quad.object.value)) {
            return [quad, rdf.quad(quad.subject, rdf.namedNode('http://ns.bergnet.org/cube/scale/scaleOfMeasure>'), rdf.namedNode('http://ns.bergnet.org/cube/scale/Continuous'))]
        }
      
    }
  
    return [quad]
  }