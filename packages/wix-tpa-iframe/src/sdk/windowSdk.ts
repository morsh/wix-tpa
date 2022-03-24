import { wrap, proxy } from "comlink";
import { DashboardSDK } from "./dashboardSdk";
import { iframeHandshake } from 'channel-bridge-picker';
import { getInstance } from './instance';

const BRIDGE_TYPE = 'comlink';
const COMLINK_VERSION = '4.3.0';

const dashboardApiFactory = (port: MessagePort) => {
  const api = wrap<DashboardSDK>(port);
  console.log(window.location.origin, 'initialized comlink');

  const getParentUrl = (): Promise<string> => api.getParentUrl();
  
  const onContainerParamsChanged = (cb: (params: any) => void) => {
    api.onContainerParamsChanged(proxy(cb));
  }

  const getChannelVersion = () => ({ bridgeType: BRIDGE_TYPE, version: COMLINK_VERSION });
  
  return {
    getChannelVersion,
    getInstance,
    getParentUrl,
    onContainerParamsChanged
  };
}

export async function initialize() {
  const port = await iframeHandshake(BRIDGE_TYPE, COMLINK_VERSION);
  return dashboardApiFactory(port);
}