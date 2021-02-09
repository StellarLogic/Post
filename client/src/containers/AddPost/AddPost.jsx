import React, { useState, useContext } from "react";
import { Button, Container, Grid, makeStyles } from "@material-ui/core";
import { PostContext } from "../../context/PostContext";
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

const AddPost = () => {
  const classes = useStyles();
  const { addPost } = useContext(PostContext);
  const [form, setForm] = useState({});
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    if (e.target.name == "image") {
      setPreview(URL.createObjectURL(e.target.files[0]));
      return setForm({ ...form, [e.target.name]: e.target.files[0] });
    }

    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addPost(form);
  };

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
            <label htmlFor="title" className={classes.inputLabel}>
              Title
            </label>
            <input
              name="title"
              id="title"
              placeholder="Email Title"
              variant="outlined"
              onChange={(e) => handleChange(e)}
              className={classes.inputBox}
            />
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <label htmlFor="description" className={classes.inputLabel}>
              Description
            </label>
            <input
              name="description"
              id="description"
              placeholder="Enter Description"
              className={classes.inputBox}
              onChange={(e) => handleChange(e)}
            />
          </Grid>
          <Grid item md={6} sm={6} xs={6}>
            <label htmlFor="" className={classes.inputLabel}>
              Select Category
            </label>
            <select
              onChange={handleChange}
              name="category"
              className={classes.select}
              onChange={(e) => handleChange(e)}
            >
              <option value="" disabled defaultValue>
                Select Category
              </option>
              <option value="Electronics">Electronics</option>
              <option value="Cars">Cars</option>
              <option value="Mobile Phone">Mobile Phone</option>
              <option value="Accessories">Accessories</option>
              <option value="Furniture">Furniture</option>
            </select>
          </Grid>
          <Grid item md={6} sm={6} xs={6}>
            <label htmlFor="price" className={classes.inputLabel}>
              Price
            </label>
            <input
              type="number"
              name="price"
              id="price"
              placeholder="Enter Price"
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

export default AddPost;
