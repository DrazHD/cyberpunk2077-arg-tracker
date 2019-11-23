(window.webpackJsonp = window.webpackJsonp || []).push([
  ['app'],
  {
    XENs: function(t, e, n) {},
    ng4s: function(t, e, n) {
      'use strict';
      n.r(e);
      n('XENs');
      var a = n('t/UT'),
        i = document.getElementById('unitBox'),
        o = document.querySelectorAll('.tab');
      if (o)
        for (
          var r = function(t) {
              o[t]
                .querySelector('.tab__header')
                .addEventListener('click', function() {
                  o[t].setAttribute('data-active', 'true');
                  var e = o[t].getAttribute('data-tabindex');
                  document.body.setAttribute('data-tab', 'tab' + e),
                    (function(t) {
                      for (var e = 0; e < o.length; e++) {
                        o[e].getAttribute('data-tabindex') !== t &&
                          o[e].setAttribute('data-active', 'false');
                      }
                    })(e),
                    window.scrollTo(0, 0);
                });
            },
            d = 0;
          d < o.length;
          d++
        )
          r(d);
      if (
        (window.addEventListener('load', function() {
          if (location.hash.length > 1 && o) {
            var t = location.hash.substr(1),
              e = document.getElementById(t);
            if (e) {
              e.setAttribute('data-active', 'true');
              for (var n = 0; n < o.length; n++) {
                o[n].getAttribute('id') !== t
                  ? o[n].setAttribute('data-active', 'false')
                  : document.body.setAttribute('data-tab', 'tab' + (n + 1));
              }
            }
            setTimeout(function() {
              window.scrollTo(0, 0);
            }, 1);
          }
          window.history.replaceState &&
            window.history.replaceState(
              null,
              null,
              window.location.href.split('#')[0]
            );
        }),
        i)
      ) {
        var u = new a.a('#unitBox', { minScrollbarLength: 20 });
        window.addEventListener('resize', function() {
          u.update();
        });
      }
    }
  },
  [['ng4s', 'runtime', 0]]
]);
