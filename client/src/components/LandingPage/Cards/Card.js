import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import FiberManualRecordOutlinedIcon from "@material-ui/icons/FiberManualRecordOutlined";
import FiberManualRecordRoundedIcon from "@material-ui/icons/FiberManualRecordRounded";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Poppins"].join(","),
  },
});

const useStyles = makeStyles({
  root: {
    width: "285px",
    height: "374px",
    textAlign: "left",
    margin: "15px",
    borderRadius: "9px",
    display: "inline-block", // important for layouting
    backgroundColor: "#FFFFFF",
    border: '0.626214px solid rgba(0, 0, 0, 0.09)',
    boxShadow: "0px 17px 38px 5px rgba(93, 108, 133, 0.05)",
    transition: "transform .3s cubic-bezier(.4,0,.2,1)",
    "&:hover": {
      boxShadow: "0 4px 25px 6px rgb(63 63 63 / 25%)",
      transition: "transform .3s cubic-bezier(.4,0,.2,1)",
      transform: "scale(1.05)",
    },
    ["@media (max-width: 550px)"]: {
      width: "280px",
    },
  },
  media: {
    width:285,
    height: 149.4,
    borderRadius: "8px",
  },
  starRating: {
    height: 14,
    width: 13.03,
  },
  content:{
    padding:"0px 21px",
    overflow:'hidden',
  },
  contentStar:{
    padding:"15px 21px 8px 20px",
  },
  primary: {
    color: "#4A8EFF",
  },
  flexContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems:"flex-start",
    padding:"0px 15px",
  },
  overflowhide:{
    overflow:'hidden',
  },
});

export default function MediaCard(props) {
  // shortening the description from the DB to a fixed length
  const descript =
    props.description !== null
      ? props.description.substring(0, 100) + "..."
      : "Course Description";
  const name = props.title.substring(0, 25) + "...";

  const [value, setValue] = React.useState(2); // To be replaced by the ratings from DB

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.imgScr}
          title={props.title}
        />
        <CardActions className={classes.contentStar} >
        <Rating className={classes.starRating} name="read-only" value={value} readOnly />
      </CardActions>
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h5" component="h2">
            <Box  fontWeight={500} height={54}>
              {name}
            </Box>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <Box  fontWeight={400} height={85}>
              {descript}
            </Box>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.flexContainer} >
          <Box>
            <FiberManualRecordRoundedIcon className={classes.primary} />
            <FiberManualRecordOutlinedIcon className={classes.primary} />
            <FiberManualRecordOutlinedIcon className={classes.primary} />
          </Box>
          <Button size="small" color="primary">
            <Link
              to={{ pathname: `/courses/${props.id}`, state: props }}
              style={{ textDecoration: "none" }}
            >
              <ArrowForwardIcon /> Learn more
            </Link>
          </Button>
        </CardActions>
      </Card>
    </ThemeProvider>
  );
}
