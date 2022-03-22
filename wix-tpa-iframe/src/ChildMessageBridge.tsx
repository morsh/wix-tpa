import React, { useEffect, useState } from 'react';
import { initialize, sayHello, getInstance, onContainerParamsChanged } from './sdk/windowSdk';

export const ChildMessageBridge = () => {
  const [state, setState] = useState('');
  const [instance, setInstance] = useState<string | null>();
  const [params, setParams] = useState<any>();
  
  useEffect(() => {
    console.log('Initialize SDK via child iframe...');
    initialize();
    sayHello().then(setState);
    getInstance().then(setInstance);
    onContainerParamsChanged((params: any) => {
      setParams(params);
    });
  }, []);

  return (
    <div style={{ textAlign: 'left' }}>
      <br/>
      <h4>Simple message from parent window: </h4>{state}
      <br/>
      <h4>Get instance from URL params: </h4>{instance}
      <br/>
      <h4>Subscribe to container params: </h4>{JSON.stringify(params)}
    </div>
  )
}