import AppBar from "@material-ui/core/AppBar"
import CssBaseline from "@material-ui/core/CssBaseline"
import Fab from "@material-ui/core/Fab"
import { withStyles } from "@material-ui/core/styles"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Arrow from "@material-ui/icons/ArrowUpwardOutlined"
import PropTypes from "prop-types"
import React from "react"
import { Link, animateScroll as scroll } from "react-scroll"
const styles = theme => ({
  text: {
    paddingTop: theme.spacing.unit * 1,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    float: "left",
    color: "white",
  },
  appBar: {
    top: "auto",
    paddingTop: "0.5rem",
    bottom: 0,
    backgroundColor: "#f50057;",
  },
  toolbar: {
    alignItems: "center",
    justifyContent: "center",
  },
  fabButton: {
    position: "absolute",
    zIndex: 1,
    top: -40,
    left: 0,
    right: 0,
    margin: "0 auto",
  },
})

class BottomAppBar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: true,
    }
  }
  handleScrollToTop = () => {
    scroll.scrollToTop({ smooth: "easeInOutCubic", duration: 1500, delay: 100 })
  }

  render() {
    const { classes } = this.props
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <Typography
              className={classes.text}
              variant="subheading"
              gutterBottom
            >
              © {new Date().getFullYear()}, Tento blog poháňa veľký
              {` `}
              <a
                style={{
                  textShadow: "none",
                  color: "whitesmoke",
                }}
                href="https://www.gatsbyjs.org"
              >
                Gatsby
              </a>
            </Typography>

            {this.state.visible ? (
              <Fab
                color="primary"
                aria-label="Up"
                className={classes.fabButton}
                onClick={() => this.handleScrollToTop()}
              >
                <Arrow />
              </Fab>
            ) : (
              undefined
            )}
          </Toolbar>
        </AppBar>
      </React.Fragment>
    )
  }
}

BottomAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(BottomAppBar)
