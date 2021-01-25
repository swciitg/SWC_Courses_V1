import React, { useState, useEffect } from "react";
import "../Dashboard.css";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(1, 0, 2),
    textAlign: "center",
  },
}));

export default function BookmarksList(props) {
  const { user, details, bookmarks, deleteHandler, goToBookmarkTime } = props;
  const classes = useStyles();

  return (
    <div className="bookmarksListRoot">
      <Typography variant="h6" className={classes.title}>
        Bookmarks
      </Typography>
      <div className={classes.demo}>
        <List dense={false}>
          {bookmarks.length !== 0 ? (
            bookmarks.reverse().map((bookmark, id) => (
              <ListItem key={id}>
                <ListItemAvatar>
                  <Avatar>
                    <FolderIcon className="bookmarksListIcon" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={bookmark.text}
                  secondary={bookmark.timestamp}
                  className="bookmarkText"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    const ts = bookmark.timestamp;
                    const time =
                      Number(ts.substr(6, 2)) +
                      60 * Number(ts.substr(3, 2)) +
                      60 * 60 * Number(ts.substr(0, 2));
                    // console.log("TIMESTAMP", time);
                    goToBookmarkTime(time);
                  }}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    className="bookmarksListIcon"
                  >
                    <DeleteIcon onClick={() => deleteHandler(bookmark._id)} />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))
          ) : (
            <p
              style={{ textAlign: "center", color: "#555", fontSize: "0.8rem" }}
            >
              Add your bookmarks !!
            </p>
          )}
        </List>
      </div>
    </div>
  );
}
