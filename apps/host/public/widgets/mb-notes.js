var B0 = { exports: {} }, yn = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Yv = Symbol.for("react.transitional.element"), qv = Symbol.for("react.fragment");
function G0(l, t, u) {
  var a = null;
  if (u !== void 0 && (a = "" + u), t.key !== void 0 && (a = "" + t.key), "key" in t) {
    u = {};
    for (var e in t)
      e !== "key" && (u[e] = t[e]);
  } else u = t;
  return t = u.ref, {
    $$typeof: Yv,
    type: l,
    key: a,
    ref: t !== void 0 ? t : null,
    props: u
  };
}
yn.Fragment = qv;
yn.jsx = G0;
yn.jsxs = G0;
B0.exports = yn;
var at = B0.exports, X0 = { exports: {} }, D = {}, pn = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var dc = Symbol.for("react.transitional.element"), xv = Symbol.for("react.portal"), Bv = Symbol.for("react.fragment"), Gv = Symbol.for("react.strict_mode"), Xv = Symbol.for("react.profiler"), Qv = Symbol.for("react.consumer"), Zv = Symbol.for("react.context"), jv = Symbol.for("react.forward_ref"), Cv = Symbol.for("react.suspense"), Vv = Symbol.for("react.memo"), Q0 = Symbol.for("react.lazy"), di = Symbol.iterator;
function Lv(l) {
  return l === null || typeof l != "object" ? null : (l = di && l[di] || l["@@iterator"], typeof l == "function" ? l : null);
}
var Z0 = {
  isMounted: function() {
    return !1;
  },
  enqueueForceUpdate: function() {
  },
  enqueueReplaceState: function() {
  },
  enqueueSetState: function() {
  }
}, j0 = Object.assign, C0 = {};
function wu(l, t, u) {
  this.props = l, this.context = t, this.refs = C0, this.updater = u || Z0;
}
wu.prototype.isReactComponent = {};
wu.prototype.setState = function(l, t) {
  if (typeof l != "object" && typeof l != "function" && l != null)
    throw Error(
      "takes an object of state variables to update or a function which returns an object of state variables."
    );
  this.updater.enqueueSetState(this, l, t, "setState");
};
wu.prototype.forceUpdate = function(l) {
  this.updater.enqueueForceUpdate(this, l, "forceUpdate");
};
function V0() {
}
V0.prototype = wu.prototype;
function yc(l, t, u) {
  this.props = l, this.context = t, this.refs = C0, this.updater = u || Z0;
}
var hc = yc.prototype = new V0();
hc.constructor = yc;
j0(hc, wu.prototype);
hc.isPureReactComponent = !0;
var yi = Array.isArray, J = { H: null, A: null, T: null, S: null, V: null }, L0 = Object.prototype.hasOwnProperty;
function oc(l, t, u, a, e, n) {
  return u = n.ref, {
    $$typeof: dc,
    type: l,
    key: t,
    ref: u !== void 0 ? u : null,
    props: n
  };
}
function Kv(l, t) {
  return oc(
    l.type,
    t,
    void 0,
    void 0,
    void 0,
    l.props
  );
}
function mc(l) {
  return typeof l == "object" && l !== null && l.$$typeof === dc;
}
function Jv(l) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + l.replace(/[=:]/g, function(u) {
    return t[u];
  });
}
var hi = /\/+/g;
function Yn(l, t) {
  return typeof l == "object" && l !== null && l.key != null ? Jv("" + l.key) : t.toString(36);
}
function oi() {
}
function wv(l) {
  switch (l.status) {
    case "fulfilled":
      return l.value;
    case "rejected":
      throw l.reason;
    default:
      switch (typeof l.status == "string" ? l.then(oi, oi) : (l.status = "pending", l.then(
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
function yu(l, t, u, a, e) {
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
          case dc:
          case xv:
            f = !0;
            break;
          case Q0:
            return f = l._init, yu(
              f(l._payload),
              t,
              u,
              a,
              e
            );
        }
    }
  if (f)
    return e = e(l), f = a === "" ? "." + Yn(l, 0) : a, yi(e) ? (u = "", f != null && (u = f.replace(hi, "$&/") + "/"), yu(e, t, u, "", function(d) {
      return d;
    })) : e != null && (mc(e) && (e = Kv(
      e,
      u + (e.key == null || l && l.key === e.key ? "" : ("" + e.key).replace(
        hi,
        "$&/"
      ) + "/") + f
    )), t.push(e)), 1;
  f = 0;
  var c = a === "" ? "." : a + ":";
  if (yi(l))
    for (var i = 0; i < l.length; i++)
      a = l[i], n = c + Yn(a, i), f += yu(
        a,
        t,
        u,
        n,
        e
      );
  else if (i = Lv(l), typeof i == "function")
    for (l = i.call(l), i = 0; !(a = l.next()).done; )
      a = a.value, n = c + Yn(a, i++), f += yu(
        a,
        t,
        u,
        n,
        e
      );
  else if (n === "object") {
    if (typeof l.then == "function")
      return yu(
        wv(l),
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
function ce(l, t, u) {
  if (l == null) return l;
  var a = [], e = 0;
  return yu(l, a, "", "", function(n) {
    return t.call(u, n, e++);
  }), a;
}
function $v(l) {
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
var mi = typeof reportError == "function" ? reportError : function(l) {
  if (typeof window == "object" && typeof window.ErrorEvent == "function") {
    var t = new window.ErrorEvent("error", {
      bubbles: !0,
      cancelable: !0,
      message: typeof l == "object" && l !== null && typeof l.message == "string" ? String(l.message) : String(l),
      error: l
    });
    if (!window.dispatchEvent(t)) return;
  } else if (typeof pn == "object" && typeof pn.emit == "function") {
    pn.emit("uncaughtException", l);
    return;
  }
  console.error(l);
};
function Wv() {
}
D.Children = {
  map: ce,
  forEach: function(l, t, u) {
    ce(
      l,
      function() {
        t.apply(this, arguments);
      },
      u
    );
  },
  count: function(l) {
    var t = 0;
    return ce(l, function() {
      t++;
    }), t;
  },
  toArray: function(l) {
    return ce(l, function(t) {
      return t;
    }) || [];
  },
  only: function(l) {
    if (!mc(l))
      throw Error(
        "React.Children.only expected to receive a single React element child."
      );
    return l;
  }
};
D.Component = wu;
D.Fragment = Bv;
D.Profiler = Xv;
D.PureComponent = yc;
D.StrictMode = Gv;
D.Suspense = Cv;
D.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = J;
D.__COMPILER_RUNTIME = {
  __proto__: null,
  c: function(l) {
    return J.H.useMemoCache(l);
  }
};
D.cache = function(l) {
  return function() {
    return l.apply(null, arguments);
  };
};
D.cloneElement = function(l, t, u) {
  if (l == null)
    throw Error(
      "The argument must be a React element, but you passed " + l + "."
    );
  var a = j0({}, l.props), e = l.key, n = void 0;
  if (t != null)
    for (f in t.ref !== void 0 && (n = void 0), t.key !== void 0 && (e = "" + t.key), t)
      !L0.call(t, f) || f === "key" || f === "__self" || f === "__source" || f === "ref" && t.ref === void 0 || (a[f] = t[f]);
  var f = arguments.length - 2;
  if (f === 1) a.children = u;
  else if (1 < f) {
    for (var c = Array(f), i = 0; i < f; i++)
      c[i] = arguments[i + 2];
    a.children = c;
  }
  return oc(l.type, e, void 0, void 0, n, a);
};
D.createContext = function(l) {
  return l = {
    $$typeof: Zv,
    _currentValue: l,
    _currentValue2: l,
    _threadCount: 0,
    Provider: null,
    Consumer: null
  }, l.Provider = l, l.Consumer = {
    $$typeof: Qv,
    _context: l
  }, l;
};
D.createElement = function(l, t, u) {
  var a, e = {}, n = null;
  if (t != null)
    for (a in t.key !== void 0 && (n = "" + t.key), t)
      L0.call(t, a) && a !== "key" && a !== "__self" && a !== "__source" && (e[a] = t[a]);
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
  return oc(l, n, void 0, void 0, null, e);
};
D.createRef = function() {
  return { current: null };
};
D.forwardRef = function(l) {
  return { $$typeof: jv, render: l };
};
D.isValidElement = mc;
D.lazy = function(l) {
  return {
    $$typeof: Q0,
    _payload: { _status: -1, _result: l },
    _init: $v
  };
};
D.memo = function(l, t) {
  return {
    $$typeof: Vv,
    type: l,
    compare: t === void 0 ? null : t
  };
};
D.startTransition = function(l) {
  var t = J.T, u = {};
  J.T = u;
  try {
    var a = l(), e = J.S;
    e !== null && e(u, a), typeof a == "object" && a !== null && typeof a.then == "function" && a.then(Wv, mi);
  } catch (n) {
    mi(n);
  } finally {
    J.T = t;
  }
};
D.unstable_useCacheRefresh = function() {
  return J.H.useCacheRefresh();
};
D.use = function(l) {
  return J.H.use(l);
};
D.useActionState = function(l, t, u) {
  return J.H.useActionState(l, t, u);
};
D.useCallback = function(l, t) {
  return J.H.useCallback(l, t);
};
D.useContext = function(l) {
  return J.H.useContext(l);
};
D.useDebugValue = function() {
};
D.useDeferredValue = function(l, t) {
  return J.H.useDeferredValue(l, t);
};
D.useEffect = function(l, t, u) {
  var a = J.H;
  if (typeof u == "function")
    throw Error(
      "useEffect CRUD overload is not enabled in this build of React."
    );
  return a.useEffect(l, t);
};
D.useId = function() {
  return J.H.useId();
};
D.useImperativeHandle = function(l, t, u) {
  return J.H.useImperativeHandle(l, t, u);
};
D.useInsertionEffect = function(l, t) {
  return J.H.useInsertionEffect(l, t);
};
D.useLayoutEffect = function(l, t) {
  return J.H.useLayoutEffect(l, t);
};
D.useMemo = function(l, t) {
  return J.H.useMemo(l, t);
};
D.useOptimistic = function(l, t) {
  return J.H.useOptimistic(l, t);
};
D.useReducer = function(l, t, u) {
  return J.H.useReducer(l, t, u);
};
D.useRef = function(l) {
  return J.H.useRef(l);
};
D.useState = function(l) {
  return J.H.useState(l);
};
D.useSyncExternalStore = function(l, t, u) {
  return J.H.useSyncExternalStore(
    l,
    t,
    u
  );
};
D.useTransition = function() {
  return J.H.useTransition();
};
D.version = "19.1.1";
X0.exports = D;
var ya = X0.exports, K0 = { exports: {} }, hn = {}, J0 = { exports: {} }, w0 = {};
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
  function t(E, N) {
    var R = E.length;
    E.push(N);
    l: for (; 0 < R; ) {
      var I = R - 1 >>> 1, fl = E[I];
      if (0 < e(fl, N))
        E[I] = N, E[R] = fl, R = I;
      else break l;
    }
  }
  function u(E) {
    return E.length === 0 ? null : E[0];
  }
  function a(E) {
    if (E.length === 0) return null;
    var N = E[0], R = E.pop();
    if (R !== N) {
      E[0] = R;
      l: for (var I = 0, fl = E.length, ee = fl >>> 1; I < ee; ) {
        var ne = 2 * (I + 1) - 1, Hn = E[ne], Lt = ne + 1, fe = E[Lt];
        if (0 > e(Hn, R))
          Lt < fl && 0 > e(fe, Hn) ? (E[I] = fe, E[Lt] = R, I = Lt) : (E[I] = Hn, E[ne] = R, I = ne);
        else if (Lt < fl && 0 > e(fe, R))
          E[I] = fe, E[Lt] = R, I = Lt;
        else break l;
      }
    }
    return N;
  }
  function e(E, N) {
    var R = E.sortIndex - N.sortIndex;
    return R !== 0 ? R : E.id - N.id;
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
  var i = [], d = [], g = 1, m = null, y = 3, o = !1, z = !1, A = !1, x = !1, v = typeof setTimeout == "function" ? setTimeout : null, s = typeof clearTimeout == "function" ? clearTimeout : null, h = typeof setImmediate < "u" ? setImmediate : null;
  function S(E) {
    for (var N = u(d); N !== null; ) {
      if (N.callback === null) a(d);
      else if (N.startTime <= E)
        a(d), N.sortIndex = N.expirationTime, t(i, N);
      else break;
      N = u(d);
    }
  }
  function r(E) {
    if (A = !1, S(E), !z)
      if (u(i) !== null)
        z = !0, M || (M = !0, St());
      else {
        var N = u(d);
        N !== null && Nn(r, N.startTime - E);
      }
  }
  var M = !1, T = -1, O = 5, F = -1;
  function Y() {
    return x ? !0 : !(l.unstable_now() - F < O);
  }
  function Yl() {
    if (x = !1, M) {
      var E = l.unstable_now();
      F = E;
      var N = !0;
      try {
        l: {
          z = !1, A && (A = !1, s(T), T = -1), o = !0;
          var R = y;
          try {
            t: {
              for (S(E), m = u(i); m !== null && !(m.expirationTime > E && Y()); ) {
                var I = m.callback;
                if (typeof I == "function") {
                  m.callback = null, y = m.priorityLevel;
                  var fl = I(
                    m.expirationTime <= E
                  );
                  if (E = l.unstable_now(), typeof fl == "function") {
                    m.callback = fl, S(E), N = !0;
                    break t;
                  }
                  m === u(i) && a(i), S(E);
                } else a(i);
                m = u(i);
              }
              if (m !== null) N = !0;
              else {
                var ee = u(d);
                ee !== null && Nn(
                  r,
                  ee.startTime - E
                ), N = !1;
              }
            }
            break l;
          } finally {
            m = null, y = R, o = !1;
          }
          N = void 0;
        }
      } finally {
        N ? St() : M = !1;
      }
    }
  }
  var St;
  if (typeof h == "function")
    St = function() {
      h(Yl);
    };
  else if (typeof MessageChannel < "u") {
    var vi = new MessageChannel(), pv = vi.port2;
    vi.port1.onmessage = Yl, St = function() {
      pv.postMessage(null);
    };
  } else
    St = function() {
      v(Yl, 0);
    };
  function Nn(E, N) {
    T = v(function() {
      E(l.unstable_now());
    }, N);
  }
  l.unstable_IdlePriority = 5, l.unstable_ImmediatePriority = 1, l.unstable_LowPriority = 4, l.unstable_NormalPriority = 3, l.unstable_Profiling = null, l.unstable_UserBlockingPriority = 2, l.unstable_cancelCallback = function(E) {
    E.callback = null;
  }, l.unstable_forceFrameRate = function(E) {
    0 > E || 125 < E ? console.error(
      "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
    ) : O = 0 < E ? Math.floor(1e3 / E) : 5;
  }, l.unstable_getCurrentPriorityLevel = function() {
    return y;
  }, l.unstable_next = function(E) {
    switch (y) {
      case 1:
      case 2:
      case 3:
        var N = 3;
        break;
      default:
        N = y;
    }
    var R = y;
    y = N;
    try {
      return E();
    } finally {
      y = R;
    }
  }, l.unstable_requestPaint = function() {
    x = !0;
  }, l.unstable_runWithPriority = function(E, N) {
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
    var R = y;
    y = E;
    try {
      return N();
    } finally {
      y = R;
    }
  }, l.unstable_scheduleCallback = function(E, N, R) {
    var I = l.unstable_now();
    switch (typeof R == "object" && R !== null ? (R = R.delay, R = typeof R == "number" && 0 < R ? I + R : I) : R = I, E) {
      case 1:
        var fl = -1;
        break;
      case 2:
        fl = 250;
        break;
      case 5:
        fl = 1073741823;
        break;
      case 4:
        fl = 1e4;
        break;
      default:
        fl = 5e3;
    }
    return fl = R + fl, E = {
      id: g++,
      callback: N,
      priorityLevel: E,
      startTime: R,
      expirationTime: fl,
      sortIndex: -1
    }, R > I ? (E.sortIndex = R, t(d, E), u(i) === null && E === u(d) && (A ? (s(T), T = -1) : A = !0, Nn(r, R - I))) : (E.sortIndex = fl, t(i, E), z || o || (z = !0, M || (M = !0, St()))), E;
  }, l.unstable_shouldYield = Y, l.unstable_wrapCallback = function(E) {
    var N = y;
    return function() {
      var R = y;
      y = N;
      try {
        return E.apply(this, arguments);
      } finally {
        y = R;
      }
    };
  };
})(w0);
J0.exports = w0;
var kv = J0.exports, $0 = { exports: {} }, bl = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Fv = ya;
function W0(l) {
  var t = "https://react.dev/errors/" + l;
  if (1 < arguments.length) {
    t += "?args[]=" + encodeURIComponent(arguments[1]);
    for (var u = 2; u < arguments.length; u++)
      t += "&args[]=" + encodeURIComponent(arguments[u]);
  }
  return "Minified React error #" + l + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
function bt() {
}
var Sl = {
  d: {
    f: bt,
    r: function() {
      throw Error(W0(522));
    },
    D: bt,
    C: bt,
    L: bt,
    m: bt,
    X: bt,
    S: bt,
    M: bt
  },
  p: 0,
  findDOMNode: null
}, Iv = Symbol.for("react.portal");
function Pv(l, t, u) {
  var a = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: Iv,
    key: a == null ? null : "" + a,
    children: l,
    containerInfo: t,
    implementation: u
  };
}
var ha = Fv.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
function on(l, t) {
  if (l === "font") return "";
  if (typeof t == "string")
    return t === "use-credentials" ? t : "";
}
bl.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Sl;
bl.createPortal = function(l, t) {
  var u = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11)
    throw Error(W0(299));
  return Pv(l, t, null, u);
};
bl.flushSync = function(l) {
  var t = ha.T, u = Sl.p;
  try {
    if (ha.T = null, Sl.p = 2, l) return l();
  } finally {
    ha.T = t, Sl.p = u, Sl.d.f();
  }
};
bl.preconnect = function(l, t) {
  typeof l == "string" && (t ? (t = t.crossOrigin, t = typeof t == "string" ? t === "use-credentials" ? t : "" : void 0) : t = null, Sl.d.C(l, t));
};
bl.prefetchDNS = function(l) {
  typeof l == "string" && Sl.d.D(l);
};
bl.preinit = function(l, t) {
  if (typeof l == "string" && t && typeof t.as == "string") {
    var u = t.as, a = on(u, t.crossOrigin), e = typeof t.integrity == "string" ? t.integrity : void 0, n = typeof t.fetchPriority == "string" ? t.fetchPriority : void 0;
    u === "style" ? Sl.d.S(
      l,
      typeof t.precedence == "string" ? t.precedence : void 0,
      {
        crossOrigin: a,
        integrity: e,
        fetchPriority: n
      }
    ) : u === "script" && Sl.d.X(l, {
      crossOrigin: a,
      integrity: e,
      fetchPriority: n,
      nonce: typeof t.nonce == "string" ? t.nonce : void 0
    });
  }
};
bl.preinitModule = function(l, t) {
  if (typeof l == "string")
    if (typeof t == "object" && t !== null) {
      if (t.as == null || t.as === "script") {
        var u = on(
          t.as,
          t.crossOrigin
        );
        Sl.d.M(l, {
          crossOrigin: u,
          integrity: typeof t.integrity == "string" ? t.integrity : void 0,
          nonce: typeof t.nonce == "string" ? t.nonce : void 0
        });
      }
    } else t == null && Sl.d.M(l);
};
bl.preload = function(l, t) {
  if (typeof l == "string" && typeof t == "object" && t !== null && typeof t.as == "string") {
    var u = t.as, a = on(u, t.crossOrigin);
    Sl.d.L(l, u, {
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
bl.preloadModule = function(l, t) {
  if (typeof l == "string")
    if (t) {
      var u = on(t.as, t.crossOrigin);
      Sl.d.m(l, {
        as: typeof t.as == "string" && t.as !== "script" ? t.as : void 0,
        crossOrigin: u,
        integrity: typeof t.integrity == "string" ? t.integrity : void 0
      });
    } else Sl.d.m(l);
};
bl.requestFormReset = function(l) {
  Sl.d.r(l);
};
bl.unstable_batchedUpdates = function(l, t) {
  return l(t);
};
bl.useFormState = function(l, t, u) {
  return ha.H.useFormState(l, t, u);
};
bl.useFormStatus = function() {
  return ha.H.useHostTransitionStatus();
};
bl.version = "19.1.1";
function k0() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(k0);
    } catch (l) {
      console.error(l);
    }
}
k0(), $0.exports = bl;
var ld = $0.exports, qn = {};
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var nl = kv, F0 = ya, td = ld;
function b(l) {
  var t = "https://react.dev/errors/" + l;
  if (1 < arguments.length) {
    t += "?args[]=" + encodeURIComponent(arguments[1]);
    for (var u = 2; u < arguments.length; u++)
      t += "&args[]=" + encodeURIComponent(arguments[u]);
  }
  return "Minified React error #" + l + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
function I0(l) {
  return !(!l || l.nodeType !== 1 && l.nodeType !== 9 && l.nodeType !== 11);
}
function Ca(l) {
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
function P0(l) {
  if (l.tag === 13) {
    var t = l.memoizedState;
    if (t === null && (l = l.alternate, l !== null && (t = l.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function gi(l) {
  if (Ca(l) !== l)
    throw Error(b(188));
}
function ud(l) {
  var t = l.alternate;
  if (!t) {
    if (t = Ca(l), t === null) throw Error(b(188));
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
        if (n === u) return gi(e), l;
        if (n === a) return gi(e), t;
        n = n.sibling;
      }
      throw Error(b(188));
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
        if (!f) throw Error(b(189));
      }
    }
    if (u.alternate !== a) throw Error(b(190));
  }
  if (u.tag !== 3) throw Error(b(188));
  return u.stateNode.current === u ? l : t;
}
function ls(l) {
  var t = l.tag;
  if (t === 5 || t === 26 || t === 27 || t === 6) return l;
  for (l = l.child; l !== null; ) {
    if (t = ls(l), t !== null) return t;
    l = l.sibling;
  }
  return null;
}
var L = Object.assign, ad = Symbol.for("react.element"), ie = Symbol.for("react.transitional.element"), ia = Symbol.for("react.portal"), gu = Symbol.for("react.fragment"), ts = Symbol.for("react.strict_mode"), gf = Symbol.for("react.profiler"), ed = Symbol.for("react.provider"), us = Symbol.for("react.consumer"), nt = Symbol.for("react.context"), gc = Symbol.for("react.forward_ref"), Sf = Symbol.for("react.suspense"), bf = Symbol.for("react.suspense_list"), Sc = Symbol.for("react.memo"), Tt = Symbol.for("react.lazy"), rf = Symbol.for("react.activity"), nd = Symbol.for("react.memo_cache_sentinel"), Si = Symbol.iterator;
function la(l) {
  return l === null || typeof l != "object" ? null : (l = Si && l[Si] || l["@@iterator"], typeof l == "function" ? l : null);
}
var fd = Symbol.for("react.client.reference");
function Ef(l) {
  if (l == null) return null;
  if (typeof l == "function")
    return l.$$typeof === fd ? null : l.displayName || l.name || null;
  if (typeof l == "string") return l;
  switch (l) {
    case gu:
      return "Fragment";
    case gf:
      return "Profiler";
    case ts:
      return "StrictMode";
    case Sf:
      return "Suspense";
    case bf:
      return "SuspenseList";
    case rf:
      return "Activity";
  }
  if (typeof l == "object")
    switch (l.$$typeof) {
      case ia:
        return "Portal";
      case nt:
        return (l.displayName || "Context") + ".Provider";
      case us:
        return (l._context.displayName || "Context") + ".Consumer";
      case gc:
        var t = l.render;
        return l = l.displayName, l || (l = t.displayName || t.name || "", l = l !== "" ? "ForwardRef(" + l + ")" : "ForwardRef"), l;
      case Sc:
        return t = l.displayName || null, t !== null ? t : Ef(l.type) || "Memo";
      case Tt:
        t = l._payload, l = l._init;
        try {
          return Ef(l(t));
        } catch {
        }
    }
  return null;
}
var sa = Array.isArray, _ = F0.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, G = td.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Wt = {
  pending: !1,
  data: null,
  method: null,
  action: null
}, Tf = [], Su = -1;
function Il(l) {
  return { current: l };
}
function vl(l) {
  0 > Su || (l.current = Tf[Su], Tf[Su] = null, Su--);
}
function w(l, t) {
  Su++, Tf[Su] = l.current, l.current = t;
}
var Wl = Il(null), Ua = Il(null), Ht = Il(null), xe = Il(null);
function Be(l, t) {
  switch (w(Ht, t), w(Ua, l), w(Wl, null), t.nodeType) {
    case 9:
    case 11:
      l = (l = t.documentElement) && (l = l.namespaceURI) ? A0(l) : 0;
      break;
    default:
      if (l = t.tagName, t = t.namespaceURI)
        t = A0(t), l = rv(t, l);
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
  vl(Wl), w(Wl, l);
}
function Bu() {
  vl(Wl), vl(Ua), vl(Ht);
}
function Af(l) {
  l.memoizedState !== null && w(xe, l);
  var t = Wl.current, u = rv(t, l.type);
  t !== u && (w(Ua, l), w(Wl, u));
}
function Ge(l) {
  Ua.current === l && (vl(Wl), vl(Ua)), xe.current === l && (vl(xe), Xa._currentValue = Wt);
}
var zf = Object.prototype.hasOwnProperty, bc = nl.unstable_scheduleCallback, xn = nl.unstable_cancelCallback, cd = nl.unstable_shouldYield, id = nl.unstable_requestPaint, kl = nl.unstable_now, sd = nl.unstable_getCurrentPriorityLevel, as = nl.unstable_ImmediatePriority, es = nl.unstable_UserBlockingPriority, Xe = nl.unstable_NormalPriority, vd = nl.unstable_LowPriority, ns = nl.unstable_IdlePriority, dd = nl.log, yd = nl.unstable_setDisableYieldValue, Va = null, Ul = null;
function Dt(l) {
  if (typeof dd == "function" && yd(l), Ul && typeof Ul.setStrictMode == "function")
    try {
      Ul.setStrictMode(Va, l);
    } catch {
    }
}
var Rl = Math.clz32 ? Math.clz32 : md, hd = Math.log, od = Math.LN2;
function md(l) {
  return l >>>= 0, l === 0 ? 32 : 31 - (hd(l) / od | 0) | 0;
}
var se = 256, ve = 4194304;
function Jt(l) {
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
function mn(l, t, u) {
  var a = l.pendingLanes;
  if (a === 0) return 0;
  var e = 0, n = l.suspendedLanes, f = l.pingedLanes;
  l = l.warmLanes;
  var c = a & 134217727;
  return c !== 0 ? (a = c & ~n, a !== 0 ? e = Jt(a) : (f &= c, f !== 0 ? e = Jt(f) : u || (u = c & ~l, u !== 0 && (e = Jt(u))))) : (c = a & ~n, c !== 0 ? e = Jt(c) : f !== 0 ? e = Jt(f) : u || (u = a & ~l, u !== 0 && (e = Jt(u)))), e === 0 ? 0 : t !== 0 && t !== e && !(t & n) && (n = e & -e, u = t & -t, n >= u || n === 32 && (u & 4194048) !== 0) ? t : e;
}
function La(l, t) {
  return (l.pendingLanes & ~(l.suspendedLanes & ~l.pingedLanes) & t) === 0;
}
function gd(l, t) {
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
function fs() {
  var l = se;
  return se <<= 1, !(se & 4194048) && (se = 256), l;
}
function cs() {
  var l = ve;
  return ve <<= 1, !(ve & 62914560) && (ve = 4194304), l;
}
function Bn(l) {
  for (var t = [], u = 0; 31 > u; u++) t.push(l);
  return t;
}
function Ka(l, t) {
  l.pendingLanes |= t, t !== 268435456 && (l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0);
}
function Sd(l, t, u, a, e, n) {
  var f = l.pendingLanes;
  l.pendingLanes = u, l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0, l.expiredLanes &= u, l.entangledLanes &= u, l.errorRecoveryDisabledLanes &= u, l.shellSuspendCounter = 0;
  var c = l.entanglements, i = l.expirationTimes, d = l.hiddenUpdates;
  for (u = f & ~u; 0 < u; ) {
    var g = 31 - Rl(u), m = 1 << g;
    c[g] = 0, i[g] = -1;
    var y = d[g];
    if (y !== null)
      for (d[g] = null, g = 0; g < y.length; g++) {
        var o = y[g];
        o !== null && (o.lane &= -536870913);
      }
    u &= ~m;
  }
  a !== 0 && is(l, a, 0), n !== 0 && e === 0 && l.tag !== 0 && (l.suspendedLanes |= n & ~(f & ~t));
}
function is(l, t, u) {
  l.pendingLanes |= t, l.suspendedLanes &= ~t;
  var a = 31 - Rl(t);
  l.entangledLanes |= t, l.entanglements[a] = l.entanglements[a] | 1073741824 | u & 4194090;
}
function ss(l, t) {
  var u = l.entangledLanes |= t;
  for (l = l.entanglements; u; ) {
    var a = 31 - Rl(u), e = 1 << a;
    e & t | l[a] & t && (l[a] |= t), u &= ~e;
  }
}
function rc(l) {
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
function Ec(l) {
  return l &= -l, 2 < l ? 8 < l ? l & 134217727 ? 32 : 268435456 : 8 : 2;
}
function vs() {
  var l = G.p;
  return l !== 0 ? l : (l = window.event, l === void 0 ? 32 : Rv(l.type));
}
function bd(l, t) {
  var u = G.p;
  try {
    return G.p = l, t();
  } finally {
    G.p = u;
  }
}
var Ct = Math.random().toString(36).slice(2), ol = "__reactFiber$" + Ct, Al = "__reactProps$" + Ct, $u = "__reactContainer$" + Ct, Of = "__reactEvents$" + Ct, rd = "__reactListeners$" + Ct, Ed = "__reactHandles$" + Ct, bi = "__reactResources$" + Ct, Ja = "__reactMarker$" + Ct;
function Tc(l) {
  delete l[ol], delete l[Al], delete l[Of], delete l[rd], delete l[Ed];
}
function bu(l) {
  var t = l[ol];
  if (t) return t;
  for (var u = l.parentNode; u; ) {
    if (t = u[$u] || u[ol]) {
      if (u = t.alternate, t.child !== null || u !== null && u.child !== null)
        for (l = _0(l); l !== null; ) {
          if (u = l[ol]) return u;
          l = _0(l);
        }
      return t;
    }
    l = u, u = l.parentNode;
  }
  return null;
}
function Wu(l) {
  if (l = l[ol] || l[$u]) {
    var t = l.tag;
    if (t === 5 || t === 6 || t === 13 || t === 26 || t === 27 || t === 3)
      return l;
  }
  return null;
}
function va(l) {
  var t = l.tag;
  if (t === 5 || t === 26 || t === 27 || t === 6) return l.stateNode;
  throw Error(b(33));
}
function Uu(l) {
  var t = l[bi];
  return t || (t = l[bi] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
}
function il(l) {
  l[Ja] = !0;
}
var ds = /* @__PURE__ */ new Set(), ys = {};
function fu(l, t) {
  Gu(l, t), Gu(l + "Capture", t);
}
function Gu(l, t) {
  for (ys[l] = t, l = 0; l < t.length; l++)
    ds.add(t[l]);
}
var Td = RegExp(
  "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
), ri = {}, Ei = {};
function Ad(l) {
  return zf.call(Ei, l) ? !0 : zf.call(ri, l) ? !1 : Td.test(l) ? Ei[l] = !0 : (ri[l] = !0, !1);
}
function Ae(l, t, u) {
  if (Ad(t))
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
function de(l, t, u) {
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
function lt(l, t, u, a) {
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
var Gn, Ti;
function hu(l) {
  if (Gn === void 0)
    try {
      throw Error();
    } catch (u) {
      var t = u.stack.trim().match(/\n( *(at )?)/);
      Gn = t && t[1] || "", Ti = -1 < u.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < u.stack.indexOf("@") ? "@unknown:0:0" : "";
    }
  return `
` + Gn + l + Ti;
}
var Xn = !1;
function Qn(l, t) {
  if (!l || Xn) return "";
  Xn = !0;
  var u = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    var a = {
      DetermineComponentFrameRoot: function() {
        try {
          if (t) {
            var m = function() {
              throw Error();
            };
            if (Object.defineProperty(m.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(m, []);
              } catch (o) {
                var y = o;
              }
              Reflect.construct(l, [], m);
            } else {
              try {
                m.call();
              } catch (o) {
                y = o;
              }
              l.call(m.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (o) {
              y = o;
            }
            (m = l()) && typeof m.catch == "function" && m.catch(function() {
            });
          }
        } catch (o) {
          if (o && y && typeof o.stack == "string")
            return [o.stack, y.stack];
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
`), d = c.split(`
`);
      for (e = a = 0; a < i.length && !i[a].includes("DetermineComponentFrameRoot"); )
        a++;
      for (; e < d.length && !d[e].includes(
        "DetermineComponentFrameRoot"
      ); )
        e++;
      if (a === i.length || e === d.length)
        for (a = i.length - 1, e = d.length - 1; 1 <= a && 0 <= e && i[a] !== d[e]; )
          e--;
      for (; 1 <= a && 0 <= e; a--, e--)
        if (i[a] !== d[e]) {
          if (a !== 1 || e !== 1)
            do
              if (a--, e--, 0 > e || i[a] !== d[e]) {
                var g = `
` + i[a].replace(" at new ", " at ");
                return l.displayName && g.includes("<anonymous>") && (g = g.replace("<anonymous>", l.displayName)), g;
              }
            while (1 <= a && 0 <= e);
          break;
        }
    }
  } finally {
    Xn = !1, Error.prepareStackTrace = u;
  }
  return (u = l ? l.displayName || l.name : "") ? hu(u) : "";
}
function zd(l) {
  switch (l.tag) {
    case 26:
    case 27:
    case 5:
      return hu(l.type);
    case 16:
      return hu("Lazy");
    case 13:
      return hu("Suspense");
    case 19:
      return hu("SuspenseList");
    case 0:
    case 15:
      return Qn(l.type, !1);
    case 11:
      return Qn(l.type.render, !1);
    case 1:
      return Qn(l.type, !0);
    case 31:
      return hu("Activity");
    default:
      return "";
  }
}
function Ai(l) {
  try {
    var t = "";
    do
      t += zd(l), l = l.return;
    while (l);
    return t;
  } catch (u) {
    return `
Error generating stack: ` + u.message + `
` + u.stack;
  }
}
function xl(l) {
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
function hs(l) {
  var t = l.type;
  return (l = l.nodeName) && l.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function Od(l) {
  var t = hs(l) ? "checked" : "value", u = Object.getOwnPropertyDescriptor(
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
function Qe(l) {
  l._valueTracker || (l._valueTracker = Od(l));
}
function os(l) {
  if (!l) return !1;
  var t = l._valueTracker;
  if (!t) return !0;
  var u = t.getValue(), a = "";
  return l && (a = hs(l) ? l.checked ? "true" : "false" : l.value), l = a, l !== u ? (t.setValue(l), !0) : !1;
}
function Ze(l) {
  if (l = l || (typeof document < "u" ? document : void 0), typeof l > "u") return null;
  try {
    return l.activeElement || l.body;
  } catch {
    return l.body;
  }
}
var _d = /[\n"\\]/g;
function Xl(l) {
  return l.replace(
    _d,
    function(t) {
      return "\\" + t.charCodeAt(0).toString(16) + " ";
    }
  );
}
function _f(l, t, u, a, e, n, f, c) {
  l.name = "", f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" ? l.type = f : l.removeAttribute("type"), t != null ? f === "number" ? (t === 0 && l.value === "" || l.value != t) && (l.value = "" + xl(t)) : l.value !== "" + xl(t) && (l.value = "" + xl(t)) : f !== "submit" && f !== "reset" || l.removeAttribute("value"), t != null ? Mf(l, f, xl(t)) : u != null ? Mf(l, f, xl(u)) : a != null && l.removeAttribute("value"), e == null && n != null && (l.defaultChecked = !!n), e != null && (l.checked = e && typeof e != "function" && typeof e != "symbol"), c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? l.name = "" + xl(c) : l.removeAttribute("name");
}
function ms(l, t, u, a, e, n, f, c) {
  if (n != null && typeof n != "function" && typeof n != "symbol" && typeof n != "boolean" && (l.type = n), t != null || u != null) {
    if (!(n !== "submit" && n !== "reset" || t != null))
      return;
    u = u != null ? "" + xl(u) : "", t = t != null ? "" + xl(t) : u, c || t === l.value || (l.value = t), l.defaultValue = t;
  }
  a = a ?? e, a = typeof a != "function" && typeof a != "symbol" && !!a, l.checked = c ? l.checked : !!a, l.defaultChecked = !!a, f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" && (l.name = f);
}
function Mf(l, t, u) {
  t === "number" && Ze(l.ownerDocument) === l || l.defaultValue === "" + u || (l.defaultValue = "" + u);
}
function Ru(l, t, u, a) {
  if (l = l.options, t) {
    t = {};
    for (var e = 0; e < u.length; e++)
      t["$" + u[e]] = !0;
    for (u = 0; u < l.length; u++)
      e = t.hasOwnProperty("$" + l[u].value), l[u].selected !== e && (l[u].selected = e), e && a && (l[u].defaultSelected = !0);
  } else {
    for (u = "" + xl(u), t = null, e = 0; e < l.length; e++) {
      if (l[e].value === u) {
        l[e].selected = !0, a && (l[e].defaultSelected = !0);
        return;
      }
      t !== null || l[e].disabled || (t = l[e]);
    }
    t !== null && (t.selected = !0);
  }
}
function gs(l, t, u) {
  if (t != null && (t = "" + xl(t), t !== l.value && (l.value = t), u == null)) {
    l.defaultValue !== t && (l.defaultValue = t);
    return;
  }
  l.defaultValue = u != null ? "" + xl(u) : "";
}
function Ss(l, t, u, a) {
  if (t == null) {
    if (a != null) {
      if (u != null) throw Error(b(92));
      if (sa(a)) {
        if (1 < a.length) throw Error(b(93));
        a = a[0];
      }
      u = a;
    }
    u == null && (u = ""), t = u;
  }
  u = xl(t), l.defaultValue = u, a = l.textContent, a === u && a !== "" && a !== null && (l.value = a);
}
function Xu(l, t) {
  if (t) {
    var u = l.firstChild;
    if (u && u === l.lastChild && u.nodeType === 3) {
      u.nodeValue = t;
      return;
    }
  }
  l.textContent = t;
}
var Md = new Set(
  "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
    " "
  )
);
function zi(l, t, u) {
  var a = t.indexOf("--") === 0;
  u == null || typeof u == "boolean" || u === "" ? a ? l.setProperty(t, "") : t === "float" ? l.cssFloat = "" : l[t] = "" : a ? l.setProperty(t, u) : typeof u != "number" || u === 0 || Md.has(t) ? t === "float" ? l.cssFloat = u : l[t] = ("" + u).trim() : l[t] = u + "px";
}
function bs(l, t, u) {
  if (t != null && typeof t != "object")
    throw Error(b(62));
  if (l = l.style, u != null) {
    for (var a in u)
      !u.hasOwnProperty(a) || t != null && t.hasOwnProperty(a) || (a.indexOf("--") === 0 ? l.setProperty(a, "") : a === "float" ? l.cssFloat = "" : l[a] = "");
    for (var e in t)
      a = t[e], t.hasOwnProperty(e) && u[e] !== a && zi(l, e, a);
  } else
    for (var n in t)
      t.hasOwnProperty(n) && zi(l, n, t[n]);
}
function Ac(l) {
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
var Dd = /* @__PURE__ */ new Map([
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
]), Ud = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
function ze(l) {
  return Ud.test("" + l) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : l;
}
var Df = null;
function zc(l) {
  return l = l.target || l.srcElement || window, l.correspondingUseElement && (l = l.correspondingUseElement), l.nodeType === 3 ? l.parentNode : l;
}
var ru = null, Nu = null;
function Oi(l) {
  var t = Wu(l);
  if (t && (l = t.stateNode)) {
    var u = l[Al] || null;
    l: switch (l = t.stateNode, t.type) {
      case "input":
        if (_f(
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
            'input[name="' + Xl(
              "" + t
            ) + '"][type="radio"]'
          ), t = 0; t < u.length; t++) {
            var a = u[t];
            if (a !== l && a.form === l.form) {
              var e = a[Al] || null;
              if (!e) throw Error(b(90));
              _f(
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
            a = u[t], a.form === l.form && os(a);
        }
        break l;
      case "textarea":
        gs(l, u.value, u.defaultValue);
        break l;
      case "select":
        t = u.value, t != null && Ru(l, !!u.multiple, t, !1);
    }
  }
}
var Zn = !1;
function rs(l, t, u) {
  if (Zn) return l(t, u);
  Zn = !0;
  try {
    var a = l(t);
    return a;
  } finally {
    if (Zn = !1, (ru !== null || Nu !== null) && (_n(), ru && (t = ru, l = Nu, Nu = ru = null, Oi(t), l)))
      for (t = 0; t < l.length; t++) Oi(l[t]);
  }
}
function Ra(l, t) {
  var u = l.stateNode;
  if (u === null) return null;
  var a = u[Al] || null;
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
      b(231, t, typeof u)
    );
  return u;
}
var yt = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Uf = !1;
if (yt)
  try {
    var ta = {};
    Object.defineProperty(ta, "passive", {
      get: function() {
        Uf = !0;
      }
    }), window.addEventListener("test", ta, ta), window.removeEventListener("test", ta, ta);
  } catch {
    Uf = !1;
  }
var Ut = null, Oc = null, Oe = null;
function Es() {
  if (Oe) return Oe;
  var l, t = Oc, u = t.length, a, e = "value" in Ut ? Ut.value : Ut.textContent, n = e.length;
  for (l = 0; l < u && t[l] === e[l]; l++) ;
  var f = u - l;
  for (a = 1; a <= f && t[u - a] === e[n - a]; a++) ;
  return Oe = e.slice(l, 1 < a ? 1 - a : void 0);
}
function _e(l) {
  var t = l.keyCode;
  return "charCode" in l ? (l = l.charCode, l === 0 && t === 13 && (l = 13)) : l = t, l === 10 && (l = 13), 32 <= l || l === 13 ? l : 0;
}
function ye() {
  return !0;
}
function _i() {
  return !1;
}
function zl(l) {
  function t(u, a, e, n, f) {
    this._reactName = u, this._targetInst = e, this.type = a, this.nativeEvent = n, this.target = f, this.currentTarget = null;
    for (var c in l)
      l.hasOwnProperty(c) && (u = l[c], this[c] = u ? u(n) : n[c]);
    return this.isDefaultPrevented = (n.defaultPrevented != null ? n.defaultPrevented : n.returnValue === !1) ? ye : _i, this.isPropagationStopped = _i, this;
  }
  return L(t.prototype, {
    preventDefault: function() {
      this.defaultPrevented = !0;
      var u = this.nativeEvent;
      u && (u.preventDefault ? u.preventDefault() : typeof u.returnValue != "unknown" && (u.returnValue = !1), this.isDefaultPrevented = ye);
    },
    stopPropagation: function() {
      var u = this.nativeEvent;
      u && (u.stopPropagation ? u.stopPropagation() : typeof u.cancelBubble != "unknown" && (u.cancelBubble = !0), this.isPropagationStopped = ye);
    },
    persist: function() {
    },
    isPersistent: ye
  }), t;
}
var cu = {
  eventPhase: 0,
  bubbles: 0,
  cancelable: 0,
  timeStamp: function(l) {
    return l.timeStamp || Date.now();
  },
  defaultPrevented: 0,
  isTrusted: 0
}, gn = zl(cu), wa = L({}, cu, { view: 0, detail: 0 }), Rd = zl(wa), jn, Cn, ua, Sn = L({}, wa, {
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
  getModifierState: _c,
  button: 0,
  buttons: 0,
  relatedTarget: function(l) {
    return l.relatedTarget === void 0 ? l.fromElement === l.srcElement ? l.toElement : l.fromElement : l.relatedTarget;
  },
  movementX: function(l) {
    return "movementX" in l ? l.movementX : (l !== ua && (ua && l.type === "mousemove" ? (jn = l.screenX - ua.screenX, Cn = l.screenY - ua.screenY) : Cn = jn = 0, ua = l), jn);
  },
  movementY: function(l) {
    return "movementY" in l ? l.movementY : Cn;
  }
}), Mi = zl(Sn), Nd = L({}, Sn, { dataTransfer: 0 }), Hd = zl(Nd), pd = L({}, wa, { relatedTarget: 0 }), Vn = zl(pd), Yd = L({}, cu, {
  animationName: 0,
  elapsedTime: 0,
  pseudoElement: 0
}), qd = zl(Yd), xd = L({}, cu, {
  clipboardData: function(l) {
    return "clipboardData" in l ? l.clipboardData : window.clipboardData;
  }
}), Bd = zl(xd), Gd = L({}, cu, { data: 0 }), Di = zl(Gd), Xd = {
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
}, Qd = {
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
}, Zd = {
  Alt: "altKey",
  Control: "ctrlKey",
  Meta: "metaKey",
  Shift: "shiftKey"
};
function jd(l) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(l) : (l = Zd[l]) ? !!t[l] : !1;
}
function _c() {
  return jd;
}
var Cd = L({}, wa, {
  key: function(l) {
    if (l.key) {
      var t = Xd[l.key] || l.key;
      if (t !== "Unidentified") return t;
    }
    return l.type === "keypress" ? (l = _e(l), l === 13 ? "Enter" : String.fromCharCode(l)) : l.type === "keydown" || l.type === "keyup" ? Qd[l.keyCode] || "Unidentified" : "";
  },
  code: 0,
  location: 0,
  ctrlKey: 0,
  shiftKey: 0,
  altKey: 0,
  metaKey: 0,
  repeat: 0,
  locale: 0,
  getModifierState: _c,
  charCode: function(l) {
    return l.type === "keypress" ? _e(l) : 0;
  },
  keyCode: function(l) {
    return l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
  },
  which: function(l) {
    return l.type === "keypress" ? _e(l) : l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
  }
}), Vd = zl(Cd), Ld = L({}, Sn, {
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
}), Ui = zl(Ld), Kd = L({}, wa, {
  touches: 0,
  targetTouches: 0,
  changedTouches: 0,
  altKey: 0,
  metaKey: 0,
  ctrlKey: 0,
  shiftKey: 0,
  getModifierState: _c
}), Jd = zl(Kd), wd = L({}, cu, {
  propertyName: 0,
  elapsedTime: 0,
  pseudoElement: 0
}), $d = zl(wd), Wd = L({}, Sn, {
  deltaX: function(l) {
    return "deltaX" in l ? l.deltaX : "wheelDeltaX" in l ? -l.wheelDeltaX : 0;
  },
  deltaY: function(l) {
    return "deltaY" in l ? l.deltaY : "wheelDeltaY" in l ? -l.wheelDeltaY : "wheelDelta" in l ? -l.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), kd = zl(Wd), Fd = L({}, cu, {
  newState: 0,
  oldState: 0
}), Id = zl(Fd), Pd = [9, 13, 27, 32], Mc = yt && "CompositionEvent" in window, oa = null;
yt && "documentMode" in document && (oa = document.documentMode);
var ly = yt && "TextEvent" in window && !oa, Ts = yt && (!Mc || oa && 8 < oa && 11 >= oa), Ri = " ", Ni = !1;
function As(l, t) {
  switch (l) {
    case "keyup":
      return Pd.indexOf(t.keyCode) !== -1;
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
function zs(l) {
  return l = l.detail, typeof l == "object" && "data" in l ? l.data : null;
}
var Eu = !1;
function ty(l, t) {
  switch (l) {
    case "compositionend":
      return zs(t);
    case "keypress":
      return t.which !== 32 ? null : (Ni = !0, Ri);
    case "textInput":
      return l = t.data, l === Ri && Ni ? null : l;
    default:
      return null;
  }
}
function uy(l, t) {
  if (Eu)
    return l === "compositionend" || !Mc && As(l, t) ? (l = Es(), Oe = Oc = Ut = null, Eu = !1, l) : null;
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
      return Ts && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var ay = {
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
function Hi(l) {
  var t = l && l.nodeName && l.nodeName.toLowerCase();
  return t === "input" ? !!ay[l.type] : t === "textarea";
}
function Os(l, t, u, a) {
  ru ? Nu ? Nu.push(a) : Nu = [a] : ru = a, t = en(t, "onChange"), 0 < t.length && (u = new gn(
    "onChange",
    "change",
    null,
    u,
    a
  ), l.push({ event: u, listeners: t }));
}
var ma = null, Na = null;
function ey(l) {
  gv(l, 0);
}
function bn(l) {
  var t = va(l);
  if (os(t)) return l;
}
function pi(l, t) {
  if (l === "change") return t;
}
var _s = !1;
if (yt) {
  var Ln;
  if (yt) {
    var Kn = "oninput" in document;
    if (!Kn) {
      var Yi = document.createElement("div");
      Yi.setAttribute("oninput", "return;"), Kn = typeof Yi.oninput == "function";
    }
    Ln = Kn;
  } else Ln = !1;
  _s = Ln && (!document.documentMode || 9 < document.documentMode);
}
function qi() {
  ma && (ma.detachEvent("onpropertychange", Ms), Na = ma = null);
}
function Ms(l) {
  if (l.propertyName === "value" && bn(Na)) {
    var t = [];
    Os(
      t,
      Na,
      l,
      zc(l)
    ), rs(ey, t);
  }
}
function ny(l, t, u) {
  l === "focusin" ? (qi(), ma = t, Na = u, ma.attachEvent("onpropertychange", Ms)) : l === "focusout" && qi();
}
function fy(l) {
  if (l === "selectionchange" || l === "keyup" || l === "keydown")
    return bn(Na);
}
function cy(l, t) {
  if (l === "click") return bn(t);
}
function iy(l, t) {
  if (l === "input" || l === "change")
    return bn(t);
}
function sy(l, t) {
  return l === t && (l !== 0 || 1 / l === 1 / t) || l !== l && t !== t;
}
var pl = typeof Object.is == "function" ? Object.is : sy;
function Ha(l, t) {
  if (pl(l, t)) return !0;
  if (typeof l != "object" || l === null || typeof t != "object" || t === null)
    return !1;
  var u = Object.keys(l), a = Object.keys(t);
  if (u.length !== a.length) return !1;
  for (a = 0; a < u.length; a++) {
    var e = u[a];
    if (!zf.call(t, e) || !pl(l[e], t[e]))
      return !1;
  }
  return !0;
}
function xi(l) {
  for (; l && l.firstChild; ) l = l.firstChild;
  return l;
}
function Bi(l, t) {
  var u = xi(l);
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
    u = xi(u);
  }
}
function Ds(l, t) {
  return l && t ? l === t ? !0 : l && l.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Ds(l, t.parentNode) : "contains" in l ? l.contains(t) : l.compareDocumentPosition ? !!(l.compareDocumentPosition(t) & 16) : !1 : !1;
}
function Us(l) {
  l = l != null && l.ownerDocument != null && l.ownerDocument.defaultView != null ? l.ownerDocument.defaultView : window;
  for (var t = Ze(l.document); t instanceof l.HTMLIFrameElement; ) {
    try {
      var u = typeof t.contentWindow.location.href == "string";
    } catch {
      u = !1;
    }
    if (u) l = t.contentWindow;
    else break;
    t = Ze(l.document);
  }
  return t;
}
function Dc(l) {
  var t = l && l.nodeName && l.nodeName.toLowerCase();
  return t && (t === "input" && (l.type === "text" || l.type === "search" || l.type === "tel" || l.type === "url" || l.type === "password") || t === "textarea" || l.contentEditable === "true");
}
var vy = yt && "documentMode" in document && 11 >= document.documentMode, Tu = null, Rf = null, ga = null, Nf = !1;
function Gi(l, t, u) {
  var a = u.window === u ? u.document : u.nodeType === 9 ? u : u.ownerDocument;
  Nf || Tu == null || Tu !== Ze(a) || (a = Tu, "selectionStart" in a && Dc(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
    anchorNode: a.anchorNode,
    anchorOffset: a.anchorOffset,
    focusNode: a.focusNode,
    focusOffset: a.focusOffset
  }), ga && Ha(ga, a) || (ga = a, a = en(Rf, "onSelect"), 0 < a.length && (t = new gn(
    "onSelect",
    "select",
    null,
    t,
    u
  ), l.push({ event: t, listeners: a }), t.target = Tu)));
}
function Kt(l, t) {
  var u = {};
  return u[l.toLowerCase()] = t.toLowerCase(), u["Webkit" + l] = "webkit" + t, u["Moz" + l] = "moz" + t, u;
}
var Au = {
  animationend: Kt("Animation", "AnimationEnd"),
  animationiteration: Kt("Animation", "AnimationIteration"),
  animationstart: Kt("Animation", "AnimationStart"),
  transitionrun: Kt("Transition", "TransitionRun"),
  transitionstart: Kt("Transition", "TransitionStart"),
  transitioncancel: Kt("Transition", "TransitionCancel"),
  transitionend: Kt("Transition", "TransitionEnd")
}, Jn = {}, Rs = {};
yt && (Rs = document.createElement("div").style, "AnimationEvent" in window || (delete Au.animationend.animation, delete Au.animationiteration.animation, delete Au.animationstart.animation), "TransitionEvent" in window || delete Au.transitionend.transition);
function iu(l) {
  if (Jn[l]) return Jn[l];
  if (!Au[l]) return l;
  var t = Au[l], u;
  for (u in t)
    if (t.hasOwnProperty(u) && u in Rs)
      return Jn[l] = t[u];
  return l;
}
var Ns = iu("animationend"), Hs = iu("animationiteration"), ps = iu("animationstart"), dy = iu("transitionrun"), yy = iu("transitionstart"), hy = iu("transitioncancel"), Ys = iu("transitionend"), qs = /* @__PURE__ */ new Map(), Hf = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
  " "
);
Hf.push("scrollEnd");
function Kl(l, t) {
  qs.set(l, t), fu(t, [l]);
}
var Xi = /* @__PURE__ */ new WeakMap();
function Ql(l, t) {
  if (typeof l == "object" && l !== null) {
    var u = Xi.get(l);
    return u !== void 0 ? u : (t = {
      value: l,
      source: t,
      stack: Ai(t)
    }, Xi.set(l, t), t);
  }
  return {
    value: l,
    source: t,
    stack: Ai(t)
  };
}
var ql = [], zu = 0, Uc = 0;
function rn() {
  for (var l = zu, t = Uc = zu = 0; t < l; ) {
    var u = ql[t];
    ql[t++] = null;
    var a = ql[t];
    ql[t++] = null;
    var e = ql[t];
    ql[t++] = null;
    var n = ql[t];
    if (ql[t++] = null, a !== null && e !== null) {
      var f = a.pending;
      f === null ? e.next = e : (e.next = f.next, f.next = e), a.pending = e;
    }
    n !== 0 && xs(u, e, n);
  }
}
function En(l, t, u, a) {
  ql[zu++] = l, ql[zu++] = t, ql[zu++] = u, ql[zu++] = a, Uc |= a, l.lanes |= a, l = l.alternate, l !== null && (l.lanes |= a);
}
function Rc(l, t, u, a) {
  return En(l, t, u, a), je(l);
}
function ku(l, t) {
  return En(l, null, null, t), je(l);
}
function xs(l, t, u) {
  l.lanes |= u;
  var a = l.alternate;
  a !== null && (a.lanes |= u);
  for (var e = !1, n = l.return; n !== null; )
    n.childLanes |= u, a = n.alternate, a !== null && (a.childLanes |= u), n.tag === 22 && (l = n.stateNode, l === null || l._visibility & 1 || (e = !0)), l = n, n = n.return;
  return l.tag === 3 ? (n = l.stateNode, e && t !== null && (e = 31 - Rl(u), l = n.hiddenUpdates, a = l[e], a === null ? l[e] = [t] : a.push(t), t.lane = u | 536870912), n) : null;
}
function je(l) {
  if (50 < Ma)
    throw Ma = 0, If = null, Error(b(185));
  for (var t = l.return; t !== null; )
    l = t, t = l.return;
  return l.tag === 3 ? l.stateNode : null;
}
var Ou = {};
function oy(l, t, u, a) {
  this.tag = l, this.key = u, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function Dl(l, t, u, a) {
  return new oy(l, t, u, a);
}
function Nc(l) {
  return l = l.prototype, !(!l || !l.isReactComponent);
}
function vt(l, t) {
  var u = l.alternate;
  return u === null ? (u = Dl(
    l.tag,
    t,
    l.key,
    l.mode
  ), u.elementType = l.elementType, u.type = l.type, u.stateNode = l.stateNode, u.alternate = l, l.alternate = u) : (u.pendingProps = t, u.type = l.type, u.flags = 0, u.subtreeFlags = 0, u.deletions = null), u.flags = l.flags & 65011712, u.childLanes = l.childLanes, u.lanes = l.lanes, u.child = l.child, u.memoizedProps = l.memoizedProps, u.memoizedState = l.memoizedState, u.updateQueue = l.updateQueue, t = l.dependencies, u.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, u.sibling = l.sibling, u.index = l.index, u.ref = l.ref, u.refCleanup = l.refCleanup, u;
}
function Bs(l, t) {
  l.flags &= 65011714;
  var u = l.alternate;
  return u === null ? (l.childLanes = 0, l.lanes = t, l.child = null, l.subtreeFlags = 0, l.memoizedProps = null, l.memoizedState = null, l.updateQueue = null, l.dependencies = null, l.stateNode = null) : (l.childLanes = u.childLanes, l.lanes = u.lanes, l.child = u.child, l.subtreeFlags = 0, l.deletions = null, l.memoizedProps = u.memoizedProps, l.memoizedState = u.memoizedState, l.updateQueue = u.updateQueue, l.type = u.type, t = u.dependencies, l.dependencies = t === null ? null : {
    lanes: t.lanes,
    firstContext: t.firstContext
  }), l;
}
function Me(l, t, u, a, e, n) {
  var f = 0;
  if (a = l, typeof l == "function") Nc(l) && (f = 1);
  else if (typeof l == "string")
    f = gh(
      l,
      u,
      Wl.current
    ) ? 26 : l === "html" || l === "head" || l === "body" ? 27 : 5;
  else
    l: switch (l) {
      case rf:
        return l = Dl(31, u, t, e), l.elementType = rf, l.lanes = n, l;
      case gu:
        return kt(u.children, e, n, t);
      case ts:
        f = 8, e |= 24;
        break;
      case gf:
        return l = Dl(12, u, t, e | 2), l.elementType = gf, l.lanes = n, l;
      case Sf:
        return l = Dl(13, u, t, e), l.elementType = Sf, l.lanes = n, l;
      case bf:
        return l = Dl(19, u, t, e), l.elementType = bf, l.lanes = n, l;
      default:
        if (typeof l == "object" && l !== null)
          switch (l.$$typeof) {
            case ed:
            case nt:
              f = 10;
              break l;
            case us:
              f = 9;
              break l;
            case gc:
              f = 11;
              break l;
            case Sc:
              f = 14;
              break l;
            case Tt:
              f = 16, a = null;
              break l;
          }
        f = 29, u = Error(
          b(130, l === null ? "null" : typeof l, "")
        ), a = null;
    }
  return t = Dl(f, u, t, e), t.elementType = l, t.type = a, t.lanes = n, t;
}
function kt(l, t, u, a) {
  return l = Dl(7, l, a, t), l.lanes = u, l;
}
function wn(l, t, u) {
  return l = Dl(6, l, null, t), l.lanes = u, l;
}
function $n(l, t, u) {
  return t = Dl(
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
var _u = [], Mu = 0, Ce = null, Ve = 0, Bl = [], Gl = 0, Ft = null, ft = 1, ct = "";
function wt(l, t) {
  _u[Mu++] = Ve, _u[Mu++] = Ce, Ce = l, Ve = t;
}
function Gs(l, t, u) {
  Bl[Gl++] = ft, Bl[Gl++] = ct, Bl[Gl++] = Ft, Ft = l;
  var a = ft;
  l = ct;
  var e = 32 - Rl(a) - 1;
  a &= ~(1 << e), u += 1;
  var n = 32 - Rl(t) + e;
  if (30 < n) {
    var f = e - e % 5;
    n = (a & (1 << f) - 1).toString(32), a >>= f, e -= f, ft = 1 << 32 - Rl(t) + e | u << e | a, ct = n + l;
  } else
    ft = 1 << n | u << e | a, ct = l;
}
function Hc(l) {
  l.return !== null && (wt(l, 1), Gs(l, 1, 0));
}
function pc(l) {
  for (; l === Ce; )
    Ce = _u[--Mu], _u[Mu] = null, Ve = _u[--Mu], _u[Mu] = null;
  for (; l === Ft; )
    Ft = Bl[--Gl], Bl[Gl] = null, ct = Bl[--Gl], Bl[Gl] = null, ft = Bl[--Gl], Bl[Gl] = null;
}
var gl = null, W = null, B = !1, It = null, wl = !1, pf = Error(b(519));
function uu(l) {
  var t = Error(b(418, ""));
  throw pa(Ql(t, l)), pf;
}
function Qi(l) {
  var t = l.stateNode, u = l.type, a = l.memoizedProps;
  switch (t[ol] = l, t[Al] = a, u) {
    case "dialog":
      H("cancel", t), H("close", t);
      break;
    case "iframe":
    case "object":
    case "embed":
      H("load", t);
      break;
    case "video":
    case "audio":
      for (u = 0; u < xa.length; u++)
        H(xa[u], t);
      break;
    case "source":
      H("error", t);
      break;
    case "img":
    case "image":
    case "link":
      H("error", t), H("load", t);
      break;
    case "details":
      H("toggle", t);
      break;
    case "input":
      H("invalid", t), ms(
        t,
        a.value,
        a.defaultValue,
        a.checked,
        a.defaultChecked,
        a.type,
        a.name,
        !0
      ), Qe(t);
      break;
    case "select":
      H("invalid", t);
      break;
    case "textarea":
      H("invalid", t), Ss(t, a.value, a.defaultValue, a.children), Qe(t);
  }
  u = a.children, typeof u != "string" && typeof u != "number" && typeof u != "bigint" || t.textContent === "" + u || a.suppressHydrationWarning === !0 || bv(t.textContent, u) ? (a.popover != null && (H("beforetoggle", t), H("toggle", t)), a.onScroll != null && H("scroll", t), a.onScrollEnd != null && H("scrollend", t), a.onClick != null && (t.onclick = Un), t = !0) : t = !1, t || uu(l);
}
function Zi(l) {
  for (gl = l.return; gl; )
    switch (gl.tag) {
      case 5:
      case 13:
        wl = !1;
        return;
      case 27:
      case 3:
        wl = !0;
        return;
      default:
        gl = gl.return;
    }
}
function aa(l) {
  if (l !== gl) return !1;
  if (!B) return Zi(l), B = !0, !1;
  var t = l.tag, u;
  if ((u = t !== 3 && t !== 27) && ((u = t === 5) && (u = l.type, u = !(u !== "form" && u !== "button") || ec(l.type, l.memoizedProps)), u = !u), u && W && uu(l), Zi(l), t === 13) {
    if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(b(317));
    l: {
      for (l = l.nextSibling, t = 0; l; ) {
        if (l.nodeType === 8)
          if (u = l.data, u === "/$") {
            if (t === 0) {
              W = Ll(l.nextSibling);
              break l;
            }
            t--;
          } else
            u !== "$" && u !== "$!" && u !== "$?" || t++;
        l = l.nextSibling;
      }
      W = null;
    }
  } else
    t === 27 ? (t = W, Vt(l.type) ? (l = cc, cc = null, W = l) : W = t) : W = gl ? Ll(l.stateNode.nextSibling) : null;
  return !0;
}
function $a() {
  W = gl = null, B = !1;
}
function ji() {
  var l = It;
  return l !== null && (Tl === null ? Tl = l : Tl.push.apply(
    Tl,
    l
  ), It = null), l;
}
function pa(l) {
  It === null ? It = [l] : It.push(l);
}
var Yf = Il(null), su = null, it = null;
function zt(l, t, u) {
  w(Yf, t._currentValue), t._currentValue = u;
}
function dt(l) {
  l._currentValue = Yf.current, vl(Yf);
}
function qf(l, t, u) {
  for (; l !== null; ) {
    var a = l.alternate;
    if ((l.childLanes & t) !== t ? (l.childLanes |= t, a !== null && (a.childLanes |= t)) : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t), l === u) break;
    l = l.return;
  }
}
function xf(l, t, u, a) {
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
            n.lanes |= u, c = n.alternate, c !== null && (c.lanes |= u), qf(
              n.return,
              u,
              l
            ), a || (f = null);
            break l;
          }
        n = c.next;
      }
    } else if (e.tag === 18) {
      if (f = e.return, f === null) throw Error(b(341));
      f.lanes |= u, n = f.alternate, n !== null && (n.lanes |= u), qf(f, u, l), f = null;
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
function Wa(l, t, u, a) {
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
        pl(e.pendingProps.value, f.value) || (l !== null ? l.push(c) : l = [c]);
      }
    } else if (e === xe.current) {
      if (f = e.alternate, f === null) throw Error(b(387));
      f.memoizedState.memoizedState !== e.memoizedState.memoizedState && (l !== null ? l.push(Xa) : l = [Xa]);
    }
    e = e.return;
  }
  l !== null && xf(
    t,
    l,
    u,
    a
  ), t.flags |= 262144;
}
function Le(l) {
  for (l = l.firstContext; l !== null; ) {
    if (!pl(
      l.context._currentValue,
      l.memoizedValue
    ))
      return !0;
    l = l.next;
  }
  return !1;
}
function au(l) {
  su = l, it = null, l = l.dependencies, l !== null && (l.firstContext = null);
}
function ml(l) {
  return Xs(su, l);
}
function he(l, t) {
  return su === null && au(l), Xs(l, t);
}
function Xs(l, t) {
  var u = t._currentValue;
  if (t = { context: t, memoizedValue: u, next: null }, it === null) {
    if (l === null) throw Error(b(308));
    it = t, l.dependencies = { lanes: 0, firstContext: t }, l.flags |= 524288;
  } else it = it.next = t;
  return u;
}
var my = typeof AbortController < "u" ? AbortController : function() {
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
}, gy = nl.unstable_scheduleCallback, Sy = nl.unstable_NormalPriority, al = {
  $$typeof: nt,
  Consumer: null,
  Provider: null,
  _currentValue: null,
  _currentValue2: null,
  _threadCount: 0
};
function Yc() {
  return {
    controller: new my(),
    data: /* @__PURE__ */ new Map(),
    refCount: 0
  };
}
function ka(l) {
  l.refCount--, l.refCount === 0 && gy(Sy, function() {
    l.controller.abort();
  });
}
var Sa = null, Bf = 0, Qu = 0, Hu = null;
function by(l, t) {
  if (Sa === null) {
    var u = Sa = [];
    Bf = 0, Qu = ui(), Hu = {
      status: "pending",
      value: void 0,
      then: function(a) {
        u.push(a);
      }
    };
  }
  return Bf++, t.then(Ci, Ci), t;
}
function Ci() {
  if (--Bf === 0 && Sa !== null) {
    Hu !== null && (Hu.status = "fulfilled");
    var l = Sa;
    Sa = null, Qu = 0, Hu = null;
    for (var t = 0; t < l.length; t++) (0, l[t])();
  }
}
function ry(l, t) {
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
var Vi = _.S;
_.S = function(l, t) {
  typeof t == "object" && t !== null && typeof t.then == "function" && by(l, t), Vi !== null && Vi(l, t);
};
var Pt = Il(null);
function qc() {
  var l = Pt.current;
  return l !== null ? l : V.pooledCache;
}
function De(l, t) {
  t === null ? w(Pt, Pt.current) : w(Pt, t.pool);
}
function Qs() {
  var l = qc();
  return l === null ? null : { parent: al._currentValue, pool: l };
}
var Fa = Error(b(460)), Zs = Error(b(474)), Tn = Error(b(542)), Gf = { then: function() {
} };
function Li(l) {
  return l = l.status, l === "fulfilled" || l === "rejected";
}
function oe() {
}
function js(l, t, u) {
  switch (u = l[u], u === void 0 ? l.push(t) : u !== t && (t.then(oe, oe), t = u), t.status) {
    case "fulfilled":
      return t.value;
    case "rejected":
      throw l = t.reason, Ji(l), l;
    default:
      if (typeof t.status == "string") t.then(oe, oe);
      else {
        if (l = V, l !== null && 100 < l.shellSuspendCounter)
          throw Error(b(482));
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
          throw l = t.reason, Ji(l), l;
      }
      throw ba = t, Fa;
  }
}
var ba = null;
function Ki() {
  if (ba === null) throw Error(b(459));
  var l = ba;
  return ba = null, l;
}
function Ji(l) {
  if (l === Fa || l === Tn)
    throw Error(b(483));
}
var At = !1;
function xc(l) {
  l.updateQueue = {
    baseState: l.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, lanes: 0, hiddenCallbacks: null },
    callbacks: null
  };
}
function Xf(l, t) {
  l = l.updateQueue, t.updateQueue === l && (t.updateQueue = {
    baseState: l.baseState,
    firstBaseUpdate: l.firstBaseUpdate,
    lastBaseUpdate: l.lastBaseUpdate,
    shared: l.shared,
    callbacks: null
  });
}
function pt(l) {
  return { lane: l, tag: 0, payload: null, callback: null, next: null };
}
function Yt(l, t, u) {
  var a = l.updateQueue;
  if (a === null) return null;
  if (a = a.shared, Q & 2) {
    var e = a.pending;
    return e === null ? t.next = t : (t.next = e.next, e.next = t), a.pending = t, t = je(l), xs(l, null, u), t;
  }
  return En(l, a, t, u), je(l);
}
function ra(l, t, u) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (u & 4194048) !== 0)) {
    var a = t.lanes;
    a &= l.pendingLanes, u |= a, t.lanes = u, ss(l, u);
  }
}
function Wn(l, t) {
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
var Qf = !1;
function Ea() {
  if (Qf) {
    var l = Hu;
    if (l !== null) throw l;
  }
}
function Ta(l, t, u, a) {
  Qf = !1;
  var e = l.updateQueue;
  At = !1;
  var n = e.firstBaseUpdate, f = e.lastBaseUpdate, c = e.shared.pending;
  if (c !== null) {
    e.shared.pending = null;
    var i = c, d = i.next;
    i.next = null, f === null ? n = d : f.next = d, f = i;
    var g = l.alternate;
    g !== null && (g = g.updateQueue, c = g.lastBaseUpdate, c !== f && (c === null ? g.firstBaseUpdate = d : c.next = d, g.lastBaseUpdate = i));
  }
  if (n !== null) {
    var m = e.baseState;
    f = 0, g = d = i = null, c = n;
    do {
      var y = c.lane & -536870913, o = y !== c.lane;
      if (o ? (q & y) === y : (a & y) === y) {
        y !== 0 && y === Qu && (Qf = !0), g !== null && (g = g.next = {
          lane: 0,
          tag: c.tag,
          payload: c.payload,
          callback: null,
          next: null
        });
        l: {
          var z = l, A = c;
          y = t;
          var x = u;
          switch (A.tag) {
            case 1:
              if (z = A.payload, typeof z == "function") {
                m = z.call(x, m, y);
                break l;
              }
              m = z;
              break l;
            case 3:
              z.flags = z.flags & -65537 | 128;
            case 0:
              if (z = A.payload, y = typeof z == "function" ? z.call(x, m, y) : z, y == null) break l;
              m = L({}, m, y);
              break l;
            case 2:
              At = !0;
          }
        }
        y = c.callback, y !== null && (l.flags |= 64, o && (l.flags |= 8192), o = e.callbacks, o === null ? e.callbacks = [y] : o.push(y));
      } else
        o = {
          lane: y,
          tag: c.tag,
          payload: c.payload,
          callback: c.callback,
          next: null
        }, g === null ? (d = g = o, i = m) : g = g.next = o, f |= y;
      if (c = c.next, c === null) {
        if (c = e.shared.pending, c === null)
          break;
        o = c, c = o.next, o.next = null, e.lastBaseUpdate = o, e.shared.pending = null;
      }
    } while (!0);
    g === null && (i = m), e.baseState = i, e.firstBaseUpdate = d, e.lastBaseUpdate = g, n === null && (e.shared.lanes = 0), jt |= f, l.lanes = f, l.memoizedState = m;
  }
}
function Cs(l, t) {
  if (typeof l != "function")
    throw Error(b(191, l));
  l.call(t);
}
function Vs(l, t) {
  var u = l.callbacks;
  if (u !== null)
    for (l.callbacks = null, l = 0; l < u.length; l++)
      Cs(u[l], t);
}
var Zu = Il(null), Ke = Il(0);
function wi(l, t) {
  l = mt, w(Ke, l), w(Zu, t), mt = l | t.baseLanes;
}
function Zf() {
  w(Ke, mt), w(Zu, Zu.current);
}
function Bc() {
  mt = Ke.current, vl(Zu), vl(Ke);
}
var Qt = 0, U = null, j = null, tl = null, Je = !1, pu = !1, eu = !1, we = 0, Ya = 0, Yu = null, Ey = 0;
function P() {
  throw Error(b(321));
}
function Gc(l, t) {
  if (t === null) return !1;
  for (var u = 0; u < t.length && u < l.length; u++)
    if (!pl(l[u], t[u])) return !1;
  return !0;
}
function Xc(l, t, u, a, e, n) {
  return Qt = n, U = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, _.H = l === null || l.memoizedState === null ? E1 : T1, eu = !1, n = u(a, e), eu = !1, pu && (n = Ks(
    t,
    u,
    a,
    e
  )), Ls(l), n;
}
function Ls(l) {
  _.H = $e;
  var t = j !== null && j.next !== null;
  if (Qt = 0, tl = j = U = null, Je = !1, Ya = 0, Yu = null, t) throw Error(b(300));
  l === null || sl || (l = l.dependencies, l !== null && Le(l) && (sl = !0));
}
function Ks(l, t, u, a) {
  U = l;
  var e = 0;
  do {
    if (pu && (Yu = null), Ya = 0, pu = !1, 25 <= e) throw Error(b(301));
    if (e += 1, tl = j = null, l.updateQueue != null) {
      var n = l.updateQueue;
      n.lastEffect = null, n.events = null, n.stores = null, n.memoCache != null && (n.memoCache.index = 0);
    }
    _.H = Dy, n = t(u, a);
  } while (pu);
  return n;
}
function Ty() {
  var l = _.H, t = l.useState()[0];
  return t = typeof t.then == "function" ? Ia(t) : t, l = l.useState()[0], (j !== null ? j.memoizedState : null) !== l && (U.flags |= 1024), t;
}
function Qc() {
  var l = we !== 0;
  return we = 0, l;
}
function Zc(l, t, u) {
  t.updateQueue = l.updateQueue, t.flags &= -2053, l.lanes &= ~u;
}
function jc(l) {
  if (Je) {
    for (l = l.memoizedState; l !== null; ) {
      var t = l.queue;
      t !== null && (t.pending = null), l = l.next;
    }
    Je = !1;
  }
  Qt = 0, tl = j = U = null, pu = !1, Ya = we = 0, Yu = null;
}
function rl() {
  var l = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null
  };
  return tl === null ? U.memoizedState = tl = l : tl = tl.next = l, tl;
}
function ul() {
  if (j === null) {
    var l = U.alternate;
    l = l !== null ? l.memoizedState : null;
  } else l = j.next;
  var t = tl === null ? U.memoizedState : tl.next;
  if (t !== null)
    tl = t, j = l;
  else {
    if (l === null)
      throw U.alternate === null ? Error(b(467)) : Error(b(310));
    j = l, l = {
      memoizedState: j.memoizedState,
      baseState: j.baseState,
      baseQueue: j.baseQueue,
      queue: j.queue,
      next: null
    }, tl === null ? U.memoizedState = tl = l : tl = tl.next = l;
  }
  return tl;
}
function Cc() {
  return { lastEffect: null, events: null, stores: null, memoCache: null };
}
function Ia(l) {
  var t = Ya;
  return Ya += 1, Yu === null && (Yu = []), l = js(Yu, l, t), t = U, (tl === null ? t.memoizedState : tl.next) === null && (t = t.alternate, _.H = t === null || t.memoizedState === null ? E1 : T1), l;
}
function An(l) {
  if (l !== null && typeof l == "object") {
    if (typeof l.then == "function") return Ia(l);
    if (l.$$typeof === nt) return ml(l);
  }
  throw Error(b(438, String(l)));
}
function Vc(l) {
  var t = null, u = U.updateQueue;
  if (u !== null && (t = u.memoCache), t == null) {
    var a = U.alternate;
    a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (t = {
      data: a.data.map(function(e) {
        return e.slice();
      }),
      index: 0
    })));
  }
  if (t == null && (t = { data: [], index: 0 }), u === null && (u = Cc(), U.updateQueue = u), u.memoCache = t, u = t.data[t.index], u === void 0)
    for (u = t.data[t.index] = Array(l), a = 0; a < l; a++)
      u[a] = nd;
  return t.index++, u;
}
function ht(l, t) {
  return typeof t == "function" ? t(l) : t;
}
function Ue(l) {
  var t = ul();
  return Lc(t, j, l);
}
function Lc(l, t, u) {
  var a = l.queue;
  if (a === null) throw Error(b(311));
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
    var c = f = null, i = null, d = t, g = !1;
    do {
      var m = d.lane & -536870913;
      if (m !== d.lane ? (q & m) === m : (Qt & m) === m) {
        var y = d.revertLane;
        if (y === 0)
          i !== null && (i = i.next = {
            lane: 0,
            revertLane: 0,
            action: d.action,
            hasEagerState: d.hasEagerState,
            eagerState: d.eagerState,
            next: null
          }), m === Qu && (g = !0);
        else if ((Qt & y) === y) {
          d = d.next, y === Qu && (g = !0);
          continue;
        } else
          m = {
            lane: 0,
            revertLane: d.revertLane,
            action: d.action,
            hasEagerState: d.hasEagerState,
            eagerState: d.eagerState,
            next: null
          }, i === null ? (c = i = m, f = n) : i = i.next = m, U.lanes |= y, jt |= y;
        m = d.action, eu && u(n, m), n = d.hasEagerState ? d.eagerState : u(n, m);
      } else
        y = {
          lane: m,
          revertLane: d.revertLane,
          action: d.action,
          hasEagerState: d.hasEagerState,
          eagerState: d.eagerState,
          next: null
        }, i === null ? (c = i = y, f = n) : i = i.next = y, U.lanes |= m, jt |= m;
      d = d.next;
    } while (d !== null && d !== t);
    if (i === null ? f = n : i.next = c, !pl(n, l.memoizedState) && (sl = !0, g && (u = Hu, u !== null)))
      throw u;
    l.memoizedState = n, l.baseState = f, l.baseQueue = i, a.lastRenderedState = n;
  }
  return e === null && (a.lanes = 0), [l.memoizedState, a.dispatch];
}
function kn(l) {
  var t = ul(), u = t.queue;
  if (u === null) throw Error(b(311));
  u.lastRenderedReducer = l;
  var a = u.dispatch, e = u.pending, n = t.memoizedState;
  if (e !== null) {
    u.pending = null;
    var f = e = e.next;
    do
      n = l(n, f.action), f = f.next;
    while (f !== e);
    pl(n, t.memoizedState) || (sl = !0), t.memoizedState = n, t.baseQueue === null && (t.baseState = n), u.lastRenderedState = n;
  }
  return [n, a];
}
function Js(l, t, u) {
  var a = U, e = ul(), n = B;
  if (n) {
    if (u === void 0) throw Error(b(407));
    u = u();
  } else u = t();
  var f = !pl(
    (j || e).memoizedState,
    u
  );
  f && (e.memoizedState = u, sl = !0), e = e.queue;
  var c = Ws.bind(null, a, e, l);
  if (Pa(2048, 8, c, [l]), e.getSnapshot !== t || f || tl !== null && tl.memoizedState.tag & 1) {
    if (a.flags |= 2048, ju(
      9,
      zn(),
      $s.bind(
        null,
        a,
        e,
        u,
        t
      ),
      null
    ), V === null) throw Error(b(349));
    n || Qt & 124 || ws(a, t, u);
  }
  return u;
}
function ws(l, t, u) {
  l.flags |= 16384, l = { getSnapshot: t, value: u }, t = U.updateQueue, t === null ? (t = Cc(), U.updateQueue = t, t.stores = [l]) : (u = t.stores, u === null ? t.stores = [l] : u.push(l));
}
function $s(l, t, u, a) {
  t.value = u, t.getSnapshot = a, ks(t) && Fs(l);
}
function Ws(l, t, u) {
  return u(function() {
    ks(t) && Fs(l);
  });
}
function ks(l) {
  var t = l.getSnapshot;
  l = l.value;
  try {
    var u = t();
    return !pl(l, u);
  } catch {
    return !0;
  }
}
function Fs(l) {
  var t = ku(l, 2);
  t !== null && Hl(t, l, 2);
}
function jf(l) {
  var t = rl();
  if (typeof l == "function") {
    var u = l;
    if (l = u(), eu) {
      Dt(!0);
      try {
        u();
      } finally {
        Dt(!1);
      }
    }
  }
  return t.memoizedState = t.baseState = l, t.queue = {
    pending: null,
    lanes: 0,
    dispatch: null,
    lastRenderedReducer: ht,
    lastRenderedState: l
  }, t;
}
function Is(l, t, u, a) {
  return l.baseState = u, Lc(
    l,
    j,
    typeof a == "function" ? a : ht
  );
}
function Ay(l, t, u, a, e) {
  if (On(l)) throw Error(b(485));
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
    _.T !== null ? u(!0) : n.isTransition = !1, a(n), u = t.pending, u === null ? (n.next = t.pending = n, Ps(t, n)) : (n.next = u.next, t.pending = u.next = n);
  }
}
function Ps(l, t) {
  var u = t.action, a = t.payload, e = l.state;
  if (t.isTransition) {
    var n = _.T, f = {};
    _.T = f;
    try {
      var c = u(e, a), i = _.S;
      i !== null && i(f, c), $i(l, t, c);
    } catch (d) {
      Cf(l, t, d);
    } finally {
      _.T = n;
    }
  } else
    try {
      n = u(e, a), $i(l, t, n);
    } catch (d) {
      Cf(l, t, d);
    }
}
function $i(l, t, u) {
  u !== null && typeof u == "object" && typeof u.then == "function" ? u.then(
    function(a) {
      Wi(l, t, a);
    },
    function(a) {
      return Cf(l, t, a);
    }
  ) : Wi(l, t, u);
}
function Wi(l, t, u) {
  t.status = "fulfilled", t.value = u, l1(t), l.state = u, t = l.pending, t !== null && (u = t.next, u === t ? l.pending = null : (u = u.next, t.next = u, Ps(l, u)));
}
function Cf(l, t, u) {
  var a = l.pending;
  if (l.pending = null, a !== null) {
    a = a.next;
    do
      t.status = "rejected", t.reason = u, l1(t), t = t.next;
    while (t !== a);
  }
  l.action = null;
}
function l1(l) {
  l = l.listeners;
  for (var t = 0; t < l.length; t++) (0, l[t])();
}
function t1(l, t) {
  return t;
}
function ki(l, t) {
  if (B) {
    var u = V.formState;
    if (u !== null) {
      l: {
        var a = U;
        if (B) {
          if (W) {
            t: {
              for (var e = W, n = wl; e.nodeType !== 8; ) {
                if (!n) {
                  e = null;
                  break t;
                }
                if (e = Ll(
                  e.nextSibling
                ), e === null) {
                  e = null;
                  break t;
                }
              }
              n = e.data, e = n === "F!" || n === "F" ? e : null;
            }
            if (e) {
              W = Ll(
                e.nextSibling
              ), a = e.data === "F!";
              break l;
            }
          }
          uu(a);
        }
        a = !1;
      }
      a && (t = u[0]);
    }
  }
  return u = rl(), u.memoizedState = u.baseState = t, a = {
    pending: null,
    lanes: 0,
    dispatch: null,
    lastRenderedReducer: t1,
    lastRenderedState: t
  }, u.queue = a, u = S1.bind(
    null,
    U,
    a
  ), a.dispatch = u, a = jf(!1), n = $c.bind(
    null,
    U,
    !1,
    a.queue
  ), a = rl(), e = {
    state: t,
    dispatch: null,
    action: l,
    pending: null
  }, a.queue = e, u = Ay.bind(
    null,
    U,
    e,
    n,
    u
  ), e.dispatch = u, a.memoizedState = l, [t, u, !1];
}
function Fi(l) {
  var t = ul();
  return u1(t, j, l);
}
function u1(l, t, u) {
  if (t = Lc(
    l,
    t,
    t1
  )[0], l = Ue(ht)[0], typeof t == "object" && t !== null && typeof t.then == "function")
    try {
      var a = Ia(t);
    } catch (f) {
      throw f === Fa ? Tn : f;
    }
  else a = t;
  t = ul();
  var e = t.queue, n = e.dispatch;
  return u !== t.memoizedState && (U.flags |= 2048, ju(
    9,
    zn(),
    zy.bind(null, e, u),
    null
  )), [a, n, l];
}
function zy(l, t) {
  l.action = t;
}
function Ii(l) {
  var t = ul(), u = j;
  if (u !== null)
    return u1(t, u, l);
  ul(), t = t.memoizedState, u = ul();
  var a = u.queue.dispatch;
  return u.memoizedState = l, [t, a, !1];
}
function ju(l, t, u, a) {
  return l = { tag: l, create: u, deps: a, inst: t, next: null }, t = U.updateQueue, t === null && (t = Cc(), U.updateQueue = t), u = t.lastEffect, u === null ? t.lastEffect = l.next = l : (a = u.next, u.next = l, l.next = a, t.lastEffect = l), l;
}
function zn() {
  return { destroy: void 0, resource: void 0 };
}
function a1() {
  return ul().memoizedState;
}
function Re(l, t, u, a) {
  var e = rl();
  a = a === void 0 ? null : a, U.flags |= l, e.memoizedState = ju(
    1 | t,
    zn(),
    u,
    a
  );
}
function Pa(l, t, u, a) {
  var e = ul();
  a = a === void 0 ? null : a;
  var n = e.memoizedState.inst;
  j !== null && a !== null && Gc(a, j.memoizedState.deps) ? e.memoizedState = ju(t, n, u, a) : (U.flags |= l, e.memoizedState = ju(
    1 | t,
    n,
    u,
    a
  ));
}
function Pi(l, t) {
  Re(8390656, 8, l, t);
}
function e1(l, t) {
  Pa(2048, 8, l, t);
}
function n1(l, t) {
  return Pa(4, 2, l, t);
}
function f1(l, t) {
  return Pa(4, 4, l, t);
}
function c1(l, t) {
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
function i1(l, t, u) {
  u = u != null ? u.concat([l]) : null, Pa(4, 4, c1.bind(null, t, l), u);
}
function Kc() {
}
function s1(l, t) {
  var u = ul();
  t = t === void 0 ? null : t;
  var a = u.memoizedState;
  return t !== null && Gc(t, a[1]) ? a[0] : (u.memoizedState = [l, t], l);
}
function v1(l, t) {
  var u = ul();
  t = t === void 0 ? null : t;
  var a = u.memoizedState;
  if (t !== null && Gc(t, a[1]))
    return a[0];
  if (a = l(), eu) {
    Dt(!0);
    try {
      l();
    } finally {
      Dt(!1);
    }
  }
  return u.memoizedState = [a, t], a;
}
function Jc(l, t, u) {
  return u === void 0 || Qt & 1073741824 ? l.memoizedState = t : (l.memoizedState = u, l = lv(), U.lanes |= l, jt |= l, u);
}
function d1(l, t, u, a) {
  return pl(u, t) ? u : Zu.current !== null ? (l = Jc(l, u, a), pl(l, t) || (sl = !0), l) : Qt & 42 ? (l = lv(), U.lanes |= l, jt |= l, t) : (sl = !0, l.memoizedState = u);
}
function y1(l, t, u, a, e) {
  var n = G.p;
  G.p = n !== 0 && 8 > n ? n : 8;
  var f = _.T, c = {};
  _.T = c, $c(l, !1, t, u);
  try {
    var i = e(), d = _.S;
    if (d !== null && d(c, i), i !== null && typeof i == "object" && typeof i.then == "function") {
      var g = ry(
        i,
        a
      );
      Aa(
        l,
        t,
        g,
        Nl(l)
      );
    } else
      Aa(
        l,
        t,
        a,
        Nl(l)
      );
  } catch (m) {
    Aa(
      l,
      t,
      { then: function() {
      }, status: "rejected", reason: m },
      Nl()
    );
  } finally {
    G.p = n, _.T = f;
  }
}
function Oy() {
}
function Vf(l, t, u, a) {
  if (l.tag !== 5) throw Error(b(476));
  var e = h1(l).queue;
  y1(
    l,
    e,
    t,
    Wt,
    u === null ? Oy : function() {
      return o1(l), u(a);
    }
  );
}
function h1(l) {
  var t = l.memoizedState;
  if (t !== null) return t;
  t = {
    memoizedState: Wt,
    baseState: Wt,
    baseQueue: null,
    queue: {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: ht,
      lastRenderedState: Wt
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
      lastRenderedReducer: ht,
      lastRenderedState: u
    },
    next: null
  }, l.memoizedState = t, l = l.alternate, l !== null && (l.memoizedState = t), t;
}
function o1(l) {
  var t = h1(l).next.queue;
  Aa(l, t, {}, Nl());
}
function wc() {
  return ml(Xa);
}
function m1() {
  return ul().memoizedState;
}
function g1() {
  return ul().memoizedState;
}
function _y(l) {
  for (var t = l.return; t !== null; ) {
    switch (t.tag) {
      case 24:
      case 3:
        var u = Nl();
        l = pt(u);
        var a = Yt(t, l, u);
        a !== null && (Hl(a, t, u), ra(a, t, u)), t = { cache: Yc() }, l.payload = t;
        return;
    }
    t = t.return;
  }
}
function My(l, t, u) {
  var a = Nl();
  u = {
    lane: a,
    revertLane: 0,
    action: u,
    hasEagerState: !1,
    eagerState: null,
    next: null
  }, On(l) ? b1(t, u) : (u = Rc(l, t, u, a), u !== null && (Hl(u, l, a), r1(u, t, a)));
}
function S1(l, t, u) {
  var a = Nl();
  Aa(l, t, u, a);
}
function Aa(l, t, u, a) {
  var e = {
    lane: a,
    revertLane: 0,
    action: u,
    hasEagerState: !1,
    eagerState: null,
    next: null
  };
  if (On(l)) b1(t, e);
  else {
    var n = l.alternate;
    if (l.lanes === 0 && (n === null || n.lanes === 0) && (n = t.lastRenderedReducer, n !== null))
      try {
        var f = t.lastRenderedState, c = n(f, u);
        if (e.hasEagerState = !0, e.eagerState = c, pl(c, f))
          return En(l, t, e, 0), V === null && rn(), !1;
      } catch {
      } finally {
      }
    if (u = Rc(l, t, e, a), u !== null)
      return Hl(u, l, a), r1(u, t, a), !0;
  }
  return !1;
}
function $c(l, t, u, a) {
  if (a = {
    lane: 2,
    revertLane: ui(),
    action: a,
    hasEagerState: !1,
    eagerState: null,
    next: null
  }, On(l)) {
    if (t) throw Error(b(479));
  } else
    t = Rc(
      l,
      u,
      a,
      2
    ), t !== null && Hl(t, l, 2);
}
function On(l) {
  var t = l.alternate;
  return l === U || t !== null && t === U;
}
function b1(l, t) {
  pu = Je = !0;
  var u = l.pending;
  u === null ? t.next = t : (t.next = u.next, u.next = t), l.pending = t;
}
function r1(l, t, u) {
  if (u & 4194048) {
    var a = t.lanes;
    a &= l.pendingLanes, u |= a, t.lanes = u, ss(l, u);
  }
}
var $e = {
  readContext: ml,
  use: An,
  useCallback: P,
  useContext: P,
  useEffect: P,
  useImperativeHandle: P,
  useLayoutEffect: P,
  useInsertionEffect: P,
  useMemo: P,
  useReducer: P,
  useRef: P,
  useState: P,
  useDebugValue: P,
  useDeferredValue: P,
  useTransition: P,
  useSyncExternalStore: P,
  useId: P,
  useHostTransitionStatus: P,
  useFormState: P,
  useActionState: P,
  useOptimistic: P,
  useMemoCache: P,
  useCacheRefresh: P
}, E1 = {
  readContext: ml,
  use: An,
  useCallback: function(l, t) {
    return rl().memoizedState = [
      l,
      t === void 0 ? null : t
    ], l;
  },
  useContext: ml,
  useEffect: Pi,
  useImperativeHandle: function(l, t, u) {
    u = u != null ? u.concat([l]) : null, Re(
      4194308,
      4,
      c1.bind(null, t, l),
      u
    );
  },
  useLayoutEffect: function(l, t) {
    return Re(4194308, 4, l, t);
  },
  useInsertionEffect: function(l, t) {
    Re(4, 2, l, t);
  },
  useMemo: function(l, t) {
    var u = rl();
    t = t === void 0 ? null : t;
    var a = l();
    if (eu) {
      Dt(!0);
      try {
        l();
      } finally {
        Dt(!1);
      }
    }
    return u.memoizedState = [a, t], a;
  },
  useReducer: function(l, t, u) {
    var a = rl();
    if (u !== void 0) {
      var e = u(t);
      if (eu) {
        Dt(!0);
        try {
          u(t);
        } finally {
          Dt(!1);
        }
      }
    } else e = t;
    return a.memoizedState = a.baseState = e, l = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: l,
      lastRenderedState: e
    }, a.queue = l, l = l.dispatch = My.bind(
      null,
      U,
      l
    ), [a.memoizedState, l];
  },
  useRef: function(l) {
    var t = rl();
    return l = { current: l }, t.memoizedState = l;
  },
  useState: function(l) {
    l = jf(l);
    var t = l.queue, u = S1.bind(null, U, t);
    return t.dispatch = u, [l.memoizedState, u];
  },
  useDebugValue: Kc,
  useDeferredValue: function(l, t) {
    var u = rl();
    return Jc(u, l, t);
  },
  useTransition: function() {
    var l = jf(!1);
    return l = y1.bind(
      null,
      U,
      l.queue,
      !0,
      !1
    ), rl().memoizedState = l, [!1, l];
  },
  useSyncExternalStore: function(l, t, u) {
    var a = U, e = rl();
    if (B) {
      if (u === void 0)
        throw Error(b(407));
      u = u();
    } else {
      if (u = t(), V === null)
        throw Error(b(349));
      q & 124 || ws(a, t, u);
    }
    e.memoizedState = u;
    var n = { value: u, getSnapshot: t };
    return e.queue = n, Pi(Ws.bind(null, a, n, l), [
      l
    ]), a.flags |= 2048, ju(
      9,
      zn(),
      $s.bind(
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
    var l = rl(), t = V.identifierPrefix;
    if (B) {
      var u = ct, a = ft;
      u = (a & ~(1 << 32 - Rl(a) - 1)).toString(32) + u, t = "«" + t + "R" + u, u = we++, 0 < u && (t += "H" + u.toString(32)), t += "»";
    } else
      u = Ey++, t = "«" + t + "r" + u.toString(32) + "»";
    return l.memoizedState = t;
  },
  useHostTransitionStatus: wc,
  useFormState: ki,
  useActionState: ki,
  useOptimistic: function(l) {
    var t = rl();
    t.memoizedState = t.baseState = l;
    var u = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: null,
      lastRenderedState: null
    };
    return t.queue = u, t = $c.bind(
      null,
      U,
      !0,
      u
    ), u.dispatch = t, [l, t];
  },
  useMemoCache: Vc,
  useCacheRefresh: function() {
    return rl().memoizedState = _y.bind(
      null,
      U
    );
  }
}, T1 = {
  readContext: ml,
  use: An,
  useCallback: s1,
  useContext: ml,
  useEffect: e1,
  useImperativeHandle: i1,
  useInsertionEffect: n1,
  useLayoutEffect: f1,
  useMemo: v1,
  useReducer: Ue,
  useRef: a1,
  useState: function() {
    return Ue(ht);
  },
  useDebugValue: Kc,
  useDeferredValue: function(l, t) {
    var u = ul();
    return d1(
      u,
      j.memoizedState,
      l,
      t
    );
  },
  useTransition: function() {
    var l = Ue(ht)[0], t = ul().memoizedState;
    return [
      typeof l == "boolean" ? l : Ia(l),
      t
    ];
  },
  useSyncExternalStore: Js,
  useId: m1,
  useHostTransitionStatus: wc,
  useFormState: Fi,
  useActionState: Fi,
  useOptimistic: function(l, t) {
    var u = ul();
    return Is(u, j, l, t);
  },
  useMemoCache: Vc,
  useCacheRefresh: g1
}, Dy = {
  readContext: ml,
  use: An,
  useCallback: s1,
  useContext: ml,
  useEffect: e1,
  useImperativeHandle: i1,
  useInsertionEffect: n1,
  useLayoutEffect: f1,
  useMemo: v1,
  useReducer: kn,
  useRef: a1,
  useState: function() {
    return kn(ht);
  },
  useDebugValue: Kc,
  useDeferredValue: function(l, t) {
    var u = ul();
    return j === null ? Jc(u, l, t) : d1(
      u,
      j.memoizedState,
      l,
      t
    );
  },
  useTransition: function() {
    var l = kn(ht)[0], t = ul().memoizedState;
    return [
      typeof l == "boolean" ? l : Ia(l),
      t
    ];
  },
  useSyncExternalStore: Js,
  useId: m1,
  useHostTransitionStatus: wc,
  useFormState: Ii,
  useActionState: Ii,
  useOptimistic: function(l, t) {
    var u = ul();
    return j !== null ? Is(u, j, l, t) : (u.baseState = l, [l, u.queue.dispatch]);
  },
  useMemoCache: Vc,
  useCacheRefresh: g1
}, qu = null, qa = 0;
function me(l) {
  var t = qa;
  return qa += 1, qu === null && (qu = []), js(qu, l, t);
}
function ea(l, t) {
  t = t.props.ref, l.ref = t !== void 0 ? t : null;
}
function ge(l, t) {
  throw t.$$typeof === ad ? Error(b(525)) : (l = Object.prototype.toString.call(t), Error(
    b(
      31,
      l === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : l
    )
  ));
}
function l0(l) {
  var t = l._init;
  return t(l._payload);
}
function A1(l) {
  function t(v, s) {
    if (l) {
      var h = v.deletions;
      h === null ? (v.deletions = [s], v.flags |= 16) : h.push(s);
    }
  }
  function u(v, s) {
    if (!l) return null;
    for (; s !== null; )
      t(v, s), s = s.sibling;
    return null;
  }
  function a(v) {
    for (var s = /* @__PURE__ */ new Map(); v !== null; )
      v.key !== null ? s.set(v.key, v) : s.set(v.index, v), v = v.sibling;
    return s;
  }
  function e(v, s) {
    return v = vt(v, s), v.index = 0, v.sibling = null, v;
  }
  function n(v, s, h) {
    return v.index = h, l ? (h = v.alternate, h !== null ? (h = h.index, h < s ? (v.flags |= 67108866, s) : h) : (v.flags |= 67108866, s)) : (v.flags |= 1048576, s);
  }
  function f(v) {
    return l && v.alternate === null && (v.flags |= 67108866), v;
  }
  function c(v, s, h, S) {
    return s === null || s.tag !== 6 ? (s = wn(h, v.mode, S), s.return = v, s) : (s = e(s, h), s.return = v, s);
  }
  function i(v, s, h, S) {
    var r = h.type;
    return r === gu ? g(
      v,
      s,
      h.props.children,
      S,
      h.key
    ) : s !== null && (s.elementType === r || typeof r == "object" && r !== null && r.$$typeof === Tt && l0(r) === s.type) ? (s = e(s, h.props), ea(s, h), s.return = v, s) : (s = Me(
      h.type,
      h.key,
      h.props,
      null,
      v.mode,
      S
    ), ea(s, h), s.return = v, s);
  }
  function d(v, s, h, S) {
    return s === null || s.tag !== 4 || s.stateNode.containerInfo !== h.containerInfo || s.stateNode.implementation !== h.implementation ? (s = $n(h, v.mode, S), s.return = v, s) : (s = e(s, h.children || []), s.return = v, s);
  }
  function g(v, s, h, S, r) {
    return s === null || s.tag !== 7 ? (s = kt(
      h,
      v.mode,
      S,
      r
    ), s.return = v, s) : (s = e(s, h), s.return = v, s);
  }
  function m(v, s, h) {
    if (typeof s == "string" && s !== "" || typeof s == "number" || typeof s == "bigint")
      return s = wn(
        "" + s,
        v.mode,
        h
      ), s.return = v, s;
    if (typeof s == "object" && s !== null) {
      switch (s.$$typeof) {
        case ie:
          return h = Me(
            s.type,
            s.key,
            s.props,
            null,
            v.mode,
            h
          ), ea(h, s), h.return = v, h;
        case ia:
          return s = $n(
            s,
            v.mode,
            h
          ), s.return = v, s;
        case Tt:
          var S = s._init;
          return s = S(s._payload), m(v, s, h);
      }
      if (sa(s) || la(s))
        return s = kt(
          s,
          v.mode,
          h,
          null
        ), s.return = v, s;
      if (typeof s.then == "function")
        return m(v, me(s), h);
      if (s.$$typeof === nt)
        return m(
          v,
          he(v, s),
          h
        );
      ge(v, s);
    }
    return null;
  }
  function y(v, s, h, S) {
    var r = s !== null ? s.key : null;
    if (typeof h == "string" && h !== "" || typeof h == "number" || typeof h == "bigint")
      return r !== null ? null : c(v, s, "" + h, S);
    if (typeof h == "object" && h !== null) {
      switch (h.$$typeof) {
        case ie:
          return h.key === r ? i(v, s, h, S) : null;
        case ia:
          return h.key === r ? d(v, s, h, S) : null;
        case Tt:
          return r = h._init, h = r(h._payload), y(v, s, h, S);
      }
      if (sa(h) || la(h))
        return r !== null ? null : g(v, s, h, S, null);
      if (typeof h.then == "function")
        return y(
          v,
          s,
          me(h),
          S
        );
      if (h.$$typeof === nt)
        return y(
          v,
          s,
          he(v, h),
          S
        );
      ge(v, h);
    }
    return null;
  }
  function o(v, s, h, S, r) {
    if (typeof S == "string" && S !== "" || typeof S == "number" || typeof S == "bigint")
      return v = v.get(h) || null, c(s, v, "" + S, r);
    if (typeof S == "object" && S !== null) {
      switch (S.$$typeof) {
        case ie:
          return v = v.get(
            S.key === null ? h : S.key
          ) || null, i(s, v, S, r);
        case ia:
          return v = v.get(
            S.key === null ? h : S.key
          ) || null, d(s, v, S, r);
        case Tt:
          var M = S._init;
          return S = M(S._payload), o(
            v,
            s,
            h,
            S,
            r
          );
      }
      if (sa(S) || la(S))
        return v = v.get(h) || null, g(s, v, S, r, null);
      if (typeof S.then == "function")
        return o(
          v,
          s,
          h,
          me(S),
          r
        );
      if (S.$$typeof === nt)
        return o(
          v,
          s,
          h,
          he(s, S),
          r
        );
      ge(s, S);
    }
    return null;
  }
  function z(v, s, h, S) {
    for (var r = null, M = null, T = s, O = s = 0, F = null; T !== null && O < h.length; O++) {
      T.index > O ? (F = T, T = null) : F = T.sibling;
      var Y = y(
        v,
        T,
        h[O],
        S
      );
      if (Y === null) {
        T === null && (T = F);
        break;
      }
      l && T && Y.alternate === null && t(v, T), s = n(Y, s, O), M === null ? r = Y : M.sibling = Y, M = Y, T = F;
    }
    if (O === h.length)
      return u(v, T), B && wt(v, O), r;
    if (T === null) {
      for (; O < h.length; O++)
        T = m(v, h[O], S), T !== null && (s = n(
          T,
          s,
          O
        ), M === null ? r = T : M.sibling = T, M = T);
      return B && wt(v, O), r;
    }
    for (T = a(T); O < h.length; O++)
      F = o(
        T,
        v,
        O,
        h[O],
        S
      ), F !== null && (l && F.alternate !== null && T.delete(
        F.key === null ? O : F.key
      ), s = n(
        F,
        s,
        O
      ), M === null ? r = F : M.sibling = F, M = F);
    return l && T.forEach(function(Yl) {
      return t(v, Yl);
    }), B && wt(v, O), r;
  }
  function A(v, s, h, S) {
    if (h == null) throw Error(b(151));
    for (var r = null, M = null, T = s, O = s = 0, F = null, Y = h.next(); T !== null && !Y.done; O++, Y = h.next()) {
      T.index > O ? (F = T, T = null) : F = T.sibling;
      var Yl = y(v, T, Y.value, S);
      if (Yl === null) {
        T === null && (T = F);
        break;
      }
      l && T && Yl.alternate === null && t(v, T), s = n(Yl, s, O), M === null ? r = Yl : M.sibling = Yl, M = Yl, T = F;
    }
    if (Y.done)
      return u(v, T), B && wt(v, O), r;
    if (T === null) {
      for (; !Y.done; O++, Y = h.next())
        Y = m(v, Y.value, S), Y !== null && (s = n(Y, s, O), M === null ? r = Y : M.sibling = Y, M = Y);
      return B && wt(v, O), r;
    }
    for (T = a(T); !Y.done; O++, Y = h.next())
      Y = o(T, v, O, Y.value, S), Y !== null && (l && Y.alternate !== null && T.delete(Y.key === null ? O : Y.key), s = n(Y, s, O), M === null ? r = Y : M.sibling = Y, M = Y);
    return l && T.forEach(function(St) {
      return t(v, St);
    }), B && wt(v, O), r;
  }
  function x(v, s, h, S) {
    if (typeof h == "object" && h !== null && h.type === gu && h.key === null && (h = h.props.children), typeof h == "object" && h !== null) {
      switch (h.$$typeof) {
        case ie:
          l: {
            for (var r = h.key; s !== null; ) {
              if (s.key === r) {
                if (r = h.type, r === gu) {
                  if (s.tag === 7) {
                    u(
                      v,
                      s.sibling
                    ), S = e(
                      s,
                      h.props.children
                    ), S.return = v, v = S;
                    break l;
                  }
                } else if (s.elementType === r || typeof r == "object" && r !== null && r.$$typeof === Tt && l0(r) === s.type) {
                  u(
                    v,
                    s.sibling
                  ), S = e(s, h.props), ea(S, h), S.return = v, v = S;
                  break l;
                }
                u(v, s);
                break;
              } else t(v, s);
              s = s.sibling;
            }
            h.type === gu ? (S = kt(
              h.props.children,
              v.mode,
              S,
              h.key
            ), S.return = v, v = S) : (S = Me(
              h.type,
              h.key,
              h.props,
              null,
              v.mode,
              S
            ), ea(S, h), S.return = v, v = S);
          }
          return f(v);
        case ia:
          l: {
            for (r = h.key; s !== null; ) {
              if (s.key === r)
                if (s.tag === 4 && s.stateNode.containerInfo === h.containerInfo && s.stateNode.implementation === h.implementation) {
                  u(
                    v,
                    s.sibling
                  ), S = e(s, h.children || []), S.return = v, v = S;
                  break l;
                } else {
                  u(v, s);
                  break;
                }
              else t(v, s);
              s = s.sibling;
            }
            S = $n(h, v.mode, S), S.return = v, v = S;
          }
          return f(v);
        case Tt:
          return r = h._init, h = r(h._payload), x(
            v,
            s,
            h,
            S
          );
      }
      if (sa(h))
        return z(
          v,
          s,
          h,
          S
        );
      if (la(h)) {
        if (r = la(h), typeof r != "function") throw Error(b(150));
        return h = r.call(h), A(
          v,
          s,
          h,
          S
        );
      }
      if (typeof h.then == "function")
        return x(
          v,
          s,
          me(h),
          S
        );
      if (h.$$typeof === nt)
        return x(
          v,
          s,
          he(v, h),
          S
        );
      ge(v, h);
    }
    return typeof h == "string" && h !== "" || typeof h == "number" || typeof h == "bigint" ? (h = "" + h, s !== null && s.tag === 6 ? (u(v, s.sibling), S = e(s, h), S.return = v, v = S) : (u(v, s), S = wn(h, v.mode, S), S.return = v, v = S), f(v)) : u(v, s);
  }
  return function(v, s, h, S) {
    try {
      qa = 0;
      var r = x(
        v,
        s,
        h,
        S
      );
      return qu = null, r;
    } catch (T) {
      if (T === Fa || T === Tn) throw T;
      var M = Dl(29, T, null, v.mode);
      return M.lanes = S, M.return = v, M;
    } finally {
    }
  };
}
var Cu = A1(!0), z1 = A1(!1), jl = Il(null), Fl = null;
function Ot(l) {
  var t = l.alternate;
  w(el, el.current & 1), w(jl, l), Fl === null && (t === null || Zu.current !== null || t.memoizedState !== null) && (Fl = l);
}
function O1(l) {
  if (l.tag === 22) {
    if (w(el, el.current), w(jl, l), Fl === null) {
      var t = l.alternate;
      t !== null && t.memoizedState !== null && (Fl = l);
    }
  } else _t();
}
function _t() {
  w(el, el.current), w(jl, jl.current);
}
function st(l) {
  vl(jl), Fl === l && (Fl = null), vl(el);
}
var el = Il(0);
function We(l) {
  for (var t = l; t !== null; ) {
    if (t.tag === 13) {
      var u = t.memoizedState;
      if (u !== null && (u = u.dehydrated, u === null || u.data === "$?" || fc(u)))
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
function Fn(l, t, u, a) {
  t = l.memoizedState, u = u(a, t), u = u == null ? t : L({}, t, u), l.memoizedState = u, l.lanes === 0 && (l.updateQueue.baseState = u);
}
var Lf = {
  enqueueSetState: function(l, t, u) {
    l = l._reactInternals;
    var a = Nl(), e = pt(a);
    e.payload = t, u != null && (e.callback = u), t = Yt(l, e, a), t !== null && (Hl(t, l, a), ra(t, l, a));
  },
  enqueueReplaceState: function(l, t, u) {
    l = l._reactInternals;
    var a = Nl(), e = pt(a);
    e.tag = 1, e.payload = t, u != null && (e.callback = u), t = Yt(l, e, a), t !== null && (Hl(t, l, a), ra(t, l, a));
  },
  enqueueForceUpdate: function(l, t) {
    l = l._reactInternals;
    var u = Nl(), a = pt(u);
    a.tag = 2, t != null && (a.callback = t), t = Yt(l, a, u), t !== null && (Hl(t, l, u), ra(t, l, u));
  }
};
function t0(l, t, u, a, e, n, f) {
  return l = l.stateNode, typeof l.shouldComponentUpdate == "function" ? l.shouldComponentUpdate(a, n, f) : t.prototype && t.prototype.isPureReactComponent ? !Ha(u, a) || !Ha(e, n) : !0;
}
function u0(l, t, u, a) {
  l = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(u, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(u, a), t.state !== l && Lf.enqueueReplaceState(t, t.state, null);
}
function nu(l, t) {
  var u = t;
  if ("ref" in t) {
    u = {};
    for (var a in t)
      a !== "ref" && (u[a] = t[a]);
  }
  if (l = l.defaultProps) {
    u === t && (u = L({}, u));
    for (var e in l)
      u[e] === void 0 && (u[e] = l[e]);
  }
  return u;
}
var ke = typeof reportError == "function" ? reportError : function(l) {
  if (typeof window == "object" && typeof window.ErrorEvent == "function") {
    var t = new window.ErrorEvent("error", {
      bubbles: !0,
      cancelable: !0,
      message: typeof l == "object" && l !== null && typeof l.message == "string" ? String(l.message) : String(l),
      error: l
    });
    if (!window.dispatchEvent(t)) return;
  } else if (typeof qn == "object" && typeof qn.emit == "function") {
    qn.emit("uncaughtException", l);
    return;
  }
  console.error(l);
};
function _1(l) {
  ke(l);
}
function M1(l) {
  console.error(l);
}
function D1(l) {
  ke(l);
}
function Fe(l, t) {
  try {
    var u = l.onUncaughtError;
    u(t.value, { componentStack: t.stack });
  } catch (a) {
    setTimeout(function() {
      throw a;
    });
  }
}
function a0(l, t, u) {
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
function Kf(l, t, u) {
  return u = pt(u), u.tag = 3, u.payload = { element: null }, u.callback = function() {
    Fe(l, t);
  }, u;
}
function U1(l) {
  return l = pt(l), l.tag = 3, l;
}
function R1(l, t, u, a) {
  var e = u.type.getDerivedStateFromError;
  if (typeof e == "function") {
    var n = a.value;
    l.payload = function() {
      return e(n);
    }, l.callback = function() {
      a0(t, u, a);
    };
  }
  var f = u.stateNode;
  f !== null && typeof f.componentDidCatch == "function" && (l.callback = function() {
    a0(t, u, a), typeof e != "function" && (qt === null ? qt = /* @__PURE__ */ new Set([this]) : qt.add(this));
    var c = a.stack;
    this.componentDidCatch(a.value, {
      componentStack: c !== null ? c : ""
    });
  });
}
function Uy(l, t, u, a, e) {
  if (u.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
    if (t = u.alternate, t !== null && Wa(
      t,
      u,
      e,
      !0
    ), u = jl.current, u !== null) {
      switch (u.tag) {
        case 13:
          return Fl === null ? Pf() : u.alternate === null && k === 0 && (k = 3), u.flags &= -257, u.flags |= 65536, u.lanes = e, a === Gf ? u.flags |= 16384 : (t = u.updateQueue, t === null ? u.updateQueue = /* @__PURE__ */ new Set([a]) : t.add(a), sf(l, a, e)), !1;
        case 22:
          return u.flags |= 65536, a === Gf ? u.flags |= 16384 : (t = u.updateQueue, t === null ? (t = {
            transitions: null,
            markerInstances: null,
            retryQueue: /* @__PURE__ */ new Set([a])
          }, u.updateQueue = t) : (u = t.retryQueue, u === null ? t.retryQueue = /* @__PURE__ */ new Set([a]) : u.add(a)), sf(l, a, e)), !1;
      }
      throw Error(b(435, u.tag));
    }
    return sf(l, a, e), Pf(), !1;
  }
  if (B)
    return t = jl.current, t !== null ? (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = e, a !== pf && (l = Error(b(422), { cause: a }), pa(Ql(l, u)))) : (a !== pf && (t = Error(b(423), {
      cause: a
    }), pa(
      Ql(t, u)
    )), l = l.current.alternate, l.flags |= 65536, e &= -e, l.lanes |= e, a = Ql(a, u), e = Kf(
      l.stateNode,
      a,
      e
    ), Wn(l, e), k !== 4 && (k = 2)), !1;
  var n = Error(b(520), { cause: a });
  if (n = Ql(n, u), _a === null ? _a = [n] : _a.push(n), k !== 4 && (k = 2), t === null) return !0;
  a = Ql(a, u), u = t;
  do {
    switch (u.tag) {
      case 3:
        return u.flags |= 65536, l = e & -e, u.lanes |= l, l = Kf(u.stateNode, a, l), Wn(u, l), !1;
      case 1:
        if (t = u.type, n = u.stateNode, (u.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || n !== null && typeof n.componentDidCatch == "function" && (qt === null || !qt.has(n))))
          return u.flags |= 65536, e &= -e, u.lanes |= e, e = U1(e), R1(
            e,
            l,
            u,
            a
          ), Wn(u, e), !1;
    }
    u = u.return;
  } while (u !== null);
  return !1;
}
var N1 = Error(b(461)), sl = !1;
function dl(l, t, u, a) {
  t.child = l === null ? z1(t, null, u, a) : Cu(
    t,
    l.child,
    u,
    a
  );
}
function e0(l, t, u, a, e) {
  u = u.render;
  var n = t.ref;
  if ("ref" in a) {
    var f = {};
    for (var c in a)
      c !== "ref" && (f[c] = a[c]);
  } else f = a;
  return au(t), a = Xc(
    l,
    t,
    u,
    f,
    n,
    e
  ), c = Qc(), l !== null && !sl ? (Zc(l, t, e), ot(l, t, e)) : (B && c && Hc(t), t.flags |= 1, dl(l, t, a, e), t.child);
}
function n0(l, t, u, a, e) {
  if (l === null) {
    var n = u.type;
    return typeof n == "function" && !Nc(n) && n.defaultProps === void 0 && u.compare === null ? (t.tag = 15, t.type = n, H1(
      l,
      t,
      n,
      a,
      e
    )) : (l = Me(
      u.type,
      null,
      a,
      t,
      t.mode,
      e
    ), l.ref = t.ref, l.return = t, t.child = l);
  }
  if (n = l.child, !Wc(l, e)) {
    var f = n.memoizedProps;
    if (u = u.compare, u = u !== null ? u : Ha, u(f, a) && l.ref === t.ref)
      return ot(l, t, e);
  }
  return t.flags |= 1, l = vt(n, a), l.ref = t.ref, l.return = t, t.child = l;
}
function H1(l, t, u, a, e) {
  if (l !== null) {
    var n = l.memoizedProps;
    if (Ha(n, a) && l.ref === t.ref)
      if (sl = !1, t.pendingProps = a = n, Wc(l, e))
        l.flags & 131072 && (sl = !0);
      else
        return t.lanes = l.lanes, ot(l, t, e);
  }
  return Jf(
    l,
    t,
    u,
    a,
    e
  );
}
function p1(l, t, u) {
  var a = t.pendingProps, e = a.children, n = l !== null ? l.memoizedState : null;
  if (a.mode === "hidden") {
    if (t.flags & 128) {
      if (a = n !== null ? n.baseLanes | u : u, l !== null) {
        for (e = t.child = l.child, n = 0; e !== null; )
          n = n | e.lanes | e.childLanes, e = e.sibling;
        t.childLanes = n & ~a;
      } else t.childLanes = 0, t.child = null;
      return f0(
        l,
        t,
        a,
        u
      );
    }
    if (u & 536870912)
      t.memoizedState = { baseLanes: 0, cachePool: null }, l !== null && De(
        t,
        n !== null ? n.cachePool : null
      ), n !== null ? wi(t, n) : Zf(), O1(t);
    else
      return t.lanes = t.childLanes = 536870912, f0(
        l,
        t,
        n !== null ? n.baseLanes | u : u,
        u
      );
  } else
    n !== null ? (De(t, n.cachePool), wi(t, n), _t(), t.memoizedState = null) : (l !== null && De(t, null), Zf(), _t());
  return dl(l, t, e, u), t.child;
}
function f0(l, t, u, a) {
  var e = qc();
  return e = e === null ? null : { parent: al._currentValue, pool: e }, t.memoizedState = {
    baseLanes: u,
    cachePool: e
  }, l !== null && De(t, null), Zf(), O1(t), l !== null && Wa(l, t, a, !0), null;
}
function Ne(l, t) {
  var u = t.ref;
  if (u === null)
    l !== null && l.ref !== null && (t.flags |= 4194816);
  else {
    if (typeof u != "function" && typeof u != "object")
      throw Error(b(284));
    (l === null || l.ref !== u) && (t.flags |= 4194816);
  }
}
function Jf(l, t, u, a, e) {
  return au(t), u = Xc(
    l,
    t,
    u,
    a,
    void 0,
    e
  ), a = Qc(), l !== null && !sl ? (Zc(l, t, e), ot(l, t, e)) : (B && a && Hc(t), t.flags |= 1, dl(l, t, u, e), t.child);
}
function c0(l, t, u, a, e, n) {
  return au(t), t.updateQueue = null, u = Ks(
    t,
    a,
    u,
    e
  ), Ls(l), a = Qc(), l !== null && !sl ? (Zc(l, t, n), ot(l, t, n)) : (B && a && Hc(t), t.flags |= 1, dl(l, t, u, n), t.child);
}
function i0(l, t, u, a, e) {
  if (au(t), t.stateNode === null) {
    var n = Ou, f = u.contextType;
    typeof f == "object" && f !== null && (n = ml(f)), n = new u(a, n), t.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null, n.updater = Lf, t.stateNode = n, n._reactInternals = t, n = t.stateNode, n.props = a, n.state = t.memoizedState, n.refs = {}, xc(t), f = u.contextType, n.context = typeof f == "object" && f !== null ? ml(f) : Ou, n.state = t.memoizedState, f = u.getDerivedStateFromProps, typeof f == "function" && (Fn(
      t,
      u,
      f,
      a
    ), n.state = t.memoizedState), typeof u.getDerivedStateFromProps == "function" || typeof n.getSnapshotBeforeUpdate == "function" || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (f = n.state, typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount(), f !== n.state && Lf.enqueueReplaceState(n, n.state, null), Ta(t, a, n, e), Ea(), n.state = t.memoizedState), typeof n.componentDidMount == "function" && (t.flags |= 4194308), a = !0;
  } else if (l === null) {
    n = t.stateNode;
    var c = t.memoizedProps, i = nu(u, c);
    n.props = i;
    var d = n.context, g = u.contextType;
    f = Ou, typeof g == "object" && g !== null && (f = ml(g));
    var m = u.getDerivedStateFromProps;
    g = typeof m == "function" || typeof n.getSnapshotBeforeUpdate == "function", c = t.pendingProps !== c, g || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (c || d !== f) && u0(
      t,
      n,
      a,
      f
    ), At = !1;
    var y = t.memoizedState;
    n.state = y, Ta(t, a, n, e), Ea(), d = t.memoizedState, c || y !== d || At ? (typeof m == "function" && (Fn(
      t,
      u,
      m,
      a
    ), d = t.memoizedState), (i = At || t0(
      t,
      u,
      i,
      a,
      y,
      d,
      f
    )) ? (g || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount()), typeof n.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof n.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = a, t.memoizedState = d), n.props = a, n.state = d, n.context = f, a = i) : (typeof n.componentDidMount == "function" && (t.flags |= 4194308), a = !1);
  } else {
    n = t.stateNode, Xf(l, t), f = t.memoizedProps, g = nu(u, f), n.props = g, m = t.pendingProps, y = n.context, d = u.contextType, i = Ou, typeof d == "object" && d !== null && (i = ml(d)), c = u.getDerivedStateFromProps, (d = typeof c == "function" || typeof n.getSnapshotBeforeUpdate == "function") || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (f !== m || y !== i) && u0(
      t,
      n,
      a,
      i
    ), At = !1, y = t.memoizedState, n.state = y, Ta(t, a, n, e), Ea();
    var o = t.memoizedState;
    f !== m || y !== o || At || l !== null && l.dependencies !== null && Le(l.dependencies) ? (typeof c == "function" && (Fn(
      t,
      u,
      c,
      a
    ), o = t.memoizedState), (g = At || t0(
      t,
      u,
      g,
      a,
      y,
      o,
      i
    ) || l !== null && l.dependencies !== null && Le(l.dependencies)) ? (d || typeof n.UNSAFE_componentWillUpdate != "function" && typeof n.componentWillUpdate != "function" || (typeof n.componentWillUpdate == "function" && n.componentWillUpdate(a, o, i), typeof n.UNSAFE_componentWillUpdate == "function" && n.UNSAFE_componentWillUpdate(
      a,
      o,
      i
    )), typeof n.componentDidUpdate == "function" && (t.flags |= 4), typeof n.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof n.componentDidUpdate != "function" || f === l.memoizedProps && y === l.memoizedState || (t.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || f === l.memoizedProps && y === l.memoizedState || (t.flags |= 1024), t.memoizedProps = a, t.memoizedState = o), n.props = a, n.state = o, n.context = i, a = g) : (typeof n.componentDidUpdate != "function" || f === l.memoizedProps && y === l.memoizedState || (t.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || f === l.memoizedProps && y === l.memoizedState || (t.flags |= 1024), a = !1);
  }
  return n = a, Ne(l, t), a = (t.flags & 128) !== 0, n || a ? (n = t.stateNode, u = a && typeof u.getDerivedStateFromError != "function" ? null : n.render(), t.flags |= 1, l !== null && a ? (t.child = Cu(
    t,
    l.child,
    null,
    e
  ), t.child = Cu(
    t,
    null,
    u,
    e
  )) : dl(l, t, u, e), t.memoizedState = n.state, l = t.child) : l = ot(
    l,
    t,
    e
  ), l;
}
function s0(l, t, u, a) {
  return $a(), t.flags |= 256, dl(l, t, u, a), t.child;
}
var In = {
  dehydrated: null,
  treeContext: null,
  retryLane: 0,
  hydrationErrors: null
};
function Pn(l) {
  return { baseLanes: l, cachePool: Qs() };
}
function lf(l, t, u) {
  return l = l !== null ? l.childLanes & ~u : 0, t && (l |= Zl), l;
}
function Y1(l, t, u) {
  var a = t.pendingProps, e = !1, n = (t.flags & 128) !== 0, f;
  if ((f = n) || (f = l !== null && l.memoizedState === null ? !1 : (el.current & 2) !== 0), f && (e = !0, t.flags &= -129), f = (t.flags & 32) !== 0, t.flags &= -33, l === null) {
    if (B) {
      if (e ? Ot(t) : _t(), B) {
        var c = W, i;
        if (i = c) {
          l: {
            for (i = c, c = wl; i.nodeType !== 8; ) {
              if (!c) {
                c = null;
                break l;
              }
              if (i = Ll(
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
            treeContext: Ft !== null ? { id: ft, overflow: ct } : null,
            retryLane: 536870912,
            hydrationErrors: null
          }, i = Dl(
            18,
            null,
            null,
            0
          ), i.stateNode = c, i.return = t, t.child = i, gl = t, W = null, i = !0) : i = !1;
        }
        i || uu(t);
      }
      if (c = t.memoizedState, c !== null && (c = c.dehydrated, c !== null))
        return fc(c) ? t.lanes = 32 : t.lanes = 536870912, null;
      st(t);
    }
    return c = a.children, a = a.fallback, e ? (_t(), e = t.mode, c = Ie(
      { mode: "hidden", children: c },
      e
    ), a = kt(
      a,
      e,
      u,
      null
    ), c.return = t, a.return = t, c.sibling = a, t.child = c, e = t.child, e.memoizedState = Pn(u), e.childLanes = lf(
      l,
      f,
      u
    ), t.memoizedState = In, a) : (Ot(t), wf(t, c));
  }
  if (i = l.memoizedState, i !== null && (c = i.dehydrated, c !== null)) {
    if (n)
      t.flags & 256 ? (Ot(t), t.flags &= -257, t = tf(
        l,
        t,
        u
      )) : t.memoizedState !== null ? (_t(), t.child = l.child, t.flags |= 128, t = null) : (_t(), e = a.fallback, c = t.mode, a = Ie(
        { mode: "visible", children: a.children },
        c
      ), e = kt(
        e,
        c,
        u,
        null
      ), e.flags |= 2, a.return = t, e.return = t, a.sibling = e, t.child = a, Cu(
        t,
        l.child,
        null,
        u
      ), a = t.child, a.memoizedState = Pn(u), a.childLanes = lf(
        l,
        f,
        u
      ), t.memoizedState = In, t = e);
    else if (Ot(t), fc(c)) {
      if (f = c.nextSibling && c.nextSibling.dataset, f) var d = f.dgst;
      f = d, a = Error(b(419)), a.stack = "", a.digest = f, pa({ value: a, source: null, stack: null }), t = tf(
        l,
        t,
        u
      );
    } else if (sl || Wa(l, t, u, !1), f = (u & l.childLanes) !== 0, sl || f) {
      if (f = V, f !== null && (a = u & -u, a = a & 42 ? 1 : rc(a), a = a & (f.suspendedLanes | u) ? 0 : a, a !== 0 && a !== i.retryLane))
        throw i.retryLane = a, ku(l, a), Hl(f, l, a), N1;
      c.data === "$?" || Pf(), t = tf(
        l,
        t,
        u
      );
    } else
      c.data === "$?" ? (t.flags |= 192, t.child = l.child, t = null) : (l = i.treeContext, W = Ll(
        c.nextSibling
      ), gl = t, B = !0, It = null, wl = !1, l !== null && (Bl[Gl++] = ft, Bl[Gl++] = ct, Bl[Gl++] = Ft, ft = l.id, ct = l.overflow, Ft = t), t = wf(
        t,
        a.children
      ), t.flags |= 4096);
    return t;
  }
  return e ? (_t(), e = a.fallback, c = t.mode, i = l.child, d = i.sibling, a = vt(i, {
    mode: "hidden",
    children: a.children
  }), a.subtreeFlags = i.subtreeFlags & 65011712, d !== null ? e = vt(d, e) : (e = kt(
    e,
    c,
    u,
    null
  ), e.flags |= 2), e.return = t, a.return = t, a.sibling = e, t.child = a, a = e, e = t.child, c = l.child.memoizedState, c === null ? c = Pn(u) : (i = c.cachePool, i !== null ? (d = al._currentValue, i = i.parent !== d ? { parent: d, pool: d } : i) : i = Qs(), c = {
    baseLanes: c.baseLanes | u,
    cachePool: i
  }), e.memoizedState = c, e.childLanes = lf(
    l,
    f,
    u
  ), t.memoizedState = In, a) : (Ot(t), u = l.child, l = u.sibling, u = vt(u, {
    mode: "visible",
    children: a.children
  }), u.return = t, u.sibling = null, l !== null && (f = t.deletions, f === null ? (t.deletions = [l], t.flags |= 16) : f.push(l)), t.child = u, t.memoizedState = null, u);
}
function wf(l, t) {
  return t = Ie(
    { mode: "visible", children: t },
    l.mode
  ), t.return = l, l.child = t;
}
function Ie(l, t) {
  return l = Dl(22, l, null, t), l.lanes = 0, l.stateNode = {
    _visibility: 1,
    _pendingMarkers: null,
    _retryCache: null,
    _transitions: null
  }, l;
}
function tf(l, t, u) {
  return Cu(t, l.child, null, u), l = wf(
    t,
    t.pendingProps.children
  ), l.flags |= 2, t.memoizedState = null, l;
}
function v0(l, t, u) {
  l.lanes |= t;
  var a = l.alternate;
  a !== null && (a.lanes |= t), qf(l.return, t, u);
}
function uf(l, t, u, a, e) {
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
function q1(l, t, u) {
  var a = t.pendingProps, e = a.revealOrder, n = a.tail;
  if (dl(l, t, a.children, u), a = el.current, a & 2)
    a = a & 1 | 2, t.flags |= 128;
  else {
    if (l !== null && l.flags & 128)
      l: for (l = t.child; l !== null; ) {
        if (l.tag === 13)
          l.memoizedState !== null && v0(l, u, t);
        else if (l.tag === 19)
          v0(l, u, t);
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
  switch (w(el, a), e) {
    case "forwards":
      for (u = t.child, e = null; u !== null; )
        l = u.alternate, l !== null && We(l) === null && (e = u), u = u.sibling;
      u = e, u === null ? (e = t.child, t.child = null) : (e = u.sibling, u.sibling = null), uf(
        t,
        !1,
        e,
        u,
        n
      );
      break;
    case "backwards":
      for (u = null, e = t.child, t.child = null; e !== null; ) {
        if (l = e.alternate, l !== null && We(l) === null) {
          t.child = e;
          break;
        }
        l = e.sibling, e.sibling = u, u = e, e = l;
      }
      uf(
        t,
        !0,
        u,
        null,
        n
      );
      break;
    case "together":
      uf(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function ot(l, t, u) {
  if (l !== null && (t.dependencies = l.dependencies), jt |= t.lanes, !(u & t.childLanes))
    if (l !== null) {
      if (Wa(
        l,
        t,
        u,
        !1
      ), (u & t.childLanes) === 0)
        return null;
    } else return null;
  if (l !== null && t.child !== l.child)
    throw Error(b(153));
  if (t.child !== null) {
    for (l = t.child, u = vt(l, l.pendingProps), t.child = u, u.return = t; l.sibling !== null; )
      l = l.sibling, u = u.sibling = vt(l, l.pendingProps), u.return = t;
    u.sibling = null;
  }
  return t.child;
}
function Wc(l, t) {
  return l.lanes & t ? !0 : (l = l.dependencies, !!(l !== null && Le(l)));
}
function Ry(l, t, u) {
  switch (t.tag) {
    case 3:
      Be(t, t.stateNode.containerInfo), zt(t, al, l.memoizedState.cache), $a();
      break;
    case 27:
    case 5:
      Af(t);
      break;
    case 4:
      Be(t, t.stateNode.containerInfo);
      break;
    case 10:
      zt(
        t,
        t.type,
        t.memoizedProps.value
      );
      break;
    case 13:
      var a = t.memoizedState;
      if (a !== null)
        return a.dehydrated !== null ? (Ot(t), t.flags |= 128, null) : u & t.child.childLanes ? Y1(l, t, u) : (Ot(t), l = ot(
          l,
          t,
          u
        ), l !== null ? l.sibling : null);
      Ot(t);
      break;
    case 19:
      var e = (l.flags & 128) !== 0;
      if (a = (u & t.childLanes) !== 0, a || (Wa(
        l,
        t,
        u,
        !1
      ), a = (u & t.childLanes) !== 0), e) {
        if (a)
          return q1(
            l,
            t,
            u
          );
        t.flags |= 128;
      }
      if (e = t.memoizedState, e !== null && (e.rendering = null, e.tail = null, e.lastEffect = null), w(el, el.current), a) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, p1(l, t, u);
    case 24:
      zt(t, al, l.memoizedState.cache);
  }
  return ot(l, t, u);
}
function x1(l, t, u) {
  if (l !== null)
    if (l.memoizedProps !== t.pendingProps)
      sl = !0;
    else {
      if (!Wc(l, u) && !(t.flags & 128))
        return sl = !1, Ry(
          l,
          t,
          u
        );
      sl = !!(l.flags & 131072);
    }
  else
    sl = !1, B && t.flags & 1048576 && Gs(t, Ve, t.index);
  switch (t.lanes = 0, t.tag) {
    case 16:
      l: {
        l = t.pendingProps;
        var a = t.elementType, e = a._init;
        if (a = e(a._payload), t.type = a, typeof a == "function")
          Nc(a) ? (l = nu(a, l), t.tag = 1, t = i0(
            null,
            t,
            a,
            l,
            u
          )) : (t.tag = 0, t = Jf(
            null,
            t,
            a,
            l,
            u
          ));
        else {
          if (a != null) {
            if (e = a.$$typeof, e === gc) {
              t.tag = 11, t = e0(
                null,
                t,
                a,
                l,
                u
              );
              break l;
            } else if (e === Sc) {
              t.tag = 14, t = n0(
                null,
                t,
                a,
                l,
                u
              );
              break l;
            }
          }
          throw t = Ef(a) || a, Error(b(306, t, ""));
        }
      }
      return t;
    case 0:
      return Jf(
        l,
        t,
        t.type,
        t.pendingProps,
        u
      );
    case 1:
      return a = t.type, e = nu(
        a,
        t.pendingProps
      ), i0(
        l,
        t,
        a,
        e,
        u
      );
    case 3:
      l: {
        if (Be(
          t,
          t.stateNode.containerInfo
        ), l === null) throw Error(b(387));
        a = t.pendingProps;
        var n = t.memoizedState;
        e = n.element, Xf(l, t), Ta(t, a, null, u);
        var f = t.memoizedState;
        if (a = f.cache, zt(t, al, a), a !== n.cache && xf(
          t,
          [al],
          u,
          !0
        ), Ea(), a = f.element, n.isDehydrated)
          if (n = {
            element: a,
            isDehydrated: !1,
            cache: f.cache
          }, t.updateQueue.baseState = n, t.memoizedState = n, t.flags & 256) {
            t = s0(
              l,
              t,
              a,
              u
            );
            break l;
          } else if (a !== e) {
            e = Ql(
              Error(b(424)),
              t
            ), pa(e), t = s0(
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
            for (W = Ll(l.firstChild), gl = t, B = !0, It = null, wl = !0, u = z1(
              t,
              null,
              a,
              u
            ), t.child = u; u; )
              u.flags = u.flags & -3 | 4096, u = u.sibling;
          }
        else {
          if ($a(), a === e) {
            t = ot(
              l,
              t,
              u
            );
            break l;
          }
          dl(
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
      return Ne(l, t), l === null ? (u = D0(
        t.type,
        null,
        t.pendingProps,
        null
      )) ? t.memoizedState = u : B || (u = t.type, l = t.pendingProps, a = nn(
        Ht.current
      ).createElement(u), a[ol] = t, a[Al] = l, hl(a, u, l), il(a), t.stateNode = a) : t.memoizedState = D0(
        t.type,
        l.memoizedProps,
        t.pendingProps,
        l.memoizedState
      ), null;
    case 27:
      return Af(t), l === null && B && (a = t.stateNode = Tv(
        t.type,
        t.pendingProps,
        Ht.current
      ), gl = t, wl = !0, e = W, Vt(t.type) ? (cc = e, W = Ll(
        a.firstChild
      )) : W = e), dl(
        l,
        t,
        t.pendingProps.children,
        u
      ), Ne(l, t), l === null && (t.flags |= 4194304), t.child;
    case 5:
      return l === null && B && ((e = a = W) && (a = ah(
        a,
        t.type,
        t.pendingProps,
        wl
      ), a !== null ? (t.stateNode = a, gl = t, W = Ll(
        a.firstChild
      ), wl = !1, e = !0) : e = !1), e || uu(t)), Af(t), e = t.type, n = t.pendingProps, f = l !== null ? l.memoizedProps : null, a = n.children, ec(e, n) ? a = null : f !== null && ec(e, f) && (t.flags |= 32), t.memoizedState !== null && (e = Xc(
        l,
        t,
        Ty,
        null,
        null,
        u
      ), Xa._currentValue = e), Ne(l, t), dl(l, t, a, u), t.child;
    case 6:
      return l === null && B && ((l = u = W) && (u = eh(
        u,
        t.pendingProps,
        wl
      ), u !== null ? (t.stateNode = u, gl = t, W = null, l = !0) : l = !1), l || uu(t)), null;
    case 13:
      return Y1(l, t, u);
    case 4:
      return Be(
        t,
        t.stateNode.containerInfo
      ), a = t.pendingProps, l === null ? t.child = Cu(
        t,
        null,
        a,
        u
      ) : dl(
        l,
        t,
        a,
        u
      ), t.child;
    case 11:
      return e0(
        l,
        t,
        t.type,
        t.pendingProps,
        u
      );
    case 7:
      return dl(
        l,
        t,
        t.pendingProps,
        u
      ), t.child;
    case 8:
      return dl(
        l,
        t,
        t.pendingProps.children,
        u
      ), t.child;
    case 12:
      return dl(
        l,
        t,
        t.pendingProps.children,
        u
      ), t.child;
    case 10:
      return a = t.pendingProps, zt(t, t.type, a.value), dl(
        l,
        t,
        a.children,
        u
      ), t.child;
    case 9:
      return e = t.type._context, a = t.pendingProps.children, au(t), e = ml(e), a = a(e), t.flags |= 1, dl(l, t, a, u), t.child;
    case 14:
      return n0(
        l,
        t,
        t.type,
        t.pendingProps,
        u
      );
    case 15:
      return H1(
        l,
        t,
        t.type,
        t.pendingProps,
        u
      );
    case 19:
      return q1(l, t, u);
    case 31:
      return a = t.pendingProps, u = t.mode, a = {
        mode: a.mode,
        children: a.children
      }, l === null ? (u = Ie(
        a,
        u
      ), u.ref = t.ref, t.child = u, u.return = t, t = u) : (u = vt(l.child, a), u.ref = t.ref, t.child = u, u.return = t, t = u), t;
    case 22:
      return p1(l, t, u);
    case 24:
      return au(t), a = ml(al), l === null ? (e = qc(), e === null && (e = V, n = Yc(), e.pooledCache = n, n.refCount++, n !== null && (e.pooledCacheLanes |= u), e = n), t.memoizedState = {
        parent: a,
        cache: e
      }, xc(t), zt(t, al, e)) : (l.lanes & u && (Xf(l, t), Ta(t, null, null, u), Ea()), e = l.memoizedState, n = t.memoizedState, e.parent !== a ? (e = { parent: a, cache: a }, t.memoizedState = e, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = e), zt(t, al, a)) : (a = n.cache, zt(t, al, a), a !== e.cache && xf(
        t,
        [al],
        u,
        !0
      ))), dl(
        l,
        t,
        t.pendingProps.children,
        u
      ), t.child;
    case 29:
      throw t.pendingProps;
  }
  throw Error(b(156, t.tag));
}
function tt(l) {
  l.flags |= 4;
}
function d0(l, t) {
  if (t.type !== "stylesheet" || t.state.loading & 4)
    l.flags &= -16777217;
  else if (l.flags |= 16777216, !Ov(t)) {
    if (t = jl.current, t !== null && ((q & 4194048) === q ? Fl !== null : (q & 62914560) !== q && !(q & 536870912) || t !== Fl))
      throw ba = Gf, Zs;
    l.flags |= 8192;
  }
}
function Se(l, t) {
  t !== null && (l.flags |= 4), l.flags & 16384 && (t = l.tag !== 22 ? cs() : 536870912, l.lanes |= t, Vu |= t);
}
function na(l, t) {
  if (!B)
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
function $(l) {
  var t = l.alternate !== null && l.alternate.child === l.child, u = 0, a = 0;
  if (t)
    for (var e = l.child; e !== null; )
      u |= e.lanes | e.childLanes, a |= e.subtreeFlags & 65011712, a |= e.flags & 65011712, e.return = l, e = e.sibling;
  else
    for (e = l.child; e !== null; )
      u |= e.lanes | e.childLanes, a |= e.subtreeFlags, a |= e.flags, e.return = l, e = e.sibling;
  return l.subtreeFlags |= a, l.childLanes = u, t;
}
function Ny(l, t, u) {
  var a = t.pendingProps;
  switch (pc(t), t.tag) {
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
      return $(t), null;
    case 1:
      return $(t), null;
    case 3:
      return u = t.stateNode, a = null, l !== null && (a = l.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), dt(al), Bu(), u.pendingContext && (u.context = u.pendingContext, u.pendingContext = null), (l === null || l.child === null) && (aa(t) ? tt(t) : l === null || l.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, ji())), $(t), null;
    case 26:
      return u = t.memoizedState, l === null ? (tt(t), u !== null ? ($(t), d0(t, u)) : ($(t), t.flags &= -16777217)) : u ? u !== l.memoizedState ? (tt(t), $(t), d0(t, u)) : ($(t), t.flags &= -16777217) : (l.memoizedProps !== a && tt(t), $(t), t.flags &= -16777217), null;
    case 27:
      Ge(t), u = Ht.current;
      var e = t.type;
      if (l !== null && t.stateNode != null)
        l.memoizedProps !== a && tt(t);
      else {
        if (!a) {
          if (t.stateNode === null)
            throw Error(b(166));
          return $(t), null;
        }
        l = Wl.current, aa(t) ? Qi(t) : (l = Tv(e, a, u), t.stateNode = l, tt(t));
      }
      return $(t), null;
    case 5:
      if (Ge(t), u = t.type, l !== null && t.stateNode != null)
        l.memoizedProps !== a && tt(t);
      else {
        if (!a) {
          if (t.stateNode === null)
            throw Error(b(166));
          return $(t), null;
        }
        if (l = Wl.current, aa(t))
          Qi(t);
        else {
          switch (e = nn(
            Ht.current
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
          l[ol] = t, l[Al] = a;
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
          l: switch (hl(l, u, a), u) {
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
          l && tt(t);
        }
      }
      return $(t), t.flags &= -16777217, null;
    case 6:
      if (l && t.stateNode != null)
        l.memoizedProps !== a && tt(t);
      else {
        if (typeof a != "string" && t.stateNode === null)
          throw Error(b(166));
        if (l = Ht.current, aa(t)) {
          if (l = t.stateNode, u = t.memoizedProps, a = null, e = gl, e !== null)
            switch (e.tag) {
              case 27:
              case 5:
                a = e.memoizedProps;
            }
          l[ol] = t, l = !!(l.nodeValue === u || a !== null && a.suppressHydrationWarning === !0 || bv(l.nodeValue, u)), l || uu(t);
        } else
          l = nn(l).createTextNode(
            a
          ), l[ol] = t, t.stateNode = l;
      }
      return $(t), null;
    case 13:
      if (a = t.memoizedState, l === null || l.memoizedState !== null && l.memoizedState.dehydrated !== null) {
        if (e = aa(t), a !== null && a.dehydrated !== null) {
          if (l === null) {
            if (!e) throw Error(b(318));
            if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(b(317));
            e[ol] = t;
          } else
            $a(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          $(t), e = !1;
        } else
          e = ji(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = e), e = !0;
        if (!e)
          return t.flags & 256 ? (st(t), t) : (st(t), null);
      }
      if (st(t), t.flags & 128)
        return t.lanes = u, t;
      if (u = a !== null, l = l !== null && l.memoizedState !== null, u) {
        a = t.child, e = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (e = a.alternate.memoizedState.cachePool.pool);
        var n = null;
        a.memoizedState !== null && a.memoizedState.cachePool !== null && (n = a.memoizedState.cachePool.pool), n !== e && (a.flags |= 2048);
      }
      return u !== l && u && (t.child.flags |= 8192), Se(t, t.updateQueue), $(t), null;
    case 4:
      return Bu(), l === null && ai(t.stateNode.containerInfo), $(t), null;
    case 10:
      return dt(t.type), $(t), null;
    case 19:
      if (vl(el), e = t.memoizedState, e === null) return $(t), null;
      if (a = (t.flags & 128) !== 0, n = e.rendering, n === null)
        if (a) na(e, !1);
        else {
          if (k !== 0 || l !== null && l.flags & 128)
            for (l = t.child; l !== null; ) {
              if (n = We(l), n !== null) {
                for (t.flags |= 128, na(e, !1), l = n.updateQueue, t.updateQueue = l, Se(t, l), t.subtreeFlags = 0, l = u, u = t.child; u !== null; )
                  Bs(u, l), u = u.sibling;
                return w(
                  el,
                  el.current & 1 | 2
                ), t.child;
              }
              l = l.sibling;
            }
          e.tail !== null && kl() > ln && (t.flags |= 128, a = !0, na(e, !1), t.lanes = 4194304);
        }
      else {
        if (!a)
          if (l = We(n), l !== null) {
            if (t.flags |= 128, a = !0, l = l.updateQueue, t.updateQueue = l, Se(t, l), na(e, !0), e.tail === null && e.tailMode === "hidden" && !n.alternate && !B)
              return $(t), null;
          } else
            2 * kl() - e.renderingStartTime > ln && u !== 536870912 && (t.flags |= 128, a = !0, na(e, !1), t.lanes = 4194304);
        e.isBackwards ? (n.sibling = t.child, t.child = n) : (l = e.last, l !== null ? l.sibling = n : t.child = n, e.last = n);
      }
      return e.tail !== null ? (t = e.tail, e.rendering = t, e.tail = t.sibling, e.renderingStartTime = kl(), t.sibling = null, l = el.current, w(el, a ? l & 1 | 2 : l & 1), t) : ($(t), null);
    case 22:
    case 23:
      return st(t), Bc(), a = t.memoizedState !== null, l !== null ? l.memoizedState !== null !== a && (t.flags |= 8192) : a && (t.flags |= 8192), a ? u & 536870912 && !(t.flags & 128) && ($(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : $(t), u = t.updateQueue, u !== null && Se(t, u.retryQueue), u = null, l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (u = l.memoizedState.cachePool.pool), a = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), a !== u && (t.flags |= 2048), l !== null && vl(Pt), null;
    case 24:
      return u = null, l !== null && (u = l.memoizedState.cache), t.memoizedState.cache !== u && (t.flags |= 2048), dt(al), $(t), null;
    case 25:
      return null;
    case 30:
      return null;
  }
  throw Error(b(156, t.tag));
}
function Hy(l, t) {
  switch (pc(t), t.tag) {
    case 1:
      return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
    case 3:
      return dt(al), Bu(), l = t.flags, l & 65536 && !(l & 128) ? (t.flags = l & -65537 | 128, t) : null;
    case 26:
    case 27:
    case 5:
      return Ge(t), null;
    case 13:
      if (st(t), l = t.memoizedState, l !== null && l.dehydrated !== null) {
        if (t.alternate === null)
          throw Error(b(340));
        $a();
      }
      return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
    case 19:
      return vl(el), null;
    case 4:
      return Bu(), null;
    case 10:
      return dt(t.type), null;
    case 22:
    case 23:
      return st(t), Bc(), l !== null && vl(Pt), l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
    case 24:
      return dt(al), null;
    case 25:
      return null;
    default:
      return null;
  }
}
function B1(l, t) {
  switch (pc(t), t.tag) {
    case 3:
      dt(al), Bu();
      break;
    case 26:
    case 27:
    case 5:
      Ge(t);
      break;
    case 4:
      Bu();
      break;
    case 13:
      st(t);
      break;
    case 19:
      vl(el);
      break;
    case 10:
      dt(t.type);
      break;
    case 22:
    case 23:
      st(t), Bc(), l !== null && vl(Pt);
      break;
    case 24:
      dt(al);
  }
}
function le(l, t) {
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
    C(t, t.return, c);
  }
}
function Zt(l, t, u) {
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
            var i = u, d = c;
            try {
              d();
            } catch (g) {
              C(
                e,
                i,
                g
              );
            }
          }
        }
        a = a.next;
      } while (a !== n);
    }
  } catch (g) {
    C(t, t.return, g);
  }
}
function G1(l) {
  var t = l.updateQueue;
  if (t !== null) {
    var u = l.stateNode;
    try {
      Vs(t, u);
    } catch (a) {
      C(l, l.return, a);
    }
  }
}
function X1(l, t, u) {
  u.props = nu(
    l.type,
    l.memoizedProps
  ), u.state = l.memoizedState;
  try {
    u.componentWillUnmount();
  } catch (a) {
    C(l, t, a);
  }
}
function za(l, t) {
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
    C(l, t, e);
  }
}
function $l(l, t) {
  var u = l.ref, a = l.refCleanup;
  if (u !== null)
    if (typeof a == "function")
      try {
        a();
      } catch (e) {
        C(l, t, e);
      } finally {
        l.refCleanup = null, l = l.alternate, l != null && (l.refCleanup = null);
      }
    else if (typeof u == "function")
      try {
        u(null);
      } catch (e) {
        C(l, t, e);
      }
    else u.current = null;
}
function Q1(l) {
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
    C(l, l.return, e);
  }
}
function af(l, t, u) {
  try {
    var a = l.stateNode;
    Iy(a, l.type, u, t), a[Al] = t;
  } catch (e) {
    C(l, l.return, e);
  }
}
function Z1(l) {
  return l.tag === 5 || l.tag === 3 || l.tag === 26 || l.tag === 27 && Vt(l.type) || l.tag === 4;
}
function ef(l) {
  l: for (; ; ) {
    for (; l.sibling === null; ) {
      if (l.return === null || Z1(l.return)) return null;
      l = l.return;
    }
    for (l.sibling.return = l.return, l = l.sibling; l.tag !== 5 && l.tag !== 6 && l.tag !== 18; ) {
      if (l.tag === 27 && Vt(l.type) || l.flags & 2 || l.child === null || l.tag === 4) continue l;
      l.child.return = l, l = l.child;
    }
    if (!(l.flags & 2)) return l.stateNode;
  }
}
function $f(l, t, u) {
  var a = l.tag;
  if (a === 5 || a === 6)
    l = l.stateNode, t ? (u.nodeType === 9 ? u.body : u.nodeName === "HTML" ? u.ownerDocument.body : u).insertBefore(l, t) : (t = u.nodeType === 9 ? u.body : u.nodeName === "HTML" ? u.ownerDocument.body : u, t.appendChild(l), u = u._reactRootContainer, u != null || t.onclick !== null || (t.onclick = Un));
  else if (a !== 4 && (a === 27 && Vt(l.type) && (u = l.stateNode, t = null), l = l.child, l !== null))
    for ($f(l, t, u), l = l.sibling; l !== null; )
      $f(l, t, u), l = l.sibling;
}
function Pe(l, t, u) {
  var a = l.tag;
  if (a === 5 || a === 6)
    l = l.stateNode, t ? u.insertBefore(l, t) : u.appendChild(l);
  else if (a !== 4 && (a === 27 && Vt(l.type) && (u = l.stateNode), l = l.child, l !== null))
    for (Pe(l, t, u), l = l.sibling; l !== null; )
      Pe(l, t, u), l = l.sibling;
}
function j1(l) {
  var t = l.stateNode, u = l.memoizedProps;
  try {
    for (var a = l.type, e = t.attributes; e.length; )
      t.removeAttributeNode(e[0]);
    hl(t, a, u), t[ol] = l, t[Al] = u;
  } catch (n) {
    C(l, l.return, n);
  }
}
var et = !1, ll = !1, nf = !1, y0 = typeof WeakSet == "function" ? WeakSet : Set, cl = null;
function py(l, t) {
  if (l = l.containerInfo, uc = vn, l = Us(l), Dc(l)) {
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
          var f = 0, c = -1, i = -1, d = 0, g = 0, m = l, y = null;
          t: for (; ; ) {
            for (var o; m !== u || e !== 0 && m.nodeType !== 3 || (c = f + e), m !== n || a !== 0 && m.nodeType !== 3 || (i = f + a), m.nodeType === 3 && (f += m.nodeValue.length), (o = m.firstChild) !== null; )
              y = m, m = o;
            for (; ; ) {
              if (m === l) break t;
              if (y === u && ++d === e && (c = f), y === n && ++g === a && (i = f), (o = m.nextSibling) !== null) break;
              m = y, y = m.parentNode;
            }
            m = o;
          }
          u = c === -1 || i === -1 ? null : { start: c, end: i };
        } else u = null;
      }
    u = u || { start: 0, end: 0 };
  } else u = null;
  for (ac = { focusedElem: l, selectionRange: u }, vn = !1, cl = t; cl !== null; )
    if (t = cl, l = t.child, (t.subtreeFlags & 1024) !== 0 && l !== null)
      l.return = t, cl = l;
    else
      for (; cl !== null; ) {
        switch (t = cl, n = t.alternate, l = t.flags, t.tag) {
          case 0:
            break;
          case 11:
          case 15:
            break;
          case 1:
            if (l & 1024 && n !== null) {
              l = void 0, u = t, e = n.memoizedProps, n = n.memoizedState, a = u.stateNode;
              try {
                var z = nu(
                  u.type,
                  e,
                  u.elementType === u.type
                );
                l = a.getSnapshotBeforeUpdate(
                  z,
                  n
                ), a.__reactInternalSnapshotBeforeUpdate = l;
              } catch (A) {
                C(
                  u,
                  u.return,
                  A
                );
              }
            }
            break;
          case 3:
            if (l & 1024) {
              if (l = t.stateNode.containerInfo, u = l.nodeType, u === 9)
                nc(l);
              else if (u === 1)
                switch (l.nodeName) {
                  case "HEAD":
                  case "HTML":
                  case "BODY":
                    nc(l);
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
          l.return = t.return, cl = l;
          break;
        }
        cl = t.return;
      }
}
function C1(l, t, u) {
  var a = u.flags;
  switch (u.tag) {
    case 0:
    case 11:
    case 15:
      rt(l, u), a & 4 && le(5, u);
      break;
    case 1:
      if (rt(l, u), a & 4)
        if (l = u.stateNode, t === null)
          try {
            l.componentDidMount();
          } catch (f) {
            C(u, u.return, f);
          }
        else {
          var e = nu(
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
            C(
              u,
              u.return,
              f
            );
          }
        }
      a & 64 && G1(u), a & 512 && za(u, u.return);
      break;
    case 3:
      if (rt(l, u), a & 64 && (l = u.updateQueue, l !== null)) {
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
          Vs(l, t);
        } catch (f) {
          C(u, u.return, f);
        }
      }
      break;
    case 27:
      t === null && a & 4 && j1(u);
    case 26:
    case 5:
      rt(l, u), t === null && a & 4 && Q1(u), a & 512 && za(u, u.return);
      break;
    case 12:
      rt(l, u);
      break;
    case 13:
      rt(l, u), a & 4 && K1(l, u), a & 64 && (l = u.memoizedState, l !== null && (l = l.dehydrated, l !== null && (u = jy.bind(
        null,
        u
      ), nh(l, u))));
      break;
    case 22:
      if (a = u.memoizedState !== null || et, !a) {
        t = t !== null && t.memoizedState !== null || ll, e = et;
        var n = ll;
        et = a, (ll = t) && !n ? Et(
          l,
          u,
          (u.subtreeFlags & 8772) !== 0
        ) : rt(l, u), et = e, ll = n;
      }
      break;
    case 30:
      break;
    default:
      rt(l, u);
  }
}
function V1(l) {
  var t = l.alternate;
  t !== null && (l.alternate = null, V1(t)), l.child = null, l.deletions = null, l.sibling = null, l.tag === 5 && (t = l.stateNode, t !== null && Tc(t)), l.stateNode = null, l.return = null, l.dependencies = null, l.memoizedProps = null, l.memoizedState = null, l.pendingProps = null, l.stateNode = null, l.updateQueue = null;
}
var K = null, El = !1;
function ut(l, t, u) {
  for (u = u.child; u !== null; )
    L1(l, t, u), u = u.sibling;
}
function L1(l, t, u) {
  if (Ul && typeof Ul.onCommitFiberUnmount == "function")
    try {
      Ul.onCommitFiberUnmount(Va, u);
    } catch {
    }
  switch (u.tag) {
    case 26:
      ll || $l(u, t), ut(
        l,
        t,
        u
      ), u.memoizedState ? u.memoizedState.count-- : u.stateNode && (u = u.stateNode, u.parentNode.removeChild(u));
      break;
    case 27:
      ll || $l(u, t);
      var a = K, e = El;
      Vt(u.type) && (K = u.stateNode, El = !1), ut(
        l,
        t,
        u
      ), Da(u.stateNode), K = a, El = e;
      break;
    case 5:
      ll || $l(u, t);
    case 6:
      if (a = K, e = El, K = null, ut(
        l,
        t,
        u
      ), K = a, El = e, K !== null)
        if (El)
          try {
            (K.nodeType === 9 ? K.body : K.nodeName === "HTML" ? K.ownerDocument.body : K).removeChild(u.stateNode);
          } catch (n) {
            C(
              u,
              t,
              n
            );
          }
        else
          try {
            K.removeChild(u.stateNode);
          } catch (n) {
            C(
              u,
              t,
              n
            );
          }
      break;
    case 18:
      K !== null && (El ? (l = K, O0(
        l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l,
        u.stateNode
      ), ja(l)) : O0(K, u.stateNode));
      break;
    case 4:
      a = K, e = El, K = u.stateNode.containerInfo, El = !0, ut(
        l,
        t,
        u
      ), K = a, El = e;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      ll || Zt(2, u, t), ll || Zt(4, u, t), ut(
        l,
        t,
        u
      );
      break;
    case 1:
      ll || ($l(u, t), a = u.stateNode, typeof a.componentWillUnmount == "function" && X1(
        u,
        t,
        a
      )), ut(
        l,
        t,
        u
      );
      break;
    case 21:
      ut(
        l,
        t,
        u
      );
      break;
    case 22:
      ll = (a = ll) || u.memoizedState !== null, ut(
        l,
        t,
        u
      ), ll = a;
      break;
    default:
      ut(
        l,
        t,
        u
      );
  }
}
function K1(l, t) {
  if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null && (l = l.dehydrated, l !== null))))
    try {
      ja(l);
    } catch (u) {
      C(t, t.return, u);
    }
}
function Yy(l) {
  switch (l.tag) {
    case 13:
    case 19:
      var t = l.stateNode;
      return t === null && (t = l.stateNode = new y0()), t;
    case 22:
      return l = l.stateNode, t = l._retryCache, t === null && (t = l._retryCache = new y0()), t;
    default:
      throw Error(b(435, l.tag));
  }
}
function ff(l, t) {
  var u = Yy(l);
  t.forEach(function(a) {
    var e = Cy.bind(null, l, a);
    u.has(a) || (u.add(a), a.then(e, e));
  });
}
function Ol(l, t) {
  var u = t.deletions;
  if (u !== null)
    for (var a = 0; a < u.length; a++) {
      var e = u[a], n = l, f = t, c = f;
      l: for (; c !== null; ) {
        switch (c.tag) {
          case 27:
            if (Vt(c.type)) {
              K = c.stateNode, El = !1;
              break l;
            }
            break;
          case 5:
            K = c.stateNode, El = !1;
            break l;
          case 3:
          case 4:
            K = c.stateNode.containerInfo, El = !0;
            break l;
        }
        c = c.return;
      }
      if (K === null) throw Error(b(160));
      L1(n, f, e), K = null, El = !1, n = e.alternate, n !== null && (n.return = null), e.return = null;
    }
  if (t.subtreeFlags & 13878)
    for (t = t.child; t !== null; )
      J1(t, l), t = t.sibling;
}
var Vl = null;
function J1(l, t) {
  var u = l.alternate, a = l.flags;
  switch (l.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      Ol(t, l), _l(l), a & 4 && (Zt(3, l, l.return), le(3, l), Zt(5, l, l.return));
      break;
    case 1:
      Ol(t, l), _l(l), a & 512 && (ll || u === null || $l(u, u.return)), a & 64 && et && (l = l.updateQueue, l !== null && (a = l.callbacks, a !== null && (u = l.shared.hiddenCallbacks, l.shared.hiddenCallbacks = u === null ? a : u.concat(a))));
      break;
    case 26:
      var e = Vl;
      if (Ol(t, l), _l(l), a & 512 && (ll || u === null || $l(u, u.return)), a & 4) {
        var n = u !== null ? u.memoizedState : null;
        if (a = l.memoizedState, u === null)
          if (a === null)
            if (l.stateNode === null) {
              l: {
                a = l.type, u = l.memoizedProps, e = e.ownerDocument || e;
                t: switch (a) {
                  case "title":
                    n = e.getElementsByTagName("title")[0], (!n || n[Ja] || n[ol] || n.namespaceURI === "http://www.w3.org/2000/svg" || n.hasAttribute("itemprop")) && (n = e.createElement(a), e.head.insertBefore(
                      n,
                      e.querySelector("head > title")
                    )), hl(n, a, u), n[ol] = l, il(n), a = n;
                    break l;
                  case "link":
                    var f = R0(
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
                    n = e.createElement(a), hl(n, a, u), e.head.appendChild(n);
                    break;
                  case "meta":
                    if (f = R0(
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
                    n = e.createElement(a), hl(n, a, u), e.head.appendChild(n);
                    break;
                  default:
                    throw Error(b(468, a));
                }
                n[ol] = l, il(n), a = n;
              }
              l.stateNode = a;
            } else
              N0(
                e,
                l.type,
                l.stateNode
              );
          else
            l.stateNode = U0(
              e,
              a,
              l.memoizedProps
            );
        else
          n !== a ? (n === null ? u.stateNode !== null && (u = u.stateNode, u.parentNode.removeChild(u)) : n.count--, a === null ? N0(
            e,
            l.type,
            l.stateNode
          ) : U0(
            e,
            a,
            l.memoizedProps
          )) : a === null && l.stateNode !== null && af(
            l,
            l.memoizedProps,
            u.memoizedProps
          );
      }
      break;
    case 27:
      Ol(t, l), _l(l), a & 512 && (ll || u === null || $l(u, u.return)), u !== null && a & 4 && af(
        l,
        l.memoizedProps,
        u.memoizedProps
      );
      break;
    case 5:
      if (Ol(t, l), _l(l), a & 512 && (ll || u === null || $l(u, u.return)), l.flags & 32) {
        e = l.stateNode;
        try {
          Xu(e, "");
        } catch (o) {
          C(l, l.return, o);
        }
      }
      a & 4 && l.stateNode != null && (e = l.memoizedProps, af(
        l,
        e,
        u !== null ? u.memoizedProps : e
      )), a & 1024 && (nf = !0);
      break;
    case 6:
      if (Ol(t, l), _l(l), a & 4) {
        if (l.stateNode === null)
          throw Error(b(162));
        a = l.memoizedProps, u = l.stateNode;
        try {
          u.nodeValue = a;
        } catch (o) {
          C(l, l.return, o);
        }
      }
      break;
    case 3:
      if (Ye = null, e = Vl, Vl = fn(t.containerInfo), Ol(t, l), Vl = e, _l(l), a & 4 && u !== null && u.memoizedState.isDehydrated)
        try {
          ja(t.containerInfo);
        } catch (o) {
          C(l, l.return, o);
        }
      nf && (nf = !1, w1(l));
      break;
    case 4:
      a = Vl, Vl = fn(
        l.stateNode.containerInfo
      ), Ol(t, l), _l(l), Vl = a;
      break;
    case 12:
      Ol(t, l), _l(l);
      break;
    case 13:
      Ol(t, l), _l(l), l.child.flags & 8192 && l.memoizedState !== null != (u !== null && u.memoizedState !== null) && (li = kl()), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, ff(l, a)));
      break;
    case 22:
      e = l.memoizedState !== null;
      var i = u !== null && u.memoizedState !== null, d = et, g = ll;
      if (et = d || e, ll = g || i, Ol(t, l), ll = g, et = d, _l(l), a & 8192)
        l: for (t = l.stateNode, t._visibility = e ? t._visibility & -2 : t._visibility | 1, e && (u === null || i || et || ll || $t(l)), u = null, t = l; ; ) {
          if (t.tag === 5 || t.tag === 26) {
            if (u === null) {
              i = u = t;
              try {
                if (n = i.stateNode, e)
                  f = n.style, typeof f.setProperty == "function" ? f.setProperty("display", "none", "important") : f.display = "none";
                else {
                  c = i.stateNode;
                  var m = i.memoizedProps.style, y = m != null && m.hasOwnProperty("display") ? m.display : null;
                  c.style.display = y == null || typeof y == "boolean" ? "" : ("" + y).trim();
                }
              } catch (o) {
                C(i, i.return, o);
              }
            }
          } else if (t.tag === 6) {
            if (u === null) {
              i = t;
              try {
                i.stateNode.nodeValue = e ? "" : i.memoizedProps;
              } catch (o) {
                C(i, i.return, o);
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
      a & 4 && (a = l.updateQueue, a !== null && (u = a.retryQueue, u !== null && (a.retryQueue = null, ff(l, u))));
      break;
    case 19:
      Ol(t, l), _l(l), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, ff(l, a)));
      break;
    case 30:
      break;
    case 21:
      break;
    default:
      Ol(t, l), _l(l);
  }
}
function _l(l) {
  var t = l.flags;
  if (t & 2) {
    try {
      for (var u, a = l.return; a !== null; ) {
        if (Z1(a)) {
          u = a;
          break;
        }
        a = a.return;
      }
      if (u == null) throw Error(b(160));
      switch (u.tag) {
        case 27:
          var e = u.stateNode, n = ef(l);
          Pe(l, n, e);
          break;
        case 5:
          var f = u.stateNode;
          u.flags & 32 && (Xu(f, ""), u.flags &= -33);
          var c = ef(l);
          Pe(l, c, f);
          break;
        case 3:
        case 4:
          var i = u.stateNode.containerInfo, d = ef(l);
          $f(
            l,
            d,
            i
          );
          break;
        default:
          throw Error(b(161));
      }
    } catch (g) {
      C(l, l.return, g);
    }
    l.flags &= -3;
  }
  t & 4096 && (l.flags &= -4097);
}
function w1(l) {
  if (l.subtreeFlags & 1024)
    for (l = l.child; l !== null; ) {
      var t = l;
      w1(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), l = l.sibling;
    }
}
function rt(l, t) {
  if (t.subtreeFlags & 8772)
    for (t = t.child; t !== null; )
      C1(l, t.alternate, t), t = t.sibling;
}
function $t(l) {
  for (l = l.child; l !== null; ) {
    var t = l;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Zt(4, t, t.return), $t(t);
        break;
      case 1:
        $l(t, t.return);
        var u = t.stateNode;
        typeof u.componentWillUnmount == "function" && X1(
          t,
          t.return,
          u
        ), $t(t);
        break;
      case 27:
        Da(t.stateNode);
      case 26:
      case 5:
        $l(t, t.return), $t(t);
        break;
      case 22:
        t.memoizedState === null && $t(t);
        break;
      case 30:
        $t(t);
        break;
      default:
        $t(t);
    }
    l = l.sibling;
  }
}
function Et(l, t, u) {
  for (u = u && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
    var a = t.alternate, e = l, n = t, f = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        Et(
          e,
          n,
          u
        ), le(4, n);
        break;
      case 1:
        if (Et(
          e,
          n,
          u
        ), a = n, e = a.stateNode, typeof e.componentDidMount == "function")
          try {
            e.componentDidMount();
          } catch (d) {
            C(a, a.return, d);
          }
        if (a = n, e = a.updateQueue, e !== null) {
          var c = a.stateNode;
          try {
            var i = e.shared.hiddenCallbacks;
            if (i !== null)
              for (e.shared.hiddenCallbacks = null, e = 0; e < i.length; e++)
                Cs(i[e], c);
          } catch (d) {
            C(a, a.return, d);
          }
        }
        u && f & 64 && G1(n), za(n, n.return);
        break;
      case 27:
        j1(n);
      case 26:
      case 5:
        Et(
          e,
          n,
          u
        ), u && a === null && f & 4 && Q1(n), za(n, n.return);
        break;
      case 12:
        Et(
          e,
          n,
          u
        );
        break;
      case 13:
        Et(
          e,
          n,
          u
        ), u && f & 4 && K1(e, n);
        break;
      case 22:
        n.memoizedState === null && Et(
          e,
          n,
          u
        ), za(n, n.return);
        break;
      case 30:
        break;
      default:
        Et(
          e,
          n,
          u
        );
    }
    t = t.sibling;
  }
}
function kc(l, t) {
  var u = null;
  l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (u = l.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== u && (l != null && l.refCount++, u != null && ka(u));
}
function Fc(l, t) {
  l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && ka(l));
}
function Jl(l, t, u, a) {
  if (t.subtreeFlags & 10256)
    for (t = t.child; t !== null; )
      $1(
        l,
        t,
        u,
        a
      ), t = t.sibling;
}
function $1(l, t, u, a) {
  var e = t.flags;
  switch (t.tag) {
    case 0:
    case 11:
    case 15:
      Jl(
        l,
        t,
        u,
        a
      ), e & 2048 && le(9, t);
      break;
    case 1:
      Jl(
        l,
        t,
        u,
        a
      );
      break;
    case 3:
      Jl(
        l,
        t,
        u,
        a
      ), e & 2048 && (l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && ka(l)));
      break;
    case 12:
      if (e & 2048) {
        Jl(
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
          C(t, t.return, i);
        }
      } else
        Jl(
          l,
          t,
          u,
          a
        );
      break;
    case 13:
      Jl(
        l,
        t,
        u,
        a
      );
      break;
    case 23:
      break;
    case 22:
      n = t.stateNode, f = t.alternate, t.memoizedState !== null ? n._visibility & 2 ? Jl(
        l,
        t,
        u,
        a
      ) : Oa(l, t) : n._visibility & 2 ? Jl(
        l,
        t,
        u,
        a
      ) : (n._visibility |= 2, ou(
        l,
        t,
        u,
        a,
        (t.subtreeFlags & 10256) !== 0
      )), e & 2048 && kc(f, t);
      break;
    case 24:
      Jl(
        l,
        t,
        u,
        a
      ), e & 2048 && Fc(t.alternate, t);
      break;
    default:
      Jl(
        l,
        t,
        u,
        a
      );
  }
}
function ou(l, t, u, a, e) {
  for (e = e && (t.subtreeFlags & 10256) !== 0, t = t.child; t !== null; ) {
    var n = l, f = t, c = u, i = a, d = f.flags;
    switch (f.tag) {
      case 0:
      case 11:
      case 15:
        ou(
          n,
          f,
          c,
          i,
          e
        ), le(8, f);
        break;
      case 23:
        break;
      case 22:
        var g = f.stateNode;
        f.memoizedState !== null ? g._visibility & 2 ? ou(
          n,
          f,
          c,
          i,
          e
        ) : Oa(
          n,
          f
        ) : (g._visibility |= 2, ou(
          n,
          f,
          c,
          i,
          e
        )), e && d & 2048 && kc(
          f.alternate,
          f
        );
        break;
      case 24:
        ou(
          n,
          f,
          c,
          i,
          e
        ), e && d & 2048 && Fc(f.alternate, f);
        break;
      default:
        ou(
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
function Oa(l, t) {
  if (t.subtreeFlags & 10256)
    for (t = t.child; t !== null; ) {
      var u = l, a = t, e = a.flags;
      switch (a.tag) {
        case 22:
          Oa(u, a), e & 2048 && kc(
            a.alternate,
            a
          );
          break;
        case 24:
          Oa(u, a), e & 2048 && Fc(a.alternate, a);
          break;
        default:
          Oa(u, a);
      }
      t = t.sibling;
    }
}
var da = 8192;
function vu(l) {
  if (l.subtreeFlags & da)
    for (l = l.child; l !== null; )
      W1(l), l = l.sibling;
}
function W1(l) {
  switch (l.tag) {
    case 26:
      vu(l), l.flags & da && l.memoizedState !== null && bh(
        Vl,
        l.memoizedState,
        l.memoizedProps
      );
      break;
    case 5:
      vu(l);
      break;
    case 3:
    case 4:
      var t = Vl;
      Vl = fn(l.stateNode.containerInfo), vu(l), Vl = t;
      break;
    case 22:
      l.memoizedState === null && (t = l.alternate, t !== null && t.memoizedState !== null ? (t = da, da = 16777216, vu(l), da = t) : vu(l));
      break;
    default:
      vu(l);
  }
}
function k1(l) {
  var t = l.alternate;
  if (t !== null && (l = t.child, l !== null)) {
    t.child = null;
    do
      t = l.sibling, l.sibling = null, l = t;
    while (l !== null);
  }
}
function fa(l) {
  var t = l.deletions;
  if (l.flags & 16) {
    if (t !== null)
      for (var u = 0; u < t.length; u++) {
        var a = t[u];
        cl = a, I1(
          a,
          l
        );
      }
    k1(l);
  }
  if (l.subtreeFlags & 10256)
    for (l = l.child; l !== null; )
      F1(l), l = l.sibling;
}
function F1(l) {
  switch (l.tag) {
    case 0:
    case 11:
    case 15:
      fa(l), l.flags & 2048 && Zt(9, l, l.return);
      break;
    case 3:
      fa(l);
      break;
    case 12:
      fa(l);
      break;
    case 22:
      var t = l.stateNode;
      l.memoizedState !== null && t._visibility & 2 && (l.return === null || l.return.tag !== 13) ? (t._visibility &= -3, He(l)) : fa(l);
      break;
    default:
      fa(l);
  }
}
function He(l) {
  var t = l.deletions;
  if (l.flags & 16) {
    if (t !== null)
      for (var u = 0; u < t.length; u++) {
        var a = t[u];
        cl = a, I1(
          a,
          l
        );
      }
    k1(l);
  }
  for (l = l.child; l !== null; ) {
    switch (t = l, t.tag) {
      case 0:
      case 11:
      case 15:
        Zt(8, t, t.return), He(t);
        break;
      case 22:
        u = t.stateNode, u._visibility & 2 && (u._visibility &= -3, He(t));
        break;
      default:
        He(t);
    }
    l = l.sibling;
  }
}
function I1(l, t) {
  for (; cl !== null; ) {
    var u = cl;
    switch (u.tag) {
      case 0:
      case 11:
      case 15:
        Zt(8, u, t);
        break;
      case 23:
      case 22:
        if (u.memoizedState !== null && u.memoizedState.cachePool !== null) {
          var a = u.memoizedState.cachePool.pool;
          a != null && a.refCount++;
        }
        break;
      case 24:
        ka(u.memoizedState.cache);
    }
    if (a = u.child, a !== null) a.return = u, cl = a;
    else
      l: for (u = l; cl !== null; ) {
        a = cl;
        var e = a.sibling, n = a.return;
        if (V1(a), a === u) {
          cl = null;
          break l;
        }
        if (e !== null) {
          e.return = n, cl = e;
          break l;
        }
        cl = n;
      }
  }
}
var qy = {
  getCacheForType: function(l) {
    var t = ml(al), u = t.data.get(l);
    return u === void 0 && (u = l(), t.data.set(l, u)), u;
  }
}, xy = typeof WeakMap == "function" ? WeakMap : Map, Q = 0, V = null, p = null, q = 0, X = 0, Ml = null, Rt = !1, Fu = !1, Ic = !1, mt = 0, k = 0, jt = 0, lu = 0, Pc = 0, Zl = 0, Vu = 0, _a = null, Tl = null, Wf = !1, li = 0, ln = 1 / 0, tn = null, qt = null, yl = 0, xt = null, Lu = null, xu = 0, kf = 0, Ff = null, P1 = null, Ma = 0, If = null;
function Nl() {
  if (Q & 2 && q !== 0)
    return q & -q;
  if (_.T !== null) {
    var l = Qu;
    return l !== 0 ? l : ui();
  }
  return vs();
}
function lv() {
  Zl === 0 && (Zl = !(q & 536870912) || B ? fs() : 536870912);
  var l = jl.current;
  return l !== null && (l.flags |= 32), Zl;
}
function Hl(l, t, u) {
  (l === V && (X === 2 || X === 9) || l.cancelPendingCommit !== null) && (Ku(l, 0), Nt(
    l,
    q,
    Zl,
    !1
  )), Ka(l, u), (!(Q & 2) || l !== V) && (l === V && (!(Q & 2) && (lu |= u), k === 4 && Nt(
    l,
    q,
    Zl,
    !1
  )), Pl(l));
}
function tv(l, t, u) {
  if (Q & 6) throw Error(b(327));
  var a = !u && (t & 124) === 0 && (t & l.expiredLanes) === 0 || La(l, t), e = a ? Xy(l, t) : cf(l, t, !0), n = a;
  do {
    if (e === 0) {
      Fu && !a && Nt(l, t, 0, !1);
      break;
    } else {
      if (u = l.current.alternate, n && !By(u)) {
        e = cf(l, t, !1), n = !1;
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
            e = _a;
            var i = c.current.memoizedState.isDehydrated;
            if (i && (Ku(c, f).flags |= 256), f = cf(
              c,
              f,
              !1
            ), f !== 2) {
              if (Ic && !i) {
                c.errorRecoveryDisabledLanes |= n, lu |= n, e = 4;
                break l;
              }
              n = Tl, Tl = e, n !== null && (Tl === null ? Tl = n : Tl.push.apply(
                Tl,
                n
              ));
            }
            e = f;
          }
          if (n = !1, e !== 2) continue;
        }
      }
      if (e === 1) {
        Ku(l, 0), Nt(l, t, 0, !0);
        break;
      }
      l: {
        switch (a = l, n = e, n) {
          case 0:
          case 1:
            throw Error(b(345));
          case 4:
            if ((t & 4194048) !== t) break;
          case 6:
            Nt(
              a,
              t,
              Zl,
              !Rt
            );
            break l;
          case 2:
            Tl = null;
            break;
          case 3:
          case 5:
            break;
          default:
            throw Error(b(329));
        }
        if ((t & 62914560) === t && (e = li + 300 - kl(), 10 < e)) {
          if (Nt(
            a,
            t,
            Zl,
            !Rt
          ), mn(a, 0, !0) !== 0) break l;
          a.timeoutHandle = Ev(
            h0.bind(
              null,
              a,
              u,
              Tl,
              tn,
              Wf,
              t,
              Zl,
              lu,
              Vu,
              Rt,
              n,
              2,
              -0,
              0
            ),
            e
          );
          break l;
        }
        h0(
          a,
          u,
          Tl,
          tn,
          Wf,
          t,
          Zl,
          lu,
          Vu,
          Rt,
          n,
          0,
          -0,
          0
        );
      }
    }
    break;
  } while (!0);
  Pl(l);
}
function h0(l, t, u, a, e, n, f, c, i, d, g, m, y, o) {
  if (l.timeoutHandle = -1, m = t.subtreeFlags, (m & 8192 || (m & 16785408) === 16785408) && (Ga = { stylesheets: null, count: 0, unsuspend: Sh }, W1(t), m = rh(), m !== null)) {
    l.cancelPendingCommit = m(
      m0.bind(
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
        g,
        1,
        y,
        o
      )
    ), Nt(l, n, f, !d);
    return;
  }
  m0(
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
function By(l) {
  for (var t = l; ; ) {
    var u = t.tag;
    if ((u === 0 || u === 11 || u === 15) && t.flags & 16384 && (u = t.updateQueue, u !== null && (u = u.stores, u !== null)))
      for (var a = 0; a < u.length; a++) {
        var e = u[a], n = e.getSnapshot;
        e = e.value;
        try {
          if (!pl(n(), e)) return !1;
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
function Nt(l, t, u, a) {
  t &= ~Pc, t &= ~lu, l.suspendedLanes |= t, l.pingedLanes &= ~t, a && (l.warmLanes |= t), a = l.expirationTimes;
  for (var e = t; 0 < e; ) {
    var n = 31 - Rl(e), f = 1 << n;
    a[n] = -1, e &= ~f;
  }
  u !== 0 && is(l, u, t);
}
function _n() {
  return Q & 6 ? !0 : (te(0), !1);
}
function ti() {
  if (p !== null) {
    if (X === 0)
      var l = p.return;
    else
      l = p, it = su = null, jc(l), qu = null, qa = 0, l = p;
    for (; l !== null; )
      B1(l.alternate, l), l = l.return;
    p = null;
  }
}
function Ku(l, t) {
  var u = l.timeoutHandle;
  u !== -1 && (l.timeoutHandle = -1, lh(u)), u = l.cancelPendingCommit, u !== null && (l.cancelPendingCommit = null, u()), ti(), V = l, p = u = vt(l.current, null), q = t, X = 0, Ml = null, Rt = !1, Fu = La(l, t), Ic = !1, Vu = Zl = Pc = lu = jt = k = 0, Tl = _a = null, Wf = !1, t & 8 && (t |= t & 32);
  var a = l.entangledLanes;
  if (a !== 0)
    for (l = l.entanglements, a &= t; 0 < a; ) {
      var e = 31 - Rl(a), n = 1 << e;
      t |= l[e], a &= ~n;
    }
  return mt = t, rn(), u;
}
function uv(l, t) {
  U = null, _.H = $e, t === Fa || t === Tn ? (t = Ki(), X = 3) : t === Zs ? (t = Ki(), X = 4) : X = t === N1 ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, Ml = t, p === null && (k = 1, Fe(
    l,
    Ql(t, l.current)
  ));
}
function av() {
  var l = _.H;
  return _.H = $e, l === null ? $e : l;
}
function ev() {
  var l = _.A;
  return _.A = qy, l;
}
function Pf() {
  k = 4, Rt || (q & 4194048) !== q && jl.current !== null || (Fu = !0), !(jt & 134217727) && !(lu & 134217727) || V === null || Nt(
    V,
    q,
    Zl,
    !1
  );
}
function cf(l, t, u) {
  var a = Q;
  Q |= 2;
  var e = av(), n = ev();
  (V !== l || q !== t) && (tn = null, Ku(l, t)), t = !1;
  var f = k;
  l: do
    try {
      if (X !== 0 && p !== null) {
        var c = p, i = Ml;
        switch (X) {
          case 8:
            ti(), f = 6;
            break l;
          case 3:
          case 2:
          case 9:
          case 6:
            jl.current === null && (t = !0);
            var d = X;
            if (X = 0, Ml = null, Du(l, c, i, d), u && Fu) {
              f = 0;
              break l;
            }
            break;
          default:
            d = X, X = 0, Ml = null, Du(l, c, i, d);
        }
      }
      Gy(), f = k;
      break;
    } catch (g) {
      uv(l, g);
    }
  while (!0);
  return t && l.shellSuspendCounter++, it = su = null, Q = a, _.H = e, _.A = n, p === null && (V = null, q = 0, rn()), f;
}
function Gy() {
  for (; p !== null; ) nv(p);
}
function Xy(l, t) {
  var u = Q;
  Q |= 2;
  var a = av(), e = ev();
  V !== l || q !== t ? (tn = null, ln = kl() + 500, Ku(l, t)) : Fu = La(
    l,
    t
  );
  l: do
    try {
      if (X !== 0 && p !== null) {
        t = p;
        var n = Ml;
        t: switch (X) {
          case 1:
            X = 0, Ml = null, Du(l, t, n, 1);
            break;
          case 2:
          case 9:
            if (Li(n)) {
              X = 0, Ml = null, o0(t);
              break;
            }
            t = function() {
              X !== 2 && X !== 9 || V !== l || (X = 7), Pl(l);
            }, n.then(t, t);
            break l;
          case 3:
            X = 7;
            break l;
          case 4:
            X = 5;
            break l;
          case 7:
            Li(n) ? (X = 0, Ml = null, o0(t)) : (X = 0, Ml = null, Du(l, t, n, 7));
            break;
          case 5:
            var f = null;
            switch (p.tag) {
              case 26:
                f = p.memoizedState;
              case 5:
              case 27:
                var c = p;
                if (!f || Ov(f)) {
                  X = 0, Ml = null;
                  var i = c.sibling;
                  if (i !== null) p = i;
                  else {
                    var d = c.return;
                    d !== null ? (p = d, Mn(d)) : p = null;
                  }
                  break t;
                }
            }
            X = 0, Ml = null, Du(l, t, n, 5);
            break;
          case 6:
            X = 0, Ml = null, Du(l, t, n, 6);
            break;
          case 8:
            ti(), k = 6;
            break l;
          default:
            throw Error(b(462));
        }
      }
      Qy();
      break;
    } catch (g) {
      uv(l, g);
    }
  while (!0);
  return it = su = null, _.H = a, _.A = e, Q = u, p !== null ? 0 : (V = null, q = 0, rn(), k);
}
function Qy() {
  for (; p !== null && !cd(); )
    nv(p);
}
function nv(l) {
  var t = x1(l.alternate, l, mt);
  l.memoizedProps = l.pendingProps, t === null ? Mn(l) : p = t;
}
function o0(l) {
  var t = l, u = t.alternate;
  switch (t.tag) {
    case 15:
    case 0:
      t = c0(
        u,
        t,
        t.pendingProps,
        t.type,
        void 0,
        q
      );
      break;
    case 11:
      t = c0(
        u,
        t,
        t.pendingProps,
        t.type.render,
        t.ref,
        q
      );
      break;
    case 5:
      jc(t);
    default:
      B1(u, t), t = p = Bs(t, mt), t = x1(u, t, mt);
  }
  l.memoizedProps = l.pendingProps, t === null ? Mn(l) : p = t;
}
function Du(l, t, u, a) {
  it = su = null, jc(t), qu = null, qa = 0;
  var e = t.return;
  try {
    if (Uy(
      l,
      e,
      t,
      u,
      q
    )) {
      k = 1, Fe(
        l,
        Ql(u, l.current)
      ), p = null;
      return;
    }
  } catch (n) {
    if (e !== null) throw p = e, n;
    k = 1, Fe(
      l,
      Ql(u, l.current)
    ), p = null;
    return;
  }
  t.flags & 32768 ? (B || a === 1 ? l = !0 : Fu || q & 536870912 ? l = !1 : (Rt = l = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = jl.current, a !== null && a.tag === 13 && (a.flags |= 16384))), fv(t, l)) : Mn(t);
}
function Mn(l) {
  var t = l;
  do {
    if (t.flags & 32768) {
      fv(
        t,
        Rt
      );
      return;
    }
    l = t.return;
    var u = Ny(
      t.alternate,
      t,
      mt
    );
    if (u !== null) {
      p = u;
      return;
    }
    if (t = t.sibling, t !== null) {
      p = t;
      return;
    }
    p = t = l;
  } while (t !== null);
  k === 0 && (k = 5);
}
function fv(l, t) {
  do {
    var u = Hy(l.alternate, l);
    if (u !== null) {
      u.flags &= 32767, p = u;
      return;
    }
    if (u = l.return, u !== null && (u.flags |= 32768, u.subtreeFlags = 0, u.deletions = null), !t && (l = l.sibling, l !== null)) {
      p = l;
      return;
    }
    p = l = u;
  } while (l !== null);
  k = 6, p = null;
}
function m0(l, t, u, a, e, n, f, c, i) {
  l.cancelPendingCommit = null;
  do
    Dn();
  while (yl !== 0);
  if (Q & 6) throw Error(b(327));
  if (t !== null) {
    if (t === l.current) throw Error(b(177));
    if (n = t.lanes | t.childLanes, n |= Uc, Sd(
      l,
      u,
      n,
      f,
      c,
      i
    ), l === V && (p = V = null, q = 0), Lu = t, xt = l, xu = u, kf = n, Ff = e, P1 = a, t.subtreeFlags & 10256 || t.flags & 10256 ? (l.callbackNode = null, l.callbackPriority = 0, Vy(Xe, function() {
      return dv(), null;
    })) : (l.callbackNode = null, l.callbackPriority = 0), a = (t.flags & 13878) !== 0, t.subtreeFlags & 13878 || a) {
      a = _.T, _.T = null, e = G.p, G.p = 2, f = Q, Q |= 4;
      try {
        py(l, t, u);
      } finally {
        Q = f, G.p = e, _.T = a;
      }
    }
    yl = 1, cv(), iv(), sv();
  }
}
function cv() {
  if (yl === 1) {
    yl = 0;
    var l = xt, t = Lu, u = (t.flags & 13878) !== 0;
    if (t.subtreeFlags & 13878 || u) {
      u = _.T, _.T = null;
      var a = G.p;
      G.p = 2;
      var e = Q;
      Q |= 4;
      try {
        J1(t, l);
        var n = ac, f = Us(l.containerInfo), c = n.focusedElem, i = n.selectionRange;
        if (f !== c && c && c.ownerDocument && Ds(
          c.ownerDocument.documentElement,
          c
        )) {
          if (i !== null && Dc(c)) {
            var d = i.start, g = i.end;
            if (g === void 0 && (g = d), "selectionStart" in c)
              c.selectionStart = d, c.selectionEnd = Math.min(
                g,
                c.value.length
              );
            else {
              var m = c.ownerDocument || document, y = m && m.defaultView || window;
              if (y.getSelection) {
                var o = y.getSelection(), z = c.textContent.length, A = Math.min(i.start, z), x = i.end === void 0 ? A : Math.min(i.end, z);
                !o.extend && A > x && (f = x, x = A, A = f);
                var v = Bi(
                  c,
                  A
                ), s = Bi(
                  c,
                  x
                );
                if (v && s && (o.rangeCount !== 1 || o.anchorNode !== v.node || o.anchorOffset !== v.offset || o.focusNode !== s.node || o.focusOffset !== s.offset)) {
                  var h = m.createRange();
                  h.setStart(v.node, v.offset), o.removeAllRanges(), A > x ? (o.addRange(h), o.extend(s.node, s.offset)) : (h.setEnd(s.node, s.offset), o.addRange(h));
                }
              }
            }
          }
          for (m = [], o = c; o = o.parentNode; )
            o.nodeType === 1 && m.push({
              element: o,
              left: o.scrollLeft,
              top: o.scrollTop
            });
          for (typeof c.focus == "function" && c.focus(), c = 0; c < m.length; c++) {
            var S = m[c];
            S.element.scrollLeft = S.left, S.element.scrollTop = S.top;
          }
        }
        vn = !!uc, ac = uc = null;
      } finally {
        Q = e, G.p = a, _.T = u;
      }
    }
    l.current = t, yl = 2;
  }
}
function iv() {
  if (yl === 2) {
    yl = 0;
    var l = xt, t = Lu, u = (t.flags & 8772) !== 0;
    if (t.subtreeFlags & 8772 || u) {
      u = _.T, _.T = null;
      var a = G.p;
      G.p = 2;
      var e = Q;
      Q |= 4;
      try {
        C1(l, t.alternate, t);
      } finally {
        Q = e, G.p = a, _.T = u;
      }
    }
    yl = 3;
  }
}
function sv() {
  if (yl === 4 || yl === 3) {
    yl = 0, id();
    var l = xt, t = Lu, u = xu, a = P1;
    t.subtreeFlags & 10256 || t.flags & 10256 ? yl = 5 : (yl = 0, Lu = xt = null, vv(l, l.pendingLanes));
    var e = l.pendingLanes;
    if (e === 0 && (qt = null), Ec(u), t = t.stateNode, Ul && typeof Ul.onCommitFiberRoot == "function")
      try {
        Ul.onCommitFiberRoot(
          Va,
          t,
          void 0,
          (t.current.flags & 128) === 128
        );
      } catch {
      }
    if (a !== null) {
      t = _.T, e = G.p, G.p = 2, _.T = null;
      try {
        for (var n = l.onRecoverableError, f = 0; f < a.length; f++) {
          var c = a[f];
          n(c.value, {
            componentStack: c.stack
          });
        }
      } finally {
        _.T = t, G.p = e;
      }
    }
    xu & 3 && Dn(), Pl(l), e = l.pendingLanes, u & 4194090 && e & 42 ? l === If ? Ma++ : (Ma = 0, If = l) : Ma = 0, te(0);
  }
}
function vv(l, t) {
  (l.pooledCacheLanes &= t) === 0 && (t = l.pooledCache, t != null && (l.pooledCache = null, ka(t)));
}
function Dn(l) {
  return cv(), iv(), sv(), dv();
}
function dv() {
  if (yl !== 5) return !1;
  var l = xt, t = kf;
  kf = 0;
  var u = Ec(xu), a = _.T, e = G.p;
  try {
    G.p = 32 > u ? 32 : u, _.T = null, u = Ff, Ff = null;
    var n = xt, f = xu;
    if (yl = 0, Lu = xt = null, xu = 0, Q & 6) throw Error(b(331));
    var c = Q;
    if (Q |= 4, F1(n.current), $1(
      n,
      n.current,
      f,
      u
    ), Q = c, te(0, !1), Ul && typeof Ul.onPostCommitFiberRoot == "function")
      try {
        Ul.onPostCommitFiberRoot(Va, n);
      } catch {
      }
    return !0;
  } finally {
    G.p = e, _.T = a, vv(l, t);
  }
}
function g0(l, t, u) {
  t = Ql(u, t), t = Kf(l.stateNode, t, 2), l = Yt(l, t, 2), l !== null && (Ka(l, 2), Pl(l));
}
function C(l, t, u) {
  if (l.tag === 3)
    g0(l, l, u);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        g0(
          t,
          l,
          u
        );
        break;
      } else if (t.tag === 1) {
        var a = t.stateNode;
        if (typeof t.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (qt === null || !qt.has(a))) {
          l = Ql(u, l), u = U1(2), a = Yt(t, u, 2), a !== null && (R1(
            u,
            a,
            t,
            l
          ), Ka(a, 2), Pl(a));
          break;
        }
      }
      t = t.return;
    }
}
function sf(l, t, u) {
  var a = l.pingCache;
  if (a === null) {
    a = l.pingCache = new xy();
    var e = /* @__PURE__ */ new Set();
    a.set(t, e);
  } else
    e = a.get(t), e === void 0 && (e = /* @__PURE__ */ new Set(), a.set(t, e));
  e.has(u) || (Ic = !0, e.add(u), l = Zy.bind(null, l, t, u), t.then(l, l));
}
function Zy(l, t, u) {
  var a = l.pingCache;
  a !== null && a.delete(t), l.pingedLanes |= l.suspendedLanes & u, l.warmLanes &= ~u, V === l && (q & u) === u && (k === 4 || k === 3 && (q & 62914560) === q && 300 > kl() - li ? !(Q & 2) && Ku(l, 0) : Pc |= u, Vu === q && (Vu = 0)), Pl(l);
}
function yv(l, t) {
  t === 0 && (t = cs()), l = ku(l, t), l !== null && (Ka(l, t), Pl(l));
}
function jy(l) {
  var t = l.memoizedState, u = 0;
  t !== null && (u = t.retryLane), yv(l, u);
}
function Cy(l, t) {
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
      throw Error(b(314));
  }
  a !== null && a.delete(t), yv(l, u);
}
function Vy(l, t) {
  return bc(l, t);
}
var un = null, mu = null, lc = !1, an = !1, vf = !1, tu = 0;
function Pl(l) {
  l !== mu && l.next === null && (mu === null ? un = mu = l : mu = mu.next = l), an = !0, lc || (lc = !0, Ky());
}
function te(l, t) {
  if (!vf && an) {
    vf = !0;
    do
      for (var u = !1, a = un; a !== null; ) {
        if (l !== 0) {
          var e = a.pendingLanes;
          if (e === 0) var n = 0;
          else {
            var f = a.suspendedLanes, c = a.pingedLanes;
            n = (1 << 31 - Rl(42 | l) + 1) - 1, n &= e & ~(f & ~c), n = n & 201326741 ? n & 201326741 | 1 : n ? n | 2 : 0;
          }
          n !== 0 && (u = !0, S0(a, n));
        } else
          n = q, n = mn(
            a,
            a === V ? n : 0,
            a.cancelPendingCommit !== null || a.timeoutHandle !== -1
          ), !(n & 3) || La(a, n) || (u = !0, S0(a, n));
        a = a.next;
      }
    while (u);
    vf = !1;
  }
}
function Ly() {
  hv();
}
function hv() {
  an = lc = !1;
  var l = 0;
  tu !== 0 && (Py() && (l = tu), tu = 0);
  for (var t = kl(), u = null, a = un; a !== null; ) {
    var e = a.next, n = ov(a, t);
    n === 0 ? (a.next = null, u === null ? un = e : u.next = e, e === null && (mu = u)) : (u = a, (l !== 0 || n & 3) && (an = !0)), a = e;
  }
  te(l);
}
function ov(l, t) {
  for (var u = l.suspendedLanes, a = l.pingedLanes, e = l.expirationTimes, n = l.pendingLanes & -62914561; 0 < n; ) {
    var f = 31 - Rl(n), c = 1 << f, i = e[f];
    i === -1 ? (!(c & u) || c & a) && (e[f] = gd(c, t)) : i <= t && (l.expiredLanes |= c), n &= ~c;
  }
  if (t = V, u = q, u = mn(
    l,
    l === t ? u : 0,
    l.cancelPendingCommit !== null || l.timeoutHandle !== -1
  ), a = l.callbackNode, u === 0 || l === t && (X === 2 || X === 9) || l.cancelPendingCommit !== null)
    return a !== null && a !== null && xn(a), l.callbackNode = null, l.callbackPriority = 0;
  if (!(u & 3) || La(l, u)) {
    if (t = u & -u, t === l.callbackPriority) return t;
    switch (a !== null && xn(a), Ec(u)) {
      case 2:
      case 8:
        u = es;
        break;
      case 32:
        u = Xe;
        break;
      case 268435456:
        u = ns;
        break;
      default:
        u = Xe;
    }
    return a = mv.bind(null, l), u = bc(u, a), l.callbackPriority = t, l.callbackNode = u, t;
  }
  return a !== null && a !== null && xn(a), l.callbackPriority = 2, l.callbackNode = null, 2;
}
function mv(l, t) {
  if (yl !== 0 && yl !== 5)
    return l.callbackNode = null, l.callbackPriority = 0, null;
  var u = l.callbackNode;
  if (Dn() && l.callbackNode !== u)
    return null;
  var a = q;
  return a = mn(
    l,
    l === V ? a : 0,
    l.cancelPendingCommit !== null || l.timeoutHandle !== -1
  ), a === 0 ? null : (tv(l, a, t), ov(l, kl()), l.callbackNode != null && l.callbackNode === u ? mv.bind(null, l) : null);
}
function S0(l, t) {
  if (Dn()) return null;
  tv(l, t, !0);
}
function Ky() {
  th(function() {
    Q & 6 ? bc(
      as,
      Ly
    ) : hv();
  });
}
function ui() {
  return tu === 0 && (tu = fs()), tu;
}
function b0(l) {
  return l == null || typeof l == "symbol" || typeof l == "boolean" ? null : typeof l == "function" ? l : ze("" + l);
}
function r0(l, t) {
  var u = t.ownerDocument.createElement("input");
  return u.name = t.name, u.value = t.value, l.id && u.setAttribute("form", l.id), t.parentNode.insertBefore(u, t), l = new FormData(l), u.parentNode.removeChild(u), l;
}
function Jy(l, t, u, a, e) {
  if (t === "submit" && u && u.stateNode === e) {
    var n = b0(
      (e[Al] || null).action
    ), f = a.submitter;
    f && (t = (t = f[Al] || null) ? b0(t.formAction) : f.getAttribute("formAction"), t !== null && (n = t, f = null));
    var c = new gn(
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
              if (tu !== 0) {
                var i = f ? r0(e, f) : new FormData(e);
                Vf(
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
              typeof n == "function" && (c.preventDefault(), i = f ? r0(e, f) : new FormData(e), Vf(
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
for (var df = 0; df < Hf.length; df++) {
  var yf = Hf[df], wy = yf.toLowerCase(), $y = yf[0].toUpperCase() + yf.slice(1);
  Kl(
    wy,
    "on" + $y
  );
}
Kl(Ns, "onAnimationEnd");
Kl(Hs, "onAnimationIteration");
Kl(ps, "onAnimationStart");
Kl("dblclick", "onDoubleClick");
Kl("focusin", "onFocus");
Kl("focusout", "onBlur");
Kl(dy, "onTransitionRun");
Kl(yy, "onTransitionStart");
Kl(hy, "onTransitionCancel");
Kl(Ys, "onTransitionEnd");
Gu("onMouseEnter", ["mouseout", "mouseover"]);
Gu("onMouseLeave", ["mouseout", "mouseover"]);
Gu("onPointerEnter", ["pointerout", "pointerover"]);
Gu("onPointerLeave", ["pointerout", "pointerover"]);
fu(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(" ")
);
fu(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " "
  )
);
fu("onBeforeInput", [
  "compositionend",
  "keypress",
  "textInput",
  "paste"
]);
fu(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" ")
);
fu(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" ")
);
fu(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
);
var xa = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
  " "
), Wy = new Set(
  "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(xa)
);
function gv(l, t) {
  t = (t & 4) !== 0;
  for (var u = 0; u < l.length; u++) {
    var a = l[u], e = a.event;
    a = a.listeners;
    l: {
      var n = void 0;
      if (t)
        for (var f = a.length - 1; 0 <= f; f--) {
          var c = a[f], i = c.instance, d = c.currentTarget;
          if (c = c.listener, i !== n && e.isPropagationStopped())
            break l;
          n = c, e.currentTarget = d;
          try {
            n(e);
          } catch (g) {
            ke(g);
          }
          e.currentTarget = null, n = i;
        }
      else
        for (f = 0; f < a.length; f++) {
          if (c = a[f], i = c.instance, d = c.currentTarget, c = c.listener, i !== n && e.isPropagationStopped())
            break l;
          n = c, e.currentTarget = d;
          try {
            n(e);
          } catch (g) {
            ke(g);
          }
          e.currentTarget = null, n = i;
        }
    }
  }
}
function H(l, t) {
  var u = t[Of];
  u === void 0 && (u = t[Of] = /* @__PURE__ */ new Set());
  var a = l + "__bubble";
  u.has(a) || (Sv(t, l, 2, !1), u.add(a));
}
function hf(l, t, u) {
  var a = 0;
  t && (a |= 4), Sv(
    u,
    l,
    a,
    t
  );
}
var be = "_reactListening" + Math.random().toString(36).slice(2);
function ai(l) {
  if (!l[be]) {
    l[be] = !0, ds.forEach(function(u) {
      u !== "selectionchange" && (Wy.has(u) || hf(u, !1, l), hf(u, !0, l));
    });
    var t = l.nodeType === 9 ? l : l.ownerDocument;
    t === null || t[be] || (t[be] = !0, hf("selectionchange", !1, t));
  }
}
function Sv(l, t, u, a) {
  switch (Rv(t)) {
    case 2:
      var e = Ah;
      break;
    case 8:
      e = zh;
      break;
    default:
      e = ci;
  }
  u = e.bind(
    null,
    t,
    u,
    l
  ), e = void 0, !Uf || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (e = !0), a ? e !== void 0 ? l.addEventListener(t, u, {
    capture: !0,
    passive: e
  }) : l.addEventListener(t, u, !0) : e !== void 0 ? l.addEventListener(t, u, {
    passive: e
  }) : l.addEventListener(t, u, !1);
}
function of(l, t, u, a, e) {
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
          if (f = bu(c), f === null) return;
          if (i = f.tag, i === 5 || i === 6 || i === 26 || i === 27) {
            a = n = f;
            continue l;
          }
          c = c.parentNode;
        }
      }
      a = a.return;
    }
  rs(function() {
    var d = n, g = zc(u), m = [];
    l: {
      var y = qs.get(l);
      if (y !== void 0) {
        var o = gn, z = l;
        switch (l) {
          case "keypress":
            if (_e(u) === 0) break l;
          case "keydown":
          case "keyup":
            o = Vd;
            break;
          case "focusin":
            z = "focus", o = Vn;
            break;
          case "focusout":
            z = "blur", o = Vn;
            break;
          case "beforeblur":
          case "afterblur":
            o = Vn;
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
            o = Mi;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            o = Hd;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            o = Jd;
            break;
          case Ns:
          case Hs:
          case ps:
            o = qd;
            break;
          case Ys:
            o = $d;
            break;
          case "scroll":
          case "scrollend":
            o = Rd;
            break;
          case "wheel":
            o = kd;
            break;
          case "copy":
          case "cut":
          case "paste":
            o = Bd;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            o = Ui;
            break;
          case "toggle":
          case "beforetoggle":
            o = Id;
        }
        var A = (t & 4) !== 0, x = !A && (l === "scroll" || l === "scrollend"), v = A ? y !== null ? y + "Capture" : null : y;
        A = [];
        for (var s = d, h; s !== null; ) {
          var S = s;
          if (h = S.stateNode, S = S.tag, S !== 5 && S !== 26 && S !== 27 || h === null || v === null || (S = Ra(s, v), S != null && A.push(
            Ba(s, S, h)
          )), x) break;
          s = s.return;
        }
        0 < A.length && (y = new o(
          y,
          z,
          null,
          u,
          g
        ), m.push({ event: y, listeners: A }));
      }
    }
    if (!(t & 7)) {
      l: {
        if (y = l === "mouseover" || l === "pointerover", o = l === "mouseout" || l === "pointerout", y && u !== Df && (z = u.relatedTarget || u.fromElement) && (bu(z) || z[$u]))
          break l;
        if ((o || y) && (y = g.window === g ? g : (y = g.ownerDocument) ? y.defaultView || y.parentWindow : window, o ? (z = u.relatedTarget || u.toElement, o = d, z = z ? bu(z) : null, z !== null && (x = Ca(z), A = z.tag, z !== x || A !== 5 && A !== 27 && A !== 6) && (z = null)) : (o = null, z = d), o !== z)) {
          if (A = Mi, S = "onMouseLeave", v = "onMouseEnter", s = "mouse", (l === "pointerout" || l === "pointerover") && (A = Ui, S = "onPointerLeave", v = "onPointerEnter", s = "pointer"), x = o == null ? y : va(o), h = z == null ? y : va(z), y = new A(
            S,
            s + "leave",
            o,
            u,
            g
          ), y.target = x, y.relatedTarget = h, S = null, bu(g) === d && (A = new A(
            v,
            s + "enter",
            z,
            u,
            g
          ), A.target = h, A.relatedTarget = x, S = A), x = S, o && z)
            t: {
              for (A = o, v = z, s = 0, h = A; h; h = du(h))
                s++;
              for (h = 0, S = v; S; S = du(S))
                h++;
              for (; 0 < s - h; )
                A = du(A), s--;
              for (; 0 < h - s; )
                v = du(v), h--;
              for (; s--; ) {
                if (A === v || v !== null && A === v.alternate)
                  break t;
                A = du(A), v = du(v);
              }
              A = null;
            }
          else A = null;
          o !== null && E0(
            m,
            y,
            o,
            A,
            !1
          ), z !== null && x !== null && E0(
            m,
            x,
            z,
            A,
            !0
          );
        }
      }
      l: {
        if (y = d ? va(d) : window, o = y.nodeName && y.nodeName.toLowerCase(), o === "select" || o === "input" && y.type === "file")
          var r = pi;
        else if (Hi(y))
          if (_s)
            r = iy;
          else {
            r = fy;
            var M = ny;
          }
        else
          o = y.nodeName, !o || o.toLowerCase() !== "input" || y.type !== "checkbox" && y.type !== "radio" ? d && Ac(d.elementType) && (r = pi) : r = cy;
        if (r && (r = r(l, d))) {
          Os(
            m,
            r,
            u,
            g
          );
          break l;
        }
        M && M(l, y, d), l === "focusout" && d && y.type === "number" && d.memoizedProps.value != null && Mf(y, "number", y.value);
      }
      switch (M = d ? va(d) : window, l) {
        case "focusin":
          (Hi(M) || M.contentEditable === "true") && (Tu = M, Rf = d, ga = null);
          break;
        case "focusout":
          ga = Rf = Tu = null;
          break;
        case "mousedown":
          Nf = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Nf = !1, Gi(m, u, g);
          break;
        case "selectionchange":
          if (vy) break;
        case "keydown":
        case "keyup":
          Gi(m, u, g);
      }
      var T;
      if (Mc)
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
        Eu ? As(l, u) && (O = "onCompositionEnd") : l === "keydown" && u.keyCode === 229 && (O = "onCompositionStart");
      O && (Ts && u.locale !== "ko" && (Eu || O !== "onCompositionStart" ? O === "onCompositionEnd" && Eu && (T = Es()) : (Ut = g, Oc = "value" in Ut ? Ut.value : Ut.textContent, Eu = !0)), M = en(d, O), 0 < M.length && (O = new Di(
        O,
        l,
        null,
        u,
        g
      ), m.push({ event: O, listeners: M }), T ? O.data = T : (T = zs(u), T !== null && (O.data = T)))), (T = ly ? ty(l, u) : uy(l, u)) && (O = en(d, "onBeforeInput"), 0 < O.length && (M = new Di(
        "onBeforeInput",
        "beforeinput",
        null,
        u,
        g
      ), m.push({
        event: M,
        listeners: O
      }), M.data = T)), Jy(
        m,
        l,
        d,
        u,
        g
      );
    }
    gv(m, t);
  });
}
function Ba(l, t, u) {
  return {
    instance: l,
    listener: t,
    currentTarget: u
  };
}
function en(l, t) {
  for (var u = t + "Capture", a = []; l !== null; ) {
    var e = l, n = e.stateNode;
    if (e = e.tag, e !== 5 && e !== 26 && e !== 27 || n === null || (e = Ra(l, u), e != null && a.unshift(
      Ba(l, e, n)
    ), e = Ra(l, t), e != null && a.push(
      Ba(l, e, n)
    )), l.tag === 3) return a;
    l = l.return;
  }
  return [];
}
function du(l) {
  if (l === null) return null;
  do
    l = l.return;
  while (l && l.tag !== 5 && l.tag !== 27);
  return l || null;
}
function E0(l, t, u, a, e) {
  for (var n = t._reactName, f = []; u !== null && u !== a; ) {
    var c = u, i = c.alternate, d = c.stateNode;
    if (c = c.tag, i !== null && i === a) break;
    c !== 5 && c !== 26 && c !== 27 || d === null || (i = d, e ? (d = Ra(u, n), d != null && f.unshift(
      Ba(u, d, i)
    )) : e || (d = Ra(u, n), d != null && f.push(
      Ba(u, d, i)
    ))), u = u.return;
  }
  f.length !== 0 && l.push({ event: t, listeners: f });
}
var ky = /\r\n?/g, Fy = /\u0000|\uFFFD/g;
function T0(l) {
  return (typeof l == "string" ? l : "" + l).replace(ky, `
`).replace(Fy, "");
}
function bv(l, t) {
  return t = T0(t), T0(l) === t;
}
function Un() {
}
function Z(l, t, u, a, e, n) {
  switch (u) {
    case "children":
      typeof a == "string" ? t === "body" || t === "textarea" && a === "" || Xu(l, a) : (typeof a == "number" || typeof a == "bigint") && t !== "body" && Xu(l, "" + a);
      break;
    case "className":
      de(l, "class", a);
      break;
    case "tabIndex":
      de(l, "tabindex", a);
      break;
    case "dir":
    case "role":
    case "viewBox":
    case "width":
    case "height":
      de(l, u, a);
      break;
    case "style":
      bs(l, a, n);
      break;
    case "data":
      if (t !== "object") {
        de(l, "data", a);
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
      a = ze("" + a), l.setAttribute(u, a);
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
      a = ze("" + a), l.setAttribute(u, a);
      break;
    case "onClick":
      a != null && (l.onclick = Un);
      break;
    case "onScroll":
      a != null && H("scroll", l);
      break;
    case "onScrollEnd":
      a != null && H("scrollend", l);
      break;
    case "dangerouslySetInnerHTML":
      if (a != null) {
        if (typeof a != "object" || !("__html" in a))
          throw Error(b(61));
        if (u = a.__html, u != null) {
          if (e.children != null) throw Error(b(60));
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
      u = ze("" + a), l.setAttributeNS(
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
      H("beforetoggle", l), H("toggle", l), Ae(l, "popover", a);
      break;
    case "xlinkActuate":
      lt(
        l,
        "http://www.w3.org/1999/xlink",
        "xlink:actuate",
        a
      );
      break;
    case "xlinkArcrole":
      lt(
        l,
        "http://www.w3.org/1999/xlink",
        "xlink:arcrole",
        a
      );
      break;
    case "xlinkRole":
      lt(
        l,
        "http://www.w3.org/1999/xlink",
        "xlink:role",
        a
      );
      break;
    case "xlinkShow":
      lt(
        l,
        "http://www.w3.org/1999/xlink",
        "xlink:show",
        a
      );
      break;
    case "xlinkTitle":
      lt(
        l,
        "http://www.w3.org/1999/xlink",
        "xlink:title",
        a
      );
      break;
    case "xlinkType":
      lt(
        l,
        "http://www.w3.org/1999/xlink",
        "xlink:type",
        a
      );
      break;
    case "xmlBase":
      lt(
        l,
        "http://www.w3.org/XML/1998/namespace",
        "xml:base",
        a
      );
      break;
    case "xmlLang":
      lt(
        l,
        "http://www.w3.org/XML/1998/namespace",
        "xml:lang",
        a
      );
      break;
    case "xmlSpace":
      lt(
        l,
        "http://www.w3.org/XML/1998/namespace",
        "xml:space",
        a
      );
      break;
    case "is":
      Ae(l, "is", a);
      break;
    case "innerText":
    case "textContent":
      break;
    default:
      (!(2 < u.length) || u[0] !== "o" && u[0] !== "O" || u[1] !== "n" && u[1] !== "N") && (u = Dd.get(u) || u, Ae(l, u, a));
  }
}
function tc(l, t, u, a, e, n) {
  switch (u) {
    case "style":
      bs(l, a, n);
      break;
    case "dangerouslySetInnerHTML":
      if (a != null) {
        if (typeof a != "object" || !("__html" in a))
          throw Error(b(61));
        if (u = a.__html, u != null) {
          if (e.children != null) throw Error(b(60));
          l.innerHTML = u;
        }
      }
      break;
    case "children":
      typeof a == "string" ? Xu(l, a) : (typeof a == "number" || typeof a == "bigint") && Xu(l, "" + a);
      break;
    case "onScroll":
      a != null && H("scroll", l);
      break;
    case "onScrollEnd":
      a != null && H("scrollend", l);
      break;
    case "onClick":
      a != null && (l.onclick = Un);
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
      if (!ys.hasOwnProperty(u))
        l: {
          if (u[0] === "o" && u[1] === "n" && (e = u.endsWith("Capture"), t = u.slice(2, e ? u.length - 7 : void 0), n = l[Al] || null, n = n != null ? n[u] : null, typeof n == "function" && l.removeEventListener(t, n, e), typeof a == "function")) {
            typeof n != "function" && n !== null && (u in l ? l[u] = null : l.hasAttribute(u) && l.removeAttribute(u)), l.addEventListener(t, a, e);
            break l;
          }
          u in l ? l[u] = a : a === !0 ? l.setAttribute(u, "") : Ae(l, u, a);
        }
  }
}
function hl(l, t, u) {
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
      H("error", l), H("load", l);
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
                throw Error(b(137, t));
              default:
                Z(l, t, n, f, u, null);
            }
        }
      e && Z(l, t, "srcSet", u.srcSet, u, null), a && Z(l, t, "src", u.src, u, null);
      return;
    case "input":
      H("invalid", l);
      var c = n = f = e = null, i = null, d = null;
      for (a in u)
        if (u.hasOwnProperty(a)) {
          var g = u[a];
          if (g != null)
            switch (a) {
              case "name":
                e = g;
                break;
              case "type":
                f = g;
                break;
              case "checked":
                i = g;
                break;
              case "defaultChecked":
                d = g;
                break;
              case "value":
                n = g;
                break;
              case "defaultValue":
                c = g;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (g != null)
                  throw Error(b(137, t));
                break;
              default:
                Z(l, t, a, g, u, null);
            }
        }
      ms(
        l,
        n,
        c,
        i,
        d,
        f,
        e,
        !1
      ), Qe(l);
      return;
    case "select":
      H("invalid", l), a = f = n = null;
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
      t = n, u = f, l.multiple = !!a, t != null ? Ru(l, !!a, t, !1) : u != null && Ru(l, !!a, u, !0);
      return;
    case "textarea":
      H("invalid", l), n = e = a = null;
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
              if (c != null) throw Error(b(91));
              break;
            default:
              Z(l, t, f, c, u, null);
          }
      Ss(l, a, e, n), Qe(l);
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
      H("beforetoggle", l), H("toggle", l), H("cancel", l), H("close", l);
      break;
    case "iframe":
    case "object":
      H("load", l);
      break;
    case "video":
    case "audio":
      for (a = 0; a < xa.length; a++)
        H(xa[a], l);
      break;
    case "image":
      H("error", l), H("load", l);
      break;
    case "details":
      H("toggle", l);
      break;
    case "embed":
    case "source":
    case "link":
      H("error", l), H("load", l);
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
      for (d in u)
        if (u.hasOwnProperty(d) && (a = u[d], a != null))
          switch (d) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error(b(137, t));
            default:
              Z(l, t, d, a, u, null);
          }
      return;
    default:
      if (Ac(t)) {
        for (g in u)
          u.hasOwnProperty(g) && (a = u[g], a !== void 0 && tc(
            l,
            t,
            g,
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
function Iy(l, t, u, a) {
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
      var e = null, n = null, f = null, c = null, i = null, d = null, g = null;
      for (o in u) {
        var m = u[o];
        if (u.hasOwnProperty(o) && m != null)
          switch (o) {
            case "checked":
              break;
            case "value":
              break;
            case "defaultValue":
              i = m;
            default:
              a.hasOwnProperty(o) || Z(l, t, o, null, a, m);
          }
      }
      for (var y in a) {
        var o = a[y];
        if (m = u[y], a.hasOwnProperty(y) && (o != null || m != null))
          switch (y) {
            case "type":
              n = o;
              break;
            case "name":
              e = o;
              break;
            case "checked":
              d = o;
              break;
            case "defaultChecked":
              g = o;
              break;
            case "value":
              f = o;
              break;
            case "defaultValue":
              c = o;
              break;
            case "children":
            case "dangerouslySetInnerHTML":
              if (o != null)
                throw Error(b(137, t));
              break;
            default:
              o !== m && Z(
                l,
                t,
                y,
                o,
                a,
                m
              );
          }
      }
      _f(
        l,
        f,
        c,
        i,
        d,
        g,
        n,
        e
      );
      return;
    case "select":
      o = f = c = y = null;
      for (n in u)
        if (i = u[n], u.hasOwnProperty(n) && i != null)
          switch (n) {
            case "value":
              break;
            case "multiple":
              o = i;
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
              y = n;
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
      t = c, u = f, a = o, y != null ? Ru(l, !!u, y, !1) : !!a != !!u && (t != null ? Ru(l, !!u, t, !0) : Ru(l, !!u, u ? [] : "", !1));
      return;
    case "textarea":
      o = y = null;
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
              y = e;
              break;
            case "defaultValue":
              o = e;
              break;
            case "children":
              break;
            case "dangerouslySetInnerHTML":
              if (e != null) throw Error(b(91));
              break;
            default:
              e !== n && Z(l, t, f, e, a, n);
          }
      gs(l, y, o);
      return;
    case "option":
      for (var z in u)
        if (y = u[z], u.hasOwnProperty(z) && y != null && !a.hasOwnProperty(z))
          switch (z) {
            case "selected":
              l.selected = !1;
              break;
            default:
              Z(
                l,
                t,
                z,
                null,
                a,
                y
              );
          }
      for (i in a)
        if (y = a[i], o = u[i], a.hasOwnProperty(i) && y !== o && (y != null || o != null))
          switch (i) {
            case "selected":
              l.selected = y && typeof y != "function" && typeof y != "symbol";
              break;
            default:
              Z(
                l,
                t,
                i,
                y,
                a,
                o
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
      for (var A in u)
        y = u[A], u.hasOwnProperty(A) && y != null && !a.hasOwnProperty(A) && Z(l, t, A, null, a, y);
      for (d in a)
        if (y = a[d], o = u[d], a.hasOwnProperty(d) && y !== o && (y != null || o != null))
          switch (d) {
            case "children":
            case "dangerouslySetInnerHTML":
              if (y != null)
                throw Error(b(137, t));
              break;
            default:
              Z(
                l,
                t,
                d,
                y,
                a,
                o
              );
          }
      return;
    default:
      if (Ac(t)) {
        for (var x in u)
          y = u[x], u.hasOwnProperty(x) && y !== void 0 && !a.hasOwnProperty(x) && tc(
            l,
            t,
            x,
            void 0,
            a,
            y
          );
        for (g in a)
          y = a[g], o = u[g], !a.hasOwnProperty(g) || y === o || y === void 0 && o === void 0 || tc(
            l,
            t,
            g,
            y,
            a,
            o
          );
        return;
      }
  }
  for (var v in u)
    y = u[v], u.hasOwnProperty(v) && y != null && !a.hasOwnProperty(v) && Z(l, t, v, null, a, y);
  for (m in a)
    y = a[m], o = u[m], !a.hasOwnProperty(m) || y === o || y == null && o == null || Z(l, t, m, y, a, o);
}
var uc = null, ac = null;
function nn(l) {
  return l.nodeType === 9 ? l : l.ownerDocument;
}
function A0(l) {
  switch (l) {
    case "http://www.w3.org/2000/svg":
      return 1;
    case "http://www.w3.org/1998/Math/MathML":
      return 2;
    default:
      return 0;
  }
}
function rv(l, t) {
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
function ec(l, t) {
  return l === "textarea" || l === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var mf = null;
function Py() {
  var l = window.event;
  return l && l.type === "popstate" ? l === mf ? !1 : (mf = l, !0) : (mf = null, !1);
}
var Ev = typeof setTimeout == "function" ? setTimeout : void 0, lh = typeof clearTimeout == "function" ? clearTimeout : void 0, z0 = typeof Promise == "function" ? Promise : void 0, th = typeof queueMicrotask == "function" ? queueMicrotask : typeof z0 < "u" ? function(l) {
  return z0.resolve(null).then(l).catch(uh);
} : Ev;
function uh(l) {
  setTimeout(function() {
    throw l;
  });
}
function Vt(l) {
  return l === "head";
}
function O0(l, t) {
  var u = t, a = 0, e = 0;
  do {
    var n = u.nextSibling;
    if (l.removeChild(u), n && n.nodeType === 8)
      if (u = n.data, u === "/$") {
        if (0 < a && 8 > a) {
          u = a;
          var f = l.ownerDocument;
          if (u & 1 && Da(f.documentElement), u & 2 && Da(f.body), u & 4)
            for (u = f.head, Da(u), f = u.firstChild; f; ) {
              var c = f.nextSibling, i = f.nodeName;
              f[Ja] || i === "SCRIPT" || i === "STYLE" || i === "LINK" && f.rel.toLowerCase() === "stylesheet" || u.removeChild(f), f = c;
            }
        }
        if (e === 0) {
          l.removeChild(n), ja(t);
          return;
        }
        e--;
      } else
        u === "$" || u === "$?" || u === "$!" ? e++ : a = u.charCodeAt(0) - 48;
    else a = 0;
    u = n;
  } while (u);
  ja(t);
}
function nc(l) {
  var t = l.firstChild;
  for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
    var u = t;
    switch (t = t.nextSibling, u.nodeName) {
      case "HTML":
      case "HEAD":
      case "BODY":
        nc(u), Tc(u);
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
function ah(l, t, u, a) {
  for (; l.nodeType === 1; ) {
    var e = u;
    if (l.nodeName.toLowerCase() !== t.toLowerCase()) {
      if (!a && (l.nodeName !== "INPUT" || l.type !== "hidden"))
        break;
    } else if (a) {
      if (!l[Ja])
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
    if (l = Ll(l.nextSibling), l === null) break;
  }
  return null;
}
function eh(l, t, u) {
  if (t === "") return null;
  for (; l.nodeType !== 3; )
    if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !u || (l = Ll(l.nextSibling), l === null)) return null;
  return l;
}
function fc(l) {
  return l.data === "$!" || l.data === "$?" && l.ownerDocument.readyState === "complete";
}
function nh(l, t) {
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
function Ll(l) {
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
var cc = null;
function _0(l) {
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
function Tv(l, t, u) {
  switch (t = nn(u), l) {
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
function Da(l) {
  for (var t = l.attributes; t.length; )
    l.removeAttributeNode(t[0]);
  Tc(l);
}
var Cl = /* @__PURE__ */ new Map(), M0 = /* @__PURE__ */ new Set();
function fn(l) {
  return typeof l.getRootNode == "function" ? l.getRootNode() : l.nodeType === 9 ? l : l.ownerDocument;
}
var gt = G.d;
G.d = {
  f: fh,
  r: ch,
  D: ih,
  C: sh,
  L: vh,
  m: dh,
  X: hh,
  S: yh,
  M: oh
};
function fh() {
  var l = gt.f(), t = _n();
  return l || t;
}
function ch(l) {
  var t = Wu(l);
  t !== null && t.tag === 5 && t.type === "form" ? o1(t) : gt.r(l);
}
var Iu = typeof document > "u" ? null : document;
function Av(l, t, u) {
  var a = Iu;
  if (a && typeof t == "string" && t) {
    var e = Xl(t);
    e = 'link[rel="' + l + '"][href="' + e + '"]', typeof u == "string" && (e += '[crossorigin="' + u + '"]'), M0.has(e) || (M0.add(e), l = { rel: l, crossOrigin: u, href: t }, a.querySelector(e) === null && (t = a.createElement("link"), hl(t, "link", l), il(t), a.head.appendChild(t)));
  }
}
function ih(l) {
  gt.D(l), Av("dns-prefetch", l, null);
}
function sh(l, t) {
  gt.C(l, t), Av("preconnect", l, t);
}
function vh(l, t, u) {
  gt.L(l, t, u);
  var a = Iu;
  if (a && l && t) {
    var e = 'link[rel="preload"][as="' + Xl(t) + '"]';
    t === "image" && u && u.imageSrcSet ? (e += '[imagesrcset="' + Xl(
      u.imageSrcSet
    ) + '"]', typeof u.imageSizes == "string" && (e += '[imagesizes="' + Xl(
      u.imageSizes
    ) + '"]')) : e += '[href="' + Xl(l) + '"]';
    var n = e;
    switch (t) {
      case "style":
        n = Ju(l);
        break;
      case "script":
        n = Pu(l);
    }
    Cl.has(n) || (l = L(
      {
        rel: "preload",
        href: t === "image" && u && u.imageSrcSet ? void 0 : l,
        as: t
      },
      u
    ), Cl.set(n, l), a.querySelector(e) !== null || t === "style" && a.querySelector(ue(n)) || t === "script" && a.querySelector(ae(n)) || (t = a.createElement("link"), hl(t, "link", l), il(t), a.head.appendChild(t)));
  }
}
function dh(l, t) {
  gt.m(l, t);
  var u = Iu;
  if (u && l) {
    var a = t && typeof t.as == "string" ? t.as : "script", e = 'link[rel="modulepreload"][as="' + Xl(a) + '"][href="' + Xl(l) + '"]', n = e;
    switch (a) {
      case "audioworklet":
      case "paintworklet":
      case "serviceworker":
      case "sharedworker":
      case "worker":
      case "script":
        n = Pu(l);
    }
    if (!Cl.has(n) && (l = L({ rel: "modulepreload", href: l }, t), Cl.set(n, l), u.querySelector(e) === null)) {
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          if (u.querySelector(ae(n)))
            return;
      }
      a = u.createElement("link"), hl(a, "link", l), il(a), u.head.appendChild(a);
    }
  }
}
function yh(l, t, u) {
  gt.S(l, t, u);
  var a = Iu;
  if (a && l) {
    var e = Uu(a).hoistableStyles, n = Ju(l);
    t = t || "default";
    var f = e.get(n);
    if (!f) {
      var c = { loading: 0, preload: null };
      if (f = a.querySelector(
        ue(n)
      ))
        c.loading = 5;
      else {
        l = L(
          { rel: "stylesheet", href: l, "data-precedence": t },
          u
        ), (u = Cl.get(n)) && ei(l, u);
        var i = f = a.createElement("link");
        il(i), hl(i, "link", l), i._p = new Promise(function(d, g) {
          i.onload = d, i.onerror = g;
        }), i.addEventListener("load", function() {
          c.loading |= 1;
        }), i.addEventListener("error", function() {
          c.loading |= 2;
        }), c.loading |= 4, pe(f, t, a);
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
function hh(l, t) {
  gt.X(l, t);
  var u = Iu;
  if (u && l) {
    var a = Uu(u).hoistableScripts, e = Pu(l), n = a.get(e);
    n || (n = u.querySelector(ae(e)), n || (l = L({ src: l, async: !0 }, t), (t = Cl.get(e)) && ni(l, t), n = u.createElement("script"), il(n), hl(n, "link", l), u.head.appendChild(n)), n = {
      type: "script",
      instance: n,
      count: 1,
      state: null
    }, a.set(e, n));
  }
}
function oh(l, t) {
  gt.M(l, t);
  var u = Iu;
  if (u && l) {
    var a = Uu(u).hoistableScripts, e = Pu(l), n = a.get(e);
    n || (n = u.querySelector(ae(e)), n || (l = L({ src: l, async: !0, type: "module" }, t), (t = Cl.get(e)) && ni(l, t), n = u.createElement("script"), il(n), hl(n, "link", l), u.head.appendChild(n)), n = {
      type: "script",
      instance: n,
      count: 1,
      state: null
    }, a.set(e, n));
  }
}
function D0(l, t, u, a) {
  var e = (e = Ht.current) ? fn(e) : null;
  if (!e) throw Error(b(446));
  switch (l) {
    case "meta":
    case "title":
      return null;
    case "style":
      return typeof u.precedence == "string" && typeof u.href == "string" ? (t = Ju(u.href), u = Uu(
        e
      ).hoistableStyles, a = u.get(t), a || (a = {
        type: "style",
        instance: null,
        count: 0,
        state: null
      }, u.set(t, a)), a) : { type: "void", instance: null, count: 0, state: null };
    case "link":
      if (u.rel === "stylesheet" && typeof u.href == "string" && typeof u.precedence == "string") {
        l = Ju(u.href);
        var n = Uu(
          e
        ).hoistableStyles, f = n.get(l);
        if (f || (e = e.ownerDocument || e, f = {
          type: "stylesheet",
          instance: null,
          count: 0,
          state: { loading: 0, preload: null }
        }, n.set(l, f), (n = e.querySelector(
          ue(l)
        )) && !n._p && (f.instance = n, f.state.loading = 5), Cl.has(l) || (u = {
          rel: "preload",
          as: "style",
          href: u.href,
          crossOrigin: u.crossOrigin,
          integrity: u.integrity,
          media: u.media,
          hrefLang: u.hrefLang,
          referrerPolicy: u.referrerPolicy
        }, Cl.set(l, u), n || mh(
          e,
          l,
          u,
          f.state
        ))), t && a === null)
          throw Error(b(528, ""));
        return f;
      }
      if (t && a !== null)
        throw Error(b(529, ""));
      return null;
    case "script":
      return t = u.async, u = u.src, typeof u == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Pu(u), u = Uu(
        e
      ).hoistableScripts, a = u.get(t), a || (a = {
        type: "script",
        instance: null,
        count: 0,
        state: null
      }, u.set(t, a)), a) : { type: "void", instance: null, count: 0, state: null };
    default:
      throw Error(b(444, l));
  }
}
function Ju(l) {
  return 'href="' + Xl(l) + '"';
}
function ue(l) {
  return 'link[rel="stylesheet"][' + l + "]";
}
function zv(l) {
  return L({}, l, {
    "data-precedence": l.precedence,
    precedence: null
  });
}
function mh(l, t, u, a) {
  l.querySelector('link[rel="preload"][as="style"][' + t + "]") ? a.loading = 1 : (t = l.createElement("link"), a.preload = t, t.addEventListener("load", function() {
    return a.loading |= 1;
  }), t.addEventListener("error", function() {
    return a.loading |= 2;
  }), hl(t, "link", u), il(t), l.head.appendChild(t));
}
function Pu(l) {
  return '[src="' + Xl(l) + '"]';
}
function ae(l) {
  return "script[async]" + l;
}
function U0(l, t, u) {
  if (t.count++, t.instance === null)
    switch (t.type) {
      case "style":
        var a = l.querySelector(
          'style[data-href~="' + Xl(u.href) + '"]'
        );
        if (a)
          return t.instance = a, il(a), a;
        var e = L({}, u, {
          "data-href": u.href,
          "data-precedence": u.precedence,
          href: null,
          precedence: null
        });
        return a = (l.ownerDocument || l).createElement(
          "style"
        ), il(a), hl(a, "style", e), pe(a, u.precedence, l), t.instance = a;
      case "stylesheet":
        e = Ju(u.href);
        var n = l.querySelector(
          ue(e)
        );
        if (n)
          return t.state.loading |= 4, t.instance = n, il(n), n;
        a = zv(u), (e = Cl.get(e)) && ei(a, e), n = (l.ownerDocument || l).createElement("link"), il(n);
        var f = n;
        return f._p = new Promise(function(c, i) {
          f.onload = c, f.onerror = i;
        }), hl(n, "link", a), t.state.loading |= 4, pe(n, u.precedence, l), t.instance = n;
      case "script":
        return n = Pu(u.src), (e = l.querySelector(
          ae(n)
        )) ? (t.instance = e, il(e), e) : (a = u, (e = Cl.get(n)) && (a = L({}, u), ni(a, e)), l = l.ownerDocument || l, e = l.createElement("script"), il(e), hl(e, "link", a), l.head.appendChild(e), t.instance = e);
      case "void":
        return null;
      default:
        throw Error(b(443, t.type));
    }
  else
    t.type === "stylesheet" && !(t.state.loading & 4) && (a = t.instance, t.state.loading |= 4, pe(a, u.precedence, l));
  return t.instance;
}
function pe(l, t, u) {
  for (var a = u.querySelectorAll(
    'link[rel="stylesheet"][data-precedence],style[data-precedence]'
  ), e = a.length ? a[a.length - 1] : null, n = e, f = 0; f < a.length; f++) {
    var c = a[f];
    if (c.dataset.precedence === t) n = c;
    else if (n !== e) break;
  }
  n ? n.parentNode.insertBefore(l, n.nextSibling) : (t = u.nodeType === 9 ? u.head : u, t.insertBefore(l, t.firstChild));
}
function ei(l, t) {
  l.crossOrigin == null && (l.crossOrigin = t.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy), l.title == null && (l.title = t.title);
}
function ni(l, t) {
  l.crossOrigin == null && (l.crossOrigin = t.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy), l.integrity == null && (l.integrity = t.integrity);
}
var Ye = null;
function R0(l, t, u) {
  if (Ye === null) {
    var a = /* @__PURE__ */ new Map(), e = Ye = /* @__PURE__ */ new Map();
    e.set(u, a);
  } else
    e = Ye, a = e.get(u), a || (a = /* @__PURE__ */ new Map(), e.set(u, a));
  if (a.has(l)) return a;
  for (a.set(l, null), u = u.getElementsByTagName(l), e = 0; e < u.length; e++) {
    var n = u[e];
    if (!(n[Ja] || n[ol] || l === "link" && n.getAttribute("rel") === "stylesheet") && n.namespaceURI !== "http://www.w3.org/2000/svg") {
      var f = n.getAttribute(t) || "";
      f = l + f;
      var c = a.get(f);
      c ? c.push(n) : a.set(f, [n]);
    }
  }
  return a;
}
function N0(l, t, u) {
  l = l.ownerDocument || l, l.head.insertBefore(
    u,
    t === "title" ? l.querySelector("head > title") : null
  );
}
function gh(l, t, u) {
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
function Ov(l) {
  return !(l.type === "stylesheet" && !(l.state.loading & 3));
}
var Ga = null;
function Sh() {
}
function bh(l, t, u) {
  if (Ga === null) throw Error(b(475));
  var a = Ga;
  if (t.type === "stylesheet" && (typeof u.media != "string" || matchMedia(u.media).matches !== !1) && !(t.state.loading & 4)) {
    if (t.instance === null) {
      var e = Ju(u.href), n = l.querySelector(
        ue(e)
      );
      if (n) {
        l = n._p, l !== null && typeof l == "object" && typeof l.then == "function" && (a.count++, a = cn.bind(a), l.then(a, a)), t.state.loading |= 4, t.instance = n, il(n);
        return;
      }
      n = l.ownerDocument || l, u = zv(u), (e = Cl.get(e)) && ei(u, e), n = n.createElement("link"), il(n);
      var f = n;
      f._p = new Promise(function(c, i) {
        f.onload = c, f.onerror = i;
      }), hl(n, "link", u), t.instance = n;
    }
    a.stylesheets === null && (a.stylesheets = /* @__PURE__ */ new Map()), a.stylesheets.set(t, l), (l = t.state.preload) && !(t.state.loading & 3) && (a.count++, t = cn.bind(a), l.addEventListener("load", t), l.addEventListener("error", t));
  }
}
function rh() {
  if (Ga === null) throw Error(b(475));
  var l = Ga;
  return l.stylesheets && l.count === 0 && ic(l, l.stylesheets), 0 < l.count ? function(t) {
    var u = setTimeout(function() {
      if (l.stylesheets && ic(l, l.stylesheets), l.unsuspend) {
        var a = l.unsuspend;
        l.unsuspend = null, a();
      }
    }, 6e4);
    return l.unsuspend = t, function() {
      l.unsuspend = null, clearTimeout(u);
    };
  } : null;
}
function cn() {
  if (this.count--, this.count === 0) {
    if (this.stylesheets) ic(this, this.stylesheets);
    else if (this.unsuspend) {
      var l = this.unsuspend;
      this.unsuspend = null, l();
    }
  }
}
var sn = null;
function ic(l, t) {
  l.stylesheets = null, l.unsuspend !== null && (l.count++, sn = /* @__PURE__ */ new Map(), t.forEach(Eh, l), sn = null, cn.call(l));
}
function Eh(l, t) {
  if (!(t.state.loading & 4)) {
    var u = sn.get(l);
    if (u) var a = u.get(null);
    else {
      u = /* @__PURE__ */ new Map(), sn.set(l, u);
      for (var e = l.querySelectorAll(
        "link[data-precedence],style[data-precedence]"
      ), n = 0; n < e.length; n++) {
        var f = e[n];
        (f.nodeName === "LINK" || f.getAttribute("media") !== "not all") && (u.set(f.dataset.precedence, f), a = f);
      }
      a && u.set(null, a);
    }
    e = t.instance, f = e.getAttribute("data-precedence"), n = u.get(f) || a, n === a && u.set(null, e), u.set(f, e), this.count++, a = cn.bind(this), e.addEventListener("load", a), e.addEventListener("error", a), n ? n.parentNode.insertBefore(e, n.nextSibling) : (l = l.nodeType === 9 ? l.head : l, l.insertBefore(e, l.firstChild)), t.state.loading |= 4;
  }
}
var Xa = {
  $$typeof: nt,
  Provider: null,
  Consumer: null,
  _currentValue: Wt,
  _currentValue2: Wt,
  _threadCount: 0
};
function Th(l, t, u, a, e, n, f, c) {
  this.tag = 1, this.containerInfo = l, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Bn(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Bn(0), this.hiddenUpdates = Bn(null), this.identifierPrefix = a, this.onUncaughtError = e, this.onCaughtError = n, this.onRecoverableError = f, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.incompleteTransitions = /* @__PURE__ */ new Map();
}
function _v(l, t, u, a, e, n, f, c, i, d, g, m) {
  return l = new Th(
    l,
    t,
    u,
    f,
    c,
    i,
    d,
    m
  ), t = 1, n === !0 && (t |= 24), n = Dl(3, null, null, t), l.current = n, n.stateNode = l, t = Yc(), t.refCount++, l.pooledCache = t, t.refCount++, n.memoizedState = {
    element: a,
    isDehydrated: u,
    cache: t
  }, xc(n), l;
}
function Mv(l) {
  return l ? (l = Ou, l) : Ou;
}
function Dv(l, t, u, a, e, n) {
  e = Mv(e), a.context === null ? a.context = e : a.pendingContext = e, a = pt(t), a.payload = { element: u }, n = n === void 0 ? null : n, n !== null && (a.callback = n), u = Yt(l, a, t), u !== null && (Hl(u, l, t), ra(u, l, t));
}
function H0(l, t) {
  if (l = l.memoizedState, l !== null && l.dehydrated !== null) {
    var u = l.retryLane;
    l.retryLane = u !== 0 && u < t ? u : t;
  }
}
function fi(l, t) {
  H0(l, t), (l = l.alternate) && H0(l, t);
}
function Uv(l) {
  if (l.tag === 13) {
    var t = ku(l, 67108864);
    t !== null && Hl(t, l, 67108864), fi(l, 67108864);
  }
}
var vn = !0;
function Ah(l, t, u, a) {
  var e = _.T;
  _.T = null;
  var n = G.p;
  try {
    G.p = 2, ci(l, t, u, a);
  } finally {
    G.p = n, _.T = e;
  }
}
function zh(l, t, u, a) {
  var e = _.T;
  _.T = null;
  var n = G.p;
  try {
    G.p = 8, ci(l, t, u, a);
  } finally {
    G.p = n, _.T = e;
  }
}
function ci(l, t, u, a) {
  if (vn) {
    var e = sc(a);
    if (e === null)
      of(
        l,
        t,
        a,
        dn,
        u
      ), p0(l, a);
    else if (_h(
      e,
      l,
      t,
      u,
      a
    ))
      a.stopPropagation();
    else if (p0(l, a), t & 4 && -1 < Oh.indexOf(l)) {
      for (; e !== null; ) {
        var n = Wu(e);
        if (n !== null)
          switch (n.tag) {
            case 3:
              if (n = n.stateNode, n.current.memoizedState.isDehydrated) {
                var f = Jt(n.pendingLanes);
                if (f !== 0) {
                  var c = n;
                  for (c.pendingLanes |= 2, c.entangledLanes |= 2; f; ) {
                    var i = 1 << 31 - Rl(f);
                    c.entanglements[1] |= i, f &= ~i;
                  }
                  Pl(n), !(Q & 6) && (ln = kl() + 500, te(0));
                }
              }
              break;
            case 13:
              c = ku(n, 2), c !== null && Hl(c, n, 2), _n(), fi(n, 2);
          }
        if (n = sc(a), n === null && of(
          l,
          t,
          a,
          dn,
          u
        ), n === e) break;
        e = n;
      }
      e !== null && a.stopPropagation();
    } else
      of(
        l,
        t,
        a,
        null,
        u
      );
  }
}
function sc(l) {
  return l = zc(l), ii(l);
}
var dn = null;
function ii(l) {
  if (dn = null, l = bu(l), l !== null) {
    var t = Ca(l);
    if (t === null) l = null;
    else {
      var u = t.tag;
      if (u === 13) {
        if (l = P0(t), l !== null) return l;
        l = null;
      } else if (u === 3) {
        if (t.stateNode.current.memoizedState.isDehydrated)
          return t.tag === 3 ? t.stateNode.containerInfo : null;
        l = null;
      } else t !== l && (l = null);
    }
  }
  return dn = l, null;
}
function Rv(l) {
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
      switch (sd()) {
        case as:
          return 2;
        case es:
          return 8;
        case Xe:
        case vd:
          return 32;
        case ns:
          return 268435456;
        default:
          return 32;
      }
    default:
      return 32;
  }
}
var vc = !1, Bt = null, Gt = null, Xt = null, Qa = /* @__PURE__ */ new Map(), Za = /* @__PURE__ */ new Map(), Mt = [], Oh = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
  " "
);
function p0(l, t) {
  switch (l) {
    case "focusin":
    case "focusout":
      Bt = null;
      break;
    case "dragenter":
    case "dragleave":
      Gt = null;
      break;
    case "mouseover":
    case "mouseout":
      Xt = null;
      break;
    case "pointerover":
    case "pointerout":
      Qa.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Za.delete(t.pointerId);
  }
}
function ca(l, t, u, a, e, n) {
  return l === null || l.nativeEvent !== n ? (l = {
    blockedOn: t,
    domEventName: u,
    eventSystemFlags: a,
    nativeEvent: n,
    targetContainers: [e]
  }, t !== null && (t = Wu(t), t !== null && Uv(t)), l) : (l.eventSystemFlags |= a, t = l.targetContainers, e !== null && t.indexOf(e) === -1 && t.push(e), l);
}
function _h(l, t, u, a, e) {
  switch (t) {
    case "focusin":
      return Bt = ca(
        Bt,
        l,
        t,
        u,
        a,
        e
      ), !0;
    case "dragenter":
      return Gt = ca(
        Gt,
        l,
        t,
        u,
        a,
        e
      ), !0;
    case "mouseover":
      return Xt = ca(
        Xt,
        l,
        t,
        u,
        a,
        e
      ), !0;
    case "pointerover":
      var n = e.pointerId;
      return Qa.set(
        n,
        ca(
          Qa.get(n) || null,
          l,
          t,
          u,
          a,
          e
        )
      ), !0;
    case "gotpointercapture":
      return n = e.pointerId, Za.set(
        n,
        ca(
          Za.get(n) || null,
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
function Nv(l) {
  var t = bu(l.target);
  if (t !== null) {
    var u = Ca(t);
    if (u !== null) {
      if (t = u.tag, t === 13) {
        if (t = P0(u), t !== null) {
          l.blockedOn = t, bd(l.priority, function() {
            if (u.tag === 13) {
              var a = Nl();
              a = rc(a);
              var e = ku(u, a);
              e !== null && Hl(e, u, a), fi(u, a);
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
function qe(l) {
  if (l.blockedOn !== null) return !1;
  for (var t = l.targetContainers; 0 < t.length; ) {
    var u = sc(l.nativeEvent);
    if (u === null) {
      u = l.nativeEvent;
      var a = new u.constructor(
        u.type,
        u
      );
      Df = a, u.target.dispatchEvent(a), Df = null;
    } else
      return t = Wu(u), t !== null && Uv(t), l.blockedOn = u, !1;
    t.shift();
  }
  return !0;
}
function Y0(l, t, u) {
  qe(l) && u.delete(t);
}
function Mh() {
  vc = !1, Bt !== null && qe(Bt) && (Bt = null), Gt !== null && qe(Gt) && (Gt = null), Xt !== null && qe(Xt) && (Xt = null), Qa.forEach(Y0), Za.forEach(Y0);
}
function re(l, t) {
  l.blockedOn === t && (l.blockedOn = null, vc || (vc = !0, nl.unstable_scheduleCallback(
    nl.unstable_NormalPriority,
    Mh
  )));
}
var Ee = null;
function q0(l) {
  Ee !== l && (Ee = l, nl.unstable_scheduleCallback(
    nl.unstable_NormalPriority,
    function() {
      Ee === l && (Ee = null);
      for (var t = 0; t < l.length; t += 3) {
        var u = l[t], a = l[t + 1], e = l[t + 2];
        if (typeof a != "function") {
          if (ii(a || u) === null)
            continue;
          break;
        }
        var n = Wu(u);
        n !== null && (l.splice(t, 3), t -= 3, Vf(
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
function ja(l) {
  function t(i) {
    return re(i, l);
  }
  Bt !== null && re(Bt, l), Gt !== null && re(Gt, l), Xt !== null && re(Xt, l), Qa.forEach(t), Za.forEach(t);
  for (var u = 0; u < Mt.length; u++) {
    var a = Mt[u];
    a.blockedOn === l && (a.blockedOn = null);
  }
  for (; 0 < Mt.length && (u = Mt[0], u.blockedOn === null); )
    Nv(u), u.blockedOn === null && Mt.shift();
  if (u = (l.ownerDocument || l).$$reactFormReplay, u != null)
    for (a = 0; a < u.length; a += 3) {
      var e = u[a], n = u[a + 1], f = e[Al] || null;
      if (typeof n == "function")
        f || q0(u);
      else if (f) {
        var c = null;
        if (n && n.hasAttribute("formAction")) {
          if (e = n, f = n[Al] || null)
            c = f.formAction;
          else if (ii(e) !== null) continue;
        } else c = f.action;
        typeof c == "function" ? u[a + 1] = c : (u.splice(a, 3), a -= 3), q0(u);
      }
    }
}
function si(l) {
  this._internalRoot = l;
}
Rn.prototype.render = si.prototype.render = function(l) {
  var t = this._internalRoot;
  if (t === null) throw Error(b(409));
  var u = t.current, a = Nl();
  Dv(u, a, l, t, null, null);
};
Rn.prototype.unmount = si.prototype.unmount = function() {
  var l = this._internalRoot;
  if (l !== null) {
    this._internalRoot = null;
    var t = l.containerInfo;
    Dv(l.current, 2, null, l, null, null), _n(), t[$u] = null;
  }
};
function Rn(l) {
  this._internalRoot = l;
}
Rn.prototype.unstable_scheduleHydration = function(l) {
  if (l) {
    var t = vs();
    l = { blockedOn: null, target: l, priority: t };
    for (var u = 0; u < Mt.length && t !== 0 && t < Mt[u].priority; u++) ;
    Mt.splice(u, 0, l), u === 0 && Nv(l);
  }
};
var x0 = F0.version;
if (x0 !== "19.1.1")
  throw Error(
    b(
      527,
      x0,
      "19.1.1"
    )
  );
G.findDOMNode = function(l) {
  var t = l._reactInternals;
  if (t === void 0)
    throw typeof l.render == "function" ? Error(b(188)) : (l = Object.keys(l).join(","), Error(b(268, l)));
  return l = ud(t), l = l !== null ? ls(l) : null, l = l === null ? null : l.stateNode, l;
};
var Dh = {
  bundleType: 0,
  version: "19.1.1",
  rendererPackageName: "react-dom",
  currentDispatcherRef: _,
  reconcilerVersion: "19.1.1"
};
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Te = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Te.isDisabled && Te.supportsFiber)
    try {
      Va = Te.inject(
        Dh
      ), Ul = Te;
    } catch {
    }
}
hn.createRoot = function(l, t) {
  if (!I0(l)) throw Error(b(299));
  var u = !1, a = "", e = _1, n = M1, f = D1, c = null;
  return t != null && (t.unstable_strictMode === !0 && (u = !0), t.identifierPrefix !== void 0 && (a = t.identifierPrefix), t.onUncaughtError !== void 0 && (e = t.onUncaughtError), t.onCaughtError !== void 0 && (n = t.onCaughtError), t.onRecoverableError !== void 0 && (f = t.onRecoverableError), t.unstable_transitionCallbacks !== void 0 && (c = t.unstable_transitionCallbacks)), t = _v(
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
  ), l[$u] = t.current, ai(l), new si(t);
};
hn.hydrateRoot = function(l, t, u) {
  if (!I0(l)) throw Error(b(299));
  var a = !1, e = "", n = _1, f = M1, c = D1, i = null, d = null;
  return u != null && (u.unstable_strictMode === !0 && (a = !0), u.identifierPrefix !== void 0 && (e = u.identifierPrefix), u.onUncaughtError !== void 0 && (n = u.onUncaughtError), u.onCaughtError !== void 0 && (f = u.onCaughtError), u.onRecoverableError !== void 0 && (c = u.onRecoverableError), u.unstable_transitionCallbacks !== void 0 && (i = u.unstable_transitionCallbacks), u.formState !== void 0 && (d = u.formState)), t = _v(
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
    d
  ), t.context = Mv(null), u = t.current, a = Nl(), a = rc(a), e = pt(a), e.callback = null, Yt(u, e, a), u = a, t.current.lanes = u, Ka(t, u), Pl(t), l[$u] = t.current, ai(l), new Rn(t);
};
hn.version = "19.1.1";
function Hv() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Hv);
    } catch (l) {
      console.error(l);
    }
}
Hv(), K0.exports = hn;
var Uh = K0.exports;
const Rh = "widget-ready", Nh = "widget-error";
function Hh(l) {
  l.dispatchEvent(new CustomEvent(Rh, { bubbles: !0 }));
}
function ph(l, t) {
  const u = { reason: t };
  l.dispatchEvent(new CustomEvent(Nh, { bubbles: !0, detail: u }));
}
function Yh() {
  const [l, t] = ya.useState(() => {
    try {
      const f = localStorage.getItem("mb-notes");
      return f ? JSON.parse(f) : [];
    } catch {
      return [];
    }
  }), [u, a] = ya.useState("");
  ya.useEffect(() => {
    try {
      localStorage.setItem("mb-notes", JSON.stringify(l));
    } catch {
    }
  }, [l]);
  const e = () => {
    const f = u.trim();
    f && (t((c) => [{ id: String(Date.now()), text: f }, ...c]), a(""));
  }, n = (f) => t((c) => c.filter((i) => i.id !== f));
  return /* @__PURE__ */ at.jsxs("div", { style: { fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif", height: "100%", display: "flex", flexDirection: "column", boxSizing: "border-box" }, children: [
    /* @__PURE__ */ at.jsxs("div", { className: "note-input-row", children: [
      /* @__PURE__ */ at.jsx(
        "input",
        {
          className: "note-input",
          value: u,
          onChange: (f) => a(f.target.value),
          onKeyDown: (f) => {
            f.key === "Enter" && e();
          },
          placeholder: "Quick note"
        }
      ),
      /* @__PURE__ */ at.jsx("button", { className: "note-btn", onClick: e, children: "Add" })
    ] }),
    /* @__PURE__ */ at.jsx("ul", { className: "note-list", children: l.map((f) => /* @__PURE__ */ at.jsxs("li", { className: "note-item", children: [
      /* @__PURE__ */ at.jsx("span", { style: { whiteSpace: "pre-wrap" }, children: f.text }),
      /* @__PURE__ */ at.jsx("button", { className: "btn-ghost", onClick: () => n(f.id), children: "Delete" })
    ] }, f.id)) })
  ] });
}
class qh extends HTMLElement {
  #l = null;
  connectedCallback() {
    try {
      const t = this.attachShadow({ mode: "open" }), u = document.createElement("div"), a = document.createElement("style");
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
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.5);
        }
        .note-input-row{
          display:flex;
          gap:12px;
          margin-bottom:16px;
          min-height:40px;
          padding-bottom:12px;
          border-bottom:1px solid rgba(245, 158, 11, 0.1);
        }
        .note-input{
          flex:1;
          padding:10px 12px;
          border:1px solid rgba(245, 158, 11, 0.2);
          border-radius:10px;
          background:rgba(255,255,255,0.9);
          font-size:0.875rem;
          transition:all 0.2s ease;
        }
        .note-input:focus{
          outline:none;
          border-color:#f59e0b;
          background:white;
          box-shadow:0 0 0 3px rgba(245,158,11,0.1);
        }
        .note-btn{
          padding:10px 16px;
          border-radius:10px;
          border:1px solid rgba(245,158,11,0.2);
          background:linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color:white;
          font-weight:500;
          font-size:0.875rem;
          cursor:pointer;
          transition:all 0.2s ease;
        }
        .note-btn:hover{
          transform:translateY(-1px);
          box-shadow:0 4px 12px rgba(245,158,11,0.3);
        }
        .note-list{
          list-style:none;
          margin:0;
          padding:0;
          display:grid;
          gap:10px;
          flex:1;
          overflow:auto;
          min-height:0;
          padding-right:4px;
        }
        .note-item{
          display:flex;
          justify-content:space-between;
          align-items:center;
          border:1px solid rgba(245,158,11,0.1);
          border-radius:12px;
          padding:12px 16px;
          transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background:rgba(255,255,255,0.8);
          backdrop-filter:blur(8px);
        }
        .note-item:hover{
          transform:translateY(-2px);
          box-shadow:0 6px 20px rgba(245,158,11,0.15);
          border-color:rgba(245,158,11,0.2);
        }
        .btn-ghost{
          background:transparent;
          border:1px solid rgba(245,158,11,0.2);
          color:#64748b;
          border-radius:8px;
          padding:6px 12px;
          font-size:0.75rem;
          cursor:pointer;
          transition:all 0.2s ease;
        }
        .btn-ghost:hover{
          background:rgba(245,158,11,0.05);
          border-color:rgba(245,158,11,0.3);
          color:#f59e0b;
          transform:translateY(-1px);
        }`, t.appendChild(a);
      const e = document.createElement("div");
      e.className = "note-surface", e.style.height = "100%", u.style.height = "100%", e.appendChild(u), t.appendChild(e), this.#l = Uh.createRoot(u), this.#l.render(/* @__PURE__ */ at.jsx(Yh, {})), queueMicrotask(() => Hh(this));
    } catch (t) {
      ph(this, t instanceof Error ? t.message : "mount-error");
    }
  }
  disconnectedCallback() {
    try {
      this.#l?.unmount(), this.#l = null;
    } catch {
    }
  }
}
customElements.get("mb-notes") || customElements.define("mb-notes", qh);
