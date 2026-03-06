var Ls = { exports: {} }, bn = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Jo = Symbol.for("react.transitional.element"), wo = Symbol.for("react.fragment");
function Js(l, t, u) {
  var a = null;
  if (u !== void 0 && (a = "" + u), t.key !== void 0 && (a = "" + t.key), "key" in t) {
    u = {};
    for (var e in t)
      e !== "key" && (u[e] = t[e]);
  } else u = t;
  return t = u.ref, {
    $$typeof: Jo,
    type: l,
    key: a,
    ref: t !== void 0 ? t : null,
    props: u
  };
}
bn.Fragment = wo;
bn.jsx = Js;
bn.jsxs = Js;
Ls.exports = bn;
var w = Ls.exports, ws = { exports: {} }, N = {}, Qn = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var bc = Symbol.for("react.transitional.element"), $o = Symbol.for("react.portal"), Wo = Symbol.for("react.fragment"), ko = Symbol.for("react.strict_mode"), Fo = Symbol.for("react.profiler"), Io = Symbol.for("react.consumer"), Po = Symbol.for("react.context"), lv = Symbol.for("react.forward_ref"), tv = Symbol.for("react.suspense"), uv = Symbol.for("react.memo"), $s = Symbol.for("react.lazy"), bi = Symbol.iterator;
function av(l) {
  return l === null || typeof l != "object" ? null : (l = bi && l[bi] || l["@@iterator"], typeof l == "function" ? l : null);
}
var Ws = {
  isMounted: function() {
    return !1;
  },
  enqueueForceUpdate: function() {
  },
  enqueueReplaceState: function() {
  },
  enqueueSetState: function() {
  }
}, ks = Object.assign, Fs = {};
function la(l, t, u) {
  this.props = l, this.context = t, this.refs = Fs, this.updater = u || Ws;
}
la.prototype.isReactComponent = {};
la.prototype.setState = function(l, t) {
  if (typeof l != "object" && typeof l != "function" && l != null)
    throw Error(
      "takes an object of state variables to update or a function which returns an object of state variables."
    );
  this.updater.enqueueSetState(this, l, t, "setState");
};
la.prototype.forceUpdate = function(l) {
  this.updater.enqueueForceUpdate(this, l, "forceUpdate");
};
function Is() {
}
Is.prototype = la.prototype;
function Ec(l, t, u) {
  this.props = l, this.context = t, this.refs = Fs, this.updater = u || Ws;
}
var Tc = Ec.prototype = new Is();
Tc.constructor = Ec;
ks(Tc, la.prototype);
Tc.isPureReactComponent = !0;
var Ei = Array.isArray, k = { H: null, A: null, T: null, S: null, V: null }, Ps = Object.prototype.hasOwnProperty;
function Ac(l, t, u, a, e, n) {
  return u = n.ref, {
    $$typeof: bc,
    type: l,
    key: t,
    ref: u !== void 0 ? u : null,
    props: n
  };
}
function ev(l, t) {
  return Ac(
    l.type,
    t,
    void 0,
    void 0,
    void 0,
    l.props
  );
}
function zc(l) {
  return typeof l == "object" && l !== null && l.$$typeof === bc;
}
function nv(l) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + l.replace(/[=:]/g, function(u) {
    return t[u];
  });
}
var Ti = /\/+/g;
function jn(l, t) {
  return typeof l == "object" && l !== null && l.key != null ? nv("" + l.key) : t.toString(36);
}
function Ai() {
}
function fv(l) {
  switch (l.status) {
    case "fulfilled":
      return l.value;
    case "rejected":
      throw l.reason;
    default:
      switch (typeof l.status == "string" ? l.then(Ai, Ai) : (l.status = "pending", l.then(
        function(t) {
          l.status === "pending" && (l.status = "fulfilled", l.value = t);
        },
        function(t) {
          l.status === "pending" && (l.status = "rejected", l.reason = t);
        }
      )), l.status) {
        case "fulfilled":
          return l.value;
        case "rejected":
          throw l.reason;
      }
  }
  throw l;
}
function Su(l, t, u, a, e) {
  var n = typeof l;
  (n === "undefined" || n === "boolean") && (l = null);
  var f = !1;
  if (l === null) f = !0;
  else
    switch (n) {
      case "bigint":
      case "string":
      case "number":
        f = !0;
        break;
      case "object":
        switch (l.$$typeof) {
          case bc:
          case $o:
            f = !0;
            break;
          case $s:
            return f = l._init, Su(
              f(l._payload),
              t,
              u,
              a,
              e
            );
        }
    }
  if (f)
    return e = e(l), f = a === "" ? "." + jn(l, 0) : a, Ei(e) ? (u = "", f != null && (u = f.replace(Ti, "$&/") + "/"), Su(e, t, u, "", function(o) {
      return o;
    })) : e != null && (zc(e) && (e = ev(
      e,
      u + (e.key == null || l && l.key === e.key ? "" : ("" + e.key).replace(
        Ti,
        "$&/"
      ) + "/") + f
    )), t.push(e)), 1;
  f = 0;
  var c = a === "" ? "." : a + ":";
  if (Ei(l))
    for (var i = 0; i < l.length; i++)
      a = l[i], n = c + jn(a, i), f += Su(
        a,
        t,
        u,
        n,
        e
      );
  else if (i = av(l), typeof i == "function")
    for (l = i.call(l), i = 0; !(a = l.next()).done; )
      a = a.value, n = c + jn(a, i++), f += Su(
        a,
        t,
        u,
        n,
        e
      );
  else if (n === "object") {
    if (typeof l.then == "function")
      return Su(
        fv(l),
        t,
        u,
        a,
        e
      );
    throw t = String(l), Error(
      "Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(l).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead."
    );
  }
  return f;
}
function ye(l, t, u) {
  if (l == null) return l;
  var a = [], e = 0;
  return Su(l, a, "", "", function(n) {
    return t.call(u, n, e++);
  }), a;
}
function cv(l) {
  if (l._status === -1) {
    var t = l._result;
    t = t(), t.then(
      function(u) {
        (l._status === 0 || l._status === -1) && (l._status = 1, l._result = u);
      },
      function(u) {
        (l._status === 0 || l._status === -1) && (l._status = 2, l._result = u);
      }
    ), l._status === -1 && (l._status = 0, l._result = t);
  }
  if (l._status === 1) return l._result.default;
  throw l._result;
}
var zi = typeof reportError == "function" ? reportError : function(l) {
  if (typeof window == "object" && typeof window.ErrorEvent == "function") {
    var t = new window.ErrorEvent("error", {
      bubbles: !0,
      cancelable: !0,
      message: typeof l == "object" && l !== null && typeof l.message == "string" ? String(l.message) : String(l),
      error: l
    });
    if (!window.dispatchEvent(t)) return;
  } else if (typeof Qn == "object" && typeof Qn.emit == "function") {
    Qn.emit("uncaughtException", l);
    return;
  }
  console.error(l);
};
function iv() {
}
N.Children = {
  map: ye,
  forEach: function(l, t, u) {
    ye(
      l,
      function() {
        t.apply(this, arguments);
      },
      u
    );
  },
  count: function(l) {
    var t = 0;
    return ye(l, function() {
      t++;
    }), t;
  },
  toArray: function(l) {
    return ye(l, function(t) {
      return t;
    }) || [];
  },
  only: function(l) {
    if (!zc(l))
      throw Error(
        "React.Children.only expected to receive a single React element child."
      );
    return l;
  }
};
N.Component = la;
N.Fragment = Wo;
N.Profiler = Fo;
N.PureComponent = Ec;
N.StrictMode = ko;
N.Suspense = tv;
N.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = k;
N.__COMPILER_RUNTIME = {
  __proto__: null,
  c: function(l) {
    return k.H.useMemoCache(l);
  }
};
N.cache = function(l) {
  return function() {
    return l.apply(null, arguments);
  };
};
N.cloneElement = function(l, t, u) {
  if (l == null)
    throw Error(
      "The argument must be a React element, but you passed " + l + "."
    );
  var a = ks({}, l.props), e = l.key, n = void 0;
  if (t != null)
    for (f in t.ref !== void 0 && (n = void 0), t.key !== void 0 && (e = "" + t.key), t)
      !Ps.call(t, f) || f === "key" || f === "__self" || f === "__source" || f === "ref" && t.ref === void 0 || (a[f] = t[f]);
  var f = arguments.length - 2;
  if (f === 1) a.children = u;
  else if (1 < f) {
    for (var c = Array(f), i = 0; i < f; i++)
      c[i] = arguments[i + 2];
    a.children = c;
  }
  return Ac(l.type, e, void 0, void 0, n, a);
};
N.createContext = function(l) {
  return l = {
    $$typeof: Po,
    _currentValue: l,
    _currentValue2: l,
    _threadCount: 0,
    Provider: null,
    Consumer: null
  }, l.Provider = l, l.Consumer = {
    $$typeof: Io,
    _context: l
  }, l;
};
N.createElement = function(l, t, u) {
  var a, e = {}, n = null;
  if (t != null)
    for (a in t.key !== void 0 && (n = "" + t.key), t)
      Ps.call(t, a) && a !== "key" && a !== "__self" && a !== "__source" && (e[a] = t[a]);
  var f = arguments.length - 2;
  if (f === 1) e.children = u;
  else if (1 < f) {
    for (var c = Array(f), i = 0; i < f; i++)
      c[i] = arguments[i + 2];
    e.children = c;
  }
  if (l && l.defaultProps)
    for (a in f = l.defaultProps, f)
      e[a] === void 0 && (e[a] = f[a]);
  return Ac(l, n, void 0, void 0, null, e);
};
N.createRef = function() {
  return { current: null };
};
N.forwardRef = function(l) {
  return { $$typeof: lv, render: l };
};
N.isValidElement = zc;
N.lazy = function(l) {
  return {
    $$typeof: $s,
    _payload: { _status: -1, _result: l },
    _init: cv
  };
};
N.memo = function(l, t) {
  return {
    $$typeof: uv,
    type: l,
    compare: t === void 0 ? null : t
  };
};
N.startTransition = function(l) {
  var t = k.T, u = {};
  k.T = u;
  try {
    var a = l(), e = k.S;
    e !== null && e(u, a), typeof a == "object" && a !== null && typeof a.then == "function" && a.then(iv, zi);
  } catch (n) {
    zi(n);
  } finally {
    k.T = t;
  }
};
N.unstable_useCacheRefresh = function() {
  return k.H.useCacheRefresh();
};
N.use = function(l) {
  return k.H.use(l);
};
N.useActionState = function(l, t, u) {
  return k.H.useActionState(l, t, u);
};
N.useCallback = function(l, t) {
  return k.H.useCallback(l, t);
};
N.useContext = function(l) {
  return k.H.useContext(l);
};
N.useDebugValue = function() {
};
N.useDeferredValue = function(l, t) {
  return k.H.useDeferredValue(l, t);
};
N.useEffect = function(l, t, u) {
  var a = k.H;
  if (typeof u == "function")
    throw Error(
      "useEffect CRUD overload is not enabled in this build of React."
    );
  return a.useEffect(l, t);
};
N.useId = function() {
  return k.H.useId();
};
N.useImperativeHandle = function(l, t, u) {
  return k.H.useImperativeHandle(l, t, u);
};
N.useInsertionEffect = function(l, t) {
  return k.H.useInsertionEffect(l, t);
};
N.useLayoutEffect = function(l, t) {
  return k.H.useLayoutEffect(l, t);
};
N.useMemo = function(l, t) {
  return k.H.useMemo(l, t);
};
N.useOptimistic = function(l, t) {
  return k.H.useOptimistic(l, t);
};
N.useReducer = function(l, t, u) {
  return k.H.useReducer(l, t, u);
};
N.useRef = function(l) {
  return k.H.useRef(l);
};
N.useState = function(l) {
  return k.H.useState(l);
};
N.useSyncExternalStore = function(l, t, u) {
  return k.H.useSyncExternalStore(
    l,
    t,
    u
  );
};
N.useTransition = function() {
  return k.H.useTransition();
};
N.version = "19.1.1";
ws.exports = N;
var Sl = ws.exports, ld = { exports: {} }, En = {}, td = { exports: {} }, ud = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(l) {
  function t(E, D) {
    var R = E.length;
    E.push(D);
    l: for (; 0 < R; ) {
      var tl = R - 1 >>> 1, sl = E[tl];
      if (0 < e(sl, D))
        E[tl] = D, E[R] = sl, R = tl;
      else break l;
    }
  }
  function u(E) {
    return E.length === 0 ? null : E[0];
  }
  function a(E) {
    if (E.length === 0) return null;
    var D = E[0], R = E.pop();
    if (R !== D) {
      E[0] = R;
      l: for (var tl = 0, sl = E.length, de = sl >>> 1; tl < de; ) {
        var oe = 2 * (tl + 1) - 1, Xn = E[oe], Wt = oe + 1, ve = E[Wt];
        if (0 > e(Xn, R))
          Wt < sl && 0 > e(ve, Xn) ? (E[tl] = ve, E[Wt] = R, tl = Wt) : (E[tl] = Xn, E[oe] = R, tl = oe);
        else if (Wt < sl && 0 > e(ve, R))
          E[tl] = ve, E[Wt] = R, tl = Wt;
        else break l;
      }
    }
    return D;
  }
  function e(E, D) {
    var R = E.sortIndex - D.sortIndex;
    return R !== 0 ? R : E.id - D.id;
  }
  if (l.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
    var n = performance;
    l.unstable_now = function() {
      return n.now();
    };
  } else {
    var f = Date, c = f.now();
    l.unstable_now = function() {
      return f.now() - c;
    };
  }
  var i = [], o = [], m = 1, r = null, v = 3, h = !1, O = !1, z = !1, B = !1, d = typeof setTimeout == "function" ? setTimeout : null, s = typeof clearTimeout == "function" ? clearTimeout : null, y = typeof setImmediate < "u" ? setImmediate : null;
  function g(E) {
    for (var D = u(o); D !== null; ) {
      if (D.callback === null) a(o);
      else if (D.startTime <= E)
        a(o), D.sortIndex = D.expirationTime, t(i, D);
      else break;
      D = u(o);
    }
  }
  function T(E) {
    if (z = !1, g(E), !O)
      if (u(i) !== null)
        O = !0, U || (U = !0, L());
      else {
        var D = u(o);
        D !== null && nt(T, D.startTime - E);
      }
  }
  var U = !1, A = -1, M = 5, b = -1;
  function _() {
    return B ? !0 : !(l.unstable_now() - b < M);
  }
  function q() {
    if (B = !1, U) {
      var E = l.unstable_now();
      b = E;
      var D = !0;
      try {
        l: {
          O = !1, z && (z = !1, s(A), A = -1), h = !0;
          var R = v;
          try {
            t: {
              for (g(E), r = u(i); r !== null && !(r.expirationTime > E && _()); ) {
                var tl = r.callback;
                if (typeof tl == "function") {
                  r.callback = null, v = r.priorityLevel;
                  var sl = tl(
                    r.expirationTime <= E
                  );
                  if (E = l.unstable_now(), typeof sl == "function") {
                    r.callback = sl, g(E), D = !0;
                    break t;
                  }
                  r === u(i) && a(i), g(E);
                } else a(i);
                r = u(i);
              }
              if (r !== null) D = !0;
              else {
                var de = u(o);
                de !== null && nt(
                  T,
                  de.startTime - E
                ), D = !1;
              }
            }
            break l;
          } finally {
            r = null, v = R, h = !1;
          }
          D = void 0;
        }
      } finally {
        D ? L() : U = !1;
      }
    }
  }
  var L;
  if (typeof y == "function")
    L = function() {
      y(q);
    };
  else if (typeof MessageChannel < "u") {
    var hl = new MessageChannel(), $t = hl.port2;
    hl.port1.onmessage = q, L = function() {
      $t.postMessage(null);
    };
  } else
    L = function() {
      d(q, 0);
    };
  function nt(E, D) {
    A = d(function() {
      E(l.unstable_now());
    }, D);
  }
  l.unstable_IdlePriority = 5, l.unstable_ImmediatePriority = 1, l.unstable_LowPriority = 4, l.unstable_NormalPriority = 3, l.unstable_Profiling = null, l.unstable_UserBlockingPriority = 2, l.unstable_cancelCallback = function(E) {
    E.callback = null;
  }, l.unstable_forceFrameRate = function(E) {
    0 > E || 125 < E ? console.error(
      "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
    ) : M = 0 < E ? Math.floor(1e3 / E) : 5;
  }, l.unstable_getCurrentPriorityLevel = function() {
    return v;
  }, l.unstable_next = function(E) {
    switch (v) {
      case 1:
      case 2:
      case 3:
        var D = 3;
        break;
      default:
        D = v;
    }
    var R = v;
    v = D;
    try {
      return E();
    } finally {
      v = R;
    }
  }, l.unstable_requestPaint = function() {
    B = !0;
  }, l.unstable_runWithPriority = function(E, D) {
    switch (E) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        E = 3;
    }
    var R = v;
    v = E;
    try {
      return D();
    } finally {
      v = R;
    }
  }, l.unstable_scheduleCallback = function(E, D, R) {
    var tl = l.unstable_now();
    switch (typeof R == "object" && R !== null ? (R = R.delay, R = typeof R == "number" && 0 < R ? tl + R : tl) : R = tl, E) {
      case 1:
        var sl = -1;
        break;
      case 2:
        sl = 250;
        break;
      case 5:
        sl = 1073741823;
        break;
      case 4:
        sl = 1e4;
        break;
      default:
        sl = 5e3;
    }
    return sl = R + sl, E = {
      id: m++,
      callback: D,
      priorityLevel: E,
      startTime: R,
      expirationTime: sl,
      sortIndex: -1
    }, R > tl ? (E.sortIndex = R, t(o, E), u(i) === null && E === u(o) && (z ? (s(A), A = -1) : z = !0, nt(T, R - tl))) : (E.sortIndex = sl, t(i, E), O || h || (O = !0, U || (U = !0, L()))), E;
  }, l.unstable_shouldYield = _, l.unstable_wrapCallback = function(E) {
    var D = v;
    return function() {
      var R = v;
      v = D;
      try {
        return E.apply(this, arguments);
      } finally {
        v = R;
      }
    };
  };
})(ud);
td.exports = ud;
var sv = td.exports, ad = { exports: {} }, zl = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var dv = Sl;
function ed(l) {
  var t = "https://react.dev/errors/" + l;
  if (1 < arguments.length) {
    t += "?args[]=" + encodeURIComponent(arguments[1]);
    for (var u = 2; u < arguments.length; u++)
      t += "&args[]=" + encodeURIComponent(arguments[u]);
  }
  return "Minified React error #" + l + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
function At() {
}
var Al = {
  d: {
    f: At,
    r: function() {
      throw Error(ed(522));
    },
    D: At,
    C: At,
    L: At,
    m: At,
    X: At,
    S: At,
    M: At
  },
  p: 0,
  findDOMNode: null
}, ov = Symbol.for("react.portal");
function vv(l, t, u) {
  var a = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: ov,
    key: a == null ? null : "" + a,
    children: l,
    containerInfo: t,
    implementation: u
  };
}
var ba = dv.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
function Tn(l, t) {
  if (l === "font") return "";
  if (typeof t == "string")
    return t === "use-credentials" ? t : "";
}
zl.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Al;
zl.createPortal = function(l, t) {
  var u = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11)
    throw Error(ed(299));
  return vv(l, t, null, u);
};
zl.flushSync = function(l) {
  var t = ba.T, u = Al.p;
  try {
    if (ba.T = null, Al.p = 2, l) return l();
  } finally {
    ba.T = t, Al.p = u, Al.d.f();
  }
};
zl.preconnect = function(l, t) {
  typeof l == "string" && (t ? (t = t.crossOrigin, t = typeof t == "string" ? t === "use-credentials" ? t : "" : void 0) : t = null, Al.d.C(l, t));
};
zl.prefetchDNS = function(l) {
  typeof l == "string" && Al.d.D(l);
};
zl.preinit = function(l, t) {
  if (typeof l == "string" && t && typeof t.as == "string") {
    var u = t.as, a = Tn(u, t.crossOrigin), e = typeof t.integrity == "string" ? t.integrity : void 0, n = typeof t.fetchPriority == "string" ? t.fetchPriority : void 0;
    u === "style" ? Al.d.S(
      l,
      typeof t.precedence == "string" ? t.precedence : void 0,
      {
        crossOrigin: a,
        integrity: e,
        fetchPriority: n
      }
    ) : u === "script" && Al.d.X(l, {
      crossOrigin: a,
      integrity: e,
      fetchPriority: n,
      nonce: typeof t.nonce == "string" ? t.nonce : void 0
    });
  }
};
zl.preinitModule = function(l, t) {
  if (typeof l == "string")
    if (typeof t == "object" && t !== null) {
      if (t.as == null || t.as === "script") {
        var u = Tn(
          t.as,
          t.crossOrigin
        );
        Al.d.M(l, {
          crossOrigin: u,
          integrity: typeof t.integrity == "string" ? t.integrity : void 0,
          nonce: typeof t.nonce == "string" ? t.nonce : void 0
        });
      }
    } else t == null && Al.d.M(l);
};
zl.preload = function(l, t) {
  if (typeof l == "string" && typeof t == "object" && t !== null && typeof t.as == "string") {
    var u = t.as, a = Tn(u, t.crossOrigin);
    Al.d.L(l, u, {
      crossOrigin: a,
      integrity: typeof t.integrity == "string" ? t.integrity : void 0,
      nonce: typeof t.nonce == "string" ? t.nonce : void 0,
      type: typeof t.type == "string" ? t.type : void 0,
      fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0,
      referrerPolicy: typeof t.referrerPolicy == "string" ? t.referrerPolicy : void 0,
      imageSrcSet: typeof t.imageSrcSet == "string" ? t.imageSrcSet : void 0,
      imageSizes: typeof t.imageSizes == "string" ? t.imageSizes : void 0,
      media: typeof t.media == "string" ? t.media : void 0
    });
  }
};
zl.preloadModule = function(l, t) {
  if (typeof l == "string")
    if (t) {
      var u = Tn(t.as, t.crossOrigin);
      Al.d.m(l, {
        as: typeof t.as == "string" && t.as !== "script" ? t.as : void 0,
        crossOrigin: u,
        integrity: typeof t.integrity == "string" ? t.integrity : void 0
      });
    } else Al.d.m(l);
};
zl.requestFormReset = function(l) {
  Al.d.r(l);
};
zl.unstable_batchedUpdates = function(l, t) {
  return l(t);
};
zl.useFormState = function(l, t, u) {
  return ba.H.useFormState(l, t, u);
};
zl.useFormStatus = function() {
  return ba.H.useHostTransitionStatus();
};
zl.version = "19.1.1";
function nd() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(nd);
    } catch (l) {
      console.error(l);
    }
}
nd(), ad.exports = zl;
var yv = ad.exports, Cn = {};
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var il = sv, fd = Sl, hv = yv;
function S(l) {
  var t = "https://react.dev/errors/" + l;
  if (1 < arguments.length) {
    t += "?args[]=" + encodeURIComponent(arguments[1]);
    for (var u = 2; u < arguments.length; u++)
      t += "&args[]=" + encodeURIComponent(arguments[u]);
  }
  return "Minified React error #" + l + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
function cd(l) {
  return !(!l || l.nodeType !== 1 && l.nodeType !== 9 && l.nodeType !== 11);
}
function $a(l) {
  var t = l, u = l;
  if (l.alternate) for (; t.return; ) t = t.return;
  else {
    l = t;
    do
      t = l, t.flags & 4098 && (u = t.return), l = t.return;
    while (l);
  }
  return t.tag === 3 ? u : null;
}
function id(l) {
  if (l.tag === 13) {
    var t = l.memoizedState;
    if (t === null && (l = l.alternate, l !== null && (t = l.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function _i(l) {
  if ($a(l) !== l)
    throw Error(S(188));
}
function rv(l) {
  var t = l.alternate;
  if (!t) {
    if (t = $a(l), t === null) throw Error(S(188));
    return t !== l ? null : l;
  }
  for (var u = l, a = t; ; ) {
    var e = u.return;
    if (e === null) break;
    var n = e.alternate;
    if (n === null) {
      if (a = e.return, a !== null) {
        u = a;
        continue;
      }
      break;
    }
    if (e.child === n.child) {
      for (n = e.child; n; ) {
        if (n === u) return _i(e), l;
        if (n === a) return _i(e), t;
        n = n.sibling;
      }
      throw Error(S(188));
    }
    if (u.return !== a.return) u = e, a = n;
    else {
      for (var f = !1, c = e.child; c; ) {
        if (c === u) {
          f = !0, u = e, a = n;
          break;
        }
        if (c === a) {
          f = !0, a = e, u = n;
          break;
        }
        c = c.sibling;
      }
      if (!f) {
        for (c = n.child; c; ) {
          if (c === u) {
            f = !0, u = n, a = e;
            break;
          }
          if (c === a) {
            f = !0, a = n, u = e;
            break;
          }
          c = c.sibling;
        }
        if (!f) throw Error(S(189));
      }
    }
    if (u.alternate !== a) throw Error(S(190));
  }
  if (u.tag !== 3) throw Error(S(188));
  return u.stateNode.current === u ? l : t;
}
function sd(l) {
  var t = l.tag;
  if (t === 5 || t === 26 || t === 27 || t === 6) return l;
  for (l = l.child; l !== null; ) {
    if (t = sd(l), t !== null) return t;
    l = l.sibling;
  }
  return null;
}
var $ = Object.assign, mv = Symbol.for("react.element"), he = Symbol.for("react.transitional.element"), ra = Symbol.for("react.portal"), Au = Symbol.for("react.fragment"), dd = Symbol.for("react.strict_mode"), zf = Symbol.for("react.profiler"), gv = Symbol.for("react.provider"), od = Symbol.for("react.consumer"), dt = Symbol.for("react.context"), _c = Symbol.for("react.forward_ref"), _f = Symbol.for("react.suspense"), Of = Symbol.for("react.suspense_list"), Oc = Symbol.for("react.memo"), Ot = Symbol.for("react.lazy"), Mf = Symbol.for("react.activity"), Sv = Symbol.for("react.memo_cache_sentinel"), Oi = Symbol.iterator;
function ca(l) {
  return l === null || typeof l != "object" ? null : (l = Oi && l[Oi] || l["@@iterator"], typeof l == "function" ? l : null);
}
var bv = Symbol.for("react.client.reference");
function Df(l) {
  if (l == null) return null;
  if (typeof l == "function")
    return l.$$typeof === bv ? null : l.displayName || l.name || null;
  if (typeof l == "string") return l;
  switch (l) {
    case Au:
      return "Fragment";
    case zf:
      return "Profiler";
    case dd:
      return "StrictMode";
    case _f:
      return "Suspense";
    case Of:
      return "SuspenseList";
    case Mf:
      return "Activity";
  }
  if (typeof l == "object")
    switch (l.$$typeof) {
      case ra:
        return "Portal";
      case dt:
        return (l.displayName || "Context") + ".Provider";
      case od:
        return (l._context.displayName || "Context") + ".Consumer";
      case _c:
        var t = l.render;
        return l = l.displayName, l || (l = t.displayName || t.name || "", l = l !== "" ? "ForwardRef(" + l + ")" : "ForwardRef"), l;
      case Oc:
        return t = l.displayName || null, t !== null ? t : Df(l.type) || "Memo";
      case Ot:
        t = l._payload, l = l._init;
        try {
          return Df(l(t));
        } catch {
        }
    }
  return null;
}
var ma = Array.isArray, p = fd.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Q = hv.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, tu = {
  pending: !1,
  data: null,
  method: null,
  action: null
}, pf = [], zu = -1;
function at(l) {
  return { current: l };
}
function yl(l) {
  0 > zu || (l.current = pf[zu], pf[zu] = null, zu--);
}
function F(l, t) {
  zu++, pf[zu] = l.current, l.current = t;
}
var lt = at(null), Ya = at(null), Bt = at(null), Ce = at(null);
function Ze(l, t) {
  switch (F(Bt, t), F(Ya, l), F(lt, null), t.nodeType) {
    case 9:
    case 11:
      l = (l = t.documentElement) && (l = l.namespaceURI) ? Rs(l) : 0;
      break;
    default:
      if (l = t.tagName, t = t.namespaceURI)
        t = Rs(t), l = Uo(t, l);
      else
        switch (l) {
          case "svg":
            l = 1;
            break;
          case "math":
            l = 2;
            break;
          default:
            l = 0;
        }
  }
  yl(lt), F(lt, l);
}
function Zu() {
  yl(lt), yl(Ya), yl(Bt);
}
function Uf(l) {
  l.memoizedState !== null && F(Ce, l);
  var t = lt.current, u = Uo(t, l.type);
  t !== u && (F(Ya, l), F(lt, u));
}
function Ve(l) {
  Ya.current === l && (yl(lt), yl(Ya)), Ce.current === l && (yl(Ce), Ka._currentValue = tu);
}
var Rf = Object.prototype.hasOwnProperty, Mc = il.unstable_scheduleCallback, Zn = il.unstable_cancelCallback, Ev = il.unstable_shouldYield, Tv = il.unstable_requestPaint, tt = il.unstable_now, Av = il.unstable_getCurrentPriorityLevel, vd = il.unstable_ImmediatePriority, yd = il.unstable_UserBlockingPriority, Ke = il.unstable_NormalPriority, zv = il.unstable_LowPriority, hd = il.unstable_IdlePriority, _v = il.log, Ov = il.unstable_setDisableYieldValue, Wa = null, xl = null;
function Nt(l) {
  if (typeof _v == "function" && Ov(l), xl && typeof xl.setStrictMode == "function")
    try {
      xl.setStrictMode(Wa, l);
    } catch {
    }
}
var Yl = Math.clz32 ? Math.clz32 : pv, Mv = Math.log, Dv = Math.LN2;
function pv(l) {
  return l >>>= 0, l === 0 ? 32 : 31 - (Mv(l) / Dv | 0) | 0;
}
var re = 256, me = 4194304;
function It(l) {
  var t = l & 42;
  if (t !== 0) return t;
  switch (l & -l) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
      return 64;
    case 128:
      return 128;
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return l & 4194048;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
      return l & 62914560;
    case 67108864:
      return 67108864;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 0;
    default:
      return l;
  }
}
function An(l, t, u) {
  var a = l.pendingLanes;
  if (a === 0) return 0;
  var e = 0, n = l.suspendedLanes, f = l.pingedLanes;
  l = l.warmLanes;
  var c = a & 134217727;
  return c !== 0 ? (a = c & ~n, a !== 0 ? e = It(a) : (f &= c, f !== 0 ? e = It(f) : u || (u = c & ~l, u !== 0 && (e = It(u))))) : (c = a & ~n, c !== 0 ? e = It(c) : f !== 0 ? e = It(f) : u || (u = a & ~l, u !== 0 && (e = It(u)))), e === 0 ? 0 : t !== 0 && t !== e && !(t & n) && (n = e & -e, u = t & -t, n >= u || n === 32 && (u & 4194048) !== 0) ? t : e;
}
function ka(l, t) {
  return (l.pendingLanes & ~(l.suspendedLanes & ~l.pingedLanes) & t) === 0;
}
function Uv(l, t) {
  switch (l) {
    case 1:
    case 2:
    case 4:
    case 8:
    case 64:
      return t + 250;
    case 16:
    case 32:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
      return -1;
    case 67108864:
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function rd() {
  var l = re;
  return re <<= 1, !(re & 4194048) && (re = 256), l;
}
function md() {
  var l = me;
  return me <<= 1, !(me & 62914560) && (me = 4194304), l;
}
function Vn(l) {
  for (var t = [], u = 0; 31 > u; u++) t.push(l);
  return t;
}
function Fa(l, t) {
  l.pendingLanes |= t, t !== 268435456 && (l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0);
}
function Rv(l, t, u, a, e, n) {
  var f = l.pendingLanes;
  l.pendingLanes = u, l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0, l.expiredLanes &= u, l.entangledLanes &= u, l.errorRecoveryDisabledLanes &= u, l.shellSuspendCounter = 0;
  var c = l.entanglements, i = l.expirationTimes, o = l.hiddenUpdates;
  for (u = f & ~u; 0 < u; ) {
    var m = 31 - Yl(u), r = 1 << m;
    c[m] = 0, i[m] = -1;
    var v = o[m];
    if (v !== null)
      for (o[m] = null, m = 0; m < v.length; m++) {
        var h = v[m];
        h !== null && (h.lane &= -536870913);
      }
    u &= ~r;
  }
  a !== 0 && gd(l, a, 0), n !== 0 && e === 0 && l.tag !== 0 && (l.suspendedLanes |= n & ~(f & ~t));
}
function gd(l, t, u) {
  l.pendingLanes |= t, l.suspendedLanes &= ~t;
  var a = 31 - Yl(t);
  l.entangledLanes |= t, l.entanglements[a] = l.entanglements[a] | 1073741824 | u & 4194090;
}
function Sd(l, t) {
  var u = l.entangledLanes |= t;
  for (l = l.entanglements; u; ) {
    var a = 31 - Yl(u), e = 1 << a;
    e & t | l[a] & t && (l[a] |= t), u &= ~e;
  }
}
function Dc(l) {
  switch (l) {
    case 2:
      l = 1;
      break;
    case 8:
      l = 4;
      break;
    case 32:
      l = 16;
      break;
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
      l = 128;
      break;
    case 268435456:
      l = 134217728;
      break;
    default:
      l = 0;
  }
  return l;
}
function pc(l) {
  return l &= -l, 2 < l ? 8 < l ? l & 134217727 ? 32 : 268435456 : 8 : 2;
}
function bd() {
  var l = Q.p;
  return l !== 0 ? l : (l = window.event, l === void 0 ? 32 : Qo(l.type));
}
function Nv(l, t) {
  var u = Q.p;
  try {
    return Q.p = l, t();
  } finally {
    Q.p = u;
  }
}
var Jt = Math.random().toString(36).slice(2), bl = "__reactFiber$" + Jt, Dl = "__reactProps$" + Jt, ta = "__reactContainer$" + Jt, Nf = "__reactEvents$" + Jt, Hv = "__reactListeners$" + Jt, xv = "__reactHandles$" + Jt, Mi = "__reactResources$" + Jt, Ia = "__reactMarker$" + Jt;
function Uc(l) {
  delete l[bl], delete l[Dl], delete l[Nf], delete l[Hv], delete l[xv];
}
function _u(l) {
  var t = l[bl];
  if (t) return t;
  for (var u = l.parentNode; u; ) {
    if (t = u[ta] || u[bl]) {
      if (u = t.alternate, t.child !== null || u !== null && u.child !== null)
        for (l = xs(l); l !== null; ) {
          if (u = l[bl]) return u;
          l = xs(l);
        }
      return t;
    }
    l = u, u = l.parentNode;
  }
  return null;
}
function ua(l) {
  if (l = l[bl] || l[ta]) {
    var t = l.tag;
    if (t === 5 || t === 6 || t === 13 || t === 26 || t === 27 || t === 3)
      return l;
  }
  return null;
}
function ga(l) {
  var t = l.tag;
  if (t === 5 || t === 26 || t === 27 || t === 6) return l.stateNode;
  throw Error(S(33));
}
function Yu(l) {
  var t = l[Mi];
  return t || (t = l[Mi] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
}
function ol(l) {
  l[Ia] = !0;
}
var Ed = /* @__PURE__ */ new Set(), Td = {};
function vu(l, t) {
  Vu(l, t), Vu(l + "Capture", t);
}
function Vu(l, t) {
  for (Td[l] = t, l = 0; l < t.length; l++)
    Ed.add(t[l]);
}
var Yv = RegExp(
  "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
), Di = {}, pi = {};
function Bv(l) {
  return Rf.call(pi, l) ? !0 : Rf.call(Di, l) ? !1 : Yv.test(l) ? pi[l] = !0 : (Di[l] = !0, !1);
}
function pe(l, t, u) {
  if (Bv(t))
    if (u === null) l.removeAttribute(t);
    else {
      switch (typeof u) {
        case "undefined":
        case "function":
        case "symbol":
          l.removeAttribute(t);
          return;
        case "boolean":
          var a = t.toLowerCase().slice(0, 5);
          if (a !== "data-" && a !== "aria-") {
            l.removeAttribute(t);
            return;
          }
      }
      l.setAttribute(t, "" + u);
    }
}
function ge(l, t, u) {
  if (u === null) l.removeAttribute(t);
  else {
    switch (typeof u) {
      case "undefined":
      case "function":
      case "symbol":
      case "boolean":
        l.removeAttribute(t);
        return;
    }
    l.setAttribute(t, "" + u);
  }
}
function ft(l, t, u, a) {
  if (a === null) l.removeAttribute(u);
  else {
    switch (typeof a) {
      case "undefined":
      case "function":
      case "symbol":
      case "boolean":
        l.removeAttribute(u);
        return;
    }
    l.setAttributeNS(t, u, "" + a);
  }
}
var Kn, Ui;
function bu(l) {
  if (Kn === void 0)
    try {
      throw Error();
    } catch (u) {
      var t = u.stack.trim().match(/\n( *(at )?)/);
      Kn = t && t[1] || "", Ui = -1 < u.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < u.stack.indexOf("@") ? "@unknown:0:0" : "";
    }
  return `
` + Kn + l + Ui;
}
var Ln = !1;
function Jn(l, t) {
  if (!l || Ln) return "";
  Ln = !0;
  var u = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    var a = {
      DetermineComponentFrameRoot: function() {
        try {
          if (t) {
            var r = function() {
              throw Error();
            };
            if (Object.defineProperty(r.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(r, []);
              } catch (h) {
                var v = h;
              }
              Reflect.construct(l, [], r);
            } else {
              try {
                r.call();
              } catch (h) {
                v = h;
              }
              l.call(r.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (h) {
              v = h;
            }
            (r = l()) && typeof r.catch == "function" && r.catch(function() {
            });
          }
        } catch (h) {
          if (h && v && typeof h.stack == "string")
            return [h.stack, v.stack];
        }
        return [null, null];
      }
    };
    a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
    var e = Object.getOwnPropertyDescriptor(
      a.DetermineComponentFrameRoot,
      "name"
    );
    e && e.configurable && Object.defineProperty(
      a.DetermineComponentFrameRoot,
      "name",
      { value: "DetermineComponentFrameRoot" }
    );
    var n = a.DetermineComponentFrameRoot(), f = n[0], c = n[1];
    if (f && c) {
      var i = f.split(`
`), o = c.split(`
`);
      for (e = a = 0; a < i.length && !i[a].includes("DetermineComponentFrameRoot"); )
        a++;
      for (; e < o.length && !o[e].includes(
        "DetermineComponentFrameRoot"
      ); )
        e++;
      if (a === i.length || e === o.length)
        for (a = i.length - 1, e = o.length - 1; 1 <= a && 0 <= e && i[a] !== o[e]; )
          e--;
      for (; 1 <= a && 0 <= e; a--, e--)
        if (i[a] !== o[e]) {
          if (a !== 1 || e !== 1)
            do
              if (a--, e--, 0 > e || i[a] !== o[e]) {
                var m = `
` + i[a].replace(" at new ", " at ");
                return l.displayName && m.includes("<anonymous>") && (m = m.replace("<anonymous>", l.displayName)), m;
              }
            while (1 <= a && 0 <= e);
          break;
        }
    }
  } finally {
    Ln = !1, Error.prepareStackTrace = u;
  }
  return (u = l ? l.displayName || l.name : "") ? bu(u) : "";
}
function qv(l) {
  switch (l.tag) {
    case 26:
    case 27:
    case 5:
      return bu(l.type);
    case 16:
      return bu("Lazy");
    case 13:
      return bu("Suspense");
    case 19:
      return bu("SuspenseList");
    case 0:
    case 15:
      return Jn(l.type, !1);
    case 11:
      return Jn(l.type.render, !1);
    case 1:
      return Jn(l.type, !0);
    case 31:
      return bu("Activity");
    default:
      return "";
  }
}
function Ri(l) {
  try {
    var t = "";
    do
      t += qv(l), l = l.return;
    while (l);
    return t;
  } catch (u) {
    return `
Error generating stack: ` + u.message + `
` + u.stack;
  }
}
function jl(l) {
  switch (typeof l) {
    case "bigint":
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return l;
    case "object":
      return l;
    default:
      return "";
  }
}
function Ad(l) {
  var t = l.type;
  return (l = l.nodeName) && l.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function Gv(l) {
  var t = Ad(l) ? "checked" : "value", u = Object.getOwnPropertyDescriptor(
    l.constructor.prototype,
    t
  ), a = "" + l[t];
  if (!l.hasOwnProperty(t) && typeof u < "u" && typeof u.get == "function" && typeof u.set == "function") {
    var e = u.get, n = u.set;
    return Object.defineProperty(l, t, {
      configurable: !0,
      get: function() {
        return e.call(this);
      },
      set: function(f) {
        a = "" + f, n.call(this, f);
      }
    }), Object.defineProperty(l, t, {
      enumerable: u.enumerable
    }), {
      getValue: function() {
        return a;
      },
      setValue: function(f) {
        a = "" + f;
      },
      stopTracking: function() {
        l._valueTracker = null, delete l[t];
      }
    };
  }
}
function Le(l) {
  l._valueTracker || (l._valueTracker = Gv(l));
}
function zd(l) {
  if (!l) return !1;
  var t = l._valueTracker;
  if (!t) return !0;
  var u = t.getValue(), a = "";
  return l && (a = Ad(l) ? l.checked ? "true" : "false" : l.value), l = a, l !== u ? (t.setValue(l), !0) : !1;
}
function Je(l) {
  if (l = l || (typeof document < "u" ? document : void 0), typeof l > "u") return null;
  try {
    return l.activeElement || l.body;
  } catch {
    return l.body;
  }
}
var Xv = /[\n"\\]/g;
function Vl(l) {
  return l.replace(
    Xv,
    function(t) {
      return "\\" + t.charCodeAt(0).toString(16) + " ";
    }
  );
}
function Hf(l, t, u, a, e, n, f, c) {
  l.name = "", f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" ? l.type = f : l.removeAttribute("type"), t != null ? f === "number" ? (t === 0 && l.value === "" || l.value != t) && (l.value = "" + jl(t)) : l.value !== "" + jl(t) && (l.value = "" + jl(t)) : f !== "submit" && f !== "reset" || l.removeAttribute("value"), t != null ? xf(l, f, jl(t)) : u != null ? xf(l, f, jl(u)) : a != null && l.removeAttribute("value"), e == null && n != null && (l.defaultChecked = !!n), e != null && (l.checked = e && typeof e != "function" && typeof e != "symbol"), c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? l.name = "" + jl(c) : l.removeAttribute("name");
}
function _d(l, t, u, a, e, n, f, c) {
  if (n != null && typeof n != "function" && typeof n != "symbol" && typeof n != "boolean" && (l.type = n), t != null || u != null) {
    if (!(n !== "submit" && n !== "reset" || t != null))
      return;
    u = u != null ? "" + jl(u) : "", t = t != null ? "" + jl(t) : u, c || t === l.value || (l.value = t), l.defaultValue = t;
  }
  a = a ?? e, a = typeof a != "function" && typeof a != "symbol" && !!a, l.checked = c ? l.checked : !!a, l.defaultChecked = !!a, f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" && (l.name = f);
}
function xf(l, t, u) {
  t === "number" && Je(l.ownerDocument) === l || l.defaultValue === "" + u || (l.defaultValue = "" + u);
}
function Bu(l, t, u, a) {
  if (l = l.options, t) {
    t = {};
    for (var e = 0; e < u.length; e++)
      t["$" + u[e]] = !0;
    for (u = 0; u < l.length; u++)
      e = t.hasOwnProperty("$" + l[u].value), l[u].selected !== e && (l[u].selected = e), e && a && (l[u].defaultSelected = !0);
  } else {
    for (u = "" + jl(u), t = null, e = 0; e < l.length; e++) {
      if (l[e].value === u) {
        l[e].selected = !0, a && (l[e].defaultSelected = !0);
        return;
      }
      t !== null || l[e].disabled || (t = l[e]);
    }
    t !== null && (t.selected = !0);
  }
}
function Od(l, t, u) {
  if (t != null && (t = "" + jl(t), t !== l.value && (l.value = t), u == null)) {
    l.defaultValue !== t && (l.defaultValue = t);
    return;
  }
  l.defaultValue = u != null ? "" + jl(u) : "";
}
function Md(l, t, u, a) {
  if (t == null) {
    if (a != null) {
      if (u != null) throw Error(S(92));
      if (ma(a)) {
        if (1 < a.length) throw Error(S(93));
        a = a[0];
      }
      u = a;
    }
    u == null && (u = ""), t = u;
  }
  u = jl(t), l.defaultValue = u, a = l.textContent, a === u && a !== "" && a !== null && (l.value = a);
}
function Ku(l, t) {
  if (t) {
    var u = l.firstChild;
    if (u && u === l.lastChild && u.nodeType === 3) {
      u.nodeValue = t;
      return;
    }
  }
  l.textContent = t;
}
var Qv = new Set(
  "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
    " "
  )
);
function Ni(l, t, u) {
  var a = t.indexOf("--") === 0;
  u == null || typeof u == "boolean" || u === "" ? a ? l.setProperty(t, "") : t === "float" ? l.cssFloat = "" : l[t] = "" : a ? l.setProperty(t, u) : typeof u != "number" || u === 0 || Qv.has(t) ? t === "float" ? l.cssFloat = u : l[t] = ("" + u).trim() : l[t] = u + "px";
}
function Dd(l, t, u) {
  if (t != null && typeof t != "object")
    throw Error(S(62));
  if (l = l.style, u != null) {
    for (var a in u)
      !u.hasOwnProperty(a) || t != null && t.hasOwnProperty(a) || (a.indexOf("--") === 0 ? l.setProperty(a, "") : a === "float" ? l.cssFloat = "" : l[a] = "");
    for (var e in t)
      a = t[e], t.hasOwnProperty(e) && u[e] !== a && Ni(l, e, a);
  } else
    for (var n in t)
      t.hasOwnProperty(n) && Ni(l, n, t[n]);
}
function Rc(l) {
  if (l.indexOf("-") === -1) return !1;
  switch (l) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var jv = /* @__PURE__ */ new Map([
  ["acceptCharset", "accept-charset"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
  ["crossOrigin", "crossorigin"],
  ["accentHeight", "accent-height"],
  ["alignmentBaseline", "alignment-baseline"],
  ["arabicForm", "arabic-form"],
  ["baselineShift", "baseline-shift"],
  ["capHeight", "cap-height"],
  ["clipPath", "clip-path"],
  ["clipRule", "clip-rule"],
  ["colorInterpolation", "color-interpolation"],
  ["colorInterpolationFilters", "color-interpolation-filters"],
  ["colorProfile", "color-profile"],
  ["colorRendering", "color-rendering"],
  ["dominantBaseline", "dominant-baseline"],
  ["enableBackground", "enable-background"],
  ["fillOpacity", "fill-opacity"],
  ["fillRule", "fill-rule"],
  ["floodColor", "flood-color"],
  ["floodOpacity", "flood-opacity"],
  ["fontFamily", "font-family"],
  ["fontSize", "font-size"],
  ["fontSizeAdjust", "font-size-adjust"],
  ["fontStretch", "font-stretch"],
  ["fontStyle", "font-style"],
  ["fontVariant", "font-variant"],
  ["fontWeight", "font-weight"],
  ["glyphName", "glyph-name"],
  ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
  ["glyphOrientationVertical", "glyph-orientation-vertical"],
  ["horizAdvX", "horiz-adv-x"],
  ["horizOriginX", "horiz-origin-x"],
  ["imageRendering", "image-rendering"],
  ["letterSpacing", "letter-spacing"],
  ["lightingColor", "lighting-color"],
  ["markerEnd", "marker-end"],
  ["markerMid", "marker-mid"],
  ["markerStart", "marker-start"],
  ["overlinePosition", "overline-position"],
  ["overlineThickness", "overline-thickness"],
  ["paintOrder", "paint-order"],
  ["panose-1", "panose-1"],
  ["pointerEvents", "pointer-events"],
  ["renderingIntent", "rendering-intent"],
  ["shapeRendering", "shape-rendering"],
  ["stopColor", "stop-color"],
  ["stopOpacity", "stop-opacity"],
  ["strikethroughPosition", "strikethrough-position"],
  ["strikethroughThickness", "strikethrough-thickness"],
  ["strokeDasharray", "stroke-dasharray"],
  ["strokeDashoffset", "stroke-dashoffset"],
  ["strokeLinecap", "stroke-linecap"],
  ["strokeLinejoin", "stroke-linejoin"],
  ["strokeMiterlimit", "stroke-miterlimit"],
  ["strokeOpacity", "stroke-opacity"],
  ["strokeWidth", "stroke-width"],
  ["textAnchor", "text-anchor"],
  ["textDecoration", "text-decoration"],
  ["textRendering", "text-rendering"],
  ["transformOrigin", "transform-origin"],
  ["underlinePosition", "underline-position"],
  ["underlineThickness", "underline-thickness"],
  ["unicodeBidi", "unicode-bidi"],
  ["unicodeRange", "unicode-range"],
  ["unitsPerEm", "units-per-em"],
  ["vAlphabetic", "v-alphabetic"],
  ["vHanging", "v-hanging"],
  ["vIdeographic", "v-ideographic"],
  ["vMathematical", "v-mathematical"],
  ["vectorEffect", "vector-effect"],
  ["vertAdvY", "vert-adv-y"],
  ["vertOriginX", "vert-origin-x"],
  ["vertOriginY", "vert-origin-y"],
  ["wordSpacing", "word-spacing"],
  ["writingMode", "writing-mode"],
  ["xmlnsXlink", "xmlns:xlink"],
  ["xHeight", "x-height"]
]), Cv = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
function Ue(l) {
  return Cv.test("" + l) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : l;
}
var Yf = null;
function Nc(l) {
  return l = l.target || l.srcElement || window, l.correspondingUseElement && (l = l.correspondingUseElement), l.nodeType === 3 ? l.parentNode : l;
}
var Ou = null, qu = null;
function Hi(l) {
  var t = ua(l);
  if (t && (l = t.stateNode)) {
    var u = l[Dl] || null;
    l: switch (l = t.stateNode, t.type) {
      case "input":
        if (Hf(
          l,
          u.value,
          u.defaultValue,
          u.defaultValue,
          u.checked,
          u.defaultChecked,
          u.type,
          u.name
        ), t = u.name, u.type === "radio" && t != null) {
          for (u = l; u.parentNode; ) u = u.parentNode;
          for (u = u.querySelectorAll(
            'input[name="' + Vl(
              "" + t
            ) + '"][type="radio"]'
          ), t = 0; t < u.length; t++) {
            var a = u[t];
            if (a !== l && a.form === l.form) {
              var e = a[Dl] || null;
              if (!e) throw Error(S(90));
              Hf(
                a,
                e.value,
                e.defaultValue,
                e.defaultValue,
                e.checked,
                e.defaultChecked,
                e.type,
                e.name
              );
            }
          }
          for (t = 0; t < u.length; t++)
            a = u[t], a.form === l.form && zd(a);
        }
        break l;
      case "textarea":
        Od(l, u.value, u.defaultValue);
        break l;
      case "select":
        t = u.value, t != null && Bu(l, !!u.multiple, t, !1);
    }
  }
}
var wn = !1;
function pd(l, t, u) {
  if (wn) return l(t, u);
  wn = !0;
  try {
    var a = l(t);
    return a;
  } finally {
    if (wn = !1, (Ou !== null || qu !== null) && (Hn(), Ou && (t = Ou, l = qu, qu = Ou = null, Hi(t), l)))
      for (t = 0; t < l.length; t++) Hi(l[t]);
  }
}
function Ba(l, t) {
  var u = l.stateNode;
  if (u === null) return null;
  var a = u[Dl] || null;
  if (a === null) return null;
  u = a[t];
  l: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (a = !a.disabled) || (l = l.type, a = !(l === "button" || l === "input" || l === "select" || l === "textarea")), l = !a;
      break l;
    default:
      l = !1;
  }
  if (l) return null;
  if (u && typeof u != "function")
    throw Error(
      S(231, t, typeof u)
    );
  return u;
}
var gt = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Bf = !1;
if (gt)
  try {
    var ia = {};
    Object.defineProperty(ia, "passive", {
      get: function() {
        Bf = !0;
      }
    }), window.addEventListener("test", ia, ia), window.removeEventListener("test", ia, ia);
  } catch {
    Bf = !1;
  }
var Ht = null, Hc = null, Re = null;
function Ud() {
  if (Re) return Re;
  var l, t = Hc, u = t.length, a, e = "value" in Ht ? Ht.value : Ht.textContent, n = e.length;
  for (l = 0; l < u && t[l] === e[l]; l++) ;
  var f = u - l;
  for (a = 1; a <= f && t[u - a] === e[n - a]; a++) ;
  return Re = e.slice(l, 1 < a ? 1 - a : void 0);
}
function Ne(l) {
  var t = l.keyCode;
  return "charCode" in l ? (l = l.charCode, l === 0 && t === 13 && (l = 13)) : l = t, l === 10 && (l = 13), 32 <= l || l === 13 ? l : 0;
}
function Se() {
  return !0;
}
function xi() {
  return !1;
}
function pl(l) {
  function t(u, a, e, n, f) {
    this._reactName = u, this._targetInst = e, this.type = a, this.nativeEvent = n, this.target = f, this.currentTarget = null;
    for (var c in l)
      l.hasOwnProperty(c) && (u = l[c], this[c] = u ? u(n) : n[c]);
    return this.isDefaultPrevented = (n.defaultPrevented != null ? n.defaultPrevented : n.returnValue === !1) ? Se : xi, this.isPropagationStopped = xi, this;
  }
  return $(t.prototype, {
    preventDefault: function() {
      this.defaultPrevented = !0;
      var u = this.nativeEvent;
      u && (u.preventDefault ? u.preventDefault() : typeof u.returnValue != "unknown" && (u.returnValue = !1), this.isDefaultPrevented = Se);
    },
    stopPropagation: function() {
      var u = this.nativeEvent;
      u && (u.stopPropagation ? u.stopPropagation() : typeof u.cancelBubble != "unknown" && (u.cancelBubble = !0), this.isPropagationStopped = Se);
    },
    persist: function() {
    },
    isPersistent: Se
  }), t;
}
var yu = {
  eventPhase: 0,
  bubbles: 0,
  cancelable: 0,
  timeStamp: function(l) {
    return l.timeStamp || Date.now();
  },
  defaultPrevented: 0,
  isTrusted: 0
}, zn = pl(yu), Pa = $({}, yu, { view: 0, detail: 0 }), Zv = pl(Pa), $n, Wn, sa, _n = $({}, Pa, {
  screenX: 0,
  screenY: 0,
  clientX: 0,
  clientY: 0,
  pageX: 0,
  pageY: 0,
  ctrlKey: 0,
  shiftKey: 0,
  altKey: 0,
  metaKey: 0,
  getModifierState: xc,
  button: 0,
  buttons: 0,
  relatedTarget: function(l) {
    return l.relatedTarget === void 0 ? l.fromElement === l.srcElement ? l.toElement : l.fromElement : l.relatedTarget;
  },
  movementX: function(l) {
    return "movementX" in l ? l.movementX : (l !== sa && (sa && l.type === "mousemove" ? ($n = l.screenX - sa.screenX, Wn = l.screenY - sa.screenY) : Wn = $n = 0, sa = l), $n);
  },
  movementY: function(l) {
    return "movementY" in l ? l.movementY : Wn;
  }
}), Yi = pl(_n), Vv = $({}, _n, { dataTransfer: 0 }), Kv = pl(Vv), Lv = $({}, Pa, { relatedTarget: 0 }), kn = pl(Lv), Jv = $({}, yu, {
  animationName: 0,
  elapsedTime: 0,
  pseudoElement: 0
}), wv = pl(Jv), $v = $({}, yu, {
  clipboardData: function(l) {
    return "clipboardData" in l ? l.clipboardData : window.clipboardData;
  }
}), Wv = pl($v), kv = $({}, yu, { data: 0 }), Bi = pl(kv), Fv = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
}, Iv = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
}, Pv = {
  Alt: "altKey",
  Control: "ctrlKey",
  Meta: "metaKey",
  Shift: "shiftKey"
};
function ly(l) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(l) : (l = Pv[l]) ? !!t[l] : !1;
}
function xc() {
  return ly;
}
var ty = $({}, Pa, {
  key: function(l) {
    if (l.key) {
      var t = Fv[l.key] || l.key;
      if (t !== "Unidentified") return t;
    }
    return l.type === "keypress" ? (l = Ne(l), l === 13 ? "Enter" : String.fromCharCode(l)) : l.type === "keydown" || l.type === "keyup" ? Iv[l.keyCode] || "Unidentified" : "";
  },
  code: 0,
  location: 0,
  ctrlKey: 0,
  shiftKey: 0,
  altKey: 0,
  metaKey: 0,
  repeat: 0,
  locale: 0,
  getModifierState: xc,
  charCode: function(l) {
    return l.type === "keypress" ? Ne(l) : 0;
  },
  keyCode: function(l) {
    return l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
  },
  which: function(l) {
    return l.type === "keypress" ? Ne(l) : l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
  }
}), uy = pl(ty), ay = $({}, _n, {
  pointerId: 0,
  width: 0,
  height: 0,
  pressure: 0,
  tangentialPressure: 0,
  tiltX: 0,
  tiltY: 0,
  twist: 0,
  pointerType: 0,
  isPrimary: 0
}), qi = pl(ay), ey = $({}, Pa, {
  touches: 0,
  targetTouches: 0,
  changedTouches: 0,
  altKey: 0,
  metaKey: 0,
  ctrlKey: 0,
  shiftKey: 0,
  getModifierState: xc
}), ny = pl(ey), fy = $({}, yu, {
  propertyName: 0,
  elapsedTime: 0,
  pseudoElement: 0
}), cy = pl(fy), iy = $({}, _n, {
  deltaX: function(l) {
    return "deltaX" in l ? l.deltaX : "wheelDeltaX" in l ? -l.wheelDeltaX : 0;
  },
  deltaY: function(l) {
    return "deltaY" in l ? l.deltaY : "wheelDeltaY" in l ? -l.wheelDeltaY : "wheelDelta" in l ? -l.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), sy = pl(iy), dy = $({}, yu, {
  newState: 0,
  oldState: 0
}), oy = pl(dy), vy = [9, 13, 27, 32], Yc = gt && "CompositionEvent" in window, Ea = null;
gt && "documentMode" in document && (Ea = document.documentMode);
var yy = gt && "TextEvent" in window && !Ea, Rd = gt && (!Yc || Ea && 8 < Ea && 11 >= Ea), Gi = " ", Xi = !1;
function Nd(l, t) {
  switch (l) {
    case "keyup":
      return vy.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function Hd(l) {
  return l = l.detail, typeof l == "object" && "data" in l ? l.data : null;
}
var Mu = !1;
function hy(l, t) {
  switch (l) {
    case "compositionend":
      return Hd(t);
    case "keypress":
      return t.which !== 32 ? null : (Xi = !0, Gi);
    case "textInput":
      return l = t.data, l === Gi && Xi ? null : l;
    default:
      return null;
  }
}
function ry(l, t) {
  if (Mu)
    return l === "compositionend" || !Yc && Nd(l, t) ? (l = Ud(), Re = Hc = Ht = null, Mu = !1, l) : null;
  switch (l) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
        if (t.char && 1 < t.char.length)
          return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return Rd && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var my = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0
};
function Qi(l) {
  var t = l && l.nodeName && l.nodeName.toLowerCase();
  return t === "input" ? !!my[l.type] : t === "textarea";
}
function xd(l, t, u, a) {
  Ou ? qu ? qu.push(a) : qu = [a] : Ou = a, t = on(t, "onChange"), 0 < t.length && (u = new zn(
    "onChange",
    "change",
    null,
    u,
    a
  ), l.push({ event: u, listeners: t }));
}
var Ta = null, qa = null;
function gy(l) {
  Mo(l, 0);
}
function On(l) {
  var t = ga(l);
  if (zd(t)) return l;
}
function ji(l, t) {
  if (l === "change") return t;
}
var Yd = !1;
if (gt) {
  var Fn;
  if (gt) {
    var In = "oninput" in document;
    if (!In) {
      var Ci = document.createElement("div");
      Ci.setAttribute("oninput", "return;"), In = typeof Ci.oninput == "function";
    }
    Fn = In;
  } else Fn = !1;
  Yd = Fn && (!document.documentMode || 9 < document.documentMode);
}
function Zi() {
  Ta && (Ta.detachEvent("onpropertychange", Bd), qa = Ta = null);
}
function Bd(l) {
  if (l.propertyName === "value" && On(qa)) {
    var t = [];
    xd(
      t,
      qa,
      l,
      Nc(l)
    ), pd(gy, t);
  }
}
function Sy(l, t, u) {
  l === "focusin" ? (Zi(), Ta = t, qa = u, Ta.attachEvent("onpropertychange", Bd)) : l === "focusout" && Zi();
}
function by(l) {
  if (l === "selectionchange" || l === "keyup" || l === "keydown")
    return On(qa);
}
function Ey(l, t) {
  if (l === "click") return On(t);
}
function Ty(l, t) {
  if (l === "input" || l === "change")
    return On(t);
}
function Ay(l, t) {
  return l === t && (l !== 0 || 1 / l === 1 / t) || l !== l && t !== t;
}
var Gl = typeof Object.is == "function" ? Object.is : Ay;
function Ga(l, t) {
  if (Gl(l, t)) return !0;
  if (typeof l != "object" || l === null || typeof t != "object" || t === null)
    return !1;
  var u = Object.keys(l), a = Object.keys(t);
  if (u.length !== a.length) return !1;
  for (a = 0; a < u.length; a++) {
    var e = u[a];
    if (!Rf.call(t, e) || !Gl(l[e], t[e]))
      return !1;
  }
  return !0;
}
function Vi(l) {
  for (; l && l.firstChild; ) l = l.firstChild;
  return l;
}
function Ki(l, t) {
  var u = Vi(l);
  l = 0;
  for (var a; u; ) {
    if (u.nodeType === 3) {
      if (a = l + u.textContent.length, l <= t && a >= t)
        return { node: u, offset: t - l };
      l = a;
    }
    l: {
      for (; u; ) {
        if (u.nextSibling) {
          u = u.nextSibling;
          break l;
        }
        u = u.parentNode;
      }
      u = void 0;
    }
    u = Vi(u);
  }
}
function qd(l, t) {
  return l && t ? l === t ? !0 : l && l.nodeType === 3 ? !1 : t && t.nodeType === 3 ? qd(l, t.parentNode) : "contains" in l ? l.contains(t) : l.compareDocumentPosition ? !!(l.compareDocumentPosition(t) & 16) : !1 : !1;
}
function Gd(l) {
  l = l != null && l.ownerDocument != null && l.ownerDocument.defaultView != null ? l.ownerDocument.defaultView : window;
  for (var t = Je(l.document); t instanceof l.HTMLIFrameElement; ) {
    try {
      var u = typeof t.contentWindow.location.href == "string";
    } catch {
      u = !1;
    }
    if (u) l = t.contentWindow;
    else break;
    t = Je(l.document);
  }
  return t;
}
function Bc(l) {
  var t = l && l.nodeName && l.nodeName.toLowerCase();
  return t && (t === "input" && (l.type === "text" || l.type === "search" || l.type === "tel" || l.type === "url" || l.type === "password") || t === "textarea" || l.contentEditable === "true");
}
var zy = gt && "documentMode" in document && 11 >= document.documentMode, Du = null, qf = null, Aa = null, Gf = !1;
function Li(l, t, u) {
  var a = u.window === u ? u.document : u.nodeType === 9 ? u : u.ownerDocument;
  Gf || Du == null || Du !== Je(a) || (a = Du, "selectionStart" in a && Bc(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
    anchorNode: a.anchorNode,
    anchorOffset: a.anchorOffset,
    focusNode: a.focusNode,
    focusOffset: a.focusOffset
  }), Aa && Ga(Aa, a) || (Aa = a, a = on(qf, "onSelect"), 0 < a.length && (t = new zn(
    "onSelect",
    "select",
    null,
    t,
    u
  ), l.push({ event: t, listeners: a }), t.target = Du)));
}
function kt(l, t) {
  var u = {};
  return u[l.toLowerCase()] = t.toLowerCase(), u["Webkit" + l] = "webkit" + t, u["Moz" + l] = "moz" + t, u;
}
var pu = {
  animationend: kt("Animation", "AnimationEnd"),
  animationiteration: kt("Animation", "AnimationIteration"),
  animationstart: kt("Animation", "AnimationStart"),
  transitionrun: kt("Transition", "TransitionRun"),
  transitionstart: kt("Transition", "TransitionStart"),
  transitioncancel: kt("Transition", "TransitionCancel"),
  transitionend: kt("Transition", "TransitionEnd")
}, Pn = {}, Xd = {};
gt && (Xd = document.createElement("div").style, "AnimationEvent" in window || (delete pu.animationend.animation, delete pu.animationiteration.animation, delete pu.animationstart.animation), "TransitionEvent" in window || delete pu.transitionend.transition);
function hu(l) {
  if (Pn[l]) return Pn[l];
  if (!pu[l]) return l;
  var t = pu[l], u;
  for (u in t)
    if (t.hasOwnProperty(u) && u in Xd)
      return Pn[l] = t[u];
  return l;
}
var Qd = hu("animationend"), jd = hu("animationiteration"), Cd = hu("animationstart"), _y = hu("transitionrun"), Oy = hu("transitionstart"), My = hu("transitioncancel"), Zd = hu("transitionend"), Vd = /* @__PURE__ */ new Map(), Xf = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
  " "
);
Xf.push("scrollEnd");
function kl(l, t) {
  Vd.set(l, t), vu(t, [l]);
}
var Ji = /* @__PURE__ */ new WeakMap();
function Kl(l, t) {
  if (typeof l == "object" && l !== null) {
    var u = Ji.get(l);
    return u !== void 0 ? u : (t = {
      value: l,
      source: t,
      stack: Ri(t)
    }, Ji.set(l, t), t);
  }
  return {
    value: l,
    source: t,
    stack: Ri(t)
  };
}
var Ql = [], Uu = 0, qc = 0;
function Mn() {
  for (var l = Uu, t = qc = Uu = 0; t < l; ) {
    var u = Ql[t];
    Ql[t++] = null;
    var a = Ql[t];
    Ql[t++] = null;
    var e = Ql[t];
    Ql[t++] = null;
    var n = Ql[t];
    if (Ql[t++] = null, a !== null && e !== null) {
      var f = a.pending;
      f === null ? e.next = e : (e.next = f.next, f.next = e), a.pending = e;
    }
    n !== 0 && Kd(u, e, n);
  }
}
function Dn(l, t, u, a) {
  Ql[Uu++] = l, Ql[Uu++] = t, Ql[Uu++] = u, Ql[Uu++] = a, qc |= a, l.lanes |= a, l = l.alternate, l !== null && (l.lanes |= a);
}
function Gc(l, t, u, a) {
  return Dn(l, t, u, a), we(l);
}
function aa(l, t) {
  return Dn(l, null, null, t), we(l);
}
function Kd(l, t, u) {
  l.lanes |= u;
  var a = l.alternate;
  a !== null && (a.lanes |= u);
  for (var e = !1, n = l.return; n !== null; )
    n.childLanes |= u, a = n.alternate, a !== null && (a.childLanes |= u), n.tag === 22 && (l = n.stateNode, l === null || l._visibility & 1 || (e = !0)), l = n, n = n.return;
  return l.tag === 3 ? (n = l.stateNode, e && t !== null && (e = 31 - Yl(u), l = n.hiddenUpdates, a = l[e], a === null ? l[e] = [t] : a.push(t), t.lane = u | 536870912), n) : null;
}
function we(l) {
  if (50 < Ha)
    throw Ha = 0, nc = null, Error(S(185));
  for (var t = l.return; t !== null; )
    l = t, t = l.return;
  return l.tag === 3 ? l.stateNode : null;
}
var Ru = {};
function Dy(l, t, u, a) {
  this.tag = l, this.key = u, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function Hl(l, t, u, a) {
  return new Dy(l, t, u, a);
}
function Xc(l) {
  return l = l.prototype, !(!l || !l.isReactComponent);
}
function rt(l, t) {
  var u = l.alternate;
  return u === null ? (u = Hl(
    l.tag,
    t,
    l.key,
    l.mode
  ), u.elementType = l.elementType, u.type = l.type, u.stateNode = l.stateNode, u.alternate = l, l.alternate = u) : (u.pendingProps = t, u.type = l.type, u.flags = 0, u.subtreeFlags = 0, u.deletions = null), u.flags = l.flags & 65011712, u.childLanes = l.childLanes, u.lanes = l.lanes, u.child = l.child, u.memoizedProps = l.memoizedProps, u.memoizedState = l.memoizedState, u.updateQueue = l.updateQueue, t = l.dependencies, u.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, u.sibling = l.sibling, u.index = l.index, u.ref = l.ref, u.refCleanup = l.refCleanup, u;
}
function Ld(l, t) {
  l.flags &= 65011714;
  var u = l.alternate;
  return u === null ? (l.childLanes = 0, l.lanes = t, l.child = null, l.subtreeFlags = 0, l.memoizedProps = null, l.memoizedState = null, l.updateQueue = null, l.dependencies = null, l.stateNode = null) : (l.childLanes = u.childLanes, l.lanes = u.lanes, l.child = u.child, l.subtreeFlags = 0, l.deletions = null, l.memoizedProps = u.memoizedProps, l.memoizedState = u.memoizedState, l.updateQueue = u.updateQueue, l.type = u.type, t = u.dependencies, l.dependencies = t === null ? null : {
    lanes: t.lanes,
    firstContext: t.firstContext
  }), l;
}
function He(l, t, u, a, e, n) {
  var f = 0;
  if (a = l, typeof l == "function") Xc(l) && (f = 1);
  else if (typeof l == "string")
    f = Uh(
      l,
      u,
      lt.current
    ) ? 26 : l === "html" || l === "head" || l === "body" ? 27 : 5;
  else
    l: switch (l) {
      case Mf:
        return l = Hl(31, u, t, e), l.elementType = Mf, l.lanes = n, l;
      case Au:
        return uu(u.children, e, n, t);
      case dd:
        f = 8, e |= 24;
        break;
      case zf:
        return l = Hl(12, u, t, e | 2), l.elementType = zf, l.lanes = n, l;
      case _f:
        return l = Hl(13, u, t, e), l.elementType = _f, l.lanes = n, l;
      case Of:
        return l = Hl(19, u, t, e), l.elementType = Of, l.lanes = n, l;
      default:
        if (typeof l == "object" && l !== null)
          switch (l.$$typeof) {
            case gv:
            case dt:
              f = 10;
              break l;
            case od:
              f = 9;
              break l;
            case _c:
              f = 11;
              break l;
            case Oc:
              f = 14;
              break l;
            case Ot:
              f = 16, a = null;
              break l;
          }
        f = 29, u = Error(
          S(130, l === null ? "null" : typeof l, "")
        ), a = null;
    }
  return t = Hl(f, u, t, e), t.elementType = l, t.type = a, t.lanes = n, t;
}
function uu(l, t, u, a) {
  return l = Hl(7, l, a, t), l.lanes = u, l;
}
function lf(l, t, u) {
  return l = Hl(6, l, null, t), l.lanes = u, l;
}
function tf(l, t, u) {
  return t = Hl(
    4,
    l.children !== null ? l.children : [],
    l.key,
    t
  ), t.lanes = u, t.stateNode = {
    containerInfo: l.containerInfo,
    pendingChildren: null,
    implementation: l.implementation
  }, t;
}
var Nu = [], Hu = 0, $e = null, We = 0, Cl = [], Zl = 0, au = null, ot = 1, vt = "";
function Pt(l, t) {
  Nu[Hu++] = We, Nu[Hu++] = $e, $e = l, We = t;
}
function Jd(l, t, u) {
  Cl[Zl++] = ot, Cl[Zl++] = vt, Cl[Zl++] = au, au = l;
  var a = ot;
  l = vt;
  var e = 32 - Yl(a) - 1;
  a &= ~(1 << e), u += 1;
  var n = 32 - Yl(t) + e;
  if (30 < n) {
    var f = e - e % 5;
    n = (a & (1 << f) - 1).toString(32), a >>= f, e -= f, ot = 1 << 32 - Yl(t) + e | u << e | a, vt = n + l;
  } else
    ot = 1 << n | u << e | a, vt = l;
}
function Qc(l) {
  l.return !== null && (Pt(l, 1), Jd(l, 1, 0));
}
function jc(l) {
  for (; l === $e; )
    $e = Nu[--Hu], Nu[Hu] = null, We = Nu[--Hu], Nu[Hu] = null;
  for (; l === au; )
    au = Cl[--Zl], Cl[Zl] = null, vt = Cl[--Zl], Cl[Zl] = null, ot = Cl[--Zl], Cl[Zl] = null;
}
var Tl = null, P = null, X = !1, eu = null, Il = !1, Qf = Error(S(519));
function iu(l) {
  var t = Error(S(418, ""));
  throw Xa(Kl(t, l)), Qf;
}
function wi(l) {
  var t = l.stateNode, u = l.type, a = l.memoizedProps;
  switch (t[bl] = l, t[Dl] = a, u) {
    case "dialog":
      x("cancel", t), x("close", t);
      break;
    case "iframe":
    case "object":
    case "embed":
      x("load", t);
      break;
    case "video":
    case "audio":
      for (u = 0; u < Ca.length; u++)
        x(Ca[u], t);
      break;
    case "source":
      x("error", t);
      break;
    case "img":
    case "image":
    case "link":
      x("error", t), x("load", t);
      break;
    case "details":
      x("toggle", t);
      break;
    case "input":
      x("invalid", t), _d(
        t,
        a.value,
        a.defaultValue,
        a.checked,
        a.defaultChecked,
        a.type,
        a.name,
        !0
      ), Le(t);
      break;
    case "select":
      x("invalid", t);
      break;
    case "textarea":
      x("invalid", t), Md(t, a.value, a.defaultValue, a.children), Le(t);
  }
  u = a.children, typeof u != "string" && typeof u != "number" && typeof u != "bigint" || t.textContent === "" + u || a.suppressHydrationWarning === !0 || po(t.textContent, u) ? (a.popover != null && (x("beforetoggle", t), x("toggle", t)), a.onScroll != null && x("scroll", t), a.onScrollEnd != null && x("scrollend", t), a.onClick != null && (t.onclick = Bn), t = !0) : t = !1, t || iu(l);
}
function $i(l) {
  for (Tl = l.return; Tl; )
    switch (Tl.tag) {
      case 5:
      case 13:
        Il = !1;
        return;
      case 27:
      case 3:
        Il = !0;
        return;
      default:
        Tl = Tl.return;
    }
}
function da(l) {
  if (l !== Tl) return !1;
  if (!X) return $i(l), X = !0, !1;
  var t = l.tag, u;
  if ((u = t !== 3 && t !== 27) && ((u = t === 5) && (u = l.type, u = !(u !== "form" && u !== "button") || oc(l.type, l.memoizedProps)), u = !u), u && P && iu(l), $i(l), t === 13) {
    if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(S(317));
    l: {
      for (l = l.nextSibling, t = 0; l; ) {
        if (l.nodeType === 8)
          if (u = l.data, u === "/$") {
            if (t === 0) {
              P = Wl(l.nextSibling);
              break l;
            }
            t--;
          } else
            u !== "$" && u !== "$!" && u !== "$?" || t++;
        l = l.nextSibling;
      }
      P = null;
    }
  } else
    t === 27 ? (t = P, wt(l.type) ? (l = hc, hc = null, P = l) : P = t) : P = Tl ? Wl(l.stateNode.nextSibling) : null;
  return !0;
}
function le() {
  P = Tl = null, X = !1;
}
function Wi() {
  var l = eu;
  return l !== null && (Ml === null ? Ml = l : Ml.push.apply(
    Ml,
    l
  ), eu = null), l;
}
function Xa(l) {
  eu === null ? eu = [l] : eu.push(l);
}
var jf = at(null), ru = null, yt = null;
function Dt(l, t, u) {
  F(jf, t._currentValue), t._currentValue = u;
}
function mt(l) {
  l._currentValue = jf.current, yl(jf);
}
function Cf(l, t, u) {
  for (; l !== null; ) {
    var a = l.alternate;
    if ((l.childLanes & t) !== t ? (l.childLanes |= t, a !== null && (a.childLanes |= t)) : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t), l === u) break;
    l = l.return;
  }
}
function Zf(l, t, u, a) {
  var e = l.child;
  for (e !== null && (e.return = l); e !== null; ) {
    var n = e.dependencies;
    if (n !== null) {
      var f = e.child;
      n = n.firstContext;
      l: for (; n !== null; ) {
        var c = n;
        n = e;
        for (var i = 0; i < t.length; i++)
          if (c.context === t[i]) {
            n.lanes |= u, c = n.alternate, c !== null && (c.lanes |= u), Cf(
              n.return,
              u,
              l
            ), a || (f = null);
            break l;
          }
        n = c.next;
      }
    } else if (e.tag === 18) {
      if (f = e.return, f === null) throw Error(S(341));
      f.lanes |= u, n = f.alternate, n !== null && (n.lanes |= u), Cf(f, u, l), f = null;
    } else f = e.child;
    if (f !== null) f.return = e;
    else
      for (f = e; f !== null; ) {
        if (f === l) {
          f = null;
          break;
        }
        if (e = f.sibling, e !== null) {
          e.return = f.return, f = e;
          break;
        }
        f = f.return;
      }
    e = f;
  }
}
function te(l, t, u, a) {
  l = null;
  for (var e = t, n = !1; e !== null; ) {
    if (!n) {
      if (e.flags & 524288) n = !0;
      else if (e.flags & 262144) break;
    }
    if (e.tag === 10) {
      var f = e.alternate;
      if (f === null) throw Error(S(387));
      if (f = f.memoizedProps, f !== null) {
        var c = e.type;
        Gl(e.pendingProps.value, f.value) || (l !== null ? l.push(c) : l = [c]);
      }
    } else if (e === Ce.current) {
      if (f = e.alternate, f === null) throw Error(S(387));
      f.memoizedState.memoizedState !== e.memoizedState.memoizedState && (l !== null ? l.push(Ka) : l = [Ka]);
    }
    e = e.return;
  }
  l !== null && Zf(
    t,
    l,
    u,
    a
  ), t.flags |= 262144;
}
function ke(l) {
  for (l = l.firstContext; l !== null; ) {
    if (!Gl(
      l.context._currentValue,
      l.memoizedValue
    ))
      return !0;
    l = l.next;
  }
  return !1;
}
function su(l) {
  ru = l, yt = null, l = l.dependencies, l !== null && (l.firstContext = null);
}
function El(l) {
  return wd(ru, l);
}
function be(l, t) {
  return ru === null && su(l), wd(l, t);
}
function wd(l, t) {
  var u = t._currentValue;
  if (t = { context: t, memoizedValue: u, next: null }, yt === null) {
    if (l === null) throw Error(S(308));
    yt = t, l.dependencies = { lanes: 0, firstContext: t }, l.flags |= 524288;
  } else yt = yt.next = t;
  return u;
}
var py = typeof AbortController < "u" ? AbortController : function() {
  var l = [], t = this.signal = {
    aborted: !1,
    addEventListener: function(u, a) {
      l.push(a);
    }
  };
  this.abort = function() {
    t.aborted = !0, l.forEach(function(u) {
      return u();
    });
  };
}, Uy = il.unstable_scheduleCallback, Ry = il.unstable_NormalPriority, fl = {
  $$typeof: dt,
  Consumer: null,
  Provider: null,
  _currentValue: null,
  _currentValue2: null,
  _threadCount: 0
};
function Cc() {
  return {
    controller: new py(),
    data: /* @__PURE__ */ new Map(),
    refCount: 0
  };
}
function ue(l) {
  l.refCount--, l.refCount === 0 && Uy(Ry, function() {
    l.controller.abort();
  });
}
var za = null, Vf = 0, Lu = 0, Gu = null;
function Ny(l, t) {
  if (za === null) {
    var u = za = [];
    Vf = 0, Lu = di(), Gu = {
      status: "pending",
      value: void 0,
      then: function(a) {
        u.push(a);
      }
    };
  }
  return Vf++, t.then(ki, ki), t;
}
function ki() {
  if (--Vf === 0 && za !== null) {
    Gu !== null && (Gu.status = "fulfilled");
    var l = za;
    za = null, Lu = 0, Gu = null;
    for (var t = 0; t < l.length; t++) (0, l[t])();
  }
}
function Hy(l, t) {
  var u = [], a = {
    status: "pending",
    value: null,
    reason: null,
    then: function(e) {
      u.push(e);
    }
  };
  return l.then(
    function() {
      a.status = "fulfilled", a.value = t;
      for (var e = 0; e < u.length; e++) (0, u[e])(t);
    },
    function(e) {
      for (a.status = "rejected", a.reason = e, e = 0; e < u.length; e++)
        (0, u[e])(void 0);
    }
  ), a;
}
var Fi = p.S;
p.S = function(l, t) {
  typeof t == "object" && t !== null && typeof t.then == "function" && Ny(l, t), Fi !== null && Fi(l, t);
};
var nu = at(null);
function Zc() {
  var l = nu.current;
  return l !== null ? l : J.pooledCache;
}
function xe(l, t) {
  t === null ? F(nu, nu.current) : F(nu, t.pool);
}
function $d() {
  var l = Zc();
  return l === null ? null : { parent: fl._currentValue, pool: l };
}
var ae = Error(S(460)), Wd = Error(S(474)), pn = Error(S(542)), Kf = { then: function() {
} };
function Ii(l) {
  return l = l.status, l === "fulfilled" || l === "rejected";
}
function Ee() {
}
function kd(l, t, u) {
  switch (u = l[u], u === void 0 ? l.push(t) : u !== t && (t.then(Ee, Ee), t = u), t.status) {
    case "fulfilled":
      return t.value;
    case "rejected":
      throw l = t.reason, ls(l), l;
    default:
      if (typeof t.status == "string") t.then(Ee, Ee);
      else {
        if (l = J, l !== null && 100 < l.shellSuspendCounter)
          throw Error(S(482));
        l = t, l.status = "pending", l.then(
          function(a) {
            if (t.status === "pending") {
              var e = t;
              e.status = "fulfilled", e.value = a;
            }
          },
          function(a) {
            if (t.status === "pending") {
              var e = t;
              e.status = "rejected", e.reason = a;
            }
          }
        );
      }
      switch (t.status) {
        case "fulfilled":
          return t.value;
        case "rejected":
          throw l = t.reason, ls(l), l;
      }
      throw _a = t, ae;
  }
}
var _a = null;
function Pi() {
  if (_a === null) throw Error(S(459));
  var l = _a;
  return _a = null, l;
}
function ls(l) {
  if (l === ae || l === pn)
    throw Error(S(483));
}
var Mt = !1;
function Vc(l) {
  l.updateQueue = {
    baseState: l.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, lanes: 0, hiddenCallbacks: null },
    callbacks: null
  };
}
function Lf(l, t) {
  l = l.updateQueue, t.updateQueue === l && (t.updateQueue = {
    baseState: l.baseState,
    firstBaseUpdate: l.firstBaseUpdate,
    lastBaseUpdate: l.lastBaseUpdate,
    shared: l.shared,
    callbacks: null
  });
}
function qt(l) {
  return { lane: l, tag: 0, payload: null, callback: null, next: null };
}
function Gt(l, t, u) {
  var a = l.updateQueue;
  if (a === null) return null;
  if (a = a.shared, C & 2) {
    var e = a.pending;
    return e === null ? t.next = t : (t.next = e.next, e.next = t), a.pending = t, t = we(l), Kd(l, null, u), t;
  }
  return Dn(l, a, t, u), we(l);
}
function Oa(l, t, u) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (u & 4194048) !== 0)) {
    var a = t.lanes;
    a &= l.pendingLanes, u |= a, t.lanes = u, Sd(l, u);
  }
}
function uf(l, t) {
  var u = l.updateQueue, a = l.alternate;
  if (a !== null && (a = a.updateQueue, u === a)) {
    var e = null, n = null;
    if (u = u.firstBaseUpdate, u !== null) {
      do {
        var f = {
          lane: u.lane,
          tag: u.tag,
          payload: u.payload,
          callback: null,
          next: null
        };
        n === null ? e = n = f : n = n.next = f, u = u.next;
      } while (u !== null);
      n === null ? e = n = t : n = n.next = t;
    } else e = n = t;
    u = {
      baseState: a.baseState,
      firstBaseUpdate: e,
      lastBaseUpdate: n,
      shared: a.shared,
      callbacks: a.callbacks
    }, l.updateQueue = u;
    return;
  }
  l = u.lastBaseUpdate, l === null ? u.firstBaseUpdate = t : l.next = t, u.lastBaseUpdate = t;
}
var Jf = !1;
function Ma() {
  if (Jf) {
    var l = Gu;
    if (l !== null) throw l;
  }
}
function Da(l, t, u, a) {
  Jf = !1;
  var e = l.updateQueue;
  Mt = !1;
  var n = e.firstBaseUpdate, f = e.lastBaseUpdate, c = e.shared.pending;
  if (c !== null) {
    e.shared.pending = null;
    var i = c, o = i.next;
    i.next = null, f === null ? n = o : f.next = o, f = i;
    var m = l.alternate;
    m !== null && (m = m.updateQueue, c = m.lastBaseUpdate, c !== f && (c === null ? m.firstBaseUpdate = o : c.next = o, m.lastBaseUpdate = i));
  }
  if (n !== null) {
    var r = e.baseState;
    f = 0, m = o = i = null, c = n;
    do {
      var v = c.lane & -536870913, h = v !== c.lane;
      if (h ? (G & v) === v : (a & v) === v) {
        v !== 0 && v === Lu && (Jf = !0), m !== null && (m = m.next = {
          lane: 0,
          tag: c.tag,
          payload: c.payload,
          callback: null,
          next: null
        });
        l: {
          var O = l, z = c;
          v = t;
          var B = u;
          switch (z.tag) {
            case 1:
              if (O = z.payload, typeof O == "function") {
                r = O.call(B, r, v);
                break l;
              }
              r = O;
              break l;
            case 3:
              O.flags = O.flags & -65537 | 128;
            case 0:
              if (O = z.payload, v = typeof O == "function" ? O.call(B, r, v) : O, v == null) break l;
              r = $({}, r, v);
              break l;
            case 2:
              Mt = !0;
          }
        }
        v = c.callback, v !== null && (l.flags |= 64, h && (l.flags |= 8192), h = e.callbacks, h === null ? e.callbacks = [v] : h.push(v));
      } else
        h = {
          lane: v,
          tag: c.tag,
          payload: c.payload,
          callback: c.callback,
          next: null
        }, m === null ? (o = m = h, i = r) : m = m.next = h, f |= v;
      if (c = c.next, c === null) {
        if (c = e.shared.pending, c === null)
          break;
        h = c, c = h.next, h.next = null, e.lastBaseUpdate = h, e.shared.pending = null;
      }
    } while (!0);
    m === null && (i = r), e.baseState = i, e.firstBaseUpdate = o, e.lastBaseUpdate = m, n === null && (e.shared.lanes = 0), Lt |= f, l.lanes = f, l.memoizedState = r;
  }
}
function Fd(l, t) {
  if (typeof l != "function")
    throw Error(S(191, l));
  l.call(t);
}
function Id(l, t) {
  var u = l.callbacks;
  if (u !== null)
    for (l.callbacks = null, l = 0; l < u.length; l++)
      Fd(u[l], t);
}
var Ju = at(null), Fe = at(0);
function ts(l, t) {
  l = Et, F(Fe, l), F(Ju, t), Et = l | t.baseLanes;
}
function wf() {
  F(Fe, Et), F(Ju, Ju.current);
}
function Kc() {
  Et = Fe.current, yl(Ju), yl(Fe);
}
var Vt = 0, H = null, V = null, el = null, Ie = !1, Xu = !1, du = !1, Pe = 0, Qa = 0, Qu = null, xy = 0;
function ul() {
  throw Error(S(321));
}
function Lc(l, t) {
  if (t === null) return !1;
  for (var u = 0; u < t.length && u < l.length; u++)
    if (!Gl(l[u], t[u])) return !1;
  return !0;
}
function Jc(l, t, u, a, e, n) {
  return Vt = n, H = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, p.H = l === null || l.memoizedState === null ? U0 : R0, du = !1, n = u(a, e), du = !1, Xu && (n = l0(
    t,
    u,
    a,
    e
  )), Pd(l), n;
}
function Pd(l) {
  p.H = ln;
  var t = V !== null && V.next !== null;
  if (Vt = 0, el = V = H = null, Ie = !1, Qa = 0, Qu = null, t) throw Error(S(300));
  l === null || vl || (l = l.dependencies, l !== null && ke(l) && (vl = !0));
}
function l0(l, t, u, a) {
  H = l;
  var e = 0;
  do {
    if (Xu && (Qu = null), Qa = 0, Xu = !1, 25 <= e) throw Error(S(301));
    if (e += 1, el = V = null, l.updateQueue != null) {
      var n = l.updateQueue;
      n.lastEffect = null, n.events = null, n.stores = null, n.memoCache != null && (n.memoCache.index = 0);
    }
    p.H = jy, n = t(u, a);
  } while (Xu);
  return n;
}
function Yy() {
  var l = p.H, t = l.useState()[0];
  return t = typeof t.then == "function" ? ee(t) : t, l = l.useState()[0], (V !== null ? V.memoizedState : null) !== l && (H.flags |= 1024), t;
}
function wc() {
  var l = Pe !== 0;
  return Pe = 0, l;
}
function $c(l, t, u) {
  t.updateQueue = l.updateQueue, t.flags &= -2053, l.lanes &= ~u;
}
function Wc(l) {
  if (Ie) {
    for (l = l.memoizedState; l !== null; ) {
      var t = l.queue;
      t !== null && (t.pending = null), l = l.next;
    }
    Ie = !1;
  }
  Vt = 0, el = V = H = null, Xu = !1, Qa = Pe = 0, Qu = null;
}
function _l() {
  var l = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null
  };
  return el === null ? H.memoizedState = el = l : el = el.next = l, el;
}
function nl() {
  if (V === null) {
    var l = H.alternate;
    l = l !== null ? l.memoizedState : null;
  } else l = V.next;
  var t = el === null ? H.memoizedState : el.next;
  if (t !== null)
    el = t, V = l;
  else {
    if (l === null)
      throw H.alternate === null ? Error(S(467)) : Error(S(310));
    V = l, l = {
      memoizedState: V.memoizedState,
      baseState: V.baseState,
      baseQueue: V.baseQueue,
      queue: V.queue,
      next: null
    }, el === null ? H.memoizedState = el = l : el = el.next = l;
  }
  return el;
}
function kc() {
  return { lastEffect: null, events: null, stores: null, memoCache: null };
}
function ee(l) {
  var t = Qa;
  return Qa += 1, Qu === null && (Qu = []), l = kd(Qu, l, t), t = H, (el === null ? t.memoizedState : el.next) === null && (t = t.alternate, p.H = t === null || t.memoizedState === null ? U0 : R0), l;
}
function Un(l) {
  if (l !== null && typeof l == "object") {
    if (typeof l.then == "function") return ee(l);
    if (l.$$typeof === dt) return El(l);
  }
  throw Error(S(438, String(l)));
}
function Fc(l) {
  var t = null, u = H.updateQueue;
  if (u !== null && (t = u.memoCache), t == null) {
    var a = H.alternate;
    a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (t = {
      data: a.data.map(function(e) {
        return e.slice();
      }),
      index: 0
    })));
  }
  if (t == null && (t = { data: [], index: 0 }), u === null && (u = kc(), H.updateQueue = u), u.memoCache = t, u = t.data[t.index], u === void 0)
    for (u = t.data[t.index] = Array(l), a = 0; a < l; a++)
      u[a] = Sv;
  return t.index++, u;
}
function St(l, t) {
  return typeof t == "function" ? t(l) : t;
}
function Ye(l) {
  var t = nl();
  return Ic(t, V, l);
}
function Ic(l, t, u) {
  var a = l.queue;
  if (a === null) throw Error(S(311));
  a.lastRenderedReducer = u;
  var e = l.baseQueue, n = a.pending;
  if (n !== null) {
    if (e !== null) {
      var f = e.next;
      e.next = n.next, n.next = f;
    }
    t.baseQueue = e = n, a.pending = null;
  }
  if (n = l.baseState, e === null) l.memoizedState = n;
  else {
    t = e.next;
    var c = f = null, i = null, o = t, m = !1;
    do {
      var r = o.lane & -536870913;
      if (r !== o.lane ? (G & r) === r : (Vt & r) === r) {
        var v = o.revertLane;
        if (v === 0)
          i !== null && (i = i.next = {
            lane: 0,
            revertLane: 0,
            action: o.action,
            hasEagerState: o.hasEagerState,
            eagerState: o.eagerState,
            next: null
          }), r === Lu && (m = !0);
        else if ((Vt & v) === v) {
          o = o.next, v === Lu && (m = !0);
          continue;
        } else
          r = {
            lane: 0,
            revertLane: o.revertLane,
            action: o.action,
            hasEagerState: o.hasEagerState,
            eagerState: o.eagerState,
            next: null
          }, i === null ? (c = i = r, f = n) : i = i.next = r, H.lanes |= v, Lt |= v;
        r = o.action, du && u(n, r), n = o.hasEagerState ? o.eagerState : u(n, r);
      } else
        v = {
          lane: r,
          revertLane: o.revertLane,
          action: o.action,
          hasEagerState: o.hasEagerState,
          eagerState: o.eagerState,
          next: null
        }, i === null ? (c = i = v, f = n) : i = i.next = v, H.lanes |= r, Lt |= r;
      o = o.next;
    } while (o !== null && o !== t);
    if (i === null ? f = n : i.next = c, !Gl(n, l.memoizedState) && (vl = !0, m && (u = Gu, u !== null)))
      throw u;
    l.memoizedState = n, l.baseState = f, l.baseQueue = i, a.lastRenderedState = n;
  }
  return e === null && (a.lanes = 0), [l.memoizedState, a.dispatch];
}
function af(l) {
  var t = nl(), u = t.queue;
  if (u === null) throw Error(S(311));
  u.lastRenderedReducer = l;
  var a = u.dispatch, e = u.pending, n = t.memoizedState;
  if (e !== null) {
    u.pending = null;
    var f = e = e.next;
    do
      n = l(n, f.action), f = f.next;
    while (f !== e);
    Gl(n, t.memoizedState) || (vl = !0), t.memoizedState = n, t.baseQueue === null && (t.baseState = n), u.lastRenderedState = n;
  }
  return [n, a];
}
function t0(l, t, u) {
  var a = H, e = nl(), n = X;
  if (n) {
    if (u === void 0) throw Error(S(407));
    u = u();
  } else u = t();
  var f = !Gl(
    (V || e).memoizedState,
    u
  );
  f && (e.memoizedState = u, vl = !0), e = e.queue;
  var c = e0.bind(null, a, e, l);
  if (ne(2048, 8, c, [l]), e.getSnapshot !== t || f || el !== null && el.memoizedState.tag & 1) {
    if (a.flags |= 2048, wu(
      9,
      Rn(),
      a0.bind(
        null,
        a,
        e,
        u,
        t
      ),
      null
    ), J === null) throw Error(S(349));
    n || Vt & 124 || u0(a, t, u);
  }
  return u;
}
function u0(l, t, u) {
  l.flags |= 16384, l = { getSnapshot: t, value: u }, t = H.updateQueue, t === null ? (t = kc(), H.updateQueue = t, t.stores = [l]) : (u = t.stores, u === null ? t.stores = [l] : u.push(l));
}
function a0(l, t, u, a) {
  t.value = u, t.getSnapshot = a, n0(t) && f0(l);
}
function e0(l, t, u) {
  return u(function() {
    n0(t) && f0(l);
  });
}
function n0(l) {
  var t = l.getSnapshot;
  l = l.value;
  try {
    var u = t();
    return !Gl(l, u);
  } catch {
    return !0;
  }
}
function f0(l) {
  var t = aa(l, 2);
  t !== null && ql(t, l, 2);
}
function $f(l) {
  var t = _l();
  if (typeof l == "function") {
    var u = l;
    if (l = u(), du) {
      Nt(!0);
      try {
        u();
      } finally {
        Nt(!1);
      }
    }
  }
  return t.memoizedState = t.baseState = l, t.queue = {
    pending: null,
    lanes: 0,
    dispatch: null,
    lastRenderedReducer: St,
    lastRenderedState: l
  }, t;
}
function c0(l, t, u, a) {
  return l.baseState = u, Ic(
    l,
    V,
    typeof a == "function" ? a : St
  );
}
function By(l, t, u, a, e) {
  if (Nn(l)) throw Error(S(485));
  if (l = t.action, l !== null) {
    var n = {
      payload: e,
      action: l,
      next: null,
      isTransition: !0,
      status: "pending",
      value: null,
      reason: null,
      listeners: [],
      then: function(f) {
        n.listeners.push(f);
      }
    };
    p.T !== null ? u(!0) : n.isTransition = !1, a(n), u = t.pending, u === null ? (n.next = t.pending = n, i0(t, n)) : (n.next = u.next, t.pending = u.next = n);
  }
}
function i0(l, t) {
  var u = t.action, a = t.payload, e = l.state;
  if (t.isTransition) {
    var n = p.T, f = {};
    p.T = f;
    try {
      var c = u(e, a), i = p.S;
      i !== null && i(f, c), us(l, t, c);
    } catch (o) {
      Wf(l, t, o);
    } finally {
      p.T = n;
    }
  } else
    try {
      n = u(e, a), us(l, t, n);
    } catch (o) {
      Wf(l, t, o);
    }
}
function us(l, t, u) {
  u !== null && typeof u == "object" && typeof u.then == "function" ? u.then(
    function(a) {
      as(l, t, a);
    },
    function(a) {
      return Wf(l, t, a);
    }
  ) : as(l, t, u);
}
function as(l, t, u) {
  t.status = "fulfilled", t.value = u, s0(t), l.state = u, t = l.pending, t !== null && (u = t.next, u === t ? l.pending = null : (u = u.next, t.next = u, i0(l, u)));
}
function Wf(l, t, u) {
  var a = l.pending;
  if (l.pending = null, a !== null) {
    a = a.next;
    do
      t.status = "rejected", t.reason = u, s0(t), t = t.next;
    while (t !== a);
  }
  l.action = null;
}
function s0(l) {
  l = l.listeners;
  for (var t = 0; t < l.length; t++) (0, l[t])();
}
function d0(l, t) {
  return t;
}
function es(l, t) {
  if (X) {
    var u = J.formState;
    if (u !== null) {
      l: {
        var a = H;
        if (X) {
          if (P) {
            t: {
              for (var e = P, n = Il; e.nodeType !== 8; ) {
                if (!n) {
                  e = null;
                  break t;
                }
                if (e = Wl(
                  e.nextSibling
                ), e === null) {
                  e = null;
                  break t;
                }
              }
              n = e.data, e = n === "F!" || n === "F" ? e : null;
            }
            if (e) {
              P = Wl(
                e.nextSibling
              ), a = e.data === "F!";
              break l;
            }
          }
          iu(a);
        }
        a = !1;
      }
      a && (t = u[0]);
    }
  }
  return u = _l(), u.memoizedState = u.baseState = t, a = {
    pending: null,
    lanes: 0,
    dispatch: null,
    lastRenderedReducer: d0,
    lastRenderedState: t
  }, u.queue = a, u = M0.bind(
    null,
    H,
    a
  ), a.dispatch = u, a = $f(!1), n = ui.bind(
    null,
    H,
    !1,
    a.queue
  ), a = _l(), e = {
    state: t,
    dispatch: null,
    action: l,
    pending: null
  }, a.queue = e, u = By.bind(
    null,
    H,
    e,
    n,
    u
  ), e.dispatch = u, a.memoizedState = l, [t, u, !1];
}
function ns(l) {
  var t = nl();
  return o0(t, V, l);
}
function o0(l, t, u) {
  if (t = Ic(
    l,
    t,
    d0
  )[0], l = Ye(St)[0], typeof t == "object" && t !== null && typeof t.then == "function")
    try {
      var a = ee(t);
    } catch (f) {
      throw f === ae ? pn : f;
    }
  else a = t;
  t = nl();
  var e = t.queue, n = e.dispatch;
  return u !== t.memoizedState && (H.flags |= 2048, wu(
    9,
    Rn(),
    qy.bind(null, e, u),
    null
  )), [a, n, l];
}
function qy(l, t) {
  l.action = t;
}
function fs(l) {
  var t = nl(), u = V;
  if (u !== null)
    return o0(t, u, l);
  nl(), t = t.memoizedState, u = nl();
  var a = u.queue.dispatch;
  return u.memoizedState = l, [t, a, !1];
}
function wu(l, t, u, a) {
  return l = { tag: l, create: u, deps: a, inst: t, next: null }, t = H.updateQueue, t === null && (t = kc(), H.updateQueue = t), u = t.lastEffect, u === null ? t.lastEffect = l.next = l : (a = u.next, u.next = l, l.next = a, t.lastEffect = l), l;
}
function Rn() {
  return { destroy: void 0, resource: void 0 };
}
function v0() {
  return nl().memoizedState;
}
function Be(l, t, u, a) {
  var e = _l();
  a = a === void 0 ? null : a, H.flags |= l, e.memoizedState = wu(
    1 | t,
    Rn(),
    u,
    a
  );
}
function ne(l, t, u, a) {
  var e = nl();
  a = a === void 0 ? null : a;
  var n = e.memoizedState.inst;
  V !== null && a !== null && Lc(a, V.memoizedState.deps) ? e.memoizedState = wu(t, n, u, a) : (H.flags |= l, e.memoizedState = wu(
    1 | t,
    n,
    u,
    a
  ));
}
function cs(l, t) {
  Be(8390656, 8, l, t);
}
function y0(l, t) {
  ne(2048, 8, l, t);
}
function h0(l, t) {
  return ne(4, 2, l, t);
}
function r0(l, t) {
  return ne(4, 4, l, t);
}
function m0(l, t) {
  if (typeof t == "function") {
    l = l();
    var u = t(l);
    return function() {
      typeof u == "function" ? u() : t(null);
    };
  }
  if (t != null)
    return l = l(), t.current = l, function() {
      t.current = null;
    };
}
function g0(l, t, u) {
  u = u != null ? u.concat([l]) : null, ne(4, 4, m0.bind(null, t, l), u);
}
function Pc() {
}
function S0(l, t) {
  var u = nl();
  t = t === void 0 ? null : t;
  var a = u.memoizedState;
  return t !== null && Lc(t, a[1]) ? a[0] : (u.memoizedState = [l, t], l);
}
function b0(l, t) {
  var u = nl();
  t = t === void 0 ? null : t;
  var a = u.memoizedState;
  if (t !== null && Lc(t, a[1]))
    return a[0];
  if (a = l(), du) {
    Nt(!0);
    try {
      l();
    } finally {
      Nt(!1);
    }
  }
  return u.memoizedState = [a, t], a;
}
function li(l, t, u) {
  return u === void 0 || Vt & 1073741824 ? l.memoizedState = t : (l.memoizedState = u, l = so(), H.lanes |= l, Lt |= l, u);
}
function E0(l, t, u, a) {
  return Gl(u, t) ? u : Ju.current !== null ? (l = li(l, u, a), Gl(l, t) || (vl = !0), l) : Vt & 42 ? (l = so(), H.lanes |= l, Lt |= l, t) : (vl = !0, l.memoizedState = u);
}
function T0(l, t, u, a, e) {
  var n = Q.p;
  Q.p = n !== 0 && 8 > n ? n : 8;
  var f = p.T, c = {};
  p.T = c, ui(l, !1, t, u);
  try {
    var i = e(), o = p.S;
    if (o !== null && o(c, i), i !== null && typeof i == "object" && typeof i.then == "function") {
      var m = Hy(
        i,
        a
      );
      pa(
        l,
        t,
        m,
        Bl(l)
      );
    } else
      pa(
        l,
        t,
        a,
        Bl(l)
      );
  } catch (r) {
    pa(
      l,
      t,
      { then: function() {
      }, status: "rejected", reason: r },
      Bl()
    );
  } finally {
    Q.p = n, p.T = f;
  }
}
function Gy() {
}
function kf(l, t, u, a) {
  if (l.tag !== 5) throw Error(S(476));
  var e = A0(l).queue;
  T0(
    l,
    e,
    t,
    tu,
    u === null ? Gy : function() {
      return z0(l), u(a);
    }
  );
}
function A0(l) {
  var t = l.memoizedState;
  if (t !== null) return t;
  t = {
    memoizedState: tu,
    baseState: tu,
    baseQueue: null,
    queue: {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: St,
      lastRenderedState: tu
    },
    next: null
  };
  var u = {};
  return t.next = {
    memoizedState: u,
    baseState: u,
    baseQueue: null,
    queue: {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: St,
      lastRenderedState: u
    },
    next: null
  }, l.memoizedState = t, l = l.alternate, l !== null && (l.memoizedState = t), t;
}
function z0(l) {
  var t = A0(l).next.queue;
  pa(l, t, {}, Bl());
}
function ti() {
  return El(Ka);
}
function _0() {
  return nl().memoizedState;
}
function O0() {
  return nl().memoizedState;
}
function Xy(l) {
  for (var t = l.return; t !== null; ) {
    switch (t.tag) {
      case 24:
      case 3:
        var u = Bl();
        l = qt(u);
        var a = Gt(t, l, u);
        a !== null && (ql(a, t, u), Oa(a, t, u)), t = { cache: Cc() }, l.payload = t;
        return;
    }
    t = t.return;
  }
}
function Qy(l, t, u) {
  var a = Bl();
  u = {
    lane: a,
    revertLane: 0,
    action: u,
    hasEagerState: !1,
    eagerState: null,
    next: null
  }, Nn(l) ? D0(t, u) : (u = Gc(l, t, u, a), u !== null && (ql(u, l, a), p0(u, t, a)));
}
function M0(l, t, u) {
  var a = Bl();
  pa(l, t, u, a);
}
function pa(l, t, u, a) {
  var e = {
    lane: a,
    revertLane: 0,
    action: u,
    hasEagerState: !1,
    eagerState: null,
    next: null
  };
  if (Nn(l)) D0(t, e);
  else {
    var n = l.alternate;
    if (l.lanes === 0 && (n === null || n.lanes === 0) && (n = t.lastRenderedReducer, n !== null))
      try {
        var f = t.lastRenderedState, c = n(f, u);
        if (e.hasEagerState = !0, e.eagerState = c, Gl(c, f))
          return Dn(l, t, e, 0), J === null && Mn(), !1;
      } catch {
      } finally {
      }
    if (u = Gc(l, t, e, a), u !== null)
      return ql(u, l, a), p0(u, t, a), !0;
  }
  return !1;
}
function ui(l, t, u, a) {
  if (a = {
    lane: 2,
    revertLane: di(),
    action: a,
    hasEagerState: !1,
    eagerState: null,
    next: null
  }, Nn(l)) {
    if (t) throw Error(S(479));
  } else
    t = Gc(
      l,
      u,
      a,
      2
    ), t !== null && ql(t, l, 2);
}
function Nn(l) {
  var t = l.alternate;
  return l === H || t !== null && t === H;
}
function D0(l, t) {
  Xu = Ie = !0;
  var u = l.pending;
  u === null ? t.next = t : (t.next = u.next, u.next = t), l.pending = t;
}
function p0(l, t, u) {
  if (u & 4194048) {
    var a = t.lanes;
    a &= l.pendingLanes, u |= a, t.lanes = u, Sd(l, u);
  }
}
var ln = {
  readContext: El,
  use: Un,
  useCallback: ul,
  useContext: ul,
  useEffect: ul,
  useImperativeHandle: ul,
  useLayoutEffect: ul,
  useInsertionEffect: ul,
  useMemo: ul,
  useReducer: ul,
  useRef: ul,
  useState: ul,
  useDebugValue: ul,
  useDeferredValue: ul,
  useTransition: ul,
  useSyncExternalStore: ul,
  useId: ul,
  useHostTransitionStatus: ul,
  useFormState: ul,
  useActionState: ul,
  useOptimistic: ul,
  useMemoCache: ul,
  useCacheRefresh: ul
}, U0 = {
  readContext: El,
  use: Un,
  useCallback: function(l, t) {
    return _l().memoizedState = [
      l,
      t === void 0 ? null : t
    ], l;
  },
  useContext: El,
  useEffect: cs,
  useImperativeHandle: function(l, t, u) {
    u = u != null ? u.concat([l]) : null, Be(
      4194308,
      4,
      m0.bind(null, t, l),
      u
    );
  },
  useLayoutEffect: function(l, t) {
    return Be(4194308, 4, l, t);
  },
  useInsertionEffect: function(l, t) {
    Be(4, 2, l, t);
  },
  useMemo: function(l, t) {
    var u = _l();
    t = t === void 0 ? null : t;
    var a = l();
    if (du) {
      Nt(!0);
      try {
        l();
      } finally {
        Nt(!1);
      }
    }
    return u.memoizedState = [a, t], a;
  },
  useReducer: function(l, t, u) {
    var a = _l();
    if (u !== void 0) {
      var e = u(t);
      if (du) {
        Nt(!0);
        try {
          u(t);
        } finally {
          Nt(!1);
        }
      }
    } else e = t;
    return a.memoizedState = a.baseState = e, l = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: l,
      lastRenderedState: e
    }, a.queue = l, l = l.dispatch = Qy.bind(
      null,
      H,
      l
    ), [a.memoizedState, l];
  },
  useRef: function(l) {
    var t = _l();
    return l = { current: l }, t.memoizedState = l;
  },
  useState: function(l) {
    l = $f(l);
    var t = l.queue, u = M0.bind(null, H, t);
    return t.dispatch = u, [l.memoizedState, u];
  },
  useDebugValue: Pc,
  useDeferredValue: function(l, t) {
    var u = _l();
    return li(u, l, t);
  },
  useTransition: function() {
    var l = $f(!1);
    return l = T0.bind(
      null,
      H,
      l.queue,
      !0,
      !1
    ), _l().memoizedState = l, [!1, l];
  },
  useSyncExternalStore: function(l, t, u) {
    var a = H, e = _l();
    if (X) {
      if (u === void 0)
        throw Error(S(407));
      u = u();
    } else {
      if (u = t(), J === null)
        throw Error(S(349));
      G & 124 || u0(a, t, u);
    }
    e.memoizedState = u;
    var n = { value: u, getSnapshot: t };
    return e.queue = n, cs(e0.bind(null, a, n, l), [
      l
    ]), a.flags |= 2048, wu(
      9,
      Rn(),
      a0.bind(
        null,
        a,
        n,
        u,
        t
      ),
      null
    ), u;
  },
  useId: function() {
    var l = _l(), t = J.identifierPrefix;
    if (X) {
      var u = vt, a = ot;
      u = (a & ~(1 << 32 - Yl(a) - 1)).toString(32) + u, t = "«" + t + "R" + u, u = Pe++, 0 < u && (t += "H" + u.toString(32)), t += "»";
    } else
      u = xy++, t = "«" + t + "r" + u.toString(32) + "»";
    return l.memoizedState = t;
  },
  useHostTransitionStatus: ti,
  useFormState: es,
  useActionState: es,
  useOptimistic: function(l) {
    var t = _l();
    t.memoizedState = t.baseState = l;
    var u = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: null,
      lastRenderedState: null
    };
    return t.queue = u, t = ui.bind(
      null,
      H,
      !0,
      u
    ), u.dispatch = t, [l, t];
  },
  useMemoCache: Fc,
  useCacheRefresh: function() {
    return _l().memoizedState = Xy.bind(
      null,
      H
    );
  }
}, R0 = {
  readContext: El,
  use: Un,
  useCallback: S0,
  useContext: El,
  useEffect: y0,
  useImperativeHandle: g0,
  useInsertionEffect: h0,
  useLayoutEffect: r0,
  useMemo: b0,
  useReducer: Ye,
  useRef: v0,
  useState: function() {
    return Ye(St);
  },
  useDebugValue: Pc,
  useDeferredValue: function(l, t) {
    var u = nl();
    return E0(
      u,
      V.memoizedState,
      l,
      t
    );
  },
  useTransition: function() {
    var l = Ye(St)[0], t = nl().memoizedState;
    return [
      typeof l == "boolean" ? l : ee(l),
      t
    ];
  },
  useSyncExternalStore: t0,
  useId: _0,
  useHostTransitionStatus: ti,
  useFormState: ns,
  useActionState: ns,
  useOptimistic: function(l, t) {
    var u = nl();
    return c0(u, V, l, t);
  },
  useMemoCache: Fc,
  useCacheRefresh: O0
}, jy = {
  readContext: El,
  use: Un,
  useCallback: S0,
  useContext: El,
  useEffect: y0,
  useImperativeHandle: g0,
  useInsertionEffect: h0,
  useLayoutEffect: r0,
  useMemo: b0,
  useReducer: af,
  useRef: v0,
  useState: function() {
    return af(St);
  },
  useDebugValue: Pc,
  useDeferredValue: function(l, t) {
    var u = nl();
    return V === null ? li(u, l, t) : E0(
      u,
      V.memoizedState,
      l,
      t
    );
  },
  useTransition: function() {
    var l = af(St)[0], t = nl().memoizedState;
    return [
      typeof l == "boolean" ? l : ee(l),
      t
    ];
  },
  useSyncExternalStore: t0,
  useId: _0,
  useHostTransitionStatus: ti,
  useFormState: fs,
  useActionState: fs,
  useOptimistic: function(l, t) {
    var u = nl();
    return V !== null ? c0(u, V, l, t) : (u.baseState = l, [l, u.queue.dispatch]);
  },
  useMemoCache: Fc,
  useCacheRefresh: O0
}, ju = null, ja = 0;
function Te(l) {
  var t = ja;
  return ja += 1, ju === null && (ju = []), kd(ju, l, t);
}
function oa(l, t) {
  t = t.props.ref, l.ref = t !== void 0 ? t : null;
}
function Ae(l, t) {
  throw t.$$typeof === mv ? Error(S(525)) : (l = Object.prototype.toString.call(t), Error(
    S(
      31,
      l === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : l
    )
  ));
}
function is(l) {
  var t = l._init;
  return t(l._payload);
}
function N0(l) {
  function t(d, s) {
    if (l) {
      var y = d.deletions;
      y === null ? (d.deletions = [s], d.flags |= 16) : y.push(s);
    }
  }
  function u(d, s) {
    if (!l) return null;
    for (; s !== null; )
      t(d, s), s = s.sibling;
    return null;
  }
  function a(d) {
    for (var s = /* @__PURE__ */ new Map(); d !== null; )
      d.key !== null ? s.set(d.key, d) : s.set(d.index, d), d = d.sibling;
    return s;
  }
  function e(d, s) {
    return d = rt(d, s), d.index = 0, d.sibling = null, d;
  }
  function n(d, s, y) {
    return d.index = y, l ? (y = d.alternate, y !== null ? (y = y.index, y < s ? (d.flags |= 67108866, s) : y) : (d.flags |= 67108866, s)) : (d.flags |= 1048576, s);
  }
  function f(d) {
    return l && d.alternate === null && (d.flags |= 67108866), d;
  }
  function c(d, s, y, g) {
    return s === null || s.tag !== 6 ? (s = lf(y, d.mode, g), s.return = d, s) : (s = e(s, y), s.return = d, s);
  }
  function i(d, s, y, g) {
    var T = y.type;
    return T === Au ? m(
      d,
      s,
      y.props.children,
      g,
      y.key
    ) : s !== null && (s.elementType === T || typeof T == "object" && T !== null && T.$$typeof === Ot && is(T) === s.type) ? (s = e(s, y.props), oa(s, y), s.return = d, s) : (s = He(
      y.type,
      y.key,
      y.props,
      null,
      d.mode,
      g
    ), oa(s, y), s.return = d, s);
  }
  function o(d, s, y, g) {
    return s === null || s.tag !== 4 || s.stateNode.containerInfo !== y.containerInfo || s.stateNode.implementation !== y.implementation ? (s = tf(y, d.mode, g), s.return = d, s) : (s = e(s, y.children || []), s.return = d, s);
  }
  function m(d, s, y, g, T) {
    return s === null || s.tag !== 7 ? (s = uu(
      y,
      d.mode,
      g,
      T
    ), s.return = d, s) : (s = e(s, y), s.return = d, s);
  }
  function r(d, s, y) {
    if (typeof s == "string" && s !== "" || typeof s == "number" || typeof s == "bigint")
      return s = lf(
        "" + s,
        d.mode,
        y
      ), s.return = d, s;
    if (typeof s == "object" && s !== null) {
      switch (s.$$typeof) {
        case he:
          return y = He(
            s.type,
            s.key,
            s.props,
            null,
            d.mode,
            y
          ), oa(y, s), y.return = d, y;
        case ra:
          return s = tf(
            s,
            d.mode,
            y
          ), s.return = d, s;
        case Ot:
          var g = s._init;
          return s = g(s._payload), r(d, s, y);
      }
      if (ma(s) || ca(s))
        return s = uu(
          s,
          d.mode,
          y,
          null
        ), s.return = d, s;
      if (typeof s.then == "function")
        return r(d, Te(s), y);
      if (s.$$typeof === dt)
        return r(
          d,
          be(d, s),
          y
        );
      Ae(d, s);
    }
    return null;
  }
  function v(d, s, y, g) {
    var T = s !== null ? s.key : null;
    if (typeof y == "string" && y !== "" || typeof y == "number" || typeof y == "bigint")
      return T !== null ? null : c(d, s, "" + y, g);
    if (typeof y == "object" && y !== null) {
      switch (y.$$typeof) {
        case he:
          return y.key === T ? i(d, s, y, g) : null;
        case ra:
          return y.key === T ? o(d, s, y, g) : null;
        case Ot:
          return T = y._init, y = T(y._payload), v(d, s, y, g);
      }
      if (ma(y) || ca(y))
        return T !== null ? null : m(d, s, y, g, null);
      if (typeof y.then == "function")
        return v(
          d,
          s,
          Te(y),
          g
        );
      if (y.$$typeof === dt)
        return v(
          d,
          s,
          be(d, y),
          g
        );
      Ae(d, y);
    }
    return null;
  }
  function h(d, s, y, g, T) {
    if (typeof g == "string" && g !== "" || typeof g == "number" || typeof g == "bigint")
      return d = d.get(y) || null, c(s, d, "" + g, T);
    if (typeof g == "object" && g !== null) {
      switch (g.$$typeof) {
        case he:
          return d = d.get(
            g.key === null ? y : g.key
          ) || null, i(s, d, g, T);
        case ra:
          return d = d.get(
            g.key === null ? y : g.key
          ) || null, o(s, d, g, T);
        case Ot:
          var U = g._init;
          return g = U(g._payload), h(
            d,
            s,
            y,
            g,
            T
          );
      }
      if (ma(g) || ca(g))
        return d = d.get(y) || null, m(s, d, g, T, null);
      if (typeof g.then == "function")
        return h(
          d,
          s,
          y,
          Te(g),
          T
        );
      if (g.$$typeof === dt)
        return h(
          d,
          s,
          y,
          be(s, g),
          T
        );
      Ae(s, g);
    }
    return null;
  }
  function O(d, s, y, g) {
    for (var T = null, U = null, A = s, M = s = 0, b = null; A !== null && M < y.length; M++) {
      A.index > M ? (b = A, A = null) : b = A.sibling;
      var _ = v(
        d,
        A,
        y[M],
        g
      );
      if (_ === null) {
        A === null && (A = b);
        break;
      }
      l && A && _.alternate === null && t(d, A), s = n(_, s, M), U === null ? T = _ : U.sibling = _, U = _, A = b;
    }
    if (M === y.length)
      return u(d, A), X && Pt(d, M), T;
    if (A === null) {
      for (; M < y.length; M++)
        A = r(d, y[M], g), A !== null && (s = n(
          A,
          s,
          M
        ), U === null ? T = A : U.sibling = A, U = A);
      return X && Pt(d, M), T;
    }
    for (A = a(A); M < y.length; M++)
      b = h(
        A,
        d,
        M,
        y[M],
        g
      ), b !== null && (l && b.alternate !== null && A.delete(
        b.key === null ? M : b.key
      ), s = n(
        b,
        s,
        M
      ), U === null ? T = b : U.sibling = b, U = b);
    return l && A.forEach(function(q) {
      return t(d, q);
    }), X && Pt(d, M), T;
  }
  function z(d, s, y, g) {
    if (y == null) throw Error(S(151));
    for (var T = null, U = null, A = s, M = s = 0, b = null, _ = y.next(); A !== null && !_.done; M++, _ = y.next()) {
      A.index > M ? (b = A, A = null) : b = A.sibling;
      var q = v(d, A, _.value, g);
      if (q === null) {
        A === null && (A = b);
        break;
      }
      l && A && q.alternate === null && t(d, A), s = n(q, s, M), U === null ? T = q : U.sibling = q, U = q, A = b;
    }
    if (_.done)
      return u(d, A), X && Pt(d, M), T;
    if (A === null) {
      for (; !_.done; M++, _ = y.next())
        _ = r(d, _.value, g), _ !== null && (s = n(_, s, M), U === null ? T = _ : U.sibling = _, U = _);
      return X && Pt(d, M), T;
    }
    for (A = a(A); !_.done; M++, _ = y.next())
      _ = h(A, d, M, _.value, g), _ !== null && (l && _.alternate !== null && A.delete(_.key === null ? M : _.key), s = n(_, s, M), U === null ? T = _ : U.sibling = _, U = _);
    return l && A.forEach(function(L) {
      return t(d, L);
    }), X && Pt(d, M), T;
  }
  function B(d, s, y, g) {
    if (typeof y == "object" && y !== null && y.type === Au && y.key === null && (y = y.props.children), typeof y == "object" && y !== null) {
      switch (y.$$typeof) {
        case he:
          l: {
            for (var T = y.key; s !== null; ) {
              if (s.key === T) {
                if (T = y.type, T === Au) {
                  if (s.tag === 7) {
                    u(
                      d,
                      s.sibling
                    ), g = e(
                      s,
                      y.props.children
                    ), g.return = d, d = g;
                    break l;
                  }
                } else if (s.elementType === T || typeof T == "object" && T !== null && T.$$typeof === Ot && is(T) === s.type) {
                  u(
                    d,
                    s.sibling
                  ), g = e(s, y.props), oa(g, y), g.return = d, d = g;
                  break l;
                }
                u(d, s);
                break;
              } else t(d, s);
              s = s.sibling;
            }
            y.type === Au ? (g = uu(
              y.props.children,
              d.mode,
              g,
              y.key
            ), g.return = d, d = g) : (g = He(
              y.type,
              y.key,
              y.props,
              null,
              d.mode,
              g
            ), oa(g, y), g.return = d, d = g);
          }
          return f(d);
        case ra:
          l: {
            for (T = y.key; s !== null; ) {
              if (s.key === T)
                if (s.tag === 4 && s.stateNode.containerInfo === y.containerInfo && s.stateNode.implementation === y.implementation) {
                  u(
                    d,
                    s.sibling
                  ), g = e(s, y.children || []), g.return = d, d = g;
                  break l;
                } else {
                  u(d, s);
                  break;
                }
              else t(d, s);
              s = s.sibling;
            }
            g = tf(y, d.mode, g), g.return = d, d = g;
          }
          return f(d);
        case Ot:
          return T = y._init, y = T(y._payload), B(
            d,
            s,
            y,
            g
          );
      }
      if (ma(y))
        return O(
          d,
          s,
          y,
          g
        );
      if (ca(y)) {
        if (T = ca(y), typeof T != "function") throw Error(S(150));
        return y = T.call(y), z(
          d,
          s,
          y,
          g
        );
      }
      if (typeof y.then == "function")
        return B(
          d,
          s,
          Te(y),
          g
        );
      if (y.$$typeof === dt)
        return B(
          d,
          s,
          be(d, y),
          g
        );
      Ae(d, y);
    }
    return typeof y == "string" && y !== "" || typeof y == "number" || typeof y == "bigint" ? (y = "" + y, s !== null && s.tag === 6 ? (u(d, s.sibling), g = e(s, y), g.return = d, d = g) : (u(d, s), g = lf(y, d.mode, g), g.return = d, d = g), f(d)) : u(d, s);
  }
  return function(d, s, y, g) {
    try {
      ja = 0;
      var T = B(
        d,
        s,
        y,
        g
      );
      return ju = null, T;
    } catch (A) {
      if (A === ae || A === pn) throw A;
      var U = Hl(29, A, null, d.mode);
      return U.lanes = g, U.return = d, U;
    } finally {
    }
  };
}
var $u = N0(!0), H0 = N0(!1), Jl = at(null), ut = null;
function pt(l) {
  var t = l.alternate;
  F(cl, cl.current & 1), F(Jl, l), ut === null && (t === null || Ju.current !== null || t.memoizedState !== null) && (ut = l);
}
function x0(l) {
  if (l.tag === 22) {
    if (F(cl, cl.current), F(Jl, l), ut === null) {
      var t = l.alternate;
      t !== null && t.memoizedState !== null && (ut = l);
    }
  } else Ut();
}
function Ut() {
  F(cl, cl.current), F(Jl, Jl.current);
}
function ht(l) {
  yl(Jl), ut === l && (ut = null), yl(cl);
}
var cl = at(0);
function tn(l) {
  for (var t = l; t !== null; ) {
    if (t.tag === 13) {
      var u = t.memoizedState;
      if (u !== null && (u = u.dehydrated, u === null || u.data === "$?" || yc(u)))
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      t.child.return = t, t = t.child;
      continue;
    }
    if (t === l) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === l) return null;
      t = t.return;
    }
    t.sibling.return = t.return, t = t.sibling;
  }
  return null;
}
function ef(l, t, u, a) {
  t = l.memoizedState, u = u(a, t), u = u == null ? t : $({}, t, u), l.memoizedState = u, l.lanes === 0 && (l.updateQueue.baseState = u);
}
var Ff = {
  enqueueSetState: function(l, t, u) {
    l = l._reactInternals;
    var a = Bl(), e = qt(a);
    e.payload = t, u != null && (e.callback = u), t = Gt(l, e, a), t !== null && (ql(t, l, a), Oa(t, l, a));
  },
  enqueueReplaceState: function(l, t, u) {
    l = l._reactInternals;
    var a = Bl(), e = qt(a);
    e.tag = 1, e.payload = t, u != null && (e.callback = u), t = Gt(l, e, a), t !== null && (ql(t, l, a), Oa(t, l, a));
  },
  enqueueForceUpdate: function(l, t) {
    l = l._reactInternals;
    var u = Bl(), a = qt(u);
    a.tag = 2, t != null && (a.callback = t), t = Gt(l, a, u), t !== null && (ql(t, l, u), Oa(t, l, u));
  }
};
function ss(l, t, u, a, e, n, f) {
  return l = l.stateNode, typeof l.shouldComponentUpdate == "function" ? l.shouldComponentUpdate(a, n, f) : t.prototype && t.prototype.isPureReactComponent ? !Ga(u, a) || !Ga(e, n) : !0;
}
function ds(l, t, u, a) {
  l = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(u, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(u, a), t.state !== l && Ff.enqueueReplaceState(t, t.state, null);
}
function ou(l, t) {
  var u = t;
  if ("ref" in t) {
    u = {};
    for (var a in t)
      a !== "ref" && (u[a] = t[a]);
  }
  if (l = l.defaultProps) {
    u === t && (u = $({}, u));
    for (var e in l)
      u[e] === void 0 && (u[e] = l[e]);
  }
  return u;
}
var un = typeof reportError == "function" ? reportError : function(l) {
  if (typeof window == "object" && typeof window.ErrorEvent == "function") {
    var t = new window.ErrorEvent("error", {
      bubbles: !0,
      cancelable: !0,
      message: typeof l == "object" && l !== null && typeof l.message == "string" ? String(l.message) : String(l),
      error: l
    });
    if (!window.dispatchEvent(t)) return;
  } else if (typeof Cn == "object" && typeof Cn.emit == "function") {
    Cn.emit("uncaughtException", l);
    return;
  }
  console.error(l);
};
function Y0(l) {
  un(l);
}
function B0(l) {
  console.error(l);
}
function q0(l) {
  un(l);
}
function an(l, t) {
  try {
    var u = l.onUncaughtError;
    u(t.value, { componentStack: t.stack });
  } catch (a) {
    setTimeout(function() {
      throw a;
    });
  }
}
function os(l, t, u) {
  try {
    var a = l.onCaughtError;
    a(u.value, {
      componentStack: u.stack,
      errorBoundary: t.tag === 1 ? t.stateNode : null
    });
  } catch (e) {
    setTimeout(function() {
      throw e;
    });
  }
}
function If(l, t, u) {
  return u = qt(u), u.tag = 3, u.payload = { element: null }, u.callback = function() {
    an(l, t);
  }, u;
}
function G0(l) {
  return l = qt(l), l.tag = 3, l;
}
function X0(l, t, u, a) {
  var e = u.type.getDerivedStateFromError;
  if (typeof e == "function") {
    var n = a.value;
    l.payload = function() {
      return e(n);
    }, l.callback = function() {
      os(t, u, a);
    };
  }
  var f = u.stateNode;
  f !== null && typeof f.componentDidCatch == "function" && (l.callback = function() {
    os(t, u, a), typeof e != "function" && (Xt === null ? Xt = /* @__PURE__ */ new Set([this]) : Xt.add(this));
    var c = a.stack;
    this.componentDidCatch(a.value, {
      componentStack: c !== null ? c : ""
    });
  });
}
function Cy(l, t, u, a, e) {
  if (u.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
    if (t = u.alternate, t !== null && te(
      t,
      u,
      e,
      !0
    ), u = Jl.current, u !== null) {
      switch (u.tag) {
        case 13:
          return ut === null ? fc() : u.alternate === null && ll === 0 && (ll = 3), u.flags &= -257, u.flags |= 65536, u.lanes = e, a === Kf ? u.flags |= 16384 : (t = u.updateQueue, t === null ? u.updateQueue = /* @__PURE__ */ new Set([a]) : t.add(a), mf(l, a, e)), !1;
        case 22:
          return u.flags |= 65536, a === Kf ? u.flags |= 16384 : (t = u.updateQueue, t === null ? (t = {
            transitions: null,
            markerInstances: null,
            retryQueue: /* @__PURE__ */ new Set([a])
          }, u.updateQueue = t) : (u = t.retryQueue, u === null ? t.retryQueue = /* @__PURE__ */ new Set([a]) : u.add(a)), mf(l, a, e)), !1;
      }
      throw Error(S(435, u.tag));
    }
    return mf(l, a, e), fc(), !1;
  }
  if (X)
    return t = Jl.current, t !== null ? (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = e, a !== Qf && (l = Error(S(422), { cause: a }), Xa(Kl(l, u)))) : (a !== Qf && (t = Error(S(423), {
      cause: a
    }), Xa(
      Kl(t, u)
    )), l = l.current.alternate, l.flags |= 65536, e &= -e, l.lanes |= e, a = Kl(a, u), e = If(
      l.stateNode,
      a,
      e
    ), uf(l, e), ll !== 4 && (ll = 2)), !1;
  var n = Error(S(520), { cause: a });
  if (n = Kl(n, u), Na === null ? Na = [n] : Na.push(n), ll !== 4 && (ll = 2), t === null) return !0;
  a = Kl(a, u), u = t;
  do {
    switch (u.tag) {
      case 3:
        return u.flags |= 65536, l = e & -e, u.lanes |= l, l = If(u.stateNode, a, l), uf(u, l), !1;
      case 1:
        if (t = u.type, n = u.stateNode, (u.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || n !== null && typeof n.componentDidCatch == "function" && (Xt === null || !Xt.has(n))))
          return u.flags |= 65536, e &= -e, u.lanes |= e, e = G0(e), X0(
            e,
            l,
            u,
            a
          ), uf(u, e), !1;
    }
    u = u.return;
  } while (u !== null);
  return !1;
}
var Q0 = Error(S(461)), vl = !1;
function rl(l, t, u, a) {
  t.child = l === null ? H0(t, null, u, a) : $u(
    t,
    l.child,
    u,
    a
  );
}
function vs(l, t, u, a, e) {
  u = u.render;
  var n = t.ref;
  if ("ref" in a) {
    var f = {};
    for (var c in a)
      c !== "ref" && (f[c] = a[c]);
  } else f = a;
  return su(t), a = Jc(
    l,
    t,
    u,
    f,
    n,
    e
  ), c = wc(), l !== null && !vl ? ($c(l, t, e), bt(l, t, e)) : (X && c && Qc(t), t.flags |= 1, rl(l, t, a, e), t.child);
}
function ys(l, t, u, a, e) {
  if (l === null) {
    var n = u.type;
    return typeof n == "function" && !Xc(n) && n.defaultProps === void 0 && u.compare === null ? (t.tag = 15, t.type = n, j0(
      l,
      t,
      n,
      a,
      e
    )) : (l = He(
      u.type,
      null,
      a,
      t,
      t.mode,
      e
    ), l.ref = t.ref, l.return = t, t.child = l);
  }
  if (n = l.child, !ai(l, e)) {
    var f = n.memoizedProps;
    if (u = u.compare, u = u !== null ? u : Ga, u(f, a) && l.ref === t.ref)
      return bt(l, t, e);
  }
  return t.flags |= 1, l = rt(n, a), l.ref = t.ref, l.return = t, t.child = l;
}
function j0(l, t, u, a, e) {
  if (l !== null) {
    var n = l.memoizedProps;
    if (Ga(n, a) && l.ref === t.ref)
      if (vl = !1, t.pendingProps = a = n, ai(l, e))
        l.flags & 131072 && (vl = !0);
      else
        return t.lanes = l.lanes, bt(l, t, e);
  }
  return Pf(
    l,
    t,
    u,
    a,
    e
  );
}
function C0(l, t, u) {
  var a = t.pendingProps, e = a.children, n = l !== null ? l.memoizedState : null;
  if (a.mode === "hidden") {
    if (t.flags & 128) {
      if (a = n !== null ? n.baseLanes | u : u, l !== null) {
        for (e = t.child = l.child, n = 0; e !== null; )
          n = n | e.lanes | e.childLanes, e = e.sibling;
        t.childLanes = n & ~a;
      } else t.childLanes = 0, t.child = null;
      return hs(
        l,
        t,
        a,
        u
      );
    }
    if (u & 536870912)
      t.memoizedState = { baseLanes: 0, cachePool: null }, l !== null && xe(
        t,
        n !== null ? n.cachePool : null
      ), n !== null ? ts(t, n) : wf(), x0(t);
    else
      return t.lanes = t.childLanes = 536870912, hs(
        l,
        t,
        n !== null ? n.baseLanes | u : u,
        u
      );
  } else
    n !== null ? (xe(t, n.cachePool), ts(t, n), Ut(), t.memoizedState = null) : (l !== null && xe(t, null), wf(), Ut());
  return rl(l, t, e, u), t.child;
}
function hs(l, t, u, a) {
  var e = Zc();
  return e = e === null ? null : { parent: fl._currentValue, pool: e }, t.memoizedState = {
    baseLanes: u,
    cachePool: e
  }, l !== null && xe(t, null), wf(), x0(t), l !== null && te(l, t, a, !0), null;
}
function qe(l, t) {
  var u = t.ref;
  if (u === null)
    l !== null && l.ref !== null && (t.flags |= 4194816);
  else {
    if (typeof u != "function" && typeof u != "object")
      throw Error(S(284));
    (l === null || l.ref !== u) && (t.flags |= 4194816);
  }
}
function Pf(l, t, u, a, e) {
  return su(t), u = Jc(
    l,
    t,
    u,
    a,
    void 0,
    e
  ), a = wc(), l !== null && !vl ? ($c(l, t, e), bt(l, t, e)) : (X && a && Qc(t), t.flags |= 1, rl(l, t, u, e), t.child);
}
function rs(l, t, u, a, e, n) {
  return su(t), t.updateQueue = null, u = l0(
    t,
    a,
    u,
    e
  ), Pd(l), a = wc(), l !== null && !vl ? ($c(l, t, n), bt(l, t, n)) : (X && a && Qc(t), t.flags |= 1, rl(l, t, u, n), t.child);
}
function ms(l, t, u, a, e) {
  if (su(t), t.stateNode === null) {
    var n = Ru, f = u.contextType;
    typeof f == "object" && f !== null && (n = El(f)), n = new u(a, n), t.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null, n.updater = Ff, t.stateNode = n, n._reactInternals = t, n = t.stateNode, n.props = a, n.state = t.memoizedState, n.refs = {}, Vc(t), f = u.contextType, n.context = typeof f == "object" && f !== null ? El(f) : Ru, n.state = t.memoizedState, f = u.getDerivedStateFromProps, typeof f == "function" && (ef(
      t,
      u,
      f,
      a
    ), n.state = t.memoizedState), typeof u.getDerivedStateFromProps == "function" || typeof n.getSnapshotBeforeUpdate == "function" || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (f = n.state, typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount(), f !== n.state && Ff.enqueueReplaceState(n, n.state, null), Da(t, a, n, e), Ma(), n.state = t.memoizedState), typeof n.componentDidMount == "function" && (t.flags |= 4194308), a = !0;
  } else if (l === null) {
    n = t.stateNode;
    var c = t.memoizedProps, i = ou(u, c);
    n.props = i;
    var o = n.context, m = u.contextType;
    f = Ru, typeof m == "object" && m !== null && (f = El(m));
    var r = u.getDerivedStateFromProps;
    m = typeof r == "function" || typeof n.getSnapshotBeforeUpdate == "function", c = t.pendingProps !== c, m || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (c || o !== f) && ds(
      t,
      n,
      a,
      f
    ), Mt = !1;
    var v = t.memoizedState;
    n.state = v, Da(t, a, n, e), Ma(), o = t.memoizedState, c || v !== o || Mt ? (typeof r == "function" && (ef(
      t,
      u,
      r,
      a
    ), o = t.memoizedState), (i = Mt || ss(
      t,
      u,
      i,
      a,
      v,
      o,
      f
    )) ? (m || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount()), typeof n.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof n.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = a, t.memoizedState = o), n.props = a, n.state = o, n.context = f, a = i) : (typeof n.componentDidMount == "function" && (t.flags |= 4194308), a = !1);
  } else {
    n = t.stateNode, Lf(l, t), f = t.memoizedProps, m = ou(u, f), n.props = m, r = t.pendingProps, v = n.context, o = u.contextType, i = Ru, typeof o == "object" && o !== null && (i = El(o)), c = u.getDerivedStateFromProps, (o = typeof c == "function" || typeof n.getSnapshotBeforeUpdate == "function") || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (f !== r || v !== i) && ds(
      t,
      n,
      a,
      i
    ), Mt = !1, v = t.memoizedState, n.state = v, Da(t, a, n, e), Ma();
    var h = t.memoizedState;
    f !== r || v !== h || Mt || l !== null && l.dependencies !== null && ke(l.dependencies) ? (typeof c == "function" && (ef(
      t,
      u,
      c,
      a
    ), h = t.memoizedState), (m = Mt || ss(
      t,
      u,
      m,
      a,
      v,
      h,
      i
    ) || l !== null && l.dependencies !== null && ke(l.dependencies)) ? (o || typeof n.UNSAFE_componentWillUpdate != "function" && typeof n.componentWillUpdate != "function" || (typeof n.componentWillUpdate == "function" && n.componentWillUpdate(a, h, i), typeof n.UNSAFE_componentWillUpdate == "function" && n.UNSAFE_componentWillUpdate(
      a,
      h,
      i
    )), typeof n.componentDidUpdate == "function" && (t.flags |= 4), typeof n.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof n.componentDidUpdate != "function" || f === l.memoizedProps && v === l.memoizedState || (t.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || f === l.memoizedProps && v === l.memoizedState || (t.flags |= 1024), t.memoizedProps = a, t.memoizedState = h), n.props = a, n.state = h, n.context = i, a = m) : (typeof n.componentDidUpdate != "function" || f === l.memoizedProps && v === l.memoizedState || (t.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || f === l.memoizedProps && v === l.memoizedState || (t.flags |= 1024), a = !1);
  }
  return n = a, qe(l, t), a = (t.flags & 128) !== 0, n || a ? (n = t.stateNode, u = a && typeof u.getDerivedStateFromError != "function" ? null : n.render(), t.flags |= 1, l !== null && a ? (t.child = $u(
    t,
    l.child,
    null,
    e
  ), t.child = $u(
    t,
    null,
    u,
    e
  )) : rl(l, t, u, e), t.memoizedState = n.state, l = t.child) : l = bt(
    l,
    t,
    e
  ), l;
}
function gs(l, t, u, a) {
  return le(), t.flags |= 256, rl(l, t, u, a), t.child;
}
var nf = {
  dehydrated: null,
  treeContext: null,
  retryLane: 0,
  hydrationErrors: null
};
function ff(l) {
  return { baseLanes: l, cachePool: $d() };
}
function cf(l, t, u) {
  return l = l !== null ? l.childLanes & ~u : 0, t && (l |= Ll), l;
}
function Z0(l, t, u) {
  var a = t.pendingProps, e = !1, n = (t.flags & 128) !== 0, f;
  if ((f = n) || (f = l !== null && l.memoizedState === null ? !1 : (cl.current & 2) !== 0), f && (e = !0, t.flags &= -129), f = (t.flags & 32) !== 0, t.flags &= -33, l === null) {
    if (X) {
      if (e ? pt(t) : Ut(), X) {
        var c = P, i;
        if (i = c) {
          l: {
            for (i = c, c = Il; i.nodeType !== 8; ) {
              if (!c) {
                c = null;
                break l;
              }
              if (i = Wl(
                i.nextSibling
              ), i === null) {
                c = null;
                break l;
              }
            }
            c = i;
          }
          c !== null ? (t.memoizedState = {
            dehydrated: c,
            treeContext: au !== null ? { id: ot, overflow: vt } : null,
            retryLane: 536870912,
            hydrationErrors: null
          }, i = Hl(
            18,
            null,
            null,
            0
          ), i.stateNode = c, i.return = t, t.child = i, Tl = t, P = null, i = !0) : i = !1;
        }
        i || iu(t);
      }
      if (c = t.memoizedState, c !== null && (c = c.dehydrated, c !== null))
        return yc(c) ? t.lanes = 32 : t.lanes = 536870912, null;
      ht(t);
    }
    return c = a.children, a = a.fallback, e ? (Ut(), e = t.mode, c = en(
      { mode: "hidden", children: c },
      e
    ), a = uu(
      a,
      e,
      u,
      null
    ), c.return = t, a.return = t, c.sibling = a, t.child = c, e = t.child, e.memoizedState = ff(u), e.childLanes = cf(
      l,
      f,
      u
    ), t.memoizedState = nf, a) : (pt(t), lc(t, c));
  }
  if (i = l.memoizedState, i !== null && (c = i.dehydrated, c !== null)) {
    if (n)
      t.flags & 256 ? (pt(t), t.flags &= -257, t = sf(
        l,
        t,
        u
      )) : t.memoizedState !== null ? (Ut(), t.child = l.child, t.flags |= 128, t = null) : (Ut(), e = a.fallback, c = t.mode, a = en(
        { mode: "visible", children: a.children },
        c
      ), e = uu(
        e,
        c,
        u,
        null
      ), e.flags |= 2, a.return = t, e.return = t, a.sibling = e, t.child = a, $u(
        t,
        l.child,
        null,
        u
      ), a = t.child, a.memoizedState = ff(u), a.childLanes = cf(
        l,
        f,
        u
      ), t.memoizedState = nf, t = e);
    else if (pt(t), yc(c)) {
      if (f = c.nextSibling && c.nextSibling.dataset, f) var o = f.dgst;
      f = o, a = Error(S(419)), a.stack = "", a.digest = f, Xa({ value: a, source: null, stack: null }), t = sf(
        l,
        t,
        u
      );
    } else if (vl || te(l, t, u, !1), f = (u & l.childLanes) !== 0, vl || f) {
      if (f = J, f !== null && (a = u & -u, a = a & 42 ? 1 : Dc(a), a = a & (f.suspendedLanes | u) ? 0 : a, a !== 0 && a !== i.retryLane))
        throw i.retryLane = a, aa(l, a), ql(f, l, a), Q0;
      c.data === "$?" || fc(), t = sf(
        l,
        t,
        u
      );
    } else
      c.data === "$?" ? (t.flags |= 192, t.child = l.child, t = null) : (l = i.treeContext, P = Wl(
        c.nextSibling
      ), Tl = t, X = !0, eu = null, Il = !1, l !== null && (Cl[Zl++] = ot, Cl[Zl++] = vt, Cl[Zl++] = au, ot = l.id, vt = l.overflow, au = t), t = lc(
        t,
        a.children
      ), t.flags |= 4096);
    return t;
  }
  return e ? (Ut(), e = a.fallback, c = t.mode, i = l.child, o = i.sibling, a = rt(i, {
    mode: "hidden",
    children: a.children
  }), a.subtreeFlags = i.subtreeFlags & 65011712, o !== null ? e = rt(o, e) : (e = uu(
    e,
    c,
    u,
    null
  ), e.flags |= 2), e.return = t, a.return = t, a.sibling = e, t.child = a, a = e, e = t.child, c = l.child.memoizedState, c === null ? c = ff(u) : (i = c.cachePool, i !== null ? (o = fl._currentValue, i = i.parent !== o ? { parent: o, pool: o } : i) : i = $d(), c = {
    baseLanes: c.baseLanes | u,
    cachePool: i
  }), e.memoizedState = c, e.childLanes = cf(
    l,
    f,
    u
  ), t.memoizedState = nf, a) : (pt(t), u = l.child, l = u.sibling, u = rt(u, {
    mode: "visible",
    children: a.children
  }), u.return = t, u.sibling = null, l !== null && (f = t.deletions, f === null ? (t.deletions = [l], t.flags |= 16) : f.push(l)), t.child = u, t.memoizedState = null, u);
}
function lc(l, t) {
  return t = en(
    { mode: "visible", children: t },
    l.mode
  ), t.return = l, l.child = t;
}
function en(l, t) {
  return l = Hl(22, l, null, t), l.lanes = 0, l.stateNode = {
    _visibility: 1,
    _pendingMarkers: null,
    _retryCache: null,
    _transitions: null
  }, l;
}
function sf(l, t, u) {
  return $u(t, l.child, null, u), l = lc(
    t,
    t.pendingProps.children
  ), l.flags |= 2, t.memoizedState = null, l;
}
function Ss(l, t, u) {
  l.lanes |= t;
  var a = l.alternate;
  a !== null && (a.lanes |= t), Cf(l.return, t, u);
}
function df(l, t, u, a, e) {
  var n = l.memoizedState;
  n === null ? l.memoizedState = {
    isBackwards: t,
    rendering: null,
    renderingStartTime: 0,
    last: a,
    tail: u,
    tailMode: e
  } : (n.isBackwards = t, n.rendering = null, n.renderingStartTime = 0, n.last = a, n.tail = u, n.tailMode = e);
}
function V0(l, t, u) {
  var a = t.pendingProps, e = a.revealOrder, n = a.tail;
  if (rl(l, t, a.children, u), a = cl.current, a & 2)
    a = a & 1 | 2, t.flags |= 128;
  else {
    if (l !== null && l.flags & 128)
      l: for (l = t.child; l !== null; ) {
        if (l.tag === 13)
          l.memoizedState !== null && Ss(l, u, t);
        else if (l.tag === 19)
          Ss(l, u, t);
        else if (l.child !== null) {
          l.child.return = l, l = l.child;
          continue;
        }
        if (l === t) break l;
        for (; l.sibling === null; ) {
          if (l.return === null || l.return === t)
            break l;
          l = l.return;
        }
        l.sibling.return = l.return, l = l.sibling;
      }
    a &= 1;
  }
  switch (F(cl, a), e) {
    case "forwards":
      for (u = t.child, e = null; u !== null; )
        l = u.alternate, l !== null && tn(l) === null && (e = u), u = u.sibling;
      u = e, u === null ? (e = t.child, t.child = null) : (e = u.sibling, u.sibling = null), df(
        t,
        !1,
        e,
        u,
        n
      );
      break;
    case "backwards":
      for (u = null, e = t.child, t.child = null; e !== null; ) {
        if (l = e.alternate, l !== null && tn(l) === null) {
          t.child = e;
          break;
        }
        l = e.sibling, e.sibling = u, u = e, e = l;
      }
      df(
        t,
        !0,
        u,
        null,
        n
      );
      break;
    case "together":
      df(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function bt(l, t, u) {
  if (l !== null && (t.dependencies = l.dependencies), Lt |= t.lanes, !(u & t.childLanes))
    if (l !== null) {
      if (te(
        l,
        t,
        u,
        !1
      ), (u & t.childLanes) === 0)
        return null;
    } else return null;
  if (l !== null && t.child !== l.child)
    throw Error(S(153));
  if (t.child !== null) {
    for (l = t.child, u = rt(l, l.pendingProps), t.child = u, u.return = t; l.sibling !== null; )
      l = l.sibling, u = u.sibling = rt(l, l.pendingProps), u.return = t;
    u.sibling = null;
  }
  return t.child;
}
function ai(l, t) {
  return l.lanes & t ? !0 : (l = l.dependencies, !!(l !== null && ke(l)));
}
function Zy(l, t, u) {
  switch (t.tag) {
    case 3:
      Ze(t, t.stateNode.containerInfo), Dt(t, fl, l.memoizedState.cache), le();
      break;
    case 27:
    case 5:
      Uf(t);
      break;
    case 4:
      Ze(t, t.stateNode.containerInfo);
      break;
    case 10:
      Dt(
        t,
        t.type,
        t.memoizedProps.value
      );
      break;
    case 13:
      var a = t.memoizedState;
      if (a !== null)
        return a.dehydrated !== null ? (pt(t), t.flags |= 128, null) : u & t.child.childLanes ? Z0(l, t, u) : (pt(t), l = bt(
          l,
          t,
          u
        ), l !== null ? l.sibling : null);
      pt(t);
      break;
    case 19:
      var e = (l.flags & 128) !== 0;
      if (a = (u & t.childLanes) !== 0, a || (te(
        l,
        t,
        u,
        !1
      ), a = (u & t.childLanes) !== 0), e) {
        if (a)
          return V0(
            l,
            t,
            u
          );
        t.flags |= 128;
      }
      if (e = t.memoizedState, e !== null && (e.rendering = null, e.tail = null, e.lastEffect = null), F(cl, cl.current), a) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, C0(l, t, u);
    case 24:
      Dt(t, fl, l.memoizedState.cache);
  }
  return bt(l, t, u);
}
function K0(l, t, u) {
  if (l !== null)
    if (l.memoizedProps !== t.pendingProps)
      vl = !0;
    else {
      if (!ai(l, u) && !(t.flags & 128))
        return vl = !1, Zy(
          l,
          t,
          u
        );
      vl = !!(l.flags & 131072);
    }
  else
    vl = !1, X && t.flags & 1048576 && Jd(t, We, t.index);
  switch (t.lanes = 0, t.tag) {
    case 16:
      l: {
        l = t.pendingProps;
        var a = t.elementType, e = a._init;
        if (a = e(a._payload), t.type = a, typeof a == "function")
          Xc(a) ? (l = ou(a, l), t.tag = 1, t = ms(
            null,
            t,
            a,
            l,
            u
          )) : (t.tag = 0, t = Pf(
            null,
            t,
            a,
            l,
            u
          ));
        else {
          if (a != null) {
            if (e = a.$$typeof, e === _c) {
              t.tag = 11, t = vs(
                null,
                t,
                a,
                l,
                u
              );
              break l;
            } else if (e === Oc) {
              t.tag = 14, t = ys(
                null,
                t,
                a,
                l,
                u
              );
              break l;
            }
          }
          throw t = Df(a) || a, Error(S(306, t, ""));
        }
      }
      return t;
    case 0:
      return Pf(
        l,
        t,
        t.type,
        t.pendingProps,
        u
      );
    case 1:
      return a = t.type, e = ou(
        a,
        t.pendingProps
      ), ms(
        l,
        t,
        a,
        e,
        u
      );
    case 3:
      l: {
        if (Ze(
          t,
          t.stateNode.containerInfo
        ), l === null) throw Error(S(387));
        a = t.pendingProps;
        var n = t.memoizedState;
        e = n.element, Lf(l, t), Da(t, a, null, u);
        var f = t.memoizedState;
        if (a = f.cache, Dt(t, fl, a), a !== n.cache && Zf(
          t,
          [fl],
          u,
          !0
        ), Ma(), a = f.element, n.isDehydrated)
          if (n = {
            element: a,
            isDehydrated: !1,
            cache: f.cache
          }, t.updateQueue.baseState = n, t.memoizedState = n, t.flags & 256) {
            t = gs(
              l,
              t,
              a,
              u
            );
            break l;
          } else if (a !== e) {
            e = Kl(
              Error(S(424)),
              t
            ), Xa(e), t = gs(
              l,
              t,
              a,
              u
            );
            break l;
          } else {
            switch (l = t.stateNode.containerInfo, l.nodeType) {
              case 9:
                l = l.body;
                break;
              default:
                l = l.nodeName === "HTML" ? l.ownerDocument.body : l;
            }
            for (P = Wl(l.firstChild), Tl = t, X = !0, eu = null, Il = !0, u = H0(
              t,
              null,
              a,
              u
            ), t.child = u; u; )
              u.flags = u.flags & -3 | 4096, u = u.sibling;
          }
        else {
          if (le(), a === e) {
            t = bt(
              l,
              t,
              u
            );
            break l;
          }
          rl(
            l,
            t,
            a,
            u
          );
        }
        t = t.child;
      }
      return t;
    case 26:
      return qe(l, t), l === null ? (u = Bs(
        t.type,
        null,
        t.pendingProps,
        null
      )) ? t.memoizedState = u : X || (u = t.type, l = t.pendingProps, a = vn(
        Bt.current
      ).createElement(u), a[bl] = t, a[Dl] = l, gl(a, u, l), ol(a), t.stateNode = a) : t.memoizedState = Bs(
        t.type,
        l.memoizedProps,
        t.pendingProps,
        l.memoizedState
      ), null;
    case 27:
      return Uf(t), l === null && X && (a = t.stateNode = No(
        t.type,
        t.pendingProps,
        Bt.current
      ), Tl = t, Il = !0, e = P, wt(t.type) ? (hc = e, P = Wl(
        a.firstChild
      )) : P = e), rl(
        l,
        t,
        t.pendingProps.children,
        u
      ), qe(l, t), l === null && (t.flags |= 4194304), t.child;
    case 5:
      return l === null && X && ((e = a = P) && (a = mh(
        a,
        t.type,
        t.pendingProps,
        Il
      ), a !== null ? (t.stateNode = a, Tl = t, P = Wl(
        a.firstChild
      ), Il = !1, e = !0) : e = !1), e || iu(t)), Uf(t), e = t.type, n = t.pendingProps, f = l !== null ? l.memoizedProps : null, a = n.children, oc(e, n) ? a = null : f !== null && oc(e, f) && (t.flags |= 32), t.memoizedState !== null && (e = Jc(
        l,
        t,
        Yy,
        null,
        null,
        u
      ), Ka._currentValue = e), qe(l, t), rl(l, t, a, u), t.child;
    case 6:
      return l === null && X && ((l = u = P) && (u = gh(
        u,
        t.pendingProps,
        Il
      ), u !== null ? (t.stateNode = u, Tl = t, P = null, l = !0) : l = !1), l || iu(t)), null;
    case 13:
      return Z0(l, t, u);
    case 4:
      return Ze(
        t,
        t.stateNode.containerInfo
      ), a = t.pendingProps, l === null ? t.child = $u(
        t,
        null,
        a,
        u
      ) : rl(
        l,
        t,
        a,
        u
      ), t.child;
    case 11:
      return vs(
        l,
        t,
        t.type,
        t.pendingProps,
        u
      );
    case 7:
      return rl(
        l,
        t,
        t.pendingProps,
        u
      ), t.child;
    case 8:
      return rl(
        l,
        t,
        t.pendingProps.children,
        u
      ), t.child;
    case 12:
      return rl(
        l,
        t,
        t.pendingProps.children,
        u
      ), t.child;
    case 10:
      return a = t.pendingProps, Dt(t, t.type, a.value), rl(
        l,
        t,
        a.children,
        u
      ), t.child;
    case 9:
      return e = t.type._context, a = t.pendingProps.children, su(t), e = El(e), a = a(e), t.flags |= 1, rl(l, t, a, u), t.child;
    case 14:
      return ys(
        l,
        t,
        t.type,
        t.pendingProps,
        u
      );
    case 15:
      return j0(
        l,
        t,
        t.type,
        t.pendingProps,
        u
      );
    case 19:
      return V0(l, t, u);
    case 31:
      return a = t.pendingProps, u = t.mode, a = {
        mode: a.mode,
        children: a.children
      }, l === null ? (u = en(
        a,
        u
      ), u.ref = t.ref, t.child = u, u.return = t, t = u) : (u = rt(l.child, a), u.ref = t.ref, t.child = u, u.return = t, t = u), t;
    case 22:
      return C0(l, t, u);
    case 24:
      return su(t), a = El(fl), l === null ? (e = Zc(), e === null && (e = J, n = Cc(), e.pooledCache = n, n.refCount++, n !== null && (e.pooledCacheLanes |= u), e = n), t.memoizedState = {
        parent: a,
        cache: e
      }, Vc(t), Dt(t, fl, e)) : (l.lanes & u && (Lf(l, t), Da(t, null, null, u), Ma()), e = l.memoizedState, n = t.memoizedState, e.parent !== a ? (e = { parent: a, cache: a }, t.memoizedState = e, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = e), Dt(t, fl, a)) : (a = n.cache, Dt(t, fl, a), a !== e.cache && Zf(
        t,
        [fl],
        u,
        !0
      ))), rl(
        l,
        t,
        t.pendingProps.children,
        u
      ), t.child;
    case 29:
      throw t.pendingProps;
  }
  throw Error(S(156, t.tag));
}
function ct(l) {
  l.flags |= 4;
}
function bs(l, t) {
  if (t.type !== "stylesheet" || t.state.loading & 4)
    l.flags &= -16777217;
  else if (l.flags |= 16777216, !Yo(t)) {
    if (t = Jl.current, t !== null && ((G & 4194048) === G ? ut !== null : (G & 62914560) !== G && !(G & 536870912) || t !== ut))
      throw _a = Kf, Wd;
    l.flags |= 8192;
  }
}
function ze(l, t) {
  t !== null && (l.flags |= 4), l.flags & 16384 && (t = l.tag !== 22 ? md() : 536870912, l.lanes |= t, Wu |= t);
}
function va(l, t) {
  if (!X)
    switch (l.tailMode) {
      case "hidden":
        t = l.tail;
        for (var u = null; t !== null; )
          t.alternate !== null && (u = t), t = t.sibling;
        u === null ? l.tail = null : u.sibling = null;
        break;
      case "collapsed":
        u = l.tail;
        for (var a = null; u !== null; )
          u.alternate !== null && (a = u), u = u.sibling;
        a === null ? t || l.tail === null ? l.tail = null : l.tail.sibling = null : a.sibling = null;
    }
}
function I(l) {
  var t = l.alternate !== null && l.alternate.child === l.child, u = 0, a = 0;
  if (t)
    for (var e = l.child; e !== null; )
      u |= e.lanes | e.childLanes, a |= e.subtreeFlags & 65011712, a |= e.flags & 65011712, e.return = l, e = e.sibling;
  else
    for (e = l.child; e !== null; )
      u |= e.lanes | e.childLanes, a |= e.subtreeFlags, a |= e.flags, e.return = l, e = e.sibling;
  return l.subtreeFlags |= a, l.childLanes = u, t;
}
function Vy(l, t, u) {
  var a = t.pendingProps;
  switch (jc(t), t.tag) {
    case 31:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return I(t), null;
    case 1:
      return I(t), null;
    case 3:
      return u = t.stateNode, a = null, l !== null && (a = l.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), mt(fl), Zu(), u.pendingContext && (u.context = u.pendingContext, u.pendingContext = null), (l === null || l.child === null) && (da(t) ? ct(t) : l === null || l.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Wi())), I(t), null;
    case 26:
      return u = t.memoizedState, l === null ? (ct(t), u !== null ? (I(t), bs(t, u)) : (I(t), t.flags &= -16777217)) : u ? u !== l.memoizedState ? (ct(t), I(t), bs(t, u)) : (I(t), t.flags &= -16777217) : (l.memoizedProps !== a && ct(t), I(t), t.flags &= -16777217), null;
    case 27:
      Ve(t), u = Bt.current;
      var e = t.type;
      if (l !== null && t.stateNode != null)
        l.memoizedProps !== a && ct(t);
      else {
        if (!a) {
          if (t.stateNode === null)
            throw Error(S(166));
          return I(t), null;
        }
        l = lt.current, da(t) ? wi(t) : (l = No(e, a, u), t.stateNode = l, ct(t));
      }
      return I(t), null;
    case 5:
      if (Ve(t), u = t.type, l !== null && t.stateNode != null)
        l.memoizedProps !== a && ct(t);
      else {
        if (!a) {
          if (t.stateNode === null)
            throw Error(S(166));
          return I(t), null;
        }
        if (l = lt.current, da(t))
          wi(t);
        else {
          switch (e = vn(
            Bt.current
          ), l) {
            case 1:
              l = e.createElementNS(
                "http://www.w3.org/2000/svg",
                u
              );
              break;
            case 2:
              l = e.createElementNS(
                "http://www.w3.org/1998/Math/MathML",
                u
              );
              break;
            default:
              switch (u) {
                case "svg":
                  l = e.createElementNS(
                    "http://www.w3.org/2000/svg",
                    u
                  );
                  break;
                case "math":
                  l = e.createElementNS(
                    "http://www.w3.org/1998/Math/MathML",
                    u
                  );
                  break;
                case "script":
                  l = e.createElement("div"), l.innerHTML = "<script><\/script>", l = l.removeChild(l.firstChild);
                  break;
                case "select":
                  l = typeof a.is == "string" ? e.createElement("select", { is: a.is }) : e.createElement("select"), a.multiple ? l.multiple = !0 : a.size && (l.size = a.size);
                  break;
                default:
                  l = typeof a.is == "string" ? e.createElement(u, { is: a.is }) : e.createElement(u);
              }
          }
          l[bl] = t, l[Dl] = a;
          l: for (e = t.child; e !== null; ) {
            if (e.tag === 5 || e.tag === 6)
              l.appendChild(e.stateNode);
            else if (e.tag !== 4 && e.tag !== 27 && e.child !== null) {
              e.child.return = e, e = e.child;
              continue;
            }
            if (e === t) break l;
            for (; e.sibling === null; ) {
              if (e.return === null || e.return === t)
                break l;
              e = e.return;
            }
            e.sibling.return = e.return, e = e.sibling;
          }
          t.stateNode = l;
          l: switch (gl(l, u, a), u) {
            case "button":
            case "input":
            case "select":
            case "textarea":
              l = !!a.autoFocus;
              break l;
            case "img":
              l = !0;
              break l;
            default:
              l = !1;
          }
          l && ct(t);
        }
      }
      return I(t), t.flags &= -16777217, null;
    case 6:
      if (l && t.stateNode != null)
        l.memoizedProps !== a && ct(t);
      else {
        if (typeof a != "string" && t.stateNode === null)
          throw Error(S(166));
        if (l = Bt.current, da(t)) {
          if (l = t.stateNode, u = t.memoizedProps, a = null, e = Tl, e !== null)
            switch (e.tag) {
              case 27:
              case 5:
                a = e.memoizedProps;
            }
          l[bl] = t, l = !!(l.nodeValue === u || a !== null && a.suppressHydrationWarning === !0 || po(l.nodeValue, u)), l || iu(t);
        } else
          l = vn(l).createTextNode(
            a
          ), l[bl] = t, t.stateNode = l;
      }
      return I(t), null;
    case 13:
      if (a = t.memoizedState, l === null || l.memoizedState !== null && l.memoizedState.dehydrated !== null) {
        if (e = da(t), a !== null && a.dehydrated !== null) {
          if (l === null) {
            if (!e) throw Error(S(318));
            if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(S(317));
            e[bl] = t;
          } else
            le(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          I(t), e = !1;
        } else
          e = Wi(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = e), e = !0;
        if (!e)
          return t.flags & 256 ? (ht(t), t) : (ht(t), null);
      }
      if (ht(t), t.flags & 128)
        return t.lanes = u, t;
      if (u = a !== null, l = l !== null && l.memoizedState !== null, u) {
        a = t.child, e = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (e = a.alternate.memoizedState.cachePool.pool);
        var n = null;
        a.memoizedState !== null && a.memoizedState.cachePool !== null && (n = a.memoizedState.cachePool.pool), n !== e && (a.flags |= 2048);
      }
      return u !== l && u && (t.child.flags |= 8192), ze(t, t.updateQueue), I(t), null;
    case 4:
      return Zu(), l === null && oi(t.stateNode.containerInfo), I(t), null;
    case 10:
      return mt(t.type), I(t), null;
    case 19:
      if (yl(cl), e = t.memoizedState, e === null) return I(t), null;
      if (a = (t.flags & 128) !== 0, n = e.rendering, n === null)
        if (a) va(e, !1);
        else {
          if (ll !== 0 || l !== null && l.flags & 128)
            for (l = t.child; l !== null; ) {
              if (n = tn(l), n !== null) {
                for (t.flags |= 128, va(e, !1), l = n.updateQueue, t.updateQueue = l, ze(t, l), t.subtreeFlags = 0, l = u, u = t.child; u !== null; )
                  Ld(u, l), u = u.sibling;
                return F(
                  cl,
                  cl.current & 1 | 2
                ), t.child;
              }
              l = l.sibling;
            }
          e.tail !== null && tt() > fn && (t.flags |= 128, a = !0, va(e, !1), t.lanes = 4194304);
        }
      else {
        if (!a)
          if (l = tn(n), l !== null) {
            if (t.flags |= 128, a = !0, l = l.updateQueue, t.updateQueue = l, ze(t, l), va(e, !0), e.tail === null && e.tailMode === "hidden" && !n.alternate && !X)
              return I(t), null;
          } else
            2 * tt() - e.renderingStartTime > fn && u !== 536870912 && (t.flags |= 128, a = !0, va(e, !1), t.lanes = 4194304);
        e.isBackwards ? (n.sibling = t.child, t.child = n) : (l = e.last, l !== null ? l.sibling = n : t.child = n, e.last = n);
      }
      return e.tail !== null ? (t = e.tail, e.rendering = t, e.tail = t.sibling, e.renderingStartTime = tt(), t.sibling = null, l = cl.current, F(cl, a ? l & 1 | 2 : l & 1), t) : (I(t), null);
    case 22:
    case 23:
      return ht(t), Kc(), a = t.memoizedState !== null, l !== null ? l.memoizedState !== null !== a && (t.flags |= 8192) : a && (t.flags |= 8192), a ? u & 536870912 && !(t.flags & 128) && (I(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : I(t), u = t.updateQueue, u !== null && ze(t, u.retryQueue), u = null, l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (u = l.memoizedState.cachePool.pool), a = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), a !== u && (t.flags |= 2048), l !== null && yl(nu), null;
    case 24:
      return u = null, l !== null && (u = l.memoizedState.cache), t.memoizedState.cache !== u && (t.flags |= 2048), mt(fl), I(t), null;
    case 25:
      return null;
    case 30:
      return null;
  }
  throw Error(S(156, t.tag));
}
function Ky(l, t) {
  switch (jc(t), t.tag) {
    case 1:
      return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
    case 3:
      return mt(fl), Zu(), l = t.flags, l & 65536 && !(l & 128) ? (t.flags = l & -65537 | 128, t) : null;
    case 26:
    case 27:
    case 5:
      return Ve(t), null;
    case 13:
      if (ht(t), l = t.memoizedState, l !== null && l.dehydrated !== null) {
        if (t.alternate === null)
          throw Error(S(340));
        le();
      }
      return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
    case 19:
      return yl(cl), null;
    case 4:
      return Zu(), null;
    case 10:
      return mt(t.type), null;
    case 22:
    case 23:
      return ht(t), Kc(), l !== null && yl(nu), l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
    case 24:
      return mt(fl), null;
    case 25:
      return null;
    default:
      return null;
  }
}
function L0(l, t) {
  switch (jc(t), t.tag) {
    case 3:
      mt(fl), Zu();
      break;
    case 26:
    case 27:
    case 5:
      Ve(t);
      break;
    case 4:
      Zu();
      break;
    case 13:
      ht(t);
      break;
    case 19:
      yl(cl);
      break;
    case 10:
      mt(t.type);
      break;
    case 22:
    case 23:
      ht(t), Kc(), l !== null && yl(nu);
      break;
    case 24:
      mt(fl);
  }
}
function fe(l, t) {
  try {
    var u = t.updateQueue, a = u !== null ? u.lastEffect : null;
    if (a !== null) {
      var e = a.next;
      u = e;
      do {
        if ((u.tag & l) === l) {
          a = void 0;
          var n = u.create, f = u.inst;
          a = n(), f.destroy = a;
        }
        u = u.next;
      } while (u !== e);
    }
  } catch (c) {
    K(t, t.return, c);
  }
}
function Kt(l, t, u) {
  try {
    var a = t.updateQueue, e = a !== null ? a.lastEffect : null;
    if (e !== null) {
      var n = e.next;
      a = n;
      do {
        if ((a.tag & l) === l) {
          var f = a.inst, c = f.destroy;
          if (c !== void 0) {
            f.destroy = void 0, e = t;
            var i = u, o = c;
            try {
              o();
            } catch (m) {
              K(
                e,
                i,
                m
              );
            }
          }
        }
        a = a.next;
      } while (a !== n);
    }
  } catch (m) {
    K(t, t.return, m);
  }
}
function J0(l) {
  var t = l.updateQueue;
  if (t !== null) {
    var u = l.stateNode;
    try {
      Id(t, u);
    } catch (a) {
      K(l, l.return, a);
    }
  }
}
function w0(l, t, u) {
  u.props = ou(
    l.type,
    l.memoizedProps
  ), u.state = l.memoizedState;
  try {
    u.componentWillUnmount();
  } catch (a) {
    K(l, t, a);
  }
}
function Ua(l, t) {
  try {
    var u = l.ref;
    if (u !== null) {
      switch (l.tag) {
        case 26:
        case 27:
        case 5:
          var a = l.stateNode;
          break;
        case 30:
          a = l.stateNode;
          break;
        default:
          a = l.stateNode;
      }
      typeof u == "function" ? l.refCleanup = u(a) : u.current = a;
    }
  } catch (e) {
    K(l, t, e);
  }
}
function Pl(l, t) {
  var u = l.ref, a = l.refCleanup;
  if (u !== null)
    if (typeof a == "function")
      try {
        a();
      } catch (e) {
        K(l, t, e);
      } finally {
        l.refCleanup = null, l = l.alternate, l != null && (l.refCleanup = null);
      }
    else if (typeof u == "function")
      try {
        u(null);
      } catch (e) {
        K(l, t, e);
      }
    else u.current = null;
}
function $0(l) {
  var t = l.type, u = l.memoizedProps, a = l.stateNode;
  try {
    l: switch (t) {
      case "button":
      case "input":
      case "select":
      case "textarea":
        u.autoFocus && a.focus();
        break l;
      case "img":
        u.src ? a.src = u.src : u.srcSet && (a.srcset = u.srcSet);
    }
  } catch (e) {
    K(l, l.return, e);
  }
}
function of(l, t, u) {
  try {
    var a = l.stateNode;
    oh(a, l.type, u, t), a[Dl] = t;
  } catch (e) {
    K(l, l.return, e);
  }
}
function W0(l) {
  return l.tag === 5 || l.tag === 3 || l.tag === 26 || l.tag === 27 && wt(l.type) || l.tag === 4;
}
function vf(l) {
  l: for (; ; ) {
    for (; l.sibling === null; ) {
      if (l.return === null || W0(l.return)) return null;
      l = l.return;
    }
    for (l.sibling.return = l.return, l = l.sibling; l.tag !== 5 && l.tag !== 6 && l.tag !== 18; ) {
      if (l.tag === 27 && wt(l.type) || l.flags & 2 || l.child === null || l.tag === 4) continue l;
      l.child.return = l, l = l.child;
    }
    if (!(l.flags & 2)) return l.stateNode;
  }
}
function tc(l, t, u) {
  var a = l.tag;
  if (a === 5 || a === 6)
    l = l.stateNode, t ? (u.nodeType === 9 ? u.body : u.nodeName === "HTML" ? u.ownerDocument.body : u).insertBefore(l, t) : (t = u.nodeType === 9 ? u.body : u.nodeName === "HTML" ? u.ownerDocument.body : u, t.appendChild(l), u = u._reactRootContainer, u != null || t.onclick !== null || (t.onclick = Bn));
  else if (a !== 4 && (a === 27 && wt(l.type) && (u = l.stateNode, t = null), l = l.child, l !== null))
    for (tc(l, t, u), l = l.sibling; l !== null; )
      tc(l, t, u), l = l.sibling;
}
function nn(l, t, u) {
  var a = l.tag;
  if (a === 5 || a === 6)
    l = l.stateNode, t ? u.insertBefore(l, t) : u.appendChild(l);
  else if (a !== 4 && (a === 27 && wt(l.type) && (u = l.stateNode), l = l.child, l !== null))
    for (nn(l, t, u), l = l.sibling; l !== null; )
      nn(l, t, u), l = l.sibling;
}
function k0(l) {
  var t = l.stateNode, u = l.memoizedProps;
  try {
    for (var a = l.type, e = t.attributes; e.length; )
      t.removeAttributeNode(e[0]);
    gl(t, a, u), t[bl] = l, t[Dl] = u;
  } catch (n) {
    K(l, l.return, n);
  }
}
var st = !1, al = !1, yf = !1, Es = typeof WeakSet == "function" ? WeakSet : Set, dl = null;
function Ly(l, t) {
  if (l = l.containerInfo, sc = mn, l = Gd(l), Bc(l)) {
    if ("selectionStart" in l)
      var u = {
        start: l.selectionStart,
        end: l.selectionEnd
      };
    else
      l: {
        u = (u = l.ownerDocument) && u.defaultView || window;
        var a = u.getSelection && u.getSelection();
        if (a && a.rangeCount !== 0) {
          u = a.anchorNode;
          var e = a.anchorOffset, n = a.focusNode;
          a = a.focusOffset;
          try {
            u.nodeType, n.nodeType;
          } catch {
            u = null;
            break l;
          }
          var f = 0, c = -1, i = -1, o = 0, m = 0, r = l, v = null;
          t: for (; ; ) {
            for (var h; r !== u || e !== 0 && r.nodeType !== 3 || (c = f + e), r !== n || a !== 0 && r.nodeType !== 3 || (i = f + a), r.nodeType === 3 && (f += r.nodeValue.length), (h = r.firstChild) !== null; )
              v = r, r = h;
            for (; ; ) {
              if (r === l) break t;
              if (v === u && ++o === e && (c = f), v === n && ++m === a && (i = f), (h = r.nextSibling) !== null) break;
              r = v, v = r.parentNode;
            }
            r = h;
          }
          u = c === -1 || i === -1 ? null : { start: c, end: i };
        } else u = null;
      }
    u = u || { start: 0, end: 0 };
  } else u = null;
  for (dc = { focusedElem: l, selectionRange: u }, mn = !1, dl = t; dl !== null; )
    if (t = dl, l = t.child, (t.subtreeFlags & 1024) !== 0 && l !== null)
      l.return = t, dl = l;
    else
      for (; dl !== null; ) {
        switch (t = dl, n = t.alternate, l = t.flags, t.tag) {
          case 0:
            break;
          case 11:
          case 15:
            break;
          case 1:
            if (l & 1024 && n !== null) {
              l = void 0, u = t, e = n.memoizedProps, n = n.memoizedState, a = u.stateNode;
              try {
                var O = ou(
                  u.type,
                  e,
                  u.elementType === u.type
                );
                l = a.getSnapshotBeforeUpdate(
                  O,
                  n
                ), a.__reactInternalSnapshotBeforeUpdate = l;
              } catch (z) {
                K(
                  u,
                  u.return,
                  z
                );
              }
            }
            break;
          case 3:
            if (l & 1024) {
              if (l = t.stateNode.containerInfo, u = l.nodeType, u === 9)
                vc(l);
              else if (u === 1)
                switch (l.nodeName) {
                  case "HEAD":
                  case "HTML":
                  case "BODY":
                    vc(l);
                    break;
                  default:
                    l.textContent = "";
                }
            }
            break;
          case 5:
          case 26:
          case 27:
          case 6:
          case 4:
          case 17:
            break;
          default:
            if (l & 1024) throw Error(S(163));
        }
        if (l = t.sibling, l !== null) {
          l.return = t.return, dl = l;
          break;
        }
        dl = t.return;
      }
}
function F0(l, t, u) {
  var a = u.flags;
  switch (u.tag) {
    case 0:
    case 11:
    case 15:
      zt(l, u), a & 4 && fe(5, u);
      break;
    case 1:
      if (zt(l, u), a & 4)
        if (l = u.stateNode, t === null)
          try {
            l.componentDidMount();
          } catch (f) {
            K(u, u.return, f);
          }
        else {
          var e = ou(
            u.type,
            t.memoizedProps
          );
          t = t.memoizedState;
          try {
            l.componentDidUpdate(
              e,
              t,
              l.__reactInternalSnapshotBeforeUpdate
            );
          } catch (f) {
            K(
              u,
              u.return,
              f
            );
          }
        }
      a & 64 && J0(u), a & 512 && Ua(u, u.return);
      break;
    case 3:
      if (zt(l, u), a & 64 && (l = u.updateQueue, l !== null)) {
        if (t = null, u.child !== null)
          switch (u.child.tag) {
            case 27:
            case 5:
              t = u.child.stateNode;
              break;
            case 1:
              t = u.child.stateNode;
          }
        try {
          Id(l, t);
        } catch (f) {
          K(u, u.return, f);
        }
      }
      break;
    case 27:
      t === null && a & 4 && k0(u);
    case 26:
    case 5:
      zt(l, u), t === null && a & 4 && $0(u), a & 512 && Ua(u, u.return);
      break;
    case 12:
      zt(l, u);
      break;
    case 13:
      zt(l, u), a & 4 && lo(l, u), a & 64 && (l = u.memoizedState, l !== null && (l = l.dehydrated, l !== null && (u = lh.bind(
        null,
        u
      ), Sh(l, u))));
      break;
    case 22:
      if (a = u.memoizedState !== null || st, !a) {
        t = t !== null && t.memoizedState !== null || al, e = st;
        var n = al;
        st = a, (al = t) && !n ? _t(
          l,
          u,
          (u.subtreeFlags & 8772) !== 0
        ) : zt(l, u), st = e, al = n;
      }
      break;
    case 30:
      break;
    default:
      zt(l, u);
  }
}
function I0(l) {
  var t = l.alternate;
  t !== null && (l.alternate = null, I0(t)), l.child = null, l.deletions = null, l.sibling = null, l.tag === 5 && (t = l.stateNode, t !== null && Uc(t)), l.stateNode = null, l.return = null, l.dependencies = null, l.memoizedProps = null, l.memoizedState = null, l.pendingProps = null, l.stateNode = null, l.updateQueue = null;
}
var W = null, Ol = !1;
function it(l, t, u) {
  for (u = u.child; u !== null; )
    P0(l, t, u), u = u.sibling;
}
function P0(l, t, u) {
  if (xl && typeof xl.onCommitFiberUnmount == "function")
    try {
      xl.onCommitFiberUnmount(Wa, u);
    } catch {
    }
  switch (u.tag) {
    case 26:
      al || Pl(u, t), it(
        l,
        t,
        u
      ), u.memoizedState ? u.memoizedState.count-- : u.stateNode && (u = u.stateNode, u.parentNode.removeChild(u));
      break;
    case 27:
      al || Pl(u, t);
      var a = W, e = Ol;
      wt(u.type) && (W = u.stateNode, Ol = !1), it(
        l,
        t,
        u
      ), xa(u.stateNode), W = a, Ol = e;
      break;
    case 5:
      al || Pl(u, t);
    case 6:
      if (a = W, e = Ol, W = null, it(
        l,
        t,
        u
      ), W = a, Ol = e, W !== null)
        if (Ol)
          try {
            (W.nodeType === 9 ? W.body : W.nodeName === "HTML" ? W.ownerDocument.body : W).removeChild(u.stateNode);
          } catch (n) {
            K(
              u,
              t,
              n
            );
          }
        else
          try {
            W.removeChild(u.stateNode);
          } catch (n) {
            K(
              u,
              t,
              n
            );
          }
      break;
    case 18:
      W !== null && (Ol ? (l = W, Hs(
        l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l,
        u.stateNode
      ), wa(l)) : Hs(W, u.stateNode));
      break;
    case 4:
      a = W, e = Ol, W = u.stateNode.containerInfo, Ol = !0, it(
        l,
        t,
        u
      ), W = a, Ol = e;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      al || Kt(2, u, t), al || Kt(4, u, t), it(
        l,
        t,
        u
      );
      break;
    case 1:
      al || (Pl(u, t), a = u.stateNode, typeof a.componentWillUnmount == "function" && w0(
        u,
        t,
        a
      )), it(
        l,
        t,
        u
      );
      break;
    case 21:
      it(
        l,
        t,
        u
      );
      break;
    case 22:
      al = (a = al) || u.memoizedState !== null, it(
        l,
        t,
        u
      ), al = a;
      break;
    default:
      it(
        l,
        t,
        u
      );
  }
}
function lo(l, t) {
  if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null && (l = l.dehydrated, l !== null))))
    try {
      wa(l);
    } catch (u) {
      K(t, t.return, u);
    }
}
function Jy(l) {
  switch (l.tag) {
    case 13:
    case 19:
      var t = l.stateNode;
      return t === null && (t = l.stateNode = new Es()), t;
    case 22:
      return l = l.stateNode, t = l._retryCache, t === null && (t = l._retryCache = new Es()), t;
    default:
      throw Error(S(435, l.tag));
  }
}
function hf(l, t) {
  var u = Jy(l);
  t.forEach(function(a) {
    var e = th.bind(null, l, a);
    u.has(a) || (u.add(a), a.then(e, e));
  });
}
function Ul(l, t) {
  var u = t.deletions;
  if (u !== null)
    for (var a = 0; a < u.length; a++) {
      var e = u[a], n = l, f = t, c = f;
      l: for (; c !== null; ) {
        switch (c.tag) {
          case 27:
            if (wt(c.type)) {
              W = c.stateNode, Ol = !1;
              break l;
            }
            break;
          case 5:
            W = c.stateNode, Ol = !1;
            break l;
          case 3:
          case 4:
            W = c.stateNode.containerInfo, Ol = !0;
            break l;
        }
        c = c.return;
      }
      if (W === null) throw Error(S(160));
      P0(n, f, e), W = null, Ol = !1, n = e.alternate, n !== null && (n.return = null), e.return = null;
    }
  if (t.subtreeFlags & 13878)
    for (t = t.child; t !== null; )
      to(t, l), t = t.sibling;
}
var $l = null;
function to(l, t) {
  var u = l.alternate, a = l.flags;
  switch (l.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      Ul(t, l), Rl(l), a & 4 && (Kt(3, l, l.return), fe(3, l), Kt(5, l, l.return));
      break;
    case 1:
      Ul(t, l), Rl(l), a & 512 && (al || u === null || Pl(u, u.return)), a & 64 && st && (l = l.updateQueue, l !== null && (a = l.callbacks, a !== null && (u = l.shared.hiddenCallbacks, l.shared.hiddenCallbacks = u === null ? a : u.concat(a))));
      break;
    case 26:
      var e = $l;
      if (Ul(t, l), Rl(l), a & 512 && (al || u === null || Pl(u, u.return)), a & 4) {
        var n = u !== null ? u.memoizedState : null;
        if (a = l.memoizedState, u === null)
          if (a === null)
            if (l.stateNode === null) {
              l: {
                a = l.type, u = l.memoizedProps, e = e.ownerDocument || e;
                t: switch (a) {
                  case "title":
                    n = e.getElementsByTagName("title")[0], (!n || n[Ia] || n[bl] || n.namespaceURI === "http://www.w3.org/2000/svg" || n.hasAttribute("itemprop")) && (n = e.createElement(a), e.head.insertBefore(
                      n,
                      e.querySelector("head > title")
                    )), gl(n, a, u), n[bl] = l, ol(n), a = n;
                    break l;
                  case "link":
                    var f = Gs(
                      "link",
                      "href",
                      e
                    ).get(a + (u.href || ""));
                    if (f) {
                      for (var c = 0; c < f.length; c++)
                        if (n = f[c], n.getAttribute("href") === (u.href == null || u.href === "" ? null : u.href) && n.getAttribute("rel") === (u.rel == null ? null : u.rel) && n.getAttribute("title") === (u.title == null ? null : u.title) && n.getAttribute("crossorigin") === (u.crossOrigin == null ? null : u.crossOrigin)) {
                          f.splice(c, 1);
                          break t;
                        }
                    }
                    n = e.createElement(a), gl(n, a, u), e.head.appendChild(n);
                    break;
                  case "meta":
                    if (f = Gs(
                      "meta",
                      "content",
                      e
                    ).get(a + (u.content || ""))) {
                      for (c = 0; c < f.length; c++)
                        if (n = f[c], n.getAttribute("content") === (u.content == null ? null : "" + u.content) && n.getAttribute("name") === (u.name == null ? null : u.name) && n.getAttribute("property") === (u.property == null ? null : u.property) && n.getAttribute("http-equiv") === (u.httpEquiv == null ? null : u.httpEquiv) && n.getAttribute("charset") === (u.charSet == null ? null : u.charSet)) {
                          f.splice(c, 1);
                          break t;
                        }
                    }
                    n = e.createElement(a), gl(n, a, u), e.head.appendChild(n);
                    break;
                  default:
                    throw Error(S(468, a));
                }
                n[bl] = l, ol(n), a = n;
              }
              l.stateNode = a;
            } else
              Xs(
                e,
                l.type,
                l.stateNode
              );
          else
            l.stateNode = qs(
              e,
              a,
              l.memoizedProps
            );
        else
          n !== a ? (n === null ? u.stateNode !== null && (u = u.stateNode, u.parentNode.removeChild(u)) : n.count--, a === null ? Xs(
            e,
            l.type,
            l.stateNode
          ) : qs(
            e,
            a,
            l.memoizedProps
          )) : a === null && l.stateNode !== null && of(
            l,
            l.memoizedProps,
            u.memoizedProps
          );
      }
      break;
    case 27:
      Ul(t, l), Rl(l), a & 512 && (al || u === null || Pl(u, u.return)), u !== null && a & 4 && of(
        l,
        l.memoizedProps,
        u.memoizedProps
      );
      break;
    case 5:
      if (Ul(t, l), Rl(l), a & 512 && (al || u === null || Pl(u, u.return)), l.flags & 32) {
        e = l.stateNode;
        try {
          Ku(e, "");
        } catch (h) {
          K(l, l.return, h);
        }
      }
      a & 4 && l.stateNode != null && (e = l.memoizedProps, of(
        l,
        e,
        u !== null ? u.memoizedProps : e
      )), a & 1024 && (yf = !0);
      break;
    case 6:
      if (Ul(t, l), Rl(l), a & 4) {
        if (l.stateNode === null)
          throw Error(S(162));
        a = l.memoizedProps, u = l.stateNode;
        try {
          u.nodeValue = a;
        } catch (h) {
          K(l, l.return, h);
        }
      }
      break;
    case 3:
      if (Qe = null, e = $l, $l = yn(t.containerInfo), Ul(t, l), $l = e, Rl(l), a & 4 && u !== null && u.memoizedState.isDehydrated)
        try {
          wa(t.containerInfo);
        } catch (h) {
          K(l, l.return, h);
        }
      yf && (yf = !1, uo(l));
      break;
    case 4:
      a = $l, $l = yn(
        l.stateNode.containerInfo
      ), Ul(t, l), Rl(l), $l = a;
      break;
    case 12:
      Ul(t, l), Rl(l);
      break;
    case 13:
      Ul(t, l), Rl(l), l.child.flags & 8192 && l.memoizedState !== null != (u !== null && u.memoizedState !== null) && (ii = tt()), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, hf(l, a)));
      break;
    case 22:
      e = l.memoizedState !== null;
      var i = u !== null && u.memoizedState !== null, o = st, m = al;
      if (st = o || e, al = m || i, Ul(t, l), al = m, st = o, Rl(l), a & 8192)
        l: for (t = l.stateNode, t._visibility = e ? t._visibility & -2 : t._visibility | 1, e && (u === null || i || st || al || lu(l)), u = null, t = l; ; ) {
          if (t.tag === 5 || t.tag === 26) {
            if (u === null) {
              i = u = t;
              try {
                if (n = i.stateNode, e)
                  f = n.style, typeof f.setProperty == "function" ? f.setProperty("display", "none", "important") : f.display = "none";
                else {
                  c = i.stateNode;
                  var r = i.memoizedProps.style, v = r != null && r.hasOwnProperty("display") ? r.display : null;
                  c.style.display = v == null || typeof v == "boolean" ? "" : ("" + v).trim();
                }
              } catch (h) {
                K(i, i.return, h);
              }
            }
          } else if (t.tag === 6) {
            if (u === null) {
              i = t;
              try {
                i.stateNode.nodeValue = e ? "" : i.memoizedProps;
              } catch (h) {
                K(i, i.return, h);
              }
            }
          } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === l) && t.child !== null) {
            t.child.return = t, t = t.child;
            continue;
          }
          if (t === l) break l;
          for (; t.sibling === null; ) {
            if (t.return === null || t.return === l) break l;
            u === t && (u = null), t = t.return;
          }
          u === t && (u = null), t.sibling.return = t.return, t = t.sibling;
        }
      a & 4 && (a = l.updateQueue, a !== null && (u = a.retryQueue, u !== null && (a.retryQueue = null, hf(l, u))));
      break;
    case 19:
      Ul(t, l), Rl(l), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, hf(l, a)));
      break;
    case 30:
      break;
    case 21:
      break;
    default:
      Ul(t, l), Rl(l);
  }
}
function Rl(l) {
  var t = l.flags;
  if (t & 2) {
    try {
      for (var u, a = l.return; a !== null; ) {
        if (W0(a)) {
          u = a;
          break;
        }
        a = a.return;
      }
      if (u == null) throw Error(S(160));
      switch (u.tag) {
        case 27:
          var e = u.stateNode, n = vf(l);
          nn(l, n, e);
          break;
        case 5:
          var f = u.stateNode;
          u.flags & 32 && (Ku(f, ""), u.flags &= -33);
          var c = vf(l);
          nn(l, c, f);
          break;
        case 3:
        case 4:
          var i = u.stateNode.containerInfo, o = vf(l);
          tc(
            l,
            o,
            i
          );
          break;
        default:
          throw Error(S(161));
      }
    } catch (m) {
      K(l, l.return, m);
    }
    l.flags &= -3;
  }
  t & 4096 && (l.flags &= -4097);
}
function uo(l) {
  if (l.subtreeFlags & 1024)
    for (l = l.child; l !== null; ) {
      var t = l;
      uo(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), l = l.sibling;
    }
}
function zt(l, t) {
  if (t.subtreeFlags & 8772)
    for (t = t.child; t !== null; )
      F0(l, t.alternate, t), t = t.sibling;
}
function lu(l) {
  for (l = l.child; l !== null; ) {
    var t = l;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Kt(4, t, t.return), lu(t);
        break;
      case 1:
        Pl(t, t.return);
        var u = t.stateNode;
        typeof u.componentWillUnmount == "function" && w0(
          t,
          t.return,
          u
        ), lu(t);
        break;
      case 27:
        xa(t.stateNode);
      case 26:
      case 5:
        Pl(t, t.return), lu(t);
        break;
      case 22:
        t.memoizedState === null && lu(t);
        break;
      case 30:
        lu(t);
        break;
      default:
        lu(t);
    }
    l = l.sibling;
  }
}
function _t(l, t, u) {
  for (u = u && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
    var a = t.alternate, e = l, n = t, f = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        _t(
          e,
          n,
          u
        ), fe(4, n);
        break;
      case 1:
        if (_t(
          e,
          n,
          u
        ), a = n, e = a.stateNode, typeof e.componentDidMount == "function")
          try {
            e.componentDidMount();
          } catch (o) {
            K(a, a.return, o);
          }
        if (a = n, e = a.updateQueue, e !== null) {
          var c = a.stateNode;
          try {
            var i = e.shared.hiddenCallbacks;
            if (i !== null)
              for (e.shared.hiddenCallbacks = null, e = 0; e < i.length; e++)
                Fd(i[e], c);
          } catch (o) {
            K(a, a.return, o);
          }
        }
        u && f & 64 && J0(n), Ua(n, n.return);
        break;
      case 27:
        k0(n);
      case 26:
      case 5:
        _t(
          e,
          n,
          u
        ), u && a === null && f & 4 && $0(n), Ua(n, n.return);
        break;
      case 12:
        _t(
          e,
          n,
          u
        );
        break;
      case 13:
        _t(
          e,
          n,
          u
        ), u && f & 4 && lo(e, n);
        break;
      case 22:
        n.memoizedState === null && _t(
          e,
          n,
          u
        ), Ua(n, n.return);
        break;
      case 30:
        break;
      default:
        _t(
          e,
          n,
          u
        );
    }
    t = t.sibling;
  }
}
function ei(l, t) {
  var u = null;
  l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (u = l.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== u && (l != null && l.refCount++, u != null && ue(u));
}
function ni(l, t) {
  l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && ue(l));
}
function Fl(l, t, u, a) {
  if (t.subtreeFlags & 10256)
    for (t = t.child; t !== null; )
      ao(
        l,
        t,
        u,
        a
      ), t = t.sibling;
}
function ao(l, t, u, a) {
  var e = t.flags;
  switch (t.tag) {
    case 0:
    case 11:
    case 15:
      Fl(
        l,
        t,
        u,
        a
      ), e & 2048 && fe(9, t);
      break;
    case 1:
      Fl(
        l,
        t,
        u,
        a
      );
      break;
    case 3:
      Fl(
        l,
        t,
        u,
        a
      ), e & 2048 && (l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && ue(l)));
      break;
    case 12:
      if (e & 2048) {
        Fl(
          l,
          t,
          u,
          a
        ), l = t.stateNode;
        try {
          var n = t.memoizedProps, f = n.id, c = n.onPostCommit;
          typeof c == "function" && c(
            f,
            t.alternate === null ? "mount" : "update",
            l.passiveEffectDuration,
            -0
          );
        } catch (i) {
          K(t, t.return, i);
        }
      } else
        Fl(
          l,
          t,
          u,
          a
        );
      break;
    case 13:
      Fl(
        l,
        t,
        u,
        a
      );
      break;
    case 23:
      break;
    case 22:
      n = t.stateNode, f = t.alternate, t.memoizedState !== null ? n._visibility & 2 ? Fl(
        l,
        t,
        u,
        a
      ) : Ra(l, t) : n._visibility & 2 ? Fl(
        l,
        t,
        u,
        a
      ) : (n._visibility |= 2, Eu(
        l,
        t,
        u,
        a,
        (t.subtreeFlags & 10256) !== 0
      )), e & 2048 && ei(f, t);
      break;
    case 24:
      Fl(
        l,
        t,
        u,
        a
      ), e & 2048 && ni(t.alternate, t);
      break;
    default:
      Fl(
        l,
        t,
        u,
        a
      );
  }
}
function Eu(l, t, u, a, e) {
  for (e = e && (t.subtreeFlags & 10256) !== 0, t = t.child; t !== null; ) {
    var n = l, f = t, c = u, i = a, o = f.flags;
    switch (f.tag) {
      case 0:
      case 11:
      case 15:
        Eu(
          n,
          f,
          c,
          i,
          e
        ), fe(8, f);
        break;
      case 23:
        break;
      case 22:
        var m = f.stateNode;
        f.memoizedState !== null ? m._visibility & 2 ? Eu(
          n,
          f,
          c,
          i,
          e
        ) : Ra(
          n,
          f
        ) : (m._visibility |= 2, Eu(
          n,
          f,
          c,
          i,
          e
        )), e && o & 2048 && ei(
          f.alternate,
          f
        );
        break;
      case 24:
        Eu(
          n,
          f,
          c,
          i,
          e
        ), e && o & 2048 && ni(f.alternate, f);
        break;
      default:
        Eu(
          n,
          f,
          c,
          i,
          e
        );
    }
    t = t.sibling;
  }
}
function Ra(l, t) {
  if (t.subtreeFlags & 10256)
    for (t = t.child; t !== null; ) {
      var u = l, a = t, e = a.flags;
      switch (a.tag) {
        case 22:
          Ra(u, a), e & 2048 && ei(
            a.alternate,
            a
          );
          break;
        case 24:
          Ra(u, a), e & 2048 && ni(a.alternate, a);
          break;
        default:
          Ra(u, a);
      }
      t = t.sibling;
    }
}
var Sa = 8192;
function mu(l) {
  if (l.subtreeFlags & Sa)
    for (l = l.child; l !== null; )
      eo(l), l = l.sibling;
}
function eo(l) {
  switch (l.tag) {
    case 26:
      mu(l), l.flags & Sa && l.memoizedState !== null && Nh(
        $l,
        l.memoizedState,
        l.memoizedProps
      );
      break;
    case 5:
      mu(l);
      break;
    case 3:
    case 4:
      var t = $l;
      $l = yn(l.stateNode.containerInfo), mu(l), $l = t;
      break;
    case 22:
      l.memoizedState === null && (t = l.alternate, t !== null && t.memoizedState !== null ? (t = Sa, Sa = 16777216, mu(l), Sa = t) : mu(l));
      break;
    default:
      mu(l);
  }
}
function no(l) {
  var t = l.alternate;
  if (t !== null && (l = t.child, l !== null)) {
    t.child = null;
    do
      t = l.sibling, l.sibling = null, l = t;
    while (l !== null);
  }
}
function ya(l) {
  var t = l.deletions;
  if (l.flags & 16) {
    if (t !== null)
      for (var u = 0; u < t.length; u++) {
        var a = t[u];
        dl = a, co(
          a,
          l
        );
      }
    no(l);
  }
  if (l.subtreeFlags & 10256)
    for (l = l.child; l !== null; )
      fo(l), l = l.sibling;
}
function fo(l) {
  switch (l.tag) {
    case 0:
    case 11:
    case 15:
      ya(l), l.flags & 2048 && Kt(9, l, l.return);
      break;
    case 3:
      ya(l);
      break;
    case 12:
      ya(l);
      break;
    case 22:
      var t = l.stateNode;
      l.memoizedState !== null && t._visibility & 2 && (l.return === null || l.return.tag !== 13) ? (t._visibility &= -3, Ge(l)) : ya(l);
      break;
    default:
      ya(l);
  }
}
function Ge(l) {
  var t = l.deletions;
  if (l.flags & 16) {
    if (t !== null)
      for (var u = 0; u < t.length; u++) {
        var a = t[u];
        dl = a, co(
          a,
          l
        );
      }
    no(l);
  }
  for (l = l.child; l !== null; ) {
    switch (t = l, t.tag) {
      case 0:
      case 11:
      case 15:
        Kt(8, t, t.return), Ge(t);
        break;
      case 22:
        u = t.stateNode, u._visibility & 2 && (u._visibility &= -3, Ge(t));
        break;
      default:
        Ge(t);
    }
    l = l.sibling;
  }
}
function co(l, t) {
  for (; dl !== null; ) {
    var u = dl;
    switch (u.tag) {
      case 0:
      case 11:
      case 15:
        Kt(8, u, t);
        break;
      case 23:
      case 22:
        if (u.memoizedState !== null && u.memoizedState.cachePool !== null) {
          var a = u.memoizedState.cachePool.pool;
          a != null && a.refCount++;
        }
        break;
      case 24:
        ue(u.memoizedState.cache);
    }
    if (a = u.child, a !== null) a.return = u, dl = a;
    else
      l: for (u = l; dl !== null; ) {
        a = dl;
        var e = a.sibling, n = a.return;
        if (I0(a), a === u) {
          dl = null;
          break l;
        }
        if (e !== null) {
          e.return = n, dl = e;
          break l;
        }
        dl = n;
      }
  }
}
var wy = {
  getCacheForType: function(l) {
    var t = El(fl), u = t.data.get(l);
    return u === void 0 && (u = l(), t.data.set(l, u)), u;
  }
}, $y = typeof WeakMap == "function" ? WeakMap : Map, C = 0, J = null, Y = null, G = 0, j = 0, Nl = null, xt = !1, ea = !1, fi = !1, Et = 0, ll = 0, Lt = 0, fu = 0, ci = 0, Ll = 0, Wu = 0, Na = null, Ml = null, uc = !1, ii = 0, fn = 1 / 0, cn = null, Xt = null, ml = 0, Qt = null, ku = null, Cu = 0, ac = 0, ec = null, io = null, Ha = 0, nc = null;
function Bl() {
  if (C & 2 && G !== 0)
    return G & -G;
  if (p.T !== null) {
    var l = Lu;
    return l !== 0 ? l : di();
  }
  return bd();
}
function so() {
  Ll === 0 && (Ll = !(G & 536870912) || X ? rd() : 536870912);
  var l = Jl.current;
  return l !== null && (l.flags |= 32), Ll;
}
function ql(l, t, u) {
  (l === J && (j === 2 || j === 9) || l.cancelPendingCommit !== null) && (Fu(l, 0), Yt(
    l,
    G,
    Ll,
    !1
  )), Fa(l, u), (!(C & 2) || l !== J) && (l === J && (!(C & 2) && (fu |= u), ll === 4 && Yt(
    l,
    G,
    Ll,
    !1
  )), et(l));
}
function oo(l, t, u) {
  if (C & 6) throw Error(S(327));
  var a = !u && (t & 124) === 0 && (t & l.expiredLanes) === 0 || ka(l, t), e = a ? Fy(l, t) : rf(l, t, !0), n = a;
  do {
    if (e === 0) {
      ea && !a && Yt(l, t, 0, !1);
      break;
    } else {
      if (u = l.current.alternate, n && !Wy(u)) {
        e = rf(l, t, !1), n = !1;
        continue;
      }
      if (e === 2) {
        if (n = t, l.errorRecoveryDisabledLanes & n)
          var f = 0;
        else
          f = l.pendingLanes & -536870913, f = f !== 0 ? f : f & 536870912 ? 536870912 : 0;
        if (f !== 0) {
          t = f;
          l: {
            var c = l;
            e = Na;
            var i = c.current.memoizedState.isDehydrated;
            if (i && (Fu(c, f).flags |= 256), f = rf(
              c,
              f,
              !1
            ), f !== 2) {
              if (fi && !i) {
                c.errorRecoveryDisabledLanes |= n, fu |= n, e = 4;
                break l;
              }
              n = Ml, Ml = e, n !== null && (Ml === null ? Ml = n : Ml.push.apply(
                Ml,
                n
              ));
            }
            e = f;
          }
          if (n = !1, e !== 2) continue;
        }
      }
      if (e === 1) {
        Fu(l, 0), Yt(l, t, 0, !0);
        break;
      }
      l: {
        switch (a = l, n = e, n) {
          case 0:
          case 1:
            throw Error(S(345));
          case 4:
            if ((t & 4194048) !== t) break;
          case 6:
            Yt(
              a,
              t,
              Ll,
              !xt
            );
            break l;
          case 2:
            Ml = null;
            break;
          case 3:
          case 5:
            break;
          default:
            throw Error(S(329));
        }
        if ((t & 62914560) === t && (e = ii + 300 - tt(), 10 < e)) {
          if (Yt(
            a,
            t,
            Ll,
            !xt
          ), An(a, 0, !0) !== 0) break l;
          a.timeoutHandle = Ro(
            Ts.bind(
              null,
              a,
              u,
              Ml,
              cn,
              uc,
              t,
              Ll,
              fu,
              Wu,
              xt,
              n,
              2,
              -0,
              0
            ),
            e
          );
          break l;
        }
        Ts(
          a,
          u,
          Ml,
          cn,
          uc,
          t,
          Ll,
          fu,
          Wu,
          xt,
          n,
          0,
          -0,
          0
        );
      }
    }
    break;
  } while (!0);
  et(l);
}
function Ts(l, t, u, a, e, n, f, c, i, o, m, r, v, h) {
  if (l.timeoutHandle = -1, r = t.subtreeFlags, (r & 8192 || (r & 16785408) === 16785408) && (Va = { stylesheets: null, count: 0, unsuspend: Rh }, eo(t), r = Hh(), r !== null)) {
    l.cancelPendingCommit = r(
      zs.bind(
        null,
        l,
        t,
        n,
        u,
        a,
        e,
        f,
        c,
        i,
        m,
        1,
        v,
        h
      )
    ), Yt(l, n, f, !o);
    return;
  }
  zs(
    l,
    t,
    n,
    u,
    a,
    e,
    f,
    c,
    i
  );
}
function Wy(l) {
  for (var t = l; ; ) {
    var u = t.tag;
    if ((u === 0 || u === 11 || u === 15) && t.flags & 16384 && (u = t.updateQueue, u !== null && (u = u.stores, u !== null)))
      for (var a = 0; a < u.length; a++) {
        var e = u[a], n = e.getSnapshot;
        e = e.value;
        try {
          if (!Gl(n(), e)) return !1;
        } catch {
          return !1;
        }
      }
    if (u = t.child, t.subtreeFlags & 16384 && u !== null)
      u.return = t, t = u;
    else {
      if (t === l) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === l) return !0;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
  }
  return !0;
}
function Yt(l, t, u, a) {
  t &= ~ci, t &= ~fu, l.suspendedLanes |= t, l.pingedLanes &= ~t, a && (l.warmLanes |= t), a = l.expirationTimes;
  for (var e = t; 0 < e; ) {
    var n = 31 - Yl(e), f = 1 << n;
    a[n] = -1, e &= ~f;
  }
  u !== 0 && gd(l, u, t);
}
function Hn() {
  return C & 6 ? !0 : (ce(0), !1);
}
function si() {
  if (Y !== null) {
    if (j === 0)
      var l = Y.return;
    else
      l = Y, yt = ru = null, Wc(l), ju = null, ja = 0, l = Y;
    for (; l !== null; )
      L0(l.alternate, l), l = l.return;
    Y = null;
  }
}
function Fu(l, t) {
  var u = l.timeoutHandle;
  u !== -1 && (l.timeoutHandle = -1, yh(u)), u = l.cancelPendingCommit, u !== null && (l.cancelPendingCommit = null, u()), si(), J = l, Y = u = rt(l.current, null), G = t, j = 0, Nl = null, xt = !1, ea = ka(l, t), fi = !1, Wu = Ll = ci = fu = Lt = ll = 0, Ml = Na = null, uc = !1, t & 8 && (t |= t & 32);
  var a = l.entangledLanes;
  if (a !== 0)
    for (l = l.entanglements, a &= t; 0 < a; ) {
      var e = 31 - Yl(a), n = 1 << e;
      t |= l[e], a &= ~n;
    }
  return Et = t, Mn(), u;
}
function vo(l, t) {
  H = null, p.H = ln, t === ae || t === pn ? (t = Pi(), j = 3) : t === Wd ? (t = Pi(), j = 4) : j = t === Q0 ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, Nl = t, Y === null && (ll = 1, an(
    l,
    Kl(t, l.current)
  ));
}
function yo() {
  var l = p.H;
  return p.H = ln, l === null ? ln : l;
}
function ho() {
  var l = p.A;
  return p.A = wy, l;
}
function fc() {
  ll = 4, xt || (G & 4194048) !== G && Jl.current !== null || (ea = !0), !(Lt & 134217727) && !(fu & 134217727) || J === null || Yt(
    J,
    G,
    Ll,
    !1
  );
}
function rf(l, t, u) {
  var a = C;
  C |= 2;
  var e = yo(), n = ho();
  (J !== l || G !== t) && (cn = null, Fu(l, t)), t = !1;
  var f = ll;
  l: do
    try {
      if (j !== 0 && Y !== null) {
        var c = Y, i = Nl;
        switch (j) {
          case 8:
            si(), f = 6;
            break l;
          case 3:
          case 2:
          case 9:
          case 6:
            Jl.current === null && (t = !0);
            var o = j;
            if (j = 0, Nl = null, xu(l, c, i, o), u && ea) {
              f = 0;
              break l;
            }
            break;
          default:
            o = j, j = 0, Nl = null, xu(l, c, i, o);
        }
      }
      ky(), f = ll;
      break;
    } catch (m) {
      vo(l, m);
    }
  while (!0);
  return t && l.shellSuspendCounter++, yt = ru = null, C = a, p.H = e, p.A = n, Y === null && (J = null, G = 0, Mn()), f;
}
function ky() {
  for (; Y !== null; ) ro(Y);
}
function Fy(l, t) {
  var u = C;
  C |= 2;
  var a = yo(), e = ho();
  J !== l || G !== t ? (cn = null, fn = tt() + 500, Fu(l, t)) : ea = ka(
    l,
    t
  );
  l: do
    try {
      if (j !== 0 && Y !== null) {
        t = Y;
        var n = Nl;
        t: switch (j) {
          case 1:
            j = 0, Nl = null, xu(l, t, n, 1);
            break;
          case 2:
          case 9:
            if (Ii(n)) {
              j = 0, Nl = null, As(t);
              break;
            }
            t = function() {
              j !== 2 && j !== 9 || J !== l || (j = 7), et(l);
            }, n.then(t, t);
            break l;
          case 3:
            j = 7;
            break l;
          case 4:
            j = 5;
            break l;
          case 7:
            Ii(n) ? (j = 0, Nl = null, As(t)) : (j = 0, Nl = null, xu(l, t, n, 7));
            break;
          case 5:
            var f = null;
            switch (Y.tag) {
              case 26:
                f = Y.memoizedState;
              case 5:
              case 27:
                var c = Y;
                if (!f || Yo(f)) {
                  j = 0, Nl = null;
                  var i = c.sibling;
                  if (i !== null) Y = i;
                  else {
                    var o = c.return;
                    o !== null ? (Y = o, xn(o)) : Y = null;
                  }
                  break t;
                }
            }
            j = 0, Nl = null, xu(l, t, n, 5);
            break;
          case 6:
            j = 0, Nl = null, xu(l, t, n, 6);
            break;
          case 8:
            si(), ll = 6;
            break l;
          default:
            throw Error(S(462));
        }
      }
      Iy();
      break;
    } catch (m) {
      vo(l, m);
    }
  while (!0);
  return yt = ru = null, p.H = a, p.A = e, C = u, Y !== null ? 0 : (J = null, G = 0, Mn(), ll);
}
function Iy() {
  for (; Y !== null && !Ev(); )
    ro(Y);
}
function ro(l) {
  var t = K0(l.alternate, l, Et);
  l.memoizedProps = l.pendingProps, t === null ? xn(l) : Y = t;
}
function As(l) {
  var t = l, u = t.alternate;
  switch (t.tag) {
    case 15:
    case 0:
      t = rs(
        u,
        t,
        t.pendingProps,
        t.type,
        void 0,
        G
      );
      break;
    case 11:
      t = rs(
        u,
        t,
        t.pendingProps,
        t.type.render,
        t.ref,
        G
      );
      break;
    case 5:
      Wc(t);
    default:
      L0(u, t), t = Y = Ld(t, Et), t = K0(u, t, Et);
  }
  l.memoizedProps = l.pendingProps, t === null ? xn(l) : Y = t;
}
function xu(l, t, u, a) {
  yt = ru = null, Wc(t), ju = null, ja = 0;
  var e = t.return;
  try {
    if (Cy(
      l,
      e,
      t,
      u,
      G
    )) {
      ll = 1, an(
        l,
        Kl(u, l.current)
      ), Y = null;
      return;
    }
  } catch (n) {
    if (e !== null) throw Y = e, n;
    ll = 1, an(
      l,
      Kl(u, l.current)
    ), Y = null;
    return;
  }
  t.flags & 32768 ? (X || a === 1 ? l = !0 : ea || G & 536870912 ? l = !1 : (xt = l = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = Jl.current, a !== null && a.tag === 13 && (a.flags |= 16384))), mo(t, l)) : xn(t);
}
function xn(l) {
  var t = l;
  do {
    if (t.flags & 32768) {
      mo(
        t,
        xt
      );
      return;
    }
    l = t.return;
    var u = Vy(
      t.alternate,
      t,
      Et
    );
    if (u !== null) {
      Y = u;
      return;
    }
    if (t = t.sibling, t !== null) {
      Y = t;
      return;
    }
    Y = t = l;
  } while (t !== null);
  ll === 0 && (ll = 5);
}
function mo(l, t) {
  do {
    var u = Ky(l.alternate, l);
    if (u !== null) {
      u.flags &= 32767, Y = u;
      return;
    }
    if (u = l.return, u !== null && (u.flags |= 32768, u.subtreeFlags = 0, u.deletions = null), !t && (l = l.sibling, l !== null)) {
      Y = l;
      return;
    }
    Y = l = u;
  } while (l !== null);
  ll = 6, Y = null;
}
function zs(l, t, u, a, e, n, f, c, i) {
  l.cancelPendingCommit = null;
  do
    Yn();
  while (ml !== 0);
  if (C & 6) throw Error(S(327));
  if (t !== null) {
    if (t === l.current) throw Error(S(177));
    if (n = t.lanes | t.childLanes, n |= qc, Rv(
      l,
      u,
      n,
      f,
      c,
      i
    ), l === J && (Y = J = null, G = 0), ku = t, Qt = l, Cu = u, ac = n, ec = e, io = a, t.subtreeFlags & 10256 || t.flags & 10256 ? (l.callbackNode = null, l.callbackPriority = 0, uh(Ke, function() {
      return To(), null;
    })) : (l.callbackNode = null, l.callbackPriority = 0), a = (t.flags & 13878) !== 0, t.subtreeFlags & 13878 || a) {
      a = p.T, p.T = null, e = Q.p, Q.p = 2, f = C, C |= 4;
      try {
        Ly(l, t, u);
      } finally {
        C = f, Q.p = e, p.T = a;
      }
    }
    ml = 1, go(), So(), bo();
  }
}
function go() {
  if (ml === 1) {
    ml = 0;
    var l = Qt, t = ku, u = (t.flags & 13878) !== 0;
    if (t.subtreeFlags & 13878 || u) {
      u = p.T, p.T = null;
      var a = Q.p;
      Q.p = 2;
      var e = C;
      C |= 4;
      try {
        to(t, l);
        var n = dc, f = Gd(l.containerInfo), c = n.focusedElem, i = n.selectionRange;
        if (f !== c && c && c.ownerDocument && qd(
          c.ownerDocument.documentElement,
          c
        )) {
          if (i !== null && Bc(c)) {
            var o = i.start, m = i.end;
            if (m === void 0 && (m = o), "selectionStart" in c)
              c.selectionStart = o, c.selectionEnd = Math.min(
                m,
                c.value.length
              );
            else {
              var r = c.ownerDocument || document, v = r && r.defaultView || window;
              if (v.getSelection) {
                var h = v.getSelection(), O = c.textContent.length, z = Math.min(i.start, O), B = i.end === void 0 ? z : Math.min(i.end, O);
                !h.extend && z > B && (f = B, B = z, z = f);
                var d = Ki(
                  c,
                  z
                ), s = Ki(
                  c,
                  B
                );
                if (d && s && (h.rangeCount !== 1 || h.anchorNode !== d.node || h.anchorOffset !== d.offset || h.focusNode !== s.node || h.focusOffset !== s.offset)) {
                  var y = r.createRange();
                  y.setStart(d.node, d.offset), h.removeAllRanges(), z > B ? (h.addRange(y), h.extend(s.node, s.offset)) : (y.setEnd(s.node, s.offset), h.addRange(y));
                }
              }
            }
          }
          for (r = [], h = c; h = h.parentNode; )
            h.nodeType === 1 && r.push({
              element: h,
              left: h.scrollLeft,
              top: h.scrollTop
            });
          for (typeof c.focus == "function" && c.focus(), c = 0; c < r.length; c++) {
            var g = r[c];
            g.element.scrollLeft = g.left, g.element.scrollTop = g.top;
          }
        }
        mn = !!sc, dc = sc = null;
      } finally {
        C = e, Q.p = a, p.T = u;
      }
    }
    l.current = t, ml = 2;
  }
}
function So() {
  if (ml === 2) {
    ml = 0;
    var l = Qt, t = ku, u = (t.flags & 8772) !== 0;
    if (t.subtreeFlags & 8772 || u) {
      u = p.T, p.T = null;
      var a = Q.p;
      Q.p = 2;
      var e = C;
      C |= 4;
      try {
        F0(l, t.alternate, t);
      } finally {
        C = e, Q.p = a, p.T = u;
      }
    }
    ml = 3;
  }
}
function bo() {
  if (ml === 4 || ml === 3) {
    ml = 0, Tv();
    var l = Qt, t = ku, u = Cu, a = io;
    t.subtreeFlags & 10256 || t.flags & 10256 ? ml = 5 : (ml = 0, ku = Qt = null, Eo(l, l.pendingLanes));
    var e = l.pendingLanes;
    if (e === 0 && (Xt = null), pc(u), t = t.stateNode, xl && typeof xl.onCommitFiberRoot == "function")
      try {
        xl.onCommitFiberRoot(
          Wa,
          t,
          void 0,
          (t.current.flags & 128) === 128
        );
      } catch {
      }
    if (a !== null) {
      t = p.T, e = Q.p, Q.p = 2, p.T = null;
      try {
        for (var n = l.onRecoverableError, f = 0; f < a.length; f++) {
          var c = a[f];
          n(c.value, {
            componentStack: c.stack
          });
        }
      } finally {
        p.T = t, Q.p = e;
      }
    }
    Cu & 3 && Yn(), et(l), e = l.pendingLanes, u & 4194090 && e & 42 ? l === nc ? Ha++ : (Ha = 0, nc = l) : Ha = 0, ce(0);
  }
}
function Eo(l, t) {
  (l.pooledCacheLanes &= t) === 0 && (t = l.pooledCache, t != null && (l.pooledCache = null, ue(t)));
}
function Yn(l) {
  return go(), So(), bo(), To();
}
function To() {
  if (ml !== 5) return !1;
  var l = Qt, t = ac;
  ac = 0;
  var u = pc(Cu), a = p.T, e = Q.p;
  try {
    Q.p = 32 > u ? 32 : u, p.T = null, u = ec, ec = null;
    var n = Qt, f = Cu;
    if (ml = 0, ku = Qt = null, Cu = 0, C & 6) throw Error(S(331));
    var c = C;
    if (C |= 4, fo(n.current), ao(
      n,
      n.current,
      f,
      u
    ), C = c, ce(0, !1), xl && typeof xl.onPostCommitFiberRoot == "function")
      try {
        xl.onPostCommitFiberRoot(Wa, n);
      } catch {
      }
    return !0;
  } finally {
    Q.p = e, p.T = a, Eo(l, t);
  }
}
function _s(l, t, u) {
  t = Kl(u, t), t = If(l.stateNode, t, 2), l = Gt(l, t, 2), l !== null && (Fa(l, 2), et(l));
}
function K(l, t, u) {
  if (l.tag === 3)
    _s(l, l, u);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        _s(
          t,
          l,
          u
        );
        break;
      } else if (t.tag === 1) {
        var a = t.stateNode;
        if (typeof t.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (Xt === null || !Xt.has(a))) {
          l = Kl(u, l), u = G0(2), a = Gt(t, u, 2), a !== null && (X0(
            u,
            a,
            t,
            l
          ), Fa(a, 2), et(a));
          break;
        }
      }
      t = t.return;
    }
}
function mf(l, t, u) {
  var a = l.pingCache;
  if (a === null) {
    a = l.pingCache = new $y();
    var e = /* @__PURE__ */ new Set();
    a.set(t, e);
  } else
    e = a.get(t), e === void 0 && (e = /* @__PURE__ */ new Set(), a.set(t, e));
  e.has(u) || (fi = !0, e.add(u), l = Py.bind(null, l, t, u), t.then(l, l));
}
function Py(l, t, u) {
  var a = l.pingCache;
  a !== null && a.delete(t), l.pingedLanes |= l.suspendedLanes & u, l.warmLanes &= ~u, J === l && (G & u) === u && (ll === 4 || ll === 3 && (G & 62914560) === G && 300 > tt() - ii ? !(C & 2) && Fu(l, 0) : ci |= u, Wu === G && (Wu = 0)), et(l);
}
function Ao(l, t) {
  t === 0 && (t = md()), l = aa(l, t), l !== null && (Fa(l, t), et(l));
}
function lh(l) {
  var t = l.memoizedState, u = 0;
  t !== null && (u = t.retryLane), Ao(l, u);
}
function th(l, t) {
  var u = 0;
  switch (l.tag) {
    case 13:
      var a = l.stateNode, e = l.memoizedState;
      e !== null && (u = e.retryLane);
      break;
    case 19:
      a = l.stateNode;
      break;
    case 22:
      a = l.stateNode._retryCache;
      break;
    default:
      throw Error(S(314));
  }
  a !== null && a.delete(t), Ao(l, u);
}
function uh(l, t) {
  return Mc(l, t);
}
var sn = null, Tu = null, cc = !1, dn = !1, gf = !1, cu = 0;
function et(l) {
  l !== Tu && l.next === null && (Tu === null ? sn = Tu = l : Tu = Tu.next = l), dn = !0, cc || (cc = !0, eh());
}
function ce(l, t) {
  if (!gf && dn) {
    gf = !0;
    do
      for (var u = !1, a = sn; a !== null; ) {
        if (l !== 0) {
          var e = a.pendingLanes;
          if (e === 0) var n = 0;
          else {
            var f = a.suspendedLanes, c = a.pingedLanes;
            n = (1 << 31 - Yl(42 | l) + 1) - 1, n &= e & ~(f & ~c), n = n & 201326741 ? n & 201326741 | 1 : n ? n | 2 : 0;
          }
          n !== 0 && (u = !0, Os(a, n));
        } else
          n = G, n = An(
            a,
            a === J ? n : 0,
            a.cancelPendingCommit !== null || a.timeoutHandle !== -1
          ), !(n & 3) || ka(a, n) || (u = !0, Os(a, n));
        a = a.next;
      }
    while (u);
    gf = !1;
  }
}
function ah() {
  zo();
}
function zo() {
  dn = cc = !1;
  var l = 0;
  cu !== 0 && (vh() && (l = cu), cu = 0);
  for (var t = tt(), u = null, a = sn; a !== null; ) {
    var e = a.next, n = _o(a, t);
    n === 0 ? (a.next = null, u === null ? sn = e : u.next = e, e === null && (Tu = u)) : (u = a, (l !== 0 || n & 3) && (dn = !0)), a = e;
  }
  ce(l);
}
function _o(l, t) {
  for (var u = l.suspendedLanes, a = l.pingedLanes, e = l.expirationTimes, n = l.pendingLanes & -62914561; 0 < n; ) {
    var f = 31 - Yl(n), c = 1 << f, i = e[f];
    i === -1 ? (!(c & u) || c & a) && (e[f] = Uv(c, t)) : i <= t && (l.expiredLanes |= c), n &= ~c;
  }
  if (t = J, u = G, u = An(
    l,
    l === t ? u : 0,
    l.cancelPendingCommit !== null || l.timeoutHandle !== -1
  ), a = l.callbackNode, u === 0 || l === t && (j === 2 || j === 9) || l.cancelPendingCommit !== null)
    return a !== null && a !== null && Zn(a), l.callbackNode = null, l.callbackPriority = 0;
  if (!(u & 3) || ka(l, u)) {
    if (t = u & -u, t === l.callbackPriority) return t;
    switch (a !== null && Zn(a), pc(u)) {
      case 2:
      case 8:
        u = yd;
        break;
      case 32:
        u = Ke;
        break;
      case 268435456:
        u = hd;
        break;
      default:
        u = Ke;
    }
    return a = Oo.bind(null, l), u = Mc(u, a), l.callbackPriority = t, l.callbackNode = u, t;
  }
  return a !== null && a !== null && Zn(a), l.callbackPriority = 2, l.callbackNode = null, 2;
}
function Oo(l, t) {
  if (ml !== 0 && ml !== 5)
    return l.callbackNode = null, l.callbackPriority = 0, null;
  var u = l.callbackNode;
  if (Yn() && l.callbackNode !== u)
    return null;
  var a = G;
  return a = An(
    l,
    l === J ? a : 0,
    l.cancelPendingCommit !== null || l.timeoutHandle !== -1
  ), a === 0 ? null : (oo(l, a, t), _o(l, tt()), l.callbackNode != null && l.callbackNode === u ? Oo.bind(null, l) : null);
}
function Os(l, t) {
  if (Yn()) return null;
  oo(l, t, !0);
}
function eh() {
  hh(function() {
    C & 6 ? Mc(
      vd,
      ah
    ) : zo();
  });
}
function di() {
  return cu === 0 && (cu = rd()), cu;
}
function Ms(l) {
  return l == null || typeof l == "symbol" || typeof l == "boolean" ? null : typeof l == "function" ? l : Ue("" + l);
}
function Ds(l, t) {
  var u = t.ownerDocument.createElement("input");
  return u.name = t.name, u.value = t.value, l.id && u.setAttribute("form", l.id), t.parentNode.insertBefore(u, t), l = new FormData(l), u.parentNode.removeChild(u), l;
}
function nh(l, t, u, a, e) {
  if (t === "submit" && u && u.stateNode === e) {
    var n = Ms(
      (e[Dl] || null).action
    ), f = a.submitter;
    f && (t = (t = f[Dl] || null) ? Ms(t.formAction) : f.getAttribute("formAction"), t !== null && (n = t, f = null));
    var c = new zn(
      "action",
      "action",
      null,
      a,
      e
    );
    l.push({
      event: c,
      listeners: [
        {
          instance: null,
          listener: function() {
            if (a.defaultPrevented) {
              if (cu !== 0) {
                var i = f ? Ds(e, f) : new FormData(e);
                kf(
                  u,
                  {
                    pending: !0,
                    data: i,
                    method: e.method,
                    action: n
                  },
                  null,
                  i
                );
              }
            } else
              typeof n == "function" && (c.preventDefault(), i = f ? Ds(e, f) : new FormData(e), kf(
                u,
                {
                  pending: !0,
                  data: i,
                  method: e.method,
                  action: n
                },
                n,
                i
              ));
          },
          currentTarget: e
        }
      ]
    });
  }
}
for (var Sf = 0; Sf < Xf.length; Sf++) {
  var bf = Xf[Sf], fh = bf.toLowerCase(), ch = bf[0].toUpperCase() + bf.slice(1);
  kl(
    fh,
    "on" + ch
  );
}
kl(Qd, "onAnimationEnd");
kl(jd, "onAnimationIteration");
kl(Cd, "onAnimationStart");
kl("dblclick", "onDoubleClick");
kl("focusin", "onFocus");
kl("focusout", "onBlur");
kl(_y, "onTransitionRun");
kl(Oy, "onTransitionStart");
kl(My, "onTransitionCancel");
kl(Zd, "onTransitionEnd");
Vu("onMouseEnter", ["mouseout", "mouseover"]);
Vu("onMouseLeave", ["mouseout", "mouseover"]);
Vu("onPointerEnter", ["pointerout", "pointerover"]);
Vu("onPointerLeave", ["pointerout", "pointerover"]);
vu(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(" ")
);
vu(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " "
  )
);
vu("onBeforeInput", [
  "compositionend",
  "keypress",
  "textInput",
  "paste"
]);
vu(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" ")
);
vu(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" ")
);
vu(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
);
var Ca = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
  " "
), ih = new Set(
  "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Ca)
);
function Mo(l, t) {
  t = (t & 4) !== 0;
  for (var u = 0; u < l.length; u++) {
    var a = l[u], e = a.event;
    a = a.listeners;
    l: {
      var n = void 0;
      if (t)
        for (var f = a.length - 1; 0 <= f; f--) {
          var c = a[f], i = c.instance, o = c.currentTarget;
          if (c = c.listener, i !== n && e.isPropagationStopped())
            break l;
          n = c, e.currentTarget = o;
          try {
            n(e);
          } catch (m) {
            un(m);
          }
          e.currentTarget = null, n = i;
        }
      else
        for (f = 0; f < a.length; f++) {
          if (c = a[f], i = c.instance, o = c.currentTarget, c = c.listener, i !== n && e.isPropagationStopped())
            break l;
          n = c, e.currentTarget = o;
          try {
            n(e);
          } catch (m) {
            un(m);
          }
          e.currentTarget = null, n = i;
        }
    }
  }
}
function x(l, t) {
  var u = t[Nf];
  u === void 0 && (u = t[Nf] = /* @__PURE__ */ new Set());
  var a = l + "__bubble";
  u.has(a) || (Do(t, l, 2, !1), u.add(a));
}
function Ef(l, t, u) {
  var a = 0;
  t && (a |= 4), Do(
    u,
    l,
    a,
    t
  );
}
var _e = "_reactListening" + Math.random().toString(36).slice(2);
function oi(l) {
  if (!l[_e]) {
    l[_e] = !0, Ed.forEach(function(u) {
      u !== "selectionchange" && (ih.has(u) || Ef(u, !1, l), Ef(u, !0, l));
    });
    var t = l.nodeType === 9 ? l : l.ownerDocument;
    t === null || t[_e] || (t[_e] = !0, Ef("selectionchange", !1, t));
  }
}
function Do(l, t, u, a) {
  switch (Qo(t)) {
    case 2:
      var e = Bh;
      break;
    case 8:
      e = qh;
      break;
    default:
      e = ri;
  }
  u = e.bind(
    null,
    t,
    u,
    l
  ), e = void 0, !Bf || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (e = !0), a ? e !== void 0 ? l.addEventListener(t, u, {
    capture: !0,
    passive: e
  }) : l.addEventListener(t, u, !0) : e !== void 0 ? l.addEventListener(t, u, {
    passive: e
  }) : l.addEventListener(t, u, !1);
}
function Tf(l, t, u, a, e) {
  var n = a;
  if (!(t & 1) && !(t & 2) && a !== null)
    l: for (; ; ) {
      if (a === null) return;
      var f = a.tag;
      if (f === 3 || f === 4) {
        var c = a.stateNode.containerInfo;
        if (c === e) break;
        if (f === 4)
          for (f = a.return; f !== null; ) {
            var i = f.tag;
            if ((i === 3 || i === 4) && f.stateNode.containerInfo === e)
              return;
            f = f.return;
          }
        for (; c !== null; ) {
          if (f = _u(c), f === null) return;
          if (i = f.tag, i === 5 || i === 6 || i === 26 || i === 27) {
            a = n = f;
            continue l;
          }
          c = c.parentNode;
        }
      }
      a = a.return;
    }
  pd(function() {
    var o = n, m = Nc(u), r = [];
    l: {
      var v = Vd.get(l);
      if (v !== void 0) {
        var h = zn, O = l;
        switch (l) {
          case "keypress":
            if (Ne(u) === 0) break l;
          case "keydown":
          case "keyup":
            h = uy;
            break;
          case "focusin":
            O = "focus", h = kn;
            break;
          case "focusout":
            O = "blur", h = kn;
            break;
          case "beforeblur":
          case "afterblur":
            h = kn;
            break;
          case "click":
            if (u.button === 2) break l;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            h = Yi;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            h = Kv;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            h = ny;
            break;
          case Qd:
          case jd:
          case Cd:
            h = wv;
            break;
          case Zd:
            h = cy;
            break;
          case "scroll":
          case "scrollend":
            h = Zv;
            break;
          case "wheel":
            h = sy;
            break;
          case "copy":
          case "cut":
          case "paste":
            h = Wv;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            h = qi;
            break;
          case "toggle":
          case "beforetoggle":
            h = oy;
        }
        var z = (t & 4) !== 0, B = !z && (l === "scroll" || l === "scrollend"), d = z ? v !== null ? v + "Capture" : null : v;
        z = [];
        for (var s = o, y; s !== null; ) {
          var g = s;
          if (y = g.stateNode, g = g.tag, g !== 5 && g !== 26 && g !== 27 || y === null || d === null || (g = Ba(s, d), g != null && z.push(
            Za(s, g, y)
          )), B) break;
          s = s.return;
        }
        0 < z.length && (v = new h(
          v,
          O,
          null,
          u,
          m
        ), r.push({ event: v, listeners: z }));
      }
    }
    if (!(t & 7)) {
      l: {
        if (v = l === "mouseover" || l === "pointerover", h = l === "mouseout" || l === "pointerout", v && u !== Yf && (O = u.relatedTarget || u.fromElement) && (_u(O) || O[ta]))
          break l;
        if ((h || v) && (v = m.window === m ? m : (v = m.ownerDocument) ? v.defaultView || v.parentWindow : window, h ? (O = u.relatedTarget || u.toElement, h = o, O = O ? _u(O) : null, O !== null && (B = $a(O), z = O.tag, O !== B || z !== 5 && z !== 27 && z !== 6) && (O = null)) : (h = null, O = o), h !== O)) {
          if (z = Yi, g = "onMouseLeave", d = "onMouseEnter", s = "mouse", (l === "pointerout" || l === "pointerover") && (z = qi, g = "onPointerLeave", d = "onPointerEnter", s = "pointer"), B = h == null ? v : ga(h), y = O == null ? v : ga(O), v = new z(
            g,
            s + "leave",
            h,
            u,
            m
          ), v.target = B, v.relatedTarget = y, g = null, _u(m) === o && (z = new z(
            d,
            s + "enter",
            O,
            u,
            m
          ), z.target = y, z.relatedTarget = B, g = z), B = g, h && O)
            t: {
              for (z = h, d = O, s = 0, y = z; y; y = gu(y))
                s++;
              for (y = 0, g = d; g; g = gu(g))
                y++;
              for (; 0 < s - y; )
                z = gu(z), s--;
              for (; 0 < y - s; )
                d = gu(d), y--;
              for (; s--; ) {
                if (z === d || d !== null && z === d.alternate)
                  break t;
                z = gu(z), d = gu(d);
              }
              z = null;
            }
          else z = null;
          h !== null && ps(
            r,
            v,
            h,
            z,
            !1
          ), O !== null && B !== null && ps(
            r,
            B,
            O,
            z,
            !0
          );
        }
      }
      l: {
        if (v = o ? ga(o) : window, h = v.nodeName && v.nodeName.toLowerCase(), h === "select" || h === "input" && v.type === "file")
          var T = ji;
        else if (Qi(v))
          if (Yd)
            T = Ty;
          else {
            T = by;
            var U = Sy;
          }
        else
          h = v.nodeName, !h || h.toLowerCase() !== "input" || v.type !== "checkbox" && v.type !== "radio" ? o && Rc(o.elementType) && (T = ji) : T = Ey;
        if (T && (T = T(l, o))) {
          xd(
            r,
            T,
            u,
            m
          );
          break l;
        }
        U && U(l, v, o), l === "focusout" && o && v.type === "number" && o.memoizedProps.value != null && xf(v, "number", v.value);
      }
      switch (U = o ? ga(o) : window, l) {
        case "focusin":
          (Qi(U) || U.contentEditable === "true") && (Du = U, qf = o, Aa = null);
          break;
        case "focusout":
          Aa = qf = Du = null;
          break;
        case "mousedown":
          Gf = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Gf = !1, Li(r, u, m);
          break;
        case "selectionchange":
          if (zy) break;
        case "keydown":
        case "keyup":
          Li(r, u, m);
      }
      var A;
      if (Yc)
        l: {
          switch (l) {
            case "compositionstart":
              var M = "onCompositionStart";
              break l;
            case "compositionend":
              M = "onCompositionEnd";
              break l;
            case "compositionupdate":
              M = "onCompositionUpdate";
              break l;
          }
          M = void 0;
        }
      else
        Mu ? Nd(l, u) && (M = "onCompositionEnd") : l === "keydown" && u.keyCode === 229 && (M = "onCompositionStart");
      M && (Rd && u.locale !== "ko" && (Mu || M !== "onCompositionStart" ? M === "onCompositionEnd" && Mu && (A = Ud()) : (Ht = m, Hc = "value" in Ht ? Ht.value : Ht.textContent, Mu = !0)), U = on(o, M), 0 < U.length && (M = new Bi(
        M,
        l,
        null,
        u,
        m
      ), r.push({ event: M, listeners: U }), A ? M.data = A : (A = Hd(u), A !== null && (M.data = A)))), (A = yy ? hy(l, u) : ry(l, u)) && (M = on(o, "onBeforeInput"), 0 < M.length && (U = new Bi(
        "onBeforeInput",
        "beforeinput",
        null,
        u,
        m
      ), r.push({
        event: U,
        listeners: M
      }), U.data = A)), nh(
        r,
        l,
        o,
        u,
        m
      );
    }
    Mo(r, t);
  });
}
function Za(l, t, u) {
  return {
    instance: l,
    listener: t,
    currentTarget: u
  };
}
function on(l, t) {
  for (var u = t + "Capture", a = []; l !== null; ) {
    var e = l, n = e.stateNode;
    if (e = e.tag, e !== 5 && e !== 26 && e !== 27 || n === null || (e = Ba(l, u), e != null && a.unshift(
      Za(l, e, n)
    ), e = Ba(l, t), e != null && a.push(
      Za(l, e, n)
    )), l.tag === 3) return a;
    l = l.return;
  }
  return [];
}
function gu(l) {
  if (l === null) return null;
  do
    l = l.return;
  while (l && l.tag !== 5 && l.tag !== 27);
  return l || null;
}
function ps(l, t, u, a, e) {
  for (var n = t._reactName, f = []; u !== null && u !== a; ) {
    var c = u, i = c.alternate, o = c.stateNode;
    if (c = c.tag, i !== null && i === a) break;
    c !== 5 && c !== 26 && c !== 27 || o === null || (i = o, e ? (o = Ba(u, n), o != null && f.unshift(
      Za(u, o, i)
    )) : e || (o = Ba(u, n), o != null && f.push(
      Za(u, o, i)
    ))), u = u.return;
  }
  f.length !== 0 && l.push({ event: t, listeners: f });
}
var sh = /\r\n?/g, dh = /\u0000|\uFFFD/g;
function Us(l) {
  return (typeof l == "string" ? l : "" + l).replace(sh, `
`).replace(dh, "");
}
function po(l, t) {
  return t = Us(t), Us(l) === t;
}
function Bn() {
}
function Z(l, t, u, a, e, n) {
  switch (u) {
    case "children":
      typeof a == "string" ? t === "body" || t === "textarea" && a === "" || Ku(l, a) : (typeof a == "number" || typeof a == "bigint") && t !== "body" && Ku(l, "" + a);
      break;
    case "className":
      ge(l, "class", a);
      break;
    case "tabIndex":
      ge(l, "tabindex", a);
      break;
    case "dir":
    case "role":
    case "viewBox":
    case "width":
    case "height":
      ge(l, u, a);
      break;
    case "style":
      Dd(l, a, n);
      break;
    case "data":
      if (t !== "object") {
        ge(l, "data", a);
        break;
      }
    case "src":
    case "href":
      if (a === "" && (t !== "a" || u !== "href")) {
        l.removeAttribute(u);
        break;
      }
      if (a == null || typeof a == "function" || typeof a == "symbol" || typeof a == "boolean") {
        l.removeAttribute(u);
        break;
      }
      a = Ue("" + a), l.setAttribute(u, a);
      break;
    case "action":
    case "formAction":
      if (typeof a == "function") {
        l.setAttribute(
          u,
          "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
        );
        break;
      } else
        typeof n == "function" && (u === "formAction" ? (t !== "input" && Z(l, t, "name", e.name, e, null), Z(
          l,
          t,
          "formEncType",
          e.formEncType,
          e,
          null
        ), Z(
          l,
          t,
          "formMethod",
          e.formMethod,
          e,
          null
        ), Z(
          l,
          t,
          "formTarget",
          e.formTarget,
          e,
          null
        )) : (Z(l, t, "encType", e.encType, e, null), Z(l, t, "method", e.method, e, null), Z(l, t, "target", e.target, e, null)));
      if (a == null || typeof a == "symbol" || typeof a == "boolean") {
        l.removeAttribute(u);
        break;
      }
      a = Ue("" + a), l.setAttribute(u, a);
      break;
    case "onClick":
      a != null && (l.onclick = Bn);
      break;
    case "onScroll":
      a != null && x("scroll", l);
      break;
    case "onScrollEnd":
      a != null && x("scrollend", l);
      break;
    case "dangerouslySetInnerHTML":
      if (a != null) {
        if (typeof a != "object" || !("__html" in a))
          throw Error(S(61));
        if (u = a.__html, u != null) {
          if (e.children != null) throw Error(S(60));
          l.innerHTML = u;
        }
      }
      break;
    case "multiple":
      l.multiple = a && typeof a != "function" && typeof a != "symbol";
      break;
    case "muted":
      l.muted = a && typeof a != "function" && typeof a != "symbol";
      break;
    case "suppressContentEditableWarning":
    case "suppressHydrationWarning":
    case "defaultValue":
    case "defaultChecked":
    case "innerHTML":
    case "ref":
      break;
    case "autoFocus":
      break;
    case "xlinkHref":
      if (a == null || typeof a == "function" || typeof a == "boolean" || typeof a == "symbol") {
        l.removeAttribute("xlink:href");
        break;
      }
      u = Ue("" + a), l.setAttributeNS(
        "http://www.w3.org/1999/xlink",
        "xlink:href",
        u
      );
      break;
    case "contentEditable":
    case "spellCheck":
    case "draggable":
    case "value":
    case "autoReverse":
    case "externalResourcesRequired":
    case "focusable":
    case "preserveAlpha":
      a != null && typeof a != "function" && typeof a != "symbol" ? l.setAttribute(u, "" + a) : l.removeAttribute(u);
      break;
    case "inert":
    case "allowFullScreen":
    case "async":
    case "autoPlay":
    case "controls":
    case "default":
    case "defer":
    case "disabled":
    case "disablePictureInPicture":
    case "disableRemotePlayback":
    case "formNoValidate":
    case "hidden":
    case "loop":
    case "noModule":
    case "noValidate":
    case "open":
    case "playsInline":
    case "readOnly":
    case "required":
    case "reversed":
    case "scoped":
    case "seamless":
    case "itemScope":
      a && typeof a != "function" && typeof a != "symbol" ? l.setAttribute(u, "") : l.removeAttribute(u);
      break;
    case "capture":
    case "download":
      a === !0 ? l.setAttribute(u, "") : a !== !1 && a != null && typeof a != "function" && typeof a != "symbol" ? l.setAttribute(u, a) : l.removeAttribute(u);
      break;
    case "cols":
    case "rows":
    case "size":
    case "span":
      a != null && typeof a != "function" && typeof a != "symbol" && !isNaN(a) && 1 <= a ? l.setAttribute(u, a) : l.removeAttribute(u);
      break;
    case "rowSpan":
    case "start":
      a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a) ? l.removeAttribute(u) : l.setAttribute(u, a);
      break;
    case "popover":
      x("beforetoggle", l), x("toggle", l), pe(l, "popover", a);
      break;
    case "xlinkActuate":
      ft(
        l,
        "http://www.w3.org/1999/xlink",
        "xlink:actuate",
        a
      );
      break;
    case "xlinkArcrole":
      ft(
        l,
        "http://www.w3.org/1999/xlink",
        "xlink:arcrole",
        a
      );
      break;
    case "xlinkRole":
      ft(
        l,
        "http://www.w3.org/1999/xlink",
        "xlink:role",
        a
      );
      break;
    case "xlinkShow":
      ft(
        l,
        "http://www.w3.org/1999/xlink",
        "xlink:show",
        a
      );
      break;
    case "xlinkTitle":
      ft(
        l,
        "http://www.w3.org/1999/xlink",
        "xlink:title",
        a
      );
      break;
    case "xlinkType":
      ft(
        l,
        "http://www.w3.org/1999/xlink",
        "xlink:type",
        a
      );
      break;
    case "xmlBase":
      ft(
        l,
        "http://www.w3.org/XML/1998/namespace",
        "xml:base",
        a
      );
      break;
    case "xmlLang":
      ft(
        l,
        "http://www.w3.org/XML/1998/namespace",
        "xml:lang",
        a
      );
      break;
    case "xmlSpace":
      ft(
        l,
        "http://www.w3.org/XML/1998/namespace",
        "xml:space",
        a
      );
      break;
    case "is":
      pe(l, "is", a);
      break;
    case "innerText":
    case "textContent":
      break;
    default:
      (!(2 < u.length) || u[0] !== "o" && u[0] !== "O" || u[1] !== "n" && u[1] !== "N") && (u = jv.get(u) || u, pe(l, u, a));
  }
}
function ic(l, t, u, a, e, n) {
  switch (u) {
    case "style":
      Dd(l, a, n);
      break;
    case "dangerouslySetInnerHTML":
      if (a != null) {
        if (typeof a != "object" || !("__html" in a))
          throw Error(S(61));
        if (u = a.__html, u != null) {
          if (e.children != null) throw Error(S(60));
          l.innerHTML = u;
        }
      }
      break;
    case "children":
      typeof a == "string" ? Ku(l, a) : (typeof a == "number" || typeof a == "bigint") && Ku(l, "" + a);
      break;
    case "onScroll":
      a != null && x("scroll", l);
      break;
    case "onScrollEnd":
      a != null && x("scrollend", l);
      break;
    case "onClick":
      a != null && (l.onclick = Bn);
      break;
    case "suppressContentEditableWarning":
    case "suppressHydrationWarning":
    case "innerHTML":
    case "ref":
      break;
    case "innerText":
    case "textContent":
      break;
    default:
      if (!Td.hasOwnProperty(u))
        l: {
          if (u[0] === "o" && u[1] === "n" && (e = u.endsWith("Capture"), t = u.slice(2, e ? u.length - 7 : void 0), n = l[Dl] || null, n = n != null ? n[u] : null, typeof n == "function" && l.removeEventListener(t, n, e), typeof a == "function")) {
            typeof n != "function" && n !== null && (u in l ? l[u] = null : l.hasAttribute(u) && l.removeAttribute(u)), l.addEventListener(t, a, e);
            break l;
          }
          u in l ? l[u] = a : a === !0 ? l.setAttribute(u, "") : pe(l, u, a);
        }
  }
}
function gl(l, t, u) {
  switch (t) {
    case "div":
    case "span":
    case "svg":
    case "path":
    case "a":
    case "g":
    case "p":
    case "li":
      break;
    case "img":
      x("error", l), x("load", l);
      var a = !1, e = !1, n;
      for (n in u)
        if (u.hasOwnProperty(n)) {
          var f = u[n];
          if (f != null)
            switch (n) {
              case "src":
                a = !0;
                break;
              case "srcSet":
                e = !0;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(S(137, t));
              default:
                Z(l, t, n, f, u, null);
            }
        }
      e && Z(l, t, "srcSet", u.srcSet, u, null), a && Z(l, t, "src", u.src, u, null);
      return;
    case "input":
      x("invalid", l);
      var c = n = f = e = null, i = null, o = null;
      for (a in u)
        if (u.hasOwnProperty(a)) {
          var m = u[a];
          if (m != null)
            switch (a) {
              case "name":
                e = m;
                break;
              case "type":
                f = m;
                break;
              case "checked":
                i = m;
                break;
              case "defaultChecked":
                o = m;
                break;
              case "value":
                n = m;
                break;
              case "defaultValue":
                c = m;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (m != null)
                  throw Error(S(137, t));
                break;
              default:
                Z(l, t, a, m, u, null);
            }
        }
      _d(
        l,
        n,
        c,
        i,
        o,
        f,
        e,
        !1
      ), Le(l);
      return;
    case "select":
      x("invalid", l), a = f = n = null;
      for (e in u)
        if (u.hasOwnProperty(e) && (c = u[e], c != null))
          switch (e) {
            case "value":
              n = c;
              break;
            case "defaultValue":
              f = c;
              break;
            case "multiple":
              a = c;
            default:
              Z(l, t, e, c, u, null);
          }
      t = n, u = f, l.multiple = !!a, t != null ? Bu(l, !!a, t, !1) : u != null && Bu(l, !!a, u, !0);
      return;
    case "textarea":
      x("invalid", l), n = e = a = null;
      for (f in u)
        if (u.hasOwnProperty(f) && (c = u[f], c != null))
          switch (f) {
            case "value":
              a = c;
              break;
            case "defaultValue":
              e = c;
              break;
            case "children":
              n = c;
              break;
            case "dangerouslySetInnerHTML":
              if (c != null) throw Error(S(91));
              break;
            default:
              Z(l, t, f, c, u, null);
          }
      Md(l, a, e, n), Le(l);
      return;
    case "option":
      for (i in u)
        if (u.hasOwnProperty(i) && (a = u[i], a != null))
          switch (i) {
            case "selected":
              l.selected = a && typeof a != "function" && typeof a != "symbol";
              break;
            default:
              Z(l, t, i, a, u, null);
          }
      return;
    case "dialog":
      x("beforetoggle", l), x("toggle", l), x("cancel", l), x("close", l);
      break;
    case "iframe":
    case "object":
      x("load", l);
      break;
    case "video":
    case "audio":
      for (a = 0; a < Ca.length; a++)
        x(Ca[a], l);
      break;
    case "image":
      x("error", l), x("load", l);
      break;
    case "details":
      x("toggle", l);
      break;
    case "embed":
    case "source":
    case "link":
      x("error", l), x("load", l);
    case "area":
    case "base":
    case "br":
    case "col":
    case "hr":
    case "keygen":
    case "meta":
    case "param":
    case "track":
    case "wbr":
    case "menuitem":
      for (o in u)
        if (u.hasOwnProperty(o) && (a = u[o], a != null))
          switch (o) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error(S(137, t));
            default:
              Z(l, t, o, a, u, null);
          }
      return;
    default:
      if (Rc(t)) {
        for (m in u)
          u.hasOwnProperty(m) && (a = u[m], a !== void 0 && ic(
            l,
            t,
            m,
            a,
            u,
            void 0
          ));
        return;
      }
  }
  for (c in u)
    u.hasOwnProperty(c) && (a = u[c], a != null && Z(l, t, c, a, u, null));
}
function oh(l, t, u, a) {
  switch (t) {
    case "div":
    case "span":
    case "svg":
    case "path":
    case "a":
    case "g":
    case "p":
    case "li":
      break;
    case "input":
      var e = null, n = null, f = null, c = null, i = null, o = null, m = null;
      for (h in u) {
        var r = u[h];
        if (u.hasOwnProperty(h) && r != null)
          switch (h) {
            case "checked":
              break;
            case "value":
              break;
            case "defaultValue":
              i = r;
            default:
              a.hasOwnProperty(h) || Z(l, t, h, null, a, r);
          }
      }
      for (var v in a) {
        var h = a[v];
        if (r = u[v], a.hasOwnProperty(v) && (h != null || r != null))
          switch (v) {
            case "type":
              n = h;
              break;
            case "name":
              e = h;
              break;
            case "checked":
              o = h;
              break;
            case "defaultChecked":
              m = h;
              break;
            case "value":
              f = h;
              break;
            case "defaultValue":
              c = h;
              break;
            case "children":
            case "dangerouslySetInnerHTML":
              if (h != null)
                throw Error(S(137, t));
              break;
            default:
              h !== r && Z(
                l,
                t,
                v,
                h,
                a,
                r
              );
          }
      }
      Hf(
        l,
        f,
        c,
        i,
        o,
        m,
        n,
        e
      );
      return;
    case "select":
      h = f = c = v = null;
      for (n in u)
        if (i = u[n], u.hasOwnProperty(n) && i != null)
          switch (n) {
            case "value":
              break;
            case "multiple":
              h = i;
            default:
              a.hasOwnProperty(n) || Z(
                l,
                t,
                n,
                null,
                a,
                i
              );
          }
      for (e in a)
        if (n = a[e], i = u[e], a.hasOwnProperty(e) && (n != null || i != null))
          switch (e) {
            case "value":
              v = n;
              break;
            case "defaultValue":
              c = n;
              break;
            case "multiple":
              f = n;
            default:
              n !== i && Z(
                l,
                t,
                e,
                n,
                a,
                i
              );
          }
      t = c, u = f, a = h, v != null ? Bu(l, !!u, v, !1) : !!a != !!u && (t != null ? Bu(l, !!u, t, !0) : Bu(l, !!u, u ? [] : "", !1));
      return;
    case "textarea":
      h = v = null;
      for (c in u)
        if (e = u[c], u.hasOwnProperty(c) && e != null && !a.hasOwnProperty(c))
          switch (c) {
            case "value":
              break;
            case "children":
              break;
            default:
              Z(l, t, c, null, a, e);
          }
      for (f in a)
        if (e = a[f], n = u[f], a.hasOwnProperty(f) && (e != null || n != null))
          switch (f) {
            case "value":
              v = e;
              break;
            case "defaultValue":
              h = e;
              break;
            case "children":
              break;
            case "dangerouslySetInnerHTML":
              if (e != null) throw Error(S(91));
              break;
            default:
              e !== n && Z(l, t, f, e, a, n);
          }
      Od(l, v, h);
      return;
    case "option":
      for (var O in u)
        if (v = u[O], u.hasOwnProperty(O) && v != null && !a.hasOwnProperty(O))
          switch (O) {
            case "selected":
              l.selected = !1;
              break;
            default:
              Z(
                l,
                t,
                O,
                null,
                a,
                v
              );
          }
      for (i in a)
        if (v = a[i], h = u[i], a.hasOwnProperty(i) && v !== h && (v != null || h != null))
          switch (i) {
            case "selected":
              l.selected = v && typeof v != "function" && typeof v != "symbol";
              break;
            default:
              Z(
                l,
                t,
                i,
                v,
                a,
                h
              );
          }
      return;
    case "img":
    case "link":
    case "area":
    case "base":
    case "br":
    case "col":
    case "embed":
    case "hr":
    case "keygen":
    case "meta":
    case "param":
    case "source":
    case "track":
    case "wbr":
    case "menuitem":
      for (var z in u)
        v = u[z], u.hasOwnProperty(z) && v != null && !a.hasOwnProperty(z) && Z(l, t, z, null, a, v);
      for (o in a)
        if (v = a[o], h = u[o], a.hasOwnProperty(o) && v !== h && (v != null || h != null))
          switch (o) {
            case "children":
            case "dangerouslySetInnerHTML":
              if (v != null)
                throw Error(S(137, t));
              break;
            default:
              Z(
                l,
                t,
                o,
                v,
                a,
                h
              );
          }
      return;
    default:
      if (Rc(t)) {
        for (var B in u)
          v = u[B], u.hasOwnProperty(B) && v !== void 0 && !a.hasOwnProperty(B) && ic(
            l,
            t,
            B,
            void 0,
            a,
            v
          );
        for (m in a)
          v = a[m], h = u[m], !a.hasOwnProperty(m) || v === h || v === void 0 && h === void 0 || ic(
            l,
            t,
            m,
            v,
            a,
            h
          );
        return;
      }
  }
  for (var d in u)
    v = u[d], u.hasOwnProperty(d) && v != null && !a.hasOwnProperty(d) && Z(l, t, d, null, a, v);
  for (r in a)
    v = a[r], h = u[r], !a.hasOwnProperty(r) || v === h || v == null && h == null || Z(l, t, r, v, a, h);
}
var sc = null, dc = null;
function vn(l) {
  return l.nodeType === 9 ? l : l.ownerDocument;
}
function Rs(l) {
  switch (l) {
    case "http://www.w3.org/2000/svg":
      return 1;
    case "http://www.w3.org/1998/Math/MathML":
      return 2;
    default:
      return 0;
  }
}
function Uo(l, t) {
  if (l === 0)
    switch (t) {
      case "svg":
        return 1;
      case "math":
        return 2;
      default:
        return 0;
    }
  return l === 1 && t === "foreignObject" ? 0 : l;
}
function oc(l, t) {
  return l === "textarea" || l === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var Af = null;
function vh() {
  var l = window.event;
  return l && l.type === "popstate" ? l === Af ? !1 : (Af = l, !0) : (Af = null, !1);
}
var Ro = typeof setTimeout == "function" ? setTimeout : void 0, yh = typeof clearTimeout == "function" ? clearTimeout : void 0, Ns = typeof Promise == "function" ? Promise : void 0, hh = typeof queueMicrotask == "function" ? queueMicrotask : typeof Ns < "u" ? function(l) {
  return Ns.resolve(null).then(l).catch(rh);
} : Ro;
function rh(l) {
  setTimeout(function() {
    throw l;
  });
}
function wt(l) {
  return l === "head";
}
function Hs(l, t) {
  var u = t, a = 0, e = 0;
  do {
    var n = u.nextSibling;
    if (l.removeChild(u), n && n.nodeType === 8)
      if (u = n.data, u === "/$") {
        if (0 < a && 8 > a) {
          u = a;
          var f = l.ownerDocument;
          if (u & 1 && xa(f.documentElement), u & 2 && xa(f.body), u & 4)
            for (u = f.head, xa(u), f = u.firstChild; f; ) {
              var c = f.nextSibling, i = f.nodeName;
              f[Ia] || i === "SCRIPT" || i === "STYLE" || i === "LINK" && f.rel.toLowerCase() === "stylesheet" || u.removeChild(f), f = c;
            }
        }
        if (e === 0) {
          l.removeChild(n), wa(t);
          return;
        }
        e--;
      } else
        u === "$" || u === "$?" || u === "$!" ? e++ : a = u.charCodeAt(0) - 48;
    else a = 0;
    u = n;
  } while (u);
  wa(t);
}
function vc(l) {
  var t = l.firstChild;
  for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
    var u = t;
    switch (t = t.nextSibling, u.nodeName) {
      case "HTML":
      case "HEAD":
      case "BODY":
        vc(u), Uc(u);
        continue;
      case "SCRIPT":
      case "STYLE":
        continue;
      case "LINK":
        if (u.rel.toLowerCase() === "stylesheet") continue;
    }
    l.removeChild(u);
  }
}
function mh(l, t, u, a) {
  for (; l.nodeType === 1; ) {
    var e = u;
    if (l.nodeName.toLowerCase() !== t.toLowerCase()) {
      if (!a && (l.nodeName !== "INPUT" || l.type !== "hidden"))
        break;
    } else if (a) {
      if (!l[Ia])
        switch (t) {
          case "meta":
            if (!l.hasAttribute("itemprop")) break;
            return l;
          case "link":
            if (n = l.getAttribute("rel"), n === "stylesheet" && l.hasAttribute("data-precedence"))
              break;
            if (n !== e.rel || l.getAttribute("href") !== (e.href == null || e.href === "" ? null : e.href) || l.getAttribute("crossorigin") !== (e.crossOrigin == null ? null : e.crossOrigin) || l.getAttribute("title") !== (e.title == null ? null : e.title))
              break;
            return l;
          case "style":
            if (l.hasAttribute("data-precedence")) break;
            return l;
          case "script":
            if (n = l.getAttribute("src"), (n !== (e.src == null ? null : e.src) || l.getAttribute("type") !== (e.type == null ? null : e.type) || l.getAttribute("crossorigin") !== (e.crossOrigin == null ? null : e.crossOrigin)) && n && l.hasAttribute("async") && !l.hasAttribute("itemprop"))
              break;
            return l;
          default:
            return l;
        }
    } else if (t === "input" && l.type === "hidden") {
      var n = e.name == null ? null : "" + e.name;
      if (e.type === "hidden" && l.getAttribute("name") === n)
        return l;
    } else return l;
    if (l = Wl(l.nextSibling), l === null) break;
  }
  return null;
}
function gh(l, t, u) {
  if (t === "") return null;
  for (; l.nodeType !== 3; )
    if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !u || (l = Wl(l.nextSibling), l === null)) return null;
  return l;
}
function yc(l) {
  return l.data === "$!" || l.data === "$?" && l.ownerDocument.readyState === "complete";
}
function Sh(l, t) {
  var u = l.ownerDocument;
  if (l.data !== "$?" || u.readyState === "complete")
    t();
  else {
    var a = function() {
      t(), u.removeEventListener("DOMContentLoaded", a);
    };
    u.addEventListener("DOMContentLoaded", a), l._reactRetry = a;
  }
}
function Wl(l) {
  for (; l != null; l = l.nextSibling) {
    var t = l.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (t = l.data, t === "$" || t === "$!" || t === "$?" || t === "F!" || t === "F")
        break;
      if (t === "/$") return null;
    }
  }
  return l;
}
var hc = null;
function xs(l) {
  l = l.previousSibling;
  for (var t = 0; l; ) {
    if (l.nodeType === 8) {
      var u = l.data;
      if (u === "$" || u === "$!" || u === "$?") {
        if (t === 0) return l;
        t--;
      } else u === "/$" && t++;
    }
    l = l.previousSibling;
  }
  return null;
}
function No(l, t, u) {
  switch (t = vn(u), l) {
    case "html":
      if (l = t.documentElement, !l) throw Error(S(452));
      return l;
    case "head":
      if (l = t.head, !l) throw Error(S(453));
      return l;
    case "body":
      if (l = t.body, !l) throw Error(S(454));
      return l;
    default:
      throw Error(S(451));
  }
}
function xa(l) {
  for (var t = l.attributes; t.length; )
    l.removeAttributeNode(t[0]);
  Uc(l);
}
var wl = /* @__PURE__ */ new Map(), Ys = /* @__PURE__ */ new Set();
function yn(l) {
  return typeof l.getRootNode == "function" ? l.getRootNode() : l.nodeType === 9 ? l : l.ownerDocument;
}
var Tt = Q.d;
Q.d = {
  f: bh,
  r: Eh,
  D: Th,
  C: Ah,
  L: zh,
  m: _h,
  X: Mh,
  S: Oh,
  M: Dh
};
function bh() {
  var l = Tt.f(), t = Hn();
  return l || t;
}
function Eh(l) {
  var t = ua(l);
  t !== null && t.tag === 5 && t.type === "form" ? z0(t) : Tt.r(l);
}
var na = typeof document > "u" ? null : document;
function Ho(l, t, u) {
  var a = na;
  if (a && typeof t == "string" && t) {
    var e = Vl(t);
    e = 'link[rel="' + l + '"][href="' + e + '"]', typeof u == "string" && (e += '[crossorigin="' + u + '"]'), Ys.has(e) || (Ys.add(e), l = { rel: l, crossOrigin: u, href: t }, a.querySelector(e) === null && (t = a.createElement("link"), gl(t, "link", l), ol(t), a.head.appendChild(t)));
  }
}
function Th(l) {
  Tt.D(l), Ho("dns-prefetch", l, null);
}
function Ah(l, t) {
  Tt.C(l, t), Ho("preconnect", l, t);
}
function zh(l, t, u) {
  Tt.L(l, t, u);
  var a = na;
  if (a && l && t) {
    var e = 'link[rel="preload"][as="' + Vl(t) + '"]';
    t === "image" && u && u.imageSrcSet ? (e += '[imagesrcset="' + Vl(
      u.imageSrcSet
    ) + '"]', typeof u.imageSizes == "string" && (e += '[imagesizes="' + Vl(
      u.imageSizes
    ) + '"]')) : e += '[href="' + Vl(l) + '"]';
    var n = e;
    switch (t) {
      case "style":
        n = Iu(l);
        break;
      case "script":
        n = fa(l);
    }
    wl.has(n) || (l = $(
      {
        rel: "preload",
        href: t === "image" && u && u.imageSrcSet ? void 0 : l,
        as: t
      },
      u
    ), wl.set(n, l), a.querySelector(e) !== null || t === "style" && a.querySelector(ie(n)) || t === "script" && a.querySelector(se(n)) || (t = a.createElement("link"), gl(t, "link", l), ol(t), a.head.appendChild(t)));
  }
}
function _h(l, t) {
  Tt.m(l, t);
  var u = na;
  if (u && l) {
    var a = t && typeof t.as == "string" ? t.as : "script", e = 'link[rel="modulepreload"][as="' + Vl(a) + '"][href="' + Vl(l) + '"]', n = e;
    switch (a) {
      case "audioworklet":
      case "paintworklet":
      case "serviceworker":
      case "sharedworker":
      case "worker":
      case "script":
        n = fa(l);
    }
    if (!wl.has(n) && (l = $({ rel: "modulepreload", href: l }, t), wl.set(n, l), u.querySelector(e) === null)) {
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          if (u.querySelector(se(n)))
            return;
      }
      a = u.createElement("link"), gl(a, "link", l), ol(a), u.head.appendChild(a);
    }
  }
}
function Oh(l, t, u) {
  Tt.S(l, t, u);
  var a = na;
  if (a && l) {
    var e = Yu(a).hoistableStyles, n = Iu(l);
    t = t || "default";
    var f = e.get(n);
    if (!f) {
      var c = { loading: 0, preload: null };
      if (f = a.querySelector(
        ie(n)
      ))
        c.loading = 5;
      else {
        l = $(
          { rel: "stylesheet", href: l, "data-precedence": t },
          u
        ), (u = wl.get(n)) && vi(l, u);
        var i = f = a.createElement("link");
        ol(i), gl(i, "link", l), i._p = new Promise(function(o, m) {
          i.onload = o, i.onerror = m;
        }), i.addEventListener("load", function() {
          c.loading |= 1;
        }), i.addEventListener("error", function() {
          c.loading |= 2;
        }), c.loading |= 4, Xe(f, t, a);
      }
      f = {
        type: "stylesheet",
        instance: f,
        count: 1,
        state: c
      }, e.set(n, f);
    }
  }
}
function Mh(l, t) {
  Tt.X(l, t);
  var u = na;
  if (u && l) {
    var a = Yu(u).hoistableScripts, e = fa(l), n = a.get(e);
    n || (n = u.querySelector(se(e)), n || (l = $({ src: l, async: !0 }, t), (t = wl.get(e)) && yi(l, t), n = u.createElement("script"), ol(n), gl(n, "link", l), u.head.appendChild(n)), n = {
      type: "script",
      instance: n,
      count: 1,
      state: null
    }, a.set(e, n));
  }
}
function Dh(l, t) {
  Tt.M(l, t);
  var u = na;
  if (u && l) {
    var a = Yu(u).hoistableScripts, e = fa(l), n = a.get(e);
    n || (n = u.querySelector(se(e)), n || (l = $({ src: l, async: !0, type: "module" }, t), (t = wl.get(e)) && yi(l, t), n = u.createElement("script"), ol(n), gl(n, "link", l), u.head.appendChild(n)), n = {
      type: "script",
      instance: n,
      count: 1,
      state: null
    }, a.set(e, n));
  }
}
function Bs(l, t, u, a) {
  var e = (e = Bt.current) ? yn(e) : null;
  if (!e) throw Error(S(446));
  switch (l) {
    case "meta":
    case "title":
      return null;
    case "style":
      return typeof u.precedence == "string" && typeof u.href == "string" ? (t = Iu(u.href), u = Yu(
        e
      ).hoistableStyles, a = u.get(t), a || (a = {
        type: "style",
        instance: null,
        count: 0,
        state: null
      }, u.set(t, a)), a) : { type: "void", instance: null, count: 0, state: null };
    case "link":
      if (u.rel === "stylesheet" && typeof u.href == "string" && typeof u.precedence == "string") {
        l = Iu(u.href);
        var n = Yu(
          e
        ).hoistableStyles, f = n.get(l);
        if (f || (e = e.ownerDocument || e, f = {
          type: "stylesheet",
          instance: null,
          count: 0,
          state: { loading: 0, preload: null }
        }, n.set(l, f), (n = e.querySelector(
          ie(l)
        )) && !n._p && (f.instance = n, f.state.loading = 5), wl.has(l) || (u = {
          rel: "preload",
          as: "style",
          href: u.href,
          crossOrigin: u.crossOrigin,
          integrity: u.integrity,
          media: u.media,
          hrefLang: u.hrefLang,
          referrerPolicy: u.referrerPolicy
        }, wl.set(l, u), n || ph(
          e,
          l,
          u,
          f.state
        ))), t && a === null)
          throw Error(S(528, ""));
        return f;
      }
      if (t && a !== null)
        throw Error(S(529, ""));
      return null;
    case "script":
      return t = u.async, u = u.src, typeof u == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = fa(u), u = Yu(
        e
      ).hoistableScripts, a = u.get(t), a || (a = {
        type: "script",
        instance: null,
        count: 0,
        state: null
      }, u.set(t, a)), a) : { type: "void", instance: null, count: 0, state: null };
    default:
      throw Error(S(444, l));
  }
}
function Iu(l) {
  return 'href="' + Vl(l) + '"';
}
function ie(l) {
  return 'link[rel="stylesheet"][' + l + "]";
}
function xo(l) {
  return $({}, l, {
    "data-precedence": l.precedence,
    precedence: null
  });
}
function ph(l, t, u, a) {
  l.querySelector('link[rel="preload"][as="style"][' + t + "]") ? a.loading = 1 : (t = l.createElement("link"), a.preload = t, t.addEventListener("load", function() {
    return a.loading |= 1;
  }), t.addEventListener("error", function() {
    return a.loading |= 2;
  }), gl(t, "link", u), ol(t), l.head.appendChild(t));
}
function fa(l) {
  return '[src="' + Vl(l) + '"]';
}
function se(l) {
  return "script[async]" + l;
}
function qs(l, t, u) {
  if (t.count++, t.instance === null)
    switch (t.type) {
      case "style":
        var a = l.querySelector(
          'style[data-href~="' + Vl(u.href) + '"]'
        );
        if (a)
          return t.instance = a, ol(a), a;
        var e = $({}, u, {
          "data-href": u.href,
          "data-precedence": u.precedence,
          href: null,
          precedence: null
        });
        return a = (l.ownerDocument || l).createElement(
          "style"
        ), ol(a), gl(a, "style", e), Xe(a, u.precedence, l), t.instance = a;
      case "stylesheet":
        e = Iu(u.href);
        var n = l.querySelector(
          ie(e)
        );
        if (n)
          return t.state.loading |= 4, t.instance = n, ol(n), n;
        a = xo(u), (e = wl.get(e)) && vi(a, e), n = (l.ownerDocument || l).createElement("link"), ol(n);
        var f = n;
        return f._p = new Promise(function(c, i) {
          f.onload = c, f.onerror = i;
        }), gl(n, "link", a), t.state.loading |= 4, Xe(n, u.precedence, l), t.instance = n;
      case "script":
        return n = fa(u.src), (e = l.querySelector(
          se(n)
        )) ? (t.instance = e, ol(e), e) : (a = u, (e = wl.get(n)) && (a = $({}, u), yi(a, e)), l = l.ownerDocument || l, e = l.createElement("script"), ol(e), gl(e, "link", a), l.head.appendChild(e), t.instance = e);
      case "void":
        return null;
      default:
        throw Error(S(443, t.type));
    }
  else
    t.type === "stylesheet" && !(t.state.loading & 4) && (a = t.instance, t.state.loading |= 4, Xe(a, u.precedence, l));
  return t.instance;
}
function Xe(l, t, u) {
  for (var a = u.querySelectorAll(
    'link[rel="stylesheet"][data-precedence],style[data-precedence]'
  ), e = a.length ? a[a.length - 1] : null, n = e, f = 0; f < a.length; f++) {
    var c = a[f];
    if (c.dataset.precedence === t) n = c;
    else if (n !== e) break;
  }
  n ? n.parentNode.insertBefore(l, n.nextSibling) : (t = u.nodeType === 9 ? u.head : u, t.insertBefore(l, t.firstChild));
}
function vi(l, t) {
  l.crossOrigin == null && (l.crossOrigin = t.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy), l.title == null && (l.title = t.title);
}
function yi(l, t) {
  l.crossOrigin == null && (l.crossOrigin = t.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy), l.integrity == null && (l.integrity = t.integrity);
}
var Qe = null;
function Gs(l, t, u) {
  if (Qe === null) {
    var a = /* @__PURE__ */ new Map(), e = Qe = /* @__PURE__ */ new Map();
    e.set(u, a);
  } else
    e = Qe, a = e.get(u), a || (a = /* @__PURE__ */ new Map(), e.set(u, a));
  if (a.has(l)) return a;
  for (a.set(l, null), u = u.getElementsByTagName(l), e = 0; e < u.length; e++) {
    var n = u[e];
    if (!(n[Ia] || n[bl] || l === "link" && n.getAttribute("rel") === "stylesheet") && n.namespaceURI !== "http://www.w3.org/2000/svg") {
      var f = n.getAttribute(t) || "";
      f = l + f;
      var c = a.get(f);
      c ? c.push(n) : a.set(f, [n]);
    }
  }
  return a;
}
function Xs(l, t, u) {
  l = l.ownerDocument || l, l.head.insertBefore(
    u,
    t === "title" ? l.querySelector("head > title") : null
  );
}
function Uh(l, t, u) {
  if (u === 1 || t.itemProp != null) return !1;
  switch (l) {
    case "meta":
    case "title":
      return !0;
    case "style":
      if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "")
        break;
      return !0;
    case "link":
      if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError)
        break;
      switch (t.rel) {
        case "stylesheet":
          return l = t.disabled, typeof t.precedence == "string" && l == null;
        default:
          return !0;
      }
    case "script":
      if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string")
        return !0;
  }
  return !1;
}
function Yo(l) {
  return !(l.type === "stylesheet" && !(l.state.loading & 3));
}
var Va = null;
function Rh() {
}
function Nh(l, t, u) {
  if (Va === null) throw Error(S(475));
  var a = Va;
  if (t.type === "stylesheet" && (typeof u.media != "string" || matchMedia(u.media).matches !== !1) && !(t.state.loading & 4)) {
    if (t.instance === null) {
      var e = Iu(u.href), n = l.querySelector(
        ie(e)
      );
      if (n) {
        l = n._p, l !== null && typeof l == "object" && typeof l.then == "function" && (a.count++, a = hn.bind(a), l.then(a, a)), t.state.loading |= 4, t.instance = n, ol(n);
        return;
      }
      n = l.ownerDocument || l, u = xo(u), (e = wl.get(e)) && vi(u, e), n = n.createElement("link"), ol(n);
      var f = n;
      f._p = new Promise(function(c, i) {
        f.onload = c, f.onerror = i;
      }), gl(n, "link", u), t.instance = n;
    }
    a.stylesheets === null && (a.stylesheets = /* @__PURE__ */ new Map()), a.stylesheets.set(t, l), (l = t.state.preload) && !(t.state.loading & 3) && (a.count++, t = hn.bind(a), l.addEventListener("load", t), l.addEventListener("error", t));
  }
}
function Hh() {
  if (Va === null) throw Error(S(475));
  var l = Va;
  return l.stylesheets && l.count === 0 && rc(l, l.stylesheets), 0 < l.count ? function(t) {
    var u = setTimeout(function() {
      if (l.stylesheets && rc(l, l.stylesheets), l.unsuspend) {
        var a = l.unsuspend;
        l.unsuspend = null, a();
      }
    }, 6e4);
    return l.unsuspend = t, function() {
      l.unsuspend = null, clearTimeout(u);
    };
  } : null;
}
function hn() {
  if (this.count--, this.count === 0) {
    if (this.stylesheets) rc(this, this.stylesheets);
    else if (this.unsuspend) {
      var l = this.unsuspend;
      this.unsuspend = null, l();
    }
  }
}
var rn = null;
function rc(l, t) {
  l.stylesheets = null, l.unsuspend !== null && (l.count++, rn = /* @__PURE__ */ new Map(), t.forEach(xh, l), rn = null, hn.call(l));
}
function xh(l, t) {
  if (!(t.state.loading & 4)) {
    var u = rn.get(l);
    if (u) var a = u.get(null);
    else {
      u = /* @__PURE__ */ new Map(), rn.set(l, u);
      for (var e = l.querySelectorAll(
        "link[data-precedence],style[data-precedence]"
      ), n = 0; n < e.length; n++) {
        var f = e[n];
        (f.nodeName === "LINK" || f.getAttribute("media") !== "not all") && (u.set(f.dataset.precedence, f), a = f);
      }
      a && u.set(null, a);
    }
    e = t.instance, f = e.getAttribute("data-precedence"), n = u.get(f) || a, n === a && u.set(null, e), u.set(f, e), this.count++, a = hn.bind(this), e.addEventListener("load", a), e.addEventListener("error", a), n ? n.parentNode.insertBefore(e, n.nextSibling) : (l = l.nodeType === 9 ? l.head : l, l.insertBefore(e, l.firstChild)), t.state.loading |= 4;
  }
}
var Ka = {
  $$typeof: dt,
  Provider: null,
  Consumer: null,
  _currentValue: tu,
  _currentValue2: tu,
  _threadCount: 0
};
function Yh(l, t, u, a, e, n, f, c) {
  this.tag = 1, this.containerInfo = l, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Vn(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Vn(0), this.hiddenUpdates = Vn(null), this.identifierPrefix = a, this.onUncaughtError = e, this.onCaughtError = n, this.onRecoverableError = f, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.incompleteTransitions = /* @__PURE__ */ new Map();
}
function Bo(l, t, u, a, e, n, f, c, i, o, m, r) {
  return l = new Yh(
    l,
    t,
    u,
    f,
    c,
    i,
    o,
    r
  ), t = 1, n === !0 && (t |= 24), n = Hl(3, null, null, t), l.current = n, n.stateNode = l, t = Cc(), t.refCount++, l.pooledCache = t, t.refCount++, n.memoizedState = {
    element: a,
    isDehydrated: u,
    cache: t
  }, Vc(n), l;
}
function qo(l) {
  return l ? (l = Ru, l) : Ru;
}
function Go(l, t, u, a, e, n) {
  e = qo(e), a.context === null ? a.context = e : a.pendingContext = e, a = qt(t), a.payload = { element: u }, n = n === void 0 ? null : n, n !== null && (a.callback = n), u = Gt(l, a, t), u !== null && (ql(u, l, t), Oa(u, l, t));
}
function Qs(l, t) {
  if (l = l.memoizedState, l !== null && l.dehydrated !== null) {
    var u = l.retryLane;
    l.retryLane = u !== 0 && u < t ? u : t;
  }
}
function hi(l, t) {
  Qs(l, t), (l = l.alternate) && Qs(l, t);
}
function Xo(l) {
  if (l.tag === 13) {
    var t = aa(l, 67108864);
    t !== null && ql(t, l, 67108864), hi(l, 67108864);
  }
}
var mn = !0;
function Bh(l, t, u, a) {
  var e = p.T;
  p.T = null;
  var n = Q.p;
  try {
    Q.p = 2, ri(l, t, u, a);
  } finally {
    Q.p = n, p.T = e;
  }
}
function qh(l, t, u, a) {
  var e = p.T;
  p.T = null;
  var n = Q.p;
  try {
    Q.p = 8, ri(l, t, u, a);
  } finally {
    Q.p = n, p.T = e;
  }
}
function ri(l, t, u, a) {
  if (mn) {
    var e = mc(a);
    if (e === null)
      Tf(
        l,
        t,
        a,
        gn,
        u
      ), js(l, a);
    else if (Xh(
      e,
      l,
      t,
      u,
      a
    ))
      a.stopPropagation();
    else if (js(l, a), t & 4 && -1 < Gh.indexOf(l)) {
      for (; e !== null; ) {
        var n = ua(e);
        if (n !== null)
          switch (n.tag) {
            case 3:
              if (n = n.stateNode, n.current.memoizedState.isDehydrated) {
                var f = It(n.pendingLanes);
                if (f !== 0) {
                  var c = n;
                  for (c.pendingLanes |= 2, c.entangledLanes |= 2; f; ) {
                    var i = 1 << 31 - Yl(f);
                    c.entanglements[1] |= i, f &= ~i;
                  }
                  et(n), !(C & 6) && (fn = tt() + 500, ce(0));
                }
              }
              break;
            case 13:
              c = aa(n, 2), c !== null && ql(c, n, 2), Hn(), hi(n, 2);
          }
        if (n = mc(a), n === null && Tf(
          l,
          t,
          a,
          gn,
          u
        ), n === e) break;
        e = n;
      }
      e !== null && a.stopPropagation();
    } else
      Tf(
        l,
        t,
        a,
        null,
        u
      );
  }
}
function mc(l) {
  return l = Nc(l), mi(l);
}
var gn = null;
function mi(l) {
  if (gn = null, l = _u(l), l !== null) {
    var t = $a(l);
    if (t === null) l = null;
    else {
      var u = t.tag;
      if (u === 13) {
        if (l = id(t), l !== null) return l;
        l = null;
      } else if (u === 3) {
        if (t.stateNode.current.memoizedState.isDehydrated)
          return t.tag === 3 ? t.stateNode.containerInfo : null;
        l = null;
      } else t !== l && (l = null);
    }
  }
  return gn = l, null;
}
function Qo(l) {
  switch (l) {
    case "beforetoggle":
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "toggle":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 2;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 8;
    case "message":
      switch (Av()) {
        case vd:
          return 2;
        case yd:
          return 8;
        case Ke:
        case zv:
          return 32;
        case hd:
          return 268435456;
        default:
          return 32;
      }
    default:
      return 32;
  }
}
var gc = !1, jt = null, Ct = null, Zt = null, La = /* @__PURE__ */ new Map(), Ja = /* @__PURE__ */ new Map(), Rt = [], Gh = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
  " "
);
function js(l, t) {
  switch (l) {
    case "focusin":
    case "focusout":
      jt = null;
      break;
    case "dragenter":
    case "dragleave":
      Ct = null;
      break;
    case "mouseover":
    case "mouseout":
      Zt = null;
      break;
    case "pointerover":
    case "pointerout":
      La.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Ja.delete(t.pointerId);
  }
}
function ha(l, t, u, a, e, n) {
  return l === null || l.nativeEvent !== n ? (l = {
    blockedOn: t,
    domEventName: u,
    eventSystemFlags: a,
    nativeEvent: n,
    targetContainers: [e]
  }, t !== null && (t = ua(t), t !== null && Xo(t)), l) : (l.eventSystemFlags |= a, t = l.targetContainers, e !== null && t.indexOf(e) === -1 && t.push(e), l);
}
function Xh(l, t, u, a, e) {
  switch (t) {
    case "focusin":
      return jt = ha(
        jt,
        l,
        t,
        u,
        a,
        e
      ), !0;
    case "dragenter":
      return Ct = ha(
        Ct,
        l,
        t,
        u,
        a,
        e
      ), !0;
    case "mouseover":
      return Zt = ha(
        Zt,
        l,
        t,
        u,
        a,
        e
      ), !0;
    case "pointerover":
      var n = e.pointerId;
      return La.set(
        n,
        ha(
          La.get(n) || null,
          l,
          t,
          u,
          a,
          e
        )
      ), !0;
    case "gotpointercapture":
      return n = e.pointerId, Ja.set(
        n,
        ha(
          Ja.get(n) || null,
          l,
          t,
          u,
          a,
          e
        )
      ), !0;
  }
  return !1;
}
function jo(l) {
  var t = _u(l.target);
  if (t !== null) {
    var u = $a(t);
    if (u !== null) {
      if (t = u.tag, t === 13) {
        if (t = id(u), t !== null) {
          l.blockedOn = t, Nv(l.priority, function() {
            if (u.tag === 13) {
              var a = Bl();
              a = Dc(a);
              var e = aa(u, a);
              e !== null && ql(e, u, a), hi(u, a);
            }
          });
          return;
        }
      } else if (t === 3 && u.stateNode.current.memoizedState.isDehydrated) {
        l.blockedOn = u.tag === 3 ? u.stateNode.containerInfo : null;
        return;
      }
    }
  }
  l.blockedOn = null;
}
function je(l) {
  if (l.blockedOn !== null) return !1;
  for (var t = l.targetContainers; 0 < t.length; ) {
    var u = mc(l.nativeEvent);
    if (u === null) {
      u = l.nativeEvent;
      var a = new u.constructor(
        u.type,
        u
      );
      Yf = a, u.target.dispatchEvent(a), Yf = null;
    } else
      return t = ua(u), t !== null && Xo(t), l.blockedOn = u, !1;
    t.shift();
  }
  return !0;
}
function Cs(l, t, u) {
  je(l) && u.delete(t);
}
function Qh() {
  gc = !1, jt !== null && je(jt) && (jt = null), Ct !== null && je(Ct) && (Ct = null), Zt !== null && je(Zt) && (Zt = null), La.forEach(Cs), Ja.forEach(Cs);
}
function Oe(l, t) {
  l.blockedOn === t && (l.blockedOn = null, gc || (gc = !0, il.unstable_scheduleCallback(
    il.unstable_NormalPriority,
    Qh
  )));
}
var Me = null;
function Zs(l) {
  Me !== l && (Me = l, il.unstable_scheduleCallback(
    il.unstable_NormalPriority,
    function() {
      Me === l && (Me = null);
      for (var t = 0; t < l.length; t += 3) {
        var u = l[t], a = l[t + 1], e = l[t + 2];
        if (typeof a != "function") {
          if (mi(a || u) === null)
            continue;
          break;
        }
        var n = ua(u);
        n !== null && (l.splice(t, 3), t -= 3, kf(
          n,
          {
            pending: !0,
            data: e,
            method: u.method,
            action: a
          },
          a,
          e
        ));
      }
    }
  ));
}
function wa(l) {
  function t(i) {
    return Oe(i, l);
  }
  jt !== null && Oe(jt, l), Ct !== null && Oe(Ct, l), Zt !== null && Oe(Zt, l), La.forEach(t), Ja.forEach(t);
  for (var u = 0; u < Rt.length; u++) {
    var a = Rt[u];
    a.blockedOn === l && (a.blockedOn = null);
  }
  for (; 0 < Rt.length && (u = Rt[0], u.blockedOn === null); )
    jo(u), u.blockedOn === null && Rt.shift();
  if (u = (l.ownerDocument || l).$$reactFormReplay, u != null)
    for (a = 0; a < u.length; a += 3) {
      var e = u[a], n = u[a + 1], f = e[Dl] || null;
      if (typeof n == "function")
        f || Zs(u);
      else if (f) {
        var c = null;
        if (n && n.hasAttribute("formAction")) {
          if (e = n, f = n[Dl] || null)
            c = f.formAction;
          else if (mi(e) !== null) continue;
        } else c = f.action;
        typeof c == "function" ? u[a + 1] = c : (u.splice(a, 3), a -= 3), Zs(u);
      }
    }
}
function gi(l) {
  this._internalRoot = l;
}
qn.prototype.render = gi.prototype.render = function(l) {
  var t = this._internalRoot;
  if (t === null) throw Error(S(409));
  var u = t.current, a = Bl();
  Go(u, a, l, t, null, null);
};
qn.prototype.unmount = gi.prototype.unmount = function() {
  var l = this._internalRoot;
  if (l !== null) {
    this._internalRoot = null;
    var t = l.containerInfo;
    Go(l.current, 2, null, l, null, null), Hn(), t[ta] = null;
  }
};
function qn(l) {
  this._internalRoot = l;
}
qn.prototype.unstable_scheduleHydration = function(l) {
  if (l) {
    var t = bd();
    l = { blockedOn: null, target: l, priority: t };
    for (var u = 0; u < Rt.length && t !== 0 && t < Rt[u].priority; u++) ;
    Rt.splice(u, 0, l), u === 0 && jo(l);
  }
};
var Vs = fd.version;
if (Vs !== "19.1.1")
  throw Error(
    S(
      527,
      Vs,
      "19.1.1"
    )
  );
Q.findDOMNode = function(l) {
  var t = l._reactInternals;
  if (t === void 0)
    throw typeof l.render == "function" ? Error(S(188)) : (l = Object.keys(l).join(","), Error(S(268, l)));
  return l = rv(t), l = l !== null ? sd(l) : null, l = l === null ? null : l.stateNode, l;
};
var jh = {
  bundleType: 0,
  version: "19.1.1",
  rendererPackageName: "react-dom",
  currentDispatcherRef: p,
  reconcilerVersion: "19.1.1"
};
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var De = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!De.isDisabled && De.supportsFiber)
    try {
      Wa = De.inject(
        jh
      ), xl = De;
    } catch {
    }
}
En.createRoot = function(l, t) {
  if (!cd(l)) throw Error(S(299));
  var u = !1, a = "", e = Y0, n = B0, f = q0, c = null;
  return t != null && (t.unstable_strictMode === !0 && (u = !0), t.identifierPrefix !== void 0 && (a = t.identifierPrefix), t.onUncaughtError !== void 0 && (e = t.onUncaughtError), t.onCaughtError !== void 0 && (n = t.onCaughtError), t.onRecoverableError !== void 0 && (f = t.onRecoverableError), t.unstable_transitionCallbacks !== void 0 && (c = t.unstable_transitionCallbacks)), t = Bo(
    l,
    1,
    !1,
    null,
    null,
    u,
    a,
    e,
    n,
    f,
    c,
    null
  ), l[ta] = t.current, oi(l), new gi(t);
};
En.hydrateRoot = function(l, t, u) {
  if (!cd(l)) throw Error(S(299));
  var a = !1, e = "", n = Y0, f = B0, c = q0, i = null, o = null;
  return u != null && (u.unstable_strictMode === !0 && (a = !0), u.identifierPrefix !== void 0 && (e = u.identifierPrefix), u.onUncaughtError !== void 0 && (n = u.onUncaughtError), u.onCaughtError !== void 0 && (f = u.onCaughtError), u.onRecoverableError !== void 0 && (c = u.onRecoverableError), u.unstable_transitionCallbacks !== void 0 && (i = u.unstable_transitionCallbacks), u.formState !== void 0 && (o = u.formState)), t = Bo(
    l,
    1,
    !0,
    t,
    u ?? null,
    a,
    e,
    n,
    f,
    c,
    i,
    o
  ), t.context = qo(null), u = t.current, a = Bl(), a = Dc(a), e = qt(a), e.callback = null, Gt(u, e, a), u = a, t.current.lanes = u, Fa(t, u), et(t), l[ta] = t.current, oi(l), new qn(t);
};
En.version = "19.1.1";
function Co() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Co);
    } catch (l) {
      console.error(l);
    }
}
Co(), ld.exports = En;
var Ch = ld.exports;
function Zh() {
  return {
    bridge: {},
    commandHandlers: /* @__PURE__ */ new Map(),
    instances: /* @__PURE__ */ new Map()
  };
}
function Si() {
  const l = globalThis;
  return l.__MYBOARD_SDK_RUNTIME__ || (l.__MYBOARD_SDK_RUNTIME__ = Zh()), l.__MYBOARD_SDK_RUNTIME__;
}
class Vh {
  constructor() {
    this.states = /* @__PURE__ */ new Map(), this.subscribers = /* @__PURE__ */ new Map(), this.storageKey = "myboard-widget-states", this.loadFromStorage();
  }
  /**
   * Get current state for a widget.
   */
  getState(t) {
    return this.states.get(t);
  }
  /**
   * Set state for a widget. Automatically persists and notifies subscribers.
   */
  setState(t, u) {
    this.states.set(t, u), this.saveToStorage(), this.notifySubscribers(t, u);
  }
  /**
   * Subscribe to state changes for a specific widget.
   * Returns an unsubscribe function.
   */
  subscribe(t, u) {
    return this.subscribers.has(t) || this.subscribers.set(t, /* @__PURE__ */ new Set()), this.subscribers.get(t).add(u), () => {
      const a = this.subscribers.get(t);
      a && (a.delete(u), a.size === 0 && this.subscribers.delete(t));
    };
  }
  /**
   * Clear state for a specific widget.
   */
  clearState(t) {
    this.states.delete(t), this.subscribers.delete(t), this.saveToStorage();
  }
  /**
   * Clear all widget states (useful for testing).
   */
  clearAll() {
    this.states.clear(), this.subscribers.clear(), this.saveToStorage();
  }
  /**
   * Notify all subscribers for a widget.
   */
  notifySubscribers(t, u) {
    const a = this.subscribers.get(t);
    a && a.size > 0 && a.forEach((e) => {
      try {
        e(u);
      } catch (n) {
        console.error(
          `[WidgetStore] Error in subscriber for ${t}:`,
          n
        );
      }
    });
  }
  /**
   * Load states from localStorage.
   */
  loadFromStorage() {
    if (!(typeof window > "u" || typeof localStorage > "u"))
      try {
        const t = localStorage.getItem(this.storageKey);
        if (t) {
          const u = JSON.parse(t);
          Object.entries(u).forEach(([a, e]) => {
            this.states.set(a, e);
          });
        }
      } catch (t) {
        console.warn("[WidgetStore] Failed to load from localStorage:", t);
      }
  }
  /**
   * Save current states to localStorage.
   */
  saveToStorage() {
    if (!(typeof window > "u" || typeof localStorage > "u"))
      try {
        const t = {};
        this.states.forEach((u, a) => {
          t[a] = u;
        }), localStorage.setItem(this.storageKey, JSON.stringify(t));
      } catch (t) {
        console.warn("[WidgetStore] Failed to save to localStorage:", t);
      }
  }
}
const Sc = Si(), Zo = Sc.instances.get("widget-store") ?? new Vh();
Sc.instances.has("widget-store") || Sc.instances.set("widget-store", Zo);
const Sn = Zo;
var Kh = {};
const Vo = Si(), Ko = (l) => `${l}:settings`;
function Gn() {
  return Vo.bridge;
}
function Lh() {
  return Vo.commandHandlers;
}
function Jh(l) {
  const t = Gn();
  return t.getWidgetSettings ? t.getWidgetSettings(l) : Sn.getState(Ko(l));
}
function wh(l, t) {
  const u = Gn();
  if (u.setWidgetSettings) {
    u.setWidgetSettings(l, t);
    return;
  }
  Sn.setState(Ko(l), t);
}
function $h(l) {
  const t = Gn();
  if (!t.beforePublishEvent) return !0;
  try {
    return t.beforePublishEvent(l);
  } catch (u) {
    return typeof Kh > "u" && console.warn("[host-bridge] beforePublishEvent failed; dropping event", u), !1;
  }
}
function Wh(l, t) {
  const u = Gn();
  if (u.registerWidgetCommandHandler)
    return u.registerWidgetCommandHandler(l, t);
  const a = Lh();
  return a.set(l, t), () => {
    a.get(l) === t && a.delete(l);
  };
}
const Pu = Si();
Pu.instances.has("event-subscribers") || Pu.instances.set("event-subscribers", /* @__PURE__ */ new Map());
class kh {
  get subscribers() {
    return Pu.instances.get("event-subscribers");
  }
  /**
   * Publish an event from a widget.
   * Event type is automatically namespaced as `widgetId:eventType`.
   */
  publish(t, u, a) {
    const e = {
      widgetId: t,
      type: u,
      data: a,
      timestamp: Date.now()
    };
    if (!$h(e))
      return;
    const n = `${t}:${u}`, f = this.subscribers.get(n);
    f && f.size > 0 && f.forEach((c) => {
      try {
        c(e);
      } catch (i) {
        console.error(
          `[EventBus] Error in handler for ${n}:`,
          i
        );
      }
    });
  }
  /**
   * Subscribe to events from a specific widget.
   * Returns an unsubscribe function.
   */
  subscribe(t, u, a) {
    const e = `${t}:${u}`;
    return this.subscribers.has(e) || this.subscribers.set(e, /* @__PURE__ */ new Set()), this.subscribers.get(e).add(a), () => {
      const n = this.subscribers.get(e);
      n && (n.delete(a), n.size === 0 && this.subscribers.delete(e));
    };
  }
  /**
   * Clear all subscriptions (useful for cleanup in tests).
   */
  clear() {
    this.subscribers.clear();
  }
}
const Lo = Pu.instances.get("event-bus") ?? new kh();
Pu.instances.has("event-bus") || Pu.instances.set("event-bus", Lo);
const Ft = Lo, Fh = "widget-ready", Ih = "widget-error";
function Ph(l) {
  l.dispatchEvent(new CustomEvent(Fh, { bubbles: !0 }));
}
function l1(l, t) {
  const u = { reason: t };
  l.dispatchEvent(
    new CustomEvent(Ih, { bubbles: !0, detail: u })
  );
}
const Xl = "notes";
function Ks(l) {
  return l.split(",").map((t) => t.trim().toLowerCase()).filter(Boolean).slice(0, 5);
}
function t1(l, t) {
  return typeof l != "string" ? t : l.trim() || t;
}
function u1() {
  const [l, t] = Sl.useState(
    () => Sn.getState(Xl) ?? []
  ), u = Sl.useRef(l), [a, e] = Sl.useState(""), [n, f] = Sl.useState(""), [c, i] = Sl.useState(null), [o, m] = Sl.useState(""), [r, v] = Sl.useState(""), [h, O] = Sl.useState("all"), [z, B] = Sl.useState(() => !!Jh(Xl)?.showArchived);
  Sl.useEffect(() => {
    const b = Ft.subscribe(
      "host",
      "settings-updated",
      (q) => {
        const { widgetId: L, settings: hl } = q.data;
        L === Xl && hl.showArchived !== void 0 && B(hl.showArchived);
      }
    ), _ = Wh(
      Xl,
      async (q) => {
        const { commandType: L, payload: hl } = q;
        if (L === "note.create") {
          const $t = t1(
            typeof hl?.text == "string" ? hl.text : typeof hl?.title == "string" ? hl.title : void 0,
            "Automated Note"
          ), nt = typeof hl?.tags == "string" ? Ks(hl.tags) : Array.isArray(hl?.tags) ? hl.tags.filter((D) => typeof D == "string").map((D) => D.trim().toLowerCase()).filter(Boolean).slice(0, 5) : [], E = {
            id: String(Date.now()),
            text: $t,
            tags: nt,
            pinned: !1,
            archived: !1,
            updatedAt: Date.now()
          };
          return t((D) => [E, ...D]), Ft.publish(Xl, "note-added", { note: E }), { ok: !0, result: { noteId: E.id } };
        }
        if (L === "note.pin-latest") {
          const $t = u.current;
          if ($t.length === 0)
            return {
              ok: !1,
              code: "COMMAND_TARGET_NOT_FOUND",
              reason: "No notes available to pin"
            };
          let nt = $t[0];
          for (const D of $t)
            D.updatedAt > nt.updatedAt && (nt = D);
          const E = {
            ...nt,
            pinned: !0,
            updatedAt: Date.now()
          };
          return t(
            (D) => D.map(
              (R) => R.id === E.id ? E : R
            )
          ), Ft.publish(Xl, "note-updated", {
            note: E
          }), { ok: !0, result: { noteId: E.id } };
        }
        return {
          ok: !1,
          code: "COMMAND_ACTION_NOT_SUPPORTED",
          reason: `notes does not support ${L}`
        };
      }
    );
    return () => {
      b(), _();
    };
  }, []), Sl.useEffect(() => {
    u.current = l, Sn.setState(Xl, l);
  }, [l]), Sl.useEffect(() => {
    wh(Xl, { showArchived: z });
  }, [z]);
  const d = Sl.useMemo(() => l.filter((b) => z ? !0 : !b.archived).filter(
    (b) => r ? b.text.toLowerCase().includes(r.toLowerCase()) : !0
  ).filter(
    (b) => h === "all" ? !0 : b.tags.includes(h)
  ).sort(
    (b, _) => Number(_.pinned) - Number(b.pinned) || _.updatedAt - b.updatedAt
  ), [h, l, r, z]), s = Sl.useMemo(() => {
    const b = /* @__PURE__ */ new Set();
    for (const _ of l)
      for (const q of _.tags)
        b.add(q);
    return ["all", ...Array.from(b.values()).sort()];
  }, [l]), y = () => {
    const b = a.trim();
    if (!b) return;
    const _ = {
      id: String(Date.now()),
      text: b,
      tags: Ks(n),
      pinned: !1,
      archived: !1,
      updatedAt: Date.now()
    };
    t((q) => [_, ...q]), e(""), f(""), Ft.publish(Xl, "note-added", { note: _ });
  }, g = (b) => {
    t((_) => _.filter((q) => q.id !== b));
  }, T = (b) => {
    t(
      (_) => _.map((q) => {
        if (q.id !== b) return q;
        const L = { ...q, pinned: !q.pinned, updatedAt: Date.now() };
        return Ft.publish(Xl, "note-updated", { note: L }), L;
      })
    );
  }, U = (b) => {
    t(
      (_) => _.map((q) => {
        if (q.id !== b) return q;
        const L = {
          ...q,
          archived: !q.archived,
          updatedAt: Date.now()
        };
        return Ft.publish(
          Xl,
          L.archived ? "note-archived" : "note-updated",
          L.archived ? { id: b } : { note: L }
        ), L;
      })
    );
  }, A = (b) => {
    i(b.id), m(b.text);
  }, M = (b) => {
    const _ = o.trim();
    _ && (t(
      (q) => q.map((L) => {
        if (L.id !== b) return L;
        const hl = { ...L, text: _, updatedAt: Date.now() };
        return Ft.publish(Xl, "note-updated", { note: hl }), hl;
      })
    ), i(null), m(""));
  };
  return /* @__PURE__ */ w.jsxs(
    "div",
    {
      style: {
        fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 10
      },
      children: [
        /* @__PURE__ */ w.jsxs("div", { className: "note-input-row", children: [
          /* @__PURE__ */ w.jsx(
            "input",
            {
              className: "note-input",
              value: a,
              onChange: (b) => e(b.target.value),
              onKeyDown: (b) => {
                b.key === "Enter" && y();
              },
              placeholder: "Write a note"
            }
          ),
          /* @__PURE__ */ w.jsx("button", { className: "note-btn", onClick: y, children: "Add" })
        ] }),
        /* @__PURE__ */ w.jsx(
          "input",
          {
            className: "note-input",
            placeholder: "Tags (comma separated)",
            value: n,
            onChange: (b) => f(b.target.value)
          }
        ),
        /* @__PURE__ */ w.jsxs("div", { className: "note-toolbar", children: [
          /* @__PURE__ */ w.jsx(
            "input",
            {
              className: "note-input",
              placeholder: "Search notes",
              value: r,
              onChange: (b) => v(b.target.value)
            }
          ),
          /* @__PURE__ */ w.jsx(
            "select",
            {
              className: "note-input",
              value: h,
              onChange: (b) => O(b.target.value),
              children: s.map((b) => /* @__PURE__ */ w.jsx("option", { value: b, children: b === "all" ? "All tags" : `#${b}` }, b))
            }
          ),
          /* @__PURE__ */ w.jsxs("label", { className: "archive-toggle", children: [
            /* @__PURE__ */ w.jsx(
              "input",
              {
                type: "checkbox",
                checked: z,
                onChange: (b) => B(b.target.checked)
              }
            ),
            "Show archived"
          ] })
        ] }),
        /* @__PURE__ */ w.jsx("ul", { className: "note-list", children: d.map((b) => /* @__PURE__ */ w.jsxs(
          "li",
          {
            className: `note-item ${b.archived ? "archived" : ""}`,
            children: [
              /* @__PURE__ */ w.jsxs("div", { className: "note-main", children: [
                c === b.id ? /* @__PURE__ */ w.jsx(
                  "input",
                  {
                    className: "note-input",
                    value: o,
                    onChange: (_) => m(_.target.value)
                  }
                ) : /* @__PURE__ */ w.jsx("span", { style: { whiteSpace: "pre-wrap" }, children: b.text }),
                /* @__PURE__ */ w.jsx("div", { className: "note-tags", children: b.tags.map((_) => /* @__PURE__ */ w.jsxs("span", { className: "note-tag", children: [
                  "#",
                  _
                ] }, `${b.id}:${_}`)) })
              ] }),
              /* @__PURE__ */ w.jsxs("div", { className: "note-actions", children: [
                c === b.id ? /* @__PURE__ */ w.jsx("button", { className: "btn-ghost", onClick: () => M(b.id), children: "Save" }) : /* @__PURE__ */ w.jsx("button", { className: "btn-ghost", onClick: () => A(b), children: "Edit" }),
                /* @__PURE__ */ w.jsx(
                  "button",
                  {
                    className: "btn-ghost",
                    onClick: () => T(b.id),
                    children: b.pinned ? "Unpin" : "Pin"
                  }
                ),
                /* @__PURE__ */ w.jsx(
                  "button",
                  {
                    className: "btn-ghost",
                    onClick: () => U(b.id),
                    children: b.archived ? "Unarchive" : "Archive"
                  }
                ),
                /* @__PURE__ */ w.jsx("button", { className: "btn-ghost", onClick: () => g(b.id), children: "Delete" })
              ] })
            ]
          },
          b.id
        )) })
      ]
    }
  );
}
class a1 extends HTMLElement {
  #l = null;
  connectedCallback() {
    try {
      const t = this.shadowRoot ?? this.attachShadow({ mode: "open" });
      let u = t.querySelector(
        '[data-widget-root="notes"]'
      );
      if (!u) {
        const a = document.createElement("style");
        a.textContent = `:host{display:block;height:100%}
          .note-surface{
            background: linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%);
            border-radius:16px;
            padding:20px;
            height:100%;
            box-sizing:border-box;
            display:flex;
            flex-direction:column;
            border:1px solid rgba(245, 158, 11, 0.2);
          }
          .note-input-row,.note-toolbar{
            display:flex;
            gap:10px;
            margin-bottom:8px;
          }
          .note-input{
            flex:1;
            min-width:0;
            padding:9px 10px;
            border:1px solid rgba(245, 158, 11, 0.25);
            border-radius:10px;
            background:rgba(255,255,255,0.95);
            font-size:0.85rem;
          }
          .note-btn{
            border:1px solid rgba(245, 158, 11, 0.2);
            border-radius:10px;
            padding:9px 14px;
            background:#d97706;
            color:#fff;
            cursor:pointer;
          }
          .archive-toggle{
            display:flex;
            align-items:center;
            gap:6px;
            font-size:0.75rem;
            color:#92400e;
            white-space:nowrap;
          }
          .note-list{
            list-style:none;
            margin:0;
            padding:0;
            display:grid;
            gap:8px;
            overflow:auto;
            min-height:0;
            flex:1;
          }
          .note-item{
            background:rgba(255,255,255,0.85);
            border:1px solid rgba(245, 158, 11, 0.2);
            border-radius:10px;
            padding:10px;
            display:flex;
            justify-content:space-between;
            gap:10px;
          }
          .note-item.archived{
            opacity:0.7;
          }
          .note-main{
            min-width:0;
            display:flex;
            flex-direction:column;
            gap:6px;
          }
          .note-tags{
            display:flex;
            flex-wrap:wrap;
            gap:6px;
          }
          .note-tag{
            background:rgba(245, 158, 11, 0.15);
            border:1px solid rgba(245, 158, 11, 0.2);
            border-radius:999px;
            padding:1px 7px;
            font-size:0.7rem;
            color:#92400e;
          }
          .note-actions{
            display:flex;
            flex-direction:column;
            gap:4px;
            align-items:flex-end;
          }
          .btn-ghost{
            background:transparent;
            border:1px solid rgba(245,158,11,0.3);
            color:#92400e;
            border-radius:8px;
            padding:5px 8px;
            font-size:0.72rem;
            cursor:pointer;
          }`, t.appendChild(a);
        const e = document.createElement("div");
        e.className = "note-surface", e.style.height = "100%", u = document.createElement("div"), u.dataset.widgetRoot = "notes", u.style.height = "100%", e.appendChild(u), t.appendChild(e);
      }
      this.#l = Ch.createRoot(u), this.#l.render(/* @__PURE__ */ w.jsx(u1, {})), queueMicrotask(() => Ph(this));
    } catch (t) {
      l1(this, t instanceof Error ? t.message : "mount-error");
    }
  }
  disconnectedCallback() {
    try {
      this.#l?.unmount(), this.#l = null;
    } catch {
    }
  }
}
customElements.get("mb-notes") || customElements.define("mb-notes", a1);
