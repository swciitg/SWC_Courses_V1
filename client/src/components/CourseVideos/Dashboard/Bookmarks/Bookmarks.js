import React, { useState, useEffect } from "react";
import "../Dashboard.css";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import axios from "axios";
import BookmarksList from "./BookmarksList";

export default function Bookmarks(props) {
  const { curId, details, curTime, goToBookmarkTime } = props;
  const [timestamp, setTimeStamp] = useState("0:00");
  const [text, setText] = useState("");
  const [bookmarks, setBookmarks] = useState([]);
  const [user, setUser] = useState();

  const tStamp = new Date(curTime * 1000).toISOString().substr(11, 8);

  const submitHandler = (e) => {
    e.preventDefault();
    ///////// @start
    ///////// THIS IS AN API CALL TO THE "/api/courses/:id/video/:video_id/bookmark" ROUTE
    const apiCall = () => {
      axios({
        method: "post",
        url: `/api/courses/${details.id}/video/${details.videos[curId]}/bookmark/`,
        data: {
          // time: timestamp,
          time: tStamp,
          text: text,
        },
        withCredentials: true,
      })
        .then((res) => {
          // console.log("Bookmark created successfully", res.data);
          setBookmarks([...bookmarks, res.data.bookmark]);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    apiCall();
    ////////// @end

    // setText("");
    // setTimeStamp(0);
  };

  const deleteHandler = (id) => {
    ///////// @start
    ///////// THIS IS AN API CALL TO THE "/api/courses/:id/video/:video_id/bookmark/:book_id" ROUTE
    const apiCall = () => {
      axios({
        method: "delete",
        url: `/api/courses/${details.id}/video/${details.videos[curId]}/bookmark/${id}/`,
        withCredentials: true,
      })
        .then((res) => {
          console.log("Bookmark deleted successfully", res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    apiCall();
    ////////// @end
    const newBookmarks = bookmarks.filter((bookmark) => {
      return bookmark._id !== id;
    });
    setBookmarks(newBookmarks);
  };

  useEffect(() => {
    ///////// @start
    ///////// THIS IS AN API CALL TO THE "/user"
    const apiCall = () => {
      axios
        .get("/user")
        .then((res) => {
          setUser(res.data);

          //filtering out the course
          const courses = res.data.enrolled_courses.filter((ecourse) => {
            return ecourse.course == details.id;
          });
          //filtering out the bookmarks of the current video
          const bkmarks = courses[0].Bookmarks.filter((bkmark) => {
            return bkmark.video == details.videos[curId];
          });

          setBookmarks(bkmarks);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    apiCall();
    ////////// @end
  }, [curId]);

  const timeChangeHandler = (e) => {
    setTimeStamp(e.target.value);
  };

  const textChangeHandler = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="bookmarkRoot">
      <form onSubmit={submitHandler}>
        <div className="bookmarkForm">
          <TextField
            id="standard-basic-1"
            label="Timestamp"
            className="textField"
            // value={timestamp}
            // onChange={timeChangeHandler}
            value={tStamp}
            readonly={true}
            autoComplete={false}
          />
          <TextField
            id="standard-basic-2"
            label="Text"
            className="textField"
            value={text}
            onChange={textChangeHandler}
          />
          <IconButton aria-label="add" className="add" type="submit">
            <AddCircleOutlineIcon fontSize="medium" />
          </IconButton>
        </div>
      </form>
      <p style={{ margin: "5px 0", fontSize: "10px", color: "#999" }}>
        <sup>**</sup>Set the timestamp by clicking/tapping on that part of the
        progress bar
      </p>
      <BookmarksList
        user={user}
        details={details}
        bookmarks={bookmarks}
        deleteHandler={deleteHandler}
        goToBookmarkTime={goToBookmarkTime}
      />
    </div>
  );
}
