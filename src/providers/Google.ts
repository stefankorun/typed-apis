import {defaultsDeep} from "lodash";
import {loadScriptCached} from "../loader";

interface GoogleSDKBaseOptions extends SDKBaseOptions {
  loadServices: Array<string>
}

interface GoogleSDKInterface {
  load: Function,
  auth2: {
    init: Function,
    getAuthInstance: Function
  }
}

export class Google implements SDKBase {
  private static options: GoogleSDKBaseOptions;
  private static coreSDK: GoogleSDKInterface;

  static load(options?: GoogleSDKBaseOptions): Promise<SDKBase> {
    this.options = defaultsDeep(options, _defaultOptions);

    return loadScriptCached(this.options.apiUrl).then(() => {
      this.coreSDK = (<any>window).gapi;

      return new Promise((resolve) => {
        this.coreSDK.load(this.options.loadServices.join(':'), () => {
          if (this.coreSDK.auth2) this.coreSDK.auth2.init({client_id: this.options.apiKey});
          resolve(new Google);
        })
      })
    });
  }

  getAuth2() {
    return Google.coreSDK.auth2.getAuthInstance();
  }

}

const _defaultOptions: GoogleSDKBaseOptions = {
  apiKey: undefined,
  apiUrl: 'https://apis.google.com/js/platform.js',
  loadServices: ['auth', 'client']
};
