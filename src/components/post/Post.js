import React, { useContext, useState } from "react";

import { MDBInputGroup, MDBProgress, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from "mdbreact";
import { Spinner, Row, Col } from "react-bootstrap";

import { addAlert } from "../Alert";
import Chooser from "../Chooser";
import SpinnerButton from "../SpinnerButton";
import { DataContext } from "../../utils/DataProvider";

const Post = (props) => {
  const ctx = useContext(DataContext);

  const [feed, setFeed] = useState(null);
  const [upload, setUpload] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const fakeUpload = async () => {
    return new Promise((resolve, reject) => {
      const ele = document.getElementById("uploadPost");

      document.body.onfocus = () => {
        if (ele.value.length === 0) {
          resolve(null);
          document.body.onfocus = null;
        }
      };

      ele.onchange = async (e) => {
        ele.onchange = null;

        try {
          const file = e.target.files[0];
          await uploadPost(file);
        } catch (err) {
          console.log(err);
        }

        resolve(null);
      }
      document.getElementById("uploadPost").click();
    });
  };

  const uploadPost = (file) => {
    return new Promise((resolve, reject) => {
      setUploadProgress(0);

      setUpload(file.name);

      const r = new FileReader();
      r.onload = () => ctx.client.createPost(r.result, feed)
        .then((proofHash) => {
          addAlert(ctx, {
            message: `Created post: ${proofHash}`,
            cls: "toast-header-success"
          });

          resolve(null);
        })
        .catch((err) => {
          console.error(err);
          addAlert(ctx, {
            message: err.message,
            cls: "toast-header-error"
          });

          reject(err);
        });

      r.onprogress = (data) => setUploadProgress(parseInt((data.loaded / data.total) * 100));
      r.readAsText(file);
    });
  };

  return (
    <MDBCard>
      <MDBCardBody>
        <MDBCardTitle>Post</MDBCardTitle>
        <MDBCardText>
          Create a new post
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
              setItem={setFeed}
              disabled={ctx.disabled || ctx.loadingFeeds}
            />
          </Col>
        </Row>
        <input
          id="uploadPost"
          type="file"
          hidden
        />
        <MDBInputGroup
          material
          prepend={
            <SpinnerButton
              onClick={fakeUpload}
              title="Upload"
              style={{ marginRight: "10px" }}
              disabled={ctx.disabled || ctx.loadingFeeds || feed === null}
            />
          }
          value={upload}
          containerClassName="upload-post"
        />
        <MDBProgress value={uploadProgress} height={1} color="dark" className="my-2" />
      </MDBCardBody>
    </MDBCard>
  );
};

export default Post;
