import { windowEndpoint, wrap, Remote, proxy } from "comlink";
import { DashboardSDK } from "./dashboardSdk";

let api: Remote<DashboardSDK>;

export function initialize() {
  api = wrap<DashboardSDK>(windowEndpoint(window.parent));
}

export const sayHello = (): Promise<string> => api.sayHello();

export const onContainerParamsChanged = (cb: (params: any) => void) => {
  api.onContainerParamsChanged(proxy(cb));
}

export { getInstance } from './instance';