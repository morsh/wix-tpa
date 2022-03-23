import { expose as expose0, proxy as proxy0, transfer as transfer0, wrap as wrap0, windowEndpoint as windowEndpoint0 } from 'comlink/4.3.0';
import { expose as expose1, proxy as proxy1, transfer as transfer1, wrap as wrap1, windowEndpoint as windowEndpoint1 } from 'comlink/4.3.1';

export function createSdkProvider(iframeElement: HTMLIFrameElement, apiMethods: any) {
  let listener: (this: Window, ev: MessageEvent<any>) => any;
  new Promise(resolve => {
    listener = event => {
      if (event.origin === new URL(iframeElement.src).origin) {
        if (event.data.type === 'wix-tpa-initialize') {
          resolve(event.data.version);
        }
      }
    };

    window.addEventListener('message', event => {
      if (event.origin === new URL(iframeElement.src).origin) {
        if (event.data.type === 'wix-tpa-initialize') {
          resolve(event.data.version);
        }
      }
    }, false);
  })
  .then(version => {
    console.log(version);
    window.removeEventListener('message', listener);

    const { port1, port2 } = new MessageChannel();
    if (version === '4.3.0') {
      wrap0(windowEndpoint0(iframeElement.contentWindow!), port2);
      expose0(apiMethods, proxy0(port1));
    } else {
      wrap1(windowEndpoint1(iframeElement.contentWindow!), port2);
      expose1(apiMethods, port1);
    }
  });
}