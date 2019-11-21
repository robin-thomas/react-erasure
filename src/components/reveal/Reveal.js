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
  const [loadingPosts, setLoadingPosts] = useState(false);

  const findPost = async (feedAddress) => {
    setFeed(feedAddress);
    setLoadingPosts(true);

    try {
      const _posts = await ctx.client.getPosts(feedAddress);

      if (_posts !== null && _posts !== undefined) {
        setPosts(Object.keys(_posts));
      }
    } catch (err) {
      console.error(err);
      addAlert(ctx, {
        message: err.message,
        cls: "toast-header-error"
      });
    }

    setLoadingPosts(false);
  }

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
              disabled={ctx.disabled || ctx.loadingFeeds}
            />
          </Col>
        </Row>
        <Row>
          {loadingPosts === true && ctx.disabled === false ? (
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
              disabled={ctx.disabled || feed === null || loadingPosts}
            />
          </Col>
        </Row>
      </MDBCardBody>
    </MDBCard>
  );
};

export default Reveal;
