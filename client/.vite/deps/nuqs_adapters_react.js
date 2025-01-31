"use client";
import {
  __toESM,
  require_react
} from "./chunk-KIM3EXLN.js";

// node_modules/nuqs/dist/chunk-SDEJ2M24.js
var import_react = __toESM(require_react(), 1);
var errors = {
  404: "nuqs requires an adapter to work with your framework.",
  409: "Multiple versions of the library are loaded. This may lead to unexpected behavior. Currently using `%s`, but `%s` was about to load on top.",
  414: "Max safe URL length exceeded. Some browsers may not be able to accept this URL. Consider limiting the amount of state stored in the URL.",
  429: "URL update rate-limited by the browser. Consider increasing `throttleMs` for key(s) `%s`. %O",
  500: "Empty search params cache. Search params can't be accessed in Layouts.",
  501: "Search params cache already populated. Have you called `parse` twice?"
};
function error(code) {
  return `[nuqs] ${errors[code]}
  See https://err.47ng.com/NUQS-${code}`;
}
function renderQueryString(search) {
  if (search.size === 0) {
    return "";
  }
  const query = [];
  for (const [key, value] of search.entries()) {
    const safeKey = key.replace(/#/g, "%23").replace(/&/g, "%26").replace(/\+/g, "%2B").replace(/=/g, "%3D").replace(/\?/g, "%3F");
    query.push(`${safeKey}=${encodeQueryValue(value)}`);
  }
  const queryString = "?" + query.join("&");
  warnIfURLIsTooLong(queryString);
  return queryString;
}
function encodeQueryValue(input) {
  return input.replace(/%/g, "%25").replace(/\+/g, "%2B").replace(/ /g, "+").replace(/#/g, "%23").replace(/&/g, "%26").replace(/"/g, "%22").replace(/'/g, "%27").replace(/`/g, "%60").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/[\x00-\x1F]/g, (char) => encodeURIComponent(char));
}
var URL_MAX_LENGTH = 2e3;
function warnIfURLIsTooLong(queryString) {
  if (false) {
    return;
  }
  if (typeof location === "undefined") {
    return;
  }
  const url = new URL(location.href);
  url.search = queryString;
  if (url.href.length > URL_MAX_LENGTH) {
    console.warn(error(414));
  }
}
var context = (0, import_react.createContext)({
  useAdapter() {
    throw new Error(error(404));
  }
});
context.displayName = "NuqsAdapterContext";
function createAdapterProvider(useAdapter2) {
  return ({ children, ...props }) => (0, import_react.createElement)(
    context.Provider,
    { ...props, value: { useAdapter: useAdapter2 } },
    children
  );
}

// node_modules/mitt/dist/mitt.mjs
function mitt_default(n) {
  return { all: n = n || /* @__PURE__ */ new Map(), on: function(t, e) {
    var i = n.get(t);
    i ? i.push(e) : n.set(t, [e]);
  }, off: function(t, e) {
    var i = n.get(t);
    i && (e ? i.splice(i.indexOf(e) >>> 0, 1) : n.set(t, []));
  }, emit: function(t, e) {
    var i = n.get(t);
    i && i.slice().map(function(n2) {
      n2(e);
    }), (i = n.get("*")) && i.slice().map(function(n2) {
      n2(t, e);
    });
  } };
}

// node_modules/nuqs/dist/adapters/react.js
var import_react2 = __toESM(require_react());
var emitter = mitt_default();
function updateUrl(search, options) {
  const url = new URL(location.href);
  url.search = renderQueryString(search);
  const method = options.history === "push" ? history.pushState : history.replaceState;
  method.call(history, history.state, "", url);
  emitter.emit("update", search);
}
function useNuqsReactAdapter() {
  const [searchParams, setSearchParams] = (0, import_react2.useState)(() => {
    if (typeof location === "undefined") {
      return new URLSearchParams();
    }
    return new URLSearchParams(location.search);
  });
  (0, import_react2.useEffect)(() => {
    const onPopState = () => {
      setSearchParams(new URLSearchParams(location.search));
    };
    emitter.on("update", setSearchParams);
    window.addEventListener("popstate", onPopState);
    return () => {
      emitter.off("update", setSearchParams);
      window.removeEventListener("popstate", onPopState);
    };
  }, []);
  return {
    searchParams,
    updateUrl
  };
}
var NuqsAdapter = createAdapterProvider(useNuqsReactAdapter);
export {
  NuqsAdapter
};
//# sourceMappingURL=nuqs_adapters_react.js.map
