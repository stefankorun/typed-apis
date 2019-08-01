import {loadScriptCached} from "../loader";
import {SDKBase, SDKBaseOptions} from "../definitions";

interface GoogleMapsSDKBaseOptions extends SDKBaseOptions {
  loadLibraries?: Array<string>;
  language: string;
}

interface GoogleMapsSDKInterface {
  places: any;
  DistanceMatrixService: any;
}

export class GoogleMaps extends SDKBase<GoogleMapsSDKInterface,
  GoogleMapsSDKBaseOptions> {
  protected static _defaultOptions = {
    loadLibraries: ["maps", "places"],
    language: 'en',
    apiKey: undefined
  };

  static load(options?: GoogleMapsSDKBaseOptions) {
    const finalOptions = {...this._defaultOptions, ...options};

    if (!finalOptions.apiKey) throw new Error('API key is required');

    const apiUrl = `https://maps.googleapis.com/maps/api/js?key=${
      finalOptions.apiKey
    }&libraries=${finalOptions.loadLibraries.join(",")}&language=${finalOptions.language}`;

    return loadScriptCached(apiUrl).then(() => {
      return new GoogleMaps((<any>window).google.maps, finalOptions);
    });
  }

  getAutocompleteService() {
    return new this.sdk.places.AutocompleteService();
  }

  get distanceMatrix() {
    return new this.sdk.DistanceMatrixService();
  }
}
