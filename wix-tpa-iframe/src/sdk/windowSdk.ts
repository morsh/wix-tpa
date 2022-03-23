import { windowEndpoint, wrap, Remote, proxy } from "comlink";
import { DashboardSDK } from "./dashboardSdk";
import globalPackageVersion from 'global-package-version';

const COMLINK_VERSION = '4.3.0';
let api: Remote<DashboardSDK>;

export function initialize() {
  window.parent.postMessage({ type: 'wix-tpa-initialize', version: COMLINK_VERSION }, '*');
  api = wrap<DashboardSDK>(windowEndpoint(window.parent));
}

export const getParentUrl = (): Promise<string> => api.getParentUrl();

export const onContainerParamsChanged = (cb: (params: any) => void) => {
  api.onContainerParamsChanged(proxy(cb));
}

export { getInstance } from './instance';