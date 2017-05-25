'use strict';

module.exports = () => {
  const patterns = [];

  $.gulp.task('html', () => {
    patterns.push({ match: '%=suffix=%', replace: $.dev ? '' : '.min' });
    patterns.push({ match: '%=version=%', replace: $.dev ? '' : `?rel=${$.package.version}` });

    return $.gulp.src('./source/index.html')
      .pipe($.gp.replaceTask({ patterns, usePrefix: false }))
      .pipe($.gulp.dest($.config.output));
  });
};
