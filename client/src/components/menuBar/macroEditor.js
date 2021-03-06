import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { LockOpen, Lock } from '@material-ui/icons/';
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';


const useStyles = makeStyles((theme) => ({
  sliderRow: {
    display: 'flex',
  }
}));

export default function MacroEditor({ goal }) {
  const [calories, setCalories] = useState(goal?.calories)
  const [lowerBound, setLowerBound] = useState(33)
  const [upperBound, setUpperBound] = useState(66)

  const classes = useStyles();

  const onProteinSliderChange = (event, newValue) => {
    if (newValue[1] > upperBound) return;
    setLowerBound(newValue[1]);
  }

  const onCarbSliderChange = (event, newValue) => {
    if (newValue[1] < lowerBound || newValue[0] > upperBound) return;
    setLowerBound(newValue[0]);
    setUpperBound(newValue[1]);
  }

  const onFatSliderChange = (event, newValue) => {
    if (newValue[0] < lowerBound) return;
    setUpperBound(newValue[0]);
  }

  return (
    <div>
      <form noValidate autoComplete="off">
        <h3>Daily Goals</h3>
        <div>
          <TextField
            label="Calories"
            value={calories}
            onChange={(e) => { setCalories(e.target.value) }}
            variant="outlined"
            type="number"
          />
        </div>

        <p>Protein</p>
        <div className={classes.sliderRow}>
          <Slider
            valueLabelDisplay='auto'
            valueLabelFormat={(x) => (lowerBound) + '%'}
            onChange={onProteinSliderChange}
            value={[0, lowerBound]}
          />
        </div>

        <p>Carbohydrates</p>
        <div className={classes.sliderRow}>
          <Slider
            valueLabelDisplay='auto'
            valueLabelFormat={(x) => (upperBound - lowerBound) + '%'}
            onChange={onCarbSliderChange}
            value={[lowerBound, upperBound]}
          />
        </div>

        <p>Fat</p>
        <div className={classes.sliderRow}>
          <Slider
            valueLabelDisplay='auto'
            // ValueLabelComponent={ValueLabelComponent}
            valueLabelFormat={(x) => (100 - upperBound) + '%'}
            onChange={onFatSliderChange}
            value={[upperBound, 100]}
          />
        </div>
      </form>
    </div>
  );
}

function ValueLabelComponent(props) {
  const { children, value } = props;

  return (
    <>
      {
        (value != 0 && value != 100)
        &&
        (<Tooltip enterTouchDelay={0} placement="top" title={value}>{children}</Tooltip>)
      }
    </>
  );
}