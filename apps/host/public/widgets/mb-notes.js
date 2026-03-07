var Ls = { exports: {} }, Sn = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var J0 = Symbol.for("react.transitional.element"), w0 = Symbol.for("react.fragment");
function Js(l, t, a) {
  var u = null;
  if (a !== void 0 && (u = "" + a), t.key !== void 0 && (u = "" + t.key), "key" in t) {
    a = {};
    for (var e in t)
      e !== "key" && (a[e] = t[e]);
  } else a = t;
  return t = a.ref, {
    $$typeof: J0,
    type: l,
    key: u,
    ref: t !== void 0 ? t : null,
    props: a
  };
}
Sn.Fragment = w0;
Sn.jsx = Js;
Sn.jsxs = Js;
Ls.exports = Sn;
var X = Ls.exports, ws = { exports: {} }, R = {}, jn = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Sc = Symbol.for("react.transitional.element"), $0 = Symbol.for("react.portal"), W0 = Symbol.for("react.fragment"), k0 = Symbol.for("react.strict_mode"), F0 = Symbol.for("react.profiler"), I0 = Symbol.for("react.consumer"), P0 = Symbol.for("react.context"), lr = Symbol.for("react.forward_ref"), tr = Symbol.for("react.suspense"), ar = Symbol.for("react.memo"), $s = Symbol.for("react.lazy"), Si = Symbol.iterator;
function ur(l) {
  return l === null || typeof l != "object" ? null : (l = Si && l[Si] || l["@@iterator"], typeof l == "function" ? l : null);
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
function lu(l, t, a) {
  this.props = l, this.context = t, this.refs = Fs, this.updater = a || Ws;
}
lu.prototype.isReactComponent = {};
lu.prototype.setState = function(l, t) {
  if (typeof l != "object" && typeof l != "function" && l != null)
    throw Error(
      "takes an object of state variables to update or a function which returns an object of state variables."
    );
  this.updater.enqueueSetState(this, l, t, "setState");
};
lu.prototype.forceUpdate = function(l) {
  this.updater.enqueueForceUpdate(this, l, "forceUpdate");
};
function Is() {
}
Is.prototype = lu.prototype;
function Ec(l, t, a) {
  this.props = l, this.context = t, this.refs = Fs, this.updater = a || Ws;
}
var Tc = Ec.prototype = new Is();
Tc.constructor = Ec;
ks(Tc, lu.prototype);
Tc.isPureReactComponent = !0;
var Ei = Array.isArray, k = { H: null, A: null, T: null, S: null, V: null }, Ps = Object.prototype.hasOwnProperty;
function Ac(l, t, a, u, e, n) {
  return a = n.ref, {
    $$typeof: Sc,
    type: l,
    key: t,
    ref: a !== void 0 ? a : null,
    props: n
  };
}
function er(l, t) {
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
  return typeof l == "object" && l !== null && l.$$typeof === Sc;
}
function nr(l) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + l.replace(/[=:]/g, function(a) {
    return t[a];
  });
}
var Ti = /\/+/g;
function Qn(l, t) {
  return typeof l == "object" && l !== null && l.key != null ? nr("" + l.key) : t.toString(36);
}
function Ai() {
}
function fr(l) {
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
function ba(l, t, a, u, e) {
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
          case Sc:
          case $0:
            f = !0;
            break;
          case $s:
            return f = l._init, ba(
              f(l._payload),
              t,
              a,
              u,
              e
            );
        }
    }
  if (f)
    return e = e(l), f = u === "" ? "." + Qn(l, 0) : u, Ei(e) ? (a = "", f != null && (a = f.replace(Ti, "$&/") + "/"), ba(e, t, a, "", function(o) {
      return o;
    })) : e != null && (zc(e) && (e = er(
      e,
      a + (e.key == null || l && l.key === e.key ? "" : ("" + e.key).replace(
        Ti,
        "$&/"
      ) + "/") + f
    )), t.push(e)), 1;
  f = 0;
  var c = u === "" ? "." : u + ":";
  if (Ei(l))
    for (var i = 0; i < l.length; i++)
      u = l[i], n = c + Qn(u, i), f += ba(
        u,
        t,
        a,
        n,
        e
      );
  else if (i = ur(l), typeof i == "function")
    for (l = i.call(l), i = 0; !(u = l.next()).done; )
      u = u.value, n = c + Qn(u, i++), f += ba(
        u,
        t,
        a,
        n,
        e
      );
  else if (n === "object") {
    if (typeof l.then == "function")
      return ba(
        fr(l),
        t,
        a,
        u,
        e
      );
    throw t = String(l), Error(
      "Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(l).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead."
    );
  }
  return f;
}
function ve(l, t, a) {
  if (l == null) return l;
  var u = [], e = 0;
  return ba(l, u, "", "", function(n) {
    return t.call(a, n, e++);
  }), u;
}
function cr(l) {
  if (l._status === -1) {
    var t = l._result;
    t = t(), t.then(
      function(a) {
        (l._status === 0 || l._status === -1) && (l._status = 1, l._result = a);
      },
      function(a) {
        (l._status === 0 || l._status === -1) && (l._status = 2, l._result = a);
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
  } else if (typeof jn == "object" && typeof jn.emit == "function") {
    jn.emit("uncaughtException", l);
    return;
  }
  console.error(l);
};
function ir() {
}
R.Children = {
  map: ve,
  forEach: function(l, t, a) {
    ve(
      l,
      function() {
        t.apply(this, arguments);
      },
      a
    );
  },
  count: function(l) {
    var t = 0;
    return ve(l, function() {
      t++;
    }), t;
  },
  toArray: function(l) {
    return ve(l, function(t) {
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
R.Component = lu;
R.Fragment = W0;
R.Profiler = F0;
R.PureComponent = Ec;
R.StrictMode = k0;
R.Suspense = tr;
R.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = k;
R.__COMPILER_RUNTIME = {
  __proto__: null,
  c: function(l) {
    return k.H.useMemoCache(l);
  }
};
R.cache = function(l) {
  return function() {
    return l.apply(null, arguments);
  };
};
R.cloneElement = function(l, t, a) {
  if (l == null)
    throw Error(
      "The argument must be a React element, but you passed " + l + "."
    );
  var u = ks({}, l.props), e = l.key, n = void 0;
  if (t != null)
    for (f in t.ref !== void 0 && (n = void 0), t.key !== void 0 && (e = "" + t.key), t)
      !Ps.call(t, f) || f === "key" || f === "__self" || f === "__source" || f === "ref" && t.ref === void 0 || (u[f] = t[f]);
  var f = arguments.length - 2;
  if (f === 1) u.children = a;
  else if (1 < f) {
    for (var c = Array(f), i = 0; i < f; i++)
      c[i] = arguments[i + 2];
    u.children = c;
  }
  return Ac(l.type, e, void 0, void 0, n, u);
};
R.createContext = function(l) {
  return l = {
    $$typeof: P0,
    _currentValue: l,
    _currentValue2: l,
    _threadCount: 0,
    Provider: null,
    Consumer: null
  }, l.Provider = l, l.Consumer = {
    $$typeof: I0,
    _context: l
  }, l;
};
R.createElement = function(l, t, a) {
  var u, e = {}, n = null;
  if (t != null)
    for (u in t.key !== void 0 && (n = "" + t.key), t)
      Ps.call(t, u) && u !== "key" && u !== "__self" && u !== "__source" && (e[u] = t[u]);
  var f = arguments.length - 2;
  if (f === 1) e.children = a;
  else if (1 < f) {
    for (var c = Array(f), i = 0; i < f; i++)
      c[i] = arguments[i + 2];
    e.children = c;
  }
  if (l && l.defaultProps)
    for (u in f = l.defaultProps, f)
      e[u] === void 0 && (e[u] = f[u]);
  return Ac(l, n, void 0, void 0, null, e);
};
R.createRef = function() {
  return { current: null };
};
R.forwardRef = function(l) {
  return { $$typeof: lr, render: l };
};
R.isValidElement = zc;
R.lazy = function(l) {
  return {
    $$typeof: $s,
    _payload: { _status: -1, _result: l },
    _init: cr
  };
};
R.memo = function(l, t) {
  return {
    $$typeof: ar,
    type: l,
    compare: t === void 0 ? null : t
  };
};
R.startTransition = function(l) {
  var t = k.T, a = {};
  k.T = a;
  try {
    var u = l(), e = k.S;
    e !== null && e(a, u), typeof u == "object" && u !== null && typeof u.then == "function" && u.then(ir, zi);
  } catch (n) {
    zi(n);
  } finally {
    k.T = t;
  }
};
R.unstable_useCacheRefresh = function() {
  return k.H.useCacheRefresh();
};
R.use = function(l) {
  return k.H.use(l);
};
R.useActionState = function(l, t, a) {
  return k.H.useActionState(l, t, a);
};
R.useCallback = function(l, t) {
  return k.H.useCallback(l, t);
};
R.useContext = function(l) {
  return k.H.useContext(l);
};
R.useDebugValue = function() {
};
R.useDeferredValue = function(l, t) {
  return k.H.useDeferredValue(l, t);
};
R.useEffect = function(l, t, a) {
  var u = k.H;
  if (typeof a == "function")
    throw Error(
      "useEffect CRUD overload is not enabled in this build of React."
    );
  return u.useEffect(l, t);
};
R.useId = function() {
  return k.H.useId();
};
R.useImperativeHandle = function(l, t, a) {
  return k.H.useImperativeHandle(l, t, a);
};
R.useInsertionEffect = function(l, t) {
  return k.H.useInsertionEffect(l, t);
};
R.useLayoutEffect = function(l, t) {
  return k.H.useLayoutEffect(l, t);
};
R.useMemo = function(l, t) {
  return k.H.useMemo(l, t);
};
R.useOptimistic = function(l, t) {
  return k.H.useOptimistic(l, t);
};
R.useReducer = function(l, t, a) {
  return k.H.useReducer(l, t, a);
};
R.useRef = function(l) {
  return k.H.useRef(l);
};
R.useState = function(l) {
  return k.H.useState(l);
};
R.useSyncExternalStore = function(l, t, a) {
  return k.H.useSyncExternalStore(
    l,
    t,
    a
  );
};
R.useTransition = function() {
  return k.H.useTransition();
};
R.version = "19.1.1";
ws.exports = R;
var bl = ws.exports, ld = { exports: {} }, En = {}, td = { exports: {} }, ad = {};
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
  function t(E, M) {
    var N = E.length;
    E.push(M);
    l: for (; 0 < N; ) {
      var tl = N - 1 >>> 1, sl = E[tl];
      if (0 < e(sl, M))
        E[tl] = M, E[N] = sl, N = tl;
      else break l;
    }
  }
  function a(E) {
    return E.length === 0 ? null : E[0];
  }
  function u(E) {
    if (E.length === 0) return null;
    var M = E[0], N = E.pop();
    if (N !== M) {
      E[0] = N;
      l: for (var tl = 0, sl = E.length, de = sl >>> 1; tl < de; ) {
        var oe = 2 * (tl + 1) - 1, Xn = E[oe], Wt = oe + 1, re = E[Wt];
        if (0 > e(Xn, N))
          Wt < sl && 0 > e(re, Xn) ? (E[tl] = re, E[Wt] = N, tl = Wt) : (E[tl] = Xn, E[oe] = N, tl = oe);
        else if (Wt < sl && 0 > e(re, N))
          E[tl] = re, E[Wt] = N, tl = Wt;
        else break l;
      }
    }
    return M;
  }
  function e(E, M) {
    var N = E.sortIndex - M.sortIndex;
    return N !== 0 ? N : E.id - M.id;
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
  var i = [], o = [], m = 1, y = null, r = 3, h = !1, _ = !1, p = !1, q = !1, d = typeof setTimeout == "function" ? setTimeout : null, s = typeof clearTimeout == "function" ? clearTimeout : null, v = typeof setImmediate < "u" ? setImmediate : null;
  function g(E) {
    for (var M = a(o); M !== null; ) {
      if (M.callback === null) u(o);
      else if (M.startTime <= E)
        u(o), M.sortIndex = M.expirationTime, t(i, M);
      else break;
      M = a(o);
    }
  }
  function T(E) {
    if (p = !1, g(E), !_)
      if (a(i) !== null)
        _ = !0, U || (U = !0, J());
      else {
        var M = a(o);
        M !== null && nt(T, M.startTime - E);
      }
  }
  var U = !1, A = -1, O = 5, S = -1;
  function z() {
    return q ? !0 : !(l.unstable_now() - S < O);
  }
  function H() {
    if (q = !1, U) {
      var E = l.unstable_now();
      S = E;
      var M = !0;
      try {
        l: {
          _ = !1, p && (p = !1, s(A), A = -1), h = !0;
          var N = r;
          try {
            t: {
              for (g(E), y = a(i); y !== null && !(y.expirationTime > E && z()); ) {
                var tl = y.callback;
                if (typeof tl == "function") {
                  y.callback = null, r = y.priorityLevel;
                  var sl = tl(
                    y.expirationTime <= E
                  );
                  if (E = l.unstable_now(), typeof sl == "function") {
                    y.callback = sl, g(E), M = !0;
                    break t;
                  }
                  y === a(i) && u(i), g(E);
                } else u(i);
                y = a(i);
              }
              if (y !== null) M = !0;
              else {
                var de = a(o);
                de !== null && nt(
                  T,
                  de.startTime - E
                ), M = !1;
              }
            }
            break l;
          } finally {
            y = null, r = N, h = !1;
          }
          M = void 0;
        }
      } finally {
        M ? J() : U = !1;
      }
    }
  }
  var J;
  if (typeof v == "function")
    J = function() {
      v(H);
    };
  else if (typeof MessageChannel < "u") {
    var hl = new MessageChannel(), $t = hl.port2;
    hl.port1.onmessage = H, J = function() {
      $t.postMessage(null);
    };
  } else
    J = function() {
      d(H, 0);
    };
  function nt(E, M) {
    A = d(function() {
      E(l.unstable_now());
    }, M);
  }
  l.unstable_IdlePriority = 5, l.unstable_ImmediatePriority = 1, l.unstable_LowPriority = 4, l.unstable_NormalPriority = 3, l.unstable_Profiling = null, l.unstable_UserBlockingPriority = 2, l.unstable_cancelCallback = function(E) {
    E.callback = null;
  }, l.unstable_forceFrameRate = function(E) {
    0 > E || 125 < E ? console.error(
      "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
    ) : O = 0 < E ? Math.floor(1e3 / E) : 5;
  }, l.unstable_getCurrentPriorityLevel = function() {
    return r;
  }, l.unstable_next = function(E) {
    switch (r) {
      case 1:
      case 2:
      case 3:
        var M = 3;
        break;
      default:
        M = r;
    }
    var N = r;
    r = M;
    try {
      return E();
    } finally {
      r = N;
    }
  }, l.unstable_requestPaint = function() {
    q = !0;
  }, l.unstable_runWithPriority = function(E, M) {
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
    var N = r;
    r = E;
    try {
      return M();
    } finally {
      r = N;
    }
  }, l.unstable_scheduleCallback = function(E, M, N) {
    var tl = l.unstable_now();
    switch (typeof N == "object" && N !== null ? (N = N.delay, N = typeof N == "number" && 0 < N ? tl + N : tl) : N = tl, E) {
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
    return sl = N + sl, E = {
      id: m++,
      callback: M,
      priorityLevel: E,
      startTime: N,
      expirationTime: sl,
      sortIndex: -1
    }, N > tl ? (E.sortIndex = N, t(o, E), a(i) === null && E === a(o) && (p ? (s(A), A = -1) : p = !0, nt(T, N - tl))) : (E.sortIndex = sl, t(i, E), _ || h || (_ = !0, U || (U = !0, J()))), E;
  }, l.unstable_shouldYield = z, l.unstable_wrapCallback = function(E) {
    var M = r;
    return function() {
      var N = r;
      r = M;
      try {
        return E.apply(this, arguments);
      } finally {
        r = N;
      }
    };
  };
})(ad);
td.exports = ad;
var sr = td.exports, ud = { exports: {} }, zl = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var dr = bl;
function ed(l) {
  var t = "https://react.dev/errors/" + l;
  if (1 < arguments.length) {
    t += "?args[]=" + encodeURIComponent(arguments[1]);
    for (var a = 2; a < arguments.length; a++)
      t += "&args[]=" + encodeURIComponent(arguments[a]);
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
}, or = Symbol.for("react.portal");
function rr(l, t, a) {
  var u = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: or,
    key: u == null ? null : "" + u,
    children: l,
    containerInfo: t,
    implementation: a
  };
}
var Su = dr.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
function Tn(l, t) {
  if (l === "font") return "";
  if (typeof t == "string")
    return t === "use-credentials" ? t : "";
}
zl.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Al;
zl.createPortal = function(l, t) {
  var a = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11)
    throw Error(ed(299));
  return rr(l, t, null, a);
};
zl.flushSync = function(l) {
  var t = Su.T, a = Al.p;
  try {
    if (Su.T = null, Al.p = 2, l) return l();
  } finally {
    Su.T = t, Al.p = a, Al.d.f();
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
    var a = t.as, u = Tn(a, t.crossOrigin), e = typeof t.integrity == "string" ? t.integrity : void 0, n = typeof t.fetchPriority == "string" ? t.fetchPriority : void 0;
    a === "style" ? Al.d.S(
      l,
      typeof t.precedence == "string" ? t.precedence : void 0,
      {
        crossOrigin: u,
        integrity: e,
        fetchPriority: n
      }
    ) : a === "script" && Al.d.X(l, {
      crossOrigin: u,
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
        var a = Tn(
          t.as,
          t.crossOrigin
        );
        Al.d.M(l, {
          crossOrigin: a,
          integrity: typeof t.integrity == "string" ? t.integrity : void 0,
          nonce: typeof t.nonce == "string" ? t.nonce : void 0
        });
      }
    } else t == null && Al.d.M(l);
};
zl.preload = function(l, t) {
  if (typeof l == "string" && typeof t == "object" && t !== null && typeof t.as == "string") {
    var a = t.as, u = Tn(a, t.crossOrigin);
    Al.d.L(l, a, {
      crossOrigin: u,
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
      var a = Tn(t.as, t.crossOrigin);
      Al.d.m(l, {
        as: typeof t.as == "string" && t.as !== "script" ? t.as : void 0,
        crossOrigin: a,
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
zl.useFormState = function(l, t, a) {
  return Su.H.useFormState(l, t, a);
};
zl.useFormStatus = function() {
  return Su.H.useHostTransitionStatus();
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
nd(), ud.exports = zl;
var vr = ud.exports, Cn = {};
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var il = sr, fd = bl, hr = vr;
function b(l) {
  var t = "https://react.dev/errors/" + l;
  if (1 < arguments.length) {
    t += "?args[]=" + encodeURIComponent(arguments[1]);
    for (var a = 2; a < arguments.length; a++)
      t += "&args[]=" + encodeURIComponent(arguments[a]);
  }
  return "Minified React error #" + l + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
function cd(l) {
  return !(!l || l.nodeType !== 1 && l.nodeType !== 9 && l.nodeType !== 11);
}
function $u(l) {
  var t = l, a = l;
  if (l.alternate) for (; t.return; ) t = t.return;
  else {
    l = t;
    do
      t = l, t.flags & 4098 && (a = t.return), l = t.return;
    while (l);
  }
  return t.tag === 3 ? a : null;
}
function id(l) {
  if (l.tag === 13) {
    var t = l.memoizedState;
    if (t === null && (l = l.alternate, l !== null && (t = l.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function pi(l) {
  if ($u(l) !== l)
    throw Error(b(188));
}
function yr(l) {
  var t = l.alternate;
  if (!t) {
    if (t = $u(l), t === null) throw Error(b(188));
    return t !== l ? null : l;
  }
  for (var a = l, u = t; ; ) {
    var e = a.return;
    if (e === null) break;
    var n = e.alternate;
    if (n === null) {
      if (u = e.return, u !== null) {
        a = u;
        continue;
      }
      break;
    }
    if (e.child === n.child) {
      for (n = e.child; n; ) {
        if (n === a) return pi(e), l;
        if (n === u) return pi(e), t;
        n = n.sibling;
      }
      throw Error(b(188));
    }
    if (a.return !== u.return) a = e, u = n;
    else {
      for (var f = !1, c = e.child; c; ) {
        if (c === a) {
          f = !0, a = e, u = n;
          break;
        }
        if (c === u) {
          f = !0, u = e, a = n;
          break;
        }
        c = c.sibling;
      }
      if (!f) {
        for (c = n.child; c; ) {
          if (c === a) {
            f = !0, a = n, u = e;
            break;
          }
          if (c === u) {
            f = !0, u = n, a = e;
            break;
          }
          c = c.sibling;
        }
        if (!f) throw Error(b(189));
      }
    }
    if (a.alternate !== u) throw Error(b(190));
  }
  if (a.tag !== 3) throw Error(b(188));
  return a.stateNode.current === a ? l : t;
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
var $ = Object.assign, mr = Symbol.for("react.element"), he = Symbol.for("react.transitional.element"), yu = Symbol.for("react.portal"), Aa = Symbol.for("react.fragment"), dd = Symbol.for("react.strict_mode"), zf = Symbol.for("react.profiler"), gr = Symbol.for("react.provider"), od = Symbol.for("react.consumer"), dt = Symbol.for("react.context"), pc = Symbol.for("react.forward_ref"), pf = Symbol.for("react.suspense"), _f = Symbol.for("react.suspense_list"), _c = Symbol.for("react.memo"), _t = Symbol.for("react.lazy"), Of = Symbol.for("react.activity"), br = Symbol.for("react.memo_cache_sentinel"), _i = Symbol.iterator;
function cu(l) {
  return l === null || typeof l != "object" ? null : (l = _i && l[_i] || l["@@iterator"], typeof l == "function" ? l : null);
}
var Sr = Symbol.for("react.client.reference");
function Mf(l) {
  if (l == null) return null;
  if (typeof l == "function")
    return l.$$typeof === Sr ? null : l.displayName || l.name || null;
  if (typeof l == "string") return l;
  switch (l) {
    case Aa:
      return "Fragment";
    case zf:
      return "Profiler";
    case dd:
      return "StrictMode";
    case pf:
      return "Suspense";
    case _f:
      return "SuspenseList";
    case Of:
      return "Activity";
  }
  if (typeof l == "object")
    switch (l.$$typeof) {
      case yu:
        return "Portal";
      case dt:
        return (l.displayName || "Context") + ".Provider";
      case od:
        return (l._context.displayName || "Context") + ".Consumer";
      case pc:
        var t = l.render;
        return l = l.displayName, l || (l = t.displayName || t.name || "", l = l !== "" ? "ForwardRef(" + l + ")" : "ForwardRef"), l;
      case _c:
        return t = l.displayName || null, t !== null ? t : Mf(l.type) || "Memo";
      case _t:
        t = l._payload, l = l._init;
        try {
          return Mf(l(t));
        } catch {
        }
    }
  return null;
}
var mu = Array.isArray, D = fd.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Q = hr.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ta = {
  pending: !1,
  data: null,
  method: null,
  action: null
}, Df = [], za = -1;
function ut(l) {
  return { current: l };
}
function vl(l) {
  0 > za || (l.current = Df[za], Df[za] = null, za--);
}
function F(l, t) {
  za++, Df[za] = l.current, l.current = t;
}
var lt = ut(null), Yu = ut(null), Bt = ut(null), Ce = ut(null);
function Ze(l, t) {
  switch (F(Bt, t), F(Yu, l), F(lt, null), t.nodeType) {
    case 9:
    case 11:
      l = (l = t.documentElement) && (l = l.namespaceURI) ? Ns(l) : 0;
      break;
    default:
      if (l = t.tagName, t = t.namespaceURI)
        t = Ns(t), l = U0(t, l);
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
  vl(lt), F(lt, l);
}
function Za() {
  vl(lt), vl(Yu), vl(Bt);
}
function Uf(l) {
  l.memoizedState !== null && F(Ce, l);
  var t = lt.current, a = U0(t, l.type);
  t !== a && (F(Yu, l), F(lt, a));
}
function Ve(l) {
  Yu.current === l && (vl(lt), vl(Yu)), Ce.current === l && (vl(Ce), Ku._currentValue = ta);
}
var Nf = Object.prototype.hasOwnProperty, Oc = il.unstable_scheduleCallback, Zn = il.unstable_cancelCallback, Er = il.unstable_shouldYield, Tr = il.unstable_requestPaint, tt = il.unstable_now, Ar = il.unstable_getCurrentPriorityLevel, rd = il.unstable_ImmediatePriority, vd = il.unstable_UserBlockingPriority, Ke = il.unstable_NormalPriority, zr = il.unstable_LowPriority, hd = il.unstable_IdlePriority, pr = il.log, _r = il.unstable_setDisableYieldValue, Wu = null, Hl = null;
function Rt(l) {
  if (typeof pr == "function" && _r(l), Hl && typeof Hl.setStrictMode == "function")
    try {
      Hl.setStrictMode(Wu, l);
    } catch {
    }
}
var Yl = Math.clz32 ? Math.clz32 : Dr, Or = Math.log, Mr = Math.LN2;
function Dr(l) {
  return l >>>= 0, l === 0 ? 32 : 31 - (Or(l) / Mr | 0) | 0;
}
var ye = 256, me = 4194304;
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
function An(l, t, a) {
  var u = l.pendingLanes;
  if (u === 0) return 0;
  var e = 0, n = l.suspendedLanes, f = l.pingedLanes;
  l = l.warmLanes;
  var c = u & 134217727;
  return c !== 0 ? (u = c & ~n, u !== 0 ? e = It(u) : (f &= c, f !== 0 ? e = It(f) : a || (a = c & ~l, a !== 0 && (e = It(a))))) : (c = u & ~n, c !== 0 ? e = It(c) : f !== 0 ? e = It(f) : a || (a = u & ~l, a !== 0 && (e = It(a)))), e === 0 ? 0 : t !== 0 && t !== e && !(t & n) && (n = e & -e, a = t & -t, n >= a || n === 32 && (a & 4194048) !== 0) ? t : e;
}
function ku(l, t) {
  return (l.pendingLanes & ~(l.suspendedLanes & ~l.pingedLanes) & t) === 0;
}
function Ur(l, t) {
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
function yd() {
  var l = ye;
  return ye <<= 1, !(ye & 4194048) && (ye = 256), l;
}
function md() {
  var l = me;
  return me <<= 1, !(me & 62914560) && (me = 4194304), l;
}
function Vn(l) {
  for (var t = [], a = 0; 31 > a; a++) t.push(l);
  return t;
}
function Fu(l, t) {
  l.pendingLanes |= t, t !== 268435456 && (l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0);
}
function Nr(l, t, a, u, e, n) {
  var f = l.pendingLanes;
  l.pendingLanes = a, l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0, l.expiredLanes &= a, l.entangledLanes &= a, l.errorRecoveryDisabledLanes &= a, l.shellSuspendCounter = 0;
  var c = l.entanglements, i = l.expirationTimes, o = l.hiddenUpdates;
  for (a = f & ~a; 0 < a; ) {
    var m = 31 - Yl(a), y = 1 << m;
    c[m] = 0, i[m] = -1;
    var r = o[m];
    if (r !== null)
      for (o[m] = null, m = 0; m < r.length; m++) {
        var h = r[m];
        h !== null && (h.lane &= -536870913);
      }
    a &= ~y;
  }
  u !== 0 && gd(l, u, 0), n !== 0 && e === 0 && l.tag !== 0 && (l.suspendedLanes |= n & ~(f & ~t));
}
function gd(l, t, a) {
  l.pendingLanes |= t, l.suspendedLanes &= ~t;
  var u = 31 - Yl(t);
  l.entangledLanes |= t, l.entanglements[u] = l.entanglements[u] | 1073741824 | a & 4194090;
}
function bd(l, t) {
  var a = l.entangledLanes |= t;
  for (l = l.entanglements; a; ) {
    var u = 31 - Yl(a), e = 1 << u;
    e & t | l[u] & t && (l[u] |= t), a &= ~e;
  }
}
function Mc(l) {
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
function Dc(l) {
  return l &= -l, 2 < l ? 8 < l ? l & 134217727 ? 32 : 268435456 : 8 : 2;
}
function Sd() {
  var l = Q.p;
  return l !== 0 ? l : (l = window.event, l === void 0 ? 32 : j0(l.type));
}
function Rr(l, t) {
  var a = Q.p;
  try {
    return Q.p = l, t();
  } finally {
    Q.p = a;
  }
}
var Jt = Math.random().toString(36).slice(2), Sl = "__reactFiber$" + Jt, Ml = "__reactProps$" + Jt, tu = "__reactContainer$" + Jt, Rf = "__reactEvents$" + Jt, xr = "__reactListeners$" + Jt, Hr = "__reactHandles$" + Jt, Oi = "__reactResources$" + Jt, Iu = "__reactMarker$" + Jt;
function Uc(l) {
  delete l[Sl], delete l[Ml], delete l[Rf], delete l[xr], delete l[Hr];
}
function pa(l) {
  var t = l[Sl];
  if (t) return t;
  for (var a = l.parentNode; a; ) {
    if (t = a[tu] || a[Sl]) {
      if (a = t.alternate, t.child !== null || a !== null && a.child !== null)
        for (l = Hs(l); l !== null; ) {
          if (a = l[Sl]) return a;
          l = Hs(l);
        }
      return t;
    }
    l = a, a = l.parentNode;
  }
  return null;
}
function au(l) {
  if (l = l[Sl] || l[tu]) {
    var t = l.tag;
    if (t === 5 || t === 6 || t === 13 || t === 26 || t === 27 || t === 3)
      return l;
  }
  return null;
}
function gu(l) {
  var t = l.tag;
  if (t === 5 || t === 26 || t === 27 || t === 6) return l.stateNode;
  throw Error(b(33));
}
function Ya(l) {
  var t = l[Oi];
  return t || (t = l[Oi] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
}
function ol(l) {
  l[Iu] = !0;
}
var Ed = /* @__PURE__ */ new Set(), Td = {};
function ra(l, t) {
  Va(l, t), Va(l + "Capture", t);
}
function Va(l, t) {
  for (Td[l] = t, l = 0; l < t.length; l++)
    Ed.add(t[l]);
}
var Yr = RegExp(
  "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
), Mi = {}, Di = {};
function Br(l) {
  return Nf.call(Di, l) ? !0 : Nf.call(Mi, l) ? !1 : Yr.test(l) ? Di[l] = !0 : (Mi[l] = !0, !1);
}
function De(l, t, a) {
  if (Br(t))
    if (a === null) l.removeAttribute(t);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
          l.removeAttribute(t);
          return;
        case "boolean":
          var u = t.toLowerCase().slice(0, 5);
          if (u !== "data-" && u !== "aria-") {
            l.removeAttribute(t);
            return;
          }
      }
      l.setAttribute(t, "" + a);
    }
}
function ge(l, t, a) {
  if (a === null) l.removeAttribute(t);
  else {
    switch (typeof a) {
      case "undefined":
      case "function":
      case "symbol":
      case "boolean":
        l.removeAttribute(t);
        return;
    }
    l.setAttribute(t, "" + a);
  }
}
function ft(l, t, a, u) {
  if (u === null) l.removeAttribute(a);
  else {
    switch (typeof u) {
      case "undefined":
      case "function":
      case "symbol":
      case "boolean":
        l.removeAttribute(a);
        return;
    }
    l.setAttributeNS(t, a, "" + u);
  }
}
var Kn, Ui;
function Sa(l) {
  if (Kn === void 0)
    try {
      throw Error();
    } catch (a) {
      var t = a.stack.trim().match(/\n( *(at )?)/);
      Kn = t && t[1] || "", Ui = -1 < a.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < a.stack.indexOf("@") ? "@unknown:0:0" : "";
    }
  return `
` + Kn + l + Ui;
}
var Ln = !1;
function Jn(l, t) {
  if (!l || Ln) return "";
  Ln = !0;
  var a = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    var u = {
      DetermineComponentFrameRoot: function() {
        try {
          if (t) {
            var y = function() {
              throw Error();
            };
            if (Object.defineProperty(y.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(y, []);
              } catch (h) {
                var r = h;
              }
              Reflect.construct(l, [], y);
            } else {
              try {
                y.call();
              } catch (h) {
                r = h;
              }
              l.call(y.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (h) {
              r = h;
            }
            (y = l()) && typeof y.catch == "function" && y.catch(function() {
            });
          }
        } catch (h) {
          if (h && r && typeof h.stack == "string")
            return [h.stack, r.stack];
        }
        return [null, null];
      }
    };
    u.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
    var e = Object.getOwnPropertyDescriptor(
      u.DetermineComponentFrameRoot,
      "name"
    );
    e && e.configurable && Object.defineProperty(
      u.DetermineComponentFrameRoot,
      "name",
      { value: "DetermineComponentFrameRoot" }
    );
    var n = u.DetermineComponentFrameRoot(), f = n[0], c = n[1];
    if (f && c) {
      var i = f.split(`
`), o = c.split(`
`);
      for (e = u = 0; u < i.length && !i[u].includes("DetermineComponentFrameRoot"); )
        u++;
      for (; e < o.length && !o[e].includes(
        "DetermineComponentFrameRoot"
      ); )
        e++;
      if (u === i.length || e === o.length)
        for (u = i.length - 1, e = o.length - 1; 1 <= u && 0 <= e && i[u] !== o[e]; )
          e--;
      for (; 1 <= u && 0 <= e; u--, e--)
        if (i[u] !== o[e]) {
          if (u !== 1 || e !== 1)
            do
              if (u--, e--, 0 > e || i[u] !== o[e]) {
                var m = `
` + i[u].replace(" at new ", " at ");
                return l.displayName && m.includes("<anonymous>") && (m = m.replace("<anonymous>", l.displayName)), m;
              }
            while (1 <= u && 0 <= e);
          break;
        }
    }
  } finally {
    Ln = !1, Error.prepareStackTrace = a;
  }
  return (a = l ? l.displayName || l.name : "") ? Sa(a) : "";
}
function qr(l) {
  switch (l.tag) {
    case 26:
    case 27:
    case 5:
      return Sa(l.type);
    case 16:
      return Sa("Lazy");
    case 13:
      return Sa("Suspense");
    case 19:
      return Sa("SuspenseList");
    case 0:
    case 15:
      return Jn(l.type, !1);
    case 11:
      return Jn(l.type.render, !1);
    case 1:
      return Jn(l.type, !0);
    case 31:
      return Sa("Activity");
    default:
      return "";
  }
}
function Ni(l) {
  try {
    var t = "";
    do
      t += qr(l), l = l.return;
    while (l);
    return t;
  } catch (a) {
    return `
Error generating stack: ` + a.message + `
` + a.stack;
  }
}
function Ql(l) {
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
function Gr(l) {
  var t = Ad(l) ? "checked" : "value", a = Object.getOwnPropertyDescriptor(
    l.constructor.prototype,
    t
  ), u = "" + l[t];
  if (!l.hasOwnProperty(t) && typeof a < "u" && typeof a.get == "function" && typeof a.set == "function") {
    var e = a.get, n = a.set;
    return Object.defineProperty(l, t, {
      configurable: !0,
      get: function() {
        return e.call(this);
      },
      set: function(f) {
        u = "" + f, n.call(this, f);
      }
    }), Object.defineProperty(l, t, {
      enumerable: a.enumerable
    }), {
      getValue: function() {
        return u;
      },
      setValue: function(f) {
        u = "" + f;
      },
      stopTracking: function() {
        l._valueTracker = null, delete l[t];
      }
    };
  }
}
function Le(l) {
  l._valueTracker || (l._valueTracker = Gr(l));
}
function zd(l) {
  if (!l) return !1;
  var t = l._valueTracker;
  if (!t) return !0;
  var a = t.getValue(), u = "";
  return l && (u = Ad(l) ? l.checked ? "true" : "false" : l.value), l = u, l !== a ? (t.setValue(l), !0) : !1;
}
function Je(l) {
  if (l = l || (typeof document < "u" ? document : void 0), typeof l > "u") return null;
  try {
    return l.activeElement || l.body;
  } catch {
    return l.body;
  }
}
var Xr = /[\n"\\]/g;
function Vl(l) {
  return l.replace(
    Xr,
    function(t) {
      return "\\" + t.charCodeAt(0).toString(16) + " ";
    }
  );
}
function xf(l, t, a, u, e, n, f, c) {
  l.name = "", f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" ? l.type = f : l.removeAttribute("type"), t != null ? f === "number" ? (t === 0 && l.value === "" || l.value != t) && (l.value = "" + Ql(t)) : l.value !== "" + Ql(t) && (l.value = "" + Ql(t)) : f !== "submit" && f !== "reset" || l.removeAttribute("value"), t != null ? Hf(l, f, Ql(t)) : a != null ? Hf(l, f, Ql(a)) : u != null && l.removeAttribute("value"), e == null && n != null && (l.defaultChecked = !!n), e != null && (l.checked = e && typeof e != "function" && typeof e != "symbol"), c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? l.name = "" + Ql(c) : l.removeAttribute("name");
}
function pd(l, t, a, u, e, n, f, c) {
  if (n != null && typeof n != "function" && typeof n != "symbol" && typeof n != "boolean" && (l.type = n), t != null || a != null) {
    if (!(n !== "submit" && n !== "reset" || t != null))
      return;
    a = a != null ? "" + Ql(a) : "", t = t != null ? "" + Ql(t) : a, c || t === l.value || (l.value = t), l.defaultValue = t;
  }
  u = u ?? e, u = typeof u != "function" && typeof u != "symbol" && !!u, l.checked = c ? l.checked : !!u, l.defaultChecked = !!u, f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" && (l.name = f);
}
function Hf(l, t, a) {
  t === "number" && Je(l.ownerDocument) === l || l.defaultValue === "" + a || (l.defaultValue = "" + a);
}
function Ba(l, t, a, u) {
  if (l = l.options, t) {
    t = {};
    for (var e = 0; e < a.length; e++)
      t["$" + a[e]] = !0;
    for (a = 0; a < l.length; a++)
      e = t.hasOwnProperty("$" + l[a].value), l[a].selected !== e && (l[a].selected = e), e && u && (l[a].defaultSelected = !0);
  } else {
    for (a = "" + Ql(a), t = null, e = 0; e < l.length; e++) {
      if (l[e].value === a) {
        l[e].selected = !0, u && (l[e].defaultSelected = !0);
        return;
      }
      t !== null || l[e].disabled || (t = l[e]);
    }
    t !== null && (t.selected = !0);
  }
}
function _d(l, t, a) {
  if (t != null && (t = "" + Ql(t), t !== l.value && (l.value = t), a == null)) {
    l.defaultValue !== t && (l.defaultValue = t);
    return;
  }
  l.defaultValue = a != null ? "" + Ql(a) : "";
}
function Od(l, t, a, u) {
  if (t == null) {
    if (u != null) {
      if (a != null) throw Error(b(92));
      if (mu(u)) {
        if (1 < u.length) throw Error(b(93));
        u = u[0];
      }
      a = u;
    }
    a == null && (a = ""), t = a;
  }
  a = Ql(t), l.defaultValue = a, u = l.textContent, u === a && u !== "" && u !== null && (l.value = u);
}
function Ka(l, t) {
  if (t) {
    var a = l.firstChild;
    if (a && a === l.lastChild && a.nodeType === 3) {
      a.nodeValue = t;
      return;
    }
  }
  l.textContent = t;
}
var jr = new Set(
  "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
    " "
  )
);
function Ri(l, t, a) {
  var u = t.indexOf("--") === 0;
  a == null || typeof a == "boolean" || a === "" ? u ? l.setProperty(t, "") : t === "float" ? l.cssFloat = "" : l[t] = "" : u ? l.setProperty(t, a) : typeof a != "number" || a === 0 || jr.has(t) ? t === "float" ? l.cssFloat = a : l[t] = ("" + a).trim() : l[t] = a + "px";
}
function Md(l, t, a) {
  if (t != null && typeof t != "object")
    throw Error(b(62));
  if (l = l.style, a != null) {
    for (var u in a)
      !a.hasOwnProperty(u) || t != null && t.hasOwnProperty(u) || (u.indexOf("--") === 0 ? l.setProperty(u, "") : u === "float" ? l.cssFloat = "" : l[u] = "");
    for (var e in t)
      u = t[e], t.hasOwnProperty(e) && a[e] !== u && Ri(l, e, u);
  } else
    for (var n in t)
      t.hasOwnProperty(n) && Ri(l, n, t[n]);
}
function Nc(l) {
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
var Qr = /* @__PURE__ */ new Map([
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
]), Cr = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
function Ue(l) {
  return Cr.test("" + l) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : l;
}
var Yf = null;
function Rc(l) {
  return l = l.target || l.srcElement || window, l.correspondingUseElement && (l = l.correspondingUseElement), l.nodeType === 3 ? l.parentNode : l;
}
var _a = null, qa = null;
function xi(l) {
  var t = au(l);
  if (t && (l = t.stateNode)) {
    var a = l[Ml] || null;
    l: switch (l = t.stateNode, t.type) {
      case "input":
        if (xf(
          l,
          a.value,
          a.defaultValue,
          a.defaultValue,
          a.checked,
          a.defaultChecked,
          a.type,
          a.name
        ), t = a.name, a.type === "radio" && t != null) {
          for (a = l; a.parentNode; ) a = a.parentNode;
          for (a = a.querySelectorAll(
            'input[name="' + Vl(
              "" + t
            ) + '"][type="radio"]'
          ), t = 0; t < a.length; t++) {
            var u = a[t];
            if (u !== l && u.form === l.form) {
              var e = u[Ml] || null;
              if (!e) throw Error(b(90));
              xf(
                u,
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
          for (t = 0; t < a.length; t++)
            u = a[t], u.form === l.form && zd(u);
        }
        break l;
      case "textarea":
        _d(l, a.value, a.defaultValue);
        break l;
      case "select":
        t = a.value, t != null && Ba(l, !!a.multiple, t, !1);
    }
  }
}
var wn = !1;
function Dd(l, t, a) {
  if (wn) return l(t, a);
  wn = !0;
  try {
    var u = l(t);
    return u;
  } finally {
    if (wn = !1, (_a !== null || qa !== null) && (xn(), _a && (t = _a, l = qa, qa = _a = null, xi(t), l)))
      for (t = 0; t < l.length; t++) xi(l[t]);
  }
}
function Bu(l, t) {
  var a = l.stateNode;
  if (a === null) return null;
  var u = a[Ml] || null;
  if (u === null) return null;
  a = u[t];
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
      (u = !u.disabled) || (l = l.type, u = !(l === "button" || l === "input" || l === "select" || l === "textarea")), l = !u;
      break l;
    default:
      l = !1;
  }
  if (l) return null;
  if (a && typeof a != "function")
    throw Error(
      b(231, t, typeof a)
    );
  return a;
}
var gt = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Bf = !1;
if (gt)
  try {
    var iu = {};
    Object.defineProperty(iu, "passive", {
      get: function() {
        Bf = !0;
      }
    }), window.addEventListener("test", iu, iu), window.removeEventListener("test", iu, iu);
  } catch {
    Bf = !1;
  }
var xt = null, xc = null, Ne = null;
function Ud() {
  if (Ne) return Ne;
  var l, t = xc, a = t.length, u, e = "value" in xt ? xt.value : xt.textContent, n = e.length;
  for (l = 0; l < a && t[l] === e[l]; l++) ;
  var f = a - l;
  for (u = 1; u <= f && t[a - u] === e[n - u]; u++) ;
  return Ne = e.slice(l, 1 < u ? 1 - u : void 0);
}
function Re(l) {
  var t = l.keyCode;
  return "charCode" in l ? (l = l.charCode, l === 0 && t === 13 && (l = 13)) : l = t, l === 10 && (l = 13), 32 <= l || l === 13 ? l : 0;
}
function be() {
  return !0;
}
function Hi() {
  return !1;
}
function Dl(l) {
  function t(a, u, e, n, f) {
    this._reactName = a, this._targetInst = e, this.type = u, this.nativeEvent = n, this.target = f, this.currentTarget = null;
    for (var c in l)
      l.hasOwnProperty(c) && (a = l[c], this[c] = a ? a(n) : n[c]);
    return this.isDefaultPrevented = (n.defaultPrevented != null ? n.defaultPrevented : n.returnValue === !1) ? be : Hi, this.isPropagationStopped = Hi, this;
  }
  return $(t.prototype, {
    preventDefault: function() {
      this.defaultPrevented = !0;
      var a = this.nativeEvent;
      a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), this.isDefaultPrevented = be);
    },
    stopPropagation: function() {
      var a = this.nativeEvent;
      a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = be);
    },
    persist: function() {
    },
    isPersistent: be
  }), t;
}
var va = {
  eventPhase: 0,
  bubbles: 0,
  cancelable: 0,
  timeStamp: function(l) {
    return l.timeStamp || Date.now();
  },
  defaultPrevented: 0,
  isTrusted: 0
}, zn = Dl(va), Pu = $({}, va, { view: 0, detail: 0 }), Zr = Dl(Pu), $n, Wn, su, pn = $({}, Pu, {
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
  getModifierState: Hc,
  button: 0,
  buttons: 0,
  relatedTarget: function(l) {
    return l.relatedTarget === void 0 ? l.fromElement === l.srcElement ? l.toElement : l.fromElement : l.relatedTarget;
  },
  movementX: function(l) {
    return "movementX" in l ? l.movementX : (l !== su && (su && l.type === "mousemove" ? ($n = l.screenX - su.screenX, Wn = l.screenY - su.screenY) : Wn = $n = 0, su = l), $n);
  },
  movementY: function(l) {
    return "movementY" in l ? l.movementY : Wn;
  }
}), Yi = Dl(pn), Vr = $({}, pn, { dataTransfer: 0 }), Kr = Dl(Vr), Lr = $({}, Pu, { relatedTarget: 0 }), kn = Dl(Lr), Jr = $({}, va, {
  animationName: 0,
  elapsedTime: 0,
  pseudoElement: 0
}), wr = Dl(Jr), $r = $({}, va, {
  clipboardData: function(l) {
    return "clipboardData" in l ? l.clipboardData : window.clipboardData;
  }
}), Wr = Dl($r), kr = $({}, va, { data: 0 }), Bi = Dl(kr), Fr = {
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
}, Ir = {
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
}, Pr = {
  Alt: "altKey",
  Control: "ctrlKey",
  Meta: "metaKey",
  Shift: "shiftKey"
};
function lv(l) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(l) : (l = Pr[l]) ? !!t[l] : !1;
}
function Hc() {
  return lv;
}
var tv = $({}, Pu, {
  key: function(l) {
    if (l.key) {
      var t = Fr[l.key] || l.key;
      if (t !== "Unidentified") return t;
    }
    return l.type === "keypress" ? (l = Re(l), l === 13 ? "Enter" : String.fromCharCode(l)) : l.type === "keydown" || l.type === "keyup" ? Ir[l.keyCode] || "Unidentified" : "";
  },
  code: 0,
  location: 0,
  ctrlKey: 0,
  shiftKey: 0,
  altKey: 0,
  metaKey: 0,
  repeat: 0,
  locale: 0,
  getModifierState: Hc,
  charCode: function(l) {
    return l.type === "keypress" ? Re(l) : 0;
  },
  keyCode: function(l) {
    return l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
  },
  which: function(l) {
    return l.type === "keypress" ? Re(l) : l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
  }
}), av = Dl(tv), uv = $({}, pn, {
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
}), qi = Dl(uv), ev = $({}, Pu, {
  touches: 0,
  targetTouches: 0,
  changedTouches: 0,
  altKey: 0,
  metaKey: 0,
  ctrlKey: 0,
  shiftKey: 0,
  getModifierState: Hc
}), nv = Dl(ev), fv = $({}, va, {
  propertyName: 0,
  elapsedTime: 0,
  pseudoElement: 0
}), cv = Dl(fv), iv = $({}, pn, {
  deltaX: function(l) {
    return "deltaX" in l ? l.deltaX : "wheelDeltaX" in l ? -l.wheelDeltaX : 0;
  },
  deltaY: function(l) {
    return "deltaY" in l ? l.deltaY : "wheelDeltaY" in l ? -l.wheelDeltaY : "wheelDelta" in l ? -l.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), sv = Dl(iv), dv = $({}, va, {
  newState: 0,
  oldState: 0
}), ov = Dl(dv), rv = [9, 13, 27, 32], Yc = gt && "CompositionEvent" in window, Eu = null;
gt && "documentMode" in document && (Eu = document.documentMode);
var vv = gt && "TextEvent" in window && !Eu, Nd = gt && (!Yc || Eu && 8 < Eu && 11 >= Eu), Gi = " ", Xi = !1;
function Rd(l, t) {
  switch (l) {
    case "keyup":
      return rv.indexOf(t.keyCode) !== -1;
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
function xd(l) {
  return l = l.detail, typeof l == "object" && "data" in l ? l.data : null;
}
var Oa = !1;
function hv(l, t) {
  switch (l) {
    case "compositionend":
      return xd(t);
    case "keypress":
      return t.which !== 32 ? null : (Xi = !0, Gi);
    case "textInput":
      return l = t.data, l === Gi && Xi ? null : l;
    default:
      return null;
  }
}
function yv(l, t) {
  if (Oa)
    return l === "compositionend" || !Yc && Rd(l, t) ? (l = Ud(), Ne = xc = xt = null, Oa = !1, l) : null;
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
      return Nd && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var mv = {
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
function ji(l) {
  var t = l && l.nodeName && l.nodeName.toLowerCase();
  return t === "input" ? !!mv[l.type] : t === "textarea";
}
function Hd(l, t, a, u) {
  _a ? qa ? qa.push(u) : qa = [u] : _a = u, t = on(t, "onChange"), 0 < t.length && (a = new zn(
    "onChange",
    "change",
    null,
    a,
    u
  ), l.push({ event: a, listeners: t }));
}
var Tu = null, qu = null;
function gv(l) {
  O0(l, 0);
}
function _n(l) {
  var t = gu(l);
  if (zd(t)) return l;
}
function Qi(l, t) {
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
  Tu && (Tu.detachEvent("onpropertychange", Bd), qu = Tu = null);
}
function Bd(l) {
  if (l.propertyName === "value" && _n(qu)) {
    var t = [];
    Hd(
      t,
      qu,
      l,
      Rc(l)
    ), Dd(gv, t);
  }
}
function bv(l, t, a) {
  l === "focusin" ? (Zi(), Tu = t, qu = a, Tu.attachEvent("onpropertychange", Bd)) : l === "focusout" && Zi();
}
function Sv(l) {
  if (l === "selectionchange" || l === "keyup" || l === "keydown")
    return _n(qu);
}
function Ev(l, t) {
  if (l === "click") return _n(t);
}
function Tv(l, t) {
  if (l === "input" || l === "change")
    return _n(t);
}
function Av(l, t) {
  return l === t && (l !== 0 || 1 / l === 1 / t) || l !== l && t !== t;
}
var Gl = typeof Object.is == "function" ? Object.is : Av;
function Gu(l, t) {
  if (Gl(l, t)) return !0;
  if (typeof l != "object" || l === null || typeof t != "object" || t === null)
    return !1;
  var a = Object.keys(l), u = Object.keys(t);
  if (a.length !== u.length) return !1;
  for (u = 0; u < a.length; u++) {
    var e = a[u];
    if (!Nf.call(t, e) || !Gl(l[e], t[e]))
      return !1;
  }
  return !0;
}
function Vi(l) {
  for (; l && l.firstChild; ) l = l.firstChild;
  return l;
}
function Ki(l, t) {
  var a = Vi(l);
  l = 0;
  for (var u; a; ) {
    if (a.nodeType === 3) {
      if (u = l + a.textContent.length, l <= t && u >= t)
        return { node: a, offset: t - l };
      l = u;
    }
    l: {
      for (; a; ) {
        if (a.nextSibling) {
          a = a.nextSibling;
          break l;
        }
        a = a.parentNode;
      }
      a = void 0;
    }
    a = Vi(a);
  }
}
function qd(l, t) {
  return l && t ? l === t ? !0 : l && l.nodeType === 3 ? !1 : t && t.nodeType === 3 ? qd(l, t.parentNode) : "contains" in l ? l.contains(t) : l.compareDocumentPosition ? !!(l.compareDocumentPosition(t) & 16) : !1 : !1;
}
function Gd(l) {
  l = l != null && l.ownerDocument != null && l.ownerDocument.defaultView != null ? l.ownerDocument.defaultView : window;
  for (var t = Je(l.document); t instanceof l.HTMLIFrameElement; ) {
    try {
      var a = typeof t.contentWindow.location.href == "string";
    } catch {
      a = !1;
    }
    if (a) l = t.contentWindow;
    else break;
    t = Je(l.document);
  }
  return t;
}
function Bc(l) {
  var t = l && l.nodeName && l.nodeName.toLowerCase();
  return t && (t === "input" && (l.type === "text" || l.type === "search" || l.type === "tel" || l.type === "url" || l.type === "password") || t === "textarea" || l.contentEditable === "true");
}
var zv = gt && "documentMode" in document && 11 >= document.documentMode, Ma = null, qf = null, Au = null, Gf = !1;
function Li(l, t, a) {
  var u = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
  Gf || Ma == null || Ma !== Je(u) || (u = Ma, "selectionStart" in u && Bc(u) ? u = { start: u.selectionStart, end: u.selectionEnd } : (u = (u.ownerDocument && u.ownerDocument.defaultView || window).getSelection(), u = {
    anchorNode: u.anchorNode,
    anchorOffset: u.anchorOffset,
    focusNode: u.focusNode,
    focusOffset: u.focusOffset
  }), Au && Gu(Au, u) || (Au = u, u = on(qf, "onSelect"), 0 < u.length && (t = new zn(
    "onSelect",
    "select",
    null,
    t,
    a
  ), l.push({ event: t, listeners: u }), t.target = Ma)));
}
function kt(l, t) {
  var a = {};
  return a[l.toLowerCase()] = t.toLowerCase(), a["Webkit" + l] = "webkit" + t, a["Moz" + l] = "moz" + t, a;
}
var Da = {
  animationend: kt("Animation", "AnimationEnd"),
  animationiteration: kt("Animation", "AnimationIteration"),
  animationstart: kt("Animation", "AnimationStart"),
  transitionrun: kt("Transition", "TransitionRun"),
  transitionstart: kt("Transition", "TransitionStart"),
  transitioncancel: kt("Transition", "TransitionCancel"),
  transitionend: kt("Transition", "TransitionEnd")
}, Pn = {}, Xd = {};
gt && (Xd = document.createElement("div").style, "AnimationEvent" in window || (delete Da.animationend.animation, delete Da.animationiteration.animation, delete Da.animationstart.animation), "TransitionEvent" in window || delete Da.transitionend.transition);
function ha(l) {
  if (Pn[l]) return Pn[l];
  if (!Da[l]) return l;
  var t = Da[l], a;
  for (a in t)
    if (t.hasOwnProperty(a) && a in Xd)
      return Pn[l] = t[a];
  return l;
}
var jd = ha("animationend"), Qd = ha("animationiteration"), Cd = ha("animationstart"), pv = ha("transitionrun"), _v = ha("transitionstart"), Ov = ha("transitioncancel"), Zd = ha("transitionend"), Vd = /* @__PURE__ */ new Map(), Xf = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
  " "
);
Xf.push("scrollEnd");
function kl(l, t) {
  Vd.set(l, t), ra(t, [l]);
}
var Ji = /* @__PURE__ */ new WeakMap();
function Kl(l, t) {
  if (typeof l == "object" && l !== null) {
    var a = Ji.get(l);
    return a !== void 0 ? a : (t = {
      value: l,
      source: t,
      stack: Ni(t)
    }, Ji.set(l, t), t);
  }
  return {
    value: l,
    source: t,
    stack: Ni(t)
  };
}
var jl = [], Ua = 0, qc = 0;
function On() {
  for (var l = Ua, t = qc = Ua = 0; t < l; ) {
    var a = jl[t];
    jl[t++] = null;
    var u = jl[t];
    jl[t++] = null;
    var e = jl[t];
    jl[t++] = null;
    var n = jl[t];
    if (jl[t++] = null, u !== null && e !== null) {
      var f = u.pending;
      f === null ? e.next = e : (e.next = f.next, f.next = e), u.pending = e;
    }
    n !== 0 && Kd(a, e, n);
  }
}
function Mn(l, t, a, u) {
  jl[Ua++] = l, jl[Ua++] = t, jl[Ua++] = a, jl[Ua++] = u, qc |= u, l.lanes |= u, l = l.alternate, l !== null && (l.lanes |= u);
}
function Gc(l, t, a, u) {
  return Mn(l, t, a, u), we(l);
}
function uu(l, t) {
  return Mn(l, null, null, t), we(l);
}
function Kd(l, t, a) {
  l.lanes |= a;
  var u = l.alternate;
  u !== null && (u.lanes |= a);
  for (var e = !1, n = l.return; n !== null; )
    n.childLanes |= a, u = n.alternate, u !== null && (u.childLanes |= a), n.tag === 22 && (l = n.stateNode, l === null || l._visibility & 1 || (e = !0)), l = n, n = n.return;
  return l.tag === 3 ? (n = l.stateNode, e && t !== null && (e = 31 - Yl(a), l = n.hiddenUpdates, u = l[e], u === null ? l[e] = [t] : u.push(t), t.lane = a | 536870912), n) : null;
}
function we(l) {
  if (50 < xu)
    throw xu = 0, nc = null, Error(b(185));
  for (var t = l.return; t !== null; )
    l = t, t = l.return;
  return l.tag === 3 ? l.stateNode : null;
}
var Na = {};
function Mv(l, t, a, u) {
  this.tag = l, this.key = a, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = u, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function xl(l, t, a, u) {
  return new Mv(l, t, a, u);
}
function Xc(l) {
  return l = l.prototype, !(!l || !l.isReactComponent);
}
function yt(l, t) {
  var a = l.alternate;
  return a === null ? (a = xl(
    l.tag,
    t,
    l.key,
    l.mode
  ), a.elementType = l.elementType, a.type = l.type, a.stateNode = l.stateNode, a.alternate = l, l.alternate = a) : (a.pendingProps = t, a.type = l.type, a.flags = 0, a.subtreeFlags = 0, a.deletions = null), a.flags = l.flags & 65011712, a.childLanes = l.childLanes, a.lanes = l.lanes, a.child = l.child, a.memoizedProps = l.memoizedProps, a.memoizedState = l.memoizedState, a.updateQueue = l.updateQueue, t = l.dependencies, a.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, a.sibling = l.sibling, a.index = l.index, a.ref = l.ref, a.refCleanup = l.refCleanup, a;
}
function Ld(l, t) {
  l.flags &= 65011714;
  var a = l.alternate;
  return a === null ? (l.childLanes = 0, l.lanes = t, l.child = null, l.subtreeFlags = 0, l.memoizedProps = null, l.memoizedState = null, l.updateQueue = null, l.dependencies = null, l.stateNode = null) : (l.childLanes = a.childLanes, l.lanes = a.lanes, l.child = a.child, l.subtreeFlags = 0, l.deletions = null, l.memoizedProps = a.memoizedProps, l.memoizedState = a.memoizedState, l.updateQueue = a.updateQueue, l.type = a.type, t = a.dependencies, l.dependencies = t === null ? null : {
    lanes: t.lanes,
    firstContext: t.firstContext
  }), l;
}
function xe(l, t, a, u, e, n) {
  var f = 0;
  if (u = l, typeof l == "function") Xc(l) && (f = 1);
  else if (typeof l == "string")
    f = Uh(
      l,
      a,
      lt.current
    ) ? 26 : l === "html" || l === "head" || l === "body" ? 27 : 5;
  else
    l: switch (l) {
      case Of:
        return l = xl(31, a, t, e), l.elementType = Of, l.lanes = n, l;
      case Aa:
        return aa(a.children, e, n, t);
      case dd:
        f = 8, e |= 24;
        break;
      case zf:
        return l = xl(12, a, t, e | 2), l.elementType = zf, l.lanes = n, l;
      case pf:
        return l = xl(13, a, t, e), l.elementType = pf, l.lanes = n, l;
      case _f:
        return l = xl(19, a, t, e), l.elementType = _f, l.lanes = n, l;
      default:
        if (typeof l == "object" && l !== null)
          switch (l.$$typeof) {
            case gr:
            case dt:
              f = 10;
              break l;
            case od:
              f = 9;
              break l;
            case pc:
              f = 11;
              break l;
            case _c:
              f = 14;
              break l;
            case _t:
              f = 16, u = null;
              break l;
          }
        f = 29, a = Error(
          b(130, l === null ? "null" : typeof l, "")
        ), u = null;
    }
  return t = xl(f, a, t, e), t.elementType = l, t.type = u, t.lanes = n, t;
}
function aa(l, t, a, u) {
  return l = xl(7, l, u, t), l.lanes = a, l;
}
function lf(l, t, a) {
  return l = xl(6, l, null, t), l.lanes = a, l;
}
function tf(l, t, a) {
  return t = xl(
    4,
    l.children !== null ? l.children : [],
    l.key,
    t
  ), t.lanes = a, t.stateNode = {
    containerInfo: l.containerInfo,
    pendingChildren: null,
    implementation: l.implementation
  }, t;
}
var Ra = [], xa = 0, $e = null, We = 0, Cl = [], Zl = 0, ua = null, ot = 1, rt = "";
function Pt(l, t) {
  Ra[xa++] = We, Ra[xa++] = $e, $e = l, We = t;
}
function Jd(l, t, a) {
  Cl[Zl++] = ot, Cl[Zl++] = rt, Cl[Zl++] = ua, ua = l;
  var u = ot;
  l = rt;
  var e = 32 - Yl(u) - 1;
  u &= ~(1 << e), a += 1;
  var n = 32 - Yl(t) + e;
  if (30 < n) {
    var f = e - e % 5;
    n = (u & (1 << f) - 1).toString(32), u >>= f, e -= f, ot = 1 << 32 - Yl(t) + e | a << e | u, rt = n + l;
  } else
    ot = 1 << n | a << e | u, rt = l;
}
function jc(l) {
  l.return !== null && (Pt(l, 1), Jd(l, 1, 0));
}
function Qc(l) {
  for (; l === $e; )
    $e = Ra[--xa], Ra[xa] = null, We = Ra[--xa], Ra[xa] = null;
  for (; l === ua; )
    ua = Cl[--Zl], Cl[Zl] = null, rt = Cl[--Zl], Cl[Zl] = null, ot = Cl[--Zl], Cl[Zl] = null;
}
var Tl = null, P = null, j = !1, ea = null, Il = !1, jf = Error(b(519));
function ia(l) {
  var t = Error(b(418, ""));
  throw Xu(Kl(t, l)), jf;
}
function wi(l) {
  var t = l.stateNode, a = l.type, u = l.memoizedProps;
  switch (t[Sl] = l, t[Ml] = u, a) {
    case "dialog":
      Y("cancel", t), Y("close", t);
      break;
    case "iframe":
    case "object":
    case "embed":
      Y("load", t);
      break;
    case "video":
    case "audio":
      for (a = 0; a < Cu.length; a++)
        Y(Cu[a], t);
      break;
    case "source":
      Y("error", t);
      break;
    case "img":
    case "image":
    case "link":
      Y("error", t), Y("load", t);
      break;
    case "details":
      Y("toggle", t);
      break;
    case "input":
      Y("invalid", t), pd(
        t,
        u.value,
        u.defaultValue,
        u.checked,
        u.defaultChecked,
        u.type,
        u.name,
        !0
      ), Le(t);
      break;
    case "select":
      Y("invalid", t);
      break;
    case "textarea":
      Y("invalid", t), Od(t, u.value, u.defaultValue, u.children), Le(t);
  }
  a = u.children, typeof a != "string" && typeof a != "number" && typeof a != "bigint" || t.textContent === "" + a || u.suppressHydrationWarning === !0 || D0(t.textContent, a) ? (u.popover != null && (Y("beforetoggle", t), Y("toggle", t)), u.onScroll != null && Y("scroll", t), u.onScrollEnd != null && Y("scrollend", t), u.onClick != null && (t.onclick = Bn), t = !0) : t = !1, t || ia(l);
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
function du(l) {
  if (l !== Tl) return !1;
  if (!j) return $i(l), j = !0, !1;
  var t = l.tag, a;
  if ((a = t !== 3 && t !== 27) && ((a = t === 5) && (a = l.type, a = !(a !== "form" && a !== "button") || oc(l.type, l.memoizedProps)), a = !a), a && P && ia(l), $i(l), t === 13) {
    if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(b(317));
    l: {
      for (l = l.nextSibling, t = 0; l; ) {
        if (l.nodeType === 8)
          if (a = l.data, a === "/$") {
            if (t === 0) {
              P = Wl(l.nextSibling);
              break l;
            }
            t--;
          } else
            a !== "$" && a !== "$!" && a !== "$?" || t++;
        l = l.nextSibling;
      }
      P = null;
    }
  } else
    t === 27 ? (t = P, wt(l.type) ? (l = hc, hc = null, P = l) : P = t) : P = Tl ? Wl(l.stateNode.nextSibling) : null;
  return !0;
}
function le() {
  P = Tl = null, j = !1;
}
function Wi() {
  var l = ea;
  return l !== null && (Ol === null ? Ol = l : Ol.push.apply(
    Ol,
    l
  ), ea = null), l;
}
function Xu(l) {
  ea === null ? ea = [l] : ea.push(l);
}
var Qf = ut(null), ya = null, vt = null;
function Mt(l, t, a) {
  F(Qf, t._currentValue), t._currentValue = a;
}
function mt(l) {
  l._currentValue = Qf.current, vl(Qf);
}
function Cf(l, t, a) {
  for (; l !== null; ) {
    var u = l.alternate;
    if ((l.childLanes & t) !== t ? (l.childLanes |= t, u !== null && (u.childLanes |= t)) : u !== null && (u.childLanes & t) !== t && (u.childLanes |= t), l === a) break;
    l = l.return;
  }
}
function Zf(l, t, a, u) {
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
            n.lanes |= a, c = n.alternate, c !== null && (c.lanes |= a), Cf(
              n.return,
              a,
              l
            ), u || (f = null);
            break l;
          }
        n = c.next;
      }
    } else if (e.tag === 18) {
      if (f = e.return, f === null) throw Error(b(341));
      f.lanes |= a, n = f.alternate, n !== null && (n.lanes |= a), Cf(f, a, l), f = null;
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
function te(l, t, a, u) {
  l = null;
  for (var e = t, n = !1; e !== null; ) {
    if (!n) {
      if (e.flags & 524288) n = !0;
      else if (e.flags & 262144) break;
    }
    if (e.tag === 10) {
      var f = e.alternate;
      if (f === null) throw Error(b(387));
      if (f = f.memoizedProps, f !== null) {
        var c = e.type;
        Gl(e.pendingProps.value, f.value) || (l !== null ? l.push(c) : l = [c]);
      }
    } else if (e === Ce.current) {
      if (f = e.alternate, f === null) throw Error(b(387));
      f.memoizedState.memoizedState !== e.memoizedState.memoizedState && (l !== null ? l.push(Ku) : l = [Ku]);
    }
    e = e.return;
  }
  l !== null && Zf(
    t,
    l,
    a,
    u
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
function sa(l) {
  ya = l, vt = null, l = l.dependencies, l !== null && (l.firstContext = null);
}
function El(l) {
  return wd(ya, l);
}
function Se(l, t) {
  return ya === null && sa(l), wd(l, t);
}
function wd(l, t) {
  var a = t._currentValue;
  if (t = { context: t, memoizedValue: a, next: null }, vt === null) {
    if (l === null) throw Error(b(308));
    vt = t, l.dependencies = { lanes: 0, firstContext: t }, l.flags |= 524288;
  } else vt = vt.next = t;
  return a;
}
var Dv = typeof AbortController < "u" ? AbortController : function() {
  var l = [], t = this.signal = {
    aborted: !1,
    addEventListener: function(a, u) {
      l.push(u);
    }
  };
  this.abort = function() {
    t.aborted = !0, l.forEach(function(a) {
      return a();
    });
  };
}, Uv = il.unstable_scheduleCallback, Nv = il.unstable_NormalPriority, fl = {
  $$typeof: dt,
  Consumer: null,
  Provider: null,
  _currentValue: null,
  _currentValue2: null,
  _threadCount: 0
};
function Cc() {
  return {
    controller: new Dv(),
    data: /* @__PURE__ */ new Map(),
    refCount: 0
  };
}
function ae(l) {
  l.refCount--, l.refCount === 0 && Uv(Nv, function() {
    l.controller.abort();
  });
}
var zu = null, Vf = 0, La = 0, Ga = null;
function Rv(l, t) {
  if (zu === null) {
    var a = zu = [];
    Vf = 0, La = di(), Ga = {
      status: "pending",
      value: void 0,
      then: function(u) {
        a.push(u);
      }
    };
  }
  return Vf++, t.then(ki, ki), t;
}
function ki() {
  if (--Vf === 0 && zu !== null) {
    Ga !== null && (Ga.status = "fulfilled");
    var l = zu;
    zu = null, La = 0, Ga = null;
    for (var t = 0; t < l.length; t++) (0, l[t])();
  }
}
function xv(l, t) {
  var a = [], u = {
    status: "pending",
    value: null,
    reason: null,
    then: function(e) {
      a.push(e);
    }
  };
  return l.then(
    function() {
      u.status = "fulfilled", u.value = t;
      for (var e = 0; e < a.length; e++) (0, a[e])(t);
    },
    function(e) {
      for (u.status = "rejected", u.reason = e, e = 0; e < a.length; e++)
        (0, a[e])(void 0);
    }
  ), u;
}
var Fi = D.S;
D.S = function(l, t) {
  typeof t == "object" && t !== null && typeof t.then == "function" && Rv(l, t), Fi !== null && Fi(l, t);
};
var na = ut(null);
function Zc() {
  var l = na.current;
  return l !== null ? l : w.pooledCache;
}
function He(l, t) {
  t === null ? F(na, na.current) : F(na, t.pool);
}
function $d() {
  var l = Zc();
  return l === null ? null : { parent: fl._currentValue, pool: l };
}
var ue = Error(b(460)), Wd = Error(b(474)), Dn = Error(b(542)), Kf = { then: function() {
} };
function Ii(l) {
  return l = l.status, l === "fulfilled" || l === "rejected";
}
function Ee() {
}
function kd(l, t, a) {
  switch (a = l[a], a === void 0 ? l.push(t) : a !== t && (t.then(Ee, Ee), t = a), t.status) {
    case "fulfilled":
      return t.value;
    case "rejected":
      throw l = t.reason, ls(l), l;
    default:
      if (typeof t.status == "string") t.then(Ee, Ee);
      else {
        if (l = w, l !== null && 100 < l.shellSuspendCounter)
          throw Error(b(482));
        l = t, l.status = "pending", l.then(
          function(u) {
            if (t.status === "pending") {
              var e = t;
              e.status = "fulfilled", e.value = u;
            }
          },
          function(u) {
            if (t.status === "pending") {
              var e = t;
              e.status = "rejected", e.reason = u;
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
      throw pu = t, ue;
  }
}
var pu = null;
function Pi() {
  if (pu === null) throw Error(b(459));
  var l = pu;
  return pu = null, l;
}
function ls(l) {
  if (l === ue || l === Dn)
    throw Error(b(483));
}
var Ot = !1;
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
function Gt(l, t, a) {
  var u = l.updateQueue;
  if (u === null) return null;
  if (u = u.shared, Z & 2) {
    var e = u.pending;
    return e === null ? t.next = t : (t.next = e.next, e.next = t), u.pending = t, t = we(l), Kd(l, null, a), t;
  }
  return Mn(l, u, t, a), we(l);
}
function _u(l, t, a) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (a & 4194048) !== 0)) {
    var u = t.lanes;
    u &= l.pendingLanes, a |= u, t.lanes = a, bd(l, a);
  }
}
function af(l, t) {
  var a = l.updateQueue, u = l.alternate;
  if (u !== null && (u = u.updateQueue, a === u)) {
    var e = null, n = null;
    if (a = a.firstBaseUpdate, a !== null) {
      do {
        var f = {
          lane: a.lane,
          tag: a.tag,
          payload: a.payload,
          callback: null,
          next: null
        };
        n === null ? e = n = f : n = n.next = f, a = a.next;
      } while (a !== null);
      n === null ? e = n = t : n = n.next = t;
    } else e = n = t;
    a = {
      baseState: u.baseState,
      firstBaseUpdate: e,
      lastBaseUpdate: n,
      shared: u.shared,
      callbacks: u.callbacks
    }, l.updateQueue = a;
    return;
  }
  l = a.lastBaseUpdate, l === null ? a.firstBaseUpdate = t : l.next = t, a.lastBaseUpdate = t;
}
var Jf = !1;
function Ou() {
  if (Jf) {
    var l = Ga;
    if (l !== null) throw l;
  }
}
function Mu(l, t, a, u) {
  Jf = !1;
  var e = l.updateQueue;
  Ot = !1;
  var n = e.firstBaseUpdate, f = e.lastBaseUpdate, c = e.shared.pending;
  if (c !== null) {
    e.shared.pending = null;
    var i = c, o = i.next;
    i.next = null, f === null ? n = o : f.next = o, f = i;
    var m = l.alternate;
    m !== null && (m = m.updateQueue, c = m.lastBaseUpdate, c !== f && (c === null ? m.firstBaseUpdate = o : c.next = o, m.lastBaseUpdate = i));
  }
  if (n !== null) {
    var y = e.baseState;
    f = 0, m = o = i = null, c = n;
    do {
      var r = c.lane & -536870913, h = r !== c.lane;
      if (h ? (G & r) === r : (u & r) === r) {
        r !== 0 && r === La && (Jf = !0), m !== null && (m = m.next = {
          lane: 0,
          tag: c.tag,
          payload: c.payload,
          callback: null,
          next: null
        });
        l: {
          var _ = l, p = c;
          r = t;
          var q = a;
          switch (p.tag) {
            case 1:
              if (_ = p.payload, typeof _ == "function") {
                y = _.call(q, y, r);
                break l;
              }
              y = _;
              break l;
            case 3:
              _.flags = _.flags & -65537 | 128;
            case 0:
              if (_ = p.payload, r = typeof _ == "function" ? _.call(q, y, r) : _, r == null) break l;
              y = $({}, y, r);
              break l;
            case 2:
              Ot = !0;
          }
        }
        r = c.callback, r !== null && (l.flags |= 64, h && (l.flags |= 8192), h = e.callbacks, h === null ? e.callbacks = [r] : h.push(r));
      } else
        h = {
          lane: r,
          tag: c.tag,
          payload: c.payload,
          callback: c.callback,
          next: null
        }, m === null ? (o = m = h, i = y) : m = m.next = h, f |= r;
      if (c = c.next, c === null) {
        if (c = e.shared.pending, c === null)
          break;
        h = c, c = h.next, h.next = null, e.lastBaseUpdate = h, e.shared.pending = null;
      }
    } while (!0);
    m === null && (i = y), e.baseState = i, e.firstBaseUpdate = o, e.lastBaseUpdate = m, n === null && (e.shared.lanes = 0), Lt |= f, l.lanes = f, l.memoizedState = y;
  }
}
function Fd(l, t) {
  if (typeof l != "function")
    throw Error(b(191, l));
  l.call(t);
}
function Id(l, t) {
  var a = l.callbacks;
  if (a !== null)
    for (l.callbacks = null, l = 0; l < a.length; l++)
      Fd(a[l], t);
}
var Ja = ut(null), Fe = ut(0);
function ts(l, t) {
  l = Et, F(Fe, l), F(Ja, t), Et = l | t.baseLanes;
}
function wf() {
  F(Fe, Et), F(Ja, Ja.current);
}
function Kc() {
  Et = Fe.current, vl(Ja), vl(Fe);
}
var Vt = 0, x = null, K = null, el = null, Ie = !1, Xa = !1, da = !1, Pe = 0, ju = 0, ja = null, Hv = 0;
function al() {
  throw Error(b(321));
}
function Lc(l, t) {
  if (t === null) return !1;
  for (var a = 0; a < t.length && a < l.length; a++)
    if (!Gl(l[a], t[a])) return !1;
  return !0;
}
function Jc(l, t, a, u, e, n) {
  return Vt = n, x = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, D.H = l === null || l.memoizedState === null ? No : Ro, da = !1, n = a(u, e), da = !1, Xa && (n = lo(
    t,
    a,
    u,
    e
  )), Pd(l), n;
}
function Pd(l) {
  D.H = ln;
  var t = K !== null && K.next !== null;
  if (Vt = 0, el = K = x = null, Ie = !1, ju = 0, ja = null, t) throw Error(b(300));
  l === null || rl || (l = l.dependencies, l !== null && ke(l) && (rl = !0));
}
function lo(l, t, a, u) {
  x = l;
  var e = 0;
  do {
    if (Xa && (ja = null), ju = 0, Xa = !1, 25 <= e) throw Error(b(301));
    if (e += 1, el = K = null, l.updateQueue != null) {
      var n = l.updateQueue;
      n.lastEffect = null, n.events = null, n.stores = null, n.memoCache != null && (n.memoCache.index = 0);
    }
    D.H = Qv, n = t(a, u);
  } while (Xa);
  return n;
}
function Yv() {
  var l = D.H, t = l.useState()[0];
  return t = typeof t.then == "function" ? ee(t) : t, l = l.useState()[0], (K !== null ? K.memoizedState : null) !== l && (x.flags |= 1024), t;
}
function wc() {
  var l = Pe !== 0;
  return Pe = 0, l;
}
function $c(l, t, a) {
  t.updateQueue = l.updateQueue, t.flags &= -2053, l.lanes &= ~a;
}
function Wc(l) {
  if (Ie) {
    for (l = l.memoizedState; l !== null; ) {
      var t = l.queue;
      t !== null && (t.pending = null), l = l.next;
    }
    Ie = !1;
  }
  Vt = 0, el = K = x = null, Xa = !1, ju = Pe = 0, ja = null;
}
function pl() {
  var l = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null
  };
  return el === null ? x.memoizedState = el = l : el = el.next = l, el;
}
function nl() {
  if (K === null) {
    var l = x.alternate;
    l = l !== null ? l.memoizedState : null;
  } else l = K.next;
  var t = el === null ? x.memoizedState : el.next;
  if (t !== null)
    el = t, K = l;
  else {
    if (l === null)
      throw x.alternate === null ? Error(b(467)) : Error(b(310));
    K = l, l = {
      memoizedState: K.memoizedState,
      baseState: K.baseState,
      baseQueue: K.baseQueue,
      queue: K.queue,
      next: null
    }, el === null ? x.memoizedState = el = l : el = el.next = l;
  }
  return el;
}
function kc() {
  return { lastEffect: null, events: null, stores: null, memoCache: null };
}
function ee(l) {
  var t = ju;
  return ju += 1, ja === null && (ja = []), l = kd(ja, l, t), t = x, (el === null ? t.memoizedState : el.next) === null && (t = t.alternate, D.H = t === null || t.memoizedState === null ? No : Ro), l;
}
function Un(l) {
  if (l !== null && typeof l == "object") {
    if (typeof l.then == "function") return ee(l);
    if (l.$$typeof === dt) return El(l);
  }
  throw Error(b(438, String(l)));
}
function Fc(l) {
  var t = null, a = x.updateQueue;
  if (a !== null && (t = a.memoCache), t == null) {
    var u = x.alternate;
    u !== null && (u = u.updateQueue, u !== null && (u = u.memoCache, u != null && (t = {
      data: u.data.map(function(e) {
        return e.slice();
      }),
      index: 0
    })));
  }
  if (t == null && (t = { data: [], index: 0 }), a === null && (a = kc(), x.updateQueue = a), a.memoCache = t, a = t.data[t.index], a === void 0)
    for (a = t.data[t.index] = Array(l), u = 0; u < l; u++)
      a[u] = br;
  return t.index++, a;
}
function bt(l, t) {
  return typeof t == "function" ? t(l) : t;
}
function Ye(l) {
  var t = nl();
  return Ic(t, K, l);
}
function Ic(l, t, a) {
  var u = l.queue;
  if (u === null) throw Error(b(311));
  u.lastRenderedReducer = a;
  var e = l.baseQueue, n = u.pending;
  if (n !== null) {
    if (e !== null) {
      var f = e.next;
      e.next = n.next, n.next = f;
    }
    t.baseQueue = e = n, u.pending = null;
  }
  if (n = l.baseState, e === null) l.memoizedState = n;
  else {
    t = e.next;
    var c = f = null, i = null, o = t, m = !1;
    do {
      var y = o.lane & -536870913;
      if (y !== o.lane ? (G & y) === y : (Vt & y) === y) {
        var r = o.revertLane;
        if (r === 0)
          i !== null && (i = i.next = {
            lane: 0,
            revertLane: 0,
            action: o.action,
            hasEagerState: o.hasEagerState,
            eagerState: o.eagerState,
            next: null
          }), y === La && (m = !0);
        else if ((Vt & r) === r) {
          o = o.next, r === La && (m = !0);
          continue;
        } else
          y = {
            lane: 0,
            revertLane: o.revertLane,
            action: o.action,
            hasEagerState: o.hasEagerState,
            eagerState: o.eagerState,
            next: null
          }, i === null ? (c = i = y, f = n) : i = i.next = y, x.lanes |= r, Lt |= r;
        y = o.action, da && a(n, y), n = o.hasEagerState ? o.eagerState : a(n, y);
      } else
        r = {
          lane: y,
          revertLane: o.revertLane,
          action: o.action,
          hasEagerState: o.hasEagerState,
          eagerState: o.eagerState,
          next: null
        }, i === null ? (c = i = r, f = n) : i = i.next = r, x.lanes |= y, Lt |= y;
      o = o.next;
    } while (o !== null && o !== t);
    if (i === null ? f = n : i.next = c, !Gl(n, l.memoizedState) && (rl = !0, m && (a = Ga, a !== null)))
      throw a;
    l.memoizedState = n, l.baseState = f, l.baseQueue = i, u.lastRenderedState = n;
  }
  return e === null && (u.lanes = 0), [l.memoizedState, u.dispatch];
}
function uf(l) {
  var t = nl(), a = t.queue;
  if (a === null) throw Error(b(311));
  a.lastRenderedReducer = l;
  var u = a.dispatch, e = a.pending, n = t.memoizedState;
  if (e !== null) {
    a.pending = null;
    var f = e = e.next;
    do
      n = l(n, f.action), f = f.next;
    while (f !== e);
    Gl(n, t.memoizedState) || (rl = !0), t.memoizedState = n, t.baseQueue === null && (t.baseState = n), a.lastRenderedState = n;
  }
  return [n, u];
}
function to(l, t, a) {
  var u = x, e = nl(), n = j;
  if (n) {
    if (a === void 0) throw Error(b(407));
    a = a();
  } else a = t();
  var f = !Gl(
    (K || e).memoizedState,
    a
  );
  f && (e.memoizedState = a, rl = !0), e = e.queue;
  var c = eo.bind(null, u, e, l);
  if (ne(2048, 8, c, [l]), e.getSnapshot !== t || f || el !== null && el.memoizedState.tag & 1) {
    if (u.flags |= 2048, wa(
      9,
      Nn(),
      uo.bind(
        null,
        u,
        e,
        a,
        t
      ),
      null
    ), w === null) throw Error(b(349));
    n || Vt & 124 || ao(u, t, a);
  }
  return a;
}
function ao(l, t, a) {
  l.flags |= 16384, l = { getSnapshot: t, value: a }, t = x.updateQueue, t === null ? (t = kc(), x.updateQueue = t, t.stores = [l]) : (a = t.stores, a === null ? t.stores = [l] : a.push(l));
}
function uo(l, t, a, u) {
  t.value = a, t.getSnapshot = u, no(t) && fo(l);
}
function eo(l, t, a) {
  return a(function() {
    no(t) && fo(l);
  });
}
function no(l) {
  var t = l.getSnapshot;
  l = l.value;
  try {
    var a = t();
    return !Gl(l, a);
  } catch {
    return !0;
  }
}
function fo(l) {
  var t = uu(l, 2);
  t !== null && ql(t, l, 2);
}
function $f(l) {
  var t = pl();
  if (typeof l == "function") {
    var a = l;
    if (l = a(), da) {
      Rt(!0);
      try {
        a();
      } finally {
        Rt(!1);
      }
    }
  }
  return t.memoizedState = t.baseState = l, t.queue = {
    pending: null,
    lanes: 0,
    dispatch: null,
    lastRenderedReducer: bt,
    lastRenderedState: l
  }, t;
}
function co(l, t, a, u) {
  return l.baseState = a, Ic(
    l,
    K,
    typeof u == "function" ? u : bt
  );
}
function Bv(l, t, a, u, e) {
  if (Rn(l)) throw Error(b(485));
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
    D.T !== null ? a(!0) : n.isTransition = !1, u(n), a = t.pending, a === null ? (n.next = t.pending = n, io(t, n)) : (n.next = a.next, t.pending = a.next = n);
  }
}
function io(l, t) {
  var a = t.action, u = t.payload, e = l.state;
  if (t.isTransition) {
    var n = D.T, f = {};
    D.T = f;
    try {
      var c = a(e, u), i = D.S;
      i !== null && i(f, c), as(l, t, c);
    } catch (o) {
      Wf(l, t, o);
    } finally {
      D.T = n;
    }
  } else
    try {
      n = a(e, u), as(l, t, n);
    } catch (o) {
      Wf(l, t, o);
    }
}
function as(l, t, a) {
  a !== null && typeof a == "object" && typeof a.then == "function" ? a.then(
    function(u) {
      us(l, t, u);
    },
    function(u) {
      return Wf(l, t, u);
    }
  ) : us(l, t, a);
}
function us(l, t, a) {
  t.status = "fulfilled", t.value = a, so(t), l.state = a, t = l.pending, t !== null && (a = t.next, a === t ? l.pending = null : (a = a.next, t.next = a, io(l, a)));
}
function Wf(l, t, a) {
  var u = l.pending;
  if (l.pending = null, u !== null) {
    u = u.next;
    do
      t.status = "rejected", t.reason = a, so(t), t = t.next;
    while (t !== u);
  }
  l.action = null;
}
function so(l) {
  l = l.listeners;
  for (var t = 0; t < l.length; t++) (0, l[t])();
}
function oo(l, t) {
  return t;
}
function es(l, t) {
  if (j) {
    var a = w.formState;
    if (a !== null) {
      l: {
        var u = x;
        if (j) {
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
              ), u = e.data === "F!";
              break l;
            }
          }
          ia(u);
        }
        u = !1;
      }
      u && (t = a[0]);
    }
  }
  return a = pl(), a.memoizedState = a.baseState = t, u = {
    pending: null,
    lanes: 0,
    dispatch: null,
    lastRenderedReducer: oo,
    lastRenderedState: t
  }, a.queue = u, a = Mo.bind(
    null,
    x,
    u
  ), u.dispatch = a, u = $f(!1), n = ai.bind(
    null,
    x,
    !1,
    u.queue
  ), u = pl(), e = {
    state: t,
    dispatch: null,
    action: l,
    pending: null
  }, u.queue = e, a = Bv.bind(
    null,
    x,
    e,
    n,
    a
  ), e.dispatch = a, u.memoizedState = l, [t, a, !1];
}
function ns(l) {
  var t = nl();
  return ro(t, K, l);
}
function ro(l, t, a) {
  if (t = Ic(
    l,
    t,
    oo
  )[0], l = Ye(bt)[0], typeof t == "object" && t !== null && typeof t.then == "function")
    try {
      var u = ee(t);
    } catch (f) {
      throw f === ue ? Dn : f;
    }
  else u = t;
  t = nl();
  var e = t.queue, n = e.dispatch;
  return a !== t.memoizedState && (x.flags |= 2048, wa(
    9,
    Nn(),
    qv.bind(null, e, a),
    null
  )), [u, n, l];
}
function qv(l, t) {
  l.action = t;
}
function fs(l) {
  var t = nl(), a = K;
  if (a !== null)
    return ro(t, a, l);
  nl(), t = t.memoizedState, a = nl();
  var u = a.queue.dispatch;
  return a.memoizedState = l, [t, u, !1];
}
function wa(l, t, a, u) {
  return l = { tag: l, create: a, deps: u, inst: t, next: null }, t = x.updateQueue, t === null && (t = kc(), x.updateQueue = t), a = t.lastEffect, a === null ? t.lastEffect = l.next = l : (u = a.next, a.next = l, l.next = u, t.lastEffect = l), l;
}
function Nn() {
  return { destroy: void 0, resource: void 0 };
}
function vo() {
  return nl().memoizedState;
}
function Be(l, t, a, u) {
  var e = pl();
  u = u === void 0 ? null : u, x.flags |= l, e.memoizedState = wa(
    1 | t,
    Nn(),
    a,
    u
  );
}
function ne(l, t, a, u) {
  var e = nl();
  u = u === void 0 ? null : u;
  var n = e.memoizedState.inst;
  K !== null && u !== null && Lc(u, K.memoizedState.deps) ? e.memoizedState = wa(t, n, a, u) : (x.flags |= l, e.memoizedState = wa(
    1 | t,
    n,
    a,
    u
  ));
}
function cs(l, t) {
  Be(8390656, 8, l, t);
}
function ho(l, t) {
  ne(2048, 8, l, t);
}
function yo(l, t) {
  return ne(4, 2, l, t);
}
function mo(l, t) {
  return ne(4, 4, l, t);
}
function go(l, t) {
  if (typeof t == "function") {
    l = l();
    var a = t(l);
    return function() {
      typeof a == "function" ? a() : t(null);
    };
  }
  if (t != null)
    return l = l(), t.current = l, function() {
      t.current = null;
    };
}
function bo(l, t, a) {
  a = a != null ? a.concat([l]) : null, ne(4, 4, go.bind(null, t, l), a);
}
function Pc() {
}
function So(l, t) {
  var a = nl();
  t = t === void 0 ? null : t;
  var u = a.memoizedState;
  return t !== null && Lc(t, u[1]) ? u[0] : (a.memoizedState = [l, t], l);
}
function Eo(l, t) {
  var a = nl();
  t = t === void 0 ? null : t;
  var u = a.memoizedState;
  if (t !== null && Lc(t, u[1]))
    return u[0];
  if (u = l(), da) {
    Rt(!0);
    try {
      l();
    } finally {
      Rt(!1);
    }
  }
  return a.memoizedState = [u, t], u;
}
function li(l, t, a) {
  return a === void 0 || Vt & 1073741824 ? l.memoizedState = t : (l.memoizedState = a, l = d0(), x.lanes |= l, Lt |= l, a);
}
function To(l, t, a, u) {
  return Gl(a, t) ? a : Ja.current !== null ? (l = li(l, a, u), Gl(l, t) || (rl = !0), l) : Vt & 42 ? (l = d0(), x.lanes |= l, Lt |= l, t) : (rl = !0, l.memoizedState = a);
}
function Ao(l, t, a, u, e) {
  var n = Q.p;
  Q.p = n !== 0 && 8 > n ? n : 8;
  var f = D.T, c = {};
  D.T = c, ai(l, !1, t, a);
  try {
    var i = e(), o = D.S;
    if (o !== null && o(c, i), i !== null && typeof i == "object" && typeof i.then == "function") {
      var m = xv(
        i,
        u
      );
      Du(
        l,
        t,
        m,
        Bl(l)
      );
    } else
      Du(
        l,
        t,
        u,
        Bl(l)
      );
  } catch (y) {
    Du(
      l,
      t,
      { then: function() {
      }, status: "rejected", reason: y },
      Bl()
    );
  } finally {
    Q.p = n, D.T = f;
  }
}
function Gv() {
}
function kf(l, t, a, u) {
  if (l.tag !== 5) throw Error(b(476));
  var e = zo(l).queue;
  Ao(
    l,
    e,
    t,
    ta,
    a === null ? Gv : function() {
      return po(l), a(u);
    }
  );
}
function zo(l) {
  var t = l.memoizedState;
  if (t !== null) return t;
  t = {
    memoizedState: ta,
    baseState: ta,
    baseQueue: null,
    queue: {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: bt,
      lastRenderedState: ta
    },
    next: null
  };
  var a = {};
  return t.next = {
    memoizedState: a,
    baseState: a,
    baseQueue: null,
    queue: {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: bt,
      lastRenderedState: a
    },
    next: null
  }, l.memoizedState = t, l = l.alternate, l !== null && (l.memoizedState = t), t;
}
function po(l) {
  var t = zo(l).next.queue;
  Du(l, t, {}, Bl());
}
function ti() {
  return El(Ku);
}
function _o() {
  return nl().memoizedState;
}
function Oo() {
  return nl().memoizedState;
}
function Xv(l) {
  for (var t = l.return; t !== null; ) {
    switch (t.tag) {
      case 24:
      case 3:
        var a = Bl();
        l = qt(a);
        var u = Gt(t, l, a);
        u !== null && (ql(u, t, a), _u(u, t, a)), t = { cache: Cc() }, l.payload = t;
        return;
    }
    t = t.return;
  }
}
function jv(l, t, a) {
  var u = Bl();
  a = {
    lane: u,
    revertLane: 0,
    action: a,
    hasEagerState: !1,
    eagerState: null,
    next: null
  }, Rn(l) ? Do(t, a) : (a = Gc(l, t, a, u), a !== null && (ql(a, l, u), Uo(a, t, u)));
}
function Mo(l, t, a) {
  var u = Bl();
  Du(l, t, a, u);
}
function Du(l, t, a, u) {
  var e = {
    lane: u,
    revertLane: 0,
    action: a,
    hasEagerState: !1,
    eagerState: null,
    next: null
  };
  if (Rn(l)) Do(t, e);
  else {
    var n = l.alternate;
    if (l.lanes === 0 && (n === null || n.lanes === 0) && (n = t.lastRenderedReducer, n !== null))
      try {
        var f = t.lastRenderedState, c = n(f, a);
        if (e.hasEagerState = !0, e.eagerState = c, Gl(c, f))
          return Mn(l, t, e, 0), w === null && On(), !1;
      } catch {
      } finally {
      }
    if (a = Gc(l, t, e, u), a !== null)
      return ql(a, l, u), Uo(a, t, u), !0;
  }
  return !1;
}
function ai(l, t, a, u) {
  if (u = {
    lane: 2,
    revertLane: di(),
    action: u,
    hasEagerState: !1,
    eagerState: null,
    next: null
  }, Rn(l)) {
    if (t) throw Error(b(479));
  } else
    t = Gc(
      l,
      a,
      u,
      2
    ), t !== null && ql(t, l, 2);
}
function Rn(l) {
  var t = l.alternate;
  return l === x || t !== null && t === x;
}
function Do(l, t) {
  Xa = Ie = !0;
  var a = l.pending;
  a === null ? t.next = t : (t.next = a.next, a.next = t), l.pending = t;
}
function Uo(l, t, a) {
  if (a & 4194048) {
    var u = t.lanes;
    u &= l.pendingLanes, a |= u, t.lanes = a, bd(l, a);
  }
}
var ln = {
  readContext: El,
  use: Un,
  useCallback: al,
  useContext: al,
  useEffect: al,
  useImperativeHandle: al,
  useLayoutEffect: al,
  useInsertionEffect: al,
  useMemo: al,
  useReducer: al,
  useRef: al,
  useState: al,
  useDebugValue: al,
  useDeferredValue: al,
  useTransition: al,
  useSyncExternalStore: al,
  useId: al,
  useHostTransitionStatus: al,
  useFormState: al,
  useActionState: al,
  useOptimistic: al,
  useMemoCache: al,
  useCacheRefresh: al
}, No = {
  readContext: El,
  use: Un,
  useCallback: function(l, t) {
    return pl().memoizedState = [
      l,
      t === void 0 ? null : t
    ], l;
  },
  useContext: El,
  useEffect: cs,
  useImperativeHandle: function(l, t, a) {
    a = a != null ? a.concat([l]) : null, Be(
      4194308,
      4,
      go.bind(null, t, l),
      a
    );
  },
  useLayoutEffect: function(l, t) {
    return Be(4194308, 4, l, t);
  },
  useInsertionEffect: function(l, t) {
    Be(4, 2, l, t);
  },
  useMemo: function(l, t) {
    var a = pl();
    t = t === void 0 ? null : t;
    var u = l();
    if (da) {
      Rt(!0);
      try {
        l();
      } finally {
        Rt(!1);
      }
    }
    return a.memoizedState = [u, t], u;
  },
  useReducer: function(l, t, a) {
    var u = pl();
    if (a !== void 0) {
      var e = a(t);
      if (da) {
        Rt(!0);
        try {
          a(t);
        } finally {
          Rt(!1);
        }
      }
    } else e = t;
    return u.memoizedState = u.baseState = e, l = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: l,
      lastRenderedState: e
    }, u.queue = l, l = l.dispatch = jv.bind(
      null,
      x,
      l
    ), [u.memoizedState, l];
  },
  useRef: function(l) {
    var t = pl();
    return l = { current: l }, t.memoizedState = l;
  },
  useState: function(l) {
    l = $f(l);
    var t = l.queue, a = Mo.bind(null, x, t);
    return t.dispatch = a, [l.memoizedState, a];
  },
  useDebugValue: Pc,
  useDeferredValue: function(l, t) {
    var a = pl();
    return li(a, l, t);
  },
  useTransition: function() {
    var l = $f(!1);
    return l = Ao.bind(
      null,
      x,
      l.queue,
      !0,
      !1
    ), pl().memoizedState = l, [!1, l];
  },
  useSyncExternalStore: function(l, t, a) {
    var u = x, e = pl();
    if (j) {
      if (a === void 0)
        throw Error(b(407));
      a = a();
    } else {
      if (a = t(), w === null)
        throw Error(b(349));
      G & 124 || ao(u, t, a);
    }
    e.memoizedState = a;
    var n = { value: a, getSnapshot: t };
    return e.queue = n, cs(eo.bind(null, u, n, l), [
      l
    ]), u.flags |= 2048, wa(
      9,
      Nn(),
      uo.bind(
        null,
        u,
        n,
        a,
        t
      ),
      null
    ), a;
  },
  useId: function() {
    var l = pl(), t = w.identifierPrefix;
    if (j) {
      var a = rt, u = ot;
      a = (u & ~(1 << 32 - Yl(u) - 1)).toString(32) + a, t = "«" + t + "R" + a, a = Pe++, 0 < a && (t += "H" + a.toString(32)), t += "»";
    } else
      a = Hv++, t = "«" + t + "r" + a.toString(32) + "»";
    return l.memoizedState = t;
  },
  useHostTransitionStatus: ti,
  useFormState: es,
  useActionState: es,
  useOptimistic: function(l) {
    var t = pl();
    t.memoizedState = t.baseState = l;
    var a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: null,
      lastRenderedState: null
    };
    return t.queue = a, t = ai.bind(
      null,
      x,
      !0,
      a
    ), a.dispatch = t, [l, t];
  },
  useMemoCache: Fc,
  useCacheRefresh: function() {
    return pl().memoizedState = Xv.bind(
      null,
      x
    );
  }
}, Ro = {
  readContext: El,
  use: Un,
  useCallback: So,
  useContext: El,
  useEffect: ho,
  useImperativeHandle: bo,
  useInsertionEffect: yo,
  useLayoutEffect: mo,
  useMemo: Eo,
  useReducer: Ye,
  useRef: vo,
  useState: function() {
    return Ye(bt);
  },
  useDebugValue: Pc,
  useDeferredValue: function(l, t) {
    var a = nl();
    return To(
      a,
      K.memoizedState,
      l,
      t
    );
  },
  useTransition: function() {
    var l = Ye(bt)[0], t = nl().memoizedState;
    return [
      typeof l == "boolean" ? l : ee(l),
      t
    ];
  },
  useSyncExternalStore: to,
  useId: _o,
  useHostTransitionStatus: ti,
  useFormState: ns,
  useActionState: ns,
  useOptimistic: function(l, t) {
    var a = nl();
    return co(a, K, l, t);
  },
  useMemoCache: Fc,
  useCacheRefresh: Oo
}, Qv = {
  readContext: El,
  use: Un,
  useCallback: So,
  useContext: El,
  useEffect: ho,
  useImperativeHandle: bo,
  useInsertionEffect: yo,
  useLayoutEffect: mo,
  useMemo: Eo,
  useReducer: uf,
  useRef: vo,
  useState: function() {
    return uf(bt);
  },
  useDebugValue: Pc,
  useDeferredValue: function(l, t) {
    var a = nl();
    return K === null ? li(a, l, t) : To(
      a,
      K.memoizedState,
      l,
      t
    );
  },
  useTransition: function() {
    var l = uf(bt)[0], t = nl().memoizedState;
    return [
      typeof l == "boolean" ? l : ee(l),
      t
    ];
  },
  useSyncExternalStore: to,
  useId: _o,
  useHostTransitionStatus: ti,
  useFormState: fs,
  useActionState: fs,
  useOptimistic: function(l, t) {
    var a = nl();
    return K !== null ? co(a, K, l, t) : (a.baseState = l, [l, a.queue.dispatch]);
  },
  useMemoCache: Fc,
  useCacheRefresh: Oo
}, Qa = null, Qu = 0;
function Te(l) {
  var t = Qu;
  return Qu += 1, Qa === null && (Qa = []), kd(Qa, l, t);
}
function ou(l, t) {
  t = t.props.ref, l.ref = t !== void 0 ? t : null;
}
function Ae(l, t) {
  throw t.$$typeof === mr ? Error(b(525)) : (l = Object.prototype.toString.call(t), Error(
    b(
      31,
      l === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : l
    )
  ));
}
function is(l) {
  var t = l._init;
  return t(l._payload);
}
function xo(l) {
  function t(d, s) {
    if (l) {
      var v = d.deletions;
      v === null ? (d.deletions = [s], d.flags |= 16) : v.push(s);
    }
  }
  function a(d, s) {
    if (!l) return null;
    for (; s !== null; )
      t(d, s), s = s.sibling;
    return null;
  }
  function u(d) {
    for (var s = /* @__PURE__ */ new Map(); d !== null; )
      d.key !== null ? s.set(d.key, d) : s.set(d.index, d), d = d.sibling;
    return s;
  }
  function e(d, s) {
    return d = yt(d, s), d.index = 0, d.sibling = null, d;
  }
  function n(d, s, v) {
    return d.index = v, l ? (v = d.alternate, v !== null ? (v = v.index, v < s ? (d.flags |= 67108866, s) : v) : (d.flags |= 67108866, s)) : (d.flags |= 1048576, s);
  }
  function f(d) {
    return l && d.alternate === null && (d.flags |= 67108866), d;
  }
  function c(d, s, v, g) {
    return s === null || s.tag !== 6 ? (s = lf(v, d.mode, g), s.return = d, s) : (s = e(s, v), s.return = d, s);
  }
  function i(d, s, v, g) {
    var T = v.type;
    return T === Aa ? m(
      d,
      s,
      v.props.children,
      g,
      v.key
    ) : s !== null && (s.elementType === T || typeof T == "object" && T !== null && T.$$typeof === _t && is(T) === s.type) ? (s = e(s, v.props), ou(s, v), s.return = d, s) : (s = xe(
      v.type,
      v.key,
      v.props,
      null,
      d.mode,
      g
    ), ou(s, v), s.return = d, s);
  }
  function o(d, s, v, g) {
    return s === null || s.tag !== 4 || s.stateNode.containerInfo !== v.containerInfo || s.stateNode.implementation !== v.implementation ? (s = tf(v, d.mode, g), s.return = d, s) : (s = e(s, v.children || []), s.return = d, s);
  }
  function m(d, s, v, g, T) {
    return s === null || s.tag !== 7 ? (s = aa(
      v,
      d.mode,
      g,
      T
    ), s.return = d, s) : (s = e(s, v), s.return = d, s);
  }
  function y(d, s, v) {
    if (typeof s == "string" && s !== "" || typeof s == "number" || typeof s == "bigint")
      return s = lf(
        "" + s,
        d.mode,
        v
      ), s.return = d, s;
    if (typeof s == "object" && s !== null) {
      switch (s.$$typeof) {
        case he:
          return v = xe(
            s.type,
            s.key,
            s.props,
            null,
            d.mode,
            v
          ), ou(v, s), v.return = d, v;
        case yu:
          return s = tf(
            s,
            d.mode,
            v
          ), s.return = d, s;
        case _t:
          var g = s._init;
          return s = g(s._payload), y(d, s, v);
      }
      if (mu(s) || cu(s))
        return s = aa(
          s,
          d.mode,
          v,
          null
        ), s.return = d, s;
      if (typeof s.then == "function")
        return y(d, Te(s), v);
      if (s.$$typeof === dt)
        return y(
          d,
          Se(d, s),
          v
        );
      Ae(d, s);
    }
    return null;
  }
  function r(d, s, v, g) {
    var T = s !== null ? s.key : null;
    if (typeof v == "string" && v !== "" || typeof v == "number" || typeof v == "bigint")
      return T !== null ? null : c(d, s, "" + v, g);
    if (typeof v == "object" && v !== null) {
      switch (v.$$typeof) {
        case he:
          return v.key === T ? i(d, s, v, g) : null;
        case yu:
          return v.key === T ? o(d, s, v, g) : null;
        case _t:
          return T = v._init, v = T(v._payload), r(d, s, v, g);
      }
      if (mu(v) || cu(v))
        return T !== null ? null : m(d, s, v, g, null);
      if (typeof v.then == "function")
        return r(
          d,
          s,
          Te(v),
          g
        );
      if (v.$$typeof === dt)
        return r(
          d,
          s,
          Se(d, v),
          g
        );
      Ae(d, v);
    }
    return null;
  }
  function h(d, s, v, g, T) {
    if (typeof g == "string" && g !== "" || typeof g == "number" || typeof g == "bigint")
      return d = d.get(v) || null, c(s, d, "" + g, T);
    if (typeof g == "object" && g !== null) {
      switch (g.$$typeof) {
        case he:
          return d = d.get(
            g.key === null ? v : g.key
          ) || null, i(s, d, g, T);
        case yu:
          return d = d.get(
            g.key === null ? v : g.key
          ) || null, o(s, d, g, T);
        case _t:
          var U = g._init;
          return g = U(g._payload), h(
            d,
            s,
            v,
            g,
            T
          );
      }
      if (mu(g) || cu(g))
        return d = d.get(v) || null, m(s, d, g, T, null);
      if (typeof g.then == "function")
        return h(
          d,
          s,
          v,
          Te(g),
          T
        );
      if (g.$$typeof === dt)
        return h(
          d,
          s,
          v,
          Se(s, g),
          T
        );
      Ae(s, g);
    }
    return null;
  }
  function _(d, s, v, g) {
    for (var T = null, U = null, A = s, O = s = 0, S = null; A !== null && O < v.length; O++) {
      A.index > O ? (S = A, A = null) : S = A.sibling;
      var z = r(
        d,
        A,
        v[O],
        g
      );
      if (z === null) {
        A === null && (A = S);
        break;
      }
      l && A && z.alternate === null && t(d, A), s = n(z, s, O), U === null ? T = z : U.sibling = z, U = z, A = S;
    }
    if (O === v.length)
      return a(d, A), j && Pt(d, O), T;
    if (A === null) {
      for (; O < v.length; O++)
        A = y(d, v[O], g), A !== null && (s = n(
          A,
          s,
          O
        ), U === null ? T = A : U.sibling = A, U = A);
      return j && Pt(d, O), T;
    }
    for (A = u(A); O < v.length; O++)
      S = h(
        A,
        d,
        O,
        v[O],
        g
      ), S !== null && (l && S.alternate !== null && A.delete(
        S.key === null ? O : S.key
      ), s = n(
        S,
        s,
        O
      ), U === null ? T = S : U.sibling = S, U = S);
    return l && A.forEach(function(H) {
      return t(d, H);
    }), j && Pt(d, O), T;
  }
  function p(d, s, v, g) {
    if (v == null) throw Error(b(151));
    for (var T = null, U = null, A = s, O = s = 0, S = null, z = v.next(); A !== null && !z.done; O++, z = v.next()) {
      A.index > O ? (S = A, A = null) : S = A.sibling;
      var H = r(d, A, z.value, g);
      if (H === null) {
        A === null && (A = S);
        break;
      }
      l && A && H.alternate === null && t(d, A), s = n(H, s, O), U === null ? T = H : U.sibling = H, U = H, A = S;
    }
    if (z.done)
      return a(d, A), j && Pt(d, O), T;
    if (A === null) {
      for (; !z.done; O++, z = v.next())
        z = y(d, z.value, g), z !== null && (s = n(z, s, O), U === null ? T = z : U.sibling = z, U = z);
      return j && Pt(d, O), T;
    }
    for (A = u(A); !z.done; O++, z = v.next())
      z = h(A, d, O, z.value, g), z !== null && (l && z.alternate !== null && A.delete(z.key === null ? O : z.key), s = n(z, s, O), U === null ? T = z : U.sibling = z, U = z);
    return l && A.forEach(function(J) {
      return t(d, J);
    }), j && Pt(d, O), T;
  }
  function q(d, s, v, g) {
    if (typeof v == "object" && v !== null && v.type === Aa && v.key === null && (v = v.props.children), typeof v == "object" && v !== null) {
      switch (v.$$typeof) {
        case he:
          l: {
            for (var T = v.key; s !== null; ) {
              if (s.key === T) {
                if (T = v.type, T === Aa) {
                  if (s.tag === 7) {
                    a(
                      d,
                      s.sibling
                    ), g = e(
                      s,
                      v.props.children
                    ), g.return = d, d = g;
                    break l;
                  }
                } else if (s.elementType === T || typeof T == "object" && T !== null && T.$$typeof === _t && is(T) === s.type) {
                  a(
                    d,
                    s.sibling
                  ), g = e(s, v.props), ou(g, v), g.return = d, d = g;
                  break l;
                }
                a(d, s);
                break;
              } else t(d, s);
              s = s.sibling;
            }
            v.type === Aa ? (g = aa(
              v.props.children,
              d.mode,
              g,
              v.key
            ), g.return = d, d = g) : (g = xe(
              v.type,
              v.key,
              v.props,
              null,
              d.mode,
              g
            ), ou(g, v), g.return = d, d = g);
          }
          return f(d);
        case yu:
          l: {
            for (T = v.key; s !== null; ) {
              if (s.key === T)
                if (s.tag === 4 && s.stateNode.containerInfo === v.containerInfo && s.stateNode.implementation === v.implementation) {
                  a(
                    d,
                    s.sibling
                  ), g = e(s, v.children || []), g.return = d, d = g;
                  break l;
                } else {
                  a(d, s);
                  break;
                }
              else t(d, s);
              s = s.sibling;
            }
            g = tf(v, d.mode, g), g.return = d, d = g;
          }
          return f(d);
        case _t:
          return T = v._init, v = T(v._payload), q(
            d,
            s,
            v,
            g
          );
      }
      if (mu(v))
        return _(
          d,
          s,
          v,
          g
        );
      if (cu(v)) {
        if (T = cu(v), typeof T != "function") throw Error(b(150));
        return v = T.call(v), p(
          d,
          s,
          v,
          g
        );
      }
      if (typeof v.then == "function")
        return q(
          d,
          s,
          Te(v),
          g
        );
      if (v.$$typeof === dt)
        return q(
          d,
          s,
          Se(d, v),
          g
        );
      Ae(d, v);
    }
    return typeof v == "string" && v !== "" || typeof v == "number" || typeof v == "bigint" ? (v = "" + v, s !== null && s.tag === 6 ? (a(d, s.sibling), g = e(s, v), g.return = d, d = g) : (a(d, s), g = lf(v, d.mode, g), g.return = d, d = g), f(d)) : a(d, s);
  }
  return function(d, s, v, g) {
    try {
      Qu = 0;
      var T = q(
        d,
        s,
        v,
        g
      );
      return Qa = null, T;
    } catch (A) {
      if (A === ue || A === Dn) throw A;
      var U = xl(29, A, null, d.mode);
      return U.lanes = g, U.return = d, U;
    } finally {
    }
  };
}
var $a = xo(!0), Ho = xo(!1), Jl = ut(null), at = null;
function Dt(l) {
  var t = l.alternate;
  F(cl, cl.current & 1), F(Jl, l), at === null && (t === null || Ja.current !== null || t.memoizedState !== null) && (at = l);
}
function Yo(l) {
  if (l.tag === 22) {
    if (F(cl, cl.current), F(Jl, l), at === null) {
      var t = l.alternate;
      t !== null && t.memoizedState !== null && (at = l);
    }
  } else Ut();
}
function Ut() {
  F(cl, cl.current), F(Jl, Jl.current);
}
function ht(l) {
  vl(Jl), at === l && (at = null), vl(cl);
}
var cl = ut(0);
function tn(l) {
  for (var t = l; t !== null; ) {
    if (t.tag === 13) {
      var a = t.memoizedState;
      if (a !== null && (a = a.dehydrated, a === null || a.data === "$?" || vc(a)))
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
function ef(l, t, a, u) {
  t = l.memoizedState, a = a(u, t), a = a == null ? t : $({}, t, a), l.memoizedState = a, l.lanes === 0 && (l.updateQueue.baseState = a);
}
var Ff = {
  enqueueSetState: function(l, t, a) {
    l = l._reactInternals;
    var u = Bl(), e = qt(u);
    e.payload = t, a != null && (e.callback = a), t = Gt(l, e, u), t !== null && (ql(t, l, u), _u(t, l, u));
  },
  enqueueReplaceState: function(l, t, a) {
    l = l._reactInternals;
    var u = Bl(), e = qt(u);
    e.tag = 1, e.payload = t, a != null && (e.callback = a), t = Gt(l, e, u), t !== null && (ql(t, l, u), _u(t, l, u));
  },
  enqueueForceUpdate: function(l, t) {
    l = l._reactInternals;
    var a = Bl(), u = qt(a);
    u.tag = 2, t != null && (u.callback = t), t = Gt(l, u, a), t !== null && (ql(t, l, a), _u(t, l, a));
  }
};
function ss(l, t, a, u, e, n, f) {
  return l = l.stateNode, typeof l.shouldComponentUpdate == "function" ? l.shouldComponentUpdate(u, n, f) : t.prototype && t.prototype.isPureReactComponent ? !Gu(a, u) || !Gu(e, n) : !0;
}
function ds(l, t, a, u) {
  l = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(a, u), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(a, u), t.state !== l && Ff.enqueueReplaceState(t, t.state, null);
}
function oa(l, t) {
  var a = t;
  if ("ref" in t) {
    a = {};
    for (var u in t)
      u !== "ref" && (a[u] = t[u]);
  }
  if (l = l.defaultProps) {
    a === t && (a = $({}, a));
    for (var e in l)
      a[e] === void 0 && (a[e] = l[e]);
  }
  return a;
}
var an = typeof reportError == "function" ? reportError : function(l) {
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
function Bo(l) {
  an(l);
}
function qo(l) {
  console.error(l);
}
function Go(l) {
  an(l);
}
function un(l, t) {
  try {
    var a = l.onUncaughtError;
    a(t.value, { componentStack: t.stack });
  } catch (u) {
    setTimeout(function() {
      throw u;
    });
  }
}
function os(l, t, a) {
  try {
    var u = l.onCaughtError;
    u(a.value, {
      componentStack: a.stack,
      errorBoundary: t.tag === 1 ? t.stateNode : null
    });
  } catch (e) {
    setTimeout(function() {
      throw e;
    });
  }
}
function If(l, t, a) {
  return a = qt(a), a.tag = 3, a.payload = { element: null }, a.callback = function() {
    un(l, t);
  }, a;
}
function Xo(l) {
  return l = qt(l), l.tag = 3, l;
}
function jo(l, t, a, u) {
  var e = a.type.getDerivedStateFromError;
  if (typeof e == "function") {
    var n = u.value;
    l.payload = function() {
      return e(n);
    }, l.callback = function() {
      os(t, a, u);
    };
  }
  var f = a.stateNode;
  f !== null && typeof f.componentDidCatch == "function" && (l.callback = function() {
    os(t, a, u), typeof e != "function" && (Xt === null ? Xt = /* @__PURE__ */ new Set([this]) : Xt.add(this));
    var c = u.stack;
    this.componentDidCatch(u.value, {
      componentStack: c !== null ? c : ""
    });
  });
}
function Cv(l, t, a, u, e) {
  if (a.flags |= 32768, u !== null && typeof u == "object" && typeof u.then == "function") {
    if (t = a.alternate, t !== null && te(
      t,
      a,
      e,
      !0
    ), a = Jl.current, a !== null) {
      switch (a.tag) {
        case 13:
          return at === null ? fc() : a.alternate === null && ll === 0 && (ll = 3), a.flags &= -257, a.flags |= 65536, a.lanes = e, u === Kf ? a.flags |= 16384 : (t = a.updateQueue, t === null ? a.updateQueue = /* @__PURE__ */ new Set([u]) : t.add(u), mf(l, u, e)), !1;
        case 22:
          return a.flags |= 65536, u === Kf ? a.flags |= 16384 : (t = a.updateQueue, t === null ? (t = {
            transitions: null,
            markerInstances: null,
            retryQueue: /* @__PURE__ */ new Set([u])
          }, a.updateQueue = t) : (a = t.retryQueue, a === null ? t.retryQueue = /* @__PURE__ */ new Set([u]) : a.add(u)), mf(l, u, e)), !1;
      }
      throw Error(b(435, a.tag));
    }
    return mf(l, u, e), fc(), !1;
  }
  if (j)
    return t = Jl.current, t !== null ? (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = e, u !== jf && (l = Error(b(422), { cause: u }), Xu(Kl(l, a)))) : (u !== jf && (t = Error(b(423), {
      cause: u
    }), Xu(
      Kl(t, a)
    )), l = l.current.alternate, l.flags |= 65536, e &= -e, l.lanes |= e, u = Kl(u, a), e = If(
      l.stateNode,
      u,
      e
    ), af(l, e), ll !== 4 && (ll = 2)), !1;
  var n = Error(b(520), { cause: u });
  if (n = Kl(n, a), Ru === null ? Ru = [n] : Ru.push(n), ll !== 4 && (ll = 2), t === null) return !0;
  u = Kl(u, a), a = t;
  do {
    switch (a.tag) {
      case 3:
        return a.flags |= 65536, l = e & -e, a.lanes |= l, l = If(a.stateNode, u, l), af(a, l), !1;
      case 1:
        if (t = a.type, n = a.stateNode, (a.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || n !== null && typeof n.componentDidCatch == "function" && (Xt === null || !Xt.has(n))))
          return a.flags |= 65536, e &= -e, a.lanes |= e, e = Xo(e), jo(
            e,
            l,
            a,
            u
          ), af(a, e), !1;
    }
    a = a.return;
  } while (a !== null);
  return !1;
}
var Qo = Error(b(461)), rl = !1;
function yl(l, t, a, u) {
  t.child = l === null ? Ho(t, null, a, u) : $a(
    t,
    l.child,
    a,
    u
  );
}
function rs(l, t, a, u, e) {
  a = a.render;
  var n = t.ref;
  if ("ref" in u) {
    var f = {};
    for (var c in u)
      c !== "ref" && (f[c] = u[c]);
  } else f = u;
  return sa(t), u = Jc(
    l,
    t,
    a,
    f,
    n,
    e
  ), c = wc(), l !== null && !rl ? ($c(l, t, e), St(l, t, e)) : (j && c && jc(t), t.flags |= 1, yl(l, t, u, e), t.child);
}
function vs(l, t, a, u, e) {
  if (l === null) {
    var n = a.type;
    return typeof n == "function" && !Xc(n) && n.defaultProps === void 0 && a.compare === null ? (t.tag = 15, t.type = n, Co(
      l,
      t,
      n,
      u,
      e
    )) : (l = xe(
      a.type,
      null,
      u,
      t,
      t.mode,
      e
    ), l.ref = t.ref, l.return = t, t.child = l);
  }
  if (n = l.child, !ui(l, e)) {
    var f = n.memoizedProps;
    if (a = a.compare, a = a !== null ? a : Gu, a(f, u) && l.ref === t.ref)
      return St(l, t, e);
  }
  return t.flags |= 1, l = yt(n, u), l.ref = t.ref, l.return = t, t.child = l;
}
function Co(l, t, a, u, e) {
  if (l !== null) {
    var n = l.memoizedProps;
    if (Gu(n, u) && l.ref === t.ref)
      if (rl = !1, t.pendingProps = u = n, ui(l, e))
        l.flags & 131072 && (rl = !0);
      else
        return t.lanes = l.lanes, St(l, t, e);
  }
  return Pf(
    l,
    t,
    a,
    u,
    e
  );
}
function Zo(l, t, a) {
  var u = t.pendingProps, e = u.children, n = l !== null ? l.memoizedState : null;
  if (u.mode === "hidden") {
    if (t.flags & 128) {
      if (u = n !== null ? n.baseLanes | a : a, l !== null) {
        for (e = t.child = l.child, n = 0; e !== null; )
          n = n | e.lanes | e.childLanes, e = e.sibling;
        t.childLanes = n & ~u;
      } else t.childLanes = 0, t.child = null;
      return hs(
        l,
        t,
        u,
        a
      );
    }
    if (a & 536870912)
      t.memoizedState = { baseLanes: 0, cachePool: null }, l !== null && He(
        t,
        n !== null ? n.cachePool : null
      ), n !== null ? ts(t, n) : wf(), Yo(t);
    else
      return t.lanes = t.childLanes = 536870912, hs(
        l,
        t,
        n !== null ? n.baseLanes | a : a,
        a
      );
  } else
    n !== null ? (He(t, n.cachePool), ts(t, n), Ut(), t.memoizedState = null) : (l !== null && He(t, null), wf(), Ut());
  return yl(l, t, e, a), t.child;
}
function hs(l, t, a, u) {
  var e = Zc();
  return e = e === null ? null : { parent: fl._currentValue, pool: e }, t.memoizedState = {
    baseLanes: a,
    cachePool: e
  }, l !== null && He(t, null), wf(), Yo(t), l !== null && te(l, t, u, !0), null;
}
function qe(l, t) {
  var a = t.ref;
  if (a === null)
    l !== null && l.ref !== null && (t.flags |= 4194816);
  else {
    if (typeof a != "function" && typeof a != "object")
      throw Error(b(284));
    (l === null || l.ref !== a) && (t.flags |= 4194816);
  }
}
function Pf(l, t, a, u, e) {
  return sa(t), a = Jc(
    l,
    t,
    a,
    u,
    void 0,
    e
  ), u = wc(), l !== null && !rl ? ($c(l, t, e), St(l, t, e)) : (j && u && jc(t), t.flags |= 1, yl(l, t, a, e), t.child);
}
function ys(l, t, a, u, e, n) {
  return sa(t), t.updateQueue = null, a = lo(
    t,
    u,
    a,
    e
  ), Pd(l), u = wc(), l !== null && !rl ? ($c(l, t, n), St(l, t, n)) : (j && u && jc(t), t.flags |= 1, yl(l, t, a, n), t.child);
}
function ms(l, t, a, u, e) {
  if (sa(t), t.stateNode === null) {
    var n = Na, f = a.contextType;
    typeof f == "object" && f !== null && (n = El(f)), n = new a(u, n), t.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null, n.updater = Ff, t.stateNode = n, n._reactInternals = t, n = t.stateNode, n.props = u, n.state = t.memoizedState, n.refs = {}, Vc(t), f = a.contextType, n.context = typeof f == "object" && f !== null ? El(f) : Na, n.state = t.memoizedState, f = a.getDerivedStateFromProps, typeof f == "function" && (ef(
      t,
      a,
      f,
      u
    ), n.state = t.memoizedState), typeof a.getDerivedStateFromProps == "function" || typeof n.getSnapshotBeforeUpdate == "function" || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (f = n.state, typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount(), f !== n.state && Ff.enqueueReplaceState(n, n.state, null), Mu(t, u, n, e), Ou(), n.state = t.memoizedState), typeof n.componentDidMount == "function" && (t.flags |= 4194308), u = !0;
  } else if (l === null) {
    n = t.stateNode;
    var c = t.memoizedProps, i = oa(a, c);
    n.props = i;
    var o = n.context, m = a.contextType;
    f = Na, typeof m == "object" && m !== null && (f = El(m));
    var y = a.getDerivedStateFromProps;
    m = typeof y == "function" || typeof n.getSnapshotBeforeUpdate == "function", c = t.pendingProps !== c, m || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (c || o !== f) && ds(
      t,
      n,
      u,
      f
    ), Ot = !1;
    var r = t.memoizedState;
    n.state = r, Mu(t, u, n, e), Ou(), o = t.memoizedState, c || r !== o || Ot ? (typeof y == "function" && (ef(
      t,
      a,
      y,
      u
    ), o = t.memoizedState), (i = Ot || ss(
      t,
      a,
      i,
      u,
      r,
      o,
      f
    )) ? (m || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount()), typeof n.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof n.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = u, t.memoizedState = o), n.props = u, n.state = o, n.context = f, u = i) : (typeof n.componentDidMount == "function" && (t.flags |= 4194308), u = !1);
  } else {
    n = t.stateNode, Lf(l, t), f = t.memoizedProps, m = oa(a, f), n.props = m, y = t.pendingProps, r = n.context, o = a.contextType, i = Na, typeof o == "object" && o !== null && (i = El(o)), c = a.getDerivedStateFromProps, (o = typeof c == "function" || typeof n.getSnapshotBeforeUpdate == "function") || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (f !== y || r !== i) && ds(
      t,
      n,
      u,
      i
    ), Ot = !1, r = t.memoizedState, n.state = r, Mu(t, u, n, e), Ou();
    var h = t.memoizedState;
    f !== y || r !== h || Ot || l !== null && l.dependencies !== null && ke(l.dependencies) ? (typeof c == "function" && (ef(
      t,
      a,
      c,
      u
    ), h = t.memoizedState), (m = Ot || ss(
      t,
      a,
      m,
      u,
      r,
      h,
      i
    ) || l !== null && l.dependencies !== null && ke(l.dependencies)) ? (o || typeof n.UNSAFE_componentWillUpdate != "function" && typeof n.componentWillUpdate != "function" || (typeof n.componentWillUpdate == "function" && n.componentWillUpdate(u, h, i), typeof n.UNSAFE_componentWillUpdate == "function" && n.UNSAFE_componentWillUpdate(
      u,
      h,
      i
    )), typeof n.componentDidUpdate == "function" && (t.flags |= 4), typeof n.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof n.componentDidUpdate != "function" || f === l.memoizedProps && r === l.memoizedState || (t.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || f === l.memoizedProps && r === l.memoizedState || (t.flags |= 1024), t.memoizedProps = u, t.memoizedState = h), n.props = u, n.state = h, n.context = i, u = m) : (typeof n.componentDidUpdate != "function" || f === l.memoizedProps && r === l.memoizedState || (t.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || f === l.memoizedProps && r === l.memoizedState || (t.flags |= 1024), u = !1);
  }
  return n = u, qe(l, t), u = (t.flags & 128) !== 0, n || u ? (n = t.stateNode, a = u && typeof a.getDerivedStateFromError != "function" ? null : n.render(), t.flags |= 1, l !== null && u ? (t.child = $a(
    t,
    l.child,
    null,
    e
  ), t.child = $a(
    t,
    null,
    a,
    e
  )) : yl(l, t, a, e), t.memoizedState = n.state, l = t.child) : l = St(
    l,
    t,
    e
  ), l;
}
function gs(l, t, a, u) {
  return le(), t.flags |= 256, yl(l, t, a, u), t.child;
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
function cf(l, t, a) {
  return l = l !== null ? l.childLanes & ~a : 0, t && (l |= Ll), l;
}
function Vo(l, t, a) {
  var u = t.pendingProps, e = !1, n = (t.flags & 128) !== 0, f;
  if ((f = n) || (f = l !== null && l.memoizedState === null ? !1 : (cl.current & 2) !== 0), f && (e = !0, t.flags &= -129), f = (t.flags & 32) !== 0, t.flags &= -33, l === null) {
    if (j) {
      if (e ? Dt(t) : Ut(), j) {
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
            treeContext: ua !== null ? { id: ot, overflow: rt } : null,
            retryLane: 536870912,
            hydrationErrors: null
          }, i = xl(
            18,
            null,
            null,
            0
          ), i.stateNode = c, i.return = t, t.child = i, Tl = t, P = null, i = !0) : i = !1;
        }
        i || ia(t);
      }
      if (c = t.memoizedState, c !== null && (c = c.dehydrated, c !== null))
        return vc(c) ? t.lanes = 32 : t.lanes = 536870912, null;
      ht(t);
    }
    return c = u.children, u = u.fallback, e ? (Ut(), e = t.mode, c = en(
      { mode: "hidden", children: c },
      e
    ), u = aa(
      u,
      e,
      a,
      null
    ), c.return = t, u.return = t, c.sibling = u, t.child = c, e = t.child, e.memoizedState = ff(a), e.childLanes = cf(
      l,
      f,
      a
    ), t.memoizedState = nf, u) : (Dt(t), lc(t, c));
  }
  if (i = l.memoizedState, i !== null && (c = i.dehydrated, c !== null)) {
    if (n)
      t.flags & 256 ? (Dt(t), t.flags &= -257, t = sf(
        l,
        t,
        a
      )) : t.memoizedState !== null ? (Ut(), t.child = l.child, t.flags |= 128, t = null) : (Ut(), e = u.fallback, c = t.mode, u = en(
        { mode: "visible", children: u.children },
        c
      ), e = aa(
        e,
        c,
        a,
        null
      ), e.flags |= 2, u.return = t, e.return = t, u.sibling = e, t.child = u, $a(
        t,
        l.child,
        null,
        a
      ), u = t.child, u.memoizedState = ff(a), u.childLanes = cf(
        l,
        f,
        a
      ), t.memoizedState = nf, t = e);
    else if (Dt(t), vc(c)) {
      if (f = c.nextSibling && c.nextSibling.dataset, f) var o = f.dgst;
      f = o, u = Error(b(419)), u.stack = "", u.digest = f, Xu({ value: u, source: null, stack: null }), t = sf(
        l,
        t,
        a
      );
    } else if (rl || te(l, t, a, !1), f = (a & l.childLanes) !== 0, rl || f) {
      if (f = w, f !== null && (u = a & -a, u = u & 42 ? 1 : Mc(u), u = u & (f.suspendedLanes | a) ? 0 : u, u !== 0 && u !== i.retryLane))
        throw i.retryLane = u, uu(l, u), ql(f, l, u), Qo;
      c.data === "$?" || fc(), t = sf(
        l,
        t,
        a
      );
    } else
      c.data === "$?" ? (t.flags |= 192, t.child = l.child, t = null) : (l = i.treeContext, P = Wl(
        c.nextSibling
      ), Tl = t, j = !0, ea = null, Il = !1, l !== null && (Cl[Zl++] = ot, Cl[Zl++] = rt, Cl[Zl++] = ua, ot = l.id, rt = l.overflow, ua = t), t = lc(
        t,
        u.children
      ), t.flags |= 4096);
    return t;
  }
  return e ? (Ut(), e = u.fallback, c = t.mode, i = l.child, o = i.sibling, u = yt(i, {
    mode: "hidden",
    children: u.children
  }), u.subtreeFlags = i.subtreeFlags & 65011712, o !== null ? e = yt(o, e) : (e = aa(
    e,
    c,
    a,
    null
  ), e.flags |= 2), e.return = t, u.return = t, u.sibling = e, t.child = u, u = e, e = t.child, c = l.child.memoizedState, c === null ? c = ff(a) : (i = c.cachePool, i !== null ? (o = fl._currentValue, i = i.parent !== o ? { parent: o, pool: o } : i) : i = $d(), c = {
    baseLanes: c.baseLanes | a,
    cachePool: i
  }), e.memoizedState = c, e.childLanes = cf(
    l,
    f,
    a
  ), t.memoizedState = nf, u) : (Dt(t), a = l.child, l = a.sibling, a = yt(a, {
    mode: "visible",
    children: u.children
  }), a.return = t, a.sibling = null, l !== null && (f = t.deletions, f === null ? (t.deletions = [l], t.flags |= 16) : f.push(l)), t.child = a, t.memoizedState = null, a);
}
function lc(l, t) {
  return t = en(
    { mode: "visible", children: t },
    l.mode
  ), t.return = l, l.child = t;
}
function en(l, t) {
  return l = xl(22, l, null, t), l.lanes = 0, l.stateNode = {
    _visibility: 1,
    _pendingMarkers: null,
    _retryCache: null,
    _transitions: null
  }, l;
}
function sf(l, t, a) {
  return $a(t, l.child, null, a), l = lc(
    t,
    t.pendingProps.children
  ), l.flags |= 2, t.memoizedState = null, l;
}
function bs(l, t, a) {
  l.lanes |= t;
  var u = l.alternate;
  u !== null && (u.lanes |= t), Cf(l.return, t, a);
}
function df(l, t, a, u, e) {
  var n = l.memoizedState;
  n === null ? l.memoizedState = {
    isBackwards: t,
    rendering: null,
    renderingStartTime: 0,
    last: u,
    tail: a,
    tailMode: e
  } : (n.isBackwards = t, n.rendering = null, n.renderingStartTime = 0, n.last = u, n.tail = a, n.tailMode = e);
}
function Ko(l, t, a) {
  var u = t.pendingProps, e = u.revealOrder, n = u.tail;
  if (yl(l, t, u.children, a), u = cl.current, u & 2)
    u = u & 1 | 2, t.flags |= 128;
  else {
    if (l !== null && l.flags & 128)
      l: for (l = t.child; l !== null; ) {
        if (l.tag === 13)
          l.memoizedState !== null && bs(l, a, t);
        else if (l.tag === 19)
          bs(l, a, t);
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
    u &= 1;
  }
  switch (F(cl, u), e) {
    case "forwards":
      for (a = t.child, e = null; a !== null; )
        l = a.alternate, l !== null && tn(l) === null && (e = a), a = a.sibling;
      a = e, a === null ? (e = t.child, t.child = null) : (e = a.sibling, a.sibling = null), df(
        t,
        !1,
        e,
        a,
        n
      );
      break;
    case "backwards":
      for (a = null, e = t.child, t.child = null; e !== null; ) {
        if (l = e.alternate, l !== null && tn(l) === null) {
          t.child = e;
          break;
        }
        l = e.sibling, e.sibling = a, a = e, e = l;
      }
      df(
        t,
        !0,
        a,
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
function St(l, t, a) {
  if (l !== null && (t.dependencies = l.dependencies), Lt |= t.lanes, !(a & t.childLanes))
    if (l !== null) {
      if (te(
        l,
        t,
        a,
        !1
      ), (a & t.childLanes) === 0)
        return null;
    } else return null;
  if (l !== null && t.child !== l.child)
    throw Error(b(153));
  if (t.child !== null) {
    for (l = t.child, a = yt(l, l.pendingProps), t.child = a, a.return = t; l.sibling !== null; )
      l = l.sibling, a = a.sibling = yt(l, l.pendingProps), a.return = t;
    a.sibling = null;
  }
  return t.child;
}
function ui(l, t) {
  return l.lanes & t ? !0 : (l = l.dependencies, !!(l !== null && ke(l)));
}
function Zv(l, t, a) {
  switch (t.tag) {
    case 3:
      Ze(t, t.stateNode.containerInfo), Mt(t, fl, l.memoizedState.cache), le();
      break;
    case 27:
    case 5:
      Uf(t);
      break;
    case 4:
      Ze(t, t.stateNode.containerInfo);
      break;
    case 10:
      Mt(
        t,
        t.type,
        t.memoizedProps.value
      );
      break;
    case 13:
      var u = t.memoizedState;
      if (u !== null)
        return u.dehydrated !== null ? (Dt(t), t.flags |= 128, null) : a & t.child.childLanes ? Vo(l, t, a) : (Dt(t), l = St(
          l,
          t,
          a
        ), l !== null ? l.sibling : null);
      Dt(t);
      break;
    case 19:
      var e = (l.flags & 128) !== 0;
      if (u = (a & t.childLanes) !== 0, u || (te(
        l,
        t,
        a,
        !1
      ), u = (a & t.childLanes) !== 0), e) {
        if (u)
          return Ko(
            l,
            t,
            a
          );
        t.flags |= 128;
      }
      if (e = t.memoizedState, e !== null && (e.rendering = null, e.tail = null, e.lastEffect = null), F(cl, cl.current), u) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, Zo(l, t, a);
    case 24:
      Mt(t, fl, l.memoizedState.cache);
  }
  return St(l, t, a);
}
function Lo(l, t, a) {
  if (l !== null)
    if (l.memoizedProps !== t.pendingProps)
      rl = !0;
    else {
      if (!ui(l, a) && !(t.flags & 128))
        return rl = !1, Zv(
          l,
          t,
          a
        );
      rl = !!(l.flags & 131072);
    }
  else
    rl = !1, j && t.flags & 1048576 && Jd(t, We, t.index);
  switch (t.lanes = 0, t.tag) {
    case 16:
      l: {
        l = t.pendingProps;
        var u = t.elementType, e = u._init;
        if (u = e(u._payload), t.type = u, typeof u == "function")
          Xc(u) ? (l = oa(u, l), t.tag = 1, t = ms(
            null,
            t,
            u,
            l,
            a
          )) : (t.tag = 0, t = Pf(
            null,
            t,
            u,
            l,
            a
          ));
        else {
          if (u != null) {
            if (e = u.$$typeof, e === pc) {
              t.tag = 11, t = rs(
                null,
                t,
                u,
                l,
                a
              );
              break l;
            } else if (e === _c) {
              t.tag = 14, t = vs(
                null,
                t,
                u,
                l,
                a
              );
              break l;
            }
          }
          throw t = Mf(u) || u, Error(b(306, t, ""));
        }
      }
      return t;
    case 0:
      return Pf(
        l,
        t,
        t.type,
        t.pendingProps,
        a
      );
    case 1:
      return u = t.type, e = oa(
        u,
        t.pendingProps
      ), ms(
        l,
        t,
        u,
        e,
        a
      );
    case 3:
      l: {
        if (Ze(
          t,
          t.stateNode.containerInfo
        ), l === null) throw Error(b(387));
        u = t.pendingProps;
        var n = t.memoizedState;
        e = n.element, Lf(l, t), Mu(t, u, null, a);
        var f = t.memoizedState;
        if (u = f.cache, Mt(t, fl, u), u !== n.cache && Zf(
          t,
          [fl],
          a,
          !0
        ), Ou(), u = f.element, n.isDehydrated)
          if (n = {
            element: u,
            isDehydrated: !1,
            cache: f.cache
          }, t.updateQueue.baseState = n, t.memoizedState = n, t.flags & 256) {
            t = gs(
              l,
              t,
              u,
              a
            );
            break l;
          } else if (u !== e) {
            e = Kl(
              Error(b(424)),
              t
            ), Xu(e), t = gs(
              l,
              t,
              u,
              a
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
            for (P = Wl(l.firstChild), Tl = t, j = !0, ea = null, Il = !0, a = Ho(
              t,
              null,
              u,
              a
            ), t.child = a; a; )
              a.flags = a.flags & -3 | 4096, a = a.sibling;
          }
        else {
          if (le(), u === e) {
            t = St(
              l,
              t,
              a
            );
            break l;
          }
          yl(
            l,
            t,
            u,
            a
          );
        }
        t = t.child;
      }
      return t;
    case 26:
      return qe(l, t), l === null ? (a = Bs(
        t.type,
        null,
        t.pendingProps,
        null
      )) ? t.memoizedState = a : j || (a = t.type, l = t.pendingProps, u = rn(
        Bt.current
      ).createElement(a), u[Sl] = t, u[Ml] = l, gl(u, a, l), ol(u), t.stateNode = u) : t.memoizedState = Bs(
        t.type,
        l.memoizedProps,
        t.pendingProps,
        l.memoizedState
      ), null;
    case 27:
      return Uf(t), l === null && j && (u = t.stateNode = R0(
        t.type,
        t.pendingProps,
        Bt.current
      ), Tl = t, Il = !0, e = P, wt(t.type) ? (hc = e, P = Wl(
        u.firstChild
      )) : P = e), yl(
        l,
        t,
        t.pendingProps.children,
        a
      ), qe(l, t), l === null && (t.flags |= 4194304), t.child;
    case 5:
      return l === null && j && ((e = u = P) && (u = mh(
        u,
        t.type,
        t.pendingProps,
        Il
      ), u !== null ? (t.stateNode = u, Tl = t, P = Wl(
        u.firstChild
      ), Il = !1, e = !0) : e = !1), e || ia(t)), Uf(t), e = t.type, n = t.pendingProps, f = l !== null ? l.memoizedProps : null, u = n.children, oc(e, n) ? u = null : f !== null && oc(e, f) && (t.flags |= 32), t.memoizedState !== null && (e = Jc(
        l,
        t,
        Yv,
        null,
        null,
        a
      ), Ku._currentValue = e), qe(l, t), yl(l, t, u, a), t.child;
    case 6:
      return l === null && j && ((l = a = P) && (a = gh(
        a,
        t.pendingProps,
        Il
      ), a !== null ? (t.stateNode = a, Tl = t, P = null, l = !0) : l = !1), l || ia(t)), null;
    case 13:
      return Vo(l, t, a);
    case 4:
      return Ze(
        t,
        t.stateNode.containerInfo
      ), u = t.pendingProps, l === null ? t.child = $a(
        t,
        null,
        u,
        a
      ) : yl(
        l,
        t,
        u,
        a
      ), t.child;
    case 11:
      return rs(
        l,
        t,
        t.type,
        t.pendingProps,
        a
      );
    case 7:
      return yl(
        l,
        t,
        t.pendingProps,
        a
      ), t.child;
    case 8:
      return yl(
        l,
        t,
        t.pendingProps.children,
        a
      ), t.child;
    case 12:
      return yl(
        l,
        t,
        t.pendingProps.children,
        a
      ), t.child;
    case 10:
      return u = t.pendingProps, Mt(t, t.type, u.value), yl(
        l,
        t,
        u.children,
        a
      ), t.child;
    case 9:
      return e = t.type._context, u = t.pendingProps.children, sa(t), e = El(e), u = u(e), t.flags |= 1, yl(l, t, u, a), t.child;
    case 14:
      return vs(
        l,
        t,
        t.type,
        t.pendingProps,
        a
      );
    case 15:
      return Co(
        l,
        t,
        t.type,
        t.pendingProps,
        a
      );
    case 19:
      return Ko(l, t, a);
    case 31:
      return u = t.pendingProps, a = t.mode, u = {
        mode: u.mode,
        children: u.children
      }, l === null ? (a = en(
        u,
        a
      ), a.ref = t.ref, t.child = a, a.return = t, t = a) : (a = yt(l.child, u), a.ref = t.ref, t.child = a, a.return = t, t = a), t;
    case 22:
      return Zo(l, t, a);
    case 24:
      return sa(t), u = El(fl), l === null ? (e = Zc(), e === null && (e = w, n = Cc(), e.pooledCache = n, n.refCount++, n !== null && (e.pooledCacheLanes |= a), e = n), t.memoizedState = {
        parent: u,
        cache: e
      }, Vc(t), Mt(t, fl, e)) : (l.lanes & a && (Lf(l, t), Mu(t, null, null, a), Ou()), e = l.memoizedState, n = t.memoizedState, e.parent !== u ? (e = { parent: u, cache: u }, t.memoizedState = e, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = e), Mt(t, fl, u)) : (u = n.cache, Mt(t, fl, u), u !== e.cache && Zf(
        t,
        [fl],
        a,
        !0
      ))), yl(
        l,
        t,
        t.pendingProps.children,
        a
      ), t.child;
    case 29:
      throw t.pendingProps;
  }
  throw Error(b(156, t.tag));
}
function ct(l) {
  l.flags |= 4;
}
function Ss(l, t) {
  if (t.type !== "stylesheet" || t.state.loading & 4)
    l.flags &= -16777217;
  else if (l.flags |= 16777216, !Y0(t)) {
    if (t = Jl.current, t !== null && ((G & 4194048) === G ? at !== null : (G & 62914560) !== G && !(G & 536870912) || t !== at))
      throw pu = Kf, Wd;
    l.flags |= 8192;
  }
}
function ze(l, t) {
  t !== null && (l.flags |= 4), l.flags & 16384 && (t = l.tag !== 22 ? md() : 536870912, l.lanes |= t, Wa |= t);
}
function ru(l, t) {
  if (!j)
    switch (l.tailMode) {
      case "hidden":
        t = l.tail;
        for (var a = null; t !== null; )
          t.alternate !== null && (a = t), t = t.sibling;
        a === null ? l.tail = null : a.sibling = null;
        break;
      case "collapsed":
        a = l.tail;
        for (var u = null; a !== null; )
          a.alternate !== null && (u = a), a = a.sibling;
        u === null ? t || l.tail === null ? l.tail = null : l.tail.sibling = null : u.sibling = null;
    }
}
function I(l) {
  var t = l.alternate !== null && l.alternate.child === l.child, a = 0, u = 0;
  if (t)
    for (var e = l.child; e !== null; )
      a |= e.lanes | e.childLanes, u |= e.subtreeFlags & 65011712, u |= e.flags & 65011712, e.return = l, e = e.sibling;
  else
    for (e = l.child; e !== null; )
      a |= e.lanes | e.childLanes, u |= e.subtreeFlags, u |= e.flags, e.return = l, e = e.sibling;
  return l.subtreeFlags |= u, l.childLanes = a, t;
}
function Vv(l, t, a) {
  var u = t.pendingProps;
  switch (Qc(t), t.tag) {
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
      return a = t.stateNode, u = null, l !== null && (u = l.memoizedState.cache), t.memoizedState.cache !== u && (t.flags |= 2048), mt(fl), Za(), a.pendingContext && (a.context = a.pendingContext, a.pendingContext = null), (l === null || l.child === null) && (du(t) ? ct(t) : l === null || l.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Wi())), I(t), null;
    case 26:
      return a = t.memoizedState, l === null ? (ct(t), a !== null ? (I(t), Ss(t, a)) : (I(t), t.flags &= -16777217)) : a ? a !== l.memoizedState ? (ct(t), I(t), Ss(t, a)) : (I(t), t.flags &= -16777217) : (l.memoizedProps !== u && ct(t), I(t), t.flags &= -16777217), null;
    case 27:
      Ve(t), a = Bt.current;
      var e = t.type;
      if (l !== null && t.stateNode != null)
        l.memoizedProps !== u && ct(t);
      else {
        if (!u) {
          if (t.stateNode === null)
            throw Error(b(166));
          return I(t), null;
        }
        l = lt.current, du(t) ? wi(t) : (l = R0(e, u, a), t.stateNode = l, ct(t));
      }
      return I(t), null;
    case 5:
      if (Ve(t), a = t.type, l !== null && t.stateNode != null)
        l.memoizedProps !== u && ct(t);
      else {
        if (!u) {
          if (t.stateNode === null)
            throw Error(b(166));
          return I(t), null;
        }
        if (l = lt.current, du(t))
          wi(t);
        else {
          switch (e = rn(
            Bt.current
          ), l) {
            case 1:
              l = e.createElementNS(
                "http://www.w3.org/2000/svg",
                a
              );
              break;
            case 2:
              l = e.createElementNS(
                "http://www.w3.org/1998/Math/MathML",
                a
              );
              break;
            default:
              switch (a) {
                case "svg":
                  l = e.createElementNS(
                    "http://www.w3.org/2000/svg",
                    a
                  );
                  break;
                case "math":
                  l = e.createElementNS(
                    "http://www.w3.org/1998/Math/MathML",
                    a
                  );
                  break;
                case "script":
                  l = e.createElement("div"), l.innerHTML = "<script><\/script>", l = l.removeChild(l.firstChild);
                  break;
                case "select":
                  l = typeof u.is == "string" ? e.createElement("select", { is: u.is }) : e.createElement("select"), u.multiple ? l.multiple = !0 : u.size && (l.size = u.size);
                  break;
                default:
                  l = typeof u.is == "string" ? e.createElement(a, { is: u.is }) : e.createElement(a);
              }
          }
          l[Sl] = t, l[Ml] = u;
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
          l: switch (gl(l, a, u), a) {
            case "button":
            case "input":
            case "select":
            case "textarea":
              l = !!u.autoFocus;
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
        l.memoizedProps !== u && ct(t);
      else {
        if (typeof u != "string" && t.stateNode === null)
          throw Error(b(166));
        if (l = Bt.current, du(t)) {
          if (l = t.stateNode, a = t.memoizedProps, u = null, e = Tl, e !== null)
            switch (e.tag) {
              case 27:
              case 5:
                u = e.memoizedProps;
            }
          l[Sl] = t, l = !!(l.nodeValue === a || u !== null && u.suppressHydrationWarning === !0 || D0(l.nodeValue, a)), l || ia(t);
        } else
          l = rn(l).createTextNode(
            u
          ), l[Sl] = t, t.stateNode = l;
      }
      return I(t), null;
    case 13:
      if (u = t.memoizedState, l === null || l.memoizedState !== null && l.memoizedState.dehydrated !== null) {
        if (e = du(t), u !== null && u.dehydrated !== null) {
          if (l === null) {
            if (!e) throw Error(b(318));
            if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(b(317));
            e[Sl] = t;
          } else
            le(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          I(t), e = !1;
        } else
          e = Wi(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = e), e = !0;
        if (!e)
          return t.flags & 256 ? (ht(t), t) : (ht(t), null);
      }
      if (ht(t), t.flags & 128)
        return t.lanes = a, t;
      if (a = u !== null, l = l !== null && l.memoizedState !== null, a) {
        u = t.child, e = null, u.alternate !== null && u.alternate.memoizedState !== null && u.alternate.memoizedState.cachePool !== null && (e = u.alternate.memoizedState.cachePool.pool);
        var n = null;
        u.memoizedState !== null && u.memoizedState.cachePool !== null && (n = u.memoizedState.cachePool.pool), n !== e && (u.flags |= 2048);
      }
      return a !== l && a && (t.child.flags |= 8192), ze(t, t.updateQueue), I(t), null;
    case 4:
      return Za(), l === null && oi(t.stateNode.containerInfo), I(t), null;
    case 10:
      return mt(t.type), I(t), null;
    case 19:
      if (vl(cl), e = t.memoizedState, e === null) return I(t), null;
      if (u = (t.flags & 128) !== 0, n = e.rendering, n === null)
        if (u) ru(e, !1);
        else {
          if (ll !== 0 || l !== null && l.flags & 128)
            for (l = t.child; l !== null; ) {
              if (n = tn(l), n !== null) {
                for (t.flags |= 128, ru(e, !1), l = n.updateQueue, t.updateQueue = l, ze(t, l), t.subtreeFlags = 0, l = a, a = t.child; a !== null; )
                  Ld(a, l), a = a.sibling;
                return F(
                  cl,
                  cl.current & 1 | 2
                ), t.child;
              }
              l = l.sibling;
            }
          e.tail !== null && tt() > fn && (t.flags |= 128, u = !0, ru(e, !1), t.lanes = 4194304);
        }
      else {
        if (!u)
          if (l = tn(n), l !== null) {
            if (t.flags |= 128, u = !0, l = l.updateQueue, t.updateQueue = l, ze(t, l), ru(e, !0), e.tail === null && e.tailMode === "hidden" && !n.alternate && !j)
              return I(t), null;
          } else
            2 * tt() - e.renderingStartTime > fn && a !== 536870912 && (t.flags |= 128, u = !0, ru(e, !1), t.lanes = 4194304);
        e.isBackwards ? (n.sibling = t.child, t.child = n) : (l = e.last, l !== null ? l.sibling = n : t.child = n, e.last = n);
      }
      return e.tail !== null ? (t = e.tail, e.rendering = t, e.tail = t.sibling, e.renderingStartTime = tt(), t.sibling = null, l = cl.current, F(cl, u ? l & 1 | 2 : l & 1), t) : (I(t), null);
    case 22:
    case 23:
      return ht(t), Kc(), u = t.memoizedState !== null, l !== null ? l.memoizedState !== null !== u && (t.flags |= 8192) : u && (t.flags |= 8192), u ? a & 536870912 && !(t.flags & 128) && (I(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : I(t), a = t.updateQueue, a !== null && ze(t, a.retryQueue), a = null, l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (a = l.memoizedState.cachePool.pool), u = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (u = t.memoizedState.cachePool.pool), u !== a && (t.flags |= 2048), l !== null && vl(na), null;
    case 24:
      return a = null, l !== null && (a = l.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), mt(fl), I(t), null;
    case 25:
      return null;
    case 30:
      return null;
  }
  throw Error(b(156, t.tag));
}
function Kv(l, t) {
  switch (Qc(t), t.tag) {
    case 1:
      return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
    case 3:
      return mt(fl), Za(), l = t.flags, l & 65536 && !(l & 128) ? (t.flags = l & -65537 | 128, t) : null;
    case 26:
    case 27:
    case 5:
      return Ve(t), null;
    case 13:
      if (ht(t), l = t.memoizedState, l !== null && l.dehydrated !== null) {
        if (t.alternate === null)
          throw Error(b(340));
        le();
      }
      return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
    case 19:
      return vl(cl), null;
    case 4:
      return Za(), null;
    case 10:
      return mt(t.type), null;
    case 22:
    case 23:
      return ht(t), Kc(), l !== null && vl(na), l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
    case 24:
      return mt(fl), null;
    case 25:
      return null;
    default:
      return null;
  }
}
function Jo(l, t) {
  switch (Qc(t), t.tag) {
    case 3:
      mt(fl), Za();
      break;
    case 26:
    case 27:
    case 5:
      Ve(t);
      break;
    case 4:
      Za();
      break;
    case 13:
      ht(t);
      break;
    case 19:
      vl(cl);
      break;
    case 10:
      mt(t.type);
      break;
    case 22:
    case 23:
      ht(t), Kc(), l !== null && vl(na);
      break;
    case 24:
      mt(fl);
  }
}
function fe(l, t) {
  try {
    var a = t.updateQueue, u = a !== null ? a.lastEffect : null;
    if (u !== null) {
      var e = u.next;
      a = e;
      do {
        if ((a.tag & l) === l) {
          u = void 0;
          var n = a.create, f = a.inst;
          u = n(), f.destroy = u;
        }
        a = a.next;
      } while (a !== e);
    }
  } catch (c) {
    L(t, t.return, c);
  }
}
function Kt(l, t, a) {
  try {
    var u = t.updateQueue, e = u !== null ? u.lastEffect : null;
    if (e !== null) {
      var n = e.next;
      u = n;
      do {
        if ((u.tag & l) === l) {
          var f = u.inst, c = f.destroy;
          if (c !== void 0) {
            f.destroy = void 0, e = t;
            var i = a, o = c;
            try {
              o();
            } catch (m) {
              L(
                e,
                i,
                m
              );
            }
          }
        }
        u = u.next;
      } while (u !== n);
    }
  } catch (m) {
    L(t, t.return, m);
  }
}
function wo(l) {
  var t = l.updateQueue;
  if (t !== null) {
    var a = l.stateNode;
    try {
      Id(t, a);
    } catch (u) {
      L(l, l.return, u);
    }
  }
}
function $o(l, t, a) {
  a.props = oa(
    l.type,
    l.memoizedProps
  ), a.state = l.memoizedState;
  try {
    a.componentWillUnmount();
  } catch (u) {
    L(l, t, u);
  }
}
function Uu(l, t) {
  try {
    var a = l.ref;
    if (a !== null) {
      switch (l.tag) {
        case 26:
        case 27:
        case 5:
          var u = l.stateNode;
          break;
        case 30:
          u = l.stateNode;
          break;
        default:
          u = l.stateNode;
      }
      typeof a == "function" ? l.refCleanup = a(u) : a.current = u;
    }
  } catch (e) {
    L(l, t, e);
  }
}
function Pl(l, t) {
  var a = l.ref, u = l.refCleanup;
  if (a !== null)
    if (typeof u == "function")
      try {
        u();
      } catch (e) {
        L(l, t, e);
      } finally {
        l.refCleanup = null, l = l.alternate, l != null && (l.refCleanup = null);
      }
    else if (typeof a == "function")
      try {
        a(null);
      } catch (e) {
        L(l, t, e);
      }
    else a.current = null;
}
function Wo(l) {
  var t = l.type, a = l.memoizedProps, u = l.stateNode;
  try {
    l: switch (t) {
      case "button":
      case "input":
      case "select":
      case "textarea":
        a.autoFocus && u.focus();
        break l;
      case "img":
        a.src ? u.src = a.src : a.srcSet && (u.srcset = a.srcSet);
    }
  } catch (e) {
    L(l, l.return, e);
  }
}
function of(l, t, a) {
  try {
    var u = l.stateNode;
    oh(u, l.type, a, t), u[Ml] = t;
  } catch (e) {
    L(l, l.return, e);
  }
}
function ko(l) {
  return l.tag === 5 || l.tag === 3 || l.tag === 26 || l.tag === 27 && wt(l.type) || l.tag === 4;
}
function rf(l) {
  l: for (; ; ) {
    for (; l.sibling === null; ) {
      if (l.return === null || ko(l.return)) return null;
      l = l.return;
    }
    for (l.sibling.return = l.return, l = l.sibling; l.tag !== 5 && l.tag !== 6 && l.tag !== 18; ) {
      if (l.tag === 27 && wt(l.type) || l.flags & 2 || l.child === null || l.tag === 4) continue l;
      l.child.return = l, l = l.child;
    }
    if (!(l.flags & 2)) return l.stateNode;
  }
}
function tc(l, t, a) {
  var u = l.tag;
  if (u === 5 || u === 6)
    l = l.stateNode, t ? (a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a).insertBefore(l, t) : (t = a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a, t.appendChild(l), a = a._reactRootContainer, a != null || t.onclick !== null || (t.onclick = Bn));
  else if (u !== 4 && (u === 27 && wt(l.type) && (a = l.stateNode, t = null), l = l.child, l !== null))
    for (tc(l, t, a), l = l.sibling; l !== null; )
      tc(l, t, a), l = l.sibling;
}
function nn(l, t, a) {
  var u = l.tag;
  if (u === 5 || u === 6)
    l = l.stateNode, t ? a.insertBefore(l, t) : a.appendChild(l);
  else if (u !== 4 && (u === 27 && wt(l.type) && (a = l.stateNode), l = l.child, l !== null))
    for (nn(l, t, a), l = l.sibling; l !== null; )
      nn(l, t, a), l = l.sibling;
}
function Fo(l) {
  var t = l.stateNode, a = l.memoizedProps;
  try {
    for (var u = l.type, e = t.attributes; e.length; )
      t.removeAttributeNode(e[0]);
    gl(t, u, a), t[Sl] = l, t[Ml] = a;
  } catch (n) {
    L(l, l.return, n);
  }
}
var st = !1, ul = !1, vf = !1, Es = typeof WeakSet == "function" ? WeakSet : Set, dl = null;
function Lv(l, t) {
  if (l = l.containerInfo, sc = mn, l = Gd(l), Bc(l)) {
    if ("selectionStart" in l)
      var a = {
        start: l.selectionStart,
        end: l.selectionEnd
      };
    else
      l: {
        a = (a = l.ownerDocument) && a.defaultView || window;
        var u = a.getSelection && a.getSelection();
        if (u && u.rangeCount !== 0) {
          a = u.anchorNode;
          var e = u.anchorOffset, n = u.focusNode;
          u = u.focusOffset;
          try {
            a.nodeType, n.nodeType;
          } catch {
            a = null;
            break l;
          }
          var f = 0, c = -1, i = -1, o = 0, m = 0, y = l, r = null;
          t: for (; ; ) {
            for (var h; y !== a || e !== 0 && y.nodeType !== 3 || (c = f + e), y !== n || u !== 0 && y.nodeType !== 3 || (i = f + u), y.nodeType === 3 && (f += y.nodeValue.length), (h = y.firstChild) !== null; )
              r = y, y = h;
            for (; ; ) {
              if (y === l) break t;
              if (r === a && ++o === e && (c = f), r === n && ++m === u && (i = f), (h = y.nextSibling) !== null) break;
              y = r, r = y.parentNode;
            }
            y = h;
          }
          a = c === -1 || i === -1 ? null : { start: c, end: i };
        } else a = null;
      }
    a = a || { start: 0, end: 0 };
  } else a = null;
  for (dc = { focusedElem: l, selectionRange: a }, mn = !1, dl = t; dl !== null; )
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
              l = void 0, a = t, e = n.memoizedProps, n = n.memoizedState, u = a.stateNode;
              try {
                var _ = oa(
                  a.type,
                  e,
                  a.elementType === a.type
                );
                l = u.getSnapshotBeforeUpdate(
                  _,
                  n
                ), u.__reactInternalSnapshotBeforeUpdate = l;
              } catch (p) {
                L(
                  a,
                  a.return,
                  p
                );
              }
            }
            break;
          case 3:
            if (l & 1024) {
              if (l = t.stateNode.containerInfo, a = l.nodeType, a === 9)
                rc(l);
              else if (a === 1)
                switch (l.nodeName) {
                  case "HEAD":
                  case "HTML":
                  case "BODY":
                    rc(l);
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
            if (l & 1024) throw Error(b(163));
        }
        if (l = t.sibling, l !== null) {
          l.return = t.return, dl = l;
          break;
        }
        dl = t.return;
      }
}
function Io(l, t, a) {
  var u = a.flags;
  switch (a.tag) {
    case 0:
    case 11:
    case 15:
      zt(l, a), u & 4 && fe(5, a);
      break;
    case 1:
      if (zt(l, a), u & 4)
        if (l = a.stateNode, t === null)
          try {
            l.componentDidMount();
          } catch (f) {
            L(a, a.return, f);
          }
        else {
          var e = oa(
            a.type,
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
            L(
              a,
              a.return,
              f
            );
          }
        }
      u & 64 && wo(a), u & 512 && Uu(a, a.return);
      break;
    case 3:
      if (zt(l, a), u & 64 && (l = a.updateQueue, l !== null)) {
        if (t = null, a.child !== null)
          switch (a.child.tag) {
            case 27:
            case 5:
              t = a.child.stateNode;
              break;
            case 1:
              t = a.child.stateNode;
          }
        try {
          Id(l, t);
        } catch (f) {
          L(a, a.return, f);
        }
      }
      break;
    case 27:
      t === null && u & 4 && Fo(a);
    case 26:
    case 5:
      zt(l, a), t === null && u & 4 && Wo(a), u & 512 && Uu(a, a.return);
      break;
    case 12:
      zt(l, a);
      break;
    case 13:
      zt(l, a), u & 4 && t0(l, a), u & 64 && (l = a.memoizedState, l !== null && (l = l.dehydrated, l !== null && (a = lh.bind(
        null,
        a
      ), bh(l, a))));
      break;
    case 22:
      if (u = a.memoizedState !== null || st, !u) {
        t = t !== null && t.memoizedState !== null || ul, e = st;
        var n = ul;
        st = u, (ul = t) && !n ? pt(
          l,
          a,
          (a.subtreeFlags & 8772) !== 0
        ) : zt(l, a), st = e, ul = n;
      }
      break;
    case 30:
      break;
    default:
      zt(l, a);
  }
}
function Po(l) {
  var t = l.alternate;
  t !== null && (l.alternate = null, Po(t)), l.child = null, l.deletions = null, l.sibling = null, l.tag === 5 && (t = l.stateNode, t !== null && Uc(t)), l.stateNode = null, l.return = null, l.dependencies = null, l.memoizedProps = null, l.memoizedState = null, l.pendingProps = null, l.stateNode = null, l.updateQueue = null;
}
var W = null, _l = !1;
function it(l, t, a) {
  for (a = a.child; a !== null; )
    l0(l, t, a), a = a.sibling;
}
function l0(l, t, a) {
  if (Hl && typeof Hl.onCommitFiberUnmount == "function")
    try {
      Hl.onCommitFiberUnmount(Wu, a);
    } catch {
    }
  switch (a.tag) {
    case 26:
      ul || Pl(a, t), it(
        l,
        t,
        a
      ), a.memoizedState ? a.memoizedState.count-- : a.stateNode && (a = a.stateNode, a.parentNode.removeChild(a));
      break;
    case 27:
      ul || Pl(a, t);
      var u = W, e = _l;
      wt(a.type) && (W = a.stateNode, _l = !1), it(
        l,
        t,
        a
      ), Hu(a.stateNode), W = u, _l = e;
      break;
    case 5:
      ul || Pl(a, t);
    case 6:
      if (u = W, e = _l, W = null, it(
        l,
        t,
        a
      ), W = u, _l = e, W !== null)
        if (_l)
          try {
            (W.nodeType === 9 ? W.body : W.nodeName === "HTML" ? W.ownerDocument.body : W).removeChild(a.stateNode);
          } catch (n) {
            L(
              a,
              t,
              n
            );
          }
        else
          try {
            W.removeChild(a.stateNode);
          } catch (n) {
            L(
              a,
              t,
              n
            );
          }
      break;
    case 18:
      W !== null && (_l ? (l = W, xs(
        l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l,
        a.stateNode
      ), wu(l)) : xs(W, a.stateNode));
      break;
    case 4:
      u = W, e = _l, W = a.stateNode.containerInfo, _l = !0, it(
        l,
        t,
        a
      ), W = u, _l = e;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      ul || Kt(2, a, t), ul || Kt(4, a, t), it(
        l,
        t,
        a
      );
      break;
    case 1:
      ul || (Pl(a, t), u = a.stateNode, typeof u.componentWillUnmount == "function" && $o(
        a,
        t,
        u
      )), it(
        l,
        t,
        a
      );
      break;
    case 21:
      it(
        l,
        t,
        a
      );
      break;
    case 22:
      ul = (u = ul) || a.memoizedState !== null, it(
        l,
        t,
        a
      ), ul = u;
      break;
    default:
      it(
        l,
        t,
        a
      );
  }
}
function t0(l, t) {
  if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null && (l = l.dehydrated, l !== null))))
    try {
      wu(l);
    } catch (a) {
      L(t, t.return, a);
    }
}
function Jv(l) {
  switch (l.tag) {
    case 13:
    case 19:
      var t = l.stateNode;
      return t === null && (t = l.stateNode = new Es()), t;
    case 22:
      return l = l.stateNode, t = l._retryCache, t === null && (t = l._retryCache = new Es()), t;
    default:
      throw Error(b(435, l.tag));
  }
}
function hf(l, t) {
  var a = Jv(l);
  t.forEach(function(u) {
    var e = th.bind(null, l, u);
    a.has(u) || (a.add(u), u.then(e, e));
  });
}
function Ul(l, t) {
  var a = t.deletions;
  if (a !== null)
    for (var u = 0; u < a.length; u++) {
      var e = a[u], n = l, f = t, c = f;
      l: for (; c !== null; ) {
        switch (c.tag) {
          case 27:
            if (wt(c.type)) {
              W = c.stateNode, _l = !1;
              break l;
            }
            break;
          case 5:
            W = c.stateNode, _l = !1;
            break l;
          case 3:
          case 4:
            W = c.stateNode.containerInfo, _l = !0;
            break l;
        }
        c = c.return;
      }
      if (W === null) throw Error(b(160));
      l0(n, f, e), W = null, _l = !1, n = e.alternate, n !== null && (n.return = null), e.return = null;
    }
  if (t.subtreeFlags & 13878)
    for (t = t.child; t !== null; )
      a0(t, l), t = t.sibling;
}
var $l = null;
function a0(l, t) {
  var a = l.alternate, u = l.flags;
  switch (l.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      Ul(t, l), Nl(l), u & 4 && (Kt(3, l, l.return), fe(3, l), Kt(5, l, l.return));
      break;
    case 1:
      Ul(t, l), Nl(l), u & 512 && (ul || a === null || Pl(a, a.return)), u & 64 && st && (l = l.updateQueue, l !== null && (u = l.callbacks, u !== null && (a = l.shared.hiddenCallbacks, l.shared.hiddenCallbacks = a === null ? u : a.concat(u))));
      break;
    case 26:
      var e = $l;
      if (Ul(t, l), Nl(l), u & 512 && (ul || a === null || Pl(a, a.return)), u & 4) {
        var n = a !== null ? a.memoizedState : null;
        if (u = l.memoizedState, a === null)
          if (u === null)
            if (l.stateNode === null) {
              l: {
                u = l.type, a = l.memoizedProps, e = e.ownerDocument || e;
                t: switch (u) {
                  case "title":
                    n = e.getElementsByTagName("title")[0], (!n || n[Iu] || n[Sl] || n.namespaceURI === "http://www.w3.org/2000/svg" || n.hasAttribute("itemprop")) && (n = e.createElement(u), e.head.insertBefore(
                      n,
                      e.querySelector("head > title")
                    )), gl(n, u, a), n[Sl] = l, ol(n), u = n;
                    break l;
                  case "link":
                    var f = Gs(
                      "link",
                      "href",
                      e
                    ).get(u + (a.href || ""));
                    if (f) {
                      for (var c = 0; c < f.length; c++)
                        if (n = f[c], n.getAttribute("href") === (a.href == null || a.href === "" ? null : a.href) && n.getAttribute("rel") === (a.rel == null ? null : a.rel) && n.getAttribute("title") === (a.title == null ? null : a.title) && n.getAttribute("crossorigin") === (a.crossOrigin == null ? null : a.crossOrigin)) {
                          f.splice(c, 1);
                          break t;
                        }
                    }
                    n = e.createElement(u), gl(n, u, a), e.head.appendChild(n);
                    break;
                  case "meta":
                    if (f = Gs(
                      "meta",
                      "content",
                      e
                    ).get(u + (a.content || ""))) {
                      for (c = 0; c < f.length; c++)
                        if (n = f[c], n.getAttribute("content") === (a.content == null ? null : "" + a.content) && n.getAttribute("name") === (a.name == null ? null : a.name) && n.getAttribute("property") === (a.property == null ? null : a.property) && n.getAttribute("http-equiv") === (a.httpEquiv == null ? null : a.httpEquiv) && n.getAttribute("charset") === (a.charSet == null ? null : a.charSet)) {
                          f.splice(c, 1);
                          break t;
                        }
                    }
                    n = e.createElement(u), gl(n, u, a), e.head.appendChild(n);
                    break;
                  default:
                    throw Error(b(468, u));
                }
                n[Sl] = l, ol(n), u = n;
              }
              l.stateNode = u;
            } else
              Xs(
                e,
                l.type,
                l.stateNode
              );
          else
            l.stateNode = qs(
              e,
              u,
              l.memoizedProps
            );
        else
          n !== u ? (n === null ? a.stateNode !== null && (a = a.stateNode, a.parentNode.removeChild(a)) : n.count--, u === null ? Xs(
            e,
            l.type,
            l.stateNode
          ) : qs(
            e,
            u,
            l.memoizedProps
          )) : u === null && l.stateNode !== null && of(
            l,
            l.memoizedProps,
            a.memoizedProps
          );
      }
      break;
    case 27:
      Ul(t, l), Nl(l), u & 512 && (ul || a === null || Pl(a, a.return)), a !== null && u & 4 && of(
        l,
        l.memoizedProps,
        a.memoizedProps
      );
      break;
    case 5:
      if (Ul(t, l), Nl(l), u & 512 && (ul || a === null || Pl(a, a.return)), l.flags & 32) {
        e = l.stateNode;
        try {
          Ka(e, "");
        } catch (h) {
          L(l, l.return, h);
        }
      }
      u & 4 && l.stateNode != null && (e = l.memoizedProps, of(
        l,
        e,
        a !== null ? a.memoizedProps : e
      )), u & 1024 && (vf = !0);
      break;
    case 6:
      if (Ul(t, l), Nl(l), u & 4) {
        if (l.stateNode === null)
          throw Error(b(162));
        u = l.memoizedProps, a = l.stateNode;
        try {
          a.nodeValue = u;
        } catch (h) {
          L(l, l.return, h);
        }
      }
      break;
    case 3:
      if (je = null, e = $l, $l = vn(t.containerInfo), Ul(t, l), $l = e, Nl(l), u & 4 && a !== null && a.memoizedState.isDehydrated)
        try {
          wu(t.containerInfo);
        } catch (h) {
          L(l, l.return, h);
        }
      vf && (vf = !1, u0(l));
      break;
    case 4:
      u = $l, $l = vn(
        l.stateNode.containerInfo
      ), Ul(t, l), Nl(l), $l = u;
      break;
    case 12:
      Ul(t, l), Nl(l);
      break;
    case 13:
      Ul(t, l), Nl(l), l.child.flags & 8192 && l.memoizedState !== null != (a !== null && a.memoizedState !== null) && (ii = tt()), u & 4 && (u = l.updateQueue, u !== null && (l.updateQueue = null, hf(l, u)));
      break;
    case 22:
      e = l.memoizedState !== null;
      var i = a !== null && a.memoizedState !== null, o = st, m = ul;
      if (st = o || e, ul = m || i, Ul(t, l), ul = m, st = o, Nl(l), u & 8192)
        l: for (t = l.stateNode, t._visibility = e ? t._visibility & -2 : t._visibility | 1, e && (a === null || i || st || ul || la(l)), a = null, t = l; ; ) {
          if (t.tag === 5 || t.tag === 26) {
            if (a === null) {
              i = a = t;
              try {
                if (n = i.stateNode, e)
                  f = n.style, typeof f.setProperty == "function" ? f.setProperty("display", "none", "important") : f.display = "none";
                else {
                  c = i.stateNode;
                  var y = i.memoizedProps.style, r = y != null && y.hasOwnProperty("display") ? y.display : null;
                  c.style.display = r == null || typeof r == "boolean" ? "" : ("" + r).trim();
                }
              } catch (h) {
                L(i, i.return, h);
              }
            }
          } else if (t.tag === 6) {
            if (a === null) {
              i = t;
              try {
                i.stateNode.nodeValue = e ? "" : i.memoizedProps;
              } catch (h) {
                L(i, i.return, h);
              }
            }
          } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === l) && t.child !== null) {
            t.child.return = t, t = t.child;
            continue;
          }
          if (t === l) break l;
          for (; t.sibling === null; ) {
            if (t.return === null || t.return === l) break l;
            a === t && (a = null), t = t.return;
          }
          a === t && (a = null), t.sibling.return = t.return, t = t.sibling;
        }
      u & 4 && (u = l.updateQueue, u !== null && (a = u.retryQueue, a !== null && (u.retryQueue = null, hf(l, a))));
      break;
    case 19:
      Ul(t, l), Nl(l), u & 4 && (u = l.updateQueue, u !== null && (l.updateQueue = null, hf(l, u)));
      break;
    case 30:
      break;
    case 21:
      break;
    default:
      Ul(t, l), Nl(l);
  }
}
function Nl(l) {
  var t = l.flags;
  if (t & 2) {
    try {
      for (var a, u = l.return; u !== null; ) {
        if (ko(u)) {
          a = u;
          break;
        }
        u = u.return;
      }
      if (a == null) throw Error(b(160));
      switch (a.tag) {
        case 27:
          var e = a.stateNode, n = rf(l);
          nn(l, n, e);
          break;
        case 5:
          var f = a.stateNode;
          a.flags & 32 && (Ka(f, ""), a.flags &= -33);
          var c = rf(l);
          nn(l, c, f);
          break;
        case 3:
        case 4:
          var i = a.stateNode.containerInfo, o = rf(l);
          tc(
            l,
            o,
            i
          );
          break;
        default:
          throw Error(b(161));
      }
    } catch (m) {
      L(l, l.return, m);
    }
    l.flags &= -3;
  }
  t & 4096 && (l.flags &= -4097);
}
function u0(l) {
  if (l.subtreeFlags & 1024)
    for (l = l.child; l !== null; ) {
      var t = l;
      u0(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), l = l.sibling;
    }
}
function zt(l, t) {
  if (t.subtreeFlags & 8772)
    for (t = t.child; t !== null; )
      Io(l, t.alternate, t), t = t.sibling;
}
function la(l) {
  for (l = l.child; l !== null; ) {
    var t = l;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Kt(4, t, t.return), la(t);
        break;
      case 1:
        Pl(t, t.return);
        var a = t.stateNode;
        typeof a.componentWillUnmount == "function" && $o(
          t,
          t.return,
          a
        ), la(t);
        break;
      case 27:
        Hu(t.stateNode);
      case 26:
      case 5:
        Pl(t, t.return), la(t);
        break;
      case 22:
        t.memoizedState === null && la(t);
        break;
      case 30:
        la(t);
        break;
      default:
        la(t);
    }
    l = l.sibling;
  }
}
function pt(l, t, a) {
  for (a = a && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
    var u = t.alternate, e = l, n = t, f = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        pt(
          e,
          n,
          a
        ), fe(4, n);
        break;
      case 1:
        if (pt(
          e,
          n,
          a
        ), u = n, e = u.stateNode, typeof e.componentDidMount == "function")
          try {
            e.componentDidMount();
          } catch (o) {
            L(u, u.return, o);
          }
        if (u = n, e = u.updateQueue, e !== null) {
          var c = u.stateNode;
          try {
            var i = e.shared.hiddenCallbacks;
            if (i !== null)
              for (e.shared.hiddenCallbacks = null, e = 0; e < i.length; e++)
                Fd(i[e], c);
          } catch (o) {
            L(u, u.return, o);
          }
        }
        a && f & 64 && wo(n), Uu(n, n.return);
        break;
      case 27:
        Fo(n);
      case 26:
      case 5:
        pt(
          e,
          n,
          a
        ), a && u === null && f & 4 && Wo(n), Uu(n, n.return);
        break;
      case 12:
        pt(
          e,
          n,
          a
        );
        break;
      case 13:
        pt(
          e,
          n,
          a
        ), a && f & 4 && t0(e, n);
        break;
      case 22:
        n.memoizedState === null && pt(
          e,
          n,
          a
        ), Uu(n, n.return);
        break;
      case 30:
        break;
      default:
        pt(
          e,
          n,
          a
        );
    }
    t = t.sibling;
  }
}
function ei(l, t) {
  var a = null;
  l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (a = l.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== a && (l != null && l.refCount++, a != null && ae(a));
}
function ni(l, t) {
  l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && ae(l));
}
function Fl(l, t, a, u) {
  if (t.subtreeFlags & 10256)
    for (t = t.child; t !== null; )
      e0(
        l,
        t,
        a,
        u
      ), t = t.sibling;
}
function e0(l, t, a, u) {
  var e = t.flags;
  switch (t.tag) {
    case 0:
    case 11:
    case 15:
      Fl(
        l,
        t,
        a,
        u
      ), e & 2048 && fe(9, t);
      break;
    case 1:
      Fl(
        l,
        t,
        a,
        u
      );
      break;
    case 3:
      Fl(
        l,
        t,
        a,
        u
      ), e & 2048 && (l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && ae(l)));
      break;
    case 12:
      if (e & 2048) {
        Fl(
          l,
          t,
          a,
          u
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
          L(t, t.return, i);
        }
      } else
        Fl(
          l,
          t,
          a,
          u
        );
      break;
    case 13:
      Fl(
        l,
        t,
        a,
        u
      );
      break;
    case 23:
      break;
    case 22:
      n = t.stateNode, f = t.alternate, t.memoizedState !== null ? n._visibility & 2 ? Fl(
        l,
        t,
        a,
        u
      ) : Nu(l, t) : n._visibility & 2 ? Fl(
        l,
        t,
        a,
        u
      ) : (n._visibility |= 2, Ea(
        l,
        t,
        a,
        u,
        (t.subtreeFlags & 10256) !== 0
      )), e & 2048 && ei(f, t);
      break;
    case 24:
      Fl(
        l,
        t,
        a,
        u
      ), e & 2048 && ni(t.alternate, t);
      break;
    default:
      Fl(
        l,
        t,
        a,
        u
      );
  }
}
function Ea(l, t, a, u, e) {
  for (e = e && (t.subtreeFlags & 10256) !== 0, t = t.child; t !== null; ) {
    var n = l, f = t, c = a, i = u, o = f.flags;
    switch (f.tag) {
      case 0:
      case 11:
      case 15:
        Ea(
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
        f.memoizedState !== null ? m._visibility & 2 ? Ea(
          n,
          f,
          c,
          i,
          e
        ) : Nu(
          n,
          f
        ) : (m._visibility |= 2, Ea(
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
        Ea(
          n,
          f,
          c,
          i,
          e
        ), e && o & 2048 && ni(f.alternate, f);
        break;
      default:
        Ea(
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
function Nu(l, t) {
  if (t.subtreeFlags & 10256)
    for (t = t.child; t !== null; ) {
      var a = l, u = t, e = u.flags;
      switch (u.tag) {
        case 22:
          Nu(a, u), e & 2048 && ei(
            u.alternate,
            u
          );
          break;
        case 24:
          Nu(a, u), e & 2048 && ni(u.alternate, u);
          break;
        default:
          Nu(a, u);
      }
      t = t.sibling;
    }
}
var bu = 8192;
function ma(l) {
  if (l.subtreeFlags & bu)
    for (l = l.child; l !== null; )
      n0(l), l = l.sibling;
}
function n0(l) {
  switch (l.tag) {
    case 26:
      ma(l), l.flags & bu && l.memoizedState !== null && Rh(
        $l,
        l.memoizedState,
        l.memoizedProps
      );
      break;
    case 5:
      ma(l);
      break;
    case 3:
    case 4:
      var t = $l;
      $l = vn(l.stateNode.containerInfo), ma(l), $l = t;
      break;
    case 22:
      l.memoizedState === null && (t = l.alternate, t !== null && t.memoizedState !== null ? (t = bu, bu = 16777216, ma(l), bu = t) : ma(l));
      break;
    default:
      ma(l);
  }
}
function f0(l) {
  var t = l.alternate;
  if (t !== null && (l = t.child, l !== null)) {
    t.child = null;
    do
      t = l.sibling, l.sibling = null, l = t;
    while (l !== null);
  }
}
function vu(l) {
  var t = l.deletions;
  if (l.flags & 16) {
    if (t !== null)
      for (var a = 0; a < t.length; a++) {
        var u = t[a];
        dl = u, i0(
          u,
          l
        );
      }
    f0(l);
  }
  if (l.subtreeFlags & 10256)
    for (l = l.child; l !== null; )
      c0(l), l = l.sibling;
}
function c0(l) {
  switch (l.tag) {
    case 0:
    case 11:
    case 15:
      vu(l), l.flags & 2048 && Kt(9, l, l.return);
      break;
    case 3:
      vu(l);
      break;
    case 12:
      vu(l);
      break;
    case 22:
      var t = l.stateNode;
      l.memoizedState !== null && t._visibility & 2 && (l.return === null || l.return.tag !== 13) ? (t._visibility &= -3, Ge(l)) : vu(l);
      break;
    default:
      vu(l);
  }
}
function Ge(l) {
  var t = l.deletions;
  if (l.flags & 16) {
    if (t !== null)
      for (var a = 0; a < t.length; a++) {
        var u = t[a];
        dl = u, i0(
          u,
          l
        );
      }
    f0(l);
  }
  for (l = l.child; l !== null; ) {
    switch (t = l, t.tag) {
      case 0:
      case 11:
      case 15:
        Kt(8, t, t.return), Ge(t);
        break;
      case 22:
        a = t.stateNode, a._visibility & 2 && (a._visibility &= -3, Ge(t));
        break;
      default:
        Ge(t);
    }
    l = l.sibling;
  }
}
function i0(l, t) {
  for (; dl !== null; ) {
    var a = dl;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        Kt(8, a, t);
        break;
      case 23:
      case 22:
        if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
          var u = a.memoizedState.cachePool.pool;
          u != null && u.refCount++;
        }
        break;
      case 24:
        ae(a.memoizedState.cache);
    }
    if (u = a.child, u !== null) u.return = a, dl = u;
    else
      l: for (a = l; dl !== null; ) {
        u = dl;
        var e = u.sibling, n = u.return;
        if (Po(u), u === a) {
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
var wv = {
  getCacheForType: function(l) {
    var t = El(fl), a = t.data.get(l);
    return a === void 0 && (a = l(), t.data.set(l, a)), a;
  }
}, $v = typeof WeakMap == "function" ? WeakMap : Map, Z = 0, w = null, B = null, G = 0, C = 0, Rl = null, Ht = !1, eu = !1, fi = !1, Et = 0, ll = 0, Lt = 0, fa = 0, ci = 0, Ll = 0, Wa = 0, Ru = null, Ol = null, ac = !1, ii = 0, fn = 1 / 0, cn = null, Xt = null, ml = 0, jt = null, ka = null, Ca = 0, uc = 0, ec = null, s0 = null, xu = 0, nc = null;
function Bl() {
  if (Z & 2 && G !== 0)
    return G & -G;
  if (D.T !== null) {
    var l = La;
    return l !== 0 ? l : di();
  }
  return Sd();
}
function d0() {
  Ll === 0 && (Ll = !(G & 536870912) || j ? yd() : 536870912);
  var l = Jl.current;
  return l !== null && (l.flags |= 32), Ll;
}
function ql(l, t, a) {
  (l === w && (C === 2 || C === 9) || l.cancelPendingCommit !== null) && (Fa(l, 0), Yt(
    l,
    G,
    Ll,
    !1
  )), Fu(l, a), (!(Z & 2) || l !== w) && (l === w && (!(Z & 2) && (fa |= a), ll === 4 && Yt(
    l,
    G,
    Ll,
    !1
  )), et(l));
}
function o0(l, t, a) {
  if (Z & 6) throw Error(b(327));
  var u = !a && (t & 124) === 0 && (t & l.expiredLanes) === 0 || ku(l, t), e = u ? Fv(l, t) : yf(l, t, !0), n = u;
  do {
    if (e === 0) {
      eu && !u && Yt(l, t, 0, !1);
      break;
    } else {
      if (a = l.current.alternate, n && !Wv(a)) {
        e = yf(l, t, !1), n = !1;
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
            e = Ru;
            var i = c.current.memoizedState.isDehydrated;
            if (i && (Fa(c, f).flags |= 256), f = yf(
              c,
              f,
              !1
            ), f !== 2) {
              if (fi && !i) {
                c.errorRecoveryDisabledLanes |= n, fa |= n, e = 4;
                break l;
              }
              n = Ol, Ol = e, n !== null && (Ol === null ? Ol = n : Ol.push.apply(
                Ol,
                n
              ));
            }
            e = f;
          }
          if (n = !1, e !== 2) continue;
        }
      }
      if (e === 1) {
        Fa(l, 0), Yt(l, t, 0, !0);
        break;
      }
      l: {
        switch (u = l, n = e, n) {
          case 0:
          case 1:
            throw Error(b(345));
          case 4:
            if ((t & 4194048) !== t) break;
          case 6:
            Yt(
              u,
              t,
              Ll,
              !Ht
            );
            break l;
          case 2:
            Ol = null;
            break;
          case 3:
          case 5:
            break;
          default:
            throw Error(b(329));
        }
        if ((t & 62914560) === t && (e = ii + 300 - tt(), 10 < e)) {
          if (Yt(
            u,
            t,
            Ll,
            !Ht
          ), An(u, 0, !0) !== 0) break l;
          u.timeoutHandle = N0(
            Ts.bind(
              null,
              u,
              a,
              Ol,
              cn,
              ac,
              t,
              Ll,
              fa,
              Wa,
              Ht,
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
          u,
          a,
          Ol,
          cn,
          ac,
          t,
          Ll,
          fa,
          Wa,
          Ht,
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
function Ts(l, t, a, u, e, n, f, c, i, o, m, y, r, h) {
  if (l.timeoutHandle = -1, y = t.subtreeFlags, (y & 8192 || (y & 16785408) === 16785408) && (Vu = { stylesheets: null, count: 0, unsuspend: Nh }, n0(t), y = xh(), y !== null)) {
    l.cancelPendingCommit = y(
      zs.bind(
        null,
        l,
        t,
        n,
        a,
        u,
        e,
        f,
        c,
        i,
        m,
        1,
        r,
        h
      )
    ), Yt(l, n, f, !o);
    return;
  }
  zs(
    l,
    t,
    n,
    a,
    u,
    e,
    f,
    c,
    i
  );
}
function Wv(l) {
  for (var t = l; ; ) {
    var a = t.tag;
    if ((a === 0 || a === 11 || a === 15) && t.flags & 16384 && (a = t.updateQueue, a !== null && (a = a.stores, a !== null)))
      for (var u = 0; u < a.length; u++) {
        var e = a[u], n = e.getSnapshot;
        e = e.value;
        try {
          if (!Gl(n(), e)) return !1;
        } catch {
          return !1;
        }
      }
    if (a = t.child, t.subtreeFlags & 16384 && a !== null)
      a.return = t, t = a;
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
function Yt(l, t, a, u) {
  t &= ~ci, t &= ~fa, l.suspendedLanes |= t, l.pingedLanes &= ~t, u && (l.warmLanes |= t), u = l.expirationTimes;
  for (var e = t; 0 < e; ) {
    var n = 31 - Yl(e), f = 1 << n;
    u[n] = -1, e &= ~f;
  }
  a !== 0 && gd(l, a, t);
}
function xn() {
  return Z & 6 ? !0 : (ce(0), !1);
}
function si() {
  if (B !== null) {
    if (C === 0)
      var l = B.return;
    else
      l = B, vt = ya = null, Wc(l), Qa = null, Qu = 0, l = B;
    for (; l !== null; )
      Jo(l.alternate, l), l = l.return;
    B = null;
  }
}
function Fa(l, t) {
  var a = l.timeoutHandle;
  a !== -1 && (l.timeoutHandle = -1, vh(a)), a = l.cancelPendingCommit, a !== null && (l.cancelPendingCommit = null, a()), si(), w = l, B = a = yt(l.current, null), G = t, C = 0, Rl = null, Ht = !1, eu = ku(l, t), fi = !1, Wa = Ll = ci = fa = Lt = ll = 0, Ol = Ru = null, ac = !1, t & 8 && (t |= t & 32);
  var u = l.entangledLanes;
  if (u !== 0)
    for (l = l.entanglements, u &= t; 0 < u; ) {
      var e = 31 - Yl(u), n = 1 << e;
      t |= l[e], u &= ~n;
    }
  return Et = t, On(), a;
}
function r0(l, t) {
  x = null, D.H = ln, t === ue || t === Dn ? (t = Pi(), C = 3) : t === Wd ? (t = Pi(), C = 4) : C = t === Qo ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, Rl = t, B === null && (ll = 1, un(
    l,
    Kl(t, l.current)
  ));
}
function v0() {
  var l = D.H;
  return D.H = ln, l === null ? ln : l;
}
function h0() {
  var l = D.A;
  return D.A = wv, l;
}
function fc() {
  ll = 4, Ht || (G & 4194048) !== G && Jl.current !== null || (eu = !0), !(Lt & 134217727) && !(fa & 134217727) || w === null || Yt(
    w,
    G,
    Ll,
    !1
  );
}
function yf(l, t, a) {
  var u = Z;
  Z |= 2;
  var e = v0(), n = h0();
  (w !== l || G !== t) && (cn = null, Fa(l, t)), t = !1;
  var f = ll;
  l: do
    try {
      if (C !== 0 && B !== null) {
        var c = B, i = Rl;
        switch (C) {
          case 8:
            si(), f = 6;
            break l;
          case 3:
          case 2:
          case 9:
          case 6:
            Jl.current === null && (t = !0);
            var o = C;
            if (C = 0, Rl = null, Ha(l, c, i, o), a && eu) {
              f = 0;
              break l;
            }
            break;
          default:
            o = C, C = 0, Rl = null, Ha(l, c, i, o);
        }
      }
      kv(), f = ll;
      break;
    } catch (m) {
      r0(l, m);
    }
  while (!0);
  return t && l.shellSuspendCounter++, vt = ya = null, Z = u, D.H = e, D.A = n, B === null && (w = null, G = 0, On()), f;
}
function kv() {
  for (; B !== null; ) y0(B);
}
function Fv(l, t) {
  var a = Z;
  Z |= 2;
  var u = v0(), e = h0();
  w !== l || G !== t ? (cn = null, fn = tt() + 500, Fa(l, t)) : eu = ku(
    l,
    t
  );
  l: do
    try {
      if (C !== 0 && B !== null) {
        t = B;
        var n = Rl;
        t: switch (C) {
          case 1:
            C = 0, Rl = null, Ha(l, t, n, 1);
            break;
          case 2:
          case 9:
            if (Ii(n)) {
              C = 0, Rl = null, As(t);
              break;
            }
            t = function() {
              C !== 2 && C !== 9 || w !== l || (C = 7), et(l);
            }, n.then(t, t);
            break l;
          case 3:
            C = 7;
            break l;
          case 4:
            C = 5;
            break l;
          case 7:
            Ii(n) ? (C = 0, Rl = null, As(t)) : (C = 0, Rl = null, Ha(l, t, n, 7));
            break;
          case 5:
            var f = null;
            switch (B.tag) {
              case 26:
                f = B.memoizedState;
              case 5:
              case 27:
                var c = B;
                if (!f || Y0(f)) {
                  C = 0, Rl = null;
                  var i = c.sibling;
                  if (i !== null) B = i;
                  else {
                    var o = c.return;
                    o !== null ? (B = o, Hn(o)) : B = null;
                  }
                  break t;
                }
            }
            C = 0, Rl = null, Ha(l, t, n, 5);
            break;
          case 6:
            C = 0, Rl = null, Ha(l, t, n, 6);
            break;
          case 8:
            si(), ll = 6;
            break l;
          default:
            throw Error(b(462));
        }
      }
      Iv();
      break;
    } catch (m) {
      r0(l, m);
    }
  while (!0);
  return vt = ya = null, D.H = u, D.A = e, Z = a, B !== null ? 0 : (w = null, G = 0, On(), ll);
}
function Iv() {
  for (; B !== null && !Er(); )
    y0(B);
}
function y0(l) {
  var t = Lo(l.alternate, l, Et);
  l.memoizedProps = l.pendingProps, t === null ? Hn(l) : B = t;
}
function As(l) {
  var t = l, a = t.alternate;
  switch (t.tag) {
    case 15:
    case 0:
      t = ys(
        a,
        t,
        t.pendingProps,
        t.type,
        void 0,
        G
      );
      break;
    case 11:
      t = ys(
        a,
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
      Jo(a, t), t = B = Ld(t, Et), t = Lo(a, t, Et);
  }
  l.memoizedProps = l.pendingProps, t === null ? Hn(l) : B = t;
}
function Ha(l, t, a, u) {
  vt = ya = null, Wc(t), Qa = null, Qu = 0;
  var e = t.return;
  try {
    if (Cv(
      l,
      e,
      t,
      a,
      G
    )) {
      ll = 1, un(
        l,
        Kl(a, l.current)
      ), B = null;
      return;
    }
  } catch (n) {
    if (e !== null) throw B = e, n;
    ll = 1, un(
      l,
      Kl(a, l.current)
    ), B = null;
    return;
  }
  t.flags & 32768 ? (j || u === 1 ? l = !0 : eu || G & 536870912 ? l = !1 : (Ht = l = !0, (u === 2 || u === 9 || u === 3 || u === 6) && (u = Jl.current, u !== null && u.tag === 13 && (u.flags |= 16384))), m0(t, l)) : Hn(t);
}
function Hn(l) {
  var t = l;
  do {
    if (t.flags & 32768) {
      m0(
        t,
        Ht
      );
      return;
    }
    l = t.return;
    var a = Vv(
      t.alternate,
      t,
      Et
    );
    if (a !== null) {
      B = a;
      return;
    }
    if (t = t.sibling, t !== null) {
      B = t;
      return;
    }
    B = t = l;
  } while (t !== null);
  ll === 0 && (ll = 5);
}
function m0(l, t) {
  do {
    var a = Kv(l.alternate, l);
    if (a !== null) {
      a.flags &= 32767, B = a;
      return;
    }
    if (a = l.return, a !== null && (a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null), !t && (l = l.sibling, l !== null)) {
      B = l;
      return;
    }
    B = l = a;
  } while (l !== null);
  ll = 6, B = null;
}
function zs(l, t, a, u, e, n, f, c, i) {
  l.cancelPendingCommit = null;
  do
    Yn();
  while (ml !== 0);
  if (Z & 6) throw Error(b(327));
  if (t !== null) {
    if (t === l.current) throw Error(b(177));
    if (n = t.lanes | t.childLanes, n |= qc, Nr(
      l,
      a,
      n,
      f,
      c,
      i
    ), l === w && (B = w = null, G = 0), ka = t, jt = l, Ca = a, uc = n, ec = e, s0 = u, t.subtreeFlags & 10256 || t.flags & 10256 ? (l.callbackNode = null, l.callbackPriority = 0, ah(Ke, function() {
      return T0(), null;
    })) : (l.callbackNode = null, l.callbackPriority = 0), u = (t.flags & 13878) !== 0, t.subtreeFlags & 13878 || u) {
      u = D.T, D.T = null, e = Q.p, Q.p = 2, f = Z, Z |= 4;
      try {
        Lv(l, t, a);
      } finally {
        Z = f, Q.p = e, D.T = u;
      }
    }
    ml = 1, g0(), b0(), S0();
  }
}
function g0() {
  if (ml === 1) {
    ml = 0;
    var l = jt, t = ka, a = (t.flags & 13878) !== 0;
    if (t.subtreeFlags & 13878 || a) {
      a = D.T, D.T = null;
      var u = Q.p;
      Q.p = 2;
      var e = Z;
      Z |= 4;
      try {
        a0(t, l);
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
              var y = c.ownerDocument || document, r = y && y.defaultView || window;
              if (r.getSelection) {
                var h = r.getSelection(), _ = c.textContent.length, p = Math.min(i.start, _), q = i.end === void 0 ? p : Math.min(i.end, _);
                !h.extend && p > q && (f = q, q = p, p = f);
                var d = Ki(
                  c,
                  p
                ), s = Ki(
                  c,
                  q
                );
                if (d && s && (h.rangeCount !== 1 || h.anchorNode !== d.node || h.anchorOffset !== d.offset || h.focusNode !== s.node || h.focusOffset !== s.offset)) {
                  var v = y.createRange();
                  v.setStart(d.node, d.offset), h.removeAllRanges(), p > q ? (h.addRange(v), h.extend(s.node, s.offset)) : (v.setEnd(s.node, s.offset), h.addRange(v));
                }
              }
            }
          }
          for (y = [], h = c; h = h.parentNode; )
            h.nodeType === 1 && y.push({
              element: h,
              left: h.scrollLeft,
              top: h.scrollTop
            });
          for (typeof c.focus == "function" && c.focus(), c = 0; c < y.length; c++) {
            var g = y[c];
            g.element.scrollLeft = g.left, g.element.scrollTop = g.top;
          }
        }
        mn = !!sc, dc = sc = null;
      } finally {
        Z = e, Q.p = u, D.T = a;
      }
    }
    l.current = t, ml = 2;
  }
}
function b0() {
  if (ml === 2) {
    ml = 0;
    var l = jt, t = ka, a = (t.flags & 8772) !== 0;
    if (t.subtreeFlags & 8772 || a) {
      a = D.T, D.T = null;
      var u = Q.p;
      Q.p = 2;
      var e = Z;
      Z |= 4;
      try {
        Io(l, t.alternate, t);
      } finally {
        Z = e, Q.p = u, D.T = a;
      }
    }
    ml = 3;
  }
}
function S0() {
  if (ml === 4 || ml === 3) {
    ml = 0, Tr();
    var l = jt, t = ka, a = Ca, u = s0;
    t.subtreeFlags & 10256 || t.flags & 10256 ? ml = 5 : (ml = 0, ka = jt = null, E0(l, l.pendingLanes));
    var e = l.pendingLanes;
    if (e === 0 && (Xt = null), Dc(a), t = t.stateNode, Hl && typeof Hl.onCommitFiberRoot == "function")
      try {
        Hl.onCommitFiberRoot(
          Wu,
          t,
          void 0,
          (t.current.flags & 128) === 128
        );
      } catch {
      }
    if (u !== null) {
      t = D.T, e = Q.p, Q.p = 2, D.T = null;
      try {
        for (var n = l.onRecoverableError, f = 0; f < u.length; f++) {
          var c = u[f];
          n(c.value, {
            componentStack: c.stack
          });
        }
      } finally {
        D.T = t, Q.p = e;
      }
    }
    Ca & 3 && Yn(), et(l), e = l.pendingLanes, a & 4194090 && e & 42 ? l === nc ? xu++ : (xu = 0, nc = l) : xu = 0, ce(0);
  }
}
function E0(l, t) {
  (l.pooledCacheLanes &= t) === 0 && (t = l.pooledCache, t != null && (l.pooledCache = null, ae(t)));
}
function Yn(l) {
  return g0(), b0(), S0(), T0();
}
function T0() {
  if (ml !== 5) return !1;
  var l = jt, t = uc;
  uc = 0;
  var a = Dc(Ca), u = D.T, e = Q.p;
  try {
    Q.p = 32 > a ? 32 : a, D.T = null, a = ec, ec = null;
    var n = jt, f = Ca;
    if (ml = 0, ka = jt = null, Ca = 0, Z & 6) throw Error(b(331));
    var c = Z;
    if (Z |= 4, c0(n.current), e0(
      n,
      n.current,
      f,
      a
    ), Z = c, ce(0, !1), Hl && typeof Hl.onPostCommitFiberRoot == "function")
      try {
        Hl.onPostCommitFiberRoot(Wu, n);
      } catch {
      }
    return !0;
  } finally {
    Q.p = e, D.T = u, E0(l, t);
  }
}
function ps(l, t, a) {
  t = Kl(a, t), t = If(l.stateNode, t, 2), l = Gt(l, t, 2), l !== null && (Fu(l, 2), et(l));
}
function L(l, t, a) {
  if (l.tag === 3)
    ps(l, l, a);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        ps(
          t,
          l,
          a
        );
        break;
      } else if (t.tag === 1) {
        var u = t.stateNode;
        if (typeof t.type.getDerivedStateFromError == "function" || typeof u.componentDidCatch == "function" && (Xt === null || !Xt.has(u))) {
          l = Kl(a, l), a = Xo(2), u = Gt(t, a, 2), u !== null && (jo(
            a,
            u,
            t,
            l
          ), Fu(u, 2), et(u));
          break;
        }
      }
      t = t.return;
    }
}
function mf(l, t, a) {
  var u = l.pingCache;
  if (u === null) {
    u = l.pingCache = new $v();
    var e = /* @__PURE__ */ new Set();
    u.set(t, e);
  } else
    e = u.get(t), e === void 0 && (e = /* @__PURE__ */ new Set(), u.set(t, e));
  e.has(a) || (fi = !0, e.add(a), l = Pv.bind(null, l, t, a), t.then(l, l));
}
function Pv(l, t, a) {
  var u = l.pingCache;
  u !== null && u.delete(t), l.pingedLanes |= l.suspendedLanes & a, l.warmLanes &= ~a, w === l && (G & a) === a && (ll === 4 || ll === 3 && (G & 62914560) === G && 300 > tt() - ii ? !(Z & 2) && Fa(l, 0) : ci |= a, Wa === G && (Wa = 0)), et(l);
}
function A0(l, t) {
  t === 0 && (t = md()), l = uu(l, t), l !== null && (Fu(l, t), et(l));
}
function lh(l) {
  var t = l.memoizedState, a = 0;
  t !== null && (a = t.retryLane), A0(l, a);
}
function th(l, t) {
  var a = 0;
  switch (l.tag) {
    case 13:
      var u = l.stateNode, e = l.memoizedState;
      e !== null && (a = e.retryLane);
      break;
    case 19:
      u = l.stateNode;
      break;
    case 22:
      u = l.stateNode._retryCache;
      break;
    default:
      throw Error(b(314));
  }
  u !== null && u.delete(t), A0(l, a);
}
function ah(l, t) {
  return Oc(l, t);
}
var sn = null, Ta = null, cc = !1, dn = !1, gf = !1, ca = 0;
function et(l) {
  l !== Ta && l.next === null && (Ta === null ? sn = Ta = l : Ta = Ta.next = l), dn = !0, cc || (cc = !0, eh());
}
function ce(l, t) {
  if (!gf && dn) {
    gf = !0;
    do
      for (var a = !1, u = sn; u !== null; ) {
        if (l !== 0) {
          var e = u.pendingLanes;
          if (e === 0) var n = 0;
          else {
            var f = u.suspendedLanes, c = u.pingedLanes;
            n = (1 << 31 - Yl(42 | l) + 1) - 1, n &= e & ~(f & ~c), n = n & 201326741 ? n & 201326741 | 1 : n ? n | 2 : 0;
          }
          n !== 0 && (a = !0, _s(u, n));
        } else
          n = G, n = An(
            u,
            u === w ? n : 0,
            u.cancelPendingCommit !== null || u.timeoutHandle !== -1
          ), !(n & 3) || ku(u, n) || (a = !0, _s(u, n));
        u = u.next;
      }
    while (a);
    gf = !1;
  }
}
function uh() {
  z0();
}
function z0() {
  dn = cc = !1;
  var l = 0;
  ca !== 0 && (rh() && (l = ca), ca = 0);
  for (var t = tt(), a = null, u = sn; u !== null; ) {
    var e = u.next, n = p0(u, t);
    n === 0 ? (u.next = null, a === null ? sn = e : a.next = e, e === null && (Ta = a)) : (a = u, (l !== 0 || n & 3) && (dn = !0)), u = e;
  }
  ce(l);
}
function p0(l, t) {
  for (var a = l.suspendedLanes, u = l.pingedLanes, e = l.expirationTimes, n = l.pendingLanes & -62914561; 0 < n; ) {
    var f = 31 - Yl(n), c = 1 << f, i = e[f];
    i === -1 ? (!(c & a) || c & u) && (e[f] = Ur(c, t)) : i <= t && (l.expiredLanes |= c), n &= ~c;
  }
  if (t = w, a = G, a = An(
    l,
    l === t ? a : 0,
    l.cancelPendingCommit !== null || l.timeoutHandle !== -1
  ), u = l.callbackNode, a === 0 || l === t && (C === 2 || C === 9) || l.cancelPendingCommit !== null)
    return u !== null && u !== null && Zn(u), l.callbackNode = null, l.callbackPriority = 0;
  if (!(a & 3) || ku(l, a)) {
    if (t = a & -a, t === l.callbackPriority) return t;
    switch (u !== null && Zn(u), Dc(a)) {
      case 2:
      case 8:
        a = vd;
        break;
      case 32:
        a = Ke;
        break;
      case 268435456:
        a = hd;
        break;
      default:
        a = Ke;
    }
    return u = _0.bind(null, l), a = Oc(a, u), l.callbackPriority = t, l.callbackNode = a, t;
  }
  return u !== null && u !== null && Zn(u), l.callbackPriority = 2, l.callbackNode = null, 2;
}
function _0(l, t) {
  if (ml !== 0 && ml !== 5)
    return l.callbackNode = null, l.callbackPriority = 0, null;
  var a = l.callbackNode;
  if (Yn() && l.callbackNode !== a)
    return null;
  var u = G;
  return u = An(
    l,
    l === w ? u : 0,
    l.cancelPendingCommit !== null || l.timeoutHandle !== -1
  ), u === 0 ? null : (o0(l, u, t), p0(l, tt()), l.callbackNode != null && l.callbackNode === a ? _0.bind(null, l) : null);
}
function _s(l, t) {
  if (Yn()) return null;
  o0(l, t, !0);
}
function eh() {
  hh(function() {
    Z & 6 ? Oc(
      rd,
      uh
    ) : z0();
  });
}
function di() {
  return ca === 0 && (ca = yd()), ca;
}
function Os(l) {
  return l == null || typeof l == "symbol" || typeof l == "boolean" ? null : typeof l == "function" ? l : Ue("" + l);
}
function Ms(l, t) {
  var a = t.ownerDocument.createElement("input");
  return a.name = t.name, a.value = t.value, l.id && a.setAttribute("form", l.id), t.parentNode.insertBefore(a, t), l = new FormData(l), a.parentNode.removeChild(a), l;
}
function nh(l, t, a, u, e) {
  if (t === "submit" && a && a.stateNode === e) {
    var n = Os(
      (e[Ml] || null).action
    ), f = u.submitter;
    f && (t = (t = f[Ml] || null) ? Os(t.formAction) : f.getAttribute("formAction"), t !== null && (n = t, f = null));
    var c = new zn(
      "action",
      "action",
      null,
      u,
      e
    );
    l.push({
      event: c,
      listeners: [
        {
          instance: null,
          listener: function() {
            if (u.defaultPrevented) {
              if (ca !== 0) {
                var i = f ? Ms(e, f) : new FormData(e);
                kf(
                  a,
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
              typeof n == "function" && (c.preventDefault(), i = f ? Ms(e, f) : new FormData(e), kf(
                a,
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
for (var bf = 0; bf < Xf.length; bf++) {
  var Sf = Xf[bf], fh = Sf.toLowerCase(), ch = Sf[0].toUpperCase() + Sf.slice(1);
  kl(
    fh,
    "on" + ch
  );
}
kl(jd, "onAnimationEnd");
kl(Qd, "onAnimationIteration");
kl(Cd, "onAnimationStart");
kl("dblclick", "onDoubleClick");
kl("focusin", "onFocus");
kl("focusout", "onBlur");
kl(pv, "onTransitionRun");
kl(_v, "onTransitionStart");
kl(Ov, "onTransitionCancel");
kl(Zd, "onTransitionEnd");
Va("onMouseEnter", ["mouseout", "mouseover"]);
Va("onMouseLeave", ["mouseout", "mouseover"]);
Va("onPointerEnter", ["pointerout", "pointerover"]);
Va("onPointerLeave", ["pointerout", "pointerover"]);
ra(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(" ")
);
ra(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " "
  )
);
ra("onBeforeInput", [
  "compositionend",
  "keypress",
  "textInput",
  "paste"
]);
ra(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" ")
);
ra(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" ")
);
ra(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
);
var Cu = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
  " "
), ih = new Set(
  "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Cu)
);
function O0(l, t) {
  t = (t & 4) !== 0;
  for (var a = 0; a < l.length; a++) {
    var u = l[a], e = u.event;
    u = u.listeners;
    l: {
      var n = void 0;
      if (t)
        for (var f = u.length - 1; 0 <= f; f--) {
          var c = u[f], i = c.instance, o = c.currentTarget;
          if (c = c.listener, i !== n && e.isPropagationStopped())
            break l;
          n = c, e.currentTarget = o;
          try {
            n(e);
          } catch (m) {
            an(m);
          }
          e.currentTarget = null, n = i;
        }
      else
        for (f = 0; f < u.length; f++) {
          if (c = u[f], i = c.instance, o = c.currentTarget, c = c.listener, i !== n && e.isPropagationStopped())
            break l;
          n = c, e.currentTarget = o;
          try {
            n(e);
          } catch (m) {
            an(m);
          }
          e.currentTarget = null, n = i;
        }
    }
  }
}
function Y(l, t) {
  var a = t[Rf];
  a === void 0 && (a = t[Rf] = /* @__PURE__ */ new Set());
  var u = l + "__bubble";
  a.has(u) || (M0(t, l, 2, !1), a.add(u));
}
function Ef(l, t, a) {
  var u = 0;
  t && (u |= 4), M0(
    a,
    l,
    u,
    t
  );
}
var pe = "_reactListening" + Math.random().toString(36).slice(2);
function oi(l) {
  if (!l[pe]) {
    l[pe] = !0, Ed.forEach(function(a) {
      a !== "selectionchange" && (ih.has(a) || Ef(a, !1, l), Ef(a, !0, l));
    });
    var t = l.nodeType === 9 ? l : l.ownerDocument;
    t === null || t[pe] || (t[pe] = !0, Ef("selectionchange", !1, t));
  }
}
function M0(l, t, a, u) {
  switch (j0(t)) {
    case 2:
      var e = Bh;
      break;
    case 8:
      e = qh;
      break;
    default:
      e = yi;
  }
  a = e.bind(
    null,
    t,
    a,
    l
  ), e = void 0, !Bf || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (e = !0), u ? e !== void 0 ? l.addEventListener(t, a, {
    capture: !0,
    passive: e
  }) : l.addEventListener(t, a, !0) : e !== void 0 ? l.addEventListener(t, a, {
    passive: e
  }) : l.addEventListener(t, a, !1);
}
function Tf(l, t, a, u, e) {
  var n = u;
  if (!(t & 1) && !(t & 2) && u !== null)
    l: for (; ; ) {
      if (u === null) return;
      var f = u.tag;
      if (f === 3 || f === 4) {
        var c = u.stateNode.containerInfo;
        if (c === e) break;
        if (f === 4)
          for (f = u.return; f !== null; ) {
            var i = f.tag;
            if ((i === 3 || i === 4) && f.stateNode.containerInfo === e)
              return;
            f = f.return;
          }
        for (; c !== null; ) {
          if (f = pa(c), f === null) return;
          if (i = f.tag, i === 5 || i === 6 || i === 26 || i === 27) {
            u = n = f;
            continue l;
          }
          c = c.parentNode;
        }
      }
      u = u.return;
    }
  Dd(function() {
    var o = n, m = Rc(a), y = [];
    l: {
      var r = Vd.get(l);
      if (r !== void 0) {
        var h = zn, _ = l;
        switch (l) {
          case "keypress":
            if (Re(a) === 0) break l;
          case "keydown":
          case "keyup":
            h = av;
            break;
          case "focusin":
            _ = "focus", h = kn;
            break;
          case "focusout":
            _ = "blur", h = kn;
            break;
          case "beforeblur":
          case "afterblur":
            h = kn;
            break;
          case "click":
            if (a.button === 2) break l;
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
            h = Kr;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            h = nv;
            break;
          case jd:
          case Qd:
          case Cd:
            h = wr;
            break;
          case Zd:
            h = cv;
            break;
          case "scroll":
          case "scrollend":
            h = Zr;
            break;
          case "wheel":
            h = sv;
            break;
          case "copy":
          case "cut":
          case "paste":
            h = Wr;
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
            h = ov;
        }
        var p = (t & 4) !== 0, q = !p && (l === "scroll" || l === "scrollend"), d = p ? r !== null ? r + "Capture" : null : r;
        p = [];
        for (var s = o, v; s !== null; ) {
          var g = s;
          if (v = g.stateNode, g = g.tag, g !== 5 && g !== 26 && g !== 27 || v === null || d === null || (g = Bu(s, d), g != null && p.push(
            Zu(s, g, v)
          )), q) break;
          s = s.return;
        }
        0 < p.length && (r = new h(
          r,
          _,
          null,
          a,
          m
        ), y.push({ event: r, listeners: p }));
      }
    }
    if (!(t & 7)) {
      l: {
        if (r = l === "mouseover" || l === "pointerover", h = l === "mouseout" || l === "pointerout", r && a !== Yf && (_ = a.relatedTarget || a.fromElement) && (pa(_) || _[tu]))
          break l;
        if ((h || r) && (r = m.window === m ? m : (r = m.ownerDocument) ? r.defaultView || r.parentWindow : window, h ? (_ = a.relatedTarget || a.toElement, h = o, _ = _ ? pa(_) : null, _ !== null && (q = $u(_), p = _.tag, _ !== q || p !== 5 && p !== 27 && p !== 6) && (_ = null)) : (h = null, _ = o), h !== _)) {
          if (p = Yi, g = "onMouseLeave", d = "onMouseEnter", s = "mouse", (l === "pointerout" || l === "pointerover") && (p = qi, g = "onPointerLeave", d = "onPointerEnter", s = "pointer"), q = h == null ? r : gu(h), v = _ == null ? r : gu(_), r = new p(
            g,
            s + "leave",
            h,
            a,
            m
          ), r.target = q, r.relatedTarget = v, g = null, pa(m) === o && (p = new p(
            d,
            s + "enter",
            _,
            a,
            m
          ), p.target = v, p.relatedTarget = q, g = p), q = g, h && _)
            t: {
              for (p = h, d = _, s = 0, v = p; v; v = ga(v))
                s++;
              for (v = 0, g = d; g; g = ga(g))
                v++;
              for (; 0 < s - v; )
                p = ga(p), s--;
              for (; 0 < v - s; )
                d = ga(d), v--;
              for (; s--; ) {
                if (p === d || d !== null && p === d.alternate)
                  break t;
                p = ga(p), d = ga(d);
              }
              p = null;
            }
          else p = null;
          h !== null && Ds(
            y,
            r,
            h,
            p,
            !1
          ), _ !== null && q !== null && Ds(
            y,
            q,
            _,
            p,
            !0
          );
        }
      }
      l: {
        if (r = o ? gu(o) : window, h = r.nodeName && r.nodeName.toLowerCase(), h === "select" || h === "input" && r.type === "file")
          var T = Qi;
        else if (ji(r))
          if (Yd)
            T = Tv;
          else {
            T = Sv;
            var U = bv;
          }
        else
          h = r.nodeName, !h || h.toLowerCase() !== "input" || r.type !== "checkbox" && r.type !== "radio" ? o && Nc(o.elementType) && (T = Qi) : T = Ev;
        if (T && (T = T(l, o))) {
          Hd(
            y,
            T,
            a,
            m
          );
          break l;
        }
        U && U(l, r, o), l === "focusout" && o && r.type === "number" && o.memoizedProps.value != null && Hf(r, "number", r.value);
      }
      switch (U = o ? gu(o) : window, l) {
        case "focusin":
          (ji(U) || U.contentEditable === "true") && (Ma = U, qf = o, Au = null);
          break;
        case "focusout":
          Au = qf = Ma = null;
          break;
        case "mousedown":
          Gf = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Gf = !1, Li(y, a, m);
          break;
        case "selectionchange":
          if (zv) break;
        case "keydown":
        case "keyup":
          Li(y, a, m);
      }
      var A;
      if (Yc)
        l: {
          switch (l) {
            case "compositionstart":
              var O = "onCompositionStart";
              break l;
            case "compositionend":
              O = "onCompositionEnd";
              break l;
            case "compositionupdate":
              O = "onCompositionUpdate";
              break l;
          }
          O = void 0;
        }
      else
        Oa ? Rd(l, a) && (O = "onCompositionEnd") : l === "keydown" && a.keyCode === 229 && (O = "onCompositionStart");
      O && (Nd && a.locale !== "ko" && (Oa || O !== "onCompositionStart" ? O === "onCompositionEnd" && Oa && (A = Ud()) : (xt = m, xc = "value" in xt ? xt.value : xt.textContent, Oa = !0)), U = on(o, O), 0 < U.length && (O = new Bi(
        O,
        l,
        null,
        a,
        m
      ), y.push({ event: O, listeners: U }), A ? O.data = A : (A = xd(a), A !== null && (O.data = A)))), (A = vv ? hv(l, a) : yv(l, a)) && (O = on(o, "onBeforeInput"), 0 < O.length && (U = new Bi(
        "onBeforeInput",
        "beforeinput",
        null,
        a,
        m
      ), y.push({
        event: U,
        listeners: O
      }), U.data = A)), nh(
        y,
        l,
        o,
        a,
        m
      );
    }
    O0(y, t);
  });
}
function Zu(l, t, a) {
  return {
    instance: l,
    listener: t,
    currentTarget: a
  };
}
function on(l, t) {
  for (var a = t + "Capture", u = []; l !== null; ) {
    var e = l, n = e.stateNode;
    if (e = e.tag, e !== 5 && e !== 26 && e !== 27 || n === null || (e = Bu(l, a), e != null && u.unshift(
      Zu(l, e, n)
    ), e = Bu(l, t), e != null && u.push(
      Zu(l, e, n)
    )), l.tag === 3) return u;
    l = l.return;
  }
  return [];
}
function ga(l) {
  if (l === null) return null;
  do
    l = l.return;
  while (l && l.tag !== 5 && l.tag !== 27);
  return l || null;
}
function Ds(l, t, a, u, e) {
  for (var n = t._reactName, f = []; a !== null && a !== u; ) {
    var c = a, i = c.alternate, o = c.stateNode;
    if (c = c.tag, i !== null && i === u) break;
    c !== 5 && c !== 26 && c !== 27 || o === null || (i = o, e ? (o = Bu(a, n), o != null && f.unshift(
      Zu(a, o, i)
    )) : e || (o = Bu(a, n), o != null && f.push(
      Zu(a, o, i)
    ))), a = a.return;
  }
  f.length !== 0 && l.push({ event: t, listeners: f });
}
var sh = /\r\n?/g, dh = /\u0000|\uFFFD/g;
function Us(l) {
  return (typeof l == "string" ? l : "" + l).replace(sh, `
`).replace(dh, "");
}
function D0(l, t) {
  return t = Us(t), Us(l) === t;
}
function Bn() {
}
function V(l, t, a, u, e, n) {
  switch (a) {
    case "children":
      typeof u == "string" ? t === "body" || t === "textarea" && u === "" || Ka(l, u) : (typeof u == "number" || typeof u == "bigint") && t !== "body" && Ka(l, "" + u);
      break;
    case "className":
      ge(l, "class", u);
      break;
    case "tabIndex":
      ge(l, "tabindex", u);
      break;
    case "dir":
    case "role":
    case "viewBox":
    case "width":
    case "height":
      ge(l, a, u);
      break;
    case "style":
      Md(l, u, n);
      break;
    case "data":
      if (t !== "object") {
        ge(l, "data", u);
        break;
      }
    case "src":
    case "href":
      if (u === "" && (t !== "a" || a !== "href")) {
        l.removeAttribute(a);
        break;
      }
      if (u == null || typeof u == "function" || typeof u == "symbol" || typeof u == "boolean") {
        l.removeAttribute(a);
        break;
      }
      u = Ue("" + u), l.setAttribute(a, u);
      break;
    case "action":
    case "formAction":
      if (typeof u == "function") {
        l.setAttribute(
          a,
          "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
        );
        break;
      } else
        typeof n == "function" && (a === "formAction" ? (t !== "input" && V(l, t, "name", e.name, e, null), V(
          l,
          t,
          "formEncType",
          e.formEncType,
          e,
          null
        ), V(
          l,
          t,
          "formMethod",
          e.formMethod,
          e,
          null
        ), V(
          l,
          t,
          "formTarget",
          e.formTarget,
          e,
          null
        )) : (V(l, t, "encType", e.encType, e, null), V(l, t, "method", e.method, e, null), V(l, t, "target", e.target, e, null)));
      if (u == null || typeof u == "symbol" || typeof u == "boolean") {
        l.removeAttribute(a);
        break;
      }
      u = Ue("" + u), l.setAttribute(a, u);
      break;
    case "onClick":
      u != null && (l.onclick = Bn);
      break;
    case "onScroll":
      u != null && Y("scroll", l);
      break;
    case "onScrollEnd":
      u != null && Y("scrollend", l);
      break;
    case "dangerouslySetInnerHTML":
      if (u != null) {
        if (typeof u != "object" || !("__html" in u))
          throw Error(b(61));
        if (a = u.__html, a != null) {
          if (e.children != null) throw Error(b(60));
          l.innerHTML = a;
        }
      }
      break;
    case "multiple":
      l.multiple = u && typeof u != "function" && typeof u != "symbol";
      break;
    case "muted":
      l.muted = u && typeof u != "function" && typeof u != "symbol";
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
      if (u == null || typeof u == "function" || typeof u == "boolean" || typeof u == "symbol") {
        l.removeAttribute("xlink:href");
        break;
      }
      a = Ue("" + u), l.setAttributeNS(
        "http://www.w3.org/1999/xlink",
        "xlink:href",
        a
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
      u != null && typeof u != "function" && typeof u != "symbol" ? l.setAttribute(a, "" + u) : l.removeAttribute(a);
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
      u && typeof u != "function" && typeof u != "symbol" ? l.setAttribute(a, "") : l.removeAttribute(a);
      break;
    case "capture":
    case "download":
      u === !0 ? l.setAttribute(a, "") : u !== !1 && u != null && typeof u != "function" && typeof u != "symbol" ? l.setAttribute(a, u) : l.removeAttribute(a);
      break;
    case "cols":
    case "rows":
    case "size":
    case "span":
      u != null && typeof u != "function" && typeof u != "symbol" && !isNaN(u) && 1 <= u ? l.setAttribute(a, u) : l.removeAttribute(a);
      break;
    case "rowSpan":
    case "start":
      u == null || typeof u == "function" || typeof u == "symbol" || isNaN(u) ? l.removeAttribute(a) : l.setAttribute(a, u);
      break;
    case "popover":
      Y("beforetoggle", l), Y("toggle", l), De(l, "popover", u);
      break;
    case "xlinkActuate":
      ft(
        l,
        "http://www.w3.org/1999/xlink",
        "xlink:actuate",
        u
      );
      break;
    case "xlinkArcrole":
      ft(
        l,
        "http://www.w3.org/1999/xlink",
        "xlink:arcrole",
        u
      );
      break;
    case "xlinkRole":
      ft(
        l,
        "http://www.w3.org/1999/xlink",
        "xlink:role",
        u
      );
      break;
    case "xlinkShow":
      ft(
        l,
        "http://www.w3.org/1999/xlink",
        "xlink:show",
        u
      );
      break;
    case "xlinkTitle":
      ft(
        l,
        "http://www.w3.org/1999/xlink",
        "xlink:title",
        u
      );
      break;
    case "xlinkType":
      ft(
        l,
        "http://www.w3.org/1999/xlink",
        "xlink:type",
        u
      );
      break;
    case "xmlBase":
      ft(
        l,
        "http://www.w3.org/XML/1998/namespace",
        "xml:base",
        u
      );
      break;
    case "xmlLang":
      ft(
        l,
        "http://www.w3.org/XML/1998/namespace",
        "xml:lang",
        u
      );
      break;
    case "xmlSpace":
      ft(
        l,
        "http://www.w3.org/XML/1998/namespace",
        "xml:space",
        u
      );
      break;
    case "is":
      De(l, "is", u);
      break;
    case "innerText":
    case "textContent":
      break;
    default:
      (!(2 < a.length) || a[0] !== "o" && a[0] !== "O" || a[1] !== "n" && a[1] !== "N") && (a = Qr.get(a) || a, De(l, a, u));
  }
}
function ic(l, t, a, u, e, n) {
  switch (a) {
    case "style":
      Md(l, u, n);
      break;
    case "dangerouslySetInnerHTML":
      if (u != null) {
        if (typeof u != "object" || !("__html" in u))
          throw Error(b(61));
        if (a = u.__html, a != null) {
          if (e.children != null) throw Error(b(60));
          l.innerHTML = a;
        }
      }
      break;
    case "children":
      typeof u == "string" ? Ka(l, u) : (typeof u == "number" || typeof u == "bigint") && Ka(l, "" + u);
      break;
    case "onScroll":
      u != null && Y("scroll", l);
      break;
    case "onScrollEnd":
      u != null && Y("scrollend", l);
      break;
    case "onClick":
      u != null && (l.onclick = Bn);
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
      if (!Td.hasOwnProperty(a))
        l: {
          if (a[0] === "o" && a[1] === "n" && (e = a.endsWith("Capture"), t = a.slice(2, e ? a.length - 7 : void 0), n = l[Ml] || null, n = n != null ? n[a] : null, typeof n == "function" && l.removeEventListener(t, n, e), typeof u == "function")) {
            typeof n != "function" && n !== null && (a in l ? l[a] = null : l.hasAttribute(a) && l.removeAttribute(a)), l.addEventListener(t, u, e);
            break l;
          }
          a in l ? l[a] = u : u === !0 ? l.setAttribute(a, "") : De(l, a, u);
        }
  }
}
function gl(l, t, a) {
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
      Y("error", l), Y("load", l);
      var u = !1, e = !1, n;
      for (n in a)
        if (a.hasOwnProperty(n)) {
          var f = a[n];
          if (f != null)
            switch (n) {
              case "src":
                u = !0;
                break;
              case "srcSet":
                e = !0;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(b(137, t));
              default:
                V(l, t, n, f, a, null);
            }
        }
      e && V(l, t, "srcSet", a.srcSet, a, null), u && V(l, t, "src", a.src, a, null);
      return;
    case "input":
      Y("invalid", l);
      var c = n = f = e = null, i = null, o = null;
      for (u in a)
        if (a.hasOwnProperty(u)) {
          var m = a[u];
          if (m != null)
            switch (u) {
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
                  throw Error(b(137, t));
                break;
              default:
                V(l, t, u, m, a, null);
            }
        }
      pd(
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
      Y("invalid", l), u = f = n = null;
      for (e in a)
        if (a.hasOwnProperty(e) && (c = a[e], c != null))
          switch (e) {
            case "value":
              n = c;
              break;
            case "defaultValue":
              f = c;
              break;
            case "multiple":
              u = c;
            default:
              V(l, t, e, c, a, null);
          }
      t = n, a = f, l.multiple = !!u, t != null ? Ba(l, !!u, t, !1) : a != null && Ba(l, !!u, a, !0);
      return;
    case "textarea":
      Y("invalid", l), n = e = u = null;
      for (f in a)
        if (a.hasOwnProperty(f) && (c = a[f], c != null))
          switch (f) {
            case "value":
              u = c;
              break;
            case "defaultValue":
              e = c;
              break;
            case "children":
              n = c;
              break;
            case "dangerouslySetInnerHTML":
              if (c != null) throw Error(b(91));
              break;
            default:
              V(l, t, f, c, a, null);
          }
      Od(l, u, e, n), Le(l);
      return;
    case "option":
      for (i in a)
        if (a.hasOwnProperty(i) && (u = a[i], u != null))
          switch (i) {
            case "selected":
              l.selected = u && typeof u != "function" && typeof u != "symbol";
              break;
            default:
              V(l, t, i, u, a, null);
          }
      return;
    case "dialog":
      Y("beforetoggle", l), Y("toggle", l), Y("cancel", l), Y("close", l);
      break;
    case "iframe":
    case "object":
      Y("load", l);
      break;
    case "video":
    case "audio":
      for (u = 0; u < Cu.length; u++)
        Y(Cu[u], l);
      break;
    case "image":
      Y("error", l), Y("load", l);
      break;
    case "details":
      Y("toggle", l);
      break;
    case "embed":
    case "source":
    case "link":
      Y("error", l), Y("load", l);
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
      for (o in a)
        if (a.hasOwnProperty(o) && (u = a[o], u != null))
          switch (o) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error(b(137, t));
            default:
              V(l, t, o, u, a, null);
          }
      return;
    default:
      if (Nc(t)) {
        for (m in a)
          a.hasOwnProperty(m) && (u = a[m], u !== void 0 && ic(
            l,
            t,
            m,
            u,
            a,
            void 0
          ));
        return;
      }
  }
  for (c in a)
    a.hasOwnProperty(c) && (u = a[c], u != null && V(l, t, c, u, a, null));
}
function oh(l, t, a, u) {
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
      for (h in a) {
        var y = a[h];
        if (a.hasOwnProperty(h) && y != null)
          switch (h) {
            case "checked":
              break;
            case "value":
              break;
            case "defaultValue":
              i = y;
            default:
              u.hasOwnProperty(h) || V(l, t, h, null, u, y);
          }
      }
      for (var r in u) {
        var h = u[r];
        if (y = a[r], u.hasOwnProperty(r) && (h != null || y != null))
          switch (r) {
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
                throw Error(b(137, t));
              break;
            default:
              h !== y && V(
                l,
                t,
                r,
                h,
                u,
                y
              );
          }
      }
      xf(
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
      h = f = c = r = null;
      for (n in a)
        if (i = a[n], a.hasOwnProperty(n) && i != null)
          switch (n) {
            case "value":
              break;
            case "multiple":
              h = i;
            default:
              u.hasOwnProperty(n) || V(
                l,
                t,
                n,
                null,
                u,
                i
              );
          }
      for (e in u)
        if (n = u[e], i = a[e], u.hasOwnProperty(e) && (n != null || i != null))
          switch (e) {
            case "value":
              r = n;
              break;
            case "defaultValue":
              c = n;
              break;
            case "multiple":
              f = n;
            default:
              n !== i && V(
                l,
                t,
                e,
                n,
                u,
                i
              );
          }
      t = c, a = f, u = h, r != null ? Ba(l, !!a, r, !1) : !!u != !!a && (t != null ? Ba(l, !!a, t, !0) : Ba(l, !!a, a ? [] : "", !1));
      return;
    case "textarea":
      h = r = null;
      for (c in a)
        if (e = a[c], a.hasOwnProperty(c) && e != null && !u.hasOwnProperty(c))
          switch (c) {
            case "value":
              break;
            case "children":
              break;
            default:
              V(l, t, c, null, u, e);
          }
      for (f in u)
        if (e = u[f], n = a[f], u.hasOwnProperty(f) && (e != null || n != null))
          switch (f) {
            case "value":
              r = e;
              break;
            case "defaultValue":
              h = e;
              break;
            case "children":
              break;
            case "dangerouslySetInnerHTML":
              if (e != null) throw Error(b(91));
              break;
            default:
              e !== n && V(l, t, f, e, u, n);
          }
      _d(l, r, h);
      return;
    case "option":
      for (var _ in a)
        if (r = a[_], a.hasOwnProperty(_) && r != null && !u.hasOwnProperty(_))
          switch (_) {
            case "selected":
              l.selected = !1;
              break;
            default:
              V(
                l,
                t,
                _,
                null,
                u,
                r
              );
          }
      for (i in u)
        if (r = u[i], h = a[i], u.hasOwnProperty(i) && r !== h && (r != null || h != null))
          switch (i) {
            case "selected":
              l.selected = r && typeof r != "function" && typeof r != "symbol";
              break;
            default:
              V(
                l,
                t,
                i,
                r,
                u,
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
      for (var p in a)
        r = a[p], a.hasOwnProperty(p) && r != null && !u.hasOwnProperty(p) && V(l, t, p, null, u, r);
      for (o in u)
        if (r = u[o], h = a[o], u.hasOwnProperty(o) && r !== h && (r != null || h != null))
          switch (o) {
            case "children":
            case "dangerouslySetInnerHTML":
              if (r != null)
                throw Error(b(137, t));
              break;
            default:
              V(
                l,
                t,
                o,
                r,
                u,
                h
              );
          }
      return;
    default:
      if (Nc(t)) {
        for (var q in a)
          r = a[q], a.hasOwnProperty(q) && r !== void 0 && !u.hasOwnProperty(q) && ic(
            l,
            t,
            q,
            void 0,
            u,
            r
          );
        for (m in u)
          r = u[m], h = a[m], !u.hasOwnProperty(m) || r === h || r === void 0 && h === void 0 || ic(
            l,
            t,
            m,
            r,
            u,
            h
          );
        return;
      }
  }
  for (var d in a)
    r = a[d], a.hasOwnProperty(d) && r != null && !u.hasOwnProperty(d) && V(l, t, d, null, u, r);
  for (y in u)
    r = u[y], h = a[y], !u.hasOwnProperty(y) || r === h || r == null && h == null || V(l, t, y, r, u, h);
}
var sc = null, dc = null;
function rn(l) {
  return l.nodeType === 9 ? l : l.ownerDocument;
}
function Ns(l) {
  switch (l) {
    case "http://www.w3.org/2000/svg":
      return 1;
    case "http://www.w3.org/1998/Math/MathML":
      return 2;
    default:
      return 0;
  }
}
function U0(l, t) {
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
function rh() {
  var l = window.event;
  return l && l.type === "popstate" ? l === Af ? !1 : (Af = l, !0) : (Af = null, !1);
}
var N0 = typeof setTimeout == "function" ? setTimeout : void 0, vh = typeof clearTimeout == "function" ? clearTimeout : void 0, Rs = typeof Promise == "function" ? Promise : void 0, hh = typeof queueMicrotask == "function" ? queueMicrotask : typeof Rs < "u" ? function(l) {
  return Rs.resolve(null).then(l).catch(yh);
} : N0;
function yh(l) {
  setTimeout(function() {
    throw l;
  });
}
function wt(l) {
  return l === "head";
}
function xs(l, t) {
  var a = t, u = 0, e = 0;
  do {
    var n = a.nextSibling;
    if (l.removeChild(a), n && n.nodeType === 8)
      if (a = n.data, a === "/$") {
        if (0 < u && 8 > u) {
          a = u;
          var f = l.ownerDocument;
          if (a & 1 && Hu(f.documentElement), a & 2 && Hu(f.body), a & 4)
            for (a = f.head, Hu(a), f = a.firstChild; f; ) {
              var c = f.nextSibling, i = f.nodeName;
              f[Iu] || i === "SCRIPT" || i === "STYLE" || i === "LINK" && f.rel.toLowerCase() === "stylesheet" || a.removeChild(f), f = c;
            }
        }
        if (e === 0) {
          l.removeChild(n), wu(t);
          return;
        }
        e--;
      } else
        a === "$" || a === "$?" || a === "$!" ? e++ : u = a.charCodeAt(0) - 48;
    else u = 0;
    a = n;
  } while (a);
  wu(t);
}
function rc(l) {
  var t = l.firstChild;
  for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
    var a = t;
    switch (t = t.nextSibling, a.nodeName) {
      case "HTML":
      case "HEAD":
      case "BODY":
        rc(a), Uc(a);
        continue;
      case "SCRIPT":
      case "STYLE":
        continue;
      case "LINK":
        if (a.rel.toLowerCase() === "stylesheet") continue;
    }
    l.removeChild(a);
  }
}
function mh(l, t, a, u) {
  for (; l.nodeType === 1; ) {
    var e = a;
    if (l.nodeName.toLowerCase() !== t.toLowerCase()) {
      if (!u && (l.nodeName !== "INPUT" || l.type !== "hidden"))
        break;
    } else if (u) {
      if (!l[Iu])
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
function gh(l, t, a) {
  if (t === "") return null;
  for (; l.nodeType !== 3; )
    if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !a || (l = Wl(l.nextSibling), l === null)) return null;
  return l;
}
function vc(l) {
  return l.data === "$!" || l.data === "$?" && l.ownerDocument.readyState === "complete";
}
function bh(l, t) {
  var a = l.ownerDocument;
  if (l.data !== "$?" || a.readyState === "complete")
    t();
  else {
    var u = function() {
      t(), a.removeEventListener("DOMContentLoaded", u);
    };
    a.addEventListener("DOMContentLoaded", u), l._reactRetry = u;
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
function Hs(l) {
  l = l.previousSibling;
  for (var t = 0; l; ) {
    if (l.nodeType === 8) {
      var a = l.data;
      if (a === "$" || a === "$!" || a === "$?") {
        if (t === 0) return l;
        t--;
      } else a === "/$" && t++;
    }
    l = l.previousSibling;
  }
  return null;
}
function R0(l, t, a) {
  switch (t = rn(a), l) {
    case "html":
      if (l = t.documentElement, !l) throw Error(b(452));
      return l;
    case "head":
      if (l = t.head, !l) throw Error(b(453));
      return l;
    case "body":
      if (l = t.body, !l) throw Error(b(454));
      return l;
    default:
      throw Error(b(451));
  }
}
function Hu(l) {
  for (var t = l.attributes; t.length; )
    l.removeAttributeNode(t[0]);
  Uc(l);
}
var wl = /* @__PURE__ */ new Map(), Ys = /* @__PURE__ */ new Set();
function vn(l) {
  return typeof l.getRootNode == "function" ? l.getRootNode() : l.nodeType === 9 ? l : l.ownerDocument;
}
var Tt = Q.d;
Q.d = {
  f: Sh,
  r: Eh,
  D: Th,
  C: Ah,
  L: zh,
  m: ph,
  X: Oh,
  S: _h,
  M: Mh
};
function Sh() {
  var l = Tt.f(), t = xn();
  return l || t;
}
function Eh(l) {
  var t = au(l);
  t !== null && t.tag === 5 && t.type === "form" ? po(t) : Tt.r(l);
}
var nu = typeof document > "u" ? null : document;
function x0(l, t, a) {
  var u = nu;
  if (u && typeof t == "string" && t) {
    var e = Vl(t);
    e = 'link[rel="' + l + '"][href="' + e + '"]', typeof a == "string" && (e += '[crossorigin="' + a + '"]'), Ys.has(e) || (Ys.add(e), l = { rel: l, crossOrigin: a, href: t }, u.querySelector(e) === null && (t = u.createElement("link"), gl(t, "link", l), ol(t), u.head.appendChild(t)));
  }
}
function Th(l) {
  Tt.D(l), x0("dns-prefetch", l, null);
}
function Ah(l, t) {
  Tt.C(l, t), x0("preconnect", l, t);
}
function zh(l, t, a) {
  Tt.L(l, t, a);
  var u = nu;
  if (u && l && t) {
    var e = 'link[rel="preload"][as="' + Vl(t) + '"]';
    t === "image" && a && a.imageSrcSet ? (e += '[imagesrcset="' + Vl(
      a.imageSrcSet
    ) + '"]', typeof a.imageSizes == "string" && (e += '[imagesizes="' + Vl(
      a.imageSizes
    ) + '"]')) : e += '[href="' + Vl(l) + '"]';
    var n = e;
    switch (t) {
      case "style":
        n = Ia(l);
        break;
      case "script":
        n = fu(l);
    }
    wl.has(n) || (l = $(
      {
        rel: "preload",
        href: t === "image" && a && a.imageSrcSet ? void 0 : l,
        as: t
      },
      a
    ), wl.set(n, l), u.querySelector(e) !== null || t === "style" && u.querySelector(ie(n)) || t === "script" && u.querySelector(se(n)) || (t = u.createElement("link"), gl(t, "link", l), ol(t), u.head.appendChild(t)));
  }
}
function ph(l, t) {
  Tt.m(l, t);
  var a = nu;
  if (a && l) {
    var u = t && typeof t.as == "string" ? t.as : "script", e = 'link[rel="modulepreload"][as="' + Vl(u) + '"][href="' + Vl(l) + '"]', n = e;
    switch (u) {
      case "audioworklet":
      case "paintworklet":
      case "serviceworker":
      case "sharedworker":
      case "worker":
      case "script":
        n = fu(l);
    }
    if (!wl.has(n) && (l = $({ rel: "modulepreload", href: l }, t), wl.set(n, l), a.querySelector(e) === null)) {
      switch (u) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          if (a.querySelector(se(n)))
            return;
      }
      u = a.createElement("link"), gl(u, "link", l), ol(u), a.head.appendChild(u);
    }
  }
}
function _h(l, t, a) {
  Tt.S(l, t, a);
  var u = nu;
  if (u && l) {
    var e = Ya(u).hoistableStyles, n = Ia(l);
    t = t || "default";
    var f = e.get(n);
    if (!f) {
      var c = { loading: 0, preload: null };
      if (f = u.querySelector(
        ie(n)
      ))
        c.loading = 5;
      else {
        l = $(
          { rel: "stylesheet", href: l, "data-precedence": t },
          a
        ), (a = wl.get(n)) && ri(l, a);
        var i = f = u.createElement("link");
        ol(i), gl(i, "link", l), i._p = new Promise(function(o, m) {
          i.onload = o, i.onerror = m;
        }), i.addEventListener("load", function() {
          c.loading |= 1;
        }), i.addEventListener("error", function() {
          c.loading |= 2;
        }), c.loading |= 4, Xe(f, t, u);
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
function Oh(l, t) {
  Tt.X(l, t);
  var a = nu;
  if (a && l) {
    var u = Ya(a).hoistableScripts, e = fu(l), n = u.get(e);
    n || (n = a.querySelector(se(e)), n || (l = $({ src: l, async: !0 }, t), (t = wl.get(e)) && vi(l, t), n = a.createElement("script"), ol(n), gl(n, "link", l), a.head.appendChild(n)), n = {
      type: "script",
      instance: n,
      count: 1,
      state: null
    }, u.set(e, n));
  }
}
function Mh(l, t) {
  Tt.M(l, t);
  var a = nu;
  if (a && l) {
    var u = Ya(a).hoistableScripts, e = fu(l), n = u.get(e);
    n || (n = a.querySelector(se(e)), n || (l = $({ src: l, async: !0, type: "module" }, t), (t = wl.get(e)) && vi(l, t), n = a.createElement("script"), ol(n), gl(n, "link", l), a.head.appendChild(n)), n = {
      type: "script",
      instance: n,
      count: 1,
      state: null
    }, u.set(e, n));
  }
}
function Bs(l, t, a, u) {
  var e = (e = Bt.current) ? vn(e) : null;
  if (!e) throw Error(b(446));
  switch (l) {
    case "meta":
    case "title":
      return null;
    case "style":
      return typeof a.precedence == "string" && typeof a.href == "string" ? (t = Ia(a.href), a = Ya(
        e
      ).hoistableStyles, u = a.get(t), u || (u = {
        type: "style",
        instance: null,
        count: 0,
        state: null
      }, a.set(t, u)), u) : { type: "void", instance: null, count: 0, state: null };
    case "link":
      if (a.rel === "stylesheet" && typeof a.href == "string" && typeof a.precedence == "string") {
        l = Ia(a.href);
        var n = Ya(
          e
        ).hoistableStyles, f = n.get(l);
        if (f || (e = e.ownerDocument || e, f = {
          type: "stylesheet",
          instance: null,
          count: 0,
          state: { loading: 0, preload: null }
        }, n.set(l, f), (n = e.querySelector(
          ie(l)
        )) && !n._p && (f.instance = n, f.state.loading = 5), wl.has(l) || (a = {
          rel: "preload",
          as: "style",
          href: a.href,
          crossOrigin: a.crossOrigin,
          integrity: a.integrity,
          media: a.media,
          hrefLang: a.hrefLang,
          referrerPolicy: a.referrerPolicy
        }, wl.set(l, a), n || Dh(
          e,
          l,
          a,
          f.state
        ))), t && u === null)
          throw Error(b(528, ""));
        return f;
      }
      if (t && u !== null)
        throw Error(b(529, ""));
      return null;
    case "script":
      return t = a.async, a = a.src, typeof a == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = fu(a), a = Ya(
        e
      ).hoistableScripts, u = a.get(t), u || (u = {
        type: "script",
        instance: null,
        count: 0,
        state: null
      }, a.set(t, u)), u) : { type: "void", instance: null, count: 0, state: null };
    default:
      throw Error(b(444, l));
  }
}
function Ia(l) {
  return 'href="' + Vl(l) + '"';
}
function ie(l) {
  return 'link[rel="stylesheet"][' + l + "]";
}
function H0(l) {
  return $({}, l, {
    "data-precedence": l.precedence,
    precedence: null
  });
}
function Dh(l, t, a, u) {
  l.querySelector('link[rel="preload"][as="style"][' + t + "]") ? u.loading = 1 : (t = l.createElement("link"), u.preload = t, t.addEventListener("load", function() {
    return u.loading |= 1;
  }), t.addEventListener("error", function() {
    return u.loading |= 2;
  }), gl(t, "link", a), ol(t), l.head.appendChild(t));
}
function fu(l) {
  return '[src="' + Vl(l) + '"]';
}
function se(l) {
  return "script[async]" + l;
}
function qs(l, t, a) {
  if (t.count++, t.instance === null)
    switch (t.type) {
      case "style":
        var u = l.querySelector(
          'style[data-href~="' + Vl(a.href) + '"]'
        );
        if (u)
          return t.instance = u, ol(u), u;
        var e = $({}, a, {
          "data-href": a.href,
          "data-precedence": a.precedence,
          href: null,
          precedence: null
        });
        return u = (l.ownerDocument || l).createElement(
          "style"
        ), ol(u), gl(u, "style", e), Xe(u, a.precedence, l), t.instance = u;
      case "stylesheet":
        e = Ia(a.href);
        var n = l.querySelector(
          ie(e)
        );
        if (n)
          return t.state.loading |= 4, t.instance = n, ol(n), n;
        u = H0(a), (e = wl.get(e)) && ri(u, e), n = (l.ownerDocument || l).createElement("link"), ol(n);
        var f = n;
        return f._p = new Promise(function(c, i) {
          f.onload = c, f.onerror = i;
        }), gl(n, "link", u), t.state.loading |= 4, Xe(n, a.precedence, l), t.instance = n;
      case "script":
        return n = fu(a.src), (e = l.querySelector(
          se(n)
        )) ? (t.instance = e, ol(e), e) : (u = a, (e = wl.get(n)) && (u = $({}, a), vi(u, e)), l = l.ownerDocument || l, e = l.createElement("script"), ol(e), gl(e, "link", u), l.head.appendChild(e), t.instance = e);
      case "void":
        return null;
      default:
        throw Error(b(443, t.type));
    }
  else
    t.type === "stylesheet" && !(t.state.loading & 4) && (u = t.instance, t.state.loading |= 4, Xe(u, a.precedence, l));
  return t.instance;
}
function Xe(l, t, a) {
  for (var u = a.querySelectorAll(
    'link[rel="stylesheet"][data-precedence],style[data-precedence]'
  ), e = u.length ? u[u.length - 1] : null, n = e, f = 0; f < u.length; f++) {
    var c = u[f];
    if (c.dataset.precedence === t) n = c;
    else if (n !== e) break;
  }
  n ? n.parentNode.insertBefore(l, n.nextSibling) : (t = a.nodeType === 9 ? a.head : a, t.insertBefore(l, t.firstChild));
}
function ri(l, t) {
  l.crossOrigin == null && (l.crossOrigin = t.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy), l.title == null && (l.title = t.title);
}
function vi(l, t) {
  l.crossOrigin == null && (l.crossOrigin = t.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy), l.integrity == null && (l.integrity = t.integrity);
}
var je = null;
function Gs(l, t, a) {
  if (je === null) {
    var u = /* @__PURE__ */ new Map(), e = je = /* @__PURE__ */ new Map();
    e.set(a, u);
  } else
    e = je, u = e.get(a), u || (u = /* @__PURE__ */ new Map(), e.set(a, u));
  if (u.has(l)) return u;
  for (u.set(l, null), a = a.getElementsByTagName(l), e = 0; e < a.length; e++) {
    var n = a[e];
    if (!(n[Iu] || n[Sl] || l === "link" && n.getAttribute("rel") === "stylesheet") && n.namespaceURI !== "http://www.w3.org/2000/svg") {
      var f = n.getAttribute(t) || "";
      f = l + f;
      var c = u.get(f);
      c ? c.push(n) : u.set(f, [n]);
    }
  }
  return u;
}
function Xs(l, t, a) {
  l = l.ownerDocument || l, l.head.insertBefore(
    a,
    t === "title" ? l.querySelector("head > title") : null
  );
}
function Uh(l, t, a) {
  if (a === 1 || t.itemProp != null) return !1;
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
function Y0(l) {
  return !(l.type === "stylesheet" && !(l.state.loading & 3));
}
var Vu = null;
function Nh() {
}
function Rh(l, t, a) {
  if (Vu === null) throw Error(b(475));
  var u = Vu;
  if (t.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && !(t.state.loading & 4)) {
    if (t.instance === null) {
      var e = Ia(a.href), n = l.querySelector(
        ie(e)
      );
      if (n) {
        l = n._p, l !== null && typeof l == "object" && typeof l.then == "function" && (u.count++, u = hn.bind(u), l.then(u, u)), t.state.loading |= 4, t.instance = n, ol(n);
        return;
      }
      n = l.ownerDocument || l, a = H0(a), (e = wl.get(e)) && ri(a, e), n = n.createElement("link"), ol(n);
      var f = n;
      f._p = new Promise(function(c, i) {
        f.onload = c, f.onerror = i;
      }), gl(n, "link", a), t.instance = n;
    }
    u.stylesheets === null && (u.stylesheets = /* @__PURE__ */ new Map()), u.stylesheets.set(t, l), (l = t.state.preload) && !(t.state.loading & 3) && (u.count++, t = hn.bind(u), l.addEventListener("load", t), l.addEventListener("error", t));
  }
}
function xh() {
  if (Vu === null) throw Error(b(475));
  var l = Vu;
  return l.stylesheets && l.count === 0 && yc(l, l.stylesheets), 0 < l.count ? function(t) {
    var a = setTimeout(function() {
      if (l.stylesheets && yc(l, l.stylesheets), l.unsuspend) {
        var u = l.unsuspend;
        l.unsuspend = null, u();
      }
    }, 6e4);
    return l.unsuspend = t, function() {
      l.unsuspend = null, clearTimeout(a);
    };
  } : null;
}
function hn() {
  if (this.count--, this.count === 0) {
    if (this.stylesheets) yc(this, this.stylesheets);
    else if (this.unsuspend) {
      var l = this.unsuspend;
      this.unsuspend = null, l();
    }
  }
}
var yn = null;
function yc(l, t) {
  l.stylesheets = null, l.unsuspend !== null && (l.count++, yn = /* @__PURE__ */ new Map(), t.forEach(Hh, l), yn = null, hn.call(l));
}
function Hh(l, t) {
  if (!(t.state.loading & 4)) {
    var a = yn.get(l);
    if (a) var u = a.get(null);
    else {
      a = /* @__PURE__ */ new Map(), yn.set(l, a);
      for (var e = l.querySelectorAll(
        "link[data-precedence],style[data-precedence]"
      ), n = 0; n < e.length; n++) {
        var f = e[n];
        (f.nodeName === "LINK" || f.getAttribute("media") !== "not all") && (a.set(f.dataset.precedence, f), u = f);
      }
      u && a.set(null, u);
    }
    e = t.instance, f = e.getAttribute("data-precedence"), n = a.get(f) || u, n === u && a.set(null, e), a.set(f, e), this.count++, u = hn.bind(this), e.addEventListener("load", u), e.addEventListener("error", u), n ? n.parentNode.insertBefore(e, n.nextSibling) : (l = l.nodeType === 9 ? l.head : l, l.insertBefore(e, l.firstChild)), t.state.loading |= 4;
  }
}
var Ku = {
  $$typeof: dt,
  Provider: null,
  Consumer: null,
  _currentValue: ta,
  _currentValue2: ta,
  _threadCount: 0
};
function Yh(l, t, a, u, e, n, f, c) {
  this.tag = 1, this.containerInfo = l, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Vn(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Vn(0), this.hiddenUpdates = Vn(null), this.identifierPrefix = u, this.onUncaughtError = e, this.onCaughtError = n, this.onRecoverableError = f, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.incompleteTransitions = /* @__PURE__ */ new Map();
}
function B0(l, t, a, u, e, n, f, c, i, o, m, y) {
  return l = new Yh(
    l,
    t,
    a,
    f,
    c,
    i,
    o,
    y
  ), t = 1, n === !0 && (t |= 24), n = xl(3, null, null, t), l.current = n, n.stateNode = l, t = Cc(), t.refCount++, l.pooledCache = t, t.refCount++, n.memoizedState = {
    element: u,
    isDehydrated: a,
    cache: t
  }, Vc(n), l;
}
function q0(l) {
  return l ? (l = Na, l) : Na;
}
function G0(l, t, a, u, e, n) {
  e = q0(e), u.context === null ? u.context = e : u.pendingContext = e, u = qt(t), u.payload = { element: a }, n = n === void 0 ? null : n, n !== null && (u.callback = n), a = Gt(l, u, t), a !== null && (ql(a, l, t), _u(a, l, t));
}
function js(l, t) {
  if (l = l.memoizedState, l !== null && l.dehydrated !== null) {
    var a = l.retryLane;
    l.retryLane = a !== 0 && a < t ? a : t;
  }
}
function hi(l, t) {
  js(l, t), (l = l.alternate) && js(l, t);
}
function X0(l) {
  if (l.tag === 13) {
    var t = uu(l, 67108864);
    t !== null && ql(t, l, 67108864), hi(l, 67108864);
  }
}
var mn = !0;
function Bh(l, t, a, u) {
  var e = D.T;
  D.T = null;
  var n = Q.p;
  try {
    Q.p = 2, yi(l, t, a, u);
  } finally {
    Q.p = n, D.T = e;
  }
}
function qh(l, t, a, u) {
  var e = D.T;
  D.T = null;
  var n = Q.p;
  try {
    Q.p = 8, yi(l, t, a, u);
  } finally {
    Q.p = n, D.T = e;
  }
}
function yi(l, t, a, u) {
  if (mn) {
    var e = mc(u);
    if (e === null)
      Tf(
        l,
        t,
        u,
        gn,
        a
      ), Qs(l, u);
    else if (Xh(
      e,
      l,
      t,
      a,
      u
    ))
      u.stopPropagation();
    else if (Qs(l, u), t & 4 && -1 < Gh.indexOf(l)) {
      for (; e !== null; ) {
        var n = au(e);
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
                  et(n), !(Z & 6) && (fn = tt() + 500, ce(0));
                }
              }
              break;
            case 13:
              c = uu(n, 2), c !== null && ql(c, n, 2), xn(), hi(n, 2);
          }
        if (n = mc(u), n === null && Tf(
          l,
          t,
          u,
          gn,
          a
        ), n === e) break;
        e = n;
      }
      e !== null && u.stopPropagation();
    } else
      Tf(
        l,
        t,
        u,
        null,
        a
      );
  }
}
function mc(l) {
  return l = Rc(l), mi(l);
}
var gn = null;
function mi(l) {
  if (gn = null, l = pa(l), l !== null) {
    var t = $u(l);
    if (t === null) l = null;
    else {
      var a = t.tag;
      if (a === 13) {
        if (l = id(t), l !== null) return l;
        l = null;
      } else if (a === 3) {
        if (t.stateNode.current.memoizedState.isDehydrated)
          return t.tag === 3 ? t.stateNode.containerInfo : null;
        l = null;
      } else t !== l && (l = null);
    }
  }
  return gn = l, null;
}
function j0(l) {
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
      switch (Ar()) {
        case rd:
          return 2;
        case vd:
          return 8;
        case Ke:
        case zr:
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
var gc = !1, Qt = null, Ct = null, Zt = null, Lu = /* @__PURE__ */ new Map(), Ju = /* @__PURE__ */ new Map(), Nt = [], Gh = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
  " "
);
function Qs(l, t) {
  switch (l) {
    case "focusin":
    case "focusout":
      Qt = null;
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
      Lu.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Ju.delete(t.pointerId);
  }
}
function hu(l, t, a, u, e, n) {
  return l === null || l.nativeEvent !== n ? (l = {
    blockedOn: t,
    domEventName: a,
    eventSystemFlags: u,
    nativeEvent: n,
    targetContainers: [e]
  }, t !== null && (t = au(t), t !== null && X0(t)), l) : (l.eventSystemFlags |= u, t = l.targetContainers, e !== null && t.indexOf(e) === -1 && t.push(e), l);
}
function Xh(l, t, a, u, e) {
  switch (t) {
    case "focusin":
      return Qt = hu(
        Qt,
        l,
        t,
        a,
        u,
        e
      ), !0;
    case "dragenter":
      return Ct = hu(
        Ct,
        l,
        t,
        a,
        u,
        e
      ), !0;
    case "mouseover":
      return Zt = hu(
        Zt,
        l,
        t,
        a,
        u,
        e
      ), !0;
    case "pointerover":
      var n = e.pointerId;
      return Lu.set(
        n,
        hu(
          Lu.get(n) || null,
          l,
          t,
          a,
          u,
          e
        )
      ), !0;
    case "gotpointercapture":
      return n = e.pointerId, Ju.set(
        n,
        hu(
          Ju.get(n) || null,
          l,
          t,
          a,
          u,
          e
        )
      ), !0;
  }
  return !1;
}
function Q0(l) {
  var t = pa(l.target);
  if (t !== null) {
    var a = $u(t);
    if (a !== null) {
      if (t = a.tag, t === 13) {
        if (t = id(a), t !== null) {
          l.blockedOn = t, Rr(l.priority, function() {
            if (a.tag === 13) {
              var u = Bl();
              u = Mc(u);
              var e = uu(a, u);
              e !== null && ql(e, a, u), hi(a, u);
            }
          });
          return;
        }
      } else if (t === 3 && a.stateNode.current.memoizedState.isDehydrated) {
        l.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null;
        return;
      }
    }
  }
  l.blockedOn = null;
}
function Qe(l) {
  if (l.blockedOn !== null) return !1;
  for (var t = l.targetContainers; 0 < t.length; ) {
    var a = mc(l.nativeEvent);
    if (a === null) {
      a = l.nativeEvent;
      var u = new a.constructor(
        a.type,
        a
      );
      Yf = u, a.target.dispatchEvent(u), Yf = null;
    } else
      return t = au(a), t !== null && X0(t), l.blockedOn = a, !1;
    t.shift();
  }
  return !0;
}
function Cs(l, t, a) {
  Qe(l) && a.delete(t);
}
function jh() {
  gc = !1, Qt !== null && Qe(Qt) && (Qt = null), Ct !== null && Qe(Ct) && (Ct = null), Zt !== null && Qe(Zt) && (Zt = null), Lu.forEach(Cs), Ju.forEach(Cs);
}
function _e(l, t) {
  l.blockedOn === t && (l.blockedOn = null, gc || (gc = !0, il.unstable_scheduleCallback(
    il.unstable_NormalPriority,
    jh
  )));
}
var Oe = null;
function Zs(l) {
  Oe !== l && (Oe = l, il.unstable_scheduleCallback(
    il.unstable_NormalPriority,
    function() {
      Oe === l && (Oe = null);
      for (var t = 0; t < l.length; t += 3) {
        var a = l[t], u = l[t + 1], e = l[t + 2];
        if (typeof u != "function") {
          if (mi(u || a) === null)
            continue;
          break;
        }
        var n = au(a);
        n !== null && (l.splice(t, 3), t -= 3, kf(
          n,
          {
            pending: !0,
            data: e,
            method: a.method,
            action: u
          },
          u,
          e
        ));
      }
    }
  ));
}
function wu(l) {
  function t(i) {
    return _e(i, l);
  }
  Qt !== null && _e(Qt, l), Ct !== null && _e(Ct, l), Zt !== null && _e(Zt, l), Lu.forEach(t), Ju.forEach(t);
  for (var a = 0; a < Nt.length; a++) {
    var u = Nt[a];
    u.blockedOn === l && (u.blockedOn = null);
  }
  for (; 0 < Nt.length && (a = Nt[0], a.blockedOn === null); )
    Q0(a), a.blockedOn === null && Nt.shift();
  if (a = (l.ownerDocument || l).$$reactFormReplay, a != null)
    for (u = 0; u < a.length; u += 3) {
      var e = a[u], n = a[u + 1], f = e[Ml] || null;
      if (typeof n == "function")
        f || Zs(a);
      else if (f) {
        var c = null;
        if (n && n.hasAttribute("formAction")) {
          if (e = n, f = n[Ml] || null)
            c = f.formAction;
          else if (mi(e) !== null) continue;
        } else c = f.action;
        typeof c == "function" ? a[u + 1] = c : (a.splice(u, 3), u -= 3), Zs(a);
      }
    }
}
function gi(l) {
  this._internalRoot = l;
}
qn.prototype.render = gi.prototype.render = function(l) {
  var t = this._internalRoot;
  if (t === null) throw Error(b(409));
  var a = t.current, u = Bl();
  G0(a, u, l, t, null, null);
};
qn.prototype.unmount = gi.prototype.unmount = function() {
  var l = this._internalRoot;
  if (l !== null) {
    this._internalRoot = null;
    var t = l.containerInfo;
    G0(l.current, 2, null, l, null, null), xn(), t[tu] = null;
  }
};
function qn(l) {
  this._internalRoot = l;
}
qn.prototype.unstable_scheduleHydration = function(l) {
  if (l) {
    var t = Sd();
    l = { blockedOn: null, target: l, priority: t };
    for (var a = 0; a < Nt.length && t !== 0 && t < Nt[a].priority; a++) ;
    Nt.splice(a, 0, l), a === 0 && Q0(l);
  }
};
var Vs = fd.version;
if (Vs !== "19.1.1")
  throw Error(
    b(
      527,
      Vs,
      "19.1.1"
    )
  );
Q.findDOMNode = function(l) {
  var t = l._reactInternals;
  if (t === void 0)
    throw typeof l.render == "function" ? Error(b(188)) : (l = Object.keys(l).join(","), Error(b(268, l)));
  return l = yr(t), l = l !== null ? sd(l) : null, l = l === null ? null : l.stateNode, l;
};
var Qh = {
  bundleType: 0,
  version: "19.1.1",
  rendererPackageName: "react-dom",
  currentDispatcherRef: D,
  reconcilerVersion: "19.1.1"
};
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Me = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Me.isDisabled && Me.supportsFiber)
    try {
      Wu = Me.inject(
        Qh
      ), Hl = Me;
    } catch {
    }
}
En.createRoot = function(l, t) {
  if (!cd(l)) throw Error(b(299));
  var a = !1, u = "", e = Bo, n = qo, f = Go, c = null;
  return t != null && (t.unstable_strictMode === !0 && (a = !0), t.identifierPrefix !== void 0 && (u = t.identifierPrefix), t.onUncaughtError !== void 0 && (e = t.onUncaughtError), t.onCaughtError !== void 0 && (n = t.onCaughtError), t.onRecoverableError !== void 0 && (f = t.onRecoverableError), t.unstable_transitionCallbacks !== void 0 && (c = t.unstable_transitionCallbacks)), t = B0(
    l,
    1,
    !1,
    null,
    null,
    a,
    u,
    e,
    n,
    f,
    c,
    null
  ), l[tu] = t.current, oi(l), new gi(t);
};
En.hydrateRoot = function(l, t, a) {
  if (!cd(l)) throw Error(b(299));
  var u = !1, e = "", n = Bo, f = qo, c = Go, i = null, o = null;
  return a != null && (a.unstable_strictMode === !0 && (u = !0), a.identifierPrefix !== void 0 && (e = a.identifierPrefix), a.onUncaughtError !== void 0 && (n = a.onUncaughtError), a.onCaughtError !== void 0 && (f = a.onCaughtError), a.onRecoverableError !== void 0 && (c = a.onRecoverableError), a.unstable_transitionCallbacks !== void 0 && (i = a.unstable_transitionCallbacks), a.formState !== void 0 && (o = a.formState)), t = B0(
    l,
    1,
    !0,
    t,
    a ?? null,
    u,
    e,
    n,
    f,
    c,
    i,
    o
  ), t.context = q0(null), a = t.current, u = Bl(), u = Mc(u), e = qt(u), e.callback = null, Gt(a, e, u), a = u, t.current.lanes = a, Fu(t, a), et(t), l[tu] = t.current, oi(l), new qn(t);
};
En.version = "19.1.1";
function C0() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(C0);
    } catch (l) {
      console.error(l);
    }
}
C0(), ld.exports = En;
var Ch = ld.exports;
function Zh() {
  return {
    bridge: {},
    commandHandlers: /* @__PURE__ */ new Map(),
    instances: /* @__PURE__ */ new Map()
  };
}
function bi() {
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
  setState(t, a) {
    this.states.set(t, a), this.saveToStorage(), this.notifySubscribers(t, a);
  }
  /**
   * Subscribe to state changes for a specific widget.
   * Returns an unsubscribe function.
   */
  subscribe(t, a) {
    return this.subscribers.has(t) || this.subscribers.set(t, /* @__PURE__ */ new Set()), this.subscribers.get(t).add(a), () => {
      const u = this.subscribers.get(t);
      u && (u.delete(a), u.size === 0 && this.subscribers.delete(t));
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
  notifySubscribers(t, a) {
    const u = this.subscribers.get(t);
    u && u.size > 0 && u.forEach((e) => {
      try {
        e(a);
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
          const a = JSON.parse(t);
          Object.entries(a).forEach(([u, e]) => {
            this.states.set(u, e);
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
        this.states.forEach((a, u) => {
          t[u] = a;
        }), localStorage.setItem(this.storageKey, JSON.stringify(t));
      } catch (t) {
        console.warn("[WidgetStore] Failed to save to localStorage:", t);
      }
  }
}
const bc = bi(), Z0 = bc.instances.get("widget-store") ?? new Vh();
bc.instances.has("widget-store") || bc.instances.set("widget-store", Z0);
const bn = Z0;
var Kh = {};
const V0 = bi(), K0 = (l) => `${l}:settings`;
function Gn() {
  return V0.bridge;
}
function Lh() {
  return V0.commandHandlers;
}
function Jh(l) {
  const t = Gn();
  return t.getWidgetSettings ? t.getWidgetSettings(l) : bn.getState(K0(l));
}
function wh(l, t) {
  const a = Gn();
  if (a.setWidgetSettings) {
    a.setWidgetSettings(l, t);
    return;
  }
  bn.setState(K0(l), t);
}
function $h(l) {
  const t = Gn();
  if (!t.beforePublishEvent) return !0;
  try {
    return t.beforePublishEvent(l);
  } catch (a) {
    return typeof Kh > "u" && console.warn("[host-bridge] beforePublishEvent failed; dropping event", a), !1;
  }
}
function Wh(l, t) {
  const a = Gn();
  if (a.registerWidgetCommandHandler)
    return a.registerWidgetCommandHandler(l, t);
  const u = Lh();
  return u.set(l, t), () => {
    u.get(l) === t && u.delete(l);
  };
}
const Pa = bi();
Pa.instances.has("event-subscribers") || Pa.instances.set("event-subscribers", /* @__PURE__ */ new Map());
class kh {
  get subscribers() {
    return Pa.instances.get("event-subscribers");
  }
  /**
   * Publish an event from a widget.
   * Event type is automatically namespaced as `widgetId:eventType`.
   */
  publish(t, a, u) {
    const e = {
      widgetId: t,
      type: a,
      data: u,
      timestamp: Date.now()
    };
    if (!$h(e))
      return;
    const n = `${t}:${a}`, f = this.subscribers.get(n);
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
  subscribe(t, a, u) {
    const e = `${t}:${a}`;
    return this.subscribers.has(e) || this.subscribers.set(e, /* @__PURE__ */ new Set()), this.subscribers.get(e).add(u), () => {
      const n = this.subscribers.get(e);
      n && (n.delete(u), n.size === 0 && this.subscribers.delete(e));
    };
  }
  /**
   * Clear all subscriptions (useful for cleanup in tests).
   */
  clear() {
    this.subscribers.clear();
  }
}
const L0 = Pa.instances.get("event-bus") ?? new kh();
Pa.instances.has("event-bus") || Pa.instances.set("event-bus", L0);
const Ft = L0, Fh = "widget-ready", Ih = "widget-error";
function Ph(l) {
  l.dispatchEvent(new CustomEvent(Fh, { bubbles: !0 }));
}
function ly(l, t) {
  const a = { reason: t };
  l.dispatchEvent(
    new CustomEvent(Ih, { bubbles: !0, detail: a })
  );
}
const Xl = "notes";
function Ks(l) {
  return l.split(",").map((t) => t.trim().toLowerCase()).filter(Boolean).slice(0, 5);
}
function ty(l, t) {
  return typeof l != "string" ? t : l.trim() || t;
}
function ay() {
  const [l, t] = bl.useState(
    () => bn.getState(Xl) ?? []
  ), a = bl.useRef(l), [u, e] = bl.useState(""), [n, f] = bl.useState(""), [c, i] = bl.useState(null), [o, m] = bl.useState(""), [y, r] = bl.useState(""), [h, _] = bl.useState("all"), [p, q] = bl.useState(() => !!Jh(Xl)?.showArchived);
  bl.useEffect(() => {
    const S = Ft.subscribe(
      "host",
      "settings-updated",
      (H) => {
        const { widgetId: J, settings: hl } = H.data;
        J === Xl && hl.showArchived !== void 0 && q(hl.showArchived);
      }
    ), z = Wh(
      Xl,
      async (H) => {
        const { commandType: J, payload: hl } = H;
        if (J === "note.create") {
          const $t = ty(
            typeof hl?.text == "string" ? hl.text : typeof hl?.title == "string" ? hl.title : void 0,
            "Automated Note"
          ), nt = typeof hl?.tags == "string" ? Ks(hl.tags) : Array.isArray(hl?.tags) ? hl.tags.filter((M) => typeof M == "string").map((M) => M.trim().toLowerCase()).filter(Boolean).slice(0, 5) : [], E = {
            id: String(Date.now()),
            text: $t,
            tags: nt,
            pinned: !1,
            archived: !1,
            updatedAt: Date.now()
          };
          return t((M) => [E, ...M]), Ft.publish(Xl, "note-added", { note: E }), { ok: !0, result: { noteId: E.id } };
        }
        if (J === "note.pin-latest") {
          const $t = a.current;
          if ($t.length === 0)
            return {
              ok: !1,
              code: "COMMAND_TARGET_NOT_FOUND",
              reason: "No notes available to pin"
            };
          let nt = $t[0];
          for (const M of $t)
            M.updatedAt > nt.updatedAt && (nt = M);
          const E = {
            ...nt,
            pinned: !0,
            updatedAt: Date.now()
          };
          return t(
            (M) => M.map(
              (N) => N.id === E.id ? E : N
            )
          ), Ft.publish(Xl, "note-updated", {
            note: E
          }), { ok: !0, result: { noteId: E.id } };
        }
        return {
          ok: !1,
          code: "COMMAND_ACTION_NOT_SUPPORTED",
          reason: `notes does not support ${J}`
        };
      }
    );
    return () => {
      S(), z();
    };
  }, []), bl.useEffect(() => {
    a.current = l, bn.setState(Xl, l);
  }, [l]), bl.useEffect(() => {
    wh(Xl, { showArchived: p });
  }, [p]);
  const d = bl.useMemo(() => l.filter((S) => p ? !0 : !S.archived).filter(
    (S) => y ? S.text.toLowerCase().includes(y.toLowerCase()) : !0
  ).filter(
    (S) => h === "all" ? !0 : S.tags.includes(h)
  ).sort(
    (S, z) => Number(z.pinned) - Number(S.pinned) || z.updatedAt - S.updatedAt
  ), [h, l, y, p]), s = bl.useMemo(() => {
    const S = /* @__PURE__ */ new Set();
    for (const z of l)
      for (const H of z.tags)
        S.add(H);
    return ["all", ...Array.from(S.values()).sort()];
  }, [l]), v = () => {
    const S = u.trim();
    if (!S) return;
    const z = {
      id: String(Date.now()),
      text: S,
      tags: Ks(n),
      pinned: !1,
      archived: !1,
      updatedAt: Date.now()
    };
    t((H) => [z, ...H]), e(""), f(""), Ft.publish(Xl, "note-added", { note: z });
  }, g = (S) => {
    t((z) => z.filter((H) => H.id !== S));
  }, T = (S) => {
    t(
      (z) => z.map((H) => {
        if (H.id !== S) return H;
        const J = { ...H, pinned: !H.pinned, updatedAt: Date.now() };
        return Ft.publish(Xl, "note-updated", { note: J }), J;
      })
    );
  }, U = (S) => {
    t(
      (z) => z.map((H) => {
        if (H.id !== S) return H;
        const J = {
          ...H,
          archived: !H.archived,
          updatedAt: Date.now()
        };
        return Ft.publish(
          Xl,
          J.archived ? "note-archived" : "note-updated",
          J.archived ? { id: S } : { note: J }
        ), J;
      })
    );
  }, A = (S) => {
    i(S.id), m(S.text);
  }, O = (S) => {
    const z = o.trim();
    z && (t(
      (H) => H.map((J) => {
        if (J.id !== S) return J;
        const hl = { ...J, text: z, updatedAt: Date.now() };
        return Ft.publish(Xl, "note-updated", { note: hl }), hl;
      })
    ), i(null), m(""));
  };
  return /* @__PURE__ */ X.jsxs(
    "div",
    {
      style: {
        fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 8
      },
      children: [
        /* @__PURE__ */ X.jsxs("div", { className: "compose-block", children: [
          /* @__PURE__ */ X.jsxs("div", { className: "note-input-row", children: [
            /* @__PURE__ */ X.jsx(
              "textarea",
              {
                className: "note-textarea",
                rows: 2,
                value: u,
                onChange: (S) => e(S.target.value),
                onInput: (S) => {
                  const z = S.currentTarget;
                  z.style.height = "auto", z.style.height = z.scrollHeight + "px";
                },
                onKeyDown: (S) => {
                  S.key === "Enter" && (S.ctrlKey || S.metaKey) && (S.preventDefault(), v());
                },
                placeholder: "Write a note… (Ctrl+Enter to add)"
              }
            ),
            /* @__PURE__ */ X.jsx("button", { className: "note-btn", onClick: v, children: "Add" })
          ] }),
          /* @__PURE__ */ X.jsxs("div", { className: "tags-input-row", children: [
            /* @__PURE__ */ X.jsx("span", { className: "tags-label", children: "Tags:" }),
            /* @__PURE__ */ X.jsx(
              "input",
              {
                className: "note-input tags-input",
                placeholder: "comma separated",
                value: n,
                onChange: (S) => f(S.target.value)
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ X.jsxs("div", { className: "note-toolbar", children: [
          /* @__PURE__ */ X.jsx(
            "input",
            {
              className: "note-input",
              placeholder: "Search…",
              value: y,
              onChange: (S) => r(S.target.value)
            }
          ),
          /* @__PURE__ */ X.jsx(
            "select",
            {
              className: "note-input tag-select",
              value: h,
              onChange: (S) => _(S.target.value),
              children: s.map((S) => /* @__PURE__ */ X.jsx("option", { value: S, children: S === "all" ? "All tags" : `#${S}` }, S))
            }
          ),
          /* @__PURE__ */ X.jsxs("label", { className: "archive-toggle", children: [
            /* @__PURE__ */ X.jsx(
              "input",
              {
                type: "checkbox",
                checked: p,
                onChange: (S) => q(S.target.checked)
              }
            ),
            "📦"
          ] })
        ] }),
        /* @__PURE__ */ X.jsx("ul", { className: "note-list", children: d.map((S) => /* @__PURE__ */ X.jsxs(
          "li",
          {
            className: `note-item ${S.archived ? "archived" : ""}`,
            children: [
              /* @__PURE__ */ X.jsxs("div", { className: "note-body", children: [
                S.pinned && /* @__PURE__ */ X.jsx("span", { className: "pin-indicator", children: "📌 " }),
                c === S.id ? /* @__PURE__ */ X.jsxs(X.Fragment, { children: [
                  /* @__PURE__ */ X.jsx(
                    "textarea",
                    {
                      className: "note-textarea edit-textarea",
                      rows: 3,
                      value: o,
                      onChange: (z) => m(z.target.value),
                      onInput: (z) => {
                        const H = z.currentTarget;
                        H.style.height = "auto", H.style.height = H.scrollHeight + "px";
                      },
                      autoFocus: !0
                    }
                  ),
                  /* @__PURE__ */ X.jsxs("div", { className: "edit-actions", children: [
                    /* @__PURE__ */ X.jsx("button", { className: "note-btn save-btn", onClick: () => O(S.id), children: "Save" }),
                    /* @__PURE__ */ X.jsx("button", { className: "btn-ghost", onClick: () => {
                      i(null), m("");
                    }, children: "Cancel" })
                  ] })
                ] }) : /* @__PURE__ */ X.jsx("span", { className: "note-text", children: S.text }),
                S.tags.length > 0 && /* @__PURE__ */ X.jsx("div", { className: "note-tags", children: S.tags.map((z) => /* @__PURE__ */ X.jsxs("span", { className: "note-tag", children: [
                  "#",
                  z
                ] }, `${S.id}:${z}`)) })
              ] }),
              c !== S.id && /* @__PURE__ */ X.jsxs("div", { className: "note-actions", children: [
                /* @__PURE__ */ X.jsx("button", { className: "btn-ghost", onClick: () => A(S), children: "Edit" }),
                /* @__PURE__ */ X.jsx("button", { className: "btn-ghost", onClick: () => T(S.id), children: S.pinned ? "Unpin" : "Pin" }),
                /* @__PURE__ */ X.jsx("button", { className: "btn-ghost", onClick: () => U(S.id), children: S.archived ? "Unarchive" : "Archive" }),
                /* @__PURE__ */ X.jsx("button", { className: "btn-ghost btn-delete", onClick: () => g(S.id), children: "Delete" })
              ] })
            ]
          },
          S.id
        )) })
      ]
    }
  );
}
class uy extends HTMLElement {
  #l = null;
  connectedCallback() {
    try {
      const t = this.shadowRoot ?? this.attachShadow({ mode: "open" });
      let a = t.querySelector(
        '[data-widget-root="notes"]'
      );
      if (!a) {
        const u = document.createElement("style");
        u.textContent = `:host{display:block;height:100%}
          .note-surface{
            background: linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%);
            border-radius:16px;
            padding:12px;
            height:100%;
            box-sizing:border-box;
            display:flex;
            flex-direction:column;
            border:1px solid rgba(245,158,11,0.2);
          }
          .compose-block{
            display:flex;
            flex-direction:column;
            gap:4px;
            margin-bottom:2px;
          }
          .note-input-row{
            display:flex;
            gap:8px;
            align-items:flex-start;
          }
          .note-textarea{
            flex:1;
            min-width:0;
            padding:6px 9px;
            border:1px solid rgba(245,158,11,0.25);
            border-radius:10px;
            background:rgba(255,255,255,0.95);
            color:#1f2937;
            font-size:0.85rem;
            font-family:inherit;
            resize:vertical;
            line-height:1.4;
            max-height:200px;
            overflow-y:auto;
            box-sizing:border-box;
          }
          .edit-textarea{
            width:100%;
            box-sizing:border-box;
            margin-bottom:4px;
          }
          .tags-input-row{
            display:flex;
            align-items:center;
            gap:6px;
          }
          .tags-label{
            font-size:0.75rem;
            color:#92400e;
            white-space:nowrap;
            font-weight:500;
          }
          .tags-input{
            flex:1;
            min-width:0;
          }
          .note-input{
            padding:5px 8px;
            border:1px solid rgba(245,158,11,0.25);
            border-radius:10px;
            background:rgba(255,255,255,0.95);
            color:#1f2937;
            font-size:0.82rem;
            font-family:inherit;
          }
          .note-toolbar{
            display:flex;
            gap:6px;
            align-items:center;
            margin-bottom:2px;
          }
          .note-toolbar .note-input{
            flex:1;
            min-width:0;
          }
          .tag-select{
            flex:0 0 110px;
            width:110px;
          }
          .note-btn{
            border:1px solid rgba(245,158,11,0.2);
            border-radius:10px;
            padding:6px 12px;
            background:#d97706;
            color:#fff;
            cursor:pointer;
            font-size:0.82rem;
            white-space:nowrap;
            align-self:stretch;
          }
          .save-btn{
            padding:5px 10px;
            font-size:0.78rem;
          }
          .edit-actions{
            display:flex;
            gap:6px;
            align-items:center;
          }
          .archive-toggle{
            display:flex;
            align-items:center;
            gap:4px;
            font-size:1rem;
            color:#92400e;
            cursor:pointer;
            white-space:nowrap;
            padding:3px;
          }
          .note-list{
            list-style:none;
            margin:0;
            padding:0;
            display:flex;
            flex-direction:column;
            gap:5px;
            overflow-y:auto;
            min-height:0;
            flex:1;
          }
          .note-item{
            background:rgba(255,255,255,0.85);
            border:1px solid rgba(245,158,11,0.2);
            border-radius:10px;
            padding:6px 10px;
            display:flex;
            flex-direction:column;
          }
          .note-item.archived{
            opacity:0.6;
          }
          .note-item.archived .note-text{
            text-decoration:line-through;
          }
          .note-body{
            min-width:0;
            display:flex;
            flex-direction:column;
            gap:5px;
            color:#1f2937;
          }
          .pin-indicator{
            font-size:0.75rem;
          }
          .note-text{
            font-size:0.85rem;
            white-space:pre-wrap;
            word-break:break-word;
            line-height:1.4;
            color:#1f2937;
          }
          .note-tags{
            display:flex;
            flex-wrap:wrap;
            gap:4px;
          }
          .note-tag{
            background:rgba(245,158,11,0.15);
            border:1px solid rgba(245,158,11,0.2);
            border-radius:999px;
            padding:1px 7px;
            font-size:0.7rem;
            color:#92400e;
          }
          .note-actions{
            display:flex;
            flex-direction:row;
            flex-wrap:wrap;
            gap:4px;
            margin-top:6px;
            padding-top:6px;
            border-top:1px solid rgba(245,158,11,0.15);
          }
          .btn-ghost{
            background:transparent;
            border:1px solid rgba(245,158,11,0.3);
            color:#92400e;
            border-radius:8px;
            padding:3px 8px;
            font-size:0.72rem;
            cursor:pointer;
          }
          .btn-delete{
            margin-left:auto;
            border-color:rgba(220,38,38,0.3);
            color:#b91c1c;
          }`, t.appendChild(u);
        const e = document.createElement("div");
        e.className = "note-surface", e.style.height = "100%", a = document.createElement("div"), a.dataset.widgetRoot = "notes", a.style.height = "100%", e.appendChild(a), t.appendChild(e);
      }
      this.#l = Ch.createRoot(a), this.#l.render(/* @__PURE__ */ X.jsx(ay, {})), queueMicrotask(() => Ph(this));
    } catch (t) {
      ly(this, t instanceof Error ? t.message : "mount-error");
    }
  }
  disconnectedCallback() {
    try {
      this.#l?.unmount(), this.#l = null;
    } catch {
    }
  }
}
customElements.get("mb-notes") || customElements.define("mb-notes", uy);
