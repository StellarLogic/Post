import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import Chip from "@material-ui/core/Chip";
import { PostContext } from "../../context/PostContext";
import images from "../../assets/images";

const { placeholder } = images;

const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    padding: "100px 0",
  },
  image: {
    objectFit: "cover",
  },
  chip: {
    marginRight: theme.spacing(2),
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.3)",
  },
  mainFeaturedPostContent: {
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
}));
const Details = ({ match }) => {
  const classes = useStyles();
  const {
    state: { singlePost },
    getSinglePost,
  } = useContext(PostContext);

  useEffect(() => {
    getSinglePost(match.params.id);
  }, []);

  if (!singlePost) return null;

  const { title, description, price, category, user, image } = singlePost;
  // console.log(title, description, price, category, user, image);

  const placeholderImg = image
    ? `${process.env.REACT_APP_PATH}/uploads/${image?.name}`
    : placeholder;

  return (
    <Container maxWidth="lg">
      <Paper
        className={classes.mainFeaturedPost}
        style={{
          backgroundImage: `url(${placeholderImg})`,
        }}
      >
        {/* Increase the priority of the hero background image */}

        <img
          style={{ display: "none" }}
          src={placeholderImg}
          className={classes.image}
        />

        <div className={classes.overlay} />
        <Grid container>
          <Grid item md={6}>
            <div className={classes.mainFeaturedPostContent}>
              <Typography
                component="h1"
                variant="h3"
                color="inherit"
                gutterBottom
              >
                {title}
              </Typography>
              <Chip
                label={`${category} ₹`}
                clickable
                color="primary"
                className={classes.chip}
              />
              <Chip
                label={`${price} ₹`}
                clickable
                color="primary"
                className={classes.chip}
              />
            </div>
          </Grid>
        </Grid>
      </Paper>
      <Grid container>
        <Grid item xs={9}>
          <Typography variant="h5" color="inherit" paragraph>
            {description}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          {user && (
            <>
              <div>Posted By : {user.name}</div>
              <div>Email: {user.email}</div>
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Details;
