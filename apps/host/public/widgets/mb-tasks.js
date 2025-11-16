/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const U = globalThis, N = U.ShadowRoot && (U.ShadyCSS === void 0 || U.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, z = Symbol(), L = /* @__PURE__ */ new WeakMap();
let Q = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== z) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (N && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = L.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && L.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const rt = (r) => new Q(typeof r == "string" ? r : r + "", void 0, z), ot = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((s, i, o) => s + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + r[o + 1], r[0]);
  return new Q(e, r, z);
}, nt = (r, t) => {
  if (N) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = U.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, r.appendChild(s);
  }
}, B = N ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return rt(e);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: at, defineProperty: ht, getOwnPropertyDescriptor: lt, getOwnPropertyNames: dt, getOwnPropertySymbols: ct, getPrototypeOf: pt } = Object, T = globalThis, q = T.trustedTypes, ut = q ? q.emptyScript : "", $t = T.reactiveElementPolyfillSupport, x = (r, t) => r, R = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? ut : null;
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
} }, X = (r, t) => !at(r, t), W = { attribute: !0, type: String, converter: R, reflect: !1, useDefault: !1, hasChanged: X };
Symbol.metadata ??= Symbol("metadata"), T.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
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
    const { get: i, set: o } = lt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get: i, set(n) {
      const l = i?.call(this);
      o?.call(this, n), this.requestUpdate(t, l, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? W;
  }
  static _$Ei() {
    if (this.hasOwnProperty(x("elementProperties"))) return;
    const t = pt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(x("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(x("properties"))) {
      const e = this.properties, s = [...dt(e), ...ct(e)];
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
      const o = (s.converter?.toAttribute !== void 0 ? s.converter : R).toAttribute(e, s.type);
      this._$Em = t, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const o = s.getPropertyOptions(i), n = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : R;
      this._$Em = i;
      const l = n.fromAttribute(e, o.type);
      this[i] = l ?? this._$Ej?.get(i) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, s) {
    if (t !== void 0) {
      const i = this.constructor, o = this[t];
      if (s ??= i.getPropertyOptions(t), !((s.hasChanged ?? X)(o, e) || s.useDefault && s.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(i._$Eu(t, s)))) return;
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
        const { wrapped: n } = o, l = this[i];
        n !== !0 || this._$AL.has(i) || l === void 0 || this.C(i, void 0, o, l);
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
b.elementStyles = [], b.shadowRootOptions = { mode: "open" }, b[x("elementProperties")] = /* @__PURE__ */ new Map(), b[x("finalized")] = /* @__PURE__ */ new Map(), $t?.({ ReactiveElement: b }), (T.reactiveElementVersions ??= []).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const D = globalThis, O = D.trustedTypes, V = O ? O.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, tt = "$lit$", f = `lit$${Math.random().toFixed(9).slice(2)}$`, et = "?" + f, ft = `<${et}>`, m = document, S = () => m.createComment(""), w = (r) => r === null || typeof r != "object" && typeof r != "function", j = Array.isArray, gt = (r) => j(r) || typeof r?.[Symbol.iterator] == "function", M = `[ 	
\f\r]`, v = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Y = /-->/g, K = />/g, g = RegExp(`>|${M}(?:([^\\s"'>=/]+)(${M}*=${M}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), G = /'/g, J = /"/g, st = /^(?:script|style|textarea|title)$/i, _t = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), Z = _t(1), A = Symbol.for("lit-noChange"), c = Symbol.for("lit-nothing"), F = /* @__PURE__ */ new WeakMap(), _ = m.createTreeWalker(m, 129);
function it(r, t) {
  if (!j(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return V !== void 0 ? V.createHTML(t) : t;
}
const mt = (r, t) => {
  const e = r.length - 1, s = [];
  let i, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = v;
  for (let l = 0; l < e; l++) {
    const a = r[l];
    let d, p, h = -1, u = 0;
    for (; u < a.length && (n.lastIndex = u, p = n.exec(a), p !== null); ) u = n.lastIndex, n === v ? p[1] === "!--" ? n = Y : p[1] !== void 0 ? n = K : p[2] !== void 0 ? (st.test(p[2]) && (i = RegExp("</" + p[2], "g")), n = g) : p[3] !== void 0 && (n = g) : n === g ? p[0] === ">" ? (n = i ?? v, h = -1) : p[1] === void 0 ? h = -2 : (h = n.lastIndex - p[2].length, d = p[1], n = p[3] === void 0 ? g : p[3] === '"' ? J : G) : n === J || n === G ? n = g : n === Y || n === K ? n = v : (n = g, i = void 0);
    const $ = n === g && r[l + 1].startsWith("/>") ? " " : "";
    o += n === v ? a + ft : h >= 0 ? (s.push(d), a.slice(0, h) + tt + a.slice(h) + f + $) : a + f + (h === -2 ? l : $);
  }
  return [it(r, o + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class C {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let o = 0, n = 0;
    const l = t.length - 1, a = this.parts, [d, p] = mt(t, e);
    if (this.el = C.createElement(d, s), _.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (i = _.nextNode()) !== null && a.length < l; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const h of i.getAttributeNames()) if (h.endsWith(tt)) {
          const u = p[n++], $ = i.getAttribute(h).split(f), P = /([.?@])?(.*)/.exec(u);
          a.push({ type: 1, index: o, name: P[2], strings: $, ctor: P[1] === "." ? At : P[1] === "?" ? yt : P[1] === "@" ? vt : H }), i.removeAttribute(h);
        } else h.startsWith(f) && (a.push({ type: 6, index: o }), i.removeAttribute(h));
        if (st.test(i.tagName)) {
          const h = i.textContent.split(f), u = h.length - 1;
          if (u > 0) {
            i.textContent = O ? O.emptyScript : "";
            for (let $ = 0; $ < u; $++) i.append(h[$], S()), _.nextNode(), a.push({ type: 2, index: ++o });
            i.append(h[u], S());
          }
        }
      } else if (i.nodeType === 8) if (i.data === et) a.push({ type: 2, index: o });
      else {
        let h = -1;
        for (; (h = i.data.indexOf(f, h + 1)) !== -1; ) a.push({ type: 7, index: o }), h += f.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const s = m.createElement("template");
    return s.innerHTML = t, s;
  }
}
function y(r, t, e = r, s) {
  if (t === A) return t;
  let i = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const o = w(t) ? void 0 : t._$litDirective$;
  return i?.constructor !== o && (i?._$AO?.(!1), o === void 0 ? i = void 0 : (i = new o(r), i._$AT(r, e, s)), s !== void 0 ? (e._$Co ??= [])[s] = i : e._$Cl = i), i !== void 0 && (t = y(r, i._$AS(r, t.values), i, s)), t;
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
    _.currentNode = i;
    let o = _.nextNode(), n = 0, l = 0, a = s[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let d;
        a.type === 2 ? d = new k(o, o.nextSibling, this, t) : a.type === 1 ? d = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (d = new xt(o, this, t)), this._$AV.push(d), a = s[++l];
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
class k {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, s, i) {
    this.type = 2, this._$AH = c, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = i?.isConnected ?? !0;
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
    t = y(this, t, e), w(t) ? t === c || t == null || t === "" ? (this._$AH !== c && this._$AR(), this._$AH = c) : t !== this._$AH && t !== A && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : gt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== c && w(this._$AH) ? this._$AA.nextSibling.data = t : this.T(m.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = C.createElement(it(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === i) this._$AH.p(e);
    else {
      const o = new bt(i, this), n = o.u(this.options);
      o.p(e), this.T(n), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = F.get(t.strings);
    return e === void 0 && F.set(t.strings, e = new C(t)), e;
  }
  k(t) {
    j(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const o of t) i === e.length ? e.push(s = new k(this.O(S()), this.O(S()), this, this.options)) : s = e[i], s._$AI(o), i++;
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
  constructor(t, e, s, i, o) {
    this.type = 1, this._$AH = c, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = c;
  }
  _$AI(t, e = this, s, i) {
    const o = this.strings;
    let n = !1;
    if (o === void 0) t = y(this, t, e, 0), n = !w(t) || t !== this._$AH && t !== A, n && (this._$AH = t);
    else {
      const l = t;
      let a, d;
      for (t = o[0], a = 0; a < o.length - 1; a++) d = y(this, l[s + a], e, a), d === A && (d = this._$AH[a]), n ||= !w(d) || d !== this._$AH[a], d === c ? t = c : t !== c && (t += (d ?? "") + o[a + 1]), this._$AH[a] = d;
    }
    n && !i && this.j(t);
  }
  j(t) {
    t === c ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class At extends H {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === c ? void 0 : t;
  }
}
class yt extends H {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== c);
  }
}
class vt extends H {
  constructor(t, e, s, i, o) {
    super(t, e, s, i, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = y(this, t, e, 0) ?? c) === A) return;
    const s = this._$AH, i = t === c && s !== c || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, o = t !== c && (s === c || i);
    i && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class xt {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    y(this, t);
  }
}
const Et = D.litHtmlPolyfillSupport;
Et?.(C, k), (D.litHtmlVersions ??= []).push("3.3.1");
const St = (r, t, e) => {
  const s = e?.renderBefore ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const o = e?.renderBefore ?? null;
    s._$litPart$ = i = new k(t.insertBefore(S(), o), o, void 0, e ?? {});
  }
  return i._$AI(r), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const I = globalThis;
class E extends b {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = St(e, this.renderRoot, this.renderOptions);
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
E._$litElement$ = !0, E.finalized = !0, I.litElementHydrateSupport?.({ LitElement: E });
const wt = I.litElementPolyfillSupport;
wt?.({ LitElement: E });
(I.litElementVersions ??= []).push("4.2.1");
const Ct = "widget-ready";
function kt(r) {
  r.dispatchEvent(new CustomEvent(Ct, { bubbles: !0 }));
}
class Pt extends E {
  constructor() {
    super(...arguments), this.tasks = [], this.STORAGE_KEY = "mb-tasks";
  }
  static {
    this.styles = ot`
    :host { display: block; font-family: system-ui, -apple-system, sans-serif; height: 100%; }
    .surface {
      height: 100%;
      background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
      border-radius: 16px;
      padding: 20px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      border: 1px solid rgba(16, 185, 129, 0.2);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.5);
    }
    .row {
      display: flex;
      gap: 12px;
      margin-bottom: 16px;
      padding-bottom: 12px;
      border-bottom: 1px solid rgba(16, 185, 129, 0.1);
    }
    input {
      flex: 1;
      padding: 10px 12px;
      border: 1px solid rgba(16, 185, 129, 0.2);
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.9);
      font-size: 0.875rem;
      transition: all 0.2s ease;
    }
    input:focus {
      outline: none;
      border-color: #10b981;
      background: white;
      box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
    }
    button {
      padding: 10px 16px;
      border-radius: 10px;
      border: 1px solid rgba(16, 185, 129, 0.2);
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
      font-weight: 500;
      font-size: 0.875rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    button:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
    }
    .list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: grid;
      gap: 10px;
      flex: 1;
      overflow: auto;
      min-height: 0;
      padding-right: 4px;
    }
    .item {
      display: flex;
      align-items: center;
      gap: 12px;
      border: 1px solid rgba(16, 185, 129, 0.1);
      border-radius: 12px;
      padding: 12px 16px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(8px);
    }
    .item:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(16, 185, 129, 0.15);
      border-color: rgba(16, 185, 129, 0.2);
    }
    .item.done {
      opacity: 0.6;
    }
    .item.done .text {
      text-decoration: line-through;
    }
    .check {
      width: 20px;
      height: 20px;
      min-width: 20px;
      border: 2px solid rgba(16, 185, 129, 0.3);
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
      background: white;
    }
    .check.done {
      background: #10b981;
      border-color: #10b981;
    }
    .text {
      flex: 1;
      font-size: 0.875rem;
      line-height: 1.4;
      word-break: break-word;
    }
    .del {
      background: transparent;
      border: 1px solid rgba(16, 185, 129, 0.2);
      color: #64748b;
      border-radius: 8px;
      padding: 6px 12px;
      font-size: 0.75rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .del:hover {
      background: rgba(239, 68, 68, 0.1);
      border-color: rgba(239, 68, 68, 0.3);
      color: #ef4444;
      transform: translateY(-1px);
    }
  `;
  }
  connectedCallback() {
    super.connectedCallback();
    try {
      const t = localStorage.getItem(this.STORAGE_KEY);
      this.tasks = t ? JSON.parse(t) : [];
    } catch {
    }
    queueMicrotask(() => kt(this));
  }
  save() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.tasks));
    } catch {
    }
  }
  add(t) {
    t.preventDefault();
    const e = t.target.querySelector("input"), s = e.value.trim();
    s && (this.tasks = [{ id: String(Date.now()), text: s, completed: !1 }, ...this.tasks], this.save(), e.value = "", this.requestUpdate());
  }
  toggle(t) {
    this.tasks = this.tasks.map((e) => e.id === t ? { ...e, completed: !e.completed } : e), this.save(), this.requestUpdate();
  }
  del(t) {
    this.tasks = this.tasks.filter((e) => e.id !== t), this.save(), this.requestUpdate();
  }
  render() {
    return Z`
      <div class="surface">
        <form class="row" @submit=${(t) => this.add(t)}>
          <input placeholder="Add task" />
          <button type="submit">Add</button>
        </form>
        <ul class="list">
          ${this.tasks.map(
      (t) => Z`
              <li class="item ${t.completed ? "done" : ""}">
                <div class="check ${t.completed ? "done" : ""}" @click=${() => this.toggle(t.id)}>
                  ${t.completed ? "✓" : ""}
                </div>
                <span class="text">${t.text}</span>
                <button class="del" @click=${() => this.del(t.id)}>Delete</button>
              </li>
            `
    )}
        </ul>
      </div>
    `;
  }
}
customElements.get("mb-tasks") || customElements.define("mb-tasks", Pt);
export {
  Pt as MbTasksElement
};
