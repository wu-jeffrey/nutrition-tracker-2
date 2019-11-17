import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from './autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

import MacroNutrientForm from './macroNutrientForm';
class Search extends React.Component {
  // Find a better event to update things on
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      loading: false,
      options: [],
      // TODO: Consider using Typescript
      nutrition_facts: {
        food_name: "",
        serving_qty: 0,
        serving_unit: "",
        serving_weight_grams: "",
        nf_calories: 0,
        nf_protein: 0,
        nf_total_carbohydrate: 0,
        nf_total_fat: 0,
      },
    }
    this.onSubmit = props.onSubmit;
  }

  handleInputChange(event, value) {
    // TODO: Fix this Temporary "Debounce"
    if(value !== "" && value.length > 2) {
      // Make loader appear and keep popper open
      this.setState(state => ({
        open: true,
        loading: true
      }));

      (async () => {
        const response = await fetch(encodeURI(`/api/food-search/foods/${value}`));
        const foods = await response.json();
        this.setState(state => ({
          options: Object.keys(foods)
          .map((key) => {
            return foods[key];
          })
          .flat()
          .map((food) => {
            return { name: food.food_name, nix_item_id: food.nix_item_id };
          }),
          loading: false
        }))
      })();
    } else {
      this.setState(state => ({
        open: false,
        loading: false
      }));
    }
  }

  handleOptionClicked(event, value) {
    (async () => {
      const response = await fetch(encodeURI(`/api/food-search/nutrition-facts/${!!value.nix_item_id}/${value.nix_item_id || value.name}`));
      const payload = await response.json();

      // TODO: Consider hashmap for performance
      // TODO: Consider reformatting the payload in serverside
      const allowed = [
        'food_name',
        'serving_qty',
        'serving_unit',
        'serving_weight_grams',
        'nf_calories',
        'nf_protein',
        'nf_total_carbohydrate',
        'nf_total_fat'
      ];

      const filtered = Object.keys(payload.foods[0])
        .filter((key) => allowed.indexOf(key) > -1)
        .reduce((acc, key) => {
          acc[key] = payload.foods[0][key];
          return acc
        }, {});

      this.setState({
        nutrition_facts: filtered,
      })
    })();

    // Close popper
    this.setState({
      open: false,
      loading: false,
      options: []
    })
  }

  render() { 
    return(
      <React.Fragment>
        <Autocomplete
          id="search-select"
          freeSolo={true}
          open={this.state.open}
          disableOpenOnFocus={true}
          // TODO: Figure out better way to get rid of the bind, understand newer syntax instead of component class, its exports a function
          onInputChange={this.handleInputChange.bind(this)}
          onOptionClick={this.handleOptionClicked.bind(this)}
          onClose={e => this.setState({open: false})}
          getOptionLabel={option => option.name}
          options={this.state.options}
          loading={this.state.loading}
          renderInput={params => (
            <TextField
              {...params}
              label="Search Foods"
              fullWidth
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {this.state.loading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
        />
        {/* TODO: Might want to make props CamelCase */}
        <MacroNutrientForm
          food_name={this.state.nutrition_facts.food_name}
          serving_qty={this.state.nutrition_facts.serving_qty}
          serving_unit={this.state.nutrition_facts.serving_unit}
          serving_weight_grams={this.state.nutrition_facts.serving_weight_grams}
          calories={this.state.nutrition_facts.nf_calories}
          protein={this.state.nutrition_facts.nf_protein}
          carbohydrate={this.state.nutrition_facts.nf_total_carbohydrate}
          fat={this.state.nutrition_facts.nf_total_fat}
          onSubmit={this.onSubmit}
        ></MacroNutrientForm>
      </React.Fragment>
    );
  }
}

export default Search;
