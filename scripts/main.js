/** vim: et:ts=4:sw=4:sts=4
 * @license RequireJS 2.3.6 Copyright jQuery Foundation and other contributors.
 * Released under MIT license, https://github.com/requirejs/requirejs/blob/master/LICENSE
 */
var requirejs, require, define;
if (function(global, setTimeout) {
    var req, s, head, baseElement, dataMain, src, interactiveScript, currentlyAddingScript, mainScript, subPath, version = "2.3.6", commentRegExp = /\/\*[\s\S]*?\*\/|([^:"'=]|^)\/\/.*$/gm, cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g, jsSuffixRegExp = /\.js$/, currDirRegExp = /^\.\//, op = Object.prototype, ostring = op.toString, hasOwn = op.hasOwnProperty, isBrowser = !("undefined" == typeof window || "undefined" == typeof navigator || !window.document), isWebWorker = !isBrowser && "undefined" != typeof importScripts, readyRegExp = isBrowser && "PLAYSTATION 3" === navigator.platform ? /^complete$/ : /^(complete|loaded)$/, defContextName = "_", isOpera = "undefined" != typeof opera && "[object Opera]" === opera.toString(), contexts = {}, cfg = {}, globalDefQueue = [], useInteractive = !1;
    function commentReplace(e, t) {
        return t || ""
    }
    function isFunction(e) {
        return "[object Function]" === ostring.call(e)
    }
    function isArray(e) {
        return "[object Array]" === ostring.call(e)
    }
    function each(e, t) {
        var n;
        if (e)
            for (n = 0; n < e.length && (!e[n] || !t(e[n], n, e)); n += 1)
                ;
    }
    function eachReverse(e, t) {
        var n;
        if (e)
            for (n = e.length - 1; n > -1 && (!e[n] || !t(e[n], n, e)); n -= 1)
                ;
    }
    function hasProp(e, t) {
        return hasOwn.call(e, t)
    }
    function getOwn(e, t) {
        return hasProp(e, t) && e[t]
    }
    function eachProp(e, t) {
        var n;
        for (n in e)
            if (hasProp(e, n) && t(e[n], n))
                break
    }
    function mixin(e, t, n, o) {
        return t && eachProp(t, (function(t, r) {
            !n && hasProp(e, r) || (!o || "object" != typeof t || !t || isArray(t) || isFunction(t) || t instanceof RegExp ? e[r] = t : (e[r] || (e[r] = {}),
            mixin(e[r], t, n, o)))
        }
        )),
        e
    }
    function bind(e, t) {
        return function() {
            return t.apply(e, arguments)
        }
    }
    function scripts() {
        return document.getElementsByTagName("script")
    }
    function defaultOnError(e) {
        throw e
    }
    function getGlobal(e) {
        if (!e)
            return e;
        var t = global;
        return each(e.split("."), (function(e) {
            t = t[e]
        }
        )),
        t
    }
    function makeError(e, t, n, o) {
        var r = new Error(t + "\nhttps://requirejs.org/docs/errors.html#" + e);
        return r.requireType = e,
        r.requireModules = o,
        n && (r.originalError = n),
        r
    }
    if (void 0 === define) {
        if (void 0 !== requirejs) {
            if (isFunction(requirejs))
                return;
            cfg = requirejs,
            requirejs = void 0
        }
        void 0 === require || isFunction(require) || (cfg = require,
        require = void 0),
        req = requirejs = function(e, t, n, o) {
            var r, i, a = defContextName;
            return isArray(e) || "string" == typeof e || (i = e,
            isArray(t) ? (e = t,
            t = n,
            n = o) : e = []),
            i && i.context && (a = i.context),
            (r = getOwn(contexts, a)) || (r = contexts[a] = req.s.newContext(a)),
            i && r.configure(i),
            r.require(e, t, n)
        }
        ,
        req.config = function(e) {
            return req(e)
        }
        ,
        req.nextTick = void 0 !== setTimeout ? function(e) {
            setTimeout(e, 4)
        }
        : function(e) {
            e()
        }
        ,
        require || (require = req),
        req.version = version,
        req.jsExtRegExp = /^\/|:|\?|\.js$/,
        req.isBrowser = isBrowser,
        s = req.s = {
            contexts: contexts,
            newContext: newContext
        },
        req({}),
        each(["toUrl", "undef", "defined", "specified"], (function(e) {
            req[e] = function() {
                var t = contexts[defContextName];
                return t.require[e].apply(t, arguments)
            }
        }
        )),
        isBrowser && (head = s.head = document.getElementsByTagName("head")[0],
        baseElement = document.getElementsByTagName("base")[0],
        baseElement && (head = s.head = baseElement.parentNode)),
        req.onError = defaultOnError,
        req.createNode = function(e, t, n) {
            var o = e.xhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") : document.createElement("script");
            return o.type = e.scriptType || "text/javascript",
            o.charset = "utf-8",
            o.async = !0,
            o
        }
        ,
        req.load = function(e, t, n) {
            var o, r = e && e.config || {};
            if (isBrowser)
                return (o = req.createNode(r, t, n)).setAttribute("data-requirecontext", e.contextName),
                o.setAttribute("data-requiremodule", t),
                !o.attachEvent || o.attachEvent.toString && o.attachEvent.toString().indexOf("[native code") < 0 || isOpera ? (o.addEventListener("load", e.onScriptLoad, !1),
                o.addEventListener("error", e.onScriptError, !1)) : (useInteractive = !0,
                o.attachEvent("onreadystatechange", e.onScriptLoad)),
                o.src = n,
                r.onNodeCreated && r.onNodeCreated(o, r, t, n),
                currentlyAddingScript = o,
                baseElement ? head.insertBefore(o, baseElement) : head.appendChild(o),
                currentlyAddingScript = null,
                o;
            if (isWebWorker)
                try {
                    setTimeout((function() {}
                    ), 0),
                    importScripts(n),
                    e.completeLoad(t)
                } catch (o) {
                    e.onError(makeError("importscripts", "importScripts failed for " + t + " at " + n, o, [t]))
                }
        }
        ,
        isBrowser && !cfg.skipDataMain && eachReverse(scripts(), (function(e) {
            if (head || (head = e.parentNode),
            dataMain = e.getAttribute("data-main"))
                return mainScript = dataMain,
                cfg.baseUrl || -1 !== mainScript.indexOf("!") || (src = mainScript.split("/"),
                mainScript = src.pop(),
                subPath = src.length ? src.join("/") + "/" : "./",
                cfg.baseUrl = subPath),
                mainScript = mainScript.replace(jsSuffixRegExp, ""),
                req.jsExtRegExp.test(mainScript) && (mainScript = dataMain),
                cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript],
                !0
        }
        )),
        define = function(e, t, n) {
            var o, r;
            "string" != typeof e && (n = t,
            t = e,
            e = null),
            isArray(t) || (n = t,
            t = null),
            !t && isFunction(n) && (t = [],
            n.length && (n.toString().replace(commentRegExp, commentReplace).replace(cjsRequireRegExp, (function(e, n) {
                t.push(n)
            }
            )),
            t = (1 === n.length ? ["require"] : ["require", "exports", "module"]).concat(t))),
            useInteractive && (o = currentlyAddingScript || getInteractiveScript()) && (e || (e = o.getAttribute("data-requiremodule")),
            r = contexts[o.getAttribute("data-requirecontext")]),
            r ? (r.defQueue.push([e, t, n]),
            r.defQueueMap[e] = !0) : globalDefQueue.push([e, t, n])
        }
        ,
        define.amd = {
            jQuery: !0
        },
        req.exec = function(text) {
            return eval(text)
        }
        ,
        req(cfg)
    }
    function newContext(e) {
        var t, n, o, r, i, a = {
            waitSeconds: 7,
            baseUrl: "./",
            paths: {},
            bundles: {},
            pkgs: {},
            shim: {},
            config: {}
        }, s = {}, l = {}, c = {}, u = [], d = {}, h = {}, f = {}, p = 1, g = 1;
        function m(e, t, n) {
            var o, r, i, s, l, c, u, d, h, f, p = t && t.split("/"), g = a.map, m = g && g["*"];
            if (e && (c = (e = e.split("/")).length - 1,
            a.nodeIdCompat && jsSuffixRegExp.test(e[c]) && (e[c] = e[c].replace(jsSuffixRegExp, "")),
            "." === e[0].charAt(0) && p && (e = p.slice(0, p.length - 1).concat(e)),
            function(e) {
                var t, n;
                for (t = 0; t < e.length; t++)
                    if ("." === (n = e[t]))
                        e.splice(t, 1),
                        t -= 1;
                    else if (".." === n) {
                        if (0 === t || 1 === t && ".." === e[2] || ".." === e[t - 1])
                            continue;
                        t > 0 && (e.splice(t - 1, 2),
                        t -= 2)
                    }
            }(e),
            e = e.join("/")),
            n && g && (p || m)) {
                e: for (i = (r = e.split("/")).length; i > 0; i -= 1) {
                    if (l = r.slice(0, i).join("/"),
                    p)
                        for (s = p.length; s > 0; s -= 1)
                            if ((o = getOwn(g, p.slice(0, s).join("/"))) && (o = getOwn(o, l))) {
                                u = o,
                                d = i;
                                break e
                            }
                    !h && m && getOwn(m, l) && (h = getOwn(m, l),
                    f = i)
                }
                !u && h && (u = h,
                d = f),
                u && (r.splice(0, d, u),
                e = r.join("/"))
            }
            return getOwn(a.pkgs, e) || e
        }
        function y(e) {
            isBrowser && each(scripts(), (function(t) {
                if (t.getAttribute("data-requiremodule") === e && t.getAttribute("data-requirecontext") === o.contextName)
                    return t.parentNode.removeChild(t),
                    !0
            }
            ))
        }
        function x(e) {
            var t = getOwn(a.paths, e);
            if (t && isArray(t) && t.length > 1)
                return t.shift(),
                o.require.undef(e),
                o.makeRequire(null, {
                    skipMap: !0
                })([e]),
                !0
        }
        function v(e) {
            var t, n = e ? e.indexOf("!") : -1;
            return n > -1 && (t = e.substring(0, n),
            e = e.substring(n + 1, e.length)),
            [t, e]
        }
        function b(e, t, n, r) {
            var i, a, s, l, c = null, u = t ? t.name : null, h = e, f = !0, y = "";
            return e || (f = !1,
            e = "_@r" + (p += 1)),
            c = (l = v(e))[0],
            e = l[1],
            c && (c = m(c, u, r),
            a = getOwn(d, c)),
            e && (c ? y = n ? e : a && a.normalize ? a.normalize(e, (function(e) {
                return m(e, u, r)
            }
            )) : -1 === e.indexOf("!") ? m(e, u, r) : e : (c = (l = v(y = m(e, u, r)))[0],
            y = l[1],
            n = !0,
            i = o.nameToUrl(y))),
            {
                prefix: c,
                name: y,
                parentMap: t,
                unnormalized: !!(s = !c || a || n ? "" : "_unnormalized" + (g += 1)),
                url: i,
                originalName: h,
                isDefine: f,
                id: (c ? c + "!" + y : y) + s
            }
        }
        function w(e) {
            var t = e.id
              , n = getOwn(s, t);
            return n || (n = s[t] = new o.Module(e)),
            n
        }
        function C(e, t, n) {
            var o = e.id
              , r = getOwn(s, o);
            !hasProp(d, o) || r && !r.defineEmitComplete ? (r = w(e)).error && "error" === t ? n(r.error) : r.on(t, n) : "defined" === t && n(d[o])
        }
        function S(e, t) {
            var n = e.requireModules
              , o = !1;
            t ? t(e) : (each(n, (function(t) {
                var n = getOwn(s, t);
                n && (n.error = e,
                n.events.error && (o = !0,
                n.emit("error", e)))
            }
            )),
            o || req.onError(e))
        }
        function _() {
            globalDefQueue.length && (each(globalDefQueue, (function(e) {
                var t = e[0];
                "string" == typeof t && (o.defQueueMap[t] = !0),
                u.push(e)
            }
            )),
            globalDefQueue = [])
        }
        function T(e) {
            delete s[e],
            delete l[e]
        }
        function k(e, t, n) {
            var o = e.map.id;
            e.error ? e.emit("error", e.error) : (t[o] = !0,
            each(e.depMaps, (function(o, r) {
                var i = o.id
                  , a = getOwn(s, i);
                !a || e.depMatched[r] || n[i] || (getOwn(t, i) ? (e.defineDep(r, d[i]),
                e.check()) : k(a, t, n))
            }
            )),
            n[o] = !0)
        }
        function A() {
            var e, n, r = 1e3 * a.waitSeconds, s = r && o.startTime + r < (new Date).getTime(), c = [], u = [], d = !1, h = !0;
            if (!t) {
                if (t = !0,
                eachProp(l, (function(e) {
                    var t = e.map
                      , o = t.id;
                    if (e.enabled && (t.isDefine || u.push(e),
                    !e.error))
                        if (!e.inited && s)
                            x(o) ? (n = !0,
                            d = !0) : (c.push(o),
                            y(o));
                        else if (!e.inited && e.fetched && t.isDefine && (d = !0,
                        !t.prefix))
                            return h = !1
                }
                )),
                s && c.length)
                    return (e = makeError("timeout", "Load timeout for modules: " + c, null, c)).contextName = o.contextName,
                    S(e);
                h && each(u, (function(e) {
                    k(e, {}, {})
                }
                )),
                s && !n || !d || !isBrowser && !isWebWorker || i || (i = setTimeout((function() {
                    i = 0,
                    A()
                }
                ), 50)),
                t = !1
            }
        }
        function P(e) {
            hasProp(d, e[0]) || w(b(e[0], null, !0)).init(e[1], e[2])
        }
        function M(e, t, n, o) {
            e.detachEvent && !isOpera ? o && e.detachEvent(o, t) : e.removeEventListener(n, t, !1)
        }
        function E(e) {
            var t = e.currentTarget || e.srcElement;
            return M(t, o.onScriptLoad, "load", "onreadystatechange"),
            M(t, o.onScriptError, "error"),
            {
                node: t,
                id: t && t.getAttribute("data-requiremodule")
            }
        }
        function L() {
            var e;
            for (_(); u.length; ) {
                if (null === (e = u.shift())[0])
                    return S(makeError("mismatch", "Mismatched anonymous define() module: " + e[e.length - 1]));
                P(e)
            }
            o.defQueueMap = {}
        }
        return r = {
            require: function(e) {
                return e.require ? e.require : e.require = o.makeRequire(e.map)
            },
            exports: function(e) {
                if (e.usingExports = !0,
                e.map.isDefine)
                    return e.exports ? d[e.map.id] = e.exports : e.exports = d[e.map.id] = {}
            },
            module: function(e) {
                return e.module ? e.module : e.module = {
                    id: e.map.id,
                    uri: e.map.url,
                    config: function() {
                        return getOwn(a.config, e.map.id) || {}
                    },
                    exports: e.exports || (e.exports = {})
                }
            }
        },
        (n = function(e) {
            this.events = getOwn(c, e.id) || {},
            this.map = e,
            this.shim = getOwn(a.shim, e.id),
            this.depExports = [],
            this.depMaps = [],
            this.depMatched = [],
            this.pluginMaps = {},
            this.depCount = 0
        }
        ).prototype = {
            init: function(e, t, n, o) {
                o = o || {},
                this.inited || (this.factory = t,
                n ? this.on("error", n) : this.events.error && (n = bind(this, (function(e) {
                    this.emit("error", e)
                }
                ))),
                this.depMaps = e && e.slice(0),
                this.errback = n,
                this.inited = !0,
                this.ignore = o.ignore,
                o.enabled || this.enabled ? this.enable() : this.check())
            },
            defineDep: function(e, t) {
                this.depMatched[e] || (this.depMatched[e] = !0,
                this.depCount -= 1,
                this.depExports[e] = t)
            },
            fetch: function() {
                if (!this.fetched) {
                    this.fetched = !0,
                    o.startTime = (new Date).getTime();
                    var e = this.map;
                    if (!this.shim)
                        return e.prefix ? this.callPlugin() : this.load();
                    o.makeRequire(this.map, {
                        enableBuildCallback: !0
                    })(this.shim.deps || [], bind(this, (function() {
                        return e.prefix ? this.callPlugin() : this.load()
                    }
                    )))
                }
            },
            load: function() {
                var e = this.map.url;
                h[e] || (h[e] = !0,
                o.load(this.map.id, e))
            },
            check: function() {
                if (this.enabled && !this.enabling) {
                    var e, t, n = this.map.id, r = this.depExports, i = this.exports, a = this.factory;
                    if (this.inited) {
                        if (this.error)
                            this.emit("error", this.error);
                        else if (!this.defining) {
                            if (this.defining = !0,
                            this.depCount < 1 && !this.defined) {
                                if (isFunction(a)) {
                                    if (this.events.error && this.map.isDefine || req.onError !== defaultOnError)
                                        try {
                                            i = o.execCb(n, a, r, i)
                                        } catch (t) {
                                            e = t
                                        }
                                    else
                                        i = o.execCb(n, a, r, i);
                                    if (this.map.isDefine && void 0 === i && ((t = this.module) ? i = t.exports : this.usingExports && (i = this.exports)),
                                    e)
                                        return e.requireMap = this.map,
                                        e.requireModules = this.map.isDefine ? [this.map.id] : null,
                                        e.requireType = this.map.isDefine ? "define" : "require",
                                        S(this.error = e)
                                } else
                                    i = a;
                                if (this.exports = i,
                                this.map.isDefine && !this.ignore && (d[n] = i,
                                req.onResourceLoad)) {
                                    var s = [];
                                    each(this.depMaps, (function(e) {
                                        s.push(e.normalizedMap || e)
                                    }
                                    )),
                                    req.onResourceLoad(o, this.map, s)
                                }
                                T(n),
                                this.defined = !0
                            }
                            this.defining = !1,
                            this.defined && !this.defineEmitted && (this.defineEmitted = !0,
                            this.emit("defined", this.exports),
                            this.defineEmitComplete = !0)
                        }
                    } else
                        hasProp(o.defQueueMap, n) || this.fetch()
                }
            },
            callPlugin: function() {
                var e = this.map
                  , t = e.id
                  , n = b(e.prefix);
                this.depMaps.push(n),
                C(n, "defined", bind(this, (function(n) {
                    var r, i, l, c = getOwn(f, this.map.id), u = this.map.name, d = this.map.parentMap ? this.map.parentMap.name : null, h = o.makeRequire(e.parentMap, {
                        enableBuildCallback: !0
                    });
                    return this.map.unnormalized ? (n.normalize && (u = n.normalize(u, (function(e) {
                        return m(e, d, !0)
                    }
                    )) || ""),
                    C(i = b(e.prefix + "!" + u, this.map.parentMap, !0), "defined", bind(this, (function(e) {
                        this.map.normalizedMap = i,
                        this.init([], (function() {
                            return e
                        }
                        ), null, {
                            enabled: !0,
                            ignore: !0
                        })
                    }
                    ))),
                    void ((l = getOwn(s, i.id)) && (this.depMaps.push(i),
                    this.events.error && l.on("error", bind(this, (function(e) {
                        this.emit("error", e)
                    }
                    ))),
                    l.enable()))) : c ? (this.map.url = o.nameToUrl(c),
                    void this.load()) : ((r = bind(this, (function(e) {
                        this.init([], (function() {
                            return e
                        }
                        ), null, {
                            enabled: !0
                        })
                    }
                    ))).error = bind(this, (function(e) {
                        this.inited = !0,
                        this.error = e,
                        e.requireModules = [t],
                        eachProp(s, (function(e) {
                            0 === e.map.id.indexOf(t + "_unnormalized") && T(e.map.id)
                        }
                        )),
                        S(e)
                    }
                    )),
                    r.fromText = bind(this, (function(n, i) {
                        var s = e.name
                          , l = b(s)
                          , c = useInteractive;
                        i && (n = i),
                        c && (useInteractive = !1),
                        w(l),
                        hasProp(a.config, t) && (a.config[s] = a.config[t]);
                        try {
                            req.exec(n)
                        } catch (e) {
                            return S(makeError("fromtexteval", "fromText eval for " + t + " failed: " + e, e, [t]))
                        }
                        c && (useInteractive = !0),
                        this.depMaps.push(l),
                        o.completeLoad(s),
                        h([s], r)
                    }
                    )),
                    void n.load(e.name, h, r, a))
                }
                ))),
                o.enable(n, this),
                this.pluginMaps[n.id] = n
            },
            enable: function() {
                l[this.map.id] = this,
                this.enabled = !0,
                this.enabling = !0,
                each(this.depMaps, bind(this, (function(e, t) {
                    var n, i, a;
                    if ("string" == typeof e) {
                        if (e = b(e, this.map.isDefine ? this.map : this.map.parentMap, !1, !this.skipMap),
                        this.depMaps[t] = e,
                        a = getOwn(r, e.id))
                            return void (this.depExports[t] = a(this));
                        this.depCount += 1,
                        C(e, "defined", bind(this, (function(e) {
                            this.undefed || (this.defineDep(t, e),
                            this.check())
                        }
                        ))),
                        this.errback ? C(e, "error", bind(this, this.errback)) : this.events.error && C(e, "error", bind(this, (function(e) {
                            this.emit("error", e)
                        }
                        )))
                    }
                    n = e.id,
                    i = s[n],
                    hasProp(r, n) || !i || i.enabled || o.enable(e, this)
                }
                ))),
                eachProp(this.pluginMaps, bind(this, (function(e) {
                    var t = getOwn(s, e.id);
                    t && !t.enabled && o.enable(e, this)
                }
                ))),
                this.enabling = !1,
                this.check()
            },
            on: function(e, t) {
                var n = this.events[e];
                n || (n = this.events[e] = []),
                n.push(t)
            },
            emit: function(e, t) {
                each(this.events[e], (function(e) {
                    e(t)
                }
                )),
                "error" === e && delete this.events[e]
            }
        },
        o = {
            config: a,
            contextName: e,
            registry: s,
            defined: d,
            urlFetched: h,
            defQueue: u,
            defQueueMap: {},
            Module: n,
            makeModuleMap: b,
            nextTick: req.nextTick,
            onError: S,
            configure: function(e) {
                if (e.baseUrl && "/" !== e.baseUrl.charAt(e.baseUrl.length - 1) && (e.baseUrl += "/"),
                "string" == typeof e.urlArgs) {
                    var t = e.urlArgs;
                    e.urlArgs = function(e, n) {
                        return (-1 === n.indexOf("?") ? "?" : "&") + t
                    }
                }
                var n = a.shim
                  , r = {
                    paths: !0,
                    bundles: !0,
                    config: !0,
                    map: !0
                };
                eachProp(e, (function(e, t) {
                    r[t] ? (a[t] || (a[t] = {}),
                    mixin(a[t], e, !0, !0)) : a[t] = e
                }
                )),
                e.bundles && eachProp(e.bundles, (function(e, t) {
                    each(e, (function(e) {
                        e !== t && (f[e] = t)
                    }
                    ))
                }
                )),
                e.shim && (eachProp(e.shim, (function(e, t) {
                    isArray(e) && (e = {
                        deps: e
                    }),
                    !e.exports && !e.init || e.exportsFn || (e.exportsFn = o.makeShimExports(e)),
                    n[t] = e
                }
                )),
                a.shim = n),
                e.packages && each(e.packages, (function(e) {
                    var t;
                    t = (e = "string" == typeof e ? {
                        name: e
                    } : e).name,
                    e.location && (a.paths[t] = e.location),
                    a.pkgs[t] = e.name + "/" + (e.main || "main").replace(currDirRegExp, "").replace(jsSuffixRegExp, "")
                }
                )),
                eachProp(s, (function(e, t) {
                    e.inited || e.map.unnormalized || (e.map = b(t, null, !0))
                }
                )),
                (e.deps || e.callback) && o.require(e.deps || [], e.callback)
            },
            makeShimExports: function(e) {
                return function() {
                    var t;
                    return e.init && (t = e.init.apply(global, arguments)),
                    t || e.exports && getGlobal(e.exports)
                }
            },
            makeRequire: function(t, n) {
                function i(a, l, c) {
                    var u, h;
                    return n.enableBuildCallback && l && isFunction(l) && (l.__requireJsBuild = !0),
                    "string" == typeof a ? isFunction(l) ? S(makeError("requireargs", "Invalid require call"), c) : t && hasProp(r, a) ? r[a](s[t.id]) : req.get ? req.get(o, a, t, i) : (u = b(a, t, !1, !0).id,
                    hasProp(d, u) ? d[u] : S(makeError("notloaded", 'Module name "' + u + '" has not been loaded yet for context: ' + e + (t ? "" : ". Use require([])")))) : (L(),
                    o.nextTick((function() {
                        L(),
                        (h = w(b(null, t))).skipMap = n.skipMap,
                        h.init(a, l, c, {
                            enabled: !0
                        }),
                        A()
                    }
                    )),
                    i)
                }
                return n = n || {},
                mixin(i, {
                    isBrowser: isBrowser,
                    toUrl: function(e) {
                        var n, r = e.lastIndexOf("."), i = e.split("/")[0];
                        return -1 !== r && (!("." === i || ".." === i) || r > 1) && (n = e.substring(r, e.length),
                        e = e.substring(0, r)),
                        o.nameToUrl(m(e, t && t.id, !0), n, !0)
                    },
                    defined: function(e) {
                        return hasProp(d, b(e, t, !1, !0).id)
                    },
                    specified: function(e) {
                        return e = b(e, t, !1, !0).id,
                        hasProp(d, e) || hasProp(s, e)
                    }
                }),
                t || (i.undef = function(e) {
                    _();
                    var n = b(e, t, !0)
                      , r = getOwn(s, e);
                    r.undefed = !0,
                    y(e),
                    delete d[e],
                    delete h[n.url],
                    delete c[e],
                    eachReverse(u, (function(t, n) {
                        t[0] === e && u.splice(n, 1)
                    }
                    )),
                    delete o.defQueueMap[e],
                    r && (r.events.defined && (c[e] = r.events),
                    T(e))
                }
                ),
                i
            },
            enable: function(e) {
                getOwn(s, e.id) && w(e).enable()
            },
            completeLoad: function(e) {
                var t, n, r, i = getOwn(a.shim, e) || {}, l = i.exports;
                for (_(); u.length; ) {
                    if (null === (n = u.shift())[0]) {
                        if (n[0] = e,
                        t)
                            break;
                        t = !0
                    } else
                        n[0] === e && (t = !0);
                    P(n)
                }
                if (o.defQueueMap = {},
                r = getOwn(s, e),
                !t && !hasProp(d, e) && r && !r.inited) {
                    if (!(!a.enforceDefine || l && getGlobal(l)))
                        return x(e) ? void 0 : S(makeError("nodefine", "No define call for " + e, null, [e]));
                    P([e, i.deps || [], i.exportsFn])
                }
                A()
            },
            nameToUrl: function(e, t, n) {
                var r, i, s, l, c, u, d = getOwn(a.pkgs, e);
                if (d && (e = d),
                u = getOwn(f, e))
                    return o.nameToUrl(u, t, n);
                if (req.jsExtRegExp.test(e))
                    l = e + (t || "");
                else {
                    for (r = a.paths,
                    s = (i = e.split("/")).length; s > 0; s -= 1)
                        if (c = getOwn(r, i.slice(0, s).join("/"))) {
                            isArray(c) && (c = c[0]),
                            i.splice(0, s, c);
                            break
                        }
                    l = i.join("/"),
                    l = ("/" === (l += t || (/^data\:|^blob\:|\?/.test(l) || n ? "" : ".js")).charAt(0) || l.match(/^[\w\+\.\-]+:/) ? "" : a.baseUrl) + l
                }
                return a.urlArgs && !/^blob\:/.test(l) ? l + a.urlArgs(e, l) : l
            },
            load: function(e, t) {
                req.load(o, e, t)
            },
            execCb: function(e, t, n, o) {
                return t.apply(o, n)
            },
            onScriptLoad: function(e) {
                if ("load" === e.type || readyRegExp.test((e.currentTarget || e.srcElement).readyState)) {
                    interactiveScript = null;
                    var t = E(e);
                    o.completeLoad(t.id)
                }
            },
            onScriptError: function(e) {
                var t = E(e);
                if (!x(t.id)) {
                    var n = [];
                    return eachProp(s, (function(e, o) {
                        0 !== o.indexOf("_@r") && each(e.depMaps, (function(e) {
                            if (e.id === t.id)
                                return n.push(o),
                                !0
                        }
                        ))
                    }
                    )),
                    S(makeError("scripterror", 'Script error for "' + t.id + (n.length ? '", needed by: ' + n.join(", ") : '"'), e, [t.id]))
                }
            }
        },
        o.require = o.makeRequire(),
        o
    }
    function getInteractiveScript() {
        return interactiveScript && "interactive" === interactiveScript.readyState || eachReverse(scripts(), (function(e) {
            if ("interactive" === e.readyState)
                return interactiveScript = e
        }
        )),
        interactiveScript
    }
}(this, "undefined" == typeof setTimeout ? void 0 : setTimeout),
void 0 === requirejs)
    var requirejs = function(e) {
        requirejs = e
    };
requirejs({
    baseUrl: "scripts",
    urlArgs: "undefined" == typeof window || "file:" !== window.location.protocol && !window.location.hostname.includes("localhost") ? "" : "bust=" + Date.now(),
    paths: {
        toxilibs: "../toxilibs",
        toxiworlds: "../toxiworlds",
        jquery: "../toxilibs/extlibs/jquery-3.6.4"
    },
    shim: {
        "toxilibs/embedded_extlibs/ace/ace": {
            exports: "ace"
        }
    }
});
var developmentEnvironment = "undefined" != typeof document && !document.getElementById("build_version");
function requireDevelopment(e, t) {
    developmentEnvironment && requirejs(e, t)
}
define("toxilibs/embedded_extlibs/alea", [], (function() {
    function e(e, t) {
        let n = function() {
            let e = 3941471299;
            function t(t) {
                for (let n = 0; n < t.length; n++) {
                    e += t.charCodeAt(n);
                    let o = .02519603282416938 * e;
                    e = o >>> 0,
                    o = (o - e) * e,
                    e = o >>> 0,
                    e += 4294967296 * (o - e)
                }
                return 2.3283064365386963e-10 * (e >>> 0)
            }
            return t
        }();
        e.c = 1,
        e.s0 = .8633289230056107 - n(t),
        e.s0 < 0 && (e.s0 += 1),
        e.s1 = .15019597788341343 - n(t),
        e.s1 < 0 && (e.s1 += 1),
        e.s2 = .9176952994894236 - n(t),
        e.s2 < 0 && (e.s2 += 1),
        n = null
    }
    return function(t) {
        let n = {};
        function o() {
            let e = 2091639 * n.s0 + 2.3283064365386963e-10 * n.c;
            return n.s0 = n.s1,
            n.s1 = n.s2,
            n.s2 = e - (n.c = 0 | e)
        }
        return o.state = function() {
            return {
                c: n.c,
                s0: n.s0,
                s1: n.s1,
                s2: n.s2
            }
        }
        ,
        o.setState = function({c: e, s0: t, s1: o, s2: r}) {
            n.c = e,
            n.s0 = t,
            n.s1 = o,
            n.s2 = r
        }
        ,
        o.setSeed = function(t) {
            e(n, String(t))
        }
        ,
        "object" == typeof t && "s0"in t ? (o.setState(t),
        o) : (e(n, String(t)),
        o)
    }
}
)),
/*! Toxilib random
 * Copyright 2014 Toxicode, pierre.lancien @ toxicode.fr
*/
define("toxilibs/random", ["./embedded_extlibs/alea"], (function(e) {
    const t = "abcdefghijklmnopqrstuvwxyz"
      , n = "defghijkmnpqrtuvwxyz"
      , o = `0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZ${t}`
      , r = `${n}23456789`
      , i = o.length;
    function a(e=10) {
        let t = "";
        for (let n = 0; n < e; n++)
            t += o[Math.floor(Math.random() * i)];
        return t
    }
    return function s(l) {
        let c = e(l)
          , u = l;
        function d(e=a()) {
            return u = e,
            c.setSeed(e),
            e
        }
        function h() {
            return c.state()
        }
        function f(e, t) {
            return e + (t - e) * c()
        }
        function p(e, t) {
            return Math.floor(f(e, t + 1))
        }
        function g() {
            return t[p(0, 25)]
        }
        function m() {
            return n[p(0, 19)]
        }
        function y(...e) {
            1 === e.length && (e = e[0]);
            let t = []
              , n = 0;
            for (let o = 0; o < e.length; o++) {
                n += e[o][1],
                t.push(n)
            }
            if (0 === n)
                throw new Error("impossible choice !");
            let o = c() * n;
            for (let n = 0; n < t.length; n++)
                if (o < t[n])
                    return e[n][0]
        }
        let x = {};
        function v(e, t={}) {
            let n, {name: o="default"} = t, r = x[o];
            if (r) {
                let t = function(e) {
                    let t = e.length
                      , n = {};
                    for (let o = 1; o <= t; o++) {
                        let r = e[t - o];
                        n[r] = (n[r] || 0) + Math.pow(o, b)
                    }
                    return n
                }(r)
                  , o = function(e, t) {
                    let n = []
                      , o = 0;
                    for (let n = 0; n < t.length; n++)
                        o += e[t[n]] || 0;
                    0 === o && (o = 1);
                    let r = o / t.length;
                    for (let o = 0; o < t.length; o++) {
                        let i = t[o]
                          , a = (e[i] || 0) - r;
                        n.push([i, Math.max(0, r - a)])
                    }
                    return n
                }(t, e);
                n = y(o),
                r.push(n)
            } else {
                n = e[p(0, e.length - 1)],
                x[o] = [n]
            }
            return n
        }
        let b = -.3;
        function w() {
            return c()
        }
        return w.reset = d,
        w.setSeed = d,
        w.getSeed = function() {
            return u
        }
        ,
        w.getState = h,
        w.setState = function(e) {
            c.setState(e)
        }
        ,
        w.generateSeed = a,
        w.hash = function(e=10) {
            let t = "";
            for (let n = 0; n < e; n++)
                t += o[p(0, i - 1)];
            return t
        }
        ,
        w.oneChanceIn = function(e) {
            return c() < 1 / e
        }
        ,
        w.around = function(e, t) {
            let n, o, r = 2;
            for (; r >= 1; )
                n = 2 * c() - 1,
                o = 2 * c() - 1,
                r = n * n + o * o;
            return r = Math.sqrt(-2 * Math.log(r) / r),
            e + n * r * t
        }
        ,
        w.overrideAroundWithEqual = function() {
            w.around = e=>e
        }
        ,
        w.between = f,
        w.intBetween = p,
        w.letter = g,
        w.letters = function(e) {
            let t = "";
            for (let n = 0; n < e; n++)
                t += g();
            return t
        }
        ,
        w.unmistakableLetter = m,
        w.unmistakableLetters = function(e) {
            let t = "";
            for (let n = 0; n < e; n++)
                t += m();
            return t
        }
        ,
        w.unmistakableHash = function(e=10) {
            let t = "";
            for (let n = 0; n < e; n++)
                t += r[p(0, r.length - 1)];
            return t
        }
        ,
        w.shuffleArray = function(e) {
            for (let t = e.length - 1; t > 0; t--) {
                let n = Math.floor(c() * (t + 1))
                  , o = e[t];
                e[t] = e[n],
                e[n] = o
            }
        }
        ,
        w.pick = function(...e) {
            return 1 === e.length && (e = e[0]),
            e[p(0, e.length - 1)]
        }
        ,
        w.weightedChoice = y,
        w.getFastWeightedChooser = function(e) {
            let t = []
              , n = []
              , o = 0;
            return e.forEach((([e,r])=>{
                t.push(e),
                o += r,
                n.push(o)
            }
            )),
            function() {
                let e = c() * o;
                for (let o = 0; o < n.length; o++)
                    if (e < n[o])
                        return t[o]
            }
        }
        ,
        w.fairChoice = v,
        w.fairChoiceInt = function(e, t, n) {
            let o = [];
            for (let n = e; n <= t; n++)
                o.push(n);
            return v(o, n)
        }
        ,
        w.resetFairChoice = function(e) {
            delete x[e]
        }
        ,
        w.resetAllFairChoices = function() {
            x = {}
        }
        ,
        w.createNew = function(e=a()) {
            return s(e)
        }
        ,
        w.fork = function() {
            return s(h())
        }
        ,
        w
    }(a())
}
)),
/*! Toxilib event_capabilities_queued
 * Copyright 2014 Toxicode, pierre.lancien @ toxicode.fr
*/
define("toxilibs/event_capabilities_queued", ["./random"], (function(e) {
    function t(o, {parent: r, nameSpace: i, onError: a}={}) {
        let s = r || o;
        r || (!function(e) {
            let n = {}
              , o = {};
            e.blockedNameSpaces = o,
            e.block = function({from: e, to: t}) {
                o[e] = o[e] || [],
                o[e].push(t)
            }
            ,
            e.twoWayBlock = function(t, n) {
                e.block({
                    from: t,
                    to: n
                }),
                e.block({
                    from: n,
                    to: t
                })
            }
            ,
            e.createOrFindEventNameSpace = function(o) {
                return n[o] || (n[o] = {},
                t(n[o], {
                    parent: e,
                    nameSpace: o
                })),
                n[o]
            }
        }(o),
        o.listenersFor = {},
        o.emitQueue = []),
        o.on = function(e, t) {
            s.listenersFor[e] || (s.listenersFor[e] = []);
            let o = {
                origin: n(),
                nameSpace: i,
                callback: t
            };
            return s.listenersFor[e].push(o),
            o
        }
        ,
        o.when = o.on,
        o.once = function(e, t=(()=>{}
        )) {
            return new Promise((n=>{
                o.on(e, (function r(...i) {
                    o.removeListener(e, r),
                    t(...i),
                    n(i)
                }
                ))
            }
            ))
        }
        ,
        o.onceAll = function(e, t=(()=>{}
        )) {
            if (Array.isArray(e)) {
                let t = {};
                e.forEach((e=>{
                    t[e] = null
                }
                )),
                e = t
            }
            let n = Object.keys(e).length
              , r = 0
              , i = {};
            return new Promise((a=>{
                function s() {
                    let n = [];
                    for (let t in e)
                        n.push(i[t]);
                    t(...n),
                    a(n)
                }
                for (let t in e) {
                    let a = e[t];
                    o.once(t, ((...e)=>{
                        a && a(...e),
                        i[t] = e,
                        r += 1,
                        r === n && s()
                    }
                    ))
                }
            }
            ))
        }
        ,
        o.removeListener = function(e, t) {
            let n = s.listenersFor[e];
            if (n) {
                let e;
                e = "function" == typeof t ? function(e, t) {
                    for (let n = 0; n < e.length; n++)
                        if (e[n] && e[n].callback === t)
                            return n;
                    return -1
                }(n, t) : function(e, t) {
                    for (let n = 0; n < e.length; n++)
                        if (e[n] === t)
                            return n;
                    return -1
                }(n, t),
                e >= 0 && (n[e] = null)
            }
        }
        ,
        o.removeAllListenersFor = function(e) {
            s.listenersFor[e] && (s.listenersFor[e] = [])
        }
        ,
        o.removeAllListeners = function() {
            s.listenersFor = {}
        }
        ;
        let {emitQueue: l} = s;
        function c(e, t, n, o) {
            let r, a = s.blockedNameSpaces[i] || [], l = s.listenersFor[e] || [];
            for (let i = 0; i < l.length; i++) {
                let c = l[i];
                if (null !== c) {
                    if (-1 === a.indexOf(c.nameSpace))
                        try {
                            c.callback.stackTraceRecord = n,
                            c.callback.stackTraceRecordFromEmitter = o,
                            c.callback.apply(s, t)
                        } catch (t) {
                            u({
                                eventName: e,
                                error: t,
                                listenerOrigin: c.origin,
                                emitOrigin: n
                            })
                        }
                } else
                    r = !0
            }
            if (r)
                for (let e = l.length - 1; e >= 0; e--)
                    null === l[e] && l.splice(e, 1)
        }
        function u({eventName: e, error: t, listenerOrigin: n, emitOrigin: o}) {
            var r;
            (function(e, t) {
                let n = `The error displayed below is on event '${e}'.`;
                t && (n += `\n  The faulty listener for '${e}' was attached : \n${t}`),
                console.warn(n)
            }
            )((r = {
                eventName: e,
                error: t,
                listenerOrigin: n,
                emitOrigin: o
            }).eventName, r.listenerOrigin),
            function(e, t) {
                if (!t || !t.stack)
                    return;
                let n = t.stack.split("\n").splice(2).join("\n");
                console.warn(`The emit '${e}' that triggered the error below was called from : \n${n}`)
            }(r.eventName, r.emitOrigin),
            a ? a(t) : console.error(t)
        }
        o.emit = function(e, ...t) {
            let n = new Error;
            l.push({
                emitSync: c,
                eventName: e,
                arguments: t,
                stackTraceRecord: n,
                stackTraceRecordFromEmitter: o.lastStackTraceRecordFromEmitter
            }),
            delete o.lastStackTraceRecordFromEmitter,
            1 === l.length && function() {
                for (; l.length > 0; ) {
                    let e = l[0];
                    e.emitSync(e.eventName, e.arguments, e.stackTraceRecord, e.stackTraceRecordFromEmitter),
                    l.shift()
                }
            }()
        }
        ,
        o.enterTestMode = function({seed: t, maxDelay: n=100}={}) {
            const r = e.createNew(t);
            console.log("Event test mode with seed : ", r.getSeed());
            let i = o.emit;
            o.emit = function(...e) {
                let t = r.intBetween(0, n);
                setTimeout((()=>i(...e)), t)
            }
        }
        ,
        o.emitSync = function(e, ...t) {
            console.warn(`Please try to avoid calling emitSync. Here it was called for event '${e}'. Note that emitSync won't have the nice callstacks that classic emit has...`),
            c(e, t)
        }
        ,
        o.emitter = function(e, {sync: t, filter: n}={}) {
            let r, i;
            return t ? r = o.emitSync : (r = o.emit,
            i = new Error),
            function(...t) {
                if (n)
                    for (let e = 0; e < t.length; e++)
                        t[e] = n(t[e]);
                o.lastStackTraceRecordFromEmitter = i,
                r.call(o, e, ...t)
            }
        }
    }
    function n() {
        let e = new Error("fake error");
        return e.stack ? e.stack.split("\n")[3] : void 0
    }
    return t
}
)),
/*! Toxilib event_bus_queued
 * Copyright 2014 Toxicode, pierre.lancien @ toxicode.fr
*/
define("toxilibs/event_bus_queued", ["./event_capabilities_queued"], (function(e) {
    function t(e) {
        return t.createOrFindEventNameSpace(e)
    }
    return e(t),
    t
}
)),
/*! Toxilib url_params
 * Copyright 2014 Toxicode, pierre.lancien @ toxicode.fr
*/
define("toxilibs/url_params", [], (function() {
    function e(e, n) {
        return "#" !== e && "all" !== e || (n = e,
        e = !1),
        e || (e = document.location.href),
        function(e, n) {
            let r = {}
              , i = t(e);
            (function(e) {
                return "params" === e || "all" === e
            }
            )(n) && o(r, i.regularParams);
            (function(e) {
                return "#" === e || "all" === e
            }
            )(n) && o(r, i.hashParams);
            return r
        }(e = decodeURI(e.replace(/\+/g, " ")), n = n || "params")
    }
    function t(e) {
        let t = e.split("#")
          , n = t[0].split("?");
        return {
            mainUrl: n[0],
            regularParams: n[1],
            hashParams: t[1]
        }
    }
    function n(t) {
        document.location.href !== t && window.history.pushState(e(t), document.title, t)
    }
    function o(e, t) {
        if (!t)
            return;
        t.split("&").forEach((function(t) {
            let[n,o] = t.split("=");
            r(e, n, function(e, t) {
                if (void 0 === t)
                    return null;
                t = h(t);
                let n = Number(t);
                String(n) === t && (t = n);
                if ("true" === t)
                    return !0;
                if ("false" === t)
                    return !1;
                return t
            }(0, o))
        }
        ))
    }
    function r(e, t, n) {
        const o = t.match(/(\w+)\[(.*)\]/);
        if (o) {
            const i = o[1]
              , a = o[2];
            a ? function(e, {keyStart: t, insideBrackets: n, value: o}) {
                t in e || (e[t] = {});
                n.indexOf("]") > 0 && (n = `${n.replace("]", "")}]`);
                r(e[t], n, o)
            }(e, {
                keyStart: i,
                insideBrackets: a,
                value: n
            }) : function(e, t, n) {
                t in e || (e[t] = []);
                e[t].push(n)
            }(e, t, n)
        } else
            e[t] = n
    }
    function i(e, n, i={}) {
        if (0 === Object.keys(n).length)
            return e;
        let a = t(e = h(e))
          , l = `${encodeURI(a.mainUrl)}?`;
        if (a.regularParams) {
            let e = {};
            o(e, a.regularParams),
            n = function(e, t) {
                let n = {};
                for (let t in e)
                    n[t] = e[t];
                for (let o in t) {
                    let i = t[o];
                    `${o}[]`in e && null === i ? delete n[`${o}[]`] : r(n, o, i)
                }
                return n
            }(e, n)
        }
        let c = s(n, i);
        return c && (l += c),
        a.hashParams && (l += `#${a.hashParams}`),
        l
    }
    function a(e, n, r={}) {
        var i;
        i = n,
        n = Array.isArray(i) ? i : [i];
        let a = t(e = decodeURIComponent(e))
          , l = {};
        o(l, a.regularParams);
        let c = {}
          , u = !1;
        for (let e in l)
            -1 === n.indexOf(e) ? c[e] = l[e] : u = !0;
        if (!u)
            return e;
        let d = a.mainUrl
          , h = s(c, r);
        return h && (d += `?${h}`),
        a.hashParams && (d += `#${a.hashParams}`),
        d
    }
    function s(e, t={}) {
        let n = [];
        for (let o in e) {
            let r = e[o];
            o.endsWith("[]") && (o = o.substring(0, o.length - 2)),
            l(n, {
                key: o,
                value: r
            }, t)
        }
        return n.join("&")
    }
    function l(e, {key: t, value: n}, o) {
        let r;
        r = Array.isArray(n) ? u : "object" == typeof n ? d : c,
        r(e, {
            key: t,
            value: n
        }, o)
    }
    function c(e, {key: t, value: n}, {ignoreEmptyParams: o}) {
        "" === n && o || e.push(`${f(t)}=${f(n)}`)
    }
    function u(e, {key: t, value: n}, {useCommaForArrays: o}) {
        if (o)
            e.push(`${f(t)}=${n.map(f).join(",")}`);
        else {
            let o = f(`${t}[]`);
            n.forEach((t=>{
                e.push(`${o}=${f(t)}`)
            }
            ))
        }
    }
    function d(e, {key: t, value: n}, o) {
        for (let r in n) {
            const i = n[r];
            r.endsWith("[]") && (r = r.substring(0, r.length - 2)),
            l(e, {
                key: `${t}[${f(r)}]`,
                value: i
            }, o)
        }
    }
    function h(e) {
        return decodeURIComponent(e.replace(/\+/g, " "))
    }
    function f(e) {
        return encodeURIComponent(e).replace(/%20/g, "+")
    }
    return e.pushStateAdd = function(e, t) {
        n(i(document.location.href, e, t))
    }
    ,
    e.pushStateRemove = function(e, t) {
        n(a(document.location.href, e, t))
    }
    ,
    e.pushStateReplace = function(e, t) {
        n(i(window.location.pathname, e, t))
    }
    ,
    e.extendUrlWithParams = i,
    e.removeParamsFromUrl = a,
    e.paramsToUrlString = s,
    e.addParamsFromString = o,
    e.isEmpty = function() {
        return 0 === Object.keys(e()).length
    }
    ,
    e
}
)),
/*!
 * jQuery JavaScript Library v3.6.4
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 */
function(e, t) {
    "use strict";
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
        if (!e.document)
            throw new Error("jQuery requires a window with a document");
        return t(e)
    }
    : t(e)
}("undefined" != typeof window ? window : this, (function(e, t) {
    var n = []
      , o = Object.getPrototypeOf
      , r = n.slice
      , i = n.flat ? function(e) {
        return n.flat.call(e)
    }
    : function(e) {
        return n.concat.apply([], e)
    }
      , a = n.push
      , s = n.indexOf
      , l = {}
      , c = l.toString
      , u = l.hasOwnProperty
      , d = u.toString
      , h = d.call(Object)
      , f = {}
      , p = function(e) {
        return "function" == typeof e && "number" != typeof e.nodeType && "function" != typeof e.item
    }
      , g = function(e) {
        return null != e && e === e.window
    }
      , m = e.document
      , y = {
        type: !0,
        src: !0,
        nonce: !0,
        noModule: !0
    };
    function x(e, t, n) {
        var o, r, i = (n = n || m).createElement("script");
        if (i.text = e,
        t)
            for (o in y)
                (r = t[o] || t.getAttribute && t.getAttribute(o)) && i.setAttribute(o, r);
        n.head.appendChild(i).parentNode.removeChild(i)
    }
    function v(e) {
        return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? l[c.call(e)] || "object" : typeof e
    }
    var b = "3.6.4"
      , w = function(e, t) {
        return new w.fn.init(e,t)
    };
    function C(e) {
        var t = !!e && "length"in e && e.length
          , n = v(e);
        return !p(e) && !g(e) && ("array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e)
    }
    w.fn = w.prototype = {
        jquery: b,
        constructor: w,
        length: 0,
        toArray: function() {
            return r.call(this)
        },
        get: function(e) {
            return null == e ? r.call(this) : e < 0 ? this[e + this.length] : this[e]
        },
        pushStack: function(e) {
            var t = w.merge(this.constructor(), e);
            return t.prevObject = this,
            t
        },
        each: function(e) {
            return w.each(this, e)
        },
        map: function(e) {
            return this.pushStack(w.map(this, (function(t, n) {
                return e.call(t, n, t)
            }
            )))
        },
        slice: function() {
            return this.pushStack(r.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        even: function() {
            return this.pushStack(w.grep(this, (function(e, t) {
                return (t + 1) % 2
            }
            )))
        },
        odd: function() {
            return this.pushStack(w.grep(this, (function(e, t) {
                return t % 2
            }
            )))
        },
        eq: function(e) {
            var t = this.length
              , n = +e + (e < 0 ? t : 0);
            return this.pushStack(n >= 0 && n < t ? [this[n]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor()
        },
        push: a,
        sort: n.sort,
        splice: n.splice
    },
    w.extend = w.fn.extend = function() {
        var e, t, n, o, r, i, a = arguments[0] || {}, s = 1, l = arguments.length, c = !1;
        for ("boolean" == typeof a && (c = a,
        a = arguments[s] || {},
        s++),
        "object" == typeof a || p(a) || (a = {}),
        s === l && (a = this,
        s--); s < l; s++)
            if (null != (e = arguments[s]))
                for (t in e)
                    o = e[t],
                    "__proto__" !== t && a !== o && (c && o && (w.isPlainObject(o) || (r = Array.isArray(o))) ? (n = a[t],
                    i = r && !Array.isArray(n) ? [] : r || w.isPlainObject(n) ? n : {},
                    r = !1,
                    a[t] = w.extend(c, i, o)) : void 0 !== o && (a[t] = o));
        return a
    }
    ,
    w.extend({
        expando: "jQuery" + (b + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(e) {
            throw new Error(e)
        },
        noop: function() {},
        isPlainObject: function(e) {
            var t, n;
            return !(!e || "[object Object]" !== c.call(e)) && (!(t = o(e)) || "function" == typeof (n = u.call(t, "constructor") && t.constructor) && d.call(n) === h)
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e)
                return !1;
            return !0
        },
        globalEval: function(e, t, n) {
            x(e, {
                nonce: t && t.nonce
            }, n)
        },
        each: function(e, t) {
            var n, o = 0;
            if (C(e))
                for (n = e.length; o < n && !1 !== t.call(e[o], o, e[o]); o++)
                    ;
            else
                for (o in e)
                    if (!1 === t.call(e[o], o, e[o]))
                        break;
            return e
        },
        makeArray: function(e, t) {
            var n = t || [];
            return null != e && (C(Object(e)) ? w.merge(n, "string" == typeof e ? [e] : e) : a.call(n, e)),
            n
        },
        inArray: function(e, t, n) {
            return null == t ? -1 : s.call(t, e, n)
        },
        merge: function(e, t) {
            for (var n = +t.length, o = 0, r = e.length; o < n; o++)
                e[r++] = t[o];
            return e.length = r,
            e
        },
        grep: function(e, t, n) {
            for (var o = [], r = 0, i = e.length, a = !n; r < i; r++)
                !t(e[r], r) !== a && o.push(e[r]);
            return o
        },
        map: function(e, t, n) {
            var o, r, a = 0, s = [];
            if (C(e))
                for (o = e.length; a < o; a++)
                    null != (r = t(e[a], a, n)) && s.push(r);
            else
                for (a in e)
                    null != (r = t(e[a], a, n)) && s.push(r);
            return i(s)
        },
        guid: 1,
        support: f
    }),
    "function" == typeof Symbol && (w.fn[Symbol.iterator] = n[Symbol.iterator]),
    w.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), (function(e, t) {
        l["[object " + t + "]"] = t.toLowerCase()
    }
    ));
    var S = /*!
 * Sizzle CSS Selector Engine v2.3.10
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://js.foundation/
 *
 */
    function(e) {
        var t, n, o, r, i, a, s, l, c, u, d, h, f, p, g, m, y, x, v, b = "sizzle" + 1 * new Date, w = e.document, C = 0, S = 0, _ = le(), T = le(), k = le(), A = le(), P = function(e, t) {
            return e === t && (d = !0),
            0
        }, M = {}.hasOwnProperty, E = [], L = E.pop, D = E.push, q = E.push, F = E.slice, O = function(e, t) {
            for (var n = 0, o = e.length; n < o; n++)
                if (e[n] === t)
                    return n;
            return -1
        }, j = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", I = "[\\x20\\t\\r\\n\\f]", R = "(?:\\\\[\\da-fA-F]{1,6}" + I + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+", N = "\\[" + I + "*(" + R + ")(?:" + I + "*([*^$|!~]?=)" + I + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + R + "))|)" + I + "*\\]", $ = ":(" + R + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + N + ")*)|.*)\\)|)", B = new RegExp(I + "+","g"), H = new RegExp("^" + I + "+|((?:^|[^\\\\])(?:\\\\.)*)" + I + "+$","g"), W = new RegExp("^" + I + "*," + I + "*"), z = new RegExp("^" + I + "*([>+~]|" + I + ")" + I + "*"), G = new RegExp(I + "|>"), U = new RegExp($), V = new RegExp("^" + R + "$"), X = {
            ID: new RegExp("^#(" + R + ")"),
            CLASS: new RegExp("^\\.(" + R + ")"),
            TAG: new RegExp("^(" + R + "|[*])"),
            ATTR: new RegExp("^" + N),
            PSEUDO: new RegExp("^" + $),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + I + "*(even|odd|(([+-]|)(\\d*)n|)" + I + "*(?:([+-]|)" + I + "*(\\d+)|))" + I + "*\\)|)","i"),
            bool: new RegExp("^(?:" + j + ")$","i"),
            needsContext: new RegExp("^" + I + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + I + "*((?:-\\d)?\\d*)" + I + "*\\)|)(?=[^-]|$)","i")
        }, Y = /HTML$/i, Q = /^(?:input|select|textarea|button)$/i, K = /^h\d$/i, J = /^[^{]+\{\s*\[native \w/, Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, ee = /[+~]/, te = new RegExp("\\\\[\\da-fA-F]{1,6}" + I + "?|\\\\([^\\r\\n\\f])","g"), ne = function(e, t) {
            var n = "0x" + e.slice(1) - 65536;
            return t || (n < 0 ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320))
        }, oe = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g, re = function(e, t) {
            return t ? "\0" === e ? "�" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
        }, ie = function() {
            h()
        }, ae = be((function(e) {
            return !0 === e.disabled && "fieldset" === e.nodeName.toLowerCase()
        }
        ), {
            dir: "parentNode",
            next: "legend"
        });
        try {
            q.apply(E = F.call(w.childNodes), w.childNodes),
            E[w.childNodes.length].nodeType
        } catch (e) {
            q = {
                apply: E.length ? function(e, t) {
                    D.apply(e, F.call(t))
                }
                : function(e, t) {
                    for (var n = e.length, o = 0; e[n++] = t[o++]; )
                        ;
                    e.length = n - 1
                }
            }
        }
        function se(e, t, o, r) {
            var i, s, c, u, d, p, y, x = t && t.ownerDocument, w = t ? t.nodeType : 9;
            if (o = o || [],
            "string" != typeof e || !e || 1 !== w && 9 !== w && 11 !== w)
                return o;
            if (!r && (h(t),
            t = t || f,
            g)) {
                if (11 !== w && (d = Z.exec(e)))
                    if (i = d[1]) {
                        if (9 === w) {
                            if (!(c = t.getElementById(i)))
                                return o;
                            if (c.id === i)
                                return o.push(c),
                                o
                        } else if (x && (c = x.getElementById(i)) && v(t, c) && c.id === i)
                            return o.push(c),
                            o
                    } else {
                        if (d[2])
                            return q.apply(o, t.getElementsByTagName(e)),
                            o;
                        if ((i = d[3]) && n.getElementsByClassName && t.getElementsByClassName)
                            return q.apply(o, t.getElementsByClassName(i)),
                            o
                    }
                if (n.qsa && !A[e + " "] && (!m || !m.test(e)) && (1 !== w || "object" !== t.nodeName.toLowerCase())) {
                    if (y = e,
                    x = t,
                    1 === w && (G.test(e) || z.test(e))) {
                        for ((x = ee.test(e) && ye(t.parentNode) || t) === t && n.scope || ((u = t.getAttribute("id")) ? u = u.replace(oe, re) : t.setAttribute("id", u = b)),
                        s = (p = a(e)).length; s--; )
                            p[s] = (u ? "#" + u : ":scope") + " " + ve(p[s]);
                        y = p.join(",")
                    }
                    try {
                        return q.apply(o, x.querySelectorAll(y)),
                        o
                    } catch (t) {
                        A(e, !0)
                    } finally {
                        u === b && t.removeAttribute("id")
                    }
                }
            }
            return l(e.replace(H, "$1"), t, o, r)
        }
        function le() {
            var e = [];
            return function t(n, r) {
                return e.push(n + " ") > o.cacheLength && delete t[e.shift()],
                t[n + " "] = r
            }
        }
        function ce(e) {
            return e[b] = !0,
            e
        }
        function ue(e) {
            var t = f.createElement("fieldset");
            try {
                return !!e(t)
            } catch (e) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t),
                t = null
            }
        }
        function de(e, t) {
            for (var n = e.split("|"), r = n.length; r--; )
                o.attrHandle[n[r]] = t
        }
        function he(e, t) {
            var n = t && e
              , o = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
            if (o)
                return o;
            if (n)
                for (; n = n.nextSibling; )
                    if (n === t)
                        return -1;
            return e ? 1 : -1
        }
        function fe(e) {
            return function(t) {
                return "input" === t.nodeName.toLowerCase() && t.type === e
            }
        }
        function pe(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && t.type === e
            }
        }
        function ge(e) {
            return function(t) {
                return "form"in t ? t.parentNode && !1 === t.disabled ? "label"in t ? "label"in t.parentNode ? t.parentNode.disabled === e : t.disabled === e : t.isDisabled === e || t.isDisabled !== !e && ae(t) === e : t.disabled === e : "label"in t && t.disabled === e
            }
        }
        function me(e) {
            return ce((function(t) {
                return t = +t,
                ce((function(n, o) {
                    for (var r, i = e([], n.length, t), a = i.length; a--; )
                        n[r = i[a]] && (n[r] = !(o[r] = n[r]))
                }
                ))
            }
            ))
        }
        function ye(e) {
            return e && void 0 !== e.getElementsByTagName && e
        }
        for (t in n = se.support = {},
        i = se.isXML = function(e) {
            var t = e && e.namespaceURI
              , n = e && (e.ownerDocument || e).documentElement;
            return !Y.test(t || n && n.nodeName || "HTML")
        }
        ,
        h = se.setDocument = function(e) {
            var t, r, a = e ? e.ownerDocument || e : w;
            return a != f && 9 === a.nodeType && a.documentElement ? (p = (f = a).documentElement,
            g = !i(f),
            w != f && (r = f.defaultView) && r.top !== r && (r.addEventListener ? r.addEventListener("unload", ie, !1) : r.attachEvent && r.attachEvent("onunload", ie)),
            n.scope = ue((function(e) {
                return p.appendChild(e).appendChild(f.createElement("div")),
                void 0 !== e.querySelectorAll && !e.querySelectorAll(":scope fieldset div").length
            }
            )),
            n.cssHas = ue((function() {
                try {
                    return f.querySelector(":has(*,:jqfake)"),
                    !1
                } catch (e) {
                    return !0
                }
            }
            )),
            n.attributes = ue((function(e) {
                return e.className = "i",
                !e.getAttribute("className")
            }
            )),
            n.getElementsByTagName = ue((function(e) {
                return e.appendChild(f.createComment("")),
                !e.getElementsByTagName("*").length
            }
            )),
            n.getElementsByClassName = J.test(f.getElementsByClassName),
            n.getById = ue((function(e) {
                return p.appendChild(e).id = b,
                !f.getElementsByName || !f.getElementsByName(b).length
            }
            )),
            n.getById ? (o.filter.ID = function(e) {
                var t = e.replace(te, ne);
                return function(e) {
                    return e.getAttribute("id") === t
                }
            }
            ,
            o.find.ID = function(e, t) {
                if (void 0 !== t.getElementById && g) {
                    var n = t.getElementById(e);
                    return n ? [n] : []
                }
            }
            ) : (o.filter.ID = function(e) {
                var t = e.replace(te, ne);
                return function(e) {
                    var n = void 0 !== e.getAttributeNode && e.getAttributeNode("id");
                    return n && n.value === t
                }
            }
            ,
            o.find.ID = function(e, t) {
                if (void 0 !== t.getElementById && g) {
                    var n, o, r, i = t.getElementById(e);
                    if (i) {
                        if ((n = i.getAttributeNode("id")) && n.value === e)
                            return [i];
                        for (r = t.getElementsByName(e),
                        o = 0; i = r[o++]; )
                            if ((n = i.getAttributeNode("id")) && n.value === e)
                                return [i]
                    }
                    return []
                }
            }
            ),
            o.find.TAG = n.getElementsByTagName ? function(e, t) {
                return void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e) : n.qsa ? t.querySelectorAll(e) : void 0
            }
            : function(e, t) {
                var n, o = [], r = 0, i = t.getElementsByTagName(e);
                if ("*" === e) {
                    for (; n = i[r++]; )
                        1 === n.nodeType && o.push(n);
                    return o
                }
                return i
            }
            ,
            o.find.CLASS = n.getElementsByClassName && function(e, t) {
                if (void 0 !== t.getElementsByClassName && g)
                    return t.getElementsByClassName(e)
            }
            ,
            y = [],
            m = [],
            (n.qsa = J.test(f.querySelectorAll)) && (ue((function(e) {
                var t;
                p.appendChild(e).innerHTML = "<a id='" + b + "'></a><select id='" + b + "-\r\\' msallowcapture=''><option selected=''></option></select>",
                e.querySelectorAll("[msallowcapture^='']").length && m.push("[*^$]=" + I + "*(?:''|\"\")"),
                e.querySelectorAll("[selected]").length || m.push("\\[" + I + "*(?:value|" + j + ")"),
                e.querySelectorAll("[id~=" + b + "-]").length || m.push("~="),
                (t = f.createElement("input")).setAttribute("name", ""),
                e.appendChild(t),
                e.querySelectorAll("[name='']").length || m.push("\\[" + I + "*name" + I + "*=" + I + "*(?:''|\"\")"),
                e.querySelectorAll(":checked").length || m.push(":checked"),
                e.querySelectorAll("a#" + b + "+*").length || m.push(".#.+[+~]"),
                e.querySelectorAll("\\\f"),
                m.push("[\\r\\n\\f]")
            }
            )),
            ue((function(e) {
                e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                var t = f.createElement("input");
                t.setAttribute("type", "hidden"),
                e.appendChild(t).setAttribute("name", "D"),
                e.querySelectorAll("[name=d]").length && m.push("name" + I + "*[*^$|!~]?="),
                2 !== e.querySelectorAll(":enabled").length && m.push(":enabled", ":disabled"),
                p.appendChild(e).disabled = !0,
                2 !== e.querySelectorAll(":disabled").length && m.push(":enabled", ":disabled"),
                e.querySelectorAll("*,:x"),
                m.push(",.*:")
            }
            ))),
            (n.matchesSelector = J.test(x = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.oMatchesSelector || p.msMatchesSelector)) && ue((function(e) {
                n.disconnectedMatch = x.call(e, "*"),
                x.call(e, "[s!='']:x"),
                y.push("!=", $)
            }
            )),
            n.cssHas || m.push(":has"),
            m = m.length && new RegExp(m.join("|")),
            y = y.length && new RegExp(y.join("|")),
            t = J.test(p.compareDocumentPosition),
            v = t || J.test(p.contains) ? function(e, t) {
                var n = 9 === e.nodeType && e.documentElement || e
                  , o = t && t.parentNode;
                return e === o || !(!o || 1 !== o.nodeType || !(n.contains ? n.contains(o) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(o)))
            }
            : function(e, t) {
                if (t)
                    for (; t = t.parentNode; )
                        if (t === e)
                            return !0;
                return !1
            }
            ,
            P = t ? function(e, t) {
                if (e === t)
                    return d = !0,
                    0;
                var o = !e.compareDocumentPosition - !t.compareDocumentPosition;
                return o || (1 & (o = (e.ownerDocument || e) == (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !n.sortDetached && t.compareDocumentPosition(e) === o ? e == f || e.ownerDocument == w && v(w, e) ? -1 : t == f || t.ownerDocument == w && v(w, t) ? 1 : u ? O(u, e) - O(u, t) : 0 : 4 & o ? -1 : 1)
            }
            : function(e, t) {
                if (e === t)
                    return d = !0,
                    0;
                var n, o = 0, r = e.parentNode, i = t.parentNode, a = [e], s = [t];
                if (!r || !i)
                    return e == f ? -1 : t == f ? 1 : r ? -1 : i ? 1 : u ? O(u, e) - O(u, t) : 0;
                if (r === i)
                    return he(e, t);
                for (n = e; n = n.parentNode; )
                    a.unshift(n);
                for (n = t; n = n.parentNode; )
                    s.unshift(n);
                for (; a[o] === s[o]; )
                    o++;
                return o ? he(a[o], s[o]) : a[o] == w ? -1 : s[o] == w ? 1 : 0
            }
            ,
            f) : f
        }
        ,
        se.matches = function(e, t) {
            return se(e, null, null, t)
        }
        ,
        se.matchesSelector = function(e, t) {
            if (h(e),
            n.matchesSelector && g && !A[t + " "] && (!y || !y.test(t)) && (!m || !m.test(t)))
                try {
                    var o = x.call(e, t);
                    if (o || n.disconnectedMatch || e.document && 11 !== e.document.nodeType)
                        return o
                } catch (e) {
                    A(t, !0)
                }
            return se(t, f, null, [e]).length > 0
        }
        ,
        se.contains = function(e, t) {
            return (e.ownerDocument || e) != f && h(e),
            v(e, t)
        }
        ,
        se.attr = function(e, t) {
            (e.ownerDocument || e) != f && h(e);
            var r = o.attrHandle[t.toLowerCase()]
              , i = r && M.call(o.attrHandle, t.toLowerCase()) ? r(e, t, !g) : void 0;
            return void 0 !== i ? i : n.attributes || !g ? e.getAttribute(t) : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
        }
        ,
        se.escape = function(e) {
            return (e + "").replace(oe, re)
        }
        ,
        se.error = function(e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        }
        ,
        se.uniqueSort = function(e) {
            var t, o = [], r = 0, i = 0;
            if (d = !n.detectDuplicates,
            u = !n.sortStable && e.slice(0),
            e.sort(P),
            d) {
                for (; t = e[i++]; )
                    t === e[i] && (r = o.push(i));
                for (; r--; )
                    e.splice(o[r], 1)
            }
            return u = null,
            e
        }
        ,
        r = se.getText = function(e) {
            var t, n = "", o = 0, i = e.nodeType;
            if (i) {
                if (1 === i || 9 === i || 11 === i) {
                    if ("string" == typeof e.textContent)
                        return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling)
                        n += r(e)
                } else if (3 === i || 4 === i)
                    return e.nodeValue
            } else
                for (; t = e[o++]; )
                    n += r(t);
            return n
        }
        ,
        o = se.selectors = {
            cacheLength: 50,
            createPseudo: ce,
            match: X,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(e) {
                    return e[1] = e[1].replace(te, ne),
                    e[3] = (e[3] || e[4] || e[5] || "").replace(te, ne),
                    "~=" === e[2] && (e[3] = " " + e[3] + " "),
                    e.slice(0, 4)
                },
                CHILD: function(e) {
                    return e[1] = e[1].toLowerCase(),
                    "nth" === e[1].slice(0, 3) ? (e[3] || se.error(e[0]),
                    e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])),
                    e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && se.error(e[0]),
                    e
                },
                PSEUDO: function(e) {
                    var t, n = !e[6] && e[2];
                    return X.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && U.test(n) && (t = a(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t),
                    e[2] = n.slice(0, t)),
                    e.slice(0, 3))
                }
            },
            filter: {
                TAG: function(e) {
                    var t = e.replace(te, ne).toLowerCase();
                    return "*" === e ? function() {
                        return !0
                    }
                    : function(e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t
                    }
                },
                CLASS: function(e) {
                    var t = _[e + " "];
                    return t || (t = new RegExp("(^|" + I + ")" + e + "(" + I + "|$)")) && _(e, (function(e) {
                        return t.test("string" == typeof e.className && e.className || void 0 !== e.getAttribute && e.getAttribute("class") || "")
                    }
                    ))
                },
                ATTR: function(e, t, n) {
                    return function(o) {
                        var r = se.attr(o, e);
                        return null == r ? "!=" === t : !t || (r += "",
                        "=" === t ? r === n : "!=" === t ? r !== n : "^=" === t ? n && 0 === r.indexOf(n) : "*=" === t ? n && r.indexOf(n) > -1 : "$=" === t ? n && r.slice(-n.length) === n : "~=" === t ? (" " + r.replace(B, " ") + " ").indexOf(n) > -1 : "|=" === t && (r === n || r.slice(0, n.length + 1) === n + "-"))
                    }
                },
                CHILD: function(e, t, n, o, r) {
                    var i = "nth" !== e.slice(0, 3)
                      , a = "last" !== e.slice(-4)
                      , s = "of-type" === t;
                    return 1 === o && 0 === r ? function(e) {
                        return !!e.parentNode
                    }
                    : function(t, n, l) {
                        var c, u, d, h, f, p, g = i !== a ? "nextSibling" : "previousSibling", m = t.parentNode, y = s && t.nodeName.toLowerCase(), x = !l && !s, v = !1;
                        if (m) {
                            if (i) {
                                for (; g; ) {
                                    for (h = t; h = h[g]; )
                                        if (s ? h.nodeName.toLowerCase() === y : 1 === h.nodeType)
                                            return !1;
                                    p = g = "only" === e && !p && "nextSibling"
                                }
                                return !0
                            }
                            if (p = [a ? m.firstChild : m.lastChild],
                            a && x) {
                                for (v = (f = (c = (u = (d = (h = m)[b] || (h[b] = {}))[h.uniqueID] || (d[h.uniqueID] = {}))[e] || [])[0] === C && c[1]) && c[2],
                                h = f && m.childNodes[f]; h = ++f && h && h[g] || (v = f = 0) || p.pop(); )
                                    if (1 === h.nodeType && ++v && h === t) {
                                        u[e] = [C, f, v];
                                        break
                                    }
                            } else if (x && (v = f = (c = (u = (d = (h = t)[b] || (h[b] = {}))[h.uniqueID] || (d[h.uniqueID] = {}))[e] || [])[0] === C && c[1]),
                            !1 === v)
                                for (; (h = ++f && h && h[g] || (v = f = 0) || p.pop()) && ((s ? h.nodeName.toLowerCase() !== y : 1 !== h.nodeType) || !++v || (x && ((u = (d = h[b] || (h[b] = {}))[h.uniqueID] || (d[h.uniqueID] = {}))[e] = [C, v]),
                                h !== t)); )
                                    ;
                            return (v -= r) === o || v % o == 0 && v / o >= 0
                        }
                    }
                },
                PSEUDO: function(e, t) {
                    var n, r = o.pseudos[e] || o.setFilters[e.toLowerCase()] || se.error("unsupported pseudo: " + e);
                    return r[b] ? r(t) : r.length > 1 ? (n = [e, e, "", t],
                    o.setFilters.hasOwnProperty(e.toLowerCase()) ? ce((function(e, n) {
                        for (var o, i = r(e, t), a = i.length; a--; )
                            e[o = O(e, i[a])] = !(n[o] = i[a])
                    }
                    )) : function(e) {
                        return r(e, 0, n)
                    }
                    ) : r
                }
            },
            pseudos: {
                not: ce((function(e) {
                    var t = []
                      , n = []
                      , o = s(e.replace(H, "$1"));
                    return o[b] ? ce((function(e, t, n, r) {
                        for (var i, a = o(e, null, r, []), s = e.length; s--; )
                            (i = a[s]) && (e[s] = !(t[s] = i))
                    }
                    )) : function(e, r, i) {
                        return t[0] = e,
                        o(t, null, i, n),
                        t[0] = null,
                        !n.pop()
                    }
                }
                )),
                has: ce((function(e) {
                    return function(t) {
                        return se(e, t).length > 0
                    }
                }
                )),
                contains: ce((function(e) {
                    return e = e.replace(te, ne),
                    function(t) {
                        return (t.textContent || r(t)).indexOf(e) > -1
                    }
                }
                )),
                lang: ce((function(e) {
                    return V.test(e || "") || se.error("unsupported lang: " + e),
                    e = e.replace(te, ne).toLowerCase(),
                    function(t) {
                        var n;
                        do {
                            if (n = g ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang"))
                                return (n = n.toLowerCase()) === e || 0 === n.indexOf(e + "-")
                        } while ((t = t.parentNode) && 1 === t.nodeType);
                        return !1
                    }
                }
                )),
                target: function(t) {
                    var n = e.location && e.location.hash;
                    return n && n.slice(1) === t.id
                },
                root: function(e) {
                    return e === p
                },
                focus: function(e) {
                    return e === f.activeElement && (!f.hasFocus || f.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                },
                enabled: ge(!1),
                disabled: ge(!0),
                checked: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !!e.checked || "option" === t && !!e.selected
                },
                selected: function(e) {
                    return e.parentNode && e.parentNode.selectedIndex,
                    !0 === e.selected
                },
                empty: function(e) {
                    for (e = e.firstChild; e; e = e.nextSibling)
                        if (e.nodeType < 6)
                            return !1;
                    return !0
                },
                parent: function(e) {
                    return !o.pseudos.empty(e)
                },
                header: function(e) {
                    return K.test(e.nodeName)
                },
                input: function(e) {
                    return Q.test(e.nodeName)
                },
                button: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t
                },
                text: function(e) {
                    var t;
                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                },
                first: me((function() {
                    return [0]
                }
                )),
                last: me((function(e, t) {
                    return [t - 1]
                }
                )),
                eq: me((function(e, t, n) {
                    return [n < 0 ? n + t : n]
                }
                )),
                even: me((function(e, t) {
                    for (var n = 0; n < t; n += 2)
                        e.push(n);
                    return e
                }
                )),
                odd: me((function(e, t) {
                    for (var n = 1; n < t; n += 2)
                        e.push(n);
                    return e
                }
                )),
                lt: me((function(e, t, n) {
                    for (var o = n < 0 ? n + t : n > t ? t : n; --o >= 0; )
                        e.push(o);
                    return e
                }
                )),
                gt: me((function(e, t, n) {
                    for (var o = n < 0 ? n + t : n; ++o < t; )
                        e.push(o);
                    return e
                }
                ))
            }
        },
        o.pseudos.nth = o.pseudos.eq,
        {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        })
            o.pseudos[t] = fe(t);
        for (t in {
            submit: !0,
            reset: !0
        })
            o.pseudos[t] = pe(t);
        function xe() {}
        function ve(e) {
            for (var t = 0, n = e.length, o = ""; t < n; t++)
                o += e[t].value;
            return o
        }
        function be(e, t, n) {
            var o = t.dir
              , r = t.next
              , i = r || o
              , a = n && "parentNode" === i
              , s = S++;
            return t.first ? function(t, n, r) {
                for (; t = t[o]; )
                    if (1 === t.nodeType || a)
                        return e(t, n, r);
                return !1
            }
            : function(t, n, l) {
                var c, u, d, h = [C, s];
                if (l) {
                    for (; t = t[o]; )
                        if ((1 === t.nodeType || a) && e(t, n, l))
                            return !0
                } else
                    for (; t = t[o]; )
                        if (1 === t.nodeType || a)
                            if (u = (d = t[b] || (t[b] = {}))[t.uniqueID] || (d[t.uniqueID] = {}),
                            r && r === t.nodeName.toLowerCase())
                                t = t[o] || t;
                            else {
                                if ((c = u[i]) && c[0] === C && c[1] === s)
                                    return h[2] = c[2];
                                if (u[i] = h,
                                h[2] = e(t, n, l))
                                    return !0
                            }
                return !1
            }
        }
        function we(e) {
            return e.length > 1 ? function(t, n, o) {
                for (var r = e.length; r--; )
                    if (!e[r](t, n, o))
                        return !1;
                return !0
            }
            : e[0]
        }
        function Ce(e, t, n, o, r) {
            for (var i, a = [], s = 0, l = e.length, c = null != t; s < l; s++)
                (i = e[s]) && (n && !n(i, o, r) || (a.push(i),
                c && t.push(s)));
            return a
        }
        function Se(e, t, n, o, r, i) {
            return o && !o[b] && (o = Se(o)),
            r && !r[b] && (r = Se(r, i)),
            ce((function(i, a, s, l) {
                var c, u, d, h = [], f = [], p = a.length, g = i || function(e, t, n) {
                    for (var o = 0, r = t.length; o < r; o++)
                        se(e, t[o], n);
                    return n
                }(t || "*", s.nodeType ? [s] : s, []), m = !e || !i && t ? g : Ce(g, h, e, s, l), y = n ? r || (i ? e : p || o) ? [] : a : m;
                if (n && n(m, y, s, l),
                o)
                    for (c = Ce(y, f),
                    o(c, [], s, l),
                    u = c.length; u--; )
                        (d = c[u]) && (y[f[u]] = !(m[f[u]] = d));
                if (i) {
                    if (r || e) {
                        if (r) {
                            for (c = [],
                            u = y.length; u--; )
                                (d = y[u]) && c.push(m[u] = d);
                            r(null, y = [], c, l)
                        }
                        for (u = y.length; u--; )
                            (d = y[u]) && (c = r ? O(i, d) : h[u]) > -1 && (i[c] = !(a[c] = d))
                    }
                } else
                    y = Ce(y === a ? y.splice(p, y.length) : y),
                    r ? r(null, a, y, l) : q.apply(a, y)
            }
            ))
        }
        function _e(e) {
            for (var t, n, r, i = e.length, a = o.relative[e[0].type], s = a || o.relative[" "], l = a ? 1 : 0, u = be((function(e) {
                return e === t
            }
            ), s, !0), d = be((function(e) {
                return O(t, e) > -1
            }
            ), s, !0), h = [function(e, n, o) {
                var r = !a && (o || n !== c) || ((t = n).nodeType ? u(e, n, o) : d(e, n, o));
                return t = null,
                r
            }
            ]; l < i; l++)
                if (n = o.relative[e[l].type])
                    h = [be(we(h), n)];
                else {
                    if ((n = o.filter[e[l].type].apply(null, e[l].matches))[b]) {
                        for (r = ++l; r < i && !o.relative[e[r].type]; r++)
                            ;
                        return Se(l > 1 && we(h), l > 1 && ve(e.slice(0, l - 1).concat({
                            value: " " === e[l - 2].type ? "*" : ""
                        })).replace(H, "$1"), n, l < r && _e(e.slice(l, r)), r < i && _e(e = e.slice(r)), r < i && ve(e))
                    }
                    h.push(n)
                }
            return we(h)
        }
        return xe.prototype = o.filters = o.pseudos,
        o.setFilters = new xe,
        a = se.tokenize = function(e, t) {
            var n, r, i, a, s, l, c, u = T[e + " "];
            if (u)
                return t ? 0 : u.slice(0);
            for (s = e,
            l = [],
            c = o.preFilter; s; ) {
                for (a in n && !(r = W.exec(s)) || (r && (s = s.slice(r[0].length) || s),
                l.push(i = [])),
                n = !1,
                (r = z.exec(s)) && (n = r.shift(),
                i.push({
                    value: n,
                    type: r[0].replace(H, " ")
                }),
                s = s.slice(n.length)),
                o.filter)
                    !(r = X[a].exec(s)) || c[a] && !(r = c[a](r)) || (n = r.shift(),
                    i.push({
                        value: n,
                        type: a,
                        matches: r
                    }),
                    s = s.slice(n.length));
                if (!n)
                    break
            }
            return t ? s.length : s ? se.error(e) : T(e, l).slice(0)
        }
        ,
        s = se.compile = function(e, t) {
            var n, r = [], i = [], s = k[e + " "];
            if (!s) {
                for (t || (t = a(e)),
                n = t.length; n--; )
                    (s = _e(t[n]))[b] ? r.push(s) : i.push(s);
                s = k(e, function(e, t) {
                    var n = t.length > 0
                      , r = e.length > 0
                      , i = function(i, a, s, l, u) {
                        var d, p, m, y = 0, x = "0", v = i && [], b = [], w = c, S = i || r && o.find.TAG("*", u), _ = C += null == w ? 1 : Math.random() || .1, T = S.length;
                        for (u && (c = a == f || a || u); x !== T && null != (d = S[x]); x++) {
                            if (r && d) {
                                for (p = 0,
                                a || d.ownerDocument == f || (h(d),
                                s = !g); m = e[p++]; )
                                    if (m(d, a || f, s)) {
                                        l.push(d);
                                        break
                                    }
                                u && (C = _)
                            }
                            n && ((d = !m && d) && y--,
                            i && v.push(d))
                        }
                        if (y += x,
                        n && x !== y) {
                            for (p = 0; m = t[p++]; )
                                m(v, b, a, s);
                            if (i) {
                                if (y > 0)
                                    for (; x--; )
                                        v[x] || b[x] || (b[x] = L.call(l));
                                b = Ce(b)
                            }
                            q.apply(l, b),
                            u && !i && b.length > 0 && y + t.length > 1 && se.uniqueSort(l)
                        }
                        return u && (C = _,
                        c = w),
                        v
                    };
                    return n ? ce(i) : i
                }(i, r)),
                s.selector = e
            }
            return s
        }
        ,
        l = se.select = function(e, t, n, r) {
            var i, l, c, u, d, h = "function" == typeof e && e, f = !r && a(e = h.selector || e);
            if (n = n || [],
            1 === f.length) {
                if ((l = f[0] = f[0].slice(0)).length > 2 && "ID" === (c = l[0]).type && 9 === t.nodeType && g && o.relative[l[1].type]) {
                    if (!(t = (o.find.ID(c.matches[0].replace(te, ne), t) || [])[0]))
                        return n;
                    h && (t = t.parentNode),
                    e = e.slice(l.shift().value.length)
                }
                for (i = X.needsContext.test(e) ? 0 : l.length; i-- && (c = l[i],
                !o.relative[u = c.type]); )
                    if ((d = o.find[u]) && (r = d(c.matches[0].replace(te, ne), ee.test(l[0].type) && ye(t.parentNode) || t))) {
                        if (l.splice(i, 1),
                        !(e = r.length && ve(l)))
                            return q.apply(n, r),
                            n;
                        break
                    }
            }
            return (h || s(e, f))(r, t, !g, n, !t || ee.test(e) && ye(t.parentNode) || t),
            n
        }
        ,
        n.sortStable = b.split("").sort(P).join("") === b,
        n.detectDuplicates = !!d,
        h(),
        n.sortDetached = ue((function(e) {
            return 1 & e.compareDocumentPosition(f.createElement("fieldset"))
        }
        )),
        ue((function(e) {
            return e.innerHTML = "<a href='#'></a>",
            "#" === e.firstChild.getAttribute("href")
        }
        )) || de("type|href|height|width", (function(e, t, n) {
            if (!n)
                return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
        }
        )),
        n.attributes && ue((function(e) {
            return e.innerHTML = "<input/>",
            e.firstChild.setAttribute("value", ""),
            "" === e.firstChild.getAttribute("value")
        }
        )) || de("value", (function(e, t, n) {
            if (!n && "input" === e.nodeName.toLowerCase())
                return e.defaultValue
        }
        )),
        ue((function(e) {
            return null == e.getAttribute("disabled")
        }
        )) || de(j, (function(e, t, n) {
            var o;
            if (!n)
                return !0 === e[t] ? t.toLowerCase() : (o = e.getAttributeNode(t)) && o.specified ? o.value : null
        }
        )),
        se
    }(e);
    w.find = S,
    w.expr = S.selectors,
    w.expr[":"] = w.expr.pseudos,
    w.uniqueSort = w.unique = S.uniqueSort,
    w.text = S.getText,
    w.isXMLDoc = S.isXML,
    w.contains = S.contains,
    w.escapeSelector = S.escape;
    var _ = function(e, t, n) {
        for (var o = [], r = void 0 !== n; (e = e[t]) && 9 !== e.nodeType; )
            if (1 === e.nodeType) {
                if (r && w(e).is(n))
                    break;
                o.push(e)
            }
        return o
    }
      , T = function(e, t) {
        for (var n = []; e; e = e.nextSibling)
            1 === e.nodeType && e !== t && n.push(e);
        return n
    }
      , k = w.expr.match.needsContext;
    function A(e, t) {
        return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
    }
    var P = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
    function M(e, t, n) {
        return p(t) ? w.grep(e, (function(e, o) {
            return !!t.call(e, o, e) !== n
        }
        )) : t.nodeType ? w.grep(e, (function(e) {
            return e === t !== n
        }
        )) : "string" != typeof t ? w.grep(e, (function(e) {
            return s.call(t, e) > -1 !== n
        }
        )) : w.filter(t, e, n)
    }
    w.filter = function(e, t, n) {
        var o = t[0];
        return n && (e = ":not(" + e + ")"),
        1 === t.length && 1 === o.nodeType ? w.find.matchesSelector(o, e) ? [o] : [] : w.find.matches(e, w.grep(t, (function(e) {
            return 1 === e.nodeType
        }
        )))
    }
    ,
    w.fn.extend({
        find: function(e) {
            var t, n, o = this.length, r = this;
            if ("string" != typeof e)
                return this.pushStack(w(e).filter((function() {
                    for (t = 0; t < o; t++)
                        if (w.contains(r[t], this))
                            return !0
                }
                )));
            for (n = this.pushStack([]),
            t = 0; t < o; t++)
                w.find(e, r[t], n);
            return o > 1 ? w.uniqueSort(n) : n
        },
        filter: function(e) {
            return this.pushStack(M(this, e || [], !1))
        },
        not: function(e) {
            return this.pushStack(M(this, e || [], !0))
        },
        is: function(e) {
            return !!M(this, "string" == typeof e && k.test(e) ? w(e) : e || [], !1).length
        }
    });
    var E, L = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
    (w.fn.init = function(e, t, n) {
        var o, r;
        if (!e)
            return this;
        if (n = n || E,
        "string" == typeof e) {
            if (!(o = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : L.exec(e)) || !o[1] && t)
                return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
            if (o[1]) {
                if (t = t instanceof w ? t[0] : t,
                w.merge(this, w.parseHTML(o[1], t && t.nodeType ? t.ownerDocument || t : m, !0)),
                P.test(o[1]) && w.isPlainObject(t))
                    for (o in t)
                        p(this[o]) ? this[o](t[o]) : this.attr(o, t[o]);
                return this
            }
            return (r = m.getElementById(o[2])) && (this[0] = r,
            this.length = 1),
            this
        }
        return e.nodeType ? (this[0] = e,
        this.length = 1,
        this) : p(e) ? void 0 !== n.ready ? n.ready(e) : e(w) : w.makeArray(e, this)
    }
    ).prototype = w.fn,
    E = w(m);
    var D = /^(?:parents|prev(?:Until|All))/
      , q = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    function F(e, t) {
        for (; (e = e[t]) && 1 !== e.nodeType; )
            ;
        return e
    }
    w.fn.extend({
        has: function(e) {
            var t = w(e, this)
              , n = t.length;
            return this.filter((function() {
                for (var e = 0; e < n; e++)
                    if (w.contains(this, t[e]))
                        return !0
            }
            ))
        },
        closest: function(e, t) {
            var n, o = 0, r = this.length, i = [], a = "string" != typeof e && w(e);
            if (!k.test(e))
                for (; o < r; o++)
                    for (n = this[o]; n && n !== t; n = n.parentNode)
                        if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && w.find.matchesSelector(n, e))) {
                            i.push(n);
                            break
                        }
            return this.pushStack(i.length > 1 ? w.uniqueSort(i) : i)
        },
        index: function(e) {
            return e ? "string" == typeof e ? s.call(w(e), this[0]) : s.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(e, t) {
            return this.pushStack(w.uniqueSort(w.merge(this.get(), w(e, t))))
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }),
    w.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        },
        parents: function(e) {
            return _(e, "parentNode")
        },
        parentsUntil: function(e, t, n) {
            return _(e, "parentNode", n)
        },
        next: function(e) {
            return F(e, "nextSibling")
        },
        prev: function(e) {
            return F(e, "previousSibling")
        },
        nextAll: function(e) {
            return _(e, "nextSibling")
        },
        prevAll: function(e) {
            return _(e, "previousSibling")
        },
        nextUntil: function(e, t, n) {
            return _(e, "nextSibling", n)
        },
        prevUntil: function(e, t, n) {
            return _(e, "previousSibling", n)
        },
        siblings: function(e) {
            return T((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return T(e.firstChild)
        },
        contents: function(e) {
            return null != e.contentDocument && o(e.contentDocument) ? e.contentDocument : (A(e, "template") && (e = e.content || e),
            w.merge([], e.childNodes))
        }
    }, (function(e, t) {
        w.fn[e] = function(n, o) {
            var r = w.map(this, t, n);
            return "Until" !== e.slice(-5) && (o = n),
            o && "string" == typeof o && (r = w.filter(o, r)),
            this.length > 1 && (q[e] || w.uniqueSort(r),
            D.test(e) && r.reverse()),
            this.pushStack(r)
        }
    }
    ));
    var O = /[^\x20\t\r\n\f]+/g;
    function j(e) {
        return e
    }
    function I(e) {
        throw e
    }
    function R(e, t, n, o) {
        var r;
        try {
            e && p(r = e.promise) ? r.call(e).done(t).fail(n) : e && p(r = e.then) ? r.call(e, t, n) : t.apply(void 0, [e].slice(o))
        } catch (e) {
            n.apply(void 0, [e])
        }
    }
    w.Callbacks = function(e) {
        e = "string" == typeof e ? function(e) {
            var t = {};
            return w.each(e.match(O) || [], (function(e, n) {
                t[n] = !0
            }
            )),
            t
        }(e) : w.extend({}, e);
        var t, n, o, r, i = [], a = [], s = -1, l = function() {
            for (r = r || e.once,
            o = t = !0; a.length; s = -1)
                for (n = a.shift(); ++s < i.length; )
                    !1 === i[s].apply(n[0], n[1]) && e.stopOnFalse && (s = i.length,
                    n = !1);
            e.memory || (n = !1),
            t = !1,
            r && (i = n ? [] : "")
        }, c = {
            add: function() {
                return i && (n && !t && (s = i.length - 1,
                a.push(n)),
                function t(n) {
                    w.each(n, (function(n, o) {
                        p(o) ? e.unique && c.has(o) || i.push(o) : o && o.length && "string" !== v(o) && t(o)
                    }
                    ))
                }(arguments),
                n && !t && l()),
                this
            },
            remove: function() {
                return w.each(arguments, (function(e, t) {
                    for (var n; (n = w.inArray(t, i, n)) > -1; )
                        i.splice(n, 1),
                        n <= s && s--
                }
                )),
                this
            },
            has: function(e) {
                return e ? w.inArray(e, i) > -1 : i.length > 0
            },
            empty: function() {
                return i && (i = []),
                this
            },
            disable: function() {
                return r = a = [],
                i = n = "",
                this
            },
            disabled: function() {
                return !i
            },
            lock: function() {
                return r = a = [],
                n || t || (i = n = ""),
                this
            },
            locked: function() {
                return !!r
            },
            fireWith: function(e, n) {
                return r || (n = [e, (n = n || []).slice ? n.slice() : n],
                a.push(n),
                t || l()),
                this
            },
            fire: function() {
                return c.fireWith(this, arguments),
                this
            },
            fired: function() {
                return !!o
            }
        };
        return c
    }
    ,
    w.extend({
        Deferred: function(t) {
            var n = [["notify", "progress", w.Callbacks("memory"), w.Callbacks("memory"), 2], ["resolve", "done", w.Callbacks("once memory"), w.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", w.Callbacks("once memory"), w.Callbacks("once memory"), 1, "rejected"]]
              , o = "pending"
              , r = {
                state: function() {
                    return o
                },
                always: function() {
                    return i.done(arguments).fail(arguments),
                    this
                },
                catch: function(e) {
                    return r.then(null, e)
                },
                pipe: function() {
                    var e = arguments;
                    return w.Deferred((function(t) {
                        w.each(n, (function(n, o) {
                            var r = p(e[o[4]]) && e[o[4]];
                            i[o[1]]((function() {
                                var e = r && r.apply(this, arguments);
                                e && p(e.promise) ? e.promise().progress(t.notify).done(t.resolve).fail(t.reject) : t[o[0] + "With"](this, r ? [e] : arguments)
                            }
                            ))
                        }
                        )),
                        e = null
                    }
                    )).promise()
                },
                then: function(t, o, r) {
                    var i = 0;
                    function a(t, n, o, r) {
                        return function() {
                            var s = this
                              , l = arguments
                              , c = function() {
                                var e, c;
                                if (!(t < i)) {
                                    if ((e = o.apply(s, l)) === n.promise())
                                        throw new TypeError("Thenable self-resolution");
                                    c = e && ("object" == typeof e || "function" == typeof e) && e.then,
                                    p(c) ? r ? c.call(e, a(i, n, j, r), a(i, n, I, r)) : (i++,
                                    c.call(e, a(i, n, j, r), a(i, n, I, r), a(i, n, j, n.notifyWith))) : (o !== j && (s = void 0,
                                    l = [e]),
                                    (r || n.resolveWith)(s, l))
                                }
                            }
                              , u = r ? c : function() {
                                try {
                                    c()
                                } catch (e) {
                                    w.Deferred.exceptionHook && w.Deferred.exceptionHook(e, u.stackTrace),
                                    t + 1 >= i && (o !== I && (s = void 0,
                                    l = [e]),
                                    n.rejectWith(s, l))
                                }
                            }
                            ;
                            t ? u() : (w.Deferred.getStackHook && (u.stackTrace = w.Deferred.getStackHook()),
                            e.setTimeout(u))
                        }
                    }
                    return w.Deferred((function(e) {
                        n[0][3].add(a(0, e, p(r) ? r : j, e.notifyWith)),
                        n[1][3].add(a(0, e, p(t) ? t : j)),
                        n[2][3].add(a(0, e, p(o) ? o : I))
                    }
                    )).promise()
                },
                promise: function(e) {
                    return null != e ? w.extend(e, r) : r
                }
            }
              , i = {};
            return w.each(n, (function(e, t) {
                var a = t[2]
                  , s = t[5];
                r[t[1]] = a.add,
                s && a.add((function() {
                    o = s
                }
                ), n[3 - e][2].disable, n[3 - e][3].disable, n[0][2].lock, n[0][3].lock),
                a.add(t[3].fire),
                i[t[0]] = function() {
                    return i[t[0] + "With"](this === i ? void 0 : this, arguments),
                    this
                }
                ,
                i[t[0] + "With"] = a.fireWith
            }
            )),
            r.promise(i),
            t && t.call(i, i),
            i
        },
        when: function(e) {
            var t = arguments.length
              , n = t
              , o = Array(n)
              , i = r.call(arguments)
              , a = w.Deferred()
              , s = function(e) {
                return function(n) {
                    o[e] = this,
                    i[e] = arguments.length > 1 ? r.call(arguments) : n,
                    --t || a.resolveWith(o, i)
                }
            };
            if (t <= 1 && (R(e, a.done(s(n)).resolve, a.reject, !t),
            "pending" === a.state() || p(i[n] && i[n].then)))
                return a.then();
            for (; n--; )
                R(i[n], s(n), a.reject);
            return a.promise()
        }
    });
    var N = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    w.Deferred.exceptionHook = function(t, n) {
        e.console && e.console.warn && t && N.test(t.name) && e.console.warn("jQuery.Deferred exception: " + t.message, t.stack, n)
    }
    ,
    w.readyException = function(t) {
        e.setTimeout((function() {
            throw t
        }
        ))
    }
    ;
    var $ = w.Deferred();
    function B() {
        m.removeEventListener("DOMContentLoaded", B),
        e.removeEventListener("load", B),
        w.ready()
    }
    w.fn.ready = function(e) {
        return $.then(e).catch((function(e) {
            w.readyException(e)
        }
        )),
        this
    }
    ,
    w.extend({
        isReady: !1,
        readyWait: 1,
        ready: function(e) {
            (!0 === e ? --w.readyWait : w.isReady) || (w.isReady = !0,
            !0 !== e && --w.readyWait > 0 || $.resolveWith(m, [w]))
        }
    }),
    w.ready.then = $.then,
    "complete" === m.readyState || "loading" !== m.readyState && !m.documentElement.doScroll ? e.setTimeout(w.ready) : (m.addEventListener("DOMContentLoaded", B),
    e.addEventListener("load", B));
    var H = function(e, t, n, o, r, i, a) {
        var s = 0
          , l = e.length
          , c = null == n;
        if ("object" === v(n))
            for (s in r = !0,
            n)
                H(e, t, s, n[s], !0, i, a);
        else if (void 0 !== o && (r = !0,
        p(o) || (a = !0),
        c && (a ? (t.call(e, o),
        t = null) : (c = t,
        t = function(e, t, n) {
            return c.call(w(e), n)
        }
        )),
        t))
            for (; s < l; s++)
                t(e[s], n, a ? o : o.call(e[s], s, t(e[s], n)));
        return r ? e : c ? t.call(e) : l ? t(e[0], n) : i
    }
      , W = /^-ms-/
      , z = /-([a-z])/g;
    function G(e, t) {
        return t.toUpperCase()
    }
    function U(e) {
        return e.replace(W, "ms-").replace(z, G)
    }
    var V = function(e) {
        return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
    };
    function X() {
        this.expando = w.expando + X.uid++
    }
    X.uid = 1,
    X.prototype = {
        cache: function(e) {
            var t = e[this.expando];
            return t || (t = {},
            V(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                value: t,
                configurable: !0
            }))),
            t
        },
        set: function(e, t, n) {
            var o, r = this.cache(e);
            if ("string" == typeof t)
                r[U(t)] = n;
            else
                for (o in t)
                    r[U(o)] = t[o];
            return r
        },
        get: function(e, t) {
            return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][U(t)]
        },
        access: function(e, t, n) {
            return void 0 === t || t && "string" == typeof t && void 0 === n ? this.get(e, t) : (this.set(e, t, n),
            void 0 !== n ? n : t)
        },
        remove: function(e, t) {
            var n, o = e[this.expando];
            if (void 0 !== o) {
                if (void 0 !== t) {
                    n = (t = Array.isArray(t) ? t.map(U) : (t = U(t))in o ? [t] : t.match(O) || []).length;
                    for (; n--; )
                        delete o[t[n]]
                }
                (void 0 === t || w.isEmptyObject(o)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
            }
        },
        hasData: function(e) {
            var t = e[this.expando];
            return void 0 !== t && !w.isEmptyObject(t)
        }
    };
    var Y = new X
      , Q = new X
      , K = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/
      , J = /[A-Z]/g;
    function Z(e, t, n) {
        var o;
        if (void 0 === n && 1 === e.nodeType)
            if (o = "data-" + t.replace(J, "-$&").toLowerCase(),
            "string" == typeof (n = e.getAttribute(o))) {
                try {
                    n = function(e) {
                        return "true" === e || "false" !== e && ("null" === e ? null : e === +e + "" ? +e : K.test(e) ? JSON.parse(e) : e)
                    }(n)
                } catch (e) {}
                Q.set(e, t, n)
            } else
                n = void 0;
        return n
    }
    w.extend({
        hasData: function(e) {
            return Q.hasData(e) || Y.hasData(e)
        },
        data: function(e, t, n) {
            return Q.access(e, t, n)
        },
        removeData: function(e, t) {
            Q.remove(e, t)
        },
        _data: function(e, t, n) {
            return Y.access(e, t, n)
        },
        _removeData: function(e, t) {
            Y.remove(e, t)
        }
    }),
    w.fn.extend({
        data: function(e, t) {
            var n, o, r, i = this[0], a = i && i.attributes;
            if (void 0 === e) {
                if (this.length && (r = Q.get(i),
                1 === i.nodeType && !Y.get(i, "hasDataAttrs"))) {
                    for (n = a.length; n--; )
                        a[n] && 0 === (o = a[n].name).indexOf("data-") && (o = U(o.slice(5)),
                        Z(i, o, r[o]));
                    Y.set(i, "hasDataAttrs", !0)
                }
                return r
            }
            return "object" == typeof e ? this.each((function() {
                Q.set(this, e)
            }
            )) : H(this, (function(t) {
                var n;
                if (i && void 0 === t)
                    return void 0 !== (n = Q.get(i, e)) || void 0 !== (n = Z(i, e)) ? n : void 0;
                this.each((function() {
                    Q.set(this, e, t)
                }
                ))
            }
            ), null, t, arguments.length > 1, null, !0)
        },
        removeData: function(e) {
            return this.each((function() {
                Q.remove(this, e)
            }
            ))
        }
    }),
    w.extend({
        queue: function(e, t, n) {
            var o;
            if (e)
                return t = (t || "fx") + "queue",
                o = Y.get(e, t),
                n && (!o || Array.isArray(n) ? o = Y.access(e, t, w.makeArray(n)) : o.push(n)),
                o || []
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = w.queue(e, t)
              , o = n.length
              , r = n.shift()
              , i = w._queueHooks(e, t);
            "inprogress" === r && (r = n.shift(),
            o--),
            r && ("fx" === t && n.unshift("inprogress"),
            delete i.stop,
            r.call(e, (function() {
                w.dequeue(e, t)
            }
            ), i)),
            !o && i && i.empty.fire()
        },
        _queueHooks: function(e, t) {
            var n = t + "queueHooks";
            return Y.get(e, n) || Y.access(e, n, {
                empty: w.Callbacks("once memory").add((function() {
                    Y.remove(e, [t + "queue", n])
                }
                ))
            })
        }
    }),
    w.fn.extend({
        queue: function(e, t) {
            var n = 2;
            return "string" != typeof e && (t = e,
            e = "fx",
            n--),
            arguments.length < n ? w.queue(this[0], e) : void 0 === t ? this : this.each((function() {
                var n = w.queue(this, e, t);
                w._queueHooks(this, e),
                "fx" === e && "inprogress" !== n[0] && w.dequeue(this, e)
            }
            ))
        },
        dequeue: function(e) {
            return this.each((function() {
                w.dequeue(this, e)
            }
            ))
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        },
        promise: function(e, t) {
            var n, o = 1, r = w.Deferred(), i = this, a = this.length, s = function() {
                --o || r.resolveWith(i, [i])
            };
            for ("string" != typeof e && (t = e,
            e = void 0),
            e = e || "fx"; a--; )
                (n = Y.get(i[a], e + "queueHooks")) && n.empty && (o++,
                n.empty.add(s));
            return s(),
            r.promise(t)
        }
    });
    var ee = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source
      , te = new RegExp("^(?:([+-])=|)(" + ee + ")([a-z%]*)$","i")
      , ne = ["Top", "Right", "Bottom", "Left"]
      , oe = m.documentElement
      , re = function(e) {
        return w.contains(e.ownerDocument, e)
    }
      , ie = {
        composed: !0
    };
    oe.getRootNode && (re = function(e) {
        return w.contains(e.ownerDocument, e) || e.getRootNode(ie) === e.ownerDocument
    }
    );
    var ae = function(e, t) {
        return "none" === (e = t || e).style.display || "" === e.style.display && re(e) && "none" === w.css(e, "display")
    };
    function se(e, t, n, o) {
        var r, i, a = 20, s = o ? function() {
            return o.cur()
        }
        : function() {
            return w.css(e, t, "")
        }
        , l = s(), c = n && n[3] || (w.cssNumber[t] ? "" : "px"), u = e.nodeType && (w.cssNumber[t] || "px" !== c && +l) && te.exec(w.css(e, t));
        if (u && u[3] !== c) {
            for (l /= 2,
            c = c || u[3],
            u = +l || 1; a--; )
                w.style(e, t, u + c),
                (1 - i) * (1 - (i = s() / l || .5)) <= 0 && (a = 0),
                u /= i;
            u *= 2,
            w.style(e, t, u + c),
            n = n || []
        }
        return n && (u = +u || +l || 0,
        r = n[1] ? u + (n[1] + 1) * n[2] : +n[2],
        o && (o.unit = c,
        o.start = u,
        o.end = r)),
        r
    }
    var le = {};
    function ce(e) {
        var t, n = e.ownerDocument, o = e.nodeName, r = le[o];
        return r || (t = n.body.appendChild(n.createElement(o)),
        r = w.css(t, "display"),
        t.parentNode.removeChild(t),
        "none" === r && (r = "block"),
        le[o] = r,
        r)
    }
    function ue(e, t) {
        for (var n, o, r = [], i = 0, a = e.length; i < a; i++)
            (o = e[i]).style && (n = o.style.display,
            t ? ("none" === n && (r[i] = Y.get(o, "display") || null,
            r[i] || (o.style.display = "")),
            "" === o.style.display && ae(o) && (r[i] = ce(o))) : "none" !== n && (r[i] = "none",
            Y.set(o, "display", n)));
        for (i = 0; i < a; i++)
            null != r[i] && (e[i].style.display = r[i]);
        return e
    }
    w.fn.extend({
        show: function() {
            return ue(this, !0)
        },
        hide: function() {
            return ue(this)
        },
        toggle: function(e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each((function() {
                ae(this) ? w(this).show() : w(this).hide()
            }
            ))
        }
    });
    var de, he, fe = /^(?:checkbox|radio)$/i, pe = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i, ge = /^$|^module$|\/(?:java|ecma)script/i;
    de = m.createDocumentFragment().appendChild(m.createElement("div")),
    (he = m.createElement("input")).setAttribute("type", "radio"),
    he.setAttribute("checked", "checked"),
    he.setAttribute("name", "t"),
    de.appendChild(he),
    f.checkClone = de.cloneNode(!0).cloneNode(!0).lastChild.checked,
    de.innerHTML = "<textarea>x</textarea>",
    f.noCloneChecked = !!de.cloneNode(!0).lastChild.defaultValue,
    de.innerHTML = "<option></option>",
    f.option = !!de.lastChild;
    var me = {
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: [0, "", ""]
    };
    function ye(e, t) {
        var n;
        return n = void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t || "*") : void 0 !== e.querySelectorAll ? e.querySelectorAll(t || "*") : [],
        void 0 === t || t && A(e, t) ? w.merge([e], n) : n
    }
    function xe(e, t) {
        for (var n = 0, o = e.length; n < o; n++)
            Y.set(e[n], "globalEval", !t || Y.get(t[n], "globalEval"))
    }
    me.tbody = me.tfoot = me.colgroup = me.caption = me.thead,
    me.th = me.td,
    f.option || (me.optgroup = me.option = [1, "<select multiple='multiple'>", "</select>"]);
    var ve = /<|&#?\w+;/;
    function be(e, t, n, o, r) {
        for (var i, a, s, l, c, u, d = t.createDocumentFragment(), h = [], f = 0, p = e.length; f < p; f++)
            if ((i = e[f]) || 0 === i)
                if ("object" === v(i))
                    w.merge(h, i.nodeType ? [i] : i);
                else if (ve.test(i)) {
                    for (a = a || d.appendChild(t.createElement("div")),
                    s = (pe.exec(i) || ["", ""])[1].toLowerCase(),
                    l = me[s] || me._default,
                    a.innerHTML = l[1] + w.htmlPrefilter(i) + l[2],
                    u = l[0]; u--; )
                        a = a.lastChild;
                    w.merge(h, a.childNodes),
                    (a = d.firstChild).textContent = ""
                } else
                    h.push(t.createTextNode(i));
        for (d.textContent = "",
        f = 0; i = h[f++]; )
            if (o && w.inArray(i, o) > -1)
                r && r.push(i);
            else if (c = re(i),
            a = ye(d.appendChild(i), "script"),
            c && xe(a),
            n)
                for (u = 0; i = a[u++]; )
                    ge.test(i.type || "") && n.push(i);
        return d
    }
    var we = /^([^.]*)(?:\.(.+)|)/;
    function Ce() {
        return !0
    }
    function Se() {
        return !1
    }
    function _e(e, t) {
        return e === function() {
            try {
                return m.activeElement
            } catch (e) {}
        }() == ("focus" === t)
    }
    function Te(e, t, n, o, r, i) {
        var a, s;
        if ("object" == typeof t) {
            for (s in "string" != typeof n && (o = o || n,
            n = void 0),
            t)
                Te(e, s, n, o, t[s], i);
            return e
        }
        if (null == o && null == r ? (r = n,
        o = n = void 0) : null == r && ("string" == typeof n ? (r = o,
        o = void 0) : (r = o,
        o = n,
        n = void 0)),
        !1 === r)
            r = Se;
        else if (!r)
            return e;
        return 1 === i && (a = r,
        r = function(e) {
            return w().off(e),
            a.apply(this, arguments)
        }
        ,
        r.guid = a.guid || (a.guid = w.guid++)),
        e.each((function() {
            w.event.add(this, t, r, o, n)
        }
        ))
    }
    function ke(e, t, n) {
        n ? (Y.set(e, t, !1),
        w.event.add(e, t, {
            namespace: !1,
            handler: function(e) {
                var o, i, a = Y.get(this, t);
                if (1 & e.isTrigger && this[t]) {
                    if (a.length)
                        (w.event.special[t] || {}).delegateType && e.stopPropagation();
                    else if (a = r.call(arguments),
                    Y.set(this, t, a),
                    o = n(this, t),
                    this[t](),
                    a !== (i = Y.get(this, t)) || o ? Y.set(this, t, !1) : i = {},
                    a !== i)
                        return e.stopImmediatePropagation(),
                        e.preventDefault(),
                        i && i.value
                } else
                    a.length && (Y.set(this, t, {
                        value: w.event.trigger(w.extend(a[0], w.Event.prototype), a.slice(1), this)
                    }),
                    e.stopImmediatePropagation())
            }
        })) : void 0 === Y.get(e, t) && w.event.add(e, t, Ce)
    }
    w.event = {
        global: {},
        add: function(e, t, n, o, r) {
            var i, a, s, l, c, u, d, h, f, p, g, m = Y.get(e);
            if (V(e))
                for (n.handler && (n = (i = n).handler,
                r = i.selector),
                r && w.find.matchesSelector(oe, r),
                n.guid || (n.guid = w.guid++),
                (l = m.events) || (l = m.events = Object.create(null)),
                (a = m.handle) || (a = m.handle = function(t) {
                    return void 0 !== w && w.event.triggered !== t.type ? w.event.dispatch.apply(e, arguments) : void 0
                }
                ),
                c = (t = (t || "").match(O) || [""]).length; c--; )
                    f = g = (s = we.exec(t[c]) || [])[1],
                    p = (s[2] || "").split(".").sort(),
                    f && (d = w.event.special[f] || {},
                    f = (r ? d.delegateType : d.bindType) || f,
                    d = w.event.special[f] || {},
                    u = w.extend({
                        type: f,
                        origType: g,
                        data: o,
                        handler: n,
                        guid: n.guid,
                        selector: r,
                        needsContext: r && w.expr.match.needsContext.test(r),
                        namespace: p.join(".")
                    }, i),
                    (h = l[f]) || ((h = l[f] = []).delegateCount = 0,
                    d.setup && !1 !== d.setup.call(e, o, p, a) || e.addEventListener && e.addEventListener(f, a)),
                    d.add && (d.add.call(e, u),
                    u.handler.guid || (u.handler.guid = n.guid)),
                    r ? h.splice(h.delegateCount++, 0, u) : h.push(u),
                    w.event.global[f] = !0)
        },
        remove: function(e, t, n, o, r) {
            var i, a, s, l, c, u, d, h, f, p, g, m = Y.hasData(e) && Y.get(e);
            if (m && (l = m.events)) {
                for (c = (t = (t || "").match(O) || [""]).length; c--; )
                    if (f = g = (s = we.exec(t[c]) || [])[1],
                    p = (s[2] || "").split(".").sort(),
                    f) {
                        for (d = w.event.special[f] || {},
                        h = l[f = (o ? d.delegateType : d.bindType) || f] || [],
                        s = s[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                        a = i = h.length; i--; )
                            u = h[i],
                            !r && g !== u.origType || n && n.guid !== u.guid || s && !s.test(u.namespace) || o && o !== u.selector && ("**" !== o || !u.selector) || (h.splice(i, 1),
                            u.selector && h.delegateCount--,
                            d.remove && d.remove.call(e, u));
                        a && !h.length && (d.teardown && !1 !== d.teardown.call(e, p, m.handle) || w.removeEvent(e, f, m.handle),
                        delete l[f])
                    } else
                        for (f in l)
                            w.event.remove(e, f + t[c], n, o, !0);
                w.isEmptyObject(l) && Y.remove(e, "handle events")
            }
        },
        dispatch: function(e) {
            var t, n, o, r, i, a, s = new Array(arguments.length), l = w.event.fix(e), c = (Y.get(this, "events") || Object.create(null))[l.type] || [], u = w.event.special[l.type] || {};
            for (s[0] = l,
            t = 1; t < arguments.length; t++)
                s[t] = arguments[t];
            if (l.delegateTarget = this,
            !u.preDispatch || !1 !== u.preDispatch.call(this, l)) {
                for (a = w.event.handlers.call(this, l, c),
                t = 0; (r = a[t++]) && !l.isPropagationStopped(); )
                    for (l.currentTarget = r.elem,
                    n = 0; (i = r.handlers[n++]) && !l.isImmediatePropagationStopped(); )
                        l.rnamespace && !1 !== i.namespace && !l.rnamespace.test(i.namespace) || (l.handleObj = i,
                        l.data = i.data,
                        void 0 !== (o = ((w.event.special[i.origType] || {}).handle || i.handler).apply(r.elem, s)) && !1 === (l.result = o) && (l.preventDefault(),
                        l.stopPropagation()));
                return u.postDispatch && u.postDispatch.call(this, l),
                l.result
            }
        },
        handlers: function(e, t) {
            var n, o, r, i, a, s = [], l = t.delegateCount, c = e.target;
            if (l && c.nodeType && !("click" === e.type && e.button >= 1))
                for (; c !== this; c = c.parentNode || this)
                    if (1 === c.nodeType && ("click" !== e.type || !0 !== c.disabled)) {
                        for (i = [],
                        a = {},
                        n = 0; n < l; n++)
                            void 0 === a[r = (o = t[n]).selector + " "] && (a[r] = o.needsContext ? w(r, this).index(c) > -1 : w.find(r, this, null, [c]).length),
                            a[r] && i.push(o);
                        i.length && s.push({
                            elem: c,
                            handlers: i
                        })
                    }
            return c = this,
            l < t.length && s.push({
                elem: c,
                handlers: t.slice(l)
            }),
            s
        },
        addProp: function(e, t) {
            Object.defineProperty(w.Event.prototype, e, {
                enumerable: !0,
                configurable: !0,
                get: p(t) ? function() {
                    if (this.originalEvent)
                        return t(this.originalEvent)
                }
                : function() {
                    if (this.originalEvent)
                        return this.originalEvent[e]
                }
                ,
                set: function(t) {
                    Object.defineProperty(this, e, {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: t
                    })
                }
            })
        },
        fix: function(e) {
            return e[w.expando] ? e : new w.Event(e)
        },
        special: {
            load: {
                noBubble: !0
            },
            click: {
                setup: function(e) {
                    var t = this || e;
                    return fe.test(t.type) && t.click && A(t, "input") && ke(t, "click", Ce),
                    !1
                },
                trigger: function(e) {
                    var t = this || e;
                    return fe.test(t.type) && t.click && A(t, "input") && ke(t, "click"),
                    !0
                },
                _default: function(e) {
                    var t = e.target;
                    return fe.test(t.type) && t.click && A(t, "input") && Y.get(t, "click") || A(t, "a")
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                }
            }
        }
    },
    w.removeEvent = function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n)
    }
    ,
    w.Event = function(e, t) {
        if (!(this instanceof w.Event))
            return new w.Event(e,t);
        e && e.type ? (this.originalEvent = e,
        this.type = e.type,
        this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? Ce : Se,
        this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target,
        this.currentTarget = e.currentTarget,
        this.relatedTarget = e.relatedTarget) : this.type = e,
        t && w.extend(this, t),
        this.timeStamp = e && e.timeStamp || Date.now(),
        this[w.expando] = !0
    }
    ,
    w.Event.prototype = {
        constructor: w.Event,
        isDefaultPrevented: Se,
        isPropagationStopped: Se,
        isImmediatePropagationStopped: Se,
        isSimulated: !1,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = Ce,
            e && !this.isSimulated && e.preventDefault()
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = Ce,
            e && !this.isSimulated && e.stopPropagation()
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = Ce,
            e && !this.isSimulated && e.stopImmediatePropagation(),
            this.stopPropagation()
        }
    },
    w.each({
        altKey: !0,
        bubbles: !0,
        cancelable: !0,
        changedTouches: !0,
        ctrlKey: !0,
        detail: !0,
        eventPhase: !0,
        metaKey: !0,
        pageX: !0,
        pageY: !0,
        shiftKey: !0,
        view: !0,
        char: !0,
        code: !0,
        charCode: !0,
        key: !0,
        keyCode: !0,
        button: !0,
        buttons: !0,
        clientX: !0,
        clientY: !0,
        offsetX: !0,
        offsetY: !0,
        pointerId: !0,
        pointerType: !0,
        screenX: !0,
        screenY: !0,
        targetTouches: !0,
        toElement: !0,
        touches: !0,
        which: !0
    }, w.event.addProp),
    w.each({
        focus: "focusin",
        blur: "focusout"
    }, (function(e, t) {
        w.event.special[e] = {
            setup: function() {
                return ke(this, e, _e),
                !1
            },
            trigger: function() {
                return ke(this, e),
                !0
            },
            _default: function(t) {
                return Y.get(t.target, e)
            },
            delegateType: t
        }
    }
    )),
    w.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, (function(e, t) {
        w.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function(e) {
                var n, o = e.relatedTarget, r = e.handleObj;
                return o && (o === this || w.contains(this, o)) || (e.type = r.origType,
                n = r.handler.apply(this, arguments),
                e.type = t),
                n
            }
        }
    }
    )),
    w.fn.extend({
        on: function(e, t, n, o) {
            return Te(this, e, t, n, o)
        },
        one: function(e, t, n, o) {
            return Te(this, e, t, n, o, 1)
        },
        off: function(e, t, n) {
            var o, r;
            if (e && e.preventDefault && e.handleObj)
                return o = e.handleObj,
                w(e.delegateTarget).off(o.namespace ? o.origType + "." + o.namespace : o.origType, o.selector, o.handler),
                this;
            if ("object" == typeof e) {
                for (r in e)
                    this.off(r, t, e[r]);
                return this
            }
            return !1 !== t && "function" != typeof t || (n = t,
            t = void 0),
            !1 === n && (n = Se),
            this.each((function() {
                w.event.remove(this, e, n, t)
            }
            ))
        }
    });
    var Ae = /<script|<style|<link/i
      , Pe = /checked\s*(?:[^=]|=\s*.checked.)/i
      , Me = /^\s*<!\[CDATA\[|\]\]>\s*$/g;
    function Ee(e, t) {
        return A(e, "table") && A(11 !== t.nodeType ? t : t.firstChild, "tr") && w(e).children("tbody")[0] || e
    }
    function Le(e) {
        return e.type = (null !== e.getAttribute("type")) + "/" + e.type,
        e
    }
    function De(e) {
        return "true/" === (e.type || "").slice(0, 5) ? e.type = e.type.slice(5) : e.removeAttribute("type"),
        e
    }
    function qe(e, t) {
        var n, o, r, i, a, s;
        if (1 === t.nodeType) {
            if (Y.hasData(e) && (s = Y.get(e).events))
                for (r in Y.remove(t, "handle events"),
                s)
                    for (n = 0,
                    o = s[r].length; n < o; n++)
                        w.event.add(t, r, s[r][n]);
            Q.hasData(e) && (i = Q.access(e),
            a = w.extend({}, i),
            Q.set(t, a))
        }
    }
    function Fe(e, t) {
        var n = t.nodeName.toLowerCase();
        "input" === n && fe.test(e.type) ? t.checked = e.checked : "input" !== n && "textarea" !== n || (t.defaultValue = e.defaultValue)
    }
    function Oe(e, t, n, o) {
        t = i(t);
        var r, a, s, l, c, u, d = 0, h = e.length, g = h - 1, m = t[0], y = p(m);
        if (y || h > 1 && "string" == typeof m && !f.checkClone && Pe.test(m))
            return e.each((function(r) {
                var i = e.eq(r);
                y && (t[0] = m.call(this, r, i.html())),
                Oe(i, t, n, o)
            }
            ));
        if (h && (a = (r = be(t, e[0].ownerDocument, !1, e, o)).firstChild,
        1 === r.childNodes.length && (r = a),
        a || o)) {
            for (l = (s = w.map(ye(r, "script"), Le)).length; d < h; d++)
                c = r,
                d !== g && (c = w.clone(c, !0, !0),
                l && w.merge(s, ye(c, "script"))),
                n.call(e[d], c, d);
            if (l)
                for (u = s[s.length - 1].ownerDocument,
                w.map(s, De),
                d = 0; d < l; d++)
                    c = s[d],
                    ge.test(c.type || "") && !Y.access(c, "globalEval") && w.contains(u, c) && (c.src && "module" !== (c.type || "").toLowerCase() ? w._evalUrl && !c.noModule && w._evalUrl(c.src, {
                        nonce: c.nonce || c.getAttribute("nonce")
                    }, u) : x(c.textContent.replace(Me, ""), c, u))
        }
        return e
    }
    function je(e, t, n) {
        for (var o, r = t ? w.filter(t, e) : e, i = 0; null != (o = r[i]); i++)
            n || 1 !== o.nodeType || w.cleanData(ye(o)),
            o.parentNode && (n && re(o) && xe(ye(o, "script")),
            o.parentNode.removeChild(o));
        return e
    }
    w.extend({
        htmlPrefilter: function(e) {
            return e
        },
        clone: function(e, t, n) {
            var o, r, i, a, s = e.cloneNode(!0), l = re(e);
            if (!(f.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || w.isXMLDoc(e)))
                for (a = ye(s),
                o = 0,
                r = (i = ye(e)).length; o < r; o++)
                    Fe(i[o], a[o]);
            if (t)
                if (n)
                    for (i = i || ye(e),
                    a = a || ye(s),
                    o = 0,
                    r = i.length; o < r; o++)
                        qe(i[o], a[o]);
                else
                    qe(e, s);
            return (a = ye(s, "script")).length > 0 && xe(a, !l && ye(e, "script")),
            s
        },
        cleanData: function(e) {
            for (var t, n, o, r = w.event.special, i = 0; void 0 !== (n = e[i]); i++)
                if (V(n)) {
                    if (t = n[Y.expando]) {
                        if (t.events)
                            for (o in t.events)
                                r[o] ? w.event.remove(n, o) : w.removeEvent(n, o, t.handle);
                        n[Y.expando] = void 0
                    }
                    n[Q.expando] && (n[Q.expando] = void 0)
                }
        }
    }),
    w.fn.extend({
        detach: function(e) {
            return je(this, e, !0)
        },
        remove: function(e) {
            return je(this, e)
        },
        text: function(e) {
            return H(this, (function(e) {
                return void 0 === e ? w.text(this) : this.empty().each((function() {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
                }
                ))
            }
            ), null, e, arguments.length)
        },
        append: function() {
            return Oe(this, arguments, (function(e) {
                1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || Ee(this, e).appendChild(e)
            }
            ))
        },
        prepend: function() {
            return Oe(this, arguments, (function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = Ee(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            }
            ))
        },
        before: function() {
            return Oe(this, arguments, (function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            }
            ))
        },
        after: function() {
            return Oe(this, arguments, (function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            }
            ))
        },
        empty: function() {
            for (var e, t = 0; null != (e = this[t]); t++)
                1 === e.nodeType && (w.cleanData(ye(e, !1)),
                e.textContent = "");
            return this
        },
        clone: function(e, t) {
            return e = null != e && e,
            t = null == t ? e : t,
            this.map((function() {
                return w.clone(this, e, t)
            }
            ))
        },
        html: function(e) {
            return H(this, (function(e) {
                var t = this[0] || {}
                  , n = 0
                  , o = this.length;
                if (void 0 === e && 1 === t.nodeType)
                    return t.innerHTML;
                if ("string" == typeof e && !Ae.test(e) && !me[(pe.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = w.htmlPrefilter(e);
                    try {
                        for (; n < o; n++)
                            1 === (t = this[n] || {}).nodeType && (w.cleanData(ye(t, !1)),
                            t.innerHTML = e);
                        t = 0
                    } catch (e) {}
                }
                t && this.empty().append(e)
            }
            ), null, e, arguments.length)
        },
        replaceWith: function() {
            var e = [];
            return Oe(this, arguments, (function(t) {
                var n = this.parentNode;
                w.inArray(this, e) < 0 && (w.cleanData(ye(this)),
                n && n.replaceChild(t, this))
            }
            ), e)
        }
    }),
    w.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, (function(e, t) {
        w.fn[e] = function(e) {
            for (var n, o = [], r = w(e), i = r.length - 1, s = 0; s <= i; s++)
                n = s === i ? this : this.clone(!0),
                w(r[s])[t](n),
                a.apply(o, n.get());
            return this.pushStack(o)
        }
    }
    ));
    var Ie = new RegExp("^(" + ee + ")(?!px)[a-z%]+$","i")
      , Re = /^--/
      , Ne = function(t) {
        var n = t.ownerDocument.defaultView;
        return n && n.opener || (n = e),
        n.getComputedStyle(t)
    }
      , $e = function(e, t, n) {
        var o, r, i = {};
        for (r in t)
            i[r] = e.style[r],
            e.style[r] = t[r];
        for (r in o = n.call(e),
        t)
            e.style[r] = i[r];
        return o
    }
      , Be = new RegExp(ne.join("|"),"i")
      , He = "[\\x20\\t\\r\\n\\f]"
      , We = new RegExp("^" + He + "+|((?:^|[^\\\\])(?:\\\\.)*)" + He + "+$","g");
    function ze(e, t, n) {
        var o, r, i, a, s = Re.test(t), l = e.style;
        return (n = n || Ne(e)) && (a = n.getPropertyValue(t) || n[t],
        s && a && (a = a.replace(We, "$1") || void 0),
        "" !== a || re(e) || (a = w.style(e, t)),
        !f.pixelBoxStyles() && Ie.test(a) && Be.test(t) && (o = l.width,
        r = l.minWidth,
        i = l.maxWidth,
        l.minWidth = l.maxWidth = l.width = a,
        a = n.width,
        l.width = o,
        l.minWidth = r,
        l.maxWidth = i)),
        void 0 !== a ? a + "" : a
    }
    function Ge(e, t) {
        return {
            get: function() {
                if (!e())
                    return (this.get = t).apply(this, arguments);
                delete this.get
            }
        }
    }
    !function() {
        function t() {
            if (u) {
                c.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0",
                u.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%",
                oe.appendChild(c).appendChild(u);
                var t = e.getComputedStyle(u);
                o = "1%" !== t.top,
                l = 12 === n(t.marginLeft),
                u.style.right = "60%",
                a = 36 === n(t.right),
                r = 36 === n(t.width),
                u.style.position = "absolute",
                i = 12 === n(u.offsetWidth / 3),
                oe.removeChild(c),
                u = null
            }
        }
        function n(e) {
            return Math.round(parseFloat(e))
        }
        var o, r, i, a, s, l, c = m.createElement("div"), u = m.createElement("div");
        u.style && (u.style.backgroundClip = "content-box",
        u.cloneNode(!0).style.backgroundClip = "",
        f.clearCloneStyle = "content-box" === u.style.backgroundClip,
        w.extend(f, {
            boxSizingReliable: function() {
                return t(),
                r
            },
            pixelBoxStyles: function() {
                return t(),
                a
            },
            pixelPosition: function() {
                return t(),
                o
            },
            reliableMarginLeft: function() {
                return t(),
                l
            },
            scrollboxSize: function() {
                return t(),
                i
            },
            reliableTrDimensions: function() {
                var t, n, o, r;
                return null == s && (t = m.createElement("table"),
                n = m.createElement("tr"),
                o = m.createElement("div"),
                t.style.cssText = "position:absolute;left:-11111px;border-collapse:separate",
                n.style.cssText = "border:1px solid",
                n.style.height = "1px",
                o.style.height = "9px",
                o.style.display = "block",
                oe.appendChild(t).appendChild(n).appendChild(o),
                r = e.getComputedStyle(n),
                s = parseInt(r.height, 10) + parseInt(r.borderTopWidth, 10) + parseInt(r.borderBottomWidth, 10) === n.offsetHeight,
                oe.removeChild(t)),
                s
            }
        }))
    }();
    var Ue = ["Webkit", "Moz", "ms"]
      , Ve = m.createElement("div").style
      , Xe = {};
    function Ye(e) {
        var t = w.cssProps[e] || Xe[e];
        return t || (e in Ve ? e : Xe[e] = function(e) {
            for (var t = e[0].toUpperCase() + e.slice(1), n = Ue.length; n--; )
                if ((e = Ue[n] + t)in Ve)
                    return e
        }(e) || e)
    }
    var Qe = /^(none|table(?!-c[ea]).+)/
      , Ke = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }
      , Je = {
        letterSpacing: "0",
        fontWeight: "400"
    };
    function Ze(e, t, n) {
        var o = te.exec(t);
        return o ? Math.max(0, o[2] - (n || 0)) + (o[3] || "px") : t
    }
    function et(e, t, n, o, r, i) {
        var a = "width" === t ? 1 : 0
          , s = 0
          , l = 0;
        if (n === (o ? "border" : "content"))
            return 0;
        for (; a < 4; a += 2)
            "margin" === n && (l += w.css(e, n + ne[a], !0, r)),
            o ? ("content" === n && (l -= w.css(e, "padding" + ne[a], !0, r)),
            "margin" !== n && (l -= w.css(e, "border" + ne[a] + "Width", !0, r))) : (l += w.css(e, "padding" + ne[a], !0, r),
            "padding" !== n ? l += w.css(e, "border" + ne[a] + "Width", !0, r) : s += w.css(e, "border" + ne[a] + "Width", !0, r));
        return !o && i >= 0 && (l += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - i - l - s - .5)) || 0),
        l
    }
    function tt(e, t, n) {
        var o = Ne(e)
          , r = (!f.boxSizingReliable() || n) && "border-box" === w.css(e, "boxSizing", !1, o)
          , i = r
          , a = ze(e, t, o)
          , s = "offset" + t[0].toUpperCase() + t.slice(1);
        if (Ie.test(a)) {
            if (!n)
                return a;
            a = "auto"
        }
        return (!f.boxSizingReliable() && r || !f.reliableTrDimensions() && A(e, "tr") || "auto" === a || !parseFloat(a) && "inline" === w.css(e, "display", !1, o)) && e.getClientRects().length && (r = "border-box" === w.css(e, "boxSizing", !1, o),
        (i = s in e) && (a = e[s])),
        (a = parseFloat(a) || 0) + et(e, t, n || (r ? "border" : "content"), i, o, a) + "px"
    }
    function nt(e, t, n, o, r) {
        return new nt.prototype.init(e,t,n,o,r)
    }
    w.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = ze(e, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            gridArea: !0,
            gridColumn: !0,
            gridColumnEnd: !0,
            gridColumnStart: !0,
            gridRow: !0,
            gridRowEnd: !0,
            gridRowStart: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {},
        style: function(e, t, n, o) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var r, i, a, s = U(t), l = Re.test(t), c = e.style;
                if (l || (t = Ye(s)),
                a = w.cssHooks[t] || w.cssHooks[s],
                void 0 === n)
                    return a && "get"in a && void 0 !== (r = a.get(e, !1, o)) ? r : c[t];
                "string" === (i = typeof n) && (r = te.exec(n)) && r[1] && (n = se(e, t, r),
                i = "number"),
                null != n && n == n && ("number" !== i || l || (n += r && r[3] || (w.cssNumber[s] ? "" : "px")),
                f.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (c[t] = "inherit"),
                a && "set"in a && void 0 === (n = a.set(e, n, o)) || (l ? c.setProperty(t, n) : c[t] = n))
            }
        },
        css: function(e, t, n, o) {
            var r, i, a, s = U(t);
            return Re.test(t) || (t = Ye(s)),
            (a = w.cssHooks[t] || w.cssHooks[s]) && "get"in a && (r = a.get(e, !0, n)),
            void 0 === r && (r = ze(e, t, o)),
            "normal" === r && t in Je && (r = Je[t]),
            "" === n || n ? (i = parseFloat(r),
            !0 === n || isFinite(i) ? i || 0 : r) : r
        }
    }),
    w.each(["height", "width"], (function(e, t) {
        w.cssHooks[t] = {
            get: function(e, n, o) {
                if (n)
                    return !Qe.test(w.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? tt(e, t, o) : $e(e, Ke, (function() {
                        return tt(e, t, o)
                    }
                    ))
            },
            set: function(e, n, o) {
                var r, i = Ne(e), a = !f.scrollboxSize() && "absolute" === i.position, s = (a || o) && "border-box" === w.css(e, "boxSizing", !1, i), l = o ? et(e, t, o, s, i) : 0;
                return s && a && (l -= Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - parseFloat(i[t]) - et(e, t, "border", !1, i) - .5)),
                l && (r = te.exec(n)) && "px" !== (r[3] || "px") && (e.style[t] = n,
                n = w.css(e, t)),
                Ze(0, n, l)
            }
        }
    }
    )),
    w.cssHooks.marginLeft = Ge(f.reliableMarginLeft, (function(e, t) {
        if (t)
            return (parseFloat(ze(e, "marginLeft")) || e.getBoundingClientRect().left - $e(e, {
                marginLeft: 0
            }, (function() {
                return e.getBoundingClientRect().left
            }
            ))) + "px"
    }
    )),
    w.each({
        margin: "",
        padding: "",
        border: "Width"
    }, (function(e, t) {
        w.cssHooks[e + t] = {
            expand: function(n) {
                for (var o = 0, r = {}, i = "string" == typeof n ? n.split(" ") : [n]; o < 4; o++)
                    r[e + ne[o] + t] = i[o] || i[o - 2] || i[0];
                return r
            }
        },
        "margin" !== e && (w.cssHooks[e + t].set = Ze)
    }
    )),
    w.fn.extend({
        css: function(e, t) {
            return H(this, (function(e, t, n) {
                var o, r, i = {}, a = 0;
                if (Array.isArray(t)) {
                    for (o = Ne(e),
                    r = t.length; a < r; a++)
                        i[t[a]] = w.css(e, t[a], !1, o);
                    return i
                }
                return void 0 !== n ? w.style(e, t, n) : w.css(e, t)
            }
            ), e, t, arguments.length > 1)
        }
    }),
    w.Tween = nt,
    nt.prototype = {
        constructor: nt,
        init: function(e, t, n, o, r, i) {
            this.elem = e,
            this.prop = n,
            this.easing = r || w.easing._default,
            this.options = t,
            this.start = this.now = this.cur(),
            this.end = o,
            this.unit = i || (w.cssNumber[n] ? "" : "px")
        },
        cur: function() {
            var e = nt.propHooks[this.prop];
            return e && e.get ? e.get(this) : nt.propHooks._default.get(this)
        },
        run: function(e) {
            var t, n = nt.propHooks[this.prop];
            return this.options.duration ? this.pos = t = w.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e,
            this.now = (this.end - this.start) * t + this.start,
            this.options.step && this.options.step.call(this.elem, this.now, this),
            n && n.set ? n.set(this) : nt.propHooks._default.set(this),
            this
        }
    },
    nt.prototype.init.prototype = nt.prototype,
    nt.propHooks = {
        _default: {
            get: function(e) {
                var t;
                return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = w.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0
            },
            set: function(e) {
                w.fx.step[e.prop] ? w.fx.step[e.prop](e) : 1 !== e.elem.nodeType || !w.cssHooks[e.prop] && null == e.elem.style[Ye(e.prop)] ? e.elem[e.prop] = e.now : w.style(e.elem, e.prop, e.now + e.unit)
            }
        }
    },
    nt.propHooks.scrollTop = nt.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    },
    w.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2
        },
        _default: "swing"
    },
    w.fx = nt.prototype.init,
    w.fx.step = {};
    var ot, rt, it = /^(?:toggle|show|hide)$/, at = /queueHooks$/;
    function st() {
        rt && (!1 === m.hidden && e.requestAnimationFrame ? e.requestAnimationFrame(st) : e.setTimeout(st, w.fx.interval),
        w.fx.tick())
    }
    function lt() {
        return e.setTimeout((function() {
            ot = void 0
        }
        )),
        ot = Date.now()
    }
    function ct(e, t) {
        var n, o = 0, r = {
            height: e
        };
        for (t = t ? 1 : 0; o < 4; o += 2 - t)
            r["margin" + (n = ne[o])] = r["padding" + n] = e;
        return t && (r.opacity = r.width = e),
        r
    }
    function ut(e, t, n) {
        for (var o, r = (dt.tweeners[t] || []).concat(dt.tweeners["*"]), i = 0, a = r.length; i < a; i++)
            if (o = r[i].call(n, t, e))
                return o
    }
    function dt(e, t, n) {
        var o, r, i = 0, a = dt.prefilters.length, s = w.Deferred().always((function() {
            delete l.elem
        }
        )), l = function() {
            if (r)
                return !1;
            for (var t = ot || lt(), n = Math.max(0, c.startTime + c.duration - t), o = 1 - (n / c.duration || 0), i = 0, a = c.tweens.length; i < a; i++)
                c.tweens[i].run(o);
            return s.notifyWith(e, [c, o, n]),
            o < 1 && a ? n : (a || s.notifyWith(e, [c, 1, 0]),
            s.resolveWith(e, [c]),
            !1)
        }, c = s.promise({
            elem: e,
            props: w.extend({}, t),
            opts: w.extend(!0, {
                specialEasing: {},
                easing: w.easing._default
            }, n),
            originalProperties: t,
            originalOptions: n,
            startTime: ot || lt(),
            duration: n.duration,
            tweens: [],
            createTween: function(t, n) {
                var o = w.Tween(e, c.opts, t, n, c.opts.specialEasing[t] || c.opts.easing);
                return c.tweens.push(o),
                o
            },
            stop: function(t) {
                var n = 0
                  , o = t ? c.tweens.length : 0;
                if (r)
                    return this;
                for (r = !0; n < o; n++)
                    c.tweens[n].run(1);
                return t ? (s.notifyWith(e, [c, 1, 0]),
                s.resolveWith(e, [c, t])) : s.rejectWith(e, [c, t]),
                this
            }
        }), u = c.props;
        for (!function(e, t) {
            var n, o, r, i, a;
            for (n in e)
                if (r = t[o = U(n)],
                i = e[n],
                Array.isArray(i) && (r = i[1],
                i = e[n] = i[0]),
                n !== o && (e[o] = i,
                delete e[n]),
                (a = w.cssHooks[o]) && "expand"in a)
                    for (n in i = a.expand(i),
                    delete e[o],
                    i)
                        n in e || (e[n] = i[n],
                        t[n] = r);
                else
                    t[o] = r
        }(u, c.opts.specialEasing); i < a; i++)
            if (o = dt.prefilters[i].call(c, e, u, c.opts))
                return p(o.stop) && (w._queueHooks(c.elem, c.opts.queue).stop = o.stop.bind(o)),
                o;
        return w.map(u, ut, c),
        p(c.opts.start) && c.opts.start.call(e, c),
        c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always),
        w.fx.timer(w.extend(l, {
            elem: e,
            anim: c,
            queue: c.opts.queue
        })),
        c
    }
    w.Animation = w.extend(dt, {
        tweeners: {
            "*": [function(e, t) {
                var n = this.createTween(e, t);
                return se(n.elem, e, te.exec(t), n),
                n
            }
            ]
        },
        tweener: function(e, t) {
            p(e) ? (t = e,
            e = ["*"]) : e = e.match(O);
            for (var n, o = 0, r = e.length; o < r; o++)
                n = e[o],
                dt.tweeners[n] = dt.tweeners[n] || [],
                dt.tweeners[n].unshift(t)
        },
        prefilters: [function(e, t, n) {
            var o, r, i, a, s, l, c, u, d = "width"in t || "height"in t, h = this, f = {}, p = e.style, g = e.nodeType && ae(e), m = Y.get(e, "fxshow");
            for (o in n.queue || (null == (a = w._queueHooks(e, "fx")).unqueued && (a.unqueued = 0,
            s = a.empty.fire,
            a.empty.fire = function() {
                a.unqueued || s()
            }
            ),
            a.unqueued++,
            h.always((function() {
                h.always((function() {
                    a.unqueued--,
                    w.queue(e, "fx").length || a.empty.fire()
                }
                ))
            }
            ))),
            t)
                if (r = t[o],
                it.test(r)) {
                    if (delete t[o],
                    i = i || "toggle" === r,
                    r === (g ? "hide" : "show")) {
                        if ("show" !== r || !m || void 0 === m[o])
                            continue;
                        g = !0
                    }
                    f[o] = m && m[o] || w.style(e, o)
                }
            if ((l = !w.isEmptyObject(t)) || !w.isEmptyObject(f))
                for (o in d && 1 === e.nodeType && (n.overflow = [p.overflow, p.overflowX, p.overflowY],
                null == (c = m && m.display) && (c = Y.get(e, "display")),
                "none" === (u = w.css(e, "display")) && (c ? u = c : (ue([e], !0),
                c = e.style.display || c,
                u = w.css(e, "display"),
                ue([e]))),
                ("inline" === u || "inline-block" === u && null != c) && "none" === w.css(e, "float") && (l || (h.done((function() {
                    p.display = c
                }
                )),
                null == c && (u = p.display,
                c = "none" === u ? "" : u)),
                p.display = "inline-block")),
                n.overflow && (p.overflow = "hidden",
                h.always((function() {
                    p.overflow = n.overflow[0],
                    p.overflowX = n.overflow[1],
                    p.overflowY = n.overflow[2]
                }
                ))),
                l = !1,
                f)
                    l || (m ? "hidden"in m && (g = m.hidden) : m = Y.access(e, "fxshow", {
                        display: c
                    }),
                    i && (m.hidden = !g),
                    g && ue([e], !0),
                    h.done((function() {
                        for (o in g || ue([e]),
                        Y.remove(e, "fxshow"),
                        f)
                            w.style(e, o, f[o])
                    }
                    ))),
                    l = ut(g ? m[o] : 0, o, h),
                    o in m || (m[o] = l.start,
                    g && (l.end = l.start,
                    l.start = 0))
        }
        ],
        prefilter: function(e, t) {
            t ? dt.prefilters.unshift(e) : dt.prefilters.push(e)
        }
    }),
    w.speed = function(e, t, n) {
        var o = e && "object" == typeof e ? w.extend({}, e) : {
            complete: n || !n && t || p(e) && e,
            duration: e,
            easing: n && t || t && !p(t) && t
        };
        return w.fx.off ? o.duration = 0 : "number" != typeof o.duration && (o.duration in w.fx.speeds ? o.duration = w.fx.speeds[o.duration] : o.duration = w.fx.speeds._default),
        null != o.queue && !0 !== o.queue || (o.queue = "fx"),
        o.old = o.complete,
        o.complete = function() {
            p(o.old) && o.old.call(this),
            o.queue && w.dequeue(this, o.queue)
        }
        ,
        o
    }
    ,
    w.fn.extend({
        fadeTo: function(e, t, n, o) {
            return this.filter(ae).css("opacity", 0).show().end().animate({
                opacity: t
            }, e, n, o)
        },
        animate: function(e, t, n, o) {
            var r = w.isEmptyObject(e)
              , i = w.speed(t, n, o)
              , a = function() {
                var t = dt(this, w.extend({}, e), i);
                (r || Y.get(this, "finish")) && t.stop(!0)
            };
            return a.finish = a,
            r || !1 === i.queue ? this.each(a) : this.queue(i.queue, a)
        },
        stop: function(e, t, n) {
            var o = function(e) {
                var t = e.stop;
                delete e.stop,
                t(n)
            };
            return "string" != typeof e && (n = t,
            t = e,
            e = void 0),
            t && this.queue(e || "fx", []),
            this.each((function() {
                var t = !0
                  , r = null != e && e + "queueHooks"
                  , i = w.timers
                  , a = Y.get(this);
                if (r)
                    a[r] && a[r].stop && o(a[r]);
                else
                    for (r in a)
                        a[r] && a[r].stop && at.test(r) && o(a[r]);
                for (r = i.length; r--; )
                    i[r].elem !== this || null != e && i[r].queue !== e || (i[r].anim.stop(n),
                    t = !1,
                    i.splice(r, 1));
                !t && n || w.dequeue(this, e)
            }
            ))
        },
        finish: function(e) {
            return !1 !== e && (e = e || "fx"),
            this.each((function() {
                var t, n = Y.get(this), o = n[e + "queue"], r = n[e + "queueHooks"], i = w.timers, a = o ? o.length : 0;
                for (n.finish = !0,
                w.queue(this, e, []),
                r && r.stop && r.stop.call(this, !0),
                t = i.length; t--; )
                    i[t].elem === this && i[t].queue === e && (i[t].anim.stop(!0),
                    i.splice(t, 1));
                for (t = 0; t < a; t++)
                    o[t] && o[t].finish && o[t].finish.call(this);
                delete n.finish
            }
            ))
        }
    }),
    w.each(["toggle", "show", "hide"], (function(e, t) {
        var n = w.fn[t];
        w.fn[t] = function(e, o, r) {
            return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(ct(t, !0), e, o, r)
        }
    }
    )),
    w.each({
        slideDown: ct("show"),
        slideUp: ct("hide"),
        slideToggle: ct("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, (function(e, t) {
        w.fn[e] = function(e, n, o) {
            return this.animate(t, e, n, o)
        }
    }
    )),
    w.timers = [],
    w.fx.tick = function() {
        var e, t = 0, n = w.timers;
        for (ot = Date.now(); t < n.length; t++)
            (e = n[t])() || n[t] !== e || n.splice(t--, 1);
        n.length || w.fx.stop(),
        ot = void 0
    }
    ,
    w.fx.timer = function(e) {
        w.timers.push(e),
        w.fx.start()
    }
    ,
    w.fx.interval = 13,
    w.fx.start = function() {
        rt || (rt = !0,
        st())
    }
    ,
    w.fx.stop = function() {
        rt = null
    }
    ,
    w.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    },
    w.fn.delay = function(t, n) {
        return t = w.fx && w.fx.speeds[t] || t,
        n = n || "fx",
        this.queue(n, (function(n, o) {
            var r = e.setTimeout(n, t);
            o.stop = function() {
                e.clearTimeout(r)
            }
        }
        ))
    }
    ,
    function() {
        var e = m.createElement("input")
          , t = m.createElement("select").appendChild(m.createElement("option"));
        e.type = "checkbox",
        f.checkOn = "" !== e.value,
        f.optSelected = t.selected,
        (e = m.createElement("input")).value = "t",
        e.type = "radio",
        f.radioValue = "t" === e.value
    }();
    var ht, ft = w.expr.attrHandle;
    w.fn.extend({
        attr: function(e, t) {
            return H(this, w.attr, e, t, arguments.length > 1)
        },
        removeAttr: function(e) {
            return this.each((function() {
                w.removeAttr(this, e)
            }
            ))
        }
    }),
    w.extend({
        attr: function(e, t, n) {
            var o, r, i = e.nodeType;
            if (3 !== i && 8 !== i && 2 !== i)
                return void 0 === e.getAttribute ? w.prop(e, t, n) : (1 === i && w.isXMLDoc(e) || (r = w.attrHooks[t.toLowerCase()] || (w.expr.match.bool.test(t) ? ht : void 0)),
                void 0 !== n ? null === n ? void w.removeAttr(e, t) : r && "set"in r && void 0 !== (o = r.set(e, n, t)) ? o : (e.setAttribute(t, n + ""),
                n) : r && "get"in r && null !== (o = r.get(e, t)) ? o : null == (o = w.find.attr(e, t)) ? void 0 : o)
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!f.radioValue && "radio" === t && A(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t),
                        n && (e.value = n),
                        t
                    }
                }
            }
        },
        removeAttr: function(e, t) {
            var n, o = 0, r = t && t.match(O);
            if (r && 1 === e.nodeType)
                for (; n = r[o++]; )
                    e.removeAttribute(n)
        }
    }),
    ht = {
        set: function(e, t, n) {
            return !1 === t ? w.removeAttr(e, n) : e.setAttribute(n, n),
            n
        }
    },
    w.each(w.expr.match.bool.source.match(/\w+/g), (function(e, t) {
        var n = ft[t] || w.find.attr;
        ft[t] = function(e, t, o) {
            var r, i, a = t.toLowerCase();
            return o || (i = ft[a],
            ft[a] = r,
            r = null != n(e, t, o) ? a : null,
            ft[a] = i),
            r
        }
    }
    ));
    var pt = /^(?:input|select|textarea|button)$/i
      , gt = /^(?:a|area)$/i;
    function mt(e) {
        return (e.match(O) || []).join(" ")
    }
    function yt(e) {
        return e.getAttribute && e.getAttribute("class") || ""
    }
    function xt(e) {
        return Array.isArray(e) ? e : "string" == typeof e && e.match(O) || []
    }
    w.fn.extend({
        prop: function(e, t) {
            return H(this, w.prop, e, t, arguments.length > 1)
        },
        removeProp: function(e) {
            return this.each((function() {
                delete this[w.propFix[e] || e]
            }
            ))
        }
    }),
    w.extend({
        prop: function(e, t, n) {
            var o, r, i = e.nodeType;
            if (3 !== i && 8 !== i && 2 !== i)
                return 1 === i && w.isXMLDoc(e) || (t = w.propFix[t] || t,
                r = w.propHooks[t]),
                void 0 !== n ? r && "set"in r && void 0 !== (o = r.set(e, n, t)) ? o : e[t] = n : r && "get"in r && null !== (o = r.get(e, t)) ? o : e[t]
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var t = w.find.attr(e, "tabindex");
                    return t ? parseInt(t, 10) : pt.test(e.nodeName) || gt.test(e.nodeName) && e.href ? 0 : -1
                }
            }
        },
        propFix: {
            for: "htmlFor",
            class: "className"
        }
    }),
    f.optSelected || (w.propHooks.selected = {
        get: function(e) {
            var t = e.parentNode;
            return t && t.parentNode && t.parentNode.selectedIndex,
            null
        },
        set: function(e) {
            var t = e.parentNode;
            t && (t.selectedIndex,
            t.parentNode && t.parentNode.selectedIndex)
        }
    }),
    w.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], (function() {
        w.propFix[this.toLowerCase()] = this
    }
    )),
    w.fn.extend({
        addClass: function(e) {
            var t, n, o, r, i, a;
            return p(e) ? this.each((function(t) {
                w(this).addClass(e.call(this, t, yt(this)))
            }
            )) : (t = xt(e)).length ? this.each((function() {
                if (o = yt(this),
                n = 1 === this.nodeType && " " + mt(o) + " ") {
                    for (i = 0; i < t.length; i++)
                        r = t[i],
                        n.indexOf(" " + r + " ") < 0 && (n += r + " ");
                    a = mt(n),
                    o !== a && this.setAttribute("class", a)
                }
            }
            )) : this
        },
        removeClass: function(e) {
            var t, n, o, r, i, a;
            return p(e) ? this.each((function(t) {
                w(this).removeClass(e.call(this, t, yt(this)))
            }
            )) : arguments.length ? (t = xt(e)).length ? this.each((function() {
                if (o = yt(this),
                n = 1 === this.nodeType && " " + mt(o) + " ") {
                    for (i = 0; i < t.length; i++)
                        for (r = t[i]; n.indexOf(" " + r + " ") > -1; )
                            n = n.replace(" " + r + " ", " ");
                    a = mt(n),
                    o !== a && this.setAttribute("class", a)
                }
            }
            )) : this : this.attr("class", "")
        },
        toggleClass: function(e, t) {
            var n, o, r, i, a = typeof e, s = "string" === a || Array.isArray(e);
            return p(e) ? this.each((function(n) {
                w(this).toggleClass(e.call(this, n, yt(this), t), t)
            }
            )) : "boolean" == typeof t && s ? t ? this.addClass(e) : this.removeClass(e) : (n = xt(e),
            this.each((function() {
                if (s)
                    for (i = w(this),
                    r = 0; r < n.length; r++)
                        o = n[r],
                        i.hasClass(o) ? i.removeClass(o) : i.addClass(o);
                else
                    void 0 !== e && "boolean" !== a || ((o = yt(this)) && Y.set(this, "__className__", o),
                    this.setAttribute && this.setAttribute("class", o || !1 === e ? "" : Y.get(this, "__className__") || ""))
            }
            )))
        },
        hasClass: function(e) {
            var t, n, o = 0;
            for (t = " " + e + " "; n = this[o++]; )
                if (1 === n.nodeType && (" " + mt(yt(n)) + " ").indexOf(t) > -1)
                    return !0;
            return !1
        }
    });
    var vt = /\r/g;
    w.fn.extend({
        val: function(e) {
            var t, n, o, r = this[0];
            return arguments.length ? (o = p(e),
            this.each((function(n) {
                var r;
                1 === this.nodeType && (null == (r = o ? e.call(this, n, w(this).val()) : e) ? r = "" : "number" == typeof r ? r += "" : Array.isArray(r) && (r = w.map(r, (function(e) {
                    return null == e ? "" : e + ""
                }
                ))),
                (t = w.valHooks[this.type] || w.valHooks[this.nodeName.toLowerCase()]) && "set"in t && void 0 !== t.set(this, r, "value") || (this.value = r))
            }
            ))) : r ? (t = w.valHooks[r.type] || w.valHooks[r.nodeName.toLowerCase()]) && "get"in t && void 0 !== (n = t.get(r, "value")) ? n : "string" == typeof (n = r.value) ? n.replace(vt, "") : null == n ? "" : n : void 0
        }
    }),
    w.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = w.find.attr(e, "value");
                    return null != t ? t : mt(w.text(e))
                }
            },
            select: {
                get: function(e) {
                    var t, n, o, r = e.options, i = e.selectedIndex, a = "select-one" === e.type, s = a ? null : [], l = a ? i + 1 : r.length;
                    for (o = i < 0 ? l : a ? i : 0; o < l; o++)
                        if (((n = r[o]).selected || o === i) && !n.disabled && (!n.parentNode.disabled || !A(n.parentNode, "optgroup"))) {
                            if (t = w(n).val(),
                            a)
                                return t;
                            s.push(t)
                        }
                    return s
                },
                set: function(e, t) {
                    for (var n, o, r = e.options, i = w.makeArray(t), a = r.length; a--; )
                        ((o = r[a]).selected = w.inArray(w.valHooks.option.get(o), i) > -1) && (n = !0);
                    return n || (e.selectedIndex = -1),
                    i
                }
            }
        }
    }),
    w.each(["radio", "checkbox"], (function() {
        w.valHooks[this] = {
            set: function(e, t) {
                if (Array.isArray(t))
                    return e.checked = w.inArray(w(e).val(), t) > -1
            }
        },
        f.checkOn || (w.valHooks[this].get = function(e) {
            return null === e.getAttribute("value") ? "on" : e.value
        }
        )
    }
    )),
    f.focusin = "onfocusin"in e;
    var bt = /^(?:focusinfocus|focusoutblur)$/
      , wt = function(e) {
        e.stopPropagation()
    };
    w.extend(w.event, {
        trigger: function(t, n, o, r) {
            var i, a, s, l, c, d, h, f, y = [o || m], x = u.call(t, "type") ? t.type : t, v = u.call(t, "namespace") ? t.namespace.split(".") : [];
            if (a = f = s = o = o || m,
            3 !== o.nodeType && 8 !== o.nodeType && !bt.test(x + w.event.triggered) && (x.indexOf(".") > -1 && (v = x.split("."),
            x = v.shift(),
            v.sort()),
            c = x.indexOf(":") < 0 && "on" + x,
            (t = t[w.expando] ? t : new w.Event(x,"object" == typeof t && t)).isTrigger = r ? 2 : 3,
            t.namespace = v.join("."),
            t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + v.join("\\.(?:.*\\.|)") + "(\\.|$)") : null,
            t.result = void 0,
            t.target || (t.target = o),
            n = null == n ? [t] : w.makeArray(n, [t]),
            h = w.event.special[x] || {},
            r || !h.trigger || !1 !== h.trigger.apply(o, n))) {
                if (!r && !h.noBubble && !g(o)) {
                    for (l = h.delegateType || x,
                    bt.test(l + x) || (a = a.parentNode); a; a = a.parentNode)
                        y.push(a),
                        s = a;
                    s === (o.ownerDocument || m) && y.push(s.defaultView || s.parentWindow || e)
                }
                for (i = 0; (a = y[i++]) && !t.isPropagationStopped(); )
                    f = a,
                    t.type = i > 1 ? l : h.bindType || x,
                    (d = (Y.get(a, "events") || Object.create(null))[t.type] && Y.get(a, "handle")) && d.apply(a, n),
                    (d = c && a[c]) && d.apply && V(a) && (t.result = d.apply(a, n),
                    !1 === t.result && t.preventDefault());
                return t.type = x,
                r || t.isDefaultPrevented() || h._default && !1 !== h._default.apply(y.pop(), n) || !V(o) || c && p(o[x]) && !g(o) && ((s = o[c]) && (o[c] = null),
                w.event.triggered = x,
                t.isPropagationStopped() && f.addEventListener(x, wt),
                o[x](),
                t.isPropagationStopped() && f.removeEventListener(x, wt),
                w.event.triggered = void 0,
                s && (o[c] = s)),
                t.result
            }
        },
        simulate: function(e, t, n) {
            var o = w.extend(new w.Event, n, {
                type: e,
                isSimulated: !0
            });
            w.event.trigger(o, null, t)
        }
    }),
    w.fn.extend({
        trigger: function(e, t) {
            return this.each((function() {
                w.event.trigger(e, t, this)
            }
            ))
        },
        triggerHandler: function(e, t) {
            var n = this[0];
            if (n)
                return w.event.trigger(e, t, n, !0)
        }
    }),
    f.focusin || w.each({
        focus: "focusin",
        blur: "focusout"
    }, (function(e, t) {
        var n = function(e) {
            w.event.simulate(t, e.target, w.event.fix(e))
        };
        w.event.special[t] = {
            setup: function() {
                var o = this.ownerDocument || this.document || this
                  , r = Y.access(o, t);
                r || o.addEventListener(e, n, !0),
                Y.access(o, t, (r || 0) + 1)
            },
            teardown: function() {
                var o = this.ownerDocument || this.document || this
                  , r = Y.access(o, t) - 1;
                r ? Y.access(o, t, r) : (o.removeEventListener(e, n, !0),
                Y.remove(o, t))
            }
        }
    }
    ));
    var Ct = e.location
      , St = {
        guid: Date.now()
    }
      , _t = /\?/;
    w.parseXML = function(t) {
        var n, o;
        if (!t || "string" != typeof t)
            return null;
        try {
            n = (new e.DOMParser).parseFromString(t, "text/xml")
        } catch (e) {}
        return o = n && n.getElementsByTagName("parsererror")[0],
        n && !o || w.error("Invalid XML: " + (o ? w.map(o.childNodes, (function(e) {
            return e.textContent
        }
        )).join("\n") : t)),
        n
    }
    ;
    var Tt = /\[\]$/
      , kt = /\r?\n/g
      , At = /^(?:submit|button|image|reset|file)$/i
      , Pt = /^(?:input|select|textarea|keygen)/i;
    function Mt(e, t, n, o) {
        var r;
        if (Array.isArray(t))
            w.each(t, (function(t, r) {
                n || Tt.test(e) ? o(e, r) : Mt(e + "[" + ("object" == typeof r && null != r ? t : "") + "]", r, n, o)
            }
            ));
        else if (n || "object" !== v(t))
            o(e, t);
        else
            for (r in t)
                Mt(e + "[" + r + "]", t[r], n, o)
    }
    w.param = function(e, t) {
        var n, o = [], r = function(e, t) {
            var n = p(t) ? t() : t;
            o[o.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n)
        };
        if (null == e)
            return "";
        if (Array.isArray(e) || e.jquery && !w.isPlainObject(e))
            w.each(e, (function() {
                r(this.name, this.value)
            }
            ));
        else
            for (n in e)
                Mt(n, e[n], t, r);
        return o.join("&")
    }
    ,
    w.fn.extend({
        serialize: function() {
            return w.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map((function() {
                var e = w.prop(this, "elements");
                return e ? w.makeArray(e) : this
            }
            )).filter((function() {
                var e = this.type;
                return this.name && !w(this).is(":disabled") && Pt.test(this.nodeName) && !At.test(e) && (this.checked || !fe.test(e))
            }
            )).map((function(e, t) {
                var n = w(this).val();
                return null == n ? null : Array.isArray(n) ? w.map(n, (function(e) {
                    return {
                        name: t.name,
                        value: e.replace(kt, "\r\n")
                    }
                }
                )) : {
                    name: t.name,
                    value: n.replace(kt, "\r\n")
                }
            }
            )).get()
        }
    });
    var Et = /%20/g
      , Lt = /#.*$/
      , Dt = /([?&])_=[^&]*/
      , qt = /^(.*?):[ \t]*([^\r\n]*)$/gm
      , Ft = /^(?:GET|HEAD)$/
      , Ot = /^\/\//
      , jt = {}
      , It = {}
      , Rt = "*/".concat("*")
      , Nt = m.createElement("a");
    function $t(e) {
        return function(t, n) {
            "string" != typeof t && (n = t,
            t = "*");
            var o, r = 0, i = t.toLowerCase().match(O) || [];
            if (p(n))
                for (; o = i[r++]; )
                    "+" === o[0] ? (o = o.slice(1) || "*",
                    (e[o] = e[o] || []).unshift(n)) : (e[o] = e[o] || []).push(n)
        }
    }
    function Bt(e, t, n, o) {
        var r = {}
          , i = e === It;
        function a(s) {
            var l;
            return r[s] = !0,
            w.each(e[s] || [], (function(e, s) {
                var c = s(t, n, o);
                return "string" != typeof c || i || r[c] ? i ? !(l = c) : void 0 : (t.dataTypes.unshift(c),
                a(c),
                !1)
            }
            )),
            l
        }
        return a(t.dataTypes[0]) || !r["*"] && a("*")
    }
    function Ht(e, t) {
        var n, o, r = w.ajaxSettings.flatOptions || {};
        for (n in t)
            void 0 !== t[n] && ((r[n] ? e : o || (o = {}))[n] = t[n]);
        return o && w.extend(!0, e, o),
        e
    }
    Nt.href = Ct.href,
    w.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Ct.href,
            type: "GET",
            isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(Ct.protocol),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Rt,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": JSON.parse,
                "text xml": w.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, t) {
            return t ? Ht(Ht(e, w.ajaxSettings), t) : Ht(w.ajaxSettings, e)
        },
        ajaxPrefilter: $t(jt),
        ajaxTransport: $t(It),
        ajax: function(t, n) {
            "object" == typeof t && (n = t,
            t = void 0),
            n = n || {};
            var o, r, i, a, s, l, c, u, d, h, f = w.ajaxSetup({}, n), p = f.context || f, g = f.context && (p.nodeType || p.jquery) ? w(p) : w.event, y = w.Deferred(), x = w.Callbacks("once memory"), v = f.statusCode || {}, b = {}, C = {}, S = "canceled", _ = {
                readyState: 0,
                getResponseHeader: function(e) {
                    var t;
                    if (c) {
                        if (!a)
                            for (a = {}; t = qt.exec(i); )
                                a[t[1].toLowerCase() + " "] = (a[t[1].toLowerCase() + " "] || []).concat(t[2]);
                        t = a[e.toLowerCase() + " "]
                    }
                    return null == t ? null : t.join(", ")
                },
                getAllResponseHeaders: function() {
                    return c ? i : null
                },
                setRequestHeader: function(e, t) {
                    return null == c && (e = C[e.toLowerCase()] = C[e.toLowerCase()] || e,
                    b[e] = t),
                    this
                },
                overrideMimeType: function(e) {
                    return null == c && (f.mimeType = e),
                    this
                },
                statusCode: function(e) {
                    var t;
                    if (e)
                        if (c)
                            _.always(e[_.status]);
                        else
                            for (t in e)
                                v[t] = [v[t], e[t]];
                    return this
                },
                abort: function(e) {
                    var t = e || S;
                    return o && o.abort(t),
                    T(0, t),
                    this
                }
            };
            if (y.promise(_),
            f.url = ((t || f.url || Ct.href) + "").replace(Ot, Ct.protocol + "//"),
            f.type = n.method || n.type || f.method || f.type,
            f.dataTypes = (f.dataType || "*").toLowerCase().match(O) || [""],
            null == f.crossDomain) {
                l = m.createElement("a");
                try {
                    l.href = f.url,
                    l.href = l.href,
                    f.crossDomain = Nt.protocol + "//" + Nt.host != l.protocol + "//" + l.host
                } catch (e) {
                    f.crossDomain = !0
                }
            }
            if (f.data && f.processData && "string" != typeof f.data && (f.data = w.param(f.data, f.traditional)),
            Bt(jt, f, n, _),
            c)
                return _;
            for (d in (u = w.event && f.global) && 0 == w.active++ && w.event.trigger("ajaxStart"),
            f.type = f.type.toUpperCase(),
            f.hasContent = !Ft.test(f.type),
            r = f.url.replace(Lt, ""),
            f.hasContent ? f.data && f.processData && 0 === (f.contentType || "").indexOf("application/x-www-form-urlencoded") && (f.data = f.data.replace(Et, "+")) : (h = f.url.slice(r.length),
            f.data && (f.processData || "string" == typeof f.data) && (r += (_t.test(r) ? "&" : "?") + f.data,
            delete f.data),
            !1 === f.cache && (r = r.replace(Dt, "$1"),
            h = (_t.test(r) ? "&" : "?") + "_=" + St.guid++ + h),
            f.url = r + h),
            f.ifModified && (w.lastModified[r] && _.setRequestHeader("If-Modified-Since", w.lastModified[r]),
            w.etag[r] && _.setRequestHeader("If-None-Match", w.etag[r])),
            (f.data && f.hasContent && !1 !== f.contentType || n.contentType) && _.setRequestHeader("Content-Type", f.contentType),
            _.setRequestHeader("Accept", f.dataTypes[0] && f.accepts[f.dataTypes[0]] ? f.accepts[f.dataTypes[0]] + ("*" !== f.dataTypes[0] ? ", " + Rt + "; q=0.01" : "") : f.accepts["*"]),
            f.headers)
                _.setRequestHeader(d, f.headers[d]);
            if (f.beforeSend && (!1 === f.beforeSend.call(p, _, f) || c))
                return _.abort();
            if (S = "abort",
            x.add(f.complete),
            _.done(f.success),
            _.fail(f.error),
            o = Bt(It, f, n, _)) {
                if (_.readyState = 1,
                u && g.trigger("ajaxSend", [_, f]),
                c)
                    return _;
                f.async && f.timeout > 0 && (s = e.setTimeout((function() {
                    _.abort("timeout")
                }
                ), f.timeout));
                try {
                    c = !1,
                    o.send(b, T)
                } catch (e) {
                    if (c)
                        throw e;
                    T(-1, e)
                }
            } else
                T(-1, "No Transport");
            function T(t, n, a, l) {
                var d, h, m, b, C, S = n;
                c || (c = !0,
                s && e.clearTimeout(s),
                o = void 0,
                i = l || "",
                _.readyState = t > 0 ? 4 : 0,
                d = t >= 200 && t < 300 || 304 === t,
                a && (b = function(e, t, n) {
                    for (var o, r, i, a, s = e.contents, l = e.dataTypes; "*" === l[0]; )
                        l.shift(),
                        void 0 === o && (o = e.mimeType || t.getResponseHeader("Content-Type"));
                    if (o)
                        for (r in s)
                            if (s[r] && s[r].test(o)) {
                                l.unshift(r);
                                break
                            }
                    if (l[0]in n)
                        i = l[0];
                    else {
                        for (r in n) {
                            if (!l[0] || e.converters[r + " " + l[0]]) {
                                i = r;
                                break
                            }
                            a || (a = r)
                        }
                        i = i || a
                    }
                    if (i)
                        return i !== l[0] && l.unshift(i),
                        n[i]
                }(f, _, a)),
                !d && w.inArray("script", f.dataTypes) > -1 && w.inArray("json", f.dataTypes) < 0 && (f.converters["text script"] = function() {}
                ),
                b = function(e, t, n, o) {
                    var r, i, a, s, l, c = {}, u = e.dataTypes.slice();
                    if (u[1])
                        for (a in e.converters)
                            c[a.toLowerCase()] = e.converters[a];
                    for (i = u.shift(); i; )
                        if (e.responseFields[i] && (n[e.responseFields[i]] = t),
                        !l && o && e.dataFilter && (t = e.dataFilter(t, e.dataType)),
                        l = i,
                        i = u.shift())
                            if ("*" === i)
                                i = l;
                            else if ("*" !== l && l !== i) {
                                if (!(a = c[l + " " + i] || c["* " + i]))
                                    for (r in c)
                                        if ((s = r.split(" "))[1] === i && (a = c[l + " " + s[0]] || c["* " + s[0]])) {
                                            !0 === a ? a = c[r] : !0 !== c[r] && (i = s[0],
                                            u.unshift(s[1]));
                                            break
                                        }
                                if (!0 !== a)
                                    if (a && e.throws)
                                        t = a(t);
                                    else
                                        try {
                                            t = a(t)
                                        } catch (e) {
                                            return {
                                                state: "parsererror",
                                                error: a ? e : "No conversion from " + l + " to " + i
                                            }
                                        }
                            }
                    return {
                        state: "success",
                        data: t
                    }
                }(f, b, _, d),
                d ? (f.ifModified && ((C = _.getResponseHeader("Last-Modified")) && (w.lastModified[r] = C),
                (C = _.getResponseHeader("etag")) && (w.etag[r] = C)),
                204 === t || "HEAD" === f.type ? S = "nocontent" : 304 === t ? S = "notmodified" : (S = b.state,
                h = b.data,
                d = !(m = b.error))) : (m = S,
                !t && S || (S = "error",
                t < 0 && (t = 0))),
                _.status = t,
                _.statusText = (n || S) + "",
                d ? y.resolveWith(p, [h, S, _]) : y.rejectWith(p, [_, S, m]),
                _.statusCode(v),
                v = void 0,
                u && g.trigger(d ? "ajaxSuccess" : "ajaxError", [_, f, d ? h : m]),
                x.fireWith(p, [_, S]),
                u && (g.trigger("ajaxComplete", [_, f]),
                --w.active || w.event.trigger("ajaxStop")))
            }
            return _
        },
        getJSON: function(e, t, n) {
            return w.get(e, t, n, "json")
        },
        getScript: function(e, t) {
            return w.get(e, void 0, t, "script")
        }
    }),
    w.each(["get", "post"], (function(e, t) {
        w[t] = function(e, n, o, r) {
            return p(n) && (r = r || o,
            o = n,
            n = void 0),
            w.ajax(w.extend({
                url: e,
                type: t,
                dataType: r,
                data: n,
                success: o
            }, w.isPlainObject(e) && e))
        }
    }
    )),
    w.ajaxPrefilter((function(e) {
        var t;
        for (t in e.headers)
            "content-type" === t.toLowerCase() && (e.contentType = e.headers[t] || "")
    }
    )),
    w._evalUrl = function(e, t, n) {
        return w.ajax({
            url: e,
            type: "GET",
            dataType: "script",
            cache: !0,
            async: !1,
            global: !1,
            converters: {
                "text script": function() {}
            },
            dataFilter: function(e) {
                w.globalEval(e, t, n)
            }
        })
    }
    ,
    w.fn.extend({
        wrapAll: function(e) {
            var t;
            return this[0] && (p(e) && (e = e.call(this[0])),
            t = w(e, this[0].ownerDocument).eq(0).clone(!0),
            this[0].parentNode && t.insertBefore(this[0]),
            t.map((function() {
                for (var e = this; e.firstElementChild; )
                    e = e.firstElementChild;
                return e
            }
            )).append(this)),
            this
        },
        wrapInner: function(e) {
            return p(e) ? this.each((function(t) {
                w(this).wrapInner(e.call(this, t))
            }
            )) : this.each((function() {
                var t = w(this)
                  , n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            }
            ))
        },
        wrap: function(e) {
            var t = p(e);
            return this.each((function(n) {
                w(this).wrapAll(t ? e.call(this, n) : e)
            }
            ))
        },
        unwrap: function(e) {
            return this.parent(e).not("body").each((function() {
                w(this).replaceWith(this.childNodes)
            }
            )),
            this
        }
    }),
    w.expr.pseudos.hidden = function(e) {
        return !w.expr.pseudos.visible(e)
    }
    ,
    w.expr.pseudos.visible = function(e) {
        return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
    }
    ,
    w.ajaxSettings.xhr = function() {
        try {
            return new e.XMLHttpRequest
        } catch (e) {}
    }
    ;
    var Wt = {
        0: 200,
        1223: 204
    }
      , zt = w.ajaxSettings.xhr();
    f.cors = !!zt && "withCredentials"in zt,
    f.ajax = zt = !!zt,
    w.ajaxTransport((function(t) {
        var n, o;
        if (f.cors || zt && !t.crossDomain)
            return {
                send: function(r, i) {
                    var a, s = t.xhr();
                    if (s.open(t.type, t.url, t.async, t.username, t.password),
                    t.xhrFields)
                        for (a in t.xhrFields)
                            s[a] = t.xhrFields[a];
                    for (a in t.mimeType && s.overrideMimeType && s.overrideMimeType(t.mimeType),
                    t.crossDomain || r["X-Requested-With"] || (r["X-Requested-With"] = "XMLHttpRequest"),
                    r)
                        s.setRequestHeader(a, r[a]);
                    n = function(e) {
                        return function() {
                            n && (n = o = s.onload = s.onerror = s.onabort = s.ontimeout = s.onreadystatechange = null,
                            "abort" === e ? s.abort() : "error" === e ? "number" != typeof s.status ? i(0, "error") : i(s.status, s.statusText) : i(Wt[s.status] || s.status, s.statusText, "text" !== (s.responseType || "text") || "string" != typeof s.responseText ? {
                                binary: s.response
                            } : {
                                text: s.responseText
                            }, s.getAllResponseHeaders()))
                        }
                    }
                    ,
                    s.onload = n(),
                    o = s.onerror = s.ontimeout = n("error"),
                    void 0 !== s.onabort ? s.onabort = o : s.onreadystatechange = function() {
                        4 === s.readyState && e.setTimeout((function() {
                            n && o()
                        }
                        ))
                    }
                    ,
                    n = n("abort");
                    try {
                        s.send(t.hasContent && t.data || null)
                    } catch (e) {
                        if (n)
                            throw e
                    }
                },
                abort: function() {
                    n && n()
                }
            }
    }
    )),
    w.ajaxPrefilter((function(e) {
        e.crossDomain && (e.contents.script = !1)
    }
    )),
    w.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function(e) {
                return w.globalEval(e),
                e
            }
        }
    }),
    w.ajaxPrefilter("script", (function(e) {
        void 0 === e.cache && (e.cache = !1),
        e.crossDomain && (e.type = "GET")
    }
    )),
    w.ajaxTransport("script", (function(e) {
        var t, n;
        if (e.crossDomain || e.scriptAttrs)
            return {
                send: function(o, r) {
                    t = w("<script>").attr(e.scriptAttrs || {}).prop({
                        charset: e.scriptCharset,
                        src: e.url
                    }).on("load error", n = function(e) {
                        t.remove(),
                        n = null,
                        e && r("error" === e.type ? 404 : 200, e.type)
                    }
                    ),
                    m.head.appendChild(t[0])
                },
                abort: function() {
                    n && n()
                }
            }
    }
    ));
    var Gt, Ut = [], Vt = /(=)\?(?=&|$)|\?\?/;
    w.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = Ut.pop() || w.expando + "_" + St.guid++;
            return this[e] = !0,
            e
        }
    }),
    w.ajaxPrefilter("json jsonp", (function(t, n, o) {
        var r, i, a, s = !1 !== t.jsonp && (Vt.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && Vt.test(t.data) && "data");
        if (s || "jsonp" === t.dataTypes[0])
            return r = t.jsonpCallback = p(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback,
            s ? t[s] = t[s].replace(Vt, "$1" + r) : !1 !== t.jsonp && (t.url += (_t.test(t.url) ? "&" : "?") + t.jsonp + "=" + r),
            t.converters["script json"] = function() {
                return a || w.error(r + " was not called"),
                a[0]
            }
            ,
            t.dataTypes[0] = "json",
            i = e[r],
            e[r] = function() {
                a = arguments
            }
            ,
            o.always((function() {
                void 0 === i ? w(e).removeProp(r) : e[r] = i,
                t[r] && (t.jsonpCallback = n.jsonpCallback,
                Ut.push(r)),
                a && p(i) && i(a[0]),
                a = i = void 0
            }
            )),
            "script"
    }
    )),
    f.createHTMLDocument = ((Gt = m.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>",
    2 === Gt.childNodes.length),
    w.parseHTML = function(e, t, n) {
        return "string" != typeof e ? [] : ("boolean" == typeof t && (n = t,
        t = !1),
        t || (f.createHTMLDocument ? ((o = (t = m.implementation.createHTMLDocument("")).createElement("base")).href = m.location.href,
        t.head.appendChild(o)) : t = m),
        i = !n && [],
        (r = P.exec(e)) ? [t.createElement(r[1])] : (r = be([e], t, i),
        i && i.length && w(i).remove(),
        w.merge([], r.childNodes)));
        var o, r, i
    }
    ,
    w.fn.load = function(e, t, n) {
        var o, r, i, a = this, s = e.indexOf(" ");
        return s > -1 && (o = mt(e.slice(s)),
        e = e.slice(0, s)),
        p(t) ? (n = t,
        t = void 0) : t && "object" == typeof t && (r = "POST"),
        a.length > 0 && w.ajax({
            url: e,
            type: r || "GET",
            dataType: "html",
            data: t
        }).done((function(e) {
            i = arguments,
            a.html(o ? w("<div>").append(w.parseHTML(e)).find(o) : e)
        }
        )).always(n && function(e, t) {
            a.each((function() {
                n.apply(this, i || [e.responseText, t, e])
            }
            ))
        }
        ),
        this
    }
    ,
    w.expr.pseudos.animated = function(e) {
        return w.grep(w.timers, (function(t) {
            return e === t.elem
        }
        )).length
    }
    ,
    w.offset = {
        setOffset: function(e, t, n) {
            var o, r, i, a, s, l, c = w.css(e, "position"), u = w(e), d = {};
            "static" === c && (e.style.position = "relative"),
            s = u.offset(),
            i = w.css(e, "top"),
            l = w.css(e, "left"),
            ("absolute" === c || "fixed" === c) && (i + l).indexOf("auto") > -1 ? (a = (o = u.position()).top,
            r = o.left) : (a = parseFloat(i) || 0,
            r = parseFloat(l) || 0),
            p(t) && (t = t.call(e, n, w.extend({}, s))),
            null != t.top && (d.top = t.top - s.top + a),
            null != t.left && (d.left = t.left - s.left + r),
            "using"in t ? t.using.call(e, d) : u.css(d)
        }
    },
    w.fn.extend({
        offset: function(e) {
            if (arguments.length)
                return void 0 === e ? this : this.each((function(t) {
                    w.offset.setOffset(this, e, t)
                }
                ));
            var t, n, o = this[0];
            return o ? o.getClientRects().length ? (t = o.getBoundingClientRect(),
            n = o.ownerDocument.defaultView,
            {
                top: t.top + n.pageYOffset,
                left: t.left + n.pageXOffset
            }) : {
                top: 0,
                left: 0
            } : void 0
        },
        position: function() {
            if (this[0]) {
                var e, t, n, o = this[0], r = {
                    top: 0,
                    left: 0
                };
                if ("fixed" === w.css(o, "position"))
                    t = o.getBoundingClientRect();
                else {
                    for (t = this.offset(),
                    n = o.ownerDocument,
                    e = o.offsetParent || n.documentElement; e && (e === n.body || e === n.documentElement) && "static" === w.css(e, "position"); )
                        e = e.parentNode;
                    e && e !== o && 1 === e.nodeType && ((r = w(e).offset()).top += w.css(e, "borderTopWidth", !0),
                    r.left += w.css(e, "borderLeftWidth", !0))
                }
                return {
                    top: t.top - r.top - w.css(o, "marginTop", !0),
                    left: t.left - r.left - w.css(o, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map((function() {
                for (var e = this.offsetParent; e && "static" === w.css(e, "position"); )
                    e = e.offsetParent;
                return e || oe
            }
            ))
        }
    }),
    w.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, (function(e, t) {
        var n = "pageYOffset" === t;
        w.fn[e] = function(o) {
            return H(this, (function(e, o, r) {
                var i;
                if (g(e) ? i = e : 9 === e.nodeType && (i = e.defaultView),
                void 0 === r)
                    return i ? i[t] : e[o];
                i ? i.scrollTo(n ? i.pageXOffset : r, n ? r : i.pageYOffset) : e[o] = r
            }
            ), e, o, arguments.length)
        }
    }
    )),
    w.each(["top", "left"], (function(e, t) {
        w.cssHooks[t] = Ge(f.pixelPosition, (function(e, n) {
            if (n)
                return n = ze(e, t),
                Ie.test(n) ? w(e).position()[t] + "px" : n
        }
        ))
    }
    )),
    w.each({
        Height: "height",
        Width: "width"
    }, (function(e, t) {
        w.each({
            padding: "inner" + e,
            content: t,
            "": "outer" + e
        }, (function(n, o) {
            w.fn[o] = function(r, i) {
                var a = arguments.length && (n || "boolean" != typeof r)
                  , s = n || (!0 === r || !0 === i ? "margin" : "border");
                return H(this, (function(t, n, r) {
                    var i;
                    return g(t) ? 0 === o.indexOf("outer") ? t["inner" + e] : t.document.documentElement["client" + e] : 9 === t.nodeType ? (i = t.documentElement,
                    Math.max(t.body["scroll" + e], i["scroll" + e], t.body["offset" + e], i["offset" + e], i["client" + e])) : void 0 === r ? w.css(t, n, s) : w.style(t, n, r, s)
                }
                ), t, a ? r : void 0, a)
            }
        }
        ))
    }
    )),
    w.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], (function(e, t) {
        w.fn[t] = function(e) {
            return this.on(t, e)
        }
    }
    )),
    w.fn.extend({
        bind: function(e, t, n) {
            return this.on(e, null, t, n)
        },
        unbind: function(e, t) {
            return this.off(e, null, t)
        },
        delegate: function(e, t, n, o) {
            return this.on(t, e, n, o)
        },
        undelegate: function(e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        },
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }
    }),
    w.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), (function(e, t) {
        w.fn[t] = function(e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }
    }
    ));
    var Xt = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;
    w.proxy = function(e, t) {
        var n, o, i;
        if ("string" == typeof t && (n = e[t],
        t = e,
        e = n),
        p(e))
            return o = r.call(arguments, 2),
            i = function() {
                return e.apply(t || this, o.concat(r.call(arguments)))
            }
            ,
            i.guid = e.guid = e.guid || w.guid++,
            i
    }
    ,
    w.holdReady = function(e) {
        e ? w.readyWait++ : w.ready(!0)
    }
    ,
    w.isArray = Array.isArray,
    w.parseJSON = JSON.parse,
    w.nodeName = A,
    w.isFunction = p,
    w.isWindow = g,
    w.camelCase = U,
    w.type = v,
    w.now = Date.now,
    w.isNumeric = function(e) {
        var t = w.type(e);
        return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e))
    }
    ,
    w.trim = function(e) {
        return null == e ? "" : (e + "").replace(Xt, "$1")
    }
    ,
    "function" == typeof define && define.amd && define("jquery", [], (function() {
        return w
    }
    ));
    var Yt = e.jQuery
      , Qt = e.$;
    return w.noConflict = function(t) {
        return e.$ === w && (e.$ = Qt),
        t && e.jQuery === w && (e.jQuery = Yt),
        w
    }
    ,
    void 0 === t && (e.jQuery = e.$ = w),
    w
}
)),
define("globals", [], (function() {
    return {}
}
)),
/*! Toxilib http_loader
 * Copyright 2014 Toxicode, pierre.lancien @ toxicode.fr
*/
define("toxilibs/http_loader", ["jquery"], (function(e) {
    let t = {
        jpg: "image",
        png: "image",
        gif: "image",
        bmp: "image",
        html: "xhr",
        txt: "xhr",
        css: "xhr",
        glsl: "xhr",
        json: "json",
        mp3: "audio"
    };
    let n = {};
    function o(e, o, r) {
        let i = function(e) {
            let n = function(e) {
                return e.split("?").shift().split(".").pop().toLowerCase()
            }(e)
              , o = t[n] || null;
            if (!o)
                throw new Error(`No loader type found for ${n}`);
            return o
        }(e)
          , a = function(e) {
            let t = n[e] || null;
            if (!t)
                throw new Error(`No loader found for ${e}`);
            return t
        }(i);
        a(e, o, r || function(e) {
            let t = new Error(`Could not load ${e}`);
            return function() {
                throw t
            }
        }(e))
    }
    return n.image = function(e, t, n) {
        let o = new Image;
        o.crossOrigin = "Anonymous",
        o.addEventListener("load", (function(...e) {
            t(o, ...e)
        }
        )),
        o.addEventListener("error", n),
        o.src = e
    }
    ,
    n.xhr = function(t, n, o) {
        e.get(t, n).fail(o)
    }
    ,
    n.json = function(e, t, o) {
        n.xhr(e, (function(...e) {
            "string" == typeof e[0] && (e[0] = JSON.parse(e[0])),
            t(...e)
        }
        ), o)
    }
    ,
    Object.assign(o, n),
    o
}
)),
/*! Toxilib asset_batch
 * Copyright 2014 Toxicode, pierre.lancien @ toxicode.fr
*/
define("toxilibs/asset_batch", ["./http_loader"], (function(e) {
    let t = 3
      , n = {};
    function o(e) {
        this.loaded = !1,
        this.url = e,
        n[e] = this
    }
    function r(e) {
        this.assets = [],
        this.names = [],
        this.loadingQueue = {},
        e = e || {},
        this.withNames = e.withNames,
        this.parallelizePer = e.parallelizePer || t,
        this.onProgress = e.onProgress || function() {}
        ,
        this.onComplete = e.onComplete || function() {}
        ,
        this.onError = e.onError
    }
    function i(t, n) {
        let o = t.loadingQueue[n];
        return !o.loading && (o.loading = !0,
        e(n, function(e, t) {
            return function(n) {
                delete t.loadingQueue[e.url],
                e.loaded = !0,
                e.loading = !1,
                e.body = n,
                t.onProgress(n, t.progress()),
                t.loadNext()
            }
        }(o, t), t.onError || function(e, t) {
            return function() {
                throw e.loadError.message = `Could not load ${t}`,
                e.loadError
            }
        }(t, n)),
        !0)
    }
    return o.find = function(e) {
        return n[e] || null
    }
    ,
    o.findOrCreate = function(e) {
        return o.find(e) || new o(e)
    }
    ,
    r.prototype.add = function(e, t) {
        this.assets.push(e),
        this.withNames && this.names.push(t),
        e.loaded || (this.loadingQueue[e.url] = e)
    }
    ,
    r.prototype.loadAll = function() {
        this.loadError = new Error("");
        for (let e = 0; e < this.parallelizePer; e++)
            this.loadNext()
    }
    ,
    r.prototype.loadNext = function() {
        for (let e in this.loadingQueue)
            if (i(this, e))
                return;
        var e;
        this.loadingQueueCount() || this.completed || (this.completed = !0,
        this.withNames ? this.onComplete(function(e, t) {
            let n = {};
            return e.forEach(((e,o)=>{
                n[t[o]] = e.body
            }
            )),
            n
        }(this.assets, this.names)) : this.onComplete(...(e = this.assets,
        e.map((function(e) {
            return e.body
        }
        )))))
    }
    ,
    r.prototype.loadingQueueCount = function() {
        let e = 0;
        for (let t in this.loadingQueue)
            this.loadingQueue.hasOwnProperty(t) && e++;
        return e
    }
    ,
    r.prototype.progress = function() {
        let e = this.assets.length;
        return (e - this.loadingQueueCount()) / e
    }
    ,
    r.load = function(e, t) {
        "[object Array]" === Object.prototype.toString.call(e) ? function(e, t) {
            let n = new r(t);
            e.forEach((function(e) {
                n.add(o.findOrCreate(e))
            }
            )),
            n.loadAll()
        }(e, t) : function(e, t) {
            t.withNames = !0;
            let n = new r(t);
            for (let t in e)
                n.add(o.findOrCreate(e[t]), t);
            n.loadAll()
        }(e, t)
    }
    ,
    r
}
)),
/*! Toxilib toxicode_welcome
 * Copyright 2014 Toxicode, pierre.lancien @ toxicode.fr
*/
define("toxilibs/toxicode_welcome", ["jquery", "./asset_batch", "./url_params"], (function(e, t, n) {
    const o = n()
      , r = .9
      , i = 500
      , a = "#welcome img";
    let s, l = {}, c = 0, u = 0, d = ()=>{}
    ;
    function h() {
        let t = e(window).height()
          , n = e(window).width()
          , o = Math.min(1, n * r / c)
          , i = Math.min(1, t * r / u)
          , d = Math.min(o, i)
          , h = u * d;
        e(a).each((function() {
            !function(e, t) {
                const n = e.attr("src")
                  , o = l[n] / u * t;
                e.css({
                    height: `${o}px`,
                    display: "block"
                })
            }(e(this), h)
        }
        )),
        function(t) {
            let n = e(window).height()
              , o = (n - t) / 2;
            s.css({
                paddingTop: o
            })
        }(h)
    }
    function f() {
        navigator.userAgent.match(/(iPod|iPhone|iPad)/) && navigator.userAgent.match(/AppleWebKit/) && !navigator.userAgent.match("CriOS") ? s.remove() : s.fadeOut(i, (()=>s.remove())),
        e(document).off("keydown", f),
        e(window).off("resize", h),
        d()
    }
    return function(n, {images: r, onLoaded: i=(()=>{}
    )}={}) {
        if (d = n,
        s = e("#welcome"),
        !function() {
            if (0 === s.length)
                return console.error('toxicodeWelcome -> Missing div with "welcome" id'),
                !1;
            return !0
        }() || "directToLevel"in o)
            return s.remove(),
            i(),
            void d();
        let a = {};
        r.forEach((e=>{
            a[e.url] = e
        }
        ));
        let p = Object.keys(a);
        t.load(p, {
            onComplete: function(...t) {
                !function(t, n) {
                    u = 0,
                    c = 0,
                    n.forEach((n=>{
                        let o = n.getAttribute("src")
                          , r = e(n)
                          , {id: i, alt: a, outOfFlux: d} = t[o];
                        i && r.attr("id", i),
                        a && r.attr("alt", a),
                        s.append(r),
                        l[o] = n.height,
                        d || (u += n.height,
                        c = Math.max(c, n.width))
                    }
                    ))
                }(a, t),
                h(),
                e(window).on("resize", h),
                s.one("click", f),
                e(document).on("keydown", f),
                i()
            }
        })
    }
}
)),
/*! Toxilib local_storage_support
 * Copyright 2014 Toxicode, pierre.lancien @ toxicode.fr
*/
define("toxilibs/local_storage_support", [], (function() {
    return function() {
        let e = "test"
          , t = window.sessionStorage;
        try {
            return t.setItem(e, "1"),
            t.removeItem(e),
            !0
        } catch (e) {
            return !1
        }
    }()
}
)),
define("mail_form", ["jquery", "toxilibs/local_storage_support"], (function(e, t) {
    const n = {};
    let o, r;
    function i() {
        e("#ask_for_mail").fadeOut(),
        n.displayed = !1,
        o && o()
    }
    function a() {
        const i = e("#mail_field input").val();
        "" !== i && (e("#ask_for_mail").fadeOut(),
        n.displayed = !1,
        function(n) {
            e.post("http://www.toxicode.fr/newsletter", {
                notifier_email: n,
                "merge_vars[STEACHER]": !0
            }, (function() {
                t && (localStorage.silentTeacherMailGiven = !0)
            }
            ), "json")
        }(i),
        r = !0,
        o && o())
    }
    return n.position = function() {
        const t = e(window).height();
        e("#ask_for_mail").css("top", .5 * (t - 300) + "px")
    }
    ,
    n.isDisabled = function() {
        return r || t && !0 === localStorage.silentTeacherMailGiven
    }
    ,
    n.show = function(t) {
        o = t,
        e("#ask_for_mail").fadeIn(),
        n.displayed = !0
    }
    ,
    e((function() {
        e("#ask_for_mail").click((function(e) {
            e.stopImmediatePropagation()
        }
        )),
        e("#ask_for_mail .cancel").click(i),
        e("#ask_for_mail .submit").click(a)
    }
    )),
    n
}
)),
define("libs/viewers", [], (function() {
    return {
        emit: function(...e) {
            ga.apply(this, ["send", "event"].concat(e))
        }
    }
}
)),
define("level_menu", ["toxilibs/event_bus_queued", "jquery", "globals", "mail_form", "libs/viewers"], (function(e, t, n, o, r) {
    const i = {};
    let a, s, l = !1;
    function c(e) {
        a = e
    }
    function u(e) {
        t(".level").removeClass("current_level");
        const n = t("#level_" + a);
        n.addClass("current_level"),
        setTimeout((function() {
            n.css("visibility", "visible").hide().fadeIn(500, e)
        }
        ), 500)
    }
    function d(e) {
        n.currentChallenge && n.currentChallenge.pause(),
        w(),
        t(".blur_on_menu").addClass("blurry"),
        t("#mask").fadeIn(250),
        t("#levels").delay(250).fadeIn(500, e)
    }
    function h(o) {
        t("#mask").fadeOut(100, (function() {
            t(".blur_on_menu").removeClass("blurry")
        }
        )),
        t("#levels").fadeOut(300, (function() {
            n.currentChallenge && (n.currentChallenge.unPause(),
            n.currentChallenge.focus()),
            o && o()
        }
        )),
        e.emit("menu hidden")
    }
    function f(e, n) {
        n.doneStepsCount >= Math.min(0, s.length - 1) && t("#show_menu").show()
    }
    e.on("levels loaded", (function(i) {
        s = i,
        t("#show_menu").click((function() {
            r.emit("clickMenu"),
            e.emit("menu displayed"),
            d()
        }
        )),
        t("#levels, #mask").click((function() {
            o.displayed || h()
        }
        )),
        function() {
            const e = t("#levels")
              , n = "localhost" === window.location.hostname;
            s.forEach((({id: t})=>{
                e.append('<div class="level" id="level_' + t + '" data-level="' + t + '">' + (n ? '<div class="name">' + t.replace("_", " ") + "</div>" : "") + "</div>")
            }
            ))
        }(),
        t(".level").not(".end_status").click((function(o) {
            if (o.stopImmediatePropagation(),
            l)
                return;
            n.currentChallenge.destroy(),
            t("#challenges_container").html("");
            const r = t(this).data("level");
            e.emit("user wants to go to level", r),
            u(h)
        }
        )),
        t(window).on("resize", w)
    }
    )),
    e.on("current state loaded", (function(e, n) {
        c(e);
        for (let e in n.doneSteps)
            t("#level_" + e).addClass("done");
        f(e, n),
        t("#level_" + a).addClass("current_level")
    }
    )),
    e.on("level changed", c),
    e.on("level won", (function(e) {
        t("#level_" + e).addClass("done")
    }
    )),
    i.showAndUpdate = function(e) {
        l = !0,
        d((function() {
            var t;
            u(),
            e && (t = e,
            setTimeout((function() {
                h(t),
                l = !1
            }
            ), 1900))
        }
        ))
    }
    ,
    e.on("level changed", f),
    e.on("level won", f),
    e.on("already ended on start", (function() {
        g(),
        t(".end_status").addClass("done"),
        m()
    }
    )),
    e.on("end", (function() {
        g(),
        d((function() {
            u(m)
        }
        ))
    }
    ));
    let p = !1;
    function g() {
        p = !0
    }
    function m() {
        t("#levels .end").fadeIn(800)
    }
    const y = 2.25
      , x = 12.5
      , v = 8
      , b = 0;
    function w() {
        const e = function() {
            const e = t(window).width()
              , n = t(window).height();
            return t("#levels").css({
                width: e + "px",
                height: n + "px"
            }),
            {
                x: .5 * e,
                y: .5 * (n - (p ? 80 : 0))
            }
        }()
          , n = function(e) {
            const t = s.length
              , n = Math.min(e.x, e.y) * function(e, t, n) {
                n = S(n, 0, 1);
                return e + n * n * (3 - 2 * n) * (t - e)
            }(.6, .9, (t - 1) / 12)
              , o = .2 * n
              , r = 1 / Math.pow(n / o, 1 / t);
            return function(e) {
                return Math.pow(r, t - 1 - e) * n
            }
        }(e)
          , o = -2 * Math.PI * S(y / (s.length - 1), 1 / x, 1 / v)
          , r = b - (s.length - 1) * o;
        for (let t = s.length - 1; t >= 0; t--) {
            const i = r + t * o;
            C(s[t].id, i, n(t), e)
        }
    }
    function C(e, n, o, r) {
        const i = .18 * o;
        t("#level_" + e).css({
            top: r.y - i - Math.sin(n) * (o - i) + "px",
            left: r.x - i + Math.cos(n) * (o - i) + "px",
            width: 2 * i,
            height: 2 * i,
            fontSize: .6 * i + "px"
        })
    }
    function S(e, t, n) {
        return Math.min(Math.max(t, e), n)
    }
    return i
}
)),
define("hour_of_code", ["toxilibs/event_bus_queued", "jquery", "toxilibs/url_params"], (function(e, t, n) {
    const {theme: o, returnUrl: r} = n();
    function i() {
        const e = t(window).height()
          , n = e < 760 ? .9 * e : 712
          , o = Math.floor(.2 * n);
        t("#hour_of_code_welcome").css({
            height: o + "px",
            bottom: .5 * (e - n) + 10 + "px",
            left: .5 * t(window).width() + .342 * n - 1.25 * o + "px"
        }),
        t("#main").css("min-height", e - 150 - 80 + "px")
    }
    function s() {
        r || (t("body").append('<img src="http://code.org/api/hour/finish_silent_teacher.png" />'),
        setTimeout((function() {
            window.location.href = "http://code.org/api/hour/finish"
        }
        ), 2e3))
    }
    return function() {
        e.on("welcome loaded", a),
        e.on("end", s)
    }
}
)),
define("level_name", ["toxilibs/event_bus_queued", "jquery"], (function(e, t) {
    e.on("user wants to see whole progression", (function() {
        let n;
        e.on("challenge view ready", (function(e) {
            n !== e.levelID && (n = e.levelID,
            t('<h1 class="level_name">' + o(n) + "</h1>").insertBefore(e.container))
        }
        ))
    }
    ));
    const n = "/Users/plancien/dev/toxicode/pedagogie/silent_teacher";
    function o(e) {
        return '<a tabindex="-1" href="txmt://open?url=file://' + n + "/scripts/levels/" + e + '.js">' + e + "</a>"
    }
    "localhost" === window.location.hostname && (e.on("level changed", (function(e) {
        t("#level_name").html(o(e) + " (debug)")
    }
    )),
    e.on("step completed", (function() {
        t("#level_name").html("")
    }
    )))
}
)),
define("level_logs", ["toxilibs/event_bus_queued", "jquery"], (function(e, t) {
    function n(e) {
        const n = e.log_event;
        var o;
        e.container.append((o = n.duration,
        t("<div>Temps passé : " + o + "s</div>"))),
        e.container.find(".answer input").val(n.answer),
        "wrong_answer" === n.eventName ? e.container.addClass("lose") : "right_answer" === n.eventName && e.container.addClass("win")
    }
    e.on("user wants to see logs", (function() {
        e.on("challenge view ready", n)
    }
    ))
}
)),
define("reset_level_save", ["toxilibs/event_bus_queued", "jquery"], (function(e, t) {
    const n = t("#modal_confirm_reset")
      , o = t("button.reset");
    t("button.confirm_reset").click(e.emitter("player wants to reset save")),
    t("button.close_reset").click(l),
    t("#modal_confirm_reset").click(l),
    t("#modal_confirm_reset .modal_content").click((function(e) {
        e.stopPropagation()
    }
    )),
    e.on("menu hidden", i),
    e.on("menu displayed", a);
    const r = 500;
    function i() {
        o.off("click", s),
        o.fadeOut(r)
    }
    function a() {
        o.on("click", s),
        o.fadeIn(r)
    }
    function s() {
        i(),
        n.fadeIn(r)
    }
    function l() {
        a(),
        n.fadeOut(r)
    }
}
)),
define("view", ["toxilibs/toxicode_welcome", "toxilibs/event_bus_queued", "toxilibs/url_params", "jquery", "globals", "level_menu", "mail_form", "hour_of_code", "level_name", "level_logs", "reset_level_save"], (function(e, t, n, o, r, i, a, s) {
    const l = n()
      , c = "full"in l
      , u = "log"in l;
    if ("localhost" === window.location.hostname && !c) {
        let e = n.extendUrlWithParams(window.location.href, {
            directToLevel: !0,
            full: !0
        });
        o("#dev_help").html('<a tabindex="-1" href="' + e + '">see full<a>')
    }
    let d = l.from;
    "/hourofcode" !== window.location.pathname && "/hour_of_code.html" !== window.location.pathname || (d = "hourofcode");
    const h = o("body")
      , f = o("html, body")
      , p = o(window);
    let g;
    function m() {
        r.challengeInputWidth = o(".challenge.current").innerWidth() - 133,
        o(".challenge input").css("width", r.challengeInputWidth + "px"),
        a.position()
    }
    function y() {
        return navigator.userAgent.match(/(iPod|iPhone|iPad)/) && navigator.userAgent.match(/AppleWebKit/) && !navigator.userAgent.match("CriOS")
    }
    function x() {
        setTimeout(t.emitter("user ready to start"), 1e3)
    }
    function v() {
        const e = !g && x;
        i.showAndUpdate(e)
    }
    function b() {
        if ("hourofcode" === d) {
            $("#left").append('<img id="hour_of_code_logo" src="img/hour_of_code_logo.png" alt="Hour Of Code" />');
        }
        
        m();
        $(window).on("resize", m);
        
        $("#teacher").on("mousedown", (function(e) {
            e.preventDefault();
        }));
        
        if (l.theme === "basic_csharp") {
            $("#logo_csharp").fadeIn(500);
        } else if(l.theme === "basic_python") {
            $("#logo_python").fadeIn(500);
        }else{
            $("#logo_javascript").fadeIn(500);
        }
        
        $("#logo_python").one("click", (() => $("#welcome").click()));
        
        e(C, {
            images: w(),
            outOfHeightFlux: ["#hour_of_code_welcome"],
            onLoaded: t.emitter("welcome loaded")
        });
        
        if (r.beneylu) {
            $("#footer").find("a").attr("href", null);
        }
    }
    
    function w() {
        return "hourofcode" === d ? [{
            id: "teacher",
            alt: "Code Mentor",
            url: "img/welcome_hour_of_code.png"
        }, {
            id: "hour_of_code_welcome",
            alt: "Hour of Code",
            url: "img/hour_of_code_logo.png",
            outOfFlux: !0
        }] : [{
            id: "teacher",
            alt: "Code Mentor",
            url: "img/welcome.png"
        }]
    }
    function C() {
        h.addClass("started"),
        (c || u) && (o("#welcome").remove(),
        t.emit("user wants to see whole progression"),
        c ? t.emit("user wants to see all questions") : t.emit("user wants to see logs"),
        setTimeout((()=>{
            p.scrollTop(0)
        }
        ), 50)),
        y() && (h.css("padding-top", "300px"),
        o("#left").css("top", "332px")),
        c || t.emit("user wants to start"),
        m()
    }
    return t.on("end", (function() {
        g = !0
    }
    )),
    function() {
        "hourofcode" === d && s(),
        function() {
            let e, n = 0;
            t.on("challenge ended", (function() {
                e = o(".challenge:last-child").offset().top,
                n = e - p.scrollTop(),
                o(".current").removeClass("current")
            }
            )),
            y() || c || t.on("challenge view ready", (function() {
                let e = o(".challenge:last-child").offset().top - Math.max(60, n);
                f.stop().animate({
                    scrollTop: e
                }, 500)
            }
            )),
            t.on("challenge view constructed", (function(e) {
                o("#antichamber").append(e.container),
                e.question.display((function() {
                    o("#challenges_container").append(e.container),
                    e.focus(),
                    t.emit("challenge view ready", e),
                    m()
                }
                ))
            }
            ))
        }(),
        t.on("current state loaded", b),
        t.on("level won", (function() {
            setTimeout(v, 800)
        }
        ))
    }
}
)),
/*! Toxilib timer
 * Copyright 2014 Toxicode, pierre.lancien @ toxicode.fr
*/
define("toxilibs/timer", [], (function() {
    let e = 3e4;
    function t({endCallback: t, secondsRemainingCallback: n, duration: o=e, bonusDelay: r=o / 3}={}) {
        this.endCallback = t,
        this.secondsRemainingCallback = n,
        this.duration = o,
        this.bonusDelay = r,
        this.paused = !0,
        this.wasNeverLaunched = !0
    }
    function n(e) {
        clearTimeout(e.currentTimeout),
        clearTimeout(e.secondsRemainingTimeout)
    }
    function o(e) {
        if (e.secondsRemainingCallback) {
            let t = e.remainingTime();
            if (t <= 0)
                return;
            e.secondsRemainingTimeout = setTimeout((function() {
                e.secondsRemainingCallback(Math.round(e.remainingTime() / 1e3)),
                o(e)
            }
            ), t % 1e3)
        }
    }
    function r(e, r) {
        e.wasNeverLaunched = !1,
        n(e),
        e.paused = !1,
        e.timerStop = t.now() + r,
        e.timerDelay = r,
        r <= 0 ? e.endCallback && e.endCallback() : (o(e),
        e.endCallback && (e.currentTimeout = setTimeout(e.endCallback, r)))
    }
    return t.now = function() {
        return (new Date).getTime()
    }
    ,
    t.prototype.launch = function(e) {
        this.startedAt = t.now(),
        this.pauseDuration = 0,
        this.duration = e || this.duration,
        r(this, this.duration)
    }
    ,
    t.prototype.addBonusDelay = function() {
        this.timerStop - t.now() < this.bonusDelay && r(this, this.bonusDelay)
    }
    ,
    t.prototype.add = function(e) {
        if (this.paused)
            this.remainingTimeAfterPause += e;
        else if (this.ended())
            this.duration += e;
        else {
            r(this, this.timerStop - t.now() + e)
        }
    }
    ,
    t.prototype.togglePause = function() {
        this.paused ? this.unPause() : this.pause()
    }
    ,
    t.prototype.pause = function() {
        this.paused || (n(this),
        this.paused = !0,
        this.pausedAt = t.now(),
        this.remainingTimeAfterPause = this.timerStop - t.now())
    }
    ,
    t.prototype.unPause = function() {
        this.wasNeverLaunched ? this.launch() : this.paused && (r(this, this.remainingTimeAfterPause),
        this.pauseDuration += t.now() - this.pausedAt)
    }
    ,
    t.prototype.reset = function() {
        this.pause(),
        this.pauseDuration = 0,
        this.startedAt = t.now(),
        this.pausedAt = this.startedAt
    }
    ,
    t.prototype.restart = function() {
        this.reset(),
        this.launch(this.duration)
    }
    ,
    t.prototype.remainingTime = function() {
        return this.paused ? this.remainingTimeAfterPause : this.timerStop - t.now()
    }
    ,
    t.prototype.totalTime = function() {
        if (this.wasNeverLaunched)
            return 0;
        return (this.paused ? this.pausedAt : t.now()) - this.startedAt - this.pauseDuration
    }
    ,
    t.prototype.ended = function() {
        return !this.paused && t.now() >= this.timerStop
    }
    ,
    t
}
)),
define("core/challenge", ["toxilibs/event_bus_queued", "toxilibs/timer"], (function(e, t) {
    function n(n) {
        this.levelID = n.levelID,
        this.questionID = n.questionID,
        this.fullLabel = this.levelID + "_" + this.questionID,
        this.question = n.question.generate(),
        this.answer = this.question.answer,
        "number" == typeof this.answer && (this.answer = Math.round(1e4 * this.answer) / 1e4),
        this.callback = n.callback,
        function(e, n) {
            n.noTimer = !0,
            n.noTimer || (n.endCallback = function() {
                e.tooLate()
            }
            );
            n.duration = n.timeoutTime,
            e.timer = new t(n),
            e.timer.launch()
        }(this, n),
        e.emit("challenge created", this)
    }
    function o(e, t, n) {
        return "ooo" === t && (t = e),
        function(e) {
            return isNaN(parseInt(e, 10)) && "false" !== e && "true" !== e
        }(t) && (t = "'" + t + "'"),
        "string" == typeof e && n && (t = "'" + e + "'"),
        t
    }
    return n.prototype.pause = function() {
        this.timer.pause()
    }
    ,
    n.prototype.unPause = function() {
        this.timer.unPause()
    }
    ,
    n.prototype.tooLate = function() {
        this.wasTooLate = !0,
        this.afterAnswer(null, "tooLate")
    }
    ,
    n.prototype.submitAnswer = function(e) {
        if (this.pause(),
        this.answerSubmitted || this.wasTooLate)
            return;
        this.answerSubmitted = !0;
        const t = function(e, t) {
            const n = e.answer;
            return "ooo" === t || (Array.isArray(n) ? function(e, t) {
                for (let n = 0; n < e.length; n++) {
                    const o = e[n];
                    if ("function" == typeof o) {
                        if (o(t))
                            return !0
                    } else if (t === String(o))
                        return !0
                }
                return !1
            }(n, t) : t === String(n))
        }(this, e = e.replace(/^\s+|\s+$/g, "").replace(/^'+|'+$/g, "").replace(/^"+|"+$/g, ""));
        let n = t ? "win" : "lose";
        "'helpMe'" === (e = o(this.answer, e, t)) && (n = "withHelp"),
        this.afterAnswer(e, n)
    }
    ,
    n.prototype.afterAnswer = function(t, n) {
        this.totalTime = this.timer.totalTime(),
        e.emit("challenge answer given", this, t, n);
        const o = this;
        setTimeout((function() {
            e.emit("challenge after answer phase ended", o),
            o.callback(n)
        }
        ), "win" === n ? 1500 : 2e3)
    }
    ,
    n.prototype.destroy = function() {
        this.pause(),
        e.emit("challenge destroyed", this)
    }
    ,
    n
}
)),
/*! Toxilib json_synchronizer
 * Copyright 2014 Toxicode, pierre.lancien @ toxicode.fr
*/
define("toxilibs/json_synchronizer", ["jquery", "./local_storage_support"], (function(e, t) {
    let n = 6e4
      , o = 3e3;
    function r(e={}) {
        !function(e, {saveMinInterval: t=n, serverReadUrl: o, serverWriteUrl: r, serverWriteMethod: i="PUT", paramsForServer: a={}, savedToServerCallback: s, fetchedFromServerCallback: l}) {
            if (!r && !o)
                return;
            e.serverSaveMinInterval = t,
            e.serverReadUrl = o,
            e.serverWriteUrl = r,
            e.serverWriteMethod = i,
            e.paramsForServer = a,
            e.savedToServerCallback = s,
            e.fetchedFromServerCallback = l
        }(this, e),
        function(e, {syncedCallback: n, inactivityIntervalBeforeSave: r=o, localStoragePrefix: i="JsonSynchro", localStorageEnabled: a=!0}) {
            e.inactivityIntervalBeforeSave = r,
            e.syncedCallback = n,
            e.localStorageEnabled = t && a,
            e.localStoragePrefix = i,
            e.data = {}
        }(this, e),
        function(e) {
            e.serverWriteUrl ? e.version = c(e) : e.version = 0;
            e.serverReadUrl ? e.syncFromServer() : e.syncFromLocalStorage()
        }(this)
    }
    function i(e, t) {
        let n = e.getData();
        e.syncedCallback && e.syncedCallback(n, t)
    }
    function a(e) {
        s(e, !1);
        let t = (new Date).getTime();
        clearTimeout(e.serverSaveTimeout),
        t - e.lastServerSave > e.serverSaveMinInterval ? (s(e, !0),
        e.lastServerSave = t) : e.serverSaveTimeout = setTimeout((function() {
            s(e, !0)
        }
        ), e.inactivityIntervalBeforeSave)
    }
    function s(e, t) {
        e.serverReadUrl && (e.version = (e.version || 0) + 1,
        u(e, e.version)),
        t ? e.syncToServer() : e.syncToLocalStorage()
    }
    function l(e) {
        e.lastServerSave = (new Date).getTime()
    }
    function c(e) {
        return e.localStorageEnabled ? parseInt(localStorage[`${e.localStoragePrefix}_version`] || "0", 10) : 0
    }
    function u(e, t) {
        e.localStorageEnabled && (localStorage[`${e.localStoragePrefix}_version`] = t)
    }
    return r.prototype.getData = function() {
        let e = {};
        for (let t in this.data)
            e[t] = this.data[t];
        return e
    }
    ,
    r.prototype.getKey = function(e) {
        return this.data[e]
    }
    ,
    r.prototype.updateKey = function(e, t) {
        this.data[e] = t,
        a(this)
    }
    ,
    r.prototype.deleteKey = function(e) {
        delete this.data[e],
        this.localStorageEnabled && delete localStorage[`${this.localStoragePrefix}_key_${e}`],
        a(this)
    }
    ,
    r.prototype.loadDataFromSource = function(e) {
        for (let t in e)
            this.data[t] = e[t]
    }
    ,
    r.prototype.clearLocal = function() {
        this.clearLocalStorage(),
        this.data = {}
    }
    ,
    r.prototype.syncFromLocalStorage = function() {
        if (this.localStorageEnabled) {
            JSON.parse(localStorage[`${this.localStoragePrefix}_keys`] || "[]").forEach((e=>{
                this.data[e] = localStorage[`${this.localStoragePrefix}_key_${e}`]
            }
            )),
            i(this, {
                origin: "localStorage"
            })
        } else
            i(this, {
                origin: "null"
            })
    }
    ,
    r.prototype.syncToLocalStorage = function() {
        if (this.localStorageEnabled) {
            let e = function({localStoragePrefix: e, data: t}) {
                let n = JSON.parse(localStorage[`${e}_keys`] || "[]")
                  , o = [];
                return n.forEach((function(n) {
                    !(n in t) && `${e}_key_${n}`in localStorage && o.push(n)
                }
                )),
                o
            }(this);
            for (let t in this.data)
                localStorage[`${this.localStoragePrefix}_key_${t}`] = this.data[t],
                -1 === e.indexOf(t) && e.push(t);
            localStorage[`${this.localStoragePrefix}_keys`] = JSON.stringify(e)
        }
    }
    ,
    r.prototype.clearLocalStorage = function() {
        if (this.localStorageEnabled) {
            delete localStorage[`${this.localStoragePrefix}_version`];
            let e = JSON.parse(localStorage[`${this.localStoragePrefix}_keys`] || "[]");
            delete localStorage[`${this.localStoragePrefix}_keys`],
            e.forEach((function(e) {
                delete localStorage[`${this.localStoragePrefix}_key_${e}`]
            }
            ))
        }
    }
    ,
    r.prototype.syncFromServer = function() {
        let t = this;
        this.serverReadUrl && e.ajax({
            type: "GET",
            url: this.serverReadUrl,
            data: this.paramsForServer,
            contentType: "application/json",
            dataType: "json",
            success: function(e) {
                e ? function(e, t) {
                    e.fetchedFromServerCallback && e.fetchedFromServerCallback(t);
                    c(e) > t.version ? (e.syncFromLocalStorage(),
                    e.syncToServer()) : (e.fullDataFromServer = t,
                    e.version = t.version,
                    e.loadDataFromSource(t.source),
                    i(e, {
                        origin: "server"
                    }));
                    l(e)
                }(t, e) : (t.syncFromLocalStorage(),
                t.syncToServer())
            },
            error: function(e) {
                var n;
                n = t,
                console.warn("Data synchronization failed"),
                n.syncFromLocalStorage(),
                l(n)
            }
        })
    }
    ,
    r.prototype.syncToServer = function() {
        if (!this.serverWriteUrl)
            return;
        let t = JSON.stringify(function({version: e, data: t, paramsForServer: n}) {
            let o = {
                version: e,
                data: t
            };
            for (let e in n)
                o[e] = n[e];
            return o
        }(this));
        e.ajax({
            type: this.serverWriteMethod,
            url: this.serverWriteUrl,
            data: t,
            contentType: "application/json",
            dataType: "json",
            success: e=>{
                !function(e, t) {
                    "version"in t ? t.version < e.version ? function(e, t) {
                        e.savedToServerCallback ? e.savedToServerCallback({
                            lowVersionError: t
                        }) : console.warn(`server update issue : version number on server is ${t.version} and it should be greater or equal than local ${e.version}`)
                    }(e, t) : function(e, t) {
                        e.savedToServerCallback && e.savedToServerCallback(!1, t);
                        e.version = t.version,
                        u(e, t.version)
                    }(e, t) : function(e, t) {
                        e.savedToServerCallback ? e.savedToServerCallback({
                            noVersionError: t
                        }) : console.warn("Server should have returned a version number. Data returned were :", t)
                    }(e, t)
                }(this, e)
            }
            ,
            error: (e,t,n)=>{
                !function(e, t, n) {
                    e.savedToServerCallback ? e.savedToServerCallback({
                        requestError: t
                    }) : console.warn(`server update issue : ${n}`)
                }(this, e, n)
            }
        })
    }
    ,
    r
}
)),
/*! Toxilib parkour
 * Copyright 2014 Toxicode, pierre.lancien @ toxicode.fr
*/
define("toxilibs/parkour", ["./json_synchronizer"], (function(e) {
    function t(t) {
        var o, r;
        t = t || {},
        this.stepSignature = t.stepSignature,
        this.onStepReached = t.onStepReached,
        this.onStepCompleted = t.onStepCompleted,
        this.onLastStepCompleted = t.onLastStepCompleted,
        t.synchronizer && (o = this,
        r = t.synchronizer,
        o.synchronizer = r instanceof e ? r : new e(r)),
        this.doneSteps = {},
        function(e) {
            Object.defineProperty(e, "doneStepsCount", {
                enumerable: !0,
                get: function() {
                    let t = 0;
                    for (let n in e.doneSteps)
                        e.doneSteps[n] && (t += 1);
                    return t
                }
            })
        }(this),
        this.steps = [],
        t.steps && this.add(t.steps),
        function(e) {
            Object.defineProperty(e, "current", {
                enumerable: !0,
                get: function() {
                    return e.getStep(e.currentSignature) || e.steps[0]
                }
            })
        }(this),
        function(e) {
            Object.defineProperty(e, "previous", {
                enumerable: !0,
                get: function() {
                    return function(e) {
                        let t = e.getStepIndex(e.current)
                          , n = -1 === t ? -1 : t - 1;
                        return n >= 0 ? e.steps[n] : null
                    }(e)
                }
            })
        }(this),
        function(e) {
            Object.defineProperty(e, "next", {
                enumerable: !0,
                get: function() {
                    return function(e) {
                        let t = e.getStepIndex(e.current)
                          , n = -1 === t ? -1 : t + 1;
                        return -1 !== n && n < e.steps.length ? e.steps[n] : null
                    }(e)
                }
            })
        }(this),
        function(e) {
            Object.defineProperty(e, "highestDone", {
                enumerable: !0,
                get: function() {
                    return function(e) {
                        for (let t = e.steps.length - 1; t >= 0; t--) {
                            let o = e.steps[t]
                              , r = n(e, o);
                            if (e.doneSteps[r])
                                return o
                        }
                        return null
                    }(e)
                }
            })
        }(this),
        function(e) {
            Object.defineProperty(e, "lowestNotDone", {
                enumerable: !0,
                get: ()=>function(e) {
                    return e.steps.find((t=>{
                        let o = n(e, t);
                        return !e.doneSteps[o]
                    }
                    ))
                }(e)
            })
        }(this)
    }
    function n(e, t) {
        let n;
        if (e.stepSignature)
            n = e.stepSignature(t);
        else {
            let o = e.getStepIndex(t);
            -1 !== o && (n = o)
        }
        return n
    }
    function o(e, t) {
        e.steps.push(t),
        function(e, t) {
            let o = n(e, t)
              , r = Boolean(a(e, `done_step_${o}`));
            r && (e.doneSteps[o] = !0)
        }(e, t),
        void 0 === e.currentSignature && (e.currentSignature = function(e) {
            let t = a(e, "current");
            return t || (e.steps.length > 0 ? e.stepSignature ? n(e, e.steps[0]) : 0 : void 0)
        }(e))
    }
    function r(e, t) {
        i(e, `done_step_${t}`, !0)
    }
    function i(e, t, n) {
        e.synchronizer && e.synchronizer.updateKey(t, n)
    }
    function a(e, t) {
        return e.synchronizer ? e.synchronizer.getKey(t) : null
    }
    return t.prototype.add = function(e) {
        var t;
        Array.isArray(e) ? (t = this,
        e.forEach((e=>o(t, e)))) : o(this, e)
    }
    ,
    t.prototype.goTo = function(e) {
        return this.currentSignature = e,
        function(e, t) {
            i(e, "current", t)
        }(this, e),
        this.onStepReached && this.onStepReached(this.current),
        this.current
    }
    ,
    t.prototype.completeStep = function(e=this.current) {
        let t = n(this, e);
        void 0 !== t && (this.doneSteps[t] = !0,
        r(this, t),
        this.onStepCompleted && this.onStepCompleted(e),
        this.isLastStep(e) && this.onLastStepCompleted && this.onLastStepCompleted(e))
    }
    ,
    t.prototype.isLastStep = function(e=this.current) {
        return this.getStepIndex(e) === this.steps.length - 1
    }
    ,
    t.prototype.isCurrentStep = function(e) {
        return e === this.current
    }
    ,
    t.prototype.getStepIndex = function(e) {
        return this.steps.indexOf(e)
    }
    ,
    t.prototype.getStep = function(e) {
        return this.steps.find((t=>e === n(this, t)))
    }
    ,
    t.prototype.reset = function() {
        this.synchronizer && this.synchronizer.clearLocal(),
        this.doneSteps = {},
        this.currentSignature = n(this, this.steps[0])
    }
    ,
    t.prototype.unlockAll = function() {
        this.steps.forEach((e=>{
            let t = n(this, e);
            void 0 !== t && (this.doneSteps[t] = !0,
            r(this, t))
        }
        ))
    }
    ,
    t
}
)),
define("persistence/levels_storage", ["toxilibs/event_bus_queued", "globals", "toxilibs/json_synchronizer"], (function(e, t, n) {
    const o = new n({
        localStoragePrefix: "silent_teacher"
    });
    return t.errorsCount = 0,
    e.on("levels loaded", (function(n) {
        (function() {
            const e = o.getKey("errors");
            void 0 !== e && (t.errorsCount = parseInt(e, 10))
        }
        )(),
        "end" === t.levelID && e.emit("already ended on start")
    }
    )),
    e.on("level changed", (function(e) {
        o.updateKey("level", e)
    }
    )),
    e.on("user gave wrong answer", (function() {
        t.errorsCount += 1,
        o.updateKey("errors", t.errorsCount)
    }
    )),
    e.on("player wants to reset save", (function() {
        o.clearLocal()
    }
    )),
    o
}
)),
/*! Toxilib queue
 * Copyright 2014 Toxicode, pierre.lancien @ toxicode.fr
*/
define("toxilibs/queue", [], (function() {
    function e({onAdded: t, onRemoved: n, onFinished: r, noWaiting: i}={}) {
        if (this.onAdded = t,
        this.onRemoved = n,
        this.onFinished = r,
        this.elements = [],
        !i) {
            let t = this;
            this.waiting = new e({
                noWaiting: !0,
                onRemoved: function(e) {
                    t.onRemoved && t.onRemoved(e)
                },
                onFinished: function() {
                    o(t)
                }
            })
        }
    }
    function t(e, t) {
        return !e.has(t) && (e.elements.push(t),
        e.onAdded && e.onAdded(t),
        !0)
    }
    function n(e, t) {
        let n = e.removingNext();
        t(n, (function() {
            e.remove(n),
            e.handleInParallel(t)
        }
        ))
    }
    function o(e) {
        e.onFinished && e.empty() && (!e.waiting || e.waiting.empty()) && e.onFinished()
    }
    return e.prototype.length = function() {
        return this.elements.length
    }
    ,
    e.prototype.empty = function() {
        return 0 === this.elements.length
    }
    ,
    e.prototype.has = function(e) {
        return this.elements.includes(e) || !!this.waiting && this.waiting.has(e)
    }
    ,
    e.prototype.add = function(e) {
        return e instanceof Array ? void e.forEach((e=>t(this, e))) : t(this, e)
    }
    ,
    e.prototype.remove = function(e) {
        if (this.waiting && this.waiting.remove(e))
            return !0;
        let t = this.elements.indexOf(e);
        return t >= 0 && (this.elements.splice(t, 1),
        this.onRemoved && this.onRemoved(e),
        o(this),
        !0)
    }
    ,
    e.prototype.next = function(e) {
        return this.empty() ? null : e ? this.elements.slice(0, e) : this.elements[0]
    }
    ,
    e.prototype.removeNext = function(e) {
        if (this.empty())
            return null;
        let t;
        return e ? (t = this.elements.splice(0, e),
        this.onRemoved && t.forEach((e=>this.onRemoved(e)))) : (t = this.elements.shift(),
        this.onRemoved && this.onRemoved(t)),
        o(this),
        t
    }
    ,
    e.prototype.removing = function(e) {
        let t = this.elements.indexOf(e);
        t >= 0 && (this.elements.splice(t, 1),
        this.waiting.add(e))
    }
    ,
    e.prototype.removingNext = function(e) {
        if (this.empty())
            return null;
        let t;
        if (e) {
            t = this.elements.splice(0, e);
            for (let e = 0; e < t.length; e++)
                this.waiting.add(t[e]);
            t.forEach((e=>this.waiting.add(e)))
        } else
            t = this.elements.shift(),
            this.waiting.add(t);
        return t
    }
    ,
    e.prototype.handleSync = function(e) {
        for (; !this.empty(); )
            e(this.removeNext())
    }
    ,
    e.prototype.handleInSerie = function(e) {
        if (this.empty())
            return;
        let t = this.removingNext();
        e(t, (()=>{
            this.remove(t),
            this.handleInSerie(e)
        }
        ))
    }
    ,
    e.prototype.handleInParallel = function(e) {
        for (; !this.empty(); )
            n(this, e)
    }
    ,
    e
}
)),
define("core/step_dependencies", ["toxilibs/queue"], (function(e) {
    return function t(n) {
        let o = [];
        const r = {}
          , i = {};
        function a(e, t) {
            r[e.name] || i[e.name] ? t() : (r[e.name] = !0,
            s(e.dependencies, (function() {
                o.push(e),
                t()
            }
            )))
        }
        function s(t, r) {
            t && 0 !== t.length ? require(t, (function(...t) {
                n.noDependencies ? (o = t,
                r()) : function(t, n) {
                    const o = new e({
                        onFinished: n
                    });
                    o.add(t),
                    o.handleInSerie(a)
                }(t, r)
            }
            )) : r()
        }
        function l() {
            for (let e = 0; e < o.length; e++)
                o[e].id = o[e].name;
            n.callback(o)
        }
        n.acquiredStepPaths ? t({
            wantedStepPaths: n.acquiredStepPaths,
            callback: function(e) {
                for (let t = 0; t < e.length; t++)
                    i[e[t].name] = !0;
                s(n.wantedStepPaths, l)
            }
        }) : s(n.wantedStepPaths, l)
    }
}
)),
define("progressions", ["toxilibs/event_bus_queued", "core/step_dependencies", "toxilibs/url_params"], (function(e, t, n) {
    const o = {
        "2D_distance": ["levels_maths/black_box_simple", "levels_maths/2D_distance_between_points"],
        dot_product: ["levels_maths/black_box_simple", "levels_maths/xy_coords", "levels_maths/dot_product_geo", "levels_maths/dot_product_formula"],
        ratio: ["levels_maths/black_box_short", "levels_maths/proportionality_geometric"],
        base_number_system: ["levels_maths/black_box_simple", "levels_maths/int_squared", "levels_maths/base_numeric_with_square"],
        test: ["levels_maths/formula/test_formula", "levels/example_bad_choices", "levels/example_emoticons"],
        basic_coding: ["levels/easy_maths", "levels/variables", "levels/string_concatenation", "levels/string_or_integers", "levels/overriding_vars", "levels/functions", "levels/length", "levels/arrays_position", "levels/booleans", "levels/test_or_affectation", "levels/conditions", "levels/conditions2", "levels/advanced_functions", "levels/composed_functions"],
        basic_python: {
            wanted: ["levels/easy_maths", "levels/variables", "levels/string_concatenation", "levels/string_or_integers", "levels/overriding_vars", "levels/functions", "levels/length", "levels/arrays_position", "levels/booleans", "levels/test_or_affectation", "levels/conditions", "levels/conditions2", "levels/advanced_functions", "levels/composed_functions"],
            language: "python"
        },
        basic_csharp: {
            wanted: ["levels/variables", "levels/string_concatenation", "levels/cs_double", "levels/string_or_integers", "levels/overriding_vars", "levels/cs_inputs", "levels/booleans", "levels/conditions", "levels/conditions2", "levels/cs_loops", "levels/functions", "levels/length", "levels/arrays_position", "levels/advanced_functions", "levels/composed_functions"],
            language: "csharp"
        },
        explorer_basic: ["levels/string_or_integers", "levels/overriding_vars"],
        explorer_functions_1: {
            wanted: ["levels/functions"],
            acquired: ["levels/easy_maths", "levels/variables"]
        },
        explorer_functions_2: {
            wanted: ["levels/advanced_functions", "levels/composed_functions"],
            acquired: ["levels/string_or_integers", "levels/overriding_vars", "levels/functions", "levels/conditions2"]
        },
        explorer_functions_3: {
            wanted: ["levels/functions_as_vars", "levels/functions_as_params2"],
            acquired: ["levels/string_or_integers", "levels/overriding_vars", "levels/functions", "levels/conditions2", "levels/advanced_functions", "levels/composed_functions"]
        },
        explorer_array: {
            wanted: ["levels/arrays_position", "levels/arrays_position2", "levels/arrays_setter"],
            acquired: ["levels/string_or_integers", "levels/overriding_vars", "levels/functions", "levels/length", "levels/booleans", "levels/test_or_affectation", "levels/conditions2", "levels/advanced_functions", "levels/composed_functions"]
        },
        explorer_iterator: {
            wanted: ["levels/for_simple"],
            acquired: ["levels/string_or_integers", "levels/overriding_vars", "levels/functions", "levels/length", "levels/booleans", "levels/test_or_affectation", "levels/conditions2", "levels/advanced_functions", "levels/composed_functions"]
        },
        explorer_object: {
            wanted: ["levels/object_simple"],
            acquired: ["levels/string_or_integers", "levels/overriding_vars", "levels/functions", "levels/length", "levels/booleans", "levels/test_or_affectation", "levels/conditions2", "levels/advanced_functions", "levels/composed_functions"]
        },
        ngrams: {
            wanted: ["levels/ngrams_count_23"],
            acquired: []
        },
        power: ["levels_maths/black_box_simple", "levels_maths/berengere_maths/power_square", "levels_maths/berengere_maths/signs_rule_simple", "levels_maths/berengere_maths/signs_rule", "levels_maths/berengere_maths/power_signs_rule", "levels_maths/berengere_maths/power_one", "levels_maths/berengere_maths/power_multiplication_positive", "levels_maths/berengere_maths/positives_negatives_additions", "levels_maths/berengere_maths/power_zero", "levels_maths/berengere_maths/power_multiplication_negative"]
    }
      , {challenge: r, theme: i="basic_coding"} = n()
      , a = o[i] || o.basic_coding;
    let s, l, c = !1;
    function u() {
        a.wanted ? (s = a.wanted,
        l = a.acquired) : s = a
    }
    r ? function(e) {
        const t = function(e) {
            for (let t in o) {
                let n = o[t];
                n.wanted && (n = n.wanted);
                for (let t = 0; t < n.length; t++) {
                    const o = n[t].split("/");
                    if (o[o.length - 1] === e)
                        return n[t]
                }
            }
            return null
        }(e);
        t ? (s = [t],
        c = !0) : (console.error("Challenge " + r + " not found"),
        u())
    }(r) : u(),
    e.on("page loaded", (function() {
        t({
            wantedStepPaths: s,
            acquiredStepPaths: l,
            noDependencies: c,
            callback: function(t) {
                !function(e) {
                    for (let t = 0; t < e.length; t++)
                        e[t].language = a.language
                }(t),
                e.emit("levels loaded", t)
            }
        })
    }
    ))
}
)),
define("core/levels_navigator", ["toxilibs/event_bus_queued", "toxilibs/random", "globals", "core/challenge", "toxilibs/parkour", "persistence/levels_storage", "progressions"], (function(e, t, n, o, r, i) {
    let a, s = 0;
    const l = new r({
        synchronizer: i,
        stepSignature: function(e) {
            return e.id
        },
        onStepReached: function(t) {
            a = l.current.questions,
            e.emit("level changed", t.id, l)
        },
        onStepCompleted: function(t) {
            e.emit("level won", t.id, l),
            l.isLastStep() ? (n.levelID = "end",
            e.emit("end")) : l.goTo(l.next.id)
        }
    });
    function c(e, t) {
        for (let n = 0; n < l.steps.length; n++) {
            const o = l.steps[n];
            if (o.id === e)
                return o.questions.steps[t]
        }
        return null
    }
    function u(e) {
        l.goTo(e),
        a.goTo(0)
    }
    function d({levelID: e, questionID: t, question: r}) {
        const i = new o({
            levelID: e,
            questionID: t,
            question: r,
            callback: g,
            noTimer: s >= 1,
            timeoutTime: r.timeoutTime
        });
        return n.currentChallenge = i,
        i
    }
    function h() {
        const e = a.current
          , t = a.currentSignature;
        d({
            levelID: l.current.id,
            questionID: t,
            question: e
        })
    }
    function f(e) {
        "win" === e ? function() {
            const e = a.current;
            if (a.doneSteps[a.currentSignature])
                if (a.lowestNotDone) {
                    const e = a.getStepIndex(a.lowestNotDone);
                    a.goTo(e)
                } else
                    a.completeStep();
            else
                e.times > 1 ? (e.times -= 1,
                p()) : a.completeStep()
        }() : "lose" === e ? function() {
            const e = a.current
              , n = a.currentSignature;
            e.errorExpected ? (e.errorExpected = !1,
            p()) : (e.errors += 1,
            e.times = Math.min(Math.max(3, e.initialTimes), e.times + 1),
            !e.dontGoBack && n > 0 && e.errors > 1 ? a.goTo(t.intBetween(Math.max(0, n - 2), n - 1)) : p())
        }() : p()
    }
    function p() {
        h()
    }
    function g(t) {
        e.emit("challenge ended"),
        n.currentChallenge && n.currentChallenge.wasTooLate ? s += 1 : s = 0,
        function(t) {
            if ("win" === t) {
                const t = l.current;
                e.emit("user won question", {
                    levelID: t.id,
                    currentQuestionID: a.currentSignature,
                    errors: a.current.errors
                })
            } else
                "lose" === t && e.emit("user gave wrong answer")
        }(t),
        f(t)
    }
    e.on("levels loaded", (function(t) {
        l.add(t),
        e.emit("current state loaded", l.current.id, l)
    }
    )),
    e.on("user wants to see all questions", (function() {
        for (let e = 0; e < l.steps.length; e++) {
            const n = l.steps[e];
            for (let e = 0; e < n.questions.steps.length; e++) {
                const o = n.questions.steps[e];
                t.resetAllFairChoices(),
                d({
                    levelID: n.id,
                    questionID: o.id,
                    question: o
                })
            }
        }
    }
    )),
    e.on("user wants to see logs", (function() {
        const e = JSON.parse(localStorage.log);
        if (void 0 === e)
            return;
        for (let n = 0; n < e.history.length; n++) {
            const o = e.history[n];
            if (void 0 !== o.question) {
                t.resetAllFairChoices();
                d({
                    levelID: o.level,
                    questionID: o.question,
                    question: c(o.level, o.question)
                }).log_event = o
            }
        }
    }
    )),
    e.on("user wants to start", (function() {
        l.current ? u(l.current.id) : console.warn("No current level")
    }
    )),
    e.on("player wants to reset save", (function() {
        l.reset(),
        e.emit("parkour synchronizer reset")
    }
    )),
    e.on("user wants to go to level", u),
    e.on("user ready to start", (function() {
        a.goTo(0)
    }
    )),
    e.on("question changed", (function() {
        t.resetAllFairChoices(),
        h()
    }
    )),
    e.on("questions parkour ended", (function() {
        l.completeStep()
    }
    ))
}
)),
/*! Toxilib toxicode_remote_challenge
 * Copyright 2014 Toxicode, pierre.lancien @ toxicode.fr
*/
define("toxilibs/toxicode_remote_challenge", ["./url_params"], (function(e) {
    function t(e, t, n) {
        let o = document.createElement("input");
        o.setAttribute("type", "hidden"),
        o.setAttribute("name", t),
        o.setAttribute("value", n),
        e.appendChild(o)
    }
    return {
        goToChallenge: function({url: t, token: n, returnUrl: o}) {
            window.location = e.extendUrlWithParams(t, {
                token: n,
                returnUrl: o
            })
        },
        checkRemoteMode: function() {
            let {returnUrl: n, token: o, status: r} = e();
            return !(!o && !n) && (n ? {
                token: o,
                returnUrl: n,
                status: r,
                goBack: function(e) {
                    !function({url: e, result: n, token: o}) {
                        if (!o)
                            return void (window.location.href = e);
                        let r = document.createElement("form");
                        r.setAttribute("method", "post"),
                        r.setAttribute("action", e),
                        t(r, "token", o),
                        t(r, "result", n),
                        document.body.appendChild(r),
                        r.submit()
                    }({
                        url: n,
                        result: e,
                        token: o
                    })
                }
            } : {
                error: "no return url has been provided"
            })
        }
    }
}
)),
define("remote_challenge", ["toxilibs/event_bus_queued", "jquery", "toxilibs/toxicode_remote_challenge"], (function(e, t, n) {
    const o = n.checkRemoteMode();
    function r() {
        setTimeout((function() {
            o.goBack("won")
        }
        ), 4e3)
    }
    o && (o.error ? t("body").html("Remote Challenge Error : " + o.error) : e.on("end", r))
}
)),
define("core/question_generator_helper", ["jquery", "toxilibs/random"], (function($, random) {
    function QuestionGeneratorHelper() {
        this.container = $('<div class="challenge_question">'),
        this.todoOnDisplay = []
    }
    function answerPlaceholderFilter(e) {
        return e.replace("ANSWER_HERE", '<span class="answer_placeholder">?</span>')
    }
    function selectRoundChoices(e, t) {
        let n, o = 0;
        for (let r = 0; r < t.length; r++) {
            n = t[r];
            const i = getOnlyKey(n);
            if ("all" === i)
                return getChoicesFromRound(n);
            if (o += parseInt(i, 10),
            e.currentTry <= o)
                return getChoicesFromRound(n)
        }
        return getChoicesFromRound(n)
    }
    function getChoicesFromRound(e) {
        let t = getOnlyValue(e);
        return Array.isArray(t) && "object" == typeof t[0] && (t = random.pick(t)),
        "object" == typeof t ? t : [t]
    }
    function getOnlyKey(e) {
        let t, n = 0;
        for (t in e)
            n++;
        if (1 !== n)
            throw new Error("object should have only one key");
        return t
    }
    function getOnlyValue(e) {
        let t, n = 0;
        for (t in e)
            n++;
        if (1 !== n)
            throw new Error("object should have only one key");
        return e[t]
    }
    function processToDo(e, t, n) {
        const o = e[t];
        o ? o((function() {
            processToDo(e, t + 1, n)
        }
        )) : n()
    }
    function applyTextFilters(e) {
        for (let t = 0; t < QuestionGeneratorHelper.textFilters.length; t++)
            e = QuestionGeneratorHelper.textFilters[t](e);
        return e
    }
    return QuestionGeneratorHelper.textFilters = [answerPlaceholderFilter],
    QuestionGeneratorHelper.prototype.smartChoose = function(e, t) {
        const n = selectRoundChoices(this, e);
        if (Array.isArray(n))
            return void t(random.fairChoice(n));
        const o = {};
        for (let e in n) {
            let t = n[e];
            Array.isArray(t) || (t = [t]),
            o[e] = random.fairChoice(t, {
                name: e
            })
        }
        t(o)
    }
    ,
    QuestionGeneratorHelper.prototype.intBetween = function(e, t) {
        const n = [];
        for (let o = e; o <= t; o++)
            n.push(o);
        return n
    }
    ,
    QuestionGeneratorHelper.prototype.addClass = function(e) {
        this.container.addClass(e)
    }
    ,
    QuestionGeneratorHelper.prototype.addText = function(e) {
        this.container.append('<pre class="text">' + applyTextFilters(e) + "</pre>")
    }
    ,
    QuestionGeneratorHelper.prototype.approximation = function(e, t) {
        return function(n) {
            return n <= e + t && n >= e - t
        }
    }
    ,
    QuestionGeneratorHelper.prototype.evalAnswer = function(numericAnswer) {
        return function(userAnswer) {
            try {
                const isCorrect = eval(userAnswer) === numericAnswer;
                return isCorrect
            } catch (e) {
                return !1
            }
        }
    }
    ,
    QuestionGeneratorHelper.prototype.display = function(e) {
        processToDo(this.todoOnDisplay, 0, e)
    }
    ,
    QuestionGeneratorHelper
}
)),
/*! Toxilib css_injector
 * Copyright 2014 Toxicode, pierre.lancien @ toxicode.fr
*/
define("toxilibs/css_injector", [], (function() {
    return function(e) {
        "file"in e && (e.files = [e.file]);
        const {callback: t, files: n} = e;
        return new Promise((o=>{
            !function(e) {
                "loading" === document.readyState ? document.addEventListener("DOMContentLoaded", e) : e()
            }((function() {
                void 0 === n ? (!function(e) {
                    let t = document.createElement("style");
                    t.appendChild(document.createTextNode("")),
                    document.head.appendChild(t);
                    let n = t.sheet;
                    for (let t in e) {
                        let o = e[t]
                          , r = "";
                        if ("string" == typeof o)
                            r = o;
                        else
                            for (let e in o)
                                r += `${e}: ${o[e]};`;
                        n.insertRule(`${t} { ${r} }`, 0)
                    }
                }(e),
                o()) : function(e, t) {
                    let n = function(e) {
                        let t = {};
                        return e.forEach((e=>{
                            t[e] = !0
                        }
                        )),
                        t
                    }(e);
                    function o(e) {
                        delete n[e],
                        t && 0 === Object.keys(n).length && t()
                    }
                    e.forEach((e=>function(e, t) {
                        let {head: n} = document
                          , o = document.createElement("link");
                        o.type = "text/css",
                        o.rel = "stylesheet",
                        o.href = e,
                        t && (o.onload = function() {
                            t(e)
                        }
                        );
                        n.appendChild(o)
                    }(e, o)))
                }(n, (()=>{
                    t && t(),
                    o()
                }
                ))
            }
            ))
        }
        ))
    }
}
)),
define("toxilibs/extlibs/prism", [], (function() {
    var e = function(e) {
        var t = /\blang(?:uage)?-([\w-]+)\b/i
          , n = 0
          , o = {
            manual: e.Prism && e.Prism.manual,
            disableWorkerMessageHandler: e.Prism && e.Prism.disableWorkerMessageHandler,
            util: {
                encode: function e(t) {
                    return t instanceof r ? new r(t.type,e(t.content),t.alias) : Array.isArray(t) ? t.map(e) : t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ")
                },
                type: function(e) {
                    return Object.prototype.toString.call(e).slice(8, -1)
                },
                objId: function(e) {
                    return e.__id || Object.defineProperty(e, "__id", {
                        value: ++n
                    }),
                    e.__id
                },
                clone: function e(t, n) {
                    var r, i;
                    switch (n = n || {},
                    o.util.type(t)) {
                    case "Object":
                        if (i = o.util.objId(t),
                        n[i])
                            return n[i];
                        for (var a in r = {},
                        n[i] = r,
                        t)
                            t.hasOwnProperty(a) && (r[a] = e(t[a], n));
                        return r;
                    case "Array":
                        return i = o.util.objId(t),
                        n[i] ? n[i] : (r = [],
                        n[i] = r,
                        t.forEach((function(t, o) {
                            r[o] = e(t, n)
                        }
                        )),
                        r);
                    default:
                        return t
                    }
                },
                getLanguage: function(e) {
                    for (; e && !t.test(e.className); )
                        e = e.parentElement;
                    return e ? (e.className.match(t) || [, "none"])[1].toLowerCase() : "none"
                },
                currentScript: function() {
                    if ("undefined" == typeof document)
                        return null;
                    if ("currentScript"in document)
                        return document.currentScript;
                    try {
                        throw new Error
                    } catch (o) {
                        var e = (/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(o.stack) || [])[1];
                        if (e) {
                            var t = document.getElementsByTagName("script");
                            for (var n in t)
                                if (t[n].src == e)
                                    return t[n]
                        }
                        return null
                    }
                },
                isActive: function(e, t, n) {
                    for (var o = "no-" + t; e; ) {
                        var r = e.classList;
                        if (r.contains(t))
                            return !0;
                        if (r.contains(o))
                            return !1;
                        e = e.parentElement
                    }
                    return !!n
                }
            },
            languages: {
                extend: function(e, t) {
                    var n = o.util.clone(o.languages[e]);
                    for (var r in t)
                        n[r] = t[r];
                    return n
                },
                insertBefore: function(e, t, n, r) {
                    var i = (r = r || o.languages)[e]
                      , a = {};
                    for (var s in i)
                        if (i.hasOwnProperty(s)) {
                            if (s == t)
                                for (var l in n)
                                    n.hasOwnProperty(l) && (a[l] = n[l]);
                            n.hasOwnProperty(s) || (a[s] = i[s])
                        }
                    var c = r[e];
                    return r[e] = a,
                    o.languages.DFS(o.languages, (function(t, n) {
                        n === c && t != e && (this[t] = a)
                    }
                    )),
                    a
                },
                DFS: function e(t, n, r, i) {
                    i = i || {};
                    var a = o.util.objId;
                    for (var s in t)
                        if (t.hasOwnProperty(s)) {
                            n.call(t, s, t[s], r || s);
                            var l = t[s]
                              , c = o.util.type(l);
                            "Object" !== c || i[a(l)] ? "Array" !== c || i[a(l)] || (i[a(l)] = !0,
                            e(l, n, s, i)) : (i[a(l)] = !0,
                            e(l, n, null, i))
                        }
                }
            },
            plugins: {},
            highlightAll: function(e, t) {
                o.highlightAllUnder(document, e, t)
            },
            highlightAllUnder: function(e, t, n) {
                var r = {
                    callback: n,
                    container: e,
                    selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
                };
                o.hooks.run("before-highlightall", r),
                r.elements = Array.prototype.slice.apply(r.container.querySelectorAll(r.selector)),
                o.hooks.run("before-all-elements-highlight", r);
                for (var i, a = 0; i = r.elements[a++]; )
                    o.highlightElement(i, !0 === t, r.callback)
            },
            highlightElement: function(n, r, i) {
                var a = o.util.getLanguage(n)
                  , s = o.languages[a];
                n.className = n.className.replace(t, "").replace(/\s+/g, " ") + " language-" + a;
                var l = n.parentElement;
                l && "pre" === l.nodeName.toLowerCase() && (l.className = l.className.replace(t, "").replace(/\s+/g, " ") + " language-" + a);
                var c = {
                    element: n,
                    language: a,
                    grammar: s,
                    code: n.textContent
                };
                function u(e) {
                    c.highlightedCode = e,
                    o.hooks.run("before-insert", c),
                    c.element.innerHTML = c.highlightedCode,
                    o.hooks.run("after-highlight", c),
                    o.hooks.run("complete", c),
                    i && i.call(c.element)
                }
                if (o.hooks.run("before-sanity-check", c),
                !c.code)
                    return o.hooks.run("complete", c),
                    void (i && i.call(c.element));
                if (o.hooks.run("before-highlight", c),
                c.grammar)
                    if (r && e.Worker) {
                        var d = new Worker(o.filename);
                        d.onmessage = function(e) {
                            u(e.data)
                        }
                        ,
                        d.postMessage(JSON.stringify({
                            language: c.language,
                            code: c.code,
                            immediateClose: !0
                        }))
                    } else
                        u(o.highlight(c.code, c.grammar, c.language));
                else
                    u(o.util.encode(c.code))
            },
            highlight: function(e, t, n) {
                var i = {
                    code: e,
                    grammar: t,
                    language: n
                };
                return o.hooks.run("before-tokenize", i),
                i.tokens = o.tokenize(i.code, i.grammar),
                o.hooks.run("after-tokenize", i),
                r.stringify(o.util.encode(i.tokens), i.language)
            },
            tokenize: function(e, t) {
                var n = t.rest;
                if (n) {
                    for (var o in n)
                        t[o] = n[o];
                    delete t.rest
                }
                var r = new s;
                return l(r, r.head, e),
                a(e, r, t, r.head, 0),
                function(e) {
                    var t = []
                      , n = e.head.next;
                    for (; n !== e.tail; )
                        t.push(n.value),
                        n = n.next;
                    return t
                }(r)
            },
            hooks: {
                all: {},
                add: function(e, t) {
                    var n = o.hooks.all;
                    n[e] = n[e] || [],
                    n[e].push(t)
                },
                run: function(e, t) {
                    var n = o.hooks.all[e];
                    if (n && n.length)
                        for (var r, i = 0; r = n[i++]; )
                            r(t)
                }
            },
            Token: r
        };
        function r(e, t, n, o) {
            this.type = e,
            this.content = t,
            this.alias = n,
            this.length = 0 | (o || "").length
        }
        function i(e, t, n, o) {
            e.lastIndex = t;
            var r = e.exec(n);
            if (r && o && r[1]) {
                var i = r[1].length;
                r.index += i,
                r[0] = r[0].slice(i)
            }
            return r
        }
        function a(e, t, n, s, u, d) {
            for (var h in n)
                if (n.hasOwnProperty(h) && n[h]) {
                    var f = n[h];
                    f = Array.isArray(f) ? f : [f];
                    for (var p = 0; p < f.length; ++p) {
                        if (d && d.cause == h + "," + p)
                            return;
                        var g = f[p]
                          , m = g.inside
                          , y = !!g.lookbehind
                          , x = !!g.greedy
                          , v = g.alias;
                        if (x && !g.pattern.global) {
                            var b = g.pattern.toString().match(/[imsuy]*$/)[0];
                            g.pattern = RegExp(g.pattern.source, b + "g")
                        }
                        for (var w = g.pattern || g, C = s.next, S = u; C !== t.tail && !(d && S >= d.reach); S += C.value.length,
                        C = C.next) {
                            var _ = C.value;
                            if (t.length > e.length)
                                return;
                            if (!(_ instanceof r)) {
                                var T, k = 1;
                                if (x) {
                                    if (!(T = i(w, S, e, y)))
                                        break;
                                    var A = T.index
                                      , P = T.index + T[0].length
                                      , M = S;
                                    for (M += C.value.length; A >= M; )
                                        M += (C = C.next).value.length;
                                    if (S = M -= C.value.length,
                                    C.value instanceof r)
                                        continue;
                                    for (var E = C; E !== t.tail && (M < P || "string" == typeof E.value); E = E.next)
                                        k++,
                                        M += E.value.length;
                                    k--,
                                    _ = e.slice(S, M),
                                    T.index -= S
                                } else if (!(T = i(w, 0, _, y)))
                                    continue;
                                A = T.index;
                                var L = T[0]
                                  , D = _.slice(0, A)
                                  , q = _.slice(A + L.length)
                                  , F = S + _.length;
                                d && F > d.reach && (d.reach = F);
                                var O = C.prev;
                                if (D && (O = l(t, O, D),
                                S += D.length),
                                c(t, O, k),
                                C = l(t, O, new r(h,m ? o.tokenize(L, m) : L,v,L)),
                                q && l(t, C, q),
                                k > 1) {
                                    var j = {
                                        cause: h + "," + p,
                                        reach: F
                                    };
                                    a(e, t, n, C.prev, S, j),
                                    d && j.reach > d.reach && (d.reach = j.reach)
                                }
                            }
                        }
                    }
                }
        }
        function s() {
            var e = {
                value: null,
                prev: null,
                next: null
            }
              , t = {
                value: null,
                prev: e,
                next: null
            };
            e.next = t,
            this.head = e,
            this.tail = t,
            this.length = 0
        }
        function l(e, t, n) {
            var o = t.next
              , r = {
                value: n,
                prev: t,
                next: o
            };
            return t.next = r,
            o.prev = r,
            e.length++,
            r
        }
        function c(e, t, n) {
            for (var o = t.next, r = 0; r < n && o !== e.tail; r++)
                o = o.next;
            t.next = o,
            o.prev = t,
            e.length -= r
        }
        if (e.Prism = o,
        r.stringify = function e(t, n) {
            if ("string" == typeof t)
                return t;
            if (Array.isArray(t)) {
                var r = "";
                return t.forEach((function(t) {
                    r += e(t, n)
                }
                )),
                r
            }
            var i = {
                type: t.type,
                content: e(t.content, n),
                tag: "span",
                classes: ["token", t.type],
                attributes: {},
                language: n
            }
              , a = t.alias;
            a && (Array.isArray(a) ? Array.prototype.push.apply(i.classes, a) : i.classes.push(a)),
            o.hooks.run("wrap", i);
            var s = "";
            for (var l in i.attributes)
                s += " " + l + '="' + (i.attributes[l] || "").replace(/"/g, "&quot;") + '"';
            return "<" + i.tag + ' class="' + i.classes.join(" ") + '"' + s + ">" + i.content + "</" + i.tag + ">"
        }
        ,
        !e.document)
            return e.addEventListener ? (o.disableWorkerMessageHandler || e.addEventListener("message", (function(t) {
                var n = JSON.parse(t.data)
                  , r = n.language
                  , i = n.code
                  , a = n.immediateClose;
                e.postMessage(o.highlight(i, o.languages[r], r)),
                a && e.close()
            }
            ), !1),
            o) : o;
        var u = o.util.currentScript();
        function d() {
            o.manual || o.highlightAll()
        }
        if (u && (o.filename = u.src,
        u.hasAttribute("data-manual") && (o.manual = !0)),
        !o.manual) {
            var h = document.readyState;
            "loading" === h || "interactive" === h && u && u.defer ? document.addEventListener("DOMContentLoaded", d) : window.requestAnimationFrame ? window.requestAnimationFrame(d) : window.setTimeout(d, 16)
        }
        return o
    }({}/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */
    );
    return "undefined" != typeof module && module.exports && (module.exports = e),
    "undefined" != typeof global && (global.Prism = e),
    e.languages.markup = {
        comment: /<!--[\s\S]*?-->/,
        prolog: /<\?[\s\S]+?\?>/,
        doctype: {
            pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
            greedy: !0,
            inside: {
                "internal-subset": {
                    pattern: /(\[)[\s\S]+(?=\]>$)/,
                    lookbehind: !0,
                    greedy: !0,
                    inside: null
                },
                string: {
                    pattern: /"[^"]*"|'[^']*'/,
                    greedy: !0
                },
                punctuation: /^<!|>$|[[\]]/,
                "doctype-tag": /^DOCTYPE/,
                name: /[^\s<>'"]+/
            }
        },
        cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
        tag: {
            pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
            greedy: !0,
            inside: {
                tag: {
                    pattern: /^<\/?[^\s>\/]+/,
                    inside: {
                        punctuation: /^<\/?/,
                        namespace: /^[^\s>\/:]+:/
                    }
                },
                "attr-value": {
                    pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
                    inside: {
                        punctuation: [{
                            pattern: /^=/,
                            alias: "attr-equals"
                        }, /"|'/]
                    }
                },
                punctuation: /\/?>/,
                "attr-name": {
                    pattern: /[^\s>\/]+/,
                    inside: {
                        namespace: /^[^\s>\/:]+:/
                    }
                }
            }
        },
        entity: [{
            pattern: /&[\da-z]{1,8};/i,
            alias: "named-entity"
        }, /&#x?[\da-f]{1,8};/i]
    },
    e.languages.markup.tag.inside["attr-value"].inside.entity = e.languages.markup.entity,
    e.languages.markup.doctype.inside["internal-subset"].inside = e.languages.markup,
    e.hooks.add("wrap", (function(e) {
        "entity" === e.type && (e.attributes.title = e.content.replace(/&amp;/, "&"))
    }
    )),
    Object.defineProperty(e.languages.markup.tag, "addInlined", {
        value: function(t, n) {
            var o = {};
            o["language-" + n] = {
                pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
                lookbehind: !0,
                inside: e.languages[n]
            },
            o.cdata = /^<!\[CDATA\[|\]\]>$/i;
            var r = {
                "included-cdata": {
                    pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
                    inside: o
                }
            };
            r["language-" + n] = {
                pattern: /[\s\S]+/,
                inside: e.languages[n]
            };
            var i = {};
            i[t] = {
                pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, (function() {
                    return t
                }
                )), "i"),
                lookbehind: !0,
                greedy: !0,
                inside: r
            },
            e.languages.insertBefore("markup", "cdata", i)
        }
    }),
    e.languages.html = e.languages.markup,
    e.languages.mathml = e.languages.markup,
    e.languages.svg = e.languages.markup,
    e.languages.xml = e.languages.extend("markup", {}),
    e.languages.ssml = e.languages.xml,
    e.languages.atom = e.languages.xml,
    e.languages.rss = e.languages.xml,
    function(e) {
        var t = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
        e.languages.css = {
            comment: /\/\*[\s\S]*?\*\//,
            atrule: {
                pattern: /@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,
                inside: {
                    rule: /^@[\w-]+/,
                    "selector-function-argument": {
                        pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
                        lookbehind: !0,
                        alias: "selector"
                    },
                    keyword: {
                        pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
                        lookbehind: !0
                    }
                }
            },
            url: {
                pattern: RegExp("\\burl\\((?:" + t.source + "|" + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ")\\)", "i"),
                greedy: !0,
                inside: {
                    function: /^url/i,
                    punctuation: /^\(|\)$/,
                    string: {
                        pattern: RegExp("^" + t.source + "$"),
                        alias: "url"
                    }
                }
            },
            selector: RegExp("[^{}\\s](?:[^{};\"'\\s]|\\s+(?![\\s{])|" + t.source + ")*(?=\\s*\\{)"),
            string: {
                pattern: t,
                greedy: !0
            },
            property: /(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
            important: /!important\b/i,
            function: /[-a-z0-9]+(?=\()/i,
            punctuation: /[(){};:,]/
        },
        e.languages.css.atrule.inside.rest = e.languages.css;
        var n = e.languages.markup;
        n && (n.tag.addInlined("style", "css"),
        e.languages.insertBefore("inside", "attr-value", {
            "style-attr": {
                pattern: /(^|["'\s])style\s*=\s*(?:"[^"]*"|'[^']*')/i,
                lookbehind: !0,
                inside: {
                    "attr-value": {
                        pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
                        inside: {
                            style: {
                                pattern: /(["'])[\s\S]+(?=["']$)/,
                                lookbehind: !0,
                                alias: "language-css",
                                inside: e.languages.css
                            },
                            punctuation: [{
                                pattern: /^=/,
                                alias: "attr-equals"
                            }, /"|'/]
                        }
                    },
                    "attr-name": /^style/i
                }
            }
        }, n.tag))
    }(e),
    e.languages.clike = {
        comment: [{
            pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
            lookbehind: !0,
            greedy: !0
        }, {
            pattern: /(^|[^\\:])\/\/.*/,
            lookbehind: !0,
            greedy: !0
        }],
        string: {
            pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
            greedy: !0
        },
        "class-name": {
            pattern: /(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,
            lookbehind: !0,
            inside: {
                punctuation: /[.\\]/
            }
        },
        keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
        boolean: /\b(?:true|false)\b/,
        function: /\w+(?=\()/,
        number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
        operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
        punctuation: /[{}[\];(),.:]/
    },
    e.languages.javascript = e.languages.extend("clike", {
        "class-name": [e.languages.clike["class-name"], {
            pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:prototype|constructor))/,
            lookbehind: !0
        }],
        keyword: [{
            pattern: /((?:^|})\s*)(?:catch|finally)\b/,
            lookbehind: !0
        }, {
            pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|(?:get|set)(?=\s*[\[$\w\xA0-\uFFFF])|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
            lookbehind: !0
        }],
        function: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
        number: /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
        operator: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
    }),
    e.languages.javascript["class-name"][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/,
    e.languages.insertBefore("javascript", "keyword", {
        regex: {
            pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
            lookbehind: !0,
            greedy: !0,
            inside: {
                "regex-source": {
                    pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
                    lookbehind: !0,
                    alias: "language-regex",
                    inside: e.languages.regex
                },
                "regex-flags": /[a-z]+$/,
                "regex-delimiter": /^\/|\/$/
            }
        },
        "function-variable": {
            pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
            alias: "function"
        },
        parameter: [{
            pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
            lookbehind: !0,
            inside: e.languages.javascript
        }, {
            pattern: /(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
            inside: e.languages.javascript
        }, {
            pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
            lookbehind: !0,
            inside: e.languages.javascript
        }, {
            pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
            lookbehind: !0,
            inside: e.languages.javascript
        }],
        constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/
    }),
    e.languages.insertBefore("javascript", "string", {
        "template-string": {
            pattern: /`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/,
            greedy: !0,
            inside: {
                "template-punctuation": {
                    pattern: /^`|`$/,
                    alias: "string"
                },
                interpolation: {
                    pattern: /((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,
                    lookbehind: !0,
                    inside: {
                        "interpolation-punctuation": {
                            pattern: /^\${|}$/,
                            alias: "punctuation"
                        },
                        rest: e.languages.javascript
                    }
                },
                string: /[\s\S]+/
            }
        }
    }),
    e.languages.markup && e.languages.markup.tag.addInlined("script", "javascript"),
    e.languages.js = e.languages.javascript,
    e.languages.json = {
        property: {
            pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,
            lookbehind: !0,
            greedy: !0
        },
        string: {
            pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
            lookbehind: !0,
            greedy: !0
        },
        comment: {
            pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
            greedy: !0
        },
        number: /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
        punctuation: /[{}[\],]/,
        operator: /:/,
        boolean: /\b(?:true|false)\b/,
        null: {
            pattern: /\bnull\b/,
            alias: "keyword"
        }
    },
    e.languages.webmanifest = e.languages.json,
    e.languages.python = {
        comment: {
            pattern: /(^|[^\\])#.*/,
            lookbehind: !0
        },
        "string-interpolation": {
            pattern: /(?:f|rf|fr)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,
            greedy: !0,
            inside: {
                interpolation: {
                    pattern: /((?:^|[^{])(?:{{)*){(?!{)(?:[^{}]|{(?!{)(?:[^{}]|{(?!{)(?:[^{}])+})+})+}/,
                    lookbehind: !0,
                    inside: {
                        "format-spec": {
                            pattern: /(:)[^:(){}]+(?=}$)/,
                            lookbehind: !0
                        },
                        "conversion-option": {
                            pattern: /![sra](?=[:}]$)/,
                            alias: "punctuation"
                        },
                        rest: null
                    }
                },
                string: /[\s\S]+/
            }
        },
        "triple-quoted-string": {
            pattern: /(?:[rub]|rb|br)?("""|''')[\s\S]*?\1/i,
            greedy: !0,
            alias: "string"
        },
        string: {
            pattern: /(?:[rub]|rb|br)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,
            greedy: !0
        },
        function: {
            pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,
            lookbehind: !0
        },
        "class-name": {
            pattern: /(\bclass\s+)\w+/i,
            lookbehind: !0
        },
        decorator: {
            pattern: /(^\s*)@\w+(?:\.\w+)*/im,
            lookbehind: !0,
            alias: ["annotation", "punctuation"],
            inside: {
                punctuation: /\./
            }
        },
        keyword: /\b(?:and|as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,
        builtin: /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
        boolean: /\b(?:True|False|None)\b/,
        number: /(?:\b(?=\d)|\B(?=\.))(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?j?\b/i,
        operator: /[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
        punctuation: /[{}[\];(),.:]/
    },
    e.languages.python["string-interpolation"].inside.interpolation.inside.rest = e.languages.python,
    e.languages.py = e.languages.python,
    e.languages.csharp = {
        comment: {
            pattern: /\/\/.*/,
            alias: "comment"
        },
        "string-interpolation": {
            pattern: /(\$@?("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/,
            inside: {
                interpolation: {
                    pattern: /((?:^|[^{])(?:{{)*){[^{}]+}/,
                    lookbehind: true,
                    inside: {
                        "format-spec": {
                            pattern: /(:)[^:(){}]+(?=}$)/,
                            lookbehind: true
                        },
                        "conversion-option": {
                            pattern: /![sra](?=[:}]$)/,
                            alias: "punctuation"
                        },
                        rest: null
                    }
                },
                string: /[\s\S]+/
            }
        },
        "triple-quoted-string": {
            pattern: /(@("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/,
            greedy: true,
            alias: "string"
        },
        string: {
            pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/,
            greedy: true
        },
        "class-name": {
            pattern: /\b(class\s+)\w+/,
            lookbehind: true
        },
        keyword: /\b(?:abstract|as|base|bool|break|byte|case|catch|char|checked|class|const|continue|decimal|default|delegate|do|double|else|enum|event|explicit|extern|false|finally|fixed|float|for|foreach|goto|if|implicit|in|int|interface|internal|is|lock|long|namespace|new|null|object|operator|out|override|params|private|protected|public|readonly|ref|return|sbyte|sealed|short|sizeof|stackalloc|static|string|struct|switch|this|throw|true|try|typeof|uint|ulong|unchecked|unsafe|ushort|using|virtual|void|volatile|while|Console)\b/,
        builtin: /\b(?:object|bool|byte|sbyte|char|decimal|double|float|int|uint|long|ulong|short|ushort|string|void|Length|ReadLine|WriteLine)\b/,
        boolean: /\b(?:true|false)\b/,
        number: /\b(?:0x[\da-f]+|(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?[dfl]?)\b/i,
        operator: /[-+*\/%=]=?|!=|&&?|\|\|?|\?\.?|<[<=]?|>[>=]?|=>?|~|\b(?:is|as|sizeof)\b/,
        punctuation: /[{}[\];(),.:]/
    },
    e.languages.csharp["string-interpolation"].inside.interpolation.inside.rest = e.languages.csharp.string,
    e.languages.cs = e.languages.csharp,
    function(e) {
        e.languages.ruby = e.languages.extend("clike", {
            comment: [/#.*/, {
                pattern: /^=begin\s[\s\S]*?^=end/m,
                greedy: !0
            }],
            "class-name": {
                pattern: /(\b(?:class)\s+|\bcatch\s+\()[\w.\\]+/i,
                lookbehind: !0,
                inside: {
                    punctuation: /[.\\]/
                }
            },
            keyword: /\b(?:alias|and|BEGIN|begin|break|case|class|def|define_method|defined|do|each|else|elsif|END|end|ensure|extend|for|if|in|include|module|new|next|nil|not|or|prepend|protected|private|public|raise|redo|require|rescue|retry|return|self|super|then|throw|undef|unless|until|when|while|yield)\b/
        });
        var t = {
            pattern: /#\{[^}]+\}/,
            inside: {
                delimiter: {
                    pattern: /^#\{|\}$/,
                    alias: "tag"
                },
                rest: e.languages.ruby
            }
        };
        delete e.languages.ruby.function,
        e.languages.insertBefore("ruby", "keyword", {
            regex: [{
                pattern: RegExp(/%r/.source + "(?:" + [/([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1[gim]{0,3}/.source, /\((?:[^()\\]|\\[\s\S])*\)[gim]{0,3}/.source, /\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}[gim]{0,3}/.source, /\[(?:[^\[\]\\]|\\[\s\S])*\][gim]{0,3}/.source, /<(?:[^<>\\]|\\[\s\S])*>[gim]{0,3}/.source].join("|") + ")"),
                greedy: !0,
                inside: {
                    interpolation: t
                }
            }, {
                pattern: /(^|[^/])\/(?!\/)(?:\[[^\r\n\]]+\]|\\.|[^[/\\\r\n])+\/[gim]{0,3}(?=\s*(?:$|[\r\n,.;})]))/,
                lookbehind: !0,
                greedy: !0
            }],
            variable: /[@$]+[a-zA-Z_]\w*(?:[?!]|\b)/,
            symbol: {
                pattern: /(^|[^:]):[a-zA-Z_]\w*(?:[?!]|\b)/,
                lookbehind: !0
            },
            "method-definition": {
                pattern: /(\bdef\s+)[\w.]+/,
                lookbehind: !0,
                inside: {
                    function: /\w+$/,
                    rest: e.languages.ruby
                }
            }
        }),
        e.languages.insertBefore("ruby", "number", {
            builtin: /\b(?:Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Stat|Fixnum|Float|Hash|Integer|IO|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|String|Struct|TMS|Symbol|ThreadGroup|Thread|Time|TrueClass)\b/,
            constant: /\b[A-Z]\w*(?:[?!]|\b)/
        }),
        e.languages.ruby.string = [{
            pattern: RegExp(/%[qQiIwWxs]?/.source + "(?:" + [/([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1/.source, /\((?:[^()\\]|\\[\s\S])*\)/.source, /\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}/.source, /\[(?:[^\[\]\\]|\\[\s\S])*\]/.source, /<(?:[^<>\\]|\\[\s\S])*>/.source].join("|") + ")"),
            greedy: !0,
            inside: {
                interpolation: t
            }
        }, {
            pattern: /("|')(?:#\{[^}]+\}|#(?!\{)|\\(?:\r\n|[\s\S])|(?!\1)[^\\#\r\n])*\1/,
            greedy: !0,
            inside: {
                interpolation: t
            }
        }],
        e.languages.rb = e.languages.ruby
    }(e),
    e
}
)),
/*! Toxilib code_highlighter
 * Copyright 2014 Toxicode, pierre.lancien @ toxicode.fr
*/
define("toxilibs/code_highlighter", ["jquery", "./css_injector", "./extlibs/prism"], (function(e, t, n) {
    function o(t, o="javascript") {
        const r = e(`<pre><code class="language-${o}">${t}</code></pre>`);
        return n.highlightElement(r.find("code")[0]),
        r
    }
    return o.setTheme = function(e) {
        t({
            file: require.toUrl(`toxilibs/extlibs/prism_${e}.css`)
        })
    }
    ,
    o
}
)),
define("modules/javascript", ["core/question_generator_helper", "toxilibs/code_highlighter"], (function(QuestionGeneratorHelper, codeHighlighter) {
    codeHighlighter.setTheme("bright"),
    QuestionGeneratorHelper.prototype.addJSCode = function(source) {
        void 0 === this.answer && (this.answer = eval(source)),
        this.container.append(codeHighlighter(source))
    }
}
)),
/*! Toxilib vector
 * Copyright 2014 Toxicode, pierre.lancien @ toxicode.fr
*/
define("toxilibs/vector", [], (function() {
    let e = Math.PI / 180;
    function t(t, n=!1) {
        if (!1 !== n)
            this.x = t,
            this.y = n;
        else if ("x"in t)
            this.x = t.x,
            this.y = t.y;
        else if ("from"in t) {
            const {from: e, to: n} = t;
            this.x = n.x - e.x,
            this.y = n.y - e.y,
            "length"in t && this.setLength$(t.length)
        } else if ("direction"in t) {
            const n = e * t.direction
              , {length: o=1} = t;
            this.x = o * Math.cos(n),
            this.y = o * Math.sin(n)
        }
    }
    function n() {
        return Math.atan2(this.y, this.x) / e
    }
    function o() {
        return Math.atan2(this.y, this.x)
    }
    function r(t) {
        const n = t * e;
        return this.setDirectionRad$(n)
    }
    function i(e) {
        const {length: t} = this;
        return this.x = t * Math.cos(e),
        this.y = t * Math.sin(e),
        this
    }
    function a(e, t) {
        if (0 === t)
            throw new Error("can not change length of a 0 length vector")
    }
    return Object.defineProperty(t.prototype, "length", {
        enumerable: !0,
        get: function() {
            return Math.sqrt(this.x * this.x + this.y * this.y)
        },
        set: function(e) {
            this.setLength$(e)
        }
    }),
    Object.defineProperty(t.prototype, "angle", {
        enumerable: !1,
        get: n,
        set: r
    }),
    Object.defineProperty(t.prototype, "angleRad", {
        enumerable: !1,
        get: o,
        set: i
    }),
    Object.defineProperty(t.prototype, "direction", {
        enumerable: !0,
        get: n,
        set: r
    }),
    Object.defineProperty(t.prototype, "directionRad", {
        enumerable: !1,
        get: o,
        set: i
    }),
    t.prototype.isNull = function() {
        return 0 === this.x && 0 === this.y
    }
    ,
    t.prototype.clone = function() {
        return new t(this)
    }
    ,
    t.prototype.plus = function({x: e, y: n}) {
        return new t(this.x + e,this.y + n)
    }
    ,
    t.prototype.add = function({x: e, y: t}) {
        return this.x += e,
        this.y += t,
        this
    }
    ,
    t.prototype.plus$ = t.prototype.add,
    t.prototype.minus = function({x: e, y: n}) {
        return new t(this.x - e,this.y - n)
    }
    ,
    t.prototype.substract = function({x: e, y: t}) {
        return this.x -= e,
        this.y -= t,
        this
    }
    ,
    t.prototype.minus$ = t.prototype.substract,
    t.prototype.multiply = function(e) {
        return new t(this.x * e,this.y * e)
    }
    ,
    t.prototype.multiply$ = function(e) {
        return this.x *= e,
        this.y *= e,
        this
    }
    ,
    t.prototype.setLength = function(e) {
        if (0 === e)
            return new t(0,0);
        const {length: n} = this;
        return a(this, n),
        this.multiply(e / n)
    }
    ,
    t.prototype.setLength$ = function(e) {
        if (0 === e)
            return this.x = 0,
            this.y = 0,
            this;
        const {length: t} = this;
        return a(this, t),
        this.multiply$(e / t)
    }
    ,
    t.prototype.normalize = function() {
        const {length: e} = this;
        return a(this, e),
        this.multiply(1 / e)
    }
    ,
    t.prototype.normalize$ = function() {
        const {length: e} = this;
        return a(this, e),
        this.multiply$(1 / e)
    }
    ,
    t.prototype.addToLength = function(e) {
        const {length: t} = this;
        return a(this, t),
        this.multiply((t + e) / t)
    }
    ,
    t.prototype.addToLength$ = function(e) {
        const {length: t} = this;
        return a(this, t),
        this.multiply$((t + e) / t)
    }
    ,
    t.prototype.rotate90 = function() {
        return new t(-this.y,this.x)
    }
    ,
    t.prototype.rotate90$ = function() {
        const e = this.x;
        return this.x = -this.y,
        this.y = e,
        this
    }
    ,
    t.prototype.rotate = function(t) {
        return this.rotateRad(t * e)
    }
    ,
    t.prototype.rotate$ = function(t) {
        return this.rotateRad$(t * e)
    }
    ,
    t.prototype.rotateRad = function(e) {
        const n = Math.sin(e)
          , o = Math.cos(e);
        return new t(this.x * o - this.y * n,this.x * n + this.y * o)
    }
    ,
    t.prototype.rotateRad$ = function(e) {
        const t = Math.sin(e)
          , n = Math.cos(e)
          , o = this.x;
        return this.x = this.x * n - this.y * t,
        this.y = o * t + this.y * n,
        this
    }
    ,
    t.prototype.setDirection = function(e) {
        return new t({
            length: this.length,
            direction: e
        })
    }
    ,
    t.prototype.setDirection$ = r,
    t.prototype.setDirectionRad$ = i,
    t.prototype.dotProduct = function({x: e, y: t}) {
        return this.x * e + this.y * t
    }
    ,
    t.prototype.crossProduct = function({x: e, y: t}) {
        return this.x * t - this.y * e
    }
    ,
    t.prototype.projectOn = function(e) {
        return e.multiply(this.dotProduct(e))
    }
    ,
    t
}
)),
/*! Toxilib color_oklab
 * Copyright 2014 Toxicode, pierre.lancien @ toxicode.fr
*/
define("toxilibs/color_oklab", [], (function() {
    function e({red: e, green: t, blue: n}) {
        e = d(e),
        t = d(t),
        n = d(n);
        const o = Math.cbrt(.4122214708 * e + .5363325363 * t + .0514459929 * n)
          , r = Math.cbrt(.2119034982 * e + .6806995451 * t + .1073969566 * n)
          , i = Math.cbrt(.0883024619 * e + .2817188376 * t + .6299787005 * n)
          , a = .2104542553 * o + .793617785 * r - .0040720468 * i
          , s = 1.9779984951 * o - 2.428592205 * r + .4505937099 * i
          , l = .0259040371 * o + .7827717662 * r - .808675766 * i
          , c = Math.sqrt(s * s + l * l);
        let u = Math.atan2(l, s) / (2 * Math.PI);
        return u < 0 && (u += 1),
        {
            L: a,
            a: s,
            b: l,
            C: c,
            h: u
        }
    }
    function t(e) {
        const {red: t, green: o, blue: r} = n(e)
          , {opacity: i=1} = e;
        return {
            red: f(t),
            green: f(o),
            blue: f(r),
            opacity: i
        }
    }
    function n({L: e, a: t, b: n, C: r, h: i=!1}) {
        if (!1 !== i) {
            let e = 2 * i * Math.PI;
            t = r * Math.cos(e),
            n = r * Math.sin(e)
        }
        let a = e + .3963377774 * t + .2158037573 * n
          , s = e - .1055613458 * t - .0638541728 * n
          , l = e - .0894841775 * t - 1.291485548 * n;
        return a *= a * a,
        s *= s * s,
        l *= l * l,
        o(a, s, l)
    }
    function o(e, t, n) {
        return {
            red: 4.0767416621 * e - 3.3077115913 * t + .2309699292 * n,
            green: -1.2684380046 * e + 2.6097574011 * t - .3413193965 * n,
            blue: -.0041960863 * e - .7034186147 * t + 1.707614701 * n
        }
    }
    function r(e, t) {
        let o = function(e, t) {
            let n, o, r, i, a, s, l, c;
            -1.88170328 * e - .80936493 * t > 1 ? (n = 1.19086277,
            o = 1.76576728,
            r = .59662641,
            i = .75515197,
            a = .56771245,
            s = 4.0767416621,
            l = -3.3077115913,
            c = .2309699292) : 1.81444104 * e - 1.19445276 * t > 1 ? (n = .73956515,
            o = -.45954404,
            r = .08285427,
            i = .1254107,
            a = .14503204,
            s = -1.2684380046,
            l = 2.6097574011,
            c = -.3413193965) : (n = 1.35733652,
            o = -.00915799,
            r = -1.1513021,
            i = -.50559606,
            a = .00692167,
            s = -.0041960863,
            l = -.7034186147,
            c = 1.707614701);
            let u = n + o * e + r * t + i * e * e + a * e * t
              , d = .3963377774 * e + .2158037573 * t
              , h = -.1055613458 * e - .0638541728 * t
              , f = -.0894841775 * e - 1.291485548 * t;
            {
                let e = 1 + u * d
                  , t = 1 + u * h
                  , n = 1 + u * f
                  , o = s * (e * e * e) + l * (t * t * t) + c * (n * n * n)
                  , r = s * (3 * d * e * e) + l * (3 * h * t * t) + c * (3 * f * n * n);
                u -= o * r / (r * r - .5 * o * (s * (6 * d * d * e) + l * (6 * h * h * t) + c * (6 * f * f * n)))
            }
            return u
        }(e, t);
        const {red: r, green: i, blue: a} = n({
            L: 1,
            a: o * e,
            b: o * t
        });
        let s = Math.cbrt(1 / Math.max(r, i, a));
        return [s, s * o]
    }
    const i = .206
      , a = .03
      , s = 1.1708737864;
    function l(e) {
        let t = s * e - i;
        return .5 * (t + Math.sqrt(t * t + 4 * a * s * e))
    }
    function c(e) {
        return e * (e + i) / (s * (e + a))
    }
    function u(e, t, n=r(e, t)) {
        const [o,i] = n;
        return [i / o, i / (1 - o)]
    }
    function d(e) {
        return e <= .04045 ? e / 12.92 : Math.pow((e + .055) / 1.055, 2.4)
    }
    const h = 1 / 2.4;
    function f(e) {
        return e < 0 ? 0 : e <= .0031308 ? 12.92 * e : Math.min(1, 1.055 * Math.pow(e, h) - .055)
    }
    return {
        convertSRGBToOklab: e,
        convertSRGBToOkHSV: function(t) {
            let {L: o, a: r, b: i} = e(t);
            if (0 === o)
                return {
                    hue: 0,
                    saturation: 0,
                    value: 0
                };
            let a = Math.sqrt(r * r + i * i)
              , s = r / a
              , d = i / a
              , h = .5 + .5 * Math.atan2(-i, -r) / Math.PI
              , [f,p] = u(s, d)
              , g = 1 - .5 / f
              , m = p / (a + o * p)
              , y = m * o
              , x = m * a
              , v = c(y)
              , b = x * v / y
              , {red: w, green: C, blue: S} = n({
                L: v,
                a: s * b,
                b: d * b
            })
              , _ = Math.cbrt(1 / Math.max(w, C, S, 0));
            return o /= _,
            a /= _,
            a = a * l(o) / o,
            o = l(o),
            {
                hue: h,
                saturation: (.5 + p) * x / (.5 * p + p * g * x),
                value: o / y
            }
        },
        convertOklabToSRGB: t,
        convertOkHSVToSRGB: function({hue: e, saturation: o, value: r, opacity: i=1}) {
            if (r < .003)
                return {
                    red: 0,
                    green: 0,
                    blue: 0
                };
            const a = 2 * Math.PI * e
              , s = Math.cos(a)
              , l = Math.sin(a);
            let d = u(s, l)
              , h = d[0]
              , f = .5
              , p = d[1]
              , g = 1 - f / h
              , m = 1 - o * f / (f + p - p * g * o)
              , y = o * p * f / (f + p - p * g * o)
              , x = r * m
              , v = r * y
              , b = c(m)
              , w = y * b / m
              , C = c(x);
            v = v * C / x,
            x = C;
            let {red: S, green: _, blue: T} = n({
                L: b,
                a: s * w,
                b: l * w
            })
              , k = Math.cbrt(1 / Math.max(S, _, T, 0));
            return x *= k,
            v *= k,
            t({
                L: x,
                a: v * s,
                b: v * l,
                opacity: i
            })
        },
        convertOkHSLToSRGB: function({hue: e, saturation: n=.9, lightness: i=.7, opacity: a=1}) {
            if (i > .997)
                return {
                    red: 1,
                    green: 1,
                    blue: 1
                };
            if (i < .003)
                return {
                    red: 0,
                    green: 0,
                    blue: 0
                };
            const s = 2 * Math.PI * e
              , l = Math.cos(s)
              , d = Math.sin(s)
              , h = c(i)
              , {C0: f, Cmid: p, Cmax: g} = function(e, t, n) {
                const i = r(t, n);
                let a = function(e, t, n, i, a, s=r(e, t)) {
                    const [l,c] = s;
                    let u;
                    if ((n - a) * c - (l - a) * i <= 0)
                        u = c * a / (i * l + c * (a - n));
                    else {
                        u = c * (a - 1) / (i * (l - 1) + c * (a - n));
                        {
                            let r = n - a
                              , s = .3963377774 * e + .2158037573 * t
                              , l = -.1055613458 * e - .0638541728 * t
                              , c = -.0894841775 * e - 1.291485548 * t
                              , d = r + i * s
                              , h = r + i * l
                              , f = r + i * c;
                            {
                                let e = a * (1 - u) + u * n
                                  , t = u * i
                                  , r = e + t * s
                                  , p = e + t * l
                                  , g = e + t * c
                                  , m = r * r * r
                                  , y = p * p * p
                                  , x = g * g * g
                                  , v = 3 * d * r * r
                                  , b = 3 * h * p * p
                                  , w = 3 * f * g * g
                                  , C = 6 * d * d * r
                                  , S = 6 * h * h * p
                                  , _ = 6 * f * f * g
                                  , {red: T, green: k, blue: A} = o(m, y, x);
                                T -= 1,
                                k -= 1,
                                A -= 1;
                                let {red: P, green: M, blue: E} = o(v, b, w)
                                  , {red: L, green: D, blue: q} = o(C, S, _)
                                  , F = 1 / (P - .5 * T * L / P)
                                  , O = F < 0 ? 1e6 : -T * F
                                  , j = 1 / (M - .5 * k * D / M)
                                  , I = j < 0 ? 1e6 : -k * j
                                  , R = 1 / (E - .5 * A * q / E)
                                  , N = R < 0 ? 1e6 : -A * R;
                                u += Math.min(O, I, N)
                            }
                        }
                    }
                    return u
                }(t, n, e, 1, e, i)
                  , s = u(t, n, i);
                const l = .11516993 + 1 / (7.4477897 + 4.1590124 * n + t * (1.75198401 * n - 2.19557347 + t * (-2.13704948 - 10.02301043 * n + t * (5.38770819 * n - 4.24894561 + 4.69891013 * t))))
                  , c = .11239642 + 1 / (1.6132032 - .68124379 * n + t * (.40370612 + .90148123 * n + t * (.6122399 * n - .27087943 + t * (.00299215 - .45399568 * n - .14661872 * t))));
                let d = a / Math.min(e * s[0], (1 - e) * s[1])
                  , h = e * l
                  , f = (1 - e) * c;
                const p = 1 / (1 / (h * h * h * h) + 1 / (f * f * f * f));
                let g = .9 * d * Math.sqrt(Math.sqrt(p));
                h = .4 * e,
                f = .8 * (1 - e);
                const m = 1 / (h * h) + 1 / (f * f)
                  , y = Math.sqrt(1 / m);
                return {
                    C0: y,
                    Cmid: g,
                    Cmax: a
                }
            }(h, l, d);
            let m, y, x, v;
            n < .8 ? (m = 1.25 * n,
            y = 0,
            x = .8 * f,
            v = 1 - x / p) : (m = 5 * (n - .8),
            y = p,
            x = .3125 * p * p / f,
            v = 1 - x / (g - p));
            let b = y + m * x / (1 - v * m);
            return t({
                L: h,
                a: b * l,
                b: b * d,
                opacity: a
            })
        }
    }
}
)),
/*! Toxilib color
 * Copyright 2014 Toxicode, pierre.lancien @ toxicode.fr
*/
define("toxilibs/color", ["./color_oklab"], (function(e) {
    const {convertSRGBToOklab: t, convertSRGBToOkHSV: n, convertOklabToSRGB: o, convertOkHSLToSRGB: r, convertOkHSVToSRGB: i} = e;
    function a(e, t, n, o=1) {
        const i = typeof e;
        "number" === i ? (this.red = e,
        this.green = t,
        this.blue = n,
        this.opacity = o) : "object" === i ? function(e, t) {
            const {opacity: n=1} = t;
            if (e.opacity = n,
            "red"in t)
                e.red = t.red,
                e.green = t.green,
                e.blue = t.blue;
            else if ("hue"in t)
                if (t.perceptual) {
                    let {red: n, green: o, blue: i} = r(t);
                    e.red = n,
                    e.green = o,
                    e.blue = i
                } else
                    !function(e, {hue: t, saturation: n=1, lightness: o=.5}) {
                        (t > 1 || t < 0) && (t -= Math.floor(t));
                        n = M(n),
                        o = M(o);
                        const r = function(e, t, n) {
                            const o = w(n, t)
                              , r = 2 * n - o;
                            return e *= 6,
                            {
                                red: C(r, o, e + 2),
                                green: C(r, o, e),
                                blue: C(r, o, e - 2)
                            }
                        }(t, n, o);
                        e.red = r.red,
                        e.green = r.green,
                        e.blue = r.blue,
                        e.hslValues = {
                            hue: t,
                            saturation: n,
                            lightness: o
                        }
                    }(e, t);
            else
                "light"in t ? function(e, {light: t}) {
                    e.red = t,
                    e.green = t,
                    e.blue = t
                }(e, t) : "red255"in t ? function(e, {red255: t, green255: n, blue255: o}) {
                    e.red = t / 255,
                    e.green = n / 255,
                    e.blue = o / 255
                }(e, t) : function(e, t) {
                    if ("lightLinear"in t) {
                        const n = x(t.lightLinear);
                        e.red = n,
                        e.green = n,
                        e.blue = n
                    } else
                        "redLinear"in t && (e.red = x(t.redLinear),
                        e.green = x(t.greenLinear),
                        e.blue = x(t.blueLinear))
                }(e, t)
        }(this, e) : function(e, t) {
            const n = S(t);
            e.red = n.red,
            e.green = n.green,
            e.blue = n.blue,
            e.opacity = n.opacity
        }(this, e)
    }
    function s(e, t) {
        return (e % t + t) % t
    }
    function l(e) {
        return {
            red: e,
            green: e,
            blue: e
        }
    }
    function c(e) {
        return {
            red: e = g(e),
            green: e,
            blue: e
        }
    }
    function u(e) {
        let {red: t, green: n, blue: o} = e;
        const r = Math.max(t, n, o)
          , i = Math.min(t, n, o)
          , a = (r + i) / 2
          , s = r - i;
        e.hslValues = 0 === s ? {
            lightness: a,
            hue: 0,
            saturation: 0
        } : {
            lightness: a,
            hue: h(r, t, n, o, s),
            saturation: d(a, s, i, r)
        }
    }
    function d(e, t, n, o) {
        return e > .5 ? t / (2 - o - n) : t / (o + n)
    }
    function h(e, t, n, o, r) {
        return e === o ? (4 + (t - n) / r) / 6 : e === n ? (2 + (o - t) / r) / 6 : n < o ? 1 + (n - o) / (6 * r) : (n - o) / (6 * r)
    }
    function f(e, t, n) {
        const o = w(n, t)
          , r = 2 * n - o;
        return {
            red: g(C(r, o, (e *= 6) + 2)),
            green: g(C(r, o, e)),
            blue: g(C(r, o, e - 2))
        }
    }
    function p({red: e, green: t, blue: n}) {
        return {
            red: g(e),
            green: g(t),
            blue: g(n)
        }
    }
    function g(e) {
        return Math.floor(255.999 * e)
    }
    function m(e) {
        return e <= .04045 ? e / 12.92 : Math.pow((e + .055) / 1.055, 2.4)
    }
    a.createFromOklab = function(e) {
        return new a(o(e))
    }
    ,
    a.createFromOkHSL = function(e) {
        return new a(r(e))
    }
    ,
    a.createFromOkHSV = function(e) {
        return new a(i(e))
    }
    ,
    a.autoConvertToRGB = function(e, t, n) {
        const o = typeof e;
        return "object" === o ? function(e) {
            if ("red"in e)
                return e;
            if ("hue"in e)
                return function({hue: e, saturation: t=1, lightness: n=.5}) {
                    (e > 1 || e < 0) && (e -= Math.floor(e));
                    t = M(t);
                    const o = w(n = M(n), t)
                      , r = 2 * n - o;
                    return {
                        red: C(r, o, (e *= 6) + 2),
                        green: C(r, o, e),
                        blue: C(r, o, e - 2)
                    }
                }(e);
            if ("red255"in e)
                return {
                    red: e.red255 / 255,
                    green: e.green255 / 255,
                    blue: e.blue255 / 255
                };
            if ("light"in e)
                return l(e.light);
            if ("lightLinear"in e)
                return l(x(e.lightLinear));
            if ("redLinear"in e)
                return {
                    red: x((t = e).redLinear),
                    green: x(t.greenLinear),
                    blue: x(t.blueLinear)
                };
            var t;
            return null
        }(e) : "string" === o ? S(e) : {
            red: e,
            green: t,
            blue: n
        }
    }
    ,
    a.convertHexToRGB = T,
    a.convertCSSToRGB = S,
    a.autoConvertToRGB255 = function(e, t, n) {
        const o = typeof e;
        if ("object" === o) {
            if ("red"in e)
                return p(e);
            if ("red255"in e)
                return {
                    red: e.red255,
                    green: e.green255,
                    blue: e.blue255
                };
            if ("hue"in e)
                return function({hue: e, saturation: t=1, lightness: n=.5, perceptual: o}) {
                    (e > 1 || e < 0) && (e -= Math.floor(e));
                    if (t = M(t),
                    n = M(n),
                    o)
                        return p(r({
                            hue: e,
                            saturation: t,
                            lightness: n
                        }));
                    {
                        const o = w(n, t)
                          , r = 2 * n - o;
                        return {
                            red: g(C(r, o, (e *= 6) + 2)),
                            green: g(C(r, o, e)),
                            blue: g(C(r, o, e - 2))
                        }
                    }
                }(e);
            if ("light"in e)
                return c(e.light);
            if ("lightLinear"in e)
                return c(x(e.lightLinear));
            if ("redLinear"in e)
                return {
                    red: v((i = e).redLinear),
                    green: v(i.greenLinear),
                    blue: v(i.blueLinear)
                }
        } else if ("string" === o)
            return p(S(e));
        var i;
        return p({
            red: e,
            green: t,
            blue: n
        })
    }
    ,
    a.convertTo255 = g,
    a.convertToSRGB = x,
    a.convertSRGBToOklab = t,
    a.convertSRGBToOkHSV = n,
    a.convertOklabToSRGB = o,
    a.isCSSColor = function(e) {
        return e in a.allCSSColors || A.test(e) || P.test(e)
    }
    ,
    a.modifyHSLOfRGB255 = function(e, t, n, o={}) {
        const r = function(e, t, n) {
            e /= 255,
            t /= 255,
            n /= 255;
            const o = Math.max(e, t, n)
              , r = Math.min(e, t, n)
              , i = (o + r) / 2
              , a = o - r;
            if (0 === a)
                return {
                    hue: 0,
                    saturation: 0,
                    lightness: i
                };
            {
                const s = d(i, a, r, o);
                return {
                    hue: h(o, e, t, n, a),
                    saturation: s,
                    lightness: i
                }
            }
        }(e, t, n);
        if ("function" == typeof o) {
            const e = o(r.hue, r.saturation, r.lightness);
            return f(e[0], e[1], e[2])
        }
        return E(r, o),
        f(r.hue, r.saturation, r.lightness)
    }
    ,
    Object.defineProperty(a.prototype, "hue", {
        enumerable: !0,
        get: function() {
            return this.hslValues || u(this),
            this.hslValues.hue
        }
    }),
    Object.defineProperty(a.prototype, "saturation", {
        enumerable: !0,
        get: function() {
            return this.hslValues || u(this),
            this.hslValues.saturation
        }
    }),
    Object.defineProperty(a.prototype, "lightness", {
        enumerable: !0,
        get: function() {
            return this.hslValues || u(this),
            this.hslValues.lightness
        }
    }),
    Object.defineProperty(a.prototype, "luminance", {
        enumerable: !0,
        get: function() {
            return b(this)
        }
    }),
    Object.defineProperty(a.prototype, "perceptualLightness", {
        enumerable: !0,
        get: function() {
            const e = b(this);
            return e <= .008856 ? 903.3 * e : 116 * Math.pow(e, .333) - 16
        }
    }),
    Object.defineProperty(a.prototype, "red255", {
        enumerable: !0,
        get: function() {
            return g(this.red)
        }
    }),
    Object.defineProperty(a.prototype, "green255", {
        enumerable: !0,
        get: function() {
            return g(this.green)
        }
    }),
    Object.defineProperty(a.prototype, "blue255", {
        enumerable: !0,
        get: function() {
            return g(this.blue)
        }
    }),
    Object.defineProperty(a.prototype, "redLinear", {
        enumerable: !0,
        get: function() {
            return m(this.red)
        }
    }),
    Object.defineProperty(a.prototype, "greenLinear", {
        enumerable: !0,
        get: function() {
            return m(this.green)
        }
    }),
    Object.defineProperty(a.prototype, "blueLinear", {
        enumerable: !0,
        get: function() {
            return m(this.blue)
        }
    }),
    a.prototype.toOklab = function() {
        return t(this)
    }
    ,
    a.prototype.toString = function() {
        return 1 === this.opacity ? `rgb(${g(this.red)},${g(this.green)},${g(this.blue)})` : `rgba(${g(this.red)},${g(this.green)},${g(this.blue)},${this.opacity})`
    }
    ,
    a.prototype.toCSSString = a.prototype.toString,
    a.prototype.getHSL = function() {
        this.hslValues || u(this);
        const {hslValues: e} = this;
        return {
            hue: e.hue,
            saturation: e.saturation,
            lightness: e.lightness
        }
    }
    ,
    a.prototype.modifyHSL = function(e={}) {
        const t = this.getHSL();
        return E(t, e),
        t.opacity = function(e, t) {
            if ("opacity"in t)
                return M(t.opacity);
            if ("fadeOut"in t)
                return M(e * (1 - t.fadeOut));
            if ("fadeIn"in t)
                return M(e + (1 - e) * t.fadeIn);
            return e
        }(this.opacity, e),
        new a(t)
    }
    ,
    a.prototype.modifyHSLA = a.prototype.modifyHSL,
    a.prototype.writeOnItWithDark = function() {
        return this.perceptualLightness > 50
    }
    ,
    a.prototype.clone = function() {
        const e = new a(this);
        return "hslValues"in this && (e.hslValues = this.hslValues),
        e
    }
    ,
    a.prototype.isCloseTo = function(e) {
        "string" == typeof e && (e = new a(e));
        const t = a.convertSRGBToOkHSV(this)
          , n = a.convertSRGBToOkHSV(e);
        let o = t.value - n.value
          , r = (t.value + n.value) / 2
          , i = Math.min(t.value, n.value);
        if (i > .2) {
            if (Math.abs(o) > .2)
                return !1
        } else if (i > .1) {
            if (Math.abs(o) > .1)
                return !1
        } else if (Math.abs(o) > .06)
            return !1;
        if (Math.min(t.value, n.value) < .1)
            return !0;
        let l = t.saturation - n.saturation;
        if (Math.abs(l) > .4)
            return !1;
        if (Math.min(t.value, n.value) < .15)
            return !0;
        if (Math.max(t.saturation, n.saturation) > .1 + .15 * r) {
            let e = s(.5 + t.hue - n.hue, 1) - .5;
            if (Math.abs(e) > .1)
                return !1
        }
        return !0
    }
    ;
    const y = 1 / 2.4;
    function x(e) {
        return e < 0 ? 0 : e <= .0031308 ? 12.92 * e : Math.min(1, 1.055 * Math.pow(e, y) - .055)
    }
    function v(e) {
        return g(x(e))
    }
    function b(e) {
        return .2126 * m(e.red) + .7152 * m(e.green) + .0722 * m(e.blue)
    }
    function w(e, t) {
        return e < .5 ? e * (1 + t) : e + t - e * t
    }
    function C(e, t, n) {
        return n < 0 ? n += 6 : n > 6 && (n -= 6),
        n < 1 ? e + (t - e) * n : n < 3 ? t : n < 4 ? e + (t - e) * (4 - n) : e
    }
    function S(e) {
        if ("#" === e[0])
            return T(e);
        if (e.startsWith("rgb"))
            return function(e) {
                const t = e.match(k)[1]
                  , [n,o,r,i="1"] = t.split(",");
                return {
                    red: parseInt(n, 10) / 255,
                    green: parseInt(o, 10) / 255,
                    blue: parseInt(r, 10) / 255,
                    opacity: parseFloat(i, 10)
                }
            }(e);
        const t = a.allCSSColors[e];
        if (t)
            return T(t);
        throw new Error(`color "${e}" not recognized`)
    }
    const _ = 16 / 17;
    function T(e) {
        return e.length < 6 ? {
            red: q[e[1]],
            green: q[e[2]],
            blue: q[e[3]],
            opacity: 1
        } : {
            red: q[e[1]] * _ + q[e[2]] / 17,
            green: q[e[3]] * _ + q[e[4]] / 17,
            blue: q[e[5]] * _ + q[e[6]] / 17,
            opacity: 1
        }
    }
    const k = /^rgba?\((.*)\)$/
      , A = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
      , P = /^rgba?\([0-9\s,.]*\)$/;
    function M(e) {
        return Math.max(Math.min(e, 1), 0)
    }
    function E(e, t) {
        "hue"in t && (e.hue = t.hue),
        "addHue"in t && (e.hue += t.addHue),
        e.saturation = function(e, t) {
            return "saturation"in t ? M(t.saturation) : "unsaturate"in t ? M(e * (1 - t.unsaturate)) : "saturate"in t ? M(e + (1 - e) * t.saturate) : e
        }(e.saturation, t),
        e.lightness = function(e, t) {
            return "lightness"in t ? M(t.lightness) : "darken"in t ? M(e * (1 - t.darken)) : "enlight"in t ? M(e + (1 - e) * t.enlight) : e
        }(e.lightness, t)
    }
    const L = {
        a: {
            phase: [0, .33, .67]
        },
        dark: {
            phase: [.55, .45, .45]
        },
        dark2: {
            frequency: [.7, .7, .7],
            phase: [.55, .45, .45]
        }
    }
      , D = 2 * Math.PI;
    a.getColorMapper = function({colorCount: e=300, palette: t="dark2", cycle: n=!1, useIndexes: o=!1, outputAsRGB255: r=!0}={}) {
        let i = []
          , {zero: a=[.5, .5, .5], amplitude: l=[.5, .5, .5], frequency: c=[1, 1, 1], phase: u} = L[t];
        function d(e, t) {
            return a[t] + l[t] * Math.cos(D * (c[t] * e + u[t]))
        }
        function h(e, t) {
            return g(d(e, t))
        }
        const f = e - 1;
        for (let t = 0; t < e; t++) {
            let e = t / f;
            r ? i.push({
                red255: h(e, 0),
                green255: h(e, 1),
                blue255: h(e, 2)
            }) : i.push({
                red: d(e, 0),
                green: d(e, 1),
                blue: d(e, 2)
            })
        }
        return n ? o ? t=>i[0 | s(t, e)] : t=>((t >= 1 || t < 0) && (t -= Math.floor(t)),
        i[e * t | 0]) : o ? e=>i[Math.max(0, Math.min(0 | e, f))] : t=>i[e * Math.max(0, Math.min(t, .99999)) | 0]
    }
    ,
    a.allCSSColors = {
        aliceblue: "#f0f8ff",
        antiquewhite: "#faebd7",
        aqua: "#00ffff",
        aquamarine: "#7fffd4",
        azure: "#f0ffff",
        beige: "#f5f5dc",
        bisque: "#ffe4c4",
        black: "#000000",
        blanchedalmond: "#ffebcd",
        blue: "#0000ff",
        blueviolet: "#8a2be2",
        brown: "#a52a2a",
        burlywood: "#deb887",
        cadetblue: "#5f9ea0",
        chartreuse: "#7fff00",
        chocolate: "#d2691e",
        coral: "#ff7f50",
        cornflowerblue: "#6495ed",
        cornsilk: "#fff8dc",
        crimson: "#dc143c",
        cyan: "#00ffff",
        darkblue: "#00008b",
        darkcyan: "#008b8b",
        darkgoldenrod: "#b8860b",
        darkgray: "#a9a9a9",
        darkgreen: "#006400",
        darkgrey: "#a9a9a9",
        darkkhaki: "#bdb76b",
        darkmagenta: "#8b008b",
        darkolivegreen: "#556b2f",
        darkorange: "#ff8c00",
        darkorchid: "#9932cc",
        darkred: "#8b0000",
        darksalmon: "#e9967a",
        darkseagreen: "#8fbc8f",
        darkslateblue: "#483d8b",
        darkslategray: "#2f4f4f",
        darkslategrey: "#2f4f4f",
        darkturquoise: "#00ced1",
        darkviolet: "#9400d3",
        deeppink: "#ff1493",
        deepskyblue: "#00bfff",
        dimgray: "#696969",
        dimgrey: "#696969",
        dodgerblue: "#1e90ff",
        firebrick: "#b22222",
        floralwhite: "#fffaf0",
        forestgreen: "#228b22",
        fuchsia: "#ff00ff",
        gainsboro: "#dcdcdc",
        ghostwhite: "#f8f8ff",
        gold: "#ffd700",
        goldenrod: "#daa520",
        gray: "#808080",
        green: "#008000",
        greenyellow: "#adff2f",
        grey: "#808080",
        honeydew: "#f0fff0",
        hotpink: "#ff69b4",
        indianred: "#cd5c5c",
        indigo: "#4b0082",
        ivory: "#fffff0",
        khaki: "#f0e68c",
        lavender: "#e6e6fa",
        lavenderblush: "#fff0f5",
        lawngreen: "#7cfc00",
        lemonchiffon: "#fffacd",
        lightblue: "#add8e6",
        lightcoral: "#f08080",
        lightcyan: "#e0ffff",
        lightgoldenrodyellow: "#fafad2",
        lightgray: "#d3d3d3",
        lightgreen: "#90ee90",
        lightgrey: "#d3d3d3",
        lightpink: "#ffb6c1",
        lightsalmon: "#ffa07a",
        lightseagreen: "#20b2aa",
        lightskyblue: "#87cefa",
        lightslategray: "#778899",
        lightslategrey: "#778899",
        lightsteelblue: "#b0c4de",
        lightyellow: "#ffffe0",
        lime: "#00ff00",
        limegreen: "#32cd32",
        linen: "#faf0e6",
        magenta: "#ff00ff",
        maroon: "#800000",
        mediumaquamarine: "#66cdaa",
        mediumblue: "#0000cd",
        mediumorchid: "#ba55d3",
        mediumpurple: "#9370db",
        mediumseagreen: "#3cb371",
        mediumslateblue: "#7b68ee",
        mediumspringgreen: "#00fa9a",
        mediumturquoise: "#48d1cc",
        mediumvioletred: "#c71585",
        midnightblue: "#191970",
        mintcream: "#f5fffa",
        mistyrose: "#ffe4e1",
        moccasin: "#ffe4b5",
        navajowhite: "#ffdead",
        navy: "#000080",
        oldlace: "#fdf5e6",
        olive: "#808000",
        olivedrab: "#6b8e23",
        orange: "#ffa500",
        orangered: "#ff4500",
        orchid: "#da70d6",
        palegoldenrod: "#eee8aa",
        palegreen: "#98fb98",
        paleturquoise: "#afeeee",
        palevioletred: "#db7093",
        papayawhip: "#ffefd5",
        peachpuff: "#ffdab9",
        peru: "#cd853f",
        pink: "#ffc0cb",
        plum: "#dda0dd",
        powderblue: "#b0e0e6",
        purple: "#800080",
        rebeccapurple: "#663399",
        red: "#ff0000",
        rosybrown: "#bc8f8f",
        royalblue: "#4169e1",
        saddlebrown: "#8b4513",
        salmon: "#fa8072",
        sandybrown: "#f4a460",
        seagreen: "#2e8b57",
        seashell: "#fff5ee",
        sienna: "#a0522d",
        silver: "#c0c0c0",
        skyblue: "#87ceeb",
        slateblue: "#6a5acd",
        slategray: "#708090",
        slategrey: "#708090",
        snow: "#fffafa",
        springgreen: "#00ff7f",
        steelblue: "#4682b4",
        tan: "#d2b48c",
        teal: "#008080",
        thistle: "#d8bfd8",
        tomato: "#ff6347",
        turquoise: "#40e0d0",
        violet: "#ee82ee",
        wheat: "#f5deb3",
        white: "#ffffff",
        whitesmoke: "#f5f5f5",
        yellow: "#ffff00",
        yellowgreen: "#9acd32"
    };
    const q = {
        0: 0,
        1: 1 / 15,
        2: 2 / 15,
        3: .2,
        4: 4 / 15,
        5: 5 / 15,
        6: .4,
        7: 7 / 15,
        8: 8 / 15,
        9: .6,
        a: 10 / 15,
        b: 11 / 15,
        c: .8,
        d: 13 / 15,
        e: 14 / 15,
        f: 1,
        A: 10 / 15,
        B: 11 / 15,
        C: .8,
        D: 13 / 15,
        E: 14 / 15,
        F: 1
    };
    return a
}
)),
/*! Toxilib screen_canvas_style
 * Copyright 2014 Toxicode, pierre.lancien @ toxicode.fr
*/
define("toxilibs/screen_canvas_style", ["./color"], (function(e) {
    let t = 1;
    const n = {};
    const o = {
        normal: "source-over",
        "new || old": "source-over",
        "old || new": "destination-over",
        "old && new": "source-in",
        "new && old": "destination-in",
        "!old && new": "source-out",
        "!new && old": "destination-out",
        "old && (new || old)": "source-atop",
        "new && (old || new)": "destination-atop",
        "old + new": "lighter",
        "old * new": "multiply",
        "min(old, new)": "darken",
        min: "darken",
        "max(old, new)": "lighten",
        max: "lighten",
        "abs(old - new)": "difference",
        "abs(new - old)": "difference",
        "old ^ new": "xor",
        "old XOR new": "xor",
        new: "copy"
    };
    const r = .5
      , i = 5;
    return function(a) {
        const {cx: s} = a;
        s.id || (s.id = t++,
        n[s.id] = {});
        const l = n[s.id];
        a.currentCxStyle = l,
        this.previousGlobalAlpha = s.globalAlpha,
        function(t, {currentCxStyle: n, cx: a, screen: s}) {
            t.setDefaultStyles = function() {
                n.blendMode = "source-over",
                n.filter = "none",
                a.lineJoin = "round",
                a.imageSmoothingQuality = "high"
            }
            ,
            t.resetStyle = function() {
                for (let e in n)
                    delete n[e];
                t.setDefaultStyles()
            }
            ,
            t.resyncWithCurrentStyle = function() {
                a.strokeStyle = n.stroke,
                a.fillStyle = n.fill,
                a.lineWidth = n.lineWidth,
                a.font = n.font
            }
            ,
            t.setStrokeStyle = function({color: e, strokeColor: t=e, lineWidth: o=2}) {
                const r = t || "#000";
                n.lineWidth !== o && (n.lineWidth = o,
                a.lineWidth = o),
                n.stroke !== r && (n.stroke = r,
                a.strokeStyle = r)
            }
            ,
            t.setFillStyle = function(e) {
                const {linearGradient: t, radialGradient: n, fillColor: o, color: r=o} = e;
                t || n ? function(e, {linearGradient: t, radialGradient: n, fillColor: o, color: r}) {
                    let i, a;
                    t ? (i = t,
                    a = function(e, {origin: t, end: n}) {
                        return e.cx.createLinearGradient(t.x, t.y, n.x, n.y)
                    }(e, i)) : (i = n || {
                        x: 0,
                        y: 0,
                        radius: 10
                    },
                    a = function(e, {innerCircle: t, outerCircle: n, center: o, radius: r}) {
                        let i, a, s, l;
                        if (t) {
                            i = t,
                            a = t.radius || 0,
                            s = n;
                            const {radius: e=r} = n;
                            l = e
                        } else
                            i = o,
                            a = 0,
                            s = i,
                            l = r;
                        return e.cx.createRadialGradient(i.x, i.y, a, s.x, s.y, l)
                    }(e, i));
                    (function(e, t) {
                        t.length ? function(e, t) {
                            const n = t.length;
                            for (let o = 0; o < n; o++)
                                e.addColorStop(o / (n - 1), t[o])
                        }(e, t) : function(e, t) {
                            for (let n in t)
                                e.addColorStop(n, t[n])
                        }(e, t)
                    }
                    )(a, i.colors || function({color: e, fillColor: t=e}) {
                        return ["#000", t || "#FFF"]
                    }({
                        fillColor: o,
                        color: r
                    })),
                    e.cx.fillStyle = a,
                    e.currentCxStyle.fill = a
                }(s, e) : function(e, {color: t="#000"}={}) {
                    e.currentCxStyle.fill !== t && (e.currentCxStyle.fill = t,
                    e.cx.fillStyle = t)
                }(s, {
                    color: r
                })
            }
            ;
            const l = /[0-9.]+px/;
            t.setFont = function({font: e="20px serif", width: t, height: o}) {
                void 0 === t && void 0 === o || e.match(l) || (e = `20px ${e}`),
                n.font !== e && (n.font = e,
                a.font = e)
            }
            ,
            t.stroke = function({lineWidth: e, strokeColor: n, color: o}) {
                0 !== e && (t.setStrokeStyle({
                    strokeColor: n,
                    color: o,
                    lineWidth: e
                }),
                a.stroke())
            }
            ,
            t.fill = function(e={}) {
                t.setFillStyle(e),
                a.fill()
            }
            ,
            t.setSpecialStyles = function({opacity: n, blendMode: s, filter: l="", shadow: c, blur: u}) {
                if (1 !== n && (t.previousGlobalAlpha = a.globalAlpha,
                a.globalAlpha *= n),
                s) {
                    let e = o[s];
                    e && (s = e),
                    a.globalCompositeOperation = s
                }
                c && (l += function({xOffset: t=0, yOffset: n=0, color: o="black", blur: a=i, opacity: s=r}) {
                    s < 1 && ("string" == typeof o && (o = new e(o)),
                    o.opacity = s);
                    return ` drop-shadow(${t}px ${n}px ${a}px ${o})`
                }(c)),
                u && (l += ` blur(${u}px)`),
                l && (a.filter = l)
            }
            ,
            t.resetSpecialStyles = function() {
                a.globalAlpha = t.previousGlobalAlpha,
                a.globalCompositeOperation = n.blendMode,
                a.filter = n.filter
            }
            ,
            t.setOpacity = function(e=1) {
                t.previousGlobalAlpha = e,
                a.globalAlpha = e
            }
            ,
            t.setSmoothing = function(e) {
                n.smoothing !== e && (a.imageSmoothingEnabled = e,
                a.mozImageSmoothingEnabled = e,
                a.msImageSmoothingEnabled = e)
            }
            ,
            t.strokeAndFill = function(e={}) {
                e.strokeColor && t.stroke(e),
                (e.color || e.fillColor || e.linearGradient || e.radialGradient) && t.fill(e)
            }
        }(this, {
            currentCxStyle: l,
            cx: s,
            screen: a
        }),
        this.setDefaultStyles()
    }
}
)),
/*! Toxilib topleft_and_pivot
 * Copyright 2014 Toxicode, pierre.lancien @ toxicode.fr
*/
define("toxilibs/topleft_and_pivot", [], (function() {
    const e = Math.PI / 180
      , t = ["topLeft", "center", "topRight", "bottomLeft", "bottomRight", "left", "right", "bottom", "top", "centerLeft", "centerRight", "bottomCenter", "topCenter"];
    function n(e) {
        return e._positionKey ? "none" !== e._positionKey && e._positionKey : t.find((t=>t in e))
    }
    function o(e, t, n) {
        let {_positionKey: o} = e;
        if (o && "topLeft" !== o)
            return function(e, t, n, o) {
                if ("none" === e)
                    return null;
                "function" == typeof n && (n = n());
                "function" == typeof o && (o = o());
                const {x: r, y: i} = h(t[e]);
                return s[e]({
                    x: r,
                    y: i,
                    width: -n,
                    height: -o
                })
            }(o, e, t, n);
        if (e.topLeft) {
            const {x: t, y: n} = h(e.topLeft);
            return {
                x: t,
                y: n
            }
        }
        if ("function" == typeof t && (t = t()),
        "function" == typeof n && (n = n()),
        e.center) {
            const {x: o, y: r} = h(e.center);
            return {
                x: o - t / 2,
                y: r + n / 2
            }
        }
        if (e.topRight) {
            const {x: n, y: o} = h(e.topRight);
            return {
                x: n - t,
                y: o
            }
        }
        if (e.bottomLeft) {
            const {x: t, y: o} = h(e.bottomLeft);
            return {
                x: t,
                y: o + n
            }
        }
        if (e.bottomRight) {
            const {x: o, y: r} = h(e.bottomRight);
            return {
                x: o - t,
                y: r + n
            }
        }
        if (e.centerLeft) {
            const {x: t, y: o} = h(e.centerLeft);
            return {
                x: t,
                y: o + n / 2
            }
        }
        if (e.centerRight) {
            const {x: o, y: r} = h(e.centerRight);
            return {
                x: o - t,
                y: r + n / 2
            }
        }
        if (e.bottomCenter) {
            const {x: o, y: r} = h(e.bottomCenter);
            return {
                x: o - t / 2,
                y: r + n
            }
        }
        if (e.topCenter) {
            const {x: n, y: o} = h(e.topCenter);
            return {
                x: n - t / 2,
                y: o
            }
        }
        if (e.left) {
            const {x: t, y: o} = h(e.left);
            return {
                x: t,
                y: o + n / 2
            }
        }
        if (e.right) {
            const {x: o, y: r} = h(e.right);
            return {
                x: o - t,
                y: r + n / 2
            }
        }
        if (e.bottom) {
            const {x: o, y: r} = h(e.bottom);
            return {
                x: o - t / 2,
                y: r + n
            }
        }
        if (e.top) {
            const {x: n, y: o} = h(e.top);
            return {
                x: n - t / 2,
                y: o
            }
        }
        return null
    }
    function r(e, t, n) {
        let {_positionKey: o} = e;
        if (o && "center" !== o)
            return function(e, t, n, o) {
                if ("none" === e)
                    return null;
                "function" == typeof n && (n = n());
                "function" == typeof o && (o = o());
                const {x: r, y: i} = h(t[e])
                  , a = s[e]({
                    x: r,
                    y: i,
                    width: -n,
                    height: -o
                });
                return {
                    x: a.x + n / 2,
                    y: a.y - o / 2
                }
            }(o, e, t, n);
        if (e.center) {
            const {x: t, y: n} = h(e.center);
            return {
                x: t,
                y: n
            }
        }
        if ("function" == typeof t && (t = t()),
        "function" == typeof n && (n = n()),
        e.topLeft) {
            const {x: o, y: r} = h(e.topLeft);
            return {
                x: o + t / 2,
                y: r - n / 2
            }
        }
        if (e.topRight) {
            const {x: o, y: r} = h(e.topRight);
            return {
                x: o - t / 2,
                y: r - n / 2
            }
        }
        if (e.bottomLeft) {
            const {x: o, y: r} = h(e.bottomLeft);
            return {
                x: o + t / 2,
                y: r + n / 2
            }
        }
        if (e.bottomRight) {
            const {x: o, y: r} = h(e.bottomRight);
            return {
                x: o - t / 2,
                y: r + n / 2
            }
        }
        if (e.centerLeft) {
            const {x: n, y: o} = h(e.centerLeft);
            return {
                x: n + t / 2,
                y: o
            }
        }
        if (e.centerRight) {
            const {x: n, y: o} = h(e.centerRight);
            return {
                x: n - t / 2,
                y: o
            }
        }
        if (e.bottomCenter) {
            const {x: t, y: o} = h(e.bottomCenter);
            return {
                x: t,
                y: o + n / 2
            }
        }
        if (e.topCenter) {
            const {x: t, y: o} = h(e.topCenter);
            return {
                x: t,
                y: o - n / 2
            }
        }
        if (e.left) {
            const {x: n, y: o} = h(e.left);
            return {
                x: n + t / 2,
                y: o
            }
        }
        if (e.right) {
            const {x: n, y: o} = h(e.right);
            return {
                x: n - t / 2,
                y: o
            }
        }
        if (e.bottom) {
            const {x: t, y: o} = h(e.bottom);
            return {
                x: t,
                y: o + n / 2
            }
        }
        if (e.top) {
            const {x: t, y: o} = h(e.top);
            return {
                x: t,
                y: o - n / 2
            }
        }
        return null
    }
    function i(e, t, n) {
        return e.pivot ? e.pivot : !e.topLeft && (e.topRight ? {
            x: t,
            y: 0
        } : e.bottomLeft ? {
            x: 0,
            y: -n
        } : e.bottomRight ? {
            x: t,
            y: -n
        } : e.center ? {
            x: t / 2,
            y: -n / 2
        } : e.centerLeft ? {
            x: 0,
            y: -n / 2
        } : e.centerRight ? {
            x: t,
            y: -n / 2
        } : e.bottomCenter ? {
            x: t / 2,
            y: -n
        } : e.topCenter ? {
            x: t / 2,
            y: 0
        } : e.centerLeft || e.left ? {
            x: 0,
            y: -n / 2
        } : e.centerRight || e.right ? {
            x: t,
            y: -n / 2
        } : e.bottomCenter || e.bottom ? {
            x: t / 2,
            y: -n
        } : !(!e.topCenter && !e.top) && {
            x: t / 2,
            y: 0
        })
    }
    function a(e, t, n) {
        if (e.pivot) {
            const {x: o, y: r} = e.pivot;
            return {
                x: o - t / 2,
                y: r + n / 2
            }
        }
        return !e.center && (e.topLeft ? {
            x: -t / 2,
            y: n / 2
        } : e.topRight ? {
            x: t / 2,
            y: n / 2
        } : e.bottomLeft ? {
            x: -t / 2,
            y: -n / 2
        } : e.bottomRight ? {
            x: t / 2,
            y: -n / 2
        } : e.centerLeft ? {
            x: -t / 2,
            y: 0
        } : e.centerRight ? {
            x: t / 2,
            y: -0
        } : e.bottomCenter ? {
            x: 0,
            y: -n / 2
        } : e.topCenter ? {
            x: 0,
            y: n / 2
        } : e.centerLeft || e.left ? {
            x: -t / 2,
            y: 0
        } : e.centerRight || e.right ? {
            x: t / 2,
            y: 0
        } : e.bottomCenter || e.bottom ? {
            x: 0,
            y: -n / 2
        } : !(!e.topCenter && !e.top) && {
            x: 0,
            y: n / 2
        })
    }
    const s = {
        topLeft: ({x: e, y: t})=>({
            x: e,
            y: t
        }),
        top: ({x: e, y: t, width: n})=>({
            x: e + n / 2,
            y: t
        }),
        topRight: ({x: e, y: t, width: n})=>({
            x: e + n,
            y: t
        }),
        left: ({x: e, y: t, height: n})=>({
            x: e,
            y: t - n / 2
        }),
        center: ({x: e, y: t, width: n, height: o})=>({
            x: e + n / 2,
            y: t - o / 2
        }),
        right: ({x: e, y: t, width: n, height: o})=>({
            x: e + n,
            y: t - o / 2
        }),
        bottomLeft: ({x: e, y: t, height: n})=>({
            x: e,
            y: t - n
        }),
        bottom: ({x: e, y: t, width: n, height: o})=>({
            x: e + n / 2,
            y: t - o
        }),
        bottomRight: ({x: e, y: t, width: n, height: o})=>({
            x: e + n,
            y: t - o
        })
    };
    function l(e, t, {whenChanged: n}={}) {
        if (t in e) {
            if (n) {
                let o = i(e[t]);
                Object.defineProperty(e, t, {
                    get: ()=>o,
                    set: e=>{
                        o = i(e),
                        n({
                            positionName: t,
                            value: o
                        })
                    }
                })
            }
            return
        }
        function i(o) {
            if (!n)
                return o;
            let {x: r, y: i} = o;
            const a = {};
            return Object.defineProperty(a, "x", {
                get: ()=>r,
                set: o=>{
                    if (r !== o) {
                        r = o;
                        let {_positionKey: s} = e;
                        t === s ? n({
                            positionName: t,
                            value: a
                        }) : e[t] = {
                            x: r,
                            y: i
                        }
                    }
                }
            }),
            Object.defineProperty(a, "y", {
                get: ()=>i,
                set: o=>{
                    if (i !== o) {
                        i = o;
                        let {_positionKey: s} = e;
                        t === s ? n({
                            positionName: t,
                            value: a
                        }) : e[t] = {
                            x: r,
                            y: i
                        }
                    }
                }
            }),
            a
        }
        let a;
        if ("topLeft" === t)
            a = ()=>{
                const {width: t, height: n} = e;
                return i(o(e, t, n))
            }
            ;
        else if ("center" === t)
            a = ()=>{
                const {width: t, height: n} = e;
                return i(r(e, t, n))
            }
            ;
        else {
            let n = s[t];
            a = ()=>{
                const {width: t, height: r} = e
                  , {x: a, y: s} = o(e, t, r);
                return i(n({
                    x: a,
                    y: s,
                    width: t,
                    height: r
                }))
            }
        }
        Object.defineProperty(e, t, {
            get: a,
            set: o=>{
                let {_positionKey: r} = e;
                delete e[t],
                e[t] = o,
                r && (delete e[r],
                l(e, r),
                n && l(e, t, {
                    whenChanged: n
                })),
                e._positionKey = t,
                n && n({
                    positionName: t,
                    value: e[t]
                })
            }
            ,
            configurable: !0
        })
    }
    function c(e, t, n) {
        "function" == typeof e && (e = e()),
        "function" == typeof t && (t = t()),
        "function" == typeof n && (n = n());
        let o = d(n, t);
        return {
            x: e.x + n.x - o.x,
            y: e.y + n.y - o.y
        }
    }
    function u(e, t=1) {
        let {width: n, height: r, orientation: a=0} = e;
        if (void 0 === n)
            throw new Error('"width" param is missing');
        if (void 0 === r)
            throw new Error('"height" param is missing');
        "function" == typeof n && (n = n()),
        "function" == typeof r && (r = r()),
        "function" == typeof a && (a = a());
        let s = o(e, n, r * t);
        if (!s)
            throw new Error('a position param is missing. Include one, for example "center", "topLeft"...');
        if (a) {
            const t = e.pivot || i(e, n, r);
            t && (s = c(s, a, t))
        }
        return {
            topLeftPoint: s,
            width: n,
            height: r,
            orientation: a
        }
    }
    function d({x: t, y: n}, o) {
        let r = o * e
          , i = Math.cos(r)
          , a = Math.sin(r);
        return {
            x: t * i - n * a,
            y: t * a + n * i
        }
    }
    function h(e) {
        return "function" == typeof e ? e() : e
    }
    return s.centerRight = s.right,
    s.centerLeft = s.left,
    s.bottomCenter = s.bottom,
    s.topCenter = s.top,
    {
        getTopLeftPoint: o,
        getCenterPoint: r,
        getCenterPointAfterPivot: function(e) {
            const {width: t, height: n, orientation: o} = e;
            let i = r(e, t, n);
            if (o) {
                let r = a(e, t, n);
                if (r) {
                    let e = d(r, o);
                    return {
                        x: i.x + r.x - e.x,
                        y: i.y + r.y - e.y
                    }
                }
            }
            return i
        },
        getPivot: i,
        getPivotRelativeToCenter: a,
        topLeftPointWithPivot: c,
        containsPositionParam: n,
        copyPositionParam: function(e, t, {replace: o}={}) {
            const r = n(e);
            if (r) {
                const {x: n, y: i} = h(e[r]);
                return r in t && !o ? (t[r].x = n,
                t[r].y = i) : t[r] = {
                    x: n,
                    y: i
                },
                !0
            }
            return !1
        },
        getCoordsFor: function(e, t) {
            let {width: n, height: r} = t;
            "function" == typeof n && (n = n()),
            "function" == typeof r && (r = r());
            const {x: i, y: a} = o(t, n, r);
            return s[e]({
                x: i,
                y: a,
                width: n,
                height: r
            })
        },
        rotateVector: d,
        addPositionAccessors: function(e, {whenChanged: o}={}) {
            let r = n(e);
            r || (r = "none"),
            e._positionKey = r,
            t.forEach((t=>l(e, t, {
                whenChanged: o
            })))
        },
        normalizedParamsForRectangle: u,
        pointsForRectangle: function(e, t=1) {
            let {topLeftPoint: n, width: o, height: r, orientation: i} = u(e, t);
            const {x: a, y: s} = n;
            if (i) {
                const {x: e, y: n} = d({
                    x: o,
                    y: 0
                }, i)
                  , {x: l, y: c} = d({
                    x: 0,
                    y: -t * r
                }, i);
                return [{
                    x: a,
                    y: s
                }, {
                    x: a + e,
                    y: s + n
                }, {
                    x: a + e + l,
                    y: s + n + c
                }, {
                    x: a + l,
                    y: s + c
                }]
            }
            {
                const e = s - t * r;
                return [{
                    x: a,
                    y: s
                }, {
                    x: a + o,
                    y: s
                }, {
                    x: a + o,
                    y: e
                }, {
                    x: a,
                    y: e
                }]
            }
        }
    }
}
)),
/*! Toxilib bezier
 * Copyright 2014 Toxicode, pierre.lancien @ toxicode.fr
*/
define("toxilibs/bezier", [], (function() {
    function e({origin: e, end: t, controlOrigin: n, controlEnd: o, interpolationSteps: r=50}) {
        this.stepsCount = r,
        this.interpolationStep = 1 / r,
        this.origin = e,
        this.end = t,
        this.controlOrigin = n,
        this.controlEnd = o
    }
    e.pointsWithDefaultControlPoints = function({points: e, smooth: t=1, close: n}) {
        t /= 2.8;
        let o = function(e, t) {
            const n = e.map(i);
            t && e.length > 0 && n.push(i(e[0]));
            return n
        }(e, n)
          , s = o.length;
        if (s < 1)
            return !1;
        for (let e = 1; e < s - 1; e++)
            r(o[e], o[e - 1], o[e + 1], t);
        return n && (r(o[s - 1], o[s - 2], o[1], t),
        a(o[0], "controlNext", o[s - 1].controlNext)),
        o
    }
    ,
    e.autoParamsFromPoints = function({points: t, smooth: n=0, close: o}) {
        n && (t = e.pointsWithDefaultControlPoints({
            points: t,
            smooth: n,
            close: o
        }));
        let r = []
          , i = t.length;
        for (let e = 1; e < i; e++) {
            let n = t[e - 1]
              , o = t[e];
            r.push({
                origin: {
                    x: n.x,
                    y: n.y
                },
                controlOrigin: n.controlNext,
                end: {
                    x: o.x,
                    y: o.y
                },
                controlEnd: o.controlPrevious
            })
        }
        return r
    }
    ,
    e.prototype.length = function() {
        return "computedLength"in this || o(this),
        this.computedLength
    }
    ,
    e.prototype.boundingBox = function() {
        return "computedBoundingBox"in this || o(this),
        this.computedBoundingBox
    }
    ,
    e.prototype.coords = function(e, {withAngle: o=!1}={}) {
        "distanceTable"in this || n(this);
        let r = t(this, e);
        return this.parametricCoords(r, {
            withAngle: o
        })
    }
    ;
    function t(e, t) {
        const {computedLength: n, distanceTable: o, tDistributedDistanceTable: r, interpolationStep: i} = e;
        if (t >= n)
            return 1;
        let a = o[Math.floor(t / (i * n))]
          , s = r[a]
          , l = r[a + 1];
        for (; l < t; )
            a += 1,
            s = l,
            l = r[a + 1];
        return (a + (t - s) / (l - s)) * i
    }
    function n(e) {
        "tDistributedDistanceTable"in e || o(e);
        const {interpolationStep: t, computedLength: n, tDistributedDistanceTable: r, stepsCount: i} = e
          , a = n * t
          , s = [0];
        let l = a;
        for (let e = 0; e < i; e++) {
            let t = r[e + 1];
            for (; t >= l; )
                s.push(e),
                l += a
        }
        e.distanceTable = s
    }
    function o(e) {
        let t = 0;
        const n = [];
        let o, r = 1 / 0, i = -1 / 0, a = 1 / 0, l = -1 / 0;
        const {interpolationStep: c} = e
          , u = 1 + c / 2;
        for (let d = 0; d <= u; d += c) {
            const c = e.parametricCoords(d)
              , {x: u, y: h} = c;
            r = Math.min(r, u),
            i = Math.max(i, u),
            a = Math.min(a, h),
            l = Math.max(l, h),
            o && (t += s(o, c)),
            n.push(t),
            o = c
        }
        e.computedLength = t,
        e.computedBoundingBox = {
            xMin: r,
            yMin: a,
            xMax: i,
            yMax: l
        },
        e.tDistributedDistanceTable = n
    }
    function r(e, t, n, o) {
        if (e.controlPrevious && e.controlNext)
            return;
        const r = e.x - t.x
          , i = e.y - t.y
          , s = Math.sqrt(r * r + i * i)
          , l = n.x - e.x
          , c = n.y - e.y
          , u = Math.sqrt(l * l + c * c);
        if (0 === s || 0 === u)
            a(e, "controlPrevious", e),
            a(e, "controlNext", e);
        else {
            const t = s / u;
            let n = l * t + r
              , a = c * t + i;
            const d = Math.sqrt(n * n + a * a);
            n /= d,
            a /= d,
            e.controlPrevious || (e.controlPrevious = {
                x: e.x - o * n * s,
                y: e.y - o * a * s
            }),
            e.controlNext || (e.controlNext = {
                x: e.x + o * n * u,
                y: e.y + o * a * u
            })
        }
    }
    function i({x: e, y: t, controlNext: n, controlPrevious: o}) {
        return {
            x: e,
            y: t,
            controlNext: n,
            controlPrevious: o
        }
    }
    function a(e, t, n) {
        e[t] = e[t] || n
    }
    function s({x: e, y: t}, {x: n, y: o}) {
        const r = n - e
          , i = o - t;
        return Math.sqrt(r * r + i * i)
    }
    return e.prototype.parametricCoords = function(e, {withAngle: t=!1}={}) {
        const n = 1 - e
          , o = n * n * n
          , r = n * n * e * 3
          , i = n * e * e * 3
          , a = e * e * e;
        let s = o * this.origin.x + r * this.controlOrigin.x + i * this.controlEnd.x + a * this.end.x
          , l = o * this.origin.y + r * this.controlOrigin.y + i * this.controlEnd.y + a * this.end.y;
        if (t) {
            let t = this.parametricCoords(e + 1e-5);
            return {
                x: s,
                y: l,
                angle: Math.atan2(t.y - l, t.x - s)
            }
        }
        return {
            x: s,
            y: l
        }
    }
    ,
    e.prototype.path = function(e=this.stepsCount) {
        const t = 1 / e
          , n = 1 + t / 2
          , o = Math.ceil(n / t)
          , r = new Array(o);
        for (let e = 0; e < o; e += 1)
            r[e] = this.parametricCoords(e * t);
        return r
    }
    ,
    e.prototype.steppedPath = function({distanceStepsCount: e=this.stepsCount}={}) {
        "tDistributedDistanceTable"in this || o(this);
        const {origin: t, interpolationStep: n, computedLength: r, tDistributedDistanceTable: i, stepsCount: a} = this
          , s = r / e;
        let l = s;
        const c = [{
            x: t.x,
            y: t.y
        }];
        let u = 0;
        for (let e = 0; e < a; e++) {
            let t = i[e + 1];
            for (; t >= l; ) {
                const o = (e + (l - u) / (t - u)) * n;
                c.push(this.parametricCoords(o)),
                l = s * c.length
            }
            u = t
        }
        return c
    }
    ,
    e.prototype.derivative = function(e) {
        const t = 3 * e * e
          , n = 6 * e - 3 - t
          , o = 3 * t - 12 * e + 3
          , r = 6 * e - 3 * t;
        return {
            x: n * this.origin.x + o * this.controlOrigin.x + r * this.controlEnd.x + t * this.end.x,
            y: n * this.origin.y + o * this.controlOrigin.y + r * this.controlEnd.y + t * this.end.y
        }
    }
    ,
    e.prototype.secondDerivative = function(e) {
        const t = 6 * e
          , n = 6 - t
          , o = 3 * t - 12
          , r = 6 - 3 * t;
        return {
            x: n * this.origin.x + o * this.controlOrigin.x + r * this.controlEnd.x + t * this.end.x,
            y: n * this.origin.y + o * this.controlOrigin.y + r * this.controlEnd.y + t * this.end.y
        }
    }
    ,
    e.prototype.normal = function(e) {
        const {x: t, y: n} = this.derivative(e)
          , o = Math.sqrt(t * t + n * n);
        return {
            x: -n / o,
            y: t / o
        }
    }
    ,
    e.prototype.paramAtDistance = function(e) {
        return "distanceTable"in this || n(this),
        t(this, e)
    }
    ,
    e
}
)),
/*! Toxilib auto_dimensions
 * Copyright 2014 Toxicode, pierre.lancien @ toxicode.fr
*/
define("toxilibs/auto_dimensions", [], (function() {
    return function({width: e, height: t, sourceWidth: n, sourceHeight: o, preventConflict: r}) {
        let i = {
            sourceWidth: n,
            sourceHeight: o
        };
        if (void 0 === e && void 0 === t)
            e = n,
            t = o;
        else if (void 0 === e)
            e = function(e, {sourceWidth: t, sourceHeight: n}) {
                return void 0 === e ? t : t * e / n
            }(t, i);
        else if (void 0 === t)
            t = function(e, {sourceWidth: t, sourceHeight: n}) {
                return void 0 === e ? n : n * e / t
            }(e, i);
        else if (r) {
            const r = n / o
              , i = e / t;
            if (Math.abs(r - i) > Number.EPSILON)
                throw new Error("Mismatched dimensions")
        }
        return {
            width: e,
            height: t
        }
    }
}
)),
/*! Toxilib screen_image_utils
 * Copyright 2014 Toxicode, pierre.lancien @ toxicode.fr
*/
define("toxilibs/screen_image_utils", ["./topleft_and_pivot", "./auto_dimensions"], (function(e, t) {
    const {getTopLeftPoint: n, containsPositionParam: o, copyPositionParam: r} = e;
    function i({width: e, height: t}, n) {
        if (!n)
            return {
                topLeftX: 0,
                topLeftY: 0,
                width: e,
                height: t,
                cropped: !1
            };
        let {topLeftX: o, topLeftY: r, width: i, height: a} = function(e, t) {
            if (e.topLeft) {
                let {fullWidth: n, fullHeight: o, width: r=Math.max(0, n - e.topLeft.x), height: i=Math.max(0, o - e.topLeft.y)} = t;
                return {
                    topLeftX: e.topLeft.x,
                    topLeftY: e.topLeft.y,
                    width: r,
                    height: i
                }
            }
            if (e.center) {
                let {fullWidth: n, fullHeight: o, width: r=Math.max(0, 2 * Math.min(e.center.x, n - e.center.x)), height: i=Math.max(0, 2 * Math.min(e.center.y, o - e.center.y))} = t;
                return {
                    topLeftX: e.center.x - r / 2,
                    topLeftY: e.center.y - i / 2,
                    width: r,
                    height: i
                }
            }
            if (e.topRight) {
                let {fullHeight: n, width: o=Math.max(0, e.topRight.x), height: r=Math.max(0, n - e.topRight.y)} = t;
                return {
                    topLeftX: e.topRight.x - o,
                    topLeftY: e.topRight.y,
                    width: o,
                    height: r
                }
            }
            if (e.bottomLeft) {
                let {fullWidth: n, width: o=Math.max(0, n - e.bottomLeft.x), height: r=Math.max(0, e.bottomLeft.y)} = t;
                return {
                    topLeftX: e.bottomLeft.x,
                    topLeftY: e.bottomLeft.y - r,
                    width: o,
                    height: r
                }
            }
            if (e.bottomRight) {
                let {width: n=Math.max(0, e.bottomRight.x), height: o=Math.max(0, e.bottomRight.y)} = t;
                return {
                    topLeftX: e.bottomRight.x - n,
                    topLeftY: e.bottomRight.y - o,
                    width: n,
                    height: o
                }
            }
            if (e.centerLeft || e.left) {
                let {x: n, y: o} = e.centerLeft || e.left
                  , {fullWidth: r, fullHeight: i, width: a=Math.max(0, r - n), height: s=Math.max(0, 2 * Math.min(o, i - o))} = t;
                return {
                    topLeftX: n,
                    topLeftY: o - s / 2,
                    width: a,
                    height: s
                }
            }
            if (e.centerRight || e.right) {
                let {x: n, y: o} = e.centerRight || e.right
                  , {fullHeight: r, width: i=Math.max(0, n), height: a=Math.max(0, 2 * Math.min(o, r - o))} = t;
                return {
                    topLeftX: n - i,
                    topLeftY: o - a / 2,
                    width: i,
                    height: a
                }
            }
            if (e.bottomCenter || e.bottom) {
                let {x: n, y: o} = e.bottomCenter || e.bottom
                  , {fullWidth: r, width: i=Math.max(0, 2 * Math.min(n, r - n)), height: a=Math.max(0, o)} = t;
                return {
                    topLeftX: n - i / 2,
                    topLeftY: o - a,
                    width: i,
                    height: a
                }
            }
            if (e.topCenter || e.top) {
                let {x: n, y: o} = e.topCenter || e.top
                  , {fullWidth: r, fullHeight: i, width: a=Math.max(0, 2 * Math.min(n, r - n)), height: s=Math.max(0, i - o)} = t;
                return {
                    topLeftX: n - a / 2,
                    topLeftY: o,
                    width: a,
                    height: s
                }
            }
            {
                let {fullWidth: e, fullHeight: n, width: o=e, height: r=n} = t;
                return {
                    topLeftX: 0,
                    topLeftY: 0,
                    width: o,
                    height: r
                }
            }
        }(n, {
            width: n.width,
            height: n.height,
            fullWidth: e,
            fullHeight: t
        });
        return {
            topLeftX: o,
            topLeftY: r,
            width: i,
            height: a,
            cropped: 0 !== o || 0 !== r || i !== e || a !== t
        }
    }
    const a = {};
    function s(e, {errorHandler: t}={}) {
        let n = new Image;
        n.crossOrigin = "Anonymous",
        n.addEventListener("load", (()=>{
            a[e].forEach((e=>e(n))),
            a[e] = n
        }
        )),
        n.addEventListener("error", (()=>{
            a[e] = "error";
            const n = new Error(`Cannot load image ${e}`);
            if (n.toxiTrace = ["Toxilibs - screen.js - fetchImage"],
            !t)
                throw n;
            t(n)
        }
        )),
        n.src = e
    }
    return {
        fetchImage: s,
        getImageByUrl: function({url: e, errorHandler: t, callback: n}) {
            const o = a[e];
            o ? Array.isArray(o) ? o.push(n) : "error" !== o && n(o) : (a[e] = [n],
            s(e, {
                errorHandler: t
            }))
        },
        getCropParams: i,
        getUsableImageAndPositionParams: function(e, o, {reverseY: a, forceTopLeft: s}={}) {
            let l = e
              , c = e;
            var u;
            if (e.screen ? (l = e.screen,
            c = l) : (u = e,
            "[object Object]" === Object.prototype.toString.call(u) && e.image && (c = e = e.image)),
            !e)
                throw new Error("An image must be specified");
            const d = function({smartObject: e, source: o, params: a, reverseY: s, forceTopLeft: l}) {
                let c = e;
                e.getCamera && (c = e.getCamera());
                let {width: u, height: d, cropSource: h, flip: f, orientation: p} = a;
                void 0 === u && void 0 === d && (u = c.width,
                d = c.height),
                h = e.imageData ? i({
                    width: e.widthInPixels,
                    height: e.heightInPixels
                }, h) : i(o, h || e.cropSource);
                const {width: g, height: m} = t({
                    width: u,
                    height: d,
                    sourceWidth: h.width,
                    sourceHeight: h.height
                })
                  , y = {
                    cropSource: h,
                    width: g,
                    height: m,
                    orientation: p,
                    flip: f
                };
                if (l) {
                    let e = m;
                    s && (e = -m),
                    y.topLeft = n(a, g, e) || n(c, g, e)
                } else
                    r(a, y) || r(c, y);
                return y
            }({
                smartObject: l,
                source: c,
                params: o,
                reverseY: a,
                forceTopLeft: s
            });
            return {
                image: e,
                positionParams: d
            }
        },
        addImageDefaultPositionParams: function(e, t) {
            let n = t;
            t.getCamera && (n = t.getCamera()),
            o(e) || r(n, e),
            "width"in e || "height"in e || (e.width = n.width,
            e.height = n.height)
        }
    }
}
)),
/*! Toxilib discretizer
 * Copyright 2014 Toxicode, pierre.lancien @ toxicode.fr
*/
define("toxilibs/discretizer", [], (function() {
    return function(e, {xMin: t, xMax: n, yMin: o, yMax: r, cellSize: i, xCellsCount: a=e.width, yCellsCount: s=e.height}) {
        let l, c;
        if (i)
            l = 1 / i,
            c = l,
            a = Math.ceil((n - t) * l),
            s = Math.ceil((r - o) * c);
        else {
            if (!a)
                throw new Error("Discretizer needs a cellSize or a xCellsCount param or a width on the object");
            if (!s)
                throw new Error("Discretizer needs a cellSize or a yCellsCount param or a height on the object");
            l = a / (n - t),
            c = s / (r - o)
        }
        e.discretize = function({x: e, y: i}) {
            return e < t || n < e || i < o || r < i ? null : {
                x: (e - t) * l | 0,
                y: (r - i) * c | 0
            }
        }
        ,
        e.gridIndexToGridCoords = function(e) {
            let t = Math.floor(e / a);
            return {
                x: e - t * a,
                y: t
            }
        }
        ;
        const u = t + .5 / l
          , d = r - .5 / c;
        return e.gridIndexToCoords = function(e) {
            let t = Math.floor(e / a);
            return {
                x: u + (e - t * a) / l,
                y: d - t / c
            }
        }
        ,
        e.gridCoordsToCoords = function({x: e, y: t}) {
            return {
                x: u + e / l,
                y: d - t / c
            }
        }
        ,
        {
            xCellsCount: a,
            yCellsCount: s
        }
    }
}
)),
/*! Toxilib download
 * Copyright 2014 Toxicode, pierre.lancien @ toxicode.fr
*/
define("toxilibs/download", [], (function() {
    function e({name: e, fileName: t=e, url: n, mimeType: o}) {
        let r = window.document.createElement("a");
        r.download = t,
        r.href = n,
        r.dataset.downloadurl = [o, t, n].join(":");
        let {body: i} = window.document;
        i.appendChild(r),
        r.click(),
        setTimeout((function() {
            i.removeChild(r),
            window.URL.revokeObjectURL(n)
        }
        ), 0)
    }
    function t(t, n) {
        const o = "image/png";
        e({
            fileName: n,
            mimeType: o,
            url: t.toDataURL(o)
        })
    }
    function n(t, n, r=.7) {
        o(n) || (n += ".jpg");
        const i = "image/jpeg";
        e({
            fileName: n,
            mimeType: i,
            url: t.toDataURL(i, r)
        })
    }
    function o(e) {
        return e.slice((Math.max(0, e.lastIndexOf(".")) || 1 / 0) + 1)
    }
    return {
        downloadAsFile: function({name: t, fileName: n=t, content: o}) {
            let r, i = "text/plain";
            n.endsWith(".json") && (i = "application/json"),
            o instanceof Blob ? r = o : o instanceof ArrayBuffer || o instanceof Uint8Array ? (i = "application/octet-stream",
            r = new Blob([o],{
                type: i
            })) : (o = "object" == typeof o ? JSON.stringify(o) : o.toString(),
            r = new Blob([o],{
                type: `${i};charset=utf-8`
            })),
            e({
                url: URL.createObjectURL(r),
                fileName: n,
                mimeType: i
            })
        },
        downloadCanvasAsImage: function(e, {format: r, name: i="new_image", fileName: a=i, quality: s}) {
            if (!r) {
                let e = o(a);
                r = "jpg" === e || "jpeg" === e ? "jpg" : "png"
            }
            if ("png" === r)
                t(e, a);
            else {
                if ("jpg" !== r && "jpeg" !== r)
                    throw new Error(`Format ${r} not supported`);
                n(e, a, s)
            }
        },
        downloadCanvasAsPNG: t,
        downloadCanvasAsJPG: n
    }
}
)),
/*! Toxilib screen_image_import_export
 * Copyright 2014 Toxicode, pierre.lancien @ toxicode.fr
*/
define("toxilibs/screen_image_import_export", ["./topleft_and_pivot", "./auto_dimensions", "./screen_image_utils", "./download"], (function(e, t, n, o) {
    const {downloadCanvasAsImage: r, downloadAsFile: i} = o
      , {containsPositionParam: a, copyPositionParam: s} = e
      , {getCropParams: l} = n;
    let c, u;
    const d = {};
    function h(e, t, n) {
        "string" == typeof t ? function(e, t, n) {
            if (t.endsWith(".mp4"))
                return void function(e, t, n) {
                    const o = document.createElement("video");
                    let r;
                    o.crossOrigin = "Anonymous",
                    o.src = t,
                    e.queueForAfterLoad = [],
                    o.addEventListener("canplay", (()=>{
                        o.muted = !0,
                        o.width = o.videoWidth,
                        o.height = o.videoHeight,
                        o.play()
                    }
                    )),
                    o.addEventListener("timeupdate", (function() {
                        r || (r = !0,
                        m(e, o, n))
                    }
                    ), !1)
                }(e, t, n);
            const o = new Image;
            o.crossOrigin = "Anonymous",
            o.src = t,
            p(e, o, n)
        }(e, t, n) : t instanceof c ? f(e, t, n) : t instanceof HTMLImageElement ? p(e, t, n) : t instanceof HTMLVideoElement ? function(e, t, n) {
            t.readyState >= 1 ? m(e, t, n) : t.addEventListener("canplay", (()=>m(e, t, n)))
        }(e, t, n) : t instanceof HTMLCanvasElement ? function(e, t, n) {
            let {cropSource: o, whenLoaded: r=(()=>{}
            )} = n;
            const i = C(t, n)
              , {cropped: a, rescaled: s} = i;
            e.syncFromSource = function() {
                (a || s) && (t = v(t, i),
                o = {}),
                b(e, t, o),
                u(e, n)
            }
            ,
            e.syncFromSource(),
            r(e)
        }(e, t, n) : t instanceof ImageData ? g(e, t, n) : t.toImageData && function(e, t, n) {
            const {whenLoaded: o=(()=>{}
            )} = n;
            n = Object.assign({}, n),
            function(e) {
                const {cropSource: t} = e;
                t && (a(e) || s(t, e),
                w(e, t))
            }(n),
            function(e, t) {
                if ("getCamera"in t) {
                    const n = t.getCamera();
                    a(e) || (e.center = n.center),
                    w(e, n)
                }
            }(n, t),
            delete n.cropSource,
            delete n.whenLoaded,
            e.syncFromSource = function() {
                const o = t.toImageData(n.cropSource);
                g(e, o, n)
            }
            ,
            e.syncFromSource(),
            o(e)
        }(e, t, n)
    }
    function f(e, t, n) {
        const {whenLoaded: o=(()=>{}
        )} = n
          , {queueForAfterLoad: r} = t;
        r ? (e.queueForAfterLoad = [],
        r.push((()=>f(e, t, n)))) : (function(e, t) {
            a(e) || s(t, e);
            w(e, t)
        }(n = Object.assign({}, n), t),
        delete n.whenLoaded,
        e.syncFromSource = function() {
            const {imageData: o} = t;
            g(e, o, n)
        }
        ,
        e.syncFromSource(),
        y(e),
        o(e))
    }
    function p(e, t, n) {
        t.complete ? m(e, t, n) : (e.queueForAfterLoad = [],
        t.addEventListener("load", (()=>m(e, t, n))))
    }
    function g(e, t, n) {
        const {whenLoaded: o=(()=>{}
        )} = n;
        let r = C(t, n);
        const {cropped: i, rescaled: a} = r;
        function s() {
            if (i || a) {
                const {cropSource: n, widthInPixels: o, heightInPixels: i} = r;
                let a = x(t, n);
                r = C(a, {
                    widthInPixels: o,
                    heightInPixels: i
                }),
                r.rescaled && (a = v(a, r)),
                b(e, a)
            } else
                e.imageData = t
        }
        s(),
        e.syncFromSource || (e.syncFromSource = s),
        u(e, n),
        o(e)
    }
    function m(e, t, n) {
        const {whenLoaded: o=(()=>{}
        )} = n;
        e.syncFromSource = function() {
            t.originalBlob && (e.originalBlob = t.originalBlob);
            const o = v(t, C(t, n));
            b(e, o),
            u(e, n)
        }
        ,
        e.syncFromSource(),
        y(e),
        o(e)
    }
    function y(e) {
        const {queueForAfterLoad: t=[]} = e;
        delete e.queueForAfterLoad,
        t.forEach((t=>t(e)))
    }
    function x(e, t={}) {
        const {width: n=e.width, height: o=e.height, topLeftX: r=0, topLeftY: i=0} = t
          , a = document.createElement("canvas");
        a.width = n,
        a.height = o;
        return a.getContext("2d").putImageData(e, -r, -i),
        a
    }
    function v(e, {cropSource: t, widthInPixels: n, heightInPixels: o}) {
        const {width: r, height: i, topLeftX: a, topLeftY: s} = t
          , l = document.createElement("canvas");
        l.width = n,
        l.height = o;
        const c = l.getContext("2d");
        return function(e) {
            e.imageSmoothingEnabled = !1,
            e.mozImageSmoothingEnabled = !1,
            e.msImageSmoothingEnabled = !1
        }(c),
        c.drawImage(e, a, s, r, i, 0, 0, n, o),
        l
    }
    function b(e, t, n={}) {
        const o = t.getContext("2d")
          , {topLeft: r={}, width: i=t.width, height: a=t.height} = n
          , {x: s=0, y: l=0} = r
          , c = o.getImageData(s, l, i, a);
        e.imageData = c,
        e.imageDataData = c.data
    }
    function w(e, {width: t, height: n}) {
        void 0 === e.width && void 0 === e.height && (void 0 !== t && (e.width = t),
        void 0 !== n && (e.height = n))
    }
    function C(e, n) {
        const o = l(e, n.cropSource);
        let {widthInPixels: r, heightInPixels: i, pixelSize: a} = n;
        if (a) {
            let {width: e, height: s} = t(Object.assign({
                sourceWidth: o.width,
                sourceHeight: o.height
            }, n));
            r = Math.ceil(e / a),
            i = Math.ceil(s / a)
        }
        let s = t({
            width: r,
            height: i,
            sourceWidth: o.width,
            sourceHeight: o.height
        });
        r = Math.round(s.width),
        i = Math.round(s.height);
        const c = r !== e.width || i !== e.height
          , {cropped: u} = o;
        return {
            cropSource: o,
            widthInPixels: r,
            heightInPixels: i,
            rescaled: c,
            cropped: u
        }
    }
    return d.toCanvas = function(e={}) {
        let t = x(this.imageData);
        const n = C(t, e)
          , {cropped: o, rescaled: r} = n;
        return (o || r) && (t = v(t, n)),
        t
    }
    ,
    d.toScreenCanvas = function(e={}) {
        const {ScreenCanvas: t} = c;
        if (!t)
            throw new Error("You should add the ScreenCanvas lib to your project to be able to export with toScreenCanvas()");
        return new t(this.toCanvas(e))
    }
    ,
    d.toScreen = function(e={}) {
        const {Screen: t} = c;
        if (!t)
            throw new Error("You should add the Screen lib to your project to be able to export with toScreen()");
        const n = this.toCanvas(e)
          , o = new t(n)
          , {center: r, width: i} = this.getPosition();
        return o.setCamera({
            center: r,
            scale: n.width / i
        }),
        o
    }
    ,
    d.toBlob = function(e={}) {
        const {type: t="image/png", quality: n} = e
          , o = this.toCanvas(e);
        return new Promise((e=>o.toBlob(e, t, n)))
    }
    ,
    d.toPNGImage = function(e={}) {
        const t = this.toCanvas(e)
          , n = new Image;
        return e.whenLoaded && n.addEventListener("load", (()=>e.whenLoaded(n))),
        n.src = t.toDataURL("image/png"),
        n
    }
    ,
    d.download = function(e={}) {
        e = Object.assign({
            name: "screen_image"
        }, e);
        let t = ()=>{
            if (!this.touched && this.originalBlob) {
                let {name: t, fileName: n=t} = e;
                i({
                    name: n,
                    content: this.originalBlob
                })
            } else
                r(this.toCanvas(e), e)
        }
        ;
        this.queueForAfterLoad ? this.queueForAfterLoad.push(t) : t()
    }
    ,
    d.getCompanionScreen = function() {
        return this.companionScreen || (this.companionScreen = this.toScreen()),
        this.companionScreen
    }
    ,
    function(e, t) {
        c = e,
        u = t;
        for (let e in d)
            c.prototype[e] = d[e];
        return {
            importFromSource: h
        }
    }
}
)),
/*! Toxilib screen_image
 * Copyright 2014 Toxicode, pierre.lancien @ toxicode.fr
*/
define("toxilibs/screen_image", ["./topleft_and_pivot", "./discretizer", "./auto_dimensions", "./color", "./screen_image_import_export"], (function(e, t, n, o, r) {
    const {getTopLeftPoint: i, copyPositionParam: a, addPositionAccessors: s} = e
      , {autoConvertToRGB255: l, convertTo255: c} = o;
    function u(e) {
        "onLoad"in e && (e.whenLoaded = e.onLoad,
        console.warn("Deprecation for screen images - onLoad has been replaced with whenLoaded"));
        const {source: t, whenLoaded: n=(()=>{}
        )} = e;
        !function(e) {
            if ("pixelSize"in e) {
                if ("widthInPixels"in e)
                    throw new Error("You can not set widthInPixels when pixelSize is specified");
                if ("heightInPixels"in e)
                    throw new Error("You can not set heightInPixels when pixelSize is specified")
            }
        }(e),
        t ? d(this, t, e) : (h(this, e),
        n(this)),
        this.syncFromSource || (this.syncFromSource = ()=>{}
        )
    }
    const {importFromSource: d} = r(u, h);
    function h(e, t) {
        let {widthInPixels: n, heightInPixels: r, useOpacity: i} = t;
        const {imageData: a} = e;
        a ? (n = a.width,
        r = a.height,
        e.widthInPixels = n,
        e.heightInPixels = r) : (n && (n = Math.round(n)),
        r && (r = Math.round(r))),
        function(e, t, {widthInPixels: n, heightInPixels: o}) {
            f(e, t, {
                widthInPixels: n,
                heightInPixels: o
            }),
            void 0 === n && void 0 !== o && (n = Math.round(o * e.width / e.height));
            void 0 !== n && void 0 === o && (o = Math.round(n * e.height / e.width));
            const {pixelSize: r} = t
              , {xCellsCount: i, yCellsCount: a} = p(e, {
                widthInPixels: n,
                heightInPixels: o,
                pixelSize: r
            });
            e.widthInPixels = i,
            e.heightInPixels = a,
            e.pixelsCount = i * a,
            function(e) {
                let {width: t, height: n} = e;
                Object.defineProperty(e, "width", {
                    get: ()=>t,
                    set: n=>{
                        t !== n && (t = n,
                        p(e))
                    }
                    ,
                    configurable: !0
                }),
                Object.defineProperty(e, "height", {
                    get: ()=>n,
                    set: t=>{
                        n !== t && (n = t,
                        p(e))
                    }
                    ,
                    configurable: !0
                })
            }(e)
        }(e, t, {
            widthInPixels: n,
            heightInPixels: r
        }),
        t.bare || (a || function(e) {
            const {widthInPixels: t, heightInPixels: n} = e;
            e.imageData = new ImageData(t,n),
            e.imageDataData = e.imageData.data,
            e.makeOpaque()
        }(e),
        function(e) {
            let {widthInPixels: t, imageDataData: n} = e;
            e.getFastColorAtIndex = function(e) {
                return {
                    red: n[e *= 4] / 255,
                    green: n[e + 1] / 255,
                    blue: n[e + 2] / 255,
                    opacity: n[e + 3] / 255
                }
            }
            ,
            e.getFastColorAtPixelCoords = function(n) {
                return e.getFastColorAtIndex(n.x + n.y * t)
            }
            ,
            e.getFastColorAt = function(n) {
                const o = this.discretize(n);
                return o ? e.getFastColorAtIndex(o.x + o.y * t) : null
            }
            ,
            e.getColorAtIndex = function(e) {
                return new o(n[e *= 4] / 255,n[e + 1] / 255,n[e + 2] / 255,n[e + 3] / 255)
            }
            ,
            e.getColorAtPixelCoords = function(n) {
                return e.getColorAtIndex(n.x + n.y * t)
            }
            ,
            e.getColorAt = function(n) {
                const o = this.discretize(n);
                return o ? e.getColorAtIndex(o.x + o.y * t) : null
            }
        }(e),
        function(e, {useOpacity: t}) {
            let {widthInPixels: n, imageDataData: o} = e
              , r = !0;
            e.setColorAtIndex = t ? function(t, n) {
                r && (e.touched = !0,
                r = !1),
                t *= 4;
                const i = l(n)
                  , {opacity: a=1} = n;
                o[t] = i.red,
                o[t + 1] = i.green,
                o[t + 2] = i.blue,
                o[t + 3] = c(a)
            }
            : function(t, n) {
                r && (e.touched = !0,
                r = !1),
                t *= 4;
                const i = l(n);
                o[t] = i.red,
                o[t + 1] = i.green,
                o[t + 2] = i.blue
            }
            ;
            const {setColorAtIndex: i} = e;
            e.setLight255AtIndex = function(t, n) {
                r && (e.touched = !0,
                r = !1),
                o[t *= 4] = n,
                o[t + 1] = n,
                o[t + 2] = n
            }
            ,
            e.setColorAtPixelCoords = function(e, t) {
                i(e.x + e.y * n, t)
            }
            ,
            e.setColorAt = function(t, o) {
                const r = e.discretize(t);
                r && i(r.x + r.y * n, o)
            }
        }(e, {
            useOpacity: i
        }),
        s(e, {
            whenChanged: ()=>p(e)
        }))
    }
    function f(e, t, {widthInPixels: o, heightInPixels: r}) {
        const {width: i=e.width, height: s=e.height, orientation: l} = t;
        if (l)
            throw new Error("orientation not yet implemented for ScreenImage");
        const c = n({
            width: i,
            height: s,
            sourceWidth: o,
            sourceHeight: r
        });
        e.width = c.width,
        e.height = c.height,
        a(t, e, {
            replace: !0
        })
    }
    function p(e, {pixelSize: n, widthInPixels: o=e.widthInPixels, heightInPixels: r=e.heightInPixels}={}) {
        const i = e.getPosition();
        if (!i)
            return {
                xCellsCount: o,
                yCellsCount: r
            };
        const {width: a, height: s, topLeft: l} = i
          , {x: c, y: u} = l
          , d = t(e, {
            xMin: c,
            xMax: c + a,
            yMin: u - s,
            yMax: u,
            xCellsCount: o,
            yCellsCount: r,
            cellSize: n
        });
        return e.pixelCoordsToCoords = e.gridCoordsToCoords,
        e.coordsToPixelCoords = e.discretize,
        d
    }
    return u.prototype.setColorForEachPixel = function(e) {
        const {pixelsCount: t, gridIndexToCoords: n, setColorAtIndex: o} = this;
        for (let r = 0; r < t; r++) {
            const {x: t, y: i} = n(r);
            o(r, e(t, i))
        }
    }
    ,
    u.prototype.setColorForEachPixelUsingPixelCoords = function(e) {
        const {pixelsCount: t, gridIndexToGridCoords: n, setColorAtIndex: o} = this;
        for (let r = 0; r < t; r++) {
            const {x: t, y: i} = n(r);
            o(r, e(t, i))
        }
    }
    ,
    u.prototype.setColorForEachPixelUsingIndex = function(e) {
        const {pixelsCount: t, setColorAtIndex: n} = this;
        for (let o = 0; o < t; o++)
            n(o, e(o))
    }
    ,
    u.prototype.modifyColors = function(e) {
        const {pixelsCount: t, getColorAtIndex: n, setColorAtIndex: o} = this;
        for (let r = 0; r < t; r++)
            o(r, e(n(r)))
    }
    ,
    u.prototype.makeOpaque = function() {
        const {pixelsCount: e, imageDataData: t} = this
          , n = 4 * e;
        for (let e = 0; e < n; e += 4)
            t[e + 3] = 255
    }
    ,
    u.prototype.fillWithColor = function(...e) {
        this.touched = !0;
        const {red: t, green: n, blue: o} = l(...e)
          , {pixelsCount: r, imageDataData: i} = this
          , a = 4 * r;
        for (let e = 0; e < a; e += 4)
            i[e] = t,
            i[e + 1] = n,
            i[e + 2] = o
    }
    ,
    u.prototype.fillWithCheckers = function() {
        this.touched = !0;
        const {pixelsCount: e, imageDataData: t, gridIndexToGridCoords: n} = this;
        for (let o = 0; o < e; o++) {
            const e = 4 * o
              , {x: r, y: i} = n(o);
            let a = 0;
            r % 2 + i % 2 == 1 && (a = 255),
            t[e] = a,
            t[e + 1] = a,
            t[e + 2] = a
        }
    }
    ,
    u.prototype.getPosition = function() {
        const {width: e, height: t} = this
          , n = i(this, e, t);
        return n ? {
            topLeft: n,
            center: {
                x: n.x + e / 2,
                y: n.y - t / 2
            },
            width: e,
            height: t,
            orientation: 0
        } : null
    }
    ,
    u.prototype.updatePosition = function(e) {
        console.warn("ScreenImage.updatePosition is deprecated... Now you can just do screenImage.center = {x, y} or screenImage.width = 56"),
        f(this, e, this)
    }
    ,
    u
}
)),
/*! Toxilib screen_canvas
 * Copyright 2014 Toxicode, pierre.lancien @ toxicode.fr
*/
define("toxilibs/screen_canvas", ["./screen_canvas_style", "./topleft_and_pivot", "./bezier", "./auto_dimensions", "./screen_image_utils", "./screen_image", "./color", "./download"], (function(e, t, n, o, r, i, a, s) {
    const {downloadCanvasAsImage: l} = s
      , {getCropParams: c, getUsableImageAndPositionParams: u, getImageByUrl: d} = r
      , h = Math.PI / 180;
    let f, p;
    function g(t) {
        f || (f = document.createElement("canvas"),
        p = f.getContext("2d")),
        this.canvas = t,
        this.cx = t.getContext("2d"),
        this.canvasStyle = new e(this)
    }
    i.ScreenCanvas = g,
    g.prototype.updatedDimensions = function() {
        this.canvasStyle.resetStyle();
        let {width: e, height: t} = this.canvas;
        return {
            width: e,
            height: t
        }
    }
    ,
    g.prototype.clear = function(e={}) {
        let {x: t=0, y: n=0, width: o=this.canvas.width, height: r=this.canvas.height, color: i} = e;
        t = Math.floor(t),
        n = Math.floor(n),
        o = Math.ceil(o),
        r = Math.ceil(r),
        i ? function(e, {x: t, y: n, width: o, height: r}, i) {
            let {cx: a, canvasStyle: s} = e;
            s.setSpecialStyles(i),
            s.setFillStyle(i),
            "opacity"in i && a.clearRect(t, n, o, r);
            e.cx.fillRect(t, n, o, r),
            s.resetSpecialStyles()
        }(this, {
            x: t,
            y: n,
            width: o,
            height: r
        }, e) : this.cx.clearRect(t, n, o, r)
    }
    ,
    g.prototype.resetStyle = function() {
        this.canvasStyle.resetStyle()
    }
    ,
    g.prototype.setOpacity = function(e) {
        this.canvasStyle.setOpacity(e)
    }
    ,
    g.prototype.getOpacity = function() {
        return this.cx.globalAlpha
    }
    ,
    g.prototype.isInside = function({x: e, y: t}) {
        return e >= 0 && t >= 0 && e < this.canvas.width && t < this.canvas.height
    }
    ;
    function m(e, t={}) {
        let {canvas: n} = e
          , {topLeftX: o, topLeftY: r, width: i, height: a, cropped: s} = c(n, t);
        return s ? (f.width = i,
        f.height = a,
        p.drawImage(n, -o, -r),
        f) : n
    }
    function y(e) {
        if (!e)
            throw new Error('"points" param is missing');
        if (!Array.isArray(e))
            throw new Error('"points" must be an array')
    }
    g.prototype.getPixelColor = function(e) {
        if (!this.isInside(e))
            return !1;
        let t = this.cx.getImageData(0 | e.x, 0 | e.y, 1, 1).data;
        return new a({
            red255: t[0],
            green255: t[1],
            blue255: t[2],
            opacity: t[3] / 255
        })
    }
    ,
    g.prototype.toImageData = function(e={}) {
        const {topLeftX: t, topLeftY: n, width: o, height: r} = c(this.canvas, e);
        return this.cx.getImageData(t, n, o, r)
    }
    ,
    g.prototype.toBlob = function(e={}) {
        const t = m(this, e)
          , {type: n="image/png", quality: o} = e;
        return new Promise((e=>{
            t.toBlob(e, n, o)
        }
        ))
    }
    ,
    g.prototype.toPNGImage = function(e={}) {
        const t = m(this, e)
          , n = new Image;
        return n.src = t.toDataURL("image/png"),
        n
    }
    ,
    g.prototype.downloadAsImage = function(e={}) {
        const t = m(this, e);
        e = Object.assign({
            name: "screen"
        }, e),
        l(t, e)
    }
    ,
    g.prototype.drawRectangle = function(e) {
        let {width: n, height: o} = e
          , {cx: r, canvasStyle: i} = this
          , a = t.getTopLeftPoint(e, n, -o);
        i.setSpecialStyles(e),
        (e.color || e.fillColor || e.linearGradient || e.radialGradient) && (i.setFillStyle(e),
        r.fillRect(a.x, a.y, n, o)),
        e.strokeColor && (i.setStrokeStyle(e),
        r.strokeRect(a.x, a.y, n, o)),
        i.resetSpecialStyles()
    }
    ,
    g.prototype.drawLine = function(e) {
        let {origin: t, end: n, vector: o} = e;
        if (!t)
            throw new Error('"origin" param is missing');
        let {cx: r, canvasStyle: i} = this;
        if (!n) {
            if (!o)
                throw new Error('"end" or "vector" param is missing');
            n = {
                x: t.x + o.x,
                y: t.y + o.y
            }
        }
        i.setSpecialStyles(e),
        r.beginPath(),
        r.moveTo(t.x, t.y),
        r.lineTo(n.x, n.y),
        r.closePath(),
        i.stroke(e),
        i.resetSpecialStyles()
    }
    ,
    g.prototype.drawArc = function(e) {
        let {cx: t, canvasStyle: n} = this;
        n.setSpecialStyles(e),
        t.beginPath(),
        w(t, e),
        t.closePath(),
        n.strokeAndFill(e),
        n.resetSpecialStyles()
    }
    ,
    g.prototype.drawPie = function(e) {
        let {center: t, radius: n, innerRadius: o, startAngle: r, endAngle: i} = e
          , {cx: a, canvasStyle: s} = this;
        if (!t)
            throw new Error('"center" param is missing');
        if (s.setSpecialStyles(e),
        a.beginPath(),
        !o && (r || i && 360 !== i) && a.moveTo(t.x, t.y),
        w(a, {
            center: t,
            radius: n,
            startAngle: r,
            endAngle: i
        }),
        o) {
            let e = {
                center: t,
                radius: o,
                startAngle: i,
                endAngle: r,
                antiClockWise: !0
            };
            e.startAngle || e.endAngle || (e.endAngle = -360,
            a.moveTo(t.x + this.cosAngle * o, t.y - this.sinAngle * o)),
            w(a, e)
        }
        a.closePath(),
        s.strokeAndFill(e),
        s.resetSpecialStyles()
    }
    ,
    g.prototype.drawCircle = g.prototype.drawPie,
    g.prototype.drawCurve = function(e) {
        let {points: t, smooth: o=0, close: r} = e;
        y(t),
        t.length < 2 || (t.length < 3 && (r = !1),
        k(this, {
            params: e,
            beziersParams: n.autoParamsFromPoints({
                points: t,
                smooth: o,
                close: r
            }),
            close: r,
            colorIsFillColor: !1
        }))
    }
    ,
    g.prototype.drawFreeShape = function(e) {
        let {points: t, smooth: o=0, close: r=!0} = e;
        y(t),
        t.length < 2 || (t.length < 3 && (r = !1),
        k(this, {
            params: e,
            beziersParams: n.autoParamsFromPoints({
                points: t,
                smooth: o,
                close: r
            }),
            close: r,
            colorIsFillColor: !0
        }))
    }
    ,
    g.prototype.drawPolygon = g.prototype.drawFreeShape,
    g.prototype.drawLines = g.prototype.drawCurve,
    g.prototype.drawBezier = function(e) {
        k(this, {
            params: e,
            beziersParams: [e],
            colorIsFillColor: !1
        })
    }
    ,
    g.prototype.drawBezierPath = function(e) {
        k(this, {
            params: e,
            beziersParams: e.beziers,
            colorIsFillColor: !1
        })
    }
    ,
    g.prototype.drawText = function(e) {
        let {text: t, orientation: n, flip: o} = e
          , {canvasStyle: r} = this;
        r.setFont(e),
        r.setSpecialStyles(e),
        "object" == typeof t && (t = JSON.stringify(t));
        let i = function({topLeft: e, topRight: t, bottomLeft: n, bottomRight: o, center: r, bottom: i, bottomCenter: a=i, top: s, topCenter: l=s, right: c, centerRight: u=c, left: d, centerLeft: h=d}) {
            if (e)
                return {
                    origin: e,
                    textAlign: "left",
                    textBaseline: "top"
                };
            if (t)
                return {
                    origin: t,
                    textAlign: "right",
                    textBaseline: "top"
                };
            if (n)
                return {
                    origin: n,
                    textAlign: "left",
                    textBaseline: "alphabetic"
                };
            if (o)
                return {
                    origin: o,
                    textAlign: "right",
                    textBaseline: "alphabetic"
                };
            if (r)
                return {
                    origin: r,
                    textAlign: "center",
                    textBaseline: "middle"
                };
            if (a)
                return {
                    origin: a,
                    textAlign: "center",
                    textBaseline: "alphabetic"
                };
            if (l)
                return {
                    origin: l,
                    textAlign: "center",
                    textBaseline: "top"
                };
            if (u)
                return {
                    origin: u,
                    textAlign: "right",
                    textBaseline: "middle"
                };
            if (h)
                return {
                    origin: h,
                    textAlign: "left",
                    textBaseline: "middle"
                };
            return !1
        }(e);
        if (i.text = t,
        i.userParams = e,
        !i.origin)
            throw new Error('a position param is missing. Include one, for example "center", "topLeft"...');
        if (function(e, t) {
            "horizontal" === e ? "right" === t.textAlign ? t.textAlign = "left" : "left" === t.textAlign && (t.textAlign = "right") : "vertical" === e && ("top" === t.textBaseline ? t.textBaseline = "alphabetic" : "alphabetic" === t.textBaseline && (t.textBaseline = "top"))
        }(o, i),
        n || o) {
            let e = this;
            A(this, {
                origin: i.origin,
                orientation: n,
                flip: o,
                execute: function() {
                    i.origin = {
                        x: 0,
                        y: 0
                    },
                    S(e, i)
                }
            })
        } else
            S(this, i);
        r.resetSpecialStyles()
    }
    ,
    g.prototype.drawImage = function(e) {
        let {image: t, url: n} = e;
        if (n && console.warn("'url' param in drawImage has been replaced with 'image'"),
        n || "string" == typeof t) {
            const {errorHandler: o} = this;
            d({
                url: n || t,
                errorHandler: o,
                callback: t=>v(this, e, t)
            })
        } else
            v(this, e)
    }
    ,
    g.prototype.drawImageData = function(e) {
        let {imageData: n, smoothing: r=!0, opacity: i=1} = e
          , {cx: a, canvasStyle: s} = this
          , {width: l, height: c, sourceWidth: u, sourceHeight: d, pixelSize: h} = function(e, {width: t, height: n, pixelSize: r=!1}) {
            let {width: i, height: a} = e;
            if (r)
                t = i * r,
                n = a * r;
            else {
                r = 1;
                let e = o({
                    width: t,
                    height: n,
                    sourceWidth: i,
                    sourceHeight: a
                });
                t = e.width,
                n = e.height
            }
            return {
                width: t,
                height: n,
                sourceWidth: i,
                sourceHeight: a,
                pixelSize: r
            }
        }(n, e)
          , f = t.getTopLeftPoint(e, l, -c) || {
            x: 0,
            y: 0
        };
        l === u && c === d && 1 === i ? a.putImageData(n, f.x, f.y) : (s.setSpecialStyles(e),
        this.canvasStyle.setSmoothing(r),
        b(this, {
            pixelSize: h,
            width: u,
            height: d
        }),
        this.ghostUnscaledCx.putImageData(n, 0, 0),
        a.drawImage(this.ghostUnscaledCanvas, f.x, f.y, l, c)),
        s.resetSpecialStyles()
    }
    ;
    const x = {
        forceTopLeft: !0,
        reverseY: !0
    };
    function v(e, n, o) {
        let r = o || n.image;
        const {image: i, positionParams: a} = u(r, n, x)
          , {scale: s, modifier: l, modifierPixelBox: c, smoothing: d=!0} = n;
        let {cx: h, canvasStyle: g} = e;
        if (g.setSmoothing(d),
        l && (h = p),
        g.setSpecialStyles(n),
        a.orientation)
            !function(e, {image: n, positionParams: o, params: r}) {
                let {cx: i} = e
                  , {topLeft: a, width: s, height: l, orientation: c, flip: u, cropSource: d} = o;
                if (!a)
                    throw new Error("Cannot display the image : position is missing");
                let h = t.getPivot(r, s, -l);
                h && (a = t.topLeftPointWithPivot(a, -c, h));
                function f() {
                    const t = n.imageData || n.toImageData && n.toImageData();
                    t ? (b(e, {
                        pixelSize: 1,
                        width: d.width,
                        height: d.height
                    }),
                    e.ghostUnscaledCx.putImageData(t, -d.topLeftX, -d.topLeftY),
                    i.drawImage(e.ghostUnscaledCanvas, 0, 0, s, l)) : i.drawImage(n, d.topLeftX, d.topLeftY, d.width, d.height, 0, 0, s, l)
                }
                A(e, {
                    origin: a,
                    orientation: c,
                    execute: f,
                    flip: u,
                    width: s,
                    height: l
                })
            }(e, {
                image: i,
                params: n,
                positionParams: a
            });
        else {
            if (s)
                throw new Error("Do you really need a scale param ? Talk to Pierre L");
            !function(e, {image: t, positionParams: n}) {
                let {cx: o} = e
                  , {topLeft: r, width: i, height: a, cropSource: s, flip: l} = n;
                if (!r)
                    throw new Error("Cannot display the image : position is missing");
                let c = Math.floor(r.x)
                  , u = Math.floor(r.y);
                const d = t.imageData || t.toImageData && t.toImageData();
                "horizontal" === l ? (o.save(),
                o.translate(i + 2 * c, 0),
                o.scale(-1, 1)) : "vertical" === l && (o.save(),
                o.translate(0, a + 2 * u),
                o.scale(1, -1));
                d ? (b(e, {
                    pixelSize: 1,
                    width: s.width,
                    height: s.height
                }),
                e.ghostUnscaledCx.putImageData(d, -s.topLeftX, -s.topLeftY),
                o.drawImage(e.ghostUnscaledCanvas, c, u, Math.ceil(i), Math.ceil(a))) : o.drawImage(t, s.topLeftX, s.topLeftY, s.width, s.height, c, u, Math.ceil(i), Math.ceil(a));
                "horizontal" !== l && "vertical" !== l || o.restore()
            }(e, {
                image: i,
                positionParams: a
            })
        }
        g.resetSpecialStyles(),
        l && (l(f),
        function(e, t) {
            let n = new Image;
            n.crossOrigin = "Anonymous",
            n.src = e.toDataURL(),
            n.complete ? t(n) : n.addEventListener("load", (function() {
                t(n)
            }
            ), !1)
        }(f, (function(e) {
            h.drawImage(e, c.x, c.y)
        }
        )))
    }
    function b(e, {width: t, height: n}) {
        e.ghostUnscaledCanvas || (e.ghostUnscaledCanvas = document.createElement("canvas"),
        e.ghostUnscaledCx = e.ghostUnscaledCanvas.getContext("2d")),
        e.ghostUnscaledCanvas.width = t,
        e.ghostUnscaledCanvas.height = n
    }
    function w(e, {center: t, radius: n, startAngle: o=0, endAngle: r=360, antiClockWise: i}) {
        [o,r] = [-r, -o],
        n < 0 && (n = 0),
        e.arc(t.x, t.y, n, o * h, r * h, i)
    }
    const C = /[0-9.]+px/;
    function S(e, {text: t, textAlign: n, textBaseline: o, origin: r, userParams: i}) {
        const {cx: a} = e;
        let s;
        a.textAlign = n,
        a.textBaseline = o,
        ("width"in i || "height"in i) && ("height"in i && !i.useFontMetrics && (a.textBaseline = "alphabetic"),
        s = a.font,
        a.font = s.replace(C, (function(e) {
            e = parseFloat(e);
            const n = a.measureText(t)
              , {factor: s} = _({
                measure: n,
                origin: r,
                userParams: i,
                textBaseline: o
            });
            return e * s + "px"
        }
        )));
        let l = {
            text: t,
            origin: r,
            userParams: i
        };
        !function(e, {text: t, origin: n, userParams: o}) {
            if (o.color || o.fillColor || !o.strokeColor) {
                let {cx: r, canvasStyle: i} = e;
                i.setFillStyle(o),
                r.fillText(t, n.x, n.y)
            }
        }(e, l),
        function(e, {text: t, origin: n, userParams: o}) {
            if (o.strokeColor && 0 !== o.lineWidth) {
                let {cx: r, canvasStyle: i} = e;
                i.setStrokeStyle(o),
                r.strokeText(t, n.x, n.y)
            }
        }(e, l),
        s && (a.font = s)
    }
    function _({measure: e, origin: t, userParams: n, textBaseline: o}) {
        let r;
        const {useFontMetrics: i} = n;
        let {width: a} = e;
        r = "width"in n ? n.width / a : 1 / 0;
        let s = T({
            measure: e,
            useFontMetrics: i
        });
        return "height"in n && (r = Math.min(r, n.height / s),
        !i && t && (t.y -= e.actualBoundingBoxDescent * r,
        "top" === o ? t.y += s * r : "middle" === o && (t.y += s * r / 2))),
        {
            factor: r,
            height: s * r,
            width: a * r
        }
    }
    function T({measure: e, useFontMetrics: t}) {
        return t ? e.fontBoundingBoxAscent + e.fontBoundingBoxDescent : e.actualBoundingBoxAscent + e.actualBoundingBoxDescent
    }
    function k(e, {params: t, beziersParams: n, close: o=t.close, colorIsFillColor: r}) {
        let {cx: i, canvasStyle: a} = e;
        a.setSpecialStyles(t);
        let {origin: s} = n[0];
        i.beginPath(),
        i.moveTo(s.x, s.y),
        n.forEach((e=>{
            e.controlOrigin || e.controlEnd ? function(e, {origin: t, end: n, controlOrigin: o=t, controlEnd: r=n}) {
                e.bezierCurveTo(o.x, o.y, r.x, r.y, n.x, n.y)
            }(i, e) : i.lineTo(e.end.x, e.end.y)
        }
        )),
        o && i.closePath(),
        r || t.fillColor ? a.strokeAndFill(t) : a.stroke(t),
        a.resetSpecialStyles()
    }
    function A(e, {origin: t, orientation: n=0, execute: o, flip: r, width: i=0, height: a=0}) {
        const {cx: s, canvasStyle: l} = e
          , {x: c, y: u} = t;
        s.save(),
        s.translate(c, u),
        n && s.rotate(-n * h),
        "horizontal" === r ? (s.translate(i, 0),
        s.scale(-1, 1)) : "vertical" === r && (s.translate(0, a),
        s.scale(1, -1)),
        o(),
        s.restore(),
        l.resetStyle()
    }
    return g.prototype.getTextDimensions = function(e) {
        const {cx: t, canvasStyle: n} = this
          , {text: o} = e
          , r = t.font;
        n.setFont(e);
        let i, {font: a} = t, s = t.measureText(o), l = 1, {width: c} = s;
        return ("width"in e || "height"in e) && (a = a.replace(C, (function(t) {
            t = parseFloat(t);
            let n = _({
                measure: s,
                userParams: e
            });
            return l = n.factor,
            c = n.width,
            i = n.height,
            Math.round(10 * t * l) / 10 + "px"
        }
        ))),
        n.setFont({
            font: r
        }),
        {
            width: c,
            font: a,
            height: Math.round(i || T({
                measure: s,
                useFontMetrics: e.useFontMetrics
            }))
        }
    }
    ,
    g
}
)),
/*! Toxilib local_2D
 * Copyright 2014 Toxicode, pierre.lancien @ toxicode.fr
*/
define("toxilibs/local_2D", [], (function() {
    const e = {
        o: {
            x: 0,
            y: 0
        },
        i: {
            x: 1,
            y: 0
        },
        localLengthToGlobal: 1
    }
      , t = Math.PI / 180
      , n = 1 / t;
    function o(e) {
        this.initialize2D(e)
    }
    function r({relativeTo: t=e, x: n, y: r, orientation: i, scale: a=1, link: s}={}) {
        "function" == typeof t && (t = t()),
        "localLengthToGlobal"in t || (t = new o(t)),
        this.referenceFrame = t,
        this.xAsChild = "function" == typeof n ? n() : n || 0,
        this.yAsChild = "function" == typeof r ? r() : r || 0,
        this.orientationAsChild = "function" == typeof i ? i() : i || 0,
        this.scaleAsChild = "function" == typeof a ? a() : a,
        _(this),
        s && t && ("children"in t ? t.children.push(this) : t.children = [this])
    }
    function i({x: e=null, y: t=null, orientation: n=null, scale: o=null}={}) {
        if (null !== e && (this.xAsChild = e),
        null !== t && (this.yAsChild = t),
        null !== n && (this.orientationAsChild = n),
        null !== o && (this.scaleAsChild = o),
        _(this),
        delete this._cachedFrameGlobalOrientation,
        delete this._inverseSquarelocalLengthToGlobal,
        this.children)
            for (let e of this.children)
                e.updateReference()
    }
    function a() {
        let {i: e} = this;
        return {
            x: -e.y,
            y: e.x
        }
    }
    function s(e, t) {
        return t * e.localLengthToGlobal / this.localLengthToGlobal
    }
    function l(e) {
        return this.localLengthToGlobal * e
    }
    function c(e) {
        return e / this.localLengthToGlobal
    }
    function u(e, t) {
        return T(e) + t - T(this)
    }
    function d(e=0) {
        return T(this) + e
    }
    function h(e=0) {
        return e - T(this)
    }
    function f(e, t, n) {
        let {i: o} = e
          , r = o.x * t - o.y * n
          , i = o.y * t + o.x * n;
        return this.localVector(r, i)
    }
    function p(e, t) {
        this._inverseSquareLocalLengthToGlobal || (this._inverseSquareLocalLengthToGlobal = 1 / (this.localLengthToGlobal * this.localLengthToGlobal));
        let {i: n} = this;
        return {
            x: (n.x * e + n.y * t) * this._inverseSquareLocalLengthToGlobal,
            y: (n.x * t - n.y * e) * this._inverseSquareLocalLengthToGlobal
        }
    }
    function g(e, t, n) {
        let {i: o, o: r} = e
          , i = r.x + o.x * t - o.y * n
          , a = r.y + o.y * t + o.x * n;
        return this.localVector(i - this.o.x, a - this.o.y)
    }
    function m(e, t) {
        return this.localVector(e - this.o.x, t - this.o.y)
    }
    function y(...e) {
        let t = e.shift();
        return e.map((e=>this.pointFromFrame(t, e[0], e[1])))
    }
    function x(...e) {
        return e.map((e=>this.globalPoint(e[0], e[1])))
    }
    function v(...e) {
        return e.map((e=>this.localPoint(e[0], e[1])))
    }
    function b(e) {
        if ("localLengthToGlobal"in e) {
            const {x: t, y: n} = e.o;
            return new o({
                x: t,
                y: n,
                orientation: T(e),
                scale: e.localLengthToGlobal,
                relativeTo: this
            })
        }
        {
            const {x: t, y: n, orientation: r, scale: i} = e;
            return new o({
                x: t,
                y: n,
                orientation: r,
                scale: i,
                relativeTo: this
            })
        }
    }
    function w(e) {
        Object.assign(e, {
            initialize2D: r,
            updateReference: i,
            j: a,
            lengthFromFrame: s,
            globalLength: l,
            localLength: c,
            orientationFromFrame: u,
            globalOrientation: d,
            localOrientation: h,
            vectorFromFrame: f,
            globalVector: function(e, t) {
                return C(this, e, t)
            },
            localVector: p,
            pointFromFrame: g,
            globalPoint: function(e, t) {
                return S(this, e, t)
            },
            localPoint: m,
            pointsFromFrame: y,
            globalPoints: x,
            localPoints: v,
            globalBase: b
        })
    }
    function C(e, t, n) {
        let {i: o} = e;
        return {
            x: o.x * t - o.y * n,
            y: o.y * t + o.x * n
        }
    }
    function S(e, t, n) {
        let {o: o, i: r} = e;
        return {
            x: o.x + r.x * t - r.y * n,
            y: o.y + r.y * t + r.x * n
        }
    }
    function _(e) {
        let {referenceFrame: n, orientationAsChild: o, scaleAsChild: r} = e
          , i = t * o;
        if (e.o = S(n, e.xAsChild, e.yAsChild),
        e.i = C(n, r * Math.cos(i), r * Math.sin(i)),
        "localLengthToGlobal"in n)
            e.localLengthToGlobal = n.localLengthToGlobal * r;
        else {
            let {x: t, y: n} = e.i;
            e.localLengthToGlobal = Math.sqrt(t * t + n * n)
        }
    }
    function T(e) {
        if (!("_cachedFrameGlobalOrientation"in e)) {
            let {i: t} = e;
            e._cachedFrameGlobalOrientation = Math.atan2(t.y, t.x) * n
        }
        return e._cachedFrameGlobalOrientation
    }
    return w(o.prototype),
    {
        ReferenceFrame: o,
        addLocal2DCapabilities: w,
        referenceFrameFromGroupParams: function(e) {
            const {x: t, y: n, orientation: r, scale: i=1} = e;
            if (t || n || r || 1 !== i)
                return new o(e);
            let {relativeTo: a} = e;
            return "function" == typeof a && (a = a()),
            a && !("localLengthToGlobal"in a) ? new o(a) : a
        },
        globalPointFromReferenceFrame: function(e, n, o) {
            if ("globalPoint"in e)
                return e.globalPoint(n, o);
            let {scale: r=1, orientation: i=0, x: a=0, y: s=0} = e;
            if (0 === i)
                return {
                    x: a + r * n,
                    y: s + r * o
                };
            {
                const e = i * t;
                let l = Math.cos(e)
                  , c = Math.sin(e);
                return {
                    x: a + r * (n * l - o * c),
                    y: s + r * (n * c + o * l)
                }
            }
        },
        localPointInReferenceFrame: function e(n, o, r) {
            if ("localPoint"in n)
                return n.localPoint(o, r);
            let {scale: i=1, orientation: a=0, x: s=0, y: l=0, relativeTo: c} = n;
            if (c && ({x: o, y: r} = e(c, o, r)),
            0 === a)
                return {
                    x: (o - s) / i,
                    y: (r - l) / i
                };
            {
                const e = a * t;
                let n = Math.cos(e)
                  , c = Math.sin(e)
                  , u = (o - s) / i
                  , d = (r - l) / i;
                return {
                    x: u * n + d * c,
                    y: -u * c + d * n
                }
            }
        }
    }
}
)),
/*! Toxilib stroke
 * Copyright 2014 Toxicode, pierre.lancien @ toxicode.fr
*/
define("toxilibs/stroke", [], (function() {
    function e({leftPath: e, rightPath: t, point: n, delta: o, angle: r}) {
        let i = o * Math.cos(r)
          , a = o * Math.sin(r)
          , {x: s, y: l} = n;
        e.push({
            x: s + i,
            y: l + a
        }),
        t.push({
            x: s - i,
            y: l - a
        })
    }
    function t({x: e, y: t}, n, o) {
        let r;
        if (n && (r = Math.atan2(t - n.y, e - n.x)),
        !o)
            return r - Math.PI / 2;
        let i = Math.atan2(t - o.y, e - o.x);
        if (!n)
            return i + Math.PI / 2;
        let a = (r + i) / 2;
        return a < i && (a += Math.PI),
        a
    }
    return function({points: n, width: o=.1, widthEnvelope: r=!1, pointyEnds: i=!1}) {
        this.width = o,
        this.widthEnvelope = r,
        this.envelope = function({points: n, width: o, widthEnvelope: r, pointyEnds: i}) {
            let a = n[0]
              , s = n[n.length - 1]
              , l = o / 2
              , c = [a]
              , u = [a]
              , d = i ? 1 : 0
              , h = n.length - d;
            for (let o = d; o < h; o++) {
                let i = n[o]
                  , a = t(i, n[o - 1], n[o + 1])
                  , s = l;
                if (r) {
                    s *= r({
                        ratio: o / n.length,
                        point: i
                    })
                }
                e({
                    leftPath: c,
                    rightPath: u,
                    point: i,
                    delta: s,
                    angle: a
                })
            }
            return i ? [...c, s, ...u.reverse()] : [...c, ...u.reverse()]
        }({
            points: n,
            width: o,
            widthEnvelope: r,
            pointyEnds: i
        })
    }
}
)),
/*! Toxilib screen_shapes
 * Copyright 2014 Toxicode, pierre.lancien @ toxicode.fr
*/
define("toxilibs/screen_shapes", ["./topleft_and_pivot", "./local_2D", "./stroke", "./screen_image_utils"], (function(e, t, n, o) {
    const {rotateVector: r, pointsForRectangle: i} = e
      , {referenceFrameFromGroupParams: a, localPointInReferenceFrame: s} = t
      , {addImageDefaultPositionParams: l} = o;
    const c = {};
    let u = ["drawLine", "drawArc", "drawPie", "drawCircle", "drawBezier", "drawBezierPath", "drawCurve", "drawFreeShape", "drawText", "drawPolygon", "drawLines"];
    c.drawRectangle = function(e) {
        const t = i(e, this.yDir);
        let {relativeTo: n, roundedCorners: o, lineWidth: r, opacity: a, blendMode: s, filter: l, shadow: c, blur: u, fillColor: d, color: h=d, strokeColor: f, linearGradient: p, radialGradient: g} = e;
        O(this, e = {
            points: t,
            relativeTo: n,
            roundedCorners: o,
            lineWidth: r,
            opacity: a,
            blendMode: s,
            filter: l,
            shadow: c,
            blur: u,
            color: h,
            strokeColor: f,
            linearGradient: p,
            radialGradient: g
        }),
        e.roundedCorners && (!function(e) {
            const {points: t, roundedCorners: n} = e
              , o = [];
            t.forEach((function(e, r) {
                let i = t[(r + 1) % t.length]
                  , a = C(e, i, n)
                  , s = C(i, e, n);
                a.controlPrevious = S(a, e, b),
                a.controlNext = S(a, e, w),
                s.controlPrevious = S(s, i, w),
                s.controlNext = S(s, i, b),
                o.push(a, s)
            }
            )),
            o.push(o[0]),
            e.points = o
        }(e),
        e.close = !1),
        this.drawAdapter.drawFreeShape(e)
    }
    ,
    c.drawStroke = function(e) {
        let {relativeTo: t, opacity: o, blendMode: r, filter: i, shadow: a, blur: s, strokeColor: l, color: c=l, close: u=!1} = e
          , d = I(e.stroke);
        if (!d) {
            const t = I(e.points)
              , o = I(e.width)
              , r = I(e.pointyEnds)
              , {widthEnvelope: i} = e;
            d = new n({
                points: t,
                width: o,
                widthEnvelope: i,
                pointyEnds: r
            })
        }
        O(this, e = {
            relativeTo: t,
            points: d.envelope,
            fillColor: c,
            opacity: o,
            blendMode: r,
            filter: i,
            shadow: a,
            blur: s,
            close: u
        }),
        this.drawAdapter.drawFreeShape(e)
    }
    ;
    const d = 5
      , h = 30;
    c.drawArrow = function(e) {
        let {branchLengthRatio: t=d, branchAngle: n=h, relativeTo: o} = e;
        "function" == typeof n && (n = n()),
        "function" == typeof t && (t = t()),
        n += 180;
        const i = I(e.origin);
        if (!i)
            throw new Error('"origin" param is missing');
        let a, s, l = I(e.vector);
        if (!l) {
            const t = I(e.end);
            if (!t)
                throw new Error('"end" or "vector" param is missing');
            l = {
                x: t.x - i.x,
                y: t.y - i.y
            }
        }
        "lineWidth"in e ? (a = e.lineWidth,
        "function" == typeof a && (a = a()),
        s = a * t / j(l.x, l.y)) : (a = .02 * j(l.x, l.y),
        s = .02 * t);
        const c = I(e.opacity)
          , u = I(e.blendMode)
          , f = I(e.filter)
          , p = I(e.shadow)
          , g = I(e.blur)
          , m = I(e.color || e.strokeColor);
        let y = {
            x: l.x * s,
            y: l.y * s
        }
          , x = r(y, n)
          , v = r(y, -n)
          , b = {
            origin: i,
            vector: l,
            lineWidth: a,
            color: m,
            opacity: c,
            blendMode: u,
            filter: f,
            shadow: p,
            blur: g,
            relativeTo: o
        };
        this.drawLine(b),
        b.origin = {
            x: i.x + l.x,
            y: i.y + l.y
        },
        b.vector = x,
        this.drawLine(b),
        b.vector = v,
        this.drawLine(b)
    }
    ;
    c.drawAxes = function(e) {
        const t = I(e.orientation)
          , n = I(e.center) || {
            x: 0,
            y: 0
        };
        let {xMin: o, yMin: i, width: a, height: s} = y(this, {
            center: n,
            orientation: t
        });
        const l = I(e.color) || "#06F"
          , c = I(e.opacity);
        !function(e, {height: t, width: n, localXMin: o, localYMin: i, center: a, orientation: s=0, lineWidth: l=.01 * Math.min(n, t), opacity: c=1, color: u="#888"}) {
            let d = r({
                x: 1,
                y: 0
            }, s)
              , h = r({
                x: 0,
                y: 1
            }, s);
            e.drawLine({
                origin: {
                    x: a.x + h.x * i,
                    y: a.y + h.y * i
                },
                vector: {
                    x: h.x * t,
                    y: h.y * t
                },
                color: u,
                opacity: c,
                lineWidth: l
            }),
            e.drawLine({
                origin: {
                    x: a.x + d.x * o,
                    y: a.y + d.y * o
                },
                vector: {
                    x: d.x * n,
                    y: d.y * n
                },
                color: u,
                opacity: c,
                lineWidth: l
            })
        }(this, {
            width: a,
            height: s,
            localXMin: o,
            localYMin: i,
            center: n,
            orientation: t,
            lineWidth: I(e.lineWidth),
            color: l,
            opacity: c
        })
    }
    ,
    c.drawGrid = function(e={}) {
        const t = I(e.orientation)
          , n = I(e.center) || {
            x: 0,
            y: 0
        };
        let o, i = this;
        function a() {
            return o || (o = y(i, {
                center: n,
                orientation: t
            })),
            o
        }
        const s = I(e.step) || function({width: e, height: t}) {
            let n = Math.min(e, t) / 6;
            return Math.max(m(n, 1), m(n, 2), m(n, 5))
        }(a());
        if (s * this.scale < 1)
            return;
        const l = I(e.color)
          , c = I(e.opacityLimit);
        let {axes: u=!0} = e;
        u = I(u);
        let d, h = I(e.localXMin), f = I(e.localXMax);
        void 0 !== h && void 0 !== f ? d = f - h : (d = I(e.width),
        void 0 === d ? (d = a().width,
        void 0 === h && (h = a().xMin)) : void 0 === h && (h = -d / 2));
        let p, g = I(e.localYMin), x = I(e.localYMax);
        void 0 !== g && void 0 !== x ? p = x - g : (p = I(e.height),
        void 0 === p ? (p = a().height,
        void 0 === g && (g = a().yMin)) : void 0 === g && (g = -p / 2)),
        function(e, {height: t, width: n, localXMin: o, localYMin: i, step: a, center: s, orientation: l=0, color: c, opacityLimit: u, axes: d}) {
            let h = r({
                x: 1,
                y: 0
            }, l)
              , f = r({
                x: 0,
                y: 1
            }, l);
            v(e, {
                axes: d,
                startIndex: Math.ceil(o / a),
                endIndex: Math.floor((o + n) / a),
                center: {
                    x: s.x + f.x * i,
                    y: s.y + f.y * i
                },
                lineVector: {
                    x: f.x * t,
                    y: f.y * t
                },
                stepVector: {
                    x: h.x * a,
                    y: h.y * a
                },
                color: c,
                opacityLimit: u
            }),
            v(e, {
                axes: d,
                startIndex: Math.ceil(i / a),
                endIndex: Math.floor((i + t) / a),
                center: {
                    x: s.x + h.x * o,
                    y: s.y + h.y * o
                },
                lineVector: {
                    x: h.x * n,
                    y: h.y * n
                },
                stepVector: {
                    x: f.x * a,
                    y: f.y * a
                },
                color: c,
                opacityLimit: u
            })
        }(this, {
            width: d,
            height: p,
            localXMin: h,
            localYMin: g,
            step: s,
            center: n,
            color: l,
            opacityLimit: c,
            axes: u,
            orientation: t
        })
    }
    ;
    c.drawPointsGrid = function(e) {
        const t = I(e.step) || 1
          , n = I(e.color) || "#EEE"
          , o = I(e.boundingBox) || this.boundingBoxForWholeView();
        if (t * this.scale < 8)
            return;
        const {xMin: r, yMin: i, width: a, height: s} = o
          , l = Math.floor(r / t)
          , c = Math.floor(i / t)
          , u = l + a / t + 1
          , d = c + s / t + 1;
        for (let e = c; e < d; e++)
            for (let o = l; o < u; o++) {
                let r = t * (o % 2 == 0 || e % 2 == 0 ? .06 : .1);
                this.drawCircle({
                    center: {
                        x: o * t,
                        y: e * t
                    },
                    radius: r,
                    color: n
                })
            }
    }
    ;
    function f(e, t) {
        t = R(t);
        const {image: n} = t;
        n && l(t, n),
        O(e, t),
        e.drawAdapter.drawImage(t)
    }
    c.drawDebugReference = function(e={}) {
        const t = I(e.o) || {
            x: 0,
            y: 0
        }
          , n = I(e.i) || {
            x: 1,
            y: 0
        }
          , o = I(e.j) || {
            x: 0,
            y: 1
        }
          , r = I(e.color) || "#B20000"
          , i = I(e.scale) || 1;
        this.drawCircle({
            center: t,
            radius: .05 * i,
            color: r
        }),
        this.drawArrow({
            origin: t,
            vector: {
                x: n.x * i,
                y: n.y * i
            },
            color: r
        }),
        this.drawArrow({
            origin: t,
            vector: {
                x: o.x * i,
                y: o.y * i
            },
            color: r
        })
    }
    ,
    c.drawDebugGrid = function({color: e, step: t}={}) {
        this.drawGrid({
            color: e,
            step: t,
            opacityLimit: {
                max: .5,
                min: .1
            }
        })
    }
    ,
    c.drawVectorFrame = function({scale: e, color: t="#F00"}={}) {
        this.drawDebugReference({
            color: t,
            scale: e
        })
    }
    ,
    c.drawCameraBox = function(e, t={}) {
        "function" == typeof e && (e = e());
        const {center: n, orientation: o, scale: r} = e
          , {strokeColor: i="#FA0", color: a=!1} = t;
        let s = this.width / r
          , l = this.height / r;
        this.drawRectangle({
            center: n,
            width: s,
            height: l,
            orientation: o,
            strokeColor: i,
            color: a,
            lineWidth: 10 / r
        })
    }
    ,
    c.drawImage = function(e) {
        let t = e;
        e.image || (t = {
            image: e
        });
        let {queueForAfterLoad: n} = t.image || {};
        n ? n.push((()=>f(this, t))) : f(this, t)
    }
    ,
    c.drawCustom = function(e) {
        const {drawAdapter: t, adapterScale: n, adapterScaleY: o, center: r, centerPix: i} = this
          , {cx: a, canvasStyle: s} = t
          , l = i.x - r.x * n
          , c = i.y - r.y * o;
        e(a, {
            x: l,
            y: c,
            scale: n,
            useScreenCoords: function() {
                a.setTransform(n, 0, 0, o, l, c)
            }
        }),
        a.setTransform(1, 0, 0, 1, 0, 0),
        s.resyncWithCurrentStyle(),
        s.resetSpecialStyles()
    }
    ;
    let p = 0;
    function g(e, t) {
        let n, o = e.relativeTo;
        return n = o ? t.globalBase(o) : t,
        Object.assign({}, e, {
            relativeTo: n
        })
    }
    function m(e, t) {
        return Math.pow(10, Math.floor(Math.log10(e / t))) * t
    }
    function y(e, {center: t, orientation: n=0}) {
        let o = e.pixelCoordsToCoords({
            x: 0,
            y: 0
        })
          , r = s({
            x: t.x,
            y: t.y,
            orientation: n
        }, o.x, o.y);
        return e.boundingBox({
            topLeft: r,
            width: e.width / e.scale,
            height: e.height / e.scale,
            orientation: -n - e.orientation
        })
    }
    c.drawGroup = function(e) {
        let {maxDepth: t=this.groupMaxDepth} = e;
        if ("function" == typeof t && (t = t()),
        p >= Math.min(t, this.groupMaxDepth))
            return;
        const {group: n} = e;
        let o, {opacity: r=1} = e;
        r = I(r),
        1 !== r && (o = this.drawAdapter.getOpacity(),
        this.drawAdapter.setOpacity(o * r));
        let i, {elements: s, methods: l, rasterization: c} = I(n), u = a(e);
        if (c)
            return u && (c = g(c, u)),
            void this.drawImage(c);
        p += 1;
        let d, h = this;
        d = u ? function(e, t, n) {
            i = n,
            h[e](g(t, u))
        }
        : function(e, t, n) {
            i = n,
            h[e](t)
        }
        ;
        const {cx: f} = this.drawAdapter;
        let m = f.globalCompositeOperation;
        try {
            s.forEach(((e,t)=>d(l[t], e, t)))
        } catch (e) {
            l.length = i,
            s.length = i,
            e.toxiTrace = e.toxiTrace || [],
            e.toxiTrace.unshift("Toxilibs - screen_group.js - render");
            const {errorHandler: t} = this;
            if (!t)
                throw p -= 1,
                e;
            t(e)
        }
        1 !== r && this.drawAdapter.setOpacity(o),
        f.globalCompositeOperation !== m && (f.globalCompositeOperation = m),
        p -= 1
    }
    ;
    const x = .02;
    function v(e, {axes: t=!0, startIndex: n, endIndex: o, center: r, lineVector: i, stepVector: a, color: s="#888", opacityLimit: l={
        max: 1,
        min: .4
    }}) {
        let c = j(a.x, a.y) * x
          , u = 2 * c;
        "number" == typeof l && (l = {
            max: l,
            min: l
        });
        for (let d = n; d <= o; d += 1) {
            let n = {
                x: r.x + a.x * d,
                y: r.y + a.y * d
            }
              , o = l.min
              , h = c;
            t && 0 === d && (o = l.max,
            h = u),
            e.drawLine({
                origin: n,
                vector: i,
                color: s,
                opacity: o,
                lineWidth: h
            })
        }
    }
    const b = .5
      , w = -.25;
    function C(e, t, n) {
        let o = j(t.x - e.x, t.y - e.y);
        return S(e, t, 0 === o ? 0 : n / o)
    }
    function S(e, t, n) {
        return {
            x: e.x * (1 - n) + t.x * n,
            y: e.y * (1 - n) + t.y * n
        }
    }
    function _(e, t, n) {
        if (n) {
            if ("globalLength"in n)
                return e.adapterScale * n.globalLength(t);
            {
                let {scale: o=1} = n;
                return e.adapterScale * t * o
            }
        }
        return e.adapterScale * t
    }
    function T(e, t, n) {
        let o = e.coordsToAdapterCoords({
            x: 0,
            y: 0
        }, n)
          , r = e.coordsToAdapterCoords(t, n);
        return {
            x: r.x - o.x,
            y: r.y - o.y
        }
    }
    function k(e, t, n) {
        return n ? "globalLength"in n ? e.orientation + n.globalOrientation(t) : e.orientation + (n.orientation || 0) + t : e.orientation + t
    }
    function A(e, t, n) {
        return (t = R(t)).relativeTo = n,
        O(e, t),
        t
    }
    const P = /((\d+\.\d+)|(\d+\.?)|(\.\d+))u\b/g;
    function M(e, t, n) {
        return t.replace(P, (function(t, o) {
            return `${Math.round(_(e, parseFloat(o, 10), n))}px`
        }
        ))
    }
    let E = {
        relativeTo: "referenceFrame",
        origin: "coords",
        end: "coords",
        controlOrigin: "coords",
        controlEnd: "coords",
        topLeft: "coords",
        topRight: "coords",
        bottomLeft: "coords",
        bottomRight: "coords",
        center: "coords",
        topCenter: "coords",
        bottomCenter: "coords",
        centerRight: "coords",
        centerLeft: "coords",
        top: "coords",
        bottom: "coords",
        right: "coords",
        left: "coords",
        innerCircle: "coordsAndRadius",
        outerCircle: "coordsAndRadius",
        radius: "length",
        innerRadius: "length",
        lineWidth: "smartLength",
        vector: "vector",
        pivot: "vector",
        orientation: "angle",
        angle: "angle",
        startAngle: "angle",
        endAngle: "angle",
        branchAngle: "angle",
        points: "points",
        beziers: "beziers",
        linearGradient: "linearGradient",
        radialGradient: "radialGradient",
        font: "textWithUSyntax",
        step: "length",
        offset: "length",
        width: "length",
        height: "length",
        roundedCorners: "length",
        x: "length",
        y: "length",
        localXMin: "length",
        localXMax: "length",
        localYMin: "length",
        localYMax: "length",
        stroke: "stroke",
        widthEnvelope: "function",
        smoothing: "boolean",
        close: "boolean",
        pointyEnds: "boolean",
        axes: "boolean",
        disableCollision: "boolean",
        useFontMetrics: "boolean",
        branchLengthRatio: "factor",
        smooth: "factor",
        opacity: "factor",
        scale: "factor",
        blendMode: "text",
        filter: "textWithUSyntax",
        shadow: "shadow",
        blur: "smartLength",
        flip: "text",
        color: "color",
        fillColor: "color",
        strokeColor: "color",
        image: "image",
        imageData: "imageData",
        group: "group",
        text: "text",
        url: "text",
        name: "text",
        format: "string",
        fileName: "string",
        type: "string",
        cropSource: "cropParams",
        quality: "number",
        layer: "number",
        maxDepth: "number"
    }
      , L = {
        coords: function(e, t, n) {
            return e.coordsToAdapterCoords(t, n)
        },
        coordsAndRadius: function(e, t, n) {
            let o = e.coordsToAdapterCoords(t, n);
            return o.radius = _(e, t.radius, n),
            o
        },
        length: _,
        vector: T,
        angle: k,
        orientation: k,
        points: function(e, t, n) {
            return t.map((function({x: t, y: o, controlPrevious: r, controlNext: i}) {
                let a = e.coordsToAdapterCoords({
                    x: t,
                    y: o
                }, n);
                return r && (a.controlPrevious = e.coordsToAdapterCoords(r, n)),
                i && (a.controlNext = e.coordsToAdapterCoords(i, n)),
                a
            }
            ))
        },
        beziers: function(e, t, n) {
            return t.map((function({origin: t, end: o, controlOrigin: r, controlEnd: i}) {
                return {
                    origin: e.coordsToAdapterCoords(t, n),
                    end: e.coordsToAdapterCoords(o, n),
                    controlOrigin: e.coordsToAdapterCoords(r, n),
                    controlEnd: e.coordsToAdapterCoords(i, n)
                }
            }
            ))
        },
        linearGradient: A,
        radialGradient: A,
        shadow: function(e, t, n) {
            const {blur: o, opacity: r, color: i, xOffset: a=0, yOffset: s=0} = t
              , {x: l, y: c} = T(e, {
                x: a,
                y: s
            }, n);
            return {
                xOffset: l,
                yOffset: c,
                blur: o && _(e, o, n),
                opacity: r,
                color: i
            }
        },
        textWithUSyntax: M,
        smartLength: function(e, t, n) {
            return "string" == typeof t && t.endsWith("px") ? parseFloat(t, 10) : _(e, t, n)
        }
    }
      , D = {};
    for (let e in E)
        D[e] = L[E[e]];
    function q(e, t) {
        E[e] = t,
        D[e] = L[t]
    }
    function F(e, t) {
        let n = {};
        return O(e, t, n),
        n
    }
    function O(e, t, n) {
        let o = !1;
        n || (n = t,
        o = !0);
        const r = I(t.relativeTo);
        for (let i in t) {
            if (!(i in E))
                continue;
            let a = t[i];
            if (void 0 === a)
                continue;
            let s = D[i];
            "function" == typeof a && (a = "relativeTo" === i ? r : a(),
            o && !s && (n[i] = a)),
            s ? n[i] = s(e, a, r) : o || (n[i] = a)
        }
        "orientation"in t || !e.orientation && !r || (n.orientation = k(e, 0, r)),
        "alpha"in n && (n.opacity = n.alpha,
        console.warn("Screen - alpha param is deprecated. Replace with opacity"))
    }
    function j(e, t) {
        return Math.sqrt(e * e + t * t)
    }
    function I(e) {
        return "function" == typeof e ? e() : e
    }
    function R(e) {
        let t = {};
        for (let n in e)
            t[n] = e[n];
        return t
    }
    return function(e) {
        e.drawingMethods = u.concat(Object.keys(c)),
        e.paramsTypes = E,
        e.addParamType = q,
        e.cloneAndConvert = F,
        function(e) {
            u.forEach((function(t) {
                var n;
                e.prototype[t] = (n = t,
                function(e) {
                    e = F(this, e),
                    this.drawAdapter[n](e)
                }
                )
            }
            ))
        }(e);
        for (let t in c)
            e.prototype[t] = c[t];
        e.prototype.scaleUSyntax = function(e) {
            return M(this, e)
        }
    }
}
)),
/*! Toxilib deprecation
 * Copyright 2014 Toxicode, pierre.lancien @ toxicode.fr
*/
define("toxilibs/deprecation", [], (function() {
    function e({messagePrefix: e, object: t, deprecated: n, updated: o, handler: r, onlyWhenCalled: i}) {
        let a;
        function s() {
            if (!a) {
                !1 !== r({
                    messagePrefix: e,
                    deprecated: n,
                    updated: o
                }) && (a = !0)
            }
        }
        i && "function" == typeof t[o] ? t[n] = function(...e) {
            return s(),
            t[o](...e)
        }
        : n in t ? (s(),
        t[o] = t[n]) : Object.defineProperty(t, n, {
            enumerable: !0,
            configurable: !0,
            set: function(e) {
                s(),
                t[o] = e
            },
            get: function() {
                return s(),
                t[o]
            }
        })
    }
    function t({messagePrefix: e, deprecated: t, updated: n}) {
        console.warn(`${e} : you are using deprecated property "${t}". Use "${n}" instead.`)
    }
    return {
        add: function(n, o, r, {handler: i=t, onlyWhenCalled: a}={}) {
            for (let t in r) {
                e({
                    messagePrefix: n,
                    object: o,
                    deprecated: t,
                    updated: r[t],
                    handler: i,
                    onlyWhenCalled: a
                })
            }
        }
    }
}
)),
/*! Toxilib number_utils
 * Copyright 2014 Toxicode, pierre.lancien @ toxicode.fr
*/
define("toxilibs/number_utils", [], (function() {
    return {
        roundToSignificantDigits: function(e, t=3) {
            if (0 === e)
                return 0;
            const n = Math.pow(10, t - Math.ceil(Math.log10(Math.abs(e))));
            return Math.round(e * n) / n
        },
        significantDigits: function(e) {
            if (0 === (e = Math.abs(String(e).replace(".", ""))))
                return 0;
            for (; 0 !== e && e % 10 == 0; )
                e /= 10;
            return Math.floor(Math.log10(e)) + 1
        },
        clampInt255: function(e) {
            return e &= (e < 0) - 1,
            255 & (e |= -(e > 255))
        }
    }
}
)),
/*! Toxilib screen
 * Copyright 2014 Toxicode, pierre.lancien @ toxicode.fr
*/
define("toxilibs/screen", ["./event_capabilities_queued", "./screen_canvas", "./screen_shapes", "./local_2D", "./topleft_and_pivot", "./screen_image", "./deprecation", "./number_utils"], (function(e, t, n, o, r, i, a, s) {
    const {normalizedParamsForRectangle: l} = r
      , {globalPointFromReferenceFrame: c} = o
      , {roundToSignificantDigits: u} = s;
    function d(n, {crispCanvas: o, errorHandler: r, adapter: i=t}={}) {
        Object.getPrototypeOf(n).jquery && (n = n[0]),
        this.canvas = n,
        this.crispCanvas = o,
        this.drawAdapter = new i(n,{
            screenParent: this
        }),
        r && (this.errorHandler = r,
        this.drawAdapter.errorHandler = r),
        this.groupMaxDepth = 20,
        this.cameraVersion = 0,
        this.updateCanvasSize(),
        this.yDir = 1,
        this.setScale(1),
        this.center = {
            x: 0,
            y: 0
        },
        this.setOrientation(0),
        this.attachedElements = new Map,
        this.internalEventBus = {},
        e(this.internalEventBus)
    }
    i.Screen = d,
    n(d),
    d.prototype.updateCanvasSize = function() {
        let {width: e, height: t} = this.drawAdapter.updatedDimensions();
        this.width = e,
        this.height = t,
        this.widthInPixels = e,
        this.heightInPixels = t,
        this.centerPix = {
            x: e / 2,
            y: t / 2
        },
        this.drawAdapter.setCenterAdapterScreenParent ? this.centerAdapter = this.drawAdapter.setCenterAdapterScreenParent() : this.centerAdapter = this.centerPix,
        this.cameraVersion += 1
    }
    ,
    d.prototype.clear = function(e) {
        e = Object.assign({}, e);
        let {x: t, y: n, width: o, height: r} = function(e, t={}) {
            let {topLeft: n, pixelZone: o} = t;
            if (n) {
                let {xMin: n, yMax: o, width: r, height: i} = e.pixBoundingBox(t);
                return {
                    x: n,
                    y: o,
                    width: r,
                    height: i
                }
            }
            return o || {
                x: 0,
                y: 0,
                width: e.width,
                height: e.height
            }
        }(this, e);
        e.x = t,
        e.y = n,
        e.width = o,
        e.height = r,
        this.drawAdapter.clear(e)
    }
    ,
    d.prototype.isInside = function(e, t) {
        return this.drawAdapter.isInside(this.coordsToPixelCoords(e, t))
    }
    ,
    d.prototype.isOutside = function(e, t) {
        return !this.isInside(e, t)
    }
    ,
    d.prototype.getPixelColor = function(e, t) {
        return this.drawAdapter.getPixelColor(this.coordsToPixelCoords(e, t))
    }
    ;
    const h = /((\d+\.\d+)|(\d+\.?)|(\.\d+))px\b/g;
    d.prototype.getTextDimensions = function(e) {
        let {width: t, height: n, font: o} = this.drawAdapter.getTextDimensions(d.cloneAndConvert(this, e));
        const {scale: r} = this;
        return t = u(t / r, 4),
        n = u(n / r, 4),
        e.font.includes("px") || (o = o.replace(h, (function(e, t) {
            return `${u(parseFloat(t, 10) / r, 4)}u`
        }
        ))),
        {
            width: t,
            height: n,
            font: o
        }
    }
    ,
    d.prototype.toImageData = function(e={}) {
        return e = d.cloneAndConvert(this, e),
        this.drawAdapter.toImageData(e)
    }
    ,
    d.prototype.toBlob = function(e={}) {
        return e = d.cloneAndConvert(this, e),
        this.drawAdapter.toBlob(e)
    }
    ,
    d.prototype.toPNGImage = function(e={}) {
        return e = d.cloneAndConvert(this, e),
        this.drawAdapter.toPNGImage(e)
    }
    ,
    d.prototype.downloadAsImage = function(e={}) {
        e = d.cloneAndConvert(this, e),
        this.drawAdapter.downloadAsImage(e)
    }
    ,
    d.prototype.toScreenImage = function(e={}) {
        return (e = Object.assign({}, e)).source = this,
        e.cropSource = e,
        new i(e)
    }
    ;
    const f = Math.PI / 180;
    function p(e, t) {
        return t ? c(t, e.x, e.y) : e
    }
    function g(e) {
        return e
    }
    function m(e, t) {
        let {element: n} = t
          , {$element: o} = n;
        if (o) {
            if (n.lastAttachedVersion === n.version && n.lastAttachedCamera === e.cameraVersion)
                return;
            n.lastAttachedVersion = n.version,
            n.lastAttachedCamera = e.cameraVersion,
            n = o
        }
        let r = "width"in t
          , i = "height"in t;
        t = Object.assign({
            width: n.outerWidth() / e.scale,
            height: n.outerHeight() / e.scale
        }, t);
        const {x: a, y: s, width: l, height: c} = e.boxToPixBox(t);
        r && n.outerWidth(l),
        i && n.outerHeight(c),
        n.css({
            position: "absolute",
            top: `${s}px`,
            left: `${a}px`,
            margin: 0
        })
    }
    function y({topLeft: e, width: t, height: n, orientation: o, yInversion: r}) {
        let {x: i, y: a} = e
          , s = r ? -1 : 1;
        if (!o) {
            let e = a - s * n;
            return {
                x: i,
                y: a,
                topLeft: {
                    x: i,
                    y: a
                },
                center: {
                    x: i + t / 2,
                    y: e + n / 2
                },
                width: t,
                height: n,
                xMin: i,
                yMax: a,
                xMax: i + t,
                yMin: e
            }
        }
        let l = o * f
          , c = Math.cos(l)
          , u = Math.sin(l)
          , d = i + c * t
          , h = d + u * n
          , p = i + u * n
          , g = Math.min(i, d, h, p)
          , m = Math.max(i, d, h, p)
          , y = a + s * u * t
          , x = y - s * c * n
          , v = a - s * c * n
          , b = Math.min(a, y, x, v)
          , w = Math.max(a, y, x, v)
          , C = r ? b : w;
        return {
            x: g,
            y: C,
            topLeft: {
                x: g,
                y: C
            },
            center: {
                x: g + (t = m - g) / 2,
                y: b + (n = w - b) / 2
            },
            width: t,
            height: n,
            xMin: g,
            yMin: b,
            xMax: m,
            yMax: w
        }
    }
    return d.prototype.coordsToPixelCoords = function({x: e, y: t}, n) {
        n && ({x: e, y: t} = c(n, e, t));
        let o = e - this.center.x
          , r = t - this.center.y;
        return {
            x: this.centerPix.x + this.scale * (o * this.cosOrientation - r * this.sinOrientation),
            y: this.centerPix.y - this.scale * (o * this.sinOrientation + r * this.cosOrientation)
        }
    }
    ,
    d.prototype.coordsToAdapterCoords = function({x: e, y: t}, n) {
        n && ({x: e, y: t} = c(n, e, t));
        let o = e - this.center.x
          , r = t - this.center.y;
        return {
            x: this.centerAdapter.x + this.adapterScale * (o * this.cosOrientation - r * this.sinOrientation),
            y: this.centerAdapter.y + this.adapterScaleY * (o * this.sinOrientation + r * this.cosOrientation)
        }
    }
    ,
    d.prototype.pixelCoordsToCoords = function({x: e, y: t}) {
        let n = (e - this.centerPix.x) / this.scale
          , o = (t - this.centerPix.y) / this.scale;
        return {
            x: this.center.x + (n * this.cosOrientation - o * this.sinOrientation),
            y: this.center.y - (n * this.sinOrientation + o * this.cosOrientation)
        }
    }
    ,
    d.prototype.coordsToDomPix = function({x: e, y: t}, n) {
        const {x: o, y: r} = this.coordsToPixelCoords({
            x: e,
            y: t
        }, n)
          , {canvas: i, width: a, height: s} = this
          , l = i.clientWidth / a
          , c = i.clientHeight / s
          , {left: u, top: d} = i.getBoundingClientRect();
        return {
            x: u + o * l,
            y: d + r * c
        }
    }
    ,
    d.prototype.domPixelCoordsToCoords = function({x: e, y: t}) {
        const {canvas: n, width: o, height: r} = this
          , i = o / n.clientWidth
          , a = r / n.clientHeight
          , {left: s, top: l} = n.getBoundingClientRect();
        return this.pixelCoordsToCoords({
            x: (e + .5 - s) * i,
            y: (t + .5 - l) * a
        })
    }
    ,
    d.prototype.mouseEventToCoords = function(e) {
        const {clientX: t, clientY: n} = e;
        return this.domPixelCoordsToCoords({
            x: t,
            y: n
        })
    }
    ,
    d.prototype.mouseEventToSmartTrimmedCoords = function(e) {
        const {clientX: t, clientY: n} = e;
        return this.smartTrimCoords(this.domPixelCoordsToCoords({
            x: t,
            y: n
        }))
    }
    ,
    d.prototype.touchEventToCoords = function(e) {
        const {clientX: t, clientY: n} = e.touches[0];
        return this.domPixelCoordsToCoords({
            x: t,
            y: n
        })
    }
    ,
    d.prototype.touchEventToSmartTrimmedCoords = function(e) {
        const {clientX: t, clientY: n} = e.touches[0];
        return this.smartTrimCoords(this.domPixelCoordsToCoords({
            x: t,
            y: n
        }))
    }
    ,
    d.prototype.eventToCoords = function(e) {
        return e.touches ? this.touchEventToCoords(e) : this.mouseEventToCoords(e)
    }
    ,
    d.prototype.eventToSmartTrimmedCoords = function(e) {
        return e.touches ? this.touchEventToSmartTrimmedCoords(e) : this.mouseEventToSmartTrimmedCoords(e)
    }
    ,
    d.prototype.smartTrimCoords = function({x: e, y: t}) {
        const {smartTrimRatio: n} = this;
        return {
            x: Math.round(e * n) / n,
            y: Math.round(t * n) / n
        }
    }
    ,
    a.add("Screen", d.prototype, {
        mouseEvent2Coords: "mouseEventToCoords",
        domPix2coords: "domPixelCoordsToCoords",
        domPixToCoords: "domPixelCoordsToCoords",
        coords2domPix: "coordsToDomPix",
        pix2coords: "pixelCoordsToCoords",
        pixToCoords: "pixelCoordsToCoords",
        coords2pix: "coordsToPixelCoords",
        coordsToPix: "coordsToPixelCoords"
    }),
    d.prototype.boxToPixBox = function(e) {
        let {topLeftPoint: t, width: n, height: o, orientation: r} = l(e, this.yDir);
        if (r)
            throw new Error("orientation not supported");
        const {x: i, y: a} = this.coordsToPixelCoords(t);
        return n *= this.scale,
        o *= this.scale,
        {
            x: i,
            y: a,
            width: n,
            height: o
        }
    }
    ,
    d.prototype.boxToDomStyle = function(e) {
        let {x: t, y: n, width: o, height: r} = this.boxToPixBox(e);
        return {
            position: "absolute",
            top: `${n}px`,
            left: `${t}px`,
            width: `${o}px`,
            height: `${r}px`
        }
    }
    ,
    d.prototype.attachElement = function(e) {
        let {element: t} = e;
        this.attachedElements.set(t, e),
        m(this, e)
    }
    ,
    d.prototype.updateAttachedElements = function() {
        this.attachedElements.forEach((e=>m(this, e)))
    }
    ,
    d.prototype.getCamera = function() {
        let {center: e, scale: t, orientation: n, width: o, height: r} = this
          , {x: i, y: a} = e;
        return {
            center: {
                x: i,
                y: a
            },
            scale: t,
            width: o / t,
            height: r / t,
            orientation: 0 === n ? 0 : -n
        }
    }
    ,
    d.prototype.setCamera = function({center: e, scale: t, orientation: n=!1}) {
        t && this.setScale(t),
        e && this.setCenter(e),
        !1 !== n && this.setOrientation(-n)
    }
    ,
    d.prototype.setScale = function(e) {
        this.crispCanvas && (e *= 2),
        e !== this.scale && (this.cameraVersion += 1,
        this.scale = e,
        this.drawAdapter.setScaleForScreenParent ? this.drawAdapter.setScaleForScreenParent() : (this.adapterScale = e,
        this.adapterScaleY = -e),
        this.smartTrimRatio = Math.pow(10, Math.ceil(Math.log10(e))))
    }
    ,
    d.prototype.invertY = function(e) {
        this.yDir = e ? -1 : 1,
        this.setScale(this.scale),
        this.sinOrientation = Math.sin(this.orientation * f) * this.yDir
    }
    ,
    d.prototype.multiplyScale = function(e) {
        this.setScale(this.scale * e)
    }
    ,
    d.prototype.setCenter = function({x: e=this.center.x, y: t=this.center.y}) {
        e === this.center.x && t === this.center.y || (this.cameraVersion += 1,
        this.center = {
            x: e,
            y: t
        })
    }
    ,
    d.prototype.translateCenter = function({x: e=0, y: t=0}) {
        this.cameraVersion += 1,
        this.center.x += e,
        this.center.y += t
    }
    ,
    d.prototype.setOrientation = function(e) {
        if (e === this.orientation)
            return;
        this.cameraVersion += 1,
        this.orientation = e;
        let t = e * f;
        this.cosOrientation = Math.cos(t),
        this.sinOrientation = Math.sin(t) * this.yDir
    }
    ,
    d.prototype.rotate = function(e) {
        this.setOrientation(this.orientation + e)
    }
    ,
    d.prototype.usePixelCoordinates = function() {
        this.setCenter({
            x: 0,
            y: 0
        }),
        this.setOrientation(0),
        this.invertY(!0),
        this.coordsToPixelCoords = p,
        this.pixelCoordsToCoords = g
    }
    ,
    d.prototype.optimalViewParamsFor = function(e, {minScale: t, maxScale: n, margin: o=0, marginRatio: r, snap: i}={}) {
        let a = {
            xMin: 1 / 0,
            xMax: -1 / 0,
            yMin: 1 / 0,
            yMax: -1 / 0
        };
        e.forEach((({x: e, y: t, margin: n=0})=>{
            let o = this.coordsToPixelCoords({
                x: e,
                y: t
            });
            o.margin = n * this.scale,
            function(e, {x: t, y: n, margin: o}) {
                e.xMin = Math.min(t - o, e.xMin),
                e.xMax = Math.max(t + o, e.xMax),
                e.yMin = Math.min(n - o, e.yMin),
                e.yMax = Math.max(n + o, e.yMax)
            }(a, o)
        }
        )),
        o && (o *= this.scale,
        a.xMin -= o,
        a.xMax += o,
        a.yMin -= o,
        a.yMax += o);
        let s = {
            x: (a.xMin + a.xMax) / 2,
            y: (a.yMin + a.yMax) / 2
        }
          , l = function(e, {xMin: t, xMax: n, yMin: o, yMax: r}, {minScale: i, maxScale: a, marginRatio: s=1}) {
            let l = (n - t) / e.width
              , c = (r - o) / e.height
              , u = Math.max(l, c) * s;
            if (u > 0) {
                let t = e.scale / u;
                return void 0 !== i && (t = Math.max(i, t)),
                void 0 !== a && (t = Math.min(a, t)),
                t
            }
            return e.scale
        }(this, a, {
            minScale: t,
            maxScale: n,
            marginRatio: r
        });
        return i && (l = Math.round(l)),
        {
            center: this.pixelCoordsToCoords(s),
            scale: l
        }
    }
    ,
    d.prototype.setOptimalView = function(e, t={}) {
        let {center: n, scale: o} = this.optimalViewParamsFor(e, t);
        if (this.setCamera({
            center: n,
            scale: o
        }),
        t.snap) {
            let {x: e, y: t} = this.coordsToPixelCoords({
                x: 0,
                y: 0
            });
            n.x -= e % 1 / o,
            n.y -= t % 1 / o,
            this.setCenter(n)
        }
        return {
            center: n,
            scale: o
        }
    }
    ,
    d.prototype.boundingBox = y,
    d.prototype.pixBoundingBox = function({topLeft: e, width: t, height: n, orientation: o, relativeTo: r}) {
        if (e = this.coordsToPixelCoords(e, r),
        r)
            if ("globalOrientation"in r)
                o = r.globalOrientation(o),
                t = r.globalLength(t),
                n = r.globalLength(n);
            else {
                let {orientation: e=0, scale: i=1} = r;
                o += e,
                t *= i,
                n *= i
            }
        return o += this.orientation,
        y({
            width: t *= this.scale,
            height: n *= this.scale,
            topLeft: e,
            orientation: o,
            yInversion: !0
        })
    }
    ,
    d.prototype.boundingBoxForPixelZone = function({topLeft: e, width: t, height: n}) {
        return y({
            topLeft: e = this.pixelCoordsToCoords(e),
            width: t /= this.scale,
            height: n /= this.scale,
            orientation: -this.orientation,
            yInversion: -1 === this.yDir
        })
    }
    ,
    d.prototype.boundingBoxForWholeView = function() {
        let {width: e, height: t} = this;
        return this.boundingBoxForPixelZone({
            topLeft: {
                x: 0,
                y: 0
            },
            width: e,
            height: t
        })
    }
    ,
    d
}
)),
define("modules/geometry/geo_screen", ["jquery", "toxilibs/vector", "toxilibs/screen"], (function(e, t, n) {
    function o({height: t=200, container: o}) {
        this.canvasContainer = e('<div class="geoscreen">');
        const r = e('<canvas width="400" height="' + t + '">');
        this.canvasContainer.append(r),
        o.append(this.canvasContainer),
        this.screen = new n(r[0]),
        this.screen.setScale(30),
        this.toDraw = [],
        this.afterDraw = [],
        this.zones = []
    }
    return o.prototype.addPoint = function(e) {
        if (e.color = e.color || "#FF0000",
        this.addPointWithoutLabel(e),
        e.name) {
            const n = e.labelDirection || new t(1,1);
            this.addPointLabel(e, n)
        }
    }
    ,
    o.prototype.addPointWithoutLabel = function({x: e, y: t, radius: n=.1, color: o="#FF0000"}) {
        const {screen: r} = this;
        this.zones.push({
            x: e,
            y: t,
            margin: .3
        }),
        this.toDraw.push((function() {
            r.drawCircle({
                center: {
                    x: e,
                    y: t
                },
                radius: n,
                strokeColor: "#000",
                fillColor: o
            })
        }
        ))
    }
    ,
    o.prototype.addPointLabel = function(e, n) {
        n = n || new t(-1,0);
        const o = new t({
            direction: n.direction,
            length: 15 / this.screen.scale
        }).plus(e);
        this.addText({
            text: e.name,
            center: o,
            color: e.color
        })
    }
    ,
    o.prototype.addText = function(e) {
        const {screen: t} = this
          , {center: n, color: o} = e;
        this.zones.push({
            x: n.x,
            y: n.y,
            margin: 15 / t.scale
        }),
        this.toDraw.push((function() {
            t.drawText(e),
            e.upperSymbol && t.drawText({
                text: e.upperSymbol,
                center: {
                    x: n.x,
                    y: n.y + 13 / t.scale
                },
                color: o
            })
        }
        ))
    }
    ,
    o.prototype.addVector = function({name: e, originX: n, originY: o, x: r, y: i, branchLength: a, labelUnder: s, color: l="#FF0000"}) {
        const {screen: c} = this
          , u = new t(n,o)
          , d = new t(r,i);
        if (this.zones.push(u),
        this.zones.push(u.plus(d)),
        this.toDraw.push((function() {
            c.drawArrow({
                origin: u,
                vector: d,
                branchLength: a || 12 / (c.scale * d.length),
                strokeColor: l,
                lineWidth: 2 / c.scale
            })
        }
        )),
        e) {
            const t = s ? -90 : 90
              , n = d.rotate(t).setLength(20 / c.scale)
              , o = d.multiply(.5).plus(u).plus(n);
            this.addText({
                text: e,
                center: o,
                color: l,
                upperSymbol: "→"
            })
        }
    }
    ,
    o.prototype.addVectorWithPoints = function({name: e, start: n, end: o, color: r}) {
        const i = new t({
            from: n,
            to: o
        });
        n.labelDirection = i.multiply(-1),
        n.radius = .05,
        this.addPoint(n),
        o.labelDirection = i,
        o.radius = .05,
        this.addPoint(o),
        this.addVector({
            name: e,
            color: r,
            originX: n.x,
            originY: n.y,
            x: i.x,
            y: i.y
        })
    }
    ,
    o.prototype.addPolygon = function({points: e, color: n="#FF0000"}) {
        !function(e, t) {
            for (let n of t) {
                let {x: t, y: o} = n;
                e.zones.push({
                    x: t,
                    y: o,
                    margin: .3
                })
            }
        }(this, e);
        const {screen: o} = this;
        this.toDraw.push((function() {
            o.drawPolygon({
                points: e,
                strokeColor: n
            })
        }
        ));
        const r = e.length;
        e.forEach(((o,i)=>{
            if (o.name) {
                o.color = o.color || n;
                const a = e[(r + i - 1) % r]
                  , s = e[(i + 1) % r];
                this.addPointLabel(o, function(e, n, o) {
                    const r = new t({
                        from: e,
                        to: n,
                        length: 1
                    })
                      , i = new t({
                        from: e,
                        to: o,
                        length: 1
                    });
                    return r.plus(i).multiply(-1)
                }(o, a, s))
            }
            this.addPointWithoutLabel(o)
        }
        ))
    }
    ,
    o.prototype.addVisibleZone = function(e) {
        this.zones.push(e)
    }
    ,
    o.prototype.addAnswerPlaceholder = function(t) {
        const n = e('<span class="answer_placeholder">?</span>');
        this.canvasContainer.append(n),
        this.afterDraw.push((()=>{
            const {x: e, y: o} = this.screen.coords2pix(t);
            n.css({
                top: Math.floor(o) - 15,
                left: Math.floor(e) - 4
            })
        }
        ))
    }
    ,
    o.prototype.addImage = function(e) {
        const {screen: t} = this;
        this.toDraw.push((function() {
            t.drawImage(e)
        }
        ))
    }
    ,
    o.prototype.drawAll = function(e={}) {
        !function(e, {noGrid: t, noAxes: n}) {
            const {screen: o} = e;
            n || (e.toDraw.unshift((function() {
                o.drawAxes({
                    color: "#226ea5"
                })
            }
            )),
            e.addPoint({
                name: "O",
                x: 0,
                y: 0,
                color: "#226ea5"
            }));
            t || e.toDraw.unshift((function() {
                o.drawGrid({
                    step: 1,
                    color: "#D3D3D3",
                    alphaLimit: 1
                })
            }
            ))
        }(this, e),
        function(e, {noAxes: t, maxScale: n=50, margin: o}) {
            t || e.zones.push({
                x: 0,
                y: 0
            });
            e.screen.setOptimalView(e.zones, {
                maxScale: n,
                margin: o
            })
        }(this, e),
        this.toDraw.forEach((e=>e())),
        this.afterDraw.forEach((e=>e()))
    }
    ,
    o.prototype.drawRotatedGrid = function({orientation: e}) {
        const {screen: n} = this;
        this.toDraw.push((function() {
            const o = new t(n.center.x,n.center.y)
              , r = o.rotate(-e).minus(o);
            n.translateCenter(r),
            n.setOrientation(e),
            n.drawGrid({
                step: 1,
                color: "#FCC",
                opacityLimit: 1
            }),
            n.setOrientation(0),
            n.setCenter(o)
        }
        ))
    }
    ,
    o
}
)),
define("modules/geometry", ["core/question_generator_helper", "modules/geometry/geo_screen"], (function(e, t) {
    e.prototype.addGeoScreen = function(e={}) {
        e.container = this.container;
        const n = new t(e);
        return this.todoOnDisplay.push((function(t) {
            n.drawAll(e),
            t()
        }
        )),
        n
    }
    ,
    e.textFilters.push((function(e) {
        return e.replace(/VECTOR\(([^)]*)\)/g, (function(e, t) {
            return '<span class="vector_name">' + t + '<span class="' + (1 === t.length ? "one_letter" : "two_letters") + '_vector_arrow">&rarr;</span></span>'
        }
        ))
    }
    ))
}
)),
define("modules/multiple_choices", ["toxilibs/random", "core/question_generator_helper"], (function(e, t) {
    function n() {
        return e.intBetween(1, 9)
    }
    t.prototype.addBadChoices = function(...e) {
        this.badChoices = this.badChoices || [],
        e.forEach((e=>{
            Array.isArray(e) ? this.addBadChoices(...e) : ("digit" === e && (e = n),
            this.badChoices.push(e))
        }
        ))
    }
}
)),
define("modules/icons", ["core/question_generator_helper"], (function(e) {
    const t = {
        "->": "&#xf178",
        i_pawn: "&#xf1b0",
        i_pine: "&#xf1bb",
        i_snow: "&#xf2dc",
        i_plane: "&#xe809",
        i_umbrella: "&#xe808",
        i_flash: "&#xe80a",
        i_leaf: "&#xe80c",
        i_key: "&#xe814",
        i_coffee: "&#xf0f4",
        i_eye: "&#xe812",
        i_bell: "&#xe813",
        i_moon: "&#xf186",
        i_rocket: "&#xf135",
        i_anchor: "&#xf13d",
        i_bug: "&#xf188",
        i_bomb: "&#xf1e2",
        i_sun: "&#xf185",
        i_heart: "&#xe80e",
        i_black_heart: "&#xe80f",
        i_star: "&#xe80d",
        i_black_star: "&#xe810",
        i_cloud: "&#xe807",
        i_paperclip: "&#xe811",
        i_black_flower: "&#xf0a3",
        i_truck: "&#xe815",
        i_magic: "&#xf0d0",
        i_puzzle: "&#xf12e",
        i_car: "&#xf1b9",
        i_taxi: "&#xf1ba",
        i_lifebuoy: "&#xf1cd",
        i_football: "&#xf1e3",
        i_bike: "&#xf206",
        i_moto: "&#xf21c",
        i_bus: "&#xf207",
        i_subway: "&#xf239",
        i_train: "&#xf238",
        i_boat: "&#xf21a",
        i_diamond: "&#xf219",
        i_hand: "&#xf25a",
        i_mouse: "&#xf245"
    };
    function n(e) {
        if ((e = o(e, "->")).includes("i_"))
            for (let n in t)
                e = o(e, n);
        return e
    }
    function o(e, n) {
        return e.replace(new RegExp(n,"g"), (function() {
            return '<i class="custom_icon">' + t[n] + ";</i>"
        }
        ))
    }
    return e.textFilters.push(n),
    n
}
)),
define("modules/python", ["core/question_generator_helper", "toxilibs/code_highlighter", "toxilibs/url_params"], (function(e, t, n) {
    t.setTheme("bright");
    const o = {
        true: "True",
        false: "False"
    };
    e.prototype.addPythonCode = function(e, n) {
        void 0 === this.answer && n && (this.answer = n),
        this.container.append(t(e, "python"))
    }
    ;
    const {theme: r} = n();
    "basic_python" === r && (e.prototype.translateChoice = function(e) {
        return function(e) {
            for (let t in o) {
                const n = o[t];
                e = String(e).replace(new RegExp(t,"g"), n)
            }
            return e
        }(e)
    }
    )
}
)),
define("modules/csharp", ["core/question_generator_helper", "toxilibs/code_highlighter", "toxilibs/url_params"], (function(e, t, n) {
    t.setTheme("bright");
    const o = {
        true: "True",
        false: "False"
    };
    e.prototype.addCsharpCode = function(e, n) {
        if (typeof this.answer === "undefined" && n) {
            this.answer = n;
        }
        this.container.append(t(e, "csharp"));
    };
    const { theme: r } = n();
    if (r === "basic_csharp") {
        e.prototype.translateChoice = function (e) {
            for (let t in o) {
                const n = o[t];
                e = String(e).replace(new RegExp(t,"g"), n);
            }
            return e;
        };
    }
})),
define("modules/language_handler", ["core/question_generator_helper", "toxilibs/code_highlighter"], (function(QuestionGeneratorHelper, codeHighlighter) {
    codeHighlighter.setTheme("bright");
    const handlers = {
        javascript: "addJSCode",
        python: "addPythonCode",
        csharp: "addCsharpCode"
    };
    QuestionGeneratorHelper.prototype.addCode = function(sources, language) {
        const jsSource = sources.javascript || sources
          , source = sources[language] || jsSource
          , handler = handlers[language] ? handlers[language] : handlers.javascript;
        void 0 === this.answer && (this.answer = eval(jsSource)),
        this[handler](source)
    }
    ,
    QuestionGeneratorHelper.prototype.codeArrayToDisplay = function(e) {
        return "[" + e.map((e=>"string" == typeof e ? "'" + e + "'" : e)).join(", ") + "]"
    }
}
)),
define("core/particles", ["jquery", "toxilibs/random"], (function(e, t) {
    const n = ['<polygon class="star" points="21,0,28.053423027509677,11.29179606750063,40.97218684219823,14.510643118126104,32.412678195541844,24.70820393249937,33.34349029814194,37.989356881873896,21,33,8.656509701858067,37.989356881873896,9.587321804458158,24.70820393249937,1.0278131578017735,14.510643118126108,13.94657697249032,11.291796067500632"></polygon>', '<polygon class="other-star" points="18,0,22.242640687119284,13.757359312880714,36,18,22.242640687119284,22.242640687119284,18.000000000000004,36,13.757359312880716,22.242640687119284,0,18.000000000000004,13.757359312880714,13.757359312880716"></polygon>']
      , o = ["#10b4ab", "#10b4ab", "#10b4ab", "#ff8570", "#ffd147"];
    return function(r) {
        let i = [];
        const a = e('<div class="particles">');
        a.insertAfter(r),
        a.css({
            right: r.width() / 2 + "px"
        });
        const s = t.intBetween(30, 40);
        for (let r = 0; r < s; r++) {
            const r = t.pick(o)
              , s = t.between(.5, 1.2);
            let l = -10 - 25 * s
              , c = 15 - 25 * s;
            const u = l + t.intBetween(-100, 100)
              , d = c + t.intBetween(-120, 0)
              , h = t.intBetween(500, 1e3)
              , f = e('<svg class="particle">' + t.pick(n) + "</svg>");
            f.css({
                top: c,
                left: l,
                transform: "scale(" + s + ")",
                transition: h + "ms",
                fill: r
            }),
            a.append(f),
            i.push({
                shape: f,
                x: u,
                y: d
            })
        }
        setTimeout((()=>function(e) {
            e.forEach((({x: e, y: t, shape: n})=>{
                n.css({
                    left: e,
                    top: t,
                    transform: "scale(0)"
                })
            }
            ))
        }(i)), 5),
        setTimeout((()=>function(e) {
            e.forEach((({shape: e})=>{
                e.remove()
            }
            ))
        }(i)), 1e3)
    }
}
)),
define("core/challenge_view", ["toxilibs/event_bus_queued", "jquery", "globals", "toxilibs/random", "modules/icons", "./particles"], (function(e, t, n, o, r, i) {
    let a, s, l, c;
    e.on("page loaded", (function() {
        s = t("#challenge_template").html(),
        a = t("#answer_template").html(),
        l = t("#correction_template").html(),
        c = t("#click_here_template").html()
    }
    )),
    e.on("challenge created", (function(r) {
        r.container = t(s),
        function(e) {
            e.container.append(e.question.container)
        }(r),
        r.focus = function() {
            r.input && r.input.focus()
        }
        ,
        r.question.badChoices ? (!function(e) {
            e.answerContainer = t('<div class="answer">');
            let n = x(e, e.answer)
              , r = y(e.answer, e, n);
            r.addClass("good_button");
            let i = [r];
            const a = function(e, t) {
                const {badChoices: n, makeItEasy: o} = e
                  , r = []
                  , i = [];
                if (n.forEach((e=>{
                    "function" == typeof e ? i.push(e) : -1 === r.indexOf(e) && e !== t && r.push(e)
                }
                )),
                i.length > 0) {
                    !function({results: e, choiceGenerators: t, answer: n, count: o}) {
                        let r = 0
                          , i = 0;
                        for (; e.length < o && i < 40; ) {
                            const o = t[r]();
                            -1 === e.indexOf(o) && o !== n && e.push(o),
                            r = (r + 1) % t.length,
                            i++
                        }
                    }({
                        results: r,
                        choiceGenerators: i,
                        answer: t,
                        count: m > 1 && o ? 3 : f
                    })
                }
                return r
            }(e.question, e.answer);
            a.forEach((t=>{
                let n = x(e, t);
                i.push(y(t, e, n))
            }
            )),
            o.shuffleArray(i),
            g > 3 || i.push(function(e) {
                const t = y("helpMe", e, "?!?");
                t.addClass("helpMe_button"),
                e.question.pointToHelpMe && (0 === m ? (t.append(c),
                m += 1) : 1 === m && (p = setTimeout((()=>{
                    t.append(c),
                    m += 1
                }
                ), 5e3)));
                return t
            }(e));
            let s, l = i.length < 7 ? 1 / 0 : Math.ceil(i.length / 2);
            i.forEach(((n,o)=>{
                0 !== o && o !== l || (s = t('<div class="row">'),
                e.answerContainer.append(s)),
                s.append(n)
            }
            )),
            e.container.append(e.answerContainer)
        }(r),
        r.container.addClass("multiple_choices")) : (function(e) {
            e.answerContainer = t(a),
            e.input = e.answerContainer.find("input"),
            e.input.attr("type", function(e) {
                if (!navigator.userAgent.match(/(iPod|iPhone|iPad)/) || !navigator.userAgent.match(/AppleWebKit/))
                    return "text";
                if ("number" == typeof e)
                    return "number";
                if ("string" == typeof e) {
                    const t = e.replace(/^0*/g, "");
                    if (String(parseInt(t, 10)) === t)
                        return "number"
                }
                return "text"
            }(e.answer)),
            e.input.css("width", n.challengeInputWidth + "px"),
            e.container.append(e.answerContainer)
        }(r),
        function(e) {
            e.input.keydown((function(t) {
                v(e) && 13 === t.keyCode && (t.preventDefault(),
                b(e))
            }
            )),
            e.container.find(".button").click((function() {
                v(e) && b(e)
            }
            )),
            e.container.on("click", (function() {
                e.focus()
            }
            ))
        }(r));
        e.emit("challenge view constructed", r)
    }
    )),
    e.on("challenge answer given", (function(e, t, n) {
        const o = n;
        if (e.container.addClass(o),
        e.question.badChoices)
            if (u) {
                const o = h(e)
                  , r = e.answerContainer.find(".good_button");
                if (o && "lose" !== n) {
                    let e = r.offset()
                      , t = o.offset();
                    r.animate({
                        top: t.top - e.top + "px",
                        left: t.left - e.left - 20 + "px",
                        opacity: .2
                    }, 500)
                }
                "win" === n && i(r),
                setTimeout((()=>{
                    d(e, {
                        userAnswer: t,
                        status: n
                    }),
                    function(e, t) {
                        const {answerContainer: n} = e;
                        n.addClass("retract").css({
                            height: n.height() + "px"
                        }),
                        n.find(".row").fadeOut(200),
                        setTimeout((()=>n.css({
                            height: t ? 0 : 40
                        })), 200)
                    }(e, o)
                }
                ), 500)
            } else
                !function(e, t, n) {
                    const o = e.answerContainer.find('button[value="' + e.answer + '"]');
                    if (o.addClass("win"),
                    "win" !== n) {
                        "'" === t[0] && (t = t.split("'")[1]);
                        e.answerContainer.find('button[value="' + t + '"]').addClass("lose")
                    }
                }(e, t, n);
        else
            !function(e, t, n) {
                e.input.css({
                    position: "absolute",
                    top: "-100px",
                    left: "-2000px",
                    "z-index": "-10"
                }),
                e.container.find(".interro").remove(),
                d(e, {
                    userAnswer: t,
                    status: n
                })
            }(e, t, n)
    }
    )),
    e.on("challenge after answer phase ended", (function(e) {
        e.answerContainer.addClass("after")
    }
    )),
    e.on("challenge destroyed", (function(e) {
        e.container.remove()
    }
    ));
    let u = !0;
    function d(e, {userAnswer: t, status: n}) {
        let o;
        t || (t = '<img src="./icons/late_gray.png" alt="too late" />'),
        function(e) {
            Array.isArray(e.answer) && (e.answer = e.answer[0]);
            e.question.dontQuoteAnswer || "string" != typeof e.answer || (e.answer = "'" + e.answer + "'")
        }(e),
        o = "'helpMe'" === t ? "?!?" : x(e, t);
        let r = x(e, e.answer);
        h(e) ? e.container.find(".answer_placeholder").html('<span class="answer_in_place">' + r + "</span>") : (e.answerContainer.prepend(l),
        e.answerContainer.find(".user_answer").html(o),
        "win" !== n && e.answerContainer.find(".correct_answer").html(r).fadeIn(750))
    }
    function h(e) {
        const t = e.container.find(".answer_placeholder");
        return 0 !== t.length && t
    }
    const f = 10;
    let p, g = 0, m = 0;
    function y(e, n, o=e) {
        o === e && "string" == typeof o && "'" !== o[0] && (o = "'" + o + "'");
        const r = t('<button class="choice_button" value="' + e + '">' + o + "</button>");
        return function(e, t, n) {
            e.on("click", (function() {
                if (clearTimeout(p),
                "helpMe" !== n) {
                    if (v(t)) {
                        if (t.helpMeMode) {
                            if (!e.hasClass("good_button"))
                                return;
                            n = "helpMe"
                        } else
                            e.addClass("clicked"),
                            g = !1;
                        t.submitAnswer(String(n))
                    }
                } else
                    !function(e) {
                        let {container: t} = e;
                        e.helpMeMode = !0,
                        !1 !== g && (g += 1);
                        t.find(".click_here").remove(),
                        t.addClass("helpMe")
                    }(t)
            }
            ))
        }(r, n, e),
        r
    }
    function x(e, t) {
        let {question: n} = e;
        return n.translateChoice ? n.translateChoice(t) : "string" == typeof t ? r(t) : t || t.toString()
    }
    function v(e) {
        return !e.answerSubmitted && !e.wasTooLate && (e.timer.addBonusDelay(),
        !0)
    }
    function b(e) {
        e.submitAnswer(e.input.val())
    }
    e.on("question changed", (function() {
        g = 0,
        m = 0
    }
    ))
}
)),
define("stats", ["toxilibs/event_bus_queued", "libs/viewers"], (function(e, t) {
    e.on("level changed", (function(e) {
        t.emit("goToLevel", e)
    }
    )),
    e.on("user won question", (function(e) {
        t.emit("winReport", e.levelID + "_" + e.currentQuestionId, e.errors)
    }
    )),
    e.on("end", (function() {
        t.emit("gameFinished")
    }
    )),
    e.on("challenge answer given", (function(e, n, o) {
        const r = Math.round(e.totalTime / 1e3);
        t.emit("answer_" + e.fullLabel, n, "win" === o ? 1 : 0),
        t.emit("timeToAnswer_" + e.fullLabel, o, r),
        t.emit(o, e.fullLabel, r)
    }
    ))
}
)),
define("user_progression", ["toxilibs/event_bus_queued", "toxilibs/url_params"], (function(e, t) {
    let n = {};
    return e.on("user wants to start", (function() {
        void 0 === localStorage.log ? function() {
            let {theme: e="basic_coding", token: o="", returnUrl: r} = t();
            n = {
                theme: e,
                history: [],
                dateTime: Date.now(),
                token: o,
                returnUrl: r
            }
        }() : n = JSON.parse(localStorage.log)
    }
    )),
    {
        addEvent: function(e) {
            e.time = Math.round((Date.now() - n.dateTime) / 1e3),
            n.history.push(e),
            localStorage.log = JSON.stringify(n)
        }
    }
}
)),
define("user_history", ["toxilibs/event_bus_queued", "user_progression"], (function(e, t) {
    let n = 0
      , o = 0;
    function r(e, n) {
        n.eventName = e,
        t.addEvent(n)
    }
    function i(e) {
        const t = e.split("_");
        return parseInt(t[t.length - 1], 10)
    }
    e.on("level won", (function(e) {
        r("level won", {
            level: e,
            errors: o
        }),
        o = 0
    }
    )),
    e.on("end", (function() {
        r("game end", {
            errors: n
        })
    }
    )),
    e.on("challenge answer given", (function(e, t, a) {
        let s;
        "win" === a ? s = "right_answer" : "lose" === a ? (s = "wrong_answer",
        o++,
        n++) : s = "too_late";
        r(s, {
            level: e.levelID,
            question: i(e.fullLabel),
            duration: Math.round(e.totalTime / 100) / 10,
            answer: t
        })
    }
    ))
}
)),
define("core/question", ["core/question_generator_helper"], (function(e) {
    function t(e) {
        this.generator = e.generator,
        this.timeoutTime = e.timeoutTime,
        this.errorExpected = e.errorExpected,
        this.dontGoBack = e.dontGoBack,
        this.times = e.times || 1,
        this.initialTimes = this.times
    }
    return t.prototype.generate = function() {
        this.tries++;
        const t = new e;
        return t.currentTry = this.tries,
        this.generator(t),
        t
    }
    ,
    t
}
)),
define("level", ["core/question", "toxilibs/parkour", "toxilibs/event_bus_queued"], (function(e, t, n) {
    function o(e) {
        this.id = e.name,
        this.name = e.name,
        this.dependencies = e.dependencies,
        this.questions = new t({
            onStepReached: function() {
                this.current.errors = 0,
                this.current.tries = 0,
                n.emit("question changed")
            },
            onStepCompleted: function() {
                this.isLastStep() || this.goTo(this.currentSignature + 1)
            },
            onLastStepCompleted: function() {
                n.emit("questions parkour ended")
            }
        })
    }
    return o.prototype.addQuestion = function(t) {
        this.questions.add(new e(t))
    }
    ,
    o
}
)),
require.config({
    paths: {
        level: "core/level"
    }
}),
require(["toxilibs/event_bus_queued", "toxilibs/url_params", "jquery", "globals", "view", "core/levels_navigator", "persistence/levels_storage", "remote_challenge", "modules/javascript", "modules/geometry", "modules/multiple_choices", "modules/icons", "modules/python", "modules/csharp", "modules/language_handler", "core/challenge_view", "stats", "user_progression", "user_history", "level"], (function(e, t, n, o, r) {
    const i = t();
    o.ref = i.ref,
    o.beneylu = i.beneylu,
    r(),
    o.challengeInputWidth = 0,
    e.on("parkour synchronizer reset", (function() {
        setTimeout((function() {
            location.reload()
        }
        ), 500)
    }
    )),
    n((function() {
        e.emit("page loaded")
    }
    ))
}
)),
define("main", (function() {}
));
