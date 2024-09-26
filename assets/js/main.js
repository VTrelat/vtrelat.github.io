/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById("nav-menu"),
	navToggle = document.getElementById("nav-toggle"),
	navClose = document.getElementById("nav-close");

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
	navToggle.addEventListener("click", () => {
		navMenu.classList.add("show-menu");
	});
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
	navClose.addEventListener("click", () => {
		navMenu.classList.remove("show-menu");
	});
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
	const navMenu = document.getElementById("nav-menu");
	// When we click on each nav__link, we remove the show-menu class
	navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== ACCORDION SKILLS ====================*/
const skillsContent = document.getElementsByClassName("skills__content"),
	skillsHeader = document.querySelectorAll(".skills__header");

function toggleSkills() {
	let itemClass = this.parentNode.className;

	// for (let i = 0; i < skillsContent.length; i++) {
	//     skillsContent[i].className = "skills__content skills__close";
	// }
	if (itemClass === "skills__content skills__close") {
		this.parentNode.className = "skills__content skills__open";
	} else {
		this.parentNode.className = "skills__content skills__close";
	}
}

skillsHeader.forEach((el) => {
	el.addEventListener("click", toggleSkills);
});

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll("[data-target]"),
	tabContents = document.querySelectorAll("[data-content]");

tabs.forEach((tab) => {
	tab.addEventListener("click", () => {
		const target = document.querySelector(tab.dataset.target);

		tabContents.forEach((tabContent) => {
			tabContent.classList.remove("qualification__active");
		});
		target.classList.add("qualification__active");

		tabs.forEach((tab) => {
			tab.classList.remove("qualification__active");
		});
		tab.classList.add("qualification__active");
	});
});

/*==================== SERVICES MODAL ====================*/

/*==================== PORTFOLIO SWIPER  ====================*/

/*==================== TESTIMONIAL ====================*/

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
	const scrollY = window.scrollY;

	sections.forEach((current) => {
		const sectionHeight = current.offsetHeight,
			sectionTop = current.offsetTop - 50,
			sectionId = current.getAttribute("id");

		if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
			document.querySelector(".nav__menu a[href*=" + sectionId + "]").classList.add("active-link");
		} else {
			document.querySelector(".nav__menu a[href*=" + sectionId + "]").classList.remove("active-link");
		}
	});
}
window.addEventListener("scroll", scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
	const nav = document.getElementById("header");
	// When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
	if (this.scrollY >= 80) nav.classList.add("scroll-header");
	else nav.classList.remove("scroll-header");
}

window.addEventListener("scroll", scrollHeader);
/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
	const scrollUp = document.getElementById("scroll-up");
	// When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
	if (this.scrollY >= 560) scrollUp.classList.add("show-scroll");
	else scrollUp.classList.remove("show-scroll");
}

window.addEventListener("scroll", scrollUp);

/*==================== DARK LIGHT THEME ====================*/

/*====================== 3D CHARACTER ======================*/
!function () {
	try {
		var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {}, t = (new Error).stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "a4227419-e663-45be-bdf2-458d4fb13dc3", e._sentryDebugIdIdentifier = "sentry-dbid-a4227419-e663-45be-bdf2-458d4fb13dc3")
	} catch (e) { }
}();
var _global = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {}; _global.SENTRY_RELEASE = { id: "cae3d7a75249bac1dd7a7727084a84c3eaa41eac" }, (() => { "use strict"; function e(e, t) { (null == t || t > e.length) && (t = e.length); for (var n = 0, r = new Array(t); n < t; n++)r[n] = e[n]; return r } const t = function (t) { var n = t.prefix, r = t.inbox, o = t.outbox, a = function () { try { return new EventTarget } catch (e) { return document.createDocumentFragment() } }(); return r.addEventListener("message", (function (t) { if (function (e) { var t; return (null === (t = e.data) || void 0 === t ? void 0 : t[0]) === n }(t)) { var r = (l = t.data, d = 3, function (e) { if (Array.isArray(e)) return e }(l) || function (e, t) { var n = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"]; if (null != n) { var r, o, a = [], i = !0, c = !1; try { for (n = n.call(e); !(i = (r = n.next()).done) && (a.push(r.value), !t || a.length !== t); i = !0); } catch (e) { c = !0, o = e } finally { try { i || null == n.return || n.return() } finally { if (c) throw o } } return a } }(l, d) || function (t, n) { if (t) { if ("string" == typeof t) return e(t, n); var r = Object.prototype.toString.call(t).slice(8, -1); return "Object" === r && t.constructor && (r = t.constructor.name), "Map" === r || "Set" === r ? Array.from(r) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? e(t, n) : void 0 } }(l, d) || function () { throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.") }()), o = r[1], i = r[2], c = new Event(o); c.args = i, a.dispatchEvent(c) } var l, d })), { addMessageListener: a.addEventListener.bind(a), removeMessageListener: a.removeEventListener.bind(a), sendMessage: function (e) { var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}; o.postMessage([n, e, t], "*") } } }; function n(e, t) { (null == t || t > e.length) && (t = e.length); for (var n = 0, r = new Array(t); n < t; n++)r[n] = e[n]; return r } var r, o = function (e) { var t, r = (t = e, Object.fromEntries(Object.entries(t).filter((function (e) { return null != (t = e, r = 2, function (e) { if (Array.isArray(e)) return e }(t) || function (e, t) { var n = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"]; if (null != n) { var r, o, a = [], i = !0, c = !1; try { for (n = n.call(e); !(i = (r = n.next()).done) && (a.push(r.value), !t || a.length !== t); i = !0); } catch (e) { c = !0, o = e } finally { try { i || null == n.return || n.return() } finally { if (c) throw o } } return a } }(t, r) || function (e, t) { if (e) { if ("string" == typeof e) return n(e, t); var r = Object.prototype.toString.call(e).slice(8, -1); return "Object" === r && e.constructor && (r = e.constructor.name), "Map" === r || "Set" === r ? Array.from(r) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? n(e, t) : void 0 } }(t, r) || function () { throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.") }())[1]; var t, r })))); return r && Object.keys(r).length >= 1 ? "?".concat(new URLSearchParams(r)) : "" }; window.__STRAVA_EMBED_BOOTSTRAP__ || (r = function () { var e = ["route"]; document.querySelectorAll(".strava-embed-placeholder").forEach((function (n) { var r, a, i = n.dataset, c = i.embedType, l = i.embedId, d = i.mapHash, u = function (e, t) { if (null == e) return {}; var n, r, o = function (e, t) { if (null == e) return {}; var n, r, o = {}, a = Object.keys(e); for (r = 0; r < a.length; r++)n = a[r], t.indexOf(n) >= 0 || (o[n] = e[n]); return o }(e, t); if (Object.getOwnPropertySymbols) { var a = Object.getOwnPropertySymbols(e); for (r = 0; r < a.length; r++)n = a[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (o[n] = e[n]) } return o }(i, ["embedType", "embedId", "mapHash"]), s = document.createElement("iframe"); s.setAttribute("frameborder", 0); var f = "true" === u.fullWidth && e.includes(c), b = "\n        ".concat(f ? "width: 100%;" : "width: 554px;", "\n        min-width: 250px;\n        max-width: 100%;\n        height: 650px;\n        display: block;\n      "); s.setAttribute("style", b); var y = o(u), m = (null === (a = window.crypto) || void 0 === a || null === (r = a.randomUUID) || void 0 === r ? void 0 : r.call(a)) || (Math.random() + 1).toString(36).substring(2), v = new URLSearchParams({ ns: m, hostOrigin: window.location.origin, hostPath: window.location.pathname, hostTitle: document.title }), h = d ? "&mapHash=".concat(d) : "", p = "".concat("https://strava-embeds.com", "/").concat(c, "/").concat(l).concat(y, "#").concat(v).concat(h); s.setAttribute("src", p), n.replaceWith(s); var w = t({ prefix: m, inbox: window, outbox: s.contentWindow }); w.addMessageListener("BROADCAST_IFRAME_HEIGHT", (function (e) { var t = e.args; s.style.height = "".concat(t, "px") })), window.__STRAVA_EMBED_SETTINGS_CHANGE_LISTENER__ && w.addMessageListener("BROADCAST_SETTINGS_CHANGE", (function (e) { var t = e.args; window.__STRAVA_EMBED_SETTINGS_CHANGE_LISTENER__(t) })), window.addEventListener("focus", (function () { w.sendMessage("BROADCAST_HOST_FOCUS") })) })) }, window.__STRAVA_EMBED_BOOTSTRAP__ = r), window.__STRAVA_EMBED_BOOTSTRAP__() })();