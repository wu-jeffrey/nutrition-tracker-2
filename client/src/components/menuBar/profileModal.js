import React from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import { AuthConsumer } from '../../routing/authContext.js';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    outline: 'none',
    borderRadius: 8,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "flex-end",
  },
  contentRow: {
    margin: "16px 0",
    display: 'flex',
    justifyContent: 'space-between'
  },
  sliderRow: {

  }
}));

export default function ProfileModal({ open, closeModal }) {
  function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  return (
    <AuthConsumer>
      {({ user }) => (
        <Modal open={open}>
          <div style={modalStyle} className={classes.paper}>
            <h2>{user.name}'s profile</h2>
            <div className={classes.contentRow}>
              <div>Email:</div>
              <div>{user.email}</div>
            </div>
            <div className={classes.contentRow}>
              <div>Registration Date:</div>
              <div>{(new Date(user.register_date).toDateString())}</div>
            </div>
            <form noValidate autoComplete="off">
              <h3>Daily Goals</h3>
              <TextField label="Calories" variant="outlined" />
              <p>Protein</p>
              <Slider></Slider>
              <p>Carbohydrates</p>
              <Slider></Slider>
              <p>Fat</p>
              <Slider></Slider>
            </form>

            <div className={classes.buttonGroup}>
              <Button color="secondary" onClick={closeModal}>Close</Button>
              <Button color="primary">Save</Button>
            </div>
          </div>
        </Modal>
      )}
    </AuthConsumer>
  );
}