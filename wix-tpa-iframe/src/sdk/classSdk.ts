// import { windowEndpoint, wrap, Remote } from "comlink";
// import { DashboardSDK } from "./dashboardSdk";
// import { getInstance } from "./instance";

// export class DashboardSDKInstance implements DashboardSDK {
//   private api: Remote<DashboardSDK>;

//   constructor() {
//     this.api = wrap<DashboardSDK>(windowEndpoint(window.parent));
//   }

//   getParentUrl(): Promise<string> {
//     return this.api.getParentUrl();
//   }

//   subscribeContainerParams(subscriber: any): void {
//     return this.api.subscribeContainerParams();
//   }

//   getInstance = getInstance;

// }

export {};