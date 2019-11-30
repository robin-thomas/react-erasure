import React, { useState } from "react";

import ErasureClient from "@robinthomas/erasure-client";

const DataContext = React.createContext();

const DataProvider = ({ version, griefingType, children }) => {
  const [feeds, setFeeds] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [client, setClient] = useState(new ErasureClient({ version, griefingType }));
  const [disabled, setDisabled] = useState(true);
  const [griefings, setGriefings] = useState([]);
  const [loadingFeeds, setLoadingFeeds] = useState(false);
  const [loadingGriefings, setLoadingGriefings] = useState(false);

  return (
    <DataContext.Provider
      value={{
        feeds, setFeeds,
        alerts, setAlerts,
        client, setClient,
        disabled, setDisabled,
        griefings, setGriefings,
        loadingFeeds, setLoadingFeeds,
        loadingGriefings, setLoadingGriefings,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

const DataConsumer = DataContext.Consumer;

export { DataConsumer };
export { DataContext };
export default DataProvider;
