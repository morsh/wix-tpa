import { expose as expose430 } from 'comlink/4.3.0';
import { expose as expose431 } from 'comlink/4.3.1';
import { parentHandshake } from 'channel-bridge-picker';

export async function createSdkProvider(iframeElement: HTMLIFrameElement, apiMethods: any) {
  await parentHandshake(iframeElement, ({ bridgeType, version, port }) => {
    if (bridgeType === 'comlink') {
      if (version === '4.3.0') {
        expose430(apiMethods, port);
        return;
      } else if (version === '4.3.1') {
        expose431(apiMethods, port);
        return;
      }

      throw new Error(`Parent doesn't support comlink bridge with version ${version}`);
    }

    throw new Error(`Parent doesn't support bridge ${bridgeType}`);
  });
}