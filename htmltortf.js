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

//adding in a replaceall string function
if (typeof String.prototype.replaceAll !== 'function') {
  String.prototype.replaceAll = function(search, replacement) {
      var target = this;
      return target.replace(new RegExp(search, 'g'), replacement);
  };
}

const fs = require('fs');
var cloudconvert = new (require('cloudconvert'))(apikey);

const htmlSuffix = ".html";
var inPath = inFolder.replaceAll('\\\\','/');
if (!inPath.endsWith('/')) {
  inPath = inPath + '/';
}

var outPath = outFolder.replaceAll('\\\\','/');
if (!outPath.endsWith('/')) {
  outPath = outPath + '/';
}

//create a directory if it doesn't exist
function makeDirectorySync(directory) {  
  try {
    fs.statSync(directory);
  } catch(e) {
    fs.mkdirSync(directory);
  }
}

//scan folder and subfolders; convert .html files to .rtf; copy all other files and folders
function processDirectory(inFolder,outFolder) {
  console.log("processDirectory",inFolder,outFolder);
  fs.readdir(inFolder, (err, files) => {
    files.forEach(infile => {
      //recurse if necessary
      if (fs.statSync(inFolder+infile).isDirectory()) {
        makeDirectorySync(outFolder+infile);
        processDirectory(inFolder+infile+"/",outFolder+infile+"/");
      }
      //convert html to rtf
      else if (infile.endsWith(htmlSuffix)) {
        var outfile = outFolder + infile.substring(0,infile.length-htmlSuffix.length) + ".rtf";
        fs.createReadStream(inFolder + infile)
          .pipe(cloudconvert.convert({
            inputformat: 'html',
            outputformat: 'rtf'
          }))
          .pipe(fs.createWriteStream(outfile))
          .on('finish', function() {
            console.log('converted ',outfile);
          });
      }
      //just copy
      else {
        console.log("copying ",inFolder+infile);
        fs.createReadStream(inFolder+infile).pipe(fs.createWriteStream(outFolder+infile));
      }
    });
  })
}

processDirectory(inPath,outPath);

