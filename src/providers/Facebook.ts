import { loadScriptCached } from "../loader";

interface FacebookSDKBaseOptions extends SDKBaseOptions {
  appId: String;
}

interface FacebookSDKInterface {
  init: Function;
  login: Function;
}

export class Facebook extends SDKBase<
  FacebookSDKInterface,
  FacebookSDKBaseOptions
> {
  static load(options?: FacebookSDKBaseOptions) {
    const apiUrl = "https://connect.facebook.net/en_US/sdk.js";
    const finalOptions = { ...this._defaultOptions, ...options };

    return loadScriptCached(apiUrl).then(() => {
      const coreSDK = (<any>window).FB;

      coreSDK.init({
        appId: finalOptions.apiKey,
        autoLogAppEvents: true,
        xfbml: true,
        version: "v3.0"
      });

      return new Facebook(coreSDK, finalOptions);
    });
  }
}
