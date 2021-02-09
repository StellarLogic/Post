import React, { useContext } from "react";
import { Container, makeStyles } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import images from "../../assets/images";
import { ProfileContext } from "../../context/ProfileContext";
import Skeleton from "@material-ui/lab/Skeleton";

const { avatar } = images;

const useStyles = makeStyles((theme) => ({
  skeletonImage: {
    background: "#fff",
    width: "100px",
    height: "160px",
    borderRadius: "50%",
    opacity: "1",
    zIndex: "99",
    position: "relative",
    margin: "0 auto -175px",
  },
  parent: {
    position: "relative",
    marginTop: "150px",
    padding: "100px 50px 25px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  image: {
    position: "absolute",
    left: "50%",
    top: "0",
    transform: "translate(-50%,-50%)",
    height: "150px",
    width: "150px",
    objectFit: "cover",
    borderRadius: "50%",
    zIndex: 2,
  },
  name: {
    fontSize: "24px",
    textAlign: "center",
    marginBottom: "25px",
  },
  details: {},
  lists: {
    listStyle: "none",
  },
  title: {
    fontWeight: "bold",
  },
  item: {
    marginBottom: "10px",
  },
}));

const Profile = () => {
  const {
    state: { profile, loading },
    getProfile,
  } = useContext(ProfileContext);
  const classes = useStyles();

  if (loading)
    return (
      <>
        <Skeleton className={classes.skeletonImage} />
        <Skeleton
          width="100%"
          height="400px"
          className={classes.skeletonParent}
        />
      </>
    );

  if (!loading && !profile) return <Redirect to="/" />;

  const {
    phone,
    image,
    user: { email, name },
    address,
  } = profile;

  const placeholder = image
    ? `${process.env.REACT_APP_PATH}/uploads/${image.name}`
    : avatar;

  return (
    <Container>
      <div className={classes.parent}>
        <img src={placeholder} alt="" className={classes.image} />
        <div className={classes.details}>
          {name && <h2 className={classes.name}>{name}</h2>}
          <ul className={classes.lists}>
            {phone && (
              <li className={classes.item}>
                <span className={classes.title}>Phone : </span>
                <span className={classes.value}>{phone}</span>
              </li>
            )}
            {email && (
              <li className={classes.item}>
                <span className={classes.title}>Email : </span>
                <span className={classes.value}>{email}</span>
              </li>
            )}
            {address && (
              <li className={classes.item}>
                <span className={classes.title}>Address : </span>
                <span className={classes.value}>
                  {address.street}, {address.city}, {address.state}-
                  {address.zip}
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </Container>
  );
};

export default Profile;
