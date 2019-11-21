import React, { useContext } from "react";

import { MDBCard, MDBCardBody, MDBCardTitle } from "mdbreact";

import { addAlert } from "../Alert";
import SpinnerButton from "../SpinnerButton";
import { DataContext } from "../../utils/DataProvider";

const Login = (props) => {
  const ctx = useContext(DataContext);

  const login = async () => {
    try {
      await ctx.client.login();
      addAlert(ctx, {
        message: "Logged in successfully",
        cls: "toast-header-success"
      });
      ctx.setDisabled(false);
    } catch (err) {
      console.error(err);

      addAlert(ctx, {
        message: err.message,
        cls: "toast-header-error"
      });
    }
  };

  return ctx.disabled ? (
    <MDBCard>
      <MDBCardBody>
        <MDBCardTitle>Login</MDBCardTitle>
          <SpinnerButton
            onClick={login}
            title="Login"
            disabled={!ctx.disabled}
          />
      </MDBCardBody>
    </MDBCard>
  ) : null;
};

export default Login;
