const { createReadStream } = require('fs')
const path = require('path')

function openFromCsvw (csvwPath, sourceFileUrl) {
  return createReadStream(path.resolve(__dirname, sourceFileUrl)) //create stream of the path
}

function downloadCsv (csvFileUrl) {
	downloadCsv(csvFileUrl, '../source/'+csvFileUrl+'.csv');
  //return createReadStream(path.resolve(__dirname, csvFileUrl)) //create stream of the path
}

module.exports = {
  openFromCsvw,
  downloadCsv
}
