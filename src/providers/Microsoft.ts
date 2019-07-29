import { loadScriptCached } from "../loader";
import {SDKBase, SDKBaseOptions} from "../definitions";

interface MicrosoftSDKBaseOptions extends SDKBaseOptions {
  appId: String;
}

interface MicrosoftSDKInterface {
  UserAgentApplication: any;
}

// ref: https://github.com/AzureAD/microsoft-authentication-library-for-js
export class Microsoft extends SDKBase<
  MicrosoftSDKInterface,
  MicrosoftSDKBaseOptions
> {
  static load(options?: MicrosoftSDKBaseOptions) {
    const finalOptions = { ...this._defaultOptions, ...options };
    const apiUrl =
      "https://secure.aadcdn.microsoftonline-p.com/lib/0.1.3/js/msal.min.js";

    return loadScriptCached(apiUrl).then(() => {
      const Msal = (<any>window).Msal;

      // todo: Provide Logger as option instead of requirement
      let logger = new Msal.Logger(
        (_logLevel: any, message: any, _piiLoggingEnabled: any) =>
          console.log(message),
        {
          level: Msal.LogLevel.Verbose,
          correlationId: "12345"
        }
      );

      const coreSDK = new Msal.UserAgentApplication(
        finalOptions.appId,
        null,
        () => console.log("authSuccess"),
        {
          logger: logger,
          cacheLocation: "localStorage",
          navigateToLoginRequestUrl: false
        }
      );

      return new Microsoft(coreSDK, finalOptions);
    });
  }

  getAgentApplication() {
    return this.sdk;
  }
}
