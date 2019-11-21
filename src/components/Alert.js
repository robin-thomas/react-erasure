import React, { useState } from "react";

import { Toast } from "react-bootstrap";

import Timer from "./Timer";

const Alert = ({ message, time, cls }) => {
  const [remove, setRemove] = useState(false);

  return !remove ? (
    <Toast
      show={true}
      onClose={() => setRemove(true)}
      style={{ margin: "auto", marginTop: "10px" }}
    >
      <Toast.Header className={cls}>
        <strong className="mr-2">{message}</strong>
        <Timer time={time}/>
      </Toast.Header>
    </Toast>
  ) : null;
};

export default Alert;
