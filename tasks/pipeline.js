/**
 * grunt/pipeline.js
 *
 * The order in which your css, javascript, and template files should be
 * compiled and linked from your views and static HTML files.
 *
 * (Note that you can take advantage of Grunt-style wildcard/glob/splat expressions
 * for matching multiple files.)
 */



// CSS files to inject in order
//
// (if you're using LESS with the built-in default config, you'll want
//  to change `assets/styles/importer.less` instead.)
var cssFilesToInject = [
  'plugins/stepy/jquery.stepy.css',
  'css/font-awesome.css',
  'css/themify-icons.css',
  'css/animate.min.css',
  'css/skins/palette.css',
  'css/fonts/font.css',
  'css/main.css',
  'css/panel.css',
  'plugins/treetable/jquery.treetable.css',
  'plugins/datatables/dataTables.bootstrap.css',
  'plugins/chosen/chosen.min.css',
  'plugins/x-editable/bootstrap-editable.css'
];


// Client-side javascript files to inject in order
// (uses Grunt-style wildcard/glob/splat expressions)
var jsFilesToInject = [
  'plugins/modernizr.js',
  'js/jquery.pjax.js',
  'bootstrap/js/bootstrap.js',
  'plugins/jquery.form.js',
  'plugins/jquery.sortable.js',
  'plugins/jquery.nestable.js',
  'plugins/icheck/icheck.js',
  'plugins/jquery.slimscroll.min.js',
  'plugins/jquery.easing.min.js',
  'plugins/appear/jquery.appear.js',
  'plugins/jquery.placeholder.js',
  'plugins/fastclick.js',
  'plugins/count-to/jquery.countTo.js',
  'js/toast.js',
  'plugins/chosen/chosen.jquery.min.js',
  'plugins/treetable/jquery.treetable.js',
  'plugins/datatables/jquery.dataTables.js',
  'plugins/datatables/dataTables.bootstrap.js',
  'plugins/jstree/jstree.min.js',
  'plugins/switchery/switchery.js',
  'plugins/stepy/jquery.stepy.js',
  'plugins/stepy/jquery.validate.min.js',
  'plugins/icheck/icheck.js',
  'plugins/chosen/chosen.jquery.min.js',
  'plugins/jquery.form.js',
  'plugins/uploadifive/jquery.uploadifive.min.js',
  'plugins/datepicker/bootstrap-datetimepicker.min.js',
  'plugins/datepicker/locales/bootstrap-datetimepicker.zh-CN.js',
  'plugins/emoji/emoji.js',
  'plugins/sorttable/Sortable.min.js',
  'plugins/jquery.qrcode.min.js',
  'plugins/x-editable/bootstrap-editable.js',
  'js/form.js',
  'js/offscreen.js',
  'js/main.js',
  'js/date.js'
];


// Client-side HTML templates are injected using the sources below
// The ordering of these templates shouldn't matter.
// (uses Grunt-style wildcard/glob/splat expressions)
//
// By default, Sails uses JST templates and precompiles them into
// functions for you.  If you want to use jade, handlebars, dust, etc.,
// with the linker, no problem-- you'll just want to make sure the precompiled
// templates get spit out to the same file.  Be sure and check out `tasks/README.md`
// for information on customizing and installing new tasks.
var templateFilesToInject = [
  'templates/**/*.html'
];



// Prefix relative paths to source files so they point to the proper locations
// (i.e. where the other Grunt tasks spit them out, or in some cases, where
// they reside in the first place)
module.exports.cssFilesToInject = cssFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.jsFilesToInject = jsFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.templateFilesToInject = templateFilesToInject.map(function(path) {
  return 'assets/' + path;
});
