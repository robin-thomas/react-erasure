import React, { useContext, useEffect } from "react";

import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from "mdbreact";

import { addAlert } from "../Alert";
import SpinnerButton from "../SpinnerButton";
import { DataContext } from "../../utils/DataProvider";

const Feed = (props) => {
  const ctx = useContext(DataContext);

  // Load all the feeds.
  useEffect(() => {
    const fn = async () => {
      ctx.setLoadingFeeds(true);

      try {
        const feed = await ctx.client.getFeeds();
        if (feed !== null) {
          ctx.setFeeds(feed.feeds.map(e => e.address));

          addAlert(ctx, {
            message: "Feeds loaded!",
            cls: "toast-header-success"
          });
        } else {
          addAlert(ctx, {
           message: "No feeds to load!",
           cls: "toast-header-success"
          });
        }
      } catch (err) {
        addAlert(ctx, {
          message: err.message,
          cls: "toast-header-error"
        });
      }

      ctx.setLoadingFeeds(false);
    };

    if (ctx.disabled === false) {
      fn();
    }
  }, [ctx.disabled]);

  const createFeed = async () => {
    try {
      const feed = await ctx.client.createFeed();

      ctx.setFeeds(feeds => {
        const _feeds = Object.assign([], feeds);
        _feeds.push(feed.address);
        return _feeds;
      });

      addAlert(ctx, {
        message: `Feed created at: ${feed.address}`,
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
        <MDBCardTitle>Feed</MDBCardTitle>
        <MDBCardText>
          Create a new feed
        </MDBCardText>
        <SpinnerButton
          onClick={createFeed}
          title="Create"
          disabled={ctx.disabled}
        />
      </MDBCardBody>
    </MDBCard>
  );
};

export default Feed;
