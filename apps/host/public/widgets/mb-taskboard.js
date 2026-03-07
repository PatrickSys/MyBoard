/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const j = globalThis, et = j.ShadowRoot && (j.ShadyCSS === void 0 || j.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, st = Symbol(), nt = /* @__PURE__ */ new WeakMap();
let $t = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== st) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (et && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = nt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && nt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Et = (r) => new $t(typeof r == "string" ? r : r + "", void 0, st), Ct = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((s, i, o) => s + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + r[o + 1], r[0]);
  return new $t(e, r, st);
}, Tt = (r, t) => {
  if (et) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = j.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, r.appendChild(s);
  }
}, at = et ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return Et(e);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Pt, defineProperty: Dt, getOwnPropertyDescriptor: Ot, getOwnPropertyNames: Mt, getOwnPropertySymbols: Ut, getPrototypeOf: It } = Object, m = globalThis, lt = m.trustedTypes, Rt = lt ? lt.emptyScript : "", Y = m.reactiveElementPolyfillSupport, D = (r, t) => r, L = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? Rt : null;
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
} }, rt = (r, t) => !Pt(r, t), ct = { attribute: !0, type: String, converter: L, reflect: !1, useDefault: !1, hasChanged: rt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), m.litPropertyMetadata ?? (m.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let S = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = ct) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && Dt(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: o } = Ot(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get: i, set(n) {
      const l = i == null ? void 0 : i.call(this);
      o == null || o.call(this, n), this.requestUpdate(t, l, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? ct;
  }
  static _$Ei() {
    if (this.hasOwnProperty(D("elementProperties"))) return;
    const t = It(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(D("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(D("properties"))) {
      const e = this.properties, s = [...Mt(e), ...Ut(e)];
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
      for (const i of s) e.unshift(at(i));
    } else t !== void 0 && e.push(at(t));
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
    return Tt(t, this.constructor.elementStyles), t;
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
      const n = (((o = s.converter) == null ? void 0 : o.toAttribute) !== void 0 ? s.converter : L).toAttribute(e, s.type);
      this._$Em = t, n == null ? this.removeAttribute(i) : this.setAttribute(i, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var o, n;
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const l = s.getPropertyOptions(i), a = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((o = l.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? l.converter : L;
      this._$Em = i;
      const d = a.fromAttribute(e, l.type);
      this[i] = d ?? ((n = this._$Ej) == null ? void 0 : n.get(i)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(t, e, s) {
    var i;
    if (t !== void 0) {
      const o = this.constructor, n = this[t];
      if (s ?? (s = o.getPropertyOptions(t)), !((s.hasChanged ?? rt)(n, e) || s.useDefault && s.reflect && n === ((i = this._$Ej) == null ? void 0 : i.get(t)) && !this.hasAttribute(o._$Eu(t, s)))) return;
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
        const { wrapped: l } = n, a = this[o];
        l !== !0 || this._$AL.has(o) || a === void 0 || this.C(o, void 0, n, a);
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
S.elementStyles = [], S.shadowRootOptions = { mode: "open" }, S[D("elementProperties")] = /* @__PURE__ */ new Map(), S[D("finalized")] = /* @__PURE__ */ new Map(), Y == null || Y({ ReactiveElement: S }), (m.reactiveElementVersions ?? (m.reactiveElementVersions = [])).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const O = globalThis, W = O.trustedTypes, dt = W ? W.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, yt = "$lit$", b = `lit$${Math.random().toFixed(9).slice(2)}$`, vt = "?" + b, Nt = `<${vt}>`, w = document, U = () => w.createComment(""), I = (r) => r === null || typeof r != "object" && typeof r != "function", it = Array.isArray, Ht = (r) => it(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", G = `[ 	
\f\r]`, P = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ht = /-->/g, ut = />/g, y = RegExp(`>|${G}(?:([^\\s"'>=/]+)(${G}*=${G}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), pt = /'/g, gt = /"/g, _t = /^(?:script|style|textarea|title)$/i, zt = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), x = zt(1), E = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), ft = /* @__PURE__ */ new WeakMap(), _ = w.createTreeWalker(w, 129);
function At(r, t) {
  if (!it(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return dt !== void 0 ? dt.createHTML(t) : t;
}
const Bt = (r, t) => {
  const e = r.length - 1, s = [];
  let i, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = P;
  for (let l = 0; l < e; l++) {
    const a = r[l];
    let d, h, c = -1, g = 0;
    for (; g < a.length && (n.lastIndex = g, h = n.exec(a), h !== null); ) g = n.lastIndex, n === P ? h[1] === "!--" ? n = ht : h[1] !== void 0 ? n = ut : h[2] !== void 0 ? (_t.test(h[2]) && (i = RegExp("</" + h[2], "g")), n = y) : h[3] !== void 0 && (n = y) : n === y ? h[0] === ">" ? (n = i ?? P, c = -1) : h[1] === void 0 ? c = -2 : (c = n.lastIndex - h[2].length, d = h[1], n = h[3] === void 0 ? y : h[3] === '"' ? gt : pt) : n === gt || n === pt ? n = y : n === ht || n === ut ? n = P : (n = y, i = void 0);
    const f = n === y && r[l + 1].startsWith("/>") ? " " : "";
    o += n === P ? a + Nt : c >= 0 ? (s.push(d), a.slice(0, c) + yt + a.slice(c) + b + f) : a + b + (c === -2 ? l : f);
  }
  return [At(r, o + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class R {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let o = 0, n = 0;
    const l = t.length - 1, a = this.parts, [d, h] = Bt(t, e);
    if (this.el = R.createElement(d, s), _.currentNode = this.el.content, e === 2 || e === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (i = _.nextNode()) !== null && a.length < l; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const c of i.getAttributeNames()) if (c.endsWith(yt)) {
          const g = h[n++], f = i.getAttribute(c).split(b), H = /([.?@])?(.*)/.exec(g);
          a.push({ type: 1, index: o, name: H[2], strings: f, ctor: H[1] === "." ? Lt : H[1] === "?" ? Wt : H[1] === "@" ? qt : K }), i.removeAttribute(c);
        } else c.startsWith(b) && (a.push({ type: 6, index: o }), i.removeAttribute(c));
        if (_t.test(i.tagName)) {
          const c = i.textContent.split(b), g = c.length - 1;
          if (g > 0) {
            i.textContent = W ? W.emptyScript : "";
            for (let f = 0; f < g; f++) i.append(c[f], U()), _.nextNode(), a.push({ type: 2, index: ++o });
            i.append(c[g], U());
          }
        }
      } else if (i.nodeType === 8) if (i.data === vt) a.push({ type: 2, index: o });
      else {
        let c = -1;
        for (; (c = i.data.indexOf(b, c + 1)) !== -1; ) a.push({ type: 7, index: o }), c += b.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const s = w.createElement("template");
    return s.innerHTML = t, s;
  }
}
function C(r, t, e = r, s) {
  var n, l;
  if (t === E) return t;
  let i = s !== void 0 ? (n = e._$Co) == null ? void 0 : n[s] : e._$Cl;
  const o = I(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== o && ((l = i == null ? void 0 : i._$AO) == null || l.call(i, !1), o === void 0 ? i = void 0 : (i = new o(r), i._$AT(r, e, s)), s !== void 0 ? (e._$Co ?? (e._$Co = []))[s] = i : e._$Cl = i), i !== void 0 && (t = C(r, i._$AS(r, t.values), i, s)), t;
}
class jt {
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
    const { el: { content: e }, parts: s } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? w).importNode(e, !0);
    _.currentNode = i;
    let o = _.nextNode(), n = 0, l = 0, a = s[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let d;
        a.type === 2 ? d = new N(o, o.nextSibling, this, t) : a.type === 1 ? d = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (d = new Ft(o, this, t)), this._$AV.push(d), a = s[++l];
      }
      n !== (a == null ? void 0 : a.index) && (o = _.nextNode(), n++);
    }
    return _.currentNode = w, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class N {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, s, i) {
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
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
    t = C(this, t, e), I(t) ? t === u || t == null || t === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : t !== this._$AH && t !== E && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ht(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== u && I(this._$AH) ? this._$AA.nextSibling.data = t : this.T(w.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = R.createElement(At(s.h, s.h[0]), this.options)), s);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === i) this._$AH.p(e);
    else {
      const n = new jt(i, this), l = n.u(this.options);
      n.p(e), this.T(l), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = ft.get(t.strings);
    return e === void 0 && ft.set(t.strings, e = new R(t)), e;
  }
  k(t) {
    it(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const o of t) i === e.length ? e.push(s = new N(this.O(U()), this.O(U()), this, this.options)) : s = e[i], s._$AI(o), i++;
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
class K {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, o) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = u;
  }
  _$AI(t, e = this, s, i) {
    const o = this.strings;
    let n = !1;
    if (o === void 0) t = C(this, t, e, 0), n = !I(t) || t !== this._$AH && t !== E, n && (this._$AH = t);
    else {
      const l = t;
      let a, d;
      for (t = o[0], a = 0; a < o.length - 1; a++) d = C(this, l[s + a], e, a), d === E && (d = this._$AH[a]), n || (n = !I(d) || d !== this._$AH[a]), d === u ? t = u : t !== u && (t += (d ?? "") + o[a + 1]), this._$AH[a] = d;
    }
    n && !i && this.j(t);
  }
  j(t) {
    t === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Lt extends K {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === u ? void 0 : t;
  }
}
class Wt extends K {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== u);
  }
}
class qt extends K {
  constructor(t, e, s, i, o) {
    super(t, e, s, i, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = C(this, t, e, 0) ?? u) === E) return;
    const s = this._$AH, i = t === u && s !== u || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, o = t !== u && (s === u || i);
    i && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ft {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    C(this, t);
  }
}
const J = O.litHtmlPolyfillSupport;
J == null || J(R, N), (O.litHtmlVersions ?? (O.litHtmlVersions = [])).push("3.3.1");
const Kt = (r, t, e) => {
  const s = (e == null ? void 0 : e.renderBefore) ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const o = (e == null ? void 0 : e.renderBefore) ?? null;
    s._$litPart$ = i = new N(t.insertBefore(U(), o), o, void 0, e ?? {});
  }
  return i._$AI(r), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const A = globalThis;
class M extends S {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Kt(e, this.renderRoot, this.renderOptions);
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
    return E;
  }
}
var mt;
M._$litElement$ = !0, M.finalized = !0, (mt = A.litElementHydrateSupport) == null || mt.call(A, { LitElement: M });
const Z = A.litElementPolyfillSupport;
Z == null || Z({ LitElement: M });
(A.litElementVersions ?? (A.litElementVersions = [])).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Vt = (r) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(r, t);
  }) : customElements.define(r, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Yt = { attribute: !0, type: String, converter: L, reflect: !1, hasChanged: rt }, Gt = (r = Yt, t, e) => {
  const { kind: s, metadata: i } = e;
  let o = globalThis.litPropertyMetadata.get(i);
  if (o === void 0 && globalThis.litPropertyMetadata.set(i, o = /* @__PURE__ */ new Map()), s === "setter" && ((r = Object.create(r)).wrapped = !0), o.set(e.name, r), s === "accessor") {
    const { name: n } = e;
    return { set(l) {
      const a = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(n, a, r);
    }, init(l) {
      return l !== void 0 && this.C(n, void 0, r, l), l;
    } };
  }
  if (s === "setter") {
    const { name: n } = e;
    return function(l) {
      const a = this[n];
      t.call(this, l), this.requestUpdate(n, a, r);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function Jt(r) {
  return (t, e) => typeof e == "object" ? Gt(r, t, e) : ((s, i, o) => {
    const n = i.hasOwnProperty(o);
    return i.constructor.createProperty(o, s), n ? Object.getOwnPropertyDescriptor(i, o) : void 0;
  })(r, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function k(r) {
  return Jt({ ...r, state: !0, attribute: !1 });
}
function Zt() {
  return {
    bridge: {},
    commandHandlers: /* @__PURE__ */ new Map(),
    instances: /* @__PURE__ */ new Map()
  };
}
function ot() {
  const r = globalThis;
  return r.__MYBOARD_SDK_RUNTIME__ || (r.__MYBOARD_SDK_RUNTIME__ = Zt()), r.__MYBOARD_SDK_RUNTIME__;
}
class Qt {
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
const X = ot(), wt = X.instances.get("widget-store") ?? new Qt();
X.instances.has("widget-store") || X.instances.set("widget-store", wt);
const q = wt, kt = ot(), xt = (r) => `${r}:settings`;
function V() {
  return kt.bridge;
}
function Xt() {
  return kt.commandHandlers;
}
function te(r) {
  const t = V();
  return t.getWidgetSettings ? t.getWidgetSettings(r) : q.getState(xt(r));
}
function ee(r, t) {
  const e = V();
  if (e.setWidgetSettings) {
    e.setWidgetSettings(r, t);
    return;
  }
  q.setState(xt(r), t);
}
function se(r) {
  var e;
  const t = V();
  if (!t.beforePublishEvent) return !0;
  try {
    return t.beforePublishEvent(r);
  } catch (s) {
    return (typeof process > "u" || ((e = process.env) == null ? void 0 : e.NODE_ENV) !== "production") && console.warn("[host-bridge] beforePublishEvent failed; dropping event", s), !1;
  }
}
function re(r, t) {
  const e = V();
  if (e.registerWidgetCommandHandler)
    return e.registerWidgetCommandHandler(r, t);
  const s = Xt();
  return s.set(r, t), () => {
    s.get(r) === t && s.delete(r);
  };
}
const T = ot();
T.instances.has("event-subscribers") || T.instances.set("event-subscribers", /* @__PURE__ */ new Map());
class ie {
  get subscribers() {
    return T.instances.get("event-subscribers");
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
    if (!se(i))
      return;
    const o = `${t}:${e}`, n = this.subscribers.get(o);
    n && n.size > 0 && n.forEach((l) => {
      try {
        l(i);
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
const St = T.instances.get("event-bus") ?? new ie();
T.instances.has("event-bus") || T.instances.set("event-bus", St);
const z = St, oe = "widget-ready", ne = "widget-error";
function ae(r) {
  r.dispatchEvent(new CustomEvent(oe, { bubbles: !0 }));
}
function le(r, t) {
  const e = { reason: t };
  r.dispatchEvent(
    new CustomEvent(ne, { bubbles: !0, detail: e })
  );
}
var ce = Object.defineProperty, de = Object.getOwnPropertyDescriptor, $ = (r, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? de(t, e) : t, o = r.length - 1, n; o >= 0; o--)
    (n = r[o]) && (i = (s ? n(t, e, i) : n(i)) || i);
  return s && i && ce(t, e, i), i;
};
const v = "taskboard", bt = "taskboard:tasks", F = {
  showCompleted: !0,
  defaultPriority: "medium"
};
function tt(r, t = F.defaultPriority) {
  return r === "low" || r === "medium" || r === "high" ? r : t;
}
function Q(r, t = F) {
  return {
    showCompleted: (r == null ? void 0 : r.showCompleted) ?? t.showCompleted,
    defaultPriority: tt(
      r == null ? void 0 : r.defaultPriority,
      t.defaultPriority
    )
  };
}
function B(r) {
  return typeof r != "string" ? null : r.trim() || null;
}
function he(r) {
  const t = Date.now() - r, e = Math.floor(t / 6e4);
  if (e < 1) return "just now";
  if (e < 60) return `${e}m ago`;
  const s = Math.floor(e / 60);
  if (s < 24) return `${s}h ago`;
  const i = Math.floor(s / 24);
  if (i < 7) return `${i}d ago`;
  const o = new Date(r), n = { month: "short", day: "numeric" };
  return o.getFullYear() !== (/* @__PURE__ */ new Date()).getFullYear() && (n.year = "numeric"), o.toLocaleDateString(void 0, n);
}
function ue(r) {
  const t = /* @__PURE__ */ new Date(r + "T00:00:00"), e = /* @__PURE__ */ new Date();
  e.setHours(0, 0, 0, 0);
  const s = Math.floor((t.getTime() - e.getTime()) / 864e5), i = { month: "short", day: "numeric" };
  t.getFullYear() !== e.getFullYear() && (i.year = "numeric");
  const o = t.toLocaleDateString(void 0, i);
  return s <= 0 ? { label: o, state: "overdue" } : s <= 2 ? { label: o, state: "due-soon" } : { label: o, state: "normal" };
}
let p = class extends M {
  constructor() {
    super(...arguments), this.tasks = [], this.titleInput = "", this.dueInput = "", this.priorityInput = F.defaultPriority, this.showCompleted = F.showCompleted, this.draggedTaskId = null, this.dragOverColumn = null, this.unsubscribers = [], this.handleAddButtonClick = () => {
      this.createTask(
        this.titleInput,
        this.priorityInput,
        this.dueInput || void 0
      ) && (this.titleInput = "", this.dueInput = "");
    }, this.toggleShowCompleted = (r) => {
      this.showCompleted = r.target.checked, this.saveSettings(), this.requestUpdate();
    };
  }
  connectedCallback() {
    super.connectedCallback();
    try {
      this.tasks = q.getState(bt) ?? [];
      const r = Q(
        te(v)
      );
      this.showCompleted = r.showCompleted, this.priorityInput = r.defaultPriority, this.unsubscribers.push(
        re(
          v,
          async (t) => {
            const { commandType: e, payload: s } = t;
            if (e === "task.create") {
              const i = B(s == null ? void 0 : s.title) ?? B(s == null ? void 0 : s.text) ?? (typeof (s == null ? void 0 : s.note) == "object" && s.note && B(s.note.text) ? B(
                s.note.text
              ) : null) ?? "Automated Task", o = tt(
                s == null ? void 0 : s.priority,
                this.priorityInput
              ), n = typeof (s == null ? void 0 : s.dueDate) == "string" ? s.dueDate : void 0, l = this.createTask(i, o, n);
              return l ? { ok: !0, result: { taskId: l.id } } : {
                ok: !1,
                code: "COMMAND_PAYLOAD_INVALID",
                reason: "task.create requires a non-empty title"
              };
            }
            if (e === "task.move-next") {
              if (typeof (s == null ? void 0 : s.id) != "string")
                return {
                  ok: !1,
                  code: "COMMAND_PAYLOAD_INVALID",
                  reason: "task.move-next requires payload.id"
                };
              const i = this.tasks.find((n) => n.id === s.id);
              if (!i)
                return {
                  ok: !1,
                  code: "COMMAND_TARGET_NOT_FOUND",
                  reason: `Task ${s.id} not found`
                };
              const o = {
                backlog: "in-progress",
                "in-progress": "done",
                done: "done"
              };
              return this.moveTask(i, o[i.status]), { ok: !0 };
            }
            return {
              ok: !1,
              code: "COMMAND_ACTION_NOT_SUPPORTED",
              reason: `taskboard does not support ${e}`
            };
          }
        )
      ), this.unsubscribers.push(
        z.subscribe("host", "settings-updated", (t) => {
          const { widgetId: e, settings: s } = t.data;
          if (e === v) {
            const i = Q(
              {
                showCompleted: s.showCompleted ?? this.showCompleted,
                defaultPriority: s.defaultPriority ?? this.priorityInput
              },
              {
                showCompleted: this.showCompleted,
                defaultPriority: this.priorityInput
              }
            );
            this.showCompleted = i.showCompleted, this.priorityInput = i.defaultPriority, this.requestUpdate();
          }
        })
      ), queueMicrotask(() => ae(this));
    } catch (r) {
      le(this, r instanceof Error ? r.message : "mount-error");
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.unsubscribers.forEach((r) => r()), this.unsubscribers = [];
  }
  persist(r) {
    this.tasks = r, q.setState(bt, r);
  }
  saveSettings() {
    const r = Q({
      showCompleted: this.showCompleted,
      defaultPriority: this.priorityInput
    });
    ee(v, r);
  }
  createTask(r, t = this.priorityInput, e) {
    const s = r.trim();
    if (!s)
      return;
    const i = Date.now(), o = {
      id: String(i),
      title: s,
      priority: t,
      dueDate: e,
      status: "backlog",
      createdAt: i,
      updatedAt: i
    };
    return this.persist([o, ...this.tasks]), z.publish(v, "task-created", {
      id: o.id,
      title: o.title,
      priority: o.priority
    }), o;
  }
  deleteTask(r) {
    this.persist(this.tasks.filter((t) => t.id !== r));
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
    this.persist(e), z.publish(v, "task-moved", {
      id: r.id,
      from: r.status,
      to: t
    }), t === "done" && z.publish(v, "task-completed", { id: r.id });
  }
  handleDragStart(r, t) {
    this.draggedTaskId = r, t.dataTransfer && (t.dataTransfer.effectAllowed = "move", t.dataTransfer.setData("text/plain", r));
  }
  handleDragEnd() {
    this.draggedTaskId = null, this.dragOverColumn = null;
  }
  handleDragOver(r, t) {
    t.preventDefault(), t.dataTransfer && (t.dataTransfer.dropEffect = "move"), this.dragOverColumn !== r && (this.dragOverColumn = r);
  }
  handleDragLeave(r, t) {
    const e = t.relatedTarget;
    t.currentTarget.contains(e) || this.dragOverColumn === r && (this.dragOverColumn = null);
  }
  handleDrop(r, t) {
    var i;
    t.preventDefault();
    const e = this.draggedTaskId ?? ((i = t.dataTransfer) == null ? void 0 : i.getData("text/plain"));
    if (!e) return;
    const s = this.tasks.find((o) => o.id === e);
    s && this.moveTask(s, r), this.draggedTaskId = null, this.dragOverColumn = null;
  }
  renderColumn(r, t) {
    const e = this.tasks.filter((i) => !(r !== i.status || r === "done" && !this.showCompleted)), s = this.dragOverColumn === r;
    return x`
      <section
        class="column column-${r} ${s ? "column--drag-over" : ""}"
        @dragover=${(i) => this.handleDragOver(r, i)}
        @dragleave=${(i) => this.handleDragLeave(r, i)}
        @drop=${(i) => this.handleDrop(r, i)}
      >
        <h4>${t}</h4>
        <div class="list">
          ${e.map((i) => {
      const o = r !== "backlog", n = r !== "done", l = {
        backlog: "backlog",
        "in-progress": "backlog",
        done: "in-progress"
      }, a = {
        backlog: "in-progress",
        "in-progress": "done",
        done: "done"
      }, d = this.draggedTaskId === i.id;
      return x`
              <article
                class="task ${d ? "task--dragging" : ""}"
                draggable="true"
                @dragstart=${(h) => this.handleDragStart(i.id, h)}
                @dragend=${() => this.handleDragEnd()}
              >
                <div class="task-main">${i.title}</div>
                <div class="task-meta">
                  <span class="priority-pill ${i.priority}">${i.priority}</span>
                  <span class="task-created">${he(i.createdAt)}</span>
                </div>
                ${i.dueDate ? (() => {
        const { label: h, state: c } = ue(i.dueDate);
        return x`<div class="task-due task-due--${c}">
                    <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="2" y="3" width="12" height="12" rx="2"/><path d="M5 1v4M11 1v4M2 7h12"/>
                    </svg>
                    ${h}
                  </div>`;
      })() : null}
                <div class="task-actions">
                  ${o ? x`<button
                        class="icon-btn btn-back"
                        title="Move back"
                        @click=${() => this.moveTask(i, l[r])}
                      >
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M10 3L5 8l5 5"/>
                        </svg>
                      </button>` : null}
                  ${n ? x`<button
                        class="icon-btn btn-next"
                        title="Move forward"
                        @click=${() => this.moveTask(i, a[r])}
                      >
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M6 3l5 5-5 5"/>
                        </svg>
                      </button>` : null}
                  <button
                    class="icon-btn btn-delete"
                    title="Delete task"
                    @click=${() => this.deleteTask(i.id)}
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M3 4h10M6 4V2h4v2M5 4l.5 9h5L11 4"/>
                    </svg>
                  </button>
                </div>
              </article>
            `;
    })}
        </div>
      </section>
    `;
  }
  render() {
    return x`
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
      this.priorityInput = tt(
        r.target.value,
        this.priorityInput
      ), this.saveSettings();
    }}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            <button class="btn-primary" @click=${this.handleAddButtonClick}>
              Add Task
            </button>
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
p.styles = Ct`
    :host {
      display: block;
      height: 100%;
      font-family: system-ui, -apple-system, Segoe UI, sans-serif;
    }
    .surface {
      height: 100%;
      background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
      border-radius: 16px;
      border: 1px solid rgba(100, 116, 139, 0.2);
      padding: 12px;
      box-sizing: border-box;
      display: grid;
      grid-template-rows: auto auto 1fr;
      gap: 8px;
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
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
      padding: 6px 10px;
      background: rgba(255, 255, 255, 0.9);
      font-size: 0.82rem;
      transition: border-color 0.2s;
    }
    input:focus,
    select:focus {
      outline: none;
      border-color: #0284c7;
      background: #fff;
    }
    input[type='text'] {
      flex: 1;
    }
    .btn-primary {
      border: none;
      border-radius: 10px;
      padding: 6px 14px;
      background: #0284c7;
      color: #fff;
      font-size: 0.82rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }
    .btn-primary:hover {
      background: #0369a1;
    }
    .columns {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 8px;
      min-height: 0;
    }
    .column {
      border: 1px solid rgba(14, 165, 233, 0.15);
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.4);
      padding: 8px;
      display: flex;
      flex-direction: column;
      min-height: 0;
      transition: background 0.15s, border-color 0.15s, box-shadow 0.15s;
    }
    /* Backlog — slate/gray */
    .column-backlog {
      background: rgba(248, 250, 252, 0.7);
      border-color: rgba(100, 116, 139, 0.25);
    }
    .column-backlog h4 { color: #475569; }
    /* In Progress — amber */
    .column-in-progress {
      background: rgba(255, 251, 235, 0.75);
      border-color: rgba(217, 119, 6, 0.3);
    }
    .column-in-progress h4 { color: #b45309; }
    /* Done — green */
    .column-done {
      background: rgba(240, 253, 244, 0.75);
      border-color: rgba(21, 128, 61, 0.25);
    }
    .column-done h4 { color: #15803d; }
    /* Drag-over highlight */
    .column--drag-over {
      box-shadow: inset 0 0 0 2px currentColor;
      opacity: 0.9;
    }
    .column-backlog.column--drag-over  { box-shadow: inset 0 0 0 2px #64748b; background: rgba(226,232,240,0.6); }
    .column-in-progress.column--drag-over { box-shadow: inset 0 0 0 2px #d97706; background: rgba(253,230,138,0.5); }
    .column-done.column--drag-over     { box-shadow: inset 0 0 0 2px #16a34a; background: rgba(187,247,208,0.5); }
    .column h4 {
      margin: 0 0 6px 0;
      font-size: 0.72rem;
      text-transform: uppercase;
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
      padding: 8px;
      display: grid;
      gap: 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);
      transition: transform 0.1s, opacity 0.1s, box-shadow 0.1s;
      cursor: grab;
    }
    .task:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    }
    .task--dragging {
      opacity: 0.4;
      cursor: grabbing;
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
    .priority-pill.high {
      background: #fee2e2;
      color: #b91c1c;
    }
    .priority-pill.medium {
      background: #fef3c7;
      color: #b45309;
    }
    .priority-pill.low {
      background: #f0fdf4;
      color: #15803d;
    }
    .task-created {
      font-size: 0.65rem;
      color: #94a3b8;
      flex-shrink: 0;
    }
    .task-due {
      font-size: 0.68rem;
      display: flex;
      align-items: center;
      gap: 3px;
      font-weight: 500;
    }
    .task-due--normal  { color: #64748b; }
    .task-due--due-soon { color: #d97706; }
    .task-due--overdue  { color: #dc2626; font-weight: 600; }
    .task-actions {
      display: flex;
      gap: 4px;
      margin-top: 4px;
      border-top: 1px solid #f1f5f9;
      padding-top: 6px;
    }
    .icon-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border-radius: 6px;
      border: 1px solid transparent;
      background: transparent;
      cursor: pointer;
      padding: 0;
      transition: background 0.15s, border-color 0.15s, color 0.15s;
      color: #94a3b8;
      flex-shrink: 0;
    }
    .icon-btn svg { display: block; }
    .icon-btn.btn-back:hover  { background: #f1f5f9; border-color: #cbd5e1; color: #475569; }
    .icon-btn.btn-next:hover  { background: #eff6ff; border-color: #93c5fd; color: #2563eb; }
    .icon-btn.btn-delete:hover { background: #fff1f2; border-color: #fca5a5; color: #dc2626; }
    .icon-btn.btn-delete { margin-left: auto; }
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
$([
  k()
], p.prototype, "tasks", 2);
$([
  k()
], p.prototype, "titleInput", 2);
$([
  k()
], p.prototype, "dueInput", 2);
$([
  k()
], p.prototype, "priorityInput", 2);
$([
  k()
], p.prototype, "showCompleted", 2);
$([
  k()
], p.prototype, "draggedTaskId", 2);
$([
  k()
], p.prototype, "dragOverColumn", 2);
p = $([
  Vt("mb-taskboard")
], p);
export {
  p as MbTaskboardElement
};
