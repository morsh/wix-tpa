import { windowEndpoint, wrap, Remote, proxy } from "comlink";
import { DashboardSDK } from "./dashboardSdk";

const COMLINK_VERSION = '4.3.1';
let api: Remote<DashboardSDK>;

export async function initialize() {
  return new Promise(resolve => {
    window.parent.postMessage({ type: 'wix-tpa-initialize', version: COMLINK_VERSION }, '*');
    window.addEventListener("message", (event) => {
      console.log(window.location.origin, event);
      if (event.data.comlinkInit) {
        console.log('>>>>>>>>>>', window.location.origin, event, event.data.port);
        api = wrap<DashboardSDK>(event.ports[0]);
        resolve(api);
      }
    });
  });
}

export const getParentUrl = (): Promise<string> => api.getParentUrl();

export const onContainerParamsChanged = (cb: (params: any) => void) => {
  api.onContainerParamsChanged(proxy(cb));
}

export { getInstance } from './instance';