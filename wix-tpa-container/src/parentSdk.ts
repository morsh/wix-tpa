import { expose, windowEndpoint } from 'comlink';

export function createSdkProvider(iframeElement: HTMLIFrameElement, apiMethods: any) {
  expose(apiMethods, windowEndpoint(iframeElement.contentWindow!));
}