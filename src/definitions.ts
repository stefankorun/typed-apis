export interface SDKBaseOptions {
  apiKey?: string;
}

export abstract class SDKBase<TSdk, TOptions> {
  protected static _defaultOptions: any;

  get sdk() {
    return this.coreSDK;
  }

  constructor(protected coreSDK: TSdk, protected options?: TOptions) {}

  static load(options?: SDKBaseOptions): unknown {
    console.warn('load() method not implemented');
    return undefined;
  }
}
