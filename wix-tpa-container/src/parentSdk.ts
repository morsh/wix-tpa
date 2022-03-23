import { expose as expose0 } from 'comlink/4.3.0';
import { expose as expose1 } from 'comlink/4.3.1';

export function createSdkProvider(iframeElement: HTMLIFrameElement, apiMethods: any) {
  let listener: (this: Window, ev: MessageEvent<any>) => any;
  new Promise(resolve => {
    listener = event => {
      if (event.origin === new URL(iframeElement.src).origin) {
        if (event.data.type === 'wix-tpa-initialize') {
          console.log(event.origin, event.data);
          resolve(event.data.version);
        }
      }
    };

    window.addEventListener('message', listener, false);
  })
  .then(version => {
    window.removeEventListener('message', listener);

    const { port1, port2 } = new MessageChannel();
    if (version === '4.3.0') {
      const msg = {
        comlinkInit: true,
        port: port2
      };
      expose0(apiMethods, port1);
      iframeElement.contentWindow!.postMessage(msg, '*', [port2]);
    } else {
      console.log(version);
      const msg = {
        comlinkInit: true,
        port: port2
      };
      expose1(apiMethods, port1);
      iframeElement.contentWindow!.postMessage(msg, '*', [port2]);
    }
  });
}