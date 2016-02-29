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

## License :MIT

Copyright (c) 2016 ERGOWERK Usability Engineering UG

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