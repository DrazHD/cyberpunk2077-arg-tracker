(window.webpackJsonp = window.webpackJsonp || []).push([
  ['app'],
  {
    XENs: function(e, t, n) {},
    ng4s: function(e, t, n) {
      'use strict';
      n.r(t);
      n('XENs');
      function o() {
        var e = document.getElementById('message'),
          t = 6e4,
          n = e.getAttribute('data-action') || '/tick';
        !(function o() {
          var s = new XMLHttpRequest();
          s.open('GET', n, !0),
            (s.onload = function() {
              if (200 === s.status) {
                var t = JSON.parse(s.responseText);
                t.message &&
                  (function(t) {
                    if (e) {
                      var n = e.querySelector('source');
                      n && (s = n) && s.parentElement.removeChild(s),
                        (n = document.createElement('source')).setAttribute(
                          'src',
                          t
                        ),
                        n.setAttribute('type', 'audio/mp3'),
                        e.appendChild(n),
                        e.load();
                      var o = e.play();
                      void 0 !== o &&
                        o.then(function() {}).catch(function(e) {});
                    }
                    var s;
                  })(t.message);
              }
            }),
            s.send(null),
            setTimeout(o, t);
        })();
      }
      window.onload = function() {
        o();
      };
    }
  },
  [['ng4s', 'runtime']]
]);
