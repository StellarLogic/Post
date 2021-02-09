import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { ProfileContext } from "../../context/ProfileContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  links: {
    color: "#fff",
    marginRight: "15px",
  },
  logo: {
    color: "#fff",
    fontSize: "24px",
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const {
    state: { auth },
    signOut,
  } = useContext(AuthContext);

  const { getProfile } = useContext(ProfileContext);

  const handleChange = (event) => {
    // setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Button component={Link} to="/" className={classes.logo}>
              OLX
            </Button>
          </Typography>
          {auth.isAuthorised ? (
            <div>
              <Button component={Link} to="/post/add" className={classes.links}>
                Add Post
              </Button>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              {auth.user && auth.user.name}
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={(handleClose, getProfile)}
                  component={Link}
                  to="/profile"
                >
                  Profile
                </MenuItem>
                <MenuItem
                  onClick={(handleClose, getProfile)}
                  component={Link}
                  to="/profile/edit"
                >
                  Create/Update Profile
                </MenuItem>
                <MenuItem onClick={signOut}>Sign Out</MenuItem>
              </Menu>
            </div>
          ) : (
            <>
              <Button component={Link} to="/login" className={classes.links}>
                Login
              </Button>
              <Button component={Link} to="/signup" className={classes.links}>
                Signup
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
