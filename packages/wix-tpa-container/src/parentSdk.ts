import { expose as expose0 } from 'comlink/4.3.0';
import { expose as expose1 } from 'comlink/4.3.1';

export function createSdkProvider(iframeElement: HTMLIFrameElement, apiMethods: any) {
  let initialize: (this: Window, ev: MessageEvent<any>) => any;
  new Promise(resolve => {
    initialize = event => {
      if (event.origin === new URL(iframeElement.src).origin) {
        if (event.data.type === 'wix-tpa-initialize') {
          resolve(event.data.version);
        }
      }
    };

    window.addEventListener('message', initialize, false);
  })
  .then(version => {
    window.removeEventListener('message', initialize);

    const { port1, port2 } = new MessageChannel();
    if (version === '4.3.0') {
      expose0(apiMethods, port1);
    } else {
      expose1(apiMethods, port1);
    }
    iframeElement.contentWindow!.postMessage({ comlinkInit: true }, '*', [port2]);
  });
}