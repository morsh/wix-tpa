import React, { useEffect, useState } from 'react';
import { initialize } from 'wix-dashboard-iframe-sdk';

export const ChildMessageBridge = () => {
  const [instance, setInstance] = useState<string | null>();
  const [params, setParams] = useState<any>();
  const [metasiteId, setMetasiteId] = useState<any>();
  const [version, setVersion] = useState<any>();
  
  useEffect(() => {
    console.log('Initialize SDK via child iframe...');
    initialize().then((api) => {
      api.getInstance().then(setInstance);
      api.onEnvUpdated(envData => {
        setParams(envData.containerParams);
        setMetasiteId(envData.metaSiteId);
      });
      setVersion(JSON.stringify(api.getChannelVersion()));
    });
  }, []);

  return (
    <div style={{ textAlign: 'left' }}>
      <br/>
      <h4>Version: </h4>{version}
      <br/>
      <h4>Metasite id: </h4>{metasiteId}
      <br/>
      <h4>Get instance from URL params: </h4>{instance}
      <br/>
      <h4>Subscribe to container params: </h4>{JSON.stringify(params)}
    </div>
  )
}