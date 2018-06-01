interface SDKBaseOptions {
  apiKey?: string,
  apiUrl: string,
}

abstract class SDKBase {
  static coreSDK: any;

  static load(options: SDKBaseOptions): Promise<SDKBase> {
    console.warn('load() method not implemented');
    return undefined;
  };
}
