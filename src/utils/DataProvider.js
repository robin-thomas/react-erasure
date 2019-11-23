import React, { useState } from "react";

const DataContext = React.createContext();

const DataProvider = props => {
  const [feeds, setFeeds] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [client, setClient] = useState(null);
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
      {props.children}
    </DataContext.Provider>
  );
};

const DataConsumer = DataContext.Consumer;

export { DataConsumer };
export { DataContext };
export default DataProvider;
