webpackJsonp(
  [2],
  {
    '78qo': function(a, n, o) {
      (function(a) {
        var n = o('7t+N');
        (a.$ = a.jQuery = n),
          n('.navbar-toggler').on('click', function() {
            n(this).toggleClass('active');
            var a = n('.navbar-collapse');
            a.hasClass('navbar-collapse-open')
              ? (a.slideUp(500),
                setTimeout(function() {
                  a.removeClass('navbar-collapse-open');
                }, 500))
              : (a.addClass('navbar-collapse-open'), a.slideDown(500));
          }),
          n(window).resize(function() {
            n('.navbar-toggler').removeClass('active'),
              n('.navbar-collapse').removeClass('navbar-collapse-open'),
              n('.navbar-collapse').css('display', '');
          });
      }.call(n, o('DuR2')));
    },
    DuR2: function(a, n) {
      var o;
      o = (function() {
        return this;
      })();
      try {
        o = o || Function('return this')() || (0, eval)('this');
      } catch (a) {
        'object' == typeof window && (o = window);
      }
      a.exports = o;
    }
  },
  ['78qo']
);
