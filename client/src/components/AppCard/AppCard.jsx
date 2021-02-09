import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import images from "../../assets/images";
import Chip from "@material-ui/core/Chip";
import { Link } from "react-router-dom";
const { placeholder } = images;

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  description: {
    minHeight: "40px",
  },
  buttonsRow: {
    display: "flex",
    justifyContent: "space-between",
  },
  viewBtn: {
    borderRadius: "100px",
    fontSize: "12px",
  },
  link: {
    textDecoration: "none",
  },
});

const AppCard = ({ _id, title, description, price, category, image }) => {
  const classes = useStyles();

  const placeholderImg = image
    ? `${process.env.REACT_APP_PATH}/uploads/${image.name}`
    : placeholder;

  return (
    <Card className={classes.root}>
      <Link to={`/post/${_id}`} className={classes.link}>
        <CardActionArea>
          <CardMedia className={classes.media} image={placeholderImg} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.description}
            >
              {description.length > 75
                ? description.substr(0, 75) + "..."
                : description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions display="flex" className={classes.buttonsRow}>
        <Chip label={`${price} ₹`} clickable color="primary" />
        <Chip label={category} clickable color="primary" />
        <Button
          component={Link}
          to={`/post/${_id}`}
          variant="contained"
          color="primary"
          className={classes.viewBtn}
        >
          View
        </Button>
      </CardActions>
    </Card>
  );
};

export default AppCard;
