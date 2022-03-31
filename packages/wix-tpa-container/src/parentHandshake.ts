import { HandshakeMessage, ChannelPickerMessageType, EstablishConnectionMessage, ChannelInitializationData } from './types';

type InitializeChannelCb = (param: ChannelInitializationData) => Promise<any> | void;

export async function parentHandshake(iframeElement: HTMLIFrameElement, initializeChannel: InitializeChannelCb): Promise<void> {
  const { bridgeType, version, port }: HandshakeMessage = await new Promise(resolve => {
    const initialize: (ev: MessageEvent<any>) => any = ({ source, data, ports }) => {
      if (source === iframeElement.contentWindow) {
        if (data.type === ChannelPickerMessageType) {
          window.removeEventListener('message', initialize);
          resolve({...data, port: ports[0] });
        }
      }
    };

    window.addEventListener('message', initialize);
  });

  await initializeChannel({ bridgeType, version, port })
  port.postMessage(EstablishConnectionMessage);
}