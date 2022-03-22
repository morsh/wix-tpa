import React, { useEffect, useState } from 'react';
import { expose, windowEndpoint } from 'comlink';

export const ParentMessageBridge = () => {
  // const iframeLoaded = useCallback(async () => {
  //   console.log('...')
  //   const iframeElement = document.getElementById('child-iframe') as HTMLIFrameElement;
  //   const api = Comlink.proxy<any>(iframeElement.contentWindow);
  //   const newMessage = await api.doThing();
  //   setMessages([
  //     ...messages,
  //     newMessage
  //   ]);
  // }, [messages]);

  useEffect(() => {
    console.log('...')
    const iframeElement = document.getElementById('child-iframe') as HTMLIFrameElement;
    expose({
      sayHello() { return 'Hello from ' + window.location.href }
    }, windowEndpoint(iframeElement.contentWindow!));
  }, []);

  return (
    <div>
      <h3>Iframe:</h3>
      <iframe title='title' id='child-iframe' src='https://wix-tpa-iframe.surge.sh/' />
    </div>
  );
}