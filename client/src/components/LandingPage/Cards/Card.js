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

const useStyles = makeStyles({
  root: {
    width: "300px",
    height: "350px",
    textAlign: "left",
    margin: "15px",
    display: "inline-block", // important for layouting
    "&:hover": {
      boxShadow: "2px 2px 13px #888",
      transform: "scale(1.02,1.02)",
      transition: "all 0.3s ease",
    },
    ["@media (max-width: 550px)"]: {
      width: "280px",
    },
  },
  media: {
    height: 140,
  },
});

export default function MediaCard(props) {
  // shortening the description from the DB to a fixed length
  const descript = props.description.substring(0, 100) + "...";
  const name = props.title.substring(0, 25) + "...";

  const [value, setValue] = React.useState(2); // To be replaced by the ratings from DB

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.imgScr}
          title={props.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {descript}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Rating name="read-only" value={value} readOnly />
        <Button size="small" color="primary">
          <Link
            to={{ pathname: `/courses/${props.id}`, state: props }}
            style={{ textDecoration: "none" }}
          >
            Learn more
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
}
