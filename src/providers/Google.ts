import {loadScriptCached} from "../loader";
import {SDKBase, SDKBaseOptions} from "../definitions";

interface GoogleSDKBaseOptions extends SDKBaseOptions {
  loadServices?: Array<string>;
}

interface GoogleSDKInterface {
  load: Function;
  auth2: {
    init: Function;
    getAuthInstance: Function;
  };
}

export class Google extends SDKBase<GoogleSDKInterface, GoogleSDKBaseOptions> {
  protected static _defaultOptions = {
    loadServices: ["auth", "client"],
    apiKey: undefined
  };

  static load(options?: GoogleSDKBaseOptions) {
    const apiUrl = "https://apis.google.com/js/platform.js";
    const finalOptions = {...this._defaultOptions, ...options};

    if (!finalOptions.apiKey) throw new Error('API key is required');

    return loadScriptCached(apiUrl).then(() => {
      const sdk = (<any>window).gapi;

      return new Promise(resolve => {
        sdk.load(finalOptions.loadServices.join(":"), () => {
          if (sdk.auth2) Promise.resolve(sdk.auth2.init({client_id: finalOptions.apiKey})).catch(console.warn);
        });
        resolve(new Google(sdk));
      });

    }).catch(console.warn);
  }

  getAuth2() {
    return this.sdk.auth2.getAuthInstance();
  }
}
