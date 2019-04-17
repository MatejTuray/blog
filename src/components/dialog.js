import React from "react"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import { withStyles } from "@material-ui/core/styles"
const styles = theme => ({
  label: {
    "&$focusedLabel": {
      color: "#f50057",
    },
    "&$erroredLabel": {
      color: "orange",
    },
  },
  focusedLabel: {},
  erroredLabel: {},
  underline: {
    "&$error:after": {
      borderBottomColor: "orange",
    },
    "&:after": {
      borderBottom: `2px solid #f50057`,
    },
  },
  error: {},
})

class FormDialog extends React.Component {
  render() {
    const { classes } = this.props
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Odber</DialogTitle>
          <DialogContent>
            <DialogContentText style={{ marginBottom: "1rem" }}>
              Pre odoberanie tejto stránky prosím uveďte svoju e-mailovú adresu,
              sľubujem žiadny spam a žiadne predávanie adries tretím stranám
            </DialogContentText>
            <TextField
              autoFocus
              value={this.props.email}
              InputLabelProps={{
                classes: {
                  root: classes.label,
                  focused: classes.focusedLabel,
                  error: classes.erroredLabel,
                },
              }}
              InputProps={{
                classes: {
                  root: classes.underline,
                  error: classes.error,
                },
              }}
              margin="dense"
              id="name"
              label="Email"
              type="email"
              color="secondary"
              onChange={e => this.props._handleEmailChange(e)}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.props.handleClose()} color="secondary">
              Zrušiť
            </Button>
            <Button
              onClick={e => this.props._handleFormSubmit(e)}
              color="secondary"
            >
              Aktivovať
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}
export default withStyles(styles)(FormDialog)
