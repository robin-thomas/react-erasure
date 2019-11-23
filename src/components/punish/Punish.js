import React, { useContext, useState } from "react";

import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from "mdbreact";
import { Spinner, Row, Col } from "react-bootstrap";

import { addAlert } from "../Alert";
import Input from "../Input";
import Chooser from "../Chooser";
import InputGroup from "../InputGroup";
import SpinnerButton from "../SpinnerButton";

import Validator from "../../utils/Validator";
import { DataContext } from "../../utils/DataProvider";

const Punish = (props) => {
  const ctx = useContext(DataContext);

  const [message, setMessage] = useState("");
  const [griefing, setGriefing] = useState(null);
  const [punishAmount, setPunishAmount] = useState("");

  const [valid, setValid] = useState(false);

  const setGriefingAgreement = (griefingAddress) => {
    setGriefing(ctx.griefing[griefingAddress]);
  }

  const validator = (text, type) => {
    if (text === null || text === undefined || text.trim().length === 0) {
      return {};
    }

    let args;
    let validate = false;

    switch(type) {
      case "string":
        validate = true;
        args = [
          validate,
          Validator.isPositiveFloat(punishAmount)
        ];
        break;

      case "+float":
        validate = Validator.isPositiveFloat(text);
        args = [
          Validator.isValidString(message),
          validate,
        ];
        break;
    }

    setValid(args.reduce((p, c) => p && c, true));

    return { validate };
  };

  const punish = async () => {
    try {
      const txReceipt = await ctx.client.punish({
        punishAmount,
        griefingAddress: griefing.address,
        message
      });

      addAlert(ctx, {
        message: `Punished with transaction: ${txReceipt.address}`,
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
        <MDBCardTitle>Punish</MDBCardTitle>
        <MDBCardText>
          Punish the staker
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
              items={ctx.griefings ? Object.keys(ctx.griefings) : []}
              item={griefing}
              setItem={setGriefingAgreement}
              disabled={ctx.disabled || ctx.loadingGriefings}
            />
          </Col>
        </Row>
        <InputGroup
          prepend="NMR"
          label="Punish amount"
          disabled={ctx.disabled}
          text={punishAmount}
          setText={setPunishAmount}
          validator={(text) => validator(text, "+float")}
        />
        <Input
          label="Message"
          disabled={ctx.disabled}
          text={message}
          setText={setMessage}
          validator={(text) => validator(text, "string")}
        />
        <SpinnerButton
          title="Punish"
          style={{ marginRight: "10px" }}
          disabled={ctx.disabled || !valid}
          onClick={punish}
        />
      </MDBCardBody>
    </MDBCard>
  );
};

export default Punish;
