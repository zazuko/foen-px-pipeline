const request = require('request');
const path = require("path");
const stream = require('readable-stream')
const Pipeline = require('barnard59-core').pipeline
const csv = require('csv-parser')
const fs = require('fs')
const https = require('https')

function fetch (sourcedir, basicfile) {
	//console.log(path.resolve(__dirname,'../'+sourcedir));
	const fs = require('fs')
	var obj = JSON.parse(fs.readFileSync(path.resolve(__dirname,basicfile), 'utf8'));
	for(let fileUrl of obj) {
		//console.log(fileUrl);		
		var file = fs.createWriteStream(path.resolve(__dirname,'../'+sourcedir));
		var request = https.get(fileUrl, function(response) {
			console.log(fileUrl);
			response.pipe(file);
			file.on('finish', function() {
			  file.close(cb);  // close() is async, call cb after close completes.
			});
		  }).on('error', function(err) { // Handle errors
			console.log(err.message);
			fs.unlink(path.resolve(__dirname,'../'+sourcedir)); // Delete the file async. (But we don't check the result)
			if (cb) cb(err.message);
		  });
	}
}
module.exports = {
  fetch
}