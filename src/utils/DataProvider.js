import React, { useState } from "react";

const DataContext = React.createContext();

const DataProvider = props => {
  const [client, setClient] = useState(null);
  const [disabled, setDisabled] = useState(true);

  return (
    <DataContext.Provider
      value={{
        client, setClient,
        disabled, setDisabled,
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
