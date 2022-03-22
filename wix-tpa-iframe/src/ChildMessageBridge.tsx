import React, { useEffect, useState } from 'react';
import { proxy, windowEndpoint, wrap,  } from 'comlink';

export const ChildMessageBridge = () => {
  const [state, setState] = useState('');
  useEffect(() => {
    console.log('...2');
    const api = wrap(windowEndpoint(window.parent)) as any;
    console.log('...3', api);
    api.sayHello().then((msg: string) => setState(msg));
  }, []);

  return (
    <div>
      Child Bridge.
      <br/>
      Message: {state}
    </div>
  )
}