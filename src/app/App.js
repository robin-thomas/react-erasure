import React, { useEffect, useContext } from "react";

import ErasureClient from "@robinthomas/erasure-client";

import Feed from "../components/feed";
import { DataContext } from "../utils/DataProvider";

const App = ({ version }) => {
  const ctx = useContext(DataContext);

  useEffect(() => {
    const fn = async () => {
      ctx.setClient(new ErasureClient({ version }));
      ctx.setDisabled(false);
    }

    fn();
  }, [version]);

  return (
    <div className="App">
      <Feed />
    </div>
  );
}

export default App;
