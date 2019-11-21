import React, { useContext, useState } from "react";

import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBInput, MDBInputGroup } from "mdbreact";
import { Spinner, Row, Col } from "react-bootstrap";

import { addAlert } from "../Alert";
import Chooser from "../Chooser";
import SpinnerButton from "../SpinnerButton";
import { DataContext } from "../../utils/DataProvider";

const Stake = (props) => {
  const ctx = useContext(DataContext);

  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  return (
    <MDBCard>
      <MDBCardBody>
        <MDBCardTitle>Stake</MDBCardTitle>
        <MDBCardText>
          Stake using countdown griefing agreement
        </MDBCardText>
        <MDBInput size="sm" label="Counterparty" disabled={ctx.disabled}/>
        <MDBInput size="sm" label="Agreement length (in seconds)" disabled={ctx.disabled}/>
        <MDBInputGroup
          size="sm"
          material
          hint="Stake amount"
          containerClassName="stake"
          prepend="NMR"
          disabled={ctx.disabled}
        />
        <MDBInput size="sm" label="Griefing ratio" disabled={ctx.disabled}/>
        <SpinnerButton
          title="Stake"
          style={{ marginRight: "10px" }}
          disabled={ctx.disabled}
        />
      </MDBCardBody>
    </MDBCard>
  );
};

export default Stake;
