import React, { useEffect, useMemo } from 'react';
import { createSdkProvider } from './parentSdk';

type Props = {
  params: any;
}

const metaSiteId = 'SOME_MSID';
const envUpdatedSubscribers: any[] = [];

export const ParentMessageBridge = ({ params }: Props) => {

  const envParams = {
    containerParams: params,
    metaSiteId: metaSiteId,
  };

  const apiMethods = {
    onEnvUpdated(subscriber: any) {
      envUpdatedSubscribers.push(subscriber);
      subscriber(envParams);
    },
  };

  useEffect(() => {
    const iframeElement = document.getElementById('child-iframe') as HTMLIFrameElement;
    const iframeElement2 = document.getElementById('child-iframe2') as HTMLIFrameElement;
    createSdkProvider(iframeElement, apiMethods);
    createSdkProvider(iframeElement2, apiMethods);
  }, []);

  useEffect(() => {
    envUpdatedSubscribers.forEach(sub => sub(envParams));
  }, [params]);

  return (
    <div style={{ padding: 20 }}>
      <iframe title='title' id='child-iframe' src='https://wix-tpa-iframe.surge.sh/?instance=SOME_INSANCE' />
      <iframe title='title2' id='child-iframe2' src='https://wix-tpa-iframe2.surge.sh/?instance=SOME_INSANCE_2' />
      {/* <iframe title='title' id='child-iframe' src='http://localhost:3001/?instance=SOME_INSANCE' />
      <iframe title='title2' id='child-iframe2' src='http://localhost:3002/?instance=SOME_INSANCE_2' /> */}
    </div>
  );
}