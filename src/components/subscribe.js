import React, { Component } from "react"
import addToMailchimp from "gatsby-plugin-mailchimp"
import PropTypes from "prop-types"
import classNames from "classnames"
import { withStyles } from "@material-ui/core/styles"
import Fab from "@material-ui/core/Fab"
import Input from "@material-ui/core/Input"
import { NotificationsActive } from "@material-ui/icons"
import Dialog from "./dialog"
const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  margin: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
})

class Subscribe extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: ``,
      open: false,
    }
  }
  // Update state each time user edits their email address
  _handleEmailChange = e => {
    this.setState({ email: e.target.value })
  }
  // Post to MC server & handle its response
  _postEmailToMailchimp = (email, attributes) => {
    addToMailchimp(email, attributes)
      .then(result => {
        // Mailchimp always returns a 200 response
        // So we check the result for MC errors & failures
        if (result.result !== `success`) {
          this.setState({
            status: `error`,
            msg: result.msg,
          })
        } else {
          // Email address succesfully subcribed to Mailchimp
          this.setState({
            status: `success`,
            msg: result.msg,
          })
          console.log(result.msg)
        }
      })
      .catch(err => {
        // Network failures, timeouts, etc
        this.setState({
          status: `error`,
          msg: err,
        })
      })
  }
  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }
  _handleFormSubmit = e => {
    e.preventDefault()
    e.stopPropagation()
    this.setState({
      open: false,
    })
    if (!this.state.email) {
      this.setState({
        status: `error`,
        msg: "Prosím vložte platnú adresu",
      })
    } else {
      this.setState({
        status: `sending`,
        msg: null,
      })
      // setState callback (subscribe email to MC)
      this._postEmailToMailchimp(this.state.email, {
        pathname: document.location.pathname,
      })
    }
  }

  render() {
    const { classes } = this.props
    return (
      <div
        className={classes.container}
        style={{
          marginBottom: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {this.state.status === `success` ? (
          <div>Vďaka za odber, sľubujem presne 0 spamu</div>
        ) : (
          <div>
            <span>
              Milý čitateľ, ak sa ti tento článok páčil, pridaj sa do môjho
              zoznamu odberateľov a dostávaj novinky priamo do schránky
            </span>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "1rem",
                marginBottom: "1rem",
              }}
            >
              <Fab
                variant="extended"
                color="secondary"
                aria-label="Add"
                className={classes.margin}
                onClick={this.handleClickOpen}
              >
                <NotificationsActive className={classes.extendedIcon} />
                Odoberať
              </Fab>
              <Dialog
                open={this.state.open}
                handleClose={this.handleClose}
                _handleEmailChange={this._handleEmailChange}
                _handleFormSubmit={this._handleFormSubmit}
                email={this.state.email}
              />
              {this.state.status === `error` && (
                <div
                  style={{ marginTop: "1rem" }}
                  dangerouslySetInnerHTML={{ __html: this.state.msg }}
                />
              )}
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default withStyles(styles)(Subscribe)
