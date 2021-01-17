import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ContentBox from "../ContentBox/ContentBox";
import styles from "../CourseVideos.module.css";
import { Link, useHistory } from "react-router-dom";
import classNames from "classnames";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Bookmarks from "./Bookmarks/Bookmarks";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  ///@start FROM ContentBox
  root2: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  ///@end
}));

export default function Dashboard(props) {
  const {
    details,
    user,
    videos,
    changeVideo,
    curId,
    curTime,
    goToBookmarkTime,
  } = props;
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [checked, setChecked] = React.useState([0]); /// FROM ContentBox

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  ///@start FROM ContentBox
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
  ///@end

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab
            label="Content Box"
            {...a11yProps(0)}
            className={styles.mobileDN}
          />
          <Tab label="Bookmarks" {...a11yProps(1)} />
          <Tab label="Q&A" {...a11yProps(2)} />
          <Tab label="About" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} className={styles.mobileDN}>
        {/* <ContentBox details={details} user={user} videos={videos}/> */}
        {/* @START
        ///////////////////////////////////////////////
        /// TRY TO MAKE A COMPONENT OUT OF THIS BLOCK */}
        <List className={classNames(classes.root2)}>
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
                  onClick={() => {
                    changeVideo(value);
                  }}
                  style={{ color: value === curId ? " #405096" : "black" }}
                />
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
        {/* /////////////////////////////////////
        /////////////////////////////////////
        @END */}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Bookmarks
          curId={curId}
          user={user}
          details={details}
          curTime={curTime}
          goToBookmarkTime={goToBookmarkTime}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Coming Soon...
      </TabPanel>
      <TabPanel value={value} index={3}>
        <h3 style={{ fontFamily: "myUbuntu" }}>Description</h3>
        <p style={{ color: "#444", fontFamily: "myUbuntu" }}>
          {details.description}
        </p>
      </TabPanel>
    </div>
  );
}
