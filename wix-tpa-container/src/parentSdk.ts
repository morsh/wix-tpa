import { expose as expose431 } from 'comlink/4.3.1';
import { expose as expose430 } from 'comlink/4.3.0';


export function createSdkProvider(iframeElement: HTMLIFrameElement, apiMethods: any) {
  const channel = new MessageChannel();

  iframeElement.addEventListener('load', () => {
    channel.port1.onmessage = (event) => {
      const { type, version } = event.data;
      if (type !== 'version') {
        return
      }
      console.log('requested version', version);
      if (version === '4.3.1') {
        expose431(apiMethods, channel.port1);
      } else if (version === '4.3.0') {
        expose430(apiMethods, channel.port1);
      } else {
        throw new Error('unsupported version', version);
      }
    };

    iframeElement.contentWindow!.postMessage({ type: 'init' }, '*', [channel.port2]);
  })

  // expose(apiMethods, windowEndpoint(iframeElement.contentWindow!));
}