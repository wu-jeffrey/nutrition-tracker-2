import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon'
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import { OutlinedInput } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  form: {
    marginBottom: 12,
  },
  sliderRow: {
    width: "100%"
  },
  input: {
    width: 100,
  },
}));

export default function MacroEditor({ goal }) {
  const classes = useStyles();

  const [calories, setCalories] = useState(goal?.calories)
  const [protein, setProtein] = useState(goal?.protein)
  const [carbohydrate, setCarbohydrate] = useState(goal?.carbohydrate)
  const [fat, setFat] = useState(goal?.fat)

  // NOTE: lowerBound and upperBound are the lower and upper of the middle slider (carbs).
  // The protein slider's lowerBound is fixed at 0%
  // The fat slider's upperBound is fixed at 100%
  const [lowerBound, setLowerBound] = useState(gramsToPercentage(calories, protein, 'protein'));
  const [upperBound, setUpperBound] = useState(lowerBound + gramsToPercentage(calories, carbohydrate, 'carbohydrate'));

  // All 3 sliders have different functions to prevent interdependent / call chaining
  // i.e. if they all use a single onSliderChange, changing one slider will cause a cascading effect
  // and result in the onSliderChange getting called multiple times and cause unexpected behaviour
  const onProteinInputChange = (event) => {
    // Prevent middle slider (carbs) from inverting
    const newLowerBound = gramsToPercentage(calories, event.target.value, 'protein')
    if (newLowerBound > upperBound) return;

    // set the protein textInput
    setProtein(event.target.value);

    // adjust the protein slider and carb slider 
    setLowerBound(newLowerBound);

    // set the carb textInput
    const newCarbPercentage = upperBound - newLowerBound;
    setCarbohydrate(percentageToGrams(calories, newCarbPercentage, 'carbohydrate'))
  }

  const onProteinSliderChange = (event, newValue) => {
    // newValue[1] is the "lowerBound" i.e. the protein slider's upper dragger aka carb slider's 
    if (newValue[1] > upperBound) return;

    // set the lowerBound (will affect protein and carb slider)
    setLowerBound(newValue[1]);

    // set the protein textInput
    setProtein(percentageToGrams(calories, newValue[1], 'protein'));

    // set the carbs' textInput
    const newCarbPercentage = upperBound - newValue[1];
    setCarbohydrate(percentageToGrams(calories, newCarbPercentage, 'carbohydrate'))
  }

  const onCarbohydrateInputChange = (event) => {
    const newCarbPercentage = gramsToPercentage(calories, event.target.value, 'carbohydrate')
    const newUpperBound = newCarbPercentage + lowerBound;
    // Prevent middle slider (carbs) from inverting
    if (lowerBound > newUpperBound) return;

    // set the carb textInput
    setCarbohydrate(event.target.value);

    // adjust the fat slider and carb slider (we want to preferentially decrease fats instead of protein)
    setUpperBound(newUpperBound)

    // set the fat textInput
    const newFatPercentage = 100 - newUpperBound;
    setFat(percentageToGrams(calories, newFatPercentage, 'fat'))
  }

  const onCarbSliderChange = (event, newValue) => {
    // ensure slider isn't inverting
    if (newValue[1] < lowerBound || newValue[0] > upperBound) return;

    // set Carb textInput
    setCarbohydrate(percentageToGrams(calories, newValue[1] - newValue[0], 'carbohydrate'))

    // set protein slider
    const newProteinPercentage = newValue[0];
    setLowerBound(newProteinPercentage);
    // set protein textInput
    setProtein(percentageToGrams(calories, newProteinPercentage, 'protein'));

    // Adjust fat slider's lower dragger aka carb slider's upper dragger
    const newFatPercentage = 100 - newValue[1];
    setUpperBound(newValue[1]);
    // set the fat textInput
    setFat(percentageToGrams(calories, newFatPercentage, 'fat'))
  }

  const onFatInputChange = (event) => {
    const newFatPercentage = gramsToPercentage(calories, event.target.value, 'fat');
    const newUpperBound = 100 - newFatPercentage;
    // Prevent middle slider (carbs) from inverting
    if (lowerBound > newUpperBound) return;

    // set the fat textInput
    setFat(event.target.value);

    // adjust the fat slider and carb slider
    setUpperBound(newUpperBound)

    // set the carb textInput
    const newCarbPercentage = newUpperBound - lowerBound;
    setCarbohydrate(percentageToGrams(calories, newCarbPercentage, 'carbohydrate'))
  }

  const onFatSliderChange = (event, newValue) => {
    if (newValue[0] < lowerBound) return;

    // Adjust fat slider's lower dragger aka carb slider's upper dragger
    setUpperBound(newValue[0]);

    // set fat textInput
    setFat(percentageToGrams(calories, 100 - newValue[0], 'fat'))

    const newCarbPercentage = newValue[0] - lowerBound;
    setCarbohydrate(percentageToGrams(calories, newCarbPercentage, 'carbohydrate'))
  }


  const onCaloriesChanged = (event) => {
    const newCalories = event.target.value;
    setCalories(newCalories);

    const proteinPercentage = lowerBound;
    setProtein(percentageToGrams(newCalories, proteinPercentage, 'protein'))

    const carbPercentage = upperBound - lowerBound;
    setCarbohydrate(percentageToGrams(newCalories, carbPercentage, 'carbohydrate'))

    const fatPercentage = 100 - upperBound;
    setFat(percentageToGrams(newCalories, fatPercentage, 'fat'))
  }

  return (
    <div>
      <form className={classes.form} noValidate autoComplete="off">
        <h3>Daily Goals</h3>
        <div>
          <OutlinedInput
            label="Calories"
            value={calories}
            onChange={onCaloriesChanged}
            type="number"
            endAdornment={<InputAdornment position="end">kcal</InputAdornment>}
          />
        </div>

        <p>Protein</p>
        <Grid className={classes.sliderRow} container spacing={2} alignItems="center">
          <Grid item>
            <Icon>adjust</Icon>
          </Grid>
          <Grid item xs>
            <Slider
              valueLabelDisplay='auto'
              valueLabelFormat={(x) => Math.round(lowerBound) + '%'}
              onChange={onProteinSliderChange}
              value={[0, lowerBound]}
            />
          </Grid>
          <Grid item>
            <OutlinedInput
              className={classes.input}
              value={protein}
              margin="dense"
              onChange={onProteinInputChange}
              // onBlur={ }
              inputProps={{
                step: 1,
                min: 0,
                type: 'number',
              }}
              endAdornment={<InputAdornment position="end">g</InputAdornment>}
            />
          </Grid>
        </Grid>

        <p>Carbohydrate</p>
        <Grid className={classes.sliderRow} container spacing={2} alignItems="center">
          <Grid item>
            <Icon>adjust</Icon>
          </Grid>
          <Grid item xs>
            <Slider
              valueLabelDisplay='auto'
              valueLabelFormat={(x) => Math.round(upperBound - lowerBound) + '%'}
              onChange={onCarbSliderChange}
              value={[lowerBound, upperBound]}
            />
          </Grid>
          <Grid item>
            <OutlinedInput
              className={classes.input}
              value={carbohydrate}
              margin="dense"
              onChange={onCarbohydrateInputChange}
              // onBlur={ }
              inputProps={{
                step: 1,
                min: 0,
                type: 'number',
              }}
              endAdornment={<InputAdornment position="end">g</InputAdornment>}
            />
          </Grid>
        </Grid>


        <p>Fat</p>
        <Grid className={classes.sliderRow} container spacing={2} alignItems="center">
          <Grid item>
            <Icon>adjust</Icon>
          </Grid>
          <Grid item xs>
            <Slider
              valueLabelDisplay='auto'
              valueLabelFormat={(x) => Math.round(100 - upperBound) + '%'}
              onChange={onFatSliderChange}
              value={[upperBound, 100]}
            />
          </Grid>
          <Grid item>
            <OutlinedInput
              className={classes.input}
              value={fat}
              margin="dense"
              onChange={onFatInputChange}
              // onBlur={ }
              inputProps={{
                step: 1,
                min: 0,
                type: 'number',
              }}
              endAdornment={<InputAdornment position="end">g</InputAdornment>}
            />
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

// Private / Helper / Utils
const caloriesPerGram = {
  protein: 4,
  carbohydrate: 4,
  fat: 9,
}

function gramsToPercentage(cals, grams, macroType) {
  return ((grams * caloriesPerGram[macroType]) / cals) * 100;
}

function percentageToGrams(cals, percentage, macroType) {
  return ((percentage / 100) * cals) / caloriesPerGram[macroType];
}

function getMaxMacroGrams(cals, macroType) {
  return cals / caloriesPerGram[macroType]
}