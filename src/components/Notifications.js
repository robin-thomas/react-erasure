import React, { useContext, useState, useEffect } from "react";

import Alert from "./Alert";
import { DataContext } from "../utils/DataProvider";

const Notifications = () => {
  const ctx = useContext(DataContext);

  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    setAlerts(ctx.alerts);
  }, [ctx.alerts]);

  return (
    <div className="erasure-notifications">
      {alerts.map((alert, index) => <Alert key={index} {...alert}/>)}
    </div>
  );
};

export default Notifications;
