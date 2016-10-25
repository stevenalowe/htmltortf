### html to rtf

uses cloudconvert service; get API key at https://cloudconvert.com/pricing

# put API key into a file named key.json:
{ "key": "<your api key>"}

(gitignore is set to ignore .json files)

copies input directory including subfolders to output directory, converting .html files to .rtf files as it goes

useful for transferring files from Evernote to Scrivener:
* select and export all notes as individual html files to a directory
* run node htmltortf <inputPath> <outputPath>
* <outputPath> will be created if it doesn't exist
* select and import all files into Scrivener Research folder
* delete the junk, if any
* start writing

While Scrivener can import .html files directory, the results cannot be edited. By converting to rtf, the imported results can be edited. Note that this will lose embedded image placements and some advanced formatting.

