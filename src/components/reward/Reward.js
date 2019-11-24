import React, { useContext, useState } from "react";

import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from "mdbreact";
import { Spinner, Row, Col } from "react-bootstrap";

import { addAlert } from "../Alert";
import Chooser from "../Chooser";
import InputGroup from "../InputGroup";
import SpinnerButton from "../SpinnerButton";

import Validator from "../../utils/Validator";
import { DataContext } from "../../utils/DataProvider";

const Reward = (props) => {
  const ctx = useContext(DataContext);

  const [rewardAmount, setRewardAmount] = useState("");
  const [griefing, setGriefing] = useState(null);

  const [valid, setValid] = useState(false);

  const setGriefingAgreement = (griefingAddress) => {
    setGriefing(ctx.griefing[griefingAddress]);
  }

  const validator = (text, type) => {
    if (text === null || text === undefined || text.trim().length === 0) {
      return {};
    }

    let validate = false;

    switch(type) {
      case "+float":
        validate = Validator.isPositiveFloat(text);
        break;
    }

    setValid(validate);

    return { validate };
  };

  const reward = async () => {
    try {
      const txReceipt = await ctx.client.punish({
        rewardAmount,
        griefingAddress: griefing.address,
      });

      addAlert(ctx, {
        message: `Retrieved stake with transaction: ${txReceipt.address}`,
        cls: "toast-header-success"
      });
    } catch (err) {
      console.error(err);
      addAlert(ctx, {
        message: err.message,
        cls: "toast-header-error"
      });
    }
  };

  return (
    <MDBCard>
      <MDBCardBody>
        <MDBCardTitle>Reward</MDBCardTitle>
        <MDBCardText>
          Reward the staker
        </MDBCardText>
        <Row>
          {ctx.loadingGriefings === true && ctx.disabled === false ? (
            <Col md="auto" className="align-self-center pr-0" style={{ marginTop: "12px" }}>
              <Spinner animation="border" size="sm" role="status" title="Loading griefings" />
            </Col>
          ) : null}
          <Col>
            <Chooser
              name="Griefing Address"
              items={ctx.griefings ? ctx.griefings : []}
              item={griefing}
              setItem={setGriefingAgreement}
              disabled={ctx.disabled || ctx.loadingGriefings}
            />
          </Col>
        </Row>
        <InputGroup
          prepend="NMR"
          label="Reward amount"
          disabled={ctx.disabled}
          text={rewardAmount}
          setText={setRewardAmount}
          validator={(text) => validator(text, "+float")}
        />
        <SpinnerButton
          title="Reward"
          style={{ marginRight: "10px" }}
          disabled={ctx.disabled || !valid}
          onClick={reward}
        />
      </MDBCardBody>
    </MDBCard>
  );
};

export default Reward;
