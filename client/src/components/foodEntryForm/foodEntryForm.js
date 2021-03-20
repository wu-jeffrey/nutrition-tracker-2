import React, { useState } from 'react';
import { Grid } from '@material-ui/core'

import MacroNutrientForm from './macroNutrientForm';
import { FoodSearch } from './foodSearch'

export default function FoodEntryForm({ onSubmit }) {
  const [selectedFood, setSelectedFood] = useState({
    name: '',
    servingQty: 0,
    servingUnit: 'g',
    servingWeightGrams: '',
    calories: 0,
    protein: 0,
    carbohydrate: 0,
    fat: 0,
  })

  function onFoodSearchItemClicked(e, food) {
    setSelectedFood(food);
  }

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <FoodSearch onFoodClicked={onFoodSearchItemClicked} />

        </Grid>
        <Grid item xs={6}>
          <MacroNutrientForm
            name={selectedFood.name}
            servingQty={selectedFood.servingQty}
            servingUnit={selectedFood.servingUnit}
            servingWeightGrams={selectedFood.servingWeightGrams}
            calories={selectedFood.calories}
            protein={selectedFood.protein}
            carbohydrate={selectedFood.carbohydrate}
            fat={selectedFood.fat}
            onSubmit={onSubmit}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
