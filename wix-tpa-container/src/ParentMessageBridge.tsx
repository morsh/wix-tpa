import React, { useEffect, useMemo } from 'react';
import { createSdkProvider } from './parentSdk';

type Props = {
  params: any;
}

const containerParamsSubscribers: any[] = [];

export const ParentMessageBridge = ({ params }: Props) => {

  const apiMethods = useMemo(() => ({
    getParentUrl() {
      console.log('get parent url');
      return window.location.href;
    },
    onContainerParamsChanged(subscriber: any) {
      console.log(subscriber, params, 1);
      containerParamsSubscribers.push(subscriber);
      subscriber(params);
    }
  }), []);

  const apiMethods2 = useMemo(() => ({
    getParentUrl() {
      console.log('get parent url 2');
      return window.location.href;
    },
    onContainerParamsChanged(subscriber: any) {
      console.log(subscriber, params, 2);
      containerParamsSubscribers.push(subscriber);
      subscriber(params);
    }
  }), []);

  useEffect(() => {
    const iframeElement = document.getElementById('child-iframe') as HTMLIFrameElement;
    const iframeElement2 = document.getElementById('child-iframe2') as HTMLIFrameElement;
    createSdkProvider(iframeElement, apiMethods);
    createSdkProvider(iframeElement2, apiMethods2);
  }, []);

  useEffect(() => {
    containerParamsSubscribers.forEach(sub => sub(params));
  }, [params]);

  return (
    <div style={{ padding: 20 }}>
      {/* <iframe title='title' id='child-iframe' src='https://wix-tpa-iframe.surge.sh/?instance=SOME_INSANCE' />
      <iframe title='title2' id='child-iframe2' src='https://wix-tpa-iframe2.surge.sh/?instance=SOME_INSANCE_2' /> */}
      <iframe title='title' id='child-iframe' src='http://localhost:3001/?instance=SOME_INSANCE' />
      <iframe title='title2' id='child-iframe2' src='http://localhost:3002/?instance=SOME_INSANCE_2' />
    </div>
  );
}