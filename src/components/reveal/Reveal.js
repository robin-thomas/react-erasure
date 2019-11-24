import React, { useContext, useState } from "react";

import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from "mdbreact";
import { Spinner, Row, Col } from "react-bootstrap";

import { addAlert } from "../Alert";
import Chooser from "../Chooser";
import SpinnerButton from "../SpinnerButton";
import { DataContext } from "../../utils/DataProvider";

const Reveal = (props) => {
  const ctx = useContext(DataContext);

  const [feed, setFeed] = useState(null);
  const [post, setPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const findPost = async (feedAddress) => {
    setFeed(feedAddress);
    setLoading(true);

    try {
      const _feeds = await ctx.client.getFeeds();
      if (_feeds !== null && _feeds !== undefined) {
        setPosts(Object.keys(_feeds[feedAddress].posts));
      }

      addAlert(ctx, {
        message: 'Posts loaded!',
        cls: "toast-header-success"
      });
    } catch (err) {
      console.error(err);
      addAlert(ctx, {
        message: err.message,
        cls: "toast-header-error"
      });
    }

    setLoading(false);
  };

  const revealPost = async () => {
    setDisabled(true);

    try {
      const ipfsHash = await ctx.client.revealPost(feed, post);

      addAlert(ctx, {
        message: `Revealed post: ${ipfsHash}`,
        cls: "toast-header-success"
      });
    } catch (err) {
      console.error(err);
      addAlert(ctx, {
        message: err.message,
        cls: "toast-header-error"
      });
    }

    setDisabled(false);
  };

  return (
    <MDBCard>
      <MDBCardBody>
        <MDBCardTitle>Reveal Post</MDBCardTitle>
        <MDBCardText>
          Reveal a post
        </MDBCardText>
        <Row>
          {ctx.loadingFeeds === true && ctx.disabled === false ? (
            <Col md="auto" className="align-self-center pr-0" style={{ marginTop: "12px" }}>
              <Spinner animation="border" size="sm" role="status" title="Loading feeds" />
            </Col>
          ) : null}
          <Col>
            <Chooser
              name="Feed"
              items={ctx.feeds}
              item={feed}
              setItem={findPost}
              disabled={ctx.disabled || ctx.loadingFeeds || disabled}
            />
          </Col>
        </Row>
        <Row>
          {loading === true && ctx.disabled === false ? (
            <Col md="auto" className="align-self-center pr-0" style={{ marginTop: "12px" }}>
              <Spinner animation="border" size="sm" role="status" title="Loading posts" />
            </Col>
          ) : null}
          <Col>
            <Chooser
              name="Post"
              items={posts}
              item={post}
              setItem={setPost}
              disabled={ctx.disabled || feed === null || loading || disabled}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: "15px" }}>
          <Col>
            <SpinnerButton
              onClick={revealPost}
              title="Reveal"
              disabled={ctx.disabled}
            />
          </Col>
        </Row>
      </MDBCardBody>
    </MDBCard>
  );
};

export default Reveal;
