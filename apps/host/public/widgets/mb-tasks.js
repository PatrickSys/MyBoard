/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const O = globalThis, D = O.ShadowRoot && (O.ShadyCSS === void 0 || O.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, j = Symbol(), W = /* @__PURE__ */ new WeakMap();
let tt = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== j) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (D && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = W.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && W.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const nt = (r) => new tt(typeof r == "string" ? r : r + "", void 0, j), at = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((s, i, o) => s + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + r[o + 1], r[0]);
  return new tt(e, r, j);
}, ht = (r, t) => {
  if (D) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = O.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, r.appendChild(s);
  }
}, V = D ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return nt(e);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: lt, defineProperty: ct, getOwnPropertyDescriptor: dt, getOwnPropertyNames: pt, getOwnPropertySymbols: ut, getPrototypeOf: $t } = Object, N = globalThis, K = N.trustedTypes, ft = K ? K.emptyScript : "", gt = N.reactiveElementPolyfillSupport, E = (r, t) => r, U = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? ft : null;
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
} }, I = (r, t) => !lt(r, t), Y = { attribute: !0, type: String, converter: U, reflect: !1, useDefault: !1, hasChanged: I };
Symbol.metadata ??= Symbol("metadata"), N.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let y = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Y) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && ct(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: o } = dt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get: i, set(n) {
      const h = i?.call(this);
      o?.call(this, n), this.requestUpdate(t, h, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Y;
  }
  static _$Ei() {
    if (this.hasOwnProperty(E("elementProperties"))) return;
    const t = $t(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(E("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(E("properties"))) {
      const e = this.properties, s = [...pt(e), ...ut(e)];
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
      for (const i of s) e.unshift(V(i));
    } else t !== void 0 && e.push(V(t));
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
      const o = (s.converter?.toAttribute !== void 0 ? s.converter : U).toAttribute(e, s.type);
      this._$Em = t, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const o = s.getPropertyOptions(i), n = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : U;
      this._$Em = i;
      const h = n.fromAttribute(e, o.type);
      this[i] = h ?? this._$Ej?.get(i) ?? h, this._$Em = null;
    }
  }
  requestUpdate(t, e, s) {
    if (t !== void 0) {
      const i = this.constructor, o = this[t];
      if (s ??= i.getPropertyOptions(t), !((s.hasChanged ?? I)(o, e) || s.useDefault && s.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(i._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: i, wrapped: o }, n) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, n ?? e ?? this[t]), o !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [i, o] of this._$Ep) this[i] = o;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [i, o] of s) {
        const { wrapped: n } = o, h = this[i];
        n !== !0 || this._$AL.has(i) || h === void 0 || this.C(i, void 0, o, h);
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
y.elementStyles = [], y.shadowRootOptions = { mode: "open" }, y[E("elementProperties")] = /* @__PURE__ */ new Map(), y[E("finalized")] = /* @__PURE__ */ new Map(), gt?.({ ReactiveElement: y }), (N.reactiveElementVersions ??= []).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const L = globalThis, M = L.trustedTypes, G = M ? M.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, et = "$lit$", f = `lit$${Math.random().toFixed(9).slice(2)}$`, st = "?" + f, _t = `<${st}>`, m = document, w = () => m.createComment(""), k = (r) => r === null || typeof r != "object" && typeof r != "function", B = Array.isArray, mt = (r) => B(r) || typeof r?.[Symbol.iterator] == "function", z = `[ 	
\f\r]`, v = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, J = /-->/g, F = />/g, g = RegExp(`>|${z}(?:([^\\s"'>=/]+)(${z}*=${z}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Z = /'/g, Q = /"/g, it = /^(?:script|style|textarea|title)$/i, yt = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), x = yt(1), b = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), X = /* @__PURE__ */ new WeakMap(), _ = m.createTreeWalker(m, 129);
function rt(r, t) {
  if (!B(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return G !== void 0 ? G.createHTML(t) : t;
}
const bt = (r, t) => {
  const e = r.length - 1, s = [];
  let i, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = v;
  for (let h = 0; h < e; h++) {
    const a = r[h];
    let c, p, l = -1, u = 0;
    for (; u < a.length && (n.lastIndex = u, p = n.exec(a), p !== null); ) u = n.lastIndex, n === v ? p[1] === "!--" ? n = J : p[1] !== void 0 ? n = F : p[2] !== void 0 ? (it.test(p[2]) && (i = RegExp("</" + p[2], "g")), n = g) : p[3] !== void 0 && (n = g) : n === g ? p[0] === ">" ? (n = i ?? v, l = -1) : p[1] === void 0 ? l = -2 : (l = n.lastIndex - p[2].length, c = p[1], n = p[3] === void 0 ? g : p[3] === '"' ? Q : Z) : n === Q || n === Z ? n = g : n === J || n === F ? n = v : (n = g, i = void 0);
    const $ = n === g && r[h + 1].startsWith("/>") ? " " : "";
    o += n === v ? a + _t : l >= 0 ? (s.push(c), a.slice(0, l) + et + a.slice(l) + f + $) : a + f + (l === -2 ? h : $);
  }
  return [rt(r, o + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class C {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let o = 0, n = 0;
    const h = t.length - 1, a = this.parts, [c, p] = bt(t, e);
    if (this.el = C.createElement(c, s), _.currentNode = this.el.content, e === 2 || e === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (i = _.nextNode()) !== null && a.length < h; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const l of i.getAttributeNames()) if (l.endsWith(et)) {
          const u = p[n++], $ = i.getAttribute(l).split(f), T = /([.?@])?(.*)/.exec(u);
          a.push({ type: 1, index: o, name: T[2], strings: $, ctor: T[1] === "." ? vt : T[1] === "?" ? xt : T[1] === "@" ? Et : R }), i.removeAttribute(l);
        } else l.startsWith(f) && (a.push({ type: 6, index: o }), i.removeAttribute(l));
        if (it.test(i.tagName)) {
          const l = i.textContent.split(f), u = l.length - 1;
          if (u > 0) {
            i.textContent = M ? M.emptyScript : "";
            for (let $ = 0; $ < u; $++) i.append(l[$], w()), _.nextNode(), a.push({ type: 2, index: ++o });
            i.append(l[u], w());
          }
        }
      } else if (i.nodeType === 8) if (i.data === st) a.push({ type: 2, index: o });
      else {
        let l = -1;
        for (; (l = i.data.indexOf(f, l + 1)) !== -1; ) a.push({ type: 7, index: o }), l += f.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const s = m.createElement("template");
    return s.innerHTML = t, s;
  }
}
function A(r, t, e = r, s) {
  if (t === b) return t;
  let i = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const o = k(t) ? void 0 : t._$litDirective$;
  return i?.constructor !== o && (i?._$AO?.(!1), o === void 0 ? i = void 0 : (i = new o(r), i._$AT(r, e, s)), s !== void 0 ? (e._$Co ??= [])[s] = i : e._$Cl = i), i !== void 0 && (t = A(r, i._$AS(r, t.values), i, s)), t;
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
    const { el: { content: e }, parts: s } = this._$AD, i = (t?.creationScope ?? m).importNode(e, !0);
    _.currentNode = i;
    let o = _.nextNode(), n = 0, h = 0, a = s[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let c;
        a.type === 2 ? c = new P(o, o.nextSibling, this, t) : a.type === 1 ? c = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (c = new St(o, this, t)), this._$AV.push(c), a = s[++h];
      }
      n !== a?.index && (o = _.nextNode(), n++);
    }
    return _.currentNode = m, i;
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
    t = A(this, t, e), k(t) ? t === d || t == null || t === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : t !== this._$AH && t !== b && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : mt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== d && k(this._$AH) ? this._$AA.nextSibling.data = t : this.T(m.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = C.createElement(rt(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === i) this._$AH.p(e);
    else {
      const o = new At(i, this), n = o.u(this.options);
      o.p(e), this.T(n), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = X.get(t.strings);
    return e === void 0 && X.set(t.strings, e = new C(t)), e;
  }
  k(t) {
    B(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const o of t) i === e.length ? e.push(s = new P(this.O(w()), this.O(w()), this, this.options)) : s = e[i], s._$AI(o), i++;
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
class R {
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
    if (o === void 0) t = A(this, t, e, 0), n = !k(t) || t !== this._$AH && t !== b, n && (this._$AH = t);
    else {
      const h = t;
      let a, c;
      for (t = o[0], a = 0; a < o.length - 1; a++) c = A(this, h[s + a], e, a), c === b && (c = this._$AH[a]), n ||= !k(c) || c !== this._$AH[a], c === d ? t = d : t !== d && (t += (c ?? "") + o[a + 1]), this._$AH[a] = c;
    }
    n && !i && this.j(t);
  }
  j(t) {
    t === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class vt extends R {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === d ? void 0 : t;
  }
}
class xt extends R {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== d);
  }
}
class Et extends R {
  constructor(t, e, s, i, o) {
    super(t, e, s, i, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = A(this, t, e, 0) ?? d) === b) return;
    const s = this._$AH, i = t === d && s !== d || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, o = t !== d && (s === d || i);
    i && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class St {
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
const wt = L.litHtmlPolyfillSupport;
wt?.(C, P), (L.litHtmlVersions ??= []).push("3.3.1");
const kt = (r, t, e) => {
  const s = e?.renderBefore ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const o = e?.renderBefore ?? null;
    s._$litPart$ = i = new P(t.insertBefore(w(), o), o, void 0, e ?? {});
  }
  return i._$AI(r), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const q = globalThis;
class S extends y {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = kt(e, this.renderRoot, this.renderOptions);
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
S._$litElement$ = !0, S.finalized = !0, q.litElementHydrateSupport?.({ LitElement: S });
const Ct = q.litElementPolyfillSupport;
Ct?.({ LitElement: S });
(q.litElementVersions ??= []).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Pt = (r) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(r, t);
  }) : customElements.define(r, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Tt = { attribute: !0, type: String, converter: U, reflect: !1, hasChanged: I }, Ot = (r = Tt, t, e) => {
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
function Ut(r) {
  return (t, e) => typeof e == "object" ? Ot(r, t, e) : ((s, i, o) => {
    const n = i.hasOwnProperty(o);
    return i.constructor.createProperty(o, s), n ? Object.getOwnPropertyDescriptor(i, o) : void 0;
  })(r, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Mt(r) {
  return Ut({ ...r, state: !0, attribute: !1 });
}
const Ht = "widget-ready";
function Nt(r) {
  r.dispatchEvent(new CustomEvent(Ht, { bubbles: !0 }));
}
var Rt = Object.defineProperty, zt = Object.getOwnPropertyDescriptor, ot = (r, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? zt(t, e) : t, o = r.length - 1, n; o >= 0; o--)
    (n = r[o]) && (i = (s ? n(t, e, i) : n(i)) || i);
  return s && i && Rt(t, e, i), i;
};
let H = class extends S {
  constructor() {
    super(...arguments), this.tasks = [], this.STORAGE_KEY = "mb-tasks";
  }
  connectedCallback() {
    super.connectedCallback(), this.loadTasks(), queueMicrotask(() => Nt(this));
  }
  loadTasks() {
    try {
      const r = localStorage.getItem(this.STORAGE_KEY);
      r && (this.tasks = JSON.parse(r));
    } catch (r) {
      console.error("Failed to load tasks:", r), this.tasks = [];
    }
  }
  saveTasks() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.tasks));
    } catch (r) {
      console.error("Failed to save tasks:", r);
    }
  }
  handleAdd(r) {
    r.preventDefault();
    const e = r.target.querySelector("input"), s = e.value.trim();
    s && (this.tasks = [
      {
        id: Date.now().toString(),
        text: s,
        completed: !1
      },
      ...this.tasks
    ], this.saveTasks(), e.value = "");
  }
  toggleTask(r) {
    this.tasks = this.tasks.map(
      (t) => t.id === r ? { ...t, completed: !t.completed } : t
    ), this.saveTasks();
  }
  deleteTask(r) {
    this.tasks = this.tasks.filter((t) => t.id !== r), this.saveTasks();
  }
  render() {
    const r = this.tasks.filter((e) => e.completed).length, t = this.tasks.length;
    return x`
      <div class="container">
        <h3>Tasks</h3>

        <form class="add-form" @submit=${this.handleAdd}>
          <input type="text" placeholder="Add a new task..." />
          <button type="submit" class="btn">Add</button>
        </form>

        <div class="tasks-list">
          ${this.tasks.length === 0 ? x`<div class="empty-state">No tasks yet. Add one above!</div>` : this.tasks.map(
      (e) => x`
                  <div class="task-item ${e.completed ? "completed" : ""}">
                    <div
                      class="checkbox ${e.completed ? "checked" : ""}"
                      @click=${() => this.toggleTask(e.id)}
                    >
                      ${e.completed ? x`<span class="checkmark">✓</span>` : ""}
                    </div>
                    <div class="task-text">${e.text}</div>
                    <button class="delete-btn" @click=${() => this.deleteTask(e.id)}>
                      ×
                    </button>
                  </div>
                `
    )}
        </div>

        ${t > 0 ? x`
              <div class="stats">
                ${r} of ${t} completed
                ${r === t && t > 0 ? " 🎉" : ""}
              </div>
            ` : ""}
      </div>
    `;
  }
};
H.styles = at`
    :host {
      display: block;
      height: 100%;
      font-family: system-ui, -apple-system, sans-serif;
    }

    .container {
      height: 100%;
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      border-radius: 12px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      color: white;
      overflow: hidden;
    }

    h3 {
      margin: 0 0 16px 0;
      font-size: 18px;
      font-weight: 600;
    }

    .add-form {
      display: flex;
      gap: 8px;
      margin-bottom: 16px;
    }

    input {
      flex: 1;
      padding: 10px 12px;
      border: none;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.9);
      font-size: 14px;
    }

    input::placeholder {
      color: rgba(0, 0, 0, 0.4);
    }

    .btn {
      background: rgba(255, 255, 255, 0.2);
      border: none;
      border-radius: 8px;
      color: white;
      cursor: pointer;
      padding: 10px 16px;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.2s;
      white-space: nowrap;
    }

    .btn:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-1px);
    }

    .tasks-list {
      flex: 1;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .task-item {
      background: rgba(255, 255, 255, 0.15);
      border-radius: 8px;
      padding: 12px;
      display: flex;
      align-items: center;
      gap: 12px;
      transition: all 0.2s;
      backdrop-filter: blur(10px);
    }

    .task-item:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    .task-item.completed {
      opacity: 0.6;
    }

    .checkbox {
      width: 20px;
      height: 20px;
      min-width: 20px;
      border: 2px solid rgba(255, 255, 255, 0.5);
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }

    .checkbox:hover {
      border-color: rgba(255, 255, 255, 0.8);
    }

    .checkbox.checked {
      background: rgba(255, 255, 255, 0.9);
      border-color: rgba(255, 255, 255, 0.9);
    }

    .checkmark {
      color: #059669;
      font-weight: bold;
      font-size: 14px;
    }

    .task-text {
      flex: 1;
      font-size: 14px;
      line-height: 1.4;
      word-break: break-word;
    }

    .task-item.completed .task-text {
      text-decoration: line-through;
    }

    .delete-btn {
      background: rgba(239, 68, 68, 0.8);
      border: none;
      border-radius: 6px;
      color: white;
      cursor: pointer;
      width: 28px;
      height: 28px;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
      flex-shrink: 0;
    }

    .delete-btn:hover {
      background: rgba(239, 68, 68, 1);
      transform: scale(1.1);
    }

    .empty-state {
      text-align: center;
      opacity: 0.6;
      padding: 40px 20px;
      font-size: 14px;
    }

    .stats {
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid rgba(255, 255, 255, 0.2);
      font-size: 12px;
      opacity: 0.8;
      text-align: center;
    }
  `;
ot([
  Mt()
], H.prototype, "tasks", 2);
H = ot([
  Pt("mb-tasks")
], H);
export {
  H as TasksWidget
};
