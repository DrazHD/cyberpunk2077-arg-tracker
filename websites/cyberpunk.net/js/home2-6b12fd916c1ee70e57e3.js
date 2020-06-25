(window.webpackJsonp = window.webpackJsonp || []).push([
  ['home2'],
  {
    '/9aa': function(t, e, n) {
      var r = n('NykK'),
        i = n('ExA7'),
        o = '[object Symbol]';
      t.exports = function(t) {
        return 'symbol' == typeof t || (i(t) && r(t) == o);
      };
    },
    '/MXg': function(t, e, n) {
      var r = n('ZkmD');
      t.exports = function() {
        var t = r();
        return {
          get: function(e, n) {
            var r = t(e);
            return r.hasOwnProperty('value') ? r.value : n;
          },
          set: function(e, n) {
            return (t(e).value = n), this;
          },
          has: function(e) {
            return 'value' in t(e);
          },
          delete: function(e) {
            return delete t(e).value;
          }
        };
      };
    },
    '033R': function(t, e, n) {
      'use strict';
      var r = n('TBio');
      t.exports = function(t) {
        var e = ["'use strict'", 'var CACHED={}'],
          n = [],
          i = t.funcName + '_cwise_thunk';
        e.push(
          ['return function ', i, '(', t.shimArgs.join(','), '){'].join('')
        );
        for (
          var o = [],
            a = [],
            s = [
              [
                'array',
                t.arrayArgs[0],
                '.shape.slice(',
                Math.max(0, t.arrayBlockIndices[0]),
                t.arrayBlockIndices[0] < 0
                  ? ',' + t.arrayBlockIndices[0] + ')'
                  : ')'
              ].join('')
            ],
            l = [],
            c = [],
            u = 0;
          u < t.arrayArgs.length;
          ++u
        ) {
          var h = t.arrayArgs[u];
          n.push(
            [
              't',
              h,
              '=array',
              h,
              '.dtype,',
              'r',
              h,
              '=array',
              h,
              '.order'
            ].join('')
          ),
            o.push('t' + h),
            o.push('r' + h),
            a.push('t' + h),
            a.push('r' + h + '.join()'),
            s.push('array' + h + '.data'),
            s.push('array' + h + '.stride'),
            s.push('array' + h + '.offset|0'),
            u > 0 &&
              (l.push(
                'array' +
                  t.arrayArgs[0] +
                  '.shape.length===array' +
                  h +
                  '.shape.length+' +
                  (Math.abs(t.arrayBlockIndices[0]) -
                    Math.abs(t.arrayBlockIndices[u]))
              ),
              c.push(
                'array' +
                  t.arrayArgs[0] +
                  '.shape[shapeIndex+' +
                  Math.max(0, t.arrayBlockIndices[0]) +
                  ']===array' +
                  h +
                  '.shape[shapeIndex+' +
                  Math.max(0, t.arrayBlockIndices[u]) +
                  ']'
              ));
        }
        for (
          t.arrayArgs.length > 1 &&
            (e.push(
              'if (!(' +
                l.join(' && ') +
                ")) throw new Error('cwise: Arrays do not all have the same dimensionality!')"
            ),
            e.push(
              'for(var shapeIndex=array' +
                t.arrayArgs[0] +
                '.shape.length-' +
                Math.abs(t.arrayBlockIndices[0]) +
                '; shapeIndex--\x3e0;) {'
            ),
            e.push(
              'if (!(' +
                c.join(' && ') +
                ")) throw new Error('cwise: Arrays do not all have the same shape!')"
            ),
            e.push('}')),
            u = 0;
          u < t.scalarArgs.length;
          ++u
        )
          s.push('scalar' + t.scalarArgs[u]);
        return (
          n.push(['type=[', a.join(','), '].join()'].join('')),
          n.push('proc=CACHED[type]'),
          e.push('var ' + n.join(',')),
          e.push(
            [
              'if(!proc){',
              'CACHED[type]=proc=compile([',
              o.join(','),
              '])}',
              'return proc(',
              s.join(','),
              ')}'
            ].join('')
          ),
          t.debug &&
            console.log(
              '-----Generated thunk:\n' + e.join('\n') + '\n----------'
            ),
          new Function('compile', e.join('\n'))(r.bind(void 0, t))
        );
      };
    },
    '0GS4': function(t, e, n) {
      'use strict';
      var r = n('63NL'),
        i = n('o/2B');
      function o(t) {
        return new Function('y', 'return function(){return y}')(t);
      }
      function a(t, e) {
        for (var n = new Array(t), r = 0; r < t; ++r) n[r] = e;
        return n;
      }
      t.exports = function(t, e, n, s) {
        function l(t, e, n) {
          switch (n) {
            case 'bool':
            case 'int':
            case 'sampler2D':
            case 'samplerCube':
              return 'gl.uniform1i(locations[' + e + '],obj' + t + ')';
            case 'float':
              return 'gl.uniform1f(locations[' + e + '],obj' + t + ')';
            default:
              var r = n.indexOf('vec');
              if (!(0 <= r && r <= 1 && n.length === 4 + r)) {
                if (0 === n.indexOf('mat') && 4 === n.length) {
                  var o = n.charCodeAt(n.length - 1) - 48;
                  if (o < 2 || o > 4)
                    throw new i(
                      '',
                      'Invalid uniform dimension type for matrix ' +
                        name +
                        ': ' +
                        n
                    );
                  return (
                    'gl.uniformMatrix' +
                    o +
                    'fv(locations[' +
                    e +
                    '],false,obj' +
                    t +
                    ')'
                  );
                }
                throw new i(
                  '',
                  'Unknown uniform data type for ' + name + ': ' + n
                );
              }
              var o = n.charCodeAt(n.length - 1) - 48;
              if (o < 2 || o > 4) throw new i('', 'Invalid data type');
              switch (n.charAt(0)) {
                case 'b':
                case 'i':
                  return (
                    'gl.uniform' + o + 'iv(locations[' + e + '],obj' + t + ')'
                  );
                case 'v':
                  return (
                    'gl.uniform' + o + 'fv(locations[' + e + '],obj' + t + ')'
                  );
                default:
                  throw new i(
                    '',
                    'Unrecognized data type for vector ' + name + ': ' + n
                  );
              }
          }
        }
        function c(e) {
          for (
            var r = ['return function updateProperty(obj){'],
              i = (function t(e, n) {
                if ('object' != typeof n) return [[e, n]];
                var r = [];
                for (var i in n) {
                  var o = n[i],
                    a = e;
                  parseInt(i) + '' === i
                    ? (a += '[' + i + ']')
                    : (a += '.' + i),
                    'object' == typeof o
                      ? r.push.apply(r, t(a, o))
                      : r.push([a, o]);
                }
                return r;
              })('', e),
              o = 0;
            o < i.length;
            ++o
          ) {
            var a = i[o],
              c = a[0],
              u = a[1];
            s[u] && r.push(l(c, u, n[u].type));
          }
          r.push('return obj}');
          var h = new Function('gl', 'locations', r.join('\n'));
          return h(t, s);
        }
        function u(r, l, u) {
          if ('object' == typeof u) {
            var f = h(u);
            Object.defineProperty(r, l, {
              get: o(f),
              set: c(u),
              enumerable: !0,
              configurable: !1
            });
          } else
            s[u]
              ? Object.defineProperty(r, l, {
                  get:
                    ((p = u),
                    (d = new Function(
                      'gl',
                      'wrapper',
                      'locations',
                      'return function(){return gl.getUniform(wrapper.program,locations[' +
                        p +
                        '])}'
                    )),
                    d(t, e, s)),
                  set: c(u),
                  enumerable: !0,
                  configurable: !1
                })
              : (r[l] = (function(t) {
                  switch (t) {
                    case 'bool':
                      return !1;
                    case 'int':
                    case 'sampler2D':
                    case 'samplerCube':
                    case 'float':
                      return 0;
                    default:
                      var e = t.indexOf('vec');
                      if (0 <= e && e <= 1 && t.length === 4 + e) {
                        var n = t.charCodeAt(t.length - 1) - 48;
                        if (n < 2 || n > 4)
                          throw new i('', 'Invalid data type');
                        return 'b' === t.charAt(0) ? a(n, !1) : a(n, 0);
                      }
                      if (0 === t.indexOf('mat') && 4 === t.length) {
                        var n = t.charCodeAt(t.length - 1) - 48;
                        if (n < 2 || n > 4)
                          throw new i(
                            '',
                            'Invalid uniform dimension type for matrix ' +
                              name +
                              ': ' +
                              t
                          );
                        return a(n * n, 0);
                      }
                      throw new i(
                        '',
                        'Unknown uniform data type for ' + name + ': ' + t
                      );
                  }
                })(n[u].type));
          var p, d;
        }
        function h(t) {
          var e;
          if (Array.isArray(t)) {
            e = new Array(t.length);
            for (var n = 0; n < t.length; ++n) u(e, n, t[n]);
          } else for (var r in ((e = {}), t)) u(e, r, t[r]);
          return e;
        }
        var f = r(n, !0);
        return { get: o(h(f)), set: c(f), enumerable: !0, configurable: !0 };
      };
    },
    '1BqX': function(t, e, n) {
      'use strict';
      (e.uniforms = function(t, e) {
        for (
          var n = t.getProgramParameter(e, t.ACTIVE_UNIFORMS), r = [], i = 0;
          i < n;
          ++i
        ) {
          var a = t.getActiveUniform(e, i);
          if (a) {
            var s = o(t, a.type);
            if (a.size > 1)
              for (var l = 0; l < a.size; ++l)
                r.push({ name: a.name.replace('[0]', '[' + l + ']'), type: s });
            else r.push({ name: a.name, type: s });
          }
        }
        return r;
      }),
        (e.attributes = function(t, e) {
          for (
            var n = t.getProgramParameter(e, t.ACTIVE_ATTRIBUTES),
              r = [],
              i = 0;
            i < n;
            ++i
          ) {
            var a = t.getActiveAttrib(e, i);
            a && r.push({ name: a.name, type: o(t, a.type) });
          }
          return r;
        });
      var r = {
          FLOAT: 'float',
          FLOAT_VEC2: 'vec2',
          FLOAT_VEC3: 'vec3',
          FLOAT_VEC4: 'vec4',
          INT: 'int',
          INT_VEC2: 'ivec2',
          INT_VEC3: 'ivec3',
          INT_VEC4: 'ivec4',
          BOOL: 'bool',
          BOOL_VEC2: 'bvec2',
          BOOL_VEC3: 'bvec3',
          BOOL_VEC4: 'bvec4',
          FLOAT_MAT2: 'mat2',
          FLOAT_MAT3: 'mat3',
          FLOAT_MAT4: 'mat4',
          SAMPLER_2D: 'sampler2D',
          SAMPLER_CUBE: 'samplerCube'
        },
        i = null;
      function o(t, e) {
        if (!i) {
          var n = Object.keys(r);
          i = {};
          for (var o = 0; o < n.length; ++o) {
            var a = n[o];
            i[t[a]] = r[a];
          }
        }
        return i[e];
      }
    },
    '3UD+': function(t, e) {
      t.exports = function(t) {
        if (!t.webpackPolyfill) {
          var e = Object.create(t);
          e.children || (e.children = []),
            Object.defineProperty(e, 'loaded', {
              enumerable: !0,
              get: function() {
                return e.l;
              }
            }),
            Object.defineProperty(e, 'id', {
              enumerable: !0,
              get: function() {
                return e.i;
              }
            }),
            Object.defineProperty(e, 'exports', { enumerable: !0 }),
            (e.webpackPolyfill = 1);
        }
        return e;
      };
    },
    '3vis': function(t, e, n) {
      'use strict';
      n.r(e);
      n('p/9t'), n('RVtD'), n('pynx');
      var r = n('lO+P'),
        i = (n('cd9/'), n('uLzS')),
        o = n('u50I'),
        a = n('y81S'),
        s = n('Mutr'),
        l = n('cS2A'),
        c = (n('mkqU'), n('vHxl')),
        u = n('CvEI'),
        h = n('wdK6'),
        f = n('f26Q');
      Object(l.a)(),
        Object(i.a)(isMobile),
        Object(o.a)(),
        isMobile &&
          (Object(a.b)(
            'screenshots',
            CDPRED.screenshots.mobile,
            CDPRED.screenshots['1080p']
          ),
          Object(a.b)(
            'wallpapers',
            CDPRED.wallpapers.mobile,
            CDPRED.wallpapers['mobile-full']
          ),
          Object(a.b)('arts', CDPRED.arts.mobile, CDPRED.arts['1080p'])),
        Object(h.a)(),
        Object(a.a)(),
        Object(s.a)(isMobile),
        (window.onload = function() {
          Object(c.a)();
        });
      var p = document.querySelector('.l-header__play-button'),
        d = document.querySelector('.l-header__video');
      function m() {
        var t = p.getAttribute('href');
        Object(f.h)()
          ? window.open(t, '_blank')
          : /www.twitch.tv/.test(t)
          ? g(t)
          : window.playYouTube();
      }
      function g(t) {
        if (t) {
          var e,
            n = new r.modal({
              cssClass: ['video-modal'],
              closeMethods: ['overlay', 'escape'],
              beforeOpen: function() {
                document.dispatchEvent(new Event('modalOpen'));
              },
              onClose: function() {
                n.destroy(),
                  setTimeout(function() {
                    document.dispatchEvent(new Event('modalClose'));
                  }, 100);
              }
            }),
            i = document.createElement('div');
          if (
            (i.classList.add('video-modal__close'),
            i.setAttribute('onclick', 'videoModal.close()'),
            n.modal.appendChild(i),
            (window.videoModal = n),
            /www.twitch.tv/.test(t))
          ) {
            var o = new URL(t);
            e = 'https://player.twitch.tv/?channel='
              .concat(o.pathname.substr(1), '&parent=')
              .concat(location.host);
          } else {
            var a = Object(f.g)(t);
            e = 'https://www.youtube.com/embed/'.concat(a, '?autoplay=1');
          }
          n.setContent(
            '<iframe src="'.concat(
              e,
              '" frameborder="0" allow="autoplay"></iframe>'
            )
          ),
            n.open();
        }
      }
      d &&
        d.addEventListener('click', function(t) {
          if (isMobile) return !0;
          p && p.click();
        }),
        p &&
          p.addEventListener('click', function(t) {
            if (CDPRED.ageGate)
              t.stopPropagation(), t.preventDefault(), Object(u.a)(m);
            else {
              var e = p.getAttribute('href');
              /www.twitch.tv/.test(e) &&
                (t.stopPropagation(),
                t.preventDefault(),
                Object(f.h)() ? window.open(e, '_blank') : g(e));
            }
          });
    },
    '4JlD': function(t, e, n) {
      'use strict';
      var r = function(t) {
        switch (typeof t) {
          case 'string':
            return t;
          case 'boolean':
            return t ? 'true' : 'false';
          case 'number':
            return isFinite(t) ? t : '';
          default:
            return '';
        }
      };
      t.exports = function(t, e, n, s) {
        return (
          (e = e || '&'),
          (n = n || '='),
          null === t && (t = void 0),
          'object' == typeof t
            ? o(a(t), function(a) {
                var s = encodeURIComponent(r(a)) + n;
                return i(t[a])
                  ? o(t[a], function(t) {
                      return s + encodeURIComponent(r(t));
                    }).join(e)
                  : s + encodeURIComponent(r(t[a]));
              }).join(e)
            : s
            ? encodeURIComponent(r(s)) + n + encodeURIComponent(r(t))
            : ''
        );
      };
      var i =
        Array.isArray ||
        function(t) {
          return '[object Array]' === Object.prototype.toString.call(t);
        };
      function o(t, e) {
        if (t.map) return t.map(e);
        for (var n = [], r = 0; r < t.length; r++) n.push(e(t[r], r));
        return n;
      }
      var a =
        Object.keys ||
        function(t) {
          var e = [];
          for (var n in t)
            Object.prototype.hasOwnProperty.call(t, n) && e.push(n);
          return e;
        };
    },
    '4Z/T': function(t, e, n) {
      var r;
      !(function() {
        'use strict';
        var i = {
          not_string: /[^s]/,
          not_bool: /[^t]/,
          not_type: /[^T]/,
          not_primitive: /[^v]/,
          number: /[diefg]/,
          numeric_arg: /[bcdiefguxX]/,
          json: /[j]/,
          not_json: /[^j]/,
          text: /^[^\x25]+/,
          modulo: /^\x25{2}/,
          placeholder: /^\x25(?:([1-9]\d*)\$|\(([^)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijostTuvxX])/,
          key: /^([a-z_][a-z_\d]*)/i,
          key_access: /^\.([a-z_][a-z_\d]*)/i,
          index_access: /^\[(\d+)\]/,
          sign: /^[+-]/
        };
        function o(t) {
          return (function(t, e) {
            var n,
              r,
              a,
              s,
              l,
              c,
              u,
              h,
              f,
              p = 1,
              d = t.length,
              m = '';
            for (r = 0; r < d; r++)
              if ('string' == typeof t[r]) m += t[r];
              else if ('object' == typeof t[r]) {
                if ((s = t[r]).keys)
                  for (n = e[p], a = 0; a < s.keys.length; a++) {
                    if (null == n)
                      throw new Error(
                        o(
                          '[sprintf] Cannot access property "%s" of undefined value "%s"',
                          s.keys[a],
                          s.keys[a - 1]
                        )
                      );
                    n = n[s.keys[a]];
                  }
                else n = s.param_no ? e[s.param_no] : e[p++];
                if (
                  (i.not_type.test(s.type) &&
                    i.not_primitive.test(s.type) &&
                    n instanceof Function &&
                    (n = n()),
                  i.numeric_arg.test(s.type) &&
                    'number' != typeof n &&
                    isNaN(n))
                )
                  throw new TypeError(
                    o('[sprintf] expecting number but found %T', n)
                  );
                switch ((i.number.test(s.type) && (h = n >= 0), s.type)) {
                  case 'b':
                    n = parseInt(n, 10).toString(2);
                    break;
                  case 'c':
                    n = String.fromCharCode(parseInt(n, 10));
                    break;
                  case 'd':
                  case 'i':
                    n = parseInt(n, 10);
                    break;
                  case 'j':
                    n = JSON.stringify(
                      n,
                      null,
                      s.width ? parseInt(s.width) : 0
                    );
                    break;
                  case 'e':
                    n = s.precision
                      ? parseFloat(n).toExponential(s.precision)
                      : parseFloat(n).toExponential();
                    break;
                  case 'f':
                    n = s.precision
                      ? parseFloat(n).toFixed(s.precision)
                      : parseFloat(n);
                    break;
                  case 'g':
                    n = s.precision
                      ? String(Number(n.toPrecision(s.precision)))
                      : parseFloat(n);
                    break;
                  case 'o':
                    n = (parseInt(n, 10) >>> 0).toString(8);
                    break;
                  case 's':
                    (n = String(n)),
                      (n = s.precision ? n.substring(0, s.precision) : n);
                    break;
                  case 't':
                    (n = String(!!n)),
                      (n = s.precision ? n.substring(0, s.precision) : n);
                    break;
                  case 'T':
                    (n = Object.prototype.toString
                      .call(n)
                      .slice(8, -1)
                      .toLowerCase()),
                      (n = s.precision ? n.substring(0, s.precision) : n);
                    break;
                  case 'u':
                    n = parseInt(n, 10) >>> 0;
                    break;
                  case 'v':
                    (n = n.valueOf()),
                      (n = s.precision ? n.substring(0, s.precision) : n);
                    break;
                  case 'x':
                    n = (parseInt(n, 10) >>> 0).toString(16);
                    break;
                  case 'X':
                    n = (parseInt(n, 10) >>> 0).toString(16).toUpperCase();
                }
                i.json.test(s.type)
                  ? (m += n)
                  : (!i.number.test(s.type) || (h && !s.sign)
                      ? (f = '')
                      : ((f = h ? '+' : '-'),
                        (n = n.toString().replace(i.sign, ''))),
                    (c = s.pad_char
                      ? '0' === s.pad_char
                        ? '0'
                        : s.pad_char.charAt(1)
                      : ' '),
                    (u = s.width - (f + n).length),
                    (l = s.width && u > 0 ? c.repeat(u) : ''),
                    (m += s.align
                      ? f + n + l
                      : '0' === c
                      ? f + l + n
                      : l + f + n));
              }
            return m;
          })(
            (function(t) {
              if (s[t]) return s[t];
              var e,
                n = t,
                r = [],
                o = 0;
              for (; n; ) {
                if (null !== (e = i.text.exec(n))) r.push(e[0]);
                else if (null !== (e = i.modulo.exec(n))) r.push('%');
                else {
                  if (null === (e = i.placeholder.exec(n)))
                    throw new SyntaxError('[sprintf] unexpected placeholder');
                  if (e[2]) {
                    o |= 1;
                    var a = [],
                      l = e[2],
                      c = [];
                    if (null === (c = i.key.exec(l)))
                      throw new SyntaxError(
                        '[sprintf] failed to parse named argument key'
                      );
                    for (a.push(c[1]); '' !== (l = l.substring(c[0].length)); )
                      if (null !== (c = i.key_access.exec(l))) a.push(c[1]);
                      else {
                        if (null === (c = i.index_access.exec(l)))
                          throw new SyntaxError(
                            '[sprintf] failed to parse named argument key'
                          );
                        a.push(c[1]);
                      }
                    e[2] = a;
                  } else o |= 2;
                  if (3 === o)
                    throw new Error(
                      '[sprintf] mixing positional and named placeholders is not (yet) supported'
                    );
                  r.push({
                    placeholder: e[0],
                    param_no: e[1],
                    keys: e[2],
                    sign: e[3],
                    pad_char: e[4],
                    align: e[5],
                    width: e[6],
                    precision: e[7],
                    type: e[8]
                  });
                }
                n = n.substring(e[0].length);
              }
              return (s[t] = r);
            })(t),
            arguments
          );
        }
        function a(t, e) {
          return o.apply(null, [t].concat(e || []));
        }
        var s = Object.create(null);
        (e.sprintf = o),
          (e.vsprintf = a),
          'undefined' != typeof window &&
            ((window.sprintf = o),
            (window.vsprintf = a),
            void 0 ===
              (r = function() {
                return { sprintf: o, vsprintf: a };
              }.call(e, n, e, t)) || (t.exports = r));
      })();
    },
    '63NL': function(t, e, n) {
      'use strict';
      t.exports = function(t, e) {
        for (var n = {}, r = 0; r < t.length; ++r)
          for (
            var i = t[r].name, o = i.split('.'), a = n, s = 0;
            s < o.length;
            ++s
          ) {
            var l = o[s].split('[');
            if (l.length > 1) {
              l[0] in a || (a[l[0]] = []), (a = a[l[0]]);
              for (var c = 1; c < l.length; ++c) {
                var u = parseInt(l[c]);
                c < l.length - 1 || s < o.length - 1
                  ? (u in a || (c < l.length - 1 ? (a[u] = []) : (a[u] = {})),
                    (a = a[u]))
                  : (a[u] = e ? r : t[r].type);
              }
            } else
              s < o.length - 1
                ? (l[0] in a || (a[l[0]] = {}), (a = a[l[0]]))
                : (a[l[0]] = e ? r : t[r].type);
          }
        return n;
      };
    },
    '6ozI': function(t, e, n) {
      'use strict';
      var r = n('XpGV'),
        i = n('VADU'),
        o = n('LxBP'),
        a = n('I14Z'),
        s = function(t, e, n) {
          t.style.setProperty(e, n, t.style.getPropertyPriority(e));
        },
        l = function(t) {
          return t.filter(function(t) {
            return (
              t.type === window.CSSRule.STYLE_RULE &&
              (t.style.getPropertyValue('background-image') ||
                t.style.getPropertyValue('background'))
            );
          });
        },
        c = function(t) {
          var e = [];
          return (
            t.forEach(function(t) {
              t.style.getPropertyValue('background-image')
                ? e.push({
                    property: 'background-image',
                    value: t.style.getPropertyValue('background-image'),
                    rule: t
                  })
                : t.style.getPropertyValue('background') &&
                  e.push({
                    property: 'background',
                    value: t.style.getPropertyValue('background'),
                    rule: t
                  });
            }),
            e
          );
        },
        u = function(t) {
          return t.filter(function(t) {
            return (
              t.type === window.CSSRule.FONT_FACE_RULE &&
              t.style.getPropertyValue('src')
            );
          });
        },
        h = function(t) {
          return t.filter(function(t) {
            return t.type === window.CSSRule.IMPORT_RULE && t.href;
          });
        },
        f = function(t) {
          var e = [];
          return (
            t.forEach(function(t, n) {
              t.url && !r.isDataUri(t.url) && e.push(n);
            }),
            e
          );
        },
        p = function(t) {
          var e = [];
          return (
            t.forEach(function(t, n) {
              t.url && !r.isDataUri(t.url) && e.push(n);
            }),
            e
          );
        };
      e.adjustPathsOfCssResources = function(t, e) {
        var n = l(e),
          d = c(n),
          m = !1;
        return (
          d.forEach(function(e) {
            var n,
              i = o.parse(e.value),
              a = f(i);
            a.length > 0 &&
              (a.forEach(function(e) {
                var n = i[e].url,
                  o = r.joinUrl(t, n);
                i[e].url = o;
              }),
              (n = o.serialize(i)),
              s(e.rule, e.property, n),
              (m = !0));
          }),
          u(e).forEach(function(n) {
            var o,
              s,
              l = n.style.getPropertyValue('src');
            try {
              o = a.parse(l);
            } catch (t) {
              return;
            }
            (s = p(o)).length > 0 &&
              (s.forEach(function(e) {
                var n = o[e].url,
                  i = r.joinUrl(t, n);
                o[e].url = i;
              }),
              i.changeFontFaceRuleSrc(e, n, a.serialize(o)),
              (m = !0));
          }),
          h(e).forEach(function(n) {
            var o = n.href,
              a = r.joinUrl(t, o);
            i.exchangeRule(e, n, '@import url(' + a + ');'), (m = !0);
          }),
          m
        );
      };
      var d = function(t, e, n) {
        var r = t.indexOf(e);
        t.splice(r, 1),
          n.forEach(function(e, n) {
            t.splice(r + n, 0, e);
          });
      };
      e.loadCSSImportsForRules = function(t, n, o) {
        var a = h(t),
          s = [],
          l = !1;
        return Promise.all(
          a.map(function(a) {
            return (function(t, n, o, a) {
              var s,
                l = n.href;
              return (
                (l = i.unquoteString(l)),
                (s = r.joinUrl(a.baseUrl, l)),
                o.indexOf(s) >= 0
                  ? (d(t, n, []), Promise.resolve([]))
                  : (o.push(s),
                    r.ajax(l, a).then(
                      function(r) {
                        var s = i.rulesForCssText(r);
                        return e
                          .loadCSSImportsForRules(s, o, a)
                          .then(function(r) {
                            return (
                              e.adjustPathsOfCssResources(l, s),
                              d(t, n, s),
                              r.errors
                            );
                          });
                      },
                      function(t) {
                        throw {
                          resourceType: 'stylesheet',
                          url: t.url,
                          msg: 'Unable to load stylesheet ' + t.url
                        };
                      }
                    ))
              );
            })(t, a, n, o).then(
              function(t) {
                (s = s.concat(t)), (l = !0);
              },
              function(t) {
                s.push(t);
              }
            );
          })
        ).then(function() {
          return { hasChanges: l, errors: s };
        });
      };
      var m = function(t, e) {
          var n = l(t),
            i = c(n),
            a = [],
            u = !1;
          return Promise.all(
            i.map(function(t) {
              return (function(t, e) {
                var n = o.parse(t),
                  i = f(n),
                  a = !1;
                return r
                  .collectAndReportErrors(
                    i.map(function(t) {
                      var i = n[t].url;
                      return r.getDataURIForImageURL(i, e).then(
                        function(e) {
                          (n[t].url = e), (a = !0);
                        },
                        function(t) {
                          throw {
                            resourceType: 'backgroundImage',
                            url: t.url,
                            msg: 'Unable to load background-image ' + t.url
                          };
                        }
                      );
                    })
                  )
                  .then(function(t) {
                    return {
                      backgroundValue: o.serialize(n),
                      hasChanges: a,
                      errors: t
                    };
                  });
              })(t.value, e).then(function(e) {
                e.hasChanges &&
                  (s(t.rule, t.property, e.backgroundValue), (u = !0)),
                  (a = a.concat(e.errors));
              });
            })
          ).then(function() {
            return { hasChanges: u, errors: a };
          });
        },
        g = function(t, e) {
          var n = u(t),
            o = [],
            s = !1;
          return Promise.all(
            n.map(function(n) {
              return (function(t, e) {
                var n,
                  i,
                  o = !1;
                try {
                  n = a.parse(t);
                } catch (t) {
                  n = [];
                }
                return (
                  (i = p(n)),
                  r
                    .collectAndReportErrors(
                      i.map(function(t) {
                        var i = n[t],
                          a = i.format || 'woff';
                        return r.binaryAjax(i.url, e).then(
                          function(t) {
                            var e = btoa(t);
                            (i.url = 'data:font/' + a + ';base64,' + e),
                              (o = !0);
                          },
                          function(t) {
                            throw {
                              resourceType: 'fontFace',
                              url: t.url,
                              msg: 'Unable to load font-face ' + t.url
                            };
                          }
                        );
                      })
                    )
                    .then(function(t) {
                      return {
                        srcDeclarationValue: a.serialize(n),
                        hasChanges: o,
                        errors: t
                      };
                    })
                );
              })(n.style.getPropertyValue('src'), e).then(function(e) {
                e.hasChanges &&
                  (i.changeFontFaceRuleSrc(t, n, e.srcDeclarationValue),
                  (s = !0)),
                  (o = o.concat(e.errors));
              });
            })
          ).then(function() {
            return { hasChanges: s, errors: o };
          });
        };
      e.loadAndInlineCSSResourcesForRules = function(t, e) {
        var n = !1,
          r = [];
        return Promise.all(
          [m, g].map(function(i) {
            return i(t, e).then(function(t) {
              (n = n || t.hasChanges), (r = r.concat(t.errors));
            });
          })
        ).then(function() {
          return { hasChanges: n, errors: r };
        });
      };
    },
    '6v/u': function(t, e) {
      t.exports = function(t) {
        return atob(t);
      };
    },
    '9fJb': function(t, e, n) {
      var r = n('GTa7');
      t.exports = r
        .slice()
        .concat([
          'layout',
          'centroid',
          'smooth',
          'case',
          'mat2x2',
          'mat2x3',
          'mat2x4',
          'mat3x2',
          'mat3x3',
          'mat3x4',
          'mat4x2',
          'mat4x3',
          'mat4x4',
          'uvec2',
          'uvec3',
          'uvec4',
          'samplerCubeShadow',
          'sampler2DArray',
          'sampler2DArrayShadow',
          'isampler2D',
          'isampler3D',
          'isamplerCube',
          'isampler2DArray',
          'usampler2D',
          'usampler3D',
          'usamplerCube',
          'usampler2DArray',
          'coherent',
          'restrict',
          'readonly',
          'writeonly',
          'resource',
          'atomic_uint',
          'noperspective',
          'patch',
          'sample',
          'subroutine',
          'common',
          'partition',
          'active',
          'filter',
          'image1D',
          'image2D',
          'image3D',
          'imageCube',
          'iimage1D',
          'iimage2D',
          'iimage3D',
          'iimageCube',
          'uimage1D',
          'uimage2D',
          'uimage3D',
          'uimageCube',
          'image1DArray',
          'image2DArray',
          'iimage1DArray',
          'iimage2DArray',
          'uimage1DArray',
          'uimage2DArray',
          'image1DShadow',
          'image2DShadow',
          'image1DArrayShadow',
          'image2DArrayShadow',
          'imageBuffer',
          'iimageBuffer',
          'uimageBuffer',
          'sampler1DArray',
          'sampler1DArrayShadow',
          'isampler1D',
          'isampler1DArray',
          'usampler1D',
          'usampler1DArray',
          'isampler2DRect',
          'usampler2DRect',
          'samplerBuffer',
          'isamplerBuffer',
          'usamplerBuffer',
          'sampler2DMS',
          'isampler2DMS',
          'usampler2DMS',
          'sampler2DMSArray',
          'isampler2DMSArray',
          'usampler2DMSArray'
        ]);
    },
    AAS3: function(t, e, n) {
      var r = n('hYYf');
      t.exports = function(t, e) {
        var n = r(e),
          i = [];
        return (i = (i = i.concat(n(t))).concat(n(null)));
      };
    },
    AP2z: function(t, e, n) {
      var r = n('nmnc'),
        i = Object.prototype,
        o = i.hasOwnProperty,
        a = i.toString,
        s = r ? r.toStringTag : void 0;
      t.exports = function(t) {
        var e = o.call(t, s),
          n = t[s];
        try {
          t[s] = void 0;
          var r = !0;
        } catch (t) {}
        var i = a.call(t);
        return r && (e ? (t[s] = n) : delete t[s]), i;
      };
    },
    B9vp: function(t, e, n) {
      var r = n('4Z/T').sprintf,
        i = n('tCpK'),
        o = n('st01'),
        a = n('kR76');
      t.exports = function(t, e, n) {
        'use strict';
        var s = o(e) || 'of unknown name (see npm glsl-shader-name)',
          l = 'unknown type';
        void 0 !== n && (l = n === i.FRAGMENT_SHADER ? 'fragment' : 'vertex');
        for (
          var c = r('Error compiling %s shader %s:\n', l, s),
            u = r('%s%s', c, t),
            h = t.split('\n'),
            f = {},
            p = 0;
          p < h.length;
          p++
        ) {
          var d = h[p];
          if ('' !== d && '\0' !== d) {
            var m = parseInt(d.split(':')[2]);
            if (isNaN(m)) throw new Error(r('Could not parse error: %s', d));
            f[m] = d;
          }
        }
        for (var g = a(e).split('\n'), p = 0; p < g.length; p++)
          if (f[p + 3] || f[p + 2] || f[p + 1]) {
            var v = g[p];
            if (((c += v + '\n'), f[p + 1])) {
              var _ = f[p + 1];
              (_ = _.substr(_.split(':', 3).join(':').length + 1).trim()),
                (c += r('^^^ %s\n\n', _));
            }
          }
        return { long: c.trim(), short: u.trim() };
      };
    },
    BEtg: function(t, e) {
      function n(t) {
        return (
          !!t.constructor &&
          'function' == typeof t.constructor.isBuffer &&
          t.constructor.isBuffer(t)
        );
      }
      /*!
       * Determine if an object is a Buffer
       *
       * @author   Feross Aboukhadijeh <https://feross.org>
       * @license  MIT
       */
      t.exports = function(t) {
        return (
          null != t &&
          (n(t) ||
            (function(t) {
              return (
                'function' == typeof t.readFloatLE &&
                'function' == typeof t.slice &&
                n(t.slice(0, 0))
              );
            })(t) ||
            !!t._isBuffer)
        );
      };
    },
    BkhO: function(t, e, n) {
      var r = n('Xs3h');
      (r = r.slice().filter(function(t) {
        return !/^(gl\_|texture)/.test(t);
      })),
        (t.exports = r.concat([
          'gl_VertexID',
          'gl_InstanceID',
          'gl_Position',
          'gl_PointSize',
          'gl_FragCoord',
          'gl_FrontFacing',
          'gl_FragDepth',
          'gl_PointCoord',
          'gl_MaxVertexAttribs',
          'gl_MaxVertexUniformVectors',
          'gl_MaxVertexOutputVectors',
          'gl_MaxFragmentInputVectors',
          'gl_MaxVertexTextureImageUnits',
          'gl_MaxCombinedTextureImageUnits',
          'gl_MaxTextureImageUnits',
          'gl_MaxFragmentUniformVectors',
          'gl_MaxDrawBuffers',
          'gl_MinProgramTexelOffset',
          'gl_MaxProgramTexelOffset',
          'gl_DepthRangeParameters',
          'gl_DepthRange',
          'trunc',
          'round',
          'roundEven',
          'isnan',
          'isinf',
          'floatBitsToInt',
          'floatBitsToUint',
          'intBitsToFloat',
          'uintBitsToFloat',
          'packSnorm2x16',
          'unpackSnorm2x16',
          'packUnorm2x16',
          'unpackUnorm2x16',
          'packHalf2x16',
          'unpackHalf2x16',
          'outerProduct',
          'transpose',
          'determinant',
          'inverse',
          'texture',
          'textureSize',
          'textureProj',
          'textureLod',
          'textureOffset',
          'texelFetch',
          'texelFetchOffset',
          'textureProjOffset',
          'textureLodOffset',
          'textureProjLod',
          'textureProjLodOffset',
          'textureGrad',
          'textureGradOffset',
          'textureProjGrad',
          'textureProjGradOffset'
        ]));
    },
    CvEI: function(t, e, n) {
      'use strict';
      n.d(e, 'a', function() {
        return p;
      });
      var r = n('lO+P'),
        i = (n('cd9/'), n('f26Q'));
      function o(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            'value' in r && (r.writable = !0),
            Object.defineProperty(t, r.key, r);
        }
      }
      var a = 1,
        s = 0,
        l = 'agegate';
      function c(t, e) {
        var n = document.querySelector(t),
          r = n.querySelectorAll(e),
          i = r[0],
          o = r[r.length - 1];
        n.addEventListener('keydown', function(t) {
          ('Tab' === t.key || 9 === t.keyCode) &&
            (t.shiftKey
              ? document.activeElement.getAttribute('id') ===
                  i.getAttribute('id') && (o.focus(), t.preventDefault())
              : document.activeElement.getAttribute('id') ===
                  o.getAttribute('id') && (i.focus(), t.preventDefault()));
        });
      }
      function u(t) {
        document.documentElement.classList.remove('scroll-auto'), t.destroy();
      }
      function h(t) {
        null === Object(i.i)(l) && Object(i.b)(l, t, 365);
      }
      window.onlyNumberKey = function(t) {
        var e = t.value,
          n = parseInt(t.getAttribute('maxlength'));
        /^\d+$/.test(e) ? (e = t.value) : (t.value = e),
          e.length >= n && ((e = t.value.substring(0, n)), (t.value = e));
      };
      var f = (function() {
        function t(e, n) {
          !(function(t, e) {
            if (!(t instanceof e))
              throw new TypeError('Cannot call a class as a function');
          })(this, t),
            (this.containerClass = e),
            (this.onAllow = n),
            (this.day = null),
            (this.month = null),
            (this.year = null),
            (this.formButton = null),
            (this.ageGate = document.querySelector('.age-gate'));
        }
        var e, n, i;
        return (
          (e = t),
          (n = [
            {
              key: 'checkFilledInputs',
              value: function(t) {
                for (
                  var e, n, r, i, o, l, c = t.querySelectorAll('input'), u = 0;
                  u < c.length;
                  u++
                )
                  switch (c[u].getAttribute('id')) {
                    case 'month':
                      this.month = parseInt(c[u].value);
                      break;
                    case 'day':
                      this.day = parseInt(c[u].value);
                      break;
                    case 'year':
                      this.year = parseInt(c[u].value);
                  }
                return (
                  (e = this.day),
                  (n = this.month),
                  (r = this.year),
                  (i = 18),
                  (o = new Date()),
                  (l = new Date()),
                  !(
                    !(e && n && r) ||
                    r < 1900 ||
                    n > 12 ||
                    n < 1 ||
                    e > 31 ||
                    e < 1 ||
                    r >= o.getFullYear()
                  ) &&
                  (o.setFullYear(o.getFullYear() - i),
                  l.setFullYear(r, n - 1, e),
                  o - l >= 0)
                    ? (h(a), !1)
                    : (h(s), !0)
                );
              }
            },
            {
              key: 'enableBtn',
              value: function(t) {
                for (var e = 0; e < t.length; e++)
                  switch (t[e].getAttribute('id')) {
                    case 'month':
                      this.month = t[e].value;
                      break;
                    case 'day':
                      this.day = t[e].value;
                      break;
                    case 'year':
                      this.year = t[e].value;
                  }
                var n, r, i, o;
                (n = this.day),
                  (r = this.month),
                  (i = this.year),
                  (o = new Date()),
                  new Date(),
                  !(n && r && i) ||
                  i < 1900 ||
                  r > 12 ||
                  r < 1 ||
                  n > 31 ||
                  n < 1 ||
                  i >= o.getFullYear()
                    ? ((this.formButton.disabled = !0),
                      this.formButton.parentNode.classList.add('disabled'))
                    : ((this.formButton.disabled = !1),
                      this.formButton.parentNode.classList.remove('disabled'));
              }
            },
            {
              key: 'setInputsEvents',
              value: function(t) {
                for (var e = this, n = 0; n < t.length; n++)
                  t[n].addEventListener('input', function(n) {
                    var r, i, o, a;
                    n.preventDefault(),
                      '' !== n.target.value &&
                        ((r = n.target),
                        (i = parseInt(r.getAttribute('maxlength'))),
                        (o = parseInt(r.getAttribute('max'))),
                        (a = r.value).length === i &&
                          a <= o &&
                          r.parentNode.nextSibling.querySelector('input') &&
                          r.parentNode.nextSibling
                            .querySelector('input')
                            .focus()),
                      e.enableBtn(t);
                  });
              }
            },
            {
              key: 'onOverlayButtonClick',
              value: function(t) {
                t.preventDefault(),
                  this.checkFilledInputs(t.target.form)
                    ? (this.container.classList.add('warning'),
                      c('.'.concat(this.containerClass), '.age-gate__warning'))
                    : (this.onAllow && this.onAllow(),
                      setTimeout(function() {
                        window.ageGateModal.close();
                      }, 300));
              }
            },
            {
              key: 'ageGateOverlay',
              value: function() {
                var t =
                    arguments.length > 0 &&
                    void 0 !== arguments[0] &&
                    arguments[0],
                  e = this,
                  n = new r.modal({
                    footer: !1,
                    stickyFooter: !1,
                    cssClass: [e.containerClass, t ? 'warning' : null],
                    beforeOpen: function() {
                      e.initContainer.call(e),
                        e.initContent.call(e),
                        e.container.addEventListener('transitionend', function(
                          t
                        ) {
                          e.container
                            .querySelector('.age-gate__input-box input')
                            .focus();
                        });
                    },
                    onOpen: function() {
                      document.documentElement.classList.add('scroll-auto'),
                        e.formButton.addEventListener(
                          'click',
                          e.onOverlayButtonClick.bind(e)
                        ),
                        c(
                          '.'.concat(e.containerClass),
                          t ? '.age-gate__warning' : 'input'
                        );
                    },
                    onClose: function() {
                      u(n);
                    }
                  });
                (window.ageGateModal = n),
                  n.setContent(this.ageGate.innerHTML),
                  n.open();
              }
            },
            {
              key: 'ageGateFrame',
              value: function() {
                var t =
                  arguments.length > 0 &&
                  void 0 !== arguments[0] &&
                  arguments[0];
                this.initContainer(),
                  t && this.container.classList.add('warning'),
                  (this.container.innerHTML = this.ageGate.innerHTML),
                  this.initContent(),
                  this.formButton.addEventListener(
                    'click',
                    this.onClickFrameButton.bind(this)
                  );
              }
            },
            {
              key: 'onClickFrameButton',
              value: function(t) {
                t.preventDefault(),
                  this.checkFilledInputs(t.target.form)
                    ? this.container.classList.add('warning')
                    : (this.container.parentNode.removeChild(this.container),
                      document.dispatchEvent(new Event('enableVideos')));
              }
            },
            {
              key: 'initContainer',
              value: function() {
                this.container = document.querySelector(
                  '.'.concat(this.containerClass)
                );
              }
            },
            {
              key: 'initContent',
              value: function() {
                this.formButton = this.container.querySelector(
                  '.age-gate__button-container button'
                );
                var t = this.container.querySelectorAll(
                  '.age-gate__input-box input'
                );
                this.setInputsEvents(t),
                  this.container.setAttribute('tabindex', '-1');
              }
            }
          ]) && o(e.prototype, n),
          i && o(e, i),
          t
        );
      })();
      function p(t) {
        var e = parseInt(Object(i.i)(l));
        e === a
          ? t && t()
          : e === s
          ? new f('age-gate__layer', t).ageGateOverlay(!0)
          : new f('age-gate__layer', t).ageGateOverlay();
      }
      if (CDPRED.ageGate) {
        var d = parseInt(Object(i.i)(l));
        if (d === a) {
          var m = document.querySelector('.age-gate__frame');
          m && m.parentNode.removeChild(m);
        } else
          d === s
            ? new f('age-gate__frame').ageGateFrame(!0)
            : new f('age-gate__frame').ageGateFrame();
      }
    },
    CxY0: function(t, e, n) {
      'use strict';
      var r = n('nYho'),
        i = n('Nehr');
      function o() {
        (this.protocol = null),
          (this.slashes = null),
          (this.auth = null),
          (this.host = null),
          (this.port = null),
          (this.hostname = null),
          (this.hash = null),
          (this.search = null),
          (this.query = null),
          (this.pathname = null),
          (this.path = null),
          (this.href = null);
      }
      (e.parse = y),
        (e.resolve = function(t, e) {
          return y(t, !1, !0).resolve(e);
        }),
        (e.resolveObject = function(t, e) {
          return t ? y(t, !1, !0).resolveObject(e) : e;
        }),
        (e.format = function(t) {
          i.isString(t) && (t = y(t));
          return t instanceof o ? t.format() : o.prototype.format.call(t);
        }),
        (e.Url = o);
      var a = /^([a-z0-9.+-]+:)/i,
        s = /:[0-9]*$/,
        l = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
        c = ['{', '}', '|', '\\', '^', '`'].concat([
          '<',
          '>',
          '"',
          '`',
          ' ',
          '\r',
          '\n',
          '\t'
        ]),
        u = ["'"].concat(c),
        h = ['%', '/', '?', ';', '#'].concat(u),
        f = ['/', '?', '#'],
        p = /^[+a-z0-9A-Z_-]{0,63}$/,
        d = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
        m = { javascript: !0, 'javascript:': !0 },
        g = { javascript: !0, 'javascript:': !0 },
        v = {
          http: !0,
          https: !0,
          ftp: !0,
          gopher: !0,
          file: !0,
          'http:': !0,
          'https:': !0,
          'ftp:': !0,
          'gopher:': !0,
          'file:': !0
        },
        _ = n('s4NR');
      function y(t, e, n) {
        if (t && i.isObject(t) && t instanceof o) return t;
        var r = new o();
        return r.parse(t, e, n), r;
      }
      (o.prototype.parse = function(t, e, n) {
        if (!i.isString(t))
          throw new TypeError(
            "Parameter 'url' must be a string, not " + typeof t
          );
        var o = t.indexOf('?'),
          s = -1 !== o && o < t.indexOf('#') ? '?' : '#',
          c = t.split(s);
        c[0] = c[0].replace(/\\/g, '/');
        var y = (t = c.join(s));
        if (((y = y.trim()), !n && 1 === t.split('#').length)) {
          var b = l.exec(y);
          if (b)
            return (
              (this.path = y),
              (this.href = y),
              (this.pathname = b[1]),
              b[2]
                ? ((this.search = b[2]),
                  (this.query = e
                    ? _.parse(this.search.substr(1))
                    : this.search.substr(1)))
                : e && ((this.search = ''), (this.query = {})),
              this
            );
        }
        var T = a.exec(y);
        if (T) {
          var x = (T = T[0]).toLowerCase();
          (this.protocol = x), (y = y.substr(T.length));
        }
        if (n || T || y.match(/^\/\/[^@\/]+@[^@\/]+/)) {
          var w = '//' === y.substr(0, 2);
          !w || (T && g[T]) || ((y = y.substr(2)), (this.slashes = !0));
        }
        if (!g[T] && (w || (T && !v[T]))) {
          for (var E, A, C = -1, P = 0; P < f.length; P++) {
            -1 !== (R = y.indexOf(f[P])) && (-1 === C || R < C) && (C = R);
          }
          -1 !== (A = -1 === C ? y.lastIndexOf('@') : y.lastIndexOf('@', C)) &&
            ((E = y.slice(0, A)),
            (y = y.slice(A + 1)),
            (this.auth = decodeURIComponent(E))),
            (C = -1);
          for (P = 0; P < h.length; P++) {
            var R;
            -1 !== (R = y.indexOf(h[P])) && (-1 === C || R < C) && (C = R);
          }
          -1 === C && (C = y.length),
            (this.host = y.slice(0, C)),
            (y = y.slice(C)),
            this.parseHost(),
            (this.hostname = this.hostname || '');
          var I =
            '[' === this.hostname[0] &&
            ']' === this.hostname[this.hostname.length - 1];
          if (!I)
            for (
              var S = this.hostname.split(/\./), M = ((P = 0), S.length);
              P < M;
              P++
            ) {
              var O = S[P];
              if (O && !O.match(p)) {
                for (var k = '', N = 0, D = O.length; N < D; N++)
                  O.charCodeAt(N) > 127 ? (k += 'x') : (k += O[N]);
                if (!k.match(p)) {
                  var F = S.slice(0, P),
                    L = S.slice(P + 1),
                    U = O.match(d);
                  U && (F.push(U[1]), L.unshift(U[2])),
                    L.length && (y = '/' + L.join('.') + y),
                    (this.hostname = F.join('.'));
                  break;
                }
              }
            }
          this.hostname.length > 255
            ? (this.hostname = '')
            : (this.hostname = this.hostname.toLowerCase()),
            I || (this.hostname = r.toASCII(this.hostname));
          var B = this.port ? ':' + this.port : '',
            z = this.hostname || '';
          (this.host = z + B),
            (this.href += this.host),
            I &&
              ((this.hostname = this.hostname.substr(
                1,
                this.hostname.length - 2
              )),
              '/' !== y[0] && (y = '/' + y));
        }
        if (!m[x])
          for (P = 0, M = u.length; P < M; P++) {
            var j = u[P];
            if (-1 !== y.indexOf(j)) {
              var V = encodeURIComponent(j);
              V === j && (V = escape(j)), (y = y.split(j).join(V));
            }
          }
        var X = y.indexOf('#');
        -1 !== X && ((this.hash = y.substr(X)), (y = y.slice(0, X)));
        var q = y.indexOf('?');
        if (
          (-1 !== q
            ? ((this.search = y.substr(q)),
              (this.query = y.substr(q + 1)),
              e && (this.query = _.parse(this.query)),
              (y = y.slice(0, q)))
            : e && ((this.search = ''), (this.query = {})),
          y && (this.pathname = y),
          v[x] && this.hostname && !this.pathname && (this.pathname = '/'),
          this.pathname || this.search)
        ) {
          B = this.pathname || '';
          var H = this.search || '';
          this.path = B + H;
        }
        return (this.href = this.format()), this;
      }),
        (o.prototype.format = function() {
          var t = this.auth || '';
          t &&
            ((t = (t = encodeURIComponent(t)).replace(/%3A/i, ':')),
            (t += '@'));
          var e = this.protocol || '',
            n = this.pathname || '',
            r = this.hash || '',
            o = !1,
            a = '';
          this.host
            ? (o = t + this.host)
            : this.hostname &&
              ((o =
                t +
                (-1 === this.hostname.indexOf(':')
                  ? this.hostname
                  : '[' + this.hostname + ']')),
              this.port && (o += ':' + this.port)),
            this.query &&
              i.isObject(this.query) &&
              Object.keys(this.query).length &&
              (a = _.stringify(this.query));
          var s = this.search || (a && '?' + a) || '';
          return (
            e && ':' !== e.substr(-1) && (e += ':'),
            this.slashes || ((!e || v[e]) && !1 !== o)
              ? ((o = '//' + (o || '')),
                n && '/' !== n.charAt(0) && (n = '/' + n))
              : o || (o = ''),
            r && '#' !== r.charAt(0) && (r = '#' + r),
            s && '?' !== s.charAt(0) && (s = '?' + s),
            e +
              o +
              (n = n.replace(/[?#]/g, function(t) {
                return encodeURIComponent(t);
              })) +
              (s = s.replace('#', '%23')) +
              r
          );
        }),
        (o.prototype.resolve = function(t) {
          return this.resolveObject(y(t, !1, !0)).format();
        }),
        (o.prototype.resolveObject = function(t) {
          if (i.isString(t)) {
            var e = new o();
            e.parse(t, !1, !0), (t = e);
          }
          for (
            var n = new o(), r = Object.keys(this), a = 0;
            a < r.length;
            a++
          ) {
            var s = r[a];
            n[s] = this[s];
          }
          if (((n.hash = t.hash), '' === t.href))
            return (n.href = n.format()), n;
          if (t.slashes && !t.protocol) {
            for (var l = Object.keys(t), c = 0; c < l.length; c++) {
              var u = l[c];
              'protocol' !== u && (n[u] = t[u]);
            }
            return (
              v[n.protocol] &&
                n.hostname &&
                !n.pathname &&
                (n.path = n.pathname = '/'),
              (n.href = n.format()),
              n
            );
          }
          if (t.protocol && t.protocol !== n.protocol) {
            if (!v[t.protocol]) {
              for (var h = Object.keys(t), f = 0; f < h.length; f++) {
                var p = h[f];
                n[p] = t[p];
              }
              return (n.href = n.format()), n;
            }
            if (((n.protocol = t.protocol), t.host || g[t.protocol]))
              n.pathname = t.pathname;
            else {
              for (
                var d = (t.pathname || '').split('/');
                d.length && !(t.host = d.shift());

              );
              t.host || (t.host = ''),
                t.hostname || (t.hostname = ''),
                '' !== d[0] && d.unshift(''),
                d.length < 2 && d.unshift(''),
                (n.pathname = d.join('/'));
            }
            if (
              ((n.search = t.search),
              (n.query = t.query),
              (n.host = t.host || ''),
              (n.auth = t.auth),
              (n.hostname = t.hostname || t.host),
              (n.port = t.port),
              n.pathname || n.search)
            ) {
              var m = n.pathname || '',
                _ = n.search || '';
              n.path = m + _;
            }
            return (
              (n.slashes = n.slashes || t.slashes), (n.href = n.format()), n
            );
          }
          var y = n.pathname && '/' === n.pathname.charAt(0),
            b = t.host || (t.pathname && '/' === t.pathname.charAt(0)),
            T = b || y || (n.host && t.pathname),
            x = T,
            w = (n.pathname && n.pathname.split('/')) || [],
            E =
              ((d = (t.pathname && t.pathname.split('/')) || []),
              n.protocol && !v[n.protocol]);
          if (
            (E &&
              ((n.hostname = ''),
              (n.port = null),
              n.host && ('' === w[0] ? (w[0] = n.host) : w.unshift(n.host)),
              (n.host = ''),
              t.protocol &&
                ((t.hostname = null),
                (t.port = null),
                t.host && ('' === d[0] ? (d[0] = t.host) : d.unshift(t.host)),
                (t.host = null)),
              (T = T && ('' === d[0] || '' === w[0]))),
            b)
          )
            (n.host = t.host || '' === t.host ? t.host : n.host),
              (n.hostname =
                t.hostname || '' === t.hostname ? t.hostname : n.hostname),
              (n.search = t.search),
              (n.query = t.query),
              (w = d);
          else if (d.length)
            w || (w = []),
              w.pop(),
              (w = w.concat(d)),
              (n.search = t.search),
              (n.query = t.query);
          else if (!i.isNullOrUndefined(t.search)) {
            if (E)
              (n.hostname = n.host = w.shift()),
                (I =
                  !!(n.host && n.host.indexOf('@') > 0) && n.host.split('@')) &&
                  ((n.auth = I.shift()), (n.host = n.hostname = I.shift()));
            return (
              (n.search = t.search),
              (n.query = t.query),
              (i.isNull(n.pathname) && i.isNull(n.search)) ||
                (n.path =
                  (n.pathname ? n.pathname : '') + (n.search ? n.search : '')),
              (n.href = n.format()),
              n
            );
          }
          if (!w.length)
            return (
              (n.pathname = null),
              n.search ? (n.path = '/' + n.search) : (n.path = null),
              (n.href = n.format()),
              n
            );
          for (
            var A = w.slice(-1)[0],
              C =
                ((n.host || t.host || w.length > 1) &&
                  ('.' === A || '..' === A)) ||
                '' === A,
              P = 0,
              R = w.length;
            R >= 0;
            R--
          )
            '.' === (A = w[R])
              ? w.splice(R, 1)
              : '..' === A
              ? (w.splice(R, 1), P++)
              : P && (w.splice(R, 1), P--);
          if (!T && !x) for (; P--; P) w.unshift('..');
          !T ||
            '' === w[0] ||
            (w[0] && '/' === w[0].charAt(0)) ||
            w.unshift(''),
            C && '/' !== w.join('/').substr(-1) && w.push('');
          var I,
            S = '' === w[0] || (w[0] && '/' === w[0].charAt(0));
          E &&
            ((n.hostname = n.host = S ? '' : w.length ? w.shift() : ''),
            (I = !!(n.host && n.host.indexOf('@') > 0) && n.host.split('@')) &&
              ((n.auth = I.shift()), (n.host = n.hostname = I.shift())));
          return (
            (T = T || (n.host && w.length)) && !S && w.unshift(''),
            w.length
              ? (n.pathname = w.join('/'))
              : ((n.pathname = null), (n.path = null)),
            (i.isNull(n.pathname) && i.isNull(n.search)) ||
              (n.path =
                (n.pathname ? n.pathname : '') + (n.search ? n.search : '')),
            (n.auth = t.auth || n.auth),
            (n.slashes = n.slashes || t.slashes),
            (n.href = n.format()),
            n
          );
        }),
        (o.prototype.parseHost = function() {
          var t = this.host,
            e = s.exec(t);
          e &&
            (':' !== (e = e[0]) && (this.port = e.substr(1)),
            (t = t.substr(0, t.length - e.length))),
            t && (this.hostname = t);
        });
    },
    DzJC: function(t, e, n) {
      var r = n('sEfC'),
        i = n('GoyQ'),
        o = 'Expected a function';
      t.exports = function(t, e, n) {
        var a = !0,
          s = !0;
        if ('function' != typeof t) throw new TypeError(o);
        return (
          i(n) &&
            ((a = 'leading' in n ? !!n.leading : a),
            (s = 'trailing' in n ? !!n.trailing : s)),
          r(t, e, { leading: a, maxWait: e, trailing: s })
        );
      };
    },
    ExA7: function(t, e) {
      t.exports = function(t) {
        return null != t && 'object' == typeof t;
      };
    },
    F16p: function(t, e, n) {
      'use strict';
      t.exports = function(t, e, n) {
        return 0 === t.length
          ? t
          : e
          ? (n || t.sort(e),
            (function(t, e) {
              for (
                var n = 1, r = t.length, i = t[0], o = t[0], a = 1;
                a < r;
                ++a
              )
                if (((o = i), e((i = t[a]), o))) {
                  if (a === n) {
                    n++;
                    continue;
                  }
                  t[n++] = i;
                }
              return (t.length = n), t;
            })(t, e))
          : (n || t.sort(),
            (function(t) {
              for (
                var e = 1, n = t.length, r = t[0], i = t[0], o = 1;
                o < n;
                ++o, i = r
              )
                if (((i = r), (r = t[o]) !== i)) {
                  if (o === e) {
                    e++;
                    continue;
                  }
                  t[e++] = r;
                }
              return (t.length = e), t;
            })(t));
      };
    },
    GTa7: function(t, e) {
      t.exports = [
        'precision',
        'highp',
        'mediump',
        'lowp',
        'attribute',
        'const',
        'uniform',
        'varying',
        'break',
        'continue',
        'do',
        'for',
        'while',
        'if',
        'else',
        'in',
        'out',
        'inout',
        'float',
        'int',
        'uint',
        'void',
        'bool',
        'true',
        'false',
        'discard',
        'return',
        'mat2',
        'mat3',
        'mat4',
        'vec2',
        'vec3',
        'vec4',
        'ivec2',
        'ivec3',
        'ivec4',
        'bvec2',
        'bvec3',
        'bvec4',
        'sampler1D',
        'sampler2D',
        'sampler3D',
        'samplerCube',
        'sampler1DShadow',
        'sampler2DShadow',
        'struct',
        'asm',
        'class',
        'union',
        'enum',
        'typedef',
        'template',
        'this',
        'packed',
        'goto',
        'switch',
        'default',
        'inline',
        'noinline',
        'volatile',
        'public',
        'static',
        'extern',
        'external',
        'interface',
        'long',
        'short',
        'double',
        'half',
        'fixed',
        'unsigned',
        'input',
        'output',
        'hvec2',
        'hvec3',
        'hvec4',
        'dvec2',
        'dvec3',
        'dvec4',
        'fvec2',
        'fvec3',
        'fvec4',
        'sampler2DRect',
        'sampler3DRect',
        'sampler2DRectShadow',
        'sizeof',
        'cast',
        'namespace',
        'using'
      ];
    },
    GoyQ: function(t, e) {
      t.exports = function(t) {
        var e = typeof t;
        return null != t && ('object' == e || 'function' == e);
      };
    },
    H7XF: function(t, e, n) {
      'use strict';
      (e.byteLength = function(t) {
        var e = c(t),
          n = e[0],
          r = e[1];
        return (3 * (n + r)) / 4 - r;
      }),
        (e.toByteArray = function(t) {
          var e,
            n,
            r = c(t),
            a = r[0],
            s = r[1],
            l = new o(
              (function(t, e, n) {
                return (3 * (e + n)) / 4 - n;
              })(0, a, s)
            ),
            u = 0,
            h = s > 0 ? a - 4 : a;
          for (n = 0; n < h; n += 4)
            (e =
              (i[t.charCodeAt(n)] << 18) |
              (i[t.charCodeAt(n + 1)] << 12) |
              (i[t.charCodeAt(n + 2)] << 6) |
              i[t.charCodeAt(n + 3)]),
              (l[u++] = (e >> 16) & 255),
              (l[u++] = (e >> 8) & 255),
              (l[u++] = 255 & e);
          2 === s &&
            ((e = (i[t.charCodeAt(n)] << 2) | (i[t.charCodeAt(n + 1)] >> 4)),
            (l[u++] = 255 & e));
          1 === s &&
            ((e =
              (i[t.charCodeAt(n)] << 10) |
              (i[t.charCodeAt(n + 1)] << 4) |
              (i[t.charCodeAt(n + 2)] >> 2)),
            (l[u++] = (e >> 8) & 255),
            (l[u++] = 255 & e));
          return l;
        }),
        (e.fromByteArray = function(t) {
          for (
            var e, n = t.length, i = n % 3, o = [], a = 0, s = n - i;
            a < s;
            a += 16383
          )
            o.push(u(t, a, a + 16383 > s ? s : a + 16383));
          1 === i
            ? ((e = t[n - 1]), o.push(r[e >> 2] + r[(e << 4) & 63] + '=='))
            : 2 === i &&
              ((e = (t[n - 2] << 8) + t[n - 1]),
              o.push(r[e >> 10] + r[(e >> 4) & 63] + r[(e << 2) & 63] + '='));
          return o.join('');
        });
      for (
        var r = [],
          i = [],
          o = 'undefined' != typeof Uint8Array ? Uint8Array : Array,
          a =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
          s = 0,
          l = a.length;
        s < l;
        ++s
      )
        (r[s] = a[s]), (i[a.charCodeAt(s)] = s);
      function c(t) {
        var e = t.length;
        if (e % 4 > 0)
          throw new Error('Invalid string. Length must be a multiple of 4');
        var n = t.indexOf('=');
        return -1 === n && (n = e), [n, n === e ? 0 : 4 - (n % 4)];
      }
      function u(t, e, n) {
        for (var i, o, a = [], s = e; s < n; s += 3)
          (i =
            ((t[s] << 16) & 16711680) +
            ((t[s + 1] << 8) & 65280) +
            (255 & t[s + 2])),
            a.push(
              r[((o = i) >> 18) & 63] +
                r[(o >> 12) & 63] +
                r[(o >> 6) & 63] +
                r[63 & o]
            );
        return a.join('');
      }
      (i['-'.charCodeAt(0)] = 62), (i['_'.charCodeAt(0)] = 63);
    },
    HVtM: function(t, e, n) {
      'use strict';
      var r = n('tbvF'),
        i = n('Ytbt'),
        o = n('zqV6');
      t.exports = function(t) {
        if (arguments.length <= 1)
          throw new Error(
            'gl-texture2d: Missing arguments for texture2d constructor'
          );
        a ||
          (function(t) {
            (a = [
              t.LINEAR,
              t.NEAREST_MIPMAP_LINEAR,
              t.LINEAR_MIPMAP_NEAREST,
              t.LINEAR_MIPMAP_NEAREST
            ]),
              (s = [
                t.NEAREST,
                t.LINEAR,
                t.NEAREST_MIPMAP_NEAREST,
                t.NEAREST_MIPMAP_LINEAR,
                t.LINEAR_MIPMAP_NEAREST,
                t.LINEAR_MIPMAP_LINEAR
              ]),
              (l = [t.REPEAT, t.CLAMP_TO_EDGE, t.MIRRORED_REPEAT]);
          })(t);
        if ('number' == typeof arguments[1])
          return g(
            t,
            arguments[1],
            arguments[2],
            arguments[3] || t.RGBA,
            arguments[4] || t.UNSIGNED_BYTE
          );
        if (Array.isArray(arguments[1]))
          return g(
            t,
            0 | arguments[1][0],
            0 | arguments[1][1],
            arguments[2] || t.RGBA,
            arguments[3] || t.UNSIGNED_BYTE
          );
        if ('object' == typeof arguments[1]) {
          var e = arguments[1],
            n = c(e) ? e : e.raw;
          if (n)
            return (function(t, e, n, r, i, o) {
              var a = m(t);
              return (
                t.texImage2D(t.TEXTURE_2D, 0, i, i, o, e),
                new f(t, a, n, r, i, o)
              );
            })(
              t,
              n,
              0 | e.width,
              0 | e.height,
              arguments[2] || t.RGBA,
              arguments[3] || t.UNSIGNED_BYTE
            );
          if (e.shape && e.data && e.stride)
            return (function(t, e) {
              var n = e.dtype,
                a = e.shape.slice(),
                s = t.getParameter(t.MAX_TEXTURE_SIZE);
              if (a[0] < 0 || a[0] > s || a[1] < 0 || a[1] > s)
                throw new Error('gl-texture2d: Invalid texture size');
              var l = d(a, e.stride.slice()),
                c = 0;
              'float32' === n
                ? (c = t.FLOAT)
                : 'float64' === n
                ? ((c = t.FLOAT), (l = !1), (n = 'float32'))
                : 'uint8' === n
                ? (c = t.UNSIGNED_BYTE)
                : ((c = t.UNSIGNED_BYTE), (l = !1), (n = 'uint8'));
              var h,
                p,
                g = 0;
              if (2 === a.length)
                (g = t.LUMINANCE),
                  (a = [a[0], a[1], 1]),
                  (e = r(e.data, a, [e.stride[0], e.stride[1], 1], e.offset));
              else {
                if (3 !== a.length)
                  throw new Error('gl-texture2d: Invalid shape for texture');
                if (1 === a[2]) g = t.ALPHA;
                else if (2 === a[2]) g = t.LUMINANCE_ALPHA;
                else if (3 === a[2]) g = t.RGB;
                else {
                  if (4 !== a[2])
                    throw new Error(
                      'gl-texture2d: Invalid shape for pixel coords'
                    );
                  g = t.RGBA;
                }
              }
              c !== t.FLOAT ||
                t.getExtension('OES_texture_float') ||
                ((c = t.UNSIGNED_BYTE), (l = !1));
              var v = e.size;
              if (l)
                h =
                  0 === e.offset && e.data.length === v
                    ? e.data
                    : e.data.subarray(e.offset, e.offset + v);
              else {
                var _ = [a[2], a[2] * a[0], 1];
                p = o.malloc(v, n);
                var y = r(p, a, _, 0);
                ('float32' !== n && 'float64' !== n) || c !== t.UNSIGNED_BYTE
                  ? i.assign(y, e)
                  : u(y, e),
                  (h = p.subarray(0, v));
              }
              var b = m(t);
              t.texImage2D(t.TEXTURE_2D, 0, g, a[0], a[1], 0, g, c, h),
                l || o.free(p);
              return new f(t, b, a[0], a[1], g, c);
            })(t, e);
        }
        throw new Error(
          'gl-texture2d: Invalid arguments for texture2d constructor'
        );
      };
      var a = null,
        s = null,
        l = null;
      function c(t) {
        return (
          ('undefined' != typeof HTMLCanvasElement &&
            t instanceof HTMLCanvasElement) ||
          ('undefined' != typeof HTMLImageElement &&
            t instanceof HTMLImageElement) ||
          ('undefined' != typeof HTMLVideoElement &&
            t instanceof HTMLVideoElement) ||
          ('undefined' != typeof ImageData && t instanceof ImageData)
        );
      }
      var u = function(t, e) {
        i.muls(t, e, 255);
      };
      function h(t, e, n) {
        var r = t.gl,
          i = r.getParameter(r.MAX_TEXTURE_SIZE);
        if (e < 0 || e > i || n < 0 || n > i)
          throw new Error('gl-texture2d: Invalid texture size');
        return (
          (t._shape = [e, n]),
          t.bind(),
          r.texImage2D(
            r.TEXTURE_2D,
            0,
            t.format,
            e,
            n,
            0,
            t.format,
            t.type,
            null
          ),
          (t._mipLevels = [0]),
          t
        );
      }
      function f(t, e, n, r, i, o) {
        (this.gl = t),
          (this.handle = e),
          (this.format = i),
          (this.type = o),
          (this._shape = [n, r]),
          (this._mipLevels = [0]),
          (this._magFilter = t.NEAREST),
          (this._minFilter = t.NEAREST),
          (this._wrapS = t.CLAMP_TO_EDGE),
          (this._wrapT = t.CLAMP_TO_EDGE),
          (this._anisoSamples = 1);
        var a = this,
          s = [this._wrapS, this._wrapT];
        Object.defineProperties(s, [
          {
            get: function() {
              return a._wrapS;
            },
            set: function(t) {
              return (a.wrapS = t);
            }
          },
          {
            get: function() {
              return a._wrapT;
            },
            set: function(t) {
              return (a.wrapT = t);
            }
          }
        ]),
          (this._wrapVector = s);
        var l = [this._shape[0], this._shape[1]];
        Object.defineProperties(l, [
          {
            get: function() {
              return a._shape[0];
            },
            set: function(t) {
              return (a.width = t);
            }
          },
          {
            get: function() {
              return a._shape[1];
            },
            set: function(t) {
              return (a.height = t);
            }
          }
        ]),
          (this._shapeVector = l);
      }
      var p = f.prototype;
      function d(t, e) {
        return 3 === t.length
          ? 1 === e[2] && e[1] === t[0] * t[2] && e[0] === t[2]
          : 1 === e[0] && e[1] === t[0];
      }
      function m(t) {
        var e = t.createTexture();
        return (
          t.bindTexture(t.TEXTURE_2D, e),
          t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.NEAREST),
          t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.NEAREST),
          t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE),
          t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE),
          e
        );
      }
      function g(t, e, n, r, i) {
        var o = t.getParameter(t.MAX_TEXTURE_SIZE);
        if (e < 0 || e > o || n < 0 || n > o)
          throw new Error('gl-texture2d: Invalid texture shape');
        if (i === t.FLOAT && !t.getExtension('OES_texture_float'))
          throw new Error(
            'gl-texture2d: Floating point textures not supported on this platform'
          );
        var a = m(t);
        return (
          t.texImage2D(t.TEXTURE_2D, 0, r, e, n, 0, r, i, null),
          new f(t, a, e, n, r, i)
        );
      }
      Object.defineProperties(p, {
        minFilter: {
          get: function() {
            return this._minFilter;
          },
          set: function(t) {
            this.bind();
            var e = this.gl;
            if (
              (this.type === e.FLOAT &&
                a.indexOf(t) >= 0 &&
                (e.getExtension('OES_texture_float_linear') || (t = e.NEAREST)),
              s.indexOf(t) < 0)
            )
              throw new Error('gl-texture2d: Unknown filter mode ' + t);
            return (
              e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, t),
              (this._minFilter = t)
            );
          }
        },
        magFilter: {
          get: function() {
            return this._magFilter;
          },
          set: function(t) {
            this.bind();
            var e = this.gl;
            if (
              (this.type === e.FLOAT &&
                a.indexOf(t) >= 0 &&
                (e.getExtension('OES_texture_float_linear') || (t = e.NEAREST)),
              s.indexOf(t) < 0)
            )
              throw new Error('gl-texture2d: Unknown filter mode ' + t);
            return (
              e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, t),
              (this._magFilter = t)
            );
          }
        },
        mipSamples: {
          get: function() {
            return this._anisoSamples;
          },
          set: function(t) {
            var e = this._anisoSamples;
            if (
              ((this._anisoSamples = 0 | Math.max(t, 1)),
              e !== this._anisoSamples)
            ) {
              var n = this.gl.getExtension('EXT_texture_filter_anisotropic');
              n &&
                this.gl.texParameterf(
                  this.gl.TEXTURE_2D,
                  n.TEXTURE_MAX_ANISOTROPY_EXT,
                  this._anisoSamples
                );
            }
            return this._anisoSamples;
          }
        },
        wrapS: {
          get: function() {
            return this._wrapS;
          },
          set: function(t) {
            if ((this.bind(), l.indexOf(t) < 0))
              throw new Error('gl-texture2d: Unknown wrap mode ' + t);
            return (
              this.gl.texParameteri(
                this.gl.TEXTURE_2D,
                this.gl.TEXTURE_WRAP_S,
                t
              ),
              (this._wrapS = t)
            );
          }
        },
        wrapT: {
          get: function() {
            return this._wrapT;
          },
          set: function(t) {
            if ((this.bind(), l.indexOf(t) < 0))
              throw new Error('gl-texture2d: Unknown wrap mode ' + t);
            return (
              this.gl.texParameteri(
                this.gl.TEXTURE_2D,
                this.gl.TEXTURE_WRAP_T,
                t
              ),
              (this._wrapT = t)
            );
          }
        },
        wrap: {
          get: function() {
            return this._wrapVector;
          },
          set: function(t) {
            if ((Array.isArray(t) || (t = [t, t]), 2 !== t.length))
              throw new Error(
                'gl-texture2d: Must specify wrap mode for rows and columns'
              );
            for (var e = 0; e < 2; ++e)
              if (l.indexOf(t[e]) < 0)
                throw new Error('gl-texture2d: Unknown wrap mode ' + t);
            (this._wrapS = t[0]), (this._wrapT = t[1]);
            var n = this.gl;
            return (
              this.bind(),
              n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_S, this._wrapS),
              n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_T, this._wrapT),
              t
            );
          }
        },
        shape: {
          get: function() {
            return this._shapeVector;
          },
          set: function(t) {
            if (Array.isArray(t)) {
              if (2 !== t.length)
                throw new Error('gl-texture2d: Invalid texture shape');
            } else t = [0 | t, 0 | t];
            return h(this, 0 | t[0], 0 | t[1]), [0 | t[0], 0 | t[1]];
          }
        },
        width: {
          get: function() {
            return this._shape[0];
          },
          set: function(t) {
            return h(this, (t |= 0), this._shape[1]), t;
          }
        },
        height: {
          get: function() {
            return this._shape[1];
          },
          set: function(t) {
            return (t |= 0), h(this, this._shape[0], t), t;
          }
        }
      }),
        (p.bind = function(t) {
          var e = this.gl;
          return (
            void 0 !== t && e.activeTexture(e.TEXTURE0 + (0 | t)),
            e.bindTexture(e.TEXTURE_2D, this.handle),
            void 0 !== t ? 0 | t : e.getParameter(e.ACTIVE_TEXTURE) - e.TEXTURE0
          );
        }),
        (p.dispose = function() {
          this.gl.deleteTexture(this.handle);
        }),
        (p.generateMipmap = function() {
          this.bind(), this.gl.generateMipmap(this.gl.TEXTURE_2D);
          for (
            var t = Math.min(this._shape[0], this._shape[1]), e = 0;
            t > 0;
            ++e, t >>>= 1
          )
            this._mipLevels.indexOf(e) < 0 && this._mipLevels.push(e);
        }),
        (p.setPixels = function(t, e, n, a) {
          var s = this.gl;
          this.bind(),
            Array.isArray(e)
              ? ((a = n), (n = 0 | e[1]), (e = 0 | e[0]))
              : ((e = e || 0), (n = n || 0)),
            (a = a || 0);
          var l = c(t) ? t : t.raw;
          if (l) {
            this._mipLevels.indexOf(a) < 0
              ? (s.texImage2D(
                  s.TEXTURE_2D,
                  0,
                  this.format,
                  this.format,
                  this.type,
                  l
                ),
                this._mipLevels.push(a))
              : s.texSubImage2D(
                  s.TEXTURE_2D,
                  a,
                  e,
                  n,
                  this.format,
                  this.type,
                  l
                );
          } else {
            if (!(t.shape && t.stride && t.data))
              throw new Error('gl-texture2d: Unsupported data type');
            if (
              t.shape.length < 2 ||
              e + t.shape[1] > this._shape[1] >>> a ||
              n + t.shape[0] > this._shape[0] >>> a ||
              e < 0 ||
              n < 0
            )
              throw new Error(
                'gl-texture2d: Texture dimensions are out of bounds'
              );
            !(function(t, e, n, a, s, l, c, h) {
              var f = h.dtype,
                p = h.shape.slice();
              if (p.length < 2 || p.length > 3)
                throw new Error(
                  'gl-texture2d: Invalid ndarray, must be 2d or 3d'
                );
              var m = 0,
                g = 0,
                v = d(p, h.stride.slice());
              'float32' === f
                ? (m = t.FLOAT)
                : 'float64' === f
                ? ((m = t.FLOAT), (v = !1), (f = 'float32'))
                : 'uint8' === f
                ? (m = t.UNSIGNED_BYTE)
                : ((m = t.UNSIGNED_BYTE), (v = !1), (f = 'uint8'));
              if (2 === p.length)
                (g = t.LUMINANCE),
                  (p = [p[0], p[1], 1]),
                  (h = r(h.data, p, [h.stride[0], h.stride[1], 1], h.offset));
              else {
                if (3 !== p.length)
                  throw new Error('gl-texture2d: Invalid shape for texture');
                if (1 === p[2]) g = t.ALPHA;
                else if (2 === p[2]) g = t.LUMINANCE_ALPHA;
                else if (3 === p[2]) g = t.RGB;
                else {
                  if (4 !== p[2])
                    throw new Error(
                      'gl-texture2d: Invalid shape for pixel coords'
                    );
                  g = t.RGBA;
                }
                p[2];
              }
              (g !== t.LUMINANCE && g !== t.ALPHA) ||
                (s !== t.LUMINANCE && s !== t.ALPHA) ||
                (g = s);
              if (g !== s)
                throw new Error(
                  'gl-texture2d: Incompatible texture format for setPixels'
                );
              var _ = h.size,
                y = c.indexOf(a) < 0;
              y && c.push(a);
              if (m === l && v)
                0 === h.offset && h.data.length === _
                  ? y
                    ? t.texImage2D(
                        t.TEXTURE_2D,
                        a,
                        s,
                        p[0],
                        p[1],
                        0,
                        s,
                        l,
                        h.data
                      )
                    : t.texSubImage2D(
                        t.TEXTURE_2D,
                        a,
                        e,
                        n,
                        p[0],
                        p[1],
                        s,
                        l,
                        h.data
                      )
                  : y
                  ? t.texImage2D(
                      t.TEXTURE_2D,
                      a,
                      s,
                      p[0],
                      p[1],
                      0,
                      s,
                      l,
                      h.data.subarray(h.offset, h.offset + _)
                    )
                  : t.texSubImage2D(
                      t.TEXTURE_2D,
                      a,
                      e,
                      n,
                      p[0],
                      p[1],
                      s,
                      l,
                      h.data.subarray(h.offset, h.offset + _)
                    );
              else {
                var b;
                b = l === t.FLOAT ? o.mallocFloat32(_) : o.mallocUint8(_);
                var T = r(b, p, [p[2], p[2] * p[0], 1]);
                m === t.FLOAT && l === t.UNSIGNED_BYTE
                  ? u(T, h)
                  : i.assign(T, h),
                  y
                    ? t.texImage2D(
                        t.TEXTURE_2D,
                        a,
                        s,
                        p[0],
                        p[1],
                        0,
                        s,
                        l,
                        b.subarray(0, _)
                      )
                    : t.texSubImage2D(
                        t.TEXTURE_2D,
                        a,
                        e,
                        n,
                        p[0],
                        p[1],
                        s,
                        l,
                        b.subarray(0, _)
                      ),
                  l === t.FLOAT ? o.freeFloat32(b) : o.freeUint8(b);
              }
            })(s, e, n, a, this.format, this.type, this._mipLevels, t);
          }
        });
    },
    I14Z: function(t, e, n) {
      var r;
      t.exports = (function t(e, n, i) {
        function o(s, l) {
          if (!n[s]) {
            if (!e[s]) {
              var c = 'function' == typeof r && r;
              if (!l && c) return r(s, !0);
              if (a) return a(s, !0);
              var u = new Error("Cannot find module '" + s + "'");
              throw ((u.code = 'MODULE_NOT_FOUND'), u);
            }
            var h = (n[s] = { exports: {} });
            e[s][0].call(
              h.exports,
              function(t) {
                var n = e[s][1][t];
                return o(n || t);
              },
              h,
              h.exports,
              t,
              e,
              n,
              i
            );
          }
          return n[s].exports;
        }
        for (var a = 'function' == typeof r && r, s = 0; s < i.length; s++)
          o(i[s]);
        return o;
      })(
        {
          1: [
            function(t, e, n) {
              'use strict';
              function r(t, e, n, i) {
                (this.message = t),
                  (this.expected = e),
                  (this.found = n),
                  (this.location = i),
                  (this.name = 'SyntaxError'),
                  'function' == typeof Error.captureStackTrace &&
                    Error.captureStackTrace(this, r);
              }
              !(function(t, e) {
                function n() {
                  this.constructor = t;
                }
                (n.prototype = e.prototype), (t.prototype = new n());
              })(r, Error),
                (r.buildMessage = function(t, e) {
                  var n = {
                    literal: function(t) {
                      return '"' + i(t.text) + '"';
                    },
                    class: function(t) {
                      var e,
                        n = '';
                      for (e = 0; e < t.parts.length; e++)
                        n +=
                          t.parts[e] instanceof Array
                            ? o(t.parts[e][0]) + '-' + o(t.parts[e][1])
                            : o(t.parts[e]);
                      return '[' + (t.inverted ? '^' : '') + n + ']';
                    },
                    any: function(t) {
                      return 'any character';
                    },
                    end: function(t) {
                      return 'end of input';
                    },
                    other: function(t) {
                      return t.description;
                    }
                  };
                  function r(t) {
                    return t
                      .charCodeAt(0)
                      .toString(16)
                      .toUpperCase();
                  }
                  function i(t) {
                    return t
                      .replace(/\\/g, '\\\\')
                      .replace(/"/g, '\\"')
                      .replace(/\0/g, '\\0')
                      .replace(/\t/g, '\\t')
                      .replace(/\n/g, '\\n')
                      .replace(/\r/g, '\\r')
                      .replace(/[\x00-\x0F]/g, function(t) {
                        return '\\x0' + r(t);
                      })
                      .replace(/[\x10-\x1F\x7F-\x9F]/g, function(t) {
                        return '\\x' + r(t);
                      });
                  }
                  function o(t) {
                    return t
                      .replace(/\\/g, '\\\\')
                      .replace(/\]/g, '\\]')
                      .replace(/\^/g, '\\^')
                      .replace(/-/g, '\\-')
                      .replace(/\0/g, '\\0')
                      .replace(/\t/g, '\\t')
                      .replace(/\n/g, '\\n')
                      .replace(/\r/g, '\\r')
                      .replace(/[\x00-\x0F]/g, function(t) {
                        return '\\x0' + r(t);
                      })
                      .replace(/[\x10-\x1F\x7F-\x9F]/g, function(t) {
                        return '\\x' + r(t);
                      });
                  }
                  return (
                    'Expected ' +
                    (function(t) {
                      var e,
                        r,
                        i,
                        o = new Array(t.length);
                      for (e = 0; e < t.length; e++)
                        o[e] = ((i = t[e]), n[i.type](i));
                      if ((o.sort(), o.length > 0)) {
                        for (e = 1, r = 1; e < o.length; e++)
                          o[e - 1] !== o[e] && ((o[r] = o[e]), r++);
                        o.length = r;
                      }
                      switch (o.length) {
                        case 1:
                          return o[0];
                        case 2:
                          return o[0] + ' or ' + o[1];
                        default:
                          return (
                            o.slice(0, -1).join(', ') +
                            ', or ' +
                            o[o.length - 1]
                          );
                      }
                    })(t) +
                    ' but ' +
                    (function(t) {
                      return t ? '"' + i(t) + '"' : 'end of input';
                    })(e) +
                    ' found.'
                  );
                }),
                (e.exports = {
                  SyntaxError: r,
                  parse: function(e, n) {
                    n = void 0 !== n ? n : {};
                    var i,
                      o = {},
                      a = { start: V },
                      s = V,
                      l = '',
                      c = function() {
                        return [];
                      },
                      u = ',',
                      h = F(',', !1),
                      f = function(t, e) {
                        return [t].concat(e);
                      },
                      p = function(t) {
                        return [t];
                      },
                      d = function(t, e) {
                        return { url: t, format: e };
                      },
                      m = function(t) {
                        return { url: t };
                      },
                      g = 'url(',
                      v = F('url(', !1),
                      _ = ')',
                      y = F(')', !1),
                      b = function(t) {
                        return t;
                      },
                      T = 'format(',
                      x = F('format(', !1),
                      w = 'local(',
                      E = F('local(', !1),
                      A = function(t) {
                        return { local: t };
                      },
                      C = /^[^)]/,
                      P = L([')'], !0, !1),
                      R = function(t) {
                        return W.extractValue(t.join(''));
                      },
                      I = /^[ \t\r\n\f]/,
                      S = L([' ', '\t', '\r', '\n', '\f'], !1, !1),
                      M = 0,
                      O = [{ line: 1, column: 1 }],
                      k = 0,
                      N = [],
                      D = 0;
                    if ('startRule' in n) {
                      if (!(n.startRule in a))
                        throw new Error(
                          'Can\'t start parsing from rule "' +
                            n.startRule +
                            '".'
                        );
                      s = a[n.startRule];
                    }
                    function F(t, e) {
                      return { type: 'literal', text: t, ignoreCase: e };
                    }
                    function L(t, e, n) {
                      return {
                        type: 'class',
                        parts: t,
                        inverted: e,
                        ignoreCase: n
                      };
                    }
                    function U(t) {
                      var n,
                        r = O[t];
                      if (r) return r;
                      for (n = t - 1; !O[n]; ) n--;
                      for (
                        r = { line: (r = O[n]).line, column: r.column };
                        n < t;

                      )
                        10 === e.charCodeAt(n)
                          ? (r.line++, (r.column = 1))
                          : r.column++,
                          n++;
                      return (O[t] = r), r;
                    }
                    function B(t, e) {
                      var n = U(t),
                        r = U(e);
                      return {
                        start: { offset: t, line: n.line, column: n.column },
                        end: { offset: e, line: r.line, column: r.column }
                      };
                    }
                    function z(t) {
                      M < k || (M > k && ((k = M), (N = [])), N.push(t));
                    }
                    function j(t, e, n) {
                      return new r(r.buildMessage(t, e), t, e, n);
                    }
                    function V() {
                      var t, n;
                      return (
                        (t = (function t() {
                          var n, r, i, a, s, l;
                          if (((n = M), (r = X()) !== o)) {
                            for (i = [], a = Y(); a !== o; )
                              i.push(a), (a = Y());
                            if (i !== o)
                              if (
                                (44 === e.charCodeAt(M)
                                  ? ((a = u), M++)
                                  : ((a = o), 0 === D && z(h)),
                                a !== o)
                              ) {
                                for (s = [], l = Y(); l !== o; )
                                  s.push(l), (l = Y());
                                s !== o && (l = t()) !== o
                                  ? ((r = f(r, l)), (n = r))
                                  : ((M = n), (n = o));
                              } else (M = n), (n = o);
                            else (M = n), (n = o);
                          } else (M = n), (n = o);
                          return (
                            n === o &&
                              ((n = M), (r = X()) !== o && (r = p(r)), (n = r)),
                            n
                          );
                        })()) === o &&
                          ((t = M), (n = l) !== o && (n = c()), (t = n)),
                        t
                      );
                    }
                    function X() {
                      var t;
                      return (
                        (t = q()) === o &&
                          (t = (function() {
                            var t, n, r, i;
                            return (
                              (t = M),
                              e.substr(M, 6) === w
                                ? ((n = w), (M += 6))
                                : ((n = o), 0 === D && z(E)),
                              n !== o && (r = G()) !== o
                                ? (41 === e.charCodeAt(M)
                                    ? ((i = _), M++)
                                    : ((i = o), 0 === D && z(y)),
                                  i !== o
                                    ? ((n = A(r)), (t = n))
                                    : ((M = t), (t = o)))
                                : ((M = t), (t = o)),
                              t
                            );
                          })()),
                        t
                      );
                    }
                    function q() {
                      var t, n, r, i;
                      if (((t = M), (n = H()) !== o)) {
                        if (((r = []), (i = Y()) !== o))
                          for (; i !== o; ) r.push(i), (i = Y());
                        else r = o;
                        r !== o &&
                        (i = (function() {
                          var t, n, r, i;
                          return (
                            (t = M),
                            e.substr(M, 7) === T
                              ? ((n = T), (M += 7))
                              : ((n = o), 0 === D && z(x)),
                            n !== o && (r = G()) !== o
                              ? (41 === e.charCodeAt(M)
                                  ? ((i = _), M++)
                                  : ((i = o), 0 === D && z(y)),
                                i !== o
                                  ? ((n = b(r)), (t = n))
                                  : ((M = t), (t = o)))
                              : ((M = t), (t = o)),
                            t
                          );
                        })()) !== o
                          ? ((n = d(n, i)), (t = n))
                          : ((M = t), (t = o));
                      } else (M = t), (t = o);
                      return (
                        t === o &&
                          ((t = M), (n = H()) !== o && (n = m(n)), (t = n)),
                        t
                      );
                    }
                    function H() {
                      var t, n, r, i;
                      return (
                        (t = M),
                        e.substr(M, 4) === g
                          ? ((n = g), (M += 4))
                          : ((n = o), 0 === D && z(v)),
                        n !== o && (r = G()) !== o
                          ? (41 === e.charCodeAt(M)
                              ? ((i = _), M++)
                              : ((i = o), 0 === D && z(y)),
                            i !== o
                              ? ((n = b(r)), (t = n))
                              : ((M = t), (t = o)))
                          : ((M = t), (t = o)),
                        t
                      );
                    }
                    function G() {
                      var t, n;
                      if (
                        ((t = []),
                        C.test(e.charAt(M))
                          ? ((n = e.charAt(M)), M++)
                          : ((n = o), 0 === D && z(P)),
                        n !== o)
                      )
                        for (; n !== o; )
                          t.push(n),
                            C.test(e.charAt(M))
                              ? ((n = e.charAt(M)), M++)
                              : ((n = o), 0 === D && z(P));
                      else t = o;
                      return t !== o && (t = R(t)), t;
                    }
                    function Y() {
                      var t;
                      return (
                        I.test(e.charAt(M))
                          ? ((t = e.charAt(M)), M++)
                          : ((t = o), 0 === D && z(S)),
                        t
                      );
                    }
                    var W = t('../util');
                    if ((i = s()) !== o && M === e.length) return i;
                    throw (i !== o && M < e.length && z({ type: 'end' }),
                    j(
                      N,
                      k < e.length ? e.charAt(k) : null,
                      k < e.length ? B(k, k + 1) : B(k, k)
                    ));
                  }
                });
            },
            { '../util': 3 }
          ],
          2: [
            function(t, e, n) {
              var r = t('./grammar');
              (n.SyntaxError = function(t, e) {
                (this.message = t), (this.offset = e);
              }),
                (n.parse = function(t) {
                  try {
                    return r.parse(t);
                  } catch (t) {
                    throw new n.SyntaxError(t.message, t.offset);
                  }
                }),
                (n.serialize = function(t) {
                  return t
                    .map(function(t) {
                      var e;
                      return (
                        t.url
                          ? ((e = 'url("' + t.url + '")'),
                            t.format && (e += ' format("' + t.format + '")'))
                          : (e = 'local("' + t.local + '")'),
                        e
                      );
                    })
                    .join(', ');
                });
            },
            { './grammar': 1 }
          ],
          3: [
            function(t, e, n) {
              n.extractValue = function(t) {
                return (
                  (e = (function(t) {
                    return t.replace(/^[\t\r\f\n ]*(.+?)[\t\r\f\n ]*$/, '$1');
                  })(t)),
                  (r = /^'(.*)'$/),
                  (n = /^"(.*)"$/).test(e)
                    ? e.replace(n, '$1')
                    : r.test(e)
                    ? e.replace(r, '$1')
                    : e
                );
                var e, n, r;
              };
            },
            {}
          ]
        },
        {},
        [2]
      )(2);
    },
    IDFI: function(t, e, n) {
      'use strict';
      t.exports = function(t) {
        for (var e = new Array(t), n = 0; n < t; ++n) e[n] = n;
        return e;
      };
    },
    IrQ8: function(t, e, n) {
      'use strict';
      (e.shader = function(t, e, n) {
        return u(t).getShaderReference(e, n);
      }),
        (e.program = function(t, e, n, r, i) {
          return u(t).getProgram(e, n, r, i);
        });
      var r = n('o/2B'),
        i = n('B9vp'),
        o = new ('undefined' == typeof WeakMap ? n('/MXg') : WeakMap)(),
        a = 0;
      function s(t, e, n, r, i, o, a) {
        (this.id = t),
          (this.src = e),
          (this.type = n),
          (this.shader = r),
          (this.count = o),
          (this.programs = []),
          (this.cache = a);
      }
      function l(t) {
        (this.gl = t), (this.shaders = [{}, {}]), (this.programs = {});
      }
      s.prototype.dispose = function() {
        if (0 == --this.count) {
          for (
            var t = this.cache,
              e = t.gl,
              n = this.programs,
              r = 0,
              i = n.length;
            r < i;
            ++r
          ) {
            var o = t.programs[n[r]];
            o && (delete t.programs[r], e.deleteProgram(o));
          }
          e.deleteShader(this.shader),
            delete t.shaders[(this.type === e.FRAGMENT_SHADER) | 0][this.src];
        }
      };
      var c = l.prototype;
      function u(t) {
        var e = o.get(t);
        return e || ((e = new l(t)), o.set(t, e)), e;
      }
      (c.getShaderReference = function(t, e) {
        var n = this.gl,
          o = this.shaders[(t === n.FRAGMENT_SHADER) | 0],
          l = o[e];
        if (l && n.isShader(l.shader)) l.count += 1;
        else {
          var c = (function(t, e, n) {
            var o = t.createShader(e);
            if (
              (t.shaderSource(o, n),
              t.compileShader(o),
              !t.getShaderParameter(o, t.COMPILE_STATUS))
            ) {
              var a = t.getShaderInfoLog(o);
              try {
                var s = i(a, n, e);
              } catch (t) {
                throw (console.warn('Failed to format compiler error: ' + t),
                new r(a, 'Error compiling shader:\n' + a));
              }
              throw new r(a, s.short, s.long);
            }
            return o;
          })(n, t, e);
          l = o[e] = new s(a++, e, t, c, [], 1, this);
        }
        return l;
      }),
        (c.getProgram = function(t, e, n, i) {
          var o = [t.id, e.id, n.join(':'), i.join(':')].join('@'),
            a = this.programs[o];
          return (
            (a && this.gl.isProgram(a)) ||
              ((this.programs[o] = a = (function(t, e, n, i, o) {
                var a = t.createProgram();
                t.attachShader(a, e), t.attachShader(a, n);
                for (var s = 0; s < i.length; ++s)
                  t.bindAttribLocation(a, o[s], i[s]);
                if (
                  (t.linkProgram(a), !t.getProgramParameter(a, t.LINK_STATUS))
                ) {
                  var l = t.getProgramInfoLog(a);
                  throw new r(l, 'Error linking program: ' + l);
                }
                return a;
              })(this.gl, t.shader, e.shader, n, i)),
              t.programs.push(o),
              e.programs.push(o)),
            a
          );
        });
    },
    IzUq: function(t, e) {
      var n = {}.toString;
      t.exports =
        Array.isArray ||
        function(t) {
          return '[object Array]' == n.call(t);
        };
    },
    Jbu2: function(t, e) {
      t.exports = [
        {
          name: 'Bounce',
          paramsTypes: {
            shadow_colour: 'vec4',
            shadow_height: 'float',
            bounces: 'float'
          },
          defaultParams: {
            shadow_colour: [0, 0, 0, 0.6],
            shadow_height: 0.075,
            bounces: 3
          },
          glsl:
            '// Author: Adrian Purser\n// License: MIT\n\nuniform vec4 shadow_colour; // = vec4(0.,0.,0.,.6)\nuniform float shadow_height; // = 0.075\nuniform float bounces; // = 3.0\n\nconst float PI = 3.14159265358;\n\nvec4 transition (vec2 uv) {\n  float time = progress;\n  float stime = sin(time * PI / 2.);\n  float phase = time * PI * bounces;\n  float y = (abs(cos(phase))) * (1.0 - stime);\n  float d = uv.y - y;\n  return mix(\n    mix(\n      getToColor(uv),\n      shadow_colour,\n      step(d, shadow_height) * (1. - mix(\n        ((d / shadow_height) * shadow_colour.a) + (1.0 - shadow_colour.a),\n        1.0,\n        smoothstep(0.95, 1., progress) // fade-out the shadow at the end\n      ))\n    ),\n    getFromColor(vec2(uv.x, uv.y + (1.0 - y))),\n    step(d, 0.0)\n  );\n}\n',
          author: 'Adrian Purser',
          license: 'MIT',
          createdAt: 'Fri, 10 Nov 2017 17:01:45 +0000',
          updatedAt: 'Sat, 11 Nov 2017 08:50:40 +0100'
        },
        {
          name: 'BowTieHorizontal',
          paramsTypes: {},
          defaultParams: {},
          glsl:
            '// Author: huynx\n// License: MIT\n\nvec2 bottom_left = vec2(0.0, 1.0);\nvec2 bottom_right = vec2(1.0, 1.0);\nvec2 top_left = vec2(0.0, 0.0);\nvec2 top_right = vec2(1.0, 0.0);\nvec2 center = vec2(0.5, 0.5);\n\nfloat check(vec2 p1, vec2 p2, vec2 p3)\n{\n  return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);\n}\n\nbool PointInTriangle (vec2 pt, vec2 p1, vec2 p2, vec2 p3)\n{\n    bool b1, b2, b3;\n    b1 = check(pt, p1, p2) < 0.0;\n    b2 = check(pt, p2, p3) < 0.0;\n    b3 = check(pt, p3, p1) < 0.0;\n    return ((b1 == b2) && (b2 == b3));\n}\n\nbool in_left_triangle(vec2 p){\n  vec2 vertex1, vertex2, vertex3;\n  vertex1 = vec2(progress, 0.5);\n  vertex2 = vec2(0.0, 0.5-progress);\n  vertex3 = vec2(0.0, 0.5+progress);\n  if (PointInTriangle(p, vertex1, vertex2, vertex3))\n  {\n    return true;\n  }\n  return false;\n}\n\nbool in_right_triangle(vec2 p){\n  vec2 vertex1, vertex2, vertex3;\n  vertex1 = vec2(1.0-progress, 0.5);\n  vertex2 = vec2(1.0, 0.5-progress);\n  vertex3 = vec2(1.0, 0.5+progress);\n  if (PointInTriangle(p, vertex1, vertex2, vertex3))\n  {\n    return true;\n  }\n  return false;\n}\n\nfloat blur_edge(vec2 bot1, vec2 bot2, vec2 top, vec2 testPt)\n{\n  vec2 lineDir = bot1 - top;\n  vec2 perpDir = vec2(lineDir.y, -lineDir.x);\n  vec2 dirToPt1 = bot1 - testPt;\n  float dist1 = abs(dot(normalize(perpDir), dirToPt1));\n  \n  lineDir = bot2 - top;\n  perpDir = vec2(lineDir.y, -lineDir.x);\n  dirToPt1 = bot2 - testPt;\n  float min_dist = min(abs(dot(normalize(perpDir), dirToPt1)), dist1);\n  \n  if (min_dist < 0.005) {\n    return min_dist / 0.005;\n  }\n  else  {\n    return 1.0;\n  };\n}\n\n\nvec4 transition (vec2 uv) {\n  if (in_left_triangle(uv))\n  {\n    if (progress < 0.1)\n    {\n      return getFromColor(uv);\n    }\n    if (uv.x < 0.5)\n    {\n      vec2 vertex1 = vec2(progress, 0.5);\n      vec2 vertex2 = vec2(0.0, 0.5-progress);\n      vec2 vertex3 = vec2(0.0, 0.5+progress);\n      return mix(\n        getFromColor(uv),\n        getToColor(uv),\n        blur_edge(vertex2, vertex3, vertex1, uv)\n      );\n    }\n    else\n    {\n      if (progress > 0.0)\n      {\n        return getToColor(uv);\n      }\n      else\n      {\n        return getFromColor(uv);\n      }\n    }    \n  }\n  else if (in_right_triangle(uv))\n  {\n    if (uv.x >= 0.5)\n    {\n      vec2 vertex1 = vec2(1.0-progress, 0.5);\n      vec2 vertex2 = vec2(1.0, 0.5-progress);\n      vec2 vertex3 = vec2(1.0, 0.5+progress);\n      return mix(\n        getFromColor(uv),\n        getToColor(uv),\n        blur_edge(vertex2, vertex3, vertex1, uv)\n      );  \n    }\n    else\n    {\n      return getFromColor(uv);\n    }\n  }\n  else {\n    return getFromColor(uv);\n  }\n}',
          author: 'huynx',
          license: 'MIT',
          createdAt: 'Sat, 24 Mar 2018 12:54:26 +0100',
          updatedAt: 'Sat, 24 Mar 2018 12:54:26 +0100'
        },
        {
          name: 'BowTieVertical',
          paramsTypes: {},
          defaultParams: {},
          glsl:
            '// Author: huynx\r\n// License: MIT\r\n\r\nfloat check(vec2 p1, vec2 p2, vec2 p3)\r\n{\r\n  return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);\r\n}\r\n\r\nbool PointInTriangle (vec2 pt, vec2 p1, vec2 p2, vec2 p3)\r\n{\r\n    bool b1, b2, b3;\r\n    b1 = check(pt, p1, p2) < 0.0;\r\n    b2 = check(pt, p2, p3) < 0.0;\r\n    b3 = check(pt, p3, p1) < 0.0;\r\n    return ((b1 == b2) && (b2 == b3));\r\n}\r\n\r\nbool in_top_triangle(vec2 p){\r\n  vec2 vertex1, vertex2, vertex3;\r\n  vertex1 = vec2(0.5, progress);\r\n  vertex2 = vec2(0.5-progress, 0.0);\r\n  vertex3 = vec2(0.5+progress, 0.0);\r\n  if (PointInTriangle(p, vertex1, vertex2, vertex3))\r\n  {\r\n    return true;\r\n  }\r\n  return false;\r\n}\r\n\r\nbool in_bottom_triangle(vec2 p){\r\n  vec2 vertex1, vertex2, vertex3;\r\n  vertex1 = vec2(0.5, 1.0 - progress);\r\n  vertex2 = vec2(0.5-progress, 1.0);\r\n  vertex3 = vec2(0.5+progress, 1.0);\r\n  if (PointInTriangle(p, vertex1, vertex2, vertex3))\r\n  {\r\n    return true;\r\n  }\r\n  return false;\r\n}\r\n\r\nfloat blur_edge(vec2 bot1, vec2 bot2, vec2 top, vec2 testPt)\r\n{\r\n  vec2 lineDir = bot1 - top;\r\n  vec2 perpDir = vec2(lineDir.y, -lineDir.x);\r\n  vec2 dirToPt1 = bot1 - testPt;\r\n  float dist1 = abs(dot(normalize(perpDir), dirToPt1));\r\n  \r\n  lineDir = bot2 - top;\r\n  perpDir = vec2(lineDir.y, -lineDir.x);\r\n  dirToPt1 = bot2 - testPt;\r\n  float min_dist = min(abs(dot(normalize(perpDir), dirToPt1)), dist1);\r\n  \r\n  if (min_dist < 0.005) {\r\n    return min_dist / 0.005;\r\n  }\r\n  else  {\r\n    return 1.0;\r\n  };\r\n}\r\n\r\n\r\nvec4 transition (vec2 uv) {\r\n  if (in_top_triangle(uv))\r\n  {\r\n    if (progress < 0.1)\r\n    {\r\n      return getFromColor(uv);\r\n    }\r\n    if (uv.y < 0.5)\r\n    {\r\n      vec2 vertex1 = vec2(0.5, progress);\r\n      vec2 vertex2 = vec2(0.5-progress, 0.0);\r\n      vec2 vertex3 = vec2(0.5+progress, 0.0);\r\n      return mix(\r\n        getFromColor(uv),\r\n        getToColor(uv),\r\n        blur_edge(vertex2, vertex3, vertex1, uv)\r\n      );\r\n    }\r\n    else\r\n    {\r\n      if (progress > 0.0)\r\n      {\r\n        return getToColor(uv);\r\n      }\r\n      else\r\n      {\r\n        return getFromColor(uv);\r\n      }\r\n    }    \r\n  }\r\n  else if (in_bottom_triangle(uv))\r\n  {\r\n    if (uv.y >= 0.5)\r\n    {\r\n      vec2 vertex1 = vec2(0.5, 1.0-progress);\r\n      vec2 vertex2 = vec2(0.5-progress, 1.0);\r\n      vec2 vertex3 = vec2(0.5+progress, 1.0);\r\n      return mix(\r\n        getFromColor(uv),\r\n        getToColor(uv),\r\n        blur_edge(vertex2, vertex3, vertex1, uv)\r\n      );  \r\n    }\r\n    else\r\n    {\r\n      return getFromColor(uv);\r\n    }\r\n  }\r\n  else {\r\n    return getFromColor(uv);\r\n  }\r\n}',
          author: 'huynx',
          license: 'MIT',
          createdAt: 'Tue, 27 Mar 2018 10:07:54 +0700',
          updatedAt: 'Tue, 27 Mar 2018 10:07:54 +0700'
        },
        {
          name: 'ButterflyWaveScrawler',
          paramsTypes: {
            amplitude: 'float',
            waves: 'float',
            colorSeparation: 'float'
          },
          defaultParams: { amplitude: 1, waves: 30, colorSeparation: 0.3 },
          glsl:
            "// Author: mandubian\n// License: MIT\nuniform float amplitude; // = 1.0\nuniform float waves; // = 30.0\nuniform float colorSeparation; // = 0.3\nfloat PI = 3.14159265358979323846264;\nfloat compute(vec2 p, float progress, vec2 center) {\nvec2 o = p*sin(progress * amplitude)-center;\n// horizontal vector\nvec2 h = vec2(1., 0.);\n// butterfly polar function (don't ask me why this one :))\nfloat theta = acos(dot(o, h)) * waves;\nreturn (exp(cos(theta)) - 2.*cos(4.*theta) + pow(sin((2.*theta - PI) / 24.), 5.)) / 10.;\n}\nvec4 transition(vec2 uv) {\n  vec2 p = uv.xy / vec2(1.0).xy;\n  float inv = 1. - progress;\n  vec2 dir = p - vec2(.5);\n  float dist = length(dir);\n  float disp = compute(p, progress, vec2(0.5, 0.5)) ;\n  vec4 texTo = getToColor(p + inv*disp);\n  vec4 texFrom = vec4(\n  getFromColor(p + progress*disp*(1.0 - colorSeparation)).r,\n  getFromColor(p + progress*disp).g,\n  getFromColor(p + progress*disp*(1.0 + colorSeparation)).b,\n  1.0);\n  return texTo*progress + texFrom*inv;\n}\n",
          author: 'mandubian',
          license: 'MIT',
          createdAt: 'Thu, 1 Jun 2017 11:47:17 +0200',
          updatedAt: 'Thu, 1 Jun 2017 11:47:17 +0200'
        },
        {
          name: 'CircleCrop',
          paramsTypes: { bgcolor: 'vec4' },
          defaultParams: { bgcolor: [0, 0, 0, 1] },
          glsl:
            "// License: MIT\n// Author: fkuteken\n// ported by gre from https://gist.github.com/fkuteken/f63e3009c1143950dee9063c3b83fb88\n\nuniform vec4 bgcolor; // = vec4(0.0, 0.0, 0.0, 1.0)\n\nvec2 ratio2 = vec2(1.0, 1.0 / ratio);\nfloat s = pow(2.0 * abs(progress - 0.5), 3.0);\n\nvec4 transition(vec2 p) {\n  float dist = length((vec2(p) - 0.5) * ratio2);\n  return mix(\n    progress < 0.5 ? getFromColor(p) : getToColor(p), // branching is ok here as we statically depend on progress uniform (branching won't change over pixels)\n    bgcolor,\n    step(s, dist)\n  );\n}\n",
          license: 'MIT',
          author: 'fkuteken',
          createdAt: 'Mon, 12 Jun 2017 12:52:34 +0800',
          updatedAt: 'Mon, 12 Jun 2017 12:52:34 +0800'
        },
        {
          name: 'ColourDistance',
          paramsTypes: { power: 'float' },
          defaultParams: { power: 5 },
          glsl:
            '// License: MIT\n// Author: P-Seebauer\n// ported by gre from https://gist.github.com/P-Seebauer/2a5fa2f77c883dd661f9\n\nuniform float power; // = 5.0\n\nvec4 transition(vec2 p) {\n  vec4 fTex = getFromColor(p);\n  vec4 tTex = getToColor(p);\n  float m = step(distance(fTex, tTex), progress);\n  return mix(\n    mix(fTex, tTex, m),\n    tTex,\n    pow(progress, power)\n  );\n}\n',
          license: 'MIT',
          author: 'P-Seebauer',
          createdAt: 'Mon, 12 Jun 2017 12:57:42 +0800',
          updatedAt: 'Mon, 12 Jun 2017 12:57:42 +0800'
        },
        {
          name: 'CrazyParametricFun',
          paramsTypes: {
            a: 'float',
            b: 'float',
            amplitude: 'float',
            smoothness: 'float'
          },
          defaultParams: { a: 4, b: 1, amplitude: 120, smoothness: 0.1 },
          glsl:
            '// Author: mandubian\n// License: MIT\n\nuniform float a; // = 4\nuniform float b; // = 1\nuniform float amplitude; // = 120\nuniform float smoothness; // = 0.1\n\nvec4 transition(vec2 uv) {\n  vec2 p = uv.xy / vec2(1.0).xy;\n  vec2 dir = p - vec2(.5);\n  float dist = length(dir);\n  float x = (a - b) * cos(progress) + b * cos(progress * ((a / b) - 1.) );\n  float y = (a - b) * sin(progress) - b * sin(progress * ((a / b) - 1.));\n  vec2 offset = dir * vec2(sin(progress  * dist * amplitude * x), sin(progress * dist * amplitude * y)) / smoothness;\n  return mix(getFromColor(p + offset), getToColor(p), smoothstep(0.2, 1.0, progress));\n}\n',
          author: 'mandubian',
          license: 'MIT',
          createdAt: 'Thu, 1 Jun 2017 13:03:12 +0200',
          updatedAt: 'Thu, 1 Jun 2017 13:03:12 +0200'
        },
        {
          name: 'CrossZoom',
          paramsTypes: { strength: 'float' },
          defaultParams: { strength: 0.4 },
          glsl:
            '// License: MIT\n// Author: rectalogic\n// ported by gre from https://gist.github.com/rectalogic/b86b90161503a0023231\n\n// Converted from https://github.com/rectalogic/rendermix-basic-effects/blob/master/assets/com/rendermix/CrossZoom/CrossZoom.frag\n// Which is based on https://github.com/evanw/glfx.js/blob/master/src/filters/blur/zoomblur.js\n// With additional easing functions from https://github.com/rectalogic/rendermix-basic-effects/blob/master/assets/com/rendermix/Easing/Easing.glsllib\n\nuniform float strength; // = 0.4\n\nconst float PI = 3.141592653589793;\n\nfloat Linear_ease(in float begin, in float change, in float duration, in float time) {\n    return change * time / duration + begin;\n}\n\nfloat Exponential_easeInOut(in float begin, in float change, in float duration, in float time) {\n    if (time == 0.0)\n        return begin;\n    else if (time == duration)\n        return begin + change;\n    time = time / (duration / 2.0);\n    if (time < 1.0)\n        return change / 2.0 * pow(2.0, 10.0 * (time - 1.0)) + begin;\n    return change / 2.0 * (-pow(2.0, -10.0 * (time - 1.0)) + 2.0) + begin;\n}\n\nfloat Sinusoidal_easeInOut(in float begin, in float change, in float duration, in float time) {\n    return -change / 2.0 * (cos(PI * time / duration) - 1.0) + begin;\n}\n\nfloat rand (vec2 co) {\n  return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);\n}\n\nvec3 crossFade(in vec2 uv, in float dissolve) {\n    return mix(getFromColor(uv).rgb, getToColor(uv).rgb, dissolve);\n}\n\nvec4 transition(vec2 uv) {\n    vec2 texCoord = uv.xy / vec2(1.0).xy;\n\n    // Linear interpolate center across center half of the image\n    vec2 center = vec2(Linear_ease(0.25, 0.5, 1.0, progress), 0.5);\n    float dissolve = Exponential_easeInOut(0.0, 1.0, 1.0, progress);\n\n    // Mirrored sinusoidal loop. 0->strength then strength->0\n    float strength = Sinusoidal_easeInOut(0.0, strength, 0.5, progress);\n\n    vec3 color = vec3(0.0);\n    float total = 0.0;\n    vec2 toCenter = center - texCoord;\n\n    /* randomize the lookup values to hide the fixed number of samples */\n    float offset = rand(uv);\n\n    for (float t = 0.0; t <= 40.0; t++) {\n        float percent = (t + offset) / 40.0;\n        float weight = 4.0 * (percent - percent * percent);\n        color += crossFade(texCoord + toCenter * percent * strength, dissolve) * weight;\n        total += weight;\n    }\n    return vec4(color / total, 1.0);\n}\n',
          license: 'MIT',
          author: 'rectalogic',
          createdAt: 'Mon, 12 Jun 2017 12:33:07 +0800',
          updatedAt: 'Mon, 12 Jun 2017 12:33:07 +0800'
        },
        {
          name: 'Directional',
          paramsTypes: { direction: 'vec2' },
          defaultParams: { direction: [0, 1] },
          glsl:
            '// Author: Gaëtan Renaudeau\n// License: MIT\n\nuniform vec2 direction; // = vec2(0.0, 1.0)\n\nvec4 transition (vec2 uv) {\n  vec2 p = uv + progress * sign(direction);\n  vec2 f = fract(p);\n  return mix(\n    getToColor(f),\n    getFromColor(f),\n    step(0.0, p.y) * step(p.y, 1.0) * step(0.0, p.x) * step(p.x, 1.0)\n  );\n}\n',
          author: 'Gaëtan Renaudeau',
          license: 'MIT',
          createdAt: 'Thu, 19 Apr 2018 12:20:29 +0200',
          updatedAt: 'Thu, 19 Apr 2018 12:20:29 +0200'
        },
        {
          name: 'DoomScreenTransition',
          paramsTypes: {
            bars: 'int',
            amplitude: 'float',
            noise: 'float',
            frequency: 'float',
            dripScale: 'float'
          },
          defaultParams: {
            bars: 30,
            amplitude: 2,
            noise: 0.1,
            frequency: 0.5,
            dripScale: 0.5
          },
          glsl:
            '// Author: Zeh Fernando\n// License: MIT\n\n\n// Transition parameters --------\n\n// Number of total bars/columns\nuniform int bars; // = 30\n\n// Multiplier for speed ratio. 0 = no variation when going down, higher = some elements go much faster\nuniform float amplitude; // = 2\n\n// Further variations in speed. 0 = no noise, 1 = super noisy (ignore frequency)\nuniform float noise; // = 0.1\n\n// Speed variation horizontally. the bigger the value, the shorter the waves\nuniform float frequency; // = 0.5\n\n// How much the bars seem to "run" from the middle of the screen first (sticking to the sides). 0 = no drip, 1 = curved drip\nuniform float dripScale; // = 0.5\n\n\n// The code proper --------\n\nfloat rand(int num) {\n  return fract(mod(float(num) * 67123.313, 12.0) * sin(float(num) * 10.3) * cos(float(num)));\n}\n\nfloat wave(int num) {\n  float fn = float(num) * frequency * 0.1 * float(bars);\n  return cos(fn * 0.5) * cos(fn * 0.13) * sin((fn+10.0) * 0.3) / 2.0 + 0.5;\n}\n\nfloat drip(int num) {\n  return sin(float(num) / float(bars - 1) * 3.141592) * dripScale;\n}\n\nfloat pos(int num) {\n  return (noise == 0.0 ? wave(num) : mix(wave(num), rand(num), noise)) + (dripScale == 0.0 ? 0.0 : drip(num));\n}\n\nvec4 transition(vec2 uv) {\n  int bar = int(uv.x * (float(bars)));\n  float scale = 1.0 + pos(bar) * amplitude;\n  float phase = progress * scale;\n  float posY = uv.y / vec2(1.0).y;\n  vec2 p;\n  vec4 c;\n  if (phase + posY < 1.0) {\n    p = vec2(uv.x, uv.y + mix(0.0, vec2(1.0).y, phase)) / vec2(1.0).xy;\n    c = getFromColor(p);\n  } else {\n    p = uv.xy / vec2(1.0).xy;\n    c = getToColor(p);\n  }\n\n  // Finally, apply the color\n  return c;\n}\n',
          author: 'Zeh Fernando',
          license: 'MIT',
          createdAt: 'Tue, 30 May 2017 09:39:09 -0700',
          updatedAt: 'Tue, 30 May 2017 09:39:09 -0700'
        },
        {
          name: 'Dreamy',
          paramsTypes: {},
          defaultParams: {},
          glsl:
            '// Author: mikolalysenko\n// License: MIT\n\nvec2 offset(float progress, float x, float theta) {\n  float phase = progress*progress + progress + theta;\n  float shifty = 0.03*progress*cos(10.0*(progress+x));\n  return vec2(0, shifty);\n}\nvec4 transition(vec2 p) {\n  return mix(getFromColor(p + offset(progress, p.x, 0.0)), getToColor(p + offset(1.0-progress, p.x, 3.14)), progress);\n}\n',
          author: 'mikolalysenko',
          license: 'MIT',
          createdAt: 'Mon, 12 Jun 2017 12:27:38 +0800',
          updatedAt: 'Mon, 12 Jun 2017 12:27:38 +0800'
        },
        {
          name: 'DreamyZoom',
          paramsTypes: { rotation: 'float', scale: 'float' },
          defaultParams: { rotation: 6, scale: 1.2 },
          glsl:
            '// Author: Zeh Fernando\n// License: MIT\n\n// Definitions --------\n#define DEG2RAD 0.03926990816987241548078304229099 // 1/180*PI\n\n\n// Transition parameters --------\n\n// In degrees\nuniform float rotation; // = 6\n\n// Multiplier\nuniform float scale; // = 1.2\n\n\n// The code proper --------\n\nvec4 transition(vec2 uv) {\n  // Massage parameters\n  float phase = progress < 0.5 ? progress * 2.0 : (progress - 0.5) * 2.0;\n  float angleOffset = progress < 0.5 ? mix(0.0, rotation * DEG2RAD, phase) : mix(-rotation * DEG2RAD, 0.0, phase);\n  float newScale = progress < 0.5 ? mix(1.0, scale, phase) : mix(scale, 1.0, phase);\n  \n  vec2 center = vec2(0, 0);\n\n  // Calculate the source point\n  vec2 assumedCenter = vec2(0.5, 0.5);\n  vec2 p = (uv.xy - vec2(0.5, 0.5)) / newScale * vec2(ratio, 1.0);\n\n  // This can probably be optimized (with distance())\n  float angle = atan(p.y, p.x) + angleOffset;\n  float dist = distance(center, p);\n  p.x = cos(angle) * dist / ratio + 0.5;\n  p.y = sin(angle) * dist + 0.5;\n  vec4 c = progress < 0.5 ? getFromColor(p) : getToColor(p);\n\n  // Finally, apply the color\n  return c + (progress < 0.5 ? mix(0.0, 1.0, phase) : mix(1.0, 0.0, phase));\n}\n',
          author: 'Zeh Fernando',
          license: 'MIT',
          createdAt: 'Tue, 30 May 2017 10:44:06 -0700',
          updatedAt: 'Tue, 30 May 2017 10:44:06 -0700'
        },
        {
          name: 'GlitchDisplace',
          paramsTypes: {},
          defaultParams: {},
          glsl:
            '// Author: Matt DesLauriers\n// License: MIT\n\nhighp float random(vec2 co)\n{\n    highp float a = 12.9898;\n    highp float b = 78.233;\n    highp float c = 43758.5453;\n    highp float dt= dot(co.xy ,vec2(a,b));\n    highp float sn= mod(dt,3.14);\n    return fract(sin(sn) * c);\n}\nfloat voronoi( in vec2 x ) {\n    vec2 p = floor( x );\n    vec2 f = fract( x );\n    float res = 8.0;\n    for( float j=-1.; j<=1.; j++ )\n    for( float i=-1.; i<=1.; i++ ) {\n        vec2  b = vec2( i, j );\n        vec2  r = b - f + random( p + b );\n        float d = dot( r, r );\n        res = min( res, d );\n    }\n    return sqrt( res );\n}\n\nvec2 displace(vec4 tex, vec2 texCoord, float dotDepth, float textureDepth, float strength) {\n    float b = voronoi(.003 * texCoord + 2.0);\n    float g = voronoi(0.2 * texCoord);\n    float r = voronoi(texCoord - 1.0);\n    vec4 dt = tex * 1.0;\n    vec4 dis = dt * dotDepth + 1.0 - tex * textureDepth;\n\n    dis.x = dis.x - 1.0 + textureDepth*dotDepth;\n    dis.y = dis.y - 1.0 + textureDepth*dotDepth;\n    dis.x *= strength;\n    dis.y *= strength;\n    vec2 res_uv = texCoord ;\n    res_uv.x = res_uv.x + dis.x - 0.0;\n    res_uv.y = res_uv.y + dis.y;\n    return res_uv;\n}\n\nfloat ease1(float t) {\n  return t == 0.0 || t == 1.0\n    ? t\n    : t < 0.5\n      ? +0.5 * pow(2.0, (20.0 * t) - 10.0)\n      : -0.5 * pow(2.0, 10.0 - (t * 20.0)) + 1.0;\n}\nfloat ease2(float t) {\n  return t == 1.0 ? t : 1.0 - pow(2.0, -10.0 * t);\n}\n\n\n\nvec4 transition(vec2 uv) {\n  vec2 p = uv.xy / vec2(1.0).xy;\n  vec4 color1 = getFromColor(p);\n  vec4 color2 = getToColor(p);\n  vec2 disp = displace(color1, p, 0.33, 0.7, 1.0-ease1(progress));\n  vec2 disp2 = displace(color2, p, 0.33, 0.5, ease2(progress));\n  vec4 dColor1 = getToColor(disp);\n  vec4 dColor2 = getFromColor(disp2);\n  float val = ease1(progress);\n  vec3 gray = vec3(dot(min(dColor2, dColor1).rgb, vec3(0.299, 0.587, 0.114)));\n  dColor2 = vec4(gray, 1.0);\n  dColor2 *= 2.0;\n  color1 = mix(color1, dColor2, smoothstep(0.0, 0.5, progress));\n  color2 = mix(color2, dColor1, smoothstep(1.0, 0.5, progress));\n  return mix(color1, color2, val);\n  //gl_FragColor = mix(gl_FragColor, dColor, smoothstep(0.0, 0.5, progress));\n  \n   //gl_FragColor = mix(texture2D(from, p), texture2D(to, p), progress);\n}\n',
          author: 'Matt DesLauriers',
          license: 'MIT',
          createdAt: 'Tue, 30 May 2017 14:53:04 -0400',
          updatedAt: 'Tue, 30 May 2017 14:53:04 -0400'
        },
        {
          name: 'GlitchMemories',
          paramsTypes: {},
          defaultParams: {},
          glsl:
            '// author: Gunnar Roth\n// based on work from natewave\n// license: MIT\nvec4 transition(vec2 p) {\n  vec2 block = floor(p.xy / vec2(16));\n  vec2 uv_noise = block / vec2(64);\n  uv_noise += floor(vec2(progress) * vec2(1200.0, 3500.0)) / vec2(64);\n  vec2 dist = progress > 0.0 ? (fract(uv_noise) - 0.5) * 0.3 *(1.0 -progress) : vec2(0.0);\n  vec2 red = p + dist * 0.2;\n  vec2 green = p + dist * .3;\n  vec2 blue = p + dist * .5;\n\n  return vec4(mix(getFromColor(red), getToColor(red), progress).r,mix(getFromColor(green), getToColor(green), progress).g,mix(getFromColor(blue), getToColor(blue), progress).b,1.0);\n}\n\n',
          author: 'Gunnar Roth',
          license: 'MIT',
          createdAt: 'Wed, 21 Feb 2018 00:52:15 +0100',
          updatedAt: 'Wed, 21 Feb 2018 19:32:02 +0100'
        },
        {
          name: 'GridFlip',
          paramsTypes: {
            size: 'ivec2',
            pause: 'float',
            dividerWidth: 'float',
            bgcolor: 'vec4',
            randomness: 'float'
          },
          defaultParams: {
            size: [4, 4],
            pause: 0.1,
            dividerWidth: 0.05,
            bgcolor: [0, 0, 0, 1],
            randomness: 0.1
          },
          glsl:
            '// License: MIT\n// Author: TimDonselaar\n// ported by gre from https://gist.github.com/TimDonselaar/9bcd1c4b5934ba60087bdb55c2ea92e5\n\nuniform ivec2 size; // = ivec2(4)\nuniform float pause; // = 0.1\nuniform float dividerWidth; // = 0.05\nuniform vec4 bgcolor; // = vec4(0.0, 0.0, 0.0, 1.0)\nuniform float randomness; // = 0.1\n \nfloat rand (vec2 co) {\n  return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);\n}\n\nfloat getDelta(vec2 p) {\n  vec2 rectanglePos = floor(vec2(size) * p);\n  vec2 rectangleSize = vec2(1.0 / vec2(size).x, 1.0 / vec2(size).y);\n  float top = rectangleSize.y * (rectanglePos.y + 1.0);\n  float bottom = rectangleSize.y * rectanglePos.y;\n  float left = rectangleSize.x * rectanglePos.x;\n  float right = rectangleSize.x * (rectanglePos.x + 1.0);\n  float minX = min(abs(p.x - left), abs(p.x - right));\n  float minY = min(abs(p.y - top), abs(p.y - bottom));\n  return min(minX, minY);\n}\n\nfloat getDividerSize() {\n  vec2 rectangleSize = vec2(1.0 / vec2(size).x, 1.0 / vec2(size).y);\n  return min(rectangleSize.x, rectangleSize.y) * dividerWidth;\n}\n\nvec4 transition(vec2 p) {\n  if(progress < pause) {\n    float currentProg = progress / pause;\n    float a = 1.0;\n    if(getDelta(p) < getDividerSize()) {\n      a = 1.0 - currentProg;\n    }\n    return mix(bgcolor, getFromColor(p), a);\n  }\n  else if(progress < 1.0 - pause){\n    if(getDelta(p) < getDividerSize()) {\n      return bgcolor;\n    } else {\n      float currentProg = (progress - pause) / (1.0 - pause * 2.0);\n      vec2 q = p;\n      vec2 rectanglePos = floor(vec2(size) * q);\n      \n      float r = rand(rectanglePos) - randomness;\n      float cp = smoothstep(0.0, 1.0 - r, currentProg);\n    \n      float rectangleSize = 1.0 / vec2(size).x;\n      float delta = rectanglePos.x * rectangleSize;\n      float offset = rectangleSize / 2.0 + delta;\n      \n      p.x = (p.x - offset)/abs(cp - 0.5)*0.5 + offset;\n      vec4 a = getFromColor(p);\n      vec4 b = getToColor(p);\n      \n      float s = step(abs(vec2(size).x * (q.x - delta) - 0.5), abs(cp - 0.5));\n      return mix(bgcolor, mix(b, a, step(cp, 0.5)), s);\n    }\n  }\n  else {\n    float currentProg = (progress - 1.0 + pause) / pause;\n    float a = 1.0;\n    if(getDelta(p) < getDividerSize()) {\n      a = currentProg;\n    }\n    return mix(bgcolor, getToColor(p), a);\n  }\n}\n',
          license: 'MIT',
          author: 'TimDonselaar',
          createdAt: 'Mon, 12 Jun 2017 11:32:51 +0800',
          updatedAt: 'Mon, 12 Jun 2017 11:32:51 +0800'
        },
        {
          name: 'InvertedPageCurl',
          paramsTypes: {},
          defaultParams: {},
          glsl:
            '// author: Hewlett-Packard\n// license: BSD 3 Clause\n// Adapted by Sergey Kosarevsky from:\n// http://rectalogic.github.io/webvfx/examples_2transition-shader-pagecurl_8html-example.html\n\n/*\nCopyright (c) 2010 Hewlett-Packard Development Company, L.P. All rights reserved.\n\nRedistribution and use in source and binary forms, with or without\nmodification, are permitted provided that the following conditions are\nmet:\n\n   * Redistributions of source code must retain the above copyright\n     notice, this list of conditions and the following disclaimer.\n   * Redistributions in binary form must reproduce the above\n     copyright notice, this list of conditions and the following disclaimer\n     in the documentation and/or other materials provided with the\n     distribution.\n   * Neither the name of Hewlett-Packard nor the names of its\n     contributors may be used to endorse or promote products derived from\n     this software without specific prior written permission.\n\nTHIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS\n"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT\nLIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR\nA PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT\nOWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,\nSPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT\nLIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,\nDATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY\nTHEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT\n(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE\nOF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\nin vec2 texCoord;\n*/\n\nconst float MIN_AMOUNT = -0.16;\nconst float MAX_AMOUNT = 1.5;\nfloat amount = progress * (MAX_AMOUNT - MIN_AMOUNT) + MIN_AMOUNT;\n\nconst float PI = 3.141592653589793;\n\nconst float scale = 512.0;\nconst float sharpness = 3.0;\n\nfloat cylinderCenter = amount;\n// 360 degrees * amount\nfloat cylinderAngle = 2.0 * PI * amount;\n\nconst float cylinderRadius = 1.0 / PI / 2.0;\n\nvec3 hitPoint(float hitAngle, float yc, vec3 point, mat3 rrotation)\n{\n        float hitPoint = hitAngle / (2.0 * PI);\n        point.y = hitPoint;\n        return rrotation * point;\n}\n\nvec4 antiAlias(vec4 color1, vec4 color2, float distanc)\n{\n        distanc *= scale;\n        if (distanc < 0.0) return color2;\n        if (distanc > 2.0) return color1;\n        float dd = pow(1.0 - distanc / 2.0, sharpness);\n        return ((color2 - color1) * dd) + color1;\n}\n\nfloat distanceToEdge(vec3 point)\n{\n        float dx = abs(point.x > 0.5 ? 1.0 - point.x : point.x);\n        float dy = abs(point.y > 0.5 ? 1.0 - point.y : point.y);\n        if (point.x < 0.0) dx = -point.x;\n        if (point.x > 1.0) dx = point.x - 1.0;\n        if (point.y < 0.0) dy = -point.y;\n        if (point.y > 1.0) dy = point.y - 1.0;\n        if ((point.x < 0.0 || point.x > 1.0) && (point.y < 0.0 || point.y > 1.0)) return sqrt(dx * dx + dy * dy);\n        return min(dx, dy);\n}\n\nvec4 seeThrough(float yc, vec2 p, mat3 rotation, mat3 rrotation)\n{\n        float hitAngle = PI - (acos(yc / cylinderRadius) - cylinderAngle);\n        vec3 point = hitPoint(hitAngle, yc, rotation * vec3(p, 1.0), rrotation);\n        if (yc <= 0.0 && (point.x < 0.0 || point.y < 0.0 || point.x > 1.0 || point.y > 1.0))\n        {\n            return getToColor(p);\n        }\n\n        if (yc > 0.0) return getFromColor(p);\n\n        vec4 color = getFromColor(point.xy);\n        vec4 tcolor = vec4(0.0);\n\n        return antiAlias(color, tcolor, distanceToEdge(point));\n}\n\nvec4 seeThroughWithShadow(float yc, vec2 p, vec3 point, mat3 rotation, mat3 rrotation)\n{\n        float shadow = distanceToEdge(point) * 30.0;\n        shadow = (1.0 - shadow) / 3.0;\n\n        if (shadow < 0.0) shadow = 0.0; else shadow *= amount;\n\n        vec4 shadowColor = seeThrough(yc, p, rotation, rrotation);\n        shadowColor.r -= shadow;\n        shadowColor.g -= shadow;\n        shadowColor.b -= shadow;\n\n        return shadowColor;\n}\n\nvec4 backside(float yc, vec3 point)\n{\n        vec4 color = getFromColor(point.xy);\n        float gray = (color.r + color.b + color.g) / 15.0;\n        gray += (8.0 / 10.0) * (pow(1.0 - abs(yc / cylinderRadius), 2.0 / 10.0) / 2.0 + (5.0 / 10.0));\n        color.rgb = vec3(gray);\n        return color;\n}\n\nvec4 behindSurface(vec2 p, float yc, vec3 point, mat3 rrotation)\n{\n        float shado = (1.0 - ((-cylinderRadius - yc) / amount * 7.0)) / 6.0;\n        shado *= 1.0 - abs(point.x - 0.5);\n\n        yc = (-cylinderRadius - cylinderRadius - yc);\n\n        float hitAngle = (acos(yc / cylinderRadius) + cylinderAngle) - PI;\n        point = hitPoint(hitAngle, yc, point, rrotation);\n\n        if (yc < 0.0 && point.x >= 0.0 && point.y >= 0.0 && point.x <= 1.0 && point.y <= 1.0 && (hitAngle < PI || amount > 0.5))\n        {\n                shado = 1.0 - (sqrt(pow(point.x - 0.5, 2.0) + pow(point.y - 0.5, 2.0)) / (71.0 / 100.0));\n                shado *= pow(-yc / cylinderRadius, 3.0);\n                shado *= 0.5;\n        }\n        else\n        {\n                shado = 0.0;\n        }\n        return vec4(getToColor(p).rgb - shado, 1.0);\n}\n\nvec4 transition(vec2 p) {\n\n  const float angle = 100.0 * PI / 180.0;\n        float c = cos(-angle);\n        float s = sin(-angle);\n\n        mat3 rotation = mat3( c, s, 0,\n                                                                -s, c, 0,\n                                                                -0.801, 0.8900, 1\n                                                                );\n        c = cos(angle);\n        s = sin(angle);\n\n        mat3 rrotation = mat3(\tc, s, 0,\n                                                                        -s, c, 0,\n                                                                        0.98500, 0.985, 1\n                                                                );\n\n        vec3 point = rotation * vec3(p, 1.0);\n\n        float yc = point.y - cylinderCenter;\n\n        if (yc < -cylinderRadius)\n        {\n                // Behind surface\n                return behindSurface(p,yc, point, rrotation);\n        }\n\n        if (yc > cylinderRadius)\n        {\n                // Flat surface\n                return getFromColor(p);\n        }\n\n        float hitAngle = (acos(yc / cylinderRadius) + cylinderAngle) - PI;\n\n        float hitAngleMod = mod(hitAngle, 2.0 * PI);\n        if ((hitAngleMod > PI && amount < 0.5) || (hitAngleMod > PI/2.0 && amount < 0.0))\n        {\n                return seeThrough(yc, p, rotation, rrotation);\n        }\n\n        point = hitPoint(hitAngle, yc, point, rrotation);\n\n        if (point.x < 0.0 || point.y < 0.0 || point.x > 1.0 || point.y > 1.0)\n        {\n                return seeThroughWithShadow(yc, p, point, rotation, rrotation);\n        }\n\n        vec4 color = backside(yc, point);\n\n        vec4 otherColor;\n        if (yc < 0.0)\n        {\n                float shado = 1.0 - (sqrt(pow(point.x - 0.5, 2.0) + pow(point.y - 0.5, 2.0)) / 0.71);\n                shado *= pow(-yc / cylinderRadius, 3.0);\n                shado *= 0.5;\n                otherColor = vec4(0.0, 0.0, 0.0, shado);\n        }\n        else\n        {\n                otherColor = getFromColor(p);\n        }\n\n        color = antiAlias(color, otherColor, cylinderRadius - abs(yc));\n\n        vec4 cl = seeThroughWithShadow(yc, p, point, rotation, rrotation);\n        float dist = distanceToEdge(point);\n\n        return antiAlias(color, cl, dist);\n}\n',
          author: 'Hewlett-Packard',
          license: 'BSD 3 Clause',
          createdAt: 'Wed, 21 Feb 2018 01:13:49 +0100',
          updatedAt: 'Wed, 21 Feb 2018 16:00:02 +0100'
        },
        {
          name: 'LinearBlur',
          paramsTypes: { intensity: 'float' },
          defaultParams: { intensity: 0.1 },
          glsl:
            '// author: gre\n// license: MIT\nuniform float intensity; // = 0.1\nconst int passes = 6;\n\nvec4 transition(vec2 uv) {\n    vec4 c1 = vec4(0.0);\n    vec4 c2 = vec4(0.0);\n\n    float disp = intensity*(0.5-distance(0.5, progress));\n    for (int xi=0; xi<passes; xi++)\n    {\n        float x = float(xi) / float(passes) - 0.5;\n        for (int yi=0; yi<passes; yi++)\n        {\n            float y = float(yi) / float(passes) - 0.5;\n            vec2 v = vec2(x,y);\n            float d = disp;\n            c1 += getFromColor( uv + d*v);\n            c2 += getToColor( uv + d*v);\n        }\n    }\n    c1 /= float(passes*passes);\n    c2 /= float(passes*passes);\n    return mix(c1, c2, progress);\n}\n',
          author: 'gre',
          license: 'MIT',
          createdAt: 'Fri, 23 Feb 2018 15:18:22 +0100',
          updatedAt: 'Fri, 23 Feb 2018 15:18:22 +0100'
        },
        {
          name: 'Mosaic',
          paramsTypes: { endx: 'int', endy: 'int' },
          defaultParams: { endx: 2, endy: -1 },
          glsl:
            '// License: MIT\n// Author: Xaychru\n// ported by gre from https://gist.github.com/Xaychru/130bb7b7affedbda9df5\n\n#define PI 3.14159265358979323\n#define POW2(X) X*X\n#define POW3(X) X*X*X\nuniform int endx; // = 2\nuniform int endy; // = -1\n\nfloat Rand(vec2 v) {\n  return fract(sin(dot(v.xy ,vec2(12.9898,78.233))) * 43758.5453);\n}\nvec2 Rotate(vec2 v, float a) {\n  mat2 rm = mat2(cos(a), -sin(a),\n                 sin(a), cos(a));\n  return rm*v;\n}\nfloat CosInterpolation(float x) {\n  return -cos(x*PI)/2.+.5;\n}\nvec4 transition(vec2 uv) {\n  vec2 p = uv.xy / vec2(1.0).xy - .5;\n  vec2 rp = p;\n  float rpr = (progress*2.-1.);\n  float z = -(rpr*rpr*2.) + 3.;\n  float az = abs(z);\n  rp *= az;\n  rp += mix(vec2(.5, .5), vec2(float(endx) + .5, float(endy) + .5), POW2(CosInterpolation(progress)));\n  vec2 mrp = mod(rp, 1.);\n  vec2 crp = rp;\n  bool onEnd = int(floor(crp.x))==endx&&int(floor(crp.y))==endy;\n  if(!onEnd) {\n    float ang = float(int(Rand(floor(crp))*4.))*.5*PI;\n    mrp = vec2(.5) + Rotate(mrp-vec2(.5), ang);\n  }\n  if(onEnd || Rand(floor(crp))>.5) {\n    return getToColor(mrp);\n  } else {\n    return getFromColor(mrp);\n  }\n}\n',
          license: 'MIT',
          author: 'Xaychru',
          createdAt: 'Mon, 12 Jun 2017 10:26:51 +0800',
          updatedAt: 'Mon, 12 Jun 2017 10:26:51 +0800'
        },
        {
          name: 'PolkaDotsCurtain',
          paramsTypes: { dots: 'float', center: 'vec2' },
          defaultParams: { dots: 20, center: [0, 0] },
          glsl:
            '// author: bobylito\n// license: MIT\nconst float SQRT_2 = 1.414213562373;\nuniform float dots;// = 20.0;\nuniform vec2 center;// = vec2(0, 0);\n\nvec4 transition(vec2 uv) {\n  bool nextImage = distance(fract(uv * dots), vec2(0.5, 0.5)) < ( progress / distance(uv, center));\n  return nextImage ? getToColor(uv) : getFromColor(uv);\n}\n',
          author: 'bobylito',
          license: 'MIT',
          createdAt: 'Tue, 20 Feb 2018 23:41:45 +0100',
          updatedAt: 'Tue, 20 Feb 2018 23:41:45 +0100'
        },
        {
          name: 'Radial',
          paramsTypes: { smoothness: 'float' },
          defaultParams: { smoothness: 1 },
          glsl:
            '// License: MIT\n// Author: Xaychru\n// ported by gre from https://gist.github.com/Xaychru/ce1d48f0ce00bb379750\n\nuniform float smoothness; // = 1.0\n\nconst float PI = 3.141592653589;\n\nvec4 transition(vec2 p) {\n  vec2 rp = p*2.-1.;\n  return mix(\n    getToColor(p),\n    getFromColor(p),\n    smoothstep(0., smoothness, atan(rp.y,rp.x) - (progress-.5) * PI * 2.5)\n  );\n}\n',
          license: 'MIT',
          author: 'Xaychru',
          createdAt: 'Mon, 12 Jun 2017 10:36:24 +0800',
          updatedAt: 'Mon, 12 Jun 2017 10:36:24 +0800'
        },
        {
          name: 'SimpleZoom',
          paramsTypes: { zoom_quickness: 'float' },
          defaultParams: { zoom_quickness: 0.8 },
          glsl:
            '// Author: 0gust1\n// License: MIT\n\nuniform float zoom_quickness; // = 0.8\nfloat nQuick = clamp(zoom_quickness,0.2,1.0);\n\nvec2 zoom(vec2 uv, float amount) {\n  return 0.5 + ((uv - 0.5) * (1.0-amount));\t\n}\n\nvec4 transition (vec2 uv) {\n  return mix(\n    getFromColor(zoom(uv, smoothstep(0.0, nQuick, progress))),\n    getToColor(uv),\n   smoothstep(nQuick-0.2, 1.0, progress)\n  );\n}',
          author: '0gust1',
          license: 'MIT',
          createdAt: 'Tue, 6 Mar 2018 00:43:47 +0100',
          updatedAt: 'Tue, 6 Mar 2018 00:43:47 +0100'
        },
        {
          name: 'StereoViewer',
          paramsTypes: { zoom: 'float', corner_radius: 'float' },
          defaultParams: { zoom: 0.88, corner_radius: 0.22 },
          glsl:
            "// Tunable parameters\n// How much to zoom (out) for the effect ~ 0.5 - 1.0\nuniform float zoom; // = 0.88\n// Corner radius as a fraction of the image height\nuniform float corner_radius;  // = 0.22\n\n// author: Ted Schundler\n// license: BSD 2 Clause\n// Free for use and modification by anyone with credit\n\n// Copyright (c) 2016, Theodore K Schundler\n// All rights reserved.\n\n// Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:\n\n// 1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.\n\n// 2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.\n\n// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS \"AS IS\" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\n\n///////////////////////////////////////////////////////////////////////////////\n// Stereo Viewer Toy Transition                                              //\n//                                                                           //\n// Inspired by ViewMaster / Image3D image viewer devices.                    //\n// This effect is similar to what you see when you press the device's lever. //\n// There is a quick zoom in / out to make the transition 'valid' for GLSL.io //\n///////////////////////////////////////////////////////////////////////////////\n\nconst vec4 black = vec4(0.0, 0.0, 0.0, 1.0);\nconst vec2 c00 = vec2(0.0, 0.0); // the four corner points\nconst vec2 c01 = vec2(0.0, 1.0);\nconst vec2 c11 = vec2(1.0, 1.0);\nconst vec2 c10 = vec2(1.0, 0.0);\n\n// Check if a point is within a given corner\nbool in_corner(vec2 p, vec2 corner, vec2 radius) {\n  // determine the direction we want to be filled\n  vec2 axis = (c11 - corner) - corner;\n\n  // warp the point so we are always testing the bottom left point with the\n  // circle centered on the origin\n  p = p - (corner + axis * radius);\n  p *= axis / radius;\n  return (p.x > 0.0 && p.y > -1.0) || (p.y > 0.0 && p.x > -1.0) || dot(p, p) < 1.0;\n}\n\n// Check all four corners\n// return a float for v2 for anti-aliasing?\nbool test_rounded_mask(vec2 p, vec2 corner_size) {\n  return\n      in_corner(p, c00, corner_size) &&\n      in_corner(p, c01, corner_size) &&\n      in_corner(p, c10, corner_size) &&\n      in_corner(p, c11, corner_size);\n}\n\n// Screen blend mode - https://en.wikipedia.org/wiki/Blend_modes\n// This more closely approximates what you see than linear blending\nvec4 screen(vec4 a, vec4 b) {\n  return 1.0 - (1.0 - a) * (1.0 -b);\n}\n\n// Given RGBA, find a value that when screened with itself\n// will yield the original value.\nvec4 unscreen(vec4 c) {\n  return 1.0 - sqrt(1.0 - c);\n}\n\n// Grab a pixel, only if it isn't masked out by the rounded corners\nvec4 sample_with_corners_from(vec2 p, vec2 corner_size) {\n  p = (p - 0.5) / zoom + 0.5;\n  if (!test_rounded_mask(p, corner_size)) {\n    return black;\n  }\n  return unscreen(getFromColor(p));\n}\n\nvec4 sample_with_corners_to(vec2 p, vec2 corner_size) {\n  p = (p - 0.5) / zoom + 0.5;\n  if (!test_rounded_mask(p, corner_size)) {\n    return black;\n  }\n  return unscreen(getToColor(p));\n}\n\n// special sampling used when zooming - extra zoom parameter and don't unscreen\nvec4 simple_sample_with_corners_from(vec2 p, vec2 corner_size, float zoom_amt) {\n  p = (p - 0.5) / (1.0 - zoom_amt + zoom * zoom_amt) + 0.5;\n  if (!test_rounded_mask(p, corner_size)) {\n    return black;\n  }\n  return getFromColor(p);\n}\n\nvec4 simple_sample_with_corners_to(vec2 p, vec2 corner_size, float zoom_amt) {\n  p = (p - 0.5) / (1.0 - zoom_amt + zoom * zoom_amt) + 0.5;\n  if (!test_rounded_mask(p, corner_size)) {\n    return black;\n  }\n  return getToColor(p);\n}\n\n// Basic 2D affine transform matrix helpers\n// These really shouldn't be used in a fragment shader - I should work out the\n// the math for a translate & rotate function as a pair of dot products instead\n\nmat3 rotate2d(float angle, float ratio) {\n  float s = sin(angle);\n  float c = cos(angle);\n  return mat3(\n    c, s ,0.0,\n    -s, c, 0.0,\n    0.0, 0.0, 1.0);\n}\n\nmat3 translate2d(float x, float y) {\n  return mat3(\n    1.0, 0.0, 0,\n    0.0, 1.0, 0,\n    -x, -y, 1.0);\n}\n\nmat3 scale2d(float x, float y) {\n  return mat3(\n    x, 0.0, 0,\n    0.0, y, 0,\n    0, 0, 1.0);\n}\n\n// Split an image and rotate one up and one down along off screen pivot points\nvec4 get_cross_rotated(vec3 p3, float angle, vec2 corner_size, float ratio) {\n  angle = angle * angle; // easing\n  angle /= 2.4; // works out to be a good number of radians\n\n  mat3 center_and_scale = translate2d(-0.5, -0.5) * scale2d(1.0, ratio);\n  mat3 unscale_and_uncenter = scale2d(1.0, 1.0/ratio) * translate2d(0.5,0.5);\n  mat3 slide_left = translate2d(-2.0,0.0);\n  mat3 slide_right = translate2d(2.0,0.0);\n  mat3 rotate = rotate2d(angle, ratio);\n\n  mat3 op_a = center_and_scale * slide_right * rotate * slide_left * unscale_and_uncenter;\n  mat3 op_b = center_and_scale * slide_left * rotate * slide_right * unscale_and_uncenter;\n\n  vec4 a = sample_with_corners_from((op_a * p3).xy, corner_size);\n  vec4 b = sample_with_corners_from((op_b * p3).xy, corner_size);\n\n  return screen(a, b);\n}\n\n// Image stays put, but this time move two masks\nvec4 get_cross_masked(vec3 p3, float angle, vec2 corner_size, float ratio) {\n  angle = 1.0 - angle;\n  angle = angle * angle; // easing\n  angle /= 2.4;\n\n  vec4 img;\n\n  mat3 center_and_scale = translate2d(-0.5, -0.5) * scale2d(1.0, ratio);\n  mat3 unscale_and_uncenter = scale2d(1.0 / zoom, 1.0 / (zoom * ratio)) * translate2d(0.5,0.5);\n  mat3 slide_left = translate2d(-2.0,0.0);\n  mat3 slide_right = translate2d(2.0,0.0);\n  mat3 rotate = rotate2d(angle, ratio);\n\n  mat3 op_a = center_and_scale * slide_right * rotate * slide_left * unscale_and_uncenter;\n  mat3 op_b = center_and_scale * slide_left * rotate * slide_right * unscale_and_uncenter;\n\n  bool mask_a = test_rounded_mask((op_a * p3).xy, corner_size);\n  bool mask_b = test_rounded_mask((op_b * p3).xy, corner_size);\n\n  if (mask_a || mask_b) {\n    img = sample_with_corners_to(p3.xy, corner_size);\n    return screen(mask_a ? img : black, mask_b ? img : black);\n  } else {\n    return black;\n  }\n}\n\nvec4 transition(vec2 uv) {\n  float a;\n  vec2 p=uv.xy/vec2(1.0).xy;\n  vec3 p3 = vec3(p.xy, 1.0); // for 2D matrix transforms\n\n  // corner is warped to represent to size after mapping to 1.0, 1.0\n  vec2 corner_size = vec2(corner_radius / ratio, corner_radius);\n\n  if (progress <= 0.0) {\n    // 0.0: start with the base frame always\n    return getFromColor(p);\n  } else if (progress < 0.1) {\n    // 0.0-0.1: zoom out and add rounded corners\n    a = progress / 0.1;\n    return  simple_sample_with_corners_from(p, corner_size * a, a);\n  } else if (progress < 0.48) {\n    // 0.1-0.48: Split original image apart\n    a = (progress - 0.1)/0.38;\n    return get_cross_rotated(p3, a, corner_size, ratio);\n  } else if (progress < 0.9) {\n    // 0.48-0.52: black\n    // 0.52 - 0.9: unmask new image\n    return get_cross_masked(p3, (progress - 0.52)/0.38, corner_size, ratio);\n  } else if (progress < 1.0) {\n    // zoom out and add rounded corners\n    a = (1.0 - progress) / 0.1;\n    return simple_sample_with_corners_to(p, corner_size * a, a);\n  } else {\n    // 1.0 end with base frame\n    return getToColor(p);\n  }\n}\n",
          author: 'Ted Schundler',
          license: 'BSD 2 Clause',
          createdAt: 'Tue, 20 Feb 2018 23:20:29 +0100',
          updatedAt: 'Wed, 21 Feb 2018 15:42:00 +0100'
        },
        {
          name: 'Swirl',
          paramsTypes: {},
          defaultParams: {},
          glsl:
            '// License: MIT\n// Author: Sergey Kosarevsky\n// ( http://www.linderdaum.com )\n// ported by gre from https://gist.github.com/corporateshark/cacfedb8cca0f5ce3f7c\n\nvec4 transition(vec2 UV)\n{\n\tfloat Radius = 1.0;\n\n\tfloat T = progress;\n\n\tUV -= vec2( 0.5, 0.5 );\n\n\tfloat Dist = length(UV);\n\n\tif ( Dist < Radius )\n\t{\n\t\tfloat Percent = (Radius - Dist) / Radius;\n\t\tfloat A = ( T <= 0.5 ) ? mix( 0.0, 1.0, T/0.5 ) : mix( 1.0, 0.0, (T-0.5)/0.5 );\n\t\tfloat Theta = Percent * Percent * A * 8.0 * 3.14159;\n\t\tfloat S = sin( Theta );\n\t\tfloat C = cos( Theta );\n\t\tUV = vec2( dot(UV, vec2(C, -S)), dot(UV, vec2(S, C)) );\n\t}\n\tUV += vec2( 0.5, 0.5 );\n\n\tvec4 C0 = getFromColor(UV);\n\tvec4 C1 = getToColor(UV);\n\n\treturn mix( C0, C1, T );\n}\n',
          license: 'MIT',
          author: 'Sergey Kosarevsky',
          createdAt: 'Mon, 12 Jun 2017 12:38:27 +0800',
          updatedAt: 'Mon, 12 Jun 2017 12:38:27 +0800'
        },
        {
          name: 'WaterDrop',
          paramsTypes: { amplitude: 'float', speed: 'float' },
          defaultParams: { amplitude: 30, speed: 30 },
          glsl:
            '// author: Paweł Płóciennik\n// license: MIT\nuniform float amplitude; // = 30\nuniform float speed; // = 30\n\nvec4 transition(vec2 p) {\n  vec2 dir = p - vec2(.5);\n  float dist = length(dir);\n\n  if (dist > progress) {\n    return mix(getFromColor( p), getToColor( p), progress);\n  } else {\n    vec2 offset = dir * sin(dist * amplitude - progress * speed);\n    return mix(getFromColor( p + offset), getToColor( p), progress);\n  }\n}\n',
          author: 'Paweł Płóciennik',
          license: 'MIT',
          createdAt: 'Wed, 21 Feb 2018 19:37:15 +0100',
          updatedAt: 'Wed, 21 Feb 2018 19:37:15 +0100'
        },
        {
          name: 'ZoomInCircles',
          paramsTypes: {},
          defaultParams: {},
          glsl:
            '// License: MIT\n// Author: dycm8009\n// ported by gre from https://gist.github.com/dycm8009/948e99b1800e81ad909a\n\nvec2 zoom(vec2 uv, float amount) {\n  return 0.5 + ((uv - 0.5) * amount);\t\n}\n\nvec2 ratio2 = vec2(1.0, 1.0 / ratio);\n\nvec4 transition(vec2 uv) {\n  // TODO: some timing are hardcoded but should be one or many parameters\n  // TODO: should also be able to configure how much circles\n  // TODO: if() branching should be avoided when possible, prefer use of step() & other functions\n  vec2 r = 2.0 * ((vec2(uv.xy) - 0.5) * ratio2);\n  float pro = progress / 0.8;\n  float z = pro * 0.2;\n  float t = 0.0;\n  if (pro > 1.0) {\n    z = 0.2 + (pro - 1.0) * 5.;\n    t = clamp((progress - 0.8) / 0.07, 0.0, 1.0);\n  }\n  if (length(r) < 0.5+z) {\n    // uv = zoom(uv, 0.9 - 0.1 * pro);\n  }\n  else if (length(r) < 0.8+z*1.5) {\n    uv = zoom(uv, 1.0 - 0.15 * pro);\n    t = t * 0.5;\n  }\n  else if (length(r) < 1.2+z*2.5) {\n    uv = zoom(uv, 1.0 - 0.2 * pro);\n    t = t * 0.2;\n  }\n  else {\n    uv = zoom(uv, 1.0 - 0.25 * pro);\n  }\n  return mix(getFromColor(uv), getToColor(uv), t);\n}\n',
          license: 'MIT',
          author: 'dycm8009',
          createdAt: 'Mon, 12 Jun 2017 11:24:34 +0800',
          updatedAt: 'Mon, 12 Jun 2017 11:24:34 +0800'
        },
        {
          name: 'angular',
          paramsTypes: { startingAngle: 'float' },
          defaultParams: { startingAngle: 90 },
          glsl:
            '// Author: Fernando Kuteken\n// License: MIT\n\n#define PI 3.141592653589\n\nuniform float startingAngle; // = 90;\n\nvec4 transition (vec2 uv) {\n  \n  float offset = startingAngle * PI / 180.0;\n  float angle = atan(uv.y - 0.5, uv.x - 0.5) + offset;\n  float normalizedAngle = (angle + PI) / (2.0 * PI);\n  \n  normalizedAngle = normalizedAngle - floor(normalizedAngle);\n\n  return mix(\n    getFromColor(uv),\n    getToColor(uv),\n    step(normalizedAngle, progress)\n    );\n}\n',
          author: 'Fernando Kuteken',
          license: 'MIT',
          createdAt: 'Tue, 30 May 2017 14:26:44 +0200',
          updatedAt: 'Tue, 30 May 2017 14:26:44 +0200'
        },
        {
          name: 'burn',
          paramsTypes: { color: 'vec3' },
          defaultParams: { color: [0.9, 0.4, 0.2] },
          glsl:
            '// author: gre\n// License: MIT\nuniform vec3 color /* = vec3(0.9, 0.4, 0.2) */;\nvec4 transition (vec2 uv) {\n  return mix(\n    getFromColor(uv) + vec4(progress*color, 1.0),\n    getToColor(uv) + vec4((1.0-progress)*color, 1.0),\n    progress\n  );\n}\n',
          author: 'gre',
          license: 'MIT',
          createdAt: 'Tue, 30 May 2017 14:26:44 +0200',
          updatedAt: 'Tue, 30 May 2017 14:26:44 +0200'
        },
        {
          name: 'cannabisleaf',
          paramsTypes: {},
          defaultParams: {},
          glsl:
            '// Author: @Flexi23\n// License: MIT\n\n// inspired by http://www.wolframalpha.com/input/?i=cannabis+curve\n\nvec4 transition (vec2 uv) {\n  if(progress == 0.0){\n    return getFromColor(uv);\n  }\n  vec2 leaf_uv = (uv - vec2(0.5))/10./pow(progress,3.5);\n\tleaf_uv.y += 0.35;\n\tfloat r = 0.18;\n\tfloat o = atan(leaf_uv.y, leaf_uv.x);\n  return mix(getFromColor(uv), getToColor(uv), 1.-step(1. - length(leaf_uv)+r*(1.+sin(o))*(1.+0.9 * cos(8.*o))*(1.+0.1*cos(24.*o))*(0.9+0.05*cos(200.*o)), 1.));\n}\n',
          author: '@Flexi23',
          license: 'MIT',
          createdAt: 'Thu, 1 Jun 2017 15:58:58 +0200',
          updatedAt: 'Thu, 1 Jun 2017 15:58:58 +0200'
        },
        {
          name: 'circle',
          paramsTypes: { center: 'vec2', backColor: 'vec3' },
          defaultParams: { center: [0.5, 0.5], backColor: [0.1, 0.1, 0.1] },
          glsl:
            '// Author: Fernando Kuteken\n// License: MIT\n\nuniform vec2 center; // = vec2(0.5, 0.5);\nuniform vec3 backColor; // = vec3(0.1, 0.1, 0.1);\n\nvec4 transition (vec2 uv) {\n  \n  float distance = length(uv - center);\n  float radius = sqrt(8.0) * abs(progress - 0.5);\n  \n  if (distance > radius) {\n    return vec4(backColor, 1.0);\n  }\n  else {\n    if (progress < 0.5) return getFromColor(uv);\n    else return getToColor(uv);\n  }\n}\n',
          author: 'Fernando Kuteken',
          license: 'MIT',
          createdAt: 'Tue, 30 May 2017 14:26:44 +0200',
          updatedAt: 'Tue, 30 May 2017 14:26:44 +0200'
        },
        {
          name: 'circleopen',
          paramsTypes: { smoothness: 'float', opening: 'bool' },
          defaultParams: { smoothness: 0.3, opening: !0 },
          glsl:
            '// author: gre\n// License: MIT\nuniform float smoothness; // = 0.3\nuniform bool opening; // = true\n\nconst vec2 center = vec2(0.5, 0.5);\nconst float SQRT_2 = 1.414213562373;\n\nvec4 transition (vec2 uv) {\n  float x = opening ? progress : 1.-progress;\n  float m = smoothstep(-smoothness, 0.0, SQRT_2*distance(center, uv) - x*(1.+smoothness));\n  return mix(getFromColor(uv), getToColor(uv), opening ? 1.-m : m);\n}\n',
          author: 'gre',
          license: 'MIT',
          createdAt: 'Tue, 30 May 2017 14:26:44 +0200',
          updatedAt: 'Tue, 30 May 2017 14:26:44 +0200'
        },
        {
          name: 'colorphase',
          paramsTypes: { fromStep: 'vec4', toStep: 'vec4' },
          defaultParams: {
            fromStep: [0, 0.2, 0.4, 0],
            toStep: [0.6, 0.8, 1, 1]
          },
          glsl:
            '// Author: gre\n// License: MIT\n\n// Usage: fromStep and toStep must be in [0.0, 1.0] range \n// and all(fromStep) must be < all(toStep)\n\nuniform vec4 fromStep; // = vec4(0.0, 0.2, 0.4, 0.0)\nuniform vec4 toStep; // = vec4(0.6, 0.8, 1.0, 1.0)\n\nvec4 transition (vec2 uv) {\n  vec4 a = getFromColor(uv);\n  vec4 b = getToColor(uv);\n  return mix(a, b, smoothstep(fromStep, toStep, vec4(progress)));\n}\n',
          author: 'gre',
          license: 'MIT',
          createdAt: 'Tue, 30 May 2017 14:26:44 +0200',
          updatedAt: 'Tue, 30 May 2017 14:26:44 +0200'
        },
        {
          name: 'crosshatch',
          paramsTypes: {
            center: 'vec2',
            threshold: 'float',
            fadeEdge: 'float'
          },
          defaultParams: { center: [0.5, 0.5], threshold: 3, fadeEdge: 0.1 },
          glsl:
            '// License: MIT\n// Author: pthrasher\n// adapted by gre from https://gist.github.com/pthrasher/04fd9a7de4012cbb03f6\n\nuniform vec2 center; // = vec2(0.5)\nuniform float threshold; // = 3.0\nuniform float fadeEdge; // = 0.1\n\nfloat rand(vec2 co) {\n  return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);\n}\nvec4 transition(vec2 p) {\n  float dist = distance(center, p) / threshold;\n  float r = progress - min(rand(vec2(p.y, 0.0)), rand(vec2(0.0, p.x)));\n  return mix(getFromColor(p), getToColor(p), mix(0.0, mix(step(dist, r), 1.0, smoothstep(1.0-fadeEdge, 1.0, progress)), smoothstep(0.0, fadeEdge, progress)));    \n}\n',
          license: 'MIT',
          author: 'pthrasher',
          createdAt: 'Mon, 12 Jun 2017 10:02:12 +0800',
          updatedAt: 'Mon, 12 Jun 2017 10:02:12 +0800'
        },
        {
          name: 'crosswarp',
          paramsTypes: {},
          defaultParams: {},
          glsl:
            '// Author: Eke Péter <peterekepeter@gmail.com>\n// License: MIT\nvec4 transition(vec2 p) {\n  float x = progress;\n  x=smoothstep(.0,1.0,(x*2.0+p.x-1.0));\n  return mix(getFromColor((p-.5)*(1.-x)+.5), getToColor((p-.5)*x+.5), x);\n}\n',
          author: 'Eke Péter <peterekepeter@gmail.com>',
          license: 'MIT',
          createdAt: 'Tue, 30 May 2017 14:26:44 +0200',
          updatedAt: 'Tue, 30 May 2017 14:26:44 +0200'
        },
        {
          name: 'cube',
          paramsTypes: {
            persp: 'float',
            unzoom: 'float',
            reflection: 'float',
            floating: 'float'
          },
          defaultParams: {
            persp: 0.7,
            unzoom: 0.3,
            reflection: 0.4,
            floating: 3
          },
          glsl:
            '// Author: gre\n// License: MIT\nuniform float persp; // = 0.7\nuniform float unzoom; // = 0.3\nuniform float reflection; // = 0.4\nuniform float floating; // = 3.0\n\nvec2 project (vec2 p) {\n  return p * vec2(1.0, -1.2) + vec2(0.0, -floating/100.);\n}\n\nbool inBounds (vec2 p) {\n  return all(lessThan(vec2(0.0), p)) && all(lessThan(p, vec2(1.0)));\n}\n\nvec4 bgColor (vec2 p, vec2 pfr, vec2 pto) {\n  vec4 c = vec4(0.0, 0.0, 0.0, 1.0);\n  pfr = project(pfr);\n  // FIXME avoid branching might help perf!\n  if (inBounds(pfr)) {\n    c += mix(vec4(0.0), getFromColor(pfr), reflection * mix(1.0, 0.0, pfr.y));\n  }\n  pto = project(pto);\n  if (inBounds(pto)) {\n    c += mix(vec4(0.0), getToColor(pto), reflection * mix(1.0, 0.0, pto.y));\n  }\n  return c;\n}\n\n// p : the position\n// persp : the perspective in [ 0, 1 ]\n// center : the xcenter in [0, 1] \\ 0.5 excluded\nvec2 xskew (vec2 p, float persp, float center) {\n  float x = mix(p.x, 1.0-p.x, center);\n  return (\n    (\n      vec2( x, (p.y - 0.5*(1.0-persp) * x) / (1.0+(persp-1.0)*x) )\n      - vec2(0.5-distance(center, 0.5), 0.0)\n    )\n    * vec2(0.5 / distance(center, 0.5) * (center<0.5 ? 1.0 : -1.0), 1.0)\n    + vec2(center<0.5 ? 0.0 : 1.0, 0.0)\n  );\n}\n\nvec4 transition(vec2 op) {\n  float uz = unzoom * 2.0*(0.5-distance(0.5, progress));\n  vec2 p = -uz*0.5+(1.0+uz) * op;\n  vec2 fromP = xskew(\n    (p - vec2(progress, 0.0)) / vec2(1.0-progress, 1.0),\n    1.0-mix(progress, 0.0, persp),\n    0.0\n  );\n  vec2 toP = xskew(\n    p / vec2(progress, 1.0),\n    mix(pow(progress, 2.0), 1.0, persp),\n    1.0\n  );\n  // FIXME avoid branching might help perf!\n  if (inBounds(fromP)) {\n    return getFromColor(fromP);\n  }\n  else if (inBounds(toP)) {\n    return getToColor(toP);\n  }\n  return bgColor(op, fromP, toP);\n}\n',
          author: 'gre',
          license: 'MIT',
          createdAt: 'Tue, 30 May 2017 14:26:44 +0200',
          updatedAt: 'Tue, 30 May 2017 14:26:44 +0200'
        },
        {
          name: 'directionalwarp',
          paramsTypes: { direction: 'vec2' },
          defaultParams: { direction: [-1, 1] },
          glsl:
            '// Author: pschroen\n// License: MIT\n\nuniform vec2 direction; // = vec2(-1.0, 1.0)\n\nconst float smoothness = 0.5;\nconst vec2 center = vec2(0.5, 0.5);\n\nvec4 transition (vec2 uv) {\n  vec2 v = normalize(direction);\n  v /= abs(v.x) + abs(v.y);\n  float d = v.x * center.x + v.y * center.y;\n  float m = 1.0 - smoothstep(-smoothness, 0.0, v.x * uv.x + v.y * uv.y - (d - 0.5 + progress * (1.0 + smoothness)));\n  return mix(getFromColor((uv - 0.5) * (1.0 - m) + 0.5), getToColor((uv - 0.5) * m + 0.5), m);\n}\n',
          author: 'pschroen',
          license: 'MIT',
          createdAt: 'Wed, 13 Dec 2017 12:08:49 -0500',
          updatedAt: 'Wed, 13 Dec 2017 12:08:49 -0500'
        },
        {
          name: 'directionalwipe',
          paramsTypes: { direction: 'vec2', smoothness: 'float' },
          defaultParams: { direction: [1, -1], smoothness: 0.5 },
          glsl:
            '// Author: gre\n// License: MIT\n\nuniform vec2 direction; // = vec2(1.0, -1.0)\nuniform float smoothness; // = 0.5\n \nconst vec2 center = vec2(0.5, 0.5);\n \nvec4 transition (vec2 uv) {\n  vec2 v = normalize(direction);\n  v /= abs(v.x)+abs(v.y);\n  float d = v.x * center.x + v.y * center.y;\n  float m =\n    (1.0-step(progress, 0.0)) * // there is something wrong with our formula that makes m not equals 0.0 with progress is 0.0\n    (1.0 - smoothstep(-smoothness, 0.0, v.x * uv.x + v.y * uv.y - (d-0.5+progress*(1.+smoothness))));\n  return mix(getFromColor(uv), getToColor(uv), m);\n}\n',
          author: 'gre',
          license: 'MIT',
          createdAt: 'Tue, 30 May 2017 14:26:44 +0200',
          updatedAt: 'Tue, 30 May 2017 14:26:44 +0200'
        },
        {
          name: 'displacement',
          paramsTypes: { displacementMap: 'sampler2D', strength: 'float' },
          defaultParams: { displacementMap: null, strength: 0.5 },
          glsl:
            '// Author: Travis Fischer\n// License: MIT\n//\n// Adapted from a Codrops article by Robin Delaporte\n// https://tympanus.net/Development/DistortionHoverEffect\n\nuniform sampler2D displacementMap;\n\nuniform float strength; // = 0.5\n\nvec4 transition (vec2 uv) {\n  float displacement = texture2D(displacementMap, uv).r * strength;\n\n  vec2 uvFrom = vec2(uv.x + progress * displacement, uv.y);\n  vec2 uvTo = vec2(uv.x - (1.0 - progress) * displacement, uv.y);\n\n  return mix(\n    getFromColor(uvFrom),\n    getToColor(uvTo),\n    progress\n  );\n}\n',
          author: 'Travis Fischer',
          license: 'MIT',
          createdAt: 'Tue, 10 Apr 2018 23:03:38 -0400',
          updatedAt: 'Tue, 10 Apr 2018 23:03:38 -0400'
        },
        {
          name: 'doorway',
          paramsTypes: {
            reflection: 'float',
            perspective: 'float',
            depth: 'float'
          },
          defaultParams: { reflection: 0.4, perspective: 0.4, depth: 3 },
          glsl:
            '// author: gre\n// License: MIT \nuniform float reflection; // = 0.4\nuniform float perspective; // = 0.4\nuniform float depth; // = 3\n\nconst vec4 black = vec4(0.0, 0.0, 0.0, 1.0);\nconst vec2 boundMin = vec2(0.0, 0.0);\nconst vec2 boundMax = vec2(1.0, 1.0);\n\nbool inBounds (vec2 p) {\n  return all(lessThan(boundMin, p)) && all(lessThan(p, boundMax));\n}\n\nvec2 project (vec2 p) {\n  return p * vec2(1.0, -1.2) + vec2(0.0, -0.02);\n}\n\nvec4 bgColor (vec2 p, vec2 pto) {\n  vec4 c = black;\n  pto = project(pto);\n  if (inBounds(pto)) {\n    c += mix(black, getToColor(pto), reflection * mix(1.0, 0.0, pto.y));\n  }\n  return c;\n}\n\n\nvec4 transition (vec2 p) {\n  vec2 pfr = vec2(-1.), pto = vec2(-1.);\n  float middleSlit = 2.0 * abs(p.x-0.5) - progress;\n  if (middleSlit > 0.0) {\n    pfr = p + (p.x > 0.5 ? -1.0 : 1.0) * vec2(0.5*progress, 0.0);\n    float d = 1.0/(1.0+perspective*progress*(1.0-middleSlit));\n    pfr.y -= d/2.;\n    pfr.y *= d;\n    pfr.y += d/2.;\n  }\n  float size = mix(1.0, depth, 1.-progress);\n  pto = (p + vec2(-0.5, -0.5)) * vec2(size, size) + vec2(0.5, 0.5);\n  if (inBounds(pfr)) {\n    return getFromColor(pfr);\n  }\n  else if (inBounds(pto)) {\n    return getToColor(pto);\n  }\n  else {\n    return bgColor(p, pto);\n  }\n}\n',
          author: 'gre',
          license: 'MIT',
          createdAt: 'Tue, 30 May 2017 14:26:44 +0200',
          updatedAt: 'Tue, 30 May 2017 14:26:44 +0200'
        },
        {
          name: 'fade',
          paramsTypes: {},
          defaultParams: {},
          glsl:
            '// author: gre\n// license: MIT\n\nvec4 transition (vec2 uv) {\n  return mix(\n    getFromColor(uv),\n    getToColor(uv),\n    progress\n  );\n}\n',
          author: 'gre',
          license: 'MIT',
          createdAt: 'Tue, 30 May 2017 14:26:44 +0200',
          updatedAt: 'Tue, 30 May 2017 14:26:44 +0200'
        },
        {
          name: 'fadecolor',
          paramsTypes: { color: 'vec3', colorPhase: 'float' },
          defaultParams: { color: [0, 0, 0], colorPhase: 0.4 },
          glsl:
            '// author: gre\n// License: MIT\nuniform vec3 color;// = vec3(0.0)\nuniform float colorPhase/* = 0.4 */; // if 0.0, there is no black phase, if 0.9, the black phase is very important\nvec4 transition (vec2 uv) {\n  return mix(\n    mix(vec4(color, 1.0), getFromColor(uv), smoothstep(1.0-colorPhase, 0.0, progress)),\n    mix(vec4(color, 1.0), getToColor(uv), smoothstep(    colorPhase, 1.0, progress)),\n    progress);\n}\n',
          author: 'gre',
          license: 'MIT',
          createdAt: 'Tue, 30 May 2017 14:26:44 +0200',
          updatedAt: 'Tue, 30 May 2017 14:26:44 +0200'
        },
        {
          name: 'fadegrayscale',
          paramsTypes: { intensity: 'float' },
          defaultParams: { intensity: 0.3 },
          glsl:
            '// Author: gre\n// License: MIT\n\nuniform float intensity; // = 0.3; // if 0.0, the image directly turn grayscale, if 0.9, the grayscale transition phase is very important\n \nvec3 grayscale (vec3 color) {\n  return vec3(0.2126*color.r + 0.7152*color.g + 0.0722*color.b);\n}\n \nvec4 transition (vec2 uv) {\n  vec4 fc = getFromColor(uv);\n  vec4 tc = getToColor(uv);\n  return mix(\n    mix(vec4(grayscale(fc.rgb), 1.0), fc, smoothstep(1.0-intensity, 0.0, progress)),\n    mix(vec4(grayscale(tc.rgb), 1.0), tc, smoothstep(    intensity, 1.0, progress)),\n    progress);\n}\n',
          author: 'gre',
          license: 'MIT',
          createdAt: 'Tue, 30 May 2017 14:26:44 +0200',
          updatedAt: 'Tue, 30 May 2017 14:26:44 +0200'
        },
        {
          name: 'flyeye',
          paramsTypes: {
            size: 'float',
            zoom: 'float',
            colorSeparation: 'float'
          },
          defaultParams: { size: 0.04, zoom: 50, colorSeparation: 0.3 },
          glsl:
            '// Author: gre\n// License: MIT\nuniform float size; // = 0.04\nuniform float zoom; // = 50.0\nuniform float colorSeparation; // = 0.3\n\nvec4 transition(vec2 p) {\n  float inv = 1. - progress;\n  vec2 disp = size*vec2(cos(zoom*p.x), sin(zoom*p.y));\n  vec4 texTo = getToColor(p + inv*disp);\n  vec4 texFrom = vec4(\n    getFromColor(p + progress*disp*(1.0 - colorSeparation)).r,\n    getFromColor(p + progress*disp).g,\n    getFromColor(p + progress*disp*(1.0 + colorSeparation)).b,\n    1.0);\n  return texTo*progress + texFrom*inv;\n}\n',
          author: 'gre',
          license: 'MIT',
          createdAt: 'Tue, 30 May 2017 14:26:44 +0200',
          updatedAt: 'Tue, 30 May 2017 14:26:44 +0200'
        },
        {
          name: 'heart',
          paramsTypes: {},
          defaultParams: {},
          glsl:
            '// Author: gre\n// License: MIT\n\nfloat inHeart (vec2 p, vec2 center, float size) {\n  if (size==0.0) return 0.0;\n  vec2 o = (p-center)/(1.6*size);\n  float a = o.x*o.x+o.y*o.y-0.3;\n  return step(a*a*a, o.x*o.x*o.y*o.y*o.y);\n}\nvec4 transition (vec2 uv) {\n  return mix(\n    getFromColor(uv),\n    getToColor(uv),\n    inHeart(uv, vec2(0.5, 0.4), progress)\n  );\n}\n',
          author: 'gre',
          license: 'MIT',
          createdAt: 'Tue, 30 May 2017 14:26:44 +0200',
          updatedAt: 'Tue, 30 May 2017 14:26:44 +0200'
        },
        {
          name: 'hexagonalize',
          paramsTypes: { steps: 'int', horizontalHexagons: 'float' },
          defaultParams: { steps: 50, horizontalHexagons: 20 },
          glsl:
            '// Author: Fernando Kuteken\n// License: MIT\n// Hexagonal math from: http://www.redblobgames.com/grids/hexagons/\n\nuniform int steps; // = 50;\nuniform float horizontalHexagons; //= 20;\n\nstruct Hexagon {\n  float q;\n  float r;\n  float s;\n};\n\nHexagon createHexagon(float q, float r){\n  Hexagon hex;\n  hex.q = q;\n  hex.r = r;\n  hex.s = -q - r;\n  return hex;\n}\n\nHexagon roundHexagon(Hexagon hex){\n  \n  float q = floor(hex.q + 0.5);\n  float r = floor(hex.r + 0.5);\n  float s = floor(hex.s + 0.5);\n\n  float deltaQ = abs(q - hex.q);\n  float deltaR = abs(r - hex.r);\n  float deltaS = abs(s - hex.s);\n\n  if (deltaQ > deltaR && deltaQ > deltaS)\n    q = -r - s;\n  else if (deltaR > deltaS)\n    r = -q - s;\n  else\n    s = -q - r;\n\n  return createHexagon(q, r);\n}\n\nHexagon hexagonFromPoint(vec2 point, float size) {\n  \n  point.y /= ratio;\n  point = (point - 0.5) / size;\n  \n  float q = (sqrt(3.0) / 3.0) * point.x + (-1.0 / 3.0) * point.y;\n  float r = 0.0 * point.x + 2.0 / 3.0 * point.y;\n\n  Hexagon hex = createHexagon(q, r);\n  return roundHexagon(hex);\n  \n}\n\nvec2 pointFromHexagon(Hexagon hex, float size) {\n  \n  float x = (sqrt(3.0) * hex.q + (sqrt(3.0) / 2.0) * hex.r) * size + 0.5;\n  float y = (0.0 * hex.q + (3.0 / 2.0) * hex.r) * size + 0.5;\n  \n  return vec2(x, y * ratio);\n}\n\nvec4 transition (vec2 uv) {\n  \n  float dist = 2.0 * min(progress, 1.0 - progress);\n  dist = steps > 0 ? ceil(dist * float(steps)) / float(steps) : dist;\n  \n  float size = (sqrt(3.0) / 3.0) * dist / horizontalHexagons;\n  \n  vec2 point = dist > 0.0 ? pointFromHexagon(hexagonFromPoint(uv, size), size) : uv;\n\n  return mix(getFromColor(point), getToColor(point), progress);\n  \n}\n',
          author: 'Fernando Kuteken',
          license: 'MIT',
          createdAt: 'Tue, 30 May 2017 21:55:47 -0300',
          updatedAt: 'Tue, 30 May 2017 21:55:47 -0300'
        },
        {
          name: 'kaleidoscope',
          paramsTypes: { speed: 'float', angle: 'float', power: 'float' },
          defaultParams: { speed: 1, angle: 1, power: 1.5 },
          glsl:
            '// Author: nwoeanhinnogaehr\n// License: MIT\n\nuniform float speed; // = 1.0;\nuniform float angle; // = 1.0;\nuniform float power; // = 1.5;\n\nvec4 transition(vec2 uv) {\n  vec2 p = uv.xy / vec2(1.0).xy;\n  vec2 q = p;\n  float t = pow(progress, power)*speed;\n  p = p -0.5;\n  for (int i = 0; i < 7; i++) {\n    p = vec2(sin(t)*p.x + cos(t)*p.y, sin(t)*p.y - cos(t)*p.x);\n    t += angle;\n    p = abs(mod(p, 2.0) - 1.0);\n  }\n  abs(mod(p, 1.0));\n  return mix(\n    mix(getFromColor(q), getToColor(q), progress),\n    mix(getFromColor(p), getToColor(p), progress), 1.0 - 2.0*abs(progress - 0.5));\n}\n',
          author: 'nwoeanhinnogaehr',
          license: 'MIT',
          createdAt: 'Wed, 31 May 2017 21:48:26 -0400',
          updatedAt: 'Wed, 31 May 2017 21:48:26 -0400'
        },
        {
          name: 'luma',
          paramsTypes: { luma: 'sampler2D' },
          defaultParams: { luma: null },
          glsl:
            '// Author: gre\n// License: MIT\n\nuniform sampler2D luma;\n\nvec4 transition(vec2 uv) {\n  return mix(\n    getToColor(uv),\n    getFromColor(uv),\n    step(progress, texture2D(luma, uv).r)\n  );\n}\n',
          author: 'gre',
          license: 'MIT',
          createdAt: 'Tue, 30 May 2017 14:26:44 +0200',
          updatedAt: 'Tue, 30 May 2017 14:26:44 +0200'
        },
        {
          name: 'luminance_melt',
          paramsTypes: {
            direction: 'bool',
            l_threshold: 'float',
            above: 'bool'
          },
          defaultParams: { direction: !0, l_threshold: 0.8, above: !1 },
          glsl:
            '// Author: 0gust1\n// License: MIT\n//My own first transition — based on crosshatch code (from pthrasher), using  simplex noise formula (copied and pasted)\n//-> cooler with high contrasted images (isolated dark subject on light background f.e.)\n//TODO : try to rebase it on DoomTransition (from zeh)?\n//optimizations :\n//luminance (see http://stackoverflow.com/questions/596216/formula-to-determine-brightness-of-rgb-color#answer-596241)\n// Y = (R+R+B+G+G+G)/6\n//or Y = (R+R+R+B+G+G+G+G)>>3 \n\n\n//direction of movement :  0 : up, 1, down\nuniform bool direction; // = 1 \n//luminance threshold\nuniform float l_threshold; // = 0.8 \n//does the movement takes effect above or below luminance threshold ?\nuniform bool above; // = false \n\n\n//Random function borrowed from everywhere\nfloat rand(vec2 co){\n  return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);\n}\n\n\n// Simplex noise :\n// Description : Array and textureless GLSL 2D simplex noise function.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : MIT  \n//               2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n// \n\nvec3 mod289(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec2 mod289(vec2 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec3 permute(vec3 x) {\n  return mod289(((x*34.0)+1.0)*x);\n}\n\nfloat snoise(vec2 v)\n  {\n  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0\n                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)\n                     -0.577350269189626,  // -1.0 + 2.0 * C.x\n                      0.024390243902439); // 1.0 / 41.0\n// First corner\n  vec2 i  = floor(v + dot(v, C.yy) );\n  vec2 x0 = v -   i + dot(i, C.xx);\n\n// Other corners\n  vec2 i1;\n  //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0\n  //i1.y = 1.0 - i1.x;\n  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);\n  // x0 = x0 - 0.0 + 0.0 * C.xx ;\n  // x1 = x0 - i1 + 1.0 * C.xx ;\n  // x2 = x0 - 1.0 + 2.0 * C.xx ;\n  vec4 x12 = x0.xyxy + C.xxzz;\n  x12.xy -= i1;\n\n// Permutations\n  i = mod289(i); // Avoid truncation effects in permutation\n  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))\n\t\t+ i.x + vec3(0.0, i1.x, 1.0 ));\n\n  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);\n  m = m*m ;\n  m = m*m ;\n\n// Gradients: 41 points uniformly over a line, mapped onto a diamond.\n// The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)\n\n  vec3 x = 2.0 * fract(p * C.www) - 1.0;\n  vec3 h = abs(x) - 0.5;\n  vec3 ox = floor(x + 0.5);\n  vec3 a0 = x - ox;\n\n// Normalise gradients implicitly by scaling m\n// Approximation of: m *= inversesqrt( a0*a0 + h*h );\n  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );\n\n// Compute final noise value at P\n  vec3 g;\n  g.x  = a0.x  * x0.x  + h.x  * x0.y;\n  g.yz = a0.yz * x12.xz + h.yz * x12.yw;\n  return 130.0 * dot(m, g);\n}\n\n// Simplex noise -- end\n\nfloat luminance(vec4 color){\n  //(0.299*R + 0.587*G + 0.114*B)\n  return color.r*0.299+color.g*0.587+color.b*0.114;\n}\n\nvec2 center = vec2(1.0, direction);\n\nvec4 transition(vec2 uv) {\n  vec2 p = uv.xy / vec2(1.0).xy;\n  if (progress == 0.0) {\n    return getFromColor(p);\n  } else if (progress == 1.0) {\n    return getToColor(p);\n  } else {\n    float x = progress;\n    float dist = distance(center, p)- progress*exp(snoise(vec2(p.x, 0.0)));\n    float r = x - rand(vec2(p.x, 0.1));\n    float m;\n    if(above){\n     m = dist <= r && luminance(getFromColor(p))>l_threshold ? 1.0 : (progress*progress*progress);\n    }\n    else{\n     m = dist <= r && luminance(getFromColor(p))<l_threshold ? 1.0 : (progress*progress*progress);  \n    }\n    return mix(getFromColor(p), getToColor(p), m);    \n  }\n}\n',
          author: '0gust1',
          license: 'MIT',
          createdAt: 'Wed, 24 Jan 2018 19:02:32 +0100',
          updatedAt: 'Wed, 24 Jan 2018 19:02:32 +0100'
        },
        {
          name: 'morph',
          paramsTypes: { strength: 'float' },
          defaultParams: { strength: 0.1 },
          glsl:
            '// Author: paniq\n// License: MIT\nuniform float strength; // = 0.1\n\nvec4 transition(vec2 p) {\n  vec4 ca = getFromColor(p);\n  vec4 cb = getToColor(p);\n  \n  vec2 oa = (((ca.rg+ca.b)*0.5)*2.0-1.0);\n  vec2 ob = (((cb.rg+cb.b)*0.5)*2.0-1.0);\n  vec2 oc = mix(oa,ob,0.5)*strength;\n  \n  float w0 = progress;\n  float w1 = 1.0-w0;\n  return mix(getFromColor(p+oc*w0), getToColor(p-oc*w1), progress);\n}\n',
          author: 'paniq',
          license: 'MIT',
          createdAt: 'Thu, 10 Aug 2017 00:27:36 +0200',
          updatedAt: 'Thu, 10 Aug 2017 00:32:01 +0200'
        },
        {
          name: 'multiply_blend',
          paramsTypes: {},
          defaultParams: {},
          glsl:
            '// Author: Fernando Kuteken\n// License: MIT\n\nvec4 blend(vec4 a, vec4 b) {\n  return a * b;\n}\n\nvec4 transition (vec2 uv) {\n  \n  vec4 blended = blend(getFromColor(uv), getToColor(uv));\n  \n  if (progress < 0.5)\n    return mix(getFromColor(uv), blended, 2.0 * progress);\n  else\n    return mix(blended, getToColor(uv), 2.0 * progress - 1.0);\n}\n\n',
          author: 'Fernando Kuteken',
          license: 'MIT',
          createdAt: 'Tue, 30 May 2017 14:26:44 +0200',
          updatedAt: 'Tue, 30 May 2017 14:26:44 +0200'
        },
        {
          name: 'perlin',
          paramsTypes: { scale: 'float', smoothness: 'float', seed: 'float' },
          defaultParams: { scale: 4, smoothness: 0.01, seed: 12.9898 },
          glsl:
            '// Author: Rich Harris\n// License: MIT\n\n#ifdef GL_ES\nprecision mediump float;\n#endif\n\nuniform float scale; // = 4.0\nuniform float smoothness; // = 0.01\n\nuniform float seed; // = 12.9898\n\n// http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/\nfloat random(vec2 co)\n{\n    highp float a = seed;\n    highp float b = 78.233;\n    highp float c = 43758.5453;\n    highp float dt= dot(co.xy ,vec2(a,b));\n    highp float sn= mod(dt,3.14);\n    return fract(sin(sn) * c);\n}\n\n// 2D Noise based on Morgan McGuire @morgan3d\n// https://www.shadertoy.com/view/4dS3Wd\nfloat noise (in vec2 st) {\n    vec2 i = floor(st);\n    vec2 f = fract(st);\n\n    // Four corners in 2D of a tile\n    float a = random(i);\n    float b = random(i + vec2(1.0, 0.0));\n    float c = random(i + vec2(0.0, 1.0));\n    float d = random(i + vec2(1.0, 1.0));\n\n    // Smooth Interpolation\n\n    // Cubic Hermine Curve.  Same as SmoothStep()\n    vec2 u = f*f*(3.0-2.0*f);\n    // u = smoothstep(0.,1.,f);\n\n    // Mix 4 coorners porcentages\n    return mix(a, b, u.x) +\n            (c - a)* u.y * (1.0 - u.x) +\n            (d - b) * u.x * u.y;\n}\n\nvec4 transition (vec2 uv) {\n  vec4 from = getFromColor(uv);\n  vec4 to = getToColor(uv);\n  float n = noise(uv * scale);\n  \n  float p = mix(-smoothness, 1.0 + smoothness, progress);\n  float lower = p - smoothness;\n  float higher = p + smoothness;\n  \n  float q = smoothstep(lower, higher, n);\n  \n  return mix(\n    from,\n    to,\n    1.0 - q\n  );\n}\n',
          author: 'Rich Harris',
          license: 'MIT',
          createdAt: 'Tue, 23 Jan 2018 21:35:10 -0500',
          updatedAt: 'Wed, 24 Jan 2018 07:35:04 -0500'
        },
        {
          name: 'pinwheel',
          paramsTypes: { speed: 'float' },
          defaultParams: { speed: 2 },
          glsl:
            '// Author: Mr Speaker\n// License: MIT\n\nuniform float speed; // = 2.0;\n\nvec4 transition(vec2 uv) {\n  \n  vec2 p = uv.xy / vec2(1.0).xy;\n  \n  float circPos = atan(p.y - 0.5, p.x - 0.5) + progress * speed;\n  float modPos = mod(circPos, 3.1415 / 4.);\n  float signed = sign(progress - modPos);\n  \n  return mix(getToColor(p), getFromColor(p), step(signed, 0.5));\n  \n}\n',
          author: 'Mr Speaker',
          license: 'MIT',
          createdAt: 'Tue, 30 May 2017 09:04:31 -0400',
          updatedAt: 'Tue, 30 May 2017 09:04:31 -0400'
        },
        {
          name: 'pixelize',
          paramsTypes: { squaresMin: 'ivec2', steps: 'int' },
          defaultParams: { squaresMin: [20, 20], steps: 50 },
          glsl:
            '// Author: gre\n// License: MIT\n// forked from https://gist.github.com/benraziel/c528607361d90a072e98\n\nuniform ivec2 squaresMin/* = ivec2(20) */; // minimum number of squares (when the effect is at its higher level)\nuniform int steps /* = 50 */; // zero disable the stepping\n\nfloat d = min(progress, 1.0 - progress);\nfloat dist = steps>0 ? ceil(d * float(steps)) / float(steps) : d;\nvec2 squareSize = 2.0 * dist / vec2(squaresMin);\n\nvec4 transition(vec2 uv) {\n  vec2 p = dist>0.0 ? (floor(uv / squareSize) + 0.5) * squareSize : uv;\n  return mix(getFromColor(p), getToColor(p), progress);\n}\n',
          author: 'gre',
          license: 'MIT',
          createdAt: 'Tue, 30 May 2017 14:26:44 +0200',
          updatedAt: 'Wed, 31 May 2017 10:58:26 +0200'
        },
        {
          name: 'polar_function',
          paramsTypes: { segments: 'int' },
          defaultParams: { segments: 5 },
          glsl:
            '// Author: Fernando Kuteken\n// License: MIT\n\n#define PI 3.14159265359\n\nuniform int segments; // = 5;\n\nvec4 transition (vec2 uv) {\n  \n  float angle = atan(uv.y - 0.5, uv.x - 0.5) - 0.5 * PI;\n  float normalized = (angle + 1.5 * PI) * (2.0 * PI);\n  \n  float radius = (cos(float(segments) * angle) + 4.0) / 4.0;\n  float difference = length(uv - vec2(0.5, 0.5));\n  \n  if (difference > radius * progress)\n    return getFromColor(uv);\n  else\n    return getToColor(uv);\n}\n',
          author: 'Fernando Kuteken',
          license: 'MIT',
          createdAt: 'Tue, 30 May 2017 14:26:44 +0200',
          updatedAt: 'Tue, 30 May 2017 14:26:44 +0200'
        },
        {
          name: 'randomsquares',
          paramsTypes: { size: 'ivec2', smoothness: 'float' },
          defaultParams: { size: [10, 10], smoothness: 0.5 },
          glsl:
            '// Author: gre\n// License: MIT\n\nuniform ivec2 size; // = ivec2(10, 10)\nuniform float smoothness; // = 0.5\n \nfloat rand (vec2 co) {\n  return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);\n}\n\nvec4 transition(vec2 p) {\n  float r = rand(floor(vec2(size) * p));\n  float m = smoothstep(0.0, -smoothness, r - (progress * (1.0 + smoothness)));\n  return mix(getFromColor(p), getToColor(p), m);\n}\n',
          author: 'gre',
          license: 'MIT',
          createdAt: 'Tue, 30 May 2017 14:26:44 +0200',
          updatedAt: 'Tue, 30 May 2017 14:26:44 +0200'
        },
        {
          name: 'ripple',
          paramsTypes: { amplitude: 'float', speed: 'float' },
          defaultParams: { amplitude: 100, speed: 50 },
          glsl:
            '// Author: gre\n// License: MIT\nuniform float amplitude; // = 100.0\nuniform float speed; // = 50.0\n\nvec4 transition (vec2 uv) {\n  vec2 dir = uv - vec2(.5);\n  float dist = length(dir);\n  vec2 offset = dir * (sin(progress * dist * amplitude - progress * speed) + .5) / 30.;\n  return mix(\n    getFromColor(uv + offset),\n    getToColor(uv),\n    smoothstep(0.2, 1.0, progress)\n  );\n}\n',
          author: 'gre',
          license: 'MIT',
          createdAt: 'Tue, 30 May 2017 15:15:27 +0200',
          updatedAt: 'Tue, 30 May 2017 15:15:27 +0200'
        },
        {
          name: 'rotate_scale_fade',
          paramsTypes: {
            center: 'vec2',
            rotations: 'float',
            scale: 'float',
            backColor: 'vec4'
          },
          defaultParams: {
            center: [0.5, 0.5],
            rotations: 1,
            scale: 8,
            backColor: [0.15, 0.15, 0.15, 1]
          },
          glsl:
            '// Author: Fernando Kuteken\n// License: MIT\n\n#define PI 3.14159265359\n\nuniform vec2 center; // = vec2(0.5, 0.5);\nuniform float rotations; // = 1;\nuniform float scale; // = 8;\nuniform vec4 backColor; // = vec4(0.15, 0.15, 0.15, 1.0);\n\nvec4 transition (vec2 uv) {\n  \n  vec2 difference = uv - center;\n  vec2 dir = normalize(difference);\n  float dist = length(difference);\n  \n  float angle = 2.0 * PI * rotations * progress;\n  \n  float c = cos(angle);\n  float s = sin(angle);\n  \n  float currentScale = mix(scale, 1.0, 2.0 * abs(progress - 0.5));\n  \n  vec2 rotatedDir = vec2(dir.x  * c - dir.y * s, dir.x * s + dir.y * c);\n  vec2 rotatedUv = center + rotatedDir * dist / currentScale;\n  \n  if (rotatedUv.x < 0.0 || rotatedUv.x > 1.0 ||\n      rotatedUv.y < 0.0 || rotatedUv.y > 1.0)\n    return backColor;\n    \n  return mix(getFromColor(rotatedUv), getToColor(rotatedUv), progress);\n}\n',
          author: 'Fernando Kuteken',
          license: 'MIT',
          createdAt: 'Tue, 30 May 2017 14:26:44 +0200',
          updatedAt: 'Tue, 30 May 2017 14:26:44 +0200'
        },
        {
          name: 'squareswire',
          paramsTypes: {
            squares: 'ivec2',
            direction: 'vec2',
            smoothness: 'float'
          },
          defaultParams: {
            squares: [10, 10],
            direction: [1, -0.5],
            smoothness: 1.6
          },
          glsl:
            '// Author: gre\n// License: MIT\n \nuniform ivec2 squares;// = ivec2(10,10)\nuniform vec2 direction;// = vec2(1.0, -0.5)\nuniform float smoothness; // = 1.6\n\nconst vec2 center = vec2(0.5, 0.5);\nvec4 transition (vec2 p) {\n  vec2 v = normalize(direction);\n  v /= abs(v.x)+abs(v.y);\n  float d = v.x * center.x + v.y * center.y;\n  float offset = smoothness;\n  float pr = smoothstep(-offset, 0.0, v.x * p.x + v.y * p.y - (d-0.5+progress*(1.+offset)));\n  vec2 squarep = fract(p*vec2(squares));\n  vec2 squaremin = vec2(pr/2.0);\n  vec2 squaremax = vec2(1.0 - pr/2.0);\n  float a = (1.0 - step(progress, 0.0)) * step(squaremin.x, squarep.x) * step(squaremin.y, squarep.y) * step(squarep.x, squaremax.x) * step(squarep.y, squaremax.y);\n  return mix(getFromColor(p), getToColor(p), a);\n}\n',
          author: 'gre',
          license: 'MIT',
          createdAt: 'Tue, 30 May 2017 14:26:44 +0200',
          updatedAt: 'Tue, 30 May 2017 14:26:44 +0200'
        },
        {
          name: 'squeeze',
          paramsTypes: { colorSeparation: 'float' },
          defaultParams: { colorSeparation: 0.04 },
          glsl:
            '// Author: gre\n// License: MIT\n \nuniform float colorSeparation; // = 0.04\n \nvec4 transition (vec2 uv) {\n  float y = 0.5 + (uv.y-0.5) / (1.0-progress);\n  if (y < 0.0 || y > 1.0) {\n     return getToColor(uv);\n  }\n  else {\n    vec2 fp = vec2(uv.x, y);\n    vec2 off = progress * vec2(0.0, colorSeparation);\n    vec4 c = getFromColor(fp);\n    vec4 cn = getFromColor(fp - off);\n    vec4 cp = getFromColor(fp + off);\n    return vec4(cn.r, c.g, cp.b, c.a);\n  }\n}\n',
          author: 'gre',
          license: 'MIT',
          createdAt: 'Tue, 30 May 2017 14:26:44 +0200',
          updatedAt: 'Tue, 30 May 2017 14:26:44 +0200'
        },
        {
          name: 'swap',
          paramsTypes: {
            reflection: 'float',
            perspective: 'float',
            depth: 'float'
          },
          defaultParams: { reflection: 0.4, perspective: 0.2, depth: 3 },
          glsl:
            '// Author: gre\n// License: MIT\n// General parameters\nuniform float reflection; // = 0.4\nuniform float perspective; // = 0.2\nuniform float depth; // = 3.0\n \nconst vec4 black = vec4(0.0, 0.0, 0.0, 1.0);\nconst vec2 boundMin = vec2(0.0, 0.0);\nconst vec2 boundMax = vec2(1.0, 1.0);\n \nbool inBounds (vec2 p) {\n  return all(lessThan(boundMin, p)) && all(lessThan(p, boundMax));\n}\n \nvec2 project (vec2 p) {\n  return p * vec2(1.0, -1.2) + vec2(0.0, -0.02);\n}\n \nvec4 bgColor (vec2 p, vec2 pfr, vec2 pto) {\n  vec4 c = black;\n  pfr = project(pfr);\n  if (inBounds(pfr)) {\n    c += mix(black, getFromColor(pfr), reflection * mix(1.0, 0.0, pfr.y));\n  }\n  pto = project(pto);\n  if (inBounds(pto)) {\n    c += mix(black, getToColor(pto), reflection * mix(1.0, 0.0, pto.y));\n  }\n  return c;\n}\n \nvec4 transition(vec2 p) {\n  vec2 pfr, pto = vec2(-1.);\n \n  float size = mix(1.0, depth, progress);\n  float persp = perspective * progress;\n  pfr = (p + vec2(-0.0, -0.5)) * vec2(size/(1.0-perspective*progress), size/(1.0-size*persp*p.x)) + vec2(0.0, 0.5);\n \n  size = mix(1.0, depth, 1.-progress);\n  persp = perspective * (1.-progress);\n  pto = (p + vec2(-1.0, -0.5)) * vec2(size/(1.0-perspective*(1.0-progress)), size/(1.0-size*persp*(0.5-p.x))) + vec2(1.0, 0.5);\n\n  if (progress < 0.5) {\n    if (inBounds(pfr)) {\n      return getFromColor(pfr);\n    }\n    if (inBounds(pto)) {\n      return getToColor(pto);\n    }  \n  }\n  if (inBounds(pto)) {\n    return getToColor(pto);\n  }\n  if (inBounds(pfr)) {\n    return getFromColor(pfr);\n  }\n  return bgColor(p, pfr, pto);\n}\n',
          author: 'gre',
          license: 'MIT',
          createdAt: 'Tue, 30 May 2017 14:26:44 +0200',
          updatedAt: 'Sun, 18 Feb 2018 17:45:50 +0100'
        },
        {
          name: 'undulatingBurnOut',
          paramsTypes: { smoothness: 'float', center: 'vec2', color: 'vec3' },
          defaultParams: {
            smoothness: 0.03,
            center: [0.5, 0.5],
            color: [0, 0, 0]
          },
          glsl:
            '// License: MIT\n// Author: pthrasher\n// adapted by gre from https://gist.github.com/pthrasher/8e6226b215548ba12734\n\nuniform float smoothness; // = 0.03\nuniform vec2 center; // = vec2(0.5)\nuniform vec3 color; // = vec3(0.0)\n\nconst float M_PI = 3.14159265358979323846;\n\nfloat quadraticInOut(float t) {\n  float p = 2.0 * t * t;\n  return t < 0.5 ? p : -p + (4.0 * t) - 1.0;\n}\n\nfloat getGradient(float r, float dist) {\n  float d = r - dist;\n  return mix(\n    smoothstep(-smoothness, 0.0, r - dist * (1.0 + smoothness)),\n    -1.0 - step(0.005, d),\n    step(-0.005, d) * step(d, 0.01)\n  );\n}\n\nfloat getWave(vec2 p){\n  vec2 _p = p - center; // offset from center\n  float rads = atan(_p.y, _p.x);\n  float degs = degrees(rads) + 180.0;\n  vec2 range = vec2(0.0, M_PI * 30.0);\n  vec2 domain = vec2(0.0, 360.0);\n  float ratio = (M_PI * 30.0) / 360.0;\n  degs = degs * ratio;\n  float x = progress;\n  float magnitude = mix(0.02, 0.09, smoothstep(0.0, 1.0, x));\n  float offset = mix(40.0, 30.0, smoothstep(0.0, 1.0, x));\n  float ease_degs = quadraticInOut(sin(degs));\n  float deg_wave_pos = (ease_degs * magnitude) * sin(x * offset);\n  return x + deg_wave_pos;\n}\n\nvec4 transition(vec2 p) {\n  float dist = distance(center, p);\n  float m = getGradient(getWave(p), dist);\n  vec4 cfrom = getFromColor(p);\n  vec4 cto = getToColor(p);\n  return mix(mix(cfrom, cto, m), mix(cfrom, vec4(color, 1.0), 0.75), step(m, -2.0));\n}\n',
          license: 'MIT',
          author: 'pthrasher',
          createdAt: 'Mon, 12 Jun 2017 10:23:37 +0800',
          updatedAt: 'Mon, 12 Jun 2017 10:23:37 +0800'
        },
        {
          name: 'wind',
          paramsTypes: { size: 'float' },
          defaultParams: { size: 0.2 },
          glsl:
            '// Author: gre\n// License: MIT\n\n// Custom parameters\nuniform float size; // = 0.2\n\nfloat rand (vec2 co) {\n  return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);\n}\n\nvec4 transition (vec2 uv) {\n  float r = rand(vec2(0, uv.y));\n  float m = smoothstep(0.0, -size, uv.x*(1.0-size) + size*r - (progress * (1.0 + size)));\n  return mix(\n    getFromColor(uv),\n    getToColor(uv),\n    m\n  );\n}\n',
          author: 'gre',
          license: 'MIT',
          createdAt: 'Tue, 30 May 2017 14:26:44 +0200',
          updatedAt: 'Tue, 30 May 2017 14:26:44 +0200'
        },
        {
          name: 'windowblinds',
          paramsTypes: {},
          defaultParams: {},
          glsl:
            '// Author: Fabien Benetou\n// License: MIT\n\nvec4 transition (vec2 uv) {\n  float t = progress;\n  \n  if (mod(floor(uv.y*100.*progress),2.)==0.)\n    t*=2.-.5;\n  \n  return mix(\n    getFromColor(uv),\n    getToColor(uv),\n    mix(t, progress, smoothstep(0.8, 1.0, progress))\n  );\n}\n',
          author: 'Fabien Benetou',
          license: 'MIT',
          createdAt: 'Wed, 31 May 2017 14:11:48 +0200',
          updatedAt: 'Wed, 31 May 2017 14:11:48 +0200'
        },
        {
          name: 'windowslice',
          paramsTypes: { count: 'float', smoothness: 'float' },
          defaultParams: { count: 10, smoothness: 0.5 },
          glsl:
            '// Author: gre\n// License: MIT\n\nuniform float count; // = 10.0\nuniform float smoothness; // = 0.5\n\nvec4 transition (vec2 p) {\n  float pr = smoothstep(-smoothness, 0.0, p.x - progress * (1.0 + smoothness));\n  float s = step(pr, fract(count * p.x));\n  return mix(getFromColor(p), getToColor(p), s);\n}\n',
          author: 'gre',
          license: 'MIT',
          createdAt: 'Wed, 28 Mar 2018 17:23:26 +0200',
          updatedAt: 'Wed, 28 Mar 2018 17:23:26 +0200'
        },
        {
          name: 'wipeDown',
          paramsTypes: {},
          defaultParams: {},
          glsl:
            '// Author: Jake Nelson\n// License: MIT\n\nvec4 transition(vec2 uv) {\n  vec2 p=uv.xy/vec2(1.0).xy;\n  vec4 a=getFromColor(p);\n  vec4 b=getToColor(p);\n  return mix(a, b, step(1.0-p.y,progress));\n}\n',
          author: 'Jake Nelson',
          license: 'MIT',
          createdAt: 'Wed, 1 Nov 2017 15:26:01 -0500',
          updatedAt: 'Thu, 2 Nov 2017 18:39:26 -0500'
        },
        {
          name: 'wipeLeft',
          paramsTypes: {},
          defaultParams: {},
          glsl:
            '// Author: Jake Nelson\n// License: MIT\n\nvec4 transition(vec2 uv) {\n  vec2 p=uv.xy/vec2(1.0).xy;\n  vec4 a=getFromColor(p);\n  vec4 b=getToColor(p);\n  return mix(a, b, step(1.0-p.x,progress));\n}\n',
          author: 'Jake Nelson',
          license: 'MIT',
          createdAt: 'Wed, 1 Nov 2017 15:26:28 -0500',
          updatedAt: 'Fri, 3 Nov 2017 18:03:50 +0100'
        },
        {
          name: 'wipeRight',
          paramsTypes: {},
          defaultParams: {},
          glsl:
            '// Author: Jake Nelson\n// License: MIT\n\nvec4 transition(vec2 uv) {\n  vec2 p=uv.xy/vec2(1.0).xy;\n  vec4 a=getFromColor(p);\n  vec4 b=getToColor(p);\n  return mix(a, b, step(0.0+p.x,progress));\n}\n',
          author: 'Jake Nelson',
          license: 'MIT',
          createdAt: 'Wed, 1 Nov 2017 15:27:02 -0500',
          updatedAt: 'Thu, 2 Nov 2017 18:40:22 -0500'
        },
        {
          name: 'wipeUp',
          paramsTypes: {},
          defaultParams: {},
          glsl:
            '// Author: Jake Nelson\n// License: MIT\n\nvec4 transition(vec2 uv) {\n  vec2 p=uv.xy/vec2(1.0).xy;\n  vec4 a=getFromColor(p);\n  vec4 b=getToColor(p);\n  return mix(a, b, step(0.0+p.y,progress));\n}\n',
          author: 'Jake Nelson',
          license: 'MIT',
          createdAt: 'Wed, 1 Nov 2017 15:24:36 -0500',
          updatedAt: 'Thu, 2 Nov 2017 18:37:42 -0500'
        }
      ];
    },
    KN1S: function(t, e, n) {
      'use strict';
      var r = n('0GS4'),
        i = n('fpEm'),
        o = n('63NL'),
        a = n('IrQ8'),
        s = n('1BqX'),
        l = n('o/2B');
      function c(t) {
        (this.gl = t),
          (this.gl.lastAttribCount = 0),
          (this._vref = this._fref = this._relink = this.vertShader = this.fragShader = this.program = this.attributes = this.uniforms = this.types = null);
      }
      var u = c.prototype;
      function h(t, e) {
        return t.name < e.name ? -1 : 1;
      }
      (u.bind = function() {
        var t;
        this.program || this._relink();
        var e = this.gl.getProgramParameter(
            this.program,
            this.gl.ACTIVE_ATTRIBUTES
          ),
          n = this.gl.lastAttribCount;
        if (e > n) for (t = n; t < e; t++) this.gl.enableVertexAttribArray(t);
        else if (n > e)
          for (t = e; t < n; t++) this.gl.disableVertexAttribArray(t);
        (this.gl.lastAttribCount = e), this.gl.useProgram(this.program);
      }),
        (u.dispose = function() {
          for (var t = this.gl.lastAttribCount, e = 0; e < t; e++)
            this.gl.disableVertexAttribArray(e);
          (this.gl.lastAttribCount = 0),
            this._fref && this._fref.dispose(),
            this._vref && this._vref.dispose(),
            (this.attributes = this.types = this.vertShader = this.fragShader = this.program = this._relink = this._fref = this._vref = null);
        }),
        (u.update = function(t, e, n, c) {
          if (!e || 1 === arguments.length) {
            var u = t;
            (t = u.vertex),
              (e = u.fragment),
              (n = u.uniforms),
              (c = u.attributes);
          }
          var f = this,
            p = f.gl,
            d = f._vref;
          (f._vref = a.shader(p, p.VERTEX_SHADER, t)),
            d && d.dispose(),
            (f.vertShader = f._vref.shader);
          var m = this._fref;
          if (
            ((f._fref = a.shader(p, p.FRAGMENT_SHADER, e)),
            m && m.dispose(),
            (f.fragShader = f._fref.shader),
            !n || !c)
          ) {
            var g = p.createProgram();
            if (
              (p.attachShader(g, f.fragShader),
              p.attachShader(g, f.vertShader),
              p.linkProgram(g),
              !p.getProgramParameter(g, p.LINK_STATUS))
            ) {
              var v = p.getProgramInfoLog(g);
              throw new l(v, 'Error linking program:' + v);
            }
            (n = n || s.uniforms(p, g)),
              (c = c || s.attributes(p, g)),
              p.deleteProgram(g);
          }
          (c = c.slice()).sort(h);
          var _,
            y = [],
            b = [],
            T = [];
          for (_ = 0; _ < c.length; ++_) {
            var x = c[_];
            if (x.type.indexOf('mat') >= 0) {
              for (
                var w = 0 | x.type.charAt(x.type.length - 1),
                  E = new Array(w),
                  A = 0;
                A < w;
                ++A
              )
                (E[A] = T.length),
                  b.push(x.name + '[' + A + ']'),
                  'number' == typeof x.location
                    ? T.push(x.location + A)
                    : Array.isArray(x.location) &&
                      x.location.length === w &&
                      'number' == typeof x.location[A]
                    ? T.push(0 | x.location[A])
                    : T.push(-1);
              y.push({ name: x.name, type: x.type, locations: E });
            } else
              y.push({ name: x.name, type: x.type, locations: [T.length] }),
                b.push(x.name),
                'number' == typeof x.location
                  ? T.push(0 | x.location)
                  : T.push(-1);
          }
          var C = 0;
          for (_ = 0; _ < T.length; ++_)
            if (T[_] < 0) {
              for (; T.indexOf(C) >= 0; ) C += 1;
              T[_] = C;
            }
          var P = new Array(n.length);
          function R() {
            f.program = a.program(p, f._vref, f._fref, b, T);
            for (var t = 0; t < n.length; ++t)
              P[t] = p.getUniformLocation(f.program, n[t].name);
          }
          R(),
            (f._relink = R),
            (f.types = { uniforms: o(n), attributes: o(c) }),
            (f.attributes = i(p, f, y, T)),
            Object.defineProperty(f, 'uniforms', r(p, f, n, P));
        }),
        (t.exports = function(t, e, n, r, i) {
          var o = new c(t);
          return o.update(e, n, r, i), o;
        });
    },
    KfNM: function(t, e) {
      var n = Object.prototype.toString;
      t.exports = function(t) {
        return n.call(t);
      };
    },
    Kgze: function(t, e, n) {
      'use strict';
      var r = [
          new RegExp(
            '^<h3[^>]*>This page contains the following errors:</h3><div[^>]*>(.+?)\n?</div>'
          ),
          new RegExp('^(.+)\n')
        ],
        i = function(t) {
          var e,
            n,
            i,
            o,
            a =
              ((e = t),
              (n = new XMLSerializer()),
              Array.prototype.map
                .call(e.childNodes, function(t) {
                  return n.serializeToString(t);
                })
                .join(''));
          for (i = 0; i < r.length; i++) if ((o = r[i].exec(a))) return o[1];
        };
      e.failOnParseError = function(t) {
        return (
          (function(t) {
            var e;
            if (null === t) throw new Error('Parse error');
            var n = (function(t) {
              return 'parsererror' === t.documentElement.tagName &&
                'http://www.mozilla.org/newlayout/xml/parsererror.xml' ===
                  t.documentElement.namespaceURI
                ? t.documentElement
                : ('xml' === t.documentElement.tagName ||
                    'html' === t.documentElement.tagName) &&
                  t.documentElement.childNodes &&
                  t.documentElement.childNodes.length > 0 &&
                  'parsererror' === t.documentElement.childNodes[0].nodeName
                ? t.documentElement.childNodes[0]
                : 'html' === t.documentElement.tagName &&
                  t.documentElement.childNodes &&
                  t.documentElement.childNodes.length > 0 &&
                  'body' === t.documentElement.childNodes[0].nodeName &&
                  t.documentElement.childNodes[0].childNodes &&
                  t.documentElement.childNodes[0].childNodes.length &&
                  'parsererror' ===
                    t.documentElement.childNodes[0].childNodes[0].nodeName
                ? t.documentElement.childNodes[0].childNodes[0]
                : void 0;
            })(t);
            if (void 0 !== n) throw ((e = i(n) || 'Parse error'), new Error(e));
          })(t),
          t
        );
      };
    },
    Kz5y: function(t, e, n) {
      var r = n('WFqU'),
        i = 'object' == typeof self && self && self.Object === Object && self,
        o = r || i || Function('return this')();
      t.exports = o;
    },
    LiCP: function(t, e, n) {
      'use strict';
      (function(t, r) {
        n.d(e, 'e', function() {
          return i;
        }),
          n.d(e, 'g', function() {
            return a;
          }),
          n.d(e, 'f', function() {
            return o;
          }),
          n.d(e, 'c', function() {
            return l;
          }),
          n.d(e, 'a', function() {
            return c;
          }),
          n.d(e, 'b', function() {
            return u;
          }),
          n.d(e, 'd', function() {
            return h;
          });
        /*!
         * VERSION: 2.1.3
         * DATE: 2019-05-17
         * UPDATES AND DOCS AT: http://greensock.com
         *
         * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
         * This work is subject to the terms at http://greensock.com/standard-license or for
         * Club GreenSock members, the software agreement that was issued with your membership.
         *
         * @author: Jack Doyle, jack@greensock.com
         */
        var i =
            'undefined' != typeof window
              ? window
              : t.exports && void 0 !== r
              ? r
              : {},
          o = (function(t) {
            var e = {},
              n = t.document,
              r = (t.GreenSockGlobals = t.GreenSockGlobals || t);
            if (r.TweenLite) return r.TweenLite;
            var i,
              o,
              a,
              s,
              l,
              c,
              u,
              h = function(t) {
                var e,
                  n = t.split('.'),
                  i = r;
                for (e = 0; e < n.length; e++) i[n[e]] = i = i[n[e]] || {};
                return i;
              },
              f = h('com.greensock'),
              p = function(t) {
                var e,
                  n = [],
                  r = t.length;
                for (e = 0; e !== r; n.push(t[e++]));
                return n;
              },
              d = function() {},
              m =
                ((c = Object.prototype.toString),
                (u = c.call([])),
                function(t) {
                  return (
                    null != t &&
                    (t instanceof Array ||
                      ('object' == typeof t && !!t.push && c.call(t) === u))
                  );
                }),
              g = {},
              v = function(t, n, i, o) {
                (this.sc = g[t] ? g[t].sc : []),
                  (g[t] = this),
                  (this.gsClass = null),
                  (this.func = i);
                var a = [];
                (this.check = function(s) {
                  for (var l, c, u, f, p = n.length, d = p; --p > -1; )
                    (l = g[n[p]] || new v(n[p], [])).gsClass
                      ? ((a[p] = l.gsClass), d--)
                      : s && l.sc.push(this);
                  if (0 === d && i)
                    for (
                      u = (c = ('com.greensock.' + t).split('.')).pop(),
                        f = h(c.join('.'))[u] = this.gsClass = i.apply(i, a),
                        o && (r[u] = e[u] = f),
                        p = 0;
                      p < this.sc.length;
                      p++
                    )
                      this.sc[p].check();
                }),
                  this.check(!0);
              },
              _ = (t._gsDefine = function(t, e, n, r) {
                return new v(t, e, n, r);
              }),
              y = (f._class = function(t, e, n) {
                return (
                  (e = e || function() {}),
                  _(
                    t,
                    [],
                    function() {
                      return e;
                    },
                    n
                  ),
                  e
                );
              });
            _.globals = r;
            var b = [0, 0, 1, 1],
              T = y(
                'easing.Ease',
                function(t, e, n, r) {
                  (this._func = t),
                    (this._type = n || 0),
                    (this._power = r || 0),
                    (this._params = e ? b.concat(e) : b);
                },
                !0
              ),
              x = (T.map = {}),
              w = (T.register = function(t, e, n, r) {
                for (
                  var i,
                    o,
                    a,
                    s,
                    l = e.split(','),
                    c = l.length,
                    u = (n || 'easeIn,easeOut,easeInOut').split(',');
                  --c > -1;

                )
                  for (
                    o = l[c],
                      i = r ? y('easing.' + o, null, !0) : f.easing[o] || {},
                      a = u.length;
                    --a > -1;

                  )
                    (s = u[a]),
                      (x[o + '.' + s] = x[s + o] = i[s] = t.getRatio
                        ? t
                        : t[s] || new t());
              });
            for (
              (a = T.prototype)._calcEnd = !1,
                a.getRatio = function(t) {
                  if (this._func)
                    return (
                      (this._params[0] = t),
                      this._func.apply(null, this._params)
                    );
                  var e = this._type,
                    n = this._power,
                    r =
                      1 === e
                        ? 1 - t
                        : 2 === e
                        ? t
                        : t < 0.5
                        ? 2 * t
                        : 2 * (1 - t);
                  return (
                    1 === n
                      ? (r *= r)
                      : 2 === n
                      ? (r *= r * r)
                      : 3 === n
                      ? (r *= r * r * r)
                      : 4 === n && (r *= r * r * r * r),
                    1 === e ? 1 - r : 2 === e ? r : t < 0.5 ? r / 2 : 1 - r / 2
                  );
                },
                o = (i = ['Linear', 'Quad', 'Cubic', 'Quart', 'Quint,Strong'])
                  .length;
              --o > -1;

            )
              (a = i[o] + ',Power' + o),
                w(new T(null, null, 1, o), a, 'easeOut', !0),
                w(
                  new T(null, null, 2, o),
                  a,
                  'easeIn' + (0 === o ? ',easeNone' : '')
                ),
                w(new T(null, null, 3, o), a, 'easeInOut');
            (x.linear = f.easing.Linear.easeIn),
              (x.swing = f.easing.Quad.easeInOut);
            var E = y('events.EventDispatcher', function(t) {
              (this._listeners = {}), (this._eventTarget = t || this);
            });
            ((a = E.prototype).addEventListener = function(t, e, n, r, i) {
              i = i || 0;
              var o,
                a,
                c = this._listeners[t],
                u = 0;
              for (
                this !== s || l || s.wake(),
                  null == c && (this._listeners[t] = c = []),
                  a = c.length;
                --a > -1;

              )
                (o = c[a]).c === e && o.s === n
                  ? c.splice(a, 1)
                  : 0 === u && o.pr < i && (u = a + 1);
              c.splice(u, 0, { c: e, s: n, up: r, pr: i });
            }),
              (a.removeEventListener = function(t, e) {
                var n,
                  r = this._listeners[t];
                if (r)
                  for (n = r.length; --n > -1; )
                    if (r[n].c === e) return void r.splice(n, 1);
              }),
              (a.dispatchEvent = function(t) {
                var e,
                  n,
                  r,
                  i = this._listeners[t];
                if (i)
                  for (
                    (e = i.length) > 1 && (i = i.slice(0)),
                      n = this._eventTarget;
                    --e > -1;

                  )
                    (r = i[e]) &&
                      (r.up
                        ? r.c.call(r.s || n, { type: t, target: n })
                        : r.c.call(r.s || n));
              });
            var A = t.requestAnimationFrame,
              C = t.cancelAnimationFrame,
              P =
                Date.now ||
                function() {
                  return new Date().getTime();
                },
              R = P();
            for (
              o = (i = ['ms', 'moz', 'webkit', 'o']).length;
              --o > -1 && !A;

            )
              (A = t[i[o] + 'RequestAnimationFrame']),
                (C =
                  t[i[o] + 'CancelAnimationFrame'] ||
                  t[i[o] + 'CancelRequestAnimationFrame']);
            y('Ticker', function(t, e) {
              var r,
                i,
                o,
                a,
                c,
                u = this,
                h = P(),
                f = !(!1 === e || !A) && 'auto',
                p = 500,
                m = 33,
                g = function(t) {
                  var e,
                    n,
                    s = P() - R;
                  s > p && (h += s - m),
                    (R += s),
                    (u.time = (R - h) / 1e3),
                    (e = u.time - c),
                    (!r || e > 0 || !0 === t) &&
                      (u.frame++,
                      (c += e + (e >= a ? 0.004 : a - e)),
                      (n = !0)),
                    !0 !== t && (o = i(g)),
                    n && u.dispatchEvent('tick');
                };
              E.call(u),
                (u.time = u.frame = 0),
                (u.tick = function() {
                  g(!0);
                }),
                (u.lagSmoothing = function(t, e) {
                  if (!arguments.length) return p < 1e8;
                  (p = t || 1e8), (m = Math.min(e, p, 0));
                }),
                (u.sleep = function() {
                  null != o &&
                    (f && C ? C(o) : clearTimeout(o),
                    (i = d),
                    (o = null),
                    u === s && (l = !1));
                }),
                (u.wake = function(t) {
                  null !== o
                    ? u.sleep()
                    : t
                    ? (h += -R + (R = P()))
                    : u.frame > 10 && (R = P() - p + 5),
                    (i =
                      0 === r
                        ? d
                        : f && A
                        ? A
                        : function(t) {
                            return setTimeout(t, (1e3 * (c - u.time) + 1) | 0);
                          }),
                    u === s && (l = !0),
                    g(2);
                }),
                (u.fps = function(t) {
                  if (!arguments.length) return r;
                  (a = 1 / ((r = t) || 60)), (c = this.time + a), u.wake();
                }),
                (u.useRAF = function(t) {
                  if (!arguments.length) return f;
                  u.sleep(), (f = t), u.fps(r);
                }),
                u.fps(t),
                setTimeout(function() {
                  'auto' === f &&
                    u.frame < 5 &&
                    'hidden' !== (n || {}).visibilityState &&
                    u.useRAF(!1);
                }, 1500);
            }),
              ((a = f.Ticker.prototype = new f.events.EventDispatcher()).constructor =
                f.Ticker);
            var I = y('core.Animation', function(t, e) {
              if (
                ((this.vars = e = e || {}),
                (this._duration = this._totalDuration = t || 0),
                (this._delay = Number(e.delay) || 0),
                (this._timeScale = 1),
                (this._active = !!e.immediateRender),
                (this.data = e.data),
                (this._reversed = !!e.reversed),
                K)
              ) {
                l || s.wake();
                var n = this.vars.useFrames ? W : K;
                n.add(this, n._time), this.vars.paused && this.paused(!0);
              }
            });
            (s = I.ticker = new f.Ticker()),
              ((a = I.prototype)._dirty = a._gc = a._initted = a._paused = !1),
              (a._totalTime = a._time = 0),
              (a._rawPrevTime = -1),
              (a._next = a._last = a._onUpdate = a._timeline = a.timeline = null),
              (a._paused = !1);
            var S = function() {
              l &&
                P() - R > 2e3 &&
                ('hidden' !== (n || {}).visibilityState || !s.lagSmoothing()) &&
                s.wake();
              var t = setTimeout(S, 2e3);
              t.unref && t.unref();
            };
            S(),
              (a.play = function(t, e) {
                return (
                  null != t && this.seek(t, e), this.reversed(!1).paused(!1)
                );
              }),
              (a.pause = function(t, e) {
                return null != t && this.seek(t, e), this.paused(!0);
              }),
              (a.resume = function(t, e) {
                return null != t && this.seek(t, e), this.paused(!1);
              }),
              (a.seek = function(t, e) {
                return this.totalTime(Number(t), !1 !== e);
              }),
              (a.restart = function(t, e) {
                return this.reversed(!1)
                  .paused(!1)
                  .totalTime(t ? -this._delay : 0, !1 !== e, !0);
              }),
              (a.reverse = function(t, e) {
                return (
                  null != t && this.seek(t || this.totalDuration(), e),
                  this.reversed(!0).paused(!1)
                );
              }),
              (a.render = function(t, e, n) {}),
              (a.invalidate = function() {
                return (
                  (this._time = this._totalTime = 0),
                  (this._initted = this._gc = !1),
                  (this._rawPrevTime = -1),
                  (!this._gc && this.timeline) || this._enabled(!0),
                  this
                );
              }),
              (a.isActive = function() {
                var t,
                  e = this._timeline,
                  n = this._startTime;
                return (
                  !e ||
                  (!this._gc &&
                    !this._paused &&
                    e.isActive() &&
                    (t = e.rawTime(!0)) >= n &&
                    t < n + this.totalDuration() / this._timeScale - 1e-8)
                );
              }),
              (a._enabled = function(t, e) {
                return (
                  l || s.wake(),
                  (this._gc = !t),
                  (this._active = this.isActive()),
                  !0 !== e &&
                    (t && !this.timeline
                      ? this._timeline.add(this, this._startTime - this._delay)
                      : !t &&
                        this.timeline &&
                        this._timeline._remove(this, !0)),
                  !1
                );
              }),
              (a._kill = function(t, e) {
                return this._enabled(!1, !1);
              }),
              (a.kill = function(t, e) {
                return this._kill(t, e), this;
              }),
              (a._uncache = function(t) {
                for (var e = t ? this : this.timeline; e; )
                  (e._dirty = !0), (e = e.timeline);
                return this;
              }),
              (a._swapSelfInParams = function(t) {
                for (var e = t.length, n = t.concat(); --e > -1; )
                  '{self}' === t[e] && (n[e] = this);
                return n;
              }),
              (a._callback = function(t) {
                var e = this.vars,
                  n = e[t],
                  r = e[t + 'Params'],
                  i = e[t + 'Scope'] || e.callbackScope || this;
                switch (r ? r.length : 0) {
                  case 0:
                    n.call(i);
                    break;
                  case 1:
                    n.call(i, r[0]);
                    break;
                  case 2:
                    n.call(i, r[0], r[1]);
                    break;
                  default:
                    n.apply(i, r);
                }
              }),
              (a.eventCallback = function(t, e, n, r) {
                if ('on' === (t || '').substr(0, 2)) {
                  var i = this.vars;
                  if (1 === arguments.length) return i[t];
                  null == e
                    ? delete i[t]
                    : ((i[t] = e),
                      (i[t + 'Params'] =
                        m(n) && -1 !== n.join('').indexOf('{self}')
                          ? this._swapSelfInParams(n)
                          : n),
                      (i[t + 'Scope'] = r)),
                    'onUpdate' === t && (this._onUpdate = e);
                }
                return this;
              }),
              (a.delay = function(t) {
                return arguments.length
                  ? (this._timeline.smoothChildTiming &&
                      this.startTime(this._startTime + t - this._delay),
                    (this._delay = t),
                    this)
                  : this._delay;
              }),
              (a.duration = function(t) {
                return arguments.length
                  ? ((this._duration = this._totalDuration = t),
                    this._uncache(!0),
                    this._timeline.smoothChildTiming &&
                      this._time > 0 &&
                      this._time < this._duration &&
                      0 !== t &&
                      this.totalTime(
                        this._totalTime * (t / this._duration),
                        !0
                      ),
                    this)
                  : ((this._dirty = !1), this._duration);
              }),
              (a.totalDuration = function(t) {
                return (
                  (this._dirty = !1),
                  arguments.length ? this.duration(t) : this._totalDuration
                );
              }),
              (a.time = function(t, e) {
                return arguments.length
                  ? (this._dirty && this.totalDuration(),
                    this.totalTime(t > this._duration ? this._duration : t, e))
                  : this._time;
              }),
              (a.totalTime = function(t, e, n) {
                if ((l || s.wake(), !arguments.length)) return this._totalTime;
                if (this._timeline) {
                  if (
                    (t < 0 && !n && (t += this.totalDuration()),
                    this._timeline.smoothChildTiming)
                  ) {
                    this._dirty && this.totalDuration();
                    var r = this._totalDuration,
                      i = this._timeline;
                    if (
                      (t > r && !n && (t = r),
                      (this._startTime =
                        (this._paused ? this._pauseTime : i._time) -
                        (this._reversed ? r - t : t) / this._timeScale),
                      i._dirty || this._uncache(!1),
                      i._timeline)
                    )
                      for (; i._timeline; )
                        i._timeline._time !==
                          (i._startTime + i._totalTime) / i._timeScale &&
                          i.totalTime(i._totalTime, !0),
                          (i = i._timeline);
                  }
                  this._gc && this._enabled(!0, !1),
                    (this._totalTime === t && 0 !== this._duration) ||
                      (N.length && J(), this.render(t, e, !1), N.length && J());
                }
                return this;
              }),
              (a.progress = a.totalProgress = function(t, e) {
                var n = this.duration();
                return arguments.length
                  ? this.totalTime(n * t, e)
                  : n
                  ? this._time / n
                  : this.ratio;
              }),
              (a.startTime = function(t) {
                return arguments.length
                  ? (t !== this._startTime &&
                      ((this._startTime = t),
                      this.timeline &&
                        this.timeline._sortChildren &&
                        this.timeline.add(this, t - this._delay)),
                    this)
                  : this._startTime;
              }),
              (a.endTime = function(t) {
                return (
                  this._startTime +
                  (0 != t ? this.totalDuration() : this.duration()) /
                    this._timeScale
                );
              }),
              (a.timeScale = function(t) {
                if (!arguments.length) return this._timeScale;
                var e, n;
                for (
                  t = t || 1e-8,
                    this._timeline &&
                      this._timeline.smoothChildTiming &&
                      ((n =
                        (e = this._pauseTime) || 0 === e
                          ? e
                          : this._timeline.totalTime()),
                      (this._startTime =
                        n - ((n - this._startTime) * this._timeScale) / t)),
                    this._timeScale = t,
                    n = this.timeline;
                  n && n.timeline;

                )
                  (n._dirty = !0), n.totalDuration(), (n = n.timeline);
                return this;
              }),
              (a.reversed = function(t) {
                return arguments.length
                  ? (t != this._reversed &&
                      ((this._reversed = t),
                      this.totalTime(
                        this._timeline && !this._timeline.smoothChildTiming
                          ? this.totalDuration() - this._totalTime
                          : this._totalTime,
                        !0
                      )),
                    this)
                  : this._reversed;
              }),
              (a.paused = function(t) {
                if (!arguments.length) return this._paused;
                var e,
                  n,
                  r = this._timeline;
                return (
                  t != this._paused &&
                    r &&
                    (l || t || s.wake(),
                    (n = (e = r.rawTime()) - this._pauseTime),
                    !t &&
                      r.smoothChildTiming &&
                      ((this._startTime += n), this._uncache(!1)),
                    (this._pauseTime = t ? e : null),
                    (this._paused = t),
                    (this._active = this.isActive()),
                    !t &&
                      0 !== n &&
                      this._initted &&
                      this.duration() &&
                      ((e = r.smoothChildTiming
                        ? this._totalTime
                        : (e - this._startTime) / this._timeScale),
                      this.render(e, e === this._totalTime, !0))),
                  this._gc && !t && this._enabled(!0, !1),
                  this
                );
              });
            var M = y('core.SimpleTimeline', function(t) {
              I.call(this, 0, t),
                (this.autoRemoveChildren = this.smoothChildTiming = !0);
            });
            ((a = M.prototype = new I()).constructor = M),
              (a.kill()._gc = !1),
              (a._first = a._last = a._recent = null),
              (a._sortChildren = !1),
              (a.add = a.insert = function(t, e, n, r) {
                var i, o;
                if (
                  ((t._startTime = Number(e || 0) + t._delay),
                  t._paused &&
                    this !== t._timeline &&
                    (t._pauseTime =
                      this.rawTime() - (t._timeline.rawTime() - t._pauseTime)),
                  t.timeline && t.timeline._remove(t, !0),
                  (t.timeline = t._timeline = this),
                  t._gc && t._enabled(!0, !0),
                  (i = this._last),
                  this._sortChildren)
                )
                  for (o = t._startTime; i && i._startTime > o; ) i = i._prev;
                return (
                  i
                    ? ((t._next = i._next), (i._next = t))
                    : ((t._next = this._first), (this._first = t)),
                  t._next ? (t._next._prev = t) : (this._last = t),
                  (t._prev = i),
                  (this._recent = t),
                  this._timeline && this._uncache(!0),
                  this
                );
              }),
              (a._remove = function(t, e) {
                return (
                  t.timeline === this &&
                    (e || t._enabled(!1, !0),
                    t._prev
                      ? (t._prev._next = t._next)
                      : this._first === t && (this._first = t._next),
                    t._next
                      ? (t._next._prev = t._prev)
                      : this._last === t && (this._last = t._prev),
                    (t._next = t._prev = t.timeline = null),
                    t === this._recent && (this._recent = this._last),
                    this._timeline && this._uncache(!0)),
                  this
                );
              }),
              (a.render = function(t, e, n) {
                var r,
                  i = this._first;
                for (this._totalTime = this._time = this._rawPrevTime = t; i; )
                  (r = i._next),
                    (i._active ||
                      (t >= i._startTime && !i._paused && !i._gc)) &&
                      (i._reversed
                        ? i.render(
                            (i._dirty ? i.totalDuration() : i._totalDuration) -
                              (t - i._startTime) * i._timeScale,
                            e,
                            n
                          )
                        : i.render((t - i._startTime) * i._timeScale, e, n)),
                    (i = r);
              }),
              (a.rawTime = function() {
                return l || s.wake(), this._totalTime;
              });
            var O = y(
                'TweenLite',
                function(e, n, r) {
                  if (
                    (I.call(this, n, r),
                    (this.render = O.prototype.render),
                    null == e)
                  )
                    throw 'Cannot tween a null target.';
                  this.target = e =
                    'string' != typeof e ? e : O.selector(e) || e;
                  var i,
                    o,
                    a,
                    s =
                      e.jquery ||
                      (e.length &&
                        e !== t &&
                        e[0] &&
                        (e[0] === t ||
                          (e[0].nodeType && e[0].style && !e.nodeType))),
                    l = this.vars.overwrite;
                  if (
                    ((this._overwrite = l =
                      null == l
                        ? Y[O.defaultOverwrite]
                        : 'number' == typeof l
                        ? l >> 0
                        : Y[l]),
                    (s || e instanceof Array || (e.push && m(e))) &&
                      'number' != typeof e[0])
                  )
                    for (
                      this._targets = a = p(e),
                        this._propLookup = [],
                        this._siblings = [],
                        i = 0;
                      i < a.length;
                      i++
                    )
                      (o = a[i])
                        ? 'string' != typeof o
                          ? o.length &&
                            o !== t &&
                            o[0] &&
                            (o[0] === t ||
                              (o[0].nodeType && o[0].style && !o.nodeType))
                            ? (a.splice(i--, 1),
                              (this._targets = a = a.concat(p(o))))
                            : ((this._siblings[i] = Q(o, this, !1)),
                              1 === l &&
                                this._siblings[i].length > 1 &&
                                tt(o, this, null, 1, this._siblings[i]))
                          : 'string' == typeof (o = a[i--] = O.selector(o)) &&
                            a.splice(i + 1, 1)
                        : a.splice(i--, 1);
                  else
                    (this._propLookup = {}),
                      (this._siblings = Q(e, this, !1)),
                      1 === l &&
                        this._siblings.length > 1 &&
                        tt(e, this, null, 1, this._siblings);
                  (this.vars.immediateRender ||
                    (0 === n &&
                      0 === this._delay &&
                      !1 !== this.vars.immediateRender)) &&
                    ((this._time = -1e-8),
                    this.render(Math.min(0, -this._delay)));
                },
                !0
              ),
              k = function(e) {
                return (
                  e &&
                  e.length &&
                  e !== t &&
                  e[0] &&
                  (e[0] === t || (e[0].nodeType && e[0].style && !e.nodeType))
                );
              };
            ((a = O.prototype = new I()).constructor = O),
              (a.kill()._gc = !1),
              (a.ratio = 0),
              (a._firstPT = a._targets = a._overwrittenProps = a._startAt = null),
              (a._notifyPluginsOfEnabled = a._lazy = !1),
              (O.version = '2.1.3'),
              (O.defaultEase = a._ease = new T(null, null, 1, 1)),
              (O.defaultOverwrite = 'auto'),
              (O.ticker = s),
              (O.autoSleep = 120),
              (O.lagSmoothing = function(t, e) {
                s.lagSmoothing(t, e);
              }),
              (O.selector =
                t.$ ||
                t.jQuery ||
                function(e) {
                  var r = t.$ || t.jQuery;
                  return r
                    ? ((O.selector = r), r(e))
                    : (n || (n = t.document),
                      n
                        ? n.querySelectorAll
                          ? n.querySelectorAll(e)
                          : n.getElementById(
                              '#' === e.charAt(0) ? e.substr(1) : e
                            )
                        : e);
                });
            var N = [],
              D = {},
              F = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
              L = /[\+-]=-?[\.\d]/,
              U = function(t) {
                for (var e, n = this._firstPT; n; )
                  (e = n.blob
                    ? 1 === t && null != this.end
                      ? this.end
                      : t
                      ? this.join('')
                      : this.start
                    : n.c * t + n.s),
                    n.m
                      ? (e = n.m.call(
                          this._tween,
                          e,
                          this._target || n.t,
                          this._tween
                        ))
                      : e < 1e-6 && e > -1e-6 && !n.blob && (e = 0),
                    n.f
                      ? n.fp
                        ? n.t[n.p](n.fp, e)
                        : n.t[n.p](e)
                      : (n.t[n.p] = e),
                    (n = n._next);
              },
              B = function(t) {
                return ((1e3 * t) | 0) / 1e3 + '';
              },
              z = function(t, e, n, r) {
                var i,
                  o,
                  a,
                  s,
                  l,
                  c,
                  u,
                  h = [],
                  f = 0,
                  p = '',
                  d = 0;
                for (
                  h.start = t,
                    h.end = e,
                    t = h[0] = t + '',
                    e = h[1] = e + '',
                    n && (n(h), (t = h[0]), (e = h[1])),
                    h.length = 0,
                    i = t.match(F) || [],
                    o = e.match(F) || [],
                    r &&
                      ((r._next = null),
                      (r.blob = 1),
                      (h._firstPT = h._applyPT = r)),
                    l = o.length,
                    s = 0;
                  s < l;
                  s++
                )
                  (u = o[s]),
                    (p +=
                      (c = e.substr(f, e.indexOf(u, f) - f)) || !s ? c : ','),
                    (f += c.length),
                    d ? (d = (d + 1) % 5) : 'rgba(' === c.substr(-5) && (d = 1),
                    u === i[s] || i.length <= s
                      ? (p += u)
                      : (p && (h.push(p), (p = '')),
                        (a = parseFloat(i[s])),
                        h.push(a),
                        (h._firstPT = {
                          _next: h._firstPT,
                          t: h,
                          p: h.length - 1,
                          s: a,
                          c:
                            ('=' === u.charAt(1)
                              ? parseInt(u.charAt(0) + '1', 10) *
                                parseFloat(u.substr(2))
                              : parseFloat(u) - a) || 0,
                          f: 0,
                          m: d && d < 4 ? Math.round : B
                        })),
                    (f += u.length);
                return (
                  (p += e.substr(f)) && h.push(p),
                  (h.setRatio = U),
                  L.test(e) && (h.end = null),
                  h
                );
              },
              j = function(t, e, n, r, i, o, a, s, l) {
                'function' == typeof r && (r = r(l || 0, t));
                var c = typeof t[e],
                  u =
                    'function' !== c
                      ? ''
                      : e.indexOf('set') ||
                        'function' != typeof t['get' + e.substr(3)]
                      ? e
                      : 'get' + e.substr(3),
                  h = 'get' !== n ? n : u ? (a ? t[u](a) : t[u]()) : t[e],
                  f = 'string' == typeof r && '=' === r.charAt(1),
                  p = {
                    t: t,
                    p: e,
                    s: h,
                    f: 'function' === c,
                    pg: 0,
                    n: i || e,
                    m: o ? ('function' == typeof o ? o : Math.round) : 0,
                    pr: 0,
                    c: f
                      ? parseInt(r.charAt(0) + '1', 10) *
                        parseFloat(r.substr(2))
                      : parseFloat(r) - h || 0
                  };
                if (
                  (('number' != typeof h || ('number' != typeof r && !f)) &&
                    (a ||
                    isNaN(h) ||
                    (!f && isNaN(r)) ||
                    'boolean' == typeof h ||
                    'boolean' == typeof r
                      ? ((p.fp = a),
                        (p = {
                          t: z(
                            h,
                            f
                              ? parseFloat(p.s) +
                                  p.c +
                                  (p.s + '').replace(/[0-9\-\.]/g, '')
                              : r,
                            s || O.defaultStringFilter,
                            p
                          ),
                          p: 'setRatio',
                          s: 0,
                          c: 1,
                          f: 2,
                          pg: 0,
                          n: i || e,
                          pr: 0,
                          m: 0
                        }))
                      : ((p.s = parseFloat(h)),
                        f || (p.c = parseFloat(r) - p.s || 0))),
                  p.c)
                )
                  return (
                    (p._next = this._firstPT) && (p._next._prev = p),
                    (this._firstPT = p),
                    p
                  );
              },
              V = (O._internals = {
                isArray: m,
                isSelector: k,
                lazyTweens: N,
                blobDif: z
              }),
              X = (O._plugins = {}),
              q = (V.tweenLookup = {}),
              H = 0,
              G = (V.reservedProps = {
                ease: 1,
                delay: 1,
                overwrite: 1,
                onComplete: 1,
                onCompleteParams: 1,
                onCompleteScope: 1,
                useFrames: 1,
                runBackwards: 1,
                startAt: 1,
                onUpdate: 1,
                onUpdateParams: 1,
                onUpdateScope: 1,
                onStart: 1,
                onStartParams: 1,
                onStartScope: 1,
                onReverseComplete: 1,
                onReverseCompleteParams: 1,
                onReverseCompleteScope: 1,
                onRepeat: 1,
                onRepeatParams: 1,
                onRepeatScope: 1,
                easeParams: 1,
                yoyo: 1,
                immediateRender: 1,
                repeat: 1,
                repeatDelay: 1,
                data: 1,
                paused: 1,
                reversed: 1,
                autoCSS: 1,
                lazy: 1,
                onOverwrite: 1,
                callbackScope: 1,
                stringFilter: 1,
                id: 1,
                yoyoEase: 1,
                stagger: 1
              }),
              Y = {
                none: 0,
                all: 1,
                auto: 2,
                concurrent: 3,
                allOnStart: 4,
                preexisting: 5,
                true: 1,
                false: 0
              },
              W = (I._rootFramesTimeline = new M()),
              K = (I._rootTimeline = new M()),
              Z = 30,
              J = (V.lazyRender = function() {
                var t,
                  e,
                  n = N.length;
                for (D = {}, t = 0; t < n; t++)
                  (e = N[t]) &&
                    !1 !== e._lazy &&
                    (e.render(e._lazy[0], e._lazy[1], !0), (e._lazy = !1));
                N.length = 0;
              });
            (K._startTime = s.time),
              (W._startTime = s.frame),
              (K._active = W._active = !0),
              setTimeout(J, 1),
              (I._updateRoot = O.render = function() {
                var t, e, n;
                if (
                  (N.length && J(),
                  K.render((s.time - K._startTime) * K._timeScale, !1, !1),
                  W.render((s.frame - W._startTime) * W._timeScale, !1, !1),
                  N.length && J(),
                  s.frame >= Z)
                ) {
                  for (n in ((Z = s.frame + (parseInt(O.autoSleep, 10) || 120)),
                  q)) {
                    for (t = (e = q[n].tweens).length; --t > -1; )
                      e[t]._gc && e.splice(t, 1);
                    0 === e.length && delete q[n];
                  }
                  if (
                    (!(n = K._first) || n._paused) &&
                    O.autoSleep &&
                    !W._first &&
                    1 === s._listeners.tick.length
                  ) {
                    for (; n && n._paused; ) n = n._next;
                    n || s.sleep();
                  }
                }
              }),
              s.addEventListener('tick', I._updateRoot);
            var Q = function(t, e, n) {
                var r,
                  i,
                  o = t._gsTweenID;
                if (
                  (q[o || (t._gsTweenID = o = 't' + H++)] ||
                    (q[o] = { target: t, tweens: [] }),
                  e && (((r = q[o].tweens)[(i = r.length)] = e), n))
                )
                  for (; --i > -1; ) r[i] === e && r.splice(i, 1);
                return q[o].tweens;
              },
              $ = function(t, e, n, r) {
                var i,
                  o,
                  a = t.vars.onOverwrite;
                return (
                  a && (i = a(t, e, n, r)),
                  (a = O.onOverwrite) && (o = a(t, e, n, r)),
                  !1 !== i && !1 !== o
                );
              },
              tt = function(t, e, n, r, i) {
                var o, a, s, l;
                if (1 === r || r >= 4) {
                  for (l = i.length, o = 0; o < l; o++)
                    if ((s = i[o]) !== e)
                      s._gc || (s._kill(null, t, e) && (a = !0));
                    else if (5 === r) break;
                  return a;
                }
                var c,
                  u = e._startTime + 1e-8,
                  h = [],
                  f = 0,
                  p = 0 === e._duration;
                for (o = i.length; --o > -1; )
                  (s = i[o]) === e ||
                    s._gc ||
                    s._paused ||
                    (s._timeline !== e._timeline
                      ? ((c = c || et(e, 0, p)),
                        0 === et(s, c, p) && (h[f++] = s))
                      : s._startTime <= u &&
                        s._startTime + s.totalDuration() / s._timeScale > u &&
                        (((p || !s._initted) && u - s._startTime <= 2e-8) ||
                          (h[f++] = s)));
                for (o = f; --o > -1; )
                  if (
                    ((l = (s = h[o])._firstPT),
                    2 === r && s._kill(n, t, e) && (a = !0),
                    2 !== r || (!s._firstPT && s._initted && l))
                  ) {
                    if (2 !== r && !$(s, e)) continue;
                    s._enabled(!1, !1) && (a = !0);
                  }
                return a;
              },
              et = function(t, e, n) {
                for (
                  var r = t._timeline, i = r._timeScale, o = t._startTime;
                  r._timeline;

                ) {
                  if (((o += r._startTime), (i *= r._timeScale), r._paused))
                    return -100;
                  r = r._timeline;
                }
                return (o /= i) > e
                  ? o - e
                  : (n && o === e) || (!t._initted && o - e < 2e-8)
                  ? 1e-8
                  : (o += t.totalDuration() / t._timeScale / i) > e + 1e-8
                  ? 0
                  : o - e - 1e-8;
              };
            (a._init = function() {
              var t,
                e,
                n,
                r,
                i,
                o,
                a = this.vars,
                s = this._overwrittenProps,
                l = this._duration,
                c = !!a.immediateRender,
                u = a.ease,
                h = this._startAt;
              if (a.startAt) {
                for (r in (h && (h.render(-1, !0), h.kill()),
                (i = {}),
                a.startAt))
                  i[r] = a.startAt[r];
                if (
                  ((i.data = 'isStart'),
                  (i.overwrite = !1),
                  (i.immediateRender = !0),
                  (i.lazy = c && !1 !== a.lazy),
                  (i.startAt = i.delay = null),
                  (i.onUpdate = a.onUpdate),
                  (i.onUpdateParams = a.onUpdateParams),
                  (i.onUpdateScope =
                    a.onUpdateScope || a.callbackScope || this),
                  (this._startAt = O.to(this.target || {}, 0, i)),
                  c)
                )
                  if (this._time > 0) this._startAt = null;
                  else if (0 !== l) return;
              } else if (a.runBackwards && 0 !== l)
                if (h) h.render(-1, !0), h.kill(), (this._startAt = null);
                else {
                  for (r in (0 !== this._time && (c = !1), (n = {}), a))
                    (G[r] && 'autoCSS' !== r) || (n[r] = a[r]);
                  if (
                    ((n.overwrite = 0),
                    (n.data = 'isFromStart'),
                    (n.lazy = c && !1 !== a.lazy),
                    (n.immediateRender = c),
                    (this._startAt = O.to(this.target, 0, n)),
                    c)
                  ) {
                    if (0 === this._time) return;
                  } else
                    this._startAt._init(),
                      this._startAt._enabled(!1),
                      this.vars.immediateRender && (this._startAt = null);
                }
              if (
                ((this._ease = u = u
                  ? u instanceof T
                    ? u
                    : 'function' == typeof u
                    ? new T(u, a.easeParams)
                    : x[u] || O.defaultEase
                  : O.defaultEase),
                a.easeParams instanceof Array &&
                  u.config &&
                  (this._ease = u.config.apply(u, a.easeParams)),
                (this._easeType = this._ease._type),
                (this._easePower = this._ease._power),
                (this._firstPT = null),
                this._targets)
              )
                for (o = this._targets.length, t = 0; t < o; t++)
                  this._initProps(
                    this._targets[t],
                    (this._propLookup[t] = {}),
                    this._siblings[t],
                    s ? s[t] : null,
                    t
                  ) && (e = !0);
              else
                e = this._initProps(
                  this.target,
                  this._propLookup,
                  this._siblings,
                  s,
                  0
                );
              if (
                (e && O._onPluginEvent('_onInitAllProps', this),
                s &&
                  (this._firstPT ||
                    ('function' != typeof this.target &&
                      this._enabled(!1, !1))),
                a.runBackwards)
              )
                for (n = this._firstPT; n; )
                  (n.s += n.c), (n.c = -n.c), (n = n._next);
              (this._onUpdate = a.onUpdate), (this._initted = !0);
            }),
              (a._initProps = function(e, n, r, i, o) {
                var a, s, l, c, u, h;
                if (null == e) return !1;
                for (a in (D[e._gsTweenID] && J(),
                this.vars.css ||
                  (e.style &&
                    e !== t &&
                    e.nodeType &&
                    X.css &&
                    !1 !== this.vars.autoCSS &&
                    (function(t, e) {
                      var n,
                        r = {};
                      for (n in t)
                        G[n] ||
                          (n in e &&
                            'transform' !== n &&
                            'x' !== n &&
                            'y' !== n &&
                            'width' !== n &&
                            'height' !== n &&
                            'className' !== n &&
                            'border' !== n) ||
                          !(!X[n] || (X[n] && X[n]._autoCSS)) ||
                          ((r[n] = t[n]), delete t[n]);
                      t.css = r;
                    })(this.vars, e)),
                this.vars))
                  if (((h = this.vars[a]), G[a]))
                    h &&
                      (h instanceof Array || (h.push && m(h))) &&
                      -1 !== h.join('').indexOf('{self}') &&
                      (this.vars[a] = h = this._swapSelfInParams(h, this));
                  else if (
                    X[a] &&
                    (c = new X[a]())._onInitTween(e, this.vars[a], this, o)
                  ) {
                    for (
                      this._firstPT = u = {
                        _next: this._firstPT,
                        t: c,
                        p: 'setRatio',
                        s: 0,
                        c: 1,
                        f: 1,
                        n: a,
                        pg: 1,
                        pr: c._priority,
                        m: 0
                      },
                        s = c._overwriteProps.length;
                      --s > -1;

                    )
                      n[c._overwriteProps[s]] = this._firstPT;
                    (c._priority || c._onInitAllProps) && (l = !0),
                      (c._onDisable || c._onEnable) &&
                        (this._notifyPluginsOfEnabled = !0),
                      u._next && (u._next._prev = u);
                  } else
                    n[a] = j.call(
                      this,
                      e,
                      a,
                      'get',
                      h,
                      a,
                      0,
                      null,
                      this.vars.stringFilter,
                      o
                    );
                return i && this._kill(i, e)
                  ? this._initProps(e, n, r, i, o)
                  : this._overwrite > 1 &&
                    this._firstPT &&
                    r.length > 1 &&
                    tt(e, this, n, this._overwrite, r)
                  ? (this._kill(n, e), this._initProps(e, n, r, i, o))
                  : (this._firstPT &&
                      ((!1 !== this.vars.lazy && this._duration) ||
                        (this.vars.lazy && !this._duration)) &&
                      (D[e._gsTweenID] = !0),
                    l);
              }),
              (a.render = function(t, e, n) {
                var r,
                  i,
                  o,
                  a,
                  s = this._time,
                  l = this._duration,
                  c = this._rawPrevTime;
                if (t >= l - 1e-8 && t >= 0)
                  (this._totalTime = this._time = l),
                    (this.ratio = this._ease._calcEnd
                      ? this._ease.getRatio(1)
                      : 1),
                    this._reversed ||
                      ((r = !0),
                      (i = 'onComplete'),
                      (n = n || this._timeline.autoRemoveChildren)),
                    0 === l &&
                      (this._initted || !this.vars.lazy || n) &&
                      (this._startTime === this._timeline._duration && (t = 0),
                      (c < 0 ||
                        (t <= 0 && t >= -1e-8) ||
                        (1e-8 === c && 'isPause' !== this.data)) &&
                        c !== t &&
                        ((n = !0), c > 1e-8 && (i = 'onReverseComplete')),
                      (this._rawPrevTime = a = !e || t || c === t ? t : 1e-8));
                else if (t < 1e-8)
                  (this._totalTime = this._time = 0),
                    (this.ratio = this._ease._calcEnd
                      ? this._ease.getRatio(0)
                      : 0),
                    (0 !== s || (0 === l && c > 0)) &&
                      ((i = 'onReverseComplete'), (r = this._reversed)),
                    t > -1e-8
                      ? (t = 0)
                      : t < 0 &&
                        ((this._active = !1),
                        0 === l &&
                          (this._initted || !this.vars.lazy || n) &&
                          (c >= 0 &&
                            (1e-8 !== c || 'isPause' !== this.data) &&
                            (n = !0),
                          (this._rawPrevTime = a =
                            !e || t || c === t ? t : 1e-8))),
                    (!this._initted ||
                      (this._startAt && this._startAt.progress())) &&
                      (n = !0);
                else if (((this._totalTime = this._time = t), this._easeType)) {
                  var u = t / l,
                    h = this._easeType,
                    f = this._easePower;
                  (1 === h || (3 === h && u >= 0.5)) && (u = 1 - u),
                    3 === h && (u *= 2),
                    1 === f
                      ? (u *= u)
                      : 2 === f
                      ? (u *= u * u)
                      : 3 === f
                      ? (u *= u * u * u)
                      : 4 === f && (u *= u * u * u * u),
                    (this.ratio =
                      1 === h
                        ? 1 - u
                        : 2 === h
                        ? u
                        : t / l < 0.5
                        ? u / 2
                        : 1 - u / 2);
                } else this.ratio = this._ease.getRatio(t / l);
                if (this._time !== s || n) {
                  if (!this._initted) {
                    if ((this._init(), !this._initted || this._gc)) return;
                    if (
                      !n &&
                      this._firstPT &&
                      ((!1 !== this.vars.lazy && this._duration) ||
                        (this.vars.lazy && !this._duration))
                    )
                      return (
                        (this._time = this._totalTime = s),
                        (this._rawPrevTime = c),
                        N.push(this),
                        void (this._lazy = [t, e])
                      );
                    this._time && !r
                      ? (this.ratio = this._ease.getRatio(this._time / l))
                      : r &&
                        this._ease._calcEnd &&
                        (this.ratio = this._ease.getRatio(
                          0 === this._time ? 0 : 1
                        ));
                  }
                  for (
                    !1 !== this._lazy && (this._lazy = !1),
                      this._active ||
                        (!this._paused &&
                          this._time !== s &&
                          t >= 0 &&
                          (this._active = !0)),
                      0 === s &&
                        (this._startAt &&
                          (t >= 0
                            ? this._startAt.render(t, !0, n)
                            : i || (i = '_dummyGS')),
                        this.vars.onStart &&
                          ((0 === this._time && 0 !== l) ||
                            e ||
                            this._callback('onStart'))),
                      o = this._firstPT;
                    o;

                  )
                    o.f
                      ? o.t[o.p](o.c * this.ratio + o.s)
                      : (o.t[o.p] = o.c * this.ratio + o.s),
                      (o = o._next);
                  this._onUpdate &&
                    (t < 0 &&
                      this._startAt &&
                      -1e-4 !== t &&
                      this._startAt.render(t, !0, n),
                    e ||
                      ((this._time !== s || r || n) &&
                        this._callback('onUpdate'))),
                    i &&
                      ((this._gc && !n) ||
                        (t < 0 &&
                          this._startAt &&
                          !this._onUpdate &&
                          -1e-4 !== t &&
                          this._startAt.render(t, !0, n),
                        r &&
                          (this._timeline.autoRemoveChildren &&
                            this._enabled(!1, !1),
                          (this._active = !1)),
                        !e && this.vars[i] && this._callback(i),
                        0 === l &&
                          1e-8 === this._rawPrevTime &&
                          1e-8 !== a &&
                          (this._rawPrevTime = 0)));
                }
              }),
              (a._kill = function(t, e, n) {
                if (
                  ('all' === t && (t = null),
                  null == t && (null == e || e === this.target))
                )
                  return (this._lazy = !1), this._enabled(!1, !1);
                e =
                  'string' != typeof e
                    ? e || this._targets || this.target
                    : O.selector(e) || e;
                var r,
                  i,
                  o,
                  a,
                  s,
                  l,
                  c,
                  u,
                  h,
                  f =
                    n &&
                    this._time &&
                    n._startTime === this._startTime &&
                    this._timeline === n._timeline,
                  p = this._firstPT;
                if ((m(e) || k(e)) && 'number' != typeof e[0])
                  for (r = e.length; --r > -1; )
                    this._kill(t, e[r], n) && (l = !0);
                else {
                  if (this._targets) {
                    for (r = this._targets.length; --r > -1; )
                      if (e === this._targets[r]) {
                        (s = this._propLookup[r] || {}),
                          (this._overwrittenProps =
                            this._overwrittenProps || []),
                          (i = this._overwrittenProps[r] = t
                            ? this._overwrittenProps[r] || {}
                            : 'all');
                        break;
                      }
                  } else {
                    if (e !== this.target) return !1;
                    (s = this._propLookup),
                      (i = this._overwrittenProps = t
                        ? this._overwrittenProps || {}
                        : 'all');
                  }
                  if (s) {
                    if (
                      ((c = t || s),
                      (u =
                        t !== i &&
                        'all' !== i &&
                        t !== s &&
                        ('object' != typeof t || !t._tempKill)),
                      n && (O.onOverwrite || this.vars.onOverwrite))
                    ) {
                      for (o in c) s[o] && (h || (h = []), h.push(o));
                      if ((h || !t) && !$(this, n, e, h)) return !1;
                    }
                    for (o in c)
                      (a = s[o]) &&
                        (f &&
                          (a.f ? a.t[a.p](a.s) : (a.t[a.p] = a.s), (l = !0)),
                        a.pg && a.t._kill(c) && (l = !0),
                        (a.pg && 0 !== a.t._overwriteProps.length) ||
                          (a._prev
                            ? (a._prev._next = a._next)
                            : a === this._firstPT && (this._firstPT = a._next),
                          a._next && (a._next._prev = a._prev),
                          (a._next = a._prev = null)),
                        delete s[o]),
                        u && (i[o] = 1);
                    !this._firstPT &&
                      this._initted &&
                      p &&
                      this._enabled(!1, !1);
                  }
                }
                return l;
              }),
              (a.invalidate = function() {
                this._notifyPluginsOfEnabled &&
                  O._onPluginEvent('_onDisable', this);
                var t = this._time;
                return (
                  (this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null),
                  (this._notifyPluginsOfEnabled = this._active = this._lazy = !1),
                  (this._propLookup = this._targets ? {} : []),
                  I.prototype.invalidate.call(this),
                  this.vars.immediateRender &&
                    ((this._time = -1e-8),
                    this.render(t, !1, !1 !== this.vars.lazy)),
                  this
                );
              }),
              (a._enabled = function(t, e) {
                if ((l || s.wake(), t && this._gc)) {
                  var n,
                    r = this._targets;
                  if (r)
                    for (n = r.length; --n > -1; )
                      this._siblings[n] = Q(r[n], this, !0);
                  else this._siblings = Q(this.target, this, !0);
                }
                return (
                  I.prototype._enabled.call(this, t, e),
                  !(!this._notifyPluginsOfEnabled || !this._firstPT) &&
                    O._onPluginEvent(t ? '_onEnable' : '_onDisable', this)
                );
              }),
              (O.to = function(t, e, n) {
                return new O(t, e, n);
              }),
              (O.from = function(t, e, n) {
                return (
                  (n.runBackwards = !0),
                  (n.immediateRender = 0 != n.immediateRender),
                  new O(t, e, n)
                );
              }),
              (O.fromTo = function(t, e, n, r) {
                return (
                  (r.startAt = n),
                  (r.immediateRender =
                    0 != r.immediateRender && 0 != n.immediateRender),
                  new O(t, e, r)
                );
              }),
              (O.delayedCall = function(t, e, n, r, i) {
                return new O(e, 0, {
                  delay: t,
                  onComplete: e,
                  onCompleteParams: n,
                  callbackScope: r,
                  onReverseComplete: e,
                  onReverseCompleteParams: n,
                  immediateRender: !1,
                  lazy: !1,
                  useFrames: i,
                  overwrite: 0
                });
              }),
              (O.set = function(t, e) {
                return new O(t, 0, e);
              }),
              (O.getTweensOf = function(t, e) {
                if (null == t) return [];
                var n, r, i, o;
                if (
                  ((t = 'string' != typeof t ? t : O.selector(t) || t),
                  (m(t) || k(t)) && 'number' != typeof t[0])
                ) {
                  for (n = t.length, r = []; --n > -1; )
                    r = r.concat(O.getTweensOf(t[n], e));
                  for (n = r.length; --n > -1; )
                    for (o = r[n], i = n; --i > -1; )
                      o === r[i] && r.splice(n, 1);
                } else if (t._gsTweenID)
                  for (n = (r = Q(t).concat()).length; --n > -1; )
                    (r[n]._gc || (e && !r[n].isActive())) && r.splice(n, 1);
                return r || [];
              }),
              (O.killTweensOf = O.killDelayedCallsTo = function(t, e, n) {
                'object' == typeof e && ((n = e), (e = !1));
                for (var r = O.getTweensOf(t, e), i = r.length; --i > -1; )
                  r[i]._kill(n, t);
              });
            var nt = y(
              'plugins.TweenPlugin',
              function(t, e) {
                (this._overwriteProps = (t || '').split(',')),
                  (this._propName = this._overwriteProps[0]),
                  (this._priority = e || 0),
                  (this._super = nt.prototype);
              },
              !0
            );
            if (
              ((a = nt.prototype),
              (nt.version = '1.19.0'),
              (nt.API = 2),
              (a._firstPT = null),
              (a._addTween = j),
              (a.setRatio = U),
              (a._kill = function(t) {
                var e,
                  n = this._overwriteProps,
                  r = this._firstPT;
                if (null != t[this._propName]) this._overwriteProps = [];
                else
                  for (e = n.length; --e > -1; )
                    null != t[n[e]] && n.splice(e, 1);
                for (; r; )
                  null != t[r.n] &&
                    (r._next && (r._next._prev = r._prev),
                    r._prev
                      ? ((r._prev._next = r._next), (r._prev = null))
                      : this._firstPT === r && (this._firstPT = r._next)),
                    (r = r._next);
                return !1;
              }),
              (a._mod = a._roundProps = function(t) {
                for (var e, n = this._firstPT; n; )
                  (e =
                    t[this._propName] ||
                    (null != n.n &&
                      t[n.n.split(this._propName + '_').join('')])) &&
                    'function' == typeof e &&
                    (2 === n.f ? (n.t._applyPT.m = e) : (n.m = e)),
                    (n = n._next);
              }),
              (O._onPluginEvent = function(t, e) {
                var n,
                  r,
                  i,
                  o,
                  a,
                  s = e._firstPT;
                if ('_onInitAllProps' === t) {
                  for (; s; ) {
                    for (a = s._next, r = i; r && r.pr > s.pr; ) r = r._next;
                    (s._prev = r ? r._prev : o) ? (s._prev._next = s) : (i = s),
                      (s._next = r) ? (r._prev = s) : (o = s),
                      (s = a);
                  }
                  s = e._firstPT = i;
                }
                for (; s; )
                  s.pg && 'function' == typeof s.t[t] && s.t[t]() && (n = !0),
                    (s = s._next);
                return n;
              }),
              (nt.activate = function(t) {
                for (var e = t.length; --e > -1; )
                  t[e].API === nt.API && (X[new t[e]()._propName] = t[e]);
                return !0;
              }),
              (_.plugin = function(t) {
                if (!(t && t.propName && t.init && t.API))
                  throw 'illegal plugin definition.';
                var e,
                  n = t.propName,
                  r = t.priority || 0,
                  i = t.overwriteProps,
                  o = {
                    init: '_onInitTween',
                    set: 'setRatio',
                    kill: '_kill',
                    round: '_mod',
                    mod: '_mod',
                    initAll: '_onInitAllProps'
                  },
                  a = y(
                    'plugins.' +
                      n.charAt(0).toUpperCase() +
                      n.substr(1) +
                      'Plugin',
                    function() {
                      nt.call(this, n, r), (this._overwriteProps = i || []);
                    },
                    !0 === t.global
                  ),
                  s = (a.prototype = new nt(n));
                for (e in ((s.constructor = a), (a.API = t.API), o))
                  'function' == typeof t[e] && (s[o[e]] = t[e]);
                return (a.version = t.version), nt.activate([a]), a;
              }),
              (i = t._gsQueue))
            ) {
              for (o = 0; o < i.length; o++) i[o]();
              for (a in g)
                g[a].func ||
                  t.console.log('GSAP encountered missing dependency: ' + a);
            }
            return (l = !1), O;
          })(i),
          a = i.GreenSockGlobals,
          s = a.com.greensock,
          l = s.core.SimpleTimeline,
          c = s.core.Animation,
          u = a.Ease,
          h = (a.Linear, a.Power1, a.Power2, a.Power3, a.Power4, a.TweenPlugin);
        s.events.EventDispatcher;
      }.call(this, n('3UD+')(t), n('yLpj')));
    },
    LxBP: function(t, e, n) {
      'use strict';
      var r = n('VADU');
      e.extractCssUrl = function(t) {
        var e,
          n = /^url\(("[^"]+"|'[^']+'|[^\)]+)\)/;
        if (!n.test(t)) throw new Error('Invalid url');
        return (
          (e = n.exec(t)[1]),
          r.unquoteString(e.replace(/^[\t\r\f\n ]*(.+?)[\t\r\f\n ]*$/, '$1'))
        );
      };
      (e.parse = function(t) {
        return (function(t) {
          var e,
            n = '(url\\(\\s*(?:"[^"]*"|\'[^\']*\'|[^\\(]+)\\s*\\)|[^,\\s]+)',
            r = '(?:\\s*' + n + ')+',
            i = new RegExp(r, 'g'),
            o = [],
            a = function(t) {
              var e,
                r = new RegExp(n, 'g'),
                i = [];
              for (e = r.exec(t); e; ) i.push(e[1]), (e = r.exec(t));
              return i;
            };
          if (
            t.match(
              new RegExp(
                '^\\s*((?:\\s*(url\\(\\s*(?:"[^"]*"|\'[^\']*\'|[^\\(]+)\\s*\\)|[^,\\s]+))+)(?:\\s*,\\s*((?:\\s*(url\\(\\s*(?:"[^"]*"|\'[^\']*\'|[^\\(]+)\\s*\\)|[^,\\s]+))+))*\\s*$'
              )
            )
          ) {
            for (e = i.exec(t); e; ) o.push(a(e[0])), (e = i.exec(t));
            return o;
          }
          return [];
        })(t).map(function(t) {
          var n = (function(t) {
            var n;
            for (n = 0; n < t.length; n++)
              try {
                return { url: e.extractCssUrl(t[n]), idx: n };
              } catch (t) {}
          })(t);
          return n
            ? {
                preUrl: t.slice(0, n.idx),
                url: n.url,
                postUrl: t.slice(n.idx + 1)
              }
            : { preUrl: t };
        });
      }),
        (e.serialize = function(t) {
          return t
            .map(function(t) {
              var e = [].concat(t.preUrl);
              return (
                t.url && e.push('url("' + t.url + '")'),
                t.postUrl && (e = e.concat(t.postUrl)),
                e.join(' ')
              );
            })
            .join(', ');
        });
    },
    Mutr: function(t, e, n) {
      'use strict';
      (function(t) {
        function r(e) {
          var n = t('.l-footer__langs'),
            r = t('.l-footer__langs-bg');
          function i() {
            r.fadeIn(), n.addClass('is-active');
          }
          function o() {
            r.fadeOut(), n.removeClass('is-active');
          }
          e
            ? (n.on('click', i), r.on('click', o))
            : (n.on('mouseenter', i), n.on('mouseleave', o));
        }
        n.d(e, 'a', function() {
          return r;
        });
      }.call(this, n('EVdn')));
    },
    Nehr: function(t, e, n) {
      'use strict';
      t.exports = {
        isString: function(t) {
          return 'string' == typeof t;
        },
        isObject: function(t) {
          return 'object' == typeof t && null !== t;
        },
        isNull: function(t) {
          return null === t;
        },
        isNullOrUndefined: function(t) {
          return null == t;
        }
      };
    },
    NykK: function(t, e, n) {
      var r = n('nmnc'),
        i = n('AP2z'),
        o = n('KfNM'),
        a = '[object Null]',
        s = '[object Undefined]',
        l = r ? r.toStringTag : void 0;
      t.exports = function(t) {
        return null == t
          ? void 0 === t
            ? s
            : a
          : l && l in Object(t)
          ? i(t)
          : o(t);
      };
    },
    QIyF: function(t, e, n) {
      var r = n('Kz5y');
      t.exports = function() {
        return r.Date.now();
      };
    },
    QM7d: function(t, e, n) {
      'use strict';
      var r = n('033R');
      function i() {
        (this.argTypes = []),
          (this.shimArgs = []),
          (this.arrayArgs = []),
          (this.arrayBlockIndices = []),
          (this.scalarArgs = []),
          (this.offsetArgs = []),
          (this.offsetArgIndex = []),
          (this.indexArgs = []),
          (this.shapeArgs = []),
          (this.funcName = ''),
          (this.pre = null),
          (this.body = null),
          (this.post = null),
          (this.debug = !1);
      }
      t.exports = function(t) {
        var e = new i();
        (e.pre = t.pre), (e.body = t.body), (e.post = t.post);
        var n = t.args.slice(0);
        e.argTypes = n;
        for (var o = 0; o < n.length; ++o) {
          var a = n[o];
          if ('array' === a || ('object' == typeof a && a.blockIndices)) {
            if (
              ((e.argTypes[o] = 'array'),
              e.arrayArgs.push(o),
              e.arrayBlockIndices.push(a.blockIndices ? a.blockIndices : 0),
              e.shimArgs.push('array' + o),
              o < e.pre.args.length && e.pre.args[o].count > 0)
            )
              throw new Error(
                'cwise: pre() block may not reference array args'
              );
            if (o < e.post.args.length && e.post.args[o].count > 0)
              throw new Error(
                'cwise: post() block may not reference array args'
              );
          } else if ('scalar' === a)
            e.scalarArgs.push(o), e.shimArgs.push('scalar' + o);
          else if ('index' === a) {
            if (
              (e.indexArgs.push(o),
              o < e.pre.args.length && e.pre.args[o].count > 0)
            )
              throw new Error(
                'cwise: pre() block may not reference array index'
              );
            if (o < e.body.args.length && e.body.args[o].lvalue)
              throw new Error(
                'cwise: body() block may not write to array index'
              );
            if (o < e.post.args.length && e.post.args[o].count > 0)
              throw new Error(
                'cwise: post() block may not reference array index'
              );
          } else if ('shape' === a) {
            if (
              (e.shapeArgs.push(o),
              o < e.pre.args.length && e.pre.args[o].lvalue)
            )
              throw new Error(
                'cwise: pre() block may not write to array shape'
              );
            if (o < e.body.args.length && e.body.args[o].lvalue)
              throw new Error(
                'cwise: body() block may not write to array shape'
              );
            if (o < e.post.args.length && e.post.args[o].lvalue)
              throw new Error(
                'cwise: post() block may not write to array shape'
              );
          } else {
            if ('object' != typeof a || !a.offset)
              throw new Error('cwise: Unknown argument type ' + n[o]);
            (e.argTypes[o] = 'offset'),
              e.offsetArgs.push({ array: a.array, offset: a.offset }),
              e.offsetArgIndex.push(o);
          }
        }
        if (e.arrayArgs.length <= 0)
          throw new Error('cwise: No array arguments specified');
        if (e.pre.args.length > n.length)
          throw new Error('cwise: Too many arguments in pre() block');
        if (e.body.args.length > n.length)
          throw new Error('cwise: Too many arguments in body() block');
        if (e.post.args.length > n.length)
          throw new Error('cwise: Too many arguments in post() block');
        return (
          (e.debug = !!t.printCode || !!t.debug),
          (e.funcName = t.funcName || 'cwise'),
          (e.blockSize = t.blockSize || 64),
          r(e)
        );
      };
    },
    RVtD: function(t, e, n) {},
    RjOF: function(t, e, n) {
      'use strict';
      /*!
       * repeat-string <https://github.com/jonschlinkert/repeat-string>
       *
       * Copyright (c) 2014-2015, Jon Schlinkert.
       * Licensed under the MIT License.
       */ var r,
        i = '';
      t.exports = function(t, e) {
        if ('string' != typeof t) throw new TypeError('expected a string');
        if (1 === e) return t;
        if (2 === e) return t + t;
        var n = t.length * e;
        if (r !== t || void 0 === r) (r = t), (i = '');
        else if (i.length >= n) return i.substr(0, n);
        for (; n > i.length && e > 1; ) 1 & e && (i += t), (e >>= 1), (t += t);
        return (i = (i += t).substr(0, n));
      };
    },
    SMLl: function(t, e, n) {
      'use strict';
      /*!
       * pad-left <https://github.com/jonschlinkert/pad-left>
       *
       * Copyright (c) 2014-2015, Jon Schlinkert.
       * Licensed under the MIT license.
       */ var r = n('RjOF');
      t.exports = function(t, e, n) {
        return r((n = void 0 !== n ? n + '' : ' '), e) + t;
      };
    },
    TBio: function(t, e, n) {
      'use strict';
      var r = n('F16p');
      function i(t, e, n) {
        var r,
          i,
          o = t.length,
          a = e.arrayArgs.length,
          s = e.indexArgs.length > 0,
          l = [],
          c = [],
          u = 0,
          h = 0;
        for (r = 0; r < o; ++r) c.push(['i', r, '=0'].join(''));
        for (i = 0; i < a; ++i)
          for (r = 0; r < o; ++r)
            (h = u),
              (u = t[r]),
              0 === r
                ? c.push(['d', i, 's', r, '=t', i, 'p', u].join(''))
                : c.push(
                    [
                      'd',
                      i,
                      's',
                      r,
                      '=(t',
                      i,
                      'p',
                      u,
                      '-s',
                      h,
                      '*t',
                      i,
                      'p',
                      h,
                      ')'
                    ].join('')
                  );
        for (
          c.length > 0 && l.push('var ' + c.join(',')), r = o - 1;
          r >= 0;
          --r
        )
          (u = t[r]),
            l.push(['for(i', r, '=0;i', r, '<s', u, ';++i', r, '){'].join(''));
        for (l.push(n), r = 0; r < o; ++r) {
          for (h = u, u = t[r], i = 0; i < a; ++i)
            l.push(['p', i, '+=d', i, 's', r].join(''));
          s &&
            (r > 0 && l.push(['index[', h, ']-=s', h].join('')),
            l.push(['++index[', u, ']'].join(''))),
            l.push('}');
        }
        return l.join('\n');
      }
      function o(t, e, n) {
        for (var r = t.body, i = [], o = [], a = 0; a < t.args.length; ++a) {
          var s = t.args[a];
          if (!(s.count <= 0)) {
            var l = new RegExp(s.name, 'g'),
              c = '',
              u = e.arrayArgs.indexOf(a);
            switch (e.argTypes[a]) {
              case 'offset':
                var h = e.offsetArgIndex.indexOf(a);
                (u = e.offsetArgs[h].array), (c = '+q' + h);
              case 'array':
                c = 'p' + u + c;
                var f = 'l' + a,
                  p = 'a' + u;
                if (0 === e.arrayBlockIndices[u])
                  1 === s.count
                    ? 'generic' === n[u]
                      ? s.lvalue
                        ? (i.push(
                            ['var ', f, '=', p, '.get(', c, ')'].join('')
                          ),
                          (r = r.replace(l, f)),
                          o.push([p, '.set(', c, ',', f, ')'].join('')))
                        : (r = r.replace(l, [p, '.get(', c, ')'].join('')))
                      : (r = r.replace(l, [p, '[', c, ']'].join('')))
                    : 'generic' === n[u]
                    ? (i.push(['var ', f, '=', p, '.get(', c, ')'].join('')),
                      (r = r.replace(l, f)),
                      s.lvalue && o.push([p, '.set(', c, ',', f, ')'].join('')))
                    : (i.push(['var ', f, '=', p, '[', c, ']'].join('')),
                      (r = r.replace(l, f)),
                      s.lvalue && o.push([p, '[', c, ']=', f].join('')));
                else {
                  for (
                    var d = [s.name], m = [c], g = 0;
                    g < Math.abs(e.arrayBlockIndices[u]);
                    g++
                  )
                    d.push('\\s*\\[([^\\]]+)\\]'),
                      m.push('$' + (g + 1) + '*t' + u + 'b' + g);
                  if (
                    ((l = new RegExp(d.join(''), 'g')),
                    (c = m.join('+')),
                    'generic' === n[u])
                  )
                    throw new Error(
                      'cwise: Generic arrays not supported in combination with blocks!'
                    );
                  r = r.replace(l, [p, '[', c, ']'].join(''));
                }
                break;
              case 'scalar':
                r = r.replace(l, 'Y' + e.scalarArgs.indexOf(a));
                break;
              case 'index':
                r = r.replace(l, 'index');
                break;
              case 'shape':
                r = r.replace(l, 'shape');
            }
          }
        }
        return [i.join('\n'), r, o.join('\n')].join('\n').trim();
      }
      function a(t) {
        for (var e = new Array(t.length), n = !0, r = 0; r < t.length; ++r) {
          var i = t[r],
            o = i.match(/\d+/);
          (o = o ? o[0] : ''),
            0 === i.charAt(0)
              ? (e[r] = 'u' + i.charAt(1) + o)
              : (e[r] = i.charAt(0) + o),
            r > 0 && (n = n && e[r] === e[r - 1]);
        }
        return n ? e[0] : e.join('');
      }
      t.exports = function(t, e) {
        for (
          var n = (e[1].length - Math.abs(t.arrayBlockIndices[0])) | 0,
            s = new Array(t.arrayArgs.length),
            l = new Array(t.arrayArgs.length),
            c = 0;
          c < t.arrayArgs.length;
          ++c
        )
          (l[c] = e[2 * c]), (s[c] = e[2 * c + 1]);
        var u = [],
          h = [],
          f = [],
          p = [],
          d = [];
        for (c = 0; c < t.arrayArgs.length; ++c) {
          t.arrayBlockIndices[c] < 0
            ? (f.push(0),
              p.push(n),
              u.push(n),
              h.push(n + t.arrayBlockIndices[c]))
            : (f.push(t.arrayBlockIndices[c]),
              p.push(t.arrayBlockIndices[c] + n),
              u.push(0),
              h.push(t.arrayBlockIndices[c]));
          for (var m = [], g = 0; g < s[c].length; g++)
            f[c] <= s[c][g] && s[c][g] < p[c] && m.push(s[c][g] - f[c]);
          d.push(m);
        }
        var v = ['SS'],
          _ = ["'use strict'"],
          y = [];
        for (g = 0; g < n; ++g) y.push(['s', g, '=SS[', g, ']'].join(''));
        for (c = 0; c < t.arrayArgs.length; ++c) {
          for (
            v.push('a' + c), v.push('t' + c), v.push('p' + c), g = 0;
            g < n;
            ++g
          )
            y.push(['t', c, 'p', g, '=t', c, '[', f[c] + g, ']'].join(''));
          for (g = 0; g < Math.abs(t.arrayBlockIndices[c]); ++g)
            y.push(['t', c, 'b', g, '=t', c, '[', u[c] + g, ']'].join(''));
        }
        for (c = 0; c < t.scalarArgs.length; ++c) v.push('Y' + c);
        if (
          (t.shapeArgs.length > 0 && y.push('shape=SS.slice(0)'),
          t.indexArgs.length > 0)
        ) {
          var b = new Array(n);
          for (c = 0; c < n; ++c) b[c] = '0';
          y.push(['index=[', b.join(','), ']'].join(''));
        }
        for (c = 0; c < t.offsetArgs.length; ++c) {
          var T = t.offsetArgs[c],
            x = [];
          for (g = 0; g < T.offset.length; ++g)
            0 !== T.offset[g] &&
              (1 === T.offset[g]
                ? x.push(['t', T.array, 'p', g].join(''))
                : x.push([T.offset[g], '*t', T.array, 'p', g].join('')));
          0 === x.length
            ? y.push('q' + c + '=0')
            : y.push(['q', c, '=', x.join('+')].join(''));
        }
        var w = r(
          []
            .concat(t.pre.thisVars)
            .concat(t.body.thisVars)
            .concat(t.post.thisVars)
        );
        for (
          (y = y.concat(w)).length > 0 && _.push('var ' + y.join(',')), c = 0;
          c < t.arrayArgs.length;
          ++c
        )
          _.push('p' + c + '|=0');
        t.pre.body.length > 3 && _.push(o(t.pre, t, l));
        var E = o(t.body, t, l),
          A = (function(t) {
            for (var e = 0, n = t[0].length; e < n; ) {
              for (var r = 1; r < t.length; ++r)
                if (t[r][e] !== t[0][e]) return e;
              ++e;
            }
            return e;
          })(d);
        A < n
          ? _.push(
              (function(t, e, n, r) {
                for (
                  var o = e.length,
                    a = n.arrayArgs.length,
                    s = n.blockSize,
                    l = n.indexArgs.length > 0,
                    c = [],
                    u = 0;
                  u < a;
                  ++u
                )
                  c.push(['var offset', u, '=p', u].join(''));
                for (u = t; u < o; ++u)
                  c.push(
                    ['for(var j' + u + '=SS[', e[u], ']|0;j', u, '>0;){'].join(
                      ''
                    )
                  ),
                    c.push(['if(j', u, '<', s, '){'].join('')),
                    c.push(['s', e[u], '=j', u].join('')),
                    c.push(['j', u, '=0'].join('')),
                    c.push(['}else{s', e[u], '=', s].join('')),
                    c.push(['j', u, '-=', s, '}'].join('')),
                    l && c.push(['index[', e[u], ']=j', u].join(''));
                for (u = 0; u < a; ++u) {
                  for (var h = ['offset' + u], f = t; f < o; ++f)
                    h.push(['j', f, '*t', u, 'p', e[f]].join(''));
                  c.push(['p', u, '=(', h.join('+'), ')'].join(''));
                }
                for (c.push(i(e, n, r)), u = t; u < o; ++u) c.push('}');
                return c.join('\n');
              })(A, d[0], t, E)
            )
          : _.push(i(d[0], t, E)),
          t.post.body.length > 3 && _.push(o(t.post, t, l)),
          t.debug &&
            console.log(
              '-----Generated cwise routine for ',
              e,
              ':\n' + _.join('\n') + '\n----------'
            );
        var C = [
          t.funcName || 'unnamed',
          '_cwise_loop_',
          s[0].join('s'),
          'm',
          A,
          a(l)
        ].join('');
        return new Function(
          [
            'function ',
            C,
            '(',
            v.join(','),
            '){',
            _.join('\n'),
            '} return ',
            C
          ].join('')
        )();
      };
    },
    VADU: function(t, e, n) {
      'use strict';
      (e.unquoteString = function(t) {
        var e = /^"(.*)"$/,
          n = /^'(.*)'$/;
        return e.test(t)
          ? t.replace(e, '$1')
          : n.test(t)
          ? t.replace(n, '$1')
          : t;
      }),
        (e.rulesForCssText = function(t) {
          var e,
            n = document.implementation.createHTMLDocument(''),
            r = document.createElement('style');
          return (
            (r.textContent = t),
            n.body.appendChild(r),
            (e = r.sheet.cssRules),
            Array.prototype.slice.call(e)
          );
        }),
        (e.cssRulesToText = function(t) {
          return t.reduce(function(t, e) {
            return t + e.cssText;
          }, '');
        }),
        (e.exchangeRule = function(t, n, r) {
          var i = t.indexOf(n);
          t[i] = e.rulesForCssText(r)[0];
        }),
        (e.changeFontFaceRuleSrc = function(t, n, r) {
          var i =
            '@font-face { font-family: ' +
            n.style.getPropertyValue('font-family') +
            '; ';
          n.style.getPropertyValue('font-style') &&
            (i +=
              'font-style: ' + n.style.getPropertyValue('font-style') + '; '),
            n.style.getPropertyValue('font-weight') &&
              (i +=
                'font-weight: ' +
                n.style.getPropertyValue('font-weight') +
                '; '),
            (i += 'src: ' + r + '}'),
            e.exchangeRule(t, n, i);
        });
    },
    'VR/X': function(t, e, n) {
      'use strict';
      var r = n('XpGV'),
        i = function(t) {
          return Array.prototype.slice.call(t);
        };
      e.inline = function(t, e) {
        var n,
          o = i(t.getElementsByTagName('img')),
          a = i(t.getElementsByTagName('image')),
          s =
            ((n = t.getElementsByTagName('input')),
            Array.prototype.filter.call(n, function(t) {
              return 'image' === t.type;
            })),
          l = (function(t) {
            return t.filter(function(t) {
              var e = null;
              return (
                t.hasAttribute('src')
                  ? (e = t.getAttribute('src'))
                  : t.hasAttributeNS('http://www.w3.org/1999/xlink', 'href')
                  ? (e = t.getAttributeNS(
                      'http://www.w3.org/1999/xlink',
                      'href'
                    ))
                  : t.hasAttribute('href') && (e = t.getAttribute('href')),
                null !== e && !r.isDataUri(e)
              );
            });
          })((o = (o = o.concat(a)).concat(s)));
        return r.collectAndReportErrors(
          l.map(function(t) {
            return (function(t, e) {
              var n = null;
              t.hasAttribute('src')
                ? (n = t.getAttribute('src'))
                : t.hasAttributeNS('http://www.w3.org/1999/xlink', 'href')
                ? (n = t.getAttributeNS('http://www.w3.org/1999/xlink', 'href'))
                : t.hasAttribute('href') && (n = t.getAttribute('href'));
              var i = r.getDocumentBaseUrl(t.ownerDocument),
                o = r.clone(e);
              return (
                !o.baseUrl && i && (o.baseUrl = i),
                r.getDataURIForImageURL(n, o).then(
                  function(t) {
                    return t;
                  },
                  function(t) {
                    throw {
                      resourceType: 'image',
                      url: t.url,
                      msg: 'Unable to load image ' + t.url
                    };
                  }
                )
              );
            })(t, e).then(function(e) {
              t.attributes.src
                ? (t.attributes.src.value = e)
                : t.attributes['xlink:href']
                ? (t.attributes['xlink:href'].value = e)
                : t.attributes.href && (t.attributes.href.value = e);
            });
          })
        );
      };
    },
    WFqU: function(t, e, n) {
      (function(e) {
        var n = 'object' == typeof e && e && e.Object === Object && e;
        t.exports = n;
      }.call(this, n('yLpj')));
    },
    XpGV: function(t, e, n) {
      'use strict';
      var r = n('CxY0');
      (e.getDocumentBaseUrl = function(t) {
        return 'about:blank' !== t.baseURI ? t.baseURI : null;
      }),
        (e.clone = function(t) {
          var e,
            n = {};
          for (e in t) t.hasOwnProperty(e) && (n[e] = t[e]);
          return n;
        }),
        (e.cloneArray = function(t) {
          return Array.prototype.slice.apply(t, [0]);
        }),
        (e.joinUrl = function(t, e) {
          return t ? r.resolve(t, e) : e;
        }),
        (e.isDataUri = function(t) {
          return /^data:/.test(t);
        }),
        (e.collectAndReportErrors = function(t) {
          var e = [];
          return Promise.all(
            t.map(function(t) {
              return t.catch(function(t) {
                e.push(t);
              });
            })
          ).then(function() {
            return e;
          });
        });
      var i = null;
      (e.ajax = function(t, n) {
        return new Promise(function(r, o) {
          var a,
            s = new window.XMLHttpRequest(),
            l = e.joinUrl(n.baseUrl, t),
            c = function() {
              o({ msg: 'Unable to load url', url: l });
            };
          (a = (function(t, e) {
            return !1 === e || 'none' === e || 'repeated' === e
              ? ((null !== i && 'repeated' === e) || (i = Date.now()),
                t + '?_=' + i)
              : t;
          })(l, n.cache)),
            s.addEventListener(
              'load',
              function() {
                200 === s.status || 0 === s.status ? r(s.response) : c();
              },
              !1
            ),
            s.addEventListener('error', c, !1);
          try {
            s.open('GET', a, !0), s.overrideMimeType(n.mimeType), s.send(null);
          } catch (t) {
            c();
          }
        });
      }),
        (e.binaryAjax = function(t, n) {
          var r = e.clone(n);
          return (
            (r.mimeType = 'text/plain; charset=x-user-defined'),
            e.ajax(t, r).then(function(t) {
              for (var e = '', n = 0; n < t.length; n++)
                e += String.fromCharCode(255 & t.charCodeAt(n));
              return e;
            })
          );
        });
      e.getDataURIForImageURL = function(t, n) {
        return e.binaryAjax(t, n).then(function(t) {
          var e = btoa(t);
          return (
            'data:' +
            (function(t) {
              var e = function(t, e) {
                return t.substring(0, e.length) === e;
              };
              return e(t, '<?xml') || e(t, '<svg')
                ? 'image/svg+xml'
                : 'image/png';
            })(t) +
            ';base64,' +
            e
          );
        });
      };
      var o = [],
        a = function(t) {
          return o.indexOf(t) < 0 && o.push(t), o.indexOf(t);
        };
      e.memoize = function(t, e, n) {
        if ('object' != typeof n)
          throw new Error('cacheBucket is not an object');
        return function() {
          var r,
            i = Array.prototype.slice.call(arguments),
            o = e(i),
            s = a(t);
          return n[s] && n[s][o]
            ? n[s][o]
            : ((r = t.apply(null, i)), (n[s] = n[s] || {}), (n[s][o] = r), r);
        };
      };
    },
    Xs3h: function(t, e) {
      t.exports = [
        'abs',
        'acos',
        'all',
        'any',
        'asin',
        'atan',
        'ceil',
        'clamp',
        'cos',
        'cross',
        'dFdx',
        'dFdy',
        'degrees',
        'distance',
        'dot',
        'equal',
        'exp',
        'exp2',
        'faceforward',
        'floor',
        'fract',
        'gl_BackColor',
        'gl_BackLightModelProduct',
        'gl_BackLightProduct',
        'gl_BackMaterial',
        'gl_BackSecondaryColor',
        'gl_ClipPlane',
        'gl_ClipVertex',
        'gl_Color',
        'gl_DepthRange',
        'gl_DepthRangeParameters',
        'gl_EyePlaneQ',
        'gl_EyePlaneR',
        'gl_EyePlaneS',
        'gl_EyePlaneT',
        'gl_Fog',
        'gl_FogCoord',
        'gl_FogFragCoord',
        'gl_FogParameters',
        'gl_FragColor',
        'gl_FragCoord',
        'gl_FragData',
        'gl_FragDepth',
        'gl_FragDepthEXT',
        'gl_FrontColor',
        'gl_FrontFacing',
        'gl_FrontLightModelProduct',
        'gl_FrontLightProduct',
        'gl_FrontMaterial',
        'gl_FrontSecondaryColor',
        'gl_LightModel',
        'gl_LightModelParameters',
        'gl_LightModelProducts',
        'gl_LightProducts',
        'gl_LightSource',
        'gl_LightSourceParameters',
        'gl_MaterialParameters',
        'gl_MaxClipPlanes',
        'gl_MaxCombinedTextureImageUnits',
        'gl_MaxDrawBuffers',
        'gl_MaxFragmentUniformComponents',
        'gl_MaxLights',
        'gl_MaxTextureCoords',
        'gl_MaxTextureImageUnits',
        'gl_MaxTextureUnits',
        'gl_MaxVaryingFloats',
        'gl_MaxVertexAttribs',
        'gl_MaxVertexTextureImageUnits',
        'gl_MaxVertexUniformComponents',
        'gl_ModelViewMatrix',
        'gl_ModelViewMatrixInverse',
        'gl_ModelViewMatrixInverseTranspose',
        'gl_ModelViewMatrixTranspose',
        'gl_ModelViewProjectionMatrix',
        'gl_ModelViewProjectionMatrixInverse',
        'gl_ModelViewProjectionMatrixInverseTranspose',
        'gl_ModelViewProjectionMatrixTranspose',
        'gl_MultiTexCoord0',
        'gl_MultiTexCoord1',
        'gl_MultiTexCoord2',
        'gl_MultiTexCoord3',
        'gl_MultiTexCoord4',
        'gl_MultiTexCoord5',
        'gl_MultiTexCoord6',
        'gl_MultiTexCoord7',
        'gl_Normal',
        'gl_NormalMatrix',
        'gl_NormalScale',
        'gl_ObjectPlaneQ',
        'gl_ObjectPlaneR',
        'gl_ObjectPlaneS',
        'gl_ObjectPlaneT',
        'gl_Point',
        'gl_PointCoord',
        'gl_PointParameters',
        'gl_PointSize',
        'gl_Position',
        'gl_ProjectionMatrix',
        'gl_ProjectionMatrixInverse',
        'gl_ProjectionMatrixInverseTranspose',
        'gl_ProjectionMatrixTranspose',
        'gl_SecondaryColor',
        'gl_TexCoord',
        'gl_TextureEnvColor',
        'gl_TextureMatrix',
        'gl_TextureMatrixInverse',
        'gl_TextureMatrixInverseTranspose',
        'gl_TextureMatrixTranspose',
        'gl_Vertex',
        'greaterThan',
        'greaterThanEqual',
        'inversesqrt',
        'length',
        'lessThan',
        'lessThanEqual',
        'log',
        'log2',
        'matrixCompMult',
        'max',
        'min',
        'mix',
        'mod',
        'normalize',
        'not',
        'notEqual',
        'pow',
        'radians',
        'reflect',
        'refract',
        'sign',
        'sin',
        'smoothstep',
        'sqrt',
        'step',
        'tan',
        'texture2D',
        'texture2DLod',
        'texture2DProj',
        'texture2DProjLod',
        'textureCube',
        'textureCubeLod',
        'texture2DLodEXT',
        'texture2DProjLodEXT',
        'textureCubeLodEXT',
        'texture2DGradEXT',
        'texture2DProjGradEXT',
        'textureCubeGradEXT'
      ];
    },
    YYSD: function(t, e, n) {
      'use strict';
      var r = n('XpGV'),
        i = n('VR/X'),
        o = n('g+oV'),
        a = n('6ozI'),
        s = n('VADU'),
        l = function(t) {
          return t.map(function(e, n) {
            var i;
            return (
              n === t.length - 1 &&
                (e = { baseUrl: ((i = e.baseUrl), r.joinUrl(i, '.')) }),
              JSON.stringify(e)
            );
          });
        },
        c = function(t, e) {
          return !1 !== e.cache && 'none' !== e.cache && e.cacheBucket
            ? r.memoize(t, l, e.cacheBucket)
            : t;
        },
        u = function(t, e, n) {
          var r = s.rulesForCssText(t);
          return a.loadCSSImportsForRules(r, e, n).then(function(e) {
            return a.loadAndInlineCSSResourcesForRules(r, n).then(function(n) {
              var i = e.errors.concat(n.errors),
                o = e.hasChanges || n.hasChanges;
              return (
                o && (t = s.cssRulesToText(r)),
                { hasChanges: o, content: t, errors: i }
              );
            });
          });
        };
      e.loadAndInlineStyles = function(t, e) {
        var n,
          i = (function(t) {
            var e = t.getElementsByTagName('style');
            return Array.prototype.filter.call(e, function(t) {
              return (
                !t.attributes.type || 'text/css' === t.attributes.type.value
              );
            });
          })(t),
          o = [],
          a = [];
        return (
          ((n = r.clone(e)).baseUrl = n.baseUrl || r.getDocumentBaseUrl(t)),
          Promise.all(
            i.map(function(t) {
              return (function(t, e, n) {
                var i = t.textContent;
                return c(u, e)(i, n, e).then(function(e) {
                  return (
                    e.hasChanges && (t.childNodes[0].nodeValue = e.content),
                    r.cloneArray(e.errors)
                  );
                });
              })(t, n, a).then(function(t) {
                o = o.concat(t);
              });
            })
          ).then(function() {
            return o;
          })
        );
      };
      var h = function(t, e) {
        return r
          .ajax(t, e)
          .then(function(t) {
            return { content: t, cssRules: s.rulesForCssText(t) };
          })
          .then(function(e) {
            var n = a.adjustPathsOfCssResources(t, e.cssRules);
            return { content: e.content, cssRules: e.cssRules, hasChanges: n };
          })
          .then(function(t) {
            return a
              .loadCSSImportsForRules(t.cssRules, [], e)
              .then(function(e) {
                return {
                  content: t.content,
                  cssRules: t.cssRules,
                  hasChanges: t.hasChanges || e.hasChanges,
                  errors: e.errors
                };
              });
          })
          .then(function(t) {
            return a
              .loadAndInlineCSSResourcesForRules(t.cssRules, e)
              .then(function(e) {
                return {
                  content: t.content,
                  cssRules: t.cssRules,
                  hasChanges: t.hasChanges || e.hasChanges,
                  errors: t.errors.concat(e.errors)
                };
              });
          })
          .then(function(t) {
            var e = t.content;
            return (
              t.hasChanges && (e = s.cssRulesToText(t.cssRules)),
              { content: e, errors: t.errors }
            );
          });
      };
      (e.loadAndInlineCssLinks = function(t, e) {
        var n = (function(t) {
            var e = t.getElementsByTagName('link');
            return Array.prototype.filter.call(e, function(t) {
              return (
                t.attributes.rel &&
                'stylesheet' === t.attributes.rel.value &&
                (!t.attributes.type || 'text/css' === t.attributes.type.value)
              );
            });
          })(t),
          i = [];
        return Promise.all(
          n.map(function(t) {
            return (function(t, e) {
              var n = t.attributes.href.value,
                i = r.getDocumentBaseUrl(t.ownerDocument),
                o = r.clone(e);
              return (
                !o.baseUrl && i && (o.baseUrl = i),
                c(h, e)(n, o).then(function(t) {
                  return { content: t.content, errors: r.cloneArray(t.errors) };
                })
              );
            })(t, e).then(
              function(e) {
                var n, r, o, a;
                (n = t),
                  (r = e.content + '\n'),
                  (a = n.parentNode),
                  (r = r.trim()) &&
                    (((o = n.ownerDocument.createElement('style')).type =
                      'text/css'),
                    o.appendChild(n.ownerDocument.createTextNode(r)),
                    a.insertBefore(o, n)),
                  a.removeChild(n),
                  (i = i.concat(e.errors));
              },
              function(t) {
                i.push({
                  resourceType: 'stylesheet',
                  url: t.url,
                  msg: 'Unable to load stylesheet ' + t.url
                });
              }
            );
          })
        ).then(function() {
          return i;
        });
      }),
        (e.loadAndInlineImages = i.inline),
        (e.loadAndInlineScript = o.inline),
        (e.inlineReferences = function(t, n) {
          var r = [],
            i = [
              e.loadAndInlineImages,
              e.loadAndInlineStyles,
              e.loadAndInlineCssLinks
            ];
          return (
            !1 !== n.inlineScripts && i.push(e.loadAndInlineScript),
            Promise.all(
              i.map(function(e) {
                return e(t, n).then(function(t) {
                  r = r.concat(t);
                });
              })
            ).then(function() {
              return r;
            })
          );
        });
    },
    YisV: function(t, e, n) {
      (function(r) {
        var i, o, a;
        /*! Magnific Popup - v1.1.0 - 2016-02-20
         * http://dimsemenov.com/plugins/magnific-popup/
         * Copyright (c) 2016 Dmitry Semenov; */ (o = [n('EVdn')]),
          void 0 ===
            (a =
              'function' ==
              typeof (i = function(t) {
                var e,
                  n,
                  i,
                  o,
                  a,
                  s,
                  l = function() {},
                  c = !!r,
                  u = t(window),
                  h = function(t, n) {
                    e.ev.on('mfp' + t + '.mfp', n);
                  },
                  f = function(e, n, r, i) {
                    var o = document.createElement('div');
                    return (
                      (o.className = 'mfp-' + e),
                      r && (o.innerHTML = r),
                      i
                        ? n && n.appendChild(o)
                        : ((o = t(o)), n && o.appendTo(n)),
                      o
                    );
                  },
                  p = function(n, r) {
                    e.ev.triggerHandler('mfp' + n, r),
                      e.st.callbacks &&
                        ((n = n.charAt(0).toLowerCase() + n.slice(1)),
                        e.st.callbacks[n] &&
                          e.st.callbacks[n].apply(e, t.isArray(r) ? r : [r]));
                  },
                  d = function(n) {
                    return (
                      (n === s && e.currTemplate.closeBtn) ||
                        ((e.currTemplate.closeBtn = t(
                          e.st.closeMarkup.replace('%title%', e.st.tClose)
                        )),
                        (s = n)),
                      e.currTemplate.closeBtn
                    );
                  },
                  m = function() {
                    t.magnificPopup.instance ||
                      ((e = new l()).init(), (t.magnificPopup.instance = e));
                  };
                (l.prototype = {
                  constructor: l,
                  init: function() {
                    var n = navigator.appVersion;
                    (e.isLowIE = e.isIE8 =
                      document.all && !document.addEventListener),
                      (e.isAndroid = /android/gi.test(n)),
                      (e.isIOS = /iphone|ipad|ipod/gi.test(n)),
                      (e.supportsTransition = (function() {
                        var t = document.createElement('p').style,
                          e = ['ms', 'O', 'Moz', 'Webkit'];
                        if (void 0 !== t.transition) return !0;
                        for (; e.length; )
                          if (e.pop() + 'Transition' in t) return !0;
                        return !1;
                      })()),
                      (e.probablyMobile =
                        e.isAndroid ||
                        e.isIOS ||
                        /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(
                          navigator.userAgent
                        )),
                      (i = t(document)),
                      (e.popupsCache = {});
                  },
                  open: function(n) {
                    var r;
                    if (!1 === n.isObj) {
                      (e.items = n.items.toArray()), (e.index = 0);
                      var o,
                        s = n.items;
                      for (r = 0; r < s.length; r++)
                        if (
                          ((o = s[r]).parsed && (o = o.el[0]), o === n.el[0])
                        ) {
                          e.index = r;
                          break;
                        }
                    } else
                      (e.items = t.isArray(n.items) ? n.items : [n.items]),
                        (e.index = n.index || 0);
                    if (!e.isOpen) {
                      (e.types = []),
                        (a = ''),
                        n.mainEl && n.mainEl.length
                          ? (e.ev = n.mainEl.eq(0))
                          : (e.ev = i),
                        n.key
                          ? (e.popupsCache[n.key] ||
                              (e.popupsCache[n.key] = {}),
                            (e.currTemplate = e.popupsCache[n.key]))
                          : (e.currTemplate = {}),
                        (e.st = t.extend(!0, {}, t.magnificPopup.defaults, n)),
                        (e.fixedContentPos =
                          'auto' === e.st.fixedContentPos
                            ? !e.probablyMobile
                            : e.st.fixedContentPos),
                        e.st.modal &&
                          ((e.st.closeOnContentClick = !1),
                          (e.st.closeOnBgClick = !1),
                          (e.st.showCloseBtn = !1),
                          (e.st.enableEscapeKey = !1)),
                        e.bgOverlay ||
                          ((e.bgOverlay = f('bg').on('click.mfp', function() {
                            e.close();
                          })),
                          (e.wrap = f('wrap')
                            .attr('tabindex', -1)
                            .on('click.mfp', function(t) {
                              e._checkIfClose(t.target) && e.close();
                            })),
                          (e.container = f('container', e.wrap))),
                        (e.contentContainer = f('content')),
                        e.st.preloader &&
                          (e.preloader = f(
                            'preloader',
                            e.container,
                            e.st.tLoading
                          ));
                      var l = t.magnificPopup.modules;
                      for (r = 0; r < l.length; r++) {
                        var c = l[r];
                        (c = c.charAt(0).toUpperCase() + c.slice(1)),
                          e['init' + c].call(e);
                      }
                      p('BeforeOpen'),
                        e.st.showCloseBtn &&
                          (e.st.closeBtnInside
                            ? (h('MarkupParse', function(t, e, n, r) {
                                n.close_replaceWith = d(r.type);
                              }),
                              (a += ' mfp-close-btn-in'))
                            : e.wrap.append(d())),
                        e.st.alignTop && (a += ' mfp-align-top'),
                        e.fixedContentPos
                          ? e.wrap.css({
                              overflow: e.st.overflowY,
                              overflowX: 'hidden',
                              overflowY: e.st.overflowY
                            })
                          : e.wrap.css({
                              top: u.scrollTop(),
                              position: 'absolute'
                            }),
                        (!1 === e.st.fixedBgPos ||
                          ('auto' === e.st.fixedBgPos && !e.fixedContentPos)) &&
                          e.bgOverlay.css({
                            height: i.height(),
                            position: 'absolute'
                          }),
                        e.st.enableEscapeKey &&
                          i.on('keyup.mfp', function(t) {
                            27 === t.keyCode && e.close();
                          }),
                        u.on('resize.mfp', function() {
                          e.updateSize();
                        }),
                        e.st.closeOnContentClick || (a += ' mfp-auto-cursor'),
                        a && e.wrap.addClass(a);
                      var m = (e.wH = u.height()),
                        g = {};
                      if (e.fixedContentPos && e._hasScrollBar(m)) {
                        var v = e._getScrollbarSize();
                        v && (g.marginRight = v);
                      }
                      e.fixedContentPos &&
                        (e.isIE7
                          ? t('body, html').css('overflow', 'hidden')
                          : (g.overflow = 'hidden'));
                      var _ = e.st.mainClass;
                      return (
                        e.isIE7 && (_ += ' mfp-ie7'),
                        _ && e._addClassToMFP(_),
                        e.updateItemHTML(),
                        p('BuildControls'),
                        t('html').css(g),
                        e.bgOverlay
                          .add(e.wrap)
                          .prependTo(e.st.prependTo || t(document.body)),
                        (e._lastFocusedEl = document.activeElement),
                        setTimeout(function() {
                          e.content
                            ? (e._addClassToMFP('mfp-ready'), e._setFocus())
                            : e.bgOverlay.addClass('mfp-ready'),
                            i.on('focusin.mfp', e._onFocusIn);
                        }, 16),
                        (e.isOpen = !0),
                        e.updateSize(m),
                        p('Open'),
                        n
                      );
                    }
                    e.updateItemHTML();
                  },
                  close: function() {
                    e.isOpen &&
                      (p('BeforeClose'),
                      (e.isOpen = !1),
                      e.st.removalDelay && !e.isLowIE && e.supportsTransition
                        ? (e._addClassToMFP('mfp-removing'),
                          setTimeout(function() {
                            e._close();
                          }, e.st.removalDelay))
                        : e._close());
                  },
                  _close: function() {
                    p('Close');
                    var n = 'mfp-removing mfp-ready ';
                    if (
                      (e.bgOverlay.detach(),
                      e.wrap.detach(),
                      e.container.empty(),
                      e.st.mainClass && (n += e.st.mainClass + ' '),
                      e._removeClassFromMFP(n),
                      e.fixedContentPos)
                    ) {
                      var r = { marginRight: '' };
                      e.isIE7
                        ? t('body, html').css('overflow', '')
                        : (r.overflow = ''),
                        t('html').css(r);
                    }
                    i.off('keyup.mfp focusin.mfp'),
                      e.ev.off('.mfp'),
                      e.wrap.attr('class', 'mfp-wrap').removeAttr('style'),
                      e.bgOverlay.attr('class', 'mfp-bg'),
                      e.container.attr('class', 'mfp-container'),
                      !e.st.showCloseBtn ||
                        (e.st.closeBtnInside &&
                          !0 !== e.currTemplate[e.currItem.type]) ||
                        (e.currTemplate.closeBtn &&
                          e.currTemplate.closeBtn.detach()),
                      e.st.autoFocusLast &&
                        e._lastFocusedEl &&
                        t(e._lastFocusedEl).focus(),
                      (e.currItem = null),
                      (e.content = null),
                      (e.currTemplate = null),
                      (e.prevHeight = 0),
                      p('AfterClose');
                  },
                  updateSize: function(t) {
                    if (e.isIOS) {
                      var n =
                          document.documentElement.clientWidth /
                          window.innerWidth,
                        r = window.innerHeight * n;
                      e.wrap.css('height', r), (e.wH = r);
                    } else e.wH = t || u.height();
                    e.fixedContentPos || e.wrap.css('height', e.wH),
                      p('Resize');
                  },
                  updateItemHTML: function() {
                    var n = e.items[e.index];
                    e.contentContainer.detach(),
                      e.content && e.content.detach(),
                      n.parsed || (n = e.parseEl(e.index));
                    var r = n.type;
                    if (
                      (p('BeforeChange', [
                        e.currItem ? e.currItem.type : '',
                        r
                      ]),
                      (e.currItem = n),
                      !e.currTemplate[r])
                    ) {
                      var i = !!e.st[r] && e.st[r].markup;
                      p('FirstMarkupParse', i),
                        (e.currTemplate[r] = !i || t(i));
                    }
                    o &&
                      o !== n.type &&
                      e.container.removeClass('mfp-' + o + '-holder');
                    var a = e['get' + r.charAt(0).toUpperCase() + r.slice(1)](
                      n,
                      e.currTemplate[r]
                    );
                    e.appendContent(a, r),
                      (n.preloaded = !0),
                      p('Change', n),
                      (o = n.type),
                      e.container.prepend(e.contentContainer),
                      p('AfterChange');
                  },
                  appendContent: function(t, n) {
                    (e.content = t),
                      t
                        ? e.st.showCloseBtn &&
                          e.st.closeBtnInside &&
                          !0 === e.currTemplate[n]
                          ? e.content.find('.mfp-close').length ||
                            e.content.append(d())
                          : (e.content = t)
                        : (e.content = ''),
                      p('BeforeAppend'),
                      e.container.addClass('mfp-' + n + '-holder'),
                      e.contentContainer.append(e.content);
                  },
                  parseEl: function(n) {
                    var r,
                      i = e.items[n];
                    if (
                      (i.tagName
                        ? (i = { el: t(i) })
                        : ((r = i.type), (i = { data: i, src: i.src })),
                      i.el)
                    ) {
                      for (var o = e.types, a = 0; a < o.length; a++)
                        if (i.el.hasClass('mfp-' + o[a])) {
                          r = o[a];
                          break;
                        }
                      (i.src = i.el.attr('data-mfp-src')),
                        i.src || (i.src = i.el.attr('href'));
                    }
                    return (
                      (i.type = r || e.st.type || 'inline'),
                      (i.index = n),
                      (i.parsed = !0),
                      (e.items[n] = i),
                      p('ElementParse', i),
                      e.items[n]
                    );
                  },
                  addGroup: function(t, n) {
                    var r = function(r) {
                      (r.mfpEl = this), e._openClick(r, t, n);
                    };
                    n || (n = {});
                    var i = 'click.magnificPopup';
                    (n.mainEl = t),
                      n.items
                        ? ((n.isObj = !0), t.off(i).on(i, r))
                        : ((n.isObj = !1),
                          n.delegate
                            ? t.off(i).on(i, n.delegate, r)
                            : ((n.items = t), t.off(i).on(i, r)));
                  },
                  _openClick: function(n, r, i) {
                    var o =
                      void 0 !== i.midClick
                        ? i.midClick
                        : t.magnificPopup.defaults.midClick;
                    if (
                      o ||
                      !(
                        2 === n.which ||
                        n.ctrlKey ||
                        n.metaKey ||
                        n.altKey ||
                        n.shiftKey
                      )
                    ) {
                      var a =
                        void 0 !== i.disableOn
                          ? i.disableOn
                          : t.magnificPopup.defaults.disableOn;
                      if (a)
                        if (t.isFunction(a)) {
                          if (!a.call(e)) return !0;
                        } else if (u.width() < a) return !0;
                      n.type &&
                        (n.preventDefault(), e.isOpen && n.stopPropagation()),
                        (i.el = t(n.mfpEl)),
                        i.delegate && (i.items = r.find(i.delegate)),
                        e.open(i);
                    }
                  },
                  updateStatus: function(t, r) {
                    if (e.preloader) {
                      n !== t && e.container.removeClass('mfp-s-' + n),
                        r || 'loading' !== t || (r = e.st.tLoading);
                      var i = { status: t, text: r };
                      p('UpdateStatus', i),
                        (t = i.status),
                        (r = i.text),
                        e.preloader.html(r),
                        e.preloader.find('a').on('click', function(t) {
                          t.stopImmediatePropagation();
                        }),
                        e.container.addClass('mfp-s-' + t),
                        (n = t);
                    }
                  },
                  _checkIfClose: function(n) {
                    if (!t(n).hasClass('mfp-prevent-close')) {
                      var r = e.st.closeOnContentClick,
                        i = e.st.closeOnBgClick;
                      if (r && i) return !0;
                      if (
                        !e.content ||
                        t(n).hasClass('mfp-close') ||
                        (e.preloader && n === e.preloader[0])
                      )
                        return !0;
                      if (n === e.content[0] || t.contains(e.content[0], n)) {
                        if (r) return !0;
                      } else if (i && t.contains(document, n)) return !0;
                      return !1;
                    }
                  },
                  _addClassToMFP: function(t) {
                    e.bgOverlay.addClass(t), e.wrap.addClass(t);
                  },
                  _removeClassFromMFP: function(t) {
                    this.bgOverlay.removeClass(t), e.wrap.removeClass(t);
                  },
                  _hasScrollBar: function(t) {
                    return (
                      (e.isIE7 ? i.height() : document.body.scrollHeight) >
                      (t || u.height())
                    );
                  },
                  _setFocus: function() {
                    (e.st.focus
                      ? e.content.find(e.st.focus).eq(0)
                      : e.wrap
                    ).focus();
                  },
                  _onFocusIn: function(n) {
                    if (
                      n.target !== e.wrap[0] &&
                      !t.contains(e.wrap[0], n.target)
                    )
                      return e._setFocus(), !1;
                  },
                  _parseMarkup: function(e, n, r) {
                    var i;
                    r.data && (n = t.extend(r.data, n)),
                      p('MarkupParse', [e, n, r]),
                      t.each(n, function(n, r) {
                        if (void 0 === r || !1 === r) return !0;
                        if ((i = n.split('_')).length > 1) {
                          var o = e.find('.mfp-' + i[0]);
                          if (o.length > 0) {
                            var a = i[1];
                            'replaceWith' === a
                              ? o[0] !== r[0] && o.replaceWith(r)
                              : 'img' === a
                              ? o.is('img')
                                ? o.attr('src', r)
                                : o.replaceWith(
                                    t('<img>')
                                      .attr('src', r)
                                      .attr('class', o.attr('class'))
                                  )
                              : o.attr(i[1], r);
                          }
                        } else e.find('.mfp-' + n).html(r);
                      });
                  },
                  _getScrollbarSize: function() {
                    if (void 0 === e.scrollbarSize) {
                      var t = document.createElement('div');
                      (t.style.cssText =
                        'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;'),
                        document.body.appendChild(t),
                        (e.scrollbarSize = t.offsetWidth - t.clientWidth),
                        document.body.removeChild(t);
                    }
                    return e.scrollbarSize;
                  }
                }),
                  (t.magnificPopup = {
                    instance: null,
                    proto: l.prototype,
                    modules: [],
                    open: function(e, n) {
                      return (
                        m(),
                        ((e = e ? t.extend(!0, {}, e) : {}).isObj = !0),
                        (e.index = n || 0),
                        this.instance.open(e)
                      );
                    },
                    close: function() {
                      return (
                        t.magnificPopup.instance &&
                        t.magnificPopup.instance.close()
                      );
                    },
                    registerModule: function(e, n) {
                      n.options && (t.magnificPopup.defaults[e] = n.options),
                        t.extend(this.proto, n.proto),
                        this.modules.push(e);
                    },
                    defaults: {
                      disableOn: 0,
                      key: null,
                      midClick: !1,
                      mainClass: '',
                      preloader: !0,
                      focus: '',
                      closeOnContentClick: !1,
                      closeOnBgClick: !0,
                      closeBtnInside: !0,
                      showCloseBtn: !0,
                      enableEscapeKey: !0,
                      modal: !1,
                      alignTop: !1,
                      removalDelay: 0,
                      prependTo: null,
                      fixedContentPos: 'auto',
                      fixedBgPos: 'auto',
                      overflowY: 'auto',
                      closeMarkup:
                        '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
                      tClose: 'Close (Esc)',
                      tLoading: 'Loading...',
                      autoFocusLast: !0
                    }
                  }),
                  (t.fn.magnificPopup = function(n) {
                    m();
                    var r = t(this);
                    if ('string' == typeof n)
                      if ('open' === n) {
                        var i,
                          o = c ? r.data('magnificPopup') : r[0].magnificPopup,
                          a = parseInt(arguments[1], 10) || 0;
                        o.items
                          ? (i = o.items[a])
                          : ((i = r),
                            o.delegate && (i = i.find(o.delegate)),
                            (i = i.eq(a))),
                          e._openClick({ mfpEl: i }, r, o);
                      } else
                        e.isOpen &&
                          e[n].apply(
                            e,
                            Array.prototype.slice.call(arguments, 1)
                          );
                    else
                      (n = t.extend(!0, {}, n)),
                        c
                          ? r.data('magnificPopup', n)
                          : (r[0].magnificPopup = n),
                        e.addGroup(r, n);
                    return r;
                  });
                var g,
                  v,
                  _,
                  y = function() {
                    _ && (v.after(_.addClass(g)).detach(), (_ = null));
                  };
                t.magnificPopup.registerModule('inline', {
                  options: {
                    hiddenClass: 'hide',
                    markup: '',
                    tNotFound: 'Content not found'
                  },
                  proto: {
                    initInline: function() {
                      e.types.push('inline'),
                        h('Close.inline', function() {
                          y();
                        });
                    },
                    getInline: function(n, r) {
                      if ((y(), n.src)) {
                        var i = e.st.inline,
                          o = t(n.src);
                        if (o.length) {
                          var a = o[0].parentNode;
                          a &&
                            a.tagName &&
                            (v ||
                              ((g = i.hiddenClass),
                              (v = f(g)),
                              (g = 'mfp-' + g)),
                            (_ = o
                              .after(v)
                              .detach()
                              .removeClass(g))),
                            e.updateStatus('ready');
                        } else
                          e.updateStatus('error', i.tNotFound),
                            (o = t('<div>'));
                        return (n.inlineElement = o), o;
                      }
                      return (
                        e.updateStatus('ready'), e._parseMarkup(r, {}, n), r
                      );
                    }
                  }
                });
                var b,
                  T = function() {
                    b && t(document.body).removeClass(b);
                  },
                  x = function() {
                    T(), e.req && e.req.abort();
                  };
                t.magnificPopup.registerModule('ajax', {
                  options: {
                    settings: null,
                    cursor: 'mfp-ajax-cur',
                    tError:
                      '<a href="%url%">The content</a> could not be loaded.'
                  },
                  proto: {
                    initAjax: function() {
                      e.types.push('ajax'),
                        (b = e.st.ajax.cursor),
                        h('Close.ajax', x),
                        h('BeforeChange.ajax', x);
                    },
                    getAjax: function(n) {
                      b && t(document.body).addClass(b),
                        e.updateStatus('loading');
                      var r = t.extend(
                        {
                          url: n.src,
                          success: function(r, i, o) {
                            var a = { data: r, xhr: o };
                            p('ParseAjax', a),
                              e.appendContent(t(a.data), 'ajax'),
                              (n.finished = !0),
                              T(),
                              e._setFocus(),
                              setTimeout(function() {
                                e.wrap.addClass('mfp-ready');
                              }, 16),
                              e.updateStatus('ready'),
                              p('AjaxContentAdded');
                          },
                          error: function() {
                            T(),
                              (n.finished = n.loadError = !0),
                              e.updateStatus(
                                'error',
                                e.st.ajax.tError.replace('%url%', n.src)
                              );
                          }
                        },
                        e.st.ajax.settings
                      );
                      return (e.req = t.ajax(r)), '';
                    }
                  }
                });
                var w,
                  E,
                  A = function(n) {
                    if (n.data && void 0 !== n.data.title) return n.data.title;
                    var r = e.st.image.titleSrc;
                    if (r) {
                      if (t.isFunction(r)) return r.call(e, n);
                      if (n.el) return n.el.attr(r) || '';
                    }
                    return '';
                  };
                t.magnificPopup.registerModule('image', {
                  options: {
                    markup:
                      '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
                    cursor: 'mfp-zoom-out-cur',
                    titleSrc: 'title',
                    verticalFit: !0,
                    tError: '<a href="%url%">The image</a> could not be loaded.'
                  },
                  proto: {
                    initImage: function() {
                      var n = e.st.image,
                        r = '.image';
                      e.types.push('image'),
                        h('Open' + r, function() {
                          'image' === e.currItem.type &&
                            n.cursor &&
                            t(document.body).addClass(n.cursor);
                        }),
                        h('Close' + r, function() {
                          n.cursor && t(document.body).removeClass(n.cursor),
                            u.off('resize.mfp');
                        }),
                        h('Resize' + r, e.resizeImage),
                        e.isLowIE && h('AfterChange', e.resizeImage);
                    },
                    resizeImage: function() {
                      var t = e.currItem;
                      if (t && t.img && e.st.image.verticalFit) {
                        var n = 0;
                        e.isLowIE &&
                          (n =
                            parseInt(t.img.css('padding-top'), 10) +
                            parseInt(t.img.css('padding-bottom'), 10)),
                          t.img.css('max-height', e.wH - n);
                      }
                    },
                    _onImageHasSize: function(t) {
                      t.img &&
                        ((t.hasSize = !0),
                        w && clearInterval(w),
                        (t.isCheckingImgSize = !1),
                        p('ImageHasSize', t),
                        t.imgHidden &&
                          (e.content && e.content.removeClass('mfp-loading'),
                          (t.imgHidden = !1)));
                    },
                    findImageSize: function(t) {
                      var n = 0,
                        r = t.img[0],
                        i = function(o) {
                          w && clearInterval(w),
                            (w = setInterval(function() {
                              r.naturalWidth > 0
                                ? e._onImageHasSize(t)
                                : (n > 200 && clearInterval(w),
                                  3 == ++n
                                    ? i(10)
                                    : 40 === n
                                    ? i(50)
                                    : 100 === n && i(500));
                            }, o));
                        };
                      i(1);
                    },
                    getImage: function(n, r) {
                      var i = 0,
                        o = function() {
                          n &&
                            (n.img[0].complete
                              ? (n.img.off('.mfploader'),
                                n === e.currItem &&
                                  (e._onImageHasSize(n),
                                  e.updateStatus('ready')),
                                (n.hasSize = !0),
                                (n.loaded = !0),
                                p('ImageLoadComplete'))
                              : ++i < 200
                              ? setTimeout(o, 100)
                              : a());
                        },
                        a = function() {
                          n &&
                            (n.img.off('.mfploader'),
                            n === e.currItem &&
                              (e._onImageHasSize(n),
                              e.updateStatus(
                                'error',
                                s.tError.replace('%url%', n.src)
                              )),
                            (n.hasSize = !0),
                            (n.loaded = !0),
                            (n.loadError = !0));
                        },
                        s = e.st.image,
                        l = r.find('.mfp-img');
                      if (l.length) {
                        var c = document.createElement('img');
                        (c.className = 'mfp-img'),
                          n.el &&
                            n.el.find('img').length &&
                            (c.alt = n.el.find('img').attr('alt')),
                          (n.img = t(c)
                            .on('load.mfploader', o)
                            .on('error.mfploader', a)),
                          (c.src = n.src),
                          l.is('img') && (n.img = n.img.clone()),
                          (c = n.img[0]).naturalWidth > 0
                            ? (n.hasSize = !0)
                            : c.width || (n.hasSize = !1);
                      }
                      return (
                        e._parseMarkup(
                          r,
                          { title: A(n), img_replaceWith: n.img },
                          n
                        ),
                        e.resizeImage(),
                        n.hasSize
                          ? (w && clearInterval(w),
                            n.loadError
                              ? (r.addClass('mfp-loading'),
                                e.updateStatus(
                                  'error',
                                  s.tError.replace('%url%', n.src)
                                ))
                              : (r.removeClass('mfp-loading'),
                                e.updateStatus('ready')),
                            r)
                          : (e.updateStatus('loading'),
                            (n.loading = !0),
                            n.hasSize ||
                              ((n.imgHidden = !0),
                              r.addClass('mfp-loading'),
                              e.findImageSize(n)),
                            r)
                      );
                    }
                  }
                }),
                  t.magnificPopup.registerModule('zoom', {
                    options: {
                      enabled: !1,
                      easing: 'ease-in-out',
                      duration: 300,
                      opener: function(t) {
                        return t.is('img') ? t : t.find('img');
                      }
                    },
                    proto: {
                      initZoom: function() {
                        var t,
                          n = e.st.zoom,
                          r = '.zoom';
                        if (n.enabled && e.supportsTransition) {
                          var i,
                            o,
                            a = n.duration,
                            s = function(t) {
                              var e = t
                                  .clone()
                                  .removeAttr('style')
                                  .removeAttr('class')
                                  .addClass('mfp-animated-image'),
                                r = 'all ' + n.duration / 1e3 + 's ' + n.easing,
                                i = {
                                  position: 'fixed',
                                  zIndex: 9999,
                                  left: 0,
                                  top: 0,
                                  '-webkit-backface-visibility': 'hidden'
                                },
                                o = 'transition';
                              return (
                                (i['-webkit-' + o] = i['-moz-' + o] = i[
                                  '-o-' + o
                                ] = i[o] = r),
                                e.css(i),
                                e
                              );
                            },
                            l = function() {
                              e.content.css('visibility', 'visible');
                            };
                          h('BuildControls' + r, function() {
                            if (e._allowZoom()) {
                              if (
                                (clearTimeout(i),
                                e.content.css('visibility', 'hidden'),
                                !(t = e._getItemToZoom()))
                              )
                                return void l();
                              (o = s(t)).css(e._getOffset()),
                                e.wrap.append(o),
                                (i = setTimeout(function() {
                                  o.css(e._getOffset(!0)),
                                    (i = setTimeout(function() {
                                      l(),
                                        setTimeout(function() {
                                          o.remove(),
                                            (t = o = null),
                                            p('ZoomAnimationEnded');
                                        }, 16);
                                    }, a));
                                }, 16));
                            }
                          }),
                            h('BeforeClose' + r, function() {
                              if (e._allowZoom()) {
                                if (
                                  (clearTimeout(i), (e.st.removalDelay = a), !t)
                                ) {
                                  if (!(t = e._getItemToZoom())) return;
                                  o = s(t);
                                }
                                o.css(e._getOffset(!0)),
                                  e.wrap.append(o),
                                  e.content.css('visibility', 'hidden'),
                                  setTimeout(function() {
                                    o.css(e._getOffset());
                                  }, 16);
                              }
                            }),
                            h('Close' + r, function() {
                              e._allowZoom() &&
                                (l(), o && o.remove(), (t = null));
                            });
                        }
                      },
                      _allowZoom: function() {
                        return 'image' === e.currItem.type;
                      },
                      _getItemToZoom: function() {
                        return !!e.currItem.hasSize && e.currItem.img;
                      },
                      _getOffset: function(n) {
                        var r,
                          i = (r = n
                            ? e.currItem.img
                            : e.st.zoom.opener(
                                e.currItem.el || e.currItem
                              )).offset(),
                          o = parseInt(r.css('padding-top'), 10),
                          a = parseInt(r.css('padding-bottom'), 10);
                        i.top -= t(window).scrollTop() - o;
                        var s = {
                          width: r.width(),
                          height:
                            (c ? r.innerHeight() : r[0].offsetHeight) - a - o
                        };
                        return (
                          void 0 === E &&
                            (E =
                              void 0 !==
                              document.createElement('p').style.MozTransform),
                          E
                            ? (s['-moz-transform'] = s.transform =
                                'translate(' + i.left + 'px,' + i.top + 'px)')
                            : ((s.left = i.left), (s.top = i.top)),
                          s
                        );
                      }
                    }
                  });
                var C = function(t) {
                  if (e.currTemplate.iframe) {
                    var n = e.currTemplate.iframe.find('iframe');
                    n.length &&
                      (t || (n[0].src = '//about:blank'),
                      e.isIE8 && n.css('display', t ? 'block' : 'none'));
                  }
                };
                t.magnificPopup.registerModule('iframe', {
                  options: {
                    markup:
                      '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
                    srcAction: 'iframe_src',
                    patterns: {
                      youtube: {
                        index: 'youtube.com',
                        id: 'v=',
                        src: '//www.youtube.com/embed/%id%?autoplay=1'
                      },
                      vimeo: {
                        index: 'vimeo.com/',
                        id: '/',
                        src: '//player.vimeo.com/video/%id%?autoplay=1'
                      },
                      gmaps: {
                        index: '//maps.google.',
                        src: '%id%&output=embed'
                      }
                    }
                  },
                  proto: {
                    initIframe: function() {
                      e.types.push('iframe'),
                        h('BeforeChange', function(t, e, n) {
                          e !== n &&
                            ('iframe' === e ? C() : 'iframe' === n && C(!0));
                        }),
                        h('Close.iframe', function() {
                          C();
                        });
                    },
                    getIframe: function(n, r) {
                      var i = n.src,
                        o = e.st.iframe;
                      t.each(o.patterns, function() {
                        if (i.indexOf(this.index) > -1)
                          return (
                            this.id &&
                              (i =
                                'string' == typeof this.id
                                  ? i.substr(
                                      i.lastIndexOf(this.id) + this.id.length,
                                      i.length
                                    )
                                  : this.id.call(this, i)),
                            (i = this.src.replace('%id%', i)),
                            !1
                          );
                      });
                      var a = {};
                      return (
                        o.srcAction && (a[o.srcAction] = i),
                        e._parseMarkup(r, a, n),
                        e.updateStatus('ready'),
                        r
                      );
                    }
                  }
                });
                var P = function(t) {
                    var n = e.items.length;
                    return t > n - 1 ? t - n : t < 0 ? n + t : t;
                  },
                  R = function(t, e, n) {
                    return t.replace(/%curr%/gi, e + 1).replace(/%total%/gi, n);
                  };
                t.magnificPopup.registerModule('gallery', {
                  options: {
                    enabled: !1,
                    arrowMarkup:
                      '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
                    preload: [0, 2],
                    navigateByImgClick: !0,
                    arrows: !0,
                    tPrev: 'Previous (Left arrow key)',
                    tNext: 'Next (Right arrow key)',
                    tCounter: '%curr% of %total%'
                  },
                  proto: {
                    initGallery: function() {
                      var n = e.st.gallery,
                        r = '.mfp-gallery';
                      if (((e.direction = !0), !n || !n.enabled)) return !1;
                      (a += ' mfp-gallery'),
                        h('Open' + r, function() {
                          n.navigateByImgClick &&
                            e.wrap.on('click' + r, '.mfp-img', function() {
                              if (e.items.length > 1) return e.next(), !1;
                            }),
                            i.on('keydown' + r, function(t) {
                              37 === t.keyCode
                                ? e.prev()
                                : 39 === t.keyCode && e.next();
                            });
                        }),
                        h('UpdateStatus' + r, function(t, n) {
                          n.text &&
                            (n.text = R(
                              n.text,
                              e.currItem.index,
                              e.items.length
                            ));
                        }),
                        h('MarkupParse' + r, function(t, r, i, o) {
                          var a = e.items.length;
                          i.counter = a > 1 ? R(n.tCounter, o.index, a) : '';
                        }),
                        h('BuildControls' + r, function() {
                          if (e.items.length > 1 && n.arrows && !e.arrowLeft) {
                            var r = n.arrowMarkup,
                              i = (e.arrowLeft = t(
                                r
                                  .replace(/%title%/gi, n.tPrev)
                                  .replace(/%dir%/gi, 'left')
                              ).addClass('mfp-prevent-close')),
                              o = (e.arrowRight = t(
                                r
                                  .replace(/%title%/gi, n.tNext)
                                  .replace(/%dir%/gi, 'right')
                              ).addClass('mfp-prevent-close'));
                            i.click(function() {
                              e.prev();
                            }),
                              o.click(function() {
                                e.next();
                              }),
                              e.container.append(i.add(o));
                          }
                        }),
                        h('Change' + r, function() {
                          e._preloadTimeout && clearTimeout(e._preloadTimeout),
                            (e._preloadTimeout = setTimeout(function() {
                              e.preloadNearbyImages(),
                                (e._preloadTimeout = null);
                            }, 16));
                        }),
                        h('Close' + r, function() {
                          i.off(r),
                            e.wrap.off('click' + r),
                            (e.arrowRight = e.arrowLeft = null);
                        });
                    },
                    next: function() {
                      (e.direction = !0),
                        (e.index = P(e.index + 1)),
                        e.updateItemHTML();
                    },
                    prev: function() {
                      (e.direction = !1),
                        (e.index = P(e.index - 1)),
                        e.updateItemHTML();
                    },
                    goTo: function(t) {
                      (e.direction = t >= e.index),
                        (e.index = t),
                        e.updateItemHTML();
                    },
                    preloadNearbyImages: function() {
                      var t,
                        n = e.st.gallery.preload,
                        r = Math.min(n[0], e.items.length),
                        i = Math.min(n[1], e.items.length);
                      for (t = 1; t <= (e.direction ? i : r); t++)
                        e._preloadItem(e.index + t);
                      for (t = 1; t <= (e.direction ? r : i); t++)
                        e._preloadItem(e.index - t);
                    },
                    _preloadItem: function(n) {
                      if (((n = P(n)), !e.items[n].preloaded)) {
                        var r = e.items[n];
                        r.parsed || (r = e.parseEl(n)),
                          p('LazyLoad', r),
                          'image' === r.type &&
                            (r.img = t('<img class="mfp-img" />')
                              .on('load.mfploader', function() {
                                r.hasSize = !0;
                              })
                              .on('error.mfploader', function() {
                                (r.hasSize = !0),
                                  (r.loadError = !0),
                                  p('LazyLoadError', r);
                              })
                              .attr('src', r.src)),
                          (r.preloaded = !0);
                      }
                    }
                  }
                }),
                  t.magnificPopup.registerModule('retina', {
                    options: {
                      replaceSrc: function(t) {
                        return t.src.replace(/\.\w+$/, function(t) {
                          return '@2x' + t;
                        });
                      },
                      ratio: 1
                    },
                    proto: {
                      initRetina: function() {
                        if (window.devicePixelRatio > 1) {
                          var t = e.st.retina,
                            n = t.ratio;
                          (n = isNaN(n) ? n() : n) > 1 &&
                            (h('ImageHasSize.retina', function(t, e) {
                              e.img.css({
                                'max-width': e.img[0].naturalWidth / n,
                                width: '100%'
                              });
                            }),
                            h('ElementParse.retina', function(e, r) {
                              r.src = t.replaceSrc(r, n);
                            }));
                        }
                      }
                    }
                  }),
                  m();
              })
                ? i.apply(e, o)
                : i) || (t.exports = a);
      }.call(this, n('EVdn')));
    },
    Ytbt: function(t, e, n) {
      'use strict';
      var r = n('QM7d'),
        i = { body: '', args: [], thisVars: [], localVars: [] };
      function o(t) {
        if (!t) return i;
        for (var e = 0; e < t.args.length; ++e) {
          var n = t.args[e];
          t.args[e] =
            0 === e
              ? { name: n, lvalue: !0, rvalue: !!t.rvalue, count: t.count || 1 }
              : { name: n, lvalue: !1, rvalue: !0, count: 1 };
        }
        return (
          t.thisVars || (t.thisVars = []), t.localVars || (t.localVars = []), t
        );
      }
      function a(t) {
        for (var e = [], n = 0; n < t.args.length; ++n) e.push('a' + n);
        return new Function(
          'P',
          [
            'return function ',
            t.funcName,
            '_ndarrayops(',
            e.join(','),
            ') {P(',
            e.join(','),
            ');return a0}'
          ].join('')
        )(
          (function(t) {
            return r({
              args: t.args,
              pre: o(t.pre),
              body: o(t.body),
              post: o(t.proc),
              funcName: t.funcName
            });
          })(t)
        );
      }
      var s = {
        add: '+',
        sub: '-',
        mul: '*',
        div: '/',
        mod: '%',
        band: '&',
        bor: '|',
        bxor: '^',
        lshift: '<<',
        rshift: '>>',
        rrshift: '>>>'
      };
      !(function() {
        for (var t in s) {
          var n = s[t];
          (e[t] = a({
            args: ['array', 'array', 'array'],
            body: { args: ['a', 'b', 'c'], body: 'a=b' + n + 'c' },
            funcName: t
          })),
            (e[t + 'eq'] = a({
              args: ['array', 'array'],
              body: { args: ['a', 'b'], body: 'a' + n + '=b' },
              rvalue: !0,
              funcName: t + 'eq'
            })),
            (e[t + 's'] = a({
              args: ['array', 'array', 'scalar'],
              body: { args: ['a', 'b', 's'], body: 'a=b' + n + 's' },
              funcName: t + 's'
            })),
            (e[t + 'seq'] = a({
              args: ['array', 'scalar'],
              body: { args: ['a', 's'], body: 'a' + n + '=s' },
              rvalue: !0,
              funcName: t + 'seq'
            }));
        }
      })();
      var l = { not: '!', bnot: '~', neg: '-', recip: '1.0/' };
      !(function() {
        for (var t in l) {
          var n = l[t];
          (e[t] = a({
            args: ['array', 'array'],
            body: { args: ['a', 'b'], body: 'a=' + n + 'b' },
            funcName: t
          })),
            (e[t + 'eq'] = a({
              args: ['array'],
              body: { args: ['a'], body: 'a=' + n + 'a' },
              rvalue: !0,
              count: 2,
              funcName: t + 'eq'
            }));
        }
      })();
      var c = {
        and: '&&',
        or: '||',
        eq: '===',
        neq: '!==',
        lt: '<',
        gt: '>',
        leq: '<=',
        geq: '>='
      };
      !(function() {
        for (var t in c) {
          var n = c[t];
          (e[t] = a({
            args: ['array', 'array', 'array'],
            body: { args: ['a', 'b', 'c'], body: 'a=b' + n + 'c' },
            funcName: t
          })),
            (e[t + 's'] = a({
              args: ['array', 'array', 'scalar'],
              body: { args: ['a', 'b', 's'], body: 'a=b' + n + 's' },
              funcName: t + 's'
            })),
            (e[t + 'eq'] = a({
              args: ['array', 'array'],
              body: { args: ['a', 'b'], body: 'a=a' + n + 'b' },
              rvalue: !0,
              count: 2,
              funcName: t + 'eq'
            })),
            (e[t + 'seq'] = a({
              args: ['array', 'scalar'],
              body: { args: ['a', 's'], body: 'a=a' + n + 's' },
              rvalue: !0,
              count: 2,
              funcName: t + 'seq'
            }));
        }
      })();
      var u = [
        'abs',
        'acos',
        'asin',
        'atan',
        'ceil',
        'cos',
        'exp',
        'floor',
        'log',
        'round',
        'sin',
        'sqrt',
        'tan'
      ];
      !(function() {
        for (var t = 0; t < u.length; ++t) {
          var n = u[t];
          (e[n] = a({
            args: ['array', 'array'],
            pre: { args: [], body: 'this_f=Math.' + n, thisVars: ['this_f'] },
            body: {
              args: ['a', 'b'],
              body: 'a=this_f(b)',
              thisVars: ['this_f']
            },
            funcName: n
          })),
            (e[n + 'eq'] = a({
              args: ['array'],
              pre: { args: [], body: 'this_f=Math.' + n, thisVars: ['this_f'] },
              body: { args: ['a'], body: 'a=this_f(a)', thisVars: ['this_f'] },
              rvalue: !0,
              count: 2,
              funcName: n + 'eq'
            }));
        }
      })();
      var h = ['max', 'min', 'atan2', 'pow'];
      !(function() {
        for (var t = 0; t < h.length; ++t) {
          var n = h[t];
          (e[n] = a({
            args: ['array', 'array', 'array'],
            pre: { args: [], body: 'this_f=Math.' + n, thisVars: ['this_f'] },
            body: {
              args: ['a', 'b', 'c'],
              body: 'a=this_f(b,c)',
              thisVars: ['this_f']
            },
            funcName: n
          })),
            (e[n + 's'] = a({
              args: ['array', 'array', 'scalar'],
              pre: { args: [], body: 'this_f=Math.' + n, thisVars: ['this_f'] },
              body: {
                args: ['a', 'b', 'c'],
                body: 'a=this_f(b,c)',
                thisVars: ['this_f']
              },
              funcName: n + 's'
            })),
            (e[n + 'eq'] = a({
              args: ['array', 'array'],
              pre: { args: [], body: 'this_f=Math.' + n, thisVars: ['this_f'] },
              body: {
                args: ['a', 'b'],
                body: 'a=this_f(a,b)',
                thisVars: ['this_f']
              },
              rvalue: !0,
              count: 2,
              funcName: n + 'eq'
            })),
            (e[n + 'seq'] = a({
              args: ['array', 'scalar'],
              pre: { args: [], body: 'this_f=Math.' + n, thisVars: ['this_f'] },
              body: {
                args: ['a', 'b'],
                body: 'a=this_f(a,b)',
                thisVars: ['this_f']
              },
              rvalue: !0,
              count: 2,
              funcName: n + 'seq'
            }));
        }
      })();
      var f = ['atan2', 'pow'];
      !(function() {
        for (var t = 0; t < f.length; ++t) {
          var n = f[t];
          (e[n + 'op'] = a({
            args: ['array', 'array', 'array'],
            pre: { args: [], body: 'this_f=Math.' + n, thisVars: ['this_f'] },
            body: {
              args: ['a', 'b', 'c'],
              body: 'a=this_f(c,b)',
              thisVars: ['this_f']
            },
            funcName: n + 'op'
          })),
            (e[n + 'ops'] = a({
              args: ['array', 'array', 'scalar'],
              pre: { args: [], body: 'this_f=Math.' + n, thisVars: ['this_f'] },
              body: {
                args: ['a', 'b', 'c'],
                body: 'a=this_f(c,b)',
                thisVars: ['this_f']
              },
              funcName: n + 'ops'
            })),
            (e[n + 'opeq'] = a({
              args: ['array', 'array'],
              pre: { args: [], body: 'this_f=Math.' + n, thisVars: ['this_f'] },
              body: {
                args: ['a', 'b'],
                body: 'a=this_f(b,a)',
                thisVars: ['this_f']
              },
              rvalue: !0,
              count: 2,
              funcName: n + 'opeq'
            })),
            (e[n + 'opseq'] = a({
              args: ['array', 'scalar'],
              pre: { args: [], body: 'this_f=Math.' + n, thisVars: ['this_f'] },
              body: {
                args: ['a', 'b'],
                body: 'a=this_f(b,a)',
                thisVars: ['this_f']
              },
              rvalue: !0,
              count: 2,
              funcName: n + 'opseq'
            }));
        }
      })(),
        (e.any = r({
          args: ['array'],
          pre: i,
          body: {
            args: [{ name: 'a', lvalue: !1, rvalue: !0, count: 1 }],
            body: 'if(a){return true}',
            localVars: [],
            thisVars: []
          },
          post: { args: [], localVars: [], thisVars: [], body: 'return false' },
          funcName: 'any'
        })),
        (e.all = r({
          args: ['array'],
          pre: i,
          body: {
            args: [{ name: 'x', lvalue: !1, rvalue: !0, count: 1 }],
            body: 'if(!x){return false}',
            localVars: [],
            thisVars: []
          },
          post: { args: [], localVars: [], thisVars: [], body: 'return true' },
          funcName: 'all'
        })),
        (e.sum = r({
          args: ['array'],
          pre: {
            args: [],
            localVars: [],
            thisVars: ['this_s'],
            body: 'this_s=0'
          },
          body: {
            args: [{ name: 'a', lvalue: !1, rvalue: !0, count: 1 }],
            body: 'this_s+=a',
            localVars: [],
            thisVars: ['this_s']
          },
          post: {
            args: [],
            localVars: [],
            thisVars: ['this_s'],
            body: 'return this_s'
          },
          funcName: 'sum'
        })),
        (e.prod = r({
          args: ['array'],
          pre: {
            args: [],
            localVars: [],
            thisVars: ['this_s'],
            body: 'this_s=1'
          },
          body: {
            args: [{ name: 'a', lvalue: !1, rvalue: !0, count: 1 }],
            body: 'this_s*=a',
            localVars: [],
            thisVars: ['this_s']
          },
          post: {
            args: [],
            localVars: [],
            thisVars: ['this_s'],
            body: 'return this_s'
          },
          funcName: 'prod'
        })),
        (e.norm2squared = r({
          args: ['array'],
          pre: {
            args: [],
            localVars: [],
            thisVars: ['this_s'],
            body: 'this_s=0'
          },
          body: {
            args: [{ name: 'a', lvalue: !1, rvalue: !0, count: 2 }],
            body: 'this_s+=a*a',
            localVars: [],
            thisVars: ['this_s']
          },
          post: {
            args: [],
            localVars: [],
            thisVars: ['this_s'],
            body: 'return this_s'
          },
          funcName: 'norm2squared'
        })),
        (e.norm2 = r({
          args: ['array'],
          pre: {
            args: [],
            localVars: [],
            thisVars: ['this_s'],
            body: 'this_s=0'
          },
          body: {
            args: [{ name: 'a', lvalue: !1, rvalue: !0, count: 2 }],
            body: 'this_s+=a*a',
            localVars: [],
            thisVars: ['this_s']
          },
          post: {
            args: [],
            localVars: [],
            thisVars: ['this_s'],
            body: 'return Math.sqrt(this_s)'
          },
          funcName: 'norm2'
        })),
        (e.norminf = r({
          args: ['array'],
          pre: {
            args: [],
            localVars: [],
            thisVars: ['this_s'],
            body: 'this_s=0'
          },
          body: {
            args: [{ name: 'a', lvalue: !1, rvalue: !0, count: 4 }],
            body: 'if(-a>this_s){this_s=-a}else if(a>this_s){this_s=a}',
            localVars: [],
            thisVars: ['this_s']
          },
          post: {
            args: [],
            localVars: [],
            thisVars: ['this_s'],
            body: 'return this_s'
          },
          funcName: 'norminf'
        })),
        (e.norm1 = r({
          args: ['array'],
          pre: {
            args: [],
            localVars: [],
            thisVars: ['this_s'],
            body: 'this_s=0'
          },
          body: {
            args: [{ name: 'a', lvalue: !1, rvalue: !0, count: 3 }],
            body: 'this_s+=a<0?-a:a',
            localVars: [],
            thisVars: ['this_s']
          },
          post: {
            args: [],
            localVars: [],
            thisVars: ['this_s'],
            body: 'return this_s'
          },
          funcName: 'norm1'
        })),
        (e.sup = r({
          args: ['array'],
          pre: {
            body: 'this_h=-Infinity',
            args: [],
            thisVars: ['this_h'],
            localVars: []
          },
          body: {
            body: 'if(_inline_1_arg0_>this_h)this_h=_inline_1_arg0_',
            args: [
              { name: '_inline_1_arg0_', lvalue: !1, rvalue: !0, count: 2 }
            ],
            thisVars: ['this_h'],
            localVars: []
          },
          post: {
            body: 'return this_h',
            args: [],
            thisVars: ['this_h'],
            localVars: []
          }
        })),
        (e.inf = r({
          args: ['array'],
          pre: {
            body: 'this_h=Infinity',
            args: [],
            thisVars: ['this_h'],
            localVars: []
          },
          body: {
            body: 'if(_inline_1_arg0_<this_h)this_h=_inline_1_arg0_',
            args: [
              { name: '_inline_1_arg0_', lvalue: !1, rvalue: !0, count: 2 }
            ],
            thisVars: ['this_h'],
            localVars: []
          },
          post: {
            body: 'return this_h',
            args: [],
            thisVars: ['this_h'],
            localVars: []
          }
        })),
        (e.argmin = r({
          args: ['index', 'array', 'shape'],
          pre: {
            body: '{this_v=Infinity;this_i=_inline_0_arg2_.slice(0)}',
            args: [
              { name: '_inline_0_arg0_', lvalue: !1, rvalue: !1, count: 0 },
              { name: '_inline_0_arg1_', lvalue: !1, rvalue: !1, count: 0 },
              { name: '_inline_0_arg2_', lvalue: !1, rvalue: !0, count: 1 }
            ],
            thisVars: ['this_i', 'this_v'],
            localVars: []
          },
          body: {
            body:
              '{if(_inline_1_arg1_<this_v){this_v=_inline_1_arg1_;for(var _inline_1_k=0;_inline_1_k<_inline_1_arg0_.length;++_inline_1_k){this_i[_inline_1_k]=_inline_1_arg0_[_inline_1_k]}}}',
            args: [
              { name: '_inline_1_arg0_', lvalue: !1, rvalue: !0, count: 2 },
              { name: '_inline_1_arg1_', lvalue: !1, rvalue: !0, count: 2 }
            ],
            thisVars: ['this_i', 'this_v'],
            localVars: ['_inline_1_k']
          },
          post: {
            body: '{return this_i}',
            args: [],
            thisVars: ['this_i'],
            localVars: []
          }
        })),
        (e.argmax = r({
          args: ['index', 'array', 'shape'],
          pre: {
            body: '{this_v=-Infinity;this_i=_inline_0_arg2_.slice(0)}',
            args: [
              { name: '_inline_0_arg0_', lvalue: !1, rvalue: !1, count: 0 },
              { name: '_inline_0_arg1_', lvalue: !1, rvalue: !1, count: 0 },
              { name: '_inline_0_arg2_', lvalue: !1, rvalue: !0, count: 1 }
            ],
            thisVars: ['this_i', 'this_v'],
            localVars: []
          },
          body: {
            body:
              '{if(_inline_1_arg1_>this_v){this_v=_inline_1_arg1_;for(var _inline_1_k=0;_inline_1_k<_inline_1_arg0_.length;++_inline_1_k){this_i[_inline_1_k]=_inline_1_arg0_[_inline_1_k]}}}',
            args: [
              { name: '_inline_1_arg0_', lvalue: !1, rvalue: !0, count: 2 },
              { name: '_inline_1_arg1_', lvalue: !1, rvalue: !0, count: 2 }
            ],
            thisVars: ['this_i', 'this_v'],
            localVars: ['_inline_1_k']
          },
          post: {
            body: '{return this_i}',
            args: [],
            thisVars: ['this_i'],
            localVars: []
          }
        })),
        (e.random = a({
          args: ['array'],
          pre: { args: [], body: 'this_f=Math.random', thisVars: ['this_f'] },
          body: { args: ['a'], body: 'a=this_f()', thisVars: ['this_f'] },
          funcName: 'random'
        })),
        (e.assign = a({
          args: ['array', 'array'],
          body: { args: ['a', 'b'], body: 'a=b' },
          funcName: 'assign'
        })),
        (e.assigns = a({
          args: ['array', 'scalar'],
          body: { args: ['a', 'b'], body: 'a=b' },
          funcName: 'assigns'
        })),
        (e.equals = r({
          args: ['array', 'array'],
          pre: i,
          body: {
            args: [
              { name: 'x', lvalue: !1, rvalue: !0, count: 1 },
              { name: 'y', lvalue: !1, rvalue: !0, count: 1 }
            ],
            body: 'if(x!==y){return false}',
            localVars: [],
            thisVars: []
          },
          post: { args: [], localVars: [], thisVars: [], body: 'return true' },
          funcName: 'equals'
        }));
    },
    YuTi: function(t, e) {
      t.exports = function(t) {
        return (
          t.webpackPolyfill ||
            ((t.deprecate = function() {}),
            (t.paths = []),
            t.children || (t.children = []),
            Object.defineProperty(t, 'loaded', {
              enumerable: !0,
              get: function() {
                return t.l;
              }
            }),
            Object.defineProperty(t, 'id', {
              enumerable: !0,
              get: function() {
                return t.i;
              }
            }),
            (t.webpackPolyfill = 1)),
          t
        );
      };
    },
    ZkmD: function(t, e, n) {
      var r = n('szI9');
      t.exports = function() {
        var t = {};
        return function(e) {
          if (('object' != typeof e || null === e) && 'function' != typeof e)
            throw new Error('Weakmap-shim: Key must be object');
          var n = e.valueOf(t);
          return n && n.identity === t ? n : r(e, t);
        };
      };
    },
    aiXG: function(t, e) {
      t.exports = [
        '<<=',
        '>>=',
        '++',
        '--',
        '<<',
        '>>',
        '<=',
        '>=',
        '==',
        '!=',
        '&&',
        '||',
        '+=',
        '-=',
        '*=',
        '/=',
        '%=',
        '&=',
        '^^',
        '^=',
        '|=',
        '(',
        ')',
        '[',
        ']',
        '.',
        '!',
        '~',
        '*',
        '/',
        '%',
        '+',
        '-',
        '<',
        '>',
        '&',
        '^',
        '|',
        '?',
        ':',
        '=',
        ',',
        ';',
        '{',
        '}'
      ];
    },
    cS2A: function(t, e, n) {
      'use strict';
      n.d(e, 'a', function() {
        return i;
      });
      var r = n('f26Q'),
        i = function() {
          var t,
            e = document.body.classList.contains('ext-video'),
            n = document.body.classList.contains('has-video');
          if (n) {
            var i = document.createElement('script');
            i.src = 'https://www.youtube.com/player_api';
            var o = document.getElementsByTagName('script')[0];
            o.parentNode.insertBefore(i, o);
          }
          var a,
            s = {
              autoplay: 0,
              autohide: 1,
              modestbranding: 1,
              rel: 0,
              showinfo: 0,
              controls: 1,
              disablekb: 1,
              enablejsapi: 0,
              iv_load_policy: 3,
              fs: 0
            },
            l = !1,
            c = 'video-fullscreen';
          function u() {
            return document.getElementById(c);
          }
          var h = document.querySelector('.l-header__play-button');
          if (!e) {
            var f = h.getAttribute('href').match(/watch\?v=(.*)$/);
            a = { videoId: f[1], suggestedQuality: 'hd720' };
          }
          function p() {
            t.loadVideoById(a);
          }
          function d(t) {}
          function m(t) {
            t.requestFullScreen
              ? t.requestFullScreen()
              : t.mozRequestFullScreen
              ? t.mozRequestFullScreen()
              : t.webkitRequestFullScreen
              ? t.webkitRequestFullScreen()
              : t.msRequestFullScreen && t.msRequestFullScreen();
          }
          function g() {
            (null !== document.fullscreenElement &&
              null !== document.mozFullScreenElement &&
              null !== document.webkitFullscreenElement &&
              null !== document.msFullscreenElement) ||
              (t ? (t.pauseVideo(), t.seekTo(0)) : (u().innerHTML = ''));
          }
          function v() {
            l &&
              (t
                ? t.playVideo
                : (t = new YT.Player(c, {
                    events: { onReady: p, onStateChange: d },
                    playerVars: s
                  })),
              m(u()));
          }
          (window.onYouTubeIframeAPIReady = function() {
            Object(r.h)() || e || (l = !0);
          }),
            (window.playYouTube = v),
            (document.onfullscreenchange = g),
            (document.onmozfullscreenchange = g),
            (document.onwebkitfullscreenchange = g),
            (document.onmsfullscreenchange = g),
            h.addEventListener('click', function(t) {
              if (n && !Object(r.h)())
                if (e) {
                  var i = h.getAttribute('href');
                  if (/twitch.tv/.test(i)) return;
                  t.preventDefault(),
                    (u().innerHTML = '<iframe frameborder="0" src="'.concat(
                      i,
                      '" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>'
                    )),
                    m(u());
                } else {
                  if ((t.preventDefault(), CDPRED.ageGate)) return;
                  v();
                }
            });
        };
    },
    'cd9/': function(t, e, n) {},
    f26Q: function(t, e, n) {
      'use strict';
      function r() {
        var t = window.navigator.userAgent,
          e = t.indexOf('MSIE ');
        if (e > 0) return parseInt(t.substring(e + 5, t.indexOf('.', e)), 10);
        if (t.indexOf('Trident/') > 0) {
          var n = t.indexOf('rv:');
          return parseInt(t.substring(n + 3, t.indexOf('.', n)), 10);
        }
        var r = t.indexOf('Edge/');
        return r > 0 && parseInt(t.substring(r + 5, t.indexOf('.', r)), 10);
      }
      function i(t, e, n) {
        var r;
        if (n) {
          var i = new Date();
          i.setTime(i.getTime() + 24 * n * 60 * 60 * 1e3),
            (r = '; expires=' + i.toUTCString());
        } else r = '';
        document.cookie = t + '=' + e + r + '; path=/';
      }
      function o(t) {
        for (
          var e = t + '=', n = document.cookie.split(';'), r = 0;
          r < n.length;
          r++
        ) {
          for (var i = n[r]; ' ' === i.charAt(0); )
            i = i.substring(1, i.length);
          if (0 === i.indexOf(e)) return i.substring(e.length, i.length);
        }
        return null;
      }
      function a(t) {
        document.cookie =
          t + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;';
      }
      function s(t) {
        var e, n;
        for (e = 1, n = arguments.length; e < n; e++)
          if (void 0 === (t = t[arguments[e]])) return !1;
        return !0;
      }
      function l(t, e) {
        for (
          Element.prototype.matches ||
          (Element.prototype.matches =
            Element.prototype.matchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector ||
            Element.prototype.oMatchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            function(t) {
              for (
                var e = (this.document || this.ownerDocument).querySelectorAll(
                    t
                  ),
                  n = e.length;
                --n >= 0 && e.item(n) !== this;

              );
              return n > -1;
            });
          t && t !== document;
          t = t.parentNode
        )
          if (t.matches(e)) return t;
        return null;
      }
      function c(t, e) {
        var n = null;
        return function() {
          var r = this,
            i = arguments;
          clearTimeout(n),
            (n = setTimeout(function() {
              t.apply(r, i);
            }, e));
        };
      }
      function u() {
        var t,
          e = !1;
        return (
          (t = navigator.userAgent || navigator.vendor || window.opera),
          (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
            t
          ) ||
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
              t.substr(0, 4)
            )) &&
            (e = !0),
          e
        );
      }
      n.d(e, 'e', function() {
        return r;
      }),
        n.d(e, 'b', function() {
          return i;
        }),
        n.d(e, 'i', function() {
          return o;
        }),
        n.d(e, 'd', function() {
          return a;
        }),
        n.d(e, 'a', function() {
          return s;
        }),
        n.d(e, 'f', function() {
          return l;
        }),
        n.d(e, 'c', function() {
          return c;
        }),
        n.d(e, 'h', function() {
          return u;
        }),
        n.d(e, 'g', function() {
          return h;
        });
      var h = function(t) {
        return t.split('=')[1];
      };
    },
    fpEm: function(t, e, n) {
      'use strict';
      t.exports = function(t, e, n, i) {
        for (var o = {}, l = 0, c = n.length; l < c; ++l) {
          var u = n[l],
            h = u.name,
            f = u.type,
            p = u.locations;
          switch (f) {
            case 'bool':
            case 'int':
            case 'float':
              a(t, e, p[0], i, 1, o, h);
              break;
            default:
              if (f.indexOf('vec') >= 0) {
                var d = f.charCodeAt(f.length - 1) - 48;
                if (d < 2 || d > 4)
                  throw new r(
                    '',
                    'Invalid data type for attribute ' + h + ': ' + f
                  );
                a(t, e, p[0], i, d, o, h);
              } else {
                if (!(f.indexOf('mat') >= 0))
                  throw new r(
                    '',
                    'Unknown data type for attribute ' + h + ': ' + f
                  );
                var d = f.charCodeAt(f.length - 1) - 48;
                if (d < 2 || d > 4)
                  throw new r(
                    '',
                    'Invalid data type for attribute ' + h + ': ' + f
                  );
                s(t, e, p, i, d, o, h);
              }
          }
        }
        return o;
      };
      var r = n('o/2B');
      function i(t, e, n, r, i, o) {
        (this._gl = t),
          (this._wrapper = e),
          (this._index = n),
          (this._locations = r),
          (this._dimension = i),
          (this._constFunc = o);
      }
      var o = i.prototype;
      function a(t, e, n, r, o, a, s) {
        for (var l = ['gl', 'v'], c = [], u = 0; u < o; ++u)
          l.push('x' + u), c.push('x' + u);
        l.push(
          'if(x0.length===void 0){return gl.vertexAttrib' +
            o +
            'f(v,' +
            c.join() +
            ')}else{return gl.vertexAttrib' +
            o +
            'fv(v,x0)}'
        );
        var h = Function.apply(null, l),
          f = new i(t, e, n, r, o, h);
        Object.defineProperty(a, s, {
          set: function(e) {
            return t.disableVertexAttribArray(r[n]), h(t, r[n], e), e;
          },
          get: function() {
            return f;
          },
          enumerable: !0
        });
      }
      function s(t, e, n, r, i, o, s) {
        for (var l = new Array(i), c = new Array(i), u = 0; u < i; ++u)
          a(t, e, n[u], r, i, l, u), (c[u] = l[u]);
        Object.defineProperty(l, 'location', {
          set: function(t) {
            if (Array.isArray(t))
              for (var e = 0; e < i; ++e) c[e].location = t[e];
            else for (e = 0; e < i; ++e) c[e].location = t + e;
            return t;
          },
          get: function() {
            for (var t = new Array(i), e = 0; e < i; ++e) t[e] = r[n[e]];
            return t;
          },
          enumerable: !0
        }),
          (l.pointer = function(e, o, a, s) {
            (e = e || t.FLOAT), (o = !!o), (a = a || i * i), (s = s || 0);
            for (var l = 0; l < i; ++l) {
              var c = r[n[l]];
              t.vertexAttribPointer(c, i, e, o, a, s + l * i),
                t.enableVertexAttribArray(c);
            }
          });
        var h = new Array(i),
          f = t['vertexAttrib' + i + 'fv'];
        Object.defineProperty(o, s, {
          set: function(e) {
            for (var o = 0; o < i; ++o) {
              var a = r[n[o]];
              if ((t.disableVertexAttribArray(a), Array.isArray(e[0])))
                f.call(t, a, e[o]);
              else {
                for (var s = 0; s < i; ++s) h[s] = e[i * o + s];
                f.call(t, a, h);
              }
            }
            return e;
          },
          get: function() {
            return l;
          },
          enumerable: !0
        });
      }
      (o.pointer = function(t, e, n, r) {
        var i = this._gl,
          o = this._locations[this._index];
        i.vertexAttribPointer(
          o,
          this._dimension,
          t || i.FLOAT,
          !!e,
          n || 0,
          r || 0
        ),
          i.enableVertexAttribArray(o);
      }),
        (o.set = function(t, e, n, r) {
          return this._constFunc(this._locations[this._index], t, e, n, r);
        }),
        Object.defineProperty(o, 'location', {
          get: function() {
            return this._locations[this._index];
          },
          set: function(t) {
            return (
              t !== this._locations[this._index] &&
                ((this._locations[this._index] = 0 | t),
                (this._wrapper.program = null)),
              0 | t
            );
          }
        });
    },
    'g+oV': function(t, e, n) {
      'use strict';
      var r = n('XpGV');
      e.inline = function(t, e) {
        var n = (function(t) {
          var e = t.getElementsByTagName('script');
          return Array.prototype.filter.call(e, function(t) {
            return !!t.attributes.src;
          });
        })(t);
        return r.collectAndReportErrors(
          n.map(function(t) {
            return (function(t, e) {
              var n = t.attributes.src.value,
                i = r.getDocumentBaseUrl(t.ownerDocument),
                o = r.clone(e);
              return (
                !o.baseUrl && i && (o.baseUrl = i),
                r.ajax(n, o).catch(function(t) {
                  throw {
                    resourceType: 'script',
                    url: t.url,
                    msg: 'Unable to load script ' + t.url
                  };
                })
              );
            })(t, e).then(function(e) {
              !(function(t, e) {
                t.attributes.removeNamedItem('src'),
                  (t.textContent = e.replace(/<\//g, '<\\/'));
              })(t, e);
            });
          })
        );
      };
    },
    g9XJ: function(t, e) {
      Array.prototype.find ||
        (Array.prototype.find = function(t) {
          if (null == this)
            throw new TypeError(
              'Array.prototype.find called on null or undefined'
            );
          if ('function' != typeof t)
            throw new TypeError('predicate must be a function');
          for (
            var e,
              n = Object(this),
              r = n.length >>> 0,
              i = arguments[1],
              o = 0;
            o < r;
            o++
          )
            if (((e = n[o]), t.call(i, e, o, n))) return e;
        });
    },
    hK8l: function(t, e, n) {
      'use strict';
      t.exports = function(t, e) {
        switch ((void 0 === e && (e = 0), typeof t)) {
          case 'number':
            if (t > 0)
              return (function(t, e) {
                var n, r;
                for (n = new Array(t), r = 0; r < t; ++r) n[r] = e;
                return n;
              })(0 | t, e);
            break;
          case 'object':
            if ('number' == typeof t.length)
              return (function t(e, n, r) {
                var i = 0 | e[r];
                if (i <= 0) return [];
                var o,
                  a = new Array(i);
                if (r === e.length - 1) for (o = 0; o < i; ++o) a[o] = n;
                else for (o = 0; o < i; ++o) a[o] = t(e, n, r + 1);
                return a;
              })(t, e, 0);
        }
        return [];
      };
    },
    hYYf: function(t, e, n) {
      t.exports = function(t) {
        var e,
          n,
          w,
          E = 0,
          A = 0,
          C = l,
          P = [],
          R = [],
          I = 1,
          S = 0,
          M = 0,
          O = !1,
          k = !1,
          N = '',
          D = o,
          F = r;
        '300 es' === (t = t || {}).version && ((D = s), (F = a));
        for (var L = {}, U = {}, E = 0; E < D.length; E++) L[D[E]] = !0;
        for (var E = 0; E < F.length; E++) U[F[E]] = !0;
        return function(t) {
          return (
            (R = []),
            null !== t
              ? (function(t) {
                  (E = 0), t.toString && (t = t.toString());
                  var n;
                  (N += t.replace(/\r\n/g, '\n')), (w = N.length);
                  for (; (e = N[E]), E < w; ) {
                    switch (((n = E), C)) {
                      case u:
                        E = X();
                        break;
                      case h:
                      case f:
                        E = V();
                        break;
                      case p:
                        E = q();
                        break;
                      case d:
                        E = Y();
                        break;
                      case T:
                        E = G();
                        break;
                      case m:
                        E = W();
                        break;
                      case c:
                        E = K();
                        break;
                      case y:
                        E = j();
                        break;
                      case l:
                        E = z();
                    }
                    if (n !== E)
                      switch (N[n]) {
                        case '\n':
                          (S = 0), ++I;
                          break;
                        default:
                          ++S;
                      }
                  }
                  return (A += E), (N = N.slice(E)), R;
                })(t)
              : (function(t) {
                  P.length && B(P.join(''));
                  return (C = b), B('(eof)'), R;
                })()
          );
        };
        function B(t) {
          t.length &&
            R.push({ type: x[C], data: t, position: M, line: I, column: S });
        }
        function z() {
          return (
            (P = P.length ? [] : P),
            '/' === n && '*' === e
              ? ((M = A + E - 1), (C = u), (n = e), E + 1)
              : '/' === n && '/' === e
              ? ((M = A + E - 1), (C = h), (n = e), E + 1)
              : '#' === e
              ? ((C = f), (M = A + E), E)
              : /\s/.test(e)
              ? ((C = y), (M = A + E), E)
              : ((O = /\d/.test(e)),
                (k = /[^\w_]/.test(e)),
                (M = A + E),
                (C = O ? d : k ? p : c),
                E)
          );
        }
        function j() {
          return /[^\s]/g.test(e)
            ? (B(P.join('')), (C = l), E)
            : (P.push(e), (n = e), E + 1);
        }
        function V() {
          return ('\r' !== e && '\n' !== e) || '\\' === n
            ? (P.push(e), (n = e), E + 1)
            : (B(P.join('')), (C = l), E);
        }
        function X() {
          return '/' === e && '*' === n
            ? (P.push(e), B(P.join('')), (C = l), E + 1)
            : (P.push(e), (n = e), E + 1);
        }
        function q() {
          if ('.' === n && /\d/.test(e)) return (C = m), E;
          if ('/' === n && '*' === e) return (C = u), E;
          if ('/' === n && '/' === e) return (C = h), E;
          if ('.' === e && P.length) {
            for (; H(P); );
            return (C = m), E;
          }
          if (';' === e || ')' === e || '(' === e) {
            if (P.length) for (; H(P); );
            return B(e), (C = l), E + 1;
          }
          var t = 2 === P.length && '=' !== e;
          if (/[\w_\d\s]/.test(e) || t) {
            for (; H(P); );
            return (C = l), E;
          }
          return P.push(e), (n = e), E + 1;
        }
        function H(t) {
          for (var e, n, r = 0; ; ) {
            if (
              ((e = i.indexOf(t.slice(0, t.length + r).join(''))),
              (n = i[e]),
              -1 === e)
            ) {
              if (r-- + t.length > 0) continue;
              n = t.slice(0, 1).join('');
            }
            return B(n), (M += n.length), (P = P.slice(n.length)).length;
          }
        }
        function G() {
          return /[^a-fA-F0-9]/.test(e)
            ? (B(P.join('')), (C = l), E)
            : (P.push(e), (n = e), E + 1);
        }
        function Y() {
          return '.' === e
            ? (P.push(e), (C = m), (n = e), E + 1)
            : /[eE]/.test(e)
            ? (P.push(e), (C = m), (n = e), E + 1)
            : 'x' === e && 1 === P.length && '0' === P[0]
            ? ((C = T), P.push(e), (n = e), E + 1)
            : /[^\d]/.test(e)
            ? (B(P.join('')), (C = l), E)
            : (P.push(e), (n = e), E + 1);
        }
        function W() {
          return (
            'f' === e && (P.push(e), (n = e), (E += 1)),
            /[eE]/.test(e)
              ? (P.push(e), (n = e), E + 1)
              : (('-' !== e && '+' !== e) || !/[eE]/.test(n)) && /[^\d]/.test(e)
              ? (B(P.join('')), (C = l), E)
              : (P.push(e), (n = e), E + 1)
          );
        }
        function K() {
          if (/[^\d\w_]/.test(e)) {
            var t = P.join('');
            return (C = U[t] ? _ : L[t] ? v : g), B(P.join('')), (C = l), E;
          }
          return P.push(e), (n = e), E + 1;
        }
      };
      var r = n('GTa7'),
        i = n('aiXG'),
        o = n('Xs3h'),
        a = n('9fJb'),
        s = n('BkhO'),
        l = 999,
        c = 9999,
        u = 0,
        h = 1,
        f = 2,
        p = 3,
        d = 4,
        m = 5,
        g = 6,
        v = 7,
        _ = 8,
        y = 9,
        b = 10,
        T = 11,
        x = [
          'block-comment',
          'line-comment',
          'preprocessor',
          'operator',
          'integer',
          'float',
          'ident',
          'builtin',
          'keyword',
          'whitespace',
          'eof',
          'integer'
        ];
    },
    'k2/K': function(t, e, n) {
      var r, i, o;
      /*! rasterizeHTML.js - v1.3.0 - 2018-03-18
       * http://www.github.com/cburgmer/rasterizeHTML.js
       * Copyright (c) 2018 Christoph Burgmer; Licensed MIT */ void 0 ===
        /*! rasterizeHTML.js - v1.3.0 - 2018-03-18
         * http://www.github.com/cburgmer/rasterizeHTML.js
         * Copyright (c) 2018 Christoph Burgmer; Licensed MIT */
        (o = this) &&
        void 0 !== window &&
        (o = window),
        (r = [n('CxY0'), n('l8mB'), n('Kgze'), n('YYSD')]),
        void 0 ===
          (i = function(t, e, n, r) {
            return (o.rasterizeHTML =
              ((i = e),
              (a = n),
              (s = r),
              (l = (function(t) {
                'use strict';
                var e = {},
                  n = [];
                return (
                  (e.joinUrl = function(e, n) {
                    return e ? t.resolve(e, n) : n;
                  }),
                  (e.getConstantUniqueIdFor = function(t) {
                    return n.indexOf(t) < 0 && n.push(t), n.indexOf(t);
                  }),
                  (e.clone = function(t) {
                    var e,
                      n = {};
                    for (e in t) t.hasOwnProperty(e) && (n[e] = t[e]);
                    return n;
                  }),
                  (e.parseOptionalParameters = function(t) {
                    var n,
                      r = { canvas: null, options: {} };
                    return (
                      null == t[0] ||
                      ((function(t) {
                        return 'object' == typeof t && null !== t;
                      })((n = t[0])) &&
                        Object.prototype.toString
                          .apply(n)
                          .match(/\[object (Canvas|HTMLCanvasElement)\]/i))
                        ? ((r.canvas = t[0] || null),
                          (r.options = e.clone(t[1])))
                        : (r.options = e.clone(t[0])),
                      r
                    );
                  }),
                  e
                );
              })(t)),
              (c = (function(t) {
                'use strict';
                var e = {},
                  n = function(t, e, n) {
                    var r = t[e];
                    return (
                      (t[e] = function() {
                        var t = Array.prototype.slice.call(arguments);
                        return n.apply(this, [t, r]);
                      }),
                      r
                    );
                  };
                return (
                  (e.baseUrlRespectingXhr = function(e, r) {
                    return function() {
                      var i = new e();
                      return (
                        n(i, 'open', function(e, n) {
                          var i = e.shift(),
                            o = e.shift(),
                            a = t.joinUrl(r, o);
                          return n.apply(this, [i, a].concat(e));
                        }),
                        i
                      );
                    };
                  }),
                  (e.finishNotifyingXhr = function(t) {
                    var e,
                      r = 0,
                      i = 0,
                      o = !1,
                      a = new Promise(function(t) {
                        e = function() {
                          var e = r - i;
                          e <= 0 && o && t({ totalCount: r });
                        };
                      }),
                      s = function() {
                        var o = new t();
                        return (
                          n(o, 'send', function(t, e) {
                            return (r += 1), e.apply(this, arguments);
                          }),
                          o.addEventListener('load', function() {
                            (i += 1), e();
                          }),
                          o
                        );
                      };
                    return (
                      (s.waitForRequestsToFinish = function() {
                        return (o = !0), e(), a;
                      }),
                      s
                    );
                  }),
                  e
                );
              })(l)),
              (u = (function(t) {
                'use strict';
                var e = {},
                  n = function(t) {
                    return Array.prototype.slice.call(t);
                  },
                  r = { active: !0, hover: !0, focus: !1, target: !1 };
                return (
                  (e.fakeUserAction = function(e, n, i) {
                    var o = e.querySelector(n),
                      a = ':' + i,
                      s = 'rasterizehtml' + i;
                    o &&
                      (r[i]
                        ? t.addClassNameRecursively(o, s)
                        : t.addClassName(o, s),
                      t.rewriteCssSelectorWith(e, a, '.' + s));
                  }),
                  (e.persistInputValues = function(t) {
                    var e = t.querySelectorAll('input'),
                      r = t.querySelectorAll('textarea'),
                      i = function(t) {
                        return 'checkbox' === t.type || 'radio' === t.type;
                      };
                    n(e)
                      .filter(i)
                      .forEach(function(t) {
                        t.checked
                          ? t.setAttribute('checked', '')
                          : t.removeAttribute('checked');
                      }),
                      n(e)
                        .filter(function(t) {
                          return !i(t);
                        })
                        .forEach(function(t) {
                          t.setAttribute('value', t.value);
                        }),
                      n(r).forEach(function(t) {
                        t.textContent = t.value;
                      });
                  }),
                  (e.rewriteTagNameSelectorsToLowerCase = function(e) {
                    t.lowercaseCssTypeSelectors(e, t.findHtmlOnlyNodeNames(e));
                  }),
                  e
                );
              })(
                (function() {
                  'use strict';
                  var t = {},
                    e = function(t) {
                      return Array.prototype.slice.call(t);
                    };
                  (t.addClassName = function(t, e) {
                    t.className += ' ' + e;
                  }),
                    (t.addClassNameRecursively = function(e, n) {
                      t.addClassName(e, n),
                        e.parentNode !== e.ownerDocument &&
                          t.addClassNameRecursively(e.parentNode, n);
                    });
                  var n = function(t, n) {
                      var r = t.cssText.replace(/^[^\{]+/, ''),
                        i = n + ' ' + r;
                      !(function(t, n) {
                        var r = t.parentStyleSheet,
                          i = e(r.cssRules).indexOf(t);
                        r.insertRule(n, i + 1), r.deleteRule(i);
                      })(t, i);
                    },
                    r = function(t) {
                      var n;
                      t.textContent =
                        ((n = t.sheet.cssRules),
                        e(n).reduce(function(t, e) {
                          return t + e.cssText;
                        }, ''));
                    },
                    i = function(t, i, o) {
                      var a = (function(t) {
                        return (
                          '((?:^|[^.#:\\w])|(?=\\W))(' +
                          t.join('|') +
                          ')(?=\\W|$)'
                        );
                      })(i);
                      e(t.querySelectorAll('style')).forEach(function(t) {
                        var i, s, l;
                        void 0 === t.sheet &&
                          ((i = t),
                          (s = document.implementation.createHTMLDocument('')),
                          ((l = document.createElement('style')).textContent =
                            i.textContent),
                          s.body.appendChild(l),
                          (i.sheet = l.sheet));
                        var c = e(t.sheet.cssRules).filter(function(t) {
                          return (
                            t.selectorText &&
                            new RegExp(a, 'i').test(t.selectorText)
                          );
                        });
                        c.length &&
                          (c.forEach(function(t) {
                            var e = t.selectorText.replace(
                              new RegExp(a, 'gi'),
                              function(t, e, n) {
                                return e + o(n);
                              }
                            );
                            e !== t.selectorText && n(t, e);
                          }),
                          r(t));
                      });
                    };
                  return (
                    (t.rewriteCssSelectorWith = function(t, e, n) {
                      i(t, [e], function() {
                        return n;
                      });
                    }),
                    (t.lowercaseCssTypeSelectors = function(t, e) {
                      i(t, e, function(t) {
                        return t.toLowerCase();
                      });
                    }),
                    (t.findHtmlOnlyNodeNames = function(t) {
                      var e,
                        n = t.ownerDocument.createTreeWalker(
                          t,
                          NodeFilter.SHOW_ELEMENT
                        ),
                        r = {},
                        i = {};
                      do {
                        (e = n.currentNode.tagName.toLowerCase()),
                          'http://www.w3.org/1999/xhtml' ===
                          n.currentNode.namespaceURI
                            ? (r[e] = !0)
                            : (i[e] = !0);
                      } while (n.nextNode());
                      return Object.keys(r).filter(function(t) {
                        return !i[t];
                      });
                    }),
                    t
                  );
                })()
              )),
              (h = (function(t, e, n, r) {
                'use strict';
                var i = {
                    executeJavascript: function(t, n) {
                      return new Promise(function(i) {
                        var o = (function(t, e, n, r) {
                            var i = t.createElement(e);
                            return (
                              (i.style.visibility = 'hidden'),
                              (i.style.width = n + 'px'),
                              (i.style.height = r + 'px'),
                              (i.style.position = 'absolute'),
                              (i.style.top = -1e4 - r + 'px'),
                              (i.style.left = -1e4 - n + 'px'),
                              t.getElementsByTagName('body')[0].appendChild(i),
                              i
                            );
                          })(r.document, 'iframe', n.width, n.height),
                          a = t.outerHTML,
                          s = [],
                          l = n.executeJsTimeout || 0,
                          c = function() {
                            var t = o.contentDocument;
                            r.document
                              .getElementsByTagName('body')[0]
                              .removeChild(o),
                              i({ document: t, errors: s });
                          },
                          u = o.contentWindow.XMLHttpRequest,
                          h = e.finishNotifyingXhr(u),
                          f = e.baseUrlRespectingXhr(h, n.baseUrl);
                        (o.onload = function() {
                          var t;
                          ((t = l),
                          t > 0
                            ? new Promise(function(e) {
                                setTimeout(e, t);
                              })
                            : Promise.resolve())
                            .then(h.waitForRequestsToFinish)
                            .then(c);
                        }),
                          o.contentDocument.open(),
                          (o.contentWindow.XMLHttpRequest = f),
                          (o.contentWindow.onerror = function(t) {
                            s.push({ resourceType: 'scriptExecution', msg: t });
                          }),
                          o.contentDocument.write('<!DOCTYPE html>'),
                          o.contentDocument.write(a),
                          o.contentDocument.close();
                      });
                    }
                  },
                  o = function(t, e, n, i, o) {
                    var a,
                      s,
                      l,
                      c,
                      u,
                      h,
                      f,
                      p,
                      d = Math.max(t.scrollWidth, t.clientWidth),
                      m = Math.max(t.scrollHeight, t.clientHeight);
                    return (
                      e
                        ? ((h = (function(t, e) {
                            var n = t.querySelector(e);
                            if (n) return n;
                            if (t.ownerDocument.querySelector(e) === t)
                              return t;
                            throw { message: 'Clipping selector not found' };
                          })(t, e)),
                          (f = h.getBoundingClientRect()),
                          (a = f.top),
                          (s = f.left),
                          (l = f.width),
                          (c = f.height))
                        : ((a = 0), (s = 0), (l = d), (c = m)),
                      (p = (function(t, e, n, r) {
                        return {
                          width: Math.max(t.width * r, e),
                          height: Math.max(t.height * r, n)
                        };
                      })({ width: l, height: c }, n, i, o)),
                      (u = r.getComputedStyle(t.ownerDocument.documentElement)
                        .fontSize),
                      {
                        left: s,
                        top: a,
                        width: p.width,
                        height: p.height,
                        viewportWidth: d,
                        viewportHeight: m,
                        rootFontSize: u
                      }
                    );
                  };
                (i.calculateDocumentContentSize = function(t, e) {
                  return new Promise(function(n, i) {
                    var a,
                      s = e.zoom || 1;
                    (a = (function(t, e, n) {
                      var i = Math.floor(t / n),
                        o = Math.floor(e / n);
                      return (function(t, e, n) {
                        var r = t.createElement('iframe');
                        return (
                          (r.style.width = e + 'px'),
                          (r.style.height = n + 'px'),
                          (r.style.visibility = 'hidden'),
                          (r.style.position = 'absolute'),
                          (r.style.top = -1e4 - n + 'px'),
                          (r.style.left = -1e4 - e + 'px'),
                          (r.style.borderWidth = 0),
                          (r.sandbox = 'allow-same-origin'),
                          (r.scrolling = 'no'),
                          r
                        );
                      })(r.document, i, o);
                    })(e.width, e.height, s)),
                      r.document.getElementsByTagName('body')[0].appendChild(a),
                      (a.onload = function() {
                        var l,
                          c = a.contentDocument;
                        try {
                          (l = o(
                            (function(t, e) {
                              var n = t.tagName;
                              return e.querySelector(n);
                            })(t, c),
                            e.clip,
                            e.width,
                            e.height,
                            s
                          )),
                            n(l);
                        } catch (t) {
                          i(t);
                        } finally {
                          r.document
                            .getElementsByTagName('body')[0]
                            .removeChild(a);
                        }
                      }),
                      a.contentDocument.open(),
                      a.contentDocument.write('<!DOCTYPE html>'),
                      a.contentDocument.write(
                        (function(t) {
                          var e = t.tagName.toLowerCase();
                          return 'html' === e || 'body' === e
                            ? t.outerHTML
                            : '<body style="margin: 0;">' +
                                t.outerHTML +
                                '</body>';
                        })(t)
                      ),
                      a.contentDocument.close();
                  });
                }),
                  (i.parseHtmlFragment = function(t) {
                    var e = r.document.implementation.createHTMLDocument('');
                    e.documentElement.innerHTML = t;
                    var n = e.querySelector('body').firstChild;
                    if (!n) throw 'Invalid source';
                    return n;
                  }),
                  (i.parseHTML = function(t) {
                    var e = r.document.implementation.createHTMLDocument('');
                    return (
                      (e.documentElement.innerHTML = t),
                      (function(t, e) {
                        var n,
                          i,
                          o,
                          a,
                          s = /<html((?:\s+[^>]*)?)>/im.exec(e),
                          l = r.document.implementation.createHTMLDocument('');
                        if (s)
                          for (
                            n = '<div' + s[1] + '></div>',
                              l.documentElement.innerHTML = n,
                              o = l.querySelector('div'),
                              i = 0;
                            i < o.attributes.length;
                            i++
                          )
                            (a = o.attributes[i]),
                              t.documentElement.setAttribute(a.name, a.value);
                      })(e, t),
                      e
                    );
                  });
                var a = function(t) {
                  try {
                    return n.failOnParseError(t);
                  } catch (t) {
                    throw { message: 'Invalid source', originalError: t };
                  }
                };
                i.validateXHTML = function(t) {
                  var e = new DOMParser(),
                    n = e.parseFromString(t, 'application/xml');
                  a(n);
                };
                var s = null,
                  l = function(e, n) {
                    return new Promise(function(r, i) {
                      var o = new window.XMLHttpRequest(),
                        a = t.joinUrl(n.baseUrl, e),
                        l = (function(t, e) {
                          return 'none' === e || 'repeated' === e
                            ? ((null !== s && 'repeated' === e) ||
                                (s = Date.now()),
                              t + '?_=' + s)
                            : t;
                        })(a, n.cache),
                        c = function(t) {
                          i({
                            message: 'Unable to load page',
                            originalError: t
                          });
                        };
                      o.addEventListener(
                        'load',
                        function() {
                          200 === o.status || 0 === o.status
                            ? r(o.responseXML)
                            : c(o.statusText);
                        },
                        !1
                      ),
                        o.addEventListener(
                          'error',
                          function(t) {
                            c(t);
                          },
                          !1
                        );
                      try {
                        o.open('GET', l, !0),
                          (o.responseType = 'document'),
                          o.send(null);
                      } catch (t) {
                        c(t);
                      }
                    });
                  };
                return (
                  (i.loadDocument = function(t, e) {
                    return l(t, e).then(function(t) {
                      return a(t);
                    });
                  }),
                  i
                );
              })(l, c, a, window)),
              (f = (function(t) {
                'use strict';
                var e,
                  n = {},
                  r = function(t, e) {
                    return e
                      ? URL.createObjectURL(
                          new Blob([t], { type: 'image/svg+xml' })
                        )
                      : 'data:image/svg+xml;charset=utf-8,' +
                          encodeURIComponent(t);
                  },
                  i = function(t) {
                    t instanceof Blob && URL.revokeObjectURL(t);
                  },
                  o =
                    '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"><foreignObject></foreignObject></svg>',
                  a = function(t) {
                    return new Promise(function(e, n) {
                      var r = document.createElement('canvas'),
                        i = new Image();
                      (i.onload = function() {
                        var t = r.getContext('2d');
                        try {
                          t.drawImage(i, 0, 0), r.toDataURL('image/png'), e(!0);
                        } catch (t) {
                          e(!1);
                        }
                      }),
                        (i.onerror = n),
                        (i.src = t);
                    });
                  },
                  s = function() {
                    return new Promise(function(e, n) {
                      var s;
                      (function() {
                        if (t.Blob)
                          try {
                            return (
                              new Blob(['<b></b>'], { type: 'text/xml' }), !0
                            );
                          } catch (t) {}
                        return !1;
                      })() && t.URL
                        ? ((s = r(o, !0)),
                          a(s).then(
                            function(t) {
                              return (
                                i(s),
                                !t &&
                                  a(r(o, !1)).then(function(t) {
                                    return t;
                                  })
                              );
                            },
                            function() {
                              return !1;
                            }
                          )).then(
                            function(t) {
                              e(!t);
                            },
                            function() {
                              n();
                            }
                          )
                        : e(!1);
                    });
                  },
                  l = function(t) {
                    return (void 0 === e && (e = s()), e).then(function(e) {
                      return r(t, e);
                    });
                  };
                return (
                  (n.renderSvg = function(t) {
                    return new Promise(function(e, n) {
                      var r,
                        o,
                        a = function() {
                          r && i(r);
                        };
                      ((o = new Image()).onload = function() {
                        (o.onload = null), (o.onerror = null), a(), e(o);
                      }),
                        (o.onerror = function() {
                          a(), n();
                        }),
                        l(t).then(function(t) {
                          (r = t), (o.src = r);
                        }, n);
                    });
                  }),
                  n
                );
              })(window)),
              (p = (function(t, e, n, r) {
                'use strict';
                var i = {},
                  o = function(t) {
                    var e = Object.keys(t);
                    return e.length
                      ? ' ' +
                          e
                            .map(function(e) {
                              return e + '="' + t[e] + '"';
                            })
                            .join(' ')
                      : '';
                  },
                  a = function(t, n, i) {
                    var a = r.serializeToString(t);
                    e.validateXHTML(a);
                    var s,
                      l,
                      c = (function(t) {
                        var e, n, r, i;
                        return (
                          (e = Math.round(t.viewportWidth)),
                          (n = Math.round(t.viewportHeight)),
                          (r = -t.left),
                          (i = -t.top),
                          { x: r, y: i, width: e, height: n }
                        );
                      })(n);
                    return (
                      (l = (s = c).style || ''),
                      (s.style = l + 'float: left;'),
                      (function(t) {
                        t.externalResourcesRequired = !0;
                      })(c),
                      '<svg xmlns="http://www.w3.org/2000/svg"' +
                        o(
                          (function(t, e) {
                            var n = e || 1,
                              r = {
                                width: t.width,
                                height: t.height,
                                'font-size': t.rootFontSize
                              };
                            return (
                              1 !== n &&
                                (r.style =
                                  'transform:scale(' +
                                  n +
                                  '); transform-origin: 0 0;'),
                              r
                            );
                          })(n, i)
                        ) +
                        '><style scoped="">html::-webkit-scrollbar { display: none; }</style><foreignObject' +
                        o(c) +
                        '>' +
                        a +
                        '</foreignObject></svg>'
                    );
                  };
                return (
                  (i.getSvgForDocument = function(t, e, r) {
                    return n.rewriteTagNameSelectorsToLowerCase(t), a(t, e, r);
                  }),
                  (i.drawDocumentAsSvg = function(t, r) {
                    return (
                      ['hover', 'active', 'focus', 'target'].forEach(function(
                        e
                      ) {
                        r[e] && n.fakeUserAction(t, r[e], e);
                      }),
                      e.calculateDocumentContentSize(t, r).then(function(e) {
                        return i.getSvgForDocument(t, e, r.zoom);
                      })
                    );
                  }),
                  i
                );
              })(0, h, u, i)),
              (d = (function(t, e, n, r, i, o) {
                'use strict';
                var a = {},
                  s = function(t) {
                    return {
                      message: 'Error rendering page',
                      originalError: t
                    };
                  },
                  l = function(t) {
                    return i.renderSvg(t).then(
                      function(e) {
                        return { image: e, svg: t };
                      },
                      function(t) {
                        throw s(t);
                      }
                    );
                  },
                  c = function(t, e, n) {
                    return r
                      .drawDocumentAsSvg(t, n)
                      .then(l)
                      .then(function(t) {
                        return (
                          e &&
                            (function(t, e) {
                              try {
                                e.getContext('2d').drawImage(t, 0, 0);
                              } catch (t) {
                                throw s(t);
                              }
                            })(t.image, e),
                          t
                        );
                      });
                  };
                return (
                  (a.rasterize = function(r, i, a) {
                    var s;
                    return (
                      ((s = t.clone(a)).inlineScripts = !0 === a.executeJs),
                      o
                        .inlineReferences(r, s)
                        .then(function(t) {
                          return a.executeJs
                            ? (function(t, r) {
                                return e
                                  .executeJavascript(t, r)
                                  .then(function(t) {
                                    var e = t.document;
                                    return (
                                      n.persistInputValues(e),
                                      { document: e, errors: t.errors }
                                    );
                                  });
                              })(r, a).then(function(e) {
                                return {
                                  element: e.document.documentElement,
                                  errors: t.concat(e.errors)
                                };
                              })
                            : { element: r, errors: t };
                        })
                        .then(function(t) {
                          return c(t.element, i, a).then(function(e) {
                            return {
                              image: e.image,
                              svg: e.svg,
                              errors: t.errors
                            };
                          });
                        })
                    );
                  }),
                  a
                );
              })(l, h, u, p, f, s)),
              (function(t, e, n) {
                'use strict';
                var r = {},
                  i = function(e) {
                    var n,
                      r = (function(t, e) {
                        var n = t ? t.width : 300,
                          r = t ? t.height : 200,
                          i = void 0 !== e.width ? e.width : n,
                          o = void 0 !== e.height ? e.height : r;
                        return { width: i, height: o };
                      })(e.canvas, e.options);
                    return (
                      ((n = t.clone(e.options)).width = r.width),
                      (n.height = r.height),
                      n
                    );
                  };
                r.drawDocument = function() {
                  var e = arguments[0],
                    r = Array.prototype.slice.call(arguments, 1),
                    o = t.parseOptionalParameters(r),
                    a = e.documentElement ? e.documentElement : e;
                  return n.rasterize(a, o.canvas, i(o));
                };
                var o = function(t, n, i) {
                  var o = e.parseHTML(t);
                  return r.drawDocument(o, n, i);
                };
                r.drawHTML = function() {
                  var e = arguments[0],
                    n = Array.prototype.slice.call(arguments, 1),
                    r = t.parseOptionalParameters(n);
                  return o(e, r.canvas, r.options);
                };
                var a = function(n, i, o) {
                  return e.loadDocument(n, o).then(function(e) {
                    var a = (function(e, n, r) {
                      var i = document.implementation.createHTMLDocument('');
                      i.replaceChild(e.documentElement, i.documentElement);
                      var o = r ? t.clone(r) : {};
                      return (
                        r.baseUrl || (o.baseUrl = n),
                        { document: i, options: o }
                      );
                    })(e, n, o);
                    return r.drawDocument(a.document, i, a.options);
                  });
                };
                return (
                  (r.drawURL = function() {
                    var e = arguments[0],
                      n = Array.prototype.slice.call(arguments, 1),
                      r = t.parseOptionalParameters(n);
                    return a(e, r.canvas, r.options);
                  }),
                  r
                );
              })(l, h, d)));
            var i, a, s, l, c, u, h, f, p, d;
          }.apply(e, r)) || (t.exports = i);
    },
    kR76: function(t, e, n) {
      var r = n('SMLl');
      t.exports = function(t, e, n) {
        (e = 'number' == typeof e ? e : 1), (n = n || ': ');
        var i = t.split(/\r?\n/),
          o = String(i.length + e - 1).length;
        return i
          .map(function(t, i) {
            var a = i + e,
              s = String(a).length,
              l = r(a, o - s);
            return l + n + t;
          })
          .join('\n');
      };
    },
    'kVK+': function(t, e) {
      (e.read = function(t, e, n, r, i) {
        var o,
          a,
          s = 8 * i - r - 1,
          l = (1 << s) - 1,
          c = l >> 1,
          u = -7,
          h = n ? i - 1 : 0,
          f = n ? -1 : 1,
          p = t[e + h];
        for (
          h += f, o = p & ((1 << -u) - 1), p >>= -u, u += s;
          u > 0;
          o = 256 * o + t[e + h], h += f, u -= 8
        );
        for (
          a = o & ((1 << -u) - 1), o >>= -u, u += r;
          u > 0;
          a = 256 * a + t[e + h], h += f, u -= 8
        );
        if (0 === o) o = 1 - c;
        else {
          if (o === l) return a ? NaN : (1 / 0) * (p ? -1 : 1);
          (a += Math.pow(2, r)), (o -= c);
        }
        return (p ? -1 : 1) * a * Math.pow(2, o - r);
      }),
        (e.write = function(t, e, n, r, i, o) {
          var a,
            s,
            l,
            c = 8 * o - i - 1,
            u = (1 << c) - 1,
            h = u >> 1,
            f = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
            p = r ? 0 : o - 1,
            d = r ? 1 : -1,
            m = e < 0 || (0 === e && 1 / e < 0) ? 1 : 0;
          for (
            e = Math.abs(e),
              isNaN(e) || e === 1 / 0
                ? ((s = isNaN(e) ? 1 : 0), (a = u))
                : ((a = Math.floor(Math.log(e) / Math.LN2)),
                  e * (l = Math.pow(2, -a)) < 1 && (a--, (l *= 2)),
                  (e += a + h >= 1 ? f / l : f * Math.pow(2, 1 - h)) * l >= 2 &&
                    (a++, (l /= 2)),
                  a + h >= u
                    ? ((s = 0), (a = u))
                    : a + h >= 1
                    ? ((s = (e * l - 1) * Math.pow(2, i)), (a += h))
                    : ((s = e * Math.pow(2, h - 1) * Math.pow(2, i)), (a = 0)));
            i >= 8;
            t[n + p] = 255 & s, p += d, s /= 256, i -= 8
          );
          for (
            a = (a << i) | s, c += i;
            c > 0;
            t[n + p] = 255 & a, p += d, a /= 256, c -= 8
          );
          t[n + p - d] |= 128 * m;
        });
    },
    kd2E: function(t, e, n) {
      'use strict';
      function r(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
      }
      t.exports = function(t, e, n, o) {
        (e = e || '&'), (n = n || '=');
        var a = {};
        if ('string' != typeof t || 0 === t.length) return a;
        var s = /\+/g;
        t = t.split(e);
        var l = 1e3;
        o && 'number' == typeof o.maxKeys && (l = o.maxKeys);
        var c = t.length;
        l > 0 && c > l && (c = l);
        for (var u = 0; u < c; ++u) {
          var h,
            f,
            p,
            d,
            m = t[u].replace(s, '%20'),
            g = m.indexOf(n);
          g >= 0
            ? ((h = m.substr(0, g)), (f = m.substr(g + 1)))
            : ((h = m), (f = '')),
            (p = decodeURIComponent(h)),
            (d = decodeURIComponent(f)),
            r(a, p)
              ? i(a[p])
                ? a[p].push(d)
                : (a[p] = [a[p], d])
              : (a[p] = d);
        }
        return a;
      };
      var i =
        Array.isArray ||
        function(t) {
          return '[object Array]' === Object.prototype.toString.call(t);
        };
    },
    l8mB: function(t, e, n) {
      var r, i, o;
      (i = []),
        void 0 ===
          (o =
            'function' ==
            typeof (r = function() {
              var t = function(t) {
                  var e = t.tagName;
                  return (
                    'http://www.w3.org/1999/xhtml' === t.namespaceURI &&
                      (e = e.toLowerCase()),
                    e
                  );
                },
                e = function(t) {
                  return Array.prototype.map
                    .call(t.childNodes, function(t) {
                      return r(t);
                    })
                    .join('');
                },
                n = function(n, r) {
                  var i = '<' + t(n);
                  return (
                    (i += (function(t, e) {
                      return Array.prototype.map
                        .call(t.attributes || t.attrs, function(t) {
                          return t.name;
                        })
                        .indexOf('xmlns') >= 0 ||
                        (!e && t.namespaceURI === t.parentNode.namespaceURI)
                        ? ''
                        : ' xmlns="' + t.namespaceURI + '"';
                    })(n, r)),
                    Array.prototype.forEach.call(
                      n.attributes || n.attrs,
                      function(t) {
                        i += (function(t) {
                          var e = t.value;
                          return (
                            ' ' +
                            t.name +
                            '="' +
                            (function(t) {
                              return t
                                .replace(/&/g, '&amp;')
                                .replace(/</g, '&lt;')
                                .replace(/>/g, '&gt;')
                                .replace(/"/g, '&quot;')
                                .replace(/'/g, '&apos;');
                            })(e) +
                            '"'
                          );
                        })(t);
                      }
                    ),
                    n.childNodes.length > 0
                      ? ((i += '>'), (i += e(n)), (i += '</' + t(n) + '>'))
                      : (i += '/>'),
                    i
                  );
                },
                r = function(t, r) {
                  var i = r && r.rootNode;
                  return '#document' === t.nodeName ||
                    '#document-fragment' === t.nodeName
                    ? e(t)
                    : t.tagName
                    ? n(t, i)
                    : '#text' === t.nodeName
                    ? (function(t) {
                        var e = t.nodeValue || t.value || '';
                        return e
                          .replace(/&/g, '&amp;')
                          .replace(/</g, '&lt;')
                          .replace(/>/g, '&gt;');
                      })(t)
                    : '#comment' === t.nodeName
                    ? (function(t) {
                        return (
                          '\x3c!--' + t.data.replace(/-/g, '&#45;') + '--\x3e'
                        );
                      })(t)
                    : '#cdata-section' === t.nodeName
                    ? (function(t) {
                        return '<![CDATA[' + t.nodeValue + ']]>';
                      })(t)
                    : void 0;
                };
              return {
                serializeToString: function(t) {
                  return r(t, { rootNode: !0 }).replace(
                    /[\x00-\x08\x0B\x0C\x0E-\x1F]/g,
                    ''
                  );
                }
              };
            })
              ? r.apply(e, i)
              : r) || (t.exports = o);
    },
    'lO+P': function(t, e, n) {
      var r, i;
      void 0 ===
        (i =
          'function' ==
          typeof (r = function() {
            function t(t) {
              (this.opts = (function() {
                for (var t = 1; t < arguments.length; t++)
                  for (var e in arguments[t])
                    arguments[t].hasOwnProperty(e) &&
                      (arguments[0][e] = arguments[t][e]);
                return arguments[0];
              })(
                {},
                {
                  onClose: null,
                  onOpen: null,
                  beforeOpen: null,
                  beforeClose: null,
                  stickyFooter: !1,
                  footer: !1,
                  cssClass: [],
                  closeLabel: 'Close',
                  closeMethods: ['overlay', 'button', 'escape']
                },
                t
              )),
                this.init();
            }
            function e() {
              this.modalBoxFooter &&
                ((this.modalBoxFooter.style.width =
                  this.modalBox.clientWidth + 'px'),
                (this.modalBoxFooter.style.left =
                  this.modalBox.offsetLeft + 'px'));
            }
            function n(t) {
              -1 !== this.opts.closeMethods.indexOf('escape') &&
                27 === t.which &&
                this.isOpen() &&
                this.close();
            }
            function r(t) {
              -1 !== this.opts.closeMethods.indexOf('overlay') &&
                !(function(t, e) {
                  for (; (t = t.parentElement) && !t.classList.contains(e); );
                  return t;
                })(t.target, 'tingle-modal') &&
                t.clientX < this.modal.clientWidth &&
                this.close();
            }
            var i = !1;
            return (
              (t.prototype.init = function() {
                if (!this.modal)
                  return (
                    function() {
                      (this.modal = document.createElement('div')),
                        this.modal.classList.add('tingle-modal'),
                        (0 !== this.opts.closeMethods.length &&
                          -1 !== this.opts.closeMethods.indexOf('overlay')) ||
                          this.modal.classList.add(
                            'tingle-modal--noOverlayClose'
                          ),
                        (this.modal.style.display = 'none'),
                        this.opts.cssClass.forEach(function(t) {
                          'string' == typeof t && this.modal.classList.add(t);
                        }, this),
                        -1 !== this.opts.closeMethods.indexOf('button') &&
                          ((this.modalCloseBtn = document.createElement(
                            'button'
                          )),
                          (this.modalCloseBtn.type = 'button'),
                          this.modalCloseBtn.classList.add(
                            'tingle-modal__close'
                          ),
                          (this.modalCloseBtnIcon = document.createElement(
                            'span'
                          )),
                          this.modalCloseBtnIcon.classList.add(
                            'tingle-modal__closeIcon'
                          ),
                          (this.modalCloseBtnIcon.innerHTML =
                            '<svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"><path d="M.3 9.7c.2.2.4.3.7.3.3 0 .5-.1.7-.3L5 6.4l3.3 3.3c.2.2.5.3.7.3.2 0 .5-.1.7-.3.4-.4.4-1 0-1.4L6.4 5l3.3-3.3c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0L5 3.6 1.7.3C1.3-.1.7-.1.3.3c-.4.4-.4 1 0 1.4L3.6 5 .3 8.3c-.4.4-.4 1 0 1.4z" fill="#000" fill-rule="nonzero"/></svg>'),
                          (this.modalCloseBtnLabel = document.createElement(
                            'span'
                          )),
                          this.modalCloseBtnLabel.classList.add(
                            'tingle-modal__closeLabel'
                          ),
                          (this.modalCloseBtnLabel.innerHTML = this.opts.closeLabel),
                          this.modalCloseBtn.appendChild(
                            this.modalCloseBtnIcon
                          ),
                          this.modalCloseBtn.appendChild(
                            this.modalCloseBtnLabel
                          )),
                        (this.modalBox = document.createElement('div')),
                        this.modalBox.classList.add('tingle-modal-box'),
                        (this.modalBoxContent = document.createElement('div')),
                        this.modalBoxContent.classList.add(
                          'tingle-modal-box__content'
                        ),
                        this.modalBox.appendChild(this.modalBoxContent),
                        -1 !== this.opts.closeMethods.indexOf('button') &&
                          this.modal.appendChild(this.modalCloseBtn),
                        this.modal.appendChild(this.modalBox);
                    }.call(this),
                    function() {
                      (this._events = {
                        clickCloseBtn: this.close.bind(this),
                        clickOverlay: r.bind(this),
                        resize: this.checkOverflow.bind(this),
                        keyboardNav: n.bind(this)
                      }),
                        -1 !== this.opts.closeMethods.indexOf('button') &&
                          this.modalCloseBtn.addEventListener(
                            'click',
                            this._events.clickCloseBtn
                          ),
                        this.modal.addEventListener(
                          'mousedown',
                          this._events.clickOverlay
                        ),
                        window.addEventListener('resize', this._events.resize),
                        document.addEventListener(
                          'keydown',
                          this._events.keyboardNav
                        );
                    }.call(this),
                    document.body.insertBefore(
                      this.modal,
                      document.body.firstChild
                    ),
                    this.opts.footer && this.addFooter(),
                    this
                  );
              }),
              (t.prototype._busy = function(t) {
                i = t;
              }),
              (t.prototype._isBusy = function() {
                return i;
              }),
              (t.prototype.destroy = function() {
                null !== this.modal &&
                  (this.isOpen() && this.close(!0),
                  function() {
                    -1 !== this.opts.closeMethods.indexOf('button') &&
                      this.modalCloseBtn.removeEventListener(
                        'click',
                        this._events.clickCloseBtn
                      ),
                      this.modal.removeEventListener(
                        'mousedown',
                        this._events.clickOverlay
                      ),
                      window.removeEventListener('resize', this._events.resize),
                      document.removeEventListener(
                        'keydown',
                        this._events.keyboardNav
                      );
                  }.call(this),
                  this.modal.parentNode.removeChild(this.modal),
                  (this.modal = null));
              }),
              (t.prototype.isOpen = function() {
                return !!this.modal.classList.contains('tingle-modal--visible');
              }),
              (t.prototype.open = function() {
                if (!this._isBusy()) {
                  this._busy(!0);
                  var t = this;
                  return (
                    'function' == typeof t.opts.beforeOpen &&
                      t.opts.beforeOpen(),
                    this.modal.style.removeProperty
                      ? this.modal.style.removeProperty('display')
                      : this.modal.style.removeAttribute('display'),
                    (this._scrollPosition = window.pageYOffset),
                    document.body.classList.add('tingle-enabled'),
                    (document.body.style.top = -this._scrollPosition + 'px'),
                    this.setStickyFooter(this.opts.stickyFooter),
                    this.modal.classList.add('tingle-modal--visible'),
                    'function' == typeof t.opts.onOpen && t.opts.onOpen.call(t),
                    t._busy(!1),
                    this.checkOverflow(),
                    this
                  );
                }
              }),
              (t.prototype.close = function(t) {
                if (!this._isBusy()) {
                  if (
                    (this._busy(!0),
                    (t = t || !1),
                    'function' == typeof this.opts.beforeClose &&
                      !this.opts.beforeClose.call(this))
                  )
                    return void this._busy(!1);
                  document.body.classList.remove('tingle-enabled'),
                    window.scrollTo(0, this._scrollPosition),
                    (document.body.style.top = null),
                    this.modal.classList.remove('tingle-modal--visible');
                  var e = this;
                  (e.modal.style.display = 'none'),
                    'function' == typeof e.opts.onClose &&
                      e.opts.onClose.call(this),
                    e._busy(!1);
                }
              }),
              (t.prototype.setContent = function(t) {
                return (
                  'string' == typeof t
                    ? (this.modalBoxContent.innerHTML = t)
                    : ((this.modalBoxContent.innerHTML = ''),
                      this.modalBoxContent.appendChild(t)),
                  this.isOpen() && this.checkOverflow(),
                  this
                );
              }),
              (t.prototype.getContent = function() {
                return this.modalBoxContent;
              }),
              (t.prototype.addFooter = function() {
                return (
                  function() {
                    (this.modalBoxFooter = document.createElement('div')),
                      this.modalBoxFooter.classList.add(
                        'tingle-modal-box__footer'
                      ),
                      this.modalBox.appendChild(this.modalBoxFooter);
                  }.call(this),
                  this
                );
              }),
              (t.prototype.setFooterContent = function(t) {
                return (this.modalBoxFooter.innerHTML = t), this;
              }),
              (t.prototype.getFooterContent = function() {
                return this.modalBoxFooter;
              }),
              (t.prototype.setStickyFooter = function(t) {
                return (
                  this.isOverflow() || (t = !1),
                  t
                    ? this.modalBox.contains(this.modalBoxFooter) &&
                      (this.modalBox.removeChild(this.modalBoxFooter),
                      this.modal.appendChild(this.modalBoxFooter),
                      this.modalBoxFooter.classList.add(
                        'tingle-modal-box__footer--sticky'
                      ),
                      e.call(this),
                      (this.modalBoxContent.style['padding-bottom'] =
                        this.modalBoxFooter.clientHeight + 20 + 'px'))
                    : this.modalBoxFooter &&
                      (this.modalBox.contains(this.modalBoxFooter) ||
                        (this.modal.removeChild(this.modalBoxFooter),
                        this.modalBox.appendChild(this.modalBoxFooter),
                        (this.modalBoxFooter.style.width = 'auto'),
                        (this.modalBoxFooter.style.left = ''),
                        (this.modalBoxContent.style['padding-bottom'] = ''),
                        this.modalBoxFooter.classList.remove(
                          'tingle-modal-box__footer--sticky'
                        ))),
                  this
                );
              }),
              (t.prototype.addFooterBtn = function(t, e, n) {
                var r = document.createElement('button');
                return (
                  (r.innerHTML = t),
                  r.addEventListener('click', n),
                  'string' == typeof e &&
                    e.length &&
                    e.split(' ').forEach(function(t) {
                      r.classList.add(t);
                    }),
                  this.modalBoxFooter.appendChild(r),
                  r
                );
              }),
              (t.prototype.resize = function() {
                console.warn(
                  'Resize is deprecated and will be removed in version 1.0'
                );
              }),
              (t.prototype.isOverflow = function() {
                var t = window.innerHeight;
                return this.modalBox.clientHeight >= t;
              }),
              (t.prototype.checkOverflow = function() {
                this.modal.classList.contains('tingle-modal--visible') &&
                  (this.isOverflow()
                    ? this.modal.classList.add('tingle-modal--overflow')
                    : this.modal.classList.remove('tingle-modal--overflow'),
                  !this.isOverflow() && this.opts.stickyFooter
                    ? this.setStickyFooter(!1)
                    : this.isOverflow() &&
                      this.opts.stickyFooter &&
                      (e.call(this), this.setStickyFooter(!0)));
              }),
              { modal: t }
            );
          })
            ? r.call(e, n, e, t)
            : r) || (t.exports = i);
    },
    mkqU: function(t, e, n) {
      'use strict';
      var r = n('lO+P');
      n('cd9/');
      var i = document.querySelector('.l-footer__cookie-declaration');
      i &&
        i.addEventListener('click', function(t) {
          t.preventDefault();
          var e,
            n = new r.modal({
              footer: !1,
              stickyFooter: !1,
              cssClass: ['cookie-declaration-modal'],
              onOpen: function() {
                document.documentElement.classList.add('scroll-auto'),
                  (window.CookiebotCallback_OnDialogLoad = function() {
                    n.checkOverflow();
                  });
              },
              onClose: function() {
                document.documentElement.classList.remove('scroll-auto'),
                  delete window.CookiebotCallback_OnDialogLoad;
              }
            }),
            i = document.querySelector(
              '.cookie-declaration-modal .tingle-modal-box__content'
            ),
            o = document.createElement('script');
          (o.id = 'CookieDeclaration'),
            (o.async = !0),
            o.setAttribute(
              'data-culture',
              'pt-br' === (e = document.documentElement.lang) || 'pt-BR' === e
                ? 'pt'
                : 'zh-cn' === e
                ? 'zh'
                : 'zh-tw' === e
                ? 'zu'
                : e
            ),
            (o.src =
              'https://consent.cookiebot.com/acc3ad63-2aea-464b-beeb-bd0b8a85bc05/cd.js'),
            i.appendChild(o),
            n.open();
        });
    },
    nYho: function(t, e, n) {
      (function(t, r) {
        var i;
        /*! https://mths.be/punycode v1.3.2 by @mathias */ !(function(o) {
          e && e.nodeType, t && t.nodeType;
          var a = 'object' == typeof r && r;
          a.global !== a && a.window !== a && a.self;
          var s,
            l = 2147483647,
            c = 36,
            u = 1,
            h = 26,
            f = 38,
            p = 700,
            d = 72,
            m = 128,
            g = '-',
            v = /^xn--/,
            _ = /[^\x20-\x7E]/,
            y = /[\x2E\u3002\uFF0E\uFF61]/g,
            b = {
              overflow: 'Overflow: input needs wider integers to process',
              'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
              'invalid-input': 'Invalid input'
            },
            T = c - u,
            x = Math.floor,
            w = String.fromCharCode;
          function E(t) {
            throw RangeError(b[t]);
          }
          function A(t, e) {
            for (var n = t.length, r = []; n--; ) r[n] = e(t[n]);
            return r;
          }
          function C(t, e) {
            var n = t.split('@'),
              r = '';
            return (
              n.length > 1 && ((r = n[0] + '@'), (t = n[1])),
              r + A((t = t.replace(y, '.')).split('.'), e).join('.')
            );
          }
          function P(t) {
            for (var e, n, r = [], i = 0, o = t.length; i < o; )
              (e = t.charCodeAt(i++)) >= 55296 && e <= 56319 && i < o
                ? 56320 == (64512 & (n = t.charCodeAt(i++)))
                  ? r.push(((1023 & e) << 10) + (1023 & n) + 65536)
                  : (r.push(e), i--)
                : r.push(e);
            return r;
          }
          function R(t) {
            return A(t, function(t) {
              var e = '';
              return (
                t > 65535 &&
                  ((e += w((((t -= 65536) >>> 10) & 1023) | 55296)),
                  (t = 56320 | (1023 & t))),
                (e += w(t))
              );
            }).join('');
          }
          function I(t, e) {
            return t + 22 + 75 * (t < 26) - ((0 != e) << 5);
          }
          function S(t, e, n) {
            var r = 0;
            for (
              t = n ? x(t / p) : t >> 1, t += x(t / e);
              t > (T * h) >> 1;
              r += c
            )
              t = x(t / T);
            return x(r + ((T + 1) * t) / (t + f));
          }
          function M(t) {
            var e,
              n,
              r,
              i,
              o,
              a,
              s,
              f,
              p,
              v,
              _,
              y = [],
              b = t.length,
              T = 0,
              w = m,
              A = d;
            for ((n = t.lastIndexOf(g)) < 0 && (n = 0), r = 0; r < n; ++r)
              t.charCodeAt(r) >= 128 && E('not-basic'), y.push(t.charCodeAt(r));
            for (i = n > 0 ? n + 1 : 0; i < b; ) {
              for (
                o = T, a = 1, s = c;
                i >= b && E('invalid-input'),
                  ((f =
                    (_ = t.charCodeAt(i++)) - 48 < 10
                      ? _ - 22
                      : _ - 65 < 26
                      ? _ - 65
                      : _ - 97 < 26
                      ? _ - 97
                      : c) >= c ||
                    f > x((l - T) / a)) &&
                    E('overflow'),
                  (T += f * a),
                  !(f < (p = s <= A ? u : s >= A + h ? h : s - A));
                s += c
              )
                a > x(l / (v = c - p)) && E('overflow'), (a *= v);
              (A = S(T - o, (e = y.length + 1), 0 == o)),
                x(T / e) > l - w && E('overflow'),
                (w += x(T / e)),
                (T %= e),
                y.splice(T++, 0, w);
            }
            return R(y);
          }
          function O(t) {
            var e,
              n,
              r,
              i,
              o,
              a,
              s,
              f,
              p,
              v,
              _,
              y,
              b,
              T,
              A,
              C = [];
            for (y = (t = P(t)).length, e = m, n = 0, o = d, a = 0; a < y; ++a)
              (_ = t[a]) < 128 && C.push(w(_));
            for (r = i = C.length, i && C.push(g); r < y; ) {
              for (s = l, a = 0; a < y; ++a)
                (_ = t[a]) >= e && _ < s && (s = _);
              for (
                s - e > x((l - n) / (b = r + 1)) && E('overflow'),
                  n += (s - e) * b,
                  e = s,
                  a = 0;
                a < y;
                ++a
              )
                if (((_ = t[a]) < e && ++n > l && E('overflow'), _ == e)) {
                  for (
                    f = n, p = c;
                    !(f < (v = p <= o ? u : p >= o + h ? h : p - o));
                    p += c
                  )
                    (A = f - v),
                      (T = c - v),
                      C.push(w(I(v + (A % T), 0))),
                      (f = x(A / T));
                  C.push(w(I(f, 0))), (o = S(n, b, r == i)), (n = 0), ++r;
                }
              ++n, ++e;
            }
            return C.join('');
          }
          (s = {
            version: '1.3.2',
            ucs2: { decode: P, encode: R },
            decode: M,
            encode: O,
            toASCII: function(t) {
              return C(t, function(t) {
                return _.test(t) ? 'xn--' + O(t) : t;
              });
            },
            toUnicode: function(t) {
              return C(t, function(t) {
                return v.test(t) ? M(t.slice(4).toLowerCase()) : t;
              });
            }
          }),
            void 0 ===
              (i = function() {
                return s;
              }.call(e, n, e, t)) || (t.exports = i);
        })();
      }.call(this, n('YuTi')(t), n('yLpj')));
    },
    nmnc: function(t, e, n) {
      var r = n('Kz5y').Symbol;
      t.exports = r;
    },
    'o/2B': function(t, e) {
      function n(t, e, n) {
        (this.shortMessage = e || ''),
          (this.longMessage = n || ''),
          (this.rawError = t || ''),
          (this.message = 'gl-shader: ' + (e || t || '') + (n ? '\n' + n : '')),
          (this.stack = new Error().stack);
      }
      (n.prototype = new Error()),
        (n.prototype.name = 'GLError'),
        (n.prototype.constructor = n),
        (t.exports = n);
    },
    'p/9t': function(t, e, n) {},
    pIo5: function(t, e, n) {
      'use strict';
      function r(t) {
        var e = 32;
        return (
          (t &= -t) && e--,
          65535 & t && (e -= 16),
          16711935 & t && (e -= 8),
          252645135 & t && (e -= 4),
          858993459 & t && (e -= 2),
          1431655765 & t && (e -= 1),
          e
        );
      }
      (e.INT_BITS = 32),
        (e.INT_MAX = 2147483647),
        (e.INT_MIN = -1 << 31),
        (e.sign = function(t) {
          return (t > 0) - (t < 0);
        }),
        (e.abs = function(t) {
          var e = t >> 31;
          return (t ^ e) - e;
        }),
        (e.min = function(t, e) {
          return e ^ ((t ^ e) & -(t < e));
        }),
        (e.max = function(t, e) {
          return t ^ ((t ^ e) & -(t < e));
        }),
        (e.isPow2 = function(t) {
          return !(t & (t - 1) || !t);
        }),
        (e.log2 = function(t) {
          var e, n;
          return (
            (e = (t > 65535) << 4),
            (e |= n = ((t >>>= e) > 255) << 3),
            (e |= n = ((t >>>= n) > 15) << 2),
            (e |= n = ((t >>>= n) > 3) << 1) | ((t >>>= n) >> 1)
          );
        }),
        (e.log10 = function(t) {
          return t >= 1e9
            ? 9
            : t >= 1e8
            ? 8
            : t >= 1e7
            ? 7
            : t >= 1e6
            ? 6
            : t >= 1e5
            ? 5
            : t >= 1e4
            ? 4
            : t >= 1e3
            ? 3
            : t >= 100
            ? 2
            : t >= 10
            ? 1
            : 0;
        }),
        (e.popCount = function(t) {
          return (
            (16843009 *
              (((t =
                (858993459 & (t -= (t >>> 1) & 1431655765)) +
                ((t >>> 2) & 858993459)) +
                (t >>> 4)) &
                252645135)) >>>
            24
          );
        }),
        (e.countTrailingZeros = r),
        (e.nextPow2 = function(t) {
          return (
            (t += 0 === t),
            --t,
            (t |= t >>> 1),
            (t |= t >>> 2),
            (t |= t >>> 4),
            (t |= t >>> 8),
            (t |= t >>> 16) + 1
          );
        }),
        (e.prevPow2 = function(t) {
          return (
            (t |= t >>> 1),
            (t |= t >>> 2),
            (t |= t >>> 4),
            (t |= t >>> 8),
            (t |= t >>> 16) - (t >>> 1)
          );
        }),
        (e.parity = function(t) {
          return (
            (t ^= t >>> 16),
            (t ^= t >>> 8),
            (t ^= t >>> 4),
            (27030 >>> (t &= 15)) & 1
          );
        });
      var i = new Array(256);
      !(function(t) {
        for (var e = 0; e < 256; ++e) {
          var n = e,
            r = e,
            i = 7;
          for (n >>>= 1; n; n >>>= 1) (r <<= 1), (r |= 1 & n), --i;
          t[e] = (r << i) & 255;
        }
      })(i),
        (e.reverse = function(t) {
          return (
            (i[255 & t] << 24) |
            (i[(t >>> 8) & 255] << 16) |
            (i[(t >>> 16) & 255] << 8) |
            i[(t >>> 24) & 255]
          );
        }),
        (e.interleave2 = function(t, e) {
          return (
            (t =
              1431655765 &
              ((t =
                858993459 &
                ((t =
                  252645135 &
                  ((t = 16711935 & ((t &= 65535) | (t << 8))) | (t << 4))) |
                  (t << 2))) |
                (t << 1))) |
            ((e =
              1431655765 &
              ((e =
                858993459 &
                ((e =
                  252645135 &
                  ((e = 16711935 & ((e &= 65535) | (e << 8))) | (e << 4))) |
                  (e << 2))) |
                (e << 1))) <<
              1)
          );
        }),
        (e.deinterleave2 = function(t, e) {
          return (
            ((t =
              65535 &
              ((t =
                16711935 &
                ((t =
                  252645135 &
                  ((t =
                    858993459 & ((t = (t >>> e) & 1431655765) | (t >>> 1))) |
                    (t >>> 2))) |
                  (t >>> 4))) |
                (t >>> 16))) <<
              16) >>
            16
          );
        }),
        (e.interleave3 = function(t, e, n) {
          return (
            (t =
              1227133513 &
              ((t =
                3272356035 &
                ((t =
                  251719695 &
                  ((t = 4278190335 & ((t &= 1023) | (t << 16))) | (t << 8))) |
                  (t << 4))) |
                (t << 2))),
            (t |=
              (e =
                1227133513 &
                ((e =
                  3272356035 &
                  ((e =
                    251719695 &
                    ((e = 4278190335 & ((e &= 1023) | (e << 16))) | (e << 8))) |
                    (e << 4))) |
                  (e << 2))) << 1) |
              ((n =
                1227133513 &
                ((n =
                  3272356035 &
                  ((n =
                    251719695 &
                    ((n = 4278190335 & ((n &= 1023) | (n << 16))) | (n << 8))) |
                    (n << 4))) |
                  (n << 2))) <<
                2)
          );
        }),
        (e.deinterleave3 = function(t, e) {
          return (
            ((t =
              1023 &
              ((t =
                4278190335 &
                ((t =
                  251719695 &
                  ((t =
                    3272356035 & ((t = (t >>> e) & 1227133513) | (t >>> 2))) |
                    (t >>> 4))) |
                  (t >>> 8))) |
                (t >>> 16))) <<
              22) >>
            22
          );
        }),
        (e.nextCombination = function(t) {
          var e = t | (t - 1);
          return (e + 1) | (((~e & -~e) - 1) >>> (r(t) + 1));
        });
    },
    pynx: function(t, e, n) {},
    rhSW: function(t, e) {
      t.exports = {
        0: 'NONE',
        1: 'ONE',
        2: 'LINE_LOOP',
        3: 'LINE_STRIP',
        4: 'TRIANGLES',
        5: 'TRIANGLE_STRIP',
        6: 'TRIANGLE_FAN',
        256: 'DEPTH_BUFFER_BIT',
        512: 'NEVER',
        513: 'LESS',
        514: 'EQUAL',
        515: 'LEQUAL',
        516: 'GREATER',
        517: 'NOTEQUAL',
        518: 'GEQUAL',
        519: 'ALWAYS',
        768: 'SRC_COLOR',
        769: 'ONE_MINUS_SRC_COLOR',
        770: 'SRC_ALPHA',
        771: 'ONE_MINUS_SRC_ALPHA',
        772: 'DST_ALPHA',
        773: 'ONE_MINUS_DST_ALPHA',
        774: 'DST_COLOR',
        775: 'ONE_MINUS_DST_COLOR',
        776: 'SRC_ALPHA_SATURATE',
        1024: 'STENCIL_BUFFER_BIT',
        1028: 'FRONT',
        1029: 'BACK',
        1032: 'FRONT_AND_BACK',
        1280: 'INVALID_ENUM',
        1281: 'INVALID_VALUE',
        1282: 'INVALID_OPERATION',
        1285: 'OUT_OF_MEMORY',
        1286: 'INVALID_FRAMEBUFFER_OPERATION',
        2304: 'CW',
        2305: 'CCW',
        2849: 'LINE_WIDTH',
        2884: 'CULL_FACE',
        2885: 'CULL_FACE_MODE',
        2886: 'FRONT_FACE',
        2928: 'DEPTH_RANGE',
        2929: 'DEPTH_TEST',
        2930: 'DEPTH_WRITEMASK',
        2931: 'DEPTH_CLEAR_VALUE',
        2932: 'DEPTH_FUNC',
        2960: 'STENCIL_TEST',
        2961: 'STENCIL_CLEAR_VALUE',
        2962: 'STENCIL_FUNC',
        2963: 'STENCIL_VALUE_MASK',
        2964: 'STENCIL_FAIL',
        2965: 'STENCIL_PASS_DEPTH_FAIL',
        2966: 'STENCIL_PASS_DEPTH_PASS',
        2967: 'STENCIL_REF',
        2968: 'STENCIL_WRITEMASK',
        2978: 'VIEWPORT',
        3024: 'DITHER',
        3042: 'BLEND',
        3088: 'SCISSOR_BOX',
        3089: 'SCISSOR_TEST',
        3106: 'COLOR_CLEAR_VALUE',
        3107: 'COLOR_WRITEMASK',
        3317: 'UNPACK_ALIGNMENT',
        3333: 'PACK_ALIGNMENT',
        3379: 'MAX_TEXTURE_SIZE',
        3386: 'MAX_VIEWPORT_DIMS',
        3408: 'SUBPIXEL_BITS',
        3410: 'RED_BITS',
        3411: 'GREEN_BITS',
        3412: 'BLUE_BITS',
        3413: 'ALPHA_BITS',
        3414: 'DEPTH_BITS',
        3415: 'STENCIL_BITS',
        3553: 'TEXTURE_2D',
        4352: 'DONT_CARE',
        4353: 'FASTEST',
        4354: 'NICEST',
        5120: 'BYTE',
        5121: 'UNSIGNED_BYTE',
        5122: 'SHORT',
        5123: 'UNSIGNED_SHORT',
        5124: 'INT',
        5125: 'UNSIGNED_INT',
        5126: 'FLOAT',
        5386: 'INVERT',
        5890: 'TEXTURE',
        6401: 'STENCIL_INDEX',
        6402: 'DEPTH_COMPONENT',
        6406: 'ALPHA',
        6407: 'RGB',
        6408: 'RGBA',
        6409: 'LUMINANCE',
        6410: 'LUMINANCE_ALPHA',
        7680: 'KEEP',
        7681: 'REPLACE',
        7682: 'INCR',
        7683: 'DECR',
        7936: 'VENDOR',
        7937: 'RENDERER',
        7938: 'VERSION',
        9728: 'NEAREST',
        9729: 'LINEAR',
        9984: 'NEAREST_MIPMAP_NEAREST',
        9985: 'LINEAR_MIPMAP_NEAREST',
        9986: 'NEAREST_MIPMAP_LINEAR',
        9987: 'LINEAR_MIPMAP_LINEAR',
        10240: 'TEXTURE_MAG_FILTER',
        10241: 'TEXTURE_MIN_FILTER',
        10242: 'TEXTURE_WRAP_S',
        10243: 'TEXTURE_WRAP_T',
        10497: 'REPEAT',
        10752: 'POLYGON_OFFSET_UNITS',
        16384: 'COLOR_BUFFER_BIT',
        32769: 'CONSTANT_COLOR',
        32770: 'ONE_MINUS_CONSTANT_COLOR',
        32771: 'CONSTANT_ALPHA',
        32772: 'ONE_MINUS_CONSTANT_ALPHA',
        32773: 'BLEND_COLOR',
        32774: 'FUNC_ADD',
        32777: 'BLEND_EQUATION_RGB',
        32778: 'FUNC_SUBTRACT',
        32779: 'FUNC_REVERSE_SUBTRACT',
        32819: 'UNSIGNED_SHORT_4_4_4_4',
        32820: 'UNSIGNED_SHORT_5_5_5_1',
        32823: 'POLYGON_OFFSET_FILL',
        32824: 'POLYGON_OFFSET_FACTOR',
        32854: 'RGBA4',
        32855: 'RGB5_A1',
        32873: 'TEXTURE_BINDING_2D',
        32926: 'SAMPLE_ALPHA_TO_COVERAGE',
        32928: 'SAMPLE_COVERAGE',
        32936: 'SAMPLE_BUFFERS',
        32937: 'SAMPLES',
        32938: 'SAMPLE_COVERAGE_VALUE',
        32939: 'SAMPLE_COVERAGE_INVERT',
        32968: 'BLEND_DST_RGB',
        32969: 'BLEND_SRC_RGB',
        32970: 'BLEND_DST_ALPHA',
        32971: 'BLEND_SRC_ALPHA',
        33071: 'CLAMP_TO_EDGE',
        33170: 'GENERATE_MIPMAP_HINT',
        33189: 'DEPTH_COMPONENT16',
        33306: 'DEPTH_STENCIL_ATTACHMENT',
        33635: 'UNSIGNED_SHORT_5_6_5',
        33648: 'MIRRORED_REPEAT',
        33901: 'ALIASED_POINT_SIZE_RANGE',
        33902: 'ALIASED_LINE_WIDTH_RANGE',
        33984: 'TEXTURE0',
        33985: 'TEXTURE1',
        33986: 'TEXTURE2',
        33987: 'TEXTURE3',
        33988: 'TEXTURE4',
        33989: 'TEXTURE5',
        33990: 'TEXTURE6',
        33991: 'TEXTURE7',
        33992: 'TEXTURE8',
        33993: 'TEXTURE9',
        33994: 'TEXTURE10',
        33995: 'TEXTURE11',
        33996: 'TEXTURE12',
        33997: 'TEXTURE13',
        33998: 'TEXTURE14',
        33999: 'TEXTURE15',
        34e3: 'TEXTURE16',
        34001: 'TEXTURE17',
        34002: 'TEXTURE18',
        34003: 'TEXTURE19',
        34004: 'TEXTURE20',
        34005: 'TEXTURE21',
        34006: 'TEXTURE22',
        34007: 'TEXTURE23',
        34008: 'TEXTURE24',
        34009: 'TEXTURE25',
        34010: 'TEXTURE26',
        34011: 'TEXTURE27',
        34012: 'TEXTURE28',
        34013: 'TEXTURE29',
        34014: 'TEXTURE30',
        34015: 'TEXTURE31',
        34016: 'ACTIVE_TEXTURE',
        34024: 'MAX_RENDERBUFFER_SIZE',
        34041: 'DEPTH_STENCIL',
        34055: 'INCR_WRAP',
        34056: 'DECR_WRAP',
        34067: 'TEXTURE_CUBE_MAP',
        34068: 'TEXTURE_BINDING_CUBE_MAP',
        34069: 'TEXTURE_CUBE_MAP_POSITIVE_X',
        34070: 'TEXTURE_CUBE_MAP_NEGATIVE_X',
        34071: 'TEXTURE_CUBE_MAP_POSITIVE_Y',
        34072: 'TEXTURE_CUBE_MAP_NEGATIVE_Y',
        34073: 'TEXTURE_CUBE_MAP_POSITIVE_Z',
        34074: 'TEXTURE_CUBE_MAP_NEGATIVE_Z',
        34076: 'MAX_CUBE_MAP_TEXTURE_SIZE',
        34338: 'VERTEX_ATTRIB_ARRAY_ENABLED',
        34339: 'VERTEX_ATTRIB_ARRAY_SIZE',
        34340: 'VERTEX_ATTRIB_ARRAY_STRIDE',
        34341: 'VERTEX_ATTRIB_ARRAY_TYPE',
        34342: 'CURRENT_VERTEX_ATTRIB',
        34373: 'VERTEX_ATTRIB_ARRAY_POINTER',
        34466: 'NUM_COMPRESSED_TEXTURE_FORMATS',
        34467: 'COMPRESSED_TEXTURE_FORMATS',
        34660: 'BUFFER_SIZE',
        34661: 'BUFFER_USAGE',
        34816: 'STENCIL_BACK_FUNC',
        34817: 'STENCIL_BACK_FAIL',
        34818: 'STENCIL_BACK_PASS_DEPTH_FAIL',
        34819: 'STENCIL_BACK_PASS_DEPTH_PASS',
        34877: 'BLEND_EQUATION_ALPHA',
        34921: 'MAX_VERTEX_ATTRIBS',
        34922: 'VERTEX_ATTRIB_ARRAY_NORMALIZED',
        34930: 'MAX_TEXTURE_IMAGE_UNITS',
        34962: 'ARRAY_BUFFER',
        34963: 'ELEMENT_ARRAY_BUFFER',
        34964: 'ARRAY_BUFFER_BINDING',
        34965: 'ELEMENT_ARRAY_BUFFER_BINDING',
        34975: 'VERTEX_ATTRIB_ARRAY_BUFFER_BINDING',
        35040: 'STREAM_DRAW',
        35044: 'STATIC_DRAW',
        35048: 'DYNAMIC_DRAW',
        35632: 'FRAGMENT_SHADER',
        35633: 'VERTEX_SHADER',
        35660: 'MAX_VERTEX_TEXTURE_IMAGE_UNITS',
        35661: 'MAX_COMBINED_TEXTURE_IMAGE_UNITS',
        35663: 'SHADER_TYPE',
        35664: 'FLOAT_VEC2',
        35665: 'FLOAT_VEC3',
        35666: 'FLOAT_VEC4',
        35667: 'INT_VEC2',
        35668: 'INT_VEC3',
        35669: 'INT_VEC4',
        35670: 'BOOL',
        35671: 'BOOL_VEC2',
        35672: 'BOOL_VEC3',
        35673: 'BOOL_VEC4',
        35674: 'FLOAT_MAT2',
        35675: 'FLOAT_MAT3',
        35676: 'FLOAT_MAT4',
        35678: 'SAMPLER_2D',
        35680: 'SAMPLER_CUBE',
        35712: 'DELETE_STATUS',
        35713: 'COMPILE_STATUS',
        35714: 'LINK_STATUS',
        35715: 'VALIDATE_STATUS',
        35716: 'INFO_LOG_LENGTH',
        35717: 'ATTACHED_SHADERS',
        35718: 'ACTIVE_UNIFORMS',
        35719: 'ACTIVE_UNIFORM_MAX_LENGTH',
        35720: 'SHADER_SOURCE_LENGTH',
        35721: 'ACTIVE_ATTRIBUTES',
        35722: 'ACTIVE_ATTRIBUTE_MAX_LENGTH',
        35724: 'SHADING_LANGUAGE_VERSION',
        35725: 'CURRENT_PROGRAM',
        36003: 'STENCIL_BACK_REF',
        36004: 'STENCIL_BACK_VALUE_MASK',
        36005: 'STENCIL_BACK_WRITEMASK',
        36006: 'FRAMEBUFFER_BINDING',
        36007: 'RENDERBUFFER_BINDING',
        36048: 'FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE',
        36049: 'FRAMEBUFFER_ATTACHMENT_OBJECT_NAME',
        36050: 'FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL',
        36051: 'FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE',
        36053: 'FRAMEBUFFER_COMPLETE',
        36054: 'FRAMEBUFFER_INCOMPLETE_ATTACHMENT',
        36055: 'FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT',
        36057: 'FRAMEBUFFER_INCOMPLETE_DIMENSIONS',
        36061: 'FRAMEBUFFER_UNSUPPORTED',
        36064: 'COLOR_ATTACHMENT0',
        36096: 'DEPTH_ATTACHMENT',
        36128: 'STENCIL_ATTACHMENT',
        36160: 'FRAMEBUFFER',
        36161: 'RENDERBUFFER',
        36162: 'RENDERBUFFER_WIDTH',
        36163: 'RENDERBUFFER_HEIGHT',
        36164: 'RENDERBUFFER_INTERNAL_FORMAT',
        36168: 'STENCIL_INDEX8',
        36176: 'RENDERBUFFER_RED_SIZE',
        36177: 'RENDERBUFFER_GREEN_SIZE',
        36178: 'RENDERBUFFER_BLUE_SIZE',
        36179: 'RENDERBUFFER_ALPHA_SIZE',
        36180: 'RENDERBUFFER_DEPTH_SIZE',
        36181: 'RENDERBUFFER_STENCIL_SIZE',
        36194: 'RGB565',
        36336: 'LOW_FLOAT',
        36337: 'MEDIUM_FLOAT',
        36338: 'HIGH_FLOAT',
        36339: 'LOW_INT',
        36340: 'MEDIUM_INT',
        36341: 'HIGH_INT',
        36346: 'SHADER_COMPILER',
        36347: 'MAX_VERTEX_UNIFORM_VECTORS',
        36348: 'MAX_VARYING_VECTORS',
        36349: 'MAX_FRAGMENT_UNIFORM_VECTORS',
        37440: 'UNPACK_FLIP_Y_WEBGL',
        37441: 'UNPACK_PREMULTIPLY_ALPHA_WEBGL',
        37442: 'CONTEXT_LOST_WEBGL',
        37443: 'UNPACK_COLORSPACE_CONVERSION_WEBGL',
        37444: 'BROWSER_DEFAULT_WEBGL'
      };
    },
    s4NR: function(t, e, n) {
      'use strict';
      (e.decode = e.parse = n('kd2E')), (e.encode = e.stringify = n('4JlD'));
    },
    sEfC: function(t, e, n) {
      var r = n('GoyQ'),
        i = n('QIyF'),
        o = n('tLB3'),
        a = 'Expected a function',
        s = Math.max,
        l = Math.min;
      t.exports = function(t, e, n) {
        var c,
          u,
          h,
          f,
          p,
          d,
          m = 0,
          g = !1,
          v = !1,
          _ = !0;
        if ('function' != typeof t) throw new TypeError(a);
        function y(e) {
          var n = c,
            r = u;
          return (c = u = void 0), (m = e), (f = t.apply(r, n));
        }
        function b(t) {
          var n = t - d;
          return void 0 === d || n >= e || n < 0 || (v && t - m >= h);
        }
        function T() {
          var t = i();
          if (b(t)) return x(t);
          p = setTimeout(
            T,
            (function(t) {
              var n = e - (t - d);
              return v ? l(n, h - (t - m)) : n;
            })(t)
          );
        }
        function x(t) {
          return (p = void 0), _ && c ? y(t) : ((c = u = void 0), f);
        }
        function w() {
          var t = i(),
            n = b(t);
          if (((c = arguments), (u = this), (d = t), n)) {
            if (void 0 === p)
              return (function(t) {
                return (m = t), (p = setTimeout(T, e)), g ? y(t) : f;
              })(d);
            if (v) return clearTimeout(p), (p = setTimeout(T, e)), y(d);
          }
          return void 0 === p && (p = setTimeout(T, e)), f;
        }
        return (
          (e = o(e) || 0),
          r(n) &&
            ((g = !!n.leading),
            (h = (v = 'maxWait' in n) ? s(o(n.maxWait) || 0, e) : h),
            (_ = 'trailing' in n ? !!n.trailing : _)),
          (w.cancel = function() {
            void 0 !== p && clearTimeout(p), (m = 0), (c = d = u = p = void 0);
          }),
          (w.flush = function() {
            return void 0 === p ? f : x(i());
          }),
          w
        );
      };
    },
    st01: function(t, e, n) {
      var r = n('AAS3'),
        i = n('6v/u');
      t.exports = function(t) {
        for (var e = Array.isArray(t) ? t : r(t), n = 0; n < e.length; n++) {
          var o = e[n];
          if ('preprocessor' === o.type) {
            var a = o.data.match(/\#define\s+SHADER_NAME(_B64)?\s+(.+)$/);
            if (a && a[2]) {
              var s = a[1],
                l = a[2];
              return (s ? i(l) : l).trim();
            }
          }
        }
      };
    },
    szI9: function(t, e) {
      t.exports = function(t, e) {
        var n = { identity: e },
          r = t.valueOf;
        return (
          Object.defineProperty(t, 'valueOf', {
            value: function(t) {
              return t !== e ? r.apply(this, arguments) : n;
            },
            writable: !0
          }),
          n
        );
      };
    },
    tCpK: function(t, e, n) {
      var r = n('rhSW');
      t.exports = function(t) {
        return r[t];
      };
    },
    tLB3: function(t, e, n) {
      var r = n('GoyQ'),
        i = n('/9aa'),
        o = NaN,
        a = /^\s+|\s+$/g,
        s = /^[-+]0x[0-9a-f]+$/i,
        l = /^0b[01]+$/i,
        c = /^0o[0-7]+$/i,
        u = parseInt;
      t.exports = function(t) {
        if ('number' == typeof t) return t;
        if (i(t)) return o;
        if (r(t)) {
          var e = 'function' == typeof t.valueOf ? t.valueOf() : t;
          t = r(e) ? e + '' : e;
        }
        if ('string' != typeof t) return 0 === t ? t : +t;
        t = t.replace(a, '');
        var n = l.test(t);
        return n || c.test(t) ? u(t.slice(2), n ? 2 : 8) : s.test(t) ? o : +t;
      };
    },
    tbvF: function(t, e, n) {
      var r = n('IDFI'),
        i = n('BEtg'),
        o = 'undefined' != typeof Float64Array;
      function a(t, e) {
        return t[0] - e[0];
      }
      function s() {
        var t,
          e = this.stride,
          n = new Array(e.length);
        for (t = 0; t < n.length; ++t) n[t] = [Math.abs(e[t]), t];
        n.sort(a);
        var r = new Array(n.length);
        for (t = 0; t < r.length; ++t) r[t] = n[t][1];
        return r;
      }
      function l(t, e) {
        var n = ['View', e, 'd', t].join('');
        e < 0 && (n = 'View_Nil' + t);
        var i = 'generic' === t;
        if (-1 === e) {
          var o =
            'function ' +
            n +
            '(a){this.data=a;};var proto=' +
            n +
            ".prototype;proto.dtype='" +
            t +
            "';proto.index=function(){return -1};proto.size=0;proto.dimension=-1;proto.shape=proto.stride=proto.order=[];proto.lo=proto.hi=proto.transpose=proto.step=function(){return new " +
            n +
            '(this.data);};proto.get=proto.set=function(){};proto.pick=function(){return null};return function construct_' +
            n +
            '(a){return new ' +
            n +
            '(a);}';
          return new Function(o)();
        }
        if (0 === e) {
          o =
            'function ' +
            n +
            '(a,d) {this.data = a;this.offset = d};var proto=' +
            n +
            ".prototype;proto.dtype='" +
            t +
            "';proto.index=function(){return this.offset};proto.dimension=0;proto.size=1;proto.shape=proto.stride=proto.order=[];proto.lo=proto.hi=proto.transpose=proto.step=function " +
            n +
            '_copy() {return new ' +
            n +
            '(this.data,this.offset)};proto.pick=function ' +
            n +
            '_pick(){return TrivialArray(this.data);};proto.valueOf=proto.get=function ' +
            n +
            '_get(){return ' +
            (i ? 'this.data.get(this.offset)' : 'this.data[this.offset]') +
            '};proto.set=function ' +
            n +
            '_set(v){return ' +
            (i ? 'this.data.set(this.offset,v)' : 'this.data[this.offset]=v') +
            '};return function construct_' +
            n +
            '(a,b,c,d){return new ' +
            n +
            '(a,d)}';
          return new Function('TrivialArray', o)(c[t][0]);
        }
        o = ["'use strict'"];
        var a = r(e),
          l = a.map(function(t) {
            return 'i' + t;
          }),
          u =
            'this.offset+' +
            a
              .map(function(t) {
                return 'this.stride[' + t + ']*i' + t;
              })
              .join('+'),
          h = a
            .map(function(t) {
              return 'b' + t;
            })
            .join(','),
          f = a
            .map(function(t) {
              return 'c' + t;
            })
            .join(',');
        o.push(
          'function ' + n + '(a,' + h + ',' + f + ',d){this.data=a',
          'this.shape=[' + h + ']',
          'this.stride=[' + f + ']',
          'this.offset=d|0}',
          'var proto=' + n + '.prototype',
          "proto.dtype='" + t + "'",
          'proto.dimension=' + e
        ),
          o.push(
            "Object.defineProperty(proto,'size',{get:function " +
              n +
              '_size(){return ' +
              a
                .map(function(t) {
                  return 'this.shape[' + t + ']';
                })
                .join('*'),
            '}})'
          ),
          1 === e
            ? o.push('proto.order=[0]')
            : (o.push("Object.defineProperty(proto,'order',{get:"),
              e < 4
                ? (o.push('function ' + n + '_order(){'),
                  2 === e
                    ? o.push(
                        'return (Math.abs(this.stride[0])>Math.abs(this.stride[1]))?[1,0]:[0,1]}})'
                      )
                    : 3 === e &&
                      o.push(
                        'var s0=Math.abs(this.stride[0]),s1=Math.abs(this.stride[1]),s2=Math.abs(this.stride[2]);if(s0>s1){if(s1>s2){return [2,1,0];}else if(s0>s2){return [1,2,0];}else{return [1,0,2];}}else if(s0>s2){return [2,0,1];}else if(s2>s1){return [0,1,2];}else{return [0,2,1];}}})'
                      ))
                : o.push('ORDER})')),
          o.push('proto.set=function ' + n + '_set(' + l.join(',') + ',v){'),
          i
            ? o.push('return this.data.set(' + u + ',v)}')
            : o.push('return this.data[' + u + ']=v}'),
          o.push('proto.get=function ' + n + '_get(' + l.join(',') + '){'),
          i
            ? o.push('return this.data.get(' + u + ')}')
            : o.push('return this.data[' + u + ']}'),
          o.push(
            'proto.index=function ' + n + '_index(',
            l.join(),
            '){return ' + u + '}'
          ),
          o.push(
            'proto.hi=function ' +
              n +
              '_hi(' +
              l.join(',') +
              '){return new ' +
              n +
              '(this.data,' +
              a
                .map(function(t) {
                  return [
                    '(typeof i',
                    t,
                    "!=='number'||i",
                    t,
                    '<0)?this.shape[',
                    t,
                    ']:i',
                    t,
                    '|0'
                  ].join('');
                })
                .join(',') +
              ',' +
              a
                .map(function(t) {
                  return 'this.stride[' + t + ']';
                })
                .join(',') +
              ',this.offset)}'
          );
        var p = a.map(function(t) {
            return 'a' + t + '=this.shape[' + t + ']';
          }),
          d = a.map(function(t) {
            return 'c' + t + '=this.stride[' + t + ']';
          });
        o.push(
          'proto.lo=function ' +
            n +
            '_lo(' +
            l.join(',') +
            '){var b=this.offset,d=0,' +
            p.join(',') +
            ',' +
            d.join(',')
        );
        for (var m = 0; m < e; ++m)
          o.push(
            'if(typeof i' +
              m +
              "==='number'&&i" +
              m +
              '>=0){d=i' +
              m +
              '|0;b+=c' +
              m +
              '*d;a' +
              m +
              '-=d}'
          );
        o.push(
          'return new ' +
            n +
            '(this.data,' +
            a
              .map(function(t) {
                return 'a' + t;
              })
              .join(',') +
            ',' +
            a
              .map(function(t) {
                return 'c' + t;
              })
              .join(',') +
            ',b)}'
        ),
          o.push(
            'proto.step=function ' +
              n +
              '_step(' +
              l.join(',') +
              '){var ' +
              a
                .map(function(t) {
                  return 'a' + t + '=this.shape[' + t + ']';
                })
                .join(',') +
              ',' +
              a
                .map(function(t) {
                  return 'b' + t + '=this.stride[' + t + ']';
                })
                .join(',') +
              ',c=this.offset,d=0,ceil=Math.ceil'
          );
        for (m = 0; m < e; ++m)
          o.push(
            'if(typeof i' +
              m +
              "==='number'){d=i" +
              m +
              '|0;if(d<0){c+=b' +
              m +
              '*(a' +
              m +
              '-1);a' +
              m +
              '=ceil(-a' +
              m +
              '/d)}else{a' +
              m +
              '=ceil(a' +
              m +
              '/d)}b' +
              m +
              '*=d}'
          );
        o.push(
          'return new ' +
            n +
            '(this.data,' +
            a
              .map(function(t) {
                return 'a' + t;
              })
              .join(',') +
            ',' +
            a
              .map(function(t) {
                return 'b' + t;
              })
              .join(',') +
            ',c)}'
        );
        var g = new Array(e),
          v = new Array(e);
        for (m = 0; m < e; ++m)
          (g[m] = 'a[i' + m + ']'), (v[m] = 'b[i' + m + ']');
        o.push(
          'proto.transpose=function ' +
            n +
            '_transpose(' +
            l +
            '){' +
            l
              .map(function(t, e) {
                return t + '=(' + t + '===undefined?' + e + ':' + t + '|0)';
              })
              .join(';'),
          'var a=this.shape,b=this.stride;return new ' +
            n +
            '(this.data,' +
            g.join(',') +
            ',' +
            v.join(',') +
            ',this.offset)}'
        ),
          o.push(
            'proto.pick=function ' +
              n +
              '_pick(' +
              l +
              '){var a=[],b=[],c=this.offset'
          );
        for (m = 0; m < e; ++m)
          o.push(
            'if(typeof i' +
              m +
              "==='number'&&i" +
              m +
              '>=0){c=(c+this.stride[' +
              m +
              ']*i' +
              m +
              ')|0}else{a.push(this.shape[' +
              m +
              ']);b.push(this.stride[' +
              m +
              '])}'
          );
        return (
          o.push(
            'var ctor=CTOR_LIST[a.length+1];return ctor(this.data,a,b,c)}'
          ),
          o.push(
            'return function construct_' +
              n +
              '(data,shape,stride,offset){return new ' +
              n +
              '(data,' +
              a
                .map(function(t) {
                  return 'shape[' + t + ']';
                })
                .join(',') +
              ',' +
              a
                .map(function(t) {
                  return 'stride[' + t + ']';
                })
                .join(',') +
              ',offset)}'
          ),
          new Function('CTOR_LIST', 'ORDER', o.join('\n'))(c[t], s)
        );
      }
      var c = {
        float32: [],
        float64: [],
        int8: [],
        int16: [],
        int32: [],
        uint8: [],
        uint16: [],
        uint32: [],
        array: [],
        uint8_clamped: [],
        buffer: [],
        generic: []
      };
      t.exports = function(t, e, n, r) {
        if (void 0 === t) return (0, c.array[0])([]);
        'number' == typeof t && (t = [t]), void 0 === e && (e = [t.length]);
        var a = e.length;
        if (void 0 === n) {
          n = new Array(a);
          for (var s = a - 1, u = 1; s >= 0; --s) (n[s] = u), (u *= e[s]);
        }
        if (void 0 === r)
          for (r = 0, s = 0; s < a; ++s) n[s] < 0 && (r -= (e[s] - 1) * n[s]);
        for (
          var h = (function(t) {
              if (i(t)) return 'buffer';
              if (o)
                switch (Object.prototype.toString.call(t)) {
                  case '[object Float64Array]':
                    return 'float64';
                  case '[object Float32Array]':
                    return 'float32';
                  case '[object Int8Array]':
                    return 'int8';
                  case '[object Int16Array]':
                    return 'int16';
                  case '[object Int32Array]':
                    return 'int32';
                  case '[object Uint8Array]':
                    return 'uint8';
                  case '[object Uint16Array]':
                    return 'uint16';
                  case '[object Uint32Array]':
                    return 'uint32';
                  case '[object Uint8ClampedArray]':
                    return 'uint8_clamped';
                }
              return Array.isArray(t) ? 'array' : 'generic';
            })(t),
            f = c[h];
          f.length <= a + 1;

        )
          f.push(l(h, f.length - 1));
        return (0, f[a + 1])(t, e, n, r);
      };
    },
    tjlA: function(t, e, n) {
      'use strict';
      (function(t) {
        /*!
         * The buffer module from node.js, for the browser.
         *
         * @author   Feross Aboukhadijeh <http://feross.org>
         * @license  MIT
         */
        var r = n('H7XF'),
          i = n('kVK+'),
          o = n('IzUq');
        function a() {
          return l.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
        }
        function s(t, e) {
          if (a() < e) throw new RangeError('Invalid typed array length');
          return (
            l.TYPED_ARRAY_SUPPORT
              ? ((t = new Uint8Array(e)).__proto__ = l.prototype)
              : (null === t && (t = new l(e)), (t.length = e)),
            t
          );
        }
        function l(t, e, n) {
          if (!(l.TYPED_ARRAY_SUPPORT || this instanceof l))
            return new l(t, e, n);
          if ('number' == typeof t) {
            if ('string' == typeof e)
              throw new Error(
                'If encoding is specified then the first argument must be a string'
              );
            return h(this, t);
          }
          return c(this, t, e, n);
        }
        function c(t, e, n, r) {
          if ('number' == typeof e)
            throw new TypeError('"value" argument must not be a number');
          return 'undefined' != typeof ArrayBuffer && e instanceof ArrayBuffer
            ? (function(t, e, n, r) {
                if ((e.byteLength, n < 0 || e.byteLength < n))
                  throw new RangeError("'offset' is out of bounds");
                if (e.byteLength < n + (r || 0))
                  throw new RangeError("'length' is out of bounds");
                e =
                  void 0 === n && void 0 === r
                    ? new Uint8Array(e)
                    : void 0 === r
                    ? new Uint8Array(e, n)
                    : new Uint8Array(e, n, r);
                l.TYPED_ARRAY_SUPPORT
                  ? ((t = e).__proto__ = l.prototype)
                  : (t = f(t, e));
                return t;
              })(t, e, n, r)
            : 'string' == typeof e
            ? (function(t, e, n) {
                ('string' == typeof n && '' !== n) || (n = 'utf8');
                if (!l.isEncoding(n))
                  throw new TypeError(
                    '"encoding" must be a valid string encoding'
                  );
                var r = 0 | d(e, n),
                  i = (t = s(t, r)).write(e, n);
                i !== r && (t = t.slice(0, i));
                return t;
              })(t, e, n)
            : (function(t, e) {
                if (l.isBuffer(e)) {
                  var n = 0 | p(e.length);
                  return 0 === (t = s(t, n)).length
                    ? t
                    : (e.copy(t, 0, 0, n), t);
                }
                if (e) {
                  if (
                    ('undefined' != typeof ArrayBuffer &&
                      e.buffer instanceof ArrayBuffer) ||
                    'length' in e
                  )
                    return 'number' != typeof e.length || (r = e.length) != r
                      ? s(t, 0)
                      : f(t, e);
                  if ('Buffer' === e.type && o(e.data)) return f(t, e.data);
                }
                var r;
                throw new TypeError(
                  'First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.'
                );
              })(t, e);
        }
        function u(t) {
          if ('number' != typeof t)
            throw new TypeError('"size" argument must be a number');
          if (t < 0)
            throw new RangeError('"size" argument must not be negative');
        }
        function h(t, e) {
          if ((u(e), (t = s(t, e < 0 ? 0 : 0 | p(e))), !l.TYPED_ARRAY_SUPPORT))
            for (var n = 0; n < e; ++n) t[n] = 0;
          return t;
        }
        function f(t, e) {
          var n = e.length < 0 ? 0 : 0 | p(e.length);
          t = s(t, n);
          for (var r = 0; r < n; r += 1) t[r] = 255 & e[r];
          return t;
        }
        function p(t) {
          if (t >= a())
            throw new RangeError(
              'Attempt to allocate Buffer larger than maximum size: 0x' +
                a().toString(16) +
                ' bytes'
            );
          return 0 | t;
        }
        function d(t, e) {
          if (l.isBuffer(t)) return t.length;
          if (
            'undefined' != typeof ArrayBuffer &&
            'function' == typeof ArrayBuffer.isView &&
            (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)
          )
            return t.byteLength;
          'string' != typeof t && (t = '' + t);
          var n = t.length;
          if (0 === n) return 0;
          for (var r = !1; ; )
            switch (e) {
              case 'ascii':
              case 'latin1':
              case 'binary':
                return n;
              case 'utf8':
              case 'utf-8':
              case void 0:
                return j(t).length;
              case 'ucs2':
              case 'ucs-2':
              case 'utf16le':
              case 'utf-16le':
                return 2 * n;
              case 'hex':
                return n >>> 1;
              case 'base64':
                return V(t).length;
              default:
                if (r) return j(t).length;
                (e = ('' + e).toLowerCase()), (r = !0);
            }
        }
        function m(t, e, n) {
          var r = !1;
          if (((void 0 === e || e < 0) && (e = 0), e > this.length)) return '';
          if (((void 0 === n || n > this.length) && (n = this.length), n <= 0))
            return '';
          if ((n >>>= 0) <= (e >>>= 0)) return '';
          for (t || (t = 'utf8'); ; )
            switch (t) {
              case 'hex':
                return S(this, e, n);
              case 'utf8':
              case 'utf-8':
                return C(this, e, n);
              case 'ascii':
                return R(this, e, n);
              case 'latin1':
              case 'binary':
                return I(this, e, n);
              case 'base64':
                return A(this, e, n);
              case 'ucs2':
              case 'ucs-2':
              case 'utf16le':
              case 'utf-16le':
                return M(this, e, n);
              default:
                if (r) throw new TypeError('Unknown encoding: ' + t);
                (t = (t + '').toLowerCase()), (r = !0);
            }
        }
        function g(t, e, n) {
          var r = t[e];
          (t[e] = t[n]), (t[n] = r);
        }
        function v(t, e, n, r, i) {
          if (0 === t.length) return -1;
          if (
            ('string' == typeof n
              ? ((r = n), (n = 0))
              : n > 2147483647
              ? (n = 2147483647)
              : n < -2147483648 && (n = -2147483648),
            (n = +n),
            isNaN(n) && (n = i ? 0 : t.length - 1),
            n < 0 && (n = t.length + n),
            n >= t.length)
          ) {
            if (i) return -1;
            n = t.length - 1;
          } else if (n < 0) {
            if (!i) return -1;
            n = 0;
          }
          if (('string' == typeof e && (e = l.from(e, r)), l.isBuffer(e)))
            return 0 === e.length ? -1 : _(t, e, n, r, i);
          if ('number' == typeof e)
            return (
              (e &= 255),
              l.TYPED_ARRAY_SUPPORT &&
              'function' == typeof Uint8Array.prototype.indexOf
                ? i
                  ? Uint8Array.prototype.indexOf.call(t, e, n)
                  : Uint8Array.prototype.lastIndexOf.call(t, e, n)
                : _(t, [e], n, r, i)
            );
          throw new TypeError('val must be string, number or Buffer');
        }
        function _(t, e, n, r, i) {
          var o,
            a = 1,
            s = t.length,
            l = e.length;
          if (
            void 0 !== r &&
            ('ucs2' === (r = String(r).toLowerCase()) ||
              'ucs-2' === r ||
              'utf16le' === r ||
              'utf-16le' === r)
          ) {
            if (t.length < 2 || e.length < 2) return -1;
            (a = 2), (s /= 2), (l /= 2), (n /= 2);
          }
          function c(t, e) {
            return 1 === a ? t[e] : t.readUInt16BE(e * a);
          }
          if (i) {
            var u = -1;
            for (o = n; o < s; o++)
              if (c(t, o) === c(e, -1 === u ? 0 : o - u)) {
                if ((-1 === u && (u = o), o - u + 1 === l)) return u * a;
              } else -1 !== u && (o -= o - u), (u = -1);
          } else
            for (n + l > s && (n = s - l), o = n; o >= 0; o--) {
              for (var h = !0, f = 0; f < l; f++)
                if (c(t, o + f) !== c(e, f)) {
                  h = !1;
                  break;
                }
              if (h) return o;
            }
          return -1;
        }
        function y(t, e, n, r) {
          n = Number(n) || 0;
          var i = t.length - n;
          r ? (r = Number(r)) > i && (r = i) : (r = i);
          var o = e.length;
          if (o % 2 != 0) throw new TypeError('Invalid hex string');
          r > o / 2 && (r = o / 2);
          for (var a = 0; a < r; ++a) {
            var s = parseInt(e.substr(2 * a, 2), 16);
            if (isNaN(s)) return a;
            t[n + a] = s;
          }
          return a;
        }
        function b(t, e, n, r) {
          return X(j(e, t.length - n), t, n, r);
        }
        function T(t, e, n, r) {
          return X(
            (function(t) {
              for (var e = [], n = 0; n < t.length; ++n)
                e.push(255 & t.charCodeAt(n));
              return e;
            })(e),
            t,
            n,
            r
          );
        }
        function x(t, e, n, r) {
          return T(t, e, n, r);
        }
        function w(t, e, n, r) {
          return X(V(e), t, n, r);
        }
        function E(t, e, n, r) {
          return X(
            (function(t, e) {
              for (
                var n, r, i, o = [], a = 0;
                a < t.length && !((e -= 2) < 0);
                ++a
              )
                (n = t.charCodeAt(a)),
                  (r = n >> 8),
                  (i = n % 256),
                  o.push(i),
                  o.push(r);
              return o;
            })(e, t.length - n),
            t,
            n,
            r
          );
        }
        function A(t, e, n) {
          return 0 === e && n === t.length
            ? r.fromByteArray(t)
            : r.fromByteArray(t.slice(e, n));
        }
        function C(t, e, n) {
          n = Math.min(t.length, n);
          for (var r = [], i = e; i < n; ) {
            var o,
              a,
              s,
              l,
              c = t[i],
              u = null,
              h = c > 239 ? 4 : c > 223 ? 3 : c > 191 ? 2 : 1;
            if (i + h <= n)
              switch (h) {
                case 1:
                  c < 128 && (u = c);
                  break;
                case 2:
                  128 == (192 & (o = t[i + 1])) &&
                    (l = ((31 & c) << 6) | (63 & o)) > 127 &&
                    (u = l);
                  break;
                case 3:
                  (o = t[i + 1]),
                    (a = t[i + 2]),
                    128 == (192 & o) &&
                      128 == (192 & a) &&
                      (l = ((15 & c) << 12) | ((63 & o) << 6) | (63 & a)) >
                        2047 &&
                      (l < 55296 || l > 57343) &&
                      (u = l);
                  break;
                case 4:
                  (o = t[i + 1]),
                    (a = t[i + 2]),
                    (s = t[i + 3]),
                    128 == (192 & o) &&
                      128 == (192 & a) &&
                      128 == (192 & s) &&
                      (l =
                        ((15 & c) << 18) |
                        ((63 & o) << 12) |
                        ((63 & a) << 6) |
                        (63 & s)) > 65535 &&
                      l < 1114112 &&
                      (u = l);
              }
            null === u
              ? ((u = 65533), (h = 1))
              : u > 65535 &&
                ((u -= 65536),
                r.push(((u >>> 10) & 1023) | 55296),
                (u = 56320 | (1023 & u))),
              r.push(u),
              (i += h);
          }
          return (function(t) {
            var e = t.length;
            if (e <= P) return String.fromCharCode.apply(String, t);
            var n = '',
              r = 0;
            for (; r < e; )
              n += String.fromCharCode.apply(String, t.slice(r, (r += P)));
            return n;
          })(r);
        }
        (e.Buffer = l),
          (e.SlowBuffer = function(t) {
            +t != t && (t = 0);
            return l.alloc(+t);
          }),
          (e.INSPECT_MAX_BYTES = 50),
          (l.TYPED_ARRAY_SUPPORT =
            void 0 !== t.TYPED_ARRAY_SUPPORT
              ? t.TYPED_ARRAY_SUPPORT
              : (function() {
                  try {
                    var t = new Uint8Array(1);
                    return (
                      (t.__proto__ = {
                        __proto__: Uint8Array.prototype,
                        foo: function() {
                          return 42;
                        }
                      }),
                      42 === t.foo() &&
                        'function' == typeof t.subarray &&
                        0 === t.subarray(1, 1).byteLength
                    );
                  } catch (t) {
                    return !1;
                  }
                })()),
          (e.kMaxLength = a()),
          (l.poolSize = 8192),
          (l._augment = function(t) {
            return (t.__proto__ = l.prototype), t;
          }),
          (l.from = function(t, e, n) {
            return c(null, t, e, n);
          }),
          l.TYPED_ARRAY_SUPPORT &&
            ((l.prototype.__proto__ = Uint8Array.prototype),
            (l.__proto__ = Uint8Array),
            'undefined' != typeof Symbol &&
              Symbol.species &&
              l[Symbol.species] === l &&
              Object.defineProperty(l, Symbol.species, {
                value: null,
                configurable: !0
              })),
          (l.alloc = function(t, e, n) {
            return (function(t, e, n, r) {
              return (
                u(e),
                e <= 0
                  ? s(t, e)
                  : void 0 !== n
                  ? 'string' == typeof r
                    ? s(t, e).fill(n, r)
                    : s(t, e).fill(n)
                  : s(t, e)
              );
            })(null, t, e, n);
          }),
          (l.allocUnsafe = function(t) {
            return h(null, t);
          }),
          (l.allocUnsafeSlow = function(t) {
            return h(null, t);
          }),
          (l.isBuffer = function(t) {
            return !(null == t || !t._isBuffer);
          }),
          (l.compare = function(t, e) {
            if (!l.isBuffer(t) || !l.isBuffer(e))
              throw new TypeError('Arguments must be Buffers');
            if (t === e) return 0;
            for (
              var n = t.length, r = e.length, i = 0, o = Math.min(n, r);
              i < o;
              ++i
            )
              if (t[i] !== e[i]) {
                (n = t[i]), (r = e[i]);
                break;
              }
            return n < r ? -1 : r < n ? 1 : 0;
          }),
          (l.isEncoding = function(t) {
            switch (String(t).toLowerCase()) {
              case 'hex':
              case 'utf8':
              case 'utf-8':
              case 'ascii':
              case 'latin1':
              case 'binary':
              case 'base64':
              case 'ucs2':
              case 'ucs-2':
              case 'utf16le':
              case 'utf-16le':
                return !0;
              default:
                return !1;
            }
          }),
          (l.concat = function(t, e) {
            if (!o(t))
              throw new TypeError(
                '"list" argument must be an Array of Buffers'
              );
            if (0 === t.length) return l.alloc(0);
            var n;
            if (void 0 === e)
              for (e = 0, n = 0; n < t.length; ++n) e += t[n].length;
            var r = l.allocUnsafe(e),
              i = 0;
            for (n = 0; n < t.length; ++n) {
              var a = t[n];
              if (!l.isBuffer(a))
                throw new TypeError(
                  '"list" argument must be an Array of Buffers'
                );
              a.copy(r, i), (i += a.length);
            }
            return r;
          }),
          (l.byteLength = d),
          (l.prototype._isBuffer = !0),
          (l.prototype.swap16 = function() {
            var t = this.length;
            if (t % 2 != 0)
              throw new RangeError('Buffer size must be a multiple of 16-bits');
            for (var e = 0; e < t; e += 2) g(this, e, e + 1);
            return this;
          }),
          (l.prototype.swap32 = function() {
            var t = this.length;
            if (t % 4 != 0)
              throw new RangeError('Buffer size must be a multiple of 32-bits');
            for (var e = 0; e < t; e += 4)
              g(this, e, e + 3), g(this, e + 1, e + 2);
            return this;
          }),
          (l.prototype.swap64 = function() {
            var t = this.length;
            if (t % 8 != 0)
              throw new RangeError('Buffer size must be a multiple of 64-bits');
            for (var e = 0; e < t; e += 8)
              g(this, e, e + 7),
                g(this, e + 1, e + 6),
                g(this, e + 2, e + 5),
                g(this, e + 3, e + 4);
            return this;
          }),
          (l.prototype.toString = function() {
            var t = 0 | this.length;
            return 0 === t
              ? ''
              : 0 === arguments.length
              ? C(this, 0, t)
              : m.apply(this, arguments);
          }),
          (l.prototype.equals = function(t) {
            if (!l.isBuffer(t))
              throw new TypeError('Argument must be a Buffer');
            return this === t || 0 === l.compare(this, t);
          }),
          (l.prototype.inspect = function() {
            var t = '',
              n = e.INSPECT_MAX_BYTES;
            return (
              this.length > 0 &&
                ((t = this.toString('hex', 0, n)
                  .match(/.{2}/g)
                  .join(' ')),
                this.length > n && (t += ' ... ')),
              '<Buffer ' + t + '>'
            );
          }),
          (l.prototype.compare = function(t, e, n, r, i) {
            if (!l.isBuffer(t))
              throw new TypeError('Argument must be a Buffer');
            if (
              (void 0 === e && (e = 0),
              void 0 === n && (n = t ? t.length : 0),
              void 0 === r && (r = 0),
              void 0 === i && (i = this.length),
              e < 0 || n > t.length || r < 0 || i > this.length)
            )
              throw new RangeError('out of range index');
            if (r >= i && e >= n) return 0;
            if (r >= i) return -1;
            if (e >= n) return 1;
            if (this === t) return 0;
            for (
              var o = (i >>>= 0) - (r >>>= 0),
                a = (n >>>= 0) - (e >>>= 0),
                s = Math.min(o, a),
                c = this.slice(r, i),
                u = t.slice(e, n),
                h = 0;
              h < s;
              ++h
            )
              if (c[h] !== u[h]) {
                (o = c[h]), (a = u[h]);
                break;
              }
            return o < a ? -1 : a < o ? 1 : 0;
          }),
          (l.prototype.includes = function(t, e, n) {
            return -1 !== this.indexOf(t, e, n);
          }),
          (l.prototype.indexOf = function(t, e, n) {
            return v(this, t, e, n, !0);
          }),
          (l.prototype.lastIndexOf = function(t, e, n) {
            return v(this, t, e, n, !1);
          }),
          (l.prototype.write = function(t, e, n, r) {
            if (void 0 === e) (r = 'utf8'), (n = this.length), (e = 0);
            else if (void 0 === n && 'string' == typeof e)
              (r = e), (n = this.length), (e = 0);
            else {
              if (!isFinite(e))
                throw new Error(
                  'Buffer.write(string, encoding, offset[, length]) is no longer supported'
                );
              (e |= 0),
                isFinite(n)
                  ? ((n |= 0), void 0 === r && (r = 'utf8'))
                  : ((r = n), (n = void 0));
            }
            var i = this.length - e;
            if (
              ((void 0 === n || n > i) && (n = i),
              (t.length > 0 && (n < 0 || e < 0)) || e > this.length)
            )
              throw new RangeError('Attempt to write outside buffer bounds');
            r || (r = 'utf8');
            for (var o = !1; ; )
              switch (r) {
                case 'hex':
                  return y(this, t, e, n);
                case 'utf8':
                case 'utf-8':
                  return b(this, t, e, n);
                case 'ascii':
                  return T(this, t, e, n);
                case 'latin1':
                case 'binary':
                  return x(this, t, e, n);
                case 'base64':
                  return w(this, t, e, n);
                case 'ucs2':
                case 'ucs-2':
                case 'utf16le':
                case 'utf-16le':
                  return E(this, t, e, n);
                default:
                  if (o) throw new TypeError('Unknown encoding: ' + r);
                  (r = ('' + r).toLowerCase()), (o = !0);
              }
          }),
          (l.prototype.toJSON = function() {
            return {
              type: 'Buffer',
              data: Array.prototype.slice.call(this._arr || this, 0)
            };
          });
        var P = 4096;
        function R(t, e, n) {
          var r = '';
          n = Math.min(t.length, n);
          for (var i = e; i < n; ++i) r += String.fromCharCode(127 & t[i]);
          return r;
        }
        function I(t, e, n) {
          var r = '';
          n = Math.min(t.length, n);
          for (var i = e; i < n; ++i) r += String.fromCharCode(t[i]);
          return r;
        }
        function S(t, e, n) {
          var r = t.length;
          (!e || e < 0) && (e = 0), (!n || n < 0 || n > r) && (n = r);
          for (var i = '', o = e; o < n; ++o) i += z(t[o]);
          return i;
        }
        function M(t, e, n) {
          for (var r = t.slice(e, n), i = '', o = 0; o < r.length; o += 2)
            i += String.fromCharCode(r[o] + 256 * r[o + 1]);
          return i;
        }
        function O(t, e, n) {
          if (t % 1 != 0 || t < 0) throw new RangeError('offset is not uint');
          if (t + e > n)
            throw new RangeError('Trying to access beyond buffer length');
        }
        function k(t, e, n, r, i, o) {
          if (!l.isBuffer(t))
            throw new TypeError('"buffer" argument must be a Buffer instance');
          if (e > i || e < o)
            throw new RangeError('"value" argument is out of bounds');
          if (n + r > t.length) throw new RangeError('Index out of range');
        }
        function N(t, e, n, r) {
          e < 0 && (e = 65535 + e + 1);
          for (var i = 0, o = Math.min(t.length - n, 2); i < o; ++i)
            t[n + i] =
              (e & (255 << (8 * (r ? i : 1 - i)))) >>> (8 * (r ? i : 1 - i));
        }
        function D(t, e, n, r) {
          e < 0 && (e = 4294967295 + e + 1);
          for (var i = 0, o = Math.min(t.length - n, 4); i < o; ++i)
            t[n + i] = (e >>> (8 * (r ? i : 3 - i))) & 255;
        }
        function F(t, e, n, r, i, o) {
          if (n + r > t.length) throw new RangeError('Index out of range');
          if (n < 0) throw new RangeError('Index out of range');
        }
        function L(t, e, n, r, o) {
          return o || F(t, 0, n, 4), i.write(t, e, n, r, 23, 4), n + 4;
        }
        function U(t, e, n, r, o) {
          return o || F(t, 0, n, 8), i.write(t, e, n, r, 52, 8), n + 8;
        }
        (l.prototype.slice = function(t, e) {
          var n,
            r = this.length;
          if (
            ((t = ~~t) < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r),
            (e = void 0 === e ? r : ~~e) < 0
              ? (e += r) < 0 && (e = 0)
              : e > r && (e = r),
            e < t && (e = t),
            l.TYPED_ARRAY_SUPPORT)
          )
            (n = this.subarray(t, e)).__proto__ = l.prototype;
          else {
            var i = e - t;
            n = new l(i, void 0);
            for (var o = 0; o < i; ++o) n[o] = this[o + t];
          }
          return n;
        }),
          (l.prototype.readUIntLE = function(t, e, n) {
            (t |= 0), (e |= 0), n || O(t, e, this.length);
            for (var r = this[t], i = 1, o = 0; ++o < e && (i *= 256); )
              r += this[t + o] * i;
            return r;
          }),
          (l.prototype.readUIntBE = function(t, e, n) {
            (t |= 0), (e |= 0), n || O(t, e, this.length);
            for (var r = this[t + --e], i = 1; e > 0 && (i *= 256); )
              r += this[t + --e] * i;
            return r;
          }),
          (l.prototype.readUInt8 = function(t, e) {
            return e || O(t, 1, this.length), this[t];
          }),
          (l.prototype.readUInt16LE = function(t, e) {
            return e || O(t, 2, this.length), this[t] | (this[t + 1] << 8);
          }),
          (l.prototype.readUInt16BE = function(t, e) {
            return e || O(t, 2, this.length), (this[t] << 8) | this[t + 1];
          }),
          (l.prototype.readUInt32LE = function(t, e) {
            return (
              e || O(t, 4, this.length),
              (this[t] | (this[t + 1] << 8) | (this[t + 2] << 16)) +
                16777216 * this[t + 3]
            );
          }),
          (l.prototype.readUInt32BE = function(t, e) {
            return (
              e || O(t, 4, this.length),
              16777216 * this[t] +
                ((this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3])
            );
          }),
          (l.prototype.readIntLE = function(t, e, n) {
            (t |= 0), (e |= 0), n || O(t, e, this.length);
            for (var r = this[t], i = 1, o = 0; ++o < e && (i *= 256); )
              r += this[t + o] * i;
            return r >= (i *= 128) && (r -= Math.pow(2, 8 * e)), r;
          }),
          (l.prototype.readIntBE = function(t, e, n) {
            (t |= 0), (e |= 0), n || O(t, e, this.length);
            for (var r = e, i = 1, o = this[t + --r]; r > 0 && (i *= 256); )
              o += this[t + --r] * i;
            return o >= (i *= 128) && (o -= Math.pow(2, 8 * e)), o;
          }),
          (l.prototype.readInt8 = function(t, e) {
            return (
              e || O(t, 1, this.length),
              128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
            );
          }),
          (l.prototype.readInt16LE = function(t, e) {
            e || O(t, 2, this.length);
            var n = this[t] | (this[t + 1] << 8);
            return 32768 & n ? 4294901760 | n : n;
          }),
          (l.prototype.readInt16BE = function(t, e) {
            e || O(t, 2, this.length);
            var n = this[t + 1] | (this[t] << 8);
            return 32768 & n ? 4294901760 | n : n;
          }),
          (l.prototype.readInt32LE = function(t, e) {
            return (
              e || O(t, 4, this.length),
              this[t] |
                (this[t + 1] << 8) |
                (this[t + 2] << 16) |
                (this[t + 3] << 24)
            );
          }),
          (l.prototype.readInt32BE = function(t, e) {
            return (
              e || O(t, 4, this.length),
              (this[t] << 24) |
                (this[t + 1] << 16) |
                (this[t + 2] << 8) |
                this[t + 3]
            );
          }),
          (l.prototype.readFloatLE = function(t, e) {
            return e || O(t, 4, this.length), i.read(this, t, !0, 23, 4);
          }),
          (l.prototype.readFloatBE = function(t, e) {
            return e || O(t, 4, this.length), i.read(this, t, !1, 23, 4);
          }),
          (l.prototype.readDoubleLE = function(t, e) {
            return e || O(t, 8, this.length), i.read(this, t, !0, 52, 8);
          }),
          (l.prototype.readDoubleBE = function(t, e) {
            return e || O(t, 8, this.length), i.read(this, t, !1, 52, 8);
          }),
          (l.prototype.writeUIntLE = function(t, e, n, r) {
            ((t = +t), (e |= 0), (n |= 0), r) ||
              k(this, t, e, n, Math.pow(2, 8 * n) - 1, 0);
            var i = 1,
              o = 0;
            for (this[e] = 255 & t; ++o < n && (i *= 256); )
              this[e + o] = (t / i) & 255;
            return e + n;
          }),
          (l.prototype.writeUIntBE = function(t, e, n, r) {
            ((t = +t), (e |= 0), (n |= 0), r) ||
              k(this, t, e, n, Math.pow(2, 8 * n) - 1, 0);
            var i = n - 1,
              o = 1;
            for (this[e + i] = 255 & t; --i >= 0 && (o *= 256); )
              this[e + i] = (t / o) & 255;
            return e + n;
          }),
          (l.prototype.writeUInt8 = function(t, e, n) {
            return (
              (t = +t),
              (e |= 0),
              n || k(this, t, e, 1, 255, 0),
              l.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
              (this[e] = 255 & t),
              e + 1
            );
          }),
          (l.prototype.writeUInt16LE = function(t, e, n) {
            return (
              (t = +t),
              (e |= 0),
              n || k(this, t, e, 2, 65535, 0),
              l.TYPED_ARRAY_SUPPORT
                ? ((this[e] = 255 & t), (this[e + 1] = t >>> 8))
                : N(this, t, e, !0),
              e + 2
            );
          }),
          (l.prototype.writeUInt16BE = function(t, e, n) {
            return (
              (t = +t),
              (e |= 0),
              n || k(this, t, e, 2, 65535, 0),
              l.TYPED_ARRAY_SUPPORT
                ? ((this[e] = t >>> 8), (this[e + 1] = 255 & t))
                : N(this, t, e, !1),
              e + 2
            );
          }),
          (l.prototype.writeUInt32LE = function(t, e, n) {
            return (
              (t = +t),
              (e |= 0),
              n || k(this, t, e, 4, 4294967295, 0),
              l.TYPED_ARRAY_SUPPORT
                ? ((this[e + 3] = t >>> 24),
                  (this[e + 2] = t >>> 16),
                  (this[e + 1] = t >>> 8),
                  (this[e] = 255 & t))
                : D(this, t, e, !0),
              e + 4
            );
          }),
          (l.prototype.writeUInt32BE = function(t, e, n) {
            return (
              (t = +t),
              (e |= 0),
              n || k(this, t, e, 4, 4294967295, 0),
              l.TYPED_ARRAY_SUPPORT
                ? ((this[e] = t >>> 24),
                  (this[e + 1] = t >>> 16),
                  (this[e + 2] = t >>> 8),
                  (this[e + 3] = 255 & t))
                : D(this, t, e, !1),
              e + 4
            );
          }),
          (l.prototype.writeIntLE = function(t, e, n, r) {
            if (((t = +t), (e |= 0), !r)) {
              var i = Math.pow(2, 8 * n - 1);
              k(this, t, e, n, i - 1, -i);
            }
            var o = 0,
              a = 1,
              s = 0;
            for (this[e] = 255 & t; ++o < n && (a *= 256); )
              t < 0 && 0 === s && 0 !== this[e + o - 1] && (s = 1),
                (this[e + o] = (((t / a) >> 0) - s) & 255);
            return e + n;
          }),
          (l.prototype.writeIntBE = function(t, e, n, r) {
            if (((t = +t), (e |= 0), !r)) {
              var i = Math.pow(2, 8 * n - 1);
              k(this, t, e, n, i - 1, -i);
            }
            var o = n - 1,
              a = 1,
              s = 0;
            for (this[e + o] = 255 & t; --o >= 0 && (a *= 256); )
              t < 0 && 0 === s && 0 !== this[e + o + 1] && (s = 1),
                (this[e + o] = (((t / a) >> 0) - s) & 255);
            return e + n;
          }),
          (l.prototype.writeInt8 = function(t, e, n) {
            return (
              (t = +t),
              (e |= 0),
              n || k(this, t, e, 1, 127, -128),
              l.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
              t < 0 && (t = 255 + t + 1),
              (this[e] = 255 & t),
              e + 1
            );
          }),
          (l.prototype.writeInt16LE = function(t, e, n) {
            return (
              (t = +t),
              (e |= 0),
              n || k(this, t, e, 2, 32767, -32768),
              l.TYPED_ARRAY_SUPPORT
                ? ((this[e] = 255 & t), (this[e + 1] = t >>> 8))
                : N(this, t, e, !0),
              e + 2
            );
          }),
          (l.prototype.writeInt16BE = function(t, e, n) {
            return (
              (t = +t),
              (e |= 0),
              n || k(this, t, e, 2, 32767, -32768),
              l.TYPED_ARRAY_SUPPORT
                ? ((this[e] = t >>> 8), (this[e + 1] = 255 & t))
                : N(this, t, e, !1),
              e + 2
            );
          }),
          (l.prototype.writeInt32LE = function(t, e, n) {
            return (
              (t = +t),
              (e |= 0),
              n || k(this, t, e, 4, 2147483647, -2147483648),
              l.TYPED_ARRAY_SUPPORT
                ? ((this[e] = 255 & t),
                  (this[e + 1] = t >>> 8),
                  (this[e + 2] = t >>> 16),
                  (this[e + 3] = t >>> 24))
                : D(this, t, e, !0),
              e + 4
            );
          }),
          (l.prototype.writeInt32BE = function(t, e, n) {
            return (
              (t = +t),
              (e |= 0),
              n || k(this, t, e, 4, 2147483647, -2147483648),
              t < 0 && (t = 4294967295 + t + 1),
              l.TYPED_ARRAY_SUPPORT
                ? ((this[e] = t >>> 24),
                  (this[e + 1] = t >>> 16),
                  (this[e + 2] = t >>> 8),
                  (this[e + 3] = 255 & t))
                : D(this, t, e, !1),
              e + 4
            );
          }),
          (l.prototype.writeFloatLE = function(t, e, n) {
            return L(this, t, e, !0, n);
          }),
          (l.prototype.writeFloatBE = function(t, e, n) {
            return L(this, t, e, !1, n);
          }),
          (l.prototype.writeDoubleLE = function(t, e, n) {
            return U(this, t, e, !0, n);
          }),
          (l.prototype.writeDoubleBE = function(t, e, n) {
            return U(this, t, e, !1, n);
          }),
          (l.prototype.copy = function(t, e, n, r) {
            if (
              (n || (n = 0),
              r || 0 === r || (r = this.length),
              e >= t.length && (e = t.length),
              e || (e = 0),
              r > 0 && r < n && (r = n),
              r === n)
            )
              return 0;
            if (0 === t.length || 0 === this.length) return 0;
            if (e < 0) throw new RangeError('targetStart out of bounds');
            if (n < 0 || n >= this.length)
              throw new RangeError('sourceStart out of bounds');
            if (r < 0) throw new RangeError('sourceEnd out of bounds');
            r > this.length && (r = this.length),
              t.length - e < r - n && (r = t.length - e + n);
            var i,
              o = r - n;
            if (this === t && n < e && e < r)
              for (i = o - 1; i >= 0; --i) t[i + e] = this[i + n];
            else if (o < 1e3 || !l.TYPED_ARRAY_SUPPORT)
              for (i = 0; i < o; ++i) t[i + e] = this[i + n];
            else Uint8Array.prototype.set.call(t, this.subarray(n, n + o), e);
            return o;
          }),
          (l.prototype.fill = function(t, e, n, r) {
            if ('string' == typeof t) {
              if (
                ('string' == typeof e
                  ? ((r = e), (e = 0), (n = this.length))
                  : 'string' == typeof n && ((r = n), (n = this.length)),
                1 === t.length)
              ) {
                var i = t.charCodeAt(0);
                i < 256 && (t = i);
              }
              if (void 0 !== r && 'string' != typeof r)
                throw new TypeError('encoding must be a string');
              if ('string' == typeof r && !l.isEncoding(r))
                throw new TypeError('Unknown encoding: ' + r);
            } else 'number' == typeof t && (t &= 255);
            if (e < 0 || this.length < e || this.length < n)
              throw new RangeError('Out of range index');
            if (n <= e) return this;
            var o;
            if (
              ((e >>>= 0),
              (n = void 0 === n ? this.length : n >>> 0),
              t || (t = 0),
              'number' == typeof t)
            )
              for (o = e; o < n; ++o) this[o] = t;
            else {
              var a = l.isBuffer(t) ? t : j(new l(t, r).toString()),
                s = a.length;
              for (o = 0; o < n - e; ++o) this[o + e] = a[o % s];
            }
            return this;
          });
        var B = /[^+\/0-9A-Za-z-_]/g;
        function z(t) {
          return t < 16 ? '0' + t.toString(16) : t.toString(16);
        }
        function j(t, e) {
          var n;
          e = e || 1 / 0;
          for (var r = t.length, i = null, o = [], a = 0; a < r; ++a) {
            if ((n = t.charCodeAt(a)) > 55295 && n < 57344) {
              if (!i) {
                if (n > 56319) {
                  (e -= 3) > -1 && o.push(239, 191, 189);
                  continue;
                }
                if (a + 1 === r) {
                  (e -= 3) > -1 && o.push(239, 191, 189);
                  continue;
                }
                i = n;
                continue;
              }
              if (n < 56320) {
                (e -= 3) > -1 && o.push(239, 191, 189), (i = n);
                continue;
              }
              n = 65536 + (((i - 55296) << 10) | (n - 56320));
            } else i && (e -= 3) > -1 && o.push(239, 191, 189);
            if (((i = null), n < 128)) {
              if ((e -= 1) < 0) break;
              o.push(n);
            } else if (n < 2048) {
              if ((e -= 2) < 0) break;
              o.push((n >> 6) | 192, (63 & n) | 128);
            } else if (n < 65536) {
              if ((e -= 3) < 0) break;
              o.push((n >> 12) | 224, ((n >> 6) & 63) | 128, (63 & n) | 128);
            } else {
              if (!(n < 1114112)) throw new Error('Invalid code point');
              if ((e -= 4) < 0) break;
              o.push(
                (n >> 18) | 240,
                ((n >> 12) & 63) | 128,
                ((n >> 6) & 63) | 128,
                (63 & n) | 128
              );
            }
          }
          return o;
        }
        function V(t) {
          return r.toByteArray(
            (function(t) {
              if (
                (t = (function(t) {
                  return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, '');
                })(t).replace(B, '')).length < 2
              )
                return '';
              for (; t.length % 4 != 0; ) t += '=';
              return t;
            })(t)
          );
        }
        function X(t, e, n, r) {
          for (var i = 0; i < r && !(i + n >= e.length || i >= t.length); ++i)
            e[i + n] = t[i];
          return i;
        }
      }.call(this, n('yLpj')));
    },
    u50I: function(t, e, n) {
      'use strict';
      (function(t) {
        n.d(e, 'a', function() {
          return r;
        });
        var r = function() {
          var e = /(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
            n = t('.l-newsletter'),
            r = t('#newsletter_userEmail'),
            i = t('#newsletter_newsletterAcceptance'),
            o = t('#newsletter_submit'),
            a = t('.l-newsletter__caret');
          function s() {
            var t = r.val();
            if (t.length > 100) return !1;
            if (!e.test(t)) return !1;
            var n = t.split('@');
            return (
              !(n[0].length > 64) &&
              !n[1].split('.').some(function(t) {
                return t.length > 40;
              })
            );
          }
          function l() {
            s() && i.prop('checked')
              ? o.prop('disabled', !1)
              : o.prop('disabled', !0);
          }
          var c = !1;
          i
            .on('change', l)
            .on('mouseover', function() {
              c = !0;
            })
            .on('mouseout', function() {
              c = !1;
            }),
            r
              .on('focus', function() {
                n.addClass('l-newsletter--focus');
              })
              .on('blur', function() {
                '' !== t(this).val() ||
                  c ||
                  (n.removeClass('l-newsletter--focus'),
                  n.removeClass('l-newsletter--invalid'));
              })
              .on('keyup', function() {
                s()
                  ? n.removeClass('l-newsletter--invalid')
                  : n.addClass('l-newsletter--invalid'),
                  l();
              })
              .on('input', function() {
                t(this).val().length
                  ? (t(this).removeClass('empty'), a.hide())
                  : (t(this).addClass('empty'), a.show());
              })
              .addClass('empty'),
            t(document).on('submit', 'form[name="newsletter"]', function(e) {
              if ((e.preventDefault(), o.prop('disabled'))) return !1;
              var r = t(this).serialize();
              o.prop('disabled', !0),
                i.prop('disabled', !0),
                n.addClass('l-newsletter--loading'),
                t
                  .ajax({
                    type: t(this).attr('method'),
                    url: t(this).attr('action'),
                    data: r
                  })
                  .done(function(e) {
                    t('.l-newsletter-socials').addClass(
                      'l-newsletter-socials--newsletter-success'
                    );
                    var n = t('.l-newsletter-socials h2');
                    201 === e.status
                      ? n.html(
                          '<strong>'
                            .concat(n.data('success-title'), '</strong><span>')
                            .concat(n.data('success-text'), '</span>')
                        )
                      : n.html(
                          '<strong>'
                            .concat(n.data('already-title'), '</strong><span>')
                            .concat(n.data('already-text'), '</span>')
                        );
                  })
                  .fail(function(e, n, r) {
                    t('.l-newsletter-socials').addClass(
                      'l-newsletter-socials--newsletter-error'
                    );
                    var i = t('.l-newsletter-socials h2');
                    i.html(
                      '<strong>'
                        .concat(i.data('error-title'), '</strong><span>')
                        .concat(i.data('error-text'), '</span>')
                    );
                  })
                  .always(function() {});
            });
        };
      }.call(this, n('EVdn')));
    },
    uD3L: function(t, e, n) {
      'use strict';
      Object.defineProperty(e, '__esModule', { value: !0 });
      var r,
        i =
          Object.assign ||
          function(t) {
            for (var e = 1; e < arguments.length; e++) {
              var n = arguments[e];
              for (var r in n)
                Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
            }
            return t;
          },
        o = n('KN1S'),
        a = (r = o) && r.__esModule ? r : { default: r };
      var s =
          'attribute vec2 _p;\nvarying vec2 _uv;\nvoid main() {\ngl_Position = vec4(_p,0.0,1.0);\n_uv = vec2(0.5, 0.5) * (_p+vec2(1.0, 1.0));\n}',
        l = {
          cover: function(t) {
            return (
              '.5+(uv-.5)*vec2(min(ratio/' + t + ',1.),min(' + t + '/ratio,1.))'
            );
          },
          contain: function(t) {
            return (
              '.5+(uv-.5)*vec2(max(ratio/' + t + ',1.),max(' + t + '/ratio,1.))'
            );
          },
          stretch: function() {
            return 'uv';
          }
        },
        c = function(t, e) {
          var n = l[e];
          if (!n) throw new Error('invalid resizeMode=' + e);
          return (
            'precision highp float;varying vec2 _uv;uniform sampler2D from, to;uniform float progress, ratio, _fromR, _toR;vec4 getFromColor(vec2 uv){return texture2D(from,' +
            n('_fromR') +
            ');}vec4 getToColor(vec2 uv){return texture2D(to,' +
            n('_toR') +
            ');}\n' +
            t +
            '\nvoid main(){gl_FragColor=transition(_uv);}'
          );
        };
      e.default = function(t, e) {
        var n =
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
          r = i({ resizeMode: 'cover' }, n),
          o = r.resizeMode,
          l = (0, a.default)(t, s, c(e.glsl, o));
        return (
          l.bind(),
          l.attributes._p.pointer(),
          {
            draw: function(n, r, i) {
              var o =
                  arguments.length > 3 && void 0 !== arguments[3]
                    ? arguments[3]
                    : t.drawingBufferWidth,
                a =
                  arguments.length > 4 && void 0 !== arguments[4]
                    ? arguments[4]
                    : t.drawingBufferHeight,
                s =
                  arguments.length > 5 && void 0 !== arguments[5]
                    ? arguments[5]
                    : {};
              l.bind(),
                (l.uniforms.ratio = o / a),
                (l.uniforms.progress = n),
                (l.uniforms.from = r.bind(0)),
                (l.uniforms.to = i.bind(1)),
                (l.uniforms._fromR = r.shape[0] / r.shape[1]),
                (l.uniforms._toR = i.shape[0] / i.shape[1]);
              var c = 2;
              for (var u in e.paramsTypes) {
                var h = u in s ? s[u] : e.defaultParams[u];
                if ('sampler2D' === e.paramsTypes[u])
                  if (h) {
                    if ('function' != typeof h.bind)
                      throw new Error(
                        'uniform[' +
                          u +
                          ']: A gl-texture2d API-like object was expected'
                      );
                    l.uniforms[u] = h.bind(c++);
                  } else
                    console.warn(
                      'uniform[' +
                        u +
                        ']: A texture MUST be defined for uniform sampler2D of a texture'
                    );
                else l.uniforms[u] = h;
              }
              t.drawArrays(t.TRIANGLES, 0, 3);
            },
            dispose: function() {
              l.dispose();
            }
          }
        );
      };
    },
    uLzS: function(t, e, n) {
      'use strict';
      (function(t) {
        n.d(e, 'a', function() {
          return s;
        });
        var r = n('f26Q'),
          i = n('k2/K'),
          o = n.n(i),
          a = n('QdZy'),
          s = function(e) {
            if (!e)
              if (Object(r.e)()) {
                t('.l-quotes .swiper-container').css('display', 'block');
                new a.a(t('.l-quotes .swiper-container')[0], {
                  autoplay: { delay: 5e3 },
                  loop: !0,
                  allowTouchMove: !1
                });
              } else {
                t('.l-quotes-canvas').css('display', 'block');
                var n = t('.l-quotes-canvas')[0],
                  i = n.getContext('2d'),
                  s = n.width,
                  l = n.height,
                  c = t('.l-quotes .swiper-slide'),
                  u = [],
                  h = 0,
                  f = 0;
                c.map(function(e, n) {
                  var r, i, a, s;
                  (r = t(n)
                    .find('.c-quote__text')
                    .text()),
                    (i = t(n)
                      .find('.c-quote__author')
                      .text()),
                    (a = document.documentElement.lang || 'en'),
                    (s = "\n<div style=\"text-align: center; font-family: BlenderProBold, sans-serif; width: 674px; padding: 0;\">\n<style>\n@font-face {\n  font-family: 'BlenderProBold';\n  src: url('/fonts/BlenderPro-Bold.woff') format('woff');\n}\n</style>\n<span id=\"qq1\" style=\"font-family: BlenderProBold, sans-serif; font-weight: bold; font-size: "
                      .concat(
                        'ja' === a ? 34 : 44,
                        'px; color: #02d8f3; line-height: 1.25; text-align: center; display: block; margin-bottom: 11px;">\n'
                      )
                      .concat(
                        r,
                        '\n</span>\n<div style="width: 200px; height: 1px; background: #02d8f3; margin: 0 auto;"></div>\n<span style="font-family: BlenderProBold, sans-serif; font-weight: bold; font-size: 20px; color: #02d8f3; padding: 8px 11px; display: inline-block;">\n'
                      )
                      .concat(i, '\n</span>\n</div>')),
                    o.a.drawHTML(s).then(function(t) {
                      u.push(t.image), u.length === c.length && d();
                    });
                });
              }
            function p(t, e) {
              return ~~(Math.random() * (e - t) + t);
            }
            function d() {
              var t, e, n;
              i.clearRect(0, 0, s, l);
              for (var r = 0; r < l / 5; r++)
                (t = p(1, 10)),
                  0,
                  (e = 5 * r),
                  (n = s),
                  i.drawImage(u[h], 0, e, n, 5, 0 + t, e, n - t, 5);
              f < 3
                ? (setTimeout(d, p(20, 80)),
                  2 === ++f && (h = h < u.length - 1 ? h + 1 : 0))
                : f < 6
                ? (setTimeout(d, p(20, 80)), f++)
                : (i.clearRect(0, 0, s, l),
                  i.drawImage(u[h], 0, 0),
                  (f = 0),
                  setTimeout(d, 5e3));
            }
          };
      }.call(this, n('EVdn')));
    },
    vFz4: function(t, e, n) {
      'use strict';
      (function(t) {
        n.d(e, 'a', function() {
          return i;
        }),
          n.d(e, 'b', function() {
            return o;
          });
        var r = n('z/o8'),
          i = function(e, n) {
            t(document).on('mouseenter', e, function() {
              var t = this;
              n && (t = this.querySelector(n)),
                r.b.set(t, { transformOrigin: '0 0' }),
                r.b.to(t, 0.3, {
                  y: '100%',
                  opacity: 0,
                  ease: Power2.easeIn,
                  onComplete: function() {
                    r.b.set(t, { y: '-100%' }),
                      r.b.to(t, 0.3, {
                        y: '0%',
                        opacity: 1,
                        ease: Power2.easeOut
                      });
                  }
                });
            });
          },
          o = function(e, n, i) {
            t(document).on('mouseenter', e, function() {
              var t = this;
              n && (t = this.querySelector(n)),
                r.b.set(t, { transformOrigin: '0 0' }),
                r.b.to(t, 0.3, {
                  x: i ? '-100%' : '100%',
                  opacity: 0,
                  ease: Power2.easeIn,
                  onComplete: function() {
                    r.b.set(t, { x: i ? '100%' : '-100%' }),
                      r.b.to(t, 0.3, {
                        x: '0%',
                        opacity: 1,
                        ease: Power2.easeOut
                      });
                  }
                });
            });
          };
      }.call(this, n('EVdn')));
    },
    vHxl: function(t, e, n) {
      'use strict';
      function r() {
        var t = document.querySelectorAll('.c-beep'),
          e =
            '···-- ···-- ·-·-·- ----· ---·· ----· ----· ···-- ·---- --··· --··-- -····- ·---- ·---- ---·· ·-·-·- ····- --··· ····· -···· ····· ··--- ····· ----· ----· ----· ----· ----· ----· ----·',
          n = 300,
          r = 0;
        function i() {
          for (var e = 0; e < t.length; e++)
            t[e].classList.remove('c-beep--active');
        }
        function o() {
          if (r > e.length - 1) return (r = 0), i(), void setTimeout(o, 7 * n);
          var s = e[r];
          !(function(e) {
            for (var n = 0; n < t.length; n++)
              e
                ? t[n].classList.add('c-beep--active')
                : t[n].classList.remove('c-beep--active');
          })(' ' !== s),
            setTimeout(
              a,
              (function(t) {
                if (' ' === t) return 3;
                if ('·' === t) return 1;
                if ('-' === t) return 3;
              })(s) * n
            ),
            r++;
        }
        function a() {
          i(), setTimeout(o, n);
        }
        t && o();
      }
      n.d(e, 'a', function() {
        return r;
      });
    },
    wdK6: function(t, e, n) {
      'use strict';
      n.d(e, 'a', function() {
        return i;
      });
      var r = n('QdZy');
      function i() {
        for (
          var t = '.l-gallery__swiper[data-type="videos"]',
            e = new r.a(''.concat(t, ' .swiper-container'), {
              speed: 400,
              spaceBetween: 35,
              slidesPerView: 'auto',
              freeMode: !0,
              navigation: {
                nextEl: ''.concat(t, ' .swiper-button-next'),
                prevEl: ''.concat(t, ' .swiper-button-prev')
              },
              slidesPerGroup: 2
            }),
            n = document.querySelector(
              ''.concat(t, ' .l-gallery__video iframe')
            ),
            i = document.querySelectorAll(''.concat(t, ' .swiper-slide')),
            o = function(t) {
              var e = i[t];
              e.addEventListener('click', function() {
                if (!e.classList.contains('disabled')) {
                  for (
                    var t = e.getAttribute('data-vid'),
                      r = e.getAttribute('data-player'),
                      o = 0;
                    o < i.length;
                    o++
                  )
                    i[o].classList.remove('active');
                  if ((e.classList.add('active'), 'yt' === r)) {
                    var a = 'https://www.youtube.com/embed/'.concat(
                      t,
                      '?rel=0'
                    );
                    n.setAttribute('src', a);
                  } else if ('youku' === r) {
                    var s = 'https://player.youku.com/embed/'.concat(
                      t,
                      '?client_id=f0ea8e6b70a5859d'
                    );
                    n.setAttribute('src', s);
                  }
                }
              });
            },
            a = 0;
          a < i.length;
          a++
        )
          o(a);
        function s() {
          for (var t = 0; t < i.length; t++) {
            i[t].classList.add('disabled');
          }
        }
        function l() {
          for (var t = 0; t < i.length; t++) {
            i[t].classList.remove('disabled');
          }
        }
        document.addEventListener('disableVideos', s),
          document.addEventListener('enableVideos', function() {
            l(), e.slides[0].click();
          }),
          n.previousSibling ? s() : (l(), e.slides[0].click());
      }
    },
    y81S: function(t, e, n) {
      'use strict';
      (function(t) {
        n.d(e, 'a', function() {
          return w;
        }),
          n.d(e, 'b', function() {
            return C;
          });
        n('g9XJ'), n('YisV');
        var r = n('Jbu2'),
          i = n.n(r),
          o = n('uD3L'),
          a = n.n(o),
          s = n('HVtM'),
          l = n.n(s),
          c = n('QdZy'),
          u = n('DzJC'),
          h = n.n(u),
          f = n('vFz4'),
          p = n('wdK6');
        function d(t) {
          return (
            (function(t) {
              if (Array.isArray(t)) {
                for (var e = 0, n = new Array(t.length); e < t.length; e++)
                  n[e] = t[e];
                return n;
              }
            })(t) ||
            (function(t) {
              if (
                Symbol.iterator in Object(t) ||
                '[object Arguments]' === Object.prototype.toString.call(t)
              )
                return Array.from(t);
            })(t) ||
            (function() {
              throw new TypeError(
                'Invalid attempt to spread non-iterable instance'
              );
            })()
          );
        }
        function m(t, e) {
          if (!(t instanceof e))
            throw new TypeError('Cannot call a class as a function');
        }
        function g(t, e) {
          for (var n = 0; n < e.length; n++) {
            var r = e[n];
            (r.enumerable = r.enumerable || !1),
              (r.configurable = !0),
              'value' in r && (r.writable = !0),
              Object.defineProperty(t, r.key, r);
          }
        }
        function v(t, e, n) {
          return e && g(t.prototype, e), n && g(t, n), t;
        }
        var _ = (function() {
          function t(e, n) {
            m(this, t),
              (this.ctx = e.getContext('2d')),
              (this.options = n),
              (this.frm = 0),
              (this.hratio = this.ctx.canvas.height / 442);
          }
          return (
            v(t, [
              {
                key: 'drawImage',
                value: function(t, e, n) {
                  (this.img = t),
                    this.ctx.drawImage(
                      t,
                      e,
                      n,
                      this.ctx.canvas.width,
                      this.ctx.canvas.height
                    );
                }
              },
              {
                key: 'glitchSlip',
                value: function(t, e, n) {
                  if (n < e) {
                    var r = n;
                    (n = e), (e = r);
                  }
                  for (var i = e; i < n; i++) {
                    Math.random() < 0.1 && i++;
                    var o = this.ctx.getImageData(
                      0,
                      i,
                      this.ctx.canvas.width,
                      1
                    );
                    this.ctx.putImageData(o, Math.random() * t - t / 2, i);
                  }
                }
              },
              {
                key: 'process',
                value: function() {
                  var t = this.frm++;
                  this.drawImage(this.img, 0, 0),
                    this.glitchSlip(10, 200 * this.hratio, 300 * this.hratio),
                    90 < t % 100 &&
                      this.glitchSlip(
                        10,
                        100 * this.hratio * Math.random(),
                        400 * this.hratio * Math.random()
                      );
                }
              }
            ]),
            t
          );
        })();
        function y(t) {
          return (
            '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div>' +
            t +
            '</div></div></figcaption></figure></div>'
          );
        }
        function b() {
          return (
            '<div class="mfp-sharers"><span>' +
            CDPRED.gallery.tShare +
            '</span><button type="button" class="mfp-prevent-close mfp-share-facebook" data-base="https://www.facebook.com/sharer/sharer.php?u="></button><button type="button" class="mfp-prevent-close mfp-share-twitter" data-base="https://twitter.com/home?status="></button><button type="button" class="mfp-prevent-close mfp-share-reddit" data-base="https://reddit.com/submit?url="></button></div>'
          );
        }
        var T = (function() {
          function e(n, r, o, s, c, u) {
            var h = this;
            m(this, e),
              (this.disableGlitch = c),
              (this.images = r),
              (this.index = n),
              (this.elem = o[n]),
              (this.type = u);
            var f = document.createElement('canvas');
            (f.width = this.elem.width), (f.height = this.elem.height);
            var p = document.createElement('canvas');
            (p.className = 'glitch'),
              this.disableGlitch && p.classList.add('disabled'),
              (p.width = this.elem.width),
              (p.height = this.elem.height),
              this.disableGlitch ||
                ((this.Glitcher = new _(p)),
                this.Glitcher.drawImage(this.elem, 0, 0)),
              this.elem.parentNode.insertBefore(f, this.elem),
              this.elem.parentNode.replaceChild(p, this.elem),
              (this.timer = 0);
            (this.queue = []),
              this.disableGlitch ||
                t(p).hover(
                  function() {
                    this.queue.length ||
                      (clearInterval(this.timer),
                      (this.timer = setInterval(
                        this.Glitcher.process.bind(this.Glitcher),
                        50
                      )));
                  }.bind(this),
                  function() {
                    clearInterval(this.timer);
                  }.bind(this)
                ),
              (this.gl =
                f.getContext('webgl') || f.getContext('experimental-webgl')),
              this.gl ||
                (console.log(
                  'Unable to initialize WebGL. Your browser may not support it.'
                ),
                (this.gl = null)),
              this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, !0);
            var g = this.gl.createBuffer();
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, g),
              this.gl.bufferData(
                this.gl.ARRAY_BUFFER,
                new Float32Array([-1, -1, -1, 4, 4, -1]),
                this.gl.STATIC_DRAW
              ),
              this.gl.viewport(0, 0, f.width, f.height),
              (this.transition = a()(
                this.gl,
                i.a.find(function(t) {
                  return 'morph' === t.name;
                })
              )),
              (this.imgTextures = []),
              [].forEach.call(r, function(t) {
                var e = h.gl,
                  n = l()(e, t);
                (n.minFilter = e.LINEAR),
                  (n.magFilter = e.LINEAR),
                  h.imgTextures.push(n);
              }),
              (this.speedScale = 1),
              (this.baseSpeed = 2.5),
              (this.queueSpeed = 2),
              (this.strength = 0.3),
              (this.start = 1),
              (this.dir = 1),
              (this.lastProgress = -1),
              this.repaint(),
              (this.transitionNext = this.transitionNext.bind(this)),
              (this.transitionPrev = this.transitionPrev.bind(this)),
              (this.transitionNext3 = this.transitionNext3.bind(this)),
              (this.transitionPrev3 = this.transitionPrev3.bind(this)),
              (this.transitionNext5 = this.transitionNext5.bind(this)),
              (this.transitionPrev5 = this.transitionPrev5.bind(this));
            var v = this,
              b = function(e) {
                e.preventDefault();
                var n = s.map(function(t, e) {
                    return { src: t, index: e };
                  }),
                  r = n.splice(0, this.index);
                n.splice.apply(n, [n.length, 0].concat(d(r))),
                  t.magnificPopup.open({
                    type: 'image',
                    items: n,
                    mainClass: 'mfp-fade mfp-cp-gallery',
                    removalDelay: 160,
                    preloader: !1,
                    fixedContentPos: !0,
                    gallery: { enabled: !0 },
                    image: { markup: y(v.mfpActions(v.index)) },
                    callbacks: {
                      change: function(e) {
                        t(this.content)
                          .find('.mfp-bottom-bar-actions')
                          .html(t(v.mfpActions(e.data.index)).html()),
                          t(this.content)
                            .find('.mfp-bottom-bar-actions')
                            .attr('data-url', e.src);
                      }
                    }
                  });
              }.bind(this);
            t(f).on('click', b),
              this.disableGlitch || t(p).on('click', b),
              t(document).on('galleryChanged', function(t, e) {
                e === v.type && v.repaint();
              });
          }
          return (
            v(e, [
              {
                key: 'mfpActions',
                value: function(t) {
                  var e =
                    '<div class="mfp-bottom-bar-actions" data-type="' +
                    this.type +
                    '">';
                  return (
                    'wallpapers' === this.type
                      ? CDPRED.gallery.desktopRes[
                          CDPRED.wallpapers['desktop-res'][t]
                        ].forEach(function(t) {
                          e += '<button type="button" class="mfp-prevent-close mfp-download" data-res="'
                            .concat(t, '">')
                            .concat(t, '</button>');
                        })
                      : (e += '<button type="button" class="mfp-prevent-close mfp-download" data-res="2160p">'
                          .concat(CDPRED.gallery.tDownload4k, '</button>')
                          .concat(b())),
                    (e += '</div>')
                  );
                }
              },
              {
                key: 'getTexture',
                value: function(t) {
                  return this.imgTextures[this.getNormalizeIndex(t)];
                }
              },
              {
                key: 'getImage',
                value: function(t) {
                  return this.images[this.getNormalizeIndex(t)];
                }
              },
              {
                key: 'getNormalizeIndex',
                value: function(t) {
                  var e = this.images;
                  return t < 0 && (t = e.length + t), t % e.length;
                }
              },
              {
                key: 'setupTransitionNext',
                value: function() {
                  (this.dir = 1), this.setupTransition();
                }
              },
              {
                key: 'setupTransitionPrev',
                value: function() {
                  (this.dir = -1), this.setupTransition();
                }
              },
              {
                key: 'setupTransitionNext3',
                value: function() {
                  (this.dir = 1), this.setupTransition(3);
                }
              },
              {
                key: 'setupTransitionPrev3',
                value: function() {
                  (this.dir = -1), this.setupTransition(3);
                }
              },
              {
                key: 'setupTransitionNext5',
                value: function() {
                  (this.dir = 1), this.setupTransition(5);
                }
              },
              {
                key: 'setupTransitionPrev5',
                value: function() {
                  (this.dir = -1), this.setupTransition(5);
                }
              },
              {
                key: 'updateTranstionSpeed',
                value: function() {
                  var t = this.queue,
                    e = this.queueSpeed,
                    n = this.baseSpeed;
                  this.speedScale = t.length > 1 ? t.length * e : n;
                }
              },
              {
                key: 'execQueue',
                value: function() {
                  var t = this.queue;
                  if (t.length) {
                    var e = t[t.length - 1];
                    this.updateTranstionSpeed(), e();
                  }
                }
              },
              {
                key: 'enqueue',
                value: function(t) {
                  var e = this.queue;
                  e.push(t),
                    1 === e.length
                      ? this.execQueue()
                      : this.updateTranstionSpeed();
                }
              },
              {
                key: 'setupTransition',
                value: function(t) {
                  var e = this.index,
                    n = this.dir,
                    r = this.getNormalizeIndex(e + n * (t || 1));
                  (this.from = this.getTexture(e)),
                    (this.to = this.getTexture(r)),
                    this.disableGlitch ||
                      this.Glitcher.drawImage(this.getImage(r), 0, 0),
                    (this.index = r),
                    (this.lastProgress = -1),
                    (this.start = performance.now()),
                    requestAnimationFrame(this.update.bind(this));
                }
              },
              {
                key: 'update',
                value: function(t) {
                  var e = this.speedScale,
                    n = this.start,
                    r = this.lastProgress,
                    i = this.from,
                    o = this.to,
                    a = this.elem,
                    s = this.strength,
                    l = this.dir,
                    c = this.transition,
                    u = this.index,
                    h = (((t - n) / 1e3) * e) % 1;
                  h >= r
                    ? ((this.lastProgress = h),
                      requestAnimationFrame(this.update.bind(this)),
                      c.draw(h, i, o, a.width, a.height, {
                        strength: -s * l,
                        direction: [-l, 0]
                      }))
                    : (this.disableGlitch ||
                        this.Glitcher.drawImage(this.getImage(u), 0, 0),
                      this.repaint(),
                      this.queue.pop(),
                      (this.lastProgress = -1),
                      this.execQueue());
                }
              },
              {
                key: 'repaint',
                value: function() {
                  (this.from = this.to = this.getTexture(this.index)),
                    this.transition.draw(
                      1,
                      this.from,
                      this.to,
                      this.elem.width,
                      this.elem.height,
                      {
                        strength: this.strength * this.dir,
                        direction: [this.dir, 0]
                      }
                    );
                }
              },
              {
                key: 'transitionNext',
                value: function() {
                  this.enqueue(this.setupTransitionNext.bind(this));
                }
              },
              {
                key: 'transitionPrev',
                value: function() {
                  this.enqueue(this.setupTransitionPrev.bind(this));
                }
              },
              {
                key: 'transitionNext3',
                value: function() {
                  this.enqueue(this.setupTransitionNext3.bind(this));
                }
              },
              {
                key: 'transitionPrev3',
                value: function() {
                  this.enqueue(this.setupTransitionPrev3.bind(this));
                }
              },
              {
                key: 'transitionNext5',
                value: function() {
                  this.enqueue(this.setupTransitionNext5.bind(this));
                }
              },
              {
                key: 'transitionPrev5',
                value: function() {
                  this.enqueue(this.setupTransitionPrev5.bind(this));
                }
              }
            ]),
            e
          );
        })();
        function x(t, e) {
          var n = [];
          t.forEach(function(r, i) {
            var o = new Image();
            (o.index = i),
              (o.crossOrigin = 'Anonymous'),
              (o.onload = function() {
                n.push(o),
                  n.length == t.length &&
                    (n.sort(function(t, e) {
                      return t.index > e.index ? 1 : e.index > t.index ? -1 : 0;
                    }),
                    e(n));
              }),
              (o.src = r);
          });
        }
        function w() {
          t('.l-gallery__nav').on('click', 'button:not(.active)', function() {
            var e = t(this);
            e.siblings().removeClass('active'),
              e.addClass('active'),
              (function(e) {
                var n = t('.l-gallery__swiper[data-type=' + e + ']');
                n.siblings().removeClass('active'),
                  n.addClass('active'),
                  'videos' !== e ||
                    n.data('ready') ||
                    (n.data('ready', !0), Object(p.a)());
                if (isMobile) {
                  var r = n.find('.swiper-container')[0].swiper;
                  r.update();
                } else
                  'screenshots' !== e || n.data('ready')
                    ? 'wallpapers' !== e || n.data('ready')
                      ? 'arts' !== e ||
                        n.data('ready') ||
                        window.setTimeout(function() {
                          E(
                            '.swiper-slide',
                            '.swiper-slide img',
                            '.l-gallery',
                            '.l-gallery__swiper[data-type="arts"]',
                            CDPRED.arts.desktop,
                            CDPRED.arts['1080p'],
                            isMobile,
                            'arts'
                          );
                        }, 100)
                      : window.setTimeout(function() {
                          E(
                            '.swiper-slide',
                            '.swiper-slide img',
                            '.l-gallery',
                            '.l-gallery__swiper[data-type="wallpapers"]',
                            CDPRED.wallpapers.desktop,
                            CDPRED.wallpapers['1080p'],
                            isMobile,
                            'wallpapers'
                          );
                        }, 100)
                    : window.setTimeout(function() {
                        E(
                          '.swiper-slide',
                          '.swiper-slide img',
                          '.l-gallery',
                          '.l-gallery__swiper[data-type="screenshots"]',
                          CDPRED.screenshots.desktop,
                          CDPRED.screenshots['1080p'],
                          isMobile,
                          'screenshots'
                        );
                      }, 100),
                    t(document).trigger('galleryChanged', [e]);
              })(t(this).data('type'));
          });
        }
        function E(e, n, r, i, o, a, s, l) {
          var c = document.querySelectorAll(i + ' ' + e),
            u = document.querySelectorAll(i + ' ' + n),
            p = document.querySelector(r);
          t(i).data('ready', !0);
          var d = function() {
            if (p.offsetWidth > 767) {
              var t = Math.ceil((p.offsetWidth - 0) * (684 / 1346));
              (c[0].style.width = t + 'px'),
                (c[0].style.marginRight = '0px'),
                (t = Math.ceil((p.offsetWidth - 0) * (318 / 1346)));
              for (var e = 1; e < c.length; e++) c[e].style.width = t + 'px';
            } else {
              var n = p.offsetWidth;
              (c[0].style.width = n + 'px'), (c[0].style.marginRight = '0px');
            }
          };
          d(),
            window.addEventListener('resize', h()(d, 100)),
            x(o, function(e) {
              var n = new T(0, e, u, a, s, l),
                r = new T(1, e, u, a, s, l),
                o = new T(2, e, u, a, s, l),
                c = new T(3, e, u, a, s, l),
                h = new T(4, e, u, a, s, l);
              t(i + ' .swiper-button-next').click(function() {
                setTimeout(n.transitionNext5, 310),
                  setTimeout(r.transitionNext5, 240),
                  setTimeout(o.transitionNext5, 170),
                  setTimeout(c.transitionNext5, 100),
                  h.transitionNext5();
              }),
                t(i + ' .swiper-button-prev').click(function() {
                  setTimeout(h.transitionPrev5, 310),
                    setTimeout(c.transitionPrev5, 240),
                    setTimeout(o.transitionPrev5, 170),
                    setTimeout(r.transitionPrev5, 100),
                    n.transitionPrev5();
                });
            }),
            Object(f.b)(i + ' .swiper-button-next', '.icon'),
            Object(f.b)(i + ' .swiper-button-prev', '.icon', !0),
            A();
        }
        function A() {
          t(document).on(
            'click',
            '.mfp-cp-gallery .mfp-sharers button',
            function() {
              var e = t(this)
                .parents('.mfp-bottom-bar-actions')
                .attr('data-url')
                .replace('/1080p/', '/2160p/');
              location.href = t(this).attr('data-base') + encodeURIComponent(e);
            }
          ),
            t(document).on(
              'click',
              '.mfp-cp-gallery .mfp-download',
              function() {
                var e = t(this).data('res'),
                  n = t(this)
                    .parents('.mfp-bottom-bar-actions')
                    .attr('data-url')
                    .replace('/1080p/', '/' + e + '/');
                window.open(n);
              }
            );
        }
        function C(e, n, r) {
          var i,
            o,
            a,
            s = t('.l-gallery__swiper[data-type="' + e + '"]'),
            l = s.find('.swiper-wrapper')[0];
          l.innerHTML = '';
          for (var u = 0; u < n.length; u++)
            ((i = document.createElement('div')).className = 'swiper-slide'),
              i.setAttribute('data-mfp-src', r[u]),
              ((o = document.createElement('img')).src = n[u]),
              (i.dataset.id = u),
              i.appendChild(o),
              l.appendChild(i);
          function h(t) {
            t.preventDefault();
          }
          (a =
            'wallpapers' === e
              ? '<div class="mfp-bottom-bar-actions" data-type="' +
                e +
                '"><button type="button" class="mfp-prevent-close mfp-download" data-res="1080x1920">' +
                CDPRED.gallery.tDownload +
                '</button></div>'
              : '<div class="mfp-bottom-bar-actions" data-type="' +
                e +
                '">' +
                b() +
                '</div>'),
            t(l)
              .find('.swiper-slide')
              .magnificPopup({
                type: 'image',
                mainClass: 'mfp-fade mfp-cp-gallery',
                removalDelay: 160,
                preloader: !1,
                fixedContentPos: !0,
                gallery: { enabled: !0 },
                image: { markup: y(a) },
                callbacks: {
                  change: function(e) {
                    t(this.content)
                      .find('.mfp-bottom-bar-actions')
                      .attr('data-url', e.src.replace('/1080p/', '/2160p/'));
                  },
                  open: function() {
                    document.body.addEventListener('touchmove', h, !1);
                  },
                  close: function() {
                    document.body.removeEventListener('touchmove', h, !1);
                  }
                }
              }),
            t(document).on(
              'click',
              '.mfp-cp-gallery .mfp-sharers button',
              function() {
                var e = t(this)
                  .parents('.mfp-bottom-bar-actions')
                  .attr('data-url');
                location.href =
                  t(this).attr('data-base') + encodeURIComponent(e);
              }
            ),
            t(document).on(
              'click',
              '.mfp-cp-gallery .mfp-download',
              function() {
                var e = t(this).data('res'),
                  n = t(this)
                    .parents('.mfp-bottom-bar-actions')
                    .attr('data-url')
                    .replace('/1080p/', '/' + e + '/');
                window.open(n);
              }
            );
          new c.a(s.find('.swiper-container')[0], {
            freeMode: !0,
            slidesPerView: 2.5,
            spaceBetween: 15,
            slidesOffsetBefore: 15,
            slidesOffsetAfter: 15
          });
        }
      }.call(this, n('EVdn')));
    },
    yLpj: function(t, e) {
      var n;
      n = (function() {
        return this;
      })();
      try {
        n = n || new Function('return this')();
      } catch (t) {
        'object' == typeof window && (n = window);
      }
      t.exports = n;
    },
    'z/o8': function(t, e, n) {
      'use strict';
      n.d(e, 'b', function() {
        return r.f;
      }),
        n.d(e, 'c', function() {
          return U;
        }),
        n.d(e, 'a', function() {
          return o;
        });
      var r = n('LiCP');
      /*!
       * VERSION: 2.1.3
       * DATE: 2019-05-17
       * UPDATES AND DOCS AT: http://greensock.com
       *
       * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
       * This work is subject to the terms at http://greensock.com/standard-license or for
       * Club GreenSock members, the software agreement that was issued with your membership.
       *
       * @author: Jack Doyle, jack@greensock.com
       */ r.e._gsDefine(
        'TimelineLite',
        ['core.Animation', 'core.SimpleTimeline', 'TweenLite'],
        function() {
          var t = function(t) {
              r.c.call(this, t);
              var e,
                n,
                i = this.vars;
              for (n in ((this._labels = {}),
              (this.autoRemoveChildren = !!i.autoRemoveChildren),
              (this.smoothChildTiming = !!i.smoothChildTiming),
              (this._sortChildren = !0),
              (this._onUpdate = i.onUpdate),
              i))
                (e = i[n]),
                  o(e) &&
                    -1 !== e.join('').indexOf('{self}') &&
                    (i[n] = this._swapSelfInParams(e));
              o(i.tweens) && this.add(i.tweens, 0, i.align, i.stagger);
            },
            e = r.f._internals,
            n = (t._internals = {}),
            i = e.isSelector,
            o = e.isArray,
            a = e.lazyTweens,
            s = e.lazyRender,
            l = r.e._gsDefine.globals,
            c = function(t) {
              var e,
                n = {};
              for (e in t) n[e] = t[e];
              return n;
            },
            u = function(t, e, n) {
              var r,
                i,
                o = t.cycle;
              for (r in o)
                (i = o[r]),
                  (t[r] =
                    'function' == typeof i ? i(n, e[n], e) : i[n % i.length]);
              delete t.cycle;
            },
            h = (n.pauseCallback = function() {}),
            f = function(t, e, n, r) {
              var i = 'immediateRender';
              return i in e || (e[i] = !((n && !1 === n[i]) || r)), e;
            },
            p = function(t) {
              if ('function' == typeof t) return t;
              var e = 'object' == typeof t ? t : { each: t },
                n = e.ease,
                r = e.from || 0,
                i = e.base || 0,
                o = {},
                a = isNaN(r),
                s = e.axis,
                l = { center: 0.5, end: 1 }[r] || 0;
              return function(t, c, u) {
                var h,
                  f,
                  p,
                  d,
                  m,
                  g,
                  v,
                  _,
                  y,
                  b = (u || e).length,
                  T = o[b];
                if (!T) {
                  if (!(y = 'auto' === e.grid ? 0 : (e.grid || [1 / 0])[0])) {
                    for (
                      v = -1 / 0;
                      v < (v = u[y++].getBoundingClientRect().left) && y < b;

                    );
                    y--;
                  }
                  for (
                    T = o[b] = [],
                      h = a ? Math.min(y, b) * l - 0.5 : r % y,
                      f = a ? (b * l) / y - 0.5 : (r / y) | 0,
                      v = 0,
                      _ = 1 / 0,
                      g = 0;
                    g < b;
                    g++
                  )
                    (p = (g % y) - h),
                      (d = f - ((g / y) | 0)),
                      (T[g] = m = s
                        ? Math.abs('y' === s ? d : p)
                        : Math.sqrt(p * p + d * d)),
                      m > v && (v = m),
                      m < _ && (_ = m);
                  (T.max = v - _),
                    (T.min = _),
                    (T.v = b =
                      e.amount ||
                      e.each *
                        (y > b
                          ? b - 1
                          : s
                          ? 'y' === s
                            ? b / y
                            : y
                          : Math.max(y, b / y)) ||
                      0),
                    (T.b = b < 0 ? i - b : i);
                }
                return (
                  (b = (T[t] - T.min) / T.max),
                  T.b + (n ? n.getRatio(b) : b) * T.v
                );
              };
            },
            d = (t.prototype = new r.c());
          return (
            (t.version = '2.1.3'),
            (t.distribute = p),
            (d.constructor = t),
            (d.kill()._gc = d._forcingPlayhead = d._hasPause = !1),
            (d.to = function(t, e, n, i) {
              var o = (n.repeat && l.TweenMax) || r.f;
              return e ? this.add(new o(t, e, n), i) : this.set(t, n, i);
            }),
            (d.from = function(t, e, n, i) {
              return this.add(
                ((n.repeat && l.TweenMax) || r.f).from(t, e, f(0, n)),
                i
              );
            }),
            (d.fromTo = function(t, e, n, i, o) {
              var a = (i.repeat && l.TweenMax) || r.f;
              return (
                (i = f(0, i, n)),
                e ? this.add(a.fromTo(t, e, n, i), o) : this.set(t, i, o)
              );
            }),
            (d.staggerTo = function(e, n, o, a, s, l, h, f) {
              var d,
                m,
                g = new t({
                  onComplete: l,
                  onCompleteParams: h,
                  callbackScope: f,
                  smoothChildTiming: this.smoothChildTiming
                }),
                v = p(o.stagger || a),
                _ = o.startAt,
                y = o.cycle;
              for (
                'string' == typeof e && (e = r.f.selector(e) || e),
                  i((e = e || [])) &&
                    (e = (function(t) {
                      var e,
                        n = [],
                        r = t.length;
                      for (e = 0; e !== r; n.push(t[e++]));
                      return n;
                    })(e)),
                  m = 0;
                m < e.length;
                m++
              )
                (d = c(o)),
                  _ && ((d.startAt = c(_)), _.cycle && u(d.startAt, e, m)),
                  y &&
                    (u(d, e, m),
                    null != d.duration &&
                      ((n = d.duration), delete d.duration)),
                  g.to(e[m], n, d, v(m, e[m], e));
              return this.add(g, s);
            }),
            (d.staggerFrom = function(t, e, n, r, i, o, a, s) {
              return (
                (n.runBackwards = !0),
                this.staggerTo(t, e, f(0, n), r, i, o, a, s)
              );
            }),
            (d.staggerFromTo = function(t, e, n, r, i, o, a, s, l) {
              return (
                (r.startAt = n), this.staggerTo(t, e, f(0, r, n), i, o, a, s, l)
              );
            }),
            (d.call = function(t, e, n, i) {
              return this.add(r.f.delayedCall(0, t, e, n), i);
            }),
            (d.set = function(t, e, n) {
              return this.add(new r.f(t, 0, f(0, e, null, !0)), n);
            }),
            (t.exportRoot = function(e, n) {
              null == (e = e || {}).smoothChildTiming &&
                (e.smoothChildTiming = !0);
              var i,
                o,
                a,
                s,
                l = new t(e),
                c = l._timeline;
              for (
                null == n && (n = !0),
                  c._remove(l, !0),
                  l._startTime = 0,
                  l._rawPrevTime = l._time = l._totalTime = c._time,
                  a = c._first;
                a;

              )
                (s = a._next),
                  (n && a instanceof r.f && a.target === a.vars.onComplete) ||
                    ((o = a._startTime - a._delay) < 0 && (i = 1), l.add(a, o)),
                  (a = s);
              return c.add(l, 0), i && l.totalDuration(), l;
            }),
            (d.add = function(e, n, i, a) {
              var s, l, c, u, h, f;
              if (
                ('number' != typeof n &&
                  (n = this._parseTimeOrLabel(n, 0, !0, e)),
                !(e instanceof r.a))
              ) {
                if (e instanceof Array || (e && e.push && o(e))) {
                  for (
                    i = i || 'normal', a = a || 0, s = n, l = e.length, c = 0;
                    c < l;
                    c++
                  )
                    o((u = e[c])) && (u = new t({ tweens: u })),
                      this.add(u, s),
                      'string' != typeof u &&
                        'function' != typeof u &&
                        ('sequence' === i
                          ? (s =
                              u._startTime + u.totalDuration() / u._timeScale)
                          : 'start' === i && (u._startTime -= u.delay())),
                      (s += a);
                  return this._uncache(!0);
                }
                if ('string' == typeof e) return this.addLabel(e, n);
                if ('function' != typeof e)
                  throw 'Cannot add ' +
                    e +
                    ' into the timeline; it is not a tween, timeline, function, or string.';
                e = r.f.delayedCall(0, e);
              }
              if (
                (r.c.prototype.add.call(this, e, n),
                (e._time || (!e._duration && e._initted)) &&
                  ((s = (this.rawTime() - e._startTime) * e._timeScale),
                  (!e._duration ||
                    Math.abs(Math.max(0, Math.min(e.totalDuration(), s))) -
                      e._totalTime >
                      1e-5) &&
                    e.render(s, !1, !1)),
                (this._gc || this._time === this._duration) &&
                  !this._paused &&
                  this._duration < this.duration())
              )
                for (f = (h = this).rawTime() > e._startTime; h._timeline; )
                  f && h._timeline.smoothChildTiming
                    ? h.totalTime(h._totalTime, !0)
                    : h._gc && h._enabled(!0, !1),
                    (h = h._timeline);
              return this;
            }),
            (d.remove = function(t) {
              if (t instanceof r.a) {
                this._remove(t, !1);
                var e = (t._timeline = t.vars.useFrames
                  ? r.a._rootFramesTimeline
                  : r.a._rootTimeline);
                return (
                  (t._startTime =
                    (t._paused ? t._pauseTime : e._time) -
                    (t._reversed
                      ? t.totalDuration() - t._totalTime
                      : t._totalTime) /
                      t._timeScale),
                  this
                );
              }
              if (t instanceof Array || (t && t.push && o(t))) {
                for (var n = t.length; --n > -1; ) this.remove(t[n]);
                return this;
              }
              return 'string' == typeof t
                ? this.removeLabel(t)
                : this.kill(null, t);
            }),
            (d._remove = function(t, e) {
              return (
                r.c.prototype._remove.call(this, t, e),
                this._last
                  ? this._time > this.duration() &&
                    ((this._time = this._duration),
                    (this._totalTime = this._totalDuration))
                  : (this._time = this._totalTime = this._duration = this._totalDuration = 0),
                this
              );
            }),
            (d.append = function(t, e) {
              return this.add(t, this._parseTimeOrLabel(null, e, !0, t));
            }),
            (d.insert = d.insertMultiple = function(t, e, n, r) {
              return this.add(t, e || 0, n, r);
            }),
            (d.appendMultiple = function(t, e, n, r) {
              return this.add(t, this._parseTimeOrLabel(null, e, !0, t), n, r);
            }),
            (d.addLabel = function(t, e) {
              return (this._labels[t] = this._parseTimeOrLabel(e)), this;
            }),
            (d.addPause = function(t, e, n, i) {
              var o = r.f.delayedCall(0, h, n, i || this);
              return (
                (o.vars.onComplete = o.vars.onReverseComplete = e),
                (o.data = 'isPause'),
                (this._hasPause = !0),
                this.add(o, t)
              );
            }),
            (d.removeLabel = function(t) {
              return delete this._labels[t], this;
            }),
            (d.getLabelTime = function(t) {
              return null != this._labels[t] ? this._labels[t] : -1;
            }),
            (d._parseTimeOrLabel = function(t, e, n, i) {
              var a, s;
              if (i instanceof r.a && i.timeline === this) this.remove(i);
              else if (i && (i instanceof Array || (i.push && o(i))))
                for (s = i.length; --s > -1; )
                  i[s] instanceof r.a &&
                    i[s].timeline === this &&
                    this.remove(i[s]);
              if (
                ((a =
                  'number' != typeof t || e
                    ? this.duration() > 99999999999
                      ? this.recent().endTime(!1)
                      : this._duration
                    : 0),
                'string' == typeof e)
              )
                return this._parseTimeOrLabel(
                  e,
                  n && 'number' == typeof t && null == this._labels[e]
                    ? t - a
                    : 0,
                  n
                );
              if (
                ((e = e || 0),
                'string' != typeof t || (!isNaN(t) && null == this._labels[t]))
              )
                null == t && (t = a);
              else {
                if (-1 === (s = t.indexOf('=')))
                  return null == this._labels[t]
                    ? n
                      ? (this._labels[t] = a + e)
                      : e
                    : this._labels[t] + e;
                (e =
                  parseInt(t.charAt(s - 1) + '1', 10) *
                  Number(t.substr(s + 1))),
                  (t =
                    s > 1
                      ? this._parseTimeOrLabel(t.substr(0, s - 1), 0, n)
                      : a);
              }
              return Number(t) + e;
            }),
            (d.seek = function(t, e) {
              return this.totalTime(
                'number' == typeof t ? t : this._parseTimeOrLabel(t),
                !1 !== e
              );
            }),
            (d.stop = function() {
              return this.paused(!0);
            }),
            (d.gotoAndPlay = function(t, e) {
              return this.play(t, e);
            }),
            (d.gotoAndStop = function(t, e) {
              return this.pause(t, e);
            }),
            (d.render = function(t, e, n) {
              this._gc && this._enabled(!0, !1);
              var r,
                i,
                o,
                l,
                c,
                u,
                h,
                f,
                p = this._time,
                d = this._dirty ? this.totalDuration() : this._totalDuration,
                m = this._startTime,
                g = this._timeScale,
                v = this._paused;
              if (
                (p !== this._time && (t += this._time - p),
                this._hasPause && !this._forcingPlayhead && !e)
              ) {
                if (t > p)
                  for (r = this._first; r && r._startTime <= t && !u; )
                    r._duration ||
                      'isPause' !== r.data ||
                      r.ratio ||
                      (0 === r._startTime && 0 === this._rawPrevTime) ||
                      (u = r),
                      (r = r._next);
                else
                  for (r = this._last; r && r._startTime >= t && !u; )
                    r._duration ||
                      ('isPause' === r.data && r._rawPrevTime > 0 && (u = r)),
                      (r = r._prev);
                u &&
                  ((this._time = this._totalTime = t = u._startTime),
                  (f =
                    this._startTime +
                    (this._reversed ? this._duration - t : t) /
                      this._timeScale));
              }
              if (t >= d - 1e-8 && t >= 0)
                (this._totalTime = this._time = d),
                  this._reversed ||
                    this._hasPausedChild() ||
                    ((i = !0),
                    (l = 'onComplete'),
                    (c = !!this._timeline.autoRemoveChildren),
                    0 === this._duration &&
                      ((t <= 0 && t >= -1e-8) ||
                        this._rawPrevTime < 0 ||
                        1e-8 === this._rawPrevTime) &&
                      this._rawPrevTime !== t &&
                      this._first &&
                      ((c = !0),
                      this._rawPrevTime > 1e-8 && (l = 'onReverseComplete'))),
                  (this._rawPrevTime =
                    this._duration || !e || t || this._rawPrevTime === t
                      ? t
                      : 1e-8),
                  (t = d + 1e-4);
              else if (t < 1e-8)
                if (
                  ((this._totalTime = this._time = 0),
                  t > -1e-8 && (t = 0),
                  (0 !== p ||
                    (0 === this._duration &&
                      1e-8 !== this._rawPrevTime &&
                      (this._rawPrevTime > 0 ||
                        (t < 0 && this._rawPrevTime >= 0)))) &&
                    ((l = 'onReverseComplete'), (i = this._reversed)),
                  t < 0)
                )
                  (this._active = !1),
                    this._timeline.autoRemoveChildren && this._reversed
                      ? ((c = i = !0), (l = 'onReverseComplete'))
                      : this._rawPrevTime >= 0 && this._first && (c = !0),
                    (this._rawPrevTime = t);
                else {
                  if (
                    ((this._rawPrevTime =
                      this._duration || !e || t || this._rawPrevTime === t
                        ? t
                        : 1e-8),
                    0 === t && i)
                  )
                    for (r = this._first; r && 0 === r._startTime; )
                      r._duration || (i = !1), (r = r._next);
                  (t = 0), this._initted || (c = !0);
                }
              else this._totalTime = this._time = this._rawPrevTime = t;
              if ((this._time !== p && this._first) || n || c || u) {
                if (
                  (this._initted || (this._initted = !0),
                  this._active ||
                    (!this._paused &&
                      this._time !== p &&
                      t > 0 &&
                      (this._active = !0)),
                  0 === p &&
                    this.vars.onStart &&
                    ((0 === this._time && this._duration) ||
                      e ||
                      this._callback('onStart')),
                  (h = this._time) >= p)
                )
                  for (
                    r = this._first;
                    r &&
                    ((o = r._next), h === this._time && (!this._paused || v));

                  )
                    (r._active ||
                      (r._startTime <= h && !r._paused && !r._gc)) &&
                      (u === r && (this.pause(), (this._pauseTime = f)),
                      r._reversed
                        ? r.render(
                            (r._dirty ? r.totalDuration() : r._totalDuration) -
                              (t - r._startTime) * r._timeScale,
                            e,
                            n
                          )
                        : r.render((t - r._startTime) * r._timeScale, e, n)),
                      (r = o);
                else
                  for (
                    r = this._last;
                    r &&
                    ((o = r._prev), h === this._time && (!this._paused || v));

                  ) {
                    if (
                      r._active ||
                      (r._startTime <= p && !r._paused && !r._gc)
                    ) {
                      if (u === r) {
                        for (u = r._prev; u && u.endTime() > this._time; )
                          u.render(
                            u._reversed
                              ? u.totalDuration() -
                                  (t - u._startTime) * u._timeScale
                              : (t - u._startTime) * u._timeScale,
                            e,
                            n
                          ),
                            (u = u._prev);
                        (u = null), this.pause(), (this._pauseTime = f);
                      }
                      r._reversed
                        ? r.render(
                            (r._dirty ? r.totalDuration() : r._totalDuration) -
                              (t - r._startTime) * r._timeScale,
                            e,
                            n
                          )
                        : r.render((t - r._startTime) * r._timeScale, e, n);
                    }
                    r = o;
                  }
                this._onUpdate &&
                  (e || (a.length && s(), this._callback('onUpdate'))),
                  l &&
                    (this._gc ||
                      (m !== this._startTime && g === this._timeScale) ||
                      ((0 === this._time || d >= this.totalDuration()) &&
                        (i &&
                          (a.length && s(),
                          this._timeline.autoRemoveChildren &&
                            this._enabled(!1, !1),
                          (this._active = !1)),
                        !e && this.vars[l] && this._callback(l))));
              }
            }),
            (d._hasPausedChild = function() {
              for (var e = this._first; e; ) {
                if (e._paused || (e instanceof t && e._hasPausedChild()))
                  return !0;
                e = e._next;
              }
              return !1;
            }),
            (d.getChildren = function(t, e, n, i) {
              i = i || -9999999999;
              for (var o = [], a = this._first, s = 0; a; )
                a._startTime < i ||
                  (a instanceof r.f
                    ? !1 !== e && (o[s++] = a)
                    : (!1 !== n && (o[s++] = a),
                      !1 !== t &&
                        (s = (o = o.concat(a.getChildren(!0, e, n))).length))),
                  (a = a._next);
              return o;
            }),
            (d.getTweensOf = function(t, e) {
              var n,
                i,
                o = this._gc,
                a = [],
                s = 0;
              for (
                o && this._enabled(!0, !0), i = (n = r.f.getTweensOf(t)).length;
                --i > -1;

              )
                (n[i].timeline === this || (e && this._contains(n[i]))) &&
                  (a[s++] = n[i]);
              return o && this._enabled(!1, !0), a;
            }),
            (d.recent = function() {
              return this._recent;
            }),
            (d._contains = function(t) {
              for (var e = t.timeline; e; ) {
                if (e === this) return !0;
                e = e.timeline;
              }
              return !1;
            }),
            (d.shiftChildren = function(t, e, n) {
              n = n || 0;
              for (var r, i = this._first, o = this._labels; i; )
                i._startTime >= n && (i._startTime += t), (i = i._next);
              if (e) for (r in o) o[r] >= n && (o[r] += t);
              return this._uncache(!0);
            }),
            (d._kill = function(t, e) {
              if (!t && !e) return this._enabled(!1, !1);
              for (
                var n = e ? this.getTweensOf(e) : this.getChildren(!0, !0, !1),
                  r = n.length,
                  i = !1;
                --r > -1;

              )
                n[r]._kill(t, e) && (i = !0);
              return i;
            }),
            (d.clear = function(t) {
              var e = this.getChildren(!1, !0, !0),
                n = e.length;
              for (this._time = this._totalTime = 0; --n > -1; )
                e[n]._enabled(!1, !1);
              return !1 !== t && (this._labels = {}), this._uncache(!0);
            }),
            (d.invalidate = function() {
              for (var t = this._first; t; ) t.invalidate(), (t = t._next);
              return r.a.prototype.invalidate.call(this);
            }),
            (d._enabled = function(t, e) {
              if (t === this._gc)
                for (var n = this._first; n; ) n._enabled(t, !0), (n = n._next);
              return r.c.prototype._enabled.call(this, t, e);
            }),
            (d.totalTime = function(t, e, n) {
              this._forcingPlayhead = !0;
              var i = r.a.prototype.totalTime.apply(this, arguments);
              return (this._forcingPlayhead = !1), i;
            }),
            (d.duration = function(t) {
              return arguments.length
                ? (0 !== this.duration() &&
                    0 !== t &&
                    this.timeScale(this._duration / t),
                  this)
                : (this._dirty && this.totalDuration(), this._duration);
            }),
            (d.totalDuration = function(t) {
              if (!arguments.length) {
                if (this._dirty) {
                  for (
                    var e, n, r = 0, i = this, o = i._last, a = 999999999999;
                    o;

                  )
                    (e = o._prev),
                      o._dirty && o.totalDuration(),
                      o._startTime > a &&
                      i._sortChildren &&
                      !o._paused &&
                      !i._calculatingDuration
                        ? ((i._calculatingDuration = 1),
                          i.add(o, o._startTime - o._delay),
                          (i._calculatingDuration = 0))
                        : (a = o._startTime),
                      o._startTime < 0 &&
                        !o._paused &&
                        ((r -= o._startTime),
                        i._timeline.smoothChildTiming &&
                          ((i._startTime += o._startTime / i._timeScale),
                          (i._time -= o._startTime),
                          (i._totalTime -= o._startTime),
                          (i._rawPrevTime -= o._startTime)),
                        i.shiftChildren(-o._startTime, !1, -9999999999),
                        (a = 0)),
                      (n = o._startTime + o._totalDuration / o._timeScale) >
                        r && (r = n),
                      (o = e);
                  (i._duration = i._totalDuration = r), (i._dirty = !1);
                }
                return this._totalDuration;
              }
              return t && this.totalDuration()
                ? this.timeScale(this._totalDuration / t)
                : this;
            }),
            (d.paused = function(t) {
              if (!1 === t && this._paused)
                for (var e = this._first; e; )
                  e._startTime === this._time &&
                    'isPause' === e.data &&
                    (e._rawPrevTime = 0),
                    (e = e._next);
              return r.a.prototype.paused.apply(this, arguments);
            }),
            (d.usesFrames = function() {
              for (var t = this._timeline; t._timeline; ) t = t._timeline;
              return t === r.a._rootFramesTimeline;
            }),
            (d.rawTime = function(t) {
              return t &&
                (this._paused ||
                  (this._repeat && this.time() > 0 && this.totalProgress() < 1))
                ? this._totalTime % (this._duration + this._repeatDelay)
                : this._paused
                ? this._totalTime
                : (this._timeline.rawTime(t) - this._startTime) *
                  this._timeScale;
            }),
            t
          );
        },
        !0
      );
      var i = r.g.TimelineLite;
      /*!
       * VERSION: 2.1.3
       * DATE: 2019-05-17
       * UPDATES AND DOCS AT: http://greensock.com
       *
       * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
       * This work is subject to the terms at http://greensock.com/standard-license or for
       * Club GreenSock members, the software agreement that was issued with your membership.
       *
       * @author: Jack Doyle, jack@greensock.com
       */ r.e._gsDefine(
        'TimelineMax',
        ['TimelineLite', 'TweenLite', 'easing.Ease'],
        function() {
          var t = function(t) {
              i.call(this, t),
                (this._repeat = this.vars.repeat || 0),
                (this._repeatDelay = this.vars.repeatDelay || 0),
                (this._cycle = 0),
                (this._yoyo = !!this.vars.yoyo),
                (this._dirty = !0);
            },
            e = r.f._internals,
            n = e.lazyTweens,
            o = e.lazyRender,
            a = r.e._gsDefine.globals,
            s = new r.b(null, null, 1, 0),
            l = (t.prototype = new i());
          return (
            (l.constructor = t),
            (l.kill()._gc = !1),
            (t.version = '2.1.3'),
            (l.invalidate = function() {
              return (
                (this._yoyo = !!this.vars.yoyo),
                (this._repeat = this.vars.repeat || 0),
                (this._repeatDelay = this.vars.repeatDelay || 0),
                this._uncache(!0),
                i.prototype.invalidate.call(this)
              );
            }),
            (l.addCallback = function(t, e, n, i) {
              return this.add(r.f.delayedCall(0, t, n, i), e);
            }),
            (l.removeCallback = function(t, e) {
              if (t)
                if (null == e) this._kill(null, t);
                else
                  for (
                    var n = this.getTweensOf(t, !1),
                      r = n.length,
                      i = this._parseTimeOrLabel(e);
                    --r > -1;

                  )
                    n[r]._startTime === i && n[r]._enabled(!1, !1);
              return this;
            }),
            (l.removePause = function(t) {
              return this.removeCallback(i._internals.pauseCallback, t);
            }),
            (l.tweenTo = function(t, e) {
              e = e || {};
              var n,
                i,
                o,
                l = {
                  ease: s,
                  useFrames: this.usesFrames(),
                  immediateRender: !1,
                  lazy: !1
                },
                c = (e.repeat && a.TweenMax) || r.f;
              for (i in e) l[i] = e[i];
              return (
                (l.time = this._parseTimeOrLabel(t)),
                (n =
                  Math.abs(Number(l.time) - this._time) / this._timeScale ||
                  0.001),
                (o = new c(this, n, l)),
                (l.onStart = function() {
                  o.target.paused(!0),
                    o.vars.time === o.target.time() ||
                      n !== o.duration() ||
                      o.isFromTo ||
                      o
                        .duration(
                          Math.abs(o.vars.time - o.target.time()) /
                            o.target._timeScale
                        )
                        .render(o.time(), !0, !0),
                    e.onStart &&
                      e.onStart.apply(
                        e.onStartScope || e.callbackScope || o,
                        e.onStartParams || []
                      );
                }),
                o
              );
            }),
            (l.tweenFromTo = function(t, e, n) {
              (n = n || {}),
                (t = this._parseTimeOrLabel(t)),
                (n.startAt = {
                  onComplete: this.seek,
                  onCompleteParams: [t],
                  callbackScope: this
                }),
                (n.immediateRender = !1 !== n.immediateRender);
              var r = this.tweenTo(e, n);
              return (
                (r.isFromTo = 1),
                r.duration(Math.abs(r.vars.time - t) / this._timeScale || 0.001)
              );
            }),
            (l.render = function(t, e, r) {
              this._gc && this._enabled(!0, !1);
              var i,
                a,
                s,
                l,
                c,
                u,
                h,
                f,
                p,
                d = this._time,
                m = this._dirty ? this.totalDuration() : this._totalDuration,
                g = this._duration,
                v = this._totalTime,
                _ = this._startTime,
                y = this._timeScale,
                b = this._rawPrevTime,
                T = this._paused,
                x = this._cycle;
              if (
                (d !== this._time && (t += this._time - d),
                t >= m - 1e-8 && t >= 0)
              )
                this._locked ||
                  ((this._totalTime = m), (this._cycle = this._repeat)),
                  this._reversed ||
                    this._hasPausedChild() ||
                    ((a = !0),
                    (l = 'onComplete'),
                    (c = !!this._timeline.autoRemoveChildren),
                    0 === this._duration &&
                      ((t <= 0 && t >= -1e-8) || b < 0 || 1e-8 === b) &&
                      b !== t &&
                      this._first &&
                      ((c = !0), b > 1e-8 && (l = 'onReverseComplete'))),
                  (this._rawPrevTime =
                    this._duration || !e || t || this._rawPrevTime === t
                      ? t
                      : 1e-8),
                  this._yoyo && 1 & this._cycle
                    ? (this._time = t = 0)
                    : ((this._time = g), (t = g + 1e-4));
              else if (t < 1e-8)
                if (
                  (this._locked || (this._totalTime = this._cycle = 0),
                  (this._time = 0),
                  t > -1e-8 && (t = 0),
                  (0 !== d ||
                    (0 === g &&
                      1e-8 !== b &&
                      (b > 0 || (t < 0 && b >= 0)) &&
                      !this._locked)) &&
                    ((l = 'onReverseComplete'), (a = this._reversed)),
                  t < 0)
                )
                  (this._active = !1),
                    this._timeline.autoRemoveChildren && this._reversed
                      ? ((c = a = !0), (l = 'onReverseComplete'))
                      : b >= 0 && this._first && (c = !0),
                    (this._rawPrevTime = t);
                else {
                  if (
                    ((this._rawPrevTime =
                      g || !e || t || this._rawPrevTime === t ? t : 1e-8),
                    0 === t && a)
                  )
                    for (i = this._first; i && 0 === i._startTime; )
                      i._duration || (a = !1), (i = i._next);
                  (t = 0), this._initted || (c = !0);
                }
              else
                0 === g && b < 0 && (c = !0),
                  (this._time = this._rawPrevTime = t),
                  this._locked ||
                    ((this._totalTime = t),
                    0 !== this._repeat &&
                      ((u = g + this._repeatDelay),
                      (this._cycle = (this._totalTime / u) >> 0),
                      this._cycle &&
                        this._cycle === this._totalTime / u &&
                        v <= t &&
                        this._cycle--,
                      (this._time = this._totalTime - this._cycle * u),
                      this._yoyo &&
                        1 & this._cycle &&
                        (this._time = g - this._time),
                      this._time > g
                        ? ((this._time = g), (t = g + 1e-4))
                        : this._time < 0
                        ? (this._time = t = 0)
                        : (t = this._time)));
              if (this._hasPause && !this._forcingPlayhead && !e) {
                if ((t = this._time) > d || (this._repeat && x !== this._cycle))
                  for (i = this._first; i && i._startTime <= t && !h; )
                    i._duration ||
                      'isPause' !== i.data ||
                      i.ratio ||
                      (0 === i._startTime && 0 === this._rawPrevTime) ||
                      (h = i),
                      (i = i._next);
                else
                  for (i = this._last; i && i._startTime >= t && !h; )
                    i._duration ||
                      ('isPause' === i.data && i._rawPrevTime > 0 && (h = i)),
                      (i = i._prev);
                h &&
                  ((p =
                    this._startTime +
                    (this._reversed
                      ? this._duration - h._startTime
                      : h._startTime) /
                      this._timeScale),
                  h._startTime < g &&
                    ((this._time = this._rawPrevTime = t = h._startTime),
                    (this._totalTime =
                      t +
                      this._cycle *
                        (this._totalDuration + this._repeatDelay))));
              }
              if (this._cycle !== x && !this._locked) {
                var w = this._yoyo && 0 != (1 & x),
                  E = w === (this._yoyo && 0 != (1 & this._cycle)),
                  A = this._totalTime,
                  C = this._cycle,
                  P = this._rawPrevTime,
                  R = this._time;
                if (
                  ((this._totalTime = x * g),
                  this._cycle < x ? (w = !w) : (this._totalTime += g),
                  (this._time = d),
                  (this._rawPrevTime = 0 === g ? b - 1e-4 : b),
                  (this._cycle = x),
                  (this._locked = !0),
                  (d = w ? 0 : g),
                  this.render(d, e, 0 === g),
                  e ||
                    this._gc ||
                    (this.vars.onRepeat &&
                      ((this._cycle = C),
                      (this._locked = !1),
                      this._callback('onRepeat'))),
                  d !== this._time)
                )
                  return;
                if (
                  (E &&
                    ((this._cycle = x),
                    (this._locked = !0),
                    (d = w ? g + 1e-4 : -1e-4),
                    this.render(d, !0, !1)),
                  (this._locked = !1),
                  this._paused && !T)
                )
                  return;
                (this._time = R),
                  (this._totalTime = A),
                  (this._cycle = C),
                  (this._rawPrevTime = P);
              }
              if ((this._time !== d && this._first) || r || c || h) {
                if (
                  (this._initted || (this._initted = !0),
                  this._active ||
                    (!this._paused &&
                      this._totalTime !== v &&
                      t > 0 &&
                      (this._active = !0)),
                  0 === v &&
                    this.vars.onStart &&
                    ((0 === this._totalTime && this._totalDuration) ||
                      e ||
                      this._callback('onStart')),
                  (f = this._time) >= d)
                )
                  for (
                    i = this._first;
                    i &&
                    ((s = i._next), f === this._time && (!this._paused || T));

                  )
                    (i._active ||
                      (i._startTime <= this._time && !i._paused && !i._gc)) &&
                      (h === i && (this.pause(), (this._pauseTime = p)),
                      i._reversed
                        ? i.render(
                            (i._dirty ? i.totalDuration() : i._totalDuration) -
                              (t - i._startTime) * i._timeScale,
                            e,
                            r
                          )
                        : i.render((t - i._startTime) * i._timeScale, e, r)),
                      (i = s);
                else
                  for (
                    i = this._last;
                    i &&
                    ((s = i._prev), f === this._time && (!this._paused || T));

                  ) {
                    if (
                      i._active ||
                      (i._startTime <= d && !i._paused && !i._gc)
                    ) {
                      if (h === i) {
                        for (h = i._prev; h && h.endTime() > this._time; )
                          h.render(
                            h._reversed
                              ? h.totalDuration() -
                                  (t - h._startTime) * h._timeScale
                              : (t - h._startTime) * h._timeScale,
                            e,
                            r
                          ),
                            (h = h._prev);
                        (h = null), this.pause(), (this._pauseTime = p);
                      }
                      i._reversed
                        ? i.render(
                            (i._dirty ? i.totalDuration() : i._totalDuration) -
                              (t - i._startTime) * i._timeScale,
                            e,
                            r
                          )
                        : i.render((t - i._startTime) * i._timeScale, e, r);
                    }
                    i = s;
                  }
                this._onUpdate &&
                  (e || (n.length && o(), this._callback('onUpdate'))),
                  l &&
                    (this._locked ||
                      this._gc ||
                      (_ !== this._startTime && y === this._timeScale) ||
                      ((0 === this._time || m >= this.totalDuration()) &&
                        (a &&
                          (n.length && o(),
                          this._timeline.autoRemoveChildren &&
                            this._enabled(!1, !1),
                          (this._active = !1)),
                        !e && this.vars[l] && this._callback(l))));
              } else
                v !== this._totalTime &&
                  this._onUpdate &&
                  (e || this._callback('onUpdate'));
            }),
            (l.getActive = function(t, e, n) {
              var r,
                i,
                o = [],
                a = this.getChildren(t || null == t, e || null == t, !!n),
                s = 0,
                l = a.length;
              for (r = 0; r < l; r++) (i = a[r]).isActive() && (o[s++] = i);
              return o;
            }),
            (l.getLabelAfter = function(t) {
              t || (0 !== t && (t = this._time));
              var e,
                n = this.getLabelsArray(),
                r = n.length;
              for (e = 0; e < r; e++) if (n[e].time > t) return n[e].name;
              return null;
            }),
            (l.getLabelBefore = function(t) {
              null == t && (t = this._time);
              for (var e = this.getLabelsArray(), n = e.length; --n > -1; )
                if (e[n].time < t) return e[n].name;
              return null;
            }),
            (l.getLabelsArray = function() {
              var t,
                e = [],
                n = 0;
              for (t in this._labels)
                e[n++] = { time: this._labels[t], name: t };
              return (
                e.sort(function(t, e) {
                  return t.time - e.time;
                }),
                e
              );
            }),
            (l.invalidate = function() {
              return (this._locked = !1), i.prototype.invalidate.call(this);
            }),
            (l.progress = function(t, e) {
              return arguments.length
                ? this.totalTime(
                    this.duration() *
                      (this._yoyo && 0 != (1 & this._cycle) ? 1 - t : t) +
                      this._cycle * (this._duration + this._repeatDelay),
                    e
                  )
                : this._time / this.duration() || 0;
            }),
            (l.totalProgress = function(t, e) {
              return arguments.length
                ? this.totalTime(this.totalDuration() * t, e)
                : this._totalTime / this.totalDuration() || 0;
            }),
            (l.totalDuration = function(t) {
              return arguments.length
                ? -1 !== this._repeat && t
                  ? this.timeScale(this.totalDuration() / t)
                  : this
                : (this._dirty &&
                    (i.prototype.totalDuration.call(this),
                    (this._totalDuration =
                      -1 === this._repeat
                        ? 999999999999
                        : this._duration * (this._repeat + 1) +
                          this._repeatDelay * this._repeat)),
                  this._totalDuration);
            }),
            (l.time = function(t, e) {
              if (!arguments.length) return this._time;
              this._dirty && this.totalDuration();
              var n = this._duration,
                r = this._cycle,
                i = r * (n + this._repeatDelay);
              return (
                t > n && (t = n),
                this.totalTime(
                  this._yoyo && 1 & r ? n - t + i : this._repeat ? t + i : t,
                  e
                )
              );
            }),
            (l.repeat = function(t) {
              return arguments.length
                ? ((this._repeat = t), this._uncache(!0))
                : this._repeat;
            }),
            (l.repeatDelay = function(t) {
              return arguments.length
                ? ((this._repeatDelay = t), this._uncache(!0))
                : this._repeatDelay;
            }),
            (l.yoyo = function(t) {
              return arguments.length ? ((this._yoyo = t), this) : this._yoyo;
            }),
            (l.currentLabel = function(t) {
              return arguments.length
                ? this.seek(t, !0)
                : this.getLabelBefore(this._time + 1e-8);
            }),
            t
          );
        },
        !0
      );
      var o = r.g.TimelineMax;
      /*!
       * VERSION: 2.1.3
       * DATE: 2019-05-17
       * UPDATES AND DOCS AT: http://greensock.com
       *
       * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
       * This work is subject to the terms at http://greensock.com/standard-license or for
       * Club GreenSock members, the software agreement that was issued with your membership.
       *
       * @author: Jack Doyle, jack@greensock.com
       **/ r.e._gsDefine(
        'TweenMax',
        ['core.Animation', 'core.SimpleTimeline', 'TweenLite'],
        function() {
          var t = function(t) {
              var e,
                n = [],
                r = t.length;
              for (e = 0; e !== r; n.push(t[e++]));
              return n;
            },
            e = function(t, e, n) {
              var r,
                i,
                o = t.cycle;
              for (r in o)
                (i = o[r]),
                  (t[r] =
                    'function' == typeof i ? i(n, e[n], e) : i[n % i.length]);
              delete t.cycle;
            },
            n = function(t) {
              if ('function' == typeof t) return t;
              var e = 'object' == typeof t ? t : { each: t },
                n = e.ease,
                r = e.from || 0,
                i = e.base || 0,
                o = {},
                a = isNaN(r),
                s = e.axis,
                l = { center: 0.5, end: 1 }[r] || 0;
              return function(t, c, u) {
                var h,
                  f,
                  p,
                  d,
                  m,
                  g,
                  v,
                  _,
                  y,
                  b = (u || e).length,
                  T = o[b];
                if (!T) {
                  if (!(y = 'auto' === e.grid ? 0 : (e.grid || [1 / 0])[0])) {
                    for (
                      v = -1 / 0;
                      v < (v = u[y++].getBoundingClientRect().left) && y < b;

                    );
                    y--;
                  }
                  for (
                    T = o[b] = [],
                      h = a ? Math.min(y, b) * l - 0.5 : r % y,
                      f = a ? (b * l) / y - 0.5 : (r / y) | 0,
                      v = 0,
                      _ = 1 / 0,
                      g = 0;
                    g < b;
                    g++
                  )
                    (p = (g % y) - h),
                      (d = f - ((g / y) | 0)),
                      (T[g] = m = s
                        ? Math.abs('y' === s ? d : p)
                        : Math.sqrt(p * p + d * d)),
                      m > v && (v = m),
                      m < _ && (_ = m);
                  (T.max = v - _),
                    (T.min = _),
                    (T.v = b =
                      e.amount ||
                      e.each *
                        (y > b
                          ? b - 1
                          : s
                          ? 'y' === s
                            ? b / y
                            : y
                          : Math.max(y, b / y)) ||
                      0),
                    (T.b = b < 0 ? i - b : i);
                }
                return (
                  (b = (T[t] - T.min) / T.max),
                  T.b + (n ? n.getRatio(b) : b) * T.v
                );
              };
            },
            i = function(t, e, n) {
              r.f.call(this, t, e, n),
                (this._cycle = 0),
                (this._yoyo = !0 === this.vars.yoyo || !!this.vars.yoyoEase),
                (this._repeat = this.vars.repeat || 0),
                (this._repeatDelay = this.vars.repeatDelay || 0),
                this._repeat && this._uncache(!0),
                (this.render = i.prototype.render);
            },
            o = r.f._internals,
            a = o.isSelector,
            s = o.isArray,
            l = (i.prototype = r.f.to({}, 0.1, {})),
            c = [];
          (i.version = '2.1.3'),
            (l.constructor = i),
            (l.kill()._gc = !1),
            (i.killTweensOf = i.killDelayedCallsTo = r.f.killTweensOf),
            (i.getTweensOf = r.f.getTweensOf),
            (i.lagSmoothing = r.f.lagSmoothing),
            (i.ticker = r.f.ticker),
            (i.render = r.f.render),
            (i.distribute = n),
            (l.invalidate = function() {
              return (
                (this._yoyo = !0 === this.vars.yoyo || !!this.vars.yoyoEase),
                (this._repeat = this.vars.repeat || 0),
                (this._repeatDelay = this.vars.repeatDelay || 0),
                (this._yoyoEase = null),
                this._uncache(!0),
                r.f.prototype.invalidate.call(this)
              );
            }),
            (l.updateTo = function(t, e) {
              var n,
                i = this.ratio,
                o = this.vars.immediateRender || t.immediateRender;
              for (n in (e &&
                this._startTime < this._timeline._time &&
                ((this._startTime = this._timeline._time),
                this._uncache(!1),
                this._gc
                  ? this._enabled(!0, !1)
                  : this._timeline.insert(this, this._startTime - this._delay)),
              t))
                this.vars[n] = t[n];
              if (this._initted || o)
                if (e) (this._initted = !1), o && this.render(0, !0, !0);
                else if (
                  (this._gc && this._enabled(!0, !1),
                  this._notifyPluginsOfEnabled &&
                    this._firstPT &&
                    r.f._onPluginEvent('_onDisable', this),
                  this._time / this._duration > 0.998)
                ) {
                  var a = this._totalTime;
                  this.render(0, !0, !1),
                    (this._initted = !1),
                    this.render(a, !0, !1);
                } else if (
                  ((this._initted = !1), this._init(), this._time > 0 || o)
                )
                  for (var s, l = 1 / (1 - i), c = this._firstPT; c; )
                    (s = c.s + c.c), (c.c *= l), (c.s = s - c.c), (c = c._next);
              return this;
            }),
            (l.render = function(t, e, n) {
              this._initted ||
                (0 === this._duration && this.vars.repeat && this.invalidate());
              var i,
                a,
                s,
                l,
                c,
                u,
                h,
                f,
                p,
                d = this._dirty ? this.totalDuration() : this._totalDuration,
                m = this._time,
                g = this._totalTime,
                v = this._cycle,
                _ = this._duration,
                y = this._rawPrevTime;
              if (
                (t >= d - 1e-8 && t >= 0
                  ? ((this._totalTime = d),
                    (this._cycle = this._repeat),
                    this._yoyo && 0 != (1 & this._cycle)
                      ? ((this._time = 0),
                        (this.ratio = this._ease._calcEnd
                          ? this._ease.getRatio(0)
                          : 0))
                      : ((this._time = _),
                        (this.ratio = this._ease._calcEnd
                          ? this._ease.getRatio(1)
                          : 1)),
                    this._reversed ||
                      ((i = !0),
                      (a = 'onComplete'),
                      (n = n || this._timeline.autoRemoveChildren)),
                    0 === _ &&
                      (this._initted || !this.vars.lazy || n) &&
                      (this._startTime === this._timeline._duration && (t = 0),
                      (y < 0 ||
                        (t <= 0 && t >= -1e-8) ||
                        (1e-8 === y && 'isPause' !== this.data)) &&
                        y !== t &&
                        ((n = !0), y > 1e-8 && (a = 'onReverseComplete')),
                      (this._rawPrevTime = f = !e || t || y === t ? t : 1e-8)))
                  : t < 1e-8
                  ? ((this._totalTime = this._time = this._cycle = 0),
                    (this.ratio = this._ease._calcEnd
                      ? this._ease.getRatio(0)
                      : 0),
                    (0 !== g || (0 === _ && y > 0)) &&
                      ((a = 'onReverseComplete'), (i = this._reversed)),
                    t > -1e-8
                      ? (t = 0)
                      : t < 0 &&
                        ((this._active = !1),
                        0 === _ &&
                          (this._initted || !this.vars.lazy || n) &&
                          (y >= 0 && (n = !0),
                          (this._rawPrevTime = f =
                            !e || t || y === t ? t : 1e-8))),
                    this._initted || (n = !0))
                  : ((this._totalTime = this._time = t),
                    0 !== this._repeat &&
                      ((l = _ + this._repeatDelay),
                      (this._cycle = (this._totalTime / l) >> 0),
                      0 !== this._cycle &&
                        this._cycle === this._totalTime / l &&
                        g <= t &&
                        this._cycle--,
                      (this._time = this._totalTime - this._cycle * l),
                      this._yoyo &&
                        0 != (1 & this._cycle) &&
                        ((this._time = _ - this._time),
                        (p = this._yoyoEase || this.vars.yoyoEase) &&
                          (this._yoyoEase ||
                            (!0 !== p || this._initted
                              ? (this._yoyoEase = p =
                                  !0 === p
                                    ? this._ease
                                    : p instanceof r.b
                                    ? p
                                    : r.b.map[p])
                              : ((p = this.vars.ease),
                                (this._yoyoEase = p = p
                                  ? p instanceof r.b
                                    ? p
                                    : 'function' == typeof p
                                    ? new r.b(p, this.vars.easeParams)
                                    : r.b.map[p] || r.f.defaultEase
                                  : r.f.defaultEase))),
                          (this.ratio = p
                            ? 1 - p.getRatio((_ - this._time) / _)
                            : 0))),
                      this._time > _
                        ? (this._time = _)
                        : this._time < 0 && (this._time = 0)),
                    this._easeType && !p
                      ? ((c = this._time / _),
                        (1 === (u = this._easeType) || (3 === u && c >= 0.5)) &&
                          (c = 1 - c),
                        3 === u && (c *= 2),
                        1 === (h = this._easePower)
                          ? (c *= c)
                          : 2 === h
                          ? (c *= c * c)
                          : 3 === h
                          ? (c *= c * c * c)
                          : 4 === h && (c *= c * c * c * c),
                        (this.ratio =
                          1 === u
                            ? 1 - c
                            : 2 === u
                            ? c
                            : this._time / _ < 0.5
                            ? c / 2
                            : 1 - c / 2))
                      : p ||
                        (this.ratio = this._ease.getRatio(this._time / _))),
                m !== this._time || n || v !== this._cycle)
              ) {
                if (!this._initted) {
                  if ((this._init(), !this._initted || this._gc)) return;
                  if (
                    !n &&
                    this._firstPT &&
                    ((!1 !== this.vars.lazy && this._duration) ||
                      (this.vars.lazy && !this._duration))
                  )
                    return (
                      (this._time = m),
                      (this._totalTime = g),
                      (this._rawPrevTime = y),
                      (this._cycle = v),
                      o.lazyTweens.push(this),
                      void (this._lazy = [t, e])
                    );
                  !this._time || i || p
                    ? i &&
                      this._ease._calcEnd &&
                      !p &&
                      (this.ratio = this._ease.getRatio(
                        0 === this._time ? 0 : 1
                      ))
                    : (this.ratio = this._ease.getRatio(this._time / _));
                }
                for (
                  !1 !== this._lazy && (this._lazy = !1),
                    this._active ||
                      (!this._paused &&
                        this._time !== m &&
                        t >= 0 &&
                        (this._active = !0)),
                    0 === g &&
                      (2 === this._initted && t > 0 && this._init(),
                      this._startAt &&
                        (t >= 0
                          ? this._startAt.render(t, !0, n)
                          : a || (a = '_dummyGS')),
                      this.vars.onStart &&
                        ((0 === this._totalTime && 0 !== _) ||
                          e ||
                          this._callback('onStart'))),
                    s = this._firstPT;
                  s;

                )
                  s.f
                    ? s.t[s.p](s.c * this.ratio + s.s)
                    : (s.t[s.p] = s.c * this.ratio + s.s),
                    (s = s._next);
                this._onUpdate &&
                  (t < 0 &&
                    this._startAt &&
                    this._startTime &&
                    this._startAt.render(t, !0, n),
                  e ||
                    ((this._totalTime !== g || a) &&
                      this._callback('onUpdate'))),
                  this._cycle !== v &&
                    (e ||
                      this._gc ||
                      (this.vars.onRepeat && this._callback('onRepeat'))),
                  a &&
                    ((this._gc && !n) ||
                      (t < 0 &&
                        this._startAt &&
                        !this._onUpdate &&
                        this._startTime &&
                        this._startAt.render(t, !0, n),
                      i &&
                        (this._timeline.autoRemoveChildren &&
                          this._enabled(!1, !1),
                        (this._active = !1)),
                      !e && this.vars[a] && this._callback(a),
                      0 === _ &&
                        1e-8 === this._rawPrevTime &&
                        1e-8 !== f &&
                        (this._rawPrevTime = 0)));
              } else
                g !== this._totalTime &&
                  this._onUpdate &&
                  (e || this._callback('onUpdate'));
            }),
            (i.to = function(t, e, n) {
              return new i(t, e, n);
            }),
            (i.from = function(t, e, n) {
              return (
                (n.runBackwards = !0),
                (n.immediateRender = 0 != n.immediateRender),
                new i(t, e, n)
              );
            }),
            (i.fromTo = function(t, e, n, r) {
              return (
                (r.startAt = n),
                (r.immediateRender =
                  0 != r.immediateRender && 0 != n.immediateRender),
                new i(t, e, r)
              );
            }),
            (i.staggerTo = i.allTo = function(o, l, u, h, f, p, d) {
              var m,
                g,
                v,
                _,
                y = [],
                b = n(u.stagger || h),
                T = u.cycle,
                x = (u.startAt || c).cycle;
              for (
                s(o) ||
                  ('string' == typeof o && (o = r.f.selector(o) || o),
                  a(o) && (o = t(o))),
                  m = (o = o || []).length - 1,
                  v = 0;
                v <= m;
                v++
              ) {
                for (_ in ((g = {}), u)) g[_] = u[_];
                if (
                  (T &&
                    (e(g, o, v),
                    null != g.duration &&
                      ((l = g.duration), delete g.duration)),
                  x)
                ) {
                  for (_ in ((x = g.startAt = {}), u.startAt))
                    x[_] = u.startAt[_];
                  e(g.startAt, o, v);
                }
                (g.delay = b(v, o[v], o) + (g.delay || 0)),
                  v === m &&
                    f &&
                    (g.onComplete = function() {
                      u.onComplete &&
                        u.onComplete.apply(
                          u.onCompleteScope || this,
                          arguments
                        ),
                        f.apply(d || u.callbackScope || this, p || c);
                    }),
                  (y[v] = new i(o[v], l, g));
              }
              return y;
            }),
            (i.staggerFrom = i.allFrom = function(t, e, n, r, o, a, s) {
              return (
                (n.runBackwards = !0),
                (n.immediateRender = 0 != n.immediateRender),
                i.staggerTo(t, e, n, r, o, a, s)
              );
            }),
            (i.staggerFromTo = i.allFromTo = function(t, e, n, r, o, a, s, l) {
              return (
                (r.startAt = n),
                (r.immediateRender =
                  0 != r.immediateRender && 0 != n.immediateRender),
                i.staggerTo(t, e, r, o, a, s, l)
              );
            }),
            (i.delayedCall = function(t, e, n, r, o) {
              return new i(e, 0, {
                delay: t,
                onComplete: e,
                onCompleteParams: n,
                callbackScope: r,
                onReverseComplete: e,
                onReverseCompleteParams: n,
                immediateRender: !1,
                useFrames: o,
                overwrite: 0
              });
            }),
            (i.set = function(t, e) {
              return new i(t, 0, e);
            }),
            (i.isTweening = function(t) {
              return r.f.getTweensOf(t, !0).length > 0;
            });
          var u = function(t, e) {
              for (var n = [], i = 0, o = t._first; o; )
                o instanceof r.f
                  ? (n[i++] = o)
                  : (e && (n[i++] = o), (i = (n = n.concat(u(o, e))).length)),
                  (o = o._next);
              return n;
            },
            h = (i.getAllTweens = function(t) {
              return u(r.a._rootTimeline, t).concat(
                u(r.a._rootFramesTimeline, t)
              );
            });
          (i.killAll = function(t, e, n, i) {
            null == e && (e = !0), null == n && (n = !0);
            var o,
              a,
              s,
              l = h(0 != i),
              c = l.length,
              u = e && n && i;
            for (s = 0; s < c; s++)
              (a = l[s]),
                (u ||
                  a instanceof r.c ||
                  ((o = a.target === a.vars.onComplete) && n) ||
                  (e && !o)) &&
                  (t
                    ? a.totalTime(a._reversed ? 0 : a.totalDuration())
                    : a._enabled(!1, !1));
          }),
            (i.killChildTweensOf = function(e, n) {
              if (null != e) {
                var l,
                  c,
                  u,
                  h,
                  f,
                  p = o.tweenLookup;
                if (
                  ('string' == typeof e && (e = r.f.selector(e) || e),
                  a(e) && (e = t(e)),
                  s(e))
                )
                  for (h = e.length; --h > -1; ) i.killChildTweensOf(e[h], n);
                else {
                  for (u in ((l = []), p))
                    for (c = p[u].target.parentNode; c; )
                      c === e && (l = l.concat(p[u].tweens)),
                        (c = c.parentNode);
                  for (f = l.length, h = 0; h < f; h++)
                    n && l[h].totalTime(l[h].totalDuration()),
                      l[h]._enabled(!1, !1);
                }
              }
            });
          var f = function(t, e, n, i) {
            (e = !1 !== e), (n = !1 !== n);
            for (
              var o, a, s = h((i = !1 !== i)), l = e && n && i, c = s.length;
              --c > -1;

            )
              (a = s[c]),
                (l ||
                  a instanceof r.c ||
                  ((o = a.target === a.vars.onComplete) && n) ||
                  (e && !o)) &&
                  a.paused(t);
          };
          return (
            (i.pauseAll = function(t, e, n) {
              f(!0, t, e, n);
            }),
            (i.resumeAll = function(t, e, n) {
              f(!1, t, e, n);
            }),
            (i.globalTimeScale = function(t) {
              var e = r.a._rootTimeline,
                n = r.f.ticker.time;
              return arguments.length
                ? ((t = t || 1e-8),
                  (e._startTime = n - ((n - e._startTime) * e._timeScale) / t),
                  (e = r.a._rootFramesTimeline),
                  (n = r.f.ticker.frame),
                  (e._startTime = n - ((n - e._startTime) * e._timeScale) / t),
                  (e._timeScale = r.a._rootTimeline._timeScale = t),
                  t)
                : e._timeScale;
            }),
            (l.progress = function(t, e) {
              return arguments.length
                ? this.totalTime(
                    this.duration() *
                      (this._yoyo && 0 != (1 & this._cycle) ? 1 - t : t) +
                      this._cycle * (this._duration + this._repeatDelay),
                    e
                  )
                : this.duration()
                ? this._time / this._duration
                : this.ratio;
            }),
            (l.totalProgress = function(t, e) {
              return arguments.length
                ? this.totalTime(this.totalDuration() * t, e)
                : this._totalTime / this.totalDuration();
            }),
            (l.time = function(t, e) {
              if (!arguments.length) return this._time;
              this._dirty && this.totalDuration();
              var n = this._duration,
                r = this._cycle,
                i = r * (n + this._repeatDelay);
              return (
                t > n && (t = n),
                this.totalTime(
                  this._yoyo && 1 & r ? n - t + i : this._repeat ? t + i : t,
                  e
                )
              );
            }),
            (l.duration = function(t) {
              return arguments.length
                ? r.a.prototype.duration.call(this, t)
                : this._duration;
            }),
            (l.totalDuration = function(t) {
              return arguments.length
                ? -1 === this._repeat
                  ? this
                  : this.duration(
                      (t - this._repeat * this._repeatDelay) /
                        (this._repeat + 1)
                    )
                : (this._dirty &&
                    ((this._totalDuration =
                      -1 === this._repeat
                        ? 999999999999
                        : this._duration * (this._repeat + 1) +
                          this._repeatDelay * this._repeat),
                    (this._dirty = !1)),
                  this._totalDuration);
            }),
            (l.repeat = function(t) {
              return arguments.length
                ? ((this._repeat = t), this._uncache(!0))
                : this._repeat;
            }),
            (l.repeatDelay = function(t) {
              return arguments.length
                ? ((this._repeatDelay = t), this._uncache(!0))
                : this._repeatDelay;
            }),
            (l.yoyo = function(t) {
              return arguments.length ? ((this._yoyo = t), this) : this._yoyo;
            }),
            i
          );
        },
        !0
      );
      var a = r.g.TweenMax;
      /*!
       * VERSION: 2.1.3
       * DATE: 2019-05-17
       * UPDATES AND DOCS AT: http://greensock.com
       *
       * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
       * This work is subject to the terms at http://greensock.com/standard-license or for
       * Club GreenSock members, the software agreement that was issued with your membership.
       *
       * @author: Jack Doyle, jack@greensock.com
       */
      r.e._gsDefine(
        'plugins.CSSPlugin',
        ['plugins.TweenPlugin', 'TweenLite'],
        function() {
          var t,
            e,
            n,
            i,
            o = function() {
              r.d.call(this, 'css'),
                (this._overwriteProps.length = 0),
                (this.setRatio = o.prototype.setRatio);
            },
            a = r.e._gsDefine.globals,
            s = {},
            l = (o.prototype = new r.d('css'));
          (l.constructor = o),
            (o.version = '2.1.3'),
            (o.API = 2),
            (o.defaultTransformPerspective = 0),
            (o.defaultSkewType = 'compensated'),
            (o.defaultSmoothOrigin = !0),
            (l = 'px'),
            (o.suffixMap = {
              top: l,
              right: l,
              bottom: l,
              left: l,
              width: l,
              height: l,
              fontSize: l,
              padding: l,
              margin: l,
              perspective: l,
              lineHeight: ''
            });
          var c,
            u,
            h,
            f,
            p,
            d,
            m,
            g,
            v = /(?:\-|\.|\b)(\d|\.|e\-)+/g,
            _ = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
            y = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
            b = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b),?/gi,
            T = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
            x = /(?:\d|\-|\+|=|#|\.)*/g,
            w = /opacity *= *([^)]*)/i,
            E = /opacity:([^;]*)/i,
            A = /alpha\(opacity *=.+?\)/i,
            C = /^(rgb|hsl)/,
            P = /([A-Z])/g,
            R = /-([a-z])/gi,
            I = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
            S = function(t, e) {
              return e.toUpperCase();
            },
            M = /(?:Left|Right|Width)/i,
            O = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
            k = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
            N = /,(?=[^\)]*(?:\(|$))/gi,
            D = /[\s,\(]/i,
            F = Math.PI / 180,
            L = 180 / Math.PI,
            U = {},
            B = { style: {} },
            z = r.e.document || {
              createElement: function() {
                return B;
              }
            },
            j = function(t, e) {
              var n = z.createElementNS
                ? z.createElementNS(e || 'http://www.w3.org/1999/xhtml', t)
                : z.createElement(t);
              return n.style ? n : z.createElement(t);
            },
            V = j('div'),
            X = j('img'),
            q = (o._internals = { _specialProps: s }),
            H = (r.e.navigator || {}).userAgent || '',
            G = (function() {
              var t = H.indexOf('Android'),
                e = j('a');
              return (
                (h =
                  -1 !== H.indexOf('Safari') &&
                  -1 === H.indexOf('Chrome') &&
                  (-1 === t || parseFloat(H.substr(t + 8, 2)) > 3)),
                (p =
                  h && parseFloat(H.substr(H.indexOf('Version/') + 8, 2)) < 6),
                (f = -1 !== H.indexOf('Firefox')),
                (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(H) ||
                  /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(H)) &&
                  (d = parseFloat(RegExp.$1)),
                !!e &&
                  ((e.style.cssText = 'top:1px;opacity:.55;'),
                  /^0.55/.test(e.style.opacity))
              );
            })(),
            Y = function(t) {
              return w.test(
                'string' == typeof t
                  ? t
                  : (t.currentStyle ? t.currentStyle.filter : t.style.filter) ||
                      ''
              )
                ? parseFloat(RegExp.$1) / 100
                : 1;
            },
            W = function(t) {
              r.e.console && console.log(t);
            },
            K = '',
            Z = '',
            J = function(t, e) {
              var n,
                r,
                i = (e = e || V).style;
              if (void 0 !== i[t]) return t;
              for (
                t = t.charAt(0).toUpperCase() + t.substr(1),
                  n = ['O', 'Moz', 'ms', 'Ms', 'Webkit'],
                  r = 5;
                --r > -1 && void 0 === i[n[r] + t];

              );
              return r >= 0
                ? ((K = '-' + (Z = 3 === r ? 'ms' : n[r]).toLowerCase() + '-'),
                  Z + t)
                : null;
            },
            Q =
              'undefined' != typeof window
                ? window
                : z.defaultView || { getComputedStyle: function() {} },
            $ = function(t) {
              return Q.getComputedStyle(t);
            },
            tt = (o.getStyle = function(t, e, n, r, i) {
              var o;
              return G || 'opacity' !== e
                ? (!r && t.style[e]
                    ? (o = t.style[e])
                    : (n = n || $(t))
                    ? (o =
                        n[e] ||
                        n.getPropertyValue(e) ||
                        n.getPropertyValue(e.replace(P, '-$1').toLowerCase()))
                    : t.currentStyle && (o = t.currentStyle[e]),
                  null == i ||
                  (o && 'none' !== o && 'auto' !== o && 'auto auto' !== o)
                    ? o
                    : i)
                : Y(t);
            }),
            et = (q.convertToPixels = function(t, e, n, i, a) {
              if ('px' === i || (!i && 'lineHeight' !== e)) return n;
              if ('auto' === i || !n) return 0;
              var s,
                l,
                c,
                u = M.test(e),
                h = t,
                f = V.style,
                p = n < 0,
                d = 1 === n;
              if ((p && (n = -n), d && (n *= 100), 'lineHeight' !== e || i))
                if ('%' === i && -1 !== e.indexOf('border'))
                  s = (n / 100) * (u ? t.clientWidth : t.clientHeight);
                else {
                  if (
                    ((f.cssText =
                      'border:0 solid red;position:' +
                      tt(t, 'position') +
                      ';line-height:0;'),
                    '%' !== i &&
                      h.appendChild &&
                      'v' !== i.charAt(0) &&
                      'rem' !== i)
                  )
                    f[u ? 'borderLeftWidth' : 'borderTopWidth'] = n + i;
                  else {
                    if (
                      ((h = t.parentNode || z.body),
                      -1 !== tt(h, 'display').indexOf('flex') &&
                        (f.position = 'absolute'),
                      (l = h._gsCache),
                      (c = r.f.ticker.frame),
                      l && u && l.time === c)
                    )
                      return (l.width * n) / 100;
                    f[u ? 'width' : 'height'] = n + i;
                  }
                  h.appendChild(V),
                    (s = parseFloat(V[u ? 'offsetWidth' : 'offsetHeight'])),
                    h.removeChild(V),
                    u &&
                      '%' === i &&
                      !1 !== o.cacheWidths &&
                      (((l = h._gsCache = h._gsCache || {}).time = c),
                      (l.width = (s / n) * 100)),
                    0 !== s || a || (s = et(t, e, n, i, !0));
                }
              else
                (l = $(t).lineHeight),
                  (t.style.lineHeight = n),
                  (s = parseFloat($(t).lineHeight)),
                  (t.style.lineHeight = l);
              return d && (s /= 100), p ? -s : s;
            }),
            nt = (q.calculateOffset = function(t, e, n) {
              if ('absolute' !== tt(t, 'position', n)) return 0;
              var r = 'left' === e ? 'Left' : 'Top',
                i = tt(t, 'margin' + r, n);
              return (
                t['offset' + r] -
                (et(t, e, parseFloat(i), i.replace(x, '')) || 0)
              );
            }),
            rt = function(t, e) {
              var n,
                r,
                i,
                o = {};
              if ((e = e || $(t)))
                if ((n = e.length))
                  for (; --n > -1; )
                    (-1 !== (i = e[n]).indexOf('-transform') && Nt !== i) ||
                      (o[i.replace(R, S)] = e.getPropertyValue(i));
                else
                  for (n in e)
                    (-1 !== n.indexOf('Transform') && kt !== n) ||
                      (o[n] = e[n]);
              else if ((e = t.currentStyle || t.style))
                for (n in e)
                  'string' == typeof n &&
                    void 0 === o[n] &&
                    (o[n.replace(R, S)] = e[n]);
              return (
                G || (o.opacity = Y(t)),
                (r = Yt(t, e, !1)),
                (o.rotation = r.rotation),
                (o.skewX = r.skewX),
                (o.scaleX = r.scaleX),
                (o.scaleY = r.scaleY),
                (o.x = r.x),
                (o.y = r.y),
                Ft &&
                  ((o.z = r.z),
                  (o.rotationX = r.rotationX),
                  (o.rotationY = r.rotationY),
                  (o.scaleZ = r.scaleZ)),
                o.filters && delete o.filters,
                o
              );
            },
            it = function(t, e, n, r, i) {
              var o,
                a,
                s,
                l = {},
                c = t.style;
              for (a in n)
                'cssText' !== a &&
                  'length' !== a &&
                  isNaN(a) &&
                  (e[a] !== (o = n[a]) || (i && i[a])) &&
                  -1 === a.indexOf('Origin') &&
                  (('number' != typeof o && 'string' != typeof o) ||
                    ((l[a] =
                      'auto' !== o || ('left' !== a && 'top' !== a)
                        ? ('' !== o && 'auto' !== o && 'none' !== o) ||
                          'string' != typeof e[a] ||
                          '' === e[a].replace(T, '')
                          ? o
                          : 0
                        : nt(t, a)),
                    void 0 !== c[a] && (s = new yt(c, a, c[a], s))));
              if (r) for (a in r) 'className' !== a && (l[a] = r[a]);
              return { difs: l, firstMPT: s };
            },
            ot = { width: ['Left', 'Right'], height: ['Top', 'Bottom'] },
            at = ['marginLeft', 'marginRight', 'marginTop', 'marginBottom'],
            st = function(t, e, n) {
              if ('svg' === (t.nodeName + '').toLowerCase())
                return (n || $(t))[e] || 0;
              if (t.getCTM && qt(t)) return t.getBBox()[e] || 0;
              var r = parseFloat(
                  'width' === e ? t.offsetWidth : t.offsetHeight
                ),
                i = ot[e],
                o = i.length;
              for (n = n || $(t); --o > -1; )
                (r -= parseFloat(tt(t, 'padding' + i[o], n, !0)) || 0),
                  (r -=
                    parseFloat(tt(t, 'border' + i[o] + 'Width', n, !0)) || 0);
              return r;
            },
            lt = function(t, e) {
              if ('contain' === t || 'auto' === t || 'auto auto' === t)
                return t + ' ';
              (null != t && '' !== t) || (t = '0 0');
              var n,
                r = t.split(' '),
                i =
                  -1 !== t.indexOf('left')
                    ? '0%'
                    : -1 !== t.indexOf('right')
                    ? '100%'
                    : r[0],
                o =
                  -1 !== t.indexOf('top')
                    ? '0%'
                    : -1 !== t.indexOf('bottom')
                    ? '100%'
                    : r[1];
              if (r.length > 3 && !e) {
                for (
                  r = t
                    .split(', ')
                    .join(',')
                    .split(','),
                    t = [],
                    n = 0;
                  n < r.length;
                  n++
                )
                  t.push(lt(r[n]));
                return t.join(',');
              }
              return (
                null == o
                  ? (o = 'center' === i ? '50%' : '0')
                  : 'center' === o && (o = '50%'),
                ('center' === i ||
                  (isNaN(parseFloat(i)) && -1 === (i + '').indexOf('='))) &&
                  (i = '50%'),
                (t = i + ' ' + o + (r.length > 2 ? ' ' + r[2] : '')),
                e &&
                  ((e.oxp = -1 !== i.indexOf('%')),
                  (e.oyp = -1 !== o.indexOf('%')),
                  (e.oxr = '=' === i.charAt(1)),
                  (e.oyr = '=' === o.charAt(1)),
                  (e.ox = parseFloat(i.replace(T, ''))),
                  (e.oy = parseFloat(o.replace(T, ''))),
                  (e.v = t)),
                e || t
              );
            },
            ct = function(t, e) {
              return (
                'function' == typeof t && (t = t(g, m)),
                'string' == typeof t && '=' === t.charAt(1)
                  ? parseInt(t.charAt(0) + '1', 10) * parseFloat(t.substr(2))
                  : parseFloat(t) - parseFloat(e) || 0
              );
            },
            ut = function(t, e) {
              'function' == typeof t && (t = t(g, m));
              var n = 'string' == typeof t && '=' === t.charAt(1);
              return (
                'string' == typeof t &&
                  'v' === t.charAt(t.length - 2) &&
                  (t =
                    (n ? t.substr(0, 2) : 0) +
                    window[
                      'inner' + ('vh' === t.substr(-2) ? 'Height' : 'Width')
                    ] *
                      (parseFloat(n ? t.substr(2) : t) / 100)),
                null == t
                  ? e
                  : n
                  ? parseInt(t.charAt(0) + '1', 10) * parseFloat(t.substr(2)) +
                    e
                  : parseFloat(t) || 0
              );
            },
            ht = function(t, e, n, r) {
              var i, o, a, s;
              return (
                'function' == typeof t && (t = t(g, m)),
                null == t
                  ? (a = e)
                  : 'number' == typeof t
                  ? (a = t)
                  : (360,
                    (i = t.split('_')),
                    (o =
                      ((s = '=' === t.charAt(1))
                        ? parseInt(t.charAt(0) + '1', 10) *
                          parseFloat(i[0].substr(2))
                        : parseFloat(i[0])) *
                        (-1 === t.indexOf('rad') ? 1 : L) -
                      (s ? 0 : e)),
                    i.length &&
                      (r && (r[n] = e + o),
                      -1 !== t.indexOf('short') &&
                        (o %= 360) !== o % 180 &&
                        (o = o < 0 ? o + 360 : o - 360),
                      -1 !== t.indexOf('_cw') && o < 0
                        ? (o =
                            ((o + 3599999999640) % 360) - 360 * ((o / 360) | 0))
                        : -1 !== t.indexOf('ccw') &&
                          o > 0 &&
                          (o =
                            ((o - 3599999999640) % 360) -
                            360 * ((o / 360) | 0))),
                    (a = e + o)),
                a < 1e-6 && a > -1e-6 && (a = 0),
                a
              );
            },
            ft = {
              aqua: [0, 255, 255],
              lime: [0, 255, 0],
              silver: [192, 192, 192],
              black: [0, 0, 0],
              maroon: [128, 0, 0],
              teal: [0, 128, 128],
              blue: [0, 0, 255],
              navy: [0, 0, 128],
              white: [255, 255, 255],
              fuchsia: [255, 0, 255],
              olive: [128, 128, 0],
              yellow: [255, 255, 0],
              orange: [255, 165, 0],
              gray: [128, 128, 128],
              purple: [128, 0, 128],
              green: [0, 128, 0],
              red: [255, 0, 0],
              pink: [255, 192, 203],
              cyan: [0, 255, 255],
              transparent: [255, 255, 255, 0]
            },
            pt = function(t, e, n) {
              return (
                (255 *
                  (6 * (t = t < 0 ? t + 1 : t > 1 ? t - 1 : t) < 1
                    ? e + (n - e) * t * 6
                    : t < 0.5
                    ? n
                    : 3 * t < 2
                    ? e + (n - e) * (2 / 3 - t) * 6
                    : e) +
                  0.5) |
                0
              );
            },
            dt = (o.parseColor = function(t, e) {
              var n, r, i, o, a, s, l, c, u, h, f;
              if (t)
                if ('number' == typeof t)
                  n = [t >> 16, (t >> 8) & 255, 255 & t];
                else {
                  if (
                    (',' === t.charAt(t.length - 1) &&
                      (t = t.substr(0, t.length - 1)),
                    ft[t])
                  )
                    n = ft[t];
                  else if ('#' === t.charAt(0))
                    4 === t.length &&
                      ((r = t.charAt(1)),
                      (i = t.charAt(2)),
                      (o = t.charAt(3)),
                      (t = '#' + r + r + i + i + o + o)),
                      (n = [
                        (t = parseInt(t.substr(1), 16)) >> 16,
                        (t >> 8) & 255,
                        255 & t
                      ]);
                  else if ('hsl' === t.substr(0, 3))
                    if (((n = f = t.match(v)), e)) {
                      if (-1 !== t.indexOf('=')) return t.match(_);
                    } else
                      (a = (Number(n[0]) % 360) / 360),
                        (s = Number(n[1]) / 100),
                        (r =
                          2 * (l = Number(n[2]) / 100) -
                          (i = l <= 0.5 ? l * (s + 1) : l + s - l * s)),
                        n.length > 3 && (n[3] = Number(n[3])),
                        (n[0] = pt(a + 1 / 3, r, i)),
                        (n[1] = pt(a, r, i)),
                        (n[2] = pt(a - 1 / 3, r, i));
                  else n = t.match(v) || ft.transparent;
                  (n[0] = Number(n[0])),
                    (n[1] = Number(n[1])),
                    (n[2] = Number(n[2])),
                    n.length > 3 && (n[3] = Number(n[3]));
                }
              else n = ft.black;
              return (
                e &&
                  !f &&
                  ((r = n[0] / 255),
                  (i = n[1] / 255),
                  (o = n[2] / 255),
                  (l = ((c = Math.max(r, i, o)) + (u = Math.min(r, i, o))) / 2),
                  c === u
                    ? (a = s = 0)
                    : ((h = c - u),
                      (s = l > 0.5 ? h / (2 - c - u) : h / (c + u)),
                      (a =
                        c === r
                          ? (i - o) / h + (i < o ? 6 : 0)
                          : c === i
                          ? (o - r) / h + 2
                          : (r - i) / h + 4),
                      (a *= 60)),
                  (n[0] = (a + 0.5) | 0),
                  (n[1] = (100 * s + 0.5) | 0),
                  (n[2] = (100 * l + 0.5) | 0)),
                n
              );
            }),
            mt = function(t, e) {
              var n,
                r,
                i,
                o = t.match(gt) || [],
                a = 0,
                s = '';
              if (!o.length) return t;
              for (n = 0; n < o.length; n++)
                (r = o[n]),
                  (a +=
                    (i = t.substr(a, t.indexOf(r, a) - a)).length + r.length),
                  3 === (r = dt(r, e)).length && r.push(1),
                  (s +=
                    i +
                    (e
                      ? 'hsla(' + r[0] + ',' + r[1] + '%,' + r[2] + '%,' + r[3]
                      : 'rgba(' + r.join(',')) +
                    ')');
              return s + t.substr(a);
            },
            gt =
              '(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b';
          for (l in ft) gt += '|' + l + '\\b';
          (gt = new RegExp(gt + ')', 'gi')),
            (o.colorStringFilter = function(t) {
              var e,
                n = t[0] + ' ' + t[1];
              gt.test(n) &&
                ((e = -1 !== n.indexOf('hsl(') || -1 !== n.indexOf('hsla(')),
                (t[0] = mt(t[0], e)),
                (t[1] = mt(t[1], e))),
                (gt.lastIndex = 0);
            }),
            r.f.defaultStringFilter ||
              (r.f.defaultStringFilter = o.colorStringFilter);
          var vt = function(t, e, n, r) {
              if (null == t)
                return function(t) {
                  return t;
                };
              var i,
                o = e ? (t.match(gt) || [''])[0] : '',
                a =
                  t
                    .split(o)
                    .join('')
                    .match(y) || [],
                s = t.substr(0, t.indexOf(a[0])),
                l = ')' === t.charAt(t.length - 1) ? ')' : '',
                c = -1 !== t.indexOf(' ') ? ' ' : ',',
                u = a.length,
                h = u > 0 ? a[0].replace(v, '') : '';
              return u
                ? (i = e
                    ? function(t) {
                        var e, f, p, d;
                        if ('number' == typeof t) t += h;
                        else if (r && N.test(t)) {
                          for (
                            d = t.replace(N, '|').split('|'), p = 0;
                            p < d.length;
                            p++
                          )
                            d[p] = i(d[p]);
                          return d.join(',');
                        }
                        if (
                          ((e = (t.match(gt) || [o])[0]),
                          (p = (f =
                            t
                              .split(e)
                              .join('')
                              .match(y) || []).length),
                          u > p--)
                        )
                          for (; ++p < u; )
                            f[p] = n ? f[((p - 1) / 2) | 0] : a[p];
                        return (
                          s +
                          f.join(c) +
                          c +
                          e +
                          l +
                          (-1 !== t.indexOf('inset') ? ' inset' : '')
                        );
                      }
                    : function(t) {
                        var e, o, f;
                        if ('number' == typeof t) t += h;
                        else if (r && N.test(t)) {
                          for (
                            o = t.replace(N, '|').split('|'), f = 0;
                            f < o.length;
                            f++
                          )
                            o[f] = i(o[f]);
                          return o.join(',');
                        }
                        if (
                          ((f = (e = t.match(',' === c ? y : b) || []).length),
                          u > f--)
                        )
                          for (; ++f < u; )
                            e[f] = n ? e[((f - 1) / 2) | 0] : a[f];
                        return (
                          ((s &&
                            'none' !== t &&
                            t.substr(0, t.indexOf(e[0]))) ||
                            s) +
                          e.join(c) +
                          l
                        );
                      })
                : function(t) {
                    return t;
                  };
            },
            _t = function(t) {
              return (
                (t = t.split(',')),
                function(e, n, r, i, o, a, s) {
                  var l,
                    c = (n + '').split(' ');
                  for (s = {}, l = 0; l < 4; l++)
                    s[t[l]] = c[l] = c[l] || c[((l - 1) / 2) >> 0];
                  return i.parse(e, s, o, a);
                }
              );
            },
            yt =
              ((q._setPluginRatio = function(t) {
                this.plugin.setRatio(t);
                for (
                  var e, n, r, i, o, a = this.data, s = a.proxy, l = a.firstMPT;
                  l;

                )
                  (e = s[l.v]),
                    l.r ? (e = l.r(e)) : e < 1e-6 && e > -1e-6 && (e = 0),
                    (l.t[l.p] = e),
                    (l = l._next);
                if (
                  (a.autoRotate &&
                    (a.autoRotate.rotation = a.mod
                      ? a.mod.call(this._tween, s.rotation, this.t, this._tween)
                      : s.rotation),
                  1 === t || 0 === t)
                )
                  for (l = a.firstMPT, o = 1 === t ? 'e' : 'b'; l; ) {
                    if ((n = l.t).type) {
                      if (1 === n.type) {
                        for (i = n.xs0 + n.s + n.xs1, r = 1; r < n.l; r++)
                          i += n['xn' + r] + n['xs' + (r + 1)];
                        n[o] = i;
                      }
                    } else n[o] = n.s + n.xs0;
                    l = l._next;
                  }
              }),
              function(t, e, n, r, i) {
                (this.t = t),
                  (this.p = e),
                  (this.v = n),
                  (this.r = i),
                  r && ((r._prev = this), (this._next = r));
              }),
            bt =
              ((q._parseToProxy = function(t, e, n, r, i, o) {
                var a,
                  s,
                  l,
                  c,
                  u,
                  h = r,
                  f = {},
                  p = {},
                  d = n._transform,
                  m = U;
                for (
                  n._transform = null,
                    U = e,
                    r = u = n.parse(t, e, r, i),
                    U = m,
                    o &&
                      ((n._transform = d),
                      h &&
                        ((h._prev = null), h._prev && (h._prev._next = null)));
                  r && r !== h;

                ) {
                  if (
                    r.type <= 1 &&
                    ((p[(s = r.p)] = r.s + r.c),
                    (f[s] = r.s),
                    o || ((c = new yt(r, 's', s, c, r.r)), (r.c = 0)),
                    1 === r.type)
                  )
                    for (a = r.l; --a > 0; )
                      (l = 'xn' + a),
                        (p[(s = r.p + '_' + l)] = r.data[l]),
                        (f[s] = r[l]),
                        o || (c = new yt(r, l, s, c, r.rxp[l]));
                  r = r._next;
                }
                return { proxy: f, end: p, firstMPT: c, pt: u };
              }),
              (q.CSSPropTween = function(e, n, r, o, a, s, l, c, u, h, f) {
                (this.t = e),
                  (this.p = n),
                  (this.s = r),
                  (this.c = o),
                  (this.n = l || n),
                  e instanceof bt || i.push(this.n),
                  (this.r = c ? ('function' == typeof c ? c : Math.round) : c),
                  (this.type = s || 0),
                  u && ((this.pr = u), (t = !0)),
                  (this.b = void 0 === h ? r : h),
                  (this.e = void 0 === f ? r + o : f),
                  a && ((this._next = a), (a._prev = this));
              })),
            Tt = function(t, e, n, r, i, o) {
              var a = new bt(t, e, n, r - n, i, -1, o);
              return (a.b = n), (a.e = a.xs0 = r), a;
            },
            xt = (o.parseComplex = function(t, e, n, r, i, a, s, l, u, h) {
              (n = n || a || ''),
                'function' == typeof r && (r = r(g, m)),
                (s = new bt(t, e, 0, 0, s, h ? 2 : 1, null, !1, l, n, r)),
                (r += ''),
                i &&
                  gt.test(r + n) &&
                  ((r = [n, r]),
                  o.colorStringFilter(r),
                  (n = r[0]),
                  (r = r[1]));
              var f,
                p,
                d,
                y,
                b,
                T,
                x,
                w,
                E,
                A,
                C,
                P,
                R,
                I = n
                  .split(', ')
                  .join(',')
                  .split(' '),
                S = r
                  .split(', ')
                  .join(',')
                  .split(' '),
                M = I.length,
                O = !1 !== c;
              for (
                (-1 === r.indexOf(',') && -1 === n.indexOf(',')) ||
                  (-1 !== (r + n).indexOf('rgb') ||
                  -1 !== (r + n).indexOf('hsl')
                    ? ((I = I.join(' ')
                        .replace(N, ', ')
                        .split(' ')),
                      (S = S.join(' ')
                        .replace(N, ', ')
                        .split(' ')))
                    : ((I = I.join(' ')
                        .split(',')
                        .join(', ')
                        .split(' ')),
                      (S = S.join(' ')
                        .split(',')
                        .join(', ')
                        .split(' '))),
                  (M = I.length)),
                  M !== S.length && (M = (I = (a || '').split(' ')).length),
                  s.plugin = u,
                  s.setRatio = h,
                  gt.lastIndex = 0,
                  f = 0;
                f < M;
                f++
              )
                if (
                  ((y = I[f]), (b = S[f] + ''), (w = parseFloat(y)) || 0 === w)
                )
                  s.appendXtra(
                    '',
                    w,
                    ct(b, w),
                    b.replace(_, ''),
                    !(!O || -1 === b.indexOf('px')) && Math.round,
                    !0
                  );
                else if (i && gt.test(y))
                  (P = ')' + ((P = b.indexOf(')') + 1) ? b.substr(P) : '')),
                    (R = -1 !== b.indexOf('hsl') && G),
                    (A = b),
                    (y = dt(y, R)),
                    (b = dt(b, R)),
                    (E = y.length + b.length > 6) && !G && 0 === b[3]
                      ? ((s['xs' + s.l] += s.l
                          ? ' transparent'
                          : 'transparent'),
                        (s.e = s.e.split(S[f]).join('transparent')))
                      : (G || (E = !1),
                        R
                          ? s
                              .appendXtra(
                                A.substr(0, A.indexOf('hsl')) +
                                  (E ? 'hsla(' : 'hsl('),
                                y[0],
                                ct(b[0], y[0]),
                                ',',
                                !1,
                                !0
                              )
                              .appendXtra('', y[1], ct(b[1], y[1]), '%,', !1)
                              .appendXtra(
                                '',
                                y[2],
                                ct(b[2], y[2]),
                                E ? '%,' : '%' + P,
                                !1
                              )
                          : s
                              .appendXtra(
                                A.substr(0, A.indexOf('rgb')) +
                                  (E ? 'rgba(' : 'rgb('),
                                y[0],
                                b[0] - y[0],
                                ',',
                                Math.round,
                                !0
                              )
                              .appendXtra(
                                '',
                                y[1],
                                b[1] - y[1],
                                ',',
                                Math.round
                              )
                              .appendXtra(
                                '',
                                y[2],
                                b[2] - y[2],
                                E ? ',' : P,
                                Math.round
                              ),
                        E &&
                          ((y = y.length < 4 ? 1 : y[3]),
                          s.appendXtra(
                            '',
                            y,
                            (b.length < 4 ? 1 : b[3]) - y,
                            P,
                            !1
                          ))),
                    (gt.lastIndex = 0);
                else if ((T = y.match(v))) {
                  if (!(x = b.match(_)) || x.length !== T.length) return s;
                  for (d = 0, p = 0; p < T.length; p++)
                    (C = T[p]),
                      (A = y.indexOf(C, d)),
                      s.appendXtra(
                        y.substr(d, A - d),
                        Number(C),
                        ct(x[p], C),
                        '',
                        !(!O || 'px' !== y.substr(A + C.length, 2)) &&
                          Math.round,
                        0 === p
                      ),
                      (d = A + C.length);
                  s['xs' + s.l] += y.substr(d);
                } else s['xs' + s.l] += s.l || s['xs' + s.l] ? ' ' + b : b;
              if (-1 !== r.indexOf('=') && s.data) {
                for (P = s.xs0 + s.data.s, f = 1; f < s.l; f++)
                  P += s['xs' + f] + s.data['xn' + f];
                s.e = P + s['xs' + f];
              }
              return s.l || ((s.type = -1), (s.xs0 = s.e)), s.xfirst || s;
            }),
            wt = 9;
          for ((l = bt.prototype).l = l.pr = 0; --wt > 0; )
            (l['xn' + wt] = 0), (l['xs' + wt] = '');
          (l.xs0 = ''),
            (l._next = l._prev = l.xfirst = l.data = l.plugin = l.setRatio = l.rxp = null),
            (l.appendXtra = function(t, e, n, r, i, o) {
              var a = this,
                s = a.l;
              return (
                (a['xs' + s] += o && (s || a['xs' + s]) ? ' ' + t : t || ''),
                n || 0 === s || a.plugin
                  ? (a.l++,
                    (a.type = a.setRatio ? 2 : 1),
                    (a['xs' + a.l] = r || ''),
                    s > 0
                      ? ((a.data['xn' + s] = e + n),
                        (a.rxp['xn' + s] = i),
                        (a['xn' + s] = e),
                        a.plugin ||
                          ((a.xfirst = new bt(
                            a,
                            'xn' + s,
                            e,
                            n,
                            a.xfirst || a,
                            0,
                            a.n,
                            i,
                            a.pr
                          )),
                          (a.xfirst.xs0 = 0)),
                        a)
                      : ((a.data = { s: e + n }),
                        (a.rxp = {}),
                        (a.s = e),
                        (a.c = n),
                        (a.r = i),
                        a))
                  : ((a['xs' + s] += e + (r || '')), a)
              );
            });
          var Et = function(t, e) {
              (e = e || {}),
                (this.p = (e.prefix && J(t)) || t),
                (s[t] = s[this.p] = this),
                (this.format =
                  e.formatter ||
                  vt(e.defaultValue, e.color, e.collapsible, e.multi)),
                e.parser && (this.parse = e.parser),
                (this.clrs = e.color),
                (this.multi = e.multi),
                (this.keyword = e.keyword),
                (this.dflt = e.defaultValue),
                (this.allowFunc = e.allowFunc),
                (this.pr = e.priority || 0);
            },
            At = (q._registerComplexSpecialProp = function(t, e, n) {
              'object' != typeof e && (e = { parser: n });
              var r,
                i = t.split(','),
                o = e.defaultValue;
              for (n = n || [o], r = 0; r < i.length; r++)
                (e.prefix = 0 === r && e.prefix),
                  (e.defaultValue = n[r] || o),
                  new Et(i[r], e);
            }),
            Ct = (q._registerPluginProp = function(t) {
              if (!s[t]) {
                var e = t.charAt(0).toUpperCase() + t.substr(1) + 'Plugin';
                At(t, {
                  parser: function(t, n, r, i, o, l, c) {
                    var u = a.com.greensock.plugins[e];
                    return u
                      ? (u._cssRegister(), s[r].parse(t, n, r, i, o, l, c))
                      : (W('Error: ' + e + ' js file not loaded.'), o);
                  }
                });
              }
            });
          ((l = Et.prototype).parseComplex = function(t, e, n, r, i, o) {
            var a,
              s,
              l,
              c,
              u,
              h,
              f = this.keyword;
            if (
              (this.multi &&
                (N.test(n) || N.test(e)
                  ? ((s = e.replace(N, '|').split('|')),
                    (l = n.replace(N, '|').split('|')))
                  : f && ((s = [e]), (l = [n]))),
              l)
            ) {
              for (
                c = l.length > s.length ? l.length : s.length, a = 0;
                a < c;
                a++
              )
                (e = s[a] = s[a] || this.dflt),
                  (n = l[a] = l[a] || this.dflt),
                  f &&
                    (u = e.indexOf(f)) !== (h = n.indexOf(f)) &&
                    (-1 === h
                      ? (s[a] = s[a].split(f).join(''))
                      : -1 === u && (s[a] += ' ' + f));
              (e = s.join(', ')), (n = l.join(', '));
            }
            return xt(t, this.p, e, n, this.clrs, this.dflt, r, this.pr, i, o);
          }),
            (l.parse = function(t, e, r, i, o, a, s) {
              return this.parseComplex(
                t.style,
                this.format(tt(t, this.p, n, !1, this.dflt)),
                this.format(e),
                o,
                a
              );
            }),
            (o.registerSpecialProp = function(t, e, n) {
              At(t, {
                parser: function(t, r, i, o, a, s, l) {
                  var c = new bt(t, i, 0, 0, a, 2, i, !1, n);
                  return (c.plugin = s), (c.setRatio = e(t, r, o._tween, i)), c;
                },
                priority: n
              });
            }),
            (o.useSVGTransformAttr = !0);
          var Pt,
            Rt,
            It,
            St,
            Mt,
            Ot = 'scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent'.split(
              ','
            ),
            kt = J('transform'),
            Nt = K + 'transform',
            Dt = J('transformOrigin'),
            Ft = null !== J('perspective'),
            Lt = (q.Transform = function() {
              (this.perspective =
                parseFloat(o.defaultTransformPerspective) || 0),
                (this.force3D =
                  !(!1 === o.defaultForce3D || !Ft) &&
                  (o.defaultForce3D || 'auto'));
            }),
            Ut = r.e.SVGElement,
            Bt = function(t, e, n) {
              var r,
                i = z.createElementNS('http://www.w3.org/2000/svg', t),
                o = /([a-z])([A-Z])/g;
              for (r in n)
                i.setAttributeNS(
                  null,
                  r.replace(o, '$1-$2').toLowerCase(),
                  n[r]
                );
              return e.appendChild(i), i;
            },
            zt = z.documentElement || {},
            jt =
              ((Mt = d || (/Android/i.test(H) && !r.e.chrome)),
              z.createElementNS &&
                zt.appendChild &&
                !Mt &&
                ((Rt = Bt('svg', zt)),
                (St = (It = Bt('rect', Rt, {
                  width: 100,
                  height: 50,
                  x: 100
                })).getBoundingClientRect().width),
                (It.style[Dt] = '50% 50%'),
                (It.style[kt] = 'scaleX(0.5)'),
                (Mt = St === It.getBoundingClientRect().width && !(f && Ft)),
                zt.removeChild(Rt)),
              Mt),
            Vt = function(t, e, n, r, i, a) {
              var s,
                l,
                c,
                u,
                h,
                f,
                p,
                d,
                m,
                g,
                v,
                _,
                y,
                b,
                T = t._gsTransform,
                x = Gt(t, !0);
              T && ((y = T.xOrigin), (b = T.yOrigin)),
                (!r || (s = r.split(' ')).length < 2) &&
                  (0 === (p = t.getBBox()).x &&
                    0 === p.y &&
                    p.width + p.height === 0 &&
                    (p = {
                      x:
                        parseFloat(
                          t.hasAttribute('x')
                            ? t.getAttribute('x')
                            : t.hasAttribute('cx')
                            ? t.getAttribute('cx')
                            : 0
                        ) || 0,
                      y:
                        parseFloat(
                          t.hasAttribute('y')
                            ? t.getAttribute('y')
                            : t.hasAttribute('cy')
                            ? t.getAttribute('cy')
                            : 0
                        ) || 0,
                      width: 0,
                      height: 0
                    }),
                  (s = [
                    (-1 !== (e = lt(e).split(' '))[0].indexOf('%')
                      ? (parseFloat(e[0]) / 100) * p.width
                      : parseFloat(e[0])) + p.x,
                    (-1 !== e[1].indexOf('%')
                      ? (parseFloat(e[1]) / 100) * p.height
                      : parseFloat(e[1])) + p.y
                  ])),
                (n.xOrigin = u = parseFloat(s[0])),
                (n.yOrigin = h = parseFloat(s[1])),
                r &&
                  x !== Ht &&
                  ((f = x[0]),
                  (p = x[1]),
                  (d = x[2]),
                  (m = x[3]),
                  (g = x[4]),
                  (v = x[5]),
                  (_ = f * m - p * d) &&
                    ((l = u * (m / _) + h * (-d / _) + (d * v - m * g) / _),
                    (c = u * (-p / _) + h * (f / _) - (f * v - p * g) / _),
                    (u = n.xOrigin = s[0] = l),
                    (h = n.yOrigin = s[1] = c))),
                T &&
                  (a &&
                    ((n.xOffset = T.xOffset), (n.yOffset = T.yOffset), (T = n)),
                  i || (!1 !== i && !1 !== o.defaultSmoothOrigin)
                    ? ((l = u - y),
                      (c = h - b),
                      (T.xOffset += l * x[0] + c * x[2] - l),
                      (T.yOffset += l * x[1] + c * x[3] - c))
                    : (T.xOffset = T.yOffset = 0)),
                a || t.setAttribute('data-svg-origin', s.join(' '));
            },
            Xt = function(t) {
              var e,
                n = j(
                  'svg',
                  (this.ownerSVGElement &&
                    this.ownerSVGElement.getAttribute('xmlns')) ||
                    'http://www.w3.org/2000/svg'
                ),
                r = this.parentNode,
                i = this.nextSibling,
                o = this.style.cssText;
              if (
                (zt.appendChild(n),
                n.appendChild(this),
                (this.style.display = 'block'),
                t)
              )
                try {
                  (e = this.getBBox()),
                    (this._originalGetBBox = this.getBBox),
                    (this.getBBox = Xt);
                } catch (t) {}
              else this._originalGetBBox && (e = this._originalGetBBox());
              return (
                i ? r.insertBefore(this, i) : r.appendChild(this),
                zt.removeChild(n),
                (this.style.cssText = o),
                e
              );
            },
            qt = function(t) {
              return !(
                !Ut ||
                !t.getCTM ||
                (t.parentNode && !t.ownerSVGElement) ||
                !(function(t) {
                  try {
                    return t.getBBox();
                  } catch (e) {
                    return Xt.call(t, !0);
                  }
                })(t)
              );
            },
            Ht = [1, 0, 0, 1, 0, 0],
            Gt = function(t, e) {
              var n,
                r,
                i,
                o,
                a,
                s,
                l,
                c = t._gsTransform || new Lt(),
                u = t.style;
              if (
                (kt
                  ? (r = tt(t, Nt, null, !0))
                  : t.currentStyle &&
                    (r =
                      (r = t.currentStyle.filter.match(O)) && 4 === r.length
                        ? [
                            r[0].substr(4),
                            Number(r[2].substr(4)),
                            Number(r[1].substr(4)),
                            r[3].substr(4),
                            c.x || 0,
                            c.y || 0
                          ].join(',')
                        : ''),
                (n = !r || 'none' === r || 'matrix(1, 0, 0, 1, 0, 0)' === r),
                kt &&
                  n &&
                  !t.offsetParent &&
                  t !== zt &&
                  ((o = u.display),
                  (u.display = 'block'),
                  ((l = t.parentNode) && t.offsetParent) ||
                    ((a = 1), (s = t.nextSibling), zt.appendChild(t)),
                  (n =
                    !(r = tt(t, Nt, null, !0)) ||
                    'none' === r ||
                    'matrix(1, 0, 0, 1, 0, 0)' === r),
                  o ? (u.display = o) : Jt(u, 'display'),
                  a &&
                    (s
                      ? l.insertBefore(t, s)
                      : l
                      ? l.appendChild(t)
                      : zt.removeChild(t))),
                (c.svg || (t.getCTM && qt(t))) &&
                  (n &&
                    -1 !== (u[kt] + '').indexOf('matrix') &&
                    ((r = u[kt]), (n = 0)),
                  (i = t.getAttribute('transform')),
                  n &&
                    i &&
                    ((r =
                      'matrix(' +
                      (i = t.transform.baseVal.consolidate().matrix).a +
                      ',' +
                      i.b +
                      ',' +
                      i.c +
                      ',' +
                      i.d +
                      ',' +
                      i.e +
                      ',' +
                      i.f +
                      ')'),
                    (n = 0))),
                n)
              )
                return Ht;
              for (i = (r || '').match(v) || [], wt = i.length; --wt > -1; )
                (o = Number(i[wt])),
                  (i[wt] = (a = o - (o |= 0))
                    ? ((1e5 * a + (a < 0 ? -0.5 : 0.5)) | 0) / 1e5 + o
                    : o);
              return e && i.length > 6
                ? [i[0], i[1], i[4], i[5], i[12], i[13]]
                : i;
            },
            Yt = (q.getTransform = function(t, e, n, i) {
              if (t._gsTransform && n && !i) return t._gsTransform;
              var a,
                s,
                l,
                c,
                u,
                h,
                f = (n && t._gsTransform) || new Lt(),
                p = f.scaleX < 0,
                d =
                  (Ft &&
                    (parseFloat(tt(t, Dt, e, !1, '0 0 0').split(' ')[2]) ||
                      f.zOrigin)) ||
                  0,
                m = parseFloat(o.defaultTransformPerspective) || 0;
              if (
                ((f.svg = !(!t.getCTM || !qt(t))),
                f.svg &&
                  (Vt(
                    t,
                    tt(t, Dt, e, !1, '50% 50%') + '',
                    f,
                    t.getAttribute('data-svg-origin')
                  ),
                  (Pt = o.useSVGTransformAttr || jt)),
                (a = Gt(t)) !== Ht)
              ) {
                if (16 === a.length) {
                  var g,
                    v,
                    _,
                    y,
                    b,
                    T = a[0],
                    x = a[1],
                    w = a[2],
                    E = a[3],
                    A = a[4],
                    C = a[5],
                    P = a[6],
                    R = a[7],
                    I = a[8],
                    S = a[9],
                    M = a[10],
                    O = a[12],
                    k = a[13],
                    N = a[14],
                    D = a[11],
                    F = Math.atan2(P, M);
                  f.zOrigin &&
                    ((O = I * (N = -f.zOrigin) - a[12]),
                    (k = S * N - a[13]),
                    (N = M * N + f.zOrigin - a[14])),
                    (f.rotationX = F * L),
                    F &&
                      ((g = A * (y = Math.cos(-F)) + I * (b = Math.sin(-F))),
                      (v = C * y + S * b),
                      (_ = P * y + M * b),
                      (I = A * -b + I * y),
                      (S = C * -b + S * y),
                      (M = P * -b + M * y),
                      (D = R * -b + D * y),
                      (A = g),
                      (C = v),
                      (P = _)),
                    (F = Math.atan2(-w, M)),
                    (f.rotationY = F * L),
                    F &&
                      ((v = x * (y = Math.cos(-F)) - S * (b = Math.sin(-F))),
                      (_ = w * y - M * b),
                      (S = x * b + S * y),
                      (M = w * b + M * y),
                      (D = E * b + D * y),
                      (T = g = T * y - I * b),
                      (x = v),
                      (w = _)),
                    (F = Math.atan2(x, T)),
                    (f.rotation = F * L),
                    F &&
                      ((g = T * (y = Math.cos(F)) + x * (b = Math.sin(F))),
                      (v = A * y + C * b),
                      (_ = I * y + S * b),
                      (x = x * y - T * b),
                      (C = C * y - A * b),
                      (S = S * y - I * b),
                      (T = g),
                      (A = v),
                      (I = _)),
                    f.rotationX &&
                      Math.abs(f.rotationX) + Math.abs(f.rotation) > 359.9 &&
                      ((f.rotationX = f.rotation = 0),
                      (f.rotationY = 180 - f.rotationY)),
                    (F = Math.atan2(A, C)),
                    (f.scaleX =
                      ((1e5 * Math.sqrt(T * T + x * x + w * w) + 0.5) | 0) /
                      1e5),
                    (f.scaleY =
                      ((1e5 * Math.sqrt(C * C + P * P) + 0.5) | 0) / 1e5),
                    (f.scaleZ =
                      ((1e5 * Math.sqrt(I * I + S * S + M * M) + 0.5) | 0) /
                      1e5),
                    (T /= f.scaleX),
                    (A /= f.scaleY),
                    (x /= f.scaleX),
                    (C /= f.scaleY),
                    Math.abs(F) > 2e-5
                      ? ((f.skewX = F * L),
                        (A = 0),
                        'simple' !== f.skewType &&
                          (f.scaleY *= 1 / Math.cos(F)))
                      : (f.skewX = 0),
                    (f.perspective = D ? 1 / (D < 0 ? -D : D) : 0),
                    (f.x = O),
                    (f.y = k),
                    (f.z = N),
                    f.svg &&
                      ((f.x -= f.xOrigin - (f.xOrigin * T - f.yOrigin * A)),
                      (f.y -= f.yOrigin - (f.yOrigin * x - f.xOrigin * C)));
                } else if (
                  !Ft ||
                  i ||
                  !a.length ||
                  f.x !== a[4] ||
                  f.y !== a[5] ||
                  (!f.rotationX && !f.rotationY)
                ) {
                  var U = a.length >= 6,
                    B = U ? a[0] : 1,
                    z = a[1] || 0,
                    j = a[2] || 0,
                    V = U ? a[3] : 1;
                  (f.x = a[4] || 0),
                    (f.y = a[5] || 0),
                    (l = Math.sqrt(B * B + z * z)),
                    (c = Math.sqrt(V * V + j * j)),
                    (u = B || z ? Math.atan2(z, B) * L : f.rotation || 0),
                    (h = j || V ? Math.atan2(j, V) * L + u : f.skewX || 0),
                    (f.scaleX = l),
                    (f.scaleY = c),
                    (f.rotation = u),
                    (f.skewX = h),
                    Ft &&
                      ((f.rotationX = f.rotationY = f.z = 0),
                      (f.perspective = m),
                      (f.scaleZ = 1)),
                    f.svg &&
                      ((f.x -= f.xOrigin - (f.xOrigin * B + f.yOrigin * j)),
                      (f.y -= f.yOrigin - (f.xOrigin * z + f.yOrigin * V)));
                }
                for (s in (Math.abs(f.skewX) > 90 &&
                  Math.abs(f.skewX) < 270 &&
                  (p
                    ? ((f.scaleX *= -1),
                      (f.skewX += f.rotation <= 0 ? 180 : -180),
                      (f.rotation += f.rotation <= 0 ? 180 : -180))
                    : ((f.scaleY *= -1),
                      (f.skewX += f.skewX <= 0 ? 180 : -180))),
                (f.zOrigin = d),
                f))
                  f[s] < 2e-5 && f[s] > -2e-5 && (f[s] = 0);
              }
              return (
                n &&
                  ((t._gsTransform = f),
                  f.svg &&
                    (Pt && t.style[kt]
                      ? r.f.delayedCall(0.001, function() {
                          Jt(t.style, kt);
                        })
                      : !Pt &&
                        t.getAttribute('transform') &&
                        r.f.delayedCall(0.001, function() {
                          t.removeAttribute('transform');
                        }))),
                f
              );
            }),
            Wt = function(t) {
              var e,
                n,
                r = this.data,
                i = -r.rotation * F,
                o = i + r.skewX * F,
                a = ((Math.cos(i) * r.scaleX * 1e5) | 0) / 1e5,
                s = ((Math.sin(i) * r.scaleX * 1e5) | 0) / 1e5,
                l = ((Math.sin(o) * -r.scaleY * 1e5) | 0) / 1e5,
                c = ((Math.cos(o) * r.scaleY * 1e5) | 0) / 1e5,
                u = this.t.style,
                h = this.t.currentStyle;
              if (h) {
                (n = s), (s = -l), (l = -n), (e = h.filter), (u.filter = '');
                var f,
                  p,
                  m = this.t.offsetWidth,
                  g = this.t.offsetHeight,
                  v = 'absolute' !== h.position,
                  _ =
                    'progid:DXImageTransform.Microsoft.Matrix(M11=' +
                    a +
                    ', M12=' +
                    s +
                    ', M21=' +
                    l +
                    ', M22=' +
                    c,
                  y = r.x + (m * r.xPercent) / 100,
                  b = r.y + (g * r.yPercent) / 100;
                if (
                  (null != r.ox &&
                    ((y +=
                      (f = (r.oxp ? m * r.ox * 0.01 : r.ox) - m / 2) -
                      (f * a +
                        (p = (r.oyp ? g * r.oy * 0.01 : r.oy) - g / 2) * s)),
                    (b += p - (f * l + p * c))),
                  (_ += v
                    ? ', Dx=' +
                      ((f = m / 2) - (f * a + (p = g / 2) * s) + y) +
                      ', Dy=' +
                      (p - (f * l + p * c) + b) +
                      ')'
                    : ", sizingMethod='auto expand')"),
                  -1 !== e.indexOf('DXImageTransform.Microsoft.Matrix(')
                    ? (u.filter = e.replace(k, _))
                    : (u.filter = _ + ' ' + e),
                  (0 !== t && 1 !== t) ||
                    (1 === a &&
                      0 === s &&
                      0 === l &&
                      1 === c &&
                      ((v && -1 === _.indexOf('Dx=0, Dy=0')) ||
                        (w.test(e) && 100 !== parseFloat(RegExp.$1)) ||
                        (-1 === e.indexOf(e.indexOf('Alpha')) &&
                          u.removeAttribute('filter')))),
                  !v)
                ) {
                  var T,
                    E,
                    A,
                    C = d < 8 ? 1 : -1;
                  for (
                    f = r.ieOffsetX || 0,
                      p = r.ieOffsetY || 0,
                      r.ieOffsetX = Math.round(
                        (m - ((a < 0 ? -a : a) * m + (s < 0 ? -s : s) * g)) /
                          2 +
                          y
                      ),
                      r.ieOffsetY = Math.round(
                        (g - ((c < 0 ? -c : c) * g + (l < 0 ? -l : l) * m)) /
                          2 +
                          b
                      ),
                      wt = 0;
                    wt < 4;
                    wt++
                  )
                    (A =
                      (n =
                        -1 !== (T = h[(E = at[wt])]).indexOf('px')
                          ? parseFloat(T)
                          : et(this.t, E, parseFloat(T), T.replace(x, '')) ||
                            0) !== r[E]
                        ? wt < 2
                          ? -r.ieOffsetX
                          : -r.ieOffsetY
                        : wt < 2
                        ? f - r.ieOffsetX
                        : p - r.ieOffsetY),
                      (u[E] =
                        (r[E] = Math.round(
                          n - A * (0 === wt || 2 === wt ? 1 : C)
                        )) + 'px');
                }
              }
            },
            Kt = (q.set3DTransformRatio = q.setTransformRatio = function(t) {
              var e,
                n,
                r,
                i,
                o,
                a,
                s,
                l,
                c,
                u,
                h,
                p,
                d,
                m,
                g,
                v,
                _,
                y,
                b,
                T,
                x = this.data,
                w = this.t.style,
                E = x.rotation,
                A = x.rotationX,
                C = x.rotationY,
                P = x.scaleX,
                R = x.scaleY,
                I = x.scaleZ,
                S = x.x,
                M = x.y,
                O = x.z,
                k = x.svg,
                N = x.perspective,
                D = x.force3D,
                L = x.skewY,
                U = x.skewX;
              if (
                (L && ((U += L), (E += L)),
                !(
                  (((1 !== t && 0 !== t) ||
                    'auto' !== D ||
                    (this.tween._totalTime !== this.tween._totalDuration &&
                      this.tween._totalTime)) &&
                    D) ||
                  O ||
                  N ||
                  C ||
                  A ||
                  1 !== I
                ) ||
                  (Pt && k) ||
                  !Ft)
              )
                E || U || k
                  ? ((E *= F),
                    (T = U * F),
                    1e5,
                    (n = Math.cos(E) * P),
                    (o = Math.sin(E) * P),
                    (r = Math.sin(E - T) * -R),
                    (a = Math.cos(E - T) * R),
                    T &&
                      'simple' === x.skewType &&
                      ((e = Math.tan(T - L * F)),
                      (r *= e = Math.sqrt(1 + e * e)),
                      (a *= e),
                      L &&
                        ((e = Math.tan(L * F)),
                        (n *= e = Math.sqrt(1 + e * e)),
                        (o *= e))),
                    k &&
                      ((S +=
                        x.xOrigin -
                        (x.xOrigin * n + x.yOrigin * r) +
                        x.xOffset),
                      (M +=
                        x.yOrigin -
                        (x.xOrigin * o + x.yOrigin * a) +
                        x.yOffset),
                      Pt &&
                        (x.xPercent || x.yPercent) &&
                        ((g = this.t.getBBox()),
                        (S += 0.01 * x.xPercent * g.width),
                        (M += 0.01 * x.yPercent * g.height)),
                      S < (g = 1e-6) && S > -g && (S = 0),
                      M < g && M > -g && (M = 0)),
                    (b =
                      ((1e5 * n) | 0) / 1e5 +
                      ',' +
                      ((1e5 * o) | 0) / 1e5 +
                      ',' +
                      ((1e5 * r) | 0) / 1e5 +
                      ',' +
                      ((1e5 * a) | 0) / 1e5 +
                      ',' +
                      S +
                      ',' +
                      M +
                      ')'),
                    k && Pt
                      ? this.t.setAttribute('transform', 'matrix(' + b)
                      : (w[kt] =
                          (x.xPercent || x.yPercent
                            ? 'translate(' +
                              x.xPercent +
                              '%,' +
                              x.yPercent +
                              '%) matrix('
                            : 'matrix(') + b))
                  : (w[kt] =
                      (x.xPercent || x.yPercent
                        ? 'translate(' +
                          x.xPercent +
                          '%,' +
                          x.yPercent +
                          '%) matrix('
                        : 'matrix(') +
                      P +
                      ',0,0,' +
                      R +
                      ',' +
                      S +
                      ',' +
                      M +
                      ')');
              else {
                if (
                  (f &&
                    (P < (g = 1e-4) && P > -g && (P = I = 2e-5),
                    R < g && R > -g && (R = I = 2e-5),
                    !N || x.z || x.rotationX || x.rotationY || (N = 0)),
                  E || U)
                )
                  (E *= F),
                    (v = n = Math.cos(E)),
                    (_ = o = Math.sin(E)),
                    U &&
                      ((E -= U * F),
                      (v = Math.cos(E)),
                      (_ = Math.sin(E)),
                      'simple' === x.skewType &&
                        ((e = Math.tan((U - L) * F)),
                        (v *= e = Math.sqrt(1 + e * e)),
                        (_ *= e),
                        x.skewY &&
                          ((e = Math.tan(L * F)),
                          (n *= e = Math.sqrt(1 + e * e)),
                          (o *= e)))),
                    (r = -_),
                    (a = v);
                else {
                  if (!(C || A || 1 !== I || N || k))
                    return void (w[kt] =
                      (x.xPercent || x.yPercent
                        ? 'translate(' +
                          x.xPercent +
                          '%,' +
                          x.yPercent +
                          '%) translate3d('
                        : 'translate3d(') +
                      S +
                      'px,' +
                      M +
                      'px,' +
                      O +
                      'px)' +
                      (1 !== P || 1 !== R
                        ? ' scale(' + P + ',' + R + ')'
                        : ''));
                  (n = a = 1), (r = o = 0);
                }
                (u = 1),
                  (i = s = l = c = h = p = 0),
                  (d = N ? -1 / N : 0),
                  (m = x.zOrigin),
                  (g = 1e-6),
                  ',',
                  '0',
                  (E = C * F) &&
                    ((v = Math.cos(E)),
                    (l = -(_ = Math.sin(E))),
                    (h = d * -_),
                    (i = n * _),
                    (s = o * _),
                    (u = v),
                    (d *= v),
                    (n *= v),
                    (o *= v)),
                  (E = A * F) &&
                    ((e = r * (v = Math.cos(E)) + i * (_ = Math.sin(E))),
                    (y = a * v + s * _),
                    (c = u * _),
                    (p = d * _),
                    (i = r * -_ + i * v),
                    (s = a * -_ + s * v),
                    (u *= v),
                    (d *= v),
                    (r = e),
                    (a = y)),
                  1 !== I && ((i *= I), (s *= I), (u *= I), (d *= I)),
                  1 !== R && ((r *= R), (a *= R), (c *= R), (p *= R)),
                  1 !== P && ((n *= P), (o *= P), (l *= P), (h *= P)),
                  (m || k) &&
                    (m && ((S += i * -m), (M += s * -m), (O += u * -m + m)),
                    k &&
                      ((S +=
                        x.xOrigin -
                        (x.xOrigin * n + x.yOrigin * r) +
                        x.xOffset),
                      (M +=
                        x.yOrigin -
                        (x.xOrigin * o + x.yOrigin * a) +
                        x.yOffset)),
                    S < g && S > -g && (S = '0'),
                    M < g && M > -g && (M = '0'),
                    O < g && O > -g && (O = 0)),
                  (b =
                    x.xPercent || x.yPercent
                      ? 'translate(' +
                        x.xPercent +
                        '%,' +
                        x.yPercent +
                        '%) matrix3d('
                      : 'matrix3d('),
                  (b +=
                    (n < g && n > -g ? '0' : n) +
                    ',' +
                    (o < g && o > -g ? '0' : o) +
                    ',' +
                    (l < g && l > -g ? '0' : l)),
                  (b +=
                    ',' +
                    (h < g && h > -g ? '0' : h) +
                    ',' +
                    (r < g && r > -g ? '0' : r) +
                    ',' +
                    (a < g && a > -g ? '0' : a)),
                  A || C || 1 !== I
                    ? ((b +=
                        ',' +
                        (c < g && c > -g ? '0' : c) +
                        ',' +
                        (p < g && p > -g ? '0' : p) +
                        ',' +
                        (i < g && i > -g ? '0' : i)),
                      (b +=
                        ',' +
                        (s < g && s > -g ? '0' : s) +
                        ',' +
                        (u < g && u > -g ? '0' : u) +
                        ',' +
                        (d < g && d > -g ? '0' : d) +
                        ','))
                    : (b += ',0,0,0,0,1,0,'),
                  (b +=
                    S + ',' + M + ',' + O + ',' + (N ? 1 + -O / N : 1) + ')'),
                  (w[kt] = b);
              }
            });
          ((l =
            Lt.prototype).x = l.y = l.z = l.skewX = l.skewY = l.rotation = l.rotationX = l.rotationY = l.zOrigin = l.xPercent = l.yPercent = l.xOffset = l.yOffset = 0),
            (l.scaleX = l.scaleY = l.scaleZ = 1),
            At(
              'transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin',
              {
                parser: function(t, e, r, i, a, s, l) {
                  if (i._lastParsedTransform === l) return a;
                  i._lastParsedTransform = l;
                  var c = l.scale && 'function' == typeof l.scale ? l.scale : 0;
                  c && (l.scale = c(g, t));
                  var u,
                    h,
                    f,
                    p,
                    d,
                    v,
                    _,
                    y,
                    b,
                    T = t._gsTransform,
                    x = t.style,
                    w = Ot.length,
                    E = l,
                    A = {},
                    C = Yt(t, n, !0, E.parseTransform),
                    P =
                      E.transform &&
                      ('function' == typeof E.transform
                        ? E.transform(g, m)
                        : E.transform);
                  if (
                    ((C.skewType =
                      E.skewType || C.skewType || o.defaultSkewType),
                    (i._transform = C),
                    'rotationZ' in E && (E.rotation = E.rotationZ),
                    P && 'string' == typeof P && kt)
                  )
                    ((h = V.style)[kt] = P),
                      (h.display = 'block'),
                      (h.position = 'absolute'),
                      -1 !== P.indexOf('%') &&
                        ((h.width = tt(t, 'width')),
                        (h.height = tt(t, 'height'))),
                      z.body.appendChild(V),
                      (u = Yt(V, null, !1)),
                      'simple' === C.skewType &&
                        (u.scaleY *= Math.cos(u.skewX * F)),
                      C.svg &&
                        ((v = C.xOrigin),
                        (_ = C.yOrigin),
                        (u.x -= C.xOffset),
                        (u.y -= C.yOffset),
                        (E.transformOrigin || E.svgOrigin) &&
                          ((P = {}),
                          Vt(
                            t,
                            lt(E.transformOrigin),
                            P,
                            E.svgOrigin,
                            E.smoothOrigin,
                            !0
                          ),
                          (v = P.xOrigin),
                          (_ = P.yOrigin),
                          (u.x -= P.xOffset - C.xOffset),
                          (u.y -= P.yOffset - C.yOffset)),
                        (v || _) &&
                          ((y = Gt(V, !0)),
                          (u.x -= v - (v * y[0] + _ * y[2])),
                          (u.y -= _ - (v * y[1] + _ * y[3])))),
                      z.body.removeChild(V),
                      u.perspective || (u.perspective = C.perspective),
                      null != E.xPercent &&
                        (u.xPercent = ut(E.xPercent, C.xPercent)),
                      null != E.yPercent &&
                        (u.yPercent = ut(E.yPercent, C.yPercent));
                  else if ('object' == typeof E) {
                    if (
                      ((u = {
                        scaleX: ut(
                          null != E.scaleX ? E.scaleX : E.scale,
                          C.scaleX
                        ),
                        scaleY: ut(
                          null != E.scaleY ? E.scaleY : E.scale,
                          C.scaleY
                        ),
                        scaleZ: ut(E.scaleZ, C.scaleZ),
                        x: ut(E.x, C.x),
                        y: ut(E.y, C.y),
                        z: ut(E.z, C.z),
                        xPercent: ut(E.xPercent, C.xPercent),
                        yPercent: ut(E.yPercent, C.yPercent),
                        perspective: ut(E.transformPerspective, C.perspective)
                      }),
                      null != (d = E.directionalRotation))
                    )
                      if ('object' == typeof d) for (h in d) E[h] = d[h];
                      else E.rotation = d;
                    'string' == typeof E.x &&
                      -1 !== E.x.indexOf('%') &&
                      ((u.x = 0), (u.xPercent = ut(E.x, C.xPercent))),
                      'string' == typeof E.y &&
                        -1 !== E.y.indexOf('%') &&
                        ((u.y = 0), (u.yPercent = ut(E.y, C.yPercent))),
                      (u.rotation = ht(
                        'rotation' in E
                          ? E.rotation
                          : 'shortRotation' in E
                          ? E.shortRotation + '_short'
                          : C.rotation,
                        C.rotation,
                        'rotation',
                        A
                      )),
                      Ft &&
                        ((u.rotationX = ht(
                          'rotationX' in E
                            ? E.rotationX
                            : 'shortRotationX' in E
                            ? E.shortRotationX + '_short'
                            : C.rotationX || 0,
                          C.rotationX,
                          'rotationX',
                          A
                        )),
                        (u.rotationY = ht(
                          'rotationY' in E
                            ? E.rotationY
                            : 'shortRotationY' in E
                            ? E.shortRotationY + '_short'
                            : C.rotationY || 0,
                          C.rotationY,
                          'rotationY',
                          A
                        ))),
                      (u.skewX = ht(E.skewX, C.skewX)),
                      (u.skewY = ht(E.skewY, C.skewY));
                  }
                  for (
                    Ft &&
                      null != E.force3D &&
                      ((C.force3D = E.force3D), (p = !0)),
                      (f =
                        C.force3D ||
                        C.z ||
                        C.rotationX ||
                        C.rotationY ||
                        u.z ||
                        u.rotationX ||
                        u.rotationY ||
                        u.perspective) ||
                        null == E.scale ||
                        (u.scaleZ = 1);
                    --w > -1;

                  )
                    ((P = u[(b = Ot[w])] - C[b]) > 1e-6 ||
                      P < -1e-6 ||
                      null != E[b] ||
                      null != U[b]) &&
                      ((p = !0),
                      (a = new bt(C, b, C[b], P, a)),
                      b in A && (a.e = A[b]),
                      (a.xs0 = 0),
                      (a.plugin = s),
                      i._overwriteProps.push(a.n));
                  return (
                    (P =
                      'function' == typeof E.transformOrigin
                        ? E.transformOrigin(g, m)
                        : E.transformOrigin),
                    C.svg &&
                      (P || E.svgOrigin) &&
                      ((v = C.xOffset),
                      (_ = C.yOffset),
                      Vt(t, lt(P), u, E.svgOrigin, E.smoothOrigin),
                      (a = Tt(
                        C,
                        'xOrigin',
                        (T ? C : u).xOrigin,
                        u.xOrigin,
                        a,
                        'transformOrigin'
                      )),
                      (a = Tt(
                        C,
                        'yOrigin',
                        (T ? C : u).yOrigin,
                        u.yOrigin,
                        a,
                        'transformOrigin'
                      )),
                      (v === C.xOffset && _ === C.yOffset) ||
                        ((a = Tt(
                          C,
                          'xOffset',
                          T ? v : C.xOffset,
                          C.xOffset,
                          a,
                          'transformOrigin'
                        )),
                        (a = Tt(
                          C,
                          'yOffset',
                          T ? _ : C.yOffset,
                          C.yOffset,
                          a,
                          'transformOrigin'
                        ))),
                      (P = '0px 0px')),
                    (P || (Ft && f && C.zOrigin)) &&
                      (kt
                        ? ((p = !0),
                          (b = Dt),
                          P ||
                            (P =
                              (P = (tt(t, b, n, !1, '50% 50%') + '').split(
                                ' '
                              ))[0] +
                              ' ' +
                              P[1] +
                              ' ' +
                              C.zOrigin +
                              'px'),
                          (P += ''),
                          ((a = new bt(
                            x,
                            b,
                            0,
                            0,
                            a,
                            -1,
                            'transformOrigin'
                          )).b = x[b]),
                          (a.plugin = s),
                          Ft
                            ? ((h = C.zOrigin),
                              (P = P.split(' ')),
                              (C.zOrigin =
                                (P.length > 2 ? parseFloat(P[2]) : h) || 0),
                              (a.xs0 = a.e =
                                P[0] + ' ' + (P[1] || '50%') + ' 0px'),
                              ((a = new bt(
                                C,
                                'zOrigin',
                                0,
                                0,
                                a,
                                -1,
                                a.n
                              )).b = h),
                              (a.xs0 = a.e = C.zOrigin))
                            : (a.xs0 = a.e = P))
                        : lt(P + '', C)),
                    p &&
                      (i._transformType =
                        (C.svg && Pt) || (!f && 3 !== this._transformType)
                          ? 2
                          : 3),
                    c && (l.scale = c),
                    a
                  );
                },
                allowFunc: !0,
                prefix: !0
              }
            ),
            At('boxShadow', {
              defaultValue: '0px 0px 0px 0px #999',
              prefix: !0,
              color: !0,
              multi: !0,
              keyword: 'inset'
            }),
            At('clipPath', {
              defaultValue: 'inset(0%)',
              prefix: !0,
              multi: !0,
              formatter: vt('inset(0% 0% 0% 0%)', !1, !0)
            }),
            At('borderRadius', {
              defaultValue: '0px',
              parser: function(t, r, i, o, a, s) {
                r = this.format(r);
                var l,
                  c,
                  u,
                  h,
                  f,
                  p,
                  d,
                  m,
                  g,
                  v,
                  _,
                  y,
                  b,
                  T,
                  x,
                  w,
                  E = [
                    'borderTopLeftRadius',
                    'borderTopRightRadius',
                    'borderBottomRightRadius',
                    'borderBottomLeftRadius'
                  ],
                  A = t.style;
                for (
                  g = parseFloat(t.offsetWidth),
                    v = parseFloat(t.offsetHeight),
                    l = r.split(' '),
                    c = 0;
                  c < E.length;
                  c++
                )
                  this.p.indexOf('border') && (E[c] = J(E[c])),
                    -1 !== (f = h = tt(t, E[c], n, !1, '0px')).indexOf(' ') &&
                      ((h = f.split(' ')), (f = h[0]), (h = h[1])),
                    (p = u = l[c]),
                    (d = parseFloat(f)),
                    (y = f.substr((d + '').length)),
                    (b = '=' === p.charAt(1))
                      ? ((m = parseInt(p.charAt(0) + '1', 10)),
                        (p = p.substr(2)),
                        (m *= parseFloat(p)),
                        (_ = p.substr((m + '').length - (m < 0 ? 1 : 0)) || ''))
                      : ((m = parseFloat(p)), (_ = p.substr((m + '').length))),
                    '' === _ && (_ = e[i] || y),
                    _ !== y &&
                      ((T = et(t, 'borderLeft', d, y)),
                      (x = et(t, 'borderTop', d, y)),
                      '%' === _
                        ? ((f = (T / g) * 100 + '%'), (h = (x / v) * 100 + '%'))
                        : 'em' === _
                        ? ((f = T / (w = et(t, 'borderLeft', 1, 'em')) + 'em'),
                          (h = x / w + 'em'))
                        : ((f = T + 'px'), (h = x + 'px')),
                      b &&
                        ((p = parseFloat(f) + m + _),
                        (u = parseFloat(h) + m + _))),
                    (a = xt(A, E[c], f + ' ' + h, p + ' ' + u, !1, '0px', a));
                return a;
              },
              prefix: !0,
              formatter: vt('0px 0px 0px 0px', !1, !0)
            }),
            At(
              'borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius',
              {
                defaultValue: '0px',
                parser: function(t, e, r, i, o, a) {
                  return xt(
                    t.style,
                    r,
                    this.format(tt(t, r, n, !1, '0px 0px')),
                    this.format(e),
                    !1,
                    '0px',
                    o
                  );
                },
                prefix: !0,
                formatter: vt('0px 0px', !1, !0)
              }
            ),
            At('backgroundPosition', {
              defaultValue: '0 0',
              parser: function(t, e, r, i, o, a) {
                var s,
                  l,
                  c,
                  u,
                  h,
                  f,
                  p = 'background-position',
                  m = n || $(t),
                  g = this.format(
                    (m
                      ? d
                        ? m.getPropertyValue(p + '-x') +
                          ' ' +
                          m.getPropertyValue(p + '-y')
                        : m.getPropertyValue(p)
                      : t.currentStyle.backgroundPositionX +
                        ' ' +
                        t.currentStyle.backgroundPositionY) || '0 0'
                  ),
                  v = this.format(e);
                if (
                  (-1 !== g.indexOf('%')) != (-1 !== v.indexOf('%')) &&
                  v.split(',').length < 2 &&
                  (f = tt(t, 'backgroundImage').replace(I, '')) &&
                  'none' !== f
                ) {
                  for (
                    s = g.split(' '),
                      l = v.split(' '),
                      X.setAttribute('src', f),
                      c = 2;
                    --c > -1;

                  )
                    (u = -1 !== (g = s[c]).indexOf('%')) !==
                      (-1 !== l[c].indexOf('%')) &&
                      ((h =
                        0 === c
                          ? t.offsetWidth - X.width
                          : t.offsetHeight - X.height),
                      (s[c] = u
                        ? (parseFloat(g) / 100) * h + 'px'
                        : (parseFloat(g) / h) * 100 + '%'));
                  g = s.join(' ');
                }
                return this.parseComplex(t.style, g, v, o, a);
              },
              formatter: lt
            }),
            At('backgroundSize', {
              defaultValue: '0 0',
              formatter: function(t) {
                return 'co' === (t += '').substr(0, 2)
                  ? t
                  : lt(-1 === t.indexOf(' ') ? t + ' ' + t : t);
              }
            }),
            At('perspective', { defaultValue: '0px', prefix: !0 }),
            At('perspectiveOrigin', { defaultValue: '50% 50%', prefix: !0 }),
            At('transformStyle', { prefix: !0 }),
            At('backfaceVisibility', { prefix: !0 }),
            At('userSelect', { prefix: !0 }),
            At('margin', {
              parser: _t('marginTop,marginRight,marginBottom,marginLeft')
            }),
            At('padding', {
              parser: _t('paddingTop,paddingRight,paddingBottom,paddingLeft')
            }),
            At('clip', {
              defaultValue: 'rect(0px,0px,0px,0px)',
              parser: function(t, e, r, i, o, a) {
                var s, l, c;
                return (
                  d < 9
                    ? ((l = t.currentStyle),
                      (c = d < 8 ? ' ' : ','),
                      (s =
                        'rect(' +
                        l.clipTop +
                        c +
                        l.clipRight +
                        c +
                        l.clipBottom +
                        c +
                        l.clipLeft +
                        ')'),
                      (e = this.format(e)
                        .split(',')
                        .join(c)))
                    : ((s = this.format(tt(t, this.p, n, !1, this.dflt))),
                      (e = this.format(e))),
                  this.parseComplex(t.style, s, e, o, a)
                );
              }
            }),
            At('textShadow', {
              defaultValue: '0px 0px 0px #999',
              color: !0,
              multi: !0
            }),
            At('autoRound,strictUnits', {
              parser: function(t, e, n, r, i) {
                return i;
              }
            }),
            At('border', {
              defaultValue: '0px solid #000',
              parser: function(t, e, r, i, o, a) {
                var s = tt(t, 'borderTopWidth', n, !1, '0px'),
                  l = this.format(e).split(' '),
                  c = l[0].replace(x, '');
                return (
                  'px' !== c &&
                    (s = parseFloat(s) / et(t, 'borderTopWidth', 1, c) + c),
                  this.parseComplex(
                    t.style,
                    this.format(
                      s +
                        ' ' +
                        tt(t, 'borderTopStyle', n, !1, 'solid') +
                        ' ' +
                        tt(t, 'borderTopColor', n, !1, '#000')
                    ),
                    l.join(' '),
                    o,
                    a
                  )
                );
              },
              color: !0,
              formatter: function(t) {
                var e = t.split(' ');
                return (
                  e[0] +
                  ' ' +
                  (e[1] || 'solid') +
                  ' ' +
                  (t.match(gt) || ['#000'])[0]
                );
              }
            }),
            At('borderWidth', {
              parser: _t(
                'borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth'
              )
            }),
            At('float,cssFloat,styleFloat', {
              parser: function(t, e, n, r, i, o) {
                var a = t.style,
                  s = 'cssFloat' in a ? 'cssFloat' : 'styleFloat';
                return new bt(a, s, 0, 0, i, -1, n, !1, 0, a[s], e);
              }
            });
          var Zt = function(t) {
            var e,
              n = this.t,
              r = n.filter || tt(this.data, 'filter') || '',
              i = (this.s + this.c * t) | 0;
            100 === i &&
              (-1 === r.indexOf('atrix(') &&
              -1 === r.indexOf('radient(') &&
              -1 === r.indexOf('oader(')
                ? (n.removeAttribute('filter'), (e = !tt(this.data, 'filter')))
                : ((n.filter = r.replace(A, '')), (e = !0))),
              e ||
                (this.xn1 && (n.filter = r = r || 'alpha(opacity=' + i + ')'),
                -1 === r.indexOf('pacity')
                  ? (0 === i && this.xn1) ||
                    (n.filter = r + ' alpha(opacity=' + i + ')')
                  : (n.filter = r.replace(w, 'opacity=' + i)));
          };
          At('opacity,alpha,autoAlpha', {
            defaultValue: '1',
            parser: function(t, e, r, i, o, a) {
              var s = parseFloat(tt(t, 'opacity', n, !1, '1')),
                l = t.style,
                c = 'autoAlpha' === r;
              return (
                'string' == typeof e &&
                  '=' === e.charAt(1) &&
                  (e =
                    ('-' === e.charAt(0) ? -1 : 1) * parseFloat(e.substr(2)) +
                    s),
                c &&
                  1 === s &&
                  'hidden' === tt(t, 'visibility', n) &&
                  0 !== e &&
                  (s = 0),
                G
                  ? (o = new bt(l, 'opacity', s, e - s, o))
                  : (((o = new bt(
                      l,
                      'opacity',
                      100 * s,
                      100 * (e - s),
                      o
                    )).xn1 = c ? 1 : 0),
                    (l.zoom = 1),
                    (o.type = 2),
                    (o.b = 'alpha(opacity=' + o.s + ')'),
                    (o.e = 'alpha(opacity=' + (o.s + o.c) + ')'),
                    (o.data = t),
                    (o.plugin = a),
                    (o.setRatio = Zt)),
                c &&
                  (((o = new bt(
                    l,
                    'visibility',
                    0,
                    0,
                    o,
                    -1,
                    null,
                    !1,
                    0,
                    0 !== s ? 'inherit' : 'hidden',
                    0 === e ? 'hidden' : 'inherit'
                  )).xs0 = 'inherit'),
                  i._overwriteProps.push(o.n),
                  i._overwriteProps.push(r)),
                o
              );
            }
          });
          var Jt = function(t, e) {
              e &&
                (t.removeProperty
                  ? (('ms' !== e.substr(0, 2) && 'webkit' !== e.substr(0, 6)) ||
                      (e = '-' + e),
                    t.removeProperty(e.replace(P, '-$1').toLowerCase()))
                  : t.removeAttribute(e));
            },
            Qt = function(t) {
              if (((this.t._gsClassPT = this), 1 === t || 0 === t)) {
                this.t.setAttribute('class', 0 === t ? this.b : this.e);
                for (var e = this.data, n = this.t.style; e; )
                  e.v ? (n[e.p] = e.v) : Jt(n, e.p), (e = e._next);
                1 === t &&
                  this.t._gsClassPT === this &&
                  (this.t._gsClassPT = null);
              } else
                this.t.getAttribute('class') !== this.e &&
                  this.t.setAttribute('class', this.e);
            };
          At('className', {
            parser: function(e, r, i, o, a, s, l) {
              var c,
                u,
                h,
                f,
                p,
                d = e.getAttribute('class') || '',
                m = e.style.cssText;
              if (
                (((a = o._classNamePT = new bt(
                  e,
                  i,
                  0,
                  0,
                  a,
                  2
                )).setRatio = Qt),
                (a.pr = -11),
                (t = !0),
                (a.b = d),
                (u = rt(e, n)),
                (h = e._gsClassPT))
              ) {
                for (f = {}, p = h.data; p; ) (f[p.p] = 1), (p = p._next);
                h.setRatio(1);
              }
              return (
                (e._gsClassPT = a),
                (a.e =
                  '=' !== r.charAt(1)
                    ? r
                    : d.replace(
                        new RegExp('(?:\\s|^)' + r.substr(2) + '(?![\\w-])'),
                        ''
                      ) + ('+' === r.charAt(0) ? ' ' + r.substr(2) : '')),
                e.setAttribute('class', a.e),
                (c = it(e, u, rt(e), l, f)),
                e.setAttribute('class', d),
                (a.data = c.firstMPT),
                e.style.cssText !== m && (e.style.cssText = m),
                (a = a.xfirst = o.parse(e, c.difs, a, s))
              );
            }
          });
          var $t = function(t) {
            if (
              (1 === t || 0 === t) &&
              this.data._totalTime === this.data._totalDuration &&
              'isFromStart' !== this.data.data
            ) {
              var e,
                n,
                r,
                i,
                o,
                a = this.t.style,
                l = s.transform.parse;
              if ('all' === this.e) (a.cssText = ''), (i = !0);
              else
                for (
                  r = (e = this.e
                    .split(' ')
                    .join('')
                    .split(',')).length;
                  --r > -1;

                )
                  (n = e[r]),
                    s[n] &&
                      (s[n].parse === l
                        ? (i = !0)
                        : (n = 'transformOrigin' === n ? Dt : s[n].p)),
                    Jt(a, n);
              i &&
                (Jt(a, kt),
                (o = this.t._gsTransform) &&
                  (o.svg &&
                    (this.t.removeAttribute('data-svg-origin'),
                    this.t.removeAttribute('transform')),
                  delete this.t._gsTransform));
            }
          };
          for (
            At('clearProps', {
              parser: function(e, n, r, i, o) {
                return (
                  ((o = new bt(e, r, 0, 0, o, 2)).setRatio = $t),
                  (o.e = n),
                  (o.pr = -10),
                  (o.data = i._tween),
                  (t = !0),
                  o
                );
              }
            }),
              l = 'bezier,throwProps,physicsProps,physics2D'.split(','),
              wt = l.length;
            wt--;

          )
            Ct(l[wt]);
          ((l =
            o.prototype)._firstPT = l._lastParsedTransform = l._transform = null),
            (l._onInitTween = function(r, a, l, f) {
              if (!r.nodeType) return !1;
              (this._target = m = r),
                (this._tween = l),
                (this._vars = a),
                (g = f),
                (c = a.autoRound),
                (t = !1),
                (e = a.suffixMap || o.suffixMap),
                (n = $(r)),
                (i = this._overwriteProps);
              var d,
                v,
                _,
                y,
                b,
                T,
                x,
                w,
                A,
                C = r.style;
              if (
                (u &&
                  '' === C.zIndex &&
                  (('auto' !== (d = tt(r, 'zIndex', n)) && '' !== d) ||
                    this._addLazySet(C, 'zIndex', 0)),
                'string' == typeof a &&
                  ((y = C.cssText),
                  (d = rt(r, n)),
                  (C.cssText = y + ';' + a),
                  (d = it(r, d, rt(r)).difs),
                  !G && E.test(a) && (d.opacity = parseFloat(RegExp.$1)),
                  (a = d),
                  (C.cssText = y)),
                a.className
                  ? (this._firstPT = v = s.className.parse(
                      r,
                      a.className,
                      'className',
                      this,
                      null,
                      null,
                      a
                    ))
                  : (this._firstPT = v = this.parse(r, a, null)),
                this._transformType)
              ) {
                for (
                  A = 3 === this._transformType,
                    kt
                      ? h &&
                        ((u = !0),
                        '' === C.zIndex &&
                          (('auto' !== (x = tt(r, 'zIndex', n)) && '' !== x) ||
                            this._addLazySet(C, 'zIndex', 0)),
                        p &&
                          this._addLazySet(
                            C,
                            'WebkitBackfaceVisibility',
                            this._vars.WebkitBackfaceVisibility ||
                              (A ? 'visible' : 'hidden')
                          ))
                      : (C.zoom = 1),
                    _ = v;
                  _ && _._next;

                )
                  _ = _._next;
                (w = new bt(r, 'transform', 0, 0, null, 2)),
                  this._linkCSSP(w, null, _),
                  (w.setRatio = kt ? Kt : Wt),
                  (w.data = this._transform || Yt(r, n, !0)),
                  (w.tween = l),
                  (w.pr = -1),
                  i.pop();
              }
              if (t) {
                for (; v; ) {
                  for (T = v._next, _ = y; _ && _.pr > v.pr; ) _ = _._next;
                  (v._prev = _ ? _._prev : b) ? (v._prev._next = v) : (y = v),
                    (v._next = _) ? (_._prev = v) : (b = v),
                    (v = T);
                }
                this._firstPT = y;
              }
              return !0;
            }),
            (l.parse = function(t, r, i, o) {
              var a,
                l,
                u,
                h,
                f,
                p,
                d,
                v,
                _,
                y,
                b = t.style;
              for (a in r) {
                if (
                  ((p = r[a]),
                  (l = s[a]),
                  'function' != typeof p || (l && l.allowFunc) || (p = p(g, m)),
                  l)
                )
                  i = l.parse(t, p, a, this, i, o, r);
                else {
                  if ('--' === a.substr(0, 2)) {
                    this._tween._propLookup[a] = this._addTween.call(
                      this._tween,
                      t.style,
                      'setProperty',
                      $(t).getPropertyValue(a) + '',
                      p + '',
                      a,
                      !1,
                      a
                    );
                    continue;
                  }
                  (f = tt(t, a, n) + ''),
                    (_ = 'string' == typeof p),
                    'color' === a ||
                    'fill' === a ||
                    'stroke' === a ||
                    -1 !== a.indexOf('Color') ||
                    (_ && C.test(p))
                      ? (_ ||
                          (p =
                            ((p = dt(p)).length > 3 ? 'rgba(' : 'rgb(') +
                            p.join(',') +
                            ')'),
                        (i = xt(b, a, f, p, !0, 'transparent', i, 0, o)))
                      : _ && D.test(p)
                      ? (i = xt(b, a, f, p, !0, null, i, 0, o))
                      : ((d =
                          (u = parseFloat(f)) || 0 === u
                            ? f.substr((u + '').length)
                            : ''),
                        ('' !== f && 'auto' !== f) ||
                          ('width' === a || 'height' === a
                            ? ((u = st(t, a, n)), (d = 'px'))
                            : 'left' === a || 'top' === a
                            ? ((u = nt(t, a, n)), (d = 'px'))
                            : ((u = 'opacity' !== a ? 0 : 1), (d = ''))),
                        (y = _ && '=' === p.charAt(1))
                          ? ((h = parseInt(p.charAt(0) + '1', 10)),
                            (p = p.substr(2)),
                            (h *= parseFloat(p)),
                            (v = p.replace(x, '')))
                          : ((h = parseFloat(p)),
                            (v = _ ? p.replace(x, '') : '')),
                        '' === v && (v = a in e ? e[a] : d),
                        (p = h || 0 === h ? (y ? h + u : h) + v : r[a]),
                        d !== v &&
                          (('' === v && 'lineHeight' !== a) ||
                            ((h || 0 === h) &&
                              u &&
                              ((u = et(t, a, u, d)),
                              '%' === v
                                ? ((u /= et(t, a, 100, '%') / 100),
                                  !0 !== r.strictUnits && (f = u + '%'))
                                : 'em' === v ||
                                  'rem' === v ||
                                  'vw' === v ||
                                  'vh' === v
                                ? (u /= et(t, a, 1, v))
                                : 'px' !== v &&
                                  ((h = et(t, a, h, v)), (v = 'px')),
                              y && (h || 0 === h) && (p = h + u + v)))),
                        y && (h += u),
                        (!u && 0 !== u) || (!h && 0 !== h)
                          ? void 0 !== b[a] &&
                            (p || (p + '' != 'NaN' && null != p))
                            ? ((i = new bt(
                                b,
                                a,
                                h || u || 0,
                                0,
                                i,
                                -1,
                                a,
                                !1,
                                0,
                                f,
                                p
                              )).xs0 =
                                'none' !== p ||
                                ('display' !== a && -1 === a.indexOf('Style'))
                                  ? p
                                  : f)
                            : W('invalid ' + a + ' tween value: ' + r[a])
                          : ((i = new bt(
                              b,
                              a,
                              u,
                              h - u,
                              i,
                              0,
                              a,
                              !1 !== c && ('px' === v || 'zIndex' === a),
                              0,
                              f,
                              p
                            )).xs0 = v));
                }
                o && i && !i.plugin && (i.plugin = o);
              }
              return i;
            }),
            (l.setRatio = function(t) {
              var e,
                n,
                r,
                i = this._firstPT;
              if (
                1 !== t ||
                (this._tween._time !== this._tween._duration &&
                  0 !== this._tween._time)
              )
                if (
                  t ||
                  (this._tween._time !== this._tween._duration &&
                    0 !== this._tween._time) ||
                  -1e-6 === this._tween._rawPrevTime
                )
                  for (; i; ) {
                    if (
                      ((e = i.c * t + i.s),
                      i.r ? (e = i.r(e)) : e < 1e-6 && e > -1e-6 && (e = 0),
                      i.type)
                    )
                      if (1 === i.type)
                        if (2 === (r = i.l))
                          i.t[i.p] = i.xs0 + e + i.xs1 + i.xn1 + i.xs2;
                        else if (3 === r)
                          i.t[i.p] =
                            i.xs0 + e + i.xs1 + i.xn1 + i.xs2 + i.xn2 + i.xs3;
                        else if (4 === r)
                          i.t[i.p] =
                            i.xs0 +
                            e +
                            i.xs1 +
                            i.xn1 +
                            i.xs2 +
                            i.xn2 +
                            i.xs3 +
                            i.xn3 +
                            i.xs4;
                        else if (5 === r)
                          i.t[i.p] =
                            i.xs0 +
                            e +
                            i.xs1 +
                            i.xn1 +
                            i.xs2 +
                            i.xn2 +
                            i.xs3 +
                            i.xn3 +
                            i.xs4 +
                            i.xn4 +
                            i.xs5;
                        else {
                          for (n = i.xs0 + e + i.xs1, r = 1; r < i.l; r++)
                            n += i['xn' + r] + i['xs' + (r + 1)];
                          i.t[i.p] = n;
                        }
                      else
                        -1 === i.type
                          ? (i.t[i.p] = i.xs0)
                          : i.setRatio && i.setRatio(t);
                    else i.t[i.p] = e + i.xs0;
                    i = i._next;
                  }
                else
                  for (; i; )
                    2 !== i.type ? (i.t[i.p] = i.b) : i.setRatio(t),
                      (i = i._next);
              else
                for (; i; ) {
                  if (2 !== i.type)
                    if (i.r && -1 !== i.type)
                      if (((e = i.r(i.s + i.c)), i.type)) {
                        if (1 === i.type) {
                          for (
                            r = i.l, n = i.xs0 + e + i.xs1, r = 1;
                            r < i.l;
                            r++
                          )
                            n += i['xn' + r] + i['xs' + (r + 1)];
                          i.t[i.p] = n;
                        }
                      } else i.t[i.p] = e + i.xs0;
                    else i.t[i.p] = i.e;
                  else i.setRatio(t);
                  i = i._next;
                }
            }),
            (l._enableTransforms = function(t) {
              (this._transform = this._transform || Yt(this._target, n, !0)),
                (this._transformType =
                  (this._transform.svg && Pt) ||
                  (!t && 3 !== this._transformType)
                    ? 2
                    : 3);
            });
          var te = function(t) {
            (this.t[this.p] = this.e),
              this.data._linkCSSP(this, this._next, null, !0);
          };
          (l._addLazySet = function(t, e, n) {
            var r = (this._firstPT = new bt(t, e, 0, 0, this._firstPT, 2));
            (r.e = n), (r.setRatio = te), (r.data = this);
          }),
            (l._linkCSSP = function(t, e, n, r) {
              return (
                t &&
                  (e && (e._prev = t),
                  t._next && (t._next._prev = t._prev),
                  t._prev
                    ? (t._prev._next = t._next)
                    : this._firstPT === t &&
                      ((this._firstPT = t._next), (r = !0)),
                  n
                    ? (n._next = t)
                    : r || null !== this._firstPT || (this._firstPT = t),
                  (t._next = e),
                  (t._prev = n)),
                t
              );
            }),
            (l._mod = function(t) {
              for (var e = this._firstPT; e; )
                'function' == typeof t[e.p] && (e.r = t[e.p]), (e = e._next);
            }),
            (l._kill = function(t) {
              var e,
                n,
                i,
                o = t;
              if (t.autoAlpha || t.alpha) {
                for (n in ((o = {}), t)) o[n] = t[n];
                (o.opacity = 1), o.autoAlpha && (o.visibility = 1);
              }
              for (
                t.className &&
                  (e = this._classNamePT) &&
                  ((i = e.xfirst) && i._prev
                    ? this._linkCSSP(i._prev, e._next, i._prev._prev)
                    : i === this._firstPT && (this._firstPT = e._next),
                  e._next && this._linkCSSP(e._next, e._next._next, i._prev),
                  (this._classNamePT = null)),
                  e = this._firstPT;
                e;

              )
                e.plugin &&
                  e.plugin !== n &&
                  e.plugin._kill &&
                  (e.plugin._kill(t), (n = e.plugin)),
                  (e = e._next);
              return r.d.prototype._kill.call(this, o);
            });
          var ee = function(t, e, n) {
            var r, i, o, a;
            if (t.slice) for (i = t.length; --i > -1; ) ee(t[i], e, n);
            else
              for (i = (r = t.childNodes).length; --i > -1; )
                (a = (o = r[i]).type),
                  o.style && (e.push(rt(o)), n && n.push(o)),
                  (1 !== a && 9 !== a && 11 !== a) ||
                    !o.childNodes.length ||
                    ee(o, e, n);
          };
          return (
            (o.cascadeTo = function(t, e, n) {
              var i,
                o,
                a,
                s,
                l = r.f.to(t, e, n),
                c = [l],
                u = [],
                h = [],
                f = [],
                p = r.f._internals.reservedProps;
              for (
                t = l._targets || l.target,
                  ee(t, u, f),
                  l.render(e, !0, !0),
                  ee(t, h),
                  l.render(0, !0, !0),
                  l._enabled(!0),
                  i = f.length;
                --i > -1;

              )
                if ((o = it(f[i], u[i], h[i])).firstMPT) {
                  for (a in ((o = o.difs), n)) p[a] && (o[a] = n[a]);
                  for (a in ((s = {}), o)) s[a] = u[i][a];
                  c.push(r.f.fromTo(f[i], e, s, o));
                }
              return c;
            }),
            r.d.activate([o]),
            o
          );
        },
        !0
      );
      var s = r.g.CSSPlugin,
        l = r.e._gsDefine.plugin({
          propName: 'attr',
          API: 2,
          version: '0.6.1',
          init: function(t, e, n, r) {
            var i, o;
            if ('function' != typeof t.setAttribute) return !1;
            for (i in e)
              'function' == typeof (o = e[i]) && (o = o(r, t)),
                this._addTween(
                  t,
                  'setAttribute',
                  t.getAttribute(i) + '',
                  o + '',
                  i,
                  !1,
                  i
                ),
                this._overwriteProps.push(i);
            return !0;
          }
        }),
        c = r.e._gsDefine.plugin({
          propName: 'roundProps',
          version: '1.7.0',
          priority: -1,
          API: 2,
          init: function(t, e, n) {
            return (this._tween = n), !0;
          }
        }),
        u = function(t) {
          var e = t < 1 ? Math.pow(10, (t + '').length - 2) : 1;
          return function(n) {
            return ((Math.round(n / t) * t * e) | 0) / e;
          };
        },
        h = function(t, e) {
          for (; t; ) t.f || t.blob || (t.m = e || Math.round), (t = t._next);
        },
        f = c.prototype;
      /*!
       * VERSION: 0.6.1
       * DATE: 2018-08-27
       * UPDATES AND DOCS AT: http://greensock.com
       *
       * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
       * This work is subject to the terms at http://greensock.com/standard-license or for
       * Club GreenSock members, the software agreement that was issued with your membership.
       *
       * @author: Jack Doyle, jack@greensock.com
       */ (f._onInitAllProps = function() {
        var t,
          e,
          n,
          r,
          i = this._tween,
          o = i.vars.roundProps,
          a = {},
          s = i._propLookup.roundProps;
        if ('object' != typeof o || o.push)
          for (
            'string' == typeof o && (o = o.split(',')), n = o.length;
            --n > -1;

          )
            a[o[n]] = Math.round;
        else for (r in o) a[r] = u(o[r]);
        for (r in a)
          for (t = i._firstPT; t; )
            (e = t._next),
              t.pg
                ? t.t._mod(a)
                : t.n === r &&
                  (2 === t.f && t.t
                    ? h(t.t._firstPT, a[r])
                    : (this._add(t.t, r, t.s, t.c, a[r]),
                      e && (e._prev = t._prev),
                      t._prev
                        ? (t._prev._next = e)
                        : i._firstPT === t && (i._firstPT = e),
                      (t._next = t._prev = null),
                      (i._propLookup[r] = s))),
              (t = e);
        return !1;
      }),
        (f._add = function(t, e, n, r, i) {
          this._addTween(t, e, n, n + r, e, i || Math.round),
            this._overwriteProps.push(e);
        });
      /*!
       * VERSION: 0.3.1
       * DATE: 2018-08-27
       * UPDATES AND DOCS AT: http://greensock.com
       *
       * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
       * This work is subject to the terms at http://greensock.com/standard-license or for
       * Club GreenSock members, the software agreement that was issued with your membership.
       *
       * @author: Jack Doyle, jack@greensock.com
       **/
      var p = r.e._gsDefine.plugin({
        propName: 'directionalRotation',
        version: '0.3.1',
        API: 2,
        init: function(t, e, n, r) {
          'object' != typeof e && (e = { rotation: e }), (this.finals = {});
          var i,
            o,
            a,
            s,
            l,
            c,
            u = !0 === e.useRadians ? 2 * Math.PI : 360;
          for (i in e)
            'useRadians' !== i &&
              ('function' == typeof (s = e[i]) && (s = s(r, t)),
              (o = (c = (s + '').split('_'))[0]),
              (a = parseFloat(
                'function' != typeof t[i]
                  ? t[i]
                  : t[
                      i.indexOf('set') ||
                      'function' != typeof t['get' + i.substr(3)]
                        ? i
                        : 'get' + i.substr(3)
                    ]()
              )),
              (l =
                (s = this.finals[i] =
                  'string' == typeof o && '=' === o.charAt(1)
                    ? a + parseInt(o.charAt(0) + '1', 10) * Number(o.substr(2))
                    : Number(o) || 0) - a),
              c.length &&
                (-1 !== (o = c.join('_')).indexOf('short') &&
                  (l %= u) !== l % (u / 2) &&
                  (l = l < 0 ? l + u : l - u),
                -1 !== o.indexOf('_cw') && l < 0
                  ? (l = ((l + 9999999999 * u) % u) - ((l / u) | 0) * u)
                  : -1 !== o.indexOf('ccw') &&
                    l > 0 &&
                    (l = ((l - 9999999999 * u) % u) - ((l / u) | 0) * u)),
              (l > 1e-6 || l < -1e-6) &&
                (this._addTween(t, i, a, a + l, i),
                this._overwriteProps.push(i)));
          return !0;
        },
        set: function(t) {
          var e;
          if (1 !== t) this._super.setRatio.call(this, t);
          else
            for (e = this._firstPT; e; )
              e.f ? e.t[e.p](this.finals[e.p]) : (e.t[e.p] = this.finals[e.p]),
                (e = e._next);
        }
      });
      p._autoCSS = !0;
      /*!
       * VERSION: 1.3.9
       * DATE: 2019-05-17
       * UPDATES AND DOCS AT: http://greensock.com
       *
       * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
       * This work is subject to the terms at http://greensock.com/standard-license or for
       * Club GreenSock members, the software agreement that was issued with your membership.
       *
       * @author: Jack Doyle, jack@greensock.com
       **/
      var d = 180 / Math.PI,
        m = [],
        g = [],
        v = [],
        _ = {},
        y = r.e._gsDefine.globals,
        b = function(t, e, n, r) {
          n === r && (n = r - (r - e) / 1e6),
            t === e && (e = t + (n - t) / 1e6),
            (this.a = t),
            (this.b = e),
            (this.c = n),
            (this.d = r),
            (this.da = r - t),
            (this.ca = n - t),
            (this.ba = e - t);
        },
        T = function(t, e, n, r) {
          var i = { a: t },
            o = {},
            a = {},
            s = { c: r },
            l = (t + e) / 2,
            c = (e + n) / 2,
            u = (n + r) / 2,
            h = (l + c) / 2,
            f = (c + u) / 2,
            p = (f - h) / 8;
          return (
            (i.b = l + (t - l) / 4),
            (o.b = h + p),
            (i.c = o.a = (i.b + o.b) / 2),
            (o.c = a.a = (h + f) / 2),
            (a.b = f - p),
            (s.b = u + (r - u) / 4),
            (a.c = s.a = (a.b + s.b) / 2),
            [i, o, a, s]
          );
        },
        x = function(t, e, n, r, i) {
          var o,
            a,
            s,
            l,
            c,
            u,
            h,
            f,
            p,
            d,
            _,
            y,
            b,
            x = t.length - 1,
            w = 0,
            E = t[0].a;
          for (o = 0; o < x; o++)
            (a = (c = t[w]).a),
              (s = c.d),
              (l = t[w + 1].d),
              i
                ? ((_ = m[o]),
                  (b = (((y = g[o]) + _) * e * 0.25) / (r ? 0.5 : v[o] || 0.5)),
                  (f =
                    s -
                    ((u = s - (s - a) * (r ? 0.5 * e : 0 !== _ ? b / _ : 0)) +
                      ((((h =
                        s + (l - s) * (r ? 0.5 * e : 0 !== y ? b / y : 0)) -
                        u) *
                        ((3 * _) / (_ + y) + 0.5)) /
                        4 || 0))))
                : (f =
                    s -
                    ((u = s - (s - a) * e * 0.5) +
                      (h = s + (l - s) * e * 0.5)) /
                      2),
              (u += f),
              (h += f),
              (c.c = p = u),
              (c.b = 0 !== o ? E : (E = c.a + 0.6 * (c.c - c.a))),
              (c.da = s - a),
              (c.ca = p - a),
              (c.ba = E - a),
              n
                ? ((d = T(a, E, p, s)),
                  t.splice(w, 1, d[0], d[1], d[2], d[3]),
                  (w += 4))
                : w++,
              (E = h);
          ((c = t[w]).b = E),
            (c.c = E + 0.4 * (c.d - E)),
            (c.da = c.d - c.a),
            (c.ca = c.c - c.a),
            (c.ba = E - c.a),
            n &&
              ((d = T(c.a, E, c.c, c.d)),
              t.splice(w, 1, d[0], d[1], d[2], d[3]));
        },
        w = function(t, e, n, r) {
          var i,
            o,
            a,
            s,
            l,
            c,
            u = [];
          if (r)
            for (o = (t = [r].concat(t)).length; --o > -1; )
              'string' == typeof (c = t[o][e]) &&
                '=' === c.charAt(1) &&
                (t[o][e] = r[e] + Number(c.charAt(0) + c.substr(2)));
          if ((i = t.length - 2) < 0)
            return (u[0] = new b(t[0][e], 0, 0, t[0][e])), u;
          for (o = 0; o < i; o++)
            (a = t[o][e]),
              (s = t[o + 1][e]),
              (u[o] = new b(a, 0, 0, s)),
              n &&
                ((l = t[o + 2][e]),
                (m[o] = (m[o] || 0) + (s - a) * (s - a)),
                (g[o] = (g[o] || 0) + (l - s) * (l - s)));
          return (u[o] = new b(t[o][e], 0, 0, t[o + 1][e])), u;
        },
        E = function(t, e, n, r, i, o) {
          var a,
            s,
            l,
            c,
            u,
            h,
            f,
            p,
            d = {},
            y = [],
            b = o || t[0];
          for (s in ((i =
            'string' == typeof i
              ? ',' + i + ','
              : ',x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,'),
          null == e && (e = 1),
          t[0]))
            y.push(s);
          if (t.length > 1) {
            for (p = t[t.length - 1], f = !0, a = y.length; --a > -1; )
              if (((s = y[a]), Math.abs(b[s] - p[s]) > 0.05)) {
                f = !1;
                break;
              }
            f &&
              ((t = t.concat()),
              o && t.unshift(o),
              t.push(t[1]),
              (o = t[t.length - 3]));
          }
          for (m.length = g.length = v.length = 0, a = y.length; --a > -1; )
            (s = y[a]),
              (_[s] = -1 !== i.indexOf(',' + s + ',')),
              (d[s] = w(t, s, _[s], o));
          for (a = m.length; --a > -1; )
            (m[a] = Math.sqrt(m[a])), (g[a] = Math.sqrt(g[a]));
          if (!r) {
            for (a = y.length; --a > -1; )
              if (_[s])
                for (h = (l = d[y[a]]).length - 1, c = 0; c < h; c++)
                  (u = l[c + 1].da / g[c] + l[c].da / m[c] || 0),
                    (v[c] = (v[c] || 0) + u * u);
            for (a = v.length; --a > -1; ) v[a] = Math.sqrt(v[a]);
          }
          for (a = y.length, c = n ? 4 : 1; --a > -1; )
            (l = d[(s = y[a])]),
              x(l, e, n, r, _[s]),
              f && (l.splice(0, c), l.splice(l.length - c, c));
          return d;
        },
        A = function(t, e, n) {
          for (
            var r, i, o, a, s, l, c, u, h, f, p, d = 1 / n, m = t.length;
            --m > -1;

          )
            for (
              o = (f = t[m]).a,
                a = f.d - o,
                s = f.c - o,
                l = f.b - o,
                r = i = 0,
                u = 1;
              u <= n;
              u++
            )
              (r =
                i -
                (i =
                  ((c = d * u) * c * a + 3 * (h = 1 - c) * (c * s + h * l)) *
                  c)),
                (e[(p = m * n + u - 1)] = (e[p] || 0) + r * r);
        },
        C = r.e._gsDefine.plugin({
          propName: 'bezier',
          priority: -1,
          version: '1.3.9',
          API: 2,
          global: !0,
          init: function(t, e, n) {
            (this._target = t),
              e instanceof Array && (e = { values: e }),
              (this._func = {}),
              (this._mod = {}),
              (this._props = []),
              (this._timeRes =
                null == e.timeResolution ? 6 : parseInt(e.timeResolution, 10));
            var r,
              i,
              o,
              a,
              s,
              l = e.values || [],
              c = {},
              u = l[0],
              h = e.autoRotate || n.vars.orientToBezier;
            for (r in ((this._autoRotate = h
              ? h instanceof Array
                ? h
                : [['x', 'y', 'rotation', !0 === h ? 0 : Number(h) || 0]]
              : null),
            u))
              this._props.push(r);
            for (o = this._props.length; --o > -1; )
              (r = this._props[o]),
                this._overwriteProps.push(r),
                (i = this._func[r] = 'function' == typeof t[r]),
                (c[r] = i
                  ? t[
                      r.indexOf('set') ||
                      'function' != typeof t['get' + r.substr(3)]
                        ? r
                        : 'get' + r.substr(3)
                    ]()
                  : parseFloat(t[r])),
                s || (c[r] !== l[0][r] && (s = c));
            if (
              ((this._beziers =
                'cubic' !== e.type &&
                'quadratic' !== e.type &&
                'soft' !== e.type
                  ? E(
                      l,
                      isNaN(e.curviness) ? 1 : e.curviness,
                      !1,
                      'thruBasic' === e.type,
                      e.correlate,
                      s
                    )
                  : (function(t, e, n) {
                      var r,
                        i,
                        o,
                        a,
                        s,
                        l,
                        c,
                        u,
                        h,
                        f,
                        p,
                        d = {},
                        m = 'cubic' === (e = e || 'soft') ? 3 : 2,
                        g = 'soft' === e,
                        v = [];
                      if (
                        (g && n && (t = [n].concat(t)),
                        null == t || t.length < m + 1)
                      )
                        throw 'invalid Bezier data';
                      for (h in t[0]) v.push(h);
                      for (l = v.length; --l > -1; ) {
                        for (
                          d[(h = v[l])] = s = [], f = 0, u = t.length, c = 0;
                          c < u;
                          c++
                        )
                          (r =
                            null == n
                              ? t[c][h]
                              : 'string' == typeof (p = t[c][h]) &&
                                '=' === p.charAt(1)
                              ? n[h] + Number(p.charAt(0) + p.substr(2))
                              : Number(p)),
                            g &&
                              c > 1 &&
                              c < u - 1 &&
                              (s[f++] = (r + s[f - 2]) / 2),
                            (s[f++] = r);
                        for (u = f - m + 1, f = 0, c = 0; c < u; c += m)
                          (r = s[c]),
                            (i = s[c + 1]),
                            (o = s[c + 2]),
                            (a = 2 === m ? 0 : s[c + 3]),
                            (s[f++] = p =
                              3 === m
                                ? new b(r, i, o, a)
                                : new b(
                                    r,
                                    (2 * i + r) / 3,
                                    (2 * i + o) / 3,
                                    o
                                  ));
                        s.length = f;
                      }
                      return d;
                    })(l, e.type, c)),
              (this._segCount = this._beziers[r].length),
              this._timeRes)
            ) {
              var f = (function(t, e) {
                var n,
                  r,
                  i,
                  o,
                  a = [],
                  s = [],
                  l = 0,
                  c = 0,
                  u = (e = e >> 0 || 6) - 1,
                  h = [],
                  f = [];
                for (n in t) A(t[n], a, e);
                for (i = a.length, r = 0; r < i; r++)
                  (l += Math.sqrt(a[r])),
                    (f[(o = r % e)] = l),
                    o === u &&
                      ((c += l),
                      (h[(o = (r / e) >> 0)] = f),
                      (s[o] = c),
                      (l = 0),
                      (f = []));
                return { length: c, lengths: s, segments: h };
              })(this._beziers, this._timeRes);
              (this._length = f.length),
                (this._lengths = f.lengths),
                (this._segments = f.segments),
                (this._l1 = this._li = this._s1 = this._si = 0),
                (this._l2 = this._lengths[0]),
                (this._curSeg = this._segments[0]),
                (this._s2 = this._curSeg[0]),
                (this._prec = 1 / this._curSeg.length);
            }
            if ((h = this._autoRotate))
              for (
                this._initialRotations = [],
                  h[0] instanceof Array || (this._autoRotate = h = [h]),
                  o = h.length;
                --o > -1;

              ) {
                for (a = 0; a < 3; a++)
                  (r = h[o][a]),
                    (this._func[r] =
                      'function' == typeof t[r] &&
                      t[
                        r.indexOf('set') ||
                        'function' != typeof t['get' + r.substr(3)]
                          ? r
                          : 'get' + r.substr(3)
                      ]);
                (r = h[o][2]),
                  (this._initialRotations[o] =
                    (this._func[r]
                      ? this._func[r].call(this._target)
                      : this._target[r]) || 0),
                  this._overwriteProps.push(r);
              }
            return (this._startRatio = n.vars.runBackwards ? 1 : 0), !0;
          },
          set: function(t) {
            var e,
              n,
              r,
              i,
              o,
              a,
              s,
              l,
              c,
              u,
              h,
              f = this._segCount,
              p = this._func,
              m = this._target,
              g = t !== this._startRatio;
            if (this._timeRes) {
              if (
                ((c = this._lengths),
                (u = this._curSeg),
                (h = t * this._length),
                (r = this._li),
                h > this._l2 && r < f - 1)
              ) {
                for (l = f - 1; r < l && (this._l2 = c[++r]) <= h; );
                (this._l1 = c[r - 1]),
                  (this._li = r),
                  (this._curSeg = u = this._segments[r]),
                  (this._s2 = u[(this._s1 = this._si = 0)]);
              } else if (h < this._l1 && r > 0) {
                for (; r > 0 && (this._l1 = c[--r]) >= h; );
                0 === r && h < this._l1 ? (this._l1 = 0) : r++,
                  (this._l2 = c[r]),
                  (this._li = r),
                  (this._curSeg = u = this._segments[r]),
                  (this._s1 = u[(this._si = u.length - 1) - 1] || 0),
                  (this._s2 = u[this._si]);
              }
              if (
                ((e = r),
                (h -= this._l1),
                (r = this._si),
                h > this._s2 && r < u.length - 1)
              ) {
                for (l = u.length - 1; r < l && (this._s2 = u[++r]) <= h; );
                (this._s1 = u[r - 1]), (this._si = r);
              } else if (h < this._s1 && r > 0) {
                for (; r > 0 && (this._s1 = u[--r]) >= h; );
                0 === r && h < this._s1 ? (this._s1 = 0) : r++,
                  (this._s2 = u[r]),
                  (this._si = r);
              }
              a =
                1 === t
                  ? 1
                  : (r + (h - this._s1) / (this._s2 - this._s1)) * this._prec ||
                    0;
            } else
              a =
                (t -
                  (e = t < 0 ? 0 : t >= 1 ? f - 1 : (f * t) >> 0) * (1 / f)) *
                f;
            for (n = 1 - a, r = this._props.length; --r > -1; )
              (i = this._props[r]),
                (s =
                  (a * a * (o = this._beziers[i][e]).da +
                    3 * n * (a * o.ca + n * o.ba)) *
                    a +
                  o.a),
                this._mod[i] && (s = this._mod[i](s, m)),
                p[i] ? m[i](s) : (m[i] = s);
            if (this._autoRotate) {
              var v,
                _,
                y,
                b,
                T,
                x,
                w,
                E = this._autoRotate;
              for (r = E.length; --r > -1; )
                (i = E[r][2]),
                  (x = E[r][3] || 0),
                  (w = !0 === E[r][4] ? 1 : d),
                  (o = this._beziers[E[r][0]]),
                  (v = this._beziers[E[r][1]]),
                  o &&
                    v &&
                    ((o = o[e]),
                    (v = v[e]),
                    (_ = o.a + (o.b - o.a) * a),
                    (_ += ((b = o.b + (o.c - o.b) * a) - _) * a),
                    (b += (o.c + (o.d - o.c) * a - b) * a),
                    (y = v.a + (v.b - v.a) * a),
                    (y += ((T = v.b + (v.c - v.b) * a) - y) * a),
                    (T += (v.c + (v.d - v.c) * a - T) * a),
                    (s = g
                      ? Math.atan2(T - y, b - _) * w + x
                      : this._initialRotations[r]),
                    this._mod[i] && (s = this._mod[i](s, m)),
                    p[i] ? m[i](s) : (m[i] = s));
            }
          }
        }),
        P = C.prototype;
      (C.bezierThrough = E),
        (C.cubicToQuadratic = T),
        (C._autoCSS = !0),
        (C.quadraticToCubic = function(t, e, n) {
          return new b(t, (2 * e + t) / 3, (2 * e + n) / 3, n);
        }),
        (C._cssRegister = function() {
          var t = y.CSSPlugin;
          if (t) {
            var e = t._internals,
              n = e._parseToProxy,
              r = e._setPluginRatio,
              i = e.CSSPropTween;
            e._registerComplexSpecialProp('bezier', {
              parser: function(t, e, o, a, s, l) {
                e instanceof Array && (e = { values: e }), (l = new C());
                var c,
                  u,
                  h,
                  f = e.values,
                  p = f.length - 1,
                  d = [],
                  m = {};
                if (p < 0) return s;
                for (c = 0; c <= p; c++)
                  (h = n(t, f[c], a, s, l, p !== c)), (d[c] = h.end);
                for (u in e) m[u] = e[u];
                return (
                  (m.values = d),
                  ((s = new i(t, 'bezier', 0, 0, h.pt, 2)).data = h),
                  (s.plugin = l),
                  (s.setRatio = r),
                  0 === m.autoRotate && (m.autoRotate = !0),
                  !m.autoRotate ||
                    m.autoRotate instanceof Array ||
                    ((c = !0 === m.autoRotate ? 0 : Number(m.autoRotate)),
                    (m.autoRotate =
                      null != h.end.left
                        ? [['left', 'top', 'rotation', c, !1]]
                        : null != h.end.x && [['x', 'y', 'rotation', c, !1]])),
                  m.autoRotate &&
                    (a._transform || a._enableTransforms(!1),
                    (h.autoRotate = a._target._gsTransform),
                    (h.proxy.rotation = h.autoRotate.rotation || 0),
                    a._overwriteProps.push('rotation')),
                  l._onInitTween(h.proxy, m, a._tween),
                  s
                );
              }
            });
          }
        }),
        (P._mod = function(t) {
          for (var e, n = this._overwriteProps, r = n.length; --r > -1; )
            (e = t[n[r]]) && 'function' == typeof e && (this._mod[n[r]] = e);
        }),
        (P._kill = function(t) {
          var e,
            n,
            r = this._props;
          for (e in this._beziers)
            if (e in t)
              for (
                delete this._beziers[e], delete this._func[e], n = r.length;
                --n > -1;

              )
                r[n] === e && r.splice(n, 1);
          if ((r = this._autoRotate))
            for (n = r.length; --n > -1; ) t[r[n][2]] && r.splice(n, 1);
          return this._super._kill.call(this, t);
        }),
        /*!
         * VERSION: 1.16.1
         * DATE: 2018-08-27
         * UPDATES AND DOCS AT: http://greensock.com
         *
         * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
         * This work is subject to the terms at http://greensock.com/standard-license or for
         * Club GreenSock members, the software agreement that was issued with your membership.
         *
         * @author: Jack Doyle, jack@greensock.com
         **/
        r.e._gsDefine(
          'easing.Back',
          ['easing.Ease'],
          function() {
            var t,
              e,
              n,
              i,
              o = r.e.GreenSockGlobals || r.e,
              a = o.com.greensock,
              s = 2 * Math.PI,
              l = Math.PI / 2,
              c = a._class,
              u = function(t, e) {
                var n = c('easing.' + t, function() {}, !0),
                  i = (n.prototype = new r.b());
                return (i.constructor = n), (i.getRatio = e), n;
              },
              h = r.b.register || function() {},
              f = function(t, e, n, r, i) {
                var o = c(
                  'easing.' + t,
                  { easeOut: new e(), easeIn: new n(), easeInOut: new r() },
                  !0
                );
                return h(o, t), o;
              },
              p = function(t, e, n) {
                (this.t = t),
                  (this.v = e),
                  n &&
                    ((this.next = n),
                    (n.prev = this),
                    (this.c = n.v - e),
                    (this.gap = n.t - t));
              },
              d = function(t, e) {
                var n = c(
                    'easing.' + t,
                    function(t) {
                      (this._p1 = t || 0 === t ? t : 1.70158),
                        (this._p2 = 1.525 * this._p1);
                    },
                    !0
                  ),
                  i = (n.prototype = new r.b());
                return (
                  (i.constructor = n),
                  (i.getRatio = e),
                  (i.config = function(t) {
                    return new n(t);
                  }),
                  n
                );
              },
              m = f(
                'Back',
                d('BackOut', function(t) {
                  return (t -= 1) * t * ((this._p1 + 1) * t + this._p1) + 1;
                }),
                d('BackIn', function(t) {
                  return t * t * ((this._p1 + 1) * t - this._p1);
                }),
                d('BackInOut', function(t) {
                  return (t *= 2) < 1
                    ? 0.5 * t * t * ((this._p2 + 1) * t - this._p2)
                    : 0.5 *
                        ((t -= 2) * t * ((this._p2 + 1) * t + this._p2) + 2);
                })
              ),
              g = c(
                'easing.SlowMo',
                function(t, e, n) {
                  (e = e || 0 === e ? e : 0.7),
                    null == t ? (t = 0.7) : t > 1 && (t = 1),
                    (this._p = 1 !== t ? e : 0),
                    (this._p1 = (1 - t) / 2),
                    (this._p2 = t),
                    (this._p3 = this._p1 + this._p2),
                    (this._calcEnd = !0 === n);
                },
                !0
              ),
              v = (g.prototype = new r.b());
            return (
              (v.constructor = g),
              (v.getRatio = function(t) {
                var e = t + (0.5 - t) * this._p;
                return t < this._p1
                  ? this._calcEnd
                    ? 1 - (t = 1 - t / this._p1) * t
                    : e - (t = 1 - t / this._p1) * t * t * t * e
                  : t > this._p3
                  ? this._calcEnd
                    ? 1 === t
                      ? 0
                      : 1 - (t = (t - this._p3) / this._p1) * t
                    : e + (t - e) * (t = (t - this._p3) / this._p1) * t * t * t
                  : this._calcEnd
                  ? 1
                  : e;
              }),
              (g.ease = new g(0.7, 0.7)),
              (v.config = g.config = function(t, e, n) {
                return new g(t, e, n);
              }),
              ((v = (t = c(
                'easing.SteppedEase',
                function(t, e) {
                  (t = t || 1),
                    (this._p1 = 1 / t),
                    (this._p2 = t + (e ? 0 : 1)),
                    (this._p3 = e ? 1 : 0);
                },
                !0
              )).prototype = new r.b()).constructor = t),
              (v.getRatio = function(t) {
                return (
                  t < 0 ? (t = 0) : t >= 1 && (t = 0.999999999),
                  (((this._p2 * t) | 0) + this._p3) * this._p1
                );
              }),
              (v.config = t.config = function(e, n) {
                return new t(e, n);
              }),
              ((v = (e = c(
                'easing.ExpoScaleEase',
                function(t, e, n) {
                  (this._p1 = Math.log(e / t)),
                    (this._p2 = e - t),
                    (this._p3 = t),
                    (this._ease = n);
                },
                !0
              )).prototype = new r.b()).constructor = e),
              (v.getRatio = function(t) {
                return (
                  this._ease && (t = this._ease.getRatio(t)),
                  (this._p3 * Math.exp(this._p1 * t) - this._p3) / this._p2
                );
              }),
              (v.config = e.config = function(t, n, r) {
                return new e(t, n, r);
              }),
              ((v = (n = c(
                'easing.RoughEase',
                function(t) {
                  for (
                    var e,
                      n,
                      i,
                      o,
                      a,
                      s,
                      l = (t = t || {}).taper || 'none',
                      c = [],
                      u = 0,
                      h = 0 | (t.points || 20),
                      f = h,
                      d = !1 !== t.randomize,
                      m = !0 === t.clamp,
                      g = t.template instanceof r.b ? t.template : null,
                      v =
                        'number' == typeof t.strength ? 0.4 * t.strength : 0.4;
                    --f > -1;

                  )
                    (e = d ? Math.random() : (1 / h) * f),
                      (n = g ? g.getRatio(e) : e),
                      (i =
                        'none' === l
                          ? v
                          : 'out' === l
                          ? (o = 1 - e) * o * v
                          : 'in' === l
                          ? e * e * v
                          : e < 0.5
                          ? (o = 2 * e) * o * 0.5 * v
                          : (o = 2 * (1 - e)) * o * 0.5 * v),
                      d
                        ? (n += Math.random() * i - 0.5 * i)
                        : f % 2
                        ? (n += 0.5 * i)
                        : (n -= 0.5 * i),
                      m && (n > 1 ? (n = 1) : n < 0 && (n = 0)),
                      (c[u++] = { x: e, y: n });
                  for (
                    c.sort(function(t, e) {
                      return t.x - e.x;
                    }),
                      s = new p(1, 1, null),
                      f = h;
                    --f > -1;

                  )
                    (a = c[f]), (s = new p(a.x, a.y, s));
                  this._prev = new p(0, 0, 0 !== s.t ? s : s.next);
                },
                !0
              )).prototype = new r.b()).constructor = n),
              (v.getRatio = function(t) {
                var e = this._prev;
                if (t > e.t) {
                  for (; e.next && t >= e.t; ) e = e.next;
                  e = e.prev;
                } else for (; e.prev && t <= e.t; ) e = e.prev;
                return (this._prev = e), e.v + ((t - e.t) / e.gap) * e.c;
              }),
              (v.config = function(t) {
                return new n(t);
              }),
              (n.ease = new n()),
              f(
                'Bounce',
                u('BounceOut', function(t) {
                  return t < 1 / 2.75
                    ? 7.5625 * t * t
                    : t < 2 / 2.75
                    ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75
                    : t < 2.5 / 2.75
                    ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
                    : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
                }),
                u('BounceIn', function(t) {
                  return (t = 1 - t) < 1 / 2.75
                    ? 1 - 7.5625 * t * t
                    : t < 2 / 2.75
                    ? 1 - (7.5625 * (t -= 1.5 / 2.75) * t + 0.75)
                    : t < 2.5 / 2.75
                    ? 1 - (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375)
                    : 1 - (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375);
                }),
                u('BounceInOut', function(t) {
                  var e = t < 0.5;
                  return (
                    (t = e ? 1 - 2 * t : 2 * t - 1) < 1 / 2.75
                      ? (t *= 7.5625 * t)
                      : (t =
                          t < 2 / 2.75
                            ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75
                            : t < 2.5 / 2.75
                            ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
                            : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375),
                    e ? 0.5 * (1 - t) : 0.5 * t + 0.5
                  );
                })
              ),
              f(
                'Circ',
                u('CircOut', function(t) {
                  return Math.sqrt(1 - (t -= 1) * t);
                }),
                u('CircIn', function(t) {
                  return -(Math.sqrt(1 - t * t) - 1);
                }),
                u('CircInOut', function(t) {
                  return (t *= 2) < 1
                    ? -0.5 * (Math.sqrt(1 - t * t) - 1)
                    : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
                })
              ),
              f(
                'Elastic',
                (i = function(t, e, n) {
                  var i = c(
                      'easing.' + t,
                      function(t, e) {
                        (this._p1 = t >= 1 ? t : 1),
                          (this._p2 = (e || n) / (t < 1 ? t : 1)),
                          (this._p3 =
                            (this._p2 / s) * (Math.asin(1 / this._p1) || 0)),
                          (this._p2 = s / this._p2);
                      },
                      !0
                    ),
                    o = (i.prototype = new r.b());
                  return (
                    (o.constructor = i),
                    (o.getRatio = e),
                    (o.config = function(t, e) {
                      return new i(t, e);
                    }),
                    i
                  );
                })(
                  'ElasticOut',
                  function(t) {
                    return (
                      this._p1 *
                        Math.pow(2, -10 * t) *
                        Math.sin((t - this._p3) * this._p2) +
                      1
                    );
                  },
                  0.3
                ),
                i(
                  'ElasticIn',
                  function(t) {
                    return (
                      -this._p1 *
                      Math.pow(2, 10 * (t -= 1)) *
                      Math.sin((t - this._p3) * this._p2)
                    );
                  },
                  0.3
                ),
                i(
                  'ElasticInOut',
                  function(t) {
                    return (t *= 2) < 1
                      ? this._p1 *
                          Math.pow(2, 10 * (t -= 1)) *
                          Math.sin((t - this._p3) * this._p2) *
                          -0.5
                      : this._p1 *
                          Math.pow(2, -10 * (t -= 1)) *
                          Math.sin((t - this._p3) * this._p2) *
                          0.5 +
                          1;
                  },
                  0.45
                )
              ),
              f(
                'Expo',
                u('ExpoOut', function(t) {
                  return 1 - Math.pow(2, -10 * t);
                }),
                u('ExpoIn', function(t) {
                  return Math.pow(2, 10 * (t - 1)) - 0.001;
                }),
                u('ExpoInOut', function(t) {
                  return (t *= 2) < 1
                    ? 0.5 * Math.pow(2, 10 * (t - 1))
                    : 0.5 * (2 - Math.pow(2, -10 * (t - 1)));
                })
              ),
              f(
                'Sine',
                u('SineOut', function(t) {
                  return Math.sin(t * l);
                }),
                u('SineIn', function(t) {
                  return 1 - Math.cos(t * l);
                }),
                u('SineInOut', function(t) {
                  return -0.5 * (Math.cos(Math.PI * t) - 1);
                })
              ),
              c(
                'easing.EaseLookup',
                {
                  find: function(t) {
                    return r.b.map[t];
                  }
                },
                !0
              ),
              h(o.SlowMo, 'SlowMo', 'ease,'),
              h(n, 'RoughEase', 'ease,'),
              h(t, 'SteppedEase', 'ease,'),
              m
            );
          },
          !0
        );
      var R = r.g.Back,
        I = r.g.Elastic,
        S = r.g.Bounce,
        M = r.g.RoughEase,
        O = r.g.SlowMo,
        k = r.g.SteppedEase,
        N = r.g.Circ,
        D = r.g.Expo,
        F = r.g.Sine,
        L = r.g.ExpoScaleEase,
        U = a;
      U._autoActivated = [i, o, s, l, C, c, p, R, I, S, M, O, k, N, D, F, L];
    },
    zqV6: function(t, e, n) {
      'use strict';
      (function(t, r) {
        var i = n('pIo5'),
          o = n('hK8l');
        t.__TYPEDARRAY_POOL ||
          (t.__TYPEDARRAY_POOL = {
            UINT8: o([32, 0]),
            UINT16: o([32, 0]),
            UINT32: o([32, 0]),
            INT8: o([32, 0]),
            INT16: o([32, 0]),
            INT32: o([32, 0]),
            FLOAT: o([32, 0]),
            DOUBLE: o([32, 0]),
            DATA: o([32, 0]),
            UINT8C: o([32, 0]),
            BUFFER: o([32, 0])
          });
        var a = 'undefined' != typeof Uint8ClampedArray,
          s = t.__TYPEDARRAY_POOL;
        s.UINT8C || (s.UINT8C = o([32, 0])),
          s.BUFFER || (s.BUFFER = o([32, 0]));
        var l = s.DATA,
          c = s.BUFFER;
        function u(t) {
          if (t) {
            var e = t.length || t.byteLength,
              n = i.log2(e);
            l[n].push(t);
          }
        }
        function h(t) {
          t = i.nextPow2(t);
          var e = i.log2(t),
            n = l[e];
          return n.length > 0 ? n.pop() : new ArrayBuffer(t);
        }
        function f(t) {
          return new Uint8Array(h(t), 0, t);
        }
        function p(t) {
          return new Uint16Array(h(2 * t), 0, t);
        }
        function d(t) {
          return new Uint32Array(h(4 * t), 0, t);
        }
        function m(t) {
          return new Int8Array(h(t), 0, t);
        }
        function g(t) {
          return new Int16Array(h(2 * t), 0, t);
        }
        function v(t) {
          return new Int32Array(h(4 * t), 0, t);
        }
        function _(t) {
          return new Float32Array(h(4 * t), 0, t);
        }
        function y(t) {
          return new Float64Array(h(8 * t), 0, t);
        }
        function b(t) {
          return a ? new Uint8ClampedArray(h(t), 0, t) : f(t);
        }
        function T(t) {
          return new DataView(h(t), 0, t);
        }
        function x(t) {
          t = i.nextPow2(t);
          var e = i.log2(t),
            n = c[e];
          return n.length > 0 ? n.pop() : new r(t);
        }
        (e.free = function(t) {
          if (r.isBuffer(t)) c[i.log2(t.length)].push(t);
          else {
            if (
              ('[object ArrayBuffer]' !== Object.prototype.toString.call(t) &&
                (t = t.buffer),
              !t)
            )
              return;
            var e = t.length || t.byteLength,
              n = 0 | i.log2(e);
            l[n].push(t);
          }
        }),
          (e.freeUint8 = e.freeUint16 = e.freeUint32 = e.freeInt8 = e.freeInt16 = e.freeInt32 = e.freeFloat32 = e.freeFloat = e.freeFloat64 = e.freeDouble = e.freeUint8Clamped = e.freeDataView = function(
            t
          ) {
            u(t.buffer);
          }),
          (e.freeArrayBuffer = u),
          (e.freeBuffer = function(t) {
            c[i.log2(t.length)].push(t);
          }),
          (e.malloc = function(t, e) {
            if (void 0 === e || 'arraybuffer' === e) return h(t);
            switch (e) {
              case 'uint8':
                return f(t);
              case 'uint16':
                return p(t);
              case 'uint32':
                return d(t);
              case 'int8':
                return m(t);
              case 'int16':
                return g(t);
              case 'int32':
                return v(t);
              case 'float':
              case 'float32':
                return _(t);
              case 'double':
              case 'float64':
                return y(t);
              case 'uint8_clamped':
                return b(t);
              case 'buffer':
                return x(t);
              case 'data':
              case 'dataview':
                return T(t);
              default:
                return null;
            }
            return null;
          }),
          (e.mallocArrayBuffer = h),
          (e.mallocUint8 = f),
          (e.mallocUint16 = p),
          (e.mallocUint32 = d),
          (e.mallocInt8 = m),
          (e.mallocInt16 = g),
          (e.mallocInt32 = v),
          (e.mallocFloat32 = e.mallocFloat = _),
          (e.mallocFloat64 = e.mallocDouble = y),
          (e.mallocUint8Clamped = b),
          (e.mallocDataView = T),
          (e.mallocBuffer = x),
          (e.clearCache = function() {
            for (var t = 0; t < 32; ++t)
              (s.UINT8[t].length = 0),
                (s.UINT16[t].length = 0),
                (s.UINT32[t].length = 0),
                (s.INT8[t].length = 0),
                (s.INT16[t].length = 0),
                (s.INT32[t].length = 0),
                (s.FLOAT[t].length = 0),
                (s.DOUBLE[t].length = 0),
                (s.UINT8C[t].length = 0),
                (l[t].length = 0),
                (c[t].length = 0);
          });
      }.call(this, n('yLpj'), n('tjlA').Buffer));
    }
  },
  [['3vis', 'runtime', 0, 1]]
]);
