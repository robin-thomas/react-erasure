import React, { useContext, useState } from "react";

import { MDBBtn, MDBCard, MDBCardBody, MDBCardTitle } from "mdbreact";
import { Alert } from "react-bootstrap";

import { DataContext } from "../../utils/DataProvider";

const Login = (props) => {
  const ctx = useContext(DataContext);

  const [message, setMessage] = useState("");

  const login = async () => {
    try {
      await ctx.client.login();
      setMessage('Logged in successfully');
      ctx.setDisabled(false);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <MDBCard>
      <MDBCardBody>
        <MDBCardTitle>Login</MDBCardTitle>
        {message ? <Alert variant="success">{message}</Alert> : null}
        <MDBBtn
          style={{ margin: "0" }}
          color="dark"
          onClick={login}
        >
          Login
        </MDBBtn>
      </MDBCardBody>
    </MDBCard>
  );
};

export default Login;
