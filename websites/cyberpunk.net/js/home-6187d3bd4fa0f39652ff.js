(window.webpackJsonp = window.webpackJsonp || []).push([
  ['home'],
  {
    '/9aa': function(e, t, n) {
      var r = n('NykK'),
        i = n('ExA7'),
        o = '[object Symbol]';
      e.exports = function(e) {
        return 'symbol' == typeof e || (i(e) && r(e) == o);
      };
    },
    '/MXg': function(e, t, n) {
      var r = n('ZkmD');
      e.exports = function() {
        var e = r();
        return {
          get: function(t, n) {
            var r = e(t);
            return r.hasOwnProperty('value') ? r.value : n;
          },
          set: function(t, n) {
            return (e(t).value = n), this;
          },
          has: function(t) {
            return 'value' in e(t);
          },
          delete: function(t) {
            return delete e(t).value;
          }
        };
      };
    },
    '033R': function(e, t, n) {
      'use strict';
      var r = n('TBio');
      e.exports = function(e) {
        var t = ["'use strict'", 'var CACHED={}'],
          n = [],
          i = e.funcName + '_cwise_thunk';
        t.push(
          ['return function ', i, '(', e.shimArgs.join(','), '){'].join('')
        );
        for (
          var o = [],
            a = [],
            s = [
              [
                'array',
                e.arrayArgs[0],
                '.shape.slice(',
                Math.max(0, e.arrayBlockIndices[0]),
                e.arrayBlockIndices[0] < 0
                  ? ',' + e.arrayBlockIndices[0] + ')'
                  : ')'
              ].join('')
            ],
            l = [],
            u = [],
            c = 0;
          c < e.arrayArgs.length;
          ++c
        ) {
          var h = e.arrayArgs[c];
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
            c > 0 &&
              (l.push(
                'array' +
                  e.arrayArgs[0] +
                  '.shape.length===array' +
                  h +
                  '.shape.length+' +
                  (Math.abs(e.arrayBlockIndices[0]) -
                    Math.abs(e.arrayBlockIndices[c]))
              ),
              u.push(
                'array' +
                  e.arrayArgs[0] +
                  '.shape[shapeIndex+' +
                  Math.max(0, e.arrayBlockIndices[0]) +
                  ']===array' +
                  h +
                  '.shape[shapeIndex+' +
                  Math.max(0, e.arrayBlockIndices[c]) +
                  ']'
              ));
        }
        for (
          e.arrayArgs.length > 1 &&
            (t.push(
              'if (!(' +
                l.join(' && ') +
                ")) throw new Error('cwise: Arrays do not all have the same dimensionality!')"
            ),
            t.push(
              'for(var shapeIndex=array' +
                e.arrayArgs[0] +
                '.shape.length-' +
                Math.abs(e.arrayBlockIndices[0]) +
                '; shapeIndex--\x3e0;) {'
            ),
            t.push(
              'if (!(' +
                u.join(' && ') +
                ")) throw new Error('cwise: Arrays do not all have the same shape!')"
            ),
            t.push('}')),
            c = 0;
          c < e.scalarArgs.length;
          ++c
        )
          s.push('scalar' + e.scalarArgs[c]);
        return (
          n.push(['type=[', a.join(','), '].join()'].join('')),
          n.push('proc=CACHED[type]'),
          t.push('var ' + n.join(',')),
          t.push(
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
          e.debug &&
            console.log(
              '-----Generated thunk:\n' + t.join('\n') + '\n----------'
            ),
          new Function('compile', t.join('\n'))(r.bind(void 0, e))
        );
      };
    },
    '0GS4': function(e, t, n) {
      'use strict';
      var r = n('63NL'),
        i = n('o/2B');
      function o(e) {
        return new Function('y', 'return function(){return y}')(e);
      }
      function a(e, t) {
        for (var n = new Array(e), r = 0; r < e; ++r) n[r] = t;
        return n;
      }
      e.exports = function(e, t, n, s) {
        function l(e, t, n) {
          switch (n) {
            case 'bool':
            case 'int':
            case 'sampler2D':
            case 'samplerCube':
              return 'gl.uniform1i(locations[' + t + '],obj' + e + ')';
            case 'float':
              return 'gl.uniform1f(locations[' + t + '],obj' + e + ')';
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
                    t +
                    '],false,obj' +
                    e +
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
                    'gl.uniform' + o + 'iv(locations[' + t + '],obj' + e + ')'
                  );
                case 'v':
                  return (
                    'gl.uniform' + o + 'fv(locations[' + t + '],obj' + e + ')'
                  );
                default:
                  throw new i(
                    '',
                    'Unrecognized data type for vector ' + name + ': ' + n
                  );
              }
          }
        }
        function u(t) {
          for (
            var r = ['return function updateProperty(obj){'],
              i = (function e(t, n) {
                if ('object' != typeof n) return [[t, n]];
                var r = [];
                for (var i in n) {
                  var o = n[i],
                    a = t;
                  parseInt(i) + '' === i
                    ? (a += '[' + i + ']')
                    : (a += '.' + i),
                    'object' == typeof o
                      ? r.push.apply(r, e(a, o))
                      : r.push([a, o]);
                }
                return r;
              })('', t),
              o = 0;
            o < i.length;
            ++o
          ) {
            var a = i[o],
              u = a[0],
              c = a[1];
            s[c] && r.push(l(u, c, n[c].type));
          }
          r.push('return obj}');
          var h = new Function('gl', 'locations', r.join('\n'));
          return h(e, s);
        }
        function c(r, l, c) {
          if ('object' == typeof c) {
            var f = h(c);
            Object.defineProperty(r, l, {
              get: o(f),
              set: u(c),
              enumerable: !0,
              configurable: !1
            });
          } else
            s[c]
              ? Object.defineProperty(r, l, {
                  get:
                    ((p = c),
                    (d = new Function(
                      'gl',
                      'wrapper',
                      'locations',
                      'return function(){return gl.getUniform(wrapper.program,locations[' +
                        p +
                        '])}'
                    )),
                    d(e, t, s)),
                  set: u(c),
                  enumerable: !0,
                  configurable: !1
                })
              : (r[l] = (function(e) {
                  switch (e) {
                    case 'bool':
                      return !1;
                    case 'int':
                    case 'sampler2D':
                    case 'samplerCube':
                    case 'float':
                      return 0;
                    default:
                      var t = e.indexOf('vec');
                      if (0 <= t && t <= 1 && e.length === 4 + t) {
                        var n = e.charCodeAt(e.length - 1) - 48;
                        if (n < 2 || n > 4)
                          throw new i('', 'Invalid data type');
                        return 'b' === e.charAt(0) ? a(n, !1) : a(n, 0);
                      }
                      if (0 === e.indexOf('mat') && 4 === e.length) {
                        var n = e.charCodeAt(e.length - 1) - 48;
                        if (n < 2 || n > 4)
                          throw new i(
                            '',
                            'Invalid uniform dimension type for matrix ' +
                              name +
                              ': ' +
                              e
                          );
                        return a(n * n, 0);
                      }
                      throw new i(
                        '',
                        'Unknown uniform data type for ' + name + ': ' + e
                      );
                  }
                })(n[c].type));
          var p, d;
        }
        function h(e) {
          var t;
          if (Array.isArray(e)) {
            t = new Array(e.length);
            for (var n = 0; n < e.length; ++n) c(t, n, e[n]);
          } else for (var r in ((t = {}), e)) c(t, r, e[r]);
          return t;
        }
        var f = r(n, !0);
        return { get: o(h(f)), set: u(f), enumerable: !0, configurable: !0 };
      };
    },
    '1BqX': function(e, t, n) {
      'use strict';
      (t.uniforms = function(e, t) {
        for (
          var n = e.getProgramParameter(t, e.ACTIVE_UNIFORMS), r = [], i = 0;
          i < n;
          ++i
        ) {
          var a = e.getActiveUniform(t, i);
          if (a) {
            var s = o(e, a.type);
            if (a.size > 1)
              for (var l = 0; l < a.size; ++l)
                r.push({ name: a.name.replace('[0]', '[' + l + ']'), type: s });
            else r.push({ name: a.name, type: s });
          }
        }
        return r;
      }),
        (t.attributes = function(e, t) {
          for (
            var n = e.getProgramParameter(t, e.ACTIVE_ATTRIBUTES),
              r = [],
              i = 0;
            i < n;
            ++i
          ) {
            var a = e.getActiveAttrib(t, i);
            a && r.push({ name: a.name, type: o(e, a.type) });
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
      function o(e, t) {
        if (!i) {
          var n = Object.keys(r);
          i = {};
          for (var o = 0; o < n.length; ++o) {
            var a = n[o];
            i[e[a]] = r[a];
          }
        }
        return i[t];
      }
    },
    '3UD+': function(e, t) {
      e.exports = function(e) {
        if (!e.webpackPolyfill) {
          var t = Object.create(e);
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
            Object.defineProperty(t, 'exports', { enumerable: !0 }),
            (t.webpackPolyfill = 1);
        }
        return t;
      };
    },
    '4JlD': function(e, t, n) {
      'use strict';
      var r = function(e) {
        switch (typeof e) {
          case 'string':
            return e;
          case 'boolean':
            return e ? 'true' : 'false';
          case 'number':
            return isFinite(e) ? e : '';
          default:
            return '';
        }
      };
      e.exports = function(e, t, n, s) {
        return (
          (t = t || '&'),
          (n = n || '='),
          null === e && (e = void 0),
          'object' == typeof e
            ? o(a(e), function(a) {
                var s = encodeURIComponent(r(a)) + n;
                return i(e[a])
                  ? o(e[a], function(e) {
                      return s + encodeURIComponent(r(e));
                    }).join(t)
                  : s + encodeURIComponent(r(e[a]));
              }).join(t)
            : s
            ? encodeURIComponent(r(s)) + n + encodeURIComponent(r(e))
            : ''
        );
      };
      var i =
        Array.isArray ||
        function(e) {
          return '[object Array]' === Object.prototype.toString.call(e);
        };
      function o(e, t) {
        if (e.map) return e.map(t);
        for (var n = [], r = 0; r < e.length; r++) n.push(t(e[r], r));
        return n;
      }
      var a =
        Object.keys ||
        function(e) {
          var t = [];
          for (var n in e)
            Object.prototype.hasOwnProperty.call(e, n) && t.push(n);
          return t;
        };
    },
    '4Z/T': function(e, t, n) {
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
        function o(e) {
          return (function(e, t) {
            var n,
              r,
              a,
              s,
              l,
              u,
              c,
              h,
              f,
              p = 1,
              d = e.length,
              m = '';
            for (r = 0; r < d; r++)
              if ('string' == typeof e[r]) m += e[r];
              else if ('object' == typeof e[r]) {
                if ((s = e[r]).keys)
                  for (n = t[p], a = 0; a < s.keys.length; a++) {
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
                else n = s.param_no ? t[s.param_no] : t[p++];
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
                    (u = s.pad_char
                      ? '0' === s.pad_char
                        ? '0'
                        : s.pad_char.charAt(1)
                      : ' '),
                    (c = s.width - (f + n).length),
                    (l = s.width && c > 0 ? u.repeat(c) : ''),
                    (m += s.align
                      ? f + n + l
                      : '0' === u
                      ? f + l + n
                      : l + f + n));
              }
            return m;
          })(
            (function(e) {
              if (s[e]) return s[e];
              var t,
                n = e,
                r = [],
                o = 0;
              for (; n; ) {
                if (null !== (t = i.text.exec(n))) r.push(t[0]);
                else if (null !== (t = i.modulo.exec(n))) r.push('%');
                else {
                  if (null === (t = i.placeholder.exec(n)))
                    throw new SyntaxError('[sprintf] unexpected placeholder');
                  if (t[2]) {
                    o |= 1;
                    var a = [],
                      l = t[2],
                      u = [];
                    if (null === (u = i.key.exec(l)))
                      throw new SyntaxError(
                        '[sprintf] failed to parse named argument key'
                      );
                    for (a.push(u[1]); '' !== (l = l.substring(u[0].length)); )
                      if (null !== (u = i.key_access.exec(l))) a.push(u[1]);
                      else {
                        if (null === (u = i.index_access.exec(l)))
                          throw new SyntaxError(
                            '[sprintf] failed to parse named argument key'
                          );
                        a.push(u[1]);
                      }
                    t[2] = a;
                  } else o |= 2;
                  if (3 === o)
                    throw new Error(
                      '[sprintf] mixing positional and named placeholders is not (yet) supported'
                    );
                  r.push({
                    placeholder: t[0],
                    param_no: t[1],
                    keys: t[2],
                    sign: t[3],
                    pad_char: t[4],
                    align: t[5],
                    width: t[6],
                    precision: t[7],
                    type: t[8]
                  });
                }
                n = n.substring(t[0].length);
              }
              return (s[e] = r);
            })(e),
            arguments
          );
        }
        function a(e, t) {
          return o.apply(null, [e].concat(t || []));
        }
        var s = Object.create(null);
        (t.sprintf = o),
          (t.vsprintf = a),
          'undefined' != typeof window &&
            ((window.sprintf = o),
            (window.vsprintf = a),
            void 0 ===
              (r = function() {
                return { sprintf: o, vsprintf: a };
              }.call(t, n, t, e)) || (e.exports = r));
      })();
    },
    '63NL': function(e, t, n) {
      'use strict';
      e.exports = function(e, t) {
        for (var n = {}, r = 0; r < e.length; ++r)
          for (
            var i = e[r].name, o = i.split('.'), a = n, s = 0;
            s < o.length;
            ++s
          ) {
            var l = o[s].split('[');
            if (l.length > 1) {
              l[0] in a || (a[l[0]] = []), (a = a[l[0]]);
              for (var u = 1; u < l.length; ++u) {
                var c = parseInt(l[u]);
                u < l.length - 1 || s < o.length - 1
                  ? (c in a || (u < l.length - 1 ? (a[c] = []) : (a[c] = {})),
                    (a = a[c]))
                  : (a[c] = t ? r : e[r].type);
              }
            } else
              s < o.length - 1
                ? (l[0] in a || (a[l[0]] = {}), (a = a[l[0]]))
                : (a[l[0]] = t ? r : e[r].type);
          }
        return n;
      };
    },
    '6ozI': function(e, t, n) {
      'use strict';
      var r = n('XpGV'),
        i = n('VADU'),
        o = n('LxBP'),
        a = n('I14Z'),
        s = function(e, t, n) {
          e.style.setProperty(t, n, e.style.getPropertyPriority(t));
        },
        l = function(e) {
          return e.filter(function(e) {
            return (
              e.type === window.CSSRule.STYLE_RULE &&
              (e.style.getPropertyValue('background-image') ||
                e.style.getPropertyValue('background'))
            );
          });
        },
        u = function(e) {
          var t = [];
          return (
            e.forEach(function(e) {
              e.style.getPropertyValue('background-image')
                ? t.push({
                    property: 'background-image',
                    value: e.style.getPropertyValue('background-image'),
                    rule: e
                  })
                : e.style.getPropertyValue('background') &&
                  t.push({
                    property: 'background',
                    value: e.style.getPropertyValue('background'),
                    rule: e
                  });
            }),
            t
          );
        },
        c = function(e) {
          return e.filter(function(e) {
            return (
              e.type === window.CSSRule.FONT_FACE_RULE &&
              e.style.getPropertyValue('src')
            );
          });
        },
        h = function(e) {
          return e.filter(function(e) {
            return e.type === window.CSSRule.IMPORT_RULE && e.href;
          });
        },
        f = function(e) {
          var t = [];
          return (
            e.forEach(function(e, n) {
              e.url && !r.isDataUri(e.url) && t.push(n);
            }),
            t
          );
        },
        p = function(e) {
          var t = [];
          return (
            e.forEach(function(e, n) {
              e.url && !r.isDataUri(e.url) && t.push(n);
            }),
            t
          );
        };
      t.adjustPathsOfCssResources = function(e, t) {
        var n = l(t),
          d = u(n),
          m = !1;
        return (
          d.forEach(function(t) {
            var n,
              i = o.parse(t.value),
              a = f(i);
            a.length > 0 &&
              (a.forEach(function(t) {
                var n = i[t].url,
                  o = r.joinUrl(e, n);
                i[t].url = o;
              }),
              (n = o.serialize(i)),
              s(t.rule, t.property, n),
              (m = !0));
          }),
          c(t).forEach(function(n) {
            var o,
              s,
              l = n.style.getPropertyValue('src');
            try {
              o = a.parse(l);
            } catch (e) {
              return;
            }
            (s = p(o)).length > 0 &&
              (s.forEach(function(t) {
                var n = o[t].url,
                  i = r.joinUrl(e, n);
                o[t].url = i;
              }),
              i.changeFontFaceRuleSrc(t, n, a.serialize(o)),
              (m = !0));
          }),
          h(t).forEach(function(n) {
            var o = n.href,
              a = r.joinUrl(e, o);
            i.exchangeRule(t, n, '@import url(' + a + ');'), (m = !0);
          }),
          m
        );
      };
      var d = function(e, t, n) {
        var r = e.indexOf(t);
        e.splice(r, 1),
          n.forEach(function(t, n) {
            e.splice(r + n, 0, t);
          });
      };
      t.loadCSSImportsForRules = function(e, n, o) {
        var a = h(e),
          s = [],
          l = !1;
        return Promise.all(
          a.map(function(a) {
            return (function(e, n, o, a) {
              var s,
                l = n.href;
              return (
                (l = i.unquoteString(l)),
                (s = r.joinUrl(a.baseUrl, l)),
                o.indexOf(s) >= 0
                  ? (d(e, n, []), Promise.resolve([]))
                  : (o.push(s),
                    r.ajax(l, a).then(
                      function(r) {
                        var s = i.rulesForCssText(r);
                        return t
                          .loadCSSImportsForRules(s, o, a)
                          .then(function(r) {
                            return (
                              t.adjustPathsOfCssResources(l, s),
                              d(e, n, s),
                              r.errors
                            );
                          });
                      },
                      function(e) {
                        throw {
                          resourceType: 'stylesheet',
                          url: e.url,
                          msg: 'Unable to load stylesheet ' + e.url
                        };
                      }
                    ))
              );
            })(e, a, n, o).then(
              function(e) {
                (s = s.concat(e)), (l = !0);
              },
              function(e) {
                s.push(e);
              }
            );
          })
        ).then(function() {
          return { hasChanges: l, errors: s };
        });
      };
      var m = function(e, t) {
          var n = l(e),
            i = u(n),
            a = [],
            c = !1;
          return Promise.all(
            i.map(function(e) {
              return (function(e, t) {
                var n = o.parse(e),
                  i = f(n),
                  a = !1;
                return r
                  .collectAndReportErrors(
                    i.map(function(e) {
                      var i = n[e].url;
                      return r.getDataURIForImageURL(i, t).then(
                        function(t) {
                          (n[e].url = t), (a = !0);
                        },
                        function(e) {
                          throw {
                            resourceType: 'backgroundImage',
                            url: e.url,
                            msg: 'Unable to load background-image ' + e.url
                          };
                        }
                      );
                    })
                  )
                  .then(function(e) {
                    return {
                      backgroundValue: o.serialize(n),
                      hasChanges: a,
                      errors: e
                    };
                  });
              })(e.value, t).then(function(t) {
                t.hasChanges &&
                  (s(e.rule, e.property, t.backgroundValue), (c = !0)),
                  (a = a.concat(t.errors));
              });
            })
          ).then(function() {
            return { hasChanges: c, errors: a };
          });
        },
        g = function(e, t) {
          var n = c(e),
            o = [],
            s = !1;
          return Promise.all(
            n.map(function(n) {
              return (function(e, t) {
                var n,
                  i,
                  o = !1;
                try {
                  n = a.parse(e);
                } catch (e) {
                  n = [];
                }
                return (
                  (i = p(n)),
                  r
                    .collectAndReportErrors(
                      i.map(function(e) {
                        var i = n[e],
                          a = i.format || 'woff';
                        return r.binaryAjax(i.url, t).then(
                          function(e) {
                            var t = btoa(e);
                            (i.url = 'data:font/' + a + ';base64,' + t),
                              (o = !0);
                          },
                          function(e) {
                            throw {
                              resourceType: 'fontFace',
                              url: e.url,
                              msg: 'Unable to load font-face ' + e.url
                            };
                          }
                        );
                      })
                    )
                    .then(function(e) {
                      return {
                        srcDeclarationValue: a.serialize(n),
                        hasChanges: o,
                        errors: e
                      };
                    })
                );
              })(n.style.getPropertyValue('src'), t).then(function(t) {
                t.hasChanges &&
                  (i.changeFontFaceRuleSrc(e, n, t.srcDeclarationValue),
                  (s = !0)),
                  (o = o.concat(t.errors));
              });
            })
          ).then(function() {
            return { hasChanges: s, errors: o };
          });
        };
      t.loadAndInlineCSSResourcesForRules = function(e, t) {
        var n = !1,
          r = [];
        return Promise.all(
          [m, g].map(function(i) {
            return i(e, t).then(function(e) {
              (n = n || e.hasChanges), (r = r.concat(e.errors));
            });
          })
        ).then(function() {
          return { hasChanges: n, errors: r };
        });
      };
    },
    '6v/u': function(e, t) {
      e.exports = function(e) {
        return atob(e);
      };
    },
    '9fJb': function(e, t, n) {
      var r = n('GTa7');
      e.exports = r
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
    AAS3: function(e, t, n) {
      var r = n('hYYf');
      e.exports = function(e, t) {
        var n = r(t),
          i = [];
        return (i = (i = i.concat(n(e))).concat(n(null)));
      };
    },
    AP2z: function(e, t, n) {
      var r = n('nmnc'),
        i = Object.prototype,
        o = i.hasOwnProperty,
        a = i.toString,
        s = r ? r.toStringTag : void 0;
      e.exports = function(e) {
        var t = o.call(e, s),
          n = e[s];
        try {
          e[s] = void 0;
          var r = !0;
        } catch (e) {}
        var i = a.call(e);
        return r && (t ? (e[s] = n) : delete e[s]), i;
      };
    },
    B9vp: function(e, t, n) {
      var r = n('4Z/T').sprintf,
        i = n('tCpK'),
        o = n('st01'),
        a = n('kR76');
      e.exports = function(e, t, n) {
        'use strict';
        var s = o(t) || 'of unknown name (see npm glsl-shader-name)',
          l = 'unknown type';
        void 0 !== n && (l = n === i.FRAGMENT_SHADER ? 'fragment' : 'vertex');
        for (
          var u = r('Error compiling %s shader %s:\n', l, s),
            c = r('%s%s', u, e),
            h = e.split('\n'),
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
        for (var g = a(t).split('\n'), p = 0; p < g.length; p++)
          if (f[p + 3] || f[p + 2] || f[p + 1]) {
            var v = g[p];
            if (((u += v + '\n'), f[p + 1])) {
              var _ = f[p + 1];
              (_ = _.substr(_.split(':', 3).join(':').length + 1).trim()),
                (u += r('^^^ %s\n\n', _));
            }
          }
        return { long: u.trim(), short: c.trim() };
      };
    },
    BEtg: function(e, t) {
      function n(e) {
        return (
          !!e.constructor &&
          'function' == typeof e.constructor.isBuffer &&
          e.constructor.isBuffer(e)
        );
      }
      /*!
       * Determine if an object is a Buffer
       *
       * @author   Feross Aboukhadijeh <https://feross.org>
       * @license  MIT
       */
      e.exports = function(e) {
        return (
          null != e &&
          (n(e) ||
            (function(e) {
              return (
                'function' == typeof e.readFloatLE &&
                'function' == typeof e.slice &&
                n(e.slice(0, 0))
              );
            })(e) ||
            !!e._isBuffer)
        );
      };
    },
    BkhO: function(e, t, n) {
      var r = n('Xs3h');
      (r = r.slice().filter(function(e) {
        return !/^(gl\_|texture)/.test(e);
      })),
        (e.exports = r.concat([
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
    C1EJ: function(e, t, n) {
      'use strict';
      (function(e) {
        var t = n('p46w'),
          r = n.n(t);
        e(document).ready(function() {
          r()('eu_cookie') || e('#cookies').fadeIn('fast'),
            e('#cookies').on('click', '.c-cookies__close', function() {
              return (
                r()('eu_cookie', 1, { expires: 365, path: '/' }),
                e('#cookies').fadeOut('fast'),
                !1
              );
            });
        });
      }.call(this, n('EVdn')));
    },
    CxY0: function(e, t, n) {
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
      (t.parse = y),
        (t.resolve = function(e, t) {
          return y(e, !1, !0).resolve(t);
        }),
        (t.resolveObject = function(e, t) {
          return e ? y(e, !1, !0).resolveObject(t) : t;
        }),
        (t.format = function(e) {
          i.isString(e) && (e = y(e));
          return e instanceof o ? e.format() : o.prototype.format.call(e);
        }),
        (t.Url = o);
      var a = /^([a-z0-9.+-]+:)/i,
        s = /:[0-9]*$/,
        l = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
        u = ['{', '}', '|', '\\', '^', '`'].concat([
          '<',
          '>',
          '"',
          '`',
          ' ',
          '\r',
          '\n',
          '\t'
        ]),
        c = ["'"].concat(u),
        h = ['%', '/', '?', ';', '#'].concat(c),
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
      function y(e, t, n) {
        if (e && i.isObject(e) && e instanceof o) return e;
        var r = new o();
        return r.parse(e, t, n), r;
      }
      (o.prototype.parse = function(e, t, n) {
        if (!i.isString(e))
          throw new TypeError(
            "Parameter 'url' must be a string, not " + typeof e
          );
        var o = e.indexOf('?'),
          s = -1 !== o && o < e.indexOf('#') ? '?' : '#',
          u = e.split(s);
        u[0] = u[0].replace(/\\/g, '/');
        var y = (e = u.join(s));
        if (((y = y.trim()), !n && 1 === e.split('#').length)) {
          var T = l.exec(y);
          if (T)
            return (
              (this.path = y),
              (this.href = y),
              (this.pathname = T[1]),
              T[2]
                ? ((this.search = T[2]),
                  (this.query = t
                    ? _.parse(this.search.substr(1))
                    : this.search.substr(1)))
                : t && ((this.search = ''), (this.query = {})),
              this
            );
        }
        var b = a.exec(y);
        if (b) {
          var x = (b = b[0]).toLowerCase();
          (this.protocol = x), (y = y.substr(b.length));
        }
        if (n || b || y.match(/^\/\/[^@\/]+@[^@\/]+/)) {
          var w = '//' === y.substr(0, 2);
          !w || (b && g[b]) || ((y = y.substr(2)), (this.slashes = !0));
        }
        if (!g[b] && (w || (b && !v[b]))) {
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
          for (P = 0, M = c.length; P < M; P++) {
            var j = c[P];
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
              t && (this.query = _.parse(this.query)),
              (y = y.slice(0, q)))
            : t && ((this.search = ''), (this.query = {})),
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
          var e = this.auth || '';
          e &&
            ((e = (e = encodeURIComponent(e)).replace(/%3A/i, ':')),
            (e += '@'));
          var t = this.protocol || '',
            n = this.pathname || '',
            r = this.hash || '',
            o = !1,
            a = '';
          this.host
            ? (o = e + this.host)
            : this.hostname &&
              ((o =
                e +
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
            t && ':' !== t.substr(-1) && (t += ':'),
            this.slashes || ((!t || v[t]) && !1 !== o)
              ? ((o = '//' + (o || '')),
                n && '/' !== n.charAt(0) && (n = '/' + n))
              : o || (o = ''),
            r && '#' !== r.charAt(0) && (r = '#' + r),
            s && '?' !== s.charAt(0) && (s = '?' + s),
            t +
              o +
              (n = n.replace(/[?#]/g, function(e) {
                return encodeURIComponent(e);
              })) +
              (s = s.replace('#', '%23')) +
              r
          );
        }),
        (o.prototype.resolve = function(e) {
          return this.resolveObject(y(e, !1, !0)).format();
        }),
        (o.prototype.resolveObject = function(e) {
          if (i.isString(e)) {
            var t = new o();
            t.parse(e, !1, !0), (e = t);
          }
          for (
            var n = new o(), r = Object.keys(this), a = 0;
            a < r.length;
            a++
          ) {
            var s = r[a];
            n[s] = this[s];
          }
          if (((n.hash = e.hash), '' === e.href))
            return (n.href = n.format()), n;
          if (e.slashes && !e.protocol) {
            for (var l = Object.keys(e), u = 0; u < l.length; u++) {
              var c = l[u];
              'protocol' !== c && (n[c] = e[c]);
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
          if (e.protocol && e.protocol !== n.protocol) {
            if (!v[e.protocol]) {
              for (var h = Object.keys(e), f = 0; f < h.length; f++) {
                var p = h[f];
                n[p] = e[p];
              }
              return (n.href = n.format()), n;
            }
            if (((n.protocol = e.protocol), e.host || g[e.protocol]))
              n.pathname = e.pathname;
            else {
              for (
                var d = (e.pathname || '').split('/');
                d.length && !(e.host = d.shift());

              );
              e.host || (e.host = ''),
                e.hostname || (e.hostname = ''),
                '' !== d[0] && d.unshift(''),
                d.length < 2 && d.unshift(''),
                (n.pathname = d.join('/'));
            }
            if (
              ((n.search = e.search),
              (n.query = e.query),
              (n.host = e.host || ''),
              (n.auth = e.auth),
              (n.hostname = e.hostname || e.host),
              (n.port = e.port),
              n.pathname || n.search)
            ) {
              var m = n.pathname || '',
                _ = n.search || '';
              n.path = m + _;
            }
            return (
              (n.slashes = n.slashes || e.slashes), (n.href = n.format()), n
            );
          }
          var y = n.pathname && '/' === n.pathname.charAt(0),
            T = e.host || (e.pathname && '/' === e.pathname.charAt(0)),
            b = T || y || (n.host && e.pathname),
            x = b,
            w = (n.pathname && n.pathname.split('/')) || [],
            E =
              ((d = (e.pathname && e.pathname.split('/')) || []),
              n.protocol && !v[n.protocol]);
          if (
            (E &&
              ((n.hostname = ''),
              (n.port = null),
              n.host && ('' === w[0] ? (w[0] = n.host) : w.unshift(n.host)),
              (n.host = ''),
              e.protocol &&
                ((e.hostname = null),
                (e.port = null),
                e.host && ('' === d[0] ? (d[0] = e.host) : d.unshift(e.host)),
                (e.host = null)),
              (b = b && ('' === d[0] || '' === w[0]))),
            T)
          )
            (n.host = e.host || '' === e.host ? e.host : n.host),
              (n.hostname =
                e.hostname || '' === e.hostname ? e.hostname : n.hostname),
              (n.search = e.search),
              (n.query = e.query),
              (w = d);
          else if (d.length)
            w || (w = []),
              w.pop(),
              (w = w.concat(d)),
              (n.search = e.search),
              (n.query = e.query);
          else if (!i.isNullOrUndefined(e.search)) {
            if (E)
              (n.hostname = n.host = w.shift()),
                (I =
                  !!(n.host && n.host.indexOf('@') > 0) && n.host.split('@')) &&
                  ((n.auth = I.shift()), (n.host = n.hostname = I.shift()));
            return (
              (n.search = e.search),
              (n.query = e.query),
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
                ((n.host || e.host || w.length > 1) &&
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
          if (!b && !x) for (; P--; P) w.unshift('..');
          !b ||
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
            (b = b || (n.host && w.length)) && !S && w.unshift(''),
            w.length
              ? (n.pathname = w.join('/'))
              : ((n.pathname = null), (n.path = null)),
            (i.isNull(n.pathname) && i.isNull(n.search)) ||
              (n.path =
                (n.pathname ? n.pathname : '') + (n.search ? n.search : '')),
            (n.auth = e.auth || n.auth),
            (n.slashes = n.slashes || e.slashes),
            (n.href = n.format()),
            n
          );
        }),
        (o.prototype.parseHost = function() {
          var e = this.host,
            t = s.exec(e);
          t &&
            (':' !== (t = t[0]) && (this.port = t.substr(1)),
            (e = e.substr(0, e.length - t.length))),
            e && (this.hostname = e);
        });
    },
    DzJC: function(e, t, n) {
      var r = n('sEfC'),
        i = n('GoyQ'),
        o = 'Expected a function';
      e.exports = function(e, t, n) {
        var a = !0,
          s = !0;
        if ('function' != typeof e) throw new TypeError(o);
        return (
          i(n) &&
            ((a = 'leading' in n ? !!n.leading : a),
            (s = 'trailing' in n ? !!n.trailing : s)),
          r(e, t, { leading: a, maxWait: t, trailing: s })
        );
      };
    },
    ExA7: function(e, t) {
      e.exports = function(e) {
        return null != e && 'object' == typeof e;
      };
    },
    F16p: function(e, t, n) {
      'use strict';
      e.exports = function(e, t, n) {
        return 0 === e.length
          ? e
          : t
          ? (n || e.sort(t),
            (function(e, t) {
              for (
                var n = 1, r = e.length, i = e[0], o = e[0], a = 1;
                a < r;
                ++a
              )
                if (((o = i), t((i = e[a]), o))) {
                  if (a === n) {
                    n++;
                    continue;
                  }
                  e[n++] = i;
                }
              return (e.length = n), e;
            })(e, t))
          : (n || e.sort(),
            (function(e) {
              for (
                var t = 1, n = e.length, r = e[0], i = e[0], o = 1;
                o < n;
                ++o, i = r
              )
                if (((i = r), (r = e[o]) !== i)) {
                  if (o === t) {
                    t++;
                    continue;
                  }
                  e[t++] = r;
                }
              return (e.length = t), e;
            })(e));
      };
    },
    GTa7: function(e, t) {
      e.exports = [
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
    GoyQ: function(e, t) {
      e.exports = function(e) {
        var t = typeof e;
        return null != e && ('object' == t || 'function' == t);
      };
    },
    H7XF: function(e, t, n) {
      'use strict';
      (t.byteLength = function(e) {
        var t = u(e),
          n = t[0],
          r = t[1];
        return (3 * (n + r)) / 4 - r;
      }),
        (t.toByteArray = function(e) {
          for (
            var t,
              n = u(e),
              r = n[0],
              a = n[1],
              s = new o(
                (function(e, t, n) {
                  return (3 * (t + n)) / 4 - n;
                })(0, r, a)
              ),
              l = 0,
              c = a > 0 ? r - 4 : r,
              h = 0;
            h < c;
            h += 4
          )
            (t =
              (i[e.charCodeAt(h)] << 18) |
              (i[e.charCodeAt(h + 1)] << 12) |
              (i[e.charCodeAt(h + 2)] << 6) |
              i[e.charCodeAt(h + 3)]),
              (s[l++] = (t >> 16) & 255),
              (s[l++] = (t >> 8) & 255),
              (s[l++] = 255 & t);
          2 === a &&
            ((t = (i[e.charCodeAt(h)] << 2) | (i[e.charCodeAt(h + 1)] >> 4)),
            (s[l++] = 255 & t));
          1 === a &&
            ((t =
              (i[e.charCodeAt(h)] << 10) |
              (i[e.charCodeAt(h + 1)] << 4) |
              (i[e.charCodeAt(h + 2)] >> 2)),
            (s[l++] = (t >> 8) & 255),
            (s[l++] = 255 & t));
          return s;
        }),
        (t.fromByteArray = function(e) {
          for (
            var t, n = e.length, i = n % 3, o = [], a = 0, s = n - i;
            a < s;
            a += 16383
          )
            o.push(c(e, a, a + 16383 > s ? s : a + 16383));
          1 === i
            ? ((t = e[n - 1]), o.push(r[t >> 2] + r[(t << 4) & 63] + '=='))
            : 2 === i &&
              ((t = (e[n - 2] << 8) + e[n - 1]),
              o.push(r[t >> 10] + r[(t >> 4) & 63] + r[(t << 2) & 63] + '='));
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
      function u(e) {
        var t = e.length;
        if (t % 4 > 0)
          throw new Error('Invalid string. Length must be a multiple of 4');
        var n = e.indexOf('=');
        return -1 === n && (n = t), [n, n === t ? 0 : 4 - (n % 4)];
      }
      function c(e, t, n) {
        for (var i, o, a = [], s = t; s < n; s += 3)
          (i =
            ((e[s] << 16) & 16711680) +
            ((e[s + 1] << 8) & 65280) +
            (255 & e[s + 2])),
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
    HVtM: function(e, t, n) {
      'use strict';
      var r = n('tbvF'),
        i = n('Ytbt'),
        o = n('zqV6');
      e.exports = function(e) {
        if (arguments.length <= 1)
          throw new Error(
            'gl-texture2d: Missing arguments for texture2d constructor'
          );
        a ||
          (function(e) {
            (a = [
              e.LINEAR,
              e.NEAREST_MIPMAP_LINEAR,
              e.LINEAR_MIPMAP_NEAREST,
              e.LINEAR_MIPMAP_NEAREST
            ]),
              (s = [
                e.NEAREST,
                e.LINEAR,
                e.NEAREST_MIPMAP_NEAREST,
                e.NEAREST_MIPMAP_LINEAR,
                e.LINEAR_MIPMAP_NEAREST,
                e.LINEAR_MIPMAP_LINEAR
              ]),
              (l = [e.REPEAT, e.CLAMP_TO_EDGE, e.MIRRORED_REPEAT]);
          })(e);
        if ('number' == typeof arguments[1])
          return g(
            e,
            arguments[1],
            arguments[2],
            arguments[3] || e.RGBA,
            arguments[4] || e.UNSIGNED_BYTE
          );
        if (Array.isArray(arguments[1]))
          return g(
            e,
            0 | arguments[1][0],
            0 | arguments[1][1],
            arguments[2] || e.RGBA,
            arguments[3] || e.UNSIGNED_BYTE
          );
        if ('object' == typeof arguments[1]) {
          var t = arguments[1],
            n = u(t) ? t : t.raw;
          if (n)
            return (function(e, t, n, r, i, o) {
              var a = m(e);
              return (
                e.texImage2D(e.TEXTURE_2D, 0, i, i, o, t),
                new f(e, a, n, r, i, o)
              );
            })(
              e,
              n,
              0 | t.width,
              0 | t.height,
              arguments[2] || e.RGBA,
              arguments[3] || e.UNSIGNED_BYTE
            );
          if (t.shape && t.data && t.stride)
            return (function(e, t) {
              var n = t.dtype,
                a = t.shape.slice(),
                s = e.getParameter(e.MAX_TEXTURE_SIZE);
              if (a[0] < 0 || a[0] > s || a[1] < 0 || a[1] > s)
                throw new Error('gl-texture2d: Invalid texture size');
              var l = d(a, t.stride.slice()),
                u = 0;
              'float32' === n
                ? (u = e.FLOAT)
                : 'float64' === n
                ? ((u = e.FLOAT), (l = !1), (n = 'float32'))
                : 'uint8' === n
                ? (u = e.UNSIGNED_BYTE)
                : ((u = e.UNSIGNED_BYTE), (l = !1), (n = 'uint8'));
              var h,
                p,
                g = 0;
              if (2 === a.length)
                (g = e.LUMINANCE),
                  (a = [a[0], a[1], 1]),
                  (t = r(t.data, a, [t.stride[0], t.stride[1], 1], t.offset));
              else {
                if (3 !== a.length)
                  throw new Error('gl-texture2d: Invalid shape for texture');
                if (1 === a[2]) g = e.ALPHA;
                else if (2 === a[2]) g = e.LUMINANCE_ALPHA;
                else if (3 === a[2]) g = e.RGB;
                else {
                  if (4 !== a[2])
                    throw new Error(
                      'gl-texture2d: Invalid shape for pixel coords'
                    );
                  g = e.RGBA;
                }
              }
              u !== e.FLOAT ||
                e.getExtension('OES_texture_float') ||
                ((u = e.UNSIGNED_BYTE), (l = !1));
              var v = t.size;
              if (l)
                h =
                  0 === t.offset && t.data.length === v
                    ? t.data
                    : t.data.subarray(t.offset, t.offset + v);
              else {
                var _ = [a[2], a[2] * a[0], 1];
                p = o.malloc(v, n);
                var y = r(p, a, _, 0);
                ('float32' !== n && 'float64' !== n) || u !== e.UNSIGNED_BYTE
                  ? i.assign(y, t)
                  : c(y, t),
                  (h = p.subarray(0, v));
              }
              var T = m(e);
              e.texImage2D(e.TEXTURE_2D, 0, g, a[0], a[1], 0, g, u, h),
                l || o.free(p);
              return new f(e, T, a[0], a[1], g, u);
            })(e, t);
        }
        throw new Error(
          'gl-texture2d: Invalid arguments for texture2d constructor'
        );
      };
      var a = null,
        s = null,
        l = null;
      function u(e) {
        return (
          ('undefined' != typeof HTMLCanvasElement &&
            e instanceof HTMLCanvasElement) ||
          ('undefined' != typeof HTMLImageElement &&
            e instanceof HTMLImageElement) ||
          ('undefined' != typeof HTMLVideoElement &&
            e instanceof HTMLVideoElement) ||
          ('undefined' != typeof ImageData && e instanceof ImageData)
        );
      }
      var c = function(e, t) {
        i.muls(e, t, 255);
      };
      function h(e, t, n) {
        var r = e.gl,
          i = r.getParameter(r.MAX_TEXTURE_SIZE);
        if (t < 0 || t > i || n < 0 || n > i)
          throw new Error('gl-texture2d: Invalid texture size');
        return (
          (e._shape = [t, n]),
          e.bind(),
          r.texImage2D(
            r.TEXTURE_2D,
            0,
            e.format,
            t,
            n,
            0,
            e.format,
            e.type,
            null
          ),
          (e._mipLevels = [0]),
          e
        );
      }
      function f(e, t, n, r, i, o) {
        (this.gl = e),
          (this.handle = t),
          (this.format = i),
          (this.type = o),
          (this._shape = [n, r]),
          (this._mipLevels = [0]),
          (this._magFilter = e.NEAREST),
          (this._minFilter = e.NEAREST),
          (this._wrapS = e.CLAMP_TO_EDGE),
          (this._wrapT = e.CLAMP_TO_EDGE),
          (this._anisoSamples = 1);
        var a = this,
          s = [this._wrapS, this._wrapT];
        Object.defineProperties(s, [
          {
            get: function() {
              return a._wrapS;
            },
            set: function(e) {
              return (a.wrapS = e);
            }
          },
          {
            get: function() {
              return a._wrapT;
            },
            set: function(e) {
              return (a.wrapT = e);
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
            set: function(e) {
              return (a.width = e);
            }
          },
          {
            get: function() {
              return a._shape[1];
            },
            set: function(e) {
              return (a.height = e);
            }
          }
        ]),
          (this._shapeVector = l);
      }
      var p = f.prototype;
      function d(e, t) {
        return 3 === e.length
          ? 1 === t[2] && t[1] === e[0] * e[2] && t[0] === e[2]
          : 1 === t[0] && t[1] === e[0];
      }
      function m(e) {
        var t = e.createTexture();
        return (
          e.bindTexture(e.TEXTURE_2D, t),
          e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.NEAREST),
          e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.NEAREST),
          e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE),
          e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE),
          t
        );
      }
      function g(e, t, n, r, i) {
        var o = e.getParameter(e.MAX_TEXTURE_SIZE);
        if (t < 0 || t > o || n < 0 || n > o)
          throw new Error('gl-texture2d: Invalid texture shape');
        if (i === e.FLOAT && !e.getExtension('OES_texture_float'))
          throw new Error(
            'gl-texture2d: Floating point textures not supported on this platform'
          );
        var a = m(e);
        return (
          e.texImage2D(e.TEXTURE_2D, 0, r, t, n, 0, r, i, null),
          new f(e, a, t, n, r, i)
        );
      }
      Object.defineProperties(p, {
        minFilter: {
          get: function() {
            return this._minFilter;
          },
          set: function(e) {
            this.bind();
            var t = this.gl;
            if (
              (this.type === t.FLOAT &&
                a.indexOf(e) >= 0 &&
                (t.getExtension('OES_texture_float_linear') || (e = t.NEAREST)),
              s.indexOf(e) < 0)
            )
              throw new Error('gl-texture2d: Unknown filter mode ' + e);
            return (
              t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, e),
              (this._minFilter = e)
            );
          }
        },
        magFilter: {
          get: function() {
            return this._magFilter;
          },
          set: function(e) {
            this.bind();
            var t = this.gl;
            if (
              (this.type === t.FLOAT &&
                a.indexOf(e) >= 0 &&
                (t.getExtension('OES_texture_float_linear') || (e = t.NEAREST)),
              s.indexOf(e) < 0)
            )
              throw new Error('gl-texture2d: Unknown filter mode ' + e);
            return (
              t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, e),
              (this._magFilter = e)
            );
          }
        },
        mipSamples: {
          get: function() {
            return this._anisoSamples;
          },
          set: function(e) {
            var t = this._anisoSamples;
            if (
              ((this._anisoSamples = 0 | Math.max(e, 1)),
              t !== this._anisoSamples)
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
          set: function(e) {
            if ((this.bind(), l.indexOf(e) < 0))
              throw new Error('gl-texture2d: Unknown wrap mode ' + e);
            return (
              this.gl.texParameteri(
                this.gl.TEXTURE_2D,
                this.gl.TEXTURE_WRAP_S,
                e
              ),
              (this._wrapS = e)
            );
          }
        },
        wrapT: {
          get: function() {
            return this._wrapT;
          },
          set: function(e) {
            if ((this.bind(), l.indexOf(e) < 0))
              throw new Error('gl-texture2d: Unknown wrap mode ' + e);
            return (
              this.gl.texParameteri(
                this.gl.TEXTURE_2D,
                this.gl.TEXTURE_WRAP_T,
                e
              ),
              (this._wrapT = e)
            );
          }
        },
        wrap: {
          get: function() {
            return this._wrapVector;
          },
          set: function(e) {
            if ((Array.isArray(e) || (e = [e, e]), 2 !== e.length))
              throw new Error(
                'gl-texture2d: Must specify wrap mode for rows and columns'
              );
            for (var t = 0; t < 2; ++t)
              if (l.indexOf(e[t]) < 0)
                throw new Error('gl-texture2d: Unknown wrap mode ' + e);
            (this._wrapS = e[0]), (this._wrapT = e[1]);
            var n = this.gl;
            return (
              this.bind(),
              n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_S, this._wrapS),
              n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_T, this._wrapT),
              e
            );
          }
        },
        shape: {
          get: function() {
            return this._shapeVector;
          },
          set: function(e) {
            if (Array.isArray(e)) {
              if (2 !== e.length)
                throw new Error('gl-texture2d: Invalid texture shape');
            } else e = [0 | e, 0 | e];
            return h(this, 0 | e[0], 0 | e[1]), [0 | e[0], 0 | e[1]];
          }
        },
        width: {
          get: function() {
            return this._shape[0];
          },
          set: function(e) {
            return h(this, (e |= 0), this._shape[1]), e;
          }
        },
        height: {
          get: function() {
            return this._shape[1];
          },
          set: function(e) {
            return (e |= 0), h(this, this._shape[0], e), e;
          }
        }
      }),
        (p.bind = function(e) {
          var t = this.gl;
          return (
            void 0 !== e && t.activeTexture(t.TEXTURE0 + (0 | e)),
            t.bindTexture(t.TEXTURE_2D, this.handle),
            void 0 !== e ? 0 | e : t.getParameter(t.ACTIVE_TEXTURE) - t.TEXTURE0
          );
        }),
        (p.dispose = function() {
          this.gl.deleteTexture(this.handle);
        }),
        (p.generateMipmap = function() {
          this.bind(), this.gl.generateMipmap(this.gl.TEXTURE_2D);
          for (
            var e = Math.min(this._shape[0], this._shape[1]), t = 0;
            e > 0;
            ++t, e >>>= 1
          )
            this._mipLevels.indexOf(t) < 0 && this._mipLevels.push(t);
        }),
        (p.setPixels = function(e, t, n, a) {
          var s = this.gl;
          this.bind(),
            Array.isArray(t)
              ? ((a = n), (n = 0 | t[1]), (t = 0 | t[0]))
              : ((t = t || 0), (n = n || 0)),
            (a = a || 0);
          var l = u(e) ? e : e.raw;
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
                  t,
                  n,
                  this.format,
                  this.type,
                  l
                );
          } else {
            if (!(e.shape && e.stride && e.data))
              throw new Error('gl-texture2d: Unsupported data type');
            if (
              e.shape.length < 2 ||
              t + e.shape[1] > this._shape[1] >>> a ||
              n + e.shape[0] > this._shape[0] >>> a ||
              t < 0 ||
              n < 0
            )
              throw new Error(
                'gl-texture2d: Texture dimensions are out of bounds'
              );
            !(function(e, t, n, a, s, l, u, h) {
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
                ? (m = e.FLOAT)
                : 'float64' === f
                ? ((m = e.FLOAT), (v = !1), (f = 'float32'))
                : 'uint8' === f
                ? (m = e.UNSIGNED_BYTE)
                : ((m = e.UNSIGNED_BYTE), (v = !1), (f = 'uint8'));
              if (2 === p.length)
                (g = e.LUMINANCE),
                  (p = [p[0], p[1], 1]),
                  (h = r(h.data, p, [h.stride[0], h.stride[1], 1], h.offset));
              else {
                if (3 !== p.length)
                  throw new Error('gl-texture2d: Invalid shape for texture');
                if (1 === p[2]) g = e.ALPHA;
                else if (2 === p[2]) g = e.LUMINANCE_ALPHA;
                else if (3 === p[2]) g = e.RGB;
                else {
                  if (4 !== p[2])
                    throw new Error(
                      'gl-texture2d: Invalid shape for pixel coords'
                    );
                  g = e.RGBA;
                }
                p[2];
              }
              (g !== e.LUMINANCE && g !== e.ALPHA) ||
                (s !== e.LUMINANCE && s !== e.ALPHA) ||
                (g = s);
              if (g !== s)
                throw new Error(
                  'gl-texture2d: Incompatible texture format for setPixels'
                );
              var _ = h.size,
                y = u.indexOf(a) < 0;
              y && u.push(a);
              if (m === l && v)
                0 === h.offset && h.data.length === _
                  ? y
                    ? e.texImage2D(
                        e.TEXTURE_2D,
                        a,
                        s,
                        p[0],
                        p[1],
                        0,
                        s,
                        l,
                        h.data
                      )
                    : e.texSubImage2D(
                        e.TEXTURE_2D,
                        a,
                        t,
                        n,
                        p[0],
                        p[1],
                        s,
                        l,
                        h.data
                      )
                  : y
                  ? e.texImage2D(
                      e.TEXTURE_2D,
                      a,
                      s,
                      p[0],
                      p[1],
                      0,
                      s,
                      l,
                      h.data.subarray(h.offset, h.offset + _)
                    )
                  : e.texSubImage2D(
                      e.TEXTURE_2D,
                      a,
                      t,
                      n,
                      p[0],
                      p[1],
                      s,
                      l,
                      h.data.subarray(h.offset, h.offset + _)
                    );
              else {
                var T;
                T = l === e.FLOAT ? o.mallocFloat32(_) : o.mallocUint8(_);
                var b = r(T, p, [p[2], p[2] * p[0], 1]);
                m === e.FLOAT && l === e.UNSIGNED_BYTE
                  ? c(b, h)
                  : i.assign(b, h),
                  y
                    ? e.texImage2D(
                        e.TEXTURE_2D,
                        a,
                        s,
                        p[0],
                        p[1],
                        0,
                        s,
                        l,
                        T.subarray(0, _)
                      )
                    : e.texSubImage2D(
                        e.TEXTURE_2D,
                        a,
                        t,
                        n,
                        p[0],
                        p[1],
                        s,
                        l,
                        T.subarray(0, _)
                      ),
                  l === e.FLOAT ? o.freeFloat32(T) : o.freeUint8(T);
              }
            })(s, t, n, a, this.format, this.type, this._mipLevels, e);
          }
        });
    },
    I14Z: function(e, t, n) {
      var r;
      e.exports = (function e(t, n, i) {
        function o(s, l) {
          if (!n[s]) {
            if (!t[s]) {
              var u = 'function' == typeof r && r;
              if (!l && u) return r(s, !0);
              if (a) return a(s, !0);
              var c = new Error("Cannot find module '" + s + "'");
              throw ((c.code = 'MODULE_NOT_FOUND'), c);
            }
            var h = (n[s] = { exports: {} });
            t[s][0].call(
              h.exports,
              function(e) {
                var n = t[s][1][e];
                return o(n || e);
              },
              h,
              h.exports,
              e,
              t,
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
            function(e, t, n) {
              'use strict';
              function r(e, t, n, i) {
                (this.message = e),
                  (this.expected = t),
                  (this.found = n),
                  (this.location = i),
                  (this.name = 'SyntaxError'),
                  'function' == typeof Error.captureStackTrace &&
                    Error.captureStackTrace(this, r);
              }
              !(function(e, t) {
                function n() {
                  this.constructor = e;
                }
                (n.prototype = t.prototype), (e.prototype = new n());
              })(r, Error),
                (r.buildMessage = function(e, t) {
                  var n = {
                    literal: function(e) {
                      return '"' + i(e.text) + '"';
                    },
                    class: function(e) {
                      var t,
                        n = '';
                      for (t = 0; t < e.parts.length; t++)
                        n +=
                          e.parts[t] instanceof Array
                            ? o(e.parts[t][0]) + '-' + o(e.parts[t][1])
                            : o(e.parts[t]);
                      return '[' + (e.inverted ? '^' : '') + n + ']';
                    },
                    any: function(e) {
                      return 'any character';
                    },
                    end: function(e) {
                      return 'end of input';
                    },
                    other: function(e) {
                      return e.description;
                    }
                  };
                  function r(e) {
                    return e
                      .charCodeAt(0)
                      .toString(16)
                      .toUpperCase();
                  }
                  function i(e) {
                    return e
                      .replace(/\\/g, '\\\\')
                      .replace(/"/g, '\\"')
                      .replace(/\0/g, '\\0')
                      .replace(/\t/g, '\\t')
                      .replace(/\n/g, '\\n')
                      .replace(/\r/g, '\\r')
                      .replace(/[\x00-\x0F]/g, function(e) {
                        return '\\x0' + r(e);
                      })
                      .replace(/[\x10-\x1F\x7F-\x9F]/g, function(e) {
                        return '\\x' + r(e);
                      });
                  }
                  function o(e) {
                    return e
                      .replace(/\\/g, '\\\\')
                      .replace(/\]/g, '\\]')
                      .replace(/\^/g, '\\^')
                      .replace(/-/g, '\\-')
                      .replace(/\0/g, '\\0')
                      .replace(/\t/g, '\\t')
                      .replace(/\n/g, '\\n')
                      .replace(/\r/g, '\\r')
                      .replace(/[\x00-\x0F]/g, function(e) {
                        return '\\x0' + r(e);
                      })
                      .replace(/[\x10-\x1F\x7F-\x9F]/g, function(e) {
                        return '\\x' + r(e);
                      });
                  }
                  return (
                    'Expected ' +
                    (function(e) {
                      var t,
                        r,
                        i,
                        o = new Array(e.length);
                      for (t = 0; t < e.length; t++)
                        o[t] = ((i = e[t]), n[i.type](i));
                      if ((o.sort(), o.length > 0)) {
                        for (t = 1, r = 1; t < o.length; t++)
                          o[t - 1] !== o[t] && ((o[r] = o[t]), r++);
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
                    })(e) +
                    ' but ' +
                    (function(e) {
                      return e ? '"' + i(e) + '"' : 'end of input';
                    })(t) +
                    ' found.'
                  );
                }),
                (t.exports = {
                  SyntaxError: r,
                  parse: function(t, n) {
                    n = void 0 !== n ? n : {};
                    var i,
                      o = {},
                      a = { start: V },
                      s = V,
                      l = '',
                      u = function() {
                        return [];
                      },
                      c = ',',
                      h = F(',', !1),
                      f = function(e, t) {
                        return [e].concat(t);
                      },
                      p = function(e) {
                        return [e];
                      },
                      d = function(e, t) {
                        return { url: e, format: t };
                      },
                      m = function(e) {
                        return { url: e };
                      },
                      g = 'url(',
                      v = F('url(', !1),
                      _ = ')',
                      y = F(')', !1),
                      T = function(e) {
                        return e;
                      },
                      b = 'format(',
                      x = F('format(', !1),
                      w = 'local(',
                      E = F('local(', !1),
                      A = function(e) {
                        return { local: e };
                      },
                      C = /^[^)]/,
                      P = L([')'], !0, !1),
                      R = function(e) {
                        return W.extractValue(e.join(''));
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
                    function F(e, t) {
                      return { type: 'literal', text: e, ignoreCase: t };
                    }
                    function L(e, t, n) {
                      return {
                        type: 'class',
                        parts: e,
                        inverted: t,
                        ignoreCase: n
                      };
                    }
                    function U(e) {
                      var n,
                        r = O[e];
                      if (r) return r;
                      for (n = e - 1; !O[n]; ) n--;
                      for (
                        r = { line: (r = O[n]).line, column: r.column };
                        n < e;

                      )
                        10 === t.charCodeAt(n)
                          ? (r.line++, (r.column = 1))
                          : r.column++,
                          n++;
                      return (O[e] = r), r;
                    }
                    function B(e, t) {
                      var n = U(e),
                        r = U(t);
                      return {
                        start: { offset: e, line: n.line, column: n.column },
                        end: { offset: t, line: r.line, column: r.column }
                      };
                    }
                    function z(e) {
                      M < k || (M > k && ((k = M), (N = [])), N.push(e));
                    }
                    function j(e, t, n) {
                      return new r(r.buildMessage(e, t), e, t, n);
                    }
                    function V() {
                      var e, n;
                      return (
                        (e = (function e() {
                          var n, r, i, a, s, l;
                          if (((n = M), (r = X()) !== o)) {
                            for (i = [], a = Y(); a !== o; )
                              i.push(a), (a = Y());
                            if (i !== o)
                              if (
                                (44 === t.charCodeAt(M)
                                  ? ((a = c), M++)
                                  : ((a = o), 0 === D && z(h)),
                                a !== o)
                              ) {
                                for (s = [], l = Y(); l !== o; )
                                  s.push(l), (l = Y());
                                s !== o && (l = e()) !== o
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
                          ((e = M), (n = l) !== o && (n = u()), (e = n)),
                        e
                      );
                    }
                    function X() {
                      var e;
                      return (
                        (e = q()) === o &&
                          (e = (function() {
                            var e, n, r, i;
                            return (
                              (e = M),
                              t.substr(M, 6) === w
                                ? ((n = w), (M += 6))
                                : ((n = o), 0 === D && z(E)),
                              n !== o && (r = G()) !== o
                                ? (41 === t.charCodeAt(M)
                                    ? ((i = _), M++)
                                    : ((i = o), 0 === D && z(y)),
                                  i !== o
                                    ? ((n = A(r)), (e = n))
                                    : ((M = e), (e = o)))
                                : ((M = e), (e = o)),
                              e
                            );
                          })()),
                        e
                      );
                    }
                    function q() {
                      var e, n, r, i;
                      if (((e = M), (n = H()) !== o)) {
                        if (((r = []), (i = Y()) !== o))
                          for (; i !== o; ) r.push(i), (i = Y());
                        else r = o;
                        r !== o &&
                        (i = (function() {
                          var e, n, r, i;
                          return (
                            (e = M),
                            t.substr(M, 7) === b
                              ? ((n = b), (M += 7))
                              : ((n = o), 0 === D && z(x)),
                            n !== o && (r = G()) !== o
                              ? (41 === t.charCodeAt(M)
                                  ? ((i = _), M++)
                                  : ((i = o), 0 === D && z(y)),
                                i !== o
                                  ? ((n = T(r)), (e = n))
                                  : ((M = e), (e = o)))
                              : ((M = e), (e = o)),
                            e
                          );
                        })()) !== o
                          ? ((n = d(n, i)), (e = n))
                          : ((M = e), (e = o));
                      } else (M = e), (e = o);
                      return (
                        e === o &&
                          ((e = M), (n = H()) !== o && (n = m(n)), (e = n)),
                        e
                      );
                    }
                    function H() {
                      var e, n, r, i;
                      return (
                        (e = M),
                        t.substr(M, 4) === g
                          ? ((n = g), (M += 4))
                          : ((n = o), 0 === D && z(v)),
                        n !== o && (r = G()) !== o
                          ? (41 === t.charCodeAt(M)
                              ? ((i = _), M++)
                              : ((i = o), 0 === D && z(y)),
                            i !== o
                              ? ((n = T(r)), (e = n))
                              : ((M = e), (e = o)))
                          : ((M = e), (e = o)),
                        e
                      );
                    }
                    function G() {
                      var e, n;
                      if (
                        ((e = []),
                        C.test(t.charAt(M))
                          ? ((n = t.charAt(M)), M++)
                          : ((n = o), 0 === D && z(P)),
                        n !== o)
                      )
                        for (; n !== o; )
                          e.push(n),
                            C.test(t.charAt(M))
                              ? ((n = t.charAt(M)), M++)
                              : ((n = o), 0 === D && z(P));
                      else e = o;
                      return e !== o && (e = R(e)), e;
                    }
                    function Y() {
                      var e;
                      return (
                        I.test(t.charAt(M))
                          ? ((e = t.charAt(M)), M++)
                          : ((e = o), 0 === D && z(S)),
                        e
                      );
                    }
                    var W = e('../util');
                    if ((i = s()) !== o && M === t.length) return i;
                    throw (i !== o && M < t.length && z({ type: 'end' }),
                    j(
                      N,
                      k < t.length ? t.charAt(k) : null,
                      k < t.length ? B(k, k + 1) : B(k, k)
                    ));
                  }
                });
            },
            { '../util': 3 }
          ],
          2: [
            function(e, t, n) {
              var r = e('./grammar');
              (n.SyntaxError = function(e, t) {
                (this.message = e), (this.offset = t);
              }),
                (n.parse = function(e) {
                  try {
                    return r.parse(e);
                  } catch (e) {
                    throw new n.SyntaxError(e.message, e.offset);
                  }
                }),
                (n.serialize = function(e) {
                  return e
                    .map(function(e) {
                      var t;
                      return (
                        e.url
                          ? ((t = 'url("' + e.url + '")'),
                            e.format && (t += ' format("' + e.format + '")'))
                          : (t = 'local("' + e.local + '")'),
                        t
                      );
                    })
                    .join(', ');
                });
            },
            { './grammar': 1 }
          ],
          3: [
            function(e, t, n) {
              n.extractValue = function(e) {
                return (
                  (t = (function(e) {
                    return e.replace(/^[\t\r\f\n ]*(.+?)[\t\r\f\n ]*$/, '$1');
                  })(e)),
                  (r = /^'(.*)'$/),
                  (n = /^"(.*)"$/).test(t)
                    ? t.replace(n, '$1')
                    : r.test(t)
                    ? t.replace(r, '$1')
                    : t
                );
                var t, n, r;
              };
            },
            {}
          ]
        },
        {},
        [2]
      )(2);
    },
    IDFI: function(e, t, n) {
      'use strict';
      e.exports = function(e) {
        for (var t = new Array(e), n = 0; n < e; ++n) t[n] = n;
        return t;
      };
    },
    IrQ8: function(e, t, n) {
      'use strict';
      (t.shader = function(e, t, n) {
        return c(e).getShaderReference(t, n);
      }),
        (t.program = function(e, t, n, r, i) {
          return c(e).getProgram(t, n, r, i);
        });
      var r = n('o/2B'),
        i = n('B9vp'),
        o = new ('undefined' == typeof WeakMap ? n('/MXg') : WeakMap)(),
        a = 0;
      function s(e, t, n, r, i, o, a) {
        (this.id = e),
          (this.src = t),
          (this.type = n),
          (this.shader = r),
          (this.count = o),
          (this.programs = []),
          (this.cache = a);
      }
      function l(e) {
        (this.gl = e), (this.shaders = [{}, {}]), (this.programs = {});
      }
      s.prototype.dispose = function() {
        if (0 == --this.count) {
          for (
            var e = this.cache,
              t = e.gl,
              n = this.programs,
              r = 0,
              i = n.length;
            r < i;
            ++r
          ) {
            var o = e.programs[n[r]];
            o && (delete e.programs[r], t.deleteProgram(o));
          }
          t.deleteShader(this.shader),
            delete e.shaders[(this.type === t.FRAGMENT_SHADER) | 0][this.src];
        }
      };
      var u = l.prototype;
      function c(e) {
        var t = o.get(e);
        return t || ((t = new l(e)), o.set(e, t)), t;
      }
      (u.getShaderReference = function(e, t) {
        var n = this.gl,
          o = this.shaders[(e === n.FRAGMENT_SHADER) | 0],
          l = o[t];
        if (l && n.isShader(l.shader)) l.count += 1;
        else {
          var u = (function(e, t, n) {
            var o = e.createShader(t);
            if (
              (e.shaderSource(o, n),
              e.compileShader(o),
              !e.getShaderParameter(o, e.COMPILE_STATUS))
            ) {
              var a = e.getShaderInfoLog(o);
              try {
                var s = i(a, n, t);
              } catch (e) {
                throw (console.warn('Failed to format compiler error: ' + e),
                new r(a, 'Error compiling shader:\n' + a));
              }
              throw new r(a, s.short, s.long);
            }
            return o;
          })(n, e, t);
          l = o[t] = new s(a++, t, e, u, [], 1, this);
        }
        return l;
      }),
        (u.getProgram = function(e, t, n, i) {
          var o = [e.id, t.id, n.join(':'), i.join(':')].join('@'),
            a = this.programs[o];
          return (
            (a && this.gl.isProgram(a)) ||
              ((this.programs[o] = a = (function(e, t, n, i, o) {
                var a = e.createProgram();
                e.attachShader(a, t), e.attachShader(a, n);
                for (var s = 0; s < i.length; ++s)
                  e.bindAttribLocation(a, o[s], i[s]);
                if (
                  (e.linkProgram(a), !e.getProgramParameter(a, e.LINK_STATUS))
                ) {
                  var l = e.getProgramInfoLog(a);
                  throw new r(l, 'Error linking program: ' + l);
                }
                return a;
              })(this.gl, e.shader, t.shader, n, i)),
              e.programs.push(o),
              t.programs.push(o)),
            a
          );
        });
    },
    IzUq: function(e, t) {
      var n = {}.toString;
      e.exports =
        Array.isArray ||
        function(e) {
          return '[object Array]' == n.call(e);
        };
    },
    Jbu2: function(e, t) {
      e.exports = [
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
    KN1S: function(e, t, n) {
      'use strict';
      var r = n('0GS4'),
        i = n('fpEm'),
        o = n('63NL'),
        a = n('IrQ8'),
        s = n('1BqX'),
        l = n('o/2B');
      function u(e) {
        (this.gl = e),
          (this.gl.lastAttribCount = 0),
          (this._vref = this._fref = this._relink = this.vertShader = this.fragShader = this.program = this.attributes = this.uniforms = this.types = null);
      }
      var c = u.prototype;
      function h(e, t) {
        return e.name < t.name ? -1 : 1;
      }
      (c.bind = function() {
        var e;
        this.program || this._relink();
        var t = this.gl.getProgramParameter(
            this.program,
            this.gl.ACTIVE_ATTRIBUTES
          ),
          n = this.gl.lastAttribCount;
        if (t > n) for (e = n; e < t; e++) this.gl.enableVertexAttribArray(e);
        else if (n > t)
          for (e = t; e < n; e++) this.gl.disableVertexAttribArray(e);
        (this.gl.lastAttribCount = t), this.gl.useProgram(this.program);
      }),
        (c.dispose = function() {
          for (var e = this.gl.lastAttribCount, t = 0; t < e; t++)
            this.gl.disableVertexAttribArray(t);
          (this.gl.lastAttribCount = 0),
            this._fref && this._fref.dispose(),
            this._vref && this._vref.dispose(),
            (this.attributes = this.types = this.vertShader = this.fragShader = this.program = this._relink = this._fref = this._vref = null);
        }),
        (c.update = function(e, t, n, u) {
          if (!t || 1 === arguments.length) {
            var c = e;
            (e = c.vertex),
              (t = c.fragment),
              (n = c.uniforms),
              (u = c.attributes);
          }
          var f = this,
            p = f.gl,
            d = f._vref;
          (f._vref = a.shader(p, p.VERTEX_SHADER, e)),
            d && d.dispose(),
            (f.vertShader = f._vref.shader);
          var m = this._fref;
          if (
            ((f._fref = a.shader(p, p.FRAGMENT_SHADER, t)),
            m && m.dispose(),
            (f.fragShader = f._fref.shader),
            !n || !u)
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
              (u = u || s.attributes(p, g)),
              p.deleteProgram(g);
          }
          (u = u.slice()).sort(h);
          var _,
            y = [],
            T = [],
            b = [];
          for (_ = 0; _ < u.length; ++_) {
            var x = u[_];
            if (x.type.indexOf('mat') >= 0) {
              for (
                var w = 0 | x.type.charAt(x.type.length - 1),
                  E = new Array(w),
                  A = 0;
                A < w;
                ++A
              )
                (E[A] = b.length),
                  T.push(x.name + '[' + A + ']'),
                  'number' == typeof x.location
                    ? b.push(x.location + A)
                    : Array.isArray(x.location) &&
                      x.location.length === w &&
                      'number' == typeof x.location[A]
                    ? b.push(0 | x.location[A])
                    : b.push(-1);
              y.push({ name: x.name, type: x.type, locations: E });
            } else
              y.push({ name: x.name, type: x.type, locations: [b.length] }),
                T.push(x.name),
                'number' == typeof x.location
                  ? b.push(0 | x.location)
                  : b.push(-1);
          }
          var C = 0;
          for (_ = 0; _ < b.length; ++_)
            if (b[_] < 0) {
              for (; b.indexOf(C) >= 0; ) C += 1;
              b[_] = C;
            }
          var P = new Array(n.length);
          function R() {
            f.program = a.program(p, f._vref, f._fref, T, b);
            for (var e = 0; e < n.length; ++e)
              P[e] = p.getUniformLocation(f.program, n[e].name);
          }
          R(),
            (f._relink = R),
            (f.types = { uniforms: o(n), attributes: o(u) }),
            (f.attributes = i(p, f, y, b)),
            Object.defineProperty(f, 'uniforms', r(p, f, n, P));
        }),
        (e.exports = function(e, t, n, r, i) {
          var o = new u(e);
          return o.update(t, n, r, i), o;
        });
    },
    KfNM: function(e, t) {
      var n = Object.prototype.toString;
      e.exports = function(e) {
        return n.call(e);
      };
    },
    Kgze: function(e, t, n) {
      'use strict';
      var r = [
          new RegExp(
            '^<h3[^>]*>This page contains the following errors:</h3><div[^>]*>(.+?)\n?</div>'
          ),
          new RegExp('^(.+)\n')
        ],
        i = function(e) {
          var t,
            n,
            i,
            o,
            a =
              ((t = e),
              (n = new XMLSerializer()),
              Array.prototype.map
                .call(t.childNodes, function(e) {
                  return n.serializeToString(e);
                })
                .join(''));
          for (i = 0; i < r.length; i++) if ((o = r[i].exec(a))) return o[1];
        };
      t.failOnParseError = function(e) {
        return (
          (function(e) {
            var t;
            if (null === e) throw new Error('Parse error');
            var n = (function(e) {
              return 'parsererror' === e.documentElement.tagName &&
                'http://www.mozilla.org/newlayout/xml/parsererror.xml' ===
                  e.documentElement.namespaceURI
                ? e.documentElement
                : ('xml' === e.documentElement.tagName ||
                    'html' === e.documentElement.tagName) &&
                  e.documentElement.childNodes &&
                  e.documentElement.childNodes.length > 0 &&
                  'parsererror' === e.documentElement.childNodes[0].nodeName
                ? e.documentElement.childNodes[0]
                : 'html' === e.documentElement.tagName &&
                  e.documentElement.childNodes &&
                  e.documentElement.childNodes.length > 0 &&
                  'body' === e.documentElement.childNodes[0].nodeName &&
                  e.documentElement.childNodes[0].childNodes &&
                  e.documentElement.childNodes[0].childNodes.length &&
                  'parsererror' ===
                    e.documentElement.childNodes[0].childNodes[0].nodeName
                ? e.documentElement.childNodes[0].childNodes[0]
                : void 0;
            })(e);
            if (void 0 !== n) throw ((t = i(n) || 'Parse error'), new Error(t));
          })(e),
          e
        );
      };
    },
    Kz5y: function(e, t, n) {
      var r = n('WFqU'),
        i = 'object' == typeof self && self && self.Object === Object && self,
        o = r || i || Function('return this')();
      e.exports = o;
    },
    LiCP: function(e, t, n) {
      'use strict';
      (function(e, r) {
        n.d(t, 'e', function() {
          return i;
        }),
          n.d(t, 'g', function() {
            return a;
          }),
          n.d(t, 'f', function() {
            return o;
          }),
          n.d(t, 'c', function() {
            return l;
          }),
          n.d(t, 'a', function() {
            return u;
          }),
          n.d(t, 'b', function() {
            return c;
          }),
          n.d(t, 'd', function() {
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
              : e.exports && void 0 !== r
              ? r
              : {},
          o = (function(e) {
            var t = {},
              n = e.document,
              r = (e.GreenSockGlobals = e.GreenSockGlobals || e);
            if (r.TweenLite) return r.TweenLite;
            var i,
              o,
              a,
              s,
              l,
              u,
              c,
              h = function(e) {
                var t,
                  n = e.split('.'),
                  i = r;
                for (t = 0; t < n.length; t++) i[n[t]] = i = i[n[t]] || {};
                return i;
              },
              f = h('com.greensock'),
              p = function(e) {
                var t,
                  n = [],
                  r = e.length;
                for (t = 0; t !== r; n.push(e[t++]));
                return n;
              },
              d = function() {},
              m =
                ((u = Object.prototype.toString),
                (c = u.call([])),
                function(e) {
                  return (
                    null != e &&
                    (e instanceof Array ||
                      ('object' == typeof e && !!e.push && u.call(e) === c))
                  );
                }),
              g = {},
              v = function(e, n, i, o) {
                (this.sc = g[e] ? g[e].sc : []),
                  (g[e] = this),
                  (this.gsClass = null),
                  (this.func = i);
                var a = [];
                (this.check = function(s) {
                  for (var l, u, c, f, p = n.length, d = p; --p > -1; )
                    (l = g[n[p]] || new v(n[p], [])).gsClass
                      ? ((a[p] = l.gsClass), d--)
                      : s && l.sc.push(this);
                  if (0 === d && i)
                    for (
                      c = (u = ('com.greensock.' + e).split('.')).pop(),
                        f = h(u.join('.'))[c] = this.gsClass = i.apply(i, a),
                        o && (r[c] = t[c] = f),
                        p = 0;
                      p < this.sc.length;
                      p++
                    )
                      this.sc[p].check();
                }),
                  this.check(!0);
              },
              _ = (e._gsDefine = function(e, t, n, r) {
                return new v(e, t, n, r);
              }),
              y = (f._class = function(e, t, n) {
                return (
                  (t = t || function() {}),
                  _(
                    e,
                    [],
                    function() {
                      return t;
                    },
                    n
                  ),
                  t
                );
              });
            _.globals = r;
            var T = [0, 0, 1, 1],
              b = y(
                'easing.Ease',
                function(e, t, n, r) {
                  (this._func = e),
                    (this._type = n || 0),
                    (this._power = r || 0),
                    (this._params = t ? T.concat(t) : T);
                },
                !0
              ),
              x = (b.map = {}),
              w = (b.register = function(e, t, n, r) {
                for (
                  var i,
                    o,
                    a,
                    s,
                    l = t.split(','),
                    u = l.length,
                    c = (n || 'easeIn,easeOut,easeInOut').split(',');
                  --u > -1;

                )
                  for (
                    o = l[u],
                      i = r ? y('easing.' + o, null, !0) : f.easing[o] || {},
                      a = c.length;
                    --a > -1;

                  )
                    (s = c[a]),
                      (x[o + '.' + s] = x[s + o] = i[s] = e.getRatio
                        ? e
                        : e[s] || new e());
              });
            for (
              (a = b.prototype)._calcEnd = !1,
                a.getRatio = function(e) {
                  if (this._func)
                    return (
                      (this._params[0] = e),
                      this._func.apply(null, this._params)
                    );
                  var t = this._type,
                    n = this._power,
                    r =
                      1 === t
                        ? 1 - e
                        : 2 === t
                        ? e
                        : e < 0.5
                        ? 2 * e
                        : 2 * (1 - e);
                  return (
                    1 === n
                      ? (r *= r)
                      : 2 === n
                      ? (r *= r * r)
                      : 3 === n
                      ? (r *= r * r * r)
                      : 4 === n && (r *= r * r * r * r),
                    1 === t ? 1 - r : 2 === t ? r : e < 0.5 ? r / 2 : 1 - r / 2
                  );
                },
                o = (i = ['Linear', 'Quad', 'Cubic', 'Quart', 'Quint,Strong'])
                  .length;
              --o > -1;

            )
              (a = i[o] + ',Power' + o),
                w(new b(null, null, 1, o), a, 'easeOut', !0),
                w(
                  new b(null, null, 2, o),
                  a,
                  'easeIn' + (0 === o ? ',easeNone' : '')
                ),
                w(new b(null, null, 3, o), a, 'easeInOut');
            (x.linear = f.easing.Linear.easeIn),
              (x.swing = f.easing.Quad.easeInOut);
            var E = y('events.EventDispatcher', function(e) {
              (this._listeners = {}), (this._eventTarget = e || this);
            });
            ((a = E.prototype).addEventListener = function(e, t, n, r, i) {
              i = i || 0;
              var o,
                a,
                u = this._listeners[e],
                c = 0;
              for (
                this !== s || l || s.wake(),
                  null == u && (this._listeners[e] = u = []),
                  a = u.length;
                --a > -1;

              )
                (o = u[a]).c === t && o.s === n
                  ? u.splice(a, 1)
                  : 0 === c && o.pr < i && (c = a + 1);
              u.splice(c, 0, { c: t, s: n, up: r, pr: i });
            }),
              (a.removeEventListener = function(e, t) {
                var n,
                  r = this._listeners[e];
                if (r)
                  for (n = r.length; --n > -1; )
                    if (r[n].c === t) return void r.splice(n, 1);
              }),
              (a.dispatchEvent = function(e) {
                var t,
                  n,
                  r,
                  i = this._listeners[e];
                if (i)
                  for (
                    (t = i.length) > 1 && (i = i.slice(0)),
                      n = this._eventTarget;
                    --t > -1;

                  )
                    (r = i[t]) &&
                      (r.up
                        ? r.c.call(r.s || n, { type: e, target: n })
                        : r.c.call(r.s || n));
              });
            var A = e.requestAnimationFrame,
              C = e.cancelAnimationFrame,
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
              (A = e[i[o] + 'RequestAnimationFrame']),
                (C =
                  e[i[o] + 'CancelAnimationFrame'] ||
                  e[i[o] + 'CancelRequestAnimationFrame']);
            y('Ticker', function(e, t) {
              var r,
                i,
                o,
                a,
                u,
                c = this,
                h = P(),
                f = !(!1 === t || !A) && 'auto',
                p = 500,
                m = 33,
                g = function(e) {
                  var t,
                    n,
                    s = P() - R;
                  s > p && (h += s - m),
                    (R += s),
                    (c.time = (R - h) / 1e3),
                    (t = c.time - u),
                    (!r || t > 0 || !0 === e) &&
                      (c.frame++,
                      (u += t + (t >= a ? 0.004 : a - t)),
                      (n = !0)),
                    !0 !== e && (o = i(g)),
                    n && c.dispatchEvent('tick');
                };
              E.call(c),
                (c.time = c.frame = 0),
                (c.tick = function() {
                  g(!0);
                }),
                (c.lagSmoothing = function(e, t) {
                  if (!arguments.length) return p < 1e8;
                  (p = e || 1e8), (m = Math.min(t, p, 0));
                }),
                (c.sleep = function() {
                  null != o &&
                    (f && C ? C(o) : clearTimeout(o),
                    (i = d),
                    (o = null),
                    c === s && (l = !1));
                }),
                (c.wake = function(e) {
                  null !== o
                    ? c.sleep()
                    : e
                    ? (h += -R + (R = P()))
                    : c.frame > 10 && (R = P() - p + 5),
                    (i =
                      0 === r
                        ? d
                        : f && A
                        ? A
                        : function(e) {
                            return setTimeout(e, (1e3 * (u - c.time) + 1) | 0);
                          }),
                    c === s && (l = !0),
                    g(2);
                }),
                (c.fps = function(e) {
                  if (!arguments.length) return r;
                  (a = 1 / ((r = e) || 60)), (u = this.time + a), c.wake();
                }),
                (c.useRAF = function(e) {
                  if (!arguments.length) return f;
                  c.sleep(), (f = e), c.fps(r);
                }),
                c.fps(e),
                setTimeout(function() {
                  'auto' === f &&
                    c.frame < 5 &&
                    'hidden' !== (n || {}).visibilityState &&
                    c.useRAF(!1);
                }, 1500);
            }),
              ((a = f.Ticker.prototype = new f.events.EventDispatcher()).constructor =
                f.Ticker);
            var I = y('core.Animation', function(e, t) {
              if (
                ((this.vars = t = t || {}),
                (this._duration = this._totalDuration = e || 0),
                (this._delay = Number(t.delay) || 0),
                (this._timeScale = 1),
                (this._active = !!t.immediateRender),
                (this.data = t.data),
                (this._reversed = !!t.reversed),
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
              var e = setTimeout(S, 2e3);
              e.unref && e.unref();
            };
            S(),
              (a.play = function(e, t) {
                return (
                  null != e && this.seek(e, t), this.reversed(!1).paused(!1)
                );
              }),
              (a.pause = function(e, t) {
                return null != e && this.seek(e, t), this.paused(!0);
              }),
              (a.resume = function(e, t) {
                return null != e && this.seek(e, t), this.paused(!1);
              }),
              (a.seek = function(e, t) {
                return this.totalTime(Number(e), !1 !== t);
              }),
              (a.restart = function(e, t) {
                return this.reversed(!1)
                  .paused(!1)
                  .totalTime(e ? -this._delay : 0, !1 !== t, !0);
              }),
              (a.reverse = function(e, t) {
                return (
                  null != e && this.seek(e || this.totalDuration(), t),
                  this.reversed(!0).paused(!1)
                );
              }),
              (a.render = function(e, t, n) {}),
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
                var e,
                  t = this._timeline,
                  n = this._startTime;
                return (
                  !t ||
                  (!this._gc &&
                    !this._paused &&
                    t.isActive() &&
                    (e = t.rawTime(!0)) >= n &&
                    e < n + this.totalDuration() / this._timeScale - 1e-8)
                );
              }),
              (a._enabled = function(e, t) {
                return (
                  l || s.wake(),
                  (this._gc = !e),
                  (this._active = this.isActive()),
                  !0 !== t &&
                    (e && !this.timeline
                      ? this._timeline.add(this, this._startTime - this._delay)
                      : !e &&
                        this.timeline &&
                        this._timeline._remove(this, !0)),
                  !1
                );
              }),
              (a._kill = function(e, t) {
                return this._enabled(!1, !1);
              }),
              (a.kill = function(e, t) {
                return this._kill(e, t), this;
              }),
              (a._uncache = function(e) {
                for (var t = e ? this : this.timeline; t; )
                  (t._dirty = !0), (t = t.timeline);
                return this;
              }),
              (a._swapSelfInParams = function(e) {
                for (var t = e.length, n = e.concat(); --t > -1; )
                  '{self}' === e[t] && (n[t] = this);
                return n;
              }),
              (a._callback = function(e) {
                var t = this.vars,
                  n = t[e],
                  r = t[e + 'Params'],
                  i = t[e + 'Scope'] || t.callbackScope || this;
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
              (a.eventCallback = function(e, t, n, r) {
                if ('on' === (e || '').substr(0, 2)) {
                  var i = this.vars;
                  if (1 === arguments.length) return i[e];
                  null == t
                    ? delete i[e]
                    : ((i[e] = t),
                      (i[e + 'Params'] =
                        m(n) && -1 !== n.join('').indexOf('{self}')
                          ? this._swapSelfInParams(n)
                          : n),
                      (i[e + 'Scope'] = r)),
                    'onUpdate' === e && (this._onUpdate = t);
                }
                return this;
              }),
              (a.delay = function(e) {
                return arguments.length
                  ? (this._timeline.smoothChildTiming &&
                      this.startTime(this._startTime + e - this._delay),
                    (this._delay = e),
                    this)
                  : this._delay;
              }),
              (a.duration = function(e) {
                return arguments.length
                  ? ((this._duration = this._totalDuration = e),
                    this._uncache(!0),
                    this._timeline.smoothChildTiming &&
                      this._time > 0 &&
                      this._time < this._duration &&
                      0 !== e &&
                      this.totalTime(
                        this._totalTime * (e / this._duration),
                        !0
                      ),
                    this)
                  : ((this._dirty = !1), this._duration);
              }),
              (a.totalDuration = function(e) {
                return (
                  (this._dirty = !1),
                  arguments.length ? this.duration(e) : this._totalDuration
                );
              }),
              (a.time = function(e, t) {
                return arguments.length
                  ? (this._dirty && this.totalDuration(),
                    this.totalTime(e > this._duration ? this._duration : e, t))
                  : this._time;
              }),
              (a.totalTime = function(e, t, n) {
                if ((l || s.wake(), !arguments.length)) return this._totalTime;
                if (this._timeline) {
                  if (
                    (e < 0 && !n && (e += this.totalDuration()),
                    this._timeline.smoothChildTiming)
                  ) {
                    this._dirty && this.totalDuration();
                    var r = this._totalDuration,
                      i = this._timeline;
                    if (
                      (e > r && !n && (e = r),
                      (this._startTime =
                        (this._paused ? this._pauseTime : i._time) -
                        (this._reversed ? r - e : e) / this._timeScale),
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
                    (this._totalTime === e && 0 !== this._duration) ||
                      (N.length && J(), this.render(e, t, !1), N.length && J());
                }
                return this;
              }),
              (a.progress = a.totalProgress = function(e, t) {
                var n = this.duration();
                return arguments.length
                  ? this.totalTime(n * e, t)
                  : n
                  ? this._time / n
                  : this.ratio;
              }),
              (a.startTime = function(e) {
                return arguments.length
                  ? (e !== this._startTime &&
                      ((this._startTime = e),
                      this.timeline &&
                        this.timeline._sortChildren &&
                        this.timeline.add(this, e - this._delay)),
                    this)
                  : this._startTime;
              }),
              (a.endTime = function(e) {
                return (
                  this._startTime +
                  (0 != e ? this.totalDuration() : this.duration()) /
                    this._timeScale
                );
              }),
              (a.timeScale = function(e) {
                if (!arguments.length) return this._timeScale;
                var t, n;
                for (
                  e = e || 1e-8,
                    this._timeline &&
                      this._timeline.smoothChildTiming &&
                      ((n =
                        (t = this._pauseTime) || 0 === t
                          ? t
                          : this._timeline.totalTime()),
                      (this._startTime =
                        n - ((n - this._startTime) * this._timeScale) / e)),
                    this._timeScale = e,
                    n = this.timeline;
                  n && n.timeline;

                )
                  (n._dirty = !0), n.totalDuration(), (n = n.timeline);
                return this;
              }),
              (a.reversed = function(e) {
                return arguments.length
                  ? (e != this._reversed &&
                      ((this._reversed = e),
                      this.totalTime(
                        this._timeline && !this._timeline.smoothChildTiming
                          ? this.totalDuration() - this._totalTime
                          : this._totalTime,
                        !0
                      )),
                    this)
                  : this._reversed;
              }),
              (a.paused = function(e) {
                if (!arguments.length) return this._paused;
                var t,
                  n,
                  r = this._timeline;
                return (
                  e != this._paused &&
                    r &&
                    (l || e || s.wake(),
                    (n = (t = r.rawTime()) - this._pauseTime),
                    !e &&
                      r.smoothChildTiming &&
                      ((this._startTime += n), this._uncache(!1)),
                    (this._pauseTime = e ? t : null),
                    (this._paused = e),
                    (this._active = this.isActive()),
                    !e &&
                      0 !== n &&
                      this._initted &&
                      this.duration() &&
                      ((t = r.smoothChildTiming
                        ? this._totalTime
                        : (t - this._startTime) / this._timeScale),
                      this.render(t, t === this._totalTime, !0))),
                  this._gc && !e && this._enabled(!0, !1),
                  this
                );
              });
            var M = y('core.SimpleTimeline', function(e) {
              I.call(this, 0, e),
                (this.autoRemoveChildren = this.smoothChildTiming = !0);
            });
            ((a = M.prototype = new I()).constructor = M),
              (a.kill()._gc = !1),
              (a._first = a._last = a._recent = null),
              (a._sortChildren = !1),
              (a.add = a.insert = function(e, t, n, r) {
                var i, o;
                if (
                  ((e._startTime = Number(t || 0) + e._delay),
                  e._paused &&
                    this !== e._timeline &&
                    (e._pauseTime =
                      this.rawTime() - (e._timeline.rawTime() - e._pauseTime)),
                  e.timeline && e.timeline._remove(e, !0),
                  (e.timeline = e._timeline = this),
                  e._gc && e._enabled(!0, !0),
                  (i = this._last),
                  this._sortChildren)
                )
                  for (o = e._startTime; i && i._startTime > o; ) i = i._prev;
                return (
                  i
                    ? ((e._next = i._next), (i._next = e))
                    : ((e._next = this._first), (this._first = e)),
                  e._next ? (e._next._prev = e) : (this._last = e),
                  (e._prev = i),
                  (this._recent = e),
                  this._timeline && this._uncache(!0),
                  this
                );
              }),
              (a._remove = function(e, t) {
                return (
                  e.timeline === this &&
                    (t || e._enabled(!1, !0),
                    e._prev
                      ? (e._prev._next = e._next)
                      : this._first === e && (this._first = e._next),
                    e._next
                      ? (e._next._prev = e._prev)
                      : this._last === e && (this._last = e._prev),
                    (e._next = e._prev = e.timeline = null),
                    e === this._recent && (this._recent = this._last),
                    this._timeline && this._uncache(!0)),
                  this
                );
              }),
              (a.render = function(e, t, n) {
                var r,
                  i = this._first;
                for (this._totalTime = this._time = this._rawPrevTime = e; i; )
                  (r = i._next),
                    (i._active ||
                      (e >= i._startTime && !i._paused && !i._gc)) &&
                      (i._reversed
                        ? i.render(
                            (i._dirty ? i.totalDuration() : i._totalDuration) -
                              (e - i._startTime) * i._timeScale,
                            t,
                            n
                          )
                        : i.render((e - i._startTime) * i._timeScale, t, n)),
                    (i = r);
              }),
              (a.rawTime = function() {
                return l || s.wake(), this._totalTime;
              });
            var O = y(
                'TweenLite',
                function(t, n, r) {
                  if (
                    (I.call(this, n, r),
                    (this.render = O.prototype.render),
                    null == t)
                  )
                    throw 'Cannot tween a null target.';
                  this.target = t =
                    'string' != typeof t ? t : O.selector(t) || t;
                  var i,
                    o,
                    a,
                    s =
                      t.jquery ||
                      (t.length &&
                        t !== e &&
                        t[0] &&
                        (t[0] === e ||
                          (t[0].nodeType && t[0].style && !t.nodeType))),
                    l = this.vars.overwrite;
                  if (
                    ((this._overwrite = l =
                      null == l
                        ? Y[O.defaultOverwrite]
                        : 'number' == typeof l
                        ? l >> 0
                        : Y[l]),
                    (s || t instanceof Array || (t.push && m(t))) &&
                      'number' != typeof t[0])
                  )
                    for (
                      this._targets = a = p(t),
                        this._propLookup = [],
                        this._siblings = [],
                        i = 0;
                      i < a.length;
                      i++
                    )
                      (o = a[i])
                        ? 'string' != typeof o
                          ? o.length &&
                            o !== e &&
                            o[0] &&
                            (o[0] === e ||
                              (o[0].nodeType && o[0].style && !o.nodeType))
                            ? (a.splice(i--, 1),
                              (this._targets = a = a.concat(p(o))))
                            : ((this._siblings[i] = Q(o, this, !1)),
                              1 === l &&
                                this._siblings[i].length > 1 &&
                                ee(o, this, null, 1, this._siblings[i]))
                          : 'string' == typeof (o = a[i--] = O.selector(o)) &&
                            a.splice(i + 1, 1)
                        : a.splice(i--, 1);
                  else
                    (this._propLookup = {}),
                      (this._siblings = Q(t, this, !1)),
                      1 === l &&
                        this._siblings.length > 1 &&
                        ee(t, this, null, 1, this._siblings);
                  (this.vars.immediateRender ||
                    (0 === n &&
                      0 === this._delay &&
                      !1 !== this.vars.immediateRender)) &&
                    ((this._time = -1e-8),
                    this.render(Math.min(0, -this._delay)));
                },
                !0
              ),
              k = function(t) {
                return (
                  t &&
                  t.length &&
                  t !== e &&
                  t[0] &&
                  (t[0] === e || (t[0].nodeType && t[0].style && !t.nodeType))
                );
              };
            ((a = O.prototype = new I()).constructor = O),
              (a.kill()._gc = !1),
              (a.ratio = 0),
              (a._firstPT = a._targets = a._overwrittenProps = a._startAt = null),
              (a._notifyPluginsOfEnabled = a._lazy = !1),
              (O.version = '2.1.3'),
              (O.defaultEase = a._ease = new b(null, null, 1, 1)),
              (O.defaultOverwrite = 'auto'),
              (O.ticker = s),
              (O.autoSleep = 120),
              (O.lagSmoothing = function(e, t) {
                s.lagSmoothing(e, t);
              }),
              (O.selector =
                e.$ ||
                e.jQuery ||
                function(t) {
                  var r = e.$ || e.jQuery;
                  return r
                    ? ((O.selector = r), r(t))
                    : (n || (n = e.document),
                      n
                        ? n.querySelectorAll
                          ? n.querySelectorAll(t)
                          : n.getElementById(
                              '#' === t.charAt(0) ? t.substr(1) : t
                            )
                        : t);
                });
            var N = [],
              D = {},
              F = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
              L = /[\+-]=-?[\.\d]/,
              U = function(e) {
                for (var t, n = this._firstPT; n; )
                  (t = n.blob
                    ? 1 === e && null != this.end
                      ? this.end
                      : e
                      ? this.join('')
                      : this.start
                    : n.c * e + n.s),
                    n.m
                      ? (t = n.m.call(
                          this._tween,
                          t,
                          this._target || n.t,
                          this._tween
                        ))
                      : t < 1e-6 && t > -1e-6 && !n.blob && (t = 0),
                    n.f
                      ? n.fp
                        ? n.t[n.p](n.fp, t)
                        : n.t[n.p](t)
                      : (n.t[n.p] = t),
                    (n = n._next);
              },
              B = function(e) {
                return ((1e3 * e) | 0) / 1e3 + '';
              },
              z = function(e, t, n, r) {
                var i,
                  o,
                  a,
                  s,
                  l,
                  u,
                  c,
                  h = [],
                  f = 0,
                  p = '',
                  d = 0;
                for (
                  h.start = e,
                    h.end = t,
                    e = h[0] = e + '',
                    t = h[1] = t + '',
                    n && (n(h), (e = h[0]), (t = h[1])),
                    h.length = 0,
                    i = e.match(F) || [],
                    o = t.match(F) || [],
                    r &&
                      ((r._next = null),
                      (r.blob = 1),
                      (h._firstPT = h._applyPT = r)),
                    l = o.length,
                    s = 0;
                  s < l;
                  s++
                )
                  (c = o[s]),
                    (p +=
                      (u = t.substr(f, t.indexOf(c, f) - f)) || !s ? u : ','),
                    (f += u.length),
                    d ? (d = (d + 1) % 5) : 'rgba(' === u.substr(-5) && (d = 1),
                    c === i[s] || i.length <= s
                      ? (p += c)
                      : (p && (h.push(p), (p = '')),
                        (a = parseFloat(i[s])),
                        h.push(a),
                        (h._firstPT = {
                          _next: h._firstPT,
                          t: h,
                          p: h.length - 1,
                          s: a,
                          c:
                            ('=' === c.charAt(1)
                              ? parseInt(c.charAt(0) + '1', 10) *
                                parseFloat(c.substr(2))
                              : parseFloat(c) - a) || 0,
                          f: 0,
                          m: d && d < 4 ? Math.round : B
                        })),
                    (f += c.length);
                return (
                  (p += t.substr(f)) && h.push(p),
                  (h.setRatio = U),
                  L.test(t) && (h.end = null),
                  h
                );
              },
              j = function(e, t, n, r, i, o, a, s, l) {
                'function' == typeof r && (r = r(l || 0, e));
                var u = typeof e[t],
                  c =
                    'function' !== u
                      ? ''
                      : t.indexOf('set') ||
                        'function' != typeof e['get' + t.substr(3)]
                      ? t
                      : 'get' + t.substr(3),
                  h = 'get' !== n ? n : c ? (a ? e[c](a) : e[c]()) : e[t],
                  f = 'string' == typeof r && '=' === r.charAt(1),
                  p = {
                    t: e,
                    p: t,
                    s: h,
                    f: 'function' === u,
                    pg: 0,
                    n: i || t,
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
                          n: i || t,
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
                var e,
                  t,
                  n = N.length;
                for (D = {}, e = 0; e < n; e++)
                  (t = N[e]) &&
                    !1 !== t._lazy &&
                    (t.render(t._lazy[0], t._lazy[1], !0), (t._lazy = !1));
                N.length = 0;
              });
            (K._startTime = s.time),
              (W._startTime = s.frame),
              (K._active = W._active = !0),
              setTimeout(J, 1),
              (I._updateRoot = O.render = function() {
                var e, t, n;
                if (
                  (N.length && J(),
                  K.render((s.time - K._startTime) * K._timeScale, !1, !1),
                  W.render((s.frame - W._startTime) * W._timeScale, !1, !1),
                  N.length && J(),
                  s.frame >= Z)
                ) {
                  for (n in ((Z = s.frame + (parseInt(O.autoSleep, 10) || 120)),
                  q)) {
                    for (e = (t = q[n].tweens).length; --e > -1; )
                      t[e]._gc && t.splice(e, 1);
                    0 === t.length && delete q[n];
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
            var Q = function(e, t, n) {
                var r,
                  i,
                  o = e._gsTweenID;
                if (
                  (q[o || (e._gsTweenID = o = 't' + H++)] ||
                    (q[o] = { target: e, tweens: [] }),
                  t && (((r = q[o].tweens)[(i = r.length)] = t), n))
                )
                  for (; --i > -1; ) r[i] === t && r.splice(i, 1);
                return q[o].tweens;
              },
              $ = function(e, t, n, r) {
                var i,
                  o,
                  a = e.vars.onOverwrite;
                return (
                  a && (i = a(e, t, n, r)),
                  (a = O.onOverwrite) && (o = a(e, t, n, r)),
                  !1 !== i && !1 !== o
                );
              },
              ee = function(e, t, n, r, i) {
                var o, a, s, l;
                if (1 === r || r >= 4) {
                  for (l = i.length, o = 0; o < l; o++)
                    if ((s = i[o]) !== t)
                      s._gc || (s._kill(null, e, t) && (a = !0));
                    else if (5 === r) break;
                  return a;
                }
                var u,
                  c = t._startTime + 1e-8,
                  h = [],
                  f = 0,
                  p = 0 === t._duration;
                for (o = i.length; --o > -1; )
                  (s = i[o]) === t ||
                    s._gc ||
                    s._paused ||
                    (s._timeline !== t._timeline
                      ? ((u = u || te(t, 0, p)),
                        0 === te(s, u, p) && (h[f++] = s))
                      : s._startTime <= c &&
                        s._startTime + s.totalDuration() / s._timeScale > c &&
                        (((p || !s._initted) && c - s._startTime <= 2e-8) ||
                          (h[f++] = s)));
                for (o = f; --o > -1; )
                  if (
                    ((l = (s = h[o])._firstPT),
                    2 === r && s._kill(n, e, t) && (a = !0),
                    2 !== r || (!s._firstPT && s._initted && l))
                  ) {
                    if (2 !== r && !$(s, t)) continue;
                    s._enabled(!1, !1) && (a = !0);
                  }
                return a;
              },
              te = function(e, t, n) {
                for (
                  var r = e._timeline, i = r._timeScale, o = e._startTime;
                  r._timeline;

                ) {
                  if (((o += r._startTime), (i *= r._timeScale), r._paused))
                    return -100;
                  r = r._timeline;
                }
                return (o /= i) > t
                  ? o - t
                  : (n && o === t) || (!e._initted && o - t < 2e-8)
                  ? 1e-8
                  : (o += e.totalDuration() / e._timeScale / i) > t + 1e-8
                  ? 0
                  : o - t - 1e-8;
              };
            (a._init = function() {
              var e,
                t,
                n,
                r,
                i,
                o,
                a = this.vars,
                s = this._overwrittenProps,
                l = this._duration,
                u = !!a.immediateRender,
                c = a.ease,
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
                  (i.lazy = u && !1 !== a.lazy),
                  (i.startAt = i.delay = null),
                  (i.onUpdate = a.onUpdate),
                  (i.onUpdateParams = a.onUpdateParams),
                  (i.onUpdateScope =
                    a.onUpdateScope || a.callbackScope || this),
                  (this._startAt = O.to(this.target || {}, 0, i)),
                  u)
                )
                  if (this._time > 0) this._startAt = null;
                  else if (0 !== l) return;
              } else if (a.runBackwards && 0 !== l)
                if (h) h.render(-1, !0), h.kill(), (this._startAt = null);
                else {
                  for (r in (0 !== this._time && (u = !1), (n = {}), a))
                    (G[r] && 'autoCSS' !== r) || (n[r] = a[r]);
                  if (
                    ((n.overwrite = 0),
                    (n.data = 'isFromStart'),
                    (n.lazy = u && !1 !== a.lazy),
                    (n.immediateRender = u),
                    (this._startAt = O.to(this.target, 0, n)),
                    u)
                  ) {
                    if (0 === this._time) return;
                  } else
                    this._startAt._init(),
                      this._startAt._enabled(!1),
                      this.vars.immediateRender && (this._startAt = null);
                }
              if (
                ((this._ease = c = c
                  ? c instanceof b
                    ? c
                    : 'function' == typeof c
                    ? new b(c, a.easeParams)
                    : x[c] || O.defaultEase
                  : O.defaultEase),
                a.easeParams instanceof Array &&
                  c.config &&
                  (this._ease = c.config.apply(c, a.easeParams)),
                (this._easeType = this._ease._type),
                (this._easePower = this._ease._power),
                (this._firstPT = null),
                this._targets)
              )
                for (o = this._targets.length, e = 0; e < o; e++)
                  this._initProps(
                    this._targets[e],
                    (this._propLookup[e] = {}),
                    this._siblings[e],
                    s ? s[e] : null,
                    e
                  ) && (t = !0);
              else
                t = this._initProps(
                  this.target,
                  this._propLookup,
                  this._siblings,
                  s,
                  0
                );
              if (
                (t && O._onPluginEvent('_onInitAllProps', this),
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
              (a._initProps = function(t, n, r, i, o) {
                var a, s, l, u, c, h;
                if (null == t) return !1;
                for (a in (D[t._gsTweenID] && J(),
                this.vars.css ||
                  (t.style &&
                    t !== e &&
                    t.nodeType &&
                    X.css &&
                    !1 !== this.vars.autoCSS &&
                    (function(e, t) {
                      var n,
                        r = {};
                      for (n in e)
                        G[n] ||
                          (n in t &&
                            'transform' !== n &&
                            'x' !== n &&
                            'y' !== n &&
                            'width' !== n &&
                            'height' !== n &&
                            'className' !== n &&
                            'border' !== n) ||
                          !(!X[n] || (X[n] && X[n]._autoCSS)) ||
                          ((r[n] = e[n]), delete e[n]);
                      e.css = r;
                    })(this.vars, t)),
                this.vars))
                  if (((h = this.vars[a]), G[a]))
                    h &&
                      (h instanceof Array || (h.push && m(h))) &&
                      -1 !== h.join('').indexOf('{self}') &&
                      (this.vars[a] = h = this._swapSelfInParams(h, this));
                  else if (
                    X[a] &&
                    (u = new X[a]())._onInitTween(t, this.vars[a], this, o)
                  ) {
                    for (
                      this._firstPT = c = {
                        _next: this._firstPT,
                        t: u,
                        p: 'setRatio',
                        s: 0,
                        c: 1,
                        f: 1,
                        n: a,
                        pg: 1,
                        pr: u._priority,
                        m: 0
                      },
                        s = u._overwriteProps.length;
                      --s > -1;

                    )
                      n[u._overwriteProps[s]] = this._firstPT;
                    (u._priority || u._onInitAllProps) && (l = !0),
                      (u._onDisable || u._onEnable) &&
                        (this._notifyPluginsOfEnabled = !0),
                      c._next && (c._next._prev = c);
                  } else
                    n[a] = j.call(
                      this,
                      t,
                      a,
                      'get',
                      h,
                      a,
                      0,
                      null,
                      this.vars.stringFilter,
                      o
                    );
                return i && this._kill(i, t)
                  ? this._initProps(t, n, r, i, o)
                  : this._overwrite > 1 &&
                    this._firstPT &&
                    r.length > 1 &&
                    ee(t, this, n, this._overwrite, r)
                  ? (this._kill(n, t), this._initProps(t, n, r, i, o))
                  : (this._firstPT &&
                      ((!1 !== this.vars.lazy && this._duration) ||
                        (this.vars.lazy && !this._duration)) &&
                      (D[t._gsTweenID] = !0),
                    l);
              }),
              (a.render = function(e, t, n) {
                var r,
                  i,
                  o,
                  a,
                  s = this._time,
                  l = this._duration,
                  u = this._rawPrevTime;
                if (e >= l - 1e-8 && e >= 0)
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
                      (this._startTime === this._timeline._duration && (e = 0),
                      (u < 0 ||
                        (e <= 0 && e >= -1e-8) ||
                        (1e-8 === u && 'isPause' !== this.data)) &&
                        u !== e &&
                        ((n = !0), u > 1e-8 && (i = 'onReverseComplete')),
                      (this._rawPrevTime = a = !t || e || u === e ? e : 1e-8));
                else if (e < 1e-8)
                  (this._totalTime = this._time = 0),
                    (this.ratio = this._ease._calcEnd
                      ? this._ease.getRatio(0)
                      : 0),
                    (0 !== s || (0 === l && u > 0)) &&
                      ((i = 'onReverseComplete'), (r = this._reversed)),
                    e > -1e-8
                      ? (e = 0)
                      : e < 0 &&
                        ((this._active = !1),
                        0 === l &&
                          (this._initted || !this.vars.lazy || n) &&
                          (u >= 0 &&
                            (1e-8 !== u || 'isPause' !== this.data) &&
                            (n = !0),
                          (this._rawPrevTime = a =
                            !t || e || u === e ? e : 1e-8))),
                    (!this._initted ||
                      (this._startAt && this._startAt.progress())) &&
                      (n = !0);
                else if (((this._totalTime = this._time = e), this._easeType)) {
                  var c = e / l,
                    h = this._easeType,
                    f = this._easePower;
                  (1 === h || (3 === h && c >= 0.5)) && (c = 1 - c),
                    3 === h && (c *= 2),
                    1 === f
                      ? (c *= c)
                      : 2 === f
                      ? (c *= c * c)
                      : 3 === f
                      ? (c *= c * c * c)
                      : 4 === f && (c *= c * c * c * c),
                    (this.ratio =
                      1 === h
                        ? 1 - c
                        : 2 === h
                        ? c
                        : e / l < 0.5
                        ? c / 2
                        : 1 - c / 2);
                } else this.ratio = this._ease.getRatio(e / l);
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
                        (this._rawPrevTime = u),
                        N.push(this),
                        void (this._lazy = [e, t])
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
                          e >= 0 &&
                          (this._active = !0)),
                      0 === s &&
                        (this._startAt &&
                          (e >= 0
                            ? this._startAt.render(e, !0, n)
                            : i || (i = '_dummyGS')),
                        this.vars.onStart &&
                          ((0 === this._time && 0 !== l) ||
                            t ||
                            this._callback('onStart'))),
                      o = this._firstPT;
                    o;

                  )
                    o.f
                      ? o.t[o.p](o.c * this.ratio + o.s)
                      : (o.t[o.p] = o.c * this.ratio + o.s),
                      (o = o._next);
                  this._onUpdate &&
                    (e < 0 &&
                      this._startAt &&
                      -1e-4 !== e &&
                      this._startAt.render(e, !0, n),
                    t ||
                      ((this._time !== s || r || n) &&
                        this._callback('onUpdate'))),
                    i &&
                      ((this._gc && !n) ||
                        (e < 0 &&
                          this._startAt &&
                          !this._onUpdate &&
                          -1e-4 !== e &&
                          this._startAt.render(e, !0, n),
                        r &&
                          (this._timeline.autoRemoveChildren &&
                            this._enabled(!1, !1),
                          (this._active = !1)),
                        !t && this.vars[i] && this._callback(i),
                        0 === l &&
                          1e-8 === this._rawPrevTime &&
                          1e-8 !== a &&
                          (this._rawPrevTime = 0)));
                }
              }),
              (a._kill = function(e, t, n) {
                if (
                  ('all' === e && (e = null),
                  null == e && (null == t || t === this.target))
                )
                  return (this._lazy = !1), this._enabled(!1, !1);
                t =
                  'string' != typeof t
                    ? t || this._targets || this.target
                    : O.selector(t) || t;
                var r,
                  i,
                  o,
                  a,
                  s,
                  l,
                  u,
                  c,
                  h,
                  f =
                    n &&
                    this._time &&
                    n._startTime === this._startTime &&
                    this._timeline === n._timeline,
                  p = this._firstPT;
                if ((m(t) || k(t)) && 'number' != typeof t[0])
                  for (r = t.length; --r > -1; )
                    this._kill(e, t[r], n) && (l = !0);
                else {
                  if (this._targets) {
                    for (r = this._targets.length; --r > -1; )
                      if (t === this._targets[r]) {
                        (s = this._propLookup[r] || {}),
                          (this._overwrittenProps =
                            this._overwrittenProps || []),
                          (i = this._overwrittenProps[r] = e
                            ? this._overwrittenProps[r] || {}
                            : 'all');
                        break;
                      }
                  } else {
                    if (t !== this.target) return !1;
                    (s = this._propLookup),
                      (i = this._overwrittenProps = e
                        ? this._overwrittenProps || {}
                        : 'all');
                  }
                  if (s) {
                    if (
                      ((u = e || s),
                      (c =
                        e !== i &&
                        'all' !== i &&
                        e !== s &&
                        ('object' != typeof e || !e._tempKill)),
                      n && (O.onOverwrite || this.vars.onOverwrite))
                    ) {
                      for (o in u) s[o] && (h || (h = []), h.push(o));
                      if ((h || !e) && !$(this, n, t, h)) return !1;
                    }
                    for (o in u)
                      (a = s[o]) &&
                        (f &&
                          (a.f ? a.t[a.p](a.s) : (a.t[a.p] = a.s), (l = !0)),
                        a.pg && a.t._kill(u) && (l = !0),
                        (a.pg && 0 !== a.t._overwriteProps.length) ||
                          (a._prev
                            ? (a._prev._next = a._next)
                            : a === this._firstPT && (this._firstPT = a._next),
                          a._next && (a._next._prev = a._prev),
                          (a._next = a._prev = null)),
                        delete s[o]),
                        c && (i[o] = 1);
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
                var e = this._time;
                return (
                  (this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null),
                  (this._notifyPluginsOfEnabled = this._active = this._lazy = !1),
                  (this._propLookup = this._targets ? {} : []),
                  I.prototype.invalidate.call(this),
                  this.vars.immediateRender &&
                    ((this._time = -1e-8),
                    this.render(e, !1, !1 !== this.vars.lazy)),
                  this
                );
              }),
              (a._enabled = function(e, t) {
                if ((l || s.wake(), e && this._gc)) {
                  var n,
                    r = this._targets;
                  if (r)
                    for (n = r.length; --n > -1; )
                      this._siblings[n] = Q(r[n], this, !0);
                  else this._siblings = Q(this.target, this, !0);
                }
                return (
                  I.prototype._enabled.call(this, e, t),
                  !(!this._notifyPluginsOfEnabled || !this._firstPT) &&
                    O._onPluginEvent(e ? '_onEnable' : '_onDisable', this)
                );
              }),
              (O.to = function(e, t, n) {
                return new O(e, t, n);
              }),
              (O.from = function(e, t, n) {
                return (
                  (n.runBackwards = !0),
                  (n.immediateRender = 0 != n.immediateRender),
                  new O(e, t, n)
                );
              }),
              (O.fromTo = function(e, t, n, r) {
                return (
                  (r.startAt = n),
                  (r.immediateRender =
                    0 != r.immediateRender && 0 != n.immediateRender),
                  new O(e, t, r)
                );
              }),
              (O.delayedCall = function(e, t, n, r, i) {
                return new O(t, 0, {
                  delay: e,
                  onComplete: t,
                  onCompleteParams: n,
                  callbackScope: r,
                  onReverseComplete: t,
                  onReverseCompleteParams: n,
                  immediateRender: !1,
                  lazy: !1,
                  useFrames: i,
                  overwrite: 0
                });
              }),
              (O.set = function(e, t) {
                return new O(e, 0, t);
              }),
              (O.getTweensOf = function(e, t) {
                if (null == e) return [];
                var n, r, i, o;
                if (
                  ((e = 'string' != typeof e ? e : O.selector(e) || e),
                  (m(e) || k(e)) && 'number' != typeof e[0])
                ) {
                  for (n = e.length, r = []; --n > -1; )
                    r = r.concat(O.getTweensOf(e[n], t));
                  for (n = r.length; --n > -1; )
                    for (o = r[n], i = n; --i > -1; )
                      o === r[i] && r.splice(n, 1);
                } else if (e._gsTweenID)
                  for (n = (r = Q(e).concat()).length; --n > -1; )
                    (r[n]._gc || (t && !r[n].isActive())) && r.splice(n, 1);
                return r || [];
              }),
              (O.killTweensOf = O.killDelayedCallsTo = function(e, t, n) {
                'object' == typeof t && ((n = t), (t = !1));
                for (var r = O.getTweensOf(e, t), i = r.length; --i > -1; )
                  r[i]._kill(n, e);
              });
            var ne = y(
              'plugins.TweenPlugin',
              function(e, t) {
                (this._overwriteProps = (e || '').split(',')),
                  (this._propName = this._overwriteProps[0]),
                  (this._priority = t || 0),
                  (this._super = ne.prototype);
              },
              !0
            );
            if (
              ((a = ne.prototype),
              (ne.version = '1.19.0'),
              (ne.API = 2),
              (a._firstPT = null),
              (a._addTween = j),
              (a.setRatio = U),
              (a._kill = function(e) {
                var t,
                  n = this._overwriteProps,
                  r = this._firstPT;
                if (null != e[this._propName]) this._overwriteProps = [];
                else
                  for (t = n.length; --t > -1; )
                    null != e[n[t]] && n.splice(t, 1);
                for (; r; )
                  null != e[r.n] &&
                    (r._next && (r._next._prev = r._prev),
                    r._prev
                      ? ((r._prev._next = r._next), (r._prev = null))
                      : this._firstPT === r && (this._firstPT = r._next)),
                    (r = r._next);
                return !1;
              }),
              (a._mod = a._roundProps = function(e) {
                for (var t, n = this._firstPT; n; )
                  (t =
                    e[this._propName] ||
                    (null != n.n &&
                      e[n.n.split(this._propName + '_').join('')])) &&
                    'function' == typeof t &&
                    (2 === n.f ? (n.t._applyPT.m = t) : (n.m = t)),
                    (n = n._next);
              }),
              (O._onPluginEvent = function(e, t) {
                var n,
                  r,
                  i,
                  o,
                  a,
                  s = t._firstPT;
                if ('_onInitAllProps' === e) {
                  for (; s; ) {
                    for (a = s._next, r = i; r && r.pr > s.pr; ) r = r._next;
                    (s._prev = r ? r._prev : o) ? (s._prev._next = s) : (i = s),
                      (s._next = r) ? (r._prev = s) : (o = s),
                      (s = a);
                  }
                  s = t._firstPT = i;
                }
                for (; s; )
                  s.pg && 'function' == typeof s.t[e] && s.t[e]() && (n = !0),
                    (s = s._next);
                return n;
              }),
              (ne.activate = function(e) {
                for (var t = e.length; --t > -1; )
                  e[t].API === ne.API && (X[new e[t]()._propName] = e[t]);
                return !0;
              }),
              (_.plugin = function(e) {
                if (!(e && e.propName && e.init && e.API))
                  throw 'illegal plugin definition.';
                var t,
                  n = e.propName,
                  r = e.priority || 0,
                  i = e.overwriteProps,
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
                      ne.call(this, n, r), (this._overwriteProps = i || []);
                    },
                    !0 === e.global
                  ),
                  s = (a.prototype = new ne(n));
                for (t in ((s.constructor = a), (a.API = e.API), o))
                  'function' == typeof e[t] && (s[o[t]] = e[t]);
                return (a.version = e.version), ne.activate([a]), a;
              }),
              (i = e._gsQueue))
            ) {
              for (o = 0; o < i.length; o++) i[o]();
              for (a in g)
                g[a].func ||
                  e.console.log('GSAP encountered missing dependency: ' + a);
            }
            return (l = !1), O;
          })(i),
          a = i.GreenSockGlobals,
          s = a.com.greensock,
          l = s.core.SimpleTimeline,
          u = s.core.Animation,
          c = a.Ease,
          h = (a.Linear, a.Power1, a.Power2, a.Power3, a.Power4, a.TweenPlugin);
        s.events.EventDispatcher;
      }.call(this, n('3UD+')(e), n('yLpj')));
    },
    LxBP: function(e, t, n) {
      'use strict';
      var r = n('VADU');
      t.extractCssUrl = function(e) {
        var t,
          n = /^url\(("[^"]+"|'[^']+'|[^\)]+)\)/;
        if (!n.test(e)) throw new Error('Invalid url');
        return (
          (t = n.exec(e)[1]),
          r.unquoteString(t.replace(/^[\t\r\f\n ]*(.+?)[\t\r\f\n ]*$/, '$1'))
        );
      };
      (t.parse = function(e) {
        return (function(e) {
          var t,
            n = '(url\\(\\s*(?:"[^"]*"|\'[^\']*\'|[^\\(]+)\\s*\\)|[^,\\s]+)',
            r = '(?:\\s*' + n + ')+',
            i = new RegExp(r, 'g'),
            o = [],
            a = function(e) {
              var t,
                r = new RegExp(n, 'g'),
                i = [];
              for (t = r.exec(e); t; ) i.push(t[1]), (t = r.exec(e));
              return i;
            };
          if (
            e.match(
              new RegExp(
                '^\\s*((?:\\s*(url\\(\\s*(?:"[^"]*"|\'[^\']*\'|[^\\(]+)\\s*\\)|[^,\\s]+))+)(?:\\s*,\\s*((?:\\s*(url\\(\\s*(?:"[^"]*"|\'[^\']*\'|[^\\(]+)\\s*\\)|[^,\\s]+))+))*\\s*$'
              )
            )
          ) {
            for (t = i.exec(e); t; ) o.push(a(t[0])), (t = i.exec(e));
            return o;
          }
          return [];
        })(e).map(function(e) {
          var n = (function(e) {
            var n;
            for (n = 0; n < e.length; n++)
              try {
                return { url: t.extractCssUrl(e[n]), idx: n };
              } catch (e) {}
          })(e);
          return n
            ? {
                preUrl: e.slice(0, n.idx),
                url: n.url,
                postUrl: e.slice(n.idx + 1)
              }
            : { preUrl: e };
        });
      }),
        (t.serialize = function(e) {
          return e
            .map(function(e) {
              var t = [].concat(e.preUrl);
              return (
                e.url && t.push('url("' + e.url + '")'),
                e.postUrl && (t = t.concat(e.postUrl)),
                t.join(' ')
              );
            })
            .join(', ');
        });
    },
    Mutr: function(e, t, n) {
      'use strict';
      (function(e) {
        function r(t) {
          var n = e('.l-footer__langs'),
            r = e('.l-footer__langs-bg');
          function i() {
            r.fadeIn(), n.addClass('is-active');
          }
          function o() {
            r.fadeOut(), n.removeClass('is-active');
          }
          t
            ? (n.on('click', i), r.on('click', o))
            : (n.on('mouseenter', i), n.on('mouseleave', o));
        }
        n.d(t, 'a', function() {
          return r;
        });
      }.call(this, n('EVdn')));
    },
    Nehr: function(e, t, n) {
      'use strict';
      e.exports = {
        isString: function(e) {
          return 'string' == typeof e;
        },
        isObject: function(e) {
          return 'object' == typeof e && null !== e;
        },
        isNull: function(e) {
          return null === e;
        },
        isNullOrUndefined: function(e) {
          return null == e;
        }
      };
    },
    NykK: function(e, t, n) {
      var r = n('nmnc'),
        i = n('AP2z'),
        o = n('KfNM'),
        a = '[object Null]',
        s = '[object Undefined]',
        l = r ? r.toStringTag : void 0;
      e.exports = function(e) {
        return null == e
          ? void 0 === e
            ? s
            : a
          : l && l in Object(e)
          ? i(e)
          : o(e);
      };
    },
    QIyF: function(e, t, n) {
      var r = n('Kz5y');
      e.exports = function() {
        return r.Date.now();
      };
    },
    QM7d: function(e, t, n) {
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
      e.exports = function(e) {
        var t = new i();
        (t.pre = e.pre), (t.body = e.body), (t.post = e.post);
        var n = e.args.slice(0);
        t.argTypes = n;
        for (var o = 0; o < n.length; ++o) {
          var a = n[o];
          if ('array' === a || ('object' == typeof a && a.blockIndices)) {
            if (
              ((t.argTypes[o] = 'array'),
              t.arrayArgs.push(o),
              t.arrayBlockIndices.push(a.blockIndices ? a.blockIndices : 0),
              t.shimArgs.push('array' + o),
              o < t.pre.args.length && t.pre.args[o].count > 0)
            )
              throw new Error(
                'cwise: pre() block may not reference array args'
              );
            if (o < t.post.args.length && t.post.args[o].count > 0)
              throw new Error(
                'cwise: post() block may not reference array args'
              );
          } else if ('scalar' === a)
            t.scalarArgs.push(o), t.shimArgs.push('scalar' + o);
          else if ('index' === a) {
            if (
              (t.indexArgs.push(o),
              o < t.pre.args.length && t.pre.args[o].count > 0)
            )
              throw new Error(
                'cwise: pre() block may not reference array index'
              );
            if (o < t.body.args.length && t.body.args[o].lvalue)
              throw new Error(
                'cwise: body() block may not write to array index'
              );
            if (o < t.post.args.length && t.post.args[o].count > 0)
              throw new Error(
                'cwise: post() block may not reference array index'
              );
          } else if ('shape' === a) {
            if (
              (t.shapeArgs.push(o),
              o < t.pre.args.length && t.pre.args[o].lvalue)
            )
              throw new Error(
                'cwise: pre() block may not write to array shape'
              );
            if (o < t.body.args.length && t.body.args[o].lvalue)
              throw new Error(
                'cwise: body() block may not write to array shape'
              );
            if (o < t.post.args.length && t.post.args[o].lvalue)
              throw new Error(
                'cwise: post() block may not write to array shape'
              );
          } else {
            if ('object' != typeof a || !a.offset)
              throw new Error('cwise: Unknown argument type ' + n[o]);
            (t.argTypes[o] = 'offset'),
              t.offsetArgs.push({ array: a.array, offset: a.offset }),
              t.offsetArgIndex.push(o);
          }
        }
        if (t.arrayArgs.length <= 0)
          throw new Error('cwise: No array arguments specified');
        if (t.pre.args.length > n.length)
          throw new Error('cwise: Too many arguments in pre() block');
        if (t.body.args.length > n.length)
          throw new Error('cwise: Too many arguments in body() block');
        if (t.post.args.length > n.length)
          throw new Error('cwise: Too many arguments in post() block');
        return (
          (t.debug = !!e.printCode || !!e.debug),
          (t.funcName = e.funcName || 'cwise'),
          (t.blockSize = e.blockSize || 64),
          r(t)
        );
      };
    },
    RVtD: function(e, t, n) {},
    RjOF: function(e, t, n) {
      'use strict';
      /*!
       * repeat-string <https://github.com/jonschlinkert/repeat-string>
       *
       * Copyright (c) 2014-2015, Jon Schlinkert.
       * Licensed under the MIT License.
       */ var r,
        i = '';
      e.exports = function(e, t) {
        if ('string' != typeof e) throw new TypeError('expected a string');
        if (1 === t) return e;
        if (2 === t) return e + e;
        var n = e.length * t;
        if (r !== e || void 0 === r) (r = e), (i = '');
        else if (i.length >= n) return i.substr(0, n);
        for (; n > i.length && t > 1; ) 1 & t && (i += e), (t >>= 1), (e += e);
        return (i = (i += e).substr(0, n));
      };
    },
    SMLl: function(e, t, n) {
      'use strict';
      /*!
       * pad-left <https://github.com/jonschlinkert/pad-left>
       *
       * Copyright (c) 2014-2015, Jon Schlinkert.
       * Licensed under the MIT license.
       */ var r = n('RjOF');
      e.exports = function(e, t, n) {
        return r((n = void 0 !== n ? n + '' : ' '), t) + e;
      };
    },
    TBio: function(e, t, n) {
      'use strict';
      var r = n('F16p');
      function i(e, t, n) {
        var r,
          i,
          o = e.length,
          a = t.arrayArgs.length,
          s = t.indexArgs.length > 0,
          l = [],
          u = [],
          c = 0,
          h = 0;
        for (r = 0; r < o; ++r) u.push(['i', r, '=0'].join(''));
        for (i = 0; i < a; ++i)
          for (r = 0; r < o; ++r)
            (h = c),
              (c = e[r]),
              0 === r
                ? u.push(['d', i, 's', r, '=t', i, 'p', c].join(''))
                : u.push(
                    [
                      'd',
                      i,
                      's',
                      r,
                      '=(t',
                      i,
                      'p',
                      c,
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
          u.length > 0 && l.push('var ' + u.join(',')), r = o - 1;
          r >= 0;
          --r
        )
          (c = e[r]),
            l.push(['for(i', r, '=0;i', r, '<s', c, ';++i', r, '){'].join(''));
        for (l.push(n), r = 0; r < o; ++r) {
          for (h = c, c = e[r], i = 0; i < a; ++i)
            l.push(['p', i, '+=d', i, 's', r].join(''));
          s &&
            (r > 0 && l.push(['index[', h, ']-=s', h].join('')),
            l.push(['++index[', c, ']'].join(''))),
            l.push('}');
        }
        return l.join('\n');
      }
      function o(e, t, n) {
        for (var r = e.body, i = [], o = [], a = 0; a < e.args.length; ++a) {
          var s = e.args[a];
          if (!(s.count <= 0)) {
            var l = new RegExp(s.name, 'g'),
              u = '',
              c = t.arrayArgs.indexOf(a);
            switch (t.argTypes[a]) {
              case 'offset':
                var h = t.offsetArgIndex.indexOf(a);
                (c = t.offsetArgs[h].array), (u = '+q' + h);
              case 'array':
                u = 'p' + c + u;
                var f = 'l' + a,
                  p = 'a' + c;
                if (0 === t.arrayBlockIndices[c])
                  1 === s.count
                    ? 'generic' === n[c]
                      ? s.lvalue
                        ? (i.push(
                            ['var ', f, '=', p, '.get(', u, ')'].join('')
                          ),
                          (r = r.replace(l, f)),
                          o.push([p, '.set(', u, ',', f, ')'].join('')))
                        : (r = r.replace(l, [p, '.get(', u, ')'].join('')))
                      : (r = r.replace(l, [p, '[', u, ']'].join('')))
                    : 'generic' === n[c]
                    ? (i.push(['var ', f, '=', p, '.get(', u, ')'].join('')),
                      (r = r.replace(l, f)),
                      s.lvalue && o.push([p, '.set(', u, ',', f, ')'].join('')))
                    : (i.push(['var ', f, '=', p, '[', u, ']'].join('')),
                      (r = r.replace(l, f)),
                      s.lvalue && o.push([p, '[', u, ']=', f].join('')));
                else {
                  for (
                    var d = [s.name], m = [u], g = 0;
                    g < Math.abs(t.arrayBlockIndices[c]);
                    g++
                  )
                    d.push('\\s*\\[([^\\]]+)\\]'),
                      m.push('$' + (g + 1) + '*t' + c + 'b' + g);
                  if (
                    ((l = new RegExp(d.join(''), 'g')),
                    (u = m.join('+')),
                    'generic' === n[c])
                  )
                    throw new Error(
                      'cwise: Generic arrays not supported in combination with blocks!'
                    );
                  r = r.replace(l, [p, '[', u, ']'].join(''));
                }
                break;
              case 'scalar':
                r = r.replace(l, 'Y' + t.scalarArgs.indexOf(a));
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
      function a(e) {
        for (var t = new Array(e.length), n = !0, r = 0; r < e.length; ++r) {
          var i = e[r],
            o = i.match(/\d+/);
          (o = o ? o[0] : ''),
            0 === i.charAt(0)
              ? (t[r] = 'u' + i.charAt(1) + o)
              : (t[r] = i.charAt(0) + o),
            r > 0 && (n = n && t[r] === t[r - 1]);
        }
        return n ? t[0] : t.join('');
      }
      e.exports = function(e, t) {
        for (
          var n = (t[1].length - Math.abs(e.arrayBlockIndices[0])) | 0,
            s = new Array(e.arrayArgs.length),
            l = new Array(e.arrayArgs.length),
            u = 0;
          u < e.arrayArgs.length;
          ++u
        )
          (l[u] = t[2 * u]), (s[u] = t[2 * u + 1]);
        var c = [],
          h = [],
          f = [],
          p = [],
          d = [];
        for (u = 0; u < e.arrayArgs.length; ++u) {
          e.arrayBlockIndices[u] < 0
            ? (f.push(0),
              p.push(n),
              c.push(n),
              h.push(n + e.arrayBlockIndices[u]))
            : (f.push(e.arrayBlockIndices[u]),
              p.push(e.arrayBlockIndices[u] + n),
              c.push(0),
              h.push(e.arrayBlockIndices[u]));
          for (var m = [], g = 0; g < s[u].length; g++)
            f[u] <= s[u][g] && s[u][g] < p[u] && m.push(s[u][g] - f[u]);
          d.push(m);
        }
        var v = ['SS'],
          _ = ["'use strict'"],
          y = [];
        for (g = 0; g < n; ++g) y.push(['s', g, '=SS[', g, ']'].join(''));
        for (u = 0; u < e.arrayArgs.length; ++u) {
          for (
            v.push('a' + u), v.push('t' + u), v.push('p' + u), g = 0;
            g < n;
            ++g
          )
            y.push(['t', u, 'p', g, '=t', u, '[', f[u] + g, ']'].join(''));
          for (g = 0; g < Math.abs(e.arrayBlockIndices[u]); ++g)
            y.push(['t', u, 'b', g, '=t', u, '[', c[u] + g, ']'].join(''));
        }
        for (u = 0; u < e.scalarArgs.length; ++u) v.push('Y' + u);
        if (
          (e.shapeArgs.length > 0 && y.push('shape=SS.slice(0)'),
          e.indexArgs.length > 0)
        ) {
          var T = new Array(n);
          for (u = 0; u < n; ++u) T[u] = '0';
          y.push(['index=[', T.join(','), ']'].join(''));
        }
        for (u = 0; u < e.offsetArgs.length; ++u) {
          var b = e.offsetArgs[u],
            x = [];
          for (g = 0; g < b.offset.length; ++g)
            0 !== b.offset[g] &&
              (1 === b.offset[g]
                ? x.push(['t', b.array, 'p', g].join(''))
                : x.push([b.offset[g], '*t', b.array, 'p', g].join('')));
          0 === x.length
            ? y.push('q' + u + '=0')
            : y.push(['q', u, '=', x.join('+')].join(''));
        }
        var w = r(
          []
            .concat(e.pre.thisVars)
            .concat(e.body.thisVars)
            .concat(e.post.thisVars)
        );
        for (
          (y = y.concat(w)).length > 0 && _.push('var ' + y.join(',')), u = 0;
          u < e.arrayArgs.length;
          ++u
        )
          _.push('p' + u + '|=0');
        e.pre.body.length > 3 && _.push(o(e.pre, e, l));
        var E = o(e.body, e, l),
          A = (function(e) {
            for (var t = 0, n = e[0].length; t < n; ) {
              for (var r = 1; r < e.length; ++r)
                if (e[r][t] !== e[0][t]) return t;
              ++t;
            }
            return t;
          })(d);
        A < n
          ? _.push(
              (function(e, t, n, r) {
                for (
                  var o = t.length,
                    a = n.arrayArgs.length,
                    s = n.blockSize,
                    l = n.indexArgs.length > 0,
                    u = [],
                    c = 0;
                  c < a;
                  ++c
                )
                  u.push(['var offset', c, '=p', c].join(''));
                for (c = e; c < o; ++c)
                  u.push(
                    ['for(var j' + c + '=SS[', t[c], ']|0;j', c, '>0;){'].join(
                      ''
                    )
                  ),
                    u.push(['if(j', c, '<', s, '){'].join('')),
                    u.push(['s', t[c], '=j', c].join('')),
                    u.push(['j', c, '=0'].join('')),
                    u.push(['}else{s', t[c], '=', s].join('')),
                    u.push(['j', c, '-=', s, '}'].join('')),
                    l && u.push(['index[', t[c], ']=j', c].join(''));
                for (c = 0; c < a; ++c) {
                  for (var h = ['offset' + c], f = e; f < o; ++f)
                    h.push(['j', f, '*t', c, 'p', t[f]].join(''));
                  u.push(['p', c, '=(', h.join('+'), ')'].join(''));
                }
                for (u.push(i(t, n, r)), c = e; c < o; ++c) u.push('}');
                return u.join('\n');
              })(A, d[0], e, E)
            )
          : _.push(i(d[0], e, E)),
          e.post.body.length > 3 && _.push(o(e.post, e, l)),
          e.debug &&
            console.log(
              '-----Generated cwise routine for ',
              t,
              ':\n' + _.join('\n') + '\n----------'
            );
        var C = [
          e.funcName || 'unnamed',
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
    VADU: function(e, t, n) {
      'use strict';
      (t.unquoteString = function(e) {
        var t = /^"(.*)"$/,
          n = /^'(.*)'$/;
        return t.test(e)
          ? e.replace(t, '$1')
          : n.test(e)
          ? e.replace(n, '$1')
          : e;
      }),
        (t.rulesForCssText = function(e) {
          var t,
            n = document.implementation.createHTMLDocument(''),
            r = document.createElement('style');
          return (
            (r.textContent = e),
            n.body.appendChild(r),
            (t = r.sheet.cssRules),
            Array.prototype.slice.call(t)
          );
        }),
        (t.cssRulesToText = function(e) {
          return e.reduce(function(e, t) {
            return e + t.cssText;
          }, '');
        }),
        (t.exchangeRule = function(e, n, r) {
          var i = e.indexOf(n);
          e[i] = t.rulesForCssText(r)[0];
        }),
        (t.changeFontFaceRuleSrc = function(e, n, r) {
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
            t.exchangeRule(e, n, i);
        });
    },
    'VR/X': function(e, t, n) {
      'use strict';
      var r = n('XpGV'),
        i = function(e) {
          return Array.prototype.slice.call(e);
        };
      t.inline = function(e, t) {
        var n,
          o = i(e.getElementsByTagName('img')),
          a = i(e.getElementsByTagName('image')),
          s =
            ((n = e.getElementsByTagName('input')),
            Array.prototype.filter.call(n, function(e) {
              return 'image' === e.type;
            })),
          l = (function(e) {
            return e.filter(function(e) {
              var t = null;
              return (
                e.hasAttribute('src')
                  ? (t = e.getAttribute('src'))
                  : e.hasAttributeNS('http://www.w3.org/1999/xlink', 'href')
                  ? (t = e.getAttributeNS(
                      'http://www.w3.org/1999/xlink',
                      'href'
                    ))
                  : e.hasAttribute('href') && (t = e.getAttribute('href')),
                null !== t && !r.isDataUri(t)
              );
            });
          })((o = (o = o.concat(a)).concat(s)));
        return r.collectAndReportErrors(
          l.map(function(e) {
            return (function(e, t) {
              var n = null;
              e.hasAttribute('src')
                ? (n = e.getAttribute('src'))
                : e.hasAttributeNS('http://www.w3.org/1999/xlink', 'href')
                ? (n = e.getAttributeNS('http://www.w3.org/1999/xlink', 'href'))
                : e.hasAttribute('href') && (n = e.getAttribute('href'));
              var i = r.getDocumentBaseUrl(e.ownerDocument),
                o = r.clone(t);
              return (
                !o.baseUrl && i && (o.baseUrl = i),
                r.getDataURIForImageURL(n, o).then(
                  function(e) {
                    return e;
                  },
                  function(e) {
                    throw {
                      resourceType: 'image',
                      url: e.url,
                      msg: 'Unable to load image ' + e.url
                    };
                  }
                )
              );
            })(e, t).then(function(t) {
              e.attributes.src
                ? (e.attributes.src.value = t)
                : e.attributes['xlink:href']
                ? (e.attributes['xlink:href'].value = t)
                : e.attributes.href && (e.attributes.href.value = t);
            });
          })
        );
      };
    },
    WFqU: function(e, t, n) {
      (function(t) {
        var n = 'object' == typeof t && t && t.Object === Object && t;
        e.exports = n;
      }.call(this, n('yLpj')));
    },
    XpGV: function(e, t, n) {
      'use strict';
      var r = n('CxY0');
      (t.getDocumentBaseUrl = function(e) {
        return 'about:blank' !== e.baseURI ? e.baseURI : null;
      }),
        (t.clone = function(e) {
          var t,
            n = {};
          for (t in e) e.hasOwnProperty(t) && (n[t] = e[t]);
          return n;
        }),
        (t.cloneArray = function(e) {
          return Array.prototype.slice.apply(e, [0]);
        }),
        (t.joinUrl = function(e, t) {
          return e ? r.resolve(e, t) : t;
        }),
        (t.isDataUri = function(e) {
          return /^data:/.test(e);
        }),
        (t.collectAndReportErrors = function(e) {
          var t = [];
          return Promise.all(
            e.map(function(e) {
              return e.catch(function(e) {
                t.push(e);
              });
            })
          ).then(function() {
            return t;
          });
        });
      var i = null;
      (t.ajax = function(e, n) {
        return new Promise(function(r, o) {
          var a,
            s = new window.XMLHttpRequest(),
            l = t.joinUrl(n.baseUrl, e),
            u = function() {
              o({ msg: 'Unable to load url', url: l });
            };
          (a = (function(e, t) {
            return !1 === t || 'none' === t || 'repeated' === t
              ? ((null !== i && 'repeated' === t) || (i = Date.now()),
                e + '?_=' + i)
              : e;
          })(l, n.cache)),
            s.addEventListener(
              'load',
              function() {
                200 === s.status || 0 === s.status ? r(s.response) : u();
              },
              !1
            ),
            s.addEventListener('error', u, !1);
          try {
            s.open('GET', a, !0), s.overrideMimeType(n.mimeType), s.send(null);
          } catch (e) {
            u();
          }
        });
      }),
        (t.binaryAjax = function(e, n) {
          var r = t.clone(n);
          return (
            (r.mimeType = 'text/plain; charset=x-user-defined'),
            t.ajax(e, r).then(function(e) {
              for (var t = '', n = 0; n < e.length; n++)
                t += String.fromCharCode(255 & e.charCodeAt(n));
              return t;
            })
          );
        });
      t.getDataURIForImageURL = function(e, n) {
        return t.binaryAjax(e, n).then(function(e) {
          var t = btoa(e);
          return (
            'data:' +
            (function(e) {
              var t = function(e, t) {
                return e.substring(0, t.length) === t;
              };
              return t(e, '<?xml') || t(e, '<svg')
                ? 'image/svg+xml'
                : 'image/png';
            })(e) +
            ';base64,' +
            t
          );
        });
      };
      var o = [],
        a = function(e) {
          return o.indexOf(e) < 0 && o.push(e), o.indexOf(e);
        };
      t.memoize = function(e, t, n) {
        if ('object' != typeof n)
          throw new Error('cacheBucket is not an object');
        return function() {
          var r,
            i = Array.prototype.slice.call(arguments),
            o = t(i),
            s = a(e);
          return n[s] && n[s][o]
            ? n[s][o]
            : ((r = e.apply(null, i)), (n[s] = n[s] || {}), (n[s][o] = r), r);
        };
      };
    },
    Xs3h: function(e, t) {
      e.exports = [
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
    YYSD: function(e, t, n) {
      'use strict';
      var r = n('XpGV'),
        i = n('VR/X'),
        o = n('g+oV'),
        a = n('6ozI'),
        s = n('VADU'),
        l = function(e) {
          return e.map(function(t, n) {
            var i;
            return (
              n === e.length - 1 &&
                (t = { baseUrl: ((i = t.baseUrl), r.joinUrl(i, '.')) }),
              JSON.stringify(t)
            );
          });
        },
        u = function(e, t) {
          return !1 !== t.cache && 'none' !== t.cache && t.cacheBucket
            ? r.memoize(e, l, t.cacheBucket)
            : e;
        },
        c = function(e, t, n) {
          var r = s.rulesForCssText(e);
          return a.loadCSSImportsForRules(r, t, n).then(function(t) {
            return a.loadAndInlineCSSResourcesForRules(r, n).then(function(n) {
              var i = t.errors.concat(n.errors),
                o = t.hasChanges || n.hasChanges;
              return (
                o && (e = s.cssRulesToText(r)),
                { hasChanges: o, content: e, errors: i }
              );
            });
          });
        };
      t.loadAndInlineStyles = function(e, t) {
        var n,
          i = (function(e) {
            var t = e.getElementsByTagName('style');
            return Array.prototype.filter.call(t, function(e) {
              return (
                !e.attributes.type || 'text/css' === e.attributes.type.value
              );
            });
          })(e),
          o = [],
          a = [];
        return (
          ((n = r.clone(t)).baseUrl = n.baseUrl || r.getDocumentBaseUrl(e)),
          Promise.all(
            i.map(function(e) {
              return (function(e, t, n) {
                var i = e.textContent;
                return u(c, t)(i, n, t).then(function(t) {
                  return (
                    t.hasChanges && (e.childNodes[0].nodeValue = t.content),
                    r.cloneArray(t.errors)
                  );
                });
              })(e, n, a).then(function(e) {
                o = o.concat(e);
              });
            })
          ).then(function() {
            return o;
          })
        );
      };
      var h = function(e, t) {
        return r
          .ajax(e, t)
          .then(function(e) {
            return { content: e, cssRules: s.rulesForCssText(e) };
          })
          .then(function(t) {
            var n = a.adjustPathsOfCssResources(e, t.cssRules);
            return { content: t.content, cssRules: t.cssRules, hasChanges: n };
          })
          .then(function(e) {
            return a
              .loadCSSImportsForRules(e.cssRules, [], t)
              .then(function(t) {
                return {
                  content: e.content,
                  cssRules: e.cssRules,
                  hasChanges: e.hasChanges || t.hasChanges,
                  errors: t.errors
                };
              });
          })
          .then(function(e) {
            return a
              .loadAndInlineCSSResourcesForRules(e.cssRules, t)
              .then(function(t) {
                return {
                  content: e.content,
                  cssRules: e.cssRules,
                  hasChanges: e.hasChanges || t.hasChanges,
                  errors: e.errors.concat(t.errors)
                };
              });
          })
          .then(function(e) {
            var t = e.content;
            return (
              e.hasChanges && (t = s.cssRulesToText(e.cssRules)),
              { content: t, errors: e.errors }
            );
          });
      };
      (t.loadAndInlineCssLinks = function(e, t) {
        var n = (function(e) {
            var t = e.getElementsByTagName('link');
            return Array.prototype.filter.call(t, function(e) {
              return (
                e.attributes.rel &&
                'stylesheet' === e.attributes.rel.value &&
                (!e.attributes.type || 'text/css' === e.attributes.type.value)
              );
            });
          })(e),
          i = [];
        return Promise.all(
          n.map(function(e) {
            return (function(e, t) {
              var n = e.attributes.href.value,
                i = r.getDocumentBaseUrl(e.ownerDocument),
                o = r.clone(t);
              return (
                !o.baseUrl && i && (o.baseUrl = i),
                u(h, t)(n, o).then(function(e) {
                  return { content: e.content, errors: r.cloneArray(e.errors) };
                })
              );
            })(e, t).then(
              function(t) {
                var n, r, o, a;
                (n = e),
                  (r = t.content + '\n'),
                  (a = n.parentNode),
                  (r = r.trim()) &&
                    (((o = n.ownerDocument.createElement('style')).type =
                      'text/css'),
                    o.appendChild(n.ownerDocument.createTextNode(r)),
                    a.insertBefore(o, n)),
                  a.removeChild(n),
                  (i = i.concat(t.errors));
              },
              function(e) {
                i.push({
                  resourceType: 'stylesheet',
                  url: e.url,
                  msg: 'Unable to load stylesheet ' + e.url
                });
              }
            );
          })
        ).then(function() {
          return i;
        });
      }),
        (t.loadAndInlineImages = i.inline),
        (t.loadAndInlineScript = o.inline),
        (t.inlineReferences = function(e, n) {
          var r = [],
            i = [
              t.loadAndInlineImages,
              t.loadAndInlineStyles,
              t.loadAndInlineCssLinks
            ];
          return (
            !1 !== n.inlineScripts && i.push(t.loadAndInlineScript),
            Promise.all(
              i.map(function(t) {
                return t(e, n).then(function(e) {
                  r = r.concat(e);
                });
              })
            ).then(function() {
              return r;
            })
          );
        });
    },
    YisV: function(e, t, n) {
      (function(r) {
        var i, o, a;
        /*! Magnific Popup - v1.1.0 - 2016-02-20
         * http://dimsemenov.com/plugins/magnific-popup/
         * Copyright (c) 2016 Dmitry Semenov; */ (o = [n('EVdn')]),
          void 0 ===
            (a =
              'function' ==
              typeof (i = function(e) {
                var t,
                  n,
                  i,
                  o,
                  a,
                  s,
                  l = function() {},
                  u = !!r,
                  c = e(window),
                  h = function(e, n) {
                    t.ev.on('mfp' + e + '.mfp', n);
                  },
                  f = function(t, n, r, i) {
                    var o = document.createElement('div');
                    return (
                      (o.className = 'mfp-' + t),
                      r && (o.innerHTML = r),
                      i
                        ? n && n.appendChild(o)
                        : ((o = e(o)), n && o.appendTo(n)),
                      o
                    );
                  },
                  p = function(n, r) {
                    t.ev.triggerHandler('mfp' + n, r),
                      t.st.callbacks &&
                        ((n = n.charAt(0).toLowerCase() + n.slice(1)),
                        t.st.callbacks[n] &&
                          t.st.callbacks[n].apply(t, e.isArray(r) ? r : [r]));
                  },
                  d = function(n) {
                    return (
                      (n === s && t.currTemplate.closeBtn) ||
                        ((t.currTemplate.closeBtn = e(
                          t.st.closeMarkup.replace('%title%', t.st.tClose)
                        )),
                        (s = n)),
                      t.currTemplate.closeBtn
                    );
                  },
                  m = function() {
                    e.magnificPopup.instance ||
                      ((t = new l()).init(), (e.magnificPopup.instance = t));
                  };
                (l.prototype = {
                  constructor: l,
                  init: function() {
                    var n = navigator.appVersion;
                    (t.isLowIE = t.isIE8 =
                      document.all && !document.addEventListener),
                      (t.isAndroid = /android/gi.test(n)),
                      (t.isIOS = /iphone|ipad|ipod/gi.test(n)),
                      (t.supportsTransition = (function() {
                        var e = document.createElement('p').style,
                          t = ['ms', 'O', 'Moz', 'Webkit'];
                        if (void 0 !== e.transition) return !0;
                        for (; t.length; )
                          if (t.pop() + 'Transition' in e) return !0;
                        return !1;
                      })()),
                      (t.probablyMobile =
                        t.isAndroid ||
                        t.isIOS ||
                        /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(
                          navigator.userAgent
                        )),
                      (i = e(document)),
                      (t.popupsCache = {});
                  },
                  open: function(n) {
                    var r;
                    if (!1 === n.isObj) {
                      (t.items = n.items.toArray()), (t.index = 0);
                      var o,
                        s = n.items;
                      for (r = 0; r < s.length; r++)
                        if (
                          ((o = s[r]).parsed && (o = o.el[0]), o === n.el[0])
                        ) {
                          t.index = r;
                          break;
                        }
                    } else
                      (t.items = e.isArray(n.items) ? n.items : [n.items]),
                        (t.index = n.index || 0);
                    if (!t.isOpen) {
                      (t.types = []),
                        (a = ''),
                        n.mainEl && n.mainEl.length
                          ? (t.ev = n.mainEl.eq(0))
                          : (t.ev = i),
                        n.key
                          ? (t.popupsCache[n.key] ||
                              (t.popupsCache[n.key] = {}),
                            (t.currTemplate = t.popupsCache[n.key]))
                          : (t.currTemplate = {}),
                        (t.st = e.extend(!0, {}, e.magnificPopup.defaults, n)),
                        (t.fixedContentPos =
                          'auto' === t.st.fixedContentPos
                            ? !t.probablyMobile
                            : t.st.fixedContentPos),
                        t.st.modal &&
                          ((t.st.closeOnContentClick = !1),
                          (t.st.closeOnBgClick = !1),
                          (t.st.showCloseBtn = !1),
                          (t.st.enableEscapeKey = !1)),
                        t.bgOverlay ||
                          ((t.bgOverlay = f('bg').on('click.mfp', function() {
                            t.close();
                          })),
                          (t.wrap = f('wrap')
                            .attr('tabindex', -1)
                            .on('click.mfp', function(e) {
                              t._checkIfClose(e.target) && t.close();
                            })),
                          (t.container = f('container', t.wrap))),
                        (t.contentContainer = f('content')),
                        t.st.preloader &&
                          (t.preloader = f(
                            'preloader',
                            t.container,
                            t.st.tLoading
                          ));
                      var l = e.magnificPopup.modules;
                      for (r = 0; r < l.length; r++) {
                        var u = l[r];
                        (u = u.charAt(0).toUpperCase() + u.slice(1)),
                          t['init' + u].call(t);
                      }
                      p('BeforeOpen'),
                        t.st.showCloseBtn &&
                          (t.st.closeBtnInside
                            ? (h('MarkupParse', function(e, t, n, r) {
                                n.close_replaceWith = d(r.type);
                              }),
                              (a += ' mfp-close-btn-in'))
                            : t.wrap.append(d())),
                        t.st.alignTop && (a += ' mfp-align-top'),
                        t.fixedContentPos
                          ? t.wrap.css({
                              overflow: t.st.overflowY,
                              overflowX: 'hidden',
                              overflowY: t.st.overflowY
                            })
                          : t.wrap.css({
                              top: c.scrollTop(),
                              position: 'absolute'
                            }),
                        (!1 === t.st.fixedBgPos ||
                          ('auto' === t.st.fixedBgPos && !t.fixedContentPos)) &&
                          t.bgOverlay.css({
                            height: i.height(),
                            position: 'absolute'
                          }),
                        t.st.enableEscapeKey &&
                          i.on('keyup.mfp', function(e) {
                            27 === e.keyCode && t.close();
                          }),
                        c.on('resize.mfp', function() {
                          t.updateSize();
                        }),
                        t.st.closeOnContentClick || (a += ' mfp-auto-cursor'),
                        a && t.wrap.addClass(a);
                      var m = (t.wH = c.height()),
                        g = {};
                      if (t.fixedContentPos && t._hasScrollBar(m)) {
                        var v = t._getScrollbarSize();
                        v && (g.marginRight = v);
                      }
                      t.fixedContentPos &&
                        (t.isIE7
                          ? e('body, html').css('overflow', 'hidden')
                          : (g.overflow = 'hidden'));
                      var _ = t.st.mainClass;
                      return (
                        t.isIE7 && (_ += ' mfp-ie7'),
                        _ && t._addClassToMFP(_),
                        t.updateItemHTML(),
                        p('BuildControls'),
                        e('html').css(g),
                        t.bgOverlay
                          .add(t.wrap)
                          .prependTo(t.st.prependTo || e(document.body)),
                        (t._lastFocusedEl = document.activeElement),
                        setTimeout(function() {
                          t.content
                            ? (t._addClassToMFP('mfp-ready'), t._setFocus())
                            : t.bgOverlay.addClass('mfp-ready'),
                            i.on('focusin.mfp', t._onFocusIn);
                        }, 16),
                        (t.isOpen = !0),
                        t.updateSize(m),
                        p('Open'),
                        n
                      );
                    }
                    t.updateItemHTML();
                  },
                  close: function() {
                    t.isOpen &&
                      (p('BeforeClose'),
                      (t.isOpen = !1),
                      t.st.removalDelay && !t.isLowIE && t.supportsTransition
                        ? (t._addClassToMFP('mfp-removing'),
                          setTimeout(function() {
                            t._close();
                          }, t.st.removalDelay))
                        : t._close());
                  },
                  _close: function() {
                    p('Close');
                    var n = 'mfp-removing mfp-ready ';
                    if (
                      (t.bgOverlay.detach(),
                      t.wrap.detach(),
                      t.container.empty(),
                      t.st.mainClass && (n += t.st.mainClass + ' '),
                      t._removeClassFromMFP(n),
                      t.fixedContentPos)
                    ) {
                      var r = { marginRight: '' };
                      t.isIE7
                        ? e('body, html').css('overflow', '')
                        : (r.overflow = ''),
                        e('html').css(r);
                    }
                    i.off('keyup.mfp focusin.mfp'),
                      t.ev.off('.mfp'),
                      t.wrap.attr('class', 'mfp-wrap').removeAttr('style'),
                      t.bgOverlay.attr('class', 'mfp-bg'),
                      t.container.attr('class', 'mfp-container'),
                      !t.st.showCloseBtn ||
                        (t.st.closeBtnInside &&
                          !0 !== t.currTemplate[t.currItem.type]) ||
                        (t.currTemplate.closeBtn &&
                          t.currTemplate.closeBtn.detach()),
                      t.st.autoFocusLast &&
                        t._lastFocusedEl &&
                        e(t._lastFocusedEl).focus(),
                      (t.currItem = null),
                      (t.content = null),
                      (t.currTemplate = null),
                      (t.prevHeight = 0),
                      p('AfterClose');
                  },
                  updateSize: function(e) {
                    if (t.isIOS) {
                      var n =
                          document.documentElement.clientWidth /
                          window.innerWidth,
                        r = window.innerHeight * n;
                      t.wrap.css('height', r), (t.wH = r);
                    } else t.wH = e || c.height();
                    t.fixedContentPos || t.wrap.css('height', t.wH),
                      p('Resize');
                  },
                  updateItemHTML: function() {
                    var n = t.items[t.index];
                    t.contentContainer.detach(),
                      t.content && t.content.detach(),
                      n.parsed || (n = t.parseEl(t.index));
                    var r = n.type;
                    if (
                      (p('BeforeChange', [
                        t.currItem ? t.currItem.type : '',
                        r
                      ]),
                      (t.currItem = n),
                      !t.currTemplate[r])
                    ) {
                      var i = !!t.st[r] && t.st[r].markup;
                      p('FirstMarkupParse', i),
                        (t.currTemplate[r] = !i || e(i));
                    }
                    o &&
                      o !== n.type &&
                      t.container.removeClass('mfp-' + o + '-holder');
                    var a = t['get' + r.charAt(0).toUpperCase() + r.slice(1)](
                      n,
                      t.currTemplate[r]
                    );
                    t.appendContent(a, r),
                      (n.preloaded = !0),
                      p('Change', n),
                      (o = n.type),
                      t.container.prepend(t.contentContainer),
                      p('AfterChange');
                  },
                  appendContent: function(e, n) {
                    (t.content = e),
                      e
                        ? t.st.showCloseBtn &&
                          t.st.closeBtnInside &&
                          !0 === t.currTemplate[n]
                          ? t.content.find('.mfp-close').length ||
                            t.content.append(d())
                          : (t.content = e)
                        : (t.content = ''),
                      p('BeforeAppend'),
                      t.container.addClass('mfp-' + n + '-holder'),
                      t.contentContainer.append(t.content);
                  },
                  parseEl: function(n) {
                    var r,
                      i = t.items[n];
                    if (
                      (i.tagName
                        ? (i = { el: e(i) })
                        : ((r = i.type), (i = { data: i, src: i.src })),
                      i.el)
                    ) {
                      for (var o = t.types, a = 0; a < o.length; a++)
                        if (i.el.hasClass('mfp-' + o[a])) {
                          r = o[a];
                          break;
                        }
                      (i.src = i.el.attr('data-mfp-src')),
                        i.src || (i.src = i.el.attr('href'));
                    }
                    return (
                      (i.type = r || t.st.type || 'inline'),
                      (i.index = n),
                      (i.parsed = !0),
                      (t.items[n] = i),
                      p('ElementParse', i),
                      t.items[n]
                    );
                  },
                  addGroup: function(e, n) {
                    var r = function(r) {
                      (r.mfpEl = this), t._openClick(r, e, n);
                    };
                    n || (n = {});
                    var i = 'click.magnificPopup';
                    (n.mainEl = e),
                      n.items
                        ? ((n.isObj = !0), e.off(i).on(i, r))
                        : ((n.isObj = !1),
                          n.delegate
                            ? e.off(i).on(i, n.delegate, r)
                            : ((n.items = e), e.off(i).on(i, r)));
                  },
                  _openClick: function(n, r, i) {
                    var o =
                      void 0 !== i.midClick
                        ? i.midClick
                        : e.magnificPopup.defaults.midClick;
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
                          : e.magnificPopup.defaults.disableOn;
                      if (a)
                        if (e.isFunction(a)) {
                          if (!a.call(t)) return !0;
                        } else if (c.width() < a) return !0;
                      n.type &&
                        (n.preventDefault(), t.isOpen && n.stopPropagation()),
                        (i.el = e(n.mfpEl)),
                        i.delegate && (i.items = r.find(i.delegate)),
                        t.open(i);
                    }
                  },
                  updateStatus: function(e, r) {
                    if (t.preloader) {
                      n !== e && t.container.removeClass('mfp-s-' + n),
                        r || 'loading' !== e || (r = t.st.tLoading);
                      var i = { status: e, text: r };
                      p('UpdateStatus', i),
                        (e = i.status),
                        (r = i.text),
                        t.preloader.html(r),
                        t.preloader.find('a').on('click', function(e) {
                          e.stopImmediatePropagation();
                        }),
                        t.container.addClass('mfp-s-' + e),
                        (n = e);
                    }
                  },
                  _checkIfClose: function(n) {
                    if (!e(n).hasClass('mfp-prevent-close')) {
                      var r = t.st.closeOnContentClick,
                        i = t.st.closeOnBgClick;
                      if (r && i) return !0;
                      if (
                        !t.content ||
                        e(n).hasClass('mfp-close') ||
                        (t.preloader && n === t.preloader[0])
                      )
                        return !0;
                      if (n === t.content[0] || e.contains(t.content[0], n)) {
                        if (r) return !0;
                      } else if (i && e.contains(document, n)) return !0;
                      return !1;
                    }
                  },
                  _addClassToMFP: function(e) {
                    t.bgOverlay.addClass(e), t.wrap.addClass(e);
                  },
                  _removeClassFromMFP: function(e) {
                    this.bgOverlay.removeClass(e), t.wrap.removeClass(e);
                  },
                  _hasScrollBar: function(e) {
                    return (
                      (t.isIE7 ? i.height() : document.body.scrollHeight) >
                      (e || c.height())
                    );
                  },
                  _setFocus: function() {
                    (t.st.focus
                      ? t.content.find(t.st.focus).eq(0)
                      : t.wrap
                    ).focus();
                  },
                  _onFocusIn: function(n) {
                    if (
                      n.target !== t.wrap[0] &&
                      !e.contains(t.wrap[0], n.target)
                    )
                      return t._setFocus(), !1;
                  },
                  _parseMarkup: function(t, n, r) {
                    var i;
                    r.data && (n = e.extend(r.data, n)),
                      p('MarkupParse', [t, n, r]),
                      e.each(n, function(n, r) {
                        if (void 0 === r || !1 === r) return !0;
                        if ((i = n.split('_')).length > 1) {
                          var o = t.find('.mfp-' + i[0]);
                          if (o.length > 0) {
                            var a = i[1];
                            'replaceWith' === a
                              ? o[0] !== r[0] && o.replaceWith(r)
                              : 'img' === a
                              ? o.is('img')
                                ? o.attr('src', r)
                                : o.replaceWith(
                                    e('<img>')
                                      .attr('src', r)
                                      .attr('class', o.attr('class'))
                                  )
                              : o.attr(i[1], r);
                          }
                        } else t.find('.mfp-' + n).html(r);
                      });
                  },
                  _getScrollbarSize: function() {
                    if (void 0 === t.scrollbarSize) {
                      var e = document.createElement('div');
                      (e.style.cssText =
                        'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;'),
                        document.body.appendChild(e),
                        (t.scrollbarSize = e.offsetWidth - e.clientWidth),
                        document.body.removeChild(e);
                    }
                    return t.scrollbarSize;
                  }
                }),
                  (e.magnificPopup = {
                    instance: null,
                    proto: l.prototype,
                    modules: [],
                    open: function(t, n) {
                      return (
                        m(),
                        ((t = t ? e.extend(!0, {}, t) : {}).isObj = !0),
                        (t.index = n || 0),
                        this.instance.open(t)
                      );
                    },
                    close: function() {
                      return (
                        e.magnificPopup.instance &&
                        e.magnificPopup.instance.close()
                      );
                    },
                    registerModule: function(t, n) {
                      n.options && (e.magnificPopup.defaults[t] = n.options),
                        e.extend(this.proto, n.proto),
                        this.modules.push(t);
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
                  (e.fn.magnificPopup = function(n) {
                    m();
                    var r = e(this);
                    if ('string' == typeof n)
                      if ('open' === n) {
                        var i,
                          o = u ? r.data('magnificPopup') : r[0].magnificPopup,
                          a = parseInt(arguments[1], 10) || 0;
                        o.items
                          ? (i = o.items[a])
                          : ((i = r),
                            o.delegate && (i = i.find(o.delegate)),
                            (i = i.eq(a))),
                          t._openClick({ mfpEl: i }, r, o);
                      } else
                        t.isOpen &&
                          t[n].apply(
                            t,
                            Array.prototype.slice.call(arguments, 1)
                          );
                    else
                      (n = e.extend(!0, {}, n)),
                        u
                          ? r.data('magnificPopup', n)
                          : (r[0].magnificPopup = n),
                        t.addGroup(r, n);
                    return r;
                  });
                var g,
                  v,
                  _,
                  y = function() {
                    _ && (v.after(_.addClass(g)).detach(), (_ = null));
                  };
                e.magnificPopup.registerModule('inline', {
                  options: {
                    hiddenClass: 'hide',
                    markup: '',
                    tNotFound: 'Content not found'
                  },
                  proto: {
                    initInline: function() {
                      t.types.push('inline'),
                        h('Close.inline', function() {
                          y();
                        });
                    },
                    getInline: function(n, r) {
                      if ((y(), n.src)) {
                        var i = t.st.inline,
                          o = e(n.src);
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
                            t.updateStatus('ready');
                        } else
                          t.updateStatus('error', i.tNotFound),
                            (o = e('<div>'));
                        return (n.inlineElement = o), o;
                      }
                      return (
                        t.updateStatus('ready'), t._parseMarkup(r, {}, n), r
                      );
                    }
                  }
                });
                var T,
                  b = function() {
                    T && e(document.body).removeClass(T);
                  },
                  x = function() {
                    b(), t.req && t.req.abort();
                  };
                e.magnificPopup.registerModule('ajax', {
                  options: {
                    settings: null,
                    cursor: 'mfp-ajax-cur',
                    tError:
                      '<a href="%url%">The content</a> could not be loaded.'
                  },
                  proto: {
                    initAjax: function() {
                      t.types.push('ajax'),
                        (T = t.st.ajax.cursor),
                        h('Close.ajax', x),
                        h('BeforeChange.ajax', x);
                    },
                    getAjax: function(n) {
                      T && e(document.body).addClass(T),
                        t.updateStatus('loading');
                      var r = e.extend(
                        {
                          url: n.src,
                          success: function(r, i, o) {
                            var a = { data: r, xhr: o };
                            p('ParseAjax', a),
                              t.appendContent(e(a.data), 'ajax'),
                              (n.finished = !0),
                              b(),
                              t._setFocus(),
                              setTimeout(function() {
                                t.wrap.addClass('mfp-ready');
                              }, 16),
                              t.updateStatus('ready'),
                              p('AjaxContentAdded');
                          },
                          error: function() {
                            b(),
                              (n.finished = n.loadError = !0),
                              t.updateStatus(
                                'error',
                                t.st.ajax.tError.replace('%url%', n.src)
                              );
                          }
                        },
                        t.st.ajax.settings
                      );
                      return (t.req = e.ajax(r)), '';
                    }
                  }
                });
                var w,
                  E,
                  A = function(n) {
                    if (n.data && void 0 !== n.data.title) return n.data.title;
                    var r = t.st.image.titleSrc;
                    if (r) {
                      if (e.isFunction(r)) return r.call(t, n);
                      if (n.el) return n.el.attr(r) || '';
                    }
                    return '';
                  };
                e.magnificPopup.registerModule('image', {
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
                      var n = t.st.image,
                        r = '.image';
                      t.types.push('image'),
                        h('Open' + r, function() {
                          'image' === t.currItem.type &&
                            n.cursor &&
                            e(document.body).addClass(n.cursor);
                        }),
                        h('Close' + r, function() {
                          n.cursor && e(document.body).removeClass(n.cursor),
                            c.off('resize.mfp');
                        }),
                        h('Resize' + r, t.resizeImage),
                        t.isLowIE && h('AfterChange', t.resizeImage);
                    },
                    resizeImage: function() {
                      var e = t.currItem;
                      if (e && e.img && t.st.image.verticalFit) {
                        var n = 0;
                        t.isLowIE &&
                          (n =
                            parseInt(e.img.css('padding-top'), 10) +
                            parseInt(e.img.css('padding-bottom'), 10)),
                          e.img.css('max-height', t.wH - n);
                      }
                    },
                    _onImageHasSize: function(e) {
                      e.img &&
                        ((e.hasSize = !0),
                        w && clearInterval(w),
                        (e.isCheckingImgSize = !1),
                        p('ImageHasSize', e),
                        e.imgHidden &&
                          (t.content && t.content.removeClass('mfp-loading'),
                          (e.imgHidden = !1)));
                    },
                    findImageSize: function(e) {
                      var n = 0,
                        r = e.img[0],
                        i = function(o) {
                          w && clearInterval(w),
                            (w = setInterval(function() {
                              r.naturalWidth > 0
                                ? t._onImageHasSize(e)
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
                                n === t.currItem &&
                                  (t._onImageHasSize(n),
                                  t.updateStatus('ready')),
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
                            n === t.currItem &&
                              (t._onImageHasSize(n),
                              t.updateStatus(
                                'error',
                                s.tError.replace('%url%', n.src)
                              )),
                            (n.hasSize = !0),
                            (n.loaded = !0),
                            (n.loadError = !0));
                        },
                        s = t.st.image,
                        l = r.find('.mfp-img');
                      if (l.length) {
                        var u = document.createElement('img');
                        (u.className = 'mfp-img'),
                          n.el &&
                            n.el.find('img').length &&
                            (u.alt = n.el.find('img').attr('alt')),
                          (n.img = e(u)
                            .on('load.mfploader', o)
                            .on('error.mfploader', a)),
                          (u.src = n.src),
                          l.is('img') && (n.img = n.img.clone()),
                          (u = n.img[0]).naturalWidth > 0
                            ? (n.hasSize = !0)
                            : u.width || (n.hasSize = !1);
                      }
                      return (
                        t._parseMarkup(
                          r,
                          { title: A(n), img_replaceWith: n.img },
                          n
                        ),
                        t.resizeImage(),
                        n.hasSize
                          ? (w && clearInterval(w),
                            n.loadError
                              ? (r.addClass('mfp-loading'),
                                t.updateStatus(
                                  'error',
                                  s.tError.replace('%url%', n.src)
                                ))
                              : (r.removeClass('mfp-loading'),
                                t.updateStatus('ready')),
                            r)
                          : (t.updateStatus('loading'),
                            (n.loading = !0),
                            n.hasSize ||
                              ((n.imgHidden = !0),
                              r.addClass('mfp-loading'),
                              t.findImageSize(n)),
                            r)
                      );
                    }
                  }
                }),
                  e.magnificPopup.registerModule('zoom', {
                    options: {
                      enabled: !1,
                      easing: 'ease-in-out',
                      duration: 300,
                      opener: function(e) {
                        return e.is('img') ? e : e.find('img');
                      }
                    },
                    proto: {
                      initZoom: function() {
                        var e,
                          n = t.st.zoom,
                          r = '.zoom';
                        if (n.enabled && t.supportsTransition) {
                          var i,
                            o,
                            a = n.duration,
                            s = function(e) {
                              var t = e
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
                                t.css(i),
                                t
                              );
                            },
                            l = function() {
                              t.content.css('visibility', 'visible');
                            };
                          h('BuildControls' + r, function() {
                            if (t._allowZoom()) {
                              if (
                                (clearTimeout(i),
                                t.content.css('visibility', 'hidden'),
                                !(e = t._getItemToZoom()))
                              )
                                return void l();
                              (o = s(e)).css(t._getOffset()),
                                t.wrap.append(o),
                                (i = setTimeout(function() {
                                  o.css(t._getOffset(!0)),
                                    (i = setTimeout(function() {
                                      l(),
                                        setTimeout(function() {
                                          o.remove(),
                                            (e = o = null),
                                            p('ZoomAnimationEnded');
                                        }, 16);
                                    }, a));
                                }, 16));
                            }
                          }),
                            h('BeforeClose' + r, function() {
                              if (t._allowZoom()) {
                                if (
                                  (clearTimeout(i), (t.st.removalDelay = a), !e)
                                ) {
                                  if (!(e = t._getItemToZoom())) return;
                                  o = s(e);
                                }
                                o.css(t._getOffset(!0)),
                                  t.wrap.append(o),
                                  t.content.css('visibility', 'hidden'),
                                  setTimeout(function() {
                                    o.css(t._getOffset());
                                  }, 16);
                              }
                            }),
                            h('Close' + r, function() {
                              t._allowZoom() &&
                                (l(), o && o.remove(), (e = null));
                            });
                        }
                      },
                      _allowZoom: function() {
                        return 'image' === t.currItem.type;
                      },
                      _getItemToZoom: function() {
                        return !!t.currItem.hasSize && t.currItem.img;
                      },
                      _getOffset: function(n) {
                        var r,
                          i = (r = n
                            ? t.currItem.img
                            : t.st.zoom.opener(
                                t.currItem.el || t.currItem
                              )).offset(),
                          o = parseInt(r.css('padding-top'), 10),
                          a = parseInt(r.css('padding-bottom'), 10);
                        i.top -= e(window).scrollTop() - o;
                        var s = {
                          width: r.width(),
                          height:
                            (u ? r.innerHeight() : r[0].offsetHeight) - a - o
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
                var C = function(e) {
                  if (t.currTemplate.iframe) {
                    var n = t.currTemplate.iframe.find('iframe');
                    n.length &&
                      (e || (n[0].src = '//about:blank'),
                      t.isIE8 && n.css('display', e ? 'block' : 'none'));
                  }
                };
                e.magnificPopup.registerModule('iframe', {
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
                      t.types.push('iframe'),
                        h('BeforeChange', function(e, t, n) {
                          t !== n &&
                            ('iframe' === t ? C() : 'iframe' === n && C(!0));
                        }),
                        h('Close.iframe', function() {
                          C();
                        });
                    },
                    getIframe: function(n, r) {
                      var i = n.src,
                        o = t.st.iframe;
                      e.each(o.patterns, function() {
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
                        t._parseMarkup(r, a, n),
                        t.updateStatus('ready'),
                        r
                      );
                    }
                  }
                });
                var P = function(e) {
                    var n = t.items.length;
                    return e > n - 1 ? e - n : e < 0 ? n + e : e;
                  },
                  R = function(e, t, n) {
                    return e.replace(/%curr%/gi, t + 1).replace(/%total%/gi, n);
                  };
                e.magnificPopup.registerModule('gallery', {
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
                      var n = t.st.gallery,
                        r = '.mfp-gallery';
                      if (((t.direction = !0), !n || !n.enabled)) return !1;
                      (a += ' mfp-gallery'),
                        h('Open' + r, function() {
                          n.navigateByImgClick &&
                            t.wrap.on('click' + r, '.mfp-img', function() {
                              if (t.items.length > 1) return t.next(), !1;
                            }),
                            i.on('keydown' + r, function(e) {
                              37 === e.keyCode
                                ? t.prev()
                                : 39 === e.keyCode && t.next();
                            });
                        }),
                        h('UpdateStatus' + r, function(e, n) {
                          n.text &&
                            (n.text = R(
                              n.text,
                              t.currItem.index,
                              t.items.length
                            ));
                        }),
                        h('MarkupParse' + r, function(e, r, i, o) {
                          var a = t.items.length;
                          i.counter = a > 1 ? R(n.tCounter, o.index, a) : '';
                        }),
                        h('BuildControls' + r, function() {
                          if (t.items.length > 1 && n.arrows && !t.arrowLeft) {
                            var r = n.arrowMarkup,
                              i = (t.arrowLeft = e(
                                r
                                  .replace(/%title%/gi, n.tPrev)
                                  .replace(/%dir%/gi, 'left')
                              ).addClass('mfp-prevent-close')),
                              o = (t.arrowRight = e(
                                r
                                  .replace(/%title%/gi, n.tNext)
                                  .replace(/%dir%/gi, 'right')
                              ).addClass('mfp-prevent-close'));
                            i.click(function() {
                              t.prev();
                            }),
                              o.click(function() {
                                t.next();
                              }),
                              t.container.append(i.add(o));
                          }
                        }),
                        h('Change' + r, function() {
                          t._preloadTimeout && clearTimeout(t._preloadTimeout),
                            (t._preloadTimeout = setTimeout(function() {
                              t.preloadNearbyImages(),
                                (t._preloadTimeout = null);
                            }, 16));
                        }),
                        h('Close' + r, function() {
                          i.off(r),
                            t.wrap.off('click' + r),
                            (t.arrowRight = t.arrowLeft = null);
                        });
                    },
                    next: function() {
                      (t.direction = !0),
                        (t.index = P(t.index + 1)),
                        t.updateItemHTML();
                    },
                    prev: function() {
                      (t.direction = !1),
                        (t.index = P(t.index - 1)),
                        t.updateItemHTML();
                    },
                    goTo: function(e) {
                      (t.direction = e >= t.index),
                        (t.index = e),
                        t.updateItemHTML();
                    },
                    preloadNearbyImages: function() {
                      var e,
                        n = t.st.gallery.preload,
                        r = Math.min(n[0], t.items.length),
                        i = Math.min(n[1], t.items.length);
                      for (e = 1; e <= (t.direction ? i : r); e++)
                        t._preloadItem(t.index + e);
                      for (e = 1; e <= (t.direction ? r : i); e++)
                        t._preloadItem(t.index - e);
                    },
                    _preloadItem: function(n) {
                      if (((n = P(n)), !t.items[n].preloaded)) {
                        var r = t.items[n];
                        r.parsed || (r = t.parseEl(n)),
                          p('LazyLoad', r),
                          'image' === r.type &&
                            (r.img = e('<img class="mfp-img" />')
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
                  e.magnificPopup.registerModule('retina', {
                    options: {
                      replaceSrc: function(e) {
                        return e.src.replace(/\.\w+$/, function(e) {
                          return '@2x' + e;
                        });
                      },
                      ratio: 1
                    },
                    proto: {
                      initRetina: function() {
                        if (window.devicePixelRatio > 1) {
                          var e = t.st.retina,
                            n = e.ratio;
                          (n = isNaN(n) ? n() : n) > 1 &&
                            (h('ImageHasSize.retina', function(e, t) {
                              t.img.css({
                                'max-width': t.img[0].naturalWidth / n,
                                width: '100%'
                              });
                            }),
                            h('ElementParse.retina', function(t, r) {
                              r.src = e.replaceSrc(r, n);
                            }));
                        }
                      }
                    }
                  }),
                  m();
              })
                ? i.apply(t, o)
                : i) || (e.exports = a);
      }.call(this, n('EVdn')));
    },
    Ytbt: function(e, t, n) {
      'use strict';
      var r = n('QM7d'),
        i = { body: '', args: [], thisVars: [], localVars: [] };
      function o(e) {
        if (!e) return i;
        for (var t = 0; t < e.args.length; ++t) {
          var n = e.args[t];
          e.args[t] =
            0 === t
              ? { name: n, lvalue: !0, rvalue: !!e.rvalue, count: e.count || 1 }
              : { name: n, lvalue: !1, rvalue: !0, count: 1 };
        }
        return (
          e.thisVars || (e.thisVars = []), e.localVars || (e.localVars = []), e
        );
      }
      function a(e) {
        for (var t = [], n = 0; n < e.args.length; ++n) t.push('a' + n);
        return new Function(
          'P',
          [
            'return function ',
            e.funcName,
            '_ndarrayops(',
            t.join(','),
            ') {P(',
            t.join(','),
            ');return a0}'
          ].join('')
        )(
          (function(e) {
            return r({
              args: e.args,
              pre: o(e.pre),
              body: o(e.body),
              post: o(e.proc),
              funcName: e.funcName
            });
          })(e)
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
        for (var e in s) {
          var n = s[e];
          (t[e] = a({
            args: ['array', 'array', 'array'],
            body: { args: ['a', 'b', 'c'], body: 'a=b' + n + 'c' },
            funcName: e
          })),
            (t[e + 'eq'] = a({
              args: ['array', 'array'],
              body: { args: ['a', 'b'], body: 'a' + n + '=b' },
              rvalue: !0,
              funcName: e + 'eq'
            })),
            (t[e + 's'] = a({
              args: ['array', 'array', 'scalar'],
              body: { args: ['a', 'b', 's'], body: 'a=b' + n + 's' },
              funcName: e + 's'
            })),
            (t[e + 'seq'] = a({
              args: ['array', 'scalar'],
              body: { args: ['a', 's'], body: 'a' + n + '=s' },
              rvalue: !0,
              funcName: e + 'seq'
            }));
        }
      })();
      var l = { not: '!', bnot: '~', neg: '-', recip: '1.0/' };
      !(function() {
        for (var e in l) {
          var n = l[e];
          (t[e] = a({
            args: ['array', 'array'],
            body: { args: ['a', 'b'], body: 'a=' + n + 'b' },
            funcName: e
          })),
            (t[e + 'eq'] = a({
              args: ['array'],
              body: { args: ['a'], body: 'a=' + n + 'a' },
              rvalue: !0,
              count: 2,
              funcName: e + 'eq'
            }));
        }
      })();
      var u = {
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
        for (var e in u) {
          var n = u[e];
          (t[e] = a({
            args: ['array', 'array', 'array'],
            body: { args: ['a', 'b', 'c'], body: 'a=b' + n + 'c' },
            funcName: e
          })),
            (t[e + 's'] = a({
              args: ['array', 'array', 'scalar'],
              body: { args: ['a', 'b', 's'], body: 'a=b' + n + 's' },
              funcName: e + 's'
            })),
            (t[e + 'eq'] = a({
              args: ['array', 'array'],
              body: { args: ['a', 'b'], body: 'a=a' + n + 'b' },
              rvalue: !0,
              count: 2,
              funcName: e + 'eq'
            })),
            (t[e + 'seq'] = a({
              args: ['array', 'scalar'],
              body: { args: ['a', 's'], body: 'a=a' + n + 's' },
              rvalue: !0,
              count: 2,
              funcName: e + 'seq'
            }));
        }
      })();
      var c = [
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
        for (var e = 0; e < c.length; ++e) {
          var n = c[e];
          (t[n] = a({
            args: ['array', 'array'],
            pre: { args: [], body: 'this_f=Math.' + n, thisVars: ['this_f'] },
            body: {
              args: ['a', 'b'],
              body: 'a=this_f(b)',
              thisVars: ['this_f']
            },
            funcName: n
          })),
            (t[n + 'eq'] = a({
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
        for (var e = 0; e < h.length; ++e) {
          var n = h[e];
          (t[n] = a({
            args: ['array', 'array', 'array'],
            pre: { args: [], body: 'this_f=Math.' + n, thisVars: ['this_f'] },
            body: {
              args: ['a', 'b', 'c'],
              body: 'a=this_f(b,c)',
              thisVars: ['this_f']
            },
            funcName: n
          })),
            (t[n + 's'] = a({
              args: ['array', 'array', 'scalar'],
              pre: { args: [], body: 'this_f=Math.' + n, thisVars: ['this_f'] },
              body: {
                args: ['a', 'b', 'c'],
                body: 'a=this_f(b,c)',
                thisVars: ['this_f']
              },
              funcName: n + 's'
            })),
            (t[n + 'eq'] = a({
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
            (t[n + 'seq'] = a({
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
        for (var e = 0; e < f.length; ++e) {
          var n = f[e];
          (t[n + 'op'] = a({
            args: ['array', 'array', 'array'],
            pre: { args: [], body: 'this_f=Math.' + n, thisVars: ['this_f'] },
            body: {
              args: ['a', 'b', 'c'],
              body: 'a=this_f(c,b)',
              thisVars: ['this_f']
            },
            funcName: n + 'op'
          })),
            (t[n + 'ops'] = a({
              args: ['array', 'array', 'scalar'],
              pre: { args: [], body: 'this_f=Math.' + n, thisVars: ['this_f'] },
              body: {
                args: ['a', 'b', 'c'],
                body: 'a=this_f(c,b)',
                thisVars: ['this_f']
              },
              funcName: n + 'ops'
            })),
            (t[n + 'opeq'] = a({
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
            (t[n + 'opseq'] = a({
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
        (t.any = r({
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
        (t.all = r({
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
        (t.sum = r({
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
        (t.prod = r({
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
        (t.norm2squared = r({
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
        (t.norm2 = r({
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
        (t.norminf = r({
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
        (t.norm1 = r({
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
        (t.sup = r({
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
        (t.inf = r({
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
        (t.argmin = r({
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
        (t.argmax = r({
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
        (t.random = a({
          args: ['array'],
          pre: { args: [], body: 'this_f=Math.random', thisVars: ['this_f'] },
          body: { args: ['a'], body: 'a=this_f()', thisVars: ['this_f'] },
          funcName: 'random'
        })),
        (t.assign = a({
          args: ['array', 'array'],
          body: { args: ['a', 'b'], body: 'a=b' },
          funcName: 'assign'
        })),
        (t.assigns = a({
          args: ['array', 'scalar'],
          body: { args: ['a', 'b'], body: 'a=b' },
          funcName: 'assigns'
        })),
        (t.equals = r({
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
    YuTi: function(e, t) {
      e.exports = function(e) {
        return (
          e.webpackPolyfill ||
            ((e.deprecate = function() {}),
            (e.paths = []),
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
            (e.webpackPolyfill = 1)),
          e
        );
      };
    },
    ZkmD: function(e, t, n) {
      var r = n('szI9');
      e.exports = function() {
        var e = {};
        return function(t) {
          if (('object' != typeof t || null === t) && 'function' != typeof t)
            throw new Error('Weakmap-shim: Key must be object');
          var n = t.valueOf(e);
          return n && n.identity === e ? n : r(t, e);
        };
      };
    },
    aiXG: function(e, t) {
      e.exports = [
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
    cS2A: function(e, t, n) {
      'use strict';
      (function(e) {
        n.d(t, 'a', function() {
          return r;
        });
        var r = function() {
          var t,
            n = document.body.classList.contains('has-video');
          if (n) {
            var r = document.createElement('script');
            r.src = 'https://www.youtube.com/player_api';
            var i = document.getElementsByTagName('script')[0];
            i.parentNode.insertBefore(r, i);
          }
          var o = {
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
            a = !1;
          if ('zh-cn' !== document.documentElement.lang)
            var s = {
              videoId: e('.l-header__play-button')
                .prop('href')
                .match(/watch\?v=(.*)$/)[1],
              suggestedQuality: 'hd720'
            };
          function l() {
            var e,
              t = !1;
            return (
              (e = navigator.userAgent || navigator.vendor || window.opera),
              (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
                e
              ) ||
                /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
                  e.substr(0, 4)
                )) &&
                (t = !0),
              t
            );
          }
          function u() {
            t.loadVideoById(s);
          }
          function c(e) {}
          function h(e) {
            e.requestFullScreen
              ? e.requestFullScreen()
              : e.mozRequestFullScreen
              ? e.mozRequestFullScreen()
              : e.webkitRequestFullScreen
              ? e.webkitRequestFullScreen()
              : e.msRequestFullScreen && e.msRequestFullScreen();
          }
          function f() {
            e('#video-fullscreen')[0];
            (null !== document.fullscreenElement &&
              null !== document.mozFullScreenElement &&
              null !== document.webkitFullscreenElement &&
              null !== document.msFullscreenElement) ||
              (t
                ? (t.pauseVideo(), t.seekTo(0))
                : e('#video-fullscreen').html(''));
          }
          (window.onYouTubeIframeAPIReady = function() {
            l() || ('zh-cn' !== document.documentElement.lang && (a = !0));
          }),
            (document.onfullscreenchange = f),
            (document.onmozfullscreenchange = f),
            (document.onwebkitfullscreenchange = f),
            (document.onmsfullscreenchange = f),
            e('.l-header__play-button').on('click', function(r) {
              n &&
                !l() &&
                (r.preventDefault(),
                'zh-cn' === document.documentElement.lang
                  ? (e('#video-fullscreen').append(
                      '<iframe height="498" width="510" src="' +
                        e('.l-header__play-button').prop('href') +
                        '" frameborder="0" allowfullscreen="false"></iframe>'
                    ),
                    h(e('#video-fullscreen')[0]))
                  : a &&
                    (t
                      ? t.playVideo()
                      : (t = new YT.Player('video-fullscreen', {
                          events: { onReady: u, onStateChange: c },
                          playerVars: o
                        })),
                    h(e('#video-fullscreen')[0])));
            });
        };
      }.call(this, n('EVdn')));
    },
    f26Q: function(e, t, n) {
      'use strict';
      function r() {
        var e = window.navigator.userAgent,
          t = e.indexOf('MSIE ');
        if (t > 0) return parseInt(e.substring(t + 5, e.indexOf('.', t)), 10);
        if (e.indexOf('Trident/') > 0) {
          var n = e.indexOf('rv:');
          return parseInt(e.substring(n + 3, e.indexOf('.', n)), 10);
        }
        var r = e.indexOf('Edge/');
        return r > 0 && parseInt(e.substring(r + 5, e.indexOf('.', r)), 10);
      }
      function i(e) {
        if (!(this instanceof i)) return new i(e);
        this.el = document.getElementById(e);
      }
      function o(e, t, n) {
        var r;
        if (n) {
          var i = new Date();
          i.setTime(i.getTime() + 24 * n * 60 * 60 * 1e3),
            (r = '; expires=' + i.toUTCString());
        } else r = '';
        document.cookie = e + '=' + t + r + '; path=/';
      }
      function a(e) {
        for (
          var t = e + '=', n = document.cookie.split(';'), r = 0;
          r < n.length;
          r++
        ) {
          for (var i = n[r]; ' ' === i.charAt(0); )
            i = i.substring(1, i.length);
          if (0 === i.indexOf(t)) return i.substring(t.length, i.length);
        }
        return null;
      }
      function s(e) {
        var t, n;
        for (t = 1, n = arguments.length; t < n; t++)
          if (void 0 === (e = e[arguments[t]])) return !1;
        return !0;
      }
      n.d(t, 'd', function() {
        return r;
      }),
        n.d(t, 'a', function() {
          return i;
        }),
        n.d(t, 'c', function() {
          return o;
        }),
        n.d(t, 'e', function() {
          return a;
        }),
        n.d(t, 'b', function() {
          return s;
        }),
        (i.prototype.fade = function(e, t) {
          var n = 'in' === e,
            r = n ? 0 : 1,
            i = 50 / t,
            o = this;
          n && ((o.el.style.display = 'inline'), (o.el.style.opacity = r));
          var a = window.setInterval(function() {
            (r = n ? r + i : r - i),
              (o.el.style.opacity = r),
              r <= 0 && (o.el.style.display = 'none'),
              (r <= 0 || r >= 1) && window.clearInterval(a);
          }, 50);
        });
    },
    fpEm: function(e, t, n) {
      'use strict';
      e.exports = function(e, t, n, i) {
        for (var o = {}, l = 0, u = n.length; l < u; ++l) {
          var c = n[l],
            h = c.name,
            f = c.type,
            p = c.locations;
          switch (f) {
            case 'bool':
            case 'int':
            case 'float':
              a(e, t, p[0], i, 1, o, h);
              break;
            default:
              if (f.indexOf('vec') >= 0) {
                var d = f.charCodeAt(f.length - 1) - 48;
                if (d < 2 || d > 4)
                  throw new r(
                    '',
                    'Invalid data type for attribute ' + h + ': ' + f
                  );
                a(e, t, p[0], i, d, o, h);
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
                s(e, t, p, i, d, o, h);
              }
          }
        }
        return o;
      };
      var r = n('o/2B');
      function i(e, t, n, r, i, o) {
        (this._gl = e),
          (this._wrapper = t),
          (this._index = n),
          (this._locations = r),
          (this._dimension = i),
          (this._constFunc = o);
      }
      var o = i.prototype;
      function a(e, t, n, r, o, a, s) {
        for (var l = ['gl', 'v'], u = [], c = 0; c < o; ++c)
          l.push('x' + c), u.push('x' + c);
        l.push(
          'if(x0.length===void 0){return gl.vertexAttrib' +
            o +
            'f(v,' +
            u.join() +
            ')}else{return gl.vertexAttrib' +
            o +
            'fv(v,x0)}'
        );
        var h = Function.apply(null, l),
          f = new i(e, t, n, r, o, h);
        Object.defineProperty(a, s, {
          set: function(t) {
            return e.disableVertexAttribArray(r[n]), h(e, r[n], t), t;
          },
          get: function() {
            return f;
          },
          enumerable: !0
        });
      }
      function s(e, t, n, r, i, o, s) {
        for (var l = new Array(i), u = new Array(i), c = 0; c < i; ++c)
          a(e, t, n[c], r, i, l, c), (u[c] = l[c]);
        Object.defineProperty(l, 'location', {
          set: function(e) {
            if (Array.isArray(e))
              for (var t = 0; t < i; ++t) u[t].location = e[t];
            else for (t = 0; t < i; ++t) u[t].location = e + t;
            return e;
          },
          get: function() {
            for (var e = new Array(i), t = 0; t < i; ++t) e[t] = r[n[t]];
            return e;
          },
          enumerable: !0
        }),
          (l.pointer = function(t, o, a, s) {
            (t = t || e.FLOAT), (o = !!o), (a = a || i * i), (s = s || 0);
            for (var l = 0; l < i; ++l) {
              var u = r[n[l]];
              e.vertexAttribPointer(u, i, t, o, a, s + l * i),
                e.enableVertexAttribArray(u);
            }
          });
        var h = new Array(i),
          f = e['vertexAttrib' + i + 'fv'];
        Object.defineProperty(o, s, {
          set: function(t) {
            for (var o = 0; o < i; ++o) {
              var a = r[n[o]];
              if ((e.disableVertexAttribArray(a), Array.isArray(t[0])))
                f.call(e, a, t[o]);
              else {
                for (var s = 0; s < i; ++s) h[s] = t[i * o + s];
                f.call(e, a, h);
              }
            }
            return t;
          },
          get: function() {
            return l;
          },
          enumerable: !0
        });
      }
      (o.pointer = function(e, t, n, r) {
        var i = this._gl,
          o = this._locations[this._index];
        i.vertexAttribPointer(
          o,
          this._dimension,
          e || i.FLOAT,
          !!t,
          n || 0,
          r || 0
        ),
          i.enableVertexAttribArray(o);
      }),
        (o.set = function(e, t, n, r) {
          return this._constFunc(this._locations[this._index], e, t, n, r);
        }),
        Object.defineProperty(o, 'location', {
          get: function() {
            return this._locations[this._index];
          },
          set: function(e) {
            return (
              e !== this._locations[this._index] &&
                ((this._locations[this._index] = 0 | e),
                (this._wrapper.program = null)),
              0 | e
            );
          }
        });
    },
    'g+oV': function(e, t, n) {
      'use strict';
      var r = n('XpGV');
      t.inline = function(e, t) {
        var n = (function(e) {
          var t = e.getElementsByTagName('script');
          return Array.prototype.filter.call(t, function(e) {
            return !!e.attributes.src;
          });
        })(e);
        return r.collectAndReportErrors(
          n.map(function(e) {
            return (function(e, t) {
              var n = e.attributes.src.value,
                i = r.getDocumentBaseUrl(e.ownerDocument),
                o = r.clone(t);
              return (
                !o.baseUrl && i && (o.baseUrl = i),
                r.ajax(n, o).catch(function(e) {
                  throw {
                    resourceType: 'script',
                    url: e.url,
                    msg: 'Unable to load script ' + e.url
                  };
                })
              );
            })(e, t).then(function(t) {
              !(function(e, t) {
                e.attributes.removeNamedItem('src'),
                  (e.textContent = t.replace(/<\//g, '<\\/'));
              })(e, t);
            });
          })
        );
      };
    },
    g9XJ: function(e, t) {
      Array.prototype.find ||
        (Array.prototype.find = function(e) {
          if (null == this)
            throw new TypeError(
              'Array.prototype.find called on null or undefined'
            );
          if ('function' != typeof e)
            throw new TypeError('predicate must be a function');
          for (
            var t,
              n = Object(this),
              r = n.length >>> 0,
              i = arguments[1],
              o = 0;
            o < r;
            o++
          )
            if (((t = n[o]), e.call(i, t, o, n))) return t;
        });
    },
    hK8l: function(e, t, n) {
      'use strict';
      e.exports = function(e, t) {
        switch ((void 0 === t && (t = 0), typeof e)) {
          case 'number':
            if (e > 0)
              return (function(e, t) {
                var n, r;
                for (n = new Array(e), r = 0; r < e; ++r) n[r] = t;
                return n;
              })(0 | e, t);
            break;
          case 'object':
            if ('number' == typeof e.length)
              return (function e(t, n, r) {
                var i = 0 | t[r];
                if (i <= 0) return [];
                var o,
                  a = new Array(i);
                if (r === t.length - 1) for (o = 0; o < i; ++o) a[o] = n;
                else for (o = 0; o < i; ++o) a[o] = e(t, n, r + 1);
                return a;
              })(e, t, 0);
        }
        return [];
      };
    },
    hYYf: function(e, t, n) {
      e.exports = function(e) {
        var t,
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
        '300 es' === (e = e || {}).version && ((D = s), (F = a));
        for (var L = {}, U = {}, E = 0; E < D.length; E++) L[D[E]] = !0;
        for (var E = 0; E < F.length; E++) U[F[E]] = !0;
        return function(e) {
          return (
            (R = []),
            null !== e
              ? (function(e) {
                  (E = 0), e.toString && (e = e.toString());
                  var n;
                  (N += e.replace(/\r\n/g, '\n')), (w = N.length);
                  for (; (t = N[E]), E < w; ) {
                    switch (((n = E), C)) {
                      case c:
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
                      case b:
                        E = G();
                        break;
                      case m:
                        E = W();
                        break;
                      case u:
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
                })(e)
              : (function(e) {
                  P.length && B(P.join(''));
                  return (C = T), B('(eof)'), R;
                })()
          );
        };
        function B(e) {
          e.length &&
            R.push({ type: x[C], data: e, position: M, line: I, column: S });
        }
        function z() {
          return (
            (P = P.length ? [] : P),
            '/' === n && '*' === t
              ? ((M = A + E - 1), (C = c), (n = t), E + 1)
              : '/' === n && '/' === t
              ? ((M = A + E - 1), (C = h), (n = t), E + 1)
              : '#' === t
              ? ((C = f), (M = A + E), E)
              : /\s/.test(t)
              ? ((C = y), (M = A + E), E)
              : ((O = /\d/.test(t)),
                (k = /[^\w_]/.test(t)),
                (M = A + E),
                (C = O ? d : k ? p : u),
                E)
          );
        }
        function j() {
          return /[^\s]/g.test(t)
            ? (B(P.join('')), (C = l), E)
            : (P.push(t), (n = t), E + 1);
        }
        function V() {
          return ('\r' !== t && '\n' !== t) || '\\' === n
            ? (P.push(t), (n = t), E + 1)
            : (B(P.join('')), (C = l), E);
        }
        function X() {
          return '/' === t && '*' === n
            ? (P.push(t), B(P.join('')), (C = l), E + 1)
            : (P.push(t), (n = t), E + 1);
        }
        function q() {
          if ('.' === n && /\d/.test(t)) return (C = m), E;
          if ('/' === n && '*' === t) return (C = c), E;
          if ('/' === n && '/' === t) return (C = h), E;
          if ('.' === t && P.length) {
            for (; H(P); );
            return (C = m), E;
          }
          if (';' === t || ')' === t || '(' === t) {
            if (P.length) for (; H(P); );
            return B(t), (C = l), E + 1;
          }
          var e = 2 === P.length && '=' !== t;
          if (/[\w_\d\s]/.test(t) || e) {
            for (; H(P); );
            return (C = l), E;
          }
          return P.push(t), (n = t), E + 1;
        }
        function H(e) {
          for (var t, n, r = 0; ; ) {
            if (
              ((t = i.indexOf(e.slice(0, e.length + r).join(''))),
              (n = i[t]),
              -1 === t)
            ) {
              if (r-- + e.length > 0) continue;
              n = e.slice(0, 1).join('');
            }
            return B(n), (M += n.length), (P = P.slice(n.length)).length;
          }
        }
        function G() {
          return /[^a-fA-F0-9]/.test(t)
            ? (B(P.join('')), (C = l), E)
            : (P.push(t), (n = t), E + 1);
        }
        function Y() {
          return '.' === t
            ? (P.push(t), (C = m), (n = t), E + 1)
            : /[eE]/.test(t)
            ? (P.push(t), (C = m), (n = t), E + 1)
            : 'x' === t && 1 === P.length && '0' === P[0]
            ? ((C = b), P.push(t), (n = t), E + 1)
            : /[^\d]/.test(t)
            ? (B(P.join('')), (C = l), E)
            : (P.push(t), (n = t), E + 1);
        }
        function W() {
          return (
            'f' === t && (P.push(t), (n = t), (E += 1)),
            /[eE]/.test(t)
              ? (P.push(t), (n = t), E + 1)
              : (('-' !== t && '+' !== t) || !/[eE]/.test(n)) && /[^\d]/.test(t)
              ? (B(P.join('')), (C = l), E)
              : (P.push(t), (n = t), E + 1)
          );
        }
        function K() {
          if (/[^\d\w_]/.test(t)) {
            var e = P.join('');
            return (C = U[e] ? _ : L[e] ? v : g), B(P.join('')), (C = l), E;
          }
          return P.push(t), (n = t), E + 1;
        }
      };
      var r = n('GTa7'),
        i = n('aiXG'),
        o = n('Xs3h'),
        a = n('9fJb'),
        s = n('BkhO'),
        l = 999,
        u = 9999,
        c = 0,
        h = 1,
        f = 2,
        p = 3,
        d = 4,
        m = 5,
        g = 6,
        v = 7,
        _ = 8,
        y = 9,
        T = 10,
        b = 11,
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
    'k2/K': function(e, t, n) {
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
          (i = function(e, t, n, r) {
            return (o.rasterizeHTML =
              ((i = t),
              (a = n),
              (s = r),
              (l = (function(e) {
                'use strict';
                var t = {},
                  n = [];
                return (
                  (t.joinUrl = function(t, n) {
                    return t ? e.resolve(t, n) : n;
                  }),
                  (t.getConstantUniqueIdFor = function(e) {
                    return n.indexOf(e) < 0 && n.push(e), n.indexOf(e);
                  }),
                  (t.clone = function(e) {
                    var t,
                      n = {};
                    for (t in e) e.hasOwnProperty(t) && (n[t] = e[t]);
                    return n;
                  }),
                  (t.parseOptionalParameters = function(e) {
                    var n,
                      r = { canvas: null, options: {} };
                    return (
                      null == e[0] ||
                      ((function(e) {
                        return 'object' == typeof e && null !== e;
                      })((n = e[0])) &&
                        Object.prototype.toString
                          .apply(n)
                          .match(/\[object (Canvas|HTMLCanvasElement)\]/i))
                        ? ((r.canvas = e[0] || null),
                          (r.options = t.clone(e[1])))
                        : (r.options = t.clone(e[0])),
                      r
                    );
                  }),
                  t
                );
              })(e)),
              (u = (function(e) {
                'use strict';
                var t = {},
                  n = function(e, t, n) {
                    var r = e[t];
                    return (
                      (e[t] = function() {
                        var e = Array.prototype.slice.call(arguments);
                        return n.apply(this, [e, r]);
                      }),
                      r
                    );
                  };
                return (
                  (t.baseUrlRespectingXhr = function(t, r) {
                    return function() {
                      var i = new t();
                      return (
                        n(i, 'open', function(t, n) {
                          var i = t.shift(),
                            o = t.shift(),
                            a = e.joinUrl(r, o);
                          return n.apply(this, [i, a].concat(t));
                        }),
                        i
                      );
                    };
                  }),
                  (t.finishNotifyingXhr = function(e) {
                    var t,
                      r = 0,
                      i = 0,
                      o = !1,
                      a = new Promise(function(e) {
                        t = function() {
                          var t = r - i;
                          t <= 0 && o && e({ totalCount: r });
                        };
                      }),
                      s = function() {
                        var o = new e();
                        return (
                          n(o, 'send', function(e, t) {
                            return (r += 1), t.apply(this, arguments);
                          }),
                          o.addEventListener('load', function() {
                            (i += 1), t();
                          }),
                          o
                        );
                      };
                    return (
                      (s.waitForRequestsToFinish = function() {
                        return (o = !0), t(), a;
                      }),
                      s
                    );
                  }),
                  t
                );
              })(l)),
              (c = (function(e) {
                'use strict';
                var t = {},
                  n = function(e) {
                    return Array.prototype.slice.call(e);
                  },
                  r = { active: !0, hover: !0, focus: !1, target: !1 };
                return (
                  (t.fakeUserAction = function(t, n, i) {
                    var o = t.querySelector(n),
                      a = ':' + i,
                      s = 'rasterizehtml' + i;
                    o &&
                      (r[i]
                        ? e.addClassNameRecursively(o, s)
                        : e.addClassName(o, s),
                      e.rewriteCssSelectorWith(t, a, '.' + s));
                  }),
                  (t.persistInputValues = function(e) {
                    var t = e.querySelectorAll('input'),
                      r = e.querySelectorAll('textarea'),
                      i = function(e) {
                        return 'checkbox' === e.type || 'radio' === e.type;
                      };
                    n(t)
                      .filter(i)
                      .forEach(function(e) {
                        e.checked
                          ? e.setAttribute('checked', '')
                          : e.removeAttribute('checked');
                      }),
                      n(t)
                        .filter(function(e) {
                          return !i(e);
                        })
                        .forEach(function(e) {
                          e.setAttribute('value', e.value);
                        }),
                      n(r).forEach(function(e) {
                        e.textContent = e.value;
                      });
                  }),
                  (t.rewriteTagNameSelectorsToLowerCase = function(t) {
                    e.lowercaseCssTypeSelectors(t, e.findHtmlOnlyNodeNames(t));
                  }),
                  t
                );
              })(
                (function() {
                  'use strict';
                  var e = {},
                    t = function(e) {
                      return Array.prototype.slice.call(e);
                    };
                  (e.addClassName = function(e, t) {
                    e.className += ' ' + t;
                  }),
                    (e.addClassNameRecursively = function(t, n) {
                      e.addClassName(t, n),
                        t.parentNode !== t.ownerDocument &&
                          e.addClassNameRecursively(t.parentNode, n);
                    });
                  var n = function(e, n) {
                      var r = e.cssText.replace(/^[^\{]+/, ''),
                        i = n + ' ' + r;
                      !(function(e, n) {
                        var r = e.parentStyleSheet,
                          i = t(r.cssRules).indexOf(e);
                        r.insertRule(n, i + 1), r.deleteRule(i);
                      })(e, i);
                    },
                    r = function(e) {
                      var n;
                      e.textContent =
                        ((n = e.sheet.cssRules),
                        t(n).reduce(function(e, t) {
                          return e + t.cssText;
                        }, ''));
                    },
                    i = function(e, i, o) {
                      var a = (function(e) {
                        return (
                          '((?:^|[^.#:\\w])|(?=\\W))(' +
                          e.join('|') +
                          ')(?=\\W|$)'
                        );
                      })(i);
                      t(e.querySelectorAll('style')).forEach(function(e) {
                        var i, s, l;
                        void 0 === e.sheet &&
                          ((i = e),
                          (s = document.implementation.createHTMLDocument('')),
                          ((l = document.createElement('style')).textContent =
                            i.textContent),
                          s.body.appendChild(l),
                          (i.sheet = l.sheet));
                        var u = t(e.sheet.cssRules).filter(function(e) {
                          return (
                            e.selectorText &&
                            new RegExp(a, 'i').test(e.selectorText)
                          );
                        });
                        u.length &&
                          (u.forEach(function(e) {
                            var t = e.selectorText.replace(
                              new RegExp(a, 'gi'),
                              function(e, t, n) {
                                return t + o(n);
                              }
                            );
                            t !== e.selectorText && n(e, t);
                          }),
                          r(e));
                      });
                    };
                  return (
                    (e.rewriteCssSelectorWith = function(e, t, n) {
                      i(e, [t], function() {
                        return n;
                      });
                    }),
                    (e.lowercaseCssTypeSelectors = function(e, t) {
                      i(e, t, function(e) {
                        return e.toLowerCase();
                      });
                    }),
                    (e.findHtmlOnlyNodeNames = function(e) {
                      var t,
                        n = e.ownerDocument.createTreeWalker(
                          e,
                          NodeFilter.SHOW_ELEMENT
                        ),
                        r = {},
                        i = {};
                      do {
                        (t = n.currentNode.tagName.toLowerCase()),
                          'http://www.w3.org/1999/xhtml' ===
                          n.currentNode.namespaceURI
                            ? (r[t] = !0)
                            : (i[t] = !0);
                      } while (n.nextNode());
                      return Object.keys(r).filter(function(e) {
                        return !i[e];
                      });
                    }),
                    e
                  );
                })()
              )),
              (h = (function(e, t, n, r) {
                'use strict';
                var i = {
                    executeJavascript: function(e, n) {
                      return new Promise(function(i) {
                        var o = (function(e, t, n, r) {
                            var i = e.createElement(t);
                            return (
                              (i.style.visibility = 'hidden'),
                              (i.style.width = n + 'px'),
                              (i.style.height = r + 'px'),
                              (i.style.position = 'absolute'),
                              (i.style.top = -1e4 - r + 'px'),
                              (i.style.left = -1e4 - n + 'px'),
                              e.getElementsByTagName('body')[0].appendChild(i),
                              i
                            );
                          })(r.document, 'iframe', n.width, n.height),
                          a = e.outerHTML,
                          s = [],
                          l = n.executeJsTimeout || 0,
                          u = function() {
                            var e = o.contentDocument;
                            r.document
                              .getElementsByTagName('body')[0]
                              .removeChild(o),
                              i({ document: e, errors: s });
                          },
                          c = o.contentWindow.XMLHttpRequest,
                          h = t.finishNotifyingXhr(c),
                          f = t.baseUrlRespectingXhr(h, n.baseUrl);
                        (o.onload = function() {
                          var e;
                          ((e = l),
                          e > 0
                            ? new Promise(function(t) {
                                setTimeout(t, e);
                              })
                            : Promise.resolve())
                            .then(h.waitForRequestsToFinish)
                            .then(u);
                        }),
                          o.contentDocument.open(),
                          (o.contentWindow.XMLHttpRequest = f),
                          (o.contentWindow.onerror = function(e) {
                            s.push({ resourceType: 'scriptExecution', msg: e });
                          }),
                          o.contentDocument.write('<!DOCTYPE html>'),
                          o.contentDocument.write(a),
                          o.contentDocument.close();
                      });
                    }
                  },
                  o = function(e, t, n, i, o) {
                    var a,
                      s,
                      l,
                      u,
                      c,
                      h,
                      f,
                      p,
                      d = Math.max(e.scrollWidth, e.clientWidth),
                      m = Math.max(e.scrollHeight, e.clientHeight);
                    return (
                      t
                        ? ((h = (function(e, t) {
                            var n = e.querySelector(t);
                            if (n) return n;
                            if (e.ownerDocument.querySelector(t) === e)
                              return e;
                            throw { message: 'Clipping selector not found' };
                          })(e, t)),
                          (f = h.getBoundingClientRect()),
                          (a = f.top),
                          (s = f.left),
                          (l = f.width),
                          (u = f.height))
                        : ((a = 0), (s = 0), (l = d), (u = m)),
                      (p = (function(e, t, n, r) {
                        return {
                          width: Math.max(e.width * r, t),
                          height: Math.max(e.height * r, n)
                        };
                      })({ width: l, height: u }, n, i, o)),
                      (c = r.getComputedStyle(e.ownerDocument.documentElement)
                        .fontSize),
                      {
                        left: s,
                        top: a,
                        width: p.width,
                        height: p.height,
                        viewportWidth: d,
                        viewportHeight: m,
                        rootFontSize: c
                      }
                    );
                  };
                (i.calculateDocumentContentSize = function(e, t) {
                  return new Promise(function(n, i) {
                    var a,
                      s = t.zoom || 1;
                    (a = (function(e, t, n) {
                      var i = Math.floor(e / n),
                        o = Math.floor(t / n);
                      return (function(e, t, n) {
                        var r = e.createElement('iframe');
                        return (
                          (r.style.width = t + 'px'),
                          (r.style.height = n + 'px'),
                          (r.style.visibility = 'hidden'),
                          (r.style.position = 'absolute'),
                          (r.style.top = -1e4 - n + 'px'),
                          (r.style.left = -1e4 - t + 'px'),
                          (r.style.borderWidth = 0),
                          (r.sandbox = 'allow-same-origin'),
                          (r.scrolling = 'no'),
                          r
                        );
                      })(r.document, i, o);
                    })(t.width, t.height, s)),
                      r.document.getElementsByTagName('body')[0].appendChild(a),
                      (a.onload = function() {
                        var l,
                          u = a.contentDocument;
                        try {
                          (l = o(
                            (function(e, t) {
                              var n = e.tagName;
                              return t.querySelector(n);
                            })(e, u),
                            t.clip,
                            t.width,
                            t.height,
                            s
                          )),
                            n(l);
                        } catch (e) {
                          i(e);
                        } finally {
                          r.document
                            .getElementsByTagName('body')[0]
                            .removeChild(a);
                        }
                      }),
                      a.contentDocument.open(),
                      a.contentDocument.write('<!DOCTYPE html>'),
                      a.contentDocument.write(
                        (function(e) {
                          var t = e.tagName.toLowerCase();
                          return 'html' === t || 'body' === t
                            ? e.outerHTML
                            : '<body style="margin: 0;">' +
                                e.outerHTML +
                                '</body>';
                        })(e)
                      ),
                      a.contentDocument.close();
                  });
                }),
                  (i.parseHtmlFragment = function(e) {
                    var t = r.document.implementation.createHTMLDocument('');
                    t.documentElement.innerHTML = e;
                    var n = t.querySelector('body').firstChild;
                    if (!n) throw 'Invalid source';
                    return n;
                  }),
                  (i.parseHTML = function(e) {
                    var t = r.document.implementation.createHTMLDocument('');
                    return (
                      (t.documentElement.innerHTML = e),
                      (function(e, t) {
                        var n,
                          i,
                          o,
                          a,
                          s = /<html((?:\s+[^>]*)?)>/im.exec(t),
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
                              e.documentElement.setAttribute(a.name, a.value);
                      })(t, e),
                      t
                    );
                  });
                var a = function(e) {
                  try {
                    return n.failOnParseError(e);
                  } catch (e) {
                    throw { message: 'Invalid source', originalError: e };
                  }
                };
                i.validateXHTML = function(e) {
                  var t = new DOMParser(),
                    n = t.parseFromString(e, 'application/xml');
                  a(n);
                };
                var s = null,
                  l = function(t, n) {
                    return new Promise(function(r, i) {
                      var o = new window.XMLHttpRequest(),
                        a = e.joinUrl(n.baseUrl, t),
                        l = (function(e, t) {
                          return 'none' === t || 'repeated' === t
                            ? ((null !== s && 'repeated' === t) ||
                                (s = Date.now()),
                              e + '?_=' + s)
                            : e;
                        })(a, n.cache),
                        u = function(e) {
                          i({
                            message: 'Unable to load page',
                            originalError: e
                          });
                        };
                      o.addEventListener(
                        'load',
                        function() {
                          200 === o.status || 0 === o.status
                            ? r(o.responseXML)
                            : u(o.statusText);
                        },
                        !1
                      ),
                        o.addEventListener(
                          'error',
                          function(e) {
                            u(e);
                          },
                          !1
                        );
                      try {
                        o.open('GET', l, !0),
                          (o.responseType = 'document'),
                          o.send(null);
                      } catch (e) {
                        u(e);
                      }
                    });
                  };
                return (
                  (i.loadDocument = function(e, t) {
                    return l(e, t).then(function(e) {
                      return a(e);
                    });
                  }),
                  i
                );
              })(l, u, a, window)),
              (f = (function(e) {
                'use strict';
                var t,
                  n = {},
                  r = function(e, t) {
                    return t
                      ? URL.createObjectURL(
                          new Blob([e], { type: 'image/svg+xml' })
                        )
                      : 'data:image/svg+xml;charset=utf-8,' +
                          encodeURIComponent(e);
                  },
                  i = function(e) {
                    e instanceof Blob && URL.revokeObjectURL(e);
                  },
                  o =
                    '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"><foreignObject></foreignObject></svg>',
                  a = function(e) {
                    return new Promise(function(t, n) {
                      var r = document.createElement('canvas'),
                        i = new Image();
                      (i.onload = function() {
                        var e = r.getContext('2d');
                        try {
                          e.drawImage(i, 0, 0), r.toDataURL('image/png'), t(!0);
                        } catch (e) {
                          t(!1);
                        }
                      }),
                        (i.onerror = n),
                        (i.src = e);
                    });
                  },
                  s = function() {
                    return new Promise(function(t, n) {
                      var s;
                      (function() {
                        if (e.Blob)
                          try {
                            return (
                              new Blob(['<b></b>'], { type: 'text/xml' }), !0
                            );
                          } catch (e) {}
                        return !1;
                      })() && e.URL
                        ? ((s = r(o, !0)),
                          a(s).then(
                            function(e) {
                              return (
                                i(s),
                                !e &&
                                  a(r(o, !1)).then(function(e) {
                                    return e;
                                  })
                              );
                            },
                            function() {
                              return !1;
                            }
                          )).then(
                            function(e) {
                              t(!e);
                            },
                            function() {
                              n();
                            }
                          )
                        : t(!1);
                    });
                  },
                  l = function(e) {
                    return (void 0 === t && (t = s()), t).then(function(t) {
                      return r(e, t);
                    });
                  };
                return (
                  (n.renderSvg = function(e) {
                    return new Promise(function(t, n) {
                      var r,
                        o,
                        a = function() {
                          r && i(r);
                        };
                      ((o = new Image()).onload = function() {
                        (o.onload = null), (o.onerror = null), a(), t(o);
                      }),
                        (o.onerror = function() {
                          a(), n();
                        }),
                        l(e).then(function(e) {
                          (r = e), (o.src = r);
                        }, n);
                    });
                  }),
                  n
                );
              })(window)),
              (p = (function(e, t, n, r) {
                'use strict';
                var i = {},
                  o = function(e) {
                    var t = Object.keys(e);
                    return t.length
                      ? ' ' +
                          t
                            .map(function(t) {
                              return t + '="' + e[t] + '"';
                            })
                            .join(' ')
                      : '';
                  },
                  a = function(e, n, i) {
                    var a = r.serializeToString(e);
                    t.validateXHTML(a);
                    var s,
                      l,
                      u = (function(e) {
                        var t, n, r, i;
                        return (
                          (t = Math.round(e.viewportWidth)),
                          (n = Math.round(e.viewportHeight)),
                          (r = -e.left),
                          (i = -e.top),
                          { x: r, y: i, width: t, height: n }
                        );
                      })(n);
                    return (
                      (l = (s = u).style || ''),
                      (s.style = l + 'float: left;'),
                      (function(e) {
                        e.externalResourcesRequired = !0;
                      })(u),
                      '<svg xmlns="http://www.w3.org/2000/svg"' +
                        o(
                          (function(e, t) {
                            var n = t || 1,
                              r = {
                                width: e.width,
                                height: e.height,
                                'font-size': e.rootFontSize
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
                        o(u) +
                        '>' +
                        a +
                        '</foreignObject></svg>'
                    );
                  };
                return (
                  (i.getSvgForDocument = function(e, t, r) {
                    return n.rewriteTagNameSelectorsToLowerCase(e), a(e, t, r);
                  }),
                  (i.drawDocumentAsSvg = function(e, r) {
                    return (
                      ['hover', 'active', 'focus', 'target'].forEach(function(
                        t
                      ) {
                        r[t] && n.fakeUserAction(e, r[t], t);
                      }),
                      t.calculateDocumentContentSize(e, r).then(function(t) {
                        return i.getSvgForDocument(e, t, r.zoom);
                      })
                    );
                  }),
                  i
                );
              })(0, h, c, i)),
              (d = (function(e, t, n, r, i, o) {
                'use strict';
                var a = {},
                  s = function(e) {
                    return {
                      message: 'Error rendering page',
                      originalError: e
                    };
                  },
                  l = function(e) {
                    return i.renderSvg(e).then(
                      function(t) {
                        return { image: t, svg: e };
                      },
                      function(e) {
                        throw s(e);
                      }
                    );
                  },
                  u = function(e, t, n) {
                    return r
                      .drawDocumentAsSvg(e, n)
                      .then(l)
                      .then(function(e) {
                        return (
                          t &&
                            (function(e, t) {
                              try {
                                t.getContext('2d').drawImage(e, 0, 0);
                              } catch (e) {
                                throw s(e);
                              }
                            })(e.image, t),
                          e
                        );
                      });
                  };
                return (
                  (a.rasterize = function(r, i, a) {
                    var s;
                    return (
                      ((s = e.clone(a)).inlineScripts = !0 === a.executeJs),
                      o
                        .inlineReferences(r, s)
                        .then(function(e) {
                          return a.executeJs
                            ? (function(e, r) {
                                return t
                                  .executeJavascript(e, r)
                                  .then(function(e) {
                                    var t = e.document;
                                    return (
                                      n.persistInputValues(t),
                                      { document: t, errors: e.errors }
                                    );
                                  });
                              })(r, a).then(function(t) {
                                return {
                                  element: t.document.documentElement,
                                  errors: e.concat(t.errors)
                                };
                              })
                            : { element: r, errors: e };
                        })
                        .then(function(e) {
                          return u(e.element, i, a).then(function(t) {
                            return {
                              image: t.image,
                              svg: t.svg,
                              errors: e.errors
                            };
                          });
                        })
                    );
                  }),
                  a
                );
              })(l, h, c, p, f, s)),
              (function(e, t, n) {
                'use strict';
                var r = {},
                  i = function(t) {
                    var n,
                      r = (function(e, t) {
                        var n = e ? e.width : 300,
                          r = e ? e.height : 200,
                          i = void 0 !== t.width ? t.width : n,
                          o = void 0 !== t.height ? t.height : r;
                        return { width: i, height: o };
                      })(t.canvas, t.options);
                    return (
                      ((n = e.clone(t.options)).width = r.width),
                      (n.height = r.height),
                      n
                    );
                  };
                r.drawDocument = function() {
                  var t = arguments[0],
                    r = Array.prototype.slice.call(arguments, 1),
                    o = e.parseOptionalParameters(r),
                    a = t.documentElement ? t.documentElement : t;
                  return n.rasterize(a, o.canvas, i(o));
                };
                var o = function(e, n, i) {
                  var o = t.parseHTML(e);
                  return r.drawDocument(o, n, i);
                };
                r.drawHTML = function() {
                  var t = arguments[0],
                    n = Array.prototype.slice.call(arguments, 1),
                    r = e.parseOptionalParameters(n);
                  return o(t, r.canvas, r.options);
                };
                var a = function(n, i, o) {
                  return t.loadDocument(n, o).then(function(t) {
                    var a = (function(t, n, r) {
                      var i = document.implementation.createHTMLDocument('');
                      i.replaceChild(t.documentElement, i.documentElement);
                      var o = r ? e.clone(r) : {};
                      return (
                        r.baseUrl || (o.baseUrl = n),
                        { document: i, options: o }
                      );
                    })(t, n, o);
                    return r.drawDocument(a.document, i, a.options);
                  });
                };
                return (
                  (r.drawURL = function() {
                    var t = arguments[0],
                      n = Array.prototype.slice.call(arguments, 1),
                      r = e.parseOptionalParameters(n);
                    return a(t, r.canvas, r.options);
                  }),
                  r
                );
              })(l, h, d)));
            var i, a, s, l, u, c, h, f, p, d;
          }.apply(t, r)) || (e.exports = i);
    },
    kR76: function(e, t, n) {
      var r = n('SMLl');
      e.exports = function(e, t, n) {
        (t = 'number' == typeof t ? t : 1), (n = n || ': ');
        var i = e.split(/\r?\n/),
          o = String(i.length + t - 1).length;
        return i
          .map(function(e, i) {
            var a = i + t,
              s = String(a).length,
              l = r(a, o - s);
            return l + n + e;
          })
          .join('\n');
      };
    },
    'kVK+': function(e, t) {
      (t.read = function(e, t, n, r, i) {
        var o,
          a,
          s = 8 * i - r - 1,
          l = (1 << s) - 1,
          u = l >> 1,
          c = -7,
          h = n ? i - 1 : 0,
          f = n ? -1 : 1,
          p = e[t + h];
        for (
          h += f, o = p & ((1 << -c) - 1), p >>= -c, c += s;
          c > 0;
          o = 256 * o + e[t + h], h += f, c -= 8
        );
        for (
          a = o & ((1 << -c) - 1), o >>= -c, c += r;
          c > 0;
          a = 256 * a + e[t + h], h += f, c -= 8
        );
        if (0 === o) o = 1 - u;
        else {
          if (o === l) return a ? NaN : (1 / 0) * (p ? -1 : 1);
          (a += Math.pow(2, r)), (o -= u);
        }
        return (p ? -1 : 1) * a * Math.pow(2, o - r);
      }),
        (t.write = function(e, t, n, r, i, o) {
          var a,
            s,
            l,
            u = 8 * o - i - 1,
            c = (1 << u) - 1,
            h = c >> 1,
            f = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
            p = r ? 0 : o - 1,
            d = r ? 1 : -1,
            m = t < 0 || (0 === t && 1 / t < 0) ? 1 : 0;
          for (
            t = Math.abs(t),
              isNaN(t) || t === 1 / 0
                ? ((s = isNaN(t) ? 1 : 0), (a = c))
                : ((a = Math.floor(Math.log(t) / Math.LN2)),
                  t * (l = Math.pow(2, -a)) < 1 && (a--, (l *= 2)),
                  (t += a + h >= 1 ? f / l : f * Math.pow(2, 1 - h)) * l >= 2 &&
                    (a++, (l /= 2)),
                  a + h >= c
                    ? ((s = 0), (a = c))
                    : a + h >= 1
                    ? ((s = (t * l - 1) * Math.pow(2, i)), (a += h))
                    : ((s = t * Math.pow(2, h - 1) * Math.pow(2, i)), (a = 0)));
            i >= 8;
            e[n + p] = 255 & s, p += d, s /= 256, i -= 8
          );
          for (
            a = (a << i) | s, u += i;
            u > 0;
            e[n + p] = 255 & a, p += d, a /= 256, u -= 8
          );
          e[n + p - d] |= 128 * m;
        });
    },
    kd2E: function(e, t, n) {
      'use strict';
      function r(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }
      e.exports = function(e, t, n, o) {
        (t = t || '&'), (n = n || '=');
        var a = {};
        if ('string' != typeof e || 0 === e.length) return a;
        var s = /\+/g;
        e = e.split(t);
        var l = 1e3;
        o && 'number' == typeof o.maxKeys && (l = o.maxKeys);
        var u = e.length;
        l > 0 && u > l && (u = l);
        for (var c = 0; c < u; ++c) {
          var h,
            f,
            p,
            d,
            m = e[c].replace(s, '%20'),
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
        function(e) {
          return '[object Array]' === Object.prototype.toString.call(e);
        };
    },
    l8mB: function(e, t, n) {
      var r, i, o;
      (i = []),
        void 0 ===
          (o =
            'function' ==
            typeof (r = function() {
              var e = function(e) {
                  var t = e.tagName;
                  return (
                    'http://www.w3.org/1999/xhtml' === e.namespaceURI &&
                      (t = t.toLowerCase()),
                    t
                  );
                },
                t = function(e) {
                  return Array.prototype.map
                    .call(e.childNodes, function(e) {
                      return r(e);
                    })
                    .join('');
                },
                n = function(n, r) {
                  var i = '<' + e(n);
                  return (
                    (i += (function(e, t) {
                      return Array.prototype.map
                        .call(e.attributes || e.attrs, function(e) {
                          return e.name;
                        })
                        .indexOf('xmlns') >= 0 ||
                        (!t && e.namespaceURI === e.parentNode.namespaceURI)
                        ? ''
                        : ' xmlns="' + e.namespaceURI + '"';
                    })(n, r)),
                    Array.prototype.forEach.call(
                      n.attributes || n.attrs,
                      function(e) {
                        i += (function(e) {
                          var t = e.value;
                          return (
                            ' ' +
                            e.name +
                            '="' +
                            (function(e) {
                              return e
                                .replace(/&/g, '&amp;')
                                .replace(/</g, '&lt;')
                                .replace(/>/g, '&gt;')
                                .replace(/"/g, '&quot;')
                                .replace(/'/g, '&apos;');
                            })(t) +
                            '"'
                          );
                        })(e);
                      }
                    ),
                    n.childNodes.length > 0
                      ? ((i += '>'), (i += t(n)), (i += '</' + e(n) + '>'))
                      : (i += '/>'),
                    i
                  );
                },
                r = function(e, r) {
                  var i = r && r.rootNode;
                  return '#document' === e.nodeName ||
                    '#document-fragment' === e.nodeName
                    ? t(e)
                    : e.tagName
                    ? n(e, i)
                    : '#text' === e.nodeName
                    ? (function(e) {
                        var t = e.nodeValue || e.value || '';
                        return t
                          .replace(/&/g, '&amp;')
                          .replace(/</g, '&lt;')
                          .replace(/>/g, '&gt;');
                      })(e)
                    : '#comment' === e.nodeName
                    ? (function(e) {
                        return (
                          '\x3c!--' + e.data.replace(/-/g, '&#45;') + '--\x3e'
                        );
                      })(e)
                    : '#cdata-section' === e.nodeName
                    ? (function(e) {
                        return '<![CDATA[' + e.nodeValue + ']]>';
                      })(e)
                    : void 0;
                };
              return {
                serializeToString: function(e) {
                  return r(e, { rootNode: !0 }).replace(
                    /[\x00-\x08\x0B\x0C\x0E-\x1F]/g,
                    ''
                  );
                }
              };
            })
              ? r.apply(t, i)
              : r) || (e.exports = o);
    },
    mGbE: function(e, t, n) {
      'use strict';
      n.r(t);
      n('p/9t'), n('RVtD'), n('pynx');
      var r = n('uLzS'),
        i = n('u50I'),
        o = n('y81S'),
        a = n('Mutr'),
        s = n('cS2A'),
        l = (n('C1EJ'), n('vHxl'));
      Object(s.a)(),
        Object(r.a)(isMobile),
        Object(i.a)(),
        isMobile
          ? (Object(o.c)(
              'screenshots',
              CDPRED.screenshots.mobile,
              CDPRED.screenshots['1080p']
            ),
            Object(o.c)(
              'wallpapers',
              CDPRED.wallpapers.mobile,
              CDPRED.wallpapers['mobile-full']
            ),
            Object(o.c)('arts', CDPRED.arts.mobile, CDPRED.arts['1080p']))
          : Object(o.a)(
              '.swiper-slide',
              '.swiper-slide img',
              '.l-gallery',
              '.l-gallery__swiper[data-type="screenshots"]',
              CDPRED.screenshots.desktop,
              CDPRED.screenshots['1080p'],
              isMobile,
              'screenshots'
            ),
        Object(o.b)(),
        Object(a.a)(isMobile),
        (window.onload = function() {
          Object(l.a)();
        });
      var u = document.querySelector('.l-header__play-button'),
        c = document.querySelector('.l-header__video');
      c &&
        c.addEventListener('click', function(e) {
          if (isMobile) return !0;
          u && u.click();
        });
    },
    nYho: function(e, t, n) {
      (function(e, r) {
        var i;
        /*! https://mths.be/punycode v1.3.2 by @mathias */ !(function(o) {
          t && t.nodeType, e && e.nodeType;
          var a = 'object' == typeof r && r;
          a.global !== a && a.window !== a && a.self;
          var s,
            l = 2147483647,
            u = 36,
            c = 1,
            h = 26,
            f = 38,
            p = 700,
            d = 72,
            m = 128,
            g = '-',
            v = /^xn--/,
            _ = /[^\x20-\x7E]/,
            y = /[\x2E\u3002\uFF0E\uFF61]/g,
            T = {
              overflow: 'Overflow: input needs wider integers to process',
              'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
              'invalid-input': 'Invalid input'
            },
            b = u - c,
            x = Math.floor,
            w = String.fromCharCode;
          function E(e) {
            throw RangeError(T[e]);
          }
          function A(e, t) {
            for (var n = e.length, r = []; n--; ) r[n] = t(e[n]);
            return r;
          }
          function C(e, t) {
            var n = e.split('@'),
              r = '';
            return (
              n.length > 1 && ((r = n[0] + '@'), (e = n[1])),
              r + A((e = e.replace(y, '.')).split('.'), t).join('.')
            );
          }
          function P(e) {
            for (var t, n, r = [], i = 0, o = e.length; i < o; )
              (t = e.charCodeAt(i++)) >= 55296 && t <= 56319 && i < o
                ? 56320 == (64512 & (n = e.charCodeAt(i++)))
                  ? r.push(((1023 & t) << 10) + (1023 & n) + 65536)
                  : (r.push(t), i--)
                : r.push(t);
            return r;
          }
          function R(e) {
            return A(e, function(e) {
              var t = '';
              return (
                e > 65535 &&
                  ((t += w((((e -= 65536) >>> 10) & 1023) | 55296)),
                  (e = 56320 | (1023 & e))),
                (t += w(e))
              );
            }).join('');
          }
          function I(e, t) {
            return e + 22 + 75 * (e < 26) - ((0 != t) << 5);
          }
          function S(e, t, n) {
            var r = 0;
            for (
              e = n ? x(e / p) : e >> 1, e += x(e / t);
              e > (b * h) >> 1;
              r += u
            )
              e = x(e / b);
            return x(r + ((b + 1) * e) / (e + f));
          }
          function M(e) {
            var t,
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
              T = e.length,
              b = 0,
              w = m,
              A = d;
            for ((n = e.lastIndexOf(g)) < 0 && (n = 0), r = 0; r < n; ++r)
              e.charCodeAt(r) >= 128 && E('not-basic'), y.push(e.charCodeAt(r));
            for (i = n > 0 ? n + 1 : 0; i < T; ) {
              for (
                o = b, a = 1, s = u;
                i >= T && E('invalid-input'),
                  ((f =
                    (_ = e.charCodeAt(i++)) - 48 < 10
                      ? _ - 22
                      : _ - 65 < 26
                      ? _ - 65
                      : _ - 97 < 26
                      ? _ - 97
                      : u) >= u ||
                    f > x((l - b) / a)) &&
                    E('overflow'),
                  (b += f * a),
                  !(f < (p = s <= A ? c : s >= A + h ? h : s - A));
                s += u
              )
                a > x(l / (v = u - p)) && E('overflow'), (a *= v);
              (A = S(b - o, (t = y.length + 1), 0 == o)),
                x(b / t) > l - w && E('overflow'),
                (w += x(b / t)),
                (b %= t),
                y.splice(b++, 0, w);
            }
            return R(y);
          }
          function O(e) {
            var t,
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
              T,
              b,
              A,
              C = [];
            for (y = (e = P(e)).length, t = m, n = 0, o = d, a = 0; a < y; ++a)
              (_ = e[a]) < 128 && C.push(w(_));
            for (r = i = C.length, i && C.push(g); r < y; ) {
              for (s = l, a = 0; a < y; ++a)
                (_ = e[a]) >= t && _ < s && (s = _);
              for (
                s - t > x((l - n) / (T = r + 1)) && E('overflow'),
                  n += (s - t) * T,
                  t = s,
                  a = 0;
                a < y;
                ++a
              )
                if (((_ = e[a]) < t && ++n > l && E('overflow'), _ == t)) {
                  for (
                    f = n, p = u;
                    !(f < (v = p <= o ? c : p >= o + h ? h : p - o));
                    p += u
                  )
                    (A = f - v),
                      (b = u - v),
                      C.push(w(I(v + (A % b), 0))),
                      (f = x(A / b));
                  C.push(w(I(f, 0))), (o = S(n, T, r == i)), (n = 0), ++r;
                }
              ++n, ++t;
            }
            return C.join('');
          }
          (s = {
            version: '1.3.2',
            ucs2: { decode: P, encode: R },
            decode: M,
            encode: O,
            toASCII: function(e) {
              return C(e, function(e) {
                return _.test(e) ? 'xn--' + O(e) : e;
              });
            },
            toUnicode: function(e) {
              return C(e, function(e) {
                return v.test(e) ? M(e.slice(4).toLowerCase()) : e;
              });
            }
          }),
            void 0 ===
              (i = function() {
                return s;
              }.call(t, n, t, e)) || (e.exports = i);
        })();
      }.call(this, n('YuTi')(e), n('yLpj')));
    },
    nmnc: function(e, t, n) {
      var r = n('Kz5y').Symbol;
      e.exports = r;
    },
    'o/2B': function(e, t) {
      function n(e, t, n) {
        (this.shortMessage = t || ''),
          (this.longMessage = n || ''),
          (this.rawError = e || ''),
          (this.message = 'gl-shader: ' + (t || e || '') + (n ? '\n' + n : '')),
          (this.stack = new Error().stack);
      }
      (n.prototype = new Error()),
        (n.prototype.name = 'GLError'),
        (n.prototype.constructor = n),
        (e.exports = n);
    },
    'p/9t': function(e, t, n) {},
    p46w: function(e, t, n) {
      var r, i;
      /*!
       * JavaScript Cookie v2.2.0
       * https://github.com/js-cookie/js-cookie
       *
       * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
       * Released under the MIT license
       */ !(function(o) {
        if (
          (void 0 ===
            (i = 'function' == typeof (r = o) ? r.call(t, n, t, e) : r) ||
            (e.exports = i),
          !0,
          (e.exports = o()),
          !!0)
        ) {
          var a = window.Cookies,
            s = (window.Cookies = o());
          s.noConflict = function() {
            return (window.Cookies = a), s;
          };
        }
      })(function() {
        function e() {
          for (var e = 0, t = {}; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n) t[r] = n[r];
          }
          return t;
        }
        return (function t(n) {
          function r(t, i, o) {
            var a;
            if ('undefined' != typeof document) {
              if (arguments.length > 1) {
                if (
                  'number' ==
                  typeof (o = e({ path: '/' }, r.defaults, o)).expires
                ) {
                  var s = new Date();
                  s.setMilliseconds(s.getMilliseconds() + 864e5 * o.expires),
                    (o.expires = s);
                }
                o.expires = o.expires ? o.expires.toUTCString() : '';
                try {
                  (a = JSON.stringify(i)), /^[\{\[]/.test(a) && (i = a);
                } catch (e) {}
                (i = n.write
                  ? n.write(i, t)
                  : encodeURIComponent(String(i)).replace(
                      /%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,
                      decodeURIComponent
                    )),
                  (t = (t = (t = encodeURIComponent(String(t))).replace(
                    /%(23|24|26|2B|5E|60|7C)/g,
                    decodeURIComponent
                  )).replace(/[\(\)]/g, escape));
                var l = '';
                for (var u in o)
                  o[u] && ((l += '; ' + u), !0 !== o[u] && (l += '=' + o[u]));
                return (document.cookie = t + '=' + i + l);
              }
              t || (a = {});
              for (
                var c = document.cookie ? document.cookie.split('; ') : [],
                  h = /(%[0-9A-Z]{2})+/g,
                  f = 0;
                f < c.length;
                f++
              ) {
                var p = c[f].split('='),
                  d = p.slice(1).join('=');
                this.json || '"' !== d.charAt(0) || (d = d.slice(1, -1));
                try {
                  var m = p[0].replace(h, decodeURIComponent);
                  if (
                    ((d = n.read
                      ? n.read(d, m)
                      : n(d, m) || d.replace(h, decodeURIComponent)),
                    this.json)
                  )
                    try {
                      d = JSON.parse(d);
                    } catch (e) {}
                  if (t === m) {
                    a = d;
                    break;
                  }
                  t || (a[m] = d);
                } catch (e) {}
              }
              return a;
            }
          }
          return (
            (r.set = r),
            (r.get = function(e) {
              return r.call(r, e);
            }),
            (r.getJSON = function() {
              return r.apply({ json: !0 }, [].slice.call(arguments));
            }),
            (r.defaults = {}),
            (r.remove = function(t, n) {
              r(t, '', e(n, { expires: -1 }));
            }),
            (r.withConverter = t),
            r
          );
        })(function() {});
      });
    },
    pIo5: function(e, t, n) {
      'use strict';
      function r(e) {
        var t = 32;
        return (
          (e &= -e) && t--,
          65535 & e && (t -= 16),
          16711935 & e && (t -= 8),
          252645135 & e && (t -= 4),
          858993459 & e && (t -= 2),
          1431655765 & e && (t -= 1),
          t
        );
      }
      (t.INT_BITS = 32),
        (t.INT_MAX = 2147483647),
        (t.INT_MIN = -1 << 31),
        (t.sign = function(e) {
          return (e > 0) - (e < 0);
        }),
        (t.abs = function(e) {
          var t = e >> 31;
          return (e ^ t) - t;
        }),
        (t.min = function(e, t) {
          return t ^ ((e ^ t) & -(e < t));
        }),
        (t.max = function(e, t) {
          return e ^ ((e ^ t) & -(e < t));
        }),
        (t.isPow2 = function(e) {
          return !(e & (e - 1) || !e);
        }),
        (t.log2 = function(e) {
          var t, n;
          return (
            (t = (e > 65535) << 4),
            (t |= n = ((e >>>= t) > 255) << 3),
            (t |= n = ((e >>>= n) > 15) << 2),
            (t |= n = ((e >>>= n) > 3) << 1) | ((e >>>= n) >> 1)
          );
        }),
        (t.log10 = function(e) {
          return e >= 1e9
            ? 9
            : e >= 1e8
            ? 8
            : e >= 1e7
            ? 7
            : e >= 1e6
            ? 6
            : e >= 1e5
            ? 5
            : e >= 1e4
            ? 4
            : e >= 1e3
            ? 3
            : e >= 100
            ? 2
            : e >= 10
            ? 1
            : 0;
        }),
        (t.popCount = function(e) {
          return (
            (16843009 *
              (((e =
                (858993459 & (e -= (e >>> 1) & 1431655765)) +
                ((e >>> 2) & 858993459)) +
                (e >>> 4)) &
                252645135)) >>>
            24
          );
        }),
        (t.countTrailingZeros = r),
        (t.nextPow2 = function(e) {
          return (
            (e += 0 === e),
            --e,
            (e |= e >>> 1),
            (e |= e >>> 2),
            (e |= e >>> 4),
            (e |= e >>> 8),
            (e |= e >>> 16) + 1
          );
        }),
        (t.prevPow2 = function(e) {
          return (
            (e |= e >>> 1),
            (e |= e >>> 2),
            (e |= e >>> 4),
            (e |= e >>> 8),
            (e |= e >>> 16) - (e >>> 1)
          );
        }),
        (t.parity = function(e) {
          return (
            (e ^= e >>> 16),
            (e ^= e >>> 8),
            (e ^= e >>> 4),
            (27030 >>> (e &= 15)) & 1
          );
        });
      var i = new Array(256);
      !(function(e) {
        for (var t = 0; t < 256; ++t) {
          var n = t,
            r = t,
            i = 7;
          for (n >>>= 1; n; n >>>= 1) (r <<= 1), (r |= 1 & n), --i;
          e[t] = (r << i) & 255;
        }
      })(i),
        (t.reverse = function(e) {
          return (
            (i[255 & e] << 24) |
            (i[(e >>> 8) & 255] << 16) |
            (i[(e >>> 16) & 255] << 8) |
            i[(e >>> 24) & 255]
          );
        }),
        (t.interleave2 = function(e, t) {
          return (
            (e =
              1431655765 &
              ((e =
                858993459 &
                ((e =
                  252645135 &
                  ((e = 16711935 & ((e &= 65535) | (e << 8))) | (e << 4))) |
                  (e << 2))) |
                (e << 1))) |
            ((t =
              1431655765 &
              ((t =
                858993459 &
                ((t =
                  252645135 &
                  ((t = 16711935 & ((t &= 65535) | (t << 8))) | (t << 4))) |
                  (t << 2))) |
                (t << 1))) <<
              1)
          );
        }),
        (t.deinterleave2 = function(e, t) {
          return (
            ((e =
              65535 &
              ((e =
                16711935 &
                ((e =
                  252645135 &
                  ((e =
                    858993459 & ((e = (e >>> t) & 1431655765) | (e >>> 1))) |
                    (e >>> 2))) |
                  (e >>> 4))) |
                (e >>> 16))) <<
              16) >>
            16
          );
        }),
        (t.interleave3 = function(e, t, n) {
          return (
            (e =
              1227133513 &
              ((e =
                3272356035 &
                ((e =
                  251719695 &
                  ((e = 4278190335 & ((e &= 1023) | (e << 16))) | (e << 8))) |
                  (e << 4))) |
                (e << 2))),
            (e |=
              (t =
                1227133513 &
                ((t =
                  3272356035 &
                  ((t =
                    251719695 &
                    ((t = 4278190335 & ((t &= 1023) | (t << 16))) | (t << 8))) |
                    (t << 4))) |
                  (t << 2))) << 1) |
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
        (t.deinterleave3 = function(e, t) {
          return (
            ((e =
              1023 &
              ((e =
                4278190335 &
                ((e =
                  251719695 &
                  ((e =
                    3272356035 & ((e = (e >>> t) & 1227133513) | (e >>> 2))) |
                    (e >>> 4))) |
                  (e >>> 8))) |
                (e >>> 16))) <<
              22) >>
            22
          );
        }),
        (t.nextCombination = function(e) {
          var t = e | (e - 1);
          return (t + 1) | (((~t & -~t) - 1) >>> (r(e) + 1));
        });
    },
    pynx: function(e, t, n) {},
    rhSW: function(e, t) {
      e.exports = {
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
    s4NR: function(e, t, n) {
      'use strict';
      (t.decode = t.parse = n('kd2E')), (t.encode = t.stringify = n('4JlD'));
    },
    sEfC: function(e, t, n) {
      var r = n('GoyQ'),
        i = n('QIyF'),
        o = n('tLB3'),
        a = 'Expected a function',
        s = Math.max,
        l = Math.min;
      e.exports = function(e, t, n) {
        var u,
          c,
          h,
          f,
          p,
          d,
          m = 0,
          g = !1,
          v = !1,
          _ = !0;
        if ('function' != typeof e) throw new TypeError(a);
        function y(t) {
          var n = u,
            r = c;
          return (u = c = void 0), (m = t), (f = e.apply(r, n));
        }
        function T(e) {
          var n = e - d;
          return void 0 === d || n >= t || n < 0 || (v && e - m >= h);
        }
        function b() {
          var e = i();
          if (T(e)) return x(e);
          p = setTimeout(
            b,
            (function(e) {
              var n = t - (e - d);
              return v ? l(n, h - (e - m)) : n;
            })(e)
          );
        }
        function x(e) {
          return (p = void 0), _ && u ? y(e) : ((u = c = void 0), f);
        }
        function w() {
          var e = i(),
            n = T(e);
          if (((u = arguments), (c = this), (d = e), n)) {
            if (void 0 === p)
              return (function(e) {
                return (m = e), (p = setTimeout(b, t)), g ? y(e) : f;
              })(d);
            if (v) return (p = setTimeout(b, t)), y(d);
          }
          return void 0 === p && (p = setTimeout(b, t)), f;
        }
        return (
          (t = o(t) || 0),
          r(n) &&
            ((g = !!n.leading),
            (h = (v = 'maxWait' in n) ? s(o(n.maxWait) || 0, t) : h),
            (_ = 'trailing' in n ? !!n.trailing : _)),
          (w.cancel = function() {
            void 0 !== p && clearTimeout(p), (m = 0), (u = d = c = p = void 0);
          }),
          (w.flush = function() {
            return void 0 === p ? f : x(i());
          }),
          w
        );
      };
    },
    st01: function(e, t, n) {
      var r = n('AAS3'),
        i = n('6v/u');
      e.exports = function(e) {
        for (var t = Array.isArray(e) ? e : r(e), n = 0; n < t.length; n++) {
          var o = t[n];
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
    szI9: function(e, t) {
      e.exports = function(e, t) {
        var n = { identity: t },
          r = e.valueOf;
        return (
          Object.defineProperty(e, 'valueOf', {
            value: function(e) {
              return e !== t ? r.apply(this, arguments) : n;
            },
            writable: !0
          }),
          n
        );
      };
    },
    tCpK: function(e, t, n) {
      var r = n('rhSW');
      e.exports = function(e) {
        return r[e];
      };
    },
    tLB3: function(e, t, n) {
      var r = n('GoyQ'),
        i = n('/9aa'),
        o = NaN,
        a = /^\s+|\s+$/g,
        s = /^[-+]0x[0-9a-f]+$/i,
        l = /^0b[01]+$/i,
        u = /^0o[0-7]+$/i,
        c = parseInt;
      e.exports = function(e) {
        if ('number' == typeof e) return e;
        if (i(e)) return o;
        if (r(e)) {
          var t = 'function' == typeof e.valueOf ? e.valueOf() : e;
          e = r(t) ? t + '' : t;
        }
        if ('string' != typeof e) return 0 === e ? e : +e;
        e = e.replace(a, '');
        var n = l.test(e);
        return n || u.test(e) ? c(e.slice(2), n ? 2 : 8) : s.test(e) ? o : +e;
      };
    },
    tbvF: function(e, t, n) {
      var r = n('IDFI'),
        i = n('BEtg'),
        o = 'undefined' != typeof Float64Array;
      function a(e, t) {
        return e[0] - t[0];
      }
      function s() {
        var e,
          t = this.stride,
          n = new Array(t.length);
        for (e = 0; e < n.length; ++e) n[e] = [Math.abs(t[e]), e];
        n.sort(a);
        var r = new Array(n.length);
        for (e = 0; e < r.length; ++e) r[e] = n[e][1];
        return r;
      }
      function l(e, t) {
        var n = ['View', t, 'd', e].join('');
        t < 0 && (n = 'View_Nil' + e);
        var i = 'generic' === e;
        if (-1 === t) {
          var o =
            'function ' +
            n +
            '(a){this.data=a;};var proto=' +
            n +
            ".prototype;proto.dtype='" +
            e +
            "';proto.index=function(){return -1};proto.size=0;proto.dimension=-1;proto.shape=proto.stride=proto.order=[];proto.lo=proto.hi=proto.transpose=proto.step=function(){return new " +
            n +
            '(this.data);};proto.get=proto.set=function(){};proto.pick=function(){return null};return function construct_' +
            n +
            '(a){return new ' +
            n +
            '(a);}';
          return new Function(o)();
        }
        if (0 === t) {
          o =
            'function ' +
            n +
            '(a,d) {this.data = a;this.offset = d};var proto=' +
            n +
            ".prototype;proto.dtype='" +
            e +
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
          return new Function('TrivialArray', o)(u[e][0]);
        }
        o = ["'use strict'"];
        var a = r(t),
          l = a.map(function(e) {
            return 'i' + e;
          }),
          c =
            'this.offset+' +
            a
              .map(function(e) {
                return 'this.stride[' + e + ']*i' + e;
              })
              .join('+'),
          h = a
            .map(function(e) {
              return 'b' + e;
            })
            .join(','),
          f = a
            .map(function(e) {
              return 'c' + e;
            })
            .join(',');
        o.push(
          'function ' + n + '(a,' + h + ',' + f + ',d){this.data=a',
          'this.shape=[' + h + ']',
          'this.stride=[' + f + ']',
          'this.offset=d|0}',
          'var proto=' + n + '.prototype',
          "proto.dtype='" + e + "'",
          'proto.dimension=' + t
        ),
          o.push(
            "Object.defineProperty(proto,'size',{get:function " +
              n +
              '_size(){return ' +
              a
                .map(function(e) {
                  return 'this.shape[' + e + ']';
                })
                .join('*'),
            '}})'
          ),
          1 === t
            ? o.push('proto.order=[0]')
            : (o.push("Object.defineProperty(proto,'order',{get:"),
              t < 4
                ? (o.push('function ' + n + '_order(){'),
                  2 === t
                    ? o.push(
                        'return (Math.abs(this.stride[0])>Math.abs(this.stride[1]))?[1,0]:[0,1]}})'
                      )
                    : 3 === t &&
                      o.push(
                        'var s0=Math.abs(this.stride[0]),s1=Math.abs(this.stride[1]),s2=Math.abs(this.stride[2]);if(s0>s1){if(s1>s2){return [2,1,0];}else if(s0>s2){return [1,2,0];}else{return [1,0,2];}}else if(s0>s2){return [2,0,1];}else if(s2>s1){return [0,1,2];}else{return [0,2,1];}}})'
                      ))
                : o.push('ORDER})')),
          o.push('proto.set=function ' + n + '_set(' + l.join(',') + ',v){'),
          i
            ? o.push('return this.data.set(' + c + ',v)}')
            : o.push('return this.data[' + c + ']=v}'),
          o.push('proto.get=function ' + n + '_get(' + l.join(',') + '){'),
          i
            ? o.push('return this.data.get(' + c + ')}')
            : o.push('return this.data[' + c + ']}'),
          o.push(
            'proto.index=function ' + n + '_index(',
            l.join(),
            '){return ' + c + '}'
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
                .map(function(e) {
                  return [
                    '(typeof i',
                    e,
                    "!=='number'||i",
                    e,
                    '<0)?this.shape[',
                    e,
                    ']:i',
                    e,
                    '|0'
                  ].join('');
                })
                .join(',') +
              ',' +
              a
                .map(function(e) {
                  return 'this.stride[' + e + ']';
                })
                .join(',') +
              ',this.offset)}'
          );
        var p = a.map(function(e) {
            return 'a' + e + '=this.shape[' + e + ']';
          }),
          d = a.map(function(e) {
            return 'c' + e + '=this.stride[' + e + ']';
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
        for (var m = 0; m < t; ++m)
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
              .map(function(e) {
                return 'a' + e;
              })
              .join(',') +
            ',' +
            a
              .map(function(e) {
                return 'c' + e;
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
                .map(function(e) {
                  return 'a' + e + '=this.shape[' + e + ']';
                })
                .join(',') +
              ',' +
              a
                .map(function(e) {
                  return 'b' + e + '=this.stride[' + e + ']';
                })
                .join(',') +
              ',c=this.offset,d=0,ceil=Math.ceil'
          );
        for (m = 0; m < t; ++m)
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
              .map(function(e) {
                return 'a' + e;
              })
              .join(',') +
            ',' +
            a
              .map(function(e) {
                return 'b' + e;
              })
              .join(',') +
            ',c)}'
        );
        var g = new Array(t),
          v = new Array(t);
        for (m = 0; m < t; ++m)
          (g[m] = 'a[i' + m + ']'), (v[m] = 'b[i' + m + ']');
        o.push(
          'proto.transpose=function ' +
            n +
            '_transpose(' +
            l +
            '){' +
            l
              .map(function(e, t) {
                return e + '=(' + e + '===undefined?' + t + ':' + e + '|0)';
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
        for (m = 0; m < t; ++m)
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
                .map(function(e) {
                  return 'shape[' + e + ']';
                })
                .join(',') +
              ',' +
              a
                .map(function(e) {
                  return 'stride[' + e + ']';
                })
                .join(',') +
              ',offset)}'
          ),
          new Function('CTOR_LIST', 'ORDER', o.join('\n'))(u[e], s)
        );
      }
      var u = {
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
      e.exports = function(e, t, n, r) {
        if (void 0 === e) return (0, u.array[0])([]);
        'number' == typeof e && (e = [e]), void 0 === t && (t = [e.length]);
        var a = t.length;
        if (void 0 === n) {
          n = new Array(a);
          for (var s = a - 1, c = 1; s >= 0; --s) (n[s] = c), (c *= t[s]);
        }
        if (void 0 === r)
          for (r = 0, s = 0; s < a; ++s) n[s] < 0 && (r -= (t[s] - 1) * n[s]);
        for (
          var h = (function(e) {
              if (i(e)) return 'buffer';
              if (o)
                switch (Object.prototype.toString.call(e)) {
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
              return Array.isArray(e) ? 'array' : 'generic';
            })(e),
            f = u[h];
          f.length <= a + 1;

        )
          f.push(l(h, f.length - 1));
        return (0, f[a + 1])(e, t, n, r);
      };
    },
    tjlA: function(e, t, n) {
      'use strict';
      (function(e) {
        /*!
         * The buffer module from node.js, for the browser.
         *
         * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
         * @license  MIT
         */
        var r = n('H7XF'),
          i = n('kVK+'),
          o = n('IzUq');
        function a() {
          return l.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
        }
        function s(e, t) {
          if (a() < t) throw new RangeError('Invalid typed array length');
          return (
            l.TYPED_ARRAY_SUPPORT
              ? ((e = new Uint8Array(t)).__proto__ = l.prototype)
              : (null === e && (e = new l(t)), (e.length = t)),
            e
          );
        }
        function l(e, t, n) {
          if (!(l.TYPED_ARRAY_SUPPORT || this instanceof l))
            return new l(e, t, n);
          if ('number' == typeof e) {
            if ('string' == typeof t)
              throw new Error(
                'If encoding is specified then the first argument must be a string'
              );
            return h(this, e);
          }
          return u(this, e, t, n);
        }
        function u(e, t, n, r) {
          if ('number' == typeof t)
            throw new TypeError('"value" argument must not be a number');
          return 'undefined' != typeof ArrayBuffer && t instanceof ArrayBuffer
            ? (function(e, t, n, r) {
                if ((t.byteLength, n < 0 || t.byteLength < n))
                  throw new RangeError("'offset' is out of bounds");
                if (t.byteLength < n + (r || 0))
                  throw new RangeError("'length' is out of bounds");
                t =
                  void 0 === n && void 0 === r
                    ? new Uint8Array(t)
                    : void 0 === r
                    ? new Uint8Array(t, n)
                    : new Uint8Array(t, n, r);
                l.TYPED_ARRAY_SUPPORT
                  ? ((e = t).__proto__ = l.prototype)
                  : (e = f(e, t));
                return e;
              })(e, t, n, r)
            : 'string' == typeof t
            ? (function(e, t, n) {
                ('string' == typeof n && '' !== n) || (n = 'utf8');
                if (!l.isEncoding(n))
                  throw new TypeError(
                    '"encoding" must be a valid string encoding'
                  );
                var r = 0 | d(t, n),
                  i = (e = s(e, r)).write(t, n);
                i !== r && (e = e.slice(0, i));
                return e;
              })(e, t, n)
            : (function(e, t) {
                if (l.isBuffer(t)) {
                  var n = 0 | p(t.length);
                  return 0 === (e = s(e, n)).length
                    ? e
                    : (t.copy(e, 0, 0, n), e);
                }
                if (t) {
                  if (
                    ('undefined' != typeof ArrayBuffer &&
                      t.buffer instanceof ArrayBuffer) ||
                    'length' in t
                  )
                    return 'number' != typeof t.length || (r = t.length) != r
                      ? s(e, 0)
                      : f(e, t);
                  if ('Buffer' === t.type && o(t.data)) return f(e, t.data);
                }
                var r;
                throw new TypeError(
                  'First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.'
                );
              })(e, t);
        }
        function c(e) {
          if ('number' != typeof e)
            throw new TypeError('"size" argument must be a number');
          if (e < 0)
            throw new RangeError('"size" argument must not be negative');
        }
        function h(e, t) {
          if ((c(t), (e = s(e, t < 0 ? 0 : 0 | p(t))), !l.TYPED_ARRAY_SUPPORT))
            for (var n = 0; n < t; ++n) e[n] = 0;
          return e;
        }
        function f(e, t) {
          var n = t.length < 0 ? 0 : 0 | p(t.length);
          e = s(e, n);
          for (var r = 0; r < n; r += 1) e[r] = 255 & t[r];
          return e;
        }
        function p(e) {
          if (e >= a())
            throw new RangeError(
              'Attempt to allocate Buffer larger than maximum size: 0x' +
                a().toString(16) +
                ' bytes'
            );
          return 0 | e;
        }
        function d(e, t) {
          if (l.isBuffer(e)) return e.length;
          if (
            'undefined' != typeof ArrayBuffer &&
            'function' == typeof ArrayBuffer.isView &&
            (ArrayBuffer.isView(e) || e instanceof ArrayBuffer)
          )
            return e.byteLength;
          'string' != typeof e && (e = '' + e);
          var n = e.length;
          if (0 === n) return 0;
          for (var r = !1; ; )
            switch (t) {
              case 'ascii':
              case 'latin1':
              case 'binary':
                return n;
              case 'utf8':
              case 'utf-8':
              case void 0:
                return j(e).length;
              case 'ucs2':
              case 'ucs-2':
              case 'utf16le':
              case 'utf-16le':
                return 2 * n;
              case 'hex':
                return n >>> 1;
              case 'base64':
                return V(e).length;
              default:
                if (r) return j(e).length;
                (t = ('' + t).toLowerCase()), (r = !0);
            }
        }
        function m(e, t, n) {
          var r = !1;
          if (((void 0 === t || t < 0) && (t = 0), t > this.length)) return '';
          if (((void 0 === n || n > this.length) && (n = this.length), n <= 0))
            return '';
          if ((n >>>= 0) <= (t >>>= 0)) return '';
          for (e || (e = 'utf8'); ; )
            switch (e) {
              case 'hex':
                return S(this, t, n);
              case 'utf8':
              case 'utf-8':
                return C(this, t, n);
              case 'ascii':
                return R(this, t, n);
              case 'latin1':
              case 'binary':
                return I(this, t, n);
              case 'base64':
                return A(this, t, n);
              case 'ucs2':
              case 'ucs-2':
              case 'utf16le':
              case 'utf-16le':
                return M(this, t, n);
              default:
                if (r) throw new TypeError('Unknown encoding: ' + e);
                (e = (e + '').toLowerCase()), (r = !0);
            }
        }
        function g(e, t, n) {
          var r = e[t];
          (e[t] = e[n]), (e[n] = r);
        }
        function v(e, t, n, r, i) {
          if (0 === e.length) return -1;
          if (
            ('string' == typeof n
              ? ((r = n), (n = 0))
              : n > 2147483647
              ? (n = 2147483647)
              : n < -2147483648 && (n = -2147483648),
            (n = +n),
            isNaN(n) && (n = i ? 0 : e.length - 1),
            n < 0 && (n = e.length + n),
            n >= e.length)
          ) {
            if (i) return -1;
            n = e.length - 1;
          } else if (n < 0) {
            if (!i) return -1;
            n = 0;
          }
          if (('string' == typeof t && (t = l.from(t, r)), l.isBuffer(t)))
            return 0 === t.length ? -1 : _(e, t, n, r, i);
          if ('number' == typeof t)
            return (
              (t &= 255),
              l.TYPED_ARRAY_SUPPORT &&
              'function' == typeof Uint8Array.prototype.indexOf
                ? i
                  ? Uint8Array.prototype.indexOf.call(e, t, n)
                  : Uint8Array.prototype.lastIndexOf.call(e, t, n)
                : _(e, [t], n, r, i)
            );
          throw new TypeError('val must be string, number or Buffer');
        }
        function _(e, t, n, r, i) {
          var o,
            a = 1,
            s = e.length,
            l = t.length;
          if (
            void 0 !== r &&
            ('ucs2' === (r = String(r).toLowerCase()) ||
              'ucs-2' === r ||
              'utf16le' === r ||
              'utf-16le' === r)
          ) {
            if (e.length < 2 || t.length < 2) return -1;
            (a = 2), (s /= 2), (l /= 2), (n /= 2);
          }
          function u(e, t) {
            return 1 === a ? e[t] : e.readUInt16BE(t * a);
          }
          if (i) {
            var c = -1;
            for (o = n; o < s; o++)
              if (u(e, o) === u(t, -1 === c ? 0 : o - c)) {
                if ((-1 === c && (c = o), o - c + 1 === l)) return c * a;
              } else -1 !== c && (o -= o - c), (c = -1);
          } else
            for (n + l > s && (n = s - l), o = n; o >= 0; o--) {
              for (var h = !0, f = 0; f < l; f++)
                if (u(e, o + f) !== u(t, f)) {
                  h = !1;
                  break;
                }
              if (h) return o;
            }
          return -1;
        }
        function y(e, t, n, r) {
          n = Number(n) || 0;
          var i = e.length - n;
          r ? (r = Number(r)) > i && (r = i) : (r = i);
          var o = t.length;
          if (o % 2 != 0) throw new TypeError('Invalid hex string');
          r > o / 2 && (r = o / 2);
          for (var a = 0; a < r; ++a) {
            var s = parseInt(t.substr(2 * a, 2), 16);
            if (isNaN(s)) return a;
            e[n + a] = s;
          }
          return a;
        }
        function T(e, t, n, r) {
          return X(j(t, e.length - n), e, n, r);
        }
        function b(e, t, n, r) {
          return X(
            (function(e) {
              for (var t = [], n = 0; n < e.length; ++n)
                t.push(255 & e.charCodeAt(n));
              return t;
            })(t),
            e,
            n,
            r
          );
        }
        function x(e, t, n, r) {
          return b(e, t, n, r);
        }
        function w(e, t, n, r) {
          return X(V(t), e, n, r);
        }
        function E(e, t, n, r) {
          return X(
            (function(e, t) {
              for (
                var n, r, i, o = [], a = 0;
                a < e.length && !((t -= 2) < 0);
                ++a
              )
                (n = e.charCodeAt(a)),
                  (r = n >> 8),
                  (i = n % 256),
                  o.push(i),
                  o.push(r);
              return o;
            })(t, e.length - n),
            e,
            n,
            r
          );
        }
        function A(e, t, n) {
          return 0 === t && n === e.length
            ? r.fromByteArray(e)
            : r.fromByteArray(e.slice(t, n));
        }
        function C(e, t, n) {
          n = Math.min(e.length, n);
          for (var r = [], i = t; i < n; ) {
            var o,
              a,
              s,
              l,
              u = e[i],
              c = null,
              h = u > 239 ? 4 : u > 223 ? 3 : u > 191 ? 2 : 1;
            if (i + h <= n)
              switch (h) {
                case 1:
                  u < 128 && (c = u);
                  break;
                case 2:
                  128 == (192 & (o = e[i + 1])) &&
                    (l = ((31 & u) << 6) | (63 & o)) > 127 &&
                    (c = l);
                  break;
                case 3:
                  (o = e[i + 1]),
                    (a = e[i + 2]),
                    128 == (192 & o) &&
                      128 == (192 & a) &&
                      (l = ((15 & u) << 12) | ((63 & o) << 6) | (63 & a)) >
                        2047 &&
                      (l < 55296 || l > 57343) &&
                      (c = l);
                  break;
                case 4:
                  (o = e[i + 1]),
                    (a = e[i + 2]),
                    (s = e[i + 3]),
                    128 == (192 & o) &&
                      128 == (192 & a) &&
                      128 == (192 & s) &&
                      (l =
                        ((15 & u) << 18) |
                        ((63 & o) << 12) |
                        ((63 & a) << 6) |
                        (63 & s)) > 65535 &&
                      l < 1114112 &&
                      (c = l);
              }
            null === c
              ? ((c = 65533), (h = 1))
              : c > 65535 &&
                ((c -= 65536),
                r.push(((c >>> 10) & 1023) | 55296),
                (c = 56320 | (1023 & c))),
              r.push(c),
              (i += h);
          }
          return (function(e) {
            var t = e.length;
            if (t <= P) return String.fromCharCode.apply(String, e);
            var n = '',
              r = 0;
            for (; r < t; )
              n += String.fromCharCode.apply(String, e.slice(r, (r += P)));
            return n;
          })(r);
        }
        (t.Buffer = l),
          (t.SlowBuffer = function(e) {
            +e != e && (e = 0);
            return l.alloc(+e);
          }),
          (t.INSPECT_MAX_BYTES = 50),
          (l.TYPED_ARRAY_SUPPORT =
            void 0 !== e.TYPED_ARRAY_SUPPORT
              ? e.TYPED_ARRAY_SUPPORT
              : (function() {
                  try {
                    var e = new Uint8Array(1);
                    return (
                      (e.__proto__ = {
                        __proto__: Uint8Array.prototype,
                        foo: function() {
                          return 42;
                        }
                      }),
                      42 === e.foo() &&
                        'function' == typeof e.subarray &&
                        0 === e.subarray(1, 1).byteLength
                    );
                  } catch (e) {
                    return !1;
                  }
                })()),
          (t.kMaxLength = a()),
          (l.poolSize = 8192),
          (l._augment = function(e) {
            return (e.__proto__ = l.prototype), e;
          }),
          (l.from = function(e, t, n) {
            return u(null, e, t, n);
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
          (l.alloc = function(e, t, n) {
            return (function(e, t, n, r) {
              return (
                c(t),
                t <= 0
                  ? s(e, t)
                  : void 0 !== n
                  ? 'string' == typeof r
                    ? s(e, t).fill(n, r)
                    : s(e, t).fill(n)
                  : s(e, t)
              );
            })(null, e, t, n);
          }),
          (l.allocUnsafe = function(e) {
            return h(null, e);
          }),
          (l.allocUnsafeSlow = function(e) {
            return h(null, e);
          }),
          (l.isBuffer = function(e) {
            return !(null == e || !e._isBuffer);
          }),
          (l.compare = function(e, t) {
            if (!l.isBuffer(e) || !l.isBuffer(t))
              throw new TypeError('Arguments must be Buffers');
            if (e === t) return 0;
            for (
              var n = e.length, r = t.length, i = 0, o = Math.min(n, r);
              i < o;
              ++i
            )
              if (e[i] !== t[i]) {
                (n = e[i]), (r = t[i]);
                break;
              }
            return n < r ? -1 : r < n ? 1 : 0;
          }),
          (l.isEncoding = function(e) {
            switch (String(e).toLowerCase()) {
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
          (l.concat = function(e, t) {
            if (!o(e))
              throw new TypeError(
                '"list" argument must be an Array of Buffers'
              );
            if (0 === e.length) return l.alloc(0);
            var n;
            if (void 0 === t)
              for (t = 0, n = 0; n < e.length; ++n) t += e[n].length;
            var r = l.allocUnsafe(t),
              i = 0;
            for (n = 0; n < e.length; ++n) {
              var a = e[n];
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
            var e = this.length;
            if (e % 2 != 0)
              throw new RangeError('Buffer size must be a multiple of 16-bits');
            for (var t = 0; t < e; t += 2) g(this, t, t + 1);
            return this;
          }),
          (l.prototype.swap32 = function() {
            var e = this.length;
            if (e % 4 != 0)
              throw new RangeError('Buffer size must be a multiple of 32-bits');
            for (var t = 0; t < e; t += 4)
              g(this, t, t + 3), g(this, t + 1, t + 2);
            return this;
          }),
          (l.prototype.swap64 = function() {
            var e = this.length;
            if (e % 8 != 0)
              throw new RangeError('Buffer size must be a multiple of 64-bits');
            for (var t = 0; t < e; t += 8)
              g(this, t, t + 7),
                g(this, t + 1, t + 6),
                g(this, t + 2, t + 5),
                g(this, t + 3, t + 4);
            return this;
          }),
          (l.prototype.toString = function() {
            var e = 0 | this.length;
            return 0 === e
              ? ''
              : 0 === arguments.length
              ? C(this, 0, e)
              : m.apply(this, arguments);
          }),
          (l.prototype.equals = function(e) {
            if (!l.isBuffer(e))
              throw new TypeError('Argument must be a Buffer');
            return this === e || 0 === l.compare(this, e);
          }),
          (l.prototype.inspect = function() {
            var e = '',
              n = t.INSPECT_MAX_BYTES;
            return (
              this.length > 0 &&
                ((e = this.toString('hex', 0, n)
                  .match(/.{2}/g)
                  .join(' ')),
                this.length > n && (e += ' ... ')),
              '<Buffer ' + e + '>'
            );
          }),
          (l.prototype.compare = function(e, t, n, r, i) {
            if (!l.isBuffer(e))
              throw new TypeError('Argument must be a Buffer');
            if (
              (void 0 === t && (t = 0),
              void 0 === n && (n = e ? e.length : 0),
              void 0 === r && (r = 0),
              void 0 === i && (i = this.length),
              t < 0 || n > e.length || r < 0 || i > this.length)
            )
              throw new RangeError('out of range index');
            if (r >= i && t >= n) return 0;
            if (r >= i) return -1;
            if (t >= n) return 1;
            if (this === e) return 0;
            for (
              var o = (i >>>= 0) - (r >>>= 0),
                a = (n >>>= 0) - (t >>>= 0),
                s = Math.min(o, a),
                u = this.slice(r, i),
                c = e.slice(t, n),
                h = 0;
              h < s;
              ++h
            )
              if (u[h] !== c[h]) {
                (o = u[h]), (a = c[h]);
                break;
              }
            return o < a ? -1 : a < o ? 1 : 0;
          }),
          (l.prototype.includes = function(e, t, n) {
            return -1 !== this.indexOf(e, t, n);
          }),
          (l.prototype.indexOf = function(e, t, n) {
            return v(this, e, t, n, !0);
          }),
          (l.prototype.lastIndexOf = function(e, t, n) {
            return v(this, e, t, n, !1);
          }),
          (l.prototype.write = function(e, t, n, r) {
            if (void 0 === t) (r = 'utf8'), (n = this.length), (t = 0);
            else if (void 0 === n && 'string' == typeof t)
              (r = t), (n = this.length), (t = 0);
            else {
              if (!isFinite(t))
                throw new Error(
                  'Buffer.write(string, encoding, offset[, length]) is no longer supported'
                );
              (t |= 0),
                isFinite(n)
                  ? ((n |= 0), void 0 === r && (r = 'utf8'))
                  : ((r = n), (n = void 0));
            }
            var i = this.length - t;
            if (
              ((void 0 === n || n > i) && (n = i),
              (e.length > 0 && (n < 0 || t < 0)) || t > this.length)
            )
              throw new RangeError('Attempt to write outside buffer bounds');
            r || (r = 'utf8');
            for (var o = !1; ; )
              switch (r) {
                case 'hex':
                  return y(this, e, t, n);
                case 'utf8':
                case 'utf-8':
                  return T(this, e, t, n);
                case 'ascii':
                  return b(this, e, t, n);
                case 'latin1':
                case 'binary':
                  return x(this, e, t, n);
                case 'base64':
                  return w(this, e, t, n);
                case 'ucs2':
                case 'ucs-2':
                case 'utf16le':
                case 'utf-16le':
                  return E(this, e, t, n);
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
        function R(e, t, n) {
          var r = '';
          n = Math.min(e.length, n);
          for (var i = t; i < n; ++i) r += String.fromCharCode(127 & e[i]);
          return r;
        }
        function I(e, t, n) {
          var r = '';
          n = Math.min(e.length, n);
          for (var i = t; i < n; ++i) r += String.fromCharCode(e[i]);
          return r;
        }
        function S(e, t, n) {
          var r = e.length;
          (!t || t < 0) && (t = 0), (!n || n < 0 || n > r) && (n = r);
          for (var i = '', o = t; o < n; ++o) i += z(e[o]);
          return i;
        }
        function M(e, t, n) {
          for (var r = e.slice(t, n), i = '', o = 0; o < r.length; o += 2)
            i += String.fromCharCode(r[o] + 256 * r[o + 1]);
          return i;
        }
        function O(e, t, n) {
          if (e % 1 != 0 || e < 0) throw new RangeError('offset is not uint');
          if (e + t > n)
            throw new RangeError('Trying to access beyond buffer length');
        }
        function k(e, t, n, r, i, o) {
          if (!l.isBuffer(e))
            throw new TypeError('"buffer" argument must be a Buffer instance');
          if (t > i || t < o)
            throw new RangeError('"value" argument is out of bounds');
          if (n + r > e.length) throw new RangeError('Index out of range');
        }
        function N(e, t, n, r) {
          t < 0 && (t = 65535 + t + 1);
          for (var i = 0, o = Math.min(e.length - n, 2); i < o; ++i)
            e[n + i] =
              (t & (255 << (8 * (r ? i : 1 - i)))) >>> (8 * (r ? i : 1 - i));
        }
        function D(e, t, n, r) {
          t < 0 && (t = 4294967295 + t + 1);
          for (var i = 0, o = Math.min(e.length - n, 4); i < o; ++i)
            e[n + i] = (t >>> (8 * (r ? i : 3 - i))) & 255;
        }
        function F(e, t, n, r, i, o) {
          if (n + r > e.length) throw new RangeError('Index out of range');
          if (n < 0) throw new RangeError('Index out of range');
        }
        function L(e, t, n, r, o) {
          return o || F(e, 0, n, 4), i.write(e, t, n, r, 23, 4), n + 4;
        }
        function U(e, t, n, r, o) {
          return o || F(e, 0, n, 8), i.write(e, t, n, r, 52, 8), n + 8;
        }
        (l.prototype.slice = function(e, t) {
          var n,
            r = this.length;
          if (
            ((e = ~~e) < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r),
            (t = void 0 === t ? r : ~~t) < 0
              ? (t += r) < 0 && (t = 0)
              : t > r && (t = r),
            t < e && (t = e),
            l.TYPED_ARRAY_SUPPORT)
          )
            (n = this.subarray(e, t)).__proto__ = l.prototype;
          else {
            var i = t - e;
            n = new l(i, void 0);
            for (var o = 0; o < i; ++o) n[o] = this[o + e];
          }
          return n;
        }),
          (l.prototype.readUIntLE = function(e, t, n) {
            (e |= 0), (t |= 0), n || O(e, t, this.length);
            for (var r = this[e], i = 1, o = 0; ++o < t && (i *= 256); )
              r += this[e + o] * i;
            return r;
          }),
          (l.prototype.readUIntBE = function(e, t, n) {
            (e |= 0), (t |= 0), n || O(e, t, this.length);
            for (var r = this[e + --t], i = 1; t > 0 && (i *= 256); )
              r += this[e + --t] * i;
            return r;
          }),
          (l.prototype.readUInt8 = function(e, t) {
            return t || O(e, 1, this.length), this[e];
          }),
          (l.prototype.readUInt16LE = function(e, t) {
            return t || O(e, 2, this.length), this[e] | (this[e + 1] << 8);
          }),
          (l.prototype.readUInt16BE = function(e, t) {
            return t || O(e, 2, this.length), (this[e] << 8) | this[e + 1];
          }),
          (l.prototype.readUInt32LE = function(e, t) {
            return (
              t || O(e, 4, this.length),
              (this[e] | (this[e + 1] << 8) | (this[e + 2] << 16)) +
                16777216 * this[e + 3]
            );
          }),
          (l.prototype.readUInt32BE = function(e, t) {
            return (
              t || O(e, 4, this.length),
              16777216 * this[e] +
                ((this[e + 1] << 16) | (this[e + 2] << 8) | this[e + 3])
            );
          }),
          (l.prototype.readIntLE = function(e, t, n) {
            (e |= 0), (t |= 0), n || O(e, t, this.length);
            for (var r = this[e], i = 1, o = 0; ++o < t && (i *= 256); )
              r += this[e + o] * i;
            return r >= (i *= 128) && (r -= Math.pow(2, 8 * t)), r;
          }),
          (l.prototype.readIntBE = function(e, t, n) {
            (e |= 0), (t |= 0), n || O(e, t, this.length);
            for (var r = t, i = 1, o = this[e + --r]; r > 0 && (i *= 256); )
              o += this[e + --r] * i;
            return o >= (i *= 128) && (o -= Math.pow(2, 8 * t)), o;
          }),
          (l.prototype.readInt8 = function(e, t) {
            return (
              t || O(e, 1, this.length),
              128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
            );
          }),
          (l.prototype.readInt16LE = function(e, t) {
            t || O(e, 2, this.length);
            var n = this[e] | (this[e + 1] << 8);
            return 32768 & n ? 4294901760 | n : n;
          }),
          (l.prototype.readInt16BE = function(e, t) {
            t || O(e, 2, this.length);
            var n = this[e + 1] | (this[e] << 8);
            return 32768 & n ? 4294901760 | n : n;
          }),
          (l.prototype.readInt32LE = function(e, t) {
            return (
              t || O(e, 4, this.length),
              this[e] |
                (this[e + 1] << 8) |
                (this[e + 2] << 16) |
                (this[e + 3] << 24)
            );
          }),
          (l.prototype.readInt32BE = function(e, t) {
            return (
              t || O(e, 4, this.length),
              (this[e] << 24) |
                (this[e + 1] << 16) |
                (this[e + 2] << 8) |
                this[e + 3]
            );
          }),
          (l.prototype.readFloatLE = function(e, t) {
            return t || O(e, 4, this.length), i.read(this, e, !0, 23, 4);
          }),
          (l.prototype.readFloatBE = function(e, t) {
            return t || O(e, 4, this.length), i.read(this, e, !1, 23, 4);
          }),
          (l.prototype.readDoubleLE = function(e, t) {
            return t || O(e, 8, this.length), i.read(this, e, !0, 52, 8);
          }),
          (l.prototype.readDoubleBE = function(e, t) {
            return t || O(e, 8, this.length), i.read(this, e, !1, 52, 8);
          }),
          (l.prototype.writeUIntLE = function(e, t, n, r) {
            ((e = +e), (t |= 0), (n |= 0), r) ||
              k(this, e, t, n, Math.pow(2, 8 * n) - 1, 0);
            var i = 1,
              o = 0;
            for (this[t] = 255 & e; ++o < n && (i *= 256); )
              this[t + o] = (e / i) & 255;
            return t + n;
          }),
          (l.prototype.writeUIntBE = function(e, t, n, r) {
            ((e = +e), (t |= 0), (n |= 0), r) ||
              k(this, e, t, n, Math.pow(2, 8 * n) - 1, 0);
            var i = n - 1,
              o = 1;
            for (this[t + i] = 255 & e; --i >= 0 && (o *= 256); )
              this[t + i] = (e / o) & 255;
            return t + n;
          }),
          (l.prototype.writeUInt8 = function(e, t, n) {
            return (
              (e = +e),
              (t |= 0),
              n || k(this, e, t, 1, 255, 0),
              l.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)),
              (this[t] = 255 & e),
              t + 1
            );
          }),
          (l.prototype.writeUInt16LE = function(e, t, n) {
            return (
              (e = +e),
              (t |= 0),
              n || k(this, e, t, 2, 65535, 0),
              l.TYPED_ARRAY_SUPPORT
                ? ((this[t] = 255 & e), (this[t + 1] = e >>> 8))
                : N(this, e, t, !0),
              t + 2
            );
          }),
          (l.prototype.writeUInt16BE = function(e, t, n) {
            return (
              (e = +e),
              (t |= 0),
              n || k(this, e, t, 2, 65535, 0),
              l.TYPED_ARRAY_SUPPORT
                ? ((this[t] = e >>> 8), (this[t + 1] = 255 & e))
                : N(this, e, t, !1),
              t + 2
            );
          }),
          (l.prototype.writeUInt32LE = function(e, t, n) {
            return (
              (e = +e),
              (t |= 0),
              n || k(this, e, t, 4, 4294967295, 0),
              l.TYPED_ARRAY_SUPPORT
                ? ((this[t + 3] = e >>> 24),
                  (this[t + 2] = e >>> 16),
                  (this[t + 1] = e >>> 8),
                  (this[t] = 255 & e))
                : D(this, e, t, !0),
              t + 4
            );
          }),
          (l.prototype.writeUInt32BE = function(e, t, n) {
            return (
              (e = +e),
              (t |= 0),
              n || k(this, e, t, 4, 4294967295, 0),
              l.TYPED_ARRAY_SUPPORT
                ? ((this[t] = e >>> 24),
                  (this[t + 1] = e >>> 16),
                  (this[t + 2] = e >>> 8),
                  (this[t + 3] = 255 & e))
                : D(this, e, t, !1),
              t + 4
            );
          }),
          (l.prototype.writeIntLE = function(e, t, n, r) {
            if (((e = +e), (t |= 0), !r)) {
              var i = Math.pow(2, 8 * n - 1);
              k(this, e, t, n, i - 1, -i);
            }
            var o = 0,
              a = 1,
              s = 0;
            for (this[t] = 255 & e; ++o < n && (a *= 256); )
              e < 0 && 0 === s && 0 !== this[t + o - 1] && (s = 1),
                (this[t + o] = (((e / a) >> 0) - s) & 255);
            return t + n;
          }),
          (l.prototype.writeIntBE = function(e, t, n, r) {
            if (((e = +e), (t |= 0), !r)) {
              var i = Math.pow(2, 8 * n - 1);
              k(this, e, t, n, i - 1, -i);
            }
            var o = n - 1,
              a = 1,
              s = 0;
            for (this[t + o] = 255 & e; --o >= 0 && (a *= 256); )
              e < 0 && 0 === s && 0 !== this[t + o + 1] && (s = 1),
                (this[t + o] = (((e / a) >> 0) - s) & 255);
            return t + n;
          }),
          (l.prototype.writeInt8 = function(e, t, n) {
            return (
              (e = +e),
              (t |= 0),
              n || k(this, e, t, 1, 127, -128),
              l.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)),
              e < 0 && (e = 255 + e + 1),
              (this[t] = 255 & e),
              t + 1
            );
          }),
          (l.prototype.writeInt16LE = function(e, t, n) {
            return (
              (e = +e),
              (t |= 0),
              n || k(this, e, t, 2, 32767, -32768),
              l.TYPED_ARRAY_SUPPORT
                ? ((this[t] = 255 & e), (this[t + 1] = e >>> 8))
                : N(this, e, t, !0),
              t + 2
            );
          }),
          (l.prototype.writeInt16BE = function(e, t, n) {
            return (
              (e = +e),
              (t |= 0),
              n || k(this, e, t, 2, 32767, -32768),
              l.TYPED_ARRAY_SUPPORT
                ? ((this[t] = e >>> 8), (this[t + 1] = 255 & e))
                : N(this, e, t, !1),
              t + 2
            );
          }),
          (l.prototype.writeInt32LE = function(e, t, n) {
            return (
              (e = +e),
              (t |= 0),
              n || k(this, e, t, 4, 2147483647, -2147483648),
              l.TYPED_ARRAY_SUPPORT
                ? ((this[t] = 255 & e),
                  (this[t + 1] = e >>> 8),
                  (this[t + 2] = e >>> 16),
                  (this[t + 3] = e >>> 24))
                : D(this, e, t, !0),
              t + 4
            );
          }),
          (l.prototype.writeInt32BE = function(e, t, n) {
            return (
              (e = +e),
              (t |= 0),
              n || k(this, e, t, 4, 2147483647, -2147483648),
              e < 0 && (e = 4294967295 + e + 1),
              l.TYPED_ARRAY_SUPPORT
                ? ((this[t] = e >>> 24),
                  (this[t + 1] = e >>> 16),
                  (this[t + 2] = e >>> 8),
                  (this[t + 3] = 255 & e))
                : D(this, e, t, !1),
              t + 4
            );
          }),
          (l.prototype.writeFloatLE = function(e, t, n) {
            return L(this, e, t, !0, n);
          }),
          (l.prototype.writeFloatBE = function(e, t, n) {
            return L(this, e, t, !1, n);
          }),
          (l.prototype.writeDoubleLE = function(e, t, n) {
            return U(this, e, t, !0, n);
          }),
          (l.prototype.writeDoubleBE = function(e, t, n) {
            return U(this, e, t, !1, n);
          }),
          (l.prototype.copy = function(e, t, n, r) {
            if (
              (n || (n = 0),
              r || 0 === r || (r = this.length),
              t >= e.length && (t = e.length),
              t || (t = 0),
              r > 0 && r < n && (r = n),
              r === n)
            )
              return 0;
            if (0 === e.length || 0 === this.length) return 0;
            if (t < 0) throw new RangeError('targetStart out of bounds');
            if (n < 0 || n >= this.length)
              throw new RangeError('sourceStart out of bounds');
            if (r < 0) throw new RangeError('sourceEnd out of bounds');
            r > this.length && (r = this.length),
              e.length - t < r - n && (r = e.length - t + n);
            var i,
              o = r - n;
            if (this === e && n < t && t < r)
              for (i = o - 1; i >= 0; --i) e[i + t] = this[i + n];
            else if (o < 1e3 || !l.TYPED_ARRAY_SUPPORT)
              for (i = 0; i < o; ++i) e[i + t] = this[i + n];
            else Uint8Array.prototype.set.call(e, this.subarray(n, n + o), t);
            return o;
          }),
          (l.prototype.fill = function(e, t, n, r) {
            if ('string' == typeof e) {
              if (
                ('string' == typeof t
                  ? ((r = t), (t = 0), (n = this.length))
                  : 'string' == typeof n && ((r = n), (n = this.length)),
                1 === e.length)
              ) {
                var i = e.charCodeAt(0);
                i < 256 && (e = i);
              }
              if (void 0 !== r && 'string' != typeof r)
                throw new TypeError('encoding must be a string');
              if ('string' == typeof r && !l.isEncoding(r))
                throw new TypeError('Unknown encoding: ' + r);
            } else 'number' == typeof e && (e &= 255);
            if (t < 0 || this.length < t || this.length < n)
              throw new RangeError('Out of range index');
            if (n <= t) return this;
            var o;
            if (
              ((t >>>= 0),
              (n = void 0 === n ? this.length : n >>> 0),
              e || (e = 0),
              'number' == typeof e)
            )
              for (o = t; o < n; ++o) this[o] = e;
            else {
              var a = l.isBuffer(e) ? e : j(new l(e, r).toString()),
                s = a.length;
              for (o = 0; o < n - t; ++o) this[o + t] = a[o % s];
            }
            return this;
          });
        var B = /[^+\/0-9A-Za-z-_]/g;
        function z(e) {
          return e < 16 ? '0' + e.toString(16) : e.toString(16);
        }
        function j(e, t) {
          var n;
          t = t || 1 / 0;
          for (var r = e.length, i = null, o = [], a = 0; a < r; ++a) {
            if ((n = e.charCodeAt(a)) > 55295 && n < 57344) {
              if (!i) {
                if (n > 56319) {
                  (t -= 3) > -1 && o.push(239, 191, 189);
                  continue;
                }
                if (a + 1 === r) {
                  (t -= 3) > -1 && o.push(239, 191, 189);
                  continue;
                }
                i = n;
                continue;
              }
              if (n < 56320) {
                (t -= 3) > -1 && o.push(239, 191, 189), (i = n);
                continue;
              }
              n = 65536 + (((i - 55296) << 10) | (n - 56320));
            } else i && (t -= 3) > -1 && o.push(239, 191, 189);
            if (((i = null), n < 128)) {
              if ((t -= 1) < 0) break;
              o.push(n);
            } else if (n < 2048) {
              if ((t -= 2) < 0) break;
              o.push((n >> 6) | 192, (63 & n) | 128);
            } else if (n < 65536) {
              if ((t -= 3) < 0) break;
              o.push((n >> 12) | 224, ((n >> 6) & 63) | 128, (63 & n) | 128);
            } else {
              if (!(n < 1114112)) throw new Error('Invalid code point');
              if ((t -= 4) < 0) break;
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
        function V(e) {
          return r.toByteArray(
            (function(e) {
              if (
                (e = (function(e) {
                  return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, '');
                })(e).replace(B, '')).length < 2
              )
                return '';
              for (; e.length % 4 != 0; ) e += '=';
              return e;
            })(e)
          );
        }
        function X(e, t, n, r) {
          for (var i = 0; i < r && !(i + n >= t.length || i >= e.length); ++i)
            t[i + n] = e[i];
          return i;
        }
      }.call(this, n('yLpj')));
    },
    u50I: function(e, t, n) {
      'use strict';
      (function(e) {
        n.d(t, 'a', function() {
          return r;
        });
        var r = function() {
          var t = /(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
            n = e('.l-newsletter'),
            r = e('#newsletter_userEmail'),
            i = e('#newsletter_newsletterAcceptance'),
            o = e('#newsletter_submit'),
            a = e('.l-newsletter__caret');
          function s() {
            var e = r.val();
            if (e.length > 100) return !1;
            if (!t.test(e)) return !1;
            var n = e.split('@');
            return (
              !(n[0].length > 64) &&
              !n[1].split('.').some(function(e) {
                return e.length > 40;
              })
            );
          }
          function l() {
            s() && i.prop('checked')
              ? o.prop('disabled', !1)
              : o.prop('disabled', !0);
          }
          var u = !1;
          i
            .on('change', l)
            .on('mouseover', function() {
              u = !0;
            })
            .on('mouseout', function() {
              u = !1;
            }),
            r
              .on('focus', function() {
                n.addClass('l-newsletter--focus');
              })
              .on('blur', function() {
                '' !== e(this).val() ||
                  u ||
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
                e(this).val().length
                  ? (e(this).removeClass('empty'), a.hide())
                  : (e(this).addClass('empty'), a.show());
              })
              .addClass('empty'),
            e(document).on('submit', 'form[name="newsletter"]', function(t) {
              if ((t.preventDefault(), o.prop('disabled'))) return !1;
              var r = e(this).serialize();
              o.prop('disabled', !0),
                i.prop('disabled', !0),
                n.addClass('l-newsletter--loading'),
                e
                  .ajax({
                    type: e(this).attr('method'),
                    url: e(this).attr('action'),
                    data: r
                  })
                  .done(function(t) {
                    e('.l-newsletter-socials').addClass(
                      'l-newsletter-socials--newsletter-success'
                    );
                    var n = e('.l-newsletter-socials h2');
                    201 === t.status
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
                  .fail(function(t, n, r) {
                    e('.l-newsletter-socials').addClass(
                      'l-newsletter-socials--newsletter-error'
                    );
                    var i = e('.l-newsletter-socials h2');
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
    uD3L: function(e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var r,
        i =
          Object.assign ||
          function(e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = arguments[t];
              for (var r in n)
                Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
            }
            return e;
          },
        o = n('KN1S'),
        a = (r = o) && r.__esModule ? r : { default: r };
      var s =
          'attribute vec2 _p;\nvarying vec2 _uv;\nvoid main() {\ngl_Position = vec4(_p,0.0,1.0);\n_uv = vec2(0.5, 0.5) * (_p+vec2(1.0, 1.0));\n}',
        l = {
          cover: function(e) {
            return (
              '.5+(uv-.5)*vec2(min(ratio/' + e + ',1.),min(' + e + '/ratio,1.))'
            );
          },
          contain: function(e) {
            return (
              '.5+(uv-.5)*vec2(max(ratio/' + e + ',1.),max(' + e + '/ratio,1.))'
            );
          },
          stretch: function() {
            return 'uv';
          }
        },
        u = function(e, t) {
          var n = l[t];
          if (!n) throw new Error('invalid resizeMode=' + t);
          return (
            'precision highp float;varying vec2 _uv;uniform sampler2D from, to;uniform float progress, ratio, _fromR, _toR;vec4 getFromColor(vec2 uv){return texture2D(from,' +
            n('_fromR') +
            ');}vec4 getToColor(vec2 uv){return texture2D(to,' +
            n('_toR') +
            ');}\n' +
            e +
            '\nvoid main(){gl_FragColor=transition(_uv);}'
          );
        };
      t.default = function(e, t) {
        var n =
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
          r = i({ resizeMode: 'cover' }, n),
          o = r.resizeMode,
          l = (0, a.default)(e, s, u(t.glsl, o));
        return (
          l.bind(),
          l.attributes._p.pointer(),
          {
            draw: function(n, r, i) {
              var o =
                  arguments.length > 3 && void 0 !== arguments[3]
                    ? arguments[3]
                    : e.drawingBufferWidth,
                a =
                  arguments.length > 4 && void 0 !== arguments[4]
                    ? arguments[4]
                    : e.drawingBufferHeight,
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
              var u = 2;
              for (var c in t.paramsTypes) {
                var h = c in s ? s[c] : t.defaultParams[c];
                if ('sampler2D' === t.paramsTypes[c])
                  if (h) {
                    if ('function' != typeof h.bind)
                      throw new Error(
                        'uniform[' +
                          c +
                          ']: A gl-texture2d API-like object was expected'
                      );
                    l.uniforms[c] = h.bind(u++);
                  } else
                    console.warn(
                      'uniform[' +
                        c +
                        ']: A texture MUST be defined for uniform sampler2D of a texture'
                    );
                else l.uniforms[c] = h;
              }
              e.drawArrays(e.TRIANGLES, 0, 3);
            },
            dispose: function() {
              l.dispose();
            }
          }
        );
      };
    },
    uLzS: function(e, t, n) {
      'use strict';
      (function(e) {
        n.d(t, 'a', function() {
          return s;
        });
        var r = n('f26Q'),
          i = n('k2/K'),
          o = n.n(i),
          a = n('QdZy'),
          s = function(t) {
            if (!t)
              if (Object(r.d)()) {
                e('.l-quotes .swiper-container').css('display', 'block');
                new a.a(e('.l-quotes .swiper-container')[0], {
                  autoplay: { delay: 5e3 },
                  loop: !0,
                  allowTouchMove: !1
                });
              } else {
                e('.l-quotes-canvas').css('display', 'block');
                var n = e('.l-quotes-canvas')[0],
                  i = n.getContext('2d'),
                  s = n.width,
                  l = n.height,
                  u = e('.l-quotes .swiper-slide'),
                  c = [],
                  h = 0,
                  f = 0;
                u.map(function(t, n) {
                  var r, i, a, s;
                  (r = e(n)
                    .find('.c-quote__text')
                    .text()),
                    (i = e(n)
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
                    o.a.drawHTML(s).then(function(e) {
                      c.push(e.image), c.length === u.length && d();
                    });
                });
              }
            function p(e, t) {
              return ~~(Math.random() * (t - e) + e);
            }
            function d() {
              var e, t, n;
              i.clearRect(0, 0, s, l);
              for (var r = 0; r < l / 5; r++)
                (e = p(1, 10)),
                  0,
                  (t = 5 * r),
                  (n = s),
                  i.drawImage(c[h], 0, t, n, 5, 0 + e, t, n - e, 5);
              f < 3
                ? (setTimeout(d, p(20, 80)),
                  2 === ++f && (h = h < c.length - 1 ? h + 1 : 0))
                : f < 6
                ? (setTimeout(d, p(20, 80)), f++)
                : (i.clearRect(0, 0, s, l),
                  i.drawImage(c[h], 0, 0),
                  (f = 0),
                  setTimeout(d, 5e3));
            }
          };
      }.call(this, n('EVdn')));
    },
    vFz4: function(e, t, n) {
      'use strict';
      (function(e) {
        n.d(t, 'a', function() {
          return i;
        }),
          n.d(t, 'b', function() {
            return o;
          });
        var r = n('z/o8'),
          i = function(t, n) {
            e(document).on('mouseenter', t, function() {
              var e = this;
              n && (e = this.querySelector(n)),
                r.a.set(e, { transformOrigin: '0 0' }),
                r.a.to(e, 0.3, {
                  y: '100%',
                  opacity: 0,
                  ease: Power2.easeIn,
                  onComplete: function() {
                    r.a.set(e, { y: '-100%' }),
                      r.a.to(e, 0.3, {
                        y: '0%',
                        opacity: 1,
                        ease: Power2.easeOut
                      });
                  }
                });
            });
          },
          o = function(t, n, i) {
            e(document).on('mouseenter', t, function() {
              var e = this;
              n && (e = this.querySelector(n)),
                r.a.set(e, { transformOrigin: '0 0' }),
                r.a.to(e, 0.3, {
                  x: i ? '-100%' : '100%',
                  opacity: 0,
                  ease: Power2.easeIn,
                  onComplete: function() {
                    r.a.set(e, { x: i ? '100%' : '-100%' }),
                      r.a.to(e, 0.3, {
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
    vHxl: function(e, t, n) {
      'use strict';
      function r() {
        var e = document.querySelectorAll('.c-beep'),
          t =
            '···-- ···-- ·-·-·- ----· ---·· ----· ----· ···-- ·---- --··· --··-- -····- ·---- ·---- ---·· ·-·-·- ····- --··· ····· -···· ····· ··--- ····· ----· ----· ----· ----· ----· ----· ----·',
          n = 300,
          r = 0;
        function i() {
          for (var t = 0; t < e.length; t++)
            e[t].classList.remove('c-beep--active');
        }
        function o() {
          if (r > t.length - 1) return (r = 0), i(), void setTimeout(o, 7 * n);
          var s = t[r];
          !(function(t) {
            for (var n = 0; n < e.length; n++)
              t
                ? e[n].classList.add('c-beep--active')
                : e[n].classList.remove('c-beep--active');
          })(' ' !== s),
            setTimeout(
              a,
              (function(e) {
                if (' ' === e) return 3;
                if ('·' === e) return 1;
                if ('-' === e) return 3;
              })(s) * n
            ),
            r++;
        }
        function a() {
          i(), setTimeout(o, n);
        }
        e && o();
      }
      n.d(t, 'a', function() {
        return r;
      });
    },
    y81S: function(e, t, n) {
      'use strict';
      (function(e) {
        n.d(t, 'b', function() {
          return x;
        }),
          n.d(t, 'a', function() {
            return w;
          }),
          n.d(t, 'c', function() {
            return A;
          });
        n('g9XJ'), n('YisV');
        var r = n('Jbu2'),
          i = n.n(r),
          o = n('uD3L'),
          a = n.n(o),
          s = n('HVtM'),
          l = n.n(s),
          u = n('QdZy'),
          c = n('DzJC'),
          h = n.n(c),
          f = n('vFz4');
        function p(e) {
          return (
            (function(e) {
              if (Array.isArray(e)) {
                for (var t = 0, n = new Array(e.length); t < e.length; t++)
                  n[t] = e[t];
                return n;
              }
            })(e) ||
            (function(e) {
              if (
                Symbol.iterator in Object(e) ||
                '[object Arguments]' === Object.prototype.toString.call(e)
              )
                return Array.from(e);
            })(e) ||
            (function() {
              throw new TypeError(
                'Invalid attempt to spread non-iterable instance'
              );
            })()
          );
        }
        function d(e, t) {
          if (!(e instanceof t))
            throw new TypeError('Cannot call a class as a function');
        }
        function m(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            (r.enumerable = r.enumerable || !1),
              (r.configurable = !0),
              'value' in r && (r.writable = !0),
              Object.defineProperty(e, r.key, r);
          }
        }
        function g(e, t, n) {
          return t && m(e.prototype, t), n && m(e, n), e;
        }
        var v = (function() {
          function e(t, n) {
            d(this, e),
              (this.ctx = t.getContext('2d')),
              (this.options = n),
              (this.frm = 0),
              (this.hratio = this.ctx.canvas.height / 442);
          }
          return (
            g(e, [
              {
                key: 'drawImage',
                value: function(e, t, n) {
                  (this.img = e),
                    this.ctx.drawImage(
                      e,
                      t,
                      n,
                      this.ctx.canvas.width,
                      this.ctx.canvas.height
                    );
                }
              },
              {
                key: 'glitchSlip',
                value: function(e, t, n) {
                  if (n < t) {
                    var r = n;
                    (n = t), (t = r);
                  }
                  for (var i = t; i < n; i++) {
                    Math.random() < 0.1 && i++;
                    var o = this.ctx.getImageData(
                      0,
                      i,
                      this.ctx.canvas.width,
                      1
                    );
                    this.ctx.putImageData(o, Math.random() * e - e / 2, i);
                  }
                }
              },
              {
                key: 'process',
                value: function() {
                  var e = this.frm++;
                  this.drawImage(this.img, 0, 0),
                    this.glitchSlip(10, 200 * this.hratio, 300 * this.hratio),
                    90 < e % 100 &&
                      this.glitchSlip(
                        10,
                        100 * this.hratio * Math.random(),
                        400 * this.hratio * Math.random()
                      );
                }
              }
            ]),
            e
          );
        })();
        function _(e) {
          return (
            '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div>' +
            e +
            '</div></div></figcaption></figure></div>'
          );
        }
        function y() {
          return (
            '<div class="mfp-sharers"><span>' +
            CDPRED.gallery.tShare +
            '</span><button type="button" class="mfp-prevent-close mfp-share-facebook" data-base="https://www.facebook.com/sharer/sharer.php?u="></button><button type="button" class="mfp-prevent-close mfp-share-twitter" data-base="https://twitter.com/home?status="></button><button type="button" class="mfp-prevent-close mfp-share-reddit" data-base="https://reddit.com/submit?url="></button></div>'
          );
        }
        var T = (function() {
          function t(n, r, o, s, u, c) {
            var h = this;
            d(this, t),
              (this.disableGlitch = u),
              (this.images = r),
              (this.index = n),
              (this.elem = o[n]),
              (this.type = c);
            var f = document.createElement('canvas');
            (f.width = this.elem.width), (f.height = this.elem.height);
            var m = document.createElement('canvas');
            (m.className = 'glitch'),
              this.disableGlitch && m.classList.add('disabled'),
              (m.width = this.elem.width),
              (m.height = this.elem.height),
              this.disableGlitch ||
                ((this.Glitcher = new v(m)),
                this.Glitcher.drawImage(this.elem, 0, 0)),
              this.elem.parentNode.insertBefore(f, this.elem),
              this.elem.parentNode.replaceChild(m, this.elem),
              (this.timer = 0);
            (this.queue = []),
              this.disableGlitch ||
                e(m).hover(
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
            var g,
              T = this.gl.createBuffer();
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, T),
              this.gl.bufferData(
                this.gl.ARRAY_BUFFER,
                new Float32Array([-1, -1, -1, 4, 4, -1]),
                this.gl.STATIC_DRAW
              ),
              this.gl.viewport(0, 0, f.width, f.height),
              (this.transition = a()(
                this.gl,
                i.a.find(function(e) {
                  return 'morph' === e.name;
                })
              )),
              (this.imgTextures = []),
              [].forEach.call(r, function(e) {
                var t = h.gl,
                  n = l()(t, e);
                (n.minFilter = t.LINEAR),
                  (n.magFilter = t.LINEAR),
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
              (this.transitionPrev5 = this.transitionPrev5.bind(this)),
              'wallpapers' === c
                ? ((g =
                    '<div class="mfp-bottom-bar-actions" data-type="' +
                    c +
                    '">'),
                  CDPRED.gallery.desktopRes.forEach(function(e) {
                    g +=
                      '<button type="button" class="mfp-prevent-close mfp-download" data-res="' +
                      e +
                      '">' +
                      e +
                      '</button>';
                  }),
                  (g += '</div>'))
                : (g =
                    '<div class="mfp-bottom-bar-actions" data-type="' +
                    c +
                    '"><button type="button" class="mfp-prevent-close mfp-download" data-res="2160p">' +
                    CDPRED.gallery.tDownload4k +
                    '</button>' +
                    y() +
                    '</div>');
            var b = function(t) {
              t.preventDefault();
              var n = s.map(function(e) {
                  return { src: e };
                }),
                r = n.splice(0, this.index);
              n.splice.apply(n, [n.length, 0].concat(p(r))),
                e.magnificPopup.open({
                  type: 'image',
                  items: n,
                  mainClass: 'mfp-fade mfp-cp-gallery',
                  removalDelay: 160,
                  preloader: !1,
                  fixedContentPos: !0,
                  gallery: { enabled: !0 },
                  image: { markup: _(g) },
                  callbacks: {
                    change: function(t) {
                      e(this.content)
                        .find('.mfp-bottom-bar-actions')
                        .attr('data-url', t.src);
                    }
                  }
                });
            }.bind(this);
            e(f).on('click', b), this.disableGlitch || e(m).on('click', b);
            var x = this;
            e(document).on('galleryChanged', function(e, t) {
              t === x.type && x.repaint();
            });
          }
          return (
            g(t, [
              {
                key: 'getTexture',
                value: function(e) {
                  return this.imgTextures[this.getNormalizeIndex(e)];
                }
              },
              {
                key: 'getImage',
                value: function(e) {
                  return this.images[this.getNormalizeIndex(e)];
                }
              },
              {
                key: 'getNormalizeIndex',
                value: function(e) {
                  var t = this.images;
                  return e < 0 && (e = t.length + e), e % t.length;
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
                  var e = this.queue,
                    t = this.queueSpeed,
                    n = this.baseSpeed;
                  this.speedScale = e.length > 1 ? e.length * t : n;
                }
              },
              {
                key: 'execQueue',
                value: function() {
                  var e = this.queue;
                  if (e.length) {
                    var t = e[e.length - 1];
                    this.updateTranstionSpeed(), t();
                  }
                }
              },
              {
                key: 'enqueue',
                value: function(e) {
                  var t = this.queue;
                  t.push(e),
                    1 === t.length
                      ? this.execQueue()
                      : this.updateTranstionSpeed();
                }
              },
              {
                key: 'setupTransition',
                value: function(e) {
                  var t = this.index,
                    n = this.dir,
                    r = this.getNormalizeIndex(t + n * (e || 1));
                  (this.from = this.getTexture(t)),
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
                value: function(e) {
                  var t = this.speedScale,
                    n = this.start,
                    r = this.lastProgress,
                    i = this.from,
                    o = this.to,
                    a = this.elem,
                    s = this.strength,
                    l = this.dir,
                    u = this.transition,
                    c = this.index,
                    h = (((e - n) / 1e3) * t) % 1;
                  h >= r
                    ? ((this.lastProgress = h),
                      requestAnimationFrame(this.update.bind(this)),
                      u.draw(h, i, o, a.width, a.height, {
                        strength: -s * l,
                        direction: [-l, 0]
                      }))
                    : (this.disableGlitch ||
                        this.Glitcher.drawImage(this.getImage(c), 0, 0),
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
            t
          );
        })();
        function b(e, t) {
          var n = [];
          e.forEach(function(r, i) {
            var o = new Image();
            (o.index = i),
              (o.onload = function() {
                n.push(o),
                  n.length == e.length &&
                    (n.sort(function(e, t) {
                      return e.index > t.index ? 1 : t.index > e.index ? -1 : 0;
                    }),
                    t(n));
              }),
              (o.src = r);
          });
        }
        function x() {
          e('.l-gallery__nav').on('click', 'button:not(.active)', function() {
            var t = e(this);
            t.siblings().removeClass('active'),
              t.addClass('active'),
              (function(t) {
                var n = e('.l-gallery__swiper[data-type=' + t + ']');
                if (
                  (n.siblings().removeClass('active'),
                  n.addClass('active'),
                  isMobile)
                ) {
                  var r = n.find('.swiper-container')[0].swiper;
                  r.update();
                } else
                  'wallpapers' !== t || n.data('ready')
                    ? 'arts' !== t ||
                      n.data('ready') ||
                      window.setTimeout(function() {
                        w(
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
                        w(
                          '.swiper-slide',
                          '.swiper-slide img',
                          '.l-gallery',
                          '.l-gallery__swiper[data-type="wallpapers"]',
                          CDPRED.wallpapers.desktop,
                          CDPRED.wallpapers['1080p'],
                          isMobile,
                          'wallpapers'
                        );
                      }, 100),
                    e(document).trigger('galleryChanged', [t]);
              })(e(this).data('type'));
          });
        }
        function w(t, n, r, i, o, a, s, l) {
          var u = document.querySelectorAll(i + ' ' + t),
            c = document.querySelectorAll(i + ' ' + n),
            p = document.querySelector(r);
          e(i).data('ready', !0);
          var d = function() {
            if (p.offsetWidth > 767) {
              var e = Math.ceil((p.offsetWidth - 0) * (684 / 1346));
              (u[0].style.width = e + 'px'),
                (u[0].style.marginRight = '0px'),
                (e = Math.ceil((p.offsetWidth - 0) * (318 / 1346)));
              for (var t = 1; t < u.length; t++) u[t].style.width = e + 'px';
            } else {
              var n = p.offsetWidth;
              (u[0].style.width = n + 'px'), (u[0].style.marginRight = '0px');
            }
          };
          d(),
            window.addEventListener('resize', h()(d, 100)),
            b(o, function(t) {
              var n = new T(0, t, c, a, s, l),
                r = new T(1, t, c, a, s, l),
                o = new T(2, t, c, a, s, l),
                u = new T(3, t, c, a, s, l),
                h = new T(4, t, c, a, s, l);
              e(i + ' .swiper-button-next').click(function() {
                setTimeout(n.transitionNext5, 310),
                  setTimeout(r.transitionNext5, 240),
                  setTimeout(o.transitionNext5, 170),
                  setTimeout(u.transitionNext5, 100),
                  h.transitionNext5();
              }),
                e(i + ' .swiper-button-prev').click(function() {
                  setTimeout(h.transitionPrev5, 310),
                    setTimeout(u.transitionPrev5, 240),
                    setTimeout(o.transitionPrev5, 170),
                    setTimeout(r.transitionPrev5, 100),
                    n.transitionPrev5();
                });
            }),
            Object(f.b)(i + ' .swiper-button-next', '.icon'),
            Object(f.b)(i + ' .swiper-button-prev', '.icon', !0),
            E();
        }
        function E() {
          e(document).on(
            'click',
            '.mfp-cp-gallery .mfp-sharers button',
            function() {
              var t = e(this)
                .parents('.mfp-bottom-bar-actions')
                .attr('data-url')
                .replace('/1080p/', '/2160p/');
              location.href = e(this).attr('data-base') + encodeURIComponent(t);
            }
          ),
            e(document).on(
              'click',
              '.mfp-cp-gallery .mfp-download',
              function() {
                var t = e(this).data('res'),
                  n = e(this)
                    .parents('.mfp-bottom-bar-actions')
                    .attr('data-url')
                    .replace('/1080p/', '/' + t + '/');
                window.open(n);
              }
            );
        }
        function A(t, n, r) {
          var i,
            o,
            a,
            s = e('.l-gallery__swiper[data-type="' + t + '"]'),
            l = s.find('.swiper-wrapper')[0];
          l.innerHTML = '';
          for (var c = 0; c < n.length; c++)
            ((i = document.createElement('div')).className = 'swiper-slide'),
              i.setAttribute('data-mfp-src', r[c]),
              ((o = document.createElement('img')).src = n[c]),
              (i.dataset.id = c),
              i.appendChild(o),
              l.appendChild(i);
          function h(e) {
            e.preventDefault();
          }
          (a =
            'wallpapers' === t
              ? '<div class="mfp-bottom-bar-actions" data-type="' +
                t +
                '"><button type="button" class="mfp-prevent-close mfp-download" data-res="1080x1920">' +
                CDPRED.gallery.tDownload +
                '</button></div>'
              : '<div class="mfp-bottom-bar-actions" data-type="' +
                t +
                '">' +
                y() +
                '</div>'),
            e(l)
              .find('.swiper-slide')
              .magnificPopup({
                type: 'image',
                mainClass: 'mfp-fade mfp-cp-gallery',
                removalDelay: 160,
                preloader: !1,
                fixedContentPos: !0,
                gallery: { enabled: !0 },
                image: { markup: _(a) },
                callbacks: {
                  change: function(t) {
                    e(this.content)
                      .find('.mfp-bottom-bar-actions')
                      .attr('data-url', t.src.replace('/1080p/', '/2160p/'));
                  },
                  open: function() {
                    document.body.addEventListener('touchmove', h, !1);
                  },
                  close: function() {
                    document.body.removeEventListener('touchmove', h, !1);
                  }
                }
              }),
            e(document).on(
              'click',
              '.mfp-cp-gallery .mfp-sharers button',
              function() {
                var t = e(this)
                  .parents('.mfp-bottom-bar-actions')
                  .attr('data-url');
                location.href =
                  e(this).attr('data-base') + encodeURIComponent(t);
              }
            ),
            e(document).on(
              'click',
              '.mfp-cp-gallery .mfp-download',
              function() {
                var t = e(this).data('res'),
                  n = e(this)
                    .parents('.mfp-bottom-bar-actions')
                    .attr('data-url')
                    .replace('/1080p/', '/' + t + '/');
                window.open(n);
              }
            );
          new u.a(s.find('.swiper-container')[0], {
            freeMode: !0,
            slidesPerView: 2.5,
            spaceBetween: 15,
            slidesOffsetBefore: 15,
            slidesOffsetAfter: 15
          });
        }
      }.call(this, n('EVdn')));
    },
    yLpj: function(e, t) {
      var n;
      n = (function() {
        return this;
      })();
      try {
        n = n || new Function('return this')();
      } catch (e) {
        'object' == typeof window && (n = window);
      }
      e.exports = n;
    },
    'z/o8': function(e, t, n) {
      'use strict';
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
       **/ r.e._gsDefine(
        'TweenMax',
        ['core.Animation', 'core.SimpleTimeline', 'TweenLite'],
        function() {
          var e = function(e) {
              var t,
                n = [],
                r = e.length;
              for (t = 0; t !== r; n.push(e[t++]));
              return n;
            },
            t = function(e, t, n) {
              var r,
                i,
                o = e.cycle;
              for (r in o)
                (i = o[r]),
                  (e[r] =
                    'function' == typeof i ? i(n, t[n], t) : i[n % i.length]);
              delete e.cycle;
            },
            n = function(e) {
              if ('function' == typeof e) return e;
              var t = 'object' == typeof e ? e : { each: e },
                n = t.ease,
                r = t.from || 0,
                i = t.base || 0,
                o = {},
                a = isNaN(r),
                s = t.axis,
                l = { center: 0.5, end: 1 }[r] || 0;
              return function(e, u, c) {
                var h,
                  f,
                  p,
                  d,
                  m,
                  g,
                  v,
                  _,
                  y,
                  T = (c || t).length,
                  b = o[T];
                if (!b) {
                  if (!(y = 'auto' === t.grid ? 0 : (t.grid || [1 / 0])[0])) {
                    for (
                      v = -1 / 0;
                      v < (v = c[y++].getBoundingClientRect().left) && y < T;

                    );
                    y--;
                  }
                  for (
                    b = o[T] = [],
                      h = a ? Math.min(y, T) * l - 0.5 : r % y,
                      f = a ? (T * l) / y - 0.5 : (r / y) | 0,
                      v = 0,
                      _ = 1 / 0,
                      g = 0;
                    g < T;
                    g++
                  )
                    (p = (g % y) - h),
                      (d = f - ((g / y) | 0)),
                      (b[g] = m = s
                        ? Math.abs('y' === s ? d : p)
                        : Math.sqrt(p * p + d * d)),
                      m > v && (v = m),
                      m < _ && (_ = m);
                  (b.max = v - _),
                    (b.min = _),
                    (b.v = T =
                      t.amount ||
                      t.each *
                        (y > T
                          ? T - 1
                          : s
                          ? 'y' === s
                            ? T / y
                            : y
                          : Math.max(y, T / y)) ||
                      0),
                    (b.b = T < 0 ? i - T : i);
                }
                return (
                  (T = (b[e] - b.min) / b.max),
                  b.b + (n ? n.getRatio(T) : T) * b.v
                );
              };
            },
            i = function(e, t, n) {
              r.f.call(this, e, t, n),
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
            u = [];
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
            (l.updateTo = function(e, t) {
              var n,
                i = this.ratio,
                o = this.vars.immediateRender || e.immediateRender;
              for (n in (t &&
                this._startTime < this._timeline._time &&
                ((this._startTime = this._timeline._time),
                this._uncache(!1),
                this._gc
                  ? this._enabled(!0, !1)
                  : this._timeline.insert(this, this._startTime - this._delay)),
              e))
                this.vars[n] = e[n];
              if (this._initted || o)
                if (t) (this._initted = !1), o && this.render(0, !0, !0);
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
                  for (var s, l = 1 / (1 - i), u = this._firstPT; u; )
                    (s = u.s + u.c), (u.c *= l), (u.s = s - u.c), (u = u._next);
              return this;
            }),
            (l.render = function(e, t, n) {
              this._initted ||
                (0 === this._duration && this.vars.repeat && this.invalidate());
              var i,
                a,
                s,
                l,
                u,
                c,
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
                (e >= d - 1e-8 && e >= 0
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
                      (this._startTime === this._timeline._duration && (e = 0),
                      (y < 0 ||
                        (e <= 0 && e >= -1e-8) ||
                        (1e-8 === y && 'isPause' !== this.data)) &&
                        y !== e &&
                        ((n = !0), y > 1e-8 && (a = 'onReverseComplete')),
                      (this._rawPrevTime = f = !t || e || y === e ? e : 1e-8)))
                  : e < 1e-8
                  ? ((this._totalTime = this._time = this._cycle = 0),
                    (this.ratio = this._ease._calcEnd
                      ? this._ease.getRatio(0)
                      : 0),
                    (0 !== g || (0 === _ && y > 0)) &&
                      ((a = 'onReverseComplete'), (i = this._reversed)),
                    e > -1e-8
                      ? (e = 0)
                      : e < 0 &&
                        ((this._active = !1),
                        0 === _ &&
                          (this._initted || !this.vars.lazy || n) &&
                          (y >= 0 && (n = !0),
                          (this._rawPrevTime = f =
                            !t || e || y === e ? e : 1e-8))),
                    this._initted || (n = !0))
                  : ((this._totalTime = this._time = e),
                    0 !== this._repeat &&
                      ((l = _ + this._repeatDelay),
                      (this._cycle = (this._totalTime / l) >> 0),
                      0 !== this._cycle &&
                        this._cycle === this._totalTime / l &&
                        g <= e &&
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
                      ? ((u = this._time / _),
                        (1 === (c = this._easeType) || (3 === c && u >= 0.5)) &&
                          (u = 1 - u),
                        3 === c && (u *= 2),
                        1 === (h = this._easePower)
                          ? (u *= u)
                          : 2 === h
                          ? (u *= u * u)
                          : 3 === h
                          ? (u *= u * u * u)
                          : 4 === h && (u *= u * u * u * u),
                        (this.ratio =
                          1 === c
                            ? 1 - u
                            : 2 === c
                            ? u
                            : this._time / _ < 0.5
                            ? u / 2
                            : 1 - u / 2))
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
                      void (this._lazy = [e, t])
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
                        e >= 0 &&
                        (this._active = !0)),
                    0 === g &&
                      (2 === this._initted && e > 0 && this._init(),
                      this._startAt &&
                        (e >= 0
                          ? this._startAt.render(e, !0, n)
                          : a || (a = '_dummyGS')),
                      this.vars.onStart &&
                        ((0 === this._totalTime && 0 !== _) ||
                          t ||
                          this._callback('onStart'))),
                    s = this._firstPT;
                  s;

                )
                  s.f
                    ? s.t[s.p](s.c * this.ratio + s.s)
                    : (s.t[s.p] = s.c * this.ratio + s.s),
                    (s = s._next);
                this._onUpdate &&
                  (e < 0 &&
                    this._startAt &&
                    this._startTime &&
                    this._startAt.render(e, !0, n),
                  t ||
                    ((this._totalTime !== g || a) &&
                      this._callback('onUpdate'))),
                  this._cycle !== v &&
                    (t ||
                      this._gc ||
                      (this.vars.onRepeat && this._callback('onRepeat'))),
                  a &&
                    ((this._gc && !n) ||
                      (e < 0 &&
                        this._startAt &&
                        !this._onUpdate &&
                        this._startTime &&
                        this._startAt.render(e, !0, n),
                      i &&
                        (this._timeline.autoRemoveChildren &&
                          this._enabled(!1, !1),
                        (this._active = !1)),
                      !t && this.vars[a] && this._callback(a),
                      0 === _ &&
                        1e-8 === this._rawPrevTime &&
                        1e-8 !== f &&
                        (this._rawPrevTime = 0)));
              } else
                g !== this._totalTime &&
                  this._onUpdate &&
                  (t || this._callback('onUpdate'));
            }),
            (i.to = function(e, t, n) {
              return new i(e, t, n);
            }),
            (i.from = function(e, t, n) {
              return (
                (n.runBackwards = !0),
                (n.immediateRender = 0 != n.immediateRender),
                new i(e, t, n)
              );
            }),
            (i.fromTo = function(e, t, n, r) {
              return (
                (r.startAt = n),
                (r.immediateRender =
                  0 != r.immediateRender && 0 != n.immediateRender),
                new i(e, t, r)
              );
            }),
            (i.staggerTo = i.allTo = function(o, l, c, h, f, p, d) {
              var m,
                g,
                v,
                _,
                y = [],
                T = n(c.stagger || h),
                b = c.cycle,
                x = (c.startAt || u).cycle;
              for (
                s(o) ||
                  ('string' == typeof o && (o = r.f.selector(o) || o),
                  a(o) && (o = e(o))),
                  m = (o = o || []).length - 1,
                  v = 0;
                v <= m;
                v++
              ) {
                for (_ in ((g = {}), c)) g[_] = c[_];
                if (
                  (b &&
                    (t(g, o, v),
                    null != g.duration &&
                      ((l = g.duration), delete g.duration)),
                  x)
                ) {
                  for (_ in ((x = g.startAt = {}), c.startAt))
                    x[_] = c.startAt[_];
                  t(g.startAt, o, v);
                }
                (g.delay = T(v, o[v], o) + (g.delay || 0)),
                  v === m &&
                    f &&
                    (g.onComplete = function() {
                      c.onComplete &&
                        c.onComplete.apply(
                          c.onCompleteScope || this,
                          arguments
                        ),
                        f.apply(d || c.callbackScope || this, p || u);
                    }),
                  (y[v] = new i(o[v], l, g));
              }
              return y;
            }),
            (i.staggerFrom = i.allFrom = function(e, t, n, r, o, a, s) {
              return (
                (n.runBackwards = !0),
                (n.immediateRender = 0 != n.immediateRender),
                i.staggerTo(e, t, n, r, o, a, s)
              );
            }),
            (i.staggerFromTo = i.allFromTo = function(e, t, n, r, o, a, s, l) {
              return (
                (r.startAt = n),
                (r.immediateRender =
                  0 != r.immediateRender && 0 != n.immediateRender),
                i.staggerTo(e, t, r, o, a, s, l)
              );
            }),
            (i.delayedCall = function(e, t, n, r, o) {
              return new i(t, 0, {
                delay: e,
                onComplete: t,
                onCompleteParams: n,
                callbackScope: r,
                onReverseComplete: t,
                onReverseCompleteParams: n,
                immediateRender: !1,
                useFrames: o,
                overwrite: 0
              });
            }),
            (i.set = function(e, t) {
              return new i(e, 0, t);
            }),
            (i.isTweening = function(e) {
              return r.f.getTweensOf(e, !0).length > 0;
            });
          var c = function(e, t) {
              for (var n = [], i = 0, o = e._first; o; )
                o instanceof r.f
                  ? (n[i++] = o)
                  : (t && (n[i++] = o), (i = (n = n.concat(c(o, t))).length)),
                  (o = o._next);
              return n;
            },
            h = (i.getAllTweens = function(e) {
              return c(r.a._rootTimeline, e).concat(
                c(r.a._rootFramesTimeline, e)
              );
            });
          (i.killAll = function(e, t, n, i) {
            null == t && (t = !0), null == n && (n = !0);
            var o,
              a,
              s,
              l = h(0 != i),
              u = l.length,
              c = t && n && i;
            for (s = 0; s < u; s++)
              (a = l[s]),
                (c ||
                  a instanceof r.c ||
                  ((o = a.target === a.vars.onComplete) && n) ||
                  (t && !o)) &&
                  (e
                    ? a.totalTime(a._reversed ? 0 : a.totalDuration())
                    : a._enabled(!1, !1));
          }),
            (i.killChildTweensOf = function(t, n) {
              if (null != t) {
                var l,
                  u,
                  c,
                  h,
                  f,
                  p = o.tweenLookup;
                if (
                  ('string' == typeof t && (t = r.f.selector(t) || t),
                  a(t) && (t = e(t)),
                  s(t))
                )
                  for (h = t.length; --h > -1; ) i.killChildTweensOf(t[h], n);
                else {
                  for (c in ((l = []), p))
                    for (u = p[c].target.parentNode; u; )
                      u === t && (l = l.concat(p[c].tweens)),
                        (u = u.parentNode);
                  for (f = l.length, h = 0; h < f; h++)
                    n && l[h].totalTime(l[h].totalDuration()),
                      l[h]._enabled(!1, !1);
                }
              }
            });
          var f = function(e, t, n, i) {
            (t = !1 !== t), (n = !1 !== n);
            for (
              var o, a, s = h((i = !1 !== i)), l = t && n && i, u = s.length;
              --u > -1;

            )
              (a = s[u]),
                (l ||
                  a instanceof r.c ||
                  ((o = a.target === a.vars.onComplete) && n) ||
                  (t && !o)) &&
                  a.paused(e);
          };
          return (
            (i.pauseAll = function(e, t, n) {
              f(!0, e, t, n);
            }),
            (i.resumeAll = function(e, t, n) {
              f(!1, e, t, n);
            }),
            (i.globalTimeScale = function(e) {
              var t = r.a._rootTimeline,
                n = r.f.ticker.time;
              return arguments.length
                ? ((e = e || 1e-8),
                  (t._startTime = n - ((n - t._startTime) * t._timeScale) / e),
                  (t = r.a._rootFramesTimeline),
                  (n = r.f.ticker.frame),
                  (t._startTime = n - ((n - t._startTime) * t._timeScale) / e),
                  (t._timeScale = r.a._rootTimeline._timeScale = e),
                  e)
                : t._timeScale;
            }),
            (l.progress = function(e, t) {
              return arguments.length
                ? this.totalTime(
                    this.duration() *
                      (this._yoyo && 0 != (1 & this._cycle) ? 1 - e : e) +
                      this._cycle * (this._duration + this._repeatDelay),
                    t
                  )
                : this.duration()
                ? this._time / this._duration
                : this.ratio;
            }),
            (l.totalProgress = function(e, t) {
              return arguments.length
                ? this.totalTime(this.totalDuration() * e, t)
                : this._totalTime / this.totalDuration();
            }),
            (l.time = function(e, t) {
              if (!arguments.length) return this._time;
              this._dirty && this.totalDuration();
              var n = this._duration,
                r = this._cycle,
                i = r * (n + this._repeatDelay);
              return (
                e > n && (e = n),
                this.totalTime(
                  this._yoyo && 1 & r ? n - e + i : this._repeat ? e + i : e,
                  t
                )
              );
            }),
            (l.duration = function(e) {
              return arguments.length
                ? r.a.prototype.duration.call(this, e)
                : this._duration;
            }),
            (l.totalDuration = function(e) {
              return arguments.length
                ? -1 === this._repeat
                  ? this
                  : this.duration(
                      (e - this._repeat * this._repeatDelay) /
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
            (l.repeat = function(e) {
              return arguments.length
                ? ((this._repeat = e), this._uncache(!0))
                : this._repeat;
            }),
            (l.repeatDelay = function(e) {
              return arguments.length
                ? ((this._repeatDelay = e), this._uncache(!0))
                : this._repeatDelay;
            }),
            (l.yoyo = function(e) {
              return arguments.length ? ((this._yoyo = e), this) : this._yoyo;
            }),
            i
          );
        },
        !0
      );
      var i = r.g.TweenMax;
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
          var e,
            t,
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
          var u,
            c,
            h,
            f,
            p,
            d,
            m,
            g,
            v = /(?:\-|\.|\b)(\d|\.|e\-)+/g,
            _ = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
            y = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
            T = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b),?/gi,
            b = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
            x = /(?:\d|\-|\+|=|#|\.)*/g,
            w = /opacity *= *([^)]*)/i,
            E = /opacity:([^;]*)/i,
            A = /alpha\(opacity *=.+?\)/i,
            C = /^(rgb|hsl)/,
            P = /([A-Z])/g,
            R = /-([a-z])/gi,
            I = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
            S = function(e, t) {
              return t.toUpperCase();
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
            j = function(e, t) {
              var n = z.createElementNS
                ? z.createElementNS(t || 'http://www.w3.org/1999/xhtml', e)
                : z.createElement(e);
              return n.style ? n : z.createElement(e);
            },
            V = j('div'),
            X = j('img'),
            q = (o._internals = { _specialProps: s }),
            H = (r.e.navigator || {}).userAgent || '',
            G = (function() {
              var e = H.indexOf('Android'),
                t = j('a');
              return (
                (h =
                  -1 !== H.indexOf('Safari') &&
                  -1 === H.indexOf('Chrome') &&
                  (-1 === e || parseFloat(H.substr(e + 8, 2)) > 3)),
                (p =
                  h && parseFloat(H.substr(H.indexOf('Version/') + 8, 2)) < 6),
                (f = -1 !== H.indexOf('Firefox')),
                (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(H) ||
                  /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(H)) &&
                  (d = parseFloat(RegExp.$1)),
                !!t &&
                  ((t.style.cssText = 'top:1px;opacity:.55;'),
                  /^0.55/.test(t.style.opacity))
              );
            })(),
            Y = function(e) {
              return w.test(
                'string' == typeof e
                  ? e
                  : (e.currentStyle ? e.currentStyle.filter : e.style.filter) ||
                      ''
              )
                ? parseFloat(RegExp.$1) / 100
                : 1;
            },
            W = function(e) {
              r.e.console && console.log(e);
            },
            K = '',
            Z = '',
            J = function(e, t) {
              var n,
                r,
                i = (t = t || V).style;
              if (void 0 !== i[e]) return e;
              for (
                e = e.charAt(0).toUpperCase() + e.substr(1),
                  n = ['O', 'Moz', 'ms', 'Ms', 'Webkit'],
                  r = 5;
                --r > -1 && void 0 === i[n[r] + e];

              );
              return r >= 0
                ? ((K = '-' + (Z = 3 === r ? 'ms' : n[r]).toLowerCase() + '-'),
                  Z + e)
                : null;
            },
            Q =
              'undefined' != typeof window
                ? window
                : z.defaultView || { getComputedStyle: function() {} },
            $ = function(e) {
              return Q.getComputedStyle(e);
            },
            ee = (o.getStyle = function(e, t, n, r, i) {
              var o;
              return G || 'opacity' !== t
                ? (!r && e.style[t]
                    ? (o = e.style[t])
                    : (n = n || $(e))
                    ? (o =
                        n[t] ||
                        n.getPropertyValue(t) ||
                        n.getPropertyValue(t.replace(P, '-$1').toLowerCase()))
                    : e.currentStyle && (o = e.currentStyle[t]),
                  null == i ||
                  (o && 'none' !== o && 'auto' !== o && 'auto auto' !== o)
                    ? o
                    : i)
                : Y(e);
            }),
            te = (q.convertToPixels = function(e, t, n, i, a) {
              if ('px' === i || (!i && 'lineHeight' !== t)) return n;
              if ('auto' === i || !n) return 0;
              var s,
                l,
                u,
                c = M.test(t),
                h = e,
                f = V.style,
                p = n < 0,
                d = 1 === n;
              if ((p && (n = -n), d && (n *= 100), 'lineHeight' !== t || i))
                if ('%' === i && -1 !== t.indexOf('border'))
                  s = (n / 100) * (c ? e.clientWidth : e.clientHeight);
                else {
                  if (
                    ((f.cssText =
                      'border:0 solid red;position:' +
                      ee(e, 'position') +
                      ';line-height:0;'),
                    '%' !== i &&
                      h.appendChild &&
                      'v' !== i.charAt(0) &&
                      'rem' !== i)
                  )
                    f[c ? 'borderLeftWidth' : 'borderTopWidth'] = n + i;
                  else {
                    if (
                      ((h = e.parentNode || z.body),
                      -1 !== ee(h, 'display').indexOf('flex') &&
                        (f.position = 'absolute'),
                      (l = h._gsCache),
                      (u = r.f.ticker.frame),
                      l && c && l.time === u)
                    )
                      return (l.width * n) / 100;
                    f[c ? 'width' : 'height'] = n + i;
                  }
                  h.appendChild(V),
                    (s = parseFloat(V[c ? 'offsetWidth' : 'offsetHeight'])),
                    h.removeChild(V),
                    c &&
                      '%' === i &&
                      !1 !== o.cacheWidths &&
                      (((l = h._gsCache = h._gsCache || {}).time = u),
                      (l.width = (s / n) * 100)),
                    0 !== s || a || (s = te(e, t, n, i, !0));
                }
              else
                (l = $(e).lineHeight),
                  (e.style.lineHeight = n),
                  (s = parseFloat($(e).lineHeight)),
                  (e.style.lineHeight = l);
              return d && (s /= 100), p ? -s : s;
            }),
            ne = (q.calculateOffset = function(e, t, n) {
              if ('absolute' !== ee(e, 'position', n)) return 0;
              var r = 'left' === t ? 'Left' : 'Top',
                i = ee(e, 'margin' + r, n);
              return (
                e['offset' + r] -
                (te(e, t, parseFloat(i), i.replace(x, '')) || 0)
              );
            }),
            re = function(e, t) {
              var n,
                r,
                i,
                o = {};
              if ((t = t || $(e)))
                if ((n = t.length))
                  for (; --n > -1; )
                    (-1 !== (i = t[n]).indexOf('-transform') && Ne !== i) ||
                      (o[i.replace(R, S)] = t.getPropertyValue(i));
                else
                  for (n in t)
                    (-1 !== n.indexOf('Transform') && ke !== n) ||
                      (o[n] = t[n]);
              else if ((t = e.currentStyle || e.style))
                for (n in t)
                  'string' == typeof n &&
                    void 0 === o[n] &&
                    (o[n.replace(R, S)] = t[n]);
              return (
                G || (o.opacity = Y(e)),
                (r = Ye(e, t, !1)),
                (o.rotation = r.rotation),
                (o.skewX = r.skewX),
                (o.scaleX = r.scaleX),
                (o.scaleY = r.scaleY),
                (o.x = r.x),
                (o.y = r.y),
                Fe &&
                  ((o.z = r.z),
                  (o.rotationX = r.rotationX),
                  (o.rotationY = r.rotationY),
                  (o.scaleZ = r.scaleZ)),
                o.filters && delete o.filters,
                o
              );
            },
            ie = function(e, t, n, r, i) {
              var o,
                a,
                s,
                l = {},
                u = e.style;
              for (a in n)
                'cssText' !== a &&
                  'length' !== a &&
                  isNaN(a) &&
                  (t[a] !== (o = n[a]) || (i && i[a])) &&
                  -1 === a.indexOf('Origin') &&
                  (('number' != typeof o && 'string' != typeof o) ||
                    ((l[a] =
                      'auto' !== o || ('left' !== a && 'top' !== a)
                        ? ('' !== o && 'auto' !== o && 'none' !== o) ||
                          'string' != typeof t[a] ||
                          '' === t[a].replace(b, '')
                          ? o
                          : 0
                        : ne(e, a)),
                    void 0 !== u[a] && (s = new ye(u, a, u[a], s))));
              if (r) for (a in r) 'className' !== a && (l[a] = r[a]);
              return { difs: l, firstMPT: s };
            },
            oe = { width: ['Left', 'Right'], height: ['Top', 'Bottom'] },
            ae = ['marginLeft', 'marginRight', 'marginTop', 'marginBottom'],
            se = function(e, t, n) {
              if ('svg' === (e.nodeName + '').toLowerCase())
                return (n || $(e))[t] || 0;
              if (e.getCTM && qe(e)) return e.getBBox()[t] || 0;
              var r = parseFloat(
                  'width' === t ? e.offsetWidth : e.offsetHeight
                ),
                i = oe[t],
                o = i.length;
              for (n = n || $(e); --o > -1; )
                (r -= parseFloat(ee(e, 'padding' + i[o], n, !0)) || 0),
                  (r -=
                    parseFloat(ee(e, 'border' + i[o] + 'Width', n, !0)) || 0);
              return r;
            },
            le = function(e, t) {
              if ('contain' === e || 'auto' === e || 'auto auto' === e)
                return e + ' ';
              (null != e && '' !== e) || (e = '0 0');
              var n,
                r = e.split(' '),
                i =
                  -1 !== e.indexOf('left')
                    ? '0%'
                    : -1 !== e.indexOf('right')
                    ? '100%'
                    : r[0],
                o =
                  -1 !== e.indexOf('top')
                    ? '0%'
                    : -1 !== e.indexOf('bottom')
                    ? '100%'
                    : r[1];
              if (r.length > 3 && !t) {
                for (
                  r = e
                    .split(', ')
                    .join(',')
                    .split(','),
                    e = [],
                    n = 0;
                  n < r.length;
                  n++
                )
                  e.push(le(r[n]));
                return e.join(',');
              }
              return (
                null == o
                  ? (o = 'center' === i ? '50%' : '0')
                  : 'center' === o && (o = '50%'),
                ('center' === i ||
                  (isNaN(parseFloat(i)) && -1 === (i + '').indexOf('='))) &&
                  (i = '50%'),
                (e = i + ' ' + o + (r.length > 2 ? ' ' + r[2] : '')),
                t &&
                  ((t.oxp = -1 !== i.indexOf('%')),
                  (t.oyp = -1 !== o.indexOf('%')),
                  (t.oxr = '=' === i.charAt(1)),
                  (t.oyr = '=' === o.charAt(1)),
                  (t.ox = parseFloat(i.replace(b, ''))),
                  (t.oy = parseFloat(o.replace(b, ''))),
                  (t.v = e)),
                t || e
              );
            },
            ue = function(e, t) {
              return (
                'function' == typeof e && (e = e(g, m)),
                'string' == typeof e && '=' === e.charAt(1)
                  ? parseInt(e.charAt(0) + '1', 10) * parseFloat(e.substr(2))
                  : parseFloat(e) - parseFloat(t) || 0
              );
            },
            ce = function(e, t) {
              'function' == typeof e && (e = e(g, m));
              var n = 'string' == typeof e && '=' === e.charAt(1);
              return (
                'string' == typeof e &&
                  'v' === e.charAt(e.length - 2) &&
                  (e =
                    (n ? e.substr(0, 2) : 0) +
                    window[
                      'inner' + ('vh' === e.substr(-2) ? 'Height' : 'Width')
                    ] *
                      (parseFloat(n ? e.substr(2) : e) / 100)),
                null == e
                  ? t
                  : n
                  ? parseInt(e.charAt(0) + '1', 10) * parseFloat(e.substr(2)) +
                    t
                  : parseFloat(e) || 0
              );
            },
            he = function(e, t, n, r) {
              var i, o, a, s;
              return (
                'function' == typeof e && (e = e(g, m)),
                null == e
                  ? (a = t)
                  : 'number' == typeof e
                  ? (a = e)
                  : (360,
                    (i = e.split('_')),
                    (o =
                      ((s = '=' === e.charAt(1))
                        ? parseInt(e.charAt(0) + '1', 10) *
                          parseFloat(i[0].substr(2))
                        : parseFloat(i[0])) *
                        (-1 === e.indexOf('rad') ? 1 : L) -
                      (s ? 0 : t)),
                    i.length &&
                      (r && (r[n] = t + o),
                      -1 !== e.indexOf('short') &&
                        (o %= 360) !== o % 180 &&
                        (o = o < 0 ? o + 360 : o - 360),
                      -1 !== e.indexOf('_cw') && o < 0
                        ? (o =
                            ((o + 3599999999640) % 360) - 360 * ((o / 360) | 0))
                        : -1 !== e.indexOf('ccw') &&
                          o > 0 &&
                          (o =
                            ((o - 3599999999640) % 360) -
                            360 * ((o / 360) | 0))),
                    (a = t + o)),
                a < 1e-6 && a > -1e-6 && (a = 0),
                a
              );
            },
            fe = {
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
            pe = function(e, t, n) {
              return (
                (255 *
                  (6 * (e = e < 0 ? e + 1 : e > 1 ? e - 1 : e) < 1
                    ? t + (n - t) * e * 6
                    : e < 0.5
                    ? n
                    : 3 * e < 2
                    ? t + (n - t) * (2 / 3 - e) * 6
                    : t) +
                  0.5) |
                0
              );
            },
            de = (o.parseColor = function(e, t) {
              var n, r, i, o, a, s, l, u, c, h, f;
              if (e)
                if ('number' == typeof e)
                  n = [e >> 16, (e >> 8) & 255, 255 & e];
                else {
                  if (
                    (',' === e.charAt(e.length - 1) &&
                      (e = e.substr(0, e.length - 1)),
                    fe[e])
                  )
                    n = fe[e];
                  else if ('#' === e.charAt(0))
                    4 === e.length &&
                      ((r = e.charAt(1)),
                      (i = e.charAt(2)),
                      (o = e.charAt(3)),
                      (e = '#' + r + r + i + i + o + o)),
                      (n = [
                        (e = parseInt(e.substr(1), 16)) >> 16,
                        (e >> 8) & 255,
                        255 & e
                      ]);
                  else if ('hsl' === e.substr(0, 3))
                    if (((n = f = e.match(v)), t)) {
                      if (-1 !== e.indexOf('=')) return e.match(_);
                    } else
                      (a = (Number(n[0]) % 360) / 360),
                        (s = Number(n[1]) / 100),
                        (r =
                          2 * (l = Number(n[2]) / 100) -
                          (i = l <= 0.5 ? l * (s + 1) : l + s - l * s)),
                        n.length > 3 && (n[3] = Number(n[3])),
                        (n[0] = pe(a + 1 / 3, r, i)),
                        (n[1] = pe(a, r, i)),
                        (n[2] = pe(a - 1 / 3, r, i));
                  else n = e.match(v) || fe.transparent;
                  (n[0] = Number(n[0])),
                    (n[1] = Number(n[1])),
                    (n[2] = Number(n[2])),
                    n.length > 3 && (n[3] = Number(n[3]));
                }
              else n = fe.black;
              return (
                t &&
                  !f &&
                  ((r = n[0] / 255),
                  (i = n[1] / 255),
                  (o = n[2] / 255),
                  (l = ((u = Math.max(r, i, o)) + (c = Math.min(r, i, o))) / 2),
                  u === c
                    ? (a = s = 0)
                    : ((h = u - c),
                      (s = l > 0.5 ? h / (2 - u - c) : h / (u + c)),
                      (a =
                        u === r
                          ? (i - o) / h + (i < o ? 6 : 0)
                          : u === i
                          ? (o - r) / h + 2
                          : (r - i) / h + 4),
                      (a *= 60)),
                  (n[0] = (a + 0.5) | 0),
                  (n[1] = (100 * s + 0.5) | 0),
                  (n[2] = (100 * l + 0.5) | 0)),
                n
              );
            }),
            me = function(e, t) {
              var n,
                r,
                i,
                o = e.match(ge) || [],
                a = 0,
                s = '';
              if (!o.length) return e;
              for (n = 0; n < o.length; n++)
                (r = o[n]),
                  (a +=
                    (i = e.substr(a, e.indexOf(r, a) - a)).length + r.length),
                  3 === (r = de(r, t)).length && r.push(1),
                  (s +=
                    i +
                    (t
                      ? 'hsla(' + r[0] + ',' + r[1] + '%,' + r[2] + '%,' + r[3]
                      : 'rgba(' + r.join(',')) +
                    ')');
              return s + e.substr(a);
            },
            ge =
              '(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b';
          for (l in fe) ge += '|' + l + '\\b';
          (ge = new RegExp(ge + ')', 'gi')),
            (o.colorStringFilter = function(e) {
              var t,
                n = e[0] + ' ' + e[1];
              ge.test(n) &&
                ((t = -1 !== n.indexOf('hsl(') || -1 !== n.indexOf('hsla(')),
                (e[0] = me(e[0], t)),
                (e[1] = me(e[1], t))),
                (ge.lastIndex = 0);
            }),
            r.f.defaultStringFilter ||
              (r.f.defaultStringFilter = o.colorStringFilter);
          var ve = function(e, t, n, r) {
              if (null == e)
                return function(e) {
                  return e;
                };
              var i,
                o = t ? (e.match(ge) || [''])[0] : '',
                a =
                  e
                    .split(o)
                    .join('')
                    .match(y) || [],
                s = e.substr(0, e.indexOf(a[0])),
                l = ')' === e.charAt(e.length - 1) ? ')' : '',
                u = -1 !== e.indexOf(' ') ? ' ' : ',',
                c = a.length,
                h = c > 0 ? a[0].replace(v, '') : '';
              return c
                ? (i = t
                    ? function(e) {
                        var t, f, p, d;
                        if ('number' == typeof e) e += h;
                        else if (r && N.test(e)) {
                          for (
                            d = e.replace(N, '|').split('|'), p = 0;
                            p < d.length;
                            p++
                          )
                            d[p] = i(d[p]);
                          return d.join(',');
                        }
                        if (
                          ((t = (e.match(ge) || [o])[0]),
                          (p = (f =
                            e
                              .split(t)
                              .join('')
                              .match(y) || []).length),
                          c > p--)
                        )
                          for (; ++p < c; )
                            f[p] = n ? f[((p - 1) / 2) | 0] : a[p];
                        return (
                          s +
                          f.join(u) +
                          u +
                          t +
                          l +
                          (-1 !== e.indexOf('inset') ? ' inset' : '')
                        );
                      }
                    : function(e) {
                        var t, o, f;
                        if ('number' == typeof e) e += h;
                        else if (r && N.test(e)) {
                          for (
                            o = e.replace(N, '|').split('|'), f = 0;
                            f < o.length;
                            f++
                          )
                            o[f] = i(o[f]);
                          return o.join(',');
                        }
                        if (
                          ((f = (t = e.match(',' === u ? y : T) || []).length),
                          c > f--)
                        )
                          for (; ++f < c; )
                            t[f] = n ? t[((f - 1) / 2) | 0] : a[f];
                        return (
                          ((s &&
                            'none' !== e &&
                            e.substr(0, e.indexOf(t[0]))) ||
                            s) +
                          t.join(u) +
                          l
                        );
                      })
                : function(e) {
                    return e;
                  };
            },
            _e = function(e) {
              return (
                (e = e.split(',')),
                function(t, n, r, i, o, a, s) {
                  var l,
                    u = (n + '').split(' ');
                  for (s = {}, l = 0; l < 4; l++)
                    s[e[l]] = u[l] = u[l] || u[((l - 1) / 2) >> 0];
                  return i.parse(t, s, o, a);
                }
              );
            },
            ye =
              ((q._setPluginRatio = function(e) {
                this.plugin.setRatio(e);
                for (
                  var t, n, r, i, o, a = this.data, s = a.proxy, l = a.firstMPT;
                  l;

                )
                  (t = s[l.v]),
                    l.r ? (t = l.r(t)) : t < 1e-6 && t > -1e-6 && (t = 0),
                    (l.t[l.p] = t),
                    (l = l._next);
                if (
                  (a.autoRotate &&
                    (a.autoRotate.rotation = a.mod
                      ? a.mod.call(this._tween, s.rotation, this.t, this._tween)
                      : s.rotation),
                  1 === e || 0 === e)
                )
                  for (l = a.firstMPT, o = 1 === e ? 'e' : 'b'; l; ) {
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
              function(e, t, n, r, i) {
                (this.t = e),
                  (this.p = t),
                  (this.v = n),
                  (this.r = i),
                  r && ((r._prev = this), (this._next = r));
              }),
            Te =
              ((q._parseToProxy = function(e, t, n, r, i, o) {
                var a,
                  s,
                  l,
                  u,
                  c,
                  h = r,
                  f = {},
                  p = {},
                  d = n._transform,
                  m = U;
                for (
                  n._transform = null,
                    U = t,
                    r = c = n.parse(e, t, r, i),
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
                    o || ((u = new ye(r, 's', s, u, r.r)), (r.c = 0)),
                    1 === r.type)
                  )
                    for (a = r.l; --a > 0; )
                      (l = 'xn' + a),
                        (p[(s = r.p + '_' + l)] = r.data[l]),
                        (f[s] = r[l]),
                        o || (u = new ye(r, l, s, u, r.rxp[l]));
                  r = r._next;
                }
                return { proxy: f, end: p, firstMPT: u, pt: c };
              }),
              (q.CSSPropTween = function(t, n, r, o, a, s, l, u, c, h, f) {
                (this.t = t),
                  (this.p = n),
                  (this.s = r),
                  (this.c = o),
                  (this.n = l || n),
                  t instanceof Te || i.push(this.n),
                  (this.r = u ? ('function' == typeof u ? u : Math.round) : u),
                  (this.type = s || 0),
                  c && ((this.pr = c), (e = !0)),
                  (this.b = void 0 === h ? r : h),
                  (this.e = void 0 === f ? r + o : f),
                  a && ((this._next = a), (a._prev = this));
              })),
            be = function(e, t, n, r, i, o) {
              var a = new Te(e, t, n, r - n, i, -1, o);
              return (a.b = n), (a.e = a.xs0 = r), a;
            },
            xe = (o.parseComplex = function(e, t, n, r, i, a, s, l, c, h) {
              (n = n || a || ''),
                'function' == typeof r && (r = r(g, m)),
                (s = new Te(e, t, 0, 0, s, h ? 2 : 1, null, !1, l, n, r)),
                (r += ''),
                i &&
                  ge.test(r + n) &&
                  ((r = [n, r]),
                  o.colorStringFilter(r),
                  (n = r[0]),
                  (r = r[1]));
              var f,
                p,
                d,
                y,
                T,
                b,
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
                O = !1 !== u;
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
                  s.plugin = c,
                  s.setRatio = h,
                  ge.lastIndex = 0,
                  f = 0;
                f < M;
                f++
              )
                if (
                  ((y = I[f]), (T = S[f] + ''), (w = parseFloat(y)) || 0 === w)
                )
                  s.appendXtra(
                    '',
                    w,
                    ue(T, w),
                    T.replace(_, ''),
                    !(!O || -1 === T.indexOf('px')) && Math.round,
                    !0
                  );
                else if (i && ge.test(y))
                  (P = ')' + ((P = T.indexOf(')') + 1) ? T.substr(P) : '')),
                    (R = -1 !== T.indexOf('hsl') && G),
                    (A = T),
                    (y = de(y, R)),
                    (T = de(T, R)),
                    (E = y.length + T.length > 6) && !G && 0 === T[3]
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
                                ue(T[0], y[0]),
                                ',',
                                !1,
                                !0
                              )
                              .appendXtra('', y[1], ue(T[1], y[1]), '%,', !1)
                              .appendXtra(
                                '',
                                y[2],
                                ue(T[2], y[2]),
                                E ? '%,' : '%' + P,
                                !1
                              )
                          : s
                              .appendXtra(
                                A.substr(0, A.indexOf('rgb')) +
                                  (E ? 'rgba(' : 'rgb('),
                                y[0],
                                T[0] - y[0],
                                ',',
                                Math.round,
                                !0
                              )
                              .appendXtra(
                                '',
                                y[1],
                                T[1] - y[1],
                                ',',
                                Math.round
                              )
                              .appendXtra(
                                '',
                                y[2],
                                T[2] - y[2],
                                E ? ',' : P,
                                Math.round
                              ),
                        E &&
                          ((y = y.length < 4 ? 1 : y[3]),
                          s.appendXtra(
                            '',
                            y,
                            (T.length < 4 ? 1 : T[3]) - y,
                            P,
                            !1
                          ))),
                    (ge.lastIndex = 0);
                else if ((b = y.match(v))) {
                  if (!(x = T.match(_)) || x.length !== b.length) return s;
                  for (d = 0, p = 0; p < b.length; p++)
                    (C = b[p]),
                      (A = y.indexOf(C, d)),
                      s.appendXtra(
                        y.substr(d, A - d),
                        Number(C),
                        ue(x[p], C),
                        '',
                        !(!O || 'px' !== y.substr(A + C.length, 2)) &&
                          Math.round,
                        0 === p
                      ),
                      (d = A + C.length);
                  s['xs' + s.l] += y.substr(d);
                } else s['xs' + s.l] += s.l || s['xs' + s.l] ? ' ' + T : T;
              if (-1 !== r.indexOf('=') && s.data) {
                for (P = s.xs0 + s.data.s, f = 1; f < s.l; f++)
                  P += s['xs' + f] + s.data['xn' + f];
                s.e = P + s['xs' + f];
              }
              return s.l || ((s.type = -1), (s.xs0 = s.e)), s.xfirst || s;
            }),
            we = 9;
          for ((l = Te.prototype).l = l.pr = 0; --we > 0; )
            (l['xn' + we] = 0), (l['xs' + we] = '');
          (l.xs0 = ''),
            (l._next = l._prev = l.xfirst = l.data = l.plugin = l.setRatio = l.rxp = null),
            (l.appendXtra = function(e, t, n, r, i, o) {
              var a = this,
                s = a.l;
              return (
                (a['xs' + s] += o && (s || a['xs' + s]) ? ' ' + e : e || ''),
                n || 0 === s || a.plugin
                  ? (a.l++,
                    (a.type = a.setRatio ? 2 : 1),
                    (a['xs' + a.l] = r || ''),
                    s > 0
                      ? ((a.data['xn' + s] = t + n),
                        (a.rxp['xn' + s] = i),
                        (a['xn' + s] = t),
                        a.plugin ||
                          ((a.xfirst = new Te(
                            a,
                            'xn' + s,
                            t,
                            n,
                            a.xfirst || a,
                            0,
                            a.n,
                            i,
                            a.pr
                          )),
                          (a.xfirst.xs0 = 0)),
                        a)
                      : ((a.data = { s: t + n }),
                        (a.rxp = {}),
                        (a.s = t),
                        (a.c = n),
                        (a.r = i),
                        a))
                  : ((a['xs' + s] += t + (r || '')), a)
              );
            });
          var Ee = function(e, t) {
              (t = t || {}),
                (this.p = (t.prefix && J(e)) || e),
                (s[e] = s[this.p] = this),
                (this.format =
                  t.formatter ||
                  ve(t.defaultValue, t.color, t.collapsible, t.multi)),
                t.parser && (this.parse = t.parser),
                (this.clrs = t.color),
                (this.multi = t.multi),
                (this.keyword = t.keyword),
                (this.dflt = t.defaultValue),
                (this.allowFunc = t.allowFunc),
                (this.pr = t.priority || 0);
            },
            Ae = (q._registerComplexSpecialProp = function(e, t, n) {
              'object' != typeof t && (t = { parser: n });
              var r,
                i = e.split(','),
                o = t.defaultValue;
              for (n = n || [o], r = 0; r < i.length; r++)
                (t.prefix = 0 === r && t.prefix),
                  (t.defaultValue = n[r] || o),
                  new Ee(i[r], t);
            }),
            Ce = (q._registerPluginProp = function(e) {
              if (!s[e]) {
                var t = e.charAt(0).toUpperCase() + e.substr(1) + 'Plugin';
                Ae(e, {
                  parser: function(e, n, r, i, o, l, u) {
                    var c = a.com.greensock.plugins[t];
                    return c
                      ? (c._cssRegister(), s[r].parse(e, n, r, i, o, l, u))
                      : (W('Error: ' + t + ' js file not loaded.'), o);
                  }
                });
              }
            });
          ((l = Ee.prototype).parseComplex = function(e, t, n, r, i, o) {
            var a,
              s,
              l,
              u,
              c,
              h,
              f = this.keyword;
            if (
              (this.multi &&
                (N.test(n) || N.test(t)
                  ? ((s = t.replace(N, '|').split('|')),
                    (l = n.replace(N, '|').split('|')))
                  : f && ((s = [t]), (l = [n]))),
              l)
            ) {
              for (
                u = l.length > s.length ? l.length : s.length, a = 0;
                a < u;
                a++
              )
                (t = s[a] = s[a] || this.dflt),
                  (n = l[a] = l[a] || this.dflt),
                  f &&
                    (c = t.indexOf(f)) !== (h = n.indexOf(f)) &&
                    (-1 === h
                      ? (s[a] = s[a].split(f).join(''))
                      : -1 === c && (s[a] += ' ' + f));
              (t = s.join(', ')), (n = l.join(', '));
            }
            return xe(e, this.p, t, n, this.clrs, this.dflt, r, this.pr, i, o);
          }),
            (l.parse = function(e, t, r, i, o, a, s) {
              return this.parseComplex(
                e.style,
                this.format(ee(e, this.p, n, !1, this.dflt)),
                this.format(t),
                o,
                a
              );
            }),
            (o.registerSpecialProp = function(e, t, n) {
              Ae(e, {
                parser: function(e, r, i, o, a, s, l) {
                  var u = new Te(e, i, 0, 0, a, 2, i, !1, n);
                  return (u.plugin = s), (u.setRatio = t(e, r, o._tween, i)), u;
                },
                priority: n
              });
            }),
            (o.useSVGTransformAttr = !0);
          var Pe,
            Re,
            Ie,
            Se,
            Me,
            Oe = 'scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent'.split(
              ','
            ),
            ke = J('transform'),
            Ne = K + 'transform',
            De = J('transformOrigin'),
            Fe = null !== J('perspective'),
            Le = (q.Transform = function() {
              (this.perspective =
                parseFloat(o.defaultTransformPerspective) || 0),
                (this.force3D =
                  !(!1 === o.defaultForce3D || !Fe) &&
                  (o.defaultForce3D || 'auto'));
            }),
            Ue = r.e.SVGElement,
            Be = function(e, t, n) {
              var r,
                i = z.createElementNS('http://www.w3.org/2000/svg', e),
                o = /([a-z])([A-Z])/g;
              for (r in n)
                i.setAttributeNS(
                  null,
                  r.replace(o, '$1-$2').toLowerCase(),
                  n[r]
                );
              return t.appendChild(i), i;
            },
            ze = z.documentElement || {},
            je =
              ((Me = d || (/Android/i.test(H) && !r.e.chrome)),
              z.createElementNS &&
                ze.appendChild &&
                !Me &&
                ((Re = Be('svg', ze)),
                (Se = (Ie = Be('rect', Re, {
                  width: 100,
                  height: 50,
                  x: 100
                })).getBoundingClientRect().width),
                (Ie.style[De] = '50% 50%'),
                (Ie.style[ke] = 'scaleX(0.5)'),
                (Me = Se === Ie.getBoundingClientRect().width && !(f && Fe)),
                ze.removeChild(Re)),
              Me),
            Ve = function(e, t, n, r, i, a) {
              var s,
                l,
                u,
                c,
                h,
                f,
                p,
                d,
                m,
                g,
                v,
                _,
                y,
                T,
                b = e._gsTransform,
                x = Ge(e, !0);
              b && ((y = b.xOrigin), (T = b.yOrigin)),
                (!r || (s = r.split(' ')).length < 2) &&
                  (0 === (p = e.getBBox()).x &&
                    0 === p.y &&
                    p.width + p.height === 0 &&
                    (p = {
                      x:
                        parseFloat(
                          e.hasAttribute('x')
                            ? e.getAttribute('x')
                            : e.hasAttribute('cx')
                            ? e.getAttribute('cx')
                            : 0
                        ) || 0,
                      y:
                        parseFloat(
                          e.hasAttribute('y')
                            ? e.getAttribute('y')
                            : e.hasAttribute('cy')
                            ? e.getAttribute('cy')
                            : 0
                        ) || 0,
                      width: 0,
                      height: 0
                    }),
                  (s = [
                    (-1 !== (t = le(t).split(' '))[0].indexOf('%')
                      ? (parseFloat(t[0]) / 100) * p.width
                      : parseFloat(t[0])) + p.x,
                    (-1 !== t[1].indexOf('%')
                      ? (parseFloat(t[1]) / 100) * p.height
                      : parseFloat(t[1])) + p.y
                  ])),
                (n.xOrigin = c = parseFloat(s[0])),
                (n.yOrigin = h = parseFloat(s[1])),
                r &&
                  x !== He &&
                  ((f = x[0]),
                  (p = x[1]),
                  (d = x[2]),
                  (m = x[3]),
                  (g = x[4]),
                  (v = x[5]),
                  (_ = f * m - p * d) &&
                    ((l = c * (m / _) + h * (-d / _) + (d * v - m * g) / _),
                    (u = c * (-p / _) + h * (f / _) - (f * v - p * g) / _),
                    (c = n.xOrigin = s[0] = l),
                    (h = n.yOrigin = s[1] = u))),
                b &&
                  (a &&
                    ((n.xOffset = b.xOffset), (n.yOffset = b.yOffset), (b = n)),
                  i || (!1 !== i && !1 !== o.defaultSmoothOrigin)
                    ? ((l = c - y),
                      (u = h - T),
                      (b.xOffset += l * x[0] + u * x[2] - l),
                      (b.yOffset += l * x[1] + u * x[3] - u))
                    : (b.xOffset = b.yOffset = 0)),
                a || e.setAttribute('data-svg-origin', s.join(' '));
            },
            Xe = function(e) {
              var t,
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
                (ze.appendChild(n),
                n.appendChild(this),
                (this.style.display = 'block'),
                e)
              )
                try {
                  (t = this.getBBox()),
                    (this._originalGetBBox = this.getBBox),
                    (this.getBBox = Xe);
                } catch (e) {}
              else this._originalGetBBox && (t = this._originalGetBBox());
              return (
                i ? r.insertBefore(this, i) : r.appendChild(this),
                ze.removeChild(n),
                (this.style.cssText = o),
                t
              );
            },
            qe = function(e) {
              return !(
                !Ue ||
                !e.getCTM ||
                (e.parentNode && !e.ownerSVGElement) ||
                !(function(e) {
                  try {
                    return e.getBBox();
                  } catch (t) {
                    return Xe.call(e, !0);
                  }
                })(e)
              );
            },
            He = [1, 0, 0, 1, 0, 0],
            Ge = function(e, t) {
              var n,
                r,
                i,
                o,
                a,
                s,
                l,
                u = e._gsTransform || new Le(),
                c = e.style;
              if (
                (ke
                  ? (r = ee(e, Ne, null, !0))
                  : e.currentStyle &&
                    (r =
                      (r = e.currentStyle.filter.match(O)) && 4 === r.length
                        ? [
                            r[0].substr(4),
                            Number(r[2].substr(4)),
                            Number(r[1].substr(4)),
                            r[3].substr(4),
                            u.x || 0,
                            u.y || 0
                          ].join(',')
                        : ''),
                (n = !r || 'none' === r || 'matrix(1, 0, 0, 1, 0, 0)' === r),
                ke &&
                  n &&
                  !e.offsetParent &&
                  e !== ze &&
                  ((o = c.display),
                  (c.display = 'block'),
                  ((l = e.parentNode) && e.offsetParent) ||
                    ((a = 1), (s = e.nextSibling), ze.appendChild(e)),
                  (n =
                    !(r = ee(e, Ne, null, !0)) ||
                    'none' === r ||
                    'matrix(1, 0, 0, 1, 0, 0)' === r),
                  o ? (c.display = o) : Je(c, 'display'),
                  a &&
                    (s
                      ? l.insertBefore(e, s)
                      : l
                      ? l.appendChild(e)
                      : ze.removeChild(e))),
                (u.svg || (e.getCTM && qe(e))) &&
                  (n &&
                    -1 !== (c[ke] + '').indexOf('matrix') &&
                    ((r = c[ke]), (n = 0)),
                  (i = e.getAttribute('transform')),
                  n &&
                    i &&
                    ((r =
                      'matrix(' +
                      (i = e.transform.baseVal.consolidate().matrix).a +
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
                return He;
              for (i = (r || '').match(v) || [], we = i.length; --we > -1; )
                (o = Number(i[we])),
                  (i[we] = (a = o - (o |= 0))
                    ? ((1e5 * a + (a < 0 ? -0.5 : 0.5)) | 0) / 1e5 + o
                    : o);
              return t && i.length > 6
                ? [i[0], i[1], i[4], i[5], i[12], i[13]]
                : i;
            },
            Ye = (q.getTransform = function(e, t, n, i) {
              if (e._gsTransform && n && !i) return e._gsTransform;
              var a,
                s,
                l,
                u,
                c,
                h,
                f = (n && e._gsTransform) || new Le(),
                p = f.scaleX < 0,
                d =
                  (Fe &&
                    (parseFloat(ee(e, De, t, !1, '0 0 0').split(' ')[2]) ||
                      f.zOrigin)) ||
                  0,
                m = parseFloat(o.defaultTransformPerspective) || 0;
              if (
                ((f.svg = !(!e.getCTM || !qe(e))),
                f.svg &&
                  (Ve(
                    e,
                    ee(e, De, t, !1, '50% 50%') + '',
                    f,
                    e.getAttribute('data-svg-origin')
                  ),
                  (Pe = o.useSVGTransformAttr || je)),
                (a = Ge(e)) !== He)
              ) {
                if (16 === a.length) {
                  var g,
                    v,
                    _,
                    y,
                    T,
                    b = a[0],
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
                      ((g = A * (y = Math.cos(-F)) + I * (T = Math.sin(-F))),
                      (v = C * y + S * T),
                      (_ = P * y + M * T),
                      (I = A * -T + I * y),
                      (S = C * -T + S * y),
                      (M = P * -T + M * y),
                      (D = R * -T + D * y),
                      (A = g),
                      (C = v),
                      (P = _)),
                    (F = Math.atan2(-w, M)),
                    (f.rotationY = F * L),
                    F &&
                      ((v = x * (y = Math.cos(-F)) - S * (T = Math.sin(-F))),
                      (_ = w * y - M * T),
                      (S = x * T + S * y),
                      (M = w * T + M * y),
                      (D = E * T + D * y),
                      (b = g = b * y - I * T),
                      (x = v),
                      (w = _)),
                    (F = Math.atan2(x, b)),
                    (f.rotation = F * L),
                    F &&
                      ((g = b * (y = Math.cos(F)) + x * (T = Math.sin(F))),
                      (v = A * y + C * T),
                      (_ = I * y + S * T),
                      (x = x * y - b * T),
                      (C = C * y - A * T),
                      (S = S * y - I * T),
                      (b = g),
                      (A = v),
                      (I = _)),
                    f.rotationX &&
                      Math.abs(f.rotationX) + Math.abs(f.rotation) > 359.9 &&
                      ((f.rotationX = f.rotation = 0),
                      (f.rotationY = 180 - f.rotationY)),
                    (F = Math.atan2(A, C)),
                    (f.scaleX =
                      ((1e5 * Math.sqrt(b * b + x * x + w * w) + 0.5) | 0) /
                      1e5),
                    (f.scaleY =
                      ((1e5 * Math.sqrt(C * C + P * P) + 0.5) | 0) / 1e5),
                    (f.scaleZ =
                      ((1e5 * Math.sqrt(I * I + S * S + M * M) + 0.5) | 0) /
                      1e5),
                    (b /= f.scaleX),
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
                      ((f.x -= f.xOrigin - (f.xOrigin * b - f.yOrigin * A)),
                      (f.y -= f.yOrigin - (f.yOrigin * x - f.xOrigin * C)));
                } else if (
                  !Fe ||
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
                    (u = Math.sqrt(V * V + j * j)),
                    (c = B || z ? Math.atan2(z, B) * L : f.rotation || 0),
                    (h = j || V ? Math.atan2(j, V) * L + c : f.skewX || 0),
                    (f.scaleX = l),
                    (f.scaleY = u),
                    (f.rotation = c),
                    (f.skewX = h),
                    Fe &&
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
                  ((e._gsTransform = f),
                  f.svg &&
                    (Pe && e.style[ke]
                      ? r.f.delayedCall(0.001, function() {
                          Je(e.style, ke);
                        })
                      : !Pe &&
                        e.getAttribute('transform') &&
                        r.f.delayedCall(0.001, function() {
                          e.removeAttribute('transform');
                        }))),
                f
              );
            }),
            We = function(e) {
              var t,
                n,
                r = this.data,
                i = -r.rotation * F,
                o = i + r.skewX * F,
                a = ((Math.cos(i) * r.scaleX * 1e5) | 0) / 1e5,
                s = ((Math.sin(i) * r.scaleX * 1e5) | 0) / 1e5,
                l = ((Math.sin(o) * -r.scaleY * 1e5) | 0) / 1e5,
                u = ((Math.cos(o) * r.scaleY * 1e5) | 0) / 1e5,
                c = this.t.style,
                h = this.t.currentStyle;
              if (h) {
                (n = s), (s = -l), (l = -n), (t = h.filter), (c.filter = '');
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
                    u,
                  y = r.x + (m * r.xPercent) / 100,
                  T = r.y + (g * r.yPercent) / 100;
                if (
                  (null != r.ox &&
                    ((y +=
                      (f = (r.oxp ? m * r.ox * 0.01 : r.ox) - m / 2) -
                      (f * a +
                        (p = (r.oyp ? g * r.oy * 0.01 : r.oy) - g / 2) * s)),
                    (T += p - (f * l + p * u))),
                  (_ += v
                    ? ', Dx=' +
                      ((f = m / 2) - (f * a + (p = g / 2) * s) + y) +
                      ', Dy=' +
                      (p - (f * l + p * u) + T) +
                      ')'
                    : ", sizingMethod='auto expand')"),
                  -1 !== t.indexOf('DXImageTransform.Microsoft.Matrix(')
                    ? (c.filter = t.replace(k, _))
                    : (c.filter = _ + ' ' + t),
                  (0 !== e && 1 !== e) ||
                    (1 === a &&
                      0 === s &&
                      0 === l &&
                      1 === u &&
                      ((v && -1 === _.indexOf('Dx=0, Dy=0')) ||
                        (w.test(t) && 100 !== parseFloat(RegExp.$1)) ||
                        (-1 === t.indexOf(t.indexOf('Alpha')) &&
                          c.removeAttribute('filter')))),
                  !v)
                ) {
                  var b,
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
                        (g - ((u < 0 ? -u : u) * g + (l < 0 ? -l : l) * m)) /
                          2 +
                          T
                      ),
                      we = 0;
                    we < 4;
                    we++
                  )
                    (A =
                      (n =
                        -1 !== (b = h[(E = ae[we])]).indexOf('px')
                          ? parseFloat(b)
                          : te(this.t, E, parseFloat(b), b.replace(x, '')) ||
                            0) !== r[E]
                        ? we < 2
                          ? -r.ieOffsetX
                          : -r.ieOffsetY
                        : we < 2
                        ? f - r.ieOffsetX
                        : p - r.ieOffsetY),
                      (c[E] =
                        (r[E] = Math.round(
                          n - A * (0 === we || 2 === we ? 1 : C)
                        )) + 'px');
                }
              }
            },
            Ke = (q.set3DTransformRatio = q.setTransformRatio = function(e) {
              var t,
                n,
                r,
                i,
                o,
                a,
                s,
                l,
                u,
                c,
                h,
                p,
                d,
                m,
                g,
                v,
                _,
                y,
                T,
                b,
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
                  (((1 !== e && 0 !== e) ||
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
                  (Pe && k) ||
                  !Fe)
              )
                E || U || k
                  ? ((E *= F),
                    (b = U * F),
                    1e5,
                    (n = Math.cos(E) * P),
                    (o = Math.sin(E) * P),
                    (r = Math.sin(E - b) * -R),
                    (a = Math.cos(E - b) * R),
                    b &&
                      'simple' === x.skewType &&
                      ((t = Math.tan(b - L * F)),
                      (r *= t = Math.sqrt(1 + t * t)),
                      (a *= t),
                      L &&
                        ((t = Math.tan(L * F)),
                        (n *= t = Math.sqrt(1 + t * t)),
                        (o *= t))),
                    k &&
                      ((S +=
                        x.xOrigin -
                        (x.xOrigin * n + x.yOrigin * r) +
                        x.xOffset),
                      (M +=
                        x.yOrigin -
                        (x.xOrigin * o + x.yOrigin * a) +
                        x.yOffset),
                      Pe &&
                        (x.xPercent || x.yPercent) &&
                        ((g = this.t.getBBox()),
                        (S += 0.01 * x.xPercent * g.width),
                        (M += 0.01 * x.yPercent * g.height)),
                      S < (g = 1e-6) && S > -g && (S = 0),
                      M < g && M > -g && (M = 0)),
                    (T =
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
                    k && Pe
                      ? this.t.setAttribute('transform', 'matrix(' + T)
                      : (w[ke] =
                          (x.xPercent || x.yPercent
                            ? 'translate(' +
                              x.xPercent +
                              '%,' +
                              x.yPercent +
                              '%) matrix('
                            : 'matrix(') + T))
                  : (w[ke] =
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
                        ((t = Math.tan((U - L) * F)),
                        (v *= t = Math.sqrt(1 + t * t)),
                        (_ *= t),
                        x.skewY &&
                          ((t = Math.tan(L * F)),
                          (n *= t = Math.sqrt(1 + t * t)),
                          (o *= t)))),
                    (r = -_),
                    (a = v);
                else {
                  if (!(C || A || 1 !== I || N || k))
                    return void (w[ke] =
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
                (c = 1),
                  (i = s = l = u = h = p = 0),
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
                    (c = v),
                    (d *= v),
                    (n *= v),
                    (o *= v)),
                  (E = A * F) &&
                    ((t = r * (v = Math.cos(E)) + i * (_ = Math.sin(E))),
                    (y = a * v + s * _),
                    (u = c * _),
                    (p = d * _),
                    (i = r * -_ + i * v),
                    (s = a * -_ + s * v),
                    (c *= v),
                    (d *= v),
                    (r = t),
                    (a = y)),
                  1 !== I && ((i *= I), (s *= I), (c *= I), (d *= I)),
                  1 !== R && ((r *= R), (a *= R), (u *= R), (p *= R)),
                  1 !== P && ((n *= P), (o *= P), (l *= P), (h *= P)),
                  (m || k) &&
                    (m && ((S += i * -m), (M += s * -m), (O += c * -m + m)),
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
                  (T =
                    x.xPercent || x.yPercent
                      ? 'translate(' +
                        x.xPercent +
                        '%,' +
                        x.yPercent +
                        '%) matrix3d('
                      : 'matrix3d('),
                  (T +=
                    (n < g && n > -g ? '0' : n) +
                    ',' +
                    (o < g && o > -g ? '0' : o) +
                    ',' +
                    (l < g && l > -g ? '0' : l)),
                  (T +=
                    ',' +
                    (h < g && h > -g ? '0' : h) +
                    ',' +
                    (r < g && r > -g ? '0' : r) +
                    ',' +
                    (a < g && a > -g ? '0' : a)),
                  A || C || 1 !== I
                    ? ((T +=
                        ',' +
                        (u < g && u > -g ? '0' : u) +
                        ',' +
                        (p < g && p > -g ? '0' : p) +
                        ',' +
                        (i < g && i > -g ? '0' : i)),
                      (T +=
                        ',' +
                        (s < g && s > -g ? '0' : s) +
                        ',' +
                        (c < g && c > -g ? '0' : c) +
                        ',' +
                        (d < g && d > -g ? '0' : d) +
                        ','))
                    : (T += ',0,0,0,0,1,0,'),
                  (T +=
                    S + ',' + M + ',' + O + ',' + (N ? 1 + -O / N : 1) + ')'),
                  (w[ke] = T);
              }
            });
          ((l =
            Le.prototype).x = l.y = l.z = l.skewX = l.skewY = l.rotation = l.rotationX = l.rotationY = l.zOrigin = l.xPercent = l.yPercent = l.xOffset = l.yOffset = 0),
            (l.scaleX = l.scaleY = l.scaleZ = 1),
            Ae(
              'transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin',
              {
                parser: function(e, t, r, i, a, s, l) {
                  if (i._lastParsedTransform === l) return a;
                  i._lastParsedTransform = l;
                  var u = l.scale && 'function' == typeof l.scale ? l.scale : 0;
                  u && (l.scale = u(g, e));
                  var c,
                    h,
                    f,
                    p,
                    d,
                    v,
                    _,
                    y,
                    T,
                    b = e._gsTransform,
                    x = e.style,
                    w = Oe.length,
                    E = l,
                    A = {},
                    C = Ye(e, n, !0, E.parseTransform),
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
                    P && 'string' == typeof P && ke)
                  )
                    ((h = V.style)[ke] = P),
                      (h.display = 'block'),
                      (h.position = 'absolute'),
                      -1 !== P.indexOf('%') &&
                        ((h.width = ee(e, 'width')),
                        (h.height = ee(e, 'height'))),
                      z.body.appendChild(V),
                      (c = Ye(V, null, !1)),
                      'simple' === C.skewType &&
                        (c.scaleY *= Math.cos(c.skewX * F)),
                      C.svg &&
                        ((v = C.xOrigin),
                        (_ = C.yOrigin),
                        (c.x -= C.xOffset),
                        (c.y -= C.yOffset),
                        (E.transformOrigin || E.svgOrigin) &&
                          ((P = {}),
                          Ve(
                            e,
                            le(E.transformOrigin),
                            P,
                            E.svgOrigin,
                            E.smoothOrigin,
                            !0
                          ),
                          (v = P.xOrigin),
                          (_ = P.yOrigin),
                          (c.x -= P.xOffset - C.xOffset),
                          (c.y -= P.yOffset - C.yOffset)),
                        (v || _) &&
                          ((y = Ge(V, !0)),
                          (c.x -= v - (v * y[0] + _ * y[2])),
                          (c.y -= _ - (v * y[1] + _ * y[3])))),
                      z.body.removeChild(V),
                      c.perspective || (c.perspective = C.perspective),
                      null != E.xPercent &&
                        (c.xPercent = ce(E.xPercent, C.xPercent)),
                      null != E.yPercent &&
                        (c.yPercent = ce(E.yPercent, C.yPercent));
                  else if ('object' == typeof E) {
                    if (
                      ((c = {
                        scaleX: ce(
                          null != E.scaleX ? E.scaleX : E.scale,
                          C.scaleX
                        ),
                        scaleY: ce(
                          null != E.scaleY ? E.scaleY : E.scale,
                          C.scaleY
                        ),
                        scaleZ: ce(E.scaleZ, C.scaleZ),
                        x: ce(E.x, C.x),
                        y: ce(E.y, C.y),
                        z: ce(E.z, C.z),
                        xPercent: ce(E.xPercent, C.xPercent),
                        yPercent: ce(E.yPercent, C.yPercent),
                        perspective: ce(E.transformPerspective, C.perspective)
                      }),
                      null != (d = E.directionalRotation))
                    )
                      if ('object' == typeof d) for (h in d) E[h] = d[h];
                      else E.rotation = d;
                    'string' == typeof E.x &&
                      -1 !== E.x.indexOf('%') &&
                      ((c.x = 0), (c.xPercent = ce(E.x, C.xPercent))),
                      'string' == typeof E.y &&
                        -1 !== E.y.indexOf('%') &&
                        ((c.y = 0), (c.yPercent = ce(E.y, C.yPercent))),
                      (c.rotation = he(
                        'rotation' in E
                          ? E.rotation
                          : 'shortRotation' in E
                          ? E.shortRotation + '_short'
                          : C.rotation,
                        C.rotation,
                        'rotation',
                        A
                      )),
                      Fe &&
                        ((c.rotationX = he(
                          'rotationX' in E
                            ? E.rotationX
                            : 'shortRotationX' in E
                            ? E.shortRotationX + '_short'
                            : C.rotationX || 0,
                          C.rotationX,
                          'rotationX',
                          A
                        )),
                        (c.rotationY = he(
                          'rotationY' in E
                            ? E.rotationY
                            : 'shortRotationY' in E
                            ? E.shortRotationY + '_short'
                            : C.rotationY || 0,
                          C.rotationY,
                          'rotationY',
                          A
                        ))),
                      (c.skewX = he(E.skewX, C.skewX)),
                      (c.skewY = he(E.skewY, C.skewY));
                  }
                  for (
                    Fe &&
                      null != E.force3D &&
                      ((C.force3D = E.force3D), (p = !0)),
                      (f =
                        C.force3D ||
                        C.z ||
                        C.rotationX ||
                        C.rotationY ||
                        c.z ||
                        c.rotationX ||
                        c.rotationY ||
                        c.perspective) ||
                        null == E.scale ||
                        (c.scaleZ = 1);
                    --w > -1;

                  )
                    ((P = c[(T = Oe[w])] - C[T]) > 1e-6 ||
                      P < -1e-6 ||
                      null != E[T] ||
                      null != U[T]) &&
                      ((p = !0),
                      (a = new Te(C, T, C[T], P, a)),
                      T in A && (a.e = A[T]),
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
                      Ve(e, le(P), c, E.svgOrigin, E.smoothOrigin),
                      (a = be(
                        C,
                        'xOrigin',
                        (b ? C : c).xOrigin,
                        c.xOrigin,
                        a,
                        'transformOrigin'
                      )),
                      (a = be(
                        C,
                        'yOrigin',
                        (b ? C : c).yOrigin,
                        c.yOrigin,
                        a,
                        'transformOrigin'
                      )),
                      (v === C.xOffset && _ === C.yOffset) ||
                        ((a = be(
                          C,
                          'xOffset',
                          b ? v : C.xOffset,
                          C.xOffset,
                          a,
                          'transformOrigin'
                        )),
                        (a = be(
                          C,
                          'yOffset',
                          b ? _ : C.yOffset,
                          C.yOffset,
                          a,
                          'transformOrigin'
                        ))),
                      (P = '0px 0px')),
                    (P || (Fe && f && C.zOrigin)) &&
                      (ke
                        ? ((p = !0),
                          (T = De),
                          P ||
                            (P =
                              (P = (ee(e, T, n, !1, '50% 50%') + '').split(
                                ' '
                              ))[0] +
                              ' ' +
                              P[1] +
                              ' ' +
                              C.zOrigin +
                              'px'),
                          (P += ''),
                          ((a = new Te(
                            x,
                            T,
                            0,
                            0,
                            a,
                            -1,
                            'transformOrigin'
                          )).b = x[T]),
                          (a.plugin = s),
                          Fe
                            ? ((h = C.zOrigin),
                              (P = P.split(' ')),
                              (C.zOrigin =
                                (P.length > 2 ? parseFloat(P[2]) : h) || 0),
                              (a.xs0 = a.e =
                                P[0] + ' ' + (P[1] || '50%') + ' 0px'),
                              ((a = new Te(
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
                        : le(P + '', C)),
                    p &&
                      (i._transformType =
                        (C.svg && Pe) || (!f && 3 !== this._transformType)
                          ? 2
                          : 3),
                    u && (l.scale = u),
                    a
                  );
                },
                allowFunc: !0,
                prefix: !0
              }
            ),
            Ae('boxShadow', {
              defaultValue: '0px 0px 0px 0px #999',
              prefix: !0,
              color: !0,
              multi: !0,
              keyword: 'inset'
            }),
            Ae('clipPath', {
              defaultValue: 'inset(0%)',
              prefix: !0,
              multi: !0,
              formatter: ve('inset(0% 0% 0% 0%)', !1, !0)
            }),
            Ae('borderRadius', {
              defaultValue: '0px',
              parser: function(e, r, i, o, a, s) {
                r = this.format(r);
                var l,
                  u,
                  c,
                  h,
                  f,
                  p,
                  d,
                  m,
                  g,
                  v,
                  _,
                  y,
                  T,
                  b,
                  x,
                  w,
                  E = [
                    'borderTopLeftRadius',
                    'borderTopRightRadius',
                    'borderBottomRightRadius',
                    'borderBottomLeftRadius'
                  ],
                  A = e.style;
                for (
                  g = parseFloat(e.offsetWidth),
                    v = parseFloat(e.offsetHeight),
                    l = r.split(' '),
                    u = 0;
                  u < E.length;
                  u++
                )
                  this.p.indexOf('border') && (E[u] = J(E[u])),
                    -1 !== (f = h = ee(e, E[u], n, !1, '0px')).indexOf(' ') &&
                      ((h = f.split(' ')), (f = h[0]), (h = h[1])),
                    (p = c = l[u]),
                    (d = parseFloat(f)),
                    (y = f.substr((d + '').length)),
                    (T = '=' === p.charAt(1))
                      ? ((m = parseInt(p.charAt(0) + '1', 10)),
                        (p = p.substr(2)),
                        (m *= parseFloat(p)),
                        (_ = p.substr((m + '').length - (m < 0 ? 1 : 0)) || ''))
                      : ((m = parseFloat(p)), (_ = p.substr((m + '').length))),
                    '' === _ && (_ = t[i] || y),
                    _ !== y &&
                      ((b = te(e, 'borderLeft', d, y)),
                      (x = te(e, 'borderTop', d, y)),
                      '%' === _
                        ? ((f = (b / g) * 100 + '%'), (h = (x / v) * 100 + '%'))
                        : 'em' === _
                        ? ((f = b / (w = te(e, 'borderLeft', 1, 'em')) + 'em'),
                          (h = x / w + 'em'))
                        : ((f = b + 'px'), (h = x + 'px')),
                      T &&
                        ((p = parseFloat(f) + m + _),
                        (c = parseFloat(h) + m + _))),
                    (a = xe(A, E[u], f + ' ' + h, p + ' ' + c, !1, '0px', a));
                return a;
              },
              prefix: !0,
              formatter: ve('0px 0px 0px 0px', !1, !0)
            }),
            Ae(
              'borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius',
              {
                defaultValue: '0px',
                parser: function(e, t, r, i, o, a) {
                  return xe(
                    e.style,
                    r,
                    this.format(ee(e, r, n, !1, '0px 0px')),
                    this.format(t),
                    !1,
                    '0px',
                    o
                  );
                },
                prefix: !0,
                formatter: ve('0px 0px', !1, !0)
              }
            ),
            Ae('backgroundPosition', {
              defaultValue: '0 0',
              parser: function(e, t, r, i, o, a) {
                var s,
                  l,
                  u,
                  c,
                  h,
                  f,
                  p = 'background-position',
                  m = n || $(e),
                  g = this.format(
                    (m
                      ? d
                        ? m.getPropertyValue(p + '-x') +
                          ' ' +
                          m.getPropertyValue(p + '-y')
                        : m.getPropertyValue(p)
                      : e.currentStyle.backgroundPositionX +
                        ' ' +
                        e.currentStyle.backgroundPositionY) || '0 0'
                  ),
                  v = this.format(t);
                if (
                  (-1 !== g.indexOf('%')) != (-1 !== v.indexOf('%')) &&
                  v.split(',').length < 2 &&
                  (f = ee(e, 'backgroundImage').replace(I, '')) &&
                  'none' !== f
                ) {
                  for (
                    s = g.split(' '),
                      l = v.split(' '),
                      X.setAttribute('src', f),
                      u = 2;
                    --u > -1;

                  )
                    (c = -1 !== (g = s[u]).indexOf('%')) !==
                      (-1 !== l[u].indexOf('%')) &&
                      ((h =
                        0 === u
                          ? e.offsetWidth - X.width
                          : e.offsetHeight - X.height),
                      (s[u] = c
                        ? (parseFloat(g) / 100) * h + 'px'
                        : (parseFloat(g) / h) * 100 + '%'));
                  g = s.join(' ');
                }
                return this.parseComplex(e.style, g, v, o, a);
              },
              formatter: le
            }),
            Ae('backgroundSize', {
              defaultValue: '0 0',
              formatter: function(e) {
                return 'co' === (e += '').substr(0, 2)
                  ? e
                  : le(-1 === e.indexOf(' ') ? e + ' ' + e : e);
              }
            }),
            Ae('perspective', { defaultValue: '0px', prefix: !0 }),
            Ae('perspectiveOrigin', { defaultValue: '50% 50%', prefix: !0 }),
            Ae('transformStyle', { prefix: !0 }),
            Ae('backfaceVisibility', { prefix: !0 }),
            Ae('userSelect', { prefix: !0 }),
            Ae('margin', {
              parser: _e('marginTop,marginRight,marginBottom,marginLeft')
            }),
            Ae('padding', {
              parser: _e('paddingTop,paddingRight,paddingBottom,paddingLeft')
            }),
            Ae('clip', {
              defaultValue: 'rect(0px,0px,0px,0px)',
              parser: function(e, t, r, i, o, a) {
                var s, l, u;
                return (
                  d < 9
                    ? ((l = e.currentStyle),
                      (u = d < 8 ? ' ' : ','),
                      (s =
                        'rect(' +
                        l.clipTop +
                        u +
                        l.clipRight +
                        u +
                        l.clipBottom +
                        u +
                        l.clipLeft +
                        ')'),
                      (t = this.format(t)
                        .split(',')
                        .join(u)))
                    : ((s = this.format(ee(e, this.p, n, !1, this.dflt))),
                      (t = this.format(t))),
                  this.parseComplex(e.style, s, t, o, a)
                );
              }
            }),
            Ae('textShadow', {
              defaultValue: '0px 0px 0px #999',
              color: !0,
              multi: !0
            }),
            Ae('autoRound,strictUnits', {
              parser: function(e, t, n, r, i) {
                return i;
              }
            }),
            Ae('border', {
              defaultValue: '0px solid #000',
              parser: function(e, t, r, i, o, a) {
                var s = ee(e, 'borderTopWidth', n, !1, '0px'),
                  l = this.format(t).split(' '),
                  u = l[0].replace(x, '');
                return (
                  'px' !== u &&
                    (s = parseFloat(s) / te(e, 'borderTopWidth', 1, u) + u),
                  this.parseComplex(
                    e.style,
                    this.format(
                      s +
                        ' ' +
                        ee(e, 'borderTopStyle', n, !1, 'solid') +
                        ' ' +
                        ee(e, 'borderTopColor', n, !1, '#000')
                    ),
                    l.join(' '),
                    o,
                    a
                  )
                );
              },
              color: !0,
              formatter: function(e) {
                var t = e.split(' ');
                return (
                  t[0] +
                  ' ' +
                  (t[1] || 'solid') +
                  ' ' +
                  (e.match(ge) || ['#000'])[0]
                );
              }
            }),
            Ae('borderWidth', {
              parser: _e(
                'borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth'
              )
            }),
            Ae('float,cssFloat,styleFloat', {
              parser: function(e, t, n, r, i, o) {
                var a = e.style,
                  s = 'cssFloat' in a ? 'cssFloat' : 'styleFloat';
                return new Te(a, s, 0, 0, i, -1, n, !1, 0, a[s], t);
              }
            });
          var Ze = function(e) {
            var t,
              n = this.t,
              r = n.filter || ee(this.data, 'filter') || '',
              i = (this.s + this.c * e) | 0;
            100 === i &&
              (-1 === r.indexOf('atrix(') &&
              -1 === r.indexOf('radient(') &&
              -1 === r.indexOf('oader(')
                ? (n.removeAttribute('filter'), (t = !ee(this.data, 'filter')))
                : ((n.filter = r.replace(A, '')), (t = !0))),
              t ||
                (this.xn1 && (n.filter = r = r || 'alpha(opacity=' + i + ')'),
                -1 === r.indexOf('pacity')
                  ? (0 === i && this.xn1) ||
                    (n.filter = r + ' alpha(opacity=' + i + ')')
                  : (n.filter = r.replace(w, 'opacity=' + i)));
          };
          Ae('opacity,alpha,autoAlpha', {
            defaultValue: '1',
            parser: function(e, t, r, i, o, a) {
              var s = parseFloat(ee(e, 'opacity', n, !1, '1')),
                l = e.style,
                u = 'autoAlpha' === r;
              return (
                'string' == typeof t &&
                  '=' === t.charAt(1) &&
                  (t =
                    ('-' === t.charAt(0) ? -1 : 1) * parseFloat(t.substr(2)) +
                    s),
                u &&
                  1 === s &&
                  'hidden' === ee(e, 'visibility', n) &&
                  0 !== t &&
                  (s = 0),
                G
                  ? (o = new Te(l, 'opacity', s, t - s, o))
                  : (((o = new Te(
                      l,
                      'opacity',
                      100 * s,
                      100 * (t - s),
                      o
                    )).xn1 = u ? 1 : 0),
                    (l.zoom = 1),
                    (o.type = 2),
                    (o.b = 'alpha(opacity=' + o.s + ')'),
                    (o.e = 'alpha(opacity=' + (o.s + o.c) + ')'),
                    (o.data = e),
                    (o.plugin = a),
                    (o.setRatio = Ze)),
                u &&
                  (((o = new Te(
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
                    0 === t ? 'hidden' : 'inherit'
                  )).xs0 = 'inherit'),
                  i._overwriteProps.push(o.n),
                  i._overwriteProps.push(r)),
                o
              );
            }
          });
          var Je = function(e, t) {
              t &&
                (e.removeProperty
                  ? (('ms' !== t.substr(0, 2) && 'webkit' !== t.substr(0, 6)) ||
                      (t = '-' + t),
                    e.removeProperty(t.replace(P, '-$1').toLowerCase()))
                  : e.removeAttribute(t));
            },
            Qe = function(e) {
              if (((this.t._gsClassPT = this), 1 === e || 0 === e)) {
                this.t.setAttribute('class', 0 === e ? this.b : this.e);
                for (var t = this.data, n = this.t.style; t; )
                  t.v ? (n[t.p] = t.v) : Je(n, t.p), (t = t._next);
                1 === e &&
                  this.t._gsClassPT === this &&
                  (this.t._gsClassPT = null);
              } else
                this.t.getAttribute('class') !== this.e &&
                  this.t.setAttribute('class', this.e);
            };
          Ae('className', {
            parser: function(t, r, i, o, a, s, l) {
              var u,
                c,
                h,
                f,
                p,
                d = t.getAttribute('class') || '',
                m = t.style.cssText;
              if (
                (((a = o._classNamePT = new Te(
                  t,
                  i,
                  0,
                  0,
                  a,
                  2
                )).setRatio = Qe),
                (a.pr = -11),
                (e = !0),
                (a.b = d),
                (c = re(t, n)),
                (h = t._gsClassPT))
              ) {
                for (f = {}, p = h.data; p; ) (f[p.p] = 1), (p = p._next);
                h.setRatio(1);
              }
              return (
                (t._gsClassPT = a),
                (a.e =
                  '=' !== r.charAt(1)
                    ? r
                    : d.replace(
                        new RegExp('(?:\\s|^)' + r.substr(2) + '(?![\\w-])'),
                        ''
                      ) + ('+' === r.charAt(0) ? ' ' + r.substr(2) : '')),
                t.setAttribute('class', a.e),
                (u = ie(t, c, re(t), l, f)),
                t.setAttribute('class', d),
                (a.data = u.firstMPT),
                t.style.cssText !== m && (t.style.cssText = m),
                (a = a.xfirst = o.parse(t, u.difs, a, s))
              );
            }
          });
          var $e = function(e) {
            if (
              (1 === e || 0 === e) &&
              this.data._totalTime === this.data._totalDuration &&
              'isFromStart' !== this.data.data
            ) {
              var t,
                n,
                r,
                i,
                o,
                a = this.t.style,
                l = s.transform.parse;
              if ('all' === this.e) (a.cssText = ''), (i = !0);
              else
                for (
                  r = (t = this.e
                    .split(' ')
                    .join('')
                    .split(',')).length;
                  --r > -1;

                )
                  (n = t[r]),
                    s[n] &&
                      (s[n].parse === l
                        ? (i = !0)
                        : (n = 'transformOrigin' === n ? De : s[n].p)),
                    Je(a, n);
              i &&
                (Je(a, ke),
                (o = this.t._gsTransform) &&
                  (o.svg &&
                    (this.t.removeAttribute('data-svg-origin'),
                    this.t.removeAttribute('transform')),
                  delete this.t._gsTransform));
            }
          };
          for (
            Ae('clearProps', {
              parser: function(t, n, r, i, o) {
                return (
                  ((o = new Te(t, r, 0, 0, o, 2)).setRatio = $e),
                  (o.e = n),
                  (o.pr = -10),
                  (o.data = i._tween),
                  (e = !0),
                  o
                );
              }
            }),
              l = 'bezier,throwProps,physicsProps,physics2D'.split(','),
              we = l.length;
            we--;

          )
            Ce(l[we]);
          ((l =
            o.prototype)._firstPT = l._lastParsedTransform = l._transform = null),
            (l._onInitTween = function(r, a, l, f) {
              if (!r.nodeType) return !1;
              (this._target = m = r),
                (this._tween = l),
                (this._vars = a),
                (g = f),
                (u = a.autoRound),
                (e = !1),
                (t = a.suffixMap || o.suffixMap),
                (n = $(r)),
                (i = this._overwriteProps);
              var d,
                v,
                _,
                y,
                T,
                b,
                x,
                w,
                A,
                C = r.style;
              if (
                (c &&
                  '' === C.zIndex &&
                  (('auto' !== (d = ee(r, 'zIndex', n)) && '' !== d) ||
                    this._addLazySet(C, 'zIndex', 0)),
                'string' == typeof a &&
                  ((y = C.cssText),
                  (d = re(r, n)),
                  (C.cssText = y + ';' + a),
                  (d = ie(r, d, re(r)).difs),
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
                    ke
                      ? h &&
                        ((c = !0),
                        '' === C.zIndex &&
                          (('auto' !== (x = ee(r, 'zIndex', n)) && '' !== x) ||
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
                (w = new Te(r, 'transform', 0, 0, null, 2)),
                  this._linkCSSP(w, null, _),
                  (w.setRatio = ke ? Ke : We),
                  (w.data = this._transform || Ye(r, n, !0)),
                  (w.tween = l),
                  (w.pr = -1),
                  i.pop();
              }
              if (e) {
                for (; v; ) {
                  for (b = v._next, _ = y; _ && _.pr > v.pr; ) _ = _._next;
                  (v._prev = _ ? _._prev : T) ? (v._prev._next = v) : (y = v),
                    (v._next = _) ? (_._prev = v) : (T = v),
                    (v = b);
                }
                this._firstPT = y;
              }
              return !0;
            }),
            (l.parse = function(e, r, i, o) {
              var a,
                l,
                c,
                h,
                f,
                p,
                d,
                v,
                _,
                y,
                T = e.style;
              for (a in r) {
                if (
                  ((p = r[a]),
                  (l = s[a]),
                  'function' != typeof p || (l && l.allowFunc) || (p = p(g, m)),
                  l)
                )
                  i = l.parse(e, p, a, this, i, o, r);
                else {
                  if ('--' === a.substr(0, 2)) {
                    this._tween._propLookup[a] = this._addTween.call(
                      this._tween,
                      e.style,
                      'setProperty',
                      $(e).getPropertyValue(a) + '',
                      p + '',
                      a,
                      !1,
                      a
                    );
                    continue;
                  }
                  (f = ee(e, a, n) + ''),
                    (_ = 'string' == typeof p),
                    'color' === a ||
                    'fill' === a ||
                    'stroke' === a ||
                    -1 !== a.indexOf('Color') ||
                    (_ && C.test(p))
                      ? (_ ||
                          (p =
                            ((p = de(p)).length > 3 ? 'rgba(' : 'rgb(') +
                            p.join(',') +
                            ')'),
                        (i = xe(T, a, f, p, !0, 'transparent', i, 0, o)))
                      : _ && D.test(p)
                      ? (i = xe(T, a, f, p, !0, null, i, 0, o))
                      : ((d =
                          (c = parseFloat(f)) || 0 === c
                            ? f.substr((c + '').length)
                            : ''),
                        ('' !== f && 'auto' !== f) ||
                          ('width' === a || 'height' === a
                            ? ((c = se(e, a, n)), (d = 'px'))
                            : 'left' === a || 'top' === a
                            ? ((c = ne(e, a, n)), (d = 'px'))
                            : ((c = 'opacity' !== a ? 0 : 1), (d = ''))),
                        (y = _ && '=' === p.charAt(1))
                          ? ((h = parseInt(p.charAt(0) + '1', 10)),
                            (p = p.substr(2)),
                            (h *= parseFloat(p)),
                            (v = p.replace(x, '')))
                          : ((h = parseFloat(p)),
                            (v = _ ? p.replace(x, '') : '')),
                        '' === v && (v = a in t ? t[a] : d),
                        (p = h || 0 === h ? (y ? h + c : h) + v : r[a]),
                        d !== v &&
                          (('' === v && 'lineHeight' !== a) ||
                            ((h || 0 === h) &&
                              c &&
                              ((c = te(e, a, c, d)),
                              '%' === v
                                ? ((c /= te(e, a, 100, '%') / 100),
                                  !0 !== r.strictUnits && (f = c + '%'))
                                : 'em' === v ||
                                  'rem' === v ||
                                  'vw' === v ||
                                  'vh' === v
                                ? (c /= te(e, a, 1, v))
                                : 'px' !== v &&
                                  ((h = te(e, a, h, v)), (v = 'px')),
                              y && (h || 0 === h) && (p = h + c + v)))),
                        y && (h += c),
                        (!c && 0 !== c) || (!h && 0 !== h)
                          ? void 0 !== T[a] &&
                            (p || (p + '' != 'NaN' && null != p))
                            ? ((i = new Te(
                                T,
                                a,
                                h || c || 0,
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
                          : ((i = new Te(
                              T,
                              a,
                              c,
                              h - c,
                              i,
                              0,
                              a,
                              !1 !== u && ('px' === v || 'zIndex' === a),
                              0,
                              f,
                              p
                            )).xs0 = v));
                }
                o && i && !i.plugin && (i.plugin = o);
              }
              return i;
            }),
            (l.setRatio = function(e) {
              var t,
                n,
                r,
                i = this._firstPT;
              if (
                1 !== e ||
                (this._tween._time !== this._tween._duration &&
                  0 !== this._tween._time)
              )
                if (
                  e ||
                  (this._tween._time !== this._tween._duration &&
                    0 !== this._tween._time) ||
                  -1e-6 === this._tween._rawPrevTime
                )
                  for (; i; ) {
                    if (
                      ((t = i.c * e + i.s),
                      i.r ? (t = i.r(t)) : t < 1e-6 && t > -1e-6 && (t = 0),
                      i.type)
                    )
                      if (1 === i.type)
                        if (2 === (r = i.l))
                          i.t[i.p] = i.xs0 + t + i.xs1 + i.xn1 + i.xs2;
                        else if (3 === r)
                          i.t[i.p] =
                            i.xs0 + t + i.xs1 + i.xn1 + i.xs2 + i.xn2 + i.xs3;
                        else if (4 === r)
                          i.t[i.p] =
                            i.xs0 +
                            t +
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
                            t +
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
                          for (n = i.xs0 + t + i.xs1, r = 1; r < i.l; r++)
                            n += i['xn' + r] + i['xs' + (r + 1)];
                          i.t[i.p] = n;
                        }
                      else
                        -1 === i.type
                          ? (i.t[i.p] = i.xs0)
                          : i.setRatio && i.setRatio(e);
                    else i.t[i.p] = t + i.xs0;
                    i = i._next;
                  }
                else
                  for (; i; )
                    2 !== i.type ? (i.t[i.p] = i.b) : i.setRatio(e),
                      (i = i._next);
              else
                for (; i; ) {
                  if (2 !== i.type)
                    if (i.r && -1 !== i.type)
                      if (((t = i.r(i.s + i.c)), i.type)) {
                        if (1 === i.type) {
                          for (
                            r = i.l, n = i.xs0 + t + i.xs1, r = 1;
                            r < i.l;
                            r++
                          )
                            n += i['xn' + r] + i['xs' + (r + 1)];
                          i.t[i.p] = n;
                        }
                      } else i.t[i.p] = t + i.xs0;
                    else i.t[i.p] = i.e;
                  else i.setRatio(e);
                  i = i._next;
                }
            }),
            (l._enableTransforms = function(e) {
              (this._transform = this._transform || Ye(this._target, n, !0)),
                (this._transformType =
                  (this._transform.svg && Pe) ||
                  (!e && 3 !== this._transformType)
                    ? 2
                    : 3);
            });
          var et = function(e) {
            (this.t[this.p] = this.e),
              this.data._linkCSSP(this, this._next, null, !0);
          };
          (l._addLazySet = function(e, t, n) {
            var r = (this._firstPT = new Te(e, t, 0, 0, this._firstPT, 2));
            (r.e = n), (r.setRatio = et), (r.data = this);
          }),
            (l._linkCSSP = function(e, t, n, r) {
              return (
                e &&
                  (t && (t._prev = e),
                  e._next && (e._next._prev = e._prev),
                  e._prev
                    ? (e._prev._next = e._next)
                    : this._firstPT === e &&
                      ((this._firstPT = e._next), (r = !0)),
                  n
                    ? (n._next = e)
                    : r || null !== this._firstPT || (this._firstPT = e),
                  (e._next = t),
                  (e._prev = n)),
                e
              );
            }),
            (l._mod = function(e) {
              for (var t = this._firstPT; t; )
                'function' == typeof e[t.p] && (t.r = e[t.p]), (t = t._next);
            }),
            (l._kill = function(e) {
              var t,
                n,
                i,
                o = e;
              if (e.autoAlpha || e.alpha) {
                for (n in ((o = {}), e)) o[n] = e[n];
                (o.opacity = 1), o.autoAlpha && (o.visibility = 1);
              }
              for (
                e.className &&
                  (t = this._classNamePT) &&
                  ((i = t.xfirst) && i._prev
                    ? this._linkCSSP(i._prev, t._next, i._prev._prev)
                    : i === this._firstPT && (this._firstPT = t._next),
                  t._next && this._linkCSSP(t._next, t._next._next, i._prev),
                  (this._classNamePT = null)),
                  t = this._firstPT;
                t;

              )
                t.plugin &&
                  t.plugin !== n &&
                  t.plugin._kill &&
                  (t.plugin._kill(e), (n = t.plugin)),
                  (t = t._next);
              return r.d.prototype._kill.call(this, o);
            });
          var tt = function(e, t, n) {
            var r, i, o, a;
            if (e.slice) for (i = e.length; --i > -1; ) tt(e[i], t, n);
            else
              for (i = (r = e.childNodes).length; --i > -1; )
                (a = (o = r[i]).type),
                  o.style && (t.push(re(o)), n && n.push(o)),
                  (1 !== a && 9 !== a && 11 !== a) ||
                    !o.childNodes.length ||
                    tt(o, t, n);
          };
          return (
            (o.cascadeTo = function(e, t, n) {
              var i,
                o,
                a,
                s,
                l = r.f.to(e, t, n),
                u = [l],
                c = [],
                h = [],
                f = [],
                p = r.f._internals.reservedProps;
              for (
                e = l._targets || l.target,
                  tt(e, c, f),
                  l.render(t, !0, !0),
                  tt(e, h),
                  l.render(0, !0, !0),
                  l._enabled(!0),
                  i = f.length;
                --i > -1;

              )
                if ((o = ie(f[i], c[i], h[i])).firstMPT) {
                  for (a in ((o = o.difs), n)) p[a] && (o[a] = n[a]);
                  for (a in ((s = {}), o)) s[a] = c[i][a];
                  u.push(r.f.fromTo(f[i], t, s, o));
                }
              return u;
            }),
            r.d.activate([o]),
            o
          );
        },
        !0
      );
      var o = r.g.CSSPlugin,
        a = r.e._gsDefine.plugin({
          propName: 'attr',
          API: 2,
          version: '0.6.1',
          init: function(e, t, n, r) {
            var i, o;
            if ('function' != typeof e.setAttribute) return !1;
            for (i in t)
              'function' == typeof (o = t[i]) && (o = o(r, e)),
                this._addTween(
                  e,
                  'setAttribute',
                  e.getAttribute(i) + '',
                  o + '',
                  i,
                  !1,
                  i
                ),
                this._overwriteProps.push(i);
            return !0;
          }
        }),
        s = r.e._gsDefine.plugin({
          propName: 'roundProps',
          version: '1.7.0',
          priority: -1,
          API: 2,
          init: function(e, t, n) {
            return (this._tween = n), !0;
          }
        }),
        l = function(e) {
          var t = e < 1 ? Math.pow(10, (e + '').length - 2) : 1;
          return function(n) {
            return ((Math.round(n / e) * e * t) | 0) / t;
          };
        },
        u = function(e, t) {
          for (; e; ) e.f || e.blob || (e.m = t || Math.round), (e = e._next);
        },
        c = s.prototype;
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
       */ (c._onInitAllProps = function() {
        var e,
          t,
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
        else for (r in o) a[r] = l(o[r]);
        for (r in a)
          for (e = i._firstPT; e; )
            (t = e._next),
              e.pg
                ? e.t._mod(a)
                : e.n === r &&
                  (2 === e.f && e.t
                    ? u(e.t._firstPT, a[r])
                    : (this._add(e.t, r, e.s, e.c, a[r]),
                      t && (t._prev = e._prev),
                      e._prev
                        ? (e._prev._next = t)
                        : i._firstPT === e && (i._firstPT = t),
                      (e._next = e._prev = null),
                      (i._propLookup[r] = s))),
              (e = t);
        return !1;
      }),
        (c._add = function(e, t, n, r, i) {
          this._addTween(e, t, n, n + r, t, i || Math.round),
            this._overwriteProps.push(t);
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
      var h = r.e._gsDefine.plugin({
        propName: 'directionalRotation',
        version: '0.3.1',
        API: 2,
        init: function(e, t, n, r) {
          'object' != typeof t && (t = { rotation: t }), (this.finals = {});
          var i,
            o,
            a,
            s,
            l,
            u,
            c = !0 === t.useRadians ? 2 * Math.PI : 360;
          for (i in t)
            'useRadians' !== i &&
              ('function' == typeof (s = t[i]) && (s = s(r, e)),
              (o = (u = (s + '').split('_'))[0]),
              (a = parseFloat(
                'function' != typeof e[i]
                  ? e[i]
                  : e[
                      i.indexOf('set') ||
                      'function' != typeof e['get' + i.substr(3)]
                        ? i
                        : 'get' + i.substr(3)
                    ]()
              )),
              (l =
                (s = this.finals[i] =
                  'string' == typeof o && '=' === o.charAt(1)
                    ? a + parseInt(o.charAt(0) + '1', 10) * Number(o.substr(2))
                    : Number(o) || 0) - a),
              u.length &&
                (-1 !== (o = u.join('_')).indexOf('short') &&
                  (l %= c) !== l % (c / 2) &&
                  (l = l < 0 ? l + c : l - c),
                -1 !== o.indexOf('_cw') && l < 0
                  ? (l = ((l + 9999999999 * c) % c) - ((l / c) | 0) * c)
                  : -1 !== o.indexOf('ccw') &&
                    l > 0 &&
                    (l = ((l - 9999999999 * c) % c) - ((l / c) | 0) * c)),
              (l > 1e-6 || l < -1e-6) &&
                (this._addTween(e, i, a, a + l, i),
                this._overwriteProps.push(i)));
          return !0;
        },
        set: function(e) {
          var t;
          if (1 !== e) this._super.setRatio.call(this, e);
          else
            for (t = this._firstPT; t; )
              t.f ? t.t[t.p](this.finals[t.p]) : (t.t[t.p] = this.finals[t.p]),
                (t = t._next);
        }
      });
      (h._autoCSS = !0),
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
          'TimelineLite',
          ['core.Animation', 'core.SimpleTimeline', 'TweenLite'],
          function() {
            var e = function(e) {
                r.c.call(this, e);
                var t,
                  n,
                  i = this.vars;
                for (n in ((this._labels = {}),
                (this.autoRemoveChildren = !!i.autoRemoveChildren),
                (this.smoothChildTiming = !!i.smoothChildTiming),
                (this._sortChildren = !0),
                (this._onUpdate = i.onUpdate),
                i))
                  (t = i[n]),
                    o(t) &&
                      -1 !== t.join('').indexOf('{self}') &&
                      (i[n] = this._swapSelfInParams(t));
                o(i.tweens) && this.add(i.tweens, 0, i.align, i.stagger);
              },
              t = r.f._internals,
              n = (e._internals = {}),
              i = t.isSelector,
              o = t.isArray,
              a = t.lazyTweens,
              s = t.lazyRender,
              l = r.e._gsDefine.globals,
              u = function(e) {
                var t,
                  n = {};
                for (t in e) n[t] = e[t];
                return n;
              },
              c = function(e, t, n) {
                var r,
                  i,
                  o = e.cycle;
                for (r in o)
                  (i = o[r]),
                    (e[r] =
                      'function' == typeof i ? i(n, t[n], t) : i[n % i.length]);
                delete e.cycle;
              },
              h = (n.pauseCallback = function() {}),
              f = function(e, t, n, r) {
                var i = 'immediateRender';
                return i in t || (t[i] = !((n && !1 === n[i]) || r)), t;
              },
              p = function(e) {
                if ('function' == typeof e) return e;
                var t = 'object' == typeof e ? e : { each: e },
                  n = t.ease,
                  r = t.from || 0,
                  i = t.base || 0,
                  o = {},
                  a = isNaN(r),
                  s = t.axis,
                  l = { center: 0.5, end: 1 }[r] || 0;
                return function(e, u, c) {
                  var h,
                    f,
                    p,
                    d,
                    m,
                    g,
                    v,
                    _,
                    y,
                    T = (c || t).length,
                    b = o[T];
                  if (!b) {
                    if (!(y = 'auto' === t.grid ? 0 : (t.grid || [1 / 0])[0])) {
                      for (
                        v = -1 / 0;
                        v < (v = c[y++].getBoundingClientRect().left) && y < T;

                      );
                      y--;
                    }
                    for (
                      b = o[T] = [],
                        h = a ? Math.min(y, T) * l - 0.5 : r % y,
                        f = a ? (T * l) / y - 0.5 : (r / y) | 0,
                        v = 0,
                        _ = 1 / 0,
                        g = 0;
                      g < T;
                      g++
                    )
                      (p = (g % y) - h),
                        (d = f - ((g / y) | 0)),
                        (b[g] = m = s
                          ? Math.abs('y' === s ? d : p)
                          : Math.sqrt(p * p + d * d)),
                        m > v && (v = m),
                        m < _ && (_ = m);
                    (b.max = v - _),
                      (b.min = _),
                      (b.v = T =
                        t.amount ||
                        t.each *
                          (y > T
                            ? T - 1
                            : s
                            ? 'y' === s
                              ? T / y
                              : y
                            : Math.max(y, T / y)) ||
                        0),
                      (b.b = T < 0 ? i - T : i);
                  }
                  return (
                    (T = (b[e] - b.min) / b.max),
                    b.b + (n ? n.getRatio(T) : T) * b.v
                  );
                };
              },
              d = (e.prototype = new r.c());
            return (
              (e.version = '2.1.3'),
              (e.distribute = p),
              (d.constructor = e),
              (d.kill()._gc = d._forcingPlayhead = d._hasPause = !1),
              (d.to = function(e, t, n, i) {
                var o = (n.repeat && l.TweenMax) || r.f;
                return t ? this.add(new o(e, t, n), i) : this.set(e, n, i);
              }),
              (d.from = function(e, t, n, i) {
                return this.add(
                  ((n.repeat && l.TweenMax) || r.f).from(e, t, f(0, n)),
                  i
                );
              }),
              (d.fromTo = function(e, t, n, i, o) {
                var a = (i.repeat && l.TweenMax) || r.f;
                return (
                  (i = f(0, i, n)),
                  t ? this.add(a.fromTo(e, t, n, i), o) : this.set(e, i, o)
                );
              }),
              (d.staggerTo = function(t, n, o, a, s, l, h, f) {
                var d,
                  m,
                  g = new e({
                    onComplete: l,
                    onCompleteParams: h,
                    callbackScope: f,
                    smoothChildTiming: this.smoothChildTiming
                  }),
                  v = p(o.stagger || a),
                  _ = o.startAt,
                  y = o.cycle;
                for (
                  'string' == typeof t && (t = r.f.selector(t) || t),
                    i((t = t || [])) &&
                      (t = (function(e) {
                        var t,
                          n = [],
                          r = e.length;
                        for (t = 0; t !== r; n.push(e[t++]));
                        return n;
                      })(t)),
                    m = 0;
                  m < t.length;
                  m++
                )
                  (d = u(o)),
                    _ && ((d.startAt = u(_)), _.cycle && c(d.startAt, t, m)),
                    y &&
                      (c(d, t, m),
                      null != d.duration &&
                        ((n = d.duration), delete d.duration)),
                    g.to(t[m], n, d, v(m, t[m], t));
                return this.add(g, s);
              }),
              (d.staggerFrom = function(e, t, n, r, i, o, a, s) {
                return (
                  (n.runBackwards = !0),
                  this.staggerTo(e, t, f(0, n), r, i, o, a, s)
                );
              }),
              (d.staggerFromTo = function(e, t, n, r, i, o, a, s, l) {
                return (
                  (r.startAt = n),
                  this.staggerTo(e, t, f(0, r, n), i, o, a, s, l)
                );
              }),
              (d.call = function(e, t, n, i) {
                return this.add(r.f.delayedCall(0, e, t, n), i);
              }),
              (d.set = function(e, t, n) {
                return this.add(new r.f(e, 0, f(0, t, null, !0)), n);
              }),
              (e.exportRoot = function(t, n) {
                null == (t = t || {}).smoothChildTiming &&
                  (t.smoothChildTiming = !0);
                var i,
                  o,
                  a,
                  s,
                  l = new e(t),
                  u = l._timeline;
                for (
                  null == n && (n = !0),
                    u._remove(l, !0),
                    l._startTime = 0,
                    l._rawPrevTime = l._time = l._totalTime = u._time,
                    a = u._first;
                  a;

                )
                  (s = a._next),
                    (n && a instanceof r.f && a.target === a.vars.onComplete) ||
                      ((o = a._startTime - a._delay) < 0 && (i = 1),
                      l.add(a, o)),
                    (a = s);
                return u.add(l, 0), i && l.totalDuration(), l;
              }),
              (d.add = function(t, n, i, a) {
                var s, l, u, c, h, f;
                if (
                  ('number' != typeof n &&
                    (n = this._parseTimeOrLabel(n, 0, !0, t)),
                  !(t instanceof r.a))
                ) {
                  if (t instanceof Array || (t && t.push && o(t))) {
                    for (
                      i = i || 'normal', a = a || 0, s = n, l = t.length, u = 0;
                      u < l;
                      u++
                    )
                      o((c = t[u])) && (c = new e({ tweens: c })),
                        this.add(c, s),
                        'string' != typeof c &&
                          'function' != typeof c &&
                          ('sequence' === i
                            ? (s =
                                c._startTime + c.totalDuration() / c._timeScale)
                            : 'start' === i && (c._startTime -= c.delay())),
                        (s += a);
                    return this._uncache(!0);
                  }
                  if ('string' == typeof t) return this.addLabel(t, n);
                  if ('function' != typeof t)
                    throw 'Cannot add ' +
                      t +
                      ' into the timeline; it is not a tween, timeline, function, or string.';
                  t = r.f.delayedCall(0, t);
                }
                if (
                  (r.c.prototype.add.call(this, t, n),
                  (t._time || (!t._duration && t._initted)) &&
                    ((s = (this.rawTime() - t._startTime) * t._timeScale),
                    (!t._duration ||
                      Math.abs(Math.max(0, Math.min(t.totalDuration(), s))) -
                        t._totalTime >
                        1e-5) &&
                      t.render(s, !1, !1)),
                  (this._gc || this._time === this._duration) &&
                    !this._paused &&
                    this._duration < this.duration())
                )
                  for (f = (h = this).rawTime() > t._startTime; h._timeline; )
                    f && h._timeline.smoothChildTiming
                      ? h.totalTime(h._totalTime, !0)
                      : h._gc && h._enabled(!0, !1),
                      (h = h._timeline);
                return this;
              }),
              (d.remove = function(e) {
                if (e instanceof r.a) {
                  this._remove(e, !1);
                  var t = (e._timeline = e.vars.useFrames
                    ? r.a._rootFramesTimeline
                    : r.a._rootTimeline);
                  return (
                    (e._startTime =
                      (e._paused ? e._pauseTime : t._time) -
                      (e._reversed
                        ? e.totalDuration() - e._totalTime
                        : e._totalTime) /
                        e._timeScale),
                    this
                  );
                }
                if (e instanceof Array || (e && e.push && o(e))) {
                  for (var n = e.length; --n > -1; ) this.remove(e[n]);
                  return this;
                }
                return 'string' == typeof e
                  ? this.removeLabel(e)
                  : this.kill(null, e);
              }),
              (d._remove = function(e, t) {
                return (
                  r.c.prototype._remove.call(this, e, t),
                  this._last
                    ? this._time > this.duration() &&
                      ((this._time = this._duration),
                      (this._totalTime = this._totalDuration))
                    : (this._time = this._totalTime = this._duration = this._totalDuration = 0),
                  this
                );
              }),
              (d.append = function(e, t) {
                return this.add(e, this._parseTimeOrLabel(null, t, !0, e));
              }),
              (d.insert = d.insertMultiple = function(e, t, n, r) {
                return this.add(e, t || 0, n, r);
              }),
              (d.appendMultiple = function(e, t, n, r) {
                return this.add(
                  e,
                  this._parseTimeOrLabel(null, t, !0, e),
                  n,
                  r
                );
              }),
              (d.addLabel = function(e, t) {
                return (this._labels[e] = this._parseTimeOrLabel(t)), this;
              }),
              (d.addPause = function(e, t, n, i) {
                var o = r.f.delayedCall(0, h, n, i || this);
                return (
                  (o.vars.onComplete = o.vars.onReverseComplete = t),
                  (o.data = 'isPause'),
                  (this._hasPause = !0),
                  this.add(o, e)
                );
              }),
              (d.removeLabel = function(e) {
                return delete this._labels[e], this;
              }),
              (d.getLabelTime = function(e) {
                return null != this._labels[e] ? this._labels[e] : -1;
              }),
              (d._parseTimeOrLabel = function(e, t, n, i) {
                var a, s;
                if (i instanceof r.a && i.timeline === this) this.remove(i);
                else if (i && (i instanceof Array || (i.push && o(i))))
                  for (s = i.length; --s > -1; )
                    i[s] instanceof r.a &&
                      i[s].timeline === this &&
                      this.remove(i[s]);
                if (
                  ((a =
                    'number' != typeof e || t
                      ? this.duration() > 99999999999
                        ? this.recent().endTime(!1)
                        : this._duration
                      : 0),
                  'string' == typeof t)
                )
                  return this._parseTimeOrLabel(
                    t,
                    n && 'number' == typeof e && null == this._labels[t]
                      ? e - a
                      : 0,
                    n
                  );
                if (
                  ((t = t || 0),
                  'string' != typeof e ||
                    (!isNaN(e) && null == this._labels[e]))
                )
                  null == e && (e = a);
                else {
                  if (-1 === (s = e.indexOf('=')))
                    return null == this._labels[e]
                      ? n
                        ? (this._labels[e] = a + t)
                        : t
                      : this._labels[e] + t;
                  (t =
                    parseInt(e.charAt(s - 1) + '1', 10) *
                    Number(e.substr(s + 1))),
                    (e =
                      s > 1
                        ? this._parseTimeOrLabel(e.substr(0, s - 1), 0, n)
                        : a);
                }
                return Number(e) + t;
              }),
              (d.seek = function(e, t) {
                return this.totalTime(
                  'number' == typeof e ? e : this._parseTimeOrLabel(e),
                  !1 !== t
                );
              }),
              (d.stop = function() {
                return this.paused(!0);
              }),
              (d.gotoAndPlay = function(e, t) {
                return this.play(e, t);
              }),
              (d.gotoAndStop = function(e, t) {
                return this.pause(e, t);
              }),
              (d.render = function(e, t, n) {
                this._gc && this._enabled(!0, !1);
                var r,
                  i,
                  o,
                  l,
                  u,
                  c,
                  h,
                  f,
                  p = this._time,
                  d = this._dirty ? this.totalDuration() : this._totalDuration,
                  m = this._startTime,
                  g = this._timeScale,
                  v = this._paused;
                if (
                  (p !== this._time && (e += this._time - p),
                  this._hasPause && !this._forcingPlayhead && !t)
                ) {
                  if (e > p)
                    for (r = this._first; r && r._startTime <= e && !c; )
                      r._duration ||
                        'isPause' !== r.data ||
                        r.ratio ||
                        (0 === r._startTime && 0 === this._rawPrevTime) ||
                        (c = r),
                        (r = r._next);
                  else
                    for (r = this._last; r && r._startTime >= e && !c; )
                      r._duration ||
                        ('isPause' === r.data && r._rawPrevTime > 0 && (c = r)),
                        (r = r._prev);
                  c &&
                    ((this._time = this._totalTime = e = c._startTime),
                    (f =
                      this._startTime +
                      (this._reversed ? this._duration - e : e) /
                        this._timeScale));
                }
                if (e >= d - 1e-8 && e >= 0)
                  (this._totalTime = this._time = d),
                    this._reversed ||
                      this._hasPausedChild() ||
                      ((i = !0),
                      (l = 'onComplete'),
                      (u = !!this._timeline.autoRemoveChildren),
                      0 === this._duration &&
                        ((e <= 0 && e >= -1e-8) ||
                          this._rawPrevTime < 0 ||
                          1e-8 === this._rawPrevTime) &&
                        this._rawPrevTime !== e &&
                        this._first &&
                        ((u = !0),
                        this._rawPrevTime > 1e-8 && (l = 'onReverseComplete'))),
                    (this._rawPrevTime =
                      this._duration || !t || e || this._rawPrevTime === e
                        ? e
                        : 1e-8),
                    (e = d + 1e-4);
                else if (e < 1e-8)
                  if (
                    ((this._totalTime = this._time = 0),
                    e > -1e-8 && (e = 0),
                    (0 !== p ||
                      (0 === this._duration &&
                        1e-8 !== this._rawPrevTime &&
                        (this._rawPrevTime > 0 ||
                          (e < 0 && this._rawPrevTime >= 0)))) &&
                      ((l = 'onReverseComplete'), (i = this._reversed)),
                    e < 0)
                  )
                    (this._active = !1),
                      this._timeline.autoRemoveChildren && this._reversed
                        ? ((u = i = !0), (l = 'onReverseComplete'))
                        : this._rawPrevTime >= 0 && this._first && (u = !0),
                      (this._rawPrevTime = e);
                  else {
                    if (
                      ((this._rawPrevTime =
                        this._duration || !t || e || this._rawPrevTime === e
                          ? e
                          : 1e-8),
                      0 === e && i)
                    )
                      for (r = this._first; r && 0 === r._startTime; )
                        r._duration || (i = !1), (r = r._next);
                    (e = 0), this._initted || (u = !0);
                  }
                else this._totalTime = this._time = this._rawPrevTime = e;
                if ((this._time !== p && this._first) || n || u || c) {
                  if (
                    (this._initted || (this._initted = !0),
                    this._active ||
                      (!this._paused &&
                        this._time !== p &&
                        e > 0 &&
                        (this._active = !0)),
                    0 === p &&
                      this.vars.onStart &&
                      ((0 === this._time && this._duration) ||
                        t ||
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
                        (c === r && (this.pause(), (this._pauseTime = f)),
                        r._reversed
                          ? r.render(
                              (r._dirty
                                ? r.totalDuration()
                                : r._totalDuration) -
                                (e - r._startTime) * r._timeScale,
                              t,
                              n
                            )
                          : r.render((e - r._startTime) * r._timeScale, t, n)),
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
                        if (c === r) {
                          for (c = r._prev; c && c.endTime() > this._time; )
                            c.render(
                              c._reversed
                                ? c.totalDuration() -
                                    (e - c._startTime) * c._timeScale
                                : (e - c._startTime) * c._timeScale,
                              t,
                              n
                            ),
                              (c = c._prev);
                          (c = null), this.pause(), (this._pauseTime = f);
                        }
                        r._reversed
                          ? r.render(
                              (r._dirty
                                ? r.totalDuration()
                                : r._totalDuration) -
                                (e - r._startTime) * r._timeScale,
                              t,
                              n
                            )
                          : r.render((e - r._startTime) * r._timeScale, t, n);
                      }
                      r = o;
                    }
                  this._onUpdate &&
                    (t || (a.length && s(), this._callback('onUpdate'))),
                    l &&
                      (this._gc ||
                        (m !== this._startTime && g === this._timeScale) ||
                        ((0 === this._time || d >= this.totalDuration()) &&
                          (i &&
                            (a.length && s(),
                            this._timeline.autoRemoveChildren &&
                              this._enabled(!1, !1),
                            (this._active = !1)),
                          !t && this.vars[l] && this._callback(l))));
                }
              }),
              (d._hasPausedChild = function() {
                for (var t = this._first; t; ) {
                  if (t._paused || (t instanceof e && t._hasPausedChild()))
                    return !0;
                  t = t._next;
                }
                return !1;
              }),
              (d.getChildren = function(e, t, n, i) {
                i = i || -9999999999;
                for (var o = [], a = this._first, s = 0; a; )
                  a._startTime < i ||
                    (a instanceof r.f
                      ? !1 !== t && (o[s++] = a)
                      : (!1 !== n && (o[s++] = a),
                        !1 !== e &&
                          (s = (o = o.concat(a.getChildren(!0, t, n)))
                            .length))),
                    (a = a._next);
                return o;
              }),
              (d.getTweensOf = function(e, t) {
                var n,
                  i,
                  o = this._gc,
                  a = [],
                  s = 0;
                for (
                  o && this._enabled(!0, !0),
                    i = (n = r.f.getTweensOf(e)).length;
                  --i > -1;

                )
                  (n[i].timeline === this || (t && this._contains(n[i]))) &&
                    (a[s++] = n[i]);
                return o && this._enabled(!1, !0), a;
              }),
              (d.recent = function() {
                return this._recent;
              }),
              (d._contains = function(e) {
                for (var t = e.timeline; t; ) {
                  if (t === this) return !0;
                  t = t.timeline;
                }
                return !1;
              }),
              (d.shiftChildren = function(e, t, n) {
                n = n || 0;
                for (var r, i = this._first, o = this._labels; i; )
                  i._startTime >= n && (i._startTime += e), (i = i._next);
                if (t) for (r in o) o[r] >= n && (o[r] += e);
                return this._uncache(!0);
              }),
              (d._kill = function(e, t) {
                if (!e && !t) return this._enabled(!1, !1);
                for (
                  var n = t
                      ? this.getTweensOf(t)
                      : this.getChildren(!0, !0, !1),
                    r = n.length,
                    i = !1;
                  --r > -1;

                )
                  n[r]._kill(e, t) && (i = !0);
                return i;
              }),
              (d.clear = function(e) {
                var t = this.getChildren(!1, !0, !0),
                  n = t.length;
                for (this._time = this._totalTime = 0; --n > -1; )
                  t[n]._enabled(!1, !1);
                return !1 !== e && (this._labels = {}), this._uncache(!0);
              }),
              (d.invalidate = function() {
                for (var e = this._first; e; ) e.invalidate(), (e = e._next);
                return r.a.prototype.invalidate.call(this);
              }),
              (d._enabled = function(e, t) {
                if (e === this._gc)
                  for (var n = this._first; n; )
                    n._enabled(e, !0), (n = n._next);
                return r.c.prototype._enabled.call(this, e, t);
              }),
              (d.totalTime = function(e, t, n) {
                this._forcingPlayhead = !0;
                var i = r.a.prototype.totalTime.apply(this, arguments);
                return (this._forcingPlayhead = !1), i;
              }),
              (d.duration = function(e) {
                return arguments.length
                  ? (0 !== this.duration() &&
                      0 !== e &&
                      this.timeScale(this._duration / e),
                    this)
                  : (this._dirty && this.totalDuration(), this._duration);
              }),
              (d.totalDuration = function(e) {
                if (!arguments.length) {
                  if (this._dirty) {
                    for (
                      var t, n, r = 0, i = this, o = i._last, a = 999999999999;
                      o;

                    )
                      (t = o._prev),
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
                        (o = t);
                    (i._duration = i._totalDuration = r), (i._dirty = !1);
                  }
                  return this._totalDuration;
                }
                return e && this.totalDuration()
                  ? this.timeScale(this._totalDuration / e)
                  : this;
              }),
              (d.paused = function(e) {
                if (!1 === e && this._paused)
                  for (var t = this._first; t; )
                    t._startTime === this._time &&
                      'isPause' === t.data &&
                      (t._rawPrevTime = 0),
                      (t = t._next);
                return r.a.prototype.paused.apply(this, arguments);
              }),
              (d.usesFrames = function() {
                for (var e = this._timeline; e._timeline; ) e = e._timeline;
                return e === r.a._rootFramesTimeline;
              }),
              (d.rawTime = function(e) {
                return e &&
                  (this._paused ||
                    (this._repeat &&
                      this.time() > 0 &&
                      this.totalProgress() < 1))
                  ? this._totalTime % (this._duration + this._repeatDelay)
                  : this._paused
                  ? this._totalTime
                  : (this._timeline.rawTime(e) - this._startTime) *
                    this._timeScale;
              }),
              e
            );
          },
          !0
        );
      var f = r.g.TimelineLite;
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
          var e = function(e) {
              f.call(this, e),
                (this._repeat = this.vars.repeat || 0),
                (this._repeatDelay = this.vars.repeatDelay || 0),
                (this._cycle = 0),
                (this._yoyo = !!this.vars.yoyo),
                (this._dirty = !0);
            },
            t = r.f._internals,
            n = t.lazyTweens,
            i = t.lazyRender,
            o = r.e._gsDefine.globals,
            a = new r.b(null, null, 1, 0),
            s = (e.prototype = new f());
          return (
            (s.constructor = e),
            (s.kill()._gc = !1),
            (e.version = '2.1.3'),
            (s.invalidate = function() {
              return (
                (this._yoyo = !!this.vars.yoyo),
                (this._repeat = this.vars.repeat || 0),
                (this._repeatDelay = this.vars.repeatDelay || 0),
                this._uncache(!0),
                f.prototype.invalidate.call(this)
              );
            }),
            (s.addCallback = function(e, t, n, i) {
              return this.add(r.f.delayedCall(0, e, n, i), t);
            }),
            (s.removeCallback = function(e, t) {
              if (e)
                if (null == t) this._kill(null, e);
                else
                  for (
                    var n = this.getTweensOf(e, !1),
                      r = n.length,
                      i = this._parseTimeOrLabel(t);
                    --r > -1;

                  )
                    n[r]._startTime === i && n[r]._enabled(!1, !1);
              return this;
            }),
            (s.removePause = function(e) {
              return this.removeCallback(f._internals.pauseCallback, e);
            }),
            (s.tweenTo = function(e, t) {
              t = t || {};
              var n,
                i,
                s,
                l = {
                  ease: a,
                  useFrames: this.usesFrames(),
                  immediateRender: !1,
                  lazy: !1
                },
                u = (t.repeat && o.TweenMax) || r.f;
              for (i in t) l[i] = t[i];
              return (
                (l.time = this._parseTimeOrLabel(e)),
                (n =
                  Math.abs(Number(l.time) - this._time) / this._timeScale ||
                  0.001),
                (s = new u(this, n, l)),
                (l.onStart = function() {
                  s.target.paused(!0),
                    s.vars.time === s.target.time() ||
                      n !== s.duration() ||
                      s.isFromTo ||
                      s
                        .duration(
                          Math.abs(s.vars.time - s.target.time()) /
                            s.target._timeScale
                        )
                        .render(s.time(), !0, !0),
                    t.onStart &&
                      t.onStart.apply(
                        t.onStartScope || t.callbackScope || s,
                        t.onStartParams || []
                      );
                }),
                s
              );
            }),
            (s.tweenFromTo = function(e, t, n) {
              (n = n || {}),
                (e = this._parseTimeOrLabel(e)),
                (n.startAt = {
                  onComplete: this.seek,
                  onCompleteParams: [e],
                  callbackScope: this
                }),
                (n.immediateRender = !1 !== n.immediateRender);
              var r = this.tweenTo(t, n);
              return (
                (r.isFromTo = 1),
                r.duration(Math.abs(r.vars.time - e) / this._timeScale || 0.001)
              );
            }),
            (s.render = function(e, t, r) {
              this._gc && this._enabled(!0, !1);
              var o,
                a,
                s,
                l,
                u,
                c,
                h,
                f,
                p,
                d = this._time,
                m = this._dirty ? this.totalDuration() : this._totalDuration,
                g = this._duration,
                v = this._totalTime,
                _ = this._startTime,
                y = this._timeScale,
                T = this._rawPrevTime,
                b = this._paused,
                x = this._cycle;
              if (
                (d !== this._time && (e += this._time - d),
                e >= m - 1e-8 && e >= 0)
              )
                this._locked ||
                  ((this._totalTime = m), (this._cycle = this._repeat)),
                  this._reversed ||
                    this._hasPausedChild() ||
                    ((a = !0),
                    (l = 'onComplete'),
                    (u = !!this._timeline.autoRemoveChildren),
                    0 === this._duration &&
                      ((e <= 0 && e >= -1e-8) || T < 0 || 1e-8 === T) &&
                      T !== e &&
                      this._first &&
                      ((u = !0), T > 1e-8 && (l = 'onReverseComplete'))),
                  (this._rawPrevTime =
                    this._duration || !t || e || this._rawPrevTime === e
                      ? e
                      : 1e-8),
                  this._yoyo && 1 & this._cycle
                    ? (this._time = e = 0)
                    : ((this._time = g), (e = g + 1e-4));
              else if (e < 1e-8)
                if (
                  (this._locked || (this._totalTime = this._cycle = 0),
                  (this._time = 0),
                  e > -1e-8 && (e = 0),
                  (0 !== d ||
                    (0 === g &&
                      1e-8 !== T &&
                      (T > 0 || (e < 0 && T >= 0)) &&
                      !this._locked)) &&
                    ((l = 'onReverseComplete'), (a = this._reversed)),
                  e < 0)
                )
                  (this._active = !1),
                    this._timeline.autoRemoveChildren && this._reversed
                      ? ((u = a = !0), (l = 'onReverseComplete'))
                      : T >= 0 && this._first && (u = !0),
                    (this._rawPrevTime = e);
                else {
                  if (
                    ((this._rawPrevTime =
                      g || !t || e || this._rawPrevTime === e ? e : 1e-8),
                    0 === e && a)
                  )
                    for (o = this._first; o && 0 === o._startTime; )
                      o._duration || (a = !1), (o = o._next);
                  (e = 0), this._initted || (u = !0);
                }
              else
                0 === g && T < 0 && (u = !0),
                  (this._time = this._rawPrevTime = e),
                  this._locked ||
                    ((this._totalTime = e),
                    0 !== this._repeat &&
                      ((c = g + this._repeatDelay),
                      (this._cycle = (this._totalTime / c) >> 0),
                      this._cycle &&
                        this._cycle === this._totalTime / c &&
                        v <= e &&
                        this._cycle--,
                      (this._time = this._totalTime - this._cycle * c),
                      this._yoyo &&
                        1 & this._cycle &&
                        (this._time = g - this._time),
                      this._time > g
                        ? ((this._time = g), (e = g + 1e-4))
                        : this._time < 0
                        ? (this._time = e = 0)
                        : (e = this._time)));
              if (this._hasPause && !this._forcingPlayhead && !t) {
                if ((e = this._time) > d || (this._repeat && x !== this._cycle))
                  for (o = this._first; o && o._startTime <= e && !h; )
                    o._duration ||
                      'isPause' !== o.data ||
                      o.ratio ||
                      (0 === o._startTime && 0 === this._rawPrevTime) ||
                      (h = o),
                      (o = o._next);
                else
                  for (o = this._last; o && o._startTime >= e && !h; )
                    o._duration ||
                      ('isPause' === o.data && o._rawPrevTime > 0 && (h = o)),
                      (o = o._prev);
                h &&
                  ((p =
                    this._startTime +
                    (this._reversed
                      ? this._duration - h._startTime
                      : h._startTime) /
                      this._timeScale),
                  h._startTime < g &&
                    ((this._time = this._rawPrevTime = e = h._startTime),
                    (this._totalTime =
                      e +
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
                  (this._rawPrevTime = 0 === g ? T - 1e-4 : T),
                  (this._cycle = x),
                  (this._locked = !0),
                  (d = w ? 0 : g),
                  this.render(d, t, 0 === g),
                  t ||
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
                  this._paused && !b)
                )
                  return;
                (this._time = R),
                  (this._totalTime = A),
                  (this._cycle = C),
                  (this._rawPrevTime = P);
              }
              if ((this._time !== d && this._first) || r || u || h) {
                if (
                  (this._initted || (this._initted = !0),
                  this._active ||
                    (!this._paused &&
                      this._totalTime !== v &&
                      e > 0 &&
                      (this._active = !0)),
                  0 === v &&
                    this.vars.onStart &&
                    ((0 === this._totalTime && this._totalDuration) ||
                      t ||
                      this._callback('onStart')),
                  (f = this._time) >= d)
                )
                  for (
                    o = this._first;
                    o &&
                    ((s = o._next), f === this._time && (!this._paused || b));

                  )
                    (o._active ||
                      (o._startTime <= this._time && !o._paused && !o._gc)) &&
                      (h === o && (this.pause(), (this._pauseTime = p)),
                      o._reversed
                        ? o.render(
                            (o._dirty ? o.totalDuration() : o._totalDuration) -
                              (e - o._startTime) * o._timeScale,
                            t,
                            r
                          )
                        : o.render((e - o._startTime) * o._timeScale, t, r)),
                      (o = s);
                else
                  for (
                    o = this._last;
                    o &&
                    ((s = o._prev), f === this._time && (!this._paused || b));

                  ) {
                    if (
                      o._active ||
                      (o._startTime <= d && !o._paused && !o._gc)
                    ) {
                      if (h === o) {
                        for (h = o._prev; h && h.endTime() > this._time; )
                          h.render(
                            h._reversed
                              ? h.totalDuration() -
                                  (e - h._startTime) * h._timeScale
                              : (e - h._startTime) * h._timeScale,
                            t,
                            r
                          ),
                            (h = h._prev);
                        (h = null), this.pause(), (this._pauseTime = p);
                      }
                      o._reversed
                        ? o.render(
                            (o._dirty ? o.totalDuration() : o._totalDuration) -
                              (e - o._startTime) * o._timeScale,
                            t,
                            r
                          )
                        : o.render((e - o._startTime) * o._timeScale, t, r);
                    }
                    o = s;
                  }
                this._onUpdate &&
                  (t || (n.length && i(), this._callback('onUpdate'))),
                  l &&
                    (this._locked ||
                      this._gc ||
                      (_ !== this._startTime && y === this._timeScale) ||
                      ((0 === this._time || m >= this.totalDuration()) &&
                        (a &&
                          (n.length && i(),
                          this._timeline.autoRemoveChildren &&
                            this._enabled(!1, !1),
                          (this._active = !1)),
                        !t && this.vars[l] && this._callback(l))));
              } else
                v !== this._totalTime &&
                  this._onUpdate &&
                  (t || this._callback('onUpdate'));
            }),
            (s.getActive = function(e, t, n) {
              var r,
                i,
                o = [],
                a = this.getChildren(e || null == e, t || null == e, !!n),
                s = 0,
                l = a.length;
              for (r = 0; r < l; r++) (i = a[r]).isActive() && (o[s++] = i);
              return o;
            }),
            (s.getLabelAfter = function(e) {
              e || (0 !== e && (e = this._time));
              var t,
                n = this.getLabelsArray(),
                r = n.length;
              for (t = 0; t < r; t++) if (n[t].time > e) return n[t].name;
              return null;
            }),
            (s.getLabelBefore = function(e) {
              null == e && (e = this._time);
              for (var t = this.getLabelsArray(), n = t.length; --n > -1; )
                if (t[n].time < e) return t[n].name;
              return null;
            }),
            (s.getLabelsArray = function() {
              var e,
                t = [],
                n = 0;
              for (e in this._labels)
                t[n++] = { time: this._labels[e], name: e };
              return (
                t.sort(function(e, t) {
                  return e.time - t.time;
                }),
                t
              );
            }),
            (s.invalidate = function() {
              return (this._locked = !1), f.prototype.invalidate.call(this);
            }),
            (s.progress = function(e, t) {
              return arguments.length
                ? this.totalTime(
                    this.duration() *
                      (this._yoyo && 0 != (1 & this._cycle) ? 1 - e : e) +
                      this._cycle * (this._duration + this._repeatDelay),
                    t
                  )
                : this._time / this.duration() || 0;
            }),
            (s.totalProgress = function(e, t) {
              return arguments.length
                ? this.totalTime(this.totalDuration() * e, t)
                : this._totalTime / this.totalDuration() || 0;
            }),
            (s.totalDuration = function(e) {
              return arguments.length
                ? -1 !== this._repeat && e
                  ? this.timeScale(this.totalDuration() / e)
                  : this
                : (this._dirty &&
                    (f.prototype.totalDuration.call(this),
                    (this._totalDuration =
                      -1 === this._repeat
                        ? 999999999999
                        : this._duration * (this._repeat + 1) +
                          this._repeatDelay * this._repeat)),
                  this._totalDuration);
            }),
            (s.time = function(e, t) {
              if (!arguments.length) return this._time;
              this._dirty && this.totalDuration();
              var n = this._duration,
                r = this._cycle,
                i = r * (n + this._repeatDelay);
              return (
                e > n && (e = n),
                this.totalTime(
                  this._yoyo && 1 & r ? n - e + i : this._repeat ? e + i : e,
                  t
                )
              );
            }),
            (s.repeat = function(e) {
              return arguments.length
                ? ((this._repeat = e), this._uncache(!0))
                : this._repeat;
            }),
            (s.repeatDelay = function(e) {
              return arguments.length
                ? ((this._repeatDelay = e), this._uncache(!0))
                : this._repeatDelay;
            }),
            (s.yoyo = function(e) {
              return arguments.length ? ((this._yoyo = e), this) : this._yoyo;
            }),
            (s.currentLabel = function(e) {
              return arguments.length
                ? this.seek(e, !0)
                : this.getLabelBefore(this._time + 1e-8);
            }),
            e
          );
        },
        !0
      );
      var p = r.g.TimelineMax,
        d = 180 / Math.PI,
        m = [],
        g = [],
        v = [],
        _ = {},
        y = r.e._gsDefine.globals,
        T = function(e, t, n, r) {
          n === r && (n = r - (r - t) / 1e6),
            e === t && (t = e + (n - e) / 1e6),
            (this.a = e),
            (this.b = t),
            (this.c = n),
            (this.d = r),
            (this.da = r - e),
            (this.ca = n - e),
            (this.ba = t - e);
        },
        b = function(e, t, n, r) {
          var i = { a: e },
            o = {},
            a = {},
            s = { c: r },
            l = (e + t) / 2,
            u = (t + n) / 2,
            c = (n + r) / 2,
            h = (l + u) / 2,
            f = (u + c) / 2,
            p = (f - h) / 8;
          return (
            (i.b = l + (e - l) / 4),
            (o.b = h + p),
            (i.c = o.a = (i.b + o.b) / 2),
            (o.c = a.a = (h + f) / 2),
            (a.b = f - p),
            (s.b = c + (r - c) / 4),
            (a.c = s.a = (a.b + s.b) / 2),
            [i, o, a, s]
          );
        },
        x = function(e, t, n, r, i) {
          var o,
            a,
            s,
            l,
            u,
            c,
            h,
            f,
            p,
            d,
            _,
            y,
            T,
            x = e.length - 1,
            w = 0,
            E = e[0].a;
          for (o = 0; o < x; o++)
            (a = (u = e[w]).a),
              (s = u.d),
              (l = e[w + 1].d),
              i
                ? ((_ = m[o]),
                  (T = (((y = g[o]) + _) * t * 0.25) / (r ? 0.5 : v[o] || 0.5)),
                  (f =
                    s -
                    ((c = s - (s - a) * (r ? 0.5 * t : 0 !== _ ? T / _ : 0)) +
                      ((((h =
                        s + (l - s) * (r ? 0.5 * t : 0 !== y ? T / y : 0)) -
                        c) *
                        ((3 * _) / (_ + y) + 0.5)) /
                        4 || 0))))
                : (f =
                    s -
                    ((c = s - (s - a) * t * 0.5) +
                      (h = s + (l - s) * t * 0.5)) /
                      2),
              (c += f),
              (h += f),
              (u.c = p = c),
              (u.b = 0 !== o ? E : (E = u.a + 0.6 * (u.c - u.a))),
              (u.da = s - a),
              (u.ca = p - a),
              (u.ba = E - a),
              n
                ? ((d = b(a, E, p, s)),
                  e.splice(w, 1, d[0], d[1], d[2], d[3]),
                  (w += 4))
                : w++,
              (E = h);
          ((u = e[w]).b = E),
            (u.c = E + 0.4 * (u.d - E)),
            (u.da = u.d - u.a),
            (u.ca = u.c - u.a),
            (u.ba = E - u.a),
            n &&
              ((d = b(u.a, E, u.c, u.d)),
              e.splice(w, 1, d[0], d[1], d[2], d[3]));
        },
        w = function(e, t, n, r) {
          var i,
            o,
            a,
            s,
            l,
            u,
            c = [];
          if (r)
            for (o = (e = [r].concat(e)).length; --o > -1; )
              'string' == typeof (u = e[o][t]) &&
                '=' === u.charAt(1) &&
                (e[o][t] = r[t] + Number(u.charAt(0) + u.substr(2)));
          if ((i = e.length - 2) < 0)
            return (c[0] = new T(e[0][t], 0, 0, e[0][t])), c;
          for (o = 0; o < i; o++)
            (a = e[o][t]),
              (s = e[o + 1][t]),
              (c[o] = new T(a, 0, 0, s)),
              n &&
                ((l = e[o + 2][t]),
                (m[o] = (m[o] || 0) + (s - a) * (s - a)),
                (g[o] = (g[o] || 0) + (l - s) * (l - s)));
          return (c[o] = new T(e[o][t], 0, 0, e[o + 1][t])), c;
        },
        E = function(e, t, n, r, i, o) {
          var a,
            s,
            l,
            u,
            c,
            h,
            f,
            p,
            d = {},
            y = [],
            T = o || e[0];
          for (s in ((i =
            'string' == typeof i
              ? ',' + i + ','
              : ',x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,'),
          null == t && (t = 1),
          e[0]))
            y.push(s);
          if (e.length > 1) {
            for (p = e[e.length - 1], f = !0, a = y.length; --a > -1; )
              if (((s = y[a]), Math.abs(T[s] - p[s]) > 0.05)) {
                f = !1;
                break;
              }
            f &&
              ((e = e.concat()),
              o && e.unshift(o),
              e.push(e[1]),
              (o = e[e.length - 3]));
          }
          for (m.length = g.length = v.length = 0, a = y.length; --a > -1; )
            (s = y[a]),
              (_[s] = -1 !== i.indexOf(',' + s + ',')),
              (d[s] = w(e, s, _[s], o));
          for (a = m.length; --a > -1; )
            (m[a] = Math.sqrt(m[a])), (g[a] = Math.sqrt(g[a]));
          if (!r) {
            for (a = y.length; --a > -1; )
              if (_[s])
                for (h = (l = d[y[a]]).length - 1, u = 0; u < h; u++)
                  (c = l[u + 1].da / g[u] + l[u].da / m[u] || 0),
                    (v[u] = (v[u] || 0) + c * c);
            for (a = v.length; --a > -1; ) v[a] = Math.sqrt(v[a]);
          }
          for (a = y.length, u = n ? 4 : 1; --a > -1; )
            (l = d[(s = y[a])]),
              x(l, t, n, r, _[s]),
              f && (l.splice(0, u), l.splice(l.length - u, u));
          return d;
        },
        A = function(e, t, n) {
          for (
            var r, i, o, a, s, l, u, c, h, f, p, d = 1 / n, m = e.length;
            --m > -1;

          )
            for (
              o = (f = e[m]).a,
                a = f.d - o,
                s = f.c - o,
                l = f.b - o,
                r = i = 0,
                c = 1;
              c <= n;
              c++
            )
              (r =
                i -
                (i =
                  ((u = d * c) * u * a + 3 * (h = 1 - u) * (u * s + h * l)) *
                  u)),
                (t[(p = m * n + c - 1)] = (t[p] || 0) + r * r);
        },
        C = r.e._gsDefine.plugin({
          propName: 'bezier',
          priority: -1,
          version: '1.3.9',
          API: 2,
          global: !0,
          init: function(e, t, n) {
            (this._target = e),
              t instanceof Array && (t = { values: t }),
              (this._func = {}),
              (this._mod = {}),
              (this._props = []),
              (this._timeRes =
                null == t.timeResolution ? 6 : parseInt(t.timeResolution, 10));
            var r,
              i,
              o,
              a,
              s,
              l = t.values || [],
              u = {},
              c = l[0],
              h = t.autoRotate || n.vars.orientToBezier;
            for (r in ((this._autoRotate = h
              ? h instanceof Array
                ? h
                : [['x', 'y', 'rotation', !0 === h ? 0 : Number(h) || 0]]
              : null),
            c))
              this._props.push(r);
            for (o = this._props.length; --o > -1; )
              (r = this._props[o]),
                this._overwriteProps.push(r),
                (i = this._func[r] = 'function' == typeof e[r]),
                (u[r] = i
                  ? e[
                      r.indexOf('set') ||
                      'function' != typeof e['get' + r.substr(3)]
                        ? r
                        : 'get' + r.substr(3)
                    ]()
                  : parseFloat(e[r])),
                s || (u[r] !== l[0][r] && (s = u));
            if (
              ((this._beziers =
                'cubic' !== t.type &&
                'quadratic' !== t.type &&
                'soft' !== t.type
                  ? E(
                      l,
                      isNaN(t.curviness) ? 1 : t.curviness,
                      !1,
                      'thruBasic' === t.type,
                      t.correlate,
                      s
                    )
                  : (function(e, t, n) {
                      var r,
                        i,
                        o,
                        a,
                        s,
                        l,
                        u,
                        c,
                        h,
                        f,
                        p,
                        d = {},
                        m = 'cubic' === (t = t || 'soft') ? 3 : 2,
                        g = 'soft' === t,
                        v = [];
                      if (
                        (g && n && (e = [n].concat(e)),
                        null == e || e.length < m + 1)
                      )
                        throw 'invalid Bezier data';
                      for (h in e[0]) v.push(h);
                      for (l = v.length; --l > -1; ) {
                        for (
                          d[(h = v[l])] = s = [], f = 0, c = e.length, u = 0;
                          u < c;
                          u++
                        )
                          (r =
                            null == n
                              ? e[u][h]
                              : 'string' == typeof (p = e[u][h]) &&
                                '=' === p.charAt(1)
                              ? n[h] + Number(p.charAt(0) + p.substr(2))
                              : Number(p)),
                            g &&
                              u > 1 &&
                              u < c - 1 &&
                              (s[f++] = (r + s[f - 2]) / 2),
                            (s[f++] = r);
                        for (c = f - m + 1, f = 0, u = 0; u < c; u += m)
                          (r = s[u]),
                            (i = s[u + 1]),
                            (o = s[u + 2]),
                            (a = 2 === m ? 0 : s[u + 3]),
                            (s[f++] = p =
                              3 === m
                                ? new T(r, i, o, a)
                                : new T(
                                    r,
                                    (2 * i + r) / 3,
                                    (2 * i + o) / 3,
                                    o
                                  ));
                        s.length = f;
                      }
                      return d;
                    })(l, t.type, u)),
              (this._segCount = this._beziers[r].length),
              this._timeRes)
            ) {
              var f = (function(e, t) {
                var n,
                  r,
                  i,
                  o,
                  a = [],
                  s = [],
                  l = 0,
                  u = 0,
                  c = (t = t >> 0 || 6) - 1,
                  h = [],
                  f = [];
                for (n in e) A(e[n], a, t);
                for (i = a.length, r = 0; r < i; r++)
                  (l += Math.sqrt(a[r])),
                    (f[(o = r % t)] = l),
                    o === c &&
                      ((u += l),
                      (h[(o = (r / t) >> 0)] = f),
                      (s[o] = u),
                      (l = 0),
                      (f = []));
                return { length: u, lengths: s, segments: h };
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
                      'function' == typeof e[r] &&
                      e[
                        r.indexOf('set') ||
                        'function' != typeof e['get' + r.substr(3)]
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
          set: function(e) {
            var t,
              n,
              r,
              i,
              o,
              a,
              s,
              l,
              u,
              c,
              h,
              f = this._segCount,
              p = this._func,
              m = this._target,
              g = e !== this._startRatio;
            if (this._timeRes) {
              if (
                ((u = this._lengths),
                (c = this._curSeg),
                (h = e * this._length),
                (r = this._li),
                h > this._l2 && r < f - 1)
              ) {
                for (l = f - 1; r < l && (this._l2 = u[++r]) <= h; );
                (this._l1 = u[r - 1]),
                  (this._li = r),
                  (this._curSeg = c = this._segments[r]),
                  (this._s2 = c[(this._s1 = this._si = 0)]);
              } else if (h < this._l1 && r > 0) {
                for (; r > 0 && (this._l1 = u[--r]) >= h; );
                0 === r && h < this._l1 ? (this._l1 = 0) : r++,
                  (this._l2 = u[r]),
                  (this._li = r),
                  (this._curSeg = c = this._segments[r]),
                  (this._s1 = c[(this._si = c.length - 1) - 1] || 0),
                  (this._s2 = c[this._si]);
              }
              if (
                ((t = r),
                (h -= this._l1),
                (r = this._si),
                h > this._s2 && r < c.length - 1)
              ) {
                for (l = c.length - 1; r < l && (this._s2 = c[++r]) <= h; );
                (this._s1 = c[r - 1]), (this._si = r);
              } else if (h < this._s1 && r > 0) {
                for (; r > 0 && (this._s1 = c[--r]) >= h; );
                0 === r && h < this._s1 ? (this._s1 = 0) : r++,
                  (this._s2 = c[r]),
                  (this._si = r);
              }
              a =
                1 === e
                  ? 1
                  : (r + (h - this._s1) / (this._s2 - this._s1)) * this._prec ||
                    0;
            } else
              a =
                (e -
                  (t = e < 0 ? 0 : e >= 1 ? f - 1 : (f * e) >> 0) * (1 / f)) *
                f;
            for (n = 1 - a, r = this._props.length; --r > -1; )
              (i = this._props[r]),
                (s =
                  (a * a * (o = this._beziers[i][t]).da +
                    3 * n * (a * o.ca + n * o.ba)) *
                    a +
                  o.a),
                this._mod[i] && (s = this._mod[i](s, m)),
                p[i] ? m[i](s) : (m[i] = s);
            if (this._autoRotate) {
              var v,
                _,
                y,
                T,
                b,
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
                    ((o = o[t]),
                    (v = v[t]),
                    (_ = o.a + (o.b - o.a) * a),
                    (_ += ((T = o.b + (o.c - o.b) * a) - _) * a),
                    (T += (o.c + (o.d - o.c) * a - T) * a),
                    (y = v.a + (v.b - v.a) * a),
                    (y += ((b = v.b + (v.c - v.b) * a) - y) * a),
                    (b += (v.c + (v.d - v.c) * a - b) * a),
                    (s = g
                      ? Math.atan2(b - y, T - _) * w + x
                      : this._initialRotations[r]),
                    this._mod[i] && (s = this._mod[i](s, m)),
                    p[i] ? m[i](s) : (m[i] = s));
            }
          }
        }),
        P = C.prototype;
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
       **/ (C.bezierThrough = E),
        (C.cubicToQuadratic = b),
        (C._autoCSS = !0),
        (C.quadraticToCubic = function(e, t, n) {
          return new T(e, (2 * t + e) / 3, (2 * t + n) / 3, n);
        }),
        (C._cssRegister = function() {
          var e = y.CSSPlugin;
          if (e) {
            var t = e._internals,
              n = t._parseToProxy,
              r = t._setPluginRatio,
              i = t.CSSPropTween;
            t._registerComplexSpecialProp('bezier', {
              parser: function(e, t, o, a, s, l) {
                t instanceof Array && (t = { values: t }), (l = new C());
                var u,
                  c,
                  h,
                  f = t.values,
                  p = f.length - 1,
                  d = [],
                  m = {};
                if (p < 0) return s;
                for (u = 0; u <= p; u++)
                  (h = n(e, f[u], a, s, l, p !== u)), (d[u] = h.end);
                for (c in t) m[c] = t[c];
                return (
                  (m.values = d),
                  ((s = new i(e, 'bezier', 0, 0, h.pt, 2)).data = h),
                  (s.plugin = l),
                  (s.setRatio = r),
                  0 === m.autoRotate && (m.autoRotate = !0),
                  !m.autoRotate ||
                    m.autoRotate instanceof Array ||
                    ((u = !0 === m.autoRotate ? 0 : Number(m.autoRotate)),
                    (m.autoRotate =
                      null != h.end.left
                        ? [['left', 'top', 'rotation', u, !1]]
                        : null != h.end.x && [['x', 'y', 'rotation', u, !1]])),
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
        (P._mod = function(e) {
          for (var t, n = this._overwriteProps, r = n.length; --r > -1; )
            (t = e[n[r]]) && 'function' == typeof t && (this._mod[n[r]] = t);
        }),
        (P._kill = function(e) {
          var t,
            n,
            r = this._props;
          for (t in this._beziers)
            if (t in e)
              for (
                delete this._beziers[t], delete this._func[t], n = r.length;
                --n > -1;

              )
                r[n] === t && r.splice(n, 1);
          if ((r = this._autoRotate))
            for (n = r.length; --n > -1; ) e[r[n][2]] && r.splice(n, 1);
          return this._super._kill.call(this, e);
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
            var e,
              t,
              n,
              i,
              o = r.e.GreenSockGlobals || r.e,
              a = o.com.greensock,
              s = 2 * Math.PI,
              l = Math.PI / 2,
              u = a._class,
              c = function(e, t) {
                var n = u('easing.' + e, function() {}, !0),
                  i = (n.prototype = new r.b());
                return (i.constructor = n), (i.getRatio = t), n;
              },
              h = r.b.register || function() {},
              f = function(e, t, n, r, i) {
                var o = u(
                  'easing.' + e,
                  { easeOut: new t(), easeIn: new n(), easeInOut: new r() },
                  !0
                );
                return h(o, e), o;
              },
              p = function(e, t, n) {
                (this.t = e),
                  (this.v = t),
                  n &&
                    ((this.next = n),
                    (n.prev = this),
                    (this.c = n.v - t),
                    (this.gap = n.t - e));
              },
              d = function(e, t) {
                var n = u(
                    'easing.' + e,
                    function(e) {
                      (this._p1 = e || 0 === e ? e : 1.70158),
                        (this._p2 = 1.525 * this._p1);
                    },
                    !0
                  ),
                  i = (n.prototype = new r.b());
                return (
                  (i.constructor = n),
                  (i.getRatio = t),
                  (i.config = function(e) {
                    return new n(e);
                  }),
                  n
                );
              },
              m = f(
                'Back',
                d('BackOut', function(e) {
                  return (e -= 1) * e * ((this._p1 + 1) * e + this._p1) + 1;
                }),
                d('BackIn', function(e) {
                  return e * e * ((this._p1 + 1) * e - this._p1);
                }),
                d('BackInOut', function(e) {
                  return (e *= 2) < 1
                    ? 0.5 * e * e * ((this._p2 + 1) * e - this._p2)
                    : 0.5 *
                        ((e -= 2) * e * ((this._p2 + 1) * e + this._p2) + 2);
                })
              ),
              g = u(
                'easing.SlowMo',
                function(e, t, n) {
                  (t = t || 0 === t ? t : 0.7),
                    null == e ? (e = 0.7) : e > 1 && (e = 1),
                    (this._p = 1 !== e ? t : 0),
                    (this._p1 = (1 - e) / 2),
                    (this._p2 = e),
                    (this._p3 = this._p1 + this._p2),
                    (this._calcEnd = !0 === n);
                },
                !0
              ),
              v = (g.prototype = new r.b());
            return (
              (v.constructor = g),
              (v.getRatio = function(e) {
                var t = e + (0.5 - e) * this._p;
                return e < this._p1
                  ? this._calcEnd
                    ? 1 - (e = 1 - e / this._p1) * e
                    : t - (e = 1 - e / this._p1) * e * e * e * t
                  : e > this._p3
                  ? this._calcEnd
                    ? 1 === e
                      ? 0
                      : 1 - (e = (e - this._p3) / this._p1) * e
                    : t + (e - t) * (e = (e - this._p3) / this._p1) * e * e * e
                  : this._calcEnd
                  ? 1
                  : t;
              }),
              (g.ease = new g(0.7, 0.7)),
              (v.config = g.config = function(e, t, n) {
                return new g(e, t, n);
              }),
              ((v = (e = u(
                'easing.SteppedEase',
                function(e, t) {
                  (e = e || 1),
                    (this._p1 = 1 / e),
                    (this._p2 = e + (t ? 0 : 1)),
                    (this._p3 = t ? 1 : 0);
                },
                !0
              )).prototype = new r.b()).constructor = e),
              (v.getRatio = function(e) {
                return (
                  e < 0 ? (e = 0) : e >= 1 && (e = 0.999999999),
                  (((this._p2 * e) | 0) + this._p3) * this._p1
                );
              }),
              (v.config = e.config = function(t, n) {
                return new e(t, n);
              }),
              ((v = (t = u(
                'easing.ExpoScaleEase',
                function(e, t, n) {
                  (this._p1 = Math.log(t / e)),
                    (this._p2 = t - e),
                    (this._p3 = e),
                    (this._ease = n);
                },
                !0
              )).prototype = new r.b()).constructor = t),
              (v.getRatio = function(e) {
                return (
                  this._ease && (e = this._ease.getRatio(e)),
                  (this._p3 * Math.exp(this._p1 * e) - this._p3) / this._p2
                );
              }),
              (v.config = t.config = function(e, n, r) {
                return new t(e, n, r);
              }),
              ((v = (n = u(
                'easing.RoughEase',
                function(e) {
                  for (
                    var t,
                      n,
                      i,
                      o,
                      a,
                      s,
                      l = (e = e || {}).taper || 'none',
                      u = [],
                      c = 0,
                      h = 0 | (e.points || 20),
                      f = h,
                      d = !1 !== e.randomize,
                      m = !0 === e.clamp,
                      g = e.template instanceof r.b ? e.template : null,
                      v =
                        'number' == typeof e.strength ? 0.4 * e.strength : 0.4;
                    --f > -1;

                  )
                    (t = d ? Math.random() : (1 / h) * f),
                      (n = g ? g.getRatio(t) : t),
                      (i =
                        'none' === l
                          ? v
                          : 'out' === l
                          ? (o = 1 - t) * o * v
                          : 'in' === l
                          ? t * t * v
                          : t < 0.5
                          ? (o = 2 * t) * o * 0.5 * v
                          : (o = 2 * (1 - t)) * o * 0.5 * v),
                      d
                        ? (n += Math.random() * i - 0.5 * i)
                        : f % 2
                        ? (n += 0.5 * i)
                        : (n -= 0.5 * i),
                      m && (n > 1 ? (n = 1) : n < 0 && (n = 0)),
                      (u[c++] = { x: t, y: n });
                  for (
                    u.sort(function(e, t) {
                      return e.x - t.x;
                    }),
                      s = new p(1, 1, null),
                      f = h;
                    --f > -1;

                  )
                    (a = u[f]), (s = new p(a.x, a.y, s));
                  this._prev = new p(0, 0, 0 !== s.t ? s : s.next);
                },
                !0
              )).prototype = new r.b()).constructor = n),
              (v.getRatio = function(e) {
                var t = this._prev;
                if (e > t.t) {
                  for (; t.next && e >= t.t; ) t = t.next;
                  t = t.prev;
                } else for (; t.prev && e <= t.t; ) t = t.prev;
                return (this._prev = t), t.v + ((e - t.t) / t.gap) * t.c;
              }),
              (v.config = function(e) {
                return new n(e);
              }),
              (n.ease = new n()),
              f(
                'Bounce',
                c('BounceOut', function(e) {
                  return e < 1 / 2.75
                    ? 7.5625 * e * e
                    : e < 2 / 2.75
                    ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
                    : e < 2.5 / 2.75
                    ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
                    : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
                }),
                c('BounceIn', function(e) {
                  return (e = 1 - e) < 1 / 2.75
                    ? 1 - 7.5625 * e * e
                    : e < 2 / 2.75
                    ? 1 - (7.5625 * (e -= 1.5 / 2.75) * e + 0.75)
                    : e < 2.5 / 2.75
                    ? 1 - (7.5625 * (e -= 2.25 / 2.75) * e + 0.9375)
                    : 1 - (7.5625 * (e -= 2.625 / 2.75) * e + 0.984375);
                }),
                c('BounceInOut', function(e) {
                  var t = e < 0.5;
                  return (
                    (e = t ? 1 - 2 * e : 2 * e - 1) < 1 / 2.75
                      ? (e *= 7.5625 * e)
                      : (e =
                          e < 2 / 2.75
                            ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
                            : e < 2.5 / 2.75
                            ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
                            : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375),
                    t ? 0.5 * (1 - e) : 0.5 * e + 0.5
                  );
                })
              ),
              f(
                'Circ',
                c('CircOut', function(e) {
                  return Math.sqrt(1 - (e -= 1) * e);
                }),
                c('CircIn', function(e) {
                  return -(Math.sqrt(1 - e * e) - 1);
                }),
                c('CircInOut', function(e) {
                  return (e *= 2) < 1
                    ? -0.5 * (Math.sqrt(1 - e * e) - 1)
                    : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1);
                })
              ),
              f(
                'Elastic',
                (i = function(e, t, n) {
                  var i = u(
                      'easing.' + e,
                      function(e, t) {
                        (this._p1 = e >= 1 ? e : 1),
                          (this._p2 = (t || n) / (e < 1 ? e : 1)),
                          (this._p3 =
                            (this._p2 / s) * (Math.asin(1 / this._p1) || 0)),
                          (this._p2 = s / this._p2);
                      },
                      !0
                    ),
                    o = (i.prototype = new r.b());
                  return (
                    (o.constructor = i),
                    (o.getRatio = t),
                    (o.config = function(e, t) {
                      return new i(e, t);
                    }),
                    i
                  );
                })(
                  'ElasticOut',
                  function(e) {
                    return (
                      this._p1 *
                        Math.pow(2, -10 * e) *
                        Math.sin((e - this._p3) * this._p2) +
                      1
                    );
                  },
                  0.3
                ),
                i(
                  'ElasticIn',
                  function(e) {
                    return (
                      -this._p1 *
                      Math.pow(2, 10 * (e -= 1)) *
                      Math.sin((e - this._p3) * this._p2)
                    );
                  },
                  0.3
                ),
                i(
                  'ElasticInOut',
                  function(e) {
                    return (e *= 2) < 1
                      ? this._p1 *
                          Math.pow(2, 10 * (e -= 1)) *
                          Math.sin((e - this._p3) * this._p2) *
                          -0.5
                      : this._p1 *
                          Math.pow(2, -10 * (e -= 1)) *
                          Math.sin((e - this._p3) * this._p2) *
                          0.5 +
                          1;
                  },
                  0.45
                )
              ),
              f(
                'Expo',
                c('ExpoOut', function(e) {
                  return 1 - Math.pow(2, -10 * e);
                }),
                c('ExpoIn', function(e) {
                  return Math.pow(2, 10 * (e - 1)) - 0.001;
                }),
                c('ExpoInOut', function(e) {
                  return (e *= 2) < 1
                    ? 0.5 * Math.pow(2, 10 * (e - 1))
                    : 0.5 * (2 - Math.pow(2, -10 * (e - 1)));
                })
              ),
              f(
                'Sine',
                c('SineOut', function(e) {
                  return Math.sin(e * l);
                }),
                c('SineIn', function(e) {
                  return 1 - Math.cos(e * l);
                }),
                c('SineInOut', function(e) {
                  return -0.5 * (Math.cos(Math.PI * e) - 1);
                })
              ),
              u(
                'easing.EaseLookup',
                {
                  find: function(e) {
                    return r.b.map[e];
                  }
                },
                !0
              ),
              h(o.SlowMo, 'SlowMo', 'ease,'),
              h(n, 'RoughEase', 'ease,'),
              h(e, 'SteppedEase', 'ease,'),
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
        L = r.g.ExpoScaleEase;
      (i._autoActivated = [f, p, o, a, C, s, h, R, I, S, M, O, k, N, D, F, L]),
        n.d(t, 'a', function() {
          return r.f;
        });
    },
    zqV6: function(e, t, n) {
      'use strict';
      (function(e, r) {
        var i = n('pIo5'),
          o = n('hK8l');
        e.__TYPEDARRAY_POOL ||
          (e.__TYPEDARRAY_POOL = {
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
          s = e.__TYPEDARRAY_POOL;
        s.UINT8C || (s.UINT8C = o([32, 0])),
          s.BUFFER || (s.BUFFER = o([32, 0]));
        var l = s.DATA,
          u = s.BUFFER;
        function c(e) {
          if (e) {
            var t = e.length || e.byteLength,
              n = i.log2(t);
            l[n].push(e);
          }
        }
        function h(e) {
          e = i.nextPow2(e);
          var t = i.log2(e),
            n = l[t];
          return n.length > 0 ? n.pop() : new ArrayBuffer(e);
        }
        function f(e) {
          return new Uint8Array(h(e), 0, e);
        }
        function p(e) {
          return new Uint16Array(h(2 * e), 0, e);
        }
        function d(e) {
          return new Uint32Array(h(4 * e), 0, e);
        }
        function m(e) {
          return new Int8Array(h(e), 0, e);
        }
        function g(e) {
          return new Int16Array(h(2 * e), 0, e);
        }
        function v(e) {
          return new Int32Array(h(4 * e), 0, e);
        }
        function _(e) {
          return new Float32Array(h(4 * e), 0, e);
        }
        function y(e) {
          return new Float64Array(h(8 * e), 0, e);
        }
        function T(e) {
          return a ? new Uint8ClampedArray(h(e), 0, e) : f(e);
        }
        function b(e) {
          return new DataView(h(e), 0, e);
        }
        function x(e) {
          e = i.nextPow2(e);
          var t = i.log2(e),
            n = u[t];
          return n.length > 0 ? n.pop() : new r(e);
        }
        (t.free = function(e) {
          if (r.isBuffer(e)) u[i.log2(e.length)].push(e);
          else {
            if (
              ('[object ArrayBuffer]' !== Object.prototype.toString.call(e) &&
                (e = e.buffer),
              !e)
            )
              return;
            var t = e.length || e.byteLength,
              n = 0 | i.log2(t);
            l[n].push(e);
          }
        }),
          (t.freeUint8 = t.freeUint16 = t.freeUint32 = t.freeInt8 = t.freeInt16 = t.freeInt32 = t.freeFloat32 = t.freeFloat = t.freeFloat64 = t.freeDouble = t.freeUint8Clamped = t.freeDataView = function(
            e
          ) {
            c(e.buffer);
          }),
          (t.freeArrayBuffer = c),
          (t.freeBuffer = function(e) {
            u[i.log2(e.length)].push(e);
          }),
          (t.malloc = function(e, t) {
            if (void 0 === t || 'arraybuffer' === t) return h(e);
            switch (t) {
              case 'uint8':
                return f(e);
              case 'uint16':
                return p(e);
              case 'uint32':
                return d(e);
              case 'int8':
                return m(e);
              case 'int16':
                return g(e);
              case 'int32':
                return v(e);
              case 'float':
              case 'float32':
                return _(e);
              case 'double':
              case 'float64':
                return y(e);
              case 'uint8_clamped':
                return T(e);
              case 'buffer':
                return x(e);
              case 'data':
              case 'dataview':
                return b(e);
              default:
                return null;
            }
            return null;
          }),
          (t.mallocArrayBuffer = h),
          (t.mallocUint8 = f),
          (t.mallocUint16 = p),
          (t.mallocUint32 = d),
          (t.mallocInt8 = m),
          (t.mallocInt16 = g),
          (t.mallocInt32 = v),
          (t.mallocFloat32 = t.mallocFloat = _),
          (t.mallocFloat64 = t.mallocDouble = y),
          (t.mallocUint8Clamped = T),
          (t.mallocDataView = b),
          (t.mallocBuffer = x),
          (t.clearCache = function() {
            for (var e = 0; e < 32; ++e)
              (s.UINT8[e].length = 0),
                (s.UINT16[e].length = 0),
                (s.UINT32[e].length = 0),
                (s.INT8[e].length = 0),
                (s.INT16[e].length = 0),
                (s.INT32[e].length = 0),
                (s.FLOAT[e].length = 0),
                (s.DOUBLE[e].length = 0),
                (s.UINT8C[e].length = 0),
                (l[e].length = 0),
                (u[e].length = 0);
          });
      }.call(this, n('yLpj'), n('tjlA').Buffer));
    }
  },
  [['mGbE', 'runtime', 0, 1]]
]);
