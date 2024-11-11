var iOSjs = new function () {
	this.init = function () {
		this.enableBinding(), this.addEventListener(window, "load", this.handleWindowLoad.bind(this)), this.addEventListener(window, "orientationchange", this.handleOrientationChange.bind(this)), this.addEventListener(window, "resize", this.handleReize.bind(this))
	};
	var t = null;
	this.setResFunction = function (e) {
		t = e
	};
	this.isiOSDevice = function () {
		var t = navigator.userAgent;
		return t.indexOf("iPhone") > -1 || t.indexOf("iPod") > -1 || t.indexOf("iPad") > -1
	}, this.isiPhone = function () {
		return navigator.userAgent.indexOf("iPhone") > -1
	}, this.isiPod = function () {
		return navigator.userAgent.indexOf("iPod") > -1
	}, this.isiPad = function () {
		return navigator.userAgent.indexOf("iPad") > -1
	}, this.hasRetinaDisplay = function () {
		return !!window.devicePixelRatio && window.devicePixelRatio > 1
	}, this.isFullscreen = function () {
		return navigator.standalone
	}, this.getViewportSize = function () {
		var t = this.getWindowSize(),
			e = this.getElementSize(document.body).width / t.width;
		return {
			width: t.width * e,
			height: t.height * e
		}
	}, this.getNormalWindowSize = function () {
		var t = 0;
		return "number" == typeof window.innerWidth ? (t = window.innerWidth, height = window.innerHeight) : document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight) ? (t = document.documentElement.clientWidth, height = document.documentElement.clientHeight) : document.body && (document.body.clientWidth || document.body.clientHeight) && (t = document.body.clientWidth, height = document.body.clientHeight), {
			width: t,
			height: height
		}
	}, this.getWindowSize = function () {
		var t = 0,
			e = 0;
		if(this.isiOSDevice()) {
			if(t = screen.width, e = screen.height, 0 != window.orientation) {
				var i = t;
				t = e, e = i
			}
			var n = navigator.userAgent;
			this.isFullscreen() && "black-translucent" == iOS_getMetaContent("apple-mobile-web-app-status-bar-style").toLowerCase() || (e -= 20), (n.indexOf("iPhone") > -1 || n.indexOf("iPod") > -1) && (this.isFullscreen() || (0 == window.orientation ? e -= 44 : e -= 32)), n.indexOf("iPad") > -1 && (this.isFullscreen() || (e -= 58))
		} else {
			var o = this.getNormalWindowSize();
			t = o.width, e = o.height
		}
		return {
			width: t,
			height: e
		}
	}, this.getCurSize = function () {
		return this.getNormalWindowSize()
	}, this.getSizeWithoutPanels = function () {
		var t = 0,
			e = 0;
		t = screen.width, e = screen.height;
		var i = this.getNormalWindowSize();
		if(0 != (i.width > i.height ? 1 : 0)) {
			var n = t;
			t = e, e = n
		}
		return {
			width: t,
			height: e
		}
	}, this.getMaxSize = function () {
		var t = 0,
			e = 0,
			i = this.getNormalWindowSize(),
			n = i.width > i.height ? 1 : 0;
		if(this.isiOSDevice()) {
			if(t = screen.width, e = screen.height, 0 != n) {
				var o = t;
				t = e, e = o
			}
			var d = navigator.userAgent;
			(d.indexOf("iPhone") > -1 || d.indexOf("iPod") > -1) && 0 == n && (e = this.getNormalWindowSize().height), d.indexOf("iPad") > -1 && (t = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, e = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)
		} else t = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, e = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		return {
			width: t,
			height: e
		}
	}, this.getPageSize = function () {
		return this.getElementSize(document.body)
	}, this.getElementSize = function (t) {
		return t ? document.all ? {
			width: t.style.pixelWidth,
			height: t.style.pixelHeight
		} : {
			width: t.offsetWidth,
			height: t.offsetHeight
		} : {
			width: 0,
			height: 0
		}
	}, this.getElementOffset = function (t) {
		for(var e = 0, i = 0; t && !isNaN(t.offsetLeft) && !isNaN(t.offsetTop);) e += t.offsetLeft - t.scrollLeft, i += t.offsetTop - t.scrollTop, t = t.offsetParent;
		return {
			x: e,
			y: i
		}
	}, this.getElementPadding = function (t) {
		var e = t.currentStyle || window.getComputedStyle(t);
		return {
			top: parseFloat(e.paddingTop),
			right: parseFloat(e.paddingRight),
			bottom: parseFloat(e.paddingBottom),
			left: parseFloat(e.paddingLeft)
		}
	}, this.getElementMargin = function (t) {
		var e = t.currentStyle || window.getComputedStyle(t);
		return {
			top: parseFloat(e.marginTop),
			right: parseFloat(e.marginRight),
			bottom: parseFloat(e.marginBottom),
			left: parseFloat(e.marginLeft)
		}
	}, this.getMetaContent = function (t) {
		t = t.toLowerCase();
		for(var e = document.getElementsByTagName("meta"), i = 0; i < e.length; i++) {
			var n = e[i];
			if(n.name.toLowerCase() == t) return n.content
		}
		return null
	}, this.enableBinding = function () {
		Function.prototype.bind || (Function.prototype.bind = function (t) {
			var e = this;
			return function () {
				return e.apply(t, arguments)
			}
		})
	}, this.addEventListener = function (t, e, i) {
		return t.addEventListener ? (t.addEventListener(e, i, !1), !0) : !!t.attachEvent && t.attachEvent("on" + e, i)
	}, this.removeEventListener = function (t, e, i) {
		return t.removeEventListener ? (t.removeEventListener(e, i, !1), !0) : !!t.detachEvent && t.detachEvent("on" + e, i)
	}, this.handleWindowLoad = function (t) {
		this.initPage(), this.updateOrientation(), this.updateHeight()
	}, this.handleOrientationChange = function (t) {
		this.updateOrientation(), this.resize()
	}, this.handleReize = function (t) {
		this.resize();
		var e = this;
		setTimeout(function () {
			e.resize()
		}, 500)
	}, this.initPage = function () {
		this.isFullscreen() && this.createWebappLinks();
		var t = document.documentElement,
			e = t.className.split(" ");
		if(this.hasRetinaDisplay() && -1 == e.indexOf("retina") && e.push("retina"), this.isiOSDevice()) {
			-1 == e.indexOf("iOS") && e.push("iOS"), this.isFullscreen() && -1 == e.indexOf("fullscreen") && e.push("fullscreen");
			var i = navigator.userAgent;
			i.indexOf("iPhone") > -1 ? t.setAttribute("device", "iPhone") : i.indexOf("iPod") > -1 ? t.setAttribute("device", "iPod") : i.indexOf("iPad") > -1 && t.setAttribute("device", "iPad"), i.indexOf("iPhone") > -1 || i.indexOf("iPod") > -1 ? t.setAttribute("deviceFamily", "iPhone_iPod") : i.indexOf("iPad") > -1 && t.setAttribute("deviceFamily", "iPad")
		}
		t.className = e.join(" ")
	}, this.updateOrientation = function () {
		var t = "portrait";
		90 == window.orientation || -90 == window.orientation ? (t = "landscape", 1) : 0, document.documentElement.setAttribute("orientation", t)
	}, this.resize = function () {
		this.updateHeight()
	}, this.hideAddressBar = function () {}, this.updateHeight = function () {
		var e = document.body,
			i = this.getViewportSize(),
			n = this.getElementPadding(e),
			o = this.getElementMargin(e);
		i.height;
		if(n.top + n.bottom + (o.top + o.bottom), e.children.length > 0) {
			for(var d = e.children.length, h = e.children[0], r = this.getElementPadding(h), s = this.getElementMargin(h), a = d - 1; a >= 0; a--) {
				var u = e.children[a];
				if("absolute" != u.style.position && "fixed" != u.style.position && "SCRIPT" != u.tagName) break
			}
			var c = this.getElementPadding(u),
				l = this.getElementMargin(u);
			r.top + c.bottom + (s.top + l.bottom) + 1
		}
		null != t && t()
	}, this.disableScrolling = function () {
		this.addEventListener(document.body, "touchmove", this.preventScrolling)
	}, this.enableScrolling = function () {
		this.removeEventListener(document.body, "touchmove", this.preventScrolling)
	}, this.preventScrolling = function (t) {
		t.preventDefault()
	}, this.disableZooming = function () {
		this.addEventListener(document.body, "touchmove", this.preventZooming)
	}, this.enableZooming = function () {
		this.removeEventListener(document.body, "touchmove", this.preventZooming)
	}, this.preventZooming = function (t) {
		2 == t.touches.length && t.preventDefault()
	}, this.createWebappLinks = function () {
		for(var t = document.getElementsByTagName("a"), e = 0; e < t.length; e++) {
			var i = t[e];
			"" != i.href && "" == i.target && (i.onclick = this.handleWebAppLink)
		}
	}, this.handleWebAppLink = function () {
		return window.location = this.getAttribute("href"), !1
	}, this.autoWebapp = function () {
		this.addEventListener(window, "load", this.setupAutoWebapp)
	}, this.setupAutoWebapp = function () {
		this.disableScrolling(), this.disableZooming()
	}, this.init()
};

var userOS, userOSver;

function getOS() {
	var e, n = navigator.userAgent;
	n.match(/iPad/i) || n.match(/iPhone/i) ? (userOS = "iOS", e = n.indexOf("OS ")) : n.match(/Android/i) ? (userOS = "Android", e = n.indexOf("Android ")) : userOS = "unknown", userOSver = "iOS" === userOS && e > -1 ? n.substr(e + 3, 3).replace("_", ".") : "Android" === userOS && e > -1 ? n.substr(e + 8, 3) : "unknown"
}

