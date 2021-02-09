import React, { useEffect, useContext } from "react";
import AppCard from "../../components/AppCard/AppCard";
import { PostContext } from "../../context/PostContext";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "50px 0px",
  },
  block: {
    marginBottom: "25px",
  },
}));

const Home = () => {
  const {
    state: { posts },
    getPosts,
  } = useContext(PostContext);
  const classes = useStyles();

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Container className={classes.container}>
      <Grid container>
        {posts.map((post) => (
          <Grid key={post._id} item xs={4} className={classes.block}>
            <AppCard {...post} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
