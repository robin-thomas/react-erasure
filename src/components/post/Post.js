import React, { useContext, useState, useEffect } from "react";

import { MDBInputGroup, MDBProgress, MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from "mdbreact";
import { Spinner, Row, Col } from "react-bootstrap";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { DataContext } from "../../utils/DataProvider";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    minWidth: "100%"
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const Feed = ({ feeds, feed, setFeed, disabled }) => {
  const classes = useStyles();

  return (
    <form className={classes.root} autoComplete="off">
      <FormControl className={classes.formControl}>
        <InputLabel>Select your feed</InputLabel>
        <Select
          value={feed ? feed : ""}
          disabled={disabled}
          onChange={e => setFeed(e.target.value)}
        >
          {feeds.map((feed, index) => (
            <MenuItem key={index} value={feed.address}>
              {feed.address}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </form>
  );
}

const Post = (props) => {
  const ctx = useContext(DataContext);

  const [feed, setFeed] = useState(null);
  const [feeds, setFeeds] = useState([]);
  const [upload, setUpload] = useState("");
  const [loading, setLoading] = useState(true);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    const fn = async () => {
      try {
        const feed = await ctx.client.getFeeds();
        if (feed !== null) {
          setFeeds(feed.feeds);
          setLoading(false);

          ctx.setAlerts(alerts => {
            let _alerts = Object.assign([], alerts);

            _alerts.push({
              message: "Feeds loaded!",
              time: new Date(),
              cls: "toast-header-success"
            });

            return _alerts;
          });
        }
      } catch (err) {
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

    if (ctx.disabled === false) {
      fn();
    }
  }, [ctx.disabled]);

  const fakeUpload = async () => {
    document.getElementById("uploadPost").click();
  };

  const uploadPost = (e) => {
    return new Promise((resolve, reject) => {
      setUploadProgress(0);

      const file = e.target.files[0];
      setUpload(file.name);
      console.log(file);

      const r = new FileReader();
      r.onload = () => ctx.client.createPost(r.result, feed)
        .then(({ ipfsHash }) => {
          ctx.setAlerts(alerts => {
            let _alerts = Object.assign([], alerts);

            _alerts.push({
              message: `Created post: ${ipfsHash}`,
              time: new Date(),
              cls: "toast-header-success"
            });

            return _alerts;
          });
        })
        .catch((err) => {
          ctx.setAlerts(alerts => {
            let _alerts = Object.assign([], alerts);

            _alerts.push({
              message: err.message,
              time: new Date(),
              cls: "toast-header-err"
            });

            return _alerts;
          });
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
          {loading === true && ctx.disabled === false ? (
            <Col md="auto" className="align-self-center pr-0" style={{ marginTop: "12px" }}>
              <Spinner animation="border" size="sm" role="status" title="Loading feeds" />
            </Col>
          ) : null}
          <Col>
            <Feed feeds={feeds} feed={feed} setFeed={setFeed} disabled={ctx.disabled || loading} />
          </Col>
        </Row>
        <input
          id="uploadPost"
          type="file"
          hidden
          onChange={uploadPost}
        />
        <MDBInputGroup
          material
          prepend={
            <MDBBtn
              style={{ margin: "0", marginRight: "10px" }}
              color="dark"
              size="sm"
              disabled={ctx.disabled || loading}
              onClick={fakeUpload}
            >
              Upload
            </MDBBtn>
          }
          value={upload}
        />
        <MDBProgress value={uploadProgress} height={1} color="dark" className="my-2" />
      </MDBCardBody>
    </MDBCard>
  );
};

export default Post;
