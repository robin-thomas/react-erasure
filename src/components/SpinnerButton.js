import React, { useState } from "react";

import { MDBBtn } from "mdbreact";
import { Spinner } from "react-bootstrap";

const SpinnerButton = ({ onClick, disabled = false, title, style = {} }) => {
  const [loading, setLoading] = useState(false);

  const click = async () => {
    setLoading(true);
    await onClick();
    setLoading(false);
  }

  return (
    <MDBBtn
      style={{ margin: "0", fontSize: "13px", ...style }}
      color="dark"
      size="sm"
      disabled={disabled || loading}
      onClick={click}
    >
    {loading ? (
      <Spinner animation="border" size="sm" role="status"/>
    ) : title}
    </MDBBtn>
  );
};

export default SpinnerButton;
