import { windowEndpoint, wrap, Remote, proxy } from "comlink";
import { DashboardSDK } from "./dashboardSdk";

const COMLINK_VERSION = '4.3.1';
let api: Remote<DashboardSDK>;

export function initialize() {
  console.log('listenning ' + COMLINK_VERSION);
  window.parent.postMessage({ type: 'wix-tpa-initialize', version: COMLINK_VERSION }, '*');
  api = wrap<DashboardSDK>(windowEndpoint(window.parent));
}

export const getParentUrl = (): Promise<string> => api.getParentUrl();

export const onContainerParamsChanged = (cb: (params: any) => void) => {
  api.onContainerParamsChanged(proxy(cb));
}

export { getInstance } from './instance';