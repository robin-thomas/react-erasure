import React, { useContext } from "react";

import { MDBBtn, MDBCard, MDBCardBody, MDBCardTitle } from "mdbreact";

import { DataContext } from "../../utils/DataProvider";

const Login = (props) => {
  const ctx = useContext(DataContext);

  const login = async () => {
    try {
      await ctx.client.login();
      ctx.setAlerts(alerts => {
        let _alerts = Object.assign([], alerts);

        _alerts.push({
          message: "Logged in successfully",
          time: new Date(),
          cls: "toast-header-success"
        });

        return _alerts;
      });
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
        {ctx.disabled ? (
          <MDBBtn
            style={{ margin: "0" }}
            color="dark"
            size="sm"
            onClick={login}
          >
            Login
          </MDBBtn>
        ) : null}
      </MDBCardBody>
    </MDBCard>
  );
};

export default Login;
