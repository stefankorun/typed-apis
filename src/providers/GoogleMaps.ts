import {loadScriptCached} from "../loader";
import {SDKBase, SDKBaseOptions} from "../definitions";

interface GoogleMapsSDKBaseOptions extends SDKBaseOptions {
  loadLibraries?: Array<string>;
}

interface GoogleMapsSDKInterface {
  places: any;
}

export class GoogleMaps extends SDKBase<GoogleMapsSDKInterface,
  GoogleMapsSDKBaseOptions> {
  protected static _defaultOptions = {
    loadLibraries: ["places"],
    apiKey: undefined
  };

  static load(options?: GoogleMapsSDKBaseOptions) {
    const finalOptions = {...this._defaultOptions, ...options};

    if (!finalOptions.apiKey) throw new Error('API key is required');

    const apiUrl = `https://maps.googleapis.com/maps/api/js?key=${
      finalOptions.apiKey
    }&libraries=${finalOptions.loadLibraries.join(",")}`;

    return loadScriptCached(apiUrl).then(() => {
      return new GoogleMaps((<any>window).google.maps, finalOptions);
    });
  }

  getAutocompleteService() {
    return new this.sdk.places.AutocompleteService();
  }
}
