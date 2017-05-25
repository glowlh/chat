'use strict';

module.exports = () => {
  $.gulp.task('watch', () => {
    $.gulp.watch('./source/style/**/*.scss', $.gulp.series('sass'));
  });
};
