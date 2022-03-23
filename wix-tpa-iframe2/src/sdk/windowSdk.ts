import { windowEndpoint, wrap, Remote, proxy } from "comlink";
import { DashboardSDK } from "./dashboardSdk";

const COMLINK_VERSION = '4.3.0';
let api: Remote<DashboardSDK>;

export async function initialize() {
  return new Promise<void>(resolve => {
    window.addEventListener('message', (event) => {
      if (event.data.type === 'init') {
        console.log('listenning ' + COMLINK_VERSION);
        event.ports[0].postMessage({ type: 'version', version: COMLINK_VERSION });
        api = wrap<DashboardSDK>(event.ports[0]);
        resolve();
      }
    })
  });
}

export const getParentUrl = (): Promise<string> => api.getParentUrl();

export const onContainerParamsChanged = (cb: (params: any) => void) => {
  api.onContainerParamsChanged(proxy(cb));
}

export { getInstance } from './instance';