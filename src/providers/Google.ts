import { loadScriptCached } from "../loader";

interface GoogleSDKBaseOptions extends SDKBaseOptions {
  loadServices: Array<string>;
}

interface GoogleSDKInterface {
  load: Function;
  auth2: {
    init: Function;
    getAuthInstance: Function;
  };
}

export class Google extends SDKBase<GoogleSDKInterface, GoogleSDKBaseOptions> {
  protected static _defaultOptions: GoogleSDKBaseOptions = {
    loadServices: ["auth", "client"]
  };

  static load(options?: GoogleSDKBaseOptions) {
    const apiUrl = "https://apis.google.com/js/platform.js";
    const finalOptions = { ...this._defaultOptions, ...options };

    return loadScriptCached(apiUrl).then(() => {
      const sdk = (<any>window).gapi;

      return new Promise(resolve => {
        sdk.load(finalOptions.loadServices.join(":"), () => {
          if (sdk.auth2) sdk.auth2.init({ client_id: finalOptions.apiKey });
          resolve(new Google(sdk));
        });
      });
    });
  }

  getAuth2() {
    return this.sdk.auth2.getAuthInstance();
  }
}
