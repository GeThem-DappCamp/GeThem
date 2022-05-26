import { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Image from "next/image";
import { useRouter } from "next/router";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import logo from "../assets/images/logo.svg";
import homeW from "../assets/images/home-w.svg";
import home from "../assets/images/home.svg";
import starW from "../assets/images/star-w.svg";
import star from "../assets/images/star.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: "21vw",
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: 0,
    boxShadow: "none",
    backgroundColor: "transparent !important",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
    color: "white",
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: "21vw",
    backgroundColor: "#172B48",
    minWidth: "200px !important",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  closeMenuButton: {
    marginLeft: "auto",
    marginRight: 0,
    color: "white",
  },
}));

export default function MenuCandidate({ index }) {
  const classes = useStyles();
  const theme = useTheme();
  const [active, setActive] = useState(index);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }
  const drawer = (
    <div className="menu">
      <div className="menu-logo">
        <Image src={logo} alt="" />
      </div>
      <ul>
        <li
          className={active == 0 ? "menu-item menu-active" : "menu-item"}
          onClick={() => {
            setActive(0);
            router.push(`/candidate`);
          }}
        >
          <Image src={active == 0 ? homeW : home} alt="" />
          <p>Home</p>
        </li>
        <li
          className={active == 1 ? "menu-item menu-active" : "menu-item"}
          onClick={() => {
            setActive(1);
            router.push(`/candidate/history`);
          }}
        >
          <Image src={active == 1 ? starW : star} alt="" />
          <p>History</p>
        </li>
      </ul>
    </div>
  );
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <nav className={classes.drawer}>
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <IconButton
              onClick={handleDrawerToggle}
              className={classes.closeMenuButton}
            >
              <CloseIcon />
            </IconButton>
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.toolbar} />
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}
