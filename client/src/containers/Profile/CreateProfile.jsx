import React, { useContext, useState } from "react";
import { Container, makeStyles, Button, Grid } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import images from "../../assets/images";
import { ProfileContext } from "../../context/ProfileContext";
import AddAPhotoOutlinedIcon from "@material-ui/icons/AddAPhotoOutlined";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "100px 0",
  },
  button: {
    padding: theme.button.padding,
  },
  formControl: {
    width: "100%",
  },
  error: {
    color: "red",
    fontSize: "12px",
    margin: "0",
  },
  label: {
    width: "250px",
    height: "250px",
    border: "2px dashed #ddd",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "7px",
    cursor: "pointer",
  },
  icon: {
    fontSize: "24px",
    color: "#aaa",
  },
  input: {
    display: "none",
  },
  preview: {
    width: "250px",
    height: "250px",
    objectFit: "contain",
    borderRadius: "7px",
  },
  inputLabel: {
    display: "block",
  },
  inputBox: {
    border: "none",
    borderBottom: "1px solid #000",
    background: "#fafafa",
    width: "100%",
    padding: "10px",
    borderRadius: "0",
  },
  select: {
    border: "none",
    borderBottom: "1px solid #000",
    background: "#fafafa",
    width: "100%",
    padding: "10px",
    borderRadius: "0",
  },
}));

const CreateProfile = () => {
  const classes = useStyles();
  const {
    state: { profile, loading },
    addProfile,
  } = useContext(ProfileContext);
  const [form, setForm] = useState({});
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    if (e.target.name == "image") {
      setPreview(URL.createObjectURL(e.target.files[0]));
      return setForm({ ...form, [e.target.name]: e.target.files[0] });
    }

    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProfile(form);
  };

  if (loading) return null;

  return (
    <Container className={classes.container}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Grid container spacing={2}>
          <Grid item md={4} sm={4} xs={4}>
            <label htmlFor="imageLable" className={classes.label}>
              <AddAPhotoOutlinedIcon className={classes.icon} />
            </label>
            <input
              className={classes.input}
              type="file"
              name="image"
              id="imageLable"
              onChange={(e) => handleChange(e)}
            />
          </Grid>
          <Grid item md={4} sm={4} xs={4}>
            {preview && (
              <img src={preview} alt="" className={classes.preview} />
            )}
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <label htmlFor="name" className={classes.inputLabel}>
              Name
            </label>
            <input
              name="name"
              id="title"
              placeholder="Email Name"
              onChange={(e) => handleChange(e)}
              className={classes.inputBox}
            />
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <label htmlFor="phone" className={classes.inputLabel}>
              Phone
            </label>
            <input
              name="phone"
              type="number"
              id="phone"
              placeholder="Enter Description"
              className={classes.inputBox}
              onChange={(e) => handleChange(e)}
            />
          </Grid>
          <Grid item md={6} sm={6} xs={6}>
            <label htmlFor="street" className={classes.inputLabel}>
              Street
            </label>
            <input
              type="text"
              name="street"
              id="street"
              placeholder="Enter Street Name"
              className={classes.inputBox}
              onChange={(e) => handleChange(e)}
            />
          </Grid>
          <Grid item md={6} sm={6} xs={6}>
            <label htmlFor="city" className={classes.inputLabel}>
              City
            </label>
            <input
              type="text"
              name="city"
              id="city"
              placeholder="Enter City Name"
              className={classes.inputBox}
              onChange={(e) => handleChange(e)}
            />
          </Grid>
          <Grid item md={6} sm={6} xs={6}>
            <label htmlFor="state" className={classes.inputLabel}>
              State
            </label>
            <input
              type="text"
              name="state"
              id="state"
              placeholder="Enter State Name"
              className={classes.inputBox}
              onChange={(e) => handleChange(e)}
            />
          </Grid>
          <Grid item md={6} sm={6} xs={6}>
            <label htmlFor="zip" className={classes.inputLabel}>
              Zip
            </label>
            <input
              type="number"
              name="zip"
              id="zip"
              placeholder="Enter Zip Name"
              className={classes.inputBox}
              onChange={(e) => handleChange(e)}
            />
          </Grid>
          <Grid item md={6} sm={6} xs={6}>
            <label htmlFor="currentPassword" className={classes.inputLabel}>
              Current Password
            </label>
            <input
              type="text"
              name="currentPassword"
              id="currentPassword"
              placeholder="Enter  Current Password"
              className={classes.inputBox}
              onChange={(e) => handleChange(e)}
            />
          </Grid>
          <Grid item md={6} sm={6} xs={6}>
            <label htmlFor="newPassword" className={classes.inputLabel}>
              New Password
            </label>
            <input
              type="text"
              name="newPassword"
              id="newPassword"
              placeholder="Enter New Password"
              className={classes.inputBox}
              onChange={(e) => handleChange(e)}
            />
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Add Post
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CreateProfile;
