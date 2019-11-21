import React, { useState } from "react";

const DataContext = React.createContext();

const DataProvider = props => {
  const [feeds, setFeeds] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [client, setClient] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [loadingFeeds, setLoadingFeeds] = useState(false);

  return (
    <DataContext.Provider
      value={{
        feeds, setFeeds,
        alerts, setAlerts,
        client, setClient,
        disabled, setDisabled,
        loadingFeeds, setLoadingFeeds,
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
