/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const B = globalThis, Y = B.ShadowRoot && (B.ShadyCSS === void 0 || B.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, G = Symbol(), X = /* @__PURE__ */ new WeakMap();
let pt = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== G) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Y && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = X.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && X.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const mt = (r) => new pt(typeof r == "string" ? r : r + "", void 0, G), yt = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((s, i, o) => s + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + r[o + 1], r[0]);
  return new pt(e, r, G);
}, _t = (r, t) => {
  if (Y) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = B.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, r.appendChild(s);
  }
}, tt = Y ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return mt(e);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: vt, defineProperty: At, getOwnPropertyDescriptor: St, getOwnPropertyNames: wt, getOwnPropertySymbols: xt, getPrototypeOf: Et } = Object, $ = globalThis, et = $.trustedTypes, kt = et ? et.emptyScript : "", K = $.reactiveElementPolyfillSupport, O = (r, t) => r, W = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? kt : null;
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
} }, Z = (r, t) => !vt(r, t), st = { attribute: !0, type: String, converter: W, reflect: !1, useDefault: !1, hasChanged: Z };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), $.litPropertyMetadata ?? ($.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let w = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = st) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && At(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: o } = St(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? st;
  }
  static _$Ei() {
    if (this.hasOwnProperty(O("elementProperties"))) return;
    const t = Et(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(O("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(O("properties"))) {
      const e = this.properties, s = [...wt(e), ...xt(e)];
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
      for (const i of s) e.unshift(tt(i));
    } else t !== void 0 && e.push(tt(t));
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
    return _t(t, this.constructor.elementStyles), t;
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
      const n = (((o = s.converter) == null ? void 0 : o.toAttribute) !== void 0 ? s.converter : W).toAttribute(e, s.type);
      this._$Em = t, n == null ? this.removeAttribute(i) : this.setAttribute(i, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var o, n;
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const h = s.getPropertyOptions(i), a = typeof h.converter == "function" ? { fromAttribute: h.converter } : ((o = h.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? h.converter : W;
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
w.elementStyles = [], w.shadowRootOptions = { mode: "open" }, w[O("elementProperties")] = /* @__PURE__ */ new Map(), w[O("finalized")] = /* @__PURE__ */ new Map(), K == null || K({ ReactiveElement: w }), ($.reactiveElementVersions ?? ($.reactiveElementVersions = [])).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const U = globalThis, j = U.trustedTypes, it = j ? j.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, ut = "$lit$", b = `lit$${Math.random().toFixed(9).slice(2)}$`, ft = "?" + b, Ct = `<${ft}>`, S = document, R = () => S.createComment(""), H = (r) => r === null || typeof r != "object" && typeof r != "function", Q = Array.isArray, Pt = (r) => Q(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", V = `[ 	
\f\r]`, P = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, rt = /-->/g, ot = />/g, y = RegExp(`>|${V}(?:([^\\s"'>=/]+)(${V}*=${V}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), nt = /'/g, at = /"/g, gt = /^(?:script|style|textarea|title)$/i, Tt = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), T = Tt(1), x = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), ht = /* @__PURE__ */ new WeakMap(), v = S.createTreeWalker(S, 129);
function bt(r, t) {
  if (!Q(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return it !== void 0 ? it.createHTML(t) : t;
}
const Ot = (r, t) => {
  const e = r.length - 1, s = [];
  let i, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = P;
  for (let h = 0; h < e; h++) {
    const a = r[h];
    let c, p, l = -1, f = 0;
    for (; f < a.length && (n.lastIndex = f, p = n.exec(a), p !== null); ) f = n.lastIndex, n === P ? p[1] === "!--" ? n = rt : p[1] !== void 0 ? n = ot : p[2] !== void 0 ? (gt.test(p[2]) && (i = RegExp("</" + p[2], "g")), n = y) : p[3] !== void 0 && (n = y) : n === y ? p[0] === ">" ? (n = i ?? P, l = -1) : p[1] === void 0 ? l = -2 : (l = n.lastIndex - p[2].length, c = p[1], n = p[3] === void 0 ? y : p[3] === '"' ? at : nt) : n === at || n === nt ? n = y : n === rt || n === ot ? n = P : (n = y, i = void 0);
    const g = n === y && r[h + 1].startsWith("/>") ? " " : "";
    o += n === P ? a + Ct : l >= 0 ? (s.push(c), a.slice(0, l) + ut + a.slice(l) + b + g) : a + b + (l === -2 ? h : g);
  }
  return [bt(r, o + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class N {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let o = 0, n = 0;
    const h = t.length - 1, a = this.parts, [c, p] = Ot(t, e);
    if (this.el = N.createElement(c, s), v.currentNode = this.el.content, e === 2 || e === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (i = v.nextNode()) !== null && a.length < h; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const l of i.getAttributeNames()) if (l.endsWith(ut)) {
          const f = p[n++], g = i.getAttribute(l).split(b), z = /([.?@])?(.*)/.exec(f);
          a.push({ type: 1, index: o, name: z[2], strings: g, ctor: z[1] === "." ? Mt : z[1] === "?" ? Rt : z[1] === "@" ? Ht : q }), i.removeAttribute(l);
        } else l.startsWith(b) && (a.push({ type: 6, index: o }), i.removeAttribute(l));
        if (gt.test(i.tagName)) {
          const l = i.textContent.split(b), f = l.length - 1;
          if (f > 0) {
            i.textContent = j ? j.emptyScript : "";
            for (let g = 0; g < f; g++) i.append(l[g], R()), v.nextNode(), a.push({ type: 2, index: ++o });
            i.append(l[f], R());
          }
        }
      } else if (i.nodeType === 8) if (i.data === ft) a.push({ type: 2, index: o });
      else {
        let l = -1;
        for (; (l = i.data.indexOf(b, l + 1)) !== -1; ) a.push({ type: 7, index: o }), l += b.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const s = S.createElement("template");
    return s.innerHTML = t, s;
  }
}
function E(r, t, e = r, s) {
  var n, h;
  if (t === x) return t;
  let i = s !== void 0 ? (n = e._$Co) == null ? void 0 : n[s] : e._$Cl;
  const o = H(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== o && ((h = i == null ? void 0 : i._$AO) == null || h.call(i, !1), o === void 0 ? i = void 0 : (i = new o(r), i._$AT(r, e, s)), s !== void 0 ? (e._$Co ?? (e._$Co = []))[s] = i : e._$Cl = i), i !== void 0 && (t = E(r, i._$AS(r, t.values), i, s)), t;
}
class Ut {
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
    const { el: { content: e }, parts: s } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? S).importNode(e, !0);
    v.currentNode = i;
    let o = v.nextNode(), n = 0, h = 0, a = s[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let c;
        a.type === 2 ? c = new D(o, o.nextSibling, this, t) : a.type === 1 ? c = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (c = new Nt(o, this, t)), this._$AV.push(c), a = s[++h];
      }
      n !== (a == null ? void 0 : a.index) && (o = v.nextNode(), n++);
    }
    return v.currentNode = S, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class D {
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
    t = E(this, t, e), H(t) ? t === d || t == null || t === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : t !== this._$AH && t !== x && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Pt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== d && H(this._$AH) ? this._$AA.nextSibling.data = t : this.T(S.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = N.createElement(bt(s.h, s.h[0]), this.options)), s);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === i) this._$AH.p(e);
    else {
      const n = new Ut(i, this), h = n.u(this.options);
      n.p(e), this.T(h), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = ht.get(t.strings);
    return e === void 0 && ht.set(t.strings, e = new N(t)), e;
  }
  k(t) {
    Q(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const o of t) i === e.length ? e.push(s = new D(this.O(R()), this.O(R()), this, this.options)) : s = e[i], s._$AI(o), i++;
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
class q {
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
    if (o === void 0) t = E(this, t, e, 0), n = !H(t) || t !== this._$AH && t !== x, n && (this._$AH = t);
    else {
      const h = t;
      let a, c;
      for (t = o[0], a = 0; a < o.length - 1; a++) c = E(this, h[s + a], e, a), c === x && (c = this._$AH[a]), n || (n = !H(c) || c !== this._$AH[a]), c === d ? t = d : t !== d && (t += (c ?? "") + o[a + 1]), this._$AH[a] = c;
    }
    n && !i && this.j(t);
  }
  j(t) {
    t === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Mt extends q {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === d ? void 0 : t;
  }
}
class Rt extends q {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== d);
  }
}
class Ht extends q {
  constructor(t, e, s, i, o) {
    super(t, e, s, i, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = E(this, t, e, 0) ?? d) === x) return;
    const s = this._$AH, i = t === d && s !== d || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, o = t !== d && (s === d || i);
    i && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Nt {
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
const F = U.litHtmlPolyfillSupport;
F == null || F(N, D), (U.litHtmlVersions ?? (U.litHtmlVersions = [])).push("3.3.1");
const Dt = (r, t, e) => {
  const s = (e == null ? void 0 : e.renderBefore) ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const o = (e == null ? void 0 : e.renderBefore) ?? null;
    s._$litPart$ = i = new D(t.insertBefore(R(), o), o, void 0, e ?? {});
  }
  return i._$AI(r), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const A = globalThis;
class M extends w {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Dt(e, this.renderRoot, this.renderOptions);
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
    return x;
  }
}
var dt;
M._$litElement$ = !0, M.finalized = !0, (dt = A.litElementHydrateSupport) == null || dt.call(A, { LitElement: M });
const J = A.litElementPolyfillSupport;
J == null || J({ LitElement: M });
(A.litElementVersions ?? (A.litElementVersions = [])).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const It = (r) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(r, t);
  }) : customElements.define(r, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const zt = { attribute: !0, type: String, converter: W, reflect: !1, hasChanged: Z }, Bt = (r = zt, t, e) => {
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
  return (t, e) => typeof e == "object" ? Bt(r, t, e) : ((s, i, o) => {
    const n = i.hasOwnProperty(o);
    return i.constructor.createProperty(o, s), n ? Object.getOwnPropertyDescriptor(i, o) : void 0;
  })(r, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function I(r) {
  return Wt({ ...r, state: !0, attribute: !1 });
}
class jt {
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
const L = new jt();
let k = {};
const $t = (r) => `${r}:settings`;
function lt(r) {
  return k.getWidgetSettings ? k.getWidgetSettings(r) : L.getState($t(r));
}
function Lt(r, t) {
  if (k.setWidgetSettings) {
    k.setWidgetSettings(r, t);
    return;
  }
  L.setState($t(r), t);
}
function qt(r) {
  if (!k.beforePublishEvent) return !0;
  try {
    return k.beforePublishEvent(r);
  } catch {
    return !1;
  }
}
class Kt {
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
    if (!qt(i))
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
const _ = new Kt(), Vt = "widget-ready", Ft = "widget-error";
function Jt(r) {
  r.dispatchEvent(new CustomEvent(Vt, { bubbles: !0 }));
}
function Yt(r, t) {
  const e = { reason: t };
  r.dispatchEvent(
    new CustomEvent(Ft, { bubbles: !0, detail: e })
  );
}
var Gt = Object.defineProperty, Zt = Object.getOwnPropertyDescriptor, C = (r, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? Zt(t, e) : t, o = r.length - 1, n; o >= 0; o--)
    (n = r[o]) && (i = (s ? n(t, e, i) : n(i)) || i);
  return s && i && Gt(t, e, i), i;
};
const u = "taskboard", ct = "taskboard:tasks";
let m = class extends M {
  constructor() {
    super(...arguments), this.tasks = [], this.titleInput = "", this.dueInput = "", this.priorityInput = "medium", this.showCompleted = !0, this.unsubscribers = [], this.handleAddButtonClick = () => {
      const r = this.titleInput.trim();
      r && (this.createTask(r), this.titleInput = "", this.dueInput = "");
    }, this.toggleShowCompleted = (r) => {
      this.showCompleted = r.target.checked, this.saveSettings(), this.requestUpdate();
    };
  }
  connectedCallback() {
    super.connectedCallback();
    try {
      this.tasks = L.getState(ct) ?? [];
      const r = lt(u);
      this.showCompleted = (r == null ? void 0 : r.showCompleted) ?? !0, this.priorityInput = (r == null ? void 0 : r.defaultPriority) ?? "medium", this.unsubscribers.push(
        _.subscribe("host", "execute-action", (t) => {
          var o;
          const { targetWidgetId: e, action: s, payload: i } = t.data;
          if (e === u) {
            if (console.log(`[mb-taskboard] Received OS command: ${s}`, i), s === "add-task") {
              const n = ((o = i == null ? void 0 : i.note) == null ? void 0 : o.text) || (i == null ? void 0 : i.text) || "Automated Task";
              this.createTask(n);
            }
            s === "clear-done" && this.persist(this.tasks.filter((n) => n.status !== "done"));
          }
        })
      ), this.unsubscribers.push(
        _.subscribe("host", "settings-updated", (t) => {
          const { widgetId: e, settings: s } = t.data;
          e === u && (this.showCompleted = s.showCompleted ?? !0, this.priorityInput = s.defaultPriority ?? "medium", this.requestUpdate());
        })
      ), queueMicrotask(() => Jt(this));
    } catch (r) {
      Yt(this, r instanceof Error ? r.message : "mount-error");
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.unsubscribers.forEach((r) => r()), this.unsubscribers = [];
  }
  persist(r) {
    this.tasks = r, L.setState(ct, r);
  }
  saveSettings() {
    const r = {
      showCompleted: this.showCompleted,
      defaultPriority: this.priorityInput
    }, t = lt(u) ?? {};
    Lt(u, { ...t, ...r });
  }
  createTask(r) {
    const t = Date.now(), e = {
      id: String(t),
      title: r.trim(),
      priority: this.priorityInput,
      dueDate: this.dueInput || void 0,
      status: "backlog",
      createdAt: t,
      updatedAt: t
    };
    this.persist([e, ...this.tasks]), _.publish(u, "task-created", { id: e.id });
  }
  deleteTask(r) {
    this.persist(this.tasks.filter((t) => t.id !== r)), _.publish(u, "task-deleted", { id: r });
  }
  moveTask(r, t) {
    if (r.status === t) return;
    const e = this.tasks.map(
      (s) => s.id === r.id ? {
        ...s,
        status: t,
        updatedAt: Date.now()
      } : s
    );
    this.persist(e), _.publish(u, "task-moved", {
      id: r.id,
      from: r.status,
      to: t
    }), t === "done" ? _.publish(u, "task-completed", { id: r.id }) : _.publish(u, "task-updated", { id: r.id });
  }
  renderColumn(r, t) {
    const e = this.tasks.filter((s) => !(r !== s.status || r === "done" && !this.showCompleted));
    return T`
      <section class="column">
        <h4>${t}</h4>
        <div class="list">
          ${e.map((s) => {
      const i = r !== "backlog", o = r !== "done", n = {
        backlog: "backlog",
        "in-progress": "backlog",
        done: "in-progress"
      }, h = {
        backlog: "in-progress",
        "in-progress": "done",
        done: "done"
      };
      return T`
              <article class="task">
                <div class="task-main">${s.title}</div>
                <div class="task-meta">
                  <span class="priority-pill ${s.priority}">${s.priority}</span>
                  <span>${s.dueDate ? `📅 ${s.dueDate}` : ""}</span>
                </div>
                <div class="task-actions">
                  ${i ? T`<button class="btn-ghost" @click=${() => this.moveTask(s, n[r])}>\u2190 Back</button>` : null}
                  ${o ? T`<button class="btn-ghost" @click=${() => this.moveTask(s, h[r])}>Next \u2192</button>` : null}
                  <button class="btn-ghost" style="margin-left:auto;color:#ef4444;border-color:rgba(239,68,68,0.2)" @click=${() => this.deleteTask(s.id)}>Delete</button>
                </div>
              </article>
            `;
    })}
        </div>
      </section>
    `;
  }
  render() {
    return T`
      <div class="surface">
        <div class="row">
          <div class="input-group">
            <input
              type="text"
              placeholder="What needs to be done?"
              .value=${this.titleInput}
              @input=${(r) => {
      this.titleInput = r.target.value;
    }}
              @keydown=${(r) => {
      r.key === "Enter" && this.handleAddButtonClick();
    }}
            />
            <input
              type="date"
              .value=${this.dueInput}
              @input=${(r) => {
      this.dueInput = r.target.value;
    }}
            />
            <select
              .value=${this.priorityInput}
              @change=${(r) => {
      this.priorityInput = r.target.value;
    }}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            <button class="btn-primary" @click=${this.handleAddButtonClick}>Add Task</button>
          </div>
        </div>
        <div class="row">
          <label class="settings-row">
            <input
              type="checkbox"
              .checked=${this.showCompleted}
              @change=${this.toggleShowCompleted}
            />
            Show completed tasks
          </label>
        </div>
        <div class="columns">
          ${this.renderColumn("backlog", "Backlog")}
          ${this.renderColumn("in-progress", "Progress")}
          ${this.renderColumn("done", "Done")}
        </div>
      </div>
    `;
  }
};
m.styles = yt`
    :host {
      display: block;
      height: 100%;
      font-family: system-ui, -apple-system, Segoe UI, sans-serif;
    }
    .surface {
      height: 100%;
      background: linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%);
      border-radius: 16px;
      border: 1px solid rgba(14, 165, 233, 0.2);
      padding: 16px;
      box-sizing: border-box;
      display: grid;
      grid-template-rows: auto auto 1fr;
      gap: 12px;
      box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
    }
    .row {
      display: flex;
      gap: 8px;
      align-items: center;
      flex-wrap: wrap;
    }
    .input-group {
      display: flex;
      flex: 1;
      gap: 8px;
      min-width: 200px;
    }
    input,
    select {
      border: 1px solid rgba(14, 165, 233, 0.3);
      border-radius: 10px;
      padding: 8px 12px;
      background: rgba(255, 255, 255, 0.9);
      font-size: 0.85rem;
      transition: border-color 0.2s;
    }
    input:focus, select:focus {
      outline: none;
      border-color: #0284c7;
      background: #fff;
    }
    input[type="text"] {
      flex: 1;
    }
    .btn-primary {
      border: none;
      border-radius: 10px;
      padding: 8px 16px;
      background: #0284c7;
      color: #fff;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }
    .btn-primary:hover {
      background: #0369a1;
    }
    .btn-ghost {
      background: transparent;
      border: 1px solid rgba(14, 165, 233, 0.4);
      color: #0369a1;
      border-radius: 8px;
      padding: 4px 8px;
      font-size: 0.75rem;
      cursor: pointer;
      transition: all 0.2s;
    }
    .btn-ghost:hover {
      background: rgba(255,255,255,0.5);
      border-color: #0369a1;
    }
    .columns {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 12px;
      min-height: 0;
    }
    .column {
      border: 1px solid rgba(14, 165, 233, 0.15);
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.4);
      padding: 10px;
      display: flex;
      flex-direction: column;
      min-height: 0;
    }
    .column h4 {
      margin: 0 0 10px 0;
      font-size: 0.75rem;
      text-transform: uppercase;
      color: #0369a1;
      letter-spacing: 0.08em;
      font-weight: 800;
      text-align: center;
    }
    .list {
      display: grid;
      gap: 8px;
      overflow-y: auto;
      min-height: 0;
      padding-right: 4px;
    }
    .list::-webkit-scrollbar {
      width: 4px;
    }
    .list::-webkit-scrollbar-thumb {
      background: rgba(14, 165, 233, 0.2);
      border-radius: 4px;
    }
    .task {
      border: 1px solid rgba(14, 165, 233, 0.1);
      border-radius: 10px;
      background: #fff;
      padding: 10px;
      display: grid;
      gap: 6px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.03);
      transition: transform 0.1s;
    }
    .task:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 6px rgba(0,0,0,0.05);
    }
    .task-main {
      font-size: 0.85rem;
      color: #1e293b;
      line-height: 1.4;
      font-weight: 500;
      word-break: break-word;
    }
    .task-meta {
      font-size: 0.7rem;
      color: #64748b;
      display: flex;
      justify-content: space-between;
      gap: 6px;
      align-items: center;
    }
    .priority-pill {
      padding: 1px 6px;
      border-radius: 4px;
      font-weight: 700;
      text-transform: uppercase;
      font-size: 0.6rem;
    }
    .priority-pill.high { background: #fee2e2; color: #b91c1c; }
    .priority-pill.medium { background: #fef3c7; color: #b45309; }
    .priority-pill.low { background: #f0fdf4; color: #15803d; }
    
    .task-actions {
      display: flex;
      gap: 4px;
      margin-top: 4px;
      border-top: 1px solid #f1f5f9;
      padding-top: 6px;
    }
    .settings-row {
      font-size: 0.75rem;
      color: #0369a1;
      display: flex;
      align-items: center;
      gap: 6px;
      user-select: none;
      cursor: pointer;
    }
  `;
C([
  I()
], m.prototype, "tasks", 2);
C([
  I()
], m.prototype, "titleInput", 2);
C([
  I()
], m.prototype, "dueInput", 2);
C([
  I()
], m.prototype, "priorityInput", 2);
C([
  I()
], m.prototype, "showCompleted", 2);
m = C([
  It("mb-taskboard")
], m);
export {
  m as MbTaskboardElement
};
