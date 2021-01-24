import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { Link } from "react-router-dom";
import leftArrow from "../../images/left-arrow.png";
import styles from "./VideosUpload.module.css";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import axios from "axios";

const VideosUpload = (props) => {
  const [file, setFile] = useState("");
  const [title, setTitle] = useState("");
  const [inProgress, setInProgress] = useState(false);
  const [output, setOutput] = useState("Json output from the server");

  const titleChange = (e) => setTitle(e.target.value);
  const fileChange = (e) => setFile(e.target.files[0]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Submitted");
    setInProgress(true);
    const url = `/api/admin/courses/${props.match.params.id}/videos`;
    const formData = new FormData();
    formData.append("video", file);
    formData.append("title", title);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
      withCredentials: true,
      // timeout:
    };
    axios
      .post(url, formData, config)
      .then((res) => {
        const output = JSON.stringify(res.data);
        console.warn(res.data);
        setInProgress(false);
        setOutput(output);
      })
      .catch((err) => {
        const error = JSON.stringify(err);
        console.error(err);
        setInProgress(false);
        setOutput(error);
      });
  };

  return (
    <div className={styles.root}>
      <div className={styles.topBar}>
        <Link
          to={{
            pathname: `/admin/courses/${props.match.params.id}`,
          }}
        >
          <button className={styles.BackButton}>
            <img src={leftArrow} alt="back" />
          </button>
        </Link>
        <span
          style={{
            padding: "15px 0",
            textAlign: "left",
            color: "#999",
            overflowX: "hidden",
            fontSize: "22px",
          }}
        >
          Course Id: {props.match.params.id}
          <br />
          Course Name: {props.location.state.title}
        </span>
      </div>
      <div className={styles.videoUpload}>
        <Form className={styles.uploadForm} onSubmit={submitHandler}>
          <FormGroup>
            <FormText
              style={{
                textAlign: "center",
                fontSize: "32px",
                textDecoration: "underline",
              }}
            >
              Upload Videos
            </FormText>
          </FormGroup>
          <FormGroup>
            <Label for="videoTitle">Video title</Label>
            <Input
              type="text"
              name="title"
              id="videoTitle"
              placeholder="Video Title"
              onChange={titleChange}
              value={title}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label for="videoFile">Video File</Label>
            <Input
              type="file"
              name="video"
              id="videoFile"
              onChange={fileChange}
              required
            />
            <FormText color="muted">
              {!inProgress
                ? "Browse the video file to be uploaded."
                : "Video Upload in PROGRESS..."}
            </FormText>
          </FormGroup>

          <Button color="primary" type="submit" disabled={inProgress}>
            Upload
          </Button>
        </Form>
        {output !== "" ? (
          <div className={styles.jsonOutput}>
            <HighlightOffIcon
              style={{
                color: "#FFF",
                position: "absolute",
                right: "0.5%",
                top: "1%",
              }}
              onClick={(e) => setOutput("")}
            />
            <code
              style={{
                color: "#FF1D57",
                margin: "24px 0 0",
                overflowWrap: "break-word",
              }}
            >
              {output}
            </code>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default VideosUpload;
