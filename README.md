gulp-filetree-json-easy
==================

Gulp task to save the given files into a json file

## Install

```
npm install gulp-filetree-json-easy --save-dev
```

## Usage
```javascript
var filetree2json = require('gulp-filetree-json-easy');

gulp.task('filetree2json', function () {
  // Save all images into the json file
  gulp.src('image/**/*.{png,jpg,gif,jpeg}')
    .pipe(filetree2json({
        as: 'images.json',
        flat: false
    }))
    .pipe(gulp.dest('app/data/'));
});
```

## Options

#### as :String
Default value: images.json

Saves all the found files into the json file

#### flat :Boolean
Default value: false

Should we save the json in a hierarchical way or in a flat way only as array

## Example [AngularJS](https://github.com/angular/angular.js)

If you want to have an image preloader within an AngularJS app, there is little help needed:
https://github.com/dabit3/angular-easy-image-preloader

#### Example code

```javascript
app.factory('Image', function ($http) {
  // create a request
  var Request = $http({
    method: 'GET',
    url: 'app/data/images.json'
  });

  return Request;
});

app.controller('MyController', function(preloader, Image) {
  Image.then(function (Request) {
      if (parseInt(Request['status']) === 200) {
          var arrayImageLocations = Request['data'];
          //start our preloader and load every image
          preloader
            .preloadImages(arrayImageLocations)
            .then(function () {
                // show your website
            });
      }
  });
});
```

## License :MIT

Copyright (c) 2016-2017 ERGOWERK GmbH

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Tribute to

https://github.com/lexich/gulp-image-preload
