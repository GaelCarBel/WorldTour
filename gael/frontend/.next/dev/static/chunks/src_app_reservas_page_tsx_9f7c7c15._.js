(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/reservas/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MisReservasPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useAuth.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function MisReservasPage() {
    _s();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MisReservasPage.useEffect": ()=>{
            const load = {
                "MisReservasPage.useEffect.load": async ()=>{
                    try {
                        setLoading(true);
                        setError(null);
                        if (!user?.email) {
                            setItems([]);
                            setLoading(false);
                            return;
                        }
                        const base = ("TURBOPACK compile-time value", "http://localhost:8080") || "http://localhost:8080";
                        const [rRes, cRes, gRes] = await Promise.all([
                            fetch(`${base}/api/reservas`, {
                                credentials: "include"
                            }),
                            fetch(`${base}/api/conciertos`, {
                                credentials: "include"
                            }),
                            fetch(`${base}/api/giras`, {
                                credentials: "include"
                            })
                        ]);
                        if (!rRes.ok) throw new Error(await rRes.text().catch({
                            "MisReservasPage.useEffect.load": ()=>"Error cargando reservas"
                        }["MisReservasPage.useEffect.load"]));
                        if (!cRes.ok) throw new Error(await cRes.text().catch({
                            "MisReservasPage.useEffect.load": ()=>"Error cargando conciertos"
                        }["MisReservasPage.useEffect.load"]));
                        if (!gRes.ok) throw new Error(await gRes.text().catch({
                            "MisReservasPage.useEffect.load": ()=>"Error cargando giras"
                        }["MisReservasPage.useEffect.load"]));
                        const reservas = await rRes.json();
                        const conciertos = await cRes.json();
                        const giras = await gRes.json();
                        const myEmail = user.email.toLowerCase();
                        const conciertoMap = new Map();
                        (Array.isArray(conciertos) ? conciertos : []).forEach({
                            "MisReservasPage.useEffect.load": (c)=>conciertoMap.set(c._id, c)
                        }["MisReservasPage.useEffect.load"]);
                        const conciertoToGira = new Map();
                        (Array.isArray(giras) ? giras : []).forEach({
                            "MisReservasPage.useEffect.load": (g)=>{
                                (Array.isArray(g.conciertos) ? g.conciertos : []).forEach({
                                    "MisReservasPage.useEffect.load": (cid)=>{
                                        if (!conciertoToGira.has(cid)) {
                                            conciertoToGira.set(cid, {
                                                grupo: g.grupo,
                                                posterUri: g.posterUri
                                            });
                                        }
                                    }
                                }["MisReservasPage.useEffect.load"]);
                            }
                        }["MisReservasPage.useEffect.load"]);
                        const mine = (Array.isArray(reservas) ? reservas : []).filter({
                            "MisReservasPage.useEffect.load.mine": (r)=>(r.userEmail || "").toLowerCase() === myEmail
                        }["MisReservasPage.useEffect.load.mine"]).map({
                            "MisReservasPage.useEffect.load.mine": (r)=>{
                                const cid = typeof r.concierto === "string" ? r.concierto : r.concierto?._id;
                                const concierto = cid ? conciertoMap.get(cid) : undefined;
                                const giraInfo = cid ? conciertoToGira.get(cid) : undefined;
                                return {
                                    _id: r._id,
                                    grupo: giraInfo?.grupo ?? null,
                                    posterUri: giraInfo?.posterUri ?? null,
                                    ciudad: concierto?.ciudad ?? null,
                                    fecha: concierto?.fecha ?? null,
                                    token: r.token,
                                    iat: r.iat,
                                    exp: r.exp
                                };
                            }
                        }["MisReservasPage.useEffect.load.mine"]);
                        mine.sort({
                            "MisReservasPage.useEffect.load": (a, b)=>{
                                const ta = a.fecha ? new Date(a.fecha).getTime() : 0;
                                const tb = b.fecha ? new Date(b.fecha).getTime() : 0;
                                return ta - tb;
                            }
                        }["MisReservasPage.useEffect.load"]);
                        setItems(mine);
                    } catch (e) {
                        setError(e?.message || "Error cargando mis reservas");
                    } finally{
                        setLoading(false);
                    }
                }
            }["MisReservasPage.useEffect.load"];
            load();
        }
    }["MisReservasPage.useEffect"], [
        user?.email
    ]);
    const total = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MisReservasPage.useMemo[total]": ()=>items.length
    }["MisReservasPage.useMemo[total]"], [
        items
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-slate-900/95 backdrop-blur-md py-12 px-4 sm:px-6 lg:px-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-6xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-2xl font-bold text-white",
                            children: "Mis reservas"
                        }, void 0, false, {
                            fileName: "[project]/src/app/reservas/page.tsx",
                            lineNumber: 133,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-slate-300 text-sm",
                            children: loading ? "Cargando..." : `Total: ${total}`
                        }, void 0, false, {
                            fileName: "[project]/src/app/reservas/page.tsx",
                            lineNumber: 134,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/reservas/page.tsx",
                    lineNumber: 132,
                    columnNumber: 9
                }, this),
                !user?.email && !loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-slate-900/60 border border-slate-800 rounded-xl p-6 text-slate-300",
                    children: "Debes iniciar sesión para ver tus reservas."
                }, void 0, false, {
                    fileName: "[project]/src/app/reservas/page.tsx",
                    lineNumber: 140,
                    columnNumber: 11
                }, this),
                loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-slate-900/60 border border-slate-800 rounded-xl p-6 text-slate-300",
                    children: "Cargando reservas..."
                }, void 0, false, {
                    fileName: "[project]/src/app/reservas/page.tsx",
                    lineNumber: 146,
                    columnNumber: 11
                }, this),
                error && !loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-red-950/40 border border-red-800 rounded-xl p-6 text-red-200",
                    children: [
                        "Error: ",
                        error
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/reservas/page.tsx",
                    lineNumber: 152,
                    columnNumber: 11
                }, this),
                !loading && !error && user?.email && items.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-slate-900/60 border border-slate-800 rounded-xl p-6 text-slate-300",
                    children: "No tienes reservas todavía."
                }, void 0, false, {
                    fileName: "[project]/src/app/reservas/page.tsx",
                    lineNumber: 158,
                    columnNumber: 11
                }, this),
                !loading && !error && items.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
                    children: items.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden shadow",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-full h-56 bg-slate-800",
                                    children: r.posterUri ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: r.posterUri,
                                        alt: r.grupo ?? "Poster",
                                        className: "w-full h-full object-cover",
                                        loading: "lazy"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/reservas/page.tsx",
                                        lineNumber: 172,
                                        columnNumber: 21
                                    }, this) : null
                                }, void 0, false, {
                                    fileName: "[project]/src/app/reservas/page.tsx",
                                    lineNumber: 170,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-lg font-semibold text-white",
                                            children: r.grupo ?? "Sin gira"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/reservas/page.tsx",
                                            lineNumber: 182,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-2 text-sm text-slate-300 space-y-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        "Ciudad:",
                                                        " ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-slate-100 font-medium",
                                                            children: r.ciudad ?? "—"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/reservas/page.tsx",
                                                            lineNumber: 189,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/reservas/page.tsx",
                                                    lineNumber: 187,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        "Fecha:",
                                                        " ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-slate-100 font-medium",
                                                            children: r.fecha ? new Date(r.fecha).toLocaleString() : "—"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/reservas/page.tsx",
                                                            lineNumber: 193,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/reservas/page.tsx",
                                                    lineNumber: 191,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "pt-2 text-xs break-all",
                                                    children: [
                                                        "Token: ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-slate-100",
                                                            children: r.token
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/reservas/page.tsx",
                                                            lineNumber: 199,
                                                            columnNumber: 30
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/reservas/page.tsx",
                                                    lineNumber: 198,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs",
                                                    children: [
                                                        "iat:",
                                                        " ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-slate-100",
                                                            children: r.iat ? new Date(r.iat).toLocaleString() : "—"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/reservas/page.tsx",
                                                            lineNumber: 203,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/reservas/page.tsx",
                                                    lineNumber: 201,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs",
                                                    children: [
                                                        "exp:",
                                                        " ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-slate-100",
                                                            children: r.exp ? new Date(r.exp).toLocaleString() : "—"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/reservas/page.tsx",
                                                            lineNumber: 209,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/reservas/page.tsx",
                                                    lineNumber: 207,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/reservas/page.tsx",
                                            lineNumber: 186,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-600/20 text-purple-200 border border-purple-600/30",
                                                children: "Reserva"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/reservas/page.tsx",
                                                lineNumber: 216,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/reservas/page.tsx",
                                            lineNumber: 215,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/reservas/page.tsx",
                                    lineNumber: 181,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, r._id, true, {
                            fileName: "[project]/src/app/reservas/page.tsx",
                            lineNumber: 166,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/app/reservas/page.tsx",
                    lineNumber: 164,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/reservas/page.tsx",
            lineNumber: 131,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/reservas/page.tsx",
        lineNumber: 130,
        columnNumber: 5
    }, this);
}
_s(MisReservasPage, "ovO/YcT7n/HFbQF/+B9t2Fyxqs0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = MisReservasPage;
var _c;
__turbopack_context__.k.register(_c, "MisReservasPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_app_reservas_page_tsx_9f7c7c15._.js.map