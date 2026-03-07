/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const W = globalThis, et = W.ShadowRoot && (W.ShadyCSS === void 0 || W.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, st = Symbol(), nt = /* @__PURE__ */ new WeakMap();
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
const kt = (i) => new $t(typeof i == "string" ? i : i + "", void 0, st), Ct = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce((s, r, o) => s + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + i[o + 1], i[0]);
  return new $t(e, i, st);
}, Pt = (i, t) => {
  if (et) i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), r = W.litNonce;
    r !== void 0 && s.setAttribute("nonce", r), s.textContent = e.cssText, i.appendChild(s);
  }
}, at = et ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return kt(e);
})(i) : i;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Tt, defineProperty: Ot, getOwnPropertyDescriptor: Mt, getOwnPropertyNames: Dt, getOwnPropertySymbols: Ut, getPrototypeOf: Nt } = Object, b = globalThis, ct = b.trustedTypes, Rt = ct ? ct.emptyScript : "", Y = b.reactiveElementPolyfillSupport, T = (i, t) => i, j = { toAttribute(i, t) {
  switch (t) {
    case Boolean:
      i = i ? Rt : null;
      break;
    case Object:
    case Array:
      i = i == null ? i : JSON.stringify(i);
  }
  return i;
}, fromAttribute(i, t) {
  let e = i;
  switch (t) {
    case Boolean:
      e = i !== null;
      break;
    case Number:
      e = i === null ? null : Number(i);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(i);
      } catch {
        e = null;
      }
  }
  return e;
} }, it = (i, t) => !Tt(i, t), lt = { attribute: !0, type: String, converter: j, reflect: !1, useDefault: !1, hasChanged: it };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), b.litPropertyMetadata ?? (b.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let S = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = lt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), r = this.getPropertyDescriptor(t, s, e);
      r !== void 0 && Ot(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: r, set: o } = Mt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get: r, set(n) {
      const c = r == null ? void 0 : r.call(this);
      o == null || o.call(this, n), this.requestUpdate(t, c, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? lt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(T("elementProperties"))) return;
    const t = Nt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(T("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(T("properties"))) {
      const e = this.properties, s = [...Dt(e), ...Ut(e)];
      for (const r of s) this.createProperty(r, e[r]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [s, r] of e) this.elementProperties.set(s, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const r = this._$Eu(e, s);
      r !== void 0 && this._$Eh.set(r, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const r of s) e.unshift(at(r));
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
    return Pt(t, this.constructor.elementStyles), t;
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
    const s = this.constructor.elementProperties.get(t), r = this.constructor._$Eu(t, s);
    if (r !== void 0 && s.reflect === !0) {
      const n = (((o = s.converter) == null ? void 0 : o.toAttribute) !== void 0 ? s.converter : j).toAttribute(e, s.type);
      this._$Em = t, n == null ? this.removeAttribute(r) : this.setAttribute(r, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var o, n;
    const s = this.constructor, r = s._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const c = s.getPropertyOptions(r), a = typeof c.converter == "function" ? { fromAttribute: c.converter } : ((o = c.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? c.converter : j;
      this._$Em = r;
      const h = a.fromAttribute(e, c.type);
      this[r] = h ?? ((n = this._$Ej) == null ? void 0 : n.get(r)) ?? h, this._$Em = null;
    }
  }
  requestUpdate(t, e, s) {
    var r;
    if (t !== void 0) {
      const o = this.constructor, n = this[t];
      if (s ?? (s = o.getPropertyOptions(t)), !((s.hasChanged ?? it)(n, e) || s.useDefault && s.reflect && n === ((r = this._$Ej) == null ? void 0 : r.get(t)) && !this.hasAttribute(o._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: r, wrapped: o }, n) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, n ?? e ?? this[t]), o !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), r === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [o, n] of r) {
        const { wrapped: c } = n, a = this[o];
        c !== !0 || this._$AL.has(o) || a === void 0 || this.C(o, void 0, n, a);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (s = this._$EO) == null || s.forEach((r) => {
        var o;
        return (o = r.hostUpdate) == null ? void 0 : o.call(r);
      }), this.update(e)) : this._$EM();
    } catch (r) {
      throw t = !1, this._$EM(), r;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((s) => {
      var r;
      return (r = s.hostUpdated) == null ? void 0 : r.call(s);
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
S.elementStyles = [], S.shadowRootOptions = { mode: "open" }, S[T("elementProperties")] = /* @__PURE__ */ new Map(), S[T("finalized")] = /* @__PURE__ */ new Map(), Y == null || Y({ ReactiveElement: S }), (b.reactiveElementVersions ?? (b.reactiveElementVersions = [])).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const O = globalThis, L = O.trustedTypes, ht = L ? L.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, _t = "$lit$", g = `lit$${Math.random().toFixed(9).slice(2)}$`, yt = "?" + g, It = `<${yt}>`, A = document, D = () => A.createComment(""), U = (i) => i === null || typeof i != "object" && typeof i != "function", rt = Array.isArray, Ht = (i) => rt(i) || typeof (i == null ? void 0 : i[Symbol.iterator]) == "function", G = `[ 	
\f\r]`, C = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, dt = /-->/g, ut = />/g, $ = RegExp(`>|${G}(?:([^\\s"'>=/]+)(${G}*=${G}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), pt = /'/g, ft = /"/g, vt = /^(?:script|style|textarea|title)$/i, zt = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }), P = zt(1), w = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), gt = /* @__PURE__ */ new WeakMap(), y = A.createTreeWalker(A, 129);
function At(i, t) {
  if (!rt(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ht !== void 0 ? ht.createHTML(t) : t;
}
const Bt = (i, t) => {
  const e = i.length - 1, s = [];
  let r, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = C;
  for (let c = 0; c < e; c++) {
    const a = i[c];
    let h, u, l = -1, p = 0;
    for (; p < a.length && (n.lastIndex = p, u = n.exec(a), u !== null); ) p = n.lastIndex, n === C ? u[1] === "!--" ? n = dt : u[1] !== void 0 ? n = ut : u[2] !== void 0 ? (vt.test(u[2]) && (r = RegExp("</" + u[2], "g")), n = $) : u[3] !== void 0 && (n = $) : n === $ ? u[0] === ">" ? (n = r ?? C, l = -1) : u[1] === void 0 ? l = -2 : (l = n.lastIndex - u[2].length, h = u[1], n = u[3] === void 0 ? $ : u[3] === '"' ? ft : pt) : n === ft || n === pt ? n = $ : n === dt || n === ut ? n = C : (n = $, r = void 0);
    const f = n === $ && i[c + 1].startsWith("/>") ? " " : "";
    o += n === C ? a + It : l >= 0 ? (s.push(h), a.slice(0, l) + _t + a.slice(l) + g + f) : a + g + (l === -2 ? c : f);
  }
  return [At(i, o + (i[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class N {
  constructor({ strings: t, _$litType$: e }, s) {
    let r;
    this.parts = [];
    let o = 0, n = 0;
    const c = t.length - 1, a = this.parts, [h, u] = Bt(t, e);
    if (this.el = N.createElement(h, s), y.currentNode = this.el.content, e === 2 || e === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (r = y.nextNode()) !== null && a.length < c; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const l of r.getAttributeNames()) if (l.endsWith(_t)) {
          const p = u[n++], f = r.getAttribute(l).split(g), H = /([.?@])?(.*)/.exec(p);
          a.push({ type: 1, index: o, name: H[2], strings: f, ctor: H[1] === "." ? jt : H[1] === "?" ? Lt : H[1] === "@" ? qt : V }), r.removeAttribute(l);
        } else l.startsWith(g) && (a.push({ type: 6, index: o }), r.removeAttribute(l));
        if (vt.test(r.tagName)) {
          const l = r.textContent.split(g), p = l.length - 1;
          if (p > 0) {
            r.textContent = L ? L.emptyScript : "";
            for (let f = 0; f < p; f++) r.append(l[f], D()), y.nextNode(), a.push({ type: 2, index: ++o });
            r.append(l[p], D());
          }
        }
      } else if (r.nodeType === 8) if (r.data === yt) a.push({ type: 2, index: o });
      else {
        let l = -1;
        for (; (l = r.data.indexOf(g, l + 1)) !== -1; ) a.push({ type: 7, index: o }), l += g.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const s = A.createElement("template");
    return s.innerHTML = t, s;
  }
}
function E(i, t, e = i, s) {
  var n, c;
  if (t === w) return t;
  let r = s !== void 0 ? (n = e._$Co) == null ? void 0 : n[s] : e._$Cl;
  const o = U(t) ? void 0 : t._$litDirective$;
  return (r == null ? void 0 : r.constructor) !== o && ((c = r == null ? void 0 : r._$AO) == null || c.call(r, !1), o === void 0 ? r = void 0 : (r = new o(i), r._$AT(i, e, s)), s !== void 0 ? (e._$Co ?? (e._$Co = []))[s] = r : e._$Cl = r), r !== void 0 && (t = E(i, r._$AS(i, t.values), r, s)), t;
}
class Wt {
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
    const { el: { content: e }, parts: s } = this._$AD, r = ((t == null ? void 0 : t.creationScope) ?? A).importNode(e, !0);
    y.currentNode = r;
    let o = y.nextNode(), n = 0, c = 0, a = s[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let h;
        a.type === 2 ? h = new R(o, o.nextSibling, this, t) : a.type === 1 ? h = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (h = new Kt(o, this, t)), this._$AV.push(h), a = s[++c];
      }
      n !== (a == null ? void 0 : a.index) && (o = y.nextNode(), n++);
    }
    return y.currentNode = A, r;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class R {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, s, r) {
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = r, this._$Cv = (r == null ? void 0 : r.isConnected) ?? !0;
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
    t = E(this, t, e), U(t) ? t === d || t == null || t === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : t !== this._$AH && t !== w && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ht(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== d && U(this._$AH) ? this._$AA.nextSibling.data = t : this.T(A.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: e, _$litType$: s } = t, r = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = N.createElement(At(s.h, s.h[0]), this.options)), s);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === r) this._$AH.p(e);
    else {
      const n = new Wt(r, this), c = n.u(this.options);
      n.p(e), this.T(c), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = gt.get(t.strings);
    return e === void 0 && gt.set(t.strings, e = new N(t)), e;
  }
  k(t) {
    rt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, r = 0;
    for (const o of t) r === e.length ? e.push(s = new R(this.O(D()), this.O(D()), this, this.options)) : s = e[r], s._$AI(o), r++;
    r < e.length && (this._$AR(s && s._$AB.nextSibling, r), e.length = r);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, e); t !== this._$AB; ) {
      const r = t.nextSibling;
      t.remove(), t = r;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class V {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, r, o) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = t, this.name = e, this._$AM = r, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = d;
  }
  _$AI(t, e = this, s, r) {
    const o = this.strings;
    let n = !1;
    if (o === void 0) t = E(this, t, e, 0), n = !U(t) || t !== this._$AH && t !== w, n && (this._$AH = t);
    else {
      const c = t;
      let a, h;
      for (t = o[0], a = 0; a < o.length - 1; a++) h = E(this, c[s + a], e, a), h === w && (h = this._$AH[a]), n || (n = !U(h) || h !== this._$AH[a]), h === d ? t = d : t !== d && (t += (h ?? "") + o[a + 1]), this._$AH[a] = h;
    }
    n && !r && this.j(t);
  }
  j(t) {
    t === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class jt extends V {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === d ? void 0 : t;
  }
}
class Lt extends V {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== d);
  }
}
class qt extends V {
  constructor(t, e, s, r, o) {
    super(t, e, s, r, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = E(this, t, e, 0) ?? d) === w) return;
    const s = this._$AH, r = t === d && s !== d || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, o = t !== d && (s === d || r);
    r && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Kt {
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
const J = O.litHtmlPolyfillSupport;
J == null || J(N, R), (O.litHtmlVersions ?? (O.litHtmlVersions = [])).push("3.3.1");
const Vt = (i, t, e) => {
  const s = (e == null ? void 0 : e.renderBefore) ?? t;
  let r = s._$litPart$;
  if (r === void 0) {
    const o = (e == null ? void 0 : e.renderBefore) ?? null;
    s._$litPart$ = r = new R(t.insertBefore(D(), o), o, void 0, e ?? {});
  }
  return r._$AI(i), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const v = globalThis;
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Vt(e, this.renderRoot, this.renderOptions);
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
    return w;
  }
}
var mt;
M._$litElement$ = !0, M.finalized = !0, (mt = v.litElementHydrateSupport) == null || mt.call(v, { LitElement: M });
const Z = v.litElementPolyfillSupport;
Z == null || Z({ LitElement: M });
(v.litElementVersions ?? (v.litElementVersions = [])).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ft = (i) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(i, t);
  }) : customElements.define(i, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Yt = { attribute: !0, type: String, converter: j, reflect: !1, hasChanged: it }, Gt = (i = Yt, t, e) => {
  const { kind: s, metadata: r } = e;
  let o = globalThis.litPropertyMetadata.get(r);
  if (o === void 0 && globalThis.litPropertyMetadata.set(r, o = /* @__PURE__ */ new Map()), s === "setter" && ((i = Object.create(i)).wrapped = !0), o.set(e.name, i), s === "accessor") {
    const { name: n } = e;
    return { set(c) {
      const a = t.get.call(this);
      t.set.call(this, c), this.requestUpdate(n, a, i);
    }, init(c) {
      return c !== void 0 && this.C(n, void 0, i, c), c;
    } };
  }
  if (s === "setter") {
    const { name: n } = e;
    return function(c) {
      const a = this[n];
      t.call(this, c), this.requestUpdate(n, a, i);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function Jt(i) {
  return (t, e) => typeof e == "object" ? Gt(i, t, e) : ((s, r, o) => {
    const n = r.hasOwnProperty(o);
    return r.constructor.createProperty(o, s), n ? Object.getOwnPropertyDescriptor(r, o) : void 0;
  })(i, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function I(i) {
  return Jt({ ...i, state: !0, attribute: !1 });
}
function Zt() {
  return {
    bridge: {},
    commandHandlers: /* @__PURE__ */ new Map(),
    instances: /* @__PURE__ */ new Map()
  };
}
function ot() {
  const i = globalThis;
  return i.__MYBOARD_SDK_RUNTIME__ || (i.__MYBOARD_SDK_RUNTIME__ = Zt()), i.__MYBOARD_SDK_RUNTIME__;
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
    s && s.size > 0 && s.forEach((r) => {
      try {
        r(e);
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
          Object.entries(e).forEach(([s, r]) => {
            this.states.set(s, r);
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
const X = ot(), St = X.instances.get("widget-store") ?? new Qt();
X.instances.has("widget-store") || X.instances.set("widget-store", St);
const q = St, wt = ot(), Et = (i) => `${i}:settings`;
function F() {
  return wt.bridge;
}
function Xt() {
  return wt.commandHandlers;
}
function te(i) {
  const t = F();
  return t.getWidgetSettings ? t.getWidgetSettings(i) : q.getState(Et(i));
}
function ee(i, t) {
  const e = F();
  if (e.setWidgetSettings) {
    e.setWidgetSettings(i, t);
    return;
  }
  q.setState(Et(i), t);
}
function se(i) {
  var e;
  const t = F();
  if (!t.beforePublishEvent) return !0;
  try {
    return t.beforePublishEvent(i);
  } catch (s) {
    return (typeof process > "u" || ((e = process.env) == null ? void 0 : e.NODE_ENV) !== "production") && console.warn("[host-bridge] beforePublishEvent failed; dropping event", s), !1;
  }
}
function ie(i, t) {
  const e = F();
  if (e.registerWidgetCommandHandler)
    return e.registerWidgetCommandHandler(i, t);
  const s = Xt();
  return s.set(i, t), () => {
    s.get(i) === t && s.delete(i);
  };
}
const x = ot();
x.instances.has("event-subscribers") || x.instances.set("event-subscribers", /* @__PURE__ */ new Map());
class re {
  get subscribers() {
    return x.instances.get("event-subscribers");
  }
  /**
   * Publish an event from a widget.
   * Event type is automatically namespaced as `widgetId:eventType`.
   */
  publish(t, e, s) {
    const r = {
      widgetId: t,
      type: e,
      data: s,
      timestamp: Date.now()
    };
    if (!se(r))
      return;
    const o = `${t}:${e}`, n = this.subscribers.get(o);
    n && n.size > 0 && n.forEach((c) => {
      try {
        c(r);
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
    const r = `${t}:${e}`;
    return this.subscribers.has(r) || this.subscribers.set(r, /* @__PURE__ */ new Set()), this.subscribers.get(r).add(s), () => {
      const o = this.subscribers.get(r);
      o && (o.delete(s), o.size === 0 && this.subscribers.delete(r));
    };
  }
  /**
   * Clear all subscriptions (useful for cleanup in tests).
   */
  clear() {
    this.subscribers.clear();
  }
}
const xt = x.instances.get("event-bus") ?? new re();
x.instances.has("event-bus") || x.instances.set("event-bus", xt);
const z = xt, oe = "widget-ready", ne = "widget-error";
function ae(i) {
  i.dispatchEvent(new CustomEvent(oe, { bubbles: !0 }));
}
function ce(i, t) {
  const e = { reason: t };
  i.dispatchEvent(
    new CustomEvent(ne, { bubbles: !0, detail: e })
  );
}
var le = Object.defineProperty, he = Object.getOwnPropertyDescriptor, k = (i, t, e, s) => {
  for (var r = s > 1 ? void 0 : s ? he(t, e) : t, o = i.length - 1, n; o >= 0; o--)
    (n = i[o]) && (r = (s ? n(t, e, r) : n(r)) || r);
  return s && r && le(t, e, r), r;
};
const _ = "taskboard", bt = "taskboard:tasks", K = {
  showCompleted: !0,
  defaultPriority: "medium"
};
function tt(i, t = K.defaultPriority) {
  return i === "low" || i === "medium" || i === "high" ? i : t;
}
function Q(i, t = K) {
  return {
    showCompleted: (i == null ? void 0 : i.showCompleted) ?? t.showCompleted,
    defaultPriority: tt(
      i == null ? void 0 : i.defaultPriority,
      t.defaultPriority
    )
  };
}
function B(i) {
  return typeof i != "string" ? null : i.trim() || null;
}
let m = class extends M {
  constructor() {
    super(...arguments), this.tasks = [], this.titleInput = "", this.dueInput = "", this.priorityInput = K.defaultPriority, this.showCompleted = K.showCompleted, this.unsubscribers = [], this.handleAddButtonClick = () => {
      this.createTask(
        this.titleInput,
        this.priorityInput,
        this.dueInput || void 0
      ) && (this.titleInput = "", this.dueInput = "");
    }, this.toggleShowCompleted = (i) => {
      this.showCompleted = i.target.checked, this.saveSettings(), this.requestUpdate();
    };
  }
  connectedCallback() {
    super.connectedCallback();
    try {
      this.tasks = q.getState(bt) ?? [];
      const i = Q(
        te(_)
      );
      this.showCompleted = i.showCompleted, this.priorityInput = i.defaultPriority, this.unsubscribers.push(
        ie(
          _,
          async (t) => {
            const { commandType: e, payload: s } = t;
            if (e === "task.create") {
              const r = B(s == null ? void 0 : s.title) ?? B(s == null ? void 0 : s.text) ?? (typeof (s == null ? void 0 : s.note) == "object" && s.note && B(s.note.text) ? B(
                s.note.text
              ) : null) ?? "Automated Task", o = tt(
                s == null ? void 0 : s.priority,
                this.priorityInput
              ), n = typeof (s == null ? void 0 : s.dueDate) == "string" ? s.dueDate : void 0, c = this.createTask(r, o, n);
              return c ? { ok: !0, result: { taskId: c.id } } : {
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
              const r = this.tasks.find((n) => n.id === s.id);
              if (!r)
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
              return this.moveTask(r, o[r.status]), { ok: !0 };
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
          if (e === _) {
            const r = Q(
              {
                showCompleted: s.showCompleted ?? this.showCompleted,
                defaultPriority: s.defaultPriority ?? this.priorityInput
              },
              {
                showCompleted: this.showCompleted,
                defaultPriority: this.priorityInput
              }
            );
            this.showCompleted = r.showCompleted, this.priorityInput = r.defaultPriority, this.requestUpdate();
          }
        })
      ), queueMicrotask(() => ae(this));
    } catch (i) {
      ce(this, i instanceof Error ? i.message : "mount-error");
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.unsubscribers.forEach((i) => i()), this.unsubscribers = [];
  }
  persist(i) {
    this.tasks = i, q.setState(bt, i);
  }
  saveSettings() {
    const i = Q({
      showCompleted: this.showCompleted,
      defaultPriority: this.priorityInput
    });
    ee(_, i);
  }
  createTask(i, t = this.priorityInput, e) {
    const s = i.trim();
    if (!s)
      return;
    const r = Date.now(), o = {
      id: String(r),
      title: s,
      priority: t,
      dueDate: e,
      status: "backlog",
      createdAt: r,
      updatedAt: r
    };
    return this.persist([o, ...this.tasks]), z.publish(_, "task-created", {
      id: o.id,
      title: o.title,
      priority: o.priority
    }), o;
  }
  deleteTask(i) {
    this.persist(this.tasks.filter((t) => t.id !== i));
  }
  moveTask(i, t) {
    if (i.status === t) return;
    const e = this.tasks.map(
      (s) => s.id === i.id ? {
        ...s,
        status: t,
        updatedAt: Date.now()
      } : s
    );
    this.persist(e), z.publish(_, "task-moved", {
      id: i.id,
      from: i.status,
      to: t
    }), t === "done" && z.publish(_, "task-completed", { id: i.id });
  }
  renderColumn(i, t) {
    const e = this.tasks.filter((s) => !(i !== s.status || i === "done" && !this.showCompleted));
    return P`
      <section class="column">
        <h4>${t}</h4>
        <div class="list">
          ${e.map((s) => {
      const r = i !== "backlog", o = i !== "done", n = {
        backlog: "backlog",
        "in-progress": "backlog",
        done: "in-progress"
      }, c = {
        backlog: "in-progress",
        "in-progress": "done",
        done: "done"
      };
      return P`
              <article class="task">
                <div class="task-main">${s.title}</div>
                <div class="task-meta">
                  <span class="priority-pill ${s.priority}"
                    >${s.priority}</span
                  >
                  <span>${s.dueDate ? `Due ${s.dueDate}` : ""}</span>
                </div>
                <div class="task-actions">
                  ${r ? P`<button
                        class="btn-ghost"
                        @click=${() => this.moveTask(s, n[i])}
                      >
                        Back
                      </button>` : null}
                  ${o ? P`<button
                        class="btn-ghost"
                        @click=${() => this.moveTask(s, c[i])}
                      >
                        Next
                      </button>` : null}
                  <button
                    class="btn-ghost"
                    style="margin-left:auto;color:#ef4444;border-color:rgba(239,68,68,0.2)"
                    @click=${() => this.deleteTask(s.id)}
                  >
                    Delete
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
    return P`
      <div class="surface">
        <div class="row">
          <div class="input-group">
            <input
              type="text"
              placeholder="What needs to be done?"
              .value=${this.titleInput}
              @input=${(i) => {
      this.titleInput = i.target.value;
    }}
              @keydown=${(i) => {
      i.key === "Enter" && this.handleAddButtonClick();
    }}
            />
            <input
              type="date"
              .value=${this.dueInput}
              @input=${(i) => {
      this.dueInput = i.target.value;
    }}
            />
            <select
              .value=${this.priorityInput}
              @change=${(i) => {
      this.priorityInput = tt(
        i.target.value,
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
m.styles = Ct`
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
      background: rgba(255, 255, 255, 0.5);
      border-color: #0369a1;
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
    }
    .column h4 {
      margin: 0 0 6px 0;
      font-size: 0.72rem;
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
      padding: 8px;
      display: grid;
      gap: 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);
      transition: transform 0.1s;
    }
    .task:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
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
k([
  I()
], m.prototype, "tasks", 2);
k([
  I()
], m.prototype, "titleInput", 2);
k([
  I()
], m.prototype, "dueInput", 2);
k([
  I()
], m.prototype, "priorityInput", 2);
k([
  I()
], m.prototype, "showCompleted", 2);
m = k([
  Ft("mb-taskboard")
], m);
export {
  m as MbTaskboardElement
};
