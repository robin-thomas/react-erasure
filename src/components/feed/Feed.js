import React, { useContext } from "react";

import { MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from "mdbreact";

import { DataContext } from "../../utils/DataProvider";

const Feed = (props) => {
  const ctx = useContext(DataContext);

  const createFeed = async () => {
    try {
      const feed = await ctx.client.createFeed();

      ctx.setAlerts(alerts => {
        let _alerts = Object.assign([], alerts);

        _alerts.push({
          message: `Feed created at: ${feed.address}`,
          time: new Date(),
          cls: "toast-header-success"
        });

        return _alerts;
      });
    } catch (err) {
      console.error(err);

      ctx.setAlerts(alerts => {
        let _alerts = Object.assign([], alerts);

        _alerts.push({
          message: err.message,
          time: new Date(),
          cls: "toast-header-error"
        });

        return _alerts;
      });
    }
  };

  return (
    <MDBCard>
      <MDBCardBody>
        <MDBCardTitle>Feed</MDBCardTitle>
        <MDBCardText>
          Create a new feed
        </MDBCardText>
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
