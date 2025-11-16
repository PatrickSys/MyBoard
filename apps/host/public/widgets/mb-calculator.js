/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const M = globalThis, z = M.ShadowRoot && (M.ShadyCSS === void 0 || M.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, V = Symbol(), F = /* @__PURE__ */ new WeakMap();
let et = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== V) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (z && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = F.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && F.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ot = (r) => new et(typeof r == "string" ? r : r + "", void 0, V), at = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((s, i, n) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + r[n + 1], r[0]);
  return new et(e, r, V);
}, ht = (r, t) => {
  if (z) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = M.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, r.appendChild(s);
  }
}, W = z ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return ot(e);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: lt, defineProperty: ct, getOwnPropertyDescriptor: pt, getOwnPropertyNames: ut, getOwnPropertySymbols: dt, getPrototypeOf: $t } = Object, H = globalThis, J = H.trustedTypes, ft = J ? J.emptyScript : "", _t = H.reactiveElementPolyfillSupport, w = (r, t) => r, T = { toAttribute(r, t) {
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
} }, L = (r, t) => !lt(r, t), K = { attribute: !0, type: String, converter: T, reflect: !1, useDefault: !1, hasChanged: L };
Symbol.metadata ??= Symbol("metadata"), H.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let m = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = K) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && ct(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: n } = pt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: i, set(o) {
      const h = i?.call(this);
      n?.call(this, o), this.requestUpdate(t, h, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? K;
  }
  static _$Ei() {
    if (this.hasOwnProperty(w("elementProperties"))) return;
    const t = $t(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(w("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(w("properties"))) {
      const e = this.properties, s = [...ut(e), ...dt(e)];
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
      for (const i of s) e.unshift(W(i));
    } else t !== void 0 && e.push(W(t));
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
      const n = (s.converter?.toAttribute !== void 0 ? s.converter : T).toAttribute(e, s.type);
      this._$Em = t, n == null ? this.removeAttribute(i) : this.setAttribute(i, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const n = s.getPropertyOptions(i), o = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : T;
      this._$Em = i;
      const h = o.fromAttribute(e, n.type);
      this[i] = h ?? this._$Ej?.get(i) ?? h, this._$Em = null;
    }
  }
  requestUpdate(t, e, s) {
    if (t !== void 0) {
      const i = this.constructor, n = this[t];
      if (s ??= i.getPropertyOptions(t), !((s.hasChanged ?? L)(n, e) || s.useDefault && s.reflect && n === this._$Ej?.get(t) && !this.hasAttribute(i._$Eu(t, s)))) return;
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
        const { wrapped: o } = n, h = this[i];
        o !== !0 || this._$AL.has(i) || h === void 0 || this.C(i, void 0, n, h);
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
m.elementStyles = [], m.shadowRootOptions = { mode: "open" }, m[w("elementProperties")] = /* @__PURE__ */ new Map(), m[w("finalized")] = /* @__PURE__ */ new Map(), _t?.({ ReactiveElement: m }), (H.reactiveElementVersions ??= []).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const I = globalThis, D = I.trustedTypes, Z = D ? D.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, st = "$lit$", f = `lit$${Math.random().toFixed(9).slice(2)}$`, it = "?" + f, gt = `<${it}>`, b = document, x = () => b.createComment(""), C = (r) => r === null || typeof r != "object" && typeof r != "function", B = Array.isArray, bt = (r) => B(r) || typeof r?.[Symbol.iterator] == "function", j = `[ 	
\f\r]`, E = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, G = /-->/g, Y = />/g, _ = RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Q = /'/g, X = /"/g, rt = /^(?:script|style|textarea|title)$/i, yt = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), mt = yt(1), A = Symbol.for("lit-noChange"), p = Symbol.for("lit-nothing"), tt = /* @__PURE__ */ new WeakMap(), g = b.createTreeWalker(b, 129);
function nt(r, t) {
  if (!B(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Z !== void 0 ? Z.createHTML(t) : t;
}
const At = (r, t) => {
  const e = r.length - 1, s = [];
  let i, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = E;
  for (let h = 0; h < e; h++) {
    const a = r[h];
    let c, u, l = -1, d = 0;
    for (; d < a.length && (o.lastIndex = d, u = o.exec(a), u !== null); ) d = o.lastIndex, o === E ? u[1] === "!--" ? o = G : u[1] !== void 0 ? o = Y : u[2] !== void 0 ? (rt.test(u[2]) && (i = RegExp("</" + u[2], "g")), o = _) : u[3] !== void 0 && (o = _) : o === _ ? u[0] === ">" ? (o = i ?? E, l = -1) : u[1] === void 0 ? l = -2 : (l = o.lastIndex - u[2].length, c = u[1], o = u[3] === void 0 ? _ : u[3] === '"' ? X : Q) : o === X || o === Q ? o = _ : o === G || o === Y ? o = E : (o = _, i = void 0);
    const $ = o === _ && r[h + 1].startsWith("/>") ? " " : "";
    n += o === E ? a + gt : l >= 0 ? (s.push(c), a.slice(0, l) + st + a.slice(l) + f + $) : a + f + (l === -2 ? h : $);
  }
  return [nt(r, n + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class O {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let n = 0, o = 0;
    const h = t.length - 1, a = this.parts, [c, u] = At(t, e);
    if (this.el = O.createElement(c, s), g.currentNode = this.el.content, e === 2 || e === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (i = g.nextNode()) !== null && a.length < h; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const l of i.getAttributeNames()) if (l.endsWith(st)) {
          const d = u[o++], $ = i.getAttribute(l).split(f), U = /([.?@])?(.*)/.exec(d);
          a.push({ type: 1, index: n, name: U[2], strings: $, ctor: U[1] === "." ? Et : U[1] === "?" ? wt : U[1] === "@" ? St : N }), i.removeAttribute(l);
        } else l.startsWith(f) && (a.push({ type: 6, index: n }), i.removeAttribute(l));
        if (rt.test(i.tagName)) {
          const l = i.textContent.split(f), d = l.length - 1;
          if (d > 0) {
            i.textContent = D ? D.emptyScript : "";
            for (let $ = 0; $ < d; $++) i.append(l[$], x()), g.nextNode(), a.push({ type: 2, index: ++n });
            i.append(l[d], x());
          }
        }
      } else if (i.nodeType === 8) if (i.data === it) a.push({ type: 2, index: n });
      else {
        let l = -1;
        for (; (l = i.data.indexOf(f, l + 1)) !== -1; ) a.push({ type: 7, index: n }), l += f.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const s = b.createElement("template");
    return s.innerHTML = t, s;
  }
}
function v(r, t, e = r, s) {
  if (t === A) return t;
  let i = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const n = C(t) ? void 0 : t._$litDirective$;
  return i?.constructor !== n && (i?._$AO?.(!1), n === void 0 ? i = void 0 : (i = new n(r), i._$AT(r, e, s)), s !== void 0 ? (e._$Co ??= [])[s] = i : e._$Cl = i), i !== void 0 && (t = v(r, i._$AS(r, t.values), i, s)), t;
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
    const { el: { content: e }, parts: s } = this._$AD, i = (t?.creationScope ?? b).importNode(e, !0);
    g.currentNode = i;
    let n = g.nextNode(), o = 0, h = 0, a = s[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let c;
        a.type === 2 ? c = new P(n, n.nextSibling, this, t) : a.type === 1 ? c = new a.ctor(n, a.name, a.strings, this, t) : a.type === 6 && (c = new xt(n, this, t)), this._$AV.push(c), a = s[++h];
      }
      o !== a?.index && (n = g.nextNode(), o++);
    }
    return g.currentNode = b, i;
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
    this.type = 2, this._$AH = p, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = i?.isConnected ?? !0;
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
    t = v(this, t, e), C(t) ? t === p || t == null || t === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : t !== this._$AH && t !== A && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : bt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== p && C(this._$AH) ? this._$AA.nextSibling.data = t : this.T(b.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = O.createElement(nt(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === i) this._$AH.p(e);
    else {
      const n = new vt(i, this), o = n.u(this.options);
      n.p(e), this.T(o), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = tt.get(t.strings);
    return e === void 0 && tt.set(t.strings, e = new O(t)), e;
  }
  k(t) {
    B(this._$AH) || (this._$AH = [], this._$AR());
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
class N {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, n) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = p;
  }
  _$AI(t, e = this, s, i) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) t = v(this, t, e, 0), o = !C(t) || t !== this._$AH && t !== A, o && (this._$AH = t);
    else {
      const h = t;
      let a, c;
      for (t = n[0], a = 0; a < n.length - 1; a++) c = v(this, h[s + a], e, a), c === A && (c = this._$AH[a]), o ||= !C(c) || c !== this._$AH[a], c === p ? t = p : t !== p && (t += (c ?? "") + n[a + 1]), this._$AH[a] = c;
    }
    o && !i && this.j(t);
  }
  j(t) {
    t === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Et extends N {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === p ? void 0 : t;
  }
}
class wt extends N {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== p);
  }
}
class St extends N {
  constructor(t, e, s, i, n) {
    super(t, e, s, i, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = v(this, t, e, 0) ?? p) === A) return;
    const s = this._$AH, i = t === p && s !== p || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, n = t !== p && (s === p || i);
    i && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
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
    v(this, t);
  }
}
const Ct = I.litHtmlPolyfillSupport;
Ct?.(O, P), (I.litHtmlVersions ??= []).push("3.3.1");
const Ot = (r, t, e) => {
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
const q = globalThis;
class S extends m {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ot(e, this.renderRoot, this.renderOptions);
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
S._$litElement$ = !0, S.finalized = !0, q.litElementHydrateSupport?.({ LitElement: S });
const Pt = q.litElementPolyfillSupport;
Pt?.({ LitElement: S });
(q.litElementVersions ??= []).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const kt = (r) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(r, t);
  }) : customElements.define(r, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ut = { attribute: !0, type: String, converter: T, reflect: !1, hasChanged: L }, Mt = (r = Ut, t, e) => {
  const { kind: s, metadata: i } = e;
  let n = globalThis.litPropertyMetadata.get(i);
  if (n === void 0 && globalThis.litPropertyMetadata.set(i, n = /* @__PURE__ */ new Map()), s === "setter" && ((r = Object.create(r)).wrapped = !0), n.set(e.name, r), s === "accessor") {
    const { name: o } = e;
    return { set(h) {
      const a = t.get.call(this);
      t.set.call(this, h), this.requestUpdate(o, a, r);
    }, init(h) {
      return h !== void 0 && this.C(o, void 0, r, h), h;
    } };
  }
  if (s === "setter") {
    const { name: o } = e;
    return function(h) {
      const a = this[o];
      t.call(this, h), this.requestUpdate(o, a, r);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function Tt(r) {
  return (t, e) => typeof e == "object" ? Mt(r, t, e) : ((s, i, n) => {
    const o = i.hasOwnProperty(n);
    return i.constructor.createProperty(n, s), o ? Object.getOwnPropertyDescriptor(i, n) : void 0;
  })(r, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function R(r) {
  return Tt({ ...r, state: !0, attribute: !1 });
}
const Dt = "widget-ready";
function Ht(r) {
  r.dispatchEvent(new CustomEvent(Dt, { bubbles: !0 }));
}
var Nt = Object.defineProperty, Rt = Object.getOwnPropertyDescriptor, k = (r, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? Rt(t, e) : t, n = r.length - 1, o; n >= 0; n--)
    (o = r[n]) && (i = (s ? o(t, e, i) : o(i)) || i);
  return s && i && Nt(t, e, i), i;
};
let y = class extends S {
  constructor() {
    super(...arguments), this.display = "0", this.previousValue = 0, this.operation = null, this.waitingForOperand = !1;
  }
  connectedCallback() {
    super.connectedCallback(), queueMicrotask(() => Ht(this));
  }
  inputDigit(r) {
    this.waitingForOperand ? (this.display = r, this.waitingForOperand = !1) : this.display = this.display === "0" ? r : this.display + r;
  }
  inputDecimal() {
    this.waitingForOperand ? (this.display = "0.", this.waitingForOperand = !1) : this.display.indexOf(".") === -1 && (this.display = this.display + ".");
  }
  clearDisplay() {
    this.display = "0", this.previousValue = 0, this.operation = null, this.waitingForOperand = !1;
  }
  performOperation(r) {
    const t = parseFloat(this.display);
    if (this.operation && this.waitingForOperand) {
      this.operation = r;
      return;
    }
    if (this.previousValue === 0)
      this.previousValue = t;
    else if (this.operation) {
      const e = this.previousValue;
      let s = e;
      switch (this.operation) {
        case "+":
          s = e + t;
          break;
        case "-":
          s = e - t;
          break;
        case "×":
          s = e * t;
          break;
        case "÷":
          s = e / t;
          break;
      }
      this.display = String(s), this.previousValue = s;
    }
    this.waitingForOperand = !0, this.operation = r;
  }
  render() {
    return mt`
      <div class="container">
        <div class="display">${this.display}</div>
        <div class="buttons">
          <button class="btn clear" @click=${this.clearDisplay}>C</button>
          <button class="btn operator" @click=${() => this.performOperation("÷")}>÷</button>
          <button class="btn operator" @click=${() => this.performOperation("×")}>×</button>
          <button class="btn operator" @click=${() => this.performOperation("-")}>−</button>

          <button class="btn" @click=${() => this.inputDigit("7")}>7</button>
          <button class="btn" @click=${() => this.inputDigit("8")}>8</button>
          <button class="btn" @click=${() => this.inputDigit("9")}>9</button>
          <button class="btn operator" @click=${() => this.performOperation("+")}>+</button>

          <button class="btn" @click=${() => this.inputDigit("4")}>4</button>
          <button class="btn" @click=${() => this.inputDigit("5")}>5</button>
          <button class="btn" @click=${() => this.inputDigit("6")}>6</button>
          <button class="btn" @click=${this.inputDecimal}>.</button>

          <button class="btn" @click=${() => this.inputDigit("1")}>1</button>
          <button class="btn" @click=${() => this.inputDigit("2")}>2</button>
          <button class="btn" @click=${() => this.inputDigit("3")}>3</button>
          <button class="btn" @click=${() => this.inputDigit("0")}>0</button>

          <button class="btn equals" @click=${() => this.performOperation("=")}>=</button>
        </div>
      </div>
    `;
  }
};
y.styles = at`
    :host {
      display: block;
      height: 100%;
      font-family: system-ui, -apple-system, sans-serif;
    }

    .container {
      height: 100%;
      background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
      border-radius: 12px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      color: white;
    }

    .display {
      background: rgba(0, 0, 0, 0.3);
      border-radius: 8px;
      padding: 20px;
      text-align: right;
      font-size: 32px;
      font-weight: 600;
      margin-bottom: 16px;
      word-wrap: break-word;
      min-height: 60px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    .buttons {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
      flex: 1;
    }

    .btn {
      background: rgba(255, 255, 255, 0.1);
      border: none;
      border-radius: 8px;
      color: white;
      font-size: 20px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s;
      min-height: 50px;
    }

    .btn:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: scale(1.05);
    }

    .btn:active {
      transform: scale(0.95);
    }

    .btn.operator {
      background: rgba(59, 130, 246, 0.5);
    }

    .btn.operator:hover {
      background: rgba(59, 130, 246, 0.7);
    }

    .btn.equals {
      background: rgba(16, 185, 129, 0.6);
      grid-column: span 2;
    }

    .btn.equals:hover {
      background: rgba(16, 185, 129, 0.8);
    }

    .btn.clear {
      background: rgba(239, 68, 68, 0.5);
    }

    .btn.clear:hover {
      background: rgba(239, 68, 68, 0.7);
    }

    @media (max-width: 768px) {
      .display {
        font-size: 24px;
        padding: 16px;
      }
      .btn {
        font-size: 16px;
        min-height: 40px;
      }
    }
  `;
k([
  R()
], y.prototype, "display", 2);
k([
  R()
], y.prototype, "previousValue", 2);
k([
  R()
], y.prototype, "operation", 2);
k([
  R()
], y.prototype, "waitingForOperand", 2);
y = k([
  kt("mb-calculator")
], y);
export {
  y as CalculatorWidget
};
