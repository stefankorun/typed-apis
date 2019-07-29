import { loadScriptCached } from "../loader";

interface GoogleMapsSDKBaseOptions extends SDKBaseOptions {
  loadLibraries: Array<string>;
}

interface GoogleMapsSDKInterface {
  places: any;
}

export class GoogleMaps extends SDKBase<
  GoogleMapsSDKInterface,
  GoogleMapsSDKBaseOptions
> {
  protected static _defaultOptions: GoogleMapsSDKBaseOptions = {
    loadLibraries: ["places"]
  };

  static load(options?: GoogleMapsSDKBaseOptions) {
    const finalOptions = { ...this._defaultOptions, ...options };

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
