import { Network, NodanaSettings } from "../types";

export class NodanaConfig {
  readonly network: Network;
  constructor(config: NodanaSettings) {
    this.network = config.network;
  }
}
