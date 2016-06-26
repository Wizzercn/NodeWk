/**
 * Created by wizzer on 2016/4/21.
 * from:  https://github.com/bsegault/zip-zip-top
 */
var util = require("util"),
  async = require("async"),
  path = require("path"),
  fs = require("fs"),
  JSZip = require("jszip");

/**
 * Creates an ZipUtil object, the representation of a zip file
 * @constructor
 */
function ZipUtil() {
  JSZip.call(this);
}

util.inherits(ZipUtil, JSZip);

/**
 * Adds the given file to this zip
 * @param{String} filePath relative path to the file to add.
 * @param {Function} callback takes error & EasZyp object as parameter.
 * @param {Object} options options passed to jszip. base64 & binary field will be overriden.
 */
ZipUtil.prototype.addFile = function (filePath, callback, options) {
  var self = this;

  options = options || {};
  options.base64 = false;
  options.binary = true;
  sails.log.debug('filePath::'+filePath);
  fs.readFile(path.resolve(filePath), function(err, data) {
    if (err) {
      return callback(err, self);
    }

    var root = options.rootFolder || "/";
    delete options.rootFolder;

    self.file(path.join(root, path.basename(filePath)), data, options);
    return callback(null, self);
  });
};
ZipUtil.prototype.zipFile = ZipUtil.prototype.addFile;

/**
 * Recursively Zip a folder
 * @param {String} folder rootFolder name to add
 * @param {function} callback takes err, ZipZipTop as arguments
 * @param {Object} options passed to jszip. noSymLinks field
 */
ZipUtil.prototype.addFolder = function (folder,outPath, callback, options) {
  if (!fs.existsSync(path.resolve(folder)) || !fs.statSync(folder).isDirectory()) {
    return callback(new Error(util.format("Given '%s' doesn't exist or is not a directory.", folder), this));
  } else {
    var self = this;

    options = options || {};
    options.rootFolder = options.rootFolder || path.basename(folder);

    fs.readdir(folder, function(err, files) {
      if(err) {
        return callback(err, self);
      }
      async.each(files, function(item, done) {
        var subPath = path.resolve(folder, item),
          newOptions = JSON.parse(JSON.stringify(options));

        fs.stat(subPath, function(err, stats) {
          if(err) {
            return done(err);
          }
          if(!stats.isSymbolicLink() || !options.noSymLinks) {
            if (stats.isDirectory()) {
              newOptions.rootFolder = path.join(options.rootFolder, item);
              var p='/';
              if ('win32' == process.platform) {
                p='\\';
              }
              p=sails.config.appPath+p;
              sails.log.debug('subPath::'+subPath);
              if(outPath.indexOf(subPath.replace(p,''))<0){
                self.addFolder(subPath,outPath, done, newOptions);
              }
            } else if (stats.isFile()) {
              self.addFile(subPath, done, newOptions);
            }
          }
        });
      }, function(err) {
        if(err) {
          return callback(err, self);
        }
        return callback(null, self);
      });
    });
  }
};
ZipUtil.prototype.zipFolder = ZipUtil.prototype.addFolder;

/**
 * Writes the current object to the given filePath
 * @param filePath path to the file to write
 * @param callback passed to fs.writeFile
 */
ZipUtil.prototype.writeToFile = function (filePath, callback) {
  this
    .generateNodeStream({type:'nodebuffer',streamFiles:true,compression:'DEFLATE'})
    .pipe(fs.createWriteStream(filePath))
    .on('end', function () {
      sails.log.debug("zip written.");
    });
  callback(null);
};


ZipUtil.prototype.clone = function () {
  var newObj = new ZipUtil();
  for (var i in this) {
    if (typeof this[i] !== "function") {
      newObj[i] = this[i];
    }
  }
  return newObj;
};

module.exports = ZipUtil;
