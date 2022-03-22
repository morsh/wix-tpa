import React, { useEffect, useMemo, useState } from 'react';
import { expose, windowEndpoint } from 'comlink';

type Props = {
  params: any;
}

export const ParentMessageBridge = ({ params }: Props) => {
  const [containerParamsSubscribers, setParamsSubscribers] = useState<any[]>([]);

  const apiMethods = useMemo(() => ({
    getParentUrl() { return window.location.href },
    onContainerParamsChanged(subscriber: any) {
      setParamsSubscribers([...containerParamsSubscribers, subscriber]);
      console.log(params);
      subscriber(params);
    }
  }), []);

  useEffect(() => {
    const iframeElement = document.getElementById('child-iframe') as HTMLIFrameElement;
    expose(apiMethods, windowEndpoint(iframeElement.contentWindow!));
  }, []);

  useEffect(() => {
    containerParamsSubscribers.forEach(sub => sub(params));
  }, [params]);

  return (
    <div style={{ padding: 20 }}>
      <iframe title='title' id='child-iframe' src='https://wix-tpa-iframe.surge.sh/?instance=SOME_INSANCE' />
      {/* <iframe title='title' id='child-iframe' src='http://localhost:3001/?instance=SOME_INSANCE' /> */}
    </div>
  );
}