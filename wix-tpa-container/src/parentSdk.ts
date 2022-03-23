import { expose as expose0, windowEndpoint as windowEndpoint0 } from 'comlink/4.3.0';
import { expose as expose1, windowEndpoint as windowEndpoint1 } from 'comlink/4.3.1';

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
    if (version === '4.3.0') {
      expose0(apiMethods, windowEndpoint0(iframeElement.contentWindow!));
    } else {
      expose1(apiMethods, windowEndpoint1(iframeElement.contentWindow!));
    }
  });
}