import {defaultsDeep} from "lodash";
import {loadScriptCached} from "../loader";

interface GoogleMapsSDKBaseOptions extends SDKBaseOptions {
  loadLibraries: Array<string>
}

interface GoogleMapsSDKInterface {
  places: any
}

export class GoogleMaps implements SDKBase {
  private static options: GoogleMapsSDKBaseOptions;
  private static coreSDK: GoogleMapsSDKInterface;

  static load(options?: GoogleMapsSDKBaseOptions): Promise<SDKBase> {
    this.options = defaultsDeep(options, _defaultOptions);

    const apiUrl = `https://maps.googleapis.com/maps/api/js?key=${this.options.apiKey}&libraries=${this.options.loadLibraries.join(',')}`;
    return loadScriptCached(apiUrl).then(() => {
      this.coreSDK = (<any>window).google.maps;
      return new GoogleMaps;
    });
  }

  getAutocompleteService() {
    return new GoogleMaps.coreSDK.places.AutocompleteService
  }
}

const _defaultOptions: GoogleMapsSDKBaseOptions = {
  apiKey: undefined,
  apiUrl: 'https://apis.google.com/js/platform.js',
  loadLibraries: ['places']
};
