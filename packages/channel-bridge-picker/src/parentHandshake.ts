import { HandshakeMessage, ChannelPickerMessageType, EstablishConnectionMessage, ChannelInitializationData } from './types';

type InitializeChannelCb = (param: ChannelInitializationData) => Promise<any> | void;

export async function parentHandshake(iframeElement: HTMLIFrameElement, initializeChannel: InitializeChannelCb): Promise<void> {
  const { bridgeType, version }: HandshakeMessage = await new Promise(resolve => {
    const initialize: (ev: MessageEvent<any>) => any = ({ origin, data }) => {
      if (origin === new URL(iframeElement.src).origin) {
        if (data.type === ChannelPickerMessageType) {
          window.removeEventListener('message', initialize);
          resolve(data);
        }
      }
    };

    window.addEventListener('message', initialize, false);
  });


  const { port1, port2 } = new MessageChannel();
  await initializeChannel({
    bridgeType,
    version,
    port: port1
  })
  iframeElement.contentWindow!.postMessage(EstablishConnectionMessage, '*', [port2]);
}