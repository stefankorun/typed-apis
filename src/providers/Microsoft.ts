import {defaultsDeep} from "lodash";
import {loadScriptCached} from "../loader";

interface MicrosoftSDKBaseOptions extends SDKBaseOptions {
  appId: String
}

interface MicrosoftSDKInterface {
  UserAgentApplication: any
}

// ref: https://github.com/AzureAD/microsoft-authentication-library-for-js
export class Microsoft implements SDKBase {
  private static options: MicrosoftSDKBaseOptions;
  public static coreSDK: MicrosoftSDKInterface;

  static load(options?: MicrosoftSDKBaseOptions): Promise<SDKBase> {
    this.options = defaultsDeep(options, _defaultOptions);

    return loadScriptCached(this.options.apiUrl).then(() => {
      let Msal = (<any>window).Msal;

      // todo: Provide Logger as option instead of requirement
      let logger = new Msal.Logger((logLevel, message, piiLoggingEnabled) => console.log(message), {
        level: Msal.LogLevel.Verbose,
        correlationId: '12345'
      });

      this.coreSDK = new Msal.UserAgentApplication(this.options.appId, null, () => console.log('authSuccess'), {
        logger: logger,
        cacheLocation: 'localStorage',
        navigateToLoginRequestUrl: false,
      });

      return new Microsoft;
    });
  }

  getAgentApplication() {
    return Microsoft.coreSDK;
  }
}

const _defaultOptions: MicrosoftSDKBaseOptions = {
  appId: undefined,
  apiUrl: 'https://secure.aadcdn.microsoftonline-p.com/lib/0.1.3/js/msal.min.js',
  // apiUrl: 'https://js.live.net/v5.0/wl.js',
};
