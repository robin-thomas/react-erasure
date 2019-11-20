import React, { useContext, useState } from "react";

import { MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from "mdbreact";
import { Alert } from "react-bootstrap";

import { DataContext } from "../../utils/DataProvider";

const Feed = (props) => {
  const ctx = useContext(DataContext);

  const [message, setMessage] = useState("");

  const createFeed = async () => {
    try {
      const feed = await ctx.client.createFeed();
      setMessage(`Feed created at: ${feed.address}`);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <MDBCard>
      <MDBCardBody>
        <MDBCardTitle>Feed</MDBCardTitle>
        <MDBCardText>
          Create a new feed
        </MDBCardText>
        {message ? <Alert variant="success">{message}</Alert> : null}
        <MDBBtn
          disabled={ctx.disabled}
          style={{ margin: "0" }}
          onClick={createFeed}
          color="dark"
          size="sm"
        >
          Create
        </MDBBtn>
      </MDBCardBody>
    </MDBCard>
  );
};

export default Feed;
