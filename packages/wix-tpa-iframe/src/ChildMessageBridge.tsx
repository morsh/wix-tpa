import React, { useEffect, useState } from 'react';
import { initialize } from './sdk/windowSdk';

export const ChildMessageBridge = () => {
  const [state, setState] = useState('');
  const [instance, setInstance] = useState<string | null>();
  const [params, setParams] = useState<any>();
  const [version, setVersion] = useState<any>();
  
  useEffect(() => {
    console.log('Initialize SDK via child iframe...');
    initialize().then((api) => {
      api.getParentUrl().then(setState);
      api.getInstance().then(setInstance);
      api.onContainerParamsChanged(setParams);
      setVersion(JSON.stringify(api.getChannelVersion()));
    });
  }, []);

  return (
    <div style={{ textAlign: 'left' }}>
      <br/>
      <h4>Version: </h4>{version}
      <br/>
      <h4>Get url from parent window: </h4>{state}
      <br/>
      <h4>Get instance from URL params: </h4>{instance}
      <br/>
      <h4>Subscribe to container params: </h4>{JSON.stringify(params)}
    </div>
  )
}