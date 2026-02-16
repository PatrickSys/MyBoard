/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const N = globalThis, J = N.ShadowRoot && (N.ShadyCSS === void 0 || N.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, G = Symbol(), Q = /* @__PURE__ */ new WeakMap();
let ct = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== G) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (J && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = Q.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && Q.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const mt = (r) => new ct(typeof r == "string" ? r : r + "", void 0, G), bt = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((s, i, o) => s + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + r[o + 1], r[0]);
  return new ct(e, r, G);
}, gt = (r, t) => {
  if (J) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = N.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, r.appendChild(s);
  }
}, X = J ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return mt(e);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: yt, defineProperty: _t, getOwnPropertyDescriptor: vt, getOwnPropertyNames: At, getOwnPropertySymbols: St, getPrototypeOf: Et } = Object, m = globalThis, tt = m.trustedTypes, Ct = tt ? tt.emptyScript : "", B = m.reactiveElementPolyfillSupport, w = (r, t) => r, D = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? Ct : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, t) {
  let e = r;
  switch (t) {
    case Boolean:
      e = r !== null;
      break;
    case Number:
      e = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(r);
      } catch {
        e = null;
      }
  }
  return e;
} }, Z = (r, t) => !yt(r, t), et = { attribute: !0, type: String, converter: D, reflect: !1, useDefault: !1, hasChanged: Z };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), m.litPropertyMetadata ?? (m.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let A = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = et) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && _t(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: o } = vt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get: i, set(n) {
      const h = i == null ? void 0 : i.call(this);
      o == null || o.call(this, n), this.requestUpdate(t, h, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? et;
  }
  static _$Ei() {
    if (this.hasOwnProperty(w("elementProperties"))) return;
    const t = Et(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(w("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(w("properties"))) {
      const e = this.properties, s = [...At(e), ...St(e)];
      for (const i of s) this.createProperty(i, e[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [s, i] of e) this.elementProperties.set(s, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const i = this._$Eu(e, s);
      i !== void 0 && this._$Eh.set(i, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const i of s) e.unshift(X(i));
    } else t !== void 0 && e.push(X(t));
    return e;
  }
  static _$Eu(t, e) {
    const s = e.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((e = t.hostConnected) == null || e.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$EO) == null || e.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const s of e.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return gt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var s;
      return (s = e.hostConnected) == null ? void 0 : s.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var s;
      return (s = e.hostDisconnected) == null ? void 0 : s.call(e);
    });
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$ET(t, e) {
    var o;
    const s = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, s);
    if (i !== void 0 && s.reflect === !0) {
      const n = (((o = s.converter) == null ? void 0 : o.toAttribute) !== void 0 ? s.converter : D).toAttribute(e, s.type);
      this._$Em = t, n == null ? this.removeAttribute(i) : this.setAttribute(i, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var o, n;
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const h = s.getPropertyOptions(i), a = typeof h.converter == "function" ? { fromAttribute: h.converter } : ((o = h.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? h.converter : D;
      this._$Em = i;
      const c = a.fromAttribute(e, h.type);
      this[i] = c ?? ((n = this._$Ej) == null ? void 0 : n.get(i)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, e, s) {
    var i;
    if (t !== void 0) {
      const o = this.constructor, n = this[t];
      if (s ?? (s = o.getPropertyOptions(t)), !((s.hasChanged ?? Z)(n, e) || s.useDefault && s.reflect && n === ((i = this._$Ej) == null ? void 0 : i.get(t)) && !this.hasAttribute(o._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: i, wrapped: o }, n) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, n ?? e ?? this[t]), o !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var s;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [o, n] of this._$Ep) this[o] = n;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [o, n] of i) {
        const { wrapped: h } = n, a = this[o];
        h !== !0 || this._$AL.has(o) || a === void 0 || this.C(o, void 0, n, a);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (s = this._$EO) == null || s.forEach((i) => {
        var o;
        return (o = i.hostUpdate) == null ? void 0 : o.call(i);
      }), this.update(e)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((s) => {
      var i;
      return (i = s.hostUpdated) == null ? void 0 : i.call(s);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((e) => this._$ET(e, this[e]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
A.elementStyles = [], A.shadowRootOptions = { mode: "open" }, A[w("elementProperties")] = /* @__PURE__ */ new Map(), A[w("finalized")] = /* @__PURE__ */ new Map(), B == null || B({ ReactiveElement: A }), (m.reactiveElementVersions ?? (m.reactiveElementVersions = [])).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x = globalThis, z = x.trustedTypes, st = z ? z.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, dt = "$lit$", $ = `lit$${Math.random().toFixed(9).slice(2)}$`, pt = "?" + $, wt = `<${pt}>`, _ = document, k = () => _.createComment(""), T = (r) => r === null || typeof r != "object" && typeof r != "function", Y = Array.isArray, xt = (r) => Y(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", L = `[ 	
\f\r]`, C = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, it = /-->/g, rt = />/g, b = RegExp(`>|${L}(?:([^\\s"'>=/]+)(${L}*=${L}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ot = /'/g, nt = /"/g, ut = /^(?:script|style|textarea|title)$/i, Pt = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), kt = Pt(1), S = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), at = /* @__PURE__ */ new WeakMap(), g = _.createTreeWalker(_, 129);
function ft(r, t) {
  if (!Y(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return st !== void 0 ? st.createHTML(t) : t;
}
const Tt = (r, t) => {
  const e = r.length - 1, s = [];
  let i, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = C;
  for (let h = 0; h < e; h++) {
    const a = r[h];
    let c, p, l = -1, u = 0;
    for (; u < a.length && (n.lastIndex = u, p = n.exec(a), p !== null); ) u = n.lastIndex, n === C ? p[1] === "!--" ? n = it : p[1] !== void 0 ? n = rt : p[2] !== void 0 ? (ut.test(p[2]) && (i = RegExp("</" + p[2], "g")), n = b) : p[3] !== void 0 && (n = b) : n === b ? p[0] === ">" ? (n = i ?? C, l = -1) : p[1] === void 0 ? l = -2 : (l = n.lastIndex - p[2].length, c = p[1], n = p[3] === void 0 ? b : p[3] === '"' ? nt : ot) : n === nt || n === ot ? n = b : n === it || n === rt ? n = C : (n = b, i = void 0);
    const f = n === b && r[h + 1].startsWith("/>") ? " " : "";
    o += n === C ? a + wt : l >= 0 ? (s.push(c), a.slice(0, l) + dt + a.slice(l) + $ + f) : a + $ + (l === -2 ? h : f);
  }
  return [ft(r, o + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class O {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let o = 0, n = 0;
    const h = t.length - 1, a = this.parts, [c, p] = Tt(t, e);
    if (this.el = O.createElement(c, s), g.currentNode = this.el.content, e === 2 || e === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (i = g.nextNode()) !== null && a.length < h; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const l of i.getAttributeNames()) if (l.endsWith(dt)) {
          const u = p[n++], f = i.getAttribute(l).split($), R = /([.?@])?(.*)/.exec(u);
          a.push({ type: 1, index: o, name: R[2], strings: f, ctor: R[1] === "." ? Ut : R[1] === "?" ? Mt : R[1] === "@" ? Rt : j }), i.removeAttribute(l);
        } else l.startsWith($) && (a.push({ type: 6, index: o }), i.removeAttribute(l));
        if (ut.test(i.tagName)) {
          const l = i.textContent.split($), u = l.length - 1;
          if (u > 0) {
            i.textContent = z ? z.emptyScript : "";
            for (let f = 0; f < u; f++) i.append(l[f], k()), g.nextNode(), a.push({ type: 2, index: ++o });
            i.append(l[u], k());
          }
        }
      } else if (i.nodeType === 8) if (i.data === pt) a.push({ type: 2, index: o });
      else {
        let l = -1;
        for (; (l = i.data.indexOf($, l + 1)) !== -1; ) a.push({ type: 7, index: o }), l += $.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const s = _.createElement("template");
    return s.innerHTML = t, s;
  }
}
function E(r, t, e = r, s) {
  var n, h;
  if (t === S) return t;
  let i = s !== void 0 ? (n = e._$Co) == null ? void 0 : n[s] : e._$Cl;
  const o = T(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== o && ((h = i == null ? void 0 : i._$AO) == null || h.call(i, !1), o === void 0 ? i = void 0 : (i = new o(r), i._$AT(r, e, s)), s !== void 0 ? (e._$Co ?? (e._$Co = []))[s] = i : e._$Cl = i), i !== void 0 && (t = E(r, i._$AS(r, t.values), i, s)), t;
}
class Ot {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: s } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? _).importNode(e, !0);
    g.currentNode = i;
    let o = g.nextNode(), n = 0, h = 0, a = s[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let c;
        a.type === 2 ? c = new U(o, o.nextSibling, this, t) : a.type === 1 ? c = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (c = new Ht(o, this, t)), this._$AV.push(c), a = s[++h];
      }
      n !== (a == null ? void 0 : a.index) && (o = g.nextNode(), n++);
    }
    return g.currentNode = _, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class U {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, s, i) {
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = E(this, t, e), T(t) ? t === d || t == null || t === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : t !== this._$AH && t !== S && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : xt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== d && T(this._$AH) ? this._$AA.nextSibling.data = t : this.T(_.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = O.createElement(ft(s.h, s.h[0]), this.options)), s);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === i) this._$AH.p(e);
    else {
      const n = new Ot(i, this), h = n.u(this.options);
      n.p(e), this.T(h), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = at.get(t.strings);
    return e === void 0 && at.set(t.strings, e = new O(t)), e;
  }
  k(t) {
    Y(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const o of t) i === e.length ? e.push(s = new U(this.O(k()), this.O(k()), this, this.options)) : s = e[i], s._$AI(o), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, e); t !== this._$AB; ) {
      const i = t.nextSibling;
      t.remove(), t = i;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class j {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, o) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = d;
  }
  _$AI(t, e = this, s, i) {
    const o = this.strings;
    let n = !1;
    if (o === void 0) t = E(this, t, e, 0), n = !T(t) || t !== this._$AH && t !== S, n && (this._$AH = t);
    else {
      const h = t;
      let a, c;
      for (t = o[0], a = 0; a < o.length - 1; a++) c = E(this, h[s + a], e, a), c === S && (c = this._$AH[a]), n || (n = !T(c) || c !== this._$AH[a]), c === d ? t = d : t !== d && (t += (c ?? "") + o[a + 1]), this._$AH[a] = c;
    }
    n && !i && this.j(t);
  }
  j(t) {
    t === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Ut extends j {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === d ? void 0 : t;
  }
}
class Mt extends j {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== d);
  }
}
class Rt extends j {
  constructor(t, e, s, i, o) {
    super(t, e, s, i, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = E(this, t, e, 0) ?? d) === S) return;
    const s = this._$AH, i = t === d && s !== d || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, o = t !== d && (s === d || i);
    i && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ht {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    E(this, t);
  }
}
const I = x.litHtmlPolyfillSupport;
I == null || I(O, U), (x.litHtmlVersions ?? (x.litHtmlVersions = [])).push("3.3.1");
const Nt = (r, t, e) => {
  const s = (e == null ? void 0 : e.renderBefore) ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const o = (e == null ? void 0 : e.renderBefore) ?? null;
    s._$litPart$ = i = new U(t.insertBefore(k(), o), o, void 0, e ?? {});
  }
  return i._$AI(r), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const y = globalThis;
class P extends A {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e;
    const t = super.createRenderRoot();
    return (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Nt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return S;
  }
}
var lt;
P._$litElement$ = !0, P.finalized = !0, (lt = y.litElementHydrateSupport) == null || lt.call(y, { LitElement: P });
const q = y.litElementPolyfillSupport;
q == null || q({ LitElement: P });
(y.litElementVersions ?? (y.litElementVersions = [])).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Dt = (r) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(r, t);
  }) : customElements.define(r, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const zt = { attribute: !0, type: String, converter: D, reflect: !1, hasChanged: Z }, jt = (r = zt, t, e) => {
  const { kind: s, metadata: i } = e;
  let o = globalThis.litPropertyMetadata.get(i);
  if (o === void 0 && globalThis.litPropertyMetadata.set(i, o = /* @__PURE__ */ new Map()), s === "setter" && ((r = Object.create(r)).wrapped = !0), o.set(e.name, r), s === "accessor") {
    const { name: n } = e;
    return { set(h) {
      const a = t.get.call(this);
      t.set.call(this, h), this.requestUpdate(n, a, r);
    }, init(h) {
      return h !== void 0 && this.C(n, void 0, r, h), h;
    } };
  }
  if (s === "setter") {
    const { name: n } = e;
    return function(h) {
      const a = this[n];
      t.call(this, h), this.requestUpdate(n, a, r);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function Wt(r) {
  return (t, e) => typeof e == "object" ? jt(r, t, e) : ((s, i, o) => {
    const n = i.hasOwnProperty(o);
    return i.constructor.createProperty(o, s), n ? Object.getOwnPropertyDescriptor(i, o) : void 0;
  })(r, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function W(r) {
  return Wt({ ...r, state: !0, attribute: !1 });
}
class Bt {
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
  setState(t, e) {
    this.states.set(t, e), this.saveToStorage(), this.notifySubscribers(t, e);
  }
  /**
   * Subscribe to state changes for a specific widget.
   * Returns an unsubscribe function.
   */
  subscribe(t, e) {
    return this.subscribers.has(t) || this.subscribers.set(t, /* @__PURE__ */ new Set()), this.subscribers.get(t).add(e), () => {
      const s = this.subscribers.get(t);
      s && (s.delete(e), s.size === 0 && this.subscribers.delete(t));
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
  notifySubscribers(t, e) {
    const s = this.subscribers.get(t);
    s && s.size > 0 && s.forEach((i) => {
      try {
        i(e);
      } catch (o) {
        console.error(
          `[WidgetStore] Error in subscriber for ${t}:`,
          o
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
          const e = JSON.parse(t);
          Object.entries(e).forEach(([s, i]) => {
            this.states.set(s, i);
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
        this.states.forEach((e, s) => {
          t[s] = e;
        }), localStorage.setItem(this.storageKey, JSON.stringify(t));
      } catch (t) {
        console.warn("[WidgetStore] Failed to save to localStorage:", t);
      }
  }
}
const V = new Bt();
let ht = {};
function Lt(r) {
  if (!ht.beforePublishEvent) return !0;
  try {
    return ht.beforePublishEvent(r);
  } catch {
    return !1;
  }
}
class It {
  constructor() {
    this.subscribers = /* @__PURE__ */ new Map();
  }
  /**
   * Publish an event from a widget.
   * Event type is automatically namespaced as `widgetId:eventType`.
   */
  publish(t, e, s) {
    const i = {
      widgetId: t,
      type: e,
      data: s,
      timestamp: Date.now()
    };
    if (!Lt(i))
      return;
    const o = `${t}:${e}`, n = this.subscribers.get(o);
    n && n.size > 0 && n.forEach((h) => {
      try {
        h(i);
      } catch (a) {
        console.error(
          `[EventBus] Error in handler for ${o}:`,
          a
        );
      }
    });
  }
  /**
   * Subscribe to events from a specific widget.
   * Returns an unsubscribe function.
   */
  subscribe(t, e, s) {
    const i = `${t}:${e}`;
    return this.subscribers.has(i) || this.subscribers.set(i, /* @__PURE__ */ new Set()), this.subscribers.get(i).add(s), () => {
      const o = this.subscribers.get(i);
      o && (o.delete(s), o.size === 0 && this.subscribers.delete(i));
    };
  }
  /**
   * Clear all subscriptions (useful for cleanup in tests).
   */
  clear() {
    this.subscribers.clear();
  }
}
const F = new It(), qt = "widget-ready", Vt = "widget-error";
function Ft(r) {
  r.dispatchEvent(new CustomEvent(qt, { bubbles: !0 }));
}
function Kt(r, t) {
  const e = { reason: t };
  r.dispatchEvent(
    new CustomEvent(Vt, { bubbles: !0, detail: e })
  );
}
var Jt = Object.defineProperty, Gt = Object.getOwnPropertyDescriptor, M = (r, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? Gt(t, e) : t, o = r.length - 1, n; o >= 0; o--)
    (n = r[o]) && (i = (s ? n(t, e, i) : n(i)) || i);
  return s && i && Jt(t, e, i), i;
};
const K = "productivity-insights";
function $t() {
  return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
}
function H(r, t) {
  const e = $t(), i = { ...r.find((n) => n.date === e) ?? {
    date: e,
    notesCreated: 0,
    pomodoroCompleted: 0,
    tasksCompleted: 0
  }, ...t }, o = r.filter((n) => n.date !== e);
  return [i, ...o].slice(0, 14);
}
let v = class extends P {
  constructor() {
    super(...arguments), this.notesCreated = 0, this.pomodoroCompleted = 0, this.tasksCompleted = 0, this.history = [], this.unsubscribers = [], this.handleResetToday = () => {
      const r = $t();
      this.notesCreated = 0, this.pomodoroCompleted = 0, this.tasksCompleted = 0, this.history = H(this.history.filter((t) => t.date !== r), {
        date: r,
        notesCreated: 0,
        pomodoroCompleted: 0,
        tasksCompleted: 0
      }), this.saveStats();
    };
  }
  connectedCallback() {
    super.connectedCallback();
    try {
      const r = V.getState(K);
      r && (this.notesCreated = r.notesCreated || 0, this.pomodoroCompleted = r.pomodoroCompleted || 0, this.tasksCompleted = r.tasksCompleted || 0, this.history = r.history || []), this.unsubscribers.push(
        F.subscribe("notes", "note-added", () => {
          this.notesCreated++, this.history = H(this.history, { notesCreated: this.notesCreated }), this.saveStats();
        })
      ), this.unsubscribers.push(
        F.subscribe("pomodoro", "session-completed", () => {
          this.pomodoroCompleted++, this.history = H(this.history, {
            pomodoroCompleted: this.pomodoroCompleted
          }), this.saveStats();
        })
      ), this.unsubscribers.push(
        F.subscribe("taskboard", "task-completed", () => {
          this.tasksCompleted++, this.history = H(this.history, { tasksCompleted: this.tasksCompleted }), this.saveStats();
        })
      ), this.unsubscribers.push(
        V.subscribe(K, (t) => {
          this.notesCreated = t.notesCreated || 0, this.pomodoroCompleted = t.pomodoroCompleted || 0, this.tasksCompleted = t.tasksCompleted || 0, this.history = t.history || [], this.requestUpdate();
        })
      ), queueMicrotask(() => Ft(this));
    } catch (r) {
      Kt(this, r instanceof Error ? r.message : "mount-error");
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.unsubscribers.forEach((r) => r()), this.unsubscribers = [];
  }
  saveStats() {
    V.setState(K, {
      notesCreated: this.notesCreated,
      pomodoroCompleted: this.pomodoroCompleted,
      tasksCompleted: this.tasksCompleted,
      history: this.history
    }), this.requestUpdate();
  }
  weeklyTotals() {
    const r = this.history.slice(0, 7);
    return {
      notes: r.reduce((t, e) => t + e.notesCreated, 0),
      pomodoros: r.reduce((t, e) => t + e.pomodoroCompleted, 0),
      tasks: r.reduce((t, e) => t + e.tasksCompleted, 0)
    };
  }
  render() {
    const r = this.weeklyTotals();
    return kt`
      <div class="stats-surface">
        <div class="stats-title">Productivity Insights</div>
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-value">${this.notesCreated}</div>
            <div class="stat-label">Notes Today</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${this.pomodoroCompleted}</div>
            <div class="stat-label">Pomodoros</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${this.tasksCompleted}</div>
            <div class="stat-label">Tasks Done</div>
          </div>
        </div>
        <div class="trend">
          <div class="trend-row"><span>Weekly notes</span><strong>${r.notes}</strong></div>
          <div class="trend-row"><span>Weekly pomodoros</span><strong>${r.pomodoros}</strong></div>
          <div class="trend-row"><span>Weekly tasks</span><strong>${r.tasks}</strong></div>
        </div>
        <div class="stats-actions">
          <button class="btn" @click=${this.handleResetToday}>Reset Today</button>
        </div>
      </div>
    `;
  }
};
v.styles = bt`
    :host {
      display: block;
      height: 100%;
    }
    .stats-surface {
      background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
      border-radius: 16px;
      padding: 20px;
      height: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 14px;
      border: 1px solid rgba(14, 165, 233, 0.3);
    }
    .stats-title {
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: rgba(255, 255, 255, 0.85);
      font-weight: 700;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 10px;
    }
    .stat-card {
      background: rgba(255, 255, 255, 0.14);
      border-radius: 10px;
      padding: 10px;
      text-align: center;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    .stat-value {
      font-size: 1.8rem;
      font-weight: 700;
      color: #fff;
      line-height: 1;
    }
    .stat-label {
      font-size: 0.68rem;
      color: rgba(255, 255, 255, 0.9);
      text-transform: uppercase;
      margin-top: 4px;
      letter-spacing: 0.05em;
    }
    .trend {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      padding: 10px;
      color: rgba(255, 255, 255, 0.95);
      font-size: 0.75rem;
      display: grid;
      gap: 6px;
    }
    .trend-row {
      display: flex;
      justify-content: space-between;
      gap: 8px;
      font-variant-numeric: tabular-nums;
    }
    .stats-actions {
      display: flex;
      gap: 8px;
    }
    .btn {
      padding: 7px 14px;
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.3);
      background: rgba(255, 255, 255, 0.18);
      color: #fff;
      font-size: 0.75rem;
      cursor: pointer;
    }
  `;
M([
  W()
], v.prototype, "notesCreated", 2);
M([
  W()
], v.prototype, "pomodoroCompleted", 2);
M([
  W()
], v.prototype, "tasksCompleted", 2);
M([
  W()
], v.prototype, "history", 2);
v = M([
  Dt("mb-counter")
], v);
export {
  v as MbCounterElement
};
