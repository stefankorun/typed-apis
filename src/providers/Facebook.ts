import {defaultsDeep} from "lodash";
import {loadScriptCached} from "../loader";

interface FacebookSDKBaseOptions extends SDKBaseOptions {
  appId: String
}

interface FacebookSDKInterface {
  init: Function
  login: Function
}

export class Facebook implements SDKBase {
  private static options: FacebookSDKBaseOptions;
  private static coreSDK: FacebookSDKInterface;

  static load(options?: FacebookSDKBaseOptions): Promise<SDKBase> {
    this.options = defaultsDeep(options, _defaultOptions);

    return loadScriptCached(this.options.apiUrl).then(() => {
      this.coreSDK = (<any>window).FB;

      this.coreSDK.init({
        appId: this.options.apiKey,
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v3.0'
      });

      return new Facebook;
    });
  }

  getFB() {
    return Facebook.coreSDK;
  }
}

const _defaultOptions: FacebookSDKBaseOptions = {
  appId: undefined,
  apiUrl: 'https://connect.facebook.net/en_US/sdk.js',
};
