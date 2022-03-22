import { windowEndpoint, wrap, Remote, proxy } from "comlink";
import { DashboardSDK } from "./dashboardSdk";

let api: Remote<DashboardSDK>;

export function initialize() {
  api = wrap<DashboardSDK>(windowEndpoint(window.parent));
}

export const sayHello = (): Promise<string> => api.sayHello();

// export const getContainerParams = (): Promise<any> => api.getContainerParams();
export const subscribeContainerParams = (subscriber: any) => {
  api.subscribeContainerParams(proxy(subscriber));
}

export { getInstance } from './instance';