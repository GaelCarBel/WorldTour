(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/multimedia/Media.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Media
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function Media({ url, width, height }) {
    //Comprobamos si es video por su formato y permitimos luego la previsualización.
    const isVideo = /\.(mp4|mov|webm|avi|mkv)$/i.test(url) || url.includes('video/upload') || url.startsWith('data:video/');
    const componentSize = width && height ? "" : "w-96 h-64";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `${componentSize} bg-gray-100 rounded-lg overflow-hidden shadow-md`,
        children: isVideo ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
            src: url,
            className: "w-full h-full object-cover",
            controls: true,
            preload: "metadata",
            playsInline: true
        }, void 0, false, {
            fileName: "[project]/src/components/multimedia/Media.tsx",
            lineNumber: 18,
            columnNumber: 9
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
            src: url,
            alt: "media",
            className: "w-full h-full object-cover"
        }, void 0, false, {
            fileName: "[project]/src/components/multimedia/Media.tsx",
            lineNumber: 20,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/multimedia/Media.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
_c = Media;
var _c;
__turbopack_context__.k.register(_c, "Media");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/multimedia/upload/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>UploadPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$multimedia$2f$Media$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/multimedia/Media.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const MAX_FILES = 5;
function UploadPage() {
    _s();
    const [files, setFiles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]); //Gestionar
    const [previews, setPreviews] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [urls, setUrls] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [uploading, setUploading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleFileChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "UploadPage.useCallback[handleFileChange]": (e)=>{
            if (e.target.files) {
                //Recalculamos cuantos archivos tenemos y que no supere máximo
                const newFiles = Array.from(e.target.files);
                if (files.length + newFiles.length > MAX_FILES) {
                    alert(`Máximo ${MAX_FILES} archivos`);
                    return;
                }
                //Seteamos nuevo files.
                setFiles({
                    "UploadPage.useCallback[handleFileChange]": (prev)=>[
                            ...prev,
                            ...newFiles
                        ]
                }["UploadPage.useCallback[handleFileChange]"]);
                //Añadimos para previsualizar los files.
                newFiles.forEach({
                    "UploadPage.useCallback[handleFileChange]": (file)=>{
                        const reader = new FileReader();
                        reader.onloadend = ({
                            "UploadPage.useCallback[handleFileChange]": ()=>{
                                setPreviews({
                                    "UploadPage.useCallback[handleFileChange]": (prev)=>[
                                            ...prev,
                                            reader.result
                                        ]
                                }["UploadPage.useCallback[handleFileChange]"]);
                            }
                        })["UploadPage.useCallback[handleFileChange]"];
                        reader.readAsDataURL(file);
                    }
                }["UploadPage.useCallback[handleFileChange]"]);
            }
        }
    }["UploadPage.useCallback[handleFileChange]"], [
        files.length
    ]);
    const removeFile = (index)=>{
        setFiles((prev)=>prev.filter((_, i)=>i !== index));
        setPreviews((prev)=>prev.filter((_, i)=>i !== index));
    };
    const handleUpload = async ()=>{
        if (!files.length) return;
        setUploading(true);
        const cloudName = ("TURBOPACK compile-time value", "dvhqb5vju");
        const uploadPreset = ("TURBOPACK compile-time value", "examenIWeb");
        const uploadPromises = files.map(async (file)=>{
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", uploadPreset);
            try {
                const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
                    method: "POST",
                    body: formData
                });
                const data = await res.json();
                return data.secure_url;
            } catch  {
                return null;
            }
        });
        const results = await Promise.all(uploadPromises);
        const successfulUrls = results.filter(Boolean);
        setUrls((prev)=>[
                ...prev,
                ...successfulUrls
            ]);
        setFiles([]);
        setPreviews([]);
        setUploading(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-8 max-w-4xl mx-auto space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-2xl font-bold",
                children: [
                    "Subir a Cloudinary (Máx ",
                    MAX_FILES,
                    ")"
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/multimedia/upload/page.tsx",
                lineNumber: 77,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4 p-6 bg-gray-50 rounded-lg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "file",
                        multiple: true,
                        accept: "image/*,video/*",
                        onChange: handleFileChange,
                        className: "block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    }, void 0, false, {
                        fileName: "[project]/src/app/multimedia/upload/page.tsx",
                        lineNumber: 81,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-sm text-gray-600",
                        children: [
                            "Archivos seleccionados: ",
                            files.length,
                            "/",
                            MAX_FILES
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/multimedia/upload/page.tsx",
                        lineNumber: 89,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/multimedia/upload/page.tsx",
                lineNumber: 80,
                columnNumber: 7
            }, this),
            previews.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-4 font-medium",
                        children: "Previsualización:"
                    }, void 0, false, {
                        fileName: "[project]/src/app/multimedia/upload/page.tsx",
                        lineNumber: 95,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-3",
                        children: previews.map((preview, index)=>{
                            const isVideo = preview.startsWith("data:video");
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative w-40 h-40 rounded-md overflow-hidden group",
                                children: [
                                    isVideo ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                                        src: preview,
                                        className: "w-full h-full object-contain",
                                        preload: "metadata",
                                        autoPlay: true,
                                        controls: false,
                                        onMouseEnter: (e)=>e.currentTarget.controls = true,
                                        onMouseLeave: (e)=>e.currentTarget.controls = false
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/multimedia/upload/page.tsx",
                                        lineNumber: 107,
                                        columnNumber: 21
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: preview,
                                        alt: `preview-${index}`,
                                        className: "w-full h-full object-contain"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/multimedia/upload/page.tsx",
                                        lineNumber: 117,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>removeFile(index),
                                        className: "absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full text-xs shadow-md opacity-0 group-hover:opacity-100 transition-all",
                                        children: "✕"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/multimedia/upload/page.tsx",
                                        lineNumber: 124,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, index, true, {
                                fileName: "[project]/src/app/multimedia/upload/page.tsx",
                                lineNumber: 102,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/app/multimedia/upload/page.tsx",
                        lineNumber: 97,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/multimedia/upload/page.tsx",
                lineNumber: 94,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: handleUpload,
                disabled: !files.length || uploading,
                className: "w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 flex items-center justify-center gap-2",
                children: uploading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                        }, void 0, false, {
                            fileName: "[project]/src/app/multimedia/upload/page.tsx",
                            lineNumber: 144,
                            columnNumber: 13
                        }, this),
                        "Subiendo ",
                        files.length,
                        " archivos..."
                    ]
                }, void 0, true) : `Subir ${files.length} archivo${files.length !== 1 ? "s" : ""}`
            }, void 0, false, {
                fileName: "[project]/src/app/multimedia/upload/page.tsx",
                lineNumber: 137,
                columnNumber: 7
            }, this),
            urls.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-4 font-medium",
                        children: "Archivos subidos:"
                    }, void 0, false, {
                        fileName: "[project]/src/app/multimedia/upload/page.tsx",
                        lineNumber: 155,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: urls.map((url, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 bg-green-50 rounded-lg border border-green-200",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$multimedia$2f$Media$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        url: url
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/multimedia/upload/page.tsx",
                                        lineNumber: 159,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: "Urls: "
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/multimedia/upload/page.tsx",
                                        lineNumber: 160,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-2 p-2 bg-white rounded text-xs font-mono break-all max-w-full",
                                        children: url
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/multimedia/upload/page.tsx",
                                        lineNumber: 161,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, index, true, {
                                fileName: "[project]/src/app/multimedia/upload/page.tsx",
                                lineNumber: 158,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/multimedia/upload/page.tsx",
                        lineNumber: 156,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/multimedia/upload/page.tsx",
                lineNumber: 154,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/multimedia/upload/page.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, this);
}
_s(UploadPage, "wQPgT0BQDrRhlCQ1orcvAnESTSw=");
_c = UploadPage;
var _c;
__turbopack_context__.k.register(_c, "UploadPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_be566c97._.js.map