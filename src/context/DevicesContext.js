import React, { createContext, useState } from 'react'

export const DevicesContext = createContext({
  devices: { lightbulbs: [], plugs: [] },
  setDevices: () => { },
});

export const DevicesContextProvider = ({ children }) => {
  const setDevices = (devices) => {
    setState({ ...state, devices });
  }

  const initState = {
    devices: { lightbulbs: [], plugs: [] },
    setDevices,
  };

  const [state, setState] = useState(initState);

  return (
    <DevicesContext.Provider value={state}>
      {children}
    </DevicesContext.Provider>
  )
};
