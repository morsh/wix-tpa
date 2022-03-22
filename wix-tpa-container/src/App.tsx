import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { ParentMessageBridge } from './ParentMessageBridge';

const contacts = [
  { id: '123', name: 'Harry Potter' },
  { id: '124', name: 'Ronald Weisly'},
  { id: '125', name: 'Hermiony Granger' }
]

function App() {
  const [option, setOption] = useState<any>({ contactId: contacts[0].id });

  const handleChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    const selectedContact = contacts.find(c => c.id === event.target.value);
    setOption({ contactId: selectedContact!.id });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        Wix TPA Container App
      </header>
      <label>Choose params to pass to iframe:</label>
      <select style={{ marginLeft: 10, marginTop: 20 }} onChange={handleChange}>
        {contacts.map(contact => <option key={contact.id} value={contact.id}>{contact.name}</option>)}
      </select>
      <ParentMessageBridge params={option}/>
    </div>
  );
}

export default App;
