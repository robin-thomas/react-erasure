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
    <div
      id="notifications"
      style={{
        position: "absolute",
        padding: "10px",
        width: "100vw",
        zIndex: "9999",
      }}>
      {alerts.map((alert, index) => <Alert key={index} {...alert}/>)}
    </div>
  );
};

export default Notifications;
