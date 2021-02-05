import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ContentBox(props) {
  const { user, details, videos, changeVideo, curId } = props;
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List className={classNames(classes.root)}>
      {videos.map((video, value) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem
            key={value}
            role={undefined}
            dense
            button
            style={{
              backgroundColor:
                value === curId ? "rgba(153,153,153,0.2)" : "#fff",
            }}
          >
            <ListItemIcon onClick={handleToggle(value)}>
              <Checkbox
                edge="start"
                checked={checked.indexOf(video) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ "aria-labelledby": labelId }}
              />
            </ListItemIcon>
            <ListItemText
              id={labelId}
              primary={`${video.title}`}
              onClick={() => changeVideo(value)}
              style={{ color: value === curId ? " #405096" : "black" }}
            />
            {/* <a href="https://www.youtube.com/">YouTube</a> */}
            {/* <Link
              to={{
                pathname: `/courses/${details.id}/videos/${video._id}`,
                // state: props,
                state: {
                  details: details,
                  vidId: video._id,
                  user: user,
                },
              }}
              onClick={() => {
                window.open(
                  `http://localhost:3000/courses/${details.id}/videos/${video._id}`,
                  "_self"
                );
              }}
              style={{ textDecoration: "none" }}
            >
              {video.title}
            </Link> */}
          </ListItem>
        );
      })}
    </List>
  );
}
