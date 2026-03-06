/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const U = globalThis, K = U.ShadowRoot && (U.ShadyCSS === void 0 || U.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, V = Symbol(), Z = /* @__PURE__ */ new WeakMap();
let ht = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== V) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (K && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = Z.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && Z.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const bt = (r) => new ht(typeof r == "string" ? r : r + "", void 0, V), _t = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((s, i, n) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + r[n + 1], r[0]);
  return new ht(e, r, V);
}, vt = (r, t) => {
  if (K) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = U.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, r.appendChild(s);
  }
}, Q = K ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return bt(e);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: yt, defineProperty: St, getOwnPropertyDescriptor: At, getOwnPropertyNames: Et, getOwnPropertySymbols: wt, getPrototypeOf: Mt } = Object, H = globalThis, X = H.trustedTypes, kt = X ? X.emptyScript : "", xt = H.reactiveElementPolyfillSupport, w = (r, t) => r, L = { toAttribute(r, t) {
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
} }, ct = (r, t) => !yt(r, t), tt = { attribute: !0, type: String, converter: L, reflect: !1, useDefault: !1, hasChanged: ct };
Symbol.metadata ??= Symbol("metadata"), H.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let v = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = tt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && St(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: n } = At(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: i, set(o) {
      const c = i?.call(this);
      n?.call(this, o), this.requestUpdate(t, c, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? tt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(w("elementProperties"))) return;
    const t = Mt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(w("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(w("properties"))) {
      const e = this.properties, s = [...Et(e), ...wt(e)];
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
      for (const i of s) e.unshift(Q(i));
    } else t !== void 0 && e.push(Q(t));
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
    return vt(t, this.constructor.elementStyles), t;
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
      const n = (s.converter?.toAttribute !== void 0 ? s.converter : L).toAttribute(e, s.type);
      this._$Em = t, n == null ? this.removeAttribute(i) : this.setAttribute(i, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const n = s.getPropertyOptions(i), o = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : L;
      this._$Em = i;
      const c = o.fromAttribute(e, n.type);
      this[i] = c ?? this._$Ej?.get(i) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, e, s) {
    if (t !== void 0) {
      const i = this.constructor, n = this[t];
      if (s ??= i.getPropertyOptions(t), !((s.hasChanged ?? ct)(n, e) || s.useDefault && s.reflect && n === this._$Ej?.get(t) && !this.hasAttribute(i._$Eu(t, s)))) return;
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
        const { wrapped: o } = n, c = this[i];
        o !== !0 || this._$AL.has(i) || c === void 0 || this.C(i, void 0, n, c);
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
v.elementStyles = [], v.shadowRootOptions = { mode: "open" }, v[w("elementProperties")] = /* @__PURE__ */ new Map(), v[w("finalized")] = /* @__PURE__ */ new Map(), xt?.({ ReactiveElement: v }), (H.reactiveElementVersions ??= []).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const F = globalThis, R = F.trustedTypes, et = R ? R.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, lt = "$lit$", f = `lit$${Math.random().toFixed(9).slice(2)}$`, ut = "?" + f, Pt = `<${ut}>`, _ = document, k = () => _.createComment(""), x = (r) => r === null || typeof r != "object" && typeof r != "function", Y = Array.isArray, Ct = (r) => Y(r) || typeof r?.[Symbol.iterator] == "function", W = `[ 	
\f\r]`, E = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, st = /-->/g, it = />/g, m = RegExp(`>|${W}(?:([^\\s"'>=/]+)(${W}*=${W}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), rt = /'/g, nt = /"/g, dt = /^(?:script|style|textarea|title)$/i, Tt = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), Dt = Tt(1), y = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), ot = /* @__PURE__ */ new WeakMap(), b = _.createTreeWalker(_, 129);
function pt(r, t) {
  if (!Y(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return et !== void 0 ? et.createHTML(t) : t;
}
const Ut = (r, t) => {
  const e = r.length - 1, s = [];
  let i, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = E;
  for (let c = 0; c < e; c++) {
    const a = r[c];
    let l, d, h = -1, p = 0;
    for (; p < a.length && (o.lastIndex = p, d = o.exec(a), d !== null); ) p = o.lastIndex, o === E ? d[1] === "!--" ? o = st : d[1] !== void 0 ? o = it : d[2] !== void 0 ? (dt.test(d[2]) && (i = RegExp("</" + d[2], "g")), o = m) : d[3] !== void 0 && (o = m) : o === m ? d[0] === ">" ? (o = i ?? E, h = -1) : d[1] === void 0 ? h = -2 : (h = o.lastIndex - d[2].length, l = d[1], o = d[3] === void 0 ? m : d[3] === '"' ? nt : rt) : o === nt || o === rt ? o = m : o === st || o === it ? o = E : (o = m, i = void 0);
    const g = o === m && r[c + 1].startsWith("/>") ? " " : "";
    n += o === E ? a + Pt : h >= 0 ? (s.push(l), a.slice(0, h) + lt + a.slice(h) + f + g) : a + f + (h === -2 ? c : g);
  }
  return [pt(r, n + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class P {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let n = 0, o = 0;
    const c = t.length - 1, a = this.parts, [l, d] = Ut(t, e);
    if (this.el = P.createElement(l, s), b.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (i = b.nextNode()) !== null && a.length < c; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const h of i.getAttributeNames()) if (h.endsWith(lt)) {
          const p = d[o++], g = i.getAttribute(h).split(f), T = /([.?@])?(.*)/.exec(p);
          a.push({ type: 1, index: n, name: T[2], strings: g, ctor: T[1] === "." ? Rt : T[1] === "?" ? Nt : T[1] === "@" ? Ht : B }), i.removeAttribute(h);
        } else h.startsWith(f) && (a.push({ type: 6, index: n }), i.removeAttribute(h));
        if (dt.test(i.tagName)) {
          const h = i.textContent.split(f), p = h.length - 1;
          if (p > 0) {
            i.textContent = R ? R.emptyScript : "";
            for (let g = 0; g < p; g++) i.append(h[g], k()), b.nextNode(), a.push({ type: 2, index: ++n });
            i.append(h[p], k());
          }
        }
      } else if (i.nodeType === 8) if (i.data === ut) a.push({ type: 2, index: n });
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
function S(r, t, e = r, s) {
  if (t === y) return t;
  let i = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const n = x(t) ? void 0 : t._$litDirective$;
  return i?.constructor !== n && (i?._$AO?.(!1), n === void 0 ? i = void 0 : (i = new n(r), i._$AT(r, e, s)), s !== void 0 ? (e._$Co ??= [])[s] = i : e._$Cl = i), i !== void 0 && (t = S(r, i._$AS(r, t.values), i, s)), t;
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
    const { el: { content: e }, parts: s } = this._$AD, i = (t?.creationScope ?? _).importNode(e, !0);
    b.currentNode = i;
    let n = b.nextNode(), o = 0, c = 0, a = s[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let l;
        a.type === 2 ? l = new C(n, n.nextSibling, this, t) : a.type === 1 ? l = new a.ctor(n, a.name, a.strings, this, t) : a.type === 6 && (l = new Bt(n, this, t)), this._$AV.push(l), a = s[++c];
      }
      o !== a?.index && (n = b.nextNode(), o++);
    }
    return b.currentNode = _, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class C {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, s, i) {
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = i?.isConnected ?? !0;
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
    t = S(this, t, e), x(t) ? t === u || t == null || t === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : t !== this._$AH && t !== y && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ct(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== u && x(this._$AH) ? this._$AA.nextSibling.data = t : this.T(_.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = P.createElement(pt(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === i) this._$AH.p(e);
    else {
      const n = new Ot(i, this), o = n.u(this.options);
      n.p(e), this.T(o), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = ot.get(t.strings);
    return e === void 0 && ot.set(t.strings, e = new P(t)), e;
  }
  k(t) {
    Y(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const n of t) i === e.length ? e.push(s = new C(this.O(k()), this.O(k()), this, this.options)) : s = e[i], s._$AI(n), i++;
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
class B {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, n) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = u;
  }
  _$AI(t, e = this, s, i) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) t = S(this, t, e, 0), o = !x(t) || t !== this._$AH && t !== y, o && (this._$AH = t);
    else {
      const c = t;
      let a, l;
      for (t = n[0], a = 0; a < n.length - 1; a++) l = S(this, c[s + a], e, a), l === y && (l = this._$AH[a]), o ||= !x(l) || l !== this._$AH[a], l === u ? t = u : t !== u && (t += (l ?? "") + n[a + 1]), this._$AH[a] = l;
    }
    o && !i && this.j(t);
  }
  j(t) {
    t === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Rt extends B {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === u ? void 0 : t;
  }
}
class Nt extends B {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== u);
  }
}
class Ht extends B {
  constructor(t, e, s, i, n) {
    super(t, e, s, i, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = S(this, t, e, 0) ?? u) === y) return;
    const s = this._$AH, i = t === u && s !== u || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, n = t !== u && (s === u || i);
    i && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Bt {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    S(this, t);
  }
}
const It = F.litHtmlPolyfillSupport;
It?.(P, C), (F.litHtmlVersions ??= []).push("3.3.1");
const Wt = (r, t, e) => {
  const s = e?.renderBefore ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const n = e?.renderBefore ?? null;
    s._$litPart$ = i = new C(t.insertBefore(k(), n), n, void 0, e ?? {});
  }
  return i._$AI(r), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const G = globalThis;
class M extends v {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Wt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return y;
  }
}
M._$litElement$ = !0, M.finalized = !0, G.litElementHydrateSupport?.({ LitElement: M });
const zt = G.litElementPolyfillSupport;
zt?.({ LitElement: M });
(G.litElementVersions ??= []).push("4.2.1");
function jt() {
  return {
    bridge: {},
    commandHandlers: /* @__PURE__ */ new Map(),
    instances: /* @__PURE__ */ new Map()
  };
}
function J() {
  const r = globalThis;
  return r.__MYBOARD_SDK_RUNTIME__ || (r.__MYBOARD_SDK_RUNTIME__ = jt()), r.__MYBOARD_SDK_RUNTIME__;
}
class Lt {
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
      } catch (n) {
        console.error(
          `[WidgetStore] Error in subscriber for ${t}:`,
          n
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
const q = J(), gt = q.instances.get("widget-store") ?? new Lt();
q.instances.has("widget-store") || q.instances.set("widget-store", gt);
const N = gt;
var qt = {};
const ft = J(), mt = (r) => `${r}:settings`;
function I() {
  return ft.bridge;
}
function Kt() {
  return ft.commandHandlers;
}
function Vt(r) {
  const t = I();
  return t.getWidgetSettings ? t.getWidgetSettings(r) : N.getState(mt(r));
}
function Ft(r, t) {
  const e = I();
  if (e.setWidgetSettings) {
    e.setWidgetSettings(r, t);
    return;
  }
  N.setState(mt(r), t);
}
function Yt(r) {
  const t = I();
  if (!t.beforePublishEvent) return !0;
  try {
    return t.beforePublishEvent(r);
  } catch (e) {
    return typeof qt > "u" && console.warn("[host-bridge] beforePublishEvent failed; dropping event", e), !1;
  }
}
function Gt(r, t) {
  const e = I();
  if (e.registerWidgetCommandHandler)
    return e.registerWidgetCommandHandler(r, t);
  const s = Kt();
  return s.set(r, t), () => {
    s.get(r) === t && s.delete(r);
  };
}
const A = J();
A.instances.has("event-subscribers") || A.instances.set("event-subscribers", /* @__PURE__ */ new Map());
class Jt {
  get subscribers() {
    return A.instances.get("event-subscribers");
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
    if (!Yt(i))
      return;
    const n = `${t}:${e}`, o = this.subscribers.get(n);
    o && o.size > 0 && o.forEach((c) => {
      try {
        c(i);
      } catch (a) {
        console.error(
          `[EventBus] Error in handler for ${n}:`,
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
      const n = this.subscribers.get(i);
      n && (n.delete(s), n.size === 0 && this.subscribers.delete(i));
    };
  }
  /**
   * Clear all subscriptions (useful for cleanup in tests).
   */
  clear() {
    this.subscribers.clear();
  }
}
const $t = A.instances.get("event-bus") ?? new Jt();
A.instances.has("event-bus") || A.instances.set("event-bus", $t);
const D = $t, Zt = "widget-ready", Qt = "widget-error";
function Xt(r) {
  r.dispatchEvent(new CustomEvent(Zt, { bubbles: !0 }));
}
function te(r, t) {
  const e = { reason: t };
  r.dispatchEvent(
    new CustomEvent(Qt, { bubbles: !0, detail: e })
  );
}
const $ = "pomodoro", at = "pomodoro:history", O = {
  workMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 15
}, ee = {
  workMinutes: { min: 5, max: 90 },
  shortBreakMinutes: { min: 1, max: 30 },
  longBreakMinutes: { min: 5, max: 45 }
};
function z(r, t) {
  const e = ee[r], s = O[r], i = typeof t == "number" ? t : s;
  return Math.min(e.max, Math.max(e.min, i));
}
function j(r) {
  return {
    workMinutes: z("workMinutes", r?.workMinutes),
    shortBreakMinutes: z(
      "shortBreakMinutes",
      r?.shortBreakMinutes
    ),
    longBreakMinutes: z(
      "longBreakMinutes",
      r?.longBreakMinutes
    )
  };
}
class se extends M {
  constructor() {
    super(...arguments), this.phase = "idle", this.remainingMs = O.workMinutes * 60 * 1e3, this.activePhaseDurationMs = O.workMinutes * 60 * 1e3, this.intervalId = null, this.completedWorkSessions = 0, this.settings = O, this.unsubs = [], this.start = (t) => {
      if (!this.intervalId) {
        if (t?.phase || t?.minutes || this.phase === "idle") {
          const e = t?.phase ?? (this.phase === "break" ? "break" : "work");
          this.startPhase(e, t?.minutes);
        } else
          this.emitPhaseStartedEvent();
        this.intervalId = window.setInterval(this.tick, 1e3), this.requestUpdate();
      }
    }, this.pause = () => {
      this.intervalId && (window.clearInterval(this.intervalId), this.intervalId = null, this.requestUpdate());
    }, this.reset = () => {
      this.stop(), this.phase = "idle", this.syncIdleDuration(), this.requestUpdate();
    }, this.tick = () => {
      if (this.remainingMs = Math.max(0, this.remainingMs - 1e3), this.remainingMs === 0) {
        const t = this.phase, e = this.activePhaseDurationMs;
        if (this.stop(), t === "work") {
          this.completedWorkSessions += 1;
          const s = Math.max(
            1,
            Math.round(e / (60 * 1e3))
          );
          D.publish($, "session-completed", {
            completedAt: Date.now(),
            durationMinutes: s
          });
          const i = N.getState(at) ?? [];
          N.setState(
            at,
            [
              {
                completedAt: Date.now(),
                durationMinutes: s
              },
              ...i
            ].slice(0, 30)
          );
        }
        t === "work" ? this.startPhase("break") : (this.phase = "work", this.activePhaseDurationMs = this.getDefaultDurationMs("work"), this.remainingMs = this.activePhaseDurationMs);
      }
      this.requestUpdate();
    }, this.updateSetting = (t, e) => {
      const s = Number(e);
      Number.isNaN(s) || (this.settings = j({ ...this.settings, [t]: s }), this.phase === "idle" && this.syncIdleDuration(), this.persistSettings(), this.requestUpdate());
    };
  }
  static {
    this.styles = _t`
    :host {
      display: block;
      font-family: system-ui, -apple-system, Segoe UI, sans-serif;
      height: 100%;
    }
    .surface {
      height: 100%;
      background: linear-gradient(135deg, #fecaca 0%, #fca5a5 100%);
      border-radius: 16px;
      padding: 16px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 10px;
      border: 1px solid rgba(239, 68, 68, 0.2);
    }
    .row {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    .row input {
      width: 72px;
      border: 1px solid rgba(239, 68, 68, 0.3);
      border-radius: 8px;
      padding: 5px 7px;
      background: rgba(255, 255, 255, 0.9);
    }
    button {
      padding: 8px 14px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.9);
      cursor: pointer;
      font-weight: 500;
      font-size: 0.85rem;
      color: #374151;
    }
    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .time {
      font-size: 2.4rem;
      font-weight: 700;
      color: #1f2937;
      font-variant-numeric: tabular-nums;
      line-height: 1;
    }
    .phase {
      padding: 5px 10px;
      border-radius: 999px;
      font-size: 0.72rem;
      font-weight: 700;
      text-transform: uppercase;
      color: white;
    }
    .phase.work {
      background: #ef4444;
    }
    .phase.break {
      background: #10b981;
    }
    .phase.idle {
      background: #64748b;
    }
    .bar {
      height: 7px;
      background: rgba(255, 255, 255, 0.35);
      border-radius: 999px;
      overflow: hidden;
      margin-top: auto;
    }
    .bar > div {
      height: 100%;
      background: linear-gradient(90deg, #ef4444 0%, #dc2626 100%);
      transition: width 0.3s ease;
    }
    .meta {
      color: #7f1d1d;
      font-size: 0.75rem;
      display: flex;
      justify-content: space-between;
    }
  `;
  }
  connectedCallback() {
    super.connectedCallback();
    try {
      const t = Vt($);
      this.settings = j(t), this.syncIdleDuration();
      const e = D.subscribe(
        "host",
        "settings-updated",
        (i) => {
          const { widgetId: n, settings: o } = i.data;
          n === $ && (this.settings = j({
            ...this.settings,
            ...o
          }), this.phase === "idle" && this.syncIdleDuration(), this.requestUpdate());
        }
      ), s = Gt(
        $,
        async (i) => {
          const { commandType: n, payload: o } = i;
          if (n === "timer.start") {
            const c = o?.phase === "work" || o?.phase === "break" ? o.phase : void 0, a = typeof o?.minutes == "number" && o.minutes > 0 ? o.minutes : void 0;
            return this.start({ phase: c, minutes: a }), { ok: !0 };
          }
          return n === "timer.pause" ? (this.pause(), { ok: !0 }) : n === "timer.reset" ? (this.reset(), { ok: !0 }) : {
            ok: !1,
            code: "COMMAND_ACTION_NOT_SUPPORTED",
            reason: `pomodoro does not support ${n}`
          };
        }
      );
      this.unsubs = [e, s], queueMicrotask(() => Xt(this));
    } catch (t) {
      te(this, t instanceof Error ? t.message : "mount-error");
    }
  }
  disconnectedCallback() {
    this.stop(), this.unsubs.forEach((t) => t()), this.unsubs = [], super.disconnectedCallback();
  }
  syncIdleDuration() {
    this.remainingMs = this.settings.workMinutes * 60 * 1e3, this.activePhaseDurationMs = this.remainingMs;
  }
  getBreakMinutes() {
    return this.completedWorkSessions > 0 && this.completedWorkSessions % 4 === 0 ? this.settings.longBreakMinutes : this.settings.shortBreakMinutes;
  }
  getDefaultDurationMs(t) {
    return (t === "work" ? this.settings.workMinutes : this.getBreakMinutes()) * 60 * 1e3;
  }
  emitPhaseStartedEvent() {
    if (this.phase === "work") {
      D.publish($, "session-started", {
        startedAt: Date.now(),
        phase: this.phase
      });
      return;
    }
    this.phase === "break" && D.publish($, "break-started", {
      startedAt: Date.now(),
      longBreak: this.activePhaseDurationMs === this.settings.longBreakMinutes * 60 * 1e3
    });
  }
  persistSettings() {
    Ft($, this.settings);
  }
  startPhase(t, e, s = !0) {
    const i = typeof e == "number" && e > 0 ? Math.round(e * 60 * 1e3) : this.getDefaultDurationMs(t);
    this.phase = t, this.remainingMs = i, this.activePhaseDurationMs = i, s && this.emitPhaseStartedEvent();
  }
  stop() {
    this.intervalId && (window.clearInterval(this.intervalId), this.intervalId = null);
  }
  fmt(t) {
    const e = Math.floor(t / 1e3), s = Math.floor(e / 60), i = e % 60;
    return `${String(s).padStart(2, "0")}:${String(i).padStart(2, "0")}`;
  }
  render() {
    const t = Math.max(this.activePhaseDurationMs, 6e4), e = Math.max(1, Math.round(t / (60 * 1e3))), s = Math.max(
      0,
      Math.min(100, 100 - Math.round(this.remainingMs / t * 100))
    );
    return Dt`
      <div class="surface">
        <div class="row">
          <div class="time">${this.fmt(this.remainingMs)}</div>
          <div class="phase ${this.phase}">${this.phase}</div>
        </div>
        <div class="row">
          <button @click=${this.start} ?disabled=${!!this.intervalId}>
            Start
          </button>
          <button @click=${this.pause} ?disabled=${!this.intervalId}>
            Pause
          </button>
          <button @click=${this.reset}>Reset</button>
        </div>
        <div class="row">
          <label>
            Work
            <input
              type="number"
              min="5"
              max="90"
              .value=${String(this.settings.workMinutes)}
              @change=${(i) => this.updateSetting(
      "workMinutes",
      i.target.value
    )}
            />
          </label>
          <label>
            Short
            <input
              type="number"
              min="1"
              max="30"
              .value=${String(this.settings.shortBreakMinutes)}
              @change=${(i) => this.updateSetting(
      "shortBreakMinutes",
      i.target.value
    )}
            />
          </label>
          <label>
            Long
            <input
              type="number"
              min="5"
              max="45"
              .value=${String(this.settings.longBreakMinutes)}
              @change=${(i) => this.updateSetting(
      "longBreakMinutes",
      i.target.value
    )}
            />
          </label>
        </div>
        <div class="meta">
          <span>Completed sessions: ${this.completedWorkSessions}</span>
          <span>${e}m cycle</span>
        </div>
        <div class="bar"><div style="width:${s}%"></div></div>
      </div>
    `;
  }
}
customElements.get("mb-pomodoro") || customElements.define("mb-pomodoro", se);
export {
  se as MbPomodoroElement
};
