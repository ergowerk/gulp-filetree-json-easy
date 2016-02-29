  'use strict';

  // load dependencies
  var Through2 = require('through2');
  var GulpUtil = require('gulp-util');
  var PluginError = GulpUtil.PluginError;
  var Path = require('path');
  var _ = require('lodash');

  /**
   * @param {Object} objectParamOptions
   * @returns {Through2}
   */
  module.exports = function (objectParamOptions) {
      // options to share with
      var objectOptions = _.defaults(objectParamOptions || new Object, {
          /**
           * @var {String}
           */
          as: 'images.json',
          /**
           * @var {Boolean}
           */
          flat: false
      });

      // file buffer to pass all the files into
      var objectFileBuffer = null;

      /**
       * Process the incoming data
       *
       * @param {Object} objectFile
       * @param {String} stringEncoding
       * @param {Function} functionNext
       */
      function functionProcessData (objectFile, stringEncoding, functionNext) {
          // if the file is null, just pass it along
          if (objectFile.isNull()) {
              this.push(objectFile);
              return functionNext();
          }

          // if the file is a stream, stop here and throw an error
          if (objectFile.isStream()) {
              this.emit('error', new PluginError('gulp-image-to-json', 'Streaming not supported'));
              return functionNext();
          }

          // operate the file
          var stringRelativeFilename = objectFile['relative'];

          // do we want an flat array?
          if (objectOptions['flat'] === false) {
              // if this isn't set already
              if (objectFileBuffer === null) {
                  objectFileBuffer = new Object;
              }

              // cut the path into pieces
              var arrayPieces = stringRelativeFilename.split(Path['sep']);
              // and save it to the file buffer
              var objectPointer = _.reduce(arrayPieces.slice(0, arrayPieces.length - 1), (function (objectPointer, stringItem) {
                  return objectPointer[stringItem] || (objectPointer[stringItem] = new Object);
              }), objectFileBuffer);

              // get the last part of the filename
              objectPointer[arrayPieces[arrayPieces.length - 1]] = stringRelativeFilename;
          }
          else {
              // if this isn't set already
              if (objectFileBuffer === null) {
                  objectFileBuffer = new Array;
              }

              // add every entry we found as one entry into the array
              objectFileBuffer.push(stringRelativeFilename);
          }

          // startover with the next one
          functionNext();
      }

      /**
       * After preparing the file buffer object
       *
       * @param {Function} functionFinish
       */
      function functionEndStream (functionFinish) {
          var stringFileContent = JSON.stringify(objectFileBuffer);

          // Create our gulp script file
          var GulpScriptFile = new GulpUtil.File({
              cwd: '',
              base: '',
              path: objectOptions['as'],
              contents: new Buffer(stringFileContent)
          });

          // push it into our stream
          this.push(GulpScriptFile);

          // and we're done
          functionFinish();
      }

      // return it
      return Through2.obj(functionProcessData, functionEndStream);
  };
