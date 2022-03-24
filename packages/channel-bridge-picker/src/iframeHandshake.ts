import { ChannelPickerMessageType, EstablishConnectionMessage } from './types';

export function iframeHandshake(bridgeType: string, version: string): Promise<MessagePort> {
  return new Promise(resolve => {
    window.parent.postMessage({ type: ChannelPickerMessageType, bridgeType, version }, '*');
    const initialize = (event: MessageEvent<typeof EstablishConnectionMessage>) => {
      if (event.data.comlinkInit) {
        window.removeEventListener('message', initialize);
        resolve(event.ports[0]);
      }
    };
    window.addEventListener("message", initialize);
  });
}
