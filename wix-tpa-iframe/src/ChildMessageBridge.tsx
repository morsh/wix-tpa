import React, { useEffect, useState } from 'react';
import { initialize, sayHello, getInstance, subscribeContainerParams } from './sdk/windowSdk';

export const ChildMessageBridge = () => {
  const [state, setState] = useState('');
  const [instance, setInstance] = useState<string | null>();
  const [params, setParams] = useState<any>();
  
  useEffect(() => {
    console.log('Initialize SDK via child iframe...');
    initialize();
    sayHello().then(setState);
    getInstance().then(setInstance);
    subscribeContainerParams((params: any) => {
      setParams(params);
    });
  }, []);

  return (
    <div>
      Child Bridge.
      <br/>
      Message: {state}
      <br/>
      Instance: {instance}
      <br/>
      Container Params: {JSON.stringify(params)}
    </div>
  )
}