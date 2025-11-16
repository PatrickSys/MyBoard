/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const R = globalThis, L = R.ShadowRoot && (R.ShadyCSS === void 0 || R.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, I = Symbol(), F = /* @__PURE__ */ new WeakMap();
let it = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== I) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (L && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = F.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && F.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const at = (r) => new it(typeof r == "string" ? r : r + "", void 0, I), ht = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((i, s, o) => i + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + r[o + 1], r[0]);
  return new it(e, r, I);
}, lt = (r, t) => {
  if (L) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), s = R.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, r.appendChild(i);
  }
}, K = L ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return at(e);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ct, defineProperty: dt, getOwnPropertyDescriptor: pt, getOwnPropertyNames: ut, getOwnPropertySymbols: $t, getPrototypeOf: ft } = Object, z = globalThis, G = z.trustedTypes, mt = G ? G.emptyScript : "", gt = z.reactiveElementPolyfillSupport, S = (r, t) => r, N = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? mt : null;
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
} }, W = (r, t) => !ct(r, t), Y = { attribute: !0, type: String, converter: N, reflect: !1, useDefault: !1, hasChanged: W };
Symbol.metadata ??= Symbol("metadata"), z.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let b = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Y) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && dt(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: s, set: o } = pt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get: s, set(n) {
      const h = s?.call(this);
      o?.call(this, n), this.requestUpdate(t, h, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Y;
  }
  static _$Ei() {
    if (this.hasOwnProperty(S("elementProperties"))) return;
    const t = ft(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(S("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(S("properties"))) {
      const e = this.properties, i = [...ut(e), ...$t(e)];
      for (const s of i) this.createProperty(s, e[s]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, s] of e) this.elementProperties.set(i, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const s = this._$Eu(e, i);
      s !== void 0 && this._$Eh.set(s, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const s of i) e.unshift(K(s));
    } else t !== void 0 && e.push(K(t));
    return e;
  }
  static _$Eu(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
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
    for (const i of e.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return lt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$ET(t, e) {
    const i = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, i);
    if (s !== void 0 && i.reflect === !0) {
      const o = (i.converter?.toAttribute !== void 0 ? i.converter : N).toAttribute(e, i.type);
      this._$Em = t, o == null ? this.removeAttribute(s) : this.setAttribute(s, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, s = i._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const o = i.getPropertyOptions(s), n = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : N;
      this._$Em = s;
      const h = n.fromAttribute(e, o.type);
      this[s] = h ?? this._$Ej?.get(s) ?? h, this._$Em = null;
    }
  }
  requestUpdate(t, e, i) {
    if (t !== void 0) {
      const s = this.constructor, o = this[t];
      if (i ??= s.getPropertyOptions(t), !((i.hasChanged ?? W)(o, e) || i.useDefault && i.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(s._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: s, wrapped: o }, n) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, n ?? e ?? this[t]), o !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), s === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [s, o] of this._$Ep) this[s] = o;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [s, o] of i) {
        const { wrapped: n } = o, h = this[s];
        n !== !0 || this._$AL.has(s) || h === void 0 || this.C(s, void 0, o, h);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach((i) => i.hostUpdate?.()), this.update(e)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
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
b.elementStyles = [], b.shadowRootOptions = { mode: "open" }, b[S("elementProperties")] = /* @__PURE__ */ new Map(), b[S("finalized")] = /* @__PURE__ */ new Map(), gt?.({ ReactiveElement: b }), (z.reactiveElementVersions ??= []).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const B = globalThis, k = B.trustedTypes, J = k ? k.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, st = "$lit$", f = `lit$${Math.random().toFixed(9).slice(2)}$`, rt = "?" + f, _t = `<${rt}>`, v = document, P = () => v.createComment(""), O = (r) => r === null || typeof r != "object" && typeof r != "function", q = Array.isArray, yt = (r) => q(r) || typeof r?.[Symbol.iterator] == "function", D = `[ 	
\f\r]`, x = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Z = /-->/g, Q = />/g, g = RegExp(`>|${D}(?:([^\\s"'>=/]+)(${D}*=${D}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), X = /'/g, tt = /"/g, ot = /^(?:script|style|textarea|title)$/i, vt = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), _ = vt(1), A = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), et = /* @__PURE__ */ new WeakMap(), y = v.createTreeWalker(v, 129);
function nt(r, t) {
  if (!q(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return J !== void 0 ? J.createHTML(t) : t;
}
const bt = (r, t) => {
  const e = r.length - 1, i = [];
  let s, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = x;
  for (let h = 0; h < e; h++) {
    const a = r[h];
    let c, p, l = -1, u = 0;
    for (; u < a.length && (n.lastIndex = u, p = n.exec(a), p !== null); ) u = n.lastIndex, n === x ? p[1] === "!--" ? n = Z : p[1] !== void 0 ? n = Q : p[2] !== void 0 ? (ot.test(p[2]) && (s = RegExp("</" + p[2], "g")), n = g) : p[3] !== void 0 && (n = g) : n === g ? p[0] === ">" ? (n = s ?? x, l = -1) : p[1] === void 0 ? l = -2 : (l = n.lastIndex - p[2].length, c = p[1], n = p[3] === void 0 ? g : p[3] === '"' ? tt : X) : n === tt || n === X ? n = g : n === Z || n === Q ? n = x : (n = g, s = void 0);
    const $ = n === g && r[h + 1].startsWith("/>") ? " " : "";
    o += n === x ? a + _t : l >= 0 ? (i.push(c), a.slice(0, l) + st + a.slice(l) + f + $) : a + f + (l === -2 ? h : $);
  }
  return [nt(r, o + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class U {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let o = 0, n = 0;
    const h = t.length - 1, a = this.parts, [c, p] = bt(t, e);
    if (this.el = U.createElement(c, i), y.currentNode = this.el.content, e === 2 || e === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (s = y.nextNode()) !== null && a.length < h; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const l of s.getAttributeNames()) if (l.endsWith(st)) {
          const u = p[n++], $ = s.getAttribute(l).split(f), H = /([.?@])?(.*)/.exec(u);
          a.push({ type: 1, index: o, name: H[2], strings: $, ctor: H[1] === "." ? Et : H[1] === "?" ? wt : H[1] === "@" ? xt : j }), s.removeAttribute(l);
        } else l.startsWith(f) && (a.push({ type: 6, index: o }), s.removeAttribute(l));
        if (ot.test(s.tagName)) {
          const l = s.textContent.split(f), u = l.length - 1;
          if (u > 0) {
            s.textContent = k ? k.emptyScript : "";
            for (let $ = 0; $ < u; $++) s.append(l[$], P()), y.nextNode(), a.push({ type: 2, index: ++o });
            s.append(l[u], P());
          }
        }
      } else if (s.nodeType === 8) if (s.data === rt) a.push({ type: 2, index: o });
      else {
        let l = -1;
        for (; (l = s.data.indexOf(f, l + 1)) !== -1; ) a.push({ type: 7, index: o }), l += f.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const i = v.createElement("template");
    return i.innerHTML = t, i;
  }
}
function E(r, t, e = r, i) {
  if (t === A) return t;
  let s = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const o = O(t) ? void 0 : t._$litDirective$;
  return s?.constructor !== o && (s?._$AO?.(!1), o === void 0 ? s = void 0 : (s = new o(r), s._$AT(r, e, i)), i !== void 0 ? (e._$Co ??= [])[i] = s : e._$Cl = s), s !== void 0 && (t = E(r, s._$AS(r, t.values), s, i)), t;
}
class At {
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
    const { el: { content: e }, parts: i } = this._$AD, s = (t?.creationScope ?? v).importNode(e, !0);
    y.currentNode = s;
    let o = y.nextNode(), n = 0, h = 0, a = i[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let c;
        a.type === 2 ? c = new T(o, o.nextSibling, this, t) : a.type === 1 ? c = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (c = new St(o, this, t)), this._$AV.push(c), a = i[++h];
      }
      n !== a?.index && (o = y.nextNode(), n++);
    }
    return y.currentNode = v, s;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class T {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, i, s) {
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = s, this._$Cv = s?.isConnected ?? !0;
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
    t = E(this, t, e), O(t) ? t === d || t == null || t === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : t !== this._$AH && t !== A && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : yt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== d && O(this._$AH) ? this._$AA.nextSibling.data = t : this.T(v.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = U.createElement(nt(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === s) this._$AH.p(e);
    else {
      const o = new At(s, this), n = o.u(this.options);
      o.p(e), this.T(n), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = et.get(t.strings);
    return e === void 0 && et.set(t.strings, e = new U(t)), e;
  }
  k(t) {
    q(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const o of t) s === e.length ? e.push(i = new T(this.O(P()), this.O(P()), this, this.options)) : i = e[s], i._$AI(o), s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const i = t.nextSibling;
      t.remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class j {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, s, o) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = d;
  }
  _$AI(t, e = this, i, s) {
    const o = this.strings;
    let n = !1;
    if (o === void 0) t = E(this, t, e, 0), n = !O(t) || t !== this._$AH && t !== A, n && (this._$AH = t);
    else {
      const h = t;
      let a, c;
      for (t = o[0], a = 0; a < o.length - 1; a++) c = E(this, h[i + a], e, a), c === A && (c = this._$AH[a]), n ||= !O(c) || c !== this._$AH[a], c === d ? t = d : t !== d && (t += (c ?? "") + o[a + 1]), this._$AH[a] = c;
    }
    n && !s && this.j(t);
  }
  j(t) {
    t === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Et extends j {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === d ? void 0 : t;
  }
}
class wt extends j {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== d);
  }
}
class xt extends j {
  constructor(t, e, i, s, o) {
    super(t, e, i, s, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = E(this, t, e, 0) ?? d) === A) return;
    const i = this._$AH, s = t === d && i !== d || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, o = t !== d && (i === d || s);
    s && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class St {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    E(this, t);
  }
}
const Ct = B.litHtmlPolyfillSupport;
Ct?.(U, T), (B.litHtmlVersions ??= []).push("3.3.1");
const Pt = (r, t, e) => {
  const i = e?.renderBefore ?? t;
  let s = i._$litPart$;
  if (s === void 0) {
    const o = e?.renderBefore ?? null;
    i._$litPart$ = s = new T(t.insertBefore(P(), o), o, void 0, e ?? {});
  }
  return s._$AI(r), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const V = globalThis;
class C extends b {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Pt(e, this.renderRoot, this.renderOptions);
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
C._$litElement$ = !0, C.finalized = !0, V.litElementHydrateSupport?.({ LitElement: C });
const Ot = V.litElementPolyfillSupport;
Ot?.({ LitElement: C });
(V.litElementVersions ??= []).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ut = (r) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(r, t);
  }) : customElements.define(r, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Tt = { attribute: !0, type: String, converter: N, reflect: !1, hasChanged: W }, Mt = (r = Tt, t, e) => {
  const { kind: i, metadata: s } = e;
  let o = globalThis.litPropertyMetadata.get(s);
  if (o === void 0 && globalThis.litPropertyMetadata.set(s, o = /* @__PURE__ */ new Map()), i === "setter" && ((r = Object.create(r)).wrapped = !0), o.set(e.name, r), i === "accessor") {
    const { name: n } = e;
    return { set(h) {
      const a = t.get.call(this);
      t.set.call(this, h), this.requestUpdate(n, a, r);
    }, init(h) {
      return h !== void 0 && this.C(n, void 0, r, h), h;
    } };
  }
  if (i === "setter") {
    const { name: n } = e;
    return function(h) {
      const a = this[n];
      t.call(this, h), this.requestUpdate(n, a, r);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function Ht(r) {
  return (t, e) => typeof e == "object" ? Mt(r, t, e) : ((i, s, o) => {
    const n = s.hasOwnProperty(o);
    return s.constructor.createProperty(o, i), n ? Object.getOwnPropertyDescriptor(s, o) : void 0;
  })(r, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function M(r) {
  return Ht({ ...r, state: !0, attribute: !1 });
}
const Rt = "widget-ready";
function Nt(r) {
  r.dispatchEvent(new CustomEvent(Rt, { bubbles: !0 }));
}
var kt = Object.defineProperty, zt = Object.getOwnPropertyDescriptor, w = (r, t, e, i) => {
  for (var s = i > 1 ? void 0 : i ? zt(t, e) : t, o = r.length - 1, n; o >= 0; o--)
    (n = r[o]) && (s = (i ? n(t, e, s) : n(s)) || s);
  return i && s && kt(t, e, s), s;
};
let m = class extends C {
  constructor() {
    super(...arguments), this.weather = null, this.loading = !1, this.error = "", this.location = "", this.isEditing = !1, this.STORAGE_KEY = "mb-weather-location";
  }
  connectedCallback() {
    super.connectedCallback(), this.loadLocation(), queueMicrotask(() => Nt(this));
  }
  loadLocation() {
    try {
      const r = localStorage.getItem(this.STORAGE_KEY);
      r && (this.location = r, this.fetchWeather());
    } catch (r) {
      console.error("Failed to load location:", r);
    }
  }
  saveLocation() {
    try {
      localStorage.setItem(this.STORAGE_KEY, this.location);
    } catch (r) {
      console.error("Failed to save location:", r);
    }
  }
  async fetchWeather() {
    if (this.location) {
      this.loading = !0, this.error = "";
      try {
        const r = await fetch(
          `https://wttr.in/${encodeURIComponent(this.location)}?format=j1`
        );
        if (!r.ok)
          throw new Error("Location not found");
        const t = await r.json(), e = t.current_condition[0];
        this.weather = {
          temp: Math.round(parseFloat(e.temp_C)),
          condition: e.weatherDesc[0].value,
          location: t.nearest_area[0].areaName[0].value,
          humidity: parseInt(e.humidity),
          wind: Math.round(parseFloat(e.windspeedKmph))
        }, this.error = "";
      } catch (r) {
        this.error = r instanceof Error ? r.message : "Failed to fetch weather", this.weather = null;
      } finally {
        this.loading = !1;
      }
    }
  }
  handleSubmit(r) {
    r.preventDefault();
    const i = r.target.querySelector("input").value.trim();
    i && (this.location = i, this.saveLocation(), this.fetchWeather(), this.isEditing = !1);
  }
  render() {
    return _`
      <div class="container">
        <div class="header">
          <h3>Weather</h3>
          ${this.weather ? _`
                <button
                  class="edit-btn"
                  @click=${() => this.isEditing = !this.isEditing}
                >
                  ${this.isEditing ? "Cancel" : "Change"}
                </button>
              ` : ""}
        </div>

        ${this.isEditing || !this.location ? _`
              <form class="location-form" @submit=${this.handleSubmit}>
                <input
                  type="text"
                  placeholder="Enter city name..."
                  value=${this.location}
                  @input=${(r) => this.location = r.target.value}
                  required
                />
                <button type="submit" class="btn">Get Weather</button>
              </form>
            ` : ""}

        ${this.loading ? _`<div class="loading">Loading weather...</div>` : this.error ? _`<div class="error">${this.error}<br /><small>Try another location</small></div>` : this.weather ? _`
              <div class="weather-display">
                <div class="temp">${this.weather.temp}°C</div>
                <div class="condition">${this.weather.condition}</div>
                <div class="location-name">${this.weather.location}</div>
                <div class="details">
                  <div class="detail">
                    <div class="detail-label">Humidity</div>
                    <div class="detail-value">${this.weather.humidity}%</div>
                  </div>
                  <div class="detail">
                    <div class="detail-label">Wind</div>
                    <div class="detail-value">${this.weather.wind} km/h</div>
                  </div>
                </div>
              </div>
            ` : this.isEditing ? "" : _`<div class="empty">Enter a location to see weather</div>`}
      </div>
    `;
  }
};
m.styles = ht`
    :host {
      display: block;
      height: 100%;
      font-family: system-ui, -apple-system, sans-serif;
    }

    .container {
      height: 100%;
      background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
      border-radius: 12px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      color: white;
      position: relative;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    h3 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
    }

    .edit-btn {
      background: rgba(255, 255, 255, 0.2);
      border: none;
      border-radius: 6px;
      color: white;
      cursor: pointer;
      padding: 6px 12px;
      font-size: 12px;
      transition: all 0.2s;
    }

    .edit-btn:hover {
      background: rgba(255, 255, 255, 0.3);
    }

    .location-form {
      background: rgba(0, 0, 0, 0.2);
      border-radius: 8px;
      padding: 12px;
      margin-bottom: 16px;
    }

    input {
      width: 100%;
      padding: 8px;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      margin-bottom: 8px;
      box-sizing: border-box;
    }

    .btn {
      background: rgba(16, 185, 129, 0.6);
      border: none;
      border-radius: 6px;
      color: white;
      cursor: pointer;
      padding: 8px 16px;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.2s;
      width: 100%;
    }

    .btn:hover {
      background: rgba(16, 185, 129, 0.8);
    }

    .weather-display {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .temp {
      font-size: 64px;
      font-weight: 700;
      margin: 16px 0;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .condition {
      font-size: 24px;
      margin-bottom: 8px;
      text-transform: capitalize;
    }

    .location-name {
      font-size: 16px;
      opacity: 0.9;
      margin-bottom: 24px;
    }

    .details {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      width: 100%;
      max-width: 200px;
    }

    .detail {
      background: rgba(0, 0, 0, 0.15);
      border-radius: 8px;
      padding: 12px;
      text-align: center;
    }

    .detail-label {
      font-size: 12px;
      opacity: 0.8;
      margin-bottom: 4px;
    }

    .detail-value {
      font-size: 18px;
      font-weight: 600;
    }

    .loading, .error, .empty {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 20px;
      opacity: 0.8;
    }

    .error {
      color: #fee;
      font-size: 14px;
    }

    @media (max-width: 768px) {
      .temp {
        font-size: 48px;
      }
      .condition {
        font-size: 18px;
      }
    }
  `;
w([
  M()
], m.prototype, "weather", 2);
w([
  M()
], m.prototype, "loading", 2);
w([
  M()
], m.prototype, "error", 2);
w([
  M()
], m.prototype, "location", 2);
w([
  M()
], m.prototype, "isEditing", 2);
m = w([
  Ut("mb-weather")
], m);
export {
  m as WeatherWidget
};
