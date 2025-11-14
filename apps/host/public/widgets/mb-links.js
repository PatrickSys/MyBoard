/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const T = globalThis, D = T.ShadowRoot && (T.ShadyCSS === void 0 || T.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, j = Symbol(), V = /* @__PURE__ */ new WeakMap();
let et = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== j) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (D && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = V.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && V.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const at = (r) => new et(typeof r == "string" ? r : r + "", void 0, j), lt = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((s, i, n) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + r[n + 1], r[0]);
  return new et(e, r, j);
}, ht = (r, t) => {
  if (D) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = T.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, r.appendChild(s);
  }
}, G = D ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return at(e);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ct, defineProperty: dt, getOwnPropertyDescriptor: pt, getOwnPropertyNames: ut, getOwnPropertySymbols: $t, getPrototypeOf: ft } = Object, R = globalThis, Y = R.trustedTypes, gt = Y ? Y.emptyScript : "", mt = R.reactiveElementPolyfillSupport, x = (r, t) => r, H = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? gt : null;
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
} }, z = (r, t) => !ct(r, t), K = { attribute: !0, type: String, converter: H, reflect: !1, useDefault: !1, hasChanged: z };
Symbol.metadata ??= Symbol("metadata"), R.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let y = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = K) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && dt(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: n } = pt(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? K;
  }
  static _$Ei() {
    if (this.hasOwnProperty(x("elementProperties"))) return;
    const t = ft(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(x("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(x("properties"))) {
      const e = this.properties, s = [...ut(e), ...$t(e)];
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
      for (const i of s) e.unshift(G(i));
    } else t !== void 0 && e.push(G(t));
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
    return ht(t, this.constructor.elementStyles), t;
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
      const n = (s.converter?.toAttribute !== void 0 ? s.converter : H).toAttribute(e, s.type);
      this._$Em = t, n == null ? this.removeAttribute(i) : this.setAttribute(i, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const n = s.getPropertyOptions(i), o = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : H;
      this._$Em = i;
      const l = o.fromAttribute(e, n.type);
      this[i] = l ?? this._$Ej?.get(i) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, s) {
    if (t !== void 0) {
      const i = this.constructor, n = this[t];
      if (s ??= i.getPropertyOptions(t), !((s.hasChanged ?? z)(n, e) || s.useDefault && s.reflect && n === this._$Ej?.get(t) && !this.hasAttribute(i._$Eu(t, s)))) return;
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
y.elementStyles = [], y.shadowRootOptions = { mode: "open" }, y[x("elementProperties")] = /* @__PURE__ */ new Map(), y[x("finalized")] = /* @__PURE__ */ new Map(), mt?.({ ReactiveElement: y }), (R.reactiveElementVersions ??= []).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const I = globalThis, M = I.trustedTypes, F = M ? M.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, st = "$lit$", f = `lit$${Math.random().toFixed(9).slice(2)}$`, it = "?" + f, _t = `<${it}>`, _ = document, S = () => _.createComment(""), w = (r) => r === null || typeof r != "object" && typeof r != "function", B = Array.isArray, yt = (r) => B(r) || typeof r?.[Symbol.iterator] == "function", L = `[ 	
\f\r]`, v = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, J = /-->/g, Z = />/g, g = RegExp(`>|${L}(?:([^\\s"'>=/]+)(${L}*=${L}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Q = /'/g, X = /"/g, rt = /^(?:script|style|textarea|title)$/i, bt = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), U = bt(1), b = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), tt = /* @__PURE__ */ new WeakMap(), m = _.createTreeWalker(_, 129);
function nt(r, t) {
  if (!B(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return F !== void 0 ? F.createHTML(t) : t;
}
const At = (r, t) => {
  const e = r.length - 1, s = [];
  let i, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = v;
  for (let l = 0; l < e; l++) {
    const a = r[l];
    let c, p, h = -1, u = 0;
    for (; u < a.length && (o.lastIndex = u, p = o.exec(a), p !== null); ) u = o.lastIndex, o === v ? p[1] === "!--" ? o = J : p[1] !== void 0 ? o = Z : p[2] !== void 0 ? (rt.test(p[2]) && (i = RegExp("</" + p[2], "g")), o = g) : p[3] !== void 0 && (o = g) : o === g ? p[0] === ">" ? (o = i ?? v, h = -1) : p[1] === void 0 ? h = -2 : (h = o.lastIndex - p[2].length, c = p[1], o = p[3] === void 0 ? g : p[3] === '"' ? X : Q) : o === X || o === Q ? o = g : o === J || o === Z ? o = v : (o = g, i = void 0);
    const $ = o === g && r[l + 1].startsWith("/>") ? " " : "";
    n += o === v ? a + _t : h >= 0 ? (s.push(c), a.slice(0, h) + st + a.slice(h) + f + $) : a + f + (h === -2 ? l : $);
  }
  return [nt(r, n + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class k {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let n = 0, o = 0;
    const l = t.length - 1, a = this.parts, [c, p] = At(t, e);
    if (this.el = k.createElement(c, s), m.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (i = m.nextNode()) !== null && a.length < l; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const h of i.getAttributeNames()) if (h.endsWith(st)) {
          const u = p[o++], $ = i.getAttribute(h).split(f), O = /([.?@])?(.*)/.exec(u);
          a.push({ type: 1, index: n, name: O[2], strings: $, ctor: O[1] === "." ? xt : O[1] === "?" ? Et : O[1] === "@" ? St : N }), i.removeAttribute(h);
        } else h.startsWith(f) && (a.push({ type: 6, index: n }), i.removeAttribute(h));
        if (rt.test(i.tagName)) {
          const h = i.textContent.split(f), u = h.length - 1;
          if (u > 0) {
            i.textContent = M ? M.emptyScript : "";
            for (let $ = 0; $ < u; $++) i.append(h[$], S()), m.nextNode(), a.push({ type: 2, index: ++n });
            i.append(h[u], S());
          }
        }
      } else if (i.nodeType === 8) if (i.data === it) a.push({ type: 2, index: n });
      else {
        let h = -1;
        for (; (h = i.data.indexOf(f, h + 1)) !== -1; ) a.push({ type: 7, index: n }), h += f.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const s = _.createElement("template");
    return s.innerHTML = t, s;
  }
}
function A(r, t, e = r, s) {
  if (t === b) return t;
  let i = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const n = w(t) ? void 0 : t._$litDirective$;
  return i?.constructor !== n && (i?._$AO?.(!1), n === void 0 ? i = void 0 : (i = new n(r), i._$AT(r, e, s)), s !== void 0 ? (e._$Co ??= [])[s] = i : e._$Cl = i), i !== void 0 && (t = A(r, i._$AS(r, t.values), i, s)), t;
}
class vt {
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
    const { el: { content: e }, parts: s } = this._$AD, i = (t?.creationScope ?? _).importNode(e, !0);
    m.currentNode = i;
    let n = m.nextNode(), o = 0, l = 0, a = s[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let c;
        a.type === 2 ? c = new P(n, n.nextSibling, this, t) : a.type === 1 ? c = new a.ctor(n, a.name, a.strings, this, t) : a.type === 6 && (c = new wt(n, this, t)), this._$AV.push(c), a = s[++l];
      }
      o !== a?.index && (n = m.nextNode(), o++);
    }
    return m.currentNode = _, i;
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
    t = A(this, t, e), w(t) ? t === d || t == null || t === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : t !== this._$AH && t !== b && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : yt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== d && w(this._$AH) ? this._$AA.nextSibling.data = t : this.T(_.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = k.createElement(nt(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === i) this._$AH.p(e);
    else {
      const n = new vt(i, this), o = n.u(this.options);
      n.p(e), this.T(o), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = tt.get(t.strings);
    return e === void 0 && tt.set(t.strings, e = new k(t)), e;
  }
  k(t) {
    B(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const n of t) i === e.length ? e.push(s = new P(this.O(S()), this.O(S()), this, this.options)) : s = e[i], s._$AI(n), i++;
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
class N {
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
    if (n === void 0) t = A(this, t, e, 0), o = !w(t) || t !== this._$AH && t !== b, o && (this._$AH = t);
    else {
      const l = t;
      let a, c;
      for (t = n[0], a = 0; a < n.length - 1; a++) c = A(this, l[s + a], e, a), c === b && (c = this._$AH[a]), o ||= !w(c) || c !== this._$AH[a], c === d ? t = d : t !== d && (t += (c ?? "") + n[a + 1]), this._$AH[a] = c;
    }
    o && !i && this.j(t);
  }
  j(t) {
    t === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class xt extends N {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === d ? void 0 : t;
  }
}
class Et extends N {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== d);
  }
}
class St extends N {
  constructor(t, e, s, i, n) {
    super(t, e, s, i, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = A(this, t, e, 0) ?? d) === b) return;
    const s = this._$AH, i = t === d && s !== d || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, n = t !== d && (s === d || i);
    i && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class wt {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    A(this, t);
  }
}
const kt = I.litHtmlPolyfillSupport;
kt?.(k, P), (I.litHtmlVersions ??= []).push("3.3.1");
const Ct = (r, t, e) => {
  const s = e?.renderBefore ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const n = e?.renderBefore ?? null;
    s._$litPart$ = i = new P(t.insertBefore(S(), n), n, void 0, e ?? {});
  }
  return i._$AI(r), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const q = globalThis;
class E extends y {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ct(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return b;
  }
}
E._$litElement$ = !0, E.finalized = !0, q.litElementHydrateSupport?.({ LitElement: E });
const Pt = q.litElementPolyfillSupport;
Pt?.({ LitElement: E });
(q.litElementVersions ??= []).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ot = (r) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(r, t);
  }) : customElements.define(r, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ut = { attribute: !0, type: String, converter: H, reflect: !1, hasChanged: z }, Tt = (r = Ut, t, e) => {
  const { kind: s, metadata: i } = e;
  let n = globalThis.litPropertyMetadata.get(i);
  if (n === void 0 && globalThis.litPropertyMetadata.set(i, n = /* @__PURE__ */ new Map()), s === "setter" && ((r = Object.create(r)).wrapped = !0), n.set(e.name, r), s === "accessor") {
    const { name: o } = e;
    return { set(l) {
      const a = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(o, a, r);
    }, init(l) {
      return l !== void 0 && this.C(o, void 0, r, l), l;
    } };
  }
  if (s === "setter") {
    const { name: o } = e;
    return function(l) {
      const a = this[o];
      t.call(this, l), this.requestUpdate(o, a, r);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function Ht(r) {
  return (t, e) => typeof e == "object" ? Tt(r, t, e) : ((s, i, n) => {
    const o = i.hasOwnProperty(n);
    return i.constructor.createProperty(n, s), o ? Object.getOwnPropertyDescriptor(i, n) : void 0;
  })(r, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function ot(r) {
  return Ht({ ...r, state: !0, attribute: !1 });
}
const Mt = "widget-ready";
function Rt(r) {
  r.dispatchEvent(new CustomEvent(Mt, { bubbles: !0 }));
}
var Nt = Object.defineProperty, Lt = Object.getOwnPropertyDescriptor, W = (r, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? Lt(t, e) : t, n = r.length - 1, o; n >= 0; n--)
    (o = r[n]) && (i = (s ? o(t, e, i) : o(i)) || i);
  return s && i && Nt(t, e, i), i;
};
let C = class extends E {
  constructor() {
    super(...arguments), this.links = [], this.isAdding = !1, this.STORAGE_KEY = "mb-links";
  }
  connectedCallback() {
    super.connectedCallback(), this.loadLinks(), queueMicrotask(() => Rt(this));
  }
  loadLinks() {
    try {
      const r = localStorage.getItem(this.STORAGE_KEY);
      r ? this.links = JSON.parse(r) : (this.links = [
        { id: "1", title: "GitHub", url: "https://github.com" },
        { id: "2", title: "Gmail", url: "https://gmail.com" },
        { id: "3", title: "Calendar", url: "https://calendar.google.com" }
      ], this.saveLinks());
    } catch (r) {
      console.error("Failed to load links:", r), this.links = [];
    }
  }
  saveLinks() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.links));
    } catch (r) {
      console.error("Failed to save links:", r);
    }
  }
  handleAdd(r) {
    r.preventDefault();
    const t = r.target, e = new FormData(t), s = e.get("title"), i = e.get("url");
    s.trim() && i.trim() && (this.links = [
      ...this.links,
      {
        id: Date.now().toString(),
        title: s.trim(),
        url: i.trim()
      }
    ], this.saveLinks(), this.isAdding = !1);
  }
  deleteLink(r) {
    this.links = this.links.filter((t) => t.id !== r), this.saveLinks();
  }
  openLink(r) {
    window.open(r, "_blank", "noopener,noreferrer");
  }
  render() {
    return U`
      <div class="container">
        <div class="header">
          <h3>Quick Links</h3>
          <button class="btn" @click=${() => this.isAdding = !this.isAdding}>
            ${this.isAdding ? "Cancel" : "+ Add"}
          </button>
        </div>

        ${this.isAdding ? U`
              <form class="add-form" @submit=${this.handleAdd}>
                <div class="form-group">
                  <label>Title</label>
                  <input type="text" name="title" placeholder="GitHub" required />
                </div>
                <div class="form-group">
                  <label>URL</label>
                  <input
                    type="url"
                    name="url"
                    placeholder="https://github.com"
                    required
                  />
                </div>
                <div class="form-actions">
                  <button type="submit" class="btn">Save</button>
                </div>
              </form>
            ` : ""}

        <div class="links-grid">
          ${this.links.length === 0 ? U`<div class="empty-state">No links yet. Click "+ Add" to create one.</div>` : this.links.map(
      (r) => U`
                  <div class="link-card" @click=${() => this.openLink(r.url)}>
                    <button
                      class="delete-btn"
                      @click=${(t) => {
        t.stopPropagation(), this.deleteLink(r.id);
      }}
                    >
                      ×
                    </button>
                    <div class="link-title">${r.title}</div>
                  </div>
                `
    )}
        </div>
      </div>
    `;
  }
};
C.styles = lt`
    :host {
      display: block;
      height: 100%;
      font-family: system-ui, -apple-system, sans-serif;
    }

    .container {
      height: 100%;
      background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
      border-radius: 12px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      color: white;
      overflow: hidden;
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

    .btn {
      background: rgba(255, 255, 255, 0.2);
      border: none;
      border-radius: 6px;
      color: white;
      cursor: pointer;
      padding: 8px 12px;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.2s;
    }

    .btn:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-1px);
    }

    .links-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: 12px;
      flex: 1;
      overflow-y: auto;
      padding: 4px;
    }

    .link-card {
      background: rgba(255, 255, 255, 0.15);
      border-radius: 8px;
      padding: 16px;
      text-align: center;
      text-decoration: none;
      color: white;
      transition: all 0.2s;
      position: relative;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 80px;
      backdrop-filter: blur(10px);
    }

    .link-card:hover {
      background: rgba(255, 255, 255, 0.25);
      transform: translateY(-2px);
    }

    .link-title {
      font-weight: 500;
      font-size: 14px;
      word-break: break-word;
    }

    .delete-btn {
      position: absolute;
      top: 4px;
      right: 4px;
      background: rgba(239, 68, 68, 0.8);
      border: none;
      border-radius: 4px;
      color: white;
      cursor: pointer;
      width: 20px;
      height: 20px;
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.2s;
    }

    .link-card:hover .delete-btn {
      opacity: 1;
    }

    .add-form {
      background: rgba(255, 255, 255, 0.15);
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 12px;
    }

    .form-group {
      margin-bottom: 12px;
    }

    .form-group:last-of-type {
      margin-bottom: 0;
    }

    label {
      display: block;
      font-size: 12px;
      margin-bottom: 4px;
      opacity: 0.9;
    }

    input {
      width: 100%;
      padding: 8px;
      border: none;
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.9);
      font-size: 14px;
      box-sizing: border-box;
    }

    .form-actions {
      display: flex;
      gap: 8px;
      margin-top: 12px;
    }

    .form-actions .btn {
      flex: 1;
    }

    .empty-state {
      text-align: center;
      opacity: 0.7;
      padding: 40px 20px;
    }

    @media (max-width: 768px) {
      .links-grid {
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
      }
    }
  `;
W([
  ot()
], C.prototype, "links", 2);
W([
  ot()
], C.prototype, "isAdding", 2);
C = W([
  Ot("mb-links")
], C);
export {
  C as LinksWidget
};
