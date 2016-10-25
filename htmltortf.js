console.log("html to rtf conversion started...");

if (process.argv.length < 4) {
  console.log("please pass the input and output directory paths to use, e.g. node htmltortf ./path/to/input/files ./path/to/output/files");
  process.exit(-1);
}

const inFolder = process.argv[2];
const outFolder = process.argv[3];

//your api key goes here
const apikey = "LbtyfBj-g47fhfIUzqZEff1sWW0A6K2urhjlLjkfd0220ZZoa-3otIWLkRfdFFhaEab-b_duhPDV-F5zNh6npw"

//adding in a string function
if (typeof String.prototype.endsWith !== 'function') {
    String.prototype.endsWith = function(suffix) {
	if (suffix.length > this.length) return false;
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
}

const fs = require('fs');
var cloudconvert = new (require('cloudconvert'))(apikey);

const htmlSuffix = ".html";
const inPath = inFolder + '/';
const outPath = outFolder + '/';

fs.readdir(inFolder, (err, files) => {
  files.forEach(infile => {
    if (infile.endsWith(htmlSuffix)) {
        var outfile = outPath + infile.substring(0,infile.length-htmlSuffix.length) + ".rtf";
        fs.createReadStream(inPath + infile)
        .pipe(cloudconvert.convert({
          inputformat: 'html',
          outputformat: 'rtf'
        }))
        .pipe(fs.createWriteStream(outfile))
        .on('finish', function() {
          console.log('created ',outfile);
      });
    }
  });
})

