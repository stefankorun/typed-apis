import {memoize} from "lodash";

export const loadScriptCached = memoize(loadScript);

function loadScript(src: String) {
  return new Promise((res, rej) => {
    let script = document.createElement('script');
    Object.assign(script, {
      async: true,
      src: src,
      onload: res,
      onerror: rej,
    });
    document.body.appendChild(script);
  })
}
