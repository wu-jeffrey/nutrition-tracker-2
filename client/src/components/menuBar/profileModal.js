import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { AuthConsumer } from '../../routing/authContext.js';
import MacroEditor from './macroEditor.js';

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


  const [newUserGoal, setNewUserGoal] = useState(null);

  function onMacroEditorChange(event, newValue) {
    setNewUserGoal(newValue);
  }

  function onSave(previousUserGoal, callback) {
    if (!shallowEqual(newUserGoal, previousUserGoal)) {
      // Make API call
      const settings = {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify({ daily_macro_goal: newUserGoal })
      };

      (async () => {
        const response = await fetch(encodeURI("/api/users/daily-macro-goal"), settings);
        const updatedUser = await response.json();

        if (typeof callback === "function") {
          callback(updatedUser);
        }
        closeModal();
      })();
    } else {
      closeModal()
    }
  }


  return (
    <AuthConsumer>
      {({ user, updateUser }) => (
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
            <MacroEditor goal={user.daily_macro_goal} onChange={onMacroEditorChange} />

            < div className={classes.buttonGroup}>
              <Button color="secondary" onClick={closeModal}>Close</Button>
              <Button color="primary" onClick={() => { onSave(user.daily_macro_goal, updateUser) }}>Save</Button>
            </div>
          </div>
        </Modal>
      )}
    </AuthConsumer>
  );
}

function shallowEqual(object1, object2) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }

  return true;
}