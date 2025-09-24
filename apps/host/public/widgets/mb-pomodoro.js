/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const k = globalThis, N = k.ShadowRoot && (k.ShadyCSS === void 0 || k.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, I = Symbol(), j = /* @__PURE__ */ new WeakMap();
let G = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== I) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (N && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = j.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && j.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const it = (r) => new G(typeof r == "string" ? r : r + "", void 0, I), rt = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((s, i, n) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + r[n + 1], r[0]);
  return new G(e, r, I);
}, nt = (r, t) => {
  if (N) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = k.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, r.appendChild(s);
  }
}, B = N ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return it(e);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ot, defineProperty: ht, getOwnPropertyDescriptor: at, getOwnPropertyNames: lt, getOwnPropertySymbols: ct, getPrototypeOf: dt } = Object, O = globalThis, q = O.trustedTypes, pt = q ? q.emptyScript : "", ut = O.reactiveElementPolyfillSupport, E = (r, t) => r, R = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? pt : null;
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
} }, Q = (r, t) => !ot(r, t), W = { attribute: !0, type: String, converter: R, reflect: !1, useDefault: !1, hasChanged: Q };
Symbol.metadata ??= Symbol("metadata"), O.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let b = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = W) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && ht(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: n } = at(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: i, set(o) {
      const l = i?.call(this);
      n?.call(this, o), this.requestUpdate(t, l, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? W;
  }
  static _$Ei() {
    if (this.hasOwnProperty(E("elementProperties"))) return;
    const t = dt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(E("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(E("properties"))) {
      const e = this.properties, s = [...lt(e), ...ct(e)];
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
      for (const i of s) e.unshift(B(i));
    } else t !== void 0 && e.push(B(t));
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
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const s of e.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return nt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$ET(t, e) {
    const s = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, s);
    if (i !== void 0 && s.reflect === !0) {
      const n = (s.converter?.toAttribute !== void 0 ? s.converter : R).toAttribute(e, s.type);
      this._$Em = t, n == null ? this.removeAttribute(i) : this.setAttribute(i, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const n = s.getPropertyOptions(i), o = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : R;
      this._$Em = i;
      const l = o.fromAttribute(e, n.type);
      this[i] = l ?? this._$Ej?.get(i) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, s) {
    if (t !== void 0) {
      const i = this.constructor, n = this[t];
      if (s ??= i.getPropertyOptions(t), !((s.hasChanged ?? Q)(n, e) || s.useDefault && s.reflect && n === this._$Ej?.get(t) && !this.hasAttribute(i._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: i, wrapped: n }, o) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, o ?? e ?? this[t]), n !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [i, n] of this._$Ep) this[i] = n;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [i, n] of s) {
        const { wrapped: o } = n, l = this[i];
        o !== !0 || this._$AL.has(i) || l === void 0 || this.C(i, void 0, n, l);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach((s) => s.hostUpdate?.()), this.update(e)) : this._$EM();
    } catch (s) {
      throw t = !1, this._$EM(), s;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
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
    this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
b.elementStyles = [], b.shadowRootOptions = { mode: "open" }, b[E("elementProperties")] = /* @__PURE__ */ new Map(), b[E("finalized")] = /* @__PURE__ */ new Map(), ut?.({ ReactiveElement: b }), (O.reactiveElementVersions ??= []).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const z = globalThis, U = z.trustedTypes, V = U ? U.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, X = "$lit$", f = `lit$${Math.random().toFixed(9).slice(2)}$`, tt = "?" + f, $t = `<${tt}>`, m = document, x = () => m.createComment(""), S = (r) => r === null || typeof r != "object" && typeof r != "function", D = Array.isArray, ft = (r) => D(r) || typeof r?.[Symbol.iterator] == "function", T = `[ 	
\f\r]`, y = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, J = /-->/g, K = />/g, _ = RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Y = /'/g, Z = /"/g, et = /^(?:script|style|textarea|title)$/i, _t = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), gt = _t(1), A = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), F = /* @__PURE__ */ new WeakMap(), g = m.createTreeWalker(m, 129);
function st(r, t) {
  if (!D(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return V !== void 0 ? V.createHTML(t) : t;
}
const mt = (r, t) => {
  const e = r.length - 1, s = [];
  let i, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = y;
  for (let l = 0; l < e; l++) {
    const h = r[l];
    let c, p, a = -1, u = 0;
    for (; u < h.length && (o.lastIndex = u, p = o.exec(h), p !== null); ) u = o.lastIndex, o === y ? p[1] === "!--" ? o = J : p[1] !== void 0 ? o = K : p[2] !== void 0 ? (et.test(p[2]) && (i = RegExp("</" + p[2], "g")), o = _) : p[3] !== void 0 && (o = _) : o === _ ? p[0] === ">" ? (o = i ?? y, a = -1) : p[1] === void 0 ? a = -2 : (a = o.lastIndex - p[2].length, c = p[1], o = p[3] === void 0 ? _ : p[3] === '"' ? Z : Y) : o === Z || o === Y ? o = _ : o === J || o === K ? o = y : (o = _, i = void 0);
    const $ = o === _ && r[l + 1].startsWith("/>") ? " " : "";
    n += o === y ? h + $t : a >= 0 ? (s.push(c), h.slice(0, a) + X + h.slice(a) + f + $) : h + f + (a === -2 ? l : $);
  }
  return [st(r, n + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class C {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let n = 0, o = 0;
    const l = t.length - 1, h = this.parts, [c, p] = mt(t, e);
    if (this.el = C.createElement(c, s), g.currentNode = this.el.content, e === 2 || e === 3) {
      const a = this.el.content.firstChild;
      a.replaceWith(...a.childNodes);
    }
    for (; (i = g.nextNode()) !== null && h.length < l; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const a of i.getAttributeNames()) if (a.endsWith(X)) {
          const u = p[o++], $ = i.getAttribute(a).split(f), M = /([.?@])?(.*)/.exec(u);
          h.push({ type: 1, index: n, name: M[2], strings: $, ctor: M[1] === "." ? At : M[1] === "?" ? vt : M[1] === "@" ? yt : H }), i.removeAttribute(a);
        } else a.startsWith(f) && (h.push({ type: 6, index: n }), i.removeAttribute(a));
        if (et.test(i.tagName)) {
          const a = i.textContent.split(f), u = a.length - 1;
          if (u > 0) {
            i.textContent = U ? U.emptyScript : "";
            for (let $ = 0; $ < u; $++) i.append(a[$], x()), g.nextNode(), h.push({ type: 2, index: ++n });
            i.append(a[u], x());
          }
        }
      } else if (i.nodeType === 8) if (i.data === tt) h.push({ type: 2, index: n });
      else {
        let a = -1;
        for (; (a = i.data.indexOf(f, a + 1)) !== -1; ) h.push({ type: 7, index: n }), a += f.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const s = m.createElement("template");
    return s.innerHTML = t, s;
  }
}
function v(r, t, e = r, s) {
  if (t === A) return t;
  let i = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const n = S(t) ? void 0 : t._$litDirective$;
  return i?.constructor !== n && (i?._$AO?.(!1), n === void 0 ? i = void 0 : (i = new n(r), i._$AT(r, e, s)), s !== void 0 ? (e._$Co ??= [])[s] = i : e._$Cl = i), i !== void 0 && (t = v(r, i._$AS(r, t.values), i, s)), t;
}
class bt {
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
    const { el: { content: e }, parts: s } = this._$AD, i = (t?.creationScope ?? m).importNode(e, !0);
    g.currentNode = i;
    let n = g.nextNode(), o = 0, l = 0, h = s[0];
    for (; h !== void 0; ) {
      if (o === h.index) {
        let c;
        h.type === 2 ? c = new P(n, n.nextSibling, this, t) : h.type === 1 ? c = new h.ctor(n, h.name, h.strings, this, t) : h.type === 6 && (c = new Et(n, this, t)), this._$AV.push(c), h = s[++l];
      }
      o !== h?.index && (n = g.nextNode(), o++);
    }
    return g.currentNode = m, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class P {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, s, i) {
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = i?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && t?.nodeType === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = v(this, t, e), S(t) ? t === d || t == null || t === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : t !== this._$AH && t !== A && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ft(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== d && S(this._$AH) ? this._$AA.nextSibling.data = t : this.T(m.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = C.createElement(st(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === i) this._$AH.p(e);
    else {
      const n = new bt(i, this), o = n.u(this.options);
      n.p(e), this.T(o), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = F.get(t.strings);
    return e === void 0 && F.set(t.strings, e = new C(t)), e;
  }
  k(t) {
    D(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const n of t) i === e.length ? e.push(s = new P(this.O(x()), this.O(x()), this, this.options)) : s = e[i], s._$AI(n), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const s = t.nextSibling;
      t.remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class H {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, n) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = d;
  }
  _$AI(t, e = this, s, i) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) t = v(this, t, e, 0), o = !S(t) || t !== this._$AH && t !== A, o && (this._$AH = t);
    else {
      const l = t;
      let h, c;
      for (t = n[0], h = 0; h < n.length - 1; h++) c = v(this, l[s + h], e, h), c === A && (c = this._$AH[h]), o ||= !S(c) || c !== this._$AH[h], c === d ? t = d : t !== d && (t += (c ?? "") + n[h + 1]), this._$AH[h] = c;
    }
    o && !i && this.j(t);
  }
  j(t) {
    t === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class At extends H {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === d ? void 0 : t;
  }
}
class vt extends H {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== d);
  }
}
class yt extends H {
  constructor(t, e, s, i, n) {
    super(t, e, s, i, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = v(this, t, e, 0) ?? d) === A) return;
    const s = this._$AH, i = t === d && s !== d || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, n = t !== d && (s === d || i);
    i && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Et {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    v(this, t);
  }
}
const wt = z.litHtmlPolyfillSupport;
wt?.(C, P), (z.litHtmlVersions ??= []).push("3.3.1");
const xt = (r, t, e) => {
  const s = e?.renderBefore ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const n = e?.renderBefore ?? null;
    s._$litPart$ = i = new P(t.insertBefore(x(), n), n, void 0, e ?? {});
  }
  return i._$AI(r), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const L = globalThis;
class w extends b {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = xt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return A;
  }
}
w._$litElement$ = !0, w.finalized = !0, L.litElementHydrateSupport?.({ LitElement: w });
const St = L.litElementPolyfillSupport;
St?.({ LitElement: w });
(L.litElementVersions ??= []).push("4.2.1");
const Ct = "widget-ready";
function Pt(r) {
  r.dispatchEvent(new CustomEvent(Ct, { bubbles: !0 }));
}
class Mt extends w {
  constructor() {
    super(...arguments), this.phase = "idle", this.remainingMs = 25 * 60 * 1e3, this.intervalId = null, this.tick = () => {
      this.remainingMs = Math.max(0, this.remainingMs - 1e3), this.remainingMs === 0 && (this.stop(), this.phase = this.phase === "work" ? "break" : "work", this.remainingMs = this.phase === "work" ? 25 * 60 * 1e3 : 5 * 60 * 1e3), this.requestUpdate();
    };
  }
  static {
    this.styles = rt`
    :host { display: block; font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; height: 100%; }
    .surface {
      height: 100%;
      background: linear-gradient(135deg, #fecaca 0%, #fca5a5 100%);
      border-radius: 16px;
      padding: 20px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      border: 1px solid rgba(239, 68, 68, 0.2);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.5);
    }
    .row {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
      min-height: 40px;
    }
    button {
      padding: 8px 16px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.9);
      cursor: pointer;
      font-weight: 500;
      font-size: 0.875rem;
      transition: all 0.2s ease;
      color: #374151;
    }
    button:hover {
      background: white;
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }
    .time {
      font-size: 2.5rem;
      font-weight: 700;
      color: #1f2937;
      font-variant-numeric: tabular-nums;
      letter-spacing: -0.025em;
    }
    .phase {
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .phase.work {
      background: #ef4444;
      color: white;
      box-shadow: 0 2px 4px rgba(239, 68, 68, 0.2);
    }
    .phase.break {
      background: #10b981;
      color: white;
      box-shadow: 0 2px 4px rgba(16, 185, 129, 0.2);
    }
    .phase.idle {
      background: #6b7280;
      color: white;
      box-shadow: 0 2px 4px rgba(107, 114, 128, 0.2);
    }
    .bar {
      height: 6px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 999px;
      overflow: hidden;
      margin-top: auto;
      border: 1px solid rgba(0, 0, 0, 0.05);
    }
    .bar > div {
      height: 100%;
      background: linear-gradient(90deg, #ef4444 0%, #dc2626 100%);
      width: 0%;
      transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      border-radius: 999px;
    }
  `;
  }
  connectedCallback() {
    super.connectedCallback(), queueMicrotask(() => Pt(this));
  }
  disconnectedCallback() {
    this.stop(), super.disconnectedCallback();
  }
  start() {
    this.intervalId || (this.phase === "idle" && (this.phase = "work"), this.intervalId = window.setInterval(this.tick, 1e3), this.requestUpdate());
  }
  pause() {
    this.intervalId && (window.clearInterval(this.intervalId), this.intervalId = null, this.requestUpdate());
  }
  stop() {
    this.intervalId && (window.clearInterval(this.intervalId), this.intervalId = null);
  }
  reset() {
    this.stop(), this.phase = "idle", this.remainingMs = 25 * 60 * 1e3, this.requestUpdate();
  }
  fmt(t) {
    const e = Math.floor(t / 1e3), s = Math.floor(e / 60), i = e % 60;
    return `${String(s).padStart(2, "0")}:${String(i).padStart(2, "0")}`;
  }
  render() {
    const t = this.phase === "break" ? 3e5 : 15e5, e = Math.max(0, Math.min(100, 100 - Math.round(this.remainingMs / t * 100)));
    return gt`
      <div class="surface">
        <div class="row">
          <div class="time">${this.fmt(this.remainingMs)}</div>
          <div class="phase ${this.phase}">${this.phase}</div>
        </div>
        <div class="row">
          <button @click=${() => this.start()} ?disabled=${!!this.intervalId}>Start</button>
          <button @click=${() => this.pause()} ?disabled=${!this.intervalId}>Pause</button>
          <button @click=${() => this.reset()}>Reset</button>
        </div>
        <div class="bar"><div style="width:${e}%"></div></div>
      </div>
    `;
  }
}
customElements.get("mb-pomodoro") || customElements.define("mb-pomodoro", Mt);
export {
  Mt as MbPomodoroElement
};
