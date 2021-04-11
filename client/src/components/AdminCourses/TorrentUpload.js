import React, { useState } from "react";
import styles from "./TorrentUpload.module.css";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { Link } from "react-router-dom";
import leftArrow from "../../images/left-arrow.png";
import axios from "axios";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const TorrentUpload = () => {
  const [title, setTitle] = useState("");
  const [magnet, setMagnet] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const [inProgress, setInProgress] = useState(false);
  const [output, setOutput] = useState("Json output from the server");

  const titleChange = (e) => setTitle(e.target.value);
  const magnetChange = (e) => setMagnet(e.target.value);
  const authorChange = (e) => setAuthor(e.target.value);
  const descriptionChange = (e) => setDescription(e.target.value);
  const fileChange = (e) => setFile(e.target.files[0]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Submitted");
    setInProgress(true);
    const url = `/api/admin/torrentUpload`;
    const formData = new FormData();
    formData.append("magnet", magnet);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("author", author);
    formData.append("image", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
      withCredentials: true,
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
            pathname: `/courses/admin/`,
          }}
        >
          <button className={styles.BackButton}>
            <img src={leftArrow} alt="back" />
          </button>
        </Link>
      </div>
      <div className={styles.formContainer}>
        <Form className={styles.uploadForm} onSubmit={submitHandler}>
          <FormGroup>
            <FormText
              style={{
                textAlign: "center",
                fontSize: "32px",
                textDecoration: "underline",
              }}
            >
              ADD COURSE- TORRENT
            </FormText>
          </FormGroup>
          <FormGroup>
            <Label for="magnet">Magnet Link</Label>
            <Input
              type="textarea"
              name="magnet"
              id="magnet"
              placeholder="Magnet Link"
              onChange={magnetChange}
              value={magnet}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="courseTitle">Title</Label>
            <Input
              type="text"
              name="title"
              id="courseTitle"
              placeholder="Course Title"
              onChange={titleChange}
              value={title}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              type="textarea"
              name="description"
              id="description"
              placeholder="Course Description"
              onChange={descriptionChange}
              value={description}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label for="courseAuthor">Author</Label>
            <Input
              type="text"
              name="author"
              id="courseAuthor"
              placeholder="Course Author"
              onChange={authorChange}
              value={author}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label for="imageFile">Thumbnail Image</Label>
            <Input
              type="file"
              name="image"
              id="imageFile"
              onChange={fileChange}
              required
            />
            <FormText color="muted">
              {!inProgress
                ? "Browse the image file to be uploaded."
                : "Video Upload in PROGRESS..."}
            </FormText>
          </FormGroup>

          <Button color="primary" type="submit" disabled={inProgress}>
            Upload Course
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

export default TorrentUpload;
